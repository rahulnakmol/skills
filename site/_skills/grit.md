---
layout: skill
name: grit
title: "Grit: Acceptance Gates for Finished Work"
description: "Grit is the user-invoked skill that turns acceptance criteria into runnable gates, checked and audited before agent work is ever called done."
group: core
invocation: user-invoked
scenario: "Migrating checkout to a new payment provider"
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

Grit keeps a team from calling work done before it actually is.

Grit is a discipline you run, backed by one checker script, `gate-check.mjs`, that reads a ledger — the file recording what "done" was supposed to mean — and reports exactly what it measured. Grit does not write the implementation, and it does not review a pull request after the fact. It decides what "done" will mean before work starts, then proves afterward whether the finished work actually met that bar. Every acceptance criterion becomes a gate: one ledger row pairing an observable outcome with, where a command can decide it, a CHECK and the EXPECT pattern its output must match.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Write the checklist first</span><span class="step-text">Before implementation starts, each acceptance criterion becomes one gate in the ledger.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Fix the depth</span><span class="step-text">A person states how finely done is decomposed into gates, or accepts a recommendation built from five signals.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Run the four passes</span><span class="step-text">Complete, harden, hunt, and polish — implementation proceeds between the gates until a full pass finds nothing new.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Run the checker</span><span class="step-text">A human reads and approves each CHECK once; the checker then runs it and records real evidence.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Close with the audit</span><span class="step-text">Every gate ends met, unmet, or abandoned with a reason. Nothing is called done while a gate is unmet.</span></div>
</div>

<ul class="benefits">
  <li>You stop re-opening work that was already reported finished, because the ledger states exactly what was proven.</li>
  <li>A completion claim carries evidence — a met, unmet, and abandoned count with a real evidence line per gate — instead of resting on a person's word.</li>
  <li>Work with an unmet gate cannot be reported done: the checker's own exit code, and the stop hook where it is installed, enforce that directly.</li>
  <li>A dropped requirement stays visible with a reason and a sign-off, so it becomes a decision on record rather than one nobody remembers making.</li>
</ul>

AUDIT.md states the one prohibited repair in a single line: "A ledger that can be made to pass by editing its own success criterion is not a verification tool; it is a form that always says yes." The same document treats an honestly abandoned gate differently: "the discipline is not that every gate must be met, it is that no gate disappears without a trace."

- [`LEDGER.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/LEDGER.md) covers how a gate is written and tagged with one of five dimensions: completeness, accuracy, business value met, efficiency, thoroughness.
- [`METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/METHOD.md) covers how depth is chosen from a five-signal rubric and how the four passes proceed.
- [`AUDIT.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/AUDIT.md) covers how the closing count is taken and how a gate is abandoned honestly.
- [`HOOKS.md`](https://github.com/tqnonline/skills/blob/main/skills/core/grit/HOOKS.md) covers how each of the five tools enforces the ledger, and where enforcement falls back to continuous integration.

Grit reads each one only when the moment calls for it: writing a gate reads LEDGER.md, choosing a depth reads METHOD.md, closing out reads AUDIT.md, wiring a tool reads HOOKS.md.

## When to reach for it

Type `/grit` in Claude Code, or name the skill directly in a session. Grit is user-invoked, so nothing reaches for it on its own: a person decides that a piece of work needs a completion contract.

You reach for grit in three moments. You are about to start work substantial enough that you cannot afford to leave what counts as finished unstated. Someone reports the work done, and you need that claim proven rather than taken on faith. A review keeps re-opening the same finished work, because nobody wrote down in advance what finished was supposed to look like.

Grit is not the only skill that touches completion. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the whole gated delivery loop, design through release, not only what counts as done inside it | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You need an isolated, pre-merge review of a pull request that already claims done | [`shakedown`]({{ '/shakedown/' | relative_url }}) |
| You need the work cut into stories with acceptance criteria before any ledger can exist | [`slice`]({{ '/slice/' | relative_url }}) |
| You need to decide whether the work runs as a loop (one writer, one verifier) or a graph (independent workstreams, each with its own gates) before deciding how deep to verify it | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Grit is user-invoked: type <code>/grit</code>, or name it directly in a session — nothing routes to it automatically. Installing <code>./scripts/install-adapters.sh --tool claude-hooks</code> separately adds a Stop hook that can block the session from ending while the ledger still has an unmet gate. It is opt-in and never part of the default install, but it is the deepest completion enforcement among the five tools, because it can stop a session directly instead of only flagging the problem afterward.</p>
<div class="prompt-card">We are migrating checkout off our current payment provider onto the new one. Write the acceptance-gate ledger before any implementation starts. This crosses the payment API, the ledger service, and the reconciliation job, and a bad refund cannot be undone by rerunning the work, so recommend a depth from the rubric and name the signals behind it. I will read and approve each CHECK command myself before anything runs.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Grit returns the ledger file, the recommended depth with its signals named, and stops before running any CHECK until you approve it.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>grit-verify</code> command from <code>adapters/opencode/commands/grit-verify.md</code>. It parses a ledger path from its arguments, defaulting to <code>GATES.md</code>, runs <code>gate-check.mjs --status</code>, and reports the met, unmet, and abandoned counts. The verify agent carries its own rule refusing a handoff-ready verdict while any gate is unmet.</p>
<div class="prompt-card">/grit-verify Check .grit/checkout-migration/GATES.md before you hand this off. Report every gate's id and evidence line, and tell me plainly if anything is still unmet — I do not want a handoff-ready verdict while any gate is open.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command reports each gate's id and evidence line; the verify agent will not hand off a done verdict while one is unmet.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skills land in <code>.agents/skills/</code>, and the agent applies grit's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>. Enforcement is a rule in <code>.cursor/rules/</code>, backed by the <code>grit-gates.yml</code> continuous-integration check rather than a hook that can stop a session directly. That workflow ships dispatch-only: it starts running on pull requests once a maintainer wires it to them.</p>
<div class="prompt-card">Before you touch the payment integration, write the grit ledger the way skills/core/grit/SKILL.md and LEDGER.md describe: one gate per acceptance criterion, a CHECK and an EXPECT wherever a command can decide it, a manual gate with recorded evidence where none can. Recommend a depth from METHOD.md's rubric and name the signals behind it.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor writes the ledger file directly in its reply, since there is no command output to parse, and states the depth and its signals in the same message.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus a generated companion file, <code>agents/openai.yaml</code>, so it sees grit's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files, and enforcement falls back to the same <code>grit-gates.yml</code> backstop.</p>
<div class="prompt-card">Read skills/core/grit/SKILL.md and METHOD.md, then write the acceptance-gate ledger for the payment-provider migration before writing any implementation code. State the recommended depth and the signals behind it, and do not report this done while a gate stays unmet.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the ledger the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog, driven by <code>.github/copilot-instructions.md</code>. This repository ships no hook that could intercept a Copilot session at completion, so enforcement relies on a standing instruction in that file, plus the <code>grit-gates.yml</code> continuous-integration check, which lints the ledger and fails independently of what the agent reports.</p>
<div class="prompt-card">You have finished the payment-provider work on this branch. Before you report it done, read GATES.md, or .grit/checkout-migration/GATES.md if that is where the ledger for this scope lives. Run each gate's CHECK and compare its output against EXPECT. Report the met, unmet, and abandoned counts, and treat any unmet gate as meaning the task is not complete.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot reports the counts in chat; because it has no hook runtime, the <code>grit-gates.yml</code> check is the only mechanism left, and it blocks a merge only once a maintainer has wired it to pull requests.</p>
</div>
</div>

A good ask includes:

- Where the acceptance criteria live — a product requirements document, a work item, or criteria pasted directly into the prompt.
- Your depth preference stated outright, or a request for grit's recommendation with the signals it used named.
- What evidence you will accept for a criterion no command can decide — a screenshot, a manual observation, a named sign-off.
- The paths this scope may write, given as patterns relative to the repository root, when it is one leaf — one workstream with its own ledger — inside a larger graph.

Readers who have not installed the whole skill pack can add grit alone:

```bash
./scripts/link-skills.sh --skill grit
```

This links only grit into the default buckets, without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and enforces it.

## A working example

You type:

<pre><code>We are migrating checkout off our current payment provider onto the new one. Write the acceptance-gate ledger before any implementation starts. This crosses the payment API, the ledger service, and the reconciliation job, and a bad refund cannot be undone by rerunning the work, so recommend a depth from the rubric and name the signals behind it. I will read and approve each CHECK command myself before anything runs.</code></pre>

Grit responds by writing the ledger before touching any code. Depth follows METHOD.md's own worked example for exactly this kind of change. The rubric starts at a base of 5. It adds one signal for the irreversible write, since a refund is a new transaction, not an undo. It adds one for the integration surface, since the payment API, the ledger service, and the reconciliation job each sit on a different contract. It adds one for novelty, since no prior provider swap exists in this codebase to copy a gate set from, and one more for the governance tier, which the work item's contract already names as high. That is four signals on a base of 5, so grit records depth 9, rubric-recommended, with those four signals named — the scope-breadth signal is absent, and its absence is recorded too, exactly as METHOD.md requires.

The ledger it writes, shown here as the document the agent produces, not as executed output:

<pre><code># Gates: checkout-payment-migration

OWNS: packages/checkout/payments/**

Scope: Move checkout onto the new payment provider without breaking refunds, ledger entries, or the reconciliation job.

- [ ] G1: a test-card checkout completes end to end on the new provider
  CHECK: node scripts/verify-checkout.mjs
  EXPECT: checkout verification passed
  EVIDENCE: pending

- [ ] G2: a refund posts back to the ledger exactly once per webhook delivery
  CHECK: node scripts/verify-refund-once.mjs
  EXPECT: refund verification passed
  EVIDENCE: pending

- [ ] G3: the reconciliation job's totals match the provider's settlement report
  CHECK: node scripts/verify-reconciliation.mjs
  EXPECT: reconciliation verification passed
  EVIDENCE: pending

- [ ] G4: the checkout-completion rate on staging meets the PRD's target
  EVIDENCE: pending

  (five further gates follow, one per remaining dimension-and-signal
  pairing, to reach the recorded depth of 9)</code></pre>

G1 through G3 are runnable gates: each pairs a CHECK with an EXPECT. G4 is a manual gate — no command can decide whether a completion rate met a business target, so it stays a recorded observation instead of a weakened runnable check. The OWNS line bounds what this work may write, and it stays inside the one payments module, which is why the scope-breadth signal was recorded as absent even though the change crosses three contracts.

Before anything executes, you read each CHECK once and approve it:

<pre><code><span class="tok-comment">$</span> node skills/core/grit/scripts/gate-check.mjs --approve GATES.md <span class="tok-comment"># a human reads each command once</span></code></pre>

Between the gates, implementation runs the four passes from METHOD.md: complete the deliverable fully, harden it to production quality, hunt for defects across correctness, integration, portability, and performance, then polish until a full sweep across all four categories turns up nothing new.

The checker itself is real, even though none of this scenario's own checks are wired into this repository. This repository ships a fixture built for exactly this purpose, `test/fixtures/grit/unmet/GATES.md`, reproduced here in full, byte for byte:

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

Here is the exact shape `gate-check.mjs` produces, run moments ago against that fixture:

<pre><code><span class="tok-comment">$ node skills/core/grit/scripts/gate-check.mjs --status test/fixtures/grit/unmet/GATES.md</span>
  UNMET GATES:G2 (unchecked): prints its second fixed token when run
GATES.md: 2 gates
<span class="tok-warn">UNMET: 1 (met: 1)</span>
  GATES:G2</code></pre>

The command exits with status 1, the code `gate-check.mjs` reserves for an unmet gate. `test/scripts/grit-gate-check.test.mjs` re-runs this exact command against this exact fixture on every test pass, and `test/site/site-examples.test.mjs` checks that every line above still appears in both that run's output and this page. So this is not a one-time capture; it is what the repository's own tests continue to assert. If the checkout migration's G1 through G3 came back the same way, the unmet one would block the same path: the agent could not report the work done, and where the Claude Code stop hook is installed, the session could not end either.

## What good looks like

The same discipline governs the checkout migration's ledger once every gate closes.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good run ends like this</div>
<pre><code>AUDIT.md's own worked example is a checkout-flow ledger close to this
one. Once its one unmet gate, G6, was fixed, and G7 was abandoned with
a recorded reason, its audit block read exactly like this. A ticked
checkbox means met, so an abandoned gate never carries one:

<span class="tok-ok">G1 &middot; completeness</span> &mdash; met
  <span class="tok-ok">EVIDENCE: exit=0; shell=/bin/sh; cwd=/repo/packages/checkout; EXPECT=matched; output-sha256=6bf5c2e1...; output-bytes=9</span>
<span class="tok-ok">G7 &middot; completeness</span> &mdash; abandoned
  <span class="tok-ok">EVIDENCE: criterion required a refund-webhook replay the payment</span>
  <span class="tok-ok">vendor's sandbox does not support; signed off by R. Nakmol, 2026-08-28</span>
<span class="tok-ok">AUDIT: met 6 &middot; unmet 0 &middot; abandoned 1</span></code></pre>
<div class="compare-card-note">Every gate is met or honestly abandoned, with the proof recorded. Only now can the work be called done.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>The temptation is the same whether the gate is a fixture's test token
or checkout's G6. Softening either erases what the check ever proved:

<span class="tok-warn">- [x] G2:</span> prints its second fixed token
  CHECK: node -e "console.log('OK_TOKEN_TWO')"
  <span class="tok-warn">EXPECT: (any output)</span>  <span class="tok-comment">&larr; softened to force a pass</span>
<span class="tok-comment">The check now proves nothing.</span></code></pre>
<div class="compare-card-note">Never soften the EXPECT. The only honest moves are to re-measure the claim, fix the work, or abandon the gate openly — the way G7 above was abandoned.</div>
</div>
</div>

## Common questions

### What if the work already started before a ledger exists?
SKILL.md states this as a stop condition, not a judgment call: implementation started before the ledger exists means stop and write the ledger first, even though it will now describe work already partly done. Writing it now is worse than writing it first, and better than never writing it at all. A ledger written after code exists tends to describe what the code already does, gaps included, rather than what the criterion actually demanded — the exact failure a ledger written first is built to catch.

### Does choosing a deep ledger mean spawning more agents?
No. Two sources make the same distinction: ADR 0006, one of this repository's recorded architecture decisions, and the conduct rubric's "Depth of verification, not shape of execution" section. A gate is a ledger row, and a node is an agent. Deepening a ledger from five layers to ten adds rows to check against; it does not add agents to run the work. Execution shape — loop, graph, or hybrid — stays entirely with conduct.

### What if an acceptance criterion cannot become a runnable check?
It becomes a manual gate instead: no CHECK, no EXPECT, only a recorded observation with real evidence. Grit's stop conditions block the alternative directly — turning an undecidable criterion into a runnable gate with a weakened check is refused, not accepted as a shortcut. A manual gate is a finding about the criterion, not a formality skipped.

### Can a gate be dropped?
Not by deletion. AUDIT.md allows a gate to be abandoned when a criterion turns out to be wrong or infeasible, but only with a stated reason and a human sign-off recorded in both the ledger and the audit. The discipline is not that every gate must be met — it is that no gate disappears without a trace.

### Does this work outside Claude Code?
Yes, with different enforcement in each tool. Claude Code's opt-in stop hook can block a session directly. OpenCode's `grit-verify` command and its verify agent's rule refuse a handoff-ready verdict while a gate is unmet. Cursor and Codex ship hook systems of their own, but this repository does not yet ship hooks for them, so there — as in GitHub Copilot — enforcement is an instruction file an agent could in principle skip. The backstop is the same `grit-gates.yml` continuous-integration check, which lints the ledger and fails independently of what the agent reports — once a maintainer has wired it to pull requests, since it ships dispatch-only.

### Where does the audit end up?
AUDIT.md names three places already in this repository's pipeline. The pull request body, so a reviewer sees the count before reading the diff. The product-management report pack, so a sponsor sees whether a delivered benefit actually cleared its gates. And the issue or work-item thread, so the record persists next to the discussion that produced it.

## It's working if

- Every "done" in a pull request or a chat reply now carries a ledger reference beside it.
- An unmet gate blocks the agent from reporting the work finished — directly, where the Claude Code stop hook is installed, and through the `grit-gates.yml` continuous-integration check wherever a maintainer has wired it to pull requests.
- The audit block, its met, unmet, and abandoned counts with evidence, appears in the pull request body itself, not only in conversation.
- An abandoned gate always carries a name and a reason; nothing disappears from the ledger without a trace.
- Depth gets recorded with its source, user-stated or rubric-recommended, every time, never applied silently.

If gates keep passing because their EXPECT lines got looser, the discipline has failed while the checker stayed green.

## Where it fits

**Grit is both a step inside the delivery loop and a skill you can run on its own, against any substantial piece of work.**

Its nearest neighbor is `sdlc`: sdlc owns the loop — design, build, secure, release — and grit owns what done means inside it, since sdlc's own procedure records evidence per gate as a grit gate ledger. The two are usually wanted together. `shakedown` is the outside check of the same audit: grit's own sibling list names it directly as "the verification doctrine grit makes runnable," reviewing the finished change in an isolated sandbox rather than proving it from the inside as it is built.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map names completion discipline, "is it actually done," as the trigger that points straight back to grit.

This page sits at step 4 of 5 on the Deliver with evidence journey; the footer below carries you to `sdlc` before it and `shakedown` after.
