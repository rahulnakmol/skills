---
layout: skill
name: operate
title: "Operate: Reliability, Quality, and Maintenance"
description: "Operate covers a system after it ships: SLOs and incident readiness, SPEC-TS testability and coverage gaps, and a patch and debt-burn-down cadence."
group: developer
invocation: model-invoked
scenario: "Setting SLOs and a maintenance cadence for the notifications service after it ships"
lens:
  novice:
    who: 'An incident starts and nobody can say who owns the alert that fired, or which dashboard to open first.'
    value: 'Operate gives every service boundary a named owner and an alert threshold before the incident, not during it.'
  practitioner:
    who: 'You are asked to set SLOs, close test gaps, or run a patch cycle, and you want one place that covers all three.'
    value: 'One charter runs the reliability, quality, and maintenance lanes against the same Design baseline, and states plainly which lanes a given run did not cover.'
  leader:
    who: 'You own a team’s on-call rotation, its test coverage, and its dependency backlog.'
    value: 'Findings from all three lanes land in the same backlog through `slice`, so a report that never re-enters the backlog is treated as having changed nothing.'
  csuite:
    who: 'Service reliability and the technical debt building up under it both land on your desk.'
    value: 'Reliability, quality, and maintenance evidence all trace back to the same baseline the system was designed against, on a stated cadence, not only after an incident.'
---

## What it does

Operate is the model-invoked charter for a system after it is built: reliability, quality, and maintenance in one lane. It measures the delivered system against the same Discover-Define-Design baseline the system was built to, not against a green build, and scopes each run to the lanes a request actually touches — naming the lanes it left out rather than staying silent about them.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Measure against the baseline</span><span class="step-text">Check operational readiness, quality, and maintainability against the original Design baseline, not against a green build alone.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Scope the run</span><span class="step-text">Cover only the lanes the request actually touches, and name every lane it left out rather than staying silent about it.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Reliability lane</span><span class="step-text">An SLO (a service-level objective, a measurable reliability target) with a named owner and an alert threshold for every service boundary, plus dashboards, runbooks, and declared incident roles.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Quality lane</span><span class="step-text">Audit the SPEC-TS ledger for testability, then record test gaps against the coverage floors and the technical debt the slice carries.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Maintenance lane and return</span><span class="step-text">Patch review, dependency updates, and debt burn-down on a fixed cadence; every finding returns to the backlog through slice, never ending as a document nobody acts on.</span></div>
</div>

<ul class="benefits">
  <li>An incident starts with a named owner and an alert threshold already in place, not discovered live for the first time while a page goes unanswered.</li>
  <li>A lane that did not run this pass is reported as a gap in the brief, never a silent, implied pass.</li>
  <li>Test gaps and technical debt trace back to the same Design baseline the system was actually built to, not a fresh scope disconnected from it.</li>
  <li>Maintenance runs on a fixed schedule, so dependency and debt work does not sit accumulating between incidents.</li>
</ul>

`SKILL.md`'s own stop condition on findings is direct: "a report that ends as a document has changed nothing." `CADENCE.md` states why the schedule holds even when nothing is broken: "maintenance that runs only after an incident is incident response under another name, and it leaves dependency and debt work to accumulate between incidents."

- [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md) covers the Deliver phase's own rule: measure against the baseline the system was designed to, not a green build.
- [`operate.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/operate.md) covers the reliability lane's SLOs, error budgets, runbooks, and incident roles.
- [`CADENCE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/CADENCE.md) covers the fixed schedule the maintenance lane runs on.
- [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md) covers where every finding this charter produces re-enters the backlog.
- [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md) covers the overlay applied when the system carries a regulated or consequential automated decision.

Operate reads each one only when the moment calls for it: measuring the baseline reads DDDD.md, the reliability lane reads its own adapter, a maintenance cycle reads CADENCE.md, returning a finding reads OPERABILITY.md.

## When to reach for it

Nothing types `/operate` in Claude Code. Operate is model-invoked, reached three ways. An SDLC gate — one of the sign-off points in the sdlc skill's own design-build-secure-release loop — calling for reliability, quality, or maintenance evidence reaches it. A work item's pod charter naming any of the three roles reaches it. And a request whose wording matches the skill's own description reaches it directly.

You reach for operate in three moments. A service is about to ship, and nothing has set its SLOs, alert thresholds, or runbooks yet. Someone asks whether a set of requirements is actually testable, or where the test gaps sit. A patch, dependency-update, or debt-burn-down cycle is due per the maintenance cadence, whether or not anything has broken.

Operate is not the only skill that touches production or backlog work. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the release-readiness gate itself, not what happens after | [`deliver`]({{ '/deliver/' | relative_url }}) |
| You need the whole gated build loop, not the post-release lane | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need a finding tracked as its own backlog story with acceptance criteria | [`slice`]({{ '/slice/' | relative_url }}) |
| You need an isolated pre-merge review of a change, not ongoing reliability | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Operate has no slash command of its own. Claude reaches for it when a post-release gate calls for reliability, quality, or maintenance evidence, or when a request's wording matches the skill's own description — SLOs, monitoring, runbooks, testability, or a patch cycle — directly in chat.</p>
<div class="prompt-card">The notifications service ships next week. Set SLOs and alert thresholds for it before we call it production-ready, and tell me plainly which of the reliability, quality, and maintenance lanes this pass actually covers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Operate returns a brief with one section per lane, naming the evidence found and stating outright which lane, if any, this pass did not cover.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>/operate</code> command from <code>adapters/opencode/commands/operate.md</code>, bound to the operate agent for the reliability lane; a separate <code>/quality</code> command, bound to the quality agent, covers the testability lane the same charter names.</p>
<div class="prompt-card">/operate Set SLOs, alert thresholds, and an incident runbook for the notifications service before we call it production-ready. Scope this pass to the reliability lane only, and tell me plainly if quality or maintenance need a separate pass.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command returns the reliability lane's SLO table and runbook plan; the quality lane runs as its own pass when a request needs it.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies operate's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">The notifications service ships next week. Set SLOs and alert thresholds for it the way skills/developer/operate/SKILL.md and CADENCE.md describe, and tell me plainly which lanes &mdash; reliability, quality, maintenance &mdash; this pass covers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the brief directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees operate's name and description the same way the other tools do. It gets no command layer either.</p>
<div class="prompt-card">Read skills/developer/operate/SKILL.md and CADENCE.md, then set SLOs and alert thresholds for the notifications service before we call it production-ready. State which lanes this pass covers and which it does not.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the brief the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command layer for Copilot, so operate's charter is applied the way Cursor and Codex apply it — as context an agent follows, not a command it runs.</p>
<div class="prompt-card">Before we call the notifications service production-ready, read skills/developer/operate/SKILL.md, set its SLOs and alert thresholds, and post the brief as a comment stating which lanes &mdash; reliability, quality, maintenance &mdash; this pass actually covers.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot posts the brief as an issue comment; a person still owns any production runbook this charter recommends, since operate never mutates production itself.</p>
</div>
</div>

A good ask includes:

- Which lane or lanes the request actually needs — reliability, quality, maintenance, or all three.
- The service boundary an SLO should cover, and who owns its pager.
- Whether a patch or dependency-update cycle is due per the maintenance cadence.
- Whether the work touches a regulated industry, so the governance overlay's audit requirements apply.

Readers who have not installed the whole skill pack can add operate alone:

```bash
./scripts/link-skills.sh --skill operate
```

This links only operate into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>The notifications service ships next week. Set SLOs and alert thresholds for it before we call it production-ready, and tell me plainly which of the reliability, quality, and maintenance lanes this pass actually covers.</code></pre>

Operate measures the shipped service against the same baseline architect designed it to — the same three bounded components, notifications-api, delivery-worker, and preferences-store. The request names reliability directly and implies quality, so operate scopes to those two lanes; maintenance is not due yet per `CADENCE.md`'s schedule, and the brief states that outright rather than staying silent about it.

The brief it returns, shown here as the shape the skill's own output contract requires, not as a captured run:

<pre><code>Reliability
  - SLO: delivery-worker fan-out latency, owner: notifications-api team,
    alert threshold: p99 &gt; 5s sustained for 10 minutes
  - Runbook: linked in the service catalog  |  Incident roles: on-call
    engineer, notifications-api tech lead

Quality
  - Test gap: NFR1 (the service keeps delivering through a single
    provider's outage) has no passing check against COVERAGE.md's
    75-80% integration floor
  - Technical debt: preferences-store's read API has no cache, logged
    for the slice

Maintenance
  - Not run this pass &mdash; stated, not omitted. Next review per
    CADENCE.md's weekly dependency slot: in 9 days</code></pre>

Both findings — the coverage gap and the debt item — return to the backlog through `slice` as continuous-improvement items, per `OPERABILITY.md`; the brief itself is never treated as the finished work.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A brief that names its own scope</div>
<pre><code><span class="tok-ok">Reliability:</span> SLO table with owners and alert thresholds &mdash; covered
<span class="tok-ok">Quality:</span> test gap logged against the COVERAGE.md floor &mdash; covered
<span class="tok-ok">Maintenance:</span> not run this pass &mdash; <span class="tok-comment">stated, not omitted</span></code></pre>
<div class="compare-card-note">A lane that did not run is reported as a gap. The brief never implies a lane passed by leaving it out.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Findings written up and left in the report</span>
<span class="tok-warn">Missing lane silently dropped from the brief</span></code></pre>
<div class="compare-card-note">From SKILL.md: "a report that ends as a document has changed nothing." Every finding returns to the backlog through slice; a lane that could not run is reported as a gap, never an empty pass.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens to a lane the request never touched?</summary>
<div class="qa-body">

It shows up in the brief as a stated gap, not a silent omission. SKILL.md's stop condition is direct: a lane that could not run is reported as a gap, never as an empty pass — the brief always states which lanes it covers and which it does not.

</div>
</details>

<details class="qa">
<summary>Does operate ever mutate production directly?</summary>
<div class="qa-body">

No. Its adapter states this without exception: never directly mutate production, even after chat approval or under an automated mode; humans execute production runbooks through separately authenticated, audited operational systems instead.

</div>
</details>

<details class="qa">
<summary>Where do findings actually go once operate reports them?</summary>
<div class="qa-body">

Back into the backlog, through `slice`, as a continuous-improvement item — never left sitting in a document. SKILL.md is explicit that a report ending as a document has changed nothing, which is why this return step is part of the procedure itself, not an afterthought.

</div>
</details>

<details class="qa">
<summary>Why does maintenance run on a schedule instead of only after an incident?</summary>
<div class="qa-body">

Because incident-triggered maintenance is really incident response wearing a different name. `CADENCE.md` states the cadence holds precisely when nothing is broken, so dependency and debt work does not sit accumulating in the gap between one incident and the next.

</div>
</details>

<details class="qa">
<summary>Does this work outside Claude Code?</summary>
<div class="qa-body">

Yes. OpenCode reaches the reliability lane through an installed `/operate` command and the quality lane through a separate `/quality` command; Cursor, Codex, and GitHub Copilot read the same skill catalog as context and apply the same three-lane charter without a command layer of their own.

</div>
</details>

## It's working if

- Every service boundary this charter has touched carries a named owner and an alert threshold, not a page nobody answers.
- A lane that did not run this pass is stated as a gap in the brief, never silently dropped from it.
- Every finding re-enters the backlog through `slice`, so a report never just sits as a document nobody acts on.
- The maintenance lane runs on `CADENCE.md`'s fixed schedule, not only after something has already broken.

If a patch or dependency review only ever happens right after an incident, the cadence has already failed even though the report itself looks complete.

## Where it fits

**Operate is the post-release lane inside the gated build loop, and the skill a pod charter names for reliability, quality, or maintenance evidence once a system ships.**

Its nearest neighbor is `deliver`: deliver's release-readiness gate hands off to operate once a change actually ships. `slice` is where every operate finding re-enters the backlog, and `shakedown`'s pre-merge review is the counterpart operate's post-release lane never replaces.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names production, reliability, quality, or maintenance as the intent that points straight to operate.
