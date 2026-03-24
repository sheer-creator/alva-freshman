/**
 * [INPUT]: AppShell, Topbar, BottomToolbar, 6 个 NVDA Widget
 * [OUTPUT]: NVDA 全景看板页面
 * [POS]: 页面层 — NVDA 及相关题材的全方位研究看板
 *
 * 布局结构（自上而下）：
 *   Row 1: KPI 指标卡片网格（3×2）
 *   Row 2: 股价走势（宽）+ 投资逻辑（窄）  — 3:2
 *   Row 3: 营收拆分 + 产业链表现             — 1:1
 *   Row 4: 同业估值对比表格（全宽）
 */

import { useState, useEffect } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PlaybookTopbar } from '@/app/components/community/PlaybookTopbar';
import { DiscussionPanel } from '@/app/components/community/DiscussionPanel';
import { ChatPanel } from '@/app/components/community/ChatPanel';
import { MOCK_NVDA } from '@/data/community-mock';
import { getChatPanelOpen } from '@/data/alva-chat-mock';
import { BottomToolbar } from '@/app/components/shell/BottomToolbar';
import { NVDAStockPriceWidget } from '@/widgets/NVDAStockPriceWidget';
import { NVDAKeyMetricsWidget } from '@/widgets/NVDAKeyMetricsWidget';
import { NVDASupplyChainWidget } from '@/widgets/NVDASupplyChainWidget';
import { NVDARevenueSegmentWidget } from '@/widgets/NVDARevenueSegmentWidget';
import { NVDAPeerValuationWidget } from '@/widgets/NVDAPeerValuationWidget';
import { NVDAInvestmentThesisWidget } from '@/widgets/NVDAInvestmentThesisWidget';

export default function NVDADashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (getChatPanelOpen()) { setChatOpen(true); setDiscussionOpen(false); }
  }, []);

  const toggleDiscussion = () => {
    setDiscussionOpen(v => { if (!v) setChatOpen(false); return !v; });
  };
  const toggleChat = () => {
    setChatOpen(v => { if (!v) setDiscussionOpen(false); return !v; });
  };

  return (
    <AppShell activePage="nvda" onNavigate={onNavigate}>
      <div className="flex h-full">
        <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="flex flex-col items-center px-[28px] relative w-full">
          <PlaybookTopbar
            title={MOCK_NVDA.name}
            stats={MOCK_NVDA.stats}

            lineage={MOCK_NVDA.lineage}
            comments={MOCK_NVDA.discussion}
            discussionOpen={discussionOpen}
            onToggleDiscussion={toggleDiscussion}
            chatOpen={chatOpen}
            onToggleChat={toggleChat}
            author={MOCK_NVDA.author}
            pulse={MOCK_NVDA.pulse}
            description={MOCK_NVDA.description}
            builtOn={MOCK_NVDA.builtOn}
            onAuthorClick={() => onNavigate('user-profile')}
          />

          <div className="flex flex-col gap-[24px] pb-[56px] w-full">
            {/* Row 1: KPI 指标 */}
            <NVDAKeyMetricsWidget />

            {/* Row 2: 股价走势 + 投资逻辑 (3:2) */}
            <div className="grid grid-cols-[3fr_2fr] gap-[24px] w-full">
              <NVDAStockPriceWidget />
              <NVDAInvestmentThesisWidget />
            </div>

            {/* Row 3: 营收拆分 + 产业链表现 (1:1) */}
            <div className="grid grid-cols-2 gap-[24px] w-full">
              <NVDARevenueSegmentWidget />
              <NVDASupplyChainWidget />
            </div>

            {/* Row 4: 同业估值 */}
            <NVDAPeerValuationWidget />
          </div>
        </div>
      </div>
      </div>
        <DiscussionPanel
          open={discussionOpen}
          onClose={() => setDiscussionOpen(false)}
          comments={MOCK_NVDA.discussion}
          agentTake={MOCK_NVDA.agentTake}
        />
        <ChatPanel
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          onNavigate={onNavigate}
        />
      </div>
      <BottomToolbar />
    </AppShell>
  );
}
