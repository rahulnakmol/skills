---
layout: skill
name: realize
title: "Realize — Track Benefits Against the Case's Projections"
description: "Realize is the user-invoked skill that tracks whether an initiative delivered what its case projected, rolling every benefit up to the practice's north star."
group: pm
invocation: user-invoked
lens:
  novice:
    who: 'You have shipped an initiative and moved on without ever checking whether it delivered what the case said it would. Realize is the register that tracks the answer instead of assuming it.'
    value: 'You get one place that holds every projected benefit next to its actual, so "did this work" has a documented answer instead of a shared impression.'
  practitioner:
    who: 'You own an initiative that is live and need to show its benefits are tracking, not just that it shipped.'
    value: 'Every benefit carries a leading indicator that moves before the lagging outcome does, so you see a divergence during delivery instead of only at the retrospective.'
  leader:
    who: 'You are accountable for several initiatives'' worth of promised value rolling up to one number.'
    value: 'Every benefit rolls up to the north star — efficiency and productivity as transformation value — so you can see the portfolio''s real contribution, not just its activity.'
  csuite:
    who: 'You approved the cases these initiatives were built on and need to know which projections held.'
    value: 'An unmet projection is reported unmet, never quietly resized to fit the actual — the record shows what was promised and what arrived, without the two being reconciled after the fact.'
---

## What it does

Realize tracks whether an initiative actually delivered what its case projected, entering every case-projected benefit into a register with a trace back to the case and the PRD's success metrics. Each benefit carries at least one leading indicator, chosen so a divergence is visible during delivery rather than only at the retrospective, and actuals are recorded as they arrive and compared against `COSTING.md`'s projections on both cost and benefit. Every benefit rolls up to the practice's north star — efficiency and productivity as the overall transformation value. Where a variance is significant, it re-enters `discover` or `carve` as new work, carrying its own case.

## How to call it

In Claude Code, type `/realize`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A projection reported honestly</div>
<pre><code>Benefit: Inspection turnaround 6 days -&gt; 2 days
  Leading indicator: queue depth (tracked weekly)
  Projected: 2 days by end of PI-14
  <span class="tok-warn">Actual: 3.4 days by end of PI-14</span>
  <span class="tok-ok">Status: UNMET. Variance opened as new work in `carve`,
  carrying its own case for closing the 1.4-day gap.</span></code></pre>
<div class="compare-card-note">The actual missed the projection, and the register says so plainly — the gap becomes new, cased work, not a rewritten target.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Benefit: Inspection turnaround 6 days -&gt; 2 days
  <span class="tok-warn">Projected: 6 days -&gt; 3.4 days (revised)
  Actual: 3.4 days
  Status: MET</span></code></pre>
<div class="compare-card-note">Resizing the projection to match the actual erases the miss instead of reporting it — an unmet projection is reported unmet, never resized to fit.</div>
</div>
</div>

## In practice

The output contract calls for `specs/{prefix}-benefits.md` to carry the benefits register, leading indicators, actuals against projection, the north-star rollup, and open variances. Below is the shape that contract requires:

```
# Benefits: field-inspection-copilot

REGISTER
  Benefit: Inspection turnaround 6 days -> 2 days
    Traced to: case (Option A), PRD success metric M-2
    Leading indicator: queue depth (tracked weekly)
    Projected: 2 days by PI-14 end   Actual: 3.4 days
    Status: UNMET

  Benefit: Triage cost $260k/yr -> $95k/yr
    Traced to: case (Option A), PRD success metric M-1
    Leading indicator: tickets auto-triaged per week
    Projected: $95k/yr   Actual: $101k/yr (in progress, PI-15)
    Status: on track, not yet due

NORTH STAR ROLLUP
  Efficiency contribution: +18% on inspection throughput

OPEN VARIANCE
  Turnaround gap of 1.4 days re-opened in `carve` as
  "inspection-copilot-latency-fix", carrying its own case.
```

This is the shape the output contract requires, not a captured run — `realize` has no companion script; the document above is written by the skill directly into the file.

## How it works

1. **Deliver phase.** Enter every case-projected benefit into the register with its trace back to the case and PRD. See [`BENEFITS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/realize/BENEFITS.md) and [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Attach a leading indicator.** At least one per benefit, chosen to move before the lagging outcome does.
3. **Record actuals as they arrive**, compared against [`COSTING.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/case/COSTING.md)'s projections on both cost and benefit. An unmet projection is reported unmet, never resized.
4. **Roll up to the north star** — efficiency and productivity as transformation value.
5. **Loop significant variance back** into `discover` or `carve` as new work, with its own case.
