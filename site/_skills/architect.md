---
layout: skill
name: architect
title: "Architect: Cross-Cutting Technical Design"
description: "Architect turns a scoped requirement into an ADR-ready design pack: bounded components, surfaced tradeoffs, and interface contracts before code is written."
group: developer
invocation: model-invoked
scenario: "Splitting notifications into its own service before three teams build on it"
lens:
  novice:
    who: 'A design gets invented on the fly, halfway through the build, and then torn out and rebuilt because no one had agreed to it first. You have sat through that rebuild.'
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

Architect is the model-invoked charter for cross-cutting technical design. Before any component exists, it confirms the scope of a requirement, decomposes the system into bounded pieces a team can build from, and puts every tradeoff where the team can actually see it. An ADR — an architecture decision record, a short document naming a decision, its context, and its consequences — is how a design choice gets kept on the record rather than carried only in one engineer's head.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Confirm the boundary</span><span class="step-text">Discover and Define first: confirm the functional and non-functional requirements and their scope boundary before designing anything; a gap gets ideated with the user, never assumed.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Decompose</span><span class="step-text">Break the system into composable, bounded-domain components — services with clear boundaries, not one large service with a diagram drawn around it.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Surface the tradeoffs</span><span class="step-text">Post maintainability, reliability, and technical-debt tradeoffs to an issue or pull-request comment, or the interactive session — never decide them silently in the diagram.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Clear Gate 2</span><span class="step-text">Gate 2 is the design gate a human signs before implementation starts. No story clears it without traceability, contracts, allowed scope, an NFR (non-functional requirement) evidence plan, and a named owner.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Hand off the design pack</span><span class="step-text">Requirements with their boundary, component decomposition, tradeoffs, and interface contracts move to implementation as one ADR-ready package.</span></div>
</div>

<ul class="benefits">
  <li>A rebuild born from an assumed scope stops recurring, because the boundary is confirmed with you before a single component is drawn.</li>
  <li>A tradeoff on maintainability, reliability, or technical debt reaches the team as a comment or a recorded session, never buried inside a diagram nobody reviewed.</li>
  <li>Gate 2 blocks a story from being marked ready until it carries traceability, contracts, allowed scope, and a named owner — not a hope that these get added later.</li>
  <li>A decision survives the person who made it: every accepted ADR names its context, its decision, and its consequences, on the record.</li>
</ul>

Architect's own adapter states its stop condition on scope in one line: functional or non-functional requirements not yet boundaried mean stop and ideate with the user first, never assume a boundary from a ticket title. Its Gate 2 line is just as direct: "no story is `READY` without traceability, contracts/fixtures, allowed scope, NFR evidence plan, rollout/rollback and owner."

- [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md) covers Discover and Define — why a goal built on a guessed scope is this pipeline's most common failure mode.
- [`architect.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/architect.md) covers the design compass and the two-pass loop the adapter actually runs against a candidate design.
- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md) covers Gate 2 itself and where architect's evidence lands inside the loop's three gates.
- [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md) covers the frameworks layered onto a design that touches a regulated industry or a consequential automated decision.

Architect reads each one only when the moment calls for it: confirming a boundary reads DDDD.md, running the design loop reads the adapter, clearing Gate 2 reads METHOD.md, a regulated component reads the overlay.

## When to reach for it

Nothing types `/architect` in Claude Code. Architect is model-invoked, reached three ways. An SDLC gate — one of the sign-off points in the sdlc skill's own design-build-secure-release loop — calling for architect evidence reaches it. A work item's pod charter, the roster of roles `impact` assigned when it scoped the work, reaches it by naming the architect role. And a request whose wording matches the skill's own description reaches it directly.

You reach for architect in three moments. A requirements document exists and nothing has decomposed it into components yet. A design choice is about to get made inside an implementation detail instead of in front of the people who will live with it. A work item's pod charter names architect as a role this item still needs before it can move.

Architect is not the only skill that touches design. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the whole gated loop, design through release, not only the design phase inside it | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need the security-specific threat model and hardening pass, not general design tradeoffs | [`safeguard`]({{ '/safeguard/' | relative_url }}) |
| You need the design broken into stories with acceptance criteria before a pod can pick one up | [`slice`]({{ '/slice/' | relative_url }}) |
| You need to decide loop vs. graph execution shape before design even starts | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Architect has no slash command of its own. Claude reaches for it when the sdlc skill's Design phase calls for architect evidence, or when a request's wording matches the skill's own description — cross-cutting technical design, ADRs, decomposing a scoped requirement into components — directly in chat.</p>
<div class="prompt-card">We are splitting the shared notifications module out of the monolith before three teams start building against it. Confirm the functional and non-functional requirements and their scope boundary with me first, then decompose the system into bounded components and surface every maintainability and reliability tradeoff as a comment I can read, not inside a diagram.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Architect returns the confirmed boundary, the component decomposition, and each tradeoff posted where the team can see it, before any component is built.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>/architect</code> command from <code>adapters/opencode/commands/architect.md</code>, bound to the architect agent. It applies the same charter: complete the requirement's engineering constraints, components, and tradeoffs, run a candidate design and its adversarial challenge, then stop at Gate 2 for a human sign-off.</p>
<div class="prompt-card">/architect Split the shared notifications module into its own service before three teams build on top of it. Confirm the requirement boundary with me, decompose into bounded components, and post every tradeoff as a comment before Gate 2.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command returns the decomposition and its tradeoffs, and stops at Gate 2 for the sign-off the adapter's own charter requires.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies architect's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. There is no dynamic workflow to run Gate 2 for you, so a person reading the session output stays the sign-off.</p>
<div class="prompt-card">Before we build the notifications service, confirm its functional and non-functional requirement boundary with me, then decompose it into bounded components the way skills/developer/architect/SKILL.md and DDDD.md describe. Post every tradeoff for me to see, not inside a diagram.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the design pack directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees architect's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files.</p>
<div class="prompt-card">Read skills/developer/architect/SKILL.md and DDDD.md, then design the notifications-service split: confirm the requirement boundary, decompose into bounded components, and surface every tradeoff instead of deciding it inside the diagram.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the design pack the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. This repository ships no command layer for Copilot, so architect's charter is applied the way Cursor and Codex apply it — as context an agent follows, not a command it runs.</p>
<div class="prompt-card">Before implementing the notifications-service split, read skills/developer/architect/SKILL.md, confirm the requirement boundary with me, decompose into bounded components, and post the maintainability and reliability tradeoffs as a comment on this issue before Gate 2.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot posts the tradeoffs as an issue comment; a person still owns Gate 2's sign-off, since no hook here can enforce it directly.</p>
</div>
</div>

A good ask includes:

- Where the requirement lives — a requirements document, a work item, or a description pasted directly into the prompt.
- The scope boundary stated outright, or a request for architect to ideate it with you before designing anything.
- Where a tradeoff should be posted — an issue comment, a pull-request comment, or directly in the session.
- Whether the work touches a regulated industry or a consequential automated decision, so the governance overlay applies from the start.

Readers who have not installed the whole skill pack can add architect alone:

```bash
./scripts/link-skills.sh --skill architect
```

This links only architect into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>We are splitting the shared notifications module out of the monolith before three teams start building against it. Confirm the functional and non-functional requirements and their scope boundary with me first, then decompose the system into bounded components and surface every maintainability and reliability tradeoff as a comment I can read, not inside a diagram.</code></pre>

Architect confirms the boundary with you first, per `DDDD.md`: notifications covers email, push, and SMS delivery, but not the templates a marketing team edits separately — that stays out of scope, named as a non-goal rather than left ambiguous. Only then does it decompose the system into three bounded components, each owning one responsibility and touching no other component's state.

The design pack it returns, shown here as the document the agent produces, not as executed output:

<pre><code>FR/NFR + scope boundary
  - FR1: a subscribed user receives a notification within 30 seconds
    of the triggering event, in scope: notifications-api, delivery-worker
  - NFR1: the service keeps delivering through a single provider's outage,
    in scope: delivery-worker

Component decomposition
  - notifications-api: owns request intake and preference validation,
    bounded by the public REST contract
  - delivery-worker: owns fan-out to provider queues, bounded by the
    message contract
  - preferences-store: owns per-user channel preferences, bounded by
    the read API the other two call

Tradeoffs
  - reliability vs. delivery speed: queue every notification durably
    before fan-out, accepting added latency, surfaced on issue #482's
    comment thread rather than decided in the diagram

Interface contracts
  - notifications-api &rarr; delivery-worker: one message per event,
    schema-versioned
  - delivery-worker &rarr; preferences-store: read-only lookup by user id</code></pre>

This is the shape the skill's own output contract requires — an ADR-ready pack with the requirements' boundary, the decomposition, the tradeoffs, and the interface contracts — not a captured terminal run, since architect ships no runnable script of its own. Architect does not mark this ready on its own authority. A human still signs Gate 2, confirming traceability, contracts, allowed scope, and a rollout plan, the same line its adapter states as an owned responsibility: "no story is `READY` without traceability, contracts/fixtures, allowed scope, NFR evidence plan, rollout/rollback and owner."

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A design pack ready for its ADR</div>
<pre><code><span class="tok-ok">FR/NFR scope boundary:</span> confirmed with you before decomposition
<span class="tok-ok">Components:</span> 3 bounded domains, no shared state
<span class="tok-ok">Tradeoffs:</span> reliability vs. delivery speed, posted on issue #482
<span class="tok-ok">Interface contracts:</span> one per component boundary</code></pre>
<div class="compare-card-note">The boundary is confirmed and the tradeoff is visible to you, not just to the diagram.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Scope boundary: <span class="tok-warn">assumed from the ticket title</span>  <span class="tok-comment">&larr; should stop and ideate first</span>
Tradeoff: <span class="tok-warn">decided inside the diagram</span>, never surfaced  <span class="tok-comment">&larr; never shown to you</span></code></pre>
<div class="compare-card-note">An unboundaried requirement is a stop condition, not a guess to fill in. A tradeoff buried in a diagram is a tradeoff nobody reviewed.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens if the requirement's scope boundary is not clear yet?</summary>
<div class="qa-body">

SKILL.md states this as a stop condition: functional or non-functional requirements not yet boundaried mean stop and ideate with the user first, rather than proceed on a guessed scope. Discovering the boundary mid-design is the exact failure a confirmed boundary up front is built to prevent.

</div>
</details>

<details class="qa">
<summary>Where does a tradeoff actually get shown to the team?</summary>
<div class="qa-body">

In an issue or pull-request comment, or the interactive session — never silently inside the diagram, per the adapter's own procedure. A tradeoff a team never saw is a decision the team never actually made, even if the diagram looks finished.

</div>
</details>

<details class="qa">
<summary>Does architect write the implementation code?</summary>
<div class="qa-body">

No. Its adapter's boundaries state this directly: do not implement production code unless explicitly asked, and return a traceable handoff package naming the recommended coding agent instead, because the architecture agent intentionally cannot invoke implementation agents itself.

</div>
</details>

<details class="qa">
<summary>What if a design decision is genuinely irreversible or high-stakes?</summary>
<div class="qa-body">

The adapter's own depth table reserves a critical level for an irreversible platform bet, a regulated or high-risk system, or an unresolved conflict. That level escalates a bounded challenge to a stronger reviewing pass instead of deciding it at normal effort, always with a named human review and evidence gates.

</div>
</details>

<details class="qa">
<summary>Is Gate 2's sign-off enforced the same way in every tool?</summary>
<div class="qa-body">

Yes, but only because it is always a person, not a hook. No tool in this repository can approve a design on someone's behalf, so what actually differs between Claude Code, OpenCode, Cursor, Codex, and GitHub Copilot is only how the design pack itself gets produced and handed back to you.

</div>
</details>

## It's working if

- Every requirement that reaches implementation carries a confirmed scope boundary, not an assumption read off a ticket title.
- A tradeoff on maintainability, reliability, or technical debt shows up as a comment or a recorded session, never only inside a diagram.
- No story clears Gate 2 without traceability, contracts, allowed scope, an NFR evidence plan, and a named owner.
- A regulated component's design carries the responsible-ai-governance overlay from the first pass, not bolted on after implementation starts.

If a diagram keeps changing after implementation has already started, a tradeoff was never actually surfaced — the design pack looked complete while the discipline behind it had already failed.

## Where it fits

**Architect is the design lane inside the gated build loop, and the skill a pod charter names whenever a work item needs cross-cutting technical design.**

Its nearest neighbor is `sdlc`: sdlc owns the whole loop — design, build, secure, release — and architect owns the design phase inside it, feeding Gate 2 evidence back to the loop's own gate record. `safeguard` runs alongside it at the same design phase, threat-modeling the same boundary architect just drew, and `slice` turns the finished decomposition into stories a pod can pick up cold.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names design as the intent that points straight to architect.
