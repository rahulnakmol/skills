# SDLC directives (`[sdlc:*]` tokens)

User-facing control tokens for the gated SDLC loop. Expand in adapters; do not duplicate full gate prose here.

| Token | Effect |
|-------|--------|
| `[sdlc:pause]` | Stop after current gate; emit ledger snapshot |
| `[sdlc:skip-human]` | **Forbidden** in regulated mode |
| `[sdlc:escalate]` | Route to verifier adapter |
| `[sdlc:manifest]` | Emit execution manifest block for work items |
