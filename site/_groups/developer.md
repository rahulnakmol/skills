---
layout: group
name: developer
group: developer
title: "Developer"
description: "Fifteen skills that run software delivery on evidence instead of confidence: routing, orientation, a signed requirements document, a gated build loop, and release."
---

You have watched an agent write code that looked right and was not. You have also watched a team ship faster once "looks right" stopped being the bar. The developer group is built on the second experience, not the first: every consequential step here produces something you can check, not just something you can read and nod at. Confidence is cheap. Evidence is what this group actually trades in.

## The fan-out reflex

Getting an agent to write code is not the hard part. A short prompt and a few minutes produce a plausible diff more often than not, and that ease is exactly what makes the next mistake so tempting. Something subtle goes wrong — a race condition, a requirement half-understood — and the instinctive fix is to add more agents: a second opinion here, a verifier there, a wider fan-out hoping quantity catches what evidence would have caught directly. This repository's own routing doctrine has a name for that instinct: fan-out without partition, parallel branches that are not actually independent, silently duplicating effort and inflating cost for no real gain in coverage or confidence. Call the whole pattern the fan-out reflex — reaching for more agents when what the moment actually needed was a ledger, a gate, or a named human decision.

`conduct`'s rubric is the discipline that resists the reflex. It climbs a fixed staircase, and every step up has to be justified by independence, self-review risk, durable state, or consequence — never by how sophisticated the diagram looks.

<figure style="margin:1.5rem 0 0.75rem;">
<svg viewBox="0 0 480 220" role="img" aria-labelledby="stairsTitle stairsDesc" style="width:100%;max-width:460px;height:auto;display:block;">
<title id="stairsTitle">Four execution shapes, each step costlier than the last</title>
<desc id="stairsDesc">A staircase of four steps, ascending in height: no loop, loop, hybrid, and graph, with a human figure standing at the top of the graph step.</desc>
<line x1="20" y1="192" x2="460" y2="192" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>
<g fill="currentColor">
  <rect x="30" y="162" width="90" height="30" opacity="0.85"/>
  <rect x="150" y="122" width="90" height="70" opacity="0.85"/>
  <rect x="270" y="72" width="90" height="120" opacity="0.85"/>
  <rect x="390" y="32" width="70" height="160" opacity="0.85"/>
</g>
<g fill="currentColor" font-size="13" font-family="inherit" text-anchor="middle">
  <text x="75" y="210">No loop</text>
  <text x="195" y="210">Loop</text>
  <text x="315" y="210">Hybrid</text>
  <text x="425" y="210">Graph</text>
</g>
<g fill="currentColor">
  <circle cx="425" cy="18" r="7"/>
  <path d="M 412 32 Q 425 20 438 32 L 438 40 L 412 40 Z"/>
</g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--muted); margin-top:0.4rem;">The default sits at the lowest step: prefer no loop when one agent suffices, and climb only on the rubric's own evidence. The graph's top step always carries a named human decision, not an extra agent.</figcaption>
</figure>

## What that discipline looks like in one work item

A checkout-timeout fix, sliced into a single work item, shows the shape without any of it being decoration.

- **One gate ledger, not a debate.** `WORK-ITEM-CONTRACT.md` requires a `CHECK` and an `EXPECT` per acceptance criterion — `go test ./services/checkout/... -run TestTimeoutP99` against `EXPECT: PASS`, not a sentence about how the fix should feel under load.
- **Two design passes, not one.** `sdlc/METHOD.md` requires a candidate plan and a separate challenge pass that attacks its own assumptions before scope freezes — rephrasing the same idea twice does not count as the second pass.
- **85 to 90 percent, measured on the diff.** `core/COVERAGE.md`'s coverage floor for business-capability code, checked by the same verifier that later blocks a pull request in `shakedown` if the number is not real.
- **One writer, one verifier, until the rubric says otherwise.** `conduct/RUBRIC.md` keeps this bounded fix a loop, because it fits one artifact and one check — no graph, no fan-out, nothing to justify.

## The unglamorous truth

Working in this group is not mostly writing code. It is reading gate ledgers, checking a coverage matrix against a diff, and confirming a verifier's evidence actually says what a pull request claims it says. `AUDIT.md` states the discipline in one line worth carrying into every review: "A ledger that can be made to pass by editing its own success criterion is not a verification tool; it is a form that always says yes." The interesting work is making sure that never happens quietly.

## The path through

Fifteen skills carry the pipeline, five you call directly and ten the model reaches for on its own once a request matches what they do.

- [`update-models`]({{ '/update-models/' | relative_url }}) — research provider catalogs and propose a reviewable diff to the shared model registry.
- [`impact`]({{ '/impact/' | relative_url }}) — turn a raw idea into a signed product requirements document (PRD) through a grill loop that tests it.
- [`sdlc`]({{ '/sdlc/' | relative_url }}) — walk a ready work item through the gated design-build-secure-release loop.
- [`shakedown`]({{ '/shakedown/' | relative_url }}) — build, test, and review a pull request in an isolated sandbox before merge.
- [`ask-fde`]({{ '/ask-fde/' | relative_url }}) — route a plain request to whichever skill here actually fits.
- [`conduct`]({{ '/conduct/' | relative_url }}) — decide whether delivery work runs as a loop, a graph, or a hybrid.
- [`model-routing`]({{ '/model-routing/' | relative_url }}) — resolve which model tier a task node runs on, from the shared registry.
- [`recon`]({{ '/recon/' | relative_url }}) — brief an inherited codebase, read-only, before any other work starts.
- [`slice`]({{ '/slice/' | relative_url }}) — decompose a signed PRD into contract-complete backlog items.
- [`raise`]({{ '/raise/' | relative_url }}) — publish that backlog to a tracker with pickup-protocol labels attached.
- [`architect`]({{ '/architect/' | relative_url }}) — turn a scoped requirement into bounded components and recorded design decisions.
- [`safeguard`]({{ '/safeguard/' | relative_url }}) — run the security assessment and hardening gate before release.
- [`deliver`]({{ '/deliver/' | relative_url }}) — verify release readiness and stack a large change into reviewable pull requests.
- [`operate`]({{ '/operate/' | relative_url }}) — cover a system after it ships: reliability, quality, and maintenance.
- [`responsible-ai-governance`]({{ '/responsible-ai-governance/' | relative_url }}) — overlay audit, explainability, and human-checkpoint requirements where the work is regulated.

The card grid below carries the same fifteen with their full descriptions.

## Where to start

None of this makes a plausible diff any harder to produce. It makes a false one harder to ship. Start on the [Deliver with evidence]({{ '/journey/deliver-with-evidence/' | relative_url }}) journey to walk the pipeline in the order a real change actually takes.
