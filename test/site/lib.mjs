// Small, deliberately narrow helpers for the site/ test suites. Not a general
// YAML parser: it covers exactly the frontmatter shapes this repository's
// site/ pages use (flat scalars, one `lens:` map of four personas each with
// `who`/`value`, and one `steps:` list of `{skill, title, blurb}` maps) and
// nothing else. If a page ever needs a shape outside that, this module should
// grow a matching, still-narrow accessor rather than turn into a YAML engine.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

export function listDir(rel) {
  const abs = join(root, rel);
  if (!existsSync(abs)) return [];
  return readdirSync(abs);
}

export function listMarkdown(rel) {
  return listDir(rel).filter((f) => f.endsWith('.md')).sort();
}

// --- frontmatter -------------------------------------------------------------

export function splitFrontmatter(body) {
  const m = body.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { frontmatter: '', body };
  return { frontmatter: m[1], body: m[2] };
}

function unquote(v) {
  const s = v.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// Top-level (zero-indent) `key: value` scalar. Returns null when the key is
// absent, empty when present with no value.
export function scalar(frontmatter, key) {
  const re = new RegExp(`^${key}:[ \\t]*(.*)$`, 'm');
  const m = frontmatter.match(re);
  if (!m) return null;
  return unquote(m[1]);
}

// The four-persona `lens:` map:
//   lens:
//     novice:
//       who: '...'
//       value: '...'
//     ...
export function lens(frontmatter) {
  const block = frontmatter.match(/^lens:\n((?:[ \t]+.*\n?)*)/m);
  if (!block) return null;
  const text = block[1];
  const out = {};
  for (const persona of ['novice', 'practitioner', 'leader', 'csuite']) {
    const personaBlock = text.match(new RegExp(`^  ${persona}:\\n((?:    .*\\n?)*)`, 'm'));
    if (!personaBlock) { out[persona] = null; continue; }
    const who = personaBlock[1].match(/^\s*who:\s*(.*)$/m);
    const value = personaBlock[1].match(/^\s*value:\s*(.*)$/m);
    out[persona] = { who: who ? unquote(who[1]) : null, value: value ? unquote(value[1]) : null };
  }
  return out;
}

// The journey `steps:` list:
//   steps:
//     - skill: recon
//       title: "..."
//       blurb: "..."
export function steps(frontmatter) {
  const block = frontmatter.match(/^steps:\n((?:[ \t]+.*\n?)*)/m);
  if (!block) return null;
  const items = [];
  const lines = block[1].split('\n');
  let current = null;
  for (const line of lines) {
    const skillMatch = line.match(/^\s*-\s*skill:\s*(.*)$/);
    if (skillMatch) {
      if (current) items.push(current);
      current = { skill: unquote(skillMatch[1]) };
      continue;
    }
    if (!current) continue;
    const kv = line.match(/^\s*(\w+):\s*(.*)$/);
    if (kv) current[kv[1]] = unquote(kv[2]);
  }
  if (current) items.push(current);
  return items;
}

// --- prose stripping (shared by coverage's H2 scan and the language rules) --

// Fenced ``` code blocks and raw <pre>...</pre> HTML blocks are the only two
// ways this corpus embeds literal text that looks like markdown (a fake
// "## heading" inside a terminal transcript, a stray "!" in example output).
// Both are stripped before structural or prose scanning.
export function stripCodeBlocks(body) {
  let out = body.replace(/```[\s\S]*?```/g, '\n');
  out = out.replace(/<pre[\s\S]*?<\/pre>/g, '\n');
  return out;
}

export function stripTags(text) {
  return text.replace(/<[^>]+>/g, ' ');
}

export function h2Headings(bodyAfterFrontmatter) {
  const stripped = stripCodeBlocks(bodyAfterFrontmatter);
  return [...stripped.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

// The raw markdown (frontmatter already stripped, code blocks intact) between
// one "## <heading>" line and the next H2 or the end of the body. Used to
// scope a check — a step-flow div, a tool name — to the section that should
// carry it, rather than the whole page.
export function h2Section(bodyAfterFrontmatter, heading) {
  const lines = bodyAfterFrontmatter.split('\n');
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n');
}

// --- install-block lines, read from the single source of truth -------------

export function installBlockLines() {
  const block = read('.agents/install-block.md');
  const fence = block.match(/```bash\n([\s\S]*?)```/);
  if (!fence) throw new Error('.agents/install-block.md: no ```bash fence found');
  const lines = fence[1].split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error('.agents/install-block.md: expected at least two install lines');
  return lines;
}

// --- skills groups, discovered from the tree (not the manifest) ------------

export function skillGroups() {
  return listDir('skills').filter((entry) => statSync(join(root, 'skills', entry)).isDirectory()).sort();
}
