---
name: glossary
description: Model-invoked construction of a project's shared domain vocabulary. Use when the same concept carries several names across code and conversation, or before a new agent or contributor needs the project's language written down.
---

# Glossary (model-invoked)

Build the project's domain vocabulary one term at a time, and write it where every contributor and every agent already reads.

An agent dropped into a project guesses at jargon and uses twenty words where one would do, and the code takes those twenty names with it. A written glossary is the correction.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read, write-repo]
  trace: term
```

## When to invoke

- One concept carries several names in the codebase — `account`, `customer`, and `tenant` for the same row
- An agent or a contributor asks what a project term means, or guesses at it mid-task
- A new module introduces domain nouns the project has never defined
- A review argues about what a word means rather than about what the code does
- The user asks for a glossary, a domain model, or a shared language

## Procedure

1. Read the existing glossary in the project's context file first. A term list assembled without it produces a second vocabulary, which is the problem this skill exists to prevent.
2. Harvest candidates from two sources: the nouns the code already uses — types, tables, modules, route segments, test names — and the nouns the current conversation uses. Record where each was found, because a term with no source is speculation.
3. Challenge every candidate against the glossary. Ask whether it names a new concept or a second name for one already defined. Most candidates are the second kind, and the answer is an entry on the existing term's avoid list, not a new term.
4. Stress-test each surviving definition on edge cases. Name one case the definition must cover and one it must exclude. A definition that excludes nothing is a label, not a definition.
5. Record each term with a definition of one or two sentences and an explicit **avoid** list of the near-synonyms it replaces, so a reader learns which words to drop, not only which word to keep.
6. Flag genuine ambiguity instead of resolving it. When the record shows one word used for two concepts, write both readings, mark the term unresolved, and name who decides. Picking one quietly writes a decision nobody made.
7. Write the result to the project's context file as one section, alphabetized, so a reader can find a term without reading the list.
8. Append the trace entry: terms added, candidates merged into existing terms, ambiguities left open, and the file written.

## Stop conditions

- The project has no context file → ask where the glossary belongs and write nothing; a glossary in a file nothing loads is maintenance cost with no payoff
- A candidate has no agreed meaning → record it unresolved with both readings and the decision owner, and move on
- The glossary contradicts the code → report the contradiction rather than editing either side; only a human can say which one is wrong
- The existing glossary is stale → say so before adding to it, because a glossary is trusted, and a wrong one misleads further than an absent one
- The harvest yields more than roughly a dozen new terms → the scope is too wide; narrow to one subsystem and run again

## Output contract

```yaml
source: <subsystem, file set, or conversation harvested>
added:
  - term: settlement window
    definition: the interval during which a captured payment can still be reversed
    seen_in: [src/billing/capture.ts, test/reversal.test.mjs]
    avoid: [clearing period, reversal window, chargeback period]
merged:
  - candidate: customer account
    into: tenant
unresolved:
  - term: active
    readings: [signed in within 30 days, subscription not canceled]
    decide: <owner>
written_to: <project context file>
counts: { added: 3, merged: 4, unresolved: 1 }
```

The payoff is consistent naming, faster navigation, and fewer tokens spent re-explaining the domain in every session. The cost is maintenance, and it is real: a glossary is only worth its upkeep while it matches the code.

## Sibling skills

- `recon` — the read-only codebase brief that supplies the nouns worth harvesting
- `architect` — names modules and decisions; a module named for a glossary term needs no second explanation
- `tdd` — test names carry the vocabulary into the suite, where drift becomes visible
- `core/TRACE.md` — the trace this skill appends to
