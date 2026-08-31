# Architecture: SDLC system

Full documentation for every skill: https://tqnonline.github.io/skills/.

This page describes the gated delivery system that the [SDLC](Skill-SDLC) skill runs, and that the specialist charters — [Architect](Skill-Architect), [Safeguard](Skill-Safeguard), [Deliver](Skill-Deliver), and [Operate](Skill-Operate) — plug into.

The system is built on a single record called the SPEC-TS ledger: Scope, Product requirements, Engineering constraints, Components, Trade-offs, and Success metrics. This ledger is built once and maintained across the whole journey, starting with the PRD in [Impact](Skill-Impact) and continuing through the evidence recorded at the final release gate. The field-by-field detail is in [METHOD.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/METHOD.md).

The delivery gates are ordered, and each one has an explicit evidence requirement and a defined stop state. A human gate holds the loop until an explicit approval is recorded; it does not advance on silence. The full gate order and the loop's set of termination states are in [LOOP-CONTRACT.md](https://github.com/tqnonline/skills/blob/main/skills/developer/sdlc/LOOP-CONTRACT.md).

The specialist charters listed above are intentionally short. Their executable detail lives in `adapters/opencode/agents/` and `adapters/claude/agents/`, and the model assigned to each one is resolved by [Model routing](Skill-Model-Routing). See [Architecture: Agentic pods](Architecture-Agentic-Pods) for how a work item is actually delegated to one of these agents.

A deterministic workflow runner, in `tools/opencode-workflows/`, carries a set of directed-acyclic-graph templates — `review.json`, `assure.json`, `deliver.json`, `maintenance.json`, and `design.json` — that a headless run executes against. That runner has its own test suite in `tools/opencode-workflows/test-runner.mjs`.
