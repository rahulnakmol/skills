import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
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

test('every skill wiki page is a full spec: what it is, how to use it, best practices', () => {
  const pages = walk('wiki', (p) => /wiki\/Skill-[^/]+\.md$/.test(p));
  assert.ok(pages.length >= 18, `expected >=18 skill pages, found ${pages.length}`);
  for (const page of pages) {
    const body = read(page);
    for (const heading of ['## How to use', '## Best practices'])
      assert.ok(body.includes(heading), `${page} missing "${heading}"`);
  }
});
