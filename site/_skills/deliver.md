---
layout: skill
name: deliver
title: "Deliver: CI/CD and Release Readiness"
description: "Deliver checks a repository's release readiness and drives a change too large for one review into a dependency-ordered stack of pull requests."
group: developer
invocation: model-invoked
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

Deliver is the release-readiness gate that verifies a target repository is set up for agent-driven delivery and drives a change to a shippable state. Before gated work begins, it checks the repository against `REPO-SETUP.md` &mdash; GitHub Code Quality on its own Actions path, the `gh stack` tooling, the six pickup-protocol labels, and the shakedown workflow &mdash; and sets up what is missing. A change spanning more than one concern, or too large for one review, always ships as a dependency-ordered stack of pull requests, never one giant diff, per `STACKING.md`. The result is a release checklist carrying gate evidence and artifact hashes.

## How to call it

Claude reaches for deliver when a request matches its description: CI/CD and supply-chain readiness, or raising a change as a reviewable stack of pull requests. A prompt like "Check this repository is ready to ship and raise the change as a stack" triggers it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A stack that ships cleanly</div>
<pre><code>gh stack init    <span class="tok-comment"># base = dev</span>
gh stack add     <span class="tok-comment"># one branch per layer, dependency order</span>
gh stack push
gh stack submit  <span class="tok-comment"># opens the linked pull requests</span></code></pre>
<div class="compare-card-note">From <code>STACKING.md</code>: "One concern per pull request." Each layer builds on a reviewed checkpoint below it.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Stacking treated as optional under time pressure</span>
<span class="tok-warn">A lower-layer fix patched again in a higher layer</span></code></pre>
<div class="compare-card-note">From <code>STACKING.md</code>: "Stacking a multi-concern change is never optional &mdash; it is the default posture for `deliver-work-item`, not a judgment call to skip under time pressure." And: "When a reviewer requests changes in a lower layer, fix it there and sync the stack upward &mdash; never patch the same problem again in a higher layer."</div>
</div>
</div>

## In practice

Deliver drives the `deliver-work-item` dynamic workflow, real code at [`adapters/claude/workflows/deliver-work-item.js`](https://github.com/tqnonline/skills/blob/main/adapters/claude/workflows/deliver-work-item.js). Its five phases, quoted verbatim from the file's own metadata:

<pre><code>  phases: [
    { title: 'Gate', detail: 'verify the item is at `ready`; refuse otherwise' },
    { title: 'Plan', detail: 'SPEC-TS snapshot, file ownership, and a layer plan for stacking' },
    { title: 'Implement', detail: 'single writer implements and writes tests in an isolated worktree' },
    { title: 'Verify', detail: 'a separate verifier runs the contract verification commands; bounded fix loop' },
    { title: 'Raise', detail: 'one PR, or a dependency-ordered reviewable stack via gh stack' },
  ],</code></pre>

A run that reaches Raise returns exactly this shape, quoted verbatim from the workflow's closing `return`:

<pre><code>return {
  status: 'DELIVERED',
  item: gate.url ?? String(item),
  branch: plan.branch,
  mode: raised.mode,
  prs: raised.prs,
  layers: plan.layers.map((layer) => `${layer.name}: ${layer.concern}`),
  verification: plan.verificationCommands,
  gates: verdict.gates,
  depth: plan.depth,
}</code></pre>

## How it works

1. **Verify the repository.** Check it against `REPO-SETUP.md` &mdash; Code Quality, `gh stack` tooling, pickup-protocol labels, the shakedown workflow &mdash; and set up what is missing, recording the result as gate evidence. See [`REPO-SETUP.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/REPO-SETUP.md).
2. **Follow the gates.** SPEC-TS and the human gates that govern the deliver phase. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).
3. **Stack a multi-concern change.** A change spanning more than one concern, or too large for one review, ships as a dependency-ordered stack, never one giant diff. See [`STACKING.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/STACKING.md).
4. **State coverage before raising.** Every pull request, stacked or single, states its coverage and use-case traceability before it is raised. See [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md).
5. **Regulated context.** Apply the governance overlay when the work touches a regulated industry or a consequential automated decision. See [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).
