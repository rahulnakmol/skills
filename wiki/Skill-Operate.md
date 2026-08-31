# Skill: Operate

**Group:** developer · **Invocation:** mixed-invoked specialist · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/SKILL.md)

Operate is the post-release charter. It covers three concerns that were previously three separate skills: reliability engineering — service-level objectives, instrumentation, and incident readiness; quality assurance — the testability of the SPEC-TS ledger, test gaps, and the technical debt a slice carries; and application maintenance — patch cadence, dependency updates, and debt burn-down. Its output is a brief with a section for each lane, not a general statement that monitoring, quality, and upkeep should exist.

The three were merged because their charters had become near-identical: each named the same gate trigger, loaded one adapter, and produced a report, and their one-line descriptions gave a model no reliable basis for choosing between them. The substantive case for merging is that they run the same loop — each measures the delivered system against the same Design baseline and returns findings to the same backlog. The trade-off is a wider charter than any single role holds, which is why every run states the lanes it covered and the lanes it left out.

## When to invoke

- A gate in the SDLC loop requires reliability, quality, or maintenance evidence.
- A work item's pod charter names any of the three roles.
- Service-level objectives, alerting, dashboards, runbooks, or incident readiness are in question.
- Requirements need a testability check, or a slice needs its test gaps and technical debt recorded.
- A patch, dependency-update, or debt burn-down cycle is due.

## How it fits

Operate carries out the Reliability, Maintainability, and Application maintenance stages of the [role journey](Architecture-Role-Journey). It is where the operability lane that [Slice](Skill-Slice) requires — observability, service-level objectives, and runbooks — is put into practice in production, rather than only planned at the time of slicing. Findings from live incidents, quality audits, and maintenance sweeps all return to the backlog as continuous-improvement items, which is how the loop between delivery and upkeep stays open.

## Key references

- [adapters/opencode/agents/operate.md](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/operate.md) contains the executable operations protocol for the reliability lane.
- [adapters/opencode/agents/quality.md](https://github.com/tqnonline/skills/blob/main/adapters/opencode/agents/quality.md) contains the executable protocol for the quality lane.
- [tools/opencode-workflows/templates/maintenance.json](https://github.com/tqnonline/skills/blob/main/tools/opencode-workflows/templates/maintenance.json) is the workflow-runner template the maintenance lane runs against.
- [CADENCE.md](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/CADENCE.md) sets the schedule for patch and debt review.
- [slice/OPERABILITY.md](https://github.com/tqnonline/skills/blob/main/skills/developer/slice/OPERABILITY.md) describes the operability lane this skill's evidence traces back to.

## How to use

Name the concern and Operate scopes the run to it. Ask for SLOs, alerting, or an incident runbook and it works the reliability lane. Ask whether the requirements are testable or where the test gaps are and it works the quality lane against the coverage floors in `core/COVERAGE.md`. Ask for a patch cycle or a debt burn-down and it works the maintenance lane on the schedule in `CADENCE.md`. In every case the brief names the lanes covered and the lanes left out, so a partial run is not mistaken for a full one.

## Best practices

- Give every service boundary an SLO with an owner and an alert threshold; instrumentation without a threshold is decoration.
- Carry a correlation identifier on every agent run and automated decision, so one request traces end to end.
- Insist on quantified constraints in the quality lane — "fast enough" and "reliable" are placeholders, not engineering requirements.
- Keep the maintenance cadence when nothing is broken; maintenance that runs only after an incident is incident response under another name.
- Route every finding back into the backlog through `slice` as an improvement item, so maintenance and quality work compete for capacity explicitly rather than losing to feature work by default.
- Report a lane that could not run as a gap. A failed or skipped lens is a result, never an empty success.

## Sibling skills

Operate feeds continuous-improvement items back into [Slice](Skill-Slice) and runs within [SDLC](Skill-SDLC)'s quality and release gates.
