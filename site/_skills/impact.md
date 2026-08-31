---
layout: skill
name: impact
title: "Impact — From Raw Idea to Signed PRD"
description: "Impact is the user-invoked pipeline that turns a raw idea into an approved, signed PRD through a grill loop, value probing, and a handoff to slice."
group: developer
invocation: user-invoked
lens:
  novice:
    who: 'You are holding a raw idea, a set of notes, or a vague ask, with no clear sense of how it becomes real, funded work.'
    value: 'Impact turns that into a signed PRD through a grill loop that keeps asking until the idea holds up — so nothing gets built on a guess.'
  practitioner:
    who: 'You need to hand a greenfield or brownfield idea into the delivery pipeline before slice and sdlc can start.'
    value: 'Impact drafts a fast-cut PRD, pulls in a recon brief first for brownfield work, captures functional and non-functional requirements separately, and will not hand off to slice until gate G2 is explicitly, namedly signed.'
  leader:
    who: 'You are tired of features that reach implementation missing a real business-value case.'
    value: 'A PRD cannot reach sign-off with an empty or templated business-value section. That gate stops a premature build before a line of code is written, not after.'
  csuite:
    who: 'You need a record of why a feature exists, not only proof that it shipped.'
    value: 'Every signed PRD carries a decision log, a recorded risk and governance tier, and a business-value section tracing requirement to outcome — the paper trail behind the spend.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 2
journey_steps: 5
journey_prev: recon
journey_next: sdlc
---

## What it does

Impact turns a raw idea — notes, a transcript, or a vague ask — into an approved PRD and a handoff ready for `slice`. Intake drafts a fast-cut PRD against `PRD-TEMPLATE.md`, pulling in a `recon` brief first for brownfield work. A grill loop then applies the shared `GRILL.md` and `VALUE.md` doctrine until the PRD earns sign-off or a waiver is stated, capturing functional and non-functional requirements separately rather than leaving either implicit. The PRD cannot advance without a populated business-value section, and cannot hand off to `slice` without gate G2's explicit, named sign-off. The output is a markdown PRD capped at ten pages, plus an updated `.impact.json` project record.

## How to call it

In Claude Code, type `/impact`. In OpenCode, the `/impact` command applies the same charter to the given arguments: it leads the SPEC-TS scope, product requirements, and business trade-offs passes, researches evidence, runs the candidate-and-challenge design passes, and returns Gate 1 evidence.

Readers who do not have the skill pack installed yet can add it first — the second line installs the tool adapters, including the OpenCode command above:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A PRD ready for sign-off</div>
<pre><code>## Business value delivered
Checkout timeouts cost an estimated $40K/month in abandoned
carts; this cuts the error rate from 2.1% to under 0.1%,
measured via the existing checkout funnel dashboard.
## Risk and governance tier
<span class="tok-ok">limited</span>
## Approval sign-off
<span class="tok-ok">Approved &mdash; R. Doyle, 2026-08-20</span></code></pre>
<div class="compare-card-note">A measured value case, a recorded governance tier, and a named, dated sign-off — every field PRD-TEMPLATE.md and GATES.md's G2 require.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>## Business value delivered
<span class="tok-warn">This will make things better for users.</span>
## Approval sign-off
<span class="tok-warn">(pending)</span></code></pre>
<div class="compare-card-note">A PRD cannot reach sign-off with this section empty or templated — PRD-TEMPLATE.md, quoted directly. No sign-off, no handoff to slice; that is gate G2.</div>
</div>
</div>

## In practice

`impact/GATES.md` is short enough to reproduce here in full, byte for byte — this is the actual gate table impact walks on every run:

<pre><code>| Gate | Requirement |
|------|-------------|
| G0 intake | Raw idea captured |
| G1 grilled | &ge;1 grill round or explicit waive |
| G2 signed | User sign-off in PRD; governance tier recorded |
| G3 handoff | `slice` allowed |</code></pre>

Filling that table for a worked case — reducing checkout timeout errors — shows the shape a finished intake takes, per the skill's own output contract of a capped markdown PRD plus a `.impact.json` update. G0 captures the raw report of abandoned carts. G1 runs at least one grill round against `PRD-TEMPLATE.md`'s Scope section, separating the functional requirement ("retry a timed-out checkout once before failing") from the non-functional one ("p99 checkout latency under 800ms"). G2 records the `limited` governance tier and a named, dated sign-off. Only then does G3 open, and `slice` is allowed to read the PRD. This is the shape the output contract requires, not a captured real run — impact has no fixture file of its own to quote in full.

## How it works

1. Draft the fast-cut PRD from intake, following the Problem, Users, and Scope skeleton. See [`PRD-TEMPLATE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md).
2. For brownfield work, call `recon` first and attach its brief before drafting scope.
3. Grill the draft through each gate, capturing functional and non-functional requirements separately and logging every scope cut in the decision log. See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/GATES.md).
4. Populate the mandatory business-value section — a PRD cannot reach G2 without it. See [`PRD-TEMPLATE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md).
5. Record the risk and governance tier at sign-off; once recorded it is a commitment, not a running estimate. See [`PRD-TEMPLATE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md).
6. Hand off to `slice` only once gate G2 is explicitly, namedly signed. See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/GATES.md).
