---
layout: skill
name: press
title: "Press: Branded Documents From Approved Text"
description: "Press renders an approved markdown document into a self-contained, branded HTML page and PDF, reading every color, font, and measurement from a palette file."
group: branding
invocation: user-invoked
scenario: "Announcing this repository's own v0.7.0 release"
lens:
  novice:
    who: 'You finished a plain markdown document, and now someone outside your team has to read it — pasting headings and tables into a slide deck by hand feels like where the rest of your afternoon goes.'
    value: 'One command turns the file you already wrote into a page and a PDF that look considered, in minutes, without opening a design tool.'
  practitioner:
    who: 'A document clears sign-off and you are asked to get it in front of stakeholders who will not read raw markdown in a repository.'
    value: 'You run one script against a file whose approval is already someone else’s job, get back a checksummed HTML page and PDF, and never touch the source text to make it look better.'
  leader:
    who: 'Your team ships requirements documents, decision records, and leadership packs written by several different people.'
    value: 'Every document your team sends out carries the same palette and layout, because it comes from the same renderer and the same tokens, not from whoever happened to format it that week.'
  csuite:
    who: 'You are asked to stand behind a board pack or a decision record after it has left the team that wrote it.'
    value: 'Rendering is deterministic and checksummed: the same input and palette always produce the same bytes, so a document’s provenance can be checked rather than taken on faith.'
---

## What it does

Press turns an approved markdown document into a branded, self-contained artifact — an HTML page always, and a PDF when a headless browser is available on the machine that runs it. It is the branding group's one shipped skill: identity, a company's or a person's, applied to what an agent produces, starting with the document a reader outside the team actually opens. "The sign-off is not press's job." Whoever owns the document — the author, the reviewer, or the process that produced it — decides it is ready; press renders whatever it is handed and never edits a word of the source to make it look better.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Confirm the input</span><span class="step-text">Press renders what it is handed; it never renders from memory or from a summary of a document.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Choose the palette</span><span class="step-text">The shipped default, or a copy edited for a house style and passed with --palette.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Run the renderer</span><span class="step-text">render.mjs is plain Node with no dependencies, so the command runs the same way anywhere.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Read what it reports</span><span class="step-text">The path, byte size, and checksum of each artifact written, or a plain statement of what is missing.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Hand back the artifacts</span><span class="step-text">A rendering problem is fixed in the renderer or the palette, never by editing the source document.</span></div>
</div>

<ul class="benefits">
  <li>Rendering is deterministic: the same input, palette, and title always produce the same checksum, so a document's origin can be checked rather than assumed.</li>
  <li>Every color, font, and page measurement comes from one palette file, so branding a whole document set is a data change, not a rewrite of the renderer.</li>
  <li>Document text is escaped before it reaches the page, and a link whose target is not http, https, mailto, or tel keeps its words and loses its anchor.</li>
  <li>A missing artifact is reported as missing, in plain text on the run's own output — never renamed or described as a finished run.</li>
</ul>

- [`PALETTE.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/press/PALETTE.md) covers every token the renderer reads — ten colors, five typography values, two page measurements — and how a substituted fallback gets reported when a value fails its check.

Press is the only skill in the branding group today, and it depends on no other group. It renders whatever markdown file it is handed, whatever produced that file, so it installs and runs on its own.

## When to reach for it

Type `/press` in Claude Code, or name the skill directly in a session. Press is user-invoked, so nothing reaches for it on its own: a person decides a document is ready and asks for the render.

You reach for press in three moments. A document just cleared sign-off, and someone outside the team — a stakeholder, a board, a customer — needs to open it without cloning a repository. A set of documents written by several people is going out together and needs one visual identity instead of five. A document already rendered once needs a fresh render because the source changed and the artifact has to catch up.

Press is not the only skill that touches a document on its way out. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the document itself drafted or revised, not an approved one rendered | [`impact`]({{ '/impact/' | relative_url }}) |
| You need the leadership pack assembled from its registers before it is rendered | [`report`]({{ '/report/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Claude Code</span></div>
<div class="tool-block-body">
<p>Press is user-invoked: type <code>/press</code>, or name it directly in a session — nothing routes to it automatically. The renderer itself is plain Node with no dependencies, so the same <code>render.mjs</code> command runs the same way whether Claude Code calls it or a person types it directly.</p>
<div class="prompt-card">The v0.7.0 changelog entry is signed off — I saved it as release-notes/v0.7.0.md. Render it into a branded page for the announcement, using the shipped palette. I only need the HTML right now; tell me plainly if a PDF comes out or not, and give me the checksum either way.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Press confirms the input, runs the renderer, and reports the path, byte size, and checksum of what it wrote, stating plainly when the PDF step could not run.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">OpenCode</span></div>
<div class="tool-block-body">
<p><code>./scripts/install-adapters.sh --tool opencode</code> installs the <code>press</code> command from <code>adapters/opencode/commands/press.md</code>, bound to the <code>quick</code> agent. It runs the same renderer, carrying <code>--palette</code>, <code>--html-only</code>, or <code>--title</code> through from its arguments, and reads the run's report the same way a person would.</p>
<div class="prompt-card">/press release-notes/v0.7.0.md — this is the signed-off v0.7.0 announcement copy. Render it against the shipped palette and tell me the byte size and checksum of what you wrote, and whether the PDF came out or not.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>The command confirms the input is the approved version before rendering, then reports the artifact paths and checksums exactly as the script prints them.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Cursor</span></div>
<div class="tool-block-body">
<p>Cursor gets no command layer from this repository. The skill lands in <code>.agents/skills/</code>, and the agent applies its procedure by reading the catalog as context and following the shared rules in <code>AGENTS.md</code>, then runs <code>render.mjs</code> directly as a shell command.</p>
<div class="prompt-card">The v0.7.0 changelog entry is signed off. Run skills/branding/press/scripts/render.mjs against release-notes/v0.7.0.md with the shipped palette and give me the HTML artifact's path, byte size, and checksum. Tell me directly if the PDF step could not run in this environment.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Cursor runs the same script and reports the same output in its reply, since there is no command layer here to parse the output for it.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">Codex</span></div>
<div class="tool-block-body">
<p>Codex reads the same universal <code>.agents/skills/</code> catalog, plus the generated sidecar <code>agents/openai.yaml</code>, so it sees press's name and description the way the other tools do. It gets no command layer either, so invocation runs through <code>AGENTS.md</code> and the skill file, and the renderer is run the same way as in Cursor.</p>
<div class="prompt-card">Read skills/branding/press/SKILL.md, then render the signed-off v0.7.0 changelog entry with the shipped palette. Report the artifact's byte size and checksum, and say plainly if the PDF was not produced rather than describing the run as finished.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Codex writes the same command and reports the same output, reading its context from the skill file rather than any installed command.</p>
</div>
</div>

<div class="tool-block">
<div class="tool-block-head"><span class="tool-badge">GitHub Copilot</span></div>
<div class="tool-block-body">
<p>Copilot's agent mode reads the same <code>.agents/skills/</code> catalog. It applies <code>.github/copilot-instructions.md</code> once a team has added one to their repository; this repository ships recommended rule text for that file in <code>adapters/copilot/README.md</code>, so the ask below still works as a plain instruction meanwhile. This repository ships no command layer for it either, so it runs the renderer the same way Cursor and Codex do, reading the procedure from the skill file.</p>
<div class="prompt-card">You have the signed-off v0.7.0 changelog entry ready to announce. Render it with skills/branding/press/scripts/render.mjs and the shipped palette, and report the checksum of what was written. If no PDF comes out, say so plainly — do not report the run as complete without one.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Copilot reports the same path, byte size, and checksum in chat, since the renderer's own printed output is the only report there is.</p>
</div>
</div>

A good ask includes:

- Confirmation that the document is the approved version — press has no way to check a signature and does not pretend to.
- Which palette to use: the shipped default, or a copy edited for a house style, named with `--palette`.
- Whether the PDF is wanted this run, or the HTML alone is enough, stated plainly with `--html-only`.
- A title override, if the document's first heading is not the text a reader should see.

Readers who have not installed the whole skill pack can add press alone:

```bash
./scripts/link-skills.sh --skill press
```

This links only press into the default buckets, without pulling in the rest of the branding group. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

## A working example

You type:

<pre><code>The v0.7.0 changelog entry is signed off — I saved it as release-notes/v0.7.0.md. Render it into a branded page for the announcement, using the shipped palette. I only need the HTML right now; tell me plainly if a PDF comes out or not, and give me the checksum either way.</code></pre>

Press takes the sign-off at your word — that is exactly what SKILL.md says it must do, since it has no way to check a signature itself — and reads the text you saved without changing a word of it. This repository ships that changelog entry as a fixture, [`test/fixtures/press/release-notes-v0-7-0.md`](https://github.com/tqnonline/skills/blob/main/test/fixtures/press/release-notes-v0-7-0.md), written as release-note copy and reproduced here in full:

<pre><code># tqnonline/skills v0.7.0

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

Full history in `CHANGELOG.md`.</code></pre>

No palette was named, so press reads its own shipped default, and the run below is genuine — produced moments ago, on the machine that built this page:

<pre><code><span class="tok-comment">$ node skills/branding/press/scripts/render.mjs --in test/fixtures/press/release-notes-v0-7-0.md --out v0.7.0.html --title "tqnonline/skills v0.7.0"</span>
press: HTML v0.7.0.html
<span class="tok-ok">press:   4778 bytes  sha256 e7b852648bf8c9535c7220122a6488d81e1b256fda6acc4307bd557afcfa4409</span>
<span class="tok-warn">press: no headless browser found; the PDF step was skipped</span>
press:   searched PUPPETEER_EXECUTABLE_PATH, CHROME_PATH, then PATH for chromium, chromium-browser, google-chrome, google-chrome-stable
press:   the HTML above is complete and can be printed from any browser
<span class="tok-warn">press: PDF NOT PRODUCED</span></code></pre>

The exit code is 1, not 0, because a PDF was implicitly asked for and none exists on this machine — the honest split the renderer is built to report rather than hide. The environment that built this page has no headless browser installed, so the HTML is exactly what you get, and the run says so in plain words instead of pretending otherwise. Rendering is deterministic: the same source text, the default palette, and the same title will always reproduce this exact byte count and checksum, on any machine, browser or none.

The renderer's own output contract in `SKILL.md` documents this identical shape against a different, permanent fixture, `test/fixtures/press/document.md`. Run again just now, it still reproduces exactly, byte for byte:

<pre><code><span class="tok-comment">$ node skills/branding/press/scripts/render.mjs --in test/fixtures/press/document.md --out press-demo.html</span>
press: HTML press-demo.html
<span class="tok-ok">press:   4953 bytes  sha256 52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091</span>
press: no headless browser found; the PDF step was skipped
press:   searched PUPPETEER_EXECUTABLE_PATH, CHROME_PATH, then PATH for chromium, chromium-browser, google-chrome, google-chrome-stable
press:   the HTML above is complete and can be printed from any browser
<span class="tok-warn">press: PDF NOT PRODUCED</span></code></pre>

That checksum is the exact one printed in the skill's own output contract, so a change here would mean the renderer itself had changed, not that this page had drifted from it.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good run ends like this</div>
<pre><code><span class="tok-ok">press: HTML</span> v0.7.0.html
<span class="tok-ok">press:   4778 bytes  sha256 e7b852648bf8c9535c7220122a6488d81e1b256fda6acc4307bd557afcfa4409</span>
<span class="tok-warn">press: PDF NOT PRODUCED</span>  <span class="tok-comment">no headless browser found — reported, not hidden</span></code></pre>
<div class="compare-card-note">Every artifact that was asked for either exists, checksummed against exactly this input and palette, or is reported missing in plain words. Only then is the render handed back.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">press: no headless browser found; the PDF step was skipped</span>
<span class="tok-warn">press: PDF NOT PRODUCED</span>  <span class="tok-comment">exit 1</span>
<span class="tok-comment">$ cp v0.7.0.html v0.7.0.pdf</span>  <span class="tok-comment">&larr; renamed to fake the deliverable</span>
<span class="tok-comment">The reader now holds a file that is not a PDF.</span></code></pre>
<div class="compare-card-note">Never rename the HTML or describe the run as successful. Report a missing artifact as missing, and fix the renderer or the palette — never the source document.</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>Does press decide whether a document is ready to send?</summary>
<div class="qa-body">

No. SKILL.md states this plainly: sign-off is not press's job. Whoever owns the document — its author, its reviewer, or the process that produced it — decides it is ready, and the caller confirms that before asking for a render. Press has no way to check a signature and does not pretend to.

</div>
</details>

<details class="qa">
<summary>What happens when no headless browser is available?</summary>
<div class="qa-body">

The HTML is still written in full. The renderer prints the reason the PDF step could not run, searches `PUPPETEER_EXECUTABLE_PATH`, `CHROME_PATH`, then `PATH` for a known Chromium build, creates no file named `.pdf`, and exits 1 because the artifact that was asked for does not exist. This is not a partial success; it is a run that reports exactly what it produced.

</div>
</details>

<details class="qa">
<summary>Can press edit the source document to make it render better?</summary>
<div class="qa-body">

No. SKILL.md's stop conditions are direct about this: when a document renders wrongly, the fix belongs in the renderer or the palette, never in the source document. Rewriting the source to work around a rendering problem would mean the reader's document no longer matches what its author approved.

</div>
</details>

<details class="qa">
<summary>What if a palette token is invalid or missing?</summary>
<div class="qa-body">

The renderer substitutes its own built-in fallback for that one token and names the substitution on standard error, per `PALETTE.md`'s validation rules. The artifact still gets written, but it is then not fully in the caller's brand for that value, so the run's error output is worth reading before the artifact goes out.

</div>
</details>

<details class="qa">
<summary>Does press render images or raw HTML embedded in a document?</summary>
<div class="qa-body">

No. SKILL.md's output contract names three things that are not rendered: images, raw HTML passed through, and footnotes. Document text is escaped instead, so markup written inside a document is shown to the reader as text rather than executed as a live tag.

</div>
</details>

<details class="qa">
<summary>Why does the default palette use a light page instead of a dark one?</summary>
<div class="qa-body">

An earlier version of this file used a dark background drawn from the Catppuccin Macchiato color scheme, per `PALETTE.md`'s own note on its history. The two darkest values now name only the fenced code block, and the document body is light, because a full-page dark background costs ink and reads poorly in print.

</div>
</details>

## It's working if

- Every artifact a reader receives carries a checksum that changes only when the source text or the palette changes.
- A missing PDF is reported as missing in the run's own output, never silently renamed to look like one.
- Every document a team sends out externally shares one palette, instead of formatting that drifts with whoever happened to send it that week.
- A substituted palette token is visible on standard error before the artifact goes out, not discovered later by a reader who notices the wrong color.

If a `.html` file ever gets renamed to `.pdf` to cover for a PDF step that failed, the discipline has failed even though a file sits at the expected path.

## Where it fits

**Press is a standalone renderer, not a required step inside either pipeline.** Nothing has to pass through it; a document is only rendered when someone decides a reader outside the team needs to open it.

Its two real callers today sit in different groups. `impact`, in the developer group, calls it for an optional branded PDF once a requirements document reaches sign-off. `report`, in the pm group, calls it to render the leadership pack after the pack is assembled from the registers — both name it directly in their own sibling lists as the skill that renders what they produce.

If none of this settles which skill fits, `ask-fde` routes you — its own routing map sends a request for a PDF straight to press.
