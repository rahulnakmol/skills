---
layout: skill
name: deliver
title: "Deliver: CI/CD and Release Readiness"
description: "Deliver checks a repository's release readiness and drives a change too large for one review into a dependency-ordered stack of pull requests."
group: developer
invocation: model-invoked
scenario: "Shipping the notifications-service split as a reviewable stack of pull requests"
lens:
  novice:
    who: 'You have watched a huge, unreviewable pull request get rubber-stamped because no one had time to read all of it.'
    value: 'Deliver splits a multi-concern change into a dependency-ordered stack of small pull requests, each reviewable on its own, so nothing gets waved through unread.'
  practitioner:
    who: 'You are the one raising the pull request once implementation is verified.'
    value: 'You get a repository checklist run before you start &mdash; Code Quality, `gh stack` tooling, pickup-protocol labels, the shakedown workflow &mdash; and a release checklist with gate evidence and artifact hashes when you are done.'
  leader:
    who: 'Your team keeps producing changes too large for one person to review in one sitting.'
    value: 'A change spanning more than one concern always ships as a stack, never as one giant diff, and every pull request states its coverage and traceability before it is raised.'
  csuite:
    who: 'You need release evidence you can point to when something ships badly.'
    value: 'Every release carries a checklist with gate evidence and artifact hashes, and the repository setup that makes stacking and quality checks possible is verified, not assumed.'
---

## What it does

Deliver is the model-invoked charter for release readiness. It checks a target repository is actually set up for agent-driven delivery, then drives a ready work item to a shippable state. A change spanning more than one concern always ships as a dependency-ordered stack of pull requests, never one diff a reviewer has to swallow whole.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Gate</span><span class="step-text">Verify the item is at ready; refuse otherwise — that check belongs to a human, not to this workflow.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Plan</span><span class="step-text">A SPEC-TS snapshot, file ownership, and a layer plan for stacking, built from the work item's own contract.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Implement</span><span class="step-text">A single writer implements and writes tests in an isolated worktree, one commit per layer of the plan.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Verify</span><span class="step-text">A separate verifier runs the contract verification commands; a bounded fix loop runs until it passes or stalls.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Raise</span><span class="step-text">One pull request, or a dependency-ordered reviewable stack via gh stack, each stating its coverage before it opens.</span></div>
</div>

<ul class="benefits">
  <li>The repository's own readiness — Code Quality, <code>gh stack</code> tooling, pickup-protocol labels, the shakedown workflow — is checked before gated work begins, not discovered missing mid-build.</li>
  <li>A change spanning more than one concern always ships as a stack, never as one giant diff a reviewer has to hold in their head.</li>
  <li>A red or missing verification never reaches Raise: the bounded fix loop runs first, and two identically failing rounds stop the run instead of forcing a PR through.</li>
  <li>Every pull request states its coverage and traceability before it opens, so a reviewer is never asked to trust an unstated claim.</li>
</ul>

`STACKING.md` states the posture in one line: "Stacking a multi-concern change is never optional — it is the default posture for `deliver-work-item`, not a judgment call to skip under time pressure." Its review rule is just as direct: "When a reviewer requests changes in a lower layer, fix it there and sync the stack upward — never patch the same problem again in a higher layer."

- [`REPO-SETUP.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/REPO-SETUP.md) covers what "ready" means and what deliver checks before gated work begins.
- [`STACKING.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/STACKING.md) covers when and how a multi-concern change becomes a dependency-ordered stack.
- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md) covers the gate evidence deliver's Raise phase closes out.
- [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) covers the coverage and traceability a pull request states before it is raised.
- [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md) covers the overlay applied wherever the shipped component is regulated.

Deliver reads each one only when the moment calls for it: checking readiness reads REPO-SETUP.md, planning layers reads STACKING.md, closing a gate reads METHOD.md, a regulated component reads the overlay.

## When to reach for it

Nothing types `/deliver` in Claude Code. Deliver is model-invoked, reached three ways. An SDLC gate — one of the sign-off points in the sdlc skill's own design-build-secure-release loop — calling for deliver evidence reaches it. A work item's pod charter, the roster of roles a work item's charter names as responsible for it, reaches it by naming the deliver role. And a request whose wording matches the skill's own description reaches it directly.

You reach for deliver in three moments. A work item just moved to ready, and it needs to become a shippable pull request. A change is too large or spans too many concerns for one reviewer to hold in their head at once. A repository has never run this pipeline before, and nobody has confirmed it is actually set up for it.

Deliver is not the only skill that touches release. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need an isolated, pre-merge review of a pull request that already claims done | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You need the completion ledger a release checklist should carry evidence from | [`grit`]({{ '/grit/' | relative_url }}) |
| You need the whole gated loop, design through release, not only the release gate | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need the acceptance criteria and coverage matrix a pull request states before it is raised | [`slice`]({{ '/slice/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Deliver's charter is embodied by a real dynamic workflow here, exposed as the plugin slash command <code>/rahulnakmol-skills:deliver-work-item</code>. It runs Gate, Plan, Implement, Verify, and Raise in sequence, and it refuses a work item that has not yet reached <code>ready</code>.</p>
<div class="prompt-card">Deliver work item #482, the notifications-service split, now that it is marked ready. Plan the layer stack per STACKING.md, implement it as a single writer, verify it against its contract, and raise it as a reviewable gh-stack rather than one giant diff.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The workflow returns the branch, the raise mode, the pull-request list, and every gate's evidence, in the shape its own closing return produces.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode has no single <code>/deliver</code> command; the <code>deliver</code> template (<code>tools/opencode-workflows/templates/deliver.json</code>) runs through the deterministic workflow runner <code>./scripts/install-adapters.sh --tool opencode</code> installs, wrapped by <code>./scripts/pipeline.sh deliver &lt;item#&gt; --engine opencode</code>.</p>
<div class="prompt-card">scripts/pipeline.sh deliver 482 --engine opencode &mdash; deliver work item #482, the notifications-service split, as a dependency-ordered gh-stack per STACKING.md once it is marked ready, verifying it against its contract before any pull request opens.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The runner refuses to mutate the workspace without an explicit apply flag and a check command, plans the layer stack, implements as a single writer, and raises either one PR or a stack.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer and no workflow runner from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies deliver's readiness checklist and <code>STACKING.md</code> by reading the catalog as context, following <code>AGENTS.md</code>.</p>
<div class="prompt-card">Work item #482, the notifications-service split, is marked ready. Check the repository against skills/developer/deliver/REPO-SETUP.md, then implement it and raise it as a dependency-ordered stack per STACKING.md if it spans more than one concern.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor works through the checklist and the stack plan directly in the session, since there is no workflow output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees deliver's name and description the same way the other tools do. It gets no command layer or workflow runner either.</p>
<div class="prompt-card">Read skills/developer/deliver/SKILL.md, REPO-SETUP.md, and STACKING.md, then deliver work item #482, the notifications-service split. Stack it by concern if it is too large for one review, and state its coverage before raising.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex works through the same checklist, reading its context from the skill files rather than any installed runner.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command layer or workflow runner for Copilot, so deliver's checklist is applied as context, not run by a sequencer.</p>
<div class="prompt-card">Before raising a pull request for work item #482, check this repository against skills/developer/deliver/REPO-SETUP.md, and stack the change per STACKING.md if it spans more than one concern. State its coverage and traceability in the pull-request body before opening it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot opens the pull request or requests directly; nothing here sequences Gate, Plan, Implement, and Verify for it the way the two workflow runners do.</p>
</div>
</div>

A good ask includes:

- The work item number and where it lives — GitHub or Linear.
- The stack base, if it differs from this repository's `dev` convention.
- Whether a verification depth is already decided, or deliver should recommend one from grit's rubric.
- Whether the work touches a regulated industry, so the governance overlay applies before the pull request opens.

Readers who have not installed the whole skill pack can add deliver alone:

```bash
./scripts/link-skills.sh --skill deliver
```

This links only deliver into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>Deliver work item #482, the notifications-service split, now that it is marked ready. Plan the layer stack per STACKING.md, implement it as a single writer, verify it against its contract, and raise it as a reviewable gh-stack rather than one giant diff.</code></pre>

Deliver's Gate phase reads the item and confirms its pickup-protocol label is `ready`; the workflow's own metadata states the alternative directly: "The workflow refuses items at any earlier state — that gate belongs to a human, not to this script." Only then does Plan run, producing a layer plan that matches the three components architect decomposed the service into.

The plan and the final result, shown here as the shape the workflow's own code produces, not as a captured run:

<pre><code>layers:
  - preferences: preferences-store &mdash; per-user channel preference schema and read API
  - worker:      delivery-worker &mdash; fan-out to provider queues
  - api:         notifications-api &mdash; public REST intake bounded by the new contract

return {
  status: 'DELIVERED',
  item: '#482',
  branch: 'item-482-notifications-split',
  mode: 'stack',
  prs: ['#483', '#484', '#485'],
  layers: ['preferences: per-user channel preference schema and read API',
           'worker: fan-out to provider queues',
           'api: public REST intake bounded by the new contract'],
  verification: ['node scripts/verify-notifications.mjs'],
  gates: [{ id: 'G1', met: true, evidence: 'exit=0; EXPECT=matched' }],
  depth: 6,
}</code></pre>

This mirrors the exact field names `deliver-work-item.js`'s closing `return` produces — `status`, `item`, `branch`, `mode`, `prs`, `layers`, `verification`, `gates`, `depth` — filled here with this scenario's values rather than a live run's. Between Plan and Raise, Verify ran the ledger's gates and the contract's verification commands; had two rounds failed identically, the workflow would have stopped with `NO_PROGRESS` instead of forcing a pull request through.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A stack that ships cleanly</div>
<pre><code>gh stack init    <span class="tok-comment"># base = dev</span>
gh stack add     <span class="tok-comment"># preferences, worker, api layers, in order</span>
gh stack push
gh stack submit  <span class="tok-comment"># opens the linked pull requests</span></code></pre>
<div class="compare-card-note">From <code>STACKING.md</code>: "One concern per pull request." Each layer builds on a reviewed checkpoint below it.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Stacking treated as optional under time pressure</span>
<span class="tok-warn">A lower-layer fix patched again in a higher layer</span></code></pre>
<div class="compare-card-note">From <code>STACKING.md</code>: "Stacking a multi-concern change is never optional &mdash; it is the default posture for <code>deliver-work-item</code>, not a judgment call to skip under time pressure." And: "When a reviewer requests changes in a lower layer, fix it there and sync the stack upward &mdash; never patch the same problem again in a higher layer."</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the work item is not yet marked ready?</summary>
<div class="qa-body">

The Gate phase refuses it. The workflow's own description states the reason directly: this workflow "refuses items at any earlier state — that gate belongs to a human, not to this script." Deliver does not decide readiness on its own authority.

</div>
</details>

<details class="qa">
<summary>When does a change have to ship as a stack rather than one pull request?</summary>
<div class="qa-body">

Two conditions trigger it. The change spans more than one concern — a data model, an API (the interface layer other code calls) on top of it, a UI on top of that. Or it is too large to review in one sitting, with roughly 400 changed lines as `STACKING.md`'s own working threshold for where to start considering layers.

</div>
</details>

<details class="qa">
<summary>What happens when two verification rounds fail the same way?</summary>
<div class="qa-body">

The workflow stops rather than looping forever. Its own logic states the rule directly: "Two verification rounds failed identically; stopping per the no-progress rule." A third identical attempt would not have produced new evidence, so it does not run.

</div>
</details>

<details class="qa">
<summary>Who fixes a lower-layer problem a reviewer finds?</summary>
<div class="qa-body">

The layer it actually belongs to, then the fix syncs upward through the stack. `STACKING.md` forbids the alternative directly: never patch the same problem again in a higher layer, since that leaves the lower layer's history carrying a defect its own review already caught.

</div>
</details>

<details class="qa">
<summary>Is the repository's own setup checked before any of this runs?</summary>
<div class="qa-body">

Yes. `REPO-SETUP.md`'s checklist — GitHub Code Quality on its own Actions path, the `gh stack` tooling, the six pickup-protocol labels, the shakedown workflow — is verified at the release-readiness gate, and the result is recorded as gate evidence rather than assumed.

</div>
</details>

## It's working if

- A multi-concern change always ships as a dependency-ordered stack, never as one diff a reviewer has to swallow whole.
- Every pull request states its coverage and traceability before it opens, not after a reviewer has to ask for it.
- An unmet verification gate never reaches Raise — the bounded fix loop runs, or the workflow stops with `NO_PROGRESS` rather than forcing a pull request through.
- The repository's own readiness — Code Quality, `gh stack` tooling, pickup labels, the shakedown workflow — is checked and recorded as gate evidence, not assumed.

If a lower-layer fix keeps getting patched again in a higher layer instead of synced upward, the stack has stopped doing the one job it exists for.

## Where it fits

**Deliver is the release-readiness lane inside the gated build loop, and the skill that turns a ready work item into a shippable, reviewable stack.**

Its nearest neighbor is `shakedown`: shakedown reviews, in an isolated sandbox, exactly what deliver raises, before it merges. `grit`'s ledger is what deliver's Verify phase actually executes, gate by gate, and `sdlc` owns the whole loop that deliver's release phase sits inside.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names release as the intent that points to deliver and shakedown together.
