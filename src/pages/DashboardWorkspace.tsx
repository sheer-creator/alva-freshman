/**
 * [INPUT]: AppShell, Topbar, BottomToolbar, Widget 组件
 * [OUTPUT]: Workspace 看板（4 个 Widget 的 2×2 布局）
 * [POS]: 页面层 — Dashboard Workspace
 */

import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
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
          <Topbar title="Dashboard Workspace" />
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <div className="flex-[1_0_0] min-w-0">
                <MarkdownWidget />
              </div>
              <div className="flex-[1_0_0] min-w-0">
                <NVDATechAnalysisWidget />
              </div>
            </div>
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
