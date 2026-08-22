#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modelsPath = join(root, 'skills/developer/model-routing/models.md');
const body = readFileSync(modelsPath, 'utf8');

const m = body.match(/Last reviewed:\s*(\d{4}-\d{2}-\d{2})/);
if (!m) {
  console.error('check-registry-freshness: no "Last reviewed: YYYY-MM-DD" line found in models.md');
  process.exit(2);
}

const reviewed = new Date(m[1] + 'T00:00:00Z');
const now = new Date();
const ageDays = Math.floor((now - reviewed) / (1000 * 60 * 60 * 24));
const MAX_AGE_DAYS = 45;

console.log(`models.md last reviewed ${m[1]} — ${ageDays} day(s) ago (threshold ${MAX_AGE_DAYS})`);

if (ageDays > MAX_AGE_DAYS) {
  console.error(`Registry review is overdue by ${ageDays - MAX_AGE_DAYS} day(s).`);
  process.exit(2);
}

process.exit(0);
