---
layout: skill
name: operate
title: "Operate: Reliability, Quality, and Maintenance"
description: "Operate covers a system after it ships: SLOs and incident readiness, SPEC-TS testability and coverage gaps, and a patch and debt-burn-down cadence."
group: developer
invocation: model-invoked
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

Operate is the charter for a system after it is built: reliability, quality, and maintenance in one lane. It measures the delivered system against the same Discover-Define-Design baseline the system was built to, not against a green build, and scopes each run to the lanes a request actually touches, naming the lanes left out. Reliability produces SLOs with named owners and alert thresholds; quality audits the SPEC-TS ledger for testability and logs test gaps and technical debt; maintenance runs patch review, dependency updates, and debt burn-down on a fixed cadence. Every finding returns to the backlog through `slice` rather than ending as a document nobody acts on.

## How to call it

Claude reaches for operate when a request matches its description: setting or reviewing SLOs, adding monitoring or alerting, writing or rehearsing a runbook, checking whether requirements are testable, finding test gaps, or planning a patch and dependency-update cycle. A prompt like "Set SLOs and alert thresholds for this service before we call it production-ready" triggers it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A brief that names its own scope</div>
<pre><code><span class="tok-ok">Reliability:</span> SLO table with owners and alert thresholds &mdash; covered
<span class="tok-ok">Quality:</span> test gaps against COVERAGE.md floors &mdash; covered
<span class="tok-ok">Maintenance:</span> not run this pass &mdash; <span class="tok-comment">stated, not omitted</span></code></pre>
<div class="compare-card-note">A lane that did not run is reported as a gap. The brief never implies a lane passed by leaving it out.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Findings written up and left in the report</span>
<span class="tok-warn">Missing lane silently dropped from the brief</span></code></pre>
<div class="compare-card-note">From `SKILL.md`: "a report that ends as a document has changed nothing." Every finding returns to the backlog through `slice`; a lane that could not run is reported as a gap, never an empty pass.</div>
</div>
</div>

## In practice

Operate ships no runnable script of its own; the deliverable is the brief itself. The block below is not a captured run &mdash; it is the shape `SKILL.md`'s output contract requires: one brief carrying a section per lane, each naming the evidence found or the reason the lane did not run.

<pre><code>Reliability
  - SLO: <service boundary>, owner: <role>, alert threshold: <value>
  - Runbook: <link>  |  Incident roles: <list>

Quality
  - Test gap: <requirement id> has no passing check against COVERAGE.md floor
  - Technical debt: <item>, logged for the slice

Maintenance
  - Next review: <date, per CADENCE.md>
  - Patch / dependency / debt items: <prioritized list></code></pre>

## How it works

1. **Measure against the baseline.** Check operational readiness, quality, and maintainability against the Discover-Define-Design baseline, not a green build, and scope the run to the lanes the request touches. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md).
2. **Reliability lane.** SLOs with named owners and alert thresholds, a correlation identifier on every agent run, dashboards, runbooks, and declared incident roles. See [`operate.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/operate.md).
3. **Quality lane.** Audit the SPEC-TS ledger for testability, then record test gaps against the coverage floors. See [`quality.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/quality.md) and [`COVERAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/COVERAGE.md).
4. **Maintenance lane.** Patch review, dependency updates, and debt burn-down, run on a fixed schedule against the original Design baseline. See [`CADENCE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/CADENCE.md).
5. **Record and return findings.** Log gate evidence per lane, then return every finding to the backlog through `slice` as a continuous-improvement item. See [`LEDGER.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/LEDGER.md) and [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md).
6. **Regulated context.** Apply the governance overlay when the work touches a regulated industry or a consequential automated decision. See [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).
