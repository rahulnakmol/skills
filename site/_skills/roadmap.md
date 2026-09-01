---
layout: skill
name: roadmap
title: "Roadmap — Sequence Initiatives by Outcome and Dependency"
description: "Roadmap is the user-invoked skill that sequences initiatives into now, next, and later horizons by outcome linkage and dependency, not by who asked last."
group: pm
invocation: user-invoked
scenario: "Sequencing the field-inspection-copilot epics across three horizons"
lens:
  novice:
    who: 'You have built a roadmap that was really a wish list against a calendar, and watched a stakeholder reorder it by asking loudly. Roadmap is the discipline that sequences by outcome and dependency instead.'
    value: 'You get three honest horizons — now, next, later — and every item on them traces to the outcome it is meant to move, so "why this order" has an answer that is not "because they asked."'
  practitioner:
    who: 'You maintain a roadmap that stakeholders keep trying to reorder by urgency of ask rather than by dependency.'
    value: 'The dependency board comes straight from `raid` instead of a second copy you maintain by hand, so a slipped dependency shows up in your sequencing the moment it slips.'
  leader:
    who: 'You run a portfolio of initiatives competing for the same capacity.'
    value: 'Every item on every roadmap under you carries outcome linkage and a stated dependency, so a portfolio review compares initiatives on what they move, not on which PM presents most persuasively.'
  csuite:
    who: 'You sit above several roadmaps and need to know the sequencing decision, not just the list of work.'
    value: 'The roadmap ships with one compressing figure that shows the sequencing rationale, so a portfolio-level read takes minutes, not a meeting per initiative.'
---

## What it does

Roadmap sequences initiatives into three horizons — now, next, and later, ranging from what is actively being delivered this cycle to directional work not yet broken down — by outcome linkage and dependency. It ships the compressing figure that shows the sequencing decision, not just a list against a calendar. Every item traces to the objective and key result (OKR) or the benefit it is meant to move; an item with no outcome linkage is a wish, not a roadmap entry. Sequencing reads the dependency board directly from `raid`, the skill that maintains an initiative's risk, assumption, issue, and dependency registers, rather than keeping a second, silently diverging copy. Where the practice runs Program Increment planning — a fixed-length delivery cycle with its own objectives and capacity — the roadmap also carries PI objectives, an iteration map, and stated capacity, and feeds the PI review's outcome into `realize`.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Design phase</span><span class="step-text">Place each item in a horizon — now, next, or later.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Link every item to its outcome</span><span class="step-text">An item with no outcome linkage does not belong on the roadmap.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Sequence by dependency and capacity</span><span class="step-text">Reading the dependency board directly from raid.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Run PI planning</span><span class="step-text">Where the practice uses it — objectives, iteration mapping, stated capacity.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Compress the sequencing decision</span><span class="step-text">Into one figure before shipping.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Feed the outcome forward</span><span class="step-text">The PI review's outcome feeds into realize.</span></div>
</div>

<ul class="benefits">
  <li>Every item on the roadmap traces to the outcome it is meant to move, so "why this order" has a stated answer instead of "because they asked most recently."</li>
  <li>A blocked item moves later the moment its dependency appears in `raid`, instead of a reporting cycle after the fact.</li>
  <li>The compressing figure lets a portfolio-level reader see the sequencing rationale in one look, not a meeting per initiative.</li>
  <li>PI planning output — objectives, capacity, iteration map — feeds directly into `realize`, so the next planning cycle starts from evidence rather than memory.</li>
</ul>

[`ROADMAP.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/roadmap/ROADMAP.md) states the core failure mode plainly: "a timeline with no rationale for its order is a wish list wearing a roadmap's clothes." The same document is explicit about horizon movement: "an item does not move from later to next by being older, only by being ready."

## When to reach for it

Type `/roadmap` in Claude Code, or name the skill directly in a session. Roadmap is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as multiple initiatives or epics needing sequencing against capacity and dependency, or a person asking for a roadmap, a PI plan, or a sequencing rationale.

You reach for it once epics exist and need an order, and again every time `raid`'s dependency register changes in a way that should move something on the board. You also reach for it at the start of each Program Increment, where the practice runs one, to set objectives and capacity before the increment begins.

Roadmap is not the only skill that touches sequencing. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the dependency board this sequencing reads from, not the sequence itself | [`raid`]({{ '/raid/' | relative_url }}) |
| You need the PI review's outcome fed forward, not the sequencing decision itself | [`realize`]({{ '/realize/' | relative_url }}) |
| You need the leadership pack that pulls Priorities straight from this roadmap | [`report`]({{ '/report/' | relative_url }}) |
| You need the epics this roadmap sequences, not the sequencing itself | [`carve`]({{ '/carve/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Roadmap is user-invoked: type <code>/roadmap</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; a sequencing order that ignores a known dependency is caught by reading the roadmap against `raid`'s register, not by an automated check.</p>
<div class="prompt-card">Sequence the field-inspection-copilot epics into now, next, and later. Every item needs an outcome linkage, and read the dependency board straight from raid instead of guessing at what is blocked.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Roadmap returns the three horizons, each item's outcome linkage and dependency state, and the compressing figure that shows the sequencing rationale.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>roadmap</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>roadmap</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/roadmap/SKILL.md and ROADMAP.md, then sequence the field-inspection-copilot epics into now, next, and later, reading the dependency board directly from skills/pm/raid rather than re-deriving it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the roadmap directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to Roadmap; a stale sequence is caught by reading the roadmap against `raid`'s register directly, not by any automated check.</p>
<div class="prompt-card">Sequence the field-inspection-copilot epics into now, next, and later per skills/pm/roadmap/ROADMAP.md. Link every item to its outcome and read the dependency board from raid, not a second copy.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the roadmap directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees Roadmap's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/roadmap/SKILL.md, then sequence the field-inspection-copilot epics into now, next, and later, with outcome linkage on every item and the dependency board read from raid.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the roadmap the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. There is no continuous-integration backstop specific to Roadmap the way <code>grit-gates.yml</code> backstops <code>grit</code>; a stale sequence is caught only by a reader checking it against `raid`'s register.</p>
<div class="prompt-card">Sequence the field-inspection-copilot epics into now, next, and later. Every item needs an outcome, and pull the dependency state directly from the raid register rather than assuming.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the roadmap in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- The epic list or manifest this roadmap sequences, or where it lives.
- Whether `raid`'s dependency register is current, since sequencing reads it directly rather than re-deriving it.
- Whether the practice is running Program Increment planning for this cycle, so objectives and capacity get set alongside the horizons.

Readers who have not installed the whole skill pack can add Roadmap alone:

```bash
./scripts/link-skills.sh --skill roadmap
```

This links only Roadmap into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>Sequence the field-inspection-copilot epics into now, next, and later. Every item needs an outcome linkage, and read the dependency board straight from raid instead of guessing at what is blocked.</code></pre>

Roadmap opens `raid`'s dependency register first, per its own procedure — sequencing is not allowed to guess at what is blocked. The register carries one open dependency, D-09: the platform team's photo-storage API has to ship before the auto-fill report generator can. That single open row moves an otherwise-ready item out of the now horizon:

<pre><code># Roadmap: field-inspection-copilot

NOW (this cycle)
  - Mobile capture flow -&gt; inspection turnaround 6d -&gt; 2d (no open dependency)

NEXT (scoped, waiting on capacity)
  - Auto-fill report generator -&gt; inspection turnaround 6d -&gt; 2d
    <span class="tok-warn">blocked by: platform team's photo-storage API (raid register D-09, open)</span>

LATER (directional)
  - Voice-note transcription -&gt; inspection turnaround 6d -&gt; 2d (not yet broken down)

PI objective: cut inspection turnaround from 6 days to 2 days by end of PI-12.
Capacity: 1 squad, 4 iterations.
[compressing figure: now/next/later swimlane against the dependency board]</code></pre>

This is the shape the output contract requires, not a captured run — Roadmap has no companion script; the document above is written by the skill directly into `specs/{prefix}-roadmap.md`. The auto-fill report generator sits in NEXT rather than NOW for exactly one reason, stated on the roadmap itself: `raid`'s D-09 is still open. If the platform team ships the API, the same register update is what moves the item forward — roadmap does not need to be re-run to notice, only re-read.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A sequence that shows its reasoning</div>
<pre><code>NOW    - Mobile capture flow    outcome: turnaround 6d -&gt; 2d
NEXT   - Auto-fill report gen.  outcome: turnaround 6d -&gt; 2d
         <span class="tok-warn">blocked by: photo-storage API (raid D-09)</span>
LATER  - Voice-note transcription  outcome: turnaround 6d -&gt; 2d
<span class="tok-ok">Auto-fill sits in NEXT, not NOW, because D-09 is
still open in the dependency board.</span></code></pre>
<div class="compare-card-note">The order follows the dependency board, not urgency of ask — and the reason for each placement is visible on the roadmap itself.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>NOW    - Whatever the loudest stakeholder asked for this week
NEXT   - The other loud request
<span class="tok-warn">LATER  - Everything else, in no particular order,
         with no outcome named for any of it</span></code></pre>
<div class="compare-card-note">A timeline with no outcome linkage and no dependency rationale is a wish list wearing a roadmap's clothes, in ROADMAP.md's own words.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if an item has no outcome to trace back to?</summary>
<div class="qa-body">

SKILL.md names this as a stop condition directly: "an item on the roadmap with no outcome linkage." ROADMAP.md explains why it matters: "an item with no outcome linkage is a wish, and a roadmap that is mostly wishes cannot tell a sponsor why this sequence and not another."

</div>
</details>

<details class="qa">
<summary>Can an item move earlier because a stakeholder is pushing hard for it?</summary>
<div class="qa-body">

Not on outcome linkage or urgency of ask alone. ROADMAP.md states the actual sequencing rule: "sequencing is driven by dependency and by stated capacity, not by whichever stakeholder asked most recently. An item blocked by a dependency on another team's unfinished work moves later regardless of its own priority."

</div>
</details>

<details class="qa">
<summary>Why does roadmap read raid's register instead of keeping its own dependency list?</summary>
<div class="qa-body">

ROADMAP.md is direct about this: "the dependency board itself is maintained in raid, and roadmap sequencing reads directly from it rather than keeping a second, silently diverging copy." Two copies of the same fact drift apart; reading the one source does not.

</div>
</details>

<details class="qa">
<summary>Does an item move from later to next just by sitting on the roadmap longer?</summary>
<div class="qa-body">

No. ROADMAP.md states this plainly: "an item does not move from later to next by being older, only by being ready." Age is not a sequencing signal here — readiness against dependency and capacity is.

</div>
</details>

<details class="qa">
<summary>What does Program Increment planning add to the roadmap when the practice runs it?</summary>
<div class="qa-body">

ROADMAP.md names four additions: "PI objectives tied to outcomes, an iteration-level mapping of the now-horizon work, the same dependency board from raid reused rather than re-derived, and stated team capacity per iteration." The PI review at the end of the increment then feeds directly into `realize`.

</div>
</details>

## It's working if

- Every item on the roadmap traces to an outcome, and every placement is explainable by a dependency or capacity fact, not by who asked.
- A dependency slipping in `raid` moves the affected item later the same day, without anyone having to re-run the roadmap by hand.
- The roadmap ships with its compressing figure, not a paragraph pretending to be one.
- Where PI planning runs, objectives and capacity are stated on the roadmap itself, and the PI review's outcome reaches `realize`.

If an item keeps advancing while a known dependency is still open in `raid`, the sequencing has failed even though the roadmap still reads cleanly.

## Where it fits

**Roadmap is where an initiative's epics become an ordered sequence a portfolio can actually plan capacity against.**

Its tightest coupling is to `raid`: the dependency board that decides sequencing lives there, read directly rather than copied, so the two skills move together in practice. `realize` sits downstream of the PI review this skill produces, and `report` pulls its Priorities section straight from whatever horizon this roadmap currently shows.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "sequencing or PI planning" straight to `roadmap`.
