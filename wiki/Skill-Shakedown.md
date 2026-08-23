# Skill: Shakedown

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SKILL.md)

Shakedown checks out a pull request into an isolated sandbox, builds it, runs its tests, executes the change, and posts a review written by an agent, either locally or without a person present. This gives every pull request a verdict based on actually running the code, rather than an approval based only on reading the diff.

## When to invoke

- The user wants confidence in a pull request or a branch before merging it.
- Continuous integration is not available locally, but a sandbox is.

## How it fits

Shakedown is a check at the Secure DevOps stage of the [role journey](Architecture-Role-Journey), built specifically so that a failing test suite results in a blocking review, not an approval, by default. It never uses production secrets, and it ships a reusable `pr-shakedown.yml` template so the same check runs automatically whenever a pull request opens, rather than only when someone remembers to request it.

On Claude Code, the shakedown runs as the `shakedown-pr` dynamic workflow shipped with the plugin; on OpenCode, as the `shakedown` template through the deterministic runner. Both are stack-aware — a pull request that is one layer of a stack is evaluated against its own stack base — and both consume the pull request's existing check runs, including GitHub Code Quality, which reports on its own Actions path separate from code scanning, rather than repeating analysis the repository already receives.

## Key references

- [SANDBOX.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/SANDBOX.md) sets the rules for isolating a worktree or a container.
- [pr-shakedown.yml](https://github.com/rahulnakmol/skills/blob/main/skills/developer/shakedown/pr-shakedown.yml) is the reusable GitHub Action template: a real, key-gated headless run, shipped dispatch-only so an adopting repository turns on per-pull-request triggers as an explicit choice.
- [adapters/claude/workflows/shakedown-pr.js](https://github.com/rahulnakmol/skills/blob/main/adapters/claude/workflows/shakedown-pr.js) is the dynamic-workflow implementation.

## How to use

Run `/shakedown <PR#>` interactively, `scripts/pipeline.sh shakedown <PR#>` on either engine, or dispatch `pr-shakedown.yml` in a repository that has installed it and added the API key. The workflow checks the PR out into an isolated worktree, builds it, runs its tests, executes the changed behavior, and submits a real review.

## Best practices

- Never point it at production credentials; the sandbox rule in `SANDBOX.md` is absolute.
- Keep approval human: the default verdict on green is a non-blocking comment review, and turning on auto-approve is a deliberate per-run choice.
- Consume the checks the repository already runs — including GitHub Code Quality — instead of re-running them; conflicting duplicate reports help no one.
- For a stacked PR, judge the layer against its own stack base; blaming layer 3 for layer 1's defect wastes the stack's whole point.

## Sibling skills

Shakedown runs alongside [Deliver](Skill-Deliver) and [Safeguard](Skill-Safeguard) at the Secure DevOps gate.
