---
layout: group
name: pm
group: pm
title: "Product and Program Management"
description: "The pm group runs the product-management pipeline from a raw problem to a delivered, measured benefit, gated by four human sign-off points."
---

You do not run this practice by opinion. Four gates decide whether a problem is real, an investment justified, a requirement sound, and work ready to build — and you hold every one of them. Agents draft the analysis, the case, and the requirements between one gate and the next. The gate is where a decision becomes real; the draft in front of it is only material.

## The easy part, and what it hides

An agent can draft any document this practice needs. Ask for a business case, a target operating model, or a PRD (a product requirements document), and one arrives within minutes, every section populated and cited. That was never the hard part.

The hard part starts once the same fluency that makes a document readable also makes it persuasive, whether the claim underneath holds or not. Call this failure **the fluency trap**: a document polished enough that a reviewer signs it because it no longer reads like something that needs scrutiny. `AGENT-OWNERSHIP.md` names two mechanisms behind it — ambition collapsed to a safe middle score, and correlated agreement, where three reviewers built on one model produce one opinion said three times, not three independent checks.

<figure class="diagram">
<svg role="img" aria-label="The fluency trap in four stages: Draft, Polish, Present, and Sign, the last one reaching no real decision." viewBox="0 0 780 122" width="780" height="122" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="20" width="150" height="64" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="85" y="57" text-anchor="middle" font-size="15" font-weight="600" fill="currentColor">Draft</text>
  <text x="85" y="102" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">agent writes it</text>
  <polygon points="168,49 192,49 192,44 210,52 192,60 192,55 168,55" fill="currentColor"></polygon>
  <rect x="210" y="20" width="150" height="64" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="285" y="57" text-anchor="middle" font-size="15" font-weight="600" fill="currentColor">Polish</text>
  <text x="285" y="102" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">tone turns certain</text>
  <polygon points="368,49 392,49 392,44 410,52 392,60 392,55 368,55" fill="currentColor"></polygon>
  <rect x="410" y="20" width="150" height="64" rx="8" fill="none" stroke="currentColor" stroke-width="1.5"></rect>
  <text x="485" y="57" text-anchor="middle" font-size="15" font-weight="600" fill="currentColor">Present</text>
  <text x="485" y="102" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">looks finished</text>
  <polygon points="568,49 592,49 592,44 610,52 592,60 592,55 568,55" fill="currentColor"></polygon>
  <rect x="610" y="20" width="150" height="64" rx="8" fill="none" stroke="var(--amber)" stroke-width="2"></rect>
  <text x="685" y="52" text-anchor="middle" font-size="15" font-weight="600" fill="var(--amber-text)">Sign</text>
  <text x="685" y="70" text-anchor="middle" font-size="10" fill="var(--amber-text)">reads finished</text>
  <text x="685" y="102" text-anchor="middle" font-size="11" fill="var(--amber-text)">no decision made</text>
</svg>
<figcaption>The fluency trap: each stage adds polish, but nothing in it tests whether the claim survives contact with evidence.</figcaption>
</figure>

The four gates in `GATES.md` exist to interrupt this trail before Commitment, not to review it after the fact.

## What the gates actually check

Take QuenServe's epic E1, offline inspection sync, running through this group's discovery, mapping, and epic pages. Discovery names the actual root cause — a mobile client's live-call-only architecture, scoped to reliable-signal pilot sites — not the first symptom noticed. Four gates then decide whether that finding survives:

- **Framing** closes only once the problem owner can state the problem, in their own words, and for whom.
- **Investment** requires the case to name the one assumption that would kill it if wrong, costed against doing nothing.
- **Quality** lets an agent score the PRD on the 11-Star scale, but approval stays human even at a 9.0.
- **Commitment** raises the backlog through the same pickup protocol the developer group's work items already use.

Every gate opens the same way: the blind-spot checklist in `AGENT-OWNERSHIP.md`, run by a person, never delegated back to an agent.

## What adopting this actually feels like

Running this practice does not feel like strategy work most weeks. A PM who adopts it reads risk, assumption, issue, and dependency (RAID) registers, DIVE verdicts recorded with their evidence, and benefit variance reports — not only the roadmap slide a steering committee sees. DIVE is carve's four-part test: deliverable, independent, valuable, estimable. `realize` closes the loop: a benefit that misses its projection re-enters `discover` or `carve` as new work, carrying its own case for closing the gap. `GATES.md` states the discipline in one line: "A transformation practice that only measures forward and never measures back is not actually grounded in cost; it is grounded in forecasts."

## The path through

The sixteen skills below read as a syllabus, not a menu. The first ten run in the order an initiative actually moves, from a raw problem to a leadership pack. The six after them sit alongside that line rather than inside it, and you reach for each one when its moment arrives.

- [`discover`]({{ '/discover/' | relative_url }}) — turns a raw problem into a root-cause analysis.
- [`map`]({{ '/map/' | relative_url }}) — turns that analysis into personas, flows, and the Framing document.
- [`carve`]({{ '/carve/' | relative_url }}) — extracts DIVE-tested epics from that document or a TOM's gaps.
- [`prd-draft`]({{ '/prd-draft/' | relative_url }}) — writes and validates one PRD per epic.
- [`prd-review`]({{ '/prd-review/' | relative_url }}) — scores a PRD's ambition before Quality.
- [`case`]({{ '/case/' | relative_url }}) — weighs real options and doing nothing, costed in full.
- [`roadmap`]({{ '/roadmap/' | relative_url }}) — sequences initiatives across now, next, and later.
- [`raid`]({{ '/raid/' | relative_url }}) — keeps the risk, assumption, issue, and dependency registers current.
- [`realize`]({{ '/realize/' | relative_url }}) — tracks whether a delivered benefit matched its projection.
- [`report`]({{ '/report/' | relative_url }}) — produces the leadership pack from those registers.
- [`tom-architect`]({{ '/tom-architect/' | relative_url }}) — decomposes a transformation into a target operating model, where the hat calls for one.
- [`grill`]({{ '/grill/' | relative_url }}) — pressure-tests an artifact before its gate, threaded through four of the steps above.
- [`constitution`]({{ '/constitution/' | relative_url }}) — writes the principles every draft answers to, underneath the whole line.
- [`chart`]({{ '/chart/' | relative_url }}) — plans an oversized initiative into decision tickets, ahead of the line rather than on it.
- [`arrange`]({{ '/arrange/' | relative_url }}) — decides whether a multi-round effort loops or fans out.
- [`ask-pm`]({{ '/ask-pm/' | relative_url }}) — routes a plain goal to the right skill here, when none of the above is obviously it.

## Where to start

None of this makes product work faster in the way a faster draft feels faster. It makes a decision defensible months later, when someone asks why it was made. Readers starting from zero can walk that thread, and QuenServe, the field-inspection product that carries it into investment and reporting, on the [Run a product org journey]({{ '/journey/run-a-product-org/' | relative_url }}).

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
