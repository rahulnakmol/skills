# Core group — shared doctrine

One promoted skill and four doctrine documents: the material more than one group needs, held in a group that belongs to no audience. Every other group may reference `core`; `core` references no group in return, which is what keeps any single group installable on its own.

The doctrine documents sit at the group root, so a reference reads the same from anywhere in the repository:

- `VERIFICATION.md` — verification before completion. A process finishing without error is not evidence the right thing happened; open the artifact and check it against the request.
- `COVERAGE.md` — the FR/NFR traceability matrix and the coverage floors, one row per acceptance criterion.
- `GRILL.md` — the grill round protocol: how an idea is interrogated before it advances, and the two ways a grill is allowed to end.
- `VALUE.md` — value probing, the questions an artifact answers before it can claim a business outcome.

The one skill is `grit`, the acceptance-gate ledger: written before implementation, checked by runnable gates, and closed with an audit of what was met, unmet, or abandoned. Both the developer and pm pipelines call it, which is why it is here rather than in either of them.

Doctrine earns a place in this group by being read by more than one group. Where sharing is not warranted, a group states the doctrine itself rather than reaching across; the repository accepts that duplication as the price of independence. See `.agents/adr/0007-groups-are-independently-installable.md`, the root README, and wiki/Group-Core.md.
