import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { root, read, walk, frontmatter } from '../helpers.mjs';

// The Amp adapter (ADR 0010) ships no copy of any skill. It adds three kinds of
// files: generated doctrine wrappers (byte-identical copies of the group
// doctrine files, because `amp skill add` copies only directories that hold a
// SKILL.md), one hand-written router skill, and install scripts that point Amp
// at the one home of each skill under skills/. These tests keep that promise.

const AMP_SKILLS = 'adapters/amp/skills';
const ROUTER = 'tqn';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8' });
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
}

function groups() {
  return readdirSync(join(root, 'skills')).filter((g) => existsSync(join(root, 'skills', g, 'README.md')) ||
    walk(`skills/${g}`, (p) => p.endsWith('SKILL.md')).length > 0);
}

function doctrineFiles(group) {
  return readdirSync(join(root, 'skills', group)).filter((f) => f.endsWith('.md') && f !== 'README.md');
}

function installPlan(args) {
  const r = run('bash', ['scripts/install-amp.sh', '--print', '--target', '/amp-plan', ...args]);
  assert.equal(r.code, 0, `install-amp.sh --print ${args.join(' ')} failed:\n${r.out}`);
  return r.out.split('\n').filter(Boolean).map((l) => l.match(/^amp skill add (\S+)/)[1].replace(`${root}/`, ''));
}

test('generated doctrine wrappers match their sources and carry no stale files', () => {
  const r = run('node', ['scripts/gen-amp-doctrine.mjs', '--check']);
  assert.equal(r.code, 0, r.out);
  for (const group of groups()) {
    const files = doctrineFiles(group);
    const wrapper = join(AMP_SKILLS, `${group}-doctrine`);
    if (files.length === 0) {
      assert.ok(!existsSync(join(root, wrapper)), `${wrapper} exists but skills/${group} has no doctrine files`);
      continue;
    }
    assert.ok(existsSync(join(root, wrapper, 'SKILL.md')), `${wrapper}/SKILL.md missing`);
    for (const f of files) {
      assert.equal(readFileSync(join(root, wrapper, f), 'utf8'), read(`skills/${group}/${f}`),
        `${wrapper}/${f} must be byte-identical to skills/${group}/${f}`);
    }
  }
});

// A plain-scalar YAML value may not contain ": " or " #", and may not start
// with an indicator character; Amp silently drops a skill whose frontmatter
// fails to parse. This check covers the one-line scalars the wrappers and the
// router use without adding a YAML dependency, which CI does not install.
function plainScalarProblem(value) {
  if (/^["']/.test(value)) return null;
  if (/^[-?:,\[\]{}#&*!|>'"%@`]/.test(value)) return 'starts with a YAML indicator character';
  if (/: /.test(value) || /\s#/.test(value)) return 'contains ": " or " #", which ends a plain scalar';
  return null;
}

function frontmatterFields(body) {
  const fields = {};
  for (const line of frontmatter(body).split('\n')) {
    const m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (m) fields[m[1]] = m[2];
  }
  return fields;
}

test('every Amp-only skill is a valid skill: name matches its directory, frontmatter parses, body stays short', () => {
  const dirs = readdirSync(join(root, AMP_SKILLS));
  assert.ok(dirs.includes(ROUTER), `${AMP_SKILLS}/${ROUTER} must exist`);
  for (const dir of dirs) {
    const body = read(`${AMP_SKILLS}/${dir}/SKILL.md`);
    const fm = frontmatterFields(body);
    assert.equal(fm.name, dir, `${dir}: frontmatter name must equal the directory name`);
    assert.equal(plainScalarProblem(fm.description ?? ''), null,
      `${dir}: description ${plainScalarProblem(fm.description ?? '')}; Amp would drop the skill`);
    assert.ok(typeof fm.description === 'string' && fm.description.split(/\s+/).length >= 12,
      `${dir}: description must say when to use the skill`);
    assert.ok(body.split('\n').length <= 120, `${dir}/SKILL.md must stay within 120 lines`);
    assert.ok(/\((model|user)-invoked\)/.test(body), `${dir}/SKILL.md must state its invocation axis`);
  }
});

test('the adapter holds no copy of a promoted skill', () => {
  const promoted = new Set(walk('skills', (p) => p.endsWith('SKILL.md')).map((p) => p.split('/')[2]));
  for (const dir of readdirSync(join(root, AMP_SKILLS)))
    assert.ok(!promoted.has(dir), `${AMP_SKILLS}/${dir} duplicates skills/*/${dir}; Amp installs from the source path`);
});

test('a group install brings the group, core, both doctrine wrappers, and the router', () => {
  for (const group of groups()) {
    const plan = installPlan(['--group', group]);
    assert.ok(plan.includes(`skills/${group}`), `${group}: plan must install skills/${group}`);
    assert.ok(plan.includes('skills/core'), `${group}: plan must install skills/core`);
    assert.ok(plan.includes(`${AMP_SKILLS}/core-doctrine`), `${group}: plan must install core-doctrine`);
    if (doctrineFiles(group).length > 0)
      assert.ok(plan.includes(`${AMP_SKILLS}/${group}-doctrine`), `${group}: plan must install ${group}-doctrine`);
    assert.ok(plan.includes(`${AMP_SKILLS}/${ROUTER}`), `${group}: plan must install the router`);
    for (const p of plan) assert.ok(existsSync(join(root, p, p.startsWith('skills/') ? 'README.md' : 'SKILL.md')) ||
      existsSync(join(root, p)), `${group}: plan source ${p} does not exist`);
  }
});

test('a single-skill install resolves requires: and the everything install covers every group', () => {
  const withRequires = walk('skills', (p) => p.endsWith('SKILL.md'))
    .map((p) => ({ p, req: frontmatter(read(p)).match(/^requires:\s*(.+)$/m) }))
    .filter((x) => x.req);
  assert.ok(withRequires.length > 0, 'expected at least one skill with requires:');
  for (const { p, req } of withRequires) {
    const [, group, skill] = p.split('/');
    const plan = installPlan(['--skill', skill]);
    assert.ok(plan.includes(`skills/${group}/${skill}`), `${skill}: plan must install the skill itself`);
    for (const dep of req[1].split(',').map((s) => s.trim()).filter(Boolean))
      assert.ok(plan.some((x) => x.endsWith(`/${dep}`)), `${skill}: plan must include required skill ${dep}`);
    assert.ok(plan.includes(`${AMP_SKILLS}/${ROUTER}`), `${skill}: plan must install the router`);
  }
  const all = installPlan([]);
  for (const group of groups()) assert.ok(all.includes(`skills/${group}`), `everything: missing skills/${group}`);
});

// Skills cite core doctrine as `core/<FILE>.md`. After an Amp install that path
// does not exist; the core-doctrine wrapper must carry every file so cited.
// Bare names such as `GATES.md` are not checked here: the same name can be a
// group doctrine file in one skill and a file the skill writes in another.
test('every core doctrine citation in a skill resolves inside an Amp install', () => {
  const core = new Set(doctrineFiles('core'));
  let cited = 0;
  for (const p of walk('skills', (f) => f.endsWith('SKILL.md'))) {
    for (const [, file] of read(p).matchAll(/\bcore\/([A-Z][A-Z-]+\.md)\b/g)) {
      cited += 1;
      assert.ok(core.has(file), `${p} cites core/${file}, which core-doctrine does not carry`);
    }
  }
  assert.ok(cited > 0, 'expected at least one core/<FILE>.md citation in the catalog');
});

test('the router names every doctrine wrapper and the settings that keep commits free of attribution', () => {
  const router = read(`${AMP_SKILLS}/${ROUTER}/SKILL.md`);
  for (const group of groups()) if (doctrineFiles(group).length > 0)
    assert.ok(router.includes(`${group}-doctrine`), `router must name ${group}-doctrine`);
  for (const key of ['amp.git.commit.coauthor.enabled', 'amp.git.commit.ampThread.enabled'])
    assert.ok(router.includes(key), `router must name ${key}`);
});
