---
layout: skill
name: glossary
title: "Glossary: The Project's Shared Vocabulary"
description: "Glossary builds a project's domain vocabulary one term at a time, each entry naming the near-synonyms it replaces, written where every contributor and every agent already reads."
group: developer
invocation: model-invoked
scenario: "Settling QuenServe's sync vocabulary before E1-F2 conflict resolution can be specified"
lens:
  novice:
    who: 'You have sat through a review that argued about what a word means rather than about what the code does.'
    value: 'Glossary writes the project down one term at a time, so the argument happens once and the answer becomes a file anyone can read.'
  practitioner:
    who: 'You are naming a module, a table, or a test, and the project already uses three different words for the thing you are naming.'
    value: 'You get a definition with an explicit avoid list, so you learn which words to drop as well as which single word to keep.'
  leader:
    who: 'Your services name the same concept differently, and every new contributor and every new agent picks up a different one.'
    value: 'One written vocabulary that people and agents both read, with genuine ambiguity flagged and handed to a named decision owner rather than settled quietly.'
  csuite:
    who: 'You pay for the domain to be re-explained in every new agent session and to every new engineer who joins.'
    value: 'A shared vocabulary reduces that repetition, and the trade-off is stated plainly: a stale glossary is worse than none, because people trust it.'
---

## What it does

Glossary is the model-invoked builder of a project's shared domain vocabulary. An agent dropped into a project guesses at the jargon and uses twenty words where one would do, and the code carries those twenty names into types, tables, routes, and test names. A written glossary that every person and every agent reads is the correction.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read</span><span class="step-text">Read the glossary already in the project's context file. A term list assembled without it produces a second vocabulary, which is the problem this skill exists to prevent.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Harvest</span><span class="step-text">Collect candidate nouns from two sources — the words the code already uses, and the words the current conversation uses — recording where each was found.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Challenge</span><span class="step-text">Test every candidate against the existing glossary. Most turn out to be a second name for a term already defined, and belong on that term's avoid list.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Stress-test</span><span class="step-text">Name one case each surviving definition must cover and one it must exclude. A definition that excludes nothing is a label, not a definition.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Record</span><span class="step-text">Write each term in one or two sentences with an explicit avoid list of the near-synonyms it replaces, plus where the term was seen.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Write</span><span class="step-text">Write the result to the project's context file as one alphabetized section, then append the trace entry recording what changed.</span></div>
</div>

<ul class="benefits">
  <li>Every entry carries an <strong>avoid</strong> list, so a reader learns which words to drop, not only which word to keep.</li>
  <li>A candidate is challenged before it is added, and the common, correct answer is an avoid-list entry on an existing term rather than a new term.</li>
  <li>Each definition is stress-tested against one case it covers and one it excludes, so a label cannot pass itself off as a definition.</li>
  <li>Genuine ambiguity is written down with both readings and a named decision owner, instead of being resolved quietly by whoever wrote first.</li>
  <li>The result lands in the project's context file, the file contributors and agents already load, rather than a document nobody opens.</li>
</ul>

The payoff is consistent naming, faster navigation, and fewer tokens spent re-explaining the domain every session. The cost is upkeep, and it is real. A glossary is only worth its maintenance while it still matches the code, because a wrong glossary misleads further than an absent one.

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/glossary/SKILL.md) covers the eight-step procedure, the stop conditions, and the output contract in full.
- [`recon`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/SKILL.md) covers the read-only codebase brief that supplies the nouns worth harvesting.
- [`architect`](https://github.com/tqnonline/skills/blob/main/skills/developer/architect/SKILL.md) covers module and decision naming; a module named for a glossary term needs no second explanation.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the trace entry this skill appends when a run ends.

Glossary reads each one only when the moment calls for it. A harvest that needs estate context reads recon's brief; a naming decision reads architect; the closing entry follows TRACE.md.

## When to reach for it

Glossary is not typed as a command. The model reaches for it on its own when a request matches its description: the same concept carrying several names across code and conversation, or a new agent needing the project's language written down before it starts guessing.

You reach for it, indirectly, in four moments. One concept carries several names in the codebase — `account`, `customer`, and `tenant` all pointing at the same row. A new module introduces domain nouns the project has never defined. A review argues about what a word means rather than about what the code does. Or you ask directly for a glossary, a domain model, or a shared language.

Glossary is not the only skill that writes words a project reads. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the codebase orientation that supplies the nouns worth harvesting | [`recon`]({{ '/recon/' | relative_url }}) |
| You need modules and decisions named, not the vocabulary those names draw on | [`architect`]({{ '/architect/' | relative_url }}) |
| You need the whole instruction file a project's agents read, kept current | [`brief`]({{ '/brief/' | relative_url }}) |
| You need acceptance criteria written for a story, not the words they are written in | [`slice`]({{ '/slice/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same glossary skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want glossary can skip the rest of the catalog with `./scripts/link-skills.sh --skill glossary`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">No command &mdash; model-invoked</span></div>
<div class="tool-group-body">
<p>Glossary carries no plugin slash command and no hook. Claude reaches for it on its own when a request matches its description, or mid-task when a term in the conversation has no agreed meaning. The skill reads the project's context file before it writes anything to it.</p>
<div class="prompt-card">We use sync, upload, reconcile, and push for overlapping things across QuenServe's E1 offline inspection sync code. Build the glossary before we specify E1-F2. Harvest from the sync client and the ingestion endpoint, challenge each candidate against what CLAUDE.md already defines, and give every term an avoid list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The run returns the terms added, the candidates merged into existing terms, the ambiguities left open with their decision owners, and the file it wrote.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; applied as instructions</span></div>
<div class="tool-group-body">
<p>OpenCode ships no dedicated command for glossary. Its catalog install places the skill in <code>.agents/skills/</code> the same as every other tool, and an orchestrating agent applies the procedure by reading the skill file as instructions when the vocabulary is the thing blocking work.</p>
<div class="prompt-card">Before E1-F2 conflict resolution gets specified, settle QuenServe's sync vocabulary. Harvest candidate terms from the offline store and the sync client with the file each was seen in, merge the near-synonyms into one term each, and flag anything with two honest readings instead of picking one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent applies the procedure directly and writes the alphabetized section into the project's context file.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply glossary as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees glossary's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Apply skills/developer/glossary/SKILL.md to QuenServe's E1 sync code. Read the existing glossary first, harvest candidates with provenance, stress-test each definition on one case it covers and one it excludes, and record every term with an explicit avoid list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three state the proposed section in their reply before writing it, since none has a command's output to parse.</p>
</div>
</div>

A good ask includes:

- The subsystem to harvest from, since a repository-wide sweep usually yields more terms than one pass should carry.
- Where the project's context file lives, if the repository keeps more than one.
- Who decides a contested term, so an ambiguity has an owner to be handed to.
- Whether the existing glossary is believed current, because a stale one is corrected before it is extended.

## A working example

The subject here is epic E1, offline inspection sync, on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Four words are in circulation for overlapping things: the team says *sync*, *upload*, *reconcile*, and *push*, and no two people mean quite the same set of things by them. Feature E1-F2, conflict resolution, cannot be specified precisely while that is true, because its acceptance criteria would be written in words that do not yet hold still.

You type:

<pre><code>We use sync, upload, reconcile, and push for overlapping things across
QuenServe's E1 offline inspection sync code. Build the glossary before we
specify E1-F2. Harvest from the sync client and the ingestion endpoint,
challenge each candidate against what CLAUDE.md already defines, and give
every term an avoid list.</code></pre>

The run reads the existing glossary first, then harvests from two sources: the nouns the code already uses in E1-F1 offline capture and E1-F3 sync status visibility, and the nouns the conversation itself used. Each candidate is then challenged. The words *upload* and *push* turn out to be second names for one concept, so they become avoid-list entries rather than new terms. The word *reconcile* survives as its own term, because it names something the others do not. The bare word *sync* survives as a genuine ambiguity, used for one transmission attempt in some code and for the whole offline-to-server pipeline elsewhere.

The result, shown in the shape the skill's own output contract defines, filled with this scenario's values rather than a captured run:

<pre><code>source: E1 offline inspection sync &mdash; offline store, sync client, ingestion endpoint
added:
  - term: sync run
    definition: one attempt to transmit every queued inspection to the server
    seen_in: [src/sync/client.ts, test/sync-retry.test.mjs]
    avoid: [upload, push, flush]
  - term: reconciliation
    definition: the resolution of two offline edits to the same inspection into
                one accepted record
    seen_in: [src/sync/conflict.ts]
    avoid: [merge, conflict fix, dedupe]
  - term: completion queue
    definition: the local, ordered set of finished inspections not yet accepted
                by the server
    seen_in: [src/offline/store.ts]
    avoid: [outbox, pending list, backlog]
merged:
  - candidate: upload
    into: sync run
  - candidate: push
    into: sync run
unresolved:
  - term: sync
    readings: [one sync run, the whole offline-to-server pipeline]
    decide: E1 tech lead
written_to: CLAUDE.md
counts: { added: 3, merged: 2, unresolved: 1 }</code></pre>

*Sync run* was stress-tested before it was recorded. It covers a retry after connectivity returns in E1-F1-S1, and it excludes a manager loading the sync status view in E1-F3, which reads state rather than transmitting anything. That second half is what makes it a definition instead of a label. The ambiguity around the bare word *sync* was not resolved by the run. Both readings were written down and handed to a named owner, because picking one quietly would have recorded a decision nobody made.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">An entry that settles a word</div>
<pre><code>term:       sync run
definition: one attempt to transmit every queued
            inspection to the server
seen_in:    src/sync/client.ts
avoid:      upload, push, flush   <span class="tok-comment"># the words it replaces</span>
covers:     a retry after connectivity returns
excludes:   loading the sync status view</code></pre>
<div class="compare-card-note">One term, with provenance, an avoid list a reader can act on, and a boundary that says what the term is not.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">upload, push and sync run all added as terms</span>
<span class="tok-warn">"sync" defined as "syncing data"</span>
<span class="tok-warn">the ambiguity resolved quietly, owner unnamed</span>
<span class="tok-warn">the stale entries left in place, unmarked</span></code></pre>
<div class="compare-card-note">Three names for one concept is the original problem restated. A definition that excludes nothing is a label. A quiet resolution records a decision nobody made, and an unmarked stale entry is trusted anyway.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why does the run read the existing glossary before harvesting anything?</summary>
<div class="qa-body">

Because a term list assembled without it produces a second vocabulary, which is the problem this skill exists to prevent. A candidate can only be judged as new or duplicate against something. Reading first is what makes the challenge step possible at all.

</div>
</details>

<details class="qa">
<summary>Most of my candidates are not becoming terms. Is that a failure?</summary>
<div class="qa-body">

No, that is the expected result. Most candidates are a second name for a concept the glossary already defines, and the correct output is an avoid-list entry on the existing term rather than a new entry. On QuenServe, *upload* and *push* both merged into `sync run`, and the glossary got shorter and more useful for it.

</div>
</details>

<details class="qa">
<summary>What happens when a word honestly means two things?</summary>
<div class="qa-body">

It is recorded as unresolved, with both readings written out and a named decision owner. The bare word *sync* on QuenServe is the case: one transmission attempt in some code, the whole pipeline in other code. Choosing one quietly would write a decision nobody made, and it would be trusted afterward as though someone had.

</div>
</details>

<details class="qa">
<summary>Why does every term need an avoid list?</summary>
<div class="qa-body">

A definition alone tells a reader which word to use. It does not tell them which words they have been using instead. The avoid list carries that second half, so someone reading the entry for `sync run` learns to stop writing *upload*, *push*, and *flush* rather than adding a fourth name alongside them.

</div>
</details>

<details class="qa">
<summary>What if the project has no context file to write into?</summary>
<div class="qa-body">

The run stops and asks where the glossary belongs, writing nothing. A glossary in a file nothing loads is maintenance cost with no payoff. The value comes from landing in the file contributors and agents already read, not from the list existing somewhere.

</div>
</details>

<details class="qa">
<summary>What if the glossary and the code disagree?</summary>
<div class="qa-body">

The contradiction is reported rather than edited away on either side. Only a human can say which one is wrong: the code may have drifted from an agreed word, or the word may have been agreed before the domain changed. Silently rewriting either one hides a decision that needs making.

</div>
</details>

<details class="qa">
<summary>Is a stale glossary really worse than no glossary?</summary>
<div class="qa-body">

Yes, and the skill says so before it adds to one. An absent glossary makes a reader ask. A stale one is believed, so a wrong entry propagates into names, tests, and conversations that all look consistent with each other. That is why upkeep is stated as a real cost rather than assumed away.

</div>
</details>

<details class="qa">
<summary>What if the harvest turns up dozens of candidate terms?</summary>
<div class="qa-body">

More than roughly a dozen new terms means the scope was too wide. The run narrows to one subsystem and starts again. A dozen carefully challenged terms are worth more than fifty that nobody stress-tested, and a long first pass is rarely reviewed carefully by anyone.

</div>
</details>

## It's working if

- The same concept carries one name across the code, the tests, the tracker, and the conversation.
- Every entry names the near-synonyms it replaces, so a reader learns which words to drop.
- Ambiguity is visible in the glossary, with both readings and an owner, rather than settled by whoever wrote first.
- A new contributor or a new agent reads the project's context file and stops guessing at jargon.
- The glossary is corrected when the code moves, because a trusted list that no longer matches the code misleads.

If the glossary keeps growing and the code keeps gaining new names anyway, the entries are being added without the challenge step, and the list has become a second vocabulary rather than the shared one.

## Where it fits

**Glossary is the naming layer under the developer group: the shared words that architecture, stories, and tests all reuse instead of each inventing their own.**

Its nearest neighbor is `recon`, which produces the read-only brief of an unfamiliar codebase and so supplies the nouns worth harvesting. `architect` consumes the result, because a module named for a glossary term needs no second explanation. `brief` keeps the wider instruction file current, and the glossary section sits inside it.

If none of this settles which skill fits, `ask-fde` routes you.
