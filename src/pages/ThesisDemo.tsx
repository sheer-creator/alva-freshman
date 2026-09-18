/**
 * [INPUT]: onNavigate
 * [OUTPUT]: Thesis 详情页 —— 作者 header + 版本正文 + Signals / Related theses + 历史版本
 * [POS]: Page 层 — hash `#thesis-demo`，也可由路径 /thesis-demo 进入（App.tsx 做了映射）
 *
 * 两态照 Figma 17029:51029（对话框收起）与 17029:51053（对话框展开）：
 * 收起时历史版本走右侧 456 栏；展开后右栏收成正文下方的一条横向时间轴。
 */

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import { useChatContext } from '@/app/components/chat/ChatContext';
import {
  THESIS_AUTHOR,
  THESIS_VERSIONS,
  THESIS_SIGNALS,
  RELATED_THESES_COUNT,
  type ThesisVersion,
  type ThesisSignal,
} from '@/data/thesis-demo';

/* ══════════ 取自稿的排印 ══════════ */
const T14 = { fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px' } as const;
const T12 = { fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px' } as const;
/** 正文段与段之间是一个空行 */
const PARA_GAP = 22;

/**
 * 两栏断点：内容区窄于这个宽度就放不下右侧 456 的历史栏，
 * 改成正文下方的横向时间轴。窗口缩放和对话框挤压都走这一条判断，
 * 所以量的是内容区自身宽度，不是 viewport。
 * 724（稿上对话框展开时的正文区）+ 456（历史栏）= 1180。
 */
const TWO_COLUMN_MIN = 1180;

/* ══════════ 外链行 · dotted 下划线 + 溢出箭头 ══════════ */

function SourceLink({
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
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: 'var(--text-n5, rgba(0,0,0,0.5))',
        textDecorationSkipInk: 'none',
      }}
    >
      {label} 🡕
    </a>
  );
}

/* ══════════ Ticker chip ══════════ */

function TickerChip({ ticker }: { ticker: string }) {
  return (
    <div
      className="flex h-[28px] shrink-0 cursor-pointer items-center"
      style={{
        gap: 'var(--spacing-xxs, 4px)',
        padding: '4px var(--spacing-xs, 8px)',
        borderRadius: 'var(--radius-ct-m, 6px)',
        background: 'var(--b-r05, rgba(0,0,0,0.05))',
      }}
    >
      <TickerLogo ticker={ticker} size={16} />
      <span style={{ ...T12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{ticker}</span>
    </div>
  );
}

/* ══════════ 一个版本的正文（时间 + 段落 + 媒体 + tickers） ══════════ */

function FeedContent({ version, showLatestTag }: { version: ThesisVersion; showLatestTag: boolean }) {
  return (
    <div className="flex w-full flex-col items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
      {/* 时间 + Latest */}
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

      {/* 正文 */}
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

      {/* 媒体 · 全部 16:9 · 240×135 · 溢出横滑 */}
      {version.media.length > 0 && (
        <div
          className="thesis-media-row flex w-full items-start overflow-x-auto"
          style={{ gap: 'var(--spacing-xs, 8px)' }}
        >
          {version.media.map((m) => (
            <img
              key={m.src}
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
      )}

      {/* Tickers */}
      <div className="flex w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        {version.tickers.map((t) => (
          <TickerChip key={t} ticker={t} />
        ))}
      </div>
    </div>
  );
}

/* ══════════ 页头 ══════════ */

function ThesisHeader() {
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
          style={{
            ...T14,
            fontWeight: 500,
            color: 'var(--text-n9, rgba(0,0,0,0.9))',
            marginBottom: -2,
          }}
        >
          {THESIS_AUTHOR.name}
        </span>
        <span style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{THESIS_AUTHOR.role}</span>
      </div>
      <div className="flex shrink-0 items-center justify-end" style={{ gap: 'var(--spacing-xxs, 4px)' }}>
        <button
          type="button"
          className="flex cursor-pointer items-center border-none bg-transparent"
          style={{ gap: 'var(--spacing-xxs, 4px)', padding: 'var(--spacing-xs, 8px)' }}
          aria-label="Save thesis"
        >
          <CdnIcon name="bookmark-l" size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
          <span style={{ ...T12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{THESIS_AUTHOR.saves}</span>
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center border-none bg-transparent"
          style={{ gap: 'var(--spacing-xxs, 4px)', padding: 'var(--spacing-xs, 8px)' }}
          aria-label="Share thesis"
        >
          <CdnIcon name="share-l" size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>
    </div>
  );
}

/* ══════════ 横向时间轴（对话框展开时替代右栏） ══════════ */

function TimelineStrip({
  versions,
  activeId,
  onSelect,
  onOpenHistory,
}: {
  versions: ThesisVersion[];
  activeId: string;
  onSelect: (id: string) => void;
  onOpenHistory: () => void;
}) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{ gap: 'var(--spacing-xs, 8px)', paddingTop: 'var(--spacing-xxl, 28px)' }}
    >
      <div className="flex w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-s, 12px)' }}>
        {versions.map((v, i) => {
          const active = v.id === activeId;
          const last = i === versions.length - 1;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className="flex min-w-0 flex-1 cursor-pointer flex-col items-start overflow-hidden border-none bg-transparent p-0 text-left"
              style={{ gap: 'var(--spacing-xxs, 4px)' }}
            >
              <span
                className="flex h-[8px] w-full items-center overflow-hidden"
                style={{ gap: 'var(--spacing-xxs, 4px)' }}
              >
                <span
                  className="size-[8px] shrink-0 rounded-full"
                  style={
                    active
                      ? { background: 'var(--main-m2, #2196F3)' }
                      : { background: '#fff', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }
                  }
                />
                {!last && (
                  <span
                    className="h-0 min-w-px flex-1"
                    style={{ borderTop: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
                  />
                )}
              </span>
              <span className="whitespace-nowrap" style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                {v.time}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onOpenHistory}
          className="flex shrink-0 cursor-pointer items-center bg-transparent"
          style={{
            gap: 2,
            padding: '4px 12px',
            borderRadius: 960,
            border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          }}
        >
          <span className="whitespace-nowrap" style={{ ...T12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            Historical updates
          </span>
          <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>
    </div>
  );
}

/* ══════════ 右栏历史版本的竖轨 ══════════ */

function HistoryRail({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) {
  const line = '0.5px solid var(--line-l3, rgba(0,0,0,0.3))';
  return (
    <div
      className="relative flex w-[24px] shrink-0 flex-col items-center self-stretch"
      style={{ paddingTop: 'var(--spacing-xxs, 4px)' }}
    >
      <span
        className="relative flex size-[14px] shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--b-r05, rgba(0,0,0,0.05))' }}
      >
        <span
          className="size-[6px] rounded-full"
          style={{ background: 'rgba(0,0,0,0.2)' }}
        />
      </span>
      {!isFirst && (
        <span className="absolute left-1/2 top-0 h-[4px] w-0 -translate-x-1/2" style={{ borderLeft: line }} />
      )}
      {!isLast && (
        <span className="absolute bottom-0 left-1/2 top-[18px] w-0 -translate-x-1/2" style={{ borderLeft: line }} />
      )}
    </div>
  );
}

/* ══════════ Signals ══════════ */

function SignalCard({ signal }: { signal: ThesisSignal }) {
  return (
    <div
      className="flex w-full flex-col items-start"
      style={{
        gap: 'var(--spacing-s, 12px)',
        padding: 'var(--spacing-xl, 24px) 0',
        borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
      }}
    >
      {/* 来源卡 */}
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
          {signal.quote}{' '}
          <SourceLink label={signal.link} href={`https://${signal.link}`} size={14} />
        </p>
      </div>

      {/* Alva 解读 · chip 绝对定位左上，正文首行缩进 60 */}
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

function EvidenceTabs({
  tab,
  onChange,
}: {
  tab: 'signals' | 'related';
  onChange: (t: 'signals' | 'related') => void;
}) {
  const items = [
    { key: 'signals' as const, label: `Signals (${THESIS_SIGNALS.length})` },
    { key: 'related' as const, label: `Related theses (${RELATED_THESES_COUNT})` },
  ];
  return (
    <div
      className="flex w-full items-start"
      style={{ gap: 'var(--spacing-s, 12px)', borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
    >
      <div className="flex min-w-0 flex-1 items-center" style={{ gap: 'var(--spacing-m, 16px)' }}>
        {items.map((it) => {
          const active = it.key === tab;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
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
  );
}

/* ══════════ 页面 ══════════ */

export default function ThesisDemo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { closeChat } = useChatContext();

  const [activeId, setActiveId] = useState(THESIS_VERSIONS[0].id);
  const [tab, setTab] = useState<'signals' | 'related'>('signals');

  /* 内容区够宽才留右侧历史栏，否则收成横向时间轴 */
  const bodyRef = useRef<HTMLDivElement>(null);
  const [sideRail, setSideRail] = useState(true);
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const apply = (w: number) => setSideRail(w >= TWO_COLUMN_MIN);
    apply(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeVersion = useMemo(
    () => THESIS_VERSIONS.find((v) => v.id === activeId) ?? THESIS_VERSIONS[0],
    [activeId],
  );
  /** 右栏 Historical updates：当前版本以外的全部，新 → 旧 */
  const history = useMemo(() => THESIS_VERSIONS.filter((v) => v.id !== activeId), [activeId]);
  /** 横向时间轴：旧 → 新 */
  const strip = useMemo(() => [...THESIS_VERSIONS].reverse(), []);

  return (
    <AppShell activePage="thesis-demo" onNavigate={onNavigate}>
      <style>{`.thesis-media-row{scrollbar-width:none}.thesis-media-row::-webkit-scrollbar{display:none}`}</style>

      <div className="flex min-h-full flex-col" style={{ background: 'var(--b0-container, #fff)' }}>
        <div className="sticky top-0 z-10">
          <ThesisHeader />
        </div>

        <div ref={bodyRef} className="flex min-h-0 flex-1 items-stretch">
          {/* 左栏 · 当前版本 + 证据面板 */}
          <div
            className="flex min-w-0 flex-1 flex-col"
            style={{ padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px) 80px' }}
          >
            <FeedContent version={activeVersion} showLatestTag />

            {!sideRail && (
              <TimelineStrip
                versions={strip}
                activeId={activeId}
                onSelect={setActiveId}
                onOpenHistory={closeChat}
              />
            )}

            <div className="flex w-full flex-col items-start" style={{ paddingTop: 40 }}>
              <EvidenceTabs tab={tab} onChange={setTab} />
              {tab === 'signals' ? (
                THESIS_SIGNALS.map((s) => <SignalCard key={s.id} signal={s} />)
              ) : (
                <p
                  className="w-full"
                  style={{ ...T14, color: 'var(--text-n5, rgba(0,0,0,0.5))', paddingTop: 'var(--spacing-xl, 24px)' }}
                >
                  Related theses are not part of this mock.
                </p>
              )}
            </div>
          </div>

          {/* 右栏 · Historical updates · sticky */}
          {sideRail && (
            <aside
              className="sticky top-[64px] block h-[calc(100vh-64px)] w-[456px] shrink-0 overflow-y-auto"
              style={{
                borderLeft: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
                padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px)',
              }}
            >
              <span style={{ ...T14, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Historical updates</span>
              {history.map((v, i) => (
                <div
                  key={v.id}
                  className="flex w-full items-start"
                  style={{ gap: 'var(--spacing-xs, 8px)', paddingTop: i === 0 ? 'var(--spacing-s, 12px)' : 0 }}
                >
                  <HistoryRail isFirst={i === 0} isLast={i === history.length - 1} />
                  <div
                    className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
                    style={{ paddingBottom: i === history.length - 1 ? 0 : 40 }}
                  >
                    <FeedContent version={v} showLatestTag={false} />
                  </div>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </AppShell>
  );
}
