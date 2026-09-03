---
layout: skill
name: handoff
title: "Handoff: Where the Next Session Starts"
description: "Handoff projects a run's trace and gate ledger into one document a reader with no context can pick up: the goal, the evidence, the settled decisions, and the approaches already ruled out."
group: productivity
invocation: user-invoked
scenario: "Handing off QuenServe story E1-F1-S1 when the session runs out of room before the work is finished"
lens:
  novice:
    who: 'Your session ended with the work half done, and picking it up again means explaining the whole thing from the start.'
    value: 'Handoff writes down where the work actually stands, in language that makes sense to someone who was not there — including the approaches that already failed, so nobody pays for them twice.'
  practitioner:
    who: 'You run long agent sessions and reach the context limit before the story is finished.'
    value: 'The document is assembled from the record the run wrote while it worked, so the next session inherits cited evidence and settled decisions instead of a summary that may or may not be accurate.'
  leader:
    who: 'Work on your team moves between agents, between people, and back again, and the reasoning leaks at every pass.'
    value: 'Every pass carries the same six parts: goal, state, decisions, abandoned approaches, open items, and the exact files and commands. A resumed run stops re-deriving what the last one established.'
  csuite:
    who: 'You pay for agent time, and some of it goes to rediscovering what an earlier run already found out.'
    value: 'A failed approach leaves no mark in a diff, so it gets retried. Recording it turns a repeating cost into a one-time one and leaves a trail of how each decision was reached.'
---

## What it does

Handoff compacts a run that is not finished into a document another agent or another person can pick up cold. It is user-invoked, because only a person knows the session is ending before the work is.

What matters most is what the document is made of. A handoff is a projection of the run trace, not a summary written from memory. Handoff reads the trace at `.grit/<scope>/TRACE.md` first, then the gate ledger beside it in the same scope directory, and assembles the document from what was recorded while the work was happening. SKILL.md gives the reason in one line: "A summary written from memory at the end of a run captures what the agent remembers, which is the exact failure the trace exists to prevent."

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the record</span><span class="step-text">The trace first, then the gate ledger beside it in the same scope directory. Neither is reconstructed from the conversation.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">State the goal</span><span class="step-text">One sentence, taken from the ledger. The ledger was written before implementation began, so it already says what done means here.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Report the current state</span><span class="step-text">Which gates are met and which are not, each with the evidence the trace recorded: a command and its exit status, or a file and a line.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Carry the decisions</span><span class="step-text">Every DECIDED line, each with the reason it carried, so the next session does not reopen ground the first one settled.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Record what was abandoned</span><span class="step-text">Each approach that was tried and dropped, and what ruled it out. This is the part of the document nothing else can supply.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Order what is open</span><span class="step-text">The last entry's OPEN field plus every unmet gate, sorted so the next action comes first.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Name files and commands</span><span class="step-text">Repository-relative paths, and each command with the arguments it was actually run with. A reader who has to guess a path has not been handed the work.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Strip the session</span><span class="step-text">Remove "as discussed", drop references to earlier turns, and expand any name coined mid-session into what it denotes.</span></div>
</div>

<ul class="benefits">
  <li>The next session inherits cited evidence instead of a claim, because each state line carries the command and exit status, or the file and line, that the trace recorded at the time.</li>
  <li>A settled decision stays settled, because it is carried forward with the reason it carried. A decision moved without its reason gets reopened, and the run loses the ground it gained.</li>
  <li>An approach that was tried and abandoned is stated outright. It leaves no mark in the diff, so a reader who does not find it in the handoff will spend a session rediscovering it.</li>
  <li>Open items arrive in order, next action first, drawn from the last trace entry and from every gate the ledger still shows unmet.</li>
  <li>A run with no trace produces a document labeled reconstructed, rather than one that reads like a full handoff and is not.</li>
</ul>

Handoff ships as a single `SKILL.md` with no sibling documents of its own. The doctrine it depends on sits one group over: [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only trace, its five fields — INPUT, DECIDED, EVIDENCE, OPEN, and the heading that carries the timestamp — and the replay protocol a resuming session follows. Handoff writes one trace entry of its own before it finishes, naming the scope handed off, the entries the projection covers, and what the handoff could not resolve.

## When to reach for it

Type `/handoff` in Claude Code, or name the skill directly in a session. Handoff is user-invoked, so nothing routes to it on its own.

You reach for handoff in five moments. A session is ending with work unfinished and someone else will continue it. The context window is close to full, so the run has to restart from a written record rather than from what is still in the window. Work moves from one agent to another, or from an agent to a person. A run pauses for a day or more, long enough that nobody will recall the reasoning. Or the user simply asks for a handoff, a status document, or a resumption note.

Handoff is not the only skill that writes something durable at the end of a run. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| What "done" means for this story has not been written down yet, and the run has no gates to report against | [`grit`]({{ '/grit/' | relative_url }}) |
| The rules apply to every run the team's agents make, not to the state of one run | [`brief`]({{ '/brief/' | relative_url }}) |
| You are not sure which skill fits at all, on the engineering side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| You are not sure which skill fits at all, on the product side | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same handoff skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want handoff can skip the rest of the catalog with `./scripts/link-skills.sh --skill handoff`, which links just this skill into the default buckets without pulling in the rest of the productivity group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Handoff is user-invoked: type <code>/handoff</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>, and the skill reads the repository from there — the trace at <code>.grit/&lt;scope&gt;/TRACE.md</code> and the gate ledger in the same directory. The document it writes lands beside them.</p>
<div class="prompt-card">We are out of room on QuenServe story E1-F1-S1. Read .grit/E1-F1-S1/TRACE.md and the gate ledger beside it, then write the handoff from that record rather than from this conversation. The two approaches we abandoned matter most: state each one and what ruled it out. Assume the next reader has never seen this session.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Handoff answers with the path it wrote to, and with anything the projection could not resolve — a decision recorded without a reason, or a trace that stopped before the work did.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for handoff yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The output is still a written file in the scope directory, not a command's return value.</p>
<div class="prompt-card">This run stops here. Project the trace at .grit/E1-F1-S1/TRACE.md into a handoff: the goal from the ledger, the current state with the evidence line behind each gate, the decisions with the reasons they carried, and every approach we tried and dropped. Tell me if the last trace entry is older than the newest commit.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the document and reports the gap when the trace stopped recording before the run stopped working, since the handoff cannot cover that difference.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply handoff as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees handoff's name and description the way the other four tools do. All three need the trace and the ledger open as context, because the projection is only as good as the record it reads.</p>
<div class="prompt-card">Read .grit/E1-F1-S1/TRACE.md and the GATES.md beside it, and write a handoff for someone with no context at all. Order the open items so the next action is first, list the exact files and the commands with the arguments they were run with, and flag any decision recorded without a reason rather than inventing one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation and write the file, reading both records as context since no installed command exists here to parse them first.</p>
</div>
</div>

A good ask includes:

- The scope directory the run has been writing to, so handoff knows which trace and which ledger to read.
- Who picks the work up next, and whether that reader has seen any of this product before.
- Whether the run has a trace at all. If it does not, say so, and expect a document labeled reconstructed.
- Any approach that was abandoned outside the trace, so it can be recorded rather than left for the next session to find again.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every page on this site returns to. A session has been building story E1-F1-S1, "complete an inspection with no connectivity and it syncs without loss," under feature E1-F1 and epic E1. Six gates were written before implementation started. Two are met. The context window is nearly full, and the work is not done. You type:

<pre><code>We are out of room on QuenServe story E1-F1-S1. Read .grit/E1-F1-S1/TRACE.md
and the gate ledger beside it, then write the handoff from that record rather
than from this conversation. The two approaches we abandoned matter most:
state each one and what ruled it out. Assume the next reader has never seen
this session.</code></pre>

Handoff reads the trace first. Two of its seven entries carry the material nothing else in the repository holds:

<pre><code># Trace: E1-F1-S1

## 2026-08-28T09:14Z &middot; grit &middot; gate
INPUT: story E1-F1-S1, six gates written before implementation
DECIDED: every inspection record carries a client-generated UUID, so the
         offline store owns identity and the server never mints one
EVIDENCE: test/offline-store.test.mjs:63 green (exit=0)
OPEN: gates 3 through 6 not started

## 2026-08-29T15:02Z &middot; tdd &middot; red-green
INPUT: gate 3, a queued inspection reaches the server intact after reconnect
DECIDED: abandoned the last-write-wins merge on record timestamps
EVIDENCE: test/sync-fidelity.test.mjs:118 red (exit=1, "inspector B answer
          missing"); tablet clocks in the fixture drifted 40 seconds
OPEN: gate 3 unmet, replacement approach not chosen
</code></pre>

The second abandoned approach — replaying the whole queue through the existing ingestion endpoint with no idempotency key — appears in a later entry, ruled out because a retry after a partial upload duplicated the photo attachments. Neither approach is visible in the diff. The first was reverted, and the second was never committed at all, so a reader working from `git log` would see no sign that either was tried.

The document handoff writes follows its output contract:

```yaml
scope: E1-F1-S1
document: .grit/E1-F1-S1/HANDOFF.md
source:
  trace: .grit/E1-F1-S1/TRACE.md
  entries: 7 projected, 2026-08-28T09:14Z to 2026-08-29T15:02Z
  ledger: 2 / 6 gates met
goal: An inspection completed with no connectivity reaches the server intact once the device reconnects.
state: Gates 1 and 2 met (test/offline-store.test.mjs:63 green, exit=0). Gate 3 unmet, last observed red at test/sync-fidelity.test.mjs:118. Gates 4 through 6 not started.
decisions:
  - Every inspection record carries a client-generated UUID — the offline store owns identity, so a record queued offline keeps one identifier from capture to ingestion.
  - The seam is the sync client, not the ingestion endpoint — the server contract was already agreed with the team owning E1-F2.
abandoned:
  - Last-write-wins merge on record timestamps — tablet clocks drifted 40 seconds in the fixture, and the later write silently dropped the other inspector's answer.
  - Replaying the queue through the ingestion endpoint with no idempotency key — a retry after a partial upload duplicated the photo attachments.
open:
  - Choose a replacement for the abandoned merge, then make gate 3 green.
  - Gates 4, 5, and 6 not started.
artifacts:
  files: [src/sync-client.ts, src/offline-store.ts, test/sync-fidelity.test.mjs]
  commands: [npm test -- test/sync-fidelity.test.mjs, node scripts/gate-check.mjs .grit/E1-F1-S1]
reconstructed: false
```

Two details in that document came from stripping the session rather than from the trace. The run had been calling the second approach "the fat queue," a name coined mid-session that means nothing to a reader who was not there; the handoff names what it denotes instead. And the first abandoned approach carries a note that dropping an inspector's answer is exactly what the conflict-resolution work under E1-F2 exists to prevent, because "as we discussed" would not tell a cold reader why the failure mattered.

The abandoned section is the part that repays the effort. Gates and evidence can be recovered from the ledger. A failed approach can be recovered from nothing, and the next session would spend hours reaching the same dead end.

## What good looks like

The difference between a projection and a recollection shows up line by line. Both of these describe the same moment in the same run.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A handoff projected from the trace</div>
<pre><code><span class="tok-ok">STATE:</span> gate 3 unmet
<span class="tok-ok">EVIDENCE:</span> test/sync-fidelity.test.mjs:118
          red (exit=1, "inspector B answer missing")
<span class="tok-ok">ABANDONED:</span> last-write-wins timestamp merge
          &mdash; clocks drifted 40s, an answer was dropped</code></pre>
<div class="compare-card-note">Every line traces to an entry written while the work was in front of the agent. A reader can rerun the command, open the file at that line, and see the same thing.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">SUMMARY:</span> most of the sync path works now.
The merge approach we discussed did not
pan out, so we moved on.
<span class="tok-comment">No file, no exit status, no reason</span>
<span class="tok-comment">&larr; written from memory at the end of the run</span></code></pre>
<div class="compare-card-note">This is the failure the trace exists to prevent. It records what the agent remembers, and "the merge approach we discussed" is unreadable to anyone who was not in the session.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the run kept no trace at all?</summary>
<div class="qa-body">

Then a full handoff is not available, and the skill says so rather than pretending otherwise. It reconstructs what the ledger, the diff, and the tracker support, marks every unverified line as unverified, and sets `reconstructed: true` in the output contract. The gap is specific: a diff shows what changed and never shows what was tried and abandoned, so the highest-value section is the one a reconstruction cannot fill.

</div>
</details>

<details class="qa">
<summary>What if the last trace entry is older than the newest commit?</summary>
<div class="qa-body">

Handoff reports the gap instead of covering it. The run stopped recording before it stopped working, and the difference between the two is exactly the material a projection cannot see. The reader is told which entry the projection ends at and which commit is newer, so they know where to look themselves.

</div>
</details>

<details class="qa">
<summary>Why is the abandoned section the most valuable part?</summary>
<div class="qa-body">

Because it is the only part that cannot be recovered any other way. Gates come from the ledger, changed files come from the diff, and open work can be inferred from what is missing. A failed approach leaves nothing behind once it is reverted, so a reader who does not find it here has no way to learn it except by trying it again.

</div>
</details>

<details class="qa">
<summary>What if a decision was recorded with no reason?</summary>
<div class="qa-body">

It is carried forward as a decision of unknown basis. Handoff does not invent a reason that reads plausibly, because an invented reason is harder to challenge than an admitted gap. The next session then knows it may reopen that one decision without discarding the others.

</div>
</details>

<details class="qa">
<summary>Is this the same as a commit message or a pull request description?</summary>
<div class="qa-body">

No. Both of those describe a change that was made. A handoff describes a run that has not finished: what is proven so far, what was ruled out, and what to do next. The two overlap only in the files they name, and a pull request description that tried to carry abandoned approaches and unmet gates would be describing work it does not contain.

</div>
</details>

<details class="qa">
<summary>Does a router send requests here automatically?</summary>
<div class="qa-body">

No. Handoff is user-invoked, and no router in this repository points to it today. That is deliberate: an agent cannot reliably tell that a session is about to end, and a handoff written too early is a status note nobody needed. A person recognizes the moment and names the skill.

</div>
</details>

## It's working if

- Every state line in the document names its evidence — a command and its exit status, or a file and a line — rather than asserting that something works.
- The next session opens the handoff, reads the open items in order, and starts on the first one without asking a question first.
- An approach that failed once fails only once, because the second session found it named in the document rather than rediscovering it.
- A decision carried forward arrives with the reason it carried, and is reopened only when the reason itself is challenged.
- A reader who has never seen the session can name the goal, the current state, and the next action after one read.

If the next session's first move is to reproduce something the last one already proved, the handoff described the run instead of projecting its record.

## Where it fits

**Handoff sits at the end of a run rather than inside one. It reads what `grit` and the delivery skills wrote and turns it into the starting position for whoever comes next.**

Its input is the pair of files a scoped run maintains: the gate ledger `grit` keeps, which says what done means and which gates are met, and the trace defined in `core/TRACE.md`, which says how the work reached that verdict. Handoff adds nothing to either record beyond its own closing entry. It reorganizes what is already there into the order a cold reader needs.

Its nearest neighbor in the productivity group is `brief`, and the split is durability. Brief writes the rules a team's agents follow on every run, kept in the file each tool actually reads. Handoff writes the state of one run, and that document is spent as soon as the next session picks it up.
