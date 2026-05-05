/**
 * [INPUT]: Page navigate
 * [OUTPUT]: Trade Notification Test —
 *           复用 <playbook-header> Web Component，与其他 playbook 顶部栏视觉一致；
 *           顶部栏左下方放"绑定弹窗 Just Alerts fast-path"方案示意。
 *           主体内容暂留空，仅用于产品/设计方案讨论。
 * [POS]: 页面层
 */

import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import tradeTestHtml from './playbook-trade-notification-test.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(tradeTestHtml);

function Content() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title="Trade Notification Test"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function TradeNotificationTest({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="trade-notification-test" onNavigate={onNavigate}>
      <Content />
    </AppShell>
  );
}
