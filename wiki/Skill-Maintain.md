# Skill: Maintain

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/maintain/SKILL.md)

Maintain is the application-maintenance charter. It covers patch cadence and the reduction of technical debt, and it produces a maintenance plan with prioritized continuous-integration items, rather than an informal backlog of deferred work.

## When to invoke

- A gate in the SDLC loop requires evidence from the maintain role.
- A work item's pod charter names this role.

## How it fits

Maintain is the final stage of the [role journey](Architecture-Role-Journey), where patches, dependency updates, and incident follow-ups become new backlog items. This closes the loop that runs from a project's inception through to its ongoing upkeep.

## Key references

- [CADENCE.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/maintain/CADENCE.md) sets the schedule for patch and debt review.
- [tools/opencode-workflows/templates/maintenance.json](https://github.com/rahulnakmol/skills/blob/main/tools/opencode-workflows/templates/maintenance.json) is the workflow-runner template this charter runs against.

## Sibling skills

Maintain feeds continuous-improvement items back into [Slice](Skill-Slice) and works alongside [Operate](Skill-Operate) on the post-release side of the journey.
