import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, read, listMarkdown, splitFrontmatter, scalar } from './lib.mjs';

const CONFIG = read('site/_config.yml');
const DEFAULT_LAYOUT = read('site/_layouts/default.html');
const SKILL_LAYOUT = read('site/_layouts/skill.html');

test('_config.yml declares jekyll-seo-tag and jekyll-sitemap', () => {
  const pluginsBlock = CONFIG.match(/^plugins:\n((?:[ \t]*-.*\n?)*)/m);
  assert.ok(pluginsBlock, '_config.yml: no plugins: list found');
  assert.match(pluginsBlock[1], /-\s*jekyll-seo-tag/, '_config.yml: plugins must include jekyll-seo-tag');
  assert.match(pluginsBlock[1], /-\s*jekyll-sitemap/, '_config.yml: plugins must include jekyll-sitemap');
});

test('_config.yml declares the exact url/baseurl pair the site is served from', () => {
  const url = CONFIG.match(/^url:\s*"?([^"\n]+)"?\s*$/m);
  const baseurl = CONFIG.match(/^baseurl:\s*"?([^"\n]+)"?\s*$/m);
  assert.ok(url, '_config.yml: missing url:');
  assert.ok(baseurl, '_config.yml: missing baseurl:');
  assert.equal(url[1].trim(), 'https://tqnonline.github.io', '_config.yml: url must be https://tqnonline.github.io');
  assert.equal(baseurl[1].trim(), '/skills', '_config.yml: baseurl must be /skills');
});

test('the default layout emits the seo tag and a JSON-LD block', () => {
  assert.match(DEFAULT_LAYOUT, /\{%\s*seo\s*%\}/, 'default.html must call the {% seo %} tag');
  assert.match(DEFAULT_LAYOUT, /application\/ld\+json/, 'default.html must carry a JSON-LD <script> block');
});

test('the skill layout carries a BreadcrumbList JSON-LD block', () => {
  assert.match(SKILL_LAYOUT, /application\/ld\+json/, 'skill.html must carry a JSON-LD <script> block');
  assert.match(SKILL_LAYOUT, /"@type":\s*"BreadcrumbList"/, 'skill.html must declare a BreadcrumbList');
});

// --- every site page has a non-empty title and description ------------------

function assertTitleAndDescription(label, frontmatter, { titleFromConfig = false } = {}) {
  if (!titleFromConfig) {
    const title = scalar(frontmatter, 'title');
    assert.ok(title && title.length > 0, `${label}: frontmatter title must be present and non-empty`);
  }
  const description = scalar(frontmatter, 'description');
  assert.ok(description && description.length > 0, `${label}: frontmatter description must be present and non-empty`);
}

test('every skill page has non-empty title and description frontmatter', () => {
  for (const file of listMarkdown('site/_skills')) {
    const fm = splitFrontmatter(read(`site/_skills/${file}`)).frontmatter;
    assertTitleAndDescription(`site/_skills/${file}`, fm);
  }
});

test('every group page has non-empty title and description frontmatter', () => {
  for (const file of listMarkdown('site/_groups')) {
    const fm = splitFrontmatter(read(`site/_groups/${file}`)).frontmatter;
    assertTitleAndDescription(`site/_groups/${file}`, fm);
  }
});

test('every journey page has non-empty title and description frontmatter', () => {
  for (const file of listMarkdown('site/_journeys')) {
    const fm = splitFrontmatter(read(`site/_journeys/${file}`)).frontmatter;
    assertTitleAndDescription(`site/_journeys/${file}`, fm);
  }
});

test('leaders.md has non-empty title and description frontmatter', () => {
  const fm = splitFrontmatter(read('site/leaders.md')).frontmatter;
  assertTitleAndDescription('site/leaders.md', fm);
});

// index.html carries no page.title of its own; jekyll-seo-tag falls back to
// site.title (declared in _config.yml) for pages with none, so its frontmatter
// only needs to supply description directly.
test('index.html has a non-empty description in frontmatter, and gets its title from site.title', () => {
  const fm = splitFrontmatter(read('site/index.html')).frontmatter;
  assert.equal(scalar(fm, 'title'), null,
    'site/index.html: unexpectedly has its own title — if this is intentional, this test should stop asserting the site.title fallback');
  const siteTitle = CONFIG.match(/^title:\s*"?([^"\n]+)"?\s*$/m);
  assert.ok(siteTitle && siteTitle[1].trim().length > 0, '_config.yml: site.title must be non-empty for index.html to inherit a title');
  assertTitleAndDescription('site/index.html', fm, { titleFromConfig: true });
});

// --- llms.txt ------------------------------------------------------------------

test('llms.txt lists exactly the 39 manifest skills', () => {
  const plugin = JSON.parse(read('.claude-plugin/plugin.json'));
  const manifestNames = plugin.skills.map((p) => p.split('/').pop());
  assert.equal(manifestNames.length, 39, `expected 39 manifest skills, found ${manifestNames.length}`);

  const llms = read('site/llms.txt');
  const linkRe = /\[([a-z0-9-]+)\]\(https:\/\/tqnonline\.github\.io\/skills\/([a-z0-9-]+)\/\)/g;
  const listed = [];
  let m;
  while ((m = linkRe.exec(llms)) !== null) {
    if (m[1] === m[2]) listed.push(m[1]);
  }
  const listedSet = new Set(listed);
  assert.equal(listedSet.size, listed.length, `site/llms.txt lists a skill more than once: ${listed.join(', ')}`);

  const missing = manifestNames.filter((n) => !listedSet.has(n));
  const extra = listed.filter((n) => !manifestNames.includes(n));
  assert.deepEqual(missing, [], `site/llms.txt is missing manifest skill(s): ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `site/llms.txt lists skill(s) not in the manifest: ${extra.join(', ')}`);
  assert.equal(listedSet.size, 39, `site/llms.txt must list exactly 39 skills, found ${listedSet.size}`);
});
