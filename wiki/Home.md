# Wiki Home

## The thesis

Growth is being redefined by where value concentrates in software delivery. Human judgment holds four gates — inception, approval, pickup, and release — and trusted agents carry out the work between them. This repository is that operating model, built from small, composable skills, with documentation that discloses detail progressively, and adapters for five different tools.

## Quickstart

```bash
npx skills@latest add rahulnakmol/skills
./scripts/install-adapters.sh
```

For the full setup process for each supported tool, see [Installation](Installation).

## The map

- [Architecture: Role journey](Architecture-Role-Journey) — the complete path from an idea to a maintained system, with the four human gates marked
- [Architecture: Loop vs graph](Architecture-Loop-vs-Graph) — how the `orchestrate` skill decides the shape a task should run in
- [Architecture: SDLC system](Architecture-SDLC-System) — the SPEC-TS ledger, the delivery gates, and the roster of specialist agents
- [Architecture: Agentic pods](Architecture-Agentic-Pods) — the work-item contract and the pickup protocol that governs it
- [Architecture: Skill design](Architecture-Skill-Design) — the conventions every skill in this repository follows

## Skills, one page each

### Developer — [Group-Developer](Group-Developer)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Orchestrate](Skill-Orchestrate) | model | Chooses a loop, a graph, or a hybrid execution shape, assigns a model to each step, and maps the result to a harness |
| [Model routing](Skill-Model-Routing) | model | Resolves the tier and the model assigned to a task node from the registry |
| [Update models](Skill-Update-Models) | user | Researches provider catalogs and proposes an update to the registry |
| [Impact](Skill-Impact) | user | Turns an idea into a signed PRD through the grill loop; the inception gate |
| [Recon](Skill-Recon) | model | Produces a brownfield codebase brief; read-only |
| [Slice](Skill-Slice) | model | Turns a signed PRD into a contract-complete backlog |
| [Raise](Skill-Raise) | model | Publishes the backlog to GitHub or Linear |
| [SDLC](Skill-SDLC) | user | Runs the full gated delivery loop for one work item |
| [Architect](Skill-Architect) | mixed | Leads cross-cutting technical design and produces ADRs |
| [Safeguard](Skill-Safeguard) | mixed | Carries out threat modeling and hardening |
| [Deliver](Skill-Deliver) | mixed | Covers CI/CD, supply chain checks, and release readiness |
| [Assure](Skill-Assure) | mixed | Covers quality and maintainability assurance |
| [Operate](Skill-Operate) | mixed | Covers service-level objectives, instrumentation, and incident readiness |
| [Maintain](Skill-Maintain) | mixed | Covers patch cadence and technical-debt reduction |
| [Shakedown](Skill-Shakedown) | user | Builds, tests, and reviews any pull request in an isolated sandbox before merge |
| [Ask FDE](Skill-Ask-FDE) | user | Routes a stated intent to the correct skill |
| [Responsible AI governance](Skill-Responsible-AI-Governance) | overlay | Applies regulated-industry and responsible-AI requirements on top of the other rules |

### Branding — [Group-Branding](Group-Branding)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Press](Skill-Press) | user | Renders a signed PRD as a branded PDF |

### Charter only — no skills shipped yet

[Group-Writing](Group-Writing) and [Group-Productivity](Group-Productivity) describe planned work only.
