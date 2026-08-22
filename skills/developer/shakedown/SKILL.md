---
name: shakedown
description: User-invoked PR sandbox build, test, and review. Use before merge or when validating a contributor PR in isolation.
---

# Shakedown (user-invoked)

Run an isolated verification pass on a PR or branch.

## When to invoke

- User requests PR validation or pre-merge confidence
- CI missing locally but sandbox available

## Procedure

1. Follow `SANDBOX.md` isolation rules
2. Checkout PR head; run project test command
3. Optional: invoke reviewer adapter read-only
4. Summarize pass/fail with logs excerpt

## Stop conditions

- Sandbox cannot be created → stop with manual steps
- Secrets required → never use production keys

## Output contract

```yaml
pr: <url>
build: pass|fail
tests: pass|fail|skipped
notes: []
```

## Sibling skills

- `deliver`, `assure`, `safeguard`
