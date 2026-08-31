# Skill: Impact

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/SKILL.md)

Impact is the entry point to the pipeline described in this repository. It takes a raw idea, a meeting transcript, or an intent that has not yet been scoped, and turns it into a signed-off PRD through a sustained, collaborative grill loop. It is not a form a user fills in alone.

## When to invoke

- A new initiative, a major feature, or a brownfield change needs alignment before backlog work can start.
- The user arrives with notes, a transcript, or a vague intent rather than a scoped request.

## How it fits

Impact is the inception gate in the [role journey](Architecture-Role-Journey), the first of this repository's four human gates. For brownfield work, it first calls [Recon](Skill-Recon) for a codebase brief. Either way, it exits only through an explicit user decision to stop or through a signed Gate G2; it does not advance on its own. It hands off to [Slice](Skill-Slice) only once the PRD's Business value section and its Risk and governance tier section are both complete.

## Key references

- [GRILL.md](https://github.com/tqnonline/skills/blob/main/skills/core/GRILL.md) describes the round protocol, the four value lenses applied in every round, the open-ended probing that looks for what a narrower scope might miss, and the trade-off ledger a user's decision to stop is recorded in.
- [VALUE.md](https://github.com/tqnonline/skills/blob/main/skills/core/VALUE.md) covers business value, customer experience and delight, the alternative of doing nothing, and the triggers that call for a governance review.
- [PRD-TEMPLATE.md](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/PRD-TEMPLATE.md) defines the PRD's shape, capped at eight pages, including its Risk and governance tier field.
- [GATES.md](https://github.com/tqnonline/skills/blob/main/skills/developer/impact/GATES.md) defines Gates G0 through G3.

## How to use

Run `/impact` in any of the five tools with whatever you have — meeting notes, a transcript, a half-formed idea. The skill drafts a fast-cut PRD immediately so the grill has something concrete to attack, then runs themed rounds of three to five questions until you stop or sign off. Saying "we stop here" is always allowed and always recorded. For brownfield work, let it call `recon` first rather than describing the codebase from memory.

## Best practices

- Let the grill run at least one full round even when the idea feels finished — the value lenses routinely surface what enthusiasm skipped.
- Answer the do-nothing question honestly; "not much changes" is a legitimate finding that should shrink the scope, not embarrass it.
- Record the governance tier at sign-off and treat it as a commitment — changing it later reopens approval.
- Keep the PRD inside its page budget; scope that needs more room belongs in a second `impact` cycle, not a longer document.

## Sibling skills

[Recon](Skill-Recon) supplies brownfield context. [Slice](Skill-Slice) and [Raise](Skill-Raise) pick up the work downstream. [Press](Skill-Press) exports the signed PRD as a branded PDF.
