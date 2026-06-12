/**
 * [INPUT]: alva-chat/QuestionCard（复用：产品同款提问卡）、ChannelIcon
 * [OUTPUT]: AskCard（QuestionCard 薄适配）+ TaskComposer（任务内细长输入条）+ taskIcon
 * [POS]: agent-channel/tabs — Tasks tab 的小件（源自 demo planc 2493-2528 行；AskCard 改用产品 QuestionCard）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { QuestionCard } from '@/app/components/alva-chat/QuestionCard';
import type { TaskKind } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';

/* ========== 任务类型 → 图标 ========== */

export function taskIcon(type: TaskKind): string {
  return type === 'Automation' ? 'automation'
    : type === 'Research' ? 'search'
    : type === 'Backtest' ? 'history'
    : type === 'Monitor' ? 'pulse'
    : 'bulb';
}

/* ========== ask-user-question — 直接复用产品 QuestionCard ========== */

interface AskCardProps {
  id: string;
  q: string;
  options: { label: string; description: string }[];
  onSubmit: (label: string) => void;
}

export function AskCard({ id, q, options, onSubmit }: AskCardProps) {
  return (
    <QuestionCard
      data={{ id: `ask-${id}`, header: 'Question', question: q, options, multiSelect: false }}
      onAnswer={(sel) => { if (sel.length) onSubmit(options[sel[0]].label); }}
    />
  );
}

/* ========== 细长任务内输入条 — 不离开列表即可引导会话 ========== */

export function TaskComposer({ placeholder, onSend }: { placeholder: string; onSend: (text: string) => void }) {
  const [val, setVal] = useState('');
  const submit = () => { const v = val.trim(); if (!v) return; onSend(v); setVal(''); };
  return (
    <div className="tcomposer">
      <input
        value={val}
        placeholder={placeholder}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
      />
      <button className={`tsend${val.trim() ? ' on' : ''}`} onClick={submit} aria-label="Send"><ChannelIcon name="arrowup" size={14} /></button>
    </div>
  );
}
