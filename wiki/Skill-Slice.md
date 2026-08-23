# Skill: Slice

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/SKILL.md)

Slice decomposes a signed-off PRD into a backlog of epics, features, stories, technical stories, and continuous-improvement items. Every item it produces follows the agent-executable work-item contract, and every item includes the reliability, maintainability, and instrumentation work that a feature backlog often leaves out.

## When to invoke

- The PRD's Gate G2 has been signed in [Impact](Skill-Impact).
- The user requests a backlog breakdown from an approved PRD.

## How it fits

Slice carries out the Backlog stage of the [role journey](Architecture-Role-Journey). It reads the PRD's risk and governance tier, and when that tier is `limited` or `high`, it calls [Responsible AI governance](Skill-Responsible-AI-Governance) so that every affected work item includes a completed Governance section covering an audit trail, explainability, and human-in-the-loop checkpoints. Governance is treated as a requirement built into the work, not as an overlay added afterward.

## Key references

- [TEMPLATES.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/TEMPLATES.md) provides templates for an epic, a feature, a user story, a technical story, and a continuous-improvement item.
- [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) defines the 14-section agent-executable contract, including the block of commands for a headless run and the pickup protocol that requires a review before implementation.
- [OPERABILITY.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/OPERABILITY.md) describes the operability lane that every epic must include: observability, service-level objectives, runbooks, continuous integration and delivery, and the governance lane.

## How to use

Slice is model-invoked once a PRD carries its Gate G2 signature; ask for "a backlog breakdown" of the signed PRD in any tool and it engages. It refuses an unsigned PRD by design. Its output is a backlog bundle ready for `raise` — review the epic structure before publishing rather than after.

## Best practices

- Never publish an item missing a contract section; an incomplete work item fails at pickup anyway, later and more expensively.
- Keep every story small enough to become one single-concern pull request — slicing is where the stacked-PR discipline actually starts.
- Include the operability lane on every epic, and on greenfield repositories let the first epic carry the `REPO-SETUP.md` bootstrap stories.
- When the governance tier is `limited` or `high`, check that the Governance section reached every affected item — silence there is a defect, not a default.

## Sibling skills

Slice consumes a signed PRD from [Impact](Skill-Impact) and hands the resulting backlog to [Raise](Skill-Raise) for publication.
