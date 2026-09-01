---
layout: skill
name: raid
title: "RAID — Track Risks, Assumptions, Issues, and Dependencies"
description: "RAID is the user-invoked skill that maintains the four registers behind an initiative's derailment risks and generates the sponsor status narrative directly from them."
group: pm
invocation: user-invoked
scenario: "Tracking risk and dependency on the field-inspection-copilot rollout"
lens:
  novice:
    who: 'A risk gets raised once in a meeting, never written down, and then it happens. RAID is the habit of logging it the moment it surfaces, with an owner attached.'
    value: 'You get four registers — Risks, Assumptions, Issues, Dependencies — that hold what could derail the work, so nothing important lives only in someone''s memory or a chat thread.'
  practitioner:
    who: 'You are asked for a sponsor status update every reporting cycle and currently reconstruct it from memory each time.'
    value: 'The two-minute status narrative is generated directly from the four registers, so it can never quietly drift from what the registers actually say — if they disagree, the register is right.'
  leader:
    who: 'You manage several initiatives, each with its own set of risks that could compound across them.'
    value: 'Every risk in every register carries a named owner and a mitigation, not just a description — you can see at a glance which risks have no one actually managing them.'
  csuite:
    who: 'You are accountable when a known risk materializes and the record shows nobody was tracking it.'
    value: 'A risk with no owner is visible as a gap in the register itself, not discovered after the fact during an incident review.'
---

## What it does

RAID maintains the four registers that keep an initiative's derailment risks visible, owned, and mitigated: Risks, Assumptions, Issues, and Dependencies. Every entry carries a named owner — a risk with no owner is treated as unmanaged, not merely undocumented — and risks carry a mitigation, assumptions carry a validation point, and issues carry a path to resolution. The Dependencies register is what `roadmap`, the skill that sequences initiatives into now, next, and later horizons, reads directly for its sequencing board, so a slipped dependency shows up in the roadmap the moment it slips, not a reporting cycle later. RAID also generates the two-minute sponsor status narrative directly from the four registers, never hand-assembled from memory.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Log the entry</span><span class="step-text">Risk, assumption, issue, or dependency, with an owner and, for risks, a mitigation.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Keep dependencies current</span><span class="step-text">roadmap reads this register directly for its sequencing board.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Review stalled entries</span><span class="step-text">Escalate an issue with no recent movement to its owner.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Generate the sponsor narrative</span><span class="step-text">Directly from the four registers, never hand-assembled separately.</span></div>
</div>

<ul class="benefits">
  <li>Nothing that could derail the initiative lives only in someone's memory or a chat thread — every risk, assumption, issue, and dependency has one place it is written down.</li>
  <li>A risk with no owner is visible in the register itself as a gap, not discovered for the first time during an incident review.</li>
  <li>A slipped dependency reaches `roadmap`'s sequencing the moment it slips, because roadmap reads this register directly instead of a copy someone updates separately.</li>
  <li>The sponsor status narrative can never drift from the registers, because it is generated from them rather than written from memory each cycle.</li>
</ul>

[`RAID-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/raid/RAID-METHOD.md) states the discipline's core rule in one line: "every entry carries an owner, because a risk with no owner is a risk nobody actually manages." The same document is direct about what an unowned, stalled issue signals: "an issue sitting in the register with no owner and no movement across several reporting cycles is the clearest sign a status update is being generated rather than acted on."

## When to reach for it

Type `/raid` in Claude Code, or name the skill directly in a session. RAID is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as a new risk, assumption, issue, or dependency surfacing during delivery, or a person asking for a status update or a sponsor narrative.

You reach for it the moment something that could derail the initiative surfaces — in a meeting, a pull request comment, a stand-up — before it has a chance to live only in someone's memory. You reach for it again on every reporting cadence, to generate the sponsor narrative from the registers rather than reconstruct it by hand.

RAID is not the only skill that touches an initiative's risk picture. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the sequencing decision this dependency board feeds, not the register itself | [`roadmap`]({{ '/roadmap/' | relative_url }}) |
| You need the leadership pack that pulls Problems straight from this register | [`report`]({{ '/report/' | relative_url }}) |
| You need to track a delivered benefit's variance, not a risk or an open dependency | [`realize`]({{ '/realize/' | relative_url }}) |
| You need the sensitivity assumption a business case rests on, not an ongoing risk register | [`case`]({{ '/case/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>RAID is user-invoked: type <code>/raid</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; an unowned risk stays visible only because the register itself shows the gap, not because anything blocks the session.</p>
<div class="prompt-card">A field connectivity risk just came up on the field-inspection-copilot rollout — rural sites may lose sync mid-inspection. Log it in the risk register with a likelihood, an impact, an owner, and a mitigation, then regenerate the sponsor status narrative from all four registers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>RAID logs the entry into the correct register with an owner attached, then regenerates the narrative directly from the four registers rather than editing it by hand.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>raid</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>raid</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/raid/SKILL.md and RAID-METHOD.md, then log this new risk on the field-inspection-copilot rollout and regenerate the sponsor status narrative directly from the four registers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the register update directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to RAID; an unowned entry is caught by a reader scanning the register, not by any automated check.</p>
<div class="prompt-card">Log this new risk in the field-inspection-copilot RAID register per skills/pm/raid/RAID-METHOD.md, with a named owner and mitigation, then regenerate the sponsor narrative from all four registers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the register update directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees RAID's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/raid/SKILL.md, then log this new field-inspection-copilot risk with an owner and mitigation, and regenerate the sponsor status narrative from the four registers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the register update the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. There is no continuous-integration backstop specific to RAID the way <code>grit-gates.yml</code> backstops <code>grit</code>; an unowned entry is caught only by a reader checking the register.</p>
<div class="prompt-card">Log this new risk on the field-inspection-copilot rollout in the correct RAID register, with an owner and mitigation, then regenerate the sponsor narrative from all four registers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot writes the register update in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- Which register the new entry belongs in — risk, assumption, issue, or dependency — or enough detail for that to be obvious.
- The owner responsible for it, since an entry logged without one is a stop condition, not a formality to add later.
- Whether the sponsor narrative needs regenerating now or only at the next cadence.

Readers who have not installed the whole skill pack can add RAID alone:

```bash
./scripts/link-skills.sh --skill raid
```

This links only RAID into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>A field connectivity risk just came up on the field-inspection-copilot rollout — rural sites may lose sync mid-inspection. Log it in the risk register with a likelihood, an impact, an owner, and a mitigation, then regenerate the sponsor status narrative from all four registers.</code></pre>

RAID logs the new entry into the Risks register per `RAID-METHOD.md` — likelihood, impact, a named owner, and a mitigation, not a hope that it resolves itself — then regenerates the sponsor narrative from all four registers as they now stand, one open dependency included:

<pre><code># RAID: field-inspection-copilot

RISKS
  R-04: Field connectivity in rural sites may block real-time sync
    Owner: R. Chen  Likelihood: medium  Impact: high
    Mitigation: offline-first capture with delayed sync on reconnect

ASSUMPTIONS
  A-01: Inspectors will accept a mobile-first workflow over the paper
  clipboard they use today
    Owner: R. Chen  Validate by: pilot cohort survey, week 3

ISSUES
  I-02: Photo upload pipeline dropped 6% of images last sprint
    Owner: J. Alvarez  Status: root cause found, fix in review

DEPENDENCIES
  D-09: Platform team's photo-storage API must ship before the
  auto-fill report generator
    Owner: platform team lead  Status: open, targeted for PI-12

STATUS NARRATIVE (generated from the registers above):
  On track. One medium-likelihood connectivity risk is under active
  mitigation. One open dependency on the platform team is holding the
  auto-fill report generator in NEXT rather than NOW.</code></pre>

This is the shape the output contract requires, not a captured run — RAID has no companion script; the document above is written by the skill directly into `specs/{prefix}-raid.md`. PI-12 in that register is a program increment, the fixed planning cycle the platform team commits work into. The narrative's last sentence is not written from memory: it reads directly off D-09, the same dependency `roadmap` reads from this register when it decides the auto-fill report generator belongs in NEXT rather than NOW.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A risk that is actually managed</div>
<pre><code>RISK R-04: Field connectivity may block real-time sync
  Likelihood: medium  Impact: high
  <span class="tok-ok">Owner: R. Chen  Mitigation: offline-first capture
  with delayed sync on reconnect</span></code></pre>
<div class="compare-card-note">Likelihood, impact, owner, and an active mitigation — not a hope that it resolves itself.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>ISSUE I-02: Photo upload pipeline dropped 6% of images
  <span class="tok-warn">Owner: (unassigned)
  Status: open, no movement for 4 cycles</span></code></pre>
<div class="compare-card-note">An issue with no owner and no movement across several reporting cycles is the clearest sign a status update is being generated rather than acted on.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if a risk gets logged with no owner named yet?</summary>
<div class="qa-body">

SKILL.md names this as a stop condition directly: "a risk logged with no owner." RAID-METHOD.md states the reasoning underneath it: "a risk register with no mitigation column is just a list of worries," and a mitigation with no owner behind it is not really a mitigation.

</div>
</details>

<details class="qa">
<summary>What separates a risk from an issue in these registers?</summary>
<div class="qa-body">

RAID-METHOD.md draws the line by tense: a risk is "something that might happen and would hurt the initiative if it did," while an issue is "something that has already happened and needs resolving now — the past-tense counterpart to a risk." Both carry an owner; only risks carry a likelihood and impact rating ahead of time.

</div>
</details>

<details class="qa">
<summary>Why does an assumption need a validation point instead of just a description?</summary>
<div class="qa-body">

RAID-METHOD.md is direct: "every assumption names the owner responsible for validating it and the point at which it will be checked — an assumption nobody is tracking quietly becomes an unexamined belief." A described assumption with no validation date is a belief pretending to be tracked.

</div>
</details>

<details class="qa">
<summary>What if the sponsor narrative and a register ever disagree?</summary>
<div class="qa-body">

RAID-METHOD.md settles this directly: "if the narrative and the register ever disagree, the register is right and the narrative was stale." The narrative is generated from the registers specifically so this question has one answer, not two competing documents.

</div>
</details>

<details class="qa">
<summary>Why does roadmap read this register directly instead of keeping its own copy?</summary>
<div class="qa-body">

RAID-METHOD.md states the reason plainly: "the dependency board roadmap reads directly from this register... so a slipped dependency shows up in the sequencing the moment it slips, not a reporting cycle later." A second, separately maintained copy would only reintroduce the drift this design avoids.

</div>
</details>

## It's working if

- Every entry in every register carries a named owner, and every risk carries an active mitigation rather than a hope.
- A dependency slipping here shows up in `roadmap`'s sequencing the same day, without a separate update anywhere else.
- The sponsor status narrative is regenerated from the registers each cadence, never rewritten from memory.
- A stalled issue with no recent movement gets escalated to its owner rather than left to age quietly in the register.

If a narrative and its register ever say different things, the discipline has failed even though a status update still went out — the register is what should have been read.

## Where it fits

**RAID is the standing record of everything that could derail an initiative, kept current enough that two other skills can read it directly instead of asking someone.**

Its tightest coupling is to `roadmap`: the dependency board that decides sequencing lives here, read directly rather than copied. `report` pulls its Problems section from this register at every cadence, and `case` names the one sensitivity assumption a recommendation rests on before that assumption ever needs its own row here.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "risks, assumptions, issues, dependencies" straight to `raid`.
