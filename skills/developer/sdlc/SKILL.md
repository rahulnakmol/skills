---
name: sdlc
description: User-invoked full gated SDLC loop with SPEC-TS ledger, human gates, and verifier challenge. Use when executing a work item or feature through design, build, secure, and release gates.
---

# SDLC loop (user-invoked)

Run the gated software delivery loop for a scoped change or work item.

## When to invoke

- User asks for full SDLC, gated delivery, or SPEC-TS tracking
- Work item label is `ready` and contract points here

## Prerequisites

- Read `METHOD.md` for SPEC-TS ledger rules
- Read `LOOP-CONTRACT.md` for gate order and stop states
- For routing mode (loop vs graph), call `orchestrate` first
- Check the target repository against `deliver/REPO-SETUP.md` (Code Quality, `gh stack`, pickup-protocol labels, shakedown); report gaps before walking gates

## Procedure

1. Snapshot SPEC-TS from PRD or work item body
2. Walk gates in `LOOP-CONTRACT.md`; record evidence per gate
3. At human gates, stop until explicit approval
4. On security/quality findings, call `safeguard` / `assure` adapters via charter skills
5. Close with Gate 3 outcome evidence and ledger update

## Stop conditions

- Missing SPEC-TS or unsigned human gate → stop with structured gap list
- Work item not `ready` → run pickup protocol (`slice/WORK-ITEM-CONTRACT.md`)

## Output contract

Markdown ledger update + gate checklist with pass/fail and links to artifacts.

## Sibling skills

- `orchestrate` — mode selection and model-per-node routing
- `deliver`, `safeguard`, `assure`, `operate` — specialist gates
- `shakedown` — pre-merge sandbox review
