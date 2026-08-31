---
name: press
description: User-invoked rendering of an approved markdown document into a branded, self-contained HTML page and a PDF. Use when a document that has already been signed off needs to leave the repository looking like it belongs to the organization — a product requirements document, a board or leadership pack, a decision record, a research summary. Triggers include "turn this into a branded PDF", "render the doc for stakeholders", "make this shareable", and "produce the PDF for sign-off".
---

# Press (user-invoked)

Render an approved markdown document into a branded artifact without changing a word of it.

## When to invoke

- A document is signed off and someone outside the working repository needs to read it
- A requirements document, leadership pack, or decision record is going to stakeholders
- A set of documents needs to carry one visual identity

## Procedure

1. Confirm the input is the approved version. Press renders what it is handed; it cannot tell a draft from a final, and it never renders from memory or from a summary of a document.
2. Choose the palette. `PALETTE.md` in this directory holds the design tokens in a machine-readable block, and the renderer reads every color, font, and page measurement from it. To brand a document set, copy that file, edit the values, and pass the copy.
3. Run `scripts/render.mjs --in <document.md>`, adding `--palette <file>` for a branded copy, `--out <path>` to place the artifact, and `--html-only` when HTML is the deliverable. The script has no dependencies beyond Node.
4. Read what the run reports. It prints the path, byte size, and checksum of each artifact it wrote, and states plainly when an artifact it was asked for does not exist.
5. Hand back the artifact paths and their checksums. Never edit the source document to make it render better; a rendering problem is fixed in the renderer or the palette.

## Stop conditions

- The caller cannot confirm the document is the approved version → stop and ask; press has no way to check a signature and does not pretend to
- A requested PDF was not produced → report it as missing, never rename the HTML or describe the run as successful
- The document renders wrongly → fix the renderer or the palette, never the source document
- A palette is missing tokens the renderer needs → stop and say which, rather than silently falling back to a default that is not the caller's brand

## Output contract

```yaml
artifacts:
  - path: brief.html
    bytes: 4953
    sha256: "52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091"
  - path: brief.pdf
    bytes: 20418
    sha256: "9f2c1d40e8b7a35f6c0e91d2b4a87f3e15c6d820a4e93b71fd5062c8ae14b7d3"
pdf_produced: true
palette: PALETTE.md
exit: 0
```

An exit of `1` means the HTML was written and a requested PDF was not; the run says why, and no file named `.pdf` exists. An exit of `2` is a usage error or an input that could not be read.

## Sibling skills

- `brief` — writes the rules a team's agents read; press renders documents rather than authoring them
