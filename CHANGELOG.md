# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2.0

### Minor Changes

- 21d1230: Initial public release: the SDLC skill fleet, the impact pipeline, five-tool adapters, and the model registry.
- d71aa54: The Set the Frontier uplift. Model-policy enforcement now covers the adapters as well as the registry, not the registry alone. The model registry carries a machine-readable block that continuous integration checks against the adapters' actual bindings. The `update-models` workflow now runs a genuine, disclosed research process rather than opening a placeholder pull request. The judgment layer — the grill loop, the value lenses, the orchestration rubric, the work-item contract, the PRD template, and the operability lane — is written out to full depth rather than left as a stub. Human nodes are first-class citizens in `orchestrate`, each with a named owner and a service-level agreement. Governance is wired through `impact`, `slice`, and every work item they produce, rather than left as an unused overlay. A deterministic test harness, plus behavior smoke tests gated on an API key, cover every change in this release. The README and the wiki are rewritten to serve every reader, from a first-time contributor to a CIO, CDAIO, or CTO.

### Added

- A deterministic test harness (`node scripts/run-tests.mjs`) covering model-policy allowlist enforcement, model-registry and adapter consistency, judgment-doc structure and depth, the orchestrate human-node and governance-weave contracts, and README and wiki structure.
- Key-gated behavior smoke tests (`test/behavior/`) for the grill loop and the pickup protocol, plus a manual shakedown runbook, run through a `workflow_dispatch`-only `behavior.yml`.
- In `orchestrate/GRAPH.md`, a first-class `human` node type — owner, decision, inputs, `sla_hours`, escalation — alongside `agent` nodes. A high-consequence write now routes through a named human decision, not a bare stop condition.
- A governance weave: `slice` reads the PRD's risk and governance tier and calls `responsible-ai-governance` when that tier is `limited` or `high`, populating the Governance section and the governance-lane items in every affected work item.
- `scripts/check-registry-freshness.mjs` and a real `update-models.yml` research job, run through `anthropics/claude-code-action`, gated on an API key, and always merged by a person. This replaces the earlier placeholder-PR automation.
- A dev/main branch policy: every merge is a squash merge, both branches are protected, and a `branch-flow-guard.yml` check requires that any pull request into `main` come from `dev`.
- A real release process: `release.yml` now runs `changesets/action` on every push to `main`, opening a Version Packages pull request when changesets are pending, and tagging a release with generated notes once one merges.
- A voice-and-tone guide, in `.agents/writing-docs.md` and `AGENTS.md`, that applies to every document in this repository: simple American English, formal and professional, in the style of a fact-based news explainer, never an opinion column.

### Changed

- `scripts/validate.mjs` now scans `adapters/` for allowlist violations and stale pre-port doc pointers, not only `models.md`.
- `skills/developer/model-routing/models.md` is rewritten to match the model generation the adapters actually ship, with a fenced, machine-readable JSON block that continuous integration checks against the real adapter bindings.
- Three adapters (`quick`, `work-k3`, `work-glm`) are re-bound from non-allowlist shipped defaults to `claude-sonnet-5`; their original bindings remain available only as documented user overrides.
- `impact/GRILL.md`, `impact/VALUE.md`, `impact/PRD-TEMPLATE.md`, `impact/GATES.md`, `orchestrate/RUBRIC.md`, `slice/WORK-ITEM-CONTRACT.md`, and `slice/OPERABILITY.md` are written out to full doctrinal depth; previously, each was a short stub.
- `README.md` and the wiki are rewritten thesis-first, with an audience path running from CIO, CDAIO, and CTO readers through architects and engineering managers to developers, replacing an earlier version organized around an install command.
- `package.json`'s `name` field is changed to `rahulnakmol-skills`, matching the identity already used in `.claude-plugin/plugin.json` and in the changesets that describe this project's releases.

### Fixed

- Thirty adapter files carried stale `SDLC_METHOD.md` and `SDLC_LOOP.md` pointers left over from an earlier port; they now point to the `sdlc` skill's `METHOD.md` and `LOOP-CONTRACT.md`.
- A `node --test` invocation using a quoted glob pattern failed on the Node version GitHub Actions runs; replaced with `scripts/run-tests.mjs`, which enumerates test files directly and passes them as explicit arguments.

## 0.1.0

### Added

- The initial scaffold: the developer, branding, writing, and productivity skill groups.
- OpenCode adapters, for agents and commands, and `tools/opencode-workflows`.
- Install and validation scripts, continuous integration workflows, and the wiki's source content.
- A model registry with published defaults from Anthropic, OpenAI, and Google.
