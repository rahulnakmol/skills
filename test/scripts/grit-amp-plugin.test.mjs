import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, cpSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from '../helpers.mjs';

const PLUGIN = join(root, 'adapters/amp/plugin/tqn-grit.js');
const GRIT_SKILL = join(root, 'skills/core/grit');
const CLEAN_LEDGER = join(root, 'test/fixtures/grit/clean/GATES.md');
const UNMET_LEDGER = join(root, 'test/fixtures/grit/unmet/GATES.md');

const plugin = await import(pathToFileURL(PLUGIN).href);

// Handlers are async, so the directory must outlive the awaited work; a
// synchronous try/finally would delete it while the hook still runs.
async function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'grit-amp-plugin-'));
  try {
    return await fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// A stand-in for the PluginAPI object Amp hands to the default export. It
// records registrations so a test can call the handlers directly, the way the
// host would, and it implements only the members the plugin touches.
function fakeAmp(workspaceRoot) {
  const handlers = {};
  const commands = {};
  const logs = [];
  const api = {
    logger: { log: (...args) => logs.push(args.join(' ')) },
    system: { workspaceRoot: workspaceRoot ? pathToFileURL(workspaceRoot) : null },
    helpers: {
      filePathFromURI: (uri) => decodeURIComponent(new URL(uri.toString()).pathname),
      filesModifiedByToolCall: (event) => {
        const p = event.input?.path;
        return typeof p === 'string' ? [pathToFileURL(p)] : null;
      },
    },
    on: (event, handler) => { handlers[event] = handler; return { unsubscribe() {} }; },
    registerCommand: (id, options, handler) => { commands[id] = { options, handler }; return { unsubscribe() {} }; },
  };
  return { api, handlers, commands, logs };
}

const ctx = { logger: { log() {} } };
const endEvent = (status = 'done') => ({ thread: { id: 'T-test-0001' }, message: 'do the work', id: 'M-1', status, messages: [] });

// --- what Amp reads from the module ------------------------------------------

test('the plugin file exports a static description within the 300-character limit', () => {
  assert.equal(typeof plugin.description, 'string');
  assert.ok(plugin.description.length <= 300, `description is ${plugin.description.length} characters; Amp ignores anything over 300`);
  const source = readFileSync(PLUGIN, 'utf8');
  assert.match(source, /^export const description =\s*\n?\s*'[^']+'/m,
    'Amp requires the description to be a static string literal, not a computed value');
  assert.equal(typeof plugin.default, 'function', 'Amp calls the default export with the PluginAPI');
});

test('the plugin registers the two agent hooks and two Grit commands, and nothing else', () => {
  const { api, handlers, commands } = fakeAmp(null);
  plugin.default(api);
  assert.deepEqual(Object.keys(handlers).sort(), ['agent.end', 'tool.call']);
  assert.deepEqual(Object.keys(commands).sort(), ['grit-approve', 'grit-status']);
  for (const { options } of Object.values(commands)) assert.equal(options.category, 'Grit');
});

// --- agent.end -----------------------------------------------------------------

test('a finished turn with an unmet ledger is continued with the unmet gate named', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const { api, handlers, logs } = fakeAmp(dir);
    plugin.default(api);
    const result = await handlers['agent.end'](endEvent(), ctx);
    assert.equal(result?.action, 'continue', 'unmet gates must start another turn');
    assert.match(result.userMessage, /GATES:G2/, 'the continuation must name the unmet gate');
    assert.match(result.userMessage, /^\[tqn-grit plugin\]/, 'the continuation must say where it came from');
    assert.ok(existsSync(join(dir, '.grit-hook-state.json')), 'the delegate records the block for its loop guard');
    assert.equal(logs.length, 0, 'the fake ctx logger, not amp.logger, receives handler logs');
  });
});

test('a finished turn with a fully met ledger ends normally', async () => {
  await withTempDir(async (dir) => {
    cpSync(CLEAN_LEDGER, join(dir, 'GATES.md'));
    const { api, handlers } = fakeAmp(dir);
    plugin.default(api);
    const result = await handlers['agent.end'](endEvent(), ctx);
    assert.equal(result, undefined, 'a met ledger must never continue the turn');
  });
});

test('a workspace without any ledger is left alone and no process is spawned', async () => {
  await withTempDir(async (dir) => {
    const { api, handlers } = fakeAmp(dir);
    plugin.default(api);
    const result = await handlers['agent.end'](endEvent(), ctx);
    assert.equal(result, undefined);
    assert.ok(!existsSync(join(dir, '.grit-hook-state.json')), 'nothing may be written to a project that never adopted a ledger');
  });
});

test('cancelled and errored turns are never continued, even with unmet gates', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const { api, handlers } = fakeAmp(dir);
    plugin.default(api);
    assert.equal(await handlers['agent.end'](endEvent('cancelled'), ctx), undefined);
    assert.equal(await handlers['agent.end'](endEvent('error'), ctx), undefined);
  });
});

test('with no workspace open the handler returns without touching anything', async () => {
  const { api, handlers } = fakeAmp(null);
  plugin.default(api);
  assert.equal(await handlers['agent.end'](endEvent(), ctx), undefined);
});

test('the loop guard inside the delegate releases the turn after six blocks without progress', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const { api, handlers } = fakeAmp(dir);
    plugin.default(api);
    let continued = 0;
    for (let i = 0; i < 8; i += 1) {
      const result = await handlers['agent.end'](endEvent(), ctx);
      if (result?.action === 'continue') continued += 1;
    }
    assert.equal(continued, 6, 'the sixth block is the last; the seventh stop is released');
  });
});

// --- locating the skill ------------------------------------------------------

test('the skill is found through the repository layout and through GRIT_SKILL_DIR', async () => {
  assert.equal(plugin.findSkillDir(root), GRIT_SKILL);
  await withTempDir((dir) => {
    const env = { HOME: dir, XDG_CONFIG_HOME: join(dir, 'cfg'), XDG_CACHE_HOME: join(dir, 'cache') };
    assert.equal(plugin.findSkillDir(dir, env), GRIT_SKILL,
      'the plugin file sits inside the checkout, so the relative repo layout always resolves');
    assert.equal(plugin.findSkillDir(dir, { ...env, GRIT_SKILL_DIR: '/nowhere' }), GRIT_SKILL,
      'an invalid override falls through to the next candidate instead of failing');
    const installed = join(dir, 'cfg', 'agents', 'skills', 'grit');
    cpSync(GRIT_SKILL, installed, { recursive: true });
    const order = plugin.candidateSkillDirs(dir, env);
    assert.ok(order.includes(installed), 'amp skill add --global installs under $XDG_CONFIG_HOME/agents/skills');
    assert.ok(order.indexOf(join(dir, '.agents', 'skills', 'grit')) < order.indexOf(installed),
      'a project-local skill root wins over the user-level one');
  });
});

test('a missing or crashing delegate allows the turn and reports why', async () => {
  await withTempDir((dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const fake = join(dir, 'fake-grit');
    mkdirSync(join(fake, 'scripts'), { recursive: true });
    cpSync(join(GRIT_SKILL, 'scripts', 'gate-check.mjs'), join(fake, 'scripts', 'gate-check.mjs'));
    writeFileSync(join(fake, 'scripts', 'stop-hook.mjs'), 'process.stderr.write("delegate crashed\\n"); process.exit(2);\n');
    const crashed = plugin.runStopHook({ skillDir: fake, root: dir, sessionId: 's' });
    assert.equal(crashed.decision, 'allow', 'a crashed delegate must never block');
    assert.match(crashed.note, /exited 2/);

    writeFileSync(join(fake, 'scripts', 'stop-hook.mjs'), 'console.log("not json")\n');
    const garbled = plugin.runStopHook({ skillDir: fake, root: dir, sessionId: 's' });
    assert.equal(garbled.decision, 'allow');
    assert.match(garbled.note, /other than JSON/);
  });
});

// --- tool.call ---------------------------------------------------------------

test('edits to the approval store and the hook state are rejected; other edits are allowed', async () => {
  await withTempDir(async (dir) => {
    // gate-check refuses an approval store inside the repository root, so the
    // store lives in a sibling temporary directory.
    const approvals = mkdtempSync(join(tmpdir(), 'grit-amp-approvals-'));
    const previous = process.env.GRIT_APPROVAL_DIR;
    process.env.GRIT_APPROVAL_DIR = join(approvals, 'store');
    try {
      const { api, handlers } = fakeAmp(dir);
      plugin.default(api);
      const call = (path) => handlers['tool.call']({ toolUseID: 't', tool: 'create_file', input: { path }, thread: { id: 'T-1' } }, ctx);
      assert.equal((await call(join(approvals, 'store', 'abc.json'))).action, 'reject-and-continue');
      assert.equal((await call(join(dir, '.grit-hook-state.json'))).action, 'reject-and-continue');
      assert.equal((await call(join(dir, '.grit', 'alpha', 'hook-state.json'))).action, 'reject-and-continue');
      assert.equal((await call(join(dir, 'GATES.md'))).action, 'allow', 'the ledger itself is the agent\'s to edit');
      assert.equal((await call(join(dir, 'src', 'index.js'))).action, 'allow');
      const bash = await handlers['tool.call']({ toolUseID: 't', tool: 'Bash', input: { cmd: 'ls' }, thread: { id: 'T-1' } }, ctx);
      assert.equal(bash.action, 'allow', 'a call that modifies no known file passes through');
    } finally {
      if (previous === undefined) delete process.env.GRIT_APPROVAL_DIR;
      else process.env.GRIT_APPROVAL_DIR = previous;
      rmSync(approvals, { recursive: true, force: true });
    }
  });
});

test('isProtectedPath defaults the approval store to ~/.grit/approved', () => {
  const env = {};
  assert.equal(plugin.isProtectedPath(join(homedir(), '.grit', 'approved', 'x'), { env }), true);
  assert.equal(plugin.isProtectedPath(join(homedir(), '.grit', 'other', 'x'), { env }), false);
  assert.equal(plugin.isProtectedPath('/tmp/elsewhere/x', { env }), false);
});

// --- commands ----------------------------------------------------------------

test('Grit: Gate status reports through ctx.ui.notify without running any CHECK', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const { api, commands } = fakeAmp(dir);
    plugin.default(api);
    const notices = [];
    await commands['grit-status'].handler({ ui: { notify: async (m) => notices.push(m) } });
    assert.equal(notices.length, 1);
    assert.match(notices[0], /UNMET: 1/);
    assert.doesNotMatch(notices[0], /RUN /, '--status must not run anything');
  });
});

test('Grit: Approve pending checks shows the exact CHECK and runs nothing until confirmed', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const approvalsParent = mkdtempSync(join(tmpdir(), 'grit-amp-approvals-'));
    const approvals = join(approvalsParent, 'store');
    const previous = process.env.GRIT_APPROVAL_DIR;
    process.env.GRIT_APPROVAL_DIR = approvals;
    try {
      const { api, commands } = fakeAmp(dir);
      plugin.default(api);
      const notices = [];
      let confirmOptions = null;
      const ui = {
        notify: async (m) => notices.push(m),
        confirm: async (options) => { confirmOptions = options; return false; },
      };
      await commands['grit-approve'].handler({ ui });
      assert.ok(confirmOptions, 'the user must be asked');
      assert.match(confirmOptions.message, /CHECK: node -e "console.log\('OK_TOKEN_TWO'\)"/,
        'the dialog must show the exact command the human is approving');
      assert.match(notices.at(-1), /nothing approved/);
      assert.ok(!existsSync(approvals), 'declining must record no approval');

      ui.confirm = async () => true;
      await commands['grit-approve'].handler({ ui });
      assert.ok(existsSync(approvals), 'confirming records the approval outside the repository');
      assert.match(notices.at(-1), /APPROVED/);
      assert.match(readFileSync(join(dir, 'GATES.md'), 'utf8'), /\[x\] G2/, 'the approved check ran and the ledger records it met');
    } finally {
      if (previous === undefined) delete process.env.GRIT_APPROVAL_DIR;
      else process.env.GRIT_APPROVAL_DIR = previous;
      rmSync(approvalsParent, { recursive: true, force: true });
    }
  });
});

test('pendingApprovalBlocks extracts only the oracle blocks from gate-check output', () => {
  const text = [
    'APPROVAL REQUIRED GATES:G2',
    '    CHECK: node -e "x"',
    '    EXPECT: x',
    '    NOT RUN: inspect this oracle, then re-run with --approve',
    'GATES.md: 2 gates',
    'UNMET: 1 (met: 1)',
    '  GATES:G2',
  ].join('\n');
  const blocks = plugin.pendingApprovalBlocks(text);
  assert.equal(blocks.length, 1);
  assert.match(blocks[0], /CHECK: node -e "x"/);
  assert.doesNotMatch(blocks[0], /UNMET/);
});

// --- containment -------------------------------------------------------------

test('the plugin writes only inside the workspace it was given, never inside the repository', async () => {
  await withTempDir(async (dir) => {
    cpSync(UNMET_LEDGER, join(dir, 'GATES.md'));
    const scope = ['adapters', 'skills', 'scripts', 'test'];
    const before = spawnSync('git', ['status', '--porcelain', '--', ...scope], { encoding: 'utf8', cwd: root }).stdout;
    const { api, handlers } = fakeAmp(dir);
    plugin.default(api);
    await handlers['agent.end'](endEvent(), ctx);
    const after = spawnSync('git', ['status', '--porcelain', '--', ...scope], { encoding: 'utf8', cwd: root }).stdout;
    assert.equal(before, after);
  });
});
