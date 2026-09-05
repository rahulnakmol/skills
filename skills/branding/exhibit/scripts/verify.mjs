#!/usr/bin/env node
// verify.mjs : check a finished exhibit page against its storyboard, against
// exhibit's own contract, and against the brand profile it was scaffolded with.
// Zero dependencies. Node 20+.
//
// Four groups of checks, each one named so a failure can be traced to the
// rule that caused it:
//
//   structural  one file, no network, vendor scripts byte-identical to the
//               pinned copies, tokens only in the shell, every storyboard act
//               present and authored, labeled figures and controls, known
//               frames, size budget
//   brand       the machine-checkable part of the profile: palette colors
//               only, series count and order, reduced motion and dark scheme,
//               font stacks, text sizes, computed contrast, accents kept off
//               body text, the motion grade and forbid list, the voice
//               avoid-list when the profile has one
//   render      the page in a headless browser: it boots with no script
//               errors, every act captured at 1280 and 390 px wide in light
//               and dark scheme and composed into a contact sheet the agent
//               reads; no horizontal overflow at phone width, tap targets at
//               44 px, body text at 16 px, and no act content left at
//               opacity 0 after Exhibit.finish()
//   pdf         with --pdf, the browser's own print path after
//               Exhibit.finish(): a valid PDF, at least one page per act in
//               deck mode or the cinematic register, and the file written
//               for the press skill or the reader
//
//   node verify.mjs --in <page.html> --storyboard <file.md>
//                   [--theme <skill> | --brand <path>] [--variant <name>]
//                   [--budget <bytes>] [--sheet <png>] [--captures <dir>]
//                   [--pdf <file>] [--no-render]
//
// exit codes:
//   0  every check passed and the render pass ran (or was skipped by flag)
//   1  one or more checks failed, or no browser was found for the render pass
//   2  usage error, or an input the script could not read

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Browser, BROWSER_ENV, BROWSER_NAMES, fileUrl, findBrowser } from "./browser.mjs";
import { FRAMES, GRADE_EFFECTS, chooseVariant, loadProfile, loadVendorManifest, parseStoryboard, resolveBrand } from "./scaffold.mjs";
import { COLOR_ROLES, MOTION_REGISTERS, SERIES_ROLES, THEME_SKILLS, contrast, motionOf, voiceOf } from "../../branding-system/scripts/profile-lib.mjs";

export const DEFAULT_BUDGET = 400 * 1024;
export const MIN_TEXT_PX = 12;
export const MIN_BODY_PX = 16;
export const MIN_TAP_PX = 44;
export const WIDTHS = [1280, 390];
const REGISTER_CEILING = { calm: "document", fluid: "product", expressive: "cinematic" };
// The directive each effect is written with. `focus` has no directive of its
// own: it is the legend component's hover state.
const EFFECT_DIRECTIVE = { reveal: "x-reveal", parallax: "x-parallax", count: "x-count", draw: "x-draw", morph: "x-morph", highlight: "x-highlight", spotlight: "x-spotlight" };

const HELP = `usage: verify.mjs --in <page.html> --storyboard <file.md> [options]

Check a finished exhibit page against its storyboard, exhibit's contract, and
the brand profile's rules. Every check is named; every failure says why.

options:
  --in <file>          the finished page (required)
  --storyboard <file>  the storyboard the page was scaffolded from (required)
  --theme <skill>      the theme skill to check against
                       (default: the skill the page declares in data-theme)
  --brand <path>       a brand directory, PROFILE.md, or .skill archive, for a
                       brand outside this repository
  --variant <name>     profile variant (default: the page's data-variant)
  --budget <bytes>     size budget for the page, not counting the vendor
                       scripts or embedded fonts (default: ${DEFAULT_BUDGET})
  --sheet <png>        where to write the contact sheet (default: <page>.sheet.png)
  --captures <dir>     where to write each act's captures (default: <page>.captures/)
  --pdf <file>         also print the page to this PDF and check it
  --no-render          skip the render pass (and --pdf) while iterating on
                       acts; the final run before reporting must render
  --help, -h           show this message

exit codes:
  0  every check passed and the render pass ran (or --no-render was given)
  1  one or more checks failed, or no browser was found to render with
  2  usage error, or an input the script could not read`;

// ---------------------------------------------------------------- diagnostics

function fail(message, code = 2) {
  console.error("exhibit: " + message);
  process.exit(code);
}

// ------------------------------------------------------------------- parsing

const TOKENS_BLOCK = /<style id="exhibit-tokens">[\s\S]*?<\/style>/;
const CHROME_BLOCK = /<style id="exhibit-chrome">[\s\S]*?<\/style>/;
const VENDOR_BLOCK = /<script id="exhibit-vendor-([a-z0-9-]+)"([^>]*)>([\s\S]*?)<\/script>/g;
const GOOGLE_FONTS_LINK = /<link\b[^>]*\bhref\s*=\s*"https:\/\/fonts\.googleapis\.com\/css2\?[^"]*"[^>]*>/gi;

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

// The vendor scripts are third-party code checked by checksum, not by the
// rules below; every other check reads the page without them.
export function vendorScripts(html) {
  const found = [];
  let match;
  VENDOR_BLOCK.lastIndex = 0;
  while ((match = VENDOR_BLOCK.exec(html)) !== null) {
    const [, id, attributes, escaped] = match;
    found.push({
      id,
      version: attributes.match(/\bdata-version="([^"]*)"/)?.[1] ?? "",
      body: escaped.replace(/^\n/, "").replace(/\n$/, "").replace(/<\\\/script/g, "</script"),
      bytes: Buffer.byteLength(match[0], "utf8"),
    });
  }
  return found;
}

export function withoutVendor(html) {
  return html.replace(VENDOR_BLOCK, "");
}

function styleBlocks(html) {
  const blocks = [];
  const re = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = re.exec(html)) !== null) blocks.push({ id: match[1].match(/\bid="([^"]+)"/)?.[1] ?? null, css: match[2] });
  return blocks;
}

function inlineStyles(html) {
  const out = [];
  const re = /\sstyle\s*=\s*"([^"]*)"/gi;
  let match;
  while ((match = re.exec(html)) !== null) out.push(match[1]);
  return out;
}

function allCss(html) {
  return styleBlocks(html).map((block) => block.css).concat(inlineStyles(html)).join("\n");
}

function actCss(html) {
  return styleBlocks(html).filter((block) => block.id !== "exhibit-tokens" && block.id !== "exhibit-chrome").map((block) => block.css).concat(inlineStyles(html)).join("\n");
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (m, code) => String.fromCodePoint(Number(code)));
}

function visibleText(html) {
  return decodeEntities(
    stripComments(html)
      .replace(/<(script|style|svg|textarea)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ");
}

function expandHex(hex) {
  const value = hex.toLowerCase();
  if (value.length === 4) return "#" + [...value.slice(1)].map((c) => c + c).join("");
  return value.length === 9 ? value.slice(0, 7) : value;
}

function hexColors(text) {
  const out = [];
  const re = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})\b(?![-\w])/gi;
  let match;
  while ((match = re.exec(text)) !== null) {
    // `&#160;` is an entity, `id=#abc` a fragment; neither is a color.
    if (/[&\w]/.test(text[match.index - 1] ?? "")) continue;
    out.push({ hex: expandHex(match[0]), context: text.slice(Math.max(0, match.index - 30), match.index + match[0].length + 10).replace(/\s+/g, " ") });
  }
  return out;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fontFaceBlocks(css) {
  return css.match(/@font-face\s*\{[^}]*\}/g) ?? [];
}

function fontsMode(html) {
  return html.match(/<html\b[^>]*\bdata-fonts\s*=\s*"([^"]+)"/)?.[1] ?? "system";
}

function htmlAttribute(html, name) {
  return html.match(new RegExp("<html\\b[^>]*\\b" + name + "\\s*=\\s*\"([^\"]*)\""))?.[1] ?? null;
}

// The color-mix() the shell uses for the spotlight and any an act writes:
// permitted when every color inside is a brand token or transparent, so the
// result is still a mix of palette colors.
function colorMixInPalette(expression) {
  const inner = expression.replace(/^color-mix\(\s*in\s+[a-z-]+\s*(?:[a-z-]+\s+hue\s*)?,/, "").replace(/\)\s*$/, "");
  return inner.split(",").every((part) => /^\s*(?:var\(--brand-[a-z-]+\)|transparent)(?:\s+\d+(?:\.\d+)?%)?\s*$/.test(part));
}

// ------------------------------------------------------------------- checks

export function runChecks({ html, bytes, storyboard, profile, variantName, manifest, budget }) {
  const variant = profile.variants[variantName];
  const motion = motionOf(profile);
  const voice = voiceOf(profile);
  const checks = [];
  const exceptions = [];
  const add = (name, details) => checks.push({ name, ok: details.length === 0, details });
  const vendor = vendorScripts(html);
  const page = withoutVendor(html);
  const body = stripComments(page);
  const css = allCss(page);
  const fonts = fontsMode(html);
  const fontFaces = fontFaceBlocks(css);
  const actEffects = new Set();
  {
    const re = /<section\b[^>]*\bdata-motion\s*=\s*"([^"]*)"/g;
    let match;
    while ((match = re.exec(page)) !== null) match[1].split(/\s+/).filter(Boolean).forEach((effect) => actEffects.add(effect));
  }

  // ---- structural

  {
    const details = [];
    let checked = body;
    if (fonts === "link") {
      const links = body.match(GOOGLE_FONTS_LINK) ?? [];
      if (links.length) {
        exceptions.push("fonts: link declared; the page fetches " + links.length + " stylesheet" + (links.length > 1 ? "s" : "") + " from fonts.googleapis.com and is not self-contained offline");
        checked = body.replace(GOOGLE_FONTS_LINK, "");
      }
    }
    const network = [
      [/<(script|link|img|iframe|video|audio|source|object|embed)\b[^>]*\b(src|href|srcset|poster|data)\s*=\s*["']\s*(?:https?:)?\/\//gi, "external resource"],
      [/@import\b/gi, "@import"],
      [/url\(\s*["']?\s*(?:https?:)?\/\//gi, "url() to the network"],
      [/\b(fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource)\s*\(/g, "runtime network call"],
      [/\bimport\s*\(/g, "dynamic import"],
      [/\bhx-(get|post|put|patch|delete)\s*=\s*["']\s*(?:https?:)?\/\//gi, "htmx request to the network"],
    ];
    for (const [re, label] of network) {
      let match;
      while ((match = re.exec(checked)) !== null) details.push(label + ": " + match[0].slice(0, 80).replace(/\s+/g, " "));
    }
    add("structural.single-file", details);
  }

  {
    const details = [];
    const byId = new Map(manifest.libraries.map((library) => [library.id, library]));
    const present = new Set();
    for (const script of vendor) {
      const library = byId.get(script.id);
      if (!library) { details.push("vendor script " + script.id + " is not in vendor/manifest.json"); continue; }
      if (present.has(script.id)) details.push("vendor script " + script.id + " is inlined twice");
      present.add(script.id);
      const sha = createHash("sha256").update(script.body, "utf8").digest("hex");
      if (sha !== library.sha256) details.push("vendor script " + script.id + " differs from the pinned " + library.file + " (sha256 " + sha.slice(0, 12) + "…, expected " + library.sha256.slice(0, 12) + "…)");
      if (script.version !== library.version) details.push("vendor script " + script.id + " declares version " + JSON.stringify(script.version) + ", the manifest pins " + library.version);
    }
    for (const library of manifest.libraries) {
      if (library.role === "always" && !present.has(library.id)) details.push("the page has no " + library.name + " (vendor id " + library.id + "); every page carries it");
      if (library.role !== "always" && actEffects.has(library.role) && !present.has(library.id)) details.push("an act declares motion " + library.role + " but the page does not carry " + library.name);
    }
    const order = vendor.map((script) => script.id);
    if (order.length && order[order.length - 1] !== "alpine") details.push("Alpine must be the last vendor script; it starts itself as soon as it runs");
    if (order.indexOf("gsap") > order.indexOf("scrolltrigger") && order.includes("scrolltrigger")) details.push("ScrollTrigger is inlined before GSAP");
    const runtimeAt = page.indexOf('<script id="exhibit-runtime">');
    const alpineAt = html.indexOf('<script id="exhibit-vendor-alpine"');
    if (runtimeAt === -1) details.push("the page has no <script id=\"exhibit-runtime\">");
    else if (alpineAt !== -1 && html.indexOf('<script id="exhibit-runtime">') > alpineAt) details.push("the runtime must come before Alpine, or its components are never registered");
    add("structural.vendor-pinned", details);
  }

  {
    const details = [];
    if (!TOKENS_BLOCK.test(page)) details.push("the page has no <style id=\"exhibit-tokens\"> block; it was not scaffolded by exhibit");
    if (!CHROME_BLOCK.test(page)) details.push("the page has no <style id=\"exhibit-chrome\"> block");
    const outside = page.replace(TOKENS_BLOCK, "").replace(CHROME_BLOCK, "");
    const re = /--(?:x|brand)-[a-z0-9-]+\s*:/g;
    let match;
    while ((match = re.exec(outside)) !== null) {
      const name = match[0].replace(/\s*:$/, "");
      if (name === "--x-highlight" || name === "--x-spotlight-clip" || name === "--exhibit-progress") continue;
      details.push("token redefined outside the shell: " + outside.slice(match.index, match.index + 40).replace(/\s+/g, " "));
    }
    add("structural.tokens-in-shell", details);
  }

  {
    const details = [];
    const ids = [];
    const re = /<section\b[^>]*\bdata-act\s*=\s*"([^"]+)"/g;
    let match;
    while ((match = re.exec(page)) !== null) ids.push(match[1]);
    const expected = storyboard.acts.map((act) => act.id);
    if (ids.join(",") !== expected.join(",")) details.push("page acts [" + ids.join(", ") + "] do not match storyboard acts [" + expected.join(", ") + "] in order");
    add("structural.acts-match-storyboard", details);
  }

  {
    const details = [];
    for (const act of storyboard.acts) {
      const re = new RegExp("<!-- exhibit:begin " + escapeRegExp(act.id) + " -->([\\s\\S]*?)<!-- exhibit:end " + escapeRegExp(act.id) + " -->");
      const match = page.match(re);
      if (!match) details.push("act " + act.id + " has no begin/end markers");
      else if (match[1].trim() === "") details.push("act " + act.id + " is empty between its markers");
    }
    add("structural.acts-authored", details);
  }

  add("structural.export-bar", /id="exhibit-export"/.test(page) ? [] : ["no export control (id=\"exhibit-export\")"]);

  {
    const details = [];
    const re = /<svg\b[^>]*>([\s\S]*?)<\/svg>/gi;
    let match;
    let count = 0;
    while ((match = re.exec(body)) !== null) {
      count += 1;
      if (!/<title\b[^>]*>\s*\S/.test(match[1])) details.push("svg #" + count + " has no <title>: " + match[0].slice(0, 70).replace(/\s+/g, " "));
    }
    add("structural.svg-titles", details);
  }

  {
    const details = [];
    const re = /<(path|line|polyline)\b[^>]*>/gi;
    let match;
    while ((match = re.exec(body)) !== null) {
      const tag = match[0];
      const isArrow = /\bmarker-end\s*=/.test(tag) || /\bclass\s*=\s*"[^"]*\bx-arrow\b/.test(tag);
      if (isArrow && !/\bdata-label\s*=\s*"[^"]*\S[^"]*"/.test(tag)) details.push("arrow without data-label: " + tag.slice(0, 90));
    }
    add("structural.arrows-labeled", details);
  }

  {
    const details = [];
    const labelFor = new Set();
    const labelRe = /<label\b[^>]*\bfor\s*=\s*"([^"]+)"/gi;
    let match;
    while ((match = labelRe.exec(body)) !== null) labelFor.add(match[1]);
    const controlRe = /<(input|select|textarea|button)\b([^>]*)>/gi;
    while ((match = controlRe.exec(body)) !== null) {
      const [tag, kind, attributes] = match;
      if (/\btype\s*=\s*"hidden"/.test(attributes)) continue;
      if (/\baria-label(?:ledby)?\s*=\s*"[^"]*\S/.test(attributes)) continue;
      const id = attributes.match(/\bid\s*=\s*"([^"]+)"/)?.[1];
      if (id && labelFor.has(id)) continue;
      const before = body.slice(0, match.index);
      if (before.lastIndexOf("<label") > before.lastIndexOf("</label>")) continue;
      if (kind.toLowerCase() === "button") {
        const close = body.indexOf("</button>", match.index);
        const inner = close === -1 ? "" : body.slice(match.index + tag.length, close).replace(/<[^>]+>/g, "").trim();
        if (inner || /\bx-text\s*=/.test(attributes)) continue;
      }
      details.push("unlabeled " + kind + ": " + tag.slice(0, 90));
    }
    add("structural.controls-labeled", details);
  }

  {
    const details = [];
    const re = /\bdata-frame\s*=\s*"([^"]+)"/g;
    let match;
    while ((match = re.exec(body)) !== null) {
      if (!FRAMES.includes(match[1])) details.push("unknown frame " + JSON.stringify(match[1]) + "; the shell styles " + FRAMES.join(", "));
    }
    add("structural.frames-known", details);
  }

  {
    const vendorBytes = vendor.reduce((sum, script) => sum + script.bytes, 0);
    const fontBytes = fontFaces.reduce((sum, block) => sum + Buffer.byteLength(block, "utf8"), 0);
    const counted = bytes - vendorBytes - fontBytes;
    add("structural.size-budget", counted <= budget ? [] : [counted + " bytes of page (after " + vendorBytes + " bytes of vendor scripts" + (fontBytes ? " and " + fontBytes + " bytes of embedded fonts" : "") + ") is over the " + budget + " byte budget"]);
  }

  // ---- brand

  const light = variant.modes.light.colors;
  const dark = variant.modes.dark.colors;
  const allowed = new Set([...Object.values(light), ...Object.values(dark)].map((value) => value.toLowerCase()));

  {
    const details = [];
    for (const { hex, context } of hexColors(body)) {
      if (!allowed.has(hex)) details.push(hex + " is not in the " + variantName + " palette (near: " + context.trim() + ")");
    }
    const NAMED = /(?:^|[\s:;"'(,])(white|black|red|blue|green|gray|grey|purple|pink|teal|orange|yellow|cyan|magenta|silver|navy|maroon|olive|lime|aqua|fuchsia|violet|indigo)(?=[\s;"'),]|$)/gi;
    const colorDeclarations = css.match(/(?:^|[;{\s])(?:color|background(?:-color|-image)?|fill|stroke|border(?:-\w+)?(?:-color)?|outline(?:-color)?|accent-color|box-shadow)\s*:[^;}]+/g) ?? [];
    const svgAttributes = body.match(/\b(?:fill|stroke|stop-color|flood-color)\s*=\s*"[^"]*"/g) ?? [];
    for (const declaration of [...colorDeclarations, ...svgAttributes]) {
      let match;
      NAMED.lastIndex = 0;
      while ((match = NAMED.exec(declaration)) !== null) details.push("named color " + match[1] + " in: " + declaration.trim().slice(0, 70));
      const mixes = declaration.match(/color-mix\([^()]*(?:\([^()]*\)[^()]*)*\)/g) ?? [];
      for (const mix of mixes) {
        if (!colorMixInPalette(mix)) details.push("color-mix() must mix brand tokens or transparent only: " + mix.slice(0, 70));
      }
      const rest = mixes.reduce((text, mix) => text.replace(mix, ""), declaration);
      if (/\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/.test(rest)) details.push("functional color notation cannot be checked against the palette: " + declaration.trim().slice(0, 70));
    }
    add("brand.allowed-colors", details);
  }

  {
    const details = [];
    const used = new Set();
    const re = /(?:x-series-|--x-series-|data-series\s*=\s*")(\d+)/g;
    const outsideShell = page.replace(TOKENS_BLOCK, "").replace(CHROME_BLOCK, "");
    let match;
    while ((match = re.exec(outsideShell)) !== null) used.add(Number(match[1]));
    for (const n of used) {
      if (n > SERIES_ROLES.length) details.push("series " + n + " used; the brand system defines " + SERIES_ROLES.length + " (" + SERIES_ROLES.join(", ") + ")");
    }
    const sorted = [...used].sort((a, b) => a - b);
    for (let index = 0; index < sorted.length; index += 1) {
      if (sorted[index] !== index + 1) { details.push("series used out of order: [" + sorted.join(", ") + "]; series count from 1 in the profile's fixed order"); break; }
    }
    add("brand.series-order", details);
  }

  add("brand.reduced-motion", /prefers-reduced-motion/.test(css) ? [] : ["no prefers-reduced-motion media query"]);
  add("brand.dark-scheme", /prefers-color-scheme\s*:\s*dark/.test(css) ? [] : ["the profile has a dark mode and the page never honors prefers-color-scheme: dark"]);

  {
    const details = [];
    const normalize = (stack) => stack.replace(/["']/g, "").replace(/\s*,\s*/g, ",").replace(/\s+/g, " ").trim().toLowerCase();
    const roles = ["display", "body", "mono"];
    const stacks = new Set(roles.map((role) => normalize(variant.typography[role].stack)));
    const families = new Set([...stacks].flatMap((stack) => stack.split(",")));
    for (const block of fontFaces) {
      const family = block.match(/font-family\s*:\s*([^;]+)/)?.[1];
      if (family && !families.has(normalize(family))) details.push("@font-face for " + family.trim() + ", a family no stack in the profile names");
      if (!/src\s*:\s*url\(\s*["']?data:/.test(block)) details.push("@font-face does not embed its file: " + block.slice(0, 70).replace(/\s+/g, " "));
    }
    const cssWithoutFaces = fontFaces.reduce((rest, block) => rest.replace(block, ""), css);
    for (const match of cssWithoutFaces.match(/font-family\s*:\s*[^;}]+/g) ?? []) {
      const value = match.replace(/^font-family\s*:\s*/, "").trim();
      if (/^(inherit|initial|unset)$/.test(value) || /^var\(--brand-font-(display|body|mono)\)$/.test(value)) continue;
      if (!stacks.has(normalize(value))) details.push("font stack not in the profile: " + value.slice(0, 70) + " (use var(--brand-font-display|body|mono))");
    }
    add("brand.fonts", details);
  }

  {
    const details = [];
    for (const match of css.match(/font-size\s*:\s*([0-9.]+)(px|rem|em|pt)/g) ?? []) {
      const [, size, unit] = match.match(/([0-9.]+)(px|rem|em|pt)/);
      const px = unit === "px" ? Number(size) : unit === "pt" ? Number(size) * (4 / 3) : Number(size) * 16;
      if (px < MIN_TEXT_PX - 0.01) details.push(match.trim() + " is under the " + MIN_TEXT_PX + "px minimum");
    }
    for (const match of body.match(/\bfont-size\s*=\s*"([0-9.]+)"/g) ?? []) {
      if (Number(match.match(/([0-9.]+)/)[1]) < MIN_TEXT_PX) details.push(match + " is under the " + MIN_TEXT_PX + "px minimum");
    }
    add("brand.min-text-size", details);
  }

  {
    // The pairs a page always draws: ink on canvas and surface, muted ink on
    // canvas, action-ink on action, in both modes. The engine's own validator
    // checks the same pairs when the profile is built.
    const details = [];
    const pairs = [["ink", "canvas", 4.5], ["ink", "surface", 4.5], ["ink-muted", "canvas", 4.5], ["action-ink", "action", 4.5]];
    for (const [modeName, colors] of [["light", light], ["dark", dark]]) {
      for (const [fg, bg, minimum] of pairs) {
        const ratio = contrast(colors[fg], colors[bg]);
        if (ratio < minimum) details.push(modeName + ": " + fg + " on " + bg + " is " + ratio.toFixed(2) + ":1, under " + minimum + ":1");
      }
    }
    add("brand.contrast", details);
  }

  {
    const details = [];
    const accentRoles = ["accent", "focus", "success", "warning", "error"];
    const accents = new Set(accentRoles.map((role) => "var(--brand-" + role + ")"));
    SERIES_ROLES.forEach((role, index) => accents.add("var(--x-series-" + (index + 1) + ")"));
    for (const role of accentRoles) { accents.add(light[role].toLowerCase()); accents.add(dark[role].toLowerCase()); }
    const TEXT_SELECTOR = /(?:^|[\s,>+~])(?:body|p|h[1-6]|li|td|th|blockquote|figcaption|label|legend|dd|dt)(?=$|[\s,>+~:.[])/;
    for (const rule of actCss(page).split("}")) {
      const [selector, declarations] = rule.split("{");
      if (!declarations || !TEXT_SELECTOR.test(selector.trim())) continue;
      for (const declaration of declarations.match(/(?:^|[;\s])color\s*:\s*[^;]+/g) ?? []) {
        const value = declaration.replace(/^[;\s]*color\s*:\s*/, "").trim().toLowerCase();
        if (accents.has(value)) details.push("accent color on text in `" + selector.trim().slice(0, 50) + "`: " + value);
      }
    }
    add("brand.accent-on-text", details);
  }

  {
    const details = [];
    const grade = htmlAttribute(page, "data-grade");
    const register = htmlAttribute(page, "data-register");
    const declaredForbid = (htmlAttribute(page, "data-motion-forbid") ?? "").split(/\s+/).filter(Boolean);
    if (grade !== motion.grade) details.push("the page declares grade " + JSON.stringify(grade) + "; the profile's grade is " + motion.grade);
    if (declaredForbid.slice().sort().join(" ") !== motion.forbid.slice().sort().join(" ")) details.push("the page declares forbidden effects [" + declaredForbid.join(", ") + "]; the profile forbids [" + motion.forbid.join(", ") + "]");
    const ceiling = REGISTER_CEILING[motion.grade];
    if (!MOTION_REGISTERS.includes(register)) details.push("the page declares register " + JSON.stringify(register) + "; expected one of " + MOTION_REGISTERS.join(", "));
    else if (MOTION_REGISTERS.indexOf(register) > MOTION_REGISTERS.indexOf(ceiling)) details.push("register " + register + " is above what the " + motion.grade + " grade permits (" + ceiling + ")");
    const permitted = new Set(GRADE_EFFECTS[motion.grade] ?? []);
    for (const effect of actEffects) {
      if (motion.forbid.includes(effect)) details.push("an act declares motion " + effect + ", which the brand forbids");
      else if (!permitted.has(effect)) details.push("an act declares motion " + effect + ", which the " + motion.grade + " grade does not permit");
    }
    const acts = body.slice(body.indexOf("<main"), body.lastIndexOf("</main>"));
    for (const [effect, directive] of Object.entries(EFFECT_DIRECTIVE)) {
      const re = new RegExp("\\s" + directive + "(?:\\.[a-z]+)?(?:\\s*=|[\\s>])");
      if (!re.test(acts)) continue;
      if (motion.forbid.includes(effect)) details.push("the acts use " + directive + " and the brand forbids " + effect);
      else if (!permitted.has(effect)) details.push("the acts use " + directive + " and the " + motion.grade + " grade does not permit " + effect);
    }
    if (motion.grade !== "expressive" && /\sx-scene[\s>]/.test(acts)) details.push("the acts use x-scene; scroll-tied scenes need the expressive grade");
    add("brand.motion", details);
  }

  if (voice.avoid.length) {
    const details = [];
    const text = visibleText(page);
    for (const phrase of voice.avoid) {
      const pattern = new RegExp((/^\w/.test(phrase) ? "\\b" : "") + escapeRegExp(phrase) + (/\w$/.test(phrase) ? "\\b" : ""), "i");
      const match = text.match(pattern);
      if (match) details.push(JSON.stringify(phrase) + " near: " + text.slice(Math.max(0, match.index - 30), match.index + phrase.length + 30).trim());
    }
    add("brand.voice", details);
  }

  {
    const details = [];
    const theme = htmlAttribute(page, "data-theme");
    const declaredVariant = htmlAttribute(page, "data-variant");
    if (theme !== profile.skill) details.push("the page declares theme " + JSON.stringify(theme) + " and was checked against " + profile.skill);
    if (declaredVariant !== variantName) details.push("the page declares variant " + JSON.stringify(declaredVariant) + " and was checked against " + variantName);
    add("brand.theme-declared", details);
  }

  return { checks, exceptions };
}

// -------------------------------------------------------------------- render

// Measurements a static read cannot make: where each act sits, whether the
// page overflows sideways, the computed size of body text, and the box of
// every control the reader can touch. Runs inside the page.
const MEASURE = `(() => {
  const rect = (el) => { const r = el.getBoundingClientRect(); return { x: Math.floor(r.left + window.scrollX), y: Math.floor(r.top + window.scrollY), width: Math.ceil(r.width), height: Math.ceil(r.height) }; };
  const out = { ready: document.documentElement.hasAttribute("data-ready"), motion: document.documentElement.getAttribute("data-motion"), scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, masthead: null, acts: {}, body: [], targets: [], hidden: [] };
  const head = document.querySelector(".exhibit-masthead");
  if (head) out.masthead = rect(head);
  document.querySelectorAll("section.act[data-act]").forEach((act) => { out.acts[act.getAttribute("data-act")] = rect(act); });
  document.querySelectorAll(".act p, .act li, .act dd, .act dt").forEach((el) => {
    if (el.closest("figcaption, .x-kicker, .x-step-title, .x-timeline, .x-frame, .x-print-settings")) return;
    const box = el.getBoundingClientRect();
    if (box.width === 0 && box.height === 0) return;
    out.body.push({ px: parseFloat(getComputedStyle(el).fontSize), tag: el.tagName.toLowerCase(), text: el.textContent.trim().slice(0, 40) });
  });
  // After Exhibit.finish() every block a reader should see is at rest and
  // opaque; a block still at opacity 0 was hidden for a reveal that never ran.
  document.querySelectorAll(".act .act-prose, .act p, .act .x-takeaway, .act .x-figure, .act .x-controls, .act .x-step, .act .x-option").forEach((el) => {
    if (el.closest("[data-hidden], [hidden], .x-frame-states, .x-print-settings")) return;
    const box = el.getBoundingClientRect();
    if (box.width === 0 && box.height === 0) return;
    let node = el;
    while (node && node !== document.body) {
      if (parseFloat(getComputedStyle(node).opacity) === 0) { out.hidden.push({ act: (el.closest("section.act") || {}).getAttribute ? el.closest("section.act").getAttribute("data-act") : "", tag: el.tagName.toLowerCase(), cls: el.className.split(" ")[0] || "", text: el.textContent.trim().slice(0, 40) }); break; }
      node = node.parentElement;
    }
  });
  document.querySelectorAll(".act input, .act button, .act select, .act textarea, .act summary, .act a.x-button, .exhibit-export button").forEach((el) => {
    if (el.type === "hidden" || el.closest(".x-frame")) return;
    const target = (el.type === "radio" || el.type === "checkbox") && el.closest("label") ? el.closest("label") : el;
    const box = target.getBoundingClientRect();
    if (box.width === 0 && box.height === 0) return;
    out.targets.push({ w: box.width, h: box.height, tag: el.tagName.toLowerCase(), type: el.type || "", name: el.getAttribute("aria-label") || el.id || el.textContent.trim().slice(0, 30) || el.getAttribute("x-model") || "" });
  });
  return JSON.stringify(out);
})()`;

function slug(text) {
  return String(text).replace(/[^a-z0-9-]/gi, "-");
}

async function settle(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// Capture every act at each width in each scheme, run the rendered checks,
// and compose a contact sheet. Returns checks in the same shape as runChecks
// plus the paths written, so the summary can point at them.
export async function renderPass({ browser, pagePath, storyboard, profile, variantName, capturesDir, sheetPath }) {
  const schemes = ["light", "dark"];
  const checks = [];
  const captures = [];
  const details = { boot: [], overflow: [], targets: [], body: [], hidden: [] };
  const url = fileUrl(pagePath);
  mkdirSync(capturesDir, { recursive: true });

  const page = await browser.openPage();
  const errors = page.collectErrors();
  try {
    for (const width of WIDTHS) {
      await page.setViewport(width, 900);
      await page.setColorScheme("light");
      await page.navigate(url);
      await settle(300);
      // Every reveal and scene at rest, so a capture shows the act and not
      // the moment before it appears.
      const finished = await page.evaluate("window.Exhibit && typeof Exhibit.finish === 'function' ? Exhibit.finish() : 'no runtime'");
      if (finished !== true) details.boot.push("at " + width + " px Exhibit.finish() returned " + JSON.stringify(finished));
      for (const scheme of schemes) {
        if (scheme === "dark" && width !== WIDTHS[0]) continue;
        await page.setColorScheme(scheme);
        await settle(120);
        const measured = JSON.parse(await page.evaluate(MEASURE));
        if (scheme === "light") {
          if (!measured.ready) details.boot.push("at " + width + " px the runtime never set data-ready; Alpine did not start");
          if (measured.scrollWidth > measured.innerWidth) details.overflow.push("at " + width + " px the page is " + measured.scrollWidth + " px wide and scrolls sideways");
          for (const target of measured.targets) {
            if (target.w < MIN_TAP_PX - 0.5 || target.h < MIN_TAP_PX - 0.5) {
              details.targets.push("at " + width + " px, " + target.tag + (target.type ? "[" + target.type + "]" : "") + " " + JSON.stringify(target.name) + " is " + Math.round(target.w) + "x" + Math.round(target.h) + " px, under " + MIN_TAP_PX);
            }
          }
          for (const item of measured.body) {
            if (item.px < MIN_BODY_PX - 0.01) details.body.push("at " + width + " px, <" + item.tag + "> " + JSON.stringify(item.text) + " is " + item.px + " px, under " + MIN_BODY_PX);
          }
          for (const item of measured.hidden) {
            details.hidden.push("at " + width + " px, act " + item.act + ": <" + item.tag + (item.cls ? "." + item.cls : "") + "> " + JSON.stringify(item.text) + " is at opacity 0 after Exhibit.finish()");
          }
        }
        const cells = [["masthead", measured.masthead]].concat(storyboard.acts.map((act) => [act.id, measured.acts[act.id]]));
        for (const [id, rect] of cells) {
          if (!rect || rect.height === 0) continue;
          const file = join(capturesDir, slug(id) + "-" + width + "-" + scheme + ".png");
          const png = await page.capture({ x: 0, y: rect.y, width, height: Math.min(rect.height, 16000) });
          writeFileSync(file, png);
          captures.push({ id, width, scheme, file, height: rect.height });
        }
      }
    }
    for (const error of errors) details.boot.push("page script error: " + String(error).split("\n")[0].slice(0, 160));

    checks.push({ name: "render.boots-clean", ok: details.boot.length === 0, details: details.boot });
    checks.push({ name: "render.no-horizontal-overflow", ok: details.overflow.length === 0, details: details.overflow });
    checks.push({ name: "render.tap-targets", ok: details.targets.length === 0, details: details.targets });
    checks.push({ name: "render.body-text-size", ok: details.body.length === 0, details: details.body });
    checks.push({ name: "render.content-visible", ok: details.hidden.length === 0, details: details.hidden.slice(0, 12) });

    const sheetHtml = contactSheet({ storyboard, profile, variantName, captures, capturesDir });
    const sheetSource = join(capturesDir, "sheet.html");
    writeFileSync(sheetSource, sheetHtml, "utf8");
    await page.setColorScheme("light");
    await page.setViewport(1400, 900);
    await page.navigate(fileUrl(sheetSource));
    const height = Number(await page.evaluate("document.documentElement.scrollHeight"));
    writeFileSync(sheetPath, await page.capture({ x: 0, y: 0, width: 1400, height: Math.min(height, 16000) }));
  } finally {
    await page.close().catch(() => {});
  }
  return { checks, captures, sheet: sheetPath };
}

function contactSheet({ storyboard, profile, variantName, captures, capturesDir }) {
  const esc = (text) => String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const cell = (id, width, scheme, shown) => {
    const capture = captures.find((c) => c.id === id && c.width === width && c.scheme === scheme);
    if (!capture) return "<td></td>";
    return '<td><img src="' + esc(basename(capture.file)) + '" width="' + shown + '" alt="' + esc(id + " at " + width + " px, " + scheme) + '"><div class="meta">' + width + " px · " + scheme + " · " + capture.height + " px tall</div></td>";
  };
  const rows = [["masthead", "masthead"]].concat(storyboard.acts.map((act) => [act.id, act.type]));
  return [
    "<!doctype html><html><head><meta charset=\"utf-8\"><title>Contact sheet</title>",
    "<style>body{margin:0;padding:16px;background:#f2f2f2;color:#222;font:13px/1.4 system-ui,sans-serif}h1{font-size:18px;margin:0 0 4px}p{margin:0 0 12px}table{border-collapse:collapse}th{text-align:left;vertical-align:top;padding:8px 12px 8px 0;width:140px;font-weight:600}td{vertical-align:top;padding:8px 12px 8px 0}img{display:block;max-height:720px;object-fit:cover;object-position:top;border:1px solid #bbb;background:#fff}.meta{color:#555;font-size:11px;margin-top:4px}</style></head><body>",
    "<h1>" + esc(storyboard.title) + "</h1>",
    "<p>" + esc(profile.skill + " / " + variantName + " · mode " + storyboard.mode + " · " + storyboard.acts.length + " acts · captures in " + capturesDir + " · each image is cropped to its top 720 px; open the file for the whole act") + "</p>",
    "<table>",
    ...rows.map(([id, type]) => "<tr><th>" + esc(id) + "<br><span class=\"meta\">" + esc(type) + "</span></th>" + cell(id, 1280, "light", 560) + cell(id, 390, "light", 170) + cell(id, 1280, "dark", 400) + "</tr>"),
    "</table></body></html>",
  ].join("\n");
}

// ----------------------------------------------------------------------- pdf

export function pdfFacts(pdf) {
  const text = pdf.toString("latin1");
  return {
    valid: pdf.subarray(0, 5).toString("latin1") === "%PDF-",
    pages: (text.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length,
    images: (text.match(/\/Subtype\s*\/Image\b/g) ?? []).length,
    bytes: pdf.length,
  };
}

// Print through the browser after Exhibit.finish(), the same path a reader's
// "Save as PDF" takes, so the print stylesheet is what is checked.
export async function pdfPass({ browser, pagePath, storyboard, register, pdfPath }) {
  const page = await browser.openPage();
  try {
    await page.setViewport(1280, 900);
    await page.setColorScheme("light");
    await page.navigate(fileUrl(pagePath));
    await settle(300);
    await page.evaluate("window.Exhibit && typeof Exhibit.finish === 'function' ? Exhibit.finish() : null");
    await page.setMedia("print");
    await settle(120);
    const pdf = await page.printToPDF();
    mkdirSync(resolve(pdfPath, ".."), { recursive: true });
    writeFileSync(pdfPath, pdf);
    const facts = pdfFacts(pdf);
    const checks = [];
    checks.push({ name: "pdf.valid", ok: facts.valid && facts.pages > 0, details: facts.valid ? (facts.pages > 0 ? [] : ["the PDF has no pages"]) : ["the file does not start with %PDF-"] });
    const onePerAct = storyboard.mode === "deck" || register === "cinematic";
    const minimum = onePerAct ? storyboard.acts.length + 1 : 1;
    checks.push({ name: "pdf.pages", ok: facts.pages >= minimum, details: facts.pages >= minimum ? [] : ["the PDF has " + facts.pages + " page" + (facts.pages === 1 ? "" : "s") + "; " + (onePerAct ? "the masthead and each act print on their own page, so at least " + minimum + " were expected" : "at least one was expected")] });
    return { checks, facts, path: pdfPath };
  } finally {
    await page.close().catch(() => {});
  }
}

// ------------------------------------------------------------------------ CLI

const KNOWN_OPTIONS = new Set(["--in", "--storyboard", "--theme", "--brand", "--variant", "--budget", "--sheet", "--captures", "--pdf"]);
const KNOWN_FLAGS = new Set(["--no-render"]);

function parseArguments(argv) {
  const options = { in: null, storyboard: null, theme: null, brand: null, variant: null, budget: null, sheet: null, captures: null, pdf: null, render: true };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(HELP);
      process.exit(0);
    }
    if (KNOWN_FLAGS.has(argument)) { options.render = false; continue; }
    if (KNOWN_OPTIONS.has(argument)) {
      const value = argv[index + 1];
      if (value === undefined || KNOWN_OPTIONS.has(value) || KNOWN_FLAGS.has(value)) fail(argument + " needs a value");
      options[argument.slice(2)] = value;
      index += 1;
      continue;
    }
    fail("unknown argument " + JSON.stringify(argument) + "\nrun verify.mjs --help for usage");
  }
  if (options.theme && options.brand) fail("--theme and --brand are alternatives; give one");
  return options;
}

function readInput(path, label) {
  const absolute = resolve(process.cwd(), path);
  if (!existsSync(absolute)) fail("no such " + label + ": " + path);
  if (!statSync(absolute).isFile()) fail(label + " is not a regular file: " + path);
  return readFileSync(absolute);
}

function printChecks(checks) {
  for (const check of checks) {
    console.log("exhibit: " + (check.ok ? "ok   " : "FAIL ") + check.name);
    for (const detail of check.details) console.log("exhibit:        - " + detail);
  }
}

function group(checks, prefix) {
  return checks.filter((c) => c.name.startsWith(prefix) && !c.ok).length ? "fail" : "pass";
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  for (const required of ["in", "storyboard"]) {
    if (!options[required]) fail("--" + required + " is required\nrun verify.mjs --help for usage");
  }
  const budget = options.budget === null ? DEFAULT_BUDGET : Number(options.budget);
  if (!Number.isInteger(budget) || budget <= 0) fail("--budget must be a positive integer number of bytes");

  const pagePath = resolve(process.cwd(), options.in);
  const bytes = readInput(options.in, "page");
  const html = bytes.toString("utf8");
  const register = htmlAttribute(html, "data-register") ?? "document";

  let storyboard;
  try {
    storyboard = parseStoryboard(readInput(options.storyboard, "storyboard").toString("utf8"));
    const declaredMode = htmlAttribute(html, "data-mode");
    if (declaredMode && declaredMode !== storyboard.mode) storyboard = { ...storyboard, mode: declaredMode };
  } catch (error) {
    fail("storyboard: " + error.message);
  }

  let profile;
  let variantName;
  let manifest;
  try {
    let theme = options.theme;
    if (!theme && !options.brand) {
      const declared = htmlAttribute(html, "data-theme");
      if (!declared) throw new Error("the page declares no data-theme; give --theme or --brand");
      if (!THEME_SKILLS.includes(declared)) throw new Error("the page was scaffolded from the external brand " + JSON.stringify(declared) + "; give --brand <path> so its PROFILE.md can be read");
      theme = declared;
    }
    profile = loadProfile(resolveBrand({ theme, brand: options.brand }));
    variantName = chooseVariant(profile, options.variant ?? htmlAttribute(html, "data-variant") ?? undefined);
    manifest = loadVendorManifest();
  } catch (error) {
    fail(error.message);
  }

  const { checks, exceptions } = runChecks({ html, bytes: bytes.length, storyboard, profile, variantName, manifest, budget });
  printChecks(checks);

  // ---- render pass
  let visual = "skipped (--no-render); open the page and look before reporting";
  let pdfNote = options.pdf ? "skipped (--no-render)" : "not requested (--pdf <file>)";
  let sheet = null;
  let capturesDir = null;
  let rendered = true;
  if (options.render) {
    const browser = findBrowser();
    if (!browser) {
      rendered = false;
      visual = "not run: no browser found (searched " + BROWSER_ENV.join(", ") + ", then PATH for " + BROWSER_NAMES.join(", ") + "); install one or set CHROME_PATH";
      console.log("exhibit: FAIL render.browser");
      console.log("exhibit:        - " + visual);
    } else {
      sheet = resolve(process.cwd(), options.sheet ?? pagePath.replace(/\.html?$/i, "") + ".sheet.png");
      capturesDir = resolve(process.cwd(), options.captures ?? pagePath.replace(/\.html?$/i, "") + ".captures");
      const profileDir = mkdtempSync(join(tmpdir(), "exhibit-browser-"));
      let instance = null;
      try {
        instance = await Browser.launch(browser.path, { profileDir });
        const result = await renderPass({ browser: instance, pagePath, storyboard, profile, variantName, capturesDir, sheetPath: sheet });
        printChecks(result.checks);
        checks.push(...result.checks);
        visual = "pass: " + result.captures.length + " captures at " + WIDTHS.join(" and ") + " px, light and dark; read the sheet";
        console.log("exhibit: ok   render.browser (" + result.captures.length + " captures, " + browser.path + " via " + browser.source + ")");
        if (options.pdf) {
          const pdfPath = resolve(process.cwd(), options.pdf);
          const pdf = await pdfPass({ browser: instance, pagePath, storyboard, register, pdfPath });
          printChecks(pdf.checks);
          checks.push(...pdf.checks);
          pdfNote = pdfPath + " (" + pdf.facts.pages + " pages, " + pdf.facts.bytes + " bytes, " + pdf.facts.images + " raster images)";
        }
      } catch (error) {
        rendered = false;
        visual = "not run: " + error.message + (instance && instance.stderr ? " (browser said: " + instance.stderr.trim().split("\n").slice(-2).join(" ") + ")" : "");
        console.log("exhibit: FAIL render.browser");
        console.log("exhibit:        - " + visual);
      } finally {
        if (instance) await instance.close();
        rmSync(profileDir, { recursive: true, force: true });
      }
    }
  }

  for (const exception of exceptions) console.log("exhibit: note  " + exception);

  const failed = checks.filter((check) => !check.ok);
  const exit = failed.length || !rendered ? 1 : 0;
  console.log("verify:");
  console.log("  page: " + pagePath);
  console.log("  bytes: " + bytes.length);
  console.log("  theme: " + profile.skill);
  console.log("  variant: " + variantName);
  console.log("  mode: " + storyboard.mode);
  console.log("  register: " + register);
  console.log("  grade: " + motionOf(profile).grade);
  console.log("  fonts: " + fontsMode(html));
  console.log("  structural: " + group(checks, "structural."));
  console.log("  brand_rules: " + group(checks, "brand."));
  console.log("  brand_exceptions: " + JSON.stringify(exceptions));
  console.log("  render: " + visual);
  console.log("  pdf: " + pdfNote);
  if (sheet && rendered) console.log("  sheet: " + sheet);
  if (capturesDir && rendered) console.log("  captures: " + capturesDir);
  console.log("  exit: " + exit);
  process.exit(exit);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
