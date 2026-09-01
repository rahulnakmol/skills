import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, cpSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root } from '../helpers.mjs';

const CODEX_HOOK = join(root, 'adapters/codex/hooks/stop-hook.mjs');
const CLEAN_LEDGER = join(root, 'test/fixtures/grit/clean/GATES.md');
const UNMET_LEDGER = join(root, 'test/fixtures/grit/unmet/GATES.md');

// A synthetic Codex Stop payload. Every field and its type comes from the
// generated schema codex-rs/hooks/schema/generated/stop.command.input.schema.json
// in openai/codex, which lists all nine as required. `cwd` and `session_id`
// carry the names the shared implementation already reads.
function stopPayload(cwd, overrides = {}) {
  return JSON.stringify({
    hook_event_name: 'Stop',
    session_id: 'test-session-0001',
    turn_id: 'test-turn-0001',
    cwd,
    transcript_path: null,
    last_assistant_message: null,
    model: 'test-model',
    permission_mode: 'default',
    stop_hook_active: false,
    ...overrides,
  });
}

function runCodexHook(cwd, { args = [], payload, hook = CODEX_HOOK, env } = {}) {
  return spawnSync(process.execPath, [hook, ...args], {
    encoding: 'utf8',
    cwd,
    input: payload ?? stopPayload(cwd),
    ...(env ? { env } : {}),
  });
}

function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'grit-codex-test-'));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Writes a stand-in for the vendored delegate so the launcher's own adaptation
// can be tested apart from the ledger logic it delegates to.
function fakeSkillDir(dir, body) {
  const skillDir = join(dir, 'fake-grit');
  mkdirSync(join(skillDir, 'scripts'), { recursive: true });
  writeFileSync(join(skillDir, 'scripts', 'stop-hook.mjs'), body);
  return skillDir;
}

// Codex declares its Stop output with additionalProperties:false, so a key it
// does not know is a parse failure, not an ignored extra.
const CODEX_STOP_OUTPUT_KEYS = new Set([
  'continue', 'decision', 'reason', 'stopReason', 'suppressOutput', 'systemMessage',
]);

function assertCodexStopOutput(stdout) {
  const trimmed = stdout.trim();
  if (!trimmed) return null;
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    assert.fail(`stdout must be empty or a single JSON object, got: ${JSON.stringify(trimmed.slice(0, 200))}`);
  }
  for (const key of Object.keys(parsed)) {
    assert.ok(CODEX_STOP_OUTPUT_KEYS.has(key),
      `"${key}" is not a field Codex's Stop output schema declares; additionalProperties is false`);
  }
  if (parsed.decision !== undefined) {
    assert.equal(parsed.decision, 'block', 'the only decision value Codex accepts at Stop is "block"');
    assert.ok(typeof parsed.reason === 'string' && parsed.reason.trim(),
      'Codex requires a non-empty reason whenever decision is block');
  }
  return parsed;
}

// --- blocking and allowing --------------------------------------------------

test('the Codex hook blocks Stop while the governing ledger has an unmet gate', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const result = runCodexHook(dir);
    assert.equal(result.status, 0,
      'the hook must exit 0 — Codex parses stdout only on a clean exit, so a non-zero status would discard the block');
    const parsed = assertCodexStopOutput(result.stdout);
    assert.equal(parsed?.decision, 'block', 'unmet gates must produce a block decision');
    assert.match(parsed.reason, /GATES:G2/, 'the block reason must name the unmet gate');
  });
});

test('the Codex hook does not block Stop when the governing ledger is fully met', () => {
  withTempDir((dir) => {
    cpSync(CLEAN_LEDGER, join(dir, 'GATES.md'));
    const result = runCodexHook(dir);
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.notEqual(parsed?.decision, 'block', 'a fully met ledger must never be blocked');
  });
});

test('the Codex hook allows Stop when there is no ledger at all', () => {
  withTempDir((dir) => {
    const result = runCodexHook(dir);
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.notEqual(parsed?.decision, 'block',
      'a project that never adopted a ledger must behave exactly as it did without the hook');
  });
});

test('the Codex hook reads the ledger at the payload cwd, not the process cwd', () => {
  withTempDir((dir) => {
    const ledgerDir = join(dir, 'elsewhere');
    mkdirSync(ledgerDir, { recursive: true });
    cpSync(UNMET_LEDGER, join(ledgerDir, 'GATES.md'));
    // Run from a directory with no ledger, but point the payload at one.
    const result = runCodexHook(dir, { payload: stopPayload(ledgerDir) });
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.equal(parsed?.decision, 'block', 'the hook must honour the cwd Codex reports in the payload');
  });
});

// --- the launcher's own adaptation ------------------------------------------

test('a delegate that exits non-zero is normalized into an allow, never a stray block', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    // Exit 2 with text on stderr is precisely what Codex would otherwise read
    // as a block whose reason is that stderr.
    const skillDir = fakeSkillDir(dir,
      'process.stderr.write("delegate crashed\\n"); process.exit(2);\n');
    const result = runCodexHook(dir, { args: ['--skill-dir', skillDir] });
    assert.equal(result.status, 0, 'the launcher must absorb the delegate status and exit 0 itself');
    const parsed = assertCodexStopOutput(result.stdout);
    assert.notEqual(parsed?.decision, 'block', 'a crashed delegate must not block the session');
    assert.match(parsed.systemMessage, /exited with status 2/,
      'the failure must be reported rather than swallowed');
  });
});

// Installed, the launcher sits at ~/.codex/hooks/ rather than in a checkout,
// so the case that matters is the one where no search route resolves at all.
// Reproduce it by copying the launcher outside the repository and pointing
// HOME at a directory with no installed skill pack.
test('a missing vendored implementation allows Stop and says why', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const hooksDir = join(dir, 'home', '.codex', 'hooks');
    mkdirSync(hooksDir, { recursive: true });
    const installed = join(hooksDir, 'grit-stop-hook.mjs');
    cpSync(CODEX_HOOK, installed);
    const env = { ...process.env, HOME: join(dir, 'home'), USERPROFILE: join(dir, 'home') };
    delete env.GRIT_SKILL_DIR;

    const result = runCodexHook(dir, { hook: installed, env });
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.notEqual(parsed?.decision, 'block', 'a misinstalled hook must never trap a session');
    assert.match(parsed.systemMessage, /could not find the vendored stop-hook/);
  });
});

// The same isolated launcher must enforce again once a skill root exists,
// which is what proves the diagnostic above was a missing delegate rather
// than a launcher that had stopped working.
test('the isolated launcher blocks again once a skill root resolves', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const home = join(dir, 'home');
    const hooksDir = join(home, '.codex', 'hooks');
    mkdirSync(hooksDir, { recursive: true });
    const installed = join(hooksDir, 'grit-stop-hook.mjs');
    cpSync(CODEX_HOOK, installed);
    // Install the real implementation where the launcher looks for it.
    cpSync(join(root, 'skills/core/grit'), join(home, '.codex', 'skills', 'grit'), { recursive: true });
    const env = { ...process.env, HOME: home, USERPROFILE: home };
    delete env.GRIT_SKILL_DIR;

    const result = runCodexHook(dir, { hook: installed, env });
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.equal(parsed?.decision, 'block', 'a launcher that found its delegate must enforce the ledger');
    assert.match(parsed.reason, /GATES:G2/);
  });
});

test('--skill-dir is consumed by the launcher and every other argument is forwarded', () => {
  withTempDir((dir) => {
    // The stand-in reports the argv it was handed, through a field Codex allows.
    const skillDir = fakeSkillDir(dir,
      'console.log(JSON.stringify({ systemMessage: "argv:" + process.argv.slice(2).join(",") }));\n');
    const result = runCodexHook(dir, { args: ['--skill-dir', skillDir, '--grit-hook', '--scope', 'alpha'] });
    assert.equal(result.status, 0);
    const parsed = assertCodexStopOutput(result.stdout);
    assert.match(parsed.systemMessage, /--grit-hook/, '--grit-hook must reach the delegate');
    assert.match(parsed.systemMessage, /--scope,alpha/, '--scope and its value must reach the delegate intact');
    assert.doesNotMatch(parsed.systemMessage, /--skill-dir/,
      '--skill-dir addresses the launcher and must not be forwarded');
    assert.doesNotMatch(parsed.systemMessage, new RegExp(skillDir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      'the --skill-dir value must be consumed along with its flag');
  });
});

test('a clean delegate exit forwards stdout byte for byte', () => {
  withTempDir((dir) => {
    const skillDir = fakeSkillDir(dir,
      'process.stdout.write(JSON.stringify({ decision: "block", reason: "fixed reason" }));\n');
    const result = runCodexHook(dir, { args: ['--skill-dir', skillDir] });
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '{"decision":"block","reason":"fixed reason"}',
      'the launcher must not reshape a payload the delegate already formed');
  });
});

// --- containment -------------------------------------------------------------

test('the Codex hook writes only inside the cwd it was given, never inside the repository', () => {
  withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const scope = ['adapters', 'skills', 'scripts', 'test'];
    const before = spawnSync('git', ['status', '--porcelain', '--', ...scope], { encoding: 'utf8', cwd: root }).stdout;
    runCodexHook(dir);
    const after = spawnSync('git', ['status', '--porcelain', '--', ...scope], { encoding: 'utf8', cwd: root }).stdout;
    assert.equal(before, after, 'the stop hook must not write anything inside the repository');
  });
});
