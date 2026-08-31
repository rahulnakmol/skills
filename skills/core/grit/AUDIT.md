# The final audit

The audit is the last thing grit produces on a piece of work: a reconciliation of the finished state against the ledger it was written from, before anyone reports the work done.

## Counting what happened

Every gate in a ledger ends the audit in exactly one of three states — met, unmet, or abandoned — and the three counts always sum to the ledger's total gate count. A gate cannot be silently left off the count; a ledger with twelve rows produces an audit with twelve gates accounted for, not nine because three were awkward to report on.

- **Met** — the gate's checkbox is ticked and its EVIDENCE line carries a real measurement from a run, not a placeholder. For a manual gate, met means a human recorded the observation directly, with enough specificity that another person could check the same thing and reach the same conclusion.
- **Unmet** — the checkbox is unticked, or a runnable gate's last recorded run failed. An unmet gate is reported exactly as unmet; it is not described in softer language ("mostly working," "should pass once X lands") that reads to a downstream reader as closer to done than the record supports.
- **Abandoned** — the gate is retired deliberately, with a stated reason and a human sign-off, rather than pursued to met or left unmet indefinitely.

## Abandoning a gate honestly

A criterion sometimes turns out to be wrong or infeasible only after implementation has started: a source system does not expose the figure a gate was written to check, a requirement conflicts with one added later, a stakeholder revises what they actually need. Abandoning the gate that no longer fits is a legitimate outcome of that discovery, and grit treats it as one — the discipline is not that every gate must be met, it is that no gate disappears without a trace.

An abandoned gate stays in the ledger and the audit, tagged with why it was abandoned and who signed off on retiring it. The failure mode this guards against is not abandonment; it is deletion. A gate quietly removed from the ledger — rather than marked abandoned in place — leaves no record that a criterion existed, was found wanting, and was let go on purpose rather than forgotten under deadline pressure. That silent removal is the exact failure this discipline exists to prevent, and it is why "abandoned" is a status a gate carries forward rather than an edit that erases the row.

## The audit block format

```yaml
ledger: .grit/checkout-flow/GATES.md
depth: 7
audit_date: 2026-08-30
audited_by: "R. Nakmol"
totals: { met: 5, unmet: 1, abandoned: 1, total: 7 }
gates:
  - id: G1
    dimension: completeness
    status: met
    evidence: "exit=0; shell=/bin/sh; cwd=/repo/packages/checkout; EXPECT=matched; output-sha256=6bf5c2e1...; output-bytes=9"
  - id: G2
    dimension: accuracy
    status: met
    evidence: "exit=0; shell=/bin/sh; cwd=/repo/packages/checkout; EXPECT=matched; output-sha256=9d1a44f0...; output-bytes=142"
  - id: G3
    dimension: business_value_met
    status: met
    evidence: "manual: order-completion rate on staging matches the PRD's 92% target, screenshot attached to PR #418"
  - id: G4
    dimension: efficiency
    status: met
    evidence: "exit=0; shell=/bin/sh; cwd=/repo; EXPECT=matched; output-sha256=3ee9ab21...; output-bytes=61"
  - id: G5
    dimension: thoroughness
    status: met
    evidence: "manual: four-pass log attached, polish pass found nothing new on 2026-08-29"
  - id: G6
    dimension: accuracy
    status: unmet
    evidence: "exit=1; shell=/bin/sh; cwd=/repo/packages/checkout; EXPECT=no match; output-sha256=1a2b3c4d...; output-bytes=203"
  - id: G7
    dimension: completeness
    status: abandoned
    evidence: "criterion required a refund-webhook replay the payment vendor's sandbox does not support; signed off by R. Nakmol, 2026-08-28"
```

Every gate row carries a real evidence string, never an empty placeholder. A gate with no evidence is not yet auditable, and the audit does not run until it is.

## Where the audit goes

The audit block travels with the work, in three places that already exist in this repository's pipeline: the pull request body the delivery workflow raises, so a reviewer sees the count before reading the diff; the PM report pack, so a sponsor sees whether a delivered benefit actually cleared its gates rather than trusting a status label; and the issue or work-item thread, so the record persists next to the discussion that produced it. The same audit block format applies in all three; only the surrounding document differs.

## Never soften the EXPECT

Exactly one repair is prohibited, without exception: weakening a gate's EXPECT token so that a failing check starts passing. Loosening a regular expression, dropping a condition an EXPECT string was checking for, or swapping an EXPECT for a token the check now emits unconditionally are all versions of the same move — they make the ledger report success without changing whether the underlying claim is true. A ledger that can be made to pass by editing its own success criterion is not a verification tool; it is a form that always says yes.

There are exactly three honest moves available when a gate is unmet, and every real situation reduces to one of them:

1. **Re-measure the claim.** The check itself may be wrong — measuring the wrong file, running in the wrong directory, asserting a figure the implementation never claimed. Fix the check, keep the EXPECT it should have had all along, and re-run it.
2. **Fix the work.** The check is right and the implementation is not. This is the ordinary case: the gate stays exactly as written, and implementation continues until the check passes on its own.
3. **Abandon the gate openly.** The criterion itself no longer applies. Retire it with a reason and a human sign-off, per the section above, and it becomes part of the audit's abandoned count rather than disappearing.

A gate that cannot be resolved by one of these three is a sign the audit is being rushed, not a sign a fourth option is needed.
