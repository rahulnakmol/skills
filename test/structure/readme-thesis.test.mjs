import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, sectionText, walk } from '../helpers.mjs';

const readme = read('README.md');
const plugin = JSON.parse(read('.claude-plugin/plugin.json'));

test('README leads with the thesis and serves every altitude', () => {
  for (const h of ['## The thesis', '## The operating model',
    '### For leaders — CIO · CDAIO · CTO', '### For architects and engineering managers',
    '### For developers', '## Install', '## Skills index', '## License'])
    assert.ok(readme.includes(h), `README.md missing heading "${h}"`);
  const thesis = sectionText(readme, '## The thesis');
  assert.ok(thesis && thesis.replace(/\s+/g, ' ').length >= 300,
    'The thesis section must be a real point of view (≥300 chars), not a slogan');
  const leaders = readme.indexOf('### For leaders');
  const devs = readme.indexOf('### For developers');
  assert.ok(leaders !== -1 && devs !== -1 && leaders < devs,
    'Audience ladder must descend: leaders before developers');
});

test('every promoted skill appears in the README skills index', () => {
  for (const ref of plugin.skills) {
    const name = ref.split('/').pop();
    assert.ok(readme.includes(name), `README.md skills index missing promoted skill "${name}"`);
  }
});

test('every skill directory under skills/ is promoted in plugin.json', () => {
  const dirs = walk('skills', (p) => p.endsWith('SKILL.md'))
    .map((p) => p.replace(/\/SKILL\.md$/, ''));
  for (const d of dirs)
    assert.ok(plugin.skills.includes(d), `plugin.json missing promoted skill dir "${d}"`);
});

test('install wording is verbatim from .agents/install-block.md', () => {
  const block = read('.agents/install-block.md');
  const fence = block.match(/```bash\n[\s\S]*?```/)[0];
  assert.ok(readme.includes(fence), 'README install block must be copied verbatim from .agents/install-block.md');
});

// wiki/Home.md is now a lean index — the thesis itself lives on the docs
// site, which Home points to, rather than being duplicated on this page.
test('wiki Home is a lean index pointing at the site, linking every group stub', () => {
  const home = read('wiki/Home.md');
  assert.ok(home.includes('https://tqnonline.github.io/skills/'),
    'wiki/Home.md must link the docs site home — the full documentation now lives there, not on this page');
  for (const page of ['Group-Core', 'Group-Developer', 'Group-PM', 'Group-Branding', 'Group-Writing', 'Group-Productivity'])
    assert.ok(home.includes(`(${page})`), `wiki/Home.md must link ${page}`);
});
