import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PLAYBOOK_TITLES } from '@/data/playbooks';
import notificationHtml from './playbook-template-notification.html?raw';
import { inlinePlaybookHeader } from './components/inlinePlaybookHeader';

const html = inlinePlaybookHeader(notificationHtml);

function TemplateNotificationContent() {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--b0-page)' }}>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={html}
          title={PLAYBOOK_TITLES['template-notification']}
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}

export default function TemplateNotification({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <AppShell activePage="template-notification" onNavigate={onNavigate}>
      <TemplateNotificationContent />
    </AppShell>
  );
}
