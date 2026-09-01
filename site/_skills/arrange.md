---
layout: skill
name: arrange
title: "Arrange — Choosing How PM Work Runs"
description: "Arrange decides whether a discovery, case, TOM, or PRD effort runs as a grill loop, a parallel research fan, or a hybrid, before work begins."
group: pm
invocation: model-invoked
scenario: "Deciding how the reconciliation discovery effort should converge"
lens:
  novice:
    who: "You are staring at a discovery or a case that clearly needs more than one pass, and you do not know whether to run it as one long conversation or split it into pieces."
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

Arrange is the pm group's router for execution shape. Before a discovery, a case, a target operating model, or a PRD effort — drafting the product requirements document — spends a session running the wrong pattern, arrange decides whether it should converge as a grill loop, a parallel research fan, or a hybrid. It has no procedure of its own beyond the decision. Its entire substance is one ordered rubric, and its output is one line: the mode chosen, the routing question that decided it, and the gate the resulting work will feed.

Most pm work has no machine-checkable "done" the way code does — a grill loop, defined in `grill`, is a person's judgment applied round after round. Arrange's job is telling that pattern apart from a parallel research fan, where independent evidence can be gathered without waiting on itself, before an agent burns a session finding out the hard way.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Converges through a human, one round at a time?</span><span class="step-text">Grill-loop. Discovery's five-dimension clarification and a case's sensitivity analysis both work this way.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Independent evidence, none waiting on another's answer?</span><span class="step-text">Parallel-fan. Three research briefs on three unrelated questions fan out safely; three briefs on one question do not.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Would self-review contaminate the result?</span><span class="step-text">Parallel-fan with a distinct reviewing agent — the drafter of a case does not also referee its own sensitivity analysis.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Is this a high-consequence artifact?</span><span class="step-text">Grill-loop plus a human gate. A case a sponsor is about to approve gets no shortcut around GATES.md.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">None of the above cleanly fit?</span><span class="step-text">Hybrid — a grill-loop shell, with a parallel-fan round feeding any one round whose evidence base is thin.</span></div>
</div>

<ul class="benefits">
  <li>Every routing decision names the question that decided it, in the same line as the mode, so a PM can defend the call later instead of re-litigating it from memory.</li>
  <li>Partition beats lottery: independent branches that each answer a genuinely different question cost less than agents that redundantly answer the same one, hoping one of them is thorough.</li>
  <li>Same-model majority voting never substitutes for a sponsor's sign-off — arrange still routes every high-consequence artifact through its gate, whichever shape it chose.</li>
  <li>Model tier is resolved per step, not per artifact, so a mechanical research pass and a judgment pass are never taxed at the same rate.</li>
</ul>

`RUBRIC.md` states the token discipline in one line: "Count tokens, not agents. A parallel-fan of five research agents that duplicates the same shallow question five times costs five times as much for the same result as one agent asking it once."

- [`RUBRIC.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/arrange/RUBRIC.md) carries the five ordered routing questions above, the failure signatures that follow from getting one wrong, and the prohibited patterns arrange refuses to route toward.
- [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md) is what a parallel-fan actually commissions — deep research briefs or the grill's provoke-mode hypotheses.
- [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md) names the four human sign-off points every high-consequence artifact still reaches, regardless of the shape arrange chose.

## When to reach for it

Arrange has no slash command. It is reached the way every model-invoked skill in this catalog is reached: an orchestrating skill calls it when its own procedure needs a shape decided. `discover`, `case`, `tom-architect`, and `prd-draft` each name arrange as the step that runs before more than one grill round or research commission begins. You do not address arrange directly — you address the skill doing the work, and that skill reaches for arrange once the request signals more than one round is coming.

`test/eval/routing.jsonl` carries a deliberate near-neighbor pair testing exactly this recognition. Case r002 reads, byte for byte:

<pre><code>{"id":"r002","utterance":"this discovery effort needs more than one grill round, what shape should it run in","expect":"arrange","note":"confusable with conduct"}</code></pre>

Case r001, immediately before it in the same file, is phrased almost identically but describes a software build instead of a pm inquiry:

<pre><code>{"id":"r001","utterance":"this build spans several workstreams, decide whether to run it as a loop or a graph","expect":"conduct","note":"confusable with arrange: both route execution shape"}</code></pre>

The pair tests whether a request gets told apart by what is being routed — questions and evidence route to arrange, code routes to the developer group's `conduct` — and the eval fails if the two swap.

Arrange is not the only skill that touches how pm work runs. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The work is a software build spanning workstreams, not a pm inquiry | [`conduct`]({{ '/conduct/' | relative_url }}) |
| The shape is already obvious — you only need the round protocol itself | [`grill`]({{ '/grill/' | relative_url }}) |
| The initiative cannot be planned in a single session at all | [`chart`]({{ '/chart/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Arrange is not typed. When <code>discover</code>, <code>case</code>, <code>tom-architect</code>, or <code>prd-draft</code> reaches a point that needs a shape decided, it calls the Skill tool with <code>arrange</code> — the mechanism the invocation axis in every skill's frontmatter declares for a model-invoked skill. The prompt below is addressed to the session running discovery; arrange fires inside it once the multi-round signal is there.</p>
<div class="prompt-card">This discovery effort has thin evidence in two of the five dimensions, and it is going to take more than one grill round to converge. Decide how it should run before we start, and tell me which gate the result feeds.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The session returns the routing line first — mode, the question that decided it, and the gate — then proceeds using that shape.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools — <code>architect</code>, <code>impact</code>, <code>operate</code>, <code>quality</code>, <code>security</code>, <code>sdlc</code>, and <code>grit-verify</code> among them. No command wraps arrange or any pm skill, so the agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies arrange's description on its own when a request matches it.</p>
<div class="prompt-card">This discovery effort has thin evidence in two of the five dimensions, and it is going to take more than one grill round to converge. Decide how it should run before we start, and tell me which gate the result feeds.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent states the routing line in its reply before continuing, since there is no command output to parse it from.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository for any skill. It reads the catalog in <code>.agents/skills/</code> as context and applies arrange's rubric by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode rather than a pinned model identifier.</p>
<div class="prompt-card">This discovery effort has thin evidence in two of the five dimensions, and it is going to take more than one grill round to converge. Decide how it should run before we start, and tell me which gate the result feeds.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor states mode, why, and gate directly in its reply, then proceeds with discovery under that shape.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees arrange's name and description the way the other four tools do. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">This discovery effort has thin evidence in two of the five dimensions, and it is going to take more than one grill round to converge. Decide how it should run before we start, and tell me which gate the result feeds.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex names the routing line the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. There is no command layer and no pm-specific hook — the instructions file is what tells the agent to apply a matching skill's description, arrange's included, before it starts a multi-round effort.</p>
<div class="prompt-card">This discovery effort has thin evidence in two of the five dimensions, and it is going to take more than one grill round to converge. Decide how it should run before we start, and tell me which gate the result feeds.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot reports the routing line in chat before it proceeds with the discovery work itself.</p>
</div>
</div>

A good ask names the artifact under discussion, states plainly that more than one round or research commission is coming, and says whether the branches — if any — are genuinely independent of each other. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want arrange alone, without the rest of the pm group:

```bash
./scripts/link-skills.sh --skill arrange
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces a skill once it is on disk.

## A working example

You are running `discover` on a reconciliation problem: month-end close keeps slipping by three business days, and the evidence in hand only covers two of the five clarification dimensions. You type the prompt from the tool block above. Discover recognizes that the clarification is going to take more than one grill round, and reaches for arrange before running the first one.

Arrange applies `RUBRIC.md` in order. Question one asks whether this converges only through a human's sign-off, one round at a time — and it does: nobody but the finance lead can confirm which stakeholder account is actually load-bearing, and that confirmation only comes by asking, reacting, and asking again. The first question already matches, so arrange stops there rather than weighing the remaining four.

Arrange returns:

<pre><code>mode: grill-loop
why: "Discovery's five-dimension clarification converges only
     through a human's sign-off, one round at a time."
gate: framing</code></pre>

Discover proceeds into the grill's themed rounds under that shape. Later, once the analysis is written, `case` needs to weigh at least two real options against doing nothing, and arrange runs again. This time question two matches first: the market-sizing research and the vendor-capability research do not depend on each other's answers, so that stretch of the work fans out instead of looping.

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
<div class="compare-card-note">Three agents built on one model agreeing is one opinion said three times, never a sponsor's sign-off — <code>RUBRIC.md</code> names this a prohibited pattern outright.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if no human convergence point exists at all?</summary>
<div class="qa-body">

`SKILL.md` states this as a stop condition, not a judgment call: no human convergence point identified means stop, because the work has no shape to route yet. Routing a piece of work before anyone can say what it is converging toward just picks a pattern for a question nobody has actually framed.

</div>
</details>

<details class="qa">
<summary>My parallel-fan branches turned out not to be independent after all — now what?</summary>
<div class="qa-body">

Collapse to a grill-loop. This is the second stop condition in `SKILL.md`: a parallel-fan whose branches are not actually independent stops being a fan and becomes three agents redundantly answering the same question. `RUBRIC.md` names this failure signature directly — "parallel-fan without partition" — and the fix is the same loop the rubric would have chosen in the first place, not a fan run anyway.

</div>
</details>

<details class="qa">
<summary>Does arrange also pick the model?</summary>
<div class="qa-body">

No. Arrange decides the shape; `model-routing` resolves the tier, one call per step rather than one per artifact. A grill round's question-generation step and a research agent's fact-gathering step do not carry the same weight, so they are not priced the same way.

</div>
</details>

<details class="qa">
<summary>Does a hybrid shape mean two separate gate ledgers?</summary>
<div class="qa-body">

No, and `RUBRIC.md` is explicit that the shape decision here never changes a ledger's depth: a grill-loop walks one ledger, and a parallel-fan gives each genuinely independent branch its own leaf ledger — the same independence the rubric already requires of a fan. Shape comes from routing; depth comes from `grit`. The two stay separate on purpose.

</div>
</details>

<details class="qa">
<summary>How is this different from conduct?</summary>
<div class="qa-body">

Both route execution shape, and both apply an ordered rubric where the first matching question wins — that is exactly why `test/eval/routing.jsonl` pairs r001 and r002 as near-neighbors. The difference is what is being routed: arrange routes pm inquiry, where convergence is a person's judgment; `conduct` routes software delivery, where "done" is usually machine-checkable. A request describing a build routes to conduct; a request describing a discovery or a case routes to arrange.

</div>
</details>

## It's working if

- Every mode arrange returns carries the routing question that decided it, in the same line, not as a separate note someone has to go find.
- A parallel-fan never ships with branches that turn out to share the same question — that gets caught and collapsed to a grill-loop before work starts on it.
- A high-consequence artifact — a case, a PRD nearing Quality, a constitution revision — reaches its gate regardless of which shape arrange chose for the work behind it.
- Model tier gets resolved per step through `model-routing`, not assumed uniform across a whole effort.

If routing decisions start recording "mode: parallel-fan" with three same-model reviewers agreeing as the stated "why," arrange's own prohibited pattern has crept back in even though a line still gets written and still looks like reasoning.

## Where it fits

Arrange sits at the Define phase of the pm group's own Discover-Define-Design-Deliver cycle, its self-maturing four-phase working rhythm. `DDDD.md` names it directly: "it is where the execution shape gets chosen: arrange's rubric decides grill-loop, parallel-fan, or hybrid, the same 'be smart, don't default' discipline the developer side applies to loop versus graph. A baseline reached without the routing decision made explicit is a draft pretending to be a plan."

Its nearest neighbor on the developer side is `conduct`, which routes the same kind of decision for software delivery instead of pm inquiry — the r001/r002 pair above exists because the two are close enough to confuse. Downstream, a grill-loop decision hands off to `grill`'s round protocol, and a parallel-fan decision hands off to the research and intuition agents in `RESEARCH-AGENTS.md`.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
