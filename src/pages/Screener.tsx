import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import screenerHtml from './playbook-screener.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(screenerHtml);

function ScreenerContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title="Feed Test"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function Screener({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="screener" onNavigate={onNavigate}>
      <ScreenerContent />
    </AppShell>
  );
}
