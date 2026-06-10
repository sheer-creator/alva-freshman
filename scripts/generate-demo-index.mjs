import { readdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Git author email -> GitHub login. Resolved offline so dev/build never hit the
// network; unknown emails fall back to the raw git author name.
const GITHUB_LOGINS = {
  'zhouyifei00@gmail.com': 'zyfayes',
  'sheer@alva.xyz': 'sheer-creator',
};

// Deployment clones can be shallow, which makes git history unreliable for
// attribution. Pin known demo authors by path before falling back to git.
const DEMO_AUTHOR_OVERRIDES = new Map([
  ['alva-ask-fast-path-brief.html', 'zyfayes'],
  ['alva-channel-workspace.html', 'zyfayes'],
  ['alva-homepage-planb.html', 'zyfayes'],
  ['demo-playbook-template-creator-voice.html', 'zyfayes'],
  ['logangallina77-paid-user-journey-cn.html', 'zyfayes'],
  ['alva-homepage-planb-kol-channel.html', null],
]);

// GitHub login of whoever first added the file (the earliest A-commit), via git.
// Returns null when git is unavailable so the index simply omits the author.
function resolveAuthor(relativePath, absolutePath) {
  if (DEMO_AUTHOR_OVERRIDES.has(relativePath)) {
    return DEMO_AUTHOR_OVERRIDES.get(relativePath);
  }

  try {
    const out = execFileSync(
      'git',
      ['log', '--diff-filter=A', '--format=%ae\t%an', '--', absolutePath],
      { cwd: rootDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
    const lines = out.trim().split('\n').filter(Boolean);
    const earliest = lines.at(-1);
    if (!earliest) return null;
    const [email, name] = earliest.split('\t');
    return GITHUB_LOGINS[email] || name || null;
  } catch {
    return null;
  }
}
const demoDir = path.join(rootDir, 'public', 'demo');
const indexPath = path.join(demoDir, 'index.html');
const switcherFileName = '_switcher.js';
const switcherPath = path.join(demoDir, switcherFileName);
const switcherTag = '<script src="/demo/_switcher.js" defer></script>';

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleFromRelativePath(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/');
  const withoutExtension = normalized.replace(/\.html$/i, '');
  const cleaned = withoutExtension.endsWith('/index')
    ? withoutExtension.slice(0, -'/index'.length)
    : withoutExtension;

  return cleaned
    .split('/')
    .filter(Boolean)
    .at(-1)
    ?.replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Demo';
}

function routeFromRelativePath(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/');
  if (normalized.endsWith('/index.html')) {
    return `/demo/${normalized.slice(0, -'index.html'.length)}`;
  }

  return `/demo/${normalized}`;
}

function decodeEntities(text) {
  return text
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function cleanText(htmlFragment) {
  return decodeEntities(htmlFragment.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Best-effort summary: first meaningful <p>, else leading body text.
// Returns plain text without an ellipsis — the index CSS clamps it to 2 lines,
// so all rows truncate at the same place. maxLength only guards payload size.
function extractSummary(html, maxLength = 240) {
  const withoutNoise = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');

  let candidate = '';
  const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = paragraphRegex.exec(withoutNoise)) !== null) {
    const text = cleanText(match[1]);
    if (text.length >= 12) {
      candidate = text;
      break;
    }
  }

  if (!candidate) {
    const bodyMatch = withoutNoise.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    candidate = cleanText(bodyMatch ? bodyMatch[1] : withoutNoise);
  }

  if (candidate.length > maxLength) {
    candidate = candidate.slice(0, maxLength).trim();
  }

  return candidate;
}

// Prefer the page's own <title> (then first <h1>) so the index label matches
// what the demo actually shows; fall back to the prettified file name.
function extractTitle(html, fallback) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const text = cleanText(titleMatch[1]);
    if (text) return text;
  }

  const headingMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (headingMatch) {
    const text = cleanText(headingMatch[1]);
    if (text) return text;
  }

  return fallback;
}

async function collectHtmlFiles(currentDir = demoDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const absolutePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(absolutePath));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

    const relativePath = path.relative(demoDir, absolutePath);
    if (relativePath === 'index.html') continue;

    const contents = await readFile(absolutePath, 'utf8');
    const normalizedRelativePath = relativePath.replaceAll(path.sep, '/');
    files.push({
      title: extractTitle(contents, titleFromRelativePath(relativePath)),
      route: routeFromRelativePath(relativePath),
      relativePath: normalizedRelativePath,
      summary: extractSummary(contents),
      author: resolveAuthor(normalizedRelativePath, absolutePath),
    });
  }

  return files;
}

function renderList(files) {
  if (files.length === 0) {
    return `
      <section class="empty-state" aria-label="No demo pages">
        <h2>No demo pages yet</h2>
        <p>Add <code>public/demo/example.html</code> or <code>public/demo/example/index.html</code>, then run <code>npm run dev</code> or <code>npm run build</code>.</p>
      </section>
    `;
  }

  const rows = files.map((file) => `
          <a class="demo-row" href="${escapeHtml(file.route)}">
            <span class="demo-main">
              <span class="demo-title">${escapeHtml(file.title)}</span>
              ${file.summary ? `<span class="demo-summary">${escapeHtml(file.summary)}</span>` : ''}
            </span>
            ${file.author ? `<span class="demo-author">@${escapeHtml(file.author)}</span>` : ''}
          </a>
  `.trim()).join('\n');

  return `
      <section class="demo-list" aria-label="Demo pages">
${rows.split('\n').map((line) => `        ${line}`).join('\n')}
      </section>
    `;
}

function renderPage(files) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alva Demo Index</title>
    <style>
      @font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Regular.ttf') format('truetype'); font-weight: 400; font-display: swap; }
      @font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Medium.ttf') format('truetype'); font-weight: 500; font-display: swap; }

      :root {
        color-scheme: light;
        --bg: #ffffff;
        --text-n9: rgba(0, 0, 0, 0.9);
        --text-n7: rgba(0, 0, 0, 0.7);
        --text-n5: rgba(0, 0, 0, 0.5);
        --text-n3: rgba(0, 0, 0, 0.3);
        --line-l05: rgba(0, 0, 0, 0.05);
        --line-l07: rgba(0, 0, 0, 0.07);
        --line-l12: rgba(0, 0, 0, 0.12);
        --line-l2: rgba(0, 0, 0, 0.2);
        --grey-g01: #fafafa;
        --main-m1: #49a3a6;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--bg);
        color: var(--text-n9);
        font-family: 'Delight', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      main {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding: 40px;
      }

      header {
        margin-bottom: 28px;
      }

      h1 {
        margin: 0;
        font-size: 36px;
        font-weight: 400;
        line-height: 44px;
        letter-spacing: 0;
        color: var(--text-n9);
      }

      .demo-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 72px;
        padding: 20px 0;
        border-top: 0.5px solid var(--line-l2);
        color: inherit;
        text-decoration: none;
        transition: opacity 140ms ease;
      }

      .demo-row:hover {
        opacity: 0.62;
      }

      .demo-row:first-child {
        border-top: 0;
      }

      .demo-row:focus-visible {
        outline: 2px solid var(--main-m1);
        outline-offset: -2px;
      }

      .demo-main {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .demo-title {
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 0.18px;
        color: var(--text-n9);
        overflow-wrap: anywhere;
      }

      .demo-author {
        flex: 0 0 auto;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.12px;
        color: var(--text-n5);
      }

      .demo-summary {
        font-size: 13px;
        line-height: 20px;
        letter-spacing: 0.13px;
        color: var(--text-n7);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .empty-state {
        border: 1px dashed var(--line-l12);
        border-radius: 8px;
        background: var(--grey-g01);
        padding: 24px;
      }

      h2 {
        margin: 0 0 6px;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-n9);
      }

      .empty-state p {
        margin: 0;
        color: var(--text-n7);
        font-size: 13px;
        line-height: 22px;
      }

      code {
        border-radius: 4px;
        background: var(--line-l05);
        padding: 2px 5px;
        color: var(--text-n7);
        font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
        font-size: 0.92em;
      }

      footer {
        margin-top: auto;
        padding-top: 24px;
        color: var(--text-n5);
        font-size: 12px;
        line-height: 20px;
      }

      @media (max-width: 680px) {
        main {
          padding: 28px 20px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Demo Index</h1>
      </header>
${renderList(files)}
      <footer>Generated from <code>public/demo</code>. Re-run <code>npm run demo:index</code> after adding pages.</footer>
    </main>
    <script src="/demo/_switcher.js" defer></script>
  </body>
</html>
`;
}

const files = (await collectHtmlFiles()).sort((left, right) =>
  collator.compare(left.relativePath, right.relativePath),
);

const SWITCHER_CSS = `
@font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Regular.ttf') format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Medium.ttf') format('truetype'); font-weight: 500; font-display: swap; }
.ads-root { position: fixed; bottom: 24px; right: 24px; z-index: 99999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif; }
.ads-menu { width: 520px; max-width: calc(100vw - 32px); border-radius: 8px; border: 1px solid rgba(0,0,0,0.12); background: #fff; padding: 8px; box-shadow: 0 12px 32px rgba(0,0,0,0.16); }
.ads-menu[hidden] { display: none; }
.ads-root button, .ads-root span { font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif; font-style: normal; }
.ads-item { display: flex; flex-direction: column; align-items: flex-start; width: 100%; border: 0; background: transparent; border-radius: 6px; padding: 9px 10px; text-align: left; cursor: pointer; font-weight: 400; transition: background 120ms ease; }
.ads-item:hover { background: #fafafa; }
.ads-item-active, .ads-item-active:hover { background: rgba(73,163,166,0.1); }
.ads-item-row { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 12px; }
.ads-item-label { font-size: 13px; font-weight: 400; line-height: 22px; letter-spacing: 0.13px; color: rgba(0,0,0,0.9); }
.ads-item-tag { flex: 0 0 auto; font-size: 10px; font-weight: 400; line-height: 14px; letter-spacing: 0.1px; color: #49a3a6; }
.ads-item-sub { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; font-weight: 400; line-height: 18px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5); }
.ads-divider { height: 1px; background: rgba(0,0,0,0.05); margin: 6px 0; }
.ads-bar { display: flex; flex-direction: column; align-items: stretch; gap: 10px; }
.ads-back, .ads-toggle { display: flex; align-items: center; justify-content: center; gap: 8px; width: 228px; max-width: calc(100vw - 32px); height: 40px; padding: 0 14px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12); font-family: inherit; font-size: 13px; font-weight: 500; line-height: 22px; letter-spacing: 0.13px; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.12); transition: transform 120ms ease; }
.ads-back span, .ads-toggle span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ads-back:hover, .ads-toggle:hover { transform: translateY(-1px); }
.ads-back { background: #fff; color: rgba(0,0,0,0.9); }
.ads-toggle { background: rgba(0,0,0,0.9); color: #fff; border-color: rgba(0,0,0,0.9); }
.ads-back svg, .ads-toggle svg { flex: 0 0 auto; }
@media (max-width: 640px) { .ads-root { bottom: 16px; right: 16px; } }
`.trim();

function renderSwitcherScript(files) {
  const demos = files.map((file) => ({ title: file.title, route: file.route }));
  return `// Auto-generated by scripts/generate-demo-index.mjs — do not edit by hand.
(function () {
  'use strict';
  var DEMOS = ${JSON.stringify(demos)};
  var STYLE = ${JSON.stringify(SWITCHER_CSS)};
  var INDEX_ROUTE = '/demo/';
  var APP_ROUTE = '/';
  var ARROW_LEFT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var MENU_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var path = location.pathname;
    var indexActive = path === INDEX_ROUTE || path === '/demo/index.html';
    var active = null;
    for (var i = 0; i < DEMOS.length; i++) {
      if (DEMOS[i].route === path) { active = DEMOS[i]; break; }
    }

    var style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);

    var root = document.createElement('div');
    root.className = 'ads-root';

    var menu = document.createElement('div');
    menu.className = 'ads-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'menu');

    function makeItem(label, sub, isActive, route) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ads-item' + (isActive ? ' ads-item-active' : '');
      var row = '<span class="ads-item-row"><span class="ads-item-label">' + esc(label) + '</span>' + (isActive ? '<span class="ads-item-tag">Current</span>' : '') + '</span>';
      var subline = sub ? '<span class="ads-item-sub">' + esc(sub) + '</span>' : '';
      b.innerHTML = row + subline;
      b.addEventListener('click', function () { go(route); });
      return b;
    }

    menu.appendChild(makeItem('Demo index', 'All available product demos', indexActive, INDEX_ROUTE));
    var divider = document.createElement('div');
    divider.className = 'ads-divider';
    menu.appendChild(divider);
    for (var j = 0; j < DEMOS.length; j++) {
      var d = DEMOS[j];
      menu.appendChild(makeItem(d.title, d.route, active && active.route === d.route, d.route));
    }

    var bar = document.createElement('div');
    bar.className = 'ads-bar';

    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'ads-back';
    backBtn.innerHTML = ARROW_LEFT + '<span>Back to Alva</span>';
    backBtn.addEventListener('click', function () { go(APP_ROUTE); });

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ads-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = MENU_ICON + '<span>' + esc(active ? active.title : 'Demos') + '</span>';
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      setOpen(menu.hidden);
    });

    bar.appendChild(toggle);
    bar.appendChild(backBtn);
    root.appendChild(menu);
    root.appendChild(bar);
    document.body.appendChild(root);

    function setOpen(open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function go(route) { if (route) location.href = route; }

    document.addEventListener('pointerdown', function (event) {
      if (!root.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  });
})();
`;
}

async function injectSwitcher(targetFiles) {
  let injected = 0;
  for (const file of targetFiles) {
    const absolutePath = path.join(demoDir, file.relativePath);
    const html = await readFile(absolutePath, 'utf8');
    if (html.includes('/demo/_switcher.js')) continue;

    const updated = html.includes('</body>')
      ? html.replace('</body>', `    ${switcherTag}\n  </body>`)
      : `${html}\n${switcherTag}\n`;
    await writeFile(absolutePath, updated);
    injected += 1;
  }
  return injected;
}

await writeFile(indexPath, renderPage(files).replace(/[ \t]+$/gm, ''));
await writeFile(switcherPath, renderSwitcherScript(files));
const injectedCount = await injectSwitcher(files);
console.log(`Generated ${path.relative(rootDir, indexPath)} with ${files.length} demo page${files.length === 1 ? '' : 's'}.`);
console.log(`Wrote ${path.relative(rootDir, switcherPath)}; injected switcher into ${injectedCount} page${injectedCount === 1 ? '' : 's'}.`);
