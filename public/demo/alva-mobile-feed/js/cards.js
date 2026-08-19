/* ========== cards.js — Context Card 渲染（一切从 Feed Item 数据生成） ==========
 * 原则：文本与图表为主。stream 卡不放 hero 大图（图归 Immersive），
 * 价值信息（what_changed / metric diff / evidence）放正面。
 */
import { ENTITIES, SOURCES, PROJECTIONS, FEEDS, HOLDINGS, evidenceCounts, entityChipLabel } from './data.js';
import { store, I, goalTitle } from './state.js';

/* ---- 小部件 ---- */
export function monoAv(label, hue, size = 36, round = false) {
  const s = label.slice(0, label.length > 3 ? 2 : 4);
  return `<span class="mono-av ${round ? 'round' : ''}" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.34)}px;background:hsl(${hue} 28% 16%);color:hsl(${hue} 65% 68%);border-color:hsl(${hue} 40% 26%)">${s}</span>`;
}

export function entityAv(id, size = 36) {
  const e = ENTITIES[id];
  if (!e) return monoAv(id, 174, size);
  if (e.img) return `<img class="ent-img" src="${e.img}" width="${size}" height="${size}" alt="${e.name}" loading="lazy">`;
  if (e.logo) return `<span class="tick-logo" style="width:${size}px;height:${size}px"><img src="${e.logo}" alt="${e.ticker}" loading="lazy"></span>`;
  if (e.kind === 'figure') return monoAv(e.name.split(' ').map(w => w[0]).join(''), 174, size, true);
  return monoAv(e.kind === 'market' ? e.ticker : e.name.slice(0, 2).toUpperCase(), e.hue, size);
}

export function sparkSVG(points, dir, w = 96, h = 34, endDot = true) {
  const min = Math.min(...points), max = Math.max(...points);
  const nx = (i) => (i / (points.length - 1)) * (w - 6) + 3;
  const ny = (v) => h - 5 - ((v - min) / (max - min || 1)) * (h - 10);
  const d = points.map((v, i) => `${i ? 'L' : 'M'}${nx(i).toFixed(1)} ${ny(v).toFixed(1)}`).join(' ');
  const last = points.length - 1;
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <path class="${dir}" d="${d}"/>
    ${endDot ? `<circle class="${dir}" cx="${nx(last).toFixed(1)}" cy="${ny(points[last]).toFixed(1)}" r="2.5"/>` : ''}
  </svg>`;
}

export function accessBadge(access) {
  if (access === 'private') return `<span class="badge private">${I.lock}Private</span>`;
  if (access === 'premium') return `<span class="badge premium">${I.lock}Premium</span>`;
  return `<span class="badge">Public</span>`;
}

/* 持仓判定：券商同步或手动录入皆算 */
export const isHeld = (id) => (store.brokerage && HOLDINGS.some((h) => h.entity === id)) || store.manualHoldings.includes(id);

/* ---- because line（读 projection + 持仓联动，不读 item） ---- */
function reasonIsActive(reason) {
  if (reason.t === 'entity') return store.entities.includes(reason.id);
  if (reason.t === 'source') return store.sources.includes(reason.id);
  if (reason.t === 'feed') return store.feeds.includes(reason.id);
  if (reason.t === 'private') return store.connected.telegram && store.sources.includes(reason.id);
  if (reason.t === 'watch') return store.watches.length > 0;
  return reason.t === 'explore';
}

function becauseFor(item) {
  const projected = PROJECTIONS[item.id]?.because || [];
  const active = projected.filter((reason) => reason.t !== 'explore' && reasonIsActive(reason));
  const feedReason = { t: 'feed', id: item.feed };
  if (item.feed === store.lastFollowedFeed && store.feeds.includes(item.feed)) {
    return [feedReason, ...active.filter((reason) => reason.t !== 'feed' || reason.id !== item.feed)];
  }
  if (active.length) return active;
  if (store.feeds.includes(item.feed)) return [feedReason];
  return projected.filter((reason) => reason.t === 'explore');
}

function becauseParts(item) {
  return becauseFor(item).map((b) => {
    if (b.t === 'entity') {
      return `<b>${entityChipLabel(b.id)}</b>${isHeld(b.id) ? ', which you hold' : ''}`;
    }
    if (b.t === 'source') return `<b>${SOURCES[b.id].name}</b>, a source you added`;
    if (b.t === 'feed') return `<b>${FEEDS[b.id].name}</b>, a channel you follow`;
    if (b.t === 'private') return `<b>your private ${SOURCES[b.id].platform} source</b>`;
    if (b.t === 'watch') return `<b>your watch</b>`;
    if (b.t === 'explore') return b.label;
    return '';
  });
}
export function becauseLine(item) {
  const parts = becauseParts(item);
  return parts.length ? `<p class="because">For you because ${parts.join(' · ')}</p>` : '';
}

/* 多条 watch 里挑与该卡实体相关的一条（词边界匹配 ticker/名字首词），否则回落第一条 */
export function watchFor(item) {
  const ws = store.watches;
  if (!ws.length) return '';
  return ws.find((w) => (item.entity_refs || []).some((id) => {
    const e = ENTITIES[id];
    const key = e ? (e.ticker || e.name).split(' ')[0] : '';
    return key && new RegExp(`\\b${key}\\b`, 'i').test(w);
  })) || ws[0];
}

export function watchFlag(item) {
  const proj = PROJECTIONS[item.id];
  if (!proj || !proj.watch || !store.watches.length) return '';
  const label = { supports: 'Supports your watch', challenges: 'Challenges your watch', new_evidence: 'New evidence for your watch' }[proj.watch];
  return `<span class="watch-flag ${proj.watch}"><span class="dot"></span>${label}</span>`;
}

/* ---- 溯源入口：source 头像叠放 + 一句因由，点开看"背后发生了什么" ---- */
function provShortReason(item) {
  const b = becauseFor(item)[0];
  if (!b) return 'why you see this';
  if (b.t === 'entity') {
    return `${entityChipLabel(b.id)}${isHeld(b.id) ? ', which you hold' : ''}`;
  }
  if (b.t === 'source') return `${SOURCES[b.id].name}, your source`;
  if (b.t === 'feed') return FEEDS[b.id].name;
  if (b.t === 'private') return 'your private source';
  if (b.t === 'watch') return 'your watch';
  if (b.t === 'explore') return b.label;
  return 'why you see this';
}

export function provRow(item, act = 'evi-sheet') {
  const srcs = item.evidence.slice(0, 4).map((ev) => SOURCES[ev.source]);
  const stack = srcs.map((s) => s.avatar
    ? `<img src="img/${s.avatar}" alt="${s.name}">`
    : `<span>${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`).join('');
  return `<button class="prov-row" data-act="${act}" data-item="${item.id}" aria-label="Behind this card">
    <span class="src-stack">${stack}</span>
    <span class="prov-tx">For you · ${provShortReason(item)}</span>
    <span class="prov-chev">${I.chevR}</span>
  </button>`;
}

/* detail 页复用同一入口 */
export const evidenceBar = (item) => provRow(item, 'evi-sheet');

/* ---- archetype 专属模块（紧凑版） ---- */
function metricDiff(item) {
  if (!item.metric_diff) return '';
  const m = item.metric_diff;
  return `<div class="metric-row">
    <span class="k">${m.label}</span>
    <span class="old">${m.old}</span><span class="arr">→</span><b class="new ${m.dir}">${m.new}</b>
    ${m.spark ? sparkSVG(m.spark, m.dir, 64, 22) : ''}
  </div>`;
}

function whatChanged(item) {
  if (!item.what_changed) return '';
  return `<div class="wc-block"><span class="wc-k">What changed</span><p>${item.what_changed}</p></div>`;
}

/* 事实 bullets：每条 claim 带来源引用 chip（Perplexity 式） */
function factList(item) {
  if (!item.facts) return '';
  return `<div class="fact-list">${item.facts.map((f) => {
    const first = SOURCES[f.sources[0]];
    const extra = f.sources.length > 1 ? ` +${f.sources.length - 1}` : '';
    return `<div class="fact"><span class="fact-dot"></span><span class="fact-tx">${f.text}
      <button class="src-chip" data-act="open-source" data-id="${f.sources[0]}">${first.name}${extra}</button></span></div>`;
  }).join('')}</div>`;
}

function signalStrip(item) {
  if (!item.signal) return '';
  return `<div class="signal-inline">
    <span class="cell up">${item.signal.direction}</span>
    <span class="cell">${item.signal.strength}</span>
    <span class="cell">${item.signal.horizon}</span>
  </div>`;
}

function briefList(item) {
  if (!item.brief_points) return '';
  return `<div class="brief-list">${item.brief_points.map((p, i) => `<div class="bp"><i>${i + 1}</i><span>${p}</span></div>`).join('')}</div>`;
}

function clipBlock(item) {
  const clip = item.media && item.media.clip;
  if (!clip) return '';
  return `<div class="clip" data-act="play-clip">
    <span class="play">${I.play}</span>
    <div><q>${clip.quote}</q><div class="t">Play from ${clip.t} · opens source</div></div>
  </div>`;
}

function lockPanel(item) {
  if (item.access !== 'premium' || store.unlocked[item.feed]) return '';
  return `<div class="lock-panel">
    <div class="teaser">${item.premium.teaser}</div>
    <div class="row">
      <span class="price">${item.premium.price}</span>
      <button class="unlock-btn" data-act="unlock" data-feed="${item.feed}">${I.lock}<span>Unlock</span></button>
    </div>
  </div>`;
}

/* ---- 个性化 follow-up CTA（send prompt 或 open url，由 item 内容生成） ---- */
function ctaButton(item, locked) {
  const tracked = store.tracks.includes(item.id);
  if (locked || !item.cta) {
    return `<button class="btn btn-ghost" data-act="track-item" data-item="${item.id}" style="${tracked ? 'color:var(--teal);border-color:var(--teal-line)' : ''}">${I.track}${tracked ? 'Tracking' : 'Track'}</button>`;
  }
  if (item.cta.kind === 'url') {
    return `<button class="btn btn-ghost" data-act="cta-url" data-item="${item.id}">${I.link}${item.cta.label}</button>`;
  }
  return `<button class="btn btn-ghost" data-act="cta-prompt" data-item="${item.id}">${I.send}${item.cta.label}</button>`;
}

/* ---- card head ---- */
function cardHead(item) {
  const first = item.entity_refs[0];
  const e = ENTITIES[first];
  const themes = item.entity_refs.slice(1).map(entityChipLabel).join(' · ');
  const feed = FEEDS[item.feed];
  const label = e ? (e.kind === 'market' ? e.ticker : e.name) : feed.name;
  const delta = e && e.kind === 'market' ? `<span class="delta ${e.dir}">${e.delta}</span>` : '';
  return `<div class="card-head">
    <div class="ent" data-act="open-entity" data-id="${first || ''}" role="button">
      ${first ? entityAv(first, 30) : monoAv('AL', 174, 30)}
      <span class="tick">${label}</span>${delta}
      <span class="theme">${themes || feed.name}</span>
      ${item.access !== 'public' ? accessBadge(item.access) : ''}
    </div>
    <span class="time">${item.published}</span>
  </div>`;
}

/* ========== stream card（文本/图表优先，紧凑） ========== */
export function streamCard(item, idx = 0) {
  const locked = item.access === 'premium' && !store.unlocked[item.feed];
  const tracked = store.tracks.includes(item.id);
  const savedOn = store.saved.includes(item.id);

  const hasMedia = !locked && item.media && item.media.hero;
  const front = `<div class="card flip-face">
    ${cardHead(item)}
    ${hasMedia ? `<div class="card-media-top" data-act="open-detail" data-item="${item.id}" role="button"><img src="${item.media.hero}" alt="${item.media.alt}" loading="lazy"></div>` : ''}
    <h2 class="card-headline" data-act="open-detail" data-item="${item.id}" role="button">${item.headline}</h2>
    <p class="card-summary">${locked ? '' : item.summary}</p>
    ${locked ? lockPanel(item) : `
      ${factList(item)}
      ${signalStrip(item)}
      ${briefList(item)}
      ${clipBlock(item)}
    `}
    ${!locked ? provRow(item, 'flip') : ''}
    <div class="card-actions">
      <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}">${I.ask}Ask Alva</button>
      ${ctaButton(item, locked)}
      <button class="btn btn-icon ${savedOn ? 'on' : ''}" data-act="save-item" data-item="${item.id}" aria-label="Save">${I.save}</button>
    </div>
  </div>`;

  return `<div class="flip-scene reveal" style="animation-delay:${Math.min(idx * 60, 300)}ms" data-item="${item.id}">
    <div class="flip-inner">
      ${front}
      <div class="flip-back">${cardBack(item)}</div>
    </div>
  </div>`;
}

/* ========== behind this card（反面：只有两件事 —— 原始 source + 为什么推给你） ========== */
export function cardBack(item) {
  const proj = PROJECTIONS[item.id] || { because: [] };
  const reasons = becauseFor(item);
  const feed = FEEDS[item.feed];
  const whyRows = reasons.map((b) => {
    if (b.t === 'entity') return `You follow <b>${entityChipLabel(b.id)}</b>`;
    if (b.t === 'source') return `You added <b>${SOURCES[b.id].name}</b>`;
    if (b.t === 'feed') return `You follow <b>${FEEDS[b.id].name}</b>`;
    if (b.t === 'private') return `From <b>${SOURCES[b.id].name}</b> — only you can see this`;
    if (b.t === 'watch') return `Matches your watch — <span class="wq">“${watchFor(item)}”</span>`;
    if (b.t === 'explore') return b.label;
    return '';
  }).join('<br>');
  const watchRow = proj.watch && store.watches.length && !reasons.some(b => b.t === 'watch')
    ? `<br>${proj.watch === 'supports' ? 'Supports' : proj.watch === 'challenges' ? 'Challenges' : 'Adds evidence to'} your watch — <span class="wq">“${watchFor(item)}”</span>` : '';

  return `
    <div class="fb-head"><span class="lbl">Behind this card</span><button class="behind-pill" data-act="unflip">${I.x}Back</button></div>
    <div class="fb-sec">Sources</div>
    <div class="ev-list">${item.evidence.map((ev) => {
      const s = SOURCES[ev.source];
      const av = s.avatar
        ? `<img class="ev-av" src="img/${s.avatar}" alt="">`
        : `<span class="ev-av mono">${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`;
      return `<div class="ev-row" data-act="open-source" data-id="${ev.source}" role="button">
        ${av}
        <div class="src"><div class="nm">${s.name}</div><div class="nt">${ev.note}</div></div>
        <span class="ev-chev">${I.chevR}</span>
      </div>`;
    }).join('')}</div>
    <div class="fb-sec">Why you're seeing this</div>
    <div class="fb-why">${whyRows}${watchRow}</div>
    <button class="fb-manage" data-act="open-automation" data-id="${item.feed}">
      ${I.gear}
      <span class="mg-tx"><b>Manage this automation</b><i>${feed.name} · ${feed.cadence}</i></span>
      <span class="mg-chev">${I.chevR}</span>
    </button>`;
}

/* ========== immersive slide（大图沉浸；无图卡用分 archetype 的深色渐变） ========== */
const IMM_HUES = { private_digest: 'linear-gradient(160deg,#1b1530 0%,#0A0E0F 65%)', brief: 'linear-gradient(160deg,#122b28 0%,#0A0E0F 60%)' };

export function immersiveSlide(item, idx, total) {
  const hasImg = item.media && item.media.hero;
  const c = evidenceCounts(item);
  const first = item.entity_refs[0];
  const e = ENTITIES[first];
  const feed = FEEDS[item.feed];
  const label = e ? (e.kind === 'market' ? e.ticker : e.name) : feed.name;
  const locked = item.access === 'premium' && !store.unlocked[item.feed];
  const bgStyle = !hasImg ? `style="background:${IMM_HUES[item.archetype] || 'radial-gradient(140% 90% at 80% 0%, #17302d 0%, #0A0E0F 60%)'}"` : '';

  const e0 = ENTITIES[first];
  const delta = e0 && e0.kind === 'market' ? `<em class="${e0.dir}">${e0.delta}</em>` : '';
  return `<section class="imm-slide" data-idx="${idx}" data-item="${item.id}">
    <div class="imm-bg ${hasImg ? '' : 'no-img'}" ${bgStyle}>${hasImg ? `<img src="${item.media.hero}" alt="${item.media.alt}">` : ''}<div class="scrim"></div></div>
    <div class="imm-head-top">
      <button class="ent-pill" data-act="open-entity" data-id="${first || ''}">
        ${first ? entityAv(first, 26) : monoAv('AL', 174, 26)}
        <b>${label}</b>${delta}
      </button>
      <span class="theme-lbl">${item.entity_refs.slice(1).map(entityChipLabel).join(' · ') || feed.name}</span>
      <span class="imm-time">${item.published}</span>
    </div>
    <div class="imm-content">
      <h1 class="imm-headline">${item.headline}</h1>
      <p class="imm-summary">${locked ? '' : item.summary}</p>
      ${locked ? lockPanel(item) : `
        ${item.what_changed ? `<div class="imm-wc"><span class="wc-k">What changed</span><p>${item.what_changed}</p></div>` : ''}
        ${item.why_matters ? `<div class="imm-wc why"><span class="wc-k">Why it matters</span><p>${item.why_matters}</p></div>` : ''}
        ${item.metric_diff ? `<div class="metric-row imm-metric"><span class="k">${item.metric_diff.label}</span><span class="old">${item.metric_diff.old}</span><span class="arr">→</span><b class="new ${item.metric_diff.dir}">${item.metric_diff.new}</b>${item.metric_diff.spark ? sparkSVG(item.metric_diff.spark, item.metric_diff.dir, 64, 22) : ''}</div>` : ''}
        ${signalStrip(item)}
        ${briefList(item)}
        ${clipBlock(item)}
      `}
      ${item.price ? `<div class="imm-price"><span class="v">${item.price.now.value}</span><span class="c" style="color:var(--${item.price.now.dir})">${item.price.now.change}</span><span style="font-size:12.5px;color:var(--t3)">${item.price.now.label}</span></div>` : ''}
      ${!locked ? provRow(item, 'flip-imm') : ''}
      <div class="imm-actions">
        <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}">${I.ask}Ask Alva</button>
        ${ctaButton(item, locked)}
      </div>
    </div>
  </section>`;
}
