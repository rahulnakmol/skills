#!/usr/bin/env node
// Routing eval: does a model pick the right skill from the catalog's own
// descriptions?
//
// This measures the one thing the structural harness is blind to. `validate.mjs`
// can prove a description exists and is well-formed; it cannot prove the
// description wins selection against thirty-three siblings. A skill that never
// gets chosen has no value however good its doctrine, and nothing in this
// repository could previously detect one.
//
// Scoring is exact-match on the skill name, so no judge model is involved and
// no rubric is negotiable. Each case runs several times because selection is
// stochastic: a case that routes correctly once and wrongly twice is not a
// passing case, and measuring once would report it as one.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../..');

const OPTIONS = { runs: 3, threshold: 1.0, table: join(HERE, 'routing.jsonl'), out: null, only: null, timeoutMs: 120000 };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const next = () => {
    const v = argv[++i];
    if (v === undefined) fail(`${argv[i - 1]} needs a value`);
    return v;
  };
  switch (argv[i]) {
    case '--runs': OPTIONS.runs = Number(next()); break;
    case '--threshold': OPTIONS.threshold = Number(next()); break;
    case '--table': OPTIONS.table = next(); break;
    case '--out': OPTIONS.out = next(); break;
    case '--case': OPTIONS.only = next(); break;
    case '--timeout': OPTIONS.timeoutMs = Number(next()) * 1000; break;
    case '--help': case '-h': usage(); process.exit(0); break;
    default: fail(`unknown option ${argv[i]} (try --help)`);
  }
}

function usage() {
  console.log(`usage: run-routing.mjs [options]

  --runs <n>        attempts per case (default 3; selection is stochastic)
  --threshold <f>   fraction of runs a case must win to pass (default 1.0)
  --table <file>    routing table in jsonl (default routing.jsonl)
  --case <id>       run one case
  --out <file>      write the scorecard here (default results/<date>.json)
  --timeout <secs>  per-attempt timeout (default 120)

exit codes:
  0  every case met the threshold, or the run was skipped for want of a model
  1  at least one case fell below the threshold
  2  usage error, or the table could not be read

A missing model is a skip, never a pass: the scorecard records that no attempt
was made rather than an empty success.`);
}

function fail(message) {
  console.error(`routing-eval: ${message}`);
  process.exit(2);
}

// Every promoted skill and its description, read from the tree rather than from
// a copy, so the eval always grades what is actually shipped.
function catalog() {
  const rows = [];
  for (const group of readdirSync(join(ROOT, 'skills')).sort()) {
    const groupDir = join(ROOT, 'skills', group);
    if (!statSync(groupDir).isDirectory()) continue;
    for (const name of readdirSync(groupDir).sort()) {
      const file = join(groupDir, name, 'SKILL.md');
      if (!existsSync(file)) continue;
      const body = readFileSync(file, 'utf8');
      const m = body.match(/^description:\s*([\s\S]*?)(?=\n[a-z_]+:\s|\n---)/m);
      rows.push({ name, description: m ? m[1].replace(/\s+/g, ' ').trim() : '' });
    }
  }
  return rows;
}

function loadTable(file) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { fail(`cannot read ${file}`); }
  const rows = [];
  text.split('\n').forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try { rows.push(JSON.parse(trimmed)); } catch { fail(`${file}:${i + 1} is not valid json`); }
  });
  if (!rows.length) fail(`${file} has no cases`);
  return rows;
}

function ask(prompt) {
  const result = spawnSync('claude', ['-p'], { input: prompt, encoding: 'utf8', timeout: OPTIONS.timeoutMs });
  if (result.error || result.status !== 0) return null;
  // The prompt asks for a bare name; take the last non-empty token so a model
  // that prefixes a sentence still scores on what it actually chose.
  const said = (result.stdout || '').trim().split('\n').filter(Boolean).pop() || '';
  return said.replace(/[^a-z0-9-]/gi, '').toLowerCase() || null;
}

const skills = catalog();
const table = loadTable(OPTIONS.table);
const cases = OPTIONS.only ? table.filter((c) => c.id === OPTIONS.only) : table;
if (OPTIONS.only && !cases.length) fail(`no case with id ${OPTIONS.only}`);

const known = new Set(skills.map((s) => s.name));
const unknown = cases.filter((c) => !known.has(c.expect)).map((c) => `${c.id} expects ${c.expect}`);
if (unknown.length) fail(`the table names skills that do not exist: ${unknown.join(', ')}`);

// A missing model is reported as a skip. It is never scored as a pass, because
// no attempt was made and an untested claim is not a result.
const probe = spawnSync('claude', ['--version'], { encoding: 'utf8', timeout: 30000 });
if (probe.error || probe.status !== 0) {
  console.log('routing-eval: SKIP — the claude CLI is not available, so no routing attempt was made.');
  console.log('routing-eval: this is a skip, not a pass; the scorecard is not updated.');
  process.exit(0);
}

const roster = skills.map((s) => `${s.name}: ${s.description}`).join('\n');
const results = [];
let failed = 0;

for (const testCase of cases) {
  const picks = [];
  for (let run = 0; run < OPTIONS.runs; run++) {
    picks.push(ask(
      `You are routing a user request to exactly one skill from this catalog.\n\n${roster}\n\n` +
      `User request: "${testCase.utterance}"\n\nReply with ONLY the skill name, nothing else.`,
    ));
  }
  const hits = picks.filter((p) => p === testCase.expect).length;
  const rate = hits / OPTIONS.runs;
  const passed = rate >= OPTIONS.threshold;
  if (!passed) failed++;
  results.push({ id: testCase.id, expect: testCase.expect, picks, rate, passed, note: testCase.note ?? null });
  const shown = [...new Set(picks.filter((p) => p && p !== testCase.expect))];
  console.log(
    `${passed ? 'ok  ' : 'MISS'} ${testCase.id} ${testCase.expect.padEnd(26)} ${hits}/${OPTIONS.runs}` +
    (shown.length ? `  also picked: ${shown.join(', ')}` : ''),
  );
}

// A partial run does not get to overwrite a full scorecard. Scoring one case
// and writing it where the baseline lives would replace a thirty-five case
// record with a one case record and read as a complete result afterwards.
if (OPTIONS.only && !OPTIONS.out) {
  console.log(`\nrouting-eval: ${results.length - failed}/${results.length} case at or above ${OPTIONS.threshold * 100}% over ${OPTIONS.runs} runs`);
  console.log('routing-eval: single-case run, no scorecard written. Pass --out to record one.');
  process.exit(failed ? 1 : 0);
}

const stamp = new Date().toISOString().slice(0, 10);
const scorecard = {
  date: stamp,
  runs_per_case: OPTIONS.runs,
  threshold: OPTIONS.threshold,
  cases: results.length,
  passed: results.length - failed,
  failed,
  skills_in_catalog: skills.length,
  results,
};
const out = OPTIONS.out ?? join(HERE, 'results', `${stamp}-routing.json`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(scorecard, null, 2) + '\n');

console.log(`\nrouting-eval: ${results.length - failed}/${results.length} cases at or above ${OPTIONS.threshold * 100}% over ${OPTIONS.runs} runs`);
console.log(`routing-eval: scorecard ${out}`);
process.exit(failed ? 1 : 0);
