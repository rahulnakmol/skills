---
layout: skill
name: refactor
title: "Refactor — Deep Modules and Where the Seams Belong"
description: "Refactor surveys a codebase for modules that could hide more complexity behind a smaller interface, ranks the candidates, and stops so a person picks which one to work."
group: developer
invocation: user-invoked
scenario: "Surveying QuenServe's E1 offline inspection sync code for deepening candidates before any seam moves"
lens:
  novice:
    who: 'You have read a file where using it correctly meant knowing what was inside it, and nobody could tell you why that was normal.'
    value: 'Refactor gives that feeling a name &mdash; a shallow module, one whose interface is nearly as complicated as its implementation &mdash; and states what a caller would stop having to know.'
  practitioner:
    who: 'You suspect the sync, capture, and conflict paths have grown into each other, and you want candidates rather than an opinion.'
    value: 'You get at most five named candidates, each with the interface as it stands, the interface proposed, what a caller would no longer need to know, and an estimated cost.'
  leader:
    who: 'You have watched a refactor turn into a rewrite nobody scoped or approved.'
    value: 'The run stops at the survey. A person picks the candidate, and the agent works only that one, in steps small enough that the suite runs green between them.'
  csuite:
    who: 'You need to know a maintainability spend was chosen deliberately rather than drifted into.'
    value: 'Every run records the candidates surveyed, the one a human chose, the seam that moved, the suite result, and the candidates left on the table.'
---

## What it does

Refactor is the user-invoked survey of a codebase for places where a module could hide more complexity behind a smaller interface. It borrows its vocabulary from John Ousterhout's *A Philosophy of Software Design*, which argues that the main cost of software is not writing it. The cost is understanding it well enough to change it.

The measure is one ratio. A **deep** module puts a lot of functionality behind a small interface. A **shallow** module has an interface nearly as complicated as its implementation, so it costs a reader as much to learn as it saves them in work.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Survey</span><span class="step-text">Read-only. Walk the boundaries rather than the files: for every unit other code imports, write down what a caller must understand and what the unit hides.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Rank</span><span class="step-text">Order the candidates by hidden complexity — how much implementation moves behind the interface, and how many callers stop needing to know something.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Name</span><span class="step-text">Give each surviving candidate a failure mode: shallow interface, information leakage, temporal decomposition, or a chain of pass-through methods.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Present</span><span class="step-text">At most five candidates, then stop and wait. This is the gate, and the agent never picks the architecture.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Work</span><span class="step-text">Only the candidate the human chose. Behavior stays identical, and each step is small enough that the suite runs green between them.</span></div>
</div>

<ul class="benefits">
  <li>Interface width is measured in what a caller has to know &mdash; call order, units, error cases, what must be cleaned up &mdash; not in the count of exported symbols.</li>
  <li>A change that relocates code without narrowing the interface is dropped from the list. That is a move, not a deepening.</li>
  <li>A candidate with no named failure mode never reaches the human, because a hunch is not a finding.</li>
  <li>The survey stops at five candidates and waits, so an unscoped rewrite has no route to start.</li>
  <li>A candidate the human declines is recorded as a finding, not carried forward as a backlog item to work anyway.</li>
</ul>

This is a survey, not a rescue. `DEEP-MODULES.md` states the limit in its own words: on a codebase where every module knows every other module, "the survey will return real findings and no safe first step." Reporting that is the correct outcome, rather than starting a rewrite nobody approved.

- [`DEEP-MODULES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/refactor/DEEP-MODULES.md) covers the vocabulary: deep versus shallow, interface width, information leakage, temporal decomposition, pass-through methods, and where a seam belongs.
- [`tdd`](https://github.com/tqnonline/skills/blob/main/skills/developer/tdd/SKILL.md) covers pinning a seam's behavior before it moves, and supplies the green each step runs between.
- [`architect`](https://github.com/tqnonline/skills/blob/main/skills/developer/architect/SKILL.md) covers the case where the answer is a new decomposition rather than a deeper module.
- [`recon`](https://github.com/tqnonline/skills/blob/main/skills/developer/recon/SKILL.md) covers the read-only brief to run first on a codebase nobody in the session knows.
- [`core/TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the trace entry the run appends when it finishes.

Refactor reads `DEEP-MODULES.md` only when the moment calls for it: when a candidate needs a name for what is wrong with it, or when a proposed seam has to be explained to a person.

## When to reach for it

Type `/refactor` in Claude Code, or name the skill directly in a session. Refactor is user-invoked, so nothing reaches for it on its own. A person decides that the cost of understanding a subsystem has grown past the cost of changing it.

You reach for refactor in five moments. A module keeps changing whenever an unrelated module changes, which is the signature of information leakage. A file is mostly pass-through methods that forward calls to the next layer without adding anything. One observable behavior takes a change in four modules to deliver, which usually means the split follows the order of events rather than the knowledge involved. Review comments or onboarding notes say a subsystem is hard to hold in the head. Or you simply want an opinion on where the seams belong.

Refactor is not the only skill that touches structure. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The seam has no test that pins its behavior yet | [`tdd`]({{ '/tdd/' | relative_url }}) |
| The answer is a new decomposition, not a deeper module | [`architect`]({{ '/architect/' | relative_url }}) |
| Nobody in the session knows this codebase at all yet | [`recon`]({{ '/recon/' | relative_url }}) |
| Something is broken, and the goal is the defect rather than the design | [`debug`]({{ '/debug/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same refactor skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want refactor can skip the rest of the catalog with `./scripts/link-skills.sh --skill refactor`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command &mdash; user-invoked</span></div>
<div class="tool-group-body">
<p>Refactor is user-invoked: type <code>/refactor</code>, or name it directly in a session. The three dynamic workflows this repository ships as plugin slash commands &mdash; <code>assess-work-item</code>, <code>deliver-work-item</code>, <code>shakedown-pr</code> &mdash; wrap the work-item pipeline. Refactor calls none of them, and it calls the Skill tool with <code>tdd</code> when a seam has no test.</p>
<div class="prompt-card">Survey QuenServe's E1 offline inspection sync code for deepening opportunities. The sync, capture, and conflict paths have grown into each other. Rank the candidates by how much complexity each would hide, name the failure mode for each, and stop so I can pick one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code returns at most five ranked candidates and waits. It does not begin work until a person names the one to take.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode's installed command layer wraps the developer group's pipeline tools; no command wraps refactor. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route the catalog readers use, and applies the survey procedure when a request names a structural problem rather than a defect.</p>
<div class="prompt-card">Read skills/developer/refactor/SKILL.md and DEEP-MODULES.md, then survey QuenServe's E1 sync estate read-only. I want ranked candidates with a named failure mode each, and no edits until I choose one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode states the ranked candidate list directly in its reply, since no command wraps the survey output.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply refactor's survey as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees refactor's name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Apply skills/developer/refactor/SKILL.md to QuenServe's E1 offline inspection sync code. Survey the boundaries read-only, rank by hidden complexity, name each failure mode from DEEP-MODULES.md, present at most five, and stop for my choice.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three present the candidate list in the session and wait, since none has a workflow output to parse.</p>
</div>
</div>

A good ask includes:

- The scope to survey — one subsystem, or the whole repository.
- Whether behavior is allowed to change at all; for a refactor, the answer is no.
- Which test command counts as the suite that must stay green between steps.
- Any constraint outside the code — a freeze window, an in-flight feature branch, an interface another team already consumes.

## A working example

The codebase here is the one behind epic E1, offline inspection sync, on [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Three features live in that code: E1-F1 offline capture, E1-F2 conflict resolution, and E1-F3 sync status visibility. Their paths have grown into each other. You type:

<pre><code>Survey QuenServe's E1 offline inspection sync code for deepening
opportunities. The sync, capture, and conflict paths have grown into
each other. Rank the candidates by how much complexity each would
hide, name the failure mode for each, and stop so I can pick one.</code></pre>

The survey runs read-only and returns four candidates, ranked. Each carries a named failure mode, because a candidate with no name is a hunch and a hunch does not go in front of a person:

<pre><code>1. sync-client            temporal decomposition
   capture, queue, and send are three modules split by when they run.
   All three know the sync envelope's version and field order, so a
   format change touches all three. E1-F1 and E1-F3 both pay for it.

2. conflict-resolver      pass-through chain
   Six methods forward to the merge policy with the same signature.
   The layer renames, it does not change the abstraction. E1-F2.

3. status-feed            information leakage
   The "not yet synced" rule is written as a literal in the feed and
   again in the queue. Two files, one decision, no single home. E1-F3.

4. photo-store            shallow interface
   Nine methods over one blob row. A caller must know the eviction
   order to use it correctly, so the interface restates the inside.</code></pre>

Then the run stops. The gate is a person, not a score. For the candidate you pick, the survey has already stated the interface as it stands, the interface proposed, what a caller would no longer need to know, and an estimated cost. You choose the first one. The result, in the shape the skill's own output contract defines:

<pre><code>survey:
  modules_read: 38
  candidates_found: 4
chosen:
  module: src/sync/sync-client.ts
  failure: temporal decomposition &mdash; capture, queue, and send each
           know the envelope format
  caller_knew: envelope version, field order, retry budget, flush order
  caller_knows_now: an inspection and a destination
  chosen_by: human
work:
  steps: 6
  suite: 189 passed, 0 failed
  behavior_changed: none
declined: [conflict-resolver pass-throughs, status-feed leakage,
           photo-store shallow wrapper]
open: &lt;candidates surveyed and not chosen&gt;</code></pre>

The three declined candidates are findings, recorded in the trace. They are not a backlog the run works anyway. Had the survey found that no single seam was separable from the rest, it would have said so plainly and stopped, because a decomposition that has to move all at once belongs to `architect`.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A seam that earns its place</div>
<pre><code>sync.send(inspection, destination)  <span class="tok-comment"># the whole interface</span>

<span class="tok-comment"># the caller no longer knows:</span>
<span class="tok-comment">#   envelope version and field order</span>
<span class="tok-comment">#   retry budget and backoff</span>
<span class="tok-comment">#   queue flush order</span></code></pre>
<div class="compare-card-note">From <code>DEEP-MODULES.md</code>: "Every candidate is judged on one question, stated the same way each time: name what a caller no longer has to know."</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Code relocated, interface the same width</span>
<span class="tok-warn">A boundary drawn by when things run</span>
<span class="tok-warn">A step that changes observable behavior</span></code></pre>
<div class="compare-card-note">A change that relocates code without narrowing the interface is a move, not a deepening, so it leaves the list. And from <code>DEEP-MODULES.md</code>: "Sequence belongs inside a module; knowledge decides where the module ends."</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What actually makes a module deep rather than just large?</summary>
<div class="qa-body">

The ratio between the two sizes, not either size alone. Interface width is what a caller must understand to use the module correctly. Implementation depth is how much work sits behind that. A Unix file has roughly five operations over disk scheduling, block allocation, caching, and permissions, and almost none of that reaches the caller. A one-line function can be deep if it hides a rule nobody wants to remember. A thousand-line class can be shallow if using it correctly requires knowing what is inside.

</div>
</details>

<details class="qa">
<summary>How does information leakage show up in practice?</summary>
<div class="qa-body">

One design decision is written into two or more modules, and a change to one forces a matching change in the other. Nothing in either module says so. It is usually easier to spot from the change history than from the code: two files that keep appearing in the same commit, for unrelated-looking reasons, share a decision with no single home. The fix is not a comment. It is moving the decision behind one interface.

</div>
</details>

<details class="qa">
<summary>Why is splitting a system by when things happen a problem?</summary>
<div class="qa-body">

Because order of operations is a property of a run, not a body of knowledge. Read, then transform, then write feels natural, and it is the most common way information leakage gets designed in. If reading and writing a format are separate modules, both must know that format, and every change to it touches both. The check is to state what each side hides from the other. If both sides know the same fact, the boundary is in the wrong place.

</div>
</details>

<details class="qa">
<summary>Are pass-through methods always wrong?</summary>
<div class="qa-body">

No. A genuine adapter between two vocabularies earns its place, and so does a stable interface placed in front of a volatile one. The test is whether the method changes the abstraction. If it only changes the name, remove the layer or give it enough responsibility to be worth crossing. A related smell is the pass-through variable, threaded through several call sites so a deep function can reach it, teaching every function on the path about a value it does not use.

</div>
</details>

<details class="qa">
<summary>Why does the agent stop instead of picking the best candidate itself?</summary>
<div class="qa-body">

Because the ranking is a technical measure and the choice is not. Hidden complexity says which candidate removes the most knowledge from callers. It does not rank business value, and it cannot see constraints outside the repository — a freeze, a team that already consumes the interface, a rewrite planned for next quarter. So the survey presents at most five candidates and waits. The agent never picks the architecture.

</div>
</details>

<details class="qa">
<summary>What happens when there is no test covering the seam?</summary>
<div class="qa-body">

Characterization tests are written first, or the run stops and reports that the change cannot be shown safe. This is where refactor calls the Skill tool with `tdd`. A seam moved without a test pinning its behavior is a change nobody can prove kept the behavior the same.

</div>
</details>

<details class="qa">
<summary>What if a step changes what the software does?</summary>
<div class="qa-body">

That step is reverted. A refactor that changes behavior is a feature change wearing the wrong name, and it should be scoped and reviewed as one. Separately, if the chosen candidate outgrows its stated cost, the run stops, reports the revised cost, and returns the decision to the human who made the first one.

</div>
</details>

<details class="qa">
<summary>Will this fix a codebase that is genuinely tangled?</summary>
<div class="qa-body">

No, and the skill says so in its own first lines: this is a survey, not a rescue. On a genuinely tangled codebase it finds real candidates and will not untangle the mud on its own. Where every module knows every other module, the honest output is a list of real findings with no safe first step, reported as such.

</div>
</details>

## It's working if

- Every candidate presented carries a named failure mode, so a person is judging findings rather than hunches.
- The run stops at the survey and a person names the candidate, before any file is edited.
- Each worked step leaves the suite green, and no step changes observable behavior.
- The candidates nobody chose are recorded in the trace as findings, and stay there.
- Someone can state in one sentence what a caller no longer has to know.

If a run produces a reorganized tree and no caller can say what it stopped needing to know, the seam was decorative and the change bought nothing.

## Where it fits

**Refactor is the developer group's structural survey: it names where complexity could be hidden, ranks the candidates, and hands the choice to a person.**

Its nearest neighbor is `tdd`, which pins a seam's behavior before it moves and supplies the green that each small step runs between. `architect` takes over when the answer is a new decomposition rather than a deeper module, and `recon` runs first on a codebase nobody in the session knows. `debug` is the one to reach for when something is broken, since a defect and a design problem are different jobs.

If none of this settles which skill fits, `ask-fde` routes you.
