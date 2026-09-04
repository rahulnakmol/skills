# The docs site

This directory holds the source for the documentation site at
[tqnonline.github.io/skills](https://tqnonline.github.io/skills/), a Jekyll
site built and deployed from this repository. This page is for maintainers:
how the site is put together, how to work on it in this environment, and the
runbook for the domain cutover to `knowledgehub.tqnonline.com`.

## Structure

- `_config.yml` — site title, the `url` and `baseurl` Jekyll uses to build
  every absolute link, and the three collections the site is built from:
  `skills`, `groups`, and `journeys`.
- `_skills/`, `_groups/`, `_journeys/` — one Markdown page per skill, per
  group, and per journey. Each carries a frontmatter contract (`layout`,
  `name`, `title`, `description`, and collection-specific fields such as
  `lens` or `steps`) that `test/site/` checks on every page.
- `_layouts/` — the four templates (`default`, `skill`, `group`, `journey`)
  that render those pages.
- `_includes/` — shared partials: navigation, the footer, the persona-lens
  switcher, and the light/dark theme toggle.
- `_data/skills.json` — the generated catalog every page and layout reads
  from. It is not hand-edited; see below.
- `assets/` — the site's own CSS and JavaScript.
- `index.html`, `leaders.md`, `llms.txt`, `404.html` — the home page, the
  leaders-audience page, the `llms.txt` index for language-model crawlers,
  and the not-found page.
- `Gemfile` — the Ruby gems the Jekyll build needs: `jekyll`, the SEO and
  sitemap plugins, and `webrick` (Ruby 3 dropped it from the standard
  library, and `jekyll serve` needs it).

## Generated data

`site/_data/skills.json` is produced by `node scripts/gen-docs-data.mjs`,
run from the repository root. The script reads `.claude-plugin/plugin.json`
for the list of promoted skills and each one's `SKILL.md` frontmatter for
its name and description, and writes a deterministic JSON catalog grouped
by the six skill groups. The command fails loudly — a missing `SKILL.md`, a
frontmatter `name` that does not match the directory, or a missing
description all stop the build rather than shipping a page with a hole in
it. Run it after adding, renaming, or removing a promoted skill, before
building the site or running `test/site/`.

## Tests

`test/site/` is the test suite for this directory: frontmatter contracts,
that every `plugin.json` entry has a page and no page is an orphan, that
every internal link resolves, that code examples in the pages are real,
re-run commands rather than illustrative snippets, and SEO and language
checks. It runs as part of `node scripts/run-tests.mjs` from the repository
root, alongside every other test in the repository. `test/site/smoke.mjs`
is separate: it fetches the live, already-deployed site and is not part of
the offline suite (see Deployment, below).

## Building the site in this environment

The repository's `.agents/setup` script installs Ruby, Bundler, and the gems
locked in `Gemfile.lock` when a fresh Amp orb starts. To build the site after
setup, generate its data from the repository root, then run Jekyll from this
directory:

```bash
node scripts/gen-docs-data.mjs
node scripts/gen-chooser-data.mjs
cd site
bundle exec jekyll build
```

The Pagefind search index is still built in CI. The docs workflow runs on
every push and pull request that touches `site/`, `skills/`,
`.claude-plugin/`, or `scripts/gen-docs-data.mjs` (see
`.github/workflows/docs.yml`). A pull request runs the build but never
deploys from it. Only a push to `main` deploys.

## Deployment

`.github/workflows/docs.yml` runs on every push to `main` and on every pull
request that touches the paths above. Its build job regenerates
`site/_data/skills.json`, runs the full test suite, builds the Jekyll site,
and builds the Pagefind search index. On `main`, a second job deploys that
build to GitHub Pages. On a pull request, the build runs and is checked,
but nothing deploys — the real build is proved before merge rather than
after it.

`.github/workflows/docs-smoke.yml` runs after a successful deploy (or on
demand via `workflow_dispatch`) and calls `test/site/smoke.mjs` against the
live URL, defaulting to `https://tqnonline.github.io/skills`. It is the one
place in the docs pipeline allowed to touch the network: it fetches the
already-deployed site and confirms a handful of pages actually came back,
rather than re-checking anything the offline suite already covers before
deploy.

## Domain cutover runbook

The site serves today at `https://tqnonline.github.io/skills/`. The owner
plans to move it to `https://knowledgehub.tqnonline.com/skills/` after a
DNS cutover. That cutover is a repository-owner action outside this
repository and outside CI; it is recorded here so the steps and their order
are not lost between now and when it happens.

1. **Create the root Pages repository.** Create `tqnonline/tqnonline.github.io`
   containing a `CNAME` file with the single line `knowledgehub.tqnonline.com`.
   GitHub Pages reads that file to know which custom domain the
   organization's root Pages site answers to; project sites such as this
   one (`tqnonline/skills`) inherit the custom domain from the root once it
   is set, and continue to serve at `<custom-domain>/<repo-name>/`.
2. **Point DNS at GitHub Pages.** In Cloudflare, add a `CNAME` record named
   `knowledgehub` pointing at `tqnonline.github.io`. Set it DNS-only
   (Cloudflare's proxy off) until GitHub has issued the TLS certificate for
   the new hostname — a proxied record at this stage can prevent GitHub
   from completing domain verification and certificate issuance.
3. **Set the custom domain on GitHub.** In the root repository's Settings →
   Pages, set the custom domain to `knowledgehub.tqnonline.com` and, once
   the certificate is issued, enable "Enforce HTTPS." After this step,
   `tqnonline/skills` serves at `https://knowledgehub.tqnonline.com/skills/`
   automatically — no change to this repository's Pages settings is needed,
   because a project site follows the organization's root domain.
4. **Update this repository for the new domain.** Once the new domain is
   live, three things need to change here, in order:
   - Update `url` in `site/_config.yml` from `https://tqnonline.github.io`
     to `https://knowledgehub.tqnonline.com` (`baseurl` stays `/skills`).
   - Regenerate: run `node scripts/gen-docs-data.mjs` and
     `node scripts/gen-wiki-stubs.mjs` so every generated page and wiki
     stub picks up the new absolute URLs (`gen-wiki-stubs.mjs` reads the
     site's `url` and `baseurl` directly from `_config.yml`, so it needs no
     separate edit).
   - Update the absolute URLs written by hand in `site/llms.txt` to the new
     domain; that file is not generated and does not update on its own.
5. **Verify.** Run `node scripts/run-tests.mjs` (the offline suite checks
   internal links, not the live domain) and, after the next deploy,
   `node test/site/smoke.mjs https://knowledgehub.tqnonline.com/skills` to
   confirm the live pages resolve at the new address. `test/site/site-seo.test.mjs`
   currently asserts `_config.yml`'s `url` is `https://tqnonline.github.io`
   verbatim; that assertion needs updating to the new domain as part of this
   step, or the offline suite will fail after step 4's `_config.yml` edit.

Until step 3 is complete, `tqnonline.github.io/skills/` keeps serving the
site normally — none of the earlier steps take the current URL down.
