import { test } from 'node:test';
import assert from 'node:assert/strict';
import { walk, read, frontmatterModel } from '../helpers.mjs';

const DISALLOWED = /(kimi|\bglm\b|minimax|deepseek|qwen|grok|llama|mistral)/i;
const ALLOWED_MODEL = /^(claude-|claude\b|gpt-|gemini-|o\d)/i;

const adapterFiles = walk('adapters', (p) => p.endsWith('.md') && p.includes('/agents/'));

test('every adapter with a model binding uses an allowlist model', () => {
  assert.ok(adapterFiles.length >= 25, `expected ≥25 adapter agent files, found ${adapterFiles.length}`);
  for (const file of adapterFiles) {
    const model = frontmatterModel(read(file));
    if (!model) continue;
    const id = model.split('/').pop();
    assert.ok(!DISALLOWED.test(model), `${file}: disallowed provider in shipped binding: ${model}`);
    assert.ok(ALLOWED_MODEL.test(id), `${file}: model id "${id}" does not look like Anthropic/OpenAI/Google`);
  }
});

test('adapter bodies mention disallowed models only as explicit overrides', () => {
  for (const file of adapterFiles) {
    const body = read(file).replace(/^---\n[\s\S]*?\n---/, '');
    for (const line of body.split('\n')) {
      if (DISALLOWED.test(line)) {
        assert.ok(/override|example|not shipped/i.test(line),
          `${file}: non-allowlist model mentioned outside an override example: "${line.trim()}"`);
      }
    }
  }
});
