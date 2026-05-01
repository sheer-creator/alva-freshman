import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import thesisHtml from './playbook-template-thesis.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(thesisHtml);

function TemplateThesisContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title="Template-Thesis"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function TemplateThesis({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="template-thesis" onNavigate={onNavigate}>
      <TemplateThesisContent />
    </AppShell>
  );
}
