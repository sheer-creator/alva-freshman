import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PLAYBOOK_TITLES } from '@/data/playbooks';
import spaceInvestorHtml from './playbook-space-investor.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(spaceInvestorHtml);

function SpaceInvestorContent() {
  // Height is stated explicitly rather than h-full: AppShell's content wrapper is
  // only a flex container from lg up, so h-full has no resolvable parent height
  // below it. Subtract the 56px mobile topbar so the iframe's docked bar lands on
  // screen; dvh keeps it right while mobile Safari's chrome collapses.
  return (
    <div className="h-[calc(100dvh-56px)] lg:h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
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
