---
layout: skill
name: slice
title: "Slice — Turning a PRD Into Backlog Items"
description: "Slice is the model-invoked skill that decomposes a signed PRD into epics, features, stories, and mandatory operability items ready for raise."
group: developer
invocation: model-invoked
scenario: "Decomposing QuenServe's signed epic-E1 PRD into story E1-F1-S1, the work item raise can publish"
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

Install once, and every tool below reaches the same slice skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want slice can skip the rest of the catalog with `./scripts/link-skills.sh --skill slice`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; model-invoked</span></div>
<div class="tool-group-body">
<p>Slice is model-invoked: nothing is typed to call it. Claude reaches for it on its own when a request matches its description — a signed PRD that needs decomposing into backlog-ready items.</p>
<div class="prompt-card">QuenServe's epic-E1 PRD is signed. Slice it: story E1-F1-S1 and its file ownership, the mandatory operability items, and the governance section if the tier calls for one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Slice returns each item with every contract section filled, refusing to publish anything left incomplete.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; applied as instructions</span></div>
<div class="tool-group-body">
<p>OpenCode ships no dedicated command for slice. Its catalog install places the skill in <code>.agents/skills/</code>, and an orchestrating agent applies the decomposition procedure by reading the skill files as instructions once a PRD is signed, rather than through a command file the way <code>/impact</code> or <code>/sdlc</code> work.</p>
<div class="prompt-card">Decompose QuenServe's signed epic-E1 PRD per skills/developer/slice/WORK-ITEM-CONTRACT.md and TEMPLATES.md: story E1-F1-S1 plus its operability lane, contract-complete.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent applies the contract directly and returns the item bodies in its reply.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply slice's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees slice's name and description the same way the other tools do, and a team adds its rules directly to <code>AGENTS.md</code>. Copilot's agent mode applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Apply skills/developer/slice/WORK-ITEM-CONTRACT.md to QuenServe's signed epic-E1 PRD. Fill every section for story E1-F1-S1, including the operability lane and an explicit "not applicable" governance line if the tier is none.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three draft the work item directly in their reply, since none has a command's output to parse.</p>
</div>
</div>

A good ask points at the signed PRD directly, and names whether this is the first slicing pass for the epic — since the operability lane is mandatory the first time, not something to add later if there is room.

## A working example

Epic E1 is offline inspection sync on [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every scenario on this site returns to, and this is where its PRD becomes work items. The epic-E1 PRD carried forward from `impact` is signed, its governance tier recorded as `none`. Slice validates that sign-off first, then decomposes it into story E1-F1-S1. There is no fixture file to quote here — slice has none of its own — so this is the shape `WORK-ITEM-CONTRACT.md` requires, filled for this exact case:

<pre><code>## Goal
Complete an inspection with no connectivity and sync it without
loss once back online.
## Parent links
Epic: E1-offline-inspection-sync &middot; PRD: PRD-E1-offline-sync.md
## Scope and file ownership
packages/inspections/offline/sync-client.ts
packages/inspections/offline/sync-client.test.ts
## Acceptance criteria
CHECK: node scripts/verify-offline-completion.mjs
EXPECT: offline completion verified
## Coverage and use-case traceability
1 row: offline-capture FR &rarr; verify-offline-completion.mjs &rarr; pass, at 85-90% business-capability coverage
## Execution profile
mode: loop &middot; tier: worker-deep (resolved via model-routing)
## Governance
Not applicable &mdash; tier: none</code></pre>

Every section named here is one `WORK-ITEM-CONTRACT.md` makes mandatory, including the explicit "not applicable" governance line the contract requires rather than a silent omission — the same discipline the coverage matrix uses for a non-functional criterion that genuinely does not apply. Because this is the epic's first slicing pass, the operability lane also generates its own items alongside this story. An observability item covers the offline-sync module's structured logs and correlation ids, and an SLO item names the sync-completion alert threshold and its pager owner — sliced now, not assumed to arrive later once the feature ships.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">An item that carries its own contract</div>
<pre><code>## Goal
Complete an inspection with no connectivity and sync it without
loss once back online.
## Scope and file ownership
packages/inspections/offline/sync-client.ts, sync-client.test.ts
## Acceptance criteria
CHECK: node scripts/verify-offline-completion.mjs
EXPECT: <span class="tok-ok">offline completion verified</span>
## Governance
<span class="tok-ok">Not applicable &mdash; tier: none</span></code></pre>
<div class="compare-card-note">A measurable goal, exact file ownership, a machine-checkable criterion, and an explicit governance line — never a silently omitted section.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>## Acceptance criteria
<span class="tok-warn">Offline sync should feel more reliable in the field.</span></code></pre>
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
