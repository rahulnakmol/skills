---
layout: skill
name: realize
title: "Realize — Track Benefits Against the Case's Projections"
description: "Realize is the user-invoked skill that tracks whether an initiative delivered what its case projected, rolling every benefit up to the practice's north star."
group: pm
invocation: user-invoked
scenario: "Closing the loop on QuenServe epic E1's promised value"
lens:
  novice:
    who: 'You have shipped an initiative and moved on without ever checking whether it delivered what the case said it would. Realize is the register that tracks the answer instead of assuming it.'
    value: 'You get one place that holds every projected benefit next to its actual, so "did this work" has a documented answer instead of a shared impression.'
  practitioner:
    who: 'You own an initiative that is live and need to show its benefits are tracking, not just that it shipped.'
    value: 'Every benefit carries a leading indicator that moves before the lagging outcome does, so you see a divergence during delivery instead of only at the retrospective.'
  leader:
    who: 'Several initiatives under you each promised value, and all of it has to roll up to one number.'
    value: 'Every benefit rolls up to the north star — efficiency and productivity as transformation value — so you can see the portfolio''s real contribution, not just its activity.'
  csuite:
    who: 'You approved the cases these initiatives were built on and need to know which projections held.'
    value: 'An unmet projection is reported unmet, never quietly resized to fit the actual — the record shows what was promised and what arrived, without the two being reconciled after the fact.'
---

## What it does

Realize tracks whether an initiative actually delivered what its case projected, entering every case-projected benefit into a register with a trace back to the case and the product requirements document's success metrics. Each benefit carries at least one leading indicator — a signal chosen because it moves before the lagging, final outcome does — so a divergence is visible during delivery rather than only at the retrospective. Actuals are recorded as they arrive and compared against `COSTING.md`'s projections on both cost and benefit. Every benefit rolls up to the practice's north star: efficiency and productivity as the overall transformation value the practice exists to deliver. Where a variance is significant, it re-enters `discover` or `carve` as new work, carrying its own case.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Deliver phase</span><span class="step-text">Enter every case-projected benefit into the register with its trace back to the case and PRD.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Attach a leading indicator</span><span class="step-text">At least one per benefit, chosen to move before the lagging outcome does.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Record actuals as they arrive</span><span class="step-text">Compared against COSTING.md's projections on both cost and benefit.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Roll up to the north star</span><span class="step-text">Efficiency and productivity as transformation value.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Loop significant variance back</span><span class="step-text">Into discover or carve as new work, with its own case.</span></div>
</div>

<ul class="benefits">
  <li>"Did this work" gets a documented answer, projection next to actual, instead of a shared impression nobody can point to later.</li>
  <li>A divergence between projection and reality is visible during delivery, because the leading indicator moves before the lagging outcome does.</li>
  <li>Every benefit rolls up to the practice's one north star, so a portfolio's real contribution is legible next to its activity.</li>
  <li>A missed projection stays a missed projection on the record — it becomes new, cased work through `discover` or `carve` instead of a target quietly redrawn to match what shipped.</li>
</ul>

[`BENEFITS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/realize/BENEFITS.md) states the practice's real accountability plainly: "the gates get an initiative approved and delivered; realize is where the practice finds out whether any of it was actually worth it." SKILL.md's own procedure is just as direct about what an unmet projection is not allowed to become: "an unmet projection is reported unmet rather than resized to fit."

## When to reach for it

Type `/realize` in Claude Code, or name the skill directly in a session. Realize is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as an initiative that is live and whose benefits need tracking against projection, or a person asking for a benefits update, a north-star rollup, or a PI review.

You reach for it once an initiative's case is approved and delivery has started producing real signal, so the register can carry actuals from the first leading indicator onward. You reach for it again at every cadence `report` runs, since its Value First section is sourced from this register directly.

Realize is not the only skill that touches whether something worked. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the case whose projections this register checks actuals against | [`case`]({{ '/case/' | relative_url }}) |
| You need to open a significant variance as new, cased work — not just record it | [`carve`]({{ '/carve/' | relative_url }}) |
| You need the leadership pack that pulls Value First straight from this register | [`report`]({{ '/report/' | relative_url }}) |
| You need the dependency or risk that might be causing the variance, not the variance itself | [`raid`]({{ '/raid/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same realize skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want Realize can skip the rest of the catalog with `./scripts/link-skills.sh --skill realize`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command, no stop hook</span></div>
<div class="tool-group-body">
<p>Realize is user-invoked: type <code>/realize</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; the discipline that an unmet projection is reported unmet rests on the register being read honestly, not on any automated check.</p>
<div class="prompt-card">QuenServe epic E1 has been live for one PI. Record this cycle's actuals against the case's projections for inspection turnaround and triage cost, and report either figure unmet plainly if it missed, rather than resizing the target.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Realize records the actuals against the case's original projections, states each benefit's status honestly, and rolls the result up to the north star.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Catalog reader, no command file</span></div>
<div class="tool-group-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>realize</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>realize</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/realize/SKILL.md and BENEFITS.md, then record this PI's actuals against QuenServe epic E1's case projections, reporting any miss as unmet rather than resizing the target.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the register update directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply Realize as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor routes model choice through its own <code>auto</code> mode; Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>; GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>. None gets a continuous-integration backstop specific to Realize the way <code>grit-gates.yml</code> backstops <code>grit</code>; an honestly reported unmet projection depends entirely on the register being read carefully.</p>
<div class="prompt-card">Following skills/pm/realize/BENEFITS.md, check QuenServe epic E1's benefits register against the case that funded it. Inspection turnaround was projected at 2 days and came in at 3.4. Record that as unmet, name the leading indicator that should have shown the gap earlier, and roll the cycle up to the north star.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the register update directly in their reply, since none has a command's output to parse.</p>
</div>
</div>

A good ask includes:

- The case this initiative was approved against, or where its projections live.
- The leading indicator already chosen for each benefit, or a request for realize to propose one.
- Whether a variance this cycle is significant enough to loop back into `discover` or `carve` as new work.

## A working example

The projections being checked are the ones `case` wrote for epic E1, offline inspection sync, on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. You type:

<pre><code>QuenServe epic E1 has been live for one PI. Record this cycle's actuals against the case's projections for inspection turnaround and triage cost, and report either figure unmet plainly if it missed, rather than resizing the target.</code></pre>

A PI is a program increment: the fixed planning cycle these teams deliver in. Realize opens the case's original projections — 6 days down to 2 days on turnaround, $260k down to $95k a year on triage cost — and records this cycle's actuals against them exactly as they were originally stated, per `BENEFITS.md`'s trace-back rule:

<pre><code># Benefits: e1-offline-inspection-sync

REGISTER
  Benefit: Inspection turnaround 6 days -&gt; 2 days
    Traced to: case (Option A), PRD success metric M-2
    Leading indicator: queue depth (tracked weekly)
    Projected: 2 days by PI-12 end   Actual: 3.4 days
    <span class="tok-warn">Status: UNMET</span>

  Benefit: Triage cost $260k/yr -&gt; $95k/yr
    Traced to: case (Option A), PRD success metric M-1
    Leading indicator: tickets auto-triaged per week
    Projected: $95k/yr   Actual: $101k/yr (in progress, PI-13)
    Status: on track, not yet due

NORTH STAR ROLLUP
  Efficiency contribution: +18% on inspection throughput

OPEN VARIANCE
  <span class="tok-ok">Turnaround gap of 1.4 days re-opened in `carve` as
  "e1-offline-sync-latency-fix", carrying its own case.</span></code></pre>

This is the shape the output contract requires, not a captured run — Realize has no companion script; the document above is written by the skill directly into `specs/{prefix}-benefits.md`. The turnaround projection missed by 1.4 days, and the register says so in exactly those words — UNMET, not a revised target that would have read MET. SKILL.md's procedure states this as a rule, not a preference: an unmet projection is reported unmet rather than resized to fit. The gap becomes a new entry in `carve` carrying its own case — the same discipline that opened this initiative in the first place, now applied to the gap it left behind.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A projection reported honestly</div>
<pre><code>Benefit: Inspection turnaround 6 days -&gt; 2 days
  Leading indicator: queue depth (tracked weekly)
  Projected: 2 days by end of PI-12
  <span class="tok-warn">Actual: 3.4 days by end of PI-12</span>
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

## Common questions

<details class="qa">
<summary>Why can a projection never be quietly resized to match the actual?</summary>
<div class="qa-body">

SKILL.md's procedure states the rule directly: "an unmet projection is reported unmet rather than resized to fit." Resizing the target after the fact would let every case pass its own review retroactively, which defeats the reason the projection was written down before delivery started.

</div>
</details>

<details class="qa">
<summary>What if a benefit has no leading indicator yet?</summary>
<div class="qa-body">

SKILL.md names this as a stop condition: "a benefit with no leading indicator." BENEFITS.md explains what is lost without one: "waiting for the lagging benefit to arrive means finding out too late that a projection was wrong" — the indicator is what makes the divergence visible during delivery instead of at the retrospective.

</div>
</details>

<details class="qa">
<summary>What if an initiative cannot state its contribution to the north star at all?</summary>
<div class="qa-body">

SKILL.md's second stop condition covers exactly this: "an initiative that cannot state its north-star contribution — raise it in the grill instead." BENEFITS.md agrees: "an initiative that cannot state its contribution to the north star is a question for the grill, not an entry that gets a pass."

</div>
</details>

<details class="qa">
<summary>What happens to a significant variance once it is recorded?</summary>
<div class="qa-body">

BENEFITS.md is explicit: "it re-enters discover or carve as new work, carrying its own case for why closing the gap is worth doing — the same discipline that opened the initiative in the first place, now applied to the gap it left behind." A variance is a finding, not a footnote.

</div>
</details>

<details class="qa">
<summary>How does realize keep cost and benefit from telling two different stories?</summary>
<div class="qa-body">

BENEFITS.md states this is the entire point of the register's second half: "the register tracks actuals against COSTING.md's projections on both sides of the ledger, cost and benefit together, so the transformation-value story never separates from the cost story." Both sides live in the same document, checked against the same original numbers.

</div>
</details>

## It's working if

- Every benefit in the register carries a leading indicator that moved before the lagging outcome was known.
- A miss reads UNMET on the page, next to the original projection, not a revised number recorded as MET.
- A significant variance shows up as a new entry in `discover` or `carve`, carrying its own case, rather than sitting in the register unaddressed.
- Every benefit's contribution to the north star is stated, not assumed, and an initiative that cannot state one gets raised in the grill instead of a pass.

If a projection and its actual ever get reconciled quietly — the target rewritten instead of the miss reported — the discipline has failed even though the register still shows green.

## Where it fits

**Realize is where the practice closes the loop a case opened: not whether the work shipped, but whether it was actually worth doing.**

Its tightest coupling is to `case`: every projection in this register traces back to a line that skill wrote, and this is where that line gets checked against reality. `report` pulls its Value First section straight from this register at every cadence, and a significant variance loops back into `discover` or `carve` as new work rather than staying filed here unaddressed.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "benefits or north-star tracking" straight to `realize`.
