# Amp plugin: tqn-grit

`tqn-grit.js` is an [Amp plugin](https://ampcode.com/docs/customize/plugins) that keeps a turn from ending while a `grit` gate ledger still has unmet gates. It does for Amp what the Claude Code and Codex stop hooks do for those tools. The plugin is opt-in: nothing in this repository loads it automatically, and a project that never installs it behaves exactly as it did before this directory existed.

## What the plugin does

Amp has no stop hook. Its plugin API fires an `agent.end` event when a turn finishes, and a handler may answer `{ action: 'continue', userMessage }` to start a new turn. The plugin uses that event as the interception point.

On each `agent.end` with status `done`, the plugin:

1. Checks whether the workspace has anything a ledger could live in: `GATES.md`, a `gates/` directory, or `.grit/`. When none exists it returns at once and spawns nothing.
2. Locates the grit skill and runs its vendored `scripts/stop-hook.mjs` with the same stdin payload the other hosts send: `{ "cwd": <workspace root>, "session_id": <thread id> }`.
3. Reads the hook's stdout. A `{"decision":"block","reason":...}` becomes a continuation message that starts the next turn; the message names the unmet gates and states that it came from this plugin. Anything else lets the turn end.

The plugin holds no ledger logic. The progress hash and the six-block release valve live in the vendored hook, so a thread that cannot move a gate is released there after six ends without progress. `skills/core/grit/HOOKS.md` describes both.

Two smaller parts ride along:

- A `tool.call` handler rejects file edits under the approval store (`~/.grit/approved`, or `GRIT_APPROVAL_DIR`) and edits to `.grit-hook-state.json` or `.grit/<scope>/hook-state.json`. The approval store records a human's consent to run each CHECK; the hook state carries the loop guard. An agent that could edit either could grant itself execution rights or reset its own release valve. The handler sees only edits Amp's helpers recognize (edit, create, patch, and in-place `sed`); a shell command that writes the same file is not intercepted.
- Two command-palette entries under the **Grit** category. **Gate status** runs `gate-check.mjs --status`, which executes nothing, and shows the result. **Approve pending checks** runs `gate-check.mjs` in its default mode, which executes checks a human already approved and lists the oracles that still need approval without running them, shows each exact CHECK line in a confirmation dialog, and only after **Approve and run** is chosen runs `gate-check.mjs --approve`. Declining records nothing.

## Failure posture

Every failure path allows the turn to end and writes a note to the plugin log. A missing skill, a hook that exits non-zero, a hook that prints something other than JSON, or a workspace that Amp has not opened all produce no continuation. A broken hook never traps a session. Cancelled and errored turns are never continued, whatever the ledger says.

## Where the plugin looks for grit

The plugin does not bundle the skill. It searches, in this order: `GRIT_SKILL_DIR`; `skills/core/grit` under the workspace root (this repository's own layout); `.agents/skills/grit`, `.claude/skills/grit`, and `.codex/skills/grit` under the workspace root; the repository layout relative to the plugin file itself; `~/.config/agents/skills/grit` (where `amp skill add --global` writes, honoring `XDG_CONFIG_HOME`); `~/.claude/skills/grit`; `~/.codex/skills/grit`; and a `grit` directory under `~/.cache/amp/global-skills/`. The last location is inferred from the shape of Amp's plugin cache and has not been confirmed against a hosted skill; set `GRIT_SKILL_DIR` when the skill lives somewhere else.

## Installing

Amp loads plugins from `.amp/plugins/` in a project and from `~/.config/amp/plugins/` for every project on one machine. Amp refuses a plugin path that contains a symbolic link, so the file has to be copied, not linked.

```bash
# every project on this machine
bash scripts/install-adapters.sh --tool amp-plugin

# one project
mkdir -p .amp/plugins && cp adapters/amp/plugin/tqn-grit.js .amp/plugins/
```

`amp plugins add <url>` installs a single-file plugin from a URL into `~/.config/amp/plugins/`, or into the current project's `.amp/plugins/` with `--target workspace`. The raw URL of this file on the `dev` branch is the source for that command. That path was not exercised while writing this adapter; the copy commands above were.

After installing, run `plugins: reload` from the command palette, or in a thread ask Amp to load `.amp/plugins/tqn-grit.js`. `amp plugins list` shows it as `tqn-grit` with the events `agent.end` and `tool.call` and the commands `grit-status` and `grit-approve`.

The plugin is plain ES module JavaScript rather than TypeScript so that the repository's Node 20 test harness can import it and drive it with a stand-in `PluginAPI`. Amp loads `.js` plugins the same way it loads `.ts`.

## What was verified

`test/scripts/grit-amp-plugin.test.mjs` imports the plugin, hands it a stand-in `PluginAPI`, and asserts against the ledger fixtures: an unmet ledger continues the turn and names the gate, a met ledger and a missing ledger do not, cancelled and errored turns are never continued, the release valve fires after six blocks, a crashing or garbled delegate allows the turn, protected paths are rejected and ordinary paths allowed, and the approve command shows the exact CHECK and records nothing when declined.

The plugin was also loaded in a live Amp orb thread on this repository. With an unmet fixture ledger at the workspace root, the turn ended and Amp immediately started a new one with the plugin's continuation message naming `GATES:G2`; the hook state recorded one block for the thread. An attempt by the agent to create a file under `~/.grit/approved/` was rejected with the plugin's message. The two commands were exercised through the test harness, not through the command palette.
