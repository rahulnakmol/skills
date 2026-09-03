---
layout: skill
name: teach
title: "Teach: One Concept, Checked by Application"
description: "Teach establishes what a learner can already do, teaches one concept per session, checks it by application, and leaves a workspace the next session resumes from."
group: productivity
invocation: user-invoked
scenario: "Teaching offline-first sync to a QuenServe developer before they take on E1-F2 conflict resolution"
lens:
  novice:
    who: 'You have been handed work in an area you have never built in, and every explanation you find starts either well below you or well above you.'
    value: 'Teach finds out where you actually are by asking you to do something small, then teaches one thing at a time from there rather than from the beginning of the subject.'
  practitioner:
    who: 'You are the person who ends up explaining the same system to every new joiner, and each explanation starts from scratch.'
    value: 'The concept covered, the exercise set, its recorded answer, and the note on where the learner struggled all sit in the repository, so the next session resumes rather than repeats.'
  leader:
    who: 'Your team keeps a bus factor of one on the parts of the system that take longest to learn.'
    value: 'Knowledge moves from the person who holds it to the person who needs it in checkable steps, with a written record of what has been covered and what has not.'
  csuite:
    who: 'You are paying for onboarding that produces a person who can follow instructions but cannot yet make an unaided judgment call.'
    value: 'Understanding is checked by application to a case the learner has not seen, so what the organization gets back is a demonstrated capability rather than a completed course.'
---

## What it does

Teach covers the case where the point is for a person to hold the knowledge afterward, rather than for an agent to hand back a finished artifact. It is user-invoked, because only the learner knows that they want to be taught rather than helped.

Two things separate it from an explanation. The first is that the level is established by observation instead of by self-report: the learner is asked to do something small with the topic before anything is taught. SKILL.md gives the reason in one line: "A lesson pitched at the wrong level costs both parties the session." The second is that the working directory is a stateful teaching workspace, so a course spread over several sessions does not restart each time someone opens a new one.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the workspace</span><span class="step-text">The progress record, the last exercise set, and the note on where the learner struggled. When none exists, say so plainly and create one.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Establish the level</span><span class="step-text">Ask the learner to do something small with the topic, not to describe their experience with it. Self-reported level is unreliable in both directions.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">State the level you concluded</span><span class="step-text">Put the reading in words the learner can disagree with, so a wrong call is corrected in the first minute rather than the last.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Pick one concept</span><span class="step-text">One, and only one. Two concepts taught together tend to be learned as one blurred thing, and neither can then be checked on its own.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Build on what is already held</span><span class="step-text">Start from what the learner demonstrated, not from first principles. Re-covering settled ground pushes the new material into the last few minutes.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Teach, then hand over the work</span><span class="step-text">Stop teaching and check by asking the learner to apply the concept to a case they have not seen. Restating a definition is recall, and recall proves little.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Write the exercise and its answer together</span><span class="step-text">The exercise goes in <code>EXERCISES.md</code> and its real answer in <code>SOLUTIONS.md</code>, recorded at the same moment.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Record the session before it ends</span><span class="step-text">The level, the concept, the exercise, what went wrong and how, and where the next session starts &mdash; written while the evidence is still in front of you.</span></div>
</div>

<ul class="benefits">
  <li>The lesson is aimed at a level the learner demonstrated rather than one they claimed, so a session is not spent above the floor or below the ceiling.</li>
  <li>One concept per session stays separately checkable, because a check that covers two ideas at once cannot say which of them landed.</li>
  <li>A check that requires application catches the gap a check by restatement misses: a learner can repeat a rule accurately and still not recognize where it applies.</li>
  <li>The answer is written into <code>SOLUTIONS.md</code> at the same time as the exercise. An answer written afterward drifts toward whatever the learner produced, which turns the check into a formality.</li>
  <li>Session four opens on the ground session three reached, because the progress record names the level, the concept, the sticking point, and the next starting place.</li>
</ul>

The workspace lives in the scope directory that already holds the run's trace, rather than in a second state directory of its own. Two partial records of the same course will disagree, and a later reader cannot tell which one is current. Teach also appends one entry under the `lesson` kind defined in [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md), naming the level established, the concept taught, the applied check and its result, and what the session left open.

## When to reach for it

Type `/teach` in Claude Code, or name the skill directly in a session. Teach is user-invoked, so nothing routes to it on its own.

You reach for teach in five moments. Someone wants to understand a topic over time rather than receive one answer. A workspace from an earlier session exists and the learner is coming back to it. A person asks to be taught, coached, or quizzed on something in the repository. The learner will have to do the work unaided later, so the knowledge has to stay with them. Or an explanation has failed twice, which usually points at a missing prerequisite rather than at wording.

Teach is not the only skill that puts knowledge somewhere durable. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| One explanation failed and the gap is wording, not a missing prerequisite | [`wait-what`]({{ '/wait-what/' | relative_url }}) |
| The knowledge belongs to a team's agents rather than to one person, and should be written once where those agents read it | [`brief`]({{ '/brief/' | relative_url }}) |
| You are not sure which skill fits at all, on the engineering side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| You are not sure which skill fits at all, on the product side | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same teach skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who want teach on its own can run `./scripts/link-skills.sh --skill teach`, which links just this skill into the default buckets without pulling in the rest of the productivity group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Teach is user-invoked: type <code>/teach</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>, and the skill reads and writes the workspace in the repository from there. The lesson happens in the conversation; the exercises, the answers, and the progress record are files it leaves behind.</p>
<div class="prompt-card">Teach me offline-first sync before I start on QuenServe story E1-F2-S1. Do not start with a lecture. Ask me to do one small thing first so you can see what level I am at, then tell me the level you concluded so I can correct it. One concept this session, and check it on a case I have not seen.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Teach answers with the level it established, the one concept it taught, the result of the applied check, and the paths of the workspace files it wrote.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for teach yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The workspace files are ordinary files in the scope directory, so any tool can pick the course back up.</p>
<div class="prompt-card">Session two on offline-first sync for E1-F2. Read the progress record and the last exercise set in .grit/E1-F2/ before you teach anything, and start from where the last session said to start. If I ask for the answer while I am still making attempts, withhold it and say that you are withholding it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode reports what the progress record said, whether the learner still holds last session's concept, and where the two records disagree if they do.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply teach as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees teach's name and description the way the other four tools do. All three need the workspace directory open as context, since there is no installed command here to find it first.</p>
<div class="prompt-card">Check whether I still hold last session's concept before you teach a new one. Give me a case I have not seen and ask me what happens, rather than asking me to define anything. If I get it wrong, treat the concept as untaught and reteach it from a different example instead of moving on.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation and write the workspace files, reading the existing records as context rather than parsing them through a command.</p>
</div>
</div>

A good ask includes:

- The scope directory the course is being kept in, so teach reads the right progress record rather than starting a second one.
- What the learner will have to do unaided afterward, which sets the level the course has to reach.
- Whether this is a first session or a return, since a return starts by checking that the last concept survived the gap.
- Any deadline on the work the learning is for, because that decides how long being stuck is allowed to stay productive.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every page on this site returns to. A developer has just joined the team and has been assigned feature E1-F2, conflict resolution, under epic E1. They have built plenty of online services that read and write records over a network. They have never built a system where two devices edit the same record while both are disconnected. Their first story is E1-F2-S1, "two inspectors edit the same inspection offline, and neither answer is silently dropped." You type:

<pre><code>Teach me offline-first sync before I start on QuenServe story E1-F2-S1.
Do not start with a lecture. Ask me to do one small thing first so you can
see what level I am at, then tell me the level you concluded so I can
correct it. One concept this session, and check it on a case I have
not seen.</code></pre>

Teach reads `.grit/E1-F2/` first and finds a trace but no progress record, so it says plainly that no course exists yet and creates one. Then it establishes the level without asking a single question about experience:

<pre><code>Before I teach anything: two tablets both completed inspection 4471 while
offline. Tablet A recorded "valve seal: cracked" at 09:12. Tablet B
recorded "valve seal: intact" at 09:14. Both have now reconnected.
Write down which answer the server should keep, and why.</code></pre>

The developer answers that the server keeps the 09:14 value, because it is later. That answer is worth more than a paragraph of self-description. It shows a solid grasp of request ordering and no working model of clock skew, and it is the same assumption that the abandoned last-write-wins merge under E1-F1 was reverted for. Teach states the level out loud so the learner can push back on it, then picks one concept for the session: on disconnected devices, a wall-clock timestamp is not an ordering.

Rather than starting from distributed-systems first principles, it builds on ground the learner already holds. They have used a version column to reject a stale update in an online service, so the session extends that one idea: a single counter works when one server sees every write, and stops working when two devices increment it without seeing each other. The check is an application, not a definition:

<pre><code>Three tablets, not two. Tablet C reconnects, syncs, goes offline again,
and edits 4471 a second time. A and B never saw C at all. Tell me which
pairs of edits are concurrent and which are ordered, and say what the
server can decide on its own in each case.</code></pre>

The exercise goes into `EXERCISES.md`, and its real answer into `SOLUTIONS.md`, in the same pass. Ten minutes in, the developer asks for the answer. They are still producing attempts, so teach withholds it, says outright that it is withholding it and why, and offers a smaller step: two tablets first, with C added back afterward. The session closes with the record written while the evidence is still in view:

```yaml
topic: offline-first sync for conflict resolution
session: 1
level: Comfortable with request ordering and version columns in online services; assumed a wall-clock timestamp orders writes across devices (checked by the 4471 timestamp question, not by self-report)
concept: On disconnected devices, a wall-clock timestamp is not an ordering
check:
  applied_to: Three tablets, one of which reconnects and edits twice
  result: partial
exercises:
  - id: EXERCISES.md#concurrent-vs-ordered
    answer_recorded: yes
    withheld: yes
struggled: Named the A/B pair as concurrent, then called C's second edit ordered against A because it happened later in wall-clock time. The timestamp assumption survived the lesson in the harder case.
next: Reteach the same concept from a different example before introducing per-device counters
open: none
```

What the session leaves behind is four files in one directory, not a transcript:

- `PROGRESS.md` &mdash; the level, the concept, the exercise, the misunderstanding as it actually appeared, and where session two starts.
- `EXERCISES.md` &mdash; the three-tablet case, written so it can be reread without the conversation around it.
- `SOLUTIONS.md` &mdash; the answer to that case, recorded before the learner attempted it.
- `TRACE.md` &mdash; one appended entry under the `lesson` kind, sitting alongside the delivery entries for E1-F2.

Session two opens on that record. It does not restart the course, and it does not move on to the next concept either, because the check came back partial rather than correct. A correct restatement with an incorrect application is treated as untaught. The first move is a short applied question on the same concept, from a different example: two inspectors on E1-F2-S1, one of whom edits, syncs, and edits again.

## What good looks like

The difference between a check and a formality shows up in what the learner is asked to produce. Both of these close the same lesson on the same concept.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A check the learner has to apply</div>
<pre><code><span class="tok-ok">ASK:</span> three tablets, C reconnects and edits
     twice &mdash; which pairs are concurrent?
<span class="tok-ok">RESULT:</span> partial &mdash; ordered C against A
     on wall-clock time
<span class="tok-ok">NEXT:</span> reteach from a different example</code></pre>
<div class="compare-card-note">The case is one the learner has not seen, so the answer cannot come from memory. The wrong answer names the exact misunderstanding, which is what the next session needs.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">ASK:</span> so what does "concurrent" mean here?
<span class="tok-warn">RESULT:</span> correct &mdash; definition repeated
     back accurately
<span class="tok-comment">No case, no judgment, nothing applied</span>
<span class="tok-comment">&larr; recall, recorded as understanding</span></code></pre>
<div class="compare-card-note">A learner can repeat a rule accurately and still not recognize where it applies. This check passes, the session moves on, and the gap surfaces later in the pull request.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why not just ask the learner what they already know?</summary>
<div class="qa-body">

Because self-reported level is unreliable in both directions. Some people describe a topic they have only read about; others understate what they can already build. Asking for one small piece of work produces evidence instead of an estimate, and it takes about as long. The level teach concludes is then stated out loud, so the learner can correct a reading that is wrong.

</div>
</details>

<details class="qa">
<summary>Why only one concept per session?</summary>
<div class="qa-body">

Two concepts taught together tend to be learned as one blurred thing, and neither can then be checked on its own. When the check comes back wrong, there is no way to tell which of the two failed, so the reteach has to cover both. One concept per session keeps the check diagnostic rather than merely pass or fail.

</div>
</details>

<details class="qa">
<summary>Is refusing to give the answer actually helpful?</summary>
<div class="qa-body">

It is a real trade-off, and the skill states it as one. A learner who is handed the answer learns less than one who is allowed to be stuck productively, so teach offers a smaller step, a hint, or a worked case that is close but not the same. It also says plainly that it is withholding the answer and why, so the withholding reads as method rather than evasion.

The counterweight matters just as much. Stuckness that has stopped producing attempts is no longer productive, and at that point teach gives the answer and walks through it. Silence past that line teaches discouragement rather than the concept.

</div>
</details>

<details class="qa">
<summary>What if the learner asks for the answer while still making attempts?</summary>
<div class="qa-body">

It is withheld, and teach says so rather than quietly changing the subject. The signal that separates the two cases is attempts, not time or frustration. As long as the learner is still producing answers to try, the smaller step is more useful than the solution. When attempts stop, the stop condition flips and the answer is given.

</div>
</details>

<details class="qa">
<summary>What if the workspace and the learner disagree about what was covered?</summary>
<div class="qa-body">

Neither record is trusted. The progress file may have been written from memory at the close of a session, and a learner's recollection of what they understood is exactly what the applied check exists to test. Teach re-establishes the level with one applied question and corrects the file to match what it observes.

</div>
</details>

<details class="qa">
<summary>Why keep the workspace in the scope directory instead of its own folder?</summary>
<div class="qa-body">

Because two partial records of the same course will eventually disagree, and a later reader cannot tell which one is current. Keeping the progress record, the exercises, and the answers beside the trace that the delivery work already writes means one directory holds the whole picture of a piece of work: what was built, and what the person building it learned along the way.

</div>
</details>

<details class="qa">
<summary>Does a router send requests here automatically?</summary>
<div class="qa-body">

No. Teach is user-invoked, and no router in this repository points to it. The reason is that an agent cannot tell the difference between a person who wants a task done and a person who wants to understand the task. Answering the second as though it were the first produces a working change and no learning, which is the outcome this skill exists to avoid.

</div>
</details>

## It's working if

- The level is established before anything is taught, and it comes from something the learner did rather than something they said about themselves.
- The session covers one concept, and the record names it in a single sentence.
- The check asks the learner to apply the concept to a case they have not seen, and a correct restatement with a wrong application is recorded as untaught.
- Every exercise in the workspace has its real answer recorded beside it, written at the same time rather than after the learner answered.
- The next session opens on the last one's ending point and does not re-cover ground the record already shows as settled.
- The learner does the work unaided afterward, which is the only check that matters outside the workspace.

If a session ends with the learner able to describe the concept but unable to use it on a new case, the lesson checked recall and recorded it as understanding.

## Where it fits

**Teach sits beside the delivery work rather than inside it. It runs when the constraint on a piece of work is that a person does not yet understand the system, and no artifact an agent produces would remove that constraint.**

Its nearest neighbor is `wait-what`, and the split is the size of the gap. Wait-what handles a single explanation that failed because of wording, and it finishes in one pass. Teach handles the case where the explanation failed twice, which usually means a prerequisite is missing, and that takes a course rather than a rewrite.

The other neighbor is `brief`, and the split is who holds the knowledge afterward. Brief writes the rules a team's agents load on every run, kept in the file each tool actually reads. Teach puts knowledge in a person, and the workspace it leaves is scaffolding for that person rather than a rule for the team.

Before reporting a lesson done, teach opens the workspace files and reads them against the session that just happened, following [`core/VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md). A progress record written from memory at the close of a session is the same failure the applied check exists to prevent, one file over.
