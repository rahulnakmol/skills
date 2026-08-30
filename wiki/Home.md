# Wiki Home

## The thesis

This is the documentation for The Quentin's skills repository: a curated, growing bundle of the AI-native skills we use across our work, all carrying one philosophy — **Set the frontier: redefining growth with human judgment and trusted AI agents**. We are curating and building skills that deliver business value through trusted agents with human judgment, driving growth in personal, professional, and sustainable accomplishments. Five groups bound the work: the AI-native SDLC (the first fully built group, where human judgment holds four gates — inception, approval, pickup, release — and trusted agents carry out everything between them), pm (the business side of the same AI-transformation coin, the same four gates read from a product or transformation angle), branding, writing, and productivity. Small, composable skills; documentation that discloses detail progressively; adapters for five different tools.

![The operating model](https://raw.githubusercontent.com/wiki/tqnonline/skills/assets/operating-model.svg)

## Quickstart

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

For the full setup process for each supported tool, see [Installation](Installation).

## The map

- [Personas](Personas) — who this serves and how, from a first job to CTO, CDAIO, and CIO on the developer ladder, and from PM to Chief Business Transformation Officer on the parallel pm ladder
- [Tool guidance](Tool-Guidance) — using the skills in Claude Code, OpenCode, Codex, Cursor, and GitHub Copilot
- [Architecture: Role journey](Architecture-Role-Journey) — the complete path from an idea to a maintained system, with the four human gates marked
- [Architecture: Loop vs graph](Architecture-Loop-vs-Graph) — how the `orchestrate` skill decides the shape a task should run in
- [Architecture: SDLC system](Architecture-SDLC-System) — the SPEC-TS ledger, the delivery gates, and the roster of specialist agents
- [Architecture: Agentic pods](Architecture-Agentic-Pods) — the work-item contract and the pickup protocol that governs it
- [Architecture: PM journey](Architecture-PM-Journey) — the complete path from a business problem to a realized benefit, with the four human gates marked
- [Architecture: PM orchestrate](Architecture-PM-Orchestrate) — how the pm group's `orchestrate` decides grill-loop, parallel-fan, or hybrid
- [Architecture: PM system](Architecture-PM-System) — the constitution hierarchy, the DDDD cycle, and the initiative-repo substrate
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
| [Grit](Skill-Grit) | user | Holds substantial work to an acceptance-gate ledger written before implementation, verified by runnable checks and a final audit |
| [Ask FDE](Skill-Ask-FDE) | user | Routes a stated intent to the correct skill |
| [Responsible AI governance](Skill-Responsible-AI-Governance) | overlay | Applies regulated-industry and responsible-AI requirements on top of the other rules |

### PM — [Group-PM](Group-PM)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Orchestrate](Skill-Orchestrate) | model | Chooses grill-loop, parallel-fan, or hybrid execution shape for multi-round pm work |
| [Chart](Skill-Chart) | user | Charts work too big for one session as decision tickets on the tracker, resolved one at a time |
| [Constitution](Skill-Constitution) | user | Codifies practice or initiative principles, positioning, and prioritization; quarterly review cadence |
| [Discover](Skill-Discover) | user | Turns a raw business problem into a structured, stakeholder-grounded analysis |
| [Map](Skill-Map) | model | Builds personas, process flows, and the Business Understanding Document |
| [TOM Architect](Skill-TOM-Architect) | user | Designs a Target Operating Model — L1-L4 processes, maturity, RACI, platform mapping |
| [Carve](Skill-Carve) | model | Extracts DIVE-tested epics into a manifest |
| [PRD Draft](Skill-PRD-Draft) | user | Drafts one INVEST-compliant PRD per approved epic |
| [PRD Validate](Skill-PRD-Validate) | model | Checks PRD structure against a nine-item checklist, read-only |
| [PRD Review](Skill-PRD-Review) | user | Scores a PRD on the 11-Star Experience Framework |
| [Case](Skill-Case) | user | Builds the business case the sponsor approves at the Investment gate |
| [Roadmap](Skill-Roadmap) | user | Sequences initiatives by outcome and dependency; runs PI planning |
| [RAID](Skill-RAID) | user | Maintains the Risks, Assumptions, Issues, Dependencies registers |
| [Realize](Skill-Realize) | user | Tracks benefits actuals against projection and rolls up to the north star |
| [Report](Skill-Report) | user | Produces the 4Ps leadership pack at five cadences |
| [Grill](Skill-Grill) | user | Interrogates a PM artifact before it advances through a gate |
| [Ask PM](Skill-Ask-PM) | user | Routes a stated intent to the correct pm skill |

### Branding — [Group-Branding](Group-Branding)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Press](Skill-Press) | user | Renders a signed PRD as a branded PDF |

### Productivity — [Group-Productivity](Group-Productivity)

| Skill | Invocation | Purpose |
|-------|------------|---------|
| [Brief](Skill-Brief) | user | Writes the rules, definitions, and boundaries a team's agents read, placed per tool surface |

### Charter only — no skills shipped yet

[Group-Writing](Group-Writing) describes planned work only.
