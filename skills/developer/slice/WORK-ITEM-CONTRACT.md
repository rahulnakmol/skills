# Work item contract

Every issue `raise` publishes to GitHub or Linear is agent-executable by construction — a human or an agent picking it up cold, with no other context, must be able to act on it correctly. That means every section below is present, and the pickup protocol at the end is honored before a single line of implementation is written.

## Goal

One sentence. A measurable outcome, not a task description — "reduce checkout timeout errors to under 0.1%" rather than "fix the checkout bug."

## Parent links

The epic or feature this item belongs to, and the PRD it traces back to. A work item with no parent link cannot be traced to the business value that justified it, and must not be raised.

## Context

A short excerpt of the relevant SPEC-TS section, plus concrete repository pointers — file paths, existing patterns to follow, adjacent tests. Enough for a cold pickup to orient without re-reading the entire PRD.

## Scope and file ownership

The exact paths this item owns for the duration of its implementation. This is what lets multiple pods work in parallel without write contention — single writer per checkout is enforced structurally by this section, not by hoping two pods don't collide. If a path is ambiguous between two work items, that ambiguity is a blocking question for the pickup critique, not something to resolve by convention at implementation time.

## Non-goals

What this item explicitly does not do, named to stop scope creep at pickup rather than during implementation. A non-goal is as load-bearing as a goal — it is what keeps a bounded worker bounded.

## Acceptance criteria

Machine-checkable only. "Looks right" and "should work" are not acceptance criteria; a specific assertion, a specific status code, a specific metric threshold are. If a criterion cannot be checked by a command or a test, it is not ready to ship as a work item — it belongs back in `impact` or `slice` until it can be made concrete. Each criterion is also gate-able: expressible as a `CHECK:` command and an `EXPECT:` token in a gate ledger per `grit/LEDGER.md`, and classified under one of that ledger's five dimensions.

## Verification

The exact commands a verifier runs to confirm the acceptance criteria hold — test invocations, lint commands, a specific manual check script. Verification is not "run the test suite and see" — it names which tests, which command, which expected exit behavior.

## Coverage and use-case traceability

Every acceptance criterion above — functional and non-functional alike — has a named test, tracked in a traceability matrix per `core/COVERAGE.md`: one row per criterion, the test that proves it, pass or fail. Functional criteria cover what the change does; non-functional criteria cover how well it does it (latency, degradation under a slow dependency, backward compatibility, the security boundary of any new input surface) — an item with no applicable non-functional criteria states so explicitly, the same "not applicable" discipline the Governance section below uses, never silent omission. The code implementing the item's business capability holds to **85-90%** coverage on the diff; code at an integration boundary holds to **75-80%**. Both floors are checked by `deliver-work-item`'s verifier before a PR is raised, and again by `shakedown-pr`'s tests lens before merge.

## Constraints and guardrails

Anything the implementer must not do: dependencies it cannot add without approval, migrations it cannot perform unilaterally, security or compliance boundaries it cannot cross. Constraints here are enforced the same way non-goals are — named up front, not discovered mid-implementation.

## Execution profile

The routing decision from `conduct`'s `RUBRIC.md`: mode (`loop` | `graph` | `hybrid`), the model tier resolved via `model-routing` for this specific role, and the intended pod size. This section is what lets a headless run pick the right harness configuration without re-deriving the routing decision from scratch. It also records the expected delivery shape: a single pull request, or a reviewable stack of layered pull requests per `deliver/STACKING.md` when the change spans more than one concern. The profile also records the verification depth for this item: a depth the user named, or the recommendation from `grit/METHOD.md`'s rubric, and which of the two it was.

## Governance

Populated whenever the parent PRD's risk and governance tier is `limited` or `high` (see `impact/PRD-TEMPLATE.md`); left explicitly marked "not applicable — tier: none" otherwise, never silently omitted. When populated, this section carries: the **audit trail** requirement (who, what, when, which model and version, which inputs, which decision — immutable, regulator-readable, never sampled away), the **explainability** hooks needed so the reasoning and evidence behind any automated decision are reconstructable after the fact, and the **human-in-the-loop** checkpoints required above the agreed autonomy threshold for this item. These are first-class deliverables with their own acceptance criteria and verification commands, not a logging afterthought bolted on at the end.

## Headless run block

Generated per-tool commands, each running a critique-then-stop pass before any implement phase — never implementation on first contact with the item:

```
claude -p "…"
opencode run "…"
codex exec "…"
cursor-agent -p "…"   # or Cursor auto mode + native multitask interactively
copilot -p "…"
```

Where the pipeline workflows are installed, the same two phases run as `scripts/pipeline.sh assess <item>` (critique, then stop) and, only after a human moves the item to `ready`, `scripts/pipeline.sh deliver <item>` — with `--engine claude` or `--engine opencode` selecting the harness.

## Definition of done

The final state: acceptance criteria met, the coverage and traceability matrix complete, verification commands passing, constraints respected, governance section satisfied where applicable, and the pickup protocol's `ready → in-progress → done` transition completed with evidence attached to the issue. "Done" is reported only after the verification-before-completion pass in `core/VERIFICATION.md` — the actual diff opened and read against these criteria, not inferred from a green build. Where the item carries a gate ledger, done also means the ledger's final audit per `grit/AUDIT.md` reports zero unmet gates, with any abandoned gate declared and justified rather than deleted.

## Artifacts and handoff

What this item produces and where it lands — the diff, the regression evidence, any new documentation, and what the next item in the epic needs from it. A work item's output is another work item's Context section; keep the handoff typed and explicit rather than implicit in a commit message.

## Pickup protocol

An agent picking up a work item from GitHub or Linear **never implements immediately, machine-checkable acceptance criteria or not.** It first runs a critique pass — checking the item against every section above, against the parent PRD, and against the current state of the codebase — and posts that critique, along with open questions, as a comment on the issue itself. The user answers on the thread. Only when the answers are clear and the item is unambiguous does it advance to implementation.

State is carried as labels or status on the issue, one linear path with one loop-back:

```
raised → critiqued → clarified → ready → in-progress → done
              ↑____________|
        (unclear answer loops back to critiqued)
```

Headless pods honor the identical two-phase shape: the headless block above always runs its critique phase first and stops for answers before its implement phase begins. A pod that implements before reaching `ready` has violated the contract regardless of whether its implementation happened to be correct.
