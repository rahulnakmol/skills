# tqnonline/skills v0.7.0

## Minor Changes

Add the documentation site. A Jekyll source under `site/` publishes a page
for every promoted skill — who it is for through a four-audience lens, what
it does, how to call it in each tool, what a good result looks like beside
the common wrong turn, a real example, and how it works — plus six group
hubs, two role journeys, a leaders page, and `llms.txt`.

A test harness enforces the guarantees:

- A skill cannot merge without a page.
- Examples bound to repository fixtures re-run and fail the build when page
  and source drift.
- The plain-language rules are word-boundary tests.
- A smoke workflow checks the live pages after each deployment.

The wiki becomes a lean index: skill and group pages are generated stubs
pointing at the site, produced and drift-checked by
`scripts/gen-wiki-stubs.mjs`, while the architecture and reference pages
keep their content.

The site deploys to GitHub Pages from `main` and carries a runbook for the
`knowledgehub.tqnonline.com` domain cutover.

---

Full history in `CHANGELOG.md`.
