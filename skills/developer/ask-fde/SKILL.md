---
name: ask-fde
description: User-invoked skill router. Maps intent to the correct developer or branding skill. Use when unsure which skill to run.
---

# Ask FDE (user-invoked)

Route user intent to the right skill in this monorepo.

## When to invoke

- User asks "which skill" or describes a goal without naming a skill

## Procedure

1. Classify intent: inception | backlog | build | secure | operate | branding | product/program/transformation
2. Map to skill:
   - product, program, or transformation management intent → `ask-pm`
   - inception → `impact` (+ `recon` if brownfield)
   - backlog → `slice` → `raise`
   - build → `orchestrate` / `sdlc`
   - design → `architect`
   - security → `safeguard`
   - release → `deliver` + `shakedown`
   - quality → `assure`
   - production → `operate` / `maintain`
   - models → `update-models` / `model-routing`
   - governance → `responsible-ai-governance`
   - PDF → `press`
3. `Call the Skill tool` with chosen name

## Stop conditions

- Ambiguous → ask one clarifying question, then route

## Output contract

Chosen skill name + one-sentence rationale.
