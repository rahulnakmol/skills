# PM gates

Four human decision points carry the PM pipeline from a raw problem to a delivered, measured benefit — the same shape as the developer group's four gates, applied one level up the business stack. Every gate opens with a blind-spot review: before the human decides, they run the pre-gate checklist from `AGENT-OWNERSHIP.md` against whatever the agent fleet produced for this gate — coverage, unevidenced claims, ambition collapsed toward the safe middle, correlated agreement across agents that used the same model, and the do-nothing test. The review is short, but it is never skipped, and it is never delegated back to an agent. The review also asks the evidence-ledger question — for each claim the gate decision rests on, name the check that would verify it and the evidence it produced, per the developer group's `grit/LEDGER.md`. For a substantial initiative, Framing also fixes the verification depth — the human names one, or accepts the 5-to-10 recommendation from `grit/METHOD.md`'s rubric — and each later gate confirms the tree is still being walked at that depth.

## Framing

The problem owner signs the Business Understanding Document produced by `discover` and `map`. The evidence required: the five-dimension intake, the root-cause analysis (Five Whys or Fishbone), named stakeholders, and success criteria stated in outcome terms, not output terms. The blind-spot review checks that the framing was not written to fit a solution already in mind. Framing closes when the problem owner can state, in their own words, what problem is being solved and for whom.

## Investment

The sponsor approves the case, the epic manifest, or the TOM — whichever artifact this hat produced. `case` must show at least two real options plus the do-nothing option, with `COSTING.md`'s full accounting: build cost, run cost, opportunity cost, and agent-fleet cost. The manifest or TOM has already been through a grill round. The blind-spot review here weighs hardest on the sensitivity section — which single assumption, if wrong, kills the case — because sponsors approve numbers, and numbers hide the assumption that produced them.

## Quality

The PRD is agent-scored on the 11-Star scale across seven weighted dimensions, and the score is only ever advisory — approval stays human even at a 9.0, because a high score tells the human where to look, not what to decide. The blind-spot review at Quality is where correlated agreement matters most: three reviewers built on the same underlying model converging on the same verdict is not three independent opinions, it is one opinion said three times.

## Commitment

The backlog is raised through `slice` and `raise`; from this point the pickup protocol takes over exactly as it does for the developer group, one tracker, one set of work-item contracts, one delivery pipeline regardless of which group opened the item. Risk and Impediment items raised from `raid` carry the same contract as any story. Commitment is where the PM's authorship ends and the delivery pipeline's execution begins — the PM stays as sponsor and reporter, not as implementer.

`realize` closes the loop: when a benefit's actual value diverges from its projection, the variance is not filed and forgotten — it re-enters `discover` or `carve` as new work, carrying its own case for why the gap is worth closing. A transformation practice that only measures forward and never measures back is not actually grounded in cost; it is grounded in forecasts.
