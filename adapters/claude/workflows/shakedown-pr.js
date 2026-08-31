export const meta = {
  name: 'shakedown-pr',
  description: 'T-Rex-style PR shakedown: build, test, and execute the change in an isolated sandbox, review it through three verified lenses, and submit a real PR review — blocking on a red build',
  whenToUse: 'Run on any open PR before merge. Stack-aware: a PR that is one layer of a gh stack is evaluated against its stack base, and existing check runs (CI, GitHub Code Quality) are consumed, not duplicated.',
  phases: [
    { title: 'Recon', detail: 'PR metadata, stack position, and existing check runs including GitHub Code Quality' },
    { title: 'Sandbox', detail: 'isolated worktree: build, run tests, execute the change' },
    { title: 'Review', detail: 'three read-only lenses over the diff in parallel' },
    { title: 'Verify', detail: 'adversarially refute each finding before it can block' },
    { title: 'Verdict', detail: 'submit the PR review: REQUEST_CHANGES on red, COMMENT otherwise' },
  ],
}

// args: { pr: <number>, repo?: 'owner/name', approveOnGreen?: false }
// Doctrine (skills/developer/shakedown/SKILL.md): a failing build or test suite gets a
// blocking review, never an approval. Approval is opt-in via args, defaulting to a
// non-blocking COMMENT review so a human keeps the final approve.
const pr = args?.pr
if (pr === undefined || pr === null) {
  return { status: 'BLOCKED', reason: 'args.pr is required: the pull request number to shake down.' }
}
const repoFlag = args?.repo ? ` --repo ${args.repo}` : ''
const approveOnGreen = args?.approveOnGreen === true

phase('Recon')
const RECON_SCHEMA = {
  type: 'object',
  required: ['headRef', 'baseRef', 'title', 'stackPosition', 'existingChecks'],
  properties: {
    headRef: { type: 'string' },
    baseRef: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
    stackPosition: { type: 'string' },
    existingChecks: { type: 'array', items: { type: 'object', required: ['name', 'conclusion'], properties: { name: { type: 'string' }, conclusion: { type: 'string' } } } },
    testCommand: { type: 'string' },
    buildCommand: { type: 'string' },
  },
}
const recon = await agent(
  `Gather shakedown context for PR ${pr}. Run \`gh pr view ${pr}${repoFlag} --json title,headRefName,baseRefName,url,body\` and \`gh pr checks ${pr}${repoFlag}\` (also \`gh api\` the check runs if needed). Report: headRef, baseRef, title, url. stackPosition: if the base branch is another feature branch or the body carries a stack map ("layer N of M"), describe the position ("layer 2 of 4, base = <branch>"); otherwise "standalone". existingChecks: every completed check run with its conclusion — include GitHub Code Quality if present (it reports on its own workflow path, dynamic/github-code-quality/codeql, under the github-code-quality actor, separate from code scanning). Finally, read the repository's manifest/CI config and report the build and test commands this project actually uses.`,
  { label: `recon:${pr}`, schema: RECON_SCHEMA },
)
if (!recon) return { status: 'BLOCKED', reason: `Could not gather context for PR ${pr}.` }
log(`PR "${recon.title}" — ${recon.stackPosition}; ${recon.existingChecks.length} existing check(s)`)

phase('Sandbox')
const SANDBOX_SCHEMA = {
  type: 'object',
  required: ['build', 'tests', 'executed'],
  properties: {
    build: { type: 'string', enum: ['pass', 'fail', 'skipped'] },
    tests: { type: 'string', enum: ['pass', 'fail', 'skipped'] },
    executed: { type: 'string', enum: ['pass', 'fail', 'skipped'] },
    log: { type: 'string' },
  },
}
const sandbox = await agent(
  `Shakedown PR ${pr} in an isolated sandbox per skills/developer/shakedown/SANDBOX.md: check out ${recon.headRef} (use \`gh pr checkout ${pr}${repoFlag}\` inside this worktree). Never use production credentials or secrets. Then: 1) build with ${recon.buildCommand || 'the project build command you find in its manifest'}; 2) run the tests with ${recon.testCommand || 'the project test command'}; 3) actually execute the changed behavior — run the binary, hit the endpoint, invoke the changed function — and confirm it does what the PR claims. Evaluate against the PR's own base (${recon.baseRef}), which for a stacked PR is its stack base, so only this layer's changes are under test. Report pass/fail/skipped for each of build, tests, executed, with a short log excerpt of any failure.`,
  { label: 'sandbox', isolation: 'worktree', schema: SANDBOX_SCHEMA },
)
if (!sandbox) return { status: 'BLOCKED', reason: 'Sandbox agent returned no result.' }
const red = sandbox.build === 'fail' || sandbox.tests === 'fail' || sandbox.executed === 'fail'
log(`Sandbox: build=${sandbox.build} tests=${sandbox.tests} executed=${sandbox.executed}`)

phase('Review')
const FINDINGS_SCHEMA = {
  type: 'object',
  required: ['findings'],
  properties: {
    findings: { type: 'array', items: { type: 'object', required: ['summary', 'severity', 'file'], properties: { summary: { type: 'string' }, severity: { type: 'string', enum: ['blocking', 'advisory'] }, file: { type: 'string' }, evidence: { type: 'string' } } } },
  },
}
const LENSES = [
  { key: 'correctness', prompt: 'Review the diff strictly for reachable correctness defects: data and control flow, error paths, concurrency, compatibility, regressions. Prove each finding from the code; a hypothesis without a trigger is not a finding.' },
  { key: 'security', prompt: 'Review the diff strictly for security: injection, authorization gaps, secret handling, unsafe deserialization, supply-chain changes. Passive review only. Confirm reachability before reporting.' },
  { key: 'tests', prompt: `Review the diff strictly for test adequacy: does every changed behavior have a test that would fail without the change? Check it against the work item's FR/NFR traceability matrix and the coverage floors in skills/developer/shakedown/COVERAGE.md (85-90% on business-capability code, 75-80% on integration code, measured on this diff) — a criterion with no row, or a row with no passing test, is a finding. Cross-reference the existing check runs rather than re-running static analysis the repository already gets — these checks already ran: ${recon.existingChecks.map((check) => `${check.name}=${check.conclusion}`).join(', ') || 'none'}. Flag a gap only where no existing check covers it. Where the PR body carries a grit gate audit (skills/developer/grit/AUDIT.md), spot-check the claimed met gates against the diff — rerun or reason through a sample of their CHECK commands against the EXPECT tokens — and flag as a finding any audit whose unmet or abandoned gates are missing from the table or left unexplained.` },
]
const reviews = await pipeline(
  LENSES,
  (lens) => agent(`${lens.prompt}\n\nReview PR ${pr} ("${recon.title}") against base ${recon.baseRef}: run \`gh pr diff ${pr}${repoFlag}\` and read the changed files in context. Read-only.`, { label: `review:${lens.key}`, schema: FINDINGS_SCHEMA }),
  (review) => review ? parallel(review.findings.map((finding) => () =>
    agent(`Adversarially try to refute this PR review finding. Check the evidence against the actual diff and codebase. Default to keep=false when the trigger is not reachable from this PR's changes.\n\nFinding (${finding.severity}, ${finding.file}): ${finding.summary}\nEvidence: ${finding.evidence ?? 'none supplied'}`, {
      label: `refute:${finding.file}`,
      schema: { type: 'object', required: ['keep'], properties: { keep: { type: 'boolean' } } },
    }).then((verdict) => (verdict?.keep ? finding : null))
  )) : [],
)

phase('Verify')
const confirmed = reviews.flat().filter(Boolean)
const blocking = confirmed.filter((finding) => finding.severity === 'blocking')
log(`${confirmed.length} confirmed finding(s), ${blocking.length} blocking`)

phase('Verdict')
const mustBlock = red || blocking.length > 0
const reviewEvent = mustBlock ? 'REQUEST_CHANGES' : (approveOnGreen ? 'APPROVE' : 'COMMENT')
const reviewBody = [
  '## Shakedown review (shakedown-pr)',
  '',
  `Sandbox: build **${sandbox.build}**, tests **${sandbox.tests}**, executed **${sandbox.executed}**${recon.stackPosition !== 'standalone' ? ` — evaluated as ${recon.stackPosition}` : ''}.`,
  red ? `\nThe sandbox run is red. Per shakedown doctrine this review is blocking.\n\n${sandbox.log ?? ''}` : '',
  confirmed.length ? '\n### Confirmed findings' : '\nNo findings survived adversarial verification.',
  ...confirmed.map((finding) => `- **${finding.severity}** \`${finding.file}\`: ${finding.summary}`),
  '',
  `Existing checks consumed (not re-run): ${recon.existingChecks.map((check) => `${check.name}=${check.conclusion}`).join(', ') || 'none'}.`,
].join('\n')
const posted = await agent(
  `Submit a review on PR ${pr} with \`gh pr review ${pr}${repoFlag} ${reviewEvent === 'REQUEST_CHANGES' ? '--request-changes' : reviewEvent === 'APPROVE' ? '--approve' : '--comment'} --body-file <(cat <<'SHAKEDOWN_EOF'\n${reviewBody}\nSHAKEDOWN_EOF\n)\` (or pass the body via a temp file if process substitution is unavailable). Confirm the review URL.`,
  { label: `post:${reviewEvent}` },
)

return {
  status: mustBlock ? 'CHANGES_REQUESTED' : 'PASSED',
  pr: recon.url ?? String(pr),
  review: reviewEvent,
  sandbox,
  blocking: blocking.map((finding) => finding.summary),
  advisory: confirmed.filter((finding) => finding.severity === 'advisory').map((finding) => finding.summary),
  posted: posted ?? 'review post returned no confirmation',
}
