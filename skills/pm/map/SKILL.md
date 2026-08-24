---
name: map
description: Model-invoked persona mapping, process-flow diagramming, and Business Understanding Document assembly. Use after discover hands off a completed analysis, to produce personas, current/target Mermaid flows, and the document the Framing gate signs.
---

# Map (model-invoked)

Turn a discovery analysis into personas, process flows, and the Business Understanding Document.

## When to invoke

- `discover` has produced `specs/{prefix}-analysis.md`
- The user asks for persona mapping, process flows, or a swimlane/BPMN diagram

## Procedure

1. Define phase per `DDDD.md`: read the analysis file; extract problem statement, stakeholders, classification, root causes, entry mode
2. Build three to six named persona profiles — end-user personas under the product hat, organizational-actor personas with RACI under the transformation hat
3. Generate current-state and target-state Mermaid process flows, pain points in red, improvements in green
4. Apply visual compression before finalizing any figure — one figure, one claim (`VISUALS.md`)
5. Assemble the Business Understanding Document the Framing gate signs (`GATES.md`)
6. Route the handoff: product hat → `carve`; transformation hat → `tom-architect`

## Stop conditions

- No analysis input available — run `discover` first
- Process flows with no defined persona behind them

## Output contract

`specs/{prefix}-understanding-doc.md`: executive summary, problem statement, personas, classification, current/target state with embedded Mermaid, constraints, success criteria, assumptions and risks, recommended epics, appendix.

## Sibling skills

Reads from `discover`. Hands off to `carve` or `tom-architect`.
