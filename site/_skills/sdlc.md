---
layout: skill
name: sdlc
title: "SDLC — The Gated Software Delivery Loop"
description: "SDLC is the user-invoked gated loop that walks a work item through design, build, security, and release gates, recorded on a SPEC-TS evidence ledger."
group: developer
invocation: user-invoked
lens:
  novice:
    who: 'You have heard "we are doing the full SDLC" and want to know what that actually means, day to day.'
    value: 'SDLC is the gated loop itself — design, build, secure, release — and it stops at every human gate until someone actually approves, not once "mostly done" feels close enough.'
  practitioner:
    who: 'You are picking up a ready work item and walking it through delivery.'
    value: 'SDLC snapshots the SPEC-TS ledger, walks the fixed gate order, records one CHECK and one EXPECT per acceptance criterion as a grit gate ledger, and calls the security, quality, or reliability adapters the moment a finding surfaces.'
  leader:
    who: 'You need delivery to stop cleanly at a gate instead of drifting past it under deadline pressure.'
    value: 'A missing SPEC-TS snapshot or an unsigned human gate is a stop with a structured gap list — a fixed rule everyone on the team hits the same way, not a judgment call left to whoever is running the loop that day.'
  csuite:
    who: 'You want evidence that "done" survived independent scrutiny, not just the implementer''s own word.'
    value: 'Gate 3 always runs an independent verifier against the ledger, the design, and the tests, and every closure carries the gate ledger''s final audit of met, unmet, and abandoned items.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 3
journey_steps: 5
journey_prev: impact
journey_next: grit
---

## What it does

SDLC runs the full gated software delivery loop for a scoped work item, from design through build, security, quality, and release. It snapshots the work item's SPEC-TS ledger, confirms `conduct` has already resolved loop-versus-graph routing, and walks the gate order fixed in `LOOP-CONTRACT.md`, recording one CHECK and one EXPECT per acceptance criterion as a grit gate ledger. Implementation follows Design Pass 1 and Design Pass 2 from `METHOD.md`, stops at every human gate for explicit approval, and calls the security, quality, or reliability adapters through their charter skills when a finding surfaces. Closure requires Gate 3's independent verifier pass and the gate ledger's final met/unmet/abandoned audit — never a green build alone, and never silence.

## How to call it

In Claude Code, type `/sdlc`. In OpenCode, the `/sdlc` command clarifies and acknowledges the given arguments, builds the SPEC-TS ledger, conducts Design Pass 1 and Design Pass 2, and verifies Gate 1 and Gate 2 before choosing no-loop, one worker, a specialist chain, a workflow, or a human gate — preferring no loop when one agent suffices.

Readers who do not have the skill pack installed yet can add it first — the second line installs the tool adapters, including the OpenCode command above:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A gate that records real evidence</div>
<pre><code>Gate 3: <span class="tok-ok">PASS</span> &mdash; evidence: [build-142, test-report-88,
  security-scan-41]; owner: verifier
Outcome: GOAL_MET</code></pre>
<div class="compare-card-note">Each gate records PASS, BLOCK, NEEDS_INPUT, or INSUFFICIENT_EVIDENCE plus evidence IDs and owner — quoted directly from METHOD.md.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Gate 3: <span class="tok-warn">PASS &mdash; "looks fine on inspection"</span>
Outcome: GOAL_MET</code></pre>
<div class="compare-card-note">Source review alone yields source-level confidence, not tested/deployed/released proof, and model agreement never substitutes external evidence — both quoted directly from METHOD.md.</div>
</div>
</div>

## In practice

`METHOD.md` defines a literal "Required Substantial-Work Output" template — quoted here verbatim, the exact shape every substantial SDLC run must report:

<pre><code>Goal: &lt;measurable outcome&gt;
SPEC-TS: &lt;scope / requirements / constraints / components / trade-offs / success&gt;
Questions/Assumptions: &lt;decision-changing only&gt;
Design 1: &lt;candidate&gt;
Design 2: &lt;challenge/refined plan&gt;
Gate 1: &lt;state/evidence&gt;
Gate 2: &lt;state/evidence&gt;
Implementation: &lt;single writer/scope or none&gt;
Gate 3: &lt;state/evidence&gt;
Outcome: GOAL_MET | PARTIAL_VALUE | BLOCKED | NO_PROGRESS | HARM_GUARDRAIL_BREACH | INSUFFICIENT_EVIDENCE
Next/Human decisions: &lt;exact&gt;</code></pre>

Filled for the checkout-timeout work item carried from impact and slice, this is the shape that template requires — not a captured real run, since sdlc has no fixture of its own to quote:

<pre><code>Goal: Reduce checkout timeout errors to under 0.1%
SPEC-TS: scope=services/checkout; NFR=p99 latency &lt;800ms
Gate 1: PASS &mdash; ledger coherent, worker resolved via model-routing
Gate 2: PASS &mdash; design frozen, allowed paths = timeout.go, timeout_test.go
Implementation: single writer, scope as frozen
Gate 3: PASS &mdash; evidence: [test-report-88]; owner: verifier
Outcome: GOAL_MET
Next/Human decisions: none &mdash; ready for raise's tracker close-out</code></pre>

## How it works

1. Snapshot the SPEC-TS ledger from the PRD or work item before walking any gate. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).
2. Confirm routing mode through `conduct`, and check the target repository against the delivery-readiness checklist before walking gates.
3. Walk the fixed gate order, recording one CHECK and one EXPECT per acceptance criterion as a grit gate ledger. See [`LOOP-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md).
4. Stop at every human gate for explicit approval; `[sdlc:pause]` and the sibling directives control this. See [`DIRECTIVES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/DIRECTIVES.md).
5. Route security, quality, or reliability findings to their charter skills as they surface.
6. Close with Gate 3's independent verification and the gate ledger's final audit. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).
