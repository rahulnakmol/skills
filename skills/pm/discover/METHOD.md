# Discovery method

Ported from the source `discover` skill's Intake > Clarify > Analyze > Classify sequence, adapted to open with substrate and hat classification and to question by the grill's round protocol rather than a fixed script.

## Intake

Discovery begins by confirming the substrate exists — an initiative repository, bootstrapped if this is the first session, per `INITIATIVE-REPO.md` — and by classifying which hat this engagement wears, product or transformation, per `HATS.md`. A first-pass problem statement, an entry-mode signal, and a scope indicator are gathered before anything else; solution-first framing ("we need to build X") is redirected back to "what problem does X solve?"

## The five dimensions

Clarification proceeds across five dimensions, questioned in the grill's themed rounds rather than a single long form: business context (industry, model, objectives), stakeholder landscape (decision-makers, influencers, end users), problem definition (statement, impact, root-cause hypotheses, and the functional and non-functional requirements the solution must satisfy, each with a stated scope boundary), constraints and dependencies (budget, timeline, technical, organizational), and success criteria (KPIs, acceptance thresholds, risk tolerance). Where the boundary between what is in scope and what is not is unclear, discover ideates it with the user directly rather than assuming one. Raw inputs the user brings — meeting notes, transcripts, spreadsheets — are accepted and normalized per `RESEARCH-AGENTS.md` rather than re-asked for.

## Root cause

Every problem statement is decomposed with Five Whys or Fishbone before it is accepted as final, distinguishing root causes from symptoms rather than treating the first plausible cause as the answer. An influence-interest matrix maps the stakeholders gathered in the prior dimension, and dependencies across those stakeholders are mapped explicitly rather than assumed. A single stakeholder's account is never treated as the full picture; triangulate across at least three sources before writing the analysis down.

## Classification

Every engagement is classified into one of four initiative types — Product Development, Process Improvement, Process Automation, or AI/Agent-Based Automation — using the decision tree that starts from whether the capability exists today, moves to whether the goal is automation, and finally to whether the work requires cognitive judgment. The classification, together with the problem statement, stakeholder register, root causes, constraints, and success criteria, is presented to the user for confirmation before the analysis document is written and handed off to `map`.
