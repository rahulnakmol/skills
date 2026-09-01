---
layout: skill
name: discover
title: "Discover — Root-Cause Analysis Before Solutioning"
description: "Discover turns a raw business problem, meeting notes, or a vague opportunity into a stakeholder-grounded, root-cause analysis before any solution design."
group: pm
invocation: user-invoked
scenario: "Finding the real cause of a slipping month-end close"
lens:
  novice:
    who: "You have been handed 'the reporting is slow, fix it,' and you already suspect that is a symptom someone noticed first, not the actual problem."
    value: "Discover forces the Five Whys before you write anything down, so what you hand off names the actual cause, not the first plausible one."
  practitioner:
    who: "You get pulled into initiatives after someone else already decided what to build, and you keep having to reverse-engineer what problem it was supposed to solve."
    value: "Five clarification dimensions and root-cause analysis happen before classification, so the analysis document you hand to map is grounded in evidence, not a solution dressed up as a problem statement."
  leader:
    who: "Your team keeps shipping projects that technically deliver what was asked for and still miss the business problem."
    value: "Discover redirects solution-first framing back to 'what problem does this solve' at intake, and the Framing gate requires the problem owner to state the problem in their own words before work proceeds."
  csuite:
    who: "You sign off on transformation spend and want assurance it is chasing a real cause, not a symptom someone happened to notice first."
    value: "Every analysis triangulates across at least three sources before it is written down — a single stakeholder's account is never treated as the full picture."
journey: run-a-product-org
journey_title: "Run a product org"
journey_step: 1
journey_steps: 4
journey_next: carve
---

## What it does

Discover is the pm group's entry point for a raw business problem — meeting notes, a transcript, a vague opportunity — before anyone proposes a solution. It is where the run-a-product-org journey begins, and where the pm group's own Discover-Define-Design-Deliver cycle opens, because nothing downstream can be trusted if the problem underneath it was never actually named.

It verifies or bootstraps the initiative repository, classifies which hat the engagement wears, then clarifies across five dimensions in the grill's themed rounds rather than a single long form. Every problem statement is decomposed with Five Whys or Fishbone before it is accepted as final, distinguishing root causes from symptoms rather than treating the first plausible cause as the answer. The output is one analysis document a problem owner can confirm before it hands off to `map`.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Confirm the substrate</span><span class="step-text">Verify or bootstrap the initiative repository before any real work begins.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Classify the hat</span><span class="step-text">Product or transformation, from the shape of the problem — ask only if genuinely ambiguous.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Accept raw inputs</span><span class="step-text">Meeting notes, transcripts, spreadsheets are normalized rather than re-asked for.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Clarify across five dimensions</span><span class="step-text">Themed rounds, then Five Whys or Fishbone to find root cause rather than the first plausible one.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Classify and confirm</span><span class="step-text">The initiative type, problem statement, and root causes go back to the user before anything is written.</span></div>
</div>

<ul class="benefits">
  <li>A request that arrives as "build me X" is redirected back to "what problem does X solve" before scope is ever set, so the analysis grounds the solution instead of dressing it up after the fact.</li>
  <li>Root causes are separated from symptoms with Five Whys or Fishbone, so the analysis names the vendor contract that predates the ERP migration, not just the slow reporting someone first noticed.</li>
  <li>A single stakeholder's account is never treated as the full picture — every analysis triangulates across at least three sources before it is written down.</li>
  <li>The problem owner confirms the classification, statement, and root causes in their own words before the document exists, so Framing has something real to sign.</li>
</ul>

`METHOD.md` states the redirect discover forces at intake in one line: "solution-first framing ('we need to build X') is redirected back to 'what problem does X solve?'"

- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/discover/METHOD.md) covers the five clarification dimensions, the root-cause step, and the four-way initiative classification.
- [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md) and [`INITIATIVE-REPO.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/INITIATIVE-REPO.md) cover the substrate discover verifies or bootstraps before any real work starts.
- [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md) covers the product-versus-transformation classification discover runs at intake.

## When to reach for it

Type `/discover` in Claude Code, or name the skill directly in a session. Discover is user-invoked, so nothing reaches for it on its own: a person decides a raw problem needs structured investigation before any solution gets proposed.

You reach for discover in two moments named in `SKILL.md`. A new business problem, opportunity, or transformation candidate needs structured investigation. The user arrives with meeting notes, a transcript, or raw data rather than a clean brief, and the shape of the actual problem underneath it is not yet clear.

Discover is not the only skill that touches problem framing. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The problem is already understood, and you need personas or process flows next | [`map`]({{ '/map/' | relative_url }}) |
| The initiative is too big to analyze in one pass at all | [`chart`]({{ '/chart/' | relative_url }}) |
| You need the practice's principles, not this initiative's problem | [`constitution`]({{ '/constitution/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Discover is user-invoked: type <code>/discover</code>, or name it directly in a session. It accepts meeting notes, transcripts, and raw CSV or spreadsheet data pasted or attached directly into the conversation, normalizing them rather than asking for a clean brief.</p>
<div class="prompt-card">Here are the finance team's meeting notes and last quarter's close-cycle spreadsheet. Reconciliation errors keep spiking at month end and delaying close by three business days. Run discovery: classify the hat, clarify across your five dimensions, and find the root cause before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude Code works the themed clarification rounds, decomposes the root cause, then presents the classification and problem statement for confirmation before writing the analysis document.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode's installed command layer wraps the developer group's tools; no command wraps discover or any pm skill. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies discover's procedure when a request matches it.</p>
<div class="prompt-card">Here are the finance team's meeting notes and last quarter's close-cycle spreadsheet. Reconciliation errors keep spiking at month end and delaying close by three business days. Run discovery: classify the hat, clarify across your five dimensions, and find the root cause before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode works the clarification rounds in its reply, then states the confirmed classification and root cause before writing the file.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. It reads the catalog in <code>.agents/skills/</code> as context and applies discover's procedure by following the shared rules in <code>AGENTS.md</code>, routing model choice through its own <code>auto</code> mode.</p>
<div class="prompt-card">Here are the finance team's meeting notes and last quarter's close-cycle spreadsheet. Reconciliation errors keep spiking at month end and delaying close by three business days. Run discovery: classify the hat, clarify across your five dimensions, and find the root cause before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the analysis file directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal catalog, plus the generated sidecar <code>agents/openai.yaml</code>. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Here are the finance team's meeting notes and last quarter's close-cycle spreadsheet. Reconciliation errors keep spiking at month end and delaying close by three business days. Run discovery: classify the hat, clarify across your five dimensions, and find the root cause before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same analysis file, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook for discover specifically, so the instruction file is what tells the agent to redirect solution-first framing and run the five-dimension clarification before writing anything down.</p>
<div class="prompt-card">Here are the finance team's meeting notes and last quarter's close-cycle spreadsheet. Reconciliation errors keep spiking at month end and delaying close by three business days. Run discovery: classify the hat, clarify across your five dimensions, and find the root cause before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot works the clarification rounds in chat and reports the confirmed classification before writing the file.</p>
</div>
</div>

A good ask hands over whatever raw material already exists — notes, a transcript, a spreadsheet — rather than a pre-written problem statement, since discover's own job is separating the real cause from what was first noticed. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Readers who want discover alone:

```bash
./scripts/link-skills.sh --skill discover
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

You type the prompt above about reconciliation errors. Discover confirms the initiative repository exists, then classifies the hat: this reads as product, since the fix will ship as a feature the checkout and finance teams both touch, not a full operating-model redesign. It accepts the notes and spreadsheet directly rather than asking you to summarize them first.

Clarification runs in the grill's themed rounds rather than one long form. The business-context round establishes this sits inside order-to-cash. The stakeholder round names the finance lead as decision-maker, the AR team as end users, and platform engineering as a dependency — three sources, so the triangulation requirement is met before any cause gets written down. The problem-definition round surfaces the first plausible cause: "the CSV export is slow." Five Whys keeps pushing past it: the export is slow because matching is manual, matching is manual because the export format is legacy, and the format is legacy because it predates the current ERP. It predates the ERP because the vendor contract was never renegotiated after that migration.

Discover presents the classification and problem statement for your confirmation, then writes:

<pre><code><span class="tok-comment"># specs/checkout-analysis.md</span>
Problem statement: Reconciliation errors spike at month end,
  delaying close by three business days.
Stakeholder register: Finance lead (decision-maker), AR team
  (end users), Platform engineering (dependency).
Classification: Process Automation
Hat: product
Root causes (Five Whys): manual CSV reconciliation → no
  automated matching → legacy export format → vendor contract
  predates the current ERP → never renegotiated after migration.
Constraints: no budget for a new reconciliation vendor this
  fiscal year.
Success criteria: close cycle back to one business day.
Entry mode: sponsor-initiated, thin evidence in hand.
Next step: map</code></pre>

The vendor-contract root cause, not "the export is slow," is what `map` and later `carve` will actually build against.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">Solution-first framing, redirected</div>
<pre><code>Intake note: "We need to build a self-serve
reporting dashboard."
<span class="tok-ok">Discover: "What problem does the dashboard</span>
<span class="tok-ok">solve?" — redirected before scope is set.</span></code></pre>
<div class="compare-card-note">"We need to build X" is redirected back to "what problem does X solve?" before anything else happens.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Intake note: "We need to build a self-serve
reporting dashboard."
<span class="tok-warn">Analysis proceeds straight to dashboard</span>
<span class="tok-warn">requirements — the request accepted as</span>
<span class="tok-warn">the problem statement.</span></code></pre>
<div class="compare-card-note">A problem statement that is actually a solution in disguise is one of discover's own stop conditions.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if clarification runs past four rounds without converging?</summary>
<div class="qa-body">

`SKILL.md` names this a stop condition, not a signal to keep asking: more than four rounds of clarification without synthesizing means analyze what is already in hand. A fifth round rarely surfaces new evidence — it usually means the earlier rounds were not read closely enough before the next question got asked.

</div>
</details>

<details class="qa">
<summary>Why does the hat get classified before anything else?</summary>
<div class="qa-body">

Because product and transformation personas, artifacts, and downstream skills diverge from there. `HATS.md` warns that mixing the two mid-initiative "produces documents that answer to neither audience well." Discover classifies from the shape of the problem and asks the user directly only when genuinely ambiguous — never as a routine first question.

</div>
</details>

<details class="qa">
<summary>What counts as triangulation, exactly?</summary>
<div class="qa-body">

`METHOD.md` is explicit that a single stakeholder's account is never treated as the full picture — root causes are triangulated across at least three sources before the analysis is written down. A finance lead's account of why reconciliation is slow is one data point; the AR team's daily experience of the exception queue is a second; the export format's own documented age is a third.

</div>
</details>

<details class="qa">
<summary>Does discover distinguish a root cause from a symptom automatically?</summary>
<div class="qa-body">

No — Five Whys or Fishbone is the discipline that forces the distinction, and it runs on every problem statement before that statement is accepted as final. `METHOD.md` frames the risk directly: without it, the first plausible cause gets treated as the answer, which is exactly the failure a slow reporting complaint disguises when the real cause is a legacy export format three steps upstream.

</div>
</details>

<details class="qa">
<summary>What happens to raw inputs once discover accepts them?</summary>
<div class="qa-body">

They are normalized into a file under `specs/research/`, per `RESEARCH-AGENTS.md`, so they survive past the conversation that produced them and become part of the citation corpus `grill`'s with-docs mode draws from later. A meeting note is never just read and discarded.

</div>
</details>

## It's working if

- Every analysis names a root cause several steps upstream of the first complaint, not the symptom someone happened to notice first.
- A "we need to build X" request gets redirected to "what problem does X solve" before scope is set, every time, not only when someone remembers to ask.
- The problem owner can state the problem in their own words before the document is written, and that confirmation is what Framing actually checks.
- Every claim in the analysis traces to at least three triangulated sources, not one stakeholder's account repeated with confidence.

If an analysis keeps naming a technical symptom as the root cause because Five Whys stopped after two questions instead of five, the document still reads as thorough while the actual cause stays undiscovered.

## Where it fits

Discover opens the run-a-product-org journey and the pm group's own Discover-Define-Design-Deliver cycle described in `DDDD.md`: it establishes what actually needs to be accomplished, from whoever is asking, before anything gets classified or scoped. Its direct handoff is `map`, which turns the confirmed analysis into personas and process flows for the Business Understanding Document.

Where an initiative is too large to analyze in one discover pass, `chart` plans the decisions first and routes an evidence or discovery ticket back into discover once the question is precise enough to state. `constitution` sits underneath rather than downstream — discover reads its principles chain for alignment, but produces this initiative's own analysis, not the practice's standing rules.

If none of this settles which skill fits at all, `ask-pm` routes you — plain-language intent goes in, one skill name and a one-line reason come back out.
