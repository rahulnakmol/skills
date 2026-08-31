import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, walk, headings, wordCount } from '../helpers.mjs';

const DIR = 'skills/core/grit';

test('grit is a promoted, contract-compliant skill with its reference docs and tooling', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  const readme = read('README.md');
  const body = read(`${DIR}/SKILL.md`);
  assert.ok(plugin.skills.includes(DIR), `plugin.json missing "${DIR}"`);
  assert.ok(readme.includes(`${DIR}/SKILL.md`), 'README.md must list grit');
  assert.ok(body.includes('name: grit'), 'grit: frontmatter name mismatch');
  assert.ok(body.includes('user-invoked'), 'grit: must declare its invocation axis');
  assert.ok(body.split('\n').length <= 120, 'grit: SKILL.md over 120 lines');
  for (const h of ['## When to invoke', '## Stop conditions', '## Output contract'])
    assert.ok(headings(body).includes(h), `grit: SKILL.md missing "${h}"`);

  // The four reference docs are each named by filename from SKILL.md itself.
  for (const ref of ['LEDGER.md', 'METHOD.md', 'AUDIT.md', 'HOOKS.md']) {
    assert.ok(existsSync(join(root, DIR, ref)), `missing ${DIR}/${ref}`);
    assert.ok(body.includes(ref), `grit: SKILL.md must point at ${ref}`);
  }

  // gate-check.mjs, gate-lint.mjs, and grit-gates.yml exist, and are each named
  // somewhere in the skill's own doc set (SKILL.md or its reference docs).
  // SKILL.md itself names the checker only generically ("the checker",
  // "--status", "--approve", "--reverify") without a filename; the concrete
  // filenames are named in LEDGER.md, METHOD.md, and HOOKS.md instead.
  for (const tool of ['scripts/gate-check.mjs', 'scripts/gate-lint.mjs', 'grit-gates.yml'])
    assert.ok(existsSync(join(root, DIR, tool)), `missing ${DIR}/${tool}`);
  const docSet = body + read(`${DIR}/LEDGER.md`) + read(`${DIR}/METHOD.md`) +
    read(`${DIR}/AUDIT.md`) + read(`${DIR}/HOOKS.md`);
  for (const name of ['gate-check.mjs', 'gate-lint.mjs', 'grit-gates.yml'])
    assert.ok(docSet.includes(name), `grit: doc set (SKILL.md or its reference docs) must point at ${name}`);
});

const DOCTRINE = [
  { file: `${DIR}/LEDGER.md`,
    require: ['## The ledger comes first', '## Anatomy of a gate', '## The five dimensions',
      '## What makes a check runnable', '## Where the ledger lives', '## Relation to the four gates'],
    includes: ['CHECK:', 'EXPECT:', 'EVIDENCE:', 'Completeness', 'Accuracy', 'Business value met',
      'Efficiency', 'Thoroughness', 'COVERAGE.md', 'VERIFICATION.md', 'not applicable'],
    minWords: 800 },
  { file: `${DIR}/METHOD.md`,
    require: ['## Verification depth, not execution shape', '## Selecting depth', '## Building the tree',
      '## Dispatch state', '## The four passes', '## Depth tree and stacked pull requests'],
    includes: ["group's own routing rubric", 'a routing rubric', 'dispatch.json',
      "delivery group's stacking convention", 'base of 5', 'capped at 10'],
    minWords: 900 },
  { file: `${DIR}/AUDIT.md`,
    require: ['## Counting what happened', '## Abandoning a gate honestly', '## The audit block format',
      '## Where the audit goes', '## Never soften the EXPECT'],
    includes: ['met', 'unmet', 'abandoned', 'EXPECT'],
    minWords: 700 },
  { file: `${DIR}/HOOKS.md`,
    require: ['## What a stop hook does', '## Claude Code', '## OpenCode', '## GitHub Copilot',
      '## Codex and Cursor', '## Continuous integration backstop', '## The approval boundary'],
    includes: ['decision', 'block', 'grit-gates.yml', '~/.grit/approved'],
    minWords: 700 },
];

for (const spec of DOCTRINE) {
  test(`${spec.file} carries the required structure and depth`, () => {
    const body = read(spec.file);
    const hs = headings(body);
    for (const h of spec.require) assert.ok(hs.includes(h), `${spec.file}: missing heading "${h}"`);
    for (const s of spec.includes) assert.ok(body.includes(s), `${spec.file}: missing marker "${s}"`);
    assert.ok(wordCount(body) >= spec.minWords,
      `${spec.file}: ${wordCount(body)} words < ${spec.minWords} (stub)`);
  });
}

test('grit preserves unlazy attribution on every adapted script (MIT license requirement)', () => {
  const scripts = [
    ...walk(`${DIR}/scripts`, (p) => p.endsWith('.mjs')),
    ...walk('adapters/claude/hooks', (p) => p.endsWith('.mjs')),
  ];
  assert.ok(scripts.length >= 10, `expected at least 10 adapted .mjs scripts, found ${scripts.length}`);
  for (const rel of scripts) {
    const body = read(rel);
    assert.match(body, /Leonxlnx/, `${rel}: missing unlazy attribution (Leonxlnx)`);
    assert.match(body, /MIT/, `${rel}: missing MIT license mention`);
  }
});

test('NOTICE carries the unlazy MIT attribution required by the license', () => {
  const notice = read('NOTICE');
  assert.match(notice, /unlazy/, 'NOTICE must mention unlazy');
  assert.match(notice, /MIT License/, 'NOTICE must name the MIT License');
  assert.ok(
    notice.includes('The above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.') ||
    notice.includes('The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.'),
    'NOTICE must carry the MIT permission notice sentence about inclusion in all copies',
  );
});

test('grit is threaded into the delivery, assessment, and shakedown pipelines', () => {
  const deliver = read('adapters/claude/workflows/deliver-work-item.js');
  for (const marker of ['grit/LEDGER.md', 'grit/AUDIT.md', 'depthSource'])
    assert.ok(deliver.includes(marker), `deliver-work-item.js missing "${marker}"`);

  assert.ok(read('adapters/claude/workflows/assess-work-item.js').includes('grit'),
    'assess-work-item.js must reference grit');
  assert.ok(read('adapters/claude/workflows/shakedown-pr.js').includes('grit'),
    'shakedown-pr.js must reference grit');

  const contract = read('skills/developer/slice/WORK-ITEM-CONTRACT.md');
  for (const marker of ['grit/LEDGER.md', 'grit/AUDIT.md'])
    assert.ok(contract.includes(marker), `WORK-ITEM-CONTRACT.md missing "${marker}"`);

  assert.ok(read('skills/developer/sdlc/SKILL.md').includes('grit'), 'sdlc/SKILL.md must reference grit');
  assert.ok(read('skills/pm/GATES.md').includes('grit'), 'pm/GATES.md must reference grit');

  assert.ok(read('skills/developer/conduct/RUBRIC.md').includes('## Depth of verification, not shape of execution'),
    'conduct/RUBRIC.md must draw the verification-depth vs. execution-shape line from the routing side');

  for (const name of ['assess', 'deliver', 'shakedown']) {
    const rel = `tools/opencode-workflows/templates/${name}.json`;
    assert.ok(read(rel).includes('grit'), `${rel} must reference grit`);
  }
});

test('grit-gates.yml ships dispatch-only, not wired to every pull request by default', () => {
  const body = read(`${DIR}/grit-gates.yml`);
  assert.ok(body.includes('workflow_dispatch'), 'grit-gates.yml must carry a workflow_dispatch trigger');
  assert.ok(!/^on:\s*\n\s+pull_request:/m.test(body),
    'grit-gates.yml must ship dispatch-only; enabling pull_request triggers is the adopting repo\'s explicit choice');
});

test('the installer keeps the Claude stop hook opt-in', () => {
  const body = read('scripts/install-adapters.sh');
  assert.match(body, /claude-hooks\)\s*install_claude_hooks/, 'install-adapters.sh must have a claude-hooks case arm');
  const allMatch = body.match(/\ball\)\s*(.*)$/m);
  assert.ok(allMatch, 'install-adapters.sh must have an all) case arm');
  assert.ok(!allMatch[1].includes('install_claude_hooks'),
    'install-adapters.sh: the all) arm must not install hooks — hooks stay opt-in');
});
