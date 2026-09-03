# Resolving merge and rebase conflicts

A conflict marker is not a formatting problem to clear. It is git reporting that two lines of work changed the same region of a file and that it cannot determine which change the project wants. That determination is a judgment about intent. This document covers the repository stopped mid-operation: `git status` lists unmerged paths, and the working tree carries conflict markers from an in-progress `git merge` or `git rebase`.

## Resolve by intent, not by textual plausibility

Before changing a character of a conflicting hunk, find out what each side was trying to do. `git log --merge <path>` lists the commits on each side that touched the file. `git blame` against each parent names the commit behind a specific line. The commit message, the pull request that carried it, and the issue it closes hold the reasoning that the diff by itself does not.

Then reconstruct a resolution that preserves both intents. That is a different act from the two shortcuts that resemble resolutions:

- **Picking the side that looks better.** Choosing the version that is longer, newer, or more polished discards the other side's change silently. The discarded work still had an author, a review, and a reason, and nothing in the merge commit records that it was dropped.
- **Mashing the two texts together.** Interleaving both hunks produces code that contains every line and serves neither purpose. A validation that both sides tightened in different ways ends up applied twice; a variable both sides renamed ends up assigned under one name and read under the other.

Where the two intents are compatible, the resolution often reads like neither side's text. It is the code someone would have written had both requirements been known at the same time.

## Order the conflicts by what you understand

Resolve the hunk you understand best first, then the next best, and work outward from there. Each resolution establishes facts — which naming survived, which signature the file now carries, which side's abstraction the module ended up using — and those facts narrow the choices in every conflict that follows. Starting with the hunk you understand least means guessing early and then defending the guess through every later file.

Stage a file only once its resolution is complete (`git add <path>`). A partially resolved file that is already staged reads as finished in `git status`, which makes it easy to lose track of.

## A resolution that compiles is not evidence that it is correct

A build that succeeds has cleared a low bar. It proves the syntax is valid and the names resolve. It says nothing about whether the merged logic does what either side intended.

The tests are the evidence, with one qualification that matters here: neither side's tests alone are sufficient. Every test on both branches passed before the merge, so a green result from one branch's suite only confirms that branch survived intact. Run the full suite from the merged tree, which holds both sides' tests together for the first time, and run all of it rather than only the tests near the conflicted files. A resolution changes behavior that callers far from the conflict depend on, and those callers are where a wrong resolution usually shows up.

Where both sides added tests for the same behavior with different expectations, the disagreement between those tests is the real conflict. It goes to a human, not into a single merged assertion loose enough to satisfy both.

## Regenerate generated files rather than merging them by hand

Lockfiles, dependency manifests, compiled schemas, and similar artifacts are outputs, not source. Resolve them by taking one side's file, applying both sides' changes to the source of truth — the manifest, the schema definition — and running the project's own tooling to produce the artifact again.

The reason is a failure mode that is easy to miss. A hand-merged lockfile is frequently invalid in ways that nothing checks at merge time: an integrity hash that matches no published artifact, a resolved dependency tree pointing at a version that was never selected, or two entries for the same package that disagree. The build often still succeeds against a warm cache, and the breakage surfaces days later on a clean machine or in continuous integration, far from the commit that caused it.

After regenerating, read the artifact's diff and confirm it contains the changes both sides asked for and nothing else.

## A genuine design conflict goes to a human

Some conflicts are not merge mechanics. When both sides changed the same logic in ways that cannot both hold — one side made an operation synchronous while the other made it retryable and asynchronous, or the two sides chose incompatible shapes for the same record — no resolution preserves both intents, because the intents themselves disagree.

Stop and hand it to a person. State which two commits conflict, what each was trying to achieve, and why the two cannot coexist. Guessing here produces a change that passes review because it looks like an ordinary merge, and that later breaks because it quietly settled a design question nobody was asked about.

## Do not resolve by aborting

`git merge --abort` and `git rebase --abort` return the repository to its state before the operation began. They resolve nothing. They discard whatever resolution work is already done, and they hide the conflict instead of settling it — the same conflict reappears, unchanged, the next time anyone attempts the merge.

Abort only when the human explicitly asks to start over. The same restraint applies to `git checkout --ours` and `git checkout --theirs` used as a way to make the markers disappear. Each of those is a deliberate decision to discard one side, and it is correct only when the analysis above has concluded that one side should be discarded.

## Finish the operation

A conflicted repository is not a resting state. Tooling that reads the index behaves unpredictably while unmerged paths exist, and the next person to open the working tree inherits an ambiguous state with no record of what was intended.

Once the resolution is staged and the full suite is green, complete the operation: `git merge --continue` for a merge, or `git rebase --continue` for a rebase, repeated through each remaining conflicted commit until the rebase finishes. Then confirm the outcome. `git status` should report a clean tree on the expected branch, and the resulting commit's diff should contain what the resolution intended and nothing more. Per `core/VERIFICATION.md`, a green build is not the completion signal; reading the actual diff is.

## How the pipeline uses this

- `deliver` applies this when a stack layer or a release branch conflicts with its base, before the pull request is raised.
- `STACKING.md` removes much of the need for it: a lower-layer fix is synced upward through the stack rather than re-resolved in every layer above.
- `shakedown` reviews the merge or rebase commit like any other change, against the same coverage and traceability floors.
