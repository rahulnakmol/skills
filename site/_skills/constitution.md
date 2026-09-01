---
layout: skill
name: constitution
title: "Constitution — The Practice's Product DNA"
description: "Constitution authors and reviews the seven-section document — principles, positioning, prioritization — every downstream pm skill reads for alignment."
group: pm
invocation: user-invoked
scenario: "Setting the practice's principles before the reconciliation initiative reaches Investment"
lens:
  novice:
    who: "You are about to write your first PRD and do not know what 'aligned with the practice's principles' actually means in practice."
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

Constitution is the pm group's author and reviewer for a practice's own product DNA — the seven-section document every downstream pm decision checks against before it is called aligned. It runs one of three modes depending on file state: Create when none exists yet, Co-author to evolve named sections, or Review when a quarterly deadline has passed or the user asks.

Every constitution ships in two tiers, so alignment never costs more context than the moment needs. Tier 1 is a compact summary, under roughly a thousand tokens, that every pm skill reads before it starts work. Tier 2 is the detailed section files, loaded only by the specific skill that needs that section — `discover` reads `principles.md`, `carve` reads `prioritization-framework.md`, `tom-architect` reads `value-propositions.md`. Constitutions also form a hierarchy: the overall practice constitution, and each initiative's own constitution inheriting it, most-specific override winning last.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Detect the mode</span><span class="step-text">No file starts Create; a named section starts Co-author; a due or overdue review date starts Review.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Fix the hierarchy level</span><span class="step-text">The overall practice constitution, or one initiative's constitution inheriting it.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Create works the seven sections in order</span><span class="step-text">Small batches, then the Tier 1 summary is assembled from the Tier 2 files just written.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Review runs a grill session over its own claims</span><span class="step-text">What held, what the quarter refuted, what the research bets actually returned.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Every revision lands as a pull request</span><span class="step-text">Never a silent edit — a diff a stakeholder can read, comment on, and approve.</span></div>
</div>

<ul class="benefits">
  <li>A downstream skill reads the applicable chain automatically, so alignment stops depending on any one PM remembering to check a document by hand.</li>
  <li>An initiative operating under a tighter constraint can override the practice default in its own constitution, without editing the practice-wide one everyone else depends on.</li>
  <li>A constitution past its review date is flagged plainly rather than silently trusted, the same freshness discipline the model registry already applies to itself.</li>
  <li>Every revision is a reviewable pull request, so a principle changing is a diff a stakeholder saw, not an edit that happened somewhere upstream of them.</li>
</ul>

`CONSTITUTION.md` states the standard a principle has to clear in one line: not "be user-focused" but "the specific trade-off the team actually makes when two good things compete."

- [`CONSTITUTION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/constitution/CONSTITUTION.md) covers the two-tier structure, the constitution hierarchy, the seven sections, and the review cadence.
- [`INITIATIVE-REPO.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/INITIATIVE-REPO.md) covers why a revision lands as a pull request rather than a direct commit.

## When to reach for it

Type `/constitution` in Claude Code, or name the skill directly in a session. Constitution is user-invoked, so nothing reaches for it on its own: a person decides the practice or an initiative needs its principles written, changed, or checked for staleness.

You reach for constitution in three moments. No constitution exists yet at `specs/product-constitution.md`. You want to evolve one or more named sections rather than rewrite the whole document. A constitution has passed its quarterly review date, or you want to confirm it still holds before a downstream draft leans on it.

Constitution is not the only skill that touches practice-wide alignment. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need to pressure-test a document that already exists, not write principles | [`grill`]({{ '/grill/' | relative_url }}) |
| You need this initiative's own problem analysis, not the practice's principles | [`discover`]({{ '/discover/' | relative_url }}) |
| The principles already exist and you need epics scored against the prioritization framework | [`carve`]({{ '/carve/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Constitution is user-invoked: type <code>/constitution</code>, or name it directly in a session. It asks in small batches through <code>AskUserQuestion</code> during Create mode rather than requesting all seven sections at once.</p>
<div class="prompt-card">We are about to run a reconciliation initiative through Investment, and no product constitution exists yet at specs/product-constitution.md. Run Create mode: work the seven sections in small batches, then assemble the Tier 1 summary once the detail files exist.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code asks through each section in turn, writes the seven Tier 2 files, then assembles and returns the Tier 1 summary.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps constitution or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies the mode-detection procedure on its own.</p>
<div class="prompt-card">We are about to run a reconciliation initiative through Investment, and no product constitution exists yet at specs/product-constitution.md. Run Create mode: work the seven sections in small batches, then assemble the Tier 1 summary once the detail files exist.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode works the sections in its reply and writes the files, since no command wraps the pull-request step.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. It reads the catalog in <code>.agents/skills/</code> as context and applies constitution's procedure by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode.</p>
<div class="prompt-card">We are about to run a reconciliation initiative through Investment, and no product constitution exists yet at specs/product-constitution.md. Run Create mode: work the seven sections in small batches, then assemble the Tier 1 summary once the detail files exist.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the seven section files and the summary directly, then states plainly that the change should land as a pull request.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">We are about to run a reconciliation initiative through Investment, and no product constitution exists yet at specs/product-constitution.md. Run Create mode: work the seven sections in small batches, then assemble the Tier 1 summary once the detail files exist.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same seven files, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook for constitution specifically, so the instruction file is what tells the agent to run the mode-detection procedure and land the result as a pull request.</p>
<div class="prompt-card">We are about to run a reconciliation initiative through Investment, and no product constitution exists yet at specs/product-constitution.md. Run Create mode: work the seven sections in small batches, then assemble the Tier 1 summary once the detail files exist.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the section files in chat and opens the pull request through whatever repository access it has.</p>
</div>
</div>

A good ask states which hierarchy level is meant — the overall practice, or one initiative's own constitution — since the two land in different files and inherit in only one direction. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want constitution alone:

```bash
./scripts/link-skills.sh --skill constitution
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

No constitution exists yet, and the reconciliation initiative is close enough to Investment — the gate where a sponsor commits budget — that its case will need a prioritization framework to score against. You type the prompt above. Constitution detects Create mode from the missing file and asks through the seven sections in small batches rather than all at once.

Principles come first, and the first draft the model proposes reads "be user-focused" — a platitude everyone already agrees with, and `CONSTITUTION.md`'s own standard for a principle. The stop condition in `SKILL.md` catches this directly: a section containing a generic platitude is not accepted, and the model is pushed to state the actual trade-off instead. The revised principle: when shipping speed and audit completeness compete, the practice chooses audit completeness for anything reaching Investment or Quality, and optimizes speed before the gate rather than at it.

Once all seven sections exist, the Tier 1 summary is assembled from them:

<pre><code>specs/product-constitution.md          <span class="tok-comment"># Tier 1 compact summary</span>
specs/constitution/principles.md
specs/constitution/value-propositions.md
specs/constitution/positioning.md
specs/constitution/cx-philosophy.md
specs/constitution/building-approach.md
specs/constitution/prioritization-framework.md
specs/constitution/research-bets.md
<span class="tok-ok">Last reviewed: 2026-09-01   Next review: 2026-12-01</span></code></pre>

The change lands as a pull request rather than a direct commit, per `INITIATIVE-REPO.md`, so a stakeholder can read the diff and approve it before it becomes the record every downstream requirements document reads against.

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

## Common questions

<details class="qa">
<summary>Why does a principle need to resolve a conflict rather than just state a value?</summary>
<div class="qa-body">

Because a value nobody disputes carries no decision inside it. `SKILL.md`'s stop condition blocks a section that still contains a generic platitude. `CONSTITUTION.md` frames principles as three to five opinionated, conflict-resolving non-negotiables — the kind that actually tell a PM which way to lean when two good things compete, not a banner everyone would sign without thinking.

</div>
</details>

<details class="qa">
<summary>What happens with more than five principles?</summary>
<div class="qa-body">

`SKILL.md` names this as a stop condition: force the hard choices instead of listing everything that sounds important. A sixth principle usually means two of the first five were never actually forced against each other, and the document is carrying a value statement rather than a trade-off.

</div>
</details>

<details class="qa">
<summary>How does an initiative's own constitution relate to the practice-wide one?</summary>
<div class="qa-body">

It inherits it. `CONSTITUTION.md` describes an initiative constitution as recording only what it overrides or adds — an initiative in a regulated market might tighten the CX philosophy's star target, one under a fixed statement of work might override the prioritization framework entirely. Every pm skill reads the applicable chain, most-specific last, so an override always wins over the practice default, and the default always wins over silence.

</div>
</details>

<details class="qa">
<summary>What if a downstream skill would read a constitution past its review date?</summary>
<div class="qa-body">

`CONSTITUTION.md` requires it to say so plainly rather than silently reasoning from a stale document, and to offer Review mode instead. The cadence is at least quarterly, and it is enforced by discipline rather than by a clock — nothing blocks a skill from reading a stale file automatically, which is exactly why the skill itself has to flag it.

</div>
</details>

<details class="qa">
<summary>What actually happens in Review mode?</summary>
<div class="qa-body">

A grill session runs directly over the constitution's own claims: what held over the quarter, what the quarter's evidence refuted, what the research bets actually returned. `CONSTITUTION.md` is explicit that the resulting changes never land as a silent edit — they go through the same pull-request path any other revision does.

</div>
</details>

## It's working if

- Every principle in the document names a trade-off the team actually makes, not a value nobody would dispute.
- A downstream draft's disagreement gets pointed back at a specific section instead of relitigated from memory in a meeting.
- A constitution's `Last reviewed:` date is at least quarterly, and a skill reading a stale one says so before proceeding.
- Every section revision shows up as a pull request a stakeholder can read, not as a diff nobody saw land.

If a constitution accumulates six or seven principles because each new disagreement gets its own bullet instead of being forced against the existing five, the document has stopped doing its job even though it still reads as thorough.

## Where it fits

Constitution sits underneath the pipeline rather than inside its sequence. `discover`, `prd-draft`, `prd-review`, `carve`, and `tom-architect` each read the applicable chain before drafting, the way a foundation gets checked rather than walked through step by step. `GATES.md`, the pm group's gate doctrine, does not name a gate constitution feeds directly, because alignment is a standing condition every gate assumes, not an artifact one gate signs off on its own.

Its nearest neighbor for pressure-testing is `grill`, which Review mode calls directly to interrogate the constitution's own claims once a quarter has passed. Where discover produces one initiative's problem analysis, constitution produces the standing principles that analysis has to answer to.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
