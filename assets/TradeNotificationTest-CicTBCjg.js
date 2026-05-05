import{j as n}from"./index-Dy33zb25.js";import{A as o}from"./AppShell-DiPdsFd4.js";import{i as e}from"./inlinePlaybookHeader-BCaIwBIO.js";import"./referral-mock-BqTpnbXF.js";const s=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Trade Notification Test — Alva</title>
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./components/playbook-header.css" />
<script src="./components/playbook-header.js" defer><\/script>
<style>
  @font-face { font-family:'Delight'; src:url('https://alva-ai-static.b-cdn.net/fonts/Delight-Regular.ttf') format('truetype'); font-weight:400; font-display:swap; }
  @font-face { font-family:'Delight'; src:url('https://alva-ai-static.b-cdn.net/fonts/Delight-Medium.ttf') format('truetype'); font-weight:500; font-display:swap; }

  *, *::before, *::after { box-sizing: border-box; -ms-overflow-style: none; scrollbar-width: none; }
  *::-webkit-scrollbar { display: none; }

  html { height: 100%; overflow: hidden; }
  body {
    height: 100%; overflow-y: auto; overflow-x: hidden; margin: 0;
    background: var(--b0-page); color: var(--text-n9);
    font-family: 'Delight', -apple-system, 'OPPO Sans 4.0', BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
  }

  /* Page container — same rhythm as other playbook pages */
  .playbook-container {
    width: 100%; max-width: 2048px; margin: 0 auto;
    padding: var(--sp-xl) var(--sp-xxl) var(--sp-xxxl);
  }

  /* Proposal panel — placed at the lower-left of the playbook header area */
  .proposal {
    width: 440px; max-width: 100%;
    display: flex; flex-direction: column; gap: var(--sp-s, 12px);
  }
  .proposal-tag-row {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
  }
  .proposal-badge {
    display: inline-flex; align-items: center;
    padding: 2px 8px;
    background: var(--main-m1-10);
    color: var(--main-m1);
    border-radius: var(--radius-ct-s, 4px);
    font-size: 11px; font-weight: 500;
    line-height: 18px; letter-spacing: 0.11px;
  }
  .proposal-caption {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
  }

  /* Modal mockup */
  .proposal-modal {
    display: flex; flex-direction: column; gap: var(--sp-m, 16px);
    width: 100%;
    padding: var(--sp-xl, 24px);
    background: var(--b0-container, #fff);
    border: 0.5px solid var(--line-l2);
    border-radius: 12px;
    box-shadow: var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08));
  }
  .proposal-modal-head {
    display: flex; align-items: center; justify-content: space-between;
  }
  .proposal-modal-title {
    margin: 0;
    font-size: 18px; font-weight: 500; line-height: 26px; letter-spacing: 0.18px;
    color: var(--text-n9);
  }
  .proposal-modal-close {
    width: 16px; height: 16px;
    background-color: var(--text-n7);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
  }
  .proposal-modal-divider {
    height: 1px; background: var(--line-l07);
  }

  .proposal-section { display: flex; flex-direction: column; gap: var(--sp-xs, 8px); }
  .proposal-section-head {
    display: flex; align-items: center; justify-content: space-between;
  }
  .proposal-section-title {
    margin: 0;
    font-size: 14px; font-weight: 500; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7);
  }
  .proposal-new {
    display: inline-flex; align-items: center;
    padding: 1px 6px;
    background: var(--main-m3-10);
    color: var(--main-m3);
    border-radius: var(--radius-ct-xs, 2px);
    font-size: 10px; font-weight: 500; line-height: 16px;
  }

  /* Fast-path entry — highlighted row */
  .proposal-fast {
    display: flex; align-items: center; gap: var(--sp-s, 12px);
    width: 100%;
    padding: var(--sp-m, 16px);
    background: var(--main-m1-10);
    border: 1px solid rgba(73, 163, 166, 0.24);
    border-radius: var(--radius-ct-l, 8px);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: filter .15s ease;
  }
  .proposal-fast:hover { filter: brightness(0.97); }
  .proposal-fast-icon-wrap {
    flex-shrink: 0;
    width: 40px; height: 40px;
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--b0-container, #fff);
    border-radius: 50%;
  }
  .proposal-fast-icon {
    width: 20px; height: 20px;
    background-color: var(--main-m1);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/alert-f2.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/alert-f2.svg') center / contain no-repeat;
  }
  .proposal-fast-body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
  .proposal-fast-title {
    margin: 0;
    font-size: 14px; font-weight: 500; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
  }
  .proposal-fast-desc {
    margin: 0;
    font-size: 11px; line-height: 18px; letter-spacing: 0.11px;
    color: var(--text-n7);
  }
  .proposal-fast-chev {
    flex-shrink: 0;
    width: 14px; height: 14px;
    background-color: var(--main-m1);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg') center / contain no-repeat;
  }

  /* "OR CONNECT AN EXCHANGE" divider */
  .proposal-or {
    display: flex; align-items: center; gap: var(--sp-s, 12px);
  }
  .proposal-or-line {
    flex: 1 1 auto; height: 1px; background: var(--line-l07);
  }
  .proposal-or-label {
    font-size: 11px; line-height: 18px; letter-spacing: 0.11px;
    color: var(--text-n5);
    text-transform: uppercase;
  }

  /* Broker grid */
  .proposal-group-title {
    margin: 0;
    font-size: 14px; font-weight: 500; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7);
  }
  .proposal-broker-grid {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--sp-xs, 8px);
  }
  .proposal-broker {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
    padding: 10px;
    background: var(--grey-g01);
    border-radius: var(--radius-ct-l, 8px);
  }
  .proposal-broker-logo {
    flex-shrink: 0;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--b-r07);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 500;
    color: var(--text-n7);
  }
  .proposal-broker-name {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* Annotation under the modal */
  .proposal-note {
    margin: 0;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
  }
  .proposal-note strong { color: var(--text-n9); font-weight: 500; }
</style>
</head>
<body>

<!-- ═══════════════ PLAYBOOK HEADER (same Web Component, Trade label) ═══════════════ -->
<!-- Note: alerts-label="Trade" hijacks the alerts CTA slot to render a Trade button.
     Visual is identical to the Trade variant in the design spec; popover behavior is
     placeholder for this design exploration. -->
<playbook-header
    title="Trade Notification Test"
    creator
    freq="15m"
    last-updated="15 minutes ago"
    owner="YGGYLL"
    owner-seed="YGGYLL"
    built-on="@leo/BTC Ultimate…"
    built-on-seed="leo"
    star="12" remix="56" comments="6"
    get-alerts
    alerts-label="Trade"
    description="Tracks the AI infrastructure investment thesis across silicon, networking, hyperscalers, power, and data centers. 17-stock basket with daily quant analysis and ADK-driven narrative.">
    <script type="application/json" class="pb-feeds-data">
[
  {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"20 Minutes","lastRun":"15 minutes ago"},
  {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"},
  {"id":"supply-chain","name":"Supply-Chain","interval":"6 hours","lastRun":"2 hours ago"}
]
    <\/script>
</playbook-header>

<div class="playbook-container">
  <!-- Proposal sketch — bottom-left of the playbook header area -->
  <section class="proposal">
    <div class="proposal-tag-row">
      <span class="proposal-badge">Proposal</span>
      <span class="proposal-caption">Trade binding modal — Just Alerts fast-path</span>
    </div>

    <div class="proposal-modal">
      <div class="proposal-modal-head">
        <p class="proposal-modal-title">Connect Account</p>
        <span class="proposal-modal-close" aria-hidden="true"></span>
      </div>
      <div class="proposal-modal-divider"></div>

      <!-- NEW: Just Alerts fast-path -->
      <div class="proposal-section">
        <div class="proposal-section-head">
          <p class="proposal-section-title">Notifications only</p>
          <span class="proposal-new">NEW</span>
        </div>
        <button class="proposal-fast" type="button">
          <span class="proposal-fast-icon-wrap"><span class="proposal-fast-icon" aria-hidden="true"></span></span>
          <span class="proposal-fast-body">
            <span class="proposal-fast-title">Get alerts without trading</span>
            <span class="proposal-fast-desc">Receive signals through your Alva Agent. No exchange account needed.</span>
          </span>
          <span class="proposal-fast-chev" aria-hidden="true"></span>
        </button>
      </div>

      <!-- Divider -->
      <div class="proposal-or">
        <div class="proposal-or-line"></div>
        <span class="proposal-or-label">Or connect an exchange</span>
        <div class="proposal-or-line"></div>
      </div>

      <!-- US Stock -->
      <div class="proposal-section">
        <p class="proposal-group-title">US Stock</p>
        <div class="proposal-broker-grid">
          <div class="proposal-broker"><span class="proposal-broker-logo">A</span><span class="proposal-broker-name">Alpaca</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">P</span><span class="proposal-broker-name">Polymarket</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">R</span><span class="proposal-broker-name">Robinhood</span></div>
        </div>
      </div>

      <!-- Crypto -->
      <div class="proposal-section">
        <p class="proposal-group-title">Crypto</p>
        <div class="proposal-broker-grid">
          <div class="proposal-broker"><span class="proposal-broker-logo">B</span><span class="proposal-broker-name">Binance</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">H</span><span class="proposal-broker-name">Hyperliquid</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">O</span><span class="proposal-broker-name">OKX</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">B</span><span class="proposal-broker-name">Bybit</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">C</span><span class="proposal-broker-name">Coinbase</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">B</span><span class="proposal-broker-name">Bitget</span></div>
          <div class="proposal-broker"><span class="proposal-broker-logo">G</span><span class="proposal-broker-name">Gate</span></div>
        </div>
      </div>
    </div>

    <p class="proposal-note">
      New entry above the broker list. Picking <strong>“alerts only”</strong> subscribes via Alva Agent — no exchange needed. Picking a broker keeps the existing flow unchanged.
    </p>
  </section>
</div>

</body>
</html>
`,r=e(s);function t(){return n.jsx("div",{className:"h-screen flex flex-col",style:{background:"var(--b0-page)"},children:n.jsx("div",{className:"flex-1 overflow-hidden",children:n.jsx("iframe",{srcDoc:r,title:"Trade Notification Test",className:"block h-full w-full border-0"})})})}function d({onNavigate:a}){return n.jsx(o,{activePage:"trade-notification-test",onNavigate:a,children:n.jsx(t,{})})}export{d as default};
