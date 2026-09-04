#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COLOR_ROLES, contrast, parseProfile, THEME_SKILLS, validateProfile } from './profile-lib.mjs';

const brandingRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');

function usage(message) {
  if (message) console.error(`build-theme: ${message}`);
  console.error('Usage: build-theme.mjs --theme <skill> [--variant <name>] [--mode light|dark] --out <directory>');
  process.exit(2);
}

const options = {};
for (let index = 2; index < process.argv.length; index += 1) {
  const flag = process.argv[index];
  if (flag === '--help' || flag === '-h') usage();
  if (!['--theme', '--variant', '--mode', '--out'].includes(flag)) usage(`unknown option ${flag}`);
  const value = process.argv[index + 1];
  if (!value || value.startsWith('--')) usage(`${flag} needs a value`);
  options[flag.slice(2)] = value;
  index += 1;
}

if (!THEME_SKILLS.includes(options.theme)) usage(`theme must be one of ${THEME_SKILLS.join(', ')}`);
if (!options.out) usage('--out is required');
if (options.mode && !['light', 'dark'].includes(options.mode)) usage('--mode must be light or dark');

const profilePath = join(brandingRoot, options.theme, 'PROFILE.md');
const profile = parseProfile(profilePath);
const profileErrors = validateProfile(profile, options.theme);
if (profileErrors.length > 0) usage(`profile is invalid:\n${profileErrors.map((error) => `  - ${error}`).join('\n')}`);

const variantName = options.variant ?? profile.defaultVariant;
const variant = profile.variants[variantName];
if (!variant) usage(`variant must be one of ${Object.keys(profile.variants).join(', ')}`);
const modeName = options.mode ?? 'light';
const colors = variant.modes[modeName].colors;
const typography = variant.typography;
const outDir = resolve(options.out);
mkdirSync(outDir, { recursive: true });

const tokenDocument = {
  schemaVersion: 1,
  theme: profile.skill,
  title: profile.title,
  variant: variantName,
  mode: modeName,
  provenance: variant.provenance,
  typography,
  colors,
};

const tokensJson = JSON.stringify(tokenDocument, null, 2) + '\n';
const tokensCss = `/* Generated from ${profile.skill}/PROFILE.md. */\n:root {\n${
  COLOR_ROLES.map((role) => `  --brand-${role}: ${colors[role]};`).join('\n')
}\n  --brand-font-display: ${typography.display.stack};\n  --brand-font-body: ${typography.body.stack};\n  --brand-font-mono: ${typography.mono.stack};\n}\n`;

const pressTokens = {
  name: `${profile.title} — ${variantName} ${modeName}`,
  colors: {
    page: colors.canvas,
    surface: colors.surface,
    text: colors.ink,
    heading: colors.ink,
    muted: colors['ink-muted'],
    accent: colors.accent,
    border: colors.border,
    'code-surface': colors.action,
    'code-text': colors['action-ink'],
    'quote-surface': colors['surface-strong'],
  },
  typography: {
    'body-font': typography.body.stack,
    'heading-font': typography.display.stack,
    'mono-font': typography.mono.stack,
    'base-size': '11pt',
    'line-height': '1.55',
  },
  page: { margin: '18mm', 'max-width': '180mm' },
};
const pressPalette = `# Press palette: ${profile.title}\n\nGenerated for the ${variantName} ${modeName} profile. Verify the rendered document and final PDF; this mapping does not establish PDF accessibility or print approval.\n\n## Machine tokens\n\n\`\`\`json\n${JSON.stringify(pressTokens, null, 2)}\n\`\`\`\n`;

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const ratio = (foreground, background) => contrast(foreground, background).toFixed(2);
const swatches = COLOR_ROLES.map((role) => `<li><span style="background:${colors[role]}"></span><b>${escape(role)}</b><code>${colors[role]}</code></li>`).join('');
const specimenHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(profile.title)} specimen</title>
<style>
${tokensCss}
*{box-sizing:border-box}body{margin:0;background:var(--brand-canvas);color:var(--brand-ink);font:18px/1.6 var(--brand-font-body)}
main{width:min(1120px,calc(100% - 32px));margin:0 auto;padding:64px 0 96px}header{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;border-bottom:3px solid var(--brand-accent);padding-bottom:28px}
.eyebrow,code,.meta{font-family:var(--brand-font-mono)}.eyebrow{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--brand-ink-muted)}h1,h2,h3{font-family:var(--brand-font-display);line-height:1.05;margin:.2em 0}h1{font-size:clamp(3rem,8vw,7rem);letter-spacing:-.04em}h2{font-size:clamp(2rem,4vw,3.5rem)}p{max-width:68ch}.meta{text-align:right;font-size:.8rem}.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:20px;margin-top:40px}.panel{grid-column:span 6;background:var(--brand-surface);border:2px solid var(--brand-border);border-radius:20px;padding:28px}.wide{grid-column:1/-1}.strong{background:var(--brand-surface-strong)}
button,a.button{min-height:44px;display:inline-flex;align-items:center;justify-content:center;border:2px solid var(--brand-action);border-radius:999px;padding:8px 20px;background:var(--brand-action);color:var(--brand-action-ink);font:700 .92rem var(--brand-font-body);text-decoration:none}button:focus-visible,a:focus-visible{outline:4px solid var(--brand-focus);outline-offset:4px}.secondary{background:transparent!important;color:var(--brand-ink)!important;border-color:var(--brand-border)!important}.status{display:flex;gap:10px;flex-wrap:wrap}.status span{border:2px solid;padding:4px 12px;border-radius:999px;font-weight:700}.success{border-color:var(--brand-success)!important}.warning{border-color:var(--brand-warning)!important}.error{border-color:var(--brand-error)!important}
.chart{height:220px;display:flex;align-items:end;gap:14px;border-bottom:2px solid var(--brand-border);padding:16px}.chart span{flex:1;background:var(--brand-accent);border:2px solid var(--brand-ink);border-bottom:0}.chart span:nth-child(2){background:var(--brand-focus)}.chart span:nth-child(3){background:var(--brand-success)}.chart span:nth-child(4){background:var(--brand-warning)}
.lower-third{min-height:260px;border-radius:16px;background:linear-gradient(140deg,var(--brand-action),var(--brand-surface-strong));display:flex;align-items:end;padding:24px}.lower-third div{max-width:520px;background:var(--brand-canvas);border-left:8px solid var(--brand-accent);padding:16px 20px}.lower-third h3{margin:0}.lower-third p{margin:3px 0 0;color:var(--brand-ink-muted)}
.swatches{list-style:none;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.swatches li{display:grid;grid-template-columns:40px 1fr;column-gap:10px;align-items:center;font-size:.78rem}.swatches span{grid-row:span 2;width:40px;height:40px;border:1px solid var(--brand-border);border-radius:10px}.swatches code{font-size:.7rem}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.metric{border-top:5px solid var(--brand-focus);padding-top:12px}.metric b{font:2rem var(--brand-font-display);display:block}
@media(max-width:760px){header{grid-template-columns:1fr}.meta{text-align:left}.panel{grid-column:1/-1}.swatches,.metrics{grid-template-columns:1fr 1fr}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
@media(forced-colors:active){.panel,.status span,.chart span{border:2px solid CanvasText}button,a.button{forced-color-adjust:auto}}
</style>
</head>
<body><main>
<header><div><div class="eyebrow">${escape(variantName)} · ${escape(modeName)} · accessible semantic roles</div><h1>${escape(profile.title)}</h1></div><div class="meta">Display: ${escape(typography.display.family)}<br>Body: ${escape(typography.body.family)}<br>Mono: ${escape(typography.mono.family)}</div></header>
<section class="grid">
<article class="panel"><div class="eyebrow">Message</div><h2>Make the next decision clear.</h2><p>Lead with the audience's situation. State the evidence and its limit. End with one useful next step.</p><p><button type="button">Primary action</button> <a class="button secondary" href="#palette">Review tokens</a></p></article>
<article class="panel strong"><div class="eyebrow">States</div><h2>Meaning survives color.</h2><p>Every status uses a label and a boundary, not a hue alone.</p><div class="status"><span class="success">Ready</span><span class="warning">Needs review</span><span class="error">Blocked</span></div></article>
<article class="panel"><div class="eyebrow">Data</div><h2>Four labeled series</h2><div class="chart" role="img" aria-label="Four bars rising from 35 to 85 percent"><span style="height:35%"></span><span style="height:52%"></span><span style="height:68%"></span><span style="height:85%"></span></div></article>
<article class="panel"><div class="eyebrow">Contrast evidence</div><h2>Token checks</h2><div class="metrics"><div class="metric"><b>${ratio(colors.ink,colors.canvas)}</b>ink/canvas</div><div class="metric"><b>${ratio(colors.ink,colors.surface)}</b>ink/surface</div><div class="metric"><b>${ratio(colors['action-ink'],colors.action)}</b>action</div><div class="metric"><b>${ratio(colors.focus,colors.canvas)}</b>focus</div></div></article>
<article class="panel wide"><div class="eyebrow">Motion and video</div><h2>Titles belong to the full frame.</h2><div class="lower-third"><div><h3>Evidence, not decoration</h3><p>Lower third · captions remain clear over the delivered grade</p></div></div></article>
<article class="panel wide" id="palette"><div class="eyebrow">Palette</div><h2>Semantic tokens</h2><ul class="swatches">${swatches}</ul></article>
</section></main></body></html>\n`;

const outputs = new Map([
  ['tokens.json', tokensJson],
  ['tokens.css', tokensCss],
  ['press-palette.md', pressPalette],
  ['specimen.html', specimenHtml],
]);
for (const [file, content] of outputs) writeFileSync(join(outDir, file), content);

const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const manifest = {
  schemaVersion: 1,
  theme: profile.skill,
  variant: variantName,
  mode: modeName,
  profile: `${profile.skill}/PROFILE.md`,
  files: [...outputs].map(([path, content]) => ({ path, bytes: Buffer.byteLength(content), sha256: sha256(content) })),
};
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`build-theme: ${profile.skill}/${variantName}/${modeName} -> ${outDir}`);
for (const file of manifest.files) console.log(`build-theme: ${file.path} ${file.bytes} bytes sha256 ${file.sha256}`);
