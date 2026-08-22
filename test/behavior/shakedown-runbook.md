# Shakedown manual runbook

Needs a real sandbox repo and a real PR — not automatable as a script without provisioning infrastructure this repo doesn't own. Run manually before relying on `shakedown` in production.

1. In a disposable sandbox repo, open a PR that adds a test which fails on purpose (e.g. `assert.equal(1, 2)`).
2. Run `/shakedown <PR#>` (or drive the `shakedown` skill directly) against that PR.
3. Expected outcome: the sandboxed build/test run detects the failing test, and the posted review is a **blocking** review — never an approval.
4. Repeat with a PR that passes cleanly; expected outcome is a passing review.
5. Record both outcomes (pass/fail, review verdict) before treating `pr-shakedown.yml` as safe to enable on a real repository.
