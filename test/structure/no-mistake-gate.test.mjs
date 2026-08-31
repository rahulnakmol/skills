import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, headings, wordCount } from '../helpers.mjs';

const DOCTRINE = [
  {
    file: 'skills/core/COVERAGE.md',
    require: ['## The FR/NFR traceability matrix', '## Coverage floors', '## Non-functional use cases',
      '## Right-sized verification'],
    includes: ['85-90%', '75-80%', 'business-capability', 'integration', 'model-routing', 'token'],
    minWords: 300,
  },
  {
    file: 'skills/core/VERIFICATION.md',
    require: ['## Open the artifact', '## Absence of error is not evidence', '## Report only what you found',
      '## The pipeline shape', '## Auto-fix versus escalate'],
    includes: ['disposable', 'worktree', 'review', 'lint', 'unfinished', 'no-mistakes'],
    minWords: 350,
  },
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

test('STACKING.md reflects the native GitHub public-preview backing and makes multi-concern stacking mandatory', () => {
  const body = read('skills/developer/deliver/STACKING.md');
  for (const marker of ['public preview', 'stack map', 'rebase and retarget', 'never optional'])
    assert.ok(body.includes(marker), `STACKING.md missing "${marker}"`);
  for (const heading of ['## When to stack', '## How to layer', '## Tooling', '## Review and merge order'])
    assert.ok(body.includes(heading), `STACKING.md missing heading "${heading}"`);
  for (const marker of ['gh stack sync', 'gh stack rebase', 'one concern', 'bottom-up'])
    assert.ok(body.toLowerCase().includes(marker.toLowerCase()), `STACKING.md missing "${marker}"`);
});

test('WORK-ITEM-CONTRACT.md carries coverage and use-case traceability, and definition of done requires verification', () => {
  const body = read('skills/developer/slice/WORK-ITEM-CONTRACT.md');
  const hs = headings(body);
  assert.ok(hs.includes('## Coverage and use-case traceability'),
    'WORK-ITEM-CONTRACT.md missing "## Coverage and use-case traceability"');
  for (const marker of ['85-90%', '75-80%', 'functional', 'non-functional', 'COVERAGE.md'])
    assert.ok(body.includes(marker), `WORK-ITEM-CONTRACT.md missing "${marker}"`);
  assert.ok(body.includes('VERIFICATION.md'),
    'WORK-ITEM-CONTRACT.md Definition of done must reference VERIFICATION.md');
  for (const heading of ['## Goal', '## Parent links', '## Context', '## Scope and file ownership', '## Non-goals',
    '## Acceptance criteria', '## Verification', '## Constraints and guardrails', '## Execution profile',
    '## Governance', '## Headless run block', '## Definition of done', '## Artifacts and handoff',
    '## Pickup protocol'])
    assert.ok(hs.includes(heading), `WORK-ITEM-CONTRACT.md missing heading "${heading}"`);
});

test('the no-mistake gate is threaded through the pipeline, not left optional', () => {
  for (const [file, marker, why] of [
    ['skills/developer/shakedown/SKILL.md', 'COVERAGE.md', 'shakedown enforces the coverage floors'],
    ['skills/developer/shakedown/SKILL.md', 'VERIFICATION.md', 'shakedown runs the verification-before-completion pass'],
    ['skills/developer/deliver/SKILL.md', 'public preview', 'deliver acknowledges the native stacking backing'],
    ['skills/developer/slice/OPERABILITY.md', 'COVERAGE.md', 'the operability lane cites the coverage floors'],
    ['adapters/claude/workflows/deliver-work-item.js', 'COVERAGE.md', 'the verifier phase checks FR/NFR coverage before a PR is raised'],
    ['adapters/claude/workflows/shakedown-pr.js', 'COVERAGE.md', 'the tests lens checks FR/NFR coverage pre-merge'],
    ['CLAUDE.md', 'VERIFICATION.md', 'the verification-before-completion rule is a repository invariant'],
    ['skills/pm/report/SKILL.md', 'VERIFICATION.md', 'report verifies the rendered pack before marking it sent'],
  ])
    assert.ok(read(file).includes(marker), `${file}: ${why}`);
});

test('no skill ships an empty evidence field in the new doctrine', () => {
  for (const file of ['skills/core/COVERAGE.md', 'skills/core/VERIFICATION.md'])
    assert.ok(!read(file).includes('evidence: []'), `${file}: must not ship an empty evidence example`);
});
