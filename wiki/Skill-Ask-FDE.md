# Skill: Ask FDE

**Group:** developer · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/ask-fde/SKILL.md)

Ask FDE is a router, not a specialist skill in its own right. When a user knows what outcome they want but not which skill produces it, Ask FDE classifies the stated intent — inception, backlog, build, design, security, release, quality, production, models, governance, or branding — and calls the matching skill directly.

## When to invoke

- The user asks which skill they need, or describes a goal without naming a specific skill.

## How it fits

Ask FDE does not belong to any single stage of the [role journey](Architecture-Role-Journey). It is the entry point across all of them, named for the forward-deployed-engineer role: the person on a team who knows the whole map and can point a colleague to the right door immediately.

## How to use

Run `/ask-fde` and describe the outcome you want in your own words — "I have meeting notes and need a plan," "this PR needs checking before merge." The router classifies the intent and calls the right skill directly, asking one clarifying question only when the intent is genuinely ambiguous.

## Best practices

- Describe the outcome, not the tool — the router maps goals to skills better than guesses about which skill sounds right.
- Once you know the pipeline, call skills directly; the router is a front door, not a required stop.

## Sibling skills

Ask FDE routes to any skill in the developer or branding group. The complete mapping from intent to skill is in [SKILL.md](https://github.com/rahulnakmol/skills/blob/main/skills/developer/ask-fde/SKILL.md#procedure).
