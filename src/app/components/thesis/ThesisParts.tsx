/**
 * [INPUT]: thesis mock 数据
 * [OUTPUT]: Thesis 详情页的共用零件 —— 页头、版本正文、竖轨、Signals / Related 卡、tab
 * [POS]: Component 层 — 结构 1-1 与 1-2 两套布局共用
 *
 * 逐参数取自 Figma「结构1补充」16985:112958 下的各帧。
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import {
  THESIS_AUTHOR,
  THESIS_SIGNALS,
  RELATED_THESES,
  type ThesisVersion,
  type ThesisMedia,
  type ThesisTicker,
  type ThesisSignal,
  type RelatedThesis,
} from '@/data/thesis-demo';

/* ══════════ 取自稿的排印 ══════════ */
export const T14 = { fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px' } as const;
export const T12 = { fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px' } as const;
/** 段与段之间不空整行，给半行左右的间距 */
export const PARA_GAP = 12;
/** Baby 无 main-m2-10 这档，照稿写字面值 */
const M2_10 = 'rgba(33,150,243,0.1)';

/* ══════════ 外链行 · dotted 下划线 + 溢出箭头 ══════════ */

/** 稿上用的是 🡕 字符，Delight 没有这个字形会掉成豆腐块，这里用等价的内联箭头 */
function ArrowOut() {
  return (
    <svg
      width="0.72em"
      height="0.72em"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{ display: 'inline-block', marginLeft: 3, verticalAlign: 'baseline' }}
    >
      <path
        d="M2.6 7.4 7.4 2.6M3.7 2.6h3.7v3.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SourceLink({
  label,
  href,
  size = 12,
}: {
  label: string;
  href: string;
  size?: 12 | 14;
}) {
  const t = size === 14 ? T14 : T12;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="cursor-pointer"
      style={{
        ...t,
        color: size === 14 ? 'var(--text-n7, rgba(0,0,0,0.7))' : 'var(--text-n5, rgba(0,0,0,0.5))',
        textDecorationLine: 'none',
      }}
    >
      <span
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'dotted',
          textDecorationColor: 'var(--text-n5, rgba(0,0,0,0.5))',
          textDecorationSkipInk: 'none',
        }}
      >
        {label}
      </span>
      <ArrowOut />
    </a>
  );
}

/* ══════════ Ticker chip ══════════ */

/** 稿 17067:67546：12 圆点，绿 m3 看涨 / 红 m4 看跌，内部 8 箭头转 45° 或 135° */
function TickerDirection({ dir }: { dir: 'up' | 'down' }) {
  return (
    <span
      className="flex size-[12px] shrink-0 items-center justify-center rounded-full"
      style={{ background: dir === 'up' ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m4, #e05357)' }}
    >
      <span className="flex" style={{ transform: `rotate(${dir === 'up' ? 45 : 135}deg)` }}>
        <CdnIcon name="arrow-up-l1" size={8} color="#fff" />
      </span>
    </span>
  );
}

export function TickerChip({ ticker }: { ticker: string | ThesisTicker }) {
  const t = typeof ticker === 'string' ? { symbol: ticker, direction: undefined } : ticker;
  return (
    <div
      className="flex h-[28px] shrink-0 cursor-pointer items-center"
      style={{
        gap: 'var(--spacing-xxs, 4px)',
        padding: '0 var(--spacing-xs, 8px)',
        borderRadius: 'var(--radius-ct-m, 6px)',
        background: 'var(--b-r05, rgba(0,0,0,0.05))',
      }}
    >
      <TickerLogo ticker={t.symbol} size={16} />
      <span style={{ ...T12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{t.symbol}</span>
      {t.direction && <TickerDirection dir={t.direction} />}
    </div>
  );
}

/* ══════════ 媒体行 · 溢出横滑 + 悬浮翻页箭头 ══════════ */

/** 箭头照稿 17067:93516：36 圆形、纯黑底、白 0.3 描边、18 图标，悬停才出现 */
function ScrollArrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous images' : 'Next images'}
      className="absolute top-1/2 flex size-[36px] -translate-y-1/2 cursor-pointer items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100"
      style={{
        ...(dir === 'left' ? { left: 0 } : { right: 0 }),
        background: '#000',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: 960,
        padding: 0,
      }}
    >
      <CdnIcon name={dir === 'left' ? 'arrow-left-l1' : 'arrow-right-l1'} size={18} color="#fff" />
    </button>
  );
}

/** 一步滚一张：图宽 240 + 间距 8，停下来边缘总是完整的一张 */
const MEDIA_STEP = 248;

export function MediaRow({ items }: { items: ThesisMedia[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = () => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useLayoutEffect(() => {
    sync();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const step = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * MEDIA_STEP, behavior: 'smooth' });

  return (
    <div className="group relative w-full">
      <div
        ref={scroller}
        onScroll={sync}
        className="thesis-media-row flex w-full items-start overflow-x-auto"
        style={{ gap: 'var(--spacing-xs, 8px)' }}
      >
        {items.map((m, i) => (
          <img
            key={`${m.src}-${i}`}
            src={m.src}
            alt={m.alt}
            className="h-[135px] w-[240px] shrink-0 object-cover"
            style={{
              borderRadius: 'var(--radius-ct-l, 8px)',
              border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
            }}
          />
        ))}
      </div>
      {!atStart && <ScrollArrow dir="left" onClick={() => step(-1)} />}
      {!atEnd && <ScrollArrow dir="right" onClick={() => step(1)} />}
    </div>
  );
}

/* ══════════ 一个版本的正文（时间 + 段落 + 媒体 + tickers） ══════════ */

export function FeedContent({
  version,
  showLatestTag,
}: {
  version: ThesisVersion;
  showLatestTag: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
      <div className="flex w-full items-center" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <span style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{version.time}</span>
        {showLatestTag && version.latest && (
          <span
            className="flex h-[16px] items-center justify-center"
            style={{
              padding: '0 6px 1px',
              borderRadius: 'var(--radius-ct-l, 8px)',
              background: 'var(--main-m2, #2196F3)',
              color: '#fff',
              fontSize: 10,
              lineHeight: '16px',
              letterSpacing: '0.1px',
              fontWeight: 500,
            }}
          >
            Latest
          </span>
        )}
      </div>

      <div className="w-full" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        {version.paragraphs.map((text, i) => (
          <p key={i} style={{ ...T14, marginTop: i === 0 ? 0 : PARA_GAP }}>
            {text}
          </p>
        ))}
        <p style={{ marginTop: PARA_GAP }}>
          <SourceLink label={version.source.label} href={version.source.href} />
        </p>
      </div>

      <MediaRow items={version.media} />

      <div className="flex w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        {version.tickers.map((t) => (
          <TickerChip key={typeof t === 'string' ? t : t.symbol} ticker={t} />
        ))}
      </div>
    </div>
  );
}

/* ══════════ 页头 ══════════ */

export function ThesisHeader() {
  return (
    <div
      className="flex shrink-0 items-center"
      style={{
        gap: 'var(--spacing-s, 12px)',
        padding: 'var(--spacing-s, 12px) var(--spacing-l, 20px) var(--spacing-s, 12px) var(--spacing-xxl, 28px)',
        borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
        background: 'var(--b0-container, #fff)',
      }}
    >
      <img
        src={THESIS_AUTHOR.avatar}
        alt={THESIS_AUTHOR.name}
        className="size-[35px] shrink-0 rounded-full object-cover"
        style={{ border: '0.5px solid var(--b0-container, #fff)' }}
      />
      <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
        <span
          style={{ ...T14, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))', marginBottom: -2 }}
        >
          {THESIS_AUTHOR.name}
        </span>
        <span style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{THESIS_AUTHOR.role}</span>
      </div>
      {/* 稿 17067:84633：三个 32 高的方钮，间距 2；收藏是已收藏态（实心 + m1 青） */}
      <div className="flex shrink-0 items-center justify-end" style={{ gap: 2 }}>
        <button
          type="button"
          className="flex h-[32px] cursor-pointer items-center border-none bg-transparent transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          style={{
            gap: 'var(--spacing-xxs, 4px)',
            padding: 'var(--spacing-xs, 8px)',
            borderRadius: 'var(--radius-ct-m, 6px)',
          }}
          aria-label="Saved"
        >
          <CdnIcon name="bookmark-f" size={16} color="var(--main-m1, #49A3A6)" />
          <span style={{ ...T12, color: 'var(--main-m1, #49A3A6)' }}>{THESIS_AUTHOR.saves}</span>
        </button>
        <button
          type="button"
          className="flex h-[32px] cursor-pointer items-center border-none bg-transparent transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          style={{
            gap: 'var(--spacing-xxs, 4px)',
            padding: 'var(--spacing-xs, 8px)',
            borderRadius: 'var(--radius-ct-m, 6px)',
          }}
          aria-label="Share thesis"
        >
          <CdnIcon name="share-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
        <button
          type="button"
          className="flex h-[32px] cursor-pointer items-center border-none bg-transparent transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          style={{
            gap: 'var(--spacing-xxs, 4px)',
            padding: 'var(--spacing-xs, 8px)',
            borderRadius: 'var(--radius-ct-m, 6px)',
          }}
          aria-label="More"
        >
          <CdnIcon name="more-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>
    </div>
  );
}

/* ══════════ 版本竖轨 · 24 宽 · dot 14 · 0.5 竖线 ══════════ */

export function HistoryRail({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) {
  /**
   * 线是 0.5px（稿上 Border/Default）。宽度给 width 而不是 border，并且落在整数 left 上：
   * 轨道 24 宽、圆点中心在 12，若用 left:50% + translateX(-50%) 线会坐到 11.75，
   * 在 2x 屏上横跨两个物理像素被抗锯齿摊开，看起来就比 0.5px 粗。
   */
  const line = {
    position: 'absolute' as const,
    left: 12,
    width: 0.5,
    background: 'var(--line-l3, rgba(0,0,0,0.3))',
  };
  return (
    <div
      className="relative flex w-[24px] shrink-0 flex-col items-center self-stretch"
      style={{ paddingTop: 3 }}
    >
      <span
        className="relative flex size-[14px] shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--b-r05, rgba(0,0,0,0.05))' }}
      >
        <span className="size-[6px] rounded-full" style={{ background: 'rgba(0,0,0,0.2)' }} />
      </span>
      {!isFirst && <span style={{ ...line, top: 0, height: 3 }} />}
      {!isLast && <span style={{ ...line, top: 17, bottom: 0 }} />}
    </div>
  );
}

/* ══════════ Signals ══════════ */

export function SignalCard({ signal }: { signal: ThesisSignal }) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{
        gap: 'var(--spacing-s, 12px)',
        padding: 'var(--spacing-xl, 24px) 0',
        borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
      }}
    >
      <div
        className="flex w-full flex-col items-start overflow-hidden"
        style={{
          gap: 'var(--spacing-xs, 8px)',
          padding: 'var(--spacing-s, 12px)',
          borderRadius: 'var(--radius-ct-l, 8px)',
          background: 'var(--b-r03, rgba(0,0,0,0.03))',
        }}
      >
        <div className="flex w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-xs, 8px)' }}>
          <img
            src={signal.avatar}
            alt={signal.name}
            className="size-[24px] shrink-0 rounded-full object-cover"
            style={{ border: '0.5px solid var(--b0-container, #fff)' }}
          />
          <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
            <div
              className="flex w-full items-center overflow-hidden"
              style={{ gap: 'var(--spacing-xs, 8px)', marginBottom: -4 }}
            >
              <span
                className="min-w-0 flex-1 truncate"
                style={{ ...T12, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
              >
                {signal.name}
              </span>
              <span
                className="shrink-0 whitespace-nowrap"
                style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
              >
                {signal.time}
              </span>
            </div>
            <span className="w-full" style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              {signal.role}
            </span>
          </div>
        </div>
        <p className="w-full" style={{ ...T14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {signal.quote} <SourceLink label={signal.link} href={`https://${signal.link}`} size={14} />
        </p>
      </div>

      <div className="relative flex w-full flex-col items-start overflow-hidden">
        <p className="w-full" style={{ ...T14, textIndent: 60, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {signal.alva}
        </p>
        <span
          className="absolute left-0 top-0 flex h-[22px] items-center justify-center"
          style={{
            gap: 'var(--spacing-xxs, 4px)',
            padding: '0 6px',
            borderRadius: 'var(--radius-ct-s, 4px)',
            background: 'var(--main-m1-10, rgba(73,163,166,0.1))',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}thesis-demo/alva-inline-logo.svg`}
            alt=""
            className="size-[12px] shrink-0"
          />
          <span style={{ ...T12, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva</span>
        </span>
      </div>
    </div>
  );
}

/* ══════════ Related theses ══════════ */

export function RelatedCard({ item }: { item: RelatedThesis }) {
  const isNew = item.kind === 'new';
  return (
    <div
      className="flex w-full flex-col items-start overflow-hidden"
      style={{
        gap: 'var(--spacing-s, 12px)',
        padding: 'var(--spacing-m, 16px) var(--spacing-l, 20px) var(--spacing-s, 12px)',
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        borderRadius: 'var(--radius-ct-l, 8px)',
      }}
    >
      <div className="flex w-full flex-col items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <div className="flex w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-xs, 8px)' }}>
          <img
            src={item.avatar}
            alt={item.name}
            className="size-[32px] shrink-0 rounded-full object-cover"
            style={{ border: '0.5px solid var(--b0-container, #fff)' }}
          />
          <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
            <div
              className="flex w-full items-center overflow-hidden"
              style={{ gap: 'var(--spacing-xs, 8px)', marginBottom: -4 }}
            >
              <span
                className="shrink-0 truncate"
                style={{ ...T14, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
              >
                {item.name}
              </span>
              <span
                className="min-w-0 flex-1 truncate text-right"
                style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
              >
                {item.time}
              </span>
            </div>
            <span className="w-full" style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              {item.role}
            </span>
          </div>
        </div>

        <span
          className="flex items-center justify-center"
          style={{
            padding: '1px 6px',
            borderRadius: 'var(--radius-ct-s, 4px)',
            background: isNew ? 'var(--main-m3-10, rgba(42,155,125,0.1))' : M2_10,
            color: isNew ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m2, #2196F3)',
            ...T12,
            fontWeight: 500,
          }}
        >
          {isNew ? 'New thesis' : 'Thesis update'}
        </span>

        <div className="w-full" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {item.paragraphs.map((text, i) => (
            <p key={i} style={{ ...T14, marginTop: i === 0 ? 0 : PARA_GAP }}>
              {text}
            </p>
          ))}
        </div>
      </div>

      <MediaRow items={item.charts} />

      <div className="flex w-full flex-wrap items-center" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        {item.tickers.map((t) => (
          <TickerChip key={typeof t === 'string' ? t : t.symbol} ticker={t} />
        ))}
      </div>

      <div className="flex min-h-[36px] w-full items-center justify-between">
        <button
          type="button"
          className="flex h-[28px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0"
          style={{ gap: 'var(--spacing-xxs, 4px)' }}
        >
          <CdnIcon name="chat-ai-l" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
          <span style={{ ...T12, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Ask Alva</span>
        </button>
        <button
          type="button"
          className="flex h-[36px] shrink-0 cursor-pointer items-center border-none bg-transparent p-0"
          style={{ gap: 'var(--spacing-xxs, 4px)' }}
          aria-label="Save"
        >
          <CdnIcon
            name={item.saved ? 'bookmark-f' : 'bookmark-l'}
            size={16}
            color={item.saved ? 'var(--main-m1, #49A3A6)' : 'var(--text-n7, rgba(0,0,0,0.7))'}
          />
          <span
            style={{
              ...T12,
              color: item.saved ? 'var(--main-m1, #49A3A6)' : 'var(--text-n7, rgba(0,0,0,0.7))',
            }}
          >
            {item.saves}
          </span>
        </button>
      </div>
    </div>
  );
}

/** 稿上两列各 470、列间 20、顶部 20；放不下两列就退单列 */
const MASONRY_TWO_COL_MIN = 960;

function RelatedMasonry() {
  const ref = useRef<HTMLDivElement>(null);
  const [twoCol, setTwoCol] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (w: number) => setTwoCol(w >= MASONRY_TWO_COL_MIN);
    apply(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => apply(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const columns: RelatedThesis[][] = twoCol ? [[], []] : [[]];
  RELATED_THESES.forEach((r, i) => columns[twoCol ? i % 2 : 0].push(r));

  return (
    <div
      ref={ref}
      className="flex w-full items-start"
      style={{ gap: 'var(--spacing-l, 20px)', paddingTop: 'var(--spacing-l, 20px)' }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className="flex min-w-0 flex-1 flex-col"
          style={{ gap: 'var(--spacing-l, 20px)' }}
        >
          {col.map((r) => (
            <RelatedCard key={r.id} item={r} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ══════════ 证据面板 · tab + 列表 ══════════ */

export type EvidenceTab = 'signals' | 'related';

export function EvidencePanel({
  tab,
  onTabChange,
  stickyTop = 0,
}: {
  tab: EvidenceTab;
  onTabChange: (t: EvidenceTab) => void;
  /** tab 行吸顶的偏移：主滚动区要让开 64 的页头，右侧栏自己滚则给 0 */
  stickyTop?: number;
}) {
  const items: { key: EvidenceTab; label: string }[] = [
    { key: 'signals', label: `Signals (${THESIS_SIGNALS.length})` },
    { key: 'related', label: `Related theses (${RELATED_THESES.length})` },
  ];
  return (
    <div className="flex w-full flex-col items-start">
      <div
        className="sticky z-[5] flex w-full items-start"
        style={{
          top: stickyTop,
          gap: 'var(--spacing-s, 12px)',
          background: 'var(--b0-container, #fff)',
          borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
        }}
      >
        <div className="flex min-w-0 flex-1 items-center" style={{ gap: 'var(--spacing-m, 16px)' }}>
          {items.map((it) => {
            const active = it.key === tab;
            return (
              <button
                key={it.key}
                type="button"
                onClick={() => onTabChange(it.key)}
                className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0"
                style={{
                  gap: 'var(--spacing-xxs, 4px)',
                  paddingBottom: 6,
                  borderBottom: active ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent',
                  ...T14,
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))',
                }}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'signals' ? (
        THESIS_SIGNALS.map((s) => <SignalCard key={s.id} signal={s} />)
      ) : (
        <RelatedMasonry />
      )}
    </div>
  );
}

/* ══════════ Historical updates 弹窗（Figma 17029:52419） ══════════ */

export function HistoryModal({
  versions,
  onClose,
}: {
  versions: ThesisVersion[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      /* 稿上遮罩是 main/m7 = 0.6 黑；Baby 同名 token 是 0.5，值不同故不绑 */
      style={{ background: 'rgba(0,0,0,0.6)', padding: 24 }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex w-[800px] max-w-full flex-col"
        style={{
          maxHeight: 'calc(100vh - 120px)',
          padding: 'var(--spacing-xxl, 28px)',
          gap: 'var(--spacing-l, 20px)',
          /* Popup/radius-pop-dialog = 8，module/b-dialog = #fff */
          borderRadius: 8,
          background: 'var(--b0-container, #fff)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.16)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Historical updates"
      >
        <div className="flex w-full shrink-0 items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
          <span
            className="min-w-0 flex-1"
            style={{
              fontSize: 18,
              lineHeight: '28px',
              letterSpacing: '0.18px',
              fontWeight: 500,
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
            }}
          >
            Historical updates
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0"
            aria-label="Close"
          >
            <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {versions.map((v, i) => (
            <div key={v.id} className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
              <HistoryRail isFirst={i === 0} isLast={i === versions.length - 1} />
              <div
                className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
                style={{ paddingBottom: 32 }}
              >
                <FeedContent version={v} showLatestTag />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
