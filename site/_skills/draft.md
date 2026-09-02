---
layout: skill
name: draft
title: "Draft: Prose That Names the Beat It Serves"
description: "Draft renders a settled outline into prose one beat at a time and records which beat each paragraph serves, so a piece's coverage of its outline is auditable rather than felt."
group: writing
invocation: user-invoked
scenario: "Writing QuenServe's internal explainer on how E1 offline inspection sync works, from a beat list that is already settled"
lens:
  novice:
    who: 'You have an outline you are happy with, a blank page under it, and a first paragraph you keep rewriting before the second one exists.'
    value: 'Draft has you write one beat at a time and note which beat each paragraph serves, so there is visible progress after ten minutes instead of after the whole piece.'
  practitioner:
    who: 'You write explainers other people have to support, and reviewers keep saying the piece reads evenly without being able to say which part is missing.'
    value: 'Every paragraph is written against one beat, tested by removal, and logged in a coverage map, so a reviewer can name the uncovered beat instead of a feeling.'
  leader:
    who: 'Your team ships documents whose gaps surface only when someone in support cannot answer the question the document existed to answer.'
    value: 'A draft arrives with the beats it covers and the beats it does not, so the gap is stated on the page before the document reaches the people who depend on it.'
  csuite:
    who: 'Explanatory writing across your organization is judged by taste, and taste does not transfer from the people who leave to the people who arrive.'
    value: 'Each draft carries a checkable record of what it covers, so the standard survives a change of author rather than living in one person’s judgment.'
---

## What it does

Draft is the render stage of the writing sequence. It takes an ordered beat list, writes one beat at a time, and records which beat each paragraph serves while the paragraph is being written. The record is the point. "A whole-piece pass produces even texture, and even texture is what makes writing forgettable" — SKILL.md's own reason for refusing to write a piece in one sitting, and the reason the coverage map is filled in as the prose lands rather than afterward.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Take one beat</span><span class="step-text">Read the ordered beat list, pick a single beat, and write that beat and nothing else in this pass.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Write paragraph by paragraph</span><span class="step-text">Never the whole piece at once — even texture gives the reader no signal about which sentence carries the weight.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Record coverage as you go</span><span class="step-text">Each paragraph is logged against the beat it serves at the moment it is written, not from memory later.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Vary the sentence lengths</span><span class="step-text">A run of same-length sentences flattens a passage, and a short sentence after three long ones lands.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Test by removal, then by ear</span><span class="step-text">Pull the paragraph out and read the beat without it; then read the beat aloud and mark every stumble.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Repair the seams, then trace</span><span class="step-text">One pass reads only the joins between beats, and the trace entry records covered, uncovered, and cut.</span></div>
</div>

<ul class="benefits">
  <li>Coverage of the outline becomes a record instead of a feeling: every paragraph names the beat it serves, and every beat with no paragraph is listed by name.</li>
  <li>A paragraph that survives the removal test is carrying its beat. One that does not is cut, and the cut is written down with the beat it failed to serve.</li>
  <li>Sentence length is varied on purpose rather than settling wherever the first pass left it, so the reader gets a signal about which sentence matters.</li>
  <li>A beat that needs a term the reader has never met goes back to <code>outline</code>, because prose cannot repair a grounding gap.</li>
  <li>The cost is stated rather than hidden: writing beat by beat leaves seams at the joins, and a final transition pass is what pays for it.</li>
</ul>

Draft ships one file. There is no reference library behind it, which is a fact about this skill rather than a gap: the discipline is nine procedure steps and five stop conditions, and it fits on one screen.

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/writing/draft/SKILL.md) carries the whole procedure, the stop conditions, and the output contract the coverage map is written to.
- [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only run record draft writes its `draft` entry into, alongside every other skill in this catalog.

The contract block in SKILL.md names `evidence` as this skill's thesis limb. That is the claim being made: the coverage map is an audit artifact a second reader can check, not a summary the writer produces about their own work.

## When to reach for it

Type `/draft` in Claude Code, or name the skill directly in a session. Draft is user-invoked, so nothing routes to it on its own. A person decides the outline is settled and the writing pass should start.

You reach for draft in four moments. `outline` has produced an ordered beat list and every term in it is grounded. A passage has to be rewritten because the beat behind it changed, so the prose is stale rather than wrong. A draft already exists and nobody on the team can say which beats it actually covers. Or you simply want prose, a first draft, or one section rewritten.

Draft is one of three skills in the writing sequence, and reaching for the wrong one wastes a session. This table separates its job from its neighbors:

| The problem | The skill |
|---|---|
| You do not yet know what you think about the subject, and no raw material exists to shape | [`freewrite`]({{ '/freewrite/' | relative_url }}) |
| Material exists, but nothing orders it, or a term gets used before the reader has met it | [`outline`]({{ '/outline/' | relative_url }}) |
| The finished piece has to be rendered as a branded page for an outside audience | [`press`]({{ '/press/' | relative_url }}) |

Install once, and every tool below reaches the same draft skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want draft can skip the rest of the catalog with `./scripts/link-skills.sh --skill draft`, which links this one skill into the default buckets. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Draft is user-invoked: type <code>/draft</code>, or name it in a session. Nothing routes to it automatically. The output is a prose file and a coverage map written into the repository, so the beat list and the draft sit side by side and can be read against each other in review.</p>
<div class="prompt-card">Here is the settled beat list for QuenServe's internal explainer on how E1 offline inspection sync works. The readers are the support engineers who will field questions about it. Write beat b1 only, record the beat each paragraph serves as you write it, and stop before b2.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Draft returns the paragraphs for b1 and the coverage entry for b1, then stops. It does not start b2 on its own.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for draft yet. The skill still reaches OpenCode through the shared catalog in <code>.agents/skills/</code>, so the conversation produces the same two artifacts a command would: the prose for the beat, and the coverage entry that names it.</p>
<div class="prompt-card">Read the beat list for the QuenServe offline explainer, then write beat b3 — the one covering conflict resolution in E1-F2. Leave every other beat alone. Tell me which paragraphs serve b3, and tell me what you cut and why.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode answers in the same conversation, reading the beat list as context. The cut list comes back with the prose, not after it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply draft as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees draft's name and description the way the other four tools do. For an existing draft with no coverage record, these three are the most common starting point, because mapping paragraphs to beats is a reading task before it is a writing one.</p>
<div class="prompt-card">This draft of the QuenServe offline explainer covers E1-F1 and E1-F2, but nobody can say what it covers overall. Map every existing paragraph to a beat from the beat list, then list every beat that has no paragraph behind it. Do not rewrite anything yet.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three return the map and the uncovered list first. Rewriting waits for a second ask, because a coverage gap may belong to <code>outline</code> rather than to the prose.</p>
</div>
</div>

A good ask includes:

- The ordered beat list from `outline`, with each beat stated as one move the reader makes rather than a topic or a heading.
- Who reads the piece and what they will do with it. The removal test needs a specific reader to be applied against.
- Which beat to write in this pass, or an instruction to take the beats one at a time in order.
- Any beat whose material is thin, so draft reports it as uncovered rather than filling it with prose that has nothing behind it.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }}). The piece is an internal explainer, "How QuenServe works offline," written for the support engineers who will answer questions about `E1` once it ships. The outline is settled. This is the writing pass. You type:

<pre><code>Here is the settled beat list for QuenServe's internal explainer on how E1
offline inspection sync works. The readers are the support engineers who will
field questions about it. Write beat b1 only, record the beat each paragraph
serves as you write it, and stop before b2.</code></pre>

The beat list `outline` handed over runs to seven beats. Each one is a single move the reader makes, and three of them are anchored to a feature of the epic:

<pre><code>b1  a lost signal is routine on an inspection site, not an incident
b2  where an inspection lives before it reaches the server        E1-F1
b3  what a sync conflict is, and why both answers are kept        E1-F2
b4  telling a conflict apart from a genuinely lost record
b5  what the sync status view shows, and what it does not         E1-F3
b6  which incoming support question maps to which feature
b7  what to do when the status view and the inspector disagree</code></pre>

Draft writes b1 and nothing else. Two paragraphs: one establishing that a warehouse interior and a rural site both drop signal as a matter of course, one establishing what that means for an inspector standing in front of a checklist. Both are logged against b1 as they are written. Then the pass stops, exactly as asked.

The second pass takes b2. Here is the paragraph that survived it:

<pre><code>An inspection that cannot reach the server does not wait in a queue somewhere
in the network. It is written to a store on the device itself, with a
client-generated identifier attached at the moment the inspector saves it.
That identifier is what makes the record findable later. Nothing else about
it is special.</code></pre>

Four sentences, and the last one is four words. That is deliberate: three explanatory sentences in a row, then a short one that closes the beat. A fifth sentence describing the retry schedule's backoff intervals was written and then cut. Removing it left b2 landing exactly as well, which is the removal test doing its job — the reader does not need a backoff interval to answer a support question, and the cut was recorded against b2 rather than quietly dropped.

The aloud pass caught something in b5. A sentence explaining what the sync status view leaves out ran to three clauses and a parenthesis, and it could not be read in one breath. A stumble is the reader's stumble arriving early, so the sentence was recast into two. Nothing was added.

By the end of the run, six of seven beats have prose behind them and one does not. Draft reports that rather than closing the run as complete:

<pre><code>piece: How QuenServe works offline
beats: 7
coverage:
  - beat: b1
    move: the reader accepts a lost signal as routine, not an incident
    paragraphs: [1, 2]
  - beat: b2
    move: the reader can say where an inspection lives before it syncs
    paragraphs: [3, 4]
  - beat: b5
    move: the reader knows the limits of what the status view reports
    paragraphs: [9, 10]
  - beat: b7
    move: the reader knows what to do when the view and the inspector disagree
    paragraphs: []
uncovered: [b7]
cut:
  - paragraph: "The retry schedule backs off..."
    reason: b2 - a mechanism the reader does not need to answer a support question
seams: b2/b3 and b4/b5 repaired in the transition pass; the rest read clean
open: b7 needs an agreed support procedure, which does not exist yet</code></pre>

b7 is uncovered for a reason worth naming. The beat asks what a support engineer should do when the sync status view and the inspector disagree about whether a record arrived. Nobody has decided that yet. Writing the beat anyway would have produced confident prose over an open question, which is the failure this stage exists to prevent, so b7 goes back to the team as an open item and the run does not report itself finished.

## What good looks like

The difference between the two sides below is not writing quality. It is whether a second reader can check the claim that the draft covers its outline.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A paragraph that earns its place</div>
<pre><code><span class="tok-ok">BEAT:</span> b3 - the reader learns both answers are kept
<span class="tok-ok">PARAGRAPHS:</span> 7, 8
<span class="tok-ok">REMOVAL TEST:</span> b3 no longer lands without paragraph 7
<span class="tok-ok">RECORDED:</span> at the moment the paragraph was written</code></pre>
<div class="compare-card-note">One beat, named paragraphs, and a removal test a reviewer can repeat. The record was written during the pass, so it says what happened rather than what the writer recalls.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">METHOD:</span> write the whole piece, then map the beats
<span class="tok-comment">No paragraph-level record while writing</span>
<span class="tok-comment">&larr; A map made afterward records what the writer remembers.</span></code></pre>
<div class="compare-card-note">SKILL.md names this directly: a table filled in afterward records memory, which is the thing this stage exists to replace with a record. Even texture is the other symptom.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why write one beat at a time instead of drafting the whole piece and editing after?</summary>
<div class="qa-body">

Because a whole-piece pass produces even texture. Every paragraph comes out at the same weight and the same length, and the reader gets no signal about which sentence carries the argument. Working one beat at a time keeps the writer's attention on a single move the reader makes, which is what lets a paragraph be judged and cut.

</div>
</details>

<details class="qa">
<summary>Does writing beat by beat leave visible seams between the beats?</summary>
<div class="qa-body">

Yes. That is the honest cost of the method, and SKILL.md treats it as one. Step 8 is a single pass over the whole piece that reads only the joins and repairs them, leaving the texture inside each beat alone. In the QuenServe example, two joins needed work and the rest read clean. If that pass starts rewriting content rather than joins, it stops — content changes belong in a fresh pass over the beat itself.

</div>
</details>

<details class="qa">
<summary>Can the coverage map be filled in at the end of the run?</summary>
<div class="qa-body">

No, and this is the point on which the skill is least flexible. A table completed afterward records what the writer remembers about their own work, which is exactly the thing the stage exists to replace with a record. Recorded during the pass, the map is evidence. Recorded after it, the map is a summary.

</div>
</details>

<details class="qa">
<summary>What happens when a beat needs a term the reader has never met?</summary>
<div class="qa-body">

Draft stops and returns to `outline`. Prose cannot repair a grounding gap: explaining the term inside the beat that needs it either derails the beat or hides the problem. Grounding is `outline`'s job, and it has a step for exactly this — walking the beats in order and confirming an earlier beat introduced every term a later one leans on.

</div>
</details>

<details class="qa">
<summary>What if one beat keeps growing past a few paragraphs?</summary>
<div class="qa-body">

A beat that runs past roughly four paragraphs is carrying two moves rather than one. The fix is structural, so it goes back to `outline` to be split, rather than being solved by tighter writing. Length is the symptom here, not the problem.

</div>
</details>

<details class="qa">
<summary>Is there a script or a command that runs draft?</summary>
<div class="qa-body">

No. Draft has no script; its output is written prose plus a coverage map, not a command's return value. Only Claude Code reaches it through a slash command, and that comes from the shared skill install rather than an adapter this repository ships for the skill.

</div>
</details>

<details class="qa">
<summary>Does anything route to draft automatically?</summary>
<div class="qa-body">

Not today. Draft is user-invoked, and no router in this catalog names it. `outline` hands its beat list to draft as the next stage, but a person still decides that the outline is settled and starts the writing pass.

</div>
</details>

## It's working if

- Every paragraph in the piece can be traced to one beat, and the trace was recorded while the paragraph was written.
- Every beat with no paragraph behind it appears on the uncovered list, by name, instead of being absorbed into a general sense that the piece is nearly done.
- A cut paragraph is recorded with the beat it failed to serve, so a later reader can see what was considered and rejected.
- Sentence length inside a beat varies on purpose, and the passage has at least one short sentence that lands after longer ones.
- The transition pass reports which joins it repaired, or reports that none needed repair.

If a run ends with every beat marked covered and nothing cut, the discipline probably did not run. Some material always fails to serve a beat, and a run that found none is more likely to have skipped the removal test than to have started from a perfect outline.

## Where it fits

**Draft is the third and final stage of the writing sequence: freewrite explores, outline structures, draft renders.**

[`freewrite`]({{ '/freewrite/' | relative_url }}) pulls raw fragments out of the author with no structure imposed. [`outline`]({{ '/outline/' | relative_url }}) turns those fragments into an ordered list of beats, grounds every term, and puts a cut list to the author as a gate. Draft takes that beat list and writes it into prose, one beat at a time, and reports what it covered.

The sequence runs one direction, and the return path matters as much as the forward one. A beat with no material behind it goes back to `freewrite`, because supplying the material inside the draft produces a piece that sounds like nobody. A beat that leans on an ungrounded term, or one that turns out to carry two moves, goes back to `outline`. Draft repairs neither problem in prose, and its stop conditions say so directly.

The [writing group]({{ '/group/writing/' | relative_url }}) ships this sequence and nothing else so far. Editorial review of architecture decision records, and a documentation-quality check that enforces this repository's own explainer voice, remain planned rather than promoted. Draft, freewrite, and outline cover the act of writing a piece. Reviewing one is still direction, not practice.
