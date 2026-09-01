---
layout: group
name: core
group: core
title: "Core: Shared Doctrine Every Group May Read"
description: "Core holds the doctrine and the one skill more than one group needs, so both the developer and pm groups can reference it without depending on each other."
---

You install one skill group at a time, and you expect everything it references to already be there. When a skill inside developer or pm points at a rule, you should never have to search a folder you did not install to find it. Core exists to hold exactly that kind of rule — read by more than one group, owned by neither — so a citation inside an installed group always resolves. You get shared doctrine without shared installation.

Writing the same rule twice is the easy part; anyone can copy a paragraph from one file into another in a few seconds. The hard part is what happens later, once a document that several skills cite sits inside only one group's own directory, and an install scoped to a different group never carries it along. Call this failure the Broken Pointer: a citation nothing carried into the install.

<figure style="margin:28px 0 20px;padding:22px 18px 14px;border:1px solid var(--line);border-radius:12px;background:var(--surface);">
<svg viewBox="0 0 800 240" width="100%" height="240" role="img" aria-label="A staircase of five stages: doctrine cited inside one skill, moved to the group's top level, cited by several sibling skills, a scoped install linking skills only, and the citation opening onto nothing, shown as an open circle." style="color:var(--cobalt);">
  <polyline points="70,190 250,150 430,113 610,80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="610" y1="80" x2="730" y2="190" stroke="currentColor" stroke-width="3" stroke-dasharray="6 7" stroke-linecap="round"/>
  <circle cx="70" cy="190" r="7" fill="currentColor"/>
  <circle cx="250" cy="150" r="7" fill="currentColor"/>
  <circle cx="430" cy="113" r="7" fill="currentColor"/>
  <circle cx="610" cy="80" r="7" fill="currentColor"/>
  <circle cx="730" cy="190" r="7" fill="none" stroke="currentColor" stroke-width="3"/>
  <text x="70" y="212" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="70" dy="0">cited inside</tspan><tspan x="70" dy="14">one skill</tspan></text>
  <text x="250" y="172" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="250" dy="0">moved to the</tspan><tspan x="250" dy="14">group's top</tspan></text>
  <text x="430" y="135" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="430" dy="0">cited by several</tspan><tspan x="430" dy="14">sibling skills</tspan></text>
  <text x="610" y="102" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="610" dy="0">a scoped install</tspan><tspan x="610" dy="14">links skills only</tspan></text>
  <text x="730" y="212" text-anchor="middle" font-size="12" style="fill:var(--muted);"><tspan x="730" dy="0">the citation opens</tspan><tspan x="730" dy="14">onto nothing</tspan></text>
</svg>
<figcaption style="margin-top:6px;font-size:13px;color:var(--muted);text-align:center;">The Broken Pointer: doctrine cited from several places, until a scoped install leaves it behind.</figcaption>
</figure>

Core's own shape is the fix, and the numbers behind it are small enough to state plainly.

- **Four documents, one skill.** `COVERAGE.md`, `GRILL.md`, `VALUE.md`, and `VERIFICATION.md` sit at core's top level; `grit` is its one skill, cited by both pipelines' own gate doctrine.
- **Four tests, one direction.** `test/structure/group-independence.test.mjs` checks basename uniqueness, that every symlink an install produces actually resolves, that no group references another, and that core references none of them.
- **Seven documents, once unreachable.** Before ADR 0007, one of this repository's recorded architecture decisions, the pm group alone carried seven top-level documents — `AGENT-OWNERSHIP.md`, `GATES.md`, `HATS.md`, and four more — that a scoped, pm-only install never linked.
- **Thirty-six symlinks for thirty-seven skills.** The same era's other defect: both groups once owned a directory named `orchestrate`, and a full install silently overwrote one with the other before the rename to `conduct` and `arrange` fixed it.

Core is not where a reader arrives on purpose. Most people meet it through `sdlc`, `deliver-work-item`, or `report`, whose own citations pull its doctrine in without anyone opening this page first. That is by design: the group's entire job is to sit underneath the two pipelines, and a document earns a place here only by being read from more than one direction. A rule cited from two directions is worth writing once; a rule cited from one is not core's to hold.

The path through core is short, because core holds exactly one skill.

1. [`grit`]({{ '/grit/' | relative_url }}) — write the acceptance-gate ledger before work starts, then let the checker decide whether the finished work actually met it.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Core cannot make a group's doctrine correct; it can only guarantee that the doctrine a group cites is the doctrine that travels with it. `grit` sits at the fourth step of the developer group's [Deliver with evidence]({{ '/journey/deliver-with-evidence/' | relative_url }}) journey. Core itself is not a journey — it is the doctrine both published journeys read from underneath.
