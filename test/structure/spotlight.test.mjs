import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, headings } from '../helpers.mjs';

const DIR = 'skills/productivity/spotlight';

test('spotlight is a promoted user-invoked productivity skill', () => {
  const skill = read(`${DIR}/SKILL.md`);
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  assert.ok(plugin.skills.includes(DIR), 'plugin.json missing spotlight');
  assert.ok(read('README.md').includes(`${DIR}/SKILL.md`), 'README must list spotlight');
  assert.ok(read('skills/productivity/README.md').includes('`spotlight`'),
    'productivity charter must name spotlight');
  assert.ok(skill.includes('name: spotlight'), 'spotlight frontmatter name mismatch');
  assert.ok(skill.includes('# Spotlight (user-invoked)'), 'spotlight must be user-invoked');
  assert.ok(skill.split('\n').length <= 120, 'spotlight SKILL.md exceeds 120 lines');
  for (const heading of ['## Contract', '## When to invoke', '## Procedure', '## Stop conditions', '## Output contract']) {
    assert.ok(headings(skill).includes(heading), `spotlight missing ${heading}`);
  }
});

test('spotlight progressively discloses view and artifact guidance', () => {
  const skill = read(`${DIR}/SKILL.md`);
  for (const reference of ['VIEWS.md', 'ARTIFACTS.md']) {
    assert.ok(existsSync(join(root, DIR, reference)), `missing ${DIR}/${reference}`);
    assert.ok(skill.includes(reference), `spotlight must point to ${reference}`);
  }
  assert.match(skill, /Read `ARTIFACTS\.md` only when/,
    'artifact guidance must remain conditional rather than always loaded');
});

test('spotlight preserves provenance and the human decision boundary', () => {
  const skill = read(`${DIR}/SKILL.md`);
  for (const marker of ['observed', 'inferred', 'proposed', 'sources:', 'omitted:', 'unknowns:',
    'The human makes the decision', 'a diagram is not an execution result']) {
    assert.ok(skill.includes(marker), `spotlight missing trust marker: ${marker}`);
  }
  const artifacts = read(`${DIR}/ARTIFACTS.md`);
  for (const marker of ['Do not fetch', 'Never evaluate source text as code', 'real browser',
    'network request', 'unverified']) {
    assert.ok(artifacts.includes(marker), `ARTIFACTS.md missing safety marker: ${marker}`);
  }
});

test('wait-what routes visual-structure failures without absorbing spotlight', () => {
  const waitWhat = read('skills/productivity/wait-what/SKILL.md');
  assert.ok(waitWhat.includes('`spotlight`'), 'wait-what must name spotlight as a sibling');
  assert.ok(waitWhat.includes('wait-what diagnoses failed wording'),
    'wait-what must preserve the wording-diagnosis boundary');
});
