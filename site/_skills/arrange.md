---
layout: skill
name: arrange
title: "Arrange — Choosing How PM Work Runs"
description: "Arrange decides whether a discovery, case, TOM, or PRD effort runs as a grill loop, a parallel research fan, or a hybrid, before work begins."
group: pm
invocation: model-invoked
lens:
  novice:
    who: "You're staring at a discovery or a case that clearly needs more than one pass, and you don't know whether to run it as one long conversation or split it into pieces."
    value: "Arrange picks the shape for you, in one line you can read before committing an afternoon to the wrong approach."
  practitioner:
    who: "You run multiple pm efforts at once and keep guessing whether a case or a PRD needs a grill loop, a parallel research fan, or both."
    value: "The routing question that decided the shape is recorded with the decision, so you can defend the call later instead of re-litigating it."
  leader:
    who: "Your PMs are burning agent sessions on research that duplicates itself, or on grill loops that never converge."
    value: "One rubric applied consistently across the team catches both failure modes early: partition beats lottery, and every high-consequence artifact still routes through its gate."
  csuite:
    who: "You approve initiatives whose analysis was assembled by an agent fleet you did not watch work."
    value: "Arrange keeps same-model majority voting from standing in for a sponsor's sign-off — every high-consequence routing decision still lands at a human gate."
---

## What it does

Arrange selects the execution shape a piece of pm work should run in: a grill loop, a parallel research fan, or a hybrid of the two — the decision itself, not a workflow engine that runs it. Most pm work has no machine-checkable "done" the way code does; it converges through a person's judgment, round after round, or it does not converge at all. Arrange applies an ordered rubric to tell which convergence pattern actually fits before a discovery, a case, a target operating model, or a PRD effort spends a session running the wrong one. The output is one line: the mode chosen, the routing question that decided it, and the gate the resulting work will feed.

## How to call it

Arrange is model-invoked, so there is no slash command for it. The model reaches for it whenever a request asks how a multi-round pm effort should be organized — for example: "this discovery effort needs more than one grill round, what shape should it run in." Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A routing decision that names its own reasoning</div>
<pre><code>mode: grill-loop
<span class="tok-ok">why: "Discovery's five-dimension clarification converges only</span>
<span class="tok-ok">     through a human's sign-off, one round at a time."</span>
gate: framing</code></pre>
<div class="compare-card-note">First matching rule wins, and the line naming why it matched travels with the mode.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>mode: parallel-fan
<span class="tok-warn">why: "three agents on the same model agreed, so we</span>
<span class="tok-warn">     skipped the sponsor sign-off"</span>
gate: <span class="tok-comment">(none — approved by consensus)</span></code></pre>
<div class="compare-card-note">Three agents built on one model agreeing is one opinion said three times, never a sponsor's sign-off.</div>
</div>
</div>

## In practice

`test/eval/routing.jsonl` exercises this exact routing decision, and two of its cases exist as a deliberate near-neighbor pair. Case r002 reads, byte for byte:

<pre><code>{"id":"r002","utterance":"this discovery effort needs more than one grill round, what shape should it run in","expect":"arrange","note":"confusable with conduct"}</code></pre>

Case r001, immediately before it in the same file, is phrased almost identically but describes a software build instead of a discovery effort:

<pre><code>{"id":"r001","utterance":"this build spans several workstreams, decide whether to run it as a loop or a graph","expect":"conduct","note":"confusable with arrange: both route execution shape"}</code></pre>

The pair tests whether the model tells pm-shaped multi-round work apart from delivery-shaped multi-round work — r001 routes to the developer group's `conduct`, r002 to arrange, and the eval fails if the model swaps them.

## How it works

1. **Apply the rubric in order.** The first routing question that matches wins; evaluation stops there rather than weighing every rule. See [`RUBRIC.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/arrange/RUBRIC.md).
2. **Grill-loop or parallel-fan.** A grill-loop routes to the round protocol in `grill`; a parallel-fan commissions independent research or provoked hypotheses, genuinely independent branches only. See [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md).
3. **Tier per step, not per artifact.** A mechanical research pass and a judgment pass do not need the same model tier.
4. **The gate still applies.** Every high-consequence artifact routes through its gate's human sign-off regardless of the shape chosen. See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
