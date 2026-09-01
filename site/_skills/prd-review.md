---
layout: skill
name: prd-review
title: "PRD Review — Score a PRD Against the 11-Star Framework"
description: "PRD Review is the user-invoked skill that scores a PRD's ambition and completeness across seven weighted dimensions using the 11-Star Experience Framework."
group: pm
invocation: user-invoked
scenario: "Scoring the field-inspection-copilot PRD before the Quality gate"
lens:
  novice:
    who: 'You have watched a PRD get approved because it looked complete, then ship a feature that matched every competitor and excited nobody. PRD Review is the check that separates complete from ambitious.'
    value: 'You get a scored map of where the PRD sits on a 1-to-11 star scale, dimension by dimension, so you know exactly which part reads as merely finished and which part reads as differentiated.'
  practitioner:
    who: 'You draft PRDs and want an honest read before they reach the Quality gate, not a rubber stamp and not a surprise rejection.'
    value: 'Seven weighted scores plus a star-spectrum map tell you precisely where to spend your next revision pass, with a verdict band that tells you whether that pass is optional or required.'
  leader:
    who: 'You manage several PMs whose PRDs move through the same gate at different levels of rigor.'
    value: 'Every PRD gets the same seven-dimension rubric, so a comparison between two PRDs is a comparison of substance, not a comparison of who writes a more convincing narrative.'
  csuite:
    who: 'You approve or fund initiatives whose PRDs cleared Quality on a score alone.'
    value: 'The score is documented as advisory, never as the approval itself — the record shows a human read the qualitative assessment and the star map before signing, even at a 9.0.'
---

## What it does

PRD Review keeps a team from approving a PRD — a product requirements document — that reads as finished but was never pushed to be ambitious. It maps every feature in the PRD to a level on the eleven-star scale before any number gets assigned. That scale runs from broken (1 to 3), through baseline parity (4 to 5), to a differentiated experience that produces a wow moment or changes how a user thinks about the problem (7 to 8). Stars 9 to 11 are reserved for a design exercise no team actually ships. Only after that mapping does it rate the PRD on seven weighted dimensions and roll them into one composite score that lands in one of five verdict bands, from Reject to Exemplary. The score informs the human decision at the Quality gate, the checkpoint where a PRD is approved to move into delivery, and it never replaces that decision, even at a high composite.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Receive and inventory</span><span class="step-text">Read the full PRD and list every feature and story before scoring anything.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Map to star levels</span><span class="step-text">Place each feature on the 1-to-11 scale and trace the customer journey for delight moments.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Score the seven dimensions</span><span class="step-text">Rate 1 to 10 on each weighted dimension and calculate the composite.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Recommend</span><span class="step-text">Write prioritized improvements, P0 through P3, each naming the expected star-level impact.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Report and route</span><span class="step-text">A verdict of Major Revision or worse sends the PRD back to prd-draft before it reaches a human.</span></div>
</div>

<ul class="benefits">
  <li>You see exactly which part of the PRD reads as merely finished and which part reads as differentiated, dimension by dimension, instead of one blended impression.</li>
  <li>A complete but unambitious PRD cannot pass on Completeness alone — Ambition and Differentiation are scored and reported just as plainly, on the same page.</li>
  <li>Every PRD moving through the practice is read against the same seven-dimension rubric, so comparing two PRDs compares substance, not who wrote the more convincing narrative.</li>
  <li>The verdict band states plainly whether a PRD ships with commentary or has to return for another pass, and approval stays a human decision even at Exemplary.</li>
</ul>

[`ELEVEN-STAR.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-review/ELEVEN-STAR.md) states the method behind the mapping directly: design the star-11 experience first, an impossible perfection, then work backward to find the feasible sweet spot, which sits at star 7 to star 8 — ambitious enough to differentiate, feasible enough to actually build. Most PRDs default to star 5, functional and forgettable. As the same document puts it, "a PRD that never designs past star 5 has not failed a review, it has simply never attempted the exercise that would surface a star 7 or star 8 anchor feature."

## When to reach for it

Type `/prd-review` in Claude Code, or name the skill directly in a session. PRD Review is user-invoked, so nothing reaches for it on its own: SKILL.md names two moments — a PRD has already passed the structural validation `prd-draft` runs, or a person asks to review, assess, score, or rate a PRD's quality or ambition.

You reach for it once `prd-draft`'s structural pass has returned PASS or PASS WITH WARNINGS, before the PRD reaches the Quality gate. You reach for it again after a revision, to check whether the change actually moved the composite past the boundary that decides the PRD's next step.

PRD Review is not the only skill that touches a PRD. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need to author the PRD or run its structural check — sections present, requirements testable — not score its ambition | [`prd-draft`]({{ '/prd-draft/' | relative_url }}) |
| You need to pressure-test the PRD's answers before they are scored, not rate them | [`grill`]({{ '/grill/' | relative_url }}) |
| You need the business case a sponsor approves, not the PRD a review scores | [`case`]({{ '/case/' | relative_url }}) |
| You need the epic breakdown the PRD's stories are cut from | [`carve`]({{ '/carve/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>PRD Review is user-invoked: type <code>/prd-review</code>, or name it directly in a session — nothing routes to it automatically. Unlike <code>grit</code>, it ships no stop hook; the score reaches a person at the Quality gate, and approval stays their decision regardless of the composite.</p>
<div class="prompt-card">Score the field-inspection-copilot PRD before it reaches the Quality gate. It already passed prd-draft's structural check. Map every feature to a star level before you score anything, then give me the seven-dimension composite and the verdict band it lands in.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>PRD Review returns the star spectrum, the seven dimension scores, the composite and its verdict band, and prioritized improvement suggestions naming the expected star-level impact.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>prd-review</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>prd-review</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/prd-review/SKILL.md and ELEVEN-STAR.md, then score the field-inspection-copilot PRD the same way: star-level mapping first, then the seven weighted dimensions, then the composite and its verdict band.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the review directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to PRD Review — enforcement of the Quality-gate decision stays with the human who reads the review, not with any automated check.</p>
<div class="prompt-card">Score the field-inspection-copilot PRD against the 11-Star Experience Framework in skills/pm/prd-review/ELEVEN-STAR.md. Map every feature to a star level first, then score the seven weighted dimensions and report the composite and its verdict band.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the review directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees PRD Review's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/prd-review/SKILL.md, then score the field-inspection-copilot PRD: star-level mapping first, then the seven weighted dimensions, then the composite score and the verdict band it lands in.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the review the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. There is no continuous-integration backstop specific to PRD Review the way <code>grit-gates.yml</code> backstops <code>grit</code>; the Quality gate's human reader is the only enforcement point for what the score means.</p>
<div class="prompt-card">Score the field-inspection-copilot PRD before I take it to the Quality gate. Map every feature to a star level first, then rate the seven weighted dimensions, and give me the composite score with its verdict band.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the review in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- The PRD itself, or where it lives, and confirmation it has already passed `prd-draft`'s structural check.
- Whether this is a first pass or a re-score after a revision, so the composite can be read against the previous one.
- Any constraint on scope — a feature set the review should treat as fixed rather than open to a star-7 push.

Readers who have not installed the whole skill pack can add PRD Review alone:

```bash
./scripts/link-skills.sh --skill prd-review
```

This links only PRD Review into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>Score the field-inspection-copilot PRD before it reaches the Quality gate. It already passed prd-draft's structural check. Map every feature to a star level before you score anything, then give me the seven-dimension composite and the verdict band it lands in.</code></pre>

PRD Review starts with the star-level mapping, per `ELEVEN-STAR.md`. Every feature in this PRD lands at star 5 or star 6 — baseline parity or a proactive touch, nothing that produces a wow moment yet:

<pre><code>Star spectrum: photo auto-fill (5) &middot; damage-flagging suggestion (5)
&middot; voice-note transcription (6) &middot; one-tap inspector handoff (5)</code></pre>

Only after that mapping does it score the seven weighted dimensions and calculate the composite, each dimension multiplied by its weight from `ELEVEN-STAR.md`:

<pre><code>Completeness ....... 9/10 (15%)  -&gt; 1.35
Clarity ............ 8/10 (15%)  -&gt; 1.20
Feasibility ........ 8/10 (15%)  -&gt; 1.20
<span class="tok-warn">Ambition ........... 5/10 (15%)  -&gt; 0.75</span>
Differentiation ..... 6/10 (15%)  -&gt; 0.90
Metric Alignment .... 8/10 (10%)  -&gt; 0.80
Story Quality ....... 8/10 (15%)  -&gt; 1.20
<span class="tok-ok">Composite: 7.40 -&gt; Minor Revision</span></code></pre>

7.40 sits inside the Minor Revision band, 6.0 to 7.4, one tenth of a point under the 7.5 floor `ELEVEN-STAR.md` sets for Approved with Notes. The review writes the improvement suggestion that follows directly from where the number fell short:

<pre><code># PRD Review: field-inspection-copilot

Executive summary: functional and clearly written, but every feature
maps to star 5 or 6. No anchor feature reaches star 7.

Star spectrum: photo auto-fill (5) &middot; damage-flagging suggestion (5)
&middot; voice-note transcription (6) &middot; one-tap inspector handoff (5)

Dimensions: Completeness 9 &middot; Clarity 8 &middot; Feasibility 8 &middot; Ambition 5
&middot; Differentiation 6 &middot; Metric Alignment 8 &middot; Story Quality 8
Composite: 7.40 -&gt; Minor Revision

P1: Push voice-note transcription toward star 7 by auto-drafting the
    inspection narrative from the transcript, instead of only
    transcribing it. Expected impact: Ambition 5 -&gt; 7, composite
    +0.30.

Verdict: Minor Revision. Returned to `prd-draft`.</code></pre>

This is the shape the output contract requires, not a captured run — PRD Review has no companion script; the review is written by the skill directly into `specs/prd/{epic-name}-review.md`. Because the verdict is Minor Revision, SKILL.md's own routing rule applies without exception: the PRD goes back to `prd-draft` before anyone brings it to the Quality gate.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A revision that crosses the boundary that matters</div>
<pre><code>Completeness ....... 9/10 (15%)
Clarity ............ 8/10 (15%)
Feasibility ........ 8/10 (15%)
<span class="tok-ok">Ambition ........... 7/10 (15%)  &larr; revised, was 5</span>
Differentiation ..... 6/10 (15%)
Metric Alignment .... 8/10 (10%)
Story Quality ....... 8/10 (15%)
<span class="tok-ok">Composite: 7.70 -&gt; Approved with Notes</span></code></pre>
<div class="compare-card-note">Raising Ambition by two stars, from the documented voice-note change, moves the composite from 7.40 to 7.70 — 15% of a 2-star gain is 0.30, and 7.40 + 0.30 crosses from Minor Revision into Approved with Notes at a verified number.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Completeness ... 8/10
Clarity ........ 7/10
Feasibility .... 8/10
Ambition ....... 7/10
<span class="tok-warn">Differentiation . 7/10  &larr; every score within one point</span>
Metric Align ... 8/10
Story Quality .. 7/10</code></pre>
<div class="compare-card-note">Seven scores clustered within a point of each other is a signal to recalibrate, not a tidy result — SKILL.md names this exact pattern as a stop condition, because it usually means the star-level mapping was skipped and the numbers were guessed.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if scoring starts before the star-level mapping is finished?</summary>
<div class="qa-body">

SKILL.md lists this as a stop condition in its own right: "scoring before completing the star-level mapping." The mapping exists to anchor every dimension score in an actual reading of the PRD's ambition, not a general impression — scoring first turns the seven dimensions into a guess written in a rubric's format.

</div>
</details>

<details class="qa">
<summary>Why doesn't a high Completeness score carry the review on its own?</summary>
<div class="qa-body">

`ELEVEN-STAR.md` states this directly: "Completeness alone never carries a review — a complete but unambitious PRD can score well on Completeness and poorly on Ambition, and both facts belong in the report." A PRD can be thorough and still forgettable; the rubric is built to show both at once.

</div>
</details>

<details class="qa">
<summary>What happens when the verdict comes back Major Revision or worse?</summary>
<div class="qa-body">

SKILL.md's report step is explicit: "if the verdict is Major Revision or worse, hand it back to prd-draft." The PRD returns to authoring rather than moving toward the Quality gate carrying a verdict that says it is not ready.

</div>
</details>

<details class="qa">
<summary>Exactly where does Minor Revision end and Approved with Notes begin?</summary>
<div class="qa-body">

`ELEVEN-STAR.md` draws the line precisely. "A score of exactly 7.5 is the floor of Approved with Notes, not the ceiling of Minor Revision — the boundary matters because it is the line between a PRD that ships with commentary and one that returns to prd-draft for another pass." A composite of 7.4 and one of 7.5 sit a tenth of a point apart and mark two different decisions.

</div>
</details>

<details class="qa">
<summary>Does a 9.0 composite mean the PRD is auto-approved?</summary>
<div class="qa-body">

No. SKILL.md's sibling-skills note states that the score "is one input to the human decision at the Quality gate; approval stays human even at a high score." The csuite lens on this page says the same thing from the approver's side: the record shows a human read the qualitative assessment and the star map before signing, even at a 9.0.

</div>
</details>

<details class="qa">
<summary>Is star 9 through 11 a real target to design toward?</summary>
<div class="qa-body">

No. `ELEVEN-STAR.md` calls stars 9 to 11 "aspirational and magical, useful as a design exercise to challenge thinking but never a shipping target." The method is to imagine star 11 and then work backward to the feasible sweet spot at star 7 to star 8 — the imagining is the tool, not the destination.

</div>
</details>

## It's working if

- Every PRD reaching the Quality gate carries a star spectrum map next to its composite, not just a number.
- A complete but unambitious PRD gets a low Ambition score reported plainly, never smoothed into a comfortable composite.
- A verdict of Major Revision or worse routes the PRD back to `prd-draft` before anyone brings it to a human at the gate.
- The verdict band is recorded beside the composite, so a 7.4 and a 7.5 are read as two different decisions, not one rough score.

If every dimension keeps landing within a point of every other, the discipline has failed while the review still produced a number — the star-level mapping was very likely skipped.

## Where it fits

**PRD Review is the scoring pass a PRD takes on its way to the Quality gate, not the place a PRD gets written or interrogated.**

Its nearest neighbor is `prd-draft`: that skill authors the PRD and runs its structural check, and PRD Review reads from it only after that check returns PASS or PASS WITH WARNINGS, handing a Major-Revision-or-worse verdict straight back. `grill` sits earlier still, pressure-testing the PRD's answers in themed rounds before there is anything ready to score.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "PRD quality scoring" straight to `prd-review`.
