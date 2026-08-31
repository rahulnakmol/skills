# Copilot adapter

# Copilot adapter

- Keep bodies thin (<30k); delegate to skill references
- Requires `gh` v2.90+ and Copilot subscription for agent flows

Install: `../../scripts/install-adapters.sh --tool copilot`

## Grit gates

Copilot has no hook runtime to intercept a session at the point it would report a task complete, so enforcement here relies on two mechanisms instead of one: an instruction in `.github/copilot-instructions.md`, and the continuous-integration backstop at `skills/core/grit/grit-gates.yml`.

Add this to `.github/copilot-instructions.md`:

```
Before reporting a task complete, read GATES.md or .grit/*/GATES.md if
present. Run each gate's CHECK and compare its output against EXPECT.
Report the met, unmet, and abandoned counts. Unmet gates mean the task
is not complete.
```

An instruction is not enforcement the way a hook is — an agent can choose to skip it. `grit-gates.yml` closes that specific gap in CI: it runs `gate-check.mjs --status` against the ledger, which reports recorded gate state without executing anything, and fails the check when any gate is unmet.
