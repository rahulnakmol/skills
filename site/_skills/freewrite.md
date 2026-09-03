---
layout: skill
name: freewrite
title: "Freewrite: Material Before Judgment"
description: "Freewrite interviews the author for raw fragments before a piece has any shape, holding generation apart from judgment and keeping contradictions instead of settling them."
group: writing
invocation: user-invoked
scenario: "Gathering the raw material for QuenServe's internal explainer on how epic E1 keeps working with no signal"
lens:
  novice:
    who: "You have a subject, a blank file, and a habit of deleting each sentence about as fast as you write it."
    value: "Freewrite asks you questions and writes your answers down, so the file fills with your own material before anyone decides whether it is any good."
  practitioner:
    who: "You write explainers often, and the ones that stall are the ones where the thinking underneath was thinner than the plan suggested."
    value: "Gathering is separated from judging, so a thin subject shows up while the file is still fragments rather than three sections into a draft."
  leader:
    who: "Documents from your team read as though anyone could have written them, because the person who knew the subject was edited out of the first pass."
    value: "Fragments are captured in the author's own words, so the finished piece carries the phrasing of the person who actually knows the subject."
  csuite:
    who: "What your organization understands about its own products sits in a few people's heads and reaches paper in a thin, generic form."
    value: "An interview that records contradictions rather than settling them surfaces a disagreement early, while looking into it is still cheap."
---

## What it does

Freewrite is the first of the writing group's three stages. It pulls raw material out of the author before the piece has any shape, and it keeps that material unsorted and unjudged so a later stage has something real to work with. The reason is stated in SKILL.md in one line: editing while generating kills material before it exists, because the inner critic and the generator cannot run at the same time, and the critic is faster.

The stage is deliberately narrow. It does not organize, it does not write prose, and it does not rank what it captures. One sentence at the top of the file names the subject, and that sentence is the only structure this stage allows.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Name the subject</span><span class="step-text">One sentence at the top of the fragment file. Nothing else here is structure, and nothing else is allowed to become structure.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Suspend judgment</span><span class="step-text">Tell the author that nothing captured will be judged, then hold to it for the whole session. A single correction restarts the critic.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Interview, do not supply</span><span class="step-text">Ask what surprised them, what they would argue with, what a named reader would object to, and which example they keep returning to.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Capture the words as spoken</span><span class="step-text">Half-thoughts, examples, objections, and a phrase that sounds right but is not yet earned, each labeled with its kind.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Keep the contradictions</span><span class="step-text">Record both sides, label the pair, and move on. A contradiction is usually where the real idea is hiding.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Push past the first answers</span><span class="step-text">The first three responses are usually the ones the author has already said out loud. The material worth having sits behind them.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Stop when the well runs dry</span><span class="step-text">Three questions in a row returning nothing closes the file. A quota would produce filler, and filler costs the next stage time.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Hand over unsorted</span><span class="step-text">Append the trace entry, then pass the fragment file to <code>outline</code> without grouping or ranking any of it.</span></div>
</div>

<ul class="benefits">
  <li>The generator runs without the critic beside it, so a half-formed thought reaches the file instead of being cut in the second before it is written down.</li>
  <li>A contradiction survives to the next stage. Resolving one here settles a question before the evidence is in, and the losing side is usually the interesting one.</li>
  <li>A phrase the author likes but has not earned is kept and marked as unproven, so the next stage can either pay for it or drop it on purpose.</li>
  <li>The words in the file are the author's, which is what makes the finished piece sound like a person rather than like a generic explainer.</li>
  <li>The session ends when the questions stop producing anything new, so nobody writes to a count and nobody mistakes filler for material.</li>
</ul>

Freewrite ships as a single `SKILL.md` with no sibling documents of its own. The doctrine it depends on sits one group over: [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only trace and its five fields. Freewrite writes one entry before it finishes, naming the subject sentence, how many fragments were captured, which contradictions were kept, and which questions returned nothing.

## When to reach for it

Type `/freewrite` in Claude Code, or name the skill directly in a session. Freewrite is user-invoked, so nothing routes to it on its own: a person decides that a piece needs material before it needs a shape.

You reach for freewrite in four moments. The author has a subject and no draft, and needs to find out what they actually think about it. A draft has stalled because the material underneath it is thin, and more structure will not repair that. The piece has to sound like a particular person, so the raw phrasing has to come from that person rather than from an agent. Or the user simply asks to brainstorm, to freewrite, or to dump notes before writing anything.

Freewrite is not the only skill that puts words in a file. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The material already exists, and what it needs is an order rather than more of it | [`outline`]({{ '/outline/' | relative_url }}) |
| An ordered beat list exists and needs to be written into prose | [`draft`]({{ '/draft/' | relative_url }}) |
| The facts have to come from primary sources rather than from the author's memory | [`research`]({{ '/research/' | relative_url }}) |
| A finished document needs to be rendered as a branded page for outside readers | [`press`]({{ '/press/' | relative_url }}) |

Install once, and every tool below reaches the same freewrite skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want freewrite can skip the rest of the catalog with `./scripts/link-skills.sh --skill freewrite`, which links just this skill into the default buckets without pulling in the rest of the writing group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Freewrite is user-invoked: type <code>/freewrite</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>, and the session becomes an interview. The output is a fragment file written into the repository, not a reply in the conversation.</p>
<div class="prompt-card">I have to write an internal explainer on how QuenServe keeps working when a phone has no signal, for the people who will support epic E1 in the field. Nothing is planned yet. Interview me, capture my answers in my own words, and do not organize or improve any of it. If two of my answers disagree, keep both and tell me which pair.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Freewrite answers with the path it wrote to, the number of fragments captured, the contradictions it kept, and the questions that returned nothing.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for freewrite yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The interview still ends in a written file rather than a return value.</p>
<div class="prompt-card">Ask me questions about how QuenServe handles offline inspection capture until I run out of answers. Write down exactly what I say, label each fragment as a half-thought, an example, an objection, or a phrase I have not earned yet, and stop asking when three questions in a row give you nothing new.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode keeps capturing until the questions run dry, and reports which ones produced nothing so the author knows where the subject is thin.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply freewrite as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees freewrite's name and description the way the other four tools do.</p>
<div class="prompt-card">I am gathering material for a piece about QuenServe offline sync. Ask me what surprised me, what I would argue with, and what a support engineer would object to. Push past my first three answers each time, because those are the ones I have already said out loud. Capture, do not edit.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation and write the fragment file, since no installed command exists here to run the interview for them.</p>
</div>
</div>

A good ask includes:

- The subject in one sentence, and the reader the piece is eventually for.
- A statement that the author has first-hand material on the subject, because supplying it from outside produces a piece that sounds like nobody.
- Permission to keep the file messy, so an agent trained to tidy does not quietly start grouping.
- The examples the author keeps returning to, since a repeated example is usually a beat waiting to be found.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every page on this site returns to. An engineer who worked on epic E1, offline inspection sync, has to write an internal explainer so the people who will support the feature understand it. Nothing is structured yet, and there is no draft. You type:

<pre><code>I have to write an internal explainer on how QuenServe keeps working when a
phone has no signal, for the people who will support epic E1 in the field.
Nothing is planned yet. Interview me, capture my answers in my own words,
and do not organize or improve any of it. If two of my answers disagree,
keep both and tell me which pair.</code></pre>

Freewrite opens the file with the subject sentence and then asks questions. The first three answers to "what do people get wrong about this" repeat what the release note already says, so the interview keeps going. The fourth answer is the one worth having, and it arrives as a complaint rather than as an explanation.

The fragment file it produces follows the output contract:

```yaml
subject: How QuenServe keeps a finished inspection safe when the phone has no signal, for the people who will support it in the field.
fragments:
  - id: f2
    text: Offline is the normal case for this product, not an error state. A warehouse has no signal and it never will.
    kind: half-thought
  - id: f4
    text: The record gets its identity on the device. The server never mints one, so a queued inspection keeps the same name from capture through ingestion.
    kind: half-thought
  - id: f6
    text: The one I keep telling people is the inspector on the rural site who finished eleven inspections in a dead zone and drove home before anything sent.
    kind: example
  - id: f7
    text: A supervisor will ask which inspector's answer won when two of them edited the same record. E1-F2 does not answer that on its own, and I think support will get that call first.
    kind: objection
  - id: f9
    text: The queue is honest about what it has not sent yet.
    kind: unearned-phrase
  - id: f11
    text: Every support call I have listened to opens with telling the inspector to walk outside and find a signal.
    kind: example
contradictions:
  - pair: [f2, f11]
    about: whether offline is the normal case the product is built around, or the condition support is trained to end as fast as possible
dry: what the sync protocol guarantees about ordering; how long a queued record can sit before anything expires
open: the actual retry interval, which the author said he would have to look up
```

The pair marked as a contradiction is the part of this file worth the session. Fragment f2 states the design intent behind E1, and f11 reports what support actually does, and both are true. Nothing here decides between them. Resolving that pair now would settle the question before anyone has looked at the call recordings, and the disagreement is exactly what the next stage needs.

Three moments in the session are worth naming. The author asked, twice, to group the fragments about E1-F1 offline capture together; freewrite answered that ordering belongs to `outline` and kept capturing. Fragment f9 arrived sounding finished, so it was kept and marked as an unearned phrase rather than extended into a sentence. And two questions produced nothing at all, which is recorded in the `dry` field instead of being filled in by the agent.

The file is handed to `outline` exactly as it stands. It is not sorted, the contradiction is unresolved, and nothing in it has been ranked.

## What good looks like

The difference between capture and quiet editing shows up fragment by fragment. Both of these come from the same answer in the same interview.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A fragment captured as spoken</div>
<pre><code><span class="tok-ok">f11:</span> Every support call I have listened to
     opens with telling the inspector to
     walk outside and find a signal.
<span class="tok-ok">kind:</span> example
<span class="tok-ok">contradiction:</span> pair [f2, f11], kept</code></pre>
<div class="compare-card-note">The words are the author's, the kind is labeled, and the disagreement with f2 is recorded rather than settled. The next stage inherits both sides and a live question.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">f11:</span> Support guidance should be updated to
     reflect that offline operation is the
     expected mode.
<span class="tok-comment">Rewritten into prose, contradiction resolved</span>
<span class="tok-comment">&larr; the critic ran while the generator was working</span></code></pre>
<div class="compare-card-note">The observation has been smoothed into a recommendation nobody made, and the tension with f2 has quietly disappeared. What is lost cannot be recovered later, because the original wording is gone.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why not fix an obvious error while it is being captured?</summary>
<div class="qa-body">

Because the correction is what stops the next fragment. SKILL.md is direct about the mechanism: the critic and the generator cannot run at the same time, and the critic is faster. A single correction mid-interview tells the author that the file is being judged after all, and the answers get shorter from that point on. Errors are cheap to fix in a later stage, and an answer that was never given is not recoverable at all.

</div>
</details>

<details class="qa">
<summary>What if the author asks for the fragments to be organized?</summary>
<div class="qa-body">

Freewrite says that ordering belongs to `outline` and keeps capturing. This is one of its stop conditions rather than a matter of preference. Grouping mid-interview commits the piece to a shape before the material is all present, and the fragments that would have contradicted the shape tend not to get written down once the shape exists.

</div>
</details>

<details class="qa">
<summary>What if a fragment arrives already shaped as finished prose?</summary>
<div class="qa-body">

It is kept as a fragment and not extended. A polished sentence at this stage commits the piece to a structure nobody has chosen yet, and the sentence carries authority its evidence has not earned. If it sounds right without being proven, it is marked as an unearned phrase so a later stage can either pay for it or drop it deliberately.

</div>
</details>

<details class="qa">
<summary>How does the session know when to stop?</summary>
<div class="qa-body">

Three questions in a row that return nothing new close the file. There is no target count, because a quota produces filler, and filler is indistinguishable from material until the next stage has already spent time on it. A short file that ran dry is a finished session, not a failed one.

</div>
</details>

<details class="qa">
<summary>What if the author has no first-hand material on the subject?</summary>
<div class="qa-body">

Freewrite stops and says so. An agent can supply plausible material about almost any subject, and the result is a piece that sounds like nobody in particular. When the facts have to come from outside the author's head, `research` is the skill that gathers them from primary sources and cites them, and it is a different job from this one.

</div>
</details>

<details class="qa">
<summary>How is this different from asking an agent to brainstorm the subject?</summary>
<div class="qa-body">

The difference is who generates. A brainstorm asks the agent to produce ideas about the subject, and the ideas come back fluent, general, and unattributable. Freewrite asks the questions and the author answers them, so the file holds one person's observations, complaints, and examples. That is what a later reader recognizes as a voice, and it is not something an agent can supply on the author's behalf.

</div>
</details>

<details class="qa">
<summary>Does a router send requests here automatically?</summary>
<div class="qa-body">

No. Freewrite is user-invoked, and neither `ask-fde` nor `ask-pm` names the writing group today. That fits the stage: an agent cannot tell that a person is ready to be interviewed, and an interview nobody agreed to is an interruption. A person recognizes the moment and names the skill.

</div>
</details>

## It's working if

- The file holds material the author had not said out loud before the session started, not a tidier version of the release note.
- At least one contradiction is recorded as a pair, with both sides intact and neither marked as the correct one.
- The wording in the fragments is recognizably the author's, including the phrasing an editor would flatten.
- The session ended because the questions stopped producing anything, and the questions that produced nothing are written down.
- Nothing in the file is grouped, ranked, or shaped into prose, so `outline` inherits raw material rather than a structure it did not choose.

If the fragments read as an even, well-ordered set of statements, the critic was running during capture, and the material that would have disagreed with the shape never reached the page.

## Where it fits

**Freewrite is the first of the writing group's three stages: freewrite explores, [`outline`]({{ '/outline/' | relative_url }}) structures, and [`draft`]({{ '/draft/' | relative_url }}) renders.**

The sequence exists because each stage fails differently when it is merged with its neighbor. Merging exploration into structure kills material before it exists. Merging structure into rendering produces prose whose author cannot say what any paragraph is for. Freewrite therefore hands over a file that is deliberately unfinished: fragments, labeled kinds, kept contradictions, and a list of questions that returned nothing.

Its output is `outline`'s input, and its own return path runs backward from both later stages. When `outline` finds a beat with no material behind it, and when `draft` finds a beat it cannot write, the answer in both cases is another freewrite session on that narrow subject rather than an agent filling the gap.

Its nearest neighbor outside the group is `research`, in core. The split is where the material comes from: research answers a question from primary sources and cites them, while freewrite draws on what one person already knows and keeps their words intact.
