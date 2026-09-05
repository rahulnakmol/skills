import { readFileSync } from 'node:fs';

export const THEME_SKILLS = [
  'everforest-branding',
  'catppuccin-branding',
  'ai-branding',
  'gruvbox-branding',
  'nord-branding',
  'solarized-branding',
];

export const COLOR_ROLES = [
  'canvas', 'surface', 'surface-strong', 'ink', 'ink-muted', 'border',
  'accent', 'action', 'action-ink', 'focus', 'success', 'warning', 'error',
];

const FONT_ROLES = ['display', 'body', 'mono'];
const HEX = /^#[0-9a-f]{6}$/i;

// Chart series draw from the semantic roles in this fixed order. The specimen
// page and every downstream renderer use the same sequence, so a four-series
// chart reads the same way on each surface.
export const SERIES_ROLES = ['accent', 'focus', 'success', 'warning'];

// Motion is a profile-level rule set (schemaVersion 2). A grade names how much
// movement the brand permits; a register names the default presentation a
// renderer reaches for; durations and easing are defined by role, as
// MOTION-VIDEO.md asks, so one entrance curve serves every component.
export const MOTION_GRADES = ['calm', 'fluid', 'expressive'];
export const MOTION_REGISTERS = ['document', 'product', 'cinematic'];
export const MOTION_DURATION_ROLES = ['micro', 'reveal', 'scene'];
export const MOTION_EASING_ROLES = ['standard', 'enter', 'exit'];
export const MOTION_EFFECTS = ['reveal', 'focus', 'morph', 'count', 'draw', 'spotlight', 'highlight', 'parallax'];
export const DEFAULT_MOTION = Object.freeze({
  grade: 'expressive',
  register: 'cinematic',
  duration: { micro: 160, reveal: 640, scene: 1200 },
  easing: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  },
  parallax: 0.12,
  forbid: [],
});
const EASING = /^(?:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\(\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*,\s*-?\d*\.?\d+\s*\))$/;

// The motion rules a profile states, filled in with the defaults for anything
// it leaves out. A schemaVersion 1 profile gets the defaults whole.
export function motionOf(profile) {
  const stated = profile?.motion ?? {};
  return {
    grade: stated.grade ?? DEFAULT_MOTION.grade,
    register: stated.register ?? DEFAULT_MOTION.register,
    duration: { ...DEFAULT_MOTION.duration, ...(stated.duration ?? {}) },
    easing: { ...DEFAULT_MOTION.easing, ...(stated.easing ?? {}) },
    parallax: stated.parallax ?? DEFAULT_MOTION.parallax,
    forbid: [...(stated.forbid ?? DEFAULT_MOTION.forbid)],
  };
}

export function voiceOf(profile) {
  return { avoid: [...(profile?.voice?.avoid ?? [])] };
}

// The CSS custom properties every renderer reads: one `--brand-<role>` per
// color role, three font stacks, and the motion rules as durations, curves,
// and a parallax depth. Durations and depth drop to zero under
// prefers-reduced-motion, so a page that animates from these tokens stops
// moving without a second rule set. `darkColors`, when given, is emitted under
// prefers-color-scheme: dark; a caller building one fixed mode omits it.
export function brandTokensCss({ colors, typography, motion, darkColors, header }) {
  const colorLines = (set, indent) => COLOR_ROLES.map((role) => `${indent}--brand-${role}: ${set[role]};`).join('\n');
  const lines = [];
  if (header) lines.push(header);
  lines.push(':root {');
  if (darkColors) lines.push('  color-scheme: light dark;');
  lines.push(colorLines(colors, '  '));
  lines.push(`  --brand-font-display: ${typography.display.stack};`);
  lines.push(`  --brand-font-body: ${typography.body.stack};`);
  lines.push(`  --brand-font-mono: ${typography.mono.stack};`);
  lines.push(MOTION_DURATION_ROLES.map((role) => `  --brand-motion-${role}: ${motion.duration[role]}ms;`).join('\n'));
  lines.push(MOTION_EASING_ROLES.map((role) => `  --brand-ease-${role}: ${motion.easing[role]};`).join('\n'));
  lines.push(`  --brand-parallax: ${motion.parallax};`);
  lines.push('}');
  if (darkColors) {
    lines.push('@media (prefers-color-scheme: dark) {', '  :root {', colorLines(darkColors, '    '), '  }', '}');
  }
  lines.push('@media (prefers-reduced-motion: reduce) {', '  :root {');
  lines.push(MOTION_DURATION_ROLES.map((role) => `    --brand-motion-${role}: 0ms;`).join('\n'));
  lines.push('    --brand-parallax: 0;', '  }', '}');
  return lines.join('\n') + '\n';
}

function validateMotion(motion, errors) {
  if (motion === undefined) return;
  if (!motion || typeof motion !== 'object' || Array.isArray(motion)) {
    errors.push('motion must be an object');
    return;
  }
  if (motion.grade !== undefined && !MOTION_GRADES.includes(motion.grade)) errors.push(`motion.grade must be one of ${MOTION_GRADES.join(', ')}`);
  if (motion.register !== undefined && !MOTION_REGISTERS.includes(motion.register)) errors.push(`motion.register must be one of ${MOTION_REGISTERS.join(', ')}`);
  if (motion.duration !== undefined) {
    for (const [role, value] of Object.entries(motion.duration)) {
      if (!MOTION_DURATION_ROLES.includes(role)) errors.push(`motion.duration.${role} is not a duration role (${MOTION_DURATION_ROLES.join(', ')})`);
      else if (!Number.isInteger(value) || value < 0 || value > 5000) errors.push(`motion.duration.${role} must be whole milliseconds from 0 to 5000`);
    }
  }
  if (motion.easing !== undefined) {
    for (const [role, value] of Object.entries(motion.easing)) {
      if (!MOTION_EASING_ROLES.includes(role)) errors.push(`motion.easing.${role} is not an easing role (${MOTION_EASING_ROLES.join(', ')})`);
      else if (typeof value !== 'string' || !EASING.test(value.trim())) errors.push(`motion.easing.${role} must be a CSS easing keyword or cubic-bezier()`);
    }
  }
  if (motion.parallax !== undefined && !(typeof motion.parallax === 'number' && motion.parallax >= 0 && motion.parallax <= 0.5)) {
    errors.push('motion.parallax must be a number from 0 to 0.5 (fraction of viewport height a far layer travels)');
  }
  if (motion.forbid !== undefined) {
    if (!Array.isArray(motion.forbid)) errors.push('motion.forbid must be a list of effect names');
    else for (const effect of motion.forbid) {
      if (!MOTION_EFFECTS.includes(effect)) errors.push(`motion.forbid names ${JSON.stringify(effect)}, not an effect (${MOTION_EFFECTS.join(', ')})`);
    }
  }
}

function validateVoice(voice, errors) {
  if (voice === undefined) return;
  if (!voice || typeof voice !== 'object' || Array.isArray(voice)) {
    errors.push('voice must be an object');
    return;
  }
  if (voice.avoid !== undefined) {
    if (!Array.isArray(voice.avoid) || voice.avoid.some((phrase) => typeof phrase !== 'string' || phrase.trim() === '')) {
      errors.push('voice.avoid must be a list of non-empty phrases');
    }
  }
}

export function parseProfile(path) {
  const body = readFileSync(path, 'utf8');
  const match = body.match(/```json profile\n([\s\S]*?)\n```/);
  if (!match) throw new Error(`${path}: missing fenced \`\`\`json profile block`);
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`${path}: invalid profile JSON: ${error.message}`);
  }
}

function channel(value) {
  const hex = value.slice(1);
  return [0, 2, 4].map((start) => {
    const normalized = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
}

export function contrast(foreground, background) {
  const luminance = (value) => {
    const [red, green, blue] = channel(value);
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function validateProfile(profile, expectedSkill) {
  const errors = [];
  const requireText = (value, label) => {
    if (typeof value !== 'string' || value.trim() === '') errors.push(`${label} must be non-empty text`);
  };

  if (profile.schemaVersion !== 1 && profile.schemaVersion !== 2) errors.push('schemaVersion must be 1 or 2');
  if (profile.schemaVersion === 1 && (profile.motion !== undefined || profile.voice !== undefined)) {
    errors.push('schemaVersion 1 profiles cannot carry motion or voice blocks; set schemaVersion 2');
  }
  if (profile.schemaVersion === 2) {
    validateMotion(profile.motion, errors);
    validateVoice(profile.voice, errors);
  }
  if (profile.skill !== expectedSkill) errors.push(`skill must be ${expectedSkill}`);
  requireText(profile.title, 'title');
  requireText(profile.defaultVariant, 'defaultVariant');
  if (!profile.variants || typeof profile.variants !== 'object' || Array.isArray(profile.variants)) {
    errors.push('variants must be an object');
    return errors;
  }
  if (!profile.variants[profile.defaultVariant]) errors.push('defaultVariant must name a declared variant');

  for (const [variantName, variant] of Object.entries(profile.variants)) {
    const prefix = `variants.${variantName}`;
    requireText(variant.provenance?.paletteSource, `${prefix}.provenance.paletteSource`);
    if (variant.provenance?.paletteSource && !/^https:\/\//.test(variant.provenance.paletteSource)) {
      errors.push(`${prefix}.provenance.paletteSource must be an https URL`);
    }
    requireText(variant.provenance?.paletteLicense, `${prefix}.provenance.paletteLicense`);
    requireText(variant.provenance?.adaptation, `${prefix}.provenance.adaptation`);
    requireText(variant.typography?.fallbackPolicy, `${prefix}.typography.fallbackPolicy`);
    if (variant.typography?.fallbackPolicy && !/Noto/.test(variant.typography.fallbackPolicy)) {
      errors.push(`${prefix}.typography.fallbackPolicy must name Noto script-specific fallback`);
    }
    for (const role of FONT_ROLES) {
      const font = variant.typography?.[role];
      requireText(font?.family, `${prefix}.typography.${role}.family`);
      requireText(font?.stack, `${prefix}.typography.${role}.stack`);
      requireText(font?.source, `${prefix}.typography.${role}.source`);
      if (font?.source && !/^https:\/\//.test(font.source)) {
        errors.push(`${prefix}.typography.${role}.source must be an https URL`);
      }
      if (font?.license !== 'OFL-1.1') errors.push(`${prefix}.typography.${role}.license must be OFL-1.1`);
    }
    for (const modeName of ['light', 'dark']) {
      const colors = variant.modes?.[modeName]?.colors;
      const modePrefix = `${prefix}.modes.${modeName}`;
      if (!colors) {
        errors.push(`${modePrefix}.colors is required`);
        continue;
      }
      for (const role of COLOR_ROLES) {
        if (!HEX.test(colors[role] ?? '')) errors.push(`${modePrefix}.colors.${role} must be #rrggbb`);
      }
      if (COLOR_ROLES.some((role) => !HEX.test(colors[role] ?? ''))) continue;

      const checks = [
        ['ink', 'canvas', 7], ['ink', 'surface', 7], ['ink-muted', 'canvas', 7],
        ['action-ink', 'action', 7], ['border', 'canvas', 3], ['border', 'surface', 3],
        ['focus', 'canvas', 3], ['focus', 'surface', 3],
        ['accent', 'canvas', 3], ['accent', 'surface', 3],
        ['success', 'canvas', 3], ['success', 'surface', 3],
        ['warning', 'canvas', 3], ['warning', 'surface', 3],
        ['error', 'canvas', 3], ['error', 'surface', 3],
      ];
      for (const [foreground, background, minimum] of checks) {
        const ratio = contrast(colors[foreground], colors[background]);
        if (ratio + Number.EPSILON < minimum) {
          errors.push(`${modePrefix}: ${foreground}/${background} is ${ratio.toFixed(2)}:1, requires ${minimum}:1`);
        }
      }
    }
  }
  return errors;
}
