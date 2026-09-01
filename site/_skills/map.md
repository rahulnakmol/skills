---
layout: skill
name: map
title: "Map — Personas, Flows, and the Understanding Document"
description: "Map turns a discovery analysis into personas, current and target process flows, and the Business Understanding Document the Framing gate signs."
group: pm
invocation: model-invoked
scenario: "Mapping the reconciliation bottleneck for the Framing gate"
lens:
  novice:
    who: "You have read the discovery analysis and now have to turn stakeholder notes into personas and a process diagram, and you are not sure how detailed either needs to be."
    value: "Map fixes the shape for you — three to six named personas, current and target flows with pain points marked red and improvements marked green — so you are not guessing at the right level of detail."
  practitioner:
    who: "You draft Business Understanding Documents every quarter, and the diagrams are usually the part reviewers actually read."
    value: "The one-figure-one-claim rule keeps a flow diagram from trying to carry two arguments at once, which is usually why a diagram gets questioned in the room instead of approved."
  leader:
    who: "Your Framing gate reviews keep getting stuck relitigating what a diagram is actually claiming."
    value: "Every figure follows the same visual system as the rest of the practice, so a reviewer who has seen one Map document can read the next one without relearning the encoding."
  csuite:
    who: "You need transformation documents that state a problem's mechanism plainly enough to approve in one sitting."
    value: "The Business Understanding Document is the artifact the Framing gate signs — it exists so a problem owner can state, in their own words, what problem is being solved and for whom."
---

## What it does

Map is the pm group's bridge from a confirmed problem to a document a human can approve in one sitting. It turns a completed discovery analysis into three to six named persona profiles, current-state and target-state process flows in Mermaid, and the Business Understanding Document — the artifact the Framing gate actually signs.

Personas differ by hat: end-user personas under the product hat, organizational-actor personas under the transformation hat, each carrying a RACI role — who is responsible, accountable, consulted, and informed. Every figure passes through visual compression before it is finalized — one figure, one claim — so a document never ships a diagram trying to carry two arguments at once. Map also routes its own handoff: product hat to `carve`, transformation hat to `tom-architect`.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the analysis</span><span class="step-text">Extract the problem statement, stakeholders, classification, root causes, and entry mode.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Build the personas</span><span class="step-text">Three to six named profiles — end users under product, organizational actors with RACI under transformation.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Generate current and target flows</span><span class="step-text">Mermaid diagrams with pain points marked red and improvements marked green.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Compress before finalizing</span><span class="step-text">One figure, one claim — applied to every figure before it ships.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Assemble and route</span><span class="step-text">The document the Framing gate signs, then handed off by hat: product to carve, transformation to tom-architect.</span></div>
</div>

<ul class="benefits">
  <li>A reviewer who has seen one Map document reads the next one without relearning the encoding, since every figure follows the same house visual system.</li>
  <li>A diagram never has to carry two arguments at once — the one-figure-one-claim rule catches that before the document ships, not in the review room.</li>
  <li>Personas are never generic: three to six named profiles, with RACI attached under the transformation hat rather than a feeling stood in for accountability.</li>
  <li>The handoff routes itself by hat, so a product-hat document never lands on tom-architect's desk, and a transformation-hat one never lands on carve's.</li>
</ul>

`VISUALS.md` states the rule every figure answers to in one line: "if a figure tries to carry two arguments at once, it is two figures that have not yet been separated."

- [`VISUALS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md) covers the compression rule, the house color system, and the SVG-first, PNG-by-conversion format order.
- [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) covers the persona style split between the product and transformation hats.
- [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md) names the Framing gate and the evidence — the five-dimension intake, root-cause analysis, named stakeholders — the Business Understanding Document has to carry.

## When to reach for it

Map has no slash command. It is reached the way every model-invoked skill in this catalog is reached: an orchestrating skill or session calls it once `discover` has produced an analysis and the request asks for personas, process flows, or a swimlane diagram.

`test/eval/routing.jsonl` case r026 tests exactly this recognition, and it reads, byte for byte:

<pre><code>{"id":"r026","utterance":"map the personas and the current and target journeys","expect":"map"}</code></pre>

Map is not the only skill that touches this stretch of the pipeline. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| No discovery analysis exists yet for map to read | [`discover`]({{ '/discover/' | relative_url }}) |
| Personas and flows exist, product hat, and it is time to cut epics | [`carve`]({{ '/carve/' | relative_url }}) |
| Personas and flows exist, transformation hat, and a full operating model is needed | [`tom-architect`]({{ '/tom-architect/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Map is not typed. Once <code>discover</code> has written its analysis file, a request for personas or process flows leads the session to call the Skill tool with <code>map</code> — the mechanism the invocation axis in every skill's frontmatter declares for a model-invoked skill.</p>
<div class="prompt-card">Discovery on the reconciliation problem is confirmed and the analysis file is written. Map the personas and the current and target journeys, then assemble the Business Understanding Document for Framing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The session returns the persona profiles, both Mermaid flows, and the assembled document, then names which skill the hat routes to next.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps map or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies map's procedure when a request matches its description.</p>
<div class="prompt-card">Discovery on the reconciliation problem is confirmed and the analysis file is written. Map the personas and the current and target journeys, then assemble the Business Understanding Document for Framing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode writes the personas and both flows directly in its reply, since no command wraps the assembly step.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. It reads the catalog in <code>.agents/skills/</code> as context and applies map's procedure by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode.</p>
<div class="prompt-card">Discovery on the reconciliation problem is confirmed and the analysis file is written. Map the personas and the current and target journeys, then assemble the Business Understanding Document for Framing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the personas, both flows, and the assembled document directly in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Discovery on the reconciliation problem is confirmed and the analysis file is written. Map the personas and the current and target journeys, then assemble the Business Understanding Document for Framing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same document, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook for map specifically, so the instruction file is what tells the agent to apply the compression rule before any figure ships.</p>
<div class="prompt-card">Discovery on the reconciliation problem is confirmed and the analysis file is written. Map the personas and the current and target journeys, then assemble the Business Understanding Document for Framing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot reports the personas and both flows in chat, then writes the assembled document.</p>
</div>
</div>

A good ask confirms the analysis file already exists and names the hat if it is not already recorded, since persona style diverges sharply between end-user and organizational-actor profiles. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want map alone:

```bash
./scripts/link-skills.sh --skill map
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

Discovery on the reconciliation problem is confirmed: manual CSV matching, a legacy export format, a vendor contract that predates the current ERP. You type the prompt above. Map reads the analysis file and extracts the stakeholder register — finance lead, AR team, platform engineering — to build personas from.

Because the hat is product, personas describe end users with behaviors and feelings rather than organizational roles. The primary one: an AR Reconciliation Analyst who spends the first three days of every month manually matching CSV rows against the ledger, and who flags exceptions by hand in a spreadsheet nobody else can see. Map generates the current-state flow with that bottleneck marked red, and a target-state flow with automated matching and a same-day exception queue marked green — one figure per state, each carrying exactly the mechanism the decision turns on:

<pre><code><span class="tok-comment"># specs/checkout-understanding-doc.md (excerpt)</span>
Persona: AR Reconciliation Analyst (end user, product hat)

flowchart LR
  A[CSV export] --> B[Manual matching]
  B --> C[Exceptions worked by hand]
  C --> D[Close signed off, day 3]
  <span class="tok-warn">%% pain point: manual matching, marked red</span>

flowchart LR
  A[CSV export] --> B[Automated matching]
  B --> C[Exception queue, same day]
  C --> D[Close signed off, day 1]
  <span class="tok-ok">%% improvement: automated matching, marked green</span></code></pre>

Before the document is assembled, map checks the compression rule against a first draft that also tried to show a staffing plan on the same diagram, and splits it into a separate figure rather than letting one flowchart carry two arguments. The finished Business Understanding Document routes, by the product hat already classified, to `carve`.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">One figure, one claim</div>
<pre><code>Figure: Reconciliation bottleneck moves from
<span class="tok-ok">manual matching (current) to automated</span>
<span class="tok-ok">matching with a one-day exception queue</span>
<span class="tok-ok">(target).</span>
One argument. One figure.</code></pre>
<div class="compare-card-note">Compress the mechanism the decision actually turns on, not a decorative restatement of the topic.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Figure: current state, target state, staffing
<span class="tok-warn">plan, and vendor comparison, all on one</span>
<span class="tok-warn">diagram.</span></code></pre>
<div class="compare-card-note">A figure trying to carry two arguments at once is two figures that have not yet been separated.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if no discovery analysis exists yet?</summary>
<div class="qa-body">

`SKILL.md` names this a stop condition: run `discover` first. Map has nothing to read without it — personas and flows built from an unconfirmed problem statement would describe a guess, not the analysis a problem owner actually confirmed.

</div>
</details>

<details class="qa">
<summary>Can a process flow ship without a persona behind it?</summary>
<div class="qa-body">

No — `SKILL.md`'s second stop condition blocks exactly this: a process flow with no defined persona behind it does not ship. A flow diagram is a claim about someone's experience of a process, and without a named persona there is no one whose experience it is actually claiming to show.

</div>
</details>

<details class="qa">
<summary>Why does the persona style change between the two hats?</summary>
<div class="qa-body">

`HATS.md` draws the line directly: under the product hat, personas are end users, named with behaviors and feelings, the kind of persona a product requirements document's acceptance criteria are written against. Under the transformation hat, they are organizational actors — a claims processor, a regional finance lead — described with a RACI role rather than a feeling, because the audience reading the document is different in each case.

</div>
</details>

<details class="qa">
<summary>What does the house visual system actually fix?</summary>
<div class="qa-body">

`VISUALS.md` names four fixed elements: canvas `#FAF9F5`, ink `#262625`, coral `#C96442` for the element carrying the decision or the human node, and slate `#40668C` for agent or in-progress elements, with arrows labeled by what they mean rather than left bare. Consistency here is not decoration — a reviewer who has read one figure reads the next one without relearning the encoding.

</div>
</details>

<details class="qa">
<summary>What happens when a raster copy or a deck is needed?</summary>
<div class="qa-body">

`VISUALS.md` treats SVG as the native, hand-authored format, with PNG produced by conversion where the tooling exists and a full pack assembled through the pptx skill where it is installed. Each of these is a capability, not a guarantee — where a conversion path is unavailable, the degradation is stated plainly and the SVG ships on its own.

</div>
</details>

## It's working if

- Every figure in a Business Understanding Document makes exactly one claim a reader can restate in one sentence, not two arguments sharing one diagram.
- Every process flow has a named persona whose experience it is claiming to depict, not a generic actor standing in for "the user."
- A reviewer who has read one Map document navigates the color encoding in the next one without asking what red or green means here.
- The handoff after assembly names the right next skill for the hat, every time, without the user having to ask which one comes next.

If a document keeps passing review because each individual figure is simple while the set of them together argues three unrelated points, the compression rule has been satisfied figure by figure while the document as a whole still overloads the reader.

## Where it fits

Map is the Define-phase step directly after discover in the pm group's own Discover-Define-Design-Deliver cycle: it reads the analysis discover confirmed and fixes what will actually be produced — the personas, the flows, the document — as the baseline everyone downstream now builds against. Its upstream dependency is `discover`; its downstream handoff splits by hat, to `carve` under product and `tom-architect` under transformation.

`VISUALS.md`'s compression rule is not unique to map: `roadmap` and `report` reference the same doctrine before they ship a figure. Map is where it first applies inside the pipeline, on the document the Framing gate reads before any epic or target operating model exists.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
