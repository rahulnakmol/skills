---
name: press
description: User-invoked PRD to branded PDF. Use after impact PRD approval when a shareable document is needed.
---

# Press (branding)

Render an approved PRD to a branded PDF.

## When to invoke

- PRD signed off in `impact`
- User wants PDF for stakeholders

## Procedure

1. Validate PRD G2 sign-off
2. Apply `PALETTE.md` or user brand tokens
3. Run markdown → PDF script when present under `scripts/`
4. Deliver artifact path only — do not mutate PRD source

## Stop conditions

- Unsigned PRD → refuse

## Output contract

Path to PDF + checksum.

## Sibling skills

- `impact`
