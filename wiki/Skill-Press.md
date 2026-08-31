# Skill: Press

**Group:** branding · **Invocation:** user-invoked · **Source:** [SKILL.md](https://github.com/tqnonline/skills/blob/main/skills/branding/press/SKILL.md)

Press renders an approved markdown document into a branded, self-contained HTML page and, where a headless browser is available, a PDF. It never changes the source document; it produces artifacts and reports their checksums. The design tokens come from a palette file rather than from anything hardcoded, so one edit rebrands every document a team produces.

## When to invoke

- A document is signed off and someone outside the working repository needs to read it.
- A requirements document, leadership pack, decision record, or research summary is going to stakeholders.
- A set of documents needs to carry one visual identity.

## How it fits

Press renders whatever markdown file it is handed, whatever produced that file. That is deliberate. An earlier version rendered specifically a requirements document approved at a gate in another group's pipeline, which made the branding group unusable without installing that pipeline too — the coupling ADR 0007 removed. The sign-off still matters; it is simply not press's to judge. Whoever owns the document decides it is ready, and the caller confirms that before asking for a render. A renderer that guessed at approval would either block legitimate work or lend unsigned scope a legitimacy it has not earned, and it has evidence for neither.

The skill also refuses to overstate what it produced. With no headless browser it writes the HTML, prints why the PDF step could not run, creates no file named `.pdf`, and exits with a code that says the requested artifact does not exist. When a browser exits cleanly it still opens the file and confirms it is a PDF before reporting one. That is this repository's rule that absence of error is not evidence of success, applied to the tool itself.

## Key references

- [render.mjs](https://github.com/tqnonline/skills/blob/main/skills/branding/press/scripts/render.mjs) is the renderer: zero dependencies, Node 20, markdown to a self-contained page and a PDF.
- [PALETTE.md](https://github.com/tqnonline/skills/blob/main/skills/branding/press/PALETTE.md) holds the design tokens in a machine-readable block. Copy it, edit the values, and pass the copy to brand a document set.

## How to use

Run the renderer against the approved file:

```bash
node skills/branding/press/scripts/render.mjs --in <document.md> --out <artifact.html>
```

Add `--palette <file>` for your own tokens, `--html-only` when HTML is the deliverable, and `--title <text>` to override the document's first heading. The run prints the path, byte size, and checksum of every artifact it wrote. Three exit codes carry the outcome: `0` means every requested artifact exists, `1` means the HTML was written and a requested PDF was not, and `2` is a usage error or an input that could not be read.

## Best practices

- Confirm the document is the approved version before rendering. Press cannot tell a draft from a final and does not pretend to.
- Read the run's output rather than assuming it worked. It states plainly when an artifact it was asked for does not exist.
- Fix a rendering problem in the renderer or the palette, never in the source document. The document and the record must not diverge.
- Watch standard error for a named palette token. When a token is missing the renderer falls back and says which one, and an artifact rendered on fallbacks is not fully in your brand.
- Keep branded palettes as copies. Editing the shipped palette changes every document the skill produces, which is occasionally what you want and usually not.

## Sibling skills

Press is the only skill in the branding group today, and it depends on no other group. It renders the markdown file it is handed, so it installs and runs on its own.
