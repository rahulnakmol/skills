import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, read, walk } from '../helpers.mjs';
import {
  COLOR_ROLES, DEFAULT_MOTION, MOTION_EFFECTS, motionOf, parseProfile, THEME_SKILLS, validateProfile, voiceOf,
} from '../../skills/branding/branding-system/scripts/profile-lib.mjs';

const BRANDING_ROOT = join(root, 'skills/branding');
const VALIDATOR = join(BRANDING_ROOT, 'branding-system/scripts/validate-profiles.mjs');
const BUILDER = join(BRANDING_ROOT, 'branding-system/scripts/build-theme.mjs');

test('all six public theme profiles pass the executable schema and contrast contract', () => {
  const result = spawnSync(process.execPath, [VALIDATOR], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /OK: 6 profiles/);
});

test('every public theme has one shared structure and reaches the common engine', () => {
  assert.equal(THEME_SKILLS.length, 6);
  for (const skill of THEME_SKILLS) {
    const base = `skills/branding/${skill}`;
    const entry = read(`${base}/SKILL.md`);
    assert.match(entry, /^requires: branding-system$/m, `${skill} must declare the shared engine`);
    assert.match(entry, /Call the Skill tool with `branding-system`/);
    for (const sibling of ['PROFILE.md', 'TYPOGRAPHY.md', 'SURFACES.md', 'SOURCES.md']) {
      assert.ok(entry.includes(sibling), `${skill} does not route to ${sibling}`);
      assert.ok(read(`${base}/${sibling}`).length > 100, `${skill}/${sibling} is unexpectedly empty`);
    }
  }
});

test('profiles carry complete semantic roles and OFL font declarations', () => {
  for (const skill of THEME_SKILLS) {
    const profile = parseProfile(join(BRANDING_ROOT, skill, 'PROFILE.md'));
    assert.deepEqual(validateProfile(profile, skill), []);
    for (const variant of Object.values(profile.variants)) {
      for (const mode of ['light', 'dark']) {
        assert.deepEqual(Object.keys(variant.modes[mode].colors).sort(), [...COLOR_ROLES].sort());
      }
      for (const role of ['display', 'body', 'mono']) {
        assert.equal(variant.typography[role].license, 'OFL-1.1');
      }
    }
  }
});

test('the AI profile defaults to Anthropic and keeps OpenAI as a separate option', () => {
  const profile = parseProfile(join(BRANDING_ROOT, 'ai-branding/PROFILE.md'));
  assert.equal(profile.defaultVariant, 'anthropic');
  assert.deepEqual(Object.keys(profile.variants), ['anthropic', 'openai']);
  assert.notEqual(profile.variants.anthropic.typography.display.family, profile.variants.openai.typography.display.family);
  assert.match(read('skills/branding/ai-branding/SKILL.md'), /provider: openai/);
});

test('contrast validation fails under a planted inaccessible text role', () => {
  const original = parseProfile(join(BRANDING_ROOT, 'nord-branding/PROFILE.md'));
  const planted = structuredClone(original);
  planted.variants.nord.modes.light.colors.ink = planted.variants.nord.modes.light.colors.canvas;
  assert.ok(
    validateProfile(planted, 'nord-branding').some((error) => /ink\/canvas is 1\.00:1/.test(error)),
    'the validator must name the failed pair and measured ratio',
  );
});

test('every public profile states schema 2 motion rules that the library fills in', () => {
  for (const skill of THEME_SKILLS) {
    const profile = parseProfile(join(BRANDING_ROOT, skill, 'PROFILE.md'));
    assert.equal(profile.schemaVersion, 2, `${skill} must be on schemaVersion 2`);
    const motion = motionOf(profile);
    assert.equal(motion.grade, 'expressive');
    assert.equal(motion.register, 'cinematic');
    assert.deepEqual(Object.keys(motion.duration), ['micro', 'reveal', 'scene']);
    assert.deepEqual(Object.keys(motion.easing), ['standard', 'enter', 'exit']);
    assert.ok(motion.parallax > 0 && motion.parallax <= 1);
    assert.deepEqual(voiceOf(profile), { avoid: [] });
  }
  assert.deepEqual(motionOf({ schemaVersion: 1 }), { ...DEFAULT_MOTION, duration: { ...DEFAULT_MOTION.duration }, easing: { ...DEFAULT_MOTION.easing }, forbid: [] });
  const partial = motionOf({ schemaVersion: 2, motion: { grade: 'calm', duration: { reveal: 300 }, forbid: ['parallax'] } });
  assert.equal(partial.grade, 'calm');
  assert.equal(partial.duration.reveal, 300);
  assert.equal(partial.duration.micro, DEFAULT_MOTION.duration.micro);
  assert.deepEqual(partial.forbid, ['parallax']);
});

test('motion and voice validation rejects malformed rules and schema 1 extras', () => {
  const original = parseProfile(join(BRANDING_ROOT, 'gruvbox-branding/PROFILE.md'));
  const planted = structuredClone(original);
  planted.motion.grade = 'wild';
  planted.motion.duration.reveal = 9000;
  planted.motion.easing.enter = 'bouncy';
  planted.motion.forbid = ['sparkle'];
  planted.voice = { avoid: 'seamless' };
  const errors = validateProfile(planted, 'gruvbox-branding');
  for (const pattern of [/motion\.grade/, /motion\.duration\.reveal/, /motion\.easing\.enter/, /"sparkle"/, /voice\.avoid/]) {
    assert.ok(errors.some((error) => pattern.test(error)), `expected an error matching ${pattern}: ${errors.join('; ')}`);
  }
  assert.ok(MOTION_EFFECTS.includes('parallax') && MOTION_EFFECTS.includes('spotlight'));

  const legacy = structuredClone(original);
  legacy.schemaVersion = 1;
  assert.ok(validateProfile(legacy, 'gruvbox-branding').some((error) => /schemaVersion 1/.test(error) && /motion/.test(error)));
  delete legacy.motion;
  assert.deepEqual(validateProfile(legacy, 'gruvbox-branding'), []);
});

test('the starter kit is deterministic, checksummed, and accepted by press', () => {
  const first = mkdtempSync(join(tmpdir(), 'brand-kit-a-'));
  const second = mkdtempSync(join(tmpdir(), 'brand-kit-b-'));
  try {
    for (const out of [first, second]) {
      const result = spawnSync(process.execPath, [BUILDER,
        '--theme', 'everforest-branding', '--variant', 'everforest', '--mode', 'dark', '--out', out,
      ], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
    }
    const expectedFiles = ['DESIGN.md', 'manifest.json', 'press-palette.md', 'specimen.html', 'tokens.css', 'tokens.json'];
    assert.deepEqual(readdirSync(first).sort(), expectedFiles);
    assert.deepEqual(readdirSync(second).sort(), expectedFiles);
    for (const file of expectedFiles) {
      assert.equal(readFileSync(join(first, file), 'utf8'), readFileSync(join(second, file), 'utf8'), `${file} drifted`);
    }

    const manifest = JSON.parse(readFileSync(join(first, 'manifest.json'), 'utf8'));
    for (const file of manifest.files) {
      const content = readFileSync(join(first, file.path));
      assert.equal(content.length, file.bytes);
      assert.equal(createHash('sha256').update(content).digest('hex'), file.sha256);
    }

    const design = readFileSync(join(first, 'DESIGN.md'), 'utf8');
    assert.match(design, /^---\nversion: alpha\n/);
    assert.match(design, /name: "Everforest Branding — everforest dark"/);
    assert.match(design, /canvas: "#2d353b"/);
    assert.match(design, /primary: "\{colors\.accent\}"/);
    assert.match(design, /## Overview[\s\S]*## Colors[\s\S]*## Typography[\s\S]*## Components[\s\S]*## Do's and Don'ts/);

    const rendered = spawnSync(process.execPath, [
      join(BRANDING_ROOT, 'press/scripts/render.mjs'),
      '--in', join(root, 'test/fixtures/press/document.md'),
      '--out', join(first, 'document.html'),
      '--palette', join(first, 'press-palette.md'),
      '--html-only',
    ], { cwd: root, encoding: 'utf8' });
    assert.equal(rendered.status, 0, `${rendered.stdout}${rendered.stderr}`);
    assert.match(rendered.stdout, /press: HTML/);
  } finally {
    rmSync(first, { recursive: true, force: true });
    rmSync(second, { recursive: true, force: true });
  }
});

test('one selected public theme links its shared engine and no unrelated skill', () => {
  const out = mkdtempSync(join(tmpdir(), 'brand-link-'));
  try {
    const result = spawnSync('bash', [
      join(root, 'scripts/link-skills.sh'), '--skill', 'solarized-branding', '--target', out,
    ], { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
    assert.deepEqual(readdirSync(out).sort(), [
      'rahulnakmol-branding-system',
      'rahulnakmol-solarized-branding',
    ]);
    assert.match(result.stdout, /Linked 2 skill\(s\) and 0 group doctrine set\(s\)/);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test('the common engine covers static, physical, motion, and verification surfaces', () => {
  const docs = [
    'skills/branding/branding-system/SURFACE-CONTRACT.md',
    'skills/branding/branding-system/MOTION-VIDEO.md',
    'skills/branding/branding-system/ACCESSIBILITY.md',
    'skills/branding/branding-system/OUTPUT-CONTRACT.md',
  ].map(read).join('\n');
  for (const term of [
    'native UI', 'documents', 'presentations', 'Print', 'Email', 'social media', 'Iconography',
    'data visualization', 'Environmental', 'wall-paint', 'Rec.709', 'Display P3', 'captions',
    'transcript', 'audio description', 'flash', 'reduced motion', 'Lab', 'light reflectance',
  ]) assert.match(docs, new RegExp(term, 'i'), `common engine is missing ${term}`);
});

test('the common engine defines DESIGN.md discovery, precedence, and alpha-format limits', () => {
  const entry = read('skills/branding/branding-system/SKILL.md');
  const guidance = read('skills/branding/branding-system/DESIGN-DOCUMENTS.md');
  assert.match(entry, /DESIGN-DOCUMENTS\.md/);
  for (const term of ['DESIGN.md', 'design.dark.md', 'alpha', 'precedence', 'untrusted', '@google/design.md lint']) {
    assert.match(guidance, new RegExp(term, 'i'), `DESIGN.md guidance is missing ${term}`);
  }
  assert.match(guidance, /does not silently override a host design system/);
});

test('published branding implementation omits the prohibited source identity', () => {
  const prohibited = String.fromCharCode(119, 116, 119);
  const paths = [
    ...walk('skills/branding', (path) => /\.(?:md|mjs)$/.test(path)),
    ...walk('site/_skills', (path) => path.endsWith('.md')),
    'site/_groups/branding.md', 'README.md',
  ];
  const hits = paths.filter((path) => read(path).toLowerCase().includes(prohibited));
  assert.deepEqual(hits, [], 'a public branding file disclosed the prohibited source identity');
});
