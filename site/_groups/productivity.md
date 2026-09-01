---
layout: group
name: productivity
group: productivity
title: "Productivity: Workflows Worth Not Repeating"
description: "Productivity automates workflows worth not repeating by hand; its first skill, brief, writes the rules an agent actually reads, placed per tool surface."
---

You tell your agent something once, and for that session it works. Next week you tell it again, because the file the agent actually reads never received the correction — only your chat history did. Productivity turns a repeated correction into a rule a tool loads on its own, every session, without you retyping it. You write the sentence once, and the tool carries it from then on.

Giving the correction once is easy; anyone can type a sentence into a prompt. What is hard is the moment right after, when the correction has to survive past the chat window it was typed into and reach the file the tool actually reads on its next run. Call this failure the Repeat Tax: the same correction, paid again every session it was never written down.

<figure style="margin:28px 0 20px;padding:22px 18px 14px;border:1px solid var(--line);border-radius:12px;background:var(--surface);">
<svg viewBox="0 0 760 220" width="100%" height="220" role="img" aria-label="A repeating pattern of four stages: a mistake happens, someone corrects it in chat, a new session starts fresh, and the same mistake happens again — the dashed line marks the fixed state neither correction stayed at." style="color:var(--cobalt);">
  <line x1="40" y1="180" x2="680" y2="180" stroke="currentColor" stroke-width="2" stroke-dasharray="5 6" opacity="0.7"/>
  <polyline points="70,180 260,80 450,180 640,80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="180" r="7" fill="currentColor"/>
  <circle cx="260" cy="80" r="7" fill="currentColor"/>
  <circle cx="450" cy="180" r="7" fill="currentColor"/>
  <circle cx="640" cy="80" r="7" fill="currentColor"/>
  <text x="70" y="150" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="70" dy="0">the mistake</tspan><tspan x="70" dy="14">happens</tspan></text>
  <text x="260" y="102" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="260" dy="0">corrected —</tspan><tspan x="260" dy="14">in chat</tspan></text>
  <text x="450" y="150" text-anchor="middle" font-size="12" style="fill:var(--ink);"><tspan x="450" dy="0">new session</tspan><tspan x="450" dy="14">starts fresh</tspan></text>
  <text x="640" y="102" text-anchor="middle" font-size="12" style="fill:var(--muted);"><tspan x="640" dy="0">same mistake,</tspan><tspan x="640" dy="14">again</tspan></text>
</svg>
<figcaption style="margin-top:6px;font-size:13px;color:var(--muted);text-align:center;">The Repeat Tax: fixed in one conversation, and paid again the next time nobody wrote it down.</figcaption>
</figure>

`brief` is the fix, and its own doctrine is a real, checkable example of the problem it solves.

- **Three layers, one file.** `RULES.md` splits a working agreement into definitions, rules, and references — the first two always loaded, the third reached only when a trigger fires.
- **Seven surfaces, one map.** `SURFACES.md` names where each of seven tools reads its rules, from `CLAUDE.md` at a repository root to `.github/copilot-instructions.md`, and marks two surfaces that read no repository file at all.
- **Fifty-five lines, twenty-four lines.** This repository's own `CLAUDE.md` and `AGENTS.md` — real counts, confirmed the same way `brief` itself would confirm them — well under the point where either file would need pointers of its own.

Productivity grows one skill at a time, and each one is added only for a real, recurring problem rather than to fill a category in advance. `brief` ships with no script of its own; its output is a written file, verified only by running a real task and watching whether the rule fires. Rereading a rule proves nothing a real task cannot prove better. Writing a correction down once costs one file and one sentence; repeating it costs that same sentence again, every session, for as long as nobody writes it down.

The path through productivity is short, because productivity holds exactly one skill.

1. [`brief`]({{ '/brief/' | relative_url }}) — turn the correction you keep repeating into a rule the tool loads on its own, placed in the file that tool actually reads.

```bash
npx skills@latest add tqnonline/skills
./scripts/install-adapters.sh
```

A rule nobody has tested against a real task is a preference, whatever the file that holds it is named. Neither published journey on this site runs through brief yet; both stop before the moment a team rewrites the rule file its own agents load.
