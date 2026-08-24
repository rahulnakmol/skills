# The DIVE test

Ported from the source `epic-decompose` skill's core rule: no epic without DIVE validation. Every candidate epic passes all four criteria before it enters the manifest, or it gets split or rejected — an epic manifest is not a wish list, it is a set of commitments a sponsor is about to approve.

## Deliverable

An epic must have a concrete, shippable outcome — something that can actually ship as a standalone release, not a workstream that only makes sense bundled with three other epics. If an epic cannot be pointed to as a thing that shipped, it is scope, not an epic.

## Independent

An epic can be developed and released without waiting on another epic. An epic that fails Independent is usually not a bad epic, it is two epics that have not yet been separated — split it rather than accepting a hidden dependency chain the manifest never states out loud.

## Valuable

An epic delivers measurable value to at least one named persona. "All users" is not a persona, and an epic that cannot name who benefits has not actually been scoped yet — it has been assumed.

## Estimable

The team can assign a rough effort range to the epic as scoped. An epic too large or too vague to estimate is a program pretending to be an epic — more than eight epics in one manifest is itself a signal the scope in front of you is a program, and that should be escalated to the user rather than quietly decomposed further.
