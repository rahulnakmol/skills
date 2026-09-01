---
description: Render an approved markdown document into a branded HTML page and PDF
agent: quick
---

Render `$ARGUMENTS` with the press skill.

Confirm the input is the approved version; press renders what it is handed and never renders from memory or from a summary of a document. Run `node skills/branding/press/scripts/render.mjs --in <document.md> --out <artifact.html>`, adding `--palette <file>` for a branded copy of `PALETTE.md`, `--html-only` when HTML is the only deliverable, and `--title <text>` to override the document's first heading. Read what the run reports — the path, byte size, and checksum of each artifact — and treat a requested artifact that does not exist as a failed run, never as a success under a different name. Hand back the artifact paths and checksums; fix the renderer or the palette for a rendering problem, never the source document.
