---
layout: skill
name: shakedown
title: "Shakedown: Isolated Pre-Merge Verification"
description: "Shakedown builds, tests, and executes a pull request in an isolated sandbox, then posts a blocking review on a red build or a missing coverage floor."
group: developer
invocation: user-invoked
scenario: "Reviewing the checkout-payment-migration pull request before it merges"
lens:
  novice:
    who: 'You have approved a pull request because the description sounded right, then found out later it never actually ran.'
    value: 'Shakedown builds it, runs it, and executes the changed behavior in a disposable sandbox before anyone approves anything.'
  practitioner:
    who: 'You need pre-merge confidence on a pull request and CI is not available where you are working.'
    value: 'You get the same isolated build-test-execute pass CI would run, evaluated against the pull request''s own stack base, with existing check runs reused instead of duplicated.'
  leader:
    who: 'You own what lands on your team''s main branch, and you do not read every diff yourself.'
    value: 'A red build, a failing coverage floor, or a missing acceptance-criterion test blocks the review outright; nothing merges on an unverified claim.'
  csuite:
    who: 'You need pre-merge verification that runs the same way whether a person or an agent is watching.'
    value: 'The check can run headless in continuous integration, off a workflow shipped in the repository, with no live model call until a maintainer explicitly opts in.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 5
journey_steps: 5
journey_prev: grit
---

## What it does

Shakedown is the user-invoked isolated verification pass a pull request or branch goes through before merge. It checks out the change in a disposable worktree, builds it, runs the tests, and executes the changed behavior rather than trusting a green exit code. VERIFICATION.md names its own version of this sequence directly: "shakedown-pr's Recon &rarr; Sandbox &rarr; Review &rarr; Verify &rarr; Verdict sequence, run inside a disposable worktree."

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Recon</span><span class="step-text">Read the pull request: head and base branches, whether it is one layer of a stack, the build and test commands, and every existing check run's conclusion, Code Quality included.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Sandbox</span><span class="step-text">Build with the project's build command, run its tests, and actually execute the changed behavior — never with production credentials.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Review</span><span class="step-text">Correctness, security, and test-adequacy lenses run in parallel, cross-referencing existing checks instead of repeating analysis the repository already gets.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Verify</span><span class="step-text">A grit gate audit in the pull request body gets spot-checked against the diff, not simply trusted because its table says met.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Verdict</span><span class="step-text">A blocking review on a red sandbox run or a confirmed finding; a clean, non-blocking one otherwise — approval always stays with a person.</span></div>
</div>

<ul class="benefits">
  <li>A pull request that "sounds right" but never actually ran gets built, tested, and executed in a disposable sandbox before anyone approves it.</li>
  <li>A stacked layer is judged against its own stack base, and an existing check run &mdash; Code Quality included &mdash; gets consumed once, never duplicated.</li>
  <li>A grit gate audit's claimed-met gates get spot-checked against the diff, not simply trusted because the table already says met.</li>
  <li>A red build or a confirmed blocking finding always posts a blocking review; even a clean verdict leaves final approval with a person.</li>
</ul>

The workflow's own verdict logic states the rule in one line: "a failing build or test suite is always blocking, never approved."

- [`SANDBOX.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/shakedown/SANDBOX.md) covers the isolation rules: a disposable worktree or a continuous-integration (CI) sandbox, build plus test plus an optional security scan, no production credentials.
- [`pr-shakedown.yml`](https://github.com/tqnonline/skills/blob/main/skills/developer/shakedown/pr-shakedown.yml) is the real, dispatch-only continuous-integration workflow this repository ships for this pass.
- [`STACKING.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/STACKING.md) covers evaluating a stacked layer against its own stack base rather than the whole feature.
- [`COVERAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/COVERAGE.md) covers the floors a coverage gap gets flagged against, only where no existing check already covers it.
- [`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md) covers the open-the-diff discipline the Verify step runs before anything gets posted.

Shakedown reads each one only when the moment calls for it: sandboxing reads SANDBOX.md, a stacked pull request reads STACKING.md, a coverage question reads COVERAGE.md, posting a verdict reads VERIFICATION.md.

## When to reach for it

Type `/rahulnakmol-skills:shakedown-pr` in Claude Code, or name the skill directly in a session. Shakedown is user-invoked, so nothing reaches for it on its own: a person decides a pull request needs pre-merge confidence before review.

You reach for shakedown in three moments. A pull request needs pre-merge confidence, and continuous integration is not available where you are working. Someone approved a pull request because its description sounded right, and you want proof it actually ran, not just built. A pull request claims done, and you want an isolated build-test-execute pass before you trust that claim.

Shakedown is not the only skill that touches a pull request. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the pull request actually raised, not just reviewed | [`deliver`]({{ '/deliver/' | relative_url }}) |
| You need the completion ledger this review consumes, not a fresh check from scratch | [`grit`]({{ '/grit/' | relative_url }}) |
| You need the whole gated loop, not an isolated pre-merge pass | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need a security-specific threat model, not a build-test-execute pass | [`safeguard`]({{ '/safeguard/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>In Claude Code, shakedown runs as the <code>shakedown-pr</code> dynamic workflow, exposed as the plugin slash command <code>/rahulnakmol-skills:shakedown-pr</code>. It runs Recon, Sandbox, the three parallel review lenses, and Verdict against the pull request you name.</p>
<div class="prompt-card">Run a shakedown on the checkout-payment-migration pull request before anyone approves it. Build it, run its tests, and actually execute the changed checkout and refund paths in an isolated sandbox, then post a blocking review if the build is red or a gate in its ledger is unmet.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Shakedown posts the review directly on the pull request: build, test, and execution status, the existing checks it consumed, and the verdict.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the deterministic workflow runner; the <code>shakedown</code> template (<code>tools/opencode-workflows/templates/shakedown.json</code>) runs Recon, Sandbox, the correctness/security/tests lenses in parallel, and a Verdict task, wrapped by <code>./scripts/pipeline.sh shakedown &lt;PR#&gt; --engine opencode</code>.</p>
<div class="prompt-card">scripts/pipeline.sh shakedown 517 --engine opencode &mdash; shake down pull request #517, the first layer of the checkout-payment-migration stack, against its own stack base, and post NOT_READY if the sandbox run is red or a blocking finding survives review.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The runner returns READY or NOT_READY, with the sandbox result, the confirmed findings, and the existing checks it consumed rather than re-ran.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer or workflow runner from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies shakedown's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Before we merge pull request #517, run the isolated build-test-execute pass the way skills/developer/shakedown/SKILL.md and SANDBOX.md describe, in a disposable worktree with no production credentials, and tell me plainly if the build or tests fail.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor works through Sandbox and Review directly in the session, since there is no workflow output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees shakedown's name and description the same way the other tools do. It gets no command layer or workflow runner either.</p>
<div class="prompt-card">Read skills/developer/shakedown/SKILL.md and SANDBOX.md, then shake down pull request #517 in an isolated worktree: build it, run its tests, execute the changed behavior, and check its coverage against COVERAGE.md's floors before you approve anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex works through the same pass, reading its context from the skill files rather than any installed runner.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command layer or workflow runner for Copilot, so shakedown's procedure is applied as context, not run by a sequencer.</p>
<div class="prompt-card">Before approving pull request #517, read skills/developer/shakedown/SKILL.md, build and test it in an isolated environment, execute the changed behavior, and post a blocking comment if the build is red or an acceptance-criterion test is missing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot posts the review as a pull-request comment; a person still approves, since no hook here posts a blocking review the way the installed workflow can.</p>
</div>
</div>

A good ask includes:

- The pull request or branch to shake down, and whether it is one layer of a larger stack.
- Whether continuous integration already ran, so existing check runs get consumed instead of duplicated.
- What should happen on a red build or a missing acceptance-criterion test — block, or just report.
- Whether a grit gate ledger exists for this pull request, so its audit gets spot-checked rather than trusted at face value.

Readers who have not installed the whole skill pack can add shakedown alone:

```bash
./scripts/link-skills.sh --skill shakedown
```

This links only shakedown into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>Run a shakedown on the checkout-payment-migration pull request before anyone approves it. Build it, run its tests, and actually execute the changed checkout and refund paths in an isolated sandbox, then post a blocking review if the build is red or a gate in its ledger is unmet.</code></pre>

Recon reads the pull request first: it is the payment-API layer — the interface to the payment provider — of the checkout-payment-migration stack, based on the reconciliation-job layer below it. Its existing checks already show `github-code-quality=success`, a conclusion Sandbox will consume, not repeat. Sandbox then checks out the head commit into an isolated worktree with no production credentials, builds the project, runs its test suite, and actually executes a test-card checkout end to end.

The three review lenses run in parallel next. Correctness and security each find nothing reachable. The tests lens cross-references the existing checks, and because the pull request body carries a grit gate audit against `.grit/checkout-migration/GATES.md`, it spot-checks one claimed-met gate's `CHECK` against the diff rather than trusting the table. Verdict then composes the review, shown here as the shape the workflow's own tasks produce, not as a captured run:

<pre><code>build: pass  tests: pass  executed: pass
Existing checks consumed: github-code-quality=success (not re-run)
Spot-checked gate: G1 CHECK re-run against the diff, EXPECT matched
Verdict: READY &mdash; no confirmed blocking finding survived review</code></pre>

Approval still stays with a person even on a clean `READY` verdict — shakedown's own review is non-blocking by design when nothing failed, exactly as the workflow's verdict logic states.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A review backed by a real run</div>
<pre><code><span class="tok-ok">build:</span> pass  <span class="tok-ok">tests:</span> pass  <span class="tok-ok">executed:</span> pass
<span class="tok-ok">Existing checks consumed:</span> github-code-quality=success (not re-run)
<span class="tok-ok">Verdict:</span> READY &mdash; no confirmed blocking finding survived review</code></pre>
<div class="compare-card-note">The diff was actually executed, not just built, and Code Quality's own conclusion was read from the check run instead of duplicated.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>build: fail  tests: <span class="tok-warn">skipped</span>
Verdict: <span class="tok-warn">READY</span>  <span class="tok-comment">&larr; a red build never gets a clean verdict</span></code></pre>
<div class="compare-card-note">Per the workflow's own verdict logic: "a failing build or test suite is always blocking, never approved" — a red sandbox run or a confirmed blocking finding always forces a blocking review.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the sandbox cannot be created?</summary>
<div class="qa-body">

SKILL.md's stop condition is direct: a sandbox that cannot be created means stop with manual steps, rather than fall back to trusting the pull request's own claims about what it does.

</div>
</details>

<details class="qa">
<summary>Are production credentials ever used during the sandbox run?</summary>
<div class="qa-body">

No. `SANDBOX.md`'s isolation rules and SKILL.md's own stop condition agree on this without exception: the build, test, and execution pass runs in a disposable worktree or CI sandbox, and never with production keys, even when a secret would make the run easier.

</div>
</details>

<details class="qa">
<summary>How does a stacked pull request get evaluated?</summary>
<div class="qa-body">

Against its own stack base, not the whole feature. `STACKING.md` states the payoff directly: "`shakedown-pr` reviews each layer against its own stack base, so a red result points at the layer that caused it, not at the whole feature."

</div>
</details>

<details class="qa">
<summary>Does shakedown re-run GitHub Code Quality's static analysis?</summary>
<div class="qa-body">

No. `REPO-SETUP.md`, deliver's repository-readiness checklist, is explicit that shakedown consumes Code Quality's conclusions from the pull request's own check runs instead of re-running static analysis the repository already receives — duplicating it wastes tokens and can produce a conflicting report.

</div>
</details>

<details class="qa">
<summary>Does shakedown trust a grit gate audit's "met" claims at face value?</summary>
<div class="qa-body">

No. The tests lens spot-checks the claimed met gates against the diff — rerunning or reasoning through a sample of their `CHECK` commands against the `EXPECT` tokens — and flags an audit whose unmet or abandoned gates are missing from the table or left unexplained.

</div>
</details>

<details class="qa">
<summary>Does this work outside Claude Code?</summary>
<div class="qa-body">

Yes. OpenCode runs the same Recon-Sandbox-Review-Verify-Verdict sequence through its own installed workflow runner; Cursor, Codex, and GitHub Copilot read the same skill catalog as context and apply the sandbox discipline without a workflow runner of their own.

</div>
</details>

## It's working if

- A pull request never gets approved on a green build alone; the changed behavior was actually executed first.
- A stacked layer's review points at the layer that actually caused a red result, not at the whole feature above it.
- Every existing check run — GitHub Code Quality included — gets consumed once, never re-run and never contradicted by a duplicate report.
- A grit gate audit's claimed-met gates get spot-checked against the diff, not simply trusted because the table says met.

If a review keeps posting a clean verdict on a red sandbox run, the review has stopped verifying anything and started approving without checking.

## Where it fits

**Shakedown is the last step of the Deliver with evidence journey, and the isolated pre-merge check every pull request this pipeline raises still has to pass.**

Its nearest neighbor is `deliver`: deliver raises exactly what shakedown reviews. `grit`'s own sibling list names shakedown directly as the outside check of the same audit — "the verification doctrine grit makes runnable" — reviewing the finished change in an isolated sandbox rather than proving it from the inside as it is built.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names release as the intent that points to deliver and shakedown together.

This page sits at step 5 of 5 on the Deliver with evidence journey; the footer below carries you back to `grit` before it.
