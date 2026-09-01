---
layout: skill
name: raise
title: "Raise — Publishing Backlog Items to a Tracker"
description: "Raise is the model-invoked skill that publishes a contract-complete backlog to GitHub, Linear, or Azure DevOps with pickup-protocol labels attached."
group: developer
invocation: model-invoked
scenario: "Publishing the sliced checkout-timeout work item to GitHub without duplicating it on the next run"
lens:
  novice:
    who: 'You have a finished backlog sitting in a document, and no idea how it becomes real issues in GitHub or Linear.'
    value: 'Raise is the step that actually publishes it, with the right labels attached automatically — nothing to type by hand.'
  practitioner:
    who: 'Your slice output is contract-complete and ready to leave the document and become tracked work.'
    value: 'Raise reads the configured tracker from .impact.json, follows the matching tracker doc, applies the raised label on create, and stores a stable idempotency key so a re-run updates the same issue instead of duplicating it.'
  leader:
    who: 'You manage delivery across more than one tracker or more than one team.'
    value: 'Raise supports GitHub, Linear, or Azure DevOps behind one contract, and stops rather than publishing when tracker auth is missing or the contract is incomplete — nothing half-formed reaches the board.'
  csuite:
    who: 'You need delivery work traceable from decision back to ticket.'
    value: 'Every published item carries an idempotency key and a pickup-protocol label, so raised work is auditable back to the backlog that produced it, not a set of issues typed in ad hoc by whoever had access.'
---

## What it does

Raise publishes a `slice`-produced backlog bundle to the tracker a project has configured, turning contract-complete items into real, labeled issues. It exists because a backlog sitting in a document is not yet tracked work, and because a second run of the same pipeline should never silently duplicate what the first one already published.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the target</span><span class="step-text">`.impact.json`'s `tracker.primary` field names GitHub, Linear, or Azure DevOps.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Follow the matching doctrine</span><span class="step-text">Each tracker has its own field mapping and its own idempotency behavior.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Apply the label</span><span class="step-text">`raised` on create, for GitHub or Linear — Azure DevOps exports a CSV instead of a live call.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Store the idempotency key</span><span class="step-text">A stable key in the issue body footer, so a re-run updates rather than duplicates.</span></div>
</div>

<ul class="benefits">
  <li>A re-run of the same pipeline finds the existing issue by its stable key and updates it, instead of opening a duplicate a reviewer has to notice and close by hand.</li>
  <li>Missing tracker authentication stops the run with setup steps, rather than silently failing partway through a batch of items.</li>
  <li>A contract-incomplete item never reaches the tracker at all; raise returns it to `slice` instead of publishing something half-formed.</li>
  <li>Three trackers sit behind one contract, so a team is never blocked on this skill just because its board lives in Linear or Azure DevOps instead of GitHub.</li>
</ul>

The output is a list of issue URLs plus the label state `raised` — the confirmation that a document became tracked work a team can actually pick up.

- [`trackers/github.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/github.md) covers the `gh` CLI requirement, the sub-issues-versus-Projects-v2 mode choice, and the idempotent update-by-key behavior.
- [`trackers/linear.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/linear.md) covers the Linear MCP or API path and its own idempotent labels and state.
- [`trackers/ado.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/ado.md) covers the CSV export path and the field mapping into Azure DevOps's SAFe hierarchy.

## When to reach for it

Raise is not typed as a command. The model reaches for it once a sliced backlog is contract-complete and ready to leave the document and become real issues. The real, current line `r013` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is exactly that trigger: "publish this backlog to GitHub issues with the pickup labels."

You reach for it in two moments. `slice` has just produced a contract-complete bundle and the team is waiting for it to show up on the board. A pipeline is re-running against the same items — after a scope revision, say — and you need the existing issues updated rather than duplicated.

| The problem | The skill |
|---|---|
| The backlog is not contract-complete yet | [`slice`]({{ '/slice/' | relative_url }}) |
| You need the gated build loop to actually start on the raised item | [`sdlc`]({{ '/sdlc/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Raise is model-invoked: nothing is typed to call it. Claude reaches for it on its own when a request matches its description — a contract-complete backlog ready to become tracked issues.</p>
<div class="prompt-card">The checkout-timeout story is contract-complete. Publish it to GitHub with the raised label and a stable idempotency key — if we run this again next week, I want it to update the same issue, not open a second one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Raise returns the issue URL and confirms the `raised` label and idempotency key are both set.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p>OpenCode ships no dedicated command for raise. Its catalog install places the skill in <code>.agents/skills/</code>, and an orchestrating agent applies the tracker doctrine directly once a bundle is contract-complete, rather than through a command file the way <code>/impact</code> or <code>/sdlc</code> work.</p>
<div class="prompt-card">Publish the checkout-timeout item to GitHub per skills/developer/raise/trackers/github.md — sub-issues and labels mode, raised label applied, idempotency key stored in the body footer.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The agent runs the `gh` CLI directly and reports the created issue's URL and label state.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skills land in <code>.agents/skills/</code>, and the agent applies raise's procedure by reading the catalog as context, following the shared rules in <code>AGENTS.md</code>.</p>
<div class="prompt-card">Read .impact.json for the configured tracker, then publish the checkout-timeout item per the matching trackers/ doc, with the raised label and a stable idempotency key.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor runs the tracker's CLI or API directly and reports the result in its reply.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees raise's name and description the same way the other tools do. It gets no command layer either: invocation runs through <code>AGENTS.md</code> and the skill files themselves.</p>
<div class="prompt-card">Read skills/developer/raise/SKILL.md and trackers/github.md, then publish the checkout-timeout item with the raised label and idempotency key.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex publishes the same way, reading its context from the skill files rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. This repository ships no command or hook for raise on any tool, so a Copilot request is answered the same way as on Cursor and Codex: by reading the tracker doctrine directly as working context.</p>
<div class="prompt-card">Before publishing the checkout-timeout item, confirm tracker authentication is available and the item is contract-complete — stop and tell me if either is missing.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot checks both conditions and reports either the published issue or the exact gap blocking it.</p>
</div>
</div>

A good ask confirms which tracker the project actually uses, since the three doctrines behave differently — GitHub and Linear publish live and idempotently, Azure DevOps exports a CSV for manual import. Readers who do not have the skill pack installed yet can add raise alone:

```bash
./scripts/link-skills.sh --skill raise
```

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

The checkout-timeout item from `slice` is contract-complete, and `.impact.json` names GitHub as `tracker.primary`, in sub-issues-and-labels mode. Raise has no fixture file of its own to quote; this is the shape its output contract requires — "a list of issue URLs plus label state raised" — filled for this exact item:

<pre><code>Published:
- https://github.com/tqnonline/skills/issues/842
  label: raised
  idempotency-key: wi-checkout-timeout-2026-08
  tracker: github (sub-issues + labels mode, per .impact.json)</code></pre>

This is the shape the output contract requires, not a captured real API call — raise has no runnable script of its own in this repository; `trackers/github.md` names `gh` as the required CLI and states the update-by-stable-key behavior this example follows. A week later, the item's acceptance criteria change and the same pipeline runs again. `trackers/github.md`'s idempotent behavior means raise finds issue `842` by its stored key and updates it in place — the checkout-timeout fix never ends up tracked across two open issues because the run happened twice.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A published item with its handoff intact</div>
<pre><code>Title: Reduce checkout timeout errors to under 0.1%
Labels: <span class="tok-ok">raised</span>, ready
---
&lt;!-- raise-idempotency-key: wi-checkout-timeout-2026-08 --&gt;</code></pre>
<div class="compare-card-note">The raised label applied on create, and a stable idempotency key stored in the body footer — a re-run finds this exact key and updates, it does not duplicate.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>Title: Reduce checkout timeout errors to under 0.1%
Labels: raised
<span class="tok-warn">(no idempotency key in the body)</span></code></pre>
<div class="compare-card-note">Store a stable idempotency key in the issue body footer — quoted directly from the skill's own procedure. Without it, the next raise run cannot recognize this issue and creates a duplicate.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens when tracker authentication is missing?</summary>
<div class="qa-body">

Raise stops with setup steps rather than attempting a partial publish. For GitHub, `trackers/github.md` names the `gh` CLI as required; without it authenticated, the run stops before opening a single issue, rather than publishing some items and silently skipping others.

</div>
</details>

<details class="qa">
<summary>Is Azure DevOps as idempotent as GitHub or Linear?</summary>
<div class="qa-body">

No, and `trackers/ado.md` states this plainly rather than leaving it implied: this backend generates an import file through `node scripts/ado-export.mjs`, it does not write to Azure DevOps directly, and a re-export before a second import can create duplicates unless the CSV is reconciled by hand. Direct-write, authenticated idempotency for Azure DevOps is a named follow-up, not current scope.

</div>
</details>

<details class="qa">
<summary>What if the item raise is asked to publish is missing a contract section?</summary>
<div class="qa-body">

Raise stops and returns it to `slice` rather than publishing an incomplete issue. Nothing half-formed reaches the tracker — the same discipline that keeps `slice` from publishing an item with a blank contract section extends one step further into what actually reaches the board.

</div>
</details>

<details class="qa">
<summary>Where does the idempotency key actually live?</summary>
<div class="qa-body">

In the issue body's footer, as an HTML comment, for GitHub — a stable key that survives edits to the visible body text. Linear stores its own idempotent labels and state through its MCP or API path. Either way, the key is what lets a second run recognize an issue it already created, rather than matching on title text that could have changed since.

</div>
</details>

## It's working if

- A second run of the same pipeline against the same item updates the existing issue, and no duplicate ever appears on the board because the pipeline happened to run twice.
- Every published GitHub or Linear issue carries the `raised` label the moment it is created, not added in a follow-up edit.
- No incomplete item reaches a tracker — a missing contract section sends the item back to `slice` instead.
- A missing tracker credential stops the run with named setup steps, rather than a partial batch of issues and a silent gap.

If an idempotency key stops appearing in a published issue's body, the discipline has failed even though the issue itself still looks correctly labeled.

## Where it fits

**Raise is the last step before a signed idea is a ticket someone can actually pick up.**

Its nearest neighbor is `slice`: slice's contract-complete bundle is the only input raise accepts, and an incomplete one bounces straight back rather than reaching the tracker in a weaker form. `sdlc` picks up from here, walking the raised item through the gated build loop once a pod is ready to start on it. `conduct` decides execution shape for that item earlier in the chain, before slice even writes it.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
