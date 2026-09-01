// TQN Skills — progressive-enhancement glue.
// 1. Decorates internal links with HTMX attributes so navigation swaps only
//    <main id="page-body">, instead of hand-writing hx-* on every template.
// 2. Rebuilds the "on this page" table of contents from the current
//    document's h2 headings.
// 3. Lazily wires the search button to Pagefind's UI on first click.
// All of it re-runs after an HTMX swap, since a swap replaces #page-body
// wholesale.
(function () {
  'use strict';

  // Theme toggle. Plain JS on purpose: it must work even if a CDN script
  // fails, and Alpine's expression evaluator rejects statement blocks.
  window.tqnToggleTheme = function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme');
    if (!current) {
      current = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('tqn-theme', next); } catch (e) { /* private mode */ }
  };

  function isInternalNavLink(a) {
    if (!a.href) return false;
    if (a.origin !== window.location.origin) return false;
    if (a.hasAttribute('download')) return false;
    if (a.target && a.target !== '' && a.target !== '_self') return false;
    if (a.hasAttribute('data-no-htmx')) return false;
    // Same-page anchors (#foo) and mailto/tel are not page navigations.
    if (a.getAttribute('href') === '' ) return false;
    var href = a.getAttribute('href') || '';
    // Any link carrying a fragment (a same-page jump, or a path plus an
    // anchor like "/skills/#catalog") is left to native navigation — an
    // hx-get strips the fragment before the request goes out, so htmx would
    // swap the body but never scroll to the target.
    if (href.charAt(0) === '#' || href.indexOf('#') !== -1) return false;
    if (/^(mailto|tel|javascript):/i.test(href)) return false;
    return true;
  }

  function decorateLinks(root) {
    if (typeof window.htmx === 'undefined') return;
    var scope = root || document;
    var links = scope.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.hasAttribute('hx-get')) continue;
      if (!isInternalNavLink(a)) continue;
      a.setAttribute('hx-get', a.getAttribute('href'));
      a.setAttribute('hx-select', '#page-body');
      a.setAttribute('hx-target', '#page-body');
      a.setAttribute('hx-swap', 'outerHTML show:window:top');
      a.setAttribute('hx-push-url', 'true');
    }
    if (window.htmx.process) window.htmx.process(scope);
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function buildToc() {
    var tocList = document.getElementById('toc-list');
    var tocNav = document.getElementById('toc');
    if (!tocList) return;
    var body = document.querySelector('.skill-body');
    if (!body) { tocNav && tocNav.setAttribute('hidden', ''); return; }
    var headings = body.querySelectorAll('h2');
    tocList.innerHTML = '';
    if (!headings.length) { tocNav && tocNav.setAttribute('hidden', ''); return; }
    tocNav && tocNav.removeAttribute('hidden');
    var used = {};
    headings.forEach(function (h) {
      if (!h.id) {
        var base = slugify(h.textContent) || 'section';
        var id = base;
        var n = 1;
        while (used[id] || document.getElementById(id)) { id = base + '-' + (++n); }
        h.id = id;
      }
      used[h.id] = true;
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + h.id;
      link.textContent = h.textContent;
      li.appendChild(link);
      tocList.appendChild(li);
    });
  }

  var pagefindLoaded = false;
  var pagefindFailed = false;

  function openSearch() {
    var panel = document.getElementById('search-panel');
    if (!panel) return;
    panel.removeAttribute('hidden');

    if (pagefindFailed) return;
    if (pagefindLoaded) {
      if (window.PagefindUI && !panel.dataset.ready) {
        mountPagefind(panel);
      }
      return;
    }

    var base = document.body.getAttribute('data-baseurl') || '';
    var script = document.createElement('script');
    script.src = base + '/pagefind/pagefind-ui.js';
    script.onload = function () {
      pagefindLoaded = true;
      mountPagefind(panel);
    };
    script.onerror = function () {
      pagefindFailed = true;
      var note = document.createElement('p');
      note.className = 'search-note-text';
      note.textContent = 'Search is built during deploy and is not available on this preview.';
      panel.appendChild(note);
    };
    document.head.appendChild(script);
  }

  function mountPagefind(panel) {
    if (!window.PagefindUI || panel.dataset.ready) return;
    var base = document.body.getAttribute('data-baseurl') || '';
    new window.PagefindUI({ element: panel, bundlePath: base + '/pagefind/', showSubResults: true });
    panel.dataset.ready = 'true';
  }

  function wireSearch() {
    var btn = document.getElementById('search-toggle');
    var panel = document.getElementById('search-panel');
    if (!btn || !panel || btn.dataset.wired) return;
    btn.dataset.wired = 'true';
    btn.addEventListener('click', function () {
      if (panel.hasAttribute('hidden')) {
        openSearch();
      } else {
        panel.setAttribute('hidden', '');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') panel.setAttribute('hidden', '');
    });
  }

  // Copy-to-clipboard for .prompt-card blocks (skill "When to reach for it").
  // The copyable text is the card's own content minus the button label, so
  // authors never have to duplicate the prompt into a data- attribute.
  function cardText(card) {
    var clone = card.cloneNode(true);
    var btnClone = clone.querySelector('.prompt-card-copy');
    if (btnClone) btnClone.parentNode.removeChild(btnClone);
    return clone.textContent.trim();
  }

  function flashCopied(btn, label) {
    var original = btn.textContent;
    btn.textContent = label;
    btn.classList.add('is-copied');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('is-copied');
    }, 1500);
  }

  function copyPromptText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { flashCopied(btn, 'Copied'); },
        function () { flashCopied(btn, 'Copy failed'); }
      );
      return;
    }
    // Fallback for a browser with no async Clipboard API.
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      flashCopied(btn, 'Copied');
    } catch (e) {
      flashCopied(btn, 'Copy failed');
    }
    document.body.removeChild(ta);
  }

  function wireCopyButtons(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll('.prompt-card-copy');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.dataset.wired) continue;
      btn.dataset.wired = 'true';
      btn.addEventListener('click', function (e) {
        var card = e.currentTarget.closest('.prompt-card');
        if (!card) return;
        copyPromptText(cardText(card), e.currentTarget);
      });
    }
  }

  function refresh() {
    decorateLinks(document);
    buildToc();
    wireSearch();
    wireCopyButtons(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }

  document.body.addEventListener('htmx:afterSwap', function () {
    refresh();
  });
})();
