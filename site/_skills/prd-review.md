---
layout: skill
name: prd-review
title: "PRD Review — Score a PRD Against the 11-Star Framework"
description: "PRD Review is the user-invoked skill that scores a PRD's ambition and completeness across seven weighted dimensions using the 11-Star Experience Framework."
group: pm
invocation: user-invoked
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

PRD Review scores a PRD's ambition and completeness against the 11-Star Experience Framework, mapping each feature to a star level from broken (1-3) to aspirational (9-11) before assigning any number. It then rates the PRD on seven weighted dimensions — Completeness, Clarity, Feasibility, Ambition, Differentiation, Metric Alignment, and Story Quality — and rolls them into a composite that lands in one of five verdict bands, from Reject to Exemplary. The review closes with prioritized improvement suggestions, each naming what to change, why, and the expected star-level impact. The score informs the human decision at the Quality gate; it never replaces it, even at a high composite.

## How to call it

In Claude Code, type `/prd-review`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A review that separates complete from ambitious</div>
<pre><code>Completeness ....... 9/10 (15%)
Clarity ............ 8/10 (15%)
Feasibility ........ 8/10 (15%)
<span class="tok-warn">Ambition ........... 4/10 (15%)</span>
Differentiation ..... 5/10 (15%)
Metric Alignment .... 7/10 (10%)
Story Quality ....... 8/10 (15%)
<span class="tok-ok">Composite: 7.00 -&gt; Minor Revision</span></code></pre>
<div class="compare-card-note">Completeness scores well and Ambition does not — both facts are reported, because a complete but unambitious PRD has not earned a pass on that alone.</div>
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
<div class="compare-card-note">Seven scores clustered within a point of each other is a signal to recalibrate, not a tidy result — it usually means the star-level mapping was skipped and the numbers were guessed.</div>
</div>
</div>

## In practice

The output contract calls for `specs/prd/{epic-name}-review.md` to carry an executive summary, the star spectrum map, seven dimension scores, a qualitative assessment, and prioritized improvement suggestions. Below is the shape that contract requires, for a PRD whose composite lands at the 7.5 floor:

```
# PRD Review: checkout-retry-flow

Executive summary: functional and clearly written, but every feature
maps to star 5 (parity). No anchor feature reaches star 7.

Star spectrum: retry button (5) · error copy (5) · saved-card recall (6)
· one-tap resume (5)

Dimensions: Completeness 9 · Clarity 8 · Feasibility 9 · Ambition 5
· Differentiation 5 · Metric Alignment 9 · Story Quality 8
Composite: 7.5 -> Approved with Notes

P1: Push saved-card recall toward star 7 by pre-filling the retry
    without a re-auth step. Expected impact: +1 star on the anchor
    feature, +0.4 on Differentiation.

Verdict: Approved with Notes.
```

This is the shape the output contract requires, not a captured run — `prd-review` has no companion script; the review is written by the skill directly into the file above.

## How it works

1. **Receive and inventory.** Read the full PRD; list every feature and story before scoring anything.
2. **Map to star levels.** Place each feature on the 1-to-11 scale and trace the customer journey for delight moments. See [`ELEVEN-STAR.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-review/ELEVEN-STAR.md).
3. **Score the seven dimensions.** Rate 1 to 10 on each weighted dimension and calculate the composite. See [`ELEVEN-STAR.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-review/ELEVEN-STAR.md).
4. **Recommend.** Write prioritized improvements, P0 through P3, each naming the expected star-level impact.
5. **Report and route.** Write the review; a verdict of Major Revision or worse sends the PRD back to `prd-draft`, and the score becomes one input to the human decision at the Quality gate. See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
