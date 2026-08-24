---
name: shakedown
description: User-invoked PR sandbox build, test, and review. Use before merge or when validating a contributor PR in isolation.
---

# Shakedown (user-invoked)

Run an isolated verification pass on a PR or branch.

## When to invoke

- User requests PR validation or pre-merge confidence
- CI missing locally but sandbox available

## Procedure

1. Deliver phase per `DDDD.md`: in Claude Code, run the `shakedown-pr` dynamic workflow (`adapters/claude/workflows/shakedown-pr.js`); in OpenCode, the `shakedown` template via `scripts/pipeline.sh shakedown <PR#> --engine opencode`
2. Otherwise: follow `SANDBOX.md` isolation rules, in a disposable worktree per `VERIFICATION.md`; checkout PR head; build, test, and execute the change
3. Evaluate a stacked PR against its own stack base (`deliver/STACKING.md`); consume existing check runs, including GitHub Code Quality, instead of re-running them
4. Check the coverage and use-case traceability matrix against `COVERAGE.md`'s floors — flag a gap only where no existing check already covers it
5. Run the verification-before-completion pass (`VERIFICATION.md`): open the diff, confirm it against the work item, never infer success from a green build alone
6. Post the review: blocking on a red build, a failing coverage floor, or a missing acceptance-criterion test — never an approval on an unverified claim

## Stop conditions

- Sandbox cannot be created → stop with manual steps
- Secrets required → never use production keys

## Output contract

```yaml
pr: <url>
build: pass|fail
tests: pass|fail|skipped
notes: []
```

## Sibling skills

- `deliver`, `assure`, `safeguard`
