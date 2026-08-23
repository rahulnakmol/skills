# The 11-Star Experience Framework

Ported from the source `prd-review` skill's use of Brian Chesky's 11-Star Experience Framework, combined with a seven-dimension quantitative rubric to produce a review that is both qualitative and scored.

## The scale

The framework rates experiences on a 1-to-11 scale. Stars 1 to 3 are broken to clunky — the feature is missing, hostile, or requires workarounds. Stars 4 to 5 are baseline parity — the feature works and matches competitors, nothing more. Star 6 anticipates needs, proactively surfacing what the user needs next. Star 7 produces wow moments users tell others about. Star 8 changes thinking — the old way feels broken after using this. Stars 9 to 11 are aspirational and magical, useful as a design exercise to challenge thinking but never a shipping target. Most PRDs default to star 5: functional, forgettable, and vulnerable to any competitor who aims higher.

## Working backward

The method is to design the star-11 experience first — impossible perfection — and then work backward to find the feasible sweet spot, which sits at star 7 to star 8: ambitious enough to differentiate, feasible enough to actually build. A PRD that never designs past star 5 has not failed a review, it has simply never attempted the exercise that would surface a star 7 or star 8 anchor feature.

## The seven dimensions

Each PRD is scored 1 to 10 on seven weighted dimensions: Completeness (15%, all required sections present and populated with depth), Clarity (15%, unambiguous and testable requirements), Feasibility (15%, achievable with available technology, team, timeline, and budget), Ambition (15%, pushes beyond parity toward star 6-8 differentiation), Differentiation (15%, a distinct market position, not a restatement of what competitors already ship), Metric Alignment (10%, success metrics tied to business outcomes with real baselines and targets), and Story Quality (15%, a coherent, traceable narrative from problem to resolution). Completeness alone never carries a review — a complete but unambitious PRD can score well on Completeness and poorly on Ambition, and both facts belong in the report.

## Verdict bands

The weighted composite score maps to five bands: below 4.0 is Reject; 4.0 to 5.9 is Major Revision; 6.0 to 7.4 is Minor Revision; 7.5 to 8.9 is Approved with Notes; 9.0 and above is Exemplary. A score of exactly 7.5 is the floor of Approved with Notes, not the ceiling of Minor Revision — the boundary matters because it is the line between a PRD that ships with commentary and one that returns to `prd-draft` for another pass.
