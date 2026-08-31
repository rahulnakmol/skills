---
layout: skill
name: press
title: "Press: Branded Documents From Approved Text"
description: "Press renders an approved markdown document into a self-contained, branded HTML page and PDF, reading every color, font, and measurement from a palette file."
group: branding
invocation: user-invoked
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

Press turns an approved markdown document into a branded, self-contained HTML page, and a PDF when a headless browser is available, without changing a word of the source. It reads every color, font, and page measurement from a palette file — the shipped default, or a copy edited and passed with `--palette` — so branding a document set is a data change, not a rewrite of the renderer. Document text is treated as untrusted: every character is escaped before it reaches the page, and a link whose target is not `http`, `https`, `mailto`, or `tel` keeps its words and loses its anchor. Sign-off is not press's job; it renders whatever it is handed and expects the caller to have already confirmed the input is the approved version.

## How to call it

In Claude Code, type `/press`. No OpenCode command exists for press yet, so outside Claude Code the renderer is run directly — it is plain Node with no dependencies:

<pre><code><span class="tok-comment">$</span> node skills/branding/press/scripts/render.mjs --in document.md --out artifact.html <span class="tok-comment"># HTML, plus a PDF if a browser is found</span>
<span class="tok-comment">$</span> node skills/branding/press/scripts/render.mjs --in document.md --html-only <span class="tok-comment"># HTML only, always exits 0</span>
<span class="tok-comment">$</span> node skills/branding/press/scripts/render.mjs --in document.md --palette PALETTE.md --title "Board Pack" <span class="tok-comment"># a copied palette, a custom title</span></code></pre>

Readers who do not have the skill pack installed yet can add it first. The second line installs the tool adapters:

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">A good run ends like this</div>
<pre><code><span class="tok-ok">press: HTML</span> artifact.html
<span class="tok-ok">press:   4953 bytes  sha256 52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091</span>
<span class="tok-ok">press: PDF </span> artifact.pdf
<span class="tok-ok">press:   20418 bytes  sha256 9f2c1d40e8b7a35f6c0e91d2b4a87f3e15c6d820a4e93b71fd5062c8ae14b7d3</span>
<span class="tok-ok">exit 0</span></code></pre>
<div class="compare-card-note">Every artifact that was asked for exists, checksummed against exactly this input and palette. Only then is the render reported done.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">press: no headless browser found; the PDF step was skipped</span>
<span class="tok-warn">press: PDF NOT PRODUCED</span>  <span class="tok-comment">exit 1</span>
<span class="tok-comment">$ cp artifact.html artifact.pdf</span>  <span class="tok-comment">&larr; renamed to fake the deliverable</span>
<span class="tok-comment">The reader now holds a file that is not a PDF.</span></code></pre>
<div class="compare-card-note">Never rename the HTML or describe the run as successful. Report a missing artifact as missing, and fix the renderer or the palette — never the source document.</div>
</div>
</div>

## In practice

The renderer ships with a real fixture, `test/fixtures/press/document.md`, and the repository's own test suite runs against it. This is that exact command, run for this page, with its genuine output:

<pre><code><span class="tok-comment">$ node skills/branding/press/scripts/render.mjs --in test/fixtures/press/document.md --out press-demo.html</span>
press: HTML press-demo.html
press:   4953 bytes  sha256 52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091
press: no headless browser found; the PDF step was skipped
press:   searched PUPPETEER_EXECUTABLE_PATH, CHROME_PATH, then PATH for chromium, chromium-browser, google-chrome, google-chrome-stable
press:   the HTML above is complete and can be printed from any browser
press: PDF NOT PRODUCED</code></pre>

The machine this page was built on has no headless browser installed, so the run reports that plainly and exits 1 — the exact behavior the "wrong turn" card above warns against skipping past. The HTML byte count and checksum are genuine output of this run, and they match the example in the skill's own output contract exactly, because that contract was written from a run of the same renderer against the same fixture.

## How it works

1. **Confirm the input.** Press cannot tell a draft from a final version; the caller confirms sign-off before asking for a render. See [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/press/SKILL.md).
2. **Choose the palette.** Every color, font, and measurement is a token in [`PALETTE.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/press/PALETTE.md), validated before it becomes CSS; an invalid or missing token falls back and is named on standard error.
3. **Run the renderer.** [`scripts/render.mjs`](https://github.com/tqnonline/skills/blob/main/skills/branding/press/scripts/render.mjs) escapes every character of the document text and restricts link targets to a safe-scheme allowlist before anything is written.
4. **Read what the run reports.** The same script prints the path, byte size, and sha256 checksum of each artifact it wrote, and states plainly when a requested artifact does not exist.
5. **Hand back the paths and checksums.** A rendering problem is fixed in the renderer or the palette; the source document is never edited to make it render better. See [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/branding/press/SKILL.md).
