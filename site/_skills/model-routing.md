---
layout: skill
name: model-routing
title: "Model Routing — Resolving the Right Model Tier"
description: "Model routing is the model-invoked lookup that resolves which model tier a task node uses from the registry shared by every group in the repository."
group: developer
invocation: model-invoked
scenario: "Resolving the verifier tier for QuenServe story E1-F1-S1's independent review at Gate 3"
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

Model routing is a lookup, not a process with stages a person walks through — a request comes in naming a role and a task shape, and one row of the registry comes back out. No other skill in this repository embeds a model choice of its own; every one of them calls this lookup instead, so a single file governs what actually runs.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Open the registry</span><span class="step-text">Read the canonical tier matrix in `models.md`, never a copy or a memory of it.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Match role and shape</span><span class="step-text">Find the row whose role and task shape fit the node being resolved — implementer, verifier, architect, and so on.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Map to the adapter</span><span class="step-text">Translate the matched tier into the host-specific reference the active tool — OpenCode, Copilot, or Cursor — actually reads.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Return tier, not secret</span><span class="step-text">Hand back the tier, the rationale, and the adapter key. A raw model identifier never crosses this boundary.</span></div>
</div>

<ul class="benefits">
  <li>No SKILL.md or adapter file carries a model identifier of its own — every one of them calls this lookup and reads the tier back.</li>
  <li>A registry change in one place, `models.md`, reaches every skill in every group that resolves a node through it, without a per-team edit.</li>
  <li>An unrecognized role never stalls a run: it defaults to `worker-fast` with the assumption logged, so the gap is visible rather than silently guessed past.</li>
  <li>A regulated overlay blocks any downgrade past verifier separation, so a cost-saving substitution cannot quietly remove the independent check a governed change needs.</li>
</ul>

Model routing is shared infrastructure, not a developer-group convenience that happens to live under `skills/developer/`. `pm/arrange`, the pm group's own execution-shape router, calls this same lookup per research or grill-loop step it builds — a mechanical pass and a judgment pass do not need the same tier, and neither group maintains a separate registry to make that call.

- [`models.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/model-routing/models.md) is the registry itself: the tier matrix, the published role-to-default mapping, the machine-readable block an adapter reads, and the review triggers that tell `update-models` when a row is stale.

## When to reach for it

Model routing is model-invoked, so nothing is typed to call it directly. The model reaches for it on its own whenever an orchestrating skill or an adapter is about to dispatch a node and needs to know which tier that node should run on. A prompt like "which model should this verifier step use" is enough to trigger it — that is the real, current line `r020` in this repository's routing evaluation set, `test/eval/routing.jsonl`.

You reach for it, indirectly, in three moments. An orchestrator just built a node — implement, verify, architect, security — and needs its tier resolved before dispatch. An adapter stub says outright "resolve via model-routing" rather than naming an identifier. A regulated change needs assurance that the verifier tier was not silently downgraded to save a token budget.

| The problem | The skill |
|---|---|
| You need to change what the registry says by default, not just read what it currently says | [`update-models`]({{ '/update-models/' | relative_url }}) |
| You need the whole loop-or-graph routing decision for a piece of delivery work, not one node's tier | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You are resolving a tier for a pm-group research or grill step rather than a developer-group build node | [`arrange`]({{ '/arrange/' | relative_url }}), which calls this same registry per step |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same model-routing skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want model routing can skip the rest of the catalog with `./scripts/link-skills.sh --skill model-routing`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; baked into the worker subagents</span></div>
<div class="tool-group-body">
<p>Model routing carries no slash command of its own — nothing to type. Its clearest trace sits in the three worker subagents `./scripts/install-adapters.sh --tool claude` installs into <code>~/.claude/agents</code>. Each of <code>work-fast.md</code>, <code>work-deep.md</code>, and <code>reviewer.md</code> states in its own frontmatter description that it resolves a model through this lookup, and each carries the line "Registry: <code>skills/developer/model-routing/models.md</code>" pointing at the same file.</p>
<div class="prompt-card">Gate 3 on QuenServe's story E1-F1-S1 needs an independent, read-only verifier now that the offline-sync implementation is done. Resolve the tier for that role and tell me the rationale — I do not want a raw model identifier, I want to know why this tier fits.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The reply names the tier, states the rationale in plain language, and points at the adapter reference the session actually dispatches — never the identifier itself.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; baked into the agent files</span></div>
<div class="tool-group-body">
<p>OpenCode ships no <code>model-routing</code> command either. Its agent files carry the resolution already made: <code>work-glm.md</code>, <code>work-k3.md</code>, and <code>quick.md</code> each point back at "the override table" in <code>models.md</code> for a user who wants to re-bind a role locally. The registry is applied when these agent files are authored and reviewed, not re-resolved on every dispatch inside a running session.</p>
<div class="prompt-card">Before dispatching the E1-F1-S1 verifier, confirm its model binding still matches models.md's verifier row and hasn't drifted from a hand edit.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode answers by reading the agent file's own frontmatter and the registry row side by side, since there is no live call to reproduce.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and resolve a tier by reading <code>models.md</code> directly as working context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor's own adapter file states this plainly: "Model IDs resolve via <code>skills/developer/model-routing/models.md</code> locally," and it routes its own model choice through its <code>auto</code> mode rather than a pinned identifier. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees model routing's name and description the way the other tools do. Copilot's agent mode applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Read skills/developer/model-routing/SKILL.md and models.md, then tell me the tier, rationale, and adapter reference for E1-F1-S1's Gate 3 verifier — no raw identifier.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three read the tier matrix directly and report the same three fields the output contract requires, in their reply rather than a command's output.</p>
</div>
</div>

A good ask names the role — implementer, verifier, architect, security, quality-operate, research, or orchestrator — and the task shape behind it, so the match is not left to guesswork.

## A working example

Story E1-F1-S1 is the delivery story inside epic E1 on [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every scenario on this site returns to. Walked through `sdlc`'s own gated loop, it reaches Gate 3, the outcome check that runs after implementation. Gate 3 needs an independent verifier — a different agent, ideally a different model family, checking the offline-sync change against the SPEC-TS ledger, the record of scope, requirements, and success metrics, rather than the implementer grading its own work. The orchestrator resolves that node's tier by matching role and task shape against the registry's real tier matrix:

<pre><code>| Tier     | Role shape             | Default provider family | Notes                                            |
|----------|-------------------------|--------------------------|--------------------------------------------------|
| verifier | Read-only cross-check   | Anthropic                | Different family from implementer when possible |</code></pre>

Matching the `verifier` role and its read-only, cross-check shape against that row, and filling the output contract the skill's own procedure requires, produces this — the shape the contract requires, not a captured run, since model routing has no runnable script of its own:

<pre><code>tier: verifier
role: verify
adapter_ref: adapters/opencode/agents/verify.md
rationale: read-only cross-check on QuenServe's E1-F1-S1 offline-sync change; different family from implementer where possible</code></pre>

| The lookup returns | Not this |
|---|---|
| A tier, a rationale, and an adapter reference the session can dispatch against | A raw provider model identifier copied into another skill or an implementer prompt |

The exact identifier bound to the `verifier` tier lives only in `models.md`; this page names none, by design, and neither does the answer this lookup hands back.

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

## Common questions

<details class="qa">
<summary>What happens when a role is not in the registry?</summary>
<div class="qa-body">

The stop condition is explicit, not a silent fallback reported as a decision: an unrecognized role defaults to `worker-fast`, and the assumption gets logged rather than absorbed quietly into the run. A missing row is a finding about the registry, not a reason to guess at a stronger or weaker tier on the spot.

</div>
</details>

<details class="qa">
<summary>Can a regulated change ever downgrade the verifier?</summary>
<div class="qa-body">

No. Under a regulated overlay, the lookup never downgrades past verifier separation — the read-only, cross-family check that Gate 3 depends on stays in place regardless of cost pressure. This is the same boundary `responsible-ai-governance` overlays onto the rest of the stack; model routing enforces its own slice of it directly in the lookup.

</div>
</details>

<details class="qa">
<summary>Why does this page never show an actual model name?</summary>
<div class="qa-body">

Because the tier is the contract other skills are built against, not the identifier behind it. `models.md` is the one place a specific provider model is bound to a role, so that binding can change — on evidence, through `update-models` — without touching every skill that calls this lookup. Naming an identifier here would recreate the exact drift this lookup exists to prevent.

</div>
</details>

<details class="qa">
<summary>Does every group route through the same registry?</summary>
<div class="qa-body">

Yes. `models.md`'s own policy line scopes published defaults to Anthropic, OpenAI, and Google, and both the developer and pm groups resolve model choice through this one lookup rather than maintaining separate copies. `pm/arrange` names this directly in its own procedure: a mechanical pass and a judgment pass call model routing per step, the same way a developer-group orchestrator does per node.

</div>
</details>

## It's working if

- No SKILL.md or adapter file in the repository carries a hardcoded model identifier of its own — every one of them reads a tier back from this lookup instead.
- A registry change made once in `models.md` shows up the next time any group resolves a node, without a matching edit anywhere else.
- An unrecognized role logs its `worker-fast` fallback explicitly, rather than the run continuing as though nothing was assumed.
- A regulated run's verifier node stays in a different tier and, where possible, a different provider family from its implementer, every time.

If a skill or adapter file starts carrying a provider model identifier of its own again, the discipline has failed even though every existing call to this lookup still returns a clean tier.

## Where it fits

**Model routing is the lookup every routing decision in this repository ends at, never the decision itself.**

Its nearest neighbor is `conduct`: conduct decides loop, graph, or hybrid for a piece of delivery work and then calls this lookup once per node it builds — conduct owns the shape, model routing owns what runs inside each piece of it. `update-models` is the other side of the same file: it researches provider catalogs and proposes the diff that becomes tomorrow's row in the tier matrix, while this lookup only ever reads the row that exists today.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
