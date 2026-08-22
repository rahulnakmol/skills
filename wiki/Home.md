# Wiki Home

## The thesis

Growth is redefined when human judgment holds the gates — inception, approval, pickup, release — and trusted agents run everything between them. This repo is that operating model: small skills, progressive disclosure, five-tool adapters, one thesis.

## Quickstart

```bash
npx skills@latest add rahulnakmol/skills
./scripts/install-adapters.sh
```

Full per-tool setup: [Installation](Installation).

## The map

- [Architecture: Role journey](Architecture-Role-Journey) — the full inception-to-maintenance journey, with the four human gates marked
- [Architecture: Loop vs graph](Architecture-Loop-vs-Graph) — how `orchestrate` decides execution shape
- [Architecture: SDLC system](Architecture-SDLC-System) — the SPEC-TS ledger, gates, and agent roster
- [Architecture: Agentic pods](Architecture-Agentic-Pods) — the work-item contract and pickup protocol
- [Architecture: Skill design](Architecture-Skill-Design) — the conventions every skill follows

## Skills, one page each

### Developer — [Group-Developer](Group-Developer)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Orchestrate](Skill-Orchestrate) | model | Choose loop/graph/hybrid, assign a model per node, map to a harness |
| [Model routing](Skill-Model-Routing) | model | Resolve the tier/model for a task node from the registry |
| [Update models](Skill-Update-Models) | user | Research provider catalogs, propose a registry update |
| [Impact](Skill-Impact) | user | Idea → grilled, signed PRD (the inception gate) |
| [Recon](Skill-Recon) | model | Brownfield codebase brief, read-only |
| [Slice](Skill-Slice) | model | PRD → contract-complete backlog |
| [Raise](Skill-Raise) | model | Publish backlog to GitHub or Linear |
| [SDLC](Skill-SDLC) | user | Full gated delivery loop for a work item |
| [Architect](Skill-Architect) | mixed | Cross-cutting design and ADRs |
| [Safeguard](Skill-Safeguard) | mixed | Threat modeling and hardening |
| [Deliver](Skill-Deliver) | mixed | CI/CD, supply chain, release readiness |
| [Assure](Skill-Assure) | mixed | Quality and maintainability assurance |
| [Operate](Skill-Operate) | mixed | SLOs, instrumentation, incident readiness |
| [Maintain](Skill-Maintain) | mixed | Patch cadence and debt burn-down |
| [Shakedown](Skill-Shakedown) | user | Sandbox build/test/review any PR before merge |
| [Ask FDE](Skill-Ask-FDE) | user | Route intent to the right skill |
| [Responsible AI governance](Skill-Responsible-AI-Governance) | overlay | Regulated-industry and responsible-AI overlay |

### Branding — [Group-Branding](Group-Branding)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Press](Skill-Press) | user | Signed PRD → branded PDF |

### Charter only (no skills shipped yet)

[Group-Writing](Group-Writing) · [Group-Productivity](Group-Productivity)
