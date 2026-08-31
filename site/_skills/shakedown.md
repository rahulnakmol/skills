---
layout: skill
name: shakedown
title: "Shakedown: Isolated Pre-Merge Verification"
description: "Shakedown builds, tests, and executes a pull request in an isolated sandbox, then posts a blocking review on a red build or a missing coverage floor."
group: developer
invocation: user-invoked
lens:
  novice:
    who: 'You have approved a pull request because the description sounded right, then found out later it never actually ran.'
    value: 'Shakedown builds it, runs it, and executes the changed behavior in a disposable sandbox before anyone approves anything.'
  practitioner:
    who: 'You need pre-merge confidence on a pull request and CI is not available where you are working.'
    value: 'You get the same isolated build-test-execute pass CI would run, evaluated against the pull request''s own stack base, with existing check runs reused instead of duplicated.'
  leader:
    who: 'You own what lands on your team''s main branch, and you do not read every diff yourself.'
    value: 'A red build, a failing coverage floor, or a missing acceptance-criterion test blocks the review outright; nothing merges on an unverified claim.'
  csuite:
    who: 'You need pre-merge verification that runs the same way whether a person or an agent is watching.'
    value: 'The check can run headless in continuous integration, off a workflow shipped in the repository, with no live model call until a maintainer explicitly opts in.'
journey: deliver-with-evidence
journey_title: "Deliver with evidence"
journey_step: 5
journey_steps: 5
journey_prev: grit
---

## What it does

Shakedown runs an isolated verification pass on a pull request or branch before merge. It checks out the change in a disposable worktree, builds it, runs the tests, and executes the changed behavior rather than trusting a green exit code. A stacked pull request is evaluated against its own stack base, and existing check runs &mdash; including GitHub Code Quality &mdash; are consumed, not re-run. The result is a posted review that blocks on a red build, a failing coverage floor, or a missing acceptance-criterion test, and never approves on an unverified claim.

## How to call it

In Claude Code, type `/shakedown`.

Readers who do not have the skill pack installed yet can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A review that earns its verdict</div>
<pre><code><span class="tok-ok">build:</span> pass  <span class="tok-ok">tests:</span> pass  <span class="tok-ok">executed:</span> pass
<span class="tok-ok">Existing checks consumed:</span> github-code-quality=success (not re-run)
<span class="tok-ok">Review:</span> COMMENT &mdash; no findings survived adversarial verification</code></pre>
<div class="compare-card-note">The diff was actually executed, not just built, and Code Quality's own conclusion was read from the check run instead of duplicated.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>build: fail  tests: <span class="tok-warn">skipped</span>
Review: <span class="tok-warn">APPROVE</span>  <span class="tok-comment">&larr; a red build never gets an approval</span></code></pre>
<div class="compare-card-note">Per `SKILL.md`'s stop conditions and the workflow's own verdict logic: a red sandbox run or a confirmed blocking finding forces `REQUEST_CHANGES`, never a pass.</div>
</div>
</div>

## In practice

Shakedown ships a real CI artifact: [`pr-shakedown.yml`](https://github.com/tqnonline/skills/blob/main/skills/developer/shakedown/pr-shakedown.yml), a reusable GitHub Actions workflow. It is reproduced here in full, byte for byte.

{% raw %}
<pre><code># Reusable PR-shakedown workflow template.
#
# Ships dispatch-only so nothing runs, or spends API tokens, until a maintainer
# adds the ANTHROPIC_API_KEY secret and opts in. To run on every pull request,
# replace the `on:` block with:
#
#   on:
#     pull_request:
#       types: [opened, synchronize, reopened]
#
# and pass github.event.pull_request.number instead of the input.
#
# Note on GitHub Code Quality: it reports on its own Actions path
# (dynamic/github-code-quality/codeql, actor github-code-quality), separate from
# code scanning and from this workflow. The shakedown consumes its conclusions
# through the PR's check runs instead of re-running static analysis.
name: pr-shakedown
on:
  workflow_dispatch:
    inputs:
      pr_number:
        description: 'Pull request number to shake down'
        required: true
        type: number

permissions:
  contents: read
  pull-requests: write

jobs:
  shakedown:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Require API key
        run: |
          if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
            echo "::error::ANTHROPIC_API_KEY secret is not set; the shakedown needs a live model."
            exit 1
          fi
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - name: Install Claude Code CLI
        run: npm i -g @anthropic-ai/claude-code
      - name: Run the shakedown workflow headless
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          claude -p "Run the /rahulnakmol-skills:shakedown-pr workflow with args {\"pr\": ${{ inputs.pr_number }}, \"repo\": \"${{ github.repository }}\"}"</code></pre>
{% endraw %}

The workflow stays dispatch-only until a maintainer adds the `ANTHROPIC_API_KEY` secret and deliberately switches the `on:` block to run on every pull request, per `REPO-SETUP.md`.

## How it works

1. **Run the real workflow.** In Claude Code, the `shakedown-pr` dynamic workflow; in OpenCode, `scripts/pipeline.sh shakedown <PR#> --engine opencode`. See [`shakedown-pr.js`](https://github.com/tqnonline/skills/blob/main/adapters/claude/workflows/shakedown-pr.js).
2. **Isolate the sandbox.** A disposable worktree, no production credentials, checkout the PR head, then build, test, and execute the change. See [`SANDBOX.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/shakedown/SANDBOX.md).
3. **Evaluate against the right base.** A stacked pull request is checked against its own stack base, and existing check runs are consumed rather than re-run. See [`STACKING.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/STACKING.md).
4. **Check coverage.** Flag a gap against the traceability matrix's floors only where no existing check already covers it. See [`COVERAGE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/COVERAGE.md).
5. **Verify before posting.** Open the diff and confirm it against the work item; never infer success from a green build alone. See [`VERIFICATION.md`](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md).
6. **Post a review that blocks on cause.** A red build, a failing coverage floor, or a missing acceptance-criterion test blocks; nothing is approved on an unverified claim.
