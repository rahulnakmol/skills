import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, headings, wordCount, promotedCount } from '../helpers.mjs';

const NEW_SKILLS = [
  { dir: 'skills/pm/chart', name: 'chart', axis: 'user-invoked', refs: ['CHART.md', 'TICKETS.md'] },
  { dir: 'skills/productivity/brief', name: 'brief', axis: 'user-invoked', refs: ['RULES.md', 'SURFACES.md'] },
];

test('chart and brief are promoted, contract-compliant skills with their reference docs', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  const readme = read('README.md');
  for (const { dir, name, axis, refs } of NEW_SKILLS) {
    const body = read(`${dir}/SKILL.md`);
    assert.ok(plugin.skills.includes(dir), `plugin.json missing "${dir}"`);
    assert.ok(readme.includes(`${dir}/SKILL.md`), `README.md must list ${name}`);
    assert.ok(body.includes(`name: ${name}`), `${name}: frontmatter name mismatch`);
    assert.ok(body.includes(axis), `${name}: must declare its invocation axis`);
    assert.ok(body.split('\n').length <= 120, `${name}: SKILL.md over 120 lines`);
    for (const h of ['## When to invoke', '## Stop conditions', '## Output contract'])
      assert.ok(headings(body).includes(h), `${name}: SKILL.md missing "${h}"`);
    for (const ref of refs) {
      assert.ok(existsSync(join(root, dir, ref)), `missing ${dir}/${ref}`);
      assert.ok(body.includes(ref), `${name}: SKILL.md must point at ${ref}`);
    }
  }
});

const DOCTRINE = [
  { file: 'skills/pm/chart/CHART.md',
    require: ['## The chart is an index, not a store', '## The chart body', '## Three places a question can sit',
      '## Ticket states', '## Where the chart lives', '## Reporting from the chart'],
    includes: ['Destination', 'Known unknowns', 'Out of scope', 'ready', 'blocked', 'claimed', 'closed',
      'GitHub, Linear, or Azure DevOps', 'how the ready set is queried',
      'INITIATIVE-REPO.md', 'report', 'VISUALS.md'],
    minWords: 800 },
  { file: 'skills/pm/chart/TICKETS.md',
    require: ['## Sizing a ticket', '## The four types', '## Who decides', '## The claim protocol',
      '## Working the chart with an agent team', '## Recording a decision'],
    includes: ['### Evidence', '### Option', '### Alignment', '### Enablement', 'one agent session',
      'RESEARCH-AGENTS.md', 'COSTING.md', 'AGENT-OWNERSHIP.md', 'raid'],
    minWords: 800 },
  { file: 'skills/productivity/brief/RULES.md',
    require: ['## The three layers', '## Anatomy of a rule', '## Say what to do', '## One meaning, one place',
      '## What not to write down', '## Testing a rule', '## Keeping the brief alive'],
    includes: ['trigger', 'observable result', 'source of truth', 'glossary', 'default'],
    minWords: 800 },
  { file: 'skills/productivity/brief/SURFACES.md',
    require: ['## The portable core', '## The surfaces', '## Choosing the canonical file',
      '## When a surface has no file', '## Scoping a rule to part of a repository'],
    includes: ['Claude Code', 'Claude Desktop', 'Cowork', 'OpenCode', 'Codex', 'Cursor', 'Copilot',
      'CLAUDE.md', 'AGENTS.md', '.agents/skills/', 'Tool-Guidance'],
    minWords: 700 },
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

test('chart is threaded into the pm group rather than parked beside it', () => {
  assert.ok(read('skills/pm/ask-pm/SKILL.md').includes('chart'), 'ask-pm must route oversized planning to chart');
  assert.ok(read('skills/pm/report/SKILL.md').includes('chart'), 'report must be able to source status from a chart');
  assert.ok(read('skills/pm/README.md').includes('chart'), 'the pm charter must name chart');
  const skill = read('skills/pm/chart/SKILL.md');
  for (const [marker, why] of [
    ['GATES.md', 'a chart names the gate its destination feeds'],
    ['HATS.md', 'a chart is classified under one hat'],
    ['AGENT-OWNERSHIP.md', 'a decision is blind-spot reviewed before it is recorded'],
    ['RESEARCH-AGENTS.md', 'evidence tickets run through the research agents'],
    ['raid', 'what the chart cannot decide leaves as a risk, assumption, or dependency'],
    ['model-routing', 'ticket work resolves its model tier through the registry'],
  ])
    assert.ok(skill.includes(marker), `pm/chart: ${why}`);
});

test('the productivity group ships its first skill in charter, README, and wiki', () => {
  assert.ok(read('skills/productivity/README.md').includes('brief'), 'the productivity charter must name brief');
  assert.ok(!read('README.md').includes('Writing and productivity are charter-only'),
    'README must no longer describe productivity as charter-only');
  assert.ok(existsSync(join(root, 'wiki/Skill-Brief.md')), 'missing wiki/Skill-Brief.md');
  assert.ok(read('wiki/Skill-Brief.md').includes('skills/productivity/brief/SKILL.md'),
    "Skill-Brief.md must link brief's SKILL.md source");
  const productivity = promotedCount('productivity');
  assert.match(read('wiki/Group-Productivity.md'), new RegExp(`Promoted skills: ${productivity}\\.`),
    `Group-Productivity.md must count all ${productivity} productivity skills, including brief`);
  assert.ok(read('wiki/Home.md').includes('(Group-Productivity)'), 'wiki Home must link Group-Productivity');
});
