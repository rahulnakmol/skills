---
layout: skill
name: debug
title: "Debug: Evidence-Led Diagnosis"
description: "Debug reproduces a failure before touching code, tests one falsifiable hypothesis at a time, fixes the named cause, and hands the regression test to tdd."
group: developer
invocation: model-invoked
scenario: "Diagnosing a dropped edit in QuenServe's conflict resolution feature, E1-F2"
lens:
  novice:
    who: 'You have watched a bug get "fixed" by a change nobody could explain, and then watched it come back a month later.'
    value: 'Debug refuses to change code until a command reproduces the failure on demand, and it refuses to call a bug fixed until it can name the cause in one sentence.'
  practitioner:
    who: 'You are the one holding the failing report, and reading the source has not told you why it fails.'
    value: 'You get a fixed order &mdash; reproduce, minimize, hypothesize, instrument, change one thing &mdash; plus a trace entry that records every refuted hypothesis, so the next session does not retry what you already ruled out.'
  leader:
    who: 'Your team spends unpredictable amounts of time on defects, and you cannot tell a hard bug from an undisciplined search.'
    value: 'Every diagnosis leaves a minimized reproduction, a named cause, a measurement on both sides of the fix, and a regression test, so the time spent is visible and the fix is durable.'
  csuite:
    who: 'You need to know that a defect reported by a customer was actually understood, not just made to go away.'
    value: 'A bug closes only when its cause is named and a test guards it; a symptom that disappeared without an explanation is left open and reported as open.'
---

## What it does

Debug is the model-invoked diagnosis loop for a failure whose cause is not yet known. It treats the bug as a measurement problem rather than a reading problem: a reproduction that goes red on demand is the instrument, and every later step reads that instrument. The order is fixed, because the shortcuts people take under pressure — changing two things at once, fixing the symptom, declaring victory when the noise stops — are exactly what makes a bug come back.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Reproduce</span><span class="step-text">Build a command, script, or test that fails on demand, and run it first. This is a gate: no code changes while the loop is green.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Minimize</span><span class="step-text">Remove inputs, configuration, and code paths one at a time until the failure disappears, then restore the last thing removed.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Hypothesize</span><span class="step-text">Write down one claim evidence can refute, before hunting for support, so the hypothesis is not assembled to fit whatever turned up.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Instrument</span><span class="step-text">Add the log line, counter, assertion, or profiler run that reports the value the hypothesis predicts. Measure rather than reason from the source.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Change one thing</span><span class="step-text">Rerun the loop and record the reading. A refutation removes a branch of the search and returns you to step 3.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Fix and lock</span><span class="step-text">Fix the named cause, append the trace entry, and hand off to tdd for a regression test that fails before the fix and passes after.</span></div>
</div>

<ul class="benefits">
  <li>Nothing is changed while the failure cannot be produced, so no fix is ever evaluated against a loop that was green the whole time.</li>
  <li>One hypothesis at a time, written before the evidence is gathered, keeps the search auditable and keeps a refutation from being quietly reinterpreted as support.</li>
  <li>One change at a time keeps the result attributable: two simultaneous changes leave you unable to say which one cleared the symptom, and the unnecessary one travels forward into the codebase.</li>
  <li>A named cause is required to close the bug. A symptom that stops without an explanation is recorded as a change in behavior, not as a diagnosis.</li>
</ul>

The skill states the honest limit plainly. Its stop conditions include the case nobody likes to write down: when the symptom disappears without a named cause, leave the bug open, because "it works now" records a change in behavior rather than a diagnosis. A failure that will not reproduce after a bounded effort ends the same way — report what was tried and name the missing input, environment, or log, rather than fixing on speculation.

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/debug/SKILL.md) carries the ten-step procedure, the five stop conditions, and the output contract this page quotes.
- [`tdd`](https://github.com/tqnonline/skills/blob/main/skills/developer/tdd/SKILL.md) takes the handoff and locks the fix in a test that fails before it and passes after it.
- [`recon`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/SKILL.md) reads the estate first when the failure sits in code nobody on the run knows.
- [`grit`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/SKILL.md) carries the diagnosis as evidence against the gate the bug blocks.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only run record debug writes its hypotheses into.

Debug reads each one only when the moment calls for it: an unfamiliar estate reaches for recon, a blocked gate reaches for grit, and the regression test always reaches for tdd.

## When to reach for it

Nothing types `/debug` in Claude Code. Debug is model-invoked: the model reaches for it on its own when a request matches its description — a defect that resists a quick fix, an intermittent failure, or a measurement that moved the wrong way with no known cause.

Five moments reach it. A test or a user report describes a failure whose cause is unknown. A failure is intermittent, and the first attempt to reproduce it did not. A benchmark, a latency figure, or a memory figure moved the wrong way. `tdd` produced a red test that fails for a reason nobody can explain. Or a previous fix was applied and the symptom came back.

Debug is not the only skill that touches a failing test. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You already know the cause and need the failing test written before the fix | [`tdd`]({{ '/tdd/' | relative_url }}) |
| You cannot yet locate the failing code because the estate is unfamiliar | [`recon`]({{ '/recon/' | relative_url }}) |
| You need the diagnosis carried as evidence against the gate the bug blocks | [`grit`]({{ '/grit/' | relative_url }}) |
| The fix requires a design change wider than the defect itself | [`architect`]({{ '/architect/' | relative_url }}) |
| You need an isolated pre-merge review of the change that carries the fix | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same debug skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want debug can skip the rest of the catalog with `./scripts/link-skills.sh --skill debug`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; model-invoked</span></div>
<div class="tool-group-body">
<p>Debug is model-invoked: nothing is typed to call it. Claude reaches for it when a request describes a failure with an unknown cause, and it ships no plugin slash command and no hook of its own. The skill's own permission surface is narrow — it reads the repository and writes files in the working tree, and nothing else.</p>
<div class="prompt-card">Two inspectors edited the same QuenServe inspection while offline, and reconciliation drops one of the edits. That is exactly what story E1-F2-S1 says must never happen. Reproduce it before changing anything, minimize the case, and test one hypothesis at a time.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The run returns the symptom, the minimized reproduction, every hypothesis with its verdict, the named cause, the measurement on both sides of the fix, and what remains open.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; applied as instructions</span></div>
<div class="tool-group-body">
<p>OpenCode ships no dedicated command for debug. The catalog install places the skill in <code>.agents/skills/</code> the same as every tool, and an agent applies the procedure by reading the skill file as instructions when a defect has no known cause. OpenCode's <code>pro</code> agent is the one whose description already names difficult debugging, so it is the usual place this procedure runs.</p>
<div class="prompt-card">Apply the debug procedure to the E1-F2 reconciliation defect in QuenServe: one edit is dropped when two inspectors edit the same record offline. Build the red loop first, minimize it, then state one falsifiable hypothesis and instrument for it before any code change.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent works the steps directly and reports the output contract in its reply, since there is no workflow output to parse.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply debug's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees debug's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Read skills/developer/debug/SKILL.md and follow it for the QuenServe conflict-resolution bug in E1-F2. Do not change code until a command fails on demand. Write each hypothesis down before you look for support, and change one thing at a time.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three state the diagnosis directly in the session, in the output contract's own field order.</p>
</div>
</div>

A good ask includes:

- The exact symptom as reported, in the reporter's words, not a paraphrase that already assumes a cause.
- The command, environment, or input that produced it, including anything already tried.
- For a performance regression, the measurement that moved, on what input and what machine.
- Whether a previous fix was applied to this same symptom, since a returning bug means the earlier cause was never the cause.

## A working example

The defect here sits in E1-F2, conflict resolution, inside epic E1, offline inspection sync, on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Two inspectors edited the same inspection record while disconnected. When both devices reconnected, one of the edits was gone. Story E1-F2-S1 states the requirement it violates directly: neither answer is silently dropped. You type:

<pre><code>Two inspectors edited the same QuenServe inspection while offline, and
reconciliation drops one of the edits. That is exactly what story
E1-F2-S1 says must never happen. Reproduce it before changing anything,
minimize the case, and test one hypothesis at a time.</code></pre>

Debug does not open the reconciler. It writes a script that seeds two offline edits to one record and runs the reconciliation, and it runs that script first. The script fails, and from that point every step reads the same instrument. Minimizing removes the photo attachment, the third device, and the second edited field one at a time. What remains is smaller than the original report: two edits to one record, delivered in a single sync batch.

The first hypothesis is written down before any measurement: the reconciler discards the later edit because its version counter is behind. Instrumenting the counter at the merge point shows both edits carrying distinct counters, so the hypothesis is refuted. That is a result, not a setback, and it removes a branch of the search.

The second hypothesis is written down the same way: the reconciler keys its merge map by record id alone, so a second edit for the same record replaces the first before either is compared. A counter on the map reports two edits in and one entry out. The cause can now be stated in one sentence.

The run's report, in the shape the skill's own output contract defines, filled with this scenario's values rather than a captured run:

<pre><code>symptom: an offline edit disappears after two inspectors reconnect (E1-F2)
reproduction:
  command: node scripts/repro-conflict-drop.mjs
  minimized: two edits to one record, arriving in a single sync batch
hypotheses:
  - claim: the later edit is discarded because its version counter is behind
    evidence: both edits distinct at the merge point (counters 4 and 5)
    verdict: refuted
  - claim: the merge map is keyed by record id, so the second edit replaces
           the first before the comparison runs
    evidence: map size 1 for a batch of 2 edits
    verdict: supported
cause: the merge map is keyed by record id alone, so a second edit for the
       same record overwrites the first before either reaches the conflict
       comparison
fix:
  change: src/sync/reconcile.ts:118
  measurement: "repro red before, green after; 2 of 2 edits reach the
                comparison, same batch, 20 runs"
regression_test: handed to tdd
open: the surfacing path for E1-F2-S2 was not exercised by this run
</code></pre>

The fix changes the map key, not the symptom. A guard that restored the missing edit after the fact would have left the overwrite in place and moved the failure to a later, less visible point. The trace entry records both hypotheses, including the refuted one, so a later session does not spend its first hour re-measuring version counters.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A diagnosis that holds</div>
<pre><code>node scripts/repro-conflict-drop.mjs   <span class="tok-comment"># red, before any edit</span>
<span class="tok-comment"># hypothesis 1 written, instrumented, refuted</span>
<span class="tok-comment"># hypothesis 2 written, instrumented, supported</span>
<span class="tok-comment"># one change: src/sync/reconcile.ts:118</span>
node scripts/repro-conflict-drop.mjs   <span class="tok-comment"># green, one change later</span></code></pre>
<div class="compare-card-note">The cause is one sentence, the reproduction ran on both sides of a single change, and <code>tdd</code> holds the regression test.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Code edited while the loop was still green</span>
<span class="tok-warn">Two changes made at once, symptom cleared, cause unknown</span>
<span class="tok-warn">A guard added so the dropped edit is restored downstream</span>
<span class="tok-warn">Bug closed as "cannot reproduce, works now"</span></code></pre>
<div class="compare-card-note">Each of these ends the search without a named cause. The skill's stop conditions treat the last one as an open bug, not a fixed one.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why is building the reproduction a gate rather than a first step?</summary>
<div class="qa-body">

Because everything after it reads that instrument. A change made while the loop is green cannot be evaluated: you have no signal that would tell you whether it helped, hurt, or did nothing. The skill states it as a rule rather than a preference — do not change code while the loop is green.

</div>
</details>

<details class="qa">
<summary>What happens when the bug will not reproduce at all?</summary>
<div class="qa-body">

The run stops after a bounded effort and reports what was tried, then names the missing input, environment, or log that would make the failure producible. It does not fix on speculation. A speculative fix on an unreproduced bug leaves you unable to tell a real fix from a coincidence.

</div>
</details>

<details class="qa">
<summary>Why only one hypothesis at a time, and why write it down first?</summary>
<div class="qa-body">

A hypothesis assembled after the evidence tends to fit whatever the evidence happened to be. Writing it first makes it refutable. "The cache serves an entry after its expiry" can be tested; "something is wrong with caching" cannot. When two hypotheses look equally likely, test the cheaper one first, and still only one at a time.

</div>
</details>

<details class="qa">
<summary>Why is changing two things at once treated as an error?</summary>
<div class="qa-body">

The result becomes unattributable. If the symptom clears, you cannot say which change cleared it, so you have a working system and no diagnosis. The unnecessary change also travels forward into the codebase, where nobody later can explain why it is there.

</div>
</details>

<details class="qa">
<summary>The symptom disappeared and I cannot say why. Is the bug closed?</summary>
<div class="qa-body">

No. The skill leaves it open. "It works now" records a change in behavior, not a diagnosis, and a bug closed on that basis is the same bug you will see again after the next refactor. Reporting it as open is the honest outcome, and it is a defined stop condition rather than a failure of the run.

</div>
</details>

<details class="qa">
<summary>How is a performance regression different from a functional bug here?</summary>
<div class="qa-body">

The instrument is a measurement rather than a pass or fail. Record the "before" number on the same input and the same machine, and repeat it enough times to see the spread. An "after" number with no matching "before" proves nothing, and a single run of a noisy benchmark is not a measurement.

</div>
</details>

<details class="qa">
<summary>Who writes the regression test?</summary>
<div class="qa-body">

`tdd` does, on handoff. The test must fail before the fix and pass after it, which is the only evidence that it is testing the cause rather than the surrounding code. Without that test, the next refactor can undo the fix silently, and the bug returns with no signal that anything changed.

</div>
</details>

<details class="qa">
<summary>What if the cause sits in code the team cannot change?</summary>
<div class="qa-body">

Record the cause and its evidence, report it to that component's owner, and note any workaround as a workaround. Labeling a workaround as a fix hides the fact that the defect is still there, which is what makes the same failure surprising the next time it appears.

</div>
</details>

## It's working if

- A command reproduces the failure on demand before any code changes, and the run can point to the red reading it started from.
- The reproduction that ends up in the trace is smaller than the one in the original report.
- Every hypothesis is written down before its measurement, and the refuted ones are recorded rather than discarded.
- The fix is one change, the cause is one sentence, and the measurement exists on both sides of it.
- A bug that lost its symptom without a named cause is reported open, not closed.

If a fix ships with no sentence naming what was wrong, the run produced a change in behavior rather than a diagnosis, and the bug should be expected back.

## Where it fits

**Debug is the diagnosis lane: the skill that converts an unexplained failure into a named cause with evidence behind it.**

Its nearest neighbor is `tdd`, and the two run in sequence rather than in competition. `tdd` writes a failing test when the behavior is already understood; debug is what runs when the failure itself is the unknown, and it hands the finished diagnosis back to `tdd` for the regression test. `recon` comes before debug when the failing code sits in an estate nobody on the run knows, and `grit` carries the diagnosis as evidence against the gate the bug blocks. When the fix would require a design change wider than the defect, the decision goes to `architect` before anything is written.

If none of this settles which skill fits, `ask-fde` routes you.
