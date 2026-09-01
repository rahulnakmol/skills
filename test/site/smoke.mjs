#!/usr/bin/env node
// Post-deploy smoke test. Plain Node, network allowed (this is the one
// exception to the offline rule the rest of test/site/** holds to) — it runs
// against a live deployment, never as part of `node scripts/run-tests.mjs`.
// Deliberately named smoke.mjs, not smoke.test.mjs, so run-tests.mjs's
// `*.test.mjs` discovery glob never picks it up.
//
// Usage: node test/site/smoke.mjs [baseUrl]
//   baseUrl defaults to $SMOKE_BASE_URL, then https://tqnonline.github.io/skills

const baseUrl = (process.argv[2] || process.env.SMOKE_BASE_URL || 'https://tqnonline.github.io/skills')
  .replace(/\/+$/, '');

const CHECKS = [
  {
    path: '/',
    label: 'home page',
    markers: ['Set the frontier.'],
  },
  {
    path: '/grit/',
    label: 'grit skill page',
    markers: ['Novice'],
  },
  {
    path: '/group/developer/',
    label: 'developer group hub',
    markers: ['delivery pipeline end to end'],
  },
  {
    path: '/journey/deliver-with-evidence/',
    label: 'deliver-with-evidence journey',
    markers: ['journey-rail'],
  },
  {
    path: '/leaders/',
    label: 'for leaders page',
    markers: ['For leaders'],
  },
  {
    path: '/llms.txt',
    label: 'llms.txt',
    markers: ['# The Quentin Skills'],
  },
  {
    path: '/sitemap.xml',
    label: 'sitemap.xml',
    markers: ['<urlset'],
  },
];

async function checkOne({ path, label, markers }) {
  const url = `${baseUrl}${path}`;
  let response;
  try {
    response = await fetch(url, { redirect: 'follow' });
  } catch (err) {
    return { ok: false, url, label, reason: `request failed: ${err.message}` };
  }
  if (response.status !== 200) {
    return { ok: false, url, label, reason: `expected HTTP 200, got ${response.status}` };
  }
  const body = await response.text();
  const missing = markers.filter((m) => !body.includes(m));
  if (missing.length) {
    return { ok: false, url, label, reason: `missing content marker(s): ${missing.map((m) => JSON.stringify(m)).join(', ')}` };
  }
  return { ok: true, url, label };
}

async function main() {
  console.log(`smoke: base URL ${baseUrl}`);
  const results = await Promise.all(CHECKS.map(checkOne));
  let failed = 0;
  for (const r of results) {
    if (r.ok) {
      console.log(`ok   ${r.label} — ${r.url}`);
    } else {
      failed += 1;
      console.error(`FAIL ${r.label} — ${r.url}: ${r.reason}`);
    }
  }
  console.log(`smoke: ${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main();
