# Skill: Raise

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/SKILL.md)

Publishes a sliced backlog to the project's configured tracker — GitHub (native sub-issues + labels, or Projects v2) or Linear — applying the `raised` label and a stable idempotency key so re-runs update rather than duplicate.

## When to invoke

- [Slice](Skill-Slice) has produced contract-complete work items
- The user has confirmed which tracker is the publish target

## How it fits

`raise` closes out the Backlog stage of the [role journey](Architecture-Role-Journey). What it publishes is not a plain issue — it is a work item that already carries the full [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md), so the pickup protocol (`raised → critiqued → clarified → ready → in-progress → done`) can run the moment anyone — human or agent — opens the issue.

## Key references

- [trackers/github.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/trackers/github.md) — sub-issues+labels or Projects v2, auto-detected per project
- [trackers/linear.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/raise/trackers/linear.md) — projects + parent issues via the Linear MCP/API

## Sibling skills

Consumes backlog from [Slice](Skill-Slice); the published items are picked up by [SDLC](Skill-SDLC) or a headless pod per the contract's execution profile.
