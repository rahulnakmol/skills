# Claude Code hooks

A Claude Code Stop hook that keeps a session from ending while its `grit` gate ledger still has unmet gates. The hook is opt-in: nothing in this repository registers it automatically, and a project that never installs it behaves exactly as it did before this directory existed.

## What the hook does

`stop-hook.mjs` in this directory is a thin, zero-dependency launcher. It does not contain the checking logic itself; it locates the working implementation vendored at `skills/developer/grit/scripts/stop-hook.mjs` and delegates to it, passing stdin and the command-line arguments through unchanged and exiting with whatever code the delegate returns. Keeping one implementation avoids a second copy drifting out of sync with the first.

On each Stop event, the delegate:

1. Reads the hook's JSON payload from stdin to find the working directory and session ID.
2. Locates the gate ledger — `GATES.md` at the repository root, or `.grit/<scope>/GATES.md` for a scoped pipeline.
3. Parses the ledger without executing anything and checks whether any gate remains unmet.
4. If gates remain unmet, emits a block decision so the session cannot end; if all gates are met (or no ledger exists), it allows the stop.

If the launcher cannot find the vendored script — because the skill was never installed, or was installed somewhere the search does not check — it prints a diagnostic to stderr and exits 0. A misinstalled hook never traps a session; it simply stops enforcing until reinstalled.

### The six-block release valve

The delegate tracks, per session, a hash of the ledger's resolved gate state (not its raw bytes, so a comment or a re-run that produces the same result does not count as progress) and the number of consecutive Stop attempts blocked without that hash changing. After six blocks with no progress, it releases the session regardless of remaining unmet gates, and says so in the block message. The valve exists so a session that genuinely cannot move a gate forward is not held indefinitely; it is not a signal that the gates were met.

## Installing

The installer is a separate script, `install-hooks.mjs`, so it can be dry-run and re-run without touching the launcher itself.

```
node adapters/claude/hooks/install-hooks.mjs                # project .claude/settings.json
node adapters/claude/hooks/install-hooks.mjs --local         # project .claude/settings.local.json
node adapters/claude/hooks/install-hooks.mjs --user          # ~/.claude/settings.json
node adapters/claude/hooks/install-hooks.mjs --dry-run       # print the change, write nothing
```

Or through the repository installer, which also copies the launcher into place first:

```
bash scripts/install-adapters.sh --tool claude-hooks
```

The installer merges a single `Stop` hook entry into the chosen settings file. It reads the existing file first, so any other hooks (`PreToolUse`, other `Stop` entries, and so on) and any other settings in the file are preserved untouched. The entry it writes carries a stable marker string, `--grit-hook`, on its command line, which is how the installer recognizes and manages its own entry on a later run. Running the installer twice does not duplicate the entry — the second run detects the marker and reports no change.

## Uninstalling

```
node adapters/claude/hooks/install-hooks.mjs --uninstall
node adapters/claude/hooks/install-hooks.mjs --uninstall --local
node adapters/claude/hooks/install-hooks.mjs --uninstall --user
```

Uninstall removes only the entry carrying the `--grit-hook` marker. Sibling `Stop` handlers, and every other setting in the file, are left in place. If removing the entry empties the `Stop` list, or the `hooks` object entirely, the installer drops the now-empty container rather than leaving an empty stub behind.

## Opt-in by design

Nothing under `adapters/claude/` runs this installer on its own. A project adopts the hook by running `install-hooks.mjs` (directly, or via `scripts/install-adapters.sh --tool claude-hooks`) deliberately; the general `--tool claude` and default (`all`) installer targets do not touch hooks at all.
