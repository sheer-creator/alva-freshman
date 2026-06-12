/**
 * [INPUT]: ChannelIcon
 * [OUTPUT]: 聊天呈现原语 — AgentMsg / UserMsg / DaySep / PromptRow / rich()
 * [POS]: agent-channel 组件层 — Chat tab 的消息基础件（源自 demo planc 1748-1755/1919-1938/2723/928 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { ReactNode } from 'react';
import { ChannelIcon } from './ChannelIcon';

/* ========== 消息行 ========== */

export function AgentMsg({ persona = 'full', time, push, children }: { persona?: 'full' | 'subtle'; time?: string | null; push?: boolean; children: ReactNode }) {
  return (
    <div className={`msg${push ? ' is-push' : ''}`}>
      <span className="agent-ava"><img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva" /></span>
      <div className="msg-col">
        {persona !== 'subtle' && (
          <div className="msg-meta">
            <span className="who">Alva</span>
            {push && <span className="push">pushed</span>}
            {time && <span className="time">{time}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function UserMsg({ text }: { text: string }) {
  return <div className="msg user"><div className="bubble">{text}</div></div>;
}

export function DaySep({ label }: { label: string }) {
  return <div className="day-sep">{label}</div>;
}

/* ========== 建议 prompt 行 ========== */

export function PromptRow({ text, onClick }: { text: string; onClick: (text: string) => void }) {
  return (
    <button className="prompt" onClick={() => onClick(text)}>
      <span className="ptext">{text}</span>
      <span className="pico"><ChannelIcon name="enter" size={18} /></span>
    </button>
  );
}

/* ========== 行内富文本：$TICKER 渲染为 cashtag ========== */

export function rich(text: string): ReactNode[] {
  return text.split(/(\$[A-Z]{2,6}\b)/g).map((seg, i) =>
    seg.startsWith('$') ? <span className="cashtag" key={i}>{seg}</span> : seg,
  );
}
