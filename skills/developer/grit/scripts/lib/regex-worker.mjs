// Adapted from unlazy (https://github.com/Leonxlnx/unlazy).
// Copyright (c) 2026 Leonxlnx. MIT License — see the NOTICE file at the repository root.
// Adapted for this repository: state directory .grit, environment prefix GRIT_,
// approval store ~/.grit/approved.
import { parentPort } from "node:worker_threads";

parentPort.once("message", ({ source, flags, output }) => {
  try {
    parentPort.postMessage({ matched: new RegExp(source, flags).test(output) });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
});
