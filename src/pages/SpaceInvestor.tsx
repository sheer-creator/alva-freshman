import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PLAYBOOK_TITLES } from '@/data/playbooks';
import spaceInvestorHtml from './playbook-space-investor.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(spaceInvestorHtml);

function SpaceInvestorContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title={PLAYBOOK_TITLES['space-investor']}
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function SpaceInvestor({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="space-investor" onNavigate={onNavigate}>
      <SpaceInvestorContent />
    </AppShell>
  );
}
