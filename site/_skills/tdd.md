---
layout: skill
name: tdd
title: "TDD: Test-First, One Slice at a Time"
description: "TDD builds a feature or fixes a bug one vertical slice at a time, writing a test that fails for the right reason before the implementation exists."
group: developer
invocation: model-invoked
scenario: "Building QuenServe story E1-F1-S1 test-first, one vertical slice at a time"
lens:
  novice:
    who: 'You have written tests after the code and watched every one of them pass on the first run.'
    value: 'TDD makes you write the test first and read its failure, because a test that has never failed has not yet proven it can catch anything.'
  practitioner:
    who: 'You are the one implementing the slice, and you own the suite that has to stay green.'
    value: 'You get a fixed loop &mdash; one slice, one red with the assertion message recorded, the least code to green, the whole suite, then refactor under green &mdash; and a trace entry that shows the work happened in that order.'
  leader:
    who: 'Your team keeps shipping changes that pass review and break something three weeks later.'
    value: 'Every behavior the team ships is covered by a test that was observed failing before the code existed, so a regression has somewhere to land instead of reaching a user.'
  csuite:
    who: 'You need to know that change gets slower over time for a reason you chose, not by accident.'
    value: 'Test-first costs more per slice and pays back in the changes that come later; the trade is stated plainly and the evidence for each slice is written down rather than asserted.'
---

## What it does

TDD is the model-invoked test-first discipline in the developer group. It takes one vertical slice — the smallest change a user of the interface could observe — and drives it from a failing test to passing code, then improves the code without changing what it does. The order is the whole point: the test comes first, and its failure is read before any implementation is written.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Slice</span><span class="step-text">Pick one observable behavior. A change spanning three layers is still one slice if it delivers one behavior a user of the interface can see.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Name</span><span class="step-text">Write the test first, named for the behavior rather than the function — "rejects an expired session" over "test refresh".</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Red</span><span class="step-text">Run it and read the failure. It has to fail for the reason the test exists, and the assertion message it produced is recorded.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Green</span><span class="step-text">Write the least code that satisfies this assertion — not the design intended for the finished feature.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Suite</span><span class="step-text">Run the whole suite, not only the new test. Green here means nothing else moved.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Refactor</span><span class="step-text">Improve structure and names under green, rerunning the suite after each step, then append the trace entry and take the next slice.</span></div>
</div>

<ul class="benefits">
  <li>Every test in the suite has been observed failing for the reason it exists, so none of them is a test that would pass no matter what the code did.</li>
  <li>The implementation stays inside the slice, because the only code written is the code some assertion demanded.</li>
  <li>A regression has somewhere to land: the behavior a later change breaks is already covered by a test that ran red once on purpose.</li>
  <li>The run leaves an audit artifact — the seam, the red message, the file and line that made it green — that a reviewer can open instead of redoing the work.</li>
</ul>

The discipline is stated as a set of stop conditions, and the sharpest one is about the test rather than the code. If the test passes the first time it runs, the test does not test what it claims, and it gets fixed before any implementation is written. `TESTS.md`, the doctrine document the skill reads at the naming step, covers what separates a test that holds from one that only passes.

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/tdd/SKILL.md) covers the procedure, the stop conditions, and the output contract each slice produces.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the run record this skill appends its red-green entry to.
- [`grit`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/SKILL.md) covers the gate ledger the accumulated evidence closes out.
- [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) covers the acceptance criteria a slice is drawn from.

TDD reads each one only when the moment calls for it: naming a test reads the naming doctrine, closing a slice writes the trace, and meeting the criterion hands the evidence to the ledger.

## When to reach for it

Nothing types `/tdd` in Claude Code. TDD is model-invoked, reached four ways. A work item whose acceptance criterion describes behavior a test can observe reaches it. A reproducible bug reaches it, because the reproduction belongs in the suite before the fix does. `sdlc` or `deliver` reaching implementation on a slice with a testable contract reaches it. And a direct request for test-first work, red-green-refactor, or a regression test reaches it.

You reach for TDD in three moments. A slice is about to be implemented and its behavior is observable from outside the code. A bug is understood well enough to reproduce, and the reproduction should be locked in before anything is fixed. Or a change is going into code that other work will keep touching, so the cost of writing the test now is worth what it saves later.

TDD is not the only skill that touches tests and code change. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You do not yet understand why something fails, so no test can be written for it | [`debug`]({{ '/debug/' | relative_url }}) |
| You need a structural change larger than a green-to-green step | [`refactor`]({{ '/refactor/' | relative_url }}) |
| You need the gate ledger this evidence closes out | [`grit`]({{ '/grit/' | relative_url }}) |
| You need the acceptance criteria a slice is drawn from | [`slice`]({{ '/slice/' | relative_url }}) |
| You need the finished change raised as a reviewable pull request | [`deliver`]({{ '/deliver/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same tdd skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want tdd can skip the rest of the catalog with `./scripts/link-skills.sh --skill tdd`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Plain ask, no slash command</span></div>
<div class="tool-group-body">
<p>TDD has no slash command of its own. Claude reaches for it when a request asks for test-first work, when a bug is reproducible, or when a gated workflow arrives at implementation on a slice with a testable contract. The skill is read from the installed catalog and applied directly in the session.</p>
<div class="prompt-card">Build QuenServe story E1-F1-S1 test-first: an inspector completes an inspection with no connectivity and it syncs without loss. One vertical slice at a time. Write the failing test first, show me the red and the assertion message before you write any implementation, then the least code that turns it green, then the whole suite.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Each slice returns the seam the test drives, the red message it actually produced, the file and line that made it green, the suite result, and what the slice left open.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command, catalog reading</span></div>
<div class="tool-group-body">
<p>OpenCode has no dedicated <code>tdd</code> command. The skill lands in <code>.agents/skills/</code>, and OpenCode applies it by reading the catalog as context, the same way it would for any skill this repository ships with no installed command. The build and work agents installed by <code>./scripts/install-adapters.sh --tool opencode</code> read the same catalog.</p>
<div class="prompt-card">Read skills/developer/tdd/SKILL.md, then work QuenServe story E1-F1-S1 &mdash; complete an inspection with no connectivity and sync it without loss &mdash; one slice at a time. Do not write implementation until the new test has run red for the right reason and you have shown me its message.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode runs the same loop in the session and reports each red and green directly, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply the procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads a generated companion file, <code>agents/openai.yaml</code>, so it sees the skill's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Follow skills/developer/tdd/SKILL.md for QuenServe story E1-F1-S1, the offline completion story. Name the test for the behavior, run it red first and paste the failure, write the least code to green, then run the whole suite before you refactor anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three work the loop directly in the session, reporting the red message and the suite result at each step.</p>
</div>
</div>

A good ask includes:

- The work item and the acceptance criterion the slice comes from, so the behavior is not invented at the keyboard.
- The command that runs the whole suite, since step five needs it and guessing it wastes a cycle.
- Whether the suite is currently green, because a slice built on an already-red suite cannot show it worked.
- Whether an existing test already covers part of the behavior, so the new test is not a duplicate that passes on arrival.

## A working example

The work item is E1-F1-S1, the delivery story inside feature E1-F1, offline capture, under epic E1, offline inspection sync, on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. The criterion reads: an inspector completes an inspection with no connectivity, and it syncs without loss. You type:

<pre><code>Build QuenServe story E1-F1-S1 test-first: an inspector completes an
inspection with no connectivity and it syncs without loss. One vertical
slice at a time. Write the failing test first, show me the red and the
assertion message before you write any implementation, then the least
code that turns it green, then the whole suite.</code></pre>

The first move is to cut the slice, and it is smaller than the story. The story spans local capture, retry once signal returns, and idempotent acceptance at the ingestion endpoint. The first slice is only the first of those: a completed inspection survives on the device when there is no network. The seam is the offline completion queue, not the HTTP client, because the queue is the interface the behavior is observable through.

The test is named for that behavior, and the name is the first place the discipline shows:

<pre><code>queues a completed inspection when the device is offline   <span class="tok-comment"># behavior</span>
test_saveCompletion                                        <span class="tok-comment"># function</span></code></pre>

Then it runs, before any implementation exists, and the failure is read rather than assumed. A failure on a missing import or a typo has proven nothing yet, so the run is repeated until the test fails on its own assertion. Here it produces `expected 1 queued completion, received 0` — the queue interface exists, the behavior does not.

Only then is code written, and only enough to satisfy that assertion. Not the retry policy, not the endpoint contract; those belong to later slices with their own tests. The whole suite runs next, not just the new test, because green on the new test alone says nothing about what the change moved elsewhere.

The slice closes with the record the skill's own output contract defines, filled here with this scenario's values rather than a live run's:

<pre><code>slice: an inspector's completed inspection survives on the device with
       no network present
seam:  offline completion queue
red:
  test: test/offline-queue.test.mjs:34
  message: "expected 1 queued completion, received 0"
green:
  implementation: src/offline-queue.ts:57
  suite: 214 passed, 0 failed
refactored: extracted the queue key builder; suite green after
open: retry and fan-out once connectivity returns; idempotent acceptance
      at the ingestion endpoint</code></pre>

The `open` field is what makes the next slice obvious. The loop repeats — retry next, then the endpoint — until the criterion is met, and the accumulated evidence is handed to the gate ledger `grit` keeps for this scope.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A slice that holds</div>
<pre><code><span class="tok-comment"># 1. test first, run it, read the failure</span>
FAIL queues a completed inspection when the device is offline
     expected 1 queued completion, received 0

<span class="tok-comment"># 2. least code, then the WHOLE suite</span>
PASS 214 passed, 0 failed

<span class="tok-comment"># 3. refactor under green, suite after each step</span>
PASS 214 passed, 0 failed</code></pre>
<div class="compare-card-note">The red was observed and its assertion message recorded before any implementation existed. The suite ran whole at step two, so green means nothing else moved.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">The new test passes on its first run</span>
<span class="tok-warn">Red on a missing import, counted as the red</span>
<span class="tok-warn">Only the new test rerun, not the suite</span>
<span class="tok-warn">Refactor goes red, so the test is changed</span></code></pre>
<div class="compare-card-note">Each of these is a stop condition, not a judgment call. A test that passes first time is fixed before any implementation is written, and a refactor that turns a test red is reverted &mdash; the refactor, never the test.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens when the new test passes on its first run?</summary>
<div class="qa-body">

It is treated as a defect in the test, not as good news. The skill's stop condition is direct: the test does not test what it claims, so it is fixed before any implementation is written. A test that has never failed has not shown it can catch anything, and shipping it adds a line to the suite without adding coverage.

</div>
</details>

<details class="qa">
<summary>The test failed, but on a missing import. Does that count as the red?</summary>
<div class="qa-body">

No. The failure has to be the one the test exists to produce. A crash on a missing import or a typo proves the file was loaded, not that the assertion can detect the missing behavior. The run is repeated until the test fails on its own assertion, and that message is the one recorded in the trace.

</div>
</details>

<details class="qa">
<summary>How small is one slice?</summary>
<div class="qa-body">

The smallest change a user of the interface could observe. That is a behavior boundary, not a file or layer boundary: a slice touching a store, a client, and an endpoint is still one slice if it delivers one observable behavior. The check runs the other way too. If the implementation grows past the slice, the slice was too large, so it is split and started again.

</div>
</details>

<details class="qa">
<summary>Why run the whole suite instead of the test just written?</summary>
<div class="qa-body">

Because the new test only reports on the behavior it was written for. Everything the change might have moved lives in the rest of the suite. Green on the new test alone is evidence about one assertion; green on the whole suite is evidence that nothing else broke, which is the claim the slice is actually making.

</div>
</details>

<details class="qa">
<summary>A refactor turned a test red. What gets reverted?</summary>
<div class="qa-body">

The refactor, never the test. Refactoring changes structure or names and leaves behavior alone, so a red test means the behavior moved. The tests are the only thing that would catch that, which is why they are not the thing that gets adjusted. Structural change too large for a green-to-green step belongs to [`refactor`]({{ '/refactor/' | relative_url }}) instead.

</div>
</details>

<details class="qa">
<summary>What if the suite was already red before the slice started?</summary>
<div class="qa-body">

The run stops and reports the pre-existing failure. A slice built on a red suite cannot show it worked, because step five has no clean baseline to compare against. Fixing the standing failure comes first, and if the cause is not understood, [`debug`]({{ '/debug/' | relative_url }}) diagnoses it before test-first work resumes.

</div>
</details>

<details class="qa">
<summary>What if no test can observe the criterion?</summary>
<div class="qa-body">

The skill says so and records it as a manual gate. It does not write a weakened assertion that always passes, which would leave the ledger showing coverage that does not exist. A criterion honestly marked manual is auditable; a green test that asserts nothing is worse than no test, because it reads as evidence.

</div>
</details>

<details class="qa">
<summary>Is test-first slower?</summary>
<div class="qa-body">

Per slice, yes. Writing the test, running it red, and reading the failure costs time that writing the implementation directly does not. The return comes later, in the changes made to the same code weeks afterward: the behavior is already pinned, so a regression fails a test instead of reaching a user. That is a real trade, and it is worth making deliberately rather than by default.

</div>
</details>

## It's working if

- Every test in the suite failed once, on its own assertion, before the code that satisfies it existed.
- Test names describe behavior a reader can check against the acceptance criterion, not the functions that happen to implement it.
- The whole suite runs at every green step, and a slice never closes on a partial run.
- Each slice leaves a record — the seam, the red message, the file and line that made it green, and what it left open — that a reviewer can open instead of rerunning the work.

If a refactor keeps turning tests red and the tests keep getting adjusted to match, the suite has stopped being evidence and become a description of whatever the code currently does.

## Where it fits

**TDD is the implementation loop inside the gated build, and the skill that turns an acceptance criterion into evidence a reviewer can check.**

Its nearest neighbor is `debug`: debug diagnoses a failure that is not yet understood, and hands back a reproducible defect that TDD locks into the suite before the fix. `refactor` takes the structural change too large for a green-to-green step. `grit` turns the acceptance criteria into the gates this evidence closes, `sdlc` owns the loop the implementation phase sits inside, and `deliver` raises what the loop produced as a reviewable pull request.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names implementation as the intent that points here.
