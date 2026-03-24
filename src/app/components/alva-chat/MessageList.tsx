/**
 * [INPUT]: ConversationTurn[]
 * [OUTPUT]: 消息列表 — auto-scroll + turn 入场动画
 * [POS]: alva-chat — 对话流渲染容器
 */

import { useRef, useEffect, useState } from 'react';
import type { ConversationTurn } from '@/data/alva-chat-mock';
import { UserMessage } from './UserMessage';
import { AgentTurn } from './AgentTurn';

interface MessageListProps {
  turns: ConversationTurn[];
  activeToolId?: string | null;
  onUserAction?: () => void;
  onRelease?: () => void;
}

function AnimatedTurn({ children, turnId }: { children: React.ReactNode; turnId: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [turnId]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
    }}>
      {children}
    </div>
  );
}

export function MessageList({ turns, activeToolId, onUserAction, onRelease }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* scroll to bottom on any content change */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    /* only auto-scroll if user is near bottom (within 120px) */
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1, overflowY: 'auto', padding: '0 24px',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {turns.map((turn) => (
        <AnimatedTurn key={turn.id} turnId={turn.id}>
          {turn.role === 'user'
            ? <UserMessage turn={turn} />
            : <AgentTurn turn={turn} activeToolId={activeToolId} onUserAction={onUserAction} onRelease={onRelease} />
          }
        </AnimatedTurn>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
