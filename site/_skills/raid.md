---
layout: skill
name: raid
title: "RAID — Track Risks, Assumptions, Issues, and Dependencies"
description: "RAID is the user-invoked skill that maintains the four registers behind an initiative's derailment risks and generates the sponsor status narrative directly from them."
group: pm
invocation: user-invoked
lens:
  novice:
    who: 'You have watched a risk get mentioned once in a meeting and never written down, then watched it happen. RAID is the habit of logging it the moment it surfaces, with an owner attached.'
    value: 'You get four registers — Risks, Assumptions, Issues, Dependencies — that hold what could derail the work, so nothing important lives only in someone''s memory or a chat thread.'
  practitioner:
    who: 'You are asked for a sponsor status update every reporting cycle and currently reconstruct it from memory each time.'
    value: 'The two-minute status narrative is generated directly from the four registers, so it can never quietly drift from what the registers actually say — if they disagree, the register is right.'
  leader:
    who: 'You manage several initiatives, each with its own set of risks that could compound across them.'
    value: 'Every risk in every register carries a named owner and a mitigation, not just a description — you can see at a glance which risks have no one actually managing them.'
  csuite:
    who: 'You are accountable when a known risk materializes and the record shows nobody was tracking it.'
    value: 'A risk with no owner is visible as a gap in the register itself, not discovered after the fact during an incident review.'
---

## What it does

RAID maintains the four registers that keep an initiative's derailment risks visible, owned, and mitigated: Risks, Assumptions, Issues, and Dependencies. Every entry carries a named owner — a risk with no owner is treated as unmanaged, not merely undocumented — and risks carry a mitigation, assumptions carry a validation point, and issues carry a path to resolution. The Dependencies register is what `roadmap` reads directly for its sequencing board, so a slipped dependency shows up in the roadmap the moment it slips, not a reporting cycle later. RAID also generates the two-minute sponsor status narrative directly from the four registers, never hand-assembled from memory.

## How to call it

In Claude Code, type `/raid`. Add the skill pack first if it is not already installed:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A risk that is actually managed</div>
<pre><code>RISK R-07: Vendor API rate limit may block go-live traffic
  Likelihood: medium  Impact: high
  <span class="tok-ok">Owner: J. Alvarez  Mitigation: negotiating a burst-tier
  contract addendum, due before code freeze</span></code></pre>
<div class="compare-card-note">Likelihood, impact, owner, and an active mitigation — not a hope that it resolves itself.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code>ISSUE I-03: Reporting pipeline broke last sprint
  <span class="tok-warn">Owner: (unassigned)
  Status: open, no movement for 4 cycles</span></code></pre>
<div class="compare-card-note">An issue with no owner and no movement across several reporting cycles is the clearest sign a status update is being generated rather than acted on.</div>
</div>
</div>

## In practice

The output contract calls for `specs/{prefix}-raid.md` to carry all four registers plus the current status narrative generated from them. Below is the shape that contract requires:

```
# RAID: field-inspection-copilot

RISKS
  R-07: Vendor API rate limit may block go-live traffic
    Owner: J. Alvarez  Likelihood: medium  Impact: high
    Mitigation: negotiating a burst-tier contract addendum

ASSUMPTIONS
  A-02: Inspection crews will accept a mobile-first workflow
    Owner: R. Chen  Validate by: pilot cohort survey, week 3

ISSUES
  I-03: Reporting pipeline broke last sprint
    Owner: J. Alvarez  Status: root cause found, fix in review

DEPENDENCIES
  D-14: Payments-team token API must ship before saved-card recall
    Owner: payments team lead  Status: open, targeted for PI-14

STATUS NARRATIVE (generated from the registers above):
  On track. One medium-likelihood risk on vendor rate limits is under
  active mitigation. One open dependency on the payments team is
  holding saved-card recall in NEXT rather than NOW.
```

This is the shape the output contract requires, not a captured run — `raid` has no companion script; the document above is written by the skill directly into the file.

## How it works

1. **Log the entry.** Risk, assumption, issue, or dependency, with an owner and, for risks, a mitigation. See [`RAID-METHOD.md`](https://github.com/tqnonline/skills/blob/main/skills/pm/raid/RAID-METHOD.md).
2. **Keep dependencies current.** `roadmap` reads this register directly for its sequencing board.
3. **Review stalled entries.** Escalate an issue with no recent movement to its owner.
4. **Generate the sponsor narrative** directly from the four registers, never hand-assembled separately.
