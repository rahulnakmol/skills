---
layout: skill
name: update-models
title: "Update Models — Curating the Model Registry"
description: "Update models is the user-invoked skill that researches current provider catalogs and proposes an evidence-backed pull request to the shared model registry."
group: developer
invocation: user-invoked
lens:
  novice:
    who: 'You assumed the "best model" list just updates itself somewhere.'
    value: 'It does not. Update models is the actual process behind it: research, then a pull request a person reviews — never a silent edit.'
  practitioner:
    who: 'You rely on the model registry every day and want to know whether it is current.'
    value: 'Update models reads provider catalogs from Anthropic, OpenAI, and Google, drafts a diff scoped only to models.md and the adapters it touches, and logs its evidence in RESEARCH.md before anything ships.'
  leader:
    who: 'You do not want a model swapped into a production default without a paper trail.'
    value: 'Every registry change requires named human approval on the pull request, and a provider outside the allowlist is rejected as a new default unless an ADR waiver exists.'
  csuite:
    who: 'You want proof the model registry did not drift on someone''s unreviewed judgment.'
    value: 'Every change arrives as a reviewable pull request with a summary table, risk notes, and a test plan — on a disclosed monthly schedule and on demand, never a silent commit to a file that governs production behavior.'
---

## What it does

Update models curates the registry that `model-routing` reads, so no other skill has to hand-edit a model assignment on its own. It reads `RESEARCH.md`'s evidence log and the registry's current state, gathers provider changelogs from Anthropic, OpenAI, and Google — the only providers permitted as shipped defaults — and drafts a diff scoped strictly to `models.md` and the adapter files a change actually touches. Sources consulted, changes proposed, and rejected candidates are logged in `RESEARCH.md` before the diff opens as a pull request, and a non-allowlist provider is refused as a new default without an architecture decision record waiver. The skill runs on user request or on the monthly cron the repository already schedules.

## How to call it

In Claude Code, type `/update-models`. In OpenCode, the same name runs as a command, dispatching to the `model-curator` subtask agent for the same research-and-propose workflow.

Readers who do not have the skill pack installed yet can add it first — the second line installs the tool adapters, including the OpenCode command above:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A registry change with its evidence attached</div>
<pre><code>### 2026-08-15 &mdash; quarterly security-role catalog review
- Sources consulted: OpenAI changelog, provider status page
- Changes proposed: reassign `security` role per updated catalog fit
- <span class="tok-ok">Rejected candidates (why): cost-tier mismatch for xhigh effort</span></code></pre>
<div class="compare-card-note">Follows RESEARCH.md's own entry template — trigger, sources, proposal, and the rejected candidates named with a reason, not silently dropped.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>### 2026-08-15 &mdash; quarterly security-role catalog review
- <span class="tok-warn">Changes proposed: reassign `security` role to a provider</span>
  <span class="tok-warn">outside the Anthropic / OpenAI / Google allowlist</span></code></pre>
<div class="compare-card-note">Non-allowlist provider as new default &rarr; reject unless ADR waiver. Missing evidence for a role change is also a stop, not an assumption.</div>
</div>
</div>

## In practice

The freshness check the CI workflow itself runs before any research pass is a real, runnable script in this repository:

<pre><code><span class="tok-comment">$ node scripts/check-registry-freshness.mjs</span>
<span class="tok-ok">models.md last reviewed 2026-08-22 — 9 day(s) ago (threshold 45)</span></code></pre>

Exit 0 — the registry does not need review yet. This is the actual, current output of that exact command against the repository's real registry file today. `.github/workflows/update-models.yml` runs this same check on the first of every month (`cron: '0 9 1 * *'`); when the registry passes 45 days without review, the workflow's `freshness-check` job files a "model registry review due" issue automatically rather than letting the gap pass silently. A `workflow_dispatch` run with `dry_run: false` requires an `ANTHROPIC_API_KEY` secret and, when present, runs the skill's own procedure against the live catalogs and opens the pull request — it never merges on its own.

## How it works

1. Read the evidence log and template before starting any research. See [`RESEARCH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/update-models/RESEARCH.md).
2. Gather provider changelogs from Anthropic, OpenAI, and Google only — the sole providers permitted as published defaults.
3. Draft a diff scoped to the registry and the specific adapter files a change touches; nothing else in the repository moves.
4. Log sources consulted, changes proposed, and rejected candidates before opening anything. See [`RESEARCH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/update-models/RESEARCH.md).
5. Open a pull request; a human always approves it before it merges.
6. Run on the monthly cron or on demand through `workflow_dispatch`.
