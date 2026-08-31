---
layout: skill
name: chart
title: "Chart — Decision Tickets for Oversized Initiatives"
description: "Chart turns an initiative too large for one pass into decision tickets on a tracker, resolved one at a time by a PM and an agent team."
group: pm
invocation: user-invoked
lens:
  novice:
    who: "You've inherited an initiative with no plan, just a folder of notes and a sponsor asking when it will be done."
    value: "Chart turns that into a tracker issue with a stated destination and a first pass of decisions to make, so you start from a plan instead of a blank page."
  practitioner:
    who: "You run initiatives that outlast any single agent session, and your plan currently lives half in your head and half in stale notes."
    value: "The chart survives the session that wrote it. Resolving a decision ticket is the same act as updating the plan, so nothing drifts out of sync with what you actually decided."
  leader:
    who: "You have several PMs running concurrent agent sessions against the same initiative, and you need to know what is actually claimed versus just sitting open."
    value: "Ready, blocked, claimed, and closed are readable straight off the tracker, so a sponsor's status question stops requiring anyone to write an update."
  csuite:
    who: "You fund transformation work whose scope is too large to plan in one sitting and want confidence the plan itself is disciplined."
    value: "More than roughly 25 open tickets at once is a stop condition, not a target — chart says the destination is too wide rather than quietly ballooning the plan."
---

## What it does

Chart turns work no single agent session can hold into a chart of decision tickets, then resolves them one at a time until nothing is left to decide. Chart mode takes one breadth-first pass across an initiative, names the destination that has to exist for the effort to be over, and sorts what it finds into tickets, known unknowns, and out-of-scope work — deciding nothing itself. Advance mode then claims one ready ticket per session, resolves it through the pm skill that owns its method, and records the answer as a one-line index entry linking back to the ticket that holds the reasoning. The chart is deliberately an index, not a store: each decision lives in exactly one place, so its body stays cheap to re-read at the start of every session.

## How to call it

In Claude Code, type `/chart`. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A ticket sized to one decision</div>
<pre><code><span class="tok-ok">Ticket: "Which billing provider"</span>
One question. One resolution comment.
Claimed before work starts, closed with
the answer as a comment.</code></pre>
<div class="compare-card-note">The single-answer test: the resolution can be written as one decision.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Ticket: "Which billing provider, and how</span>
<span class="tok-warn">        do we migrate to it"</span>
Two decisions in one ticket — the second
usually depends on the first.</code></pre>
<div class="compare-card-note">This is the most common sizing failure, and it fails quietly: the session runs out of room and records a partial answer.</div>
</div>
</div>

## In practice

Chart has no fixture to replay, so this is the shape its own output contract requires, filled in for an illustrative initiative rather than a captured run:

<pre><code>chart: specs/chart/checkout-chart.md
destination: "Decide the payments migration path and get every
  affected team's sign-off before Investment."
hat: product
gate: investment
tickets: { ready: 3, blocked: 2, claimed: 1, closed: 6 }
known_unknowns: 2
mode: advance
decided: "Chose Stripe over Adyen: lower integration cost,
  PCI scope already covered."</code></pre>

## How it works

1. **Name the destination.** State in one or two sentences what has to exist for the effort to be over, classify the hat, and name the gate it feeds. See [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) and [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
2. **One breadth pass, not a deep one.** A single grill pass across the whole initiative surfaces the open decisions without answering any of them.
3. **Sort into three buckets.** A question you can state precisely today becomes a ticket; one you can only gesture at becomes a known unknown; anything past the destination is out of scope. See [`CHART.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/CHART.md).
4. **Type and route each ticket.** Evidence, option, alignment, or enablement decide who resolves it and whether it runs in parallel. See [`TICKETS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/chart/TICKETS.md) and [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md).
5. **Advance mode resolves one ticket at a time.** Claim it, run the pre-gate blind-spot checklist, and record the decision as a one-line index entry with a link. See [`AGENT-OWNERSHIP.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/AGENT-OWNERSHIP.md).
