---
layout: group
name: developer
group: developer
title: "Developer"
description: "The developer group runs software delivery from an inherited codebase or a raw idea through a signed PRD, a sliced backlog, a gated build loop, and release."
---

The developer group covers the delivery pipeline end to end: orientation on an existing estate or intake of a new idea, a signed PRD, a decomposed and published backlog, a gated build loop with human approval at every consequential step, technical design, security hardening, release readiness, post-release reliability, and a sandboxed review before merge. Fifteen skills carry that pipeline. Three of them — `recon`, `impact`, and `sdlc` — form the "deliver with evidence" journey that runs from first orientation through a signed release; the rest handle routing, model selection, backlog mechanics, design, security, and operations around it.

Any engineer, orchestrator, or team lead running an AI-assisted build installs this group. It stands on its own: per this repository's group-independence rule, developer may reference the shared `core` group but never another group's skills, so it installs and runs without pulling in the pm, branding, or writing groups.

The skills fit together as a pipeline, not a pile. `conduct` and `model-routing` decide how work should execute and which model tier runs it, with `update-models` keeping that registry current on a disclosed schedule. `recon` and `impact` turn an existing codebase or a raw idea into a signed PRD; `slice` and `raise` turn that PRD into a contract-complete, published backlog. `sdlc` walks a work item through the gated build loop itself, calling `architect`, `safeguard`, `deliver`, and `operate` as the design, security, release, and reliability lanes need them, with `shakedown` reviewing the result in a sandbox before merge. `ask-fde` routes a plain request to whichever of these fits, and `responsible-ai-governance` overlays audit, explainability, and human-checkpoint requirements wherever a PRD's governance tier calls for them.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
