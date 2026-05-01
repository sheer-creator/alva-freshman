import{j as e}from"./index-ztfbrm-l.js";import{A as n}from"./AppShell-Dztkzn3J.js";import{i as a}from"./inlinePlaybookHeader-BCaIwBIO.js";import"./referral-mock-BqTpnbXF.js";const s=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>S&amp;P 500 After a Q1 2026 Earnings Beat — Quarter-to-Date What-If</title>
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./components/playbook-header.css" />
<link rel="stylesheet" href="./components/discussion-panel.css" />
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"><\/script>
<script src="./components/playbook-header.js" defer><\/script>
<script src="./components/discussion-panel.js" defer><\/script>
<style>
  @font-face { font-family:'Delight'; src:url('https://alva-ai-static.b-cdn.net/fonts/Delight-Regular.ttf') format('truetype'); font-weight:400; font-display:swap; }
  @font-face { font-family:'Delight'; src:url('https://alva-ai-static.b-cdn.net/fonts/Delight-Medium.ttf') format('truetype'); font-weight:500; font-display:swap; }

  *, *::before, *::after { box-sizing:border-box; -ms-overflow-style:none; scrollbar-width:none; }
  *::-webkit-scrollbar { display:none; }

  html { height:100%; overflow:hidden; }
  body {
    height:100%; overflow-y:auto; overflow-x:hidden; margin:0;
    background:var(--b0-page); color:var(--text-n9);
    font-family:'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif;
    font-weight:400;
    -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:optimizeLegibility;
  }
  a { color:var(--text-n9); text-decoration:underline; }
  strong, b { font-weight:500; }

  /* ═══════════════ Playbook container ═══════════════ */
  .playbook-container {
    width:100%; max-width:2048px; margin:0 auto;
    padding: var(--spacing-xl) var(--spacing-xxl) var(--spacing-xxxxl);
  }
  @media (max-width:768px) {
    .playbook-container { padding: 0 var(--spacing-m) var(--spacing-xxxxl); }
  }

  /* ═══════════════ Section title ═══════════════ */
  .section-title {
    display:flex; width:100%; align-items:center; gap:12px;
    margin-top: var(--spacing-xxl);
    margin-bottom: var(--spacing-m);
    flex-wrap: wrap;
  }
  .playbook-container > .section-title:first-child { margin-top: var(--spacing-xs); }
  .section-title-text {
    font-size:20px; font-weight:400;
    color: var(--text-n9); letter-spacing:0.2px; line-height:28px;
  }
  .section-title-sub {
    font-size:12px; letter-spacing:0.12px; line-height:20px;
    color: var(--text-n5);
    padding-left:8px; border-left: 1px solid var(--line-l07);
  }
  .section-readme-btn {
    margin-left:auto;
    display:inline-flex; align-items:center; gap: var(--spacing-xxs);
    height:24px; padding: var(--spacing-xxxs) var(--spacing-xs);
    background: var(--b-r02);
    border: 0.5px solid var(--line-l2);
    border-radius: var(--radius-ct-s);
    font-family: inherit; font-size:12px; line-height:20px; letter-spacing:0.12px;
    color: var(--text-n9); cursor:pointer;
    transition: background .15s ease, border-color .15s ease;
  }
  .section-readme-btn:hover,
  .section-readme-btn:active {
    background: var(--b-r03);
    border-color: var(--line-l9);
  }
  .section-readme-icon {
    width:14px; height:14px; flex-shrink:0;
    background-color: currentColor;
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg') center / contain no-repeat;
  }

  /* ═══════════════ Widget grid (8 col) ═══════════════ */
  .widget-grid {
    display:grid; grid-template-columns: repeat(8, 1fr);
    gap: var(--spacing-xl); align-items: stretch;
  }
  .widget-grid + .widget-grid { margin-top: var(--spacing-xl); }
  .col-2 { grid-column: span 2; }
  .col-4 { grid-column: span 4; }
  .col-8 { grid-column: span 8; }
  @media (max-width: 768px) {
    .widget-grid { grid-template-columns: repeat(4, 1fr); gap: var(--spacing-l); }
    .col-2 { grid-column: span 2; }
    .col-4, .col-8 { grid-column: span 4; }
  }

  /* ═══════════════ Widget card ═══════════════ */
  .widget-card {
    background: transparent;
    display:flex; flex-direction:column;
    position:relative; overflow:visible;
  }
  .widget-title {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom: var(--spacing-m);
  }
  .widget-title-text {
    font-size:16px; font-weight:400; color:var(--text-n9);
    letter-spacing:0.14px; line-height:22px;
  }
  .widget-body {
    display:flex; border-radius: var(--radius-ct-s);
  }
  .alva-watermark {
    position:absolute; bottom: var(--spacing-m); right: var(--spacing-m);
    opacity:0.2; line-height:0; pointer-events:none;
  }

  /* ═══════════════ Free-text card + Markdown ═══════════════ */
  .free-text-body { padding: var(--spacing-l); width:100%; }
  .markdown-container {
    width:100%; display:flex; flex-direction:column;
    gap: var(--spacing-m);
  }
  .markdown-container * { box-sizing:border-box; }
  .markdown-container p {
    font-family:'Delight', sans-serif;
    font-size:16px; line-height:26px; letter-spacing:0.16px;
    color: var(--text-n9); margin:0; white-space:pre-wrap;
  }
  .markdown-container--m { gap: var(--spacing-xs); }
  .markdown-container--m p,
  .markdown-container--m li {
    font-size:14px; line-height:22px; letter-spacing:0.14px;
  }
  .markdown-container .pos { color: var(--main-m3); font-weight:500; }
  .markdown-container .neg { color: var(--main-m4); font-weight:500; }
  .widget-subtitle {
    font-size:12px; line-height:20px; letter-spacing:0.12px;
    color: var(--text-n5);
    margin-top: calc(-1 * var(--spacing-xs));
    margin-bottom: var(--spacing-m);
  }

  /* ═══════════════ Metric (KPI) card ═══════════════ */
  .kpi-body {
    background: var(--grey-g01);
    border-radius: var(--radius-ct-s);
    padding: var(--spacing-l);
    display:flex; flex-direction:column; gap: var(--spacing-xxs);
    position:relative;
  }
  .kpi-label {
    font-size:12px; line-height:20px; letter-spacing:0.12px;
    color: var(--text-n7);
  }
  .kpi-value {
    font-size:28px; line-height:36px; letter-spacing:0.28px;
    color: var(--text-n9); font-weight:400;
    font-variant-numeric: tabular-nums;
  }
  .kpi-value.pos { color: var(--main-m3); }
  .kpi-value.neg { color: var(--main-m4); }
  .kpi-foot {
    font-size:12px; line-height:18px; letter-spacing:0.12px;
    color: var(--text-n5);
  }

  /* ═══════════════ Chart card ═══════════════ */
  .widget-card:has(.chart-body) { overflow:hidden; }
  .chart-dotted-background {
    background-image: radial-gradient(circle, rgba(0,0,0,0.18) 0.6px, transparent 0.6px);
    background-size: 3px 3px;
  }
  .chart-body {
    flex:1; padding: var(--spacing-m);
    position:relative;
    border-radius: var(--radius-ct-s);
  }
  .chart-container { width:100%; height:560px; min-height:180px; }
  .chart-caption {
    font-size:12px; line-height:20px; letter-spacing:0.12px;
    color: var(--text-n5);
    margin-bottom: var(--spacing-m);
  }

  /* ═══════════════ Table card ═══════════════ */
  .table-card {
    display:flex; flex-direction:column;
    width:100%; isolation:isolate;
    overflow-x:auto;
  }
  .table-row {
    display:flex; width:100%;
    gap: var(--spacing-m);
    border-bottom: 1px solid var(--line-l07);
    padding: 12px 0;
  }
  .table-row.table-header { padding: 0 0 12px 0; }
  .table-row:last-child { border-bottom: none; }
  .table-cell {
    font-size:14px; line-height:22px; letter-spacing:0.14px;
    font-weight:400; white-space:nowrap;
    display:flex; align-items:center;
    color: var(--text-n9);
  }
  .table-row.table-header .table-cell {
    color: var(--text-n7);
  }
  .cell-right { justify-content: flex-end; }
  .cell-pos { color: var(--main-m3); }
  .cell-neg { color: var(--main-m4); }
  .cell-muted { color: var(--text-n5); }
  .cell-ticker { color: var(--text-n9); font-weight:500; }

  /* ═══════════════ Modal (Infant pattern) ═══════════════ */
  .modal-overlay {
    display:none; position:fixed; inset:0; z-index:1000;
    background: rgba(0,0,0,0.4);
    padding: var(--spacing-xxxxl) var(--spacing-m);
    align-items:center; justify-content:center;
  }
  .modal-overlay.open { display:flex; }
  .modal-panel {
    background: var(--b0-container, #fff);
    width:100%; max-width: 896px;
    max-height: 100%;
    border-radius: 12px;
    border: 0.5px solid var(--line-l2);
    padding: var(--spacing-xxl);
    display:flex; flex-direction:column; gap: var(--spacing-m);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
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
    background-color: var(--text-n9);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
    transition: opacity .15s ease;
  }
  .modal-close:hover { opacity: 0.6; }
  .modal-body { flex:1 1 auto; width:100%; overflow-y:auto; }

  /* Methodology inside modal */
  .method-section { margin-bottom: var(--spacing-xl); }
  .method-section:last-child { margin-bottom: 0; }
  .method-section h3 {
    font-size:16px; font-weight:500; letter-spacing:0.16px; line-height:22px;
    color: var(--text-n9);
    margin: 0 0 var(--spacing-m) 0;
  }
  .method-body {
    background: var(--grey-g01);
    border-radius: var(--radius-ct-l);
    padding: var(--spacing-l);
    display:flex; flex-direction:column; gap: var(--spacing-xs);
  }
  .method-body p {
    font-size:14px; line-height:22px; letter-spacing:0.14px;
    color: var(--text-n9); margin:0;
  }
  .method-body p + p { margin-top: var(--spacing-xs); }
  .method-refs {
    margin-top: var(--spacing-m);
    font-size:12px; line-height:20px; letter-spacing:0.12px;
    color: var(--text-n5);
  }
  .method-refs div + div { margin-top: var(--spacing-xxs); }

  .loading { color: var(--text-n5); font-style: italic; }
</style>
</head>
<body>

<!-- ═══════════════ PLAYBOOK INFO ═══════════════ -->
<playbook-header
    title="Template-Whatif"
    freq="15m"
    last-updated="15 minutes ago"
    owner="YGGYLL"
    owner-seed="YGGYLL"
    readme-modal="methodology-modal"
    star="12" remix="56" comments="6"
    description="Q1 2026 earnings across 43 S&amp;P 500 reporters through April 18. 93% beat — yet the typical next-day price move hovered around zero.">
    <script type="application/json" class="pb-feeds-data">
[
  {"id":"earnings-calendar","name":"Earnings-Calendar","interval":"1 hour","lastRun":"15 minutes ago","clickable":true},
  {"id":"reaction-monitor","name":"Reaction-Monitor","interval":"6 hours","lastRun":"2 hours ago"},
  {"id":"surprise-tracker","name":"Surprise-Tracker","interval":"Daily","lastRun":"2 hours ago"}
]
    <\/script>
</playbook-header>

<div class="playbook-container">

  <!-- ═══════════════ §1 Title + README chip ═══════════════ -->
  <div class="section-title">
    <span class="section-title-text">S&amp;P 500 After a Q1 2026 Earnings Beat — Quarter-to-Date What-If</span>
    <button type="button" class="section-readme-btn" data-modal-open="methodology-modal" aria-label="Open README">
      <span class="section-readme-icon" aria-hidden="true"></span>
      <span>README</span>
    </button>
  </div>

  <!-- ═══════════════ §2 Verdict hero ═══════════════ -->
  <div class="widget-grid">
    <div class="widget-card col-8">
      <div class="widget-body" style="background:var(--grey-g01); border-radius: var(--radius-ct-s);">
        <div class="free-text-body">
          <div class="markdown-container markdown-container--m">
            <p id="hero-sentence"><span class="loading">Loading live data…</span></p>
          </div>
        </div>
        <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva" /></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════ §3 Summary cards (dimension: single-event extremes) ═══════════════ -->
  <div class="widget-grid" id="summary-cards"></div>

  <!-- ═══════════════ §3 Supporting chart ═══════════════ -->
  <div class="widget-grid">
    <div class="widget-card col-8">
      <div class="widget-title">
        <span class="widget-title-text">Sector breakdown: beat rate vs. next-day price move</span>
      </div>
      <div class="widget-subtitle">11 GICS sectors, sorted by the share that beat. Darker green means a relatively higher value among sectors on that metric; darker red means relatively lower. Empty cells mean too few reporters so far.</div>
      <div class="chart-body chart-dotted-background">
        <div id="chart-heatmap" class="chart-container"></div>
        <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva" /></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════ §3 Event table ═══════════════ -->
  <div class="widget-grid">
    <div class="widget-card col-8">
      <div class="widget-title">
        <span class="widget-title-text">All 43 reporters, newest first</span>
      </div>
      <div class="widget-subtitle">One row per company · earnings surprise and next-day price move</div>
      <div class="table-card" id="event-table">
        <div class="table-row table-header">
          <div class="table-cell">Reported</div>
          <div class="table-cell">Ticker</div>
          <div class="table-cell">Company</div>
          <div class="table-cell">Sector</div>
          <div class="table-cell cell-right">Earnings surprise</div>
          <div class="table-cell cell-right">Pre-report price</div>
          <div class="table-cell cell-right">Next-day move</div>
        </div>
        <div id="event-table-body"><div class="table-row"><div class="table-cell cell-muted">Loading…</div></div></div>
      </div>
    </div>
  </div>

  <!-- ═══════════════ §3 References ═══════════════ -->
  <div class="widget-grid">
    <div class="widget-card col-8">
      <div class="widget-title">
        <span class="widget-title-text">References</span>
      </div>
      <div class="widget-body" style="background:var(--grey-g01); border-radius: var(--radius-ct-s);">
        <div class="free-text-body">
          <div class="markdown-container markdown-container--m">
            <p><strong>Trigger source:</strong> S&amp;P 500 constituents that reported Q1 2026 earnings between April 1 and April 18, 2026 (43 companies).</p>
            <p><strong>Data source:</strong> Alva SDK adjusted daily OHLCV for pre-report and next-day closes; FactSet Earnings Insight, CNBC, and Seeking Alpha for EPS consensus and reported figures.</p>
            <p><strong>Cited context:</strong> FactSet Earnings Insight (2026-04-17) — "88% have reported actual EPS above estimates, above the 5-year average of 78%"; Financials earnings growth rate +19.7%. Motley Fool (2026-04-15) — "This Industry Group Is the Most Positive About Q1 Earnings".</p>
          </div>
        </div>
        <div class="alva-watermark"><img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva" /></div>
      </div>
    </div>
  </div>

</div>

<!-- ═══════════════ README modal ═══════════════ -->
<div class="modal-overlay" id="methodology-modal" aria-hidden="true">
  <div class="modal-panel" role="dialog" aria-labelledby="methodology-modal-title">
    <div class="modal-title">
      <span id="methodology-modal-title">README</span>
      <div class="modal-close" data-modal-close="methodology-modal" aria-label="Close"></div>
    </div>
    <div class="modal-body">

      <div class="method-section">
        <h3>How we picked events</h3>
        <div class="method-body">
          <p>Every S&amp;P 500 company that reported Q1 2026 earnings between April 1 and April 18, 2026 — 43 companies in total. The April 18 cutoff is simply the last reporting day before this page was built.</p>
          <p>We group companies into the 11 standard GICS stock-market sectors so readers can see where beats and moves clustered. Sectors with only one reporter so far (for example, Energy) are still shown but reflect that one company only.</p>
        </div>
      </div>

      <div class="method-section">
        <h3>How we measured the moves</h3>
        <div class="method-body">
          <p><strong>Earnings surprise</strong> is how far reported earnings per share landed from the consensus analyst forecast just before the report, expressed as a percent of that forecast. Positive means a beat, negative a miss.</p>
          <p><strong>Next-day move</strong> is the percent change from the closing price right before the report to the first close on or after the report — typically the next trading session.</p>
          <p><em>Historical observation only — not investment advice.</em></p>
        </div>
      </div>

    </div>
  </div>
</div>

<script>
  (async () => {
    /* ── Tooltip + axis shared configs ── */
    const TT_COLORS = { bg:"rgba(255,255,255,0.96)", border:"rgba(0,0,0,0.08)", title:"rgba(0,0,0,0.7)", text:"rgba(0,0,0,0.9)" };
    const TT_BASE = {
      triggerOn: "click",
      backgroundColor: TT_COLORS.bg,
      borderColor: TT_COLORS.border,
      borderWidth: 1, borderRadius: 6, padding: 12,
      textStyle: { fontFamily: "'Delight', sans-serif", fontSize: 12, color: TT_COLORS.text },
      extraCssText: "box-shadow:none;",
    };

    /* ── Formatters ── */
    function fmtPct(v){ if (v == null || isNaN(v)) return "—"; return (v >= 0 ? "+" : "") + Number(v).toFixed(2) + "%"; }
    function fmtClose(v){ if (v == null || isNaN(v)) return "—"; return "$" + Number(v).toFixed(2); }
    function pctCls(v){ if (v == null || isNaN(v)) return "cell-muted"; return v > 0 ? "cell-pos" : v < 0 ? "cell-neg" : ""; }

    /* ══════════════════════ Live data ══════════════════════ */
    const events_raw = [{"date":1776755000086,"ticker":"JPM","company":"JPMorgan Chase","sector":"Financials","report_date":"2026-04-14","reported_eps":5.94,"consensus_eps":5.45,"eps_surprise_pct":8.9908,"pre_close":313.68,"post_close":311.12,"reaction_pct":-0.8161,"beat_status":"beat"},{"date":1776755000087,"ticker":"WFC","company":"Wells Fargo","sector":"Financials","report_date":"2026-04-14","reported_eps":1.62,"consensus_eps":1.4,"eps_surprise_pct":15.7143,"pre_close":86.64,"post_close":81.7,"reaction_pct":-5.7018,"beat_status":"beat"},{"date":1776755000088,"ticker":"GS","company":"Goldman Sachs","sector":"Financials","report_date":"2026-04-14","reported_eps":14.12,"consensus_eps":12.3,"eps_surprise_pct":14.7967,"pre_close":890.79,"post_close":909.63,"reaction_pct":2.115,"beat_status":"beat"},{"date":1776755000089,"ticker":"BAC","company":"Bank of America","sector":"Financials","report_date":"2026-04-15","reported_eps":0.9,"consensus_eps":0.82,"eps_surprise_pct":9.7561,"pre_close":53.35,"post_close":54.32,"reaction_pct":1.8182,"beat_status":"beat"},{"date":1776755000090,"ticker":"C","company":"Citigroup","sector":"Financials","report_date":"2026-04-15","reported_eps":2.08,"consensus_eps":1.78,"eps_surprise_pct":16.8539,"pre_close":129.58,"post_close":131.69,"reaction_pct":1.6283,"beat_status":"beat"},{"date":1776755000091,"ticker":"MS","company":"Morgan Stanley","sector":"Financials","report_date":"2026-04-15","reported_eps":2.43,"consensus_eps":2.22,"eps_surprise_pct":9.4595,"pre_close":183.34,"post_close":191.62,"reaction_pct":4.5162,"beat_status":"beat"},{"date":1776755000092,"ticker":"BLK","company":"BlackRock","sector":"Financials","report_date":"2026-04-15","reported_eps":12.15,"consensus_eps":11.5,"eps_surprise_pct":5.6522,"pre_close":1054.56,"post_close":1048.6,"reaction_pct":-0.5652,"beat_status":"beat"},{"date":1776755000093,"ticker":"PNC","company":"PNC Financial","sector":"Financials","report_date":"2026-04-15","reported_eps":3.85,"consensus_eps":3.6,"eps_surprise_pct":6.9444,"pre_close":221.2,"post_close":222.06,"reaction_pct":0.3888,"beat_status":"beat"},{"date":1776755000094,"ticker":"USB","company":"US Bancorp","sector":"Financials","report_date":"2026-04-16","reported_eps":1.12,"consensus_eps":0.98,"eps_surprise_pct":14.2857,"pre_close":56.37,"post_close":55.48,"reaction_pct":-1.5789,"beat_status":"beat"},{"date":1776755000095,"ticker":"SCHW","company":"Charles Schwab","sector":"Financials","report_date":"2026-04-16","reported_eps":1.05,"consensus_eps":0.96,"eps_surprise_pct":9.375,"pre_close":100.27,"post_close":92.62,"reaction_pct":-7.6294,"beat_status":"beat"},{"date":1776755000096,"ticker":"TFC","company":"Truist Financial","sector":"Financials","report_date":"2026-04-17","reported_eps":0.96,"consensus_eps":0.88,"eps_surprise_pct":9.0909,"pre_close":49.43,"post_close":50.57,"reaction_pct":2.3063,"beat_status":"beat"},{"date":1776755000097,"ticker":"FITB","company":"Fifth Third Bancorp","sector":"Financials","report_date":"2026-04-17","reported_eps":0.92,"consensus_eps":0.82,"eps_surprise_pct":12.1951,"pre_close":49.52,"post_close":50.34,"reaction_pct":1.6559,"beat_status":"beat"},{"date":1776755000098,"ticker":"KEY","company":"KeyCorp","sector":"Financials","report_date":"2026-04-17","reported_eps":0.36,"consensus_eps":0.33,"eps_surprise_pct":9.0909,"pre_close":21.67,"post_close":21.8,"reaction_pct":0.5999,"beat_status":"beat"},{"date":1776755000099,"ticker":"CFG","company":"Citizens Financial","sector":"Financials","report_date":"2026-04-17","reported_eps":0.88,"consensus_eps":0.82,"eps_surprise_pct":7.3171,"pre_close":64.41,"post_close":64.45,"reaction_pct":0.0621,"beat_status":"beat"},{"date":1776755000100,"ticker":"MTB","company":"M&T Bank","sector":"Financials","report_date":"2026-04-14","reported_eps":4.48,"consensus_eps":4.22,"eps_surprise_pct":6.1611,"pre_close":221.29,"post_close":220.51,"reaction_pct":-0.3525,"beat_status":"beat"},{"date":1776755000101,"ticker":"BK","company":"Bank of NY Mellon","sector":"Financials","report_date":"2026-04-11","reported_eps":1.82,"consensus_eps":1.66,"eps_surprise_pct":9.6386,"pre_close":127.56,"post_close":129.15,"reaction_pct":1.2465,"beat_status":"beat"},{"date":1776755000102,"ticker":"STT","company":"State Street","sector":"Financials","report_date":"2026-04-18","reported_eps":2.28,"consensus_eps":2.12,"eps_surprise_pct":7.5472,"pre_close":145.43,"post_close":150.18,"reaction_pct":3.2662,"beat_status":"beat"},{"date":1776755000103,"ticker":"ALLY","company":"Ally Financial","sector":"Financials","report_date":"2026-04-17","reported_eps":0.73,"consensus_eps":0.66,"eps_surprise_pct":10.6061,"pre_close":41.96,"post_close":45.36,"reaction_pct":8.103,"beat_status":"beat"},{"date":1776755000104,"ticker":"TSM","company":"Taiwan Semiconductor","sector":"Information Technology","report_date":"2026-04-16","reported_eps":2.58,"consensus_eps":2.22,"eps_surprise_pct":16.2162,"pre_close":375.1,"post_close":363.35,"reaction_pct":-3.1325,"beat_status":"beat"},{"date":1776755000105,"ticker":"ASML","company":"ASML Holding","sector":"Information Technology","report_date":"2026-04-15","reported_eps":6.48,"consensus_eps":6.18,"eps_surprise_pct":4.8544,"pre_close":1518.3,"post_close":1481.77,"reaction_pct":-2.406,"beat_status":"beat"},{"date":1776755000106,"ticker":"LRCX","company":"Lam Research","sector":"Information Technology","report_date":"2026-04-16","reported_eps":1.04,"consensus_eps":0.96,"eps_surprise_pct":8.3333,"pre_close":265.16,"post_close":260.96,"reaction_pct":-1.5839,"beat_status":"beat"},{"date":1776755000107,"ticker":"PLTR","company":"Palantir","sector":"Information Technology","report_date":"2026-04-14","reported_eps":0.16,"consensus_eps":0.15,"eps_surprise_pct":6.6667,"pre_close":132.37,"post_close":135.7,"reaction_pct":2.5157,"beat_status":"beat"},{"date":1776755000108,"ticker":"NFLX","company":"Netflix","sector":"Communication Services","report_date":"2026-04-17","reported_eps":6.52,"consensus_eps":5.88,"eps_surprise_pct":10.8844,"pre_close":107.79,"post_close":97.31,"reaction_pct":-9.7226,"beat_status":"beat"},{"date":1776755000109,"ticker":"OMC","company":"Omnicom","sector":"Communication Services","report_date":"2026-04-15","reported_eps":1.92,"consensus_eps":1.82,"eps_surprise_pct":5.4945,"pre_close":76.48,"post_close":77.49,"reaction_pct":1.3206,"beat_status":"beat"},{"date":1776755000110,"ticker":"UNH","company":"UnitedHealth","sector":"Health Care","report_date":"2026-04-17","reported_eps":7.18,"consensus_eps":7.52,"eps_surprise_pct":-4.5213,"pre_close":316.4,"post_close":324.63,"reaction_pct":2.6011,"beat_status":"miss"},{"date":1776755000111,"ticker":"JNJ","company":"Johnson & Johnson","sector":"Health Care","report_date":"2026-04-15","reported_eps":2.72,"consensus_eps":2.66,"eps_surprise_pct":2.2556,"pre_close":240.1,"post_close":238.67,"reaction_pct":-0.5956,"beat_status":"beat"},{"date":1776755000112,"ticker":"ABT","company":"Abbott Laboratories","sector":"Health Care","report_date":"2026-04-16","reported_eps":1.12,"consensus_eps":1.08,"eps_surprise_pct":3.7037,"pre_close":101.56,"post_close":95.47,"reaction_pct":-5.9965,"beat_status":"beat"},{"date":1776755000113,"ticker":"EW","company":"Edwards Lifesciences","sector":"Health Care","report_date":"2026-04-15","reported_eps":0.75,"consensus_eps":0.7,"eps_surprise_pct":7.1429,"pre_close":78.2,"post_close":78.2,"reaction_pct":0,"beat_status":"beat"},{"date":1776755000114,"ticker":"ELV","company":"Elevance Health","sector":"Health Care","report_date":"2026-04-16","reported_eps":10.12,"consensus_eps":10.38,"eps_surprise_pct":-2.5048,"pre_close":311.18,"post_close":315.82,"reaction_pct":1.4911,"beat_status":"miss"},{"date":1776755000115,"ticker":"PG","company":"Procter & Gamble","sector":"Consumer Staples","report_date":"2026-04-18","reported_eps":1.66,"consensus_eps":1.6,"eps_surprise_pct":3.75,"pre_close":146.93,"post_close":144.49,"reaction_pct":-1.6607,"beat_status":"beat"},{"date":1776755000116,"ticker":"KVUE","company":"Kenvue","sector":"Consumer Staples","report_date":"2026-04-17","reported_eps":0.26,"consensus_eps":0.25,"eps_surprise_pct":4,"pre_close":17.46,"post_close":17.61,"reaction_pct":0.8591,"beat_status":"beat"},{"date":1776755000117,"ticker":"UNP","company":"Union Pacific","sector":"Industrials","report_date":"2026-04-17","reported_eps":2.72,"consensus_eps":2.68,"eps_surprise_pct":1.4925,"pre_close":251.07,"post_close":251.14,"reaction_pct":0.0279,"beat_status":"beat"},{"date":1776755000118,"ticker":"CSX","company":"CSX Corp","sector":"Industrials","report_date":"2026-04-17","reported_eps":0.46,"consensus_eps":0.42,"eps_surprise_pct":9.5238,"pre_close":42.72,"post_close":43.32,"reaction_pct":1.4045,"beat_status":"beat"},{"date":1776755000119,"ticker":"PPG","company":"PPG Industries","sector":"Materials","report_date":"2026-04-17","reported_eps":1.98,"consensus_eps":1.88,"eps_surprise_pct":5.3191,"pre_close":112.16,"post_close":114.85,"reaction_pct":2.3984,"beat_status":"beat"},{"date":1776755000120,"ticker":"ALK","company":"Alaska Air","sector":"Industrials","report_date":"2026-04-16","reported_eps":-0.08,"consensus_eps":-0.18,"eps_surprise_pct":55.5556,"pre_close":42.54,"post_close":41.15,"reaction_pct":-3.2675,"beat_status":"beat"},{"date":1776755000121,"ticker":"UAL","company":"United Airlines","sector":"Industrials","report_date":"2026-04-15","reported_eps":1.06,"consensus_eps":0.82,"eps_surprise_pct":29.2683,"pre_close":97.2,"post_close":94.27,"reaction_pct":-3.0144,"beat_status":"beat"},{"date":1776755000122,"ticker":"AAL","company":"American Airlines","sector":"Industrials","report_date":"2026-04-17","reported_eps":-0.48,"consensus_eps":-0.62,"eps_surprise_pct":22.5806,"pre_close":12.27,"post_close":12.78,"reaction_pct":4.1565,"beat_status":"beat"},{"date":1776755000123,"ticker":"DAL","company":"Delta Air Lines","sector":"Industrials","report_date":"2026-04-10","reported_eps":0.68,"consensus_eps":0.6,"eps_surprise_pct":13.3333,"pre_close":67.83,"post_close":67.82,"reaction_pct":-0.0147,"beat_status":"beat"},{"date":1776755000124,"ticker":"GE","company":"GE Aerospace","sector":"Industrials","report_date":"2026-04-16","reported_eps":1.24,"consensus_eps":1.18,"eps_surprise_pct":5.0847,"pre_close":313.93,"post_close":298.29,"reaction_pct":-4.982,"beat_status":"beat"},{"date":1776755000125,"ticker":"NUE","company":"Nucor","sector":"Materials","report_date":"2026-04-14","reported_eps":1.52,"consensus_eps":1.42,"eps_surprise_pct":7.0423,"pre_close":189.67,"post_close":190.04,"reaction_pct":0.1951,"beat_status":"beat"},{"date":1776755000126,"ticker":"STLD","company":"Steel Dynamics","sector":"Materials","report_date":"2026-04-16","reported_eps":2.18,"consensus_eps":2.05,"eps_surprise_pct":6.3415,"pre_close":194.11,"post_close":195.75,"reaction_pct":0.8449,"beat_status":"beat"},{"date":1776755000127,"ticker":"SLB","company":"Schlumberger","sector":"Energy","report_date":"2026-04-18","reported_eps":0.72,"consensus_eps":0.86,"eps_surprise_pct":-16.2791,"pre_close":52.66,"post_close":52.2,"reaction_pct":-0.8735,"beat_status":"miss"},{"date":1776755000128,"ticker":"PLD","company":"Prologis","sector":"Real Estate","report_date":"2026-04-16","reported_eps":1.46,"consensus_eps":1.38,"eps_surprise_pct":5.7971,"pre_close":139.77,"post_close":142.17,"reaction_pct":1.7171,"beat_status":"beat"}];
    const sectors_raw = [{"date":1776755000129,"sector":"Financials","n_reported":18,"pct_beat":100,"median_surprise_pct":9.4172,"median_reaction_pct":0.9232},{"date":1776755000130,"sector":"Information Technology","n_reported":4,"pct_beat":100,"median_surprise_pct":7.5,"median_reaction_pct":-1.995},{"date":1776755000131,"sector":"Communication Services","n_reported":2,"pct_beat":100,"median_surprise_pct":8.1895,"median_reaction_pct":-4.201},{"date":1776755000132,"sector":"Health Care","n_reported":5,"pct_beat":60,"median_surprise_pct":2.2556,"median_reaction_pct":0},{"date":1776755000133,"sector":"Consumer Staples","n_reported":2,"pct_beat":100,"median_surprise_pct":3.875,"median_reaction_pct":-0.4008},{"date":1776755000134,"sector":"Industrials","n_reported":7,"pct_beat":100,"median_surprise_pct":13.3333,"median_reaction_pct":-0.0147},{"date":1776755000135,"sector":"Materials","n_reported":3,"pct_beat":100,"median_surprise_pct":6.3415,"median_reaction_pct":0.8449},{"date":1776755000136,"sector":"Energy","n_reported":1,"pct_beat":0,"median_surprise_pct":-16.2791,"median_reaction_pct":-0.8735},{"date":1776755000137,"sector":"Real Estate","n_reported":1,"pct_beat":100,"median_surprise_pct":5.7971,"median_reaction_pct":1.7171}];
    const stats_raw = [{"date":1776755000138,"n_total_reported":43,"overall_pct_beat":93.02,"aggregate_surprise_pct":7.5472,"median_reaction_pct":0.1951,"best_sector":"Financials","best_sector_pct_beat":100,"worst_sector":"Energy","worst_sector_pct_beat":null}];

    /* ── Dedupe latest-by-key ── */
    let events = events_raw;
    let sectors = sectors_raw;
    const byE = new Map();
    events.forEach(r => { const k = r.ticker + "|" + r.report_date; const p = byE.get(k); if (!p || (p.date || 0) < (r.date || 0)) byE.set(k, r); });
    events = Array.from(byE.values());
    const byS = new Map();
    sectors.forEach(r => { const p = byS.get(r.sector); if (!p || (p.date || 0) < (r.date || 0)) byS.set(r.sector, r); });
    sectors = Array.from(byS.values()).sort((a, b) => (b.pct_beat || 0) - (a.pct_beat || 0));
    const s = stats_raw[stats_raw.length - 1];

    /* ══════════════════════ §2 Verdict hero ══════════════════════ */
    document.getElementById("hero-sentence").innerHTML =
      \`<span class="pos">\${s.overall_pct_beat.toFixed(0)}%</span> of the <span class="pos">\${s.n_total_reported}</span> S&P 500 companies that reported Q1 2026 earnings through April 18 beat expectations, yet the typical next-day price move was just <span class="\${s.median_reaction_pct >= 0 ? 'pos' : 'neg'}">\${fmtPct(s.median_reaction_pct)}</span> — beating is no longer moving the stock.\`;

    /* ══════════════════════ §3 Summary cards — single-event extremes ══════════════════════
       Cutting dimension: per-company single-event extremes of the two hero atoms
       (93% beat rate → biggest beat; +0.2% typical move → biggest rally / biggest drop /
       count of beats that still fell). Every card is a tail of a hero atom. */
    let biggestBeat = { val: null, company: null, ticker: null };
    let biggestRally = { val: null, company: null, ticker: null };
    let biggestDrop = { val: null, company: null, ticker: null };
    let beatsThatFell = 0, totalBeats = 0;
    events.forEach(e => {
      if (e.eps_surprise_pct != null && (biggestBeat.val == null || e.eps_surprise_pct > biggestBeat.val)) {
        biggestBeat = { val: e.eps_surprise_pct, company: e.company, ticker: e.ticker };
      }
      if (e.reaction_pct != null && (biggestRally.val == null || e.reaction_pct > biggestRally.val)) {
        biggestRally = { val: e.reaction_pct, company: e.company, ticker: e.ticker };
      }
      if (e.reaction_pct != null && (biggestDrop.val == null || e.reaction_pct < biggestDrop.val)) {
        biggestDrop = { val: e.reaction_pct, company: e.company, ticker: e.ticker };
      }
      if (e.beat_status === "beat") {
        totalBeats += 1;
        if (e.reaction_pct != null && e.reaction_pct < 0) beatsThatFell += 1;
      }
    });
    const beatFellPct = totalBeats > 0 ? (beatsThatFell / totalBeats) * 100 : null;

    const cards = [
      { label: "Biggest single EPS beat",         val: fmtPct(biggestBeat.val),   pos: true,  foot: biggestBeat.company || "" },
      { label: "Biggest next-day rally",          val: fmtPct(biggestRally.val),  pos: true,  foot: biggestRally.company || "" },
      { label: "Biggest next-day drop",           val: fmtPct(biggestDrop.val),   pos: false, foot: biggestDrop.company || "" },
      { label: "Beat, then fell the next day",    val: beatFellPct == null ? "—" : Math.round(beatFellPct) + "%", pos: false, foot: \`\${beatsThatFell} of \${totalBeats} beats\` },
    ];
    const cg = document.getElementById("summary-cards");
    cg.innerHTML = "";
    cards.forEach(c => {
      const el = document.createElement("div");
      el.className = "widget-card col-2";
      el.innerHTML =
        \`<div class="kpi-body">
          <div class="kpi-label">\${c.label}</div>
          <div class="kpi-value \${c.pos ? 'pos' : 'neg'}">\${c.val}</div>
          <div class="kpi-foot">\${c.foot}</div>
        </div>\`;
      cg.appendChild(el);
    });

    /* ══════════════════════ Heatmap ══════════════════════ */
    const cols = [
      { key: "n_reported",          label: "Companies reported",    fmt: v => v == null ? "—" : String(v),                                                divergent: false },
      { key: "pct_beat",            label: "Percent beat EPS",      fmt: v => v == null ? "—" : Number(v).toFixed(0) + "%",                                divergent: false },
      { key: "median_surprise_pct", label: "Typical EPS surprise",  fmt: v => v == null ? "—" : (v >= 0 ? "+" : "") + Number(v).toFixed(1) + "%",          divergent: true  },
      { key: "median_reaction_pct", label: "Typical next-day move",  fmt: v => v == null ? "—" : (v >= 0 ? "+" : "") + Number(v).toFixed(2) + "%",       divergent: true  },
    ];

    const heatmapData = [];
    cols.forEach((col, cIdx) => {
      sectors.forEach((sec, rIdx) => {
        const v = sec[col.key];
        heatmapData.push({
          value: [cIdx, rIdx, v == null || isNaN(v) ? null : v],
          displayText: col.fmt(v),
          rawValue: v,
          sectorName: sec.sector,
          colLabel: col.label,
          cellExtra: \`\${sec.n_reported} companies in sample\`,
        });
      });
    });

    const sectorLabels = sectors.map(x => x.sector);
    const colLabels = cols.map(c => c.label);

    const heatEl = document.getElementById("chart-heatmap");
    const chart = echarts.init(heatEl);
    chart.setOption({
      grid: { left: 200, right: 40, top: 56, bottom: 40, containLabel: false },
      tooltip: { ...TT_BASE, trigger: "item", formatter: p => {
        const d = p.data;
        return \`<div style="font-size:12px;color:\${TT_COLORS.title};margin-bottom:6px;">\${d.sectorName} — \${d.colLabel}</div>\` +
               \`<div style="color:\${TT_COLORS.text};">Value: \${d.displayText}</div>\` +
               \`<div style="color:\${TT_COLORS.text};">\${d.cellExtra}</div>\`;
      } },
      xAxis: {
        type: "category",
        data: colLabels,
        position: "top",
        axisLabel: { fontSize: 11, color: "rgba(0,0,0,0.7)", fontFamily: "'Delight', sans-serif", interval: 0, fontWeight: 500 },
        axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false },
      },
      yAxis: {
        type: "category",
        data: sectorLabels,
        axisLabel: { fontSize: 11, color: "rgba(0,0,0,0.85)", fontFamily: "'Delight', sans-serif", fontWeight: 500 },
        axisLine: { show: false }, axisTick: { show: false }, splitArea: { show: false },
      },
      visualMap: { show: false, min: 0, max: 100 },
      series: [{
        name: "heatmap",
        type: "heatmap",
        data: heatmapData,
        label: { show: true, formatter: p => p.data.displayText, fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.85)" },
        itemStyle: {
          color: p => {
            const cIdx = p.value[0];
            const raw = p.data.rawValue;
            if (raw == null || isNaN(raw)) return "rgba(0,0,0,0.04)";
            const col = cols[cIdx];
            const vals = sectors.map(x => x[col.key]).filter(v => v != null && !isNaN(v));
            const vmin = Math.min(...vals);
            const vmax = Math.max(...vals);
            const range = vmax - vmin;
            if (range === 0) return "rgb(222,236,217)";
            if (col.divergent) {
              if (raw < 0) {
                const tn = Math.min(1, Math.abs(raw) / Math.max(1, Math.abs(vmin)));
                const r = 245 - tn * 50, g = 200 - tn * 100, b = 200 - tn * 100;
                return \`rgb(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)})\`;
              } else {
                const tp = Math.min(1, raw / Math.max(1, vmax));
                const r = 240 - tp * 140, g = 245 - tp * 60, b = 230 - tp * 110;
                return \`rgb(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)})\`;
              }
            } else {
              const t = (raw - vmin) / range;
              const r = 240 - t * 160, g = 245 - t * 90, b = 230 - t * 120;
              return \`rgb(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)})\`;
            }
          },
          borderColor: "#fff",
          borderWidth: 2,
        },
      }],
    });
    window.addEventListener("resize", () => chart.resize());

    /* ══════════════════════ Event table ══════════════════════ */
    const sorted = [...events].sort((a, b) => b.report_date.localeCompare(a.report_date));
    const body = document.getElementById("event-table-body");
    body.innerHTML = "";
    for (const e of sorted) {
      const row = document.createElement("div");
      row.className = "table-row";
      row.innerHTML =
        \`<div class="table-cell">\${e.report_date}</div>
         <div class="table-cell cell-ticker">\${e.ticker}</div>
         <div class="table-cell">\${e.company}</div>
         <div class="table-cell cell-muted">\${e.sector}</div>
         <div class="table-cell cell-right \${pctCls(e.eps_surprise_pct)}">\${fmtPct(e.eps_surprise_pct)}</div>
         <div class="table-cell cell-right">\${fmtClose(e.pre_close)}</div>
         <div class="table-cell cell-right \${pctCls(e.reaction_pct)}">\${fmtPct(e.reaction_pct)}</div>\`;
      body.appendChild(row);
    }

    /* ── initTableAlignment (Alva spec) ── */
    function initTableAlignment(tableEl){
      var rows = tableEl.querySelectorAll(".table-row");
      if (rows.length === 0) return;
      var colCount = rows[0].querySelectorAll(".table-cell").length;
      rows.forEach(function(row){
        row.style.removeProperty("min-width");
        var cells = row.querySelectorAll(".table-cell");
        for (var i = 0; i < cells.length; i++) cells[i].removeAttribute("style");
      });
      var colWidths = [];
      for (var col = 0; col < colCount; col++) {
        var maxW = 0;
        rows.forEach(function(row){
          var cell = row.querySelectorAll(".table-cell")[col];
          if (cell) maxW = Math.max(maxW, cell.scrollWidth);
        });
        colWidths.push(maxW);
      }
      var totalContent = 0;
      for (var i = 0; i < colWidths.length; i++) totalContent += colWidths[i];
      var gapTotal = (colCount - 1) * 16;
      var available = tableEl.clientWidth - gapTotal;
      var resolved = [];
      for (var col2 = 0; col2 < colCount; col2++) {
        var proportional = Math.round((colWidths[col2] / totalContent) * available);
        resolved.push(Math.max(colWidths[col2], proportional));
      }
      var totalWidth = gapTotal;
      for (var col3 = 0; col3 < colCount; col3++) {
        totalWidth += resolved[col3];
        rows.forEach(function(row){
          var cell = row.querySelectorAll(".table-cell")[col3];
          if (!cell) return;
          cell.style.flex = "0 0 " + resolved[col3] + "px";
        });
      }
      rows.forEach(function(row){ row.style.minWidth = totalWidth + "px"; });
    }
    var tableEl = document.getElementById("event-table");
    initTableAlignment(tableEl);
    window.addEventListener("resize", function(){ initTableAlignment(tableEl); });

    /* ══════════════════════ Modal ══════════════════════ */
    function openModal(id){
      var el = document.getElementById(id); if (!el) return;
      el.classList.add("open");
      el.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeModal(id){
      var el = document.getElementById(id); if (!el) return;
      el.classList.remove("open");
      el.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    document.querySelectorAll("[data-modal-open]").forEach(function(btn){
      btn.addEventListener("click", function(){ openModal(btn.getAttribute("data-modal-open")); });
    });
    document.addEventListener("playbook-readme-click", function(e){
      var id = e.detail && e.detail.modalId;
      if (id) openModal(id);
    });
    document.querySelectorAll("[data-modal-close]").forEach(function(btn){
      btn.addEventListener("click", function(e){ e.stopPropagation(); closeModal(btn.getAttribute("data-modal-close")); });
    });
    document.querySelectorAll(".modal-overlay").forEach(function(ov){
      ov.addEventListener("click", function(e){ if (e.target === ov) closeModal(ov.id); });
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(function(m){ closeModal(m.id); });
      }
    });
  })();
<\/script>

</body>
</html>
`,r=a(s);function o(){return e.jsx("div",{className:"h-screen flex flex-col",style:{background:"var(--b0-page)"},children:e.jsx("div",{className:"flex-1 overflow-hidden",children:e.jsx("iframe",{srcDoc:r,title:"Template-Whatif",className:"block h-full w-full border-0"})})})}function d({onNavigate:t}){return e.jsx(n,{activePage:"template-whatif",onNavigate:t,children:e.jsx(o,{})})}export{d as default};
