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

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  EvidencePanel,
  FeedContent,
  HistoryModal,
  HistoryRail,
  ThesisHeader,
  T12,
  T14,
  type EvidenceTab,
} from '@/app/components/thesis/ThesisParts';
import { THESIS_VERSIONS, type ThesisVersion } from '@/data/thesis-demo';

/* ══════════ 方案切换 ══════════ */

type Layout = '1-1' | '1-2' | '3-2';
const LAYOUT_KEY = 'thesisDemoLayout';
const DEFAULT_LAYOUT: Layout = '1-2';

function isLayout(v: unknown): v is Layout {
  return v === '1-1' || v === '1-2' || v === '3-2';
}

function readLayout(): Layout {
  try {
    // 两种写法都认：#thesis-demo?layout=1-1 和 /thesis-demo?layout=1-1
    const fromHash = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('layout');
    if (isLayout(fromHash)) return fromHash;
    const fromSearch = new URLSearchParams(window.location.search).get('layout');
    if (isLayout(fromSearch)) return fromSearch;
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
      {(['1-1', '1-2', '3-2'] as Layout[]).map((l) => {
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
/** 结构 3-2：固定单列，正文最宽 960，两侧留 28，其余交给容器压缩 */
const CONTENT_MAX = 960;
const SIDE_GUTTER = 28;

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

/**
 * 折叠态（Figma 17067:57619 / 17067:56330）：紧邻的上一版只露 110 高，
 * 上面压 62 的白色渐变，再接一条 0.95 白底的条，居中放 View all 按钮。
 */
function CollapsedPreview({
  version,
  total,
  onExpand,
  maxWidth,
  sidePad,
}: {
  version: ThesisVersion;
  total: number;
  onExpand: () => void;
  /** 结构 3-2 用：正文限宽居中，渐变和按钮条仍然通栏 */
  maxWidth?: number;
  sidePad?: number;
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 110 }}>
      <div style={{ padding: sidePad ? `0 ${sidePad}px` : undefined }}>
      <div className="mx-auto w-full" style={{ maxWidth }}>
      <div className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        {/* 折叠预览下面还有更多版本，竖线要继续往下画，交给渐变淡出 */}
        <HistoryRail isFirst={false} isLast={false} />
        <div
          className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
          style={{ gap: 'var(--spacing-xs, 8px)' }}
        >
          <span style={{ ...T12, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{version.time}</span>
          {/* 这里只露两三行就被渐变吃掉，段落连成一段，免得中间卡出半截空行 */}
          <p style={{ ...T14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{version.paragraphs.join(' ')}</p>
        </div>
      </div>
      </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div
          style={{
            height: 62,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))',
          }}
        />
        <div
          className="flex w-full items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.95)', padding: '8px 0' }}
        >
          <button
            type="button"
            onClick={onExpand}
            className="flex shrink-0 cursor-pointer items-center justify-center"
            style={{
              gap: 2,
              padding: '5px 16px',
              borderRadius: 960,
              background: 'var(--b0-container, #fff)',
              border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
              boxShadow: 'var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05))',
            }}
          >
            <span className="whitespace-nowrap" style={{ ...T14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              View all {total} updates
            </span>
            <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 窄栏主体 —— 两套方案在这个宽度下长得一样
 * （Figma 1-1 的 16984:35143 与 1-2 的 17067:57613 结构一致）。
 */
function NarrowBody({
  tab,
  onTabChange,
  onOpenHistory,
}: {
  tab: EvidenceTab;
  onTabChange: (t: EvidenceTab) => void;
  onOpenHistory: () => void;
}) {
  const current = THESIS_VERSIONS[0];
  const next = THESIS_VERSIONS[1];
  return (
    <>
      <div className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
        <HistoryRail isFirst isLast={false} />
        <div
          className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
          style={{ paddingBottom: 40 }}
        >
          <FeedContent version={current} showLatestTag />
        </div>
      </div>

      {next && (
        <CollapsedPreview version={next} total={THESIS_VERSIONS.length} onExpand={onOpenHistory} />
      )}

      <div style={{ paddingTop: 40 }}>
        <EvidencePanel tab={tab} onTabChange={onTabChange} />
      </div>
    </>
  );
}

/* ══════════ 结构 1-1 ══════════ */

function Layout11({ tab, onTabChange }: { tab: EvidenceTab; onTabChange: (t: EvidenceTab) => void }) {
  const { ref, wide } = useWideEnough(MIN_1_1);
  const [historyOpen, setHistoryOpen] = useState(false);
  const history = useMemo(() => THESIS_VERSIONS.slice(1), []);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 items-stretch">
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{ padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px) 80px' }}
      >
        {wide ? (
          THESIS_VERSIONS.map((v, i) => (
            <div key={v.id} className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
              <HistoryRail isFirst={i === 0} isLast={i === THESIS_VERSIONS.length - 1} />
              <div
                className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
                style={{ paddingBottom: 40 }}
              >
                <FeedContent version={v} showLatestTag />
              </div>
            </div>
          ))
        ) : (
          <NarrowBody tab={tab} onTabChange={onTabChange} onOpenHistory={() => setHistoryOpen(true)} />
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

      {historyOpen && <HistoryModal versions={history} onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}

/* ══════════ 结构 1-2 ══════════ */

function Layout12({ tab, onTabChange }: { tab: EvidenceTab; onTabChange: (t: EvidenceTab) => void }) {
  const { ref, wide } = useWideEnough(MIN_1_2);
  const [historyOpen, setHistoryOpen] = useState(false);
  const current = THESIS_VERSIONS[0];
  const history = useMemo(() => THESIS_VERSIONS.slice(1), []);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 items-stretch">
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{ padding: 'var(--spacing-xl, 24px) var(--spacing-xxl, 28px) 80px' }}
      >
        {wide ? (
          <>
            {/* 宽栏当前版本不带竖轨，历史全在右侧栏里 */}
            <FeedContent version={current} showLatestTag />
            <div style={{ paddingTop: 40 }}>
              <EvidencePanel tab={tab} onTabChange={onTabChange} />
            </div>
          </>
        ) : (
          <NarrowBody tab={tab} onTabChange={onTabChange} onOpenHistory={() => setHistoryOpen(true)} />
        )}
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

/* ══════════ 结构 3-2 ══════════ */

/**
 * 结构 3-2 —— 固定上下单列（Figma 17067:60491）：正文最宽 960 居中，两侧 28。
 * 不设断点，对话框展开时内容区变窄，正文跟着压缩即可。
 * 折叠预览的渐变和按钮条走通栏，只有正文限宽。
 */
function Layout32({ tab, onTabChange }: { tab: EvidenceTab; onTabChange: (t: EvidenceTab) => void }) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const current = THESIS_VERSIONS[0];
  const next = THESIS_VERSIONS[1];
  const history = useMemo(() => THESIS_VERSIONS.slice(1), []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div style={{ padding: `var(--spacing-xl, 24px) ${SIDE_GUTTER}px 0` }}>
        <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX }}>
          <div className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
            <HistoryRail isFirst isLast={false} />
            <div
              className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
              style={{ paddingBottom: 40 }}
            >
              <FeedContent version={current} showLatestTag />
            </div>
          </div>
        </div>
      </div>

      {next && (
        <CollapsedPreview
          version={next}
          total={THESIS_VERSIONS.length}
          onExpand={() => setHistoryOpen(true)}
          maxWidth={CONTENT_MAX}
          sidePad={SIDE_GUTTER}
        />
      )}

      <div style={{ padding: `0 ${SIDE_GUTTER}px 80px` }}>
        <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX, paddingTop: 40 }}>
          <EvidencePanel tab={tab} onTabChange={onTabChange} />
        </div>
      </div>

      {historyOpen && <HistoryModal versions={history} onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}

/* ══════════ 页面 ══════════ */

export default function ThesisDemo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [layout, setLayout] = useState<Layout>(readLayout);
  const [tab, setTab] = useState<EvidenceTab>('signals');

  // 手动改地址栏里的 layout 也要跟着切，不然只有点切换器才生效
  useEffect(() => {
    const onHash = () => setLayout(readLayout());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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
        ) : layout === '1-2' ? (
          <Layout12 tab={tab} onTabChange={setTab} />
        ) : (
          <Layout32 tab={tab} onTabChange={setTab} />
        )}
      </div>

      <LayoutSwitcher layout={layout} onChange={changeLayout} />
    </AppShell>
  );
}
