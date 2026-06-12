/**
 * [INPUT]: types.ts 的 Automation、ava 工具、ChannelIcon
 * [OUTPUT]: AutomationRows — 自动化行列表（状态点 / 编辑 / 暂停 / 元信息 / usedBy chips）
 * [POS]: agent-channel/tabs — Alerts tab 的列表行（源自 demo planc 3244-3282 行；
 *        shared/AutomationCard 是推送卡形态，不符此处的管理行，故忠实移植）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Automation } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { avaColor } from '../ava';

interface AutomationRowsProps {
  items: Automation[];
  onEdit: (a: Automation) => void;
  onToggle: (a: Automation) => void;
}

export function AutomationRows({ items, onEdit, onToggle }: AutomationRowsProps) {
  return (
    <div className="auto-list">
      {items.map((a) => {
        const on = a.status === 'active';
        return (
          <div className="auto" key={a.id}>
            <div className="auto-r1">
              <span className={`ad ${on ? 'on' : 'off'}`}></span>
              <span className="an">{a.name}</span>
              <button className="aa" aria-label="Edit" onClick={() => onEdit(a)}><ChannelIcon name="sliders" size={15} /></button>
              <button className="aa" aria-label={on ? 'Pause' : 'Resume'} onClick={() => onToggle(a)}><ChannelIcon name={on ? 'pause' : 'play'} size={16} /></button>
              <button className="aa" aria-label="More"><ChannelIcon name="more" size={16} /></button>
            </div>
            <div className="auto-r2">
              <span>Last run: {a.lastRun}</span>
              <span className="sep">|</span>
              <span>{a.runEvery}</span>
              <span className="sep">|</span>
              <span>{a.runs} runs</span>
              {a.usedBy.length > 0 && (
                <span className="usedby">
                  <span className="sep">|</span>
                  {a.usedBy.map(([author, name]) => (
                    <span className="pbchip" key={name}><span className="pa" style={{ background: avaColor(author) }}>{author[0].toUpperCase()}</span>@{author}/{name}</span>
                  ))}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
