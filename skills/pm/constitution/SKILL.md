---
name: constitution
description: User-invoked Product Constitution author and reviewer — principles, positioning, and the prioritization framework every downstream pm skill reads for alignment. Use to create, evolve, or review the practice or an initiative's constitution.
---

# Constitution (user-invoked)

Codify what the practice, or one initiative, stands for — the DNA every agent-assisted decision checks against.

## Contract

```yaml
contract:
  invocation: user
  thesis: gate
  verbs: [read, write-repo, publish]
  scope: owns
  trace: amendment
```

## When to invoke

- No constitution exists yet at `specs/product-constitution.md` (Create mode)
- The user wants to evolve one or more sections (Co-author mode)
- A constitution has passed its quarterly review date, or the user asks for a review (Review mode)

## Procedure

1. Detect mode from file state: no file → Create; file exists, user names sections → Co-author; file exists and is due or overdue → Review
2. Determine hierarchy level: overall practice constitution, or one initiative's constitution inheriting it (`CONSTITUTION.md`)
3. Create: work the seven sections in order, `AskUserQuestion` in small batches, write the Tier 2 detail files then assemble the Tier 1 compact summary
4. Co-author: read the current section, ask what changed, revise in two or three rounds, update the summary and the section's `Last reviewed:` date
5. Review: run a grill session over the constitution's own claims — what held, what the quarter refuted, what the research bets returned
6. Land every revision as a pull request, never a silent edit, per `INITIATIVE-REPO.md`

Append the trace entry under the `amendment` kind: the principles cut to stay within the limit, and what the quarter refuted in review. The constitution states what the practice believes, not what it considered and rejected, and a refuted principle simply disappears from the text.

## Stop conditions

- A section still contains a generic platitude — no principle should be one everyone already agrees with
- More than five principles — force the hard choices instead

## Output contract

`specs/product-constitution.md` (compact summary) plus `specs/constitution/*.md` (seven detail files), each carrying a `Last reviewed:` date on a quarterly cadence.

## Sibling skills

`discover`, `prd-draft`, `prd-review`, `carve`, `tom-architect` each read the applicable constitution chain before drafting.
