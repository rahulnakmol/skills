// Layout and stylesheet-cascade guards for the standalone documentation pages.
//
// The default layout is a bare shell: nav, <main id="page-body">, footer. The
// site's stylesheet zeroes every prose margin globally, because each other
// layout wraps its content in a padded, measured, gap-flexed container. A
// markdown page written straight onto `layout: default` therefore renders
// edge to edge with no vertical rhythm at all. These tests pin the fix:
// prose pages use `layout: page`, that layout supplies the container, and the
// doc-page responsive overrides sit after the rules they override.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, listDir, splitFrontmatter, scalar } from './lib.mjs';

const CSS = read('site/assets/css/site.css');
const PAGE_LAYOUT = read('site/_layouts/page.html');
const SITE_JS = read('site/assets/js/site.js');

// Hand-authored HTML pages carry their own padded wrappers (.hero, .section,
// .not-found), so they stay on the bare shell; markdown pages cannot.
const OWN_WRAPPERS = new Set(['index.html', '404.html']);

function topLevelPages() {
  return listDir('site')
    .filter((f) => (f.endsWith('.md') || f.endsWith('.html')) && f !== 'README.md')
    .map((f) => ({ name: f, raw: read(`site/${f}`) }))
    .filter((p) => p.raw.startsWith('---'));
}

test('every top-level markdown page uses layout: page, not the bare default shell', () => {
  const pages = topLevelPages().filter((p) => p.name.endsWith('.md'));
  assert.ok(pages.length >= 4, `expected at least 4 markdown pages, found ${pages.length}`);
  for (const { name, raw } of pages) {
    const layout = scalar(splitFrontmatter(raw).frontmatter, 'layout');
    assert.equal(layout, 'page',
      `site/${name}: a markdown page must use "layout: page" (the default shell has no prose container), got ${JSON.stringify(layout)}`);
  }
});

test('only pages that carry their own wrappers stay on layout: default', () => {
  for (const { name, raw } of topLevelPages()) {
    const layout = scalar(splitFrontmatter(raw).frontmatter, 'layout');
    if (layout === 'default') {
      assert.ok(OWN_WRAPPERS.has(name),
        `site/${name}: uses layout: default but is not one of the hand-authored pages that supply their own wrappers`);
    }
  }
});

test('the page layout supplies a header, a prose container, and a table of contents', () => {
  assert.match(PAGE_LAYOUT, /^---\nlayout: default\n---/, 'page layout must build on the default shell');
  for (const needle of ['class="doc-shell"', 'class="doc-main"', 'class="doc-header"', 'class="doc-body"', 'id="toc-list"']) {
    assert.ok(PAGE_LAYOUT.includes(needle), `page layout must contain ${needle}`);
  }
  assert.match(PAGE_LAYOUT, /page\.heading \| default: page\.title/,
    'the page layout must render page.heading, falling back to page.title');
});

test('the table-of-contents builder reads doc pages as well as skill pages', () => {
  assert.match(SITE_JS, /querySelector\('\.skill-body, \.doc-body'\)/,
    'buildToc must look for .doc-body too, or doc pages silently lose their table of contents');
});

test('the doc page has a container with padding and a measure', () => {
  const shell = CSS.match(/\n\.doc-main \{([^}]*)\}/);
  assert.ok(shell, '.doc-main must be defined');
  assert.match(shell[1], /padding:/, '.doc-main must set padding, or the page runs to the viewport edge');
  assert.match(shell[1], /max-width:/, '.doc-main must set a max-width');
  assert.match(CSS, /\.doc-body \{[^}]*gap:/, '.doc-body must be a gap container, since the reset zeroes prose margins');
});

// The regression this suite exists for: the doc rules were appended to the
// stylesheet after the shared responsive block, so overrides written into that
// block lost the cascade and the page never collapsed to one column on a phone.
test('doc-page responsive overrides come after the rules they override', () => {
  for (const selector of ['.doc-shell', '.doc-main', '.figure-row']) {
    const base = CSS.indexOf(`\n${selector} {`);
    assert.notEqual(base, -1, `${selector} must have a base rule`);
    const overrides = [...CSS.matchAll(new RegExp(`\\n\\s+\\${selector} \\{`, 'g'))].map((m) => m.index);
    assert.ok(overrides.length > 0, `${selector} must be overridden in at least one media query`);
    for (const at of overrides) {
      assert.ok(at > base,
        `${selector}: a media-query override at index ${at} sits before its base rule at ${base}, so it loses the cascade`);
    }
  }
});

test('how-it-fits carries no page-local stylesheet: its components are shared', () => {
  const raw = read('site/how-it-fits.md');
  assert.ok(!raw.includes('<style>'),
    'site/how-it-fits.md must not define its own styles; the flow, stage and note components live in site.css');
  assert.ok(!raw.includes('hif-'), 'the page-local hif- classes must be gone');
});

// Text baked into a diagram that runs past its viewBox is clipped with no
// warning at any viewport size, which is how the first draft of these figures
// lost the end of every caption line.
test('every inline SVG on a doc page draws inside its own viewBox', () => {
  const pages = topLevelPages().filter((p) => p.name.endsWith('.md'));
  let svgCount = 0;
  for (const { name, raw } of pages) {
    for (const [, vw, vh, body] of raw.matchAll(/<svg[^>]*viewBox="0 0 (\d+) (\d+)"([\s\S]*?)<\/svg>/g)) {
      svgCount += 1;
      const w = Number(vw);
      const h = Number(vh);
      for (const [, x, y, rw, rh] of body.matchAll(/<rect[^>]*x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
        assert.ok(Number(x) + Number(rw) <= w && Number(y) + Number(rh) <= h,
          `site/${name}: a rect at ${x},${y} sized ${rw}x${rh} runs outside the ${w}x${h} viewBox`);
      }
      for (const [, x, y] of body.matchAll(/<text[^>]*x="([\d.]+)" y="([\d.]+)"/g)) {
        assert.ok(Number(x) <= w && Number(y) <= h,
          `site/${name}: a text anchor at ${x},${y} sits outside the ${w}x${h} viewBox`);
      }
    }
  }
  assert.ok(svgCount >= 2, `expected at least two inline diagrams across the doc pages, found ${svgCount}`);
});
