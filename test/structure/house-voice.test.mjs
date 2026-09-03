import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, walk } from '../helpers.mjs';

// .agents/writing-docs.md and AGENTS.md: every document in this repository is
// written in simple American English, in a fact-based news-explainer register.
// Those two files, and the CLAUDE.md that points at them, state the rule by
// quoting the words it bans, so they are the one exemption.
const RULE_DOCS = ['.agents/writing-docs.md', 'AGENTS.md', 'CLAUDE.md'];

const DOCS = [
  ...walk('skills', (p) => p.endsWith('.md')),
  ...walk('drafts', (p) => p.endsWith('.md')),
  ...walk('wiki', (p) => p.endsWith('.md')),
  'README.md',
].filter((p) => !RULE_DOCS.includes(p));

function findings(pattern, label, { skip } = {}) {
  const hits = [];
  for (const path of DOCS) {
    for (const [index, line] of read(path).split('\n').entries()) {
      if (skip && skip(line)) continue;
      const match = line.match(pattern);
      if (match) hits.push(`${path}:${index + 1}: ${label} "${match[0].trim()}" — ${line.trim().slice(0, 90)}`);
    }
  }
  return hits;
}

test('no marketing or hype vocabulary', () => {
  // Words with a legitimate technical sense in this repository are not on the
  // list: `ELEVEN-STAR.md` rates an experience up to "magical" and `VALUE.md`
  // probes for a "delightful" outcome, and both are naming a measured quality
  // rather than selling one. A check that forces correct prose to be mangled
  // trains authors to work around the harness.
  const HYPE =
    /\b(seamless(ly)?|revolutionary|game[- ]chang(ing|er)|supercharged?|cutting[- ]edge|effortless(ly)?|best[- ]in[- ]class|world[- ]class|blazing(ly)?|turbocharged|unparalleled|unleash(es|ed)?|next[- ]generation|state[- ]of[- ]the[- ]art)\b/i;
  assert.deepEqual(
    findings(HYPE, 'hype word'),
    [],
    'Marketing language does not appear in this repository. State the fact instead.',
  );
});

test('no first-person cheerleading', () => {
  const CHEER = /\b(we(?:'| a)re excited|you'll love|we can't wait|exciting news|thrilled to)\b/i;
  assert.deepEqual(findings(CHEER, 'cheerleading'), [], 'Documents report; they do not sell.');
});

test('no exclamation points or decorative emoji', () => {
  // A "!" inside code, a shell negation, or a comparison operator is not
  // punctuation, so only sentence-ending exclamation is caught.
  const BANG = /[a-z,;)][ ]?!(?:\s|$)/;
  assert.deepEqual(
    findings(BANG, 'exclamation point', { skip: (l) => l.trimStart().startsWith('```') || /`[^`]*![^`]*`/.test(l) }),
    [],
    'The register is measured. An exclamation point signals enthusiasm the prose should earn.',
  );
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  assert.deepEqual(findings(EMOJI, 'emoji'), [], 'Emoji are not used as decoration.');
});

test('American spelling, not British', () => {
  const BRITISH =
    /\b(colour|behaviour|licence|centre|analyse[sd]?|catalogue|defence|organis(e|ed|ing|ation)|recognis(e|ed|ing)|optimis(e|ed|ing|ation)|prioritis(e|ed|ing)|summaris(e|ed|ing)|specialis(e|ed|ing)|minimis(e|ed|ing)|maximis(e|ed|ing)|normalis(e|ed|ing)|synchronis(e|ed|ing)|initialis(e|ed|ing)|serialis(e|ed|ing))\b/i;
  assert.deepEqual(findings(BRITISH, 'British spelling'), [], 'House spelling is American.');
});

test('every skill description states when to use the skill', () => {
  // The description is the only text a model sees before deciding to invoke, so a
  // description that names the skill without saying when it applies cannot route.
  const missing = [];
  for (const path of [...walk('skills', (p) => p.endsWith('SKILL.md')), ...walk('drafts', (p) => p.endsWith('SKILL.md'))]) {
    const fm = read(path).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const description = fm.match(/description:\s*([\s\S]*?)(?=\n[a-z-]+:|$)/)?.[1]?.trim() ?? '';
    if (!/\buse\b|\btrigger/i.test(description)) missing.push(`${path}: description never says when to use the skill`);
    if (description.split(/\s+/).length < 12) missing.push(`${path}: description is too thin to route on`);
  }
  assert.deepEqual(missing, []);
});
