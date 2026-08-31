# PRD structural validation

**Load when** a PRD has been drafted or amended, or when the user asks to check, validate, or confirm the structural completeness of a PRD.

This is the structural pass `prd-draft` runs on its own output before handing a PRD to `prd-review`. It is deliberately cheap and deterministic: it asks whether the required parts of a PRD are present and well-formed, not whether the product idea is any good. Judgment about ambition and quality belongs to `prd-review`, and approval belongs to the human at the Quality gate.

The pass is read-only. It reports what it found and stops there. Fixing a failure is a redraft, run through the drafting procedure again, so that the record shows a validation result and a separate corrected draft rather than a check that quietly repaired the thing it was checking.

## The nine checks

Run all nine on every PRD. Checks one through four are critical: they cover the structure everything downstream reads, so a failure in any of them blocks the PRD regardless of how the other five land.

| # | Check | What passes | Severity |
|---|-------|-------------|----------|
| 1 | Sections present | All twelve sections of `PRD-SECTIONS.md` exist and carry content | Critical |
| 2 | Named personas | Every user story names a persona defined in Section 2 | Critical |
| 3 | Acceptance criteria | Every story carries three to eight Given-When-Then criteria, including at least one error scenario | Critical |
| 4 | Priority and complexity | Every story carries both a priority and a complexity estimate | Critical |
| 5 | Star levels | Every feature carries a star level | Warning |
| 6 | Success metrics | At least three success metrics, each with a baseline and a target | Warning |
| 7 | Risk detail | At least one risk stated in full — likelihood, impact, and mitigation — rather than named only | Warning |
| 8 | Owned open questions | No open question is listed without an owner | Warning |
| 9 | Scope populated | Both in-scope and out-of-scope lists carry entries | Warning |

## Running the pass

1. Locate the PRD file. With no path given, validate every PRD found under `specs/prd/`.
2. Run all nine checks. Never short-circuit on the first failure: a report that stops at check one hides the other eight results and turns one redraft into several.
3. Record each check as a gate row per `grit/LEDGER.md` — the check run, the structure expected, and the evidence found in the document, quoted or located by section.
4. State the verdict, then present the summary. On FAIL, return to drafting rather than advancing to `prd-review`.

## The verdict

- **PASS** — all nine checks pass.
- **PASS WITH WARNINGS** — checks one through four pass; one or more of checks five through nine fail. The PRD may advance, and each warning is carried into the review as a known gap.
- **FAIL** — any of checks one through four fails. The PRD does not advance. This holds even when the remaining checks all pass, because a story without a persona, without acceptance criteria, or without a size is not something `prd-review`, `slice`, or a delivery team can act on.

## The report

Write one report per PRD at `specs/prd/{epic-name}-validation.md`, carrying:

- the nine-item checklist with a pass or fail against each check,
- the specific issue behind each failure, located in the document by section and story,
- the verdict, and
- on FAIL, the redraft the PRD needs, stated as work rather than as a complaint.
