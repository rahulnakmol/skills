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
const VERBS = ['read', 'write-repo', 'write-tracker', 'publish', 'write-host', 'execute'];
const SCOPES = ['owns', 'guest'];

const DRAFTS = walk('drafts', (p) => p.endsWith('SKILL.md')).map((p) => {
  const parts = p.split('/');
  return { path: p, dir: parts.slice(0, -1).join('/'), group: parts[1], name: parts[parts.length - 2] };
});

const PROMOTED = walk('skills', (p) => p.endsWith('SKILL.md')).map((p) => {
  const parts = p.split('/');
  return { path: p, dir: parts.slice(0, -1).join('/'), group: parts[1], name: parts[parts.length - 2] };
});

// Promotion moves a skill out of drafts/ but must not move it out of the
// contract. A skill that carried a contract block as a draft keeps being held
// to it once shipped, so the checks below run over both trees; otherwise the
// enforcement this file exists for would evaporate at the moment it matters.
const PROMOTED_UNDER_CONTRACT = PROMOTED.filter((s) => /```yaml\ncontract:/.test(read(s.path)));
const UNDER_CONTRACT = [...DRAFTS, ...PROMOTED_UNDER_CONTRACT];

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

test('any draft sits under one of the six groups', () => {
  // An empty drafts tree is a legitimate state: it means every ported
  // capability has been promoted. The earlier form required at least one draft
  // to exist, which would have failed the moment the last one shipped —
  // punishing the completion of the work it was written to guard.
  for (const skill of DRAFTS) {
    assert.ok(
      GROUPS.includes(skill.group),
      `${skill.path}: group "${skill.group}" is not one of the six groups`,
    );
  }
});

test('every skill under contract carries a well-formed contract block', () => {
  for (const skill of UNDER_CONTRACT) {
    const contract = parseContract(read(skill.path));
    assert.ok(contract, `${skill.path}: missing a \`\`\`yaml contract:\`\`\` block (see skills/core/TRACE.md)`);
    assert.ok(!contract.malformed, `${skill.path}: unparseable contract line: ${contract.malformed}`);
    for (const key of ['invocation', 'thesis', 'verbs', 'scope', 'trace']) {
      assert.ok(contract[key], `${skill.path}: contract is missing "${key}"`);
    }
    assert.deepEqual(
      Object.keys(contract).sort(),
      ['invocation', 'scope', 'thesis', 'trace', 'verbs'],
      `${skill.path}: contract carries keys beyond the five TRACE.md defines`,
    );
  }
});

test('every skill under contract declares which limb of the thesis test it satisfies', () => {
  // The capability gate. A skill that only executes routine work cannot name a
  // limb honestly, and ADR 0008 says it ships as doctrine or not at all.
  for (const skill of UNDER_CONTRACT) {
    const contract = parseContract(read(skill.path));
    assert.ok(
      THESIS_LIMBS.includes(contract.thesis),
      `${skill.path}: thesis "${contract.thesis}" must be one of ${THESIS_LIMBS.join(', ')}`,
    );
  }
});

test('every skill under contract declares tool verbs from the closed set, and no more than it needs', () => {
  for (const skill of UNDER_CONTRACT) {
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

test('every skill under contract declares a trace kind and an invocation axis matching its title', () => {
  for (const skill of UNDER_CONTRACT) {
    const body = read(skill.path);
    const contract = parseContract(body);
    assert.match(
      contract.trace,
      /^[a-z][a-z0-9-]*$/,
      `${skill.path}: trace must be a lowercase kind, or "none"`,
    );
    assert.ok(
      SCOPES.includes(contract.scope),
      `${skill.path}: scope must be "owns" or "guest" (see skills/core/TRACE.md)`,
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

test('every skill under contract meets the repository skill contract', () => {
  for (const skill of UNDER_CONTRACT) {
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

test('every doctrine sibling a skill under contract ships is reachable from its SKILL.md', () => {
  // The context compiler layer: a document nothing points at is never loaded, and
  // a skill that loads everything unconditionally has no progressive disclosure.
  for (const skill of UNDER_CONTRACT) {
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

test('every doctrine document a skill points at exists', () => {
  // The reachability check above runs one way: a shipped sibling must be
  // pointed at. This is the other direction. A skill that promises doctrine it
  // never ships sends the reader to a file that is not there, and nothing
  // noticed until someone followed the pointer by hand.
  const CORE_DOCTRINE = new Set(readdirSync(join(root, 'skills/core')).filter((f) => f.endsWith('.md')));
  // Files a skill writes at run time, or repository files it authors, are named
  // as outputs rather than as doctrine it ships. PROFILE.md is the brand
  // profile exhibit derives and writes beside a brand that lacks one.
  const AUTHORED = new Set(['AGENTS.md', 'CLAUDE.md', 'PROGRESS.md', 'EXERCISES.md', 'SOLUTIONS.md', 'GATES.md', 'TRACE.md', 'README.md', 'STORYBOARD.md', 'PROFILE.md']);
  const dangling = [];
  for (const skill of PROMOTED) {
    const body = read(skill.path);
    const group = join(root, 'skills', skill.group);
    for (const ref of new Set((body.match(/`[A-Z][A-Za-z0-9-]*\.md`/g) ?? []).map((m) => m.slice(1, -1)))) {
      if (AUTHORED.has(ref) || CORE_DOCTRINE.has(ref)) continue;
      if (existsSync(join(root, skill.dir, ref))) continue;
      if (existsSync(join(group, ref))) continue;
      dangling.push(`${skill.path} points at ${ref}, which exists nowhere`);
    }
  }
  assert.deepEqual(dangling, [], dangling.join('\n'));
});

test('a declared trace kind comes with the means to record it', () => {
  // wait-what declared `trace: repitch` while holding only [read], and triage
  // declared a kind while holding no repository write. A trace lives at
  // .grit/<scope>/TRACE.md, so a scope owner needs write-repo to produce one.
  // Both skills resolved it correctly in prose — the owning session records the
  // entry — but the contract had no way to say so, and nothing noticed.
  const wrong = [];
  for (const skill of UNDER_CONTRACT) {
    const contract = parseContract(read(skill.path));
    if (contract.trace === 'none') continue;
    const verbs = verbList(contract.verbs) ?? [];
    if (contract.scope === 'owns' && !verbs.includes('write-repo')) {
      wrong.push(`${skill.path}: owns its scope and declares trace "${contract.trace}", but cannot write one without write-repo`);
    }
  }
  assert.deepEqual(wrong, [], wrong.join('\n'));
});

test('a guest that reports a trace says so where a reader will see it', () => {
  // A guest contributes an entry the owning session records. That is a claim
  // about who writes, so the skill states it rather than leaving a reader to
  // infer it from the contract block alone.
  const silent = [];
  for (const skill of UNDER_CONTRACT) {
    const body = read(skill.path);
    const contract = parseContract(body);
    if (contract.scope !== 'guest' || contract.trace === 'none') continue;
    if (!/session that owns|owning session|the caller records|for the session to append|reports the trace/i.test(body)) {
      silent.push(`${skill.path}: is a guest declaring trace "${contract.trace}" but never says the owning session records it`);
    }
  }
  assert.deepEqual(silent, [], silent.join('\n'));
});

test('a declared trace kind has a step that writes or reports one', () => {
  // The replacement for the dry-run fixture check ADR 0008 promised and never
  // built. A fixture per skill would mean executing fifty skills, most of which
  // need a model and a real repository, which is why the promise went unkept
  // through a release. This is the part that can be checked statically: a
  // contract key with no corresponding step is a declaration nothing honors,
  // and eight skills carried exactly that when the check was first written.
  const silent = [];
  for (const skill of UNDER_CONTRACT) {
    const body = read(skill.path);
    const contract = parseContract(body);
    if (contract.trace === 'none') continue;
    const procedure = body.slice(body.indexOf('## Procedure'), body.indexOf('## Stop conditions'));
    if (!/trace/i.test(procedure)) {
      silent.push(`${skill.path}: declares trace "${contract.trace}" but no step writes or reports one`);
    }
  }
  assert.deepEqual(silent, [], silent.join('\n'));
});

test('the two outsized verbs are declared with their boundary stated', () => {
  // write-host and execute name the capabilities the first four cannot express:
  // a write no review sees and no revert undoes, and a command the skill did not
  // author. Both are the kind of exposure a reader must not have to infer, so a
  // skill holding either says where the boundary sits, in its own words.
  const silent = [];
  for (const skill of UNDER_CONTRACT) {
    const body = read(skill.path);
    const verbs = verbList(parseContract(body).verbs) ?? [];
    if (verbs.includes('write-host') && !/outside version control|outside the repository|not part of what|reviewed by nobody/i.test(body)) {
      silent.push(`${skill.path}: declares write-host but never says the write sits outside version control`);
    }
    if (verbs.includes('execute') && !/approv/i.test(body)) {
      silent.push(`${skill.path}: declares execute but never names the approval a command passes before it runs`);
    }
  }
  assert.deepEqual(silent, [], silent.join('\n'));
});

test('execute stays narrow: only a skill running commands it did not author holds it', () => {
  // Widened to mean "runs anything" the verb would mark almost every skill and
  // discriminate nothing, so its scope is checked rather than trusted: a holder
  // must run a command that reaches it as data.
  for (const skill of UNDER_CONTRACT) {
    const body = read(skill.path);
    const verbs = verbList(parseContract(body).verbs) ?? [];
    if (!verbs.includes('execute')) continue;
    assert.match(body, /did not author|the ledger supplies|supplied by|arrives as data/i,
      `${skill.path}: declares execute but never says the command comes from data rather than from its own author`);
  }
});

// A charter names an adapter and defers execution detail to it. The adapter
// carries a `permission` block the tool enforces, which is narrower than the
// contract's verbs. The two are compared in one direction only, because only
// one direction is dangerous: an adapter granting a capability the contract
// never declared means the contract describes something other than what runs.
// An adapter narrower than its contract is a deliberate per-tool tightening.
function adapterGrants(body) {
  const block = body.match(/^permission:\n([\s\S]*?)^---$/m)?.[1] ?? '';
  const section = (key) => {
    const m = block.match(new RegExp(`^  ${key}:\\n((?:    .*\\n)*)`, 'm'));
    return m ? m[1] : '';
  };
  return {
    edit: /:\s*allow\s*$/m.test(section('edit')),
    bash: /^\s*"\*":\s*allow\s*$/m.test(section('bash')),
    external: /^  external_directory:\s*allow\s*$/m.test(block),
  };
}

test('no adapter grants a capability its charter does not declare', () => {
  const undeclared = [];
  for (const skill of PROMOTED_UNDER_CONTRACT) {
    const body = read(skill.path);
    const named = body.match(/Load adapter:\s*`([^`]+)`/)?.[1];
    if (!named || !named.endsWith('.md')) continue;   // workflow templates carry no permission block
    if (!existsSync(join(root, named))) continue;
    const grants = adapterGrants(read(named));
    const verbs = verbList(parseContract(body).verbs) ?? [];
    if (grants.edit && !verbs.includes('write-repo')) {
      undeclared.push(`${skill.path}: ${named} permits edits, but the contract omits write-repo`);
    }
    if (grants.external && !verbs.includes('write-host')) {
      undeclared.push(`${skill.path}: ${named} permits writes outside the working directory, but the contract omits write-host`);
    }
    if (grants.bash && !verbs.includes('execute')) {
      undeclared.push(`${skill.path}: ${named} permits unbounded commands, but the contract omits execute`);
    }
  }
  assert.deepEqual(undeclared, [], undeclared.join('\n'));
});
