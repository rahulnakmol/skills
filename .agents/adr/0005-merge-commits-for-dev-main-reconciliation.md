# ADR 0005: Merge commits for dev/main reconciliation

## Status

Accepted

## Context

The release cycle bumps the version on `main` through a squash-merged Version Packages PR. Bringing that bump back into `dev` requires a reconciliation PR. Because the repository allowed only squash merges, merging a reconciliation PR flattened its two-parent merge commit into one, erasing the record that `dev` and `main` share history. Every following `dev` → `main` PR then re-surfaced add/add conflicts on files that were already byte-identical, forcing a manual fast-forward push outside the PR flow to fix it — twice.

GitHub has no per-branch or per-source-branch control over merge strategy: `allow_merge_commit` is a single repository-wide setting, and rulesets have no "required merge method" rule type.

## Decision

Enable `allow_merge_commit` for the repository. Squash stays the default and the only method used for ordinary feature PRs into `dev` and for `dev` → `main` promotions. Only `chore/reconcile-*-into-dev` PRs (`main` → `dev` reconciliation, opened after a release lands on `main`) are merged with the merge-commit strategy, by convention, so the two-parent history survives.

## Consequences

- Reconciliation PRs must be merged with "Create a merge commit" (`gh pr merge --merge`), never squash. A squash-merge of a `chore/reconcile-*-into-dev` PR reintroduces the bug.
- All other merges into `dev` and `main` continue to squash as before; PR history on those branches stays linear.
- Because there is no technical gate enforcing this per-PR choice, the convention relies on whoever merges — see the release ritual note in project memory.
