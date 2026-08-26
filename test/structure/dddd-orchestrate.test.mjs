import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, headings, wordCount } from '../helpers.mjs';

test('pm/orchestrate exists, is model-invoked, promoted, and routed to from ask-pm', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  assert.ok(existsSync(join(root, 'skills/pm/orchestrate/SKILL.md')), 'missing skills/pm/orchestrate/SKILL.md');
  assert.ok(plugin.skills.includes('skills/pm/orchestrate'), 'plugin.json missing "skills/pm/orchestrate"');
  const body = read('skills/pm/orchestrate/SKILL.md');
  assert.ok(body.includes('name: orchestrate'), 'pm/orchestrate: frontmatter name mismatch');
  assert.ok(/model-invoked/.test(body), 'pm/orchestrate: must be model-invoked, mirroring the developer skill');
  assert.ok(body.split('\n').length <= 120, 'pm/orchestrate: SKILL.md over 120 lines');
  assert.ok(read('skills/pm/ask-pm/SKILL.md').includes('orchestrate'),
    'ask-pm must route to orchestrate');
});

const DOCTRINE = [
  {
    file: 'skills/pm/orchestrate/RUBRIC.md',
    require: ['## Routing questions', '## Evidence', '## Failure signatures', '## Prohibited patterns'],
    includes: ['grill-loop', 'parallel-fan', 'hybrid', 'model-routing', 'human'],
    minWords: 300,
  },
  {
    file: 'skills/developer/DDDD.md',
    require: ['## Discover', '## Define', '## Design', '## Deliver', '## How this relates to the four gates'],
    includes: ['RUBRIC.md', 'loop', 'graph', 'hybrid', 'tradeoff', 'orthogonal'],
    minWords: 350,
  },
  {
    file: 'skills/pm/DDDD.md',
    require: ['## Discover', '## Define', '## Design', '## Deliver', '## How this relates to the four gates'],
    includes: ['orchestrate', 'grill-loop', 'tradeoff', 'orthogonal'],
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

test('DDDD is threaded through the real-work skills on both sides, not left optional', () => {
  const DEV_IN_SCOPE = ['impact', 'architect', 'safeguard', 'sdlc', 'deliver', 'assure', 'operate', 'maintain', 'shakedown'];
  const PM_IN_SCOPE = ['discover', 'map', 'tom-architect', 'carve', 'prd-draft', 'case', 'roadmap', 'realize', 'report'];
  for (const name of DEV_IN_SCOPE)
    assert.ok(read(`skills/developer/${name}/SKILL.md`).includes('DDDD.md'),
      `skills/developer/${name}/SKILL.md must reference DDDD.md`);
  for (const name of PM_IN_SCOPE)
    assert.ok(read(`skills/pm/${name}/SKILL.md`).includes('DDDD.md'),
      `skills/pm/${name}/SKILL.md must reference DDDD.md`);
});

test('design tradeoffs are surfaced through the existing pickup-critique posting mechanism', () => {
  const body = read('adapters/claude/workflows/assess-work-item.js');
  for (const marker of ['tradeoff', 'maintainability', 'Design tradeoffs'])
    assert.ok(body.includes(marker), `assess-work-item.js missing "${marker}"`);
});

test('impact, architect, sdlc, discover, tom-architect, and grill capture FR/NFR with a scope boundary', () => {
  const FR_NFR_MARKER = 'functional and non-functional requirements';
  for (const file of [
    'skills/developer/impact/PRD-TEMPLATE.md',
    'skills/developer/architect/SKILL.md',
    'skills/pm/tom-architect/TOM-METHOD.md',
    'skills/pm/grill/GRILL-PM.md',
  ]) {
    const body = read(file);
    assert.ok(body.includes(FR_NFR_MARKER), `${file}: missing "${FR_NFR_MARKER}"`);
    assert.ok(body.toLowerCase().includes('boundary'), `${file}: missing a scope-boundary marker`);
  }
  for (const file of [
    'skills/developer/impact/SKILL.md',
    'skills/developer/sdlc/SKILL.md',
    'skills/pm/discover/METHOD.md',
  ]) {
    assert.ok(read(file).toLowerCase().includes('non-functional'),
      `${file}: must reference functional/non-functional capture or its check`);
  }
});

test('the wiki reflects the pm group size and the shared orchestrate page', () => {
  const page = read('wiki/Skill-Orchestrate.md');
  assert.ok(page.includes('skills/developer/orchestrate/SKILL.md'), 'Skill-Orchestrate.md must still link the developer skill');
  assert.ok(page.includes('skills/pm/orchestrate/SKILL.md'), 'Skill-Orchestrate.md must also link the pm skill');
  assert.ok(read('wiki/Group-PM.md').includes('Orchestrate'), 'Group-PM.md must list Orchestrate');
  assert.ok(read('skills/pm/README.md').includes('Seventeen'), 'pm/README.md charter must say seventeen skills');
});
