/* ========== actions.js — 全局交互（data-act 派发） ========== */
import { ENTITIES, ITEMS, SOURCES, FEEDS, ONBOARD_ENTITIES, entityChipLabel } from './data.js?v=local-mt10cd';
import { store, save, applyTheme, toggleIn, toast, openSheet, closeSheet, nav, back, I, resetDemo } from './state.js?v=local-mt10cd';
import { cardBack, composerContextMenu, entityReference, srcAvatar } from './cards.js?v=local-mt10cd';
import { getAskContext, setAskCtx, setPendingAsk, setAskTab, setMktTab, mktListHtml, setFeedTab, feedBodyHtml, obPickEntity } from './screens.js?v=local-mt10cd';
import { setCompanyTab, setCompanyChartRange, setCompanySmartTab, setCompanyEarningsStage } from './company.js?v=local-mt10cd';

const item = (el) => ITEMS.find((it) => it.id === el.dataset.item);
const rerender = () => window.__rerender && window.__rerender();
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

/* 当前页弹起对话 composer：卡片作为引用元素，发送后才进入 Chat */
function openComposer(it, prefill) {
  const head = it.kind === 'alpha'
    ? `${SOURCES[it.source].name} · ${it.published}`
    : `${FEEDS[it.feed].name} · ${it.published}`;
  openSheet(`
    <div class="composer-sheet-head"><h3>Ask Alva</h3><p>${head}</p></div>
    <div class="alva-composer sheet-composer">
      <div class="composer-attachments">
        <div class="composer-quote" data-composer-quote="${it.id}">
          <i aria-hidden="true"></i><span>${it.headline}</span>
          <button data-act="remove-composer-quote" aria-label="Remove quoted card">${I.x}</button>
        </div>
      </div>
      <div class="composer-input-row">
        <div class="composer-add-wrap">
          <button class="composer-tool" data-act="composer-toggle-add" aria-label="Add context" aria-expanded="false">${I.plus}</button>
          ${composerContextMenu()}
        </div>
        <textarea class="composer-ta" id="composerTa" rows="1" placeholder="Ask anything about this…">${prefill || ''}</textarea>
        <span class="composer-model">GPT-5.5</span>
        <button class="composer-send" data-act="composer-send" data-item="${it.id}" aria-label="Send message">${I.send}</button>
      </div>
    </div>
  `);
  setTimeout(() => {
    const ta = document.getElementById('composerTa');
    if (ta) { ta.focus(); ta.selectionStart = ta.value.length; }
  }, 380);
}

/* canned 回答：按卡型给贴题的答案，末尾引用来源 */
function askAnswer(it, entityId) {
  if (!it && entityId) {
    const entity = ENTITIES[entityId];
    return `<b>${entity.name} is trading at ${entity.price}</b>, ${entity.delta} today.<br><br>
      Two things matter now: whether the latest move is backed by a durable change in expectations, and whether the next operating datapoint confirms it. I’d change my mind if price keeps moving while primary-source evidence weakens.`;
  }
  if (!it) return `Short answer: <b>the evidence leans yes</b>.<br><br>
    The strongest signals in your feeds point the same direction, and the main counter-signal is still unconfirmed. Open any card and ask from there — I’ll answer against its sources.`;
  if (it.kind === 'alpha') {
    const s = SOURCES[it.source];
    return `The claim from <b>${s.name}</b> holds up on a first pass:<br><br>
      <b>${it.headline}.</b><br><br>${it.insight}<br><br>
      The obvious counter is that spoken conviction isn’t a model — I’d watch the next datapoint that could falsify it before sizing anything. <i>Source: ${s.name} · ${it.ep} · ${it.at}</i>`;
  }
  if (it.kind === 'anomaly') {
    const rows = it.attribution.slice(0, 2).map((a) => `<li>${a.text} <i>· ${SOURCES[a.source].name}</i></li>`).join('');
    return `Here’s the read on <b>${entityChipLabel(it.entity_refs[0])}</b>:<ul>${rows}</ul>
      The move looks driven by the first item — the rest is confirmation, not cause. If the headline gets walked back, expect half the move to retrace.`;
  }
  const facts = it.facts.slice(0, 2).map((f) => `<li>${f.text} <i>· ${SOURCES[f.sources[0]].name}</i></li>`).join('');
  return `<b>${it.summary}</b><ul>${facts}</ul>${it.why}`;
}

export const ACTIONS = {
  /* ---- 基础导航 ---- */
  back: () => back(),
  nav: (el) => nav(el.dataset.to),
  'sheet-close': () => closeSheet(),
  'toast-msg': (el) => toast(el.dataset.msg, I.check),
  'reset-demo': () => { if (confirm('Reset the demo and restart onboarding?')) resetDemo(); },
  'toggle-feed-compact': () => {
    store.feedCompact = !store.feedCompact;
    save();
    rerender();
  },

  /* ---- onboarding ---- */
  'ob-start': () => nav('#/onboard'),
  'ob-ent': (el) => {
    const on = toggleIn(store.entities, el.dataset.id);
    el.classList.toggle('on', on);
    const n = store.entities.length;
    const count = document.getElementById('entCount');
    if (count) count.textContent = n ? `${n} selected` : 'Pick 3–8 to start';
  },
  'ob-ent-dd': (el) => {
    toggleIn(store.entities, el.dataset.id);
    obPickEntity(el.dataset.id);
  },
  'ob-search-clear': () => {
    const input = document.getElementById('entSearch');
    if (input) { input.value = ''; input.focus(); }
    window.__entSearch('');
  },
  'ob-select-all': () => {
    const ids = ONBOARD_ENTITIES.map((o) => o.id);
    const allOn = ids.every((id) => store.entities.includes(id));
    store.entities = allOn ? store.entities.filter((id) => !ids.includes(id)) : [...new Set([...store.entities, ...ids])];
    save();
    rerender();
  },
  /* 选了标的 → 收尾动效页；一个没选（等于 skip）→ 直接进 feed */
  'ob-continue': () => {
    if (store.entities.length) nav('#/onboard/ready');
    else ACTIONS['ob-finish']();
  },
  'ob-finish': () => {
    store.onboarded = true;
    save();
    nav('#/home');
  },

  /* ---- 打开对象 ---- */
  'open-detail': (el) => nav('#/context/' + el.dataset.item),
  'open-entity': (el) => { if (el.dataset.id) nav('#/entity/' + el.dataset.id); },
  'open-feed': (el) => { setFeedTab('output'); nav('#/feed/' + el.dataset.id); },
  'open-automation': (el) => nav('#/automation/' + el.dataset.id),
  'open-source': (el) => {
    if (el.closest('.sheet')) closeSheet();
    nav('#/source/' + el.dataset.id);
  },

  /* ---- Market / company detail ---- */
  'entity-tab': (el) => { setCompanyTab(el.dataset.tab); rerender(); },
  'entity-chart-range': (el) => { setCompanyChartRange(el.dataset.range); rerender(); },
  'entity-smart-tab': (el) => { setCompanySmartTab(el.dataset.tab); rerender(); },
  'entity-earnings-stage': (el) => { setCompanyEarningsStage(el.dataset.stage); rerender(); },

  /* ---- card flip（卡背 = 溯源 + why） ---- */
  flip: (el) => {
    const scene = el.closest('.flip-scene');
    const inner = scene.querySelector('.flip-inner');
    const front = scene.querySelector('.flip-face');
    scene.style.height = front.offsetHeight + 'px';
    inner.style.height = front.offsetHeight + 'px';
    scene.classList.add('flipped');
  },
  unflip: (el) => {
    if (el.closest('.sheet')) return closeSheet();
    el.closest('.flip-scene').classList.remove('flipped');
  },
  'evi-sheet': (el) => {
    openSheet(`<div style="padding-top:2px">${cardBack(item(el))}</div>`);
  },
  'play-clip': (el) => {
    const it = item(el);
    const hero = el.closest('.audio-hero');
    if (hero) {
      const playing = hero.classList.toggle('playing');
      const icon = hero.querySelector('.audio-play');
      if (icon) icon.innerHTML = playing ? I.pause : I.play;
      return;
    }
    toast(`Opens the episode at ${it ? it.at : ''} on the source platform`, I.play);
  },

  /* ---- discover / follow ---- */
  'disc-search-clear': () => {
    const input = document.getElementById('discSearch');
    if (input) { input.value = ''; input.focus(); }
    window.__discSearch('');
  },
  'mkt-tab': (el) => {
    setMktTab(el.dataset.t);
    const list = document.getElementById('mktList');
    if (list) list.innerHTML = mktListHtml(el.dataset.t);
    document.querySelectorAll('#mktTabs button').forEach((b) => b.classList.toggle('on', b === el));
  },
  'follow-entity': (el) => {
    toggleIn(store.entities, el.dataset.id);
    rerender();
  },
  /* 列表行内的 Follow 小按钮：原地换状态，不整页重绘 */
  'follow-entity-sm': (el) => {
    const on = toggleIn(store.entities, el.dataset.id);
    el.classList.toggle('on', on);
    el.textContent = on ? 'Following' : 'Follow';
  },
  /* 标的行的 Follow 小圆钮：点击关注 → 闪一下确认再淡出（已关注不展示按钮） */
  'strip-follow': (el) => {
    const id = el.dataset.id;
    if (!store.entities.includes(id)) { store.entities.push(id); save(); }
    document.querySelectorAll(`.strip-follow[data-id="${id}"]`).forEach((b) => {
      b.classList.add('done');
      b.innerHTML = I.check;
      setTimeout(() => { b.style.opacity = '0'; b.style.width = '0'; }, 420);
      setTimeout(() => b.remove(), 700);
    });
  },
  'following-sheet': () => {
    const chips = store.entities.map((id) => `<button class="chip on" data-act="open-entity" data-id="${id}">${entityChipLabel(id)}</button>`).join('');
    openSheet(`<h3>Following</h3><p class="sub">${store.entities.length} ticker${store.entities.length === 1 ? '' : 's'} shaping your For You.</p>
      <div class="rel-row" style="margin-top:14px">${chips || '<span class="ent-none">Nothing yet — pick some in Discover.</span>'}</div>`);
  },
  'automation-sources-sheet': (el) => {
    const feed = FEEDS[el.dataset.id];
    if (!feed) return;
    const rows = feed.sources.map((sourceId) => {
      const source = SOURCES[sourceId];
      return `<button class="auto-source-row" data-act="open-source" data-id="${sourceId}">
        ${srcAvatar(source, 32)}
        <span class="auto-source-copy"><b>${source.name}</b><i>${source.platform} · ${source.modality}${source.hosts ? ' · ' + source.hosts : ''}</i></span>
        ${I.chevR}
      </button>`;
    }).join('');
    openSheet(`<h3>Sources</h3><p class="sub">The people and sources Alva monitors for ${feed.name}.</p>
      <div class="auto-source-panel auto-source-sheet-panel">${rows}</div>
      <p class="auto-field-note auto-source-sheet-note">Official automation — this list is curated by Alva and can grow over time.</p>`);
  },

  /* ---- automation ---- */
  /* tab 原地切换（不整页重绘：#/automation/:id 路由会把 tab 重置回 settings） */
  'feed-tab': (el) => {
    setFeedTab(el.dataset.t);
    const page = el.closest('.page');
    page?.querySelectorAll('.feed-tabs button').forEach((b) => b.classList.toggle('on', b === el));
    const body = page?.querySelector('#feedBody');
    if (body) body.innerHTML = feedBodyHtml(el.dataset.id);
  },
  'auto-pause': (el) => {
    toggleIn(store.paused, el.dataset.id);
    rerender();
  },
  'auto-run-now': (el) => {
    store.manualRuns[el.dataset.id] = Date.now();
    save();
    toast('Automation started', I.play);
    rerender();
  },
  'auto-alerts': (el) => {
    store.automationAlerts[el.dataset.id] = store.automationAlerts[el.dataset.id] === false;
    save();
    const body = el.closest('.page')?.querySelector('#feedBody');
    if (body) body.innerHTML = feedBodyHtml(el.dataset.id);
  },
  'auto-email': (el) => {
    store.automationEmail[el.dataset.id] = store.automationEmail[el.dataset.id] !== true;
    save();
    el.classList.toggle('on', store.automationEmail[el.dataset.id]);
    el.setAttribute('aria-checked', String(store.automationEmail[el.dataset.id]));
  },
  'auto-reset-instructions': (el) => {
    delete store.automationInstructions[el.dataset.id];
    save();
    const body = el.closest('.page')?.querySelector('#feedBody');
    if (body) body.innerHTML = feedBodyHtml(el.dataset.id);
  },
  'you-automations': () => { setAskTab('automations'); nav('#/ask'); },
  /* Settings sheet：复用正式 Alva 的 400/500 字重、细分隔和显式主题选择。 */
  'settings-sheet': () => openSheet(`
    <div class="settings-head"><h3>Settings</h3><p>Choose how Alva looks and reaches you.</p></div>
    <div class="settings-group">
      <div class="sm-row">
        <span class="meta"><span class="nm">Notifications</span><div class="ds">Impactful events only</div></span>
        <button class="switch ${store.notifications !== false ? 'on' : ''}" data-act="toggle-notif" role="switch" aria-checked="${store.notifications !== false}" aria-label="Toggle notifications"><i class="switch-thumb"></i></button>
      </div>
      <div class="appearance-row">
        <span class="meta"><span class="nm">Appearance</span><div class="ds">Switches instantly and stays on this device</div></span>
        <div class="theme-options" role="radiogroup" aria-label="Appearance">
          <button class="theme-choice ${store.theme === 'light' ? 'on' : ''}" data-act="set-theme" data-theme="light" role="radio" aria-checked="${store.theme === 'light'}">
            <span class="theme-preview light" aria-hidden="true"><i></i><i></i></span><span>Light</span>${I.check}
          </button>
          <button class="theme-choice ${store.theme !== 'light' ? 'on' : ''}" data-act="set-theme" data-theme="dark" role="radio" aria-checked="${store.theme !== 'light'}">
            <span class="theme-preview dark" aria-hidden="true"><i></i><i></i></span><span>Dark</span>${I.check}
          </button>
        </div>
      </div>
      <div class="sm-row" data-act="toast-msg" data-msg="Data controls are mocked in this demo" role="button">
        <span class="meta"><span class="nm">Data & privacy</span><div class="ds">Sources, memory and exports</div></span>${I.chevR}
      </div>
    </div>
    <button class="txt-act danger settings-logout" data-act="reset-demo">Log out</button>`),
  'toggle-notif': (el) => {
    store.notifications = store.notifications === false;
    save();
    el.classList.toggle('on', store.notifications !== false);
    el.setAttribute('aria-checked', String(store.notifications !== false));
  },
  'set-theme': (el) => {
    const theme = applyTheme(el.dataset.theme);
    save();
    document.querySelectorAll('.theme-choice').forEach((choice) => {
      const selected = choice.dataset.theme === theme;
      choice.classList.toggle('on', selected);
      choice.setAttribute('aria-checked', String(selected));
    });
  },

  /* ---- ask ---- */
  'ask-tab': (el) => { setAskTab(el.dataset.t); rerender(); },
  'ask-entity': (el) => {
    setAskCtx({ itemId: null, entityIds: [el.dataset.id] });
    setPendingAsk(null);
    setAskTab('chat');
    nav('#/ask');
  },
  'clear-ctx': () => { setAskCtx(null); rerender(); },
  'ask-item': (el) => openComposer(item(el), ''),
  'composer-toggle-add': (el) => {
    const popover = el.parentElement.querySelector('.composer-add-popover');
    if (!popover) return;
    const opening = popover.hidden;
    document.querySelectorAll('.composer-add-popover').forEach((menu) => {
      menu.hidden = true;
      menu.parentElement.querySelector('[data-act="composer-toggle-add"]')?.setAttribute('aria-expanded', 'false');
    });
    popover.hidden = !opening;
    el.setAttribute('aria-expanded', String(opening));
  },
  'composer-menu-action': (el) => {
    const popover = el.closest('.composer-add-popover');
    if (popover) popover.hidden = true;
    const composer = el.closest('.alva-composer');
    composer?.querySelector('[data-act="composer-toggle-add"]')?.setAttribute('aria-expanded', 'false');
    composer?.querySelector('textarea')?.focus();
  },
  'remove-composer-entity': (el) => {
    const composer = el.closest('.alva-composer');
    const chip = el.closest('.entity-ref-chip');
    const removedId = chip?.dataset.entity;
    chip?.remove();
    if (composer?.classList.contains('ask-composer') && removedId) {
      const context = getAskContext();
      setAskCtx({ ...context, entityIds: context.entityIds.filter((id) => id !== removedId) });
    }
    const attachments = composer?.querySelector('.composer-attachments');
    if (attachments && !attachments.querySelector('.composer-quote, .entity-ref-chip')) attachments.hidden = true;
  },
  'remove-composer-quote': (el) => {
    const composer = el.closest('.alva-composer');
    el.closest('.composer-quote')?.remove();
    if (composer?.classList.contains('ask-composer')) {
      const context = getAskContext();
      setAskCtx({ ...context, itemId: null });
    }
    const attachments = composer?.querySelector('.composer-attachments');
    if (attachments && !attachments.querySelector('.composer-quote, .entity-ref-chip')) attachments.hidden = true;
  },
  'composer-send': (el) => {
    const it = item(el);
    const composer = el.closest('.alva-composer');
    const ta = composer?.querySelector('.composer-ta');
    const q = (ta && ta.value.trim()) || `What should I make of “${it.headline}”?`;
    const entityIds = [...composer.querySelectorAll('[data-entity]')].map((chip) => chip.dataset.entity);
    const itemId = composer?.querySelector('.composer-quote') ? it.id : null;
    setAskCtx({ itemId, entityIds });
    setPendingAsk(q);
    setAskTab('chat');
    closeSheet();
    nav('#/ask');
  },
  'ask-send': (el) => {
    const composer = el.closest('.alva-composer');
    const input = composer?.querySelector('#askInput') || document.getElementById('askInput');
    const q = el.dataset.q || (input && input.value.trim());
    if (!q) return;
    if (input) input.value = '';
    const reply = document.getElementById('askReply');
    if (!reply) return;
    const context = getAskContext();
    const entityIds = composer
      ? [...composer.querySelectorAll('[data-entity]')].map((chip) => chip.dataset.entity)
      : context.entityIds;
    const liveContext = { ...context, entityIds };
    setAskCtx(liveContext);
    const ctxItem = liveContext.itemId ? ITEMS.find((it) => it.id === liveContext.itemId) : null;
    const entityId = liveContext.entityIds[0];
    reply.insertAdjacentHTML('beforeend', `<div class="bub user">${entityId ? `<div class="message-ref">${entityReference(entityId, { removable: false })}</div>` : ''}${escapeHtml(q)}</div>
      <div class="bub"><span class="typing"><i></i><i></i><i></i></span></div>`);
    const answer = reply.lastElementChild;
    answer.scrollIntoView({ block: 'end', behavior: 'smooth' });
    setTimeout(() => {
      if (answer && answer.isConnected) {
        answer.innerHTML = askAnswer(ctxItem, entityId);
        answer.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }, 1400);
  },
};
