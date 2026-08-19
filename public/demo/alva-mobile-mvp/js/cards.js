/* ========== cards.js — Feed Item 渲染 ==========
 * 三种卡型，对应两个 automation 的输出：
 *   alpha   — podcast 原始片段 + ticker tag + Why it’s alpha
 *   event   — 关注标的的重要事件 + Why it matters + 带来源的事实
 *   anomaly — 异动 + 走势 + 逐条归因
 * 正面卡带 feed 标签（Alpha / Following）标明来源；卡背 = 溯源 + why。
 */
import { ENTITIES, SOURCES, FEEDS, entityChipLabel, itemSources } from './data.js';
import { store, I } from './state.js';

/* ---- 小部件 ---- */
export function monoAv(label, hue, size = 36, round = false) {
  const s = label.slice(0, label.length > 3 ? 2 : 4);
  return `<span class="mono-av ${round ? 'round' : ''}" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.34)}px;background:hsl(${hue} 28% 16%);color:hsl(${hue} 65% 68%);border-color:hsl(${hue} 40% 26%)">${s}</span>`;
}

export function entityAv(id, size = 36) {
  const e = ENTITIES[id];
  if (!e) return monoAv(id, 174, size);
  if (e.logo) return `<span class="tick-logo" style="width:${size}px;height:${size}px"><img src="${e.logo}" alt="${e.ticker}" loading="lazy"></span>`;
  return monoAv(e.ticker, e.hue, size);
}

export function srcAvatar(s, size = 40) {
  if (s.avatar) return `<img class="av-img" src="img/${s.avatar}" width="${size}" height="${size}" alt="">`;
  const hue = { Podcast: 285, X: 200, News: 26, Alva: 174 }[s.platform] ?? 174;
  return monoAv(s.name.replace(/^[@r]\/?/, '').slice(0, 2).toUpperCase(), hue, size, true);
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

/* feed 身份：卡头主体 = 这张卡来自哪个 automation（Alpha / Following） */
export const feedId = (item) =>
  `<button class="feed-id ${item.feed}" data-act="open-feed" data-id="${item.feed}">${item.feed === 'alpha' ? I.spark : I.eye}${FEEDS[item.feed].name}</button>`;

/* 标的行：显性、结构化的 ticker 表达
 * logo + 代码/名称 + 极简走势 + 价格/涨跌 + Follow 状态按钮，整行可点进标的页。 */
export function entStrip(id, size = 40) {
  const e = ENTITIES[id];
  /* Follow = 代码后的小圆钮，仅未关注时出现；已关注不展示状态 */
  const follow = store.entities.includes(id) ? ''
    : `<button class="strip-follow" data-act="strip-follow" data-id="${id}" aria-label="Follow ${e.ticker}">${I.plus}</button>`;
  return `<div class="ent-strip" data-act="open-entity" data-id="${id}" role="button">
    ${entityAv(id, size)}
    <span class="meta"><b class="nm">${e.ticker}${follow}</b><span class="ds">${e.name}</span></span>
    <span class="chart">${sparkSVG(e.spark, e.dir, 58, 26, false)}</span>
    <span class="price"><span class="v">${e.price}</span><span class="c ${e.dir}">${e.delta}</span></span>
  </div>`;
}
export const entStrips = (item) => `<div class="ent-strips">${item.entity_refs.map((id) => entStrip(id)).join('')}</div>`;

/* ---- 溯源入口：source 头像叠放 + 数量，点开卡背 ---- */
export function provRow(item, act = 'flip') {
  const srcs = itemSources(item).slice(0, 4).map((id) => SOURCES[id]);
  const stack = srcs.map((s) => s.avatar
    ? `<img src="img/${s.avatar}" alt="${s.name}">`
    : `<span>${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`).join('');
  return `<button class="prov-row" data-act="${act}" data-item="${item.id}" aria-label="Behind this card">
    <span class="src-stack">${stack}</span>
    <span class="prov-tx">${srcs.length} source${srcs.length > 1 ? 's' : ''}</span>
  </button>`;
}
export const evidenceBar = (item) => provRow(item, 'evi-sheet');

/* ---- card head：automation 来源 + 时间（ticker 的表达交给 entStrip） ---- */
function cardHead(item) {
  return `<div class="card-head">
    ${feedId(item)}
    <span class="time">${item.published}</span>
  </div>`;
}

/* 事实/归因 bullets：每条 claim 带来源引用 chip */
function factList(rows) {
  return `<div class="fact-list">${rows.map((f) => {
    const first = SOURCES[f.sources ? f.sources[0] : f.source];
    const extra = f.sources && f.sources.length > 1 ? ` +${f.sources.length - 1}` : '';
    return `<div class="fact"><span class="fact-dot"></span><span class="fact-tx">${f.text}
      <button class="src-chip" data-act="open-source" data-id="${first.id}">${first.name}${extra}</button></span></div>`;
  }).join('')}</div>`;
}

const insightBlock = (label, text) => `<div class="wc-block"><span class="wc-k">${label}</span><p>${text}</p></div>`;

/* ---- 三种卡型的正面主体：head = 来源，标的行紧跟图/头部，是卡内第一要素 ---- */
function alphaBody(item) {
  const s = SOURCES[item.source];
  const hasMedia = item.media && item.media.hero;
  return `
    ${cardHead(item)}
    ${hasMedia ? `<div class="card-media-top" data-act="open-detail" data-item="${item.id}" role="button"><img src="${item.media.hero}" alt="${item.media.alt}" loading="lazy"></div>` : ''}
    ${entStrips(item)}
    <h2 class="card-headline" data-act="open-detail" data-item="${item.id}" role="button">${item.headline}</h2>
    <div class="clip" data-act="play-clip" data-item="${item.id}">
      <span class="play">${I.play}</span>
      <div><q>${item.quote}</q><div class="t">${item.speaker} · ${s.name} · ${item.at}</div></div>
    </div>
    ${insightBlock('Why it’s alpha', item.insight)}`;
}

function eventBody(item) {
  const hasMedia = item.media && item.media.hero;
  return `
    ${cardHead(item)}
    ${hasMedia ? `<div class="card-media-top" data-act="open-detail" data-item="${item.id}" role="button"><img src="${item.media.hero}" alt="${item.media.alt}" loading="lazy"></div>` : ''}
    ${entStrips(item)}
    <h2 class="card-headline" data-act="open-detail" data-item="${item.id}" role="button">${item.headline}</h2>
    <p class="card-summary">${item.summary}</p>
    ${factList(item.facts)}
    ${insightBlock('Why it matters', item.why)}`;
}

function anomalyBody(item) {
  return `
    ${cardHead(item)}
    ${entStrips(item)}
    <h2 class="card-headline" data-act="open-detail" data-item="${item.id}" role="button">${item.headline}</h2>
    <div class="rec-ta">${sparkSVG(item.move.spark, item.move.dir, 300, 72, true)}</div>
    <div class="move-lbl">${item.move.label}</div>
    <div class="wc-block" style="border:none;padding:0;background:none;margin-top:14px"><span class="wc-k">Why it’s moving</span></div>
    ${factList(item.attribution)}`;
}

/* ========== stream card ========== */
export function streamCard(item, idx = 0) {
  const body = { alpha: alphaBody, event: eventBody, anomaly: anomalyBody }[item.kind](item);
  const front = `<div class="card flip-face">
    ${body}
    <div class="card-actions">
      ${provRow(item, 'flip')}
      <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}">${I.ask}Ask Alva</button>
    </div>
  </div>`;
  return `<div class="flip-scene reveal" style="animation-delay:${Math.min(idx * 60, 300)}ms" data-item="${item.id}">
    <div class="flip-inner">
      ${front}
      <div class="flip-back">${cardBack(item)}</div>
    </div>
  </div>`;
}

/* ========== behind this card（反面：原始 source + 为什么推给你） ========== */
export function cardBack(item) {
  const feed = FEEDS[item.feed];
  const why = item.feed === 'alpha'
    ? `From <b>Alpha</b> — a curated set of podcasts Alva listens to for you${item.entity_refs.some((id) => store.entities.includes(id)) ? `, surfaced first because you follow <b>${entityChipLabel(item.entity_refs.find((id) => store.entities.includes(id)))}</b>` : ''}`
    : `You follow <b>${entityChipLabel(item.entity_refs[0])}</b> — Following watches it across X and the newswire`;
  const noteFor = (id) => {
    if (item.kind === 'alpha') return `${item.ep} · ${item.at}`;
    const row = item.kind === 'anomaly'
      ? item.attribution.find((a) => a.source === id)
      : item.facts.find((f) => f.sources.includes(id));
    return row ? row.text.slice(0, 64) + (row.text.length > 64 ? '…' : '') : SOURCES[id].modality;
  };
  return `
    <div class="fb-head"><span class="lbl">Behind this card</span><button class="behind-pill" data-act="unflip">${I.x}Back</button></div>
    <div class="fb-sec">Sources</div>
    <div class="ev-list">${itemSources(item).map((id) => {
      const s = SOURCES[id];
      const av = s.avatar
        ? `<img class="ev-av" src="img/${s.avatar}" alt="">`
        : `<span class="ev-av mono">${s.name.replace(/^[@r]\/?/, '').slice(0, 1).toUpperCase()}</span>`;
      return `<div class="ev-row" data-act="open-source" data-id="${id}" role="button">
        ${av}
        <div class="src"><div class="nm">${s.name}</div><div class="nt">${noteFor(id)}</div></div>
        <span class="ev-chev">${I.chevR}</span>
      </div>`;
    }).join('')}</div>
    <div class="fb-sec">Why you're seeing this</div>
    <div class="fb-why">${why}</div>
    <button class="fb-manage" data-act="open-automation" data-id="${item.feed}">
      ${I.gear}
      <span class="mg-tx"><b>Manage this automation</b><i>${feed.name} · ${feed.cadence}</i></span>
      <span class="mg-chev">${I.chevR}</span>
    </button>`;
}
