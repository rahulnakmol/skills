---
layout: skill
name: map
title: "Map — Personas, Flows, and the Understanding Document"
description: "Map turns a discovery analysis into personas, current and target process flows, and the Business Understanding Document the Framing gate signs."
group: pm
invocation: model-invoked
lens:
  novice:
    who: "You have read the discovery analysis and now have to turn stakeholder notes into personas and a process diagram, and you are not sure how detailed either needs to be."
    value: "Map fixes the shape for you — three to six named personas, current and target flows with pain points marked red and improvements marked green — so you are not guessing at the right level of detail."
  practitioner:
    who: "You draft Business Understanding Documents every quarter, and the diagrams are usually the part reviewers actually read."
    value: "The one-figure-one-claim rule keeps a flow diagram from trying to carry two arguments at once, which is usually why a diagram gets questioned in the room instead of approved."
  leader:
    who: "Your Framing gate reviews keep getting stuck relitigating what a diagram is actually claiming."
    value: "Every figure follows the same visual system as the rest of the practice, so a reviewer who has seen one Map document can read the next one without relearning the encoding."
  csuite:
    who: "You need transformation documents that state a problem's mechanism plainly enough to approve in one sitting."
    value: "The Business Understanding Document is the artifact the Framing gate signs — it exists so a problem owner can state, in their own words, what problem is being solved and for whom."
---

## What it does

Map turns a completed discovery analysis into three to six named persona profiles, current-state and target-state process flows in Mermaid, and the Business Understanding Document the Framing gate signs. Personas differ by hat: end-user personas under the product hat, organizational-actor personas with RACI under the transformation hat. Every figure passes through visual compression before it is finalized — one figure, one claim — so a document never ships a diagram trying to carry two arguments at once. Map also routes its own handoff: product hat to `carve`, transformation hat to `tom-architect`.

## How to call it

Map is model-invoked, so there is no slash command for it. The model reaches for it once a discovery analysis exists and the request asks for personas, process flows, or a swimlane diagram — for example: "map the personas and the current and target journeys," the same utterance the routing eval tests (`test/eval/routing.jsonl`, case r026). Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">One figure, one claim</div>
<pre><code>Figure: Reconciliation bottleneck moves from
<span class="tok-ok">manual matching (current) to automated</span>
<span class="tok-ok">matching with a one-day exception queue</span>
<span class="tok-ok">(target).</span>
One argument. One figure.</code></pre>
<div class="compare-card-note">Compress the mechanism the decision actually turns on, not a decorative restatement of the topic.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Figure: current state, target state, staffing
<span class="tok-warn">plan, and vendor comparison, all on one</span>
<span class="tok-warn">diagram.</span></code></pre>
<div class="compare-card-note">A figure trying to carry two arguments at once is two figures that have not yet been separated.</div>
</div>
</div>

## In practice

Map has no fixture to replay, so what follows is the shape its own output contract requires, filled in for one illustrative process rather than a captured run:

<pre><code><span class="tok-comment"># specs/checkout-understanding-doc.md (excerpt)</span>
Persona: AR Reconciliation Analyst (end user, product hat)

flowchart LR
  A[CSV export] --> B[Manual matching]
  B --> C[Exceptions worked by hand]
  C --> D[Close signed off, day 3]
  <span class="tok-warn">%% pain point: manual matching, marked red</span>

flowchart LR
  A[CSV export] --> B[Automated matching]
  B --> C[Exception queue, same day]
  C --> D[Close signed off, day 1]
  <span class="tok-ok">%% improvement: automated matching, marked green</span></code></pre>

## How it works

1. **Define phase per DDDD.md.** Read the analysis file and extract the problem statement, stakeholders, classification, root causes, and entry mode. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Build the personas.** Three to six named profiles — end users under the product hat, organizational actors with RACI under the transformation hat. See [`HATS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/HATS.md).
3. **Generate current and target flows.** Mermaid diagrams with pain points marked red and improvements marked green.
4. **Compress before finalizing.** One figure, one claim, applied to every figure before it ships. See [`VISUALS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/VISUALS.md).
5. **Assemble the document the gate signs.** The Business Understanding Document is what Framing actually reviews. See [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/GATES.md).
