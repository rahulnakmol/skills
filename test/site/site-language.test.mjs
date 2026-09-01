import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, splitFrontmatter, stripCodeBlocks, stripTags } from './lib.mjs';

// The plain-language rule, enforced as a test. Scope matches the writing-docs
// voice rule: every reader-facing page this site ships, minus the doctrine
// documents under skills/ (those have their own review path).
const SCOPE = [
  'site/_skills/architect.md', 'site/_skills/arrange.md', 'site/_skills/ask-fde.md', 'site/_skills/ask-pm.md',
  'site/_skills/brief.md', 'site/_skills/carve.md', 'site/_skills/case.md', 'site/_skills/chart.md',
  'site/_skills/conduct.md', 'site/_skills/constitution.md', 'site/_skills/deliver.md', 'site/_skills/discover.md',
  'site/_skills/grill.md', 'site/_skills/grit.md', 'site/_skills/impact.md', 'site/_skills/map.md',
  'site/_skills/model-routing.md', 'site/_skills/operate.md', 'site/_skills/prd-draft.md', 'site/_skills/prd-review.md',
  'site/_skills/press.md', 'site/_skills/raid.md', 'site/_skills/raise.md', 'site/_skills/realize.md',
  'site/_skills/recon.md', 'site/_skills/report.md', 'site/_skills/responsible-ai-governance.md',
  'site/_skills/roadmap.md', 'site/_skills/safeguard.md', 'site/_skills/sdlc.md', 'site/_skills/shakedown.md',
  'site/_skills/slice.md', 'site/_skills/tom-architect.md', 'site/_skills/update-models.md',
  'site/_groups/branding.md', 'site/_groups/core.md', 'site/_groups/developer.md', 'site/_groups/pm.md',
  'site/_groups/productivity.md', 'site/_groups/writing.md',
  'site/_journeys/deliver-with-evidence.md', 'site/_journeys/run-a-product-org.md',
  'site/leaders.md', 'site/tools.md', 'site/how-it-fits.md', 'site/example.md',
  'site/index.html', 'site/404.html',
];

// case-insensitive, word-boundary. Multi-word phrases match as literal
// substrings on normalized (single-spaced) text instead of \b, since an
// apostrophe inside a phrase like "it's" is not a \b word character.
const DENYLIST_WORDS = [
  'seamless', 'seamlessly', 'empower', 'empowers', 'empowering',
  'leverage', 'leverages', 'leveraged', 'leveraging',
  'unlock', 'unlocks', 'cutting-edge', 'game-changing', 'revolutionize',
  'supercharge', 'delve', 'delves', 'effortless', 'effortlessly',
];
const DENYLIST_PHRASES = ["it's important to note", "in today's fast-paced"];

// Emoji / pictographs: common ranges, deliberately excluding plain arrows and
// punctuation this corpus's own markup uses legitimately (rendered "&rarr;"
// entities are not literal characters at the source level, so they never
// reach this check).
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u;

// Model IDs are checked against the *raw* file (frontmatter and code
// included) — unlike every other rule here, which checks stripped prose.
// "claude-code" and "claude-code-action" are the CLI/Action product names,
// not model identifiers, and shakedown.md quotes a real CI workflow file
// "byte for byte" that legitimately installs `@anthropic-ai/claude-code`; the
// registry of actual model IDs lives in models.md, and reuses this same
// three-provider shape for scope, not duplicated logic.
const MODEL_ID_RES = [/\bclaude-[a-z0-9.-]+/gi, /\bgpt-[a-z0-9.-]+/gi, /\bgemini-[a-z0-9.-]+/gi];
const MODEL_ID_ALLOWED = new Set(['claude-code', 'claude-code-action', 'claude-hooks']);

function prose(rawBody) {
  const { body } = splitFrontmatter(rawBody);
  const noCode = stripCodeBlocks(body || rawBody);
  return stripTags(noCode);
}

for (const rel of SCOPE) {
  const raw = read(rel);
  const text = prose(raw);

  test(`${rel}: no denylisted marketing language`, () => {
    for (const word of DENYLIST_WORDS) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b${escaped}\\b`, 'i');
      assert.ok(!re.test(text), `${rel}: found denylisted word "${word}"`);
    }
    const normalized = text.replace(/\s+/g, ' ').toLowerCase();
    for (const phrase of DENYLIST_PHRASES) {
      assert.ok(!normalized.includes(phrase), `${rel}: found denylisted phrase "${phrase}"`);
    }
  });

  test(`${rel}: no exclamation points in prose`, () => {
    const idx = text.indexOf('!');
    assert.equal(idx, -1, `${rel}: found "!" in prose near: ${JSON.stringify(text.slice(Math.max(0, idx - 30), idx + 10))}`);
  });

  test(`${rel}: no emoji in prose`, () => {
    const m = text.match(EMOJI_RE);
    assert.equal(m, null, `${rel}: found emoji-range character ${m ? JSON.stringify(m[0]) : ''}`);
  });

  test(`${rel}: no bare "TQN" before "The Quentin" has appeared`, () => {
    const tqnMatch = text.match(/\bTQN\b/);
    if (!tqnMatch) return; // pages that never say TQN pass trivially
    const tqnIndex = tqnMatch.index;
    const quentinIndex = text.indexOf('The Quentin');
    assert.ok(quentinIndex !== -1 && quentinIndex < tqnIndex,
      `${rel}: "TQN" appears at index ${tqnIndex} before "The Quentin" has been spelled out on the page`);
  });

  test(`${rel}: no prose sentence over 45 words`, () => {
    const lines = stripCodeBlocks(splitFrontmatter(raw).body || raw).split('\n');
    const violations = [];
    for (const rawLine of lines) {
      let line = rawLine.trim();
      if (!line) continue;
      if (/^#{1,6}\s/.test(line)) continue; // heading, not prose
      if (/^\{%.*%\}$/.test(line)) continue; // pure Liquid tag line
      if (/^<\/?(div|section|nav|aside|svg|polygon|script|style|main)\b/i.test(line)) continue;
      line = stripTags(line).replace(/\{%[^}]*%\}/g, ' ').replace(/\{\{[^}]*\}\}/g, ' ').trim();
      if (!line) continue;
      // Strip a leading list/number marker or a bolded lead-in label so the
      // sentence check reads the prose that follows, not the markup around it.
      line = line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '').replace(/^\*\*[^*]+\*\*\s*/, '');
      // Split on [.?!], optionally followed by a closing quote, then
      // whitespace, then a capital letter, a backtick (a sentence starting
      // with a `code` term), or an opening quote.
      const sentences = line.split(/(?<=[.?!]['"’”]?)\s+(?=[A-Z`'"‘“])/);
      for (const s of sentences) {
        const words = s.trim().split(/\s+/).filter(Boolean);
        assert.ok(words.length <= 45,
          `${rel}: a prose sentence has ${words.length} words (max 45): ${JSON.stringify(s.trim().slice(0, 160))}`);
      }
    }
  });

  test(`${rel}: no model IDs (prose and code)`, () => {
    for (const re of MODEL_ID_RES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(raw)) !== null) {
        if (MODEL_ID_ALLOWED.has(m[0].toLowerCase())) continue;
        assert.fail(`${rel}: possible model ID "${m[0]}" — published pages must not name a specific model`);
      }
    }
  });
}
