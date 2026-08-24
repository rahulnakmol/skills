# Personas: one system, every altitude

The same gates, contracts, and evidence serve every rung of a career. What changes is the question each persona asks of them. One principle holds across the ladder: this system is designed to build the people who use it. Human judgment is the scarce end of its thesis, and every gate exists to grow that judgment — never to substitute for it. This page walks the ladder from a first job to the C-suite.

![One system, every altitude](https://raw.githubusercontent.com/wiki/tqnonline/skills/assets/persona-ladder.svg)

## Starting out

For someone early in their career, this system grows your judgment rather than exercising it for you. The gates encode disciplines that took the industry decades to name — critique before code (the [pickup protocol](Architecture-Agentic-Pods) reviews a work item before anything is built), machine-checkable acceptance criteria (vague "done" never survives the contract check), one concern per pull request (the [stacking rule](Skill-Deliver) keeps every change small enough to hold in your head) — but they apply these disciplines by asking you their questions, not by answering them. When the assess stage posts a critique, the open questions on that thread are yours: answering them, work item after work item, is how the method becomes yours instead of the system's. The measure of progress is not how much the agents do for you; it is how many of the gates' questions you now ask unprompted. A useful path: read [Skill: Impact](Skill-Impact) to see how an idea becomes a plan, follow one work item through [Architecture: Agentic pods](Architecture-Agentic-Pods) — and answer your first critique yourself, before reaching for an agent.

## Architect and engineering manager

At this altitude the system is a delegation instrument. The [work-item contract](Architecture-Agentic-Pods) is precise enough that a cold pickup — human or agent — acts correctly without a hallway conversation. The [routing rule](Architecture-Loop-vs-Graph) replaces case-by-case orchestration decisions with one test: can the outcome be verified? Model choice is a [governed registry](Skill-Model-Routing), not a per-developer preference. The practical gain is parallelism without contention: pods work simultaneously because file ownership is part of the contract, and a single writer holds each checkout.

## CTO

For a CTO, the question is throughput without surrendering review quality, and the answer here is structural. Agent-generated changes arrive as [stacked, reviewable pull requests](Skill-Deliver) — dependency-ordered, single-concern, merged base-to-tip — never as one giant diff no one can honestly review. Every pull request gets a [sandboxed shakedown](Skill-Shakedown): built, tested, and actually executed, with a blocking review on a red run. The delivery pipeline's human gates mean velocity comes from the agents between the gates, not from removing the judgment at them.

## CDAIO and CIO

At the top of the ladder the question becomes accountability. Every consequential decision in this system has a named human owner and a service-level agreement — a typed `human` node in the orchestration graph, not a phrase in a policy document. Every agent action traces to an approved PRD, a recorded [governance tier](Skill-Responsible-AI-Governance), and an audit trail designed to be regulator-readable. Model selection follows a [published, allowlisted registry](Skill-Update-Models) reviewed on a disclosed schedule and enforced in continuous integration. For a regulated estate, the governance overlay converts frameworks — the NIST AI RMF, ISO/IEC 42001, the EU AI Act, SR 11-7 — into work items with their own tests, which is the difference between compliance as a document and compliance as a property of the system.

## The PM ladder

The developer group's ladder climbs the engineering side of the practice; the [pm group](Group-PM) climbs the business side, rung for rung, on the same gates and the same evidence — **two sides of the same** AI-transformation coin, not two separate systems.

![The PM ladder](https://raw.githubusercontent.com/wiki/tqnonline/skills/assets/persona-ladder-pm.svg)

The ladder runs **Product · Program · Project Manager** — where `discover`, `map`, and `carve` teach root cause and DIVE the way the developer ladder's early rungs teach critique before code — up through **Business Architect** — TOM design, maturity gaps, and the agent-owner blind-spot review — to **Transformation Leader** — roadmap, PI planning, and RAID, with the agent fleet run as an owned team rather than a tool — and finally to **Chief Business Transformation Officer**, where the question becomes the same one the CDAIO and CIO ask on the engineering side: accountability, north-star rollup, realized benefits, and portfolio cost including the agent fleet's own spend.

Two more roles sit alongside this ladder rather than on it. The **Agent Owner** is any PM at any rung once they are running the blind-spot checklist unprompted — covering the fleet's blind spots and having the fleet cover theirs, in both directions. The **Operations Chief of Staff** reads the pm group's leadership pack the way a CTO reads the delivery pipeline's stacked pull requests: as the operating rhythm of the transformation, not a status email. Where the developer ladder ends in the FDE, Architect, CTO, CDAIO, and **Chief Intelligence Officer**, the pm ladder ends in the PM, Agent Owner, Business Transformation Leader, Operations Chief of Staff, and CBTO — the same four gates, read from the business side of the ledger.
