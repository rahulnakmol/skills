#!/usr/bin/env node
// Adapted from unlazy (https://github.com/Leonxlnx/unlazy).
// Copyright (c) 2026 Leonxlnx. MIT License — see the NOTICE file at the repository root.
// Adapted for this repository: state directory .grit, environment prefix GRIT_,
// approval store ~/.grit/approved.
// Installs (or removes) the grit Stop hook entry in a Claude Code settings
// file, preserving every sibling hook and setting already there.
// Zero dependencies. Node 16+.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const MARKER = "--grit-hook";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const uninstall = args.includes("--uninstall");
const useLocal = args.includes("--local");
const useUser = args.includes("--user");

if (useLocal && useUser) {
  console.error("install-hooks: --local and --user are mutually exclusive.");
  process.exit(2);
}

// The Claude configuration root. scripts/install-adapters.sh copies the
// launcher under this same variable, so both scripts have to read it or the
// copy and the registration can land in different places.
const claudeHome = process.env.CLAUDE_CONFIG || join(homedir(), ".claude");

function settingsPath() {
  if (useUser) return join(claudeHome, "settings.json");
  if (useLocal) return join(process.cwd(), ".claude", "settings.local.json");
  return join(process.cwd(), ".claude", "settings.json");
}

// Claude Code resolves a hook command against the project directory. A project
// settings file can therefore name the launcher relatively, which keeps a
// committed settings file free of one machine's absolute paths. A user settings
// file applies to every project, so a relative path there would resolve
// somewhere different in each one; that target names the user-level copy
// absolutely instead.
const COMMAND = useUser
  ? 'node "' + join(claudeHome, "hooks", "grit-stop-hook.mjs") + '" ' + MARKER
  : "node .claude/hooks/grit-stop-hook.mjs " + MARKER;

function readSettings(path) {
  if (!existsSync(path)) return {};
  const text = readFileSync(path, "utf8").trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("install-hooks: " + path + " is not valid JSON: " + error.message);
    process.exit(2);
  }
}

function isGritEntry(entry) {
  if (!entry || typeof entry !== "object" || !Array.isArray(entry.hooks)) return false;
  return entry.hooks.some((h) => h && typeof h === "object" && typeof h.command === "string" && h.command.includes(MARKER));
}

// True when an existing grit entry already names exactly the command this run
// would write. An entry carrying the marker but a different command is a stale
// registration — most often one written before the launcher moved — and is
// repaired in place rather than left pointing at a file that is not there.
function entryMatchesCommand(entry) {
  const gritCommands = entry.hooks
    .filter((h) => h && typeof h === "object" && typeof h.command === "string" && h.command.includes(MARKER))
    .map((h) => h.command);
  return gritCommands.length > 0 && gritCommands.every((command) => command === COMMAND);
}

function addGritHook(settings) {
  const next = { ...settings };
  const hooks = { ...(next.hooks || {}) };
  const stopList = Array.isArray(hooks.Stop) ? [...hooks.Stop] : [];
  const existing = stopList.findIndex(isGritEntry);
  const entry = { hooks: [{ type: "command", command: COMMAND }] };
  let changed = false;
  let repaired = false;
  if (existing === -1) {
    stopList.push(entry);
    changed = true;
  } else if (!entryMatchesCommand(stopList[existing])) {
    stopList[existing] = entry;
    changed = true;
    repaired = true;
  }
  hooks.Stop = stopList;
  next.hooks = hooks;
  return { settings: next, changed, already: existing !== -1 && !repaired, repaired };
}

function removeGritHook(settings) {
  if (!settings.hooks || !Array.isArray(settings.hooks.Stop)) {
    return { settings, changed: false };
  }
  const stopList = settings.hooks.Stop;
  const filtered = stopList.filter((entry) => !isGritEntry(entry));
  const changed = filtered.length !== stopList.length;
  const next = { ...settings, hooks: { ...settings.hooks, Stop: filtered } };
  // Drop an emptied Stop list and an emptied hooks object so uninstall leaves
  // no trace when the grit entry was the only thing there.
  if (next.hooks.Stop.length === 0) {
    const { Stop, ...restHooks } = next.hooks;
    next.hooks = restHooks;
  }
  if (next.hooks && Object.keys(next.hooks).length === 0) {
    const { hooks, ...restSettings } = next;
    return { settings: restSettings, changed };
  }
  return { settings: next, changed };
}

const path = settingsPath();
const before = readSettings(path);

if (uninstall) {
  const { settings, changed } = removeGritHook(before);
  if (dryRun) {
    console.log("[dry-run] would write " + path + ":");
    console.log(JSON.stringify(settings, null, 2));
    console.log(changed ? "would remove the grit Stop hook entry." : "no grit Stop hook entry found; nothing to remove.");
    process.exit(0);
  }
  if (!changed) {
    console.log(path + ": no grit Stop hook entry found; nothing to remove.");
    process.exit(0);
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
  console.log(path + ": removed the grit Stop hook entry.");
  process.exit(0);
}

const { settings, changed, repaired } = addGritHook(before);
const verb = repaired ? "repair the stale" : "add the";
if (dryRun) {
  console.log("[dry-run] would write " + path + ":");
  console.log(JSON.stringify(settings, null, 2));
  console.log(changed ? "would " + verb + " grit Stop hook entry." : "grit Stop hook entry already present; no change.");
  process.exit(0);
}
if (!changed) {
  console.log(path + ": grit Stop hook entry already present (" + COMMAND + "); no change.");
  process.exit(0);
}
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
console.log(path + ": " + (repaired ? "repaired the stale" : "added the") + " grit Stop hook entry (" + COMMAND + ").");
process.exit(0);
