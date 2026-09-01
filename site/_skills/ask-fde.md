---
layout: skill
name: ask-fde
title: "Ask FDE: The Skill Router"
description: "Ask FDE routes an unnamed intent to the correct skill in the monorepo, so a user who does not know a skill's name still reaches it."
group: developer
invocation: user-invoked
scenario: "Deciding whether a new webhook needs a security review or something else entirely"
lens:
  novice:
    who: 'You know what you want done but have no idea which of the skills in this repository does it.'
    value: 'You describe the goal in plain language and ask-fde names the right skill and why, in one sentence.'
  practitioner:
    who: 'You work across a monorepo with more than thirty skills and cannot keep every name memorized.'
    value: 'A short classification step maps your intent to the correct skill, so you stop guessing between similarly named specialists.'
  leader:
    who: 'You watch new team members reach for the wrong skill, or give up and do the work by hand.'
    value: 'One entry point classifies intent and routes it, cutting the time between "I need to do X" and the skill that actually does X.'
  csuite:
    who: 'You have paid to build out a large skill library and want it actually used.'
    value: 'A router that maps intent to skill by name means the library''s size stops being a barrier to adoption.'
---

## What it does

Ask FDE is not a process skill. It designs nothing, secures nothing, and ships nothing itself — it is the router for this monorepo. Given a goal described in plain language, it classifies the intent and names the one skill that handles it, then hands off to the Skill tool with that name; when the intent is genuinely ambiguous, it asks one clarifying question first rather than guessing.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Classify the intent</span><span class="step-text">One of: inception, backlog, build, secure, operate, branding, or product/program/transformation.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Map to a skill</span><span class="step-text">Apply the routing table below, its entire doctrine, exactly as written.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Hand off</span><span class="step-text">Call the Skill tool with the chosen name; ask-fde does not do the routed skill's work itself.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Ask before guessing</span><span class="step-text">A genuinely ambiguous intent gets one clarifying question before a route is chosen, never a guess dressed up as a decision.</span></div>
</div>

<ul class="benefits">
  <li>You describe a goal in plain language and get back one skill name and a one-sentence reason, not a guess dressed up as certainty.</li>
  <li>An ambiguous request gets one clarifying question before a route, never a guess that quietly sends you to the wrong skill.</li>
  <li>The routing map is the entire doctrine — there is no separate procedure hidden elsewhere that could drift from what actually gets applied.</li>
  <li>The output is always auditable: a chosen skill name plus the rationale behind it, so the handoff can be checked afterward.</li>
</ul>

Ask FDE carries no sibling doctrine file of its own — `SKILL.md` is the entire skill, and its Procedure section is reproduced below exactly as written, byte for byte:

<pre><code>1. Classify intent: inception | backlog | build | secure | operate | branding | product/program/transformation
2. Map to skill:
   - product, program, or transformation management intent &rarr; `ask-pm`
   - inception &rarr; `impact` (+ `recon` if brownfield)
   - backlog &rarr; `slice` &rarr; `raise`
   - build &rarr; `conduct` / `sdlc`
   - design &rarr; `architect`
   - security &rarr; `safeguard`
   - release &rarr; `deliver` + `shakedown`
   - production, reliability, quality, or maintenance &rarr; `operate`
   - models &rarr; `update-models` / `model-routing`
   - governance &rarr; `responsible-ai-governance`
   - PDF &rarr; `press`
   - completion discipline, or "is it actually done" &rarr; `grit`
3. `Call the Skill tool` with chosen name</code></pre>

## When to reach for it

Type `/ask-fde` in Claude Code, or name the skill directly in a session. Ask FDE is user-invoked, so nothing reaches for it on its own: a person decides they do not know which skill fits, and asks.

You reach for ask-fde in three moments. You know what you want done but not which of this repository's skills does it. Two skill names sound like they might both fit, and you cannot tell which one actually applies to your request. You are new to this catalog and would rather describe a goal in your own words than memorize more than thirty names first.

Ask FDE is not the only way to find the right skill. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You already know the exact skill name | Call it directly — routing through ask-fde adds a step you do not need |
| You want every skill in a group browsed at once, not one intent classified | The [developer group page]({{ '/group/developer/' | relative_url }}) |
| Your intent is pm-shaped: an epic, a PRD (product requirements document), a leadership pack | `ask-pm`, the router built for the pm group specifically |
| You need the routing map itself, with no question asked back at you | Read the map quoted above — no session required |
| You already know your intent is completion discipline, "is it actually done" | `grit` — the map already answers this one directly |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Type <code>/ask-fde</code>, or name the skill directly in a session. Claude reads the classification list in <code>SKILL.md</code>, matches your intent against it, and returns the routed skill and a one-sentence rationale.</p>
<div class="prompt-card">We are adding a partner webhook to the notifications service, and I need to know if that is a security review, a design question, or something else entirely in this repository. Classify my intent and tell me the one skill that handles it, with one sentence of rationale, before you touch anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Ask FDE classifies the intent as secure and returns <code>safeguard</code> with its rationale, then hands off to it directly.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode has no dedicated command for ask-fde. The skill lands in <code>.agents/skills/</code>, and OpenCode applies the routing map by reading the catalog as context, the same way it would for any skill this repository ships with no installed command.</p>
<div class="prompt-card">I'm not sure whether the new partner webhook needs a security review or a design pass in this repository. Read the routing map in skills/developer/ask-fde/SKILL.md, classify my intent, and tell me the one skill it points to, with one sentence of rationale.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode reads the map directly and returns the same classified skill name and rationale, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer for ask-fde either. It reads the catalog as context and follows the shared rules in <code>AGENTS.md</code>, applying the same classify-then-map procedure a command would otherwise run.</p>
<div class="prompt-card">I don't know which skill in this repository handles a security review for a new webhook. Classify my intent the way skills/developer/ask-fde/SKILL.md's routing map describes, and name the one skill it points to.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the classified skill name and its rationale directly in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees ask-fde's name and description the same way the other tools do. It gets no command layer either.</p>
<div class="prompt-card">Read skills/developer/ask-fde/SKILL.md, then classify this intent: I need to know if a new partner webhook needs a security review before we ship it. Name the one skill your routing map points to, with one sentence of rationale.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex returns the same classified skill and rationale, reading its context from the skill file rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no command layer for Copilot either, so ask-fde's routing map is applied as context, the same way Cursor and Codex apply it.</p>
<div class="prompt-card">Before I open an issue for the new partner webhook, read skills/developer/ask-fde/SKILL.md and classify my intent: is this a security review or a design question? Name the one skill it routes to.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot returns the routed skill name and rationale in chat; there is no command layer here either.</p>
</div>
</div>

A good ask includes:

- The goal stated in plain language, not a skill name you are guessing at.
- Enough context that the classification step does not have to guess between two categories.
- Whether you want the rationale as a comment on an issue, or just in the reply.
- An answer to ask-fde's clarifying question, if your intent turns out to be genuinely ambiguous.

Readers who have not installed the whole skill pack can add ask-fde alone:

```bash
./scripts/link-skills.sh --skill ask-fde
```

This links only ask-fde into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>We are adding a partner webhook to the notifications service, and I need to know if that is a security review, a design question, or something else entirely in this repository. Classify my intent and tell me the one skill that handles it, with one sentence of rationale, before you touch anything.</code></pre>

Ask FDE classifies "a security review for a new webhook" as `secure`, then applies its routing table's own security line — security maps to `safeguard` — from the map quoted in full above. It returns:

<pre><code>Routed to: safeguard
Rationale: request names a security review for a new public-facing
  endpoint, which the map classifies as secure</code></pre>

It then calls the Skill tool with `safeguard` as the chosen name, exactly the handoff step 3 of its own procedure names, and safeguard takes over from there — the way safeguard's own working example shows for this same webhook.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A routed intent, stated plainly</div>
<pre><code>Intent: "the new partner webhook needs a security review"
Classified: secure
<span class="tok-ok">Routed to: safeguard</span>
<span class="tok-ok">Rationale:</span> request names a security review at a new endpoint</code></pre>
<div class="compare-card-note">One skill name, one sentence of rationale — the output contract, nothing more.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Intent: "help me ship this" <span class="tok-comment">&larr; ambiguous: build? release? both?</span>
<span class="tok-warn">Routed to: deliver</span>  <span class="tok-comment">&larr; guessed instead of asking</span></code></pre>
<div class="compare-card-note">Per the stop condition: an ambiguous intent gets one clarifying question, then a route — never a guess dressed up as a routing decision.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens when an intent is genuinely ambiguous?</summary>
<div class="qa-body">

The stop condition is direct: an ambiguous intent gets one clarifying question, then a route. Ask-fde does not resolve the ambiguity by picking whichever skill seems more likely; it asks, and routes only once the answer settles it.

</div>
</details>

<details class="qa">
<summary>Does ask-fde do the routed skill's work itself?</summary>
<div class="qa-body">

No. It does not perform the work itself; it hands off to the Skill tool with the chosen name. The output is always a chosen skill name plus a one-sentence rationale, never the work the routed skill was supposed to do.

</div>
</details>

<details class="qa">
<summary>What if my goal is really a pm-group question, not a developer one?</summary>
<div class="qa-body">

The map's own first line covers this directly: product, program, or transformation management intent routes to `ask-pm`, the pm group's own router, rather than ask-fde attempting to classify pm-shaped intent itself.

</div>
</details>

<details class="qa">
<summary>Is the routing map quoted on this page really identical to SKILL.md?</summary>
<div class="qa-body">

Yes, checked against the file itself line by line, not paraphrased from memory of what it says. A router whose documentation drifts from its own source is the one failure mode that would make this page worse than reading `SKILL.md` directly.

</div>
</details>

<details class="qa">
<summary>Can one intent route to more than one skill?</summary>
<div class="qa-body">

Yes. The map's own release line reads `release → deliver + shakedown`, naming both skills a release actually needs — the release-readiness gate and the isolated pre-merge review that follows it — rather than forcing a two-skill outcome into one name.

</div>
</details>

<details class="qa">
<summary>Does this work outside Claude Code?</summary>
<div class="qa-body">

Yes, with the same mechanism in four of the five tools: OpenCode, Cursor, Codex, and GitHub Copilot all read the routing map from the shared skill catalog as context, with no command layer of their own. Only Claude Code differs, by letting a person type the skill's own name directly.

</div>
</details>

## It's working if

- Every routed answer carries the skill name and a one-sentence rationale, never a bare name with no reason attached.
- An ambiguous intent gets one clarifying question before a route, never a guess dressed up as a decision.
- A pm-shaped intent lands on `ask-pm`, not on a developer-group skill that happens to sound close.
- The routing map you get back matches SKILL.md's own Procedure section, word for word, not a paraphrase that has quietly drifted from it.

If a routed answer stops naming a rationale and just states a skill name, the router has stopped being auditable even though it still looks like it is answering.

## Where it fits

**Ask FDE is not a process skill; it is the entry point this whole catalog resolves through whenever a person does not yet know which of the other skills fits.**

Its nearest neighbor is `ask-pm`, the same idea scoped to the pm group rather than the developer catalog ask-fde covers. Every skill this page's own routing map names — from `impact` at inception through `grit` at completion — is a destination ask-fde can hand off to, never a step it walks itself.

Ask-fde is not itself a step on either journey this site documents, because its job is to point at the step, not to be one.
