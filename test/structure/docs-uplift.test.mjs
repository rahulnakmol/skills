import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, read, walk } from '../helpers.mjs';

const DIAGRAMS = ['set-the-frontier', 'operating-model', 'delivery-pipeline', 'persona-ladder'];

test('the four narrative diagrams exist and README embeds each', () => {
  const readme = read('README.md');
  for (const name of DIAGRAMS) {
    const rel = `docs/assets/${name}.svg`;
    assert.ok(existsSync(join(root, rel)), `missing ${rel}`);
    assert.ok(read(rel).startsWith('<svg'), `${rel} must be a standalone SVG`);
    assert.ok(readme.includes(rel), `README.md must embed ${rel}`);
  }
});

test('README frames the broader curated bundle, the philosophy, and the full persona ladder', () => {
  const readme = read('README.md');
  for (const marker of ['The Quentin', 'Set the frontier: redefining growth with human judgment and trusted AI agents',
    'business value through trusted agents with human judgment', 'AI-native SDLC',
    '## Skill groups', '### Starting out', 'AI-native delivery'])
    assert.ok(readme.includes(marker), `README.md missing "${marker}"`);
  assert.ok(readme.indexOf('## Skill groups') < readme.indexOf('## The operating model'),
    'the groups overview must come before the SDLC deep-dive — the repository is the bundle, not one group');
});

test('tool guidance covers all five tools and Home links it', () => {
  const guidance = read('wiki/Tool-Guidance.md');
  for (const heading of ['## Claude Code', '## OpenCode', '## Codex', '## Cursor', '## GitHub Copilot'])
    assert.ok(guidance.includes(heading), `Tool-Guidance.md missing "${heading}"`);
  assert.ok(guidance.includes('degradation ladder'), 'Tool-Guidance.md must state the degradation rule');
  assert.ok(read('wiki/Home.md').includes('(Tool-Guidance)'), 'wiki/Home.md must link Tool-Guidance');
});

test('the personas page walks the ladder from starting out to CDAIO/CIO and Home links it', () => {
  const personas = read('wiki/Personas.md');
  for (const heading of ['## Starting out', '## Architect and engineering manager', '## CTO', '## CDAIO and CIO'])
    assert.ok(personas.includes(heading), `Personas.md missing "${heading}"`);
  assert.ok(read('wiki/Home.md').includes('(Personas)'), 'wiki/Home.md must link Personas');
});

// The full spec (what it is, how to use it, best practices) now lives on the
// docs site, one page per skill (test/site/site-coverage.test.mjs enforces
// that richness). Every wiki skill page is instead a lean, generated stub
// that points there — checked here for shape, and against the generator
// itself for content.
test('every skill wiki page is a lean stub linking the site, and matches the generator', () => {
  const pages = walk('wiki', (p) => /wiki\/Skill-[^/]+\.md$/.test(p));
  assert.ok(pages.length >= 18, `expected >=18 skill pages, found ${pages.length}`);
  for (const page of pages) {
    const body = read(page);
    assert.ok(/^# /.test(body), `${page} must open with an H1`);
    assert.ok(/Full documentation: https:\/\/tqnonline\.github\.io\/skills\//.test(body),
      `${page} must link the skill's full documentation on the site`);
    assert.ok(/\*\*Invocation:\*\* (user|model)-invoked/.test(body), `${page} must state its invocation axis`);
    assert.ok(body.split('\n').length <= 15, `${page} must stay under 15 lines — the full spec now lives on the site`);
  }
  const result = spawnSync(process.execPath, [join(root, 'scripts/gen-wiki-stubs.mjs'), '--check'],
    { encoding: 'utf8', cwd: root });
  assert.equal(result.status, 0, `stub content must match the generator:\n${result.stdout}${result.stderr}`);
});
