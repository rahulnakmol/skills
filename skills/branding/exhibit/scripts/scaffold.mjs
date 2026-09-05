#!/usr/bin/env node
// scaffold.mjs : write the branded shell of an exhibit page from a theme
// profile and a storyboard. Zero dependencies beyond the branding-system
// library in this skill group. Node 20+.
//
// The shell is the deterministic part of a page: brand tokens as CSS custom
// properties, the page chrome, one empty labeled section per storyboard act,
// the pinned vendor scripts (GSAP, ScrollTrigger, any plugin an act's motion
// asks for, htmx, Alpine), and the exhibit runtime that binds them. The acts
// are authored afterwards, between the markers this script leaves, and
// verify.mjs checks the result.
//
// Brand comes from a profile in the branding-system schema, never from this
// file. `--theme <skill>` reads a theme skill in this repository;
// `--brand <dir|.skill>` reads a PROFILE.md the agent derived for a brand kept
// elsewhere, so the user's brand repository stays the single source of truth.
//
// Storyboard text is treated as untrusted and escaped before it reaches the
// page. Output is deterministic: nothing here reads the clock or the host.
//
//   node scaffold.mjs --storyboard <file.md> --out <page.html>
//                     (--theme <skill> | --brand <dir|file.skill>)
//                     [--variant <name>] [--mode scroll|deck|explorer]
//                     [--register document|product|cinematic]
//                     [--fonts system|embed|link] [--title <text>]
//
// exit codes:
//   0  the shell was written
//   2  usage error, or an input the script could not read or validate

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  brandTokensCss, MOTION_EFFECTS, MOTION_GRADES, MOTION_REGISTERS, motionOf, parseProfile, SERIES_ROLES, THEME_SKILLS,
  validateProfile, voiceOf,
} from "../../branding-system/scripts/profile-lib.mjs";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = dirname(SCRIPT_DIR);
const BRANDING_ROOT = dirname(SKILL_DIR);
const SHELL_TEMPLATE = join(SKILL_DIR, "templates", "shell.html");
const RUNTIME = join(SCRIPT_DIR, "runtime.js");
const VENDOR_DIR = join(SKILL_DIR, "vendor");
const MAX_INPUT_BYTES = 2 * 1024 * 1024;

export const ACT_TYPES = ["hook", "map", "mechanism", "compare", "evidence", "timeline", "decision", "sandbox", "glossary"];
export const MODES = ["scroll", "deck", "explorer"];
export const FONT_MODES = ["system", "embed", "link"];
export const FRAMES = ["phone", "tablet", "laptop", "browser", "social-square", "social-story", "email", "print-a4", "print-letter", "video-16x9", "video-9x16", "sign"];

// The register a grade permits at most. A calm brand renders a cinematic
// storyboard as a document; a fluid brand renders it as a product page.
const REGISTER_CEILING = { calm: "document", fluid: "product", expressive: "cinematic" };
// The effects a grade permits. Reduced motion, at run time, removes all of them.
export const GRADE_EFFECTS = {
  calm: ["reveal", "focus", "count", "highlight"],
  fluid: ["reveal", "focus", "count", "highlight", "morph", "draw", "spotlight"],
  expressive: [...MOTION_EFFECTS],
};

const HELP = `usage: scaffold.mjs --storyboard <file.md> --out <page.html> (--theme <skill> | --brand <path>) [options]

Write the branded shell of an exhibit page: tokens, chrome, one empty section
per storyboard act, the pinned vendor scripts, and the runtime. Author the acts
inside the markers the shell leaves, then run verify.mjs.

options:
  --storyboard <file>  markdown file with a fenced yaml storyboard block (required)
  --out <path>         page to write (required)
  --theme <skill>      a theme skill in this repository:
                       ${THEME_SKILLS.join(", ")}
  --brand <path>       a brand directory holding PROFILE.md in the branding-system
                       schema, that PROFILE.md itself, or a .skill archive of the
                       directory (for a brand kept outside this repository)
  --variant <name>     profile variant (default: the profile's defaultVariant)
  --mode <name>        scroll, deck, or explorer; overrides storyboard.mode
  --register <name>    document, product, or cinematic; overrides storyboard.register
                       (default: the profile's motion.register, clamped by its grade)
  --fonts <how>        how the brand's web fonts reach the page (default: system)
                         system  declare the stacks; the reader's installed fonts are used
                         embed   inline each <brand dir>/fonts/<Family>-<weight>.woff2
                         link    add one <link> to Google Fonts; the page then fetches fonts
  --title <text>       page title (default: the storyboard title)
  --help, -h           show this message

exit codes:
  0  the shell was written
  2  usage error, or an input the script could not read or validate

A brand directory with no PROFILE.md exits 2 and names BRAND.md: deriving a
profile from a brand's prose is a reading task for the agent, not a parsing
task for this script.`;

// ---------------------------------------------------------------- diagnostics

function fail(message, code = 2) {
  console.error("exhibit: " + message);
  process.exit(code);
}

// -------------------------------------------------------------- html escaping

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

// ------------------------------------------------------------ storyboard yaml

// The storyboard block is a fixed shape: nested maps, lists of maps, and plain
// scalars, two spaces per level. This parser reads exactly that and refuses
// anything else, so a block it cannot read is an error the author sees rather
// than a section that silently goes missing.
export function parseYamlBlock(text) {
  const lines = text
    .split("\n")
    .map((line, index) => ({ raw: line, number: index + 1 }))
    .filter(({ raw }) => raw.trim() !== "" && !raw.trim().startsWith("#"));

  function indentOf(raw) {
    const match = raw.match(/^( *)/);
    if (raw[match[1].length] === "\t") throw new Error("tabs are not allowed in the storyboard block");
    return match[1].length;
  }

  function scalar(value) {
    const trimmed = value.trim();
    if (trimmed === "") return "";
    if (/^(['"]).*\1$/.test(trimmed)) return trimmed.slice(1, -1);
    if (/^\[.*\]$/.test(trimmed)) {
      const inner = trimmed.slice(1, -1).trim();
      return inner === "" ? [] : inner.split(",").map((item) => scalar(item));
    }
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    if (trimmed === "null" || trimmed === "~") return null;
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
    if (/^[|>]/.test(trimmed)) throw new Error("block scalars (| and >) are not supported; write the value on one line");
    return trimmed;
  }

  let position = 0;

  function parseNode(indent) {
    if (position >= lines.length) return null;
    const { raw } = lines[position];
    if (indentOf(raw) !== indent) throw new Error("unexpected indentation at line " + lines[position].number);
    return raw.trim().startsWith("- ") || raw.trim() === "-" ? parseList(indent) : parseMap(indent);
  }

  function parseMap(indent) {
    const out = {};
    while (position < lines.length) {
      const { raw, number } = lines[position];
      const current = indentOf(raw);
      if (current < indent) break;
      if (current > indent) throw new Error("unexpected indentation at line " + number);
      const match = raw.trim().match(/^([A-Za-z_][A-Za-z0-9_-]*):(?:\s+(.*))?$/);
      if (!match) throw new Error("expected `key: value` at line " + number + ": " + raw.trim());
      const [, key, value] = match;
      position += 1;
      if (value === undefined || value === "") {
        const next = lines[position];
        if (next && indentOf(next.raw) > indent) out[key] = parseNode(indentOf(next.raw));
        else out[key] = "";
      } else {
        out[key] = scalar(value);
      }
    }
    return out;
  }

  function parseList(indent) {
    const out = [];
    while (position < lines.length) {
      const { raw, number } = lines[position];
      const current = indentOf(raw);
      if (current < indent) break;
      if (current > indent) throw new Error("unexpected indentation at line " + number);
      const body = raw.trim();
      if (!(body.startsWith("- ") || body === "-")) throw new Error("expected a list item at line " + number);
      const rest = body.slice(1).trim();
      if (rest === "") {
        position += 1;
        const next = lines[position];
        out.push(next && indentOf(next.raw) > indent ? parseNode(indentOf(next.raw)) : null);
        continue;
      }
      const pair = rest.match(/^([A-Za-z_][A-Za-z0-9_-]*):(?:\s+(.*))?$/);
      if (!pair) {
        out.push(scalar(rest));
        position += 1;
        continue;
      }
      // A map item: the first key sits on the dash line, the rest two columns in.
      const itemIndent = indent + 2;
      lines[position] = { raw: " ".repeat(itemIndent) + rest, number };
      out.push(parseMap(itemIndent));
    }
    return out;
  }

  const root = parseNode(0);
  if (position < lines.length) throw new Error("unexpected content at line " + lines[position].number);
  return root;
}

function effectList(value, label) {
  if (value === undefined || value === "" || value === null) return [];
  const list = Array.isArray(value) ? value : String(value).split(",").map((item) => item.trim()).filter(Boolean);
  for (const effect of list) {
    if (!MOTION_EFFECTS.includes(effect)) throw new Error(label + " names " + JSON.stringify(effect) + ", not an effect (" + MOTION_EFFECTS.join(", ") + ")");
  }
  return [...new Set(list)];
}

export function parseStoryboard(markdown) {
  const block = markdown.match(/```ya?ml\n([\s\S]*?)\n```/);
  if (!block) throw new Error("the storyboard has no fenced yaml block");
  const parsed = parseYamlBlock(block[1]);
  const board = parsed?.storyboard;
  if (!board || typeof board !== "object") throw new Error("the yaml block must start with `storyboard:`");
  for (const key of ["title", "question", "thesis", "audience"]) {
    if (typeof board[key] !== "string" || board[key].trim() === "") throw new Error("storyboard." + key + " is required");
  }
  if (!Array.isArray(board.acts) || board.acts.length === 0) throw new Error("storyboard.acts must list at least one act");
  const seen = new Set();
  const acts = board.acts.map((act, index) => {
    const label = "acts[" + index + "]";
    if (!act || typeof act !== "object") throw new Error(label + " is not a map");
    if (!ACT_TYPES.includes(act.type)) throw new Error(label + ".type must be one of " + ACT_TYPES.join(", "));
    if (typeof act.claim !== "string" || act.claim.trim() === "") throw new Error(label + ".claim is required");
    const id = String(act.id ?? act.type).trim();
    if (!/^[a-z][a-z0-9-]*$/.test(id)) throw new Error(label + ".id must be lowercase letters, digits, and hyphens");
    if (seen.has(id)) throw new Error("two acts share the id " + JSON.stringify(id) + "; give one an explicit id");
    seen.add(id);
    const frame = String(act.frame ?? "").trim();
    if (frame && !FRAMES.includes(frame)) throw new Error(label + ".frame must be one of " + FRAMES.join(", "));
    return {
      id,
      type: act.type,
      claim: act.claim.trim(),
      figure: String(act.figure ?? "").trim(),
      interaction: String(act.interaction ?? "").trim(),
      export: String(act.export ?? "").trim(),
      motion: effectList(act.motion, label + ".motion"),
      frame,
    };
  });
  if (acts[0].type !== "hook") throw new Error("the first act must be a hook: the page opens with a question and a concrete experience");
  const glossary = acts.findIndex((act) => act.type === "glossary");
  if (glossary !== -1) {
    const landing = acts.findIndex((act) => act.type === "sandbox" || act.type === "decision");
    if (landing === -1 || landing > glossary) throw new Error("a glossary must follow a sandbox or a decision act");
  }
  const mode = board.mode === undefined || board.mode === "" ? "scroll" : String(board.mode);
  if (!MODES.includes(mode)) throw new Error("storyboard.mode " + JSON.stringify(mode) + " is not available in this version (" + MODES.join(", ") + ")");
  const register = board.register === undefined || board.register === "" ? null : String(board.register);
  if (register !== null && !MOTION_REGISTERS.includes(register)) throw new Error("storyboard.register " + JSON.stringify(register) + " must be one of " + MOTION_REGISTERS.join(", "));
  return { title: board.title.trim(), question: board.question.trim(), thesis: board.thesis.trim(), audience: board.audience.trim(), mode, register, acts };
}

// ------------------------------------------------------------------- profile

// --theme names a skill in this group. --brand accepts a directory holding
// PROFILE.md, that file, or a .skill archive. The archive is a zip; the system
// unzip opens it so the script itself stays dependency-free.
export function resolveBrand({ theme, brand }) {
  if (theme) {
    if (!THEME_SKILLS.includes(theme)) throw new Error("--theme must be one of " + THEME_SKILLS.join(", "));
    return { profilePath: join(BRANDING_ROOT, theme, "PROFILE.md"), skillDir: join(BRANDING_ROOT, theme), skill: theme, external: false };
  }
  const absolute = resolve(process.cwd(), brand);
  if (!existsSync(absolute)) throw new Error("no such brand path: " + brand);
  let directory = absolute;
  let archive = null;
  if (statSync(absolute).isFile()) {
    const extension = extname(absolute).toLowerCase();
    if (extension === ".md") {
      return { profilePath: absolute, skillDir: dirname(absolute), skill: null, external: true };
    }
    if (extension === ".skill" || extension === ".zip") {
      const target = mkdtempSync(join(tmpdir(), "exhibit-brand-"));
      const result = spawnSync("unzip", ["-o", "-q", absolute, "-d", target], { encoding: "utf8" });
      if (result.error) throw new Error("cannot open " + basename(absolute) + ": the system has no `unzip`; extract the archive and pass the directory");
      if (result.status !== 0) throw new Error("unzip failed on " + basename(absolute) + ": " + (result.stderr || "").trim());
      archive = absolute;
      const entries = readdirSync(target).filter((entry) => !entry.startsWith("__MACOSX") && !entry.startsWith("."));
      directory = entries.length === 1 && statSync(join(target, entries[0])).isDirectory() ? join(target, entries[0]) : target;
    } else {
      throw new Error("--brand must be a directory, a PROFILE.md, or a .skill archive");
    }
  }
  const profilePath = join(directory, "PROFILE.md");
  if (!existsSync(profilePath)) {
    throw new Error(
      "no PROFILE.md in " + (archive ? basename(archive) : brand) +
        ". Derive one in the branding-system schema by reading the brand as BRAND.md describes, show it to the user, and write it beside the brand.",
    );
  }
  return { profilePath, skillDir: directory, skill: null, external: true };
}

// The profile, parsed and validated. For a theme the skill name is checked;
// for an external brand the profile's own `skill` field is taken as its name.
export function loadProfile(resolved) {
  let profile;
  try {
    profile = parseProfile(resolved.profilePath);
  } catch (error) {
    throw new Error("cannot read " + resolved.profilePath + ": " + error.message);
  }
  const expected = resolved.skill ?? profile.skill;
  const problems = validateProfile(profile, expected);
  if (problems.length) throw new Error("profile " + resolved.profilePath + " failed validation:\n  - " + problems.join("\n  - "));
  return profile;
}

export function chooseVariant(profile, requested) {
  const names = Object.keys(profile.variants);
  if (requested) {
    if (!names.includes(requested)) throw new Error("the profile has no variant named " + JSON.stringify(requested) + " (has: " + names.join(", ") + ")");
    return requested;
  }
  return profile.defaultVariant;
}

// The register the page renders in: the flag, then the storyboard, then the
// profile's default, and never above what the profile's grade permits.
export function chooseRegister(profile, storyboard, requested) {
  const motion = motionOf(profile);
  const asked = requested ?? storyboard.register ?? motion.register;
  if (!MOTION_REGISTERS.includes(asked)) throw new Error("register must be one of " + MOTION_REGISTERS.join(", "));
  const ceiling = REGISTER_CEILING[motion.grade];
  const rank = (name) => MOTION_REGISTERS.indexOf(name);
  const register = rank(asked) > rank(ceiling) ? ceiling : asked;
  return { register, asked, grade: motion.grade, clamped: register !== asked };
}

// Every effect an act asks for must be one the brand permits at its grade and
// does not forbid. A storyboard that asks for more is refused with the names.
export function checkActMotion(profile, storyboard) {
  const motion = motionOf(profile);
  const permitted = new Set(GRADE_EFFECTS[motion.grade]);
  const problems = [];
  for (const act of storyboard.acts) {
    for (const effect of act.motion) {
      if (motion.forbid.includes(effect)) problems.push("act " + act.id + " asks for " + effect + ", which the brand forbids");
      else if (!permitted.has(effect)) problems.push("act " + act.id + " asks for " + effect + ", which the brand's " + motion.grade + " grade does not permit");
    }
  }
  return problems;
}

// -------------------------------------------------------------------- tokens

// Exhibit's own tokens sit beside the brand's: spacing, radii, and the four
// chart series, which are the semantic roles in the order the engine's own
// specimen uses. Nothing here names a color of its own.
const SPACING = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 8: 48, 12: 64, 16: 96 };

export function exhibitTokensCss() {
  const lines = [":root {"];
  for (const step of Object.keys(SPACING).sort((a, b) => Number(a) - Number(b))) lines.push("  --x-space-" + step + ": " + SPACING[step] + "px;");
  lines.push("  --x-radius-control: 8px;", "  --x-radius-card: 16px;", "  --x-radius-device: 40px;");
  SERIES_ROLES.forEach((role, index) => lines.push("  --x-series-" + (index + 1) + ": var(--brand-" + role + ");"));
  lines.push("}");
  return lines.join("\n") + "\n";
}

export function tokensCss(profile, variantName) {
  const variant = profile.variants[variantName];
  return brandTokensCss({
    colors: variant.modes.light.colors,
    darkColors: variant.modes.dark.colors,
    typography: variant.typography,
    motion: motionOf(profile),
  }) + exhibitTokensCss();
}

// --------------------------------------------------------------------- fonts

// The profile names one family per role. With --fonts embed, every
// <brand dir>/fonts/<FamilyWithoutSpaces>-<weight>.woff2 for those families is
// inlined as a data URI, so the page still fetches nothing. A family with no
// file is an error that names the path: the script never substitutes a font.
export function fontFamilies(profile, variantName) {
  const typography = profile.variants[variantName].typography;
  return [...new Set(["display", "body", "mono"].map((role) => typography[role].family))];
}

export function embeddedFontFaces(profile, variantName, skillDir) {
  const lines = [];
  const fontsDir = join(skillDir, "fonts");
  for (const family of fontFamilies(profile, variantName)) {
    const stem = family.replace(/\s+/g, "");
    const files = existsSync(fontsDir) ? readdirSync(fontsDir).filter((file) => new RegExp("^" + stem + "-\\d{3}\\.woff2$").test(file)).sort() : [];
    if (files.length === 0) throw new Error("--fonts embed needs " + join(fontsDir, stem + "-<weight>.woff2") + " for " + family + "; add the files or use --fonts system or --fonts link");
    for (const file of files) {
      const weight = file.match(/-(\d{3})\.woff2$/)[1];
      const data = readFileSync(join(fontsDir, file)).toString("base64");
      lines.push(
        "@font-face {",
        "  font-family: \"" + family + "\";",
        "  font-weight: " + weight + ";",
        "  font-style: normal;",
        "  font-display: swap;",
        "  src: url(data:font/woff2;base64," + data + ") format(\"woff2\");",
        "}",
      );
    }
  }
  return lines.join("\n");
}

export function googleFontsLink(profile, variantName) {
  const query = fontFamilies(profile, variantName)
    .map((family) => "family=" + family.replace(/ /g, "+") + ":wght@400;500;700")
    .join("&");
  return '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + query + '&display=swap">';
}

// -------------------------------------------------------------------- vendor

export function loadVendorManifest() {
  return JSON.parse(readFileSync(join(VENDOR_DIR, "manifest.json"), "utf8"));
}

// The libraries a page carries: every `always` library, plus each plugin whose
// role an act's motion list names. Order follows the manifest, so GSAP comes
// before its plugins and Alpine, which starts on load, comes last.
export function vendorSelection(manifest, storyboard) {
  const roles = new Set(storyboard.acts.flatMap((act) => act.motion));
  return manifest.libraries.filter((library) => library.role === "always" || roles.has(library.role));
}

// Alpine starts itself on a microtask as soon as its script has run, so it is
// returned apart from the rest: the template places the runtime, which
// registers its components on alpine:init, between the two.
export function vendorBlocks(manifest, storyboard) {
  const block = (library) => {
    const bytes = readFileSync(join(VENDOR_DIR, library.file));
    const sha = createHash("sha256").update(bytes).digest("hex");
    if (sha !== library.sha256) throw new Error("vendor/" + library.file + " does not match its pinned checksum; restore the file from " + library.source);
    return '<script id="exhibit-vendor-' + library.id + '" data-version="' + escapeHtml(library.version) + '" data-license="' + escapeHtml(library.license) + '">\n' +
      bytes.toString("utf8").replace(/<\/script/gi, "<\\/script") + "\n</script>";
  };
  const selected = vendorSelection(manifest, storyboard);
  return {
    vendor: selected.filter((library) => library.id !== "alpine").map(block).join("\n"),
    alpine: selected.filter((library) => library.id === "alpine").map(block).join("\n"),
  };
}

// --------------------------------------------------------------------- shell

const TYPE_LABELS = {
  hook: "Hook", map: "Map", mechanism: "Mechanism", compare: "Compare", evidence: "Evidence",
  timeline: "Timeline", decision: "Decision", sandbox: "Sandbox", glossary: "Glossary",
};

export function actSection(act, index) {
  const id = "act-" + act.id;
  const motion = act.motion.length ? ' data-motion="' + escapeHtml(act.motion.join(" ")) + '"' : "";
  const frame = act.frame ? ' data-frame-hint="' + escapeHtml(act.frame) + '"' : "";
  return [
    `<section class="act" id="${id}" data-act="${escapeHtml(act.id)}" data-type="${act.type}"${motion}${frame} aria-labelledby="${id}-title">`,
    `  <header class="act-head" x-reveal>`,
    `    <p class="x-kicker">Act ${index + 1} · ${TYPE_LABELS[act.type]}</p>`,
    `    <h2 id="${id}-title">${escapeHtml(act.claim)}</h2>`,
    `  </header>`,
    `  <!-- exhibit:begin ${escapeHtml(act.id)} -->`,
    `  <!-- exhibit:end ${escapeHtml(act.id)} -->`,
    `</section>`,
  ].join("\n");
}

export function buildShell({ template, runtime, vendor, alpine, storyboard, profile, variantName, register, title, fonts, fontFaces = "", fontsHead = "" }) {
  const motion = motionOf(profile);
  const voice = voiceOf(profile);
  const replacements = {
    mode: storyboard.mode,
    register,
    grade: motion.grade,
    forbid: escapeHtml(motion.forbid.join(" ")),
    theme: escapeHtml(profile.skill),
    variant: escapeHtml(variantName),
    fonts,
    fonts_head: fontsHead ? fontsHead + "\n" : "",
    title: escapeHtml(title),
    kicker: escapeHtml(profile.title + " · " + variantName),
    question: escapeHtml(storyboard.question),
    thesis: escapeHtml(storyboard.thesis),
    tokens: (fontFaces ? fontFaces + "\n" : "") + tokensCss(profile, variantName),
    nav: storyboard.acts.map((act, index) => `    <li><a href="#act-${escapeHtml(act.id)}">${index + 1}. ${escapeHtml(TYPE_LABELS[act.type])}</a></li>`).join("\n"),
    acts: storyboard.acts.map(actSection).join("\n"),
    colophon: escapeHtml("Thesis: " + storyboard.thesis + " Written for " + storyboard.audience + "."),
    voice_avoid: escapeHtml(voice.avoid.join("|")),
    vendor,
    alpine,
    runtime: runtime.replace(/<\/script/gi, "<\\/script"),
  };
  return template.replace(/\{\{([a-z_]+)\}\}/g, (match, key) => {
    if (!(key in replacements)) throw new Error("the shell template names an unknown placeholder " + match);
    return replacements[key];
  });
}

// ------------------------------------------------------------------------ CLI

const KNOWN_OPTIONS = new Set(["--storyboard", "--out", "--theme", "--brand", "--variant", "--mode", "--register", "--fonts", "--title"]);

function parseArguments(argv) {
  const options = { storyboard: null, out: null, theme: null, brand: null, variant: null, mode: null, register: null, fonts: "system", title: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(HELP);
      process.exit(0);
    }
    if (KNOWN_OPTIONS.has(argument)) {
      const value = argv[index + 1];
      if (value === undefined || KNOWN_OPTIONS.has(value)) fail(argument + " needs a value");
      options[argument.slice(2)] = value;
      index += 1;
      continue;
    }
    fail("unknown argument " + JSON.stringify(argument) + "\nrun scaffold.mjs --help for usage");
  }
  return options;
}

function readInput(path, label) {
  const absolute = resolve(process.cwd(), path);
  if (!existsSync(absolute)) fail("no such " + label + ": " + path);
  const stats = statSync(absolute);
  if (!stats.isFile()) fail(label + " is not a regular file: " + path);
  if (stats.size > MAX_INPUT_BYTES) fail(label + " is " + stats.size + " bytes, over the " + MAX_INPUT_BYTES + " byte limit");
  return readFileSync(absolute, "utf8");
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  for (const required of ["storyboard", "out"]) {
    if (!options[required]) fail("--" + required + " is required\nrun scaffold.mjs --help for usage");
  }
  if (!options.theme && !options.brand) fail("one of --theme or --brand is required\nrun scaffold.mjs --help for usage");
  if (options.theme && options.brand) fail("pass --theme or --brand, not both");
  if (!FONT_MODES.includes(options.fonts)) fail("--fonts must be one of " + FONT_MODES.join(", "));
  if (options.mode !== null && !MODES.includes(options.mode)) fail("--mode must be one of " + MODES.join(", "));
  if (options.register !== null && !MOTION_REGISTERS.includes(options.register)) fail("--register must be one of " + MOTION_REGISTERS.join(", "));

  let storyboard;
  try {
    storyboard = parseStoryboard(readInput(options.storyboard, "storyboard"));
    if (options.mode) storyboard = { ...storyboard, mode: options.mode };
  } catch (error) {
    fail("storyboard: " + error.message);
  }

  let brand;
  let profile;
  let variantName;
  let chosen;
  try {
    brand = resolveBrand(options);
    profile = loadProfile(brand);
    variantName = chooseVariant(profile, options.variant);
    chosen = chooseRegister(profile, storyboard, options.register);
    const problems = checkActMotion(profile, storyboard);
    if (problems.length) throw new Error("storyboard motion:\n  - " + problems.join("\n  - "));
  } catch (error) {
    fail(error.message);
  }

  let fontFaces = "";
  let fontsHead = "";
  try {
    if (options.fonts === "embed") fontFaces = embeddedFontFaces(profile, variantName, brand.skillDir);
    if (options.fonts === "link") fontsHead = googleFontsLink(profile, variantName);
  } catch (error) {
    fail(error.message);
  }

  let vendor;
  try {
    vendor = vendorBlocks(loadVendorManifest(), storyboard);
  } catch (error) {
    fail(error.message);
  }

  const template = readFileSync(SHELL_TEMPLATE, "utf8");
  const runtime = readFileSync(RUNTIME, "utf8");
  const title = options.title?.trim() || storyboard.title;
  const html = buildShell({ template, runtime, vendor: vendor.vendor, alpine: vendor.alpine, storyboard, profile, variantName, register: chosen.register, title, fonts: options.fonts, fontFaces, fontsHead });

  const outPath = resolve(process.cwd(), options.out);
  try {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
  } catch (error) {
    fail("cannot write " + options.out + ": " + error.message);
  }
  const bytes = readFileSync(outPath);
  const libraries = vendorSelection(loadVendorManifest(), storyboard);
  console.log("exhibit: wrote " + outPath);
  console.log("exhibit:   " + bytes.length + " bytes  sha256 " + createHash("sha256").update(bytes).digest("hex"));
  console.log("exhibit:   theme " + profile.skill + "  variant " + variantName + "  fonts " + options.fonts + "  mode " + storyboard.mode);
  console.log("exhibit:   register " + chosen.register + "  grade " + chosen.grade + (chosen.clamped ? "  (asked for " + chosen.asked + "; the grade clamps it)" : ""));
  console.log("exhibit:   vendor " + libraries.map((library) => library.id + "@" + library.version).join(", "));
  console.log("exhibit:   acts " + storyboard.acts.map((act) => act.id).join(", "));
  console.log("exhibit: next, author each act between its exhibit:begin and exhibit:end markers, then run verify.mjs");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
