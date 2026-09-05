# Amp adapter

[Amp](https://ampcode.com) is an agentic coding tool from Sourcegraph. It runs in a terminal, in an editor, and in orbs, which are cloud sandboxes Amp creates for a thread. Amp reads skills in the same `SKILL.md` format this repository uses, so every skill here works in Amp as written. This adapter adds the parts Amp needs around the catalog: install commands for one skill, one group, or everything at three scopes; two small kinds of Amp-only skill; an opt-in plugin that enforces the `grit` ledger at turn end; and orb lifecycle scripts for anyone who opens this repository itself in Amp.

The adapter copies no skill. Every install points Amp at the one home of a skill under `skills/`, and the only files that live here are the ones Amp cannot get from that path (see [ADR 0010](../../.agents/adr/0010-amp-distribution-by-source-path.md)).

## How Amp finds skills

Amp discovers skills in four kinds of place. A project skill sits in `.agents/skills/<name>/SKILL.md` inside the repository Amp is working in. A personal skill on one machine sits in `~/.config/agents/skills/`, where `amp skill add --global` writes. A Personal Skills repository, hosted by Amp, syncs to every orb and CLI session its owner opens. A Workspace Skills repository does the same for every member of an Amp workspace. Amp also ships ten built-in skills of its own. When two skills share a frontmatter `name`, Amp uses the first in this order: local directories, built-in skills, the personal repository, the workspace repository. None of the 59 skills here shares a name with a built-in skill.

`amp skill add <source>` installs a skill by copying the directory that holds its `SKILL.md`. The source can be a GitHub path such as `tqnonline/skills/skills/pm`, a Git URL, or a local directory. Amp scans one level below the source for `SKILL.md` files, so pointing it at a group directory installs every skill in that group, and pointing it at one skill directory installs that skill. Pointing it at the repository root installs nothing, because no `SKILL.md` sits one level below the root.

Two consequences shape this adapter. First, a group's doctrine files (`skills/core/VERIFICATION.md`, `skills/pm/GATES.md`, and their siblings) hold no `SKILL.md`, so `amp skill add` leaves them behind; the doctrine wrappers below carry them. Second, `amp skill add` reads a skill's `requires:` line but does not act on it, so a theme skill installed alone would arrive without `branding-system`; the install script resolves that.

## Install

The install script takes the same selection flags as `scripts/link-skills.sh` and turns them into `amp skill add` commands. It adds core to any group, the required skill to any skill that declares one, the doctrine wrapper for each group involved, and the `tqn` router. Run it with `--print` to see the commands without running them.

| Scope | Who sees the skills | Command |
|---|---|---|
| This project | Anyone working in the current repository, in an orb or locally | `scripts/install-amp.sh --group pm --target .agents/skills` |
| Personal, this machine | You, in every project on this machine | `scripts/install-amp.sh --group pm --global` |
| Personal, every orb | You, in every orb and CLI session | `scripts/publish-amp-skills.sh --scope personal --group pm` |
| Workspace | Every member of your Amp workspace, in every orb | `scripts/publish-amp-skills.sh --scope workspace --group pm` |

Replace `--group pm` with `--skill <name>` for one skill, repeat either flag to combine selections, or omit both for every skill. Add `--from github` to `install-amp.sh` to install from GitHub instead of the local checkout; the GitHub default branch is `dev`.

Without the script, the commands are plain `amp skill add` calls. These install the pm group, its doctrine, core and its doctrine, and the router into the current project:

```bash
amp skill add tqnonline/skills/skills/pm
amp skill add tqnonline/skills/skills/core
amp skill add tqnonline/skills/adapters/amp/skills/pm-doctrine
amp skill add tqnonline/skills/adapters/amp/skills/core-doctrine
amp skill add tqnonline/skills/adapters/amp/skills/tqn
```

Add `--global` to each for a personal install on one machine. One caution: `amp skill add` exits with status 0 even when a skill fails to install, so read its report. The script does this for you and exits 1 when any source reports a failure.

### Publishing to a hosted repository

`scripts/publish-amp-skills.sh` clones your Personal Skills or Workspace Skills repository (or initializes one when Amp has not created it yet), copies the selection in as top-level skill directories, and commits. It does not push. The script prints the push command, and the push is your decision, because the push is what makes the skills load for other people. Run it with `--dry-run` first to see the selection. The hosted copy carries a `PUBLISHED-FROM.md` that names the source commit, so a reader can trace a hosted skill back to `skills/`.

The hosted repository is the one place this adapter produces a copy of a skill. Edit skills in this repository and publish again; do not edit the hosted copy.

## The Amp-only skills

`adapters/amp/skills/` holds two kinds of skill that exist only for Amp.

`core-doctrine`, `developer-doctrine`, and `pm-doctrine` are generated by `scripts/gen-amp-doctrine.mjs` from the doctrine files at each group's root. Each is a `SKILL.md` that lists the documents it carries, plus byte-identical copies of those documents. They exist because `amp skill add` cannot install a directory that has no `SKILL.md`. Run `node scripts/gen-amp-doctrine.mjs` after changing a doctrine file; `--check` reports drift and is part of the test suite. Groups whose root holds only a README get no wrapper.

`tqn` is a hand-written router. It tells Amp where a citation such as `core/VERIFICATION.md` or `GATES.md` resolves after an install, which Amp capability to prefer where one overlaps a catalog skill, how the catalog's `agent` and `human` nodes run as Task subagents, orb threads, and schedules, and how the `model-routing` tiers map to Amp's modes. It adds no procedure of its own.

## Where Amp already does the job

Eight catalog skills overlap something Amp has built in. The catalog skill keeps the discipline it encodes; Amp does the mechanical part. The `tqn` skill carries the full table. In short: `research` uses Librarian and web tools for sources; `recon` uses Finder, Librarian, and the `explaining-code` skill; `handoff` records thread URLs and leans on `read_thread`; `model-routing` and `update-models` map tiers to Amp modes rather than to model identifiers; `shakedown` runs the branch in an orb; `brief` works with Amp's AGENTS.md handling and the `writing-prompts` skill; `spotlight` renders through the `creating-charts` skill and `diagram` blocks; `exhibit` and `press` find Chrome for Testing already installed in every orb.

## Completion discipline in Amp

`grit` works in Amp as written. Amp has no stop hook, so by default nothing blocks a turn from ending while gates are unmet; the `tqn` skill asks the agent to run `gate-check.mjs --status` before reporting work done, and `grit-gates.yml` is the backstop in CI.

The opt-in plugin at [`adapters/amp/plugin/tqn-grit.js`](plugin/README.md) closes that gap the way the Claude Code and Codex hooks do. It listens for Amp's `agent.end` event, runs the same vendored `stop-hook.mjs` the other two hosts run, and when the ledger has unmet gates answers with a continuation message that starts the next turn and names them. The six-block release valve inside the hook still applies. The plugin also rejects tool edits to the approval store and the hook state, and adds two command-palette entries, **Grit: Gate status** and **Grit: Approve pending checks**. Install it for every project on one machine with `scripts/install-adapters.sh --tool amp-plugin`, or for one project by copying the file into `.amp/plugins/`; Amp refuses symbolic links for plugins. It is not part of any default install, for the reason ADR 0006 gives for the other hooks: it changes turn behavior, so a maintainer turns it on deliberately. It was verified with a fixture-driven test suite and one live orb thread on this repository; the plugin README states exactly what was and was not exercised.

## Working in this repository from an orb

`.agents/setup` links every skill and the Amp-only skills into `.agents/skills/` through `scripts/link-amp-skills.sh`, so an orb opened on this repository sees all of them as project skills without copying a file. `.agents/resume` repeats the link on every wake and turns off Amp's commit trailers in the orb's own settings file, because the repository forbids agent attribution and a script cannot set environment variables for the running Amp process. `.agents/skills/` is gitignored.

## Using the skills in another repository

Install the skills at the scope you want, then add a short rule to that repository's `AGENTS.md` so Amp reaches for them. Amp reads `AGENTS.md` at the start of every thread.

```markdown
## Skills from tqnonline/skills

The skills `grit`, `research`, `retro`, and the pm group are installed for this
project. Load `tqn` first when using any of them; it maps their citations and
execution shapes onto Amp. Run `grit`'s `gate-check.mjs --status` before
reporting work done.
```

## Commit attribution

Amp adds `Co-authored-by: Amp` and `Amp-Thread-ID` trailers to commits by default. This repository forbids agent attribution. In a repository that carries that rule, set `amp.git.commit.coauthor.enabled` and `amp.git.commit.ampThread.enabled` to `false` in the Amp settings file, or export `AMP_DISABLE_AMP_COAUTHOR_TRAILER=1` and `AMP_DISABLE_AMP_THREAD_TRAILER=1` in the environment Amp starts from.
