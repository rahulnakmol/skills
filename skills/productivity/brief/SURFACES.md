# Surfaces: where each tool reads its rules

A rule only exists where a tool actually loads it. The same paragraph placed in the right file changes an agent's behavior and placed in the wrong one changes nothing, which is why teams often believe they have set a rule that no agent has ever read. This document maps the brief's three layers onto the files each surface loads.

These conventions change as the tools change. Check the current documentation for any surface before relying on a path here, and confirm placement by running a task (`RULES.md`, "Testing a rule") rather than by trusting the table.

## The portable core

The skills catalog is the one form that travels everywhere. `npx skills@latest add tqnonline/skills` installs it to `.agents/skills/`, which most tools read, and to `.claude/skills/`, which Claude Code reads. That matters for a brief because a rule packaged as a skill reaches surfaces that have no repository file at all — a desktop assistant, or a workspace assembled outside a checkout. When a team works across both kinds of surface, the most portable home for a rule is a skill; the per-tool files below carry what remains.

## The surfaces

| Surface | Loads rules from | Best home for |
|---------|------------------|---------------|
| Claude Code | `CLAUDE.md` at the repository root, plus a `CLAUDE.md` in a subdirectory when work happens there; `.claude/skills/`; personal rules in the user's own `~/.claude/CLAUDE.md` | The canonical brief in most teams, because the file sits in the repository and is reviewed like code |
| Claude Desktop | Project instructions on a Claude Project; skills enabled in settings | Definitions and rules for work that has no repository — briefing documents, analysis, planning |
| Cowork | Skills and plugins enabled for the account; the repository's own rule files when the session works inside a checkout | Rules packaged as skills, so they travel with the account rather than with one folder |
| OpenCode | `AGENTS.md` at the project root; a global `AGENTS.md` in the user's OpenCode configuration directory; `.agents/skills/` | A pointer to the canonical brief, plus anything specific to this tool's runner |
| Codex | `AGENTS.md`, root and nested; a global `AGENTS.md` in the user's Codex configuration directory; `.agents/skills/` | Shares `AGENTS.md` with OpenCode — write it once for both |
| Cursor | `.cursor/rules/` rule files, which can be marked always-apply or scoped to a file pattern; `.agents/skills/` | Rules that apply only to certain paths, which this surface expresses natively |
| GitHub Copilot | `.github/copilot-instructions.md`; scoped instruction files under `.github/instructions/`; `.agents/skills/` | A pointer to the canonical brief; scoped files for path-specific conventions |

Several of these tools have added support for the `AGENTS.md` convention beyond the rows above, and support continues to spread. Where a surface reads both its own file and `AGENTS.md`, prefer `AGENTS.md` and let the tool-specific file point at it — one file that several tools read is worth more than several files that agree today.

## Choosing the canonical file

Pick one file to hold the brief, and let every other surface name it instead of copying it.

- A team working mostly in one repository should make the repository's own rule file canonical: it is versioned, reviewed in pull requests, and it travels with a clone.
- A team spread across surfaces with no shared repository should make a skill canonical, since a skill installs to every surface the catalog supports.
- An individual with rules that are theirs rather than the team's should keep those in the personal configuration file for their tool, not in the repository. Personal preference in a shared file is how shared files lose their authority.

This repository is its own worked example. `CLAUDE.md` holds the invariants Claude Code reads, and `AGENTS.md` states the same voice rule for every other tool and points at `CLAUDE.md` and `.agents/writing-docs.md` for the rest. Neither file restates the other's detail.

## When a surface has no file

Claude Desktop and Cowork have no repository file to place a rule in. Two options, and the choice depends on how the team works:

- **Package the rule as a skill.** It then loads on the same terms everywhere, and it stays under version control in the skills repository.
- **Put it in project instructions.** Faster to set up and easy to change, but it lives inside one project, it is not reviewed, and it is invisible to anyone who does not open that project's settings.

Prefer the skill for anything the team is accountable for, and project instructions for the conveniences of one person's working context.

## Scoping a rule to part of a repository

Where a rule applies to one area rather than the whole repository, place it in that area rather than adding a condition to a global file. Claude Code loads a subdirectory's `CLAUDE.md` when work happens there, Cursor scopes a rule file to a file pattern, and Copilot scopes an instruction file the same way. A scoped rule costs nothing on the tasks it does not govern, which is the same reason references sit behind pointers.

## The rule that survives every tool

Tool-specific power belongs in the tool's own file and never inside a skill, so a skill never breaks a surface that lacks a feature. That is the same rule this repository applies to its adapters, and the wiki's [Tool-Guidance](https://github.com/tqnonline/skills/blob/main/wiki/Tool-Guidance.md) page documents how a capability degrades when a tool cannot run it. A brief written this way loses fidelity on a weaker surface; it does not stop working.
