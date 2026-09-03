---
layout: skill
name: wait-what
title: "Wait-what: A Different Route to the Same Point"
description: "Wait-what is fired the moment a message does not land. It names which of four things broke the explanation, then rebuilds it from what the reader already understands."
group: productivity
invocation: user-invoked
scenario: "Re-pitching QuenServe's sync status wording for story E1-F3-S1 after a reader could not tell \"waiting\" from \"not yet known\""
lens:
  novice:
    who: 'You read something twice, could repeat it word for word, and still cannot act on it.'
    value: 'Wait-what treats that as a fault in the explanation rather than in you. It names which of four things went wrong, then rebuilds the message starting from what you already understand.'
  practitioner:
    who: 'You explain something, get a blank response, explain it again at greater length, and lose ground.'
    value: 'The skill blocks that reflex. It diagnoses the failure before a word is rewritten, then changes the entry point, the order, or the example, and adds no detail the original lacked.'
  leader:
    who: 'Your team loses time to messages that parse and do not land: handoffs, review comments, and specifications that get read and then re-read.'
    value: 'Each re-pitch records the span that failed and the cause behind it, so a term that fails message after message shows up as a pattern worth fixing once instead of forever.'
  csuite:
    who: 'You read summaries written by people much closer to the work than you are.'
    value: 'A re-pitch is a different route to the same conclusion, never a softer one. The claim is held fixed, so a version you can follow is not quietly a version that says something else.'
---

## What it does

Wait-what is the skill you fire the moment a message does not land. Not later, and not after a third read. The words parsed, you could repeat the sentence, and you still cannot act on it. That is the signal, and the moment is the point: a failure caught immediately is still a narrow one, while a message left to sit becomes a document reported as unclear, which gives nobody anything to work with.

The skill diagnoses before it rewrites. Four causes account for most failures. An unexplained term, used as though it were already agreed. An assumed step, taken by the writer and never shown to the reader. An inverted structure, which put the conclusion after the reasoning meant to support it. And a claim resting on context the reader never had. Naming the one that applies is what separates a re-pitch from a rewrite.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Quote the span</span><span class="step-text">The exact sentence, paragraph, or term that failed. The failure is nearly always narrower than it feels from inside it.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Diagnose the cause</span><span class="step-text">Unexplained term, assumed step, inverted structure, or missing context. Name one, before rewriting a word.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Ask, if the span is unclear</span><span class="step-text">One question costs less than re-explaining a document the reader had mostly followed, and keeps the second attempt aimed at the right sentence.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Establish the floor</span><span class="step-text">State what the reader does already understand, in their words. The re-pitch starts there and moves one step at a time.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Take a different route</span><span class="step-text">Change the entry point, the order, or the example. Not the same words rearranged, and not the same words louder.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Hold the claim fixed</span><span class="step-text">A clearer explanation of a different claim is a new problem, not a fix. The route changes; the point it arrives at does not.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Reuse the vocabulary</span><span class="step-text">Terms the project already established. A new term invented to rescue a failed one gives the reader two things to learn and a mapping between them.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Add no detail</span><span class="step-text">Answering confusion with more detail is the reflex, and it lengthens the route that already failed instead of replacing it.</span></div>
  <div class="step"><span class="step-num">9</span><span class="step-label">Check against the diagnosis</span><span class="step-text">If the cause was an assumed step, the re-pitch contains that step. If it was inverted structure, the conclusion now comes first.</span></div>
</div>

<ul class="benefits">
  <li>The second attempt aims at a named cause rather than at a general sense that the message was hard, so it does not fail the same way the first one did.</li>
  <li>The floor is stated in the reader's own words, which makes the first step of the re-pitch one the reader can actually take.</li>
  <li>The claim is held fixed. A route the reader can follow to a different conclusion looks like success and is not, and holding the claim makes that failure visible.</li>
  <li>No detail is added. The reflex to explain harder produces a longer version of the route that already failed, and the skill closes that door on purpose.</li>
  <li>Two failed re-pitches stop the loop. At that point the gap is a missing prerequisite rather than wording, and the prerequisite gets named instead of re-explained.</li>
</ul>

Wait-what holds only the `read` verb. It writes no file in the working tree, so nothing lands in the repository when it runs. It reports a trace entry under the `repitch` kind — the span, the cause, the route, and whether the re-pitch landed — and the session that owns the trace appends it. The record it reports into is defined in [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md).

## When to reach for it

Type `/wait-what` in Claude Code, or name the skill directly in a session. Wait-what is user-invoked, and it has to be: only the reader knows that a message did not land, and an agent cannot detect its own explanation failing.

You reach for it in five moments. You read a message, a plan, or a review comment and did not follow it. The words parsed but the point did not, so you could repeat the sentence and still not act on it. You asked once, received more detail, and understood less than before. A handoff assumes a step you never saw anyone take. Or a term is used as though it were already agreed, and you have not seen it defined anywhere.

Wait-what is not the only skill that answers a reader who is lost. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The gap is a missing prerequisite rather than a failed explanation | [`teach`]({{ '/teach/' | relative_url }}) |
| One term fails message after message, across the team's agents | [`brief`]({{ '/brief/' | relative_url }}) |
| The message you cannot follow is a run record written from memory | [`handoff`]({{ '/handoff/' | relative_url }}) |
| Nobody in the room knows the answer, so the gap is knowledge rather than wording | [`questionnaire`]({{ '/questionnaire/' | relative_url }}) |
| You are not sure which skill fits at all, on the engineering side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| You are not sure which skill fits at all, on the product side | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same wait-what skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want this skill can skip the rest of the catalog with `./scripts/link-skills.sh --skill wait-what`, which links it into the default buckets without pulling in the rest of the productivity group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Wait-what is user-invoked: type <code>/wait-what</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>. Because the skill holds only the <code>read</code> verb, the session answers in the conversation and leaves the working tree untouched.</p>
<div class="prompt-card">This sentence from QuenServe story E1-F3-S1 did not land: "A record shows Waiting while it is queued on the device, and Not yet known once it has been uploaded but the server state is unconfirmed." Diagnose why before rewriting anything, then take a different route to the same point. Do not add detail.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code names the cause first, states the floor it is building from, and only then gives the re-pitch, so you can reject the diagnosis before reading a second explanation.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for wait-what yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The answer stays in the conversation, since this skill produces no file.</p>
<div class="prompt-card">I read the E1-F3-S1 status description and cannot act on it. What I do understand: an inspection sits on the tablet until there is signal. Start from exactly that and move one step. Tell me which of the four causes applies, and keep the claim the same as the original.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode takes the stated floor at face value and builds from it, rather than starting again from the beginning of the story.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply wait-what as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees the skill's name and description the way the other four tools do. All three want the original span quoted in the message, because a document reported as unclear gives the diagnosis nothing to aim at.</p>
<div class="prompt-card">Here is the exact sentence I could not follow, from QuenServe E1-F3-S1. Quote it back, name the cause, then re-pitch. Use only vocabulary the story already uses, introduce no new terms, and do not change what the sentence claims. If the diagnosis comes out as "read it again", say so instead of guessing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation. None of them writes a file here, which matches the skill's own contract rather than being a limitation of the tool.</p>
</div>
</div>

A good ask includes:

- The exact span that failed, quoted. A whole document reported as unclear cannot be diagnosed.
- What you did understand, in your own words, so the re-pitch has a floor to start from.
- Whether you have already been given a longer explanation, since that rules out adding detail as the fix.
- The vocabulary the project uses for the thing, so the second attempt does not introduce a term you now have to map.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every page on this site returns to. Under epic E1, feature E1-F3 covers sync status visibility: showing plainly what has and has not reached the server. Story E1-F3-S1 says an inspector sees which of today's inspections have not yet reached the server.

The story described two of those states. A second reader, writing the in-app help text, read the description and could not use it:

<pre><code>A record shows Waiting while it is queued on the device, and Not yet
known once it has been uploaded but the server state is unconfirmed.</code></pre>

The reader can repeat that sentence. They cannot write help text from it, because they cannot say what an inspector should do differently in each state. You fire the skill.

The first candidate diagnosis is an unexplained term, because both labels are product terms a reader might not know. The skill rejects it: the sentence defines both terms where it uses them. The cause is an assumed step. The sentence moves from "uploaded" to "server state is unconfirmed" without the step between them. The tablet learns the server holds a record only when a reply comes back, and that reply can go missing on its own even when the upload worked. Nobody had shown the reader that step, so "not yet known" reads as a weaker kind of waiting rather than a different question entirely.

The floor comes next, stated in the reader's words: an inspection sits on the tablet until there is signal, and the tablet sends it when signal returns. That is true, it is already understood, and the missing step attaches directly to it.

The re-pitch changes the entry point. The original started from the record and its states. This one starts from the question an inspector actually asks:

<pre><code>An inspector asks one thing at the end of the day: can I leave the site?
The two states answer it differently.

Waiting means the record is still on the tablet. Nothing has been sent
yet, so the inspector can still fix it.

The tablet only knows the server has a record when the server sends a
reply back. That reply can go missing even when the upload worked.

Not yet known means the tablet sent the record and no reply came back.
The record may already be on the server. The tablet cannot tell, and
neither can the inspector.</code></pre>

Three things are worth naming about that second version. It contains the assumed step, in its own sentence, which is what the diagnosis required. It adds nothing the original lacked: no retry counts, no backoff windows, and no mention of the manager view in E1-F3-S2, all of which would have lengthened a route that had already failed. And it makes the same claim as the original. Waiting is about the device's outbox. Not yet known is about a missing acknowledgment. The route changed and the point did not.

The trace entry the session appends records the whole attempt:

```yaml
span: "A record shows Waiting while it is queued on the device, and Not yet known once it has been uploaded but the server state is unconfirmed."
cause: assumed-step
floor: "An inspection sits on the tablet until there is signal, and the tablet sends it when signal returns."
route: "Entered from the inspector's end-of-day question instead of from the record's states, with the acknowledgment step stated on its own."
vocabulary_reused: [Waiting, Not yet known, record, tablet, server]
terms_introduced: none
landed: yes
open: none
```

Had the reader still not followed it, that would be one failure, not two, and the second attempt would change the route again rather than the volume. A third failure would end the loop: at that point the gap is a missing prerequisite about how acknowledgments work, and a lesson is the answer rather than a re-pitch.

## What good looks like

Both of these are second attempts at the same sentence, written after the same reader said the same thing.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A re-pitch that answers the diagnosis</div>
<pre><code><span class="tok-ok">cause:</span> assumed-step
<span class="tok-ok">floor:</span> "it sits on the tablet until there
       is signal"

The tablet only knows the server has a record
when a reply comes back. That reply can go
missing even when the upload worked.
<span class="tok-ok">&larr; the assumed step, stated on its own</span>
<span class="tok-ok">&larr; same claim, new entry point, no new terms</span></code></pre>
<div class="compare-card-note">The diagnosis named a missing step, and the second attempt contains that step. The claim is unchanged, the vocabulary is the project's own, and nothing was added that the original did not have.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">To clarify: a record is queued when it is</span>
<span class="tok-warn">queued, and unconfirmed when the server</span>
<span class="tok-warn">state is unconfirmed. There are also five</span>
<span class="tok-warn">retry tiers and a backoff window &mdash; see the</span>
<span class="tok-warn">sync design note for the full state table.</span>
<span class="tok-comment">&larr; no diagnosis, so no cause was answered</span>
<span class="tok-comment">&larr; same route, more detail, now longer</span></code></pre>
<div class="compare-card-note">This is the reflex the skill exists to block. It repeats the failed sentence, adds material the reader never asked for, and points at a second document. The route that failed is now longer.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the reader cannot point at where it failed?</summary>
<div class="qa-body">

Ask what the last part was that still made sense, rather than re-explaining from the top. That question finds the boundary in one exchange, and the boundary is the span. Re-explaining a whole document to a reader who had followed most of it wastes the attempt and usually aims it at the wrong sentence.

</div>
</details>

<details class="qa">
<summary>Isn't a re-pitch just a rewrite?</summary>
<div class="qa-body">

No, and the difference is checkable. A rewrite changes the words. A re-pitch changes the route in a way the diagnosis called for: if the cause was an assumed step, the step is now present; if it was inverted structure, the conclusion now comes first. A second version that does not answer the diagnosis is a rewrite, and the skill says so.

</div>
</details>

<details class="qa">
<summary>Why is adding detail the wrong move?</summary>
<div class="qa-body">

Because detail extends the route rather than replacing it. The reader did not fail for want of material; they failed at a specific point on a specific path. More material puts more distance between the reader and the point, and it is the most common reason a second explanation lands worse than the first.

</div>
</details>

<details class="qa">
<summary>What if the original claim turns out to be wrong?</summary>
<div class="qa-body">

The skill stops and says so, rather than producing a clearer route to a wrong conclusion. That outcome is worse than the confusion it replaced, because a reader who could not follow the claim was at least not acting on it. Sometimes the confusion was the reader noticing the error before anyone else did.

</div>
</details>

<details class="qa">
<summary>Does it write anything to the repository?</summary>
<div class="qa-body">

No. The contract holds only the `read` verb, so the skill produces no file in the working tree. It reports a trace entry under the `repitch` kind, and the session that owns the trace appends it. If you want a durable record of the re-pitch, that entry is where it lives.

</div>
</details>

<details class="qa">
<summary>When does a re-pitch stop being the right tool?</summary>
<div class="qa-body">

After two failed attempts. At that point the gap is a missing prerequisite rather than wording, and no third route will close it. Name the prerequisite and teach that instead. The same applies when a single term keeps failing across many messages: define it once where the team's agents read it, rather than re-pitching it every time.

</div>
</details>

## It's working if

- The diagnosis names one of the four causes, and the second attempt visibly answers that cause.
- The re-pitch starts from something the reader had already said they understood, not from the beginning of the topic.
- The claim in the second version is the same claim as the first, and a reader comparing them can confirm that.
- No term appears in the re-pitch that the project had not already established.
- The second attempt is not longer than the first, because nothing was added to it.

If the second version is the first version with more detail attached, no diagnosis was made, and the same reader will fail at the same place.

## Where it fits

**Wait-what sits at the point of failure, not after it. The trigger is a person reading something and not following it, and the skill runs before the reflex to explain harder has a chance to fire.**

Its input is one quoted span and one stated floor. It produces no artifact, which is unusual in this catalog and deliberate: the output is a better explanation in the conversation where the confusion happened, plus a trace entry the session records. Nothing lands in the working tree, so there is no second document for a reader to reconcile against the first.

Its neighbors mark the boundaries of the tool. `teach` takes over when two re-pitches have failed and the gap turns out to be a prerequisite the reader never had. `brief` takes over when one term fails message after message, because a rule written where the team's agents read it fixes that once. And `handoff` is where a re-pitch often points back to, since a run record written from memory rather than from a trace is a reliable source of sentences that parse and do not land.
