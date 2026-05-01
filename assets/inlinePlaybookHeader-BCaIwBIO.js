const a=`/* ══════════════════════════════════════════════════════════════
   Playbook Header Component
   Shared styles for <playbook-header> custom element.
   Depends on design-tokens.css for --sp-*, --r-*, --text-*, --main-*, --line-*.
   ══════════════════════════════════════════════════════════════ */

/* display:contents lets .pb-top-bar's containing block be the body, so
   position:sticky tracks the full page scroll instead of being clipped to
   <playbook-header>'s short box. */
playbook-header { display: contents; }

/* sticky title-bar wrapper — full body width, holds the centered .pb-top */
.pb-top-bar {
    position: sticky; top: 0; z-index: 20;
    background: var(--b0-page);
}

.playbook-info {
    width: 100%; max-width: 2048px; margin: 0 auto;
    padding: 0 var(--sp-xxl) 0;
    display: flex; flex-direction: column; gap: var(--sp-xs);
}

/* title row — centered inside the full-width sticky bar.
   Bottom padding (xs) provides the gap to .pb-meta and stays inside the
   sticky zone, so when stuck that gap stays pinned along with the title. */
.pb-top {
    width: 100%; max-width: 2048px; margin: 0 auto;
    padding: var(--sp-xl) var(--sp-xxl) var(--sp-xs);
    display: flex; align-items: center; gap: var(--sp-xs);
}
.pb-top-left {
    display: flex; flex: 1 1 0; min-width: 0;
    align-items: center; gap: var(--sp-xs);
}
.pb-title {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 20px; font-weight: 400;
    line-height: 30px; letter-spacing: 0.2px;
    color: var(--text-n9);
    margin: 0; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
}
/* status dot — filled teal circle inside a muted halo */
.pb-freq-dot {
    width: 14px; height: 14px; position: relative;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
}
.pb-freq-dot::before {
    content: ''; position: absolute; inset: 0;
    background: #DBEDED; border-radius: 50%;
}
.pb-freq-dot::after {
    content: ''; position: absolute; inset: 28.6%;
    background: var(--main-m1); border-radius: 50%;
}

/* actions */
.pb-actions { display: flex; align-items: center; flex-shrink: 0; gap: 0; }
.pb-action {
    display: inline-flex; align-items: center; gap: 4px;
    height: 32px; padding: 6px 8px;
    border: none; background: transparent; border-radius: 6px;
    cursor: pointer; font-family: inherit;
    color: var(--text-n9);
    transition: background .15s;
}
.pb-action--icon-only { width: 32px; padding: 6px; justify-content: center; }
.pb-action:hover { background: rgba(0,0,0,0.04); }
.pb-action.is-starred:hover { background: rgba(0,0,0,0.04); }
.pb-action.is-active,
.pb-action.is-open { background-color: var(--main-m1-10, rgba(73,163,166,0.1)); color: var(--main-m1); }
.pb-action.is-active .pb-action-icon,
.pb-action.is-open .pb-action-icon { background-color: var(--main-m1); }
.pb-action.is-active .pb-action-count,
.pb-action.is-open .pb-action-count { color: var(--main-m1); }
.pb-action-icon {
    width: 16px; height: 16px; display: inline-block;
    background-color: var(--text-n9);
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.pb-action-icon.ic-share { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/share-l.svg');  mask-image: url('https://alva-ai-static.b-cdn.net/icons/share-l.svg'); }
.pb-action-icon.ic-star  { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-l.svg');   mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-l.svg'); }
.pb-action.is-starred { background-color: transparent; color: var(--main-m1); }
.pb-action.is-starred .pb-action-icon.ic-star {
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-f.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-f.svg');
}
.pb-action.is-starred .pb-action-count { color: var(--main-m1); }
.pb-action-icon.ic-remix    { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');     mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg'); }
.pb-action-icon.ic-chat     { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg');     mask-image: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg'); }
.pb-action-icon.ic-settings { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/settings-l.svg');  mask-image: url('https://alva-ai-static.b-cdn.net/icons/settings-l.svg'); }
.pb-action-icon.ic-history  { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/history-l.svg');   mask-image: url('https://alva-ai-static.b-cdn.net/icons/history-l.svg'); }

/* creator variant — bare 16x16 icons immediately after .pb-title.
   All three gaps (title↔icon1, icon1↔icon2) are equal to --sp-s. */
.pb-top-left:has(.pb-creator-actions) { gap: var(--sp-s); }
.pb-creator-actions {
    display: inline-flex; align-items: center;
    gap: var(--sp-s);
    flex-shrink: 0;
}
.pb-creator-icon-btn {
    width: 16px; height: 16px; flex-shrink: 0;
    padding: 0; border: none; background: transparent;
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    opacity: 0.9; transition: opacity .15s ease;
}
.pb-creator-icon-btn:hover { opacity: 1; }

/* settings popover (creator variant) — anchored under the settings icon */
.settings-menu { position: relative; display: inline-flex; }
.settings-popover {
    position: absolute;
    top: calc(100% + 6px); left: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: var(--sp-l, 20px);
    width: 400px;
    padding: var(--sp-l, 20px);
    background: var(--b0-container, #fff);
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
    border-radius: var(--radius-pop-popover, 8px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
}
.settings-popover.open { display: flex; }
.settings-popover-header {
    display: flex; align-items: center; gap: var(--sp-s, 12px);
    width: 100%; height: 26px;
}
.settings-popover-title {
    flex: 1 1 0; min-width: 0;
    margin: 0;
    font-size: 16px; font-weight: 500;
    line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
}
.settings-popover-close {
    width: 16px; height: 16px; flex-shrink: 0;
    padding: 0; border: none; background: transparent;
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    opacity: 0.9; transition: opacity .15s ease;
}
.settings-popover-close:hover { opacity: 1; }
.settings-popover-close-icon {
    width: 16px; height: 16px; display: inline-block;
    background-color: var(--text-n9);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}
.settings-field {
    display: flex; flex-direction: column;
    gap: var(--sp-xs, 8px);
    width: 100%;
}
.settings-field--textarea { gap: var(--sp-s, 12px); height: 146px; }
.settings-field-label {
    font-family: inherit;
    font-size: 14px; font-weight: 400;
    line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7, rgba(0,0,0,0.7));
}
.settings-field-input,
.settings-field-textarea {
    width: 100%;
    background: var(--b0-container, #fff);
    border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
    border-radius: var(--radius-btn-m, 8px);
    font-family: inherit;
    font-size: 14px; font-weight: 400;
    line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
    outline: none;
    transition: border-color .15s ease;
}
.settings-field-input {
    height: 40px;
    padding: 8px var(--sp-s, 12px);
}
.settings-field-textarea {
    flex: 1 1 0; min-height: 0;
    padding: var(--sp-s, 12px);
    resize: none;
}
.settings-field-input:focus,
.settings-field-textarea:focus { border-color: var(--line-l9, rgba(0,0,0,0.9)); }
.settings-more {
    display: flex; align-items: center; gap: 4px;
    padding: 0; width: 100%;
    background: transparent; border: none;
    cursor: pointer;
    font-family: inherit;
}
.settings-more-label {
    flex: 1 1 0; min-width: 0;
    text-align: left;
    font-size: 14px; font-weight: 400;
    line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7, rgba(0,0,0,0.7));
    transition: color .15s ease;
}
.settings-more:hover .settings-more-label { color: var(--text-n9); }
.settings-more-chev {
    width: 12px; height: 12px; flex-shrink: 0;
    background-color: var(--text-n7, rgba(0,0,0,0.7));
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    transition: background-color .15s ease;
}
.settings-more:hover .settings-more-chev { background-color: var(--text-n9); }

/* history popover (creator variant) — version timeline anchored under history icon */
.history-menu { position: relative; display: inline-flex; }
.history-popover {
    position: absolute;
    top: calc(100% + 6px); left: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: 0;
    width: 400px;
    max-height: min(560px, calc(100vh - 80px));
    padding: var(--sp-xxs, 4px);
    background: var(--b0-container, #fff);
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
    border-radius: var(--radius-pop-popover, 8px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    overflow-y: auto;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
}
.history-popover.open { display: flex; }
.history-row {
    display: flex; align-items: flex-start; gap: var(--sp-s, 12px);
    padding: var(--sp-s, 12px);
    border-radius: var(--radius-ct-m, 6px);
    cursor: pointer;
    transition: background .15s ease;
}
.history-row:hover { background: var(--b-r03); }
.history-row-body {
    flex: 1 1 0; min-width: 0;
    display: flex; flex-direction: column; gap: 4px;
}
.history-row-title {
    font-family: inherit;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
    word-break: break-word;
}
.history-row-version { font-weight: 500; }
.history-row-bullet {
    margin: 0 6px;
    color: var(--text-n3, rgba(0,0,0,0.3));
}
.history-row-meta {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
}
.history-row-meta-sep {
    color: var(--text-n3, rgba(0,0,0,0.3));
    user-select: none;
}
.history-row-meta-viewing {
    display: inline-flex; align-items: center; gap: 4px;
}
.history-row-eye {
    width: 14px; height: 14px;
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/eye-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/eye-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}
.history-row-check {
    width: 16px; height: 16px; flex-shrink: 0;
    margin-top: 3px; /* visually align with the title cap-height */
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}

.pb-action-count {
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap;
}
/* bordered Remix button: "Remix 56" */
.pb-remix-wrap { padding-left: var(--sp-xs, 8px); }
.pb-remix-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px;
    height: 32px; padding: 6px 10px;
    background: transparent;
    border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
    border-radius: 6px;
    font-family: inherit;
    cursor: pointer; white-space: nowrap;
    transition: background .15s, border-color .15s;
}
.pb-remix-btn:hover { background: var(--b-r03); }
.pb-remix-btn.is-open { background: var(--b-r03); border-color: var(--line-l9); }
.pb-remix-label {
    font-family: inherit;
    font-size: 12px; font-weight: 500;
    line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
}
.pb-remix-count {
    font-family: inherit;
    font-size: 12px; font-weight: 400;
    line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
}

/* meta row — bordered pills */
.pb-meta {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
    flex-wrap: wrap;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
}
/* Shared pill primitive */
.pb-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px;
    height: 24px;
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
    border-radius: 960px;
    background: transparent;
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap; flex-shrink: 0;
}
button.pb-pill,
a.pb-pill { cursor: pointer; transition: background .15s, border-color .15s; }
a.pb-pill { text-decoration: none; color: var(--text-n9); }
button.pb-pill:hover,
a.pb-pill:hover { background: var(--b-r03); }
button.pb-pill.is-open { background: var(--b-r03); border-color: var(--line-l9); }
/* Author pill: avatar (20px) + name. Left padding tighter to hug avatar. */
.pb-pill--author { padding-left: 2px; padding-right: 8px; height: auto; }
.pb-meta-avatar {
    width: 20px; height: 20px; border-radius: 50%;
    flex-shrink: 0; object-fit: cover;
    background: #f0f0f0;
}
/* README pill: icon + label, no chevron */
.pb-pill--readme { padding-left: 8px; padding-right: 8px; }
.pb-pill--readme .pb-meta-icon {
    width: 14px; height: 14px; display: inline-block;
    background-color: var(--text-n9);
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.pb-pill--readme .pb-meta-icon.ic-readme {
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/researcher-l1.svg');
}
button.pb-pill--readme:hover .pb-meta-icon { background-color: var(--text-n9); }
/* Built-on pill: "Built on:" + avatar (14px) + creator handle */
.pb-pill--built-on { gap: 4px; }
.pb-built-on-label { color: var(--text-n5, rgba(0,0,0,0.5)); }
.pb-built-on-avatar {
    width: 14px; height: 14px; border-radius: 50%;
    flex-shrink: 0; object-fit: cover;
    background: #f0f0f0;
}
.pb-built-on-name {
    max-width: 120px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    color: var(--text-n9);
}
/* Status pill: dot + automations + • + freq */
.pb-pill--status { padding-left: 5px; padding-right: 8px; }
.pb-pill--status .pb-pill-sep {
    color: var(--text-n3, rgba(0,0,0,0.3));
    user-select: none;
}
.pb-pill--status { position: relative; }
.pb-pill--status.has-tooltip { cursor: pointer; }
/* status pill tooltip (shows last-updated) */
.pb-pill-tip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%; transform: translateX(-50%) translateY(-4px);
    opacity: 0; pointer-events: none;
    transition: opacity .15s ease, transform .15s ease;
    z-index: 100;
    white-space: nowrap;
}
.pb-pill--status:hover .pb-pill-tip,
.pb-pill--status:focus-visible .pb-pill-tip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    transition-delay: .12s;
}
/* When feeds popover is open, suppress tooltip so they don't overlap */
.pb-pill--status.is-open .pb-pill-tip,
.pb-pill--status.is-open:hover .pb-pill-tip,
.pb-pill--status.is-open:focus-visible .pb-pill-tip {
    opacity: 0 !important;
    pointer-events: none;
    transition-delay: 0s;
}
.pb-pill-tip .tooltip {
    position: relative;
    background-color: var(--b0-container, #fff);
    border-radius: var(--radius-ct-m, 6px);
    box-shadow: var(--shadow-s, 0 4px 12px rgba(0,0,0,0.08));
    padding: var(--spacing-m, 16px);
    width: fit-content; max-width: 400px;
    display: flex; flex-direction: column; gap: var(--spacing-xxxs, 2px);
}
.pb-pill-tip .tooltip-border {
    position: absolute;
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
    border-radius: var(--radius-ct-m, 6px);
    inset: 0;
    pointer-events: none;
}
.pb-pill-tip .tooltip-text {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
    font-weight: 400;
}

/* feeds popover */
.feeds-menu { position: relative; display: inline-flex; }
.feeds-popover {
    position: absolute;
    top: calc(100% + 6px); left: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    width: 520px;
    background: #fff;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    overflow: hidden;
}
.feeds-popover.open { display: flex; }
.feeds-popover-header,
.feeds-popover-row {
    position: relative;
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    white-space: nowrap;
}
.feeds-popover-header::after,
.feeds-popover-row::after {
    content: '';
    position: absolute;
    left: 20px; right: 20px; bottom: 0;
    height: 1px;
    background: rgba(0,0,0,0.07);
    pointer-events: none;
}
.feeds-popover-header {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
}
.feeds-popover-meta {
    position: relative;
    padding: 10px 20px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
    white-space: nowrap;
}
.feeds-popover-meta::after {
    content: '';
    position: absolute;
    left: 20px; right: 20px; bottom: 0;
    height: 1px;
    background: rgba(0,0,0,0.07);
    pointer-events: none;
}
.feeds-popover-row {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
}
.feeds-popover-row:last-child { border-bottom: none; }
.feeds-popover-row.clickable { cursor: pointer; transition: background 0.15s; }
.feeds-popover-row.clickable:hover { background: var(--b-r03); }
.feeds-popover-row-chev {
    width: 12px; height: 12px; flex-shrink: 0;
    background-color: var(--text-n5);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}
.feeds-popover-row-chev.is-placeholder { visibility: hidden; }
.feeds-popover-cell-name { flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.feeds-popover-cell-interval { width: 100px; flex-shrink: 0; }
.feeds-popover-cell-last { width: 120px; flex-shrink: 0; }
.feeds-popover-viewall {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    transition: background .15s;
    white-space: nowrap;
}
.feeds-popover-viewall:hover { background: rgba(0,0,0,0.02); }
.feeds-popover-viewall-label { flex: 1; min-width: 0; }
.feeds-popover-viewall-chev {
    width: 12px; height: 12px; flex-shrink: 0;
    background-color: rgba(0,0,0,0.5);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}

/* share popover */
.share-menu { position: relative; display: inline-flex; }
.share-popover {
    position: absolute;
    top: calc(100% + 6px); right: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: var(--sp-l, 20px);
    width: 400px;
    padding: var(--sp-l, 20px);
    background: #fff;
    border: 0.5px solid var(--line-l2);
    border-radius: var(--radius-pop-popover);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
}
.share-popover.open { display: flex; }
.share-popover-title {
    margin: 0;
    font-size: 16px; font-weight: 500;
    line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
}
.share-popover-group {
    display: flex; flex-direction: column;
    gap: var(--sp-m, 16px);
    padding: var(--sp-m, 16px);
    background: var(--b-r03);
    border-radius: var(--radius-ct-l, 8px);
    position: relative;
}
.share-popover-row {
    position: relative;
    display: flex; align-items: center; gap: var(--sp-s, 12px);
    width: 100%;
    background: transparent; border: none;
    padding: 0; margin: 0;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    color: inherit;
}
.share-popover-row.is-disabled,
.share-popover-row[disabled] {
    cursor: not-allowed;
}
.share-popover-row + .share-popover-row::before {
    content: '';
    position: absolute;
    left: 0; right: 0; top: calc(var(--sp-m, 16px) * -0.5 - 0.5px);
    height: 1px;
    background: var(--line-l07);
    pointer-events: none;
}
.share-popover-icon-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px;
    flex-shrink: 0;
    background: var(--b-r05);
    border-radius: 100px;
    transition: background .15s;
}
.share-popover-icon-badge.is-filled { background: #000; }
.share-popover-icon {
    width: 20px; height: 20px; display: inline-block;
    background-color: var(--text-n9);
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
    transition: background-color .15s;
}
.share-popover-icon-badge.is-filled .share-popover-icon { background-color: #fff; }
.share-popover-icon.ic-hide      { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/hide-l.svg');      mask-image: url('https://alva-ai-static.b-cdn.net/icons/hide-l.svg'); }
.share-popover-icon.ic-global    { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/global-l.svg');    mask-image: url('https://alva-ai-static.b-cdn.net/icons/global-l.svg'); }
.share-popover-icon.ic-lightning { -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/credit-l.svg'); mask-image: url('https://alva-ai-static.b-cdn.net/icons/credit-l.svg'); }
.share-popover-row-text {
    flex: 1 1 0; min-width: 0;
    display: flex; flex-direction: column; gap: 0;
    font-family: inherit;
}
.share-popover-row-title {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
}
.share-popover-row-desc {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
}
.share-popover-row-note {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--main-m1);
}
.share-popover-pro {
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    height: 18px;
    padding: 0 var(--sp-xs, 8px);
    background: var(--main-m1);
    border: 0.5px solid rgba(255,255,255,0.3);
    border-radius: 96px;
    font-family: inherit;
    font-size: 11px; line-height: 18px; letter-spacing: 0.11px;
    color: #fff;
}
.share-popover-check {
    width: 16px; height: 16px; flex-shrink: 0;
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}
.share-popover-copy {
    display: flex; align-items: center; justify-content: center;
    gap: var(--sp-xs, 8px);
    width: 100%;
    height: 40px;
    padding: 9px var(--sp-l, 20px);
    background: #fff;
    border: 0.5px solid var(--line-l3);
    border-radius: var(--radius-btn-m, 8px);
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
    cursor: pointer;
    transition: background .15s, border-color .15s;
}
.share-popover-copy:hover { background: var(--b-r03); border-color: rgba(0,0,0,0.5); }
.share-popover-copy-icon {
    width: 18px; height: 18px; display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/link-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/link-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.share-popover-copy-icon.copied {
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
}

/* star popover (Connect Agents to Get Notified) */
.star-menu { position: relative; display: inline-flex; }
.star-popover {
    position: absolute;
    top: calc(100% + 6px); right: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: var(--sp-m, 16px);
    width: 428px;
    padding: var(--sp-l, 20px);
    background: #fff;
    border: 0.5px solid var(--line-l2);
    border-radius: var(--radius-pop-popover);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
}
.star-popover.open { display: flex; }
.star-popover-card {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-s, 12px);
    padding: var(--sp-xl, 24px) var(--sp-l, 20px);
    background: var(--b-r02);
    border-radius: var(--radius-ct-l, 8px);
    width: 100%;
}
.star-popover-logo {
    width: 48px; height: 48px;
    background: var(--b0-sidebar, #2A2A38);
    border-radius: 960px;
    display: inline-flex; align-items: center; justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
}
.star-popover-logo img { width: 48px; height: 48px; display: block; }
.star-popover-title {
    margin: 0;
    font-size: 16px; line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
    text-align: center;
    width: 100%;
}
.star-popover-cta {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--sp-xs, 8px);
    height: 40px;
    padding: 9px var(--sp-m, 16px);
    background: #24a1de;
    color: #fff;
    border: none;
    border-radius: var(--radius-btn-m, 8px);
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    cursor: pointer; white-space: nowrap;
    text-decoration: none;
    transition: opacity .15s;
}
.star-popover-cta:hover { opacity: 0.9; }
.star-popover-cta-icon { width: 18px; height: 18px; flex-shrink: 0; display: block; filter: brightness(0) invert(1); }
.star-popover-socials {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
    padding-top: var(--sp-s, 12px);
}
.star-popover-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px 4px 6px;
    background: var(--b-r05);
    border-radius: 960px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap;
}
.star-popover-chip.is-disabled { opacity: 0.5; color: var(--text-n5); }
.star-popover-chip img { width: 18px; height: 18px; display: block; flex-shrink: 0; }
.star-popover-footer {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--sp-xs, 8px);
    height: 40px; width: 100%;
    padding: 9px var(--sp-l, 20px);
    background: transparent;
    border: 0.5px solid var(--line-l3);
    border-radius: var(--radius-btn-m, 8px);
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
    cursor: pointer;
    transition: background .15s;
}
.star-popover-footer:hover { background: var(--b-r03); }
.star-popover-footer-icon {
    width: 18px; height: 18px; flex-shrink: 0;
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-f.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/star-f.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}

/* Get Alerts button (primary CTA — variant only) */
.alerts-menu { position: relative; display: inline-flex; padding-left: var(--sp-xs, 8px); }
.pb-alerts-btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 6px;
    height: 32px; padding: 6px 10px;
    background: var(--main-m1);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-family: inherit;
    cursor: pointer; white-space: nowrap;
    transition: opacity .15s;
}
.pb-alerts-btn:hover { opacity: 0.9; }
.pb-alerts-btn.is-open { opacity: 0.9; }
/* Connected ("Alert On") variant — btn-second style */
.pb-alerts-btn.is-on {
    background: transparent;
    border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
    transition: background .15s, border-color .15s;
}
.pb-alerts-btn.is-on:hover { opacity: 1; background: var(--b-r03, rgba(0,0,0,0.03)); }
.pb-alerts-btn.is-on.is-open { opacity: 1; background: var(--b-r03, rgba(0,0,0,0.03)); border-color: var(--line-l9); }
.pb-alerts-btn.is-on .pb-alerts-label { color: var(--text-n9); }
.pb-alerts-label {
    font-family: inherit;
    font-size: 12px; font-weight: 500;
    line-height: 20px; letter-spacing: 0.12px;
    color: #fff;
}

/* Alerts popover (opens from Star or Get Alerts) */
.alerts-popover {
    position: absolute;
    top: calc(100% + 6px); right: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: var(--sp-m, 16px);
    width: 480px;
    max-height: min(720px, calc(100vh - 80px));
    padding: var(--sp-l, 20px);
    background: #fff;
    overflow-y: auto;
    overscroll-behavior: contain;
    border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
    border-radius: var(--radius-pop-popover, 8px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4px) scale(0.98);
    transform-origin: top right;
    pointer-events: none;
    transition: opacity 160ms ease-out,
                transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                visibility 0s linear 200ms;
}
.alerts-popover.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    transition: opacity 160ms ease-out,
                transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                visibility 0s;
}
.alerts-popover-title {
    margin: 0;
    font-size: 16px; font-weight: 500;
    line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
}
.alerts-popover-card {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--sp-s, 12px);
    padding: var(--sp-xl, 24px) var(--sp-l, 20px);
    background: var(--b-r02, rgba(0,0,0,0.02));
    border-radius: var(--radius-ct-l, 8px);
    width: 100%;
}
.alerts-popover-logo {
    width: 48px; height: 48px;
    background: var(--b0-sidebar, #2A2A38);
    border-radius: 960px;
    display: inline-flex; align-items: center; justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
}
.alerts-popover-logo img { width: 48px; height: 48px; display: block; }
.alerts-popover-subtitle {
    margin: 0;
    font-size: 16px; line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
    text-align: center;
    width: 100%;
}
.alerts-popover-ctas {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--sp-s, 12px);
    width: 100%;
}
.alerts-popover-cta {
    display: inline-flex; align-items: center; justify-content: center;
    gap: var(--sp-xs, 8px);
    height: 40px; width: 280px;
    padding: 9px var(--sp-m, 16px);
    border-radius: var(--radius-ct-m, 6px);
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    cursor: pointer; white-space: nowrap;
    text-decoration: none;
    transition: opacity .15s, background .15s, border-color .15s;
}
.alerts-popover-cta--primary {
    background: #24a1de;
    color: #fff;
    border: none;
}
.alerts-popover-cta--primary:hover { opacity: 0.9; }
.alerts-popover-cta--secondary {
    background: transparent;
    color: var(--text-n9);
    border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
}
.alerts-popover-cta--secondary:hover { background: var(--b-r03, rgba(0,0,0,0.03)); }
.alerts-popover-cta-icon { width: 18px; height: 18px; flex-shrink: 0; display: block; }
.alerts-popover-extra {
    display: flex; flex-direction: column; align-items: center;
    gap: var(--sp-xs, 8px);
    padding-top: var(--sp-s, 12px);
    width: 100%;
}
.alerts-popover-extra-label {
    margin: 0;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
    text-align: center;
    width: 100%;
}
.alerts-popover-chips {
    display: flex; align-items: center; justify-content: center;
    gap: var(--sp-xs, 8px);
}
.alerts-popover-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px 4px 6px;
    background: var(--b-r05, rgba(0,0,0,0.05));
    border-radius: 960px;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n9);
    white-space: nowrap;
}
.alerts-popover-chip.is-disabled { opacity: 0.5; color: var(--text-n5); }
.alerts-popover-chip img { width: 18px; height: 18px; display: block; flex-shrink: 0; border-radius: 960px; }

/* CTA loading spinner + disabled state */
.alerts-popover-cta { position: relative; overflow: hidden; }
.alerts-popover-cta-inner {
    display: inline-flex; align-items: center; gap: var(--sp-xs, 8px);
    transition: opacity .15s;
}
.alerts-popover-cta-spinner {
    position: absolute;
    top: 50%; left: 50%;
    margin: -9px 0 0 -9px;
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-top-color: transparent;
    opacity: 0;
    pointer-events: none;
    animation: alerts-spinner 0.8s linear infinite;
}
.alerts-popover-cta--primary .alerts-popover-cta-spinner { color: #fff; }
.alerts-popover-cta--secondary .alerts-popover-cta-spinner { color: var(--text-n9); }
.alerts-popover-cta.is-loading .alerts-popover-cta-inner { opacity: 0; }
.alerts-popover-cta.is-loading .alerts-popover-cta-spinner { opacity: 1; }
.alerts-popover-cta.is-loading { cursor: progress; }
.alerts-popover-cta.is-disabled {
    opacity: 0.5; pointer-events: none;
}
@keyframes alerts-spinner { to { transform: rotate(360deg); } }

/* Two-state popover: toggle between initial and connected */
.alerts-popover-initial,
.alerts-popover-connected {
    display: flex; flex-direction: column; gap: var(--sp-m, 16px);
    width: 100%;
}
.alerts-popover-connected { display: none; }
.alerts-popover.is-connected .alerts-popover-initial { display: none; }
.alerts-popover.is-connected .alerts-popover-connected { display: flex; }

/* Connected state: header + account */
.alerts-connected-section {
    display: flex; flex-direction: column; gap: var(--sp-s, 12px);
    width: 100%;
}
.alerts-connected-head {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%;
}
.alerts-connected-head-label {
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7, rgba(0,0,0,0.7));
}
.alerts-connected-manage {
    display: inline-flex; align-items: center; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5, rgba(0,0,0,0.5));
    transition: color .15s;
}
.alerts-connected-manage:hover { color: var(--text-n9); }
.alerts-connected-manage-chev {
    width: 12px; height: 12px; display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
}
.alerts-connected-account {
    display: flex; align-items: center; gap: var(--sp-xs, 8px);
    padding: var(--sp-m, 16px);
    background: rgba(73, 163, 166, 0.08);
    border-radius: var(--radius-ct-l, 8px);
    width: 100%;
}
.alerts-connected-avatar {
    width: 32px; height: 32px;
    display: inline-block;
    flex-shrink: 0;
    object-fit: contain;
    border-radius: 50%;
}
.alerts-connected-name {
    flex: 1 1 auto;
    font-size: 16px; font-weight: 400; line-height: 26px; letter-spacing: 0.16px;
    color: var(--text-n9);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.alerts-connected-toggle {
    display: inline-flex; align-items: center; gap: var(--sp-xs, 8px);
    flex-shrink: 0;
}
.alerts-connected-toggle-label {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
}
/* Alva Design System — Switch (medium) */
.switch {
    position: relative;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;
    transition: background-color 0.2s ease;
    background-color: var(--b-r1, rgba(0,0,0,0.1));
    width: 32px;
    height: 16px;
    border-radius: 1000px;
    border: none;
    padding: 0;
}
.switch.on { background-color: var(--main-m1, #49A3A6); }
.switch-thumb {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 50%;
    transition: left 0.2s ease;
    width: 10.67px;
    height: 10.67px;
    left: 2.67px;
}
.switch.on .switch-thumb { left: calc(100% - 10.67px - 2.67px); }

/* Connected state: signals list */
.alerts-signals-section {
    display: flex; flex-direction: column; gap: var(--sp-s, 12px);
    width: 100%;
}
.alerts-signals-title {
    margin: 0;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n7, rgba(0,0,0,0.7));
}
.alerts-signals-list {
    display: flex; flex-direction: column; gap: var(--sp-s, 12px);
}
.alerts-signal-card {
    display: flex; flex-direction: column; gap: var(--sp-xs, 8px);
    padding: var(--sp-m, 16px);
    background: var(--grey-g01, #fafafa);
    border-radius: var(--radius-ct-m, 6px);
}
/* Signal card title — markdown heading style */
.alerts-signal-date {
    margin: 0;
    font-size: 14px; font-weight: 500; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
}
/* Bullet list follows Alva Markdown Medium spec */
.alerts-signal-bullets {
    margin: 0; padding: 0;
    display: flex; flex-direction: column; gap: 4px;
    list-style: none;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: var(--text-n9);
}
.alerts-signal-bullets li {
    position: relative;
    margin: 0;
    padding-left: 20px;
}
.alerts-signal-bullets li::before {
    content: '';
    position: absolute;
    left: 7.5px; top: 8.5px;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--text-n9);
}
.alerts-signal-bullets li strong { font-weight: 500; color: inherit; }

/* remix popover */
.remix-menu { position: relative; display: inline-flex; }
.remix-popover {
    position: absolute;
    top: calc(100% + 6px); right: 0;
    z-index: 50;
    display: none;
    flex-direction: column;
    gap: 16px;
    width: 480px;
    padding: 20px;
    background: #fff;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: var(--radius-pop-popover);
    box-shadow: 0 6px 20px rgba(0,0,0,0.04);
}
.remix-popover.open { display: flex; }
.remix-popover-title {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px; font-weight: 500;
    line-height: 26px; letter-spacing: 0.16px;
    color: rgba(0,0,0,0.9);
    margin: 0;
}
.remix-popover-desc {
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
    margin: 0;
}
.remix-popover-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 40px; padding: 9px 20px;
    background: var(--main-m1); color: #fff;
    border: none; border-radius: 8px;
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    text-decoration: none;
    cursor: pointer;
    transition: opacity .15s;
}
.remix-popover-cta:hover { opacity: 0.9; }
.remix-popover-cta-icon {
    width: 18px; height: 18px; display: inline-block;
    background-color: #fff;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/remix-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.remix-popover-agent { display: flex; flex-direction: column; }
.remix-popover-divider { display: flex; align-items: center; gap: 8px; }
.remix-popover-divider-line { flex: 1; height: 1px; background: rgba(0,0,0,0.05); }
.remix-popover-agent-toggle {
    display: flex; align-items: center; gap: 4px;
    background: transparent; border: none; padding: 0;
    cursor: pointer; font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: rgba(0,0,0,0.5);
    white-space: nowrap;
    transition: opacity .15s;
}
.remix-popover-agent-toggle:hover { opacity: 0.8; }
.remix-popover-agent-arrow {
    width: 12px; height: 12px; display: inline-block;
    background-color: rgba(0,0,0,0.5);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/arrow-right-l2.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    transform: rotate(0deg);
    transition: transform 0.3s ease-out;
    flex-shrink: 0;
}
.remix-popover.agent-open .remix-popover-agent-arrow { transform: rotate(90deg); }
.remix-popover-agent-body {
    display: none;
    flex-direction: column; gap: 16px;
    margin-top: 16px;
    padding: 16px 20px;
    background: rgba(0,0,0,0.03);
    border-radius: 6px;
}
.remix-popover.agent-open .remix-popover-agent-body { display: flex; }
.remix-popover-prompt {
    margin: 0;
    max-height: 240px;
    overflow-y: auto;
    white-space: pre-wrap; word-break: break-word;
    font-family: inherit;
    font-size: 14px; line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.7);
}
.remix-popover-copy {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    height: 40px; padding: 9px 20px;
    background: transparent;
    border: 0.5px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px; font-weight: 500;
    line-height: 22px; letter-spacing: 0.14px;
    color: rgba(0,0,0,0.9);
    cursor: pointer;
    transition: border-color .15s;
}
.remix-popover-copy:hover { border-color: rgba(0,0,0,0.9); }
.remix-popover-copy-icon {
    width: 18px; height: 18px; display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/copy-l.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/copy-l.svg');
    -webkit-mask-position: center; mask-position: center;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-size: contain; mask-size: contain;
    flex-shrink: 0;
}
.remix-popover-copy-icon.copied {
    background-color: var(--main-m1);
    -webkit-mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
            mask-image: url('https://alva-ai-static.b-cdn.net/icons/check-l1.svg');
}

/* description */
.pb-desc {
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n5);
    max-width: 840px; margin: 0;
    display: flex; align-items: flex-start; gap: 6px;
}
.pb-desc-text { flex: 1 1 auto; min-width: 0; }
.pb-desc.collapsed .pb-desc-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pb-desc-toggle {
    flex-shrink: 0;
    background: transparent; border: none; padding: 0;
    font-family: inherit;
    font-size: 12px; line-height: 20px; letter-spacing: 0.12px;
    color: var(--text-n7);
    cursor: pointer;
    display: none;
    transition: color .15s ease;
}
.pb-desc-toggle:hover { color: var(--text-n9); }
.pb-desc.has-overflow .pb-desc-toggle { display: inline-block; }
`,r=`/* ══════════════════════════════════════════════════════════════
   <playbook-header> — Playbook info header custom element
   Renders title row + meta row + description, with feeds popover
   and description expand/collapse behavior.

   Usage:
     <link rel="stylesheet" href="./components/playbook-header.css">
     <script src="./components/playbook-header.js"><\/script>

     <playbook-header
       title="Quality Value Stock Screener 2"
       freq="15m"
       last-updated="15 minutes ago"
       owner="YGGYLL"
       owner-seed="YGGYLL"
       star="12" remix="56" comments="6"
       description="...">
       <script type="application/json" class="pb-feeds-data">
         [
           {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"20 Minutes","lastRun":"15 minutes ago","clickable":true},
           {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"}
         ]
       <\/script>
     </playbook-header>

   Events:
     playbook-feed-click   detail: { id }   — fired when a clickable feed row is activated
     playbook-feeds-viewall                 — fired when "View all feeds in Settings" is clicked
   ══════════════════════════════════════════════════════════════ */

(function () {
  if (customElements.get('playbook-header')) return;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function avatarUrl(seed) {
    if (seed === 'YGGYLL') return '/alva-infant/portrait.png';
    var s = encodeURIComponent(seed || 'user');
    return 'https://api.dicebear.com/9.x/notionists/svg?seed=' + s + '&backgroundColor=fff3e0';
  }

  function readFeeds(host) {
    var node = host.querySelector('script.pb-feeds-data[type="application/json"]');
    if (!node) return [];
    try {
      var data = JSON.parse(node.textContent || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn('[playbook-header] invalid feeds JSON', e);
      return [];
    }
  }

  function renderFeeds(feeds, lastUpdated) {
    if (!feeds.length) return '';
    var metaRow = lastUpdated
      ? '<div class="feeds-popover-meta">Last Updated: ' + esc(lastUpdated) + '</div>'
      : '';
    var rows = feeds.map(function (f) {
      var cls = 'feeds-popover-row clickable';
      var extra = ' data-feed="' + esc(f.id || '') + '" role="button" tabindex="0"';
      var chev = '<span class="feeds-popover-row-chev" aria-hidden="true"></span>';
      return (
        '<div class="' + cls + '"' + extra + '>' +
          '<div class="feeds-popover-cell-name">' +
            '<span class="pb-freq-dot" aria-hidden="true"></span>' +
            '<span>' + esc(f.name) + '</span>' +
          '</div>' +
          '<div class="feeds-popover-cell-interval">' + esc(f.interval) + '</div>' +
          '<div class="feeds-popover-cell-last">' + esc(f.lastRun) + '</div>' +
          chev +
        '</div>'
      );
    }).join('');
    return (
      metaRow +
      '<div class="feeds-popover-header">' +
        '<div class="feeds-popover-cell-name">Automation</div>' +
        '<div class="feeds-popover-cell-interval">Interval</div>' +
        '<div class="feeds-popover-cell-last">Last Run</div>' +
        '<span class="feeds-popover-row-chev is-placeholder" aria-hidden="true"></span>' +
      '</div>' +
      rows +
      '<div class="feeds-popover-viewall" role="button" tabindex="0">' +
        '<span class="feeds-popover-viewall-label">View all automations in Settings</span>' +
        '<span class="feeds-popover-viewall-chev" aria-hidden="true"></span>' +
      '</div>'
    );
  }

  function slugify(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function buildRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix ' + ref + ' — customize it based on my preferences and deploy as a new playbook under my account.';
  }

  function buildHistoryEntries() {
    return [
      { version: 'v1.2.0', desc: 'Main tabs upgraded to tab-l (16px, gap 24px, padding-bottom 6px)', date: '04/27/2026 16:20', active: true },
      { version: 'v1.1.0', desc: 'Tab bar CSS rewritten to match Alva template: border-bottom on wrapper-row, flex-end alignment, horizontal scroll, right-group padding, responsive breakpoint', date: '04/27/2026 16:16' },
      { version: 'v1.0.0', desc: 'Remix from @yy11/next-bottleneck — tab bar CSS/HTML fixed to Alva Design System spec (7 items)', date: '04/27/2026 16:08' },
      { version: 'draft', desc: 'Draft', date: '04/27/2026 16:08' }
    ];
  }

  function renderHistory(entries) {
    return entries.map(function (e) {
      var meta = '<span>' + esc(e.date) + '</span>';
      var check = e.active
        ? '<span class="history-row-check" aria-hidden="true"></span>'
        : '';
      return (
        '<div class="history-row" role="button" tabindex="0" data-history-version="' + esc(e.version) + '"' + (e.active ? ' aria-current="true"' : '') + '>' +
          '<div class="history-row-body">' +
            '<div class="history-row-title">' +
              '<span class="history-row-version">' + esc(e.version) + '</span>' +
              '<span class="history-row-bullet" aria-hidden="true">•</span>' +
              '<span>' + esc(e.desc) + '</span>' +
            '</div>' +
            '<div class="history-row-meta">' + meta + '</div>' +
          '</div>' +
          check +
        '</div>'
      );
    }).join('');
  }

  function buildExternalRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix Playbook(' + ref + '):\\n\\n' +
      'If you have the Alva skill → use it to build my own version.\\n' +
      'If not → install it first: npx skills add https://github.com/alva-ai/skills\\n\\n' +
      'Then:\\n' +
      '1. Customize it based on my preferences\\n' +
      '2. Deploy as a new playbook under my account\\n' +
      '3. If I don\\'t specify what to change, ask me what I\\'d like to customize.';
  }

  function render(host) {
    var title = host.getAttribute('title') || '';
    var freq = host.getAttribute('freq') || '';
    var lastUpdated = host.getAttribute('last-updated') || '';
    var owner = host.getAttribute('owner') || '';
    var ownerSeed = host.getAttribute('owner-seed') || owner;
    var star = host.getAttribute('star') || '';
    var remix = host.getAttribute('remix') || '';
    var alertsEnabled = host.hasAttribute('get-alerts')
      && host.getAttribute('get-alerts') !== 'false';
    var alertsLabel = host.getAttribute('alerts-label') || 'Get Alerts';
    var alertsStartConnected = host.hasAttribute('alerts-connected')
      && host.getAttribute('alerts-connected') !== 'false';
    var comments = host.getAttribute('comments') || '';
    var description = host.getAttribute('description') || '';
    var creator = host.hasAttribute('creator')
      && host.getAttribute('creator') !== 'false';
    var builtOn = host.getAttribute('built-on') || '';
    var builtOnSeed = host.getAttribute('built-on-seed') || builtOn;
    var feeds = readFeeds(host);

    var creatorBlock = creator
      ? '<div class="pb-creator-actions">' +
          '<div class="settings-menu">' +
            '<button class="pb-creator-icon-btn" type="button" aria-label="Settings" data-creator-settings aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-settings"></span></button>' +
            '<div class="settings-popover" data-settings-popover role="dialog" aria-label="Setting" aria-hidden="true">' +
              '<div class="settings-popover-header">' +
                '<h2 class="settings-popover-title">Setting</h2>' +
                '<button class="settings-popover-close" type="button" aria-label="Close" data-settings-close><span class="settings-popover-close-icon"></span></button>' +
              '</div>' +
              '<div class="settings-field">' +
                '<label class="settings-field-label">Title</label>' +
                '<input class="settings-field-input" type="text" value="' + esc(title) + '" />' +
              '</div>' +
              '<div class="settings-field settings-field--textarea">' +
                '<label class="settings-field-label">Description</label>' +
                '<textarea class="settings-field-textarea">' + esc(description) + '</textarea>' +
              '</div>' +
              '<button class="settings-more" type="button" data-settings-more>' +
                '<span class="settings-more-label">More Settings</span>' +
                '<span class="settings-more-chev" aria-hidden="true"></span>' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="history-menu">' +
            '<button class="pb-creator-icon-btn" type="button" aria-label="History" data-creator-history aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-history"></span></button>' +
            '<div class="history-popover" data-history-popover role="dialog" aria-label="Version history" aria-hidden="true">' +
              renderHistory(buildHistoryEntries()) +
            '</div>' +
          '</div>' +
        '</div>'
      : '';

    var authorBlock = owner
      ? '<a class="pb-pill pb-pill--author" href="#user-profile" target="_top">' +
          '<img class="pb-meta-avatar" src="' + avatarUrl(ownerSeed) + '" alt="' + esc(owner) + '" />' +
          '<span>' + esc(owner) + '</span>' +
        '</a>'
      : '';

    var readmeModal = host.getAttribute('readme-modal') || '';
    var readmeBlock = readmeModal
      ? '<button class="pb-pill pb-pill--readme" type="button" data-readme-trigger>' +
          '<span class="pb-meta-icon ic-readme" aria-hidden="true"></span>' +
          '<span>README</span>' +
        '</button>'
      : '';

    var builtOnBlock = builtOn
      ? '<button class="pb-pill pb-pill--built-on" type="button" data-built-on-trigger>' +
          '<span class="pb-built-on-label">Built on:</span>' +
          '<img class="pb-built-on-avatar" src="' + avatarUrl(builtOnSeed) + '" alt="" />' +
          '<span class="pb-built-on-name">' + esc(builtOn) + '</span>' +
        '</button>'
      : '';

    var feedsCount = feeds.length;
    var statusParts = [];
    if (feedsCount) statusParts.push('<span>' + feedsCount + ' Automation' + (feedsCount > 1 ? 's' : '') + '</span>');
    if (freq) statusParts.push('<span>' + esc(freq) + ' ago</span>');
    var statusInner = '';
    for (var i = 0; i < statusParts.length; i++) {
      if (i > 0) statusInner += '<span class="pb-pill-sep" aria-hidden="true">•</span>';
      statusInner += statusParts[i];
    }
    var statusTooltip = '';
    var statusTag = feedsCount ? 'button' : 'span';
    var statusAttrs = feedsCount
      ? ' type="button" data-feeds-trigger aria-haspopup="menu" aria-expanded="false"'
      : '';
    var statusClasses = 'pb-pill pb-pill--status';
    var statusBlock = statusParts.length
      ? (feedsCount
          ? '<div class="feeds-menu">' +
              '<' + statusTag + ' class="' + statusClasses + '"' + statusAttrs + (lastUpdated && !feedsCount ? ' tabindex="0"' : '') + '>' +
                '<span class="pb-freq-dot" aria-hidden="true"></span>' +
                statusInner +
                statusTooltip +
              '</' + statusTag + '>' +
              '<div class="feeds-popover" data-feeds-popover role="menu" aria-hidden="true">' +
                renderFeeds(feeds, lastUpdated) +
              '</div>' +
            '</div>'
          : '<' + statusTag + ' class="' + statusClasses + '"' + (lastUpdated ? ' tabindex="0"' : '') + '>' +
              '<span class="pb-freq-dot" aria-hidden="true"></span>' +
              statusInner +
              statusTooltip +
            '</' + statusTag + '>')
      : '';

    var descBlock = description
      ? '<div class="pb-desc collapsed">' +
          '<span class="pb-desc-text">' + esc(description) + '</span>' +
          '<button class="pb-desc-toggle" type="button" aria-expanded="false">Show more</button>' +
        '</div>'
      : '';

    host.innerHTML =
      '<div class="pb-top-bar">' +
        '<div class="pb-top">' +
          '<div class="pb-top-left">' +
            '<h1 class="pb-title">' + esc(title) + '</h1>' +
            creatorBlock +
          '</div>' +
          '<div class="pb-actions">' +
            '<div class="share-menu">' +
              '<button class="pb-action pb-action--icon-only" type="button" aria-label="Share" data-share-trigger aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-share"></span></button>' +
              '<div class="share-popover" data-share-popover role="dialog" aria-label="Share" aria-hidden="true">' +
                '<h2 class="share-popover-title">Share</h2>' +
                '<div class="share-popover-group" role="radiogroup" aria-label="Share visibility">' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="private">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-hide"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Private</span>' +
                      '<span class="share-popover-row-desc">Visible to yourself only.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                  '<button class="share-popover-row is-selected" type="button" role="radio" aria-checked="true" data-share-option="public">' +
                    '<span class="share-popover-icon-badge is-filled"><span class="share-popover-icon ic-global"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Public</span>' +
                      '<span class="share-popover-row-desc">Anyone can access by link.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-check" aria-hidden="true"></span>' +
                  '</button>' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="sealed">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-lightning"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Sealed</span>' +
                      '<span class="share-popover-row-desc">Other users need to pay credits to read.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                '</div>' +
                '<button class="share-popover-copy" type="button" data-share-copy>' +
                  '<span class="share-popover-copy-icon" data-share-copy-icon></span>' +
                  '<span data-share-copy-label>Copy Link</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="star-menu">' +
              '<button class="pb-action" type="button" aria-label="Star" data-star-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-action-icon ic-star"></span>' +
                (star ? '<span class="pb-action-count">' + esc(star) + '</span>' : '') +
              '</button>' +
              '<div class="star-popover" data-star-popover role="dialog" aria-label="Connect Agents to Get Notified" aria-hidden="true">' +
                '<div class="star-popover-card">' +
                  '<div class="star-popover-logo"><img src="/alva-infant/logo-portrait.svg" alt="" /></div>' +
                  '<p class="star-popover-title">Connect Agents to Get Notified</p>' +
                  '<a href="https://t.me/alva_ai_bot" target="_blank" rel="noopener" class="star-popover-cta">' +
                    '<img class="star-popover-cta-icon" src="https://alva-ai-static.b-cdn.net/icons/logo-social-telegram2.svg" alt="" />' +
                    '<span>Connect Telegram</span>' +
                  '</a>' +
                  '<div class="star-popover-socials">' +
                    '<span class="star-popover-chip"><img src="/alva-infant/logo-social-discord.svg" alt="" /><span>Discord</span></span>' +
                    '<span class="star-popover-chip is-disabled"><img src="/alva-infant/logo-social-slack.svg" alt="" /><span>Slack</span></span>' +
                    '<span class="star-popover-chip is-disabled"><img src="/alva-infant/logo-social-whatsapp.svg" alt="" /><span>WhatsApp</span></span>' +
                  '</div>' +
                '</div>' +
                '<button class="star-popover-footer" type="button" data-star-footer>' +
                  '<span class="star-popover-footer-icon" aria-hidden="true"></span>' +
                  '<span>Starred</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<button class="pb-action" type="button" aria-label="Comments" data-discuss-trigger aria-pressed="false"><span class="pb-action-icon ic-chat"></span>' + (comments ? '<span class="pb-action-count">' + esc(comments) + '</span>' : '') + '</button>' +
            '<div class="remix-menu pb-remix-wrap">' +
              '<button class="pb-remix-btn" type="button" aria-label="Remix" data-remix-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-remix-label">Remix</span>' +
                (remix ? '<span class="pb-remix-count">' + esc(remix) + '</span>' : '') +
              '</button>' +
              '<div class="remix-popover" data-remix-popover role="dialog" aria-label="Remix this Playbook" aria-hidden="true">' +
                '<h2 class="remix-popover-title">Remix this Playbook</h2>' +
                '<p class="remix-popover-desc">Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.</p>' +
                '<button class="remix-popover-cta" type="button" data-remix-cta>' +
                  '<span class="remix-popover-cta-icon"></span>' +
                  '<span>Remix</span>' +
                '</button>' +
                '<div class="remix-popover-agent">' +
                  '<div class="remix-popover-divider">' +
                    '<div class="remix-popover-divider-line"></div>' +
                    '<button class="remix-popover-agent-toggle" type="button" data-remix-agent-toggle aria-expanded="false">' +
                      '<span>Or use your own agent</span>' +
                      '<span class="remix-popover-agent-arrow"></span>' +
                    '</button>' +
                    '<div class="remix-popover-divider-line"></div>' +
                  '</div>' +
                  '<div class="remix-popover-agent-body">' +
                    '<pre class="remix-popover-prompt" data-remix-prompt>' + esc(buildExternalRemixPrompt(title)) + '</pre>' +
                    '<button class="remix-popover-copy" type="button" data-remix-copy>' +
                      '<span class="remix-popover-copy-icon" data-remix-copy-icon></span>' +
                      '<span data-remix-copy-label>Copy</span>' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            (alertsEnabled
              ? '<div class="alerts-menu">' +
                  '<button class="pb-alerts-btn' + (alertsStartConnected ? ' is-on' : '') + '" type="button" aria-label="' + esc(alertsLabel) + '" data-alerts-trigger aria-haspopup="dialog" aria-expanded="false">' +
                    '<span class="pb-alerts-label">' + esc(alertsLabel) + '</span>' +
                  '</button>' +
                  '<div class="alerts-popover' + (alertsStartConnected ? ' is-connected' : '') + '" data-alerts-popover role="dialog" aria-label="' + esc(alertsLabel) + '" aria-hidden="true">' +
                    '<div class="alerts-popover-initial" data-alerts-initial>' +
                      '<p class="alerts-popover-title">Get Alerts</p>' +
                      '<div class="alerts-popover-card">' +
                        '<div class="alerts-popover-logo"><img src="/alva-infant/logo-portrait.svg" alt="" /></div>' +
                        '<p class="alerts-popover-subtitle">Connect Agents to Get Notified</p>' +
                        '<div class="alerts-popover-ctas">' +
                          '<button type="button" class="alerts-popover-cta alerts-popover-cta--primary" data-connect-platform="telegram">' +
                            '<span class="alerts-popover-cta-inner">' +
                              '<img class="alerts-popover-cta-icon" src="https://alva-ai-static.b-cdn.net/icons/logo-social-telegram2.svg" alt="" />' +
                              '<span>Connect Telegram</span>' +
                            '</span>' +
                            '<span class="alerts-popover-cta-spinner" aria-hidden="true"></span>' +
                          '</button>' +
                          '<button type="button" class="alerts-popover-cta alerts-popover-cta--secondary" data-connect-platform="discord">' +
                            '<span class="alerts-popover-cta-inner">' +
                              '<img class="alerts-popover-cta-icon" src="/alva-infant/logo-social-discord.svg" alt="" />' +
                              '<span>Connect Discord</span>' +
                            '</span>' +
                            '<span class="alerts-popover-cta-spinner" aria-hidden="true"></span>' +
                          '</button>' +
                        '</div>' +
                        '<div class="alerts-popover-extra">' +
                          '<p class="alerts-popover-extra-label">Same agent, more channels</p>' +
                          '<div class="alerts-popover-chips">' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-slack.svg" alt="" /><span>Slack</span></span>' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-whatsapp.svg" alt="" /><span>WhatsApp</span></span>' +
                            '<span class="alerts-popover-chip is-disabled"><img src="/alva-infant/logo-social-line.svg" alt="" /><span>Line</span></span>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="alerts-popover-connected" data-alerts-connected>' +
                      '<p class="alerts-popover-title">Get Alerts</p>' +
                      '<div class="alerts-connected-section">' +
                        '<div class="alerts-connected-head">' +
                          '<span class="alerts-connected-head-label">Connected</span>' +
                          '<button class="alerts-connected-manage" type="button" data-alerts-manage>' +
                            '<span>Manage Accounts</span>' +
                            '<span class="alerts-connected-manage-chev" aria-hidden="true"></span>' +
                          '</button>' +
                        '</div>' +
                        '<div class="alerts-connected-account" data-alerts-account>' +
                          '<img class="alerts-connected-avatar" data-alerts-avatar data-platform="' + (alertsStartConnected ? 'discord' : 'telegram') + '" src="' + (alertsStartConnected ? '/alva-infant/logo-social-discord.svg' : 'https://alva-ai-static.b-cdn.net/icons/logo-social-telegram2.svg') + '" alt="" />' +
                          '<span class="alerts-connected-name" data-alerts-name>Sheer Ruan</span>' +
                          '<div class="alerts-connected-toggle">' +
                            '<span class="alerts-connected-toggle-label">Receive Alerts</span>' +
                            '<button type="button" class="switch" data-alerts-switch role="switch" aria-checked="false"><span class="switch-thumb"></span></button>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div class="alerts-signals-section">' +
                        '<p class="alerts-signals-title">Latest Signals</p>' +
                        '<div class="alerts-signals-list">' +
                          '<div class="alerts-signal-card">' +
                            '<p class="alerts-signal-date">Apr 16, 2026 · Market Close Digest</p>' +
                            '<ul class="alerts-signal-bullets">' +
                              '<li><strong>Top of basket:</strong> ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property &amp; Casualty continues.</li>' +
                              '<li><strong>New entries:</strong> BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.</li>' +
                              '<li><strong>Dropouts:</strong> TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.</li>' +
                            '</ul>' +
                          '</div>' +
                          '<div class="alerts-signal-card">' +
                            '<p class="alerts-signal-date">Apr 15, 2026 · Market Close Digest</p>' +
                            '<ul class="alerts-signal-bullets">' +
                              '<li><strong>Momentum:</strong> NVDA, META extend leadership on improving estimates; Score moves +2 avg.</li>' +
                              '<li><strong>Re-rating:</strong> Energy basket re-rates higher on improving ROE and lower leverage.</li>' +
                              '<li><strong>Watch:</strong> DIS, NKE drift lower — guidance risks heading into Q2 prints.</li>' +
                            '</ul>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>'
              : '') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<section class="playbook-info">' +
        '<div class="pb-meta">' +
          authorBlock +
          readmeBlock +
          statusBlock +
          builtOnBlock +
        '</div>' +
        descBlock +
      '</section>';
  }

  function setupSettingsPopover(host) {
    var trigger = host.querySelector('[data-creator-settings]');
    var popover = host.querySelector('[data-settings-popover]');
    if (!trigger || !popover) return;
    var closeBtn = popover.querySelector('[data-settings-close]');

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
      });
    }

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  function setupHistoryPopover(host) {
    var trigger = host.querySelector('[data-creator-history]');
    var popover = host.querySelector('[data-history-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  function setupReadmeTrigger(host) {
    var btn = host.querySelector('[data-readme-trigger]');
    if (!btn) return;
    var modalId = host.getAttribute('readme-modal') || '';
    btn.addEventListener('click', function () {
      host.dispatchEvent(new CustomEvent('playbook-readme-click', {
        bubbles: true,
        detail: { modalId: modalId }
      }));
    });
  }

  function setupDescToggle(host) {
    var desc = host.querySelector('.pb-desc');
    if (!desc) return;
    var text = desc.querySelector('.pb-desc-text');
    var toggle = desc.querySelector('.pb-desc-toggle');
    if (!text || !toggle) return;

    function checkOverflow() {
      var wasCollapsed = desc.classList.contains('collapsed');
      desc.classList.add('collapsed');
      var overflows = text.scrollWidth - text.clientWidth > 1;
      if (!wasCollapsed) desc.classList.remove('collapsed');
      desc.classList.toggle('has-overflow', overflows);
    }

    checkOverflow();
    var onResize = function () { checkOverflow(); };
    window.addEventListener('resize', onResize);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      window.removeEventListener('resize', onResize);
    });

    toggle.addEventListener('click', function () {
      var collapsed = desc.classList.toggle('collapsed');
      toggle.textContent = collapsed ? 'Show more' : 'Show less';
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  function registerPopover(host, closeFn) {
    host._popovers = host._popovers || [];
    host._popovers.push(closeFn);
  }
  function closeOtherPopovers(host, self) {
    (host._popovers || []).forEach(function (fn) { if (fn !== self) fn(); });
  }

  function setupFeedsPopover(host) {
    var trigger = host.querySelector('[data-feeds-trigger]');
    var popover = host.querySelector('[data-feeds-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    popover.querySelectorAll('[data-feed]').forEach(function (row) {
      var activate = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feed-click', {
          bubbles: true,
          detail: { id: row.getAttribute('data-feed') }
        }));
      };
      row.addEventListener('click', activate);
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    var viewAll = popover.querySelector('.feeds-popover-viewall');
    if (viewAll) {
      var go = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feeds-viewall', { bubbles: true }));
      };
      viewAll.addEventListener('click', go);
      viewAll.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    }
  }

  function setupRemixPopover(host) {
    var trigger = host.querySelector('[data-remix-trigger]');
    var popover = host.querySelector('[data-remix-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.classList.remove('agent-open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
      var agentToggleEl = popover.querySelector('[data-remix-agent-toggle]');
      if (agentToggleEl) agentToggleEl.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var agentToggle = popover.querySelector('[data-remix-agent-toggle]');
    if (agentToggle) {
      agentToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var opened = popover.classList.toggle('agent-open');
        agentToggle.setAttribute('aria-expanded', String(opened));
      });
    }

    var cta = popover.querySelector('[data-remix-cta]');
    if (cta) {
      cta.addEventListener('click', function (e) {
        e.stopPropagation();
        var title = host.getAttribute('title') || '';
        var prompt = buildRemixPrompt(title);
        try {
          window.parent.postMessage({ type: 'alva:remix', prompt: prompt, title: title }, '*');
        } catch (_) {}
        close();
      });
    }

    var copyBtn = popover.querySelector('[data-remix-copy]');
    var promptEl = popover.querySelector('[data-remix-prompt]');
    if (copyBtn && promptEl) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = promptEl.textContent || '';
        var icon = copyBtn.querySelector('[data-remix-copy-icon]');
        var label = copyBtn.querySelector('[data-remix-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  function setupDiscussTrigger(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      host.dispatchEvent(new CustomEvent('playbook-discuss-click', { bubbles: true }));
    });
  }

  function updateDiscussActive(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    var active = host.getAttribute('discuss-active') === 'true';
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  }

  function setupSharePopover(host) {
    var trigger = host.querySelector('[data-share-trigger]');
    var popover = host.querySelector('[data-share-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var rows = popover.querySelectorAll('[data-share-option]');
    rows.forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.stopPropagation();
        rows.forEach(function (r) {
          r.classList.remove('is-selected');
          r.setAttribute('aria-checked', 'false');
          var badge = r.querySelector('.share-popover-icon-badge');
          if (badge) badge.classList.remove('is-filled');
        });
        row.classList.add('is-selected');
        row.setAttribute('aria-checked', 'true');
        var badge = row.querySelector('.share-popover-icon-badge');
        if (badge) badge.classList.add('is-filled');
      });
    });

    var copyBtn = popover.querySelector('[data-share-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var icon = copyBtn.querySelector('[data-share-copy-icon]');
        var label = copyBtn.querySelector('[data-share-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy Link';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  function setupStarPopover(host) {
    var trigger = host.querySelector('[data-star-trigger]');
    if (!trigger) return;
    var alertsEnabled = host.hasAttribute('get-alerts')
      && host.getAttribute('get-alerts') !== 'false';
    var popover = host.querySelector('[data-star-popover]');
    if (popover && popover.parentNode) popover.parentNode.removeChild(popover);
    trigger.removeAttribute('aria-haspopup');
    trigger.removeAttribute('aria-expanded');

    if (alertsEnabled) return; // alerts variant handles star click in setupAlertsPopover

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      trigger.classList.toggle('is-starred');
      trigger.setAttribute('aria-pressed', trigger.classList.contains('is-starred') ? 'true' : 'false');
    });
  }

  function setupAlertsPopover(host) {
    var popover = host.querySelector('[data-alerts-popover]');
    if (!popover) return;
    var alertsBtn = host.querySelector('[data-alerts-trigger]');
    var starBtn = host.querySelector('[data-star-trigger]');

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'false');
        alertsBtn.classList.remove('is-open');
      }
      if (starBtn) starBtn.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'true');
        alertsBtn.classList.add('is-open');
      }
      if (starBtn) starBtn.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    if (alertsBtn) {
      alertsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (popover.classList.contains('open')) close(); else open();
      });
    }
    if (starBtn) {
      var starOpenTimer = null;
      starBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var nowStarred = !starBtn.classList.contains('is-starred');
        starBtn.classList.toggle('is-starred', nowStarred);
        starBtn.setAttribute('aria-pressed', nowStarred ? 'true' : 'false');
        if (starOpenTimer) { clearTimeout(starOpenTimer); starOpenTimer = null; }
        if (nowStarred) {
          // Small delay so the star fill animates first, then the popover eases in.
          starOpenTimer = setTimeout(function () { open(); starOpenTimer = null; }, 240);
        } else {
          close();
        }
      });
      host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
        if (starOpenTimer) { clearTimeout(starOpenTimer); starOpenTimer = null; }
      });
    }

    // ── Connect buttons: fake loading → connected state ──
    var connectTimer = null;
    var connectBtns = popover.querySelectorAll('[data-connect-platform]');
    connectBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.classList.contains('is-loading')) return;
        if (popover.classList.contains('is-connected')) return;
        // mark loading + disable all connect buttons
        connectBtns.forEach(function (b) { b.classList.add('is-disabled'); });
        btn.classList.remove('is-disabled');
        btn.classList.add('is-loading');
        btn.setAttribute('aria-busy', 'true');
        if (connectTimer) clearTimeout(connectTimer);
        connectTimer = setTimeout(function () {
          // transition to connected state
          var platform = btn.getAttribute('data-connect-platform') || 'telegram';
          var avatarEl = popover.querySelector('[data-alerts-avatar]');
          if (avatarEl) {
            avatarEl.setAttribute('data-platform', platform);
            var iconSrc = platform === 'discord'
              ? '/alva-infant/logo-social-discord.svg'
              : 'https://alva-ai-static.b-cdn.net/icons/logo-social-telegram2.svg';
            if (avatarEl.tagName === 'IMG') avatarEl.setAttribute('src', iconSrc);
          }
          popover.classList.add('is-connected');
          // reset loading (so if user re-opens, buttons are fresh)
          btn.classList.remove('is-loading');
          btn.removeAttribute('aria-busy');
          connectBtns.forEach(function (b) { b.classList.remove('is-disabled'); });
          connectTimer = null;
        }, 1500);
      });
    });

    // Manage Accounts → navigate parent to Alva Agent settings
    var manageBtn = popover.querySelector('[data-alerts-manage]');
    if (manageBtn) {
      manageBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        try {
          (window.parent || window).postMessage({ type: 'alva:navigate', page: 'alva-agent' }, '*');
        } catch (_) {}
        close();
      });
    }

    // Receive Alerts toggle switch
    var switchBtn = popover.querySelector('[data-alerts-switch]');
    if (switchBtn) {
      switchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var on = !switchBtn.classList.contains('on');
        switchBtn.classList.toggle('on', on);
        switchBtn.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }

    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      if (connectTimer) { clearTimeout(connectTimer); connectTimer = null; }
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target)) return;
      if (alertsBtn && alertsBtn.contains(e.target)) return;
      if (starBtn && starBtn.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  class PlaybookHeader extends HTMLElement {
    static get observedAttributes() { return ['discuss-active']; }
    attributeChangedCallback(name) {
      if (name === 'discuss-active' && this._pbHeaderMounted) updateDiscussActive(this);
    }
    connectedCallback() {
      if (this._pbHeaderMounted) return;
      this._pbHeaderMounted = true;
      // connectedCallback can fire before child <script type="application/json">
      // nodes are parsed (when the element JS is loaded inline in <head>, the
      // parser upgrades the element on its open tag before reading children).
      // Defer mount to the next tick so we can read the feeds JSON child.
      var self = this;
      var mount = function () {
        render(self);
        setupDescToggle(self);
        setupFeedsPopover(self);
        setupRemixPopover(self);
        setupStarPopover(self);
        setupAlertsPopover(self);
        setupSharePopover(self);
        setupSettingsPopover(self);
        setupHistoryPopover(self);
        setupReadmeTrigger(self);
        setupDiscussTrigger(self);
        updateDiscussActive(self);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        Promise.resolve().then(mount);
      }
    }
    disconnectedCallback() {
      (this._pbHeaderCleanup || []).forEach(function (fn) { try { fn(); } catch (_) {} });
      this._pbHeaderCleanup = [];
    }
  }

  customElements.define('playbook-header', PlaybookHeader);
})();
`,o=`/* ══════════════════════════════════════════════════════════════
   <discussion-panel> — Right-docked discussion/comments panel
   Squeezes body content when open (matches Freshman behavior).
   Auto-wires to any <playbook-header> on the page.
   ══════════════════════════════════════════════════════════════ */

html, body {
    transition: padding-right 220ms ease-in-out;
}
body.dp-open {
    padding-right: 488px; /* panel 480 + 8 gap */
}

discussion-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 480px;
    max-width: calc(100vw - 8px);
    z-index: 40;
    display: flex;
    padding: 8px;
    padding-left: 0;
    transform: translateX(calc(100% + 12px));
    opacity: 0;
    pointer-events: none;
    transition: transform 220ms ease-in-out, opacity 160ms ease-in-out;
    font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
    box-sizing: border-box;
}
discussion-panel[open] {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
}

.dp-shell {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    background: var(--b0-container, #fff);
    border: 0.5px solid var(--line-l2, rgba(0, 0, 0, 0.2));
    border-radius: 12px;
    box-shadow: var(--shadow-xs, 0 4px 15px 0 rgba(0, 0, 0, 0.05));
    overflow: hidden;
}

.dp-resizer {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    cursor: col-resize;
    z-index: 2;
}

.dp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 48px;
    flex-shrink: 0;
}
.dp-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
}
.dp-title {
    font-size: 14px;
    line-height: 22px;
    color: var(--text-n9);
    font-weight: 400;
    margin: 0;
}
.dp-count {
    font-size: 12px;
    color: var(--text-n5);
}
.dp-close {
    width: 16px;
    height: 16px;
    background-color: var(--text-n9);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/close-l1.svg') center / contain no-repeat;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.15s;
}
.dp-close:hover { opacity: 0.6; }

.dp-list {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 0 24px;
}

.dp-thread {
    position: relative;
}
.dp-thread-vline {
    position: absolute;
    left: 11px;
    width: 1px;
    background: var(--grey-g05, #eaeaea);
}
.dp-thread-hline {
    position: absolute;
    left: -21px;
    top: 23px;
    width: 21px;
    height: 1px;
    background: var(--grey-g05, #eaeaea);
}

.dp-comment {
    display: flex;
    gap: 8px;
    padding: 12px 0;
}
.dp-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    font-family: 'Delight', sans-serif;
    text-transform: uppercase;
}
.dp-avatar.is-agent { background: var(--main-m1, #49A3A6); }

.dp-comment-body { flex: 1 1 auto; min-width: 0; }
.dp-comment-head { display: flex; align-items: center; }
.dp-author {
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    color: var(--text-n9);
}
.dp-agent-badge {
    margin-left: 6px;
    font-size: 10px;
    color: var(--main-m1, #49A3A6);
    background: var(--main-m1-10, rgba(73, 163, 166, 0.1));
    padding: 1px 6px;
    border-radius: 3px;
    line-height: 16px;
    font-weight: 500;
}
.dp-time {
    margin-left: auto;
    font-size: 12px;
    color: var(--text-n5);
    flex-shrink: 0;
}

.dp-md {
    margin-top: 6px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.14px;
    color: var(--text-n9);
    white-space: pre-wrap;
    word-break: break-word;
}
.dp-md strong { font-weight: 600; color: var(--text-n9); }
.dp-md code {
    background: rgba(0, 0, 0, 0.05);
    padding: 1px 8px;
    border-radius: 3px;
    font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
    font-size: 13px;
}
.dp-md ul { margin: 4px 0 0; padding-left: 20px; }
.dp-md li { margin: 2px 0; }

.dp-reply-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-n5);
    font-family: inherit;
    transition: color 0.15s;
}
.dp-reply-btn:hover { color: var(--main-m1, #49A3A6); }
.dp-reply-icon {
    width: 16px;
    height: 16px;
    background-color: currentColor;
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/chat-l1.svg') center / contain no-repeat;
    opacity: 0.7;
}

.dp-replies {
    margin-left: 11px;
    padding-left: 21px;
    position: relative;
}

.dp-reply-input {
    display: flex;
    gap: 8px;
    padding: 8px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin-left: 42px;
}
.dp-reply-input-col { flex: 1 1 auto; min-width: 0; }
.dp-reply-input-label {
    font-size: 12px;
    color: var(--text-n5);
    margin: 0 0 4px;
}
.dp-reply-input textarea {
    width: 100%;
    resize: vertical;
    min-height: 56px;
    padding: 8px 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 6px;
    font-family: 'Delight', sans-serif;
    font-size: 13px;
    color: var(--text-n9);
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s;
}
.dp-reply-input textarea:focus { border-color: var(--main-m1, #49A3A6); }
.dp-reply-actions {
    display: flex;
    gap: 8px;
    margin-top: 4px;
}
.dp-reply-submit {
    background: var(--main-m1, #49A3A6);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 12px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
}
.dp-reply-cancel {
    background: none;
    color: var(--text-n5);
    border: none;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
}

.dp-footer { flex-shrink: 0; padding: 8px; }
.dp-footer-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 0.5px solid var(--line-l2, rgba(0, 0, 0, 0.2));
    border-radius: 8px;
    padding: 12px 16px;
    transition: border-color 0.15s;
}
.dp-footer-wrap.is-focus { border-color: var(--text-n9); }
.dp-footer-input {
    flex: 1 1 auto;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Delight', sans-serif;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-n9);
    padding: 0;
}
.dp-footer-input::placeholder { color: var(--text-n5); }
.dp-send {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #fff;
    border: 0.5px solid var(--line-l3, rgba(0, 0, 0, 0.3));
    cursor: not-allowed;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
.dp-send.is-active {
    background: var(--main-m1, #49A3A6);
    border-color: transparent;
    cursor: pointer;
}
.dp-send-icon {
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-up-l1.svg') center / contain no-repeat;
            mask: url('https://alva-ai-static.b-cdn.net/icons/arrow-up-l1.svg') center / contain no-repeat;
}
.dp-send.is-active .dp-send-icon { background-color: #fff; }
`,i=`/* ══════════════════════════════════════════════════════════════
   <discussion-panel> — Right-docked discussion panel
   Auto-wires itself to the page's <playbook-header> — just include
   the CSS + JS on any playbook page and the Comments button will
   open a squeeze-out panel with threaded comments.

   Data source (optional, falls back to bundled default):
     <discussion-panel>
       <script type="application/json" class="dp-data">
         [ { "id": "c1", "author": "...", "isAgent": false,
             "text": "...", "timestamp": "2h ago",
             "replies": [...] } ]
       <\/script>
     </discussion-panel>

   If no <discussion-panel> element exists on the page, one is
   auto-appended to <body> with DEFAULT_COMMENTS. When the panel is
   open, \`body.dp-open\` is toggled so CSS can squeeze content.
   ══════════════════════════════════════════════════════════════ */

(function () {
  if (customElements.get('discussion-panel')) return;

  /* Right-drawer mutex: close self when any other right drawer (e.g. parent Chat) opens */
  window.addEventListener('message', function (e) {
    var data = e && e.data;
    if (!data || typeof data !== 'object') return;
    if (data.type !== 'alva:drawer-open') return;
    if (data.drawer === 'discussion') return;
    document.querySelectorAll('discussion-panel[open]').forEach(function (h) { closePanel(h); });
  });

  /* ── default mock (generic investing thread) ── */
  var DEFAULT_COMMENTS = [
    {
      id: 'c1', author: 'Marcus Reed', isAgent: false, timestamp: '2h ago',
      text: "The thesis is interesting but I'm worried about **valuation compression** on the core names. What's the downside scenario if guidance gets cut next cycle?",
      replies: [
        {
          id: 'c1-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 55m ago',
          text: 'Downside model assumes a **20% demand cut** from top buyers. Under that scenario:\\n- Primary names drop ~\`-22%\`\\n- Secondary names hold up better (\`-8%\`)\\n- Infrastructure names most defensive (\`-5%\`)\\n\\nFull sensitivity analysis is in the Risks tab.'
        },
        {
          id: 'c1-r2', author: 'Priya Shah', isAgent: false, timestamp: '1h 40m ago',
          text: "Same concern here. I'm hedging with short-dated puts at the ATM strike."
        }
      ]
    },
    {
      id: 'c2', author: 'Frank Li', isAgent: false, timestamp: '1h 30m ago',
      text: "Sharpe of \`2.41\` looks impressive, but is it in-sample? Any **out-of-sample** validation? Walk-forward results would be more convincing.",
      replies: [
        {
          id: 'c2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 20m ago',
          text: 'Good question. Uses **walk-forward** optimization with 6-month training / 2-month validation windows across 4 years. OOS Sharpe averages \`2.18\` — lower than in-sample but still robust.'
        },
        {
          id: 'c2-r2', author: 'Sarah Park', isAgent: false, timestamp: '1h 10m ago',
          text: "I ran my own OOS test on the last 6 months — can confirm it holds up. Sharpe was \`2.23\` on my run."
        }
      ]
    },
    {
      id: 'c3', author: 'Carol Wu', isAgent: false, timestamp: '45m ago',
      text: 'I forked this and added a **mean-reversion overlay** — works well for ranging markets.\\n\\nKey changes:\\n- Added Bollinger Band squeeze detection\\n- Reduced trade frequency by ~30%\\n- Improved Sharpe from \`2.41\` to \`2.67\` in backtests'
    },
    {
      id: 'c4', author: 'Dave Kim', isAgent: false, timestamp: '30m ago',
      text: "What's the recommended position sizing? The docs mention 5-15% per name.",
      replies: [
        {
          id: 'c4-r1', author: 'Alva Agent', isAgent: true, timestamp: '20m ago',
          text: '**Position sizing:** For portfolios \`>$100K\`, 8-12% per name balances concentration risk.\\n- Conservative: 5-8%\\n- Moderate: 8-12%\\n- Aggressive: 12-15%'
        }
      ]
    },
    {
      id: 'c5', author: 'Jenny Zhao', isAgent: false, timestamp: '25m ago',
      text: "Running this **live for 6 weeks** — up **+14.8%** vs benchmark +3.1%. Signal quality has been impressive."
    },
    {
      id: 'c6', author: 'Ryan Chen', isAgent: false, timestamp: '10m ago',
      text: "From a **macro** perspective, the setup looks favorable — the thesis is still early in absolute dollar terms even if the stocks look extended on multiples."
    }
  ];

  var AVATAR_PALETTE = ['#EE6352','#59CD90','#3FA7D6','#FAC05E','#F79D84','#9B72CF','#F4845F','#5DA9E9','#C77DFF','#06A77D'];

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Minimal markdown: **bold**, \`code\`, \`- bullet\` lists, newlines. */
  function renderMarkdown(src) {
    var text = String(src == null ? '' : src);
    var lines = text.split('\\n');
    var out = [];
    var i = 0;
    function inline(s) {
      s = esc(s);
      s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
      s = s.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
      return s;
    }
    while (i < lines.length) {
      var line = lines[i];
      if (/^\\s*-\\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\\s*-\\s+/.test(lines[i])) {
          items.push('<li>' + inline(lines[i].replace(/^\\s*-\\s+/, '')) + '</li>');
          i++;
        }
        out.push('<ul>' + items.join('') + '</ul>');
        continue;
      }
      out.push('<span>' + inline(line) + '</span>');
      i++;
    }
    return out.join('<br>');
  }

  function avatarColor(name) {
    var s = 0, str = String(name || '');
    for (var i = 0; i < str.length; i++) s += str.charCodeAt(i);
    return AVATAR_PALETTE[s % AVATAR_PALETTE.length];
  }

  function renderAvatar(name, isAgent) {
    var initial = (String(name || '?').trim().charAt(0) || '?').toUpperCase();
    var cls = 'dp-avatar' + (isAgent ? ' is-agent' : '');
    var style = isAgent ? '' : 'style="background:' + avatarColor(name) + '"';
    return '<div class="' + cls + '" ' + style + '>' + esc(initial) + '</div>';
  }

  function renderComment(c) {
    return (
      '<div class="dp-comment">' +
        renderAvatar(c.author, !!c.isAgent) +
        '<div class="dp-comment-body">' +
          '<div class="dp-comment-head">' +
            '<span class="dp-author">' + esc(c.author || '') + '</span>' +
            (c.isAgent ? '<span class="dp-agent-badge">Agent</span>' : '') +
            '<span class="dp-time">' + esc(c.timestamp || '') + '</span>' +
          '</div>' +
          '<div class="dp-md">' + renderMarkdown(c.text || '') + '</div>' +
          '<button class="dp-reply-btn" type="button" data-reply-target="' + esc(c.id) + '">' +
            '<span class="dp-reply-icon" aria-hidden="true"></span>' +
            '<span>Reply</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderThread(c) {
    var hasReplies = Array.isArray(c.replies) && c.replies.length > 0;
    var html = '<div class="dp-thread" data-thread-id="' + esc(c.id) + '">';
    if (hasReplies) html += '<div class="dp-thread-vline" style="top:34px;bottom:0;"></div>';
    html += renderComment(c);
    if (hasReplies) {
      html += '<div class="dp-replies">';
      c.replies.forEach(function (r, idx) {
        var isLast = idx === c.replies.length - 1;
        html += '<div class="dp-thread" data-thread-id="' + esc(r.id) + '">';
        html += '<div class="dp-thread-hline"></div>';
        if (!isLast) html += '<div class="dp-thread-vline" style="top:34px;bottom:0;left:-21px;"></div>';
        html += renderThread(r);
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderReplyInput(targetAuthor, targetId) {
    return (
      '<div class="dp-reply-input" data-reply-input="' + esc(targetId) + '">' +
        '<div class="dp-reply-input-col">' +
          '<p class="dp-reply-input-label">Replying to ' + esc(targetAuthor) + '</p>' +
          '<textarea placeholder="Write a reply..."></textarea>' +
          '<div class="dp-reply-actions">' +
            '<button class="dp-reply-submit" type="button">Reply</button>' +
            '<button class="dp-reply-cancel" type="button" data-reply-cancel>Cancel</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function countAll(comments) {
    var n = 0;
    (comments || []).forEach(function (c) {
      n += 1 + ((c.replies && c.replies.length) || 0);
    });
    return n;
  }

  function readData(host) {
    var node = host.querySelector('script.dp-data[type="application/json"]');
    if (!node) return null;
    try {
      var data = JSON.parse(node.textContent || '[]');
      return Array.isArray(data) ? data : null;
    } catch (e) {
      console.warn('[discussion-panel] invalid JSON', e);
      return null;
    }
  }

  function findComment(list, id) {
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (c.id === id) return c;
      if (c.replies && c.replies.length) {
        var found = findComment(c.replies, id);
        if (found) return found;
      }
    }
    return null;
  }

  function render(host) {
    var comments = host._dpComments || [];
    var total = countAll(comments);

    var listHtml = comments.map(function (c) {
      return '<div class="dp-thread-wrap" data-top-id="' + esc(c.id) + '">' + renderThread(c) + '</div>';
    }).join('');

    host.innerHTML =
      '<div class="dp-shell">' +
        '<div class="dp-resizer" data-resizer></div>' +
        '<div class="dp-header">' +
          '<div class="dp-title-row">' +
            '<p class="dp-title">Discussion</p>' +
            '<span class="dp-count">' + total + '</span>' +
          '</div>' +
          '<button class="dp-close" type="button" aria-label="Close" data-close></button>' +
        '</div>' +
        '<div class="dp-list" data-list>' + listHtml + '</div>' +
        '<div class="dp-footer">' +
          '<div class="dp-footer-wrap" data-footer>' +
            '<input class="dp-footer-input" type="text" placeholder="Write a reply" data-footer-input />' +
            '<button class="dp-send" type="button" data-send>' +
              '<span class="dp-send-icon" aria-hidden="true"></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    if (host._dpDataScript && !host.contains(host._dpDataScript)) {
      host.appendChild(host._dpDataScript);
    }
  }

  function bindEvents(host) {
    host.addEventListener('click', function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;

      if (t.closest('[data-close]')) {
        closePanel(host);
        return;
      }

      var replyBtn = t.closest('[data-reply-target]');
      if (replyBtn) {
        var id = replyBtn.getAttribute('data-reply-target');
        var comment = findComment(host._dpComments || [], id);
        if (!comment) return;
        var existing = host.querySelector('[data-reply-input]');
        if (existing) existing.remove();
        var panel = replyBtn.closest('.dp-thread');
        if (panel) {
          panel.insertAdjacentHTML('beforeend', renderReplyInput(comment.author, id));
          var ta = panel.querySelector('[data-reply-input] textarea');
          if (ta) ta.focus();
        }
        return;
      }

      if (t.closest('[data-reply-cancel]')) {
        var wrap = t.closest('[data-reply-input]');
        if (wrap) wrap.remove();
        return;
      }
    });

    host.addEventListener('input', function (e) {
      var input = e.target.closest('[data-footer-input]');
      if (!input) return;
      var send = host.querySelector('[data-send]');
      if (send) send.classList.toggle('is-active', !!input.value.trim());
    });

    host.addEventListener('focusin', function (e) {
      if (e.target.closest('[data-footer-input]')) {
        var w = host.querySelector('[data-footer]');
        if (w) w.classList.add('is-focus');
      }
    });
    host.addEventListener('focusout', function (e) {
      if (e.target.closest('[data-footer-input]')) {
        var w = host.querySelector('[data-footer]');
        if (w) w.classList.remove('is-focus');
      }
    });

    var onKey = function (e) {
      if (e.key === 'Escape' && host.hasAttribute('open')) closePanel(host);
    };
    document.addEventListener('keydown', onKey);
    host._dpCleanup = (host._dpCleanup || []).concat(function () {
      document.removeEventListener('keydown', onKey);
    });

    var resizer = host.querySelector('[data-resizer]');
    if (resizer) {
      resizer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var startX = e.clientX;
        var startW = host.getBoundingClientRect().width;
        var onMove = function (ev) {
          var w = Math.min(640, Math.max(320, startW + (startX - ev.clientX)));
          host.style.width = w + 'px';
          // keep squeeze padding in sync
          document.body.style.setProperty('--dp-width', (w + 8) + 'px');
          if (host.hasAttribute('open')) document.body.style.paddingRight = (w + 8) + 'px';
        };
        var onUp = function () {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        };
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    }
  }

  function openPanel(host) {
    host.setAttribute('open', '');
    document.body.classList.add('dp-open');
    var header = document.querySelector('playbook-header');
    if (header) header.setAttribute('discuss-active', 'true');
    try { window.parent.postMessage({ type: 'alva:drawer-open', drawer: 'discussion' }, '*'); } catch (_) {}
  }
  function closePanel(host) {
    host.removeAttribute('open');
    document.body.classList.remove('dp-open');
    var header = document.querySelector('playbook-header');
    if (header) header.setAttribute('discuss-active', 'false');
    host.dispatchEvent(new CustomEvent('discussion-panel-close', { bubbles: true }));
  }

  function ensureWiredToHeader(host) {
    var header = document.querySelector('playbook-header');
    if (!header || header._dpWired) return;
    header._dpWired = true;
    header.addEventListener('playbook-discuss-click', function () {
      if (host.hasAttribute('open')) closePanel(host);
      else openPanel(host);
    });
  }

  class DiscussionPanel extends HTMLElement {
    connectedCallback() {
      if (this._dpMounted) return;
      this._dpMounted = true;
      var self = this;
      var mount = function () {
        self._dpDataScript = self.querySelector('script.dp-data[type="application/json"]');
        var custom = readData(self);
        self._dpComments = custom && custom.length ? custom : DEFAULT_COMMENTS.slice();
        render(self);
        bindEvents(self);
        ensureWiredToHeader(self);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        Promise.resolve().then(mount);
      }
    }
    disconnectedCallback() {
      (this._dpCleanup || []).forEach(function (fn) { try { fn(); } catch (_) {} });
      this._dpCleanup = [];
    }
  }

  customElements.define('discussion-panel', DiscussionPanel);

  /* ── Auto-mount: if a playbook-header exists on the page and no
     <discussion-panel> has been placed, create one automatically. ── */
  function autoMount() {
    if (!document.querySelector('playbook-header')) return;
    if (document.querySelector('discussion-panel')) return;
    var el = document.createElement('discussion-panel');
    document.body.appendChild(el);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount, { once: true });
  } else {
    autoMount();
  }
})();
`,s=`/* Alva Design Tokens — single source of truth.
   React side: imported by theme.css.
   Playbook HTML side: inlined into iframe srcDoc by inlinePlaybookHeader.ts. */

:root {
  /* ── Common ── */
  --b-common-white: #ffffff;
  --b-common-black: #000000;

  /* ── Semantic Brand ── */
  --main-m1:    #49A3A6;
  --main-m1-10: rgba(73, 163, 166, 0.1);
  --main-m2:    #2196f3;
  --main-m2-10: rgba(33, 150, 243, 0.1);
  --main-m3:    #2a9b7d;
  --main-m3-10: rgba(42, 155, 125, 0.1);
  --main-m4:    #e05357;
  --main-m4-10: rgba(224, 83, 87, 0.1);
  --main-m5:    #E6A91A;
  --main-m5-10: rgba(230, 169, 26, 0.1);
  --main-m6:    #ff9800;
  --main-m6-10: rgba(255, 152, 0, 0.1);
  --main-m7:    rgba(0, 0, 0, 0.6);

  /* ── Chart ── */
  --chart-orange1-main: #ff9800;
  --chart-orange1-1: #ffbb1c;
  --chart-orange1-2: #f8cb86;
  --chart-green1-main: #40a544;
  --chart-green1-1: #007949;
  --chart-green1-2: #78c26d;
  --chart-green2-main: #8fc13a;
  --chart-green2-1: #5b8513;
  --chart-green2-2: #c0d40f;
  --chart-cyan1-1: #117a7d;
  --chart-cyan1-2: #77c9c2;
  --chart-cyan2-main: #7cafad;
  --chart-cyan2-1: #4c807e;
  --chart-cyan2-2: #a5c7c6;
  --chart-blue1-main: #3d8bd1;
  --chart-blue1-1: #005daf;
  --chart-blue1-2: #88b7e0;
  --chart-blue2-main: #0d7498;
  --chart-blue2-1: #54a5c2;
  --chart-blue2-2: #91d1db;
  --chart-purple1-main: #5f75c9;
  --chart-purple1-1: #3a52be;
  --chart-purple1-2: #9ab1d7;
  --chart-purple2-main: #7474d8;
  --chart-purple2-1: #4646ae;
  --chart-purple2-2: #afbbf7;
  --chart-violet1-main: #a878dc;
  --chart-violet1-1: #7f4eb4;
  --chart-violet1-2: #d4b2e1;
  --chart-pink1-main: #dc7aa5;
  --chart-pink1-1: #ba5883;
  --chart-pink1-2: #ecb0ca;
  --chart-red1-main: #c76466;
  --chart-red1-1: #a94749;
  --chart-red1-2: #f2a0a1;
  --chart-grey-main: #838383;
  --chart-grey-1: #555555;
  --chart-grey-2: #b7b7b7;

  /* ── Spacing ── */
  --spacing-xxxs: 2px;
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-s: 12px;
  --spacing-m: 16px;
  --spacing-l: 20px;
  --spacing-xl: 24px;
  --spacing-xxl: 28px;
  --spacing-xxxl: 32px;
  --spacing-xxxxl: 40px;
  --spacing-xxxxxl: 48px;
  --spacing-xxxxxxl: 56px;

  /* ── Radius ── */
  --radius-ct-xs: 2px;
  --radius-ct-s: 4px;
  --radius-ct-m: 6px;
  --radius-ct-l: 8px;
  --radius-ct-xl: 12px;
  --radius-pop-dialog: 12px;
  --radius-pop-action-sheets: 12px;
  --radius-pop-dropdown: 8px;
  --radius-pop-popover: 8px;
  --radius-pop-toast: 8px;
  --radius-pop-tips: 8px;
  --radius-btn-xs: 4px;
  --radius-btn-s: 6px;
  --radius-btn-m: 8px;
  --radius-btn-l: 12px;

  /* ── Text (Light) ── */
  --text-n9: rgba(0, 0, 0, 0.9);
  --text-n7: rgba(0, 0, 0, 0.7);
  --text-n5: rgba(0, 0, 0, 0.5);
  --text-n3: rgba(0, 0, 0, 0.3);
  --text-n2: rgba(0, 0, 0, 0.2);

  /* ── Background ── */
  --b0-page:           #ffffff;
  --b0-container:      #ffffff;
  --b0-sidebar:        #2A2A38;
  --b0-sidebar-select: rgba(255, 255, 255, 0.03);
  --grey-g01: #fafafa;
  --grey-g02: #f5f5f5;
  --grey-g03: #f0f0f0;
  --grey-g05: #eaeaea;
  --grey-g1:  #dedede;
  --b-r02: rgba(0, 0, 0, 0.02);
  --b-r03: rgba(0, 0, 0, 0.03);
  --b-r05: rgba(0, 0, 0, 0.05);
  --b-r07: rgba(0, 0, 0, 0.07);
  --b-r1:  rgba(0, 0, 0, 0.1);

  /* ── Line & Border ── */
  --line-l05: rgba(0, 0, 0, 0.05);
  --line-l07: rgba(0, 0, 0, 0.07);
  --line-l12: rgba(0, 0, 0, 0.12);
  --line-l2:  rgba(0, 0, 0, 0.2);
  --line-l3:  rgba(0, 0, 0, 0.3);
  --line-l9:  rgba(0, 0, 0, 0.9);

  /* ── Shadow ── */
  --shadow-xs: 0 4px 15px 0 rgba(0, 0, 0, 0.05);
  --shadow-s:  0 6px 20px 0 rgba(0, 0, 0, 0.04);
  --shadow-l:  0 10px 20px 0 rgba(0, 0, 0, 0.08);

  /* ── Tailwind / shadcn compat ── */
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --background: rgba(246, 246, 246, 1);
  --foreground: rgba(0, 0, 0, 0.9);
  --primary: rgba(73, 163, 166, 1);
  --primary-foreground: rgba(255, 255, 255, 1);
  --card: rgba(255, 255, 255, 1);
  --card-foreground: rgba(0, 0, 0, 0.9);
  --border: rgba(0, 0, 0, 0.3);
  --muted: rgba(250, 250, 250, 1);
  --muted-foreground: rgba(0, 0, 0, 0.7);
  --destructive: rgba(224, 83, 87, 1);
  --ring: rgba(73, 163, 166, 1);
  --radius: 6px;
  --radius-card: 8px;
  --sidebar: rgba(42, 42, 56, 1);
  --sidebar-foreground: rgba(0, 0, 0, 0.9);
  --sidebar-primary: rgba(73, 163, 166, 1);

  /* ── Short-name aliases used by playbook HTMLs ── */
  --sp-xxs: var(--spacing-xxs);
  --sp-xs:  var(--spacing-xs);
  --sp-s:   var(--spacing-s);
  --sp-m:   var(--spacing-m);
  --sp-l:   var(--spacing-l);
  --sp-xl:  var(--spacing-xl);
  --sp-xxl: var(--spacing-xxl);
  --sp-xxxl:var(--spacing-xxxl);
  --r-xs: var(--radius-ct-xs);
  --r-s:  var(--radius-ct-s);
  --r-m:  var(--radius-btn-s);
  --r-l:  var(--radius-ct-l);
}

/* Dark Mode (disabled — kept for future use) */
[data-theme="dark-disabled"] {
  /* Text */
  --text-n9: rgba(255, 255, 255, 0.9);
  --text-n7: rgba(255, 255, 255, 0.7);
  --text-n5: rgba(255, 255, 255, 0.5);
  --text-n3: rgba(255, 255, 255, 0.3);
  --text-n2: rgba(255, 255, 255, 0.2);

  /* Background */
  --b0-page: #15161a;
  --b0-container: #15161a;
  --b0-sidebar: #2A2A38;
  --b0-sidebar-select: rgba(255, 255, 255, 0.03);
  --grey-g01: #1a1b1f;
  --grey-g02: #1c1d21;
  --grey-g03: #212225;
  --grey-g05: #25262a;
  --grey-g1: #2c2d31;
  --b-r02: rgba(255, 255, 255, 0.02);
  --b-r03: rgba(255, 255, 255, 0.03);
  --b-r05: rgba(255, 255, 255, 0.05);
  --b-r07: rgba(255, 255, 255, 0.07);
  --b-r1: rgba(255, 255, 255, 0.1);

  /* Line & Border */
  --line-l07: rgba(255, 255, 255, 0.07);
  --line-l05: rgba(255, 255, 255, 0.05);
  --line-l12: rgba(255, 255, 255, 0.12);
  --line-l2: rgba(255, 255, 255, 0.2);
  --line-l3: rgba(255, 255, 255, 0.3);
  --line-l9: rgba(255, 255, 255, 0.9);

  /* Shadow */
  --shadow-xs: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  --shadow-s: 0 6px 20px 0 rgba(0, 0, 0, 0.24);
  --shadow-l: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
}
`,p='<link rel="stylesheet" href="./styles/tokens.css" />',l='<link rel="stylesheet" href="./components/playbook-header.css" />',c='<script src="./components/playbook-header.js" defer><\/script>',d='<link rel="stylesheet" href="./components/discussion-panel.css" />',g='<script src="./components/discussion-panel.js" defer><\/script>';function e(n){return n.replace(/<\/script>/gi,"<\\/script>")}function t(n){return n.replace(/\/alva-infant\//g,"/")}function v(n){return n.replace(p,`<style>${s}</style>`).replace(l,`<style>${a}</style>`).replace(c,`<script>${e(t(r))}<\/script>`).replace(d,`<style>${o}</style>`).replace(g,`<script>${e(t(i))}<\/script>`)}export{v as i};
