---
layout: skill
name: model-routing
title: "Model Routing — Resolving the Right Model Tier"
description: "Model routing is the model-invoked lookup that resolves which model tier a task node uses from the registry shared by every group in the repository."
group: developer
invocation: model-invoked
lens:
  novice:
    who: 'You have never wanted to memorize a model name, and you should not have to.'
    value: 'Model routing looks up the tier for a role instead — orchestrator, worker, verifier — and hands back a rationale in plain language, not a string to copy.'
  practitioner:
    who: 'You are an orchestrator that just built a node needing an implementer, verifier, or architect model.'
    value: 'Model routing matches the role and the task shape to a row in the canonical registry and returns the tier, the rationale, and the adapter reference — never a raw model secret.'
  leader:
    who: 'You want every pod on the same current model policy instead of each one picking a favorite by habit.'
    value: 'Every group in this repository routes model choice through this one lookup. Change the registry in one place, and the change reaches every skill that calls it — no per-team drift.'
  csuite:
    who: 'You need to know which vendors production AI work actually depends on.'
    value: 'The registry model routing serves is scoped to Anthropic, OpenAI, and Google published defaults only, and a regulated overlay blocks any downgrade past verifier separation — a policy boundary the lookup enforces, not a convention someone remembers.'
---

## What it does

Model routing resolves which model tier a task node should run on, so no other skill in the repository has to embed a model choice of its own. It matches the node's role and task shape against a row in the canonical registry — `models.md` — and returns a tier, a rationale, and an adapter reference, never a raw model identifier. The registry it reads is shared infrastructure: every group in this repository, developer and pm alike, resolves model choice through this same lookup rather than each maintaining its own. An unrecognized role defaults to `worker-fast` with the assumption logged, and a regulated overlay blocks any downgrade past verifier separation.

## How to call it

Model routing is not typed as a command. The model reaches for it whenever an orchestrator or another skill needs to resolve which tier a node should run on — a worker, a verifier, an architect. A prompt like "which model should this verifier step use" is enough to trigger it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A complete routing answer, from the skill's own output contract</div>
<pre><code>tier: worker-deep
role: implement
adapter_ref: adapters/opencode/agents/work-sonnet.md
rationale: <span class="tok-ok">multi-file API change</span></code></pre>
<div class="compare-card-note">A tier, a role, a rationale, and an adapter reference. Nothing here is a raw secret — the tier is what crosses the boundary.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Another skill hardcodes a provider model identifier of its own,</span>
<span class="tok-warn">instead of calling model-routing and reading the tier back.</span></code></pre>
<div class="compare-card-note">Return tier, rationale, and adapter key — not raw secrets. Model routing exists precisely so no other SKILL.md carries a model identifier of its own.</div>
</div>
</div>

## In practice

Step 1 of the skill's own procedure is "Open `models.md`." Its tier matrix is the real table that step 2 matches a role against — this row, quoted verbatim, is the one a read-only verification node resolves against:

<pre><code>| Tier     | Role shape             | Default provider family | Notes                                            |
|----------|-------------------------|--------------------------|--------------------------------------------------|
| verifier | Read-only cross-check   | Anthropic                | Different family from implementer when possible |</code></pre>

Resolving the `verifier` role for a read-only cross-check node returns the shape the output contract requires, filled from that row:

<pre><code>tier: verifier
role: verify
adapter_ref: adapters/opencode/agents/verify.md
rationale: read-only cross-check; different family from implementer where possible</code></pre>

This is the shape the output contract requires, not a captured terminal run. The exact model identifier bound to the `verifier` tier lives only in `models.md` — this page names none, by design.

## How it works

1. Open [`models.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/models.md), the canonical registry.
2. Match the node's role and task shape to a row in the tier matrix. See [`models.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/models.md).
3. Map the resolved tier to a host-specific reference in the active adapter — OpenCode, Copilot, or Cursor.
4. Return the tier, the rationale, and the adapter key — never a raw model identifier. See [`models.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/models.md).
5. Default an unrecognized role to `worker-fast` with the assumption logged; under a regulated overlay, never downgrade past verifier separation.
