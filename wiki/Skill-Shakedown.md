# Skill: Shakedown

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SKILL.md)

Shakedown checks out a pull request into an isolated sandbox, builds it, runs its tests, executes the change, and posts a review written by an agent, either locally or without a person present. This gives every pull request a verdict based on actually running the code, rather than an approval based only on reading the diff.

## When to invoke

- The user wants confidence in a pull request or a branch before merging it.
- Continuous integration is not available locally, but a sandbox is.

## How it fits

Shakedown is a check at the Secure DevOps stage of the [role journey](Architecture-Role-Journey), built specifically so that a failing test suite results in a blocking review, not an approval, by default. It never uses production secrets, and it ships a reusable `pr-shakedown.yml` template so the same check runs automatically whenever a pull request opens, rather than only when someone remembers to request it.

## Key references

- [SANDBOX.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SANDBOX.md) sets the rules for isolating a worktree or a container.
- [pr-shakedown.yml](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/pr-shakedown.yml) is the reusable GitHub Action template.

## Sibling skills

Shakedown runs alongside [Deliver](Skill-Deliver) and [Safeguard](Skill-Safeguard) at the Secure DevOps gate.
