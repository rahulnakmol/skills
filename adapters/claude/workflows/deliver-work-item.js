export const meta = {
  name: 'deliver-work-item',
  description: 'Deliver a ready work item: plan, implement as a single writer, verify against the contract, then raise either one PR or a reviewable gh-stack of layered PRs',
  whenToUse: 'Run only on a work item whose pickup-protocol label is `ready`. The workflow refuses items at any earlier state — that gate belongs to a human, not to this script.',
  phases: [
    { title: 'Gate', detail: 'verify the item is at `ready`; refuse otherwise' },
    { title: 'Plan', detail: 'SPEC-TS snapshot, file ownership, and a layer plan for stacking' },
    { title: 'Implement', detail: 'single writer implements and writes tests in an isolated worktree' },
    { title: 'Verify', detail: 'a separate verifier runs the contract verification commands; bounded fix loop' },
    { title: 'Raise', detail: 'one PR, or a dependency-ordered reviewable stack via gh stack' },
  ],
}

// args: { item: <issue number>, tracker?: 'github' | 'linear', repo?: 'owner/name', base?: 'dev' }
// Stacking follows skills/developer/deliver/STACKING.md: a diff too large to hold in a
// reviewer's head becomes a dependency-ordered stack of single-concern PRs (gh stack).
const item = args?.item
if (item === undefined || item === null) {
  return { status: 'BLOCKED', reason: 'args.item is required: the work item to deliver.' }
}
const tracker = args?.tracker ?? 'github'
const repoFlag = args?.repo ? ` --repo ${args.repo}` : ''
const stackBase = args?.base ?? 'dev'

phase('Gate')
const GATE_SCHEMA = {
  type: 'object',
  required: ['state', 'title', 'body'],
  properties: { state: { type: 'string' }, title: { type: 'string' }, body: { type: 'string' }, url: { type: 'string' } },
}
const gatePrompt = tracker === 'linear'
  ? `Read Linear issue ${item} via the Linear MCP tools. Return state = its pickup-protocol label/state name, plus title, full body, url.`
  : `Run \`gh issue view ${item}${repoFlag} --json title,body,labels,url\`. Return state = the pickup-protocol label present (one of raised|critiqued|clarified|ready|in-progress|done, or "none"), plus title, full body, url.`
const gate = await agent(gatePrompt, { label: `gate:${item}`, schema: GATE_SCHEMA })
if (!gate) return { status: 'BLOCKED', reason: `Could not read work item ${item}.` }
if (gate.state !== 'ready') {
  return {
    status: 'REFUSED',
    reason: `Work item is at "${gate.state}", not "ready". Per the pickup protocol, run assess-work-item first and have a human move the item to ready on the thread. This workflow does not skip that gate.`,
    item: gate.url,
  }
}
log(`Delivering "${gate.title}"`)

phase('Plan')
const PLAN_SCHEMA = {
  type: 'object',
  required: ['branch', 'ownedPaths', 'verificationCommands', 'layers'],
  properties: {
    branch: { type: 'string' },
    ownedPaths: { type: 'array', items: { type: 'string' } },
    verificationCommands: { type: 'array', items: { type: 'string' } },
    layers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'concern', 'paths'],
        properties: { name: { type: 'string' }, concern: { type: 'string' }, paths: { type: 'array', items: { type: 'string' } } },
      },
    },
    specTs: { type: 'string' },
  },
}
const plan = await agent(
  `Plan the delivery of this work item per its contract (skills/developer/slice/WORK-ITEM-CONTRACT.md) and the sdlc skill's METHOD.md. Read the contract sections in the body below. Produce: a branch name (kebab-case, prefixed item-${item}-), the exact owned paths, the exact verification commands from the contract, a short SPEC-TS snapshot, and a LAYER PLAN per skills/developer/deliver/STACKING.md — read that file first. One layer if the change is a single concern small enough to hold in a reviewer's head; otherwise 2-4 dependency-ordered layers (foundations lowest), each naming one concern and the paths it touches. Layers must partition the owned paths, never overlap.\n\nWork item "${gate.title}":\n\n${gate.body}`,
  { label: 'plan', effort: 'high', schema: PLAN_SCHEMA },
)
if (!plan) return { status: 'BLOCKED', reason: 'Planning agent returned no result.' }
log(`Plan: branch ${plan.branch}, ${plan.layers.length} layer(s)`)

phase('Implement')
// Single writer per checkout: exactly one implementing agent, in its own worktree.
const implemented = await agent(
  `You are the sole writer for work item ${item} ("${gate.title}"). Create branch ${plan.branch} from ${stackBase}. Implement the contract below, touching only these owned paths: ${plan.ownedPaths.join(', ')}. Write or update the tests the acceptance criteria require. Make one commit per layer of this plan, in this order, so the history is stackable later: ${plan.layers.map((layer) => `[${layer.name}] ${layer.concern}`).join(' -> ')}. Commit messages: "${plan.branch}: <layer name> - <what changed>". Do not push. Do not open a PR. Do not run the full verification suite — a separate verifier does that.\n\nContract:\n${gate.body}`,
  { label: 'implement', isolation: 'worktree' },
)
if (!implemented) return { status: 'BLOCKED', reason: 'Implementation agent returned no result.' }

phase('Verify')
const VERIFY_SCHEMA = {
  type: 'object',
  required: ['pass', 'failures'],
  properties: { pass: { type: 'boolean' }, failures: { type: 'array', items: { type: 'string' } } },
}
let verdict = null
let previousFailures = ''
for (let round = 1; round <= 3; round++) {
  verdict = await agent(
    `You are the verifier for work item ${item}, independent of the implementer. On branch ${plan.branch}, run exactly these verification commands from the contract and report each result: ${plan.verificationCommands.join(' ; ')}. Also confirm the diff against ${stackBase} stays inside the owned paths (${plan.ownedPaths.join(', ')}) and that each acceptance criterion in the contract has a passing check. Do not fix anything. Contract:\n${gate.body}`,
    { label: `verify:round-${round}`, effort: 'high', schema: VERIFY_SCHEMA },
  )
  if (!verdict) return { status: 'BLOCKED', reason: `Verifier returned no result in round ${round}.` }
  if (verdict.pass) break
  const failures = verdict.failures.join('\n')
  if (failures === previousFailures) {
    return { status: 'NO_PROGRESS', reason: 'Two verification rounds failed identically; stopping per the no-progress rule.', failures: verdict.failures }
  }
  previousFailures = failures
  log(`Verification round ${round} failed (${verdict.failures.length} failure(s)); one bounded fix pass`)
  const fixed = await agent(
    `You are still the sole writer on branch ${plan.branch}. Fix exactly these verification failures, smallest change first, staying inside the owned paths. Keep the per-layer commit structure (amend or add commits under the right layer). Do not expand scope.\n\nFailures:\n${failures}`,
    { label: `fix:round-${round}`, isolation: 'worktree' },
  )
  if (!fixed) return { status: 'BLOCKED', reason: `Fix agent returned no result in round ${round}.` }
}
if (!verdict?.pass) {
  return { status: 'BLOCKED', reason: 'Verification did not pass within 3 rounds.', failures: verdict?.failures ?? [] }
}
log('Verification passed')

phase('Raise')
const RAISE_SCHEMA = {
  type: 'object',
  required: ['mode', 'prs'],
  properties: { mode: { type: 'string', enum: ['single', 'stack'] }, prs: { type: 'array', items: { type: 'string' } } },
}
const stackInstructions = plan.layers.length > 1
  ? `This is a ${plan.layers.length}-layer stack. Use the gh stack CLI extension: \`gh stack init\` with base ${stackBase}, \`gh stack add\` one branch per layer in dependency order (foundations first, matching the per-layer commits), \`gh stack push\`, then \`gh stack submit\` to open the linked PRs. If the gh-stack extension is not installed, try \`gh extension install github/gh-stack\`; if that also fails, fall back to manual stacking: one branch per layer, each PR's base set to the branch below it, the bottom PR based on ${stackBase}, and a stack map ("layer N of M, depends on #<pr>") in every PR body. Each PR covers exactly one layer's concern — small enough to hold in a reviewer's head.`
  : `This is a single-concern change: push ${plan.branch} and open one PR against ${stackBase} with \`gh pr create\`.`
const raised = await agent(
  `Raise the delivery of work item ${item} ("${gate.title}"). ${stackInstructions} Every PR body links the work item (${gate.url ?? `#${item}`}), states its layer's concern, and lists the verification commands that passed. After the PR(s) exist: ${tracker === 'linear' ? `update Linear issue ${item} to its in-progress state and attach the PR link(s) via the Linear MCP tools.` : `run \`gh issue edit ${item}${repoFlag} --add-label in-progress --remove-label ready\` and comment the PR link(s) on the issue.`} Return mode ("single" or "stack") and the list of PR URLs in base-to-tip order.`,
  { label: 'raise', schema: RAISE_SCHEMA },
)
if (!raised) return { status: 'BLOCKED', reason: 'Raise agent returned no result; the branch exists locally but no PR was opened.' }

return {
  status: 'DELIVERED',
  item: gate.url ?? String(item),
  branch: plan.branch,
  mode: raised.mode,
  prs: raised.prs,
  layers: plan.layers.map((layer) => `${layer.name}: ${layer.concern}`),
  verification: plan.verificationCommands,
}
