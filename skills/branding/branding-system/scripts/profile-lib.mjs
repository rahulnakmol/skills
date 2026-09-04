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

  if (profile.schemaVersion !== 1) errors.push('schemaVersion must be 1');
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
