import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, wordCount } from '../helpers.mjs';

const PM_ARCHITECTURE_PAGES = ['Architecture-PM-Journey', 'Architecture-PM-Arrange', 'Architecture-PM-System'];

test('the pm group has architecture pages at parity with the developer group, linked from Home', () => {
  const home = read('wiki/Home.md');
  for (const page of PM_ARCHITECTURE_PAGES) {
    const abs = join(root, 'wiki', `${page}.md`);
    assert.ok(existsSync(abs), `missing wiki/${page}.md`);
    assert.ok(home.includes(`(${page})`), `wiki/Home.md must link ${page}`);
    assert.ok(wordCount(read(`wiki/${page}.md`)) >= 120, `wiki/${page}.md is too thin to be a real page`);
  }
});

test('Architecture-PM-Journey mirrors Architecture-Role-Journey: a gate diagram and a stage-to-skill table', () => {
  const body = read('wiki/Architecture-PM-Journey.md');
  for (const marker of ['Framing', 'Investment', 'Quality', 'Commitment', '| Stage | Skills |'])
    assert.ok(body.includes(marker), `Architecture-PM-Journey.md missing "${marker}"`);
});

test('Architecture-PM-Arrange mirrors Architecture-Loop-vs-Graph: maps to the pm rubric, not a substitute for it', () => {
  const body = read('wiki/Architecture-PM-Arrange.md');
  for (const marker of ['grill-loop', 'parallel-fan', 'hybrid', 'RUBRIC.md'])
    assert.ok(body.includes(marker), `Architecture-PM-Arrange.md missing "${marker}"`);
});

test('Architecture-PM-System covers the constitution hierarchy, DDDD, and the initiative-repo substrate', () => {
  const body = read('wiki/Architecture-PM-System.md');
  for (const marker of ['constitution', 'DDDD', 'INITIATIVE-REPO.md'])
    assert.ok(body.includes(marker), `Architecture-PM-System.md missing "${marker}"`);
});

test('model-routing and update-models are described as serving every group, not developer-only', () => {
  for (const file of ['skills/developer/model-routing/SKILL.md', 'skills/developer/update-models/SKILL.md']) {
    const body = read(file);
    assert.ok(/every group|both groups|across groups|developer and pm/i.test(body),
      `${file}: must say explicitly that it serves more than the developer group`);
  }
  assert.ok(read('skills/developer/model-routing/SKILL.md').includes('pm/arrange'),
    'model-routing/SKILL.md must name its pm group consumer');
});

test('model-routing is threaded into the pm skills that make execution-shape or model decisions', () => {
  for (const name of ['case', 'tom-architect', 'roadmap', 'report'])
    assert.ok(read(`skills/pm/${name}/SKILL.md`).includes('model-routing'),
      `skills/pm/${name}/SKILL.md must reference model-routing`);
});
