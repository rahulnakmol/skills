---
layout: skill
name: exhibit
title: "Exhibit: Interactive, Branded Pages That Walk a Reader Through a Topic"
description: "Exhibit builds one self-contained, interactive HTML page that walks a reader through a topic as a journey of acts, in a named brand skill's colors, type, motion, and voice."
group: branding
invocation: user-invoked
scenario: "Turning the review-gate analysis behind QuenServe epic E1 into a branded page where stakeholders move the assumptions and watch the claim hold or fail"
lens:
  novice:
    who: 'You have an analysis with a few moving parts, and every time you explain it in a document someone asks "but what if this number were different?"'
    value: 'The page answers that question for them: a slider or a stepper changes the model, the figure and the one-sentence takeaway change with it, and the whole thing is one HTML file you can send.'
  practitioner:
    who: 'You maintain a brand skill and are asked for an explainer in that brand, but every hand-built page drifts a little: a hex value from memory, a font the brand forbids, a fourth chart color.'
    value: 'The brand''s rules travel through its profile, so every color, font, series order, contrast pair, and motion effect on the page is checked by name, and the render pass measures the page at desktop and phone widths before you look at it.'
  leader:
    who: 'Your team sends out recommendations that rest on assumptions the audience never gets to test, so the debate happens in email afterward.'
    value: 'An exhibit page ends in a sandbox and a decision act: the reader changes the assumptions, marks agreement or objections, and exports their settings and notes as text that travels with the page.'
  csuite:
    who: 'You are asked to stand behind a point of view that a page presents in the company''s identity.'
    value: 'The thesis is stated once and attributed to evidence; each act carries one claim, one figure, and the control that tests it; and a verify script records which brand rules passed, renders the page, and prints the PDF that press takes for a print edition.'
---

## What it does

Exhibit takes a topic and a brand skill and produces one self-contained HTML page that argues a point of view as a journey. The journey is a sequence of acts. Each act carries one claim, one figure, a control that changes something the claim depends on, and a takeaway that states the result at the reader's current settings. The page fetches nothing at run time. Its colors, fonts, motion, and voice come from the brand skill's `PROFILE.md`, the same file the six theme skills in this group already carry, and the scripts read that file and check against it. The prose the agent writes inside each act follows the brand's own voice file rather than this repository's.

The page runs on Alpine.js for state, GSAP with ScrollTrigger for motion, and htmx, all pinned by checksum and inlined. Motion is a brand property: the profile's `motion` block sets a grade that caps how much a page may move, a register (`document`, `product`, or `cinematic`) that sets how the page presents, and the durations and curves every effect uses. The six theme skills default to `cinematic`, so a page opens on a masthead with parallax depth and scroll-driven scenes, and a reader who asks for reduced motion gets the same page at rest. An act can also place its figure inside a frame, a phone, browser, A4 sheet, social card, or video stage drawn from brand tokens, so a UI, digital, or print mockup is shown in place.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Resolve the brand</span><span class="step-text">A theme skill by name, or a brand directory, PROFILE.md, or .skill archive. With no profile present, the agent derives one from the brand skill and shows it before building.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Write the storyboard</span><span class="step-text">Title, question, thesis, audience, mode, register, and one row per act with its type, claim, motion effects, and frame. Eight narrative rules govern the order.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Scaffold the shell</span><span class="step-text">scaffold.mjs writes tokens, motion variables, chrome, navigation, an export bar, the pinned vendor scripts, and one empty section per act from the profile and storyboard.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Author the acts</span><span class="step-text">One playbook per act type; each act uses only the primitives the shell documents, between two markers the script placed, and names its motion effects instead of writing them.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Verify, look, and print</span><span class="step-text">verify.mjs runs named structural, brand, render, and PDF checks, writes captures and a contact sheet, and prints the page with every animation at rest.</span></div>
</div>

<ul class="benefits">
  <li>Every color, font, chart series, contrast pair, and motion effect on the page is checked against the brand's profile by a named test, so a page that drifts off brand fails before anyone opens it.</li>
  <li>Each act carries one claim and the control that tests it, so a reader who disagrees can move the assumption and see whether the claim survives, instead of arguing with a paragraph.</li>
  <li>The page's state lives in one object, so what the reader sees and what the export button copies out are the same values: settings, rankings, and marks on a decision.</li>
  <li>The render pass opens the page at 1280 and 390 pixels, in light and dark scheme where the brand has one, fails on any console error, and measures overflow, tap targets, and text size that no file-only check can see.</li>
  <li>The same page prints. <code>--pdf</code> brings every animation to rest, writes each control's settings as a printed line, and produces the PDF that <code>press</code> takes for a print edition, so the interactive page and the printed one carry the same claims.</li>
</ul>

- [`JOURNEY.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/exhibit/JOURNEY.md) states the eight rules a storyboard follows, from opening with a first experience to ending in a sandbox and an export.
- [`BRAND.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/exhibit/BRAND.md) states which profile fields the scripts read and the procedure for deriving a profile from a brand skill without guessing a value the source does not state.
- [`ACTS.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/exhibit/ACTS.md) defines the nine act types, the three registers, the motion effects an act may name, and the twelve frames.
- [`PRIMITIVES.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/exhibit/PRIMITIVES.md) lists every class, attribute, and directive an act may use: bound controls, figures, steppers, weighted comparisons, series legends, decisions, frames, motion directives, and the export.

Exhibit sits in the branding group beside [`press`]({{ '/press/' | relative_url }}) and the six theme skills, and it depends on no other group. The split between exhibit and press is what the reader does: press renders a document a reader reads, exhibit builds a page a reader changes. A topic with no model to change is a document, and exhibit's own stop conditions hand it to press. The two meet at the printer: exhibit's `--pdf` output is what press takes for a print edition.

## When to reach for it

Type `/exhibit` in Claude Code, or name the skill directly in a session. Exhibit is user-invoked, so nothing reaches for it on its own: a person names a topic and a brand and asks for the page.

You reach for exhibit in three moments. An analysis rests on assumptions the audience will want to test, and a document cannot let them. A recommendation has to go out in a brand's identity and carry a point of view the reader can mark up. A brand skill exists and someone wants to see what it looks like applied to an argument, not only to a document.

Exhibit is not the only skill that produces something a reader outside the team opens. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| The document is approved and only needs rendering in the brand, with nothing for the reader to change | [`press`]({{ '/press/' | relative_url }}) |
| You need the analysis itself written before anyone can visualize it | [`impact`]({{ '/impact/' | relative_url }}) |
| You need a chart of one thing, not a journey through a topic | [`chart`]({{ '/chart/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same exhibit skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want exhibit can link this skill alone with `./scripts/link-skills.sh --skill exhibit`. The scripts are plain Node 20 with no dependencies; the render pass needs a Chromium-family browser on the machine, found on `PATH` or named with `CHROME_PATH`. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Slash command</span></div>
<div class="tool-group-body">
<p>Exhibit is user-invoked: type <code>/exhibit</code>, or name it directly in a session. The agent reads the theme or brand skill you point at, derives or reads its profile, writes the storyboard and shows it to you, then scaffolds, authors, and verifies. Both scripts run the same way whether Claude Code calls them or a person types the command.</p>
<div class="prompt-card">Build an exhibit page on how QuenServe's four review gates catch rework before it reaches E1's delivery, in our brand at brands/quenserve/. Open with a model people can move, put the evidence after the claim it supports, end in a sandbox, and show me the storyboard before you build anything.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Exhibit shows the storyboard first, then reports the page's path, bytes, and checksum, the theme, variant, mode, register, and grade used, and the verify summary with the contact sheet and PDF paths.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Command file, build agent</span></div>
<div class="tool-group-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>exhibit</code> command from <code>adapters/opencode/commands/exhibit.md</code>. It follows the same procedure: brand first, storyboard shown before the build, acts authored from the playbooks, and a verify run whose summary is reported as printed.</p>
<div class="prompt-card">/exhibit topic: how the four review gates on QuenServe E1 catch rework; brand: brands/quenserve/; mode: scroll. Show me the storyboard before scaffolding, and tell me plainly if the render pass could not run.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command stops after the storyboard until you confirm it, then reports the artifact, the verify summary, and any brand exception it declared.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply exhibit as plain context, following the shared rules in <code>AGENTS.md</code>; each then runs <code>scaffold.mjs</code> and <code>verify.mjs</code> as shell commands. Cursor routes through its own <code>.cursor/rules/</code> once a team adds one. Codex additionally reads the generated sidecar <code>agents/openai.yaml</code>, so it sees exhibit's name and description the way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one; the ask below works as a plain instruction meanwhile.</p>
<div class="prompt-card">Read skills/branding/exhibit/SKILL.md and build a page on how QuenServe's four review gates catch rework before E1 ships, against the brand skill in brands/quenserve/. Show me the storyboard first. Then run scaffold.mjs and verify.mjs and give me the verify summary exactly as printed, including whether the render pass ran.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three run the same two scripts and report the same path, bytes, checksum, and verify summary in their reply, since none has a command's output to parse for them.</p>
</div>
</div>

A good ask includes:

- The topic source: a document, a repository path, or notes. Exhibit reads what it is pointed at and does not fetch a URL at build time.
- The brand: one of the six theme skills by name, or a directory holding a brand skill, its `PROFILE.md`, or a `.skill` archive. A theme with more than one variant, such as `ai-branding`, takes `--variant`.
- The delivery mode if you have a view: `scroll` for most topics, `deck` for a meeting, `explorer` when the topic is mostly a model to play with.
- The register if the brand's default is more than the topic wants: `cinematic` is the theme skills' default, `product` reads as a launch page, and `document` moves only on interaction.
- Whether fonts should be embedded from the brand directory, linked from Google Fonts as a declared exception, or left to the system stack.

## A working example

For [QuenServe]({{ '/example/' | relative_url }})'s review gates on epic E1, you would type something close to this:

<pre><code>Build an exhibit page on how QuenServe's four review gates catch rework before it reaches E1's delivery, in our brand at brands/quenserve/. Open with a model people can move, put the evidence after the claim it supports, end in a sandbox, and show me the storyboard before you build anything.</code></pre>

The build runs the same way for any topic, so here is this repository's own real material instead of an invented QuenServe brand. The material is the eight-act storyboard shipped as a fixture, [`test/fixtures/exhibit/in-brand.storyboard.md`](https://github.com/tqnonline/skills/blob/main/test/fixtures/exhibit/in-brand.storyboard.md). Its topic is exhibit itself, and its brand is the `ai-branding` theme skill in its `openai` variant. Its acts run hook, map, mechanism, compare, evidence, timeline, decision, glossary; its mode is `explorer`; its register is `cinematic`, the theme's default. The scaffold step is deterministic, and this run is genuine, produced on the machine that built this page:

<pre><code><span class="tok-comment">$ node skills/branding/exhibit/scripts/scaffold.mjs --storyboard test/fixtures/exhibit/in-brand.storyboard.md --out in-brand.html --theme ai-branding --variant openai</span>
exhibit: wrote in-brand.html
<span class="tok-ok">exhibit:   356902 bytes  sha256 c20e04749262538ae21213e2a79ddbcb55cdb5581a398042492e5d19f72f91a6</span>
exhibit:   theme ai-branding  variant openai  fonts system  mode explorer
exhibit:   register cinematic  grade expressive
exhibit:   vendor gsap@3.15.0, scrolltrigger@3.15.0, drawsvg@3.15.0, morphsvg@3.15.0, flip@3.15.0, splittext@3.15.0, htmx@2.0.10, alpine@3.17.1
exhibit:   acts hook, map, mechanism, compare, evidence, timeline, decision, glossary
exhibit: next, author each act between its exhibit:begin and exhibit:end markers, then run verify.mjs</code></pre>

Most of those bytes are the pinned vendor scripts, inlined so the page fetches nothing; the authored page is held to a separate 400 kB budget. The same storyboard and profile will always reproduce that byte count and checksum, because nothing in the shell is authored. The acts are: an agent writes each one between its markers, so two builds of one storyboard differ there, and determinism is claimed for the shell and the checks, not for the page. The shipped fixture [`test/fixtures/exhibit/in-brand.html`](https://github.com/tqnonline/skills/blob/main/test/fixtures/exhibit/in-brand.html) is that shell with its eight acts authored, and verify holds it to the storyboard and to the brand. Run without a browser, so the outcome is the same on every machine, it prints every check by name and ends with this summary:

<pre><code><span class="tok-comment">$ node skills/branding/exhibit/scripts/verify.mjs --in test/fixtures/exhibit/in-brand.html --storyboard test/fixtures/exhibit/in-brand.storyboard.md --theme ai-branding --variant openai --no-render</span>
exhibit: ok   structural.single-file
exhibit: ok   structural.vendor-pinned
exhibit: ok   structural.acts-match-storyboard
exhibit: ok   structural.frames-known
exhibit: ok   brand.allowed-colors
exhibit: ok   brand.series-order
exhibit: ok   brand.contrast
exhibit: ok   brand.motion
exhibit: ok   brand.theme-declared
<span class="tok-comment">… 21 named checks in all …</span>
verify:
  page: test/fixtures/exhibit/in-brand.html
  bytes: 382119
  theme: ai-branding
  variant: openai
  mode: explorer
  register: cinematic
  grade: expressive
  fonts: system
<span class="tok-ok">  structural: pass
  brand_rules: pass</span>
  brand_exceptions: []
<span class="tok-warn">  render: skipped (--no-render); open the page and look before reporting</span>
  pdf: not requested (--pdf &lt;file&gt;)
  exit: 0</code></pre>

With a browser present the same command runs the render pass too. It opens the page at 1280 and 390 pixels in light and dark scheme, brings every animation to rest, and writes 27 captures and a contact sheet. It then reports `render: pass`, or names the console error, the act that overflowed, the control under 44 pixels, or the text under 16. With `--pdf` it also prints the page and checks that the file is valid and paginates one act per page; this fixture prints to 19 pages with no raster images.

## What good looks like

The same discipline governs the QuenServe E1 page: every check passes by name, or the report names the one that did not and what changed to fix it, and the render pass either ran or the report says it did not.

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good run ends like this</div>
<pre><code><span class="tok-ok">  structural: pass
  brand_rules: pass</span>
  brand_exceptions: []
<span class="tok-ok">  render: pass: 27 captures at 1280 and 390 px, light and dark; read the sheet
  pdf: in-brand.pdf (19 pages, 218486 bytes, 0 raster images)</span>
  sheet: in-brand-sheet.png
  exit: 0</code></pre>
<div class="compare-card-note">Every brand rule the profile carries passed by name, the page was rendered, measured, and printed, and the agent read the sheet and opened the page before handing it back.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">exhibit: FAIL brand.allowed-colors</span>
exhibit:        - #ff6600 in the map act is not in the openai variant's palette
<span class="tok-comment">$ # edit skills/branding/ai-branding/PROFILE.md: add "#ff6600" to the palette</span>
<span class="tok-comment">exhibit: ok   brand.allowed-colors  &larr; the rule moved, the page did not</span></code></pre>
<div class="compare-card-note">Never widen the profile or weaken a check to get to green. The fix belongs in the act: use a class that resolves to a brand token, and if no allowed color serves, redraw the figure and record the trade-off in the report.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Does exhibit read the brand skill's prose directly?</summary>
<div class="qa-body">

The agent does; the scripts do not. The scripts read the brand's `PROFILE.md`, the same file the six theme skills carry and `branding-system` validates, which records the palette, type, motion, and voice in a form a script can check. For a brand outside this repository the agent reads the brand skill the way it asks to be read and derives that profile by the steps in `BRAND.md`. The profile is shown to the user and written beside the brand skill only after they have read it, because a wrong value there becomes a rule every page keeps.

</div>
</details>

<details class="qa">
<summary>What happens when the brand directory has no profile yet?</summary>
<div class="qa-body">

`scaffold.mjs` exits 2 and names `BRAND.md`. Exhibit's first stop condition applies: derive a profile, show it, and stop until the user has reviewed it. It does not build against a brand it has only guessed at.

</div>
</details>

<details class="qa">
<summary>What if the topic has nothing for the reader to change?</summary>
<div class="qa-body">

Then it is a document, and exhibit's stop conditions hand it to `press`. The test is in `JOURNEY.md`: a control has to change something the claim depends on, and the takeaway has to change with it. A slider that changes only a color is decoration, and a storyboard with no act whose control changes a model is a document with charts in it.

</div>
</details>

<details class="qa">
<summary>What happens when no browser is available for the render pass?</summary>
<div class="qa-body">

`verify.mjs` fails `render.browser` by name, prints `render: not run: no browser found`, and exits 1. The structural and brand checks still ran and are reported. The agent either installs a browser or sets `CHROME_PATH`, or passes `--no-render` and reports that the render pass was not run and what was checked by eye instead. It does not describe the page as verified.

</div>
</details>

<details class="qa">
<summary>Can a brand with two variants use both?</summary>
<div class="qa-body">

Yes. A theme profile can hold more than one variant and name a default; `ai-branding` carries `anthropic` and `openai`. `--variant` picks one for a build, and the page declares which it used so verify checks against the same palette. The two shipped fixtures exercise one variant each.

</div>
</details>

<details class="qa">
<summary>Where does motion belong: in the brand or in exhibit?</summary>
<div class="qa-body">

In the brand. The profile's `motion` block names the grade, the register, the durations, the curves, and the transitions the brand permits, and `brand.motion` fails a page that uses an effect its brand forbids. Exhibit owns the effects themselves: the reveal, counter, drawn path, morph, spotlight, highlight, parallax layer, and scroll-driven scene are directives the runtime registers, so an act names an effect and never writes a tween. A storyboard or `--register` can ask for less motion than the brand allows, never more.

</div>
</details>

<details class="qa">
<summary>Is the page deterministic?</summary>
<div class="qa-body">

The shell is: one profile, variant, storyboard, and title produce the same bytes and checksum every time, and the tests hold the shipped fixtures to a fresh scaffold. The acts are authored by an agent, so two builds of one storyboard can differ inside the markers. Determinism is claimed for the shell and the checks, not for the whole page, and the output contract says so.

</div>
</details>

## It's working if

- Every color, font, and chart series on a finished page passes the profile's checks by name, and a page that drifts fails `verify.mjs` before a reader opens it.
- Each act has a control the reader can move, and the takeaway changes with it; a reader who disagrees with an assumption can test it rather than argue with it.
- The export button produces the reader's settings, rankings, and decision marks as text that matches what the page showed.
- The page moves the way the brand allows and no more: a `cinematic` theme opens on a masthead with depth, a `document` brand moves only on interaction, and a reader who asks for reduced motion gets the page at rest.
- A run without a browser says `render: not run` in its report instead of describing the page as verified.

If a profile ever gets widened to make a check pass, the discipline has failed even though the summary reads `brand_rules: pass`.

## Where it fits

**Exhibit is a standalone builder, not a required step inside either pipeline.** Nothing has to pass through it; a page is built when someone decides an argument should be tested by its readers rather than read by them.

Its nearest neighbor is `press`, in the same group, which renders a document that is already approved and needs nothing changed; press takes exhibit's `--pdf` output when a page also needs a print edition. The six theme skills in the group supply the profiles exhibit builds against. Upstream of both sit the skills that produce the analysis. `impact` in the developer group writes the requirements document whose assumptions an exhibit page might open up. `case` in the pm group builds the business case whose numbers a sandbox act could hand to the reader. Exhibit reads their output as a topic source; it does not call them.

If none of this settles which skill fits, `ask-fde` routes you — a request for a branded page with controls goes to exhibit, and a request for a branded PDF goes to press.
