---
layout: group
name: branding
group: branding
title: "Branding: One Identity Across Every Document"
description: "Branding applies an identity to what an agent produces; its first skill, press, renders an approved document into a self-contained, branded page and PDF."
---

Branding skills apply an identity — a company's or a person's — to what an agent produces: tone of voice, color and palette, and the presentation choices that turn a working document into something a reader outside the team will act on. The group's charter is broad; its first shipped skill covers the delivery pipeline's most immediate need, turning a signed-off markdown document into something a stakeholder can actually open.

The group depends on no other group and installs on its own. Its one skill, `press`, renders whatever markdown document it is handed, regardless of which group or process produced that document, so adopting branding does not require adopting the developer or pm pipeline alongside it. A team that only needs consistent, presentable documents can install branding by itself.

`press` reads every color, font, and page measurement from a palette file rather than from anything hardcoded in the renderer. The shipped default palette makes every render work out of the box; a copied and edited palette, passed with `--palette`, applies a house style across a whole set of documents without touching the renderer itself. Planned work extends the group beyond documents into presentation narratives and brand-consistent collateral.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```
