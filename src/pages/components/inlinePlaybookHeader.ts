import headerCss from './playbook-header.css?raw';
import headerJs from './playbook-header.js?raw';
import panelCss from './discussion-panel.css?raw';
import panelJs from './discussion-panel.js?raw';
import tokensCss from '../../styles/tokens.css?raw';

const TOKENS_LINK = '<link rel="stylesheet" href="./styles/tokens.css" />';
const CSS_LINK = '<link rel="stylesheet" href="./components/playbook-header.css" />';
const JS_SCRIPT = '<script src="./components/playbook-header.js" defer></script>';
const PANEL_CSS_LINK = '<link rel="stylesheet" href="./components/discussion-panel.css" />';
const PANEL_JS_SCRIPT = '<script src="./components/discussion-panel.js" defer></script>';

function escapeScript(src: string): string {
  return src.replace(/<\/script>/gi, '<\\/script>');
}

// playbook-header.js was authored against Infant's /alva-infant/ deploy base.
// Rebase to the host project's actual BASE_URL so /alva-infant/foo.svg becomes
// e.g. /foo.svg in Freshman (root deploy) and stays /alva-infant/foo.svg in Infant.
function rebaseAssets(src: string): string {
  return src.replace(/\/alva-infant\//g, import.meta.env.BASE_URL);
}

/**
 * Playbook HTML files reference design tokens, header CSS and header JS via
 * relative <link>/<script> tags. When injected into an iframe via `srcDoc`,
 * relative URLs resolve against `about:srcdoc` and fail — so swap them for
 * inline <style>/<script> blocks.
 */
export function inlinePlaybookHeader(html: string): string {
  return html
    .replace(TOKENS_LINK, `<style>${tokensCss}</style>`)
    .replace(CSS_LINK, `<style>${headerCss}</style>`)
    .replace(JS_SCRIPT, `<script>${escapeScript(rebaseAssets(headerJs))}</script>`)
    .replace(PANEL_CSS_LINK, `<style>${panelCss}</style>`)
    .replace(PANEL_JS_SCRIPT, `<script>${escapeScript(rebaseAssets(panelJs))}</script>`);
}
