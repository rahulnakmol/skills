#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const MODEL_ID_RE = /\b(gpt-[0-9]|claude-[a-z0-9-]+|gemini-[0-9]|o[0-9]-)/i;
const DISALLOWED_DEFAULT_RE = /\b(kimi|glm|minimax|deepseek|qwen)\b/i;

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const ent of readdirSync(dir)) {
    const p = join(dir, ent);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (ent === 'SKILL.md') acc.push(p);
  }
  return acc;
}

for (const skillPath of walk(join(root, 'skills'))) {
  const rel = skillPath.replace(root + '/', '');
  const dir = dirname(skillPath);
  const name = basename(dir);
  const body = readFileSync(skillPath, 'utf8');
  const lines = body.split('\n');
  if (lines.length > 120) errors.push(`${rel}: ${lines.length} lines (max 120)`);
  const fm = body.match(/^---\n([\s\S]*?)\n---/);
  if (fm && !fm[1].includes('name:')) errors.push(`${rel}: missing name in frontmatter`);
  const fmName = fm?.[1].match(/name:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
  if (fmName && fmName !== name) {
    errors.push(`${rel}: frontmatter.name (${fmName}) must match dirname (${name})`);
  }
  if (MODEL_ID_RE.test(body) && !rel.includes('model-routing')) {
    errors.push(`${rel}: possible model ID in SKILL.md`);
  }
}

const pluginPath = join(root, '.claude-plugin/plugin.json');
if (existsSync(pluginPath)) {
  const plugin = JSON.parse(readFileSync(pluginPath, 'utf8'));
  for (const skillRef of plugin.skills ?? []) {
    const skillMd = join(root, skillRef, 'SKILL.md');
    if (!existsSync(skillMd)) errors.push(`plugin.json: missing ${skillRef}/SKILL.md`);
  }
}

const modelsPath = join(root, 'skills/developer/model-routing/models.md');
const models = readFileSync(modelsPath, 'utf8');
if (!models.includes('Anthropic, OpenAI, and Google')) {
  errors.push('models.md: missing allowlist policy statement');
}
for (const line of models.split('\n')) {
  if (line.startsWith('|') && DISALLOWED_DEFAULT_RE.test(line) && !line.toLowerCase().includes('override')) {
    if (!line.toLowerCase().includes('example') && !line.toLowerCase().includes('user')) {
      errors.push(`models.md: possible non-allowlist shipped default: ${line.trim()}`);
    }
  }
}

const fixtures = join(root, 'test/fixtures/recon');
if (existsSync(fixtures)) {
  for (const ent of readdirSync(fixtures)) {
    const markers = join(fixtures, ent, 'MARKERS.json');
    if (!existsSync(markers)) errors.push(`fixture ${ent}: missing MARKERS.json`);
  }
}

if (errors.length) {
  console.error('validate.mjs failed:\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('validate.mjs OK');
