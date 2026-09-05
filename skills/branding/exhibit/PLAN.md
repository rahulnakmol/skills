# Exhibit: plan for an interactive, branded HTML explainer skill

Status: built and promoted to `skills/branding/exhibit`, through Revision 2 (Alpine.js and GSAP runtime, theme coupling, motion grades and registers, frames, PDF). The sections below record the research and the decisions in the order they were taken; the Revision 2 status at the end states what was built and where it differs from the plan.

## The job in one sentence

Point the skill at a topic — a phrase, a markdown document, a repository path, or a URL — and at a brand skill, and it produces one self-contained, branded HTML page that walks a reader through the topic as a journey: a stated point of view, one figure per claim, interactive controls where interaction teaches something, and a sandbox at the end. The page carries the named brand's colors, type, motion, and voice, and reports what it did in a machine-checkable block.

## What the research found

The landscape splits into four families. Each contributes something specific to this design; none of them is a drop-in.

| Family | Representative work | What it gets right | What it leaves out |
|---|---|---|---|
| HTML-over-markdown skills | Thariq Shihipar, "The unreasonable effectiveness of HTML" (20 demo files); `julianoczkowski/html` (12 patterns, locked token set, 200–700 line budget); `paulelliotco/html-skills`; Anthropic's `playground` plugin (controls + live preview + copy-back prompt) | Single file, inline CSS and JS, no network; export the reader's state back to text; one state object drives every render; pattern playbooks keep structure out of the design tokens | Brand is hardcoded in one template; no narrative doctrine; QA is a self-check list, not a rendered inspection |
| Official design skills | `anthropics/skills`: `frontend-design` (per-brief token plan, then a critique pass for generic choices), `canvas-design` (philosophy first, then artifact), `algorithmic-art` (fixed branded chrome, variable content, mandatory template), `theme-factory` (themes as markdown token files), `brand-guidelines` | Separate the stable chrome from the variable content; write the design intent before the code; name the "generated page" tells to avoid | Output is a poster, a React bundle, or a slide theme, not an explainer; tokens are prose, not machine-read |
| Explorable explanations | Bret Victor, "Explorable Explanations" and Tangle; Nicky Case, "How I make explorable explanations"; Distill; Red Blob Games; Idyll (archived); Scrollama for scroll-driven steps | Start with a question and a concrete experience; climb one step at a time; the reader rebuts by changing the model; end in a sandbox so the reader asks their own question | Hand-built by experts over weeks; no agent procedure; the tooling is either dead (Idyll) or a library, not a method |
| Diagram and template catalogs | `markdown-viewer/skills` (14 skills, infographic templates, style × layout catalogs); `coleam00/excalidraw-diagram-skill` (diagrams that "argue", brand file, Playwright render-and-check loop); Napkin AI; reveal.js and Slidev skills | A diagram should mirror the concept's shape (fan-out, convergence, timeline), not a card grid; render the output and look at it before delivering; one brand file drives every figure | Output is a static figure or a deck, not a journey; several depend on a hosted renderer or a Python toolchain |

Two findings shape the design more than the rest.

First, every strong HTML skill converges on the same five conventions: one file, inline everything, no network at render time, a single state object, and an export of the reader's state back to plain text. This plan adopts all five unchanged.

Second, the explorable-explanation tradition supplies the narrative structure that the HTML skills lack. Case's pattern — question, concrete experience, one step at a time, sandbox — and Victor's insistence that the reader can edit the model's assumptions are what make a page a journey rather than a decorated report. The repository's PM group already states the local version of this rule in its visual-compression doctrine: one figure, one claim. Exhibit restates the rule in its own doctrine rather than linking across groups, because a branding skill may not depend on the PM group (ADR 0007).

## Position in this repository

- Group: `branding`. Exhibit is a storytelling skill, the second in the group after `press`. It may reference `core`; it references no other group.
- Invocation: user-invoked, like `press`. A person asks for an explainer; no pipeline calls it.
- Relationship to `press`: `press` renders an approved document without changing a word; exhibit composes a new artifact from a topic. `press` reads a palette file it ships; exhibit reads a brand skill the user maintains (decision 3). Exhibit does not replace `press`, and `press` does not gain interactivity.
- Relationship to the user's brand skills: the user keeps a separate repository of brand skills, each a directory with a `SKILL.md` and reference files in prose, packaged as a `.skill` archive. Exhibit is a consumer of that repository, not an owner. It reads a brand skill, derives the machine-readable part once, and writes the derived file back beside the brand skill so the brand repository stays the single source of truth.
- Relationship to `spotlight`: unknown until that skill lands. Section "Interfaces reserved for spotlight" names the three seams where the two can meet.

## Design decisions

### 1. Scaffold, author, verify — not a pure renderer and not free-hand HTML

Two approaches were on the table.

A renderer in the `press` style would take a structured source (markdown plus fenced blocks such as `figure` or `compare`) and compile it deterministically. It is brand-safe, testable, and escapes untrusted text, but it caps expressiveness at whatever block types the renderer knows, and "highly interactive" is exactly the part a fixed block set handles worst.

Free-hand authoring in the `html` skill style gives the agent full expressiveness, but every artifact is a new design, brand drift is unchecked, and quality rests on a checklist the agent grades itself on.

The plan takes the middle path, in three scripts:

1. `scripts/scaffold.mjs` reads the palette and a storyboard and writes a branded shell: design tokens as CSS custom properties, page chrome (masthead, act navigation, progress, export bar), and a small inline runtime. The shell is deterministic and never hand-edited.
2. The agent authors the acts inside the shell using documented primitives (section "The toolkit"). This is where expressiveness lives.
3. `scripts/verify.mjs` checks the finished file against the contract and, when a headless browser is present, renders each act at two widths and writes a contact sheet for the agent to inspect before it reports done.

The trade-off is honest: the acts are not deterministic, so two runs on the same storyboard can differ. Determinism is claimed for the shell and the checks, not for the whole file.

### 2. One file, inline everything, no network, no vendored framework

The artifact is a single `.html` with inline CSS, inline vanilla JavaScript, and inline SVG. It fetches nothing at render time — no CDN script, no web font, no remote image — so it opens from a mailbox, a shared drive, or a phone. This matches `press`, which already ships no external stylesheet, script, or font.

Version one ships no charting library. D3 or Vega-Lite inlined would add several hundred kilobytes to every page and would pull the agent toward chart types the story does not need. Scroll-driven steps use the browser's `IntersectionObserver` directly; Scrollama is a thin wrapper over the same API. If a later version needs a chart helper, it ships as a small runtime file in this skill (scales, axes, bar, line), not as a vendored third-party bundle.

### 3. Brand comes from a brand skill, through a derived profile

The user's brand skills are written for a model to read, not for a script. The `ai-branding` skill that set this design is a `SKILL.md` and six reference files: two color systems (a corporate identity and a product identity, each with light and dark token sets), type stacks, spacing and motion rules, misuse rules, a voice with a list of phrases to avoid, asset rules that say which system fits which artifact, and compliance checklists. Its tokens appear as CSS custom properties inside fenced code and as markdown tables. A parser could pull the hex values out of that prose, but it could not tell that the three accents cycle in a fixed order, that accents never color body text, or that one system is for documents and the other for interfaces. Those rules are the brand.

Exhibit therefore splits the brand into two layers and gives each to the party that reads it best.

The agent reads the brand skill the way the skill asks to be read: the load-when table in its `SKILL.md`, then the reference files the task needs. From that reading it writes a **brand profile**, one JSON file in a small semantic schema exhibit owns. The schema names the roles a journey page needs rather than the brand's own token names: `canvas`, `surface`, `ink`, `muted`, `border`, `emphasis`, an ordered `series` list, `human` and `agent` for the two node types the diagrams use, `focus`, an optional `dark` set, three font stacks, motion durations and easing, radius and spacing, and a `rules` block for the checks a script can run (allowed colors, forbidden colors, shadow and gradient policy, series limit, minimum text sizes, contrast floor, tap target, reduced-motion requirement, fonts a heading may not use). A `voice.avoid` list carries the phrases the brand rejects. A `review_only` list quotes the brand rules no script can check, so the agent reads them before it reports done. A brand with more than one system, as `ai-branding` has, gets one entry per system under `systems`, a `default_system`, and a `system_for_mode` map.

The scripts read only the profile. `scaffold.mjs` turns it into CSS custom properties in the shell; `verify.mjs` turns the `rules` block into named checks (decision 6). The profile is derived once, shown to the user, and committed **beside the brand skill in the user's brand repository** as `brand-profile.json`. On the next run exhibit finds it and skips the derivation. A brand skill may also ship the profile from the start; the procedure in `PROFILE.md` is the fallback for one that does not. The trade-off is one extra file per brand and a review step the first time each brand is used; in return every later page is checked against a fixed, inspectable set of values instead of an agent's recollection of a prose document.

`--brand <path>` accepts a directory or a `.skill` archive. The archive is a zip; the script unpacks it with the system `unzip` when present and exits `2` with a plain message when it is not, so the script itself stays dependency-free as `press` does.

Two alternatives were rejected. Exhibit shipping its own `PALETTE.md` in the `press` schema would make the skill run alone but would put a second copy of the brand in this repository, and the user has said the brand repository is where brands live. A group-level palette shared with `press` fails for the same reason and also breaks single-skill installs (`link-skills.sh --skill exhibit` links one directory). `press` may later learn to read `brand-profile.json`; that is a `press` change and is out of scope here.

### 4. The system is chosen per page, and fonts are declared, not fetched

A brand with two systems needs a rule for which one a page uses. The `ai-branding` asset guidance assigns document-style output to the corporate system and interactive, product-like output to the product system. An explainer is both. The profile's `system_for_mode` map records the brand's answer; for `ai-branding` the derived map is `scroll` and `deck` to corporate, `explorer` to product. `--system <name>` overrides it for one page, and the output contract records the system used.

Fonts are the one place the brand skill and decision 2 disagree. The corporate system asks for Poppins and Lora through a Google Fonts import; exhibit's page fetches nothing at render time. The default resolves this in the brand's favor where it can and reports where it cannot: the shell declares the brand's full font stack, so a machine with Poppins and Lora installed renders them and any other machine falls to the brand's own named fallbacks (Georgia, `system-ui`). Two flags change this. `--fonts embed` inlines WOFF2 files from a `fonts/` directory beside the brand skill as data URIs, which keeps the page offline at a cost of roughly 100 to 200 KB per face. `--fonts link` emits the import the brand asks for; the page then needs a network connection, and `verify.mjs` records this as a declared exception rather than a failure. The output contract names which of the three was used.

Voice follows the same split as color. Documents written in this repository follow the house voice in `.agents/writing-docs.md`. Text inside a page exhibit produces follows the brand's voice file, because the page is the brand's artifact, not this repository's. `verify.mjs` lints the page text against the profile's `voice.avoid` list; the agent applies the rest of the voice file by reading it.

### 5. A storyboard is written and shown before any HTML

The agent first produces `STORYBOARD.md`: the question the page opens with, the thesis in one sentence, the audience, and one row per act with the claim, the figure that carries it, the interaction (if any) and what it teaches, and the export the act contributes. The user reads that before the build. This borrows `frontend-design`'s plan-then-critique step and `canvas-design`'s philosophy-first step, and it gives the repository a machine-checkable contract to test against: every act in the storyboard must appear in the HTML, and no act may appear that the storyboard does not name.

### 6. Verification means checking the brand's rules and looking at the rendered page

`skills/core/VERIFICATION.md` already forbids reporting done from a green build alone. `verify.mjs` runs three passes.

The structural pass checks the page against exhibit's own contract: one file, no network, storyboard acts present, labeled figures and controls.

The brand pass reads the profile's `rules` block and checks what a script can check. For `ai-branding` that is: every color in the page is in the allowed set for the chosen system; no pure black or pure white except where the profile allows it (the product system's composer surface); no `box-shadow` and no gradient; at most three data series, in the brand's fixed order; the reduced-motion media query is present; the font stacks match the profile; no forbidden font names a heading; body text is at least the stated minimum; each text-on-background pair the page uses meets the contrast floor, computed from the hex values; and no phrase from `voice.avoid` appears in the page text. Each check is named, and each name matches an item in the brand skill's own compliance checklist, so a failure can be traced back to the rule that caused it. The `review_only` list is printed for the agent to read against the page.

The visual pass reuses the browser discovery in `press/scripts/render.mjs`, renders each act at 1280 and 390 pixels wide in the light scheme and once in the dark scheme when the profile has a `dark` set, and writes one contact sheet image the agent opens and checks against the storyboard. Without a browser the script still runs the first two passes and states plainly that the visual pass was skipped, in the same way `press` reports a skipped PDF.

## The journey doctrine (`JOURNEY.md`)

A sibling document, loaded when the agent is planning acts, states the narrative rules. The rules are drawn from the sources above and restate, inside this group, the one-figure-one-claim rule the PM group's visual doctrine already holds.

1. Open with the question and a concrete experience, not with a definition. The reader should do or see something in the first screen.
2. State the point of view in one sentence, early, and attribute it to evidence rather than to confidence. A limitation or trade-off sits next to every benefit, as the house voice requires.
3. One act, one claim, one figure. A figure that carries two arguments is two acts that have not been separated.
4. Climb in order. Each act depends on the one before it and sets up the one after. The reader can scroll back; the page must survive going backward.
5. Interaction must teach. A slider the reader moves has to change something the claim depends on. Decoration is not interaction. A page with no control that changes a model is a document and should go through `press`.
6. Diagrams argue by shape. A one-to-many is a fan-out; a sequence is a line; an aggregation converges. Every arrow carries a verb. Human nodes and agent nodes use the profile's `human` and `agent` colors, which the brand's accent order fixes (for `ai-branding`, the first accent for the human and the second for the agent).
7. End in a sandbox. The last act hands the reader the model's parameters so they can ask a question the author did not.
8. Export the reader's state. Every page ends with a button that emits what the reader chose — parameters, a comparison, a set of notes — as markdown they can paste back into a conversation.

## The act grammar

The storyboard chooses from a fixed set of act types. Each has a playbook file that names its required structure, the primitives it uses, and its failure modes.

| Act | What it carries | Typical figure | Interaction |
|---|---|---|---|
| `hook` | The opening question and a first concrete experience | A small live model or a single striking number | One direct manipulation |
| `map` | The whole territory in one view, before any detail | Labeled overview diagram | Hover or click to preview each region |
| `mechanism` | How one part works | Stepped or animated diagram | Step forward and back |
| `compare` | Two to four options against stated criteria | Side-by-side panels or a criteria matrix | Toggle criteria weights; the ranking updates |
| `evidence` | The data behind a claim | Bar, line, or dot chart with a labeled takeaway | Filter, highlight, or switch series |
| `timeline` | Change over time or a sequence of decisions | Horizontal timeline with the forcing dependency marked | Scrub |
| `decision` | The point of view stated as a recommendation, with what would change it | Options with trade-offs and the recommended one marked in the emphasis token | Reader marks agreement or objections; these join the export |
| `sandbox` | The model, opened up | The hook's model with every parameter exposed | Free play; presets; reset |
| `glossary` | Terms defined in plain language | Hover-linked list | Jump from any term to its first use |

Delivery modes wrap the acts:

- `scroll` — a long page with a sticky figure and scrolling steps; the default.
- `deck` — one act per screen, arrow-key navigation, print stylesheet for PDF; for meetings.
- `explorer` — controls on one side, live model on the other, for a topic that is mostly a sandbox; the `playground` shape.

## The toolkit

```
skills/branding/exhibit/
  SKILL.md              entry point, ≤120 lines, user-invoked
  JOURNEY.md            narrative doctrine, loaded when planning acts
  ACTS.md               the act grammar and delivery modes, loaded when writing the storyboard
  PROFILE.md            the brand-profile schema and the procedure for deriving one from a brand skill
  PRIMITIVES.md         the runtime's classes, data attributes, and events, loaded when authoring
  acts/                 one playbook per act type
    hook.md  map.md  mechanism.md  compare.md  evidence.md
    timeline.md  decision.md  sandbox.md  glossary.md
  examples/
    ai-branding.brand-profile.json   a derived profile, the reference for the schema and the test fixture
  scripts/
    scaffold.mjs        brand profile + storyboard → branded shell with inline runtime
    verify.mjs          structural, brand, and visual passes
    runtime.js          source of the inline runtime; scaffold.mjs inlines it
  templates/
    shell.html          the chrome; profile values land as CSS custom properties
  gallery/
    look.html           swatches, type ramp, callouts, figure frames, rendered from a named profile
    primitives.html     each runtime primitive shown once, working
```

The brand skill itself is not copied into this repository. The example profile holds the values exhibit derived from it, with a `source` block naming the skill, its version, and the files read. `PROFILE.md` documents the schema in a table and the derivation procedure as numbered steps: read the brand's load-when table, read the color, type, pattern, voice, and asset files, fill each role, copy each machine-checkable rule into `rules`, quote the rest into `review_only`, show the result, and write it beside the brand skill.

The inline runtime is small by intent, on the order of a few hundred lines:

- a single `state` object with `set(path, value)` and `subscribe(fn)`; every control writes to it and every figure reads from it
- an act stepper using `IntersectionObserver` that fires `act:enter` and `act:exit` with the direction
- `data-bind` attributes that connect inputs to state paths without per-page wiring
- a `figure` frame with caption, takeaway line, and a "copy SVG" action
- tabs and disclosure built on native `<details>` and radio inputs, so they work with JavaScript off
- an export bar that calls each act's `toMarkdown()` and copies the result
- `prefers-reduced-motion` respected by the profile's motion values, and `prefers-color-scheme: dark` honored when the profile has a `dark` set

`scaffold.mjs` contract:

```bash
node skills/branding/exhibit/scripts/scaffold.mjs --storyboard STORYBOARD.md --out topic.html \
  --brand <dir|file.skill> [--system <name>] [--fonts system|embed|link] \
  [--mode scroll|deck|explorer] [--title <text>]
```

It resolves the brand: a `.skill` archive is unpacked; a `brand-profile.json` in the brand directory is read; if none exists the script exits `2` and names `PROFILE.md`, because deriving a profile is the agent's job, not the script's. It writes the shell with one empty, labeled `<section data-act="...">` per storyboard row, and prints the path, byte size, checksum, and the system and font mode used. Exit `2` on a storyboard it cannot parse, a brand it cannot resolve, or a profile that fails schema validation.

`verify.mjs` contract:

```bash
node skills/branding/exhibit/scripts/verify.mjs --in topic.html --storyboard STORYBOARD.md \
  --brand <dir|file.skill> [--system <name>] [--sheet <path.png>]
```

Structural checks, each a named failure: exactly one file; no `http`, `https`, or `//` in `src`, `href` (other than links the reader follows), `@import`, or `url()` unless the page declares `--fonts link`; no `:root` token redefined outside the shell; every storyboard act present and no extra act; a `hook` first, a `sandbox` or `decision` before `glossary`; an export bar; every `<svg>` with a `<title>`; every arrow with a label; every control with a label; total size under a stated budget. Brand checks as decision 6 lists, each named after the profile rule it enforces. With a browser: capture each act at two widths, write the contact sheet, exit `0`. Without one: exit `1` and say the visual pass did not run.

## Interfaces reserved for `spotlight`

The two skills will meet at three seams. Exhibit builds each one so that ownership can move later without a rewrite.

1. Brand. Exhibit reads any directory that holds a `brand-profile.json`. If `spotlight` becomes the source of a company's or a person's identity, or if it takes over deriving profiles from brand skills, exhibit's `--brand` points at whatever it produces.
2. Storyboard. `STORYBOARD.md` is a plain document with a fenced YAML block. If `spotlight` produces a point of view, a set of highlights, or a narrative frame, it can emit that block and exhibit builds from it.
3. Acts. The `decision` act carries a stated perspective. If `spotlight`'s job is to present a perspective, that act is the natural place for it to plug in, either by supplying the content or by owning the playbook.

Nothing in exhibit's first version depends on `spotlight` existing.

## Output contract

```yaml
artifact:
  path: topic.html
  bytes: 61234
  sha256: "<hex>"
storyboard: STORYBOARD.md
mode: scroll
acts: [hook, map, mechanism, compare, evidence, decision, sandbox, glossary]
brand:
  skill: ai-branding
  profile: ../brands/ai-branding/brand-profile.json
  profile_derived: false        # true when this run wrote the profile for the first time
  system: corporate
  fonts: system | embed | link
verify:
  structural: pass
  brand: pass
  brand_exceptions: []          # for example, "fonts: link declared; page fetches Google Fonts"
  review_only: 7                # brand rules printed for the agent to read
  visual: pass | skipped
  sheet: topic.sheet.png
exit: 0
```

Exit `0` means the structural and brand checks passed and, when a browser was found, the sheet was written and inspected. Exit `1` means the HTML exists and the visual pass did not run. Exit `2` is a usage error or an input the scripts could not read.

## Build plan

Each phase ends with something a person can open. No phase deepens a layer before the whole path runs once.

### Phase 1 — thin slice

- `PROFILE.md` with the schema table; `examples/ai-branding.brand-profile.json`, derived by hand from the user's brand skill and reviewed against it; `templates/shell.html`; `scripts/scaffold.mjs` emitting the shell from a profile and a two-act storyboard (`hook`, `sandbox`); `scripts/runtime.js` with `state`, `data-bind`, the stepper, and the export bar.
- `scripts/verify.mjs` structural checks and the brand checks that need no browser: allowed colors, forbidden colors, shadow and gradient, series order, reduced motion, font stacks, voice avoid-list, contrast.
- One worked example under `test/fixtures/exhibit/`: a storyboard and a finished page on a small topic from this repository (the four decision gates the PM group describes is a candidate, because the source is local and the topic has a mechanism and a decision; the fixture copies the text it needs rather than linking across groups), built against the `ai-branding` profile in the corporate system.
- Tests in `test/scripts/exhibit-scaffold.test.mjs`: deterministic shell bytes for a fixed profile; hostile storyboard text escaped; a profile missing a required role fails schema validation with the role named; a brand directory with no profile exits `2` and names `PROFILE.md`; `--system product` swaps the token set and the dark set appears; `verify.mjs` rejects an external `src`, an unlisted act, a `box-shadow`, a color outside the allowed set, a fourth series, and a sentence containing a phrase from `voice.avoid`.

Done when the example page opens with no network, the slider in the hook changes the model, the export button copies markdown, and `verify.mjs` reports every brand check by name.

### Phase 2 — the journey

- `JOURNEY.md`, `ACTS.md`, and the nine act playbooks.
- `mechanism`, `compare`, `evidence`, and `decision` primitives in the runtime; `gallery/primitives.html` shows each once.
- `verify.mjs` render-and-capture, reusing `press`'s browser discovery; the contact sheet, with a dark-scheme row when the profile has a `dark` set.
- `--fonts embed` and `--fonts link`; a second fixture built in the product system so both systems of the example profile are exercised.
- `SKILL.md` written last, against the finished procedure: resolve the brand (find or derive the profile), storyboard, confirm, scaffold, author, verify, report.

Done when the example page has every act type at least once across two fixtures, the contact sheet renders on a machine with Chromium, and the test that skips the visual pass without a browser is green.

### Phase 3 — modes and promotion

- `deck` and `explorer` modes in the shell and the stepper.
- `.skill` archive input through the system `unzip`.
- `test/structure` additions: the example profile validates against the schema in `PROFILE.md`; `SKILL.md` names every playbook file that exists and no other.
- Promotion checklist per `CLAUDE.md`: move to `skills/branding/exhibit`, add the README index row, the plugin manifest entry, the wiki stub via `scripts/gen-wiki-stubs.mjs`, the branding group README update, and a changeset.

### Status

All three phases are implemented and the skill is promoted to `skills/branding/exhibit`. Two items differ from the plan above. The primitives gallery is not a separate `gallery/primitives.html`; the second fixture, `test/fixtures/exhibit/in-brand.html`, uses each interactive primitive once and a test holds it to that, so one file serves as both fixture and gallery. The render pass finds a browser the way `press` does, then drives it over the DevTools protocol through a pipe (`scripts/browser.mjs`) instead of a one-shot `--screenshot` command, because the visual checks measure the page (overflow, tap targets, text size) and a screenshot alone cannot answer those questions. The routing case for exhibit, `r057`, is recorded in the baseline scorecard as unmeasured; the next scheduled eval run measures it.

### Out of scope for the first release

- Vendored charting or diagram libraries.
- Fetching a URL topic at build time; the agent reads the source itself and writes the storyboard from it.
- Editing a finished page in place; a change goes through the storyboard and a rebuild.
- Video or audio.
- Parsing brand prose with a script. The profile is derived by the agent and reviewed by a person; a parser that guesses at rules would be wrong in ways that are hard to see.
- Trademark and legal checks. The brand skill's legal file is for the agent to read; exhibit does not encode it.

## Revision 2: framework, motion, theme coupling, and print

This section records a change requested after Phase 3 shipped, and the decisions taken on it. Items marked "awaiting approval" change files outside this skill and are not built until the owner confirms them.

### What changed around exhibit

Two commits landed on `dev` while Phase 3 was in progress. `spotlight` shipped in the productivity group as an inline-first visual skill whose last rung is a focused HTML file. Six user-invoked theme skills (`everforest-branding`, `catppuccin-branding`, `ai-branding`, `gruvbox-branding`, `nord-branding`, `solarized-branding`) shipped in the branding group over one model-invoked engine, `branding-system`, which owns a machine profile schema (`schemaVersion 1`: variants, light and dark modes, thirteen color roles, three font roles, provenance), a validator (`scripts/profile-lib.mjs`), and a starter kit builder (`scripts/build-theme.mjs`) that already writes `tokens.css`, a press palette, and a specimen page.

Exhibit's own `brand-profile.json`, hand-derived from an external copy of the AI brand, now duplicates data the repository holds in `skills/branding/ai-branding/PROFILE.md`. Two schemas for one brand is two sources of truth.

### Decisions

1. Exhibit reads the theme profile, not its own. `scaffold.mjs --theme <skill> [--variant <name>] [--mode light|dark]` reads `skills/branding/<skill>/PROFILE.md` through `profile-lib.mjs`; both skills sit in the branding group, so the path reference is allowed. `--brand <dir|.skill>` stays for a brand skill outside this repository, and the file the agent derives from it is a `PROFILE.md` in the branding-system schema, so an external brand repository uses the same validator as the six themes here. Exhibit's `PROFILE.md` schema and `examples/ai-branding.brand-profile.json` are retired. Exhibit's `systems` (corporate, product) become the theme's `variant` and `mode`. Chart series follow the fixed order the engine's own specimen uses: `accent`, `focus`, `success`, `warning`.
2. Motion rules belong to the brand; the motion engine belongs to exhibit. `MOTION-VIDEO.md` already asks that durations and easing be defined by role. The profile gains a `motion` block (grade, durations by role, easing by role, forbidden effects) and a `voice.avoid` list, validated by `profile-lib.mjs` and emitted by `build-theme.mjs` as `--brand-motion-*` tokens. Exhibit implements the named transitions, the frames, the Alpine presets, and the `brand.motion` check that reads them. Awaiting approval: this is `schemaVersion 2` across six theme profiles, the validator, and `test/branding`. Version 1 profiles stay valid; a missing block means the defaults below.
3. The motion system is one system at three intensities, available to every brand. The default grade is `expressive`: long ease-out curves, layered staggered reveals, spring on direct manipulation, depth by opacity and blur. A profile may lower the grade to `fluid` or `calm`; none of the six in-repo profiles does so at first. The register chosen from content picks the intensity within the grade. Reduced motion stays absolute.
4. Alpine.js replaces the runtime. `x-data`, `x-model`, `x-show`, `x-transition`, `$store`, and the Intersect plugin take over state, binding, the stepper, and scroll steps. Both fixtures are re-authored against it. htmx is included in every build; in the single-file delivery it is inert, and in `delivery: served` it loads acts as fragments and lets a mockup call a mock endpoint. Vendored files are pinned by version and checksum under `vendor/` with their license text; `verify.mjs` fails a page whose inlined framework bytes differ from the pin.
5. Press and exhibit stay two skills and share print. A merge was considered and declined: press takes markdown and promises deterministic bytes with no script; exhibit takes a storyboard and ships a runtime. One skill with two procedures and two output contracts would be harder to select and harder to test. Instead, exhibit's `--pdf` prints through the browser driver it already has, using the page tokens press reads (`margin`, `max-width`, `base-size`, `line-height`) from the press palette `build-theme.mjs` already generates, so a press document and an exhibit rendition of the same theme print alike. Awaiting confirmation from the owner.
6. Exhibit owns the `spotlight` transition; the spotlight skill layers on it. Spotlight's focused HTML rung can hand a branded, interactive case to exhibit with a one- or two-act storyboard. The two live in different groups, so each names the other and neither links to the other's path.
7. Mockups are frames, not an act type. A frame is a figure container that renders brand tokens inside a realistic surface, one per surface in `SURFACE-CONTRACT.md`: device (phone, tablet, laptop, browser), social (platform crops with safe areas), email (client chrome with an images-off state), print (sheet sizes with trim, bleed, and fold marks), video (16:9 and 9:16 with title-safe area and lower third), and sign (environmental, drawn to viewing distance). Frames are available to `mechanism`, `compare`, and `sandbox`, and the `product` register reaches for them by default.

### Motion vocabulary

Named transitions an author names and never writes by hand: `reveal` (opacity and a short rise), `focus` (dim siblings), `morph` (one figure state to another), `count` (a number runs to its value), `draw` (an SVG path is stroked in), `spotlight` (a mask dims the page except one region), `highlight` (a marker sweeps across text), `parallax` (layers move at different rates on scroll, `expressive` only). Grades: `calm` allows opacity and color under 200 ms; `fluid` adds translate, stagger, and morph under 400 ms with ease-out; `expressive` adds spring curves, scale, parallax, and scroll-linked scenes.

### Register

The agent reads the content and proposes one register in the storyboard, before any HTML; the user confirms. The profile grade clamps it.

| Register | Content signals | What the page does | Print |
|---|---|---|---|
| `document` | tables, figures with numbers, evidence, a decision | Static figures, minimal motion, controls that change a value and a caption. | Every act prints as it reads. |
| `product` | a workflow, a screen, a feature, states to compare | Frames with interface chrome from brand tokens; state switches that morph one screen into the next. | Each named state prints once. |
| `cinematic` | a story, a launch, a brand narrative, one idea per screen | Full-bleed scenes, scroll-driven reveals, spotlight, highlight, parallax; deck or explorer mode. | Each scene prints at its resting state. |

### Print

A PDF is a second rendition of the same page. `scaffold.mjs --print` writes each act at its default or a named `print_state`, replaces every control with a caption stating the settings, finishes transitions, keeps figures as vector SVG, and paginates one act per page in `deck` and `cinematic`. `verify.mjs --pdf` prints through the browser and checks the file is a PDF, has the expected page count, and carries no rasterized figure.

### Build order

1. Theme coupling: `--theme` through `profile-lib.mjs`; retire the old profile; rebuild both fixtures against `ai-branding/anthropic`. Tests: a theme that fails validation is refused with the validator's message; series order matches the specimen.
2. Alpine and htmx: vendor, pin, inline; rewrite the runtime; re-author fixtures; `structural.vendor-pinned` check.
3. Motion: profile `motion` and `voice` blocks (after approval), transitions, grades, `brand.motion` check, register in the storyboard.
4. Frames, then print.

Each step ends with both fixtures rebuilt, the visual pass green, and the site page's quoted output refreshed.

### Revision 2 status

All four steps are built. The owner approved the items marked "awaiting approval" above during the build: the six theme profiles carry `schemaVersion 2` with one `motion` block each, and press and exhibit stay separate. Where the build differs from the decisions above, the reason is recorded here.

- Motion runs on GSAP, not on Alpine's `x-transition` and Intersect plugin. The owner asked for Apple-like motion, parallax, and a cinematic look on every page; a CSS transition cannot scrub a scene to scroll position, stroke a path in, or morph one shape into another. GSAP 3.15 core and ScrollTrigger are inlined in every page (about 117 kB, under the "Standard No Charge" license recorded in `vendor/manifest.json`); DrawSVG, MorphSVG, Flip, and SplitText are inlined only when an act's `motion` list names `draw`, `morph`, or `highlight`. Alpine still owns state and binding, and every motion effect is an Alpine directive the runtime registers (`x-reveal`, `x-parallax`, `x-count`, `x-draw`, `x-morph`, `x-highlight`, `x-spotlight`, `x-scene`), so an author names an effect and never writes a tween. Vendor bytes are excluded from the 400 kB size budget, which counts the authored page.
- The default register is `cinematic`, not one proposed from content. The owner asked that every page carry parallax and a cinematic look; all six profiles state `register: cinematic`, and a storyboard or `--register` asks for less. The grade still clamps: a `calm` brand renders as `document`, a `fluid` brand as `product`.
- Print has no `scaffold.mjs --print`. The runtime's `Exhibit.finish()` brings every animation to rest and writes each control block's settings as a printed line; it runs on `beforeprint` and `verify.mjs --pdf` calls it before printing through the browser driver. One code path serves the reader's own print command and the checked PDF.
- Frames are available to every act, not only `mechanism`, `compare`, and `sandbox`; the storyboard's `frame` field is a hint the author places. Twelve frames are drawn from brand tokens: `phone`, `tablet`, `laptop`, `browser`, `social-square`, `social-story`, `email`, `print-a4`, `print-letter`, `video-16x9`, `video-9x16`, `sign`.
- `delivery: served` is not built. htmx is inlined and inert; `structural.single-file` fails an `hx-*` request to the network. A served mode with fragment loading is a later revision.
- The second fixture renders the `openai` variant of `ai-branding`, so the two fixtures cover both variants of one theme; the remaining five themes are covered by `branding-system`'s own validator tests and by the scaffold's `--theme` check.

## Open questions

Questions 3 and 4 below are answered by Revision 2: the profile is the theme skill's `PROFILE.md`, and press and exhibit share print tokens rather than a profile file.

1. Name. `exhibit` is the working name because it sits beside `press` and `spotlight` as a third publishing word. Alternatives considered: `unfold`, `tour`, `lens`.
2. Size budget. The `html` skill treats more than about 1,000 lines as overbuilt. A journey with eight acts and inline SVG will run larger; a budget in bytes (for example 400 KB, or more when fonts are embedded) may be the better rule. This needs one real page to calibrate.
3. Where the profile lives in the long run. The plan writes `brand-profile.json` beside each brand skill in the user's brand repository, which makes it part of the brand rather than part of exhibit. The alternative is a `brands/` directory in this repository holding one profile per brand, which keeps the user's brand skills untouched but splits the brand across two repositories. The user's stated intent — one repository of brand skills — points at the first; confirm before Phase 1 writes the example.
4. Whether `press` should read `brand-profile.json` so a document and its explainer draw from one file. A `press` change; deferred until the schema has survived one real brand beyond `ai-branding`.
5. Whether `spotlight` owns the storyboard's point of view or the profile derivation. Decide when that skill's contract is written.
