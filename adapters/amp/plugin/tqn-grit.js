// Amp plugin that enforces a grit gate ledger at the end of every agent turn.
//
// Amp has no stop hook. Its plugin API fires `agent.end` when a turn finishes,
// and a handler may answer `{ action: 'continue', userMessage }` to start a new
// turn. This plugin uses that to do what the Claude Code and Codex stop hooks
// do: while GATES.md or .grit/<scope>/GATES.md still has unmet gates, the turn
// does not end quietly; the agent receives the unmet list and keeps working.
//
// The plugin holds no ledger logic of its own. It locates the implementation
// vendored at skills/core/grit/scripts/stop-hook.mjs and runs it with the same
// stdin payload the other two hosts send ({ cwd, session_id }). One
// implementation, three hosts. The six-block release valve and the progress
// hash live inside that script, so a session that cannot move a gate is
// released there, not here.
//
// The file is plain ES module JavaScript rather than TypeScript so that the
// repository's Node 20 test harness can import it directly and drive it with a
// stand-in PluginAPI. Amp loads `.js` plugins the same way it loads `.ts`.
// Zero dependencies.

import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const description =
	'Enforces the grit gate ledger at the end of each turn: while GATES.md or .grit/<scope>/GATES.md has unmet gates, the turn continues with the unmet list. Adds Grit commands for gate status and check approval. Rejects edits to the grit approval store and hook state.'

const HOOK_TIMEOUT_MS = 30_000
const COMMAND_TIMEOUT_MS = 10 * 60_000
const NOTIFY_LIMIT = 1800

const here = dirname(fileURLToPath(import.meta.url))

// --- locating the vendored skill ---------------------------------------------

function configHome(env) {
	return env.XDG_CONFIG_HOME || join(homedir(), '.config')
}

// Amp caches hosted personal and workspace plugins under
// ~/.cache/amp/global-plugins/<host>/<scope>/<name>@<hash>/. This scans the
// sibling `global-skills` tree with the same shape in case a hosted `grit`
// skill is cached there. The layout is inferred from the plugin cache, not
// documented; GRIT_SKILL_DIR remains the explicit override.
function hostedSkillCacheCandidates(env) {
	const base = join(env.XDG_CACHE_HOME || join(homedir(), '.cache'), 'amp', 'global-skills')
	const found = []
	const walk = (dir, depth) => {
		let entries
		try {
			entries = readdirSync(dir)
		} catch {
			return
		}
		for (const entry of entries) {
			const full = join(dir, entry)
			let info
			try {
				info = statSync(full)
			} catch {
				continue
			}
			if (!info.isDirectory()) continue
			if (/^grit(@[0-9a-f]+)?$/.test(entry)) found.push(full)
			else if (depth > 0) walk(full, depth - 1)
		}
	}
	walk(base, 3)
	return found
}

/**
 * Every directory that may hold the grit skill, most specific first.
 * @param {string | null} root workspace root, or null when Amp has none open
 * @param {NodeJS.ProcessEnv} [env]
 */
export function candidateSkillDirs(root, env = process.env) {
	const candidates = []
	if (env.GRIT_SKILL_DIR) candidates.push(env.GRIT_SKILL_DIR)
	if (root) {
		// This repository's own layout, then the roots link-amp-skills.sh and the
		// per-tool installers populate inside a consuming project.
		candidates.push(join(root, 'skills', 'core', 'grit'))
		for (const skillsRoot of ['.agents/skills', '.claude/skills', '.codex/skills']) {
			candidates.push(join(root, ...skillsRoot.split('/'), 'grit'))
		}
	}
	// Repo layout relative to this file: adapters/amp/plugin/ -> skills/core/grit/
	candidates.push(join(here, '..', '..', '..', 'skills', 'core', 'grit'))
	// `amp skill add --global` and the other tools' user-level roots.
	candidates.push(join(configHome(env), 'agents', 'skills', 'grit'))
	candidates.push(join(homedir(), '.claude', 'skills', 'grit'))
	candidates.push(join(homedir(), '.codex', 'skills', 'grit'))
	candidates.push(...hostedSkillCacheCandidates(env))
	return candidates
}

/**
 * First candidate directory that carries both grit scripts, or null.
 * @param {string | null} root
 * @param {NodeJS.ProcessEnv} [env]
 */
export function findSkillDir(root, env = process.env) {
	for (const dir of candidateSkillDirs(root, env)) {
		if (existsSync(join(dir, 'scripts', 'stop-hook.mjs')) && existsSync(join(dir, 'scripts', 'gate-check.mjs'))) {
			return dir
		}
	}
	return null
}

// --- workspace and ledger discovery ------------------------------------------

/** @param {import('@ampcode/plugin').PluginAPI} amp */
export function workspaceRootPath(amp) {
	const uri = amp.system?.workspaceRoot
	if (!uri) return null
	try {
		return amp.helpers.filePathFromURI(uri)
	} catch {
		try {
			return fileURLToPath(uri.toString())
		} catch {
			return null
		}
	}
}

/**
 * True when the workspace has anything the stop hook would read. This is a
 * cheap pre-check so a project that never adopted a ledger does not spawn a
 * process at the end of every turn.
 * @param {string} root
 */
export function ledgerPresent(root) {
	return existsSync(join(root, 'GATES.md')) || existsSync(join(root, 'gates')) || existsSync(join(root, '.grit'))
}

// --- running the vendored scripts --------------------------------------------

function runNode(args, options) {
	const preferred = options.env?.GRIT_NODE || 'node'
	let result = spawnSync(preferred, args, options)
	// Plugins run under Bun. When no `node` is on PATH, Bun itself runs the
	// zero-dependency scripts; process.execPath is the running Bun binary.
	if (result.error && result.error.code === 'ENOENT' && preferred !== process.execPath) {
		result = spawnSync(process.execPath, args, options)
	}
	return result
}

/**
 * Run the vendored stop hook once and translate its stdout into a decision.
 * Never throws: every failure path is an allow with a note, so a broken hook
 * cannot trap a session.
 * @param {{ skillDir: string, root: string, sessionId: string, env?: NodeJS.ProcessEnv }} options
 * @returns {{ decision: 'block', reason: string } | { decision: 'allow', note?: string }}
 */
export function runStopHook({ skillDir, root, sessionId, env = process.env }) {
	const hook = join(skillDir, 'scripts', 'stop-hook.mjs')
	const payload = JSON.stringify({ hook_event_name: 'Stop', cwd: root, session_id: sessionId })
	const result = runNode([hook], {
		cwd: root,
		env,
		encoding: 'utf8',
		input: payload,
		timeout: HOOK_TIMEOUT_MS,
	})
	if (result.error) {
		return { decision: 'allow', note: 'grit: could not run ' + hook + ': ' + result.error.message + '; not enforcing.' }
	}
	if (result.status !== 0) {
		const detail = String(result.stderr || '').trim().slice(-300) || 'no diagnostic on stderr'
		return { decision: 'allow', note: 'grit: stop hook exited ' + result.status + '; not enforcing. Detail: ' + detail }
	}
	const text = String(result.stdout || '').trim()
	if (!text) return { decision: 'allow' }
	let parsed
	try {
		parsed = JSON.parse(text)
	} catch {
		return { decision: 'allow', note: 'grit: stop hook printed something other than JSON; not enforcing.' }
	}
	if (parsed && parsed.decision === 'block' && typeof parsed.reason === 'string' && parsed.reason.trim()) {
		return { decision: 'block', reason: parsed.reason.trim() }
	}
	if (parsed && typeof parsed.systemMessage === 'string') return { decision: 'allow', note: parsed.systemMessage }
	return { decision: 'allow' }
}

/**
 * The message that starts the next turn. It names its origin so the agent and
 * the reader can tell a plugin continuation from a human prompt.
 * @param {string} reason
 */
export function continuationMessage(reason) {
	return (
		'[tqn-grit plugin] The turn ended while the gate ledger still has open items. ' +
		reason +
		' Do the work the ledger names, run gate-check.mjs, and end the turn again. This continuation stops on its own after six turns without gate progress.'
	)
}

// --- protected paths ---------------------------------------------------------

function isInside(parent, child) {
	const p = resolve(parent)
	const c = resolve(child)
	return c === p || c.startsWith(p.endsWith(sep) ? p : p + sep)
}

/**
 * True for the two kinds of file an agent must not edit through a tool: the
 * approval store, which records a human's consent to run each CHECK, and the
 * hook state, which carries the loop guard. Editing either would let the agent
 * grant itself execution rights or reset its own release valve.
 * @param {string} filePath
 * @param {{ root?: string | null, env?: NodeJS.ProcessEnv }} [options]
 */
export function isProtectedPath(filePath, { root = null, env = process.env } = {}) {
	const approvalDir = resolve(env.GRIT_APPROVAL_DIR || join(homedir(), '.grit', 'approved'))
	if (isInside(approvalDir, filePath)) return true
	const name = basename(filePath)
	if (name === '.grit-hook-state.json') return true
	if (name === 'hook-state.json' && resolve(filePath).split(sep).includes('.grit')) return true
	if (root && name === 'hook-state.json' && isInside(join(root, '.grit'), filePath)) return true
	return false
}

function pathFromUri(amp, uri) {
	try {
		return amp.helpers.filePathFromURI(uri)
	} catch {
		try {
			return fileURLToPath(uri.toString())
		} catch {
			return null
		}
	}
}

// --- command output ----------------------------------------------------------

function clip(text, limit = NOTIFY_LIMIT) {
	const s = String(text || '').trim()
	return s.length > limit ? s.slice(0, limit) + '\n… (' + (s.length - limit) + ' more characters)' : s
}

function runGateCheck(skillDir, root, args, env = process.env) {
	const result = runNode([join(skillDir, 'scripts', 'gate-check.mjs'), '--root', root, ...args], {
		cwd: root,
		env,
		encoding: 'utf8',
		timeout: COMMAND_TIMEOUT_MS,
	})
	const out = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
	if (result.error) return { exit: null, text: 'could not run gate-check.mjs: ' + result.error.message }
	return { exit: result.status, text: out || '(no output)' }
}

/** Lines gate-check prints for oracles that still need a human's approval. */
export function pendingApprovalBlocks(text) {
	const lines = String(text).split('\n')
	const blocks = []
	let current = null
	for (const line of lines) {
		if (line.startsWith('APPROVAL REQUIRED ')) {
			current = [line]
			blocks.push(current)
		} else if (current && /^\s{4}\S/.test(line)) {
			current.push(line)
		} else {
			current = null
		}
	}
	return blocks.map((b) => b.join('\n'))
}

// --- plugin entry ------------------------------------------------------------

/** @param {import('@ampcode/plugin').PluginAPI} amp */
export default function (amp) {
	const root = workspaceRootPath(amp)

	amp.on('agent.end', async (event, ctx) => {
		if (event.status !== 'done') return
		if (!root || !ledgerPresent(root)) return
		const skillDir = findSkillDir(root)
		if (!skillDir) {
			ctx.logger.log('grit: ledger present but the grit skill was not found; set GRIT_SKILL_DIR or install grit. Not enforcing.')
			return
		}
		const outcome = runStopHook({ skillDir, root, sessionId: event.thread.id })
		if (outcome.decision === 'block') {
			ctx.logger.log('grit: blocking turn end: ' + outcome.reason)
			return { action: 'continue', userMessage: continuationMessage(outcome.reason) }
		}
		if (outcome.note) ctx.logger.log(outcome.note)
	})

	amp.on('tool.call', async (event) => {
		let files = null
		try {
			files = amp.helpers.filesModifiedByToolCall(event)
		} catch {
			files = null
		}
		for (const uri of files || []) {
			const filePath = pathFromUri(amp, uri)
			if (filePath && isProtectedPath(filePath, { root })) {
				return {
					action: 'reject-and-continue',
					message:
						'grit: ' +
						filePath +
						' is a grit approval or hook-state file. Agents do not edit these; a human approves checks with the "Grit: Approve pending checks" command or gate-check.mjs --approve.',
				}
			}
		}
		return { action: 'allow' }
	})

	amp.registerCommand(
		'grit-status',
		{
			title: 'Gate status',
			category: 'Grit',
			description: 'Report met, unmet, and abandoned gates without running anything (gate-check.mjs --status)',
		},
		async (ctx) => {
			if (!root) return ctx.ui.notify('grit: no workspace is open.')
			const skillDir = findSkillDir(root)
			if (!skillDir) return ctx.ui.notify('grit: the grit skill was not found. Set GRIT_SKILL_DIR or install grit.')
			const { text } = runGateCheck(skillDir, root, ['--status'])
			await ctx.ui.notify(clip(text))
		},
	)

	amp.registerCommand(
		'grit-approve',
		{
			title: 'Approve pending checks',
			category: 'Grit',
			description: 'Show each CHECK that still needs approval, then approve and run them after you confirm',
		},
		async (ctx) => {
			if (!root) return ctx.ui.notify('grit: no workspace is open.')
			const skillDir = findSkillDir(root)
			if (!skillDir) return ctx.ui.notify('grit: the grit skill was not found. Set GRIT_SKILL_DIR or install grit.')
			// The default run mode executes checks a human already approved and
			// prints the oracles that still need approval, without running those.
			const first = runGateCheck(skillDir, root, [])
			const pending = pendingApprovalBlocks(first.text)
			if (!pending.length) return ctx.ui.notify(clip(first.text))
			const ok = await ctx.ui.confirm({
				title: 'Approve ' + pending.length + ' grit check' + (pending.length === 1 ? '' : 's') + '?',
				message:
					'Approval records your consent to run each exact CHECK below, keyed to its CWD, shell, and PATH. Read every command before confirming.\n\n```\n' +
					clip(pending.join('\n\n'), 4000) +
					'\n```',
				confirmButtonText: 'Approve and run',
			})
			if (!ok) return ctx.ui.notify('grit: nothing approved.')
			const second = runGateCheck(skillDir, root, ['--approve'])
			await ctx.ui.notify(clip(second.text))
		},
	)
}
