import{j as e}from"./index-C4zPU4B7.js";import{A as t}from"./AppShell-DDhMQjNL.js";import{i as a}from"./inlinePlaybookHeader-BCaIwBIO.js";import"./referral-mock-BqTpnbXF.js";const i=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Template-Screener - Alva</title>
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./components/playbook-header.css" />
<link rel="stylesheet" href="./components/discussion-panel.css" />
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"><\/script>
<script src="./components/playbook-header.js" defer><\/script>
<script src="./components/discussion-panel.js" defer><\/script>
<style>
    /* ── Page-specific theme (everything else comes from tokens.css) ── */
    :root {
        --theme-color: #4A6B5A;
        --theme-color-soft: rgba(74,107,90,0.10);
        --theme-grad:  linear-gradient(135deg, #4A6B5A 0%, #2C3E33 100%);
    }

    html { height: 100%; overflow: hidden; }
    body {
        height: 100%; overflow-y: auto; overflow-x: hidden;
        margin: 0; padding: 0;
        background: var(--b0-page, #ffffff);
        color: var(--text-n9);
        font-family: Delight, -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }
    * { -ms-overflow-style: none; scrollbar-width: none; box-sizing: border-box; }
    *::-webkit-scrollbar { display: none; }

    .playbook-container {
        width: 100%; max-width: 2048px; margin: 0 auto;
        padding: 0 var(--sp-xxl) var(--sp-xxxl);
    }

    /* ── PLAYBOOK HEADER styles moved to ./components/playbook-header.css ── */

    /* ── Chat FAB (always bottom-right on every playbook page) ── */
    @keyframes fabBreathe {
        0%, 100% { box-shadow: 0 0 0 0 rgba(73,163,166,0.5), 0 4px 16px rgba(0,0,0,0.15); }
        50%      { box-shadow: 0 0 12px 4px rgba(73,163,166,0.35), 0 4px 16px rgba(0,0,0,0.15); }
    }
    .chat-fab {
        position: fixed;
        right: 28px; bottom: 28px;
        display: inline-flex; align-items: center; gap: 8px;
        height: 40px; padding: 0 12px 0 6px;
        background: #49A3A6;
        color: #fff;
        border: 0.5px solid rgba(0,0,0,0.7); border-radius: var(--radius-btn-m);
        font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
        cursor: pointer;
        z-index: 1000;
        animation: fabBreathe 3s ease-in-out infinite;
        transition: background 0.2s ease;
    }
    .chat-fab:hover {
        background: linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), #49A3A6;
    }
    .chat-fab-icon {
        flex-shrink: 0;
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 28px;
        background: #2a2a38;
        border-radius: 6px;
    }
    .chat-fab-icon svg { width: 14px; height: 14px; display: block; }
    .chat-fab-label {
        font-size: 14px; font-weight: 500;
        line-height: 22px; letter-spacing: 0.14px;
        color: #fff; white-space: nowrap;
    }

    /* ══════════════════════════════════════════
       CONTENT
       ══════════════════════════════════════════ */
    .content {
        margin-top: var(--sp-xl);
        display: flex; flex-direction: column;
        gap: var(--sp-xl);
    }

    .section-title {
        display: flex; align-items: baseline;
        gap: var(--sp-s);
    }
    .section-title-text {
        font-size: 18px; font-weight: 400;
        color: var(--text-n9); letter-spacing: 0.18px;
        line-height: 26px;
    }
    .section-title-sub {
        font-size: 11px; color: var(--text-n5);
        padding-left: var(--sp-xs);
        border-left: 1px solid var(--line-l07);
    }

    .widget-card { background: transparent; display: flex; flex-direction: column; }
    .widget-title {
        display: flex; align-items: center; justify-content: space-between;
        height: 22px; margin-bottom: var(--sp-m);
    }
    .widget-title-text {
        font-size: 14px; color: var(--text-n9);
        letter-spacing: 0.14px; line-height: 22px;
    }
    .widget-timestamp {
        display: flex; align-items: center; gap: var(--sp-xxs);
        font-size: 12px; color: var(--text-n5); line-height: 20px;
    }
    .clock-icon {
        width: 12px; height: 12px;
        border: 1px solid currentColor;
        border-radius: 50%; position: relative; flex-shrink: 0;
    }
    .clock-icon::before {
        content:''; position:absolute; width:3px; height:1px;
        background:currentColor; top:4px; left:3.5px;
    }
    .clock-icon::after {
        content:''; position:absolute; width:1px; height:3px;
        background:currentColor; top:2px; left:5px;
    }
    .card-body {
        background: var(--grey-g01);
        border-radius: var(--r-m);
        padding: var(--sp-l); position: relative;
    }

    .row { display: grid; gap: var(--sp-xl); }
    .row-3col { grid-template-columns: 1fr 1fr 1fr; }

    .ptable { width: 100%; border-collapse: collapse; }
    .ptable th {
        text-align: left; padding: 10px 12px;
        font-size: 11px; color: var(--text-n5);
        font-weight: 400; letter-spacing: 0.22px;
        text-transform: uppercase;
        border-bottom: 1px solid var(--line-l07);
    }
    .ptable td {
        padding: 12px; font-size: 13px;
        color: var(--text-n9); letter-spacing: 0.13px;
        border-bottom: 1px solid var(--line-l05);
        vertical-align: middle;
    }
    .ptable tr:last-child td { border-bottom: none; }
    .ticker { display: inline-flex; align-items: center; gap: 8px; }
    .ticker-logo {
        width: 24px; height: 24px; border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        font-size: 10px; font-weight: 500; color: white;
    }
    .pos { color: var(--main-m3); }
    .neg { color: var(--main-m4); }

    .kpi-tile {
        background: var(--grey-g01);
        border-radius: var(--r-m);
        padding: var(--sp-l);
        display: flex; flex-direction: column; gap: 6px;
    }
    .kpi-label {
        font-size: 12px; color: var(--text-n5);
        letter-spacing: 0.12px;
    }
    .kpi-val {
        font-size: 28px; color: var(--text-n9);
        letter-spacing: -0.3px; font-weight: 400;
    }
    .kpi-delta {
        font-size: 12px; letter-spacing: 0.12px;
    }

    /* Signal Feed (per Trading Strategy playbook spec §5) */
    .signal-feed {
        width: 100%;
        display: flex; flex-direction: column;
    }
    .signal-feed-card {
        padding: 20px 0;
        border-bottom: 1px solid var(--line-l07);
    }
    .signal-feed-card:first-child { padding-top: 0; }
    .signal-feed-card:last-child { border-bottom: none; padding-bottom: 0; }
    .feed-header {
        display: flex; align-items: center; justify-content: space-between;
        gap: var(--sp-s);
    }
    .feed-strategy-name {
        font-size: 16px; font-weight: 500;
        color: var(--text-n9); line-height: 26px;
        letter-spacing: 0.16px;
    }
    .feed-timestamp {
        font-size: 12px; color: var(--text-n5);
        line-height: 20px; letter-spacing: 0.12px;
        white-space: nowrap; flex-shrink: 0;
    }
    .feed-description {
        font-size: 16px; color: var(--text-n9);
        line-height: 26px; letter-spacing: 0.16px;
        margin-top: 12px;
    }
    .feed-indicators {
        list-style: disc; padding-left: 20px;
        font-size: 16px; color: var(--text-n9);
        line-height: 26px; letter-spacing: 0.16px;
        margin: 8px 0 0 0;
    }
    .feed-indicators li::marker { color: var(--text-n3); }

    .feed-list {
        display: flex; flex-direction: column;
        background: var(--grey-g01);
        border-radius: var(--r-m);
        overflow: hidden;
    }
    .feed-item {
        padding: var(--sp-s) var(--sp-m);
        display: flex; align-items: flex-start; gap: var(--sp-s);
        border-bottom: 1px solid var(--line-l05);
    }
    .feed-item:last-child { border-bottom: none; }
    .feed-date {
        font-size: 11px; color: var(--text-n5);
        letter-spacing: 0.22px; text-transform: uppercase;
        white-space: nowrap; padding-top: 2px; flex-shrink: 0;
        min-width: 54px;
    }
    .feed-body { flex: 1; min-width: 0; }
    .feed-title {
        font-size: 13px; color: var(--text-n9);
        letter-spacing: 0.13px; margin-bottom: 2px;
    }
    .feed-meta {
        font-size: 11px; color: var(--text-n5);
        letter-spacing: 0.11px;
    }
    .feed-tag {
        display: inline-block;
        font-size: 10px;
        background: var(--theme-color-soft);
        color: var(--theme-color);
        padding: 1px 6px; border-radius: 3px;
        letter-spacing: 0.2px; text-transform: uppercase;
        margin-right: 6px;
    }
    .feed-meta-body { line-height: 1.75; }
    .feed-meta-body + .feed-meta-body { margin-top: 4px; }
    .feed-link {
        color: var(--theme-color);
        text-decoration: none;
        word-break: break-all;
    }
    .feed-link:hover { text-decoration: underline; }
    .feed-push-body {
        padding: 0 0 0 24px;
        font-size: 13px; line-height: 1.75;
        color: rgba(0,0,0,0.75); letter-spacing: 0.13px;
    }
  @font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Regular.ttf') format('truetype'); font-weight: 400; }
  @font-face { font-family: 'Delight'; src: url('https://alva-ai-static.b-cdn.net/fonts/Delight-Medium.ttf') format('truetype'); font-weight: 500; }

  * { margin:0; padding:0; box-sizing:border-box; -ms-overflow-style:none; scrollbar-width:none; }
  *::-webkit-scrollbar { display:none; }

  strong, b { font-weight: 500; }

  html { height:100%; overflow:hidden; }
  body {
    height:100%; overflow-y:auto; overflow-x:hidden;
    font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;
    font-weight:400;
    background:var(--b0-page);
    color:var(--text-n9);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-rendering:optimizeLegibility;
  }
  button, input, select, textarea { font-family: inherit; }

  .playbook-container {
    width:100%; max-width:2048px; margin:0 auto;
    padding: var(--spacing-xl) var(--spacing-xxl) var(--spacing-xxxxl);
    display:flex; flex-direction:column; gap: var(--spacing-xl);
  }

  .playbook-header {
    display:flex; align-items:center; flex-wrap:wrap;
    row-gap:8px; margin-bottom: var(--spacing-xs);
  }
  .playbook-title {
    font-size:24px; font-weight:400; color:var(--text-n9);
    line-height:34px; margin:0; white-space:nowrap;
    margin-right:auto;
  }

  .header-meta {
    display:flex; align-items:center; gap:8px; flex-wrap:wrap;
    font-size:12px; color:var(--text-n5);
  }
  .header-meta .refresh-badge {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(73,163,166,0.10); color:var(--main-m1);
    padding:0 10px; border-radius:4px; height:28px;
    font-size:12px; font-weight:400;
  }
  .header-meta .refresh-badge::before {
    content:''; width:6px; height:6px; border-radius:50%;
    background:var(--main-m3); animation:pulse 2s ease-in-out infinite;
  }
  .header-meta .last-updated {
    display:inline-flex; align-items:center; gap:6px;
    border:1px solid var(--line-l07); color:var(--text-n5);
    padding:0 10px; border-radius:4px; height:28px;
    font-size:12px;
  }
  .header-meta .last-updated::before {
    content:''; display:inline-block; width:6px; height:6px;
    background:var(--main-m3); border-radius:50%;
    flex-shrink:0;
  }
  .header-meta .stale-pill {
    background:rgba(212,133,0,0.12); color:#d48500;
    padding:1px 6px; border-radius:3px;
    font-size:10px; font-weight:500; letter-spacing:0.3px;
  }

  .playbook-desc {
    font-size:14px; line-height:22px; letter-spacing:0.14px;
    color:var(--text-n5);
  }

  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  @keyframes spin { to { transform:rotate(360deg); } }

  /* ── Tabs (Alva Underline; .tab-l keeps the original 16px size) ── */
  .tab-wrapper-row .tab-snapshot .filter-dropdown-menu { left:auto; right:0; }
  .tab-wrapper-row {
    display:flex; align-items:flex-end; justify-content:space-between;
    gap: var(--spacing-m); flex-wrap:nowrap;
    border-bottom: 1px solid var(--line-l07);
  }
  .tab.tab-underline {
    display:flex; align-items:center; flex:1 1 auto; min-width:0;
    gap: var(--spacing-m);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tab.tab-underline::-webkit-scrollbar { display:none; }
  .tab.tab-underline .tab-item { flex-shrink:0; white-space:nowrap; }
  .tab-wrapper-row .tab-snapshot { flex-shrink:0; align-self:flex-end; padding-bottom:9px; }
  .tab-wrapper-row .tab-right-group {
    display:flex; align-items:center; gap: var(--spacing-xs);
    flex-shrink:0; align-self:flex-end; padding-bottom:11px;
  }
  .tab-wrapper-row .tab-right-group .tab-snapshot { padding-bottom:0; }
  .tab-wrapper-row .tab-readme { cursor:pointer; }
  .tab-wrapper-row .tab-right-group:has(#snap-filter[style*="none"]) .pb-meta-sep { display:none; }
  .tab-underline .tab-item {
    padding-bottom: var(--spacing-xxs);
    color: var(--text-n7);
    border-bottom: 2px solid transparent;
    cursor: pointer; user-select: none;
    transition: color .15s, border-color .15s;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.14px;
  }
  .tab-underline.tab-l { gap: var(--spacing-l); }
  .tab-underline.tab-l .tab-item {
    padding-bottom: 6px;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.16px;
  }
  .tab-underline .tab-item:hover { color: var(--text-n9); }
  .tab-underline .tab-item.active {
    color: var(--text-n9);
    font-weight: 500;
    border-bottom-color: var(--main-m1);
  }
  .tab-item::after {
    content: attr(data-text);
    font-weight: 500; visibility: hidden;
    height: 0; display: block; overflow: hidden;
  }
  .tab-panel { display:none; }
  .tab-panel.active { display:block; }

  /* ── Tab-bar README (chip style, scoped to .tab-readme only) ── */
  .pb-meta-link--readme.tab-readme {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xxs);
    height: 24px;
    padding: var(--spacing-xxxs) var(--spacing-xs);
    background: var(--b-r02);
    border: 0.5px solid var(--line-l2);
    border-radius: var(--radius-ct-s);
    font-family: inherit;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.12px;
    color: var(--text-n9);
    transition: background .15s, border-color .15s;
  }
  .pb-meta-link--readme.tab-readme .pb-meta-icon-badge {
    width: 14px; height: 14px;
    font-size: 12px;
    background: transparent;
    border: none;
    border-radius: 0;
  }
  .pb-meta-link--readme.tab-readme .pb-meta-icon-img {
    width: 14px; height: 14px;
  }
  .pb-meta-link--readme.tab-readme:hover,
  .pb-meta-link--readme.tab-readme:active,
  .pb-meta-link--readme.tab-readme.is-open {
    background: var(--b-r03);
    border-color: var(--line-l9);
    opacity: 1;
  }
  .pb-meta-link--readme.tab-readme:hover .pb-meta-icon-badge {
    background: transparent;
    border: none;
  }
  .pb-meta-link--readme.tab-readme:hover .pb-meta-icon-img {
    filter: brightness(0);
  }

  /* ── Snapshot picker dropdown (chip style) ── */
  .filter-dropdown { position:relative; display:inline-flex; align-items:center; }
  .filter-dropdown-trigger {
    background: var(--b-r02);
    border: 0.5px solid var(--line-l2);
    border-radius: var(--radius-ct-s);
    height: 24px;
    padding: var(--spacing-xxxs) var(--spacing-xs);
    margin: 0;
    font-family:inherit; font-size:12px; color:var(--text-n9);
    cursor:pointer; display:inline-flex; align-items:center; gap: var(--spacing-xxs);
    line-height:20px; letter-spacing: 0.12px;
    transition: background .15s, border-color .15s, color .15s;
  }
  .filter-dropdown-trigger:hover,
  .filter-dropdown-trigger:active { background: var(--b-r03); border-color: var(--line-l9); }
  .filter-dropdown.open .filter-dropdown-trigger { border-color: var(--line-l9); }
  .filter-dropdown-label { color:var(--text-n5); font-size:12px; }
  .filter-dropdown-value { color:var(--text-n9); display:inline-flex; align-items:baseline; gap:4px; }
  .filter-dropdown-value-sub { font-size:12px; color:var(--text-n5); letter-spacing: 0.12px; }
  .filter-dropdown-caret {
    display:inline-block; width:12px; height:12px;
    background-color:var(--text-n2);
    -webkit-mask:url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') no-repeat center / contain;
            mask:url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') no-repeat center / contain;
    transition:transform .15s, background-color .15s;
  }
  .filter-dropdown.open .filter-dropdown-caret { transform:rotate(180deg); background-color:var(--text-n2); }
  .filter-dropdown-menu {
    position:absolute; top:calc(100% + 6px); left:0;
    min-width:220px; background:var(--b0-container);
    border:0.5px solid var(--line-l2); border-radius:var(--radius-pop-dropdown);
    box-shadow:var(--shadow-s);
    padding:4px; z-index:100; display:none;
  }
  .filter-dropdown.open .filter-dropdown-menu { display:block; }
  .filter-dropdown-item {
    display:flex; align-items:baseline; justify-content:space-between;
    padding:8px 12px; font-family:inherit; font-size:14px;
    color:var(--text-n9); background:transparent; border:none;
    cursor:pointer; width:100%; border-radius:4px; text-align:left;
    line-height:22px;
  }
  .filter-dropdown-item:hover { background:var(--grey-g01); }
  .filter-dropdown-item.active {
    background:rgba(73,163,166,0.08); color:var(--main-m1);
  }
  .filter-dropdown-item-sub {
    font-size:11px; color:var(--text-n5); margin-left:12px;
  }

  /* ── Widgets (Alva base) ── */
  .widget-card { background: transparent; display:flex; flex-direction: column; position: relative; overflow: visible; }
  .widget-card:has(.chart-body) { overflow: hidden; }
  .free-text-body { padding: var(--spacing-l); }
  .widget-title {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom: var(--spacing-m);
  }
  .widget-title:has(+ .analysis-caption) { margin-bottom: var(--spacing-xs); }
  .widget-title-text,
  .movers-section-title,
  .method-section h3 {
    font-size: 16px; font-weight: 400; color: var(--text-n9);
    letter-spacing: 0.16px; line-height: 22px;
  }
  .expand-panel .widget-title-text { font-size: 14px; letter-spacing: 0.14px; }
  .widget-timestamp {
    display:inline-flex; align-items:center; gap: var(--spacing-xxs);
    font-size: 12px; color: var(--text-n5); line-height: 20px; letter-spacing: 0.12px;
  }
  .widget-body {
    display:flex; align-items:center; justify-content:space-between;
    border-radius: var(--radius-ct-l);
  }
  .chart-dotted-background {
    background-image: radial-gradient(circle, rgba(0,0,0,0.18) 0.6px, transparent 0.6px);
    background-size: 3px 3px;
  }
  .chart-body {
    flex:1; padding: var(--spacing-m); position: relative; width:100%;
  }
  .chart-legend {
    display:flex; align-items:center; justify-content:flex-end;
    gap: var(--spacing-xs); height:16px; margin-bottom: var(--spacing-xxs);
  }
  .legend-item {
    display:flex; align-items:center; gap: var(--spacing-xxs);
    font-size:10px; letter-spacing:0.1px; color: var(--text-n5);
  }
  .legend-line { width:12px; height:2px; border-radius:0.5px; }
  .legend-rect { width:8px; height:8px; border-radius:0.5px; }
  .legend-dot  { width:8px; height:8px; border-radius:50%; }
  .alva-watermark {
    position:absolute; bottom: var(--spacing-m); right: var(--spacing-m);
    opacity: 0.2; line-height: 0;
  }
  .widget-grid {
    display:grid; grid-template-columns: repeat(8, 1fr);
    gap: var(--spacing-xl); align-items: stretch;
  }
  .col-2 { grid-column: span 2; }
  .col-4 { grid-column: span 4; }
  .col-6 { grid-column: span 6; }
  .col-8 { grid-column: span 8; }
  .widget-card .widget-body.fill { flex: 1; height: 0; }
  @media (max-width:768px) {
    .widget-grid { grid-template-columns: repeat(4, 1fr); gap: var(--spacing-l); }
    .col-2, .col-4, .col-6, .col-8 { grid-column: span 4; }
  }

  /* ── Tables (Alva) ── */
  .table-card { display:flex; flex-direction:column; width:100%; border-radius: var(--radius-ct-l); isolation: isolate; overflow-x: auto; }
  .table-row { display:flex; width:100%; gap: var(--spacing-m); border-bottom: 1px solid var(--line-l07); }
  .table-row:last-child { border-bottom: none; }
  .table-cell {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    font-weight: 400; white-space: nowrap;
    display:flex; align-items: center;
  }
  .table-header .table-cell { color: var(--text-n7); padding: 0 0 var(--spacing-s) 0; }
  .table-body .table-row .table-cell { color: var(--text-n9); padding: var(--spacing-s) 0; }

  /* ── Overview rankings list — 16px horizontal inset on content,
         dividers span full table-card width. Inset provided by a leading
         edge pseudo and a trailing spacer cell so inset stays visible when
         overflow-x scrolls. ── */
  /* Row is its own box (min-width: max-content) so its background + bottom border
     cover every cell — including cells that overflow the visible card width
     during horizontal scroll. */
  #rankings-table .table-row {
    position: relative;
    padding-left: var(--spacing-m);
    box-sizing: border-box;
    min-width: max-content;
    border-bottom: 1px solid var(--line-l07);
  }
  #rankings-table .expand-panel { position: sticky; left: 0; padding: var(--spacing-xl) var(--spacing-m) var(--spacing-xxl); box-sizing: border-box; border-bottom: 1px solid var(--line-l07); }
  /* Pin the caret column to the right edge. Cell is 40px wide (24px caret + 16px
     inset absorbed via padding-right) and pinned at right:0. */
  #rankings-table .caret-cell {
    position: sticky; right: 0; z-index: 2;
    background: var(--b0-page);
  }
  /* Hover overlay sits above all cells so tint is uniform across sticky and
     non-sticky cells (avoids double-stacking of semi-transparent var(--b-r02)). */
  #rankings-table .table-row.expandable::after {
    content: ''; position: absolute; inset: 0;
    background: transparent; pointer-events: none;
    z-index: 3; transition: background .15s;
  }
  #rankings-table .table-row.expandable:hover::after { background: var(--b-r02); }
  /* When a row is expanded, hide its divider — the expand-panel carries the divider instead */
  #rankings-table .table-row.expandable.open { border-bottom-color: transparent; }
  #rankings-table > .table-body > .table-row:last-child { border-bottom: none; }
  #rankings-table > .table-body > .expand-panel:last-child { border-bottom: none; }

  /* ── Score visuals ── */
  .score-cell { display:flex; align-items:center; gap: var(--spacing-xxs); }
  .score-bar-track { width: 64px; height: 4px; background: var(--line-l07); border-radius: 2px; overflow: hidden; flex-shrink: 0; }
  .score-bar-fill { height: 100%; border-radius: 2px; transition: width .4s; }
  .score-value { font-size: 14px; font-weight:400; min-width: 24px; letter-spacing: 0.14px; }

  /* ── Tag-style pills (Alva Tag · tinted) ── */
  .band-pill, .flag-pill, .delta-tag {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400; white-space: nowrap;
    min-width: 40px; padding: 1px 6px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    border-radius: var(--radius-ct-s);
  }
  .band-pill.elite   { background: var(--main-m3-10); color: var(--main-m3); font-weight:400; }
  .band-pill.strong  { background: var(--main-m1-10); color: var(--main-m1); font-weight:400; }
  .band-pill.average { background: var(--main-m5-10); color: var(--main-m5); font-weight:400; }
  .band-pill.weak    { background: var(--main-m4-10); color: var(--main-m4); font-weight:400; }

  .delta-tag { gap: 2px; font-weight:400; }
  .delta-up    { background: var(--main-m3-10); color: var(--main-m3); }
  .delta-down  { background: var(--main-m4-10); color: var(--main-m4); }
  .delta-flat  { background: var(--b-r05); color: var(--text-n5); }
  .delta-new   { background: var(--main-m1-10); color: var(--main-m1); }
  .delta-score { font-size: 11px; color: var(--text-n5); margin-left: var(--spacing-xxs); letter-spacing: 0.11px; }
  .delta-score.up   { color: var(--main-m3); }
  .delta-score.down { color: var(--main-m4); }

  .flag-pill { gap: 4px; font-weight:400; }
  .flag-pill.clean { background: var(--b-r05); color: var(--text-n5); font-weight: 400; }
  .flag-pill.soft  { background: var(--main-m5-10); color: var(--main-m5); }
  .flag-pill.hard  { background: var(--main-m4-10); color: var(--main-m4); }
  .flag-pill .flag-extra-count {
    color: var(--text-n7);
    font-size: 10px; font-weight: 400;
    line-height: 16px; margin-left: 2px;
  }

  /* ── Expandable row / expand panel (Alva: grey-g01, no borders) ── */
  .table-row.expandable { cursor: pointer; transition: background .15s, box-shadow .15s; }
  /* Hover row bg bleeds through the 16px parent padding on both sides */
  #rankings-table .table-row.expandable:hover {
    box-shadow:
      calc(-1 * var(--spacing-m)) 0 0 var(--b-r02),
      var(--spacing-m) 0 0 var(--b-r02);
  }
  .expand-caret {
    display:inline-block; width: 12px; height: 12px;
    background-color: var(--text-n3);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') no-repeat center / contain;
            mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') no-repeat center / contain;
    transition: transform .2s, background-color .15s;
  }
  .table-row.expandable.open .expand-caret { transform: rotate(180deg); }
  .expand-panel {
    background: transparent;
    animation: expandFade .25s ease;
  }
  @keyframes expandFade { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform: translateY(0); } }
  .breakdown-title {
    font-size: 12px; color: var(--text-n5); letter-spacing: 0.12px;
    margin-bottom: var(--spacing-s);
  }
  .breakdown-row {
    display:flex; align-items: center; padding: var(--spacing-xs) 0;
    font-size: 14px; gap: var(--spacing-s);
    border-bottom: 1px solid var(--line-l05);
  }
  .breakdown-row:last-child { border-bottom: none; }
  .breakdown-name { width: 110px; color: var(--text-n9); font-weight:400; letter-spacing: 0.14px; }
  .breakdown-bar {
    flex:1; height: 6px; background: var(--line-l07);
    border-radius: 3px; overflow: hidden; min-width: 60px;
  }
  .breakdown-bar-fill { height: 100%; border-radius: 3px; transition: width .5s; }
  .breakdown-raw { width: 72px; text-align: right; color: var(--text-n7); font-size: 12px; font-variant-numeric: tabular-nums; letter-spacing: 0.12px; }
  .breakdown-pts { width: 68px; text-align: right; color: var(--text-n9); font-weight:400; font-size: 12px; font-variant-numeric: tabular-nums; letter-spacing: 0.12px; }

  /* ── Expand chart row ── */
  .expand-charts {
    margin-top: var(--spacing-xl);
  }
  .kline-empty { padding: 40px 20px; text-align: center; font-size: 12px; color: var(--text-n5); }

  /* ── Flag cards (Alva: no border, accent bar only) ── */
  .flag-cards {
    margin-top: var(--spacing-xl);
    display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--spacing-xs);
  }
  .flag-card {
    background: var(--grey-g01);
    border-radius: var(--radius-ct-l);
    padding: var(--spacing-s) var(--spacing-m) var(--spacing-s) calc(var(--spacing-m) + 3px);
    font-size: 12px; line-height: 20px;
    position: relative; overflow: hidden;
  }
  .flag-card::before {
    content:""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  }
  .flag-card.hard::before { background: var(--main-m4); }
  .flag-card.soft::before { background: var(--main-m5); }
  .flag-card-title {
    font-weight:400; font-size: 12px; margin-bottom: var(--spacing-xxs);
    display:flex; align-items: center; gap: var(--spacing-xxs);
    letter-spacing: 0.12px;
  }
  .flag-card.hard .flag-card-title { color: var(--main-m4); }
  .flag-card.soft .flag-card-title { color: var(--main-m5); }
  .flag-card-tier {
    font-size: 10px; padding: 1px 6px; border-radius: var(--radius-ct-xs);
    letter-spacing: 0.1px; font-weight:400; line-height: 16px;
  }
  .flag-card.hard .flag-card-tier { background: var(--main-m4-10); }
  .flag-card.soft .flag-card-tier { background: var(--main-m5-10); }
  .flag-card-threshold {
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    background: var(--b-r02); padding: 1px 6px; border-radius: var(--radius-ct-xs);
    color: var(--text-n7); letter-spacing: 0.11px;
  }
  .flag-card-body { color: var(--text-n7); margin-top: var(--spacing-xxs); letter-spacing: 0.12px; }

  /* ── Movers (Alva: grey-g01 KPI-card style) ── */
  .movers-section-title {
    margin-bottom: var(--spacing-s); display:flex; align-items: center;
    gap: var(--spacing-xs);
  }
  .movers-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-m); }
  @media (max-width:768px) { .movers-grid { grid-template-columns: repeat(2, 1fr); } }
  .mover-card {
    background: var(--grey-g01); border-radius: var(--radius-ct-l);
    padding: var(--spacing-m) var(--spacing-l) var(--spacing-xs); min-height: 160px;
  }
  .mover-card-header { display:flex; align-items: center; gap: var(--spacing-xs); margin-bottom: var(--spacing-s); min-width:0; }
  .mover-icon {
    width: 22px; height: 22px; border-radius: var(--radius-ct-s);
    display:flex; align-items: center; justify-content: center;
    font-size: 13px; color: var(--b-common-white); font-weight:400; flex-shrink: 0;
  }
  .mover-card-label { font-size: 14px; font-weight:400; color: var(--text-n9); letter-spacing: 0.14px; min-width:0; flex:1 1 auto; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .mover-card-count { font-size: 12px; color: var(--text-n5); margin-left: auto; letter-spacing: 0.12px; }
  .mover-row {
    display:flex; align-items: center; justify-content: space-between;
    padding: 8px 0; border-bottom: 1px solid var(--line-l05);
    font-size: 13px;
  }
  .mover-row:last-child { border-bottom: none; }
  .mover-ticker { font-weight:400; color: var(--main-m1); letter-spacing: 0.13px; }
  .mover-name {
    font-size: 11px; color: var(--text-n5);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    max-width: 90px; margin-left: var(--spacing-xxs);
  }
  .mover-detail { font-size: 12px; font-weight:400; letter-spacing: 0.12px; white-space: nowrap; flex-shrink: 0; }
  .mover-empty {
    font-size: 12px; color: var(--text-n5); padding: var(--spacing-s) 0;
    line-height: 18px; text-align: center;
  }
  .trend-empty {
    background: var(--grey-g01); border-radius: var(--radius-ct-l);
    padding: 40px 20px; text-align: center; font-size: 14px;
    color: var(--text-n5); line-height: 22px; letter-spacing: 0.14px;
  }

  /* ── Methodology (Alva typography) ── */
  .method-section { margin-bottom: var(--spacing-xl); }
  .method-section:last-child { margin-bottom: 0; }
  .method-section h3 {
    margin-bottom: var(--spacing-m);
  }
  .method-body {
    background: var(--grey-g01);
    border-radius: var(--radius-ct-l);
    padding: var(--spacing-l);
  }
  .method-body > *:first-child { margin-top: 0; }
  .method-body > *:last-child { margin-bottom: 0; }
  .method-section p {
    font-size: 14px; color: var(--text-n9); line-height: 22px;
    margin-bottom: var(--spacing-xs); letter-spacing: 0.14px;
  }
  .method-section p:last-child { margin-bottom: 0; }
  .factor-row {
    display:flex; align-items: center; gap: var(--spacing-m);
    padding: var(--spacing-s) 0;
    border-bottom: 1px solid var(--line-l05);
    width: 100%; box-sizing: border-box;
  }
  .factor-row:first-child { padding-top: 0; }
  .factor-row:last-child { border-bottom: none; padding-bottom: 0; }
  .factor-name { width: 160px; font-size: 14px; font-weight:400; color: var(--text-n9); flex-shrink: 0; letter-spacing: 0.14px; }
  .factor-weight-label { width: 40px; font-size: 14px; color: var(--text-n7); text-align: right; flex-shrink: 0; font-variant-numeric: tabular-nums; letter-spacing: 0.14px; }
  .factor-bar-track { flex:1; height: 6px; background: var(--line-l07); border-radius: 3px; overflow: hidden; }
  .factor-bar-fill { height: 100%; border-radius: 3px; }
  .band-row .factor-name { width: 72px; }
  .band-row .factor-weight-label { width: 60px; text-align: left; color: var(--text-n9); }
  .band-row .factor-desc { flex: 1; }
  .factor-desc {
    font-size: 13px; color: var(--text-n5); line-height: 22px;
    letter-spacing: 0.13px;
  }
  .worked-example {
    background: var(--b0-container);
    padding: var(--spacing-m);
    border-radius: var(--radius-ct-l);
    margin-top: var(--spacing-s);
  }
  .worked-example-header {
    display:flex; align-items: baseline; gap: var(--spacing-xs);
    margin-bottom: var(--spacing-s); flex-wrap: wrap;
  }
  .worked-example-ticker { font-size: 18px; font-weight:400; color: var(--main-m1); letter-spacing: 0.18px; line-height: 28px; }
  .worked-example-score { font-size: 13px; color: var(--text-n7); letter-spacing: 0.13px; }
  .worked-example-rows { font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 20px; color: var(--text-n7); }
  .worked-example-total {
    font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight:400;
    color: var(--text-n9); padding-top: var(--spacing-s); margin-top: var(--spacing-s);
    border-top: 1px solid var(--line-l05);
  }
  .worked-example-verify {
    font-size: 12px; margin-top: var(--spacing-s);
    padding: var(--spacing-xs) var(--spacing-s);
    border-radius: var(--radius-ct-s);
    background: var(--main-m3-10); color: var(--main-m3);
    display: inline-flex; align-items: center; gap: var(--spacing-xxs);
    line-height: 20px; letter-spacing: 0.12px;
  }

  /* ── Methodology helpers ── */
  .method-label {
    font-size: 14px; font-weight: 500; line-height: 22px;
    margin-bottom: var(--spacing-xs); letter-spacing: 0.13px;
    color: var(--text-n9);
  }
  .method-label.hard { color: var(--main-m4); }
  .method-label.soft { color: var(--main-m5); }
  .method-block { margin-bottom: var(--spacing-m); }
  .method-block:last-child { margin-bottom: 0; }
  .method-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; line-height: 20px; color: var(--text-n7);
    margin-top: var(--spacing-m);
    letter-spacing: 0.12px;
  }
  .method-limit-list { list-style: none; padding: 0; margin: 0; }
  .method-limit-list li {
    font-size: 13px; color: var(--text-n7); line-height: 20px;
    padding: var(--spacing-xs) 0 var(--spacing-xs) var(--spacing-l);
    border-bottom: 1px solid var(--line-l05);
    letter-spacing: 0.13px; position: relative;
  }
  .method-limit-list li:first-child { padding-top: 0; }
  .method-limit-list li:last-child { border-bottom: none; padding-bottom: 0; }
  .method-limit-list li::before {
    content: '\\2014'; position: absolute; left: 0; color: var(--text-n5);
  }

  .analysis-caption {
    font-size: 12px; color: var(--text-n5); line-height: 20px;
    margin-bottom: var(--spacing-m); letter-spacing: 0.12px;
  }

  /* ── Loading ── */
  .loading-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 80px 0; gap: var(--spacing-m); }
  .loading-spinner {
    width: 32px; height: 32px;
    border: 3px solid var(--line-l07);
    border-top-color: var(--main-m1);
    border-radius: 50%; animation: spin .8s linear infinite;
  }
  .loading-text { font-size: 14px; color: var(--text-n5); letter-spacing: 0.14px; }
  .error-state { padding: 40px; text-align: center; font-size: 14px; color: var(--main-m4); letter-spacing: 0.14px; }

  @media (max-width:768px) {
    .expand-grid { grid-template-columns: 1fr; gap: var(--spacing-l); }
    .expand-ring { width: 200px; height: 180px; }
  }

  /* ── Markdown component (Alva design system) ── */
  .markdown-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
  }
  .markdown-container * { box-sizing: border-box; }
  .markdown-container p {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px; line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9); margin: 0; white-space: pre-wrap;
  }
  .markdown-container ul,
  .markdown-container ol {
    display: flex; flex-direction: column;
    gap: var(--spacing-xs);
    list-style: none; margin: 0; padding: 0;
  }
  .markdown-container li {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px; line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9); position: relative;
    padding-left: var(--spacing-xl);
  }
  .markdown-container ul > li::before {
    content: ''; position: absolute;
    left: 9.5px; top: 10.5px;
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--text-n9);
  }
  .markdown-container ol { counter-reset: md-ol; }
  .markdown-container ol > li { counter-increment: md-ol; }
  .markdown-container ol > li::before {
    content: counter(md-ol) '.'; position: absolute;
    left: 0; top: 0; width: 24px; text-align: center;
    font-size: 16px; line-height: 26px; color: var(--text-n9);
  }
  .markdown-container code,
  .markdown-container pre {
    background: var(--b-r02);
    border-radius: var(--radius-ct-xs);
    font-family: 'JetBrains Mono', monospace;
    color: var(--text-n7);
  }
  .markdown-container code {
    display: inline-block; vertical-align: middle;
    box-shadow: inset 0 0 0 1px var(--line-l07);
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    padding: var(--spacing-xxxs) var(--spacing-xs);
    margin: 0 var(--spacing-xxs);
  }
  .markdown-container em { font-style: italic; }
  .markdown-container strong { font-weight: 500; }

  /* ── Medium size modifier ── */
  .markdown-container--m { gap: var(--spacing-xs); }
  .markdown-container--m p,
  .markdown-container--m li {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
  }
  .markdown-container--m li { padding-left: var(--spacing-l); }
  .markdown-container--m ul > li::before { left: 7.5px; top: 8.5px; }
  .markdown-container--m ol > li::before {
    font-size: 14px; line-height: 22px; width: 20px;
  }
  .markdown-container--m ul,
  .markdown-container--m ol { gap: var(--spacing-xxs); }
  .markdown-container--m code { padding: 1px var(--spacing-xs); }

  /* ── Modal (Alva) ── */
  .modal-overlay {
    display:none;
    position:fixed; inset:0; z-index:1000;
    background: var(--main-m7, rgba(0,0,0,0.4));
    padding: var(--spacing-xxxxxl) var(--spacing-m);
    align-items:center; justify-content:center;
  }
  .modal-overlay.open { display:flex; }
  .modal-panel {
    background: var(--b0-container, #fff);
    width: 100%; max-width: 896px;
    max-height: 100%;
    border-radius: var(--radius-pop-dialog, 12px);
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.1));
    padding: var(--spacing-xxl);
    display:flex; flex-direction:column; gap: var(--spacing-m);
    box-shadow: var(--shadow-s, 0 8px 32px rgba(0,0,0,0.12));
  }
  .modal-title {
    display:flex; align-items:center; justify-content:space-between;
    gap: var(--spacing-s);
    font-family: 'Delight', sans-serif; font-weight:500;
    font-size:18px; line-height:28px; letter-spacing:0.18px;
    color: var(--text-n9);
  }
  .modal-close {
    width:18px; height:18px; flex-shrink:0; cursor:pointer;
    background-color: var(--text-n9, rgba(0,0,0,0.9));
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
    transition: opacity 0.15s ease;
  }
  .modal-close:hover { opacity: 0.6; }
  .modal-body { flex:1 1 auto; width:100%; overflow-y:auto; }

  /* ── Feed Detail Modal ────────────────────────────────────── */
  #feed-detail-modal .modal-panel {
    max-width: 600px; position: relative; padding: 28px; gap: 16px;
  }
  .feed-detail-close {
    position: absolute; top: 27.5px; right: 27.5px; z-index: 1;
    width: 18px; height: 18px; padding: 0; border: none; background: transparent;
    cursor: pointer; flex-shrink: 0;
    transition: opacity 0.15s ease;
  }
  .feed-detail-close::before {
    content:''; display:block; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.9);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
  }
  .feed-detail-close:hover { opacity: 0.7; }

  .feed-modal-header { display: flex; flex-direction: column; gap: 4px; width: 100%; }
  .feed-modal-header-top { display: flex; align-items: center; gap: 8px;
    font-size: 20px; line-height: 30px; letter-spacing: 0.2px; color: rgba(0,0,0,0.9);
    white-space: nowrap;
  }
  .feed-status-dot {
    width: 14px; height: 14px; position: relative; display: inline-flex; flex-shrink: 0;
  }
  .feed-status-dot::before { content:''; position:absolute; inset:0; background:#DBEDED; border-radius:50%; }
  .feed-status-dot::after  { content:''; position:absolute; inset:28.6%; background:#49A3A6; border-radius:50%; }
  .feed-modal-meta {
    display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5);
    white-space: nowrap;
  }
  .feed-modal-meta .sep { color: rgba(0,0,0,0.2); }

  .feed-modal-desc {
    background: #fafafa; border-radius: 8px; padding: 12px 16px; width: 100%;
    display: flex; flex-direction: column; gap: 8px;
    position: relative; overflow: hidden;
    max-height: 280px;
    transition: max-height 0.3s ease-out;
  }
  .feed-modal-desc.overflows { padding-bottom: 31px; }
  .feed-modal-desc-label {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5);
  }
  .feed-modal-desc-block { display: flex; flex-direction: column; gap: 4px; }
  .feed-desc-h {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px; font-weight: 500;
    color: rgba(0,0,0,0.9);
  }
  .feed-desc-p {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px; color: rgba(0,0,0,0.9);
    white-space: pre-line;
  }
  .feed-desc-toggle {
    position: absolute; left: 0; right: 0; bottom: 0;
    display: none; flex-direction: column; align-items: stretch;
  }
  .feed-modal-desc.overflows .feed-desc-toggle { display: flex; }
  .feed-desc-toggle-gradient {
    height: 32px; pointer-events: none;
    background: linear-gradient(to bottom, rgba(250,250,250,0), #fafafa);
  }
  .feed-modal-desc.expanded .feed-desc-toggle-gradient { display: none; }
  .feed-desc-toggle-btn {
    width: 100%; height: 19px; background: #fafafa;
    border: none; outline: none; padding: 0; cursor: pointer;
    display: flex; align-items: flex-start; justify-content: center;
  }
  .feed-desc-toggle-icon {
    width: 14px; height: 14px;
    background-color: rgba(0,0,0,0.2);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-down-f2.svg') center / contain no-repeat;
    transition: transform 0.2s ease-out;
  }
  .feed-modal-desc.expanded .feed-desc-toggle-icon { transform: rotate(180deg); }

  .feed-modal-stats { display: flex; gap: 16px; width: 100%; }
  .feed-stat-card {
    flex: 1; min-width: 0; background: #fafafa; border-radius: 8px; padding: 12px 16px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .feed-stat-label { font-size: 12px; line-height: 20px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5); }
  .feed-stat-value { font-size: 20px; line-height: 30px; letter-spacing: 0.2px; color: rgba(0,0,0,0.9); }
  .feed-stat-value.success { color: #2a9b7d; }
  .feed-stat-value.failed  { color: #e6a91a; }

  .feed-modal-history { width: 100%; display: flex; flex-direction: column; }
  .feed-history-header {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5);
    padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .feed-run-row { display: flex; flex-direction: column; border-bottom: 1px solid rgba(0,0,0,0.07); }
  .feed-run-head {
    display: flex; align-items: center; gap: 12px; padding: 10px 0;
  }
  .feed-run-head.clickable { cursor: pointer; }
  .feed-run-caret {
    width: 12px; height: 12px; flex-shrink: 0;
    background-color: rgba(0,0,0,0.5);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg') center / contain no-repeat;
    transition: transform 0.2s ease;
  }
  .feed-run-row.open .feed-run-caret { transform: rotate(90deg); }
  .feed-run-id {
    flex: 1; min-width: 0;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px; color: rgba(0,0,0,0.9);
  }
  .feed-run-duration {
    width: 120px; flex-shrink: 0;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px; color: rgba(0,0,0,0.9);
  }
  .feed-run-time {
    width: 120px; flex-shrink: 0;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px; color: rgba(0,0,0,0.5);
  }
  .feed-run-status {
    width: 16px; height: 16px; flex-shrink: 0;
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
  }
  .feed-run-status.success {
    background-color: #2a9b7d;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-f2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-f2.svg');
  }
  .feed-run-status.failed {
    background-color: #e6a91a;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/alert-f2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/alert-f2.svg');
  }
  .feed-run-log { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
  .feed-run-row.open .feed-run-log { max-height: 800px; padding-bottom: 10px; }
  .feed-run-log-pre {
    background: rgba(0,0,0,0.02); border-radius: 8px; padding: 16px; margin: 0;
    font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5); white-space: pre-wrap;
  }

</style>
</head>
<body>

<!-- ═══════════════ PLAYBOOK INFO ═══════════════ -->
<playbook-header
    title="Template-Screener"
    freq="15m"
    last-updated="15 minutes ago"
    owner="YGGYLL"
    owner-seed="YGGYLL"
    readme-modal="methodology-modal"
    get-alerts
    star="12" remix="56" comments="6"
    description="Tracks the AI infrastructure investment thesis across silicon, networking, hyperscalers, power, and data centers. 17-stock basket with daily quant analysis and ADK-driven narrative.">
    <script type="application/json" class="pb-feeds-data">
[
  {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"20 Minutes","lastRun":"15 minutes ago","clickable":true},
  {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"},
  {"id":"supply-chain","name":"Supply-Chain","interval":"6 hours","lastRun":"2 hours ago"}
]
    <\/script>
</playbook-header>
<div class="playbook-container">
  <!-- Tabs -->
  <div class="tab-wrapper">
    <div class="tab-wrapper-row">
      <div class="tab tab-underline tab-l" data-tab-group="main">
        <div class="tab-item active" data-tab="overview" data-text="Overview">Overview</div>
        <div class="tab-item" data-tab="trends" data-text="Movers &amp; Trends">Movers &amp; Trends</div>
        <div class="tab-item" data-tab="analysis" data-text="Analysis">Analysis</div>
      </div>
      <div class="tab-right-group">
        <button class="pb-meta-link pb-meta-link--readme tab-readme" type="button" data-modal-open="methodology-modal">
          <span class="pb-meta-icon-badge" aria-hidden="true">
            <img class="pb-meta-icon-img" src="https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg" width="14" height="14" alt="" />
          </span>
          <span>README</span>
        </button>
        <div class="filter-dropdown tab-snapshot" id="snap-filter" style="display:none;">
          <button type="button" class="filter-dropdown-trigger" id="snap-filter-trigger" aria-haspopup="listbox" aria-expanded="false">
            <span class="filter-dropdown-value" id="snap-filter-value">&mdash;</span>
            <span class="filter-dropdown-caret"></span>
          </button>
          <div class="filter-dropdown-menu" id="snap-filter-menu" role="listbox"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 1: Overview -->
  <div class="tab-panel active" id="panel-overview">
    <div id="overview-loading" class="loading-state">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading rankings...</div>
    </div>
    <div id="overview-content" style="display:none;">
      <div class="widget-card" style="margin-bottom: var(--spacing-xl);">
        <div class="widget-body" style="background:var(--grey-g01);">
          <div class="free-text-body">
            <div class="markdown-container markdown-container--m">
              <script type="text/markdown">
**Apr 16, 2026 &middot; Market Close Digest**

- **Top of basket:** ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property & Casualty continues.
- **New entries:** BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.
- **Dropouts:** TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.
- **Sector tilt:** Financial Services remains dominant (9 names); Healthcare contributes NVO as sole Elite-band entry.
- **Next refresh:** 09:40 ET (6h cadence). Watch earnings-driven repricing in CMCSA and PYPL.
              <\/script>
            </div>
          </div>
          <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva"/></div>
        </div>
      </div>
      <div class="widget-card">
        <div class="table-card" id="rankings-table"></div>
      </div>
    </div>
    <div id="overview-error" class="error-state" style="display:none;"></div>
  </div>

  <!-- Tab 2: Movers & Trends -->
  <div class="tab-panel" id="panel-trends">
    <div id="trends-loading" class="loading-state">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading movers &amp; trends...</div>
    </div>
    <div id="trends-content" style="display:none;">
      <div id="movers-section" style="display:none;">
        <div class="movers-section-title">Current Movers <span style="font-size:11px;color:var(--text-n5);font-weight:400;">vs. previous snapshot</span></div>
        <div class="movers-grid">
          <div class="mover-card">
            <div class="mover-card-header">
              <div class="mover-icon" style="background:#2a9b7d;">+</div>
              <div class="mover-card-label">New Entries</div>
              <div class="mover-card-count" id="entries-count">0</div>
            </div>
            <div id="entries-list"></div>
          </div>
          <div class="mover-card">
            <div class="mover-card-header">
              <div class="mover-icon" style="background:#e05357;">&minus;</div>
              <div class="mover-card-label">Dropped Out</div>
              <div class="mover-card-count" id="dropouts-count">0</div>
            </div>
            <div id="dropouts-list"></div>
          </div>
          <div class="mover-card">
            <div class="mover-card-header">
              <div class="mover-icon" style="background:#2a9b7d;">&uarr;</div>
              <div class="mover-card-label">Top Score Gainers</div>
            </div>
            <div id="gainers-list"></div>
          </div>
          <div class="mover-card">
            <div class="mover-card-header">
              <div class="mover-icon" style="background:#ff9800;">&darr;</div>
              <div class="mover-card-label">Top Score Decliners</div>
            </div>
            <div id="decliners-list"></div>
          </div>
        </div>
      </div>

      <div id="movers-firstrun" style="display:none;">
        <div class="trend-empty">
          <strong>First snapshot is ready.</strong> Movers and basket trend will appear after the next refresh.
        </div>
      </div>

      <div class="widget-grid" style="margin-top:24px;">
        <div class="widget-card col-8">
          <div class="widget-title"><span class="widget-title-text">Basket Trend &mdash; Eligible Count &amp; Average Score</span></div>
          <div class="widget-body chart-dotted-background" style="flex-direction:column;align-items:stretch;">
            <div class="chart-body">
              <div class="chart-legend">
                <div class="legend-item"><span class="legend-rect" style="background:#5f75c9;"></span><span>Eligible</span></div>
                <div class="legend-item"><span class="legend-line" style="background:#40a544;"></span><span>Avg Score</span></div>
              </div>
              <div id="basket-trend-chart" style="width:100%;height:320px;"></div>
              <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva"/></div>
            </div>
          </div>
        </div>
      </div>
      <div id="trends-empty" class="trend-empty" style="display:none;margin-top:24px;">
        Only one snapshot so far; this chart will populate as more refreshes accumulate.
      </div>

      <div class="widget-grid" style="margin-top:24px;">
        <div class="widget-card col-4">
          <div class="widget-title"><span class="widget-title-text">Full Score Gainers (vs. previous)</span></div>
          <div class="table-card" id="full-gainers-table"></div>
        </div>
        <div class="widget-card col-4">
          <div class="widget-title"><span class="widget-title-text">Full Score Decliners (vs. previous)</span></div>
          <div class="table-card" id="full-decliners-table"></div>
        </div>
      </div>
    </div>
    <div id="trends-error" class="error-state" style="display:none;"></div>
  </div>

  <!-- Tab 3: Analysis -->
  <div class="tab-panel" id="panel-analysis">
    <div id="analysis-loading" class="loading-state">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading factor analysis...</div>
    </div>
    <div id="analysis-content" style="display:none;">
      <div class="widget-grid">
        <div class="widget-card col-8">
          <div class="widget-title"><span class="widget-title-text">Value &amp; Profitability Map &mdash; P/E &times; ROE</span></div>
          <div class="analysis-caption">
            Top-left = low P/E + high ROE (quality value zone). Color indicates band (Elite / Strong / Average / Weak); bubble size maps to market cap. Hover for details.
          </div>
          <div class="widget-body chart-dotted-background" style="flex-direction:column;align-items:stretch;">
            <div class="chart-body">
              <div id="quality-map-chart" style="width:100%;height:420px;"></div>
              <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva"/></div>
            </div>
          </div>
        </div>
      </div>

      <div class="widget-grid" style="margin-top:24px;">
        <div class="widget-card col-8">
          <div class="widget-title"><span class="widget-title-text">Sector Score Distribution &mdash; Average Score by Sector</span></div>
          <div class="analysis-caption">Bars show average score of listed stocks per sector; number indicates how many stocks from that sector made the list.</div>
          <div class="widget-body chart-dotted-background" style="flex-direction:column;align-items:stretch;">
            <div class="chart-body">
              <div id="sector-chart" style="width:100%;height:360px;"></div>
              <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="analysis-error" class="error-state" style="display:none;"></div>
  </div>

  <!-- Readme Modal -->
  <div class="modal-overlay" id="methodology-modal" aria-hidden="true">
    <div class="modal-panel" role="dialog" aria-labelledby="methodology-modal-title">
      <div class="modal-title">
        <span id="methodology-modal-title">README</span>
        <div class="modal-close" data-modal-close="methodology-modal" aria-label="Close"></div>
      </div>
      <div class="modal-body">
    <div class="method-section">
      <h3>Overview in Plain English</h3>
      <div class="method-body">
        <p>This strategy screens the US large-cap universe (market cap &gt; $5B, top 500 by market cap) and keeps only companies that pass all three criteria: P/E between 3 and 25 (excluding excessively cheap or expensive), positive ROE (positive return on equity), and manageable leverage (D/E &le; 2.0).</p>
        <p>The remaining companies are scored using <strong>Value (cheapness, 40%)</strong> + <strong>Quality (profitability, 40%)</strong> + <strong>Safety (financial stability, 20%)</strong> to produce a composite score from 0&ndash;100. The top 40 are output with red flag annotations.</p>
      </div>
    </div>

    <div class="method-section">
      <h3>Worked Example &mdash; Recalculating Current #1</h3>
      <div class="method-body">
        <p>Below we recalculate the three-factor scores step by step for the current #1 ranked stock. If the difference from the displayed score is within &plusmn;1.5, the pipeline is consistent; otherwise please report the anomaly.</p>
        <div id="worked-example" class="worked-example">
          <div class="worked-example-header">
            <div style="font-size:11px;color:var(--text-n5);letter-spacing:0.3px;">Loading worked example...</div>
          </div>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>Factor Weights</h3>
      <div class="method-body">
        <div class="factor-row">
          <div class="factor-name">Value (Cheapness)</div>
          <div class="factor-weight-label">40%</div>
          <div class="factor-bar-track"><div class="factor-bar-fill" style="width:100%;background:var(--main-m1);"></div></div>
        </div>
        <div class="factor-row">
          <div class="factor-name">Quality (Profitability)</div>
          <div class="factor-weight-label">40%</div>
          <div class="factor-bar-track"><div class="factor-bar-fill" style="width:100%;background:var(--main-m3);"></div></div>
        </div>
        <div class="factor-row">
          <div class="factor-name">Safety (Stability)</div>
          <div class="factor-weight-label">20%</div>
          <div class="factor-bar-track"><div class="factor-bar-fill" style="width:50%;background:var(--chart-violet1-main);"></div></div>
        </div>
        <div class="method-code">
          valueScore  = normalize( 1 / P/E )         // Lower P/E = higher score<br>
          qualityScore = normalize( ROE )             // Higher ROE = higher score<br>
          safetyScore = normalize( 1 / (1 + D/E) )   // Lower D/E = higher score<br>
          composite   = 0.40 &times; valueScore + 0.40 &times; qualityScore + 0.20 &times; safetyScore<br>
          <strong>score = clamp(0, 100, round( 45 + 50 &times; (composite &minus; min) / (max &minus; min) ))</strong>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>Hard Filters &amp; Red Flag Rules</h3>
      <div class="method-body">
        <div class="method-block">
          <div class="method-label">Hard Filters (fail = excluded)</div>
          <div class="markdown-container markdown-container--m">
            <script type="text/markdown">
- 3 < P/E < 25 — Too low suggests earnings manipulation or cyclical peak; too high is not "value."
- ROE > 0 — Return on equity must be positive; loss-making companies are excluded.
- D/E ≤ 2.0 — Avoids highly leveraged companies; ensures ROE is not inflated by debt.
            <\/script>
          </div>
        </div>
        <div class="method-block">
          <div class="method-label hard">Hard Flags (structural)</div>
          <div class="markdown-container markdown-container--m">
            <script type="text/markdown">
- **P/E Outlier** — Falls at ≤ 3 or ≥ 25 boundary; earnings quality is suspect.
- **High D/E** — D/E ≥ 2.0; significant leverage risk.
            <\/script>
          </div>
        </div>
        <div class="method-block">
          <div class="method-label soft">Soft Flags (relative to current basket)</div>
          <div class="markdown-container markdown-container--m">
            <script type="text/markdown">
- **Unusually High ROE** — ROE > 60%; verify if driven by high leverage or accounting treatment.
- **P/E Above Avg** — Exceeds basket 75th percentile; relatively expensive among value stocks. *(Active when basket valid P/E ≥ 20)*
- **ROE Below Avg** — Below basket 25th percentile; relatively weak profitability in this cohort. *(Active when basket valid ROE ≥ 20)*
            <\/script>
          </div>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>Score Bands</h3>
      <div class="method-body">
        <div class="factor-row band-row">
          <div class="factor-name"><span class="band-pill elite">Elite</span></div>
          <div class="factor-weight-label">80&ndash;100</div>
          <div class="factor-desc">Top-tier across all three factors in this snapshot.</div>
        </div>
        <div class="factor-row band-row">
          <div class="factor-name"><span class="band-pill strong">Strong</span></div>
          <div class="factor-weight-label">70&ndash;79</div>
          <div class="factor-desc">Leading in all three or dominant in two.</div>
        </div>
        <div class="factor-row band-row">
          <div class="factor-name"><span class="band-pill average">Average</span></div>
          <div class="factor-weight-label">60&ndash;69</div>
          <div class="factor-desc">Passed screening but no standout advantage vs. basket.</div>
        </div>
        <div class="factor-row band-row">
          <div class="factor-name"><span class="band-pill weak">Weak</span></div>
          <div class="factor-weight-label">0&ndash;59</div>
          <div class="factor-desc">Passed hard filters but ranked low; included for reference.</div>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>Data Sources</h3>
      <div class="method-body">
        <div class="markdown-container markdown-container--m">
          <script type="text/markdown">
- P/E, ROE (TTM), D/E (MRQ), Market Cap: Alva SDK \`@arrays/data/stock/financial-metrics-time-range-screener\`
- Company name, sector, industry: Alva SDK \`@arrays/data/stock/company/detail\`
- Daily candlesticks: Alva SDK \`@arrays/data/stock/spot/ohlcv\`
- Refresh cadence: Every 6 hours (Cron: \`0 */6 * * *\` UTC)
- Universe: US stocks with market cap > $5B, top 500, filtered through three hard screens to form the eligible basket.
          <\/script>
        </div>
      </div>
    </div>

    <div class="method-section">
      <h3>Limitations &mdash; What This Strategy Does Not Capture</h3>
      <div class="method-body">
        <div class="markdown-container markdown-container--m">
          <script type="text/markdown">
- P/E is based on TTM earnings; for cyclical industries (energy, autos) it can be artificially low at cycle peaks and high at troughs.
- ROE can be inflated by high leverage or share buybacks; the Safety factor only looks at D/E, not debt-service coverage or interest expense.
- Data reflects the SDK's most recent observation; revisions around earnings dates may cause temporary rank volatility.
- The screening universe covers SDK-tracked US stocks with MC > $5B; small-caps and foreign cross-listings may not be fully covered.
          <\/script>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>

  <!-- Feed Detail Modal -->
  <div class="modal-overlay" id="feed-detail-modal" aria-hidden="true">
    <div class="modal-panel" role="dialog" aria-labelledby="feed-detail-title">
      <button type="button" class="feed-detail-close" data-modal-close="feed-detail-modal" aria-label="Close"></button>
      <div class="modal-body">
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div class="feed-modal-header">
            <div class="feed-modal-header-top">
              <span class="feed-status-dot" aria-hidden="true"></span>
              <span id="feed-detail-title">Feed</span>
            </div>
            <div class="feed-modal-meta">
              <span>Last Run: <span id="feed-detail-last-run">&mdash;</span></span>
              <span class="sep">|</span>
              <span id="feed-detail-every">&mdash;</span>
              <span class="sep">|</span>
              <span><span id="feed-detail-total-runs">0</span> Runs</span>
            </div>
          </div>
          <div class="feed-modal-desc" id="feed-detail-desc-wrap">
            <div class="feed-modal-desc-label">What This Feed Does</div>
            <div id="feed-detail-desc"></div>
            <div class="feed-desc-toggle">
              <div class="feed-desc-toggle-gradient"></div>
              <button type="button" class="feed-desc-toggle-btn" id="feed-desc-toggle-btn" aria-label="Expand description">
                <span class="feed-desc-toggle-icon"></span>
              </button>
            </div>
          </div>
          <div class="feed-modal-stats">
            <div class="feed-stat-card"><span class="feed-stat-label">Total Runs</span><span class="feed-stat-value" id="feed-stat-total">&mdash;</span></div>
            <div class="feed-stat-card"><span class="feed-stat-label">Success</span><span class="feed-stat-value success" id="feed-stat-success">&mdash;</span></div>
            <div class="feed-stat-card"><span class="feed-stat-label">Failed</span><span class="feed-stat-value failed" id="feed-stat-failed">&mdash;</span></div>
          </div>
          <div class="feed-modal-history">
            <div class="feed-history-header">Recent 10 Runs</div>
            <div id="feed-history-list"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
window.__ALVA_OFFLINE_DATA__ = {
  "/screener/rankings/@last/60": [{"band": "elite", "date": 1776391090115, "debtToEquity": 0.24, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Insurance - Property & Casualty", "marketCap": 56638541280, "name": "The Allstate Corporation", "peRatio": 5.64, "qualityScore": 45, "rank": 1, "roe": 39.51, "safetyScore": 68, "score": 95, "sector": "Financial Services", "ticker": "ALL", "valueScore": 86}, {"band": "elite", "date": 1776391090115, "debtToEquity": 1.02, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Broadcasting", "marketCap": 103125240695, "name": "Comcast Corporation Class A Common Stock Ex-Distribution When Issued", "peRatio": 5.26, "qualityScore": 11, "rank": 2, "roe": 24.73, "safetyScore": 14, "score": 81, "sector": "Consumer Cyclical", "ticker": "CMCSV", "valueScore": 100}, {"band": "elite", "date": 1776391090115, "debtToEquity": 0.67, "flagLabel": "ROE \\u8fc7\\u9ad8", "flagTier": "soft", "flagsCsv": "ROE \\u8fc7\\u9ad8", "industry": "Drug Manufacturers - General", "marketCap": 181361334227, "name": "Novo Nordisk A/S", "peRatio": 10.36, "qualityScore": 100, "rank": 3, "roe": 63.95, "safetyScore": 32, "score": 80, "sector": "Healthcare", "ticker": "NVO", "valueScore": 0}, {"band": "strong", "date": 1776391090115, "debtToEquity": 1.14, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Telecommunications Services", "marketCap": 103122213529, "name": "Comcast Corporation", "peRatio": 5.26, "qualityScore": 4, "rank": 4, "roe": 21.71, "safetyScore": 10, "score": 78, "sector": "Communication Services", "ticker": "CMCSA", "valueScore": 100}, {"band": "strong", "date": 1776391090115, "debtToEquity": 0.92, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Oil & Gas Integrated", "marketCap": 132367287458, "name": "Petr\\u00f3leo Brasileiro S.A. - Petrobras", "peRatio": 6.63, "qualityScore": 23, "rank": 5, "roe": 29.78, "safetyScore": 19, "score": 72, "sector": "Energy", "ticker": "PBR", "valueScore": 58}, {"band": "average", "date": 1776391090115, "debtToEquity": 0.01, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Specialty Retail", "marketCap": 143021985136, "name": "PDD Holdings Inc.", "peRatio": 10.07, "qualityScore": 18, "rank": 6, "roe": 27.7, "safetyScore": 100, "score": 66, "sector": "Consumer Cyclical", "ticker": "PDD", "valueScore": 3}, {"band": "weak", "date": 1776391090115, "debtToEquity": 1.43, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Banks - Diversified", "marketCap": 132665636379, "name": "Banco Bilbao Vizcaya Argentaria, S.A.", "peRatio": 10.13, "qualityScore": 0, "rank": 7, "roe": 19.75, "safetyScore": 0, "score": 45, "sector": "Financial Services", "ticker": "BBVA", "valueScore": 2}, {"band": "elite", "date": 1776391118631, "debtToEquity": 0.24, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Insurance - Property & Casualty", "marketCap": 56638541280, "name": "The Allstate Corporation", "peRatio": 5.64, "qualityScore": 59, "rank": 1, "roe": 39.51, "safetyScore": 69, "score": 95, "sector": "Financial Services", "ticker": "ALL", "valueScore": 68}, {"band": "elite", "date": 1776391118631, "debtToEquity": 0.17, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Airlines, Airports & Air Services", "marketCap": 32531529207, "name": "Ryanair Holdings plc", "peRatio": 5.85, "qualityScore": 40, "rank": 2, "roe": 28.04, "safetyScore": 77, "score": 88, "sector": "Industrials", "ticker": "RYAAY", "valueScore": 63}, {"band": "elite", "date": 1776391118631, "debtToEquity": 1.79, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Telecommunications Services", "marketCap": 24049840820, "name": "BCE Inc.", "peRatio": 4.82, "qualityScore": 47, "rank": 3, "roe": 32.17, "safetyScore": 0, "score": 88, "sector": "Communication Services", "ticker": "BCE", "valueScore": 93}, {"band": "elite", "date": 1776391118631, "debtToEquity": 1.02, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Broadcasting", "marketCap": 103125240695, "name": "Comcast Corporation Class A Common Stock Ex-Distribution When Issued", "peRatio": 5.26, "qualityScore": 35, "rank": 4, "roe": 24.73, "safetyScore": 21, "score": 82, "sector": "Consumer Cyclical", "ticker": "CMCSV", "valueScore": 79}, {"band": "elite", "date": 1776391118631, "debtToEquity": 0.67, "flagLabel": "ROE \\u8fc7\\u9ad8", "flagTier": "soft", "flagsCsv": "ROE \\u8fc7\\u9ad8,P/E \\u504f\\u9ad8", "industry": "Drug Manufacturers - General", "marketCap": 181361334227, "name": "Novo Nordisk A/S", "peRatio": 10.36, "qualityScore": 100, "rank": 5, "roe": 63.95, "safetyScore": 37, "score": 81, "sector": "Healthcare", "ticker": "NVO", "valueScore": 0}, {"band": "elite", "date": 1776391118631, "debtToEquity": 1.69, "flagLabel": "ROE \\u504f\\u4f4e", "flagTier": "soft", "flagsCsv": "ROE \\u504f\\u4f4e", "industry": "Banks - Diversified", "marketCap": 33757777900, "name": "NatWest Group plc", "peRatio": 4.64, "qualityScore": 18, "rank": 6, "roe": 14.73, "safetyScore": 2, "score": 81, "sector": "Financial Services", "ticker": "NWG", "valueScore": 100}, {"band": "elite", "date": 1776391118631, "debtToEquity": 1.14, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Telecommunications Services", "marketCap": 103122213529, "name": "Comcast Corporation", "peRatio": 5.26, "qualityScore": 30, "rank": 7, "roe": 21.71, "safetyScore": 17, "score": 80, "sector": "Communication Services", "ticker": "CMCSA", "valueScore": 79}, {"band": "strong", "date": 1776391118631, "debtToEquity": 0.92, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Oil & Gas Integrated", "marketCap": 132367287458, "name": "Petr\\u00f3leo Brasileiro S.A. - Petrobras", "peRatio": 6.63, "qualityScore": 43, "rank": 8, "roe": 29.78, "safetyScore": 25, "score": 75, "sector": "Energy", "ticker": "PBR", "valueScore": 46}, {"band": "strong", "date": 1776391118631, "debtToEquity": 0.18, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Travel Services", "marketCap": 35373020771, "name": "Trip.com Group Limited", "peRatio": 7.48, "qualityScore": 29, "rank": 9, "roe": 21.62, "safetyScore": 76, "score": 74, "sector": "Consumer Cyclical", "ticker": "TCOM", "valueScore": 32}, {"band": "strong", "date": 1776391118631, "debtToEquity": 0.01, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Specialty Retail", "marketCap": 143021985136, "name": "PDD Holdings Inc.", "peRatio": 10.07, "qualityScore": 40, "rank": 10, "roe": 27.7, "safetyScore": 98, "score": 72, "sector": "Consumer Cyclical", "ticker": "PDD", "valueScore": 3}, {"band": "strong", "date": 1776391118631, "debtToEquity": 0.11, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Insurance - Diversified", "marketCap": 34725913812, "name": "Arch Capital Group Ltd.", "peRatio": 8.23, "qualityScore": 26, "rank": 11, "roe": 19.54, "safetyScore": 84, "score": 71, "sector": "Financial Services", "ticker": "ACGL", "valueScore": 21}, {"band": "average", "date": 1776391118631, "debtToEquity": 0.3, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Insurance - Life", "marketCap": 39041696892, "name": "Prudential plc", "peRatio": 8.97, "qualityScore": 33, "rank": 12, "roe": 23.54, "safetyScore": 64, "score": 67, "sector": "Financial Services", "ticker": "PUK", "valueScore": 13}, {"band": "average", "date": 1776391118631, "debtToEquity": 0.49, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Financial - Credit Services", "marketCap": 45637364050, "name": "PayPal Holdings, Inc.", "peRatio": 9.08, "qualityScore": 36, "rank": 13, "roe": 25.73, "safetyScore": 49, "score": 65, "sector": "Financial Services", "ticker": "PYPL", "valueScore": 12}, {"band": "average", "date": 1776391118631, "debtToEquity": 0.23, "flagLabel": "P/E \\u504f\\u9ad8", "flagTier": "soft", "flagsCsv": "P/E \\u504f\\u9ad8", "industry": "Insurance - Diversified", "marketCap": 38276027048, "name": "The Hartford Financial Services Group, Inc.", "peRatio": 10.25, "qualityScore": 30, "rank": 14, "roe": 21.66, "safetyScore": 71, "score": 63, "sector": "Financial Services", "ticker": "HIG", "valueScore": 1}, {"band": "average", "date": 1776391118631, "debtToEquity": 0, "flagLabel": "ROE \\u504f\\u4f4e", "flagTier": "soft", "flagsCsv": "ROE \\u504f\\u4f4e", "industry": "Banks - Regional", "marketCap": 37784884303, "name": "KB Financial Group Inc.", "peRatio": 9.96, "qualityScore": 10, "rank": 15, "roe": 9.94, "safetyScore": 100, "score": 63, "sector": "Financial Services", "ticker": "KB", "valueScore": 4}, {"band": "average", "date": 1776391118631, "debtToEquity": 0.91, "flagLabel": "\\u2014", "flagTier": "clean", "flagsCsv": "", "industry": "Financial - Credit Services", "marketCap": 27369404397, "name": "Synchrony Financial", "peRatio": 8.1, "qualityScore": 29, "rank": 16, "roe": 21.3, "safetyScore": 26, "score": 63, "sector": "Financial Services", "ticker": "SYF", "valueScore": 23}, {"band": "weak", "date": 1776391118631, "debtToEquity": 0.7, "flagLabel": "P/E \\u504f\\u9ad8", "flagTier": "soft", "flagsCsv": "P/E \\u504f\\u9ad8", "industry": "Airlines, Airports & Air Services", "marketCap": 47297006051, "name": "Delta Air Lines, Inc.", "peRatio": 10.4, "qualityScore": 35, "rank": 17, "roe": 25, "safetyScore": 36, "score": 59, "sector": "Industrials", "ticker": "DAL", "valueScore": 0}, {"band": "weak", "date": 1776391118631, "debtToEquity": 1.43, "flagLabel": "P/E \\u504f\\u9ad8", "flagTier": "soft", "flagsCsv": "P/E \\u504f\\u9ad8", "industry": "Banks - Diversified", "marketCap": 132665636379, "name": "Banco Bilbao Vizcaya Argentaria, S.A.", "peRatio": 10.13, "qualityScore": 26, "rank": 18, "roe": 19.75, "safetyScore": 8, "score": 52, "sector": "Financial Services", "ticker": "BBVA", "valueScore": 2}, {"band": "weak", "date": 1776391118631, "debtToEquity": 1.12, "flagLabel": "ROE \\u504f\\u4f4e", "flagTier": "soft", "flagsCsv": "ROE \\u504f\\u4f4e", "industry": "Information Technology Services", "marketCap": 32776543620, "name": "Fiserv, Inc.", "peRatio": 9.64, "qualityScore": 15, "rank": 19, "roe": 13.16, "safetyScore": 18, "score": 52, "sector": "Technology", "ticker": "FISV", "valueScore": 6}, {"band": "weak", "date": 1776391118631, "debtToEquity": 1.03, "flagLabel": "ROE \\u504f\\u4f4e", "flagTier": "soft", "flagsCsv": "ROE \\u504f\\u4f4e", "industry": "Insurance - Life", "marketCap": 34598159901, "name": "Prudential Financial, Inc.", "peRatio": 9.87, "qualityScore": 13, "rank": 20, "roe": 11.86, "safetyScore": 21, "score": 51, "sector": "Financial Services", "ticker": "PRU", "valueScore": 4}, {"band": "weak", "date": 1776391118631, "debtToEquity": 1.09, "flagLabel": "P/E \\u504f\\u9ad8", "flagTier": "soft", "flagsCsv": "P/E \\u504f\\u9ad8,ROE \\u504f\\u4f4e", "industry": "Auto - Manufacturers", "marketCap": 31831492628, "name": "Honda Motor Co., Ltd.", "peRatio": 10.26, "qualityScore": 0, "rank": 21, "roe": 3.91, "safetyScore": 19, "score": 45, "sector": "Consumer Cyclical", "ticker": "HMC", "valueScore": 1}],
  "/screener/summary/@last/60": [{"date": 1776391090115, "totalScreened": 315, "totalEligible": 7, "totalPassed": 7, "avgScore": 73.86, "avgPe": 7.62, "avgRoe": 32.45, "avgDe": 0.78, "topSector": "Financial Services", "lastUpdated": "2026-04-17T01:58:10.115Z", "basketPeP75": 10.07, "basketRoeP25": 21.71, "basketPeValidCount": 7, "basketRoeValidCount": 7}, {"date": 1776391118631, "totalScreened": 518, "totalEligible": 21, "totalPassed": 21, "avgScore": 69.86, "avgPe": 8.14, "avgRoe": 23.78, "avgDe": 0.73, "topSector": "Financial Services", "lastUpdated": "2026-04-17T01:58:38.631Z", "basketPeP75": 10.07, "basketRoeP25": 19.54, "basketPeValidCount": 21, "basketRoeValidCount": 21}],
  "/screener/klines/@last/200": [{"close": 212.32, "date": 1771338600000, "high": 213.24, "low": 208.25, "open": 210.13, "ticker": "ALL", "volume": 2019495}, {"close": 49.37, "date": 1771338600000, "high": 49.85, "low": 48.675, "open": 49.11, "ticker": "NVO", "volume": 9044737}, {"close": 31.55, "date": 1771338600000, "high": 31.945, "low": 31.4601, "open": 31.665, "ticker": "CMCSA", "volume": 19348691}, {"close": 15.02, "date": 1771338600000, "high": 15.16, "low": 14.81, "open": 15.09, "ticker": "PBR", "volume": 11804283}, {"close": 101.83, "date": 1771338600000, "high": 102.89, "low": 100.08, "open": 100.51, "ticker": "PDD", "volume": 4234316}, {"close": 23.11, "date": 1771338600000, "high": 23.14, "low": 22.8438, "open": 22.85, "ticker": "BBVA", "volume": 1827865}, {"close": 209.43, "date": 1771425000000, "high": 213.64, "low": 205.3, "open": 212, "ticker": "ALL", "volume": 1530442}, {"close": 49.23, "date": 1771425000000, "high": 49.355, "low": 48.63, "open": 48.835, "ticker": "NVO", "volume": 9952789}, {"close": 31.6, "date": 1771425000000, "high": 31.82, "low": 31.335, "open": 31.615, "ticker": "CMCSA", "volume": 16769897}, {"close": 15.29, "date": 1771425000000, "high": 15.41, "low": 15.13, "open": 15.17, "ticker": "PBR", "volume": 17419531}, {"close": 102.92, "date": 1771425000000, "high": 104.2, "low": 102.8, "open": 103.26, "ticker": "PDD", "volume": 4300406}, {"close": 23.49, "date": 1771425000000, "high": 23.58, "low": 23.33, "open": 23.35, "ticker": "BBVA", "volume": 1200215}, {"close": 203.22, "date": 1771511400000, "high": 208.85, "low": 202.62, "open": 208.85, "ticker": "ALL", "volume": 1241683}, {"close": 48.45, "date": 1771511400000, "high": 48.77, "low": 48.18, "open": 48.72, "ticker": "NVO", "volume": 7429546}, {"close": 31.38, "date": 1771511400000, "high": 31.755, "low": 31.205, "open": 31.57, "ticker": "CMCSA", "volume": 14426169}, {"close": 15.76, "date": 1771511400000, "high": 15.8399, "low": 15.5214, "open": 15.58, "ticker": "PBR", "volume": 18922822}, {"close": 101.95, "date": 1771511400000, "high": 103.59, "low": 101.15, "open": 103, "ticker": "PDD", "volume": 4202193}, {"close": 23.2, "date": 1771511400000, "high": 23.24, "low": 22.95, "open": 23.02, "ticker": "BBVA", "volume": 1000363}, {"close": 206.37, "date": 1771597800000, "high": 206.57, "low": 201.22, "open": 204.71, "ticker": "ALL", "volume": 883844}, {"close": 47.42, "date": 1771597800000, "high": 47.75, "low": 47.03, "open": 47.685, "ticker": "NVO", "volume": 10742046}, {"close": 31.34, "date": 1771597800000, "high": 31.445, "low": 30.79, "open": 31.29, "ticker": "CMCSA", "volume": 17678253}, {"close": 15.79, "date": 1771597800000, "high": 15.86, "low": 15.5306, "open": 15.78, "ticker": "PBR", "volume": 13734548}, {"close": 104.94, "date": 1771597800000, "high": 107.4499, "low": 100.93, "open": 100.98, "ticker": "PDD", "volume": 12860229}, {"close": 23.51, "date": 1771597800000, "high": 23.53, "low": 23.11, "open": 23.16, "ticker": "BBVA", "volume": 1137076}, {"close": 206.16, "date": 1771857000000, "high": 208.1, "low": 204.78, "open": 206.31, "ticker": "ALL", "volume": 1011697.5770569998}, {"close": 39.63, "date": 1771857000000, "high": 41.09, "low": 39.34, "open": 40.19, "ticker": "NVO", "volume": 76048385.875229}, {"close": 31.63, "date": 1771857000000, "high": 31.82, "low": 31.26, "open": 31.365, "ticker": "CMCSA", "volume": 14340405.544617001}, {"close": 16.14, "date": 1771857000000, "high": 16.48, "low": 15.9, "open": 15.93, "ticker": "PBR", "volume": 24430403.125299}, {"close": 105.76, "date": 1771857000000, "high": 108.11, "low": 105.64, "open": 107.585, "ticker": "PDD", "volume": 5688001.530893}, {"close": 23.69, "date": 1771857000000, "high": 23.99, "low": 23.415, "open": 23.9, "ticker": "BBVA", "volume": 2398508.488175}, {"close": 209.82, "date": 1771943400000, "high": 210.35, "low": 205.04, "open": 206, "ticker": "ALL", "volume": 891272.544766}, {"close": 38.59, "date": 1771943400000, "high": 39.07, "low": 38.36, "open": 38.5, "ticker": "NVO", "volume": 37080920.53996}, {"close": 31.61, "date": 1771943400000, "high": 31.85, "low": 31.36, "open": 31.48, "ticker": "CMCSA", "volume": 15260844.225303}, {"close": 16.54, "date": 1771943400000, "high": 16.58, "low": 16.195, "open": 16.3, "ticker": "PBR", "volume": 25400540.463887}, {"close": 106.88, "date": 1771943400000, "high": 107.29, "low": 104.52, "open": 105.492, "ticker": "PDD", "volume": 5119104.362968}, {"close": 23.53, "date": 1771943400000, "high": 23.585, "low": 23.03, "open": 23.11, "ticker": "BBVA", "volume": 2732127.65257}, {"close": 209.33, "date": 1772029800000, "high": 211.205, "low": 206.71, "open": 210.9, "ticker": "ALL", "volume": 1142263.437446}, {"close": 38.16, "date": 1772029800000, "high": 38.24, "low": 37.65, "open": 37.705, "ticker": "NVO", "volume": 48902292.790604}, {"close": 30.79, "date": 1772029800000, "high": 31.77, "low": 30.69, "open": 31.595, "ticker": "CMCSA", "volume": 21008814.139087}, {"close": 16.71, "date": 1772029800000, "high": 16.73, "low": 16.36, "open": 16.55, "ticker": "PBR", "volume": 17650963.25609}, {"close": 106.9, "date": 1772029800000, "high": 108, "low": 106.11, "open": 107.62, "ticker": "PDD", "volume": 3847951.691911}, {"close": 23.77, "date": 1772029800000, "high": 23.805, "low": 23.51, "open": 23.55, "ticker": "BBVA", "volume": 2757428.0486770007}, {"close": 212.76, "date": 1772116200000, "high": 213.85, "low": 209.995, "open": 210.9, "ticker": "ALL", "volume": 1028060.998082}, {"close": 37.62, "date": 1772116200000, "high": 38.07, "low": 37.31, "open": 37.825, "ticker": "NVO", "volume": 32182707.086328}, {"close": 30.85, "date": 1772116200000, "high": 31.215, "low": 30.805, "open": 30.86, "ticker": "CMCSA", "volume": 18718881.194898997}, {"close": 16.61, "date": 1772116200000, "high": 16.71, "low": 16.34, "open": 16.52, "ticker": "PBR", "volume": 16737817.278032}, {"close": 105.39, "date": 1772116200000, "high": 106.37, "low": 104.57, "open": 105.84, "ticker": "PDD", "volume": 3682280.3474659994}, {"close": 23.66, "date": 1772116200000, "high": 23.735, "low": 23.45, "open": 23.59, "ticker": "BBVA", "volume": 1663590.2085580002}, {"close": 214.52, "date": 1772202600000, "high": 215.51, "low": 210.87, "open": 210.87, "ticker": "ALL", "volume": 923999.7065150002}, {"close": 37.45, "date": 1772202600000, "high": 37.86, "low": 37.33, "open": 37.54, "ticker": "NVO", "volume": 20822289.841128}, {"close": 30.96, "date": 1772202600000, "high": 31.175, "low": 30.385, "open": 30.71, "ticker": "CMCSA", "volume": 20659599.254813}, {"close": 16.63, "date": 1772202600000, "high": 16.92, "low": 16.54, "open": 16.76, "ticker": "PBR", "volume": 18339836.945004}, {"close": 103.73, "date": 1772202600000, "high": 104.89, "low": 103.44, "open": 104.5, "ticker": "PDD", "volume": 3897543.740017}, {"close": 23.13, "date": 1772202600000, "high": 23.58, "low": 22.96, "open": 23.55, "ticker": "BBVA", "volume": 1604399.980428}, {"close": 212.76, "date": 1772461800000, "high": 214.72, "low": 211.25, "open": 213.51, "ticker": "ALL", "volume": 1088338.540387}, {"close": 37.76, "date": 1772461800000, "high": 37.835, "low": 36.72, "open": 36.83, "ticker": "NVO", "volume": 18954659.553208}, {"close": 30.82, "date": 1772461800000, "high": 31.06, "low": 30.525, "open": 30.74, "ticker": "CMCSA", "volume": 18397959.060177002}, {"close": 17.32, "date": 1772461800000, "high": 17.34, "low": 16.89, "open": 17.1, "ticker": "PBR", "volume": 41021519.23512301}, {"close": 102.82, "date": 1772461800000, "high": 103.35, "low": 101.72, "open": 102.46, "ticker": "PDD", "volume": 4012913.6343940003}, {"close": 22.24, "date": 1772461800000, "high": 22.37, "low": 22.01, "open": 22.15, "ticker": "BBVA", "volume": 2668568.8196480004}, {"close": 213.61, "date": 1772548200000, "high": 214.81, "low": 209.89, "open": 210.14, "ticker": "ALL", "volume": 1051214.817317}, {"close": 36.66, "date": 1772548200000, "high": 36.9489, "low": 35.85, "open": 36.37, "ticker": "NVO", "volume": 27928052.990852006}, {"close": 31.01, "date": 1772548200000, "high": 31.36, "low": 30.27, "open": 30.68, "ticker": "CMCSA", "volume": 21605667.275822}, {"close": 16.96, "date": 1772548200000, "high": 17.295, "low": 16.675, "open": 17, "ticker": "PBR", "volume": 43777829.145665996}, {"close": 100.71, "date": 1772548200000, "high": 101.07, "low": 99.04, "open": 100.5, "ticker": "PDD", "volume": 7627454.391037}, {"close": 20.88, "date": 1772548200000, "high": 21.115, "low": 20.505, "open": 20.8, "ticker": "BBVA", "volume": 3935647.4573460002}, {"close": 214.18, "date": 1772634600000, "high": 215.125, "low": 210.38, "open": 214.35, "ticker": "ALL", "volume": 944582.761423}, {"close": 38.5, "date": 1772634600000, "high": 38.6, "low": 37.29, "open": 37.63, "ticker": "NVO", "volume": 23300057.76475}, {"close": 32.09, "date": 1772634600000, "high": 32.14, "low": 30.63, "open": 30.85, "ticker": "CMCSA", "volume": 21699714.063642}, {"close": 16.77, "date": 1772634600000, "high": 17.005, "low": 16.61, "open": 16.82, "ticker": "PBR", "volume": 18579080.100503}, {"close": 101.19, "date": 1772634600000, "high": 102.8, "low": 100.865, "open": 101.65, "ticker": "PDD", "volume": 3598943.9601640003}, {"close": 22.05, "date": 1772634600000, "high": 22.1, "low": 21.64, "open": 21.7, "ticker": "BBVA", "volume": 1964583.4719349998}, {"close": 211.62, "date": 1772721000000, "high": 213.87, "low": 209.6, "open": 211.24, "ticker": "ALL", "volume": 936459.5274929999}, {"close": 39.07, "date": 1772721000000, "high": 39.115, "low": 38.08, "open": 38.28, "ticker": "NVO", "volume": 18929682.248256}, {"close": 31.6, "date": 1772721000000, "high": 32.4, "low": 31.47, "open": 31.935, "ticker": "CMCSA", "volume": 17929089.156517}, {"close": 16.73, "date": 1772721000000, "high": 16.8, "low": 16.46, "open": 16.67, "ticker": "PBR", "volume": 28993708.710455}, {"close": 100.74, "date": 1772721000000, "high": 101.48, "low": 99.97, "open": 100.63, "ticker": "PDD", "volume": 3273973.0226089996}, {"close": 21.53, "date": 1772721000000, "high": 21.88, "low": 21.31, "open": 21.73, "ticker": "BBVA", "volume": 2397328.009134}, {"close": 212.32, "date": 1772807400000, "high": 212.835, "low": 207.47, "open": 211.285, "ticker": "ALL", "volume": 657667.6265169999}, {"close": 38.58, "date": 1772807400000, "high": 38.85, "low": 38.165, "open": 38.58, "ticker": "NVO", "volume": 13383635.939310996}, {"close": 31.91, "date": 1772807400000, "high": 31.97, "low": 30.99, "open": 31.39, "ticker": "CMCSA", "volume": 15544827.320524998}, {"close": 17.6, "date": 1772807400000, "high": 17.825, "low": 17.17, "open": 17.25, "ticker": "PBR", "volume": 39114572.745800994}, {"close": 101.97, "date": 1772807400000, "high": 102.73, "low": 101.39, "open": 101.61, "ticker": "PDD", "volume": 3512598.0863459995}, {"close": 21.32, "date": 1772807400000, "high": 21.45, "low": 20.81, "open": 21.05, "ticker": "BBVA", "volume": 1463970.486346}, {"close": 207.69, "date": 1773063000000, "high": 211.64, "low": 205.76, "open": 211.3, "ticker": "ALL", "volume": 1059311.9943950002}, {"close": 39.78, "date": 1773063000000, "high": 39.88, "low": 38.495, "open": 39.19, "ticker": "NVO", "volume": 21115578.896369}, {"close": 31.04, "date": 1773063000000, "high": 31.76, "low": 30.47, "open": 31.64, "ticker": "CMCSA", "volume": 37647178.613272}, {"close": 18.16, "date": 1773063000000, "high": 18.56, "low": 17.97, "open": 18.02, "ticker": "PBR", "volume": 70440719.59275}, {"close": 102.64, "date": 1773063000000, "high": 103.01, "low": 99.68, "open": 101.01, "ticker": "PDD", "volume": 5488529.701843}, {"close": 21.57, "date": 1773063000000, "high": 21.665, "low": 20.62, "open": 20.89, "ticker": "BBVA", "volume": 2000395.5009479998}, {"close": 207.5, "date": 1773149400000, "high": 210.38, "low": 206.195, "open": 207.07, "ticker": "ALL", "volume": 733469.1852139999}, {"close": 38.72, "date": 1773149400000, "high": 39.22, "low": 38.18, "open": 39.185, "ticker": "NVO", "volume": 17808687.640757002}, {"close": 31.07, "date": 1773149400000, "high": 31.175, "low": 30.55, "open": 30.94, "ticker": "CMCSA", "volume": 16763337.720204998}, {"close": 17.99, "date": 1773149400000, "high": 18.21, "low": 17.72, "open": 17.91, "ticker": "PBR", "volume": 32322515.835289996}, {"close": 104.86, "date": 1773149400000, "high": 106.57, "low": 103.42, "open": 103.53, "ticker": "PDD", "volume": 6552604.5378479995}, {"close": 21.96, "date": 1773149400000, "high": 22.43, "low": 21.65, "open": 21.79, "ticker": "BBVA", "volume": 1819309.6015690004}, {"close": 205.59, "date": 1773235800000, "high": 207.66, "low": 204.32, "open": 206.27, "ticker": "ALL", "volume": 949128.4055}, {"close": 38.83, "date": 1773235800000, "high": 38.99, "low": 38.515, "open": 38.73, "ticker": "NVO", "volume": 11454842.895899}, {"close": 30.57, "date": 1773235800000, "high": 31.33, "low": 30.26, "open": 31.06, "ticker": "CMCSA", "volume": 17814414.481735997}, {"close": 18.99, "date": 1773235800000, "high": 19.015, "low": 18.29, "open": 18.3, "ticker": "PBR", "volume": 41151368.734570995}, {"close": 102.94, "date": 1773235800000, "high": 104.75, "low": 102.48, "open": 104.63, "ticker": "PDD", "volume": 3530105.5029500006}, {"close": 21.88, "date": 1773235800000, "high": 21.97, "low": 21.61, "open": 21.74, "ticker": "BBVA", "volume": 1445370.2126360002}, {"close": 205.03, "date": 1773322200000, "high": 208.12, "low": 203.03, "open": 203.51, "ticker": "ALL", "volume": 1047729.5641219999}, {"close": 38.02, "date": 1773322200000, "high": 39.02, "low": 37.85, "open": 38.68, "ticker": "NVO", "volume": 15602645.984556}, {"close": 30.16, "date": 1773322200000, "high": 30.565, "low": 30, "open": 30.33, "ticker": "CMCSA", "volume": 18999250.029871996}, {"close": 18.97, "date": 1773322200000, "high": 19.2878, "low": 18.52, "open": 19.16, "ticker": "PBR", "volume": 48232633.064083}, {"close": 101.62, "date": 1773322200000, "high": 103.89, "low": 101.39, "open": 102.53, "ticker": "PDD", "volume": 4363665.006238}, {"close": 20.82, "date": 1773322200000, "high": 21.015, "low": 20.4728, "open": 20.87, "ticker": "BBVA", "volume": 1873449.828425}, {"close": 206.17, "date": 1773408600000, "high": 208.5612, "low": 205.93, "open": 207.49, "ticker": "ALL", "volume": 730269.9609010001}, {"close": 37.96, "date": 1773408600000, "high": 38.8, "low": 37.7, "open": 38.39, "ticker": "NVO", "volume": 10632485.334485}, {"close": 30.16, "date": 1773408600000, "high": 30.55, "low": 30.105, "open": 30.33, "ticker": "CMCSA", "volume": 15749896.153376997}, {"close": 18.57, "date": 1773408600000, "high": 18.965, "low": 18.55, "open": 18.87, "ticker": "PBR", "volume": 32548933.990131002}, {"close": 102.65, "date": 1773408600000, "high": 103.63, "low": 102.13, "open": 102.53, "ticker": "PDD", "volume": 3500600.9788920004}, {"close": 20.45, "date": 1773408600000, "high": 20.98, "low": 20.365, "open": 20.84, "ticker": "BBVA", "volume": 1519754.926119}, {"close": 207.81, "date": 1773667800000, "high": 210.17, "low": 206.99, "open": 206.99, "ticker": "ALL", "volume": 1134650.0888919998}, {"close": 38.58, "date": 1773667800000, "high": 38.59, "low": 37.79, "open": 37.97, "ticker": "NVO", "volume": 9863566.755407002}, {"close": 30.34, "date": 1773667800000, "high": 30.559, "low": 30.06, "open": 30.16, "ticker": "CMCSA", "volume": 15475764.593118}, {"close": 19.17, "date": 1773667800000, "high": 19.29, "low": 18.7, "open": 18.83, "ticker": "PBR", "volume": 25965557.796366}, {"close": 103.84, "date": 1773667800000, "high": 105.54, "low": 103.46, "open": 104.615, "ticker": "PDD", "volume": 2993593.059053}, {"close": 20.92, "date": 1773667800000, "high": 21.02, "low": 20.73, "open": 20.76, "ticker": "BBVA", "volume": 1526558.806618}, {"close": 207.27, "date": 1773754200000, "high": 212.15, "low": 207.005, "open": 211.06, "ticker": "ALL", "volume": 940880.439205}, {"close": 38.43, "date": 1773754200000, "high": 39.27, "low": 38.38, "open": 38.67, "ticker": "NVO", "volume": 11115249.938476002}, {"close": 30.08, "date": 1773754200000, "high": 30.785, "low": 30.045, "open": 30.595, "ticker": "CMCSA", "volume": 17295504.829425003}, {"close": 19.51, "date": 1773754200000, "high": 19.89, "low": 19.345, "open": 19.52, "ticker": "PBR", "volume": 25832723.075141}, {"close": 104.37, "date": 1773754200000, "high": 105.75, "low": 104.31, "open": 105.17, "ticker": "PDD", "volume": 3532408.2269249996}, {"close": 20.88, "date": 1773754200000, "high": 21.23, "low": 20.73, "open": 21.12, "ticker": "BBVA", "volume": 1268146.2139670001}, {"close": 204.38, "date": 1773840600000, "high": 207.53, "low": 204.2, "open": 207.01, "ticker": "ALL", "volume": 831074.4276800001}, {"close": 37.45, "date": 1773840600000, "high": 37.69, "low": 37, "open": 37.44, "ticker": "NVO", "volume": 22309236.328491002}, {"close": 28.57, "date": 1773840600000, "high": 30.11, "low": 28.53, "open": 29.94, "ticker": "CMCSA", "volume": 24452035.025847003}, {"close": 19.77, "date": 1773840600000, "high": 19.88, "low": 19.61, "open": 19.61, "ticker": "PBR", "volume": 26746222.21658}, {"close": 100.72, "date": 1773840600000, "high": 104.5425, "low": 100.125, "open": 103.72, "ticker": "PDD", "volume": 6244354.269861}, {"close": 20.77, "date": 1773840600000, "high": 21.115, "low": 20.75, "open": 20.95, "ticker": "BBVA", "volume": 1133240.978705}, {"close": 204.07, "date": 1773927000000, "high": 207.29, "low": 203.25, "open": 206.57, "ticker": "ALL", "volume": 1029472.066576}, {"close": 37.08, "date": 1773927000000, "high": 37.2453, "low": 36.36, "open": 36.36, "ticker": "NVO", "volume": 16469364.004352001}, {"close": 28.98, "date": 1773927000000, "high": 29.34, "low": 28.71, "open": 28.785, "ticker": "CMCSA", "volume": 24219257.608069003}, {"close": 19.78, "date": 1773927000000, "high": 20.2798, "low": 19.69, "open": 19.76, "ticker": "PBR", "volume": 39370319.092382}, {"close": 97.43, "date": 1773927000000, "high": 99.5, "low": 96.88, "open": 99.5, "ticker": "PDD", "volume": 10001723.115231998}, {"close": 20.94, "date": 1773927000000, "high": 21.05, "low": 20.25, "open": 20.26, "ticker": "BBVA", "volume": 1580869.609919}, {"close": 205.62, "date": 1774013400000, "high": 207.08, "low": 203.33, "open": 204.06, "ticker": "ALL", "volume": 1287657.2110170003}, {"close": 36.53, "date": 1774013400000, "high": 37, "low": 36.175, "open": 36.49, "ticker": "NVO", "volume": 21292543.149802}, {"close": 29.02, "date": 1774013400000, "high": 29.515, "low": 28.84, "open": 28.925, "ticker": "CMCSA", "volume": 36614806.215188995}, {"close": 18.8, "date": 1774013400000, "high": 19.43, "low": 18.69, "open": 19.415, "ticker": "PBR", "volume": 37994908.07165299}, {"close": 96.19, "date": 1774013400000, "high": 99.24, "low": 96.05, "open": 97, "ticker": "PDD", "volume": 5650563.400035001}, {"close": 20.54, "date": 1774013400000, "high": 21.1, "low": 20.37, "open": 21.1, "ticker": "BBVA", "volume": 2008854.7627879998}, {"close": 207.76, "date": 1774272600000, "high": 209.73, "low": 206.505, "open": 209.46, "ticker": "ALL", "volume": 768385.438588}, {"close": 36.82, "date": 1774272600000, "high": 37.21, "low": 36.48, "open": 36.83, "ticker": "NVO", "volume": 11937454.037777}, {"close": 29.01, "date": 1774272600000, "high": 29.385, "low": 28.83, "open": 29.125, "ticker": "CMCSA", "volume": 18858688.898831002}, {"close": 19.27, "date": 1774272600000, "high": 19.42, "low": 18.53, "open": 18.74, "ticker": "PBR", "volume": 49350969.364236}, {"close": 96.25, "date": 1774272600000, "high": 97.3245, "low": 95.37, "open": 97, "ticker": "PDD", "volume": 6790350.8011179995}, {"close": 21.44, "date": 1774272600000, "high": 21.81, "low": 21.08, "open": 21.08, "ticker": "BBVA", "volume": 2705308.5235829996}, {"close": 207.31, "date": 1774359000000, "high": 210.3, "low": 207.105, "open": 207.84, "ticker": "ALL", "volume": 886538.9961509999}, {"close": 36.89, "date": 1774359000000, "high": 37.2, "low": 36.545, "open": 36.85, "ticker": "NVO", "volume": 13138916.009788003}, {"close": 29.22, "date": 1774359000000, "high": 29.705, "low": 28.93, "open": 29.04, "ticker": "CMCSA", "volume": 15391907.336104}, {"close": 19.75, "date": 1774359000000, "high": 20, "low": 19.36, "open": 19.42, "ticker": "PBR", "volume": 26844265.274566997}, {"close": 98.09, "date": 1774359000000, "high": 99.54, "low": 96.05, "open": 96.53, "ticker": "PDD", "volume": 7699677.770229}, {"close": 21.35, "date": 1774359000000, "high": 21.515, "low": 20.73, "open": 20.84, "ticker": "BBVA", "volume": 4780560.845339}, {"close": 204.71, "date": 1774445400000, "high": 208.68, "low": 204.2, "open": 207.41, "ticker": "ALL", "volume": 1071485.196339}, {"close": 36.33, "date": 1774445400000, "high": 37.39, "low": 36.23, "open": 37.15, "ticker": "NVO", "volume": 13240909.184097}, {"close": 28.73, "date": 1774445400000, "high": 29.42, "low": 28.61, "open": 29.16, "ticker": "CMCSA", "volume": 16545977.640759}, {"close": 19.82, "date": 1774445400000, "high": 20.01, "low": 19.45, "open": 19.45, "ticker": "PBR", "volume": 21487025.691207}, {"close": 102.61, "date": 1774445400000, "high": 107.65, "low": 98.86, "open": 100.92, "ticker": "PDD", "volume": 15918611.856868003}, {"close": 21.49, "date": 1774445400000, "high": 21.79, "low": 21.385, "open": 21.71, "ticker": "BBVA", "volume": 2283696.627128}, {"close": 207.16, "date": 1774531800000, "high": 207.21, "low": 203.985, "open": 205.08, "ticker": "ALL", "volume": 642261.1696050001}, {"close": 36.4, "date": 1774531800000, "high": 37.44, "low": 36.1301, "open": 36.29, "ticker": "NVO", "volume": 18073533.770361003}, {"close": 28.72, "date": 1774531800000, "high": 29.15, "low": 28.61, "open": 28.73, "ticker": "CMCSA", "volume": 17195807.765918}, {"close": 20.33, "date": 1774531800000, "high": 20.605, "low": 19.94, "open": 19.97, "ticker": "PBR", "volume": 32126531.792511}, {"close": 100.62, "date": 1774531800000, "high": 105.11, "low": 99.81, "open": 102.09, "ticker": "PDD", "volume": 9055036.114850001}, {"close": 20.92, "date": 1774531800000, "high": 21.33, "low": 20.92, "open": 21.17, "ticker": "BBVA", "volume": 1119294.968358}, {"close": 202.71, "date": 1774618200000, "high": 209.4, "low": 201.61, "open": 209.4, "ticker": "ALL", "volume": 914975.7594590001}, {"close": 36.04, "date": 1774618200000, "high": 36.49, "low": 35.89, "open": 36.31, "ticker": "NVO", "volume": 13192918.442297}, {"close": 28.33, "date": 1774618200000, "high": 28.815, "low": 28.26, "open": 28.7, "ticker": "CMCSA", "volume": 14654460.049454}, {"close": 20.77, "date": 1774618200000, "high": 20.79, "low": 20.2808, "open": 20.38, "ticker": "PBR", "volume": 28128895.757779002}, {"close": 99.81, "date": 1774618200000, "high": 102.425, "low": 99.5149, "open": 100.53, "ticker": "PDD", "volume": 6020921.879507}, {"close": 20.42, "date": 1774618200000, "high": 20.87, "low": 20.32, "open": 20.63, "ticker": "BBVA", "volume": 1361285.5300719999}, {"close": 207.27, "date": 1774877400000, "high": 209.0537, "low": 203.42, "open": 204.55, "ticker": "ALL", "volume": 713049.2822809999}, {"close": 35.29, "date": 1774877400000, "high": 35.6278, "low": 35.12, "open": 35.13, "ticker": "NVO", "volume": 15982718.288623}, {"close": 28.9, "date": 1774877400000, "high": 29.23, "low": 28.38, "open": 28.61, "ticker": "CMCSA", "volume": 20520461.025229998}, {"close": 20.81, "date": 1774877400000, "high": 21.4, "low": 20.6, "open": 20.83, "ticker": "PBR", "volume": 48073069.763008}, {"close": 98.42, "date": 1774877400000, "high": 100.53, "low": 97.86, "open": 99.83, "ticker": "PDD", "volume": 6317362.099314}, {"close": 20.33, "date": 1774877400000, "high": 20.685, "low": 20.26, "open": 20.62, "ticker": "BBVA", "volume": 1565213.7866939998}, {"close": 207.34, "date": 1774963800000, "high": 208.88, "low": 204.12, "open": 208.18, "ticker": "ALL", "volume": 816917.188232}, {"close": 36.75, "date": 1774963800000, "high": 36.75, "low": 35.32, "open": 35.41, "ticker": "NVO", "volume": 16523697.495644}, {"close": 28.71, "date": 1774963800000, "high": 29.29, "low": 28.365, "open": 29.28, "ticker": "CMCSA", "volume": 19190055.974221}, {"close": 20.75, "date": 1774963800000, "high": 21.325, "low": 20.24, "open": 20.86, "ticker": "PBR", "volume": 47958738.523034}, {"close": 102.18, "date": 1774963800000, "high": 102.95, "low": 97.39, "open": 98.61, "ticker": "PDD", "volume": 9453046.425147}, {"close": 21.66, "date": 1774963800000, "high": 21.66, "low": 20.88, "open": 20.93, "ticker": "BBVA", "volume": 1598677.5736449996}, {"close": 204.1, "date": 1775050200000, "high": 206.8431, "low": 203.42, "open": 206.05, "ticker": "ALL", "volume": 1278669.6431730003}, {"close": 36.48, "date": 1775050200000, "high": 37.09, "low": 35.78, "open": 36.77, "ticker": "NVO", "volume": 22342556.183355004}, {"close": 28.05, "date": 1775050200000, "high": 28.39, "low": 27.75, "open": 28.23, "ticker": "CMCSA", "volume": 22500809.162811004}, {"close": 20.08, "date": 1775050200000, "high": 20.555, "low": 19.78, "open": 20.36, "ticker": "PBR", "volume": 54111171.30595}, {"close": 101.78, "date": 1775050200000, "high": 104.1, "low": 101.515, "open": 102.67, "ticker": "PDD", "volume": 5921561.02164}, {"close": 21.82, "date": 1775050200000, "high": 22.005, "low": 21.69, "open": 21.91, "ticker": "BBVA", "volume": 920965.3136160001}, {"close": 207.03, "date": 1775136600000, "high": 207.84, "low": 204.162, "open": 204.96, "ticker": "ALL", "volume": 1048891.7274260002}, {"close": 36.98, "date": 1775136600000, "high": 36.975, "low": 35.625, "open": 36.09, "ticker": "NVO", "volume": 13348917.785967}, {"close": 27.93, "date": 1775136600000, "high": 28.1576, "low": 27.575, "open": 28.04, "ticker": "CMCSA", "volume": 14317800.25712}, {"close": 20.56, "date": 1775136600000, "high": 21.02, "low": 20.45, "open": 20.69, "ticker": "PBR", "volume": 28316807.558795996}, {"close": 100.87, "date": 1775136600000, "high": 101.64, "low": 99.51, "open": 100.555, "ticker": "PDD", "volume": 3456983.6391249998}, {"close": 21.92, "date": 1775136600000, "high": 21.915, "low": 21.08, "open": 21.24, "ticker": "BBVA", "volume": 1361160.6965149997}, {"close": 208.36, "date": 1775482200000, "high": 208.495, "low": 205.925, "open": 206.05, "ticker": "ALL", "volume": 521298.66918400006}, {"close": 36.67, "date": 1775482200000, "high": 37.42, "low": 36.515, "open": 37, "ticker": "NVO", "volume": 10492874.568658002}, {"close": 27.66, "date": 1775482200000, "high": 28.17, "low": 27.63, "open": 27.99, "ticker": "CMCSA", "volume": 16228478.492354}, {"close": 20.86, "date": 1775482200000, "high": 20.89, "low": 20.47, "open": 20.68, "ticker": "PBR", "volume": 13726932.369797999}, {"close": 100.91, "date": 1775482200000, "high": 102.75, "low": 100.665, "open": 100.94, "ticker": "PDD", "volume": 3543075.818697}, {"close": 21.82, "date": 1775482200000, "high": 22.1, "low": 21.83, "open": 22.1, "ticker": "BBVA", "volume": 1248519.790922}, {"close": 210.53, "date": 1775568600000, "high": 210.81, "low": 207.29, "open": 208.51, "ticker": "ALL", "volume": 760784.873685}, {"close": 36.91, "date": 1775568600000, "high": 37.035, "low": 35.97, "open": 36.4, "ticker": "NVO", "volume": 12568005.867409002}, {"close": 27.79, "date": 1775568600000, "high": 27.925, "low": 27.48, "open": 27.73, "ticker": "CMCSA", "volume": 24400255.532486}, {"close": 20.71, "date": 1775568600000, "high": 21.11, "low": 20.59, "open": 20.95, "ticker": "PBR", "volume": 13701079.787316}, {"close": 99.54, "date": 1775568600000, "high": 100.75, "low": 98.45, "open": 100.405, "ticker": "PDD", "volume": 3704191.3269930007}, {"close": 22.22, "date": 1775568600000, "high": 22.28, "low": 21.705, "open": 21.88, "ticker": "BBVA", "volume": 1438986.3521049998}, {"close": 212.07, "date": 1775655000000, "high": 212.34, "low": 209.28, "open": 210, "ticker": "ALL", "volume": 850195.8227659999}, {"close": 37.61, "date": 1775655000000, "high": 38.19, "low": 37.325, "open": 38.03, "ticker": "NVO", "volume": 12020957.362650998}, {"close": 27.96, "date": 1775655000000, "high": 28.085, "low": 27.66, "open": 27.79, "ticker": "CMCSA", "volume": 16968821.746920004}, {"close": 19.98, "date": 1775655000000, "high": 20.045, "low": 19.105, "open": 19.19, "ticker": "PBR", "volume": 45075964.502758995}, {"close": 103.75, "date": 1775655000000, "high": 104.8, "low": 102.51, "open": 102.51, "ticker": "PDD", "volume": 5540462.151345999}, {"close": 23.39, "date": 1775655000000, "high": 23.85, "low": 23.2, "open": 23.8, "ticker": "BBVA", "volume": 1173724.2948359998}, {"close": 214.52, "date": 1775741400000, "high": 216.15, "low": 210.4, "open": 210.91, "ticker": "ALL", "volume": 609668.5956779999}, {"close": 37.44, "date": 1775741400000, "high": 37.65, "low": 36.82, "open": 37.18, "ticker": "NVO", "volume": 9521819.55715}, {"close": 28.31, "date": 1775741400000, "high": 28.32, "low": 27.63, "open": 27.82, "ticker": "CMCSA", "volume": 17974105.969770998}, {"close": 20.69, "date": 1775741400000, "high": 20.97, "low": 20.31, "open": 20.37, "ticker": "PBR", "volume": 28528224.133753}, {"close": 100.57, "date": 1775741400000, "high": 103.87, "low": 99.05, "open": 102.88, "ticker": "PDD", "volume": 6832542.768201999}, {"close": 22.7, "date": 1775741400000, "high": 22.77, "low": 22.31, "open": 22.43, "ticker": "BBVA", "volume": 4139605.361607}, {"close": 210.99, "date": 1775827800000, "high": 214.32, "low": 208.3, "open": 214.03, "ticker": "ALL", "volume": 734985.6103970001}, {"close": 37.52, "date": 1775827800000, "high": 38.42, "low": 37.42, "open": 38.3, "ticker": "NVO", "volume": 10041530.004747}, {"close": 27.93, "date": 1775827800000, "high": 28.47, "low": 27.825, "open": 28.42, "ticker": "CMCSA", "volume": 14315287.109326003}, {"close": 21.51, "date": 1775827800000, "high": 21.54, "low": 20.81, "open": 20.81, "ticker": "PBR", "volume": 21767932.433437996}, {"close": 100.17, "date": 1775827800000, "high": 103.86, "low": 99.91, "open": 101.3, "ticker": "PDD", "volume": 4445543.540643}, {"close": 23.06, "date": 1775827800000, "high": 23.23, "low": 22.9901, "open": 23.1, "ticker": "BBVA", "volume": 1207867.769361}, {"close": 215.09, "date": 1776087000000, "high": 215.24, "low": 210.26, "open": 210.67, "ticker": "ALL", "volume": 698957.8124919999}, {"close": 37.98, "date": 1776087000000, "high": 38.01, "low": 36.95, "open": 37.135, "ticker": "NVO", "volume": 11465837.763871003}, {"close": 28.05, "date": 1776087000000, "high": 28.19, "low": 27.585, "open": 27.95, "ticker": "CMCSA", "volume": 14923533.021754999}, {"close": 21.97, "date": 1776087000000, "high": 22.05, "low": 21.69, "open": 21.85, "ticker": "PBR", "volume": 25471811.795918997}, {"close": 100.8, "date": 1776087000000, "high": 100.85, "low": 99.43, "open": 100.02, "ticker": "PDD", "volume": 3650396.1193690007}, {"close": 23.42, "date": 1776087000000, "high": 23.43, "low": 22.84, "open": 22.84, "ticker": "BBVA", "volume": 3660839.420785}, {"close": 214.9, "date": 1776173400000, "high": 215.93, "low": 213, "open": 213.81, "ticker": "ALL", "volume": 774607.085224}, {"close": 39.32, "date": 1776173400000, "high": 39.41, "low": 38.73, "open": 39.13, "ticker": "NVO", "volume": 16616018.988983002}, {"close": 28.13, "date": 1776173400000, "high": 28.375, "low": 27.795, "open": 27.83, "ticker": "CMCSA", "volume": 13056120.477197}, {"close": 21.04, "date": 1776173400000, "high": 21.65, "low": 20.86, "open": 21.59, "ticker": "PBR", "volume": 27084221.719102003}, {"close": 102.07, "date": 1776173400000, "high": 103.18, "low": 101.33, "open": 101.775, "ticker": "PDD", "volume": 5360470.736672001}, {"close": 23.63, "date": 1776173400000, "high": 23.74, "low": 23.51, "open": 23.53, "ticker": "BBVA", "volume": 1048867.1770259999}, {"close": 218.23, "date": 1776259800000, "high": 219.48, "low": 213.63, "open": 214.35, "ticker": "ALL", "volume": 812292.3959299999}, {"close": 40.81, "date": 1776259800000, "high": 40.8598, "low": 39.67, "open": 39.79, "ticker": "NVO", "volume": 16252438.735542}, {"close": 28.3, "date": 1776259800000, "high": 28.51, "low": 28.005, "open": 28.16, "ticker": "CMCSA", "volume": 13611321.052534997}, {"close": 20.54, "date": 1776259800000, "high": 21.025, "low": 20.45, "open": 20.82, "ticker": "PBR", "volume": 18617266.360561}, {"close": 101.97, "date": 1776259800000, "high": 102.96, "low": 101.1001, "open": 102.36, "ticker": "PDD", "volume": 4871050.907136}, {"close": 23.31, "date": 1776259800000, "high": 23.405, "low": 23.24, "open": 23.34, "ticker": "BBVA", "volume": 909780.628038}, {"close": 57.356, "date": 1776346200000, "high": 60.068, "low": 57.356, "open": 59.61, "ticker": "RYAAY", "volume": 1429593.982298}, {"close": 24.176, "date": 1776346200000, "high": 24.195, "low": 23.787, "open": 23.787, "ticker": "BCE", "volume": 1767319.3933070002}, {"close": 16.665, "date": 1776346200000, "high": 17.065, "low": 16.656, "open": 17.064, "ticker": "NWG", "volume": 2860931.4330749996}, {"close": 54.701, "date": 1776346200000, "high": 55.176, "low": 54.42, "open": 55.002, "ticker": "TCOM", "volume": 3925437.706541}, {"close": 97.131, "date": 1776346200000, "high": 97.863, "low": 96.758, "open": 97.035, "ticker": "ACGL", "volume": 1156874.275981}, {"close": 30.515, "date": 1776346200000, "high": 31.041, "low": 30.47, "open": 30.946, "ticker": "PUK", "volume": 428348.365527}, {"close": 49.808, "date": 1776346200000, "high": 49.938, "low": 48.4, "open": 48.419, "ticker": "PYPL", "volume": 10594781.125166}, {"close": 138.275, "date": 1776346200000, "high": 138.847, "low": 136.936, "open": 138.576, "ticker": "HIG", "volume": 940616.385457}, {"close": 109.491, "date": 1776346200000, "high": 110.47, "low": 108.213, "open": 108.213, "ticker": "KB", "volume": 136826.93005800003}, {"close": 75.173, "date": 1776346200000, "high": 76.524, "low": 75.053, "open": 76.07, "ticker": "SYF", "volume": 2521363.657585}, {"close": 69.918, "date": 1776346200000, "high": 72.888, "low": 69.692, "open": 71.992, "ticker": "DAL", "volume": 7740830.431012998}, {"close": 62.452, "date": 1776346200000, "high": 62.764, "low": 61.325, "open": 61.535, "ticker": "FISV", "volume": 3580588.5214950005}, {"close": 99.78, "date": 1776346200000, "high": 100.295, "low": 99.362, "open": 99.891, "ticker": "PRU", "volume": 1252838.1571479999}, {"close": 24.357, "date": 1776346200000, "high": 24.609, "low": 24.235, "open": 24.48, "ticker": "HMC", "volume": 2208860.0407600002}]
};
<\/script>
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"><\/script>
<script>
(function() {
  if (!window.markdownit) return;
  var md = window.markdownit({ html: false, linkify: true, typographer: false });
  var defaultLinkOpen = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener noreferrer');
    return defaultLinkOpen(tokens, idx, options, env, self);
  };
  document.querySelectorAll('script[type="text/markdown"]').forEach(function(el) {
    var container = el.parentElement;
    var src = el.textContent.replace(/^\\n+/, '').replace(/\\n+\\s*$/, '');
    var indent = (src.match(/^[ \\t]+/) || [''])[0];
    if (indent) src = src.split('\\n').map(function(line) { return line.replace(new RegExp('^' + indent), ''); }).join('\\n');
    el.remove();
    container.insertAdjacentHTML('beforeend', md.render(src));
  });
})();
<\/script>
<script>
(function() {
  var API = 'https://api-llm.prd.alva.ai';
  var BASE = '/api/v1/fs/read?path=/alva/home/harryzz/feeds/quality-value-screener/v1/data';
  var P = {
    rankings: BASE + '/screener/rankings/@last/60',
    summary:  BASE + '/screener/summary/@last/60',
    klines:   BASE + '/screener/klines/@last/200'
  };
  var STALE_MS = 12 * 60 * 60 * 1000; // 2x 6h cron cadence

  var FACTORS = [
    { name:'Value',  key:'valueScore',   weight:0.40, color:'#49a3a6', desc:'Normalized 1/P/E' },
    { name:'Quality',  key:'qualityScore', weight:0.40, color:'#2a9b7d', desc:'Normalized ROE' },
    { name:'Safety',   key:'safetyScore',  weight:0.20, color:'#a878dc', desc:'Normalized 1/(1+D/E)' }
  ];
  var BAND_LABEL = { elite:'Elite', strong:'Strong', average:'Average', weak:'Weak' };

  function chartInit(el) {
    if (!el) return null;
    try { var p = echarts.getInstanceByDom(el); if (p) p.dispose(); } catch(e){}
    return echarts.init(el);
  }
  function bandColor(b) {
    if (b==='elite') return '#2a9b7d';
    if (b==='strong') return '#54a5c2';
    if (b==='average') return '#ff9800';
    return '#e05357';
  }
  function scoreColor(s) { return s>=80 ? '#2a9b7d' : s>=70 ? '#54a5c2' : s>=60 ? '#ff9800' : '#e05357'; }
  function fmtCap(v) {
    if (v==null) return '--';
    var n = +v; if (isNaN(n)) return v;
    if (n>=1e12) return '$' + (n/1e12).toFixed(2) + 'T';
    if (n>=1e9)  return '$' + (n/1e9).toFixed(1) + 'B';
    if (n>=1e6)  return '$' + (n/1e6).toFixed(0) + 'M';
    return '$' + n.toLocaleString();
  }
  function escHTML(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function fmtEST(ms){
    if (!ms) return '--';
    try {
      var s = new Date(ms).toLocaleString('zh-CN',{timeZone:'America/New_York',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false});
      return s + ' EST';
    } catch(e){ return new Date(ms).toUTCString(); }
  }
  function sbHTML(score) {
    var c = scoreColor(score);
    return '<div class="score-cell"><div class="score-bar-track"><div class="score-bar-fill" style="width:'+score+'%;background:'+c+';"></div></div><span class="score-value" style="color:'+c+';">'+score+'</span></div>';
  }
  function fd(path) {
    var key = path.replace(BASE, '');
    var data = (window.__ALVA_OFFLINE_DATA__ || {})[key];
    if (data !== undefined) return Promise.resolve(data);
    return fetch(API + path).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); });
  }

  /* ── Group rankings by snapshot date ── */
  function groupByDate(records) {
    var m = {};
    records.forEach(function(r){ (m[r.date] = m[r.date] || []).push(r); });
    var dates = Object.keys(m).map(Number).sort(function(a,b){return a-b;});
    return dates.map(function(d){
      return { date:d, stocks: m[d].slice().sort(function(a,b){return a.rank-b.rank;}) };
    });
  }
  function groupSummariesByDate(summaries) {
    var m = {};
    summaries.forEach(function(s){ m[s.date] = s; });
    return m;
  }
  function groupKlinesByTicker(records) {
    var m = {};
    records.forEach(function(r){ (m[r.ticker] = m[r.ticker] || []).push(r); });
    Object.keys(m).forEach(function(t){ m[t].sort(function(a,b){return a.date-b.date;}); });
    return m;
  }

  /* ── Computed movers between two snapshots ── */
  function computeMovers(today, prior) {
    var tm = {}, pm = {};
    today.forEach(function(s){ tm[s.ticker] = s; });
    prior.forEach(function(s){ pm[s.ticker] = s; });
    var entries = today.filter(function(s){ return !pm[s.ticker]; });
    var dropouts = prior.filter(function(s){ return !tm[s.ticker]; });
    var changed = [];
    today.forEach(function(s){
      if (pm[s.ticker]) {
        var y = pm[s.ticker];
        changed.push({
          ticker:s.ticker, name:s.name, sector:s.sector,
          score:s.score, prevScore:y.score, scoreDelta: s.score - y.score,
          rank:s.rank, prevRank:y.rank, rankDelta: y.rank - s.rank,
          band:s.band
        });
      }
    });
    var gainers = changed.slice().sort(function(a,b){return b.scoreDelta-a.scoreDelta;});
    var decliners = changed.slice().sort(function(a,b){return a.scoreDelta-b.scoreDelta;});
    return {
      entries: entries.sort(function(a,b){return a.rank-b.rank;}),
      dropouts: dropouts.sort(function(a,b){return a.rank-b.rank;}),
      gainers: gainers.filter(function(c){return c.scoreDelta>0.5;}),
      decliners: decliners.filter(function(c){return c.scoreDelta<-0.5;}),
      changed: changed
    };
  }

  function deltaTag(today, priorMap) {
    if (!priorMap) return '<span class="delta-tag delta-flat">&mdash;</span>';
    if (!priorMap[today.ticker]) return '<span class="delta-tag delta-new">New</span>';
    var y = priorMap[today.ticker];
    var d = y.rank - today.rank;
    if (d>0) return '<span class="delta-tag delta-up">&uarr;'+d+'</span>';
    if (d<0) return '<span class="delta-tag delta-down">&darr;'+(-d)+'</span>';
    return '<span class="delta-tag delta-flat">&mdash;</span>';
  }
  function scoreDeltaTag(today, priorMap) {
    if (!priorMap || !priorMap[today.ticker]) return '';
    var d = today.score - priorMap[today.ticker].score;
    if (Math.abs(d)<0.5) return '<span class="delta-score">&mdash;</span>';
    var cls = d>0 ? 'up' : 'down';
    var sign = d>0 ? '+' : '';
    return '<span class="delta-score '+cls+'">'+sign+d+'</span>';
  }

  /* ── Table Builder ── */
  function bt(id, cols, rows, opts) {
    opts = opts || {};
    var el = document.getElementById(id); if (!el) return;
    if (!rows.length) {
      el.innerHTML = '<div style="font-size:13px;color:var(--text-n5);padding:24px;text-align:center;">No data available</div>';
      return;
    }
    var SPACER = '<div class="table-cell row-end-spacer" style="flex:0 0 var(--spacing-m);min-width:var(--spacing-m);padding:0;"></div>';
    var ROW_MW = cols.reduce(function(s,c){
      var px = parseInt(c.mw || c.width || '40', 10);
      return s + (isNaN(px) ? 40 : px);
    }, 0) + (opts.expandable ? 40 : 16) + 16 + cols.length * 16; /* + caret/spacer + row padding-left + flex gaps between the cols.length+1 cells */
    var rowStyle = 'min-width:'+ROW_MW+'px;';
    var h = '<div class="table-row table-header" style="'+rowStyle+'">';
    cols.forEach(function(c){
      var f = c.flex || (c.width ? '0 0 '+c.width : '1');
      var a = c.align==='right' ? 'justify-content:flex-end;text-align:right;' : '';
      h += '<div class="table-cell" style="flex:'+f+';min-width:'+(c.mw||'40px')+';'+a+'">'+c.label+'</div>';
    });
    if (opts.expandable) h += '<div class="table-cell caret-cell" style="flex:0 0 40px;min-width:40px;padding:0;justify-content:center;"></div>';
    else h += SPACER;
    h += '</div><div class="table-body">';
    rows.forEach(function(r, idx){
      var rowClass = 'table-row' + (opts.expandable ? ' expandable' : '');
      h += '<div class="'+rowClass+'" data-row-idx="'+idx+'" style="'+rowStyle+'">';
      cols.forEach(function(c){
        var f = c.flex || (c.width ? '0 0 '+c.width : '1');
        var a = c.align==='right' ? 'justify-content:flex-end;text-align:right;' : '';
        var v = c.render ? c.render(r) : (r[c.key]!=null ? r[c.key] : '--');
        h += '<div class="table-cell" style="flex:'+f+';min-width:'+(c.mw||'40px')+';'+a+'">'+v+'</div>';
      });
      if (opts.expandable) h += '<div class="table-cell caret-cell" style="flex:0 0 40px;min-width:40px;padding:var(--spacing-s) 0;justify-content:center;"><span class="expand-caret"></span></div>';
      else h += SPACER;
      h += '</div>';
      if (opts.expandable) h += '<div class="expand-panel" data-expand-idx="'+idx+'" style="display:none;"></div>';
    });
    h += '</div>';
    el.innerHTML = h;

    if (opts.expandable && typeof opts.onExpand==='function') {
      el.querySelectorAll('.table-row.expandable').forEach(function(rowEl){
        rowEl.addEventListener('click', function(){
          var idx = +rowEl.getAttribute('data-row-idx');
          var panel = el.querySelector('.expand-panel[data-expand-idx="'+idx+'"]');
          if (!panel) return;
          var isOpen = rowEl.classList.contains('open');
          if (isOpen) { rowEl.classList.remove('open'); panel.style.display='none'; }
          else {
            rowEl.classList.add('open'); panel.style.display='block';
            if (!panel.getAttribute('data-rendered')) {
              panel.innerHTML = opts.onExpand(rows[idx], idx);
              panel.setAttribute('data-rendered','1');
              if (typeof opts.afterExpand==='function') opts.afterExpand(rows[idx], idx, panel);
            }
          }
        });
      });
    }
  }

  /* ── Expand panel HTML ── */
  function buildExpandPanel(s, idx) {
    var ringId = 'ring-'+idx;
    var klineId = 'kline-'+idx;
    var rows = FACTORS.map(function(f){
      var pts = s[f.key] != null ? s[f.key] : 0;
      var pctOfMax = Math.max(0, Math.min(100, pts));
      return '<div class="breakdown-row">'+
        '<div class="breakdown-name">'+f.name+'</div>'+
        '<div class="breakdown-bar"><div class="breakdown-bar-fill" style="width:'+pctOfMax.toFixed(0)+'%;background:'+f.color+';"></div></div>'+
        '<div class="breakdown-raw">'+pts.toFixed(0)+' / 100</div>'+
        '<div class="breakdown-pts">×'+(f.weight*100).toFixed(0)+'%</div>'+
      '</div>';
    }).join('');

    var flagDefs = (window._STATE && window._STATE.flagDefs) || {};
    var flagHTML = '';
    if (s.flagsCsv && s.flagsCsv.length>0) {
      var labels = s.flagsCsv.split(',');
      flagHTML = '<div class="flag-cards">' + labels.map(function(label){
        var def = flagDefs[label] || { tier:s.flagTier, threshold:'', body:label };
        return '<div class="flag-card '+def.tier+'">'+
          '<div class="flag-card-title">'+
            '<span class="flag-card-tier">'+(def.tier==='hard'?'Hard':'Soft')+'</span>'+
            '<span>'+escHTML(label)+'</span>'+
            (def.threshold ? '<span class="flag-card-threshold">'+escHTML(def.threshold)+'</span>' : '')+
          '</div>'+
          '<div class="flag-card-body">'+escHTML(def.body)+'</div>'+
        '</div>';
      }).join('') + '</div>';
    }

    var WM = '<div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva"/></div>';
    return (
      '<div class="widget-grid">'+
        '<div class="widget-card col-4">'+
          '<div class="widget-title"><span class="widget-title-text">Composite Score</span></div>'+
          '<div class="widget-body fill chart-dotted-background" style="flex-direction:column;align-items:center;justify-content:center;">'+
            '<div class="chart-body" style="display:flex;align-items:center;justify-content:center;">'+
              '<div id="'+ringId+'" style="width:240px;height:240px;"></div>'+
              WM+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="widget-card col-4">'+
          '<div class="widget-title"><span class="widget-title-text">Three-Factor Breakdown (Value / Quality / Safety)</span></div>'+
          '<div class="widget-body fill" style="background:var(--grey-g01);padding:var(--spacing-l);flex-direction:column;align-items:stretch;justify-content:center;">'+
            rows+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="expand-charts">'+
        '<div class="widget-grid">'+
          '<div class="widget-card col-8">'+
            '<div class="widget-title">'+
              '<span class="widget-title-text">'+escHTML(s.ticker)+' &middot; Daily Candlestick (Adj.)</span>'+
              '<span class="widget-timestamp" id="'+klineId+'-meta">Loading...</span>'+
            '</div>'+
            '<div class="widget-body chart-dotted-background" style="flex-direction:column;align-items:stretch;">'+
              '<div class="chart-body">'+
                '<div id="'+klineId+'" style="width:100%;height:320px;"></div>'+
                WM+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      flagHTML
    );
  }

  function renderRing(elId, score, band) {
    var el = document.getElementById(elId); if (!el) return;
    var FONT = "'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif";
    var c = scoreColor(score);
    var label = (BAND_LABEL[band] || '').toUpperCase();
    var chart = chartInit(el);
    chart.setOption({
      animation: false,
      textStyle: { fontFamily: FONT },
      series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 100,
        radius: '78%',
        progress: { show: true, width: 14, roundCap: true, itemStyle: { color: c } },
        axisLine: { lineStyle: { width: 14, color: [[1, 'rgba(0,0,0,0.06)']] } },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: { show: false },
        detail: {
          valueAnimation: false,
          offsetCenter: [0, '-4%'],
          formatter: function(v){ return '{score|'+Math.round(v)+'}\\n{lbl|'+label+'}'; },
          rich: {
            score: { fontSize: 40, fontWeight: 400, color: '#1a1a1a', fontFamily: FONT, lineHeight: 48 },
            lbl:   { fontSize: 12, fontWeight: 500, color: c, fontFamily: FONT, lineHeight: 20, padding: [6,0,0,0] }
          }
        },
        data: [{ value: score }]
      }]
    });
  }

  function renderKline(elId, ticker) {
    var el = document.getElementById(elId);
    var meta = document.getElementById(elId + '-meta');
    if (!el) return;
    var bars = (window._STATE && window._STATE.klinesByTicker[ticker]) || [];
    if (!bars.length) {
      el.innerHTML = '<div class="kline-empty">No candlestick data for '+escHTML(ticker)+'.</div>';
      if (meta) meta.textContent = '';
      return;
    }
    var first = bars[0], last = bars[bars.length-1];
    var pctChange = first.close ? ((last.close-first.close)/first.close)*100 : 0;
    var pctSign = pctChange>0 ? '+' : '';
    var BULL = '#2a9b7d', BEAR = '#e05357';
    var pctColor = pctChange>=0 ? BULL : BEAR;
    if (meta) meta.innerHTML = bars.length+' bars &middot; Close $'+last.close.toFixed(2)+' &middot; <span style="color:'+pctColor+';">'+pctSign+pctChange.toFixed(2)+'%</span> period change';

    var FONT = "'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif";
    var TTC = { bg:'rgba(255,255,255,0.96)', border:'rgba(0,0,0,0.08)', title:'rgba(0,0,0,0.7)', text:'rgba(0,0,0,0.9)', pointer:'rgba(0,0,0,0.1)' };
    var AX = {
      axisLine:{ show:false }, axisTick:{ show:false },
      axisLabel:{ fontSize:10, color:'rgba(0,0,0,0.7)', fontFamily:FONT, margin:8 },
      splitLine:{ show:false }
    };

    var candle = bars.map(function(b){return [b.date, b.open, b.close, b.low, b.high];});
    var vol = bars.map(function(b){
      return { value:[b.date, b.volume], itemStyle:{ color: b.close>=b.open ? 'rgba(42,155,125,0.45)' : 'rgba(224,83,87,0.45)' } };
    });

    var chart = chartInit(el);
    chart.setOption({
      animation: false,
      textStyle: { fontFamily: FONT },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross', link: [{ xAxisIndex:'all' }],
          lineStyle: { color: TTC.pointer, width: 1 },
          crossStyle: { color: TTC.pointer, width: 1 },
          label: { backgroundColor: 'rgba(0,0,0,0.55)', fontFamily: FONT, fontSize: 11 }
        },
        backgroundColor: TTC.bg, borderColor: TTC.border, borderWidth: 1, borderRadius: 6, padding: 12,
        textStyle: { fontFamily: FONT, fontSize: 12, fontWeight: 400, color: TTC.text },
        extraCssText: 'box-shadow:none;',
        formatter: function(ps){
          var t = '', rows = '';
          function row(label, value, dot){
            var marker = dot ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+dot+';"></span>' : '';
            return '<div style="display:flex;align-items:center;gap:6px;line-height:20px;">'+marker+
              '<span style="color:'+TTC.title+';">'+label+'</span>'+
              '<span style="color:'+TTC.text+';margin-left:auto;padding-left:24px;">'+value+'</span></div>';
          }
          ps.forEach(function(p){
            if (p.seriesType === 'candlestick') {
              t = new Date(p.value[0]).toLocaleDateString('zh-CN',{ year:'numeric', month:'2-digit', day:'2-digit' });
              var dir = p.value[2] >= p.value[1] ? BULL : BEAR;
              rows += row('Open',  '$'+p.value[1].toFixed(2), dir);
              rows += row('High',  '$'+p.value[4].toFixed(2));
              rows += row('Low',   '$'+p.value[3].toFixed(2));
              rows += row('Close', '$'+p.value[2].toFixed(2));
            } else if (p.seriesType === 'bar') {
              var v = p.value[1];
              var vs = v>=1e9 ? (v/1e9).toFixed(2)+'B' : v>=1e6 ? (v/1e6).toFixed(2)+'M' : v.toLocaleString();
              rows += row('Volume', vs);
            }
          });
          return '<div style="font-size:12px;color:'+TTC.title+';margin-bottom:6px;">'+t+'</div>'+rows;
        }
      },
      axisPointer: { link: [{ xAxisIndex:'all' }] },
      grid: [
        { left: 4, right: 4, top: 4,     height: '62%', containLabel: true },
        { left: 4, right: 4, top: '76%', height: '18%', containLabel: true }
      ],
      xAxis: [
        Object.assign({ type:'time', gridIndex:0 }, AX, { axisLabel:{ show:false } }),
        Object.assign({ type:'time', gridIndex:1 }, AX)
      ],
      yAxis: [
        Object.assign({ scale:true, gridIndex:0 }, AX, {
          axisLabel: Object.assign({}, AX.axisLabel, { formatter: function(v){ return '$'+v.toFixed(0); } })
        }),
        Object.assign({ scale:true, gridIndex:1 }, AX, { axisLabel:{ show:false } })
      ],
      series: [
        { name: ticker, type: 'candlestick', xAxisIndex: 0, yAxisIndex: 0, data: candle,
          itemStyle: { color: BULL, color0: BEAR, borderColor: BULL, borderColor0: BEAR, borderWidth: 1 } },
        { name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: vol,
          barMaxWidth: 16, itemStyle: { borderRadius: [1,1,0,0] } }
      ]
    });
    setTimeout(function(){ try{ chart.resize(); }catch(e){} }, 50);
  }

  /* ── Render Overview ── */
  function renderOverview(today, priorMap) {
    var cols = [
      { label:'#', width:'48px', mw:'48px', render:function(r){return '<span style="color:var(--text-n9);font-variant-numeric:tabular-nums;">'+r.rank+'</span>';} },
      { label:'Ticker', flex:'1', mw:'88px', render:function(r){return '<div style="font-weight:500;color:var(--main-m1);">'+escHTML(r.ticker)+'</div>';} },
      { label:'Name / Industry', flex:'1', mw:'280px', render:function(r){
        return '<div style="min-width:0;overflow:hidden;white-space:normal;"><div style="font-size:14px;line-height:20px;color:var(--text-n9);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;white-space:normal;word-break:break-word;">'+escHTML(r.name)+'</div>'+
          '<div style="font-size:12px;line-height:18px;color:var(--text-n5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+escHTML(r.industry||r.sector||'--')+'</div></div>';
      } },
      { label:'Sector', flex:'1', mw:'200px', render:function(r){return '<div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+escHTML(r.sector)+'</div>';} },
      { label:'Score', flex:'1', mw:'160px', render:function(r){return sbHTML(r.score)+scoreDeltaTag(r, priorMap);} },
      { label:'Band', flex:'1', mw:'88px', render:function(r){ return '<span class="band-pill '+r.band+'">'+BAND_LABEL[r.band]+'</span>'; } },
      { label:'Rank', flex:'1', mw:'88px', render:function(r){ return deltaTag(r, priorMap); } },
      { label:'P/E', flex:'1', mw:'88px', render:function(r){return r.peRatio.toFixed(2);} },
      { label:'ROE', flex:'1', mw:'88px', render:function(r){return r.roe.toFixed(1)+'%';} },
      { label:'D/E', flex:'1', mw:'88px', render:function(r){return r.debtToEquity.toFixed(2);} },
      { label:'Mkt Cap', flex:'1', mw:'88px', render:function(r){return fmtCap(r.marketCap);} },
      { label:'Flag', flex:'1', mw:'88px', render:function(r){
        var labels = r.flagsCsv ? r.flagsCsv.split(',') : [];
        if (!labels.length || r.flagTier==='clean') return '<span class="flag-pill clean">&mdash;</span>';
        var extra = labels.length - 1;
        return '<span class="flag-pill '+r.flagTier+'">'+escHTML(r.flagLabel)+(extra>0 ? ' <span class="flag-extra-count">+'+extra+'</span>' : '')+'</span>';
      } }
    ];
    bt('rankings-table', cols, today, {
      expandable:true,
      onExpand: function(r, idx){ return buildExpandPanel(r, idx); },
      afterExpand: function(r, idx){
        renderRing('ring-'+idx, r.score, r.band);
        renderKline('kline-'+idx, r.ticker);
      }
    });
  }

  function renderMoversCards(movers) {
    document.getElementById('entries-count').textContent = movers.entries.length;
    document.getElementById('dropouts-count').textContent = movers.dropouts.length;
    var renderList = function(arr, mode, max){
      if (!arr.length) return '<div class="mover-empty">No changes</div>';
      return arr.slice(0, max||5).map(function(s){
        var detail = '';
        if (mode==='entry') detail = '<span class="mover-detail" style="color:#2a9b7d;">#'+s.rank+' · '+s.score+'</span>';
        else if (mode==='drop') detail = '<span class="mover-detail" style="color:var(--text-n5);">was #'+s.rank+'</span>';
        else {
          var sign = s.scoreDelta>0 ? '+' : '';
          var col = s.scoreDelta>0 ? '#2a9b7d' : '#e05357';
          detail = '<span class="mover-detail" style="color:'+col+';">'+sign+s.scoreDelta+'</span>';
        }
        return '<div class="mover-row"><div style="display:flex;align-items:center;min-width:0;">'+
          '<span class="mover-ticker">'+escHTML(s.ticker)+'</span>'+
          '<span class="mover-name">'+escHTML(s.name||'')+'</span>'+
        '</div>'+detail+'</div>';
      }).join('');
    };
    document.getElementById('entries-list').innerHTML = renderList(movers.entries,'entry');
    document.getElementById('dropouts-list').innerHTML = renderList(movers.dropouts,'drop');
    document.getElementById('gainers-list').innerHTML = renderList(movers.gainers,'gain');
    document.getElementById('decliners-list').innerHTML = renderList(movers.decliners,'decline');
  }

  function renderMoverTables(movers) {
    var cols = [
      { label:'Ticker', width:'80px', render:function(r){return '<span style="color:var(--main-m1);font-weight:400;">'+escHTML(r.ticker)+'</span>';} },
      { label:'Name', flex:'2', mw:'140px', render:function(r){return '<div style="overflow:hidden;text-overflow:ellipsis;font-size:13px;">'+escHTML(r.name||'')+'</div>';} },
      { label:'Score', width:'120px', render:function(r){return sbHTML(r.score);} },
      { label:'Δ', width:'70px', align:'right', render:function(r){
        var sign = r.scoreDelta>0 ? '+' : '';
        var col = r.scoreDelta>0 ? '#2a9b7d' : '#e05357';
        return '<span style="color:'+col+';font-weight:400;font-size:13px;">'+sign+r.scoreDelta+'</span>';
      } }
    ];
    bt('full-gainers-table', cols, movers.gainers, {});
    bt('full-decliners-table', cols, movers.decliners, {});
  }

  function renderBasketTrend(dailySummaries, selectedKey) {
    var el = document.getElementById('basket-trend-chart'); if (!el) return;
    if (dailySummaries.length < 2) {
      document.getElementById('trends-empty').style.display = 'block';
      var card = el.closest('.widget-card'); if (card) card.style.display='none';
      return;
    }
    var card = el.closest('.widget-card'); if (card) card.style.display = '';
    document.getElementById('trends-empty').style.display = 'none';

    var labels = dailySummaries.map(function(d){return d.label;});
    var sizes  = dailySummaries.map(function(d){return d.totalPassed;});
    var avgs   = dailySummaries.map(function(d){return d.avgScore;});

    // Alva chart palette — 2 series, no grey
    var BAR_MAIN = '#5f75c9';   // --chart-purple1-main (Eligible — selected)
    var BAR_DIM  = '#9ab1d7';   // --chart-purple1-2    (Eligible — non-selected)
    var LINE_MAIN = '#40a544';  // --chart-green1-main  (Avg Score)
    var FONT = "'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif";
    var TTC = { bg:'rgba(255,255,255,0.96)', border:'rgba(0,0,0,0.08)', title:'rgba(0,0,0,0.7)', text:'rgba(0,0,0,0.9)', pointer:'rgba(0,0,0,0.1)' };
    var AX = {
      axisLine:{ show:false }, axisTick:{ show:false },
      axisLabel:{ fontSize:10, color:'rgba(0,0,0,0.7)', fontFamily:FONT, margin:8 },
      splitLine:{ show:false }
    };

    var chart = chartInit(el);
    chart.setOption({
      animation:false,
      textStyle:{ fontFamily:FONT },
      grid:{ top:8, right:4, bottom:4, left:4, containLabel:true },
      tooltip:{
        trigger:'axis',
        backgroundColor:TTC.bg, borderColor:TTC.border, borderWidth:1, borderRadius:6, padding:12,
        textStyle:{ fontFamily:FONT, fontSize:12, fontWeight:400, color:TTC.text },
        axisPointer:{ type:'line', lineStyle:{ color:TTC.pointer, width:1 } },
        extraCssText:'box-shadow:none;',
        formatter:function(params){
          var t = params[0].axisValueLabel || params[0].axisValue;
          var s = '<div style="font-size:12px;color:'+TTC.title+';margin-bottom:6px;">'+t+'</div>';
          params.forEach(function(p){
            var v = p.seriesName==='Avg Score' ? Number(p.value).toFixed(1) : p.value;
            s += '<div style="display:flex;align-items:center;gap:6px;line-height:20px;">'+
              '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+p.color+';"></span>'+
              '<span style="color:'+TTC.text+';">'+p.seriesName+'</span>'+
              '<span style="color:'+TTC.text+';margin-left:auto;">'+v+'</span>'+
              '</div>';
          });
          return s;
        }
      },
      xAxis:Object.assign({ type:'category', data:labels, boundaryGap:true }, AX),
      yAxis:[
        Object.assign({ type:'value', min:0 }, AX),
        Object.assign({ type:'value', min:0, max:100 }, AX)
      ],
      series:[
        {
          name:'Eligible', type:'bar', yAxisIndex:0,
          barMaxWidth:16, barGap:'8px',
          data: sizes.map(function(v,i){
            var isSel = dailySummaries[i].key === selectedKey;
            return { value:v, itemStyle:{ color:isSel?BAR_MAIN:BAR_DIM, borderRadius:[1,1,0,0] } };
          })
        },
        {
          name:'Avg Score', type:'line', yAxisIndex:1,
          smooth:0.1, showSymbol:false, symbol:'circle', symbolSize:10,
          lineStyle:{ color:LINE_MAIN, width:1 },
          itemStyle:{ color:LINE_MAIN },
          emphasis:{ itemStyle:{ borderColor:'#ffffff', borderWidth:1, color:LINE_MAIN } },
          areaStyle:{
            color: new echarts.graphic.LinearGradient(0,0,0,1,[
              { offset:0, color:'rgba(64,165,68,0.15)' },
              { offset:1, color:'rgba(64,165,68,0)' }
            ])
          },
          data: avgs
        }
      ]
    });
  }

  function renderQualityMap(today) {
    var el = document.getElementById('quality-map-chart'); if (!el) return;
    var chart = chartInit(el);
    var pes = today.map(function(s){return s.peRatio;});
    var roes = today.map(function(s){return s.roe;});
    var peMin = Math.max(0, Math.floor(Math.min.apply(null, pes) - 0.5));
    var peMax = Math.ceil(Math.max.apply(null, pes) + 0.5);
    var roeMax = Math.ceil((Math.max.apply(null, roes) + 5) / 10) * 10;
    var data = today.map(function(s){
      var size = Math.max(10, Math.min(40, Math.log10((s.marketCap||1e9)/1e9 + 1) * 14));
      return {
        value:[s.peRatio, s.roe, s.score, s.marketCap, s.peRatio, s.roe],
        ticker:s.ticker, name:s.name, sector:s.sector, band:s.band,
        symbolSize:size,
        itemStyle:{color:bandColor(s.band), opacity:0.78, borderColor:'rgba(0,0,0,0.15)', borderWidth:0.5}
      };
    });

    var FONT = "'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif";
    var TTC = { bg:'rgba(255,255,255,0.96)', border:'rgba(0,0,0,0.08)', title:'rgba(0,0,0,0.7)', text:'rgba(0,0,0,0.9)', pointer:'rgba(0,0,0,0.1)' };
    var AX = {
      axisLine:{ show:false }, axisTick:{ show:false },
      axisLabel:{ fontSize:10, color:'rgba(0,0,0,0.7)', fontFamily:FONT, margin:8 },
      splitLine:{ show:false }
    };
    var NAME_STYLE = { fontSize:11, color:'rgba(0,0,0,0.7)', fontFamily:FONT };

    chart.setOption({
      animation:false,
      textStyle:{ fontFamily:FONT },
      grid:{ top:8, right:8, bottom:28, left:28, containLabel:true },
      tooltip:{
        trigger:'item',
        backgroundColor:TTC.bg, borderColor:TTC.border, borderWidth:1, borderRadius:6, padding:12,
        textStyle:{ fontFamily:FONT, fontSize:12, fontWeight:400, color:TTC.text },
        extraCssText:'box-shadow:none;',
        formatter:function(p){
          var s = p.data;
          function row(label, value, dot){
            var marker = dot ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+dot+';"></span>' : '';
            return '<div style="display:flex;align-items:center;gap:6px;line-height:20px;">'+marker+
              '<span style="color:'+TTC.title+';">'+label+'</span>'+
              '<span style="color:'+TTC.text+';margin-left:auto;padding-left:16px;">'+value+'</span></div>';
          }
          return '<div style="font-size:12px;color:'+TTC.title+';margin-bottom:6px;">'+escHTML(s.ticker)+' · '+escHTML(s.name||'')+'</div>'+
            row('Score', s.value[2]+' · '+BAND_LABEL[s.band], bandColor(s.band))+
            row('P/E', s.value[4].toFixed(2))+
            row('ROE', s.value[5].toFixed(1)+'%')+
            row('Mkt Cap', fmtCap(s.value[3]));
        }
      },
      xAxis:Object.assign({
        type:'value', min:peMin, max:peMax,
        name:'P/E (lower = cheaper)', nameLocation:'middle', nameGap:28, nameTextStyle:NAME_STYLE
      }, AX),
      yAxis:Object.assign({
        type:'value', min:0, max:roeMax,
        name:'ROE % (higher = more profitable)', nameLocation:'middle', nameGap:40, nameTextStyle:NAME_STYLE
      }, AX, {
        axisLabel:Object.assign({}, AX.axisLabel, { formatter:'{value}%' })
      }),
      series:[{
        type:'scatter', data:data,
        label:{ show:true, position:'right', formatter:function(p){return p.data.ticker;}, fontSize:10, color:'rgba(0,0,0,0.5)', fontFamily:FONT, distance:4 },
        labelLayout:{ hideOverlap:true }
      }]
    });
  }

  function renderSectorChart(today) {
    var el = document.getElementById('sector-chart'); if (!el) return;
    var group = {};
    today.forEach(function(s){
      var k = s.sector || 'Unknown';
      if (!group[k]) group[k] = { total:0, count:0 };
      group[k].total += s.score; group[k].count += 1;
    });
    var arr = Object.keys(group).map(function(k){ return { sector:k, avg: group[k].total/group[k].count, count: group[k].count }; });
    arr.sort(function(a,b){return b.avg-a.avg;});

    var FONT = "'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif";
    var TTC = { bg:'rgba(255,255,255,0.96)', border:'rgba(0,0,0,0.08)', title:'rgba(0,0,0,0.7)', text:'rgba(0,0,0,0.9)', pointer:'rgba(0,0,0,0.1)' };
    var AX = {
      axisLine:{ show:false }, axisTick:{ show:false },
      axisLabel:{ fontSize:10, color:'rgba(0,0,0,0.7)', fontFamily:FONT, margin:8 },
      splitLine:{ show:false }
    };

    var chart = chartInit(el);
    chart.setOption({
      animation:false,
      textStyle:{ fontFamily:FONT },
      grid:{ top:8, right:64, bottom:4, left:4, containLabel:true },
      tooltip:{
        trigger:'axis',
        axisPointer:{ type:'shadow', shadowStyle:{ color:'rgba(0,0,0,0.04)' } },
        backgroundColor:TTC.bg, borderColor:TTC.border, borderWidth:1, borderRadius:6, padding:12,
        textStyle:{ fontFamily:FONT, fontSize:12, fontWeight:400, color:TTC.text },
        extraCssText:'box-shadow:none;',
        formatter:function(ps){
          var p = ps[0], d = p.data;
          function row(label, value, dot){
            var marker = dot ? '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+dot+';"></span>' : '';
            return '<div style="display:flex;align-items:center;gap:6px;line-height:20px;">'+marker+
              '<span style="color:'+TTC.title+';">'+label+'</span>'+
              '<span style="color:'+TTC.text+';margin-left:auto;padding-left:16px;">'+value+'</span></div>';
          }
          return '<div style="font-size:12px;color:'+TTC.title+';margin-bottom:6px;">'+escHTML(d.name)+'</div>'+
            row('Avg Score', d.value.toFixed(1), scoreColor(d.value))+
            row('Stocks', d.count);
        }
      },
      xAxis:Object.assign({ type:'value', min:0, max:100 }, AX),
      yAxis:Object.assign({
        type:'category',
        data:arr.map(function(x){return x.sector;})
      }, AX, {
        axisLabel:Object.assign({}, AX.axisLabel, { fontSize:11 })
      }),
      series:[{
        type:'bar', barMaxWidth:16,
        data: arr.map(function(x){ return { name:x.sector, value:Math.round(x.avg*10)/10, count:x.count, itemStyle:{ color:scoreColor(x.avg), borderRadius:1 } }; }),
        label:{ show:true, position:'right', formatter:function(p){ return ' '+p.data.count+' stocks'; }, fontSize:10, color:'rgba(0,0,0,0.5)', fontFamily:FONT }
      }]
    });
  }

  function renderWorkedExample(s) {
    var el = document.getElementById('worked-example'); if (!el || !s) return;
    var rows = FACTORS.map(function(f){
      var raw = s[f.key] != null ? s[f.key] : 0;
      var contrib = raw * f.weight;
      return (f.name+'').padEnd(20,' ')+' = '+raw.toFixed(1).padStart(5,' ')+' / 100  ×  '+(f.weight*100).toFixed(0)+'%  =  '+contrib.toFixed(1)+' pts';
    });
    var totalContrib = FACTORS.reduce(function(a,f){ return a + (s[f.key]||0) * f.weight; }, 0);
    var displayed = s.score;
    // The displayed score is a rescaling (45 + 50 * normalized composite), so worked-example
    // shows the factor-weighted sum and the displayed score side by side — they are not
    // expected to match exactly; we verify sign/ordering consistency.
    var html = '<div class="worked-example-header">'+
      '<span class="worked-example-ticker">'+escHTML(s.ticker)+'</span>'+
      '<span class="worked-example-score">&middot; '+escHTML(s.name||'')+' &middot; Rank #'+s.rank+' &middot; Band '+BAND_LABEL[s.band]+'</span>'+
      '</div>'+
      '<div class="worked-example-rows">'+ rows.map(function(r){return '<div>'+r+'</div>';}).join('') +'</div>'+
      '<div class="worked-example-total">Factor-weighted sum (raw 0&ndash;100 scale) = '+totalContrib.toFixed(1)+
      ' &nbsp;|&nbsp; Display score (0&ndash;100 rescaled) = '+displayed+'</div>'+
      '<div class="worked-example-verify">&check; All three factors come from the same SDK observation; the display score is a linear rescaling of the composite across all eligible stocks in the basket, so its absolute value may differ from the weighted sum, but relative ordering is strictly preserved.</div>';
    el.innerHTML = html;
  }

  /* ── Tabs ── */
  var renderedTabs = { overview:false, trends:false, analysis:false, feed:true, methodology:false };
  var TAB_RENDERERS = {};
  var DATA_READY = false;
  function selectTab(name) {
    document.querySelectorAll('.tab .tab-item').forEach(function(t){
      if (t.getAttribute('data-tab')===name) t.classList.add('active'); else t.classList.remove('active');
    });
    document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active');});
    var panel = document.getElementById('panel-'+name); if (panel) panel.classList.add('active');
  }
  function syncFilterVisibility(name) {
    var wrap = document.getElementById('snap-filter'); if (!wrap) return;
    var multi = window._STATE && window._STATE.snapshotBuckets && window._STATE.snapshotBuckets.length>1;
    if (!multi) { wrap.style.display='none'; return; }
    wrap.style.display = 'inline-flex';
    wrap.style.visibility = (name==='methodology') ? 'hidden' : 'visible';
  }
  function activateTab(name) {
    selectTab(name); syncFilterVisibility(name);
    if (DATA_READY && !renderedTabs[name] && TAB_RENDERERS[name]) {
      renderedTabs[name] = true;
      try { TAB_RENDERERS[name](); } catch(e){ console.error('render',name,e); }
    }
    setTimeout(function(){
      document.querySelectorAll('#panel-'+name+' div').forEach(function(el){
        try { var c = echarts.getInstanceByDom(el); if (c) c.resize(); } catch(e){}
      });
    }, 60);
  }
  function setupTabs() {
    document.querySelectorAll('.tab .tab-item').forEach(function(it){
      it.addEventListener('click', function(){
        var name = it.getAttribute('data-tab');
        activateTab(name);
        try { history.replaceState(null,'','#'+name); } catch(e){}
      });
    });
  }

  function openModal(id) {
    var el = document.getElementById(id); if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    if (id === 'methodology-modal' && DATA_READY && !renderedTabs.methodology && TAB_RENDERERS.methodology) {
      renderedTabs.methodology = true;
      try { TAB_RENDERERS.methodology(); } catch(e){ console.error('methodology render', e); }
    }
  }
  function closeModal(id) {
    var el = document.getElementById(id); if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function setupModals() {
    document.querySelectorAll('[data-modal-open]').forEach(function(btn){
      btn.addEventListener('click', function(){ openModal(btn.getAttribute('data-modal-open')); });
    });
    document.addEventListener('playbook-readme-click', function(e){
      var id = e.detail && e.detail.modalId;
      if (id) openModal(id);
    });
    document.querySelectorAll('[data-modal-close]').forEach(function(btn){
      btn.addEventListener('click', function(e){ e.stopPropagation(); closeModal(btn.getAttribute('data-modal-close')); });
    });
    document.querySelectorAll('.modal-overlay').forEach(function(ov){
      ov.addEventListener('click', function(e){ if (e.target === ov) closeModal(ov.id); });
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(function(m){ closeModal(m.id); });
      }
    });
  }

  /* ── Snapshot bucket by timestamp (6h cadence → intraday naming) ── */
  function snapLabel(ms, todayKey) {
    var d = new Date(ms);
    var short = d.toLocaleString('en-US', { timeZone:'America/New_York', month:'short', day:'numeric', hour:'numeric', minute:'2-digit', hour12:true });
    var key = ms; // uniq by exact timestamp
    var todaySh = new Date(ms).toLocaleDateString('en-CA',{timeZone:'America/New_York'});
    if (todaySh === todayKey) {
      var hm = d.toLocaleString('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit',hour12:true});
      return { primary:'Today ' + hm, sub:'EST', key:key };
    }
    return { primary:short, sub:'EST', key:key };
  }

  function flagDefsFromSummary(summary) {
    var p75 = summary && summary.basketPeP75 != null ? summary.basketPeP75 : '?';
    var p25 = summary && summary.basketRoeP25 != null ? summary.basketRoeP25 : '?';
    var peN = summary && summary.basketPeValidCount || 0;
    var roeN = summary && summary.basketRoeValidCount || 0;
    return {
      'P/E Outlier': { tier:'hard', threshold:'P/E <= 3 or >= 25', body:'Valuation at hard-filter boundary; earnings quality suspect.' },
      'High D/E': { tier:'hard', threshold:'D/E >= 2.0', body:'Leverage is high; balance-sheet risk outweighs value signal.' },
      'Unusually High ROE': { tier:'soft', threshold:'ROE > 60%', body:'Verify whether driven by high leverage, buybacks, or one-time gains.' },
      'P/E Above Avg': { tier:'soft', threshold:'P/E > basket P75 ('+p75+', n='+peN+')', body:'Relatively expensive within the current value-stock basket.' },
      'ROE Below Avg': { tier:'soft', threshold:'ROE < basket P25 ('+p25+'%, n='+roeN+')', body:'Relatively weak profitability within the current value-stock basket.' }
    };
  }

  /* ── Snapshot Picker ── */
  function setupSnapshotPicker(buckets, selectedIdx, onSelect) {
    var wrap = document.getElementById('snap-filter');
    var trigger = document.getElementById('snap-filter-trigger');
    var menu = document.getElementById('snap-filter-menu');
    var valueEl = document.getElementById('snap-filter-value');
    if (!wrap || !trigger || !menu) return;
    if (buckets.length <= 1) { wrap.style.display='none'; return; }
    wrap.style.display = 'inline-flex';
    function refreshLabel() {
      var b = buckets[selectedIdx];
      valueEl.innerHTML = escHTML(b.label.primary) + ' <span class="filter-dropdown-value-sub">'+escHTML(b.label.sub)+'</span>';
    }
    refreshLabel();
    menu.innerHTML = buckets.slice().reverse().map(function(b){
      var i = buckets.indexOf(b);
      var active = i===selectedIdx ? ' active' : '';
      return '<button class="filter-dropdown-item'+active+'" data-idx="'+i+'">'+
        '<span>'+escHTML(b.label.primary)+'</span>'+
        '<span class="filter-dropdown-item-sub">'+escHTML(b.label.sub)+'</span>'+
        '</button>';
    }).join('');
    menu.querySelectorAll('.filter-dropdown-item').forEach(function(btn){
      btn.addEventListener('click', function(){
        var i = +btn.getAttribute('data-idx');
        selectedIdx = i;
        wrap.classList.remove('open');
        refreshLabel();
        Object.keys(renderedTabs).forEach(function(k){ renderedTabs[k] = false; });
        onSelect(i);
        // Re-render current active tab
        var active = document.querySelector('.tab .tab-item.active');
        if (active) activateTab(active.getAttribute('data-tab'));
      });
    });
    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      wrap.classList.toggle('open');
    });
    document.addEventListener('click', function(){ wrap.classList.remove('open'); });
  }

  /* ── Init ── */
  function setupFeedsPopover() {
    // Popover open/close/row-navigation now lives in <playbook-header>.
    // We subscribe to its custom events to keep existing detail-modal behavior.
    document.addEventListener('playbook-feed-click', function(e){
      var id = e && e.detail && e.detail.id;
      if (id) openFeedDetail(id);
    });
    document.addEventListener('playbook-feeds-viewall', function(){
      try {
        var top = window.top || window.parent;
        if (top && top !== window.self) { top.location.hash = 'automations'; return; }
      } catch(e) {}
      window.location.hash = 'automations';
    });
  }

  // ── Feed detail data (source: PlaybookInfoPopup.tsx DEFAULT_FEEDS) ──
  var FEED_DETAILS = {
    'capacity-monitor': {
      name: 'Capacity-Monitor',
      lastRun: '15m',
      runEvery: 'Every 5 minutes',
      totalRuns: 142,
      description:
        '**Signal Generation**\\nMonitors BTC/USDT on the 1-hour timeframe using MACD(12, 26, 9). A bullish crossover (MACD line crossing above signal line) triggers a long entry; a bearish crossover triggers an exit. Only one position is held at a time. The histogram slope is used as a secondary filter — flat or declining histograms after a crossover are treated as low-confidence and may be skipped.\\n\\n' +
        '**Risk Management**\\nEach trade risks a maximum of 2% of portfolio equity. A trailing stop-loss is placed at 1.5× ATR(14) below the entry price and tightens as the position moves into profit. If the drawdown exceeds 5% from the local equity peak, the feed pauses new entries until the next confirmed crossover. Position sizing is dynamically adjusted based on 30-day realized volatility.\\n\\n' +
        '**Data Sources & Frequency**\\nPulls 1-hour OHLCV candles from Binance and Coinbase every 60 seconds, cross-validates the close price, and recomputes the MACD histogram. Divergence between exchanges > 0.3% triggers a data-quality warning instead of a trade. Funding rate data from Binance Futures is also ingested to detect extreme sentiment.\\n\\n' +
        '**Multi-Timeframe Confirmation**\\nBefore executing any entry, the feed checks the 4-hour and daily MACD alignment. A long signal on the 1-hour chart is only acted upon if the 4-hour MACD histogram is positive and the daily MACD line is above its signal line. This triple-timeframe filter reduces false signals by approximately 40% based on backtested data from Jan 2023 to Dec 2025.\\n\\n' +
        '**Output Signals**\\nWrites a JSON signal to ~/feeds/btc-macd/signal.json containing: direction (long / flat), entry price, stop-loss level, current P&L, and a confidence score (0–1) derived from histogram momentum. Each signal includes a human-readable rationale string summarizing why the trade was taken or skipped.\\n\\n' +
        '**Performance Tracking**\\nMaintains a rolling 90-day performance ledger at ~/feeds/btc-macd/perf.json. Tracked metrics include: win rate, average R-multiple, Sharpe ratio, max drawdown, and total P&L in both BTC and USD terms. A weekly summary is pushed to the connected Slack webhook every Sunday at 00:00 UTC.\\n\\n' +
        '**Alert & Notification**\\nSends real-time alerts via Telegram and Slack when a new signal is generated, when a stop-loss is hit, or when the data-quality check fails. Alert messages include the current BTC price, signal direction, confidence score, and a link to the full signal JSON for manual review.',
      stats: { total: '142', success: 140, failed: 2 },
      history: (function(){
        var log142 =
          '[14:00:01.102Z] Starting feed execution...\\n' +
          '[14:00:01.205Z] Fetching OEM capacity data from 4 sources...\\n' +
          '[14:00:02.418Z] GE Vernova:        OK (38.2 GW)\\n' +
          '[14:00:02.892Z] Siemens Energy:    OK (31.1 GW)\\n' +
          '[14:00:03.105Z] MHPS:              OK (22.4 GW)\\n' +
          '[14:00:03.401Z] Shanghai Electric: OK (12.8 GW)\\n' +
          '[14:00:03.520Z] Computing delta: total=104.5 GW, YoY=+8.3%\\n' +
          '[14:00:03.890Z] Signal written to ~/feeds/.../signal.json\\n' +
          '[14:00:04.302Z] Completed successfully. 3.2s, 0.5 credits.';
        var out = [];
        for (var i = 0; i < 10; i++) {
          out.push({
            id: '#' + (142 - i),
            duration: '3.2s',
            timestamp: '04/01/2026 14:00',
            status: i === 3 ? 'failed' : 'success',
            log: i === 0 ? log142 : null
          });
        }
        return out;
      })()
    }
  };

  function renderFeedDescription(desc) {
    var host = document.getElementById('feed-detail-desc');
    host.innerHTML = '';
    desc.split('\\n\\n').forEach(function(block){
      var m = block.match(/^\\*\\*(.+?)\\*\\*\\n?([\\s\\S]*)$/);
      var wrap = document.createElement('div');
      wrap.className = 'feed-modal-desc-block';
      if (m) {
        var h = document.createElement('div'); h.className = 'feed-desc-h'; h.textContent = m[1]; wrap.appendChild(h);
        if (m[2]) { var p = document.createElement('div'); p.className = 'feed-desc-p'; p.textContent = m[2]; wrap.appendChild(p); }
      } else {
        var p2 = document.createElement('div'); p2.className = 'feed-desc-p'; p2.textContent = block; wrap.appendChild(p2);
      }
      host.appendChild(wrap);
    });
    var wrap = document.getElementById('feed-detail-desc-wrap');
    if (!wrap) return;
    wrap.classList.remove('expanded', 'overflows');
    wrap.style.maxHeight = '';
  }

  function measureFeedDescOverflow() {
    var wrap = document.getElementById('feed-detail-desc-wrap');
    if (!wrap) return;
    requestAnimationFrame(function(){
      var overflows = wrap.scrollHeight > 280;
      wrap.classList.toggle('overflows', overflows);
    });
  }

  function setupFeedDescToggle() {
    var btn = document.getElementById('feed-desc-toggle-btn');
    var wrap = document.getElementById('feed-detail-desc-wrap');
    if (!btn || !wrap) return;
    btn.addEventListener('click', function(){
      var expanded = wrap.classList.toggle('expanded');
      wrap.style.maxHeight = expanded ? (wrap.scrollHeight + 'px') : '280px';
      btn.setAttribute('aria-label', expanded ? 'Collapse description' : 'Expand description');
    });
  }

  function renderFeedHistory(history) {
    var host = document.getElementById('feed-history-list');
    host.innerHTML = '';
    history.forEach(function(run){
      var row = document.createElement('div'); row.className = 'feed-run-row';
      var head = document.createElement('div'); head.className = 'feed-run-head' + (run.log ? ' clickable' : '');
      var caret = document.createElement('span'); caret.className = 'feed-run-caret';
      var id = document.createElement('span'); id.className = 'feed-run-id'; id.textContent = run.id;
      var dur = document.createElement('span'); dur.className = 'feed-run-duration'; dur.textContent = run.duration;
      var ts = document.createElement('span'); ts.className = 'feed-run-time'; ts.textContent = run.timestamp;
      var st = document.createElement('span'); st.className = 'feed-run-status ' + (run.status === 'failed' ? 'failed' : 'success');
      head.appendChild(caret); head.appendChild(id); head.appendChild(dur); head.appendChild(ts); head.appendChild(st);
      row.appendChild(head);
      if (run.log) {
        var logWrap = document.createElement('div'); logWrap.className = 'feed-run-log';
        var pre = document.createElement('pre'); pre.className = 'feed-run-log-pre'; pre.textContent = run.log;
        logWrap.appendChild(pre); row.appendChild(logWrap);
        head.addEventListener('click', function(){ row.classList.toggle('open'); });
      }
      host.appendChild(row);
    });
  }

  function openFeedDetail(key) {
    var d = FEED_DETAILS[key]; if (!d) return;
    document.getElementById('feed-detail-title').textContent = d.name;
    document.getElementById('feed-detail-last-run').textContent = d.lastRun;
    document.getElementById('feed-detail-every').textContent = d.runEvery;
    document.getElementById('feed-detail-total-runs').textContent = d.totalRuns;
    document.getElementById('feed-stat-total').textContent = d.stats.total;
    document.getElementById('feed-stat-success').textContent = d.stats.success;
    document.getElementById('feed-stat-failed').textContent = d.stats.failed;
    renderFeedDescription(d.description);
    renderFeedHistory(d.history);
    openModal('feed-detail-modal');
    measureFeedDescOverflow();
  }

  function init() {
    setupTabs();
    setupModals();
    setupFeedsPopover();
    setupFeedDescToggle();
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        document.querySelectorAll('.tab-panel.active div').forEach(function(el){
          try { var c = echarts.getInstanceByDom(el); if (c) c.resize(); } catch(e){}
        });
      }, 100);
    });
    Promise.all([fd(P.rankings), fd(P.summary), fd(P.klines)]).then(function(res){
      var rankings = res[0] || [], summaries = res[1] || [], klines = res[2] || [];
      if (!rankings.length) {
        document.getElementById('overview-loading').style.display='none';
        document.getElementById('overview-error').style.display='block';
        document.getElementById('overview-error').textContent = 'No rankings data yet; waiting for first refresh.';
        return;
      }
      var grouped = groupByDate(rankings);
      var sumByDate = groupSummariesByDate(summaries);
      var klinesByTicker = groupKlinesByTicker(klines);

      // Each snapshot = one bucket (6h cadence → many per day)
      var todayKey = new Date().toLocaleDateString('en-CA',{timeZone:'America/New_York'});
      var buckets = grouped.map(function(g){
        return { key:g.date, dateMs:g.date, stocks:g.stocks, summary:sumByDate[g.date]||null, label:snapLabel(g.date, todayKey) };
      });

      // Default = latest
      var selectedIdx = buckets.length - 1;

      // Header timestamp — always latest
      var latest = buckets[buckets.length-1];
      var luEl = document.getElementById('last-updated');
      if (luEl) {
        if (latest && latest.summary && latest.summary.lastUpdated) {
          luEl.textContent = 'Last updated: ' + fmtEST(new Date(latest.summary.lastUpdated).getTime());
        } else {
          luEl.textContent = 'Last updated: ' + fmtEST(latest.dateMs);
        }
      }

      window._STATE = { buckets:buckets, snapshotBuckets:buckets, klinesByTicker:klinesByTicker, flagDefs: flagDefsFromSummary(latest.summary) };

      function buildForIdx(idx) {
        var curr = buckets[idx];
        var prior = idx > 0 ? buckets[idx-1] : null;
        var priorMap = null;
        if (prior) {
          priorMap = {}; prior.stocks.forEach(function(s){ priorMap[s.ticker] = s; });
        }
        window._STATE.flagDefs = flagDefsFromSummary(curr.summary);

        TAB_RENDERERS.overview = function(){
          document.getElementById('overview-loading').style.display='none';
          document.getElementById('overview-content').style.display='block';
          renderOverview(curr.stocks, priorMap);
        };
        TAB_RENDERERS.trends = function(){
          document.getElementById('trends-loading').style.display='none';
          document.getElementById('trends-content').style.display='block';
          if (prior) {
            var movers = computeMovers(curr.stocks, prior.stocks);
            document.getElementById('movers-section').style.display='block';
            document.getElementById('movers-firstrun').style.display='none';
            renderMoversCards(movers);
            renderMoverTables(movers);
          } else {
            document.getElementById('movers-section').style.display='none';
            document.getElementById('movers-firstrun').style.display='block';
          }
          // Basket trend — use all buckets with summary
          var trendData = buckets.filter(function(b){return b.summary;}).map(function(b){
            return { label:b.label.primary, totalPassed:b.summary.totalPassed, avgScore:b.summary.avgScore, key:b.key };
          });
          renderBasketTrend(trendData, curr.key);
        };
        TAB_RENDERERS.analysis = function(){
          document.getElementById('analysis-loading').style.display='none';
          document.getElementById('analysis-content').style.display='block';
          renderQualityMap(curr.stocks);
          renderSectorChart(curr.stocks);
        };
        TAB_RENDERERS.methodology = function(){ renderWorkedExample(curr.stocks[0]); };
      }

      buildForIdx(selectedIdx);
      DATA_READY = true;
      var initial = (location.hash || '').replace(/^#/, '');
      if (initial === 'methodology') {
        activateTab('overview');
        openModal('methodology-modal');
      } else {
        if (!TAB_RENDERERS.hasOwnProperty(initial) && initial !== 'overview') initial = 'overview';
        if (initial === 'methodology') initial = 'overview';
        activateTab(initial);
      }
      setupSnapshotPicker(buckets, selectedIdx, function(idx){ buildForIdx(idx); });
    }).catch(function(err){
      console.error(err);
      ['overview','trends','analysis'].forEach(function(t){
        document.getElementById(t+'-loading').style.display='none';
        var ee = document.getElementById(t+'-error');
        ee.style.display='block';
        ee.textContent = 'Failed to load: ' + err.message;
      });
    });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
<\/script>

</body>
`,r=a(i);function o(){return e.jsx("div",{className:"h-screen flex flex-col",style:{background:"var(--b0-page)"},children:e.jsx("div",{className:"flex-1 overflow-hidden",children:e.jsx("iframe",{srcDoc:r,title:"Template-Screener",className:"block h-full w-full border-0"})})})}function p({onNavigate:n}){return e.jsx(t,{activePage:"template-screener",onNavigate:n,children:e.jsx(o,{})})}export{p as default};
