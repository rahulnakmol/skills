---
layout: skill
name: safeguard
title: "Safeguard: Security Assessment and Hardening"
description: "Safeguard runs the security assessment and hardening gate: a threat model, severity-ranked findings, and a remediation backlog before release."
group: developer
invocation: model-invoked
lens:
  novice:
    who: 'You have shipped a feature and only learned about its security gaps after an incident.'
    value: 'Safeguard runs the threat model and the hardening pass before release, so the gap shows up as a finding on a backlog, not as an incident report.'
  practitioner:
    who: 'You own the secure DevOps gate for a change and need a threat model that holds up under review.'
    value: 'You get a severity-ranked findings list and a remediation backlog, tied to the same SPEC-TS gates the rest of delivery follows, instead of a separate ad-hoc review.'
  leader:
    who: 'You are responsible for the security posture of everything your team ships.'
    value: 'Every gate that needs safeguard evidence produces a threat model summary and a ranked findings list, and a critical finding is escalated before merge rather than after.'
  csuite:
    who: 'You answer for a breach that traces back to a change your organization shipped.'
    value: 'Safeguard replaces an ad-hoc security review with a recorded threat model and remediation backlog at the gate where the change was still reversible.'
---

## What it does

Safeguard is the security assessment and hardening gate that replaces a generic security review. At the design phase, it maps security boundaries and hardening tradeoffs and surfaces them to the user rather than assuming them. It runs again wherever an SDLC gate or a work item's pod charter calls for safeguard evidence. The output is a threat model summary, findings ranked by severity, and either a remediation backlog or the fixes themselves, depending on policy.

## How to call it

Claude reaches for safeguard when a request matches its description: a security assessment, a hardening pass, or evidence for a secure-DevOps gate. A prompt like "Run a security assessment on this change before we merge it" triggers it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A safeguard run that earns the gate</div>
<pre><code><span class="tok-ok">Scope:</span> security boundaries confirmed with the user before design
<span class="tok-ok">Threat model:</span> documented, each boundary has an owner
<span class="tok-ok">Findings:</span> 2 high, 1 medium &mdash; each ranked by severity
<span class="tok-ok">Critical finding:</span> escalated per the verifier path</code></pre>
<div class="compare-card-note">The scope was confirmed, not assumed, and the critical finding went to escalation, not a quiet patch.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Scope: <span class="tok-warn">assumed, never confirmed with the user</span>  <span class="tok-comment">&larr; stop condition, not a guess</span>
Critical finding: <span class="tok-warn">patched quietly, no escalation</span>  <span class="tok-comment">&larr; violates the escalation rule</span></code></pre>
<div class="compare-card-note">Missing scope is a stop, not an assumption to fill in. A critical finding always escalates through the adapter's `-max` or verifier path.</div>
</div>
</div>

## In practice

Safeguard ships no runnable script of its own; the deliverable is the assessment itself. The block below is not a captured run &mdash; it is the shape `SKILL.md`'s output contract requires: "Threat model summary, findings severity, remediation backlog or fixes per policy."

<pre><code>Threat model summary
  - Boundary: <trust boundary>, owner: <role>
  - Assets in scope: <list>

Findings (severity-ranked)
  - <id> [critical|high|medium|low]: <finding>, evidence: <reference>

Remediation
  - <finding id>: backlog item <link>  |  fix applied in <commit/PR></code></pre>

## How it works

1. **Design phase first.** Map security boundaries and hardening tradeoffs and surface them to the user rather than assuming them. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md).
2. **Load the adapter.** The security specialist charter that runs the threat model and control design. See [`security.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/security.md).
3. **Follow the gates.** SPEC-TS and the human gates that govern the secure-DevOps phase. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).
4. **Regulated context.** Apply the governance overlay when the work touches a regulated industry or a consequential automated decision. See [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md).
