/**
 * [INPUT]: AppShell, Topbar, Widget 组件
 * [OUTPUT]: Workspace 看板（合并 Dashboard Playbook + Dashboard Workspace 全部 Widgets）
 * [POS]: 页面层 — Workspace
 *
 * 布局（自上而下）：
 *   Row 1: FigmaWatchlistWidget（全宽）
 *   Row 2: MarkdownWidget | NVDATechAnalysisWidget（1:1）
 *   Row 3: NVDAGoogleTrendWidget | NVDAPriceVsSPYWidget（1:1）
 */

import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { FigmaWatchlistWidget } from '@/widgets/FigmaWatchlistWidget';
import { MarkdownWidget } from '@/widgets/MarkdownWidget';
import { NVDATechAnalysisWidget } from '@/widgets/NVDATechAnalysisWidget';
import { NVDAGoogleTrendWidget } from '@/widgets/NVDAGoogleTrendWidget';
import { NVDAPriceVsSPYWidget } from '@/widgets/NVDAPriceVsSPYWidget';

/* ========== 页面 ========== */

export function DashboardWorkspace({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="workspace" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="Workspace" />
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">

            {/* Row 1: Figma Watchlist（全宽，来自 Dashboard Playbook） */}
            <FigmaWatchlistWidget />

            {/* Row 2: Markdown | Tech Analysis（来自 Dashboard Workspace） */}
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <div className="flex-[1_0_0] min-w-0">
                <MarkdownWidget />
              </div>
              <div className="flex-[1_0_0] min-w-0">
                <NVDATechAnalysisWidget />
              </div>
            </div>

            {/* Row 4: Google Trend | Price vs SPY（来自 Dashboard Workspace） */}
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <NVDAGoogleTrendWidget />
              <NVDAPriceVsSPYWidget />
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
