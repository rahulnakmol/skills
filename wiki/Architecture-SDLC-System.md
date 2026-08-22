# Architecture: SDLC system

The gated delivery system [SDLC](Skill-SDLC) runs, and the specialist charters ([Architect](Skill-Architect), [Safeguard](Skill-Safeguard), [Deliver](Skill-Deliver), [Assure](Skill-Assure), [Operate](Skill-Operate), [Maintain](Skill-Maintain)) plug into.

**SPEC-TS ledger** — Scope, Product requirements, Engineering constraints, Components, Trade-offs, Success metrics. Built and maintained across the whole journey, from the PRD in [Impact](Skill-Impact) through to Gate 3 evidence at release. Full field-by-field detail in [METHOD.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/METHOD.md).

**Gates** — ordered, with explicit evidence requirements and stop states at each one; a human gate stops the loop until an explicit approval lands, never advances on silence. Full gate order and the loop's termination taxonomy in [LOOP-CONTRACT.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md).

**Agent roster** — the specialist charters above are thin; their executable detail lives in `adapters/opencode/agents/` and `adapters/claude/agents/`, resolved per-node by [Model routing](Skill-Model-Routing). See [Architecture: Agentic pods](Architecture-Agentic-Pods) for how a work item actually gets delegated to one.

**Workflow runner** — `tools/opencode-workflows/` carries the deterministic DAG templates (`review.json`, `assure.json`, `deliver.json`, `maintenance.json`, `design.json`) a headless run executes against, with its own test suite in `tools/opencode-workflows/test-runner.mjs`.
