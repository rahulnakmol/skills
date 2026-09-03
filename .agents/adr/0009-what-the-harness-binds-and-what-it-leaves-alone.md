# ADR 0009: What the harness binds, and what it leaves alone

## Status

Accepted

## Context

ADR 0008 introduced a contract block — invocation, thesis limb, tool verbs, trace kind — and scoped it to the sixteen capabilities ported from the reference set. Those sixteen now ship promoted, which leaves the repository with fifty skills of which sixteen declare a permission surface and a trace obligation, and thirty-four declare neither.

That asymmetry is not stable in either direction. A harness that covers under a third of the catalog describes an intention rather than a boundary, and nothing in the tree explains why one skill is bound and its neighbor is not. Extending it to all fifty by rule would be worse: it would require every skill to name a trace kind, including skills that write nothing and skills whose entire deliverable already is the reasoning a trace would hold. The repository would then hold fifty declarations, a growing share of them false, and `retro` would mine a corpus of entries nothing ever appended.

The question this record answers is which skills the harness should actually bind, decided from evidence rather than from symmetry. Each of the thirty-four uncontracted skills was assessed against its own `SKILL.md` and doctrine siblings: the narrowest verb set its procedure requires, whether it owns a run scope or executes inside one another skill owns, and whether its run makes decisions that its own output artifact cannot hold.

The assessment also found two contracts already shipping that do not hold together. `wait-what` declares `trace: repitch` while holding only `[read]`, and `triage` declares `trace: triage` while holding `[read, write-tracker]`. A trace lives at `.grit/<scope>/TRACE.md`, which is a repository write. Neither skill can write the trace it declares. Both resolve it correctly in prose — the session that owns the scope records the entry — but the contract has no vocabulary for that, and nothing in the harness noticed the contradiction.

## Decision

**The binding rule.** A skill's deliverable either can hold its own discarded reasoning or it cannot, and that is what decides whether the skill writes a trace.

Where the artifact's form structurally excludes what was rejected, a trace is warranted. An epic manifest lists the epics that passed; a product constitution lists the five principles that survived; a grill round cannot contain the hypothesis it rejected. No amount of care in the document closes that gap, because the shape of the document is what excludes them.

Where the discard is a handful of lines a reader would want beside the conclusion anyway, it belongs in the artifact and not in a second file. One record beats two that can disagree, which is the argument this repository already makes against a second state root. A business case with no rejected options is not a business case; its discards are its content.

Stated as a test an author can apply: **not "does this skill write a document", but "can the discard fit inside the document without deforming it".**

**Three bindings, not one.** The contract binds skills at three strengths, and the difference is visible in the block itself.

*Verbs bind every skill with a procedure.* The permission surface is cheap to declare, always true, and it is the key that makes a caller's exposure legible — that `chart` writes to a tracker, that `report` sends outward, that `recon` only reads. Every skill that carries `## Procedure` declares `verbs`.

*Trace binds only where the artifact cannot carry the reasoning.* Applying the rule above to the thirty-four gives thirteen skills that warrant one — `sdlc`, `slice`, `safeguard`, `deliver`, `recon`, `grit`, `brief`, `discover`, `carve`, `constitution`, `tom-architect`, `grill`, and `chart` — and nineteen that do not. `trace: none` becomes a defined value meaning the run's decisions are recoverable from the artifact its `## Output contract` names. Declaring it is a claim about that artifact, not an exemption, and it is dishonest wherever the artifact does not in fact carry them.

*Two skills carry no contract at all.* `responsible-ai-governance` has no `When to invoke`, no `Procedure`, and no `Stop conditions`; the README types it `overlay`, a third value the contract's invocation axis does not admit; and every reference to it is a call from inside another skill's numbered step. Any verbs it declared would credit it with writes its callers perform. `ask-pm` is a pure router: it maps intent to a name and hands off before any scope exists, sharpening no decision at a gate and leaving no audit artifact. Both ship as they are, and the harness does not pretend to bind them.

**Scope ownership becomes explicit.** A skill that owns a scope writes its own trace and must hold `write-repo` to do it. A skill that runs inside another's scope may still contribute an entry, which the owning session records — the pattern `wait-what` already describes in prose. The contract gains the vocabulary to say which, so a declared trace kind and the verbs to write it can no longer disagree unnoticed.

## Consequences

- Thirty-two of the thirty-four gain a contract, nineteen of them declaring `trace: none`. The harness stops describing an intention and starts stating a boundary, and the boundary is legible: a reader can see why `press` writes no trace and `deliver` does.
- The two incoherent contracts are repaired rather than grandfathered, and the harness gains a check that a declared trace kind requires the verbs to write it, or an explicit statement that the owning session records it.
- `retro` becomes worth running across the catalog. Today it would mine sixteen skills; after this it mines thirteen deliberate traces instead of fifty perfunctory ones, which is the difference between a signal and a corpus of empty entries.

## Settled since this record was written

Three of the questions below were answered after the assessment, and one of them was answered against the recommendation this record originally carried.

**The verb set gains two.** `write-host` writes outside version control, and `execute` runs commands the skill did not author. The first four verbs could not express the two largest capabilities in the catalog, and a permission surface that cannot name its biggest exposure is decorative. Both are narrow by design: `write-host` marks a write that no review sees and no revert undoes, which `grit`'s checker enforces by refusing to run when its approval store resolves inside the repository; `execute` marks a command arriving as data, which excludes a skill invoking fixed project tooling and excludes `press` spawning a browser with arguments its own script wrote. Two skills hold them: `grit` both, `brief` the first. A verb that fires twice but marks the highest-risk skill in the catalog is doing its job, as `publish` does for four.

**An initiative's trace lives in `specs/`, not in `.grit/`.** This record first proposed defining `<scope>` as the initiative slug and keeping the pm trace at `.grit/<slug>/TRACE.md`. Reading the tree settled it the other way: no pm skill references `.grit/` at all, the pm group's system of record is the initiative repository's `specs/` tree, and pm gates are human sign-offs rather than runnable checks, so there is no ledger for a trace to sit beside. A hidden directory next to `specs/` would have been the second state root the spine forbids, and the less-read of the two, because the sponsor opens `specs/`. The rule is now one sentence with two shapes: a trace lives with the artifacts of its scope — `.grit/<scope>/TRACE.md` for software delivery, `specs/{prefix}-trace.md` for an initiative.

**`{prefix}` is defined.** Nine pm output contracts used it and no document said what it was. It is the initiative's slug, kebab-case and stable, the same string the monorepo mode uses for its folder.

## Open questions this record does not settle

These surfaced during the assessment, each carries evidence, and each is a decision rather than a cleanup.

- **`report` sends outward and names no human approval.** It is the only skill in the pm group whose text contains none of "human", "approve", "sign-off", "signs", or "review", and the only one that routes a pack to leadership. The harness rule that a publishing skill must name its approval is right, and it will reject `report` until the skill says who signs the pack before it is sent. The gap is in the skill, not in the rule.
- **Charter skills delegate their permission surface to adapters.** `architect` and `safeguard` are four steps, two of which are "load adapter" and "follow SPEC-TS". A contract on the charter would declare verbs for work the adapter performs, which no reader of the `SKILL.md` could check, and `CLAUDE.md` already says tool-native bodies live under `adapters/`. Either the procedures name their channel and their fix policy, or the contract belongs on the adapter.
- **One unresolved word costs a verb.** `architect` and `safeguard` surface trade-offs "via an issue/PR comment". An issue comment is `write-tracker`; a pull request comment is `publish`. Until the procedure picks a channel, neither contract can be narrow and honest at once.
- **A disposable worktree is undefined.** `shakedown` builds a pull request head in a sibling worktree that exists so the verification pass never disturbs the branch under review. Whether that counts as `write-repo` is not settled by the verb's definition, and the question recurs for every sandboxing skill.
- **ADR 0008 promised a check that was never built.** It said the suite would gain a test that every skill declaring a trace writes one in its dry-run fixture. `test/fixtures/` holds `grit`, `press`, and `recon` only, so a declared-but-never-appended trace kind is undetectable today. That promise is either kept or withdrawn.
