# Skill: Deliver

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/SKILL.md)

Deliver is the release-engineering charter for the secure-DevOps gate. It covers continuous integration and delivery gates, supply-chain checks, and release readiness, and it produces a checklist backed by gate evidence and artifact hashes, rather than a verbal sign-off.

## When to invoke

- A gate in the SDLC loop requires evidence from the deliver role.
- A work item's pod charter names this role.

## How it fits

Deliver is part of the Secure DevOps stage of the [role journey](Architecture-Role-Journey). It works through the release-readiness checklist behind whatever release gate [Conduct](Skill-Conduct) has built into the graph, including, for a high-consequence write, the `human` node that must sign off before the release takes place.

## Key references

- [tools/opencode-workflows/templates/deliver.json](https://github.com/tqnonline/skills/blob/main/tools/opencode-workflows/templates/deliver.json) is the workflow-runner template this charter runs against.
- [STACKING.md](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/STACKING.md) sets the rule for stacked pull requests: a change spanning more than one concern, or too large for one review, ships as a dependency-ordered stack of single-concern pull requests, reviewed bottom-up and merged base-to-tip with the `gh stack` tooling.
- [REPO-SETUP.md](https://github.com/tqnonline/skills/blob/main/skills/developer/deliver/REPO-SETUP.md) is the readiness checklist the SDLC skills follow, or set up, in every repository they work on: GitHub Code Quality on its separate Actions path, the `gh stack` tooling, the pickup-protocol labels, and the shakedown workflow. Deliver verifies it as gate evidence; on a greenfield project, Slice turns the missing items into the first epic's bootstrap stories.

## How to use

Deliver engages at the release-readiness gate. Its first act is verifying the repository against `REPO-SETUP.md` — Code Quality, stack tooling, labels, the shakedown workflow — and recording the result as gate evidence, setting up what is missing. Its output is a checklist backed by artifact hashes, not a verbal sign-off.

## Best practices

- Verify repo setup before release work, not during it; a missing label or extension discovered mid-release is an avoidable incident.
- Ship large changes as stacks per `STACKING.md` — the release gate is where "too big to review" must be caught if slicing missed it.
- Treat the checklist's evidence (hashes, check conclusions) as the deliverable; a checklist without evidence is a form, not a gate.

## Sibling skills

Deliver runs alongside [Safeguard](Skill-Safeguard) and [Shakedown](Skill-Shakedown) at the Secure DevOps gate.
