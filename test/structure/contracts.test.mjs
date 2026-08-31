import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, walk } from '../helpers.mjs';

test('conduct GRAPH.md defines the human node type with owner, decision, and SLA', () => {
  const body = read('skills/developer/conduct/GRAPH.md');
  for (const marker of ['## Node types', 'type: human', 'owner:', 'decision:', 'sla_hours:', 'escalation'])
    assert.ok(body.includes(marker), `GRAPH.md missing "${marker}"`);
});

test('conduct SKILL.md output contract includes a human node and populated evidence', () => {
  const body = read('skills/developer/conduct/SKILL.md');
  assert.ok(body.includes('type: human'), 'SKILL.md contract example must include a human node');
});

test('no skill ships an empty evidence field in its contract examples', () => {
  for (const file of walk('skills', (p) => p.endsWith('.md'))) {
    assert.ok(!read(file).includes('evidence: []'),
      `${file}: contract example must show populated evidence, not "evidence: []"`);
  }
});

test('governance is wired through the pipeline, not left as an overlay', () => {
  assert.ok(read('skills/developer/impact/GATES.md').toLowerCase().includes('governance tier'),
    'GATES.md: G2 must require the governance tier to be recorded');
  assert.ok(read('skills/developer/slice/SKILL.md').includes('responsible-ai-governance'),
    'slice/SKILL.md must route to responsible-ai-governance when tier is limited or high');
  const contract = read('skills/developer/slice/WORK-ITEM-CONTRACT.md');
  for (const item of ['audit trail', 'explainability', 'human-in-the-loop'])
    assert.ok(contract.toLowerCase().includes(item),
      `WORK-ITEM-CONTRACT.md Governance section missing "${item}"`);
});
