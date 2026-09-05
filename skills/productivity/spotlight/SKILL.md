---
name: spotlight
description: Turns established context into the smallest source-grounded visual that helps a human understand or decide. Use when asked to visualize a flow, structure, relationship, comparison, or proposed change. Where the tool renders charts or diagrams inline, render through it; this skill chooses the one view and keeps the sources beside it.
---

# Spotlight (user-invoked)

Put one decision-relevant structure in view without turning polish into proof.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  scope: guest
  trace: none
```

## When to invoke

- The user asks to spotlight, visualize, diagram, sketch, or walk through the current topic
- A flow, hierarchy, ownership boundary, comparison, or proposed change is harder to follow in prose
- A reviewer needs one view that exposes the decision rather than a complete system map
- The current explanation is sound, but its structure is not visible

## Procedure

1. State the question the view must answer and the decision it informs. A visual with no question accumulates detail because it has no stopping point.
2. Establish the source before drawing. Read the relevant code or document when available. Treat a user's supplied statement as supplied evidence, not as an observed implementation.
3. Classify each material claim as **observed**, **inferred**, or **proposed**. Do not let styling erase the difference.
4. Read `VIEWS.md` and choose the smallest form that carries the claim: pseudocode, call tree, component or file tree, diagram, diff, full block, or focused HTML.
5. Keep one view to one claim and one abstraction level. Split the view when a second claim matters; remove detail that does not change the answer.
6. Put source references beside the labels they support. State assumptions and unknowns where the reader encounters them, not in a distant disclaimer.
7. Prefer an inline, portable view. Read `ARTIFACTS.md` only when the user needs a standalone artifact or the subject is too dense or interactive for an inline view.
8. Inspect the result against its sources and question. Render a visual artifact and exercise its representative states before calling it verified.
9. Return the view with its claim, status, sources, deliberate omissions, unknowns, and verification result. The human makes the decision; the visual does not make it for them.

## Stop conditions

- The source is missing or contradictory → ask for it, inspect it, or label the view proposed; never fill the gap with a polished guess
- Two claims or abstraction levels compete for the same view → split them and lead with the one tied to the current decision
- The user needs evidence of behavior rather than an explanation of structure → stop at the boundary; a diagram is not an execution result
- A proposed state could be mistaken for the current state → label both directly in the view before sharing it
- A standalone artifact cannot be rendered or inspected → report it as unverified and do not claim visual correctness
- The view would expose a secret or unrelated private context → redact or omit it and name the omission

## Output contract

```yaml
question: <what this view answers>
decision: <the human decision it informs, or none>
claim: <the one claim carried by the view>
status: observed | inferred | proposed | mixed
format: pseudocode | call-tree | component-tree | file-tree | diagram | diff | full-block | html
view: <inline visual or artifact path>
sources:
  - ref: <file:line, document section, or user-supplied statement>
    supports: <label or relationship>
omitted: [<detail deliberately outside this view>]
unknowns: [<fact the sources do not establish>]
verified: <what was inspected or exercised, or unverified with reason>
```

The output carries its own provenance and omissions, so `trace: none` does not discard the reasoning a later reader needs. A richer artifact may carry the same fields in a visible source note.

## Sibling skills

- `wait-what` — use when an explanation failed and its cause must be diagnosed before choosing another route
- `teach` — use when the reader lacks a prerequisite and needs to apply the concept, not merely see its shape
- `core/VERIFICATION.md` — requires opening the actual artifact rather than inferring success from its source
- `core/TRACE.md` — defines why an output that preserves its sources, omissions, and unknowns needs no second record
