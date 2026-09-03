---
name: wizard
description: Model-invoked generator for an interactive shell wizard that walks a person through steps only a person can perform. Use when work stalls on manual provisioning, credential setup, an unfamiliar third-party dashboard, or a one-off migration or cutover.
---

# Wizard (model-invoked)

Generate a resumable shell script that guides a person through the manual steps of a task and verifies each one before moving on.

## Contract

```yaml
contract:
  invocation: model
  thesis: scaffold
  verbs: [read, write-repo]
  scope: owns
  trace: wizard
```

## When to invoke

- Work stalls on infrastructure a person must provision in a console the agent cannot reach
- Credentials or continuous-integration secrets must be created and entered by someone who holds the access
- Setup runs through an unfamiliar third-party dashboard, where finding the right screen is the hard part
- A one-off migration or cutover needs a person at the controls with a rollback within reach
- The same manual onboarding is repeated by hand, and the order of the steps keeps being lost

## Procedure

1. List every step the task requires, and mark each one agent-executable or human-only. The test is narrow: a step the agent can complete with the access it already holds is not wizard material.
2. Stop if no human-only step remains. Do not generate a wizard for work the agent can do itself. A checklist of avoidable steps is busywork handed to a person, and it teaches people to click through prompts without reading them.
3. Order the remaining steps by dependency, and name each one by what it produces — the resource, key, or record the next step consumes.
4. Write the verification for each step before writing its prompt. A verification observes the result: a resource exists, a secret is set, an endpoint answers, a row is present. A "did you do it? [y/N]" prompt is not verification. It records a claim, and a tired person types y.
5. Generate the script around a state file that records each completed step and its verification result. Re-running the script skips what already passed and resumes at the first step that did not. Manual sequences get interrupted by meetings, expired sessions, and failed steps, so a wizard that restarts from zero is one people abandon.
6. Print the position in the sequence at every step — for example, `Step 3 of 7 — create the deploy key`. A person who cannot see where they are cannot judge whether it is safe to stop.
7. Write each instruction against the screen the person is on: the page, the control's visible label, the field to fill, and what the screen shows when the step worked. Describe what to look for, not what the step means.
8. Read any secret with terminal echo disabled, and pass it to the target command through standard input or an environment variable in that command's own process. Never write a secret to the state file, the log, the transcript, or the shell history, and never print it back for confirmation. Confirm by observing that the credential works, which is the property that actually matters.
9. Mark a step whose result cannot be observed as `unverified` in the state file and in the closing summary, never as done. An unverifiable step is a known gap, and naming it lets someone check it by hand; recording it as complete hides it.
10. Run the script up to the first human-only step to confirm it parses, creates its state file, and prints the position banner. Generating a script and never executing it is how a broken wizard reaches the person it was written for.
11. Append the trace entry: which steps were human-only and for what reason, which carry verifications, which are unverifiable, and where the script and its state file live.

## Stop conditions

- Every step turns out to be agent-executable → generate nothing, do the work, and say why no wizard was warranted
- A step has no observable result → keep it, mark it unverified in the state file and the summary, and never let it count as done
- Verifying a step would require storing a secret → verify the credential's effect instead; if that is impossible, mark the step unverified rather than persisting the value
- The state file is missing or unreadable on a re-run → re-verify from the first step rather than assuming progress, because re-checking is cheap next to a repeated migration
- The sequence runs longer than one sitting → split it into stages with a documented resume point; a wizard abandoned halfway is worse than a plain written runbook

## Output contract

```yaml
script: scripts/setup-staging.sh
state_file: .wizard/setup-staging.state
resumable: true
secrets_stored: none
steps:
  - id: create-project
    human_reason: console-only, no API for project creation
    verify: "API read returns the project id"
    status: verified
  - id: rotate-signing-key
    human_reason: requires a hardware token held by the release owner
    verify: none available
    status: unverified
dry_run: parsed, state file created, banner printed
```

## Sibling skills

- `operate` — the runbook for work that recurs; a wizard covers the one-off or the first time
- `safeguard` — the security review for how the generated script handles credentials
- `deliver` — the release and continuous-integration path a provisioning wizard usually unblocks
- `core/TRACE.md` — the trace this skill appends to
