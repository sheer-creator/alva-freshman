/**
 * [INPUT]: onNavigate
 * [OUTPUT]: Thesis 详情页 —— 两套布局方案，可在页面左下角切换
 * [POS]: Page 层 — hash `#thesis-demo`，也可由路径 /thesis-demo 进入（App.tsx 做了映射）
 *
 * 结构 1-1（Figma 16985:104994 / 16984:35134 / 17029:32668）
 *   宽：左栏按版本铺开整条时间轴，右栏放 Signals / Related theses
 *   窄：单列，只留最新版本 + View all 入口，证据面板下移；展开后列出全部版本并给 Collapse
 * 结构 1-2（Figma 17029:51029 / 17029:51053）
 *   宽：左栏当前版本 + 证据面板，右栏放 Historical updates
 *   窄：右栏收成正文下方的横向时间轴
 *
 * 两套都按内容区自身宽度切换，对话框挤压与窗口缩放走同一条判断。
 */

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  EvidencePanel,
  FeedContent,
  HistoryModal,
  HistoryRail,
  RailLinkRow,
  ThesisHeader,
  T12,
  T14,
  type EvidenceTab,
} from '@/app/components/thesis/ThesisParts';
import { THESIS_VERSIONS } from '@/data/thesis-demo';

/* ══════════ 方案切换 ══════════ */

type Layout = '1-1' | '1-2';
const LAYOUT_KEY = 'thesisDemoLayout';
const DEFAULT_LAYOUT: Layout = '1-2';

function isLayout(v: unknown): v is Layout {
  return v === '1-1' || v === '1-2';
}

function readLayout(): Layout {
  try {
    const query = window.location.hash.split('?')[1];
    const fromUrl = new URLSearchParams(query ?? '').get('layout');
    if (isLayout(fromUrl)) return fromUrl;
    const saved = localStorage.getItem(LAYOUT_KEY);
    if (isLayout(saved)) return saved;
  } catch {
    /* 隐私模式下 localStorage 会抛，忽略即可 */
  }
  return DEFAULT_LAYOUT;
}

function persistLayout(next: Layout) {
  try {
    localStorage.setItem(LAYOUT_KEY, next);
  } catch {
    /* ignore */
  }
  const [base, query] = window.location.hash.slice(1).split('?');
  const params = new URLSearchParams(query ?? '');
  params.set('layout', next);
  window.location.hash = `${base || 'thesis-demo'}?${params.toString()}`;
}

function LayoutSwitcher({ layout, onChange }: { layout: Layout; onChange: (l: Layout) => void }) {
  return (
    <div
      className="fixed left-1/2 top-[16px] z-40 flex -translate-x-1/2 items-center lg:ml-[114px]"
      style={{
        gap: 2,
        padding: 3,
        borderRadius: 999,
        border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
        background: 'var(--b0-container, #fff)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
      }}
    >
      {(['1-1', '1-2'] as Layout[]).map((l) => {
        const active = l === layout;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            className="cursor-pointer whitespace-nowrap border-none"
            style={{
              ...T12,
              padding: '3px 10px',
              borderRadius: 999,
              fontWeight: active ? 500 : 400,
              background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'transparent',
              color: active ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5, rgba(0,0,0,0.5))',
            }}
          >
            结构 {l}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════ 断点：内容区窄于这个宽度就放不下右栏 ══════════ */
/** 1-1：窄态正文区 724 + 证据栏 451 */
const MIN_1_1 = 1175;
/** 1-2：窄态正文区 724 + 历史栏 456 */
const MIN_1_2 = 1180;

/** 量内容区自身宽度，所以对话框挤压和窗口缩放会走同一条判断 */
function useWideEnough(min: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (w: number) => setWide(w >= min);
    apply(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [min]);
  return { ref, wide };
}

const SIDE_PAD = 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px)';

/* ══════════ 结构 1-1 ══════════ */

function Layout11({ tab, onTabChange }: { tab: EvidenceTab; onTabChange: (t: EvidenceTab) => void }) {
  const { ref, wide } = useWideEnough(MIN_1_1);
  const [expanded, setExpanded] = useState(false);
  const versions = THESIS_VERSIONS;
  /** 窄栏折叠时只留最新一版 */
  const shown = wide || expanded ? versions : versions.slice(0, 1);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 items-stretch">
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px) 80px' }}>
        {/* 时间轴区 —— View all / Collapse 只在这一段内吸底，滚到末尾就衔接回时间轴 */}
        <div className="relative flex w-full flex-col">
          {shown.map((v, i) => (
            <div key={v.id} className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
              <HistoryRail isFirst={i === 0} isLast={wide && i === shown.length - 1} />
              <div
                className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
                style={{ paddingBottom: 40 }}
              >
                <FeedContent version={v} showLatestTag />
              </div>
            </div>
          ))}

          {!wide && (
            <div
              className="sticky bottom-0 z-[1]"
              style={{ background: 'var(--b0-container, #fff)', paddingBottom: 'var(--spacing-xl, 24px)' }}
            >
              <RailLinkRow
                label={expanded ? 'Collapse' : `View all ${versions.length} updates`}
                icon={expanded ? 'arrow-up-l2' : 'arrow-right-l2'}
                onClick={() => setExpanded((v) => !v)}
              />
            </div>
          )}
        </div>

        {!wide && (
          <div style={{ paddingTop: 'var(--spacing-xl, 24px)' }}>
            <EvidencePanel tab={tab} onTabChange={onTabChange} />
          </div>
        )}
      </div>

      {wide && (
        <aside
          className="sticky top-[64px] block h-[calc(100vh-64px)] w-[451px] shrink-0 overflow-y-auto"
          style={{ borderLeft: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', padding: SIDE_PAD }}
        >
          <EvidencePanel tab={tab} onTabChange={onTabChange} />
        </aside>
      )}
    </div>
  );
}

/* ══════════ 结构 1-2 ══════════ */

function TimelineStrip({
  versions,
  activeId,
  onSelect,
  onOpenHistory,
}: {
  versions: typeof THESIS_VERSIONS;
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
              <span className="flex h-[8px] w-full items-center overflow-hidden" style={{ gap: 'var(--spacing-xxs, 4px)' }}>
                <span
                  className="size-[8px] shrink-0 rounded-full"
                  style={
                    active
                      ? { background: 'var(--main-m2, #2196F3)' }
                      : { background: '#fff', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }
                  }
                />
                {!last && (
                  <span className="h-0 min-w-px flex-1" style={{ borderTop: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }} />
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

function Layout12({ tab, onTabChange }: { tab: EvidenceTab; onTabChange: (t: EvidenceTab) => void }) {
  const { ref, wide } = useWideEnough(MIN_1_2);
  const [activeId, setActiveId] = useState(THESIS_VERSIONS[0].id);
  const [historyOpen, setHistoryOpen] = useState(false);

  const activeVersion = useMemo(
    () => THESIS_VERSIONS.find((v) => v.id === activeId) ?? THESIS_VERSIONS[0],
    [activeId],
  );
  const history = useMemo(() => THESIS_VERSIONS.filter((v) => v.id !== activeId), [activeId]);
  const strip = useMemo(() => [...THESIS_VERSIONS].reverse(), []);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 items-stretch">
      <div className="flex min-w-0 flex-1 flex-col" style={{ padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px) 80px' }}>
        <FeedContent version={activeVersion} showLatestTag />

        {!wide && (
          <TimelineStrip
            versions={strip}
            activeId={activeId}
            onSelect={setActiveId}
            onOpenHistory={() => setHistoryOpen(true)}
          />
        )}

        <div style={{ paddingTop: 40 }}>
          <EvidencePanel tab={tab} onTabChange={onTabChange} />
        </div>
      </div>

      {wide && (
        <aside
          className="sticky top-[64px] block h-[calc(100vh-64px)] w-[456px] shrink-0 overflow-y-auto"
          style={{ borderLeft: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))', padding: SIDE_PAD }}
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
                style={{ paddingBottom: 40 }}
              >
                <FeedContent version={v} showLatestTag={false} />
              </div>
            </div>
          ))}
        </aside>
      )}

      {historyOpen && <HistoryModal versions={history} onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}

/* ══════════ 页面 ══════════ */

export default function ThesisDemo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [layout, setLayout] = useState<Layout>(readLayout);
  const [tab, setTab] = useState<EvidenceTab>('signals');

  const changeLayout = (next: Layout) => {
    setLayout(next);
    persistLayout(next);
  };

  return (
    <AppShell activePage="thesis-demo" onNavigate={onNavigate}>
      <style>{`.thesis-media-row{scrollbar-width:none}.thesis-media-row::-webkit-scrollbar{display:none}`}</style>

      <div className="flex min-h-full flex-col" style={{ background: 'var(--b0-container, #fff)' }}>
        <div className="sticky top-0 z-10">
          <ThesisHeader />
        </div>
        {layout === '1-1' ? (
          <Layout11 tab={tab} onTabChange={setTab} />
        ) : (
          <Layout12 tab={tab} onTabChange={setTab} />
        )}
      </div>

      <LayoutSwitcher layout={layout} onChange={changeLayout} />
    </AppShell>
  );
}
