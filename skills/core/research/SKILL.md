---
name: research
description: Model-invoked source investigation. Use when a question needs an answer from primary sources — official documentation, a specification, or the source code itself — and the finding should be written to a cited file in the repository so a later session reads it instead of repeating the search. Where the tool has its own source-fetching or repository-reading subagent, let it fetch; this skill decides what counts as evidence and writes the cited file.
---

# Research (model-invoked)

Answer a question from primary sources, then leave the answer in the repository with its citations.

## Contract

```yaml
contract:
  invocation: model
  thesis: evidence
  verbs: [read, write-repo]
  scope: owns
  trace: finding
```

## When to invoke

- A decision depends on how a library, protocol, or service actually behaves, and the repository does not already record it
- The same external question has been answered from memory more than once, and the answer keeps changing
- A plan or a design rests on an outside fact that nobody has checked against its source
- A dependency upgrade changes behavior, and the release notes have to be read before the change is planned
- The user asks for the documented behavior, the specification, or the current state of an interface

## Procedure

1. State the question in one sentence, and state what a useful answer would let a reader decide. A question that cannot name its decision produces reading with no end.
2. Rank the sources before reading any of them. Official documentation, published specifications, and the source code itself carry the most trust. Statements from maintainers — release notes, changelogs, issue replies — come next. Reputable secondary writing comes last. Treat a blog post or a forum answer as a lead, not as a fact: follow it to the primary source and cite that instead.
3. Read the primary source rather than a summary of it. Where the source is code, name the file and the version, tag, or commit it was read at. Where the source is documentation, name the page and the product version it documents.
4. Write each load-bearing claim with its citation inline, next to the claim rather than gathered in a list at the end. A reader checking one sentence should not have to guess which of eight sources supports it.
5. Label any claim you cannot cite as reasoning from general knowledge, in the text, where the claim sits. An unmarked claim reads exactly like a sourced one, which is how an assumption becomes a fact nobody rechecks.
6. Record the date of the reading and the version each fact was true of. Documentation moves, and a finding without a date cannot be judged stale.
7. Record what could not be established. An open question stated plainly is more useful than a confident guess, because a guess is indistinguishable from a finding once it is written down.
8. Write the result to a Markdown file in the repository — question, decision, dated findings with citations, unverified claims, open questions. The output is a file rather than a chat answer, so the reading survives the session that did it.
9. Append the trace entry: the question, the sources consulted and their tier, the claims that stayed unverified, and the questions left open.

## Stop conditions

- Only secondary sources support a load-bearing claim → record it as unverified with the lead that was followed, never as a finding
- Two primary sources disagree → record both readings with their citations and dates, and name what would settle it, rather than picking the more convenient one
- Documentation contradicts the code → cite both, treat the code as authoritative for the version read, and say in the file that the two disagree
- The question is broader than one file can answer → narrow it to the decision at hand and record the remainder as open
- No primary source exists for the question → say so plainly; a finding with no source ships labeled as reasoning, or it does not ship

## Output contract

```yaml
question: <the one-sentence question>
decision: <what the answer lets a reader decide>
file: docs/research/<slug>.md
read_on: 2026-09-01
sources:
  - locator: <documentation page, specification section, or source file>
    tier: primary | maintainer | secondary
    version: <version, tag, or commit the fact was true of>
findings:
  - claim: <one load-bearing statement>
    citation: <source and location>
unverified:
  - claim: <stated as reasoning from general knowledge>
    lead: <the secondary source that suggested it>
open:
  - question: <what could not be established>
    settled_by: <what evidence would answer it>
```

## Sibling skills

- `TRACE.md` — the trace this skill appends its finding entry to
- `VERIFICATION.md` — open the written file and read it against the question before reporting the research done
- `VALUE.md` — the lenses a value claim must survive; research supplies the observed numbers those lenses ask for
- `grit` — the gate ledger a decision built on these findings is later held to
