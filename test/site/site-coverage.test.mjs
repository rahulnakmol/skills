import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  root, read, listMarkdown, splitFrontmatter, scalar, lens, steps,
  h2Headings, h2Section, installBlockLines, skillGroups,
} from './lib.mjs';

// The page-per-skill guarantee: every manifest entry names a real site page.
// This is the test that makes "a new skill cannot merge without a page" true.
const PLUGIN = JSON.parse(read('.claude-plugin/plugin.json'));
const MANIFEST_SKILLS = PLUGIN.skills.map((p) => {
  const parts = p.split('/');
  return { ref: p, group: parts[1], name: parts[2] };
});

// Two body contracts, selected by whether a page's frontmatter carries a
// `scenario:` key. v1 is every page migrated before the site v2 rebuild;
// v2 is the shape a migrated page takes on. A page declares which contract
// it is written to simply by having (or not having) `scenario:` — there is
// no separate version flag to fall out of sync with the body itself.
const V1_H2S = ['What it does', 'How to call it', 'What good looks like', 'In practice', 'How it works'];
const V2_H2S = ['What it does', 'A working example', 'How to call it', 'What good looks like', 'In practice', 'How it works'];
const TOOL_NAMES = ['Claude Code', 'OpenCode', 'Cursor', 'Codex', 'GitHub Copilot'];
const [INSTALL_LINE_1, INSTALL_LINE_2] = installBlockLines();

// v1: today's checks, unchanged — the five H2s in order, a compare-grid, and
// the install-block lines copied verbatim from .agents/install-block.md.
function assertV1Body(pagePath, raw, body) {
  const found = h2Headings(body);
  assert.deepEqual(found, V1_H2S,
    `${pagePath}: expected exactly the five H2s in order, got: ${JSON.stringify(found)}`);

  assert.match(raw, /class="compare-grid"/, `${pagePath}: missing a compare-grid div`);

  assert.ok(raw.includes(INSTALL_LINE_1),
    `${pagePath}: missing install-block line 1 verbatim: ${JSON.stringify(INSTALL_LINE_1)}`);
  assert.ok(raw.includes(INSTALL_LINE_2),
    `${pagePath}: missing install-block line 2 verbatim: ${JSON.stringify(INSTALL_LINE_2)}`);
}

// v2: the six H2s in order; "What it does" carries a step-flow and a
// benefits list; "How to call it" names all five tools and links the Tools
// page. No install-block requirement — a v2 page is not a copy-paste target
// the way a v1 page is.
function assertV2Body(pagePath, raw, body) {
  const found = h2Headings(body);
  assert.deepEqual(found, V2_H2S,
    `${pagePath}: expected exactly the six v2 H2s in order, got: ${JSON.stringify(found)}`);

  const whatItDoes = h2Section(body, 'What it does');
  assert.ok(whatItDoes, `${pagePath}: "What it does" section not found`);
  assert.match(whatItDoes, /class="step-flow"/,
    `${pagePath}: "What it does" must contain a step-flow div`);
  assert.match(whatItDoes, /class="benefits"/,
    `${pagePath}: "What it does" must contain a benefits list`);

  const howToCallIt = h2Section(body, 'How to call it');
  assert.ok(howToCallIt, `${pagePath}: "How to call it" section not found`);
  for (const tool of TOOL_NAMES) {
    assert.ok(howToCallIt.includes(tool), `${pagePath}: "How to call it" must name ${tool}`);
  }
  assert.match(howToCallIt, /<a\b[^>]*href="[^"]*tools\/[^"]*"/,
    `${pagePath}: "How to call it" must link the Tools page`);
}

test('every plugin.json skill has ≥1 entries and the manifest was actually read', () => {
  assert.ok(MANIFEST_SKILLS.length >= 30, `expected the full manifest, found ${MANIFEST_SKILLS.length} entries`);
});

test('every manifest skill has a site/_skills/<name>.md page', () => {
  const missing = MANIFEST_SKILLS.filter((s) => !existsSync(join(root, 'site/_skills', `${s.name}.md`)));
  assert.deepEqual(missing.map((s) => s.ref), [],
    'a manifest entry with no page must fail here — a new skill cannot merge without a page');
});

test('no orphan page: every site/_skills page corresponds to a manifest skill', () => {
  const manifestNames = new Set(MANIFEST_SKILLS.map((s) => s.name));
  const orphans = listMarkdown('site/_skills').filter((f) => !manifestNames.has(f.replace(/\.md$/, '')));
  assert.deepEqual(orphans, [], `page(s) with no matching plugin.json entry: ${orphans.join(', ')}`);
});

for (const { ref, group, name } of MANIFEST_SKILLS) {
  const pagePath = `site/_skills/${name}.md`;
  const abs = join(root, pagePath);
  if (!existsSync(abs)) continue; // reported above; avoid a cascade of failures on the same defect

  test(`${pagePath}: frontmatter contract`, () => {
    const raw = read(pagePath);
    const { frontmatter, body } = splitFrontmatter(raw);
    assert.ok(frontmatter, `${pagePath}: no frontmatter block found`);

    assert.equal(scalar(frontmatter, 'layout'), 'skill', `${pagePath}: layout must be "skill"`);
    assert.equal(scalar(frontmatter, 'name'), name,
      `${pagePath}: frontmatter name must equal the file basename and manifest basename ("${name}")`);
    assert.equal(scalar(frontmatter, 'group'), group,
      `${pagePath}: frontmatter group must equal the manifest path's group segment ("${group}" from "${ref}")`);

    const invocation = scalar(frontmatter, 'invocation');
    assert.ok(invocation === 'user-invoked' || invocation === 'model-invoked',
      `${pagePath}: invocation must be exactly "user-invoked" or "model-invoked", got ${JSON.stringify(invocation)}`);

    const title = scalar(frontmatter, 'title');
    assert.ok(title && title.length > 0, `${pagePath}: title must be present and non-empty`);

    const description = scalar(frontmatter, 'description');
    assert.ok(description && description.length > 0, `${pagePath}: description must be present`);
    assert.ok(description.length >= 80 && description.length <= 200,
      `${pagePath}: description is ${description.length} chars, must be 80-200`);

    // The v2 body contract is selected by this key's presence; when present
    // it must actually carry a scenario, not just the bare key.
    const scenario = scalar(frontmatter, 'scenario');
    if (scenario !== null) {
      assert.ok(scenario.length > 0, `${pagePath}: scenario, when present, must be non-empty`);
    }

    const l = lens(frontmatter);
    assert.ok(l, `${pagePath}: no lens: block found`);
    for (const persona of ['novice', 'practitioner', 'leader', 'csuite']) {
      const p = l[persona];
      assert.ok(p, `${pagePath}: lens.${persona} is missing`);
      assert.ok(p.who && p.who.length > 0, `${pagePath}: lens.${persona}.who must be non-empty`);
      assert.ok(p.value && p.value.length > 0, `${pagePath}: lens.${persona}.value must be non-empty`);
    }

    // Journey cross-check, where declared.
    const journey = scalar(frontmatter, 'journey');
    if (journey !== null) {
      const journeyPath = `site/_journeys/${journey}.md`;
      assert.ok(existsSync(join(root, journeyPath)),
        `${pagePath}: journey "${journey}" names no file at ${journeyPath}`);
      const journeyFm = splitFrontmatter(read(journeyPath)).frontmatter;
      const journeyName = scalar(journeyFm, 'name');
      assert.equal(journeyName, journey,
        `${pagePath}: journey "${journey}" must equal the journey file's own name field ("${journeyName}")`);

      const jStep = Number(scalar(frontmatter, 'journey_step'));
      const jSteps = Number(scalar(frontmatter, 'journey_steps'));
      assert.ok(Number.isInteger(jStep) && jStep >= 1, `${pagePath}: journey_step must be a positive integer`);
      assert.ok(Number.isInteger(jSteps) && jSteps >= 1, `${pagePath}: journey_steps must be a positive integer`);
      assert.ok(jStep <= jSteps, `${pagePath}: journey_step (${jStep}) must be within journey_steps (${jSteps})`);

      const prev = scalar(frontmatter, 'journey_prev');
      if (prev !== null) {
        assert.ok(existsSync(join(root, 'site/_skills', `${prev}.md`)),
          `${pagePath}: journey_prev "${prev}" has no site/_skills page`);
      }
      const next = scalar(frontmatter, 'journey_next');
      if (next !== null) {
        assert.ok(existsSync(join(root, 'site/_skills', `${next}.md`)),
          `${pagePath}: journey_next "${next}" has no site/_skills page`);
      }
    }
  });

  const raw0 = read(pagePath);
  const scenario0 = scalar(splitFrontmatter(raw0).frontmatter, 'scenario');
  const isV2 = scenario0 !== null;

  test(`${pagePath}: body contract (${isV2 ? 'v2: H2 order, step-flow, benefits, tool coverage' : 'v1: H2 order, compare-grid, install block'})`, () => {
    const raw = read(pagePath);
    const { body } = splitFrontmatter(raw);
    if (isV2) {
      assertV2Body(pagePath, raw, body);
    } else {
      assertV1Body(pagePath, raw, body);
    }
  });
}

// --- groups ------------------------------------------------------------------

test('every group under skills/ has a site/_groups/<id>.md with layout: group', () => {
  const groups = skillGroups();
  assert.ok(groups.length === 6, `expected exactly six skill groups, found ${groups.length}: ${groups.join(', ')}`);
  for (const id of groups) {
    const groupPath = `site/_groups/${id}.md`;
    assert.ok(existsSync(join(root, groupPath)), `missing ${groupPath} for group "${id}"`);
    const fm = splitFrontmatter(read(groupPath)).frontmatter;
    assert.equal(scalar(fm, 'layout'), 'group', `${groupPath}: layout must be "group"`);
    const groupField = scalar(fm, 'group');
    assert.ok(groupField, `${groupPath}: missing a group: field`);
    assert.equal(groupField, id, `${groupPath}: group field ("${groupField}") must equal the directory id ("${id}")`);
  }
});

// --- journeys ------------------------------------------------------------------

const JOURNEY_FILES = listMarkdown('site/_journeys');

test('exactly two journeys exist, each with a steps list whose skills all have pages', () => {
  assert.equal(JOURNEY_FILES.length, 2, `expected exactly two journey files, found: ${JOURNEY_FILES.join(', ')}`);
  for (const file of JOURNEY_FILES) {
    const journeyPath = `site/_journeys/${file}`;
    const fm = splitFrontmatter(read(journeyPath)).frontmatter;
    assert.equal(scalar(fm, 'layout'), 'journey', `${journeyPath}: layout must be "journey"`);
    const stepList = steps(fm);
    assert.ok(stepList && stepList.length > 0, `${journeyPath}: steps list is missing or empty`);
    for (const step of stepList) {
      assert.ok(step.skill, `${journeyPath}: a step is missing a skill slug`);
      assert.ok(existsSync(join(root, 'site/_skills', `${step.skill}.md`)),
        `${journeyPath}: step skill "${step.skill}" has no site/_skills page`);
    }
  }
});

test('every skill page declaring a journey names one of the two journey files', () => {
  const journeyNames = new Set(JOURNEY_FILES.map((f) => f.replace(/\.md$/, '')));
  for (const { name } of MANIFEST_SKILLS) {
    const pagePath = `site/_skills/${name}.md`;
    if (!existsSync(join(root, pagePath))) continue;
    const fm = splitFrontmatter(read(pagePath)).frontmatter;
    const journey = scalar(fm, 'journey');
    if (journey === null) continue;
    assert.ok(journeyNames.has(journey),
      `${pagePath}: journey "${journey}" is not one of the two journey files (${[...journeyNames].join(', ')})`);
  }
});

// --- v2 contract self-test --------------------------------------------------
//
// None of the 34 skill pages carry `scenario:` yet — v2 migration is later
// waves' work — so nothing on disk exercises assertV2Body today. Without a
// fixture, that function would be dead code the harness never runs, and a
// bug in it would ship silently. This is that fixture: a synthetic, in-memory
// v2 body (never written to site/_skills, so it cannot trip the orphan-page
// or manifest checks above) checked once as a passing baseline and once per
// mutation, each mutation targeting exactly one assertion in assertV2Body.
const V2_FIXTURE_OK = `## What it does

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read</span><span class="step-text">Read the input.</span></div>
</div>

<ul class="benefits">
  <li>Saves time.</li>
  <li>Reduces risk.</li>
</ul>

## A working example

A worked example goes here.

## How to call it

<div class="tool-block"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block"><span class="tool-badge">Cursor</span></div>
<div class="tool-block"><span class="tool-badge">Codex</span></div>
<div class="tool-block"><span class="tool-badge">GitHub Copilot</span></div>

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for setup.

## What good looks like

Good looks like this.

## In practice

In practice, teams do this.

## How it works

Under the hood, it works like this.
`;

test('v2 fixture: a well-formed v2 body passes assertV2Body', () => {
  assert.doesNotThrow(() => assertV2Body('fixture', V2_FIXTURE_OK, V2_FIXTURE_OK));
});

test('v2 fixture mutation: wrong H2 order/text is a named failure', () => {
  const broken = V2_FIXTURE_OK.replace('## A working example', '## A broken example');
  assert.throws(() => assertV2Body('fixture', broken, broken),
    /expected exactly the six v2 H2s in order/);
});

test('v2 fixture mutation: missing step-flow div is a named failure', () => {
  const broken = V2_FIXTURE_OK.replace('class="step-flow"', 'class="not-step-flow"');
  assert.throws(() => assertV2Body('fixture', broken, broken),
    /must contain a step-flow div/);
});

test('v2 fixture mutation: missing benefits list is a named failure', () => {
  const broken = V2_FIXTURE_OK.replace('class="benefits"', 'class="not-benefits"');
  assert.throws(() => assertV2Body('fixture', broken, broken),
    /must contain a benefits list/);
});

test('v2 fixture mutation: a missing tool name is a named failure', () => {
  const broken = V2_FIXTURE_OK.replace('<div class="tool-block"><span class="tool-badge">Codex</span></div>\n', '');
  assert.throws(() => assertV2Body('fixture', broken, broken),
    /must name Codex/);
});

test('v2 fixture mutation: a missing Tools-page link is a named failure', () => {
  const broken = V2_FIXTURE_OK.replace(/See the <a[^>]*>Tools page<\/a> for setup\.\n\n/, '');
  assert.throws(() => assertV2Body('fixture', broken, broken),
    /must link the Tools page/);
});
