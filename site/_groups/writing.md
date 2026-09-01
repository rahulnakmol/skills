---
layout: group
name: writing
group: writing
title: "Writing: A Charter, Not Yet a Catalog"
description: "Writing is a charter with no promoted skills yet: planned work covers editorial review, documentation-quality checks, and this repository's own explainer voice."
---

Writing is a charter today, not a catalog. No skill in this group has been promoted, so it appears in the site as a placeholder with a stated direction rather than a set of cards to install. Its charter, recorded in `skills/writing/README.md`, names three areas of planned work: editorial review of ADRs and technical documents, documentation-quality linting, and enforcement of the fact-based explainer voice this repository already holds itself to when writing about itself. None of the three carries a committed date.

This repository's own rule is that promoted work lives under `skills/`, and everything else lives in `drafts/`. As of this writing, no `drafts/` directory exists in the repository either — writing has a stated direction and no skill in progress toward it that this site can point to.

Because the group has no skill yet, installing the full pack or naming `writing` specifically adds nothing to what lands in a checkout beyond the charter itself. The install command below is the same one every group in this catalog uses, and it will begin carrying writing's own skills once the group has one to ship:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
