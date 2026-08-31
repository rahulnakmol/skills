---
layout: group
name: core
group: core
title: "Core: Shared Doctrine Every Group May Read"
description: "Core holds the doctrine and the one skill more than one group needs, so both the developer and pm groups can reference it without depending on each other."
---

Core holds the material that belongs to no single audience: four doctrine documents and one skill, `grit`, that more than one other group reads. An engineer adopting the developer group and a product manager adopting the pm group both read the same rule for verification before completion, the same coverage floors, the same grill round protocol, and the same value-probing lenses — neither has to reach into the other's directory to find them. A document earns a place here only by being read by more than one group; where sharing is not warranted, a group states its own doctrine instead, and the repository accepts the resulting duplication as the price of keeping every group independently installable.

The dependency rule that makes that independence possible runs one way. Any group may reference core, and core references none of them — a rule enforced by the test harness, not left to review discipline. That is what lets the pm group, for instance, install on its own and have every path it names still resolve. `grit` sits here rather than inside either pipeline because both call it: the developer group's delivery workflows author and run its acceptance-gate ledgers, and the pm group's gates read the same ledger doctrine wherever an artifact's acceptance criteria have to be checkable rather than asserted.

Most readers meet core through another group rather than installing it directly — a reference in `sdlc`, `deliver-work-item`, or `report` pulls its doctrine in automatically. Installing the full pack, or any group that names core, brings its four documents and its one skill along:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
