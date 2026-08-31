---
layout: skill
name: slice
title: "Slice — Turning a PRD Into Backlog Items"
description: "Slice is the model-invoked skill that decomposes a signed PRD into epics, features, stories, and mandatory operability items ready for raise."
group: developer
invocation: model-invoked
lens:
  novice:
    who: 'You are staring at an approved PRD with no idea how it becomes tickets a team can actually pick up.'
    value: 'Slice turns it into epics, features, and stories that all follow one shared contract, so every item is a self-contained, workable unit rather than a loose note.'
  practitioner:
    who: 'You are decomposing a signed PRD into the backlog raise will publish.'
    value: 'Slice validates the PRD''s sign-off first, applies the right template per item type, and attaches the mandatory operability lane — observability, SLOs, runbooks, test coverage — alongside the user-facing stories, not bolted on afterward.'
  leader:
    who: 'You have watched reliability work get quietly cut from a backlog under deadline pressure.'
    value: 'The operability lane is mandatory at first slicing, and slice refuses to publish any item missing its contract sections. Reliability is structurally required scope, not optional scope someone can trim.'
  csuite:
    who: 'You are accountable for AI systems used in regulated or high-stakes work.'
    value: 'When a PRD''s governance tier is limited or high, slice routes through the governance skill and populates an audit-trail, explainability, and human-checkpoint section in every affected item before it ever reaches a tracker.'
---

## What it does

Slice decomposes a PRD that has already cleared gate G2 into a backlog of epics, features, stories, and operability items, each conforming to one shared work-item contract. It checks the PRD's risk and governance tier first, routing `limited` or `high` tiers through `responsible-ai-governance` before generating items, then applies the matching template per item type and attaches the mandatory operability lane — observability, SLOs and alerting, runbooks, and CI/CD test coverage — alongside the user-facing stories. Every item embeds the full contract's sections before it can publish; a PRD without sign-off, or an item missing a contract section, is refused rather than passed through incomplete. The output is a YAML or markdown backlog bundle handed to `raise`.

## How to call it

Slice is not typed as a command. The model reaches for it once a PRD is signed and needs to become tracked work. A prompt like "turn the approved PRD into epics, stories and tickets for the tracker" is enough to trigger it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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

## In practice

Slice has no fixture file of its own to quote; this is the shape its output contract requires — a work item's Scope and Acceptance criteria sections, filled for the same checkout-timeout example carried from impact's PRD:

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
## Execution profile
mode: loop &middot; tier: worker-deep (resolved via model-routing)
## Governance
Not applicable &mdash; tier: none</code></pre>

This is the shape `WORK-ITEM-CONTRACT.md` requires, not a captured real item — every section named here is a section the contract makes mandatory, including the explicit "not applicable" governance line the contract requires rather than a silent omission.

## How it works

1. Validate the parent PRD's sign-off before generating anything.
2. Check the PRD's risk and governance tier; route `limited` or `high` through `responsible-ai-governance` and populate the governance lane. See [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md).
3. Apply the matching template per item type — epic, feature, story, technical story, CI item, risk, or impediment. See [`TEMPLATES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/TEMPLATES.md).
4. Attach the mandatory operability lane — observability, SLOs, runbooks, CI coverage — to every epic decomposition. See [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md).
5. Embed every section of the work-item contract in each item body; an item missing one does not publish. See [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md).
6. Hand the contract-complete bundle to `raise`.
