import { useState, useRef, useCallback } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { ChatInput } from '../shared/ChatInput';
import { Dropdown } from '../shared/Dropdown';
import { ThreadSwitcherDropdown } from '../shared/ThreadSwitcherDropdown';
import { useChatContext } from './ChatContext';
import { ChatMessages } from './ChatMessages';
import { TodoListCard, ReviewPlanCard, AnswerQuestionCard } from './StreamingMessages';
import type { ContextTagData } from '@/lib/chat-config';
import { CONVERSATIONS } from '@/lib/chat-config';

const FONT = "font-['Delight',sans-serif]";

const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

interface ChatPanelProps {
  onClose: () => void;
  contextTag?: ContextTagData | null;
}

export function ChatPanel({ onClose, contextTag }: ChatPanelProps) {
  const { hasInitialInput, activeConversationId, setActiveConversation, sendPrompt, overlay, dismissOverlay } = useChatContext();
  const [agentMessages, setAgentMessages] = useState([INITIAL_AGENT_MESSAGE]);
  const agentScrollRef = useRef<HTMLDivElement>(null);

  const isAgent = activeConversationId === '__agent__';

  const handleFullscreen = () => {
    onClose();
    window.location.hash = isAgent ? 'agent' : `thread/${activeConversationId}`;
  };

  const handleAgentSend = useCallback((text: string) => {
    setAgentMessages(prev => [...prev, { role: 'user' as const, text }]);
    setTimeout(() => {
      setAgentMessages(prev => [
        ...prev,
        { role: 'agent' as const, text: `I'll look into "${text}" right away. I've also logged this as a new thread in your history for reference.` },
      ]);
      setTimeout(() => {
        agentScrollRef.current?.scrollTo({ top: agentScrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 50);
    }, 1200);
    setTimeout(() => {
      agentScrollRef.current?.scrollTo({ top: agentScrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <div className="flex items-center pl-[8px] pr-[8px] py-[8px] h-full shrink-0 w-full">
      <div
        className="flex flex-col h-full w-full overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid rgba(0,0,0,0.2)',
          borderRadius: 12,
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        }}
      >
        {/* Topbar */}
        <div className="flex items-center gap-[16px] h-[48px] px-[24px] py-[16px] shrink-0" style={{ zIndex: 2 }}>
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId={activeConversationId}
              onSelect={setActiveConversation}
              trigger={
                isAgent ? (
                  <div className="flex items-center gap-[8px] min-w-0 cursor-pointer">
                    <div className="relative shrink-0">
                      <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 20, height: 20 }} />
                      <div
                        className="absolute -bottom-[1px] right-[-3px] size-[8px] rounded-full border-[1.5px] border-white"
                        style={{ background: 'var(--main-m1, #49A3A6)' }}
                      />
                    </div>
                    <div className="flex gap-[4px] items-center min-w-0">
                      <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate`}>
                        Alva Agent
                      </p>
                      <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                    <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate`}>
                      {CONVERSATIONS.find(c => c.id === activeConversationId)?.label ?? 'New Thread'}
                    </p>
                    <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                  </div>
                )
              }
            />
          </div>
          <div className="flex items-center gap-[16px] shrink-0">
            {isAgent ? (
              <>
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={handleFullscreen}>
                  <CdnIcon name="full-screen-l" size={16} />
                </button>
                <button
                  className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => { onClose(); window.location.hash = 'alva-agent'; }}
                >
                  <CdnIcon name="settings-l" size={16} />
                </button>
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
                  <CdnIcon name="collapse-right-l" size={16} />
                </button>
              </>
            ) : (
              <>
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setActiveConversation('new')}>
                  <CdnIcon name="chat-new-l" size={16} />
                </button>
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={handleFullscreen}>
                  <CdnIcon name="full-screen-l" size={16} />
                </button>
                <Dropdown
                  items={[{ id: 'rename', label: 'Rename', icon: 'edit-l1' }, { id: 'delete', label: 'Delete', icon: 'delete-l' }]}
                  onSelect={() => {}}
                  width={180}
                  align="right"
                  trigger={
                    <div className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
                      <CdnIcon name="more-l1" size={16} />
                    </div>
                  }
                />
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={onClose}>
                  <CdnIcon name="collapse-right-l" size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex flex-col flex-1 items-center min-h-0 pb-[8px] px-[8px] relative" style={{ zIndex: 1 }}>
          {isAgent ? (
            <>
              <div ref={agentScrollRef} className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full pb-[64px] px-[16px]">
                <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full pt-[16px]">
                  {agentMessages.map((msg, i) =>
                    msg.role === 'user' ? (
                      <div key={i} className="flex flex-col items-end w-full">
                        <div className="max-w-[560px] px-[16px] py-[12px]" style={{ background: 'rgba(73,163,166,0.1)', borderRadius: 8 }}>
                          <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col gap-[16px] items-start w-full">
                        <img src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`} alt="Alva" style={{ height: 12, width: 70 }} />
                        <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] w-full`}>
                          {msg.text}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <ChatInput contextTag={contextTag} onSend={handleAgentSend} />
            </>
          ) : (
            <>
              <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full pb-[64px] px-[16px]">
                <ChatMessages conversationId={activeConversationId} hasContent={hasInitialInput} />
              </div>

              {overlay && overlay.type === 'plan' && overlay.plan ? (
                <div className="w-full shrink-0">
                  <ReviewPlanCard data={overlay.plan} onApprove={dismissOverlay} />
                </div>
              ) : (
                <>
                  {overlay && overlay.type === 'todos' && overlay.todos && (
                    <div className="w-full px-[8px] pb-[8px] shrink-0">
                      <TodoListCard data={overlay.todos} />
                    </div>
                  )}
                  {overlay && overlay.type === 'answer' && overlay.answer && (
                    <div className="w-full px-[8px] pb-[8px] shrink-0">
                      <AnswerQuestionCard
                        data={overlay.answer}
                        onSelect={() => dismissOverlay()}
                        onSkip={dismissOverlay}
                      />
                    </div>
                  )}
                  <ChatInput contextTag={contextTag} onSend={sendPrompt} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
