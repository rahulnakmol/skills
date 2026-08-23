# Changelog

## 0.3.1

### Patch Changes

- 79b3bc5: Documentation narrative uplift. The README now opens as what the repository is — the skills Rahul Nakmol has built, all carrying one philosophy, "Set the frontier: redefining growth with human judgment and trusted AI agents" — then walks skill groups, the developer journey, AI-native delivery with the grill's fact-finding discipline at every stage, and a persona ladder from a first job to CTO, CDAIO, and CIO, illustrated by four new SVG diagrams in `docs/assets/`. The wiki gains a Personas page, a Tool-Guidance page covering Claude Code, OpenCode, Codex, Cursor, and GitHub Copilot, and every one of the 18 skill pages becomes a full spec with "How to use" and "Best practices" sections. Five new harness tests keep the diagrams, the ladder, the tool guidance, and the per-skill spec structure in place.

### Added

- Four SVG diagrams in `docs/assets/` — the Set-the-frontier thesis, the operating model with its four human gates, the AI-native delivery pipeline, and the persona ladder — embedded in the README and the wiki.
- A wiki Personas page walking the ladder from a first job through architect and CTO to CDAIO and CIO, and a Tool-Guidance page covering Claude Code, OpenCode, Codex, Cursor, and GitHub Copilot, including the degradation ladder that preserves human gates in every tool.
- "How to use" and "Best practices" sections on all 18 skill wiki pages, making each page a full spec: what the skill is, how to invoke it, and the practices its doctrine requires.
- Five harness tests (`test/structure/docs-uplift.test.mjs`) keeping the diagrams, the persona ladder, the tool guidance, and the per-skill spec structure in place.

## 0.3.0

### Minor Changes

- 49336a0: The delivery pipeline as executable orchestration. Three Claude Code dynamic workflows ship with the plugin — `assess-work-item` (perspective-diverse pickup critique, adversarially verified, posted to GitHub or Linear), `deliver-work-item` (refuses items not at `ready`; plans in layers, implements as a single writer, verifies in a bounded fix loop, raises one PR or a `gh stack` of reviewable layered PRs), and `shakedown-pr` (sandbox build-test-execute, three verified review lenses, stack-aware, consumes existing check runs including GitHub Code Quality, blocks on red). OpenCode gains parity templates (`assess`, `shakedown`) for its deterministic runner. `scripts/pipeline.sh` launches any stage on either engine, headless or interactively. `pr-shakedown.yml` becomes a real key-gated headless Action, dispatch-only by default. New stacked-pull-request doctrine in `deliver/STACKING.md`, and a repository-setup doctrine in `deliver/REPO-SETUP.md` that the SDLC skills follow or set up in every repository they work on: GitHub Code Quality on its separate Actions path, `gh stack` tooling, pickup-protocol labels, and the shakedown workflow — verified by `sdlc` and `deliver`, bootstrapped as first-epic stories by `slice` on greenfield projects. Twelve new harness tests lock all of it in.

### Added

- Three Claude Code dynamic workflows, shipped with the plugin under `adapters/claude/workflows/` and namespaced as `/rahulnakmol-skills:<name>`: `assess-work-item` runs the pickup critique with three perspective-diverse critics and adversarial verification, then posts one consolidated critique to GitHub or Linear; `deliver-work-item` refuses any item not at `ready`, plans in layers, implements as a single writer in an isolated worktree, verifies with a separate agent in a bounded fix loop, and raises one pull request or a `gh stack` of layered pull requests; `shakedown-pr` builds, tests, and executes a pull request in a sandbox, reviews it through three adversarially verified lenses, and submits a review that blocks on a red run. Human gates sit between the workflows, matching the pickup-protocol state machine.
- Stacked-pull-request doctrine in `skills/developer/deliver/STACKING.md`: a change spanning more than one concern, or too large for one review, ships as a dependency-ordered stack of single-concern pull requests, reviewed bottom-up and merged base-to-tip with the `gh stack` tooling.
- OpenCode parity templates `assess.json` and `shakedown.json` for the deterministic workflow runner, validated by the runner's own `--validate` under CI.
- `scripts/pipeline.sh`: a dual-engine launcher that runs any pipeline stage through Claude Code (`claude -p`, or interactively) or the OpenCode runner, with `--dry-run` support.
- `pr-shakedown.yml` rewritten from a bare build-and-test snippet into a real, key-gated headless shakedown Action — shipped dispatch-only, so an adopting repository enables per-pull-request triggers as an explicit choice.
- Shakedown and the review lenses now consume a pull request's existing check runs — including GitHub Code Quality, which reports on its own Actions path (`dynamic/github-code-quality/codeql`) separate from code scanning — rather than repeating analysis the repository already receives.
- Repository-setup doctrine in `skills/developer/deliver/REPO-SETUP.md`: the SDLC skills follow, or set up, the delivery prerequisites in every repository they work on — GitHub Code Quality on its separate Actions path, `gh stack` tooling for agents and contributors, the six pickup-protocol labels, and the shakedown workflow. `sdlc` checks the list as a prerequisite, `deliver` verifies it as gate evidence, and `slice` emits the missing items as first-epic bootstrap stories on greenfield projects.
- Twelve new harness tests (`test/structure/delivery-workflows.test.mjs`) covering workflow well-formedness, the plugin manifest's `workflows` field, stacking support, stack-aware shakedown, the repo-setup doctrine and its wiring, template validation, the launcher, and the Action template.

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
