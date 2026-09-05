# Grill loop protocol

The grill is where an idea earns the right to become a PRD. It is a relentless, constructive back-and-forth with the user — never a survey, never a rubber stamp. Nothing enters `slice` that has not been grilled, and nothing survives grilling that cannot state its own business value.

## Round protocol

Each round is short, sharp, and themed. Ask **3–5** questions per round, drawn from one dominant theme — scope, business value, customer experience, or risk — rather than scattering across all four at once; a themed round produces sharper answers than a scattergun one. Record every answer immediately in the PRD draft as it arrives; never defer capture to "later," because the grill is the record, not a precursor to one.

At the end of each round, restate the sharpened scope back to the user in three sentences or fewer. This restatement is the checkpoint: it forces the grill to converge rather than wander, and it gives the user an explicit moment to correct course before the next round begins. Close every round with the same three-way choice, asked plainly: continue grilling, stop here, or approve and move to sign-off. Never assume continuation; the user's silence is not consent to another round.

Rounds are numbered and cumulative. A later round may reopen an earlier answer if new information contradicts it — flag the contradiction explicitly, do not silently overwrite. The PRD's Trade-offs section is where a reopened decision is recorded twice: what was believed, and what changed it.

## Value lenses

Every round, regardless of its dominant theme, runs all four value lenses defined in `VALUE.md` against whatever scope is on the table: business value, customer experience and delight, the do-nothing alternative, and governance triggers. A round that only interrogates scope while ignoring value is not a grill round — it is scoping theater. The lenses are not optional passes reserved for a dedicated "value round"; they are the lens through which every candidate scope item is read, every round, until it exits the loop.

A scope item that cannot articulate its business value after two full rounds of grilling is cut, not carried forward on faith. Record the cut explicitly in the PRD's Trade-offs section: what was proposed, why it failed the value lens, and what would have to be true for it to return. Cutting scope for lack of demonstrable value is not a failure of the grill — it is the grill working as designed.

## Open-ended probing

Beyond interrogating what is already on the table, every round also probes outward. This is the wayfinding half of the grill, distinct from the interrogation half: ask what adjacent use cases the current framing misses, what data points nobody has mentioned yet but the outcome depends on, and what would make the scope genuinely more capable rather than merely acceptable. A grill that only narrows never discovers the side project that turns out to be the main event.

Do not let open-ended probing become scope creep by default — a discovery from outward probing enters the PRD only when the user actively pulls it in during a round; an unpulled discovery is noted and dropped, not silently absorbed.

## Stop-anytime and the trade-off ledger

The user may say **"we stop here"** at any point, in any round, for any reason. When they do, the loop ends immediately — no closing argument, no "just one more round." The grill does not get to overrule the person it is grilling.

Stopping is not silent. Every trade-off implicitly accepted by stopping where the user stopped is made explicit and written into the PRD's Trade-offs section before the session closes: what further grilling would likely have surfaced, what risk that leaves unresolved, and that the user chose to accept it. This is the mechanism that makes the PRD double as the decision record of the entire inception journey — not just what was decided, but what was consciously left undecided and why. A PRD produced by an early stop is a legitimate, complete artifact; it simply carries a shorter Trade-offs section than one grilled to exhaustion.

## Exit criteria

The grill exits in exactly two ways: an explicit user stop (above), or explicit sign-off at Gate G2. There is no third path — a grill does not time out, does not "probably cover enough," and does not advance because the facilitator judges it sufficient. Advancing to `slice` without a recorded sign-off is a protocol violation regardless of how many rounds were run or how confident the assessment feels.

Sign-off itself has one hard precondition: the PRD's Business value delivered section must be populated. A sign-off against a PRD with an empty or placeholder Business value section is invalid and must be rejected back into the grill loop — the user may still choose to stop, but they cannot sign off on a PRD that never answered the one question the whole pipeline exists to answer.
