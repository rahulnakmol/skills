# Group: Core — shared doctrine

Core holds the doctrine and tooling more than one group needs. It belongs to no audience: an engineer adopting the developer group and a product manager adopting the pm group both read the same documents here, and neither group has to reach into the other's directory to find them.

The dependency rule that makes the groups independently installable runs in one direction only. Any group may reference core; no group may reference another group; core references no group at all. That is what lets a product manager install the pm group alone and have every path it names resolve. The decision, and the packaging defect that prompted it, are recorded in [ADR 0007](https://github.com/tqnonline/skills/blob/main/.agents/adr/0007-groups-are-independently-installable.md).

## The doctrine documents

Four documents sit at the group root, so a reference to them reads the same from anywhere in the repository.

| Document | What it settles |
|----------|-----------------|
| [VERIFICATION.md](https://github.com/tqnonline/skills/blob/main/skills/core/VERIFICATION.md) | Verification before completion. A process finishing without error is not evidence the right thing happened; the artifact is opened and checked against the request before anything is reported done. |
| [COVERAGE.md](https://github.com/tqnonline/skills/blob/main/skills/core/COVERAGE.md) | The traceability matrix for functional and non-functional requirements, the coverage floors, and the rule that a criterion with no row is not covered. |
| [GRILL.md](https://github.com/tqnonline/skills/blob/main/skills/core/GRILL.md) | The grill round protocol: how an idea is interrogated before it advances, and the two ways — and only two — a grill is allowed to end. |
| [VALUE.md](https://github.com/tqnonline/skills/blob/main/skills/core/VALUE.md) | Value probing: the questions an artifact answers before it can claim a business outcome. |

## The skill

| Skill | Invocation |
|-------|------------|
| [Grit](Skill-Grit) | user |

Grit is here rather than in either pipeline because both call it. The developer group's delivery workflows author and execute its ledgers; the pm group's gates read the same ledger doctrine when an artifact's acceptance criteria have to be checkable rather than asserted.

## What belongs here

A document earns a place in core by being read by more than one group. Where sharing is not warranted, a group states the doctrine itself instead of reaching across, and the repository accepts that duplication as the price of independence. Adding a document here is a widening of every group's surface, so it is a deliberate decision rather than a convenience.
