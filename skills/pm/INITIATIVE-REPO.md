# Initiative repositories

## The initiative repository

PM work is git-native. Where the developer group's system of record is a software repository, the PM group's is an initiative repository — the transformation's own home for its evidence, its registers, and its report packs, versioned and reviewable the same way code is. `discover` verifies or bootstraps this substrate at intake, in one of three modes, before any real work begins. Every mode shares one rule: nothing that matters to the transformation lives only in a chat transcript or a local file. If it matters, it lives in the repository.

## The specs tree

Every initiative repository carries a `specs/` tree at its root, mirroring the developer group's own convention (see `REPO-SETUP.md` for the shared bootstrap pattern). Inside it: `specs/research/` holds the evidence corpus — meeting notes, transcripts, and raw data normalized by the research agents (`RESEARCH-AGENTS.md`), later cited by the grill (`grill`). The constitution, the case, the epic manifests, and the PRDs each land in their own file or folder under `specs/`, so the whole practice's grounding is one `git log` away from anyone who asks how a decision was reached.

## Monorepo mode

Some organizations run many initiatives out of one repository rather than one repository per initiative. In monorepo mode, each initiative gets its own folder under `initiatives/<initiative-slug>/`, and each folder carries its own complete `specs/` tree exactly as the default mode would. The slug follows an agreed naming convention: kebab-case, stable once created, optionally year-prefixed for portfolios that run the same initiative theme across cycles (`2026-billing-modernization`). One tracker serves the whole monorepo, with per-initiative labels distinguishing which work belongs to which folder — the pickup protocol and the work-item contract apply unchanged.

## Git LFS

PM work carries binary artifacts that source-controlled prose does not: slide decks, spreadsheets, exported visuals, signed PDFs. Track `*.pptx`, `*.xlsx`, `*.png`, and `*.pdf` through Git LFS via a `.gitattributes` file at the repository root, and verify `git lfs install` has actually run at bootstrap — a repository that silently commits large binaries as regular blobs degrades for every future clone. When LFS tooling is unavailable, the skill says so plainly and the PM chooses consciously: keep binaries out of the repository (link to them instead) or accept the bloat with eyes open. Never silent bloat.

## Artifact changes are pull requests

A constitution revision, a PRD update, a case revision — every one of these is a pull request, not a direct commit to the default branch. This is what "reviewable" means in practice: a diff a stakeholder can read, comment on, and approve before it becomes the record. The habit is borrowed directly from the developer group, where a spec change is never silently overwritten either.

## Shared-repo mode

When the initiative's outcome is a software delivery — the PM's epic PRD is about to feed the developer group's `impact` pipeline, or straight into `slice` — the PM does not stand up a second, parallel system of record next to the software repository. Instead the PM works inside that repository's own `specs/` tree: one repo, two groups, one tracker, one pickup protocol. This is the substrate mode that makes the "two sides of the same coin" framing literal rather than metaphorical — the PM and the FDE are often reading the same files.
