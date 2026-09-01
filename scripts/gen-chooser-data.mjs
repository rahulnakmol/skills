#!/usr/bin/env node
// Generates site/_data/chooser.json: the small decision tree behind the
// site-wide skill chooser (site/_includes/chooser.html). The tree's shape is
// curated here, not parsed out of prose, but every leaf is traced back to a
// real router: this script reads skills/developer/ask-fde/SKILL.md and
// skills/pm/ask-pm/SKILL.md, pulls every skill name their own "Map to skill"
// lines route to, and fails loudly if a curated leaf names a skill neither
// router actually mentions. It also reads the shape rubrics the tree's
// altitude/moment questions are grounded in — conduct's and arrange's
// RUBRIC.md — and fails loudly if either has drifted away from the
// loop/graph/hybrid (conduct) or grill-loop/parallel-fan/hybrid (arrange)
// vocabulary this tree's ordering assumes. Every leaf's one-liner and href
// are derived from the catalog (.claude-plugin/plugin.json + each skill's
// own SKILL.md frontmatter), never hand-typed, so a skill's description
// changing upstream is what changes its chooser card, not a second copy of
// the same sentence living here.
//
// Deterministic output — same input, same bytes — so the site build is
// reproducible. House style mirrors gen-docs-data.mjs and gen-wiki-stubs.mjs.
//
// Usage:
//   node scripts/gen-chooser-data.mjs           # write site/_data/chooser.json
//   node scripts/gen-chooser-data.mjs --check   # exit non-zero on drift, write nothing
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const errors = [];

// --- catalog: plugin.json + each skill's own SKILL.md frontmatter ----------
// Self-sufficient on purpose — this script does not depend on
// gen-docs-data.mjs having run first, so `node scripts/gen-chooser-data.mjs`
// alone always produces a correct result.
function parseFrontmatter(body) {
  const fm = body.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return { name: undefined, description: undefined };
  const block = fm[1];
  const name = block.match(/^name:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1]?.trim();
  const description = block.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  return { name, description };
}

const pluginPath = join(root, '.claude-plugin/plugin.json');
const plugin = JSON.parse(readFileSync(pluginPath, 'utf8'));

const catalog = new Map(); // skill name -> { description }
for (const skillPath of plugin.skills ?? []) {
  const skillMdPath = join(root, skillPath, 'SKILL.md');
  const rel = `${skillPath}/SKILL.md`;
  if (!existsSync(skillMdPath)) { errors.push(`${rel}: not found (declared in .claude-plugin/plugin.json)`); continue; }
  const { name, description } = parseFrontmatter(readFileSync(skillMdPath, 'utf8'));
  if (!name || !description) { errors.push(`${rel}: missing frontmatter name or description`); continue; }
  catalog.set(name, { description });
}

// --- routing maps: every skill name ask-fde / ask-pm route to ---------------
// Scoped to lines carrying the routing arrow ("→"), the shape every "Map to
// skill" bullet in both files uses — this deliberately excludes any other
// backticked token (a filename, a section reference) that isn't part of the
// actual routing map.
function routedSkillNames(rel) {
  const body = readFileSync(join(root, rel), 'utf8');
  const names = new Set();
  for (const line of body.split('\n')) {
    if (!line.includes('→')) continue; // →
    for (const m of line.matchAll(/`([a-z][a-z0-9-]*)`/g)) names.add(m[1]);
  }
  return names;
}

const routedByFde = routedSkillNames('skills/developer/ask-fde/SKILL.md');
const routedByPm = routedSkillNames('skills/pm/ask-pm/SKILL.md');
const routedSkills = new Set([...routedByFde, ...routedByPm]);
if (routedByFde.size < 5) errors.push('skills/developer/ask-fde/SKILL.md: routing map read too small — check the → line scan');
if (routedByPm.size < 5) errors.push('skills/pm/ask-pm/SKILL.md: routing map read too small — check the → line scan');

// --- shape rubrics: grounds the altitude/moment questions -------------------
// Read for real, not decoration: each rubric's own vocabulary is asserted
// present, so a rewrite that drops the shape language this tree assumes
// fails here rather than silently leaving the chooser's ordering ungrounded.
const conductRubric = readFileSync(join(root, 'skills/developer/conduct/RUBRIC.md'), 'utf8');
for (const term of ['Loop', 'Graph', 'Hybrid']) {
  if (!new RegExp(`\\b${term}\\b`, 'i').test(conductRubric)) {
    errors.push(`skills/developer/conduct/RUBRIC.md: expected shape term "${term}" not found`);
  }
}
const arrangeRubric = readFileSync(join(root, 'skills/pm/arrange/RUBRIC.md'), 'utf8');
for (const term of ['Grill-loop', 'Parallel-fan', 'Hybrid']) {
  if (!new RegExp(term.replace('-', '-'), 'i').test(arrangeRubric)) {
    errors.push(`skills/pm/arrange/RUBRIC.md: expected shape term "${term}" not found`);
  }
}

// --- the tree ----------------------------------------------------------------
// Level 1 answers the routers' own top-level split: build vs decide vs check.
// Level 2 (altitude) applies only where the routed skills actually separate
// by altitude — "checking finished work" skips straight to level 3, since
// grit, grill, and shakedown each work at whatever altitude the work under
// review sits at, not one altitude of their own.
const QUESTIONS = { l1: 'What are you doing?', l2: 'At what altitude?', l3: 'When?' };

const TREE_SPEC = [
  {
    id: 'building', label: 'Building software', level: 'l1',
    children: [
      { id: 'epic', label: 'Epic', level: 'l2', children: [
        { id: 'before', label: 'Before', level: 'l3', skill: 'recon' },
        { id: 'during', label: 'During', level: 'l3', skill: 'impact' },
      ] },
      { id: 'feature', label: 'Feature', level: 'l2', children: [
        { id: 'before', label: 'Before', level: 'l3', skill: 'architect' },
        { id: 'during', label: 'During', level: 'l3', skill: 'slice' },
        { id: 'after', label: 'After', level: 'l3', skill: 'raise' },
      ] },
      { id: 'story', label: 'One story', level: 'l2', children: [
        { id: 'before', label: 'Before', level: 'l3', skill: 'conduct' },
        { id: 'during', label: 'During', level: 'l3', skill: 'sdlc' },
        { id: 'after', label: 'After', level: 'l3', skill: 'deliver' },
      ] },
    ],
  },
  {
    id: 'deciding', label: 'Deciding what to build', level: 'l1',
    children: [
      // The two chips must contrast at a glance. "The epic itself" is
      // finding and cutting it (discover, map, carve); "Inside the epic" is
      // funding, specifying, and sequencing what it holds (case reads an
      // epic manifest, prd-draft writes one PRD per epic, roadmap sequences
      // epics) — that is why this branch does not borrow the developer
      // branch's "Feature" label.
      { id: 'epic', label: 'The epic itself', level: 'l2', children: [
        { id: 'before', label: 'Before', level: 'l3', skill: 'discover' },
        { id: 'during', label: 'During', level: 'l3', skill: 'map' },
        { id: 'after', label: 'After', level: 'l3', skill: 'carve' },
      ] },
      { id: 'feature', label: 'Inside the epic', level: 'l2', children: [
        { id: 'before', label: 'Before', level: 'l3', skill: 'case' },
        { id: 'during', label: 'During', level: 'l3', skill: 'prd-draft' },
        { id: 'after', label: 'After', level: 'l3', skill: 'roadmap' },
      ] },
    ],
  },
  {
    id: 'checking', label: 'Checking finished work', level: 'l1',
    children: [
      { id: 'before', label: 'Before', level: 'l3', skill: 'grit' },
      { id: 'during', label: 'During', level: 'l3', skill: 'grill' },
      { id: 'after', label: 'After', level: 'l3', skill: 'shakedown' },
    ],
  },
];

// A skill's one-liner is its catalog description's first sentence, with the
// invocation-axis prefix ("User-invoked " / "Model-invoked ") stripped — the
// chooser card names the skill directly, so restating its invocation axis in
// the same breath is redundant.
function oneLinerFor(skill, rel) {
  const entry = catalog.get(skill);
  if (!entry) {
    errors.push(`chooser tree references unknown skill "${skill}"${rel ? ` at ${rel}` : ''} — not in .claude-plugin/plugin.json`);
    return '';
  }
  if (!routedSkills.has(skill)) {
    errors.push(`chooser tree leaf "${skill}"${rel ? ` at ${rel}` : ''} is not named in ask-fde/SKILL.md or ask-pm/SKILL.md's routing map`);
  }
  const stripped = entry.description.replace(/^(User|Model)-invoked\s+/i, '');
  const sentence = stripped.match(/^(.*?[.!?])(\s|$)/)?.[1] ?? stripped;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

const leaves = [];

function walk(nodes, ancestorPath) {
  return nodes.map((node) => {
    const step = { level: node.level, id: node.id, label: node.label };
    const path = [...ancestorPath, step];
    if (node.skill) {
      const rel = path.map((s) => s.id).join('/');
      const oneLiner = oneLinerFor(node.skill, rel);
      const leaf = { ...step, skill: node.skill, oneLiner, href: `/${node.skill}/` };
      leaves.push({ path, skill: node.skill, oneLiner, href: `/${node.skill}/` });
      return leaf;
    }
    return { ...step, children: walk(node.children, path) };
  });
}

const tree = walk(TREE_SPEC, []);

if (errors.length) {
  console.error('gen-chooser-data.mjs failed:\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}

const output = { version: plugin.version, questions: QUESTIONS, tree, leaves };
const content = JSON.stringify(output, null, 2) + '\n';

const outPath = join(root, 'site/_data/chooser.json');

if (CHECK) {
  if (!existsSync(outPath)) {
    console.error(`gen-chooser-data.mjs --check found drift:\n - ${outPath.replace(root + '/', '')}: missing`);
    process.exit(1);
  }
  const actual = readFileSync(outPath, 'utf8');
  if (actual !== content) {
    console.error(`gen-chooser-data.mjs --check found drift:\n - ${outPath.replace(root + '/', '')}: content differs from generated output`);
    process.exit(1);
  }
  console.log(`gen-chooser-data.mjs --check OK: ${leaves.length} leaves match`);
  process.exit(0);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, content);
console.log(`gen-chooser-data.mjs OK: ${leaves.length} leaves across ${tree.length} top-level branches -> ${outPath.replace(root + '/', '')}`);
