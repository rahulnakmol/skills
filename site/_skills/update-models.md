---
layout: skill
name: update-models
title: "Update Models — Curating the Model Registry"
description: "Update models is the user-invoked skill that researches current provider catalogs and proposes an evidence-backed pull request to the shared model registry."
group: developer
invocation: user-invoked
scenario: "Confirming the registry the QuenServe team's delivery depends on is current before a monthly review issue would fire"
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

Update models curates the registry `model-routing` reads, so no other skill has to hand-edit a model assignment on its own. It never edits the registry directly from a research idea in someone's head — every change traces back to sources actually consulted.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Read the evidence log</span><span class="step-text">Open `RESEARCH.md` and the registry's current state before starting any research.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Gather catalogs</span><span class="step-text">Provider changelogs from Anthropic, OpenAI, and Google only — the sole providers permitted as shipped defaults.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Draft a scoped diff</span><span class="step-text">`models.md` and the specific adapter files a change actually touches — nothing else in the repository moves.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Log before opening</span><span class="step-text">Sources consulted, changes proposed, and rejected candidates go into `RESEARCH.md` before a pull request exists.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Open, never merge</span><span class="step-text">A human always approves the pull request; the skill runs on the monthly cron or on demand.</span></div>
</div>

<ul class="benefits">
  <li>Every registry change ships as a pull request with a summary table, risk notes, and a test plan — never a commit made straight to `models.md`.</li>
  <li>A non-allowlist provider cannot become a new default without an architecture-decision-record waiver on record, name-checked at proposal time, not caught later in review.</li>
  <li>A role change with no sourced evidence stops before a pull request opens, so the evidence record exists before the change does.</li>
  <li>The monthly cron catches drift a person forgot to check, and the same skill runs identically on demand when a model deprecates outside that schedule.</li>
</ul>

`RESEARCH.md` is append-only: nothing gets edited out of it once written, including a rejected candidate, so the record of what was considered and turned down survives as long as the record of what was adopted.

- [`RESEARCH.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/update-models/RESEARCH.md) covers the entry template every research run fills in, and the historical seed note explaining where the registry's evidence trail before this repository existed.

## When to reach for it

In Claude Code, type `/update-models`, or name the skill directly in a session — nothing routes to it automatically, since it is user-invoked. The real, current line `r021` in this repository's routing evaluation set, `test/eval/routing.jsonl`, is a realistic trigger: "the model registry is stale, research what the providers ship now."

You reach for it in three moments. The monthly cron flags the registry as overdue and files a review issue. A provider deprecates a model this repository depends on, or ships something with a materially better fit for a role, outside that schedule. You simply want to confirm, on demand, that the registry is still current before trusting it for a consequential run.

| The problem | The skill |
|---|---|
| You need a tier resolved from the registry as it stands today, not a change to what it says | [`model-routing`]({{ '/model-routing/' | relative_url }}) |
| You need the whole loop-or-graph routing decision for delivery work, unrelated to model choice | [`conduct`]({{ '/conduct/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same update-models skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want update models can skip the rest of the catalog with `./scripts/link-skills.sh --skill update-models`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command, headless CI dispatch</span></div>
<div class="tool-group-body">
<p>Update models is user-invoked: type <code>/update-models</code>, or name it directly in a session. The same procedure also runs headless in continuous integration: <code>.github/workflows/update-models.yml</code> dispatches a live research run through <code>anthropics/claude-code-action@v1</code> when a maintainer triggers <code>workflow_dispatch</code> with <code>dry_run: false</code>, which requires an <code>ANTHROPIC_API_KEY</code> repository secret.</p>
<div class="prompt-card">The QuenServe team's model registry may be stale before E1-F1-S1 delivery leans on it. Read RESEARCH.md and models.md, research current Anthropic, OpenAI, and Google catalogs only, and draft a diff scoped to models.md and the adapters it touches. Log every source and every rejected candidate in RESEARCH.md before opening anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The reply is a scoped diff plus a filled RESEARCH.md entry, stopped short of opening a pull request until you ask for that step.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">A same-named command that targets a different file</span></div>
<div class="tool-group-body">
<p>OpenCode ships an <code>/update-models</code> command, but it is bound to the <code>model-curator</code> agent, whose own instructions and edit permissions are scoped to OpenCode's own dotfiles model configuration — not this repository's <code>models.md</code>. For curating this repository's registry from OpenCode, there is no matching command; the request is applied the same way Cursor or Codex would apply it, by reading <code>update-models/SKILL.md</code> and <code>RESEARCH.md</code> as context.</p>
<div class="prompt-card">Apply skills/developer/update-models/SKILL.md directly: research current provider catalogs, draft a diff to skills/developer/model-routing/models.md, and log the evidence in RESEARCH.md before proposing anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode answers by reading the skill files and drafting the same scoped diff, since no installed command carries this specific procedure.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply update models' procedure as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees update models' name and description the same way the other tools do, and a team adds its rules directly to <code>AGENTS.md</code>. Copilot's agent mode applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>. This repository ships no command or hook for update models on any of the three.</p>
<div class="prompt-card">Read skills/developer/update-models/SKILL.md and RESEARCH.md, then check whether the registry is due for review and, if it is, research the current Anthropic, OpenAI, and Google catalogs and propose a scoped diff to models.md with every source logged.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three answer the same way: stating the freshness check's result, then drafting the diff and the RESEARCH.md entry directly in their reply, since none has a command's output to parse.</p>
</div>
</div>

A good ask names what triggered it — the monthly cron, a specific deprecation, or a plain freshness check — since `RESEARCH.md`'s entry template records the trigger alongside the sources.

## A working example

Every QuenServe engineer who resolves a tier through `model-routing` — including the Gate 3 verifier on story E1-F1-S1 — depends on this registry staying current, so before any research runs, the skill's own procedure checks whether the registry is actually due for review. `scripts/check-registry-freshness.mjs` is the exact command the continuous-integration workflow runs first — run here, live, against this repository's real registry:

<pre><code><span class="tok-comment">$ node scripts/check-registry-freshness.mjs</span>
<span class="tok-ok">models.md last reviewed 2026-08-22 &mdash; 10 day(s) ago (threshold 45)</span></code></pre>

Exit 0 — the registry is not overdue yet. The day count in that line advances every day this page is not regenerated; the threshold, the exit code, and the "models.md last reviewed" prefix are what stay fixed, and what the skill's own logic actually acts on. `.github/workflows/update-models.yml` runs this exact check on the first of every month, at `cron: '0 9 1 * *'`. Once the registry passes 45 days without review, its `freshness-check` job files an issue titled "Model registry review due (&lt;date&gt;)" with the label `model-registry`, rather than letting the gap pass silently.

When a research run does proceed — triggered by that issue, by a deprecation, or by a direct request — it logs itself in the shape `RESEARCH.md`'s own template requires. It is shown here filled for a plausible run, not a captured one, since a live catalog call is outside what this page can execute:

<pre><code>### 2026-09-01 &mdash; monthly registry review
- Sources consulted: Anthropic model list API, OpenAI model list API, Google model list API
- Changes proposed: none &mdash; every published role's provider and family assignment still matches the live catalogs
- <span class="tok-ok">Rejected candidates (why): none this cycle</span></code></pre>

A cycle with no proposed change is still a completed run: the entry records that the catalogs were checked and nothing moved, which is itself the evidence a "still current" claim needs. A `workflow_dispatch` run with `dry_run: false` requires the `ANTHROPIC_API_KEY` repository secret; without it, the workflow fails the step outright rather than silently skipping the research it was asked to run.

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

## Common questions

<details class="qa">
<summary>Does OpenCode's own /update-models command run this skill?</summary>
<div class="qa-body">

No, and this is worth stating plainly rather than leaving unsaid. OpenCode's installed <code>/update-models</code> command dispatches to the <code>model-curator</code> agent, whose instructions and edit permissions target OpenCode's own dotfiles model configuration under a separate configuration tree, never <code>skills/developer/model-routing/models.md</code>. Curating this repository's registry from OpenCode currently means applying the skill file directly, the same way Cursor or Codex would.

</div>
</details>

<details class="qa">
<summary>Can a model outside Anthropic, OpenAI, or Google ever become a shipped default?</summary>
<div class="qa-body">

Only with an architecture-decision-record waiver on record. `models.md`'s own policy line scopes published defaults to those three providers; a candidate outside that list is rejected as a new default without one, regardless of how strong its evidence looks. A local override outside the shipped defaults is a different matter — a user may add one, but it is never committed as what the repository ships.

</div>
</details>

<details class="qa">
<summary>What happens when the research run finds nothing worth changing?</summary>
<div class="qa-body">

The run still logs an entry — sources consulted, and "changes proposed: none" with the reason. A cycle that found nothing is not the same as a cycle that never ran, and only the logged entry tells the two apart later, when someone asks whether the registry was actually checked on schedule.

</div>
</details>

<details class="qa">
<summary>Does a registry change ever merge without a person approving it?</summary>
<div class="qa-body">

No. Every path into `models.md` — the monthly cron, a direct request, or a deprecation response — ends at an opened pull request, never a direct commit. `.github/workflows/update-models.yml`'s research job runs the check and drafts the change; a human still has to review and merge it.

</div>
</details>

## It's working if

- `check-registry-freshness.mjs` exits 0 on demand, and the day count it reports never quietly exceeds the 45-day threshold without a filed issue.
- Every merged registry change traces to a `RESEARCH.md` entry with its sources named, including the cycles that proposed nothing.
- No pull request from this skill ever names a provider outside Anthropic, OpenAI, or Google as a new shipped default without a linked architecture-decision-record waiver.
- A `workflow_dispatch` run with `dry_run: false` and no `ANTHROPIC_API_KEY` secret fails the step outright, rather than silently completing with no research done.

If a registry edit ever lands in `models.md` without a matching `RESEARCH.md` entry, the discipline has failed even though the file itself still parses and every skill that reads it still resolves cleanly.

## Where it fits

**Update models is the only skill in this repository allowed to change what the registry says; every other skill only reads it.**

Its nearest neighbor is `model-routing`: model routing resolves a tier from the registry as it stands right now, and update models is the sole path by which that registry's contents change, on a disclosed schedule or on demand. The two never overlap in what they do — one reads, the other proposes — and a registry that is stale is a finding for this skill, not a reason for model routing to guess.

If none of this settles which skill fits, `ask-fde` routes you to the right one from a plain description of what you need.
