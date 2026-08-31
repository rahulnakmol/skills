# ADR 0007: Groups are independently installable, and no group depends on another

## Status

Accepted

## Context

The repository is organized into five skill groups and presents itself to distinct audiences: the README addresses the engineering side and the business side in separate sections, `Personas.md` carries a separate progression ladder per group, and `ask-fde` and `ask-pm` exist as separate entry points for the two populations. The intent has been that a product manager adopts the pm group and an engineer adopts the developer group, each taking what their role needs.

The packaging never matched that intent. `marketplace.json` declares a single plugin sourced from the repository root, `.claude-plugin/plugin.json` lists all thirty-seven skills in one manifest, and `scripts/link-skills.sh` symlinks every promoted skill into every tool bucket with no way to select a subset. Installing anything installs everything.

Two consequences follow, and both are load-bearing.

First, cross-group references accumulated because nothing prevented them. The pm group currently reaches into developer-group files twelve times: five references to `grit/LEDGER.md`, three to `impact/GRILL.md`, two to `shakedown/VERIFICATION.md`, one to `grit/METHOD.md`, and one to `impact/VALUE.md`. The dependency runs one way — no developer-group file references a pm-group file — but it means the pm group is not installable on its own today. Its gate doctrine, its grill protocol, and its report verification all point at files that would not be present.

Second, the flat installation namespace has a defect that a single manifest hides. `link-skills.sh` names each symlink after the skill's directory basename, and `orchestrate` exists in both the developer and pm groups. The two collide: thirty-seven promoted skills produce thirty-six symlinks, and the developer group's orchestration skill — the one that selects loop, graph, or hybrid execution, and which `sdlc`, `WORK-ITEM-CONTRACT.md`, and `grit` all reference by name — is silently overwritten by the pm group's routing skill of the same name. No test detects this, because the harness verifies that files are well-formed rather than that an installation produces a working set of skills.

## Decision

Each group is independently installable, and no group depends on another. A skill is also installable on its own.

Three rules follow from that, and each is enforced by the harness rather than left to authorial discipline.

**No group references another group's files.** Doctrine that more than one group genuinely needs is shared rather than reached for. Where a shared document exists, it is referenced by every group on equal terms; where sharing is not warranted, the groups state the doctrine independently. What does not continue is one group depending on another group's private files.

**Installation is scoped.** The tooling supports installing one group, several groups, or one skill, and the whole pack remains the default for anyone who wants everything. The manifest and the marketplace entry describe the groups as separately adoptable units rather than as a single indivisible plugin.

**Skill identity is unique across the repository.** Two skills in different groups may not share a directory basename, because installation targets are a flat namespace in every tool this repository supports. The existing `orchestrate` collision is resolved as part of adopting this decision.

## Consequences

- The pm group becomes adoptable by a product manager who has no interest in the software delivery lifecycle, which is what the repository's own audience segmentation has claimed since it was written.
- Shared doctrine needs a home that belongs to no single group. This changes the "exactly five groups" invariant recorded in `CLAUDE.md`, and that change is deliberate rather than incidental.
- One of the two `orchestrate` skills is renamed. Every reference to it moves with it, and the rename is visible to anyone who has already installed the pack.
- Cross-group references become a harness failure rather than a review comment, so the boundary holds as skills are added by people and by agents who will not have read this record.
- Independence is verified by installing a group in isolation and confirming that every path it references resolves. A test that only checks a file's contents cannot establish this, so the harness gains a check that reasons about an installed set rather than about a document.
- The repository accepts some duplication as the price of independence. Where two groups need the same idea and sharing is not justified, saying it twice is preferred to one group reaching into another's directory.
