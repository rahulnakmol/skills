#!/usr/bin/env node
import { writeFileSync, mkdirSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = [];
function walk(base) {
  for (const ent of readdirSync(base)) {
    const p = join(base, ent);
    if (statSync(p).isDirectory()) walk(p);
    else if (ent === 'SKILL.md') {
      const name = basename(dirname(p));
      const desc = readFileSync(p, 'utf8').match(/description:\s*(.+)/)?.[1] ?? '';
      out.push({ name, description: desc.trim() });
    }
  }
}
walk(join(root, 'skills'));
mkdirSync(join(root, 'agents'), { recursive: true });
writeFileSync(join(root, 'agents/openai.yaml'), '# GENERATED — do not edit\n' + JSON.stringify(out, null, 2));
console.log('Wrote agents/openai.yaml', out.length, 'skills');
