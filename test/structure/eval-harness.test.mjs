import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

// The routing eval needs a live model, so it cannot run on every pull request.
// What can run offline is everything about the eval except the model call: that
// the table is well formed, that it names skills which exist, that it covers
// the catalog, and that the workflow carrying it cannot start charging money on
// its own. Those are the parts that rot silently between scheduled runs.

const TABLE = 'test/eval/routing.jsonl';
const RUNNER = 'test/eval/run-routing.mjs';
const WORKFLOW = '.github/workflows/eval.yml';

// Routers are deliberately absent from the table: a case expecting `ask-fde` or
// `ask-pm` would be scoring a fallback, which is the opposite of what routing
// accuracy means here.
const ROUTERS = new Set(['ask-fde', 'ask-pm']);

function promotedSkills() {
  const out = [];
  for (const group of readdirSync(join(root, 'skills'))) {
    const dir = join(root, 'skills', group);
    if (!statSync(dir).isDirectory()) continue;
    for (const name of readdirSync(dir)) {
      if (existsSync(join(dir, name, 'SKILL.md'))) out.push(name);
    }
  }
  return out;
}

function cases() {
  return read(TABLE).split('\n').filter((l) => l.trim()).map((line, i) => {
    try { return JSON.parse(line); } catch { assert.fail(`${TABLE}:${i + 1} is not valid json`); }
  });
}

test('the routing table is well formed and every case names a real skill', () => {
  const skills = new Set(promotedSkills());
  const seen = new Set();
  for (const c of cases()) {
    assert.ok(c.id && c.utterance && c.expect, `a case is missing id, utterance, or expect: ${JSON.stringify(c)}`);
    assert.ok(!seen.has(c.id), `duplicate case id ${c.id}`);
    seen.add(c.id);
    assert.ok(skills.has(c.expect),
      `case ${c.id} expects "${c.expect}", which is not a promoted skill. A renamed or removed skill leaves the eval scoring a name nothing answers to.`);
  }
});

test('every promoted skill that is not a router has at least one routing case', () => {
  const covered = new Set(cases().map((c) => c.expect));
  const missing = promotedSkills().filter((s) => !ROUTERS.has(s) && !covered.has(s));
  assert.deepEqual(missing, [],
    `these skills have no routing case, so nothing would notice if they stopped being selectable: ${missing.join(', ')}`);
});

test('the runner reports its contract without needing a model', () => {
  assert.ok(existsSync(join(root, RUNNER)), `missing ${RUNNER}`);
  const help = spawnSync(process.execPath, [join(root, RUNNER), '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0, 'the runner must describe itself without a model available');
  for (const flag of ['--runs', '--threshold', '--case', '--out'])
    assert.match(help.stdout, new RegExp(flag), `--help must document ${flag}`);
  // A missing model is a skip, never a pass. The contract says so where a
  // reader will find it.
  assert.match(help.stdout, /skip/i, '--help must state that a missing model is a skip rather than a pass');
});

test('a table naming a skill that does not exist fails before any model is called', () => {
  const bogus = join(root, 'test/eval/.bogus.jsonl');
  
  writeFileSync(bogus, JSON.stringify({ id: 'x', utterance: 'anything', expect: 'no-such-skill' }) + '\n');
  try {
    const result = spawnSync(process.execPath, [join(root, RUNNER), '--table', bogus], { encoding: 'utf8' });
    assert.equal(result.status, 2, 'an unknown skill in the table is a usage error');
    assert.match(result.stderr, /do not exist/);
  } finally {
    rmSync(bogus, { force: true });
  }
});

test('the eval workflow cannot start itself on a pull request', () => {
  assert.ok(existsSync(join(root, WORKFLOW)), `missing ${WORKFLOW}`);
  const body = read(WORKFLOW);
  // The eval spends money and wall-clock on every run, so it is scheduled or
  // dispatched deliberately. A pull_request trigger would bill every push.
  assert.doesNotMatch(body, /^\s*pull_request:/m,
    'the eval must not run per pull request; it costs a model call for every case');
  assert.match(body, /workflow_dispatch:/, 'the eval must be runnable on demand');
  assert.match(body, /schedule:/, 'the eval must also run on a schedule so regressions surface without anyone asking');
});

test('a single-case run does not overwrite the full scorecard', () => {
  // Scoring one case and writing it where the baseline lives would replace a
  // whole-catalog record with a one-line one, and the file would still read as
  // a complete result afterwards.
  const runner = read(RUNNER);
  assert.match(runner, /OPTIONS\.only && !OPTIONS\.out/,
    'the runner must refuse to write the default scorecard path for a single-case run');
  const help = spawnSync(process.execPath, [join(root, RUNNER), '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0);
});

test('the committed baseline scorecard covers the whole table', () => {
  const dir = join(root, 'test/eval/results');
  const cards = readdirSync(dir).filter((f) => f.endsWith('.json'));
  assert.ok(cards.length, 'at least one scorecard must be committed as a baseline');
  const total = cases().length;
  for (const card of cards) {
    const data = JSON.parse(read(join('test/eval/results', card)));
    assert.equal(data.cases, total,
      `${card} records ${data.cases} of ${total} cases. A partial scorecard in the baseline directory reads as a complete result and hides what was never measured.`);
  }
});
