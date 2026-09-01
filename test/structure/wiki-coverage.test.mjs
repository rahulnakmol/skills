import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

// The wiki carries lean, generated stubs for every promoted skill and group;
// the full documentation lives on the docs site (test/site/site-coverage.test.mjs
// guarantees per-skill richness there). This file checks the stub contract:
// every promoted skill and group has a stub, the stub matches what
// scripts/gen-wiki-stubs.mjs would generate, and it links the right site URL.

// Acronym segments that title-case incorrectly under naive capitalization.
const ACRONYMS = { sdlc: 'SDLC', fde: 'FDE', ai: 'AI', pm: 'PM', prd: 'PRD', tom: 'TOM', raid: 'RAID' };

function titleCase(id) {
  return id.split('-').map((seg) => ACRONYMS[seg] ?? seg[0].toUpperCase() + seg.slice(1)).join('-');
}

const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
const GEN = join(root, 'scripts/gen-wiki-stubs.mjs');

test('scripts/gen-wiki-stubs.mjs --check reports no drift: every wiki stub matches the generator', () => {
  const result = spawnSync(process.execPath, [GEN, '--check'], { encoding: 'utf8', cwd: root });
  assert.equal(result.status, 0,
    `gen-wiki-stubs.mjs --check found drift (run "node scripts/gen-wiki-stubs.mjs" to regenerate):\n${result.stdout}${result.stderr}`);
});

for (const ref of plugin.skills) {
  const name = ref.split('/').pop();
  const page = `Skill-${titleCase(name)}.md`;
  test(`wiki has a stub for skill "${name}" (wiki/${page})`, () => {
    const abs = join(root, 'wiki', page);
    assert.ok(existsSync(abs), `expected wiki/${page} documenting ${ref} — every promoted skill needs its own wiki stub`);
    const body = read(`wiki/${page}`);
    assert.ok(body.includes(`${ref}/SKILL.md`),
      `wiki/${page} must link back to ${ref}/SKILL.md so the stub traces to its source`);
    assert.ok(body.includes(`https://tqnonline.github.io/skills/${name}/`),
      `wiki/${page} must link the skill's full documentation on the site`);
    assert.ok(body.split('\n').length <= 15, `wiki/${page} must stay a lean stub (<=15 lines)`);
  });
}

test('wiki Home links every group with a promoted skill, and every such group stub points at the site', () => {
  const home = read('wiki/Home.md');
  const groups = new Set(plugin.skills.map((ref) => ref.split('/')[1]));
  for (const groupId of groups) {
    const page = `Group-${titleCase(groupId)}`;
    assert.ok(home.includes(`(${page})`), `wiki/Home.md must link ${page}`);
    assert.ok(existsSync(join(root, 'wiki', `${page}.md`)), `missing wiki/${page}.md`);
    assert.ok(read(`wiki/${page}.md`).includes('https://tqnonline.github.io/skills/group/'),
      `wiki/${page}.md must link its site group page`);
  }
});

test('no leftover bundled skill wiki pages from before the per-skill split', () => {
  for (const stale of ['Skill-Impact-Pipeline.md', 'Skill-Model-Registry-and-Updater.md', 'Skill-Recon-and-Archetypes.md']) {
    assert.ok(!existsSync(join(root, 'wiki', stale)), `wiki/${stale} should be removed — split into per-skill pages`);
  }
});
