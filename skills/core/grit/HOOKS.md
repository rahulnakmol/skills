# Enforcing the ledger per tool

A ledger only changes behavior if something reads it at the moment an agent tries to stop. This document covers what a stop hook does, how each supported tool enforces the ledger, and where enforcement falls back to continuous integration when no hook runtime exists.

## What a stop hook does

A stop hook runs at the point an agent's session tries to finish — the moment it would otherwise report the task complete and hand control back to the human. While unmet gates remain in the governing ledger, the hook returns a block decision naming exactly what is unmet, and the session continues instead of ending. This is enforcement by interception, not by trust: the agent does not have to remember to check its own ledger, because the hook checks for it.

Two details keep the hook from becoming its own kind of trap. First, it tracks a progress hash of the ledger's state, so an edit that changes nothing observable — reformatting, a comment, a metadata field — does not reset the block; only a change to the gates themselves, or a new passing run, moves the hash. Second, it releases after six consecutive blocks with no progress, so a session genuinely stuck on an unresolvable gate is not trapped indefinitely against a hook that cannot itself fix anything.

State the limit plainly: a stop hook constrains one tool's session. It stops that session from declaring victory over unmet gates; it does nothing to make the underlying work correct, and it has no reach over a different tool, a different session, or a human directly editing files outside any session at all. The hook is a backstop against one specific failure — an agent finishing without checking its own ledger — not a guarantee of correctness.

## Claude Code

The hook files live at `adapters/claude/hooks/`. Install them with `./scripts/install-adapters.sh --tool claude-hooks`, which merges a Stop entry into the project's `.claude/settings.json`, the project's `.claude/settings.local.json`, or the user-level settings file, whichever the installer is pointed at. This install path is opt-in and is deliberately excluded from the default install — running the plain installer with no `--tool` flag does not enable the hook, matching the same opt-in posture ADR 0006 already sets for this adaptation: the hook changes session behavior, so a maintainer turns it on deliberately rather than inheriting it silently from a default.

## OpenCode

OpenCode's shipped mechanism is a `grit-verify` command together with a rule added to the verify agent, because a handoff-ready verdict has to be precluded while gates remain unmet, and the command is what carries that precondition. Whether OpenCode's own plugin API can veto session completion the way a Claude Code stop hook does was not verified as part of this work — that claim is left unmade rather than asserted without a test behind it. What ships and is verified is the command path: `grit-verify` runs the ledger check and the verify agent's rule refuses a handoff-ready verdict while it reports unmet gates.

## GitHub Copilot

Copilot has no hook runtime to intercept a session's completion, so enforcement here is an instruction plus the continuous-integration backstop below. Add this to `.github/copilot-instructions.md`:

```
Before reporting a task complete, read GATES.md or .grit/*/GATES.md if
present. Run each gate's CHECK and compare its output against EXPECT.
Report the met, unmet, and abandoned counts. Unmet gates mean the task
is not complete.
```

This is an instruction an agent can choose to skip, which a hook cannot be — the honest framing is that it raises the odds of enforcement without guaranteeing it, and the CI backstop is what closes that specific gap.

## Codex and Cursor

The same instruction belongs in `AGENTS.md` for Codex and in `.cursor/rules/` for Cursor, worded the same way as the Copilot snippet above. Neither tool has a hook runtime either, so both fall back to the continuous-integration backstop for the same reason Copilot does.

## Continuous integration backstop

`grit-gates.yml` is the check that covers every tool with no hook runtime, and it runs two steps: `gate-lint.mjs` against the ledger, to catch a malformed ledger before anything tries to execute it, and then `gate-check.mjs --status` against the same ledger. The choice of `--status` here is deliberate. `--status` never executes a CHECK command, approves an oracle, or writes to a ledger — it only reports what the ledger already records. That means CI needs no approval store and no API key to run this check: there is nothing in `--status` mode that could touch a credential or a network call, because it runs nothing at all. It exits 1 when any gate is unmet, which is exactly the condition that should block a merge.

Be honest about what this backstop actually catches. `--status` reads recorded state; it confirms a ledger is complete and every gate it lists shows as met. It does not re-run anything, so it cannot catch a ledger whose EVIDENCE was fabricated rather than produced by a real run, or a CHECK that was approved once against a different artifact than the one now in the PR. What makes the recorded evidence trustworthy is upstream of `--status`: the approval binding described below, and a human actually reading the audit before signing off. `--status` is the mechanical floor under every tool, including the ones with no hook runtime at all — it is not the whole of the trust the ledger claims to carry.

## The approval boundary

A human reads and approves each CHECK command once before `gate-check.mjs` will ever execute it. The approval is not a blanket grant to run commands from this ledger — it is keyed to the exact CHECK string, the exact EXPECT pattern, the resolved working directory, the resolved shell, the timeout, the output and regex limits, the platform, and PATH. Change any one of those and the approval no longer matches; the check reprints itself and waits for a fresh approval rather than running on the strength of an old one that happened to be close.

Approvals live outside the repository, at `~/.grit/approved` by default, overridable with `GRIT_APPROVAL_DIR`. That placement is deliberate: a pull request that edits files inside the repository cannot also grant itself execution rights, because the approval store a malicious or mistaken edit would need to touch is not part of what the pull request can write.

State the boundary plainly, because it is easy to read approval as more than it is: approval is consent to run one specific, reviewed command — it is not a sandbox. A check that runs still has the ambient filesystem and network access of whoever runs it, exactly as any other command that person or agent could type directly. Approving a check is not a safety mechanism against what the check itself could do if it were malicious; it is a safety mechanism against a check running that nobody ever read. This is where the repository's stated philosophy is load-bearing rather than decorative: the human holds the gate — reads the command, decides it is safe and correct, and approves it once — and the agent does the work in between, running the approved check as many times as the work requires without needing the human back in the loop for each run.
