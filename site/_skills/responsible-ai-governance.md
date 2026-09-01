---
layout: skill
name: responsible-ai-governance
title: "Responsible AI & Regulated Governance"
description: "Responsible AI & Regulated Governance is the overlay that adds audit trails, explainability, and human checkpoints to work in a regulated industry."
group: developer
invocation: model-invoked
scenario: "Building a credit-decision model a lender's model-risk program will inspect"
lens:
  novice:
    who: 'You are building something that touches financial, health, or public-sector data and are not sure what extra rules apply.'
    value: 'The overlay names the frameworks in play and what every regulated piece of the system needs, before you build the wrong thing and have to redo it.'
  practitioner:
    who: 'You are implementing a feature that makes or influences a consequential decision in a regulated industry.'
    value: 'You get a fixed checklist per component &mdash; audit trail, explainability hooks, bias and impact assessment, residency, human-in-the-loop &mdash; instead of guessing what a regulator will ask for later.'
  leader:
    who: 'You are responsible for a team shipping into financial services, healthcare, or the public sector.'
    value: 'A control conflict stops and surfaces with options instead of being implemented around, and treats audit and explainability as deliverables with their own tests, not as an afterthought.'
  csuite:
    who: 'You sign the attestations when a regulator or a board asks how an automated decision was made.'
    value: 'Every consequential automated decision carries an immutable, regulator-readable trail of who, what, when, which model, which inputs &mdash; never mutable, never sampled away.'
---

## What it does

Responsible AI & Regulated Governance is not a phase of the build loop. It is a model-invoked overlay, applied on top of the standard stack rules wherever work touches a regulated industry or an AI system that makes or influences a consequential decision — a loan approval, a benefits determination, a clinical triage flag.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Classify the work</span><span class="step-text">Determine whether it touches a regulated industry or a consequential automated decision; when unsure, assume it is governed and ask.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Name the frameworks</span><span class="step-text">Microsoft Responsible AI, NIST AI RMF, and ISO/IEC 42001 always apply; classify the EU AI Act risk tier and add sector rules where relevant.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Apply the fixed control set</span><span class="step-text">Every regulated component gets an audit trail, explainability hooks, a bias and impact assessment, enforced residency, and a human-in-the-loop checkpoint.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Treat conflicts as stops</span><span class="step-text">A requirement that conflicts with a control is surfaced with options, never implemented around to unblock a feature.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Track it as backlog work</span><span class="step-text">A governance item enters the backlog with its own acceptance criteria and tests, the same as any other operability item — never logging bolted on afterward.</span></div>
</div>

<ul class="benefits">
  <li>A regulated component's audit trail, explainability hooks, and human-in-the-loop checkpoint exist before go-live, not reconstructed after an examiner asks for them.</li>
  <li>A control conflict always stops and surfaces with options, instead of getting implemented around to unblock a feature under deadline pressure.</li>
  <li>Every governance item enters the backlog with its own acceptance criteria and tests, the same as any other operability item this pipeline tracks.</li>
  <li>When it is unclear whether something is governed, the default runs toward caution: assume it is, and ask, rather than assume it is exempt.</li>
</ul>

This overlay names several frameworks and regulators, each glossed here at first mention. Microsoft Responsible AI is Microsoft's own standard for building and operating AI systems. NIST AI RMF is the National Institute of Standards and Technology's voluntary framework for managing AI risk. ISO/IEC 42001 is the international standard for an organization's AI management system. The EU AI Act is the European Union's risk-tiered AI regulation, classified by tier per component. SR 11-7 is the Federal Reserve's supervisory guidance on model risk management. BCBS 239 is the Basel Committee's principles for risk-data aggregation and reporting. NCUA and OSFI are the credit-union and Canadian financial regulators whose examination readiness the same section names. SKILL.md states the rule this whole overlay runs on in one line: "Do not implement around a control to make a feature work. If a requirement conflicts with a control, stop and surface the conflict with options."

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md) is the entire doctrine — the frameworks, the fixed control set, and the behavior this overlay runs on.
- [`WORK-ITEM-CONTRACT.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) covers the Governance section every work item states as populated, or explicitly marked not applicable.
- [`OPERABILITY.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md) covers the governance lane where these controls actually enter the backlog as tracked stories.
- [`architect.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/architect.md) covers how the design phase classifies risk tier and maps these obligations before a component is built.

The overlay reads each one only when the moment calls for it: classifying the work reads SKILL.md itself, writing a work item reads WORK-ITEM-CONTRACT.md, slicing the backlog reads OPERABILITY.md, and designing the component reads the architect adapter.

## When to reach for it

Nothing types `/responsible-ai-governance` in Claude Code. This overlay is model-invoked, reached three ways. Work that touches a regulated industry or a consequential automated decision reaches it. So does a direct question about audit, explainability, model risk, or residency. And so does a named framework mentioned directly, such as NIST AI RMF, ISO 42001, SR 11-7, BCBS 239, or the EU AI Act.

You reach for this overlay in three moments. A component is about to be designed, and it will make or influence a decision with real consequences for a person. Someone asks what a specific regulation, like SR 11-7 or the EU AI Act, actually requires here. A work item's parent requirements document already carries a `limited` or `high` governance tier, and the overlay's fixed control set has to be applied, not skipped.

This overlay is not the only skill that touches security or design. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need a threat model and severity-ranked vulnerabilities | [`safeguard`]({{ '/safeguard/' | relative_url }}) |
| You need the technical design and its tradeoffs, with the frameworks layered on top | [`architect`]({{ '/architect/' | relative_url }}) |
| Your work does not touch a regulated industry or a consequential automated decision | Nothing here applies — skip this overlay |
| You need the governance items tracked as backlog stories, not just named | [`slice`]({{ '/slice/' | relative_url }})'s operability lane |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>This overlay has no slash command of its own. Claude reaches for it when a request touches a regulated industry or a consequential automated decision, or when its wording matches the skill's own description — audit, explainability, model risk, residency, or a named framework — directly in chat.</p>
<div class="prompt-card">We are building a model that scores a loan applicant's creditworthiness for a lending product. Walk through what SR 11-7 and the rest of this overlay require before we design it: the audit trail, explainability, the bias assessment, and the human-in-the-loop checkpoint.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The overlay returns the frameworks in scope and the fixed control set the component needs, before design starts on it.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode has no dedicated command for this overlay. The skill lands in <code>.agents/skills/</code>, and OpenCode applies it by reading the catalog as context, the same way it would for any skill this repository ships with no installed command.</p>
<div class="prompt-card">Read skills/developer/responsible-ai-governance/SKILL.md, then tell me what a credit-decision model for this lending product needs: the frameworks in scope, and the fixed control set &mdash; audit trail, explainability, bias assessment, residency, human-in-the-loop.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode reads the overlay and returns the same control set directly, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository either. The agent applies this overlay by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Before we design the credit-decision model, read skills/developer/responsible-ai-governance/SKILL.md and tell me which frameworks apply and what the fixed control set requires, the way the overlay describes it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the frameworks and the control set directly in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees this overlay's name and description the same way the other tools do. It gets no command layer either.</p>
<div class="prompt-card">Read skills/developer/responsible-ai-governance/SKILL.md, then classify the credit-decision model's risk tier under the EU AI Act and name every sector rule that also applies before we design it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the classification the same way, reading its context from the skill file rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. This repository ships no command layer for Copilot, so the overlay is applied the way Cursor and Codex apply it — as context an agent follows.</p>
<div class="prompt-card">Before this credit-decision model ships, read skills/developer/responsible-ai-governance/SKILL.md and post a comment naming the frameworks in scope and the fixed control set the component still needs.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot posts the frameworks and the control set as an issue comment; no hook here enforces the checklist directly.</p>
</div>
</div>

A good ask includes:

- Which industry or decision the work touches, so the classification step is not left to guesswork.
- Whether a risk or governance tier is already recorded on the parent requirements document.
- Whether the audit trail and explainability hooks should be designed now or reviewed against an existing system.
- What autonomy threshold triggers a human-in-the-loop checkpoint for this specific decision.

Readers who have not installed the whole skill pack can add this overlay alone:

```bash
./scripts/link-skills.sh --skill responsible-ai-governance
```

This links only responsible-ai-governance into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>We are building a model that scores a loan applicant's creditworthiness for a lending product. Walk through what SR 11-7 and the rest of this overlay require before we design it: the audit trail, explainability, the bias assessment, and the human-in-the-loop checkpoint.</code></pre>

The overlay classifies the work first: a credit decision is a consequential automated decision in a financial-services context, so it is governed, not exempt. It names Microsoft Responsible AI, NIST AI RMF, and ISO/IEC 42001 as always-applicable, classifies the EU AI Act tier as high risk, since the decision affects access to credit, and adds SR 11-7 for model risk management.

The control set it returns, shown here as the shape SKILL.md's own "every regulated component must have" section requires, not a captured run:

<pre><code>Component: credit-decision-model
  Frameworks in scope: NIST AI RMF, ISO/IEC 42001, EU AI Act (high-risk
    tier), SR 11-7
  Audit trail: model-decisions log, fields: who/what/when/model+version/
    inputs/decision
  Explainability: feature-attribution trace, reconstructable per decision
  Bias/impact assessment: disparate-impact test across protected classes,
    recorded before go-live
  Data residency: enforced at the data-platform layer, provable via
    access logs
  Human-in-the-loop: any adverse action routes to a human underwriter,
    autonomy threshold: any application the model declines</code></pre>

This is the shape the doctrine requires, not a captured terminal run, since this overlay ships no runnable script of its own. Every field here is populated rather than left blank, the same discipline `WORK-ITEM-CONTRACT.md`'s own Governance section holds a work item to: populated when the tier is `limited` or `high`, marked "not applicable — tier: none" otherwise, never silently omitted.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A regulated component, controlled correctly</div>
<pre><code><span class="tok-ok">Audit trail:</span> who, what, when, model+version, inputs, decision &mdash; immutable
<span class="tok-ok">Explainability:</span> feature attribution reconstructable after the fact
<span class="tok-ok">Bias/impact assessment:</span> recorded before go-live
<span class="tok-ok">Human-in-the-loop:</span> a declined applicant routes to a human underwriter</code></pre>
<div class="compare-card-note">Every item on the doctrine's list, present before go-live, not added after an examiner asks.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Audit log sampled to save storage</span>  <span class="tok-comment">&larr; never mutable, never sampled away</span>
<span class="tok-warn">Control worked around to unblock the feature</span>  <span class="tok-comment">&larr; stop and surface instead</span></code></pre>
<div class="compare-card-note">From SKILL.md: "Do not implement around a control to make a feature work. If a requirement conflicts with a control, stop and surface the conflict with options."</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if it is unclear whether something is governed?</summary>
<div class="qa-body">

SKILL.md's own default runs toward caution: when unsure whether something is governed, assume it is and ask. Treating an ambiguous case as exempt is the mistake this rule exists to prevent, not a reasonable shortcut under deadline pressure.

</div>
</details>

<details class="qa">
<summary>What happens when a requirement conflicts with a control?</summary>
<div class="qa-body">

It stops. SKILL.md states this without exception: do not implement around a control to make a feature work; a conflicting requirement gets surfaced with options instead, so a person decides which one actually gives way.

</div>
</details>

<details class="qa">
<summary>Are audit and explainability treated like regular application logging?</summary>
<div class="qa-body">

No. SKILL.md is explicit: treat audit and explainability as first-class deliverables with their own tests, not as logging — a distinction that matters because logging can be dropped under storage pressure in a way a tested deliverable cannot.

</div>
</details>

<details class="qa">
<summary>How do these controls actually reach the backlog?</summary>
<div class="qa-body">

Through `slice`'s operability lane, whenever the parent requirements document's governance tier is `limited` or `high`. `OPERABILITY.md` is direct about the standard this has to clear: these items "enter the backlog with their own tests, the same as any other operability item — a governance requirement satisfied only by after-the-fact logging has not actually been satisfied."

</div>
</details>

<details class="qa">
<summary>Does this work outside Claude Code?</summary>
<div class="qa-body">

Yes, and identically across all five tools, since this overlay has no dedicated command anywhere, Claude Code included. Every tool reads the same `SKILL.md` from the shared skill catalog as context and applies the same frameworks and fixed control set.

</div>
</details>

## It's working if

- Every regulated component's audit trail, explainability hook, and human-in-the-loop checkpoint exist before go-live, not reconstructed after an examiner asks.
- A control conflict always stops and surfaces with options, never gets implemented around to unblock a feature.
- A governance item enters the backlog with its own acceptance criteria and tests, the same as any other operability item.
- A work item's governance section is always populated or explicitly marked not applicable, never silently left blank.

If an audit log gets sampled to save storage, the trail has already stopped being what a regulator can actually rely on, even if the dashboard next to it still looks complete.

## Where it fits

**Responsible AI & Regulated Governance is not a phase of the build loop; it is an overlay applied wherever a component actually needs it, from design through operation.**

Its nearest neighbor is `architect`, which classifies AI and consequential-decision applicability at design time and maps the same obligations this overlay names. `safeguard`'s AI and agentic-security work covers the adjacent threat surface a governed component also carries, and `slice`'s operability lane is where the fixed control set actually becomes tracked backlog work.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names governance as the intent that points straight to this overlay.
