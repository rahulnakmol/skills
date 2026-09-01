import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from './lib.mjs';

// site/_data/chooser.json is generated (gitignored, same as site/_data/skills.json
// — see test/site/lib.mjs's own header on why this suite reads sources, not
// generated output, everywhere else). This file's whole subject IS that
// generator, so it regenerates the data itself at module load time, before
// any test below reads it — correct on a clean checkout, regardless of
// whether a prior build step already ran it.
const GEN = join(root, 'scripts/gen-chooser-data.mjs');
const DATA_PATH = join(root, 'site/_data/chooser.json');

const genResult = spawnSync(process.execPath, [GEN], { encoding: 'utf8', cwd: root });
if (genResult.status !== 0) {
  throw new Error(`scripts/gen-chooser-data.mjs failed during test setup:\n${genResult.stdout}${genResult.stderr}`);
}

const CHOOSER = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
const PLUGIN = JSON.parse(read('.claude-plugin/plugin.json'));
const MANIFEST_NAMES = new Set(PLUGIN.skills.map((p) => p.split('/').pop()));
const CHOOSER_HTML = read('site/_includes/chooser.html');

test('gen-chooser-data.mjs --check reports no drift right after a fresh generation', () => {
  const result = spawnSync(process.execPath, [GEN, '--check'], { encoding: 'utf8', cwd: root });
  assert.equal(result.status, 0, `gen-chooser-data.mjs --check found drift:\n${result.stdout}${result.stderr}`);
});

test('chooser.json is a small decision tree: 3 top-level branches, a modest leaf count', () => {
  assert.ok(Array.isArray(CHOOSER.tree) && CHOOSER.tree.length === 3,
    `expected exactly 3 top-level branches ("what are you doing"), found ${CHOOSER.tree?.length}`);
  assert.ok(Array.isArray(CHOOSER.leaves) && CHOOSER.leaves.length >= 10 && CHOOSER.leaves.length <= 25,
    `expected a small tree (10-25 leaves), found ${CHOOSER.leaves?.length}`);
});

test('altitude (level 2) is skipped where it does not apply', () => {
  // "Checking finished work" has no epic/feature/story distinction of its
  // own — its leaves go straight from level 1 to level 3 (path length 2),
  // while the other two branches carry an altitude step (path length 3).
  const byLength = new Map();
  for (const leaf of CHOOSER.leaves) {
    byLength.set(leaf.path.length, (byLength.get(leaf.path.length) ?? 0) + 1);
  }
  assert.ok(byLength.has(2), 'expected at least one leaf with no altitude step (path length 2)');
  assert.ok(byLength.has(3), 'expected at least one leaf with an altitude step (path length 3)');
});

test('every chooser leaf names a skill that exists in .claude-plugin/plugin.json', () => {
  const missing = CHOOSER.leaves.filter((leaf) => !MANIFEST_NAMES.has(leaf.skill)).map((leaf) => leaf.skill);
  assert.deepEqual(missing, [], `chooser leaf(s) name skill(s) absent from the manifest: ${missing.join(', ')}`);
});

test('every chooser leaf href has the /<skill>/ shape', () => {
  for (const leaf of CHOOSER.leaves) {
    assert.equal(leaf.href, `/${leaf.skill}/`, `leaf "${leaf.skill}" has an unexpected href "${leaf.href}"`);
    assert.match(leaf.href, /^\/[a-z0-9-]+\/$/, `leaf "${leaf.skill}" href "${leaf.href}" is not shaped like a skill permalink`);
  }
});

test('every leaf carries a non-empty oneLiner sourced from the skill catalog', () => {
  for (const leaf of CHOOSER.leaves) {
    assert.ok(leaf.oneLiner && leaf.oneLiner.length > 0, `leaf "${leaf.skill}" has an empty oneLiner`);
    assert.ok(!/^(User|Model)-invoked/i.test(leaf.oneLiner),
      `leaf "${leaf.skill}" oneLiner still carries the invocation-axis prefix: "${leaf.oneLiner}"`);
  }
});

test('chooser.html carries the Alpine no-flash idiom lens.html uses (x-cloak + x-show)', () => {
  assert.match(CHOOSER_HTML, /x-cloak/, "chooser.html must carry x-cloak on the interactive widget, matching lens.html's pattern");
  assert.match(CHOOSER_HTML, /x-show="!ready"/, 'chooser.html must show the static tree by default (x-show="!ready")');
  assert.match(CHOOSER_HTML, /x-show="ready"/, 'chooser.html must reveal the interactive widget only once Alpine is ready');
});

test('chooser.html carries the "not sure" microcopy, linking both ask-fde and ask-pm', () => {
  assert.match(CHOOSER_HTML, /Not sure\? Routing undecided questions is a skill here too/,
    'chooser.html must carry the required microcopy');
  assert.match(CHOOSER_HTML, /href="\{\{ '\/ask-fde\/' \| relative_url \}\}"/, 'chooser.html must link ask-fde');
  assert.match(CHOOSER_HTML, /href="\{\{ '\/ask-pm\/' \| relative_url \}\}"/, 'chooser.html must link ask-pm');
});

// chooser.html is included from site/index.html (no markdown pass) and from
// site/how-it-fits.md (kramdown). A markdown converter turns any line
// indented four or more spaces into an indented code block, which renders the
// whole widget as escaped text on the .md page — a silent, page-level break
// that no substring assertion catches, because the escaped markup still
// contains every class name. Flush-left markup is what prevents it, so the
// invariant is pinned here rather than left to reviewer memory.
test('chooser.html stays flush left, so the markdown page cannot code-block it', () => {
  const offenders = CHOOSER_HTML.split('\n')
    .map((line, i) => ({ n: i + 1, line }))
    .filter(({ line }) => /^ {4}/.test(line));
  assert.deepEqual(offenders.map((o) => o.n), [],
    `chooser.html line(s) indented 4+ spaces would become an indented code block on site/how-it-fits.md: ${
      offenders.map((o) => `${o.n}: ${JSON.stringify(o.line.slice(0, 60))}`).join(', ')}`);
});

// "Renders the tree": chooser.html's static fallback loops over
// site.data.chooser.tree field-for-field (proven below by checking it
// references every field a leaf carries), and the generator (walk()) builds
// that tree and the flat leaves array from the exact same pass — so walking
// chooser.html's own loop shape over CHOOSER.tree must reproduce
// CHOOSER.leaves exactly. Together this proves every leaf skill the
// generator produced is one the include actually renders, without standing
// up a full Liquid engine this suite carries no dependency for.
test('chooser.html renders the tree: its loop fields match every leaf, in order', () => {
  assert.match(CHOOSER_HTML, /site\.data\.chooser\.tree/, 'chooser.html must loop over site.data.chooser.tree');
  for (const field of ['n1.label', 'n2.skill', 'n2.oneLiner', 'n3.skill', 'n3.oneLiner']) {
    assert.ok(CHOOSER_HTML.includes(field), `chooser.html must reference "${field}" while walking the tree`);
  }
  const walked = [];
  for (const n1 of CHOOSER.tree) {
    for (const n2 of n1.children) {
      if (n2.skill) walked.push(n2.skill);
      else for (const n3 of n2.children) walked.push(n3.skill);
    }
  }
  assert.deepEqual(walked, CHOOSER.leaves.map((l) => l.skill),
    'chooser.json tree and flat leaves array must name the same skills in the same order');
});

// --- mutation self-test: the same shape as site-coverage.test.mjs's own v2
// fixture mutations — an in-memory copy is broken, the failure is named,
// and the real data (used above) is never touched. ---------------------------
function assertLeavesValid(leaves, manifestNames) {
  for (const leaf of leaves) {
    if (!manifestNames.has(leaf.skill)) throw new Error(`chooser leaf names unknown skill "${leaf.skill}"`);
    if (leaf.href !== `/${leaf.skill}/`) throw new Error(`chooser leaf "${leaf.skill}" has a malformed href "${leaf.href}"`);
  }
}

test('assertLeavesValid: the real, generated tree passes', () => {
  assert.doesNotThrow(() => assertLeavesValid(CHOOSER.leaves, MANIFEST_NAMES));
});

test('mutation: a leaf renamed to an unknown skill is a named failure', () => {
  const mutated = CHOOSER.leaves.map((l, i) => (i === 0 ? { ...l, skill: 'not-a-real-skill' } : l));
  assert.throws(() => assertLeavesValid(mutated, MANIFEST_NAMES), /unknown skill "not-a-real-skill"/);
});

test('mutation: a leaf with a malformed href is a named failure', () => {
  const mutated = CHOOSER.leaves.map((l, i) => (i === 0 ? { ...l, href: '/wrong-path/' } : l));
  assert.throws(() => assertLeavesValid(mutated, MANIFEST_NAMES), /malformed href/);
});
