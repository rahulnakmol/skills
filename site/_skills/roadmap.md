---
layout: skill
name: roadmap
title: "Roadmap — Sequence Initiatives by Outcome and Dependency"
description: "Roadmap is the user-invoked skill that sequences initiatives into now, next, and later horizons by outcome linkage and dependency, not by who asked last."
group: pm
invocation: user-invoked
lens:
  novice:
    who: 'You have built a roadmap that was really a wish list against a calendar, and watched a stakeholder reorder it by asking loudly. Roadmap is the discipline that sequences by outcome and dependency instead.'
    value: 'You get three honest horizons — now, next, later — and every item on them traces to the outcome it is meant to move, so "why this order" has an answer that is not "because they asked."'
  practitioner:
    who: 'You maintain a roadmap that stakeholders keep trying to reorder by urgency of ask rather than by dependency.'
    value: 'The dependency board comes straight from `raid` instead of a second copy you maintain by hand, so a slipped dependency shows up in your sequencing the moment it slips.'
  leader:
    who: 'You are accountable for a portfolio of initiatives competing for the same capacity.'
    value: 'Every item on every roadmap under you carries outcome linkage and a stated dependency, so a portfolio review compares initiatives on what they move, not on which PM presents most persuasively.'
  csuite:
    who: 'You sit above several roadmaps and need to know the sequencing decision, not just the list of work.'
    value: 'The roadmap ships with one compressing figure that shows the sequencing rationale, so a portfolio-level read takes minutes, not a meeting per initiative.'
---

## What it does

Roadmap sequences initiatives into three horizons — now, next, and later — by outcome linkage and dependency, and ships the compressing figure that shows the sequencing decision, not just a list against a calendar. Every item traces to the OKR or benefit it is meant to move; an item with no outcome linkage is a wish, not a roadmap entry. Sequencing reads the dependency board directly from `raid` rather than keeping a second, silently diverging copy, so a blocked item moves later the moment the block appears. Where the practice runs Program Increment planning, the roadmap also carries PI objectives, an iteration map, and stated capacity, and feeds the PI review's outcome into `realize`.

## How to call it

In Claude Code, type `/roadmap`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A sequence that shows its reasoning</div>
<pre><code>NOW    - Retry flow v2      outcome: checkout completion +4pt
NEXT   - Saved-card recall  outcome: checkout completion +4pt
         <span class="tok-warn">blocked by: payments-team token API (raid D-14)</span>
LATER  - One-tap resume     outcome: checkout completion +4pt
<span class="tok-ok">Saved-card recall sits in NEXT, not NOW, because D-14 is
still open in the dependency board.</span></code></pre>
<div class="compare-card-note">The order follows the dependency board, not urgency of ask — and the reason for each placement is visible on the roadmap itself.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>NOW    - Whatever the loudest stakeholder asked for this week
NEXT   - The other loud request
<span class="tok-warn">LATER  - Everything else, in no particular order,
         with no outcome named for any of it</span></code></pre>
<div class="compare-card-note">A timeline with no outcome linkage and no dependency rationale is a wish list wearing a roadmap's clothes.</div>
</div>
</div>

## In practice

The output contract calls for `specs/{prefix}-roadmap.md` plus its compressing figure: horizons, outcome linkage, dependency-aware sequence, and PI objectives where applicable. Below is the shape that contract requires:

```
# Roadmap: Q3 checkout initiatives

NOW (this cycle)
  - Retry flow v2 -> checkout completion +4pt (no open dependency)

NEXT (scoped, waiting on capacity)
  - Saved-card recall -> checkout completion +4pt
    blocked by: payments-team token API (raid register D-14, open)

LATER (directional)
  - One-tap resume -> checkout completion +4pt (not yet broken down)

PI objective: lift checkout completion 4 points by end of PI-14.
Capacity: 2 squads, 6 iterations.
[compressing figure: now/next/later swimlane against the dependency board]
```

This is the shape the output contract requires, not a captured run — `roadmap` has no companion script; the document above is written by the skill directly into the file.

## How it works

1. **Design phase.** Place each item in now, next, or later. See [`ROADMAP.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/roadmap/ROADMAP.md) and [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Link every item to its outcome.** An item with no outcome linkage does not belong on the roadmap.
3. **Sequence by dependency and capacity**, reading the dependency board directly from `raid`. See [`RAID-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/raid/RAID-METHOD.md).
4. **Run PI planning** where the practice uses it — objectives, iteration mapping, stated capacity — routing each step's model tier through `model-routing`.
5. **Compress the sequencing decision into one figure** before shipping. See [`VISUALS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md).
6. **Feed the PI review's outcome into `realize`.**
