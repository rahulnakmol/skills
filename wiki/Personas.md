# Personas: one system, every altitude

The same gates, contracts, and evidence serve every rung of a career. What changes is the question each persona asks of them. This page walks the ladder from a first job to the C-suite.

![One system, every altitude](https://raw.githubusercontent.com/wiki/rahulnakmol/skills/assets/persona-ladder.svg)

## Starting out

For someone early in their career, this system is a method to learn from, not just a toolset. The gates encode disciplines that took the industry decades to name, and they apply them on every work item: critique before code (the [pickup protocol](Architecture-Agentic-Pods) forces a review of the work item before anything is built), machine-checkable acceptance criteria (vague "done" never survives the [assess](Skill-Slice) contract check), one concern per pull request (the [stacking rule](Skill-Deliver) keeps every change small enough to hold in your head), and evidence as the only currency of completion. A useful path: read [Skill: Impact](Skill-Impact) to see how an idea becomes a plan, then follow one work item through [Architecture: Agentic pods](Architecture-Agentic-Pods) to see how a plan becomes reviewed, running code.

## Architect and engineering manager

At this altitude the system is a delegation instrument. The [work-item contract](Architecture-Agentic-Pods) is precise enough that a cold pickup — human or agent — acts correctly without a hallway conversation. The [routing rule](Architecture-Loop-vs-Graph) replaces case-by-case orchestration decisions with one test: can the outcome be verified? Model choice is a [governed registry](Skill-Model-Routing), not a per-developer preference. The practical gain is parallelism without contention: pods work simultaneously because file ownership is part of the contract, and a single writer holds each checkout.

## CTO

For a CTO, the question is throughput without surrendering review quality, and the answer here is structural. Agent-generated changes arrive as [stacked, reviewable pull requests](Skill-Deliver) — dependency-ordered, single-concern, merged base-to-tip — never as one giant diff no one can honestly review. Every pull request gets a [sandboxed shakedown](Skill-Shakedown): built, tested, and actually executed, with a blocking review on a red run. The delivery pipeline's human gates mean velocity comes from the agents between the gates, not from removing the judgment at them.

## CDAIO and CIO

At the top of the ladder the question becomes accountability. Every consequential decision in this system has a named human owner and a service-level agreement — a typed `human` node in the orchestration graph, not a phrase in a policy document. Every agent action traces to an approved PRD, a recorded [governance tier](Skill-Responsible-AI-Governance), and an audit trail designed to be regulator-readable. Model selection follows a [published, allowlisted registry](Skill-Update-Models) reviewed on a disclosed schedule and enforced in continuous integration. For a regulated estate, the governance overlay converts frameworks — the NIST AI RMF, ISO/IEC 42001, the EU AI Act, SR 11-7 — into work items with their own tests, which is the difference between compliance as a document and compliance as a property of the system.
