import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, headings, wordCount } from '../helpers.mjs';

const SPECS = [
  {
    file: 'skills/core/GRILL.md',
    require: ['## Round protocol', '## Value lenses', '## Open-ended probing',
      '## Stop-anytime and the trade-off ledger', '## Exit criteria'],
    includes: ['3–5', 'Trade-offs', 'we stop here', 'sign-off'],
    minWords: 450,
  },
  {
    file: 'skills/core/VALUE.md',
    require: ['## Business value', '## Customer experience and delight',
      '## The do-nothing alternative', '## Governance triggers'],
    includes: ['responsible-ai-governance', 'measured', 'quantif'],
    minWords: 250,
  },
  {
    file: 'skills/developer/conduct/RUBRIC.md',
    require: ['## Routing questions', '## Evidence', '## Failure signatures', '## Prohibited patterns'],
    includes: ['ComPilot', 'Agint', 'partition', 'lottery', 'single writer', 'human gate'],
    minWords: 350,
  },
  {
    file: 'skills/developer/slice/WORK-ITEM-CONTRACT.md',
    require: ['## Goal', '## Parent links', '## Context', '## Scope and file ownership', '## Non-goals',
      '## Acceptance criteria', '## Verification', '## Constraints and guardrails', '## Execution profile',
      '## Governance', '## Headless run block', '## Definition of done', '## Artifacts and handoff',
      '## Pickup protocol'],
    includes: ['claude -p', 'opencode run', 'codex exec', 'cursor-agent', 'copilot',
      'raised', 'critiqued', 'clarified', 'ready', 'machine-checkable'],
    minWords: 450,
  },
  {
    file: 'skills/developer/impact/PRD-TEMPLATE.md',
    require: ['## Problem and outcome hypothesis', '## Users and jobs to be done', '## Scope',
      '## Business value delivered', '## Risk and governance tier', '## SPEC-TS snapshot',
      '## Trade-offs and decision log', '## Approval sign-off'],
    includes: ['none | limited | high | prohibited', '10 pages'],
    minWords: 200,
  },
  {
    file: 'skills/developer/slice/OPERABILITY.md',
    require: ['## Observability', '## SLOs and alerting', '## Runbooks',
      '## CI/CD and test coverage', '## Governance lane'],
    includes: ['structured logs', 'correlation', 'audit trail'],
    minWords: 180,
  },
];

for (const spec of SPECS) {
  test(`${spec.file} carries the required structure and depth`, () => {
    const body = read(spec.file);
    const hs = headings(body);
    for (const h of spec.require) assert.ok(hs.includes(h), `${spec.file}: missing heading "${h}"`);
    for (const s of spec.includes) assert.ok(body.includes(s), `${spec.file}: missing required marker "${s}"`);
    assert.ok(wordCount(body) >= spec.minWords,
      `${spec.file}: ${wordCount(body)} words < required ${spec.minWords} (stub regression)`);
  });
}
