---
layout: skill
name: discover
title: "Discover — Root-Cause Analysis Before Solutioning"
description: "Discover turns a raw business problem, meeting notes, or a vague opportunity into a stakeholder-grounded, root-cause analysis before any solution design."
group: pm
invocation: user-invoked
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

Discover turns a raw business problem — meeting notes, a transcript, a vague opportunity — into a structured analysis grounded in named stakeholders and a real root cause, before anyone proposes a solution. It verifies or bootstraps the initiative repository, classifies which hat the engagement wears, then clarifies across five dimensions in the grill's themed rounds rather than a single long form. Every problem statement is decomposed with Five Whys or Fishbone before it is accepted as final, distinguishing root causes from symptoms rather than treating the first plausible cause as the answer. The output is one analysis document a problem owner can confirm before it hands off to `map`.

## How to call it

In Claude Code, type `/discover`. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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

## In practice

Discover has no fixture to replay, so this is the shape its own output contract requires, filled in for an illustrative initiative rather than a captured run:

<pre><code><span class="tok-comment"># specs/checkout-analysis.md</span>
Problem statement: Reconciliation errors spike at month end,
  delaying close by three business days.
Stakeholder register: Finance lead (decision-maker), AR team
  (end users), Platform engineering (dependency).
Classification: Process Automation
Root causes (Five Whys): manual CSV reconciliation → no
  automated matching → legacy export format → vendor contract
  predates the current ERP → never renegotiated after migration.
Constraints: no budget for a new reconciliation vendor this
  fiscal year.
Success criteria: close cycle back to one business day.
Entry mode: sponsor-initiated, thin evidence in hand.
Next step: map</code></pre>

## How it works

1. **Discover phase per DDDD.md.** Verify or bootstrap the initiative repository substrate before any real work begins. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md) and [`INITIATIVE-REPO.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/INITIATIVE-REPO.md).
2. **Classify the hat.** Product or transformation, from the shape of the problem — ask only if genuinely ambiguous. See [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md).
3. **Accept raw inputs.** Meeting notes, transcripts, and spreadsheets are normalized rather than re-asked for, and research is commissioned where the evidence in hand is thin. See [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md).
4. **Clarify and find root cause.** Question across the five dimensions in the grill's themed rounds, then decompose with Five Whys or Fishbone. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/discover/METHOD.md).
5. **Classify and confirm.** Present the initiative type, problem statement, and root causes to the user for confirmation before the analysis document is written.
