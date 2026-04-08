/**
 * [INPUT]: AppShell, Topbar, Widget 组件
 * [OUTPUT]: Workspace 看板
 * [POS]: 页面层 — Workspace
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PlaybookTopbar } from '@/app/components/community/PlaybookTopbar';
import { DiscussionPanel } from '@/app/components/community/DiscussionPanel';
import { MOCK_WORKSPACE } from '@/data/community-mock';
import { FigmaWatchlistWidget } from '@/widgets/FigmaWatchlistWidget';

/* ========== 页面 ========== */

export function DashboardWorkspace({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [discussionOpen, setDiscussionOpen] = useState(false);

  const toggleDiscussion = () => {
    setDiscussionOpen(v => !v);
  };

  return (
    <AppShell activePage="workspace" onNavigate={onNavigate}>
      <div className="flex h-full">
        <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <PlaybookTopbar
            title={MOCK_WORKSPACE.name}
            stats={MOCK_WORKSPACE.stats}
            lineage={MOCK_WORKSPACE.lineage}
            comments={MOCK_WORKSPACE.discussion}
            discussionOpen={discussionOpen}
            onToggleDiscussion={toggleDiscussion}
            author={MOCK_WORKSPACE.author}
            pulse={MOCK_WORKSPACE.pulse}
            description={MOCK_WORKSPACE.description}
            builtOn={MOCK_WORKSPACE.builtOn}
            onAuthorClick={() => onNavigate('user-profile')}
            onNavigate={onNavigate}
          />
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full">
            <FigmaWatchlistWidget />
          </div>
        </div>
      </div>
        </div>
        <DiscussionPanel
          open={discussionOpen}
          onClose={() => setDiscussionOpen(false)}
          comments={MOCK_WORKSPACE.discussion}
          agentTake={MOCK_WORKSPACE.agentTake}
        />
      </div>
    </AppShell>
  );
}
