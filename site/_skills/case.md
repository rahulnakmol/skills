---
layout: skill
name: case
title: "Case — Build the Business Case for Investment Approval"
description: "Case is the user-invoked skill that builds the business case a sponsor approves, weighing real options against doing nothing, costed on four lines."
group: pm
invocation: user-invoked
scenario: "Building the investment case for a field-inspection copilot"
lens:
  novice:
    who: 'You have been asked to justify spend and have written a single recommendation dressed up as a comparison. Case is the discipline of naming at least two real options and pricing the choice to do nothing at all.'
    value: 'You get a structured document — options, costs, benefits, sensitivity — instead of a blank page, and a checklist that stops you from presenting a pitch as if it were an analysis.'
  practitioner:
    who: 'You are preparing an investment ask and need the case to survive a sponsor asking "what if you are wrong."'
    value: 'The sensitivity analysis forces you to name the one assumption that would kill your own recommendation before anyone else finds it, and the four-line costing keeps the agent-fleet spend from hiding inside build cost.'
  leader:
    who: 'You sit between several PMs and the sponsors who fund their work.'
    value: 'Every case that reaches you has been through a grill round and names its own weakest assumption, so you spend the sponsor conversation on the decision, not on discovering gaps the PM missed.'
  csuite:
    who: 'You approve spend on initiatives whose agent-fleet costs are easy to under-report.'
    value: 'Agent-fleet cost is a required, explicit line, not folded into build cost — so the question of whether the agents made delivery more efficient, or just moved the cost somewhere less visible, has an answer in the record.'
journey: run-a-product-org
journey_title: "Run a product org"
journey_step: 3
journey_steps: 4
journey_prev: carve
journey_next: report
---

## What it does

Case builds the business case a sponsor approves at the Investment gate, the checkpoint where a sponsor commits real budget to an initiative: at least two real options plus a costed do-nothing baseline, never a single path presented as inevitable. Each option is costed on four lines — build, run, opportunity, and the agent fleet's own token and run spend — so the transformation-value question has a real denominator instead of a guess. The case names the one assumption that would kill its own recommendation, states the check that would falsify it, and traces every claimed benefit forward to the register `realize` will later hold accountable. Before it reaches the sponsor, the case goes through a grill round, a themed interrogation loop that pressure-tests an artifact before it advances.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Design phase</span><span class="step-text">Name at least two real options plus the do-nothing option.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Cost each option</span><span class="step-text">Build, run, opportunity, and agent-fleet cost, on four explicit lines.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Commission evidence</span><span class="step-text">Where a cost or benefit estimate is thin, routing each commissioned agent through model-routing.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Trace benefits forward</span><span class="step-text">To the register realize will later hold accountable for delivering them.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Run the sensitivity analysis</span><span class="step-text">Name the one assumption that would kill the recommendation, and the check that would falsify it.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Grill the case</span><span class="step-text">Before it reaches the sponsor.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Present at the Investment gate</span><span class="step-text">The sponsor approves the case alongside the epic manifest or target operating model (TOM).</span></div>
</div>

<ul class="benefits">
  <li>A sponsor is shown a real comparison — at least two options plus the cost of doing nothing — instead of one path presented as the obvious choice.</li>
  <li>The agent-fleet line makes the cost of the PM's own commissioned agents visible, so the transformation-value question has an honest answer.</li>
  <li>Every benefit the case claims traces forward to `realize`'s register, so a promise made here has somewhere to be checked later.</li>
  <li>The sensitivity analysis surfaces the recommendation's weakest assumption before the sponsor does, and names the check that would falsify it.</li>
</ul>

[`CASE-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/case/CASE-METHOD.md) states the do-nothing rule plainly: "a case that never seriously considers not acting treats action as a foregone conclusion, and a sponsor who is never shown the cost of inaction cannot actually weigh the decision they are being asked to make." Full four-line accounting appears in [`COSTING.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/case/COSTING.md), and what the Investment gate's blind-spot review weighs hardest appears in [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).

## When to reach for it

Type `/case` in Claude Code, or name the skill directly in a session. Case is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as an epic manifest or a target operating model ready for sponsor investment approval, or a person asking to build a case, justify spend, or weigh options.

You reach for it once `carve` or `tom-architect` has produced the artifact the spend is for, and before that artifact reaches a sponsor. You reach for it again whenever a sponsor pushes back and the case needs a sharper sensitivity line or a costed alternative it did not originally carry.

Case is not the only skill that touches a spending decision. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need to break the initiative into epics before any case can be costed | [`carve`]({{ '/carve/' | relative_url }}) |
| You need the target operating model the case's options are costed against | [`tom-architect`]({{ '/tom-architect/' | relative_url }}) |
| You need to pressure-test the case before it reaches the sponsor, not build it | [`grill`]({{ '/grill/' | relative_url }}) |
| You need to track whether an approved case's benefits actually arrived | [`realize`]({{ '/realize/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Case is user-invoked: type <code>/case</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; the Investment gate's blind-spot review, run by the sponsor before they decide, is what stands between a thin case and an approval.</p>
<div class="prompt-card">We need the investment case for the field-inspection copilot before it goes to the sponsor. Weigh at least two real options against the do-nothing baseline, cost each on all four lines including the agent fleet's own spend, and name the one assumption that would kill the recommendation.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Case returns the options, the costed do-nothing baseline, the benefits traced to `realize`, and the sensitivity line — then routes the draft into a grill round before it is ready for the sponsor.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>case</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>case</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/case/SKILL.md, CASE-METHOD.md, and COSTING.md, then build the investment case for the field-inspection copilot: at least two real options, the do-nothing baseline, all four cost lines, and the sensitivity that would break the recommendation.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the case directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to Case; the Investment gate's blind-spot review is the enforcement point, run by the sponsor rather than by any automated check.</p>
<div class="prompt-card">Build the investment case for the field-inspection copilot: at least two real options plus the do-nothing baseline, all four cost lines from skills/pm/case/COSTING.md, and the sensitivity analysis naming what would break the recommendation.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the case directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees Case's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/case/SKILL.md, then build the investment case for the field-inspection copilot: two real options plus do-nothing, all four cost lines, and the one assumption that would kill the recommendation.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the case the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. There is no continuous-integration backstop specific to Case the way <code>grit-gates.yml</code> backstops <code>grit</code>; the sponsor's blind-spot review at the Investment gate is the only check.</p>
<div class="prompt-card">Build the investment case for the field-inspection copilot before it goes to the sponsor. Name at least two real options against the do-nothing baseline, cost each on all four lines, and state the one assumption that would break the recommendation.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the case in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- The epic manifest or TOM this case is costed against, or where it lives.
- Any cost or benefit figure the team is already confident in, so commissioned research fills only the real gaps.
- Whether a grill round has already run on this case, since sign-off has one hard precondition: the recommendation must actually be answered.

Readers who have not installed the whole skill pack can add Case alone:

```bash
./scripts/link-skills.sh --skill case
```

This links only Case into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>We need the investment case for the field-inspection copilot before it goes to the sponsor. Weigh at least two real options against the do-nothing baseline, cost each on all four lines including the agent fleet's own spend, and name the one assumption that would kill the recommendation.</code></pre>

Case starts from the design phase in `CASE-METHOD.md`: name at least two real options plus do-nothing, described well enough that a sponsor could pick either one and know roughly what they were signing up for. It then costs each option per `COSTING.md`'s four lines — build, run, opportunity, and the agent fleet's own token and run spend — and traces every claimed benefit forward to `realize`'s register:

<pre><code># Case: field-inspection-copilot

Options:
  A. Build in-house copilot   build $340k &middot; run $90k/yr &middot; opp cost: delays the
                               billing-portal rebuild by one quarter
  B. Buy + integrate vendor   build $180k &middot; run $140k/yr &middot; opp cost: vendor
                               lock-in on the inspection data model
  Do-nothing                  $260k/yr in manual triage cost, growing 8%/yr

Agent-fleet cost (Option A): $22k (research agents, 3 grill rounds, review panel)

Benefits (traced to realize's register):
  - Inspection turnaround: 6 days -&gt; 2 days (leading indicator: queue depth)
  - Triage cost: $260k/yr -&gt; $95k/yr

Sensitivity: adoption rate below 30% in the first quarter kills Option A's
  payback. Falsifiable by: pilot cohort conversion tracked at week 4.

Recommendation: Option A.</code></pre>

This is the shape the output contract requires, not a captured run — Case has no companion script; the document above is written by the skill directly into `specs/{prefix}-case.md`. Before this reaches the sponsor, it still has to survive a grill round per `GRILL-PM.md`, the pm group's grill protocol — the round that would press hardest on exactly the sensitivity line already named above. `GATES.md` states the Investment gate's blind-spot review "weighs hardest on the sensitivity section," reasoning that "sponsors approve numbers, and numbers hide the assumption that produced them."

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A case that prices the alternative</div>
<pre><code>Option A: Build in-house .... $340k build / $90k run/yr
Option B: Buy + integrate ... $180k build / $140k run/yr
<span class="tok-ok">Do-nothing ................ $260k/yr in manual triage cost</span>
Agent-fleet cost (Option A): $22k across research, grill, review
Sensitivity: adoption rate below 30% kills Option A's payback
  Falsifiable by: pilot cohort conversion at week 4</code></pre>
<div class="compare-card-note">Do-nothing is costed in the same units as the real options, and the case names the one number that would break its own recommendation.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Recommendation: Build in-house
Rationale: it is the best path forward.
<span class="tok-warn">(no second option, no do-nothing baseline,
 no agent-fleet line)</span></code></pre>
<div class="compare-card-note">A single path with a rationale is a pitch, not a case — a sponsor shown only one option was never actually asked to decide anything, and SKILL.md names this exact shape as a stop condition.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if only one real option has actually been considered?</summary>
<div class="qa-body">

SKILL.md names this as a stop condition directly: "only one real option presented — a case is a comparison, not a pitch." A single path with a confident rationale attached is not yet a case, whatever else the document contains.

</div>
</details>

<details class="qa">
<summary>Why does every case need a costed do-nothing option?</summary>
<div class="qa-body">

`CASE-METHOD.md` states the reasoning directly: "a case that never seriously considers not acting treats action as a foregone conclusion, and a sponsor who is never shown the cost of inaction cannot actually weigh the decision they are being asked to make." Do-nothing has to be priced in the same units as the real options, not set aside as an assumption nobody prices.

</div>
</details>

<details class="qa">
<summary>Why does the agent-fleet cost get its own explicit line?</summary>
<div class="qa-body">

`COSTING.md` names the reason: "an initiative that never states its agent-fleet cost cannot answer the north star question of whether the agents made the work more efficient or just moved the cost somewhere less visible." Folding it into build cost would hide exactly the number the practice's efficiency question depends on.

</div>
</details>

<details class="qa">
<summary>What if a benefit sounds real but nobody can say how it would be measured?</summary>
<div class="qa-body">

SKILL.md's second stop condition covers this directly: "a benefit claimed with no way to measure it later." `CASE-METHOD.md` states the same rule from the writer's side — "a benefit that cannot be measured later should not be claimed now" — because every benefit here has to trace forward to `realize`'s register.

</div>
</details>

<details class="qa">
<summary>Does the case need to survive a grill round before the sponsor sees it?</summary>
<div class="qa-body">

Yes. SKILL.md's procedure places "grill the case" as its own step before "present to the sponsor for approval," and `CASE-METHOD.md` adds why: "a case grilled before the Investment gate should be able to name its own weakest point without being asked twice."

</div>
</details>

## It's working if

- Every case a sponsor sees names at least two real options plus a costed do-nothing baseline, never one path with a rationale attached.
- The agent-fleet line appears on its own, separate from build cost, on every case that reaches a sponsor.
- Every claimed benefit traces forward to an entry `realize` can later check, with no benefit claimed that has no way to be measured.
- The sensitivity line names one real assumption and the check that would falsify it, not a mechanical list of every variable that could move.

If a case's recommendation survives no matter which assumption gets challenged in the grill round, it has probably not actually been pressure-tested — CASE-METHOD.md names this exact pattern directly.

## Where it fits

**Case is the point where an epic manifest or a target operating model turns into a spending decision a sponsor can actually approve or decline.**

Its nearest neighbors upstream are `carve`, which produces the epic manifest, and `tom-architect`, which produces the target operating model — one of the two feeds every case. Downstream, every benefit the case claims traces forward into `realize`'s register, which is where the practice later finds out whether the projection held. `grill` sits directly inside the procedure, pressure-testing the case before it ever reaches the sponsor.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "investment justification" straight to `case`.
