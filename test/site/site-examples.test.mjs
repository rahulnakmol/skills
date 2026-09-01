import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { root, read } from './lib.mjs';

// Examples that rot fail the build. Each row below binds one page to the
// stable, re-runnable facts it quotes. Adding a page here is adding a row;
// a page whose marker text has moved or disappeared skips with a clear
// message instead of passing silently or crashing on a null match.

function runNode(scriptRel, args) {
  return spawnSync(process.execPath, [join(root, scriptRel), ...args], { encoding: 'utf8' });
}

function stripTagsExact(s) {
  return s.replace(/<[^>]+>/g, '');
}

const CHECKS = {

  // grit: the unmet fixture's --status run is reproduced on the page, and the
  // fixture's own content, quoted in full, still matches the real file.
  'site/_skills/grit.md': (t, raw) => {
    const result = runNode('skills/core/grit/scripts/gate-check.mjs',
      ['--status', 'test/fixtures/grit/unmet/GATES.md']);
    assert.equal(result.status, 1, `gate-check --status on the unmet fixture must exit 1, got ${result.status}`);

    const stableLines = [
      'UNMET GATES:G2 (unchecked): prints its second fixed token when run',
      'GATES.md: 2 gates',
      'UNMET: 1 (met: 1)',
      'GATES:G2',
    ];
    for (const line of stableLines) {
      assert.ok(result.stdout.includes(line), `gate-check --status output is missing the stable line: ${JSON.stringify(line)}`);
      assert.ok(raw.includes(line), `site/_skills/grit.md no longer quotes the stable output line: ${JSON.stringify(line)}`);
    }

    const marker = raw.match(/<pre><code>(# Gates: unmet fixture[\s\S]*?)<\/code><\/pre>/);
    if (!marker) { t.skip('grit.md: fixture-reproduction marker "# Gates: unmet fixture" not found'); return; }
    const quoted = stripTagsExact(marker[1]).trim();
    const fixture = read('test/fixtures/grit/unmet/GATES.md').trim();
    assert.equal(quoted, fixture,
      'site/_skills/grit.md quotes test/fixtures/grit/unmet/GATES.md in full, byte for byte, and the two have drifted apart');
  },

  // report: the clean fixture's --status run ends ALL MET, and that exact
  // line is quoted on the page.
  'site/_skills/report.md': (t, raw) => {
    const marker = 'test/fixtures/grit/clean/GATES.md';
    if (!raw.includes(marker)) { t.skip(`report.md: no longer references ${marker}`); return; }
    const result = runNode('skills/core/grit/scripts/gate-check.mjs', ['--status', marker]);
    assert.equal(result.status, 0, `gate-check --status on the clean fixture must exit 0, got ${result.status}`);
    assert.match(result.stdout, /ALL MET \(2 met\)/, 'gate-check --status on the clean fixture must print "ALL MET (2 met)"');
    assert.ok(raw.includes('ALL MET (2 met)'), 'site/_skills/report.md no longer quotes "ALL MET (2 met)"');
  },

  // update-models: the freshness check exits 0 today, and the page states its
  // stable prefix without asserting the drifting day count or date.
  'site/_skills/update-models.md': (t, raw) => {
    const marker = 'models.md last reviewed';
    if (!raw.includes(marker)) { t.skip('update-models.md: no longer contains "models.md last reviewed"'); return; }
    const result = runNode('scripts/check-registry-freshness.mjs', []);
    assert.equal(result.status, 0,
      `check-registry-freshness.mjs must exit 0 (registry review overdue?), got ${result.status}\n${result.stdout}${result.stderr}`);
    assert.ok(result.stdout.includes(marker), `check-registry-freshness.mjs output is missing "${marker}"`);
    assert.ok(raw.includes(marker), `site/_skills/update-models.md is missing "${marker}"`);
  },

  // home page: the grit ledger snippet is illustrative, not the full fixture,
  // but every literal line it shows must still be real fixture content, and
  // its truncated checksum must be a genuine prefix of the real one.
  'site/index.html': (t, raw) => {
    const marker = raw.match(/<pre><code>([\s\S]*?GATES\.md[\s\S]*?)<\/code><\/pre>/);
    if (!marker) { t.skip('index.html: no GATES.md snippet <pre><code> block found'); return; }
    const fixture = read('test/fixtures/grit/unmet/GATES.md');
    const lines = stripTagsExact(marker[1]).split('\n').map((l) => l.trim()).filter(Boolean);
    let checkedAny = false;
    for (const line of lines) {
      if (line.startsWith('#')) continue; // "# GATES.md — ..." caption, not a quote
      if (line.startsWith('$')) continue; // "$ gate-check ..." caption
      if (line.includes('UNMET GATES:G2')) continue; // stylized closing line, not a literal quote
      if (line.includes('&hellip;')) {
        const shaMatch = line.match(/output-sha256=([0-9a-f]+)&hellip;/);
        assert.ok(shaMatch, `index.html: truncated EVIDENCE line has an unexpected shape: ${JSON.stringify(line)}`);
        assert.ok(fixture.includes(`output-sha256=${shaMatch[1]}`),
          `index.html: truncated checksum prefix "${shaMatch[1]}" is not a real prefix in the unmet fixture`);
        checkedAny = true;
        continue;
      }
      assert.ok(fixture.includes(line),
        `index.html quotes "${line}", which is not present in test/fixtures/grit/unmet/GATES.md`);
      checkedAny = true;
    }
    assert.ok(checkedAny, 'index.html: GATES.md snippet block had no checkable lines');
  },

  // press: the checksum quoted on the page is the one documented in the
  // skill's own output contract — a two-file string equality, no renderer run.
  //
  // A second, independent binding covers the page's other worked example:
  // this repository's own v0.7.0 release notes. The page quotes the note text
  // in full and claims a specific byte count and checksum for it, so this
  // fixture (test/fixtures/press/release-notes-v0-7-0.md) must still match
  // the quote verbatim, and a real re-render of that exact fixture — with the
  // PATH forced empty and no browser env vars, so "no browser found" is the
  // same outcome on every machine — must still reproduce that exact byte
  // count and checksum, the way the page's command line describes.
  'site/_skills/press.md': (t, raw) => {
    const skill = read('skills/branding/press/SKILL.md');
    const htmlSha = skill.match(/path:\s*artifact\.html[\s\S]*?sha256:\s*"([0-9a-f]{64})"/);
    if (!htmlSha) { t.skip('press/SKILL.md: no artifact.html sha256 found in the output contract'); return; }
    assert.ok(raw.includes(htmlSha[1]),
      `site/_skills/press.md no longer quotes the HTML checksum documented in skills/branding/press/SKILL.md (${htmlSha[1]})`);

    const fixtureRel = 'test/fixtures/press/release-notes-v0-7-0.md';
    const marker = raw.match(/<pre><code>(# tqnonline\/skills v0\.7\.0[\s\S]*?)<\/code><\/pre>/);
    if (!marker) { t.skip('press.md: v0.7.0 release-notes quote block not found'); return; }
    const quoted = stripTagsExact(marker[1]).trim();
    const fixtureText = read(fixtureRel).trim();
    assert.equal(quoted, fixtureText,
      `site/_skills/press.md quotes ${fixtureRel} in full, and the two have drifted apart`);

    const runBlock = raw.match(/--in test\/fixtures\/press\/release-notes-v0-7-0\.md[\s\S]*?<\/code><\/pre>/);
    if (!runBlock) { t.skip('press.md: v0.7.0 reproduced-run block not found'); return; }
    const claim = runBlock[0].match(/(\d+) bytes {2}sha256 ([0-9a-f]{64})/);
    if (!claim) { t.skip('press.md: v0.7.0 byte-count/checksum claim not found in the reproduced-run block'); return; }
    const [, claimedBytes, claimedSha] = claim;

    const dir = mkdtempSync(join(tmpdir(), 'press-site-example-'));
    try {
      const out = join(dir, 'v0.7.0.html');
      const env = { ...process.env, PATH: '' };
      delete env.PUPPETEER_EXECUTABLE_PATH;
      delete env.CHROME_PATH;
      const result = spawnSync(process.execPath, [
        join(root, 'skills/branding/press/scripts/render.mjs'),
        '--in', join(root, fixtureRel), '--out', out, '--title', 'tqnonline/skills v0.7.0',
      ], { encoding: 'utf8', env });
      assert.equal(result.status, 1,
        `render.mjs on ${fixtureRel} must exit 1 (HTML written, no browser), got ${result.status}\n${result.stdout}${result.stderr}`);

      const bytes = statSync(out).size;
      const sha = createHash('sha256').update(readFileSync(out)).digest('hex');
      assert.equal(String(bytes), claimedBytes,
        `re-rendering ${fixtureRel} produced ${bytes} bytes; site/_skills/press.md quotes ${claimedBytes}`);
      assert.equal(sha, claimedSha,
        `re-rendering ${fixtureRel} produced sha256 ${sha}; site/_skills/press.md quotes ${claimedSha}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  },

  // conduct / arrange: quoted eval cases must still be the real, current
  // lines in test/eval/routing.jsonl.
  'site/_skills/conduct.md': (t, raw) => checkEvalCases(t, 'site/_skills/conduct.md', raw),
  'site/_skills/arrange.md': (t, raw) => checkEvalCases(t, 'site/_skills/arrange.md', raw),
};

function checkEvalCases(t, pagePath, raw) {
  const matches = raw.match(/\{"id":"r\d+"[^{}]*\}/g);
  if (!matches) { t.skip(`${pagePath}: no quoted test/eval/routing.jsonl case found`); return; }
  const jsonlLines = new Set(read('test/eval/routing.jsonl').split('\n').filter((l) => l.trim()));
  for (const quoted of matches) {
    assert.ok(jsonlLines.has(quoted),
      `${pagePath} quotes a case that is no longer a real line in test/eval/routing.jsonl: ${quoted}`);
  }
}

for (const [pagePath, check] of Object.entries(CHECKS)) {
  test(`example on ${pagePath} is real and re-runs clean`, (t) => {
    const raw = read(pagePath);
    check(t, raw);
  });
}
