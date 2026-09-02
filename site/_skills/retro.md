---
layout: skill
name: retro
title: "Retro: Improve the Skills from the Run Record"
description: "Retro is the user-invoked improvement loop: it reads accumulated run traces, names the failures that repeat across three or more runs, and proposes skill edits a person approves."
group: core
invocation: user-invoked
scenario: "Reading eleven runs of accumulated trace across QuenServe epic E1, where work on E1-F1 and E1-F2 kept rediscovering the same missing precondition by hand"
lens:
  novice:
    who: 'You have made the same correction to an agent more than once and wondered where that fix was supposed to live. Retro reads the record past runs left behind and proposes writing the fix into the instructions themselves.'
    value: 'You stop repairing the same thing by hand. A change to a skill arrives as a pull request with the runs that motivated it attached, so you can see the reason before you agree to it.'
  practitioner:
    who: 'You run agents across a stream of work every week, and you own the skill files those agents read.'
    value: 'A counting rule separates a repeated failure from one-off noise, and a second rule separates a skill defect from an execution defect, so you edit the instructions only when the instructions were wrong.'
  leader:
    who: 'You own how a team works with its agents, and the shared instructions the whole team depends on.'
    value: 'Improvement arrives as a reviewable pull request with citations, rather than as knowledge held by whoever happened to notice the problem first.'
  csuite:
    who: 'You are accountable for a system that writes proposals about its own operating instructions.'
    value: 'The loop proposes and a named person approves. Nothing the system writes about itself reaches the shared instructions without a human signature on the record.'
---

## What it does

Retro reads what past runs wrote down, finds the failures that keep repeating, and proposes the change to the skills themselves.

Every skill built on this spine appends a trace entry while it works: what it was given, what it decided, what evidence it observed, and what it left open. A trace sits beside the gate ledger it accompanies, at `.grit/<scope>/TRACE.md`, and a solo task keeps its trace at the repository root. Those entries accumulate across sessions, and usually nobody reads them together. Retro is the pass that does. It works over a range of runs rather than one session, and its output is a proposed edit to the skill files, not a fix to the work in front of you.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Collect the traces</span><span class="step-text">Every entry in the range, not a sample — a sample selects for what was memorable.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Extract the failures</span><span class="step-text">From each entry's DECIDED, EVIDENCE, and OPEN fields, keeping the timestamp as the citation.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Count repetitions</span><span class="step-text">One occurrence is an anecdote. A pattern in three or more runs is a finding, and only a finding earns a proposal.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Classify each finding</span><span class="step-text">A skill defect means the instructions were wrong. An execution defect means they were right and were not followed.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Propose, deletion included</span><span class="step-text">Each change sits next to the entries that evidence it. Removing an unused rule counts as a proposal.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Open a pull request and stop</span><span class="step-text">A person reads every proposed change and approves it. The loop never merges its own improvements.</span></div>
</div>

<ul class="benefits">
  <li>The correction you keep making by hand stops living in your head and starts living in the skill, or it is shown to be an execution problem instead.</li>
  <li>A proposed change arrives with its evidence attached — the entries that motivated it, named by timestamp and by the skill that wrote them — so a reviewer reads the record rather than trusting a summary.</li>
  <li>The skills stay short. Only a failure repeated across three or more runs earns a rule, because a skill that grows a rule for every one-off failure gets long, and a long skill is read less carefully.</li>
  <li>Deletion is on the table. A rule no trace shows anyone using is a candidate for removal, on the same footing as an addition.</li>
  <li>Nothing merges without a person. The system proposes changes to its own instructions and a human signs off, so the gate stays where a gate belongs.</li>
</ul>

The counting rule is the part most often skipped, and it is the part that keeps the practice honest. A single failure is an anecdote: retro records it in the trace and changes nothing. The threshold is not caution for its own sake. Every rule added to a skill is read on every future invocation, and the cost of a rule nobody needed is paid by every run afterward.

The classification rule matters for the same reason. A skill defect and an execution defect look alike in a transcript and take opposite repairs. When the instructions were wrong, missing, or ambiguous, the fix belongs in the skill text. When the instructions were right and were not followed, the fix belongs in the run — routing, the context supplied, or a stop condition that fires earlier. Treating an execution defect as a skill defect is how a skill accumulates rules nobody needed.

Retro reads four documents in the same group rather than restating them:

- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the entry retro reads, the five fields it mines, and where a trace lives.
- [`grit`]({{ '/grit/' | relative_url }}) owns the gate ledger in the same scope directory; unmet and abandoned gates are evidence a retro reads next to the trace.
- [`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md) is read against the proposed diff before the pull request opens.
- [`GRILL.md`](https://github.com/tqnonline/skills/blob/main/skills/core/GRILL.md) is the interrogation a proposed change faces when a reviewer asks what it is worth.

## When to reach for it

Type `/retro` in Claude Code, or name the skill directly in a session. Retro is user-invoked, so nothing reaches for it on its own: a person decides that enough runs have accumulated to be worth reading together.

SKILL.md names five moments. Several runs have left trace entries in a scope and nobody has read them together. The same correction keeps being made by hand across sessions. A skill produced work that had to be redone, and the reason should be known before the next run. A milestone or a release closes, and the harness should be revised before the next one starts. Somebody asks for a retrospective, or asks which instructions are earning their tokens.

Retro is not the only skill that looks backward at finished work. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need to decide what done means for one piece of work before it starts, rather than what to change after it | [`grit`]({{ '/grit/' | relative_url }}) |
| You need one finished change reviewed in isolation before it merges, rather than a pattern read across many runs | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You need the cause of a single failure found and fixed now, in the work itself | [`debug`]({{ '/debug/' | relative_url }}) |
| You need a proposed change interrogated before a reviewer sees it | [`grill`]({{ '/grill/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same retro skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want retro can skip the rest of the catalog with `./scripts/link-skills.sh --skill retro`, which links just this skill into the default buckets without pulling in the rest of core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command, no stop hook</span></div>
<div class="tool-group-body">
<p>Retro is user-invoked: type <code>/retro</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own, and it does not need one. Its stop condition is the pull request: the run ends with proposed edits open and unmerged, and a person decides what happens next.</p>
<div class="prompt-card">Read every trace entry in the scope directories for QuenServe epic E1, including the runs on E1-F1 and E1-F2. Eleven runs have accumulated and nobody has read them together. I keep making the same correction by hand. Only name a finding you can show in three or more runs, classify each one as a skill defect or an execution defect, and open a pull request with the evidence table. Do not merge anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Retro returns the range it read, each finding with its occurrence count and classification, the anecdotes it recorded but did not act on, and a branch holding the proposed edits.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Catalog reader, no command file</span></div>
<div class="tool-group-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>retro</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>retro</code>. It applies the procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/core/retro/SKILL.md and skills/core/TRACE.md, then run a retro over the trace entries for QuenServe epic E1. Report the range, the findings with occurrence counts, and the anecdotes separately. Stop before opening any pull request and show me the proposed edits first.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode reports the findings and the proposed edits in its reply, reading the procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply retro as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, which carries every skill's name and description. Cursor keeps a team's own rules in <code>.cursor/rules/</code>; GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<p>None of the three gets a continuous-integration backstop specific to retro the way <code>grit-gates.yml</code> backstops <code>grit</code>. The human gate here is the pull request review itself, which is enforced by the repository's branch rules rather than by anything this skill ships.</p>
<div class="prompt-card">Run the retro procedure in skills/core/retro/SKILL.md across the QuenServe epic E1 traces. Count occurrences before naming anything a finding, keep single failures as recorded anecdotes, and say plainly for each finding whether the instructions were wrong or were simply not followed. Propose the edits and leave them for me to approve.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three produce the findings table and the proposed edits directly in their reply, since none has a command's output to parse.</p>
</div>
</div>

A good ask includes:

- The scope to read, given as the directories holding the traces, and the range of runs you want covered.
- Whether you want the pull request opened, or the proposed edits shown to you first.
- Any correction you already know you keep making by hand, so retro can check whether the record supports it.
- What you consider out of bounds to change, if part of the skill set is frozen for another reason.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}) across epic E1, after several stories have shipped. Eleven runs have appended trace entries in three scope directories covering work on E1-F1 and E1-F2. The same correction kept being made by hand. You type:

<pre><code>Read every trace entry in the scope directories for QuenServe epic E1, including the runs on E1-F1 and E1-F2. Eleven runs have accumulated and nobody has read them together. I keep making the same correction by hand. Only name a finding you can show in three or more runs, classify each one as a skill defect or an execution defect, and open a pull request with the evidence table. Do not merge anything.</code></pre>

Retro reads all eleven entries rather than the ones that stand out, and finds four that share a shape. Two of them, abridged to the fields that carried the pattern:

<pre><code># Trace: e1-f1-s1-offline-sync

## 2026-08-21T10:05Z &middot; tdd &middot; red-green
INPUT: story E1-F1-S1, acceptance criterion 2
DECIDED: seed the offline queue in the fixture before measuring sync fidelity
<span class="tok-warn">EVIDENCE: verify-sync-fidelity.mjs green on an empty queue (exit=0), proving nothing;
  red once the queue held three completed inspections</span>
OPEN: the seeding step is nowhere in the ledger, only in this entry

# Trace: e1-f2-s1-conflict-merge

## 2026-08-26T14:31Z &middot; tdd &middot; red-green
INPUT: story E1-F2-S1, acceptance criterion 1
DECIDED: seed both devices' queues before exercising the conflict merge
<span class="tok-warn">EVIDENCE: verify-conflict-merge.mjs green with no queued edits (exit=0);
  red once each device held an edit to the same inspection</span>
OPEN: same precondition rediscovered here, still written down nowhere</code></pre>

Four entries across E1-F1 and E1-F2 show a check that passed against a fixture holding nothing. That clears the threshold, so it becomes a finding rather than an anecdote. Retro then splits it, because two different defects produced the same symptom.

The first is a skill defect. A runnable gate in `LEDGER.md` pairs a CHECK with an EXPECT, and there is no place in that shape to state the state the check assumes. Each story's ledger therefore recorded the command and left the seeding step in the run's head, where the next run could not find it. The proposal is one line in `LEDGER.md`: a runnable gate names the precondition its check depends on, next to CHECK and EXPECT.

The second is an execution defect, and the repair is the opposite one. `LEDGER.md` already says to test a check against a version you know is wrong and confirm EXPECT does not match. That instruction is present, and it is correct. Three of the four runs skipped it. Adding a second rule saying the same thing would lengthen the document and change nothing, so retro proposes an earlier stop condition instead: approval of a CHECK is refused until a control run against a known-wrong artifact is recorded.

The output contract retro writes, shown as the document the run produces:

<pre><code>scope: .grit/e1-f1-s1-offline-sync, .grit/e1-f1-s2-offline-media, .grit/e1-f2-s1-conflict-merge
range: 2026-08-19T09:12Z .. 2026-08-29T16:40Z
runs_read: 11
findings:
  - pattern: a runnable gate passed against a fixture that held nothing
    occurrences: 4
    entries: [2026-08-21T10:05Z &middot; tdd, 2026-08-23T11:48Z &middot; tdd,
              2026-08-26T14:31Z &middot; tdd, 2026-08-28T09:02Z &middot; grit]
    defect: skill
    proposal: a runnable gate names the precondition its check depends on
    target: skills/core/grit/LEDGER.md
  - pattern: the known-wrong control run was skipped before a check was trusted
    occurrences: 3
    entries: [2026-08-21T10:05Z &middot; tdd, 2026-08-26T14:31Z &middot; tdd,
              2026-08-28T09:02Z &middot; grit]
    defect: execution
    proposal: refuse CHECK approval until a control run is recorded; no new rule in the skill body
    target: the approval step, not the skill text
anecdotes:
  - 2026-08-27T16:10Z &middot; a sync-status check timed out once on E1-F3, and never again
pull_request: retro/e1-precondition-findings
<span class="tok-warn">approval: pending human review</span>
open: whether the rule flagged for deletion is also unused outside this epic</code></pre>

Retro also flagged one instruction for removal, because no entry in the eleven-run range shows any run reading it. The reviewer declined that proposal: eleven runs of one epic is not enough evidence that a rule goes unused everywhere else. Deletion stayed a legitimate proposal, and the person reading it decided otherwise. That exchange is the loop working, not failing.

The run stops at the open pull request. It does not merge. A person reads each proposed edit against the entries cited beside it, approves the first finding, sends the second back for a narrower stop condition, and rejects the deletion. Retro then appends its own trace entry recording the range, the findings, the anecdotes, the pull request, and what stayed unresolved.

## What good looks like

The same discipline applies whether a retro finds three changes or none.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good retro ends like this</div>
<pre><code>Every proposal carries a count, a classification, and the entries
that evidence it. Nothing merges inside the run.

<span class="tok-ok">finding 1</span> &mdash; occurrences: 4 &middot; defect: skill
  entries: 2026-08-21T10:05Z, 2026-08-23T11:48Z,
           2026-08-26T14:31Z, 2026-08-28T09:02Z
  <span class="tok-ok">proposal: one line in LEDGER.md, cited to the four entries</span>
<span class="tok-ok">finding 2</span> &mdash; occurrences: 3 &middot; defect: execution
  <span class="tok-ok">proposal: an earlier stop condition, not a new rule</span>
<span class="tok-ok">anecdote</span> &mdash; one timeout on E1-F3, recorded, not acted on
<span class="tok-ok">approval: pending human review</span></code></pre>
<div class="compare-card-note">The count justifies the change, the classification decides where the repair goes, and the person who approves it can check both.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>One failure, seen once, turned straight into a rule and merged by
the run that proposed it:

<span class="tok-warn">finding</span> &mdash; occurrences: 1 &middot; defect: (not classified)
  <span class="tok-warn">proposal: add a rule to LEDGER.md about queue seeding</span>
  <span class="tok-warn">merged: yes, by this run</span>
<span class="tok-comment">The skill is now longer and nobody approved it.</span></code></pre>
<div class="compare-card-note">Two failures at once. A single occurrence is an anecdote, and a loop that accepts its own rules has no gate left. Record the anecdote, and leave the pull request open.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why three runs, and not two?</summary>
<div class="qa-body">

The threshold is a cost control, not a statistical claim. Every rule a skill carries is loaded on every future invocation and read by every future run. A rule added for a failure that happened once is paid for by every run afterward, whether or not the failure ever recurs. Three occurrences is the point this repository picked as the evidence a rule has to clear before it earns that permanent cost. Below it, retro records the anecdote and leaves the skills untouched.

</div>
</details>

<details class="qa">
<summary>What if there are fewer than three runs of trace in the scope?</summary>
<div class="qa-body">

SKILL.md makes this a stop condition rather than a judgment call: report the anecdotes and stop. There is not enough evidence to change a skill. This is the common case early in a piece of work, and it is not a failed retro. The entries are read, the single failures are named, and the skills stay as they are until the record says otherwise.

</div>
</details>

<details class="qa">
<summary>How do I tell a skill defect from an execution defect?</summary>
<div class="qa-body">

Read the instruction that should have prevented the failure, and ask whether it exists and says the right thing. If it is missing, wrong, or ambiguous, the defect is in the skill and the fix belongs in the text. If it is present and correct and the run did not follow it, the defect is in execution, and the fix belongs in routing, in the context the run was given, or in a stop condition that fires earlier. The worked example above shows one symptom that produced one of each.

</div>
</details>

<details class="qa">
<summary>Can retro merge its own pull request?</summary>
<div class="qa-body">

No. This is the one boundary the skill states most plainly: the loop proposes and a person signs off, because a system that both writes and accepts its own rules has no gate left. A proposed change with no human approval stays open and unmerged for as long as that takes. Retro's stop conditions treat an unapproved change as a normal end state, not as an obstacle to route around.

</div>
</details>

<details class="qa">
<summary>Does retro ever propose removing a rule?</summary>
<div class="qa-body">

Yes, and the skill puts removal on the same footing as addition. A rule that no trace in the range shows any run consulting is a candidate for deletion. The reviewer still decides, and the honest limit is worth stating: a range covering one epic shows what those runs read, not what every run everywhere reads. A deletion proposal is strongest when the range is wide.

</div>
</details>

<details class="qa">
<summary>What if the traces are missing for part of the range?</summary>
<div class="qa-body">

Retro says so plainly and does not reconstruct the missing history from the diff. TRACE.md gives the reason directly: a diff shows what changed and never shows what was tried and abandoned. A gap in the record is reported as a gap. It is not filled in with an inference that would then be cited as evidence for a change to a skill.

</div>
</details>

## It's working if

- The same correction stops appearing by hand in run after run, because it now lives in a skill or in an earlier stop condition.
- Every proposed change to a skill arrives with an occurrence count and the trace entries that evidence it, named by timestamp and by the skill that wrote them.
- Single failures show up in the retro output as recorded anecdotes, and no rule was added for any of them.
- Skill files get shorter about as often as they get longer, because deletion is proposed and sometimes accepted.
- Every merged improvement has a named human approval on the pull request, and no retro run has merged its own work.

If the skills are growing steadily and every proposal is an addition, the counting rule has stopped being applied even though the loop keeps running.

## Where it fits

**Retro is the layer that improves the harness itself, and it runs after the work, not inside it.**

The trace is the fifth layer of this agent harness and retro is the sixth. `grit` decides what done means for one piece of work and proves it. `TRACE.md` records how each run reached that verdict. Retro reads a range of those records together and asks a different question: not whether this work is done, but whether the instructions that produced it should change. `shakedown` reviews one finished change before it merges; retro reviews many finished runs after they have.

The proposed edits face the same scrutiny as any other artifact in this repository. `VERIFICATION.md` is read against the diff before the pull request opens, and `GRILL.md` is the interrogation a proposed change faces when a reviewer asks what it is worth.

Retro sits on neither published journey, which is deliberate. Both journeys end with delivered work. Retro starts where they finish, from the record they left behind. If none of this settles which skill fits, `ask-fde` routes you.
