---
layout: skill
name: architect
title: "Architect: Cross-Cutting Technical Design"
description: "Architect turns a scoped requirement into an ADR-ready design pack: bounded components, surfaced tradeoffs, and interface contracts before code is written."
group: developer
invocation: model-invoked
lens:
  novice:
    who: 'You have watched a design get invented on the fly, mid-build, and then torn out and rebuilt because no one agreed on it first.'
    value: 'Architect puts the scope and the tradeoffs on paper before a line of code exists, so the rebuild does not happen.'
  practitioner:
    who: 'You are handed a requirements document and asked to turn it into components before implementation starts.'
    value: 'You get a repeatable path: confirm the requirements and their boundary, decompose into bounded pieces, and write the tradeoffs down where the team can see them, not just carry them in your head.'
  leader:
    who: 'You manage the engineers who take a requirement from idea to build plan.'
    value: 'Every decision that trades off maintainability, reliability, or technical debt reaches you in a comment or a recorded session, not as a surprise after the build starts.'
  csuite:
    who: 'You are accountable for the systems your organization ships and the debt they carry.'
    value: 'Architecture decisions and the tradeoffs behind them are recorded as ADRs before build begins, giving you a record of what was chosen and why.'
---

## What it does

Architect turns a scoped requirements document into a design a team can build from. Before any component exists, it confirms the functional and non-functional requirements and their scope boundary, then decomposes the system into bounded, composable pieces. Tradeoffs on maintainability, reliability, and technical debt are surfaced to the user in an issue or pull-request comment, or in the interactive session — never decided silently inside a diagram. The result is an ADR-ready design pack: requirements with their boundary, component decomposition, tradeoffs, and interface contracts.

## How to call it

Claude reaches for architect when a request matches its description: cross-cutting technical design, ADRs, or decomposing a scoped requirement into components. A prompt like "Turn this requirements doc into an architecture with ADRs before we start building" triggers it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A design pack that earns its ADR</div>
<pre><code><span class="tok-ok">FR/NFR scope boundary:</span> confirmed with the user before decomposition
<span class="tok-ok">Components:</span> 3 bounded domains, no shared state
<span class="tok-ok">Tradeoffs:</span> reliability vs. delivery speed, posted as a PR comment
<span class="tok-ok">Interface contracts:</span> one per component boundary</code></pre>
<div class="compare-card-note">The boundary is confirmed and the tradeoff is visible to the user, not just to the diagram.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Scope boundary: <span class="tok-warn">assumed from the ticket title</span>  <span class="tok-comment">&larr; should stop and ideate first</span>
Tradeoff: <span class="tok-warn">decided inside the diagram</span>, never surfaced  <span class="tok-comment">&larr; never shown to the user</span></code></pre>
<div class="compare-card-note">An unboundaried requirement is a stop condition, not a guess to fill in. A tradeoff buried in a diagram is a tradeoff nobody reviewed.</div>
</div>
</div>

## In practice

Architect ships no runnable script of its own; its deliverable is the design pack. The block below is not a captured run — it is the shape `SKILL.md`'s output contract requires: "ADR-ready design pack: functional and non-functional requirements with their scope boundary, component decomposition, tradeoffs, and interface contracts."

<pre><code>FR/NFR + scope boundary
  - FR1: <requirement>, in scope: <boundary>
  - NFR1: <constraint>, in scope: <boundary>

Component decomposition
  - <component>: owns <domain>, bounded by <interface>

Tradeoffs
  - <property A> vs <property B>: <decision>, surfaced in <issue/PR comment or session>

Interface contracts
  - <component> &rarr; <component>: <contract></code></pre>

## How it works

1. **Discover and Define first.** Confirm the requirements and their scope boundary with the user before designing anything; a gap gets ideated with the user, never assumed. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md).
2. **Decompose and surface tradeoffs.** Load the architect adapter, break the system into bounded, composable components, and post maintainability, reliability, and tech-debt tradeoffs to the user rather than deciding them inside the diagram. See [`architect.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/architect.md).
3. **Follow the gates.** SPEC-TS and the human gates that govern the design phase. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).
4. **Regulated context.** Apply the governance overlay when the work touches a regulated industry or a consequential automated decision. See [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).
