#!/usr/bin/env node
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseProfile, THEME_SKILLS, validateProfile } from './profile-lib.mjs';

const brandingRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');
const errors = [];

for (const skill of THEME_SKILLS) {
  const path = join(brandingRoot, skill, 'PROFILE.md');
  try {
    const profile = parseProfile(path);
    for (const error of validateProfile(profile, skill)) errors.push(`${skill}: ${error}`);
  } catch (error) {
    errors.push(error.message);
  }
}

if (errors.length > 0) {
  console.error('validate-profiles.mjs failed:\n' + errors.map((error) => ` - ${error}`).join('\n'));
  process.exit(1);
}

console.log(`validate-profiles.mjs OK: ${THEME_SKILLS.length} profiles, semantic colors, provenance, and OFL fonts`);
