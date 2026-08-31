#!/usr/bin/env node
// render.mjs : render an approved markdown document to a branded HTML file,
// and to a PDF when a headless browser is available.
// Zero dependencies. Node 20+.
//
// The document text is treated as untrusted. Every character that reaches the
// page is escaped before any markup is added, so a document containing
// `<script>` renders those characters and never executes them. Link targets are
// restricted to a scheme allowlist for the same reason.
//
// Branding comes from PALETTE.md, not from this file. The palette's fenced JSON
// block supplies every color, font, and measurement the stylesheet uses, so
// editing the palette changes the artifact without touching this script.
//
// Output is deterministic: the same input, palette, and title produce the same
// bytes and therefore the same checksum. Nothing here reads the clock.
//
//   node render.mjs --in <file.md> [--out <path>] [--html-only]
//                   [--palette <file.md>] [--title <text>]
//
// exit codes:
//   0  every requested artifact was written and verified
//   1  the HTML was written but the requested PDF was not produced
//   2  usage error, or an input the renderer could not read

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { accessSync, constants, existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, delimiter, dirname, extname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = dirname(SCRIPT_DIR);
const DEFAULT_PALETTE = join(SKILL_DIR, "PALETTE.md");
const MAX_INPUT_BYTES = 8 * 1024 * 1024;
const PDF_TIMEOUT_MS = 120_000;

const HELP = `usage: render.mjs --in <file.md> [options]

Render a markdown document to a branded, self-contained HTML file, and to a PDF
when a headless browser is available.

options:
  --in <file>        markdown document to render (required)
  --out <path>       artifact path; the sibling format takes the same basename
                     (default: the input path with its extension replaced)
  --html-only        write the HTML and do not attempt a PDF
  --palette <file>   palette file to read design tokens from
                     (default: the skill's own PALETTE.md)
  --title <text>     document title (default: the first level-one heading,
                     then the input filename)
  --help, -h         show this message

exit codes:
  0  every requested artifact was written and verified
  1  the HTML was written but the requested PDF was not produced
  2  usage error, or an input the renderer could not read

A PDF is never faked. If no headless browser is found, the HTML is still
written, the reason is printed, no file named .pdf is created, and the exit
code is 1 because the artifact that was asked for does not exist. Use
--html-only when HTML is the artifact you want; that path exits 0.`;

// ---------------------------------------------------------------- diagnostics

function fail(message, code = 2) {
  console.error("press: " + message);
  process.exit(code);
}

function warn(message) {
  console.error("press: " + message);
}

// -------------------------------------------------------------------- palette

// Built-in fallbacks. These are used only when the palette file is absent or a
// token is missing or malformed, and every substitution is reported on stderr,
// so a silently unbranded artifact is not possible.
const FALLBACK_PALETTE = {
  name: "built-in fallback",
  colors: {
    page: "#eff1f5",
    surface: "#ffffff",
    text: "#3c3f52",
    heading: "#1e2030",
    muted: "#6c7086",
    accent: "#8aadf4",
    border: "#ccd0da",
    "code-surface": "#24273a",
    "code-text": "#cad3f5",
    "quote-surface": "#e6e9f0",
  },
  typography: {
    "body-font": "Georgia, 'Times New Roman', serif",
    "heading-font": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    "mono-font": "'SFMono-Regular', Menlo, Consolas, monospace",
    "base-size": "11pt",
    "line-height": "1.55",
  },
  page: { margin: "18mm", "max-width": "180mm" },
};

// A palette is data, but it becomes CSS, so every value is validated against
// the shape its declaration expects. An unvalidated value could close a
// declaration block and add rules of its own.
const COLOR_RE = /^(?:#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20})$/;
const LENGTH_RE = /^[0-9]+(?:\.[0-9]+)?(?:px|pt|em|rem|mm|cm|in|%)$/;
const RATIO_RE = /^[0-9]+(?:\.[0-9]+)?$/;
const FONT_RE = /^[A-Za-z0-9 ,'"._-]{1,200}$/;

const VALIDATORS = {
  colors: COLOR_RE,
  typography: { "base-size": LENGTH_RE, "line-height": RATIO_RE, default: FONT_RE },
  page: LENGTH_RE,
};

function validatorFor(section, key) {
  const rule = VALIDATORS[section];
  if (!rule) return null;
  if (rule instanceof RegExp) return rule;
  return rule[key] ?? rule.default;
}

function paletteJson(body) {
  const match = body.match(/```json\n([\s\S]*?)\n```/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    warn("palette JSON block is not parseable (" + error.message + ")");
    return null;
  }
}

function loadPalette(path, explicit) {
  let parsed = null;
  if (existsSync(path)) {
    let body;
    try {
      body = readFileSync(path, "utf8");
    } catch (error) {
      if (explicit) fail("cannot read palette file " + path + ": " + error.message);
      warn("cannot read palette file " + path + "; using built-in fallback tokens");
      body = null;
    }
    if (body !== null) {
      parsed = paletteJson(body);
      if (!parsed) {
        if (explicit) fail("palette file " + path + " has no parseable fenced json block");
        warn("palette file " + path + " has no parseable fenced json block; using built-in fallback tokens");
      }
    }
  } else if (explicit) {
    fail("no such palette file: " + path);
  } else {
    warn("no palette at " + path + "; using built-in fallback tokens");
  }

  const merged = { name: FALLBACK_PALETTE.name, colors: {}, typography: {}, page: {} };
  if (parsed && typeof parsed.name === "string") merged.name = parsed.name;
  for (const section of ["colors", "typography", "page"]) {
    for (const [key, fallback] of Object.entries(FALLBACK_PALETTE[section])) {
      const raw = parsed?.[section]?.[key];
      const validator = validatorFor(section, key);
      if (typeof raw === "string" && validator && validator.test(raw.trim())) {
        merged[section][key] = raw.trim();
        continue;
      }
      if (raw !== undefined) warn(`palette token ${section}.${key} is not a valid value; using the fallback`);
      // A token the palette simply omits is reported too. Falling back in
      // silence would hand back an artifact in colors the caller never chose
      // and give no sign that it happened.
      else if (parsed) warn(`palette token ${section}.${key} is missing; using the fallback`);
      merged[section][key] = fallback;
    }
  }
  return merged;
}

// --------------------------------------------------------------- html escaping

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

// Schemes that cannot execute script when a reader clicks the link. Anything
// else — javascript:, data:, vbscript: — loses its anchor and renders as text.
const SAFE_SCHEME = /^(?:https?:|mailto:|tel:)/i;
const HAS_SCHEME = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

function safeHref(raw) {
  const href = raw.trim();
  if (!href) return null;
  if (/[\u0000-\u0020\u007f]/.test(href)) return null;
  if (HAS_SCHEME.test(href)) return SAFE_SCHEME.test(href) ? href : null;
  if (href.startsWith("//")) return null; // protocol-relative: scheme is unknown
  return href; // relative path or fragment
}

// -------------------------------------------------------------- inline markdown

const PLACEHOLDER_OPEN = "\u0001";
const PLACEHOLDER_CLOSE = "\u0002";

// A link label, then a target that allows one level of nested parentheses.
const LINK = /\[([^\]]*)\]\(((?:[^()\s]|\([^()\s]*\))*)\)/g;

// Inline rendering runs in four steps, in this order, because each one depends
// on the previous: code spans and backslash escapes are lifted out first so
// their contents are never read as markup; the remaining text is escaped so no
// document character can become markup; emphasis and links are applied to the
// escaped text; the lifted pieces come back last, escaped in their turn.
function renderInline(source) {
  const lifted = [];
  const stash = (html) => {
    lifted.push(html);
    return PLACEHOLDER_OPEN + (lifted.length - 1) + PLACEHOLDER_CLOSE;
  };

  let text = String(source).replace(/\\([^\n])|(`+)([\s\S]*?)\2/g, (match, escaped, fence, code) => {
    if (escaped !== undefined) return stash(escapeHtml(escaped));
    return stash("<code>" + escapeHtml(code.replace(/^ (.*) $/, "$1")) + "</code>");
  });

  text = escapeHtml(text);

  // Links. The target allows one level of nested parentheses, so a URL such as
  // `javascript:alert(1)` is captured whole and rejected whole rather than
  // leaving a stray bracket in the text. The finished anchor is lifted out so
  // the emphasis pass that follows cannot reach inside the href attribute.
  text = text.replace(LINK, (match, label, target) => {
    const href = safeHref(target);
    const rendered = renderInlineTail(label);
    // The target came out of already-escaped text, so it is escaped already.
    if (!href) return stash(rendered); // unsafe target: keep the words, drop the link
    return stash('<a href="' + href + '">' + rendered + "</a>");
  });

  text = renderInlineTail(text);

  // Restore repeatedly: a lifted anchor can itself contain a lifted code span,
  // and one pass would leave that inner placeholder in the output.
  const placeholder = new RegExp(PLACEHOLDER_OPEN + "(\\d+)" + PLACEHOLDER_CLOSE, "g");
  for (let pass = 0; pass < 8 && text.includes(PLACEHOLDER_OPEN); pass += 1) {
    text = text.replace(placeholder, (match, index) => lifted[Number(index)] ?? "");
  }
  return text;
}

// Emphasis and hard line breaks, applied to already-escaped text.
function renderInlineTail(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])__([^_]+)__(?=[\s).,;:!?]|$)/g, "$1<strong>$2</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>")
    .replace(/ {2,}\n/g, "<br>\n");
}

// --------------------------------------------------------------- block markdown

const ATX_HEADING = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const FENCE_OPEN = /^(\s{0,3})(`{3,}|~{3,})\s*([^\s`]*)[^\n]*$/;
const THEMATIC_BREAK = /^ {0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/;
const BLOCKQUOTE = /^ {0,3}>/;
const LIST_ITEM = /^(\s*)([-*+]|\d{1,9}[.)])(?:[ \t]+(.*)|\s*)$/;
const TABLE_DELIMITER = /^\s*\|?(?:\s*:?-{1,}:?\s*\|)+\s*:?-{0,}:?\s*\|?\s*$/;

function indentWidth(line) {
  let width = 0;
  for (const character of line) {
    if (character === " ") width += 1;
    else if (character === "\t") width += 4 - (width % 4);
    else break;
  }
  return width;
}

// Remove up to `columns` columns of leading whitespace, counting a tab as the
// four columns it occupies, so a dedent never eats a printable character.
function stripIndent(line, columns) {
  let width = 0;
  let index = 0;
  while (index < line.length && width < columns) {
    const character = line[index];
    if (character === " ") width += 1;
    else if (character === "\t") width += 4 - (width % 4);
    else break;
    index += 1;
  }
  return line.slice(index);
}

function isBlank(line) {
  return line === undefined || line.trim() === "";
}

function startsBlock(line) {
  if (isBlank(line)) return true;
  return (
    ATX_HEADING.test(line) ||
    FENCE_OPEN.test(line) ||
    THEMATIC_BREAK.test(line) ||
    BLOCKQUOTE.test(line) ||
    LIST_ITEM.test(line)
  );
}

function splitRow(row) {
  const trimmed = row.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells = [];
  let current = "";
  for (let index = 0; index < trimmed.length; index += 1) {
    const character = trimmed[index];
    if (character === "\\" && trimmed[index + 1] === "|") {
      current += "\\|";
      index += 1;
      continue;
    }
    if (character === "|") {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }
  cells.push(current.trim());
  return cells;
}

function alignmentsOf(delimiterRow) {
  return splitRow(delimiterRow).map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return null;
  });
}

function renderBlocks(lines) {
  const out = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (isBlank(line)) {
      index += 1;
      continue;
    }

    const fence = line.match(FENCE_OPEN);
    if (fence) {
      const [, lead, marker, info] = fence;
      const closer = new RegExp("^\\s{0,3}" + marker[0] + "{" + marker.length + ",}\\s*$");
      const body = [];
      index += 1;
      while (index < lines.length && !closer.test(lines[index])) {
        body.push(stripIndent(lines[index], lead.length));
        index += 1;
      }
      if (index < lines.length) index += 1; // consume the closing fence
      const language = info.replace(/[^A-Za-z0-9_+-]/g, "");
      const attribute = language ? ' class="language-' + language + '"' : "";
      out.push("<pre><code" + attribute + ">" + escapeHtml(body.join("\n")) + "</code></pre>");
      continue;
    }

    if (THEMATIC_BREAK.test(line)) {
      out.push("<hr>");
      index += 1;
      continue;
    }

    const heading = line.match(ATX_HEADING);
    if (heading) {
      const level = heading[1].length;
      out.push("<h" + level + ">" + renderInline(heading[2]) + "</h" + level + ">");
      index += 1;
      continue;
    }

    if (BLOCKQUOTE.test(line)) {
      const body = [];
      while (index < lines.length && !isBlank(lines[index])) {
        const current = lines[index];
        if (BLOCKQUOTE.test(current)) body.push(current.replace(/^ {0,3}>[ \t]?/, ""));
        else body.push(current); // lazy continuation of the quoted paragraph
        index += 1;
      }
      out.push("<blockquote>" + renderBlocks(body) + "</blockquote>");
      continue;
    }

    if (line.includes("|") && !LIST_ITEM.test(line) && TABLE_DELIMITER.test(lines[index + 1] ?? "")) {
      const header = splitRow(line);
      const alignments = alignmentsOf(lines[index + 1]);
      index += 2;
      const rows = [];
      while (index < lines.length && !isBlank(lines[index]) && lines[index].includes("|")) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      out.push(renderTable(header, alignments, rows));
      continue;
    }

    if (LIST_ITEM.test(line)) {
      const [html, next] = renderList(lines, index);
      out.push(html);
      index = next;
      continue;
    }

    const paragraph = [];
    while (index < lines.length && !startsBlock(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length) out.push("<p>" + renderInline(paragraph.join("\n")) + "</p>");
    else index += 1; // defensive: never spin on a line no branch consumed
  }

  return out.join("\n");
}

function cellStyle(alignment) {
  return alignment ? ' style="text-align:' + alignment + '"' : "";
}

function renderTable(header, alignments, rows) {
  const head = header
    .map((cell, column) => "<th" + cellStyle(alignments[column]) + ">" + renderInline(cell) + "</th>")
    .join("");
  const body = rows
    .map((row) => {
      const cells = header.map(
        (ignored, column) =>
          "<td" + cellStyle(alignments[column]) + ">" + renderInline(row[column] ?? "") + "</td>",
      );
      return "<tr>" + cells.join("") + "</tr>";
    })
    .join("\n");
  return (
    '<div class="press-table">\n<table>\n<thead><tr>' +
    head +
    "</tr></thead>\n<tbody>\n" +
    body +
    "\n</tbody>\n</table>\n</div>"
  );
}

// Collect one list at the indentation of its first item. Lines indented past
// that item belong to it, which is what makes nesting work: the nested list is
// simply part of its parent item's content and is parsed by the same recursion.
function renderList(lines, start) {
  const baseIndent = indentWidth(lines[start]);
  const first = lines[start].match(LIST_ITEM);
  const ordered = /\d/.test(first[2]);
  const startNumber = ordered ? Number.parseInt(first[2], 10) : 1;
  const items = [];
  let index = start;

  while (index < lines.length) {
    const line = lines[index];

    if (isBlank(line)) {
      let lookahead = index + 1;
      while (lookahead < lines.length && isBlank(lines[lookahead])) lookahead += 1;
      const continues =
        lookahead < lines.length &&
        (indentWidth(lines[lookahead]) > baseIndent ||
          (indentWidth(lines[lookahead]) === baseIndent && LIST_ITEM.test(lines[lookahead])));
      if (!continues) break;
      if (items.length) items[items.length - 1].lines.push("");
      index = lookahead;
      continue;
    }

    const width = indentWidth(line);
    const item = line.match(LIST_ITEM);

    if (item && width <= baseIndent) {
      if (/\d/.test(item[2]) !== ordered) break; // a different list starts here
      items.push({ lines: [item[3] ?? ""], contentIndent: width + item[2].length + 1 });
      index += 1;
      continue;
    }

    if (width > baseIndent && items.length) {
      const current = items[items.length - 1];
      current.lines.push(stripIndent(line, current.contentIndent));
      index += 1;
      continue;
    }

    break;
  }

  const rendered = items.map((item) => {
    let html = renderBlocks(item.lines);
    // An item whose first block is a lone paragraph is tight, so the wrapper
    // comes off and <li>text</li> reads as one line. This holds whether the
    // paragraph is the whole item or is followed by a nested list; only an item
    // that genuinely carries several paragraphs keeps them wrapped.
    const lead = html.match(/^<p>([\s\S]*?)<\/p>/);
    if (lead && !lead[1].includes("<p>") && !html.slice(lead[0].length).includes("<p>")) {
      html = lead[1] + html.slice(lead[0].length);
    }
    return "<li>" + html + "</li>";
  });

  const tag = ordered ? "ol" : "ul";
  const attribute = ordered && startNumber !== 1 ? ' start="' + startNumber + '"' : "";
  return ["<" + tag + attribute + ">\n" + rendered.join("\n") + "\n</" + tag + ">", index];
}

function renderMarkdown(source) {
  // Control characters other than tab and newline are removed before parsing.
  // This also guarantees the inline placeholders cannot collide with document
  // text, because those two characters can no longer appear in the input.
  const normalized = String(source)
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return renderBlocks(normalized.split("\n"));
}

function firstHeading(source) {
  for (const line of String(source).split(/\r\n?|\n/)) {
    const match = line.match(/^ {0,3}#\s+(.*?)\s*#*\s*$/);
    if (match && match[1].trim()) return match[1].trim();
  }
  return null;
}

// ------------------------------------------------------------------ stylesheet

function stylesheet(palette) {
  const { colors, typography, page } = palette;
  return `:root {
  --press-page: ${colors.page};
  --press-surface: ${colors.surface};
  --press-text: ${colors.text};
  --press-heading: ${colors.heading};
  --press-muted: ${colors.muted};
  --press-accent: ${colors.accent};
  --press-border: ${colors.border};
  --press-code-surface: ${colors["code-surface"]};
  --press-code-text: ${colors["code-text"]};
  --press-quote-surface: ${colors["quote-surface"]};
  --press-body-font: ${typography["body-font"]};
  --press-heading-font: ${typography["heading-font"]};
  --press-mono-font: ${typography["mono-font"]};
  --press-base-size: ${typography["base-size"]};
  --press-line-height: ${typography["line-height"]};
  --press-margin: ${page.margin};
  --press-max-width: ${page["max-width"]};
}
@page { margin: var(--press-margin); }
html { background: var(--press-page); }
body {
  margin: 0;
  padding: var(--press-margin);
  background: var(--press-page);
  color: var(--press-text);
  font-family: var(--press-body-font);
  font-size: var(--press-base-size);
  line-height: var(--press-line-height);
}
.press-document {
  max-width: var(--press-max-width);
  margin: 0 auto;
  padding: calc(var(--press-margin) / 1.5);
  background: var(--press-surface);
  border-top: 4px solid var(--press-accent);
}
.press-masthead {
  margin: 0 0 1.6em;
  padding-bottom: 0.6em;
  border-bottom: 1px solid var(--press-border);
  color: var(--press-muted);
  font-family: var(--press-heading-font);
  font-size: 0.72em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--press-heading-font);
  color: var(--press-heading);
  line-height: 1.25;
  margin: 1.6em 0 0.6em;
  page-break-after: avoid;
}
h1 { font-size: 2em; margin-top: 0; }
h2 { font-size: 1.5em; border-bottom: 1px solid var(--press-border); padding-bottom: 0.2em; }
h3 { font-size: 1.2em; }
h4 { font-size: 1em; letter-spacing: 0.04em; text-transform: uppercase; color: var(--press-muted); }
p { margin: 0 0 1em; }
a { color: var(--press-accent); }
strong { font-weight: 700; color: var(--press-heading); }
ul, ol { margin: 0 0 1em; padding-left: 1.5em; }
li { margin: 0.25em 0; }
li > ul, li > ol { margin: 0.25em 0 0.25em; }
li > p { margin: 0 0 0.4em; }
hr { border: 0; border-top: 1px solid var(--press-border); margin: 2em 0; }
code {
  font-family: var(--press-mono-font);
  font-size: 0.92em;
  background: var(--press-quote-surface);
  border-radius: 3px;
  padding: 0.1em 0.3em;
}
pre {
  background: var(--press-code-surface);
  color: var(--press-code-text);
  padding: 1em;
  overflow-x: auto;
  border-radius: 4px;
  page-break-inside: avoid;
}
pre code { background: none; color: inherit; padding: 0; font-size: 0.85em; }
blockquote {
  margin: 0 0 1em;
  padding: 0.6em 1em;
  background: var(--press-quote-surface);
  border-left: 3px solid var(--press-accent);
  color: var(--press-muted);
}
blockquote p:last-child { margin-bottom: 0; }
.press-table { overflow-x: auto; margin: 0 0 1em; }
table { border-collapse: collapse; width: 100%; font-size: 0.94em; }
th, td { border: 1px solid var(--press-border); padding: 0.45em 0.7em; text-align: left; vertical-align: top; }
th { background: var(--press-quote-surface); color: var(--press-heading); font-family: var(--press-heading-font); }
@media print {
  body { padding: 0; background: var(--press-surface); }
  .press-document { max-width: none; border-top-width: 3px; }
}`;
}

function document(title, palette, bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
${stylesheet(palette)}
</style>
</head>
<body>
<main class="press-document">
<p class="press-masthead">${escapeHtml(title)}</p>
${bodyHtml}
</main>
</body>
</html>
`;
}

// ------------------------------------------------------------------- browser

const BROWSER_NAMES = ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"];
const BROWSER_ENV = ["PUPPETEER_EXECUTABLE_PATH", "CHROME_PATH"];

function isExecutableFile(path) {
  try {
    if (!statSync(path).isFile()) return false;
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function findBrowser() {
  for (const variable of BROWSER_ENV) {
    const value = process.env[variable];
    if (!value) continue;
    if (isExecutableFile(value)) return { path: value, source: variable };
    warn(variable + " is set to " + value + " but that is not an executable file");
  }
  const pathEntries = (process.env.PATH ?? "").split(delimiter).filter(Boolean);
  for (const name of BROWSER_NAMES) {
    for (const entry of pathEntries) {
      const candidate = join(entry, name);
      if (isExecutableFile(candidate)) return { path: candidate, source: "PATH" };
    }
  }
  return null;
}

// Percent-encode each path segment so a document rendered from a directory
// containing a space, a hash, or a question mark still loads.
function fileUrl(path) {
  return "file://" + resolve(path).split("/").map(encodeURIComponent).join("/");
}

function printToPdf(browser, htmlPath, pdfPath) {
  const profile = join(dirname(pdfPath), ".press-chrome-profile");
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    "--no-pdf-header-footer",
    "--user-data-dir=" + profile,
    "--print-to-pdf=" + pdfPath,
    fileUrl(htmlPath),
  ];
  const result = spawnSync(browser.path, args, { encoding: "utf8", timeout: PDF_TIMEOUT_MS });
  rmSync(profile, { recursive: true, force: true });
  if (result.error) return { ok: false, reason: result.error.message };
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim().split("\n").slice(-3).join(" ");
    return { ok: false, reason: "the browser exited " + result.status + (detail ? ": " + detail : "") };
  }
  if (!existsSync(pdfPath)) return { ok: false, reason: "the browser exited 0 but wrote no file" };
  // Absence of error is not evidence: open the artifact and confirm it is a PDF.
  const head = readFileSync(pdfPath).subarray(0, 5).toString("latin1");
  if (head !== "%PDF-") {
    rmSync(pdfPath, { force: true });
    return { ok: false, reason: "the file the browser wrote is not a PDF; it has been removed" };
  }
  return { ok: true };
}

// ------------------------------------------------------------------ reporting

function report(label, path) {
  const bytes = readFileSync(path);
  const digest = createHash("sha256").update(bytes).digest("hex");
  console.log("press: " + label + " " + path);
  console.log("press:   " + bytes.length + " bytes  sha256 " + digest);
  return digest;
}

// ------------------------------------------------------------------------ CLI

const KNOWN_FLAGS = new Set(["--html-only", "--help", "-h"]);
const KNOWN_OPTIONS = new Set(["--in", "--out", "--palette", "--title"]);

function parseArguments(argv) {
  const options = { in: null, out: null, palette: null, title: null, htmlOnly: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(HELP);
      process.exit(0);
    }
    if (argument === "--html-only") {
      options.htmlOnly = true;
      continue;
    }
    if (KNOWN_OPTIONS.has(argument)) {
      const value = argv[index + 1];
      if (value === undefined || KNOWN_FLAGS.has(value) || KNOWN_OPTIONS.has(value)) {
        fail(argument + " needs a value");
      }
      options[argument === "--in" ? "in" : argument.slice(2)] = value;
      index += 1;
      continue;
    }
    fail("unknown argument " + JSON.stringify(argument) + "\nrun render.mjs --help for usage");
  }
  return options;
}

function withExtension(path, extension) {
  const current = extname(path);
  return (current ? path.slice(0, -current.length) : path) + extension;
}

const options = parseArguments(process.argv.slice(2));

if (!options.in) fail("--in <file.md> is required\nrun render.mjs --help for usage");

const inputPath = isAbsolute(options.in) ? options.in : resolve(process.cwd(), options.in);
if (!existsSync(inputPath)) fail("no such input file: " + options.in);
let stats;
try {
  stats = statSync(inputPath);
} catch (error) {
  fail("cannot read input file " + options.in + ": " + error.message);
}
if (!stats.isFile()) fail("input is not a regular file: " + options.in);
if (stats.size > MAX_INPUT_BYTES) {
  fail("input is " + stats.size + " bytes, over the " + MAX_INPUT_BYTES + " byte limit");
}

let source;
try {
  source = readFileSync(inputPath, "utf8");
} catch (error) {
  fail("cannot read input file " + options.in + ": " + error.message);
}

if (options.htmlOnly && options.out && extname(options.out).toLowerCase() === ".pdf") {
  fail("--html-only was given with a .pdf --out path; those ask for different artifacts");
}

const htmlPath = options.out ? withExtension(resolve(process.cwd(), options.out), ".html") : withExtension(inputPath, ".html");
const pdfPath = withExtension(htmlPath, ".pdf");

const palettePath = options.palette
  ? resolve(process.cwd(), options.palette)
  : DEFAULT_PALETTE;
const palette = loadPalette(palettePath, Boolean(options.palette));

const title = options.title?.trim() || firstHeading(source) || basename(inputPath, extname(inputPath));
const html = document(title, palette, renderMarkdown(source));

try {
  mkdirSync(dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, html, "utf8");
} catch (error) {
  fail("cannot write " + htmlPath + ": " + error.message);
}
report("HTML", htmlPath);

if (options.htmlOnly) {
  console.log("press: PDF not requested (--html-only)");
  process.exit(0);
}

const browser = findBrowser();
if (!browser) {
  console.log("press: no headless browser found; the PDF step was skipped");
  console.log("press:   searched " + BROWSER_ENV.join(", ") + ", then PATH for " + BROWSER_NAMES.join(", "));
  console.log("press:   the HTML above is complete and can be printed from any browser");
  console.log("press: PDF NOT PRODUCED");
  process.exit(1);
}

const printed = printToPdf(browser, htmlPath, pdfPath);
if (!printed.ok) {
  console.log("press: the PDF step failed: " + printed.reason);
  console.log("press:   browser " + browser.path + " (found via " + browser.source + ")");
  console.log("press: PDF NOT PRODUCED");
  process.exit(1);
}
report("PDF ", pdfPath);
process.exit(0);
