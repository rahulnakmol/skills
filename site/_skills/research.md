---
layout: skill
name: research
title: "Research: Findings From Primary Sources"
description: "Research is the model-invoked skill that answers a question from primary sources and writes the finding, its citations, and its open questions into a file in the repository."
group: core
invocation: model-invoked
scenario: "Establishing what QuenServe's storage layer and sync protocol guarantee about ordering before story E1-F2-S1 can be specified"
lens:
  novice:
    who: "You have watched an agent state an outside fact with complete confidence, and then state the opposite an hour later."
    value: "Research makes the source part of the answer. Every claim carries the page or the file it came from, and a claim with no source says so in plain words instead of blending in."
  practitioner:
    who: "You have to decide something that rests on how a library, a protocol, or a service actually behaves."
    value: "You get a dated file naming the version each fact was true of, so the next person checks the reading rather than repeating the search from scratch."
  leader:
    who: "You own a team that keeps re-answering the same external questions, and the answer keeps changing."
    value: "The reading is done once and stored in the repository. What could not be established stays visible as an open question instead of hardening into an assumption."
  csuite:
    who: "You are accountable for decisions that rest on outside facts your organization does not control."
    value: "Every load-bearing claim behind a decision carries a citation and a reading date, and anything unsourced is labeled as reasoning rather than passed off as evidence."
---

## What it does

Research answers one outside question from the sources that actually define the behavior, then leaves the answer in the repository rather than in a chat window.

The skill treats an external claim the way a careful reporter treats a quote: what it is worth depends on where it came from. Official documentation, published specifications, and the source code itself carry the most trust. A maintainer's statement — a release note, a changelog entry, an issue reply — comes next. Reputable secondary writing comes last, and a blog post or a forum answer is a lead to follow to its primary source, never a fact to repeat as it stands.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Name the question and the decision</span><span class="step-text">One sentence for the question, one for what a useful answer would let a reader decide. A question that cannot name its decision produces reading with no end.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Rank the sources first</span><span class="step-text">Sort candidate sources into primary, maintainer, and secondary before opening any of them, so the order of reading is not set by whatever a search returned first.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Read the source, not a summary</span><span class="step-text">Where the source is code, name the file and the version, tag, or commit it was read at. Where it is documentation, name the page and the product version it documents.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Cite inline, beside the claim</span><span class="step-text">Each load-bearing statement carries its citation where it sits, not gathered in a list at the end that a reader has to match up by guesswork.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Label what is not sourced</span><span class="step-text">A claim you cannot cite is marked in the text as reasoning from general knowledge. An unmarked claim reads exactly like a sourced one.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Date it and pin the version</span><span class="step-text">Record the day the reading happened and the version each fact was true of. Documentation moves, and an undated finding cannot be judged stale.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Write the file and the trace</span><span class="step-text">The output is a Markdown file in the repository — question, decision, dated findings, unverified claims, open questions — plus the trace entry recording the sources and their tier.</span></div>
</div>

<ul class="benefits">
  <li>The same external question stops being answered from memory twice with two different answers, because the first answer is written down where the second session will find it.</li>
  <li>A reader checking one sentence can go straight to the source that supports it, since the citation sits next to the claim rather than in a pile at the end.</li>
  <li>An assumption cannot quietly become a fact. A claim with no source ships labeled as reasoning from general knowledge, or it does not ship.</li>
  <li>A finding can be judged stale rather than trusted forever, because the reading date and the version each fact was true of travel with it.</li>
</ul>

The skill states its honest limits as stop conditions rather than as advice. When only secondary sources support a load-bearing claim, the claim is recorded as unverified with the lead that was followed, never promoted to a finding. When two primary sources disagree, both readings are recorded with their citations and dates, together with what would settle the disagreement. When documentation contradicts the code, both are cited, the code is treated as authoritative for the version read, and the file says plainly that the two disagree.

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/core/research/SKILL.md) carries the nine-step procedure, the five stop conditions, and the output contract this page quotes.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) defines the append-only run record research writes its finding entry into.
- [`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md) is why the written file is opened and read against the question before the research is reported done.
- [`VALUE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VALUE.md) names the lenses a value claim must survive, and research supplies the observed numbers those lenses ask for.
- [`grit`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/SKILL.md) is the gate ledger a decision built on these findings is later held to.

Research reads each one only when the moment calls for it: closing a run reaches for TRACE.md, checking the written file reaches for VERIFICATION.md, and a decision that follows from the finding reaches for grit.

## When to reach for it

Nothing types `/research` in Claude Code. Research is model-invoked: the model reaches for it on its own when a request matches its description — a question whose answer belongs to an outside library, protocol, service, or specification, and that the repository does not already record.

Five moments reach it. A decision depends on how something outside the codebase actually behaves, and nothing in the repository records it. The same external question has been answered from memory more than once, and the answer keeps changing. A plan or a design rests on an outside fact nobody has checked against its source. A dependency upgrade changes behavior, and the release notes have to be read before the change is planned. Or someone asks directly for the documented behavior, the specification, or the current state of an interface.

Research is not the only skill that reads something before deciding. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The unknown is this repository's own code and conventions, not an outside library or specification | [`recon`]({{ '/recon/' | relative_url }}) |
| A failure exists and its cause is unknown, so the instrument is a reproduction rather than a source | [`debug`]({{ '/debug/' | relative_url }}) |
| The outside facts are already settled, and the open question is which design to build on them | [`architect`]({{ '/architect/' | relative_url }}) |
| A term means different things in different documents, and the fix is one agreed definition | [`glossary`]({{ '/glossary/' | relative_url }}) |
| The finding is written, and the decision that follows now needs gates that prove it shipped | [`grit`]({{ '/grit/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same research skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want research can skip the rest of the catalog with `./scripts/link-skills.sh --skill research`, which links just this skill into the default buckets without pulling in the rest of core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reads it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; model-invoked</span></div>
<div class="tool-group-body">
<p>Research is model-invoked, so nothing is typed to call it. Claude reaches for it when a request turns on an outside fact the repository does not already record, and it ships no plugin slash command and no hook of its own. The permission surface is narrow: it reads sources and writes one Markdown file into the working tree.</p>
<div class="prompt-card">Before we specify E1-F2-S1 for QuenServe, I need to know what our offline store and our sync protocol actually guarantee about ordering, and whether last-write-wins here is a real guarantee or folklore. Read the protocol specification and the storage adapter's source rather than summarizing what you remember. Cite each claim where it sits, and write the finding to a file with the reading date and the version you read.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The run returns the file path, the question and the decision it serves, each dated finding with its citation, anything recorded as unverified, and the questions left open.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; applied as instructions</span></div>
<div class="tool-group-body">
<p>OpenCode ships no dedicated command for research. The catalog install places the skill in <code>.agents/skills/</code> the same as every tool, and an agent applies the procedure by reading the skill file as instructions when a question needs an outside source. The written file, not the reply, is the deliverable, so the agent is asked for a path.</p>
<div class="prompt-card">Apply the research procedure to QuenServe's conflict resolution, E1-F2. The question is whether the sync protocol orders two offline edits by the client clock or by arrival at the server. Rank the sources before you read any of them, treat any blog post as a lead to follow to its primary source rather than as a fact, and write the result to a file under docs/research with the date you read each source.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent works the steps directly, writes the file, and reports the output contract's fields in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply research as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees research's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Read skills/core/research/SKILL.md and follow it for this question: does QuenServe's storage layer preserve edit order across two devices that were both offline? Cite the specification section and the source file with its commit. Label anything you cannot cite as reasoning from general knowledge, and record what you could not establish as an open question rather than filling the gap with a guess.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the file and then state the findings in the session, in the output contract's own field order.</p>
</div>
</div>

A good ask includes:

- The decision waiting on the answer, so the reading has an end. "How does this library work" has no stopping point; "can E1-F2-S1 be specified as last-write-wins" does.
- Which sources you already consider authoritative, and any you have ruled out, so the ranking does not start from a blank page.
- The version, tag, or release you care about, since a fact true of one release is not a fact about the product.
- Where the file should live, if your repository already keeps findings somewhere other than the default path.

## A working example

This example follows [QuenServe]({{ '/example/' | relative_url }})'s conflict resolution feature, E1-F2. Two inspectors edit the same inspection while disconnected, and before story E1-F2-S1 can be specified, the team has to know what the storage layer and the sync protocol actually guarantee about ordering. You type:

<pre><code>Before we specify E1-F2-S1 for QuenServe, I need to know what our offline store and our sync protocol actually guarantee about ordering, and whether last-write-wins here is a real guarantee or folklore. Read the protocol specification and the storage adapter's source rather than summarizing what you remember. Cite each claim where it sits, and write the finding to a file with the reading date and the version you read.</code></pre>

Research states the question and the decision first, ranks the sources before opening any of them, and only then reads. The specification and the adapter's source are primary. The changelog entry and the issue reply from the adapter's maintainer are maintainer statements. A conference write-up that first raised the question is secondary, so it is followed to the specification and cited there instead. The file it writes:

<pre><code># Ordering guarantees behind E1-F2 conflict resolution

question: Does the offline store plus the sync protocol guarantee that the
  later of two offline edits wins, and is that order decided by a clock?
decision: Whether E1-F2-S1 can be specified as last-write-wins, or must
  instead surface the conflict for a person, the way E1-F2-S2 does.
file: docs/research/e1-f2-ordering.md
read_on: 2026-09-02

<span class="tok-ok">## Findings</span>

The server orders writes by arrival, not by the client clock
  <span class="tok-ok">[sync protocol specification, section 4.2, protocol v3 &mdash; primary]</span>
The local queue preserves insertion order per device, and states no
order across devices
  <span class="tok-ok">[storage-adapter/src/queue.ts, commit 4c1f9ab &mdash; primary]</span>
Documentation and code disagree on the merge rule
  <span class="tok-ok">[adapter docs "Conflicts" page, v2.8 &mdash; primary, says last write wins]</span>
  <span class="tok-ok">[storage-adapter/src/merge.ts, commit 4c1f9ab &mdash; primary, compares a</span>
  <span class="tok-ok">monotonic counter, not a wall-clock timestamp; code authoritative here]</span>

<span class="tok-warn">## Unverified</span>

<span class="tok-warn">The server rejects an out-of-order write outright</span>
  <span class="tok-warn">lead: a widely cited conference write-up, followed to the specification,</span>
  <span class="tok-warn">which does not state this behavior &mdash; reasoning, not a finding</span>

<span class="tok-warn">## Open</span>

<span class="tok-warn">Does the monotonic counter survive a device clock reset?</span>
  <span class="tok-warn">settled_by: a maintainer statement, or a test against the released build</span></code></pre>

Four things in that file are the point of the skill. The disagreement between the adapter's documentation and its code is recorded as a disagreement, with both citations and the code named authoritative for the version read, instead of one of the two being chosen because it was more convenient. The claim about out-of-order writes came from a well-regarded secondary source, was followed to the specification, was not found there, and so sits under "Unverified" with the lead named rather than under "Findings." The open question about the clock reset is stated plainly, with the evidence that would settle it. And the reading date and the versions travel with every line, so a reader six months from now can tell whether this still describes the system.

The answer the team needed is now on record: ordering is decided by arrival at the server and by a counter in the merge function, not by a clock. E1-F2-S1 can therefore be specified against arrival order, and the question of what a person sees when the counter cannot decide belongs to E1-F2-S2. Nobody has to read the specification again to write that story, which is the whole reason the output is a file rather than a chat reply.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A finding that holds</div>
<pre><code><span class="tok-ok">The server orders writes by arrival, not by the client clock</span>
  <span class="tok-ok">[sync protocol specification, section 4.2, protocol v3]</span>
  <span class="tok-ok">tier: primary &middot; read_on: 2026-09-02</span>

<span class="tok-ok">Open: does the counter survive a device clock reset?</span>
  <span class="tok-ok">settled_by: maintainer statement, or a test on the released build</span></code></pre>
<div class="compare-card-note">Each claim names its source, its tier, and the version it was true of. What could not be established is written down as open, not smoothed over.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">The sync protocol uses last-write-wins by timestamp.</span>
<span class="tok-comment">&larr; no source, no date, no version</span>
<span class="tok-comment">&larr; traced later to a blog post, never to the specification</span>
<span class="tok-comment">&larr; delivered in chat, so the next session repeats the search</span></code></pre>
<div class="compare-card-note">A confident sentence with no citation reads exactly like a sourced one. That is how a secondary claim becomes a requirement nobody rechecks.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why write a file instead of answering in the conversation?</summary>
<div class="qa-body">

Because a chat answer dies with the session that produced it. The next agent, and the next person, start the same search from nothing and may reach a different answer. A file in the repository is read by whoever picks the question up next, and it carries the citations and the date that let them judge it rather than redo it.

</div>
</details>

<details class="qa">
<summary>What counts as a primary source?</summary>
<div class="qa-body">

Official documentation, a published specification, and the source code itself. The test is whether the source defines the behavior or merely describes it. A maintainer's release note or issue reply is the next tier down, because it is authoritative about intent but is not the artifact that decides what the software does.

</div>
</details>

<details class="qa">
<summary>Can a blog post ever be cited?</summary>
<div class="qa-body">

It can be cited as a lead, never as the support for a load-bearing claim. The procedure is to follow it to the primary source and cite that instead. When the primary source does not support what the post said, the claim is recorded as unverified with the post named as the lead, which is more useful than either repeating it or silently dropping it.

</div>
</details>

<details class="qa">
<summary>What happens when the documentation and the code disagree?</summary>
<div class="qa-body">

Both are cited, and the file says plainly that they disagree. The code is treated as authoritative for the version that was read, because it is what actually runs. The disagreement itself is often the most valuable line in the file, since it usually means either the documentation is stale or the behavior is about to change.

</div>
</details>

<details class="qa">
<summary>What if no primary source exists at all?</summary>
<div class="qa-body">

Then the file says so. A finding with no source ships labeled as reasoning from general knowledge, or it does not ship. The label is what keeps the reader from spending the claim as though it were evidence, and it tells the next person exactly where to look if the question becomes load-bearing.

</div>
</details>

<details class="qa">
<summary>How does a reader know when a finding has gone stale?</summary>
<div class="qa-body">

From the reading date and the version recorded beside each claim. A fact about protocol v3 is not a fact about protocol v4, and a page read in September may have been rewritten in October. Without both, a reader has no way to tell a current finding from an old one, so the file quietly turns into folklore with citations attached.

</div>
</details>

<details class="qa">
<summary>Is an open question a failed run?</summary>
<div class="qa-body">

No. It is a recorded result. The skill treats a plainly stated open question as more useful than a confident guess, because once a guess is written down it is indistinguishable from a finding. Each open question also names what evidence would settle it, so the next person knows what to go and get.

</div>
</details>

## It's working if

- A question that used to be answered from memory now has a file, and the second person to ask it reads that file instead of searching again.
- Every load-bearing claim has a citation sitting beside it, not gathered in a list at the end that a reader has to match up by guesswork.
- Anything that could not be cited is labeled in the text as reasoning from general knowledge, so it never reads as evidence.
- Each finding carries the date it was read and the version it was true of, which is what lets a later reader call it stale.
- Open questions appear in the file by name, each with the evidence that would settle it, rather than being rounded off into a confident answer.

If a finding is quoted back a week later and nobody can say which version it was true of, the reading happened but the record did not.

## Where it fits

**Research is the evidence lane in `core`: the skill that turns an outside question into a cited, dated file any group's work can build on.**

Its nearest neighbor is `recon`, and the two point in opposite directions. `recon` reads inward, briefing an agent on an unfamiliar estate the team already owns; research reads outward, to documentation, specifications, and source the team does not control. `debug` is the third of that set and belongs to a different kind of unknown: when a failure exists but its cause does not, the instrument is a reproduction rather than a source.

Downstream, `grit` holds the decision that follows from a finding to gates that prove it shipped, and `VERIFICATION.md` is why the written file gets opened and read against the question before the research is reported done. Because research sits in `core`, every group may reach for it, and no group has to keep its own copy.

If none of this settles which skill fits, `ask-fde` routes you.
