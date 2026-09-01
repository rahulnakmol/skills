---
layout: skill
name: ask-fde
title: "Ask FDE: The Skill Router"
description: "Ask FDE routes an unnamed intent to the correct skill in the monorepo, so a user who does not know a skill's name still reaches it."
group: developer
invocation: user-invoked
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

Ask FDE is the router for this monorepo: given a goal described in plain language, it classifies the intent and names the one skill that handles it. It does not perform the work itself; it hands off to the Skill tool with the chosen name. The output is always a chosen skill name plus a one-sentence rationale, so the handoff is auditable. When the intent is genuinely ambiguous, it asks one clarifying question before routing rather than guessing.

## How to call it

In Claude Code, type `/ask-fde`.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A routed intent, stated plainly</div>
<pre><code>Intent: "our design gate needs a threat model before we merge"
Classified: secure
<span class="tok-ok">Routed to: safeguard</span>
<span class="tok-ok">Rationale:</span> request names a threat model at the secure DevOps gate</code></pre>
<div class="compare-card-note">One skill name, one sentence of rationale &mdash; the output contract, nothing more.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Intent: "help me ship this" <span class="tok-comment">&larr; ambiguous: build? release? both?</span>
<span class="tok-warn">Routed to: deliver</span>  <span class="tok-comment">&larr; guessed instead of asking</span></code></pre>
<div class="compare-card-note">Per the stop condition: an ambiguous intent gets one clarifying question, then a route &mdash; never a guess dressed up as a routing decision.</div>
</div>
</div>

## In practice

Ask FDE's routing map is its entire doctrine. It is reproduced below exactly as written in its `SKILL.md` procedure, byte for byte.

<pre><code>1. Classify intent: inception | backlog | build | secure | operate | branding | product/program/transformation
2. Map to skill:
   - product, program, or transformation management intent → `ask-pm`
   - inception → `impact` (+ `recon` if brownfield)
   - backlog → `slice` → `raise`
   - build → `conduct` / `sdlc`
   - design → `architect`
   - security → `safeguard`
   - release → `deliver` + `shakedown`
   - production, reliability, quality, or maintenance → `operate`
   - models → `update-models` / `model-routing`
   - governance → `responsible-ai-governance`
   - PDF → `press`
   - completion discipline, or "is it actually done" → `grit`
3. `Call the Skill tool` with chosen name</code></pre>

A user typing "I need a threat model before this ships" classifies as `secure` and routes to `safeguard`, by the map above.

## How it works

1. **Classify the intent.** One of: inception, backlog, build, secure, operate, branding, or product/program/transformation. This step, and the map in step 2, live entirely in [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/ask-fde/SKILL.md) &mdash; ask-fde has no sibling doctrine files.
2. **Map to a skill.** Apply the routing table above; a governance intent routes to `responsible-ai-governance`, a release intent to `deliver` and `shakedown` together.
3. **Hand off.** Call the Skill tool with the chosen name; ask-fde does not do the work itself.
4. **Ask before guessing.** An ambiguous intent gets one clarifying question before a route is chosen.
