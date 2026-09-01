---
layout: skill
name: conduct
title: "Conduct — Choosing How Delivery Work Executes"
description: "Conduct is the model-invoked router that decides whether a piece of delivery work runs as a loop, a graph, or a hybrid, and assigns a model to every node."
group: developer
invocation: model-invoked
scenario: "Routing QuenServe's story E1-F1-S1 — complete an inspection with no connectivity and it syncs without loss — before any agent starts"
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

Conduct decides how a piece of delivery work should execute — one loop, a graph of independent branches, or a hybrid of both — before any agent starts. It routes on verifiability, never on difficulty: a hard task with one clean check still runs as a loop, and an easy task that fans out into independent pieces still runs as a graph. The question the rubric asks is never "how hard is this," it is "how is done actually checked."

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Apply the rubric</span><span class="step-text">Walk RUBRIC.md's ordered questions, first hit wins, to land on loop, graph, or hybrid.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Build the node list</span><span class="step-text">A loop stays one writer and one verifier; a graph gets typed agent and human nodes joined on explicit artifact handoff.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Resolve a model per node</span><span class="step-text">Every node's tier comes from `model-routing` — conduct never inlines a model identifier of its own.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Gate high-consequence writes</span><span class="step-text">Production data, a release, or an irreversible action routes through a named human node before it executes.</span></div>
</div>

<ul class="benefits">
  <li>A graph only forms when the rubric's own evidence — independent workstreams, self-review contamination, state that must outlive the session, or a high-consequence write — actually calls for one, never because it looks more thorough.</li>
  <li>Every node's model comes from `model-routing`, so the routing decision and the model decision stay two separate, auditable calls rather than one person's habit.</li>
  <li>A high-consequence write cannot execute without a named owner, an exact decision, and a named escalation path attached to its human node.</li>
  <li>An ambiguous "done" criterion stops the routing decision cold and calls `impact` to force a SPEC-TS ledger — the scope, requirements, and success-metrics record `sdlc` later walks gate by gate — into existence, rather than inventing acceptance criteria as it goes.</li>
</ul>

Each resulting node's model gets resolved through `model-routing`, and a work item's pickup protocol from `slice/WORK-ITEM-CONTRACT.md` governs how a graph's agent nodes actually pick up their pieces. Conduct decides execution shape only; how deeply "done" gets verified inside any one node is `grit`'s call, not conduct's — the two are separate axes, and RUBRIC.md states that division directly rather than leaving it implied.

- [`RUBRIC.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/RUBRIC.md) covers the ordered routing questions, the evidence behind them, and the failure signatures that mean a routing call went wrong.
- [`GRAPH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/GRAPH.md) covers the two node types, how edges join only on explicit handoff, and how work-item delivery maps onto the pipeline's three graph stages.
- [`LOOP.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/conduct/LOOP.md) covers the single-writer, single-verifier shape a loop keeps, and how its verification tree stays sections of one grit gate ledger rather than separate agents.

## When to reach for it

Conduct is not typed as a command. The model reaches for it on its own when a request matches its description — work that spans multiple gates or contexts, or needs routing before implementation begins. The real, current line `r001` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger:

<pre><code>{"id":"r001","utterance":"this build spans several workstreams, decide whether to run it as a loop or a graph","expect":"conduct","note":"confusable with arrange: both route execution shape"}</code></pre>

The recorded scorecard at `test/eval/results/2026-08-31-routing.json` shows this case's real, already-run result — two attempts, both correct:

<pre><code><span class="tok-ok">{"id": "r001", "expect": "conduct", "picks": ["conduct", "conduct"], "rate": 1, "passed": true,</span>
<span class="tok-ok"> "note": "confusable with arrange: both route execution shape"}</span></code></pre>

The confusable sibling in the same table, `r002` — "this discovery effort needs more than one grill round, what shape should it run in" — expects `arrange` instead: the pm group's own execution-shape router for grill-loop, parallel-fan, and hybrid research steps. Both skills route execution shape; the line between them is what kind of work is being shaped. Conduct routes work that builds or changes software. Arrange routes an inquiry — a discovery, a business case, a target operating model — that converges through a person's judgment rather than a machine-checkable test.

| The problem | The skill |
|---|---|
| The work is a research or product inquiry, not software delivery | [`arrange`]({{ '/arrange/' | relative_url }}), the pm group's router |
| You need a model tier for one node conduct already built | [`model-routing`]({{ '/model-routing/' | relative_url }}) |
| You need the whole gated build loop, not only the shape decision in front of it | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need to decide how finely "done" is split into gates, not whether the work runs as a loop or a graph | [`grit`]({{ '/grit/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same conduct skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want conduct can skip the rest of the catalog with `./scripts/link-skills.sh --skill conduct`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; three plugin workflow stages</span></div>
<div class="tool-group-body">
<p>Conduct is model-invoked: nothing is typed to call it. It gets no plugin slash command of its own. But the three dynamic workflows this repository ships as a Claude Code plugin — <code>/rahulnakmol-skills:assess-work-item</code>, <code>/rahulnakmol-skills:deliver-work-item</code>, and <code>/rahulnakmol-skills:shakedown-pr</code> — are the three graph stages <code>GRAPH.md</code>'s harness mapping names: assess, deliver, and shakedown. A human gate separates each stage, placed between runs by the runtime rather than mid-run.</p>
<div class="prompt-card">Decide whether this story runs as a loop or a graph before any agent starts: complete an inspection with no connectivity and have it sync without loss once back online, story E1-F1-S1. It touches the offline store, the sync client, and the server's ingestion endpoint.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Conduct returns the mode, and the reasoning behind it — here, a loop, since every path the story touches sits inside one owned module.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Embedded in the /sdlc command's own routing question</span></div>
<div class="tool-group-body">
<p>OpenCode ships no <code>conduct</code> command either. Its routing question is embedded directly in the <code>/sdlc</code> command's own description instead: "choosing no-loop, one worker, specialist chain, workflow, or human gate" before implementation. It closes with the line "Prefer no loop when one agent suffices" — the same bias RUBRIC.md's own ordered questions encode, applied without naming conduct by name.</p>
<div class="prompt-card">/sdlc Complete an inspection with no connectivity and have it sync without loss once back online — story E1-F1-S1. Decide execution shape before touching any code.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The <code>sdlc</code> agent states its chosen shape and the reasoning behind it before Design Pass 1 begins.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply conduct's rubric as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor routes model choice through its own <code>auto</code> mode rather than a pinned identifier, and a team adds its rules to <code>.cursor/rules/</code>. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees conduct's name and description the same way the other tools do, and a team adds its rules directly to <code>AGENTS.md</code>. Copilot's agent mode applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Read skills/developer/conduct/RUBRIC.md and GRAPH.md, then route story E1-F1-S1 — complete an inspection with no connectivity and sync it without loss once back online — and state whether it runs as a loop or a graph, and why.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three state the routing answer directly in their reply, since none has a command's output to parse.</p>
</div>
</div>

A good ask names the scope that is actually changing — how many services, how many verifiers, whether a write is reversible — since the rubric routes on that evidence, not on a difficulty estimate.

## A working example

Story E1-F1-S1 is the same one `grit`'s own worked example writes a gate ledger for — before that ledger exists, conduct decides how the work executes. An inspector needs to complete an inspection with no connectivity and have it sync without loss once back online. Applying `RUBRIC.md`'s ordered questions, first hit wins:

Question 1 asks whether "done" is machine-checkable at all. It is: an inspection saved locally, every field reaching the server unchanged, and a retried sync that never duplicates a record are all things a command can check — the same three checks grit's own gate ledger, `G1` through `G3`, is built to run. Question 2 asks whether the work fits one artifact, one verifier, one context window. It does: the change touches the offline store, the sync client, and the server's ingestion endpoint, but every file it may write sits inside one owned module, `packages/inspections/offline/**`, the same `OWNS` line grit's own ledger records. Routing lands on **loop**, and the rubric stops evaluating further questions, since the first hit wins — question 3's independent-workstreams test is never reached.

Building the node list per `LOOP.md`, a single writer and a single verifier, each resolved through `model-routing`, iterating against the SPEC-TS ledger until it passes or a hard cap is hit:

<pre><code>mode: loop
nodes:
  - id: implement-offline-sync
    type: agent
    skill: sdlc
  - id: verify-offline-sync
    type: agent
    skill: grit
evidence: ["RUBRIC.md#routing-questions", "models.md#machine-registry"]</code></pre>

This is the shape the rubric and the output contract require, not a captured run, since conduct has no fixture script of its own to execute. No human node appears here, not because the write is unimportant, but because question 2 already resolved the routing decision — question 6, the one that would add a human gate for a high-consequence write, is never reached once an earlier question has matched. Once this loop exists, `grit`'s own ledger for the same story decomposes verification inside it, section by section rather than node by node; conduct's answer and grit's ledger are two different questions about the same piece of work, answered by two different skills.

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

## Common questions

<details class="qa">
<summary>Does choosing a deeper verification tree mean conduct builds a bigger graph?</summary>
<div class="qa-body">

No. RUBRIC.md states this as its own section, "Depth of verification, not shape of execution": a gate is a ledger row, a node is an agent. Deepening grit's ledger from five layers to ten adds rows to check against, never agents conduct dispatches. A hard verification tree bolted onto work that fits one artifact and one verifier is still, by question 2, a loop — depth never changes the routing answer, and the routing answer never changes because a ledger got deeper.

</div>
</details>

<details class="qa">
<summary>Why is conduct's name different from the pm group's execution-shape router?</summary>
<div class="qa-body">

Both were once named `orchestrate`, and this repository's own architecture decision record, ADR 0007, records why that collided: the flat installation namespace this repository uses gave one skill's files to whichever group happened to install last, silently overwriting the other. Both were renamed to what they actually do rather than leaving the survivor holding a name whose meaning was always split between two jobs — `conduct` selects execution shape for software delivery, `arrange` selects it for a research or product inquiry.

</div>
</details>

<details class="qa">
<summary>What happens when "done" is not machine-checkable at all?</summary>
<div class="qa-body">

That is question 1, and it is a stop, not a guess. Conduct does not invent acceptance criteria mid-decision to keep a routing call moving; it calls `impact` to force a SPEC-TS ledger into existence first. RUBRIC.md names an ungrounded spec as the single most common cause of a loop or graph running to completion against the wrong target.

</div>
</details>

<details class="qa">
<summary>Can a graph run with only agent nodes and no human node?</summary>
<div class="qa-body">

Only when nothing in it is a high-consequence write. GRAPH.md treats `human` as a first-class node type, not a stop condition bolted onto an all-agent graph, and every high-consequence write — production data, a release, an irreversible external action — routes through one before it executes. Dropping that node to preserve throughput is named directly in RUBRIC.md's prohibited patterns.

</div>
</details>

<details class="qa">
<summary>Does degrading to a simpler tool ever drop a gate?</summary>
<div class="qa-body">

No, and RUBRIC.md names this as one of its failure signatures to watch for: a harness that cannot run the full graph and quietly falls back to a lighter mode without carrying the human gate along. Degradation changes execution shape — Codex, Cursor, and Copilot fall back to a sequential loop over the same stage contracts `GRAPH.md`'s harness mapping names — it never removes a gate.

</div>
</details>

## It's working if

- Every routing decision names the question that decided it — question 2 for a loop, question 3 or later for a graph — rather than a shape chosen out of habit.
- A high-consequence write always has a human node in front of it with a named owner, an exact decision, and a named escalation, never only an `sla_hours` field.
- Every node's model traces back to a `model-routing` call, and no node carries a model identifier conduct assigned on its own.
- A graph costs more than a loop, and it forms only when independence, self-review risk, durable state, or consequence is named explicitly — never because a diagram looks more sophisticated.

If a graph keeps growing branches that duplicate the same shallow pass instead of partitioning genuinely independent work, the routing decision has failed even though every node still reports its own success.

## Where it fits

**Conduct is the first decision on QuenServe's E1-F1-S1 story, before grit's ledger exists and before sdlc walks a single gate.**

Its nearest neighbor is `sdlc`: sdlc owns the gated build loop itself — design, build, secure, release — and calls conduct first to learn whether that loop runs as one writer or as a graph of them. `grit` is the sibling that answers a different question about the same work: not how it executes, but how finely "done" gets checked once it does. `model-routing` is the lookup every node conduct builds ends at, resolving a tier without conduct ever inlining a model identifier of its own.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names "build" as the trigger that points at `conduct` or `sdlc` directly.
