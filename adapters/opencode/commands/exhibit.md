---
description: Build an interactive, branded HTML page that walks a reader through a topic as a journey
agent: build
---

Build an exhibit page for `$ARGUMENTS` with the exhibit skill.

Resolve the brand first: `--theme <skill>` for one of the six theme skills, or `--brand <path>` for a directory holding a `PROFILE.md` in the branding-system schema, that file, or a `.skill` archive. If the brand has no profile, derive one by the steps in `skills/branding/exhibit/BRAND.md`, show it, and stop until the user has reviewed it. Read the topic source the user points at; do not fetch a URL at build time. Write `STORYBOARD.md` by the rules in `JOURNEY.md` and the grammar in `ACTS.md`, and show it before building. Run `node skills/branding/exhibit/scripts/scaffold.mjs --storyboard STORYBOARD.md --out <page.html> --theme <skill>` or `--brand <path>`, adding `--variant`, `--mode`, `--register`, or `--fonts` when the user names one. Author each act between its markers from the matching playbook under `acts/`, using only the primitives in `PRIMITIVES.md`, and name motion effects in the storyboard rather than writing them. Run `node skills/branding/exhibit/scripts/verify.mjs --in <page.html> --storyboard STORYBOARD.md --theme <skill> --pdf <page.pdf>`, read the contact sheet, and open the page yourself. Report the path, bytes, checksum, theme, variant, mode, register, grade, fonts, and the verify summary as printed; if no browser was found, report `render: not run` rather than describing the page as verified. Fix a failure in the act, never by widening the profile or weakening a check.
