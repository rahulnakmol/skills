---
layout: skill
name: spotlight
title: "Spotlight: Put the Decision-Relevant Structure in View"
description: "Spotlight turns established context into the smallest source-grounded visual a human needs, while keeping observations, inferences, and proposals distinct."
group: productivity
invocation: user-invoked
scenario: "Spotlighting the QuenServe E1-F1-S1 offline-sync path without inventing implementation details the product example does not establish"
lens:
  novice:
    who: 'You understand the words in an explanation but cannot yet see how the parts fit together.'
    value: 'Spotlight chooses one small visual and labels what is known, proposed, and still missing, so you can ask about the structure without absorbing a complete system map.'
  practitioner:
    who: 'You need to explain a code path, ownership boundary, or change to a reviewer who has little time.'
    value: 'The skill chooses between a call tree, file tree, diagram, diff, or focused artifact, and cites the source behind every relationship that matters.'
  leader:
    who: 'You need one view that exposes the decision without letting a polished diagram substitute for evidence.'
    value: 'Every view states its claim, sources, unknowns, and deliberate omissions, leaving the decision with the human who owns it.'
  csuite:
    who: 'You receive technical pictures that often hide whether they describe today, a forecast, or a proposal.'
    value: 'Observed, inferred, and proposed material is labeled in the figure itself, so visual confidence cannot erase the difference between evidence and intent.'
---

## What it does

Spotlight answers one question: what is the smallest truthful view that makes the current structure visible? It starts from context already established in the conversation, repository, or source document. It does not conduct a new discovery program, decide the issue, or treat a diagram as evidence that behavior ran.

The skill earns its place by improving the review surface. Every material relationship is labeled as observed, inferred, or proposed. Sources sit beside the labels they support. Unknowns and deliberate omissions remain visible, because a clean picture that conceals uncertainty gives a human less control rather than more.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Name the question</span><span class="step-text">State what the view must answer and which human decision it informs.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Establish the source</span><span class="step-text">Read the relevant implementation or document. Treat supplied statements as supplied evidence, not observed behavior.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Classify the claims</span><span class="step-text">Mark each material point observed, inferred, or proposed before visual styling can blur the distinction.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Choose the smallest view</span><span class="step-text">Use pseudocode, a tree, a diagram, a diff, a full block, or focused HTML according to the relationship at issue.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Remove the rest</span><span class="step-text">Keep one claim and one abstraction level. Split a second claim rather than hiding both in one crowded figure.</span></div>
  <div class="step"><span class="step-num">6</span><span class="step-label">Attach provenance</span><span class="step-text">Place source references, unknowns, and assumptions where the reader encounters the claim they qualify.</span></div>
  <div class="step"><span class="step-num">7</span><span class="step-label">Inspect the result</span><span class="step-text">Check the view against its question and sources. Render and exercise a standalone artifact before calling it verified.</span></div>
  <div class="step"><span class="step-num">8</span><span class="step-label">Return judgment</span><span class="step-text">Show what the visual establishes and what it does not. The human still makes the decision.</span></div>
</div>

<ul class="benefits">
  <li>The format follows the question instead of habit, so a simple call tree does not become a diagramming project.</li>
  <li>Provenance sits inside the review surface, making it possible to challenge a relationship without reconstructing the whole conversation.</li>
  <li>Current and proposed states cannot quietly share one visual language, because their status is written where each state appears.</li>
  <li>Progressive disclosure keeps the first answer small. A reader can request another layer without paying for every layer up front.</li>
  <li>Visual polish remains separate from behavioral proof. The view explains what the source says and never claims that the depicted system ran.</li>
</ul>

The default result stays in the conversation. A standalone HTML artifact is the last step, used only when the subject is visual, dense, or interactive. That artifact is self-contained, carries no remote scripts or analytics, and must be opened in a real browser before the skill reports it verified.

## When to reach for it

Type `/spotlight` in Claude Code, or ask another catalog reader to spotlight the current topic. The skill is user-invoked because the reader decides when a visual would help and which question deserves the focus.

Reach for it when prose hides a flow, hierarchy, ownership boundary, comparison, or proposed change. Do not use it merely because a diagram would look finished. The source and question must exist first.

| The problem | The skill |
|---|---|
| The explanation may be accurate, but its structure is hard to see | `spotlight` |
| A particular explanation failed and the cause is unknown | [`wait-what`]({{ '/wait-what/' | relative_url }}) |
| The reader lacks a prerequisite and must learn to apply it | [`teach`]({{ '/teach/' | relative_url }}) |
| The team needs a durable rule in the files its agents read | [`brief`]({{ '/brief/' | relative_url }}) |
| A later session needs the state and decisions of the current run | [`handoff`]({{ '/handoff/' | relative_url }}) |

Install the catalog once:

```bash
npx skills@latest add tqnonline/skills
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for installation and invocation details across all supported hosts.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Type <code>/spotlight</code> with the question and the source to inspect. Claude Code can return an inline view or write a focused artifact when the request needs one.</p>
<div class="prompt-card">Spotlight the QuenServe E1-F1-S1 offline-sync path. Use only facts established in site/example.md. Label anything the source does not establish as unknown, and choose the smallest view that shows why the story is one delivery slice.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The answer should cite the hierarchy and avoid inventing queues, services, acknowledgments, or storage mechanisms that the example never names.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Plain ask</span></div>
<div class="tool-group-body">
<p>OpenCode reads the shared catalog from <code>.agents/skills/</code>. Ask it to spotlight a flow, tree, or change and name the decision the view should inform.</p>
<div class="prompt-card">Read the current diff, then spotlight which file owns each part of the change. Use a shallow file tree, cite every file, and separate observed changes from any proposed follow-up. Omit files that do not change the ownership answer.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>A file tree is enough when ownership is the question. The skill should not escalate to HTML merely because the host can render it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared skill, plain ask</span></div>
<div class="tool-group-body">
<p>These tools read the same catalog and can apply the skill without a dedicated adapter. Keep the source paths in the request when the current editor context does not contain the whole flow.</p>
<div class="prompt-card">Spotlight how E1-F1-S1 relates to E1-F1 and E1 in the QuenServe example. Use a three-level tree, mark every relationship observed, cite the source lines, and list the implementation details that remain unknown.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The result should have the same trust boundary in Cursor, Codex, and GitHub Copilot: a visual claim without a source is labeled inferred or proposed, never observed.</p>
</div>
</div>

A strong request names the question, the human decision, and the source. It can also set a preferred format, but the skill should recommend a smaller one when that form carries the claim with less unsupported surface.

## A working example

The source is the [QuenServe example]({{ '/example/' | relative_url }}). It establishes that E1 is offline inspection sync, E1-F1 is offline capture, and E1-F1-S1 lets an inspector complete an inspection without connectivity and sync it without loss. It does not name the storage engine, queue, network protocol, service boundary, or conflict algorithm.

The question is narrow: why is E1-F1-S1 a delivery story beneath E1-F1 rather than the whole offline-sync epic? A three-level tree is enough.

<pre><code>OBSERVED &middot; source: site/example.md, hierarchy

E1 &middot; offline inspection sync                         epic
└── E1-F1 &middot; offline capture                         feature
    └── E1-F1-S1 &middot; complete with no connectivity   story
                    and sync without loss

UNKNOWN &middot; source does not establish
storage &middot; queue &middot; protocol &middot; service boundary &middot; retry behavior</code></pre>

The view carries one claim: the story is one user-visible slice nested beneath a capability and an epic. It does not draw an implementation flow, because the source does not contain one. Adding a local database, sync worker, or server acknowledgment would make the picture richer and less truthful.

The accompanying output remains compact:

```yaml
question: Why is E1-F1-S1 one delivery story rather than the whole epic?
decision: Whether this item is narrow enough to build and prove in one pass
claim: E1-F1-S1 is the no-connectivity completion slice beneath offline capture and offline sync
status: observed
format: component-tree
sources:
  - ref: site/example.md#The-hierarchy
    supports: E1, E1-F1, and E1-F1-S1 nesting and labels
omitted: [other E1 features and stories]
unknowns: [storage, queue, protocol, service boundary, retry behavior]
verified: tree labels checked against the source hierarchy
```

The decision remains human. The tree makes the scope visible; it does not approve the scope.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A small, source-grounded view</div>
<pre><code><span class="tok-ok">OBSERVED</span>
E1
└── E1-F1
    └── E1-F1-S1

<span class="tok-comment">source:</span> site/example.md
<span class="tok-comment">unknown:</span> implementation path</code></pre>
<div class="compare-card-note">The hierarchy answers the scope question. The source and missing implementation facts are visible beside it.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The polished guess</div>
<pre><code><span class="tok-warn">phone database</span>
      ↓
<span class="tok-warn">retry queue</span>
      ↓
<span class="tok-warn">sync service</span>
      ↓
<span class="tok-warn">server acknowledgment</span>

<span class="tok-comment">no source supplied</span></code></pre>
<div class="compare-card-note">This looks like an implementation explanation, but every component was invented. Visual detail has replaced evidence.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Why not always use a diagram?</summary>
<div class="qa-body">

A diagram carries more possible relationships than pseudocode, a tree, or a diff. That flexibility creates room for details the source never established. Spotlight begins with the smallest form and escalates only when the simpler view hides something that changes the answer.

</div>
</details>

<details class="qa">
<summary>Can a spotlight prove that the system works?</summary>
<div class="qa-body">

No. It can explain observed source or summarize an observed test result, but the visual itself does not execute the behavior. A reviewer who needs behavioral proof must inspect the running result or test evidence.

</div>
</details>

<details class="qa">
<summary>When should it produce HTML?</summary>
<div class="qa-body">

Only when the subject is visual, dense, or interactive enough that an inline view conceals the point. The file must be self-contained, source-labeled, responsive, keyboard operable, and inspected in a browser. If it cannot be rendered, it is returned as unverified.

</div>
</details>

<details class="qa">
<summary>What happens when the source is incomplete?</summary>
<div class="qa-body">

The incomplete area is labeled inferred, proposed, or unknown. The skill may ask for another source, but it does not close the gap through visual invention. A sparse truthful view is more useful than a complete-looking false one.

</div>
</details>

<details class="qa">
<summary>Why does the output list omissions?</summary>
<div class="qa-body">

Every focused view leaves something out. Naming that choice lets the reader decide whether the focus is fair. Without the list, progressive disclosure and accidental concealment look identical.

</div>
</details>

## It's working if

- The reader can state the one claim the view carries without reading a separate essay.
- Every material relationship is observed, inferred, proposed, or explicitly unknown.
- Source references sit close enough to the visual labels that a reviewer can challenge them directly.
- Removing any remaining element would hide something that changes the answer.
- The view names what it omits and does not imply that omitted detail was checked.
- A standalone artifact has been rendered and exercised at representative states and viewport sizes.
- The human decision remains open unless the named human makes it.

## Where it fits

**Spotlight is a review-surface skill. It makes established structure visible so a human can understand or decide, and it stops before discovery, implementation, proof, or approval.**

Its nearest neighbor is `wait-what`. Wait-what starts from a failed explanation and diagnoses why it failed. Spotlight starts from a question whose structure would be clearer visually. The two can follow each other, but neither absorbs the other's trigger.

The UNIX boundary is one transformation: established context in, smallest source-grounded visual out. Progressive disclosure governs both the content and the skill itself. The first response uses the least expressive adequate form. Guidance for standalone artifacts loads only when the request crosses that boundary.

The frontier is not a more polished diagram. It is a visual that preserves human judgment by showing where evidence ends, where proposal begins, and what the reader still has to decide.
