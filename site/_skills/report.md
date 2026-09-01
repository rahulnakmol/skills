---
layout: skill
name: report
title: "Report — Produce the 4Ps Leadership Pack"
description: "Report is the user-invoked skill that produces the value-first, 4Ps leadership pack from the registers, and checks every number before it ships."
group: pm
invocation: user-invoked
scenario: "Reporting the field-inspection-copilot initiative to leadership"
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

Report produces the leadership pack at whatever cadence is due — weekly, fortnightly, quarterly, half-yearly, or yearly, each read at its own altitude — structured as value first, then the 4Ps: Progress, Problems, Priorities, Perspective. Every section is sourced from a register, never hand-typed from memory: value and the north-star rollup — the practice's single measure of efficiency and productivity — from `realize`, Problems from `raid`, Priorities from `roadmap`, and the cost-benefit baseline from `case`. The pack ships with one compressing figure that shows the cadence's key decision. Before it is marked sent, the rendered artifact is opened and every number in it is checked against its source register — a render finishing without error is not evidence the numbers are right.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Pull value</span><span class="step-text">Value and the north-star rollup from realize.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Pull the 4Ps' sources</span><span class="step-text">Problems from raid, Priorities from roadmap, cost/benefit baseline from case.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Pull live pipeline state</span><span class="step-text">Pickup-protocol status — where each work item stands on the tracker — plus pull requests and stacks, for Progress.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Write the pack</span><span class="step-text">Value first, in the 4Ps structure, routing the drafting pass through model-routing.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Compress the key decision</span><span class="step-text">Into one figure before shipping.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Render</span><span class="step-text">Through the Skill tool, calling press.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Check before sending</span><span class="step-text">Open the rendered artifact and check every number against its source register.</span></div>
</div>

<ul class="benefits">
  <li>A reader who stops after the first section already knows whether the initiative is worth their continued attention, because value comes before any list of activity.</li>
  <li>Every figure in the pack traces back to `realize`, `raid`, `roadmap`, or `case` — never typed from memory the night before a cadence is due.</li>
  <li>Every pack carries the same 4Ps structure and one compressing figure, so a portfolio review compares initiatives on value moved, not on formatting choices.</li>
  <li>A register check behind any figure can be recorded as a runnable gate and re-run at the next cadence, so the pack's evidence does not expire with the meeting it was read in.</li>
</ul>

[`REPORT-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/report/REPORT-METHOD.md) opens with the failure mode this skill exists to avoid: "a status update that leads with activity is not a report, it is a diary." It states the fix for the Perspective section just as plainly: "an agent may draft it, but the PM owns what it says, because a leadership pack with no human perspective in it is just a dashboard with a cover page."

## When to reach for it

Type `/report` in Claude Code, or name the skill directly in a session. Report is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as a reporting cadence coming due, or a person asking for a status update, a steering pack, or a leadership update.

You reach for it once `realize`, `raid`, `roadmap`, and `case` all hold current state for the cadence in question — the pack is only as accurate as the registers it pulls from. You reach for it again immediately after a render, since the procedure's own last step is to open the artifact and check its numbers before the pack is ever marked sent.

Report is not the only skill that touches a status update. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the benefits register this pack's Value First section is sourced from | [`realize`]({{ '/realize/' | relative_url }}) |
| You need the risk and issue register this pack's Problems section is sourced from | [`raid`]({{ '/raid/' | relative_url }}) |
| You need the sequencing this pack's Priorities section is sourced from | [`roadmap`]({{ '/roadmap/' | relative_url }}) |
| You need the renderer that turns the approved pack into a polished artifact | [`press`]({{ '/press/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Report is user-invoked: type <code>/report</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; the procedure's last step, opening the rendered artifact and checking every number against its source register, is the only thing standing between a fast render and a sent pack with a wrong figure in it.</p>
<div class="prompt-card">The field-inspection-copilot initiative is due for its quarterly leadership pack. Pull value from realize, Problems from raid, Priorities from roadmap, and the cost baseline from case. Lead with value, then the 4Ps, and do not mark it sent until I have checked the rendered numbers against the registers myself.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Report returns the value-first, 4Ps pack sourced from the four registers, renders it, and stops short of marking it sent until the numbers are checked.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>report</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>report</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/report/SKILL.md and REPORT-METHOD.md, then produce the quarterly leadership pack for field-inspection-copilot, value first, sourced from realize, raid, roadmap, and case.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the pack directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to Report; the pre-send number check depends on a person actually running it, not on any automated gate.</p>
<div class="prompt-card">Produce the quarterly leadership pack for field-inspection-copilot per skills/pm/report/REPORT-METHOD.md — value first, then the 4Ps, sourced from realize, raid, roadmap, and case.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the pack directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees Report's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/report/SKILL.md, then produce the quarterly leadership pack for field-inspection-copilot, value first, sourced from realize, raid, roadmap, and case.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the pack the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. There is no continuous-integration backstop specific to Report the way <code>grit-gates.yml</code> backstops <code>grit</code>; the pre-send number check is a step in the procedure, not something a workflow enforces on its own.</p>
<div class="prompt-card">Produce the quarterly leadership pack for field-inspection-copilot. Lead with value, then the 4Ps, sourced from realize, raid, roadmap, and case, and flag it as not ready to send until the rendered numbers are checked.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the pack in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- The cadence due — weekly, fortnightly, quarterly, half-yearly, or yearly — since each reads at a different altitude.
- Confirmation that `realize`, `raid`, `roadmap`, and `case` are current for this initiative, since the pack is sourced from them directly.
- Whether a chart exists for this initiative, since `chart`'s decisions feed the pack where one does.

Readers who have not installed the whole skill pack can add Report alone:

```bash
./scripts/link-skills.sh --skill report
```

This links only Report into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>The field-inspection-copilot initiative is due for its quarterly leadership pack. Pull value from realize, Problems from raid, Priorities from roadmap, and the cost baseline from case. Lead with value, then the 4Ps, and do not mark it sent until I have checked the rendered numbers against the registers myself.</code></pre>

Report pulls each section from its named register — `realize`'s unmet turnaround projection for Value First, `raid`'s open dependency for Problems, `roadmap`'s NEXT-horizon item for Priorities — and writes the pack value first, per `REPORT-METHOD.md`:

<pre><code>VALUE FIRST
  <span class="tok-warn">Inspection turnaround: 6d -&gt; 3.4d (projected 2d, UNMET)</span>
  <span class="tok-ok">North-star contribution: +18% inspection throughput</span>
PROGRESS    ... mobile capture flow shipped; pickup-protocol status attached
PROBLEMS    ... 1 open dependency (raid D-09), see roadmap NEXT
PRIORITIES  ... auto-fill report generator, pending D-09
PERSPECTIVE ... PM's own read, drafted by an agent, owned by the PM</code></pre>

This is not the last step. Step 7 of the procedure is explicit that a render finishing without error is not evidence the numbers in it are right — the artifact still has to be opened and checked against the registers before it is marked sent. The mechanism that makes that check re-runnable at every future cadence is `grit`'s own checker script, `gate-check.mjs`, which reads a ledger of gates and reports met, unmet, or unchecked for each one. Run here, moments ago, against the repository's clean fixture — a ledger built to exercise this exact mechanism — the output is pasted unaltered:

<pre><code><span class="tok-comment">$ node skills/core/grit/scripts/gate-check.mjs --status test/fixtures/grit/clean/GATES.md</span>
GATES.md: 2 gates
<span class="tok-ok">ALL MET (2 met)</span></code></pre>

The command exits 0. The fixture's two gates are generic ("prints its first/second fixed token"), not specific to a report cadence, but the mechanism is exactly what step 7 describes. A `report` cadence would phrase its own gates as, for instance, "G1: the turnaround figure in Value First matches realize's recorded actual," each with its own CHECK command. It would run this identical `gate-check.mjs --status` command against that cadence's own `GATES.md` before the pack is marked sent.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A pack that leads with value</div>
<pre><code>VALUE FIRST
  <span class="tok-ok">Inspection turnaround: 6d -&gt; 3.4d (projected 2d, UNMET)
  North-star contribution: +18% inspection throughput</span>
PROGRESS  ... pulled from pickup-protocol + PR activity
PROBLEMS  ... 1 open dependency (raid D-09), see roadmap NEXT
PRIORITIES ... auto-fill report generator, pending D-09
PERSPECTIVE ... PM's own read, drafted by an agent, owned by the PM</code></pre>
<div class="compare-card-note">A reader who stops after the first section already knows whether the initiative is worth their continued attention, and the miss on turnaround is stated, not smoothed over.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>PROGRESS: shipped 4 PRs, closed 11 tickets, ran 2 grill rounds...
<span class="tok-warn">(pack marked SENT before anyone opened the rendered
 artifact and checked its numbers against the registers)</span></code></pre>
<div class="compare-card-note">A pack that leads with activity is a diary, not a report — and a pack marked sent without the render being checked against its sources is a claim, not a verified number.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why can't the pack lead with what the team worked on?</summary>
<div class="qa-body">

REPORT-METHOD.md states the rule and the reasoning together: "the pack opens with value, not activity... only after value is stated does the pack move to what was worked on. A reader who stops after the first section should already know whether the initiative is worth their continued attention."

</div>
</details>

<details class="qa">
<summary>Can the Perspective section be written entirely by an agent?</summary>
<div class="qa-body">

No. SKILL.md names this as a stop condition directly: "a Perspective section drafted entirely by an agent with no PM judgment applied." REPORT-METHOD.md explains why: "a leadership pack with no human perspective in it is just a dashboard with a cover page."

</div>
</details>

<details class="qa">
<summary>Is a render that finishes without error enough to mark the pack sent?</summary>
<div class="qa-body">

No. SKILL.md's stop conditions include "a pack marked sent without the rendered artifact having been opened and checked against its source registers," citing `core/VERIFICATION.md`'s rule that a render finishing without error is not evidence the numbers in it are right.

</div>
</details>

<details class="qa">
<summary>What if the pack has no compressing figure?</summary>
<div class="qa-body">

SKILL.md lists this as its own stop condition: "a pack with no compressing figure." REPORT-METHOD.md is direct about what that omission leaves behind: "a leadership pack without one is text pretending to be a briefing."

</div>
</details>

<details class="qa">
<summary>Does every cadence read the same way?</summary>
<div class="qa-body">

No. REPORT-METHOD.md names five, each at its own altitude: weekly and fortnightly stay at team-level Progress and Problems, quarterly adds Priorities and north-star trend, half-yearly adds portfolio-level Perspective, and yearly carries the full transformation-value story. "A weekly pack that tries to carry yearly altitude buries the reader in noise; a yearly pack that stays at weekly altitude buries the decision."

</div>
</details>

<details class="qa">
<summary>Can a register check behind a number be re-run later, or does it only prove the number once?</summary>
<div class="qa-body">

It can be re-run. SKILL.md's last procedure step states each register check "may be recorded as a grit gate and run through its checker, so the pack's evidence is re-runnable at the next cadence." That is the same `gate-check.mjs --status` command shown above against the repository's own clean fixture, which any cadence's `GATES.md` would run the identical way.

</div>
</details>

## It's working if

- Every pack opens with value and the north-star contribution, before any section describing what was worked on.
- Every figure in the pack traces to `realize`, `raid`, `roadmap`, or `case`, and a reader can name which register any number came from.
- The Perspective section carries a judgment call a PM actually made, not only what an agent drafted unchanged.
- No pack is marked sent until the rendered artifact has been opened and its numbers checked against the source registers.

If a pack ever gets marked sent straight off a clean render, without anyone opening the artifact and checking its numbers, the discipline has failed even though the pack itself shipped on time.

## Where it fits

**Report is the point where four separate registers — realize, raid, roadmap, and case — become one artifact a leader can act on in the time they actually have.**

It reads from all four directly, never hand-assembling a number from memory, and renders through `press`, the skill that turns an approved document into a branded, shareable artifact. This is the last step of the `run-a-product-org` journey: `discover` finds the problem, `carve` cuts it into epics, `case` builds the investment case, and this is where progress against all of it reaches leadership.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "leadership update or steering pack" straight to `report`.
