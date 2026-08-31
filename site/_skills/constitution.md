---
layout: skill
name: constitution
title: "Constitution — The Practice's Product DNA"
description: "Constitution authors and reviews the seven-section document — principles, positioning, prioritization — every downstream pm skill reads for alignment."
group: pm
invocation: user-invoked
lens:
  novice:
    who: "You're about to write your first PRD and don't know what 'aligned with the practice's principles' actually means in practice."
    value: "The constitution names, in one page, the specific trade-offs the team actually makes — not platitudes everyone already agrees with."
  practitioner:
    who: "You draft PRDs and cases every week and want a document you can point a disagreement back to instead of relitigating it each time."
    value: "Downstream skills — discover, carve, prd-draft, tom-architect — each read the applicable chain automatically, so alignment stops depending on you remembering to check."
  leader:
    who: "You manage several PMs whose case and PRD quality varies with who wrote them."
    value: "A shared constitution with a quarterly review cadence keeps the whole team answering to the same principles, and a stale one is flagged rather than silently trusted."
  csuite:
    who: "You need product decisions to trace back to something the organization actually decided, not to whichever PM happened to write the doc."
    value: "Every revision lands as a reviewable pull request, never a silent edit, and each section carries a review date so staleness is visible, not assumed away."
---

## What it does

Constitution codifies what the practice, or one initiative, stands for — the DNA every agent-assisted pm decision checks against. It runs one of three modes depending on file state: Create when none exists yet, Co-author to evolve named sections, or Review when a quarterly deadline has passed or the user asks. Every constitution ships in two tiers: a compact Tier 1 summary that every pm skill reads before it starts work, and Tier 2 detail files loaded only by the specific skill that needs that section. Constitutions form a hierarchy — the overall practice constitution, and each initiative's own constitution inheriting it, most-specific override winning last.

## How to call it

In Claude Code, type `/constitution`. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A principle that resolves a conflict</div>
<pre><code><span class="tok-ok">Principle: When shipping speed and audit</span>
<span class="tok-ok">completeness compete, we choose audit</span>
<span class="tok-ok">completeness for anything reaching Investment</span>
<span class="tok-ok">or Quality — speed is optimized before the</span>
<span class="tok-ok">gate, not at it.</span></code></pre>
<div class="compare-card-note">A specific trade-off the team actually makes when two good things compete.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Principle: Be user-focused.</span></code></pre>
<div class="compare-card-note">A generic platitude everyone already agrees with. This is a stop condition, not a style note — force the hard choice instead.</div>
</div>
</div>

## In practice

Constitution has no fixture to replay, so this is the shape its own output contract requires — the seven Tier 2 section files an overall practice constitution assembles, filled in as an illustration rather than a captured run:

<pre><code>specs/product-constitution.md          <span class="tok-comment"># Tier 1 compact summary</span>
specs/constitution/principles.md
specs/constitution/value-propositions.md
specs/constitution/positioning.md
specs/constitution/cx-philosophy.md
specs/constitution/building-approach.md
specs/constitution/prioritization-framework.md
specs/constitution/research-bets.md
<span class="tok-ok">Last reviewed: 2026-07-01   Next review: 2026-10-01</span></code></pre>

## How it works

1. **Detect the mode.** No file starts Create; a named section starts Co-author; a due or overdue review date starts Review.
2. **Fix the hierarchy level.** The overall practice constitution, or one initiative's constitution inheriting it. See [`CONSTITUTION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/constitution/CONSTITUTION.md).
3. **Create mode works the seven sections in order,** in small batches, then assembles the Tier 1 summary from the Tier 2 detail files it just wrote. See [`CONSTITUTION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/constitution/CONSTITUTION.md).
4. **Review mode runs a grill session** directly over the constitution's own claims — what held, what the quarter refuted, what the research bets returned.
5. **Every revision lands as a pull request,** never a silent edit. See [`INITIATIVE-REPO.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/INITIATIVE-REPO.md).
