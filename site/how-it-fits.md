---
layout: page
permalink: /how-it-fits/
title: "How it fits"
eyebrow: "The pipeline, end to end"
description: "The system map: which skill starts, what it hands the next one, where every artifact lands, and how a GitHub or Linear issue gets its epic, feature, or story tag."
lede: "Which skill runs first, what you hand to the next one, and where each answer lands: a signed document, a tracked issue, a merged pull request, a measured result."
---

Every stage reads what the stage before it wrote, and nothing reaches code until a named person checks the plan and the money. Four people, not four agents, decide whether the work is framed right, worth funding, built well, and ready to commit. Everything below is evidence for one of those decisions.

<div class="figure-row">
<figure>
<svg class="flow-svg" viewBox="0 0 400 142" role="img" aria-label="Ungated flow: a prompt becomes code, the code gets merged, and problems surface only afterward, in production, with no checkpoint in between.">
  <defs><marker id="arrow-plain" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"></path></marker></defs>
  <rect class="flow-box" x="10" y="26" width="98" height="34" rx="5"></rect>
  <text x="59" y="48" text-anchor="middle">Prompt</text>
  <line class="flow-arrow" x1="108" y1="43" x2="126" y2="43" marker-end="url(#arrow-plain)"></line>
  <rect class="flow-box" x="134" y="26" width="98" height="34" rx="5"></rect>
  <text x="183" y="48" text-anchor="middle">Code</text>
  <line class="flow-arrow" x1="232" y1="43" x2="250" y2="43" marker-end="url(#arrow-plain)"></line>
  <rect class="flow-box" x="258" y="26" width="98" height="34" rx="5"></rect>
  <text x="307" y="48" text-anchor="middle">Merged</text>
  <line class="flow-arrow" x1="307" y1="60" x2="307" y2="82" marker-end="url(#arrow-plain)"></line>
  <rect class="flow-warnbox" x="228" y="90" width="158" height="44" rx="5"></rect>
  <text x="307" y="108" text-anchor="middle">Surprises in</text>
  <text x="307" y="124" text-anchor="middle">production</text>
</svg>
<figcaption><strong>Without gates.</strong> A prompt becomes code, the code merges, and the only feedback loop is a user finding what shipped. No artifact sits between "code" and "merged" that a person read first, so no checkpoint catches a wrong problem, a wrong bet, or a false "done."</figcaption>
</figure>
<figure>
<svg class="flow-svg" viewBox="0 0 400 142" role="img" aria-label="Gated flow: an idea becomes a signed brief, then an approved epic and PRD, then a tracked work item, then a gate ledger with an audited pull request, then a reviewed pull request, then measured value. Each arrow is one skill's handoff, and four diamonds mark the human gates: Framing, Investment, Quality, and Commitment.">
  <defs><marker id="arrow-gated" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"></path></marker></defs>
  <rect class="flow-box" x="8" y="24" width="70" height="32" rx="4"></rect>
  <text x="43" y="45" text-anchor="middle">Idea</text>
  <line class="flow-arrow" x1="78" y1="40" x2="90" y2="40" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="96" y="24" width="70" height="32" rx="4"></rect>
  <text x="131" y="45" text-anchor="middle">Brief</text>
  <line class="flow-arrow" x1="166" y1="40" x2="174" y2="40"></line>
  <polygon class="flow-gate" points="176,40 182,34 188,40 182,46"></polygon>
  <text class="flow-tag" x="182" y="17" text-anchor="middle">F</text>
  <line class="flow-arrow" x1="188" y1="40" x2="198" y2="40" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="204" y="24" width="88" height="32" rx="4"></rect>
  <text x="248" y="45" text-anchor="middle">Epic + PRD</text>
  <line class="flow-arrow" x1="292" y1="40" x2="300" y2="40"></line>
  <polygon class="flow-gate" points="302,40 308,34 314,40 308,46"></polygon>
  <text class="flow-tag" x="308" y="17" text-anchor="middle">I&#183;Q</text>
  <line class="flow-arrow" x1="314" y1="40" x2="324" y2="40" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="328" y="24" width="64" height="32" rx="4"></rect>
  <text x="360" y="45" text-anchor="middle">Work</text>
  <line class="flow-arrow" x1="360" y1="56" x2="360" y2="74"></line>
  <polygon class="flow-gate" points="360,76 366,82 360,88 354,82"></polygon>
  <text class="flow-tag" x="346" y="86" text-anchor="end">C</text>
  <line class="flow-arrow" x1="360" y1="88" x2="360" y2="98" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="252" y="100" width="140" height="32" rx="4"></rect>
  <text x="322" y="121" text-anchor="middle">Gate ledger + PR</text>
  <line class="flow-arrow" x1="252" y1="116" x2="240" y2="116" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="140" y="100" width="92" height="32" rx="4"></rect>
  <text x="186" y="121" text-anchor="middle">Reviewed PR</text>
  <line class="flow-arrow" x1="140" y1="116" x2="128" y2="116" marker-end="url(#arrow-gated)"></line>
  <rect class="flow-box" x="8" y="100" width="112" height="32" rx="4"></rect>
  <text x="64" y="121" text-anchor="middle">Measured value</text>
</svg>
<figcaption><strong>With gates.</strong> Each stage is an artifact a person can open, each arrow is one skill's handoff, and a gate sits at each point <code>GATES.md</code> names: <strong>F</strong> Framing, <strong>I</strong> Investment, <strong>Q</strong> Quality, <strong>C</strong> Commitment. The gate ledger and shakedown check "actually done" the same way, once code exists.</figcaption>
</figure>
</div>

<div class="doc-note">
<p>Evals are the checks an AI engineer runs before trusting a model's answer. This pipeline runs the same discipline on a business decision. A named person checks the evidence before trusting that the problem is real, the bet is worth funding, the requirement is complete, and, once code exists, that it was actually finished. Each artifact below is what one of those checks reads before it signs.</p>
</div>

## From idea to shipped, measured work

Every scenario on this site is a piece of one product: [QuenServe, the example enterprise field-inspection SaaS]({{ '/example/' | relative_url }}), with its epic, features, and user stories laid out on that page. The walkthrough below follows QuenServe itself: the field-connectivity problem becomes epic E1, and E1-F1-S1, its delivery story, is what reaches code.

**You bring an idea** — for QuenServe, the field-connectivity problem: an inspector's phone loses signal inside a warehouse or on a rural site, and the inspection still has to complete. There is no artifact yet, only a person who owns the problem.

<div class="pipeline">
<div class="stage">
<div class="stage-num">1</div>
<h3><strong><a href="{{ '/discover/' | relative_url }}">discover</a></strong> frames it into a brief</h3>
<p class="stage-meta">Reads: your raw notes. Writes: <code>specs/{prefix}-analysis.md</code>.</p>
<p>Discover runs intake and root-cause analysis across five dimensions, writing a problem statement, a stakeholder register, and success criteria stated as outcomes. Paired with <a href="{{ '/map/' | relative_url }}">map</a>, this becomes the Business Understanding Document the <strong>Framing</strong> gate signs — in the problem owner's own words, what is being solved and for whom. For QuenServe, that raw idea is the field-connectivity problem, and the resulting Business Understanding Document is what <code>carve</code> reads to cut out E1.</p>
</div>

<div class="stage">
<div class="stage-num">2</div>
<h3><strong><a href="{{ '/carve/' | relative_url }}">carve</a></strong> cuts the epics</h3>
<p class="stage-meta">Reads: the Business Understanding Document. Writes: <code>specs/prd/{prefix}-epic-manifest.md</code>.</p>
<p>An <strong>epic</strong> — work large enough to ship on its own, small enough to estimate — passes four tests before it enters the manifest: Deliverable, Independent, Valuable, Estimable (DIVE). A candidate that fails one is split or rejected. Reading QuenServe's field-connectivity understanding document, carve extracts one candidate that passes all four: E1, offline inspection sync.</p>
<pre><code>E1 &mdash; offline inspection sync                           [1]
  Scope:     an inspector's phone loses signal inside a
             warehouse or on a rural site, and the
             inspection still has to complete
  Personas:  field inspector, operations manager          [2]
  Depends on: none                                         [3]
  DIVE: Deliverable  &mdash; ships as its own release
        Independent  &mdash; no upstream epic required
        Valuable     &mdash; inspectors keep working with no
                        signal; managers see sync health
        Estimable    &mdash; L, roughly one quarter          [4]</code></pre>
<ol class="stage-walk">
<li>One epic, one shippable outcome, with its scope edge stated — Deliverable. E1 ships as offline inspection sync on its own.</li>
<li>A named persona, never "all users" — Valuable. E1 names field inspector and operations manager, the two people who actually use QuenServe.</li>
<li>A dependency recorded as a field, not assumed — Independent made checkable. E1 depends on nothing upstream.</li>
<li>The DIVE verdict a sponsor reads before signing the <strong>Investment</strong> gate, beside the case's costs.</li>
</ol>
<p>Carve fixes only E1, the hierarchy's top. A <strong>feature</strong> is a slice of an epic built around one capability; a <strong>user story</strong> is one thing a kind of user can now do. For QuenServe, <a href="{{ '/prd-draft/' | relative_url }}">prd-draft</a> writes E1's product requirements document (PRD), and <a href="{{ '/prd-review/' | relative_url }}">prd-review</a> scores it at the <strong>Quality</strong> gate. On the developer side, <a href="{{ '/impact/' | relative_url }}">impact</a> turns the signed epic into its own engineering PRD, signed at its own G2. <code>slice</code> cuts that PRD into E1-F1 through E1-F3 and their stories — E1-F1-S1 among them — each carrying the parent link tying it back to E1.</p>
</div>

<div class="stage">
<div class="stage-num">3</div>
<h3><strong><a href="{{ '/slice/' | relative_url }}">slice</a></strong> writes the work-item contract</h3>
<p class="stage-meta">Reads: E1's signed engineering PRD. Writes: a backlog bundle, one <code>WORK-ITEM-CONTRACT.md</code> per item.</p>
<p>Slice decomposes the PRD into features, user stories, technical stories, and a mandatory operability lane, embedding every <code>WORK-ITEM-CONTRACT.md</code> section into each item's body. For E1, that PRD is impact's engineering PRD, and slice cuts it into E1-F1 through E1-F3 and their stories.</p>
<pre><code>Story: E1-F1-S1 &middot; complete an inspection with no
       connectivity and it syncs without loss
Parent: E1-F1 &mdash; offline capture                         [1]
        PRD: specs/prd/e1-engineering-prd.md

Acceptance criteria:                                    [2]
  - an inspection completed with no network connection
    saves locally and syncs to the server without
    losing or duplicating any recorded data once
    connectivity returns

Execution profile:                                       [3]
  mode: loop
  model tier: &lt;resolved by model-routing&gt;
  delivery shape: single pull request</code></pre>
<ol class="stage-walk">
<li><strong>Parent links</strong> — the contract's exact words: "the epic or feature this item belongs to, and the PRD it traces back to." E1-F1-S1's parent is E1-F1. An item with no parent link "must not be raised."</li>
<li><strong>Acceptance criteria</strong> — machine-checkable only, each written so it can become a <code>CHECK</code> command and an <code>EXPECT</code> token in a gate ledger.</li>
<li><strong>Execution profile</strong> — the loop-or-graph call from <a href="{{ '/conduct/' | relative_url }}">conduct</a>'s rubric, the model tier from <a href="{{ '/model-routing/' | relative_url }}">model-routing</a>, and single pull request or <code>STACKING.md</code> stack.</li>
</ol>
</div>

<div class="stage">
<div class="stage-num">4</div>
<h3><strong><a href="{{ '/raise/' | relative_url }}">raise</a></strong> publishes it to GitHub or Linear</h3>
<p class="stage-meta">Reads: the contract-complete bundle. Writes: issue URLs, label <code>raised</code>.</p>
<p>This is where "epic, feature, user story" becomes a real tracker record. Doctrine fixes three things: the label <code>raised</code> on creation; GitHub sub-issues under the epic, or a Projects v2 board, whichever <code>.impact.json</code> names; Linear's parent issue or project mapping from that same file. Which label spells "epic" versus "feature," which column, which cycle, is your tracker's own configuration. This is also the <strong>Commitment</strong> gate: PM authorship ends, delivery execution begins.</p>
</div>

<div class="stage">
<div class="stage-num">5</div>
<h3><strong><a href="{{ '/grit/' | relative_url }}">grit</a></strong> writes the gate ledger before code</h3>
<p class="stage-meta">Reads: E1-F1-S1's acceptance criteria. Writes: <code>.grit/e1-f1-s1-offline-sync/GATES.md</code>.</p>
<p>Every acceptance criterion becomes one gate: a <code>CHECK</code> command and the <code>EXPECT</code> pattern its output must match, tagged completeness, accuracy, value, efficiency, or thoroughness — written before the first source change, so it states what "done" means independent of the implementation. For E1-F1-S1, that turns "syncs without loss" into gates the offline store, the sync client, and the server's ingestion endpoint each have to pass.</p>
</div>

<div class="stage">
<div class="stage-num">6</div>
<h3><strong><a href="{{ '/sdlc/' | relative_url }}">sdlc</a></strong> and <strong><a href="{{ '/deliver/' | relative_url }}">deliver</a></strong> build between the gates</h3>
<p class="stage-meta">Reads: the ready item and its ledger. Writes: one PR, or a dependency-ordered stack, each carrying the audit.</p>
<p>A single writer implements in an isolated worktree, touching only its owned paths — for E1-F1-S1, <code>packages/inspections/offline/**</code>. A separate verifier runs the contract's checks and every gate, reporting met, unmet, and abandoned counts with real evidence. A change spanning more than one concern ships as a stack of small pull requests, never one diff, each body carrying the audit table (id, dimension, check, expect, status, evidence).</p>
</div>

<div class="stage">
<div class="stage-num">7</div>
<h3><strong><a href="{{ '/shakedown/' | relative_url }}">shakedown</a></strong> reviews and spot-checks the claimed audit</h3>
<p class="stage-meta">Reads: the PR and its audit claim. Writes: pass or fail on build, tests, coverage.</p>
<p>Shakedown builds and tests the change in a disposable sandbox, evaluates a stacked pull request against its own stack base, and checks the coverage matrix against its floors, opening the actual diff rather than trusting a green exit code. It blocks on a red build, a failing floor, or a missing test — never an approval on an unverified claim.</p>
</div>

<div class="stage">
<div class="stage-num">8</div>
<h3><strong><a href="{{ '/report/' | relative_url }}">report</a></strong> and <strong><a href="{{ '/realize/' | relative_url }}">realize</a></strong> close the loop</h3>
<p class="stage-meta">Reads: live pipeline state, the case's projections. Writes: <code>specs/{prefix}-benefits.md</code>, <code>specs/{prefix}-report-{cadence}.md</code>.</p>
<p>Realize enters every case-projected benefit into a register, attaches a leading indicator, and records actuals as they arrive — an unmet projection is reported unmet, never resized to fit. Report pulls that rollup first, then Problems, Priorities, and Perspective, and checks the rendered pack against source registers before calling it sent. A benefit that diverges from its projection re-enters <code>discover</code> or <code>carve</code>, carrying its own case.</p>
</div>
</div>

## Who starts where

A product person with a raw problem starts at <code>discover</code>; <a href="{{ '/journey/run-a-product-org/' | relative_url }}">Run a product org</a> walks that route through <code>carve</code>, <code>case</code>, <code>report</code>. An engineer starts at <a href="{{ '/recon/' | relative_url }}">recon</a> on an unfamiliar codebase, then <a href="{{ '/impact/' | relative_url }}">impact</a> for a fast PRD, or straight at <code>slice</code> once a PRD is signed; <a href="{{ '/journey/deliver-with-evidence/' | relative_url }}">Deliver with evidence</a> walks that build side through <code>grit</code> to <code>shakedown</code>.

Still not sure which of those is your starting point? Answer three quick questions instead:

{% include chooser.html %}

<div class="doc-note">
<p><strong>What this does not automate.</strong> The four gates stay human on purpose: a sponsor reads the sensitivity case, a PRD's 11-Star score only tells a person where to look, and an <strong>Alignment</strong> decision — one only a named stakeholder can make — is never answered on their behalf. Grit holds the same rule at the code level: a human approves each <code>CHECK</code> once before it runs, and a dropped gate needs a stated reason and a sign-off, never a silent deletion.</p>
<p>One distinction worth being precise about: <code>chart</code> also produces something it calls a ticket, but a chart ticket — Evidence, Option, Alignment, or Enablement, per <code>chart/TICKETS.md</code> — is a decision to make, not backlog. It closes when the question is answered and never becomes a GitHub or Linear issue; reach for it only when an initiative is too large or too uncertain for one <code>discover</code>-to-<code>carve</code> pass. Beyond the <code>raised</code> label and the parent-link mapping <code>raise</code> applies, tagging is your tracker's own configuration.</p>
</div>
