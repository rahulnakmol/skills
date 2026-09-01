# Codex adapter

Skills under `skills/` are the plugin surface (promoted-only tree).

- Generate OpenAI YAML: `node ../../scripts/gen-openai-yaml.mjs`
- Do not hand-edit `agents/openai.yaml`

Install: `../../scripts/install-adapters.sh --tool codex`

## The grit stop hook

Codex runs lifecycle hooks declared in a `hooks.json` file, and one of its events, `Stop`, fires when a session is about to finish. `hooks/stop-hook.mjs` binds to that event and keeps a session from ending while the `grit` gate ledger still has unmet gates. It is the same enforcement the Claude Code adapter provides, on the tool-native mechanism Codex offers.

The hook is opt-in. Nothing in this repository registers it, and the default installer target does not touch it.

### What it does

`hooks/stop-hook.mjs` is a thin, zero-dependency launcher. It holds no checking logic of its own; it locates the implementation vendored at `skills/core/grit/scripts/stop-hook.mjs` and delegates to it. That is the same implementation the Claude Code adapter calls, so the two tools enforce one ledger parser rather than two that can drift apart.

On each Stop event the delegate reads the payload from stdin, locates the ledger — `GATES.md` at the repository root, or `.grit/<scope>/GATES.md` for a scoped pipeline — parses it without executing anything, and blocks when a gate remains unmet. It tracks a hash of the resolved gate state per session, and releases after six consecutive blocks with no progress so a session that cannot move a gate forward is not held indefinitely.

The launcher adds one behavior of its own, because Codex reads a hook's exit status differently from Claude Code. Codex parses a hook's stdout only when it exits 0; any other exit is recorded as a failed hook, and an exit of 2 with text on stderr is read as a block whose reason is that text. So the launcher captures the delegate's output rather than inheriting it: on a clean exit it forwards stdout unchanged, and on any other exit it reports the failure as a `systemMessage` and allows the stop. A hook that breaks never traps a session.

### Installing

```bash
../../scripts/install-adapters.sh --tool codex-hooks
```

That copies the launcher to `~/.codex/hooks/grit-stop-hook.mjs` and, when no `~/.codex/hooks.json` exists yet, installs `hooks/hooks.json` there. If a `hooks.json` is already present the installer leaves it alone and says so, because merging another tool's hook configuration is not a thing to do silently. Merge this entry by hand in that case:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"$HOME/.codex/hooks/grit-stop-hook.mjs\" --grit-hook",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

Codex reads `hooks.json` from `~/.codex/` for a profile and from a project's `.codex/` directory; both layers load, so a project entry does not replace the user one. Leave `async` unset. Only synchronous hooks can apply control effects in Codex, so an asynchronous handler would run and report but never block.

The installer honours `CODEX_HOME` when choosing where to write, but the shipped command names the default location. If `CODEX_HOME` points somewhere other than `~/.codex`, edit the installed command to that path.

### Finding the vendored implementation

The launcher searches, in order: a `--skill-dir <path>` argument, the `GRIT_SKILL_DIR` environment variable, its own position in a repository checkout, and then `~/.codex/skills`, `.codex/skills`, `~/.claude/skills`, `.claude/skills`, and `.agents/skills` in the working directory.

Installed to `~/.codex/hooks/`, the launcher is no longer inside the checkout, so it needs one of the other routes. Either install the skill pack so `~/.codex/skills/grit` exists, or point the hook at a checkout explicitly:

```json
"command": "node \"$HOME/.codex/hooks/grit-stop-hook.mjs\" --grit-hook --skill-dir /path/to/skills/skills/core/grit"
```

If none of the candidates resolves, the launcher prints a diagnostic and allows the stop rather than blocking on a hook that cannot check anything.

### Uninstalling

Remove the `Stop` entry carrying the `--grit-hook` marker from `~/.codex/hooks.json`, and delete `~/.codex/hooks/grit-stop-hook.mjs`.
