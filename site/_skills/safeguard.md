---
layout: skill
name: safeguard
title: "Safeguard: Security Assessment and Hardening"
description: "Safeguard runs the security assessment and hardening gate: a threat model, severity-ranked findings, and a remediation backlog before release."
group: developer
invocation: model-invoked
scenario: "Threat-modeling a new partner webhook before the notifications service ships"
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

Safeguard is the model-invoked charter for security assessment and hardening. It replaces a generic security review with a threat model, a severity-ranked findings list, and a remediation backlog, run at the design phase and again wherever a gate calls for safeguard evidence. Its own adapter states the separation the whole charter runs on: "Assessment, remediation, and risk acceptance are distinct responsibilities."

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Map the boundary</span><span class="step-text">Design phase first, per DDDD.md: security boundaries and hardening tradeoffs are surfaced to you, never assumed.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Build the threat model</span><span class="step-text">Assets, actors, abuse cases, and trust boundaries, each with an owner — not a category list generated with no reachable scenario behind it.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Assess and confirm</span><span class="step-text">Combine scanner evidence with contextual confirmation, and prioritize by reachability and real exposure, never by a severity score alone.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Contract the remediation</span><span class="step-text">Each confirmed finding gets an owner, evidence, and a target deadline; a separate pass verifies the fix — the assessor never marks its own work closed.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">State the release recommendation</span><span class="step-text">One of four fixed states — no blocking findings, block, exception required, or insufficient evidence — never a looser summary in its place.</span></div>
</div>

<ul class="benefits">
  <li>A vulnerability shows up as a ranked finding on a backlog, not as an incident report after it has already caused damage.</li>
  <li>Nobody, including safeguard's own assessor, approves their own remediation — a separate verification pass closes every confirmed fix.</li>
  <li>A critical or high finding blocks the release recommendation before merge, rather than getting patched quietly and left unreviewed.</li>
  <li>The release recommendation is always one of four fixed states, so a blocking finding cannot hide inside a vague summary.</li>
</ul>

Its closure rule is just as fixed: "After remediation, invoke independent `security-verify` with original evidence, contract, diff, tests, rebuilt artifact/provenance, and deployment evidence available. Originating assessor does not mark verified."

- [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/DDDD.md) covers Discover and Define — why a security boundary is surfaced to you, not assumed from the code around it.
- [`security.md`](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/security.md) covers the threat model, the confirmation pipeline, and the fixed remediation statuses the adapter tracks.
- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md) covers Gate 1 and Gate 2 evidence and where safeguard's independent Gate 3 disposition fits.
- [`responsible-ai-governance`](https://github.com/tqnonline/skills/blob/main/skills/developer/responsible-ai-governance/SKILL.md) covers the frameworks layered on top when the boundary sits in a regulated industry or a consequential automated decision.

Safeguard reads each one only when the moment calls for it: mapping the boundary reads DDDD.md, running the threat model reads the adapter, clearing a gate reads METHOD.md, a regulated boundary reads the overlay.

## When to reach for it

Nothing types `/safeguard` in Claude Code. Safeguard is model-invoked, reached three ways. An SDLC gate — one of the sign-off points in the sdlc skill's own design-build-secure-release loop — calling for safeguard evidence reaches it. A work item's pod charter, the roster of roles a work item's charter names as responsible for it, reaches it by naming the safeguard role. And a request whose wording matches the skill's own description reaches it directly.

You reach for safeguard in three moments. A new trust boundary is about to open — a public endpoint, a partner integration, a new input surface — and nothing has threat-modeled it yet. A finding surfaced somewhere else needs a severity rank and an owner before it can move to a backlog. A release is close, and the gate needs a recorded security disposition before it can clear.

Safeguard is not the only skill that touches security or release. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the cross-cutting technical design the threat model sits inside | [`architect`]({{ '/architect/' | relative_url }}) |
| You need the release-readiness checklist, not a threat model | [`deliver`]({{ '/deliver/' | relative_url }}) |
| You need the whole gated loop, not an isolated security pass | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| Your work touches a regulated industry or a consequential automated decision | [`responsible-ai-governance`]({{ '/responsible-ai-governance/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Safeguard has no slash command of its own. Claude reaches for it when the sdlc skill's secure-DevOps gate calls for safeguard evidence, or when a request's wording matches the skill's own description — a security assessment, a hardening pass, evidence for a secure-DevOps gate — directly in chat.</p>
<div class="prompt-card">We are adding a partner webhook to the notifications service so partners can push delivery-status updates back to us. Run a security assessment before we merge it: threat-model the endpoint, rank the findings by severity, and stop before fixing anything critical so I can see it first.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Safeguard returns the threat model summary and the ranked findings, and stops before touching a critical finding until you have seen it.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>/security</code> command from <code>adapters/opencode/commands/security.md</code>, bound to the security agent. It applies the same charter: clarify the security scope, build a candidate threat and control model, run the adversarial challenge, and stay passive unless active testing is explicitly authorized.</p>
<div class="prompt-card">/security Threat-model the new partner webhook on the notifications service before we ship it. Stay passive, no active testing — this is a design-time review. Rank findings by severity and flag anything critical for me before any fix is orchestrated.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command returns the threat model and the ranked findings; a critical one waits for a separate verification pass before its status can advance.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies safeguard's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Before we merge the new partner webhook, threat-model it the way skills/developer/safeguard/SKILL.md and DDDD.md describe. Rank findings by severity and tell me plainly if anything is critical, rather than quietly patching it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the threat model and the findings list directly in its reply, since there is no command output to parse.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees safeguard's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files.</p>
<div class="prompt-card">Read skills/developer/safeguard/SKILL.md and DDDD.md, then threat-model the partner webhook on the notifications service. Rank findings by severity and escalate rather than patch anything you find critical.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the assessment the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. This repository ships no command layer for Copilot, so safeguard's charter is applied the way Cursor and Codex apply it — as context an agent follows, not a command it runs.</p>
<div class="prompt-card">Before this pull request merges, read skills/developer/safeguard/SKILL.md, threat-model the new partner webhook, rank findings by severity, and post a critical finding as its own comment instead of fixing it silently.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot posts the findings as pull-request comments; a person still owns the fix decision on a critical finding, since no hook here can enforce it directly.</p>
</div>
</div>

A good ask includes:

- Where the boundary sits — which endpoint, which trust boundary, which data crosses it.
- Whether the assessment may run active tests, or must stay passive and design-time only.
- What should happen to a critical finding — stop and escalate, or a remediation backlog item.
- Whether the work touches a regulated industry, so the governance overlay's audit and explainability requirements apply from the start.

Readers who have not installed the whole skill pack can add safeguard alone:

```bash
./scripts/link-skills.sh --skill safeguard
```

This links only safeguard into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>We are adding a partner webhook to the notifications service so partners can push delivery-status updates back to us. Run a security assessment before we merge it: threat-model the endpoint, rank the findings by severity, and stop before fixing anything critical so I can see it first.</code></pre>

Safeguard maps the boundary first: the webhook is public-facing, authenticated by a per-request signature the partner and the notifications service both hold. It stays passive, since no active testing was authorized, and threat-models the boundary against that one entry point rather than the whole service.

The assessment it returns, shown here as the document the agent produces, not as executed output:

<pre><code>Threat model summary
  - Boundary: partner-webhook ingress, owner: notifications-api team
  - Assets in scope: partner delivery-status payloads, the request-signing secret

Findings (severity-ranked)
  - SG1 [high]: no replay window on the request signature, evidence: a
    signed payload from 24 hours ago is still accepted
  - SG2 [medium]: a malformed-signature response leaks the expected
    header name, evidence: the 400 response body

Remediation
  - SG1: backlog item #491, status: CONFIRMED, target: before ship
  - SG2: fix applied in PR #493, status: VERIFIED PREDEPLOY</code></pre>

This is the shape the skill's own output contract requires — a threat model summary, findings ranked by severity, and a remediation backlog or fixes per policy — not a captured terminal run, since safeguard ships no runnable script of its own. SG1 stays a high, unresolved finding, so the assessment's own release recommendation reads `BLOCK`, exactly as its adapter's fixed vocabulary requires — never a quiet pass with an open high-severity finding still on the ledger.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A safeguard run that earns the gate</div>
<pre><code><span class="tok-ok">Scope:</span> webhook ingress confirmed with you before design
<span class="tok-ok">Threat model:</span> documented, each boundary has an owner
<span class="tok-ok">Findings:</span> SG1 high, SG2 medium &mdash; each ranked by severity
<span class="tok-ok">Release recommendation:</span> BLOCK while SG1 stays open</code></pre>
<div class="compare-card-note">The scope was confirmed, not assumed, and an open high finding blocks release rather than being approved as it stands.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Scope: <span class="tok-warn">assumed, never confirmed with you</span>  <span class="tok-comment">&larr; stop condition, not a guess</span>
SG1: <span class="tok-warn">jumps straight to DEPLOYED</span>  <span class="tok-comment">&larr; skips the predeploy verification step</span></code></pre>
<div class="compare-card-note">Missing scope is a stop, not an assumption to fill in. The adapter's own status order forbids jumping from a source fix straight to a deployment or postdeployment claim.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What if the security boundary is not scoped yet?</summary>
<div class="qa-body">

SKILL.md's stop condition is direct: missing scope or a SPEC-TS ledger — the scope, requirements, and success-metrics record — means stop, before the threat model starts. A boundary guessed from the surrounding code is the exact shortcut this stop condition exists to prevent.

</div>
</details>

<details class="qa">
<summary>Can safeguard run active exploit tests?</summary>
<div class="qa-body">

Only with explicit authorization. Its adapter fails closed on active techniques: without authorization covering the target, owner, environment, technique, and stop conditions, it performs a passive static review only, and never infers authorization from repository access or broad task wording alone.

</div>
</details>

<details class="qa">
<summary>Who confirms a fix actually closed the finding?</summary>
<div class="qa-body">

A separate, independent verification pass — never the assessor who found it. The adapter states this plainly: the originating assessor does not mark a finding verified, so closure always carries a second reviewer.

</div>
</details>

<details class="qa">
<summary>Can a finding just be marked a false positive to move past it?</summary>
<div class="qa-body">

Only with evidence. A false-positive status requires reproducible non-applicability evidence, the affected artifact's digest, and an independent reviewer's identity — a status choice, not an escape hatch from an inconvenient finding.

</div>
</details>

<details class="qa">
<summary>Does this work outside Claude Code?</summary>
<div class="qa-body">

Yes, with the same charter applied differently. OpenCode reaches it through an installed `/security` command bound to the security agent; Cursor, Codex, and GitHub Copilot read the same skill catalog as context and apply the procedure without a command layer of their own.

</div>
</details>

## It's working if

- Every security boundary that reaches release was confirmed with you, not assumed from the code sitting around it.
- A finding always carries a severity rank and a named owner, never a vague sense that something looks risky.
- A critical or high finding blocks the release recommendation until an independent pass verifies the fix, not just a source review.
- The four release states — no blocking findings, block, exception required, insufficient evidence — appear on the record, not only in a chat reply.

If a finding's status jumps straight to deployed with no verified-predeploy step in between, the discipline has failed while the finding still reads fixed.

## Where it fits

**Safeguard is the security lane inside the gated build loop, and the skill a pod charter names whenever a work item needs a threat model or a hardening pass.**

Its nearest neighbor is `architect`: the two run alongside each other at the design phase, safeguard threat-modeling the same boundary architect just drew. `deliver`'s release-readiness checklist is where a lingering safeguard finding still has to be accounted for before a stack ships, and `responsible-ai-governance` layers its own audit and explainability controls on top wherever the boundary sits in a regulated industry.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names security as the intent that points straight to safeguard.
