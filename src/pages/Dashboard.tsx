/**
 * [INPUT]: AppShell, Topbar, BottomToolbar, Figma Widget + real Widget 组件
 * [OUTPUT]: 主看板页面（Figma 静态内容 + NVDA 实时图表）
 * [POS]: 页面层 — Dashboard Playbook
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PlaybookTopbar } from '@/app/components/community/PlaybookTopbar';
import { DiscussionPanel } from '@/app/components/community/DiscussionPanel';
import { MOCK_CUSTOM_LAYOUT } from '@/data/community-mock';
import { FigmaWatchlistWidget } from '@/widgets/FigmaWatchlistWidget';
import { NVDAGoogleTrendWidget } from '@/widgets/NVDAGoogleTrendWidget';

/* ========== 页面 ========== */

export default function Dashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [discussionOpen, setDiscussionOpen] = useState(false);

  return (
    <AppShell activePage="dashboard" onNavigate={onNavigate}>
      <div className="flex h-full">
        <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <PlaybookTopbar
            title={MOCK_CUSTOM_LAYOUT.name}
            stats={MOCK_CUSTOM_LAYOUT.stats}
            signals={MOCK_CUSTOM_LAYOUT.signals}
            lineage={MOCK_CUSTOM_LAYOUT.lineage}
            comments={MOCK_CUSTOM_LAYOUT.discussion}
            discussionOpen={discussionOpen}
            onToggleDiscussion={() => setDiscussionOpen(v => !v)}
            author={MOCK_CUSTOM_LAYOUT.author}
            pulse={MOCK_CUSTOM_LAYOUT.pulse}
            description={MOCK_CUSTOM_LAYOUT.description}
            builtOn={MOCK_CUSTOM_LAYOUT.builtOn}
            onAuthorClick={() => onNavigate('user-profile')}
          />
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">
            <FigmaWatchlistWidget />
            <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
              <NVDAGoogleTrendWidget />
            </div>
          </div>
        </div>
      </div>
        </div>
        <DiscussionPanel
          open={discussionOpen}
          onClose={() => setDiscussionOpen(false)}
          comments={MOCK_CUSTOM_LAYOUT.discussion}
          agentTake={MOCK_CUSTOM_LAYOUT.agentTake}
        />
      </div>
    </AppShell>
  );
}
