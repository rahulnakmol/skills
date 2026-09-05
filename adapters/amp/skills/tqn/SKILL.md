---
name: tqn
description: Router for the tqnonline/skills catalog when it runs inside Amp. States where a skill's doctrine citation resolves after an Amp install, which Amp tool to prefer where one overlaps a catalog skill (Librarian, Finder, Oracle, threads, modes, schedules, charts), and how the catalog's agent and human nodes run as Task subagents, orb threads, and schedules. Use when any skill from tqnonline/skills is loaded in Amp, when a citation such as core/VERIFICATION.md or GATES.md does not resolve, or when choosing between a catalog skill and an Amp capability.
---

# tqn — the catalog inside Amp (model-invoked)

The skills in [tqnonline/skills](https://github.com/tqnonline/skills) are written once for several agent tools and never name a tool. This skill is the Amp adapter for that catalog: it maps the catalog's conventions onto what Amp already provides, so a skill is followed the way it was written and Amp's own tools do the parts they do well. It adds no procedure of its own.

## Where a citation resolves

Amp installs a skill by copying the directory that holds its `SKILL.md`. A citation to a file outside that directory resolves as follows.

| Citation in a skill | Resolves to |
|---|---|
| `core/<FILE>.md`, for example `core/VERIFICATION.md` | the same filename in the `core-doctrine` skill |
| a bare filename from a pm skill, for example `GATES.md`, `HATS.md` | the same filename in the `pm-doctrine` skill |
| `DDDD.md` from a developer skill | `DDDD.md` in the `developer-doctrine` skill (pm has its own `DDDD.md`) |
| `<skill>/<FILE>.md`, for example `grit/LEDGER.md` | that file inside the installed skill `<skill>` |
| a file inside the citing skill's own directory | read it in place |

If the target skill is not installed, read the source at `https://github.com/tqnonline/skills/blob/dev/skills/<group>/...` and say so, or install it with `amp skill add tqnonline/skills/skills/<group>/<skill>`.

## Prefer Amp where Amp already does the job

Eight catalog skills overlap a capability Amp has built in. The catalog skill keeps the discipline it encodes; Amp does the mechanical part.

| Catalog skill | Amp capability | Division of labor |
|---|---|---|
| `research` | Librarian, `web_search`, `read_web_page` | Amp fetches primary sources; `research` decides what counts as evidence and writes the cited file |
| `recon` | Finder, Librarian, the `explaining-code` skill | Amp searches and explains the code; `recon` structures the brownfield brief and the archetype triage |
| `handoff` | threads, `read_thread`, `find_thread` | Amp carries context between threads; `handoff` writes the document a cold reader needs; record the thread URL in it |
| `model-routing`, `update-models` | modes (low, medium, high, ultra) and the Dial | Amp chooses the model behind a mode; the registry maps a role to a mode tier, never to a pinned model in Amp |
| `shakedown` | the orb sandbox, Review, Ship | Amp builds and runs the branch in an isolated orb; `shakedown` supplies the checklist and the verdict format |
| `brief` | AGENTS.md generation, the `writing-prompts` skill | Amp drafts the file; `brief` decides what is an always-loaded rule, a glossary term, and an on-demand reference |
| `spotlight` | the `creating-charts` skill, `diagram` code blocks | Amp renders charts and box diagrams inline; `spotlight` decides which single view a decision needs and keeps sources beside it |
| `exhibit`, `press` | Chrome for Testing and `agent-browser` in every orb | The render and verify scripts find that browser on their own; no extra install is needed in an orb |

A skill that Amp has no equivalent for, such as `grit`, `slice`, `conduct`, or any pm skill, runs as written.

## Running the catalog's execution shapes on Amp

`conduct` and `arrange` describe work as nodes. Amp has a native form for each node type.

| Node in the catalog | Run it in Amp as |
|---|---|
| `agent` node, bounded, same checkout | a Task subagent, briefed with the node's contract and expected output |
| `agent` node that must not share the writer's context, or a verifier | a new thread with `create_thread`, executor `orb`, intent `independent-review`; ask it to reply when done |
| `human` node | stop and put the decision to the user with the inputs the node names; never approve it on the owner's behalf |
| a judgment call the graph cannot settle | Oracle, with the alternatives and the evidence gathered so far |
| a recurring node, such as `update-models` on its schedule | a schedule on the thread, through the `building-schedules` skill |

Model per node: `model-routing` assigns a tier, not a model. In Amp, `small` runs at `low`, `worker-fast` at `medium`, `worker-deep` and `verifier` at `high`, and the orchestrator stays in the thread that called `conduct`. A verifier runs in a separate thread so it does not grade its own work.

## Completion discipline

`grit` works in Amp as written for the ledger, the depth, the four passes, the checker, and the audit. Amp has no stop hook, so without the opt-in `tqn-grit` plugin nothing blocks a turn from ending while gates are unmet. Before reporting work done, run `node <grit>/scripts/gate-check.mjs --status` and report every unmet gate. When the plugin is installed, a turn that ends with unmet gates is continued with a message that begins `[tqn-grit plugin]` and names them; treat it as the ledger speaking, do the work it names, and never edit the approval store or the hook state. `adapters/amp/plugin/README.md` describes the plugin.

## Commit attribution

Amp adds `Co-authored-by: Amp` and `Amp-Thread-ID` trailers to commits by default. The catalog's repository rules forbid agent attribution. When working in a repository that carries that rule, set `amp.git.commit.coauthor.enabled` and `amp.git.commit.ampThread.enabled` to `false`, or export `AMP_DISABLE_AMP_COAUTHOR_TRAILER=1` and `AMP_DISABLE_AMP_THREAD_TRAILER=1`, before committing.
