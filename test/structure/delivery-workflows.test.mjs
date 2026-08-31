import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

const WORKFLOWS = ['assess-work-item', 'deliver-work-item', 'shakedown-pr'];

for (const name of WORKFLOWS) {
  test(`Claude dynamic workflow ${name} is well-formed`, () => {
    const rel = `adapters/claude/workflows/${name}.js`;
    assert.ok(existsSync(join(root, rel)), `missing ${rel}`);
    const body = read(rel);
    assert.ok(body.includes('export const meta'), `${rel}: missing export const meta`);
    assert.ok(body.includes(`name: '${name}'`), `${rel}: meta.name must equal the file basename`);
    assert.ok(!/\bimport\s*\(/.test(body) && !/^import\s/m.test(body),
      `${rel}: workflow scripts must not import modules (the runtime rejects them)`);
    assert.ok(!/Date\.now|Math\.random|new Date\(\)/.test(body),
      `${rel}: Date.now/Math.random/new Date() break workflow resume`);
    assert.ok(body.includes('phases:'), `${rel}: meta must declare phases`);
  });
}

test('plugin manifest points at the workflows directory', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  assert.equal(plugin.workflows, './adapters/claude/workflows',
    'plugin.json must carry the workflows component path so the pipeline ships with the plugin');
});

test('deliver-work-item supports reviewable stacks via gh stack', () => {
  const body = read('adapters/claude/workflows/deliver-work-item.js');
  for (const marker of ['gh stack init', 'gh stack add', 'gh stack push', 'gh stack submit', 'STACKING.md'])
    assert.ok(body.includes(marker), `deliver-work-item.js missing "${marker}"`);
  assert.ok(body.includes('sole writer'), 'deliver-work-item.js must enforce the single-writer rule');
  assert.ok(body.includes("state !== 'ready'"), 'deliver-work-item.js must refuse items not at ready');
});

test('shakedown-pr is stack-aware, consumes existing checks, and blocks on red', () => {
  const body = read('adapters/claude/workflows/shakedown-pr.js');
  for (const marker of ['github-code-quality', 'stackPosition', 'REQUEST_CHANGES', 'existingChecks'])
    assert.ok(body.includes(marker), `shakedown-pr.js missing "${marker}"`);
  assert.ok(!body.includes("approveOnGreen = args?.approveOnGreen === true && false"),
    'sanity: approval stays opt-in via args');
});

test('assess-work-item runs the pickup protocol, never implementation', () => {
  const body = read('adapters/claude/workflows/assess-work-item.js');
  for (const marker of ['critiqued', 'WORK-ITEM-CONTRACT.md', 'Adversarially'])
    assert.ok(body.includes(marker), `assess-work-item.js missing "${marker}"`);
});

test('stacking doctrine exists with the required structure', () => {
  const body = read('skills/developer/deliver/STACKING.md');
  for (const heading of ['## When to stack', '## How to layer', '## Tooling', '## Review and merge order'])
    assert.ok(body.includes(heading), `STACKING.md missing heading "${heading}"`);
  for (const marker of ['gh stack sync', 'gh stack rebase', 'one concern', 'bottom-up'])
    assert.ok(body.toLowerCase().includes(marker.toLowerCase()), `STACKING.md missing "${marker}"`);
});

test('repo-setup doctrine exists and the SDLC skills follow or set it up', () => {
  const setup = read('skills/developer/deliver/REPO-SETUP.md');
  for (const heading of ['## GitHub Code Quality', '## Stacked pull requests', '## Pickup protocol', '## Shakedown', '## How the skills apply this'])
    assert.ok(setup.includes(heading), `REPO-SETUP.md missing heading "${heading}"`);
  for (const marker of ['dynamic/github-code-quality/codeql', 'github-code-quality', 'gh extension install github/gh-stack', 'gh skill install github/gh-stack'])
    assert.ok(setup.includes(marker), `REPO-SETUP.md missing "${marker}"`);
  assert.ok(read('skills/developer/deliver/SKILL.md').includes('REPO-SETUP.md'),
    'deliver/SKILL.md must verify the target repository against REPO-SETUP.md');
  assert.ok(read('skills/developer/sdlc/SKILL.md').includes('REPO-SETUP.md'),
    'sdlc/SKILL.md must check repo readiness as a prerequisite');
  assert.ok(read('skills/developer/slice/OPERABILITY.md').includes('REPO-SETUP.md'),
    'slice/OPERABILITY.md must emit greenfield bootstrap items from REPO-SETUP.md');
});

test('OpenCode parity templates exist and every template validates', () => {
  for (const name of ['assess', 'shakedown']) {
    const rel = `tools/opencode-workflows/templates/${name}.json`;
    assert.ok(existsSync(join(root, rel)), `missing ${rel}`);
    const template = JSON.parse(read(rel));
    assert.equal(template.schema_version, 1, `${rel}: schema_version must be 1`);
    assert.equal(template.name, name, `${rel}: name must match the file`);
  }
  const validated = spawnSync(process.execPath,
    [join(root, 'tools/opencode-workflows/runner.mjs'), '--validate'], { encoding: 'utf8' });
  assert.equal(validated.status, 0, `runner --validate failed:\n${validated.stderr}`);
});

// The lens roster is the one thing that drifts between engines: a lens added to a
// Claude workflow is invisible to OpenCode users until its template gains the same
// task. Claude declares lenses as `{ key: '<name>' }` entries; OpenCode declares them
// as tasks in the `lenses` stage.
const LENS_PARITY = [
  { claude: 'adapters/claude/workflows/assess-work-item.js', opencode: 'tools/opencode-workflows/templates/assess.json' },
  { claude: 'adapters/claude/workflows/shakedown-pr.js', opencode: 'tools/opencode-workflows/templates/shakedown.json' },
];

for (const { claude, opencode } of LENS_PARITY) {
  test(`review lenses stay at parity between ${claude.split('/').pop()} and ${opencode.split('/').pop()}`, () => {
    const claudeLenses = [...read(claude).matchAll(/\bkey:\s*'([a-z-]+)'/g)].map((match) => match[1]).sort();
    assert.ok(claudeLenses.length >= 3, `${claude}: expected a lens roster, found ${claudeLenses.length}`);
    const template = JSON.parse(read(opencode));
    const opencodeLenses = template.tasks.filter((task) => task.stage === 'lenses').map((task) => task.id).sort();
    assert.deepEqual(opencodeLenses, claudeLenses,
      `lens drift: ${claude} runs [${claudeLenses}] but ${opencode} runs [${opencodeLenses}]. The README claims full parity on the OpenCode runner — port the lens or drop the claim.`);
    const terminal = template.tasks.find((task) => task.id === template.terminal_task);
    for (const lens of opencodeLenses)
      assert.ok((terminal.depends_on ?? []).includes(lens),
        `${opencode}: terminal task "${template.terminal_task}" must depend on the "${lens}" lens, or its findings never reach the verdict`);
  });
}

test('assess verifies each lens as it lands rather than behind a barrier', () => {
  const body = read('adapters/claude/workflows/assess-work-item.js');
  assert.ok(/await pipeline\(\s*\n\s*LENSES,/.test(body),
    'assess-work-item.js: pipeline the lenses into their own verification — a parallel() barrier makes every lens wait for the slowest before any refutation starts');
  for (const marker of ["phase: 'Critique'", "phase: 'Verify'"])
    assert.ok(body.includes(marker),
      `assess-work-item.js: agents inside a pipeline need an explicit ${marker} — phase() is global state the stages race on`);
});

test('the pipeline launcher exists, is executable, and covers both engines', () => {
  const abs = join(root, 'scripts/pipeline.sh');
  assert.ok(existsSync(abs), 'missing scripts/pipeline.sh');
  assert.ok(statSync(abs).mode & 0o111, 'scripts/pipeline.sh must be executable');
  const body = read('scripts/pipeline.sh');
  for (const marker of ['--engine claude|opencode', '--interactive', 'claude -p', 'runner.mjs', 'assess', 'deliver', 'shakedown'])
    assert.ok(body.includes(marker), `pipeline.sh missing "${marker}"`);
});

test('pr-shakedown.yml is a real key-gated workflow, dispatch-only by default', () => {
  const body = read('skills/developer/shakedown/pr-shakedown.yml');
  for (const marker of ['workflow_dispatch', 'ANTHROPIC_API_KEY', 'shakedown-pr', 'github-code-quality'])
    assert.ok(body.includes(marker), `pr-shakedown.yml missing "${marker}"`);
  assert.ok(!/^on:\s*\n\s+pull_request:/m.test(body),
    'pr-shakedown.yml must ship dispatch-only; enabling pull_request triggers is the adopting repo\'s explicit choice');
});
