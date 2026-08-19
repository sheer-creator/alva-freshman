/* ========== actions.js — 全局交互（data-act 派发） ========== */
import { ENTITIES, ITEMS, SOURCES, FEEDS, RECS, TG_CHATS, BROKERS, ONBOARD_ENTITIES, entityChipLabel, evidenceCounts } from './data.js';
import { store, save, toggleIn, toast, openSheet, closeSheet, nav, back, I, resetDemo } from './state.js';
import { cardBack, entityAv, monoAv } from './cards.js';
import { askCtx, setAskCtx, setPendingAsk, setDiscTab, setAskTab, setMktTab, mktListHtml, setFeedTab, obPickEntity } from './screens.js';

const item = (el) => ITEMS.find((it) => it.id === el.dataset.item);
const rerender = () => window.__rerender && window.__rerender();

/* 当前页弹起对话 composer：卡片作为引用元素，发送后才进入 Ask */
function openComposer(it, prefill) {
  const first = it.entity_refs[0];
  openSheet(`
    <div class="quote-card">
      <div class="qc-head">${first ? entityAv(first, 20) : ''}<span>${FEEDS[it.feed].name} · ${it.published}</span></div>
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

function contextRows(ids) {
  return ids.map((id) => ITEMS.find((it) => it.id === id)).filter(Boolean).map((it) => `
    <div class="list-row" data-act="open-detail" data-item="${it.id}" role="button">
      ${it.entity_refs[0] ? entityAv(it.entity_refs[0], 40) : ''}
      <span class="meta"><span class="nm">${it.headline}</span><div class="ds">${FEEDS[it.feed].name} · ${it.published}</div></span>
      ${I.chevR}
    </div>`).join('');
}

function activitySheet(title, ids, empty) {
  openSheet(`<h3>${title}</h3><p class="sub">${ids.length ? `${ids.length} context${ids.length > 1 ? 's' : ''}` : empty}</p>
    <div class="activity-list">${contextRows(ids)}</div>`);
}

function askAnswer(it, q) {
  const goalNudge = store.goal ? '' : `
    <div class="ask-next">
      <span>This reads like a standing objective. Make it a goal — Alva will watch it and bring proposals for your approval.</span>
      <button class="btn btn-ghost" data-act="goal-sheet" data-prefill="${(q || '').replace(/"/g, '&quot;')}">${I.bolt}Set as goal</button>
    </div>`;
  /* Trade 交接：AI 出交易方案，执行永远走 Approval（无自主执行权） */
  if (/^Trade\b/.test(q || '')) {
    const tick = (q.match(/^Trade ([A-Z]{2,6})\b/) || [])[1];
    const label = tick || 'the basket';
    return `On it. Here's my plan for <b>${label}</b> — nothing executes without you:
      <ul>
        <li><b>Entry</b> — scale in on weakness toward the 20-day, two fills, no chasing.</li>
        <li><b>Size</b> — 1.2% of portfolio${tick ? '' : ', split evenly across the three'}.</li>
        <li><b>Invalidation</b> — a close below last week's low ends the trade, no averaging down.</li>
      </ul>
      I'll route the first order to you as an <b>Approval</b> — it shows up in “While you were away” for a one-tap confirm.${goalNudge}`;
  }
  if (!it) return `Short answer: <b>the evidence leans yes</b>.<br><br>
    The strongest signals are moving in the same direction, while the main counter-signal is still unconfirmed.${goalNudge}`;
  const facts = (it.facts || []).slice(0, 2).map((fact) => `<li>${fact.text}</li>`).join('');
  const tracked = store.tracks.includes(it.id);
  return `<b>${it.summary}</b>${facts ? `<ul>${facts}</ul>` : ''}
    <div class="ask-next">
      <span>${tracked ? 'Alva is already watching for a meaningful change.' : 'Want Alva to flag the next confirmation or reversal?'}</span>
      <button class="btn btn-ghost" data-act="${tracked ? 'open-automation' : 'track-item'}" data-${tracked ? 'id' : 'item'}="${tracked ? it.feed : it.id}" data-track-cta="${it.id}">
        ${tracked ? I.gear + 'Manage automation' : I.bell + 'Track this context'}
      </button>
    </div>${goalNudge}`;
}

function clearFeedActivity(feedId) {
  store.tracks = store.tracks.filter((id) => ITEMS.find((it) => it.id === id)?.feed !== feedId);
  store.paused = store.paused.filter((id) => id !== feedId);
  if (store.lastFollowedFeed === feedId) store.lastFollowedFeed = null;
}

export const ACTIONS = {
  /* ---- 基础导航 ---- */
  back: () => back(),
  nav: (el) => nav(el.dataset.to),
  'sheet-close': () => closeSheet(),
  'toast-msg': (el) => toast(el.dataset.msg, I.check),
  'reset-demo': () => { if (confirm('Reset the demo and restart onboarding?')) resetDemo(); },

  /* ---- onboarding ---- */
  'ob-start': () => nav('#/onboard/entities'),
  'ob-start-sources': () => nav('#/onboard/sources'),
  'ob-ent': (el) => {
    const on = toggleIn(store.entities, el.dataset.id);
    el.classList.toggle('on', on);
    const n = store.entities.length;
    const count = document.getElementById('entCount');
    if (count) count.textContent = n ? `${n} selected` : 'Pick 3–8 to start';
    const next = document.getElementById('entNext');
    if (next) { next.disabled = n < 1; next.style.opacity = n < 1 ? '.4' : '1'; }
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
  'ob-watch': (el) => {
    toggleIn(store.watches, el.dataset.w);
    el.classList.toggle('on', store.watches.includes(el.dataset.w));
  },
  'ob-to-portfolio': () => {
    const selectedMarkets = store.entities.filter((id) => ENTITIES[id]?.kind === 'market');
    store.manualHoldings = [...new Set([...selectedMarkets, ...store.manualHoldings])];
    save();
    nav('#/onboard/portfolio');
  },
  'ob-select-all': () => {
    const ids = ONBOARD_ENTITIES.map((o) => o.id);
    const allOn = ids.every((id) => store.entities.includes(id));
    store.entities = allOn ? store.entities.filter((id) => !ids.includes(id)) : [...new Set([...store.entities, ...ids])];
    save();
    rerender();
  },
  'ob-finish': () => {
    store.onboarded = true;
    for (const f of ['nvda_events', 'ai_watch', 'earnings']) if (!store.feeds.includes(f)) store.feeds.push(f);
    store.lastFollowedFeed = null;
    save();
    nav('#/home');
    setTimeout(() => toast('Tip: cards flip — try “Behind this”', I.flip), 1800);
  },

  /* ---- connect flows ---- */
  'add-source': (el) => {
    const on = toggleIn(store.sources, el.dataset.id);
    if (!on) { delete store.sourceFeeds[el.dataset.id]; save(); }
    if (el.classList.contains('src-add')) { el.classList.toggle('on', on); el.textContent = on ? 'Added' : 'Add'; }
    else rerender();
    toast(on ? `${SOURCES[el.dataset.id].name} added to your feed` : `${SOURCES[el.dataset.id].name} removed`);
  },
  /* Source 详情页的 Add to my feed：底部浮层选择加入哪个 automation。
   * Feed 列表 = 用户的 Automation 列表；已添加时点按即移除。 */
  'add-source-sheet': (el) => {
    const id = el.dataset.id;
    if (store.sources.includes(id)) {
      toggleIn(store.sources, id);
      delete store.sourceFeeds[id];
      save();
      rerender();
      return;
    }
    const s = SOURCES[id];
    const feeds = store.feeds.map((fid) => FEEDS[fid]).filter(Boolean);
    openSheet(`
      <h3>Add to my feed</h3>
      <p class="sub">Pick the automation that should read ${s.name}. Its cards will cite it in your For You.</p>
      <div class="freq-list" id="feedPickList">
        ${feeds.map((f, i) => `<button class="freq-row ${i === 0 ? 'on' : ''}" data-act="freq-pick" data-id="${f.id}">
          ${monoAv(f.owner === 'Alva' ? 'AL' : f.owner.slice(0, 2).toUpperCase(), 174, 38)}
          <span class="meta"><span class="nm">${f.name}</span><div class="ds">${f.sources.length} source${f.sources.length > 1 ? 's' : ''} · ${f.cadence}</div></span>
          <span class="radio"></span>
        </button>`).join('')}
        <button class="freq-row ${feeds.length ? '' : 'on'}" data-act="freq-pick" data-id="__personal">
          <span class="ic-cir">${I.plus}</span>
          <span class="meta"><span class="nm">My personal feed</span><div class="ds">A new automation for the sources you bring</div></span>
          <span class="radio"></span>
        </button>
      </div>
      <div class="sheet-cta"><button class="btn btn-teal-solid" style="flex:1" data-act="add-source-confirm" data-id="${id}">${I.plus}Add source</button></div>`);
  },
  'add-source-confirm': (el) => {
    const id = el.dataset.id;
    const picked = document.querySelector('#feedPickList .freq-row.on');
    if (!store.sources.includes(id)) store.sources.push(id);
    store.sourceFeeds[id] = picked ? picked.dataset.id : '__personal';
    save();
    closeSheet();
    rerender();
  },
  'custom-source': (el) => {
    el.classList.remove('dim'); el.classList.add('on'); el.textContent = 'Requested';
    toast('Added as a Custom Source — 2 of 5 slots used');
  },
  'byos-sheet': () => openSheet(`
    <h3>Import RSS or paste a URL</h3>
    <p class="sub">Paste a feed URL or handle. Alva indexes it for you — it counts toward your 5 custom slots.</p>
    <div class="watch-add" style="margin-top:16px">
      <input class="watch-custom" id="byosInput" placeholder="e.g. stratechery.com/feed or @jim"
        onkeydown="if(event.key==='Enter'){event.preventDefault();this.nextElementSibling.click()}">
      <button class="btn btn-teal-solid watch-add-btn" data-act="byos-add">Add</button>
    </div>
    <p class="ent-none" style="margin-top:12px">RSS/OPML, newsletters, X accounts, YouTube channels and podcasts are supported.</p>`),
  'byos-add': () => {
    const input = document.getElementById('byosInput');
    const v = input && input.value.trim();
    if (!v) { toast('Paste a URL or handle first', I.x); return; }
    closeSheet();
    toast(`${v} added as a Custom Source — 2 of 5 slots used`);
  },
  /* ---- goal / approval（Report 态） ---- */
  'ob-hold': (el) => { toggleIn(store.manualHoldings, el.dataset.id); rerender(); },
  'goal-revoke': () => {
    store.goal = '';
    save();
    toast('Goal revoked — back to recap');
    if (location.hash.includes('/goal')) back(); else rerender();
  },

  'ask-tab': (el) => { setAskTab(el.dataset.t); rerender(); },
  'you-automations': () => { setAskTab('tasks'); nav('#/ask'); },
  'following-sheet': () => {
    const chips = store.entities.map((id) => `<button class="chip on" data-act="open-entity" data-id="${id}">${entityChipLabel(id)}</button>`).join('');
    openSheet(`<h3>Following</h3><p class="sub">${store.entities.length} markets, themes and people shaping your For You.</p>
      <div class="rel-row" style="margin-top:14px">${chips || '<span class="ent-none">Nothing yet — pick some in Discover.</span>'}</div>`);
  },

  /* ---- Ask 补课清单 ---- */
  'setup-dismiss': () => { store.askSetupDismissed = true; save(); rerender(); },
  /* 自定义源统一入口：Chat 补课清单与 Discover Sources tab 底部走同一个 sheet */
  'setup-sources': () => {
    const done = (k) => store.connected[k] ? `<span class="sm-done">${I.check}Connected</span>` : I.chevR;
    openSheet(`
    <h3>Add a custom source</h3>
    <p class="sub">Connect an account to import what you already follow, or add a single source directly.</p>
    <div style="margin-top:14px">
      <div class="sm-row" data-act="nav" data-to="#/onboard/x" role="button">
        <span class="meta"><span class="nm">Connect X</span><div class="ds">Import who you follow</div></span>${done('x')}
      </div>
      <div class="sm-row" data-act="nav" data-to="#/onboard/telegram" role="button">
        <span class="meta"><span class="nm">Connect Telegram</span><div class="ds">Choose channels — private stays private</div></span>${done('telegram')}
      </div>
      <div class="sm-row" data-act="conn-lite" data-k="email" role="button">
        <span class="meta"><span class="nm">Connect email</span><div class="ds">Read the newsletters already in your inbox</div></span>${done('email')}
      </div>
      <div class="sm-row" data-act="conn-lite" data-k="substack" role="button">
        <span class="meta"><span class="nm">Connect Substack</span><div class="ds">Import your subscriptions</div></span>${done('substack')}
      </div>
      <div class="sm-row" data-act="byos-sheet" role="button">
        <span class="meta"><span class="nm">Import RSS or paste a URL</span><div class="ds">Any feed, handle or newsletter link</div></span>${I.chevR}
      </div>
    </div>`);
  },
  /* 轻量连接（demo）：email / substack 无独立授权页，点击即标记已连接，原地换状态 */
  'conn-lite': (el) => {
    store.connected[el.dataset.k] = true;
    save();
    if (el.lastElementChild) el.lastElementChild.outerHTML = `<span class="sm-done">${I.check}Connected</span>`;
  },
  'goal-sheet': (el) => openSheet(`
    <h3>${store.goal ? 'Edit your trading goal' : 'Set a trading goal'}</h3>
    <p class="sub">Plain instructions. First line is the goal, the rest are limits — Alva proposes, you approve.</p>
    <textarea class="composer-ta goal-ta" id="goalInput" rows="6">${(el && el.dataset && el.dataset.prefill) || store.goal || 'Add NVDA on pullbacks below $175\n\n- Size: up to +1.5% per add\n- Horizon: 3\u20136 months\n- Never execute without my approval'}</textarea>
    <div class="sheet-cta"><button class="btn btn-teal-solid" style="flex:1" data-act="goal-save">Save goal</button></div>`),
  'goal-save': () => {
    const input = document.getElementById('goalInput');
    const v = input && input.value.trim();
    if (!v) { toast('Write or pick a goal first', I.x); return; }
    store.goal = v;
    save();
    closeSheet();
    toast('Goal set — Alva starts working it', I.check);
    rerender();
  },

  'disc-search-clear': () => {
    const input = document.getElementById('discSearch');
    if (input) { input.value = ''; input.focus(); }
    window.__discSearch('');
  },
  'x-done': () => { store.connected.x = true; save(); back(); },
  'tg-toggle': (el) => {
    const i = Number(el.dataset.i);
    TG_CHATS.channels[i].selected = !TG_CHATS.channels[i].selected;
    el.querySelector('.check').classList.toggle('on', TG_CHATS.channels[i].selected);
  },
  'tg-done': () => {
    store.connected.telegram = TG_CHATS.channels.some((c) => c.selected);
    if (store.connected.telegram && !store.sources.includes('alpha_group')) store.sources.push('alpha_group');
    save();
    toast('Private feed created — only you can see it', I.shield);
    back();
  },

  /* ---- home（stage 场外切换：不在 For You 时先回到 For You） ---- */
  mode: (el) => {
    store.mode = el.dataset.m;
    save();
    if ((location.hash || '').replace(/^#\/?/, '').startsWith('home') || location.hash === '' || location.hash === '#/') rerender();
    else nav('#/home');
  },

  /* ---- card flip ---- */
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
  'flip-imm': (el) => {
    const it = item(el);
    openSheet(`<div style="padding-top:2px">${cardBack(it)}</div>`);
  },
  'evi-sheet': (el) => {
    const it = item(el);
    openSheet(`<div style="padding-top:2px">${cardBack(it)}</div>`);
  },

  /* ---- 打开对象 ---- */
  'open-detail': (el) => nav('#/context/' + el.dataset.item),
  'open-entity': (el) => { if (el.dataset.id) nav('#/entity/' + el.dataset.id); },
  'open-feed': (el) => { setFeedTab('output'); nav('#/feed/' + el.dataset.id); },
  /* ---- 推荐卡（新上线 Automation）：订阅原地变确认态，关闭原地淡出 ---- */
  'rec-subscribe': (el) => {
    const id = el.dataset.id;
    const f = FEEDS[id];
    if (!store.feeds.includes(id)) store.feeds.push(id);
    save();
    const card = el.closest('.rec-card');
    if (card) card.innerHTML = `
      <div class="rec-done">
        <span class="ic">${I.check}</span>
        <div class="tx"><b>Subscribed to ${f.name}</b>
        <p>Next run ${f.next_run.toLowerCase()} — output lands here in For You.</p></div>
        <button class="txt-act teal" data-act="open-feed" data-id="${id}">View</button>
      </div>`;
  },
  /* entity / basket 型推荐：Follow 后原地变确认态 */
  'rec-follow': (el) => {
    const id = el.dataset.id;
    if (!store.entities.includes(id)) store.entities.push(id);
    save();
    const card = el.closest('.rec-card');
    if (card) card.innerHTML = `
      <div class="rec-done">
        <span class="ic">${I.check}</span>
        <div class="tx"><b>Following ${entityChipLabel(id)}</b>
        <p>Its context now shapes your For You.</p></div>
        <button class="txt-act teal" data-act="open-entity" data-id="${id}">View</button>
      </div>`;
  },
  'rec-follow-basket': (el) => {
    const rec = RECS.find((r) => r.id === el.dataset.recId);
    if (!rec) return;
    rec.basket.forEach((id) => { if (!store.entities.includes(id)) store.entities.push(id); });
    save();
    const card = el.closest('.rec-card');
    if (card) card.innerHTML = `
      <div class="rec-done">
        <span class="ic">${I.check}</span>
        <div class="tx"><b>Following ${rec.basket.map((id) => entityChipLabel(id)).join(' · ')}</b>
        <p>The whole basket now shapes your For You.</p></div>
      </div>`;
  },
  /* ---- Trade = 派活给 AI：带着交易指令交接进 Chat，Alva 出方案、订单走审批 ---- */
  'trade-chat': (el) => {
    const basket = el.dataset.basket ? RECS.find((r) => r.id === el.dataset.basket) : null;
    const q = basket
      ? `Trade ${basket.title} as one basket (${basket.basket.map((id) => ENTITIES[id].ticker).join(' · ')}) — propose sizing across the three and route every order for my approval.`
      : `Trade ${ENTITIES[el.dataset.id].ticker} — propose entry, size and invalidation, and route the order for my approval.`;
    setAskCtx(null);
    setPendingAsk(q);
    setAskTab('chat');
    nav('#/ask');
  },
  'rec-dismiss': (el) => {
    store.dismissedRecs.push(el.dataset.id);
    save();
    const card = el.closest('.rec-card');
    if (card) {
      card.style.cssText = 'transition:opacity 0.25s ease, transform 0.25s ease; opacity:0; transform:scale(0.97)';
      setTimeout(() => card.remove(), 260);
    }
  },
  'feed-tab': (el) => { setFeedTab(el.dataset.t); rerender(); },
  /* Market tab 的 ticker 栏位切换：原地换列表，不整页重绘 */
  'mkt-tab': (el) => {
    setMktTab(el.dataset.t);
    const list = document.getElementById('mktList');
    if (list) list.innerHTML = mktListHtml(el.dataset.t);
    document.querySelectorAll('#mktTabs button').forEach((b) => b.classList.toggle('on', b === el));
  },
  'open-source': (el) => nav('#/source/' + el.dataset.id),
  'open-creator': (el) => nav('#/creator/' + el.dataset.id),
  'you-feeds': () => nav('#/discover'),

  /* ---- actions ---- */
  'ask-item': (el) => openComposer(item(el), ''),
  'cta-prompt': (el) => { const it = item(el); openComposer(it, it.cta.value); },
  'composer-send': (el) => {
    const it = item(el);
    const ta = document.getElementById('composerTa');
    const q = (ta && ta.value.trim()) || (it.cta && it.cta.value) || `What should I make of “${it.headline}”?`;
    setAskCtx(it.id);
    setPendingAsk(q);
    closeSheet();
    nav('#/ask');
  },
  'cta-url': (el) => {
    const it = item(el);
    toast(`Opens ${it.cta.value} — original source`, I.link);
  },
  'disc-tab': (el) => { setDiscTab(el.dataset.t); rerender(); },
  'ask-entity': () => { setAskCtx(null); nav('#/ask'); },
  'clear-ctx': () => { setAskCtx(null); rerender(); },
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
        answer.innerHTML = askAnswer(ctxItem, q);
        answer.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }, 1400);
  },
  'tracks-sheet': () => activitySheet('Tracks & automations', store.tracks, 'Track a context and it will appear here.'),
  'play-clip': () => toast('Opens the episode at 41:22 on the source platform', I.play),

  /* ---- track sheet ---- */
  'track-item': (el) => {
    const it = item(el);
    if (store.tracks.includes(it.id)) {
      toggleIn(store.tracks, it.id);
      toast('Track removed');
      rerender();
      return;
    }
    openSheet(`
      <h3>Track this context</h3>
      <p class="sub">Alva watches the sources behind “${it.headline}” and notifies you when something meaningful changes.</p>
      <div class="freq-list" id="freqList">
        ${[['important', 'Important only', 'Material changes and reversals'], ['daily', 'Daily digest', 'One summary each morning'], ['all', 'All updates', 'Every new confirmation or challenge']]
          .map(([id, nm, ds], i) => `<button class="freq-row ${i === 0 ? 'on' : ''}" data-act="freq-pick" data-id="${id}"><span class="meta"><span class="nm">${nm}</span><div class="ds">${ds}</div></span><span class="radio"></span></button>`).join('')}
      </div>
      <div class="sheet-cta"><button class="btn btn-teal-solid" data-act="track-confirm" data-item="${it.id}">${I.bell}Start tracking</button></div>`);
  },
  'freq-pick': (el) => {
    el.closest('.freq-list').querySelectorAll('.freq-row').forEach((r) => r.classList.toggle('on', r === el));
  },
  'track-confirm': (el) => {
    const id = el.dataset.item;
    if (!store.tracks.includes(id)) store.tracks.push(id);
    save();
    closeSheet();
    toast('Tracking — updates land in For You and push', I.bell);
    const inline = document.querySelector(`[data-track-cta="${id}"]`);
    const trackedItem = ITEMS.find((it) => it.id === id);
    if (inline && trackedItem) {
      inline.outerHTML = `<button class="btn btn-ghost" data-act="open-automation" data-id="${trackedItem.feed}" data-track-cta="${id}">${I.gear}Manage automation</button>`;
    } else rerender();
  },

  /* ---- premium unlock ---- */
  unlock: (el) => {
    const f = FEEDS[el.dataset.feed];
    openSheet(`
      <div class="prem-head">
        <img class="av-img" src="img/av-bruce.jpeg" width="46" height="46" alt="">
        <div><h3>${f.name}</h3><p class="sub">${f.owner} · ${f.cadence} · ${f.access}</p></div>
      </div>
      <div class="prem-benefits">
        <div class="b">${I.check}<span>Full essays and live thesis tracking in your For You</span></div>
        <div class="b">${I.check}<span>Creator-approved summaries — never paywall leaks</span></div>
        <div class="b">${I.check}<span>Ask Alva against the full archive</span></div>
      </div>
      <div class="sheet-cta">
        <button class="btn btn-teal-solid" data-act="unlock-confirm" data-feed="${f.id}">Subscribe · $39/mo</button>
      </div>
      <p class="sub" style="text-align:center;margin-top:12px">Demo checkout — nothing is charged. Revenue is shared with ${f.owner}.</p>`);
  },
  'unlock-confirm': (el) => {
    store.unlocked[el.dataset.feed] = true;
    save();
    closeSheet();
    toast('Unlocked — full content is now in your feed');
    rerender();
  },

  /* ---- automation 管理（卡背 Manage 入口 → 暂停/退订） ---- */
  'open-automation': (el) => nav('#/automation/' + el.dataset.id),
  'auto-pause': (el) => {
    const paused = toggleIn(store.paused, el.dataset.id);
    toast(paused ? 'Automation paused' : 'Automation resumed', paused ? I.pause : I.play);
    rerender();
  },
  'auto-unsub': (el) => {
    const f = FEEDS[el.dataset.id];
    openSheet(`
      <h3>Unsubscribe from ${f.name}?</h3>
      <p class="sub">Its cards leave your For You. Your history stays, and you can re-subscribe from Discover anytime.</p>
      <div class="sheet-cta" style="display:flex;gap:8px">
        <button class="btn btn-dim" style="flex:1" data-act="sheet-close">Keep it</button>
        <button class="btn btn-danger" style="flex:1" data-act="auto-unsub-confirm" data-id="${f.id}">Unsubscribe</button>
      </div>`);
  },
  'auto-unsub-confirm': (el) => {
    const id = el.dataset.id;
    const i = store.feeds.indexOf(id);
    if (i >= 0) store.feeds.splice(i, 1);
    clearFeedActivity(id);
    save();
    closeSheet();
    toast(`Unsubscribed from ${FEEDS[id].name}`, I.x);
    rerender();
  },

  /* ---- tune / source management ---- */
  'manage-sheet': () => {
    const ids = [...new Set([...store.sources, 'nvda_ir', 'mkt_data', 'x_analysts'])];
    openSheet(`
      <h3>Your sources</h3>
      <p class="sub">Everything feeding your For You. Mute lowers priority; remove takes it out.</p>
      <div style="margin-top:14px">${ids.map((id) => {
        const s = SOURCES[id];
        const muted = store.muted.includes(id);
        return `<div class="sm-row">
          <span class="meta"><span class="nm">${s.name}</span><div class="ds">${s.platform} · ${s.access}</div></span>
          <span class="sm-act">
            <button class="${muted ? 'muted' : ''}" data-act="mute-toggle" data-id="${id}">${muted ? 'Muted' : 'Mute'}</button>
            ${store.sources.includes(id) ? `<button data-act="remove-source" data-id="${id}">Remove</button>` : ''}
          </span>
        </div>`;
      }).join('')}</div>
      <div class="sheet-cta"><button class="btn btn-dim" style="width:100%" data-act="sheet-close">Done</button></div>`);
  },
  'mute-toggle': (el) => {
    const on = toggleIn(store.muted, el.dataset.id);
    el.classList.toggle('muted', on);
    el.textContent = on ? 'Muted' : 'Mute';
  },
  'remove-source': (el) => {
    toggleIn(store.sources, el.dataset.id);
    delete store.sourceFeeds[el.dataset.id];
    save();
    el.closest('.sm-row').style.opacity = '0.35';
    el.disabled = true;
    toast(`${SOURCES[el.dataset.id].name} removed`);
  },
  'feed-src-sheet': (el) => {
    const f = FEEDS[el.dataset.id];
    openSheet(`
      <h3>Sources in this feed</h3>
      <p class="sub">${f.owner === 'Alva' ? 'Official feed — you can view its composition, follow or mute, but not edit it.' : 'This creator manages the composition.'}</p>
      <div style="margin-top:14px">${f.sources.map((id) => {
        const s = SOURCES[id];
        return `<div class="sm-row" data-act="open-source" data-id="${id}" role="button">
          <span class="meta"><span class="nm">${s.name}</span><div class="ds">${s.platform} · ${s.modality} · ${s.access}</div></span>
          ${I.chevR}
        </div>`;
      }).join('')}</div>`);
  },
  'manage-feed-src': (el) => ACTIONS['manage-sheet'](el),

  /* ---- portfolio ---- */
  'connect-broker': () => {
    openSheet(`
      <h3>Connect a brokerage</h3>
      <p class="sub">Read-only access to positions. Alva never places trades without an explicit confirmation flow.</p>
      <div class="freq-list">${BROKERS.map((b) => `
        <button class="freq-row" data-act="broker-pick" data-id="${b.id}" data-name="${b.name}">
          <span class="mono-av" style="width:38px;height:38px;font-size:13px;background:hsl(${b.hue} 28% 16%);color:hsl(${b.hue} 65% 68%)">${b.name.slice(0, 2).toUpperCase()}</span>
          <span class="meta"><span class="nm">${b.name}</span><div class="ds">OAuth · read-only positions</div></span>
          <span class="radio"></span>
        </button>`).join('')}
      </div>
      <p class="sub" style="text-align:center;margin-top:14px">Demo connection — no real account is linked.</p>`);
  },
  'broker-pick': (el) => {
    store.brokerage = el.dataset.name;
    save();
    closeSheet();
    toast(`${el.dataset.name} connected — positions now shape your feed`, I.link);
    rerender();
  },

  /* ---- follows ---- */
  'follow-feed': (el) => {
    const on = toggleIn(store.feeds, el.dataset.id);
    if (on) {
      store.lastFollowedFeed = el.dataset.id;
      const paused = store.paused.indexOf(el.dataset.id);
      if (paused >= 0) store.paused.splice(paused, 1);
    } else clearFeedActivity(el.dataset.id);
    save();
    if (el.classList.contains('follow-sm')) { el.classList.toggle('on', on); el.textContent = on ? 'Following' : 'Follow'; }
    else rerender();
    toast(on ? `Following ${FEEDS[el.dataset.id].name}` : 'Unfollowed');
  },
  'follow-entity': (el) => {
    const on = toggleIn(store.entities, el.dataset.id);
    rerender();
    toast(on ? `Following ${el.dataset.id} — coverage added to For You` : 'Unfollowed');
  },
};
