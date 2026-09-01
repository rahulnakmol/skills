---
layout: skill
name: grit
title: "Grit: Acceptance Gates for Finished Work"
description: "Grit is the user-invoked skill that turns acceptance criteria into runnable gates, checked and audited before agent work is ever called done."
group: core
invocation: user-invoked
lens:
  novice:
    who: 'You have shipped with an agent and heard "done" that was not. Grit is the discipline that makes finished mean finished: you write down what done looks like before the work starts, and a script checks it.'
    value: 'You stop re-opening completed work. The ledger says exactly what is proven and what is not, so green finally means something.'
  practitioner:
    who: 'You use agents for big changes every day, and you are responsible for the code that ships.'
    value: 'You choose how deep the checking goes — five to ten levels for work that really matters. The results ride along on the pull request, and unfinished items keep the agent from stopping, so nothing depends on memory.'
  leader:
    who: 'You own a team’s delivery, and the trust between its people and its agents.'
    value: 'Completion claims arrive as met, unmet, and abandoned counts with evidence attached. "Is it actually done" stops being a meeting.'
  csuite:
    who: 'You are accountable for what AI-built software does in production.'
    value: 'Every important change carries a checklist a person approved and a recorded result — proof a regulator, a board, or an incident review can look at later.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 4
journey_steps: 5
journey_prev: sdlc
journey_next: shakedown
---

## What it does

Grit is the discipline that keeps finished work from being called done before it is. Before implementation starts, every acceptance criterion becomes a gate: an observable outcome, paired where possible with a command that can check it and a pattern its output must match. Implementation then proceeds through four passes — complete, harden, hunt for defects, and polish. A checker script runs each gate afterward and records exactly what it measured. Work is not called done while any gate is unmet. Every gate ends accounted for as met, unmet, or abandoned, and an abandoned gate carries a reason and a human sign-off.

## How to call it

In Claude Code, type `/grit`. In OpenCode, run the `/grit-verify` command: it parses the ledger, reports the met, unmet, and abandoned counts, and keeps the verify agent from returning a handoff-ready verdict while any gate is unmet. The checker behind both, `gate-check.mjs`, is plain Node, so it also runs directly from a terminal on any platform.

<pre><code><span class="tok-comment">$</span> node skills/core/grit/scripts/gate-check.mjs --status GATES.md <span class="tok-comment"># read the checklist, run nothing</span>
<span class="tok-comment">$</span> node skills/core/grit/scripts/gate-check.mjs --approve GATES.md <span class="tok-comment"># a human reads each command once</span>
<span class="tok-comment">$</span> node skills/core/grit/scripts/gate-check.mjs --reverify GATES.md <span class="tok-comment"># re-check work that comes back</span></code></pre>

Readers who do not have the skill pack installed yet can add it first. The second line installs the tool adapters, including the OpenCode command above:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good run ends like this</div>
<pre><code><span class="tok-ok">- [x] G1:</span> prints its first fixed token
  <span class="tok-ok">EVIDENCE: exit=0; EXPECT=matched</span>
<span class="tok-ok">- [x] G2:</span> prints its second fixed token
  <span class="tok-ok">EVIDENCE: exit=0; EXPECT=matched</span>
<span class="tok-ok">AUDIT: met 2 &middot; unmet 0 &middot; abandoned 0</span></code></pre>
<div class="compare-card-note">Every gate met, with the proof recorded. Only now can the work be called done.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">- [x] G2:</span> prints its second fixed token
  CHECK: node -e "console.log('OK_TOKEN_TWO')"
  <span class="tok-warn">EXPECT: (any output)</span>  <span class="tok-comment">&larr; softened to force a pass</span>
<span class="tok-comment">The check now proves nothing.</span></code></pre>
<div class="compare-card-note">Never soften the EXPECT. An unmet gate is reported, not repainted.</div>
</div>
</div>

## In practice

The fixture below, `test/fixtures/grit/unmet/GATES.md`, ships in the repository. It is reproduced here in full, byte for byte.

<pre><code># Gates: unmet fixture

Scope: A deterministic fixture with one met gate and one unmet gate, used to exercise gate-check --status and the stop hook against a blocking ledger.

<span class="tok-ok">- [x] G1:</span> prints its first fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_ONE')"
  EXPECT: OK_TOKEN_ONE
  <span class="tok-ok">EVIDENCE: exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=6bf5c2e1a9d0b3f47c8e1d2a5f60934bcb1e2a3d4f5061728394a5b6c7d8e9f; output-bytes=13</span>

<span class="tok-warn">- [ ] G2:</span> prints its second fixed token when run
  CHECK: node -e "console.log('OK_TOKEN_TWO')"
  EXPECT: OK_TOKEN_TWO
  <span class="tok-warn">EVIDENCE: pending</span></code></pre>

Running the status check against it, with no CHECK command executed:

<pre><code><span class="tok-comment">$ node skills/core/grit/scripts/gate-check.mjs --status test/fixtures/grit/unmet/GATES.md</span>
  UNMET GATES:G2 (unchecked): prints its second fixed token when run
GATES.md: 2 gates
<span class="tok-warn">UNMET: 1 (met: 1)</span>
  GATES:G2</code></pre>

The command exits with status 1, the code `gate-check.mjs` reserves for an unmet gate. This is the actual, current output of that exact command against that exact file; `test/scripts/grit-gate-check.test.mjs` re-runs the same fixture on every test pass.

## How it works

1. **Checklist first.** One check for each thing the work must do, written before the work starts. See [`LEDGER.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/LEDGER.md).
2. **Depth.** Small work gets a short list; big work gets five to ten levels. A person picks the depth, or accepts the recommendation. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/METHOD.md).
3. **Four passes.** Complete, harden, hunt defects, polish — until a full pass finds nothing new. See [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/METHOD.md).
4. **The checker.** Status, dry run, approve, reverify. A human reads each command once before it can ever run. See [`HOOKS.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/HOOKS.md).
5. **The audit.** Met, unmet, abandoned — with proof. A check is never watered down just to pass. See [`AUDIT.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/AUDIT.md).

Enforcement of the ledger at the moment an agent tries to stop is opt-in per tool, documented tool by tool in [`HOOKS.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/HOOKS.md).
