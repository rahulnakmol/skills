import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, isAbsolute } from 'node:path';
import { root, read } from '../helpers.mjs';

const INSTALL_ADAPTERS = join(root, 'scripts/install-adapters.sh');
const INSTALL_HOOKS = join(root, 'adapters/claude/hooks/install-hooks.mjs');
const MARKER = '--grit-hook';

// Each case gets its own Claude configuration root and its own project
// directory, so nothing here can read or write the developer's real settings.
function withInstallEnv(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'grit-claude-install-'));
  const claudeHome = join(dir, 'claude-home');
  const project = join(dir, 'project');
  mkdirSync(project, { recursive: true });
  const env = { ...process.env, CLAUDE_CONFIG: claudeHome };
  try {
    return fn({ dir, claudeHome, project, env });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function runInstaller(args, { project, env }) {
  return spawnSync('bash', [INSTALL_ADAPTERS, ...args], { encoding: 'utf8', cwd: project, env });
}

function runHooksScript(args, { project, env }) {
  return spawnSync(process.execPath, [INSTALL_HOOKS, ...args], { encoding: 'utf8', cwd: project, env });
}

function readSettings(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function gritCommand(settings) {
  const entry = (settings.hooks?.Stop ?? [])
    .find((e) => e.hooks?.some((h) => typeof h.command === 'string' && h.command.includes(MARKER)));
  return entry?.hooks.find((h) => h.command.includes(MARKER))?.command ?? null;
}

// The launcher path out of a registered command: either an absolute path in
// quotes, or a bare project-relative one.
function launcherPathFrom(command) {
  const quoted = command.match(/^node "(.+?)" /);
  if (quoted) return quoted[1];
  const bare = command.match(/^node (\S+) /);
  return bare ? bare[1] : null;
}

// --- the regression this file exists for ------------------------------------

// The installer copied the launcher to a user-level path and then registered a
// project-relative command, so the recorded path pointed at a file that was
// never written and the hook silently did not run.
test('--tool claude-hooks records a command that resolves to the launcher it copied', () => {
  withInstallEnv((ctx) => {
    const result = runInstaller(['--tool', 'claude-hooks'], ctx);
    assert.equal(result.status, 0, `installer failed:\n${result.stdout}${result.stderr}`);

    const settingsPath = join(ctx.claudeHome, 'settings.json');
    assert.ok(existsSync(settingsPath), 'the registration must land in the same root the copy used');

    const command = gritCommand(readSettings(settingsPath));
    assert.ok(command, 'a grit Stop entry must have been written');

    const launcher = launcherPathFrom(command);
    assert.ok(launcher && isAbsolute(launcher),
      `a user-level registration must name the launcher absolutely, got: ${command}`);
    assert.ok(existsSync(launcher),
      `the recorded path must resolve to a real file, got: ${launcher}`);
    assert.match(readFileSync(launcher, 'utf8'), /grit stop-hook launcher/,
      'the recorded path must resolve to the copied launcher, not some other file');
  });
});

test('--tool claude-hooks writes nothing into the project directory', () => {
  withInstallEnv((ctx) => {
    runInstaller(['--tool', 'claude-hooks'], ctx);
    assert.ok(!existsSync(join(ctx.project, '.claude')),
      'a user-level install must not leave a half-written .claude directory in the project');
  });
});

// --- the project-level path keeps its relative command ----------------------

// A project settings file is normally committed and shared, so it names the
// launcher relatively rather than baking in one machine's home directory.
test('the project-level target still registers a relative launcher path', () => {
  withInstallEnv((ctx) => {
    const result = runHooksScript(['--dry-run'], ctx);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /"command": "node \.claude\/hooks\/grit-stop-hook\.mjs --grit-hook"/,
      'the default target must keep the project-relative command');
  });
});

// --- repair, idempotency, and neighbours ------------------------------------

test('a stale entry left by the earlier installer is repaired in place', () => {
  withInstallEnv((ctx) => {
    const settingsPath = join(ctx.claudeHome, 'settings.json');
    mkdirSync(ctx.claudeHome, { recursive: true });
    writeFileSync(settingsPath, JSON.stringify({
      otherSetting: 'keep me',
      hooks: {
        PreToolUse: [{ hooks: [{ type: 'command', command: 'echo sibling' }] }],
        Stop: [{ hooks: [{ type: 'command', command: `node .claude/hooks/grit-stop-hook.mjs ${MARKER}` }] }],
      },
    }, null, 2));

    const result = runHooksScript(['--user'], ctx);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /repaired the stale/, 'a wrongly-pathed entry must be rewritten, not left alone');

    const settings = readSettings(settingsPath);
    assert.equal(settings.hooks.Stop.length, 1, 'repair must replace the entry, never append a second one');
    assert.ok(isAbsolute(launcherPathFrom(gritCommand(settings))), 'the repaired command must be absolute');
    assert.ok(settings.hooks.PreToolUse, 'a sibling hook must survive the repair');
    assert.equal(settings.otherSetting, 'keep me', 'unrelated settings must survive the repair');
  });
});

test('running the installer twice leaves exactly one entry and reports no change', () => {
  withInstallEnv((ctx) => {
    runInstaller(['--tool', 'claude-hooks'], ctx);
    const second = runInstaller(['--tool', 'claude-hooks'], ctx);
    assert.equal(second.status, 0);
    assert.match(second.stdout, /already present/, 're-running must be a no-op, not a duplicate');
    assert.equal(readSettings(join(ctx.claudeHome, 'settings.json')).hooks.Stop.length, 1);
  });
});

test('uninstall --user removes the grit entry and leaves its neighbours alone', () => {
  withInstallEnv((ctx) => {
    runInstaller(['--tool', 'claude-hooks'], ctx);
    const settingsPath = join(ctx.claudeHome, 'settings.json');
    const settings = readSettings(settingsPath);
    settings.hooks.PreToolUse = [{ hooks: [{ type: 'command', command: 'echo sibling' }] }];
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    const result = runHooksScript(['--uninstall', '--user'], ctx);
    assert.equal(result.status, 0, result.stderr);
    const after = readSettings(settingsPath);
    assert.equal(gritCommand(after), null, 'the grit entry must be gone');
    assert.ok(after.hooks.PreToolUse, 'a sibling hook must survive the uninstall');
  });
});

// --- the wiring that keeps the two halves together --------------------------

test('the claude-hooks arm registers at the same level it copies to', () => {
  const body = read('scripts/install-adapters.sh');
  const arm = body.match(/install_claude_hooks\(\) \{([\s\S]*?)\n\}/);
  assert.ok(arm, 'install-adapters.sh must define install_claude_hooks');
  assert.match(arm[1], /CLAUDE_CONFIG:-\$HOME\/\.claude\}\/hooks/,
    'the arm must copy the launcher under the Claude configuration root');
  assert.match(arm[1], /install-hooks\.mjs" --user/,
    'a user-level copy must be registered with --user, or the recorded path will not resolve');
});
