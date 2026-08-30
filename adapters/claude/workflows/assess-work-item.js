export const meta = {
  name: 'assess-work-item',
  description: 'Pickup-protocol assessment: critique a raised work item from three perspectives, adversarially verify the findings, and post one consolidated critique to the tracker',
  whenToUse: 'Run on a work item labeled `raised` before any implementation. The workflow posts questions and stops; a human answers on the thread, then deliver-work-item runs once the item reaches `ready`.',
  phases: [
    { title: 'Fetch', detail: 'read the work item and its contract from the tracker' },
    { title: 'Critique', detail: 'four perspective-diverse critics, pipelined' },
    { title: 'Verify', detail: 'adversarially refute each lens\'s findings as that lens lands' },
    { title: 'Post', detail: 'one consolidated critique comment plus the `critiqued` label' },
  ],
}

// args: { item: <issue number or Linear id>, tracker?: 'github' | 'linear', repo?: 'owner/name' }
// The pickup protocol (skills/developer/slice/WORK-ITEM-CONTRACT.md) requires critique
// before implementation: raised -> critiqued -> clarified -> ready -> in-progress -> done.
const item = args?.item
if (item === undefined || item === null) {
  return { status: 'BLOCKED', reason: 'args.item is required: an issue number (GitHub) or issue id (Linear).' }
}
const tracker = args?.tracker ?? 'github'
const repoFlag = args?.repo ? ` --repo ${args.repo}` : ''

const ITEM_SCHEMA = {
  type: 'object',
  required: ['title', 'body', 'labels', 'url'],
  properties: {
    title: { type: 'string' },
    body: { type: 'string' },
    labels: { type: 'array', items: { type: 'string' } },
    url: { type: 'string' },
    parent: { type: 'string' },
  },
}

const FINDINGS_SCHEMA = {
  type: 'object',
  required: ['findings', 'questions'],
  properties: {
    findings: { type: 'array', items: { type: 'object', required: ['summary', 'severity'], properties: { summary: { type: 'string' }, severity: { type: 'string', enum: ['blocking', 'advisory'] }, evidence: { type: 'string' } } } },
    questions: { type: 'array', items: { type: 'string' } },
  },
}

phase('Fetch')
const fetchPrompt = tracker === 'linear'
  ? `Read Linear issue ${item} using the Linear MCP tools (load them with ToolSearch if deferred). Return its title, full body, label/state names, URL, and parent issue identifier if any. If the Linear MCP server is unavailable, return title "UNAVAILABLE" and put the reason in body.`
  : `Run \`gh issue view ${item}${repoFlag} --json title,body,labels,url\` and return the work item: title, full body, label names, URL. Also note the parent (epic/feature) link if the body names one.`
const workItem = await agent(fetchPrompt, { label: `fetch:${item}`, schema: ITEM_SCHEMA })
if (!workItem || workItem.title === 'UNAVAILABLE') {
  return { status: 'BLOCKED', reason: `Could not read work item ${item} from ${tracker}: ${workItem?.body ?? 'agent returned no result'}` }
}
log(`Assessing "${workItem.title}" (${workItem.url})`)

phase('Critique')
const LENSES = [
  { key: 'contract', prompt: 'Check this work item against every section of skills/developer/slice/WORK-ITEM-CONTRACT.md (read that file first). A missing or vague Goal, Scope and file ownership, Acceptance criteria, Verification commands, or Governance section (where the PRD tier requires one) is a blocking finding. Machine-checkable acceptance criteria only; "looks right" does not count. A ready item\'s acceptance criteria must also be gate-able per skills/developer/grit/LEDGER.md: each criterion expressible as a runnable CHECK command with an EXPECT success token, and together the criteria must cover the five dimensions (completeness, accuracy, value, efficiency, thoroughness) or explicitly name which do not apply. A criterion that cannot become a gate is a blocking finding.' },
  { key: 'alignment', prompt: 'Check this work item against its parent PRD and epic. Does the goal trace to a recorded business value? Does the scope match what was approved at Gate G2? Does anything here exceed or contradict the signed PRD? An untraceable or contradicting item is a blocking finding.' },
  { key: 'reality', prompt: 'Check this work item against the actual codebase. Do the file paths it claims to own exist and match the described boundaries? Do the verification commands run in this repository? Would the change conflict with in-flight work or existing contracts? Also check the repository against skills/developer/deliver/REPO-SETUP.md where that file is installed: pickup-protocol labels, gh stack tooling, Code Quality, shakedown workflow — a missing prerequisite is an advisory finding naming the setup step. Ground every finding in a file you actually inspected.' },
  { key: 'tradeoffs', prompt: 'Per skills/developer/DDDD.md\'s Design phase: identify any design tradeoff this work item\'s described approach makes but does not state — maintainability against delivery speed, reliability against complexity, an acceptable amount of technical debt against a tighter boundary. Report each as an advisory finding naming the tradeoff explicitly, so the user sees it before implementation starts rather than discovering it in the diff.' },
]
const VERDICT_SCHEMA = {
  type: 'object',
  required: ['keep'],
  properties: { keep: { type: 'boolean' }, reason: { type: 'string' } },
}
// Each lens flows straight into its own verification: no barrier, so a slow lens
// never holds up refutation of the findings a fast one has already produced.
// Stages carry an explicit phase, since phase() is global state a pipeline races on.
const assessed = await pipeline(
  LENSES,
  (lens) => agent(`${lens.prompt}\n\nWork item "${workItem.title}" (${workItem.url}):\n\n${workItem.body}`, {
    label: `critique:${lens.key}`,
    phase: 'Critique',
    schema: FINDINGS_SCHEMA,
  }),
  (critique, lens) => critique
    ? parallel(critique.findings.map((finding) => () =>
        agent(`Adversarially try to refute this assessment finding about work item "${workItem.title}". Check its evidence against the repository and the work-item contract. Default to keep=false if the evidence does not hold up.\n\nFinding (${finding.severity}): ${finding.summary}\nEvidence: ${finding.evidence ?? 'none supplied'}`, {
          label: `verify:${finding.summary.slice(0, 40)}`,
          phase: 'Verify',
          schema: VERDICT_SCHEMA,
        }).then((verdict) => (verdict?.keep ? { ...finding, lens: lens.key } : null))
      )).then((verified) => ({
        lens: lens.key,
        findings: verified.filter(Boolean),
        questions: critique.questions,
        proposed: critique.findings.length,
      }))
    : null,
)

const landed = assessed.filter(Boolean)
const confirmed = landed.flatMap((result) => result.findings)
const proposedQuestions = landed.flatMap((result) => result.questions)
const proposedCount = landed.reduce((total, result) => total + result.proposed, 0)
if (landed.length < LENSES.length) log(`${LENSES.length - landed.length} lens(es) returned no result`)
log(`${confirmed.length} of ${proposedCount} finding(s) survived refutation, ${proposedQuestions.length} question(s)`)
const blocking = confirmed.filter((finding) => finding.severity === 'blocking')
const tradeoffFindings = confirmed.filter((finding) => finding.lens === 'tradeoffs')
const otherFindings = confirmed.filter((finding) => finding.lens !== 'tradeoffs')

phase('Post')
const postPrompt = tracker === 'linear'
  ? `Post the following critique as a comment on Linear issue ${item} using the Linear MCP tools, then set the issue's pickup-protocol state to critiqued (label or workflow state per the project's convention). Comment body:\n`
  : `Post the following critique as a comment on GitHub issue ${item} with \`gh issue comment${repoFlag}\`, then run \`gh issue edit ${item}${repoFlag} --add-label critiqued --remove-label raised\` (create the labels if missing). Comment body:\n`
const commentBody = [
  '## Pickup critique (assess-work-item)',
  '',
  blocking.length ? `**${blocking.length} blocking finding(s).** This item stays at \`critiqued\` until they are resolved on this thread.` : 'No blocking findings. Answer the questions below (if any), then move the item to `ready`.',
  '',
  ...otherFindings.map((finding) => `- **${finding.severity}**: ${finding.summary}`),
  '',
  tradeoffFindings.length ? '### Design tradeoffs' : '',
  ...tradeoffFindings.map((finding) => `- ${finding.summary}`),
  '',
  proposedQuestions.length ? '### Questions' : '',
  ...proposedQuestions.map((question) => `- ${question}`),
  '',
  'Per the pickup protocol, implementation starts only at `ready`.',
].join('\n')
const posted = await agent(`${postPrompt}\n${commentBody}`, { label: 'post-critique' })

return {
  status: blocking.length ? 'NEEDS_INPUT' : 'READY_TO_ADVANCE',
  item: workItem.url,
  blocking: blocking.map((finding) => finding.summary),
  advisory: otherFindings.filter((finding) => finding.severity === 'advisory').map((finding) => finding.summary),
  tradeoffs: tradeoffFindings.map((finding) => finding.summary),
  questions: proposedQuestions,
  posted: posted ?? 'post step returned no confirmation',
}
