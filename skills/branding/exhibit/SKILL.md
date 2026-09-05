---
name: exhibit
description: Build one self-contained, interactive HTML page that walks a reader through a topic as a journey, in the colors, type, motion, and voice of a named brand. User-invoked. Use when someone asks to "explain this topic as an interactive page", "make an explorable explainer", "visualize how this works in our brand", "build a branded walkthrough with controls", "make a cinematic scrolling page about this", or "turn this analysis into a page people can play with". Triggers include a topic plus a theme skill, a brand directory, or a .skill archive.
---

# Exhibit (user-invoked)

Point exhibit at a topic and at a brand. It writes a storyboard, scaffolds a branded shell, authors one act per storyboard row with a figure and a control that changes a model, verifies the page against the brand's own rules, a rendered capture, and a printed PDF, and hands back one `.html` file that fetches nothing.

The page runs on Alpine.js for state, GSAP with ScrollTrigger for motion, and htmx, all pinned by checksum under `vendor/` and inlined. Motion follows the brand's profile: its grade caps how much a page may move, its register (`document`, `product`, or `cinematic`) sets how the page presents, and its durations and curves drive every reveal, counter, drawn figure, morph, spotlight, highlight, and parallax layer. The six theme skills in this group default to the `cinematic` register. A reader who asks for reduced motion gets the same page at rest.

The page is the brand's artifact; the documents in this directory follow the repository's house voice. Two fixtures under `test/fixtures/exhibit/` show the result: `four-gates.html` (ai-branding, `anthropic` variant, `scroll` mode, hook and sandbox) and `in-brand.html` (ai-branding, `openai` variant, `explorer` mode, eight act types with a browser frame). `PLAN.md` holds the design and the research it rests on.

## Contract

```yaml
contract:
  invocation: user
  thesis: scaffold
  verbs: [read, write-repo]
  scope: guest
  trace: none
```

## When to invoke

- A topic needs to be explained to people who will understand it better by changing its assumptions than by reading about it
- A point of view has to be carried in a brand's identity, with the motion and depth of a launch page, and a document rendered by `press` would not let the reader test it
- The user names a theme skill, a brand directory, or a `.skill` archive to build against, or asks for a UI, digital, or print mockup shown in place

## Procedure

1. Resolve the brand as `BRAND.md` describes. `--theme <skill>` names one of the six theme skills. `--brand <path>` takes a directory holding a `PROFILE.md` in the branding-system schema, that file, or a `.skill` archive. If the brand has no profile, read the brand and derive one, show it to the user, and write it beside the brand only after they have read it. Never guess a color or a rule the source does not state.
2. Read the topic source yourself: the document, repository path, or notes the user points at. Do not fetch a URL at build time; read it and write from what it says.
3. Write `STORYBOARD.md` by the rules in `JOURNEY.md` and the grammar in `ACTS.md`: a fenced `yaml` block with `storyboard.title`, `question`, `thesis`, `audience`, optional `mode` (`scroll`, `deck`, `explorer`) and `register`, and `acts`, each with `type`, `claim`, and optional `id`, `figure`, `interaction`, `export`, `motion`, `frame`. The first act is a `hook`; a `sandbox` or `decision` closes the argument; a `glossary`, if present, is last. Show the storyboard to the user before building.
4. Scaffold the shell:

   ```bash
   node skills/branding/exhibit/scripts/scaffold.mjs --storyboard STORYBOARD.md --out topic.html (--theme <skill> | --brand <dir|PROFILE.md|file.skill>) [--variant <name>] [--mode scroll|deck|explorer] [--register document|product|cinematic] [--fonts system|embed|link] [--title <text>]
   ```

   The script prints the path, bytes, checksum, theme, variant, fonts, mode, register, grade, vendor set, and act list. It exits `2` for a storyboard it cannot parse, a brand it cannot resolve, a profile that fails validation, an act that asks for an effect the brand's grade or `forbid` list rules out, or a font file it cannot find, naming each problem. A register above what the grade permits is lowered and reported.
5. Author each act between its `<!-- exhibit:begin id -->` and `<!-- exhibit:end id -->` markers, following the act's playbook under `acts/` and using only the Alpine directives, runtime directives, components, classes, and frames in `PRIMITIVES.md`. Each act carries one claim, one figure whose `<title>` says what it shows, a control that changes something the claim depends on, and a `.x-takeaway` that states the current result. Name an effect with its directive; never write a tween by hand. Page copy follows the brand's voice. Edit nothing outside the markers.
6. Verify:

   ```bash
   node skills/branding/exhibit/scripts/verify.mjs --in topic.html --storyboard STORYBOARD.md [--brand <same as above>] [--variant <name>] [--budget <bytes>] [--sheet <png>] [--captures <dir>] [--pdf <file>]
   ```

   Every check is named. The render pass opens the page in a Chromium-family browser at 1280 and 390 px in light and dark scheme, brings every animation to rest, fails on any console error, measures overflow, tap targets, and body text size, and writes one capture per act and a contact sheet. `--pdf` prints the page and checks that the file is valid and paginates one act per page in `deck` mode or the `cinematic` register; that PDF is what `press` takes for a print edition. Fix a failure in the act, or in a genuine script bug; do not weaken a check or edit the profile to pass.
7. Read the contact sheet and the captures. Then open the page yourself, move each control, step each stepper, re-weight each comparison, and press the export button. The script measures; the reading is yours. If no browser is found, verify exits `1` and says so; install one or set `CHROME_PATH`, or pass `--no-render` and report that the render pass was not run.
8. Report the artifact path, bytes, and checksum, the theme, variant, mode, register, grade, and fonts used, the verify summary with the sheet and PDF paths, what was checked by eye, and any `brand_exceptions`.

## Stop conditions

- The brand has no profile and the user has not reviewed a derived one → stop after showing the derived profile; do not build against an unreviewed brand
- The storyboard has no act whose control changes a model → the topic is a document; hand it to `press` instead
- `scaffold.mjs` or `verify.mjs` exits `2` → read the named problem; do not edit the shell or the profile by hand to get past it
- A brand rule can only be met by a color, font, or effect the profile does not allow → keep the rule, change the figure, and record the trade-off in the report
- No browser is available for the render pass → report `render: not run` and what was checked by eye instead; do not describe the page as verified

## Output contract

```yaml
artifact:
  path: topic.html
  bytes: 381640
  sha256: "<hex>"
storyboard: STORYBOARD.md
mode: explorer
register: cinematic
acts: [hook, map, mechanism, compare, evidence, timeline, decision, glossary]
brand:
  theme: ai-branding
  variant: openai
  grade: expressive
  profile: skills/branding/ai-branding/PROFILE.md
  profile_derived: false
  fonts: system
verify:
  structural: pass
  brand_rules: pass
  brand_exceptions: []
  render: pass
  sheet: topic.sheet.png
  pdf: topic.pdf
exit: 0
```

The shell is deterministic: one profile, storyboard, and title produce the same bytes. The acts are authored, so two runs on one storyboard can differ; determinism is claimed for the shell and the checks, not for the page. `verify.mjs` exits `0` when every check passes, `1` when a check fails or no browser was found, and `2` when it could not read an input.

## Files in this directory

- `PLAN.md`: the research, design decisions, and the build record. Load when the question is why exhibit is built this way.
- `BRAND.md`: how a page finds its brand (`--theme` or `--brand`), what the scripts take from a profile, and the procedure for deriving a profile for an external brand. Load in step 1.
- `JOURNEY.md`: the eight narrative rules a storyboard follows. Load in step 3.
- `ACTS.md`: the act grammar, the storyboard fields per act including `motion` and `frame`, the registers, and the delivery modes. Load in step 3.
- `acts/hook.md`, `acts/map.md`, `acts/mechanism.md`, `acts/compare.md`, `acts/evidence.md`, `acts/timeline.md`, `acts/decision.md`, `acts/sandbox.md`, `acts/glossary.md`: one playbook per act type. Load the ones the storyboard uses in step 5.
- `PRIMITIVES.md`: the shell's classes, Alpine and runtime directives, components, figure conventions, frames, registers, modes, export, and print behavior. Load in step 5.
- `scripts/scaffold.mjs`, `scripts/verify.mjs`, `scripts/browser.mjs`, `scripts/runtime.js`, `templates/shell.html`, `vendor/`: the toolkit. Node 20, no dependencies; the render pass drives a Chromium-family browser over its debugging pipe; `vendor/manifest.json` pins each inlined library by sha256.
