import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, headings, wordCount } from '../helpers.mjs';

const PM_SKILLS = ['arrange', 'chart', 'constitution', 'discover', 'map', 'tom-architect', 'carve',
  'prd-draft', 'prd-review', 'case', 'roadmap', 'raid', 'realize',
  'report', 'grill', 'ask-pm'];

test('the pm group exists with all 16 skills, promoted, and a goal-bearing charter', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  for (const name of PM_SKILLS) {
    const dir = `skills/pm/${name}`;
    assert.ok(existsSync(join(root, dir, 'SKILL.md')), `missing ${dir}/SKILL.md`);
    assert.ok(plugin.skills.includes(dir), `plugin.json missing "${dir}"`);
  }
  const charter = read('skills/pm/README.md');
  for (const marker of ['AI-native transformation', 'UX-driven', 'outcome-driven',
    'agentic owner of problem-solving', 'blind spot', 'agent fleet', 'north star',
    'grounded in cost', 'keepers of the transformation', 'one hat at a time'])
    assert.ok(charter.includes(marker), `group charter missing "${marker}"`);
});

test('CLAUDE.md records six groups and the group-independence rule', () => {
  const claude = read('CLAUDE.md');
  assert.ok(claude.includes('Exactly six skill groups'), 'CLAUDE.md must say six groups');
  for (const g of ['core', 'developer', 'pm', 'branding', 'writing', 'productivity'])
    assert.ok(claude.includes(`\`${g}\``), `CLAUDE.md missing group ${g}`);
  assert.ok(/any group may reference `core`/i.test(claude),
    'CLAUDE.md must record that any group may reference core');
  assert.ok(/no group may reference any other group/i.test(claude),
    'CLAUDE.md must record that no group may reference another group');
  assert.ok(/basenames are unique repository-wide/i.test(claude),
    'CLAUDE.md must record repository-wide skill basename uniqueness');
});

const DOCTRINE = [
  // group-level
  { file: 'skills/pm/GATES.md',
    require: ['## Framing', '## Investment', '## Quality', '## Commitment'],
    includes: ['problem owner', 'sponsor', 'approval stays human', 'pickup protocol', 'blind-spot review'],
    minWords: 220 },
  { file: 'skills/pm/INITIATIVE-REPO.md',
    require: ['## The initiative repository', '## The specs tree', '## Monorepo mode', '## Git LFS',
      '## Artifact changes are pull requests', '## Shared-repo mode'],
    includes: ['specs/', 'specs/research/', 'initiatives/', 'naming convention', '.gitattributes',
      'git lfs install', 'tracker', 'REPO-SETUP.md', 'one repo, two groups', 'grill'],
    minWords: 320 },
  { file: 'skills/pm/RESEARCH-AGENTS.md',
    require: ['## Raw inputs', '## Deep research agents', '## Intuition agents', '## From research to corpus'],
    includes: ['meeting notes', 'transcript', 'xlsx', 'CSV', 'deep-research', 'specs/research/',
      'grill', 'hypothesis', 'degrad'],
    minWords: 280 },
  { file: 'skills/pm/AGENT-OWNERSHIP.md',
    require: ['## Covering your blind spots', "## Assessing the agents' blind spots", '## Growing the owner'],
    includes: ['coverage', 'omissions', 'evidence', 'correlated', 'star 5', 'do-nothing', 'unprompted'],
    minWords: 250 },
  { file: 'skills/pm/HATS.md',
    require: ['## One hat at a time', '## The product hat', '## The transformation hat',
      '## Operational and design work'],
    includes: ['TOM', 'maturity', 'business', 'functional', 'discover', 'ask-pm'],
    minWords: 220 },
  { file: 'skills/pm/VISUALS.md',
    require: ['## Compress the mechanism', '## The house system', '## Formats'],
    includes: ['one figure, one claim', 'SVG', 'PNG', 'pptx', 'degrad'],
    minWords: 200 },
  // per-skill
  { file: 'skills/pm/constitution/CONSTITUTION.md',
    require: ['## Two tiers of detail', '## The constitution hierarchy', '## The seven sections', '## Review cadence'],
    includes: ['overall', 'initiative', 'inherit', 'Last reviewed', 'quarterly', 'stale', 'grill', 'pull request'],
    minWords: 300 },
  { file: 'skills/pm/discover/METHOD.md',
    require: ['## The five dimensions', '## Root cause', '## Classification'],
    includes: ['Five Whys', 'Fishbone', 'stakeholders', 'success criteria'], minWords: 250 },
  { file: 'skills/pm/carve/DIVE.md',
    require: ['## Deliverable', '## Independent', '## Valuable', '## Estimable'],
    includes: ['standalone release', 'named persona'], minWords: 150 },
  { file: 'skills/pm/prd-draft/PRD-SECTIONS.md',
    require: ['## The twelve sections', '## INVEST', '## Acceptance criteria'],
    includes: ['Given', 'When', 'Then', 'error scenario', 'named persona'], minWords: 300 },
  { file: 'skills/pm/prd-review/ELEVEN-STAR.md',
    require: ['## The scale', '## The seven dimensions', '## Verdict bands', '## Working backward'],
    includes: ['star 5', 'star 7', 'star 8', 'Completeness', 'Ambition', 'Differentiation',
      'Major Revision', 'Approved with Notes', '7.5'], minWords: 350 },
  { file: 'skills/pm/tom-architect/TOM-METHOD.md',
    require: ['## Process decomposition', '## Maturity assessment', '## Organization and RACI',
      '## KPI framework', '## AI augmentation overlay', '## Platform stacks'],
    includes: ['L1', 'L4', 'Microsoft', 'SAP', 'Oracle', 'Salesforce', 'Workday', 'ServiceNow'],
    minWords: 400 },
  { file: 'skills/pm/case/CASE-METHOD.md',
    require: ['## Options considered', '## Costs and benefits', '## The do-nothing option', '## Sensitivity'],
    includes: ['sponsor', 'Investment gate'], minWords: 200 },
  { file: 'skills/pm/case/COSTING.md',
    require: ['## Build cost', '## Run cost', '## Agent-fleet cost', '## Opportunity cost', '## Actuals'],
    includes: ['token', 'budget', 'realize'], minWords: 180 },
  { file: 'skills/pm/roadmap/ROADMAP.md',
    require: ['## Horizons', '## Outcome linkage', '## Sequencing rules', '## PI planning'],
    includes: ['now', 'later', 'OKR', 'Program Increment', 'PI objectives', 'dependency', 'capacity', 'raid'],
    minWords: 250 },
  { file: 'skills/pm/raid/RAID-METHOD.md',
    require: ['## Risks', '## Assumptions', '## Issues', '## Dependencies', '## The status narrative'],
    includes: ['owner', 'mitigation'], minWords: 200 },
  { file: 'skills/pm/realize/BENEFITS.md',
    require: ['## The benefits register', '## Leading indicators', '## The north star', '## Variance and the loop back'],
    includes: ['Business value delivered', 'discover', 'efficiency', 'productivity',
      'transformation value', 'actuals'], minWords: 220 },
  { file: 'skills/pm/report/REPORT-METHOD.md',
    require: ['## The leadership pack', '## The 4Ps', '## Value first', '## Sources', '## Cadences'],
    includes: ['Progress', 'Problems', 'Priorities', 'Perspective', 'weekly', 'fortnightly',
      'quarterly', 'half-yearly', 'yearly', 'raid', 'realize', 'roadmap', 'case', 'press',
      'north star', 'decisions', 'pickup-protocol', 'pull request', 'VISUALS.md'],
    minWords: 320 },
  { file: 'skills/pm/grill/GRILL-PM.md',
    require: ['## Round protocol', '## Grill with docs', '## Provoke', '## Personas and their questions',
      '## Exit criteria'],
    includes: ['core/GRILL.md', 'cite', 'we stop here', 'sign-off', 'corpus', 'hypothesis', 'star',
      'Business Architect', 'Transformation Leader', 'Chief Business Transformation Officer'],
    minWords: 400 },
];

for (const spec of DOCTRINE) {
  test(`${spec.file} carries the required structure and depth`, () => {
    const body = read(spec.file);
    const hs = headings(body);
    for (const h of spec.require) assert.ok(hs.includes(h), `${spec.file}: missing heading "${h}"`);
    for (const s of spec.includes) assert.ok(body.includes(s), `${spec.file}: missing marker "${s}"`);
    assert.ok(wordCount(body) >= spec.minWords,
      `${spec.file}: ${wordCount(body)} words < ${spec.minWords} (stub)`);
  });
}

test('the doctrines are threaded through the pipeline, not left optional', () => {
  for (const [file, marker, why] of [
    ['skills/pm/discover/SKILL.md', 'grill', 'discover questions by the grill round protocol'],
    ['skills/pm/case/SKILL.md', 'grill', 'the case is grilled before the Investment gate'],
    ['skills/pm/carve/SKILL.md', 'grill', 'the manifest is grilled before approval'],
    ['skills/pm/prd-draft/SKILL.md', 'grill', 'a grill pass precedes the Quality gate'],
    ['skills/pm/discover/SKILL.md', 'RESEARCH-AGENTS', 'discover commissions evidence'],
    ['skills/pm/case/SKILL.md', 'RESEARCH-AGENTS', 'the case commissions evidence'],
    ['skills/pm/tom-architect/SKILL.md', 'RESEARCH-AGENTS', 'the TOM commissions evidence'],
    ['skills/pm/discover/SKILL.md', 'hat', 'discover classifies the hat at intake'],
    ['skills/pm/ask-pm/SKILL.md', 'hat', 'ask-pm asks which hat only when ambiguous'],
    ['skills/pm/discover/SKILL.md', 'INITIATIVE-REPO', 'discover verifies or bootstraps the substrate'],
    ['skills/pm/map/SKILL.md', 'VISUALS', 'map applies visual compression'],
    ['skills/pm/roadmap/SKILL.md', 'VISUALS', 'roadmap ships its compressing figure'],
    ['skills/pm/report/SKILL.md', 'VISUALS', 'the pack carries its compressing figure'],
    ['skills/pm/grill/SKILL.md', 'AGENT-OWNERSHIP', 'the grill applies the blind-spot checklist'],
    ['skills/pm/constitution/SKILL.md', 'quarterly', 'the constitution carries an at-least-quarterly review cadence'],
  ])
    assert.ok(read(file).includes(marker), `${file}: ${why}`);
});

test('the impact seam is documented on both sides', () => {
  assert.ok(read('skills/pm/prd-draft/SKILL.md').includes('impact'),
    'pm/prd-draft must document the seam with impact');
  assert.ok(read('skills/developer/impact/SKILL.md').includes('pm'),
    'developer/impact must acknowledge the PM pipeline seam');
});

test('the delivery seam is real: slice types, raise ADO backend, runnable exporter', () => {
  const templates = read('skills/developer/slice/TEMPLATES.md');
  for (const t of ['## Risk', '## Impediment'])
    assert.ok(templates.includes(t), `slice/TEMPLATES.md missing "${t}"`);
  assert.ok(existsSync(join(root, 'skills/developer/raise/trackers/ado.md')), 'missing raise/trackers/ado.md');
  assert.ok(existsSync(join(root, 'scripts/ado-export.mjs')), 'missing scripts/ado-export.mjs');
  assert.ok(read('skills/developer/raise/SKILL.md').includes('ado'), 'raise/SKILL.md must name the ado tracker');
});

test('ask-pm routes the whole group and ask-fde routes to it', () => {
  const askPm = read('skills/pm/ask-pm/SKILL.md');
  for (const name of PM_SKILLS.filter((n) => n !== 'ask-pm'))
    assert.ok(askPm.includes(name), `ask-pm missing route to ${name}`);
  assert.ok(read('skills/developer/ask-fde/SKILL.md').includes('ask-pm'),
    'ask-fde must route PM intent to ask-pm');
});

test('the PM ladder and the coin framing ship in diagram and docs', () => {
  assert.ok(existsSync(join(root, 'docs/assets/persona-ladder-pm.svg')),
    'missing docs/assets/persona-ladder-pm.svg');
  assert.ok(read('README.md').includes('persona-ladder-pm.svg'), 'README must embed the PM ladder');
  const personas = read('wiki/Personas.md');
  for (const marker of ['Business Architect', 'Transformation Leader',
    'Chief Business Transformation Officer', 'Agent Owner', 'Operations Chief of Staff',
    'Chief Intelligence Officer', 'two sides of the same'])
    assert.ok(personas.includes(marker), `Personas.md missing "${marker}"`);
});

test('every pm SKILL.md respects the repo skill contract', () => {
  for (const name of PM_SKILLS) {
    const body = read(`skills/pm/${name}/SKILL.md`);
    assert.ok(body.split('\n').length <= 120, `${name}: SKILL.md over 120 lines`);
    assert.ok(body.includes(`name: ${name}`), `${name}: frontmatter name mismatch`);
    assert.ok(/user-invoked|model-invoked|overlay/.test(body), `${name}: invocation axis missing`);
  }
});
