---
layout: skill
name: slice
title: "Slice — Turning a PRD Into Backlog Items"
description: "Slice is the model-invoked skill that decomposes a signed PRD into epics, features, stories, and mandatory operability items ready for raise."
group: developer
invocation: model-invoked
scenario: "Decomposing the signed checkout-timeout PRD into a work item raise can publish"
lens:
  novice:
    who: 'You are staring at an approved PRD with no idea how it becomes tickets a team can actually pick up.'
    value: 'Slice turns it into epics, features, and stories that all follow one shared contract, so every item is a self-contained, workable unit rather than a loose note.'
  practitioner:
    who: 'You are decomposing a signed PRD into the backlog raise will publish.'
    value: 'Slice validates the PRD''s sign-off first, applies the right template per item type, and attaches the mandatory operability lane — observability, SLOs, runbooks, test coverage — alongside the user-facing stories, not bolted on afterward.'
  leader:
    who: 'Reliability work gets quietly cut from a backlog whenever a deadline tightens, and you find out only when something breaks.'
    value: 'The operability lane is mandatory at first slicing, and slice refuses to publish any item missing its contract sections. Reliability is structurally required scope, not optional scope someone can trim.'
  csuite:
    who: 'You are accountable for AI systems used in regulated or high-stakes work.'
    value: 'When a PRD''s governance tier is limited or high, slice routes through the governance skill and populates an audit-trail, explainability, and human-checkpoint section in every affected item before it ever reaches a tracker.'
---

## What it does

Slice decomposes a product requirements document (PRD) that has already cleared gate G2 — impact's sign-off — into a backlog of epics, features, stories, and operability items, each conforming to one shared work-item contract. Every issue `raise` later publishes has to be agent-executable by construction — a person or an agent picking it up cold, with no other context, must be able to act on it correctly — and that requirement is what shapes every step below.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Validate sign-off</span><span class="step-text">Confirm the parent PRD actually cleared G2 before generating a single item.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Check the governance tier</span><span class="step-text">A `limited` or `high` PRD routes through `responsible-ai-governance` before items exist.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Apply the matching template</span><span class="step-text">Epic, feature, story, technical story, CI item, risk, or impediment — the right shape per item type.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Attach the operability lane</span><span class="step-text">Observability, service-level objectives (SLOs) and alerting, runbooks, and CI/CD test coverage — alongside the user-facing stories, not after them.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Embed the full contract</span><span class="step-text">Every section of `WORK-ITEM-CONTRACT.md` in each item body; a missing section blocks publication.</span></div>
</div>

<ul class="benefits">
  <li>Every published item is agent-executable by construction — goal, scope, acceptance criteria, and verification are all present, not assumed from context nobody wrote down.</li>
  <li>The operability lane enters the backlog at first slicing, as first-class items with their own acceptance criteria, never a hardening phase bolted on after the feature ships.</li>
  <li>Single writer per checkout is enforced structurally: exact file ownership sits in every item's own Scope section, not left to hope that two pods do not collide.</li>
  <li>A governed item's audit trail, explainability hooks, and human-in-the-loop checkpoints are first-class deliverables with their own acceptance criteria, never a logging afterthought.</li>
</ul>

Slice refuses two things outright rather than passing them through incomplete: a PRD without sign-off, and any item missing a contract section. The output is a YAML or markdown backlog bundle handed to `raise`.

- [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) covers every section a work item carries, the pickup protocol that governs how it gets picked up, and the coverage floors its acceptance criteria must clear.
- [`TEMPLATES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/TEMPLATES.md) covers the shape of each item type — epic, feature, user story, technical story, CI item, risk, and impediment.
- [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md) covers the mandatory operability lane and the governance lane a `limited` or `high` tier triggers.

## When to reach for it

Slice is not typed as a command. The model reaches for it once a PRD is signed and needs to become tracked work. The real, current line `r012` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger: "turn the approved PRD into epics, stories and tickets for the tracker."

You reach for it in two moments. `impact`'s gate G2 just closed on a signed PRD, and it needs to leave the document and become a backlog a team can pick up. A backlog already exists but is missing its operability lane, or an item in it is missing a section the contract requires — slice is what fills that gap rather than a hand-written patch to one ticket.

| The problem | The skill |
|---|---|
| The PRD is not signed yet, or does not exist | [`impact`]({{ '/impact/' | relative_url }}) |
| The backlog is contract-complete and needs to leave the document and become real issues | [`raise`]({{ '/raise/' | relative_url }}) |
| You are breaking an initiative into epics before any PRD exists at all | [`carve`]({{ '/carve/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Slice is model-invoked: nothing is typed to call it. Claude reaches for it on its own when a request matches its description — a signed PRD that needs decomposing into backlog-ready items.</p>
<div class="prompt-card">The checkout-timeout PRD is signed. Slice it: the story and its file ownership, the mandatory operability items, and the governance section if the tier calls for one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Slice returns each item with every contract section filled, refusing to publish anything left incomplete.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode ships no dedicated command for slice. Its catalog install places the skill in <code>.agents/skills/</code>, and an orchestrating agent applies the decomposition procedure by reading the skill files as instructions once a PRD is signed, rather than through a command file the way <code>/impact</code> or <code>/sdlc</code> work.</p>
<div class="prompt-card">Decompose the signed checkout-timeout PRD per skills/developer/slice/WORK-ITEM-CONTRACT.md and TEMPLATES.md: the user-facing story plus its operability lane, contract-complete.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent applies the contract directly and returns the item bodies in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skills land in <code>.agents/skills/</code>, and the agent applies slice's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Apply skills/developer/slice/WORK-ITEM-CONTRACT.md to the signed checkout-timeout PRD. Fill every section, including the operability lane and an explicit "not applicable" governance line if the tier is none.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor drafts the work item directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees slice's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/developer/slice/SKILL.md and WORK-ITEM-CONTRACT.md, then decompose the signed checkout-timeout PRD into a contract-complete story.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex drafts the same item, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command or hook for slice on any tool, so a Copilot request is answered the same way as on Cursor and Codex: by reading the skill files directly as working context.</p>
<div class="prompt-card">Before you propose any implementation, confirm the checkout-timeout item carries every WORK-ITEM-CONTRACT.md section, including an explicit governance line.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot checks the contract sections and reports any gap before proposing implementation.</p>
</div>
</div>

A good ask points at the signed PRD directly, and names whether this is the first slicing pass for the epic — since the operability lane is mandatory the first time, not something to add later if there is room. Readers who do not have the skill pack installed yet can add slice alone:

```bash
./scripts/link-skills.sh --skill slice
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

The checkout-timeout PRD carried forward from `impact` is signed, its governance tier recorded as `none`. Slice validates that sign-off first, then decomposes it into a story. There is no fixture file to quote here — slice has none of its own — so this is the shape `WORK-ITEM-CONTRACT.md` requires, filled for this exact case:

<pre><code>## Goal
Reduce checkout timeout errors to under 0.1%.
## Parent links
Epic: checkout-reliability-q3 &middot; PRD: PRD-checkout-timeouts.md
## Scope and file ownership
services/checkout/timeout.go
services/checkout/timeout_test.go
## Acceptance criteria
CHECK: go test ./services/checkout/... -run TestTimeoutP99
EXPECT: PASS
## Coverage and use-case traceability
1 row: timeout-retry FR &rarr; TestTimeoutP99 &rarr; pass, at 85-90% business-capability coverage
## Execution profile
mode: loop &middot; tier: worker-deep (resolved via model-routing)
## Governance
Not applicable &mdash; tier: none</code></pre>

Every section named here is one `WORK-ITEM-CONTRACT.md` makes mandatory, including the explicit "not applicable" governance line the contract requires rather than a silent omission — the same discipline the coverage matrix uses for a non-functional criterion that genuinely does not apply. Because this is the epic's first slicing pass, the operability lane also generates its own items alongside this story. An observability item covers the checkout service's structured logs and correlation ids, and an SLO item names the alert threshold and its pager owner — sliced now, not assumed to arrive later once the feature ships.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">An item that carries its own contract</div>
<pre><code>## Goal
Reduce checkout timeout errors to under 0.1%.
## Scope and file ownership
services/checkout/timeout.go, timeout_test.go
## Acceptance criteria
CHECK: go test ./services/checkout/... -run TestTimeoutP99
EXPECT: <span class="tok-ok">PASS</span>
## Governance
<span class="tok-ok">Not applicable &mdash; tier: none</span></code></pre>
<div class="compare-card-note">A measurable goal, exact file ownership, a machine-checkable criterion, and an explicit governance line — never a silently omitted section.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>## Acceptance criteria
<span class="tok-warn">Timeouts should feel better under load.</span></code></pre>
<div class="compare-card-note">"Looks right" and "should work" are not acceptance criteria — WORK-ITEM-CONTRACT.md, quoted directly. If a criterion cannot be checked by a command, it is not ready to ship as a work item.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if an acceptance criterion genuinely cannot be checked by a command?</summary>
<div class="qa-body">

It is not ready to ship as a work item. `WORK-ITEM-CONTRACT.md` states this directly: if a criterion cannot be checked by a command or a test, it belongs back in `impact` or `slice` until it can be made concrete. "Looks right" and "should work" are named explicitly as not acceptance criteria — a specific assertion, status code, or metric threshold is what the section requires.

</div>
</details>

<details class="qa">
<summary>Can the operability lane wait until after the feature ships?</summary>
<div class="qa-body">

No, not at first slicing. `OPERABILITY.md` states this as the section's whole premise: reliability, maintainability, and instrumentation are not a hardening phase bolted on after initial release, they enter the backlog at first slicing as first-class items with their own acceptance criteria and tests. An epic that changes production behavior without a corresponding SLO item is incomplete, not merely under-instrumented.

</div>
</details>

<details class="qa">
<summary>Why does a governance-tier-none item still need a Governance section?</summary>
<div class="qa-body">

Because the contract's discipline is explicit "not applicable," never silent omission — the same rule `COVERAGE.md` applies to a non-functional criterion that genuinely does not apply to an item. A blank section reads as an oversight; a stated "not applicable — tier: none" reads as a checked box. The two look similar to a person skimming and mean entirely different things to an auditor.

</div>
</details>

<details class="qa">
<summary>What stops two work items from claiming the same files?</summary>
<div class="qa-body">

The Scope and file ownership section, checked before publication rather than discovered mid-implementation. `WORK-ITEM-CONTRACT.md` names this directly: if a path is ambiguous between two items, that ambiguity is a blocking question for the pickup critique, never something left to resolve by convention once implementation is already underway.

</div>
</details>

## It's working if

- Every published item's Scope and file ownership section names exact paths, and no two open items claim the same path without a recorded reason.
- No item reaches `raise` with a blank contract section — every one, including Governance on a tier-none item, carries an explicit value.
- The operability lane's items exist in the backlog the same day the user-facing stories do, not weeks later once someone notices the gap.
- A pickup critique on any item can check it against every contract section directly, without asking the author to fill in context that was never written down.

If an item's acceptance criteria start reading as prose aspirations again instead of CHECK-and-EXPECT pairs, the discipline has failed even though the item still looks complete on a quick read.

## Where it fits

**Slice is the seam between a signed PRD and a tracked backlog — nothing crosses it half-formed.**

Its nearest neighbor is `impact`: impact hands off a signed PRD only once G2 is explicit, and slice refuses to start without that sign-off in hand. `raise` is the next step, reading slice's contract-complete bundle and publishing it to whichever tracker the project has configured. Where a change spans more than one workstream, `conduct` decides execution shape for the resulting items before implementation starts, resolving each node's model through `model-routing`.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
