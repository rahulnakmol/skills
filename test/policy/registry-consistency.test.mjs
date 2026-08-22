import { test } from 'node:test';
import assert from 'node:assert/strict';
import { walk, read, frontmatterModel } from '../helpers.mjs';

const registry = read('skills/developer/model-routing/models.md');

function registryJson() {
  const m = registry.match(/```json\n([\s\S]*?)\n```/);
  assert.ok(m, 'models.md must contain a fenced ```json block (machine source of truth)');
  return JSON.parse(m[1]);
}

test('registry declares the provider allowlist', () => {
  const j = registryJson();
  assert.deepEqual(j.policy.allowed_providers.sort(), ['anthropic', 'google', 'openai']);
});

test('registry published_ids exactly match the ids shipped in adapters', () => {
  const j = registryJson();
  const shipped = new Set();
  for (const file of walk('adapters', (p) => p.endsWith('.md') && p.includes('/agents/'))) {
    const model = frontmatterModel(read(file));
    if (model) shipped.add(model.split('/').pop());
  }
  assert.deepEqual([...shipped].sort(), [...j.published_ids].sort(),
    'models.md published_ids and adapter model bindings must be the same set');
});

test('registry carries a parseable review date', () => {
  assert.ok(/Last reviewed: \d{4}-\d{2}-\d{2}/.test(registry), 'models.md must state "Last reviewed: YYYY-MM-DD"');
});

test('no stale pointers to pre-port doc names remain in adapters', () => {
  for (const file of walk('adapters', (p) => p.endsWith('.md'))) {
    const body = read(file);
    assert.ok(!/SDLC_METHOD\.md|SDLC_LOOP\.md/.test(body),
      `${file}: references pre-port filename; point at skills/developer/sdlc/METHOD.md or LOOP-CONTRACT.md`);
  }
});
