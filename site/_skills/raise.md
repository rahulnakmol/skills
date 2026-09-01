---
layout: skill
name: raise
title: "Raise — Publishing Backlog Items to a Tracker"
description: "Raise is the model-invoked skill that publishes a contract-complete backlog to GitHub, Linear, or Azure DevOps with pickup-protocol labels attached."
group: developer
invocation: model-invoked
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

Raise publishes a `slice`-produced backlog bundle to the tracker a project has configured, turning contract-complete items into real, labeled issues. It reads the tracker target from `.impact.json` and follows the matching doctrine — GitHub, Linear, or Azure DevOps, the last of which exports a CSV for manual import rather than a live API call. Every created GitHub or Linear issue gets the `raised` label and a stable idempotency key stored in its body footer, so a re-run updates the existing issue instead of duplicating it. Missing tracker authentication or an incomplete contract both stop the run rather than publish a partial item.

## How to call it

Raise is not typed as a command. The model reaches for it once a sliced backlog is contract-complete and ready to leave the document and become real issues. A prompt like "publish this backlog to GitHub issues with the pickup labels" is enough to trigger it.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

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

## In practice

Raise has no fixture file of its own to quote; this is the shape its output contract requires — "a list of issue URLs plus label state raised" — filled for the same checkout-timeout item carried from slice:

<pre><code>Published:
- https://github.com/tqnonline/skills/issues/842
  label: raised
  idempotency-key: wi-checkout-timeout-2026-08
  tracker: github (sub-issues + labels mode, per .impact.json)</code></pre>

This is the shape the output contract requires, not a captured real API call — raise has no runnable script of its own in this repository; `trackers/github.md` names `gh` as the required CLI and states the update-by-stable-key behavior this example follows.

## How it works

1. Read `.impact.json` for the configured `tracker.primary`.
2. Follow the matching tracker doc for GitHub, Linear, or the Azure DevOps CSV export path. See [`trackers/github.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/github.md), [`trackers/linear.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/linear.md), [`trackers/ado.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/raise/trackers/ado.md).
3. Apply the `raised` label on create, for GitHub or Linear.
4. Store a stable idempotency key in the issue body footer, so a re-run updates rather than duplicates.
5. Stop rather than publish when tracker authentication is missing or the contract is incomplete — return to `slice` in the latter case.
