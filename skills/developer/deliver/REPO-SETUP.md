# Repository setup for the delivery pipeline

The SDLC skills do not assume a target repository is ready for agent-driven delivery; they check it, and set up what is missing. This checklist is what "ready" means. `deliver` and `sdlc` verify it before gated work begins; on a greenfield project, `slice` turns the missing items into the first epic's bootstrap stories.

## GitHub Code Quality

- Code Quality is enabled for the repository (repository settings, or the organization's code security configuration).
- It runs on its own GitHub Actions path — `dynamic/github-code-quality/codeql`, under the `github-code-quality` actor — separate from code scanning's `dynamic/github-code-scanning/codeql`. Enabled repositories keep scanning without reconfiguration, but any Actions billing report or dashboard that filtered on the old shared path must also track the new one.
- The shakedown and the review lenses consume Code Quality's conclusions from the pull request's check runs. They do not re-run static analysis the repository already receives; duplicating it wastes tokens and produces conflicting reports.

## Stacked pull requests

- The `gh stack` CLI extension is installed (`gh extension install github/gh-stack`), and where coding agents operate in the repository, `gh skill install github/gh-stack` teaches them the stack commands.
- The stack base is the integration branch (`dev` in this repository's convention), and merges run base-to-tip, one approved layer at a time.
- Every contributor and agent follows `STACKING.md`: one concern per pull request, dependency-ordered layers, review bottom-up, sync a lower-layer fix upward rather than repeating it above.

## Pickup protocol

- The six pickup-protocol labels exist: `raised`, `critiqued`, `clarified`, `ready`, `in-progress`, `done`. `raise` applies them; `assess-work-item` and `deliver-work-item` transition them; a missing label set breaks the state machine silently, so create the labels up front (`gh label create <name>`).

## Shakedown

- `pr-shakedown.yml` (from `skills/developer/shakedown/`) is installed under `.github/workflows/`, dispatch-only until the repository adds an `ANTHROPIC_API_KEY` secret and deliberately enables per-pull-request triggers.

## Commit-time guardrails

- A pre-commit hook runs formatting, type checking, and the fast subset of the tests before a commit is recorded. It applies formatting rather than reporting it: a hook that fails on formatting it could have fixed spends the developer's time on work the tool was already able to do itself.
- The hook runs only what is fast — seconds, not minutes. This is the real trade-off, and it is worth stating plainly: a hook that runs the full suite gets disabled by frustrated developers within a week, which leaves the repository with no commit-time check at all. The slow checks stay in continuous integration, where waiting is expected and no one is blocked at the keyboard.
- The hooks are installed from the repository rather than from one developer's machine (`core.hooksPath`, or the hook manager's install step run at setup). A hook that lives only in a single clone's `.git/hooks` protects only that clone.
- Where agents operate in the repository, destructive git operations are blocked before they execute: force pushes, hard resets, `git clean -fd`, branch deletion, and history rewrites on shared branches.
- That guardrail belongs at the point of execution, not in instructions. An agent that can rewrite history can destroy work that was never pushed anywhere, and that work is unrecoverable — no remote holds a copy, and no review catches it afterward. An instruction the agent may or may not follow is guidance, not a control.
- A block states why the command was refused and what to do instead. A guardrail that only refuses gets bypassed, because the fastest way past it is to turn it off; a message that names the safe alternative — a revert commit in place of a hard reset, a new branch in place of a force push, `git stash` in place of `clean -fd` — leaves the operator with a path forward and the guardrail intact.

## How the skills apply this

- `sdlc` treats this checklist as a prerequisite: it reports what is missing before walking the gates, rather than discovering mid-loop that a label or an extension does not exist.
- `deliver` verifies the checklist at the release-readiness gate and records the result as gate evidence.
- `slice`, on a greenfield repository, emits the missing items as bootstrap stories in the first epic's operability lane, so setup is tracked work, not an untracked assumption.
