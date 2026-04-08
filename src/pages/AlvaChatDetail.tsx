/**
 * [INPUT]: onNavigate, onOpenSearch from App.tsx
 * [OUTPUT]: Alva Chat 对话详情页 — 匹配 Figma 设计
 * [POS]: pages — 对话详情（流式 UI）
 */

import { useState, useEffect, useMemo } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { MessageList } from '@/app/components/alva-chat/MessageList';
import { InputBar } from '@/app/components/alva-chat/InputBar';
import { TodoBar } from '@/app/components/alva-chat/TodoBar';
import { useStreamSimulator } from '@/app/components/alva-chat/useStreamSimulator';
import {
  getActiveConversation, MOCK_CONVERSATIONS, setActiveConversation,
  onConversationChange, setChatPanelOpen,
} from '@/data/alva-chat-mock';
import type { Conversation, TodoItem, PlanCardData, QuestionCardData } from '@/data/alva-chat-mock';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

/* 从 visibleTurns 提取最新的 todo_update 数据 */
function extractLatestTodo(turns: Conversation['turns']): { label: string; items: TodoItem[] } | null {
  for (let t = turns.length - 1; t >= 0; t--) {
    const turn = turns[t];
    if (turn.role !== 'agent') continue;
    for (let b = turn.blocks.length - 1; b >= 0; b--) {
      const block = turn.blocks[b];
      if (block.type === 'todo_update') return block.data;
    }
  }
  return null;
}

/* 提取最新的未接受 plan */
function extractPendingPlan(turns: Conversation['turns']): PlanCardData | null {
  for (let t = turns.length - 1; t >= 0; t--) {
    const turn = turns[t];
    if (turn.role !== 'agent') continue;
    for (let b = turn.blocks.length - 1; b >= 0; b--) {
      const block = turn.blocks[b];
      if (block.type === 'plan' && !block.data.accepted) return block.data;
    }
  }
  return null;
}

/* 提取最新的未回答 question */
function extractPendingQuestion(turns: Conversation['turns']): QuestionCardData | null {
  for (let t = turns.length - 1; t >= 0; t--) {
    const turn = turns[t];
    if (turn.role !== 'agent') continue;
    for (let b = turn.blocks.length - 1; b >= 0; b--) {
      const block = turn.blocks[b];
      if (block.type === 'question' && block.data.selectedIndex == null) return block.data;
    }
  }
  return null;
}

export default function AlvaChatDetail({ onNavigate, onOpenSearch }: Props) {
  const [conversation, setConversation] = useState<Conversation>(() => {
    return getActiveConversation() ?? (() => {
      setActiveConversation(MOCK_CONVERSATIONS[0].id);
      return MOCK_CONVERSATIONS[0];
    })();
  });

  useEffect(() => {
    return onConversationChange(() => {
      const next = getActiveConversation();
      if (next) setConversation(next);
    });
  }, []);

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Credits 即将耗尽提醒 — 流式播完后延迟显示 */
  const [showCreditWarning, setShowCreditWarning] = useState(false);

  const { visibleTurns, isStreaming, showThinking, activeToolId, waitingForUser, waitingBlockType, resumeStream } = useStreamSimulator(conversation);

  useEffect(() => {
    if (!isStreaming && visibleTurns.length > 0) {
      const timer = setTimeout(() => setShowCreditWarning(true), 800);
      return () => clearTimeout(timer);
    }
    setShowCreditWarning(false);
  }, [isStreaming, visibleTurns.length]);

  /* Todo 数据 + ThinkingIndicator activeForm 联动 */
  const latestTodo = useMemo(() => extractLatestTodo(visibleTurns), [visibleTurns]);
  const todoActiveForm = useMemo(() => {
    const ip = latestTodo?.items.find(i => i.status === 'in_progress');
    return ip?.activeForm ?? null;
  }, [latestTodo]);
  const showTodoBar = latestTodo && !latestTodo.items.every(i => i.status === 'completed');
  const pendingPlan = useMemo(() => waitingBlockType === 'plan' ? extractPendingPlan(visibleTurns) : null, [visibleTurns, waitingBlockType]);
  const pendingQuestion = useMemo(() => waitingBlockType === 'question' ? extractPendingQuestion(visibleTurns) : null, [visibleTurns, waitingBlockType]);

  return (
    <AppShell activePage="alva-chat-detail" onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div
        style={{
          display: 'flex', flexDirection: 'column', height: '100%',
          position: 'relative',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        }}
      >
        {/* Topbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 15, fontWeight: 500, color: 'var(--text-n9)',
            fontFamily: "'Delight', sans-serif", flex: 1,
          }}>
            {conversation.title}
          </span>
        </div>

        {/* Messages */}
        <MessageList
          turns={visibleTurns}
          activeToolId={activeToolId}
          onUserAction={resumeStream}
          onRelease={() => { setChatPanelOpen(true); onNavigate('dashboard'); }}
          showThinking={showThinking}
          thinkingText={todoActiveForm}
          showCreditWarning={showCreditWarning}
          onNavigate={onNavigate}
        />

        {/* Todo bar — Question/Plan 出现时隐藏 */}
        {showTodoBar && !waitingForUser && <TodoBar label={latestTodo.label} items={latestTodo.items} />}

        {/* Input */}
        <InputBar
          onSend={() => {}}
          streaming={isStreaming && !waitingForUser}
          waitingBlockType={waitingForUser ? waitingBlockType : null}
          onAcceptPlan={resumeStream}
          planData={pendingPlan}
          questionData={pendingQuestion}
          onAnswerQuestion={resumeStream}
        />
      </div>
    </AppShell>
  );
}
