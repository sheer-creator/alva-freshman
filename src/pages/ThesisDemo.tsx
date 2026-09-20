/**
 * [INPUT]: onNavigate
 * [OUTPUT]: Thesis 详情页 —— 固定上下单列，正文最宽 960 居中
 * [POS]: Page 层 — hash `#thesis-demo`，也可由路径 /thesis-demo 进入（App.tsx 做了映射）
 *
 * 照 Figma「Thesis V1」17067:94502 的 Thesis Detail：
 * 当前版本在上，紧邻的上一版只露一截被渐变压住，下面居中一个 View all 按钮开历史弹窗，
 * 再往下是 Signals / Related theses。不设断点，对话框展开时正文跟着容器压缩。
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import {
  EvidencePanel,
  FeedContent,
  HistoryModal,
  HistoryRail,
  ThesisHeader,
  T14,
  type EvidenceTab,
} from '@/app/components/thesis/ThesisParts';
import { THESIS_VERSIONS, type ThesisVersion } from '@/data/thesis-demo';

/** 正文最宽 960，两侧留 28，其余交给容器压缩 */
const CONTENT_MAX = 960;
const SIDE_GUTTER = 28;

/**
 * 折叠态（Figma 17067:84618）：紧邻的上一版只露 240 高，
 * 底部压 60 的白色渐变，再接一条 54 高的 0.95 白底，居中放 View all 按钮。
 * 正文限宽居中，渐变和按钮条走通栏。
 */
function CollapsedPreview({
  version,
  total,
  onExpand,
}: {
  version: ThesisVersion;
  total: number;
  onExpand: () => void;
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 240 }}>
      <div style={{ padding: `0 ${SIDE_GUTTER}px` }}>
        <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX }}>
          <div className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
            {/* 下面还有更多版本，竖线要继续往下画，交给渐变淡出 */}
            <HistoryRail isFirst={false} isLast={false} />
            <div className="flex min-w-0 flex-1 flex-col items-start overflow-hidden">
              {/* 渲染整段内容，由 240 的高度裁切 */}
              <FeedContent version={version} showLatestTag={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div
          style={{
            height: 60,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))',
          }}
        />
        <div
          className="flex w-full items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.95)', height: 54 }}
        >
          <button
            type="button"
            onClick={onExpand}
            className="flex shrink-0 cursor-pointer items-center justify-center"
            style={{
              gap: 2,
              padding: '6px 16px',
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

/* ══════════ 页面 ══════════ */

export default function ThesisDemo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<EvidenceTab>('signals');
  const [historyOpen, setHistoryOpen] = useState(false);

  const current = THESIS_VERSIONS[0];
  const next = THESIS_VERSIONS[1];

  return (
    <AppShell activePage="thesis-demo" onNavigate={onNavigate}>
      <style>{`.thesis-media-row{scrollbar-width:none}.thesis-media-row::-webkit-scrollbar{display:none}`}</style>

      <div className="flex min-h-full flex-col" style={{ background: 'var(--b0-container, #fff)' }}>
        <div className="sticky top-0 z-10">
          <ThesisHeader />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div style={{ padding: `var(--spacing-xl, 24px) ${SIDE_GUTTER}px 0` }}>
            <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX }}>
              <div className="flex w-full items-start" style={{ gap: 'var(--spacing-xs, 8px)' }}>
                <HistoryRail isFirst isLast={false} />
                <div
                  className="flex min-w-0 flex-1 flex-col items-start overflow-hidden"
                  style={{ paddingBottom: 32 }}
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
            />
          )}

          <div style={{ padding: `0 ${SIDE_GUTTER}px 80px` }}>
            <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX, paddingTop: 28 }}>
              <EvidencePanel tab={tab} onTabChange={setTab} stickyTop={64} />
            </div>
          </div>
        </div>
      </div>

      {historyOpen && <HistoryModal versions={THESIS_VERSIONS} onClose={() => setHistoryOpen(false)} />}
    </AppShell>
  );
}
