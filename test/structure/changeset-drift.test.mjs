import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, read } from '../helpers.mjs';

// The release action consumes changesets on main: it deletes the files and
// writes their text into CHANGELOG.md. Reconciling that result back into dev
// restores the version bump but not the deletion, so dev can keep carrying
// entries that have already shipped. Releasing then republishes them, and the
// changelog describes the same work twice.
//
// This has happened three times — corrected by hand for v0.3.0 and v0.3.1, and
// missed after v0.5.0, where four entries survived into the next release
// window. Nothing detected it, because a changeset is well formed whether or
// not its content has already been published.
//
// The check needs no network and no release history: once a release has been
// reconciled back, this branch's own CHANGELOG.md already contains what
// shipped. A pending changeset whose text is in that file has been published.

const CHANGESET_DIR = '.changeset';
const CHANGELOG = 'CHANGELOG.md';

// Long enough that ordinary shared phrasing cannot collide, short enough to
// survive light editing of a changeset's opening sentence.
const WINDOW = 120;

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function pendingChangesets() {
  const dir = join(root, CHANGESET_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md') && name !== 'README.md')
    .map((name) => {
      const body = read(join(CHANGESET_DIR, name));
      // Drop the frontmatter block naming the package and the bump; only the
      // prose is copied into the changelog.
      const prose = body.replace(/^---[\s\S]*?---/, '');
      return { name, prose: normalize(prose) };
    })
    .filter((entry) => entry.prose.length >= WINDOW);
}

test('no pending changeset has already been published in the changelog', () => {
  if (!existsSync(join(root, CHANGELOG))) return; // nothing released yet
  const changelog = normalize(read(CHANGELOG));

  const published = pendingChangesets().filter((entry) =>
    changelog.includes(entry.prose.slice(0, WINDOW)));

  assert.deepEqual(
    published.map((entry) => entry.name),
    [],
    'These changesets describe work that the changelog already records as ' +
    'released, so the next release would publish them a second time. The ' +
    'release consumed them on main and the reconciliation back into dev ' +
    'restored the version bump without the deletion. Delete the files listed ' +
    `here from ${CHANGESET_DIR}/, as was done for v0.3.0 and v0.3.1.`,
  );
});

test('every pending changeset declares the package and a real bump', () => {
  const dir = join(root, CHANGESET_DIR);
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md') || name === 'README.md') continue;
    const front = read(join(CHANGESET_DIR, name)).match(/^---\n([\s\S]*?)\n---/);
    assert.ok(front, `${CHANGESET_DIR}/${name}: missing the frontmatter block`);
    assert.match(front[1], /^"[^"]+":\s*(major|minor|patch)$/m,
      `${CHANGESET_DIR}/${name}: frontmatter must name the package and a major, minor, or patch bump`);
  }
});
