import { Dropdown } from './Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';

const AGENT_ICON = `${import.meta.env.BASE_URL}sidebar-skills-normal.svg`;

const AGENT_SECTION = {
  title: 'Alva Agent',
  items: [{ id: '__agent__', label: 'Alva Agent', icon: AGENT_ICON, badge: 3 }],
};

const THREAD_SECTION = {
  title: 'Recent Threads',
  items: CONVERSATIONS.map(c => ({ ...c, icon: 'sidebar-thread-normal' })),
};

export function ThreadSwitcherDropdown({
  activeId,
  onSelect,
  trigger,
  align = 'left',
}: {
  activeId: string;
  onSelect: (id: string) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
}) {
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  return (
    <Dropdown
      sections={[AGENT_SECTION, THREAD_SECTION]}
      activeId={activeId === '__agent__' ? '__agent__' : activeId}
      onSelect={handleSelect}
      width={400}
      maxHeight={640}
      align={align}
      trigger={trigger}
    />
  );
}
