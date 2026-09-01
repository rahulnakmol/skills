---
layout: skill
name: grill
title: "Grill — Pressure-Test a PM Artifact Before a Gate"
description: "Grill is the user-invoked skill that interrogates an analysis, manifest, case, or PRD in themed rounds until it earns the right to advance through a gate."
group: pm
invocation: user-invoked
scenario: "Pressure-testing the field-inspection-copilot case before Investment"
lens:
  novice:
    who: 'You have watched an artifact wave through a gate because nobody asked it a hard question. Grill is the loop that asks three to five questions, in themed rounds, until the artifact can answer them.'
    value: 'You get a structured way to pressure-test your own work before a reviewer does it for you, and a Trade-offs record if you choose to stop early, so an early stop is a documented choice, not a silent gap.'
  practitioner:
    who: 'You are about to bring a case, manifest, or PRD to a gate and want to know its weak spot before the sponsor finds it.'
    value: 'Themed rounds with an immediate restatement of scope keep the session converging instead of wandering, and the pre-gate blind-spot checklist catches what a "we ran out of questions" ending would have missed.'
  leader:
    who: 'You review artifacts from several PMs before they reach a gate.'
    value: 'Every artifact that reaches you has been through the same round protocol as the developer group''s own grill loop, so a comparison across artifacts is a comparison of substance, not of who was interrogated harder.'
  csuite:
    who: 'You sign off on initiatives whose case for existing needs to survive being read next to every other initiative competing for the same budget.'
    value: 'Provoke mode and the persona-aware question bank exist specifically to press an artifact on portfolio-level trade-offs and north-star contribution before it reaches you, not after.'
---

## What it does

Grill interrogates a PM artifact — an analysis, a manifest, a case, or a PRD (a product requirements document) — in themed rounds of three to five questions until it earns the right to advance through a gate, or the user explicitly stops. Each round restates the sharpened scope in three sentences or fewer and closes with the same three-way choice: continue, stop, or move to sign-off. Grill runs in one of three modes: a plain round protocol, grill-with-docs when a research corpus exists, or provoke for contrasting intuition-agent hypotheses. Provoke mode pushes toward star 7 or 8 ambition, the differentiated end of the eleven-star scale, which runs from broken (1) to a design exercise no team ships (11). Before any sign-off, grill runs the pre-gate blind-spot checklist. The round protocol is shared directly with the developer group's `core/GRILL.md`, not reinvented.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Choose the mode</span><span class="step-text">Plain round protocol, grill-with-docs when a research corpus exists, or provoke for intuition-agent hypotheses.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Run themed rounds</span><span class="step-text">Three to five questions per round, one dominant theme, answers captured immediately.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Restate the sharpened scope</span><span class="step-text">After each round, in three sentences or fewer; offer continue, stop, or sign-off.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Run the pre-gate blind-spot checklist</span><span class="step-text">Before sign-off.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Record every trade-off</span><span class="step-text">Accepted by an early stop, before the session closes.</span></div>
</div>

<ul class="benefits">
  <li>A case, manifest, or PRD gets pressure-tested by the person who wrote it before a reviewer or a sponsor finds the same weak spot.</li>
  <li>Stopping early is a documented choice, not a silent gap — every trade-off an early stop accepted is written down before the session closes.</li>
  <li>The same round protocol runs for a junior PM's scope round and a Chief Business Transformation Officer's portfolio-level round, so the comparison across artifacts is a comparison of substance.</li>
  <li>Provoke mode presses an artifact toward star 7 or 8 ambition before it reaches a gate, instead of leaving that pressure to whoever reviews it next.</li>
</ul>

[`GRILL-PM.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/grill/GRILL-PM.md) names its own opening claim directly: "an analysis, a manifest, a case, or a PRD is not ready because it looks complete, it is ready because it survived interrogation." The same document is explicit that this loop is not reinvented for the pm group: it "shares its lineage directly with the developer group's `core/GRILL.md`, which the round protocol below reuses by reference rather than reinventing."

## When to reach for it

Type `/grill` in Claude Code, or name the skill directly in a session. Grill is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as an analysis, manifest, case, or PRD about to reach a gate, or a person saying "challenge this," "pressure-test this," or asking for a grill round.

You reach for it before any artifact this practice produces goes in front of a sponsor or a gate reviewer — SKILL.md's sibling-skills line names it as threaded through `discover`, `case`, `carve`, and `prd-draft`. You reach for it again whenever an artifact's core question — its business value, its recommendation, its story — still reads as a placeholder, since sign-off is refused until that question is actually answered.

Grill is not the only skill that touches whether an artifact is ready. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the artifact scored on a fixed rubric after it has already survived interrogation | [`prd-review`]({{ '/prd-review/' | relative_url }}) |
| You need the business case this loop is threaded through before it reaches Investment, the gate where a sponsor commits budget | [`case`]({{ '/case/' | relative_url }}) |
| You need the epic breakdown this loop is threaded through before it enters the manifest | [`carve`]({{ '/carve/' | relative_url }}) |
| You need the PRD this loop is threaded through before it goes to prd-review | [`prd-draft`]({{ '/prd-draft/' | relative_url }}) |
| You are not sure which pm skill fits at all | [`ask-pm`]({{ '/ask-pm/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Grill is user-invoked: type <code>/grill</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; the exit rule is enforced by the procedure itself — an explicit user stop or an explicit sign-off, nothing else — not by anything outside the session.</p>
<div class="prompt-card">Grill the field-inspection-copilot investment case before it goes to the sponsor. Run themed rounds, three to five questions each, restate the scope after every round, and run the pre-gate blind-spot checklist before any sign-off.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Grill runs the round protocol against the case, restates the sharpened scope after each round, and offers continue, stop, or sign-off at every close.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>grill</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>grill</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/grill/SKILL.md and GRILL-PM.md, then run a plain grill round against the field-inspection-copilot case, three to five questions, restating scope after each round.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode runs the round directly in its reply, reading its procedure from the skill files rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. This repository ships no Cursor rule specific to Grill; the two exit criteria — an explicit stop or an explicit sign-off — are enforced by the procedure, not by any automated check.</p>
<div class="prompt-card">Grill the field-inspection-copilot case per skills/pm/grill/GRILL-PM.md's round protocol. Restate the sharpened scope after each round and give me the continue, stop, or sign-off choice every time.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor runs the round directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees Grill's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/grill/SKILL.md, then run a plain grill round against the field-inspection-copilot case — three to five questions, scope restated after each round.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex runs the round the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. There is no continuous-integration backstop specific to Grill the way <code>grit-gates.yml</code> backstops <code>grit</code>; sign-off's precondition — the core question actually answered — is enforced by the procedure, not by any workflow.</p>
<div class="prompt-card">Grill the field-inspection-copilot case before it goes to the sponsor. Three to five questions per round, restate the scope after each one, and run the pre-gate blind-spot checklist before any sign-off.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot runs the round in chat, reading its procedure from the skill files as context.</p>
</div>
</div>

A good ask includes:

- The artifact to grill and where it lives, since the answers are captured directly into it, not into a separate document.
- Which mode fits — plain, grill-with-docs when a research corpus exists in `specs/research/`, or provoke for contrasting hypotheses.
- Whether the whole team's persona matters here — a Product Manager, a Business Architect, a Transformation Leader, or a Chief Business Transformation Officer are each pressed on different themes.

Readers who have not installed the whole skill pack can add Grill alone:

```bash
./scripts/link-skills.sh --skill grill
```

This links only Grill into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>Grill the field-inspection-copilot investment case before it goes to the sponsor. Run themed rounds, three to five questions each, restate the scope after every round, and run the pre-gate blind-spot checklist before any sign-off.</code></pre>

Grill opens with a round on business value, four questions drawn from that one theme, per `GRILL-PM.md`'s rule that a round draws from one dominant theme rather than scattering across several at once:

<pre><code>Round 1 (theme: business value): 4 questions, answered
1. What single number in this case would a sponsor push back on first?
2. If adoption comes in below 30%, what actually happens to the
   $340k build spend?
3. Does the agent-fleet line reflect the full grill and review cost,
   or only the research pass?
4. What does the do-nothing baseline assume about the 8% annual
   growth in triage cost?

Restated scope: "The case rests on adoption clearing 30% by week 4;
below that, Option A's payback does not hold. Everything else in the
case is secondary to that one number."</code></pre>

The round closes with the same three-way choice `GRILL-PM.md` requires every time: continue, stop, or move to sign-off. Here the user chooses to stop rather than run a second round:

<pre><code>User: <span class="tok-warn">"we stop here"</span>
<span class="tok-ok">Trade-off recorded: a second round would likely have probed the
$22k agent-fleet figure and the vendor-lock-in risk on Option B in
more depth; both are accepted, in writing, by the user's choice to
stop after round 1.</span></code></pre>

This is the shape the output contract requires, not a captured run — Grill has no companion script; every round happens as a back-and-forth with the user, captured directly into the artifact being grilled, with a Trade-offs record appended before the session closes. `GRILL-PM.md`'s exit criteria are exact on what still has to be true even after an early stop: "sign-off has one hard precondition: the artifact's core question... must actually be answered, not left as a placeholder." Here, the case's recommendation was answered in round 1, so an early stop after it is a legitimate close, not a stall.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A round that converges and records its trade-off</div>
<pre><code>Round 1 (theme: business value): 4 questions, answered
Restated scope: "The case rests on adoption clearing 30% by week 4;
below that, Option A's payback does not hold."
User: <span class="tok-warn">"we stop here"</span>
<span class="tok-ok">Trade-off recorded: a second round would likely have probed
the agent-fleet figure and Option B's lock-in risk in more depth;
that gap is accepted, in writing, by the user's choice to stop.</span></code></pre>
<div class="compare-card-note">Stopping is not silent — the trade-off accepted by stopping is written down before the session closes.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Round 1: 3 questions, answered.
<span class="tok-warn">"Ran out of obvious questions -- signing off."</span>
(no restated scope, no blind-spot checklist run,
 the case's recommendation still unanswered)</code></pre>
<div class="compare-card-note">Sign-off requested with the artifact's core question still unanswered, and no blind-spot checklist run, is a stall dressed up as completion.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Can the user end a grill round at any point, for any reason?</summary>
<div class="qa-body">

Yes. GRILL-PM.md states this without qualification: "the user may say 'we stop here' at any point, in any round, and the loop ends immediately — no closing argument, no extra round squeezed in first." SKILL.md lists the same rule as its own stop condition.

</div>
</details>

<details class="qa">
<summary>What if the session tries to sign off with the core question still unanswered?</summary>
<div class="qa-body">

SKILL.md names this directly as a stop condition: "sign-off requested with the artifact's core question still unanswered." GRILL-PM.md states the same rule as a hard precondition on sign-off — "the artifact's core question... must actually be answered, not left as a placeholder."

</div>
</details>

<details class="qa">
<summary>What does grill-with-docs mode require that the plain protocol does not?</summary>
<div class="qa-body">

GRILL-PM.md is specific: "every question in this mode must cite the specific document and passage that motivated it — a question with nothing to cite is either not grounded or the corpus has a gap, and either finding gets recorded." A claim the corpus does not support is itself a finding, surfaced rather than resolved quietly in the artifact's favor.

</div>
</details>

<details class="qa">
<summary>Are provoke mode's candidates findings, or something else?</summary>
<div class="qa-body">

They are hypotheses, never findings. GRILL-PM.md is explicit: each candidate is "explicitly labeled a hypothesis — never presented as a finding," and "the human's reaction to each one, agreement or rejection, is itself the output of the round, not a formality on the way to one."

</div>
</details>

<details class="qa">
<summary>What does the pre-gate blind-spot checklist actually check for?</summary>
<div class="qa-body">

GRILL-PM.md points to `AGENT-OWNERSHIP.md` for this, which names coverage and omissions, unevidenced claims, ambition collapsed toward star 5, correlated agreement across agents built on the same model, and the do-nothing test. GRILL-PM.md is direct about what skipping it looks like: "an artifact that 'ran out of questions' without that checklist having run is a stall dressed up as completion."

</div>
</details>

## It's working if

- Every round restates the sharpened scope in three sentences or fewer and closes with continue, stop, or sign-off — never a silent trailing-off.
- An early stop always carries a written trade-off, naming what further rounds would likely have surfaced and what was accepted by not running them.
- Sign-off never happens with the artifact's core question still a placeholder, whatever mode the round ran in.
- The pre-gate blind-spot checklist runs before every sign-off, not only when a round happened to feel thin.

If a session signs off after "running out of questions," with no restated scope and no blind-spot checklist run, the discipline has failed even though a session clearly happened.

## Where it fits

**Grill is the interrogation an artifact survives on its way to a gate, not the gate decision itself and not the artifact's own authoring.**

It is threaded directly through `discover`, `case`, `carve`, and `prd-draft` — each of those skills' procedures calls it before their artifact is considered ready — and it shares its round protocol with the developer group's `core/GRILL.md` rather than maintaining a second version. Once an artifact has survived a grill round, `prd-review` is where a PRD specifically gets scored against a fixed rubric, a separate pass this loop does not perform.

If none of this settles which skill fits, `ask-pm` routes you — its own routing map sends "challenge this / pressure-test this" straight to `grill`.
