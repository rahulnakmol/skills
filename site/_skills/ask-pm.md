---
layout: skill
name: ask-pm
title: "Ask PM — Route Intent to the Right PM Skill"
description: "Ask PM is the user-invoked router that maps a plain description of a goal to the correct pm-group skill, asking one clarifying question only when genuinely ambiguous."
group: pm
invocation: user-invoked
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

Ask PM routes a plain description of what someone is trying to do to the correct skill in the pm group. It classifies the intent — for instance, discovery, PRD authoring, business case, roadmap, or pressure-test — against a fixed routing map and returns the chosen skill's name plus a one-sentence rationale. It asks a clarifying question only when the intent is genuinely ambiguous; classification between the product and transformation hats is normally `discover`'s job, not something Ask PM decides on its own. At the seam where the pm group's work becomes engineering work, it hands off explicitly to the developer group's `impact`, `slice`, and `raise`.

## How to call it

In Claude Code, type `/ask-pm`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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

## In practice

The routing map in `ask-pm`'s `SKILL.md` is the skill's real content — it is quoted here in full, verbatim:

```
"how should this run / grill-loop vs parallel research" -> arrange
"this is too big to plan in one go / where do we even start" -> chart
practice or initiative grounding -> constitution
problem discovery -> discover
personas or process flows -> map
target operating model -> tom-architect
epic breakdown -> carve
PRD authoring, or a PRD structural check -> prd-draft
PRD quality scoring -> prd-review
investment justification -> case
sequencing or PI planning -> roadmap
risks, assumptions, issues, dependencies -> raid
benefits or north-star tracking -> realize
leadership update or steering pack -> report
"challenge this / pressure-test this" -> grill
```

This is quoted directly from the skill's own procedure, not a captured run — `ask-pm` has no companion script; the map above is the entire routing logic.

## How it works

1. **Classify intent.** Execution shape, planning too big for one session, constitution, discovery, mapping, operating model, epics, PRD authoring, PRD checking, PRD scoring, business case, roadmap, risk or status, benefits, leadership reporting, or pressure-test.
2. **Map to a skill.** Match the classified intent against the routing table above. See [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/ask-pm/SKILL.md).
3. **Ask about the hat only when genuinely ambiguous.** Product or transformation; classification is normally `discover`'s job.
4. **Hand off at the seam.** To `slice`/`raise` at Commitment, or to `impact` when engineering inception is needed.
5. **Call the Skill tool** with the chosen name.
