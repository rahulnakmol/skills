#!/usr/bin/env node
// Generates lean wiki stub pages (wiki/Skill-*.md, wiki/Group-*.md) that point
// at the full documentation on the docs site, from .claude-plugin/plugin.json
// and each promoted skill's SKILL.md frontmatter. Deterministic output — same
// input, same bytes — so drift is checkable with --check. Mirrors the house
// style of scripts/gen-docs-data.mjs.
//
// Usage:
//   node scripts/gen-wiki-stubs.mjs           # write stubs
//   node scripts/gen-wiki-stubs.mjs --check   # exit non-zero on drift, write nothing
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const errors = [];

const GROUP_ORDER = ['core', 'developer', 'pm', 'branding', 'writing', 'productivity'];
const GITHUB_BLOB_BASE = 'https://github.com/tqnonline/skills/blob/main';
const wikiDir = join(root, 'wiki');

// --- site base URL, from site/_config.yml (url + baseurl) -----------------
// Reading this instead of hardcoding means the domain-cutover runbook in
// site/README.md — update site/_config.yml, then regenerate — is all it
// takes to repoint every stub link.
const configText = readFileSync(join(root, 'site/_config.yml'), 'utf8');
const configUrl = configText.match(/^url:\s*"?([^"\n]+?)"?\s*$/m)?.[1];
const configBaseurl = configText.match(/^baseurl:\s*"?([^"\n]*?)"?\s*$/m)?.[1] ?? '';
if (!configUrl) errors.push('site/_config.yml: missing "url"');
const siteUrl = `${configUrl ?? ''}${configBaseurl}`.replace(/\/+$/, '');

// --- frontmatter + invocation, same logic as gen-docs-data.mjs ------------
function parseFrontmatter(body) {
  const fm = body.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return { name: undefined, description: undefined };
  const block = fm[1];
  const name = block.match(/^name:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1]?.trim();
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  return { name, description };
}

function frontmatterField(body, field) {
  const fm = body.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return undefined;
  return fm[1].match(new RegExp(`^${field}:\\s*"?([^"\\n]*?)"?\\s*$`, 'm'))?.[1]?.trim();
}

// The H1 states invocation explicitly, e.g. "# Grit (user-invoked)". See
// gen-docs-data.mjs for why detection is scoped to the H1 line only.
function detectInvocation(body) {
  const h1 = body.match(/^#\s+.+$/m)?.[0] ?? '';
  if (/\buser-invoked\b/.test(h1)) return 'user-invoked';
  return 'model-invoked';
}

// --- filename mapping, derived from the existing wiki/ listing ------------
// Some skill/group names title-case incorrectly under naive capitalization
// (ask-fde -> Ask-FDE, not Ask-Fde; pm -> PM, not Pm). Rather than hardcode
// an acronym table, read the mapping straight from the wiki filenames that
// already exist — they encode the correct casing — matched by a normalized
// (lowercased, punctuation-stripped) key.
function normalizedKey(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const wikiFiles = existsSync(wikiDir) ? readdirSync(wikiDir) : [];

function existingTitlesByPrefix(prefix) {
  const map = new Map();
  const re = new RegExp(`^${prefix}-(.+)\\.md$`);
  for (const f of wikiFiles) {
    const m = f.match(re);
    if (m) map.set(normalizedKey(m[1]), m[1]);
  }
  return map;
}

const existingSkillTitles = existingTitlesByPrefix('Skill');
const existingGroupTitles = existingTitlesByPrefix('Group');

function titleCaseFallback(dirName) {
  return dirName
    .split('-')
    .filter(Boolean)
    .map((seg) => seg[0].toUpperCase() + seg.slice(1))
    .join('-');
}

function resolveTitlePart(dirName, existingMap, kind, sourceRef) {
  const key = normalizedKey(dirName);
  if (existingMap.has(key)) return existingMap.get(key);
  const fallback = titleCaseFallback(dirName);
  if (!fallback) {
    errors.push(`${sourceRef}: cannot derive a wiki page name for ${kind} "${dirName}" — ` +
      'no existing wiki page maps to it and no title-case name is derivable');
    return null;
  }
  console.warn(`gen-wiki-stubs: no existing wiki page for ${kind} "${dirName}" (${sourceRef}) — ` +
    `deriving new filename "${kind === 'skill' ? 'Skill' : 'Group'}-${fallback}.md"`);
  return fallback;
}

// --- gather promoted skills, grouped -------------------------------------
const pluginPath = join(root, '.claude-plugin/plugin.json');
const plugin = JSON.parse(readFileSync(pluginPath, 'utf8'));

const skillsByGroup = new Map();
for (const groupId of GROUP_ORDER) skillsByGroup.set(groupId, []);

const skillEntries = [];
for (const skillPath of plugin.skills ?? []) {
  const parts = skillPath.split('/');
  const groupId = parts[1];
  const dirName = basename(skillPath);
  const skillMdPath = join(root, skillPath, 'SKILL.md');
  const rel = `${skillPath}/SKILL.md`;

  if (!existsSync(skillMdPath)) {
    errors.push(`${rel}: not found (declared in .claude-plugin/plugin.json)`);
    continue;
  }
  const body = readFileSync(skillMdPath, 'utf8');
  const { name, description } = parseFrontmatter(body);
  if (!name) { errors.push(`${rel}: missing frontmatter "name"`); continue; }
  if (name !== dirName) {
    errors.push(`${rel}: frontmatter name "${name}" does not match directory basename "${dirName}"`);
    continue;
  }
  if (!description) { errors.push(`${rel}: missing frontmatter "description"`); continue; }

  const titlePart = resolveTitlePart(dirName, existingSkillTitles, 'skill', rel);
  if (!titlePart) continue;

  const entry = {
    name, group: groupId, description,
    invocation: detectInvocation(body),
    titlePart, skillPath, ref: rel.replace(/\/SKILL\.md$/, ''),
  };
  skillEntries.push(entry);
  if (!skillsByGroup.has(groupId)) skillsByGroup.set(groupId, []);
  skillsByGroup.get(groupId).push(entry);
}

// Every skills/<group> directory counts, including ones with zero promoted
// skills (writing) — the wiki still owes them a stub per the task spec.
const skillsRoot = join(root, 'skills');
const discoveredGroups = existsSync(skillsRoot)
  ? readdirSync(skillsRoot).filter((e) => statSync(join(skillsRoot, e)).isDirectory())
  : [];
for (const g of discoveredGroups) if (!skillsByGroup.has(g)) skillsByGroup.set(g, []);

const orderedGroupIds = [
  ...GROUP_ORDER.filter((g) => skillsByGroup.has(g)),
  ...[...skillsByGroup.keys()].filter((g) => !GROUP_ORDER.includes(g)).sort(),
];

// --- render stub content ---------------------------------------------------
function skillStub(entry) {
  const displayName = entry.titlePart.replace(/-/g, ' ');
  const pageUrl = `${siteUrl}/${entry.name}/`;
  const sourceUrl = `${GITHUB_BLOB_BASE}/${entry.skillPath}/SKILL.md`;
  return `# ${displayName}\n\n` +
    `${entry.description}\n\n` +
    `Full documentation: ${pageUrl}\n\n` +
    `Source: [SKILL.md](${sourceUrl})\n\n` +
    `**Invocation:** ${entry.invocation}\n`;
}

function groupStub(groupId, titlePart, skills) {
  const displayName = titlePart.replace(/-/g, ' ');
  const readmePath = join(root, 'skills', groupId, 'README.md');
  const groupMdPath = join(root, 'site/_groups', `${groupId}.md`);
  let description = existsSync(groupMdPath)
    ? frontmatterField(readFileSync(groupMdPath, 'utf8'), 'description')
    : undefined;
  if (!description) {
    errors.push(`site/_groups/${groupId}.md: missing frontmatter "description" (needed for wiki/Group-${titlePart}.md)`);
    description = '';
  }
  const pageUrl = `${siteUrl}/group/${groupId}/`;
  const sourceUrl = `${GITHUB_BLOB_BASE}/skills/${groupId}/README.md`;
  const countLine = skills.length === 0
    ? 'Promoted skills: 0 — charter only, no skills promoted yet.'
    : `Promoted skills: ${skills.length}.`;
  const sourceLine = existsSync(readmePath)
    ? `Source: [README.md](${sourceUrl})\n\n`
    : '';
  return `# ${displayName}\n\n` +
    `${description}\n\n` +
    `${countLine}\n\n` +
    `Full documentation: ${pageUrl}\n\n` +
    sourceLine;
}

const desired = new Map(); // relative wiki path -> content

for (const entry of skillEntries) {
  desired.set(`wiki/Skill-${entry.titlePart}.md`, skillStub(entry));
}

for (const groupId of orderedGroupIds) {
  const titlePart = resolveTitlePart(groupId, existingGroupTitles, 'group', `skills/${groupId}`);
  if (!titlePart) continue;
  desired.set(`wiki/Group-${titlePart}.md`, groupStub(groupId, titlePart, skillsByGroup.get(groupId) ?? []));
}

if (errors.length) {
  console.error('gen-wiki-stubs.mjs failed:\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}

// --- write or check ---------------------------------------------------------
if (CHECK) {
  const drift = [];
  for (const [rel, content] of [...desired].sort(([a], [b]) => a.localeCompare(b))) {
    const abs = join(root, rel);
    if (!existsSync(abs)) { drift.push(`${rel}: missing`); continue; }
    const actual = readFileSync(abs, 'utf8');
    if (actual !== content) drift.push(`${rel}: content differs from generated stub`);
  }
  if (drift.length) {
    console.error('gen-wiki-stubs.mjs --check found drift:\n' + drift.map((d) => ' - ' + d).join('\n'));
    process.exit(1);
  }
  console.log(`gen-wiki-stubs.mjs --check OK: ${desired.size} stubs match (${skillEntries.length} skills, ${orderedGroupIds.length} groups)`);
  process.exit(0);
}

for (const [rel, content] of desired) {
  writeFileSync(join(root, rel), content);
}
console.log(`gen-wiki-stubs.mjs OK: wrote ${desired.size} stubs (${skillEntries.length} skills, ${orderedGroupIds.length} groups) -> wiki/`);
