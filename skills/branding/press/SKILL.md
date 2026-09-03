---
name: press
description: Render an approved markdown document into a branded, self-contained HTML page and a PDF — a product requirements document, a board or leadership pack, a decision record, a research summary, a runbook. User-invoked. Triggers include "turn this into a branded PDF", "render the doc for stakeholders", "make this shareable", "apply our palette to this document", "produce the PDF for sign-off", and "re-render the doc, it changed".
---

# Press (user-invoked)

Render an approved markdown document into a branded artifact without changing a word of it.

The sign-off is not press's job. Whoever owns the document decides it is ready — the author, the reviewer, or the process that produced it — and the caller confirms that before asking for a render. Press refuses nothing on its own authority except an input it cannot read, or a palette it was explicitly given and cannot parse. A renderer that guessed at approval would either block legitimate work or give false assurance, and it has evidence for neither.

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

- A document is signed off and someone outside the working repository needs to read it
- A requirements document, leadership pack, or decision record is going to stakeholders
- A set of documents needs to carry one visual identity

## Procedure

1. Confirm the input is the approved version. Press renders what it is handed; it cannot tell a draft from a final, and it never renders from memory or from a summary of a document.
2. Choose the palette. `PALETTE.md` in this directory holds the design tokens in a machine-readable block, and the renderer reads every color, font, and page measurement from it. To brand a document set, copy that file, edit the values, and pass the copy.
3. Run the renderer, `skills/branding/press/scripts/render.mjs`:

   ```bash
   node skills/branding/press/scripts/render.mjs --in <document.md> --out <artifact.html>
   ```

   Add `--palette <file>` for a branded copy of the tokens, `--html-only` when HTML is the deliverable, `--title <text>` to override the document's first heading, and `--help` for every option and exit code. The script has no dependencies beyond Node 20.
4. Read what the run reports. It prints the path, byte size, and checksum of each artifact it wrote, and states plainly when an artifact it was asked for does not exist.
5. Hand back the artifact paths and their checksums. Never edit the source document to make it render better; a rendering problem is fixed in the renderer or the palette.

## Stop conditions

- The caller cannot confirm the document is the approved version → stop and ask; press has no way to check a signature and does not pretend to
- A requested PDF was not produced → report it as missing, never rename the HTML or describe the run as successful
- The document renders wrongly → fix the renderer or the palette, never the source document
- A palette named with `--palette` is absent or has no readable token block → the run exits 2 and writes nothing, rather than producing an artifact in someone else's colors
- A single palette token is missing or is not a valid CSS value → the renderer substitutes its built-in fallback and names the token on standard error; read that output, because the artifact is then not fully in the caller's brand

## Output contract

```yaml
artifacts:
  - path: artifact.html
    bytes: 4953
    sha256: "52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091"
  - path: artifact.pdf
    bytes: 20418
    sha256: "9f2c1d40e8b7a35f6c0e91d2b4a87f3e15c6d820a4e93b71fd5062c8ae14b7d3"
pdf_produced: true
palette: PALETTE.md
exit: 0
```

An exit of `1` means the HTML was written and a requested PDF was not; the run says why, and no file named `.pdf` exists. An exit of `2` is a usage error or an input that could not be read.

The HTML carries no external stylesheet, no script, and no fetched font, so it opens anywhere. Rendering is deterministic: the same input, palette, and title produce the same bytes, so two runs reporting different checksums mean the source changed.

Rendered: headings, paragraphs, bold, italic, inline code, fenced code blocks, ordered and unordered lists including nested lists, tables with column alignment, blockquotes, links, and horizontal rules. Document text is escaped, so markup written inside the document is shown to the reader rather than executed, and a link target that is not http, https, mailto, or tel keeps its words and loses its anchor. Not rendered: images, raw HTML passed through, and footnotes.

## Sibling skills

Press is the only skill in the branding group today, and it depends on no other
group. It renders the markdown file it is handed, whatever produced that file,
so it installs and runs on its own.
