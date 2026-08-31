---
"rahulnakmol-skills": minor
---

The repository gains a way to measure whether its skills can be selected at all. The deterministic harness proves the tree is well formed — manifests agree, doctrine documents carry their headings, scripts honor their contracts — but a skill is a prompt that has to win selection against every sibling, and a file can be perfectly well formed and never chosen. Nothing here could previously detect one.

`test/eval/run-routing.mjs` reads every promoted skill's description from the tree, presents the catalog to a model alongside a labeled request, and records which skill comes back. Scoring is exact-match on the name, so no judge model is involved. Each case runs several times, because selection is stochastic and a case that routes correctly once and wrongly twice is not a passing case; the default threshold is every run, since a skill selected two times in three fails a third of the people who ask for it. Runs write a dated scorecard to `test/eval/results`, so a regression is a diff between two files rather than something someone has to remember, and a missing model is recorded as a skip rather than scored as a pass.

The eval earned its place before it was committed. `conduct` and `arrange`, both renamed from `orchestrate`, had been left with descriptions nearly identical in shape, and a request using `conduct`'s own vocabulary routed to `arrange` on two runs out of three while every structural test stayed green. It was also used to test the claim that a thin description costs selection: `operate`'s four-word predecessor still won uncontested requests and dropped to one run in two on the contested one, which places the cost more precisely than the claim did — a thin description loses on contested ground, where selection is actually decided.

Routing accuracy is necessary and not sufficient, and the README says so plainly: it establishes that the right skill was chosen, not that invoking it produced better work than not invoking it. That paired-arm question needs planted defects, per-case checklists, and a judge from a different model family than the one being graded, and is not built yet.

Because every case is a model call, the eval runs weekly or on demand rather than per pull request, and a test fails if a `pull_request` trigger is ever added so the cost cannot start quietly. What does run on every pull request is everything needing no model: the table is valid, names skills that exist, covers the catalog, and the runner states its contract.
