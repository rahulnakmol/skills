---
layout: skill
name: prd-draft
title: "PRD Draft — Requirements Drafting and Structural Validation"
description: "PRD Draft writes one self-contained PRD per approved epic and runs a nine-check structural validation before the Quality gate."
group: pm
invocation: user-invoked
scenario: "Drafting the PRD for automated reconciliation matching"
lens:
  novice:
    who: "You have never written a PRD that had to survive a formal review, and you do not know what 'structurally complete' means beyond filling in a template."
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

PRD Draft is the pm group's requirements author and its own first reviewer, writing the product requirements document, or PRD, every epic needs before a team can build it. It writes one self-contained PRD per approved epic: all twelve sections, and user stories that are Independent, Negotiable, Valuable, Estimable, Small, and Testable, each with Given-When-Then acceptance criteria and at least one error scenario. It then runs its own nine-check structural validation before the PRD reaches the Quality gate.

The pass never short-circuits: all nine checks run and are recorded, ending in PASS, PASS WITH WARNINGS, or FAIL. Any failure in the first four critical checks — sections present, named personas, acceptance criteria, priority and complexity — blocks the PRD regardless of how the other five land. A failure is fixed by redrafting, since validation only ever reports, it never repairs what it checks. This skill absorbed the former prd-validate skill's checks, so one invocation both drafts and validates.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the upstream baseline</span><span class="step-text">The epic manifest and the understanding document or target operating model (TOM) it was carved from.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Populate all twelve sections</span><span class="step-text">One self-contained PRD per epic, never a monolithic document covering several at once.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Write INVEST stories</span><span class="step-text">Given-When-Then acceptance criteria, at least one error scenario per story.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Run a grill pass</span><span class="step-text">With-docs mode when a research corpus exists, before the Quality gate.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Run all nine structural checks</span><span class="step-text">No short-circuit, each recorded as a gate row, ending in PASS, PASS WITH WARNINGS, or FAIL.</span></div>
</div>

<ul class="benefits">
  <li>A story with only happy-path acceptance criteria fails the pass outright, so what should happen when something goes wrong is never left unstated.</li>
  <li>The four critical checks block a structurally broken PRD before it ever reaches `prd-review`, so review time goes to ambition and quality, not to catching a missing section.</li>
  <li>The pass never stops at the first failure — a report that stopped at check one would hide the other eight results and turn one redraft into several.</li>
  <li>Drafting and validating are one invocation, since prd-draft absorbed the former prd-validate skill's checks, so there is no separate step to remember to run.</li>
</ul>

`VALIDATION.md` states the pass's own limit in one line: "it asks whether the required parts of a PRD are present and well-formed, not whether the product idea is any good. Judgment about ambition and quality belongs to `prd-review`."

- [`PRD-SECTIONS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/PRD-SECTIONS.md) covers all twelve sections, the INVEST criteria, and the Given-When-Then acceptance-criteria requirement.
- [`VALIDATION.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/prd-draft/VALIDATION.md) covers the nine checks in full, their severities, and the three possible verdicts.
- [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md) names the Quality gate, where the PRD is agent-scored on the 11-Star scale but approval stays human.

## When to reach for it

Type `/prd-draft` in Claude Code, or name the skill directly in a session. PRD Draft is user-invoked, so nothing reaches for it on its own: a person decides an approved epic is ready for requirements, or that an existing PRD needs its structure checked.

You reach for it in three moments named in `SKILL.md`. `carve` has produced an approved epic manifest. You ask to draft, write, or spec requirements for an epic. You ask to check or validate the structural completeness of a PRD that already exists.

PRD Draft is not the only skill that touches requirements quality. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| No approved epic manifest exists yet | [`carve`]({{ '/carve/' | relative_url }}) |
| Structure already passes and you need ambition and quality scored | [`prd-review`]({{ '/prd-review/' | relative_url }}) |
| Acceptance criteria are already machine-checkable and need decomposing into delivery stories | [`slice`]({{ '/slice/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>PRD Draft is user-invoked: type <code>/prd-draft</code>, or name it directly in a session. The same invocation checks an existing PRD's structure when one is already on disk, rather than drafting a new one.</p>
<div class="prompt-card">The reconciliation epic manifest is approved. Draft the PRD for "Automated CSV-to-ledger matching" — all twelve sections, Given-When-Then criteria with at least one error scenario per story — then run the nine-check validation and report the verdict.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code writes the PRD, runs the grill pass, then runs all nine checks and reports PASS, PASS WITH WARNINGS, or FAIL with each check's evidence.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps prd-draft or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies the drafting-then-validation procedure on its own.</p>
<div class="prompt-card">The reconciliation epic manifest is approved. Draft the PRD for "Automated CSV-to-ledger matching" — all twelve sections, Given-When-Then criteria with at least one error scenario per story — then run the nine-check validation and report the verdict.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the PRD and runs the nine checks in its reply, since no command wraps the validation step.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. It reads the catalog in <code>.agents/skills/</code> as context and applies prd-draft's procedure by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode.</p>
<div class="prompt-card">The reconciliation epic manifest is approved. Draft the PRD for "Automated CSV-to-ledger matching" — all twelve sections, Given-When-Then criteria with at least one error scenario per story — then run the nine-check validation and report the verdict.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the PRD and the validation report directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">The reconciliation epic manifest is approved. Draft the PRD for "Automated CSV-to-ledger matching" — all twelve sections, Given-When-Then criteria with at least one error scenario per story — then run the nine-check validation and report the verdict.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same PRD and report, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook for prd-draft specifically, so the instruction file is what tells the agent to run all nine checks without short-circuiting on the first failure.</p>
<div class="prompt-card">The reconciliation epic manifest is approved. Draft the PRD for "Automated CSV-to-ledger matching" — all twelve sections, Given-When-Then criteria with at least one error scenario per story — then run the nine-check validation and report the verdict.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot reports the twelve-section PRD and the nine-check verdict in chat, then writes both files through whatever repository access it has.</p>
</div>
</div>

A good ask names the specific epic from the manifest, since one PRD covers exactly one epic, and states whether this is a fresh draft or a structural check on a PRD that already exists. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want prd-draft alone:

```bash
./scripts/link-skills.sh --skill prd-draft
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

The reconciliation manifest is approved, and "Automated CSV-to-ledger matching" is the first epic. You type the prompt above. PRD Draft reads the manifest and the understanding document it was carved from, then populates all twelve sections — problem statement, personas, epic definition, user stories, and the rest — writing INVEST-compliant stories against the AR Reconciliation Analyst persona.

One story's first draft carries only a happy-path criterion: given a valid export, when matching runs, then the ledger updates. Before validation even runs, `PRD-SECTIONS.md`'s own requirement catches this — a story needs at minimum one happy path, one boundary condition, and one error scenario — so a second criterion is added for the case an item from the export is malformed. A grill pass runs next, since a research corpus already exists in `specs/research/` from discovery's meeting notes.

Then all nine structural checks run, without stopping at the first failure:

<pre><code><span class="tok-comment"># specs/prd/reconciliation-matching-validation.md (excerpt)</span>
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

Because checks one through four all pass, the PRD advances with check seven's gap carried forward as a known item for `prd-review`, rather than being redrafted for a warning-level failure.

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

## Common questions

<details class="qa">
<summary>Why does the validation pass run all nine checks even after an early one fails?</summary>
<div class="qa-body">

`VALIDATION.md` states the reason directly: "a report that stops at check one hides the other eight results and turns one redraft into several." Running every check once means a redraft only has to happen once, with a complete list of what still needs fixing.

</div>
</details>

<details class="qa">
<summary>What is the actual difference between PASS WITH WARNINGS and FAIL?</summary>
<div class="qa-body">

Whether any of the first four critical checks failed. `VALIDATION.md` is explicit that FAIL holds "even when the remaining checks all pass, because a story without a persona, without acceptance criteria, or without a size is not something `prd-review`, `slice`, or a delivery team can act on."

</div>
</details>

<details class="qa">
<summary>Can validation fix the gap it finds?</summary>
<div class="qa-body">

No. `VALIDATION.md` states the pass is read-only: "it reports what it found and stops there." Fixing a failure is a redraft run through the drafting procedure again, so the record shows a validation result and a separate corrected draft, rather than a check that quietly repaired the thing it was checking.

</div>
</details>

<details class="qa">
<summary>Why does every story need three kinds of acceptance criteria?</summary>
<div class="qa-body">

`PRD-SECTIONS.md` requires at minimum one happy path, one boundary condition, and one error scenario per story, because a story with only happy-path criteria "says nothing about what should happen when something goes wrong" — the exact case check three exists to catch.

</div>
</details>

<details class="qa">
<summary>Is a PRD with zero open questions a good sign?</summary>
<div class="qa-body">

Not necessarily. `PRD-SECTIONS.md` states the twelfth section exists precisely because acceptance criteria this specific surface questions nobody had answers to yet — "a PRD with zero open questions is either trivially simple or has not been thought through hard enough."

</div>
</details>

## It's working if

- A story without a named persona or an error scenario never reaches `prd-review` — it gets caught and redrafted first.
- Every validation report carries all nine checks, every time, regardless of where the first failure landed.
- A PASS WITH WARNINGS verdict carries its warning forward explicitly into review, rather than the warning quietly disappearing once the PRD advances.
- One PRD covers exactly one epic — nobody is reading a document trying to speak for two epics at once.

If a PRD keeps passing check three because every story's "error scenario" is a restatement of the happy path with different wording, the check is running but the discipline it exists to enforce is not.

## Where it fits

PRD Draft is the Design-phase step that turns one approved epic into a document a team can actually build against, reached from `carve`'s handoff. Its downstream neighbor is `prd-review`, which scores ambition and quality on the document prd-draft has already confirmed is structurally sound — `SKILL.md`'s own stop condition blocks a FAIL verdict from reaching review at all.

Across the group seam, this PRD may feed the developer group's `impact` pipeline for engineering inception, or go straight to `slice` when its acceptance criteria are already machine-checkable — `core/VALUE.md` names this exact seam. The Quality gate in `GATES.md` is where the PRD is agent-scored on the 11-Star scale, but approval stays human even at a high score.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
