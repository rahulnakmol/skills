import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, cpSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root } from '../helpers.mjs';

const GATE_CHECK = join(root, 'skills/developer/grit/scripts/gate-check.mjs');
const GATE_LINT = join(root, 'skills/developer/grit/scripts/gate-lint.mjs');
const STOP_HOOK = join(root, 'adapters/claude/hooks/stop-hook.mjs');

const CLEAN_LEDGER = join(root, 'test/fixtures/grit/clean/GATES.md');
const UNMET_LEDGER = join(root, 'test/fixtures/grit/unmet/GATES.md');
const MALFORMED_LEDGER = join(root, 'test/fixtures/grit/malformed/GATES.md');

function run(file, args, opts = {}) {
  return spawnSync(process.execPath, [file, ...args], { encoding: 'utf8', ...opts });
}

function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'grit-test-'));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// --- gate-check.mjs --status -------------------------------------------------

test('gate-check --status exits 0 on a fully met ledger', () => {
  const result = run(GATE_CHECK, ['--status', CLEAN_LEDGER]);
  assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /ALL MET/);
});

test('gate-check --status exits 1 on an unmet ledger and names the unmet gate id', () => {
  const result = run(GATE_CHECK, ['--status', UNMET_LEDGER]);
  assert.equal(result.status, 1, `expected exit 1, got ${result.status}\n${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /GATES:G2/, 'stdout must name the unmet gate id');
  assert.match(result.stdout, /UNMET/);
});

test('gate-check --status never executes anything and never writes: fixture bytes are unchanged', () => {
  withTempDir((dir) => {
    const target = join(dir, 'GATES.md');
    cpSync(UNMET_LEDGER, target);
    const before = readFileSync(target);
    const result = run(GATE_CHECK, ['--status', target]);
    const after = readFileSync(target);
    assert.equal(result.status, 1);
    assert.ok(before.equals(after), '--status must never rewrite the ledger it reads');
  });
});

// --- gate-lint.mjs ------------------------------------------------------------

test('gate-lint exits 0 with LINT OK on a clean ledger', () => {
  const result = run(GATE_LINT, [CLEAN_LEDGER]);
  assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /LINT OK/);
});

test('gate-lint exits non-zero on a malformed ledger and names the error', () => {
  const result = run(GATE_LINT, [MALFORMED_LEDGER]);
  assert.notEqual(result.status, 0, `expected a non-zero exit, got 0\n${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /ERROR/, 'gate-lint must report a named error for the malformed ledger');
  assert.match(result.stdout, /G1/, 'gate-lint must name the offending gate id');
  assert.match(result.stdout, /CHECK and EXPECT/, 'gate-lint must explain what is structurally broken');
});

// gate-check.mjs treats a structurally invalid ledger the same way: a parse
// error, reported and refused, never silently accepted or executed.
test('gate-check --status also refuses a malformed ledger rather than running anything', () => {
  const result = run(GATE_CHECK, ['--status', MALFORMED_LEDGER]);
  assert.notEqual(result.status, 0, `expected a non-zero exit, got 0\n${result.stdout}${result.stderr}`);
  assert.match(result.stderr, /CHECK and EXPECT/);
});

// --- Claude Code stop hook -----------------------------------------------------

function runStopHook(cwd) {
  return spawnSync(process.execPath, [STOP_HOOK], {
    encoding: 'utf8',
    cwd,
    input: '{}',
  });
}

test('stop hook blocks Stop while the governing ledger has an unmet gate', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const result = runStopHook(dir);
    assert.equal(result.status, 0, 'the hook launcher itself always exits 0');
    assert.match(result.stdout, /"decision":"block"/, 'unmet gates must produce a block decision');
    assert.match(result.stdout, /GATES:G2/, 'the block reason must name the unmet gate');
  });
});

test('stop hook does not block Stop when the governing ledger is fully met', () => {
  withTempDir((dir) => {
    cpSync(CLEAN_LEDGER, join(dir, 'GATES.md'));
    const result = runStopHook(dir);
    assert.equal(result.status, 0);
    assert.doesNotMatch(result.stdout, /"decision":"block"/, 'a fully met ledger must never be blocked');
  });
});

test('stop hook writes only inside the temp cwd it was given, never inside the repository', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const repoStatusBefore = spawnSync('git', ['status', '--porcelain', '--', 'adapters', 'skills', 'scripts'], {
      encoding: 'utf8', cwd: root,
    }).stdout;
    runStopHook(dir);
    const repoStatusAfter = spawnSync('git', ['status', '--porcelain', '--', 'adapters', 'skills', 'scripts'], {
      encoding: 'utf8', cwd: root,
    }).stdout;
    assert.equal(repoStatusBefore, repoStatusAfter, 'the stop hook must not write anything inside the repository');
  });
});
