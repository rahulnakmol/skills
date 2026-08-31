---
layout: skill
name: prd-draft
title: "PRD Draft — Requirements Drafting and Structural Validation"
description: "PRD Draft writes one self-contained PRD per approved epic and runs a nine-check structural validation before the Quality gate."
group: pm
invocation: user-invoked
lens:
  novice:
    who: "You've never written a PRD that had to survive a formal review, and you don't know what 'structurally complete' means beyond filling in a template."
    value: "The nine-check pass tells you exactly which of the twelve sections is missing or thin, in the same report every PRD gets, before anyone else reads it."
  practitioner:
    who: "You draft several PRDs a month and want to catch a missing error-path acceptance criterion yourself, not in review."
    value: "prd-draft absorbed the former prd-validate checks, so drafting and validating are one invocation — you get the PASS or FAIL verdict without a separate step to remember."
  leader:
    who: "Your reviewers keep spending review time on structural gaps — no persona, no acceptance criteria — instead of judging whether the product idea is any good."
    value: "The four critical checks block a structurally broken PRD before it ever reaches prd-review, so review time goes to ambition and quality, not to catching a missing section."
  csuite:
    who: "You want assurance that a PRD reaching the Quality gate actually says something testable, not just something that reads well."
    value: "Every story needs a named persona and at least one error-scenario acceptance criterion — a PRD with only happy-path criteria fails the pass outright, because it says nothing about what should happen when something goes wrong."
---

## What it does

PRD Draft writes one self-contained PRD per approved epic — all twelve sections, INVEST-compliant user stories with Given-When-Then acceptance criteria, at least one error scenario per story — then runs its own nine-check structural validation before the PRD reaches the Quality gate. The pass never short-circuits: all nine checks run and are recorded, ending in PASS, PASS WITH WARNINGS, or FAIL. Any failure in the first four critical checks — sections present, named personas, acceptance criteria, priority and complexity — blocks the PRD regardless of how the other five land. A failure is fixed by redrafting, since validation only ever reports, it never repairs what it checks. This skill absorbed the former prd-validate skill's checks, so one invocation both drafts and validates.

## How to call it

In Claude Code, type `/prd-draft`. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A story with an error scenario</div>
<pre><code>GIVEN a signed-in buyer with one prior order
WHEN they select "reorder"
THEN the cart is populated with the prior
  order's items
<span class="tok-ok">GIVEN an item from the prior order is now</span>
<span class="tok-ok">out of stock</span>
<span class="tok-ok">WHEN they select "reorder"</span>
<span class="tok-ok">THEN that item is flagged and excluded,</span>
<span class="tok-ok">the rest are added</span></code></pre>
<div class="compare-card-note">At minimum one happy path, one boundary condition, and one error scenario per story.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>GIVEN a signed-in buyer with one prior order
WHEN they select "reorder"
<span class="tok-warn">THEN the cart is populated with the prior</span>
<span class="tok-warn">order's items</span></code></pre>
<div class="compare-card-note">A story with only happy-path acceptance criteria is untestable — it says nothing about what should happen when something goes wrong.</div>
</div>
</div>

## In practice

PRD Draft has no fixture to replay, so this is the shape its validation report's output contract requires, filled in for an illustrative PRD rather than a captured run:

<pre><code><span class="tok-comment"># specs/prd/checkout-guest-validation.md (excerpt)</span>
1. Sections present ............. <span class="tok-ok">PASS</span>
2. Named personas ................ <span class="tok-ok">PASS</span>
3. Acceptance criteria ........... <span class="tok-ok">PASS</span>
4. Priority and complexity ....... <span class="tok-ok">PASS</span>
5. Star levels .................... <span class="tok-ok">PASS</span>
6. Success metrics ................ <span class="tok-ok">PASS</span>
7. Risk detail .................... <span class="tok-warn">FAIL</span>
   one risk named, no likelihood,
   impact, or mitigation recorded
8. Owned open questions ........... <span class="tok-ok">PASS</span>
9. Scope populated ................ <span class="tok-ok">PASS</span>

<span class="tok-warn">Verdict: PASS WITH WARNINGS</span> — checks 1-4 pass;
check 7 carries into review as a known gap.</code></pre>

## How it works

1. **Read the upstream baseline.** The epic manifest and the understanding document or TOM it was carved from.
2. **Populate all twelve sections.** See [`PRD-SECTIONS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/PRD-SECTIONS.md).
3. **Write INVEST stories with Given-When-Then criteria.** At least one error scenario per story. See [`PRD-SECTIONS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/PRD-SECTIONS.md).
4. **Run a grill pass before the Quality gate.** See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
5. **Run all nine structural checks, no short-circuit.** Record each as a gate row, ending in PASS, PASS WITH WARNINGS, or FAIL. See [`VALIDATION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/VALIDATION.md).
6. **On FAIL, redraft and validate again.** Validation reports; it never repairs the document it checks. See [`VALIDATION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/VALIDATION.md).
