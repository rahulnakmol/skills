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
const COMMAND = "node .claude/hooks/grit-stop-hook.mjs " + MARKER;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const uninstall = args.includes("--uninstall");
const useLocal = args.includes("--local");
const useUser = args.includes("--user");

if (useLocal && useUser) {
  console.error("install-hooks: --local and --user are mutually exclusive.");
  process.exit(2);
}

function settingsPath() {
  if (useUser) return join(homedir(), ".claude", "settings.json");
  if (useLocal) return join(process.cwd(), ".claude", "settings.local.json");
  return join(process.cwd(), ".claude", "settings.json");
}

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

function addGritHook(settings) {
  const next = { ...settings };
  const hooks = { ...(next.hooks || {}) };
  const stopList = Array.isArray(hooks.Stop) ? [...hooks.Stop] : [];
  const already = stopList.some(isGritEntry);
  let changed = false;
  if (!already) {
    stopList.push({ hooks: [{ type: "command", command: COMMAND }] });
    changed = true;
  }
  hooks.Stop = stopList;
  next.hooks = hooks;
  return { settings: next, changed, already };
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

const { settings, changed, already } = addGritHook(before);
if (dryRun) {
  console.log("[dry-run] would write " + path + ":");
  console.log(JSON.stringify(settings, null, 2));
  console.log(changed ? "would add the grit Stop hook entry." : "grit Stop hook entry already present; no change.");
  process.exit(0);
}
if (!changed) {
  console.log(path + ": grit Stop hook entry already present (" + COMMAND + "); no change.");
  process.exit(0);
}
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
console.log(path + ": added the grit Stop hook entry (" + COMMAND + ").");
process.exit(0);
