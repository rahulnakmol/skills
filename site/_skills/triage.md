---
layout: skill
name: triage
title: "Triage — One Label at a Time, and a Decision Left to a Person"
description: "Triage sorts an incoming report into the repository's own label vocabulary, reproduces what it claims, and briefs it so a human can decide what the project accepts."
group: developer
invocation: user-invoked
scenario: "Sorting the unlabeled reports QuenServe's field inspectors file against E1-F3, sync status visibility, before a maintainer decides what the project accepts"
lens:
  novice:
    who: 'You have opened an issue list and found dozens of reports with no labels, no order, and no way to tell which ones are real.'
    value: 'Triage gives each report exactly one state, drawn from the label set the repository already publishes, so the list becomes a queue instead of a pile.'
  practitioner:
    who: 'Reports are arriving faster than anyone categorizes them, and several of them look like the same defect described three different ways.'
    value: 'You get one role label per issue, a duplicate search done before implementation rather than after it, a reproduction run against the version the reporter named, and a brief written onto the issue.'
  leader:
    who: 'You want the preparation for an accept-and-prioritize pass to stop being manual, without the acceptance decision moving away from a person.'
    value: 'The run prepares the decision and stops. It never applies a terminal label on its own judgment, and it holds no permission to change code.'
  csuite:
    who: 'You need confidence that what reached the team&rsquo;s queue was checked rather than assumed.'
    value: 'Every pass records the state before and after, the reproduction command and its result, the questions still open, and the person who named the outcome.'
---

## What it does

Triage is the user-invoked pass over incoming reports and external pull requests. It moves each one through the repository's triage states and prepares the accept-or-decline decision a human makes. An issue carries exactly one role label at a time, so the label set behaves as a state machine rather than as a set of tags.

The label vocabulary is read from the repository's configuration, never invented. It is the same vocabulary `raise` publishes with, so a repository keeps one label set and two skills never maintain two sets that drift apart. A run that finds no vocabulary stops and asks a maintainer to define it once, in the file both skills read.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the vocabulary</span><span class="step-text">The state names, their order, and which states are terminal, taken from the repository's configuration. Nothing is invented, and nothing is assumed from another project's conventions.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Read the report</span><span class="step-text">In full: linked threads, the release or commit the reporter names, and any open issue it resembles. A duplicate found here costs one search; found after implementation it costs a pull request.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Establish the state</span><span class="step-text">One role label, and only one. If an issue carries two, reduce it to one and record which label was removed and why. A state machine with two current states cannot be queried.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Categorize</span><span class="step-text">Defect, feature request, question, documentation gap, or security. This is a claim about what the report is, not about whether the project wants it.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Reproduce</span><span class="step-text">Before any state that claims verification. Run the reporter's steps against the version they named, and record the command, its exit status, and the output actually observed.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Brief and stop</span><span class="step-text">Write the agent-ready brief onto the issue, advance by at most one state, state the recommendation, and stop. A person names the outcome.</span></div>
</div>

<ul class="benefits">
  <li>The label vocabulary is read from configuration and shared with <code>raise</code>, so the skill that publishes an issue and the skill that sorts it cannot drift onto two different label sets.</li>
  <li>One role label at a time keeps the tracker queryable. "Show me everything awaiting reproduction" returns an answer rather than an overlap.</li>
  <li>Nothing reaches a verified state on a reading alone. The reproduction command, its exit status, and its observed output are recorded first.</li>
  <li>The brief is written onto the issue in the section names <code>slice</code> already uses, so whoever picks it up next &mdash; a person or an agent &mdash; acts without re-reading the thread.</li>
  <li>A thin report is questioned rather than promoted on assumption, and it stays at its current state while a question is open.</li>
  <li>Terminal labels &mdash; declined, duplicate, will-not-fix &mdash; are never applied on the skill's own judgment.</li>
</ul>

Triage holds two verbs: `read` and `write-tracker`. It does not hold `write-repo`, so it never changes code. That boundary has a stop condition attached to it. When a fix looks obvious and small, the run still stops, because the change belongs to `sdlc` or `tdd` and the temptation to make a one-line edit is exactly where a triage pass turns into an unreviewed commit.

- [`core/GRILL.md`](https://github.com/tqnonline/skills/blob/main/skills/core/GRILL.md) covers the short themed round of questions a thin report gets before it is promoted anywhere.
- [`slice/WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) covers the section names the agent-ready brief uses, so every pickup reads the same shape.
- [`raise`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/SKILL.md) covers publishing issues with the label vocabulary this skill reads &mdash; one set, shared between them.
- [`shakedown`](https://github.com/tqnonline/skills/blob/main/skills/developer/shakedown/SKILL.md) covers building and testing an external pull request in isolation, when triage needs more than a read.
- [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the trace entry each pass appends when it finishes.

## When to reach for it

Type `/triage` in Claude Code, or name the skill directly in a session. Triage is user-invoked, so nothing reaches for it on its own. A person decides that the incoming queue has to be sorted before anyone commits to working from it.

You reach for triage in five moments. A new issue or an external pull request arrives carrying no role label. Reports have accumulated faster than anyone has categorized them. A report is thin — one sentence, a screenshot, no version — and cannot be acted on as written. A maintainer is about to run an accept-and-prioritize pass and wants each candidate briefed first. Or an issue already sitting at a verification state is due for its reproduction attempt.

Triage is not the only skill that touches an incoming report. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The report is thin and needs a round of questions before anything else | [`grill`]({{ '/grill/' | relative_url }}) |
| The report is accepted and has to become a contract-complete work item | [`slice`]({{ '/slice/' | relative_url }}) |
| The work item is ready to leave the document and become a labeled issue | [`raise`]({{ '/raise/' | relative_url }}) |
| The incoming thing is an external pull request that has to be built and tested | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| The defect is confirmed and the cause now has to be found | [`debug`]({{ '/debug/' | relative_url }}) |
| The fix is agreed and has to be built behind a failing test | [`tdd`]({{ '/tdd/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same triage skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want triage can skip the rest of the catalog with `./scripts/link-skills.sh --skill triage`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command &mdash; user-invoked</span></div>
<div class="tool-group-body">
<p>Triage is user-invoked: type <code>/triage</code>, or name it directly in a session. It calls the Skill tool with <code>shakedown</code> when an external pull request needs a build rather than a read, and it follows <code>core/GRILL.md</code> when a report is too thin to categorize.</p>
<div class="prompt-card">Triage the unlabeled reports filed against E1-F3, sync status visibility, on QuenServe. Read the label vocabulary from the repository configuration, reproduce anything claiming to be a defect, write the brief onto each issue, and stop before deciding what we accept.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code returns one state per issue, the reproduction evidence behind each promotion, and a recommendation. It waits for a person to name the outcome.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode's installed command layer wraps the developer group's pipeline tools; no command wraps triage. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route the catalog readers use, and applies the triage procedure when a request names an unsorted queue rather than a defect to fix.</p>
<div class="prompt-card">Read skills/developer/triage/SKILL.md, then work the unlabeled E1-F3 reports on QuenServe one at a time. Read the label vocabulary from configuration, never invent a label, reproduce before promoting, and leave the accept call to me.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode states the per-issue result directly in its reply, since no command wraps the triage output.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply triage's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees triage's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Apply skills/developer/triage/SKILL.md to the E1-F3 sync status reports on QuenServe. One role label per issue, categorize each one, record the reproduction command and what it actually printed, and write the brief as a tracker comment. Do not touch the code.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three present the per-issue result in the session and wait, since none has a workflow output to parse.</p>
</div>
</div>

A good ask includes:

- Where the label vocabulary lives, if the repository keeps it somewhere other than the default configuration file.
- The version or release the reports are filed against, and how to run the product at that version.
- Which reports are in scope for this pass — one feature's queue, or everything unlabeled.
- Who makes the acceptance call, so the recommendation is addressed to a named person rather than left open.

## A working example

The queue here belongs to E1-F3, sync status visibility, one of the three features inside epic E1 on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Field inspectors have filed nine reports saying the sync indicator is wrong or confusing. They arrived unsorted. Some are the same report written three ways, some are real defects, and at least one is a feature request wearing a defect's clothes. You type:

<pre><code>Triage the unlabeled reports filed against E1-F3, sync status
visibility, on QuenServe. Read the label vocabulary from the
repository configuration, reproduce anything claiming to be a
defect, write the brief onto each issue, and stop before
deciding what we accept.</code></pre>

The first thing the run reads is the vocabulary. It is not a list this skill carries, and it is not a list this skill invents. It is the set the repository configures and `raise` already publishes with:

<pre><code>triage states, read from the repository's configuration:
  raised &rarr; triaged &rarr; reproduced &rarr; accepted
  terminal (human decision only): declined, duplicate, will-not-fix
  applied by raise on create: raised</code></pre>

Nine reports go through the pass one at a time. Each leaves it carrying exactly one role label:

<pre><code>4  the same "badge says Synced while items are queued" defect,
   filed by four inspectors      &rarr; 1 kept, 3 recommended duplicate
2  distinct defects, both reproduced          &rarr; reproduced
1  "show sync health for my whole region"     &rarr; feature request,
   E1-F3-S2 territory, triaged, not reproduced
1  question about airplane mode               &rarr; answered, no state change
1  screenshot, no version, no steps           &rarr; grilled, left as raised</code></pre>

Take the kept defect. The reporter named version 4.2.1 and the E1-F3-S1 screen, the one where an inspector sees which of today's inspections have not yet reached the server. Reproduction runs before the state moves:

<pre><code>version:  4.2.1, as named by the reporter
command:  npm test -- sync-status.spec.ts
observed: exit=1 &mdash; badge renders "Synced" while the queue
          still holds 3 unsent inspections</code></pre>

The brief goes onto the issue as a comment, in the section names `slice/WORK-ITEM-CONTRACT.md` defines: what happens, what should happen instead, the reproduction command and its result, the file paths where the behavior appears to live, and what remains unknown. Then the pass records itself in the shape the skill's own output contract requires:

<pre><code>issue: quenserve#3312
category: defect
state:
  before: raised
  after: reproduced
reproduction:
  attempted: true
  command: "npm test -- sync-status.spec.ts"
  observed: "exit=1, badge 'Synced' with 3 inspections still queued"
brief: quenserve#3312 comment 1
open_questions:
  - whether the badge is also wrong after a partial sync
recommendation: accept
decided_by: pending</code></pre>

`decided_by: pending` is the point of the whole pass. The run advanced one state, on evidence, and stopped. It did not mark the three lookalike reports duplicate, because duplicate is terminal and terminal is a human call. It also did not fix anything. The badge defect looked like a one-line change in the status feed, and the run said so in the brief and left the code alone, naming `sdlc` as the skill that takes it from there. Once a maintainer accepts, `slice` turns the accepted report into a contract-complete work item and `raise` publishes it with the same labels this pass read.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A pass that prepares a decision</div>
<pre><code>state: raised &rarr; reproduced   <span class="tok-comment"># one step, on evidence</span>

<span class="tok-comment"># the label came from configuration, not from habit</span>
<span class="tok-comment"># the command and its exit status are recorded</span>
<span class="tok-comment"># the brief reads without the thread</span>
<span class="tok-comment"># recommendation: accept &mdash; decided_by: pending</span></code></pre>
<div class="compare-card-note">The skill prepares the accept-or-decline call and hands it over. A human names the outcome, and the skill then records it and updates the label.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">A label invented because it sounded right</span>
<span class="tok-warn">Two role labels left on one issue</span>
<span class="tok-warn">Promoted to a verified state, never run</span>
<span class="tok-warn">Closed as duplicate on the skill's judgment</span>
<span class="tok-warn">A one-line fix committed during triage</span></code></pre>
<div class="compare-card-note">Each of these is a stop condition, not a judgment call. The last one matters most: triage holds <code>write-tracker</code> and not <code>write-repo</code>, so the fix belongs to <code>sdlc</code> or <code>tdd</code>.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why read the label vocabulary instead of applying a standard set?</summary>
<div class="qa-body">

Because a standard set would be a second set. `raise` already publishes issues with labels drawn from the repository's configuration. If triage carried its own list, a project would end up with two vocabularies that agree until the day someone edits one of them. Reading the same configuration keeps one label set in one place. It also means the skill works on a repository whose states are named something else entirely, without a translation table nobody maintains.

</div>
</details>

<details class="qa">
<summary>What does "exactly one role label at a time" actually buy?</summary>
<div class="qa-body">

A queryable tracker. The role labels are states in a machine, not tags on a photo. If an issue is both awaiting reproduction and reproduced, then no filter returns a true answer, and the count on a board becomes a guess. When a pass finds two role labels on one issue, it reduces them to one and records in the trace which label it removed and why, so the correction is visible rather than silent.

</div>
</details>

<details class="qa">
<summary>What happens when a report does not reproduce?</summary>
<div class="qa-body">

The state stays where it is. A report that does not reproduce is not thereby false — the reporter may be on a different build, a different device, or a network condition the test environment does not have. The run records the attempt, names the environment difference it can see, and asks the reporter for the missing fact. Advancing the issue anyway would put a claim on the board that nobody checked.

</div>
</details>

<details class="qa">
<summary>Why write a brief when the whole thread is right there?</summary>
<div class="qa-body">

Because the next reader may be an agent, and because a person picking the issue up in three weeks should not have to reconstruct it. The brief states what happens, what should happen instead, the reproduction command and its result, the file paths where the behavior appears to live, and what remains unknown. It uses the section names from `slice/WORK-ITEM-CONTRACT.md`, so every pickup reads the same shape rather than a different summary each time.

</div>
</details>

<details class="qa">
<summary>The fix is one line. Why not just make it?</summary>
<div class="qa-body">

Because triage holds `write-tracker` and not `write-repo`. The skill cannot change code, and that is deliberate rather than an oversight. A one-line fix during triage arrives with no failing test, no review, and no work item behind it. The stop condition routes it instead: `tdd` when the change should start from a failing test, `sdlc` when it should run through the gated build loop. The brief carries the file paths, so neither skill starts from nothing.

</div>
</details>

<details class="qa">
<summary>Who decides what the project accepts?</summary>
<div class="qa-body">

A person, every time. The skill categorizes, reproduces, briefs, and recommends. It never applies a terminal label — declined, duplicate, will-not-fix — on its own judgment. Categorization is a claim about what a report is; acceptance is a claim about what the project wants, and the second one depends on roadmap, capacity, and commitments the repository does not contain. Once a human names the outcome, the skill records it and updates the label.

</div>
</details>

<details class="qa">
<summary>What if a public issue describes a security vulnerability?</summary>
<div class="qa-body">

The run stops and follows the repository's disclosure policy instead of continuing in the thread. Discussing the details of a live vulnerability in a public issue widens the exposure while the fix does not yet exist. Security is one of the five categories the skill assigns, and assigning it is where the ordinary procedure ends.

</div>
</details>

<details class="qa">
<summary>What if the repository publishes no triage vocabulary at all?</summary>
<div class="qa-body">

The run stops and asks a maintainer to define it once, in the configuration this skill and `raise` both read. Inventing a plausible set would work for one pass and then diverge from whatever the project settles on later. Defining it once is a small task, and it is the task that makes every later pass repeatable.

</div>
</details>

## It's working if

- Every issue the pass touched carries exactly one role label, and that label exists in the repository's configuration.
- No issue reached a state claiming verification without a recorded command, exit status, and observed output behind it.
- Someone can pick up a briefed issue and start work without reading the original thread.
- No terminal label was applied by the skill, and no file outside the tracker changed.
- The trace shows the state before and after, the evidence, the open questions, and the person who made the call.

If a queue comes back fully labeled and nobody can say which reports were actually run, the pass sorted the list without checking it, and the labels are a claim rather than a finding.

## Where it fits

**Triage is the developer group's intake gate: it sorts incoming reports into the repository's own states, proves what it promotes, and hands a prepared decision to a person.**

Its nearest neighbor is `raise`, which publishes issues using the same label vocabulary triage reads, so the two skills share one set rather than maintaining two. `grill` supplies the questioning round a thin report gets first. `shakedown` takes over when the incoming item is an external pull request that has to be built and tested rather than read. Once a human accepts a report, `slice` turns it into a contract-complete work item, and `debug`, `tdd`, and `sdlc` do the work triage is not permitted to do itself.

If none of this settles which skill fits, `ask-fde` routes you.
