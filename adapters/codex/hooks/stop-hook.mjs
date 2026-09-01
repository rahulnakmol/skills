#!/usr/bin/env node
// Adapted from unlazy (https://github.com/Leonxlnx/unlazy).
// Copyright (c) 2026 Leonxlnx. MIT License — see the NOTICE file at the repository root.
// Adapted for this repository: state directory .grit, environment prefix GRIT_,
// approval store ~/.grit/approved.
// Thin Codex Stop hook launcher. Locates the vendored grit stop-hook and
// delegates to it, so there is one implementation, not a copied second copy.
//
// Codex's Stop hook contract is wire-compatible with the Claude Code one the
// delegate already speaks: a hook that exits 0 and writes
// {"decision":"block","reason":"..."} to stdout blocks session completion, and
// the reason becomes the continuation prompt. Verified against the generated
// schema codex-rs/hooks/schema/generated/stop.command.output.schema.json and
// the handler in codex-rs/hooks/src/events/stop.rs in openai/codex.
//
// One difference is load-bearing and is why this launcher captures the
// delegate's output instead of inheriting it. Codex only parses stdout when the
// hook exits 0; a non-zero exit is recorded as a failed hook, and an exit of 2
// with text on stderr is read as a block whose reason is that stderr. A delegate
// that crashed would therefore either be silently dropped or, worse, block the
// session with a stack trace as the instruction. This launcher normalizes that:
// it forwards stdout unchanged on a clean exit, and on any other exit reports
// the failure as a systemMessage and allows the stop. A broken hook never traps
// a session.
//
// Zero dependencies. Node 16+.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// Strip --skill-dir <path> before forwarding: it addresses this launcher, not
// the delegate. Every other argument (notably --scope <id>) passes through.
const forwarded = [];
let skillDirArg = null;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === "--skill-dir") {
    skillDirArg = argv[i + 1] ?? null;
    i += 1;
    continue;
  }
  forwarded.push(argv[i]);
}

function candidatePaths() {
  const candidates = [];
  for (const dir of [skillDirArg, process.env.GRIT_SKILL_DIR]) {
    if (dir) candidates.push(join(dir, "scripts", "stop-hook.mjs"));
  }
  // Repo layout: adapters/codex/hooks/ -> skills/core/grit/scripts/
  candidates.push(join(here, "..", "..", "..", "skills", "core", "grit", "scripts", "stop-hook.mjs"));
  // Common installed skill roots. Codex's own roots come first, then the
  // shared ones a single skill-pack install may have already populated.
  for (const skillsRoot of [
    join(homedir(), ".codex", "skills"),
    join(process.cwd(), ".codex", "skills"),
    join(homedir(), ".claude", "skills"),
    join(process.cwd(), ".claude", "skills"),
    join(process.cwd(), ".agents", "skills"),
  ]) {
    candidates.push(join(skillsRoot, "grit", "scripts", "stop-hook.mjs"));
  }
  return candidates;
}

function findVendoredHook() {
  for (const candidate of candidatePaths()) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

// Codex rejects a Stop payload carrying unknown keys, so the allow path emits
// only systemMessage — one of the six fields its output schema declares.
const allow = (message) => {
  if (message) {
    console.log(JSON.stringify({
      systemMessage: String(message).replace(/\s+/g, " ").trim().slice(0, 500),
    }));
  }
  process.exit(0);
};

const target = findVendoredHook();
if (!target) {
  allow(
    "grit stop-hook launcher: could not find the vendored stop-hook.mjs " +
      "(checked --skill-dir, GRIT_SKILL_DIR, the repo layout, and common installed skill roots). " +
      "Not blocking Stop; the hook is likely misinstalled — see adapters/codex/README.md.",
  );
}

const result = spawnSync(process.execPath, [target, ...forwarded], {
  stdio: ["inherit", "pipe", "pipe"],
  encoding: "utf8",
});

if (result.error) {
  allow("grit stop-hook launcher: failed to run " + target + ": " + result.error.message);
}

if (result.status !== 0) {
  const detail = (result.stderr || "").trim().slice(-300) || "no diagnostic on stderr";
  allow(
    "grit stop-hook launcher: the vendored stop-hook exited with status " +
      String(result.status) + "; not blocking to avoid a trap. Detail: " + detail,
  );
}

// Clean exit: the delegate's stdout is already a valid Codex Stop payload.
process.stdout.write(result.stdout || "");
process.exit(0);
