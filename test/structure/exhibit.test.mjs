import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, headings } from '../helpers.mjs';

// Exhibit is a promoted skill with a fixed doc set: a narrative rule file, an act
// grammar, one playbook per act type, a brand-resolution guide, and a primitives
// reference. These tests hold the doc set together: SKILL.md names every
// playbook and no other; ACTS.md and the playbooks agree on the nine types; each
// playbook has the same section shape, so an author loading one knows where to
// look; and the vendor manifest names every library the scaffold can inline.

const DIR = 'skills/branding/exhibit';
const ACT_TYPES = ['hook', 'map', 'mechanism', 'compare', 'evidence', 'timeline', 'decision', 'sandbox', 'glossary'];

test('exhibit is promoted and its SKILL.md names each reference doc and script', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  const body = read(`${DIR}/SKILL.md`);
  assert.ok(plugin.skills.includes(DIR), `plugin.json missing "${DIR}"`);
  assert.ok(read('README.md').includes(`${DIR}/SKILL.md`), 'README.md must list exhibit');
  for (const ref of ['JOURNEY.md', 'ACTS.md', 'BRAND.md', 'PRIMITIVES.md', 'PLAN.md']) {
    assert.ok(existsSync(join(root, DIR, ref)), `missing ${DIR}/${ref}`);
    assert.ok(body.includes(ref), `exhibit: SKILL.md must point at ${ref}`);
  }
  for (const script of ['scaffold.mjs', 'verify.mjs', 'runtime.js', 'browser.mjs']) {
    assert.ok(existsSync(join(root, DIR, 'scripts', script)), `missing ${DIR}/scripts/${script}`);
    assert.ok(body.includes(script), `exhibit: SKILL.md must point at scripts/${script}`);
  }
  assert.ok(existsSync(join(root, DIR, 'templates/shell.html')), 'missing templates/shell.html');
  assert.ok(body.includes('templates/shell.html'), 'exhibit: SKILL.md must point at templates/shell.html');
  assert.ok(existsSync(join(root, DIR, 'vendor/manifest.json')), 'missing vendor/manifest.json');
  assert.ok(body.includes('vendor/'), 'exhibit: SKILL.md must point at vendor/');
  assert.ok(!existsSync(join(root, DIR, 'PROFILE.md')), 'exhibit has no profile of its own; brands come from the theme skills (BRAND.md)');
});

test('the nine act types each have one playbook, and SKILL.md and ACTS.md name every one and no other', () => {
  const onDisk = readdirSync(join(root, DIR, 'acts')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
  assert.deepEqual(onDisk, [...ACT_TYPES].sort(), 'acts/ must hold exactly one playbook per act type');
  const skill = read(`${DIR}/SKILL.md`);
  const acts = read(`${DIR}/ACTS.md`);
  for (const type of ACT_TYPES) {
    assert.ok(skill.includes(`acts/${type}.md`), `SKILL.md must name acts/${type}.md`);
    assert.ok(acts.includes(`acts/${type}.md`), `ACTS.md must name acts/${type}.md`);
    assert.ok(acts.includes(`| \`${type}\` |`), `ACTS.md table must have a row for ${type}`);
  }
  const named = new Set([...skill.matchAll(/acts\/([a-z]+)\.md/g)].map((m) => m[1]));
  assert.deepEqual([...named].sort(), [...ACT_TYPES].sort(), 'SKILL.md names a playbook that does not exist');
});

test('every playbook has the same section shape and names the journey rule it serves', () => {
  const REQUIRED = ['## Required structure', '## Primitives', '## Failure modes', '## Example skeleton'];
  for (const type of ACT_TYPES) {
    const body = read(`${DIR}/acts/${type}.md`);
    const hs = headings(body);
    assert.equal(hs[0], `# The ${type} act`, `acts/${type}.md must open with "# The ${type} act"`);
    for (const h of REQUIRED) assert.ok(hs.includes(h), `acts/${type}.md missing "${h}"`);
    assert.ok(/JOURNEY\.md/.test(body), `acts/${type}.md must name the JOURNEY.md rule it serves`);
    assert.ok(/```html\n[\s\S]*?```/.test(body), `acts/${type}.md must include an html skeleton`);
    assert.ok(body.includes('act-body'), `acts/${type}.md skeleton must use .act-body`);
  }
});

test('the playbooks use only classes the shell defines or PRIMITIVES.md documents', () => {
  const known = new Set(
    [...(read(`${DIR}/templates/shell.html`) + read(`${DIR}/PRIMITIVES.md`) + read(`${DIR}/scripts/runtime.js`)).matchAll(/\bx-[a-z0-9-]+/g)].map((m) => m[0]),
  );
  for (const type of ACT_TYPES) {
    const used = new Set([...read(`${DIR}/acts/${type}.md`).matchAll(/\bx-[a-z0-9-]+/g)].map((m) => m[0]));
    for (const cls of used) assert.ok(known.has(cls), `acts/${type}.md uses ${cls}, which neither the shell nor PRIMITIVES.md defines`);
  }
});

test('the vendor manifest names each library the scaffold can inline, with a file, a version, a license, and a hash', () => {
  const manifest = JSON.parse(read(`${DIR}/vendor/manifest.json`));
  const files = readdirSync(join(root, DIR, 'vendor')).filter((f) => f.endsWith('.js')).sort();
  assert.deepEqual(manifest.libraries.map((l) => l.file).sort(), files, 'every vendor file is in the manifest and every manifest entry has a file');
  for (const library of manifest.libraries) {
    for (const key of ['id', 'file', 'name', 'version', 'license', 'source', 'role', 'global', 'sha256']) {
      assert.ok(library[key], `vendor ${library.id ?? library.file} is missing ${key}`);
    }
    assert.match(library.sha256, /^[0-9a-f]{64}$/, `vendor ${library.id} sha256 is not a hex digest`);
    assert.ok(['always', 'reveal', 'focus', 'morph', 'count', 'draw', 'spotlight', 'highlight', 'parallax'].includes(library.role), `vendor ${library.id} has an unknown role ${library.role}`);
  }
  // BRAND.md and PRIMITIVES.md name the three libraries a page always carries.
  const primitives = read(`${DIR}/PRIMITIVES.md`);
  for (const name of ['Alpine', 'GSAP', 'htmx']) assert.ok(primitives.includes(name), `PRIMITIVES.md must name ${name}`);
});
