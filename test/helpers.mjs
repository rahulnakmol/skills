import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

export function walk(dir, filter = () => true, acc = []) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return acc;
  for (const ent of readdirSync(abs)) {
    const relPath = join(dir, ent);
    if (statSync(join(root, relPath)).isDirectory()) walk(relPath, filter, acc);
    else if (filter(relPath)) acc.push(relPath);
  }
  return acc;
}

export function frontmatter(body) {
  const m = body.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}

export function frontmatterModel(body) {
  const m = frontmatter(body).match(/^model:\s*(.+)$/m);
  return m ? m[1].trim() : null;
}

export function headings(body) {
  return body.split('\n').filter((l) => /^#{1,4} /.test(l)).map((l) => l.trim());
}

export function wordCount(body) {
  return body.split(/\s+/).filter(Boolean).length;
}

export function sectionText(body, heading) {
  const lines = body.split('\n');
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start === -1) return null;
  const level = heading.match(/^#+/)[0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,6}) /);
    if (m && m[1].length <= level) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n');
}
