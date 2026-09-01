---
layout: skill
name: carve
title: "Carve — DIVE-Tested Epics From the Understanding Document"
description: "Carve extracts DIVE-tested epics from a Business Understanding Document or a TOM's maturity gaps into a manifest a sponsor approves."
group: pm
invocation: model-invoked
scenario: "Carving epic E1 from the QuenServe understanding document"
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

Carve is the pm group's decomposer for turning a confirmed problem into a manifest a sponsor can actually approve. It extracts candidate epics from a Business Understanding Document under the product hat, or from a Target Operating Model's maturity gaps under the transformation hat, and validates every one against DIVE — Deliverable, Independent, Valuable, Estimable — before it enters the manifest.

A candidate that fails DIVE is split or rejected rather than accepted as it stands, and more than eight epics in one manifest is itself the signal that the scope in front of you is a program, not a project. The manifest is pressure-tested through a grill round before it is ever presented, and nothing is written to disk until the user approves the ordered list.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Detect the input</span><span class="step-text">Understanding document only, understanding document plus TOM, or direct input with no upstream artifacts.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Extract candidates</span><span class="step-text">Recommended epics under the product hat, maturity-gap epics under the transformation hat.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Validate every candidate against DIVE</span><span class="step-text">Split or reject failures, recording each verdict with the evidence that produced it.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Order and grill the manifest</span><span class="step-text">By business value or gap priority, then pressure-tested before it is presented.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Present for approval</span><span class="step-text">Nothing is written until the user approves the ordered list.</span></div>
</div>

<ul class="benefits">
  <li>An epic that fails the Independent test surfaces its hidden dependency now, while it is one split in a manifest, rather than three sprints in as a blocked story nobody planned for.</li>
  <li>"All users" never survives as a persona — the Valuable test forces a named beneficiary before an epic is treated as scoped rather than assumed.</li>
  <li>More than eight epics is a stop condition, not a target, so a program gets named as a program and escalated rather than quietly decomposed into something nobody actually sized.</li>
  <li>Every DIVE verdict carries the evidence that produced it, so a sponsor approving the manifest is reading a pressure-tested record, not a list of names that sound like epics.</li>
</ul>

`DIVE.md` states the Independent test's real diagnostic value in one line: "An epic that fails Independent is usually not a bad epic, it is two epics that have not yet been separated."

- [`DIVE.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/carve/DIVE.md) covers all four tests in full, and the eight-epic ceiling as a program signal rather than a hard rule to work around.
- [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) covers where candidate epics come from under each hat — recommended epics under product, maturity gaps under transformation.
- [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md) names the Investment gate, where the manifest is approved alongside the case.

## When to reach for it

Carve has no slash command. It is reached the way every model-invoked skill in this catalog is reached: an orchestrating skill or session calls it once `map` or `tom-architect` has produced an upstream document and the request asks to break the initiative into epics.

`test/eval/routing.jsonl` carries a case testing exactly this recognition, noted there as confusable with the developer group's `slice`. Case r015 reads, byte for byte:

<pre><code>{"id":"r015","utterance":"break this initiative into epics before we write any PRD","expect":"carve","note":"confusable with slice"}</code></pre>

Carve is not the only skill that touches decomposition. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The work is software delivery decomposition, not pm epics from a Business Understanding Document | [`slice`]({{ '/slice/' | relative_url }}) |
| No understanding document or TOM exists yet for carve to read | [`map`]({{ '/map/' | relative_url }}) |
| Epics are approved and each one needs its product requirements document (PRD) drafted | [`prd-draft`]({{ '/prd-draft/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same carve skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want carve can skip the rest of the catalog with `./scripts/link-skills.sh --skill carve`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Skill tool call, no slash command</span></div>
<div class="tool-group-body">
<p>Carve is not typed. Once <code>map</code> has produced the Business Understanding Document, a request to break the initiative into epics leads the session to call the Skill tool with <code>carve</code> — the mechanism the invocation axis in every skill's frontmatter declares for a model-invoked skill.</p>
<div class="prompt-card">The QuenServe understanding document is confirmed. Break this initiative into epics before we write any PRD — validate every candidate against DIVE, and do not write the manifest until I approve the ordered list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The session returns the candidate epics with their DIVE verdicts, the ordered manifest after a grill pass, and waits for approval before writing the file.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps carve or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies carve's procedure when a request matches its description.</p>
<div class="prompt-card">Read skills/pm/carve/SKILL.md and DIVE.md, then extract epic candidates from the confirmed QuenServe understanding document. Validate every candidate against DIVE — split or reject failures — and hold the manifest until I approve the ordered list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode works the DIVE pass in its reply and waits for approval, since no command wraps the write step.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply carve's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Cursor routes model choice through its own <code>auto</code> mode. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees carve's name and description the way the other four tools do. GitHub Copilot applies the same catalog through <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Following skills/pm/carve/DIVE.md, extract candidate epics from the confirmed QuenServe understanding document before any PRD gets written. Validate each one against DIVE, split anything that fails Independent, and do not write the manifest until I approve the ordered list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the candidate epics and DIVE verdicts directly in their reply, then wait for approval before the manifest file exists.</p>
</div>
</div>

A good ask confirms which upstream document exists — understanding document, TOM, or both — since that decides where candidates come from, and states plainly that nothing should be written until the ordered list is approved.

## A working example

The QuenServe understanding document from `map` is confirmed, product hat, with the mobile client's live-call-only architecture marked as the mechanism the whole document turns on. You type the prompt above. Carve reads the document and extracts one broad candidate: "fix field connectivity end to end" — a name that quietly bundles offline capture, conflict handling, and sync-status visibility into a single idea.

Run against DIVE, that broad candidate fails Estimable immediately — nobody can size "fix connectivity end to end" as one ship-able release, because it is three separate capabilities wearing one name. Per `DIVE.md`, carve does not respond by splitting it into three separate epics on the manifest. It narrows the candidate to the one epic the analysis actually supports as a first release, and records the rest as scope a later pass will need to size on its own:

<pre><code><span class="tok-comment"># specs/prd/e1-epic-manifest.md (excerpt)</span>
1. E1 &middot; Offline inspection sync
   Scope in: complete an inspection with no network connection,
     queue it locally, sync it to the server without loss once
     connectivity returns
   Scope out: real-time field messaging, a sync-analytics
     dashboard for managers
   Personas: Field Inspector, Operations Manager
   Dependencies: none
   DIVE: Deliverable — ships as a standalone release
         Independent — no dependency on another epic in this
           manifest
         Valuable — inspectors stop re-visiting sites to redo
           lost work, per specs/research/field-signal-loss.md
         Estimable — L, roughly one quarter</code></pre>

E1 passes all four tests and stands alone in the manifest, well under the eight-epic ceiling, and runs through a grill round before carve presents it. Carve does not decide how E1 itself splits into offline capture, conflict resolution, and sync-status visibility — that decomposition into features and stories happens later, on the developer side, when `slice` cuts E1's PRD. Nothing is written to `specs/prd/` until you approve the ordered list.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A candidate split on the Independent test</div>
<pre><code>Candidate: "Portfolio dashboard revamp"
<span class="tok-ok">DIVE: Independent — FAILS (bundles the</span>
<span class="tok-ok">manager's site-status widget with an</span>
<span class="tok-ok">unrelated inspector leaderboard feature)</span>
<span class="tok-ok">Split into two epics before the manifest</span>
<span class="tok-ok">is written.</span></code></pre>
<div class="compare-card-note">An epic that fails Independent is usually two epics that have not yet been separated.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Candidate: "All managers get a better dashboard"
<span class="tok-warn">DIVE: Valuable — assumed, no named persona</span>
<span class="tok-warn">recorded.</span></code></pre>
<div class="compare-card-note">"All managers" is not a persona. An epic that cannot name who benefits has not actually been scoped, it has been assumed.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens once a manifest passes eight epics?</summary>
<div class="qa-body">

`SKILL.md` names this a stop condition, not a threshold to work around by writing smaller epics. More than eight in one manifest means this is a program, not a project, and it escalates to the user rather than getting quietly decomposed into something nobody actually sized.

</div>
</details>

<details class="qa">
<summary>Can an epic ship without a named persona?</summary>
<div class="qa-body">

No — `SKILL.md`'s second stop condition blocks it directly, and `DIVE.md`'s own Valuable test states the reason: "'All users' is not a persona, and an epic that cannot name who benefits has not actually been scoped yet — it has been assumed."

</div>
</details>

<details class="qa">
<summary>What is actually being tested by Estimable?</summary>
<div class="qa-body">

Whether the team can assign a rough effort range to the epic as scoped. `DIVE.md` ties this back to the eight-epic ceiling directly: "an epic too large or too vague to estimate is a program pretending to be an epic," which is the same signal the manifest-level stop condition catches at the whole-manifest scale.

</div>
</details>

<details class="qa">
<summary>Why does the manifest get grilled before it is even presented?</summary>
<div class="qa-body">

Because a manifest that has not been pressure-tested is a draft, not a commitment, per `SKILL.md`'s own procedure. The grill round runs before the ordered list ever reaches the user, so what gets presented for approval has already had its weakest epic challenged once.

</div>
</details>

<details class="qa">
<summary>Where do candidate epics actually come from under the transformation hat?</summary>
<div class="qa-body">

From the TOM's maturity gaps, not a Business Understanding Document. `HATS.md` states epics under the transformation hat "originate from maturity gaps the TOM surfaces or from statement-of-work milestones already committed to a sponsor" — a different source than the recommended epics a product-hat document carries.

</div>
</details>

## It's working if

- An epic that secretly depends on another gets caught and split during carve, not discovered as a blocked story three sprints into delivery.
- Every epic in the manifest names a real persona from the upstream document, never "all users" standing in for one.
- A manifest approaching eight epics gets flagged as a program signal, and the escalation actually reaches the user rather than getting quietly absorbed into a ninth epic.
- The manifest a sponsor sees at Investment already carries a grill pass, so their first read is not also the first pressure test it received.

If a manifest keeps landing at exactly eight epics because a ninth candidate always gets folded into an existing one instead of counted honestly, the ceiling is being worked around rather than respected.

## Where it fits

Carve is step 2 of the run-a-product-org journey and the pm group's Define-phase step that turns a confirmed baseline into the thing everyone is now building against. Its upstream dependency splits by hat — `map`'s Business Understanding Document under product, `tom-architect`'s maturity gaps under transformation — and its downstream handoff is `prd-draft`, which drafts one PRD per approved epic.

Its nearest neighbor across the group seam is `slice`, the developer group's own decomposition skill; the two are close enough in surface description that `test/eval/routing.jsonl` pairs them as a deliberate confusable case. The manifest carve produces is approved together with the case at the Investment gate, per `GATES.md`.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
