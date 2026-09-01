---
layout: group
name: branding
group: branding
title: "Branding: One Identity Across Every Document"
description: "Branding applies an identity to what an agent produces; its first skill, press, renders an approved document into a self-contained, branded page and PDF."
---

You finish a document that took real work to get right, and then you have to decide how someone outside your team will read it. Pasted into a slide, screenshotted from an editor, or opened as raw text a code host renders in monospace — none of those was really a choice, only whatever was fastest that day. Branding answers that question once, as a set of tokens in a file, instead of by hand on every document you send. You edit the file, not the habit.

Getting the analysis right is the hard part, and by the time a document reaches its reader, that work is already done. What goes wrong happens after, in the gap between "the document is finished" and "someone outside the room opens it," when whoever sends it reaches for whatever format is fastest that day. Call this failure the House-Style Drift: the same report, formatted a little differently each time by whoever happens to send it.

<figure style="margin:28px 0 20px;padding:22px 18px 14px;border:1px solid var(--line);border-radius:12px;background:var(--surface);">
<svg viewBox="0 0 780 260" width="100%" height="260" role="img" aria-label="A line drifting downward across four documents: the first matches the palette exactly, and each one after is copied a little further from it, ending with no visible relation to the first." style="color:var(--cobalt);">
  <line x1="50" y1="55" x2="720" y2="55" stroke="currentColor" stroke-width="2" stroke-dasharray="5 6" opacity="0.7"/>
  <text x="55" y="40" font-size="12" style="fill:var(--muted);">one palette — PALETTE.md</text>
  <polyline points="100,55 300,95 500,150 680,210" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="100" cy="55" r="7" fill="currentColor"/>
  <circle cx="300" cy="95" r="7" fill="currentColor"/>
  <circle cx="500" cy="150" r="7" fill="currentColor"/>
  <circle cx="680" cy="210" r="7" fill="currentColor"/>
  <text x="100" y="82" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="100" dy="0">first document</tspan><tspan x="100" dy="14">matches exactly</tspan></text>
  <text x="300" y="122" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="300" dy="0">second — copied</tspan><tspan x="300" dy="14">close, not exact</tspan></text>
  <text x="500" y="177" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="500" dy="0">third — pasted from</tspan><tspan x="500" dy="14">whichever was open</tspan></text>
  <text x="680" y="237" text-anchor="middle" font-size="12" style="fill:var(--muted);"><tspan x="680" dy="0">fourth — no visible</tspan><tspan x="680" dy="14">relation to the first</tspan></text>
</svg>
<figcaption style="margin-top:6px;font-size:13px;color:var(--muted);text-align:center;">The House-Style Drift: one palette at the start, and a little less of it in every document after.</figcaption>
</figure>

`press` is the fix, and the numbers behind it are checkable right now, not asserted.

- **Ten color tokens, one file.** `PALETTE.md`'s machine-readable block names every color the renderer touches — page, surface, text, heading, muted, accent, border, and three surfaces reserved for code and quotes.
- **One script, two artifacts.** `node skills/branding/press/scripts/render.mjs --in doc.md --out artifact.html` writes a self-contained HTML page, and a PDF whenever a headless browser is present on the machine that runs it.
- **Deterministic, checked moments ago.** The shipped fixture renders to 4,953 bytes, checksum `52d153256fb9320635ae07141a53f0991736e7ff1bf3197e052ef046c846d091`, and the same input and palette will always reproduce that exact number.

Branding is one skill deep today, and its charter is wider than what has shipped. The group's stated direction reaches into tone of voice and presentation narratives that no skill here yet covers; only document rendering is built. `press` reads every color from a file, never from a value typed into the renderer itself — the concrete choice that makes a house style possible without touching code. A palette you can edit outlives a renderer you would otherwise have to rewrite.

The path through branding is short, because branding holds exactly one skill.

1. [`press`]({{ '/press/' | relative_url }}) — render whatever approved document you hand it, in your palette, as an HTML page and a PDF.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

Branding does not yet cover tone of voice or a slide narrative — only how a finished document looks once someone outside the team opens it. Neither of this site's two published journeys ends at that moment yet; both stop at a decision or a merge, before a reader outside the team ever opens the result.
