# Skill: Brief

**Group:** productivity · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SKILL.md)

Brief writes the document a team's AI agents read before they do anything: what the team's words mean, what the rules are, and where the deeper material lives. It breaks that content into three layers — definitions, rules, and references — and places each layer in the file the tool actually loads, which differs for every surface a team uses.

## When to invoke

- A team is adopting agents and has no written rules, or has rules scattered across chats and personal settings.
- Agents produce work that violates a convention the team assumed was understood.
- The same instruction is being pasted into prompt after prompt.
- Rules exist for one tool and the team has added another.
- An existing `CLAUDE.md` or `AGENTS.md` has grown long enough that it is no longer being followed.

## How it fits

Brief is the productivity group's first shipped skill. It is the general form of a discipline this repository already applies to itself: `CLAUDE.md` holds the invariants Claude Code reads, `AGENTS.md` states the same voice rule for every other tool and points at the rest, and neither file restates the other's detail. In the pm group, `constitution` covers what a practice stands for; brief covers how that practice's agents work.

## Key references

- [RULES.md](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/RULES.md) — the three layers, the anatomy of a rule that fires, why prohibitions underperform positive instructions, single source of truth, what not to write down, and how to test a rule by running work.
- [SURFACES.md](https://github.com/tqnonline/skills/blob/main/skills/productivity/brief/SURFACES.md) — which file each surface loads, how to choose the canonical one, what to do for surfaces that have no repository file, and how to scope a rule to part of a repository.

## How to use

Start with the inventory: most teams already have rules in two places that disagree, and reconciling them is the first deliverable. Then collect the corrections people repeat, sort them into definitions, rules, and references, and write each rule with a trigger, an instruction, and an observable result. Place the layers per `SURFACES.md`, with one canonical file and pointers elsewhere. Finish by running a real task on each surface to confirm the rule fired, then name an owner and a review date.

## Best practices

- Verify placement by running work, not by rereading the file. A rule that did not fire usually has a trigger that failed to match, and the fix is sharper wording rather than a longer explanation.
- Let the environment be the source of truth for anything an agent can read directly — script names, directory layout, linter configuration. A brief that restates them is a copy that goes stale invisibly.
- Delete on sight. A file half full of dead rules teaches agents, and new team members, that the other half is optional.
- Keep personal preferences in personal configuration. Preference in a shared file is how shared files lose their authority.
- For surfaces with no repository file, such as Claude Desktop and Cowork, package the rule as a skill; project instructions are faster but unreviewed and invisible outside that project.

## Sibling skills

Sits alongside the pm group's `constitution`. The routers `ask-pm` and `ask-fde` are the clearest worked examples of the trigger wording this skill teaches.
