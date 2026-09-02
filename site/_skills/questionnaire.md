---
layout: skill
name: questionnaire
title: "Questionnaire: Questions for the One Person Who Can Answer"
description: "Questionnaire turns a decision a run cannot settle into written questions for the one named person who can, ordered by cost and marked blocking or nice to have."
group: productivity
invocation: user-invoked
scenario: "Asking QuenServe's operations lead which inspector's edit wins when two offline edits collide, under feature E1-F2"
lens:
  novice:
    who: 'You are stuck on something you cannot look up, because the answer lives in another person''s head rather than in the code or the documents.'
    value: 'Questionnaire asks you about the recipient and the decision instead of about the topic, then writes questions that person can answer without you in the room.'
  practitioner:
    who: 'You send stakeholders questions and get back short, polite answers that settle nothing, so the run stays blocked.'
    value: 'Every question states why it is asked and what turns on the answer, and each one is marked blocking or nice to have, so a recipient who answers only three answers the right three.'
  leader:
    who: 'Decisions on your team wait on stakeholders who are asked vaguely and therefore answer slowly.'
    value: 'Each questionnaire names one recipient, one decision, one deadline, and the default that will be taken without a reply. The default usually raises the reply rate more than the questions do.'
  csuite:
    who: 'You are often the person one of these questionnaires is addressed to.'
    value: 'You receive a page that says what turns on your answer and what happens if you do not send one, cheapest questions first, rather than an open invitation to review a document.'
---

## What it does

Questionnaire converts a decision a run cannot settle into a written set of questions addressed to one named person. It is user-invoked, because only a person knows that the missing piece is knowledge someone else holds rather than work the session can do.

The distinctive move is what the skill interrogates. It grills you about the send, not about the subject. Who is the recipient. What do they know that you do not. What decision do the answers unblock. What happens if they never reply. Questioning you about the topic itself is the one thing that cannot work here, because not knowing the topic is the reason the questionnaire exists at all.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Interrogate the send</span><span class="step-text">Questions about the recipient, the decision, and the deadline. Not questions about the topic, which is what you cannot answer.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Name the recipient</span><span class="step-text">One person, with a role, before a single question is written. "The team" is an address nobody answers.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Set the boundary</span><span class="step-text">What does that person know that you do not. Anything outside that answer belongs in your own analysis, not in their inbox.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">State the decision</span><span class="step-text">One sentence naming what the answers unblock. A question that changes no decision is curiosity at someone else's cost.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">State the default</span><span class="step-text">The date the decision gets made anyway, and what will be decided with no reply. This becomes the closing line.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Choose the channel</span><span class="step-text">An asynchronous questionnaire has to survive without you in the room. A meeting version can lean on discussion, but still goes out ahead.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Write each question alone</span><span class="step-text">One thing asked, readable without the conversation, with the reason it is asked and what turns on the answer.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Close the space only where it is closed</span><span class="step-text">Offer concrete options the recipient can tick. Leave a question open where the space is genuinely open.</span></div>
  <div class="step"><span class="step-num">9</span><span class="step-label">Order and mark</span><span class="step-text">Cheapest to answer first, then each question marked blocking or nice to have. Append the trace entry and hand back the path.</span></div>
</div>

<ul class="benefits">
  <li>The recipient is one named person with a role, decided before any question is drafted, so the questionnaire has an address rather than a distribution list.</li>
  <li>Each question carries its own context, so it can be answered by someone who was never in the session and will not read the thread behind it.</li>
  <li>The blocking marking triages the questionnaire for a busy reader. A recipient who answers the first three and stops has still unblocked the decision.</li>
  <li>The stated default gives the recipient a reason to reply now. Objecting to a decision that is about to be made is easier than composing an answer from nothing.</li>
  <li>Sending is left to you. The skill writes the document and returns the path, because deciding when a stakeholder gets asked is not an agent's call.</li>
</ul>

Questionnaire ships as a single `SKILL.md` with no sibling documents of its own. It writes the questionnaire to the scope directory as `.grit/&lt;scope&gt;/QUESTIONS.md`, and appends one entry to the trace defined in [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md): the recipient, the decision blocked, the count of blocking questions, and the reply deadline.

## When to reach for it

Type `/questionnaire` in Claude Code, or name the skill directly in a session. Questionnaire is user-invoked, so nothing routes to it on its own.

You reach for it in five moments. A run is blocked on a fact only one named person holds. A decision needs a stakeholder's input and the stakeholder is not in the session. A meeting is already on the calendar, and the time will be spent poorly without written questions sent ahead. You ask for a questionnaire, an intake form, a list of questions, or a stakeholder interview. Or questioning you about the topic has stalled, because the answers sit outside what you know.

Questionnaire is not the only skill that produces a written document at a pause in the work. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The gap is a missing record of the run, not a decision only another person can settle | [`handoff`]({{ '/handoff/' | relative_url }}) |
| The idea is yours and needs pressure, not somebody else's knowledge | [`grill`]({{ '/grill/' | relative_url }}) |
| What "done" means has not been written down, so there is no gate for an answer to unblock | [`grit`]({{ '/grit/' | relative_url }}) |
| You are not sure which skill fits at all, on the engineering side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| You are not sure which skill fits at all, on the product side | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

Install once, and every tool below reaches the same questionnaire skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want this skill can skip the rest of the catalog with `./scripts/link-skills.sh --skill questionnaire`, which links it into the default buckets without pulling in the rest of the productivity group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Questionnaire is user-invoked: type <code>/questionnaire</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>. The session then asks you about the send, and writes the document into the scope directory beside the trace and the gate ledger.</p>
<div class="prompt-card">QuenServe feature E1-F2 is blocked. When two inspectors edit the same inspection offline, which edit wins is an operations rule, not an engineering choice, and I cannot answer it. The recipient is Maya Okonjo, operations lead for field inspections. Ask me about the send, not about conflict resolution, then write the questionnaire.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code answers with the path it wrote to, the count of blocking questions, and any question it cut because you could answer it yourself.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for questionnaire yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The result is still a written file in the scope directory, not a command's return value.</p>
<div class="prompt-card">I need questions for one person before Thursday's review of QuenServe E1-F2. Do not ask me how conflicts should resolve; that is the thing I am asking her. Ask me who she is, what she knows that I do not, what decision this unblocks, and what we ship if she never replies. Then order the questions cheapest first.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the document and reports back if no single recipient can be named, since a questionnaire addressed to nobody is never returned.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply questionnaire as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees the skill's name and description the way the other four tools do. All three need the story text open as context, because the boundary of the questionnaire is drawn from what the work already settled.</p>
<div class="prompt-card">Write a questionnaire for Maya Okonjo, operations lead, covering QuenServe stories E1-F2-S1 and E1-F2-S2. Mark every question blocking or nice to have, and offer tick-box options only where the choice is genuinely closed. State the default we will ship on 11 September if no answer arrives.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation and write the file, reading the stories as context since no installed command exists here to parse them first.</p>
</div>
</div>

A good ask includes:

- The name and role of the one person who can answer, or a request for help working out who that is.
- The decision the answers unblock, even in rough form, so questions that change nothing can be cut.
- The date the decision has to be made regardless, and what you will do if no reply arrives.
- Whether the answers come back in writing or in a meeting, since an asynchronous questionnaire has to carry its own context.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every page on this site returns to. Under epic E1, feature E1-F2 covers conflict resolution: reconciling what happened when two people touched the same inspection record while disconnected. Two stories sit under it. E1-F2-S1 says two inspectors edit the same inspection offline and neither answer is silently dropped. E1-F2-S2 says a sync conflict surfaces for a person to resolve. The run is blocked on one point. Engineering can implement any resolution rule. Which rule is correct is a business decision about how field inspection actually works, and the operations lead owns it. You type:

<pre><code>QuenServe feature E1-F2 is blocked. When two inspectors edit the same
inspection offline, which edit wins is an operations rule, not an
engineering choice, and I cannot answer it. The recipient is Maya
Okonjo, operations lead for field inspections. Ask me about the send,
not about conflict resolution, then write the questionnaire.</code></pre>

The session does not ask you a single question about merge strategies. It asks four questions about the send, and one of the answers changes the shape of the document:

<pre><code>Recipient: one person, with a role?
&rarr; Maya Okonjo, operations lead for field inspections.

What does she know that you do not?
&rarr; How inspectors actually share sites, and which answer her team
   treats as authoritative today when two reports disagree.

What decision do her answers unblock?
&rarr; The resolution rule E1-F2-S1 implements, and whether E1-F2-S2
   needs a review queue at all.

What happens if she never replies?
&rarr; We ship on 11 September with later-submission-wins and log every
   collision. That default now closes the questionnaire.</code></pre>

The document it writes puts the cheapest question first and marks each one:

<pre><code># Questions: QuenServe conflict resolution (E1-F2)

Recipient: Maya Okonjo, operations lead for field inspections
Decision:  which edit wins when two inspectors' offline edits to the
           same inspection collide
Needed by: 11 September
If no reply: we ship later-submission-wins and log every collision for
           review. Object rather than answer if that is wrong.

Q1 &middot; blocking &middot; about a minute
Do two inspectors ever work the same inspection on purpose, or is that
always a mistake?
Why: if it is always a mistake, the product should prevent the collision
rather than resolve it, and E1-F2-S1 becomes a smaller story.
  [ ] on purpose, routinely  [ ] on purpose, rarely  [ ] always a mistake

Q2 &middot; blocking &middot; about two minutes
When two inspectors give different answers to the same checklist item,
whose answer should stand?
Why: this is the rule the sync code applies with nobody watching.
  [ ] the more senior inspector   [ ] the one assigned to the site
  [ ] the later submission        [ ] neither &mdash; hold both for a person

Q3 &middot; nice to have &middot; longer
How often does this happen today, and how does your team resolve it now?
Why: sets whether E1-F2-S2's review queue sees one case a week or fifty.
</code></pre>

Q2 offers options because the space is genuinely closed: an implementable rule has to pick one of those four. Q3 is left open because a forced choice there would return a number wearing the appearance of a measurement. The output contract records the whole send:

```yaml
recipient: Maya Okonjo, operations lead for field inspections
channel: async
decision: Which edit wins when two inspectors' offline edits to the same inspection collide.
deadline: 11 September
default: Later submission wins, and every collision is logged for review.
questions:
  - id: Q1
    ask: Do two inspectors ever work the same inspection on purpose, or is that always a mistake?
    why: If it is always a mistake, the product prevents the collision instead of resolving it.
    options: [on purpose routinely, on purpose rarely, always a mistake]
    blocking: true
    cost: low
  - id: Q2
    ask: When two inspectors give different answers to the same checklist item, whose answer should stand?
    why: This is the rule the sync code applies with nobody watching.
    options: [more senior inspector, assigned inspector, later submission, hold both for a person]
    blocking: true
    cost: low
  - id: Q3
    ask: How often does this happen today, and how does your team resolve it now?
    why: Sets whether the review queue in E1-F2-S2 handles one case a week or fifty a day.
    blocking: false
    cost: high
blocking_count: 2
document: .grit/E1-F2/QUESTIONS.md
```

One question was cut on the way. The draft had asked whether the tablet clocks can be trusted, and you already knew the answer: the fixture showed forty seconds of drift. Asking a recipient what the sender already knows spends attention that the remaining questions need.

## What good looks like

The difference shows up inside a single question. Both of these were written to ask Maya the same thing.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A question that survives the send</div>
<pre><code><span class="tok-ok">Q2 &middot; blocking &middot; about two minutes</span>
When two inspectors give different answers to
the same checklist item, whose answer should
stand?
<span class="tok-ok">Why:</span> this is the rule the sync code applies
with nobody watching.
  [ ] more senior   [ ] assigned to the site
  [ ] later submission   [ ] hold for a person</code></pre>
<div class="compare-card-note">It asks one thing, reads without the conversation behind it, says what turns on the answer, and closes a space that is genuinely closed. A recipient with two minutes can finish it.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Any thoughts on the conflict resolution</span>
<span class="tok-warn">approach we discussed? Also curious how you</span>
<span class="tok-warn">see the offline story generally.</span>
<span class="tok-comment">&larr; three questions wearing one question mark</span>
<span class="tok-comment">&larr; "we discussed" &mdash; she was not there</span>
<span class="tok-comment">&larr; no stake, no marking, no deadline</span></code></pre>
<div class="compare-card-note">This returns a polite paragraph and no rule. Nothing in it tells the recipient which part actually blocks the work, so the reply optimizes for being pleasant rather than usable.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why does it refuse to ask me about the topic?</summary>
<div class="qa-body">

Because not knowing the topic is the reason the questionnaire is being written. Pressing you on conflict-resolution rules would produce your guess, and your guess is exactly what the send is meant to replace. The questions that shape a questionnaire are about the recipient, the decision, and the deadline, all of which you do know.

</div>
</details>

<details class="qa">
<summary>What if no single person can be named as the recipient?</summary>
<div class="qa-body">

The skill stops and asks you to resolve that first. A questionnaire addressed to a group is answered by nobody in particular, and usually by nobody at all. If two people genuinely split the decision, that is two questionnaires with two boundaries, not one document sent twice.

</div>
</details>

<details class="qa">
<summary>Why does stating the default raise the reply rate?</summary>
<div class="qa-body">

It changes what the recipient is being asked to do. Composing an answer from nothing is expensive. Objecting to a decision that is about to be made is cheap, and it carries a deadline the recipient can see. The closing line also makes the questionnaire honest: the work does not stop while the inbox is quiet.

</div>
</details>

<details class="qa">
<summary>What if every question looks blocking?</summary>
<div class="qa-body">

Then the ranking has not been done yet, and the skill sends it back for re-ranking. When everything is marked blocking, nothing is triaged, and a busy recipient who answers the first three is guessing which three matter. The marking exists to make that guess unnecessary.

</div>
</details>

<details class="qa">
<summary>Should every question offer options?</summary>
<div class="qa-body">

No. Options are for a space that is genuinely closed, where an implementable answer has to be one of a short list. A forced choice over an open space returns a wrong answer that looks like a decision, which is worse than an open question, because nobody can tell afterward that the space was wider than the list.

</div>
</details>

<details class="qa">
<summary>Does the skill send the questionnaire?</summary>
<div class="qa-body">

No. It writes the document to the scope directory and hands you the path. Choosing when a named stakeholder gets asked, and through which channel, is a judgment about people rather than about the work, so it stays with you.

</div>
</details>

## It's working if

- The recipient answers without asking a clarifying question first, because every question carried its own context.
- A recipient who answers only the first three questions has still unblocked the decision, because the marking put the right three first.
- No question in the document is one you could have answered yourself from the repository or the tracker.
- The reply arrives before the deadline, or the recipient objects to the stated default, which is also an answer.
- The decision named in the document actually moves when the answers come back.

If the returned answers are pleasant and the decision is still open, the questionnaire asked about the subject rather than about the send.

## Where it fits

**Questionnaire sits at a boundary the run cannot cross on its own: a decision that belongs to a person who is not in the session.**

Its neighbor in the same group is `handoff`, and the split is what is missing. Handoff is for a gap in the record — the run happened, and the next reader was not there for it. Questionnaire is for a gap in authority: the record is complete, and the answer was never anyone in the room's to give. One projects what a session already knows, the other goes and gets what it does not.

It also runs opposite to `grill`, which questions you about your own idea until the idea is sharper. Both are structured interrogation. Grill points at the user's thinking, questionnaire points at the send, and reaching for grill when the knowledge sits outside the room produces a well-pressured guess. The answers that come back land as evidence against the gate `grit` holds, which is where the decision was blocked in the first place.
