---
layout: skill
name: sdlc
title: "SDLC — The Gated Software Delivery Loop"
description: "SDLC is the user-invoked gated loop that walks a work item through design, build, security, and release gates, recorded on a SPEC-TS evidence ledger."
group: developer
invocation: user-invoked
scenario: "Walking the checkout-timeout work item through the gated loop, from ledger to a verified outcome"
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

SDLC runs the full gated software delivery loop for a scoped work item, from design through build, security, quality, and release. Every substantial run keeps one ledger — SPEC-TS, short for Scope, Product requirements, Engineering constraints, Components, Trade-offs, and Success metrics — and nothing consequential proceeds while that ledger is missing or stale.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Snapshot SPEC-TS</span><span class="step-text">Pull the ledger from the product requirements document (PRD) or work item body before walking a single gate.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Design twice</span><span class="step-text">Design Pass 1, the candidate plan, then Design Pass 2, the challenge that attacks its own assumptions before scope freezes.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Verify thrice</span><span class="step-text">Gate 1 checks alignment before execution; Gate 2 checks the design and tasks before mutation; Gate 3 checks the outcome after it, independently.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Implement once</span><span class="step-text">One approved phase, one writer, inside the scope Gate 2 froze — no opportunistic redesign along the way.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Close with the audit</span><span class="step-text">Gate 3's evidence plus the grit gate ledger's final met, unmet, and abandoned count — never a green build alone.</span></div>
</div>

<ul class="benefits">
  <li>A missing SPEC-TS snapshot or an unsigned human gate stops the loop with a structured gap list, the same way for everyone who runs it, not a judgment call left to whoever is at the keyboard.</li>
  <li>Gate 3 always runs an independent verifier against the ledger, the design, and real evidence — the implementer's own confidence never substitutes for that check.</li>
  <li>A security, quality, or reliability finding routes to its charter skill the moment it surfaces, rather than waiting for a dedicated review phase at the end.</li>
  <li>Closure always carries the grit gate ledger's audit of met, unmet, and abandoned items — a green build by itself is never reported as done.</li>
</ul>

SDLC confirms `conduct` has already resolved loop-versus-graph routing before it starts, and walks the gate order `LOOP-CONTRACT.md` fixes, recording one `CHECK` and one `EXPECT` per acceptance criterion as a grit gate ledger. Implementation stops at every human gate for explicit approval, and calls the security, quality, or reliability adapters through their charter skills the moment a finding surfaces.

- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md) covers the SPEC-TS ledger, the two design passes, the three verification gates, and the required output template every substantial run reports against.
- [`LOOP-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md) covers loop orchestration, pattern selection per agent role, termination states, and the prohibited patterns a run must never fall into.
- [`DIRECTIVES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/DIRECTIVES.md) covers the `[sdlc:*]` control tokens a person can send mid-run — pause, escalate, or a forbidden skip.

## When to reach for it

In Claude Code, type `/sdlc`, or name the skill directly in a session. The real, current line `r019` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger: "run the full gated build loop against the signed spec."

You reach for it in two moments. A work item's label reads `ready`, and its contract points here — the pickup critique already ran and the open questions are answered. You have a signed PRD or a scoped work item and want the whole design-build-secure-release loop applied to it, not just one gate in isolation.

| The problem | The skill |
|---|---|
| The work item is not `ready` yet, or was never critiqued | [`slice`]({{ '/slice/' | relative_url }}) |
| You need loop-versus-graph routing decided before sdlc starts | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You need the acceptance-gate ledger's own depth and audit discipline, not the loop that runs around it | [`grit`]({{ '/grit/' | relative_url }}) |
| You need an isolated, pre-merge review of a pull request that already claims done | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>SDLC is user-invoked: type <code>/sdlc</code>, or name it directly in a session — nothing routes to it automatically. The repository also ships three dynamic workflows as plugin slash commands — <code>/rahulnakmol-skills:assess-work-item</code>, <code>/rahulnakmol-skills:deliver-work-item</code>, and <code>/rahulnakmol-skills:shakedown-pr</code> — which carry a headless version of the same gated stages for a work item already raised to a tracker.</p>
<div class="prompt-card">Run the checkout-timeout work item through the full gated loop. Snapshot SPEC-TS, run both design passes, and stop at every human gate — do not report this done until Gate 3's independent verifier has actually run.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>SDLC returns the ledger snapshot, the two design passes, and stops at each gate for your explicit approval before moving on.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>/sdlc</code> command from <code>adapters/opencode/commands/sdlc.md</code>, bound to the <code>sdlc</code> agent. It interactively clarifies and acknowledges the given arguments, builds the SPEC-TS ledger, and conducts Design Pass 1 and Design Pass 2. It then verifies Gate 1 and Gate 2 before choosing no-loop, one worker, a specialist chain, a workflow, or a human gate — preferring no loop when one agent suffices.</p>
<div class="prompt-card">/sdlc Reduce checkout timeout errors to under 0.1% on the payments platform. This is a bounded, single-service fix — confirm no-loop is the right call before you start.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent states its chosen shape, runs the two design passes, and requires cross-family Gate 3 verification after the one bounded implementation phase.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skills land in <code>.agents/skills/</code>, and the agent applies sdlc's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Apply skills/developer/sdlc/METHOD.md to the checkout-timeout work item: snapshot SPEC-TS, run both design passes, and stop at Gate 1 and Gate 2 for my approval before touching any file.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor states the ledger, both design passes, and the gate results directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees sdlc's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/developer/sdlc/METHOD.md and LOOP-CONTRACT.md, then walk the checkout-timeout work item through the gated loop and report each gate's state and evidence.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex walks the same gates, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command or hook for sdlc on any tool besides Claude Code's plugin invocation, so a Copilot request is answered the same way as on Cursor and Codex.</p>
<div class="prompt-card">Before you implement anything for the checkout-timeout fix, confirm Gate 1 and Gate 2 pass and state the frozen scope. Do not report done before Gate 3's independent verifier has run.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot states each gate's result in chat before proposing or making any change.</p>
</div>
</div>

A good ask names the work item or PRD the loop runs against, and states plainly whether the change is bounded enough for one writer or genuinely needs `conduct`'s routing first. Readers who do not have the skill pack installed yet can add sdlc alone:

```bash
./scripts/link-skills.sh --skill sdlc
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

The checkout-timeout work item, raised by `raise` and confirmed `ready`, is bounded to one service and one writer — `conduct`'s rubric already resolved this as a loop, not a graph. `METHOD.md` defines a literal "Required Substantial-Work Output" template, quoted here verbatim, the exact shape every substantial SDLC run must report:

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

Filled for the checkout-timeout item, this is the shape that template requires — not a captured real run, since sdlc has no fixture of its own to quote. Design Pass 1 is the candidate plan, built from the SPEC-TS ledger and current evidence: retry a timed-out checkout once before failing it. Design Pass 2 is the challenge pass — it re-reads the timeout handling as it exists today, compares the retry-once plan against a circuit-breaker alternative, and freezes the smaller of the two once the alternative shows no real advantage for this traffic pattern. Gate 1, the alignment check, confirms the goal, the ledger, and the frozen scope are coherent before any file is touched. Gate 2, the design-and-task check, confirms the design is complete and the allowed paths are frozen. Gate 3, the outcome check, is where an independent verifier — a different agent from the implementer — checks the changed source against the ledger and real test evidence, after the one implementation phase runs:

<pre><code>Goal: Reduce checkout timeout errors to under 0.1%
SPEC-TS: scope=services/checkout; NFR=p99 latency &lt;800ms
Design 1: retry a timed-out checkout once before failing
Design 2: compared against a circuit-breaker; retry-once frozen as the smaller, sufficient change
Gate 1: PASS &mdash; ledger coherent, worker resolved via model-routing
Gate 2: PASS &mdash; design frozen, allowed paths = timeout.go, timeout_test.go
Implementation: single writer, scope as frozen
Gate 3: PASS &mdash; evidence: [test-report-88]; owner: verifier
Outcome: GOAL_MET
Next/Human decisions: none &mdash; ready for raise's tracker close-out</code></pre>

Each gate records one of `PASS`, `BLOCK`, `NEEDS_INPUT`, or `INSUFFICIENT_EVIDENCE`, plus evidence identifiers and an owner — never a bare pass with no evidence attached. Gate 3's grit gate ledger, where one exists for this slice, runs every gate's `CHECK`, compares its `EXPECT`, and records the evidence; an unmet gate there is a `BLOCK` on Gate 3 itself, not a note to fix later.

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

## Common questions

<details class="qa">
<summary>What is the difference between Gate 1, Gate 2, and Gate 3?</summary>
<div class="qa-body">

Each checks a different moment. Gate 1, Alignment Verification, runs before execution and confirms the goal, the SPEC-TS ledger, scope, and stop conditions are coherent. Gate 2, Design And Task Verification, runs before mutation and confirms Design Pass 2 is complete, tasks are independently executable, and allowed paths are frozen. Gate 3, Outcome Verification, runs after mutation and has an independent verifier check the changed source against the ledger, the design, and real tested evidence — never the implementer's own review of its own work.

</div>
</details>

<details class="qa">
<summary>Why does METHOD.md require two design passes instead of one?</summary>
<div class="qa-body">

Because a single candidate design never gets challenged on its own assumptions. Design Pass 1 builds the candidate from the SPEC-TS ledger and current evidence; Design Pass 2 re-reads the system, compares at least one materially different alternative for a significant choice, and attacks the candidate's failure modes and edge cases before scope freezes. METHOD.md is explicit that rephrasing the same proposal does not count as a second design.

</div>
</details>

<details class="qa">
<summary>Can a work item skip a human gate to keep moving under a deadline?</summary>
<div class="qa-body">

No. `DIRECTIVES.md`'s own token table marks `[sdlc:skip-human]` as forbidden in regulated mode, and the loop stops at every human gate for explicit approval regardless of schedule pressure. `LOOP-CONTRACT.md`'s prohibited patterns name the same discipline from the orchestration side: autonomous release, deployment, or production mutation is never something the loop grants itself.

</div>
</details>

<details class="qa">
<summary>What happens when implementation reveals the design was wrong?</summary>
<div class="qa-body">

The loop stops and returns to Design Pass 2 rather than patching around the architecture in place. METHOD.md's Implement Once section is explicit: this creates a new approved revision, not an uncontrolled second implementation, and failed verification produces an evidence-backed remediation contract and a new controlled slice — never weakened tests to preserve the appearance of one clean implementation.

</div>
</details>

<details class="qa">
<summary>How does a run end when the evidence does not support "done"?</summary>
<div class="qa-body">

METHOD.md's Outcome Iteration names five states beyond `GOAL_MET`. `PARTIAL_VALUE` states the delta and the next smallest experiment; `NO_PROGRESS` changes strategy or stops after a shared loop threshold; `HARM_GUARDRAIL_BREACH` stops with a rollback recommendation and a human escalation; `INSUFFICIENT_EVIDENCE` gathers named evidence rather than claiming value it cannot yet show. None of these is a failure to hide — each is the accurate report of where the work actually stands.

</div>
</details>

## It's working if

- Every substantial run's report fills the full "Required Substantial-Work Output" template — goal, SPEC-TS, both design passes, all three gates, and a named outcome — never a partial summary standing in for it.
- No file gets touched before Gate 1 and Gate 2 both record `PASS` with evidence, and no run is reported done before Gate 3's independent verifier has actually run.
- A human gate always waits for explicit approval; `[sdlc:pause]` and the sibling directives, never a deadline, decide when the loop resumes.
- Closure always carries the grit gate ledger's final met, unmet, and abandoned count, never a green build standing alone as proof.

If a run starts reporting Gate 3 as passed on source review alone, without tested or deployed evidence behind it, the discipline has failed even though the outcome still reads `GOAL_MET`.

## Where it fits

**SDLC is the loop itself — the gated stretch between a ready work item and a pull request `shakedown` can review.**

Its nearest neighbor is `conduct`: conduct decides whether this work runs as one writer or a graph of them before sdlc starts, and sdlc calls it first rather than assuming a shape. `grit` is both a step inside this loop and a skill on its own — sdlc's own procedure records Gate 3's evidence as a grit gate ledger, so the two are usually run together on anything substantial. `shakedown` picks up once sdlc closes, reviewing the resulting pull request in an isolated sandbox before merge.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
