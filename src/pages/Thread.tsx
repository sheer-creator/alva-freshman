import { useState, useRef, useCallback, useEffect } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatMessages } from '@/app/components/chat/ChatMessages';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Dropdown } from '@/app/components/shared/Dropdown';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { CONVERSATIONS } from '@/lib/chat-config';

const FONT = "font-['Delight',sans-serif]";

const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

interface ThreadProps {
  threadId: string;
  onNavigate: (page: Page) => void;
}

export default function Thread({ threadId, onNavigate }: ThreadProps) {
  const [activeView, setActiveView] = useState<string>(threadId);
  const [agentMessages, setAgentMessages] = useState([INITIAL_AGENT_MESSAGE]);
  const agentScrollRef = useRef<HTMLDivElement>(null);

  // Sync activeView when threadId prop changes (URL navigation)
  useEffect(() => {
    setActiveView(threadId);
  }, [threadId]);

  const isAgent = activeView === '__agent__';
  const currentThreadId = isAgent ? threadId : activeView;
  const title = CONVERSATIONS.find(c => c.id === currentThreadId)?.label ?? 'New Chat';
  const hasContent = currentThreadId !== 'new' && CONVERSATIONS.some(c => c.id === currentThreadId);

  const handleSwitcherSelect = useCallback((id: string) => {
    setActiveView(id);
  }, []);

  const handleAgentSend = useCallback((text: string) => {
    setAgentMessages(prev => [...prev, { role: 'user', text }]);
    setTimeout(() => {
      setAgentMessages(prev => [
        ...prev,
        { role: 'agent', text: `I'll look into "${text}" right away. I've also logged this as a new chat in your history for reference.` },
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
    <AppShell activePage={`thread/${threadId}`} onNavigate={onNavigate}>
      <div className="h-screen flex flex-col bg-white">
        {/* Topbar */}
        <div className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0">
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId={activeView}
              onSelect={handleSwitcherSelect}
              trigger={
                isAgent ? (
                  <div className="flex items-center gap-[8px] min-w-0 cursor-pointer">
                    <div className="relative shrink-0">
                      <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 24, height: 24 }} />
                      <div
                        className="absolute -bottom-[1px] right-[-3px] size-[10px] rounded-full border-[1.5px] border-white"
                        style={{ background: 'var(--main-m1, #49A3A6)' }}
                      />
                    </div>
                    <div className="flex gap-[4px] items-center min-w-0">
                      <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate`}>
                        Alva Agent
                      </p>
                      <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                    <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate`}>
                      {title}
                    </p>
                    <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                  </div>
                )
              }
            />
          </div>
          <div className="flex items-center gap-[16px] shrink-0">
            {isAgent ? (
              <button
                className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => onNavigate('alva-agent')}
              >
                <CdnIcon name="settings-l" size={16} />
              </button>
            ) : (
              <>
                <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => onNavigate('new-chat')}>
                  <CdnIcon name="chat-new-l" size={16} />
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
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center min-h-0 overflow-hidden">
          <div className="flex flex-col flex-1 min-h-0 w-full" style={{ maxWidth: 896 }}>
            {isAgent ? (
              <>
                <div ref={agentScrollRef} className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[64px]">
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
                <div className="px-[28px] pb-[24px] shrink-0">
                  <ChatInput shadow onSend={handleAgentSend} placeholder="Message your Alva Agent..." />
                </div>
              </>
            ) : hasContent ? (
              <>
                <div className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[64px]">
                  <ChatMessages conversationId={currentThreadId} />
                </div>
                <div className="px-[28px] pb-[24px] shrink-0">
                  <ChatInput shadow />
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex min-h-0">
                  <ChatMessages conversationId="new" />
                </div>
                <div className="px-[28px] pb-[24px] shrink-0">
                  <ChatInput shadow />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
