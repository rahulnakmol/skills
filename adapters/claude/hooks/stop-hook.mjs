#!/usr/bin/env node
// Adapted from unlazy (https://github.com/Leonxlnx/unlazy).
// Copyright (c) 2026 Leonxlnx. MIT License — see the NOTICE file at the repository root.
// Adapted for this repository: state directory .grit, environment prefix GRIT_,
// approval store ~/.grit/approved.
// Thin Claude Code Stop hook launcher. Locates the vendored grit stop-hook and
// delegates to it, so there is one implementation, not a copied second copy.
// Zero dependencies. Node 16+.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

function candidatePaths() {
  const candidates = [];
  if (process.env.GRIT_SKILL_DIR) {
    candidates.push(join(process.env.GRIT_SKILL_DIR, "scripts", "stop-hook.mjs"));
  }
  // Repo layout: adapters/claude/hooks/ -> skills/developer/grit/scripts/
  candidates.push(join(here, "..", "..", "..", "skills", "developer", "grit", "scripts", "stop-hook.mjs"));
  // Common installed skill roots.
  for (const skillsRoot of [
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

const target = findVendoredHook();
if (!target) {
  console.error(
    "grit stop-hook launcher: could not find the vendored stop-hook.mjs " +
      "(checked GRIT_SKILL_DIR, the repo layout, and common installed skill roots). " +
      "Not blocking Stop; the hook is likely misinstalled — see adapters/claude/hooks/README.md.",
  );
  process.exit(0);
}

const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: ["inherit", "inherit", "inherit"],
});

if (result.error) {
  console.error("grit stop-hook launcher: failed to run " + target + ": " + result.error.message);
  process.exit(0);
}

process.exit(result.status ?? 0);
