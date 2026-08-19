/* ========== actions.js — 全局交互（data-act 派发） ========== */
import { ENTITIES, ITEMS, SOURCES, FEEDS, ONBOARD_ENTITIES, entityChipLabel } from './data.js';
import { store, save, toggleIn, toast, openSheet, closeSheet, nav, back, I, resetDemo } from './state.js';
import { cardBack, entityAv } from './cards.js';
import { askCtx, setAskCtx, setPendingAsk, setAskTab, setMktTab, mktListHtml, setFeedTab, feedBodyHtml, obPickEntity } from './screens.js';

const item = (el) => ITEMS.find((it) => it.id === el.dataset.item);
const rerender = () => window.__rerender && window.__rerender();

/* 当前页弹起对话 composer：卡片作为引用元素，发送后才进入 Chat */
function openComposer(it, prefill) {
  const head = it.kind === 'alpha'
    ? `${SOURCES[it.source].name} · ${it.published}`
    : `${FEEDS[it.feed].name} · ${it.published}`;
  openSheet(`
    <div class="quote-card">
      <div class="qc-head">${it.kind === 'alpha' ? '' : entityAv(it.entity_refs[0], 20)}<span>${head}</span></div>
      <div class="qc-title">${it.headline}</div>
    </div>
    <textarea class="composer-ta" id="composerTa" rows="3" placeholder="Ask anything about this…">${prefill || ''}</textarea>
    <div class="sheet-cta" style="margin-top:12px">
      <button class="btn btn-ask" style="width:100%;flex:1" data-act="composer-send" data-item="${it.id}">${I.send}Ask Alva</button>
    </div>`);
  setTimeout(() => {
    const ta = document.getElementById('composerTa');
    if (ta) { ta.focus(); ta.selectionStart = ta.value.length; }
  }, 380);
}

/* canned 回答：按卡型给贴题的答案，末尾引用来源 */
function askAnswer(it) {
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
  'open-source': (el) => nav('#/source/' + el.dataset.id),

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

  /* ---- automation ---- */
  /* tab 原地切换（不整页重绘：#/automation/:id 路由会把 tab 重置回 settings） */
  'feed-tab': (el) => {
    setFeedTab(el.dataset.t);
    document.querySelectorAll('.feed-tabs button').forEach((b) => b.classList.toggle('on', b === el));
    const body = document.getElementById('feedBody');
    if (body) body.innerHTML = feedBodyHtml(el.dataset.id);
  },
  'auto-pause': (el) => {
    const paused = toggleIn(store.paused, el.dataset.id);
    const body = document.getElementById('feedBody');
    if (body) body.innerHTML = feedBodyHtml(el.dataset.id); else rerender();
    const dot = document.querySelector('.hero-head .st-dot');
    if (dot) dot.classList.toggle('off', paused);
  },
  'you-automations': () => { setAskTab('automations'); nav('#/ask'); },
  /* Settings sheet：Notifications 开关与 Log out 都收在这里 */
  'settings-sheet': () => openSheet(`
    <h3>Settings</h3>
    <div style="margin-top:10px">
      <div class="sm-row">
        <span class="meta"><span class="nm">Notifications</span><div class="ds">Impactful events only</div></span>
        <button class="switch ${store.notifications !== false ? 'on' : ''}" data-act="toggle-notif" aria-label="Toggle notifications"><i></i></button>
      </div>
      <div class="sm-row" data-act="toast-msg" data-msg="Appearance is fixed to dark in this demo" role="button">
        <span class="meta"><span class="nm">Appearance</span><div class="ds">Dark</div></span>${I.chevR}
      </div>
      <div class="sm-row" data-act="toast-msg" data-msg="Data controls are mocked in this demo" role="button">
        <span class="meta"><span class="nm">Data & privacy</span><div class="ds">Sources, memory and exports</div></span>${I.chevR}
      </div>
    </div>
    <button class="txt-act danger" style="display:block;margin:20px auto 6px" data-act="reset-demo">Log out</button>`),
  'toggle-notif': (el) => {
    store.notifications = store.notifications === false;
    save();
    el.classList.toggle('on', store.notifications !== false);
  },

  /* ---- ask ---- */
  'ask-tab': (el) => { setAskTab(el.dataset.t); rerender(); },
  'ask-entity': (el) => {
    setAskCtx(null);
    setPendingAsk(`What’s the state of play on ${ENTITIES[el.dataset.id].ticker}? Give me the two things that matter and what would change your mind.`);
    setAskTab('chat');
    nav('#/ask');
  },
  'clear-ctx': () => { setAskCtx(null); rerender(); },
  'ask-item': (el) => openComposer(item(el), ''),
  'composer-send': (el) => {
    const it = item(el);
    const ta = document.getElementById('composerTa');
    const q = (ta && ta.value.trim()) || `What should I make of “${it.headline}”?`;
    setAskCtx(it.id);
    setPendingAsk(q);
    setAskTab('chat');
    closeSheet();
    nav('#/ask');
  },
  'ask-send': (el) => {
    const input = document.getElementById('askInput');
    const q = el.dataset.q || (input && input.value.trim());
    if (!q) return;
    if (input) input.value = '';
    const reply = document.getElementById('askReply');
    if (!reply) return;
    const ctxItem = askCtx ? ITEMS.find((it) => it.id === askCtx) : null;
    reply.insertAdjacentHTML('beforeend', `<div class="bub user">${q}</div>
      <div class="bub"><span class="typing"><i></i><i></i><i></i></span></div>`);
    const answer = reply.lastElementChild;
    answer.scrollIntoView({ block: 'end', behavior: 'smooth' });
    setTimeout(() => {
      if (answer && answer.isConnected) {
        answer.innerHTML = askAnswer(ctxItem);
        answer.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }, 1400);
  },
};
