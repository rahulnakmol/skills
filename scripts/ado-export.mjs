#!/usr/bin/env node
// Reads a slice backlog bundle (a directory of work-item markdown files)
// and writes an Azure DevOps CSV import file. See raise/trackers/ado.md.
import { readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const HELP = `Usage: node scripts/ado-export.mjs <bundle-dir> [--out <file>]

Reads every *.md work item in <bundle-dir> and writes an Azure DevOps
CSV import file (default: ado-import.csv in the current directory).

Each work-item file may open with a frontmatter block:
  ---
  type: Epic | Feature | User Story | Risk | Impediment
  parent: <parent title or id>
  ---
Title is the first "# " heading. Description is the text before the
first "## " heading. Acceptance criteria comes from a "## Acceptance
criteria" section when present.

  --help    show this message and exit
`;

function parseArgs(argv) {
  if (argv.includes('--help') || argv.includes('-h')) return { help: true };
  const out = { help: false, out: 'ado-import.csv' };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out') { out.out = argv[++i]; continue; }
    positional.push(argv[i]);
  }
  out.bundleDir = positional[0];
  return out;
}

function parseFrontmatter(body) {
  const m = body.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fields: {}, rest: body };
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) fields[kv[1].trim().toLowerCase()] = kv[2].trim();
  }
  return { fields, rest: body.slice(m[0].length) };
}

function section(body, heading) {
  const lines = body.split('\n');
  const start = lines.findIndex((l) => l.trim().toLowerCase() === heading.toLowerCase());
  if (start === -1) return '';
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,6} /.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

function parseWorkItem(body, fallbackTitle) {
  const { fields, rest } = parseFrontmatter(body);
  const lines = rest.split('\n');
  const h1 = lines.find((l) => /^# /.test(l));
  const title = h1 ? h1.replace(/^# /, '').trim() : fallbackTitle;
  let description = rest;
  const firstH2 = lines.findIndex((l) => /^## /.test(l));
  if (h1) {
    const h1Index = lines.indexOf(h1);
    const end = firstH2 === -1 ? lines.length : firstH2;
    description = lines.slice(h1Index + 1, end).join('\n').trim();
  }
  return {
    type: fields.type || 'User Story',
    title,
    description,
    acceptanceCriteria: section(rest, '## Acceptance criteria'),
    parent: fields.parent || '',
  };
}

function csvField(value) {
  const s = String(value ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.bundleDir) {
    console.log(HELP);
    process.exit(0);
  }

  const dir = args.bundleDir;
  const files = readdirSync(dir).filter((f) => f.endsWith('.md') && statSync(join(dir, f)).isFile());
  if (files.length === 0) {
    console.error(`No .md work items found in ${dir}`);
    process.exit(1);
  }

  const rows = [['Work Item Type', 'Title', 'Description', 'Acceptance Criteria', 'Parent']];
  for (const file of files) {
    const body = readFileSync(join(dir, file), 'utf8');
    const item = parseWorkItem(body, basename(file, '.md'));
    rows.push([item.type, item.title, item.description, item.acceptanceCriteria, item.parent]);
  }

  const csv = rows.map((row) => row.map(csvField).join(',')).join('\n') + '\n';
  writeFileSync(args.out, csv);
  console.log(`Wrote ${rows.length - 1} work item(s) to ${args.out}`);
}

main();
