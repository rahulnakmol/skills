# rahulnakmol/skills

This repository collects the skills I have built for working with AI agents across the software delivery lifecycle — authored once, running the same way in Claude Code, OpenCode, Codex, Cursor, and GitHub Copilot. Every skill here follows one personal philosophy, and each one exists because I needed it, tested it, and kept what survived.

## The thesis

The philosophy is **Set the frontier: redefining growth with human judgment and trusted AI agents**, and every skill in this repository carries it. Software delivery is being redefined by where value now concentrates: at the two ends of the process, not the middle. Human judgment holds the gates. Trusted agents do the work in between. This repository names those gates and enforces each one in code, rather than leaving them as an assumption. Inception is a grill loop a human drives. Approval is a signed PRD with a recorded governance tier. Pickup requires an agent to critique a work item and stop before it implements anything. Release requires a named human owner with a service-level agreement, never a silent auto-approval. Between the gates, artificial intelligence has made routine execution and information retrieval a baseline capability rather than a source of advantage. This repository invests where the advantage still lives: encoded judgment at one end — grill loops, gates, contracts, and routing rules — and verified, trustworthy execution at the other — a separate verifier for consequential work, a provider policy enforced in continuous integration, and a model registry kept current by an honest, disclosed research process.

![Set the frontier — value concentrates at the two ends](docs/assets/set-the-frontier.svg)

## Skill groups

The skills are organized into four groups, each a bounded area of work rather than a technology layer:

| Group | What it holds | Status |
|-------|---------------|--------|
| **Developer** | The software delivery lifecycle, end to end: inception, backlog, design, implementation, secure DevOps, reliability, and maintenance — 17 skills | Shipping |
| **Branding** | Turning delivery artifacts into stakeholder-ready documents; today, PRD-to-branded-PDF | Shipping |
| **Writing** | Editorial skills: ADR review, documentation linting, style enforcement | Charter — planned |
| **Productivity** | Personal automation | Charter — planned |

The developer group is the heart of the repository, and the rest of this document walks through it.

## The operating model

The developer skills implement one journey, from a raw idea to a system running in production, framed by four human gates. Everything between the gates is agent-run: a single writer per checkout, a separate verifier wherever the output feeds a consequential decision.

![The operating model — four human gates, agents in between](docs/assets/operating-model.svg)

The `orchestrate` skill decides whether a task runs as a loop, a graph, or a hybrid, following the evidence-backed rules in its `RUBRIC.md` — routing on whether an outcome can be verified, never on how difficult it appears. It resolves a model for each step through `model-routing`, and for any high-consequence write it inserts a `human` node with a named owner and a service-level agreement, not a plain stop condition.

## AI-native delivery: agentic pods and dynamic workflows

Delivery itself runs as three orchestrated stages, built on Claude Code's dynamic-workflow runtime with full parity on OpenCode's deterministic runner. Each stage applies the same discipline the inception grill applies to ideas: deep, fact-finding introspection before action, at every step. The assessment stage interrogates a work item from three independent perspectives — contract completeness, alignment with the signed PRD, and the reality of the codebase — verifies every finding adversarially, and posts what it learned back to the item's thread. Those answers refine the work item where it lives: in the backlog. Nothing is implemented until a human reads the critique and moves the item to `ready`.

![AI-native delivery — three workflows with human gates between runs](docs/assets/delivery-pipeline.svg)

A change too large to hold in a reviewer's head never ships as one giant pull request. The delivery workflow plans in layers, commits per layer, and raises a dependency-ordered stack of single-concern pull requests with the `gh stack` tooling — reviewed bottom-up, merged base-to-tip. The shakedown then evaluates each layer against its own stack base, consuming the checks the repository already runs (including GitHub Code Quality on its separate Actions path) rather than repeating them. The full doctrine lives in [STACKING.md](skills/developer/deliver/STACKING.md) and [REPO-SETUP.md](skills/developer/deliver/REPO-SETUP.md) — the readiness checklist these skills follow, or set up, in every repository they work on.

This is a research-driven system, and it evolves with the field. The routing rules cite the findings they rest on. The model registry is curated against live provider catalogs on a disclosed schedule, with every change arriving as a reviewable pull request. Structural decisions are recorded as architecture decision records, and a deterministic test harness — 53 checks and growing — keeps the documentation, the policies, and the workflows honest as the practices they encode keep moving.

## Choose your altitude

The same gates, contracts, and evidence serve every rung of a career; what changes is the question each persona asks of them.

![One system, every altitude — from first job to the C-suite](docs/assets/persona-ladder.svg)

### For leaders — CIO · CDAIO · CTO

This model gives a concrete answer to a question that is often left vague: who is accountable when an AI agent acts. Every consequential decision has a named human owner and a service-level agreement, not an unspecified "human in the loop." Every agent action traces back to an approved PRD, a recorded governance tier, and an audit trail, rather than a chat transcript someone might reconstruct after the fact. Model selection follows a registry that is reviewed on a schedule and checked in continuous integration. For a CTO, the delivery pipeline is what AI-native throughput looks like without giving up review quality: stacked, reviewable pull requests and a sandboxed shakedown on every one. For a CDAIO or CIO, the governance overlay turns responsible-AI frameworks into work items with tests. Start at [wiki/Architecture-Role-Journey.md](wiki/Architecture-Role-Journey.md) and [skills/developer/responsible-ai-governance](skills/developer/responsible-ai-governance/SKILL.md).

### For architects and engineering managers

The routing rule underneath the gates is simple to state and consistently applied: route on whether an outcome can be verified, not on how difficult a task appears. See [wiki/Architecture-Loop-vs-Graph.md](wiki/Architecture-Loop-vs-Graph.md) for the full rule. A model is assigned per task, not per project. A single writer holds each checkout, with a separate verifier wherever one agent grading its own work would be a conflict of interest. Delegation happens through a work-item contract precise enough that anyone picking it up cold — a person or an agent — can act on it correctly; see [wiki/Architecture-Agentic-Pods.md](wiki/Architecture-Agentic-Pods.md).

### For developers

To install the skills and start using them:

```bash
npx skills@latest add rahulnakmol/skills
./scripts/install-adapters.sh
```

From there: run `/impact` to turn a raw idea into a PRD that has been through the grill loop, run `/sdlc` to carry out a gated build against it, and run `/shakedown <PR#>` to have any pull request built, tested, and reviewed by an agent in an isolated sandbox before merge. `scripts/pipeline.sh` drives the full assess-deliver-shakedown pipeline on either engine. Per-tool setup for Claude Code, OpenCode, Codex, Cursor, and GitHub Copilot is at [wiki/Tool-Guidance.md](wiki/Tool-Guidance.md) and [wiki/Installation.md](wiki/Installation.md).

### Starting out

If you are early in your career, this system is a method you can learn from, not just a toolset. The gates teach a discipline that took the industry decades to name: critique a work item before you build it, make acceptance criteria machine-checkable, keep one concern per pull request, and treat evidence — a passing check, a verified finding — as the only currency of "done." Begin with [wiki/Skill-Impact.md](wiki/Skill-Impact.md) to see how an idea becomes a plan, then follow one work item through [wiki/Architecture-Agentic-Pods.md](wiki/Architecture-Agentic-Pods.md) to see how a plan becomes reviewed, running code.

## Install

```bash
npx skills@latest add rahulnakmol/skills
./scripts/install-adapters.sh
```

Adapters are idempotent; use `./scripts/install-adapters.sh --dry-run` to preview.

## Skills index

Every skill has a wiki page covering what it is, how to use it, and its best practices. The full index with one-line purposes is at [wiki/Home.md](wiki/Home.md).

| Skill | Group | Invocation | Purpose |
|-------|-------|------------|---------|
| [orchestrate](skills/developer/orchestrate/SKILL.md) | developer | model | Choose loop/graph/hybrid execution, assign a model per node, map to harness adapters |
| [model-routing](skills/developer/model-routing/SKILL.md) | developer | model | Resolve the tier and role assignment for a task node from the canonical registry |
| [update-models](skills/developer/update-models/SKILL.md) | developer | user | Research provider catalogs and propose an evidence-backed registry update |
| [impact](skills/developer/impact/SKILL.md) | developer | user | Idea-to-PRD pipeline: grill loop, value probing, governance-tier recording, backlog handoff |
| [recon](skills/developer/recon/SKILL.md) | developer | model | Brownfield codebase brief via signal-first archetype triage, read-only |
| [slice](skills/developer/slice/SKILL.md) | developer | model | Decompose a signed PRD into epics, features, stories, and operability items |
| [raise](skills/developer/raise/SKILL.md) | developer | model | Publish sliced backlog to GitHub or Linear with pickup-protocol labels |
| [sdlc](skills/developer/sdlc/SKILL.md) | developer | user | Full gated SDLC loop — SPEC-TS ledger, human gates, verifier challenge |
| [architect](skills/developer/architect/SKILL.md) | developer | mixed | Cross-cutting technical design and ADRs at the design gate |
| [safeguard](skills/developer/safeguard/SKILL.md) | developer | mixed | Security assessment and hardening at the secure-DevOps gate |
| [deliver](skills/developer/deliver/SKILL.md) | developer | mixed | CI/CD, supply chain, release readiness, stacked PRs, and repo setup |
| [assure](skills/developer/assure/SKILL.md) | developer | mixed | Quality and maintainability assurance |
| [operate](skills/developer/operate/SKILL.md) | developer | mixed | SLOs, instrumentation, and incident readiness |
| [maintain](skills/developer/maintain/SKILL.md) | developer | mixed | Patch cadence and technical-debt burn-down |
| [shakedown](skills/developer/shakedown/SKILL.md) | developer | user | Sandbox build, test, execute, and agent-reviewed pass on any pull request before merge |
| [ask-fde](skills/developer/ask-fde/SKILL.md) | developer | user | Router mapping intent to the correct developer or branding skill |
| [responsible-ai-governance](skills/developer/responsible-ai-governance/SKILL.md) | developer | overlay | Regulated-industry and responsible-AI governance applied on top of the stack rules |
| [press](skills/branding/press/SKILL.md) | branding | user | Render a signed-off PRD to a branded PDF for stakeholders |

Writing and productivity are charter-only in this release — see [skills/writing/README.md](skills/writing/README.md) and [skills/productivity/README.md](skills/productivity/README.md).

## Validation

```bash
node scripts/validate.mjs
node scripts/run-tests.mjs
```

## License

Apache-2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).
