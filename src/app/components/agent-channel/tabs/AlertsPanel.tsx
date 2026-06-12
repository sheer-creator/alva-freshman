/**
 * [INPUT]: types.ts 的 Automation、AutomationRows/AutomationModal
 * [OUTPUT]: AlertsPanel — 带推送的自动化列表 + 新建/编辑入口
 * [POS]: agent-channel/tabs — Alerts tab（原 Artifacts 的 automations 段独立成 tab；autos 状态由页面持有）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import type { Automation } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { AutomationModal } from '../modals/AutomationModal';
import type { AutomationDraft } from '../modals/AutomationModal';
import { AutomationRows } from './AutomationRows';

interface AlertsPanelProps {
  autos: Automation[];
  onSaveAuto: (existing: Automation | null, draft: AutomationDraft) => void;
  onToggleAuto: (a: Automation) => void;
}

export function AlertsPanel({ autos, onSaveAuto, onToggleAuto }: AlertsPanelProps) {
  // 'new' = 新建；Automation 对象 = 编辑中
  const [autoModal, setAutoModal] = useState<'new' | Automation | null>(null);
  const save = (draft: AutomationDraft) => {
    onSaveAuto(autoModal === 'new' ? null : (autoModal as Automation), draft);
    setAutoModal(null);
  };
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Alerts</h2>
        <p>Standing watches with push — Alva runs each one on schedule and posts to this channel the moment it triggers.</p>
      </div>
      <div className="panel-bar">
        <span className="grow"></span>
        <button className="newauto" onClick={() => setAutoModal('new')}><ChannelIcon name="plus" size={14} />New alert</button>
      </div>
      <AutomationRows items={autos} onEdit={(a) => setAutoModal(a)} onToggle={onToggleAuto} />
      {/* .panel 入场动画结束即 transform:none，fixed 遮罩不会被困 — 无需 portal，留在样式作用域内 */}
      {autoModal && (
        <AutomationModal initial={autoModal === 'new' ? null : autoModal} onClose={() => setAutoModal(null)} onSave={save} />
      )}
    </div>
  );
}
