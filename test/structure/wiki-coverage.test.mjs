import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

// Acronym segments that title-case incorrectly under naive capitalization.
const ACRONYMS = { sdlc: 'SDLC', fde: 'FDE', ai: 'AI' };

function wikiPageName(skillDirName) {
  const titled = skillDirName
    .split('-')
    .map((seg) => ACRONYMS[seg] ?? seg[0].toUpperCase() + seg.slice(1))
    .join('-');
  return `Skill-${titled}.md`;
}

const plugin = JSON.parse(read('.claude-plugin/plugin.json'));

for (const ref of plugin.skills) {
  const name = ref.split('/').pop();
  const page = wikiPageName(name);
  test(`wiki has a page for skill "${name}" (wiki/${page})`, () => {
    const abs = join(root, 'wiki', page);
    assert.ok(existsSync(abs), `expected wiki/${page} documenting ${ref} — every promoted skill needs its own wiki page`);
    const body = read(`wiki/${page}`);
    assert.ok(body.includes(`${ref}/SKILL.md`),
      `wiki/${page} must link back to ${ref}/SKILL.md so the page traces to its source`);
  });
}

test('wiki Home indexes every promoted skill page', () => {
  const home = read('wiki/Home.md');
  for (const ref of plugin.skills) {
    const name = ref.split('/').pop();
    const page = wikiPageName(name).replace(/\.md$/, '');
    assert.ok(home.includes(`(${page})`), `wiki/Home.md must link to ${page}`);
  }
});

test('no leftover bundled skill wiki pages from before the per-skill split', () => {
  for (const stale of ['Skill-Impact-Pipeline.md', 'Skill-Model-Registry-and-Updater.md', 'Skill-Recon-and-Archetypes.md']) {
    assert.ok(!existsSync(join(root, 'wiki', stale)), `wiki/${stale} should be removed — split into per-skill pages`);
  }
});
