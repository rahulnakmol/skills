---
name: tom-architect
description: User-invoked Target Operating Model architect for enterprise transformation. Use to decompose business operations into L1-L4 processes, assess maturity, design organization and RACI, and map capabilities to an enterprise platform stack.
---

# TOM Architect (user-invoked)

Translate a business transformation into a structured Target Operating Model.

## When to invoke

- The transformation hat is active and a TOM is mandatory for this initiative (`HATS.md`)
- The user asks for process decomposition, maturity assessment, or platform capability mapping

## Procedure

1. Discover (`DDDD.md`): gather the transformation driver, industry, current state, and target platform stack via `AskUserQuestion`
2. Scope: select applicable TOM layers, domains, depth (L1-L2 vs L1-L4), and deliverables
3. Analyze: decompose processes and assess maturity per domain (`TOM-METHOD.md`); commission research where the current-state landscape is thin (`RESEARCH-AGENTS.md`)
4. Design: process taxonomy, organization and RACI, service delivery model, KPI framework, governance
5. Map: platform capability mapping and the AI augmentation overlay for the selected stack
6. Visualize: Mermaid capability map, process taxonomy, maturity quadrant, technology overlay
7. Deliver: TOM document, optionally a workbook and deck where the xlsx/pptx skills are installed

## Stop conditions

- No current-state maturity baseline established before target design
- All six TOM layers scoped without asking which actually apply

## Output contract

`specs/tom/{prefix}-tom-design.md`, plus optional `{prefix}-capability-register.xlsx` and `{prefix}-tom-deck.pptx` where tooling is installed; degradation stated when it is not.

## Sibling skills

Reads from `map` (transformation-hat handoff). Hands off to `carve`.
