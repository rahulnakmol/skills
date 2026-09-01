---
layout: skill
name: impact
title: "Impact — From Raw Idea to Signed PRD"
description: "Impact is the user-invoked pipeline that turns a raw idea into an approved, signed PRD through a grill loop, value probing, and a handoff to slice."
group: developer
invocation: user-invoked
scenario: "Turning QuenServe's signed epic E1 — offline inspection sync — into an engineering PRD, on the estate recon just briefed"
lens:
  novice:
    who: 'You are holding a raw idea, a set of notes, or a vague ask, with no clear sense of how it becomes real, funded work.'
    value: 'Impact turns that into a signed PRD through a grill loop that keeps asking until the idea holds up — so nothing gets built on a guess.'
  practitioner:
    who: 'You need to hand a greenfield or brownfield idea into the delivery pipeline before slice and sdlc can start.'
    value: 'Impact drafts a fast-cut PRD, pulls in a recon brief first for brownfield work, captures functional and non-functional requirements separately, and will not hand off to slice until gate G2 is explicitly, namedly signed.'
  leader:
    who: 'You are tired of features that reach implementation missing a real business-value case.'
    value: 'A PRD cannot reach sign-off with an empty or templated business-value section. That gate stops a premature build before a line of code is written, not after.'
  csuite:
    who: 'You need a record of why a feature exists, not only proof that it shipped.'
    value: 'Every signed PRD carries a decision log, a recorded risk and governance tier, and a business-value section tracing requirement to outcome — the paper trail behind the spend.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 2
journey_steps: 5
journey_prev: recon
journey_next: sdlc
---

## What it does

Impact turns a raw idea — notes, a transcript, or a vague ask — into an approved PRD, the product requirements document, and a handoff ready for `slice`. It exists because a feature can otherwise reach implementation with no real business case behind it. The grill loop — a round of hard questions repeated until the idea holds up, or is honestly cut — is the mechanism that catches that before a line of code is written.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Intake</span><span class="step-text">Draft a fast-cut PRD against `PRD-TEMPLATE.md`; pull in a recon brief first for brownfield work.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Grill</span><span class="step-text">Apply `GRILL.md` and `VALUE.md` until the PRD earns sign-off or a waiver is stated on record.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Separate FR from NFR</span><span class="step-text">Functional and non-functional requirements captured separately, never left implicit in one another.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Populate business value</span><span class="step-text">The PRD cannot advance without a real, measured business-value section — not a template line.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Sign and hand off</span><span class="step-text">Gate G2's explicit, named sign-off is what opens the door to `slice` — nothing else does.</span></div>
</div>

<ul class="benefits">
  <li>No PRD reaches `slice` with a business-value section that is empty or templated — the gate that would let that through does not exist.</li>
  <li>A functional requirement and its non-functional counterpart are never left tangled together; each gets its own line with its own threshold.</li>
  <li>Every scope cut made during grilling lands in the decision log with its rationale, so the PRD doubles as the record of the whole inception journey, not just its final shape.</li>
  <li>A governance trigger — a regulated industry, a consequential automated decision, personal data, a residency constraint — is screened for every round, not once at the end when scope has already widened past it.</li>
</ul>

The output is a markdown PRD capped at eight to ten pages, plus an updated `.impact.json` project record — a document that needs more room than that has scope that belongs split across successive impact re-entries, not a longer file.

- [`PRD-TEMPLATE.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md) covers every section a PRD carries, from the problem statement through the approval sign-off.
- [`GATES.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/GATES.md) covers the four gates intake walks through, from raw capture to the handoff `slice` reads.

## When to reach for it

In Claude Code, type `/impact`, or name the skill directly in a session. The real, current line `r014` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger: "I have a raw idea, pressure-test it into a PRD."

You reach for it in three moments. A new initiative, a major feature, or a brownfield change needs alignment before anyone commits engineering time to it. Someone hands you notes, a transcript, or a vague ask and expects a requirements document to come out the other side. A PRD already exists but was never actually grilled — no hard questions, no recorded trade-offs — and you need that gap closed before it ships as though it had been.

| The problem | The skill |
|---|---|
| You need estate context on an existing codebase before scope gets written down | [`recon`]({{ '/recon/' | relative_url }}) |
| The PRD is signed and you need it decomposed into backlog items | [`slice`]({{ '/slice/' | relative_url }}) |
| You need the gated build loop itself, not the requirements document in front of it | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| The idea is a pm-pipeline epic PRD, not a piece of software delivery | [`prd-draft`]({{ '/prd-draft/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same impact skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want impact can skip the rest of the catalog with `./scripts/link-skills.sh --skill impact`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Impact is user-invoked: type <code>/impact</code>, or name it directly in a session — nothing routes to it automatically.</p>
<div class="prompt-card">Recon just briefed QuenServe's sync client and ingestion endpoint. Inspectors lose completed inspections when a site has no connectivity, and epic E1 proposes offline inspection sync. Pressure-test this into a PRD: draft it, grill it, and do not sign off until the business value is real.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Impact returns a fast-cut PRD draft, grilled against `GRILL.md` and `VALUE.md`, and stops at gate G2 until you actually sign it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Command file, impact agent</span></div>
<div class="tool-group-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>/impact</code> command from <code>adapters/opencode/commands/impact.md</code>, bound to the <code>impact</code> agent. It leads the scope, product requirements, and business trade-offs sections of the SPEC-TS ledger — the alignment record `sdlc` carries forward through the rest of delivery — researches evidence, runs the candidate-and-challenge design passes, and returns Gate 1 evidence.</p>
<div class="prompt-card">/impact Inspectors lose completed inspections when a site has no connectivity — recon just briefed QuenServe's sync estate. Pressure-test epic E1, offline inspection sync, into a PRD and stop before slice until the business value is measured and sign-off is recorded.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent returns the smallest useful recommendation, the value case, and the human gates the PRD still needs before slice can read it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply impact's procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees impact's name and description the same way the other tools do, and a team adds its rules directly to <code>AGENTS.md</code>. Copilot's agent mode applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Read skills/developer/impact/SKILL.md, PRD-TEMPLATE.md, and GATES.md, then draft and grill a PRD for epic E1, QuenServe's offline inspection sync. Do not report G2 signed unless I actually said so.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three draft the PRD directly in their reply, since none has a command's output to parse, and state the open questions the grill still needs answered.</p>
</div>
</div>

A good ask names whether the work is greenfield or brownfield, and includes the raw idea itself — notes, a transcript, or a plain description — since intake drafts directly from what it is given.

## A working example

This example turns epic E1, offline inspection sync, into an engineering PRD for [QuenServe]({{ '/example/' | relative_url }}) — the field-inspection product every scenario on this site returns to. Recon has already briefed QuenServe's existing sync client and ingestion endpoint. Inspectors on sites with no signal lose a completed inspection whenever the sync never reaches the server, and you want that fixed — but "fixed" is not yet a PRD. Because this is brownfield work, intake attaches recon's brief before drafting scope for epic E1. It then grills the draft against `PRD-TEMPLATE.md`'s Scope section, separating the functional requirement — "an inspection completed offline saves locally and queues for sync" — from the non-functional one — "sync completes within 60 seconds of the connection returning." `impact/GATES.md` is short enough to quote in full, byte for byte — this is the real gate table every intake walks:

<pre><code>| Gate | Requirement |
|------|-------------|
| G0 intake | Raw idea captured |
| G1 grilled | &ge;1 grill round or explicit waive |
| G2 signed | User sign-off in PRD; governance tier recorded |
| G3 handoff | `slice` allowed |</code></pre>

Filling that table for epic E1 shows the shape a finished intake takes, per the skill's own output contract of a capped markdown PRD plus a `.impact.json` update. This is not a captured real run, since impact has no fixture file of its own to quote. G0 captures the raw report of inspections lost to failed syncs. G1 runs a grill round against the drafted scope, recording that the offline-capture behavior and the sync-latency threshold were each pressure-tested on their own, not assumed. G2 records the risk and governance tier — `none`, since this epic touches no regulated data or consequential automated decision — and a named, dated sign-off. Only then does G3 open, and `slice` is allowed to read the PRD:

<pre><code>## Business value delivered
Lost syncs currently force an estimated 40 site re-visits a
month, at $600 each in inspector time and travel; this
eliminates re-visits caused by a lost sync, measured via the
inspection re-visit log.
## Risk and governance tier
none
## Approval sign-off
Approved &mdash; R. Doyle, 2026-08-20</code></pre>

The business-value section names who benefits and how the benefit is measured, per `VALUE.md`'s own lens, rather than asserting that the fix will simply help.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A PRD ready for sign-off</div>
<pre><code>## Business value delivered
Lost syncs currently force an estimated 40 site re-visits a
month, at $600 each in inspector time and travel; this
eliminates re-visits caused by a lost sync, measured via the
inspection re-visit log.
## Risk and governance tier
<span class="tok-ok">none</span>
## Approval sign-off
<span class="tok-ok">Approved &mdash; R. Doyle, 2026-08-20</span></code></pre>
<div class="compare-card-note">A measured value case, a recorded governance tier, and a named, dated sign-off — every field PRD-TEMPLATE.md and GATES.md's G2 require.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>## Business value delivered
<span class="tok-warn">This will make things better for users.</span>
## Approval sign-off
<span class="tok-warn">(pending)</span></code></pre>
<div class="compare-card-note">A PRD cannot reach sign-off with this section empty or templated — PRD-TEMPLATE.md, quoted directly. No sign-off, no handoff to slice; that is gate G2.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the business value genuinely cannot be quantified yet?</summary>
<div class="qa-body">

`VALUE.md`'s business-value lens allows a deferred measurement, recorded plainly, naming what would make it measurable and when that becomes due. What it does not allow is a permanently unmeasured claim standing in for a number — "it'll obviously help" is not an acceptable substitute even at true discovery-stage work.

</div>
</details>

<details class="qa">
<summary>Does every scope item need to survive every grill round?</summary>
<div class="qa-body">

No, and a cut is not a failure — it is a finding, as long as it is recorded. `VALUE.md`'s do-nothing-alternative lens treats "not much changes if we skip this" as a legitimate result. It means the scope was oversized relative to its urgency, and the honest move is to shrink it and log the cut in the PRD's decision log, not to protect momentum the item never earned.

</div>
</details>

<details class="qa">
<summary>What happens when a scope item touches regulated data partway through grilling?</summary>
<div class="qa-body">

The governance-triggers lens screens for this every round, not only at the end, because scope routinely widens into governed territory partway through a grill. When a trigger fires — a regulated industry, a consequential automated decision, personal data, a residency constraint — impact calls `responsible-ai-governance` and records the resulting risk tier before the PRD can be signed.

</div>
</details>

<details class="qa">
<summary>Can slice start on a PRD that was drafted but never actually grilled?</summary>
<div class="qa-body">

No. `GATES.md`'s G1 requires at least one grill round or an explicit, recorded waiver — silence does not count as either. And G3, the handoff to `slice`, opens only once G2's sign-off is explicit and named; a PRD sitting in draft with no sign-off blocks the handoff regardless of how complete its prose reads.

</div>
</details>

## It's working if

- Every PRD's business-value section names who benefits and how the benefit is measured, or states a deferred measurement with a date it becomes due — never a templated line.
- Every functional requirement has its non-functional counterpart stated separately, with its own threshold, rather than folded silently into the functional line.
- A pull from `slice` never runs against a PRD whose G2 sign-off is missing, pending, or unnamed.
- Every scope cut made during grilling still has its rationale in the decision log, even the ones a later round reopened.

If a PRD reaches sign-off with its business-value section filled by a generic sentence instead of a measured claim, the discipline has failed even though the document still reads as complete.

## Where it fits

**Impact is where a raw idea either qualifies for the delivery pipeline or gets shrunk to the size its evidence actually supports.**

Its nearest neighbor on the journey is `recon`: for brownfield work, recon's brief is what impact drafts scope against, so the PRD reflects the estate as it actually is rather than an assumption about it. `slice` is the next step once G2 is signed, reading the same PRD to decompose it into backlog items. The pm group's own `prd-draft` may feed a pm-pipeline epic PRD into impact for engineering inception, or hand straight to slice when its acceptance criteria are already machine-checkable.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
