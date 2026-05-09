import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const demoDir = path.join(rootDir, 'public', 'demo');
const indexPath = path.join(demoDir, 'index.html');

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
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

    const metadata = await stat(absolutePath);
    files.push({
      title: titleFromRelativePath(relativePath),
      route: routeFromRelativePath(relativePath),
      relativePath: relativePath.replaceAll(path.sep, '/'),
      size: metadata.size,
    });
  }

  return files;
}

function renderList(files) {
  if (files.length === 0) {
    return `
      <section class="empty-state" aria-label="No demo pages">
        <span class="empty-mark">/</span>
        <div>
          <h2>No demo pages yet</h2>
          <p>Add <code>public/demo/example.html</code> or <code>public/demo/example/index.html</code>, then run <code>npm run dev</code> or <code>npm run build</code>.</p>
        </div>
      </section>
    `;
  }

  const rows = files.map((file) => `
          <a class="demo-row" href="${escapeHtml(file.route)}">
            <span class="demo-main">
              <span class="demo-title">${escapeHtml(file.title)}</span>
              <span class="demo-path">${escapeHtml(file.route)}</span>
            </span>
            <span class="demo-meta">
              <span>HTML</span>
              <span>${escapeHtml(formatBytes(file.size))}</span>
            </span>
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
      :root {
        color-scheme: light;
        --bg: #f4f5ef;
        --panel: #fcfdf9;
        --ink: #141712;
        --muted: #626a5c;
        --line: #d8dece;
        --line-strong: #b8c2aa;
        --accent: #2f5d43;
        --accent-soft: #e4ecde;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          linear-gradient(135deg, rgba(47, 93, 67, 0.08), transparent 34%),
          var(--bg);
        color: var(--ink);
        font-family:
          ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
      }

      main {
        width: min(960px, calc(100% - 40px));
        margin: 0 auto;
        padding: 56px 0;
      }

      header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: end;
        margin-bottom: 24px;
        border-bottom: 1px solid var(--line);
        padding-bottom: 20px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(32px, 5vw, 56px);
        line-height: 0.95;
        letter-spacing: 0;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.65;
      }

      .count {
        flex: 0 0 auto;
        border: 1px solid var(--line-strong);
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
      }

      .demo-list {
        border: 1px solid var(--line);
        border-radius: 8px;
        overflow: hidden;
        background: var(--panel);
        box-shadow: 0 18px 60px rgba(20, 23, 18, 0.08);
      }

      .demo-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        min-height: 72px;
        padding: 16px 18px;
        color: inherit;
        text-decoration: none;
        border-top: 1px solid var(--line);
        transition:
          background 140ms ease,
          transform 140ms ease;
      }

      .demo-row:first-child {
        border-top: 0;
      }

      .demo-row:hover {
        background: #f0f5ea;
      }

      .demo-row:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: -2px;
      }

      .demo-main {
        display: grid;
        gap: 5px;
        min-width: 0;
      }

      .demo-title {
        font-size: 17px;
        font-weight: 750;
        overflow-wrap: anywhere;
      }

      .demo-path {
        color: var(--muted);
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        font-size: 12px;
        overflow-wrap: anywhere;
      }

      .demo-meta {
        display: flex;
        gap: 10px;
        color: var(--muted);
        font-size: 12px;
        white-space: nowrap;
      }

      .empty-state {
        display: flex;
        gap: 18px;
        border: 1px dashed var(--line-strong);
        border-radius: 8px;
        background: rgba(252, 253, 249, 0.76);
        padding: 24px;
      }

      .empty-mark {
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 24px;
        font-weight: 800;
      }

      h2 {
        margin: 0 0 6px;
        font-size: 18px;
      }

      code {
        border-radius: 4px;
        background: #e9eee2;
        padding: 2px 5px;
        color: #252b21;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        font-size: 0.93em;
      }

      footer {
        margin-top: 18px;
        color: var(--muted);
        font-size: 12px;
      }

      @media (max-width: 680px) {
        main {
          width: min(100% - 28px, 960px);
          padding: 32px 0;
        }

        header,
        .demo-row {
          align-items: flex-start;
          flex-direction: column;
        }

        .demo-meta {
          width: 100%;
          justify-content: space-between;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <h1>Demo Index</h1>
          <p>Standalone product-design pages served from <code>/demo</code>.</p>
        </div>
        <span class="count">${files.length} ${files.length === 1 ? 'page' : 'pages'}</span>
      </header>
${renderList(files)}
      <footer>Generated from <code>public/demo</code>. Re-run <code>npm run demo:index</code> after adding pages.</footer>
    </main>
  </body>
</html>
`;
}

const files = (await collectHtmlFiles()).sort((left, right) =>
  collator.compare(left.relativePath, right.relativePath),
);

await writeFile(indexPath, renderPage(files).replace(/[ \t]+$/gm, ''));
console.log(`Generated ${path.relative(rootDir, indexPath)} with ${files.length} demo page${files.length === 1 ? '' : 's'}.`);
