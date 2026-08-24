# Target Operating Model method

Ported from the source `tom-architect` skill's Discover > Scope > Analyze > Design > Map > Visualize > Deliver sequence — the framework a transformation-hat initiative runs to translate a business problem into a structured target operating model across process, organization, service delivery, technology, data, and governance.

## Process decomposition

Processes decompose through a taxonomy of four levels, L1 through L4: L1 is the value chain, L2 the major process groups within it, L3 the detailed process steps, and L4 the task-level activities a role or a system actually performs. Each process at L1 through L3 carries an owner, a frequency, a service-level agreement, its inputs and outputs, and the systems that support it. Depth is a scope decision, not a default — an executive overview stops at L1–L2, a detailed design goes to L1–L4, and the scoping phase decides which before analysis begins.

Every scoped process also carries functional and non-functional requirements with a stated scope boundary: functional requirements are what the process must do — the steps, the decision points, the outputs a downstream process consumes; non-functional requirements are how well it must do it — the service-level agreement, the compliance posture, the volume it must sustain. Where the boundary is not already settled by the SOW or the sponsor, `tom-architect` ideates it with the user directly rather than inferring one from the domain's usual shape.

## Maturity assessment

Every scoped process is placed on a five-point maturity scale: 1-Initial (ad hoc), 2-Developing (partial), 3-Defined (standardized), 4-Managed (data-driven), 5-Optimizing (AI-augmented). A target state defined without first establishing this current-state baseline produces an unrealistic target — the gap between the two is what actually drives the epics `carve` later extracts.

## Organization and RACI

The organization layer maps roles, job profiles, and reporting lines against the decomposed processes, with a RACI assignment — Responsible, Accountable, Consulted, Informed — at each process step. A generic process owner (GPO) overlay records who owns each process end to end, independent of organizational silos, and spans of control are stated explicitly rather than left implied by the org chart.

## KPI framework

KPIs are set at three cadences: strategic (reviewed quarterly), operational (reviewed monthly), and process (reviewed weekly or daily). A KPI framework that only reports at one cadence gives leadership a view but gives no one on the ground a way to catch a problem before it reaches leadership.

## AI augmentation overlay

Every modern TOM classifies each L2 process into one of five categories: Autonomous (fully automated, no human intervention), Human-in-the-Loop (AI executes, a human approves), Copilot Assist (a human executes with AI assistance), RPA (rule-based automation with no AI judgment involved), or Human Only (requires human judgment exclusively). This classification is not a phase-two concern layered on afterward — it shapes the TOM from the first design pass, because a process's AI classification changes its organization design, its KPI cadence, and its platform mapping all at once.

## Platform stacks

TOM capabilities map to whichever enterprise platform stack the initiative has selected: Microsoft (D365 Finance & Operations, D365 Customer Engagement, Power Platform, Azure, Fabric), SAP (S/4HANA, SuccessFactors, Ariba, BTP, Joule AI), Oracle (Fusion ERP, HCM Cloud, SCM Cloud, OCI, Fusion AI), Salesforce (Sales Cloud, Service Cloud, Platform, Agentforce), Workday (HCM, Financials, Planning, Illuminate AI), or ServiceNow (ITSM, ITOM, CSM, HR Service Delivery, Now Assist). Mapping to a platform before processes are decomposed is backwards; the platform mapping is a Phase 5 activity that follows process decomposition, maturity assessment, and organization design, never precedes them. Evidence for platform fit and maturity gaps is commissioned through the deep research agents described in `RESEARCH-AGENTS.md` wherever the TOM's own knowledge of the current-state landscape is thin.
