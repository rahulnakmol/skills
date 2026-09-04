---
layout: skill
name: ai-branding
title: "AI Branding: Two Providers, One Rights Boundary"
description: "AI Branding defaults to an Anthropic-inspired editorial profile and offers a separate OpenAI-inspired option, both using accessible roles and open-source fonts."
group: branding
invocation: user-invoked
scenario: "Giving QuenServe epic E1 one Anthropic-inspired identity across product, print, space, and video without implying provider endorsement"
lens:
  novice:
    who: 'You want a recognizable AI-related visual direction but do not want to copy a company site.'
    value: 'The skill separates inspiration, local adaptation, open fonts, and permission for marks.'
  practitioner:
    who: 'You need one provider-inspired profile to work across product, document, environmental, and video tools.'
    value: 'A provider toggle changes the whole profile while one common production contract stays in force.'
  leader:
    who: 'Your team needs to avoid mixing provider identities or overstating what guidance is official.'
    value: 'The source record labels every local semantic, accessibility, physical, type, and motion decision.'
  csuite:
    who: 'You own public claims, trademark exposure, and the accessibility of a visible campaign.'
    value: 'The delivery receipt separates rights, checks, limitations, and approval from visual resemblance.'
---

## What it does

AI Branding carries two separate profiles. Anthropic is the default, with warm paper, dark structure, clay accents, Poppins, Lora, and JetBrains Mono. The optional `provider: openai` profile uses monochrome structure, a restrained local teal, Manrope, Source Serif 4, and JetBrains Mono. Every primary font is open source, and neither option grants rights to provider marks.

<div class="step-flow">
<div class="step"><span class="step-num">1</span><span class="step-label">Choose</span><span class="step-text">Use Anthropic by default or explicitly toggle to OpenAI.</span></div>
<div class="step"><span class="step-num">2</span><span class="step-label">Frame</span><span class="step-text">Name audience, message, surfaces, locale, rights, and owner.</span></div>
<div class="step"><span class="step-num">3</span><span class="step-label">Apply</span><span class="step-text">Keep the selected provider profile separate from its company voice and marks.</span></div>
<div class="step"><span class="step-num">4</span><span class="step-label">Produce</span><span class="step-text">Build native files, samples, and media under the common engine.</span></div>
<div class="step"><span class="step-num">5</span><span class="step-label">Verify</span><span class="step-text">Inspect rendered states, rights, accessibility, and delivery files.</span></div>
</div>

<ul class="benefits">
<li>The provider toggle changes color and typography without mixing identities.</li>
<li>Official source material stays separate from local product, accessibility, physical, and motion guidance.</li>
<li>Open-source substitutes prevent a proprietary provider font from entering the package.</li>
<li>Marks remain absent unless the requester supplies current permission.</li>
</ul>

## When to reach for it

Use this skill when a project needs an Anthropic-inspired or OpenAI-inspired visual direction and the source boundary matters. It is user-invoked in Claude Code and available by a named request in OpenCode, Cursor, Codex, and GitHub Copilot.

Install once, use in all five tools:

```bash
npx skills@latest add tqnonline/skills
```

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">User-invoked provider profile</span></div>
<div class="tool-group-body"><p>Anthropic is the default. State the OpenAI toggle when that is the intended profile.</p><div class="prompt-card">Use ai-branding for QuenServe E1 with provider: anthropic. Apply it across product, PDF, event wall, and launch video without using a provider mark.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div></div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">Shared catalog, plain request</span></div>
<div class="tool-group-body"><p>Name the provider, mode, surfaces, and rights boundary.</p><div class="prompt-card">Apply ai-branding with provider: openai to this release package. Use only the open-source substitute fonts and no company marks.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div></div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers</span></div>
<div class="tool-group-body"><p>Ask for one provider profile and the evidence needed before release.</p><div class="prompt-card">Brand QuenServe E1 with the default AI profile. Generate light and dark review states, a press palette, physical sample brief, and video quality-control list.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div></div>
</div>

| The problem | The skill |
|---|---|
| A signed markdown file only needs HTML and PDF rendering | [`press`]({{ '/press/' | relative_url }}) |
| A provider-neutral palette theme is preferable | Choose one of the five open palette themes |
| A selected provider profile needs common production rules | [`branding-system`]({{ '/branding-system/' | relative_url }}) |

See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for setup.

## A working example

QuenServe E1 requests the default Anthropic-inspired direction for a product launch, PDF, event wall, and 30-second video. The skill uses the warm editorial profile but writes in the repository's independent direct and grounded voice. No provider logo or product icon appears. The source record labels the dark mode, semantic roles, physical guidance, and motion rules as local additions.

If the owner switches to `provider: openai`, the entire profile changes to monochrome structure, local teal, and the Manrope and Source Serif 4 pairing. The two sets never merge. The release receipt names the chosen variant, current rights evidence, rendered checks, limitations, and approval owner.

## What good looks like

<div class="compare-grid">
<div class="compare-card"><div class="compare-card-head">One explicit provider profile</div><p>Color, type, rights, source notes, and delivery evidence all name the same selected variant.</p></div>
<div class="compare-card compare-card--warn"><div class="compare-card-head">A blended imitation</div><p>One provider's type, another provider's mark, and invented behavior guidance appear as if they were official.</p></div>
</div>

## Common questions

<details class="qa"><summary>Does the provider toggle include logos?</summary><div class="qa-body"><p>No. Marks require separate permission under current terms. The default output uses typography, semantic color, and composition without a provider mark.</p></div></details>

<details class="qa"><summary>Why does the OpenAI option use substitute fonts?</summary><div class="qa-body"><p>The named provider font is not distributed as an open-source family. Manrope and Source Serif 4 keep this skill's font package under OFL-1.1.</p></div></details>

<details class="qa"><summary>Does this copy either provider's voice?</summary><div class="qa-body"><p>No. Every variant inherits the same independently written verbal doctrine: direct, audience-centered, grounded, and constructive.</p></div></details>

## It's working if

- Exactly one provider variant appears in the tokens, fonts, source record, and receipt.
- No mark or endorsement claim appears without current permission.
- Local accessibility and production rules are never presented as provider guidance.
- Generated or automated content is disclosed in words rather than through a color or icon alone.

## Where it fits

AI Branding is one of six user-invoked themes. It selects the provider variant and then calls the model-invoked branding system. Press remains the renderer for approved markdown. A single-skill link includes the shared engine but no unrelated theme.
