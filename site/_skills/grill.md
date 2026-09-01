---
layout: skill
name: grill
title: "Grill — Pressure-Test a PM Artifact Before a Gate"
description: "Grill is the user-invoked skill that interrogates an analysis, manifest, case, or PRD in themed rounds until it earns the right to advance through a gate."
group: pm
invocation: user-invoked
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

Grill interrogates a PM artifact — an analysis, a manifest, a case, or a PRD — in themed rounds of three to five questions until it earns the right to advance through a gate, or the user explicitly stops. Each round restates the sharpened scope in three sentences or fewer and closes with the same three-way choice: continue, stop, or move to sign-off. Grill runs in one of three modes — a plain round protocol, grill-with-docs when a research corpus exists, or provoke for contrasting intuition-agent hypotheses pushed toward star 7 or 8 ambition — and before any sign-off it runs the pre-gate blind-spot checklist. The round protocol is shared directly with the developer group's `core/GRILL.md`, not reinvented.

## How to call it

In Claude Code, type `/grill`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A round that converges and records its trade-off</div>
<pre><code>Round 3 (theme: business value): 4 questions, answered
Restated scope: "Saved-card recall targets a 4-point completion
lift; the risk is payments-team dependency D-14, not adoption."
User: <span class="tok-warn">"we stop here"</span>
<span class="tok-ok">Trade-off recorded: further rounds would likely have
probed the adoption-rate assumption in more depth; that risk
is accepted, in writing, by the user's choice to stop.</span></code></pre>
<div class="compare-card-note">Stopping is not silent — the trade-off accepted by stopping is written down before the session closes.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Round 2: 3 questions, answered.
<span class="tok-warn">"Ran out of obvious questions -- signing off."</span>
(no restated scope, no blind-spot checklist run,
 the case's core recommendation still unanswered)</code></pre>
<div class="compare-card-note">Sign-off requested with the artifact's core question still unanswered, and no blind-spot checklist run, is a stall dressed up as completion.</div>
</div>
</div>

## In practice

Grill's output contract is the artifact itself, updated in place with captured answers, plus a Trade-offs record — there is no separate rendered document. The doctrine names four personas the question bank is aware of, because a junior PM and a transformation leader are grilled on the same artifact for different reasons:

```
Product Manager            -> pressed on scope and user value
Business Architect         -> pressed on process fit and capability gaps
Transformation Leader      -> pressed on organizational readiness and
                               sequencing risk
Chief Business Transformation
  Officer                  -> pressed on portfolio-level trade-offs and
                               north-star contribution
```

`GRILL-PM.md` states those four personas and their pressures in prose; the table above sets the same four out side by side, and adds nothing to them. It is not a captured run — grill has no companion script; every round happens as a back-and-forth with the user, captured directly into the artifact being grilled.

## How it works

1. **Choose the mode.** Plain round protocol, grill-with-docs when a research corpus exists, or provoke for intuition-agent hypotheses. See [`GRILL-PM.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/grill/GRILL-PM.md), which shares its round protocol with [`core/GRILL.md`](https://github.com/tqnonline/skills/blob/main/skills/core/GRILL.md).
2. **Run themed rounds.** Three to five questions per round, one dominant theme, answers captured immediately.
3. **Restate the sharpened scope** after each round, in three sentences or fewer; offer continue, stop, or sign-off.
4. **Run the pre-gate blind-spot checklist** before sign-off. See [`AGENT-OWNERSHIP.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/AGENT-OWNERSHIP.md).
5. **Record every trade-off** accepted by an early stop before the session closes.
