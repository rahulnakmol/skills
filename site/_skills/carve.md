---
layout: skill
name: carve
title: "Carve — DIVE-Tested Epics From the Understanding Document"
description: "Carve extracts DIVE-tested epics from a Business Understanding Document or a TOM's maturity gaps into a manifest a sponsor approves."
group: pm
invocation: model-invoked
lens:
  novice:
    who: "You have a Business Understanding Document full of good ideas and no idea which of them are actually epics versus scope that just sounds like an epic."
    value: "DIVE gives you four concrete tests — deliverable, independent, valuable, estimable — so 'this feels like an epic' turns into a checklist you can actually apply."
  practitioner:
    who: "You keep writing epics that turn out, three sprints in, to secretly depend on each other."
    value: "The Independent test catches a hidden dependency chain before it is written into the manifest — an epic that fails it is usually two epics that have not yet been separated, and carve makes you split them now, not at sprint three."
  leader:
    who: "Your teams keep committing to epic manifests that turn out to be programs wearing a project's clothing."
    value: "More than eight epics in one manifest is an explicit stop condition — carve escalates to you instead of quietly decomposing further into something nobody actually sized."
  csuite:
    who: "You approve investment against an epic manifest and need every line in it to be something that could actually ship on its own."
    value: "Every DIVE verdict is recorded with the evidence that produced it, and the manifest is grilled before it ever reaches you, so what you approve has already been pressure-tested once."
journey: run-a-product-org
journey_title: "Run a product org"
journey_step: 2
journey_steps: 4
journey_prev: discover
journey_next: case
---

## What it does

Carve extracts candidate epics from a Business Understanding Document under the product hat, or from a TOM's maturity gaps under the transformation hat, and validates every one against DIVE — Deliverable, Independent, Valuable, Estimable — before it enters the manifest. A candidate that fails DIVE is split or rejected rather than waved through, and more than eight epics in one manifest is itself the signal that the scope in front of you is a program, not a project. The manifest is pressure-tested through a grill round before it is ever presented, and nothing is written to disk until the user approves the ordered list.

## How to call it

Carve is model-invoked, so there is no slash command for it. The model reaches for it once `map` or `tom-architect` has produced an upstream document and the request asks to break the initiative into epics. For example, "break this initiative into epics before we write any PRD" is the same utterance the routing eval tests (`test/eval/routing.jsonl`, case r015, noted there as confusable with `slice`). Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A candidate split on the Independent test</div>
<pre><code>Candidate: "Checkout redesign"
<span class="tok-ok">DIVE: Independent — FAILS (bundles guest</span>
<span class="tok-ok">checkout with saved payment methods)</span>
<span class="tok-ok">Split into two epics before the manifest</span>
<span class="tok-ok">is written.</span></code></pre>
<div class="compare-card-note">An epic that fails Independent is usually two epics that have not yet been separated.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Candidate: "All users get a better checkout"
<span class="tok-warn">DIVE: Valuable — assumed, no named persona</span>
<span class="tok-warn">recorded.</span></code></pre>
<div class="compare-card-note">"All users" is not a persona. An epic that cannot name who benefits has not actually been scoped, it has been assumed.</div>
</div>
</div>

## In practice

Carve has no fixture to replay, so this is the shape its own output contract requires, filled in for an illustrative epic pair rather than a captured run:

<pre><code><span class="tok-comment"># specs/prd/checkout-epic-manifest.md (excerpt)</span>
1. Guest checkout without account creation
   Scope in: guest cart, guest payment, order confirmation
   Scope out: saved payment methods, loyalty accrual
   Personas: First-time buyer
   Dependencies: none
   DIVE: Deliverable — ships as a standalone release
         Independent — no dependency on epic 2
         Valuable — conversion lift, per
           specs/research/checkout-funnel.md
         Estimable — M, 2-3 sprints

2. Saved payment methods for returning buyers
   Scope in: card storage, default method selection
   Personas: Returning buyer
   Dependencies: none (split from epic 1 after epic 1
     failed Independent as a single "checkout redesign"
     candidate)</code></pre>

## How it works

1. **Detect the input.** Understanding document only, understanding document plus TOM, or direct input with no upstream artifacts. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Extract candidates.** Recommended epics under the product hat, maturity-gap epics under the transformation hat. See [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md).
3. **Validate every candidate against DIVE.** Split or reject failures, and record each verdict with the evidence that produced it. See [`DIVE.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/carve/DIVE.md).
4. **Order and grill the manifest.** By business value or gap priority, then pressure-tested before it is presented — a manifest that has not been grilled is a draft, not a commitment.
5. **Present for approval.** Nothing is written until the user approves the ordered list.
