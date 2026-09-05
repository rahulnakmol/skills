import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root } from '../helpers.mjs';

// Exhibit has two scripts and one contract between them: scaffold.mjs writes a
// deterministic shell from a theme profile and a storyboard, verify.mjs holds a
// finished page to the storyboard, to the brand's rules, and to the pinned
// vendor libraries. These tests pin the parts the plan claims: the shell is
// deterministic, hostile text is shown and not executed, a broken or missing
// profile is refused by name, the motion rules in a profile cap what a
// storyboard may ask for, the vendor scripts cannot drift from the manifest,
// and each check fails when it should and only then.

const SKILL = join(root, 'skills/branding/exhibit');
const SCAFFOLD = join(SKILL, 'scripts/scaffold.mjs');
const VERIFY = join(SKILL, 'scripts/verify.mjs');
const THEME_PROFILE = join(root, 'skills/branding/ai-branding/PROFILE.md');
const STORYBOARD = join(root, 'test/fixtures/exhibit/four-gates.storyboard.md');
const PAGE = join(root, 'test/fixtures/exhibit/four-gates.html');
const IN_BRAND_STORYBOARD = join(root, 'test/fixtures/exhibit/in-brand.storyboard.md');
const IN_BRAND_PAGE = join(root, 'test/fixtures/exhibit/in-brand.html');

function run(script, args, env) {
  return spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', env: env ?? process.env });
}

function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'exhibit-test-'));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// --theme is the common case; a test that needs a changed profile writes a
// brand directory and passes --brand instead.
function scaffold(dir, extraArgs = [], { storyboard = STORYBOARD, theme = 'ai-branding', brand = null, name = 'page.html' } = {}) {
  const out = join(dir, name);
  const brandArgs = brand ? ['--brand', brand] : ['--theme', theme];
  const result = run(SCAFFOLD, ['--storyboard', storyboard, '--out', out, ...brandArgs, ...extraArgs]);
  return { result, out, html: existsSync(out) ? readFileSync(out, 'utf8') : null };
}

// Most verify tests are about the structural and brand checks, so they skip the
// render pass. The theme comes from the page's data-theme unless a test gives
// --brand. The render and PDF passes have their own tests at the end.
function verify(page, extraArgs = [], { storyboard = STORYBOARD, brand = null, render = false, env } = {}) {
  const args = ['--in', page, '--storyboard', storyboard, ...(brand ? ['--brand', brand] : []), ...extraArgs];
  if (!render) args.push('--no-render');
  return run(VERIFY, args, env);
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function failedChecks(stdout) {
  return [...stdout.matchAll(/exhibit: FAIL (\S+)/g)].map((m) => m[1]);
}

// A brand directory holding the ai-branding profile with one change to its
// JSON block, so a test can exercise a rule the checked-in themes do not carry.
function brandDirWith(dir, mutate, name = 'brand') {
  const brandDir = join(dir, name);
  mkdirSync(brandDir, { recursive: true });
  const source = readFileSync(THEME_PROFILE, 'utf8');
  const match = source.match(/```json profile\n([\s\S]*?)\n```/);
  const profile = JSON.parse(match[1]);
  mutate(profile);
  writeFileSync(join(brandDir, 'PROFILE.md'), source.replace(match[0], '```json profile\n' + JSON.stringify(profile, null, 2) + '\n```'));
  return brandDir;
}

function storyboardWith(dir, text, name = 'storyboard.md') {
  const path = join(dir, name);
  writeFileSync(path, text);
  return path;
}

const MINIMAL_STORYBOARD = (extra = '') =>
  [
    '# Minimal',
    '',
    '```yaml',
    'storyboard:',
    '  title: A minimal page',
    '  question: What does the smallest storyboard look like?',
    '  thesis: Two acts are enough for the scripts to run.',
    '  audience: testers',
    extra,
    '  acts:',
    '    - type: hook',
    '      claim: A hook claim',
    '    - type: sandbox',
    '      claim: A sandbox claim',
    '```',
    '',
  ].join('\n');

// ------------------------------------------------------------------ scaffold

test('the shell is deterministic: one theme, storyboard, and title give the same bytes twice', () => {
  withTempDir((dir) => {
    const first = scaffold(dir, [], { name: 'a.html' });
    const second = scaffold(dir, [], { name: 'b.html' });
    assert.equal(first.result.status, 0, first.result.stderr);
    assert.equal(second.result.status, 0, second.result.stderr);
    assert.equal(sha256(first.html), sha256(second.html));
    assert.match(first.result.stdout, /sha256 [0-9a-f]{64}/);
    assert.match(first.result.stdout, /theme ai-branding {2}variant anthropic/);
    assert.match(first.result.stdout, /register cinematic {2}grade expressive/);
    assert.match(first.result.stdout, /acts hook, sandbox/);
  });
});

test('the checked-in fixtures are the current shell with acts authored inside the markers', () => {
  // Each fixture is scaffolded, then authored between the markers. If the
  // template, the runtime, or a vendor file changes and the fixture is not
  // rebuilt, the page in the repository stops being an example of what the
  // scripts produce.
  withTempDir((dir) => {
    for (const [storyboard, page, args, name] of [
      [STORYBOARD, PAGE, [], 'four-gates'],
      [IN_BRAND_STORYBOARD, IN_BRAND_PAGE, ['--variant', 'openai'], 'in-brand'],
    ]) {
      const fresh = scaffold(dir, args, { storyboard, name: name + '.html' });
      assert.equal(fresh.result.status, 0, fresh.result.stderr);
      const fixture = readFileSync(page, 'utf8');
      const emptied = fixture.replace(/(<!-- exhibit:begin ([a-z0-9-]+) -->)[\s\S]*?(<!-- exhibit:end \2 -->)/g, '$1\n  $3');
      assert.equal(emptied, fresh.html, `test/fixtures/exhibit/${name}.html is stale; rebuild it from the current shell`);
    }
  });
});

test('hostile storyboard text is escaped, so markup in a claim is shown and not run', () => {
  withTempDir((dir) => {
    const storyboard = storyboardWith(
      dir,
      [
        '# Hostile',
        '',
        '```yaml',
        'storyboard:',
        '  title: <script>alert("title")</script>',
        '  question: A question with "quotes" & an ampersand',
        '  thesis: <img src=x onerror=alert(1)>',
        '  audience: testers',
        '  acts:',
        '    - type: hook',
        '      claim: </section><script>alert("claim")</script>',
        '    - type: sandbox',
        '      claim: A plain claim',
        '```',
        '',
      ].join('\n'),
    );
    const { result, html } = scaffold(dir, [], { storyboard });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(!html.includes('<script>alert'), 'a script tag from the storyboard reached the page unescaped');
    assert.ok(!html.includes('<img src=x'), 'an img tag from the storyboard reached the page unescaped');
    assert.ok(html.includes('&lt;script&gt;alert(&quot;claim&quot;)&lt;/script&gt;'));
    assert.ok(html.includes('&quot;quotes&quot; &amp; an ampersand'));
    assert.equal((html.match(/<section class="act"/g) ?? []).length, 2, 'the hostile claim must not open a third section');
  });
});

test('a profile missing a required role is refused, and the role is named', () => {
  withTempDir((dir) => {
    const brand = brandDirWith(dir, (p) => delete p.variants.anthropic.modes.light.colors.ink);
    const { result, html } = scaffold(dir, [], { brand });
    assert.equal(result.status, 2);
    assert.equal(html, null, 'nothing is written when the profile fails validation');
    assert.match(result.stderr, /anthropic.*light.*ink/);
  });
});

test('a brand directory with no PROFILE.md exits 2 and points at BRAND.md', () => {
  withTempDir((dir) => {
    const brandDir = join(dir, 'some-brand');
    mkdirSync(brandDir);
    writeFileSync(join(brandDir, 'SKILL.md'), '# A brand skill with no profile yet\n');
    const { result, html } = scaffold(dir, [], { brand: brandDir });
    assert.equal(result.status, 2);
    assert.equal(html, null);
    assert.match(result.stderr, /no PROFILE\.md in/);
    assert.match(result.stderr, /BRAND\.md/);
  });
});

test('--theme must name one of the theme skills, and --theme with --brand is refused', () => {
  withTempDir((dir) => {
    const unknown = scaffold(dir, [], { theme: 'acme-branding' });
    assert.equal(unknown.result.status, 2);
    assert.match(unknown.result.stderr, /--theme must be one of/);
    const both = scaffold(dir, ['--brand', dir]);
    assert.equal(both.result.status, 2);
    assert.match(both.result.stderr, /--theme or --brand, not both/);
  });
});

test('--variant swaps the token set; every theme carries light and dark blocks', () => {
  withTempDir((dir) => {
    const anthropic = scaffold(dir, [], { name: 'anthropic.html' });
    const openai = scaffold(dir, ['--variant', 'openai'], { name: 'openai.html' });
    assert.equal(anthropic.result.status, 0, anthropic.result.stderr);
    assert.equal(openai.result.status, 0, openai.result.stderr);
    assert.match(anthropic.html, /data-variant="anthropic"/);
    assert.match(openai.html, /data-variant="openai"/);
    assert.match(anthropic.html, /--brand-accent: #a94728;/);
    assert.ok(!openai.html.includes('--brand-accent: #a94728;'), 'the openai variant has its own accent');
    for (const page of [anthropic.html, openai.html]) {
      assert.match(page, /prefers-color-scheme: dark/);
      assert.match(page, /<meta name="color-scheme" content="light dark">/);
    }
    const bad = scaffold(dir, ['--variant', 'acme'], { name: 'bad.html' });
    assert.equal(bad.result.status, 2);
    assert.match(bad.result.stderr, /variant/);
  });
});

test('--mode deck and --mode explorer set the mode on the page, and an unknown mode is refused', () => {
  withTempDir((dir) => {
    const deck = scaffold(dir, ['--mode', 'deck'], { name: 'deck.html' });
    const explorer = scaffold(dir, ['--mode', 'explorer'], { name: 'explorer.html' });
    assert.equal(deck.result.status, 0, deck.result.stderr);
    assert.equal(explorer.result.status, 0, explorer.result.stderr);
    assert.match(deck.html, /<html [^>]*data-mode="deck"/);
    assert.match(explorer.html, /<html [^>]*data-mode="explorer"/);
    const bad = scaffold(dir, ['--mode', 'carousel'], { name: 'bad.html' });
    assert.equal(bad.result.status, 2);
    assert.match(bad.result.stderr, /scroll, deck, explorer/);
  });
});

test('the register follows the flag, then the storyboard, then the profile, and never exceeds the grade', () => {
  withTempDir((dir) => {
    const byProfile = scaffold(dir, [], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD(), 'plain.md'), name: 'profile.html' });
    assert.equal(byProfile.result.status, 0, byProfile.result.stderr);
    assert.match(byProfile.html, /<html [^>]*data-register="cinematic"/);

    const byStoryboard = scaffold(dir, [], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD('  register: document'), 'doc.md'), name: 'storyboard.html' });
    assert.equal(byStoryboard.result.status, 0, byStoryboard.result.stderr);
    assert.match(byStoryboard.html, /<html [^>]*data-register="document"/);

    const byFlag = scaffold(dir, ['--register', 'product'], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD('  register: document'), 'doc2.md'), name: 'flag.html' });
    assert.equal(byFlag.result.status, 0, byFlag.result.stderr);
    assert.match(byFlag.html, /<html [^>]*data-register="product"/);

    // A calm brand renders a cinematic storyboard as a document and says so.
    const calm = brandDirWith(dir, (p) => (p.motion.grade = 'calm'), 'calm');
    const clamped = scaffold(dir, [], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD('  register: cinematic'), 'cine.md'), brand: calm, name: 'calm.html' });
    assert.equal(clamped.result.status, 0, clamped.result.stderr);
    assert.match(clamped.html, /<html [^>]*data-register="document"/);
    assert.match(clamped.html, /<html [^>]*data-grade="calm"/);
    assert.match(clamped.result.stdout, /register document/);
  });
});

test('an act that asks for an effect the brand forbids or the grade does not permit is refused by name', () => {
  withTempDir((dir) => {
    const forbidding = brandDirWith(dir, (p) => (p.motion.forbid = ['parallax']), 'forbid');
    const parallax = storyboardWith(dir, MINIMAL_STORYBOARD().replace('      claim: A hook claim', '      claim: A hook claim\n      motion: [parallax]'), 'parallax.md');
    const refused = scaffold(dir, [], { storyboard: parallax, brand: forbidding, name: 'refused.html' });
    assert.equal(refused.result.status, 2);
    assert.equal(refused.html, null);
    assert.match(refused.result.stderr, /act hook asks for parallax, which the brand forbids/);

    const calm = brandDirWith(dir, (p) => (p.motion.grade = 'calm'), 'calm');
    const morph = storyboardWith(dir, MINIMAL_STORYBOARD().replace('      claim: A hook claim', '      claim: A hook claim\n      motion: [morph]'), 'morph.md');
    const tooMuch = scaffold(dir, [], { storyboard: morph, brand: calm, name: 'calm.html' });
    assert.equal(tooMuch.result.status, 2);
    assert.match(tooMuch.result.stderr, /act hook asks for morph, which the brand's calm grade does not permit/);

    const forbidden = scaffold(dir, [], { brand: forbidding, name: 'ok.html' });
    assert.equal(forbidden.result.status, 0, forbidden.result.stderr);
    assert.match(forbidden.html, /<html [^>]*data-motion-forbid="parallax"/);
  });
});

test('the vendor set follows the acts: GSAP, ScrollTrigger, htmx, and Alpine always, plugins only when an act declares their effect', () => {
  withTempDir((dir) => {
    const plain = scaffold(dir, [], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD(), 'plain.md'), name: 'plain.html' });
    assert.equal(plain.result.status, 0, plain.result.stderr);
    for (const id of ['gsap', 'scrolltrigger', 'htmx', 'alpine']) assert.match(plain.html, new RegExp(`<script id="exhibit-vendor-${id}"`), 'missing vendor ' + id);
    for (const id of ['drawsvg', 'morphsvg', 'flip', 'splittext']) assert.ok(!plain.html.includes(`id="exhibit-vendor-${id}"`), 'plugin ' + id + ' inlined without an act asking for it');

    const drawn = scaffold(dir, [], { storyboard: storyboardWith(dir, MINIMAL_STORYBOARD().replace('      claim: A hook claim', '      claim: A hook claim\n      motion: [draw]'), 'draw.md'), name: 'draw.html' });
    assert.equal(drawn.result.status, 0, drawn.result.stderr);
    assert.match(drawn.html, /<script id="exhibit-vendor-drawsvg"/);
    assert.ok(!drawn.html.includes('id="exhibit-vendor-morphsvg"'));

    // The runtime is inlined before Alpine, which starts on load, and Alpine is last.
    const runtimeAt = plain.html.indexOf('<script id="exhibit-runtime">');
    const alpineAt = plain.html.indexOf('<script id="exhibit-vendor-alpine"');
    assert.ok(runtimeAt > 0 && runtimeAt < alpineAt, 'the runtime must be inlined before Alpine');
    assert.equal(plain.html.indexOf('<script id="exhibit-vendor-', alpineAt + 1), -1, 'Alpine must be the last vendor script');
    assert.ok(plain.html.includes('ready: function (fn)'), 'the boot shim exposes Exhibit.ready');
  });
});

test('--fonts link adds one Google Fonts stylesheet, and verify records it as a declared exception', () => {
  withTempDir((dir) => {
    const { result, out, html } = scaffold(dir, ['--fonts', 'link']);
    assert.equal(result.status, 0, result.stderr);
    assert.match(html, /data-fonts="link"/);
    const links = html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+">/g) ?? [];
    assert.equal(links.length, 1, 'exactly one fonts stylesheet link');
    assert.match(links[0], /family=Poppins/);
    assert.match(links[0], /family=Lora/);
    assert.match(links[0], /display=swap/);
    // An otherwise-empty page fails acts-authored, but single-file must still pass.
    const verified = verify(out);
    assert.ok(verified.stdout.includes('exhibit: ok   structural.single-file'), verified.stdout);
    assert.match(verified.stdout, /fonts: link declared; the page fetches 1 stylesheet/);
  });
});

test('--fonts embed inlines each declared face as a data URI, and names a missing family', () => {
  withTempDir((dir) => {
    const brandDir = brandDirWith(dir, () => {});
    mkdirSync(join(brandDir, 'fonts'));
    const faces = ['Poppins-500', 'Poppins-600', 'Lora-400', 'Lora-700', 'JetBrainsMono-400'];
    for (const face of faces) writeFileSync(join(brandDir, 'fonts', face + '.woff2'), Buffer.from('wOF2 fake ' + face));

    const ok = scaffold(dir, ['--fonts', 'embed'], { brand: brandDir, name: 'embed.html' });
    assert.equal(ok.result.status, 0, ok.result.stderr);
    assert.match(ok.html, /data-fonts="embed"/);
    assert.equal((ok.html.match(/@font-face/g) ?? []).length, faces.length);
    assert.match(ok.html, /font-family: "Poppins";\n\s*font-weight: 600;[\s\S]*?url\(data:font\/woff2;base64,/);
    assert.ok(!ok.html.includes('fonts.googleapis.com'));
    const verified = verify(ok.out, [], { brand: brandDir });
    assert.ok(verified.stdout.includes('exhibit: ok   brand.fonts'), verified.stdout);
    assert.ok(verified.stdout.includes('exhibit: ok   structural.single-file'), verified.stdout);

    for (const face of ['Lora-400', 'Lora-700']) rmSync(join(brandDir, 'fonts', face + '.woff2'));
    const missing = scaffold(dir, ['--fonts', 'embed'], { brand: brandDir, name: 'missing.html' });
    assert.equal(missing.result.status, 2);
    assert.equal(missing.html, null);
    assert.match(missing.result.stderr, /Lora-<weight>\.woff2 for Lora/);
  });
});

// -------------------------------------------------------------------- verify

const STRUCTURAL_AND_BRAND = [
  'structural.single-file',
  'structural.vendor-pinned',
  'structural.tokens-in-shell',
  'structural.acts-match-storyboard',
  'structural.acts-authored',
  'structural.export-bar',
  'structural.svg-titles',
  'structural.arrows-labeled',
  'structural.controls-labeled',
  'structural.frames-known',
  'structural.size-budget',
  'brand.allowed-colors',
  'brand.series-order',
  'brand.reduced-motion',
  'brand.dark-scheme',
  'brand.fonts',
  'brand.min-text-size',
  'brand.contrast',
  'brand.accent-on-text',
  'brand.motion',
  'brand.theme-declared',
];

test('the four-gates fixture passes every structural and brand check by name, with the theme read from the page', () => {
  const result = verify(PAGE);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(failedChecks(result.stdout), []);
  for (const name of STRUCTURAL_AND_BRAND) assert.ok(result.stdout.includes('exhibit: ok   ' + name), 'missing check ' + name);
  assert.match(result.stdout, /theme: ai-branding/);
  assert.match(result.stdout, /variant: anthropic/);
  assert.match(result.stdout, /register: cinematic/);
  assert.match(result.stdout, /structural: pass/);
  assert.match(result.stdout, /brand_rules: pass/);
});

// The second fixture renders the openai variant in explorer mode with every act
// type except sandbox, so it doubles as the gallery of primitives: stepper,
// weighted comparison, series legend, frame, timeline, decision, glossary.
test('the in-brand fixture passes every check, and uses each interactive primitive once', () => {
  const result = verify(IN_BRAND_PAGE, [], { storyboard: IN_BRAND_STORYBOARD });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(failedChecks(result.stdout), []);
  assert.match(result.stdout, /variant: openai/);
  assert.match(result.stdout, /mode: explorer/);
  assert.match(result.stdout, /brand_exceptions: \[\]/);
  const html = readFileSync(IN_BRAND_PAGE, 'utf8');
  for (const marker of [
    'x-data="stepper(',
    'x-data="compare(',
    'x-data="legend(',
    'x-data="decision(',
    'class="x-frame" data-frame="',
    'class="x-timeline"',
    'class="x-glossary"',
    'class="x-visually-hidden"',
    ' x-spotlight=',
    ' x-morph=',
    ' x-draw',
    ' x-count=',
    ' x-highlight',
  ]) {
    assert.ok(html.includes(marker), 'the in-brand fixture no longer carries ' + marker);
  }
});

// Each case plants one violation inside the hook act of the fixture and expects
// exactly the named check to fail. The fixture itself passes, so a failure here
// is the planted one.
const VIOLATIONS = [
  ['an external image', '<img src="https://example.com/x.png" alt="">', 'structural.single-file'],
  ['an htmx request to the network', '<div hx-get="https://example.com/more"></div>', 'structural.single-file'],
  ['a color outside the allowed set', '<p style="color: #ff00ff">off palette</p>', 'brand.allowed-colors'],
  ['a named color', '<p style="color: purple">named</p>', 'brand.allowed-colors'],
  ['color-mix with a literal', '<div style="background: color-mix(in srgb, var(--brand-accent), #ffffff 40%)"></div>', 'brand.allowed-colors'],
  ['a series out of order', '<svg viewBox="0 0 10 10"><title>t</title><rect class="x-series-4" width="1" height="1"></rect></svg>', 'brand.series-order'],
  ['text under the minimum size', '<p style="font-size: 11px">small</p>', 'brand.min-text-size'],
  ['a brand token redefined in an act', '<div style="--brand-accent: var(--brand-focus)"></div>', 'structural.tokens-in-shell'],
  ['an arrow with no label', '<svg viewBox="0 0 10 10"><title>t</title><path class="x-arrow" d="M0 0L5 5"></path></svg>', 'structural.arrows-labeled'],
  ['an SVG with no title', '<svg viewBox="0 0 10 10"><rect width="1" height="1"></rect></svg>', 'structural.svg-titles'],
  ['an unlabeled control', '<input type="range" x-model.number="stray">', 'structural.controls-labeled'],
  ['a frame the shell does not draw', '<div class="x-frame" data-frame="billboard"><div class="x-frame-screen"></div></div>', 'structural.frames-known'],
];

for (const [what, markup, check] of VIOLATIONS) {
  test('verify fails ' + check + ' when the page carries ' + what, () => {
    withTempDir((dir) => {
      const page = join(dir, 'page.html');
      const fixture = readFileSync(PAGE, 'utf8');
      writeFileSync(page, fixture.replace('<!-- exhibit:begin hook -->', '<!-- exhibit:begin hook -->\n' + markup));
      const result = verify(page);
      assert.equal(result.status, 1, result.stdout);
      assert.deepEqual(failedChecks(result.stdout), [check], 'only the planted check should fail:\n' + result.stdout);
    });
  });
}

test('verify fails brand.voice when the page uses a phrase the brand avoids, and only for a brand that lists one', () => {
  withTempDir((dir) => {
    const clean = verify(PAGE);
    assert.ok(!clean.stdout.includes('brand.voice'), 'no voice check when the profile has no avoid list');
    const brand = brandDirWith(dir, (p) => (p.voice = { avoid: ['seamless'] }));
    const page = join(dir, 'page.html');
    writeFileSync(page, readFileSync(PAGE, 'utf8').replace('<!-- exhibit:begin hook -->', '<!-- exhibit:begin hook -->\n<p>A Seamless review.</p>'));
    const result = verify(page, [], { brand });
    assert.equal(result.status, 1, result.stdout);
    assert.deepEqual(failedChecks(result.stdout), ['brand.voice']);
    assert.match(result.stdout, /seamless/);
  });
});

test('verify fails brand.motion when the acts use an effect the brand forbids or the page misstates the grade', () => {
  withTempDir((dir) => {
    const fixture = readFileSync(PAGE, 'utf8');
    const forbidding = brandDirWith(dir, (p) => (p.motion.forbid = ['highlight']), 'forbid');
    const page = join(dir, 'forbid.html');
    writeFileSync(page, fixture.replace('data-motion-forbid=""', 'data-motion-forbid="highlight"'));
    const result = verify(page, [], { brand: forbidding });
    assert.equal(result.status, 1, result.stdout);
    assert.deepEqual(failedChecks(result.stdout), ['brand.motion']);
    assert.match(result.stdout, /highlight/);

    const misstated = join(dir, 'grade.html');
    writeFileSync(misstated, fixture.replace('data-grade="expressive"', 'data-grade="calm"'));
    const graded = verify(misstated);
    assert.equal(graded.status, 1, graded.stdout);
    assert.ok(failedChecks(graded.stdout).includes('brand.motion'), graded.stdout);
    assert.match(graded.stdout, /declares grade "calm"/);
  });
});

test('verify fails structural.vendor-pinned when a vendor script is altered or missing', () => {
  withTempDir((dir) => {
    const fixture = readFileSync(PAGE, 'utf8');
    const tampered = join(dir, 'tampered.html');
    const start = fixture.indexOf('<script id="exhibit-vendor-alpine"');
    assert.ok(start > 0, 'the fixture carries the Alpine vendor script');
    const bodyAt = fixture.indexOf('>', start) + 1;
    writeFileSync(tampered, fixture.slice(0, bodyAt) + '/* tampered */' + fixture.slice(bodyAt));
    const result = verify(tampered);
    assert.equal(result.status, 1, result.stdout);
    assert.deepEqual(failedChecks(result.stdout), ['structural.vendor-pinned']);
    assert.match(result.stdout, /alpine/i);

    const removed = join(dir, 'removed.html');
    writeFileSync(removed, fixture.replace(/<script id="exhibit-vendor-htmx"[\s\S]*?<\/script>\n?/, ''));
    const gone = verify(removed);
    assert.equal(gone.status, 1, gone.stdout);
    assert.ok(failedChecks(gone.stdout).includes('structural.vendor-pinned'), gone.stdout);
  });
});

test('verify fails structural.acts-match-storyboard for an act the storyboard does not name', () => {
  withTempDir((dir) => {
    const page = join(dir, 'page.html');
    const fixture = readFileSync(PAGE, 'utf8');
    const extra = '<section class="act" id="act-extra" data-act="extra" data-type="map"><h2>Extra</h2></section>\n';
    writeFileSync(page, fixture.replace('<section class="exhibit-export"', extra + '<section class="exhibit-export"'));
    const result = verify(page);
    assert.equal(result.status, 1);
    assert.ok(failedChecks(result.stdout).includes('structural.acts-match-storyboard'), result.stdout);
  });
});

test('verify fails structural.acts-authored when an act is left empty', () => {
  withTempDir((dir) => {
    const fresh = scaffold(dir);
    const result = verify(fresh.out);
    assert.equal(result.status, 1);
    assert.deepEqual(failedChecks(result.stdout), ['structural.acts-authored'], result.stdout);
  });
});

test('verify fails brand.theme-declared when the page was checked against a different theme', () => {
  const result = verify(PAGE, ['--theme', 'nord-branding', '--variant', 'nord']);
  assert.equal(result.status, 1, result.stdout);
  assert.ok(failedChecks(result.stdout).includes('brand.theme-declared'), result.stdout);
  assert.match(result.stdout, /declares theme "ai-branding" and was checked against nord-branding/);
  assert.match(result.stdout, /declares variant "anthropic" and was checked against nord/);
});

// -------------------------------------------------------------- render pass

test('without a browser the render pass fails by name and the summary says it did not run', () => {
  // A PATH with only node on it, no browser environment variables, and a HOME
  // with no browser cache: findBrowser has nowhere left to look.
  withTempDir((dir) => {
    const bin = join(dir, 'bin');
    mkdirSync(bin);
    symlinkSync(process.execPath, join(bin, 'node'));
    const env = { PATH: bin, HOME: join(dir, 'home') };
    const result = verify(PAGE, ['--captures', join(dir, 'captures'), '--sheet', join(dir, 'sheet.png')], { render: true, env });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.ok(result.stdout.includes('exhibit: FAIL render.browser'), result.stdout);
    assert.match(result.stdout, /render: not run: no browser found/);
    assert.match(result.stdout, /set CHROME_PATH/);
    assert.ok(!existsSync(join(dir, 'sheet.png')), 'no sheet is written when nothing was rendered');
  });
});

test('--no-render skips the render and PDF passes and says so in the summary', () => {
  const result = verify(PAGE, ['--pdf', join(tmpdir(), 'never-written.pdf')]);
  assert.equal(result.status, 0, result.stdout);
  assert.match(result.stdout, /render: skipped \(--no-render\)/);
  assert.match(result.stdout, /pdf: skipped \(--no-render\)/);
  assert.ok(!result.stdout.includes('render.browser'), 'no render check line when rendering is skipped');
});

test('with a browser the render pass writes captures and a sheet, and --pdf prints a vector PDF with one act per page', async (t) => {
  const { findBrowser } = await import(join(SKILL, 'scripts/browser.mjs'));
  if (!findBrowser()) {
    t.skip('no Chromium-family browser on this machine');
    return;
  }
  withTempDir((dir) => {
    const captures = join(dir, 'captures');
    const sheet = join(dir, 'sheet.png');
    const pdf = join(dir, 'page.pdf');
    const result = verify(PAGE, ['--captures', captures, '--sheet', sheet, '--pdf', pdf], { render: true });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    for (const name of ['render.boots-clean', 'render.no-horizontal-overflow', 'render.tap-targets', 'render.body-text-size', 'render.content-visible', 'render.browser', 'pdf.valid', 'pdf.pages']) {
      assert.ok(result.stdout.includes('exhibit: ok   ' + name), 'missing check ' + name + '\n' + result.stdout);
    }
    assert.match(result.stdout, /render: pass: \d+ captures at 1280 and 390 px, light and dark/);
    assert.match(result.stdout, /pdf: .*page\.pdf \((\d+) pages, \d+ bytes, 0 raster images\)/);
    assert.ok(existsSync(sheet), 'sheet PNG exists');
    assert.ok(readFileSync(sheet).subarray(1, 4).equals(Buffer.from('PNG')), 'the sheet is a PNG');
    assert.ok(readFileSync(pdf).subarray(0, 5).equals(Buffer.from('%PDF-')), 'the PDF starts with %PDF-');
    const files = readdirSync(captures);
    assert.ok(files.includes('sheet.html'), 'the sheet source is kept beside the captures');
    for (const name of ['masthead-1280-light.png', 'masthead-390-light.png', 'masthead-1280-dark.png', 'hook-1280-light.png', 'sandbox-390-light.png']) {
      assert.ok(files.includes(name), 'missing capture ' + name + ' in ' + files.join(', '));
    }
  });
});

// ------------------------------------------------------------------- vendor

test('every pinned vendor file matches the sha256 in the manifest', async () => {
  const manifest = JSON.parse(readFileSync(join(SKILL, 'vendor/manifest.json'), 'utf8'));
  assert.ok(manifest.libraries.length >= 8, 'the manifest lists the eight libraries');
  for (const library of manifest.libraries) {
    const bytes = readFileSync(join(SKILL, 'vendor', library.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), library.sha256, library.id + ' does not match its pinned hash');
  }
  const ids = manifest.libraries.map((library) => library.id);
  for (const id of ['gsap', 'scrolltrigger', 'htmx', 'alpine']) assert.ok(ids.includes(id), 'manifest missing ' + id);
  assert.equal(ids[ids.length - 1], 'alpine', 'Alpine starts on load and must be last in the manifest');
});
