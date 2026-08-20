/* ========== cards.js — Feed Item 渲染 ==========
 * 三种卡型，对应两个 automation 的输出：
 *   alpha   — podcast 原始片段 + ticker tag + Why it’s alpha
 *   event   — 关注标的的重要事件 + Why it matters + 带来源的事实
 *   anomaly — 异动 + 走势 + 逐条归因
 * 正面卡带 feed 标签（Alpha / Following）标明来源；卡背 = 溯源 + why。
 */
import { ENTITIES, SOURCES, FEEDS, entityChipLabel, itemSources } from './data.js?v=local-mt10cd';
import { store, I } from './state.js?v=local-mt10cd';
import { renderMarkdown, splitMarkdown } from './markdown.js?v=local-mt10cd';

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

/* Unified Composer context token: compact, explicit and removable. It mirrors
 * the production MentionNode/Attachment geometry while using the ticker mark
 * that is more useful on the mobile investing surface. */
export function entityReference(id, { removable = true, action = 'remove-composer-entity' } = {}) {
  const e = ENTITIES[id];
  if (!e) return '';
  return `<span class="entity-ref-chip" data-entity="${id}">
    ${entityAv(id, 20)}
    <span class="entity-ref-label"><b>${e.ticker}</b><i>${e.name}</i></span>
    ${removable ? `<button data-act="${action}" aria-label="Remove ${e.ticker} reference">${I.x}</button>` : ''}
  </span>`;
}

/* Mirrors the real Unified Composer's add menu. Entity mentions are created by
 * entity surfaces, not exposed as a generic picker here. */
export function composerContextMenu() {
  const options = [
    ['Playbooks', 'sidebar-dashboard-normal.svg', true],
    ['Automations', 'lightning-l.svg', true],
    ['Files/photos', 'clip-l.svg', true],
    ['Portfolio accounts', 'wallet-l.svg', true],
    ['Skills hub', 'skill-l.svg', true],
    ['GPT-5.5', 'think-l.svg', true],
    ['Recent chats', 'sidebar-thread-normal.svg', true],
    ['Upload new files', 'upload-l.svg', false],
  ];
  return `<div class="composer-add-popover" hidden>
    <div class="composer-add-list">${options.map(([label, icon, hasNext]) => `<button data-act="composer-menu-action" data-label="${label}">
      <span class="composer-menu-icon" style="--composer-menu-icon:url('../img/icons/composer/${icon}')"></span><span class="composer-menu-label">${label}</span>${hasNext ? I.chevR : ''}
    </button>`).join('')}</div>
  </div>`;
}

export function srcAvatar(s, size = 40, extraClass = '') {
  if (s.avatar) return `<img class="av-img source-avatar-img ${extraClass}" src="img/${s.avatar}" width="${size}" height="${size}" alt="${s.name}" loading="lazy">`;
  const hue = s.hue ?? ({ Podcast: 285, X: 200, News: 26, Alva: 174 }[s.platform] ?? 174);
  const mark = s.mark || s.name.replace(/^[@r]\/?/, '').slice(0, 2).toUpperCase();
  const inner = s.platform === 'Alva'
    ? '<span class="source-alva-mark" aria-hidden="true"></span>'
    : `<span class="source-avatar-label">${mark}</span>`;
  return `<span class="source-avatar source-${s.id} ${extraClass}" style="--av-size:${size}px;--source-hue:${hue}" role="img" aria-label="${s.name}">${inner}</span>`;
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
  `<button class="feed-id ${item.feed}" data-act="open-feed" data-id="${item.feed}"><span class="st-dot" aria-hidden="true"></span>${FEEDS[item.feed].name}</button>`;

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

/* Stream cards need compact market context, not a second dashboard inside the card. */
function tickerToken(id) {
  const e = ENTITIES[id];
  return `<button class="ticker-token" data-act="open-entity" data-id="${id}" aria-label="Open ${e.ticker}">
    ${entityAv(id, 22)}
    <b>${e.ticker}</b>
    <span class="ticker-price">${e.price}</span>
    <span class="ticker-delta ${e.dir}">${e.delta}</span>
  </button>`;
}
export const tickerRail = (item) => `<div class="ticker-rail ${item.entity_refs.length > 1 ? 'multi' : ''}">${item.entity_refs.map(tickerToken).join('')}</div>`;

/* ---- 溯源入口：source 头像叠放 + 数量，点开卡背 ---- */
export function provRow(item, act = 'flip') {
  const sourceIds = itemSources(item);
  const srcs = sourceIds.slice(0, 3).map((id) => SOURCES[id]);
  const remaining = sourceIds.length - srcs.length;
  const stack = srcs.map((s) => srcAvatar(s, 22)).join('');
  return `<button class="prov-row" data-act="${act}" data-item="${item.id}" aria-label="View ${sourceIds.length} source${sourceIds.length > 1 ? 's' : ''}">
    <span class="src-stack">${stack}</span>
    ${remaining > 0 ? `<span class="prov-more">+${remaining}</span>` : ''}
    <span class="prov-chev">${I.chevR}</span>
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

const wave = [5,8,12,7,14,9,16,6,13,9,15,8,12,6,15,9,13,7,10,5];

function audioHero(item, hero) {
  const source = SOURCES[item.source];
  const cover = hero || (item.media && item.media.hero ? { src: item.media.hero, alt: item.media.alt } : null);
  return `<button class="audio-hero ${cover ? 'has-cover' : 'no-cover'}" data-act="play-clip" data-item="${item.id}" aria-label="Play clip from ${source.name}">
    ${cover ? `<img src="${cover.src}" alt="${cover.alt}" loading="lazy">` : ''}
    <span class="audio-inner">
      <span class="audio-source">${srcAvatar(source, 28)}<span><b>${source.name}</b><i>${item.ep}</i></span><em>${item.at}</em></span>
      <span class="audio-transport">
        <span class="audio-play">${I.play}</span>
        <span class="audio-wave" aria-hidden="true">${wave.map((h, i) => `<i style="--h:${h}px;--i:${i}"></i>`).join('')}</span>
      </span>
    </span>
  </button>`;
}

function imageHero(item, hero) {
  if (!hero) return '';
  return `<div class="card-media-top" data-act="open-detail" data-item="${item.id}" role="button"><img src="${hero.src}" alt="${hero.alt}" loading="lazy"></div>`;
}

const chartScale = (value, min, max, top, bottom) => bottom - ((value - min) / (max - min || 1)) * (bottom - top);

function candlestickHero(item) {
  const v = item.visual;
  const candles = v.candles;
  const all = candles.flatMap((c) => [c[1], c[2], v.support, v.resistance]);
  const min = Math.min(...all), max = Math.max(...all);
  const left = 16, right = 304, top = 10, bottom = 82;
  const step = (right - left) / candles.length;
  const maxVolume = Math.max(...candles.map((c) => c[4]));
  const candleSvg = candles.map((c, i) => {
    const [open, high, low, close, volume] = c;
    const x = left + step * i + step / 2;
    const yo = chartScale(open, min, max, top, bottom);
    const yc = chartScale(close, min, max, top, bottom);
    const yh = chartScale(high, min, max, top, bottom);
    const yl = chartScale(low, min, max, top, bottom);
    const up = close >= open;
    const bodyY = Math.min(yo, yc), bodyH = Math.max(2.4, Math.abs(yc - yo));
    const volumeH = Math.max(2, (volume / maxVolume) * 18);
    return `<g class="candle ${up ? 'up' : 'down'}">
      <line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${yh.toFixed(1)}" y2="${yl.toFixed(1)}"/>
      <rect x="${(x - 5).toFixed(1)}" y="${bodyY.toFixed(1)}" width="10" height="${bodyH.toFixed(1)}" rx="1.5"/>
      <rect class="volume" x="${(x - 5).toFixed(1)}" y="${(112 - volumeH).toFixed(1)}" width="10" height="${volumeH.toFixed(1)}" rx="1"/>
    </g>`;
  }).join('');
  const resistanceY = chartScale(v.resistance, min, max, top, bottom);
  const supportY = chartScale(v.support, min, max, top, bottom);
  return `<div class="data-hero candlestick-hero" data-act="open-detail" data-item="${item.id}" role="button">
    <div class="data-hero-head"><span>${v.eyebrow}</span><em class="signal-badge">${v.badge}</em></div>
    <div class="data-primary"><b>${v.value}</b><span class="${item.move.dir}">${item.move.value}</span><i>${v.note}</i></div>
    <svg class="candle-chart" viewBox="0 0 320 118" role="img" aria-label="${v.aria}">
      <g class="chart-grid"><line x1="16" x2="304" y1="22" y2="22"/><line x1="16" x2="304" y1="52" y2="52"/><line x1="16" x2="304" y1="82" y2="82"/></g>
      <line class="level resistance" x1="16" x2="304" y1="${resistanceY.toFixed(1)}" y2="${resistanceY.toFixed(1)}"/>
      <line class="level support" x1="16" x2="304" y1="${supportY.toFixed(1)}" y2="${supportY.toFixed(1)}"/>
      <text class="level-label resistance" x="242" y="${Math.max(11, resistanceY - 4).toFixed(1)}" text-anchor="end">RES ${v.resistance.toFixed(1)}</text>
      <text class="level-label support" x="242" y="${Math.min(80, supportY - 4).toFixed(1)}" text-anchor="end">SUP ${v.support.toFixed(1)}</text>
      ${candleSvg}
    </svg>
  </div>`;
}

function columnsHero(item) {
  const v = item.visual;
  const max = Math.max(...v.actual, ...v.compare) * 1.12;
  const base = 82, chartTop = 8;
  const group = 72;
  const bars = v.labels.map((label, i) => {
    const x = 26 + i * group;
    const compareH = (v.compare[i] / max) * (base - chartTop);
    const actualH = (v.actual[i] / max) * (base - chartTop);
    return `<g class="column-group">
      <rect class="compare" x="${x}" y="${(base - compareH).toFixed(1)}" width="15" height="${compareH.toFixed(1)}" rx="2"/>
      <rect class="actual" x="${x + 19}" y="${(base - actualH).toFixed(1)}" width="15" height="${actualH.toFixed(1)}" rx="2"/>
      <text x="${x + 17}" y="103" text-anchor="middle">${label}</text>
    </g>`;
  }).join('');
  return `<div class="data-hero columns-hero" data-act="open-detail" data-item="${item.id}" role="button">
    <div class="data-hero-head"><span>${v.eyebrow}</span><span class="chart-legend"><i></i>${v.compareLabel}<i></i>${v.actualLabel}</span></div>
    <div class="data-primary"><b>${v.value}</b><span class="up">${v.delta}</span><i>${v.note}</i></div>
    <svg class="column-chart" viewBox="0 0 320 108" role="img" aria-label="${v.aria}">
      <g class="chart-grid"><line x1="16" x2="304" y1="26" y2="26"/><line x1="16" x2="304" y1="54" y2="54"/><line x1="16" x2="304" y1="82" y2="82"/></g>
      ${bars}
    </svg>
  </div>`;
}

function flowHero(item) {
  const v = item.visual;
  const max = Math.max(...v.values.map(Math.abs));
  const base = 82, top = 10;
  const step = 46;
  const bars = v.values.map((value, i) => {
    const h = Math.max(3, Math.abs(value) / max * (base - top));
    const x = 22 + i * step;
    const y = value >= 0 ? base - h : base;
    return `<g class="flow-bar ${value >= 0 ? 'up' : 'down'} ${i === v.values.length - 1 ? 'latest' : ''}">
      <rect x="${x}" y="${y.toFixed(1)}" width="22" height="${h.toFixed(1)}" rx="3"/>
      <text x="${x + 11}" y="103" text-anchor="middle">${v.labels[i]}</text>
    </g>`;
  }).join('');
  return `<div class="data-hero flow-hero" data-act="open-detail" data-item="${item.id}" role="button">
    <div class="data-hero-head"><span>${v.eyebrow}</span><em class="signal-badge">${v.badge}</em></div>
    <div class="data-primary"><b>${v.value}</b><span class="up">${v.delta}</span><i>${v.note}</i></div>
    <svg class="flow-chart" viewBox="0 0 320 108" role="img" aria-label="${v.aria}">
      <line class="flow-baseline" x1="16" x2="304" y1="82" y2="82"/>${bars}
    </svg>
  </div>`;
}

function visualHero(item) {
  if (!item.visual) return '';
  if (item.visual.type === 'candlestick') return candlestickHero(item);
  if (item.visual.type === 'columns') return columnsHero(item);
  if (item.visual.type === 'flow') return flowHero(item);
  return '';
}

function marketHero(item) {
  return `<div class="market-hero" data-act="open-detail" data-item="${item.id}" role="button">
    <div class="market-metric"><b class="${item.move.dir}">${item.move.value}</b><span>${item.move.label}</span></div>
    ${sparkSVG(item.move.spark, item.move.dir, 300, 78, true)}
  </div>`;
}

function fallbackMarkdown(item) {
  if (item.kind === 'alpha') return `## ${item.headline}\n\n> ${item.quote}\n\n**Why it’s alpha:** ${item.insight}`;
  if (item.kind === 'anomaly') return `## ${item.headline}\n\n${item.attribution.map((a) => `- ${a.text}`).join('\n')}`;
  return `## ${item.headline}\n\n${item.summary}\n\n${item.facts.map((f) => `- ${f.text}`).join('\n')}\n\n**Why it matters:** ${item.why}`;
}

/* Feed output is Markdown. UI-specific media/ticker treatment is projection only. */
function cardBody(item) {
  const { hero, body } = splitMarkdown(item.content_md || fallbackMarkdown(item));
  const media = item.kind === 'alpha' ? audioHero(item, hero)
    : item.visual ? visualHero(item)
      : item.kind === 'anomaly' ? marketHero(item)
      : imageHero(item, hero);
  return `${cardHead(item)}${media}${tickerRail(item)}
    <div class="md-content" data-act="open-detail" data-item="${item.id}">${renderMarkdown(body)}</div>`;
}

/* ========== stream card ========== */
export function streamCard(item, idx = 0) {
  const body = cardBody(item);
  const front = `<div class="card flip-face feed-${item.feed} kind-${item.kind}">
    ${body}
    <div class="card-actions">
      ${provRow(item, 'flip')}
      <button class="btn btn-ask" data-act="ask-item" data-item="${item.id}"><span class="ask-alva-mark" aria-hidden="true"></span>Ask Alva</button>
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
      return `<div class="ev-row" data-act="open-source" data-id="${id}" role="button">
        ${srcAvatar(s, 30, 'ev-av')}
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
