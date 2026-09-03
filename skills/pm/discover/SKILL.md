---
name: discover
description: User-invoked business problem discovery and root-cause analysis for product and program managers. Use to turn a raw problem, meeting notes, or a vague opportunity into a structured, stakeholder-grounded analysis before solution design.
---

# Discover (user-invoked)

Turn a raw business problem into a structured analysis: stakeholders, root causes, classification, success criteria.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo]
  scope: owns
  trace: root-cause
```

## When to invoke

- A new business problem, opportunity, or transformation candidate needs structured investigation
- The user arrives with meeting notes, a transcript, or raw data rather than a clean brief

## Procedure

1. Discover phase per `DDDD.md`: verify or bootstrap the initiative repository substrate (`INITIATIVE-REPO.md`)
2. Classify the hat — product or transformation — from the shape of the problem; ask only if genuinely ambiguous (`HATS.md`)
3. Accept raw inputs and commission research where the evidence in hand is thin (`RESEARCH-AGENTS.md`)
4. Clarify across the five dimensions and find root cause (`METHOD.md`), questioning in themed rounds by the grill's round protocol (`grill`)
5. Classify the initiative type and confirm with the user
6. Write the analysis document and suggest `map` as the next step

Append the trace entry under the `root-cause` kind: the intermediate causes ruled out on the way to the root, the sources that disagreed and how the disagreement was settled, and the initiative type the decision tree excluded. The analysis records the causes that survived.

## Stop conditions

- More than four rounds of clarification without synthesizing — analyze what is in hand
- A problem statement that is actually a solution in disguise

## Output contract

`specs/{prefix}-analysis.md`: problem statement, stakeholder register, classification, root causes, constraints, success criteria, entry mode, next step.

## Sibling skills

Hands off to `map`. Reads the applicable `constitution` chain before drafting.
