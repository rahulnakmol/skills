---
layout: skill
name: outline
title: "Outline: Beats, Not Headings"
description: "Outline turns raw fragments into an ordered set of beats, grounds every term before a beat leans on it, and hands the author an explicit cut list to decide."
group: writing
invocation: user-invoked
scenario: "Ordering the fragments about QuenServe epic E1 into the beats of an internal explainer support engineers can follow"
lens:
  novice:
    who: "Your document is a list of statements that are each true, and readers still tell you they got lost somewhere in the middle."
    value: "Outline turns the pile into a sequence of moves the reader makes, and checks that every word you rely on was explained before you leaned on it."
  practitioner:
    who: "You can tell a piece is not landing, and rewriting the sentences never fixes it because the problem sits above the sentences."
    value: "The beats carry what each one grounds and what it requires, so a gap in the order is a check that fails rather than a feeling in a review."
  leader:
    who: "Reviews on your team argue about wording for an hour and never reach the question of whether the order made sense."
    value: "The structure is agreed before any prose exists, and the material nobody can justify keeping is decided once, by name, at a gate."
  csuite:
    who: "Documents your organization depends on are read once, misunderstood, and then explained again in meetings."
    value: "A piece built as an ordered journey with every term grounded is read once and understood, which is the cheapest form of internal communication there is."
---

## What it does

Outline is the second of the writing group's three stages. It takes the unsorted fragments `freewrite` gathered and turns them into an ordered set of beats, then puts everything that serves no beat in front of the author as a decision. The stage produces no prose. What it produces is the order the prose will follow, and the evidence that the order holds.

Its working definition is narrow on purpose. A beat is one move the reader makes: one idea landing, one turn, one objection answered. A section heading is not a beat, and a topic is not a beat, because neither of them says what changes in the reader. "Conflict resolution" names a subject; "the reader stops assuming one inspector's answer is silently discarded" names a move.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">State the purpose</span><span class="step-text">One sentence saying what the piece is for and who reads it. Every later cut is measured against it, so an outline without it has no gate.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Name each beat as a move</span><span class="step-text">One idea landing, one turn, one objection answered. If it cannot be stated as a move, it is a topic and it gets split or dropped.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Attach the fragments</span><span class="step-text">A beat with no supporting fragment is an assertion the piece cannot pay for yet. Find the material or drop the beat.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Order by reader need</span><span class="step-text">Not by the order the material arrived. The gathering order records how the author found the idea, and the reader has not found it yet.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Walk the beats and ground every term</span><span class="step-text">For each beat, list what it relies on and confirm an earlier beat supplied it. A term the reader met nowhere breaks the outline.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Collect the cut list</span><span class="step-text">Everything serving no beat, including material the author likes. Quality is not the test at this stage; service to a beat is.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Put the cut list to the author</span><span class="step-text">An explicit decision on each item. This is the human gate, because only the author can say what the piece is actually for.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Record and hand over</span><span class="step-text">Append the trace entry, including any term that had to move earlier, then hand the ordered beat list to <code>draft</code>.</span></div>
</div>

<ul class="benefits">
  <li>The reader is never asked to carry a word nobody gave them, because the grounding walk checks each beat against what earlier beats actually supplied.</li>
  <li>A gap in the order surfaces as a named failure rather than as a vague sense in review that something is off partway through.</li>
  <li>Every beat is backed by material, so an assertion the piece cannot pay for is caught before a paragraph gets written to defend it.</li>
  <li>The order follows what the reader needs next, not the sequence the author happened to discover things in, which is a different sequence almost every time.</li>
  <li>Cutting is a decision with a name on it. The author sees each item and says yes or no, so nothing good disappears quietly and nothing weak survives by inertia.</li>
</ul>

Outline ships as a single `SKILL.md` with no sibling documents of its own. The doctrine it depends on sits one group over: [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only trace and its five fields. Outline writes one entry before it finishes, naming the purpose sentence, the beat count and order, any term that had to be grounded earlier and where it moved, and what the author cut.

## When to reach for it

Type `/outline` in Claude Code, or name the skill directly in a session. Outline is user-invoked, so nothing routes to it on its own: a person decides that the material is gathered and the piece is ready to be shaped.

You reach for outline in four moments. A `freewrite` session has produced fragments and the author is ready to decide what the piece is for. A draft reads as a list of true statements that never add up to a journey. A reader reports getting lost partway through a piece that already exists, which is a structural report rather than a wording complaint. Or the user simply asks for an outline, a structure, or a running order.

Outline is not the only skill that imposes an order on material. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| There is not enough material to order yet, and the beats keep coming up empty | [`freewrite`]({{ '/freewrite/' | relative_url }}) |
| The order is agreed and the beats now have to become prose | [`draft`]({{ '/draft/' | relative_url }}) |
| A term needs one settled meaning across a whole project, not one piece | [`glossary`]({{ '/glossary/' | relative_url }}) |
| A finished document needs to be rendered as a branded page for outside readers | [`press`]({{ '/press/' | relative_url }}) |

Install once, and every tool below reaches the same outline skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want outline can skip the rest of the catalog with `./scripts/link-skills.sh --skill outline`, which links just this skill into the default buckets without pulling in the rest of the writing group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Outline is user-invoked: type <code>/outline</code>, or name it directly in a session. Claude Code reads the catalog installed at <code>.claude/skills/</code>, and outline reads the fragment file from the repository. The beat list it writes lands beside that file, and the session pauses at the cut list for your decision.</p>
<div class="prompt-card">Read the fragment file for the QuenServe offline explainer. The piece is for support engineers who will take the first call about epic E1. Turn the fragments into beats, where each beat is one move the reader makes. Then walk the beats in order and tell me every term a beat uses that no earlier beat introduced.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Outline answers with the ordered beats, the result of the grounding walk, and the cut list. It stops there and waits, because the cuts are yours to approve.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command yet, plain ask</span></div>
<div class="tool-group-body">
<p>No OpenCode command exists for outline yet, so the request is a plain ask in the session. OpenCode reads the same <code>.agents/skills/</code> catalog the other four tools read, and follows the shared repository rules in <code>AGENTS.md</code>. The fragment file has to be open as context, since the beats are built from it.</p>
<div class="prompt-card">Here are my fragments about QuenServe offline sync. State what the piece is for in one sentence and check it with me first. Then order the beats by what a support engineer needs next, not by the order I gave you the material. List anything that serves no beat separately, and do not delete it yourself.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode confirms the purpose sentence before ordering anything, because every later cut is measured against it and a cut made without it is guesswork.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply outline as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees outline's name and description the way the other four tools do.</p>
<div class="prompt-card">Take these fragments and give me a beat list for an internal explainer. For every beat, write the one move the reader makes, the terms that beat introduces, and the terms it relies on from earlier beats. Flag any beat that relies on a term the reader has not been given yet, and tell me where the grounding should move.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer in the same conversation and write the beat list, since no installed command exists here to run the grounding walk for them.</p>
</div>
</div>

A good ask includes:

- What the piece is for and who reads it, in one sentence, or a request to draft that sentence and confirm it before anything is ordered.
- The fragment file itself, since a beat with no fragment behind it is an assertion the piece cannot yet pay for.
- Any constraint on length or venue, because a shorter piece cuts beats rather than shortening every beat evenly.
- A note that the cut list comes back for a decision rather than being applied, so nothing is removed without the author seeing it.

## A working example

This example continues the [QuenServe]({{ '/example/' | relative_url }}) piece that `freewrite` gathered material for. The subject is epic E1, offline inspection sync, and the readers are the support engineers who will take the first call about it. The fragments are unsorted and one pair of them contradicts another. You type:

<pre><code>Read the fragment file for the QuenServe offline explainer. The piece is for
support engineers who will take the first call about epic E1. Turn the
fragments into beats, where each beat is one move the reader makes. Then walk
the beats in order and tell me every term a beat uses that no earlier beat
introduced.</code></pre>

Outline states the purpose first and checks it, because every cut later in the session is measured against that sentence. Then it names the beats. The kept contradiction from the fragment file becomes the opening beat rather than a problem to be tidied away. The design treats no signal as the normal case; the support script treats it as a fault to be cleared. The reader has to move from the second view to the first before anything else in the piece can land.

The grounding walk is where the session earns its place. Six beats read cleanly in order until the fifth, which covers E1-F2 conflict resolution:

<pre><code>b5  move: the reader accepts that two inspectors can edit the same
         inspection while both are offline
    requires: record identity
    grounded by: nothing
</code></pre>

The phrase "the same inspection" is doing work no earlier beat paid for. A support engineer reading in order has been told that inspections are captured on the device and sent later, but nothing has yet told them that the record is named on the device rather than by the server. Without that, "the same inspection" is a phrase, not a fact, and the beat about two people editing it cannot land however well it is written. The fix moves the grounding earlier: fragment f4 was already attached to the second beat about E1-F1 offline capture, which is the natural place for identity to be introduced, so beat two now grounds the term instead of merely using it.

The ordered beat list follows the output contract:

```yaml
purpose: Support engineers taking the first call about offline inspections understand what the product guarantees and what it asks a person to resolve.
beats:
  - id: b1
    move: the reader stops treating no signal as a fault to be cleared
    grounds: [offline as the normal case]
    requires: []
    fragments: [f2, f11]
  - id: b2
    move: the reader can say where an inspection lives before it is sent
    grounds: [record identity, the queue]
    requires: [offline as the normal case]
    fragments: [f4, f6]
  - id: b5
    move: the reader accepts that two inspectors can edit the same inspection while both are offline
    grounds: [conflict]
    requires: [record identity]
    fragments: [f7]
grounding: record identity, moved from b5 to b2
cut:
  - fragment: f9
    reason: served no beat; an unearned phrase with nothing behind it
    decided_by: author
open: a beat on what a support engineer should do first has no material yet
```

Three fragments served no beat and went to the author as a cut list. The author cut the unearned phrase f9 outright, cut a second fragment about retry intervals as too detailed for this reader, and rescued the third by pointing out that the example belongs under the beat about E1-F3 sync status visibility rather than being dropped. That is the gate working as intended: the agent proposed, and the person who knows what the piece is for decided each item by name.

One beat has no material at all. The list records it as open rather than filling it in, and the repair is another `freewrite` session on that narrow question, not an outline that quietly asserts something nobody said.

## What good looks like

The difference between a beat and a heading is visible on the page. Both of these describe the same part of the same piece.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A beat, stated as a move</div>
<pre><code><span class="tok-ok">b5 move:</span> the reader accepts that two
      inspectors can edit the same
      inspection while both are offline
<span class="tok-ok">requires:</span> record identity (grounded in b2)
<span class="tok-ok">fragments:</span> [f7]</code></pre>
<div class="compare-card-note">It says what changes in the reader, names the term it leans on, points at the earlier beat that supplied that term, and cites the material behind it.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Section 5:</span> Conflict resolution
<span class="tok-comment">A subject, not a move</span>
<span class="tok-comment">No terms listed, so nothing is checked</span>
<span class="tok-comment">&larr; passes review and fails the reader</span></code></pre>
<div class="compare-card-note">A heading says what the section is about and never says what the reader does with it. Nothing here can fail a grounding walk, which is why the gap survives to the draft.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What exactly counts as a beat?</summary>
<div class="qa-body">

One move the reader makes: an idea landing, a turn, or an objection answered. The test is whether the beat can be stated as a change in the reader. If the best statement available is a subject, it is a topic and it gets split into the moves it contains or dropped. A beat that needs two sentences with an "and" in the middle is usually two beats.

</div>
</details>

<details class="qa">
<summary>Why not order the beats the way the material was gathered?</summary>
<div class="qa-body">

Because the gathering order records how the author found the idea, and the reader has not found it yet. An author usually arrives at the interesting part first and reconstructs the background afterward. A reader needs the background before the interesting part, so the two orders are rarely the same and the difference is where readers get lost.

</div>
</details>

<details class="qa">
<summary>What happens when a term cannot be grounded anywhere earlier?</summary>
<div class="qa-body">

One of two repairs. Either an earlier beat is extended to introduce the term, which is what happened with record identity in the worked example, or a new beat is added whose only job is to supply it. If neither is possible, the beat that needs the term is dropped. A beat the reader cannot follow is not a beat, however good the writing that would fill it.

</div>
</details>

<details class="qa">
<summary>Why does the cut list go back to the author instead of being applied?</summary>
<div class="qa-body">

Because the cut is the one judgment an agent cannot make. Service to a beat is checkable, but what the piece is actually for is a decision about intent, and that is what makes a good paragraph expendable. Handing the list back turns each removal into a named choice, which is also what keeps the author from discovering the loss in the draft.

</div>
</details>

<details class="qa">
<summary>What if every fragment survives the cut list?</summary>
<div class="qa-body">

Then the gate did not run. SKILL.md treats this as a stop condition rather than a good outcome: a full set of fragments surviving means each one was measured against the beats loosely, or the purpose sentence was too broad to exclude anything. The remedy is to walk the list again with the purpose sentence in hand.

</div>
</details>

<details class="qa">
<summary>What if two beats make the same move?</summary>
<div class="qa-body">

They merge. A repeated move reads to the reader as stalling, because the second time through nothing changes in them and the piece appears to have stopped going anywhere. Two beats that look distinct on the page often collapse once each is stated as a move rather than as a subject, which is one more reason the wording of a beat is not a formality.

</div>
</details>

<details class="qa">
<summary>Can outline be used on a piece that is already drafted?</summary>
<div class="qa-body">

Yes, and it is the right response to a reader who reports getting lost partway through. The draft's paragraphs are read as candidate beats, the grounding walk runs over them in order, and the gap usually turns out to be a term the piece assumed rather than a sentence that reads badly. Rewriting the sentences would not have found it.

</div>
</details>

## It's working if

- Every beat can be read aloud as one move the reader makes, and none of them is a subject with a heading's wording.
- The grounding walk names either a clean result or the exact term that moved, and where it moved to.
- Every beat cites at least one fragment, so nothing in the order is an assertion the material cannot pay for.
- The cut list came back with a decision beside each item, recorded with the author named as the one who made it.
- A beat with no material is listed as open rather than being filled in with something plausible.

If the outline reads as a table of contents, the stage produced headings rather than beats, and the draft that follows will be a set of true statements that never add up to a journey.

## Where it fits

**Outline is the middle of the writing group's three stages: [`freewrite`]({{ '/freewrite/' | relative_url }}) explores, outline structures, and [`draft`]({{ '/draft/' | relative_url }}) renders.**

Its input is the unsorted fragment file that freewrite hands over, contradictions intact. Its output is an ordered beat list where every term is grounded and every beat carries material, which is what draft renders one beat at a time while recording the beat each paragraph serves.

The return paths matter as much as the forward one. A beat with no material sends the author back to freewrite for another interview on that narrow question. A grounding gap found during drafting sends the piece back here, because prose cannot repair a term the reader was never given; a paragraph that explains a word the structure never introduced only moves the problem.

Its nearest neighbor outside the group is `glossary`, in the developer group, and the split is scope. Glossary settles what a term means across a whole project, once, for everyone. Outline only asks whether this reader, in this piece, has met the term before the sentence that depends on it.
