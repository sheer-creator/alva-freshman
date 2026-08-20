/* ========== markdown.js — tiny, safe-enough renderer for the static demo ==========
 * Feed output is Markdown-first. The Context Card only extracts the first standalone
 * image as primary media; headings, paragraphs, quotes, lists and links stay Markdown.
 */

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const safeUrl = (value = '') => {
  const url = String(value).trim();
  if (/^(https?:\/\/|img\/|\.\.?\/|\/(?!\/))/i.test(url)) return url;
  return '';
};

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, rawUrl) => {
    if (rawUrl.startsWith('source:')) {
      const id = rawUrl.slice(7).replace(/[^a-z0-9_-]/gi, '');
      return `<button class="md-link md-source" data-act="open-source" data-id="${id}">${label}</button>`;
    }
    const url = safeUrl(rawUrl);
    return url
      ? `<a class="md-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer" data-act="external-link">${label}</a>`
      : label;
  });
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>');
  return text;
}

const imageLine = (line) => line.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)$/);

export function splitMarkdown(markdown = '') {
  const lines = String(markdown).replaceAll('\r', '').split('\n');
  let hero = null;
  const body = [];
  for (const line of lines) {
    const image = imageLine(line);
    if (!hero && image) {
      const src = safeUrl(image[2]);
      if (src) { hero = { alt: image[1], src }; continue; }
    }
    body.push(line);
  }
  return { hero, body: body.join('\n').trim() };
}

export function renderMarkdown(markdown = '') {
  const lines = String(markdown).replaceAll('\r', '').split('\n');
  const html = [];
  let paragraph = [];
  let listOpen = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (!listOpen) return;
    html.push('</ul>');
    listOpen = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushParagraph(); closeList(); continue; }

    const image = imageLine(line);
    if (image) {
      flushParagraph(); closeList();
      const src = safeUrl(image[2]);
      if (src) html.push(`<figure class="md-image"><img src="${escapeHtml(src)}" alt="${escapeHtml(image[1])}" loading="lazy"></figure>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph(); closeList();
      const level = Math.min(Math.max(heading[1].length, 2), 4);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph(); closeList();
      html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!listOpen) { html.push('<ul>'); listOpen = true; }
      html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(line);
  }

  flushParagraph(); closeList();
  return html.join('');
}
