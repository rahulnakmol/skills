# ADR 0006: grit adapts and owns unlazy's scripts, and extends the existing gates

## Status

Accepted

## Context

The repository's verification-before-completion doctrine — `skills/core/VERIFICATION.md` and `COVERAGE.md` — is enforced today as prose plus tests that check those documents for the presence of certain strings. Nothing in the pipeline runs a check and records what it found. The open-source project unlazy (https://github.com/Leonxlnx/unlazy, MIT License, Copyright (c) 2026 Leonxlnx) supplies that missing machinery: an acceptance-gate ledger written before implementation, a runnable check per gate, and evidence recorded when the check runs.

Two existing decisions bear on how this repository can adopt that machinery. `.out-of-scope/0001-no-caveman-vendoring.md` says third-party packs are installed through `skills.manifest.yaml` in dotfiles, never copied into this repo. ADR 0004 says new verification discipline extends the existing gates rather than arriving as a new, fifth gate.

## Decision

**1. Adapt and own, rather than install.** unlazy's scripts are adapted into first-party code this repository maintains and tests, not installed as a third-party pack. They are renamed to this repository's conventions — state directory `.grit`, environment prefix `GRIT_`, approval store `~/.grit/approved` — placed under `skills/core/grit/scripts/`, covered by this repository's test harness, and free to diverge from upstream as the repository's own needs require. Upstream drift is not tracked; a fix or feature added to unlazy after this adaptation does not arrive here automatically. This is a different act from installing a third-party pack through a manifest, the pattern `.out-of-scope/0001` rules out, so that decision is not overridden — it does not apply here. The MIT license permits adaptation and redistribution on these terms; attribution is carried in `NOTICE` and in a header on every adapted file. The trade-off is stated plainly: the repository now owns maintenance of this code, including any security or correctness fix, and will not receive one from upstream without a person doing the port by hand.

**2. The five dimensions are a taxonomy inside the existing gates, not a fifth gate.** `grit` tags each ledger row with one of five dimensions — completeness, accuracy, business value met, efficiency, thoroughness. Following ADR 0004 directly, this taxonomy strengthens the Commitment/Release gate's existing verification doctrine; it does not stand up a fifth named gate alongside Framing, Investment, Quality, and Commitment. The four-gate count and naming are unchanged.

**3. The depth tree governs verification decomposition only.** `grit`'s depth tree — 5 to 10 layers, used to decompose verification for substantial work — decides how finely a piece of work's acceptance criteria are broken into checks. It has no say over execution shape. `conduct` keeps sole authority over whether work runs as a loop, a graph, or a hybrid of the two. A gate is a ledger row, not an agent: deepening a ledger adds checks to verify against, not agents to run the work. A ten-layer depth tree therefore does not conflict with the conduct rubric's "count tokens, not agents" — it can add cost only in checks executed, never in agents spawned on its own authority.

## Consequences

- `NOTICE` carries the attribution for `skills/core/grit/scripts/` and `adapters/claude/hooks/`, naming unlazy, its copyright holder, and its MIT license.
- The four-gate identity — already threaded through the README, the wiki, and the harness — is unchanged; no cascading rename across docs, tests, or diagrams.
- The Claude Code stop hook at `adapters/claude/hooks/` ships opt-in and is never added to the default install path, mirroring how `skills/developer/shakedown/pr-shakedown.yml` ships dispatch-only until a maintainer opts in.
- The repository maintains the adapted code going forward: bugs found in it are fixed here, not upstream, and a future upstream improvement reaches this repository only through a deliberate, human-reviewed re-adaptation.
