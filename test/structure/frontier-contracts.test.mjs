import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { root, read, walk, frontmatter } from '../helpers.mjs';

// ADR 0008: capabilities ported from the reference set land in `drafts/` and
// carry a contract block binding them to the trace spine in skills/core/TRACE.md.
// These checks are the capability gate: a draft that does not declare which limb
// of the thesis test it satisfies, which tool verbs it may use, and what it
// writes to the trace cannot be promoted, whatever its prose says.

const GROUPS = ['core', 'developer', 'pm', 'branding', 'writing', 'productivity'];
const THESIS_LIMBS = ['gate', 'evidence', 'scaffold'];
const VERBS = ['read', 'write-repo', 'write-tracker', 'publish'];

const DRAFTS = walk('drafts', (p) => p.endsWith('SKILL.md')).map((p) => {
  const parts = p.split('/');
  return { path: p, dir: parts.slice(0, -1).join('/'), group: parts[1], name: parts[parts.length - 2] };
});

const PROMOTED = walk('skills', (p) => p.endsWith('SKILL.md')).map((p) => {
  const parts = p.split('/');
  return { path: p, dir: parts.slice(0, -1).join('/'), group: parts[1], name: parts[parts.length - 2] };
});

// The contract is a fenced YAML block of four fixed keys. It is parsed strictly:
// a block that does not match this shape is a failure, not a warning, because a
// contract the harness cannot read is a contract nothing enforces.
function parseContract(body) {
  const block = body.match(/```yaml\ncontract:\n([\s\S]*?)```/);
  if (!block) return null;
  const lines = block[1].split('\n').filter((l) => l.trim());
  const out = {};
  for (const line of lines) {
    const m = line.match(/^ {2}([a-z]+):\s*(.+?)\s*(?:#.*)?$/);
    if (!m) return { malformed: line.trim() };
    out[m[1]] = m[2].trim();
  }
  return out;
}

function verbList(raw) {
  const m = raw?.match(/^\[(.*)\]$/);
  if (!m) return null;
  return m[1].split(',').map((v) => v.trim()).filter(Boolean);
}

test('drafts exist and sit under one of the six groups', () => {
  assert.ok(DRAFTS.length > 0, 'expected ported capabilities under drafts/');
  for (const skill of DRAFTS) {
    assert.ok(
      GROUPS.includes(skill.group),
      `${skill.path}: group "${skill.group}" is not one of the six groups`,
    );
  }
});

test('every draft carries a well-formed contract block', () => {
  for (const skill of DRAFTS) {
    const contract = parseContract(read(skill.path));
    assert.ok(contract, `${skill.path}: missing a \`\`\`yaml contract:\`\`\` block (see skills/core/TRACE.md)`);
    assert.ok(!contract.malformed, `${skill.path}: unparseable contract line: ${contract.malformed}`);
    for (const key of ['invocation', 'thesis', 'verbs', 'trace']) {
      assert.ok(contract[key], `${skill.path}: contract is missing "${key}"`);
    }
    assert.deepEqual(
      Object.keys(contract).sort(),
      ['invocation', 'thesis', 'trace', 'verbs'],
      `${skill.path}: contract carries keys beyond the four TRACE.md defines`,
    );
  }
});

test('every draft declares which limb of the thesis test it satisfies', () => {
  // The capability gate. A skill that only executes routine work cannot name a
  // limb honestly, and ADR 0008 says it ships as doctrine or not at all.
  for (const skill of DRAFTS) {
    const contract = parseContract(read(skill.path));
    assert.ok(
      THESIS_LIMBS.includes(contract.thesis),
      `${skill.path}: thesis "${contract.thesis}" must be one of ${THESIS_LIMBS.join(', ')}`,
    );
  }
});

test('every draft declares tool verbs from the closed set, and no more than it needs', () => {
  for (const skill of DRAFTS) {
    const contract = parseContract(read(skill.path));
    const verbs = verbList(contract.verbs);
    assert.ok(verbs, `${skill.path}: verbs must be a bracketed list, e.g. [read, write-repo]`);
    assert.ok(verbs.length > 0, `${skill.path}: verbs is empty`);
    for (const verb of verbs) {
      assert.ok(VERBS.includes(verb), `${skill.path}: unknown verb "${verb}" (allowed: ${VERBS.join(', ')})`);
    }
    assert.equal(new Set(verbs).size, verbs.length, `${skill.path}: duplicate verb in ${contract.verbs}`);
    // `publish` sends work outward and is the one verb a skill cannot hold quietly.
    if (verbs.includes('publish')) {
      assert.match(
        read(skill.path),
        /human|approve|sign-off|signs|review/i,
        `${skill.path}: declares publish but never names the human approval that precedes sending anything outward`,
      );
    }
  }
});

test('every draft declares a trace kind and the invocation axis matches its title', () => {
  for (const skill of DRAFTS) {
    const body = read(skill.path);
    const contract = parseContract(body);
    assert.match(
      contract.trace,
      /^[a-z][a-z0-9-]*$/,
      `${skill.path}: trace kind "${contract.trace}" must be a lowercase slug`,
    );
    assert.ok(
      ['model', 'user'].includes(contract.invocation),
      `${skill.path}: invocation must be "model" or "user"`,
    );
    // .agents/invocation.md: a skill is user-invoked or model-invoked, never both.
    const title = body.split('\n').find((l) => l.startsWith('# '));
    const expected = `(${contract.invocation}-invoked)`;
    assert.ok(
      title.includes(expected),
      `${skill.path}: title "${title}" disagrees with contract invocation ${contract.invocation}`,
    );
    const other = contract.invocation === 'model' ? '(user-invoked)' : '(model-invoked)';
    assert.ok(!title.includes(other), `${skill.path}: title declares both invocation axes`);
  }
});

test('drafts follow the same skill contract promoted skills do', () => {
  for (const skill of DRAFTS) {
    const body = read(skill.path);
    const lines = body.split('\n');
    assert.ok(lines.length <= 120, `${skill.path}: ${lines.length} lines (max 120)`);
    const fm = frontmatter(body);
    const fmName = fm.match(/name:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim();
    assert.equal(fmName, skill.name, `${skill.path}: frontmatter.name must match the directory basename`);
    assert.ok(
      /description:\s*\S/.test(fm),
      `${skill.path}: missing a description, which is the only text a model sees before invoking`,
    );
    assert.ok(
      !/\b(gpt-[0-9]|claude-[a-z0-9-]+|gemini-[0-9])/i.test(body),
      `${skill.path}: model IDs belong in the registry, never in a SKILL.md`,
    );
    for (const section of ['## Contract', '## When to invoke', '## Procedure', '## Stop conditions']) {
      assert.ok(body.includes(section), `${skill.path}: missing the ${section} section`);
    }
  }
});

test('draft basenames are unique against each other and against every promoted skill', () => {
  // A draft that collides with a promoted skill cannot be promoted later without a
  // rename, and installation targets are one flat namespace in every supported tool.
  const seen = new Map(PROMOTED.map((s) => [s.name, s.dir]));
  for (const skill of DRAFTS) {
    const prior = seen.get(skill.name);
    assert.ok(
      prior === undefined,
      `duplicate skill basename "${skill.name}": ${prior} and ${skill.dir}`,
    );
    seen.set(skill.name, skill.dir);
  }
});

test('drafts respect group independence: any group may reference core, none another group', () => {
  const BACKTICKED = /`([a-z0-9][a-z0-9-]*)\/([A-Za-z0-9._/-]+\.(?:md|yml|mjs|json|sh))`/g;
  const REPO_PATH = /(?:^|[^A-Za-z0-9/._-])(?:skills|drafts)\/([a-z][a-z-]*)\//g;
  const names = new Map([...PROMOTED, ...DRAFTS].map((s) => [s.name, s.group]));
  const violations = [];
  for (const relPath of walk('drafts', (p) => p.endsWith('.md'))) {
    const ownGroup = relPath.split('/')[1];
    const body = read(relPath);
    for (const pattern of [BACKTICKED, REPO_PATH]) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(body)) !== null) {
        const head = match[1];
        const target = GROUPS.includes(head) ? head : names.get(head);
        if (!target || target === ownGroup) continue;
        if (target === 'core' && ownGroup !== 'core') continue;
        violations.push(`${relPath} (${ownGroup}) references the ${target} group: ${match[0].trim()}`);
      }
    }
  }
  assert.deepEqual(violations, [], 'ADR 0007 applies to drafts, which are promoted skills in waiting.\n' + violations.join('\n'));
});

test('every doctrine sibling a draft ships is reachable from its SKILL.md', () => {
  // The context compiler layer: a document nothing points at is never loaded, and
  // a skill that loads everything unconditionally has no progressive disclosure.
  for (const skill of DRAFTS) {
    const abs = join(root, skill.dir);
    const siblings = readdirSync(abs).filter(
      (e) => e.endsWith('.md') && e !== 'SKILL.md' && !statSync(join(abs, e)).isDirectory(),
    );
    if (siblings.length === 0) continue;
    const body = read(skill.path);
    for (const sibling of siblings) {
      assert.ok(
        body.includes(sibling),
        `${skill.path}: ships ${sibling} but never points at it, so nothing loads it`,
      );
    }
  }
});

test('drafts appear in neither the README nor the plugin manifest', () => {
  // CLAUDE.md: promoted only under skills/. A draft listed as shipped is a
  // capability claim the harness has not cleared.
  const readme = read('README.md');
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  for (const skill of DRAFTS) {
    assert.ok(
      !(plugin.skills ?? []).includes(skill.dir),
      `plugin.json lists ${skill.dir}, which is still a draft`,
    );
    assert.ok(!readme.includes(skill.dir), `README.md links ${skill.dir}, which is still a draft`);
  }
});

test('the trace spine exists and is the single state root drafts bind to', () => {
  assert.ok(existsSync(join(root, 'skills/core/TRACE.md')), 'missing skills/core/TRACE.md');
  const trace = read('skills/core/TRACE.md');
  assert.match(trace, /\.grit\/<scope>\/TRACE\.md/, 'TRACE.md must place the trace beside the gate ledger');
  assert.match(trace, /## The contract block/, 'TRACE.md must define the contract block drafts carry');
  for (const limb of THESIS_LIMBS) {
    assert.ok(trace.includes(`\`${limb}\``), `TRACE.md must define the "${limb}" thesis limb`);
  }
  for (const verb of VERBS) {
    assert.ok(trace.includes(`\`${verb}\``), `TRACE.md must define the "${verb}" verb`);
  }
});
