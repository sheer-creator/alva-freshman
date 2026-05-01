import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import whatifHtml from './playbook-template-whatif.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(whatifHtml);

function TemplateWhatifContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title="Template-Whatif"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function TemplateWhatif({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="template-whatif" onNavigate={onNavigate}>
      <TemplateWhatifContent />
    </AppShell>
  );
}
