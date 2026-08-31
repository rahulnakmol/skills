#!/usr/bin/env node
// Generates site/_data/skills.json from .claude-plugin/plugin.json and each
// promoted skill's SKILL.md. Deterministic output — same input, same bytes —
// so the docs site build is reproducible. The consuming templates are
// site/index.html and site/_layouts/{skill,group}.html.
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

// Fixed group ordering for the generated catalog, independent of directory
// listing order (which is filesystem-dependent) or plugin.json order.
const GROUP_ORDER = ['core', 'developer', 'pm', 'branding', 'writing', 'productivity'];

const pluginPath = join(root, '.claude-plugin/plugin.json');
const plugin = JSON.parse(readFileSync(pluginPath, 'utf8'));

function parseFrontmatter(body) {
  const fm = body.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return { name: undefined, description: undefined };
  const block = fm[1];
  const name = block.match(/^name:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1]?.trim();
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  return { name, description };
}

// The H1 states invocation explicitly, e.g. "# Grit (user-invoked)" or
// "# Architect (mixed-invoked specialist)". A handful of charter/overlay
// skills (e.g. responsible-ai-governance) carry no marker at all — those
// fall back to 'unspecified' rather than failing the build. Detection is
// scoped to the H1 line only — searching the whole body is unsafe, since a
// skill's own doc can mention another skill's invocation in passing (e.g.
// conduct's SKILL.md says "sdlc — user-invoked gated loop" about a skill
// it routes to, not about itself).
function detectInvocation(body) {
  const h1 = body.match(/^#\s+.+$/m)?.[0] ?? '';
  if (/\buser-invoked\b/.test(h1)) return 'user-invoked';
  if (/\bmodel-invoked\b/.test(h1)) return 'model-invoked';
  if (/\bmixed-invoked\b/.test(h1)) return 'mixed-invoked';
  return 'unspecified';
}

const byGroup = new Map();
for (const groupId of GROUP_ORDER) byGroup.set(groupId, []);

for (const skillPath of plugin.skills ?? []) {
  // skillPath looks like "skills/<group>/<name>".
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

  if (!name) {
    errors.push(`${rel}: missing frontmatter "name"`);
    continue;
  }
  if (name !== dirName) {
    errors.push(`${rel}: frontmatter name "${name}" does not match directory basename "${dirName}"`);
    continue;
  }
  if (!description) {
    errors.push(`${rel}: missing frontmatter "description"`);
    continue;
  }

  if (!byGroup.has(groupId)) byGroup.set(groupId, []);
  byGroup.get(groupId).push({ name, group: groupId, invocation: detectInvocation(body), description });
}

// Discover every group directory under skills/, including ones with zero
// promoted skills (e.g. writing), so the catalog can show them as planned.
const skillsRoot = join(root, 'skills');
const discoveredGroups = readdirSync(skillsRoot).filter((entry) =>
  statSync(join(skillsRoot, entry)).isDirectory(),
);
for (const groupId of discoveredGroups) {
  if (!byGroup.has(groupId)) byGroup.set(groupId, []);
}

if (errors.length) {
  console.error('gen-docs-data.mjs failed:\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}

const orderedGroupIds = [
  ...GROUP_ORDER.filter((g) => byGroup.has(g)),
  ...[...byGroup.keys()].filter((g) => !GROUP_ORDER.includes(g)).sort(),
];

const groups = orderedGroupIds.map((id) => {
  const skills = byGroup.get(id) ?? [];
  return { id, count: skills.length, skills };
});

const output = { version: plugin.version, groups };

const outDir = join(root, 'site/_data');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'skills.json');
writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const total = groups.reduce((sum, g) => sum + g.count, 0);
console.log(
  `gen-docs-data.mjs OK: ${total} skills across ${groups.length} groups -> ${outPath.replace(root + '/', '')}`,
);
