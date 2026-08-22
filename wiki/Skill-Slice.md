# Skill: Slice

**Group:** developer · **Invocation:** model-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/SKILL.md)

Decomposes a signed-off PRD into a backlog of epics, features, stories, technical stories, and continuous-improvement items — every one of them conforming to the agent-executable work-item contract, and none of them missing the reliability, maintainability, and instrumentation lane a feature backlog usually forgets.

## When to invoke

- The PRD's Gate G2 is signed in [impact](Skill-Impact)
- The user requests a backlog breakdown from an approved PRD

## How it fits

`slice` is the Backlog stage of the [role journey](Architecture-Role-Journey). It reads the PRD's risk and governance tier and, when that tier is `limited` or `high`, calls [responsible-ai-governance](Skill-Responsible-AI-Governance) so every affected work item carries a populated Governance section — audit trail, explainability, human-in-the-loop checkpoints — rather than treating governance as an overlay bolted on after the fact.

## Key references

- [TEMPLATES.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/TEMPLATES.md) — epic / feature / story / technical story / CI-item templates
- [WORK-ITEM-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/WORK-ITEM-CONTRACT.md) — the 14-section agent-executable contract, including the headless run block and the critique-first pickup protocol
- [OPERABILITY.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/slice/OPERABILITY.md) — the mandatory operability lane: observability, SLOs, runbooks, CI/CD, and the governance lane

## Sibling skills

Consumes a signed PRD from [Impact](Skill-Impact); hands the backlog off to [Raise](Skill-Raise) for publication.
