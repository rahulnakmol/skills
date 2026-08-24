# Skill: Case

**Group:** pm · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/pm/case/SKILL.md)

Case builds the business case a sponsor approves at the Investment gate: at least two real options plus the do-nothing alternative, each costed on build, run, opportunity, and agent-fleet spend, with a stated sensitivity — the single assumption that would break the recommendation.

## When to invoke

- An epic manifest or TOM is ready and needs sponsor investment approval.
- The user asks to build a case, justify spend, or weigh options.

## How it fits

Case is grilled before it reaches the sponsor, and it is approved alongside the epic manifest at the Investment gate. Its benefit projections feed directly into `realize`'s register, so the case and the eventual actuals trace to the same line items.

## Key references

- [CASE-METHOD.md](https://github.com/tqnonline/skills/blob/main/skills/pm/case/CASE-METHOD.md) covers options, the do-nothing option, costs and benefits, and sensitivity.
- [COSTING.md](https://github.com/tqnonline/skills/blob/main/skills/pm/case/COSTING.md) covers build, run, agent-fleet, and opportunity cost, plus how actuals are tracked.

## How to use

Run Case once `carve` or `tom-architect` has produced its output. It weighs at least two options against do-nothing, costs each including the agent fleet's own token and run budget, and names the assumption most likely to break the recommendation before the sponsor sees it.

## Best practices

- Never present a single option as inevitable — a case is a comparison.
- State the agent-fleet cost as an explicit line, not folded silently into build cost.
- Do not claim a benefit that cannot be measured later.

## Sibling skills

Reads from `carve` or `tom-architect`. Approved at the Investment gate. Feeds `realize`.
