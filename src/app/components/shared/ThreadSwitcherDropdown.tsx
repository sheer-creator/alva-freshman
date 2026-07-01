import { Dropdown } from './Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';

const AGENT_SECTION = {
  title: 'Alva Agent',
  items: [{ id: '__agent__', label: 'Alva Agent', icon: 'bot-l' }],
};

/* Recent chats 行 hover 浮现 rename/delete(Figma 7684:79436);rename/delete 从顶栏 ... 下拉移到这里 */
const CHAT_ACTIONS = [
  { id: 'rename', icon: 'edit-l1', label: 'Rename' },
  { id: 'delete', icon: 'delete-l', label: 'Delete' },
];

const THREAD_SECTION = {
  title: 'Recent chats',
  items: CONVERSATIONS.map(c => ({ ...c, icon: 'sidebar-thread-normal', actions: CHAT_ACTIONS })),
};

export function ThreadSwitcherDropdown({
  activeId,
  onSelect,
  trigger,
  align = 'left',
  onAction,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  /* 会话行 hover 操作(rename/delete);原型可不接,点击仅不触发选中 */
  onAction?: (itemId: string, actionId: string) => void;
}) {
  const handleSelect = (id: string) => {
    onSelect(id);
  };

  return (
    <Dropdown
      sections={[AGENT_SECTION, THREAD_SECTION]}
      activeId={activeId === '__agent__' ? '__agent__' : activeId}
      onSelect={handleSelect}
      onAction={onAction}
      width={432}
      maxHeight={640}
      align={align}
      trigger={trigger}
    />
  );
}
