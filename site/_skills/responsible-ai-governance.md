---
layout: skill
name: responsible-ai-governance
title: "Responsible AI & Regulated Governance"
description: "Responsible AI & Regulated Governance is the overlay that adds audit trails, explainability, and human checkpoints to work in a regulated industry."
group: developer
invocation: model-invoked
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

Responsible AI & Regulated Governance is an overlay applied on top of the standard stack rules whenever work touches a regulated industry or an AI system that makes or influences a consequential decision. It names the frameworks a component must satisfy &mdash; Microsoft Responsible AI, NIST AI RMF, ISO/IEC 42001, the EU AI Act's risk tiers, and sector rules such as SR 11-7, BCBS 239, NCUA, or OSFI for financial services. Every regulated component then gets a fixed set of controls: an immutable audit trail, explainability hooks, a recorded bias and impact assessment before go-live, enforced data residency, and human-in-the-loop checkpoints above the agreed autonomy threshold. When a requirement conflicts with a control, the conflict is surfaced with options, never implemented around.

## How to call it

Claude reaches for this overlay when a request matches its description. That covers work in a regulated industry, an AI system influencing a consequential decision, or a direct question about audit, explainability, model risk, residency, or a named framework such as NIST AI RMF, ISO 42001, SR 11-7, BCBS 239, or the EU AI Act. A prompt like "This model's output affects a loan decision &mdash; what does SR 11-7 require here" triggers it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A regulated component, controlled correctly</div>
<pre><code><span class="tok-ok">Audit trail:</span> who, what, when, model+version, inputs, decision &mdash; immutable
<span class="tok-ok">Explainability:</span> reasoning and retrieval sources reconstructable after the fact
<span class="tok-ok">Bias/impact assessment:</span> recorded before go-live
<span class="tok-ok">Human-in-the-loop:</span> checkpoint above the autonomy threshold</code></pre>
<div class="compare-card-note">Every item on the doctrine's list, present before go-live, not added after an examiner asks.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Audit log sampled to save storage</span>  <span class="tok-comment">&larr; never mutable, never sampled away</span>
<span class="tok-warn">Control worked around to unblock the feature</span>  <span class="tok-comment">&larr; stop and surface instead</span></code></pre>
<div class="compare-card-note">From `SKILL.md`: "Do not implement around a control to make a feature work. If a requirement conflicts with a control, stop and surface the conflict with options."</div>
</div>
</div>

## In practice

This overlay ships no runnable script of its own; its deliverable is the control set applied to a component. The block below is not a captured run &mdash; it is the shape the doctrine's "Every regulated component must have" section requires, built directly from `SKILL.md`.

<pre><code>Component: <name>
  Frameworks in scope: <NIST AI RMF | ISO/IEC 42001 | EU AI Act risk tier | sector rule>
  Audit trail: <log location>, fields: who/what/when/model+version/inputs/decision
  Explainability: <hook or trace source>
  Bias/impact assessment: <date recorded, before go-live>
  Data residency: <enforced at, infrastructure layer, provable>
  Human-in-the-loop: <checkpoint>, autonomy threshold: <definition></code></pre>

## How it works

1. **Classify the work.** Determine whether it touches a regulated industry or a consequential automated decision; when unsure, assume it is governed and ask. See [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).
2. **Name the frameworks.** Microsoft Responsible AI, NIST AI RMF, ISO/IEC 42001 always apply; classify the EU AI Act risk tier and note the obligations that follow; add sector rules such as SR 11-7, BCBS 239, NCUA, OSFI, or HIPAA-equivalent handling where relevant.
3. **Apply the fixed control set.** Every regulated component gets an audit trail, explainability hooks, a bias and impact assessment before go-live, enforced residency, and human-in-the-loop checkpoints.
4. **Treat conflicts as stops, not workarounds.** A requirement that conflicts with a control is surfaced with options; audit and explainability are first-class deliverables with their own tests, not logging bolted on afterward.
