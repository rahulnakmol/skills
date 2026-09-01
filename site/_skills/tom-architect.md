---
layout: skill
name: tom-architect
title: "TOM Architect — Designing a Target Operating Model"
description: "TOM Architect decomposes business operations into L1-L4 processes, assesses maturity, designs organization and RACI, and maps capabilities to a platform stack."
group: pm
invocation: user-invoked
scenario: "Designing the target operating model for order-to-cash"
lens:
  novice:
    who: "You have been asked to 'build the TOM,' and you do not know whether that means an executive slide or a task-level breakdown of every process in the business."
    value: "TOM Architect makes depth a scope decision up front — L1-L2 for an overview, L1-L4 for a detailed design — so you agree the level before you start decomposing."
  practitioner:
    who: "You run transformation initiatives where a TOM is mandatory, and you are tired of platform conversations happening before anyone has established a maturity baseline."
    value: "Platform mapping is fixed as a Phase 5 activity that follows process decomposition and maturity assessment, never precedes them, so the stack conversation happens on top of real current-state evidence."
  leader:
    who: "Your transformation programs keep producing TOMs that read well but whose organization design does not actually match the maturity gaps discovery found."
    value: "The AI-augmentation classification for each L2 process shapes organization design, KPI cadence, and platform mapping together from the first design pass, not layered on afterward."
  csuite:
    who: "You are funding a transformation and need to know the target state was designed against evidence, not a template pulled from the last engagement."
    value: "A target state defined without first establishing the current-state maturity baseline produces an unrealistic target — TOM Architect will not let target design start before that baseline exists."
---

## What it does

TOM Architect is the pm group's designer for a Target Operating Model — the artifact a transformation-hat initiative is required to produce before an epic manifest is drafted. It translates a business transformation into process decomposition across up to four levels, from the L1 value chain to L4 task-level activities, and a five-point maturity assessment per process. It also designs the organization layer, with a RACI role — responsible, accountable, consulted, informed — at every process step, and maps capability to whichever enterprise platform stack the initiative selected.

It runs Discover, Scope, Analyze, Design, Map, Visualize, Deliver in that order, and platform mapping never precedes process decomposition and maturity assessment. Every scoped L2 process is also classified into one of five AI-augmentation categories — Autonomous, Human-in-the-Loop, Copilot Assist, RPA, or Human Only — because that classification shapes organization design, KPI cadence, and platform mapping all at once, from the first design pass.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Discover the driver</span><span class="step-text">Gather the transformation driver, industry, current state, and target platform stack.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Scope the depth</span><span class="step-text">Select applicable TOM layers, domains, and depth — L1-L2 or L1-L4 — before analysis begins.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Decompose and assess maturity</span><span class="step-text">Place every scoped process on the five-point scale, commissioning research where the landscape is thin.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Design the organization layer</span><span class="step-text">RACI at each process step, service delivery model, KPI framework at three cadences, governance.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Map platform capability last</span><span class="step-text">The AI augmentation overlay and platform mapping follow decomposition and maturity, never precede them.</span></div>
</div>

<ul class="benefits">
  <li>Depth is agreed before decomposition starts — an executive overview stops at L1-L2, a detailed design goes to L1-L4 — so nobody discovers halfway through that the wrong level was assumed.</li>
  <li>The maturity gap between current and target state is what actually drives the epics `carve` later extracts, not a target state imagined without a baseline.</li>
  <li>An AI-augmentation classification is set for every L2 process from the first design pass, so organization design, KPI cadence, and platform fit are never designed as three separate afterthoughts.</li>
  <li>Platform selection happens last, on top of real current-state evidence, rather than steering the whole design toward whichever vendor got named first in a steering meeting.</li>
</ul>

`TOM-METHOD.md` states the ordering rule in one line: "Mapping to a platform before processes are decomposed is backwards; the platform mapping is a Phase 5 activity that follows process decomposition, maturity assessment, and organization design, never precedes them."

- [`TOM-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/tom-architect/TOM-METHOD.md) covers the four-level process taxonomy, the five-point maturity scale, the RACI and KPI framework, and the six supported platform stacks.
- [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) covers why the TOM is mandatory under the transformation hat and optional under the product hat.
- [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md) covers the deep research agents TOM Architect commissions when the current-state landscape is thin.

## When to reach for it

Type `/tom-architect` in Claude Code, or name the skill directly in a session. TOM Architect is user-invoked, so nothing reaches for it on its own: a person decides the transformation hat is active and a full operating-model design is needed.

You reach for TOM Architect in two moments named in `SKILL.md`. The transformation hat is active and a TOM is mandatory for this initiative. The user asks for process decomposition, maturity assessment, or platform capability mapping directly, even outside a formal transformation engagement.

`test/eval/routing.jsonl` case r032 tests this recognition, and it reads, byte for byte:

<pre><code>{"id":"r032","utterance":"design the target operating model with layers and a RACI","expect":"tom-architect"}</code></pre>

TOM Architect is not the only skill that touches this stretch of a transformation. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The transformation hat has not been classified yet | [`discover`]({{ '/discover/' | relative_url }}) |
| The TOM exists and its maturity gaps need to become epics | [`carve`]({{ '/carve/' | relative_url }}) |
| You need end-user personas and journeys, not process decomposition | [`map`]({{ '/map/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>TOM Architect is user-invoked: type <code>/tom-architect</code>, or name it directly in a session. It gathers the transformation driver, industry, and target platform stack through <code>AskUserQuestion</code> before decomposition starts.</p>
<div class="prompt-card">We are transforming order-to-cash under the transformation hat. Design the target operating model: scope L1 through L4, assess current-state maturity per process before touching any target design, and give every L2 process a RACI.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code confirms the depth and target platform, decomposes the process taxonomy, assesses maturity, then designs the organization layer before touching platform mapping.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps tom-architect or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies the seven-phase procedure on its own.</p>
<div class="prompt-card">We are transforming order-to-cash under the transformation hat. Design the target operating model: scope L1 through L4, assess current-state maturity per process before touching any target design, and give every L2 process a RACI.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode works the seven phases in its reply, in order, since no command wraps the document assembly.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. It reads the catalog in <code>.agents/skills/</code> as context and applies the procedure by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode.</p>
<div class="prompt-card">We are transforming order-to-cash under the transformation hat. Design the target operating model: scope L1 through L4, assess current-state maturity per process before touching any target design, and give every L2 process a RACI.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the TOM document directly in its reply, phase by phase, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">We are transforming order-to-cash under the transformation hat. Design the target operating model: scope L1 through L4, assess current-state maturity per process before touching any target design, and give every L2 process a RACI.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same document, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook for tom-architect specifically, so the instruction file is what tells the agent to hold platform mapping until after maturity assessment.</p>
<div class="prompt-card">We are transforming order-to-cash under the transformation hat. Design the target operating model: scope L1 through L4, assess current-state maturity per process before touching any target design, and give every L2 process a RACI.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot works the phases in chat and writes the TOM document through whatever repository access it has.</p>
</div>
</div>

A good ask names the target platform stack if one is already selected, and states the depth preference outright — L1-L2 for an overview, L1-L4 for a detailed design — rather than leaving it for the model to guess. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want tom-architect alone:

```bash
./scripts/link-skills.sh --skill tom-architect
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

You type the prompt above about order-to-cash. TOM Architect's Discover phase gathers the driver — closing the reconciliation gap discovery already surfaced — the industry, and confirms no target platform stack has been picked yet. Scope fixes L1-L4 depth, since the sponsor wants a detailed design rather than an executive overview, and confirms order-to-cash, procure-to-pay, and record-to-report as the three domains in play.

Analyze decomposes order-to-cash down to L2 process groups, and places order reconciliation on the five-point maturity scale at 2-Developing — partial, because matching happens but only through manual CSV work, not because nothing happens at all. Design assigns RACI: the AR analyst is Responsible, the finance lead is Accountable, platform engineering is Consulted. Only after that baseline exists does Map turn to platform capability, closing the maturity gap against Microsoft's D365 Finance & Operations:

<pre><code><span class="tok-comment"># specs/tom/order-to-cash-tom-design.md (excerpt)</span>
L2 process: Order reconciliation
  Owner: AR team lead
  Maturity: 2-Developing (partial)
  RACI: Responsible — AR analyst;
        Accountable — Finance lead;
        Consulted — Platform engineering
  AI overlay: Human-in-the-Loop (AI matches,
    a human approves exceptions)
  KPI cadence: process (daily exception count),
    operational (monthly close cycle time)
  Platform: D365 Finance &amp; Operations —
    automated matching module</code></pre>

The maturity gap recorded here — 2-Developing today, a Human-in-the-Loop target — is exactly what `carve` reads later to extract an epic, rather than inventing one from a platform's feature list.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">Baseline before platform</div>
<pre><code>Phase 3: <span class="tok-ok">Order-to-cash L2 maturity assessed —</span>
<span class="tok-ok">2-Developing (partial)</span>
Phase 5: Platform mapped against that gap —
D365 F&amp;O closes the automation gap
in reconciliation.</code></pre>
<div class="compare-card-note">Platform mapping follows process decomposition and maturity assessment; it never precedes them.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Phase 1: "let's go with D365" — platform</span>
<span class="tok-warn">selected before any process is decomposed.</span>
Maturity baseline: not yet assessed.</code></pre>
<div class="compare-card-note">A target state defined without a current-state baseline produces an unrealistic target.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why can platform mapping not just run first, to save a round of conversation?</summary>
<div class="qa-body">

Because a target defined before the current state is measured is a guess dressed as a plan. `SKILL.md`'s stop condition blocks target design that has not established a current-state maturity baseline first, and `TOM-METHOD.md` states plainly that mapping to a platform before processes are decomposed "is backwards."

</div>
</details>

<details class="qa">
<summary>Do all six TOM layers always get scoped?</summary>
<div class="qa-body">

No — `SKILL.md`'s second stop condition blocks scoping all six without asking which actually apply. Not every transformation touches process, organization, service delivery, technology, data, and governance equally, and scoping all six by default risks decomposing layers nobody asked for.

</div>
</details>

<details class="qa">
<summary>What does the AI-augmentation classification actually change?</summary>
<div class="qa-body">

`TOM-METHOD.md` is explicit that it is not a phase-two concern layered on afterward: a process's classification into Autonomous, Human-in-the-Loop, Copilot Assist, RPA, or Human Only "changes its organization design, its KPI cadence, and its platform mapping all at once," from the first design pass.

</div>
</details>

<details class="qa">
<summary>Why does the KPI framework need three cadences instead of one?</summary>
<div class="qa-body">

`TOM-METHOD.md` states the gap a single cadence leaves: "a KPI framework that only reports at one cadence gives leadership a view but gives no one on the ground a way to catch a problem before it reaches leadership." Strategic, operational, and process-level KPIs each catch a different kind of drift.

</div>
</details>

<details class="qa">
<summary>What happens when the current-state landscape is thin?</summary>
<div class="qa-body">

Research is commissioned rather than the maturity assessment being guessed at, per `RESEARCH-AGENTS.md`, and every commissioned brief lands in `specs/research/` with sources cited before it is used to place a process on the five-point scale.

</div>
</details>

## It's working if

- No target-state design starts before a current-state maturity number exists for the process it targets.
- Every L2 process carries an AI-augmentation classification that visibly shaped its organization design and KPI cadence, not one bolted on afterward.
- Platform selection can be pointed at a specific maturity gap it closes, rather than justified by the vendor's feature list alone.
- KPIs exist at all three cadences — strategic, operational, process — not only the one leadership reads in a quarterly review.

If a TOM keeps naming D365 or S/4HANA in its executive summary before any process appears in the document, the platform conversation has driven the design even though the phases are all still labeled in the right order.

## Where it fits

TOM Architect is the transformation-hat's mandatory design step, reached from `map`'s handoff once the hat is classified as transformation. It sits at the Design phase of the pm group's Discover-Define-Design-Deliver cycle: `DDDD.md` names process decomposition into bounded domains — L1 through L4, not a flat list of activities — as exactly what Design means for a transformation initiative.

Its downstream handoff is `carve`, which extracts epics directly from the maturity gaps a TOM records rather than from a Business Understanding Document alone. Under the product hat, this whole step is optional — `HATS.md` states plainly that most product work does not require a full target operating model.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
