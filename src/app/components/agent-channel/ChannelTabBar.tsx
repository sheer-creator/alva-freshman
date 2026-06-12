/**
 * [INPUT]: types.ts 的 TabId、ChannelIcon
 * [OUTPUT]: ChannelTabBar — Chat / Tasks / Memory / Alerts / Files 五 tab + 计数 badge
 * [POS]: agent-channel 组件层 — 频道页 tab 栏（源自 demo planc 2310-2332 行；Artifacts 拆为 Alerts + Files）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { TabId } from '@/data/agent-channel/types';
import { ChannelIcon } from './ChannelIcon';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'chat', label: 'Chat', icon: 'chat' },
  { id: 'tasks', label: 'Tasks', icon: 'tasks' },
  { id: 'memory', label: 'Memory', icon: 'layers' },
  { id: 'alerts', label: 'Alerts', icon: 'alert' },
  { id: 'files', label: 'Files', icon: 'file' },
];

interface ChannelTabBarProps {
  tab: TabId;
  onTab: (id: TabId) => void;
  counts: Partial<Record<TabId, number>>;
}

export function ChannelTabBar({ tab, onTab, counts }: ChannelTabBarProps) {
  return (
    <div className="tabbar">
      {TABS.map((t) => {
        const n = counts[t.id];
        return (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => onTab(t.id)}>
            <span className="ti"><ChannelIcon name={t.icon} size={16} /></span>
            {t.label}
            {n ? <span className="count">{n}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
