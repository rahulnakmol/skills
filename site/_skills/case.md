---
layout: skill
name: case
title: "Case — Build the Business Case for Investment Approval"
description: "Case is the user-invoked skill that builds the business case a sponsor approves, weighing real options against doing nothing, costed on four lines."
group: pm
invocation: user-invoked
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

Case builds the business case a sponsor approves at the Investment gate: at least two real options plus a costed do-nothing baseline, never a single path presented as inevitable. Each option is costed on four lines — build, run, opportunity, and the agent fleet's own token and run spend — so the transformation-value question has a real denominator. The case names the one assumption that would kill its own recommendation, states the check that would falsify it, and traces every claimed benefit forward to the register `realize` will later hold accountable. Before it reaches the sponsor, the case goes through a grill round.

## How to call it

In Claude Code, type `/case`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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
<div class="compare-card-note">A single path with a rationale is a pitch, not a case — a sponsor shown only one option was never actually asked to decide anything.</div>
</div>
</div>

## In practice

The output contract calls for `specs/{prefix}-case.md` to carry options, the do-nothing baseline, costs and benefits, sensitivity, and a recommendation. Below is the shape that contract requires, drawn directly from `COSTING.md`'s four-line accounting:

```
# Case: field-inspection-copilot

Options:
  A. Build in-house copilot   build $340k · run $90k/yr · opp cost: delays the
                               billing-portal rebuild by one quarter
  B. Buy + integrate vendor   build $180k · run $140k/yr · opp cost: vendor
                               lock-in on the inspection data model
  Do-nothing                  $260k/yr in manual triage cost, growing 8%/yr

Agent-fleet cost (Option A): $22k (research agents, 3 grill rounds, review panel)

Benefits (traced to realize's register):
  - Inspection turnaround: 6 days -> 2 days (leading indicator: queue depth)
  - Triage cost: $260k/yr -> $95k/yr

Sensitivity: adoption rate below 30% in the first quarter kills Option A's
  payback. Falsifiable by: pilot cohort conversion tracked at week 4.

Recommendation: Option A.
```

This is the shape the output contract requires, not a captured run — `case` has no companion script; the document above is written by the skill directly into the file.

## How it works

1. **Design phase.** Name at least two real options plus do-nothing. See [`CASE-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/case/CASE-METHOD.md) and [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Cost each option.** Build, run, opportunity, and agent-fleet cost, on four explicit lines. See [`COSTING.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/case/COSTING.md).
3. **Commission evidence** where a cost or benefit estimate is thin, routing each commissioned agent through `model-routing`. See [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md).
4. **Trace benefits forward** to the register `realize` will later hold accountable for delivering them.
5. **Run the sensitivity analysis.** Name the one assumption that would kill the recommendation, and the check that would falsify it.
6. **Grill the case** before it reaches the sponsor. See [`GRILL-PM.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/grill/GRILL-PM.md).
7. **Present at the Investment gate.** See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
