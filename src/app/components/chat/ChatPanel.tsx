import { useState, useRef, useCallback, useEffect } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { ChatInput } from '../shared/ChatInput';
import { Dropdown } from '../shared/Dropdown';
import { ThreadSwitcherDropdown } from '../shared/ThreadSwitcherDropdown';
import { useChatContext } from './ChatContext';
import { ChatMessages } from './ChatMessages';
import { ChatEmptyState } from './PlaybookSuggestions';
import { TodoListCard, ReviewPlanCard, AnswerQuestionCard } from './StreamingMessages';
import type { ContextTagData } from '@/lib/chat-config';
import { CONVERSATIONS, isPlaybookPage } from '@/lib/chat-config';
import { ConceptA } from '../agent-channel/ConceptA';
import { ExtraThread } from '../agent-channel/ExtraThread';
import { useChannelChat } from '../agent-channel/useChannelChat';
import '@/styles/agent-channel.css';

const FONT = "font-['Delight',sans-serif]";

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-[16px] shrink-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-70"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface ChatPanelProps {
  onClose: () => void;
  contextTag?: ContextTagData | null;
}

export function ChatPanel({ onClose, contextTag }: ChatPanelProps) {
  const { hasInitialInput, activeConversationId, setActiveConversation, sendPrompt, overlay, dismissOverlay, activePage } = useChatContext();
  const [injectSignal, setInjectSignal] = useState<{ text: string; seq: number } | null>(null);
  const agentScrollRef = useRef<HTMLDivElement>(null);

  const isAgent = activeConversationId === '__agent__';
  const isPlaybookContext = isPlaybookPage(activePage);
  const inputContextTag = isPlaybookContext ? contextTag : null;
  const showEmptyState = activeConversationId === 'new' && !hasInitialInput;
  const handlePromptClick = useCallback((text: string) => {
    setInjectSignal({ text, seq: Date.now() });
  }, []);

  const handleFullscreen = () => {
    onClose();
    if (isAgent) {
      window.location.hash = 'agent';
    } else if (activeConversationId === 'new') {
      window.location.hash = 'new-chat';
    } else {
      window.location.hash = `thread/${activeConversationId}`;
    }
  };

  // Alva Agent 会话与频道页共享同一全局 store — 这里是同一份内容的窄栏视图
  const channel = useChannelChat();
  const { extra } = channel;
  useEffect(() => {
    if (isAgent && extra.length && agentScrollRef.current) {
      const el = agentScrollRef.current;
      requestAnimationFrame(() => { el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }); });
    }
  }, [isAgent, extra]);

  // 频道内跳转（Tasks/Alerts/Files）：收起面板，去频道页对应 tab
  const goChannelTab = useCallback((tab: string) => {
    onClose();
    window.location.hash = tab === 'chat' ? 'agent' : `agent?tab=${tab}`;
  }, [onClose]);

  return (
    <div className="flex items-center pl-[8px] pr-[8px] py-[8px] h-full shrink-0 w-full">
      <div
        className="flex flex-col h-full w-full overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid var(--line-l2)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {/* Topbar */}
        <div className="flex items-center gap-[16px] h-[56px] px-[24px] py-[16px] shrink-0" style={{ zIndex: 2 }}>
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
                      <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                    <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate`}>
                      {CONVERSATIONS.find(c => c.id === activeConversationId)?.label ?? 'New Chat'}
                    </p>
                    <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
                  </div>
                )
              }
            />
          </div>
          <div className="flex items-center gap-[16px] shrink-0">
            {isAgent ? (
              <>
                <IconButton label="New chat" onClick={() => setActiveConversation('new')}>
                  <CdnIcon name="chat-new-l" size={16} />
                </IconButton>
                <IconButton label="Open full view" onClick={handleFullscreen}>
                  <CdnIcon name="full-screen-l" size={16} />
                </IconButton>
                <IconButton label="Agent settings" onClick={() => { onClose(); window.location.hash = 'alva-agent'; }}>
                  <CdnIcon name="settings-l" size={16} />
                </IconButton>
                <IconButton label="Collapse panel" onClick={onClose}>
                  <CdnIcon name="collapse-right-l" size={16} />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton label="New chat" onClick={() => setActiveConversation('new')}>
                  <CdnIcon name="chat-new-l" size={16} />
                </IconButton>
                <IconButton label="Open full view" onClick={handleFullscreen}>
                  <CdnIcon name="full-screen-l" size={16} />
                </IconButton>
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
                <IconButton label="Collapse panel" onClick={onClose}>
                  <CdnIcon name="collapse-right-l" size={16} />
                </IconButton>
              </>
            )}
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex flex-col flex-1 items-center min-h-0 pb-[8px] px-[8px] relative" style={{ zIndex: 1 }}>
          {isAgent ? (
            <>
              <div ref={agentScrollRef} className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full px-[16px] pb-[48px]">
                <div className="agent-channel panel-thread">
                  {/* 与频道 Chat tab（Concept A）同一份 onboarding — 新用户从任何页面开面板都能被 onboard */}
                  <ConceptA onPrompt={channel.onPrompt} onStartTask={channel.onStartTask} onSubscribed={channel.onSubscribed} />
                  <ExtraThread
                    extra={extra}
                    subtle
                    onGoTasks={() => goChannelTab('tasks')}
                    onGoAlerts={() => goChannelTab('alerts')}
                    onGoFiles={() => goChannelTab('files')}
                    onConnectIm={(im) => { if (im) channel.connectIm(im); else goChannelTab('chat'); }}
                  />
                </div>
              </div>
              <ChatInput contextTag={inputContextTag} allowReferences={isPlaybookContext} onSend={channel.onPrompt} autoFocus />
            </>
          ) : (
            <>
              {showEmptyState ? (
                <div className="flex flex-col flex-1 min-h-0 w-full">
                  <ChatEmptyState onPromptClick={handlePromptClick} />
                </div>
              ) : (
                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full px-[16px] pb-[48px]">
                  <div className={hasInitialInput ? "flex flex-col w-full" : "flex flex-col flex-1 min-h-0 w-full"}>
                    <ChatMessages conversationId={activeConversationId} hasContent={hasInitialInput} surface="drawer" />
                  </div>
                </div>
              )}

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
                  <ChatInput
                    contextTag={inputContextTag}
                    allowReferences={isPlaybookContext}
                    onSend={sendPrompt}
                    injectText={injectSignal}
                    autoFocus
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
