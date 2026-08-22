# Changelog

## 0.2.0

### Minor Changes

- 21d1230: Initial public release v0.1.0: SDLC skill fleet, impact pipeline, five-tool adapters, model registry.
- d71aa54: Set the Frontier uplift: end-to-end model-policy enforcement (adapters + CI, not just the registry), a canonical model registry with a machine-readable block that CI diffs against actual adapter bindings, an honestly-automated `update-models` workflow (no more placeholder PRs), the judgment layer (grill loop, value lenses, orchestration rubric, work-item contract, PRD template, operability lane) authored to full depth, human nodes as first-class citizens in `orchestrate` with named owners and SLAs, governance wired through `impact` → `slice` → work items instead of left as an orphaned overlay, a deterministic test harness (`node --test`) plus key-gated behavior smokes covering every recommendation, and a thesis-led README/wiki serving every altitude from first clone to CIO/CDAIO/CTO.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Deterministic test harness (`node --test "test/**/*.test.mjs"`) covering model-policy allowlist enforcement, model-registry/adapter consistency, judgment-doc structure and depth, orchestrate human-node and governance-weave contracts, and README/wiki thesis structure
- Key-gated behavior smoke tests (`test/behavior/`) for the grill loop and the pickup protocol, plus a manual shakedown runbook, wired into a `workflow_dispatch`-only `behavior.yml`
- `orchestrate/GRAPH.md`: a first-class `human` node type (owner, decision, inputs, `sla_hours`, escalation) alongside `agent` nodes — high-consequence writes now route through a named human decision, not a bare stop condition
- Governance weave: `slice` reads the PRD's risk and governance tier and calls `responsible-ai-governance` when `limited`/`high`, populating the Governance section and governance-lane items in every affected work item
- `scripts/check-registry-freshness.mjs` and a real `update-models.yml` research job (via `anthropics/claude-code-action`, key-gated, human-merged) — replacing the previous placeholder-PR automation

### Changed

- `scripts/validate.mjs` now scans `adapters/` for allowlist violations and stale pre-port doc pointers, not just `models.md`
- `skills/developer/model-routing/models.md` rewritten to match the model generation adapters actually ship, with a fenced machine-readable JSON block CI checks against real adapter bindings
- Re-bound three adapters (`quick`, `work-k3`, `work-glm`) from non-allowlist shipped defaults to `claude-sonnet-5`; their original bindings survive only as documented user overrides
- `impact/GRILL.md`, `impact/VALUE.md`, `impact/PRD-TEMPLATE.md`, `impact/GATES.md`, `orchestrate/RUBRIC.md`, `slice/WORK-ITEM-CONTRACT.md`, `slice/OPERABILITY.md` authored to full doctrinal depth (previously stubs)
- `README.md` and `wiki/Home.md` rewritten thesis-first with an audience ladder (CIO/CDAIO/CTO → architects/EMs → developers), replacing an install-command-led inventory

### Fixed

- 30 adapter files carried stale `SDLC_METHOD.md`/`SDLC_LOOP.md` pointers from the original port; now point at the `sdlc` skill's `METHOD.md`/`LOOP-CONTRACT.md`

## [0.1.0] - Unreleased

### Added

- Initial scaffold: developer, branding, writing, and productivity buckets
- OpenCode adapters (agents, commands) and `tools/opencode-workflows`
- Install and validation scripts, CI workflows, wiki source
- Model registry with Anthropic, OpenAI, and Google published defaults
