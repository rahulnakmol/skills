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
- For routing mode (loop vs graph), call `conduct` first
- Check the target repository against `deliver/REPO-SETUP.md` (Code Quality, `gh stack`, pickup-protocol labels, shakedown); report gaps before walking gates

## Procedure

1. Snapshot SPEC-TS from PRD or work item body; confirm its functional and non-functional requirements carry a stated scope boundary before walking gates (`DDDD.md`) — a snapshot missing either is a stop, not an assumption
2. Walk gates in `LOOP-CONTRACT.md`; record evidence per gate as a grit gate ledger (`grit/LEDGER.md`), one `CHECK:` and one `EXPECT:` per acceptance criterion
3. At human gates, stop until explicit approval
4. On security, quality, or reliability findings, call `safeguard` / `operate` adapters via charter skills
5. Close with Gate 3 outcome evidence and ledger update, carrying the gate ledger's final audit per `grit/AUDIT.md`

## Stop conditions

- Missing SPEC-TS or unsigned human gate → stop with structured gap list
- Work item not `ready` → run pickup protocol (`slice/WORK-ITEM-CONTRACT.md`)

## Output contract

Markdown ledger update + gate checklist with pass/fail and links to artifacts.

## Sibling skills

- `conduct` — mode selection and model-per-node routing
- `deliver`, `safeguard`, `operate` — specialist gates
- `shakedown` — pre-merge sandbox review
