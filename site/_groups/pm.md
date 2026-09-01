---
layout: group
name: pm
group: pm
title: "Product and Program Management"
description: "The pm group runs the product-management pipeline from a raw problem to a delivered, measured benefit, gated by four human sign-off points."
---

The pm group carries a product-management practice from a raw problem to a delivered, measured benefit, in the same four-gate shape the developer group uses one level up the business stack: Framing, Investment, Quality, and Commitment. Sixteen skills cover discovery and root-cause analysis, target operating model design for transformation initiatives, epic decomposition, PRD drafting and review, business casing, roadmapping, and the reporting that closes the loop back to what was actually delivered.

PMs and transformation leads who run agent-assisted discovery, business cases, target operating models, or PRDs install this group on its own. It depends only on `core`, never on the developer group's skills, so a pm practice can run its pipeline without pulling in software delivery tooling it does not need.

`discover` and `map` open the pipeline and produce the Business Understanding Document the Framing gate signs. `carve` or `tom-architect` then turn that document into epics or a target operating model, depending on which hat the initiative wears. `prd-draft` writes and structurally validates the resulting requirements before the Quality gate, and `constitution` keeps every downstream draft answering to the same principles and prioritization framework. Before any of these runs more than one round, `arrange` decides whether the work converges as a grill loop, a parallel research fan, or a hybrid, and `chart` holds the plan when an initiative is too large for a single pass. Every gate opens with the blind-spot review named in `AGENT-OWNERSHIP.md`, and the evidence-ledger discipline carried over from the developer group is documented in `GATES.md`.

Readers who do not have the skill pack installed can add it first:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
