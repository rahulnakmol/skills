import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

test('the 4D Diamond diagram exists and is embedded in README and both DDDD doctrines', () => {
  const rel = 'docs/assets/4d-diamond.svg';
  assert.ok(existsSync(join(root, rel)), `missing ${rel}`);
  assert.ok(read(rel).startsWith('<svg'), `${rel} must be a standalone SVG`);
  assert.ok(read('README.md').includes(rel), 'README.md must embed the 4D Diamond diagram');
});

test('DDDD.md on both sides names the 4D Diamond and points to the diagram', () => {
  for (const file of ['skills/developer/DDDD.md', 'skills/pm/DDDD.md']) {
    const body = read(file);
    assert.ok(body.includes('4D Diamond'), `${file}: must name "the 4D Diamond"`);
    assert.ok(body.includes('4d-diamond.svg'), `${file}: must point to the diagram`);
  }
});
