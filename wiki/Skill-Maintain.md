# Skill: Maintain

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/maintain/SKILL.md)

Application-maintenance charter: patch cadence and technical-debt burn-down, producing a maintenance plan with prioritized CI items rather than an ad hoc backlog of "get to it eventually."

## When to invoke

- An SDLC gate requires maintain evidence
- A work item's pod charter names this role

## How it fits

`maintain` is the last stage of the [role journey](Architecture-Role-Journey) — where patches, dependency cadence, and incident follow-ups turn back into new backlog items, closing the loop that runs from inception all the way through to ongoing upkeep.

## Key references

- [CADENCE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/maintain/CADENCE.md) — the patch and debt-review schedule
- [tools/opencode-workflows/templates/maintenance.json](https://github.com/rahulnakmol/skills/blob/main/tools/opencode-workflows/templates/maintenance.json) — the workflow-runner template this charter executes against

## Sibling skills

Feeds continuous-improvement items back into [Slice](Skill-Slice); works alongside [Operate](Skill-Operate) on the post-release side of the journey.
