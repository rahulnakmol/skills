# Skill: Shakedown

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SKILL.md)

Checks out any pull request into an isolated sandbox, builds it, runs its tests, executes the change, and posts an agent review — locally or headless — so every PR gets a genuine pass/fail verdict instead of an approval based on reading the diff.

## When to invoke

- The user wants pre-merge confidence on a PR or branch
- CI isn't available locally but a sandbox is

## How it fits

`shakedown` is a Secure DevOps-stage check in the [role journey](Architecture-Role-Journey), and the one built specifically so a red test suite gets a **blocking** review, never an approval by default. It never uses production secrets, and it ships a reusable `pr-shakedown.yml` template so the same check runs automatically on every PR-open, not only when someone remembers to ask for it.

## Key references

- [SANDBOX.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SANDBOX.md) — worktree/container isolation rules
- [pr-shakedown.yml](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/pr-shakedown.yml) — the reusable GitHub Action template

## Sibling skills

Runs alongside [Deliver](Skill-Deliver) and [Safeguard](Skill-Safeguard) at the Secure DevOps gate.
