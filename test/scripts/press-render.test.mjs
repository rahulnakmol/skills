import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root } from '../helpers.mjs';

const RENDER = join(root, 'skills/branding/press/scripts/render.mjs');
const PALETTE = join(root, 'skills/branding/press/PALETTE.md');

const DOCUMENT = join(root, 'test/fixtures/press/document.md');
const HOSTILE = join(root, 'test/fixtures/press/hostile.md');
const ALTERNATE_PALETTE = join(root, 'test/fixtures/press/alternate-palette.md');

// Every run is given a PATH pointing at a directory the test controls and no
// browser environment variables, so browser discovery has one answer on every
// machine: whatever this test put there. Without that, the no-browser
// assertions would pass or fail according to what the host happens to have
// installed, which is not a test.
function run(args, { browserDir = null } = {}) {
  const env = { ...process.env, PATH: browserDir ?? '' };
  delete env.PUPPETEER_EXECUTABLE_PATH;
  delete env.CHROME_PATH;
  return spawnSync(process.execPath, [RENDER, ...args], { encoding: 'utf8', env });
}

function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'press-test-'));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Render into a temp directory and hand back the HTML. The fixture is never
// written to, and nothing lands inside the repository.
function renderToTemp(dir, input, extraArgs = [], options = {}) {
  const out = join(dir, 'artifact.html');
  const result = run(['--in', input, '--out', out, ...extraArgs], options);
  return { result, out, pdf: join(dir, 'artifact.pdf'), html: existsSync(out) ? readFileSync(out, 'utf8') : null };
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

// A stand-in for Chromium. It reads --print-to-pdf=<path> out of its arguments
// and writes `body` there, which lets the PDF path be exercised on a machine
// with no browser at all — including the case where the browser exits 0 and
// leaves behind something that is not a PDF. The body is passed to printf as an
// argument rather than a format string, so a percent sign in it is literal.
function fakeBrowser(dir, name, body) {
  assert.ok(!body.includes("'"), 'a fake browser body may not contain a single quote');
  const binDir = join(dir, 'bin');
  mkdirSync(binDir, { recursive: true });
  const script = join(binDir, name);
  writeFileSync(
    script,
    [
      '#!/bin/sh',
      'out=""',
      'for arg in "$@"; do',
      '  case "$arg" in',
      '    --print-to-pdf=*) out="${arg#--print-to-pdf=}" ;;',
      '  esac',
      'done',
      '[ -n "$out" ] || exit 3',
      // Written with shell builtins only: these tests run the stub with PATH
      // set to the stub's own directory, so `cat` and friends are unavailable.
      ': > "$out"',
      ...body.split('\n').map((line) => `echo '${line.replace(/'/g, `'\\''`)}' >> "$out"`),
      'exit 0',
    ].join('\n'),
    'utf8',
  );
  chmodSync(script, 0o755);
  return binDir;
}

// --- markdown constructs -------------------------------------------------------

test('every supported markdown construct reaches the HTML', () => {
  withTempDir((dir) => {
    const { result, html } = renderToTemp(dir, DOCUMENT, ['--html-only']);
    assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stdout}${result.stderr}`);

    // Headings, one per level the contract names.
    assert.match(html, /<h1 id="section-quarterly-platform-review">Quarterly Platform Review<\/h1>/);
    assert.match(html, /<h2 id="section-findings">Findings<\/h2>/);
    assert.match(html, /<h3 id="section-throughput">Throughput<\/h3>/);
    assert.match(html, /<h4 id="section-method">Method<\/h4>/);

    // The table of contents follows the document hierarchy and points at the
    // generated heading ids. The title heading is not repeated as a section.
    assert.match(html, /<nav class="press-toc" aria-labelledby="press-toc-title">/);
    assert.match(html, /<h2 class="press-toc-title" id="press-toc-title">Contents<\/h2>/);
    assert.match(html, /<a href="#section-findings">Findings<\/a>[\s\S]*<ol>[\s\S]*<a href="#section-throughput">Throughput<\/a>[\s\S]*<ol>[\s\S]*<a href="#section-method">Method<\/a>/);
    assert.doesNotMatch(html, /press-toc[\s\S]*href="#section-quarterly-platform-review"/,
      'the document title must not be repeated in the table of contents');

    // Paragraph with inline emphasis, code, and a link.
    assert.match(html, /<strong>bold text<\/strong>/);
    assert.match(html, /<em>italic text<\/em>/);
    assert.match(html, /<code>inline code<\/code>/);
    assert.match(html, /<a href="https:\/\/example\.com\/handbook">link to the handbook<\/a>/);

    // A fenced block keeps its language and its indentation.
    assert.match(html, /<pre><code class="language-python">def drain\(queue, budget=3\):/);
    assert.match(html, /\n    return \[handle\(item, budget\) for item in queue\]<\/code><\/pre>/);

    // Ordered list, with a nested unordered list inside its second item.
    assert.match(html, /<ol>[\s\S]*Replaced the polling loop[\s\S]*<\/ol>/);
    assert.match(html, /Added a retry budget[\s\S]*?<ul>\s*<li>three attempts<\/li>/);
    assert.match(html, /<li>exponential backoff<\/li>\s*<\/ul>/);

    // Unordered list at the top level.
    assert.match(html, /<ul>\s*<li>Alerting thresholds are still the old ones<\/li>/);

    // Table, including the alignment the delimiter row asked for.
    assert.match(html, /<th>Measure<\/th><th style="text-align:right">Before<\/th><th style="text-align:center">After<\/th>/);
    assert.match(html, /<td>Files per hour<\/td><td style="text-align:right">12<\/td>/);

    // Blockquote and horizontal rule.
    assert.match(html, /<blockquote><p>Nothing here has been verified/);
    assert.match(html, /<hr>/);

    // The document is self-contained: one file, no external references.
    assert.doesNotMatch(html, /<link\b/, 'the HTML must not link an external stylesheet');
    assert.doesNotMatch(html, /<script\b/, 'the HTML must not carry script');
    assert.match(html, /<style>/, 'the stylesheet must be inlined');
    assert.match(html, /@media screen and \(max-width: 640px\)[\s\S]*pre \{ white-space: pre-wrap; overflow-wrap: anywhere; \}/,
      'narrow screens must wrap long code inside the document rather than clipping it');
  });
});

test('duplicate and formatted headings receive safe, stable, unique anchors', () => {
  withTempDir((dir) => {
    const input = join(dir, 'headings.md');
    writeFileSync(input, [
      '# Review',
      '',
      '## **API** [limits](https://example.com)',
      '',
      '## API limits',
      '',
      '## <script>alert(1)</script>',
      '',
    ].join('\n'), 'utf8');
    const { result, html } = renderToTemp(dir, input, ['--html-only']);
    assert.equal(result.status, 0, result.stderr);
    assert.match(html, /id="section-api-limits"/);
    assert.match(html, /id="section-api-limits-2"/);
    assert.match(html, /id="section-script-alert-1-script"/);
    assert.equal((html.match(/href="#section-api-limits"/g) ?? []).length, 1);
    assert.equal((html.match(/href="#section-api-limits-2"/g) ?? []).length, 1);
    assert.ok(!/<script\b/i.test(html), 'heading text must remain escaped when anchors are added');
  });
});

test('nested list depth is preserved rather than flattened', () => {
  withTempDir((dir) => {
    const input = join(dir, 'nested.md');
    writeFileSync(input, ['- one', '  - two', '    - three', '- four', ''].join('\n'), 'utf8');
    const { result, html } = renderToTemp(dir, input, ['--html-only']);
    assert.equal(result.status, 0, result.stderr);
    const body = html.slice(html.indexOf('<main'));
    assert.equal((body.match(/<ul>/g) ?? []).length, 3, 'three nesting levels must produce three lists');
    assert.match(body, /<li>one[\s\S]*<ul>[\s\S]*<li>two[\s\S]*<ul>[\s\S]*<li>three<\/li>/);
    assert.match(body, /<li>four<\/li>\s*<\/ul>\s*<\/main>/);
  });
});

// --- untrusted document text ---------------------------------------------------

test('HTML in the document is escaped, not executed', () => {
  withTempDir((dir) => {
    const { result, html } = renderToTemp(dir, HOSTILE, ['--html-only']);
    assert.equal(result.status, 0, result.stderr);

    const body = html.slice(html.indexOf('<main'));
    assert.ok(!/<script\b/i.test(body), 'a <script> tag from the document must never appear as markup');
    assert.ok(!/<img\b/i.test(body), 'an <img> tag from the document must never appear as markup');
    assert.ok(!/onerror\s*=\s*["'][^"']*["']\s*>/i.test(body), 'no event handler may survive as an attribute');

    // The characters are still there — escaped, and readable to the reader.
    assert.match(body, /&lt;script&gt;alert\(&quot;document body&quot;\)&lt;\/script&gt;/);
    assert.match(body, /&lt;b&gt;raw tags&lt;\/b&gt;/);
    assert.match(body, /&lt;i&gt;cell&lt;\/i&gt;/, 'a table cell is escaped like any other text');
    assert.match(body, /&lt;em&gt;markup&lt;\/em&gt;/, 'quoted text is escaped like any other text');
    assert.match(body, /<code>&lt;script&gt;in a code span&lt;\/script&gt;<\/code>/);
    assert.match(body, /<pre><code class="language-html">&lt;script&gt;in a fenced block/);

    // The title comes from the document too, so it is escaped in <title> as well.
    assert.ok(!/<title>[^<]*<img/i.test(html), 'the title must be escaped');
  });
});

test('a javascript: link loses its anchor and keeps its words', () => {
  withTempDir((dir) => {
    const { html } = renderToTemp(dir, HOSTILE, ['--html-only']);
    assert.ok(!/javascript:/i.test(html), 'no javascript: target may reach the artifact');
    assert.match(html, /label one/, 'the words of a rejected link are still shown');
    assert.match(html, /<a href="https:\/\/example\.com\/safe">label two<\/a>/, 'a safe link is still a link');
    assert.equal((html.match(/<a href=/g) ?? []).length, 1, 'exactly one of the two links may render as an anchor');
  });
});

// --- palette -------------------------------------------------------------------

test('palette tokens reach the output, and a different palette changes it', () => {
  withTempDir((dir) => {
    const shipped = renderToTemp(dir, DOCUMENT, ['--html-only']).html;
    // The value asserted here is read from the shipped palette at test time, so
    // the test tracks the palette rather than pinning a color of its own.
    const accent = readFileSync(PALETTE, 'utf8').match(/"accent":\s*"(#[0-9a-fA-F]{3,8})"/)[1];
    assert.ok(shipped.includes('--press-accent: ' + accent + ';'),
      `the shipped accent ${accent} must appear in the stylesheet`);

    const alternate = renderToTemp(dir, DOCUMENT, ['--html-only', '--palette', ALTERNATE_PALETTE]).html;
    for (const token of ['--press-accent: #ff0066;', '--press-page: #0a0b0c;', '--press-code-surface: #112233;',
      '--press-heading-font: Futura, sans-serif;', '--press-base-size: 13pt;', '--press-margin: 7mm;'])
      assert.ok(alternate.includes(token), `the alternate palette token "${token}" must reach the stylesheet`);

    assert.ok(!alternate.includes(accent),
      'no token from the shipped palette may survive when another palette is given');
    assert.notEqual(shipped, alternate, 'changing the palette must change the artifact');
  });
});

test('a palette token that is not a valid CSS value is refused and reported', () => {
  withTempDir((dir) => {
    const bad = join(dir, 'bad-palette.md');
    writeFileSync(bad, ['# Bad', '', '```json', '{ "colors": { "accent": "red; } body { display:none } a{color:blue" } }',
      '```', ''].join('\n'), 'utf8');
    const { result, html } = renderToTemp(dir, DOCUMENT, ['--html-only', '--palette', bad]);
    assert.equal(result.status, 0);
    assert.ok(!html.includes('display:none'), 'a palette value must never inject a CSS rule');
    assert.match(result.stderr, /colors\.accent is not a valid value/);
  });
});

test('an explicitly named palette that does not exist fails rather than rendering unbranded', () => {
  withTempDir((dir) => {
    const result = run(['--in', DOCUMENT, '--out', join(dir, 'a.html'), '--html-only',
      '--palette', join(dir, 'absent.md')]);
    assert.equal(result.status, 2, `expected exit 2, got ${result.status}\n${result.stdout}${result.stderr}`);
    assert.match(result.stderr, /no such palette file/);
    assert.ok(!existsSync(join(dir, 'a.html')), 'nothing may be written when the palette is missing');
  });
});

test('a palette missing a token falls back and names the token, rather than doing it quietly', () => {
  withTempDir((dir) => {
    const palette = join(dir, 'partial.md');
    const shipped = readFileSync(join(root, 'skills/branding/press/PALETTE.md'), 'utf8');
    const stripped = shipped.replace(/\n\s*"heading":\s*"#[0-9a-fA-F]{6}",/, '');
    assert.notEqual(stripped, shipped, 'expected a heading color token to strip from the shipped palette');
    writeFileSync(palette, stripped);

    const { result } = renderToTemp(dir, DOCUMENT, ['--html-only', '--palette', palette]);
    assert.equal(result.status, 0, 'a single missing token is a warning, not a failed run');
    assert.match(result.stderr, /colors\.heading is missing/,
      'the run must name the token it fell back on; an artifact in colors nobody chose must not be silent');
  });
});

test('a complete palette produces no warnings at all', () => {
  withTempDir((dir) => {
    const { result } = renderToTemp(dir, DOCUMENT, ['--html-only']);
    assert.equal(result.status, 0);
    assert.equal(result.stderr.trim(), '', `the shipped palette must render without warnings, got: ${result.stderr}`);
  });
});

// --- the PDF contract ----------------------------------------------------------

test('--html-only writes HTML, exits 0, and never produces a .pdf', () => {
  withTempDir((dir) => {
    const { result, out, pdf } = renderToTemp(dir, DOCUMENT, ['--html-only']);
    assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stdout}${result.stderr}`);
    assert.ok(existsSync(out), 'the HTML must be written');
    assert.ok(!existsSync(pdf), 'no PDF may be written when the caller asked for HTML only');
    assert.equal(readdirSync(dir).filter((entry) => entry.endsWith('.pdf')).length, 0);
    assert.match(result.stdout, /PDF not requested/);
  });
});

test('with no browser, the HTML is written, the skip is stated, and no .pdf appears', () => {
  withTempDir((dir) => {
    const { result, out, pdf } = renderToTemp(dir, DOCUMENT);
    assert.equal(result.status, 1, `the missing artifact must be a non-zero exit, got ${result.status}`);
    assert.ok(existsSync(out), 'the HTML is still written when the PDF step cannot run');
    assert.ok(!existsSync(pdf), 'a file named .pdf must never exist unless it is a PDF');
    assert.equal(readdirSync(dir).filter((entry) => entry.endsWith('.pdf')).length, 0);
    assert.match(result.stdout, /no headless browser found/);
    assert.match(result.stdout, /PDF NOT PRODUCED/);
    assert.ok(!/wrote the PDF|PDF .*artifact\.pdf/.test(result.stdout),
      'the run must not report a PDF it did not produce');
  });
});

test('a browser that prints a PDF produces one, and the run reports it', () => {
  withTempDir((dir) => {
    const binDir = fakeBrowser(dir, 'chromium', '%PDF-1.4 minimal fixture, enough to be recognized as a PDF');
    const { result, out, pdf } = renderToTemp(dir, DOCUMENT, [], { browserDir: binDir });
    assert.equal(result.status, 0, `expected exit 0, got ${result.status}\n${result.stdout}${result.stderr}`);
    assert.ok(existsSync(out) && existsSync(pdf), 'both artifacts must exist');
    assert.equal(readFileSync(pdf).subarray(0, 5).toString('latin1'), '%PDF-');
    assert.match(result.stdout, /PDF .*artifact\.pdf/);
    assert.ok(result.stdout.includes(sha256(pdf)), 'the reported PDF checksum must be the checksum of the file');
    assert.ok(!existsSync(join(dir, '.press-chrome-profile')), 'the browser profile directory must be cleaned up');
  });
});

test('a browser that exits 0 without writing a PDF is not taken at its word', () => {
  withTempDir((dir) => {
    const binDir = fakeBrowser(dir, 'chromium', 'this is not a PDF, it is an error page');
    const { result, out, pdf } = renderToTemp(dir, DOCUMENT, [], { browserDir: binDir });
    assert.equal(result.status, 1, `a non-PDF must fail the run, got exit ${result.status}`);
    assert.ok(existsSync(out), 'the HTML is still written');
    assert.ok(!existsSync(pdf), 'the file that is not a PDF must be removed, not shipped as one');
    assert.match(result.stdout, /not a PDF/);
    assert.match(result.stdout, /PDF NOT PRODUCED/);
  });
});

// --- CLI contract --------------------------------------------------------------

test('a missing --in fails cleanly with a non-zero exit and writes nothing', () => {
  withTempDir((dir) => {
    const absent = join(dir, 'not-here.md');
    const result = run(['--in', absent, '--out', join(dir, 'a.html')]);
    assert.equal(result.status, 2, `expected exit 2, got ${result.status}\n${result.stdout}${result.stderr}`);
    assert.match(result.stderr, /no such input file/);
    assert.equal(result.stdout, '', 'a failed run must not report an artifact');
    assert.deepEqual(readdirSync(dir), [], 'nothing may be written when the input does not exist');
  });
});

test('--in is required, and an unknown argument is refused', () => {
  const missing = run([]);
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /--in <file\.md> is required/);

  const unknown = run(['--in', DOCUMENT, '--pdf-please']);
  assert.equal(unknown.status, 2);
  assert.match(unknown.stderr, /unknown argument/);
});

test('--html-only and a .pdf output path are refused rather than silently reconciled', () => {
  withTempDir((dir) => {
    const result = run(['--in', DOCUMENT, '--out', join(dir, 'a.pdf'), '--html-only']);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /different artifacts/);
  });
});

test('--help prints usage, names the exit codes, and exits 0', () => {
  const result = run(['--help']);
  assert.equal(result.status, 0);
  for (const flag of ['--in', '--out', '--html-only', '--palette', '--title'])
    assert.ok(result.stdout.includes(flag), `--help must document ${flag}`);
  assert.match(result.stdout, /exit codes:/);
});

test('--title overrides the heading, and the checksum matches the bytes written', () => {
  withTempDir((dir) => {
    const { result, out, html } = renderToTemp(dir, DOCUMENT, ['--html-only', '--title', 'Board Pack']);
    assert.equal(result.status, 0);
    assert.match(html, /<title>Board Pack<\/title>/);
    assert.ok(result.stdout.includes(sha256(out)), 'the printed sha256 must be the checksum of the file on disk');
    assert.match(result.stdout, /\d+ bytes/);
  });
});

test('rendering is deterministic: the same input twice gives the same checksum', () => {
  withTempDir((dir) => {
    const first = renderToTemp(dir, DOCUMENT, ['--html-only']);
    const digest = sha256(first.out);
    rmSync(first.out);
    const second = renderToTemp(dir, DOCUMENT, ['--html-only']);
    assert.equal(sha256(second.out), digest, 'the renderer must not embed a clock or any other varying value');
  });
});
