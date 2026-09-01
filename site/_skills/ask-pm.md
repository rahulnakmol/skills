---
layout: skill
name: ask-pm
title: "Ask PM — Route Intent to the Right PM Skill"
description: "Ask PM is the user-invoked router that maps a plain description of a goal to the correct pm-group skill, asking one clarifying question only when genuinely ambiguous."
group: pm
invocation: user-invoked
scenario: "Routing a new PM through the field-inspection-copilot initiative"
lens:
  novice:
    who: 'You are new to the pm group and do not yet know whether your problem calls for `discover`, `carve`, or `case`. Ask PM is the skill you name when you do not know which skill to name.'
    value: 'You describe your goal in plain language and get back one skill name plus a one-sentence reason, instead of having to learn the whole group''s map before you can start.'
  practitioner:
    who: 'You know the pm group well but are working across a hat you use less often — transformation instead of product, or the reverse.'
    value: 'The routing map is a fixed table, not a judgment call repeated from memory each time, so the same goal routes to the same skill whoever asks.'
  leader:
    who: 'You manage PMs who are still learning the group''s sixteen skills.'
    value: 'A new team member routes correctly on day one, because the classification runs from a table someone already built, not from asking around.'
  csuite:
    who: 'You want the practice''s toolset to be self-explaining rather than dependent on institutional memory.'
    value: 'The router hands off explicitly at the seam to the developer group''s `impact`, `slice`, and `raise`, so an initiative does not stall at the boundary between the business case and the engineering build.'
---

## What it does

Ask PM routes a plain description of what someone is trying to do to the correct skill in the pm group, the sixteen-skill practice that runs the business side of this repository's AI-native transformation work. It classifies the intent — for instance, discovery, authoring a product requirements document (PRD), business case, roadmap, or pressure-test — against a fixed routing map and returns the chosen skill's name plus a one-sentence rationale. It never does the routed skill's work itself. It asks a clarifying question only when the intent is genuinely ambiguous; classification between the product and transformation hats, the two modes a PM works in one at a time, is normally `discover`'s job, not something Ask PM decides on its own. At the seam where the pm group's work becomes engineering work, it hands off explicitly to the developer group's `impact`, `slice`, and `raise`.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Classify intent</span><span class="step-text">Execution shape, planning too big for one session, constitution, discovery, mapping, operating model, epics, PRD authoring, PRD checking, PRD scoring, business case, roadmap, risk or status, benefits, leadership reporting, or pressure-test.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Map to a skill</span><span class="step-text">Match the classified intent against the routing table.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Ask about the hat only when genuinely ambiguous</span><span class="step-text">Product or transformation; classification is normally discover's job.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Hand off at the seam</span><span class="step-text">To slice/raise at Commitment, or to impact when engineering inception is needed.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Call the Skill tool</span><span class="step-text">With the chosen name.</span></div>
</div>

<ul class="benefits">
  <li>A goal described in plain language returns one skill name plus a one-sentence reason, instead of requiring the whole group's map memorized first.</li>
  <li>The same goal routes to the same skill whoever asks, because the classification runs off a fixed table, not a judgment call repeated from memory.</li>
  <li>A clarifying question is asked only when intent is genuinely ambiguous — the router does not guess at which hat, product or transformation, a request means.</li>
  <li>The seam between business case and engineering build is named explicitly, so an initiative hands off to `impact`, `slice`, or `raise` instead of stalling at the boundary.</li>
</ul>

SKILL.md states the routing map in full — it is the skill's real content, not summarized:

<pre><code>   - "how should this run / grill-loop vs parallel research" → `arrange`
   - "this is too big to plan in one go / where do we even start" → `chart`
   - practice or initiative grounding → `constitution`
   - problem discovery → `discover`
   - personas or process flows → `map`
   - target operating model → `tom-architect`
   - epic breakdown → `carve`
   - PRD authoring, or a PRD structural check → `prd-draft`
   - PRD quality scoring → `prd-review`
   - investment justification → `case`
   - sequencing or PI planning → `roadmap`
   - risks, assumptions, issues, dependencies → `raid`
   - benefits or north-star tracking → `realize`
   - leadership update or steering pack → `report`
   - "challenge this / pressure-test this" → `grill`</code></pre>

This is quoted directly from the skill's own procedure, not paraphrased — Ask PM has no companion script, and the map above is the entire routing logic.

## When to reach for it

Type `/ask-pm` in Claude Code, or name the skill directly in a session. Ask PM is user-invoked, so nothing reaches for it on its own: SKILL.md names its trigger moment as a person asking "which pm skill" or describing a goal without naming one.

You reach for it at the start of any pm-group task where the right skill is not already obvious, and again mid-initiative whenever the next step's name is uncertain. An initiative that spans discovery through reporting passes through several handoffs, and this is the router at each one.

Ask PM is not the only router in this repository. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You already know exactly which pm skill fits — name it directly instead of routing to it | the pm skill itself |
| Your problem is on the engineering side of the seam, not the business side | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |
| Your problem is already engineering-shaped — slicing, raising, or an inception gap | the developer group's `impact`, `slice`, or `raise` |
| You need to decide grill-loop, parallel-fan, or hybrid for an already-identified pm task, not which skill to call | [`arrange`]({{ '/arrange/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Ask PM is user-invoked: type <code>/ask-pm</code>, or name it directly in a session — nothing routes to it automatically. It ships no stop hook of its own; the one thing SKILL.md's stop condition requires — asking a clarifying question on genuinely ambiguous intent, then routing — is enforced by the procedure itself.</p>
<div class="prompt-card">I'm new to the field-inspection-copilot initiative and don't know where to start. We already have a raw problem statement from the operations team but nothing else. Which pm skill do I run first?<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Ask PM classifies the intent as problem discovery, returns <code>discover</code> as the match, and states the one-sentence rationale straight from the routing map.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode reads the same <code>.agents/skills/</code> catalog every tool without a command layer reads. This repository ships no <code>ask-pm</code>-specific command file: <code>adapters/opencode/commands/</code> covers <code>grit-verify</code>, <code>press</code>, and a handful of developer-side skills, not <code>ask-pm</code>. It applies the skill's procedure the way Cursor and Codex do, reading the catalog as context and following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read skills/pm/ask-pm/SKILL.md, then tell me which pm skill fits: we have a raw problem statement for the field-inspection-copilot initiative and nothing else yet.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode returns the skill name and rationale directly in its reply, reading the routing map from the skill file rather than from any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>The skills land in <code>.agents/skills/</code>, and Cursor applies the procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>, and routing model choice through its own <code>auto</code> mode rather than a pinned tier. This repository ships no Cursor rule specific to Ask PM.</p>
<div class="prompt-card">We have a raw problem statement for the field-inspection-copilot initiative and nothing else. Which pm skill in skills/pm/ask-pm/SKILL.md's routing map fits, and why?<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor returns the skill name and rationale directly in its reply, the same shape as Claude Code's, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees Ask PM's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/pm/ask-pm/SKILL.md, then route this: a raw problem statement exists for the field-inspection-copilot initiative and nothing else yet. Which pm skill fits?<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex returns the skill name and rationale the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. There is no continuous-integration backstop specific to Ask PM the way <code>grit-gates.yml</code> backstops <code>grit</code>; a correct route depends on the procedure being followed, not on any workflow check.</p>
<div class="prompt-card">I'm new to the field-inspection-copilot initiative. We have a raw problem statement and nothing else. Which pm skill should I run first, and why?<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot returns the skill name and rationale in chat, reading the routing map from the skill file as context.</p>
</div>
</div>

A good ask includes:

- A plain description of the goal, in the asker's own words — the classification step is built to work from that, not from a pre-picked skill name.
- Whatever artifact already exists for the initiative, since the routing map often turns on what stage that artifact is at.
- Whether the hat — product or transformation — is already known, since Ask PM asks about it only when it is genuinely unclear.

Readers who have not installed the whole skill pack can add Ask PM alone:

```bash
./scripts/link-skills.sh --skill ask-pm
```

This links only Ask PM into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and reaches it.

## A working example

You type:

<pre><code>I'm new to the field-inspection-copilot initiative and don't know where to start. We already have a raw problem statement from the operations team but nothing else. Which pm skill do I run first?</code></pre>

Ask PM classifies this against the routing map quoted above rather than guessing from general knowledge of the group, and returns a single match:

<pre><code>Intent: "raw problem statement, nothing else yet"
<span class="tok-ok">Map hit: discover
Rationale: the request names problem discovery directly — a raw
problem with no structured analysis yet — which the routing map
sends straight to `discover`.</span></code></pre>

A week later, once `discover` and `carve` have produced a Business Understanding Document and an epic manifest, the same person asks again:

<pre><code>The epic manifest is ready. We need sponsor approval for the spend.</code></pre>

<pre><code>Intent: "sponsor approval for the spend"
<span class="tok-ok">Map hit: case
Rationale: "investment justification" is the routing map's exact
entry for this request, and the epic manifest is the artifact `case`
reads from.</span></code></pre>

This is the shape the output contract requires, not a captured run — Ask PM has no companion script. The chosen skill's name plus its one-sentence rationale is the entire output, and the procedure's last step calls the Skill tool with that name to actually run it. Neither request here named the product-versus-transformation hat, and Ask PM did not ask — SKILL.md is explicit that classifying the hat is normally `discover`'s job, not a question this router raises on its own.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A routing decision the map actually supports</div>
<pre><code>Intent: "risks, assumptions, issues, dependencies"
<span class="tok-ok">Map hit: raid
Rationale: the request names RAID's exact register scope,
no clarifying question needed.</span></code></pre>
<div class="compare-card-note">The routing map is a table, not a guess — a clean match against it needs no extra round.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Intent: "help me figure out where to even start on this"
<span class="tok-warn">Routed straight to `discover` without asking
which hat -- product or transformation -- the user means,
even though the request does not say.</span></code></pre>
<div class="compare-card-note">Which hat applies is asked only when genuinely ambiguous — guessing instead of asking is the failure mode the stop condition exists to catch.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens when the intent is genuinely ambiguous?</summary>
<div class="qa-body">

SKILL.md's stop condition covers exactly this: "ambiguous intent → ask one clarifying question, then route." One question, not a longer interrogation — the routing decision still has to follow once the ambiguity is resolved.

</div>
</details>

<details class="qa">
<summary>Does Ask PM decide whether a request is product work or transformation work?</summary>
<div class="qa-body">

Not on its own. SKILL.md is direct: it asks "which hat — product or transformation — only when genuinely ambiguous; classification is normally discover's job." Ask PM routes to the skill; deciding which of the two hats a PM is wearing belongs to the skill that opens the work.

</div>
</details>

<details class="qa">
<summary>What happens once an initiative reaches the seam with engineering?</summary>
<div class="qa-body">

SKILL.md names the handoff directly: "to slice/raise at Commitment, or to impact when engineering inception is needed." The pm group's own README states the same boundary from the other side — Commitment is where "the pickup protocol takes over exactly as it does for the developer group."

</div>
</details>

<details class="qa">
<summary>How is this different from the developer group's own router, ask-fde?</summary>
<div class="qa-body">

Each covers its own group's skill list and hands off to the other at the seam. `ask-fde`'s own routing map sends "product, program, or transformation management intent" straight to `ask-pm`, and this page's disambiguation table above sends the return trip the same way. A request landing on the wrong side of the business-engineering boundary has one hop to the right router, not a dead end.

</div>
</details>

<details class="qa">
<summary>What if someone already knows which pm skill they need?</summary>
<div class="qa-body">

Ask PM is not required in that case — SKILL.md's own "when to invoke" line is scoped to when a person "asks 'which pm skill' or describes a goal without naming one." Naming the skill directly and calling it is the shorter path when the destination is already known.

</div>
</details>

## It's working if

- Every routing decision names the matched skill and states the one-sentence rationale that connects the request to the routing map's own entry.
- A clarifying question gets asked only when intent is genuinely ambiguous, never as a default first move.
- The product-versus-transformation hat is never guessed at by this router; it stays `discover`'s classification to make.
- A request that lands on the wrong side of the business-engineering seam gets an explicit handoff to `impact`, `slice`, `raise`, or `ask-fde`, not a routed answer that quietly ignores the mismatch.

If a genuinely ambiguous request gets routed on a guess instead of one clarifying question, the discipline has failed even though a skill name still came back.

## Where it fits

**Ask PM is the entry point for the whole pm group — the router a person names precisely because they do not yet know which of the group's sixteen skills to name instead.**

It sits alongside `ask-fde`, the developer group's equivalent router, and the two hand off to each other by name at the point where a request crosses from business work to engineering work. Every other skill on this page's routing map is a destination Ask PM can send a request to; Ask PM itself is where a request starts when the destination is not yet known.

Where a request is already engineering-shaped rather than genuinely uncertain, `ask-fde` is the corresponding entry point on the developer side of this repository.
