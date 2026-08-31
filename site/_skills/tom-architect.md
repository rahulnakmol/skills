---
layout: skill
name: tom-architect
title: "TOM Architect — Designing a Target Operating Model"
description: "TOM Architect decomposes business operations into L1-L4 processes, assesses maturity, designs organization and RACI, and maps capabilities to a platform stack."
group: pm
invocation: user-invoked
lens:
  novice:
    who: "You've been asked to 'build the TOM,' and you don't know whether that means an executive slide or a task-level breakdown of every process in the business."
    value: "TOM Architect makes depth a scope decision up front — L1-L2 for an overview, L1-L4 for a detailed design — so you agree the level before you start decomposing."
  practitioner:
    who: "You run transformation initiatives where a TOM is mandatory, and you're tired of platform conversations happening before anyone has established a maturity baseline."
    value: "Platform mapping is fixed as a Phase 5 activity that follows process decomposition and maturity assessment, never precedes them, so the stack conversation happens on top of real current-state evidence."
  leader:
    who: "Your transformation programs keep producing TOMs that read well but whose organization design doesn't actually match the maturity gaps discovery found."
    value: "The AI-augmentation classification for each L2 process shapes organization design, KPI cadence, and platform mapping together from the first design pass, not layered on afterward."
  csuite:
    who: "You're funding a transformation and need to know the target state was designed against evidence, not a template pulled from the last engagement."
    value: "A target state defined without first establishing the current-state maturity baseline produces an unrealistic target — TOM Architect will not let target design start before that baseline exists."
---

## What it does

TOM Architect translates a business transformation into a structured Target Operating Model: process decomposition across up to four levels, from the L1 value chain to L4 task-level activities, a five-point maturity assessment per process, organization design with RACI, and platform capability mapping to whichever enterprise stack the initiative selected. It runs Discover, Scope, Analyze, Design, Map, Visualize, Deliver in that order, and platform mapping never precedes process decomposition and maturity assessment. Every scoped L2 process is also classified into one of five AI-augmentation categories — Autonomous, Human-in-the-Loop, Copilot Assist, RPA, or Human Only — because that classification shapes organization design, KPI cadence, and platform mapping all at once, from the first design pass.

## How to call it

In Claude Code, type `/tom-architect`. Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">Baseline before platform</div>
<pre><code>Phase 3: <span class="tok-ok">Order-to-cash L2 maturity assessed —</span>
<span class="tok-ok">2-Developing (partial)</span>
Phase 5: Platform mapped against that gap —
D365 F&amp;O closes the automation gap
in reconciliation.</code></pre>
<div class="compare-card-note">Platform mapping follows process decomposition and maturity assessment; it never precedes them.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Phase 1: "let's go with D365" — platform</span>
<span class="tok-warn">selected before any process is decomposed.</span>
Maturity baseline: not yet assessed.</code></pre>
<div class="compare-card-note">A target state defined without a current-state baseline produces an unrealistic target.</div>
</div>
</div>

## In practice

TOM Architect has no fixture to replay, so this is the shape its own output contract requires, filled in for an illustrative domain rather than a captured run:

<pre><code><span class="tok-comment"># specs/tom/order-to-cash-tom-design.md (excerpt)</span>
L2 process: Order reconciliation
  Owner: AR team lead
  Maturity: 2-Developing (partial)
  RACI: Responsible — AR analyst;
        Accountable — Finance lead;
        Consulted — Platform engineering
  AI overlay: Human-in-the-Loop (AI matches,
    a human approves exceptions)
  KPI cadence: process (daily exception count),
    operational (monthly close cycle time)
  Platform: D365 Finance &amp; Operations —
    automated matching module</code></pre>

## How it works

1. **Discover the driver.** Gather the transformation driver, industry, current state, and target platform stack. See [`DDDD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/DDDD.md).
2. **Scope the depth.** Select applicable TOM layers, domains, and depth — L1-L2 or L1-L4 — before analysis begins. See [`TOM-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/tom-architect/TOM-METHOD.md).
3. **Decompose and assess maturity.** Place every scoped process on the five-point scale, commissioning research where the current-state landscape is thin. See [`TOM-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/tom-architect/TOM-METHOD.md) and [`RESEARCH-AGENTS.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/RESEARCH-AGENTS.md).
4. **Design the organization layer.** RACI at each process step, service delivery model, KPI framework at three cadences, and governance.
5. **Map platform capability last.** The AI augmentation overlay and platform mapping follow decomposition and maturity assessment, never precede them. See [`TOM-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/tom-architect/TOM-METHOD.md).
