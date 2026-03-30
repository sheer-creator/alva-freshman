/**
 * [INPUT]: ConversationTurn[] + thinking state
 * [OUTPUT]: 消息列表 — auto-scroll + turn 入场动画 + inline ThinkingIndicator
 * [POS]: alva-chat — 对话流渲染容器
 */

import { useRef, useEffect, useState } from 'react';
import type { ConversationTurn } from '@/data/alva-chat-mock';
import type { Page } from '@/app/App';
import { UserMessage } from './UserMessage';
import { AgentTurn } from './AgentTurn';
import { ThinkingIndicator } from './ThinkingIndicator';
import { CreditWarningBanner } from './CreditWarningBanner';

interface MessageListProps {
  turns: ConversationTurn[];
  activeToolId?: string | null;
  onUserAction?: () => void;
  onRelease?: () => void;
  showThinking?: boolean;
  thinkingText?: string | null;
  showCreditWarning?: boolean;
  onNavigate?: (page: Page) => void;
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
      transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
    }}>
      {children}
    </div>
  );
}

export function MessageList({ turns, activeToolId, onUserAction, onRelease, showThinking, thinkingText, showCreditWarning, onNavigate }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
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
      <div style={{ maxWidth: 720, width: '100%', margin: '0 auto', paddingTop: 16 }}>
      {turns.map((turn) => (
        <AnimatedTurn key={turn.id} turnId={turn.id}>
          {turn.role === 'user'
            ? <UserMessage turn={turn} />
            : <AgentTurn turn={turn} activeToolId={activeToolId} onUserAction={onUserAction} onRelease={onRelease} />
          }
        </AnimatedTurn>
      ))}
      {showThinking && <ThinkingIndicator activeText={thinkingText} />}
      {showCreditWarning && onNavigate && (
        <CreditWarningBanner onNavigate={onNavigate as (page: 'pricing' | 'billing') => void} />
      )}
      <div ref={bottomRef} style={{ height: 16, flexShrink: 0 }} />
      </div>
    </div>
  );
}
