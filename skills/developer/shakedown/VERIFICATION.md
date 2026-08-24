# Verification before completion

A process completing without error is not evidence of success. This doctrine is the rule every agent in this pipeline follows before reporting a work item, a PR, or any produced artifact as done — threaded through `shakedown`'s procedure, `deliver-work-item`'s completion report, and, on the pm side, `report` before a leadership pack is marked sent.

## Open the artifact

Before reporting that a task has succeeded, open the actual thing produced — a file, a deployed page, a sent message, a rendered PR — and check it directly against the original request. Reading the code that was supposed to produce the result is not the same as reading the result. A migration script that ran without error still needs its output table opened and compared against what the migration was supposed to do; a PR that built and tested green still needs its diff read against the work item's acceptance criteria, not assumed from the green checkmarks.

## Absence of error is not evidence

A build that exits 0, a test suite with no failures, a script that finishes without a stack trace — none of these are evidence that the right thing happened, only that nothing visibly broke while it happened. The two are different claims, and this pipeline is built around never collapsing them: `shakedown-pr`'s sandbox phase does not stop at "build: pass" — the workflow actually executes the changed behavior and checks it against what the PR claims. If there is no way to open or verify what was produced, the task has not been done, and it gets reported as unfinished rather than assumed complete.

## Report only what you found

When reporting back, describe only what was found on opening: what is present, what is missing, what is wrong, and where it diverges from what was asked, in scope, tone, or specification. Do not describe what the work was intended to achieve or what should have happened — intention carries no weight here, only observation does. A status update that says "implemented the caching layer" without having opened the cache and confirmed a hit actually returns the cached value is not a report, it is a plan being mistaken for a result.

## The pipeline shape

Verification runs as a sequence, not a single pass, in the spirit of `no-mistakes`' own gate: review the diff, run the tests, check the documentation the change touches still says something true, and lint. Each step either passes on its own or stops with a finding for a human or the next phase to act on — this repository's own version of that shape is `shakedown-pr`'s Recon → Sandbox → Review → Verify → Verdict sequence, run inside a disposable worktree so the verification pass never disturbs the branch under review. A finding from any step is recorded, not silently dropped because a later step happened to pass.

## Auto-fix versus escalate

Not every finding is the same kind of problem. A finding that is safe and mechanical — a lint violation, a stale doc reference, a missing test for an already-obvious case — gets fixed directly, in its own commit, never bundled silently into the change under review. A finding that touches intent — a design trade-off, an ambiguous acceptance criterion, a security judgment call — is escalated to a human to approve, fix, or explicitly skip. The line between the two is drawn by whether fixing it could change what the work item actually does; when in doubt, escalate rather than guess.
