---
layout: skill
name: report
title: "Report — Produce the 4Ps Leadership Pack"
description: "Report is the user-invoked skill that produces the value-first, 4Ps leadership pack from the registers, and checks every number before it ships."
group: pm
invocation: user-invoked
lens:
  novice:
    who: 'You have written a status update that led with everything you worked on and buried whether it mattered. Report is the structure that leads with value instead.'
    value: 'You get a fixed shape — value first, then Progress, Problems, Priorities, Perspective — pulled from the registers instead of assembled from memory the night before.'
  practitioner:
    who: 'You produce a leadership pack every cadence and want the numbers in it to survive a second look.'
    value: 'Every figure is sourced from `realize`, `raid`, `roadmap`, and `case`, and the pack is not marked sent until you have opened the rendered artifact and checked every number against its source register.'
  leader:
    who: 'You receive leadership packs from several PMs at different cadences.'
    value: 'Every pack you receive carries the same 4Ps structure and a compressing figure, so a portfolio review compares initiatives on value moved, not on how each PM chose to format their update.'
  csuite:
    who: 'You read a leadership pack and act on its numbers without re-deriving them yourself.'
    value: 'A register check behind any figure can be recorded as a runnable gate and re-run at the next cadence, so a number in the pack is evidence, not an assertion.'
journey: run-a-product-org
journey_title: "Run a product org"
journey_step: 4
journey_steps: 4
journey_prev: case
---

## What it does

Report produces the leadership pack at whatever cadence is due — weekly, fortnightly, quarterly, half-yearly, or yearly — structured as value first, then the 4Ps: Progress, Problems, Priorities, Perspective. Every section is sourced from a register, never hand-typed from memory: value and the north-star rollup from `realize`, Problems from `raid`, Priorities from `roadmap`, and the cost-benefit baseline from `case`. The pack ships with one compressing figure that shows the cadence's key decision. Before it is marked sent, the rendered artifact is opened and every number in it is checked against its source register — a render finishing without error is not evidence the numbers are right.

## How to call it

In Claude Code, type `/report`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A pack that leads with value</div>
<pre><code>VALUE FIRST
  <span class="tok-ok">Inspection turnaround: 6d -&gt; 3.4d (projected 2d, UNMET)
  North-star contribution: +18% inspection throughput</span>
PROGRESS  ... pulled from pickup-protocol + PR activity
PROBLEMS  ... 1 open dependency (raid D-14), see roadmap NEXT
PRIORITIES ... saved-card recall, pending D-14
PERSPECTIVE ... PM's own read, drafted by an agent, owned by the PM</code></pre>
<div class="compare-card-note">A reader who stops after the first section already knows whether the initiative is worth their continued attention, and the miss on turnaround is stated, not smoothed over.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>PROGRESS: shipped 14 PRs, closed 22 tickets, ran 3 grill rounds...
<span class="tok-warn">(pack marked SENT before anyone opened the rendered
 artifact and checked its numbers against the registers)</span></code></pre>
<div class="compare-card-note">A pack that leads with activity is a diary, not a report — and a pack marked sent without the render being checked against its sources is a claim, not a verified number.</div>
</div>
</div>

## In practice

The procedure's last step is explicit: each register check behind a number in the pack may be recorded as a grit gate and run through its checker, so the pack's evidence is re-runnable at the next cadence. The repository's `grit` checker is generic — it reads a `GATES.md` file and reports met, unmet, or unchecked for each gate — so a `report` cadence would record its register checks the same way `grit`'s own fixtures do. The command below is that exact checker, run against the repository's clean fixture, `test/fixtures/grit/clean/GATES.md`. This is a genuine run; the output is pasted unaltered:

```
$ node skills/core/grit/scripts/gate-check.mjs --status test/fixtures/grit/clean/GATES.md
GATES.md: 2 gates
ALL MET (2 met)
```

The command exits 0. The fixture's two gates are generic ("prints its first/second fixed token"), not specific to a report cadence, but the mechanism is exactly the one step 7 describes. A `report` cadence would phrase its own gates as, for instance, "G1: the turnaround figure in Value First matches realize's recorded actual," each with its own CHECK command. It would run the identical `gate-check.mjs --status` command against that cadence's own `GATES.md` before the pack is marked sent.

## How it works

1. **Pull value.** Value and the north-star rollup from `realize`, per the deliver phase. See [`REPORT-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/report/REPORT-METHOD.md) and [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Pull the 4Ps' sources.** Problems from `raid`, Priorities from `roadmap`, cost/benefit baseline from `case`, decisions from `chart` where the initiative is charted.
3. **Pull live pipeline state** — pickup-protocol status, pull requests, stacks — for Progress.
4. **Write the pack**, value first, in the 4Ps structure, routing the drafting pass through `model-routing`. See [`REPORT-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/report/REPORT-METHOD.md).
5. **Compress the cadence's key decision into one figure.** See [`VISUALS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md).
6. **Render** through `Call the Skill tool with "press"`.
7. **Check before sending.** Open the rendered artifact and check every number against its source register, per [`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md); each register check may be recorded as a grit gate and run through its checker. See [`LEDGER.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/LEDGER.md).
