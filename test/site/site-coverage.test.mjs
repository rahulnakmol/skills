import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  root, read, listMarkdown, splitFrontmatter, scalar, lens, steps,
  h2Headings, installBlockLines, skillGroups,
} from './lib.mjs';

// The page-per-skill guarantee: every manifest entry names a real site page.
// This is the test that makes "a new skill cannot merge without a page" true.
const PLUGIN = JSON.parse(read('.claude-plugin/plugin.json'));
const MANIFEST_SKILLS = PLUGIN.skills.map((p) => {
  const parts = p.split('/');
  return { ref: p, group: parts[1], name: parts[2] };
});

const EXPECTED_H2S = ['What it does', 'How to call it', 'What good looks like', 'In practice', 'How it works'];
const [INSTALL_LINE_1, INSTALL_LINE_2] = installBlockLines();

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

  test(`${pagePath}: body contract (H2 order, compare-grid, install block)`, () => {
    const raw = read(pagePath);
    const { body } = splitFrontmatter(raw);

    const found = h2Headings(body);
    assert.deepEqual(found, EXPECTED_H2S,
      `${pagePath}: expected exactly the five H2s in order, got: ${JSON.stringify(found)}`);

    assert.match(raw, /class="compare-grid"/, `${pagePath}: missing a compare-grid div`);

    assert.ok(raw.includes(INSTALL_LINE_1),
      `${pagePath}: missing install-block line 1 verbatim: ${JSON.stringify(INSTALL_LINE_1)}`);
    assert.ok(raw.includes(INSTALL_LINE_2),
      `${pagePath}: missing install-block line 2 verbatim: ${JSON.stringify(INSTALL_LINE_2)}`);
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
