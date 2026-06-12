/**
 * [INPUT]: skills.ts 的 SKILLS/PROMPTS、ChannelMessage 原语、SkillChips
 * [OUTPUT]: ConceptA — 新用户安静欢迎态（SkillHub showcase + 建议 prompt）
 * [POS]: agent-channel — Chat tab 的 A concept（源自 demo planc 2175-2200 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { PROMPTS, SKILLS } from '@/data/agent-channel/skills';
import type { Skill, SubpushItem } from '@/data/agent-channel/types';
import { AgentMsg, PromptRow } from './ChannelMessage';
import { SkillChips } from './skills/SkillChips';

interface ConceptAProps {
  onPrompt: (text: string) => void;
  onStartTask: (skill: Skill, textOverride?: string) => void;
  onSubscribed: (skill: Skill, item: SubpushItem) => void;
}

export function ConceptA({ onPrompt, onStartTask, onSubscribed }: ConceptAProps) {
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const sel = openSkill ? SKILLS.find((s) => s.id === openSkill) : null;
  return (
    <>
      <AgentMsg persona="subtle">
        <div className="bubble plain">
          <p className="lead">Hi, I'm Alva.</p>
          <p className="sub">Describe an investing idea in plain English and I'll turn it into a live playbook — a screener, a thesis, a backtest, or a tracker that keeps working after you close the tab.</p>
        </div>
      </AgentMsg>

      <AgentMsg persona="subtle">
        <div className="bubble plain" style={{ fontSize: 13.5, color: 'var(--text-n5)' }}>Start from SkillHub — build your own, or subscribe to a ready-made workflow:</div>
        <SkillChips skills={SKILLS.slice(0, 5)} variant="preview" open={openSkill} onOpenChange={setOpenSkill} onStartTask={onStartTask} onSubscribed={onSubscribed} />
      </AgentMsg>

      <AgentMsg persona="subtle">
        <div className="bubble plain" style={{ fontSize: 13.5, color: 'var(--text-n5)' }}>{sel ? <>Or build your own <b style={{ fontWeight: 500, color: 'var(--text-n7)' }}>{sel.label}</b> — try one of these:</> : 'Or try one of these:'}</div>
        <div className="prompts" key={sel ? sel.id : 'default'}>
          {(sel ? sel.prompts : PROMPTS.slice(0, 3)).map((t) => <PromptRow text={t} key={t} onClick={sel ? (txt) => onStartTask(sel, txt) : onPrompt} />)}
        </div>
      </AgentMsg>
    </>
  );
}
