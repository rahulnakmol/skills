---
layout: skill
name: wizard
title: "Wizard: A Guided Script for the Steps Only a Person Can Do"
description: "Wizard generates a resumable shell script for the steps only a person can perform, verifying each one by observing the result and storing no secrets."
group: developer
invocation: model-invoked
scenario: "Standing up the queue service and continuous-integration secrets that QuenServe epic E1 offline inspection sync depends on"
lens:
  novice:
    who: 'You have been handed a setup note that says create the queue and add the credentials, with no indication of which screen to open or what a finished step looks like.'
    value: 'A wizard walks you through one step at a time, names the control on the screen you are looking for, and checks the result before it moves you on.'
  practitioner:
    who: 'You are the engineer whose task stalls at a console the agent cannot reach, and who writes the same setup notes by hand every time a new environment is needed.'
    value: 'You get a script that sorts the steps first, drops every step the agent can do itself, and resumes at the last verified step when the sequence is interrupted.'
  leader:
    who: 'Your team keeps losing setup knowledge to whoever last did it, and each environment ends up standing slightly differently from the one before.'
    value: 'The sequence, the verification for each step, and the gaps that could not be checked all live in one script and one state file that any member of the team can rerun.'
  csuite:
    who: 'You want assurance that credentials created during setup are not left behind in a log file, a session transcript, or a repository.'
    value: 'The generated script reads every secret with the screen echo turned off, hands it straight to the command that needs it, and records that none were stored.'
---

## What it does

Wizard is the model-invoked generator for guided manual setup. It produces a shell script that walks one person through the steps of a task, in order, and checks each step before moving to the next. The skill exists for the narrow case where work is blocked on something a person has to do in a place the agent cannot reach, such as a vendor console, a billing screen, or a repository settings page.

Its governing rule is stated plainly, and it is a rule about what not to generate. A wizard is never written for a step the agent can perform itself. Handing a person a checklist of avoidable clicks is busywork, and it teaches people to confirm prompts without reading them.

<div class="step-flow">
  <div class="step"><span class="step-num">1</span><span class="step-label">Classify every step</span><span class="step-text">Mark each step agent-executable or human-only. The test is narrow: a step the agent can finish with the access it already holds is not wizard material. If no human-only step remains, nothing is generated and the agent does the work.</span></div>
  <div class="step"><span class="step-num">2</span><span class="step-label">Order by what each produces</span><span class="step-text">Sort the remaining steps by dependency and name each one after the thing it creates, because the resource, key, or record it produces is what the next step consumes.</span></div>
  <div class="step"><span class="step-num">3</span><span class="step-label">Write the check first</span><span class="step-text">The verification for a step is written before its instruction. A verification observes a result: a resource exists, an endpoint answers, a secret name is present. Asking whether the person did it records a claim, not a fact.</span></div>
  <div class="step"><span class="step-num">4</span><span class="step-label">Build around a state file</span><span class="step-text">Each completed step and its verification result are recorded, so a rerun skips what passed and resumes at the first step that did not. Every step also prints where the person is in the sequence.</span></div>
  <div class="step"><span class="step-num">5</span><span class="step-label">Guard secrets and name gaps</span><span class="step-text">Secrets are read with terminal echo disabled and never written down or printed back. A step whose result cannot be observed is marked unverified in the state file and the summary, never as done.</span></div>
</div>

<ul class="benefits">
  <li>No wizard is generated for work the agent can perform, so a person is only ever asked to do the part that actually requires a person.</li>
  <li>Each step is confirmed by observing its result, so a step that was skipped or half-finished stops the sequence instead of passing on a typed yes.</li>
  <li>An interrupted run picks up where it stopped. A meeting, an expired session, or a failed step does not send the person back to the beginning.</li>
  <li>Every instruction describes the screen in front of the person: the page, the label on the control, the field to fill, and what the screen shows once the step worked.</li>
  <li>Credentials pass through the script without being stored, and the closing summary states which steps could not be checked so someone can check them by hand.</li>
</ul>

The skill is direct about the two failures it is written to prevent. A prompt reading "did you do it?" is not verification, because "it records a claim, and a tired person types y." A wizard that restarts from zero is "one people abandon."

- [`SKILL.md`](https://github.com/tqnonline/skills/blob/main/skills/developer/wizard/SKILL.md) covers the eleven-step procedure, the five stop conditions, and the output contract every run fills in.
- [`TRACE.md`](https://github.com/tqnonline/skills/blob/main/skills/core/TRACE.md) covers the run record, where wizard appends which steps were human-only and why.
- [`safeguard`](https://github.com/tqnonline/skills/blob/main/skills/developer/safeguard/SKILL.md) covers the security review of how the generated script handles the credentials it passes through.
- [`operate`](https://github.com/tqnonline/skills/blob/main/skills/developer/operate/SKILL.md) covers the runbook for the version of this work that recurs, rather than the one-off wizard covers.

Wizard reads each one only when the moment calls for it: writing the run record reads TRACE.md, a credential-heavy sequence reads safeguard, and a procedure that turns out to repeat reads operate.

## When to reach for it

Nothing types `/wizard` in Claude Code. Wizard is model-invoked, and it is reached three ways. Work that stalls on a console the agent cannot open reaches it. A request whose wording matches the skill description reaches it directly, including a plain ask for a setup guide or a walkthrough. And another skill that hits a manual dependency, such as a delivery pass that needs credentials nobody has created, hands the sequence over.

There are four moments where it fits. Infrastructure has to be provisioned by a person in a dashboard. Credentials or continuous-integration secrets must be created by whoever holds the access. Setup runs through an unfamiliar third-party product, where finding the right screen is the hard part. A one-off migration or cutover needs a person at the controls with a rollback in reach.

Wizard is not the only skill that produces a written procedure. This table separates its job from its nearest neighbors:

| The problem | The skill |
|---|---|
| You need the recurring version of this procedure, written as a runbook with alerts and an on-call path | [`operate`]({{ '/operate/' | relative_url }}) |
| You need the generated script reviewed for how it handles credentials before anyone runs it | [`safeguard`]({{ '/safeguard/' | relative_url }}) |
| You need the release and continuous-integration path itself built, not the account it runs against | [`deliver`]({{ '/deliver/' | relative_url }}) |
| You need to know why an existing setup script fails, rather than a guide through a manual one | [`debug`]({{ '/debug/' | relative_url }}) |
| You are not sure which skill fits at all | [`ask-fde`]({{ '/ask-fde/' | relative_url }}) |

Install once, and every tool below reaches the same wizard skill:

```bash
npx skills@latest add tqnonline/skills
```

Readers who only want wizard can skip the rest of the catalog with `./scripts/link-skills.sh --skill wizard`, which links just this skill into the default buckets without pulling in the rest of its group or core. See the <a href="{{ '/tools/' | relative_url }}">Tools page</a> for how each of the five tools installs and calls it.

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Claude Code</span><span class="tool-group-mechanism">Plain ask, no slash command</span></div>
<div class="tool-group-body">
<p>Wizard has no slash command of its own. Claude reaches for it when a request stalls on manual provisioning, on credentials only a person can mint, or on a dashboard it cannot open, and when a delivery or setup pass hands over a step it cannot finish itself.</p>
<div class="prompt-card">Epic E1, offline inspection sync, is blocked because no queue service exists yet. Work out which setup steps you can do yourself and do those. For whatever is left that only I can do, write me a script I can rerun, that checks each step by looking at the result rather than asking me, and that never stores the credentials.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>Claude returns the classification first: which steps it completed itself, which were left to a person and for what reason, and then the script, its state file, and the steps it cannot verify.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">OpenCode</span><span class="tool-group-mechanism">No command &mdash; catalog read</span></div>
<div class="tool-group-body">
<p>OpenCode ships a command layer over a handful of developer skills — <code>architect</code>, <code>impact</code>, <code>operate</code>, <code>quality</code>, <code>security</code>, <code>sdlc</code>, and <code>grit-verify</code> among them. No command wraps wizard. The agent reads the shared <code>.agents/skills/</code> catalog directly, the same route Cursor and Codex use, and applies the procedure when a request matches the skill description.</p>
<div class="prompt-card">Read skills/developer/wizard/SKILL.md, then plan the setup for feature E1-F1 offline capture: the queue service, the publisher credential, and the continuous-integration secrets. Sort the steps into ones you can do and ones I have to do. Only generate a wizard if something is genuinely left for me.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>OpenCode states the classification in its reply before writing any files, since no command wraps the generation step for it.</p>
</div>
</div>

<div class="tool-group">
<div class="tool-group-head"><span class="tool-badge">Cursor</span><span class="tool-badge">Codex</span><span class="tool-badge">GitHub Copilot</span><span class="tool-group-mechanism">Catalog readers &mdash; shared catalog, plain ask</span></div>
<div class="tool-group-body">
<p>All three read the same <code>.agents/skills/</code> catalog and apply wizard as plain context, following the shared rules in <code>AGENTS.md</code>, rather than through a command this repository ships. Codex additionally reads a generated companion file, <code>agents/openai.yaml</code>, built by <code>scripts/gen-openai-yaml.mjs</code> from every skill frontmatter block, so it sees the wizard name and description the same way the other tools do. GitHub Copilot applies <code>.github/copilot-instructions.md</code> once a team has added one, using the recommended text in <code>adapters/copilot/README.md</code>.</p>
<div class="prompt-card">Following skills/developer/wizard/SKILL.md, generate the setup script for story E1-F1-S1. I have the console access; you do not. Print where I am in the sequence at every step, tell me the exact screen and control to look for, read any key with echo off, and mark any step you cannot check as unverified.<button type="button" class="prompt-card-copy" aria-label="Copy this prompt">Copy</button></div>
<p>All three write the script and state the unverified steps directly in the session, since none has a command output to parse.</p>
</div>
</div>

A good ask includes:

- What is blocked, so the skill can tell which steps are on the critical path.
- Which access you hold and the agent does not, since that is the line the classification is drawn on.
- Where the script and its state file should live in the repository.
- Whether a step has to be checked by a second person before the sequence continues.

## A working example

The scenario sits at the base of [QuenServe]({{ '/example/' | relative_url }}), the field-inspection product every worked example on this site returns to. Epic E1, offline inspection sync, needs a queue service that does not exist yet. Feature E1-F1, offline capture, cannot be built against nothing, and story E1-F1-S1 cannot be proved until an inspection recorded on a phone reaches a real server. Standing that backend up means creating a project in a vendor console, minting a publisher credential, and putting that credential into the repository continuous-integration secrets. You type:

<pre><code>Epic E1, offline inspection sync, is blocked because no queue service
exists yet. Work out which setup steps you can do yourself and do those.
For whatever is left that only I can do, write me a script I can rerun,
that checks each step by looking at the result rather than asking me,
and that never stores the credentials.</code></pre>

The first thing wizard produces is not a script. It is the classification. Eleven steps were listed. Seven were agent-executable with the access already in hand: writing the queue configuration file, adding the client library, wiring the local emulator, and four others. Those were done directly and never appeared in a wizard. Four steps were left, and each was left for a stated reason.

The completed run, shown here as the shape the output contract of the skill produces, filled with this scenario rather than a captured session:

<pre><code>script: scripts/setup-quenserve-sync.sh
state_file: .wizard/setup-quenserve-sync.state
resumable: true
secrets_stored: none
steps:
  - id: create-queue-project
    human_reason: console-only; the vendor exposes no project-creation API
    verify: "the management API returns the new project id"
    status: verified
  - id: create-publisher-credential
    human_reason: only an organization owner may mint a publisher key
    verify: "a test publish to the staging topic is accepted"
    status: verified
  - id: set-ci-secrets
    human_reason: repository secrets are write-only to the agent
    verify: "the secret name is listed on the repository; value never read"
    status: verified
  - id: enable-dead-letter-alert
    human_reason: alert routing is configured in a console with no read API
    verify: none available
    status: unverified
dry_run: parsed, state file created, banner printed</code></pre>

The script itself is written against the screen the person is on rather than against the idea of the step. Step two runs like this:

<pre><code>Step 2 of 4 - create the publisher credential

  Open the queue project you created in step 1.
  In the left sidebar choose Access, then the Service keys tab.
  Select New key, name it quenserve-sync-publisher, and pick the
  Publish role. Confirm with Create key.
  The key appears once, under a heading that reads Copy this now.

  Paste the key (input hidden):
  Checking... a test publish to the staging topic was accepted.
  Step 2 verified. State written to .wizard/setup-quenserve-sync.state

Step 3 of 4 - add the credential to continuous integration</code></pre>

Three details in that transcript carry most of the value. The banner says where the person is, so they can judge whether it is safe to stop before step three. The key is read with terminal echo disabled and passed straight to the publish check, so it never reaches the state file, the log, or the shell history. And the confirmation is a real publish that the server accepted, not a question about whether the key was pasted correctly.

The fourth step is the honest one. Dead-letter alert routing is set in a console screen the vendor exposes no read API for, so the script cannot observe the result. It is recorded as `unverified` in the state file and repeated in the closing summary, rather than counted as done. That is a named gap someone can check by hand. Recorded as complete, it would have been an invisible one.

## What good looks like

<div class="compare-grid">
<div class="compare-card">
<div class="compare-card-head">Classified, checked, resumable</div>
<pre><code>step 1  create-queue-project         verified
step 2  create-publisher-credential  verified
step 3  set-ci-secrets               verified
step 4  enable-dead-letter-alert     unverified

<span class="tok-comment"># 7 agent-executable steps done directly, never in the wizard</span>
<span class="tok-comment"># rerun resumes at step 4; steps 1-3 are skipped</span>
<span class="tok-comment"># secrets_stored: none</span></code></pre>
<div class="compare-card-note">Four steps reached the person because four steps needed a person. Each carries an observation, or an honest label saying no observation was possible.</div>
</div>
<div class="compare-card compare-card--warn">
<div class="compare-card-head">The wrong turn to watch for</div>
<pre><code><span class="tok-warn">Did you create the project? [y/N]</span>
<span class="tok-warn">The pasted key echoed back for confirmation</span>
<span class="tok-warn">A rerun that starts again from step 1</span>
<span class="tok-warn">A step nobody could check, recorded as done</span>
<span class="tok-warn">Eleven steps handed over, seven of them avoidable</span></code></pre>
<div class="compare-card-note">From the skill: a yes-or-no prompt "records a claim, and a tired person types y." A checklist of avoidable steps "teaches people to click through prompts without reading them."</div>
</div>
</div>

## Common questions

<details class="qa">
<summary>What happens when every step turns out to be agent-executable?</summary>
<div class="qa-body">

Nothing is generated. That is a stop condition, and it is the first one the skill checks. The agent does the work and says why no wizard was warranted. This matters more than it sounds: the classification step is what keeps the skill from producing a document whose only real function is to move effort onto a person who did not need to spend it.

</div>
</details>

<details class="qa">
<summary>Why is a yes-or-no prompt not treated as verification?</summary>
<div class="qa-body">

Because it records what someone typed, not what happened. A person part-way through a long setup, on their second browser tab, will type y for a step they believe they finished. A verification observes the result instead: the project id comes back from the management API, the test publish is accepted, the secret name is listed on the repository. If the check fails, the step is not done, whatever the person thought.

</div>
</details>

<details class="qa">
<summary>How does a rerun avoid repeating completed steps?</summary>
<div class="qa-body">

The script keeps a state file recording each completed step and its verification result. On a rerun it reads that file, skips what passed, and resumes at the first step that did not. Manual sequences get interrupted by meetings, expired console sessions, and failed steps, so resumability is not a convenience here. It is the difference between a script people finish and one they abandon half way.

</div>
</details>

<details class="qa">
<summary>What if the state file is missing or unreadable?</summary>
<div class="qa-body">

The script re-verifies from the first step rather than assuming progress. Verifications are observations, so re-running them is cheap. Guessing wrong about a partially completed migration is not.

</div>
</details>

<details class="qa">
<summary>How are secrets handled?</summary>
<div class="qa-body">

Terminal echo is turned off while the value is typed, and the value is passed to the target command through standard input or through an environment variable inside the process of that command. It is never written to the state file, the log, the transcript, or the shell history, and it is never printed back for confirmation. The confirmation is that the credential works, which is the property that actually matters.

</div>
</details>

<details class="qa">
<summary>What happens to a step whose result cannot be observed?</summary>
<div class="qa-body">

It stays in the sequence and is marked `unverified`, both in the state file and in the closing summary. It never counts as done. An unverifiable step is a known gap, and naming it lets someone check it by hand later. Recording it as complete would hide it, which is the outcome the rule exists to prevent.

</div>
</details>

<details class="qa">
<summary>Is the generated script ever run before it is handed over?</summary>
<div class="qa-body">

Yes, up to the first human-only step. That confirms the script parses, creates its state file, and prints the position banner. Generating a script and never executing it is how a broken wizard reaches the person it was written for, usually at the moment they have the least patience for one.

</div>
</details>

<details class="qa">
<summary>What if the sequence is too long for one sitting?</summary>
<div class="qa-body">

It is split into stages, each with a documented resume point. The skill is explicit that a wizard abandoned half way through is worse than a plain written runbook, because the state file then describes a system nobody can now describe from memory either.

</div>
</details>

## It's working if

- Every step in the generated script has a stated reason it could not be done by the agent, and nothing else survived the classification.
- Each step is confirmed by an observed result, and a step that fails its check stops the sequence rather than passing on a typed answer.
- A rerun after an interruption resumes at the first unfinished step, and the person can see their position in the sequence at all times.
- No secret appears in the state file, the log, or the shell history, and any step that could not be checked is reported as unverified rather than done.

If a wizard exists for a sequence the agent could have run end to end, the skill has produced exactly the thing it was written to avoid.

## Where it fits

**Wizard is the handover lane: it takes the part of a task that genuinely needs a person, and makes that part checkable, resumable, and safe to stop.**

Its nearest neighbor is `operate`, which owns the procedure that recurs. Wizard covers the one-off and the first time, and a sequence that turns out to repeat every month belongs in a runbook instead. `safeguard` reviews how the generated script handles the credentials it passes through, which matters because provisioning wizards touch keys by definition. `deliver` is usually what the wizard unblocks, since a release path cannot run against an account nobody has created. Each run appends a `wizard` entry to the trace described in `core/TRACE.md`, recording which steps were human-only and why, which carry verifications, which are unverifiable, and where the script and its state file live.

If none of this settles which skill fits, `ask-fde` routes you by intent rather than by skill name.
