---
layout: skill
name: conduct
title: "Conduct — Choosing How Delivery Work Executes"
description: "Conduct is the model-invoked router that decides whether a piece of delivery work runs as a loop, a graph, or a hybrid, and assigns a model to every node."
group: developer
invocation: model-invoked
lens:
  novice:
    who: 'You have noticed some AI work runs as one back-and-forth conversation and other work spawns several agents working at once, and you have never known why. Conduct is the rule behind that split.'
    value: 'The split is not about how hard a task feels. It comes down to one question: can "done" actually be checked by a machine. Everything else follows from that.'
  practitioner:
    who: 'You are about to kick off work that spans more than one file, more than one verifier, or more than one context window.'
    value: 'Conduct walks RUBRIC.md''s ordered questions, builds the node list, resolves a model per node through model-routing, and puts a named human in front of every high-consequence write — before a single agent starts.'
  leader:
    who: 'You have watched a task fan out into more parallel agents than the work actually needed.'
    value: 'The rubric ties graph structure to genuine independence, self-review risk, durable state, or consequence — never to how sophisticated a diagram looks. "The graph earns itself, or it is overhead" is a rule conduct enforces, not a slogan.'
  csuite:
    who: 'You are accountable for how AI agents make decisions that touch production or a release.'
    value: 'Every high-consequence write in a conduct-built graph passes through a named human node with a decision, an SLA, and a named escalation path — a property the graph can be checked against, not a promise someone made in a meeting.'
---

## What it does

Conduct decides how a piece of delivery work should execute — as a single loop, a graph of independent branches, or a hybrid of both — before implementation starts. It applies `RUBRIC.md`'s ordered questions, which route on verifiability rather than difficulty: whether "done" is machine-checkable at all, whether the work fits one writer and one verifier, and whether independent workstreams, self-review risk, durable state, or a high-consequence write push it toward a graph instead. Each resulting node gets its model resolved through `model-routing`, and any high-consequence write gets a human node with a named owner and an SLA. An ambiguous "done" criterion is a stop, not a guess — conduct calls `impact` to force a SPEC-TS ledger into existence first.

## How to call it

Conduct is not typed as a command. The model reaches for it on its own when a request matches its description — work that spans multiple gates or contexts, or needs routing before implementation begins. A prompt like "this build spans several workstreams, decide whether to run it as a loop or a graph" is enough to trigger it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A complete routing answer, from conduct's own output contract</div>
<pre><code>mode: graph|loop|hybrid
nodes:
  - id: implement-1
    type: agent
    skill: sdlc
    adapter: adapters/opencode/agents/work-sonnet.md
  - id: approve-release
    type: human
    owner: release-manager
    decision: <span class="tok-ok">"Ship implement-1's diff to production?"</span>
    inputs: [implement-1.diff, verify-1.report]
    sla_hours: 48
    escalation: <span class="tok-ok">engineering-director</span>
evidence: ["RUBRIC.md#routing-questions", "models.md#machine-registry"]</code></pre>
<div class="compare-card-note">A named owner, an exact decision, and a named escalation — a property the graph can check, not a compliance phrase.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>  - id: approve-release
    type: human
    owner: release-manager
    decision: "Ship implement-1's diff to production?"
    <span class="tok-warn">sla_hours: 48</span>  <span class="tok-comment">&larr; no escalation field</span></code></pre>
<div class="compare-card-note">"An sla_hours field with no escalation is an incomplete node and must not ship" — GRAPH.md. A lapsed SLA triggers the named escalation, never silent auto-approval.</div>
</div>
</div>

## In practice

`test/eval/routing.jsonl` is the real, deterministic eval table that scores every skill's description against confusable requests. Its case `r001`, reproduced verbatim, is conduct's:

<pre><code>{"id":"r001","utterance":"this build spans several workstreams, decide whether to run it as a loop or a graph","expect":"conduct","note":"confusable with arrange: both route execution shape"}</code></pre>

Applying `RUBRIC.md` to that utterance: "spans several workstreams" answers routing question 3 — independent workstreams that need their own rubric — which routes to **graph**, not loop. The recorded scorecard at `test/eval/results/2026-08-31-routing.json` shows this exact case's real, already-run result — two attempts, both correct:

<pre><code><span class="tok-ok">{"id": "r001", "expect": "conduct", "picks": ["conduct", "conduct"], "rate": 1, "passed": true,</span>
<span class="tok-ok"> "note": "confusable with arrange: both route execution shape"}</span></code></pre>

The confusable sibling in the same table, `r002` ("this discovery effort needs more than one grill round, what shape should it run in"), expects `arrange` instead — the pm group's own execution-shape router for grill-loop, parallel-fan, and hybrid steps (`model-routing/SKILL.md`). Conduct's own description draws the same line: it routes execution shape for work that builds or changes software; a research or product inquiry's shape is arrange's call.

## How it works

1. Apply the ordered routing questions — first hit wins — to decide loop, graph, or hybrid. See [`RUBRIC.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/RUBRIC.md).
2. Build the node list with each node's output named: a loop stays single-writer, single-verifier ([`LOOP.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/LOOP.md)); a graph gets typed `agent` and `human` nodes joined only on explicit artifact handoff ([`GRAPH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/GRAPH.md)).
3. Resolve a model for every node by calling `model-routing` — conduct never inlines a model ID of its own.
4. Invoke specialist skills — `impact`, `recon`, `architect`, and the rest — by calling them; their protocols are never copied inline. Work items route through `slice`'s pickup protocol.
5. Route every high-consequence write through a `human` node with a named owner, decision, and escalation before it can execute. See [`GRAPH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/GRAPH.md).
6. Map work-item delivery onto the three-stage harness pipeline — assess, deliver, shakedown — so headless runs on any engine follow the same gated stages. See [`GRAPH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/GRAPH.md).
