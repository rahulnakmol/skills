#!/usr/bin/env node
// Wave-7d Playwright chooser/prompt-card/theme-toggle drive.
//
// NOT run by `node scripts/run-tests.mjs` (that walks *.test.mjs only, and
// this file is deliberately named otherwise) and NOT part of `npm test`.
// This is a manual check, or one a future CI workflow runs on its own step —
// the deterministic node:test suite must never need a real browser. Run it
// directly:
//
//   node test/site/browser-check.mjs
//
// It needs three things this repository does not carry as committed
// devDependencies (kept out of package.json/package-lock.json on purpose,
// same as the rest of this file's scope): the `playwright` package, its
// Chromium executable, and the `liquidjs` / `js-yaml` / `marked` /
// `alpinejs` / `htmx.org` packages used only to assemble the two renders
// below. Install them ad hoc before running:
//
//   npm install --no-save --no-package-lock \
//     playwright@1.62.1 liquidjs@10.29.0 js-yaml@5.4.1 marked@18.0.11 \
//     alpinejs@3.14.1 htmx.org@1.9.12
//
// This environment's Chromium lives at /opt/pw-browsers/chromium; a
// different environment may need CHROMIUM_PATH set instead.
//
// What it does, in order:
//   1. Assembles site/index.html through the real default layout, real
//      _includes (chooser.html included), and real site/_data — the same
//      liquidjs-over-real-templates approach earlier sessions used (see
//      /tmp/.../scratchpad/liquid-check-w7a/verify-w7a.mjs) — then swaps the
//      CDN <script> tags for the local npm copies of alpinejs@3.14.1 and
//      htmx.org@1.9.12, and inlines site.css/site.js, so the result opens
//      under file:// with no network dependency at all.
//   2. Assembles site/_skills/grit.md the same way, through the skill.html
//      layout, so its "When to reach for it" prompt-cards render for real.
//   3. Drives the index render: clicks one full chooser path (a level-1
//      chip, then level-2, then level-3) and asserts the ending skill card
//      names the expected skill from site/_data/chooser.json and carries
//      the expected href; then clicks the theme toggle and asserts the
//      page's computed background color actually repaints.
//   4. Drives the grit render: clicks a prompt-card's copy button and reads
//      the OS/browser clipboard back, asserting it matches the card's text.
//   5. Prints one PASS/FAIL line per assertion and exits non-zero on any
//      FAIL.
import { chromium } from 'playwright';
import { Liquid } from 'liquidjs';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import * as yaml from 'js-yaml';
import { marked } from 'marked';

const root = '/home/user/skills';
const siteRoot = join(root, 'site');
const BASEURL = '/skills';
const URL_ = 'https://tqnonline.github.io';
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';

let passCount = 0;
let failCount = 0;
function report(ok, label, detail = '') {
  if (ok) { passCount += 1; console.log(`PASS: ${label}`); }
  else { failCount += 1; console.log(`FAIL: ${label}${detail ? ` — ${detail}` : ''}`); }
}

// ---------------------------------------------------------------------------
// 1-2. Assemble both renders (same approach as build.mjs in the scratchpad
// harness this wave inherited — inlined here so this one file is the whole
// deliverable).
// ---------------------------------------------------------------------------

const engine = new Liquid({
  root: [join(siteRoot, '_includes'), join(siteRoot, '_layouts'), siteRoot],
  extname: '.html',
  jekyllInclude: true,
  strictFilters: false,
  strictVariables: false,
});
engine.registerFilter('relative_url', (p) => BASEURL + String(p ?? ''));
engine.registerFilter('absolute_url', (p) => URL_ + BASEURL + String(p ?? ''));
engine.registerFilter('jsonify', (v) => JSON.stringify(v));
engine.registerFilter('default', (v, d) => (v === undefined || v === null || v === '' ? d : v));
engine.registerTag('seo', { parse() {}, render() { return '<title>seo title</title><meta name="description" content="seo">'; } });

const skillsData = JSON.parse(readFileSync(join(siteRoot, '_data/skills.json'), 'utf8'));
const chooserData = JSON.parse(readFileSync(join(siteRoot, '_data/chooser.json'), 'utf8'));
const site = {
  title: 'TQN Skills',
  baseurl: BASEURL,
  url: URL_,
  description: "TQN Skills documents every skill in The Quentin's skill library.",
  data: { skills: skillsData, chooser: chooserData },
};

function stripFm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('no frontmatter block found');
  return { frontmatter: yaml.load(m[1]), body: m[2] };
}

async function renderDefaultLayout(page, bodyRendered) {
  const layoutSrc = readFileSync(join(siteRoot, '_layouts/default.html'), 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  return engine.parseAndRender(layoutSrc, { site, page, content: bodyRendered });
}

function inlineAssets(html) {
  const alpineJs = readFileSync(join(root, 'node_modules/alpinejs/dist/cdn.min.js'), 'utf8');
  const htmxJs = readFileSync(join(root, 'node_modules/htmx.org/dist/htmx.min.js'), 'utf8');
  const siteCss = readFileSync(join(siteRoot, 'assets/css/site.css'), 'utf8');
  const siteJs = readFileSync(join(siteRoot, 'assets/js/site.js'), 'utf8');

  let out = html;
  out = out.replace(
    /<script src="https:\/\/unpkg\.com\/htmx\.org@1\.9\.12\/dist\/htmx\.min\.js"><\/script>/,
    `<script>\n${htmxJs}\n</script>`);
  out = out.replace(
    /<script src="https:\/\/unpkg\.com\/alpinejs@3\.14\.1\/dist\/cdn\.min\.js" defer><\/script>/,
    `<script defer>\n${alpineJs}\n</script>`);
  out = out.replace(
    /<link rel="stylesheet" href="[^"]*\/assets\/css\/site\.css">/,
    `<style>\n${siteCss}\n</style>`);
  out = out.replace(
    /<script src="[^"]*\/assets\/js\/site\.js"><\/script>/,
    `<script>\n${siteJs}\n</script>`);
  out = out.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">\n?/, '');
  out = out.replace(/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n?/, '');
  return out;
}

async function assembleIndex() {
  const raw = readFileSync(join(siteRoot, 'index.html'), 'utf8');
  const { frontmatter, body } = stripFm(raw);
  const page = { ...frontmatter, url: '/' };
  const bodyRendered = await engine.parseAndRender(body, { site, page, content: '' });
  const rendered = await renderDefaultLayout(page, bodyRendered);
  const final = inlineAssets(rendered);
  const leaked = final.match(/\{\{[^}]*\}\}|\{%[^%]*%\}/g);
  if (leaked) throw new Error(`index.html: unresolved Liquid left in output: ${JSON.stringify(leaked.slice(0, 5))}`);
  return final;
}

async function assembleGrit() {
  const raw = readFileSync(join(siteRoot, '_skills/grit.md'), 'utf8');
  const { frontmatter, body } = stripFm(raw);
  const page = { ...frontmatter, url: '/grit/' };
  const bodyLiquidRendered = await engine.parseAndRender(body, { site, page, content: '' });
  const bodyHtml = marked.parse(bodyLiquidRendered, { gfm: true });
  const layoutSrc = readFileSync(join(siteRoot, '_layouts/skill.html'), 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const skillRendered = await engine.parseAndRender(layoutSrc, { site, page, content: bodyHtml });
  const rendered = await renderDefaultLayout(page, skillRendered);
  const final = inlineAssets(rendered);
  const leaked = final.match(/\{\{[^}]*\}\}|\{%[^%]*%\}/g);
  if (leaked) throw new Error(`grit.md: unresolved Liquid left in output: ${JSON.stringify(leaked.slice(0, 5))}`);
  return final;
}

const workDir = mkdtempSync(join(tmpdir(), 'tqn-browser-check-'));
const indexHtml = await assembleIndex();
const gritHtml = await assembleGrit();
const indexPath = join(workDir, 'index-assembled.html');
const gritPath = join(workDir, 'grit-assembled.html');
writeFileSync(indexPath, indexHtml);
writeFileSync(gritPath, gritHtml);
console.log(`Assembled renders in ${workDir}`);

// A leaf with a full 3-level path (level-2, the "altitude" question, is
// skipped for some branches — this one exercises it) so the drive below
// clicks a real level-1 -> level-2 -> level-3 chip sequence.
const targetLeaf = chooserData.leaves.find((l) => l.path.length === 3);
if (!targetLeaf) throw new Error('site/_data/chooser.json: no 3-level leaf found to drive');

// ---------------------------------------------------------------------------
// 3-4. Drive both renders.
// ---------------------------------------------------------------------------

const browser = await chromium.launch({ executablePath: CHROMIUM_PATH, args: ['--no-sandbox'] });

try {
  // --- index render: chooser flow + theme toggle -----------------------
  const indexContext = await browser.newContext();
  try { await indexContext.grantPermissions(['clipboard-read', 'clipboard-write']); } catch { /* file:// may not support it */ }
  const indexPage = await indexContext.newPage();
  indexPage.on('pageerror', (err) => console.log(`PAGE ERROR (index): ${err.message}`));
  await indexPage.goto(pathToFileURL(indexPath).href);
  await indexPage.waitForLoadState('domcontentloaded');
  await indexPage.waitForSelector('.chooser-interactive[style*="display"]', { state: 'attached', timeout: 5000 }).catch(() => {});
  await indexPage.waitForTimeout(150); // let Alpine's x-init mount

  const chooserReady = await indexPage.locator('.chooser-interactive').isVisible();
  report(chooserReady, 'chooser: interactive widget is visible once Alpine mounts');

  const [l1, l2, l3] = targetLeaf.path;
  console.log(`Driving chooser path: ${l1.label} -> ${l2.label} -> ${l3.label} -> ${targetLeaf.skill}`);

  const l1Chip = indexPage.locator('.chooser-chip', { hasText: l1.label });
  report(await l1Chip.count() > 0, `chooser: level-1 chip "${l1.label}" is present`);
  await l1Chip.first().click();
  await indexPage.waitForTimeout(100);

  const l2Chip = indexPage.locator('.chooser-chip', { hasText: l2.label });
  report(await l2Chip.count() > 0, `chooser: level-2 chip "${l2.label}" is present after picking level 1`);
  await l2Chip.first().click();
  await indexPage.waitForTimeout(100);

  const l3Chip = indexPage.locator('.chooser-chip', { hasText: l3.label });
  report(await l3Chip.count() > 0, `chooser: level-3 chip "${l3.label}" is present after picking level 2`);
  await l3Chip.first().click();
  await indexPage.waitForTimeout(100);

  const resultSkill = await indexPage.locator('.chooser-result-skill code').textContent();
  report(resultSkill?.trim() === targetLeaf.skill,
    `chooser: ending card names the expected skill ("${targetLeaf.skill}")`,
    `got ${JSON.stringify(resultSkill)}`);

  const resultHref = await indexPage.locator('.chooser-result-link').getAttribute('href');
  const expectedHref = BASEURL + targetLeaf.href;
  report(resultHref === expectedHref,
    `chooser: ending card's link href is "${expectedHref}"`,
    `got ${JSON.stringify(resultHref)}`);

  // --- theme toggle: background actually repaints -----------------------
  const bgBefore = await indexPage.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const themeBefore = await indexPage.evaluate(() => document.documentElement.getAttribute('data-theme'));
  await indexPage.locator('.theme-toggle').click();
  await indexPage.waitForTimeout(150);
  const bgAfter = await indexPage.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const themeAfter = await indexPage.evaluate(() => document.documentElement.getAttribute('data-theme'));
  report(themeBefore !== themeAfter,
    `theme toggle: data-theme attribute flips (${themeBefore} -> ${themeAfter})`,
    `before=${themeBefore} after=${themeAfter}`);
  report(bgBefore !== bgAfter,
    'theme toggle: body background-color actually repaints',
    `before=${bgBefore} after=${bgAfter}`);

  await indexContext.close();

  // --- grit render: prompt-card copy button + clipboard readback --------
  const gritContext = await browser.newContext();
  let clipboardGranted = true;
  try { await gritContext.grantPermissions(['clipboard-read', 'clipboard-write']); } catch { clipboardGranted = false; }
  const gritPage = await gritContext.newPage();
  gritPage.on('pageerror', (err) => console.log(`PAGE ERROR (grit): ${err.message}`));
  await gritPage.goto(pathToFileURL(gritPath).href);
  await gritPage.waitForLoadState('domcontentloaded');

  const cardCount = await gritPage.locator('.prompt-card').count();
  report(cardCount >= 3, `grit page: at least 3 .prompt-card blocks render (found ${cardCount})`);

  const firstCard = gritPage.locator('.prompt-card').first();
  const firstButton = firstCard.locator('.prompt-card-copy');
  const expectedText = await firstCard.evaluate((card) => {
    const clone = card.cloneNode(true);
    const btn = clone.querySelector('.prompt-card-copy');
    if (btn) btn.remove();
    return clone.textContent.trim();
  });

  await firstButton.click();
  await gritPage.waitForTimeout(200);
  const hasCopiedClass = await firstButton.evaluate((el) => el.classList.contains('is-copied'));
  report(hasCopiedClass, 'prompt-card copy: button gets the is-copied class right after click');

  if (clipboardGranted) {
    try {
      const clipboardText = await gritPage.evaluate(() => navigator.clipboard.readText());
      report(clipboardText.trim() === expectedText.trim(),
        'prompt-card copy: clipboard readback matches the card\'s own text',
        `clipboard=${JSON.stringify(clipboardText.slice(0, 60))} expected=${JSON.stringify(expectedText.slice(0, 60))}`);
    } catch (err) {
      report(false, 'prompt-card copy: clipboard readback matches the card\'s own text', `clipboard read threw: ${err.message}`);
    }
  } else {
    report(false, 'prompt-card copy: clipboard readback matches the card\'s own text',
      'clipboard permission could not be granted in this context');
  }

  await gritContext.close();
} finally {
  await browser.close();
}

console.log('');
console.log(`${passCount} PASS, ${failCount} FAIL`);
if (failCount > 0) process.exit(1);
