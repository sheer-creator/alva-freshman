/**
 * [INPUT]: AppShell, Topbar, BottomToolbar, Figma Widget + real Widget 组件
 * [OUTPUT]: 主看板页面（Figma 静态内容 + NVDA 实时图表）
 * [POS]: 页面层 — Dashboard Playbook
 */

import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Topbar } from '@/app/components/shell/Topbar';
import { BottomToolbar } from '@/app/components/shell/BottomToolbar';
import { FigmaWatchlistWidget } from '@/widgets/FigmaWatchlistWidget';
import { FigmaEarningsTableWidget } from '@/widgets/FigmaEarningsTableWidget';
import { FigmaPostsWidget } from '@/widgets/FigmaPostsWidget';
import { NVDAGoogleTrendWidget } from '@/widgets/NVDAGoogleTrendWidget';

/* ========== 页面 ========== */

export default function Dashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="dashboard" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <Topbar title="AI Storage Theme Dashboard" />
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">
            <FigmaWatchlistWidget />
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <NVDAGoogleTrendWidget />
            </div>
            <FigmaEarningsTableWidget />
            <FigmaPostsWidget />
          </div>
        </div>
      </div>
      <BottomToolbar />
    </AppShell>
  );
}
