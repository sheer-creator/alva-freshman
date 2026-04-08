import { useState, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { AlvaLoading } from '@/app/components/shared/AlvaLoading';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import DotMatrixWave from '@/app/components/shared/DotMatrixWave';

type AgentState = 'empty' | 'connecting' | 'connected';

const FONT = "font-['Delight',sans-serif]";

/* ── Feature cards for empty state ── */
const FEATURES = [
  {
    icon: 'sidebar-discover-normal',
    title: 'Persistent memory',
    desc: '24/7 cloud assistant that keeps full context and memory across conversations.',
  },
  {
    icon: 'sidebar-about-normal',
    title: 'Custom skills',
    desc: 'Equip your assistant with expert knowledge in specific investment areas.',
  },
  {
    icon: 'chat-new-l',
    title: 'Works in Telegram',
    desc: 'Chat with your Alva Agent directly in Telegram. More platforms coming soon.',
  },
  {
    icon: 'star-l',
    title: 'Always-on analysis',
    desc: 'Your agent monitors markets and alerts you on key events around the clock.',
  },
];

/* ── Mock agent messages ── */
const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

/* ── Telegram SVG icon ── */
function TelegramIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="120" fill="#26A5E4" />
      <path
        d="M98 175c-3.9 0-3.2-1.5-4.6-5.2L82 132.2 170.4 78"
        fill="#C8DAEA"
      />
      <path
        d="M98 175c3 0 4.3-1.4 6-3l16-15.6-20-12"
        fill="#A9C9DD"
      />
      <path
        d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-93c2-8.1-3.1-11.7-8.4-9.3L55.6 113c-7.9 3.2-7.8 7.6-1.4 9.5l36.3 11.4 84.2-53c4-2.4 7.6-1.1 4.6 1.5"
        fill="white"
      />
    </svg>
  );
}

/* ── Empty state ── */
function EmptyState({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-0 relative overflow-hidden" style={{ background: '#F6F6F6' }}>
      <DotMatrixWave
        enableHover={false}
        bgColor="#F6F6F6"
        dotColor="#d1e0e0"
        waveSpeed={0.6}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, white 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-[32px] w-full max-w-[960px] px-[24px]">
        {/* Hero illustration */}
        <div className="flex flex-col items-center gap-[20px]">
          <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 48, height: 48 }} />
          <h1 className={`${FONT} text-[28px] leading-[38px] tracking-[0.28px] text-center text-[var(--text-n9)] font-normal`}>
            Deploy your Alva Agent
          </h1>
          <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-center text-[var(--text-n5)] max-w-[480px]`}>
            Connect your always-on AI agent to Telegram. It keeps full context across conversations, monitors markets, and executes your playbooks 24/7.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-[16px] w-full">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="flex flex-col gap-[8px] p-[16px] rounded-[10px]"
              style={{ background: 'var(--b0-container, #ffffff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
            >
              <CdnIcon name={f.icon} size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
              <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                {f.title}
              </p>
              <p className={`${FONT} text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]`}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Connect button */}
        <button
          className={`${FONT} flex items-center justify-center gap-[8px] text-[14px] leading-[22px] tracking-[0.14px] font-medium text-white cursor-pointer transition-opacity hover:opacity-90`}
          style={{ height: 48, padding: '11px 20px', borderRadius: 8, background: '#26A5E4', border: 'none' }}
          onClick={onConnect}
        >
          <CdnIcon name={`${import.meta.env.BASE_URL}logo-telegram.svg`} size={18} color="#ffffff" />
          Connect Telegram
        </button>

        {/* Coming Soon */}
        <div className="flex flex-col items-center gap-[12px]">
          <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n3)]`}>
            Coming Soon
          </span>
          <div className="flex items-center gap-[8px]">
            {[
              { name: 'Discord', file: 'logo-social-discord.svg' },
              { name: 'Slack', file: 'logo-social-slack.svg' },
              { name: 'WhatsApp', file: 'logo-social-whatsapp.svg' },
            ].map(p => (
              <div
                key={p.name}
                className="flex items-center gap-[6px] rounded-full"
                style={{ background: 'var(--grey-g03, #f0f0f0)', padding: '4px 12px 4px 6px' }}
              >
                <img src={`${import.meta.env.BASE_URL}${p.file}`} alt={p.name} style={{ width: 18, height: 18 }} />
                <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Connecting state ── */
function ConnectingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-0 gap-[20px]">
      <AlvaLoading size={36} />
      <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]`}>
        Connecting to Telegram...
      </p>
    </div>
  );
}

/* ── Settings modal (alva-design Modal spec) ── */
function AgentSettingsModal({ onClose, onDisconnect }: { onClose: () => void; onDisconnect: () => void }) {
  const [persona, setPersona] = useState('');
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dirtyRef = useRef(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--main-m7, rgba(0,0,0,0.6))', padding: '48px 16px' }}
    >
      {/* Toast */}
      <div
        className="absolute left-1/2 flex items-center gap-[8px] px-[16px] py-[12px] transition-all duration-300"
        style={{
          top: 28,
          transform: `translateX(-50%) translateY(${showToast ? '0' : '-8px'})`,
          opacity: showToast ? 1 : 0,
          pointerEvents: 'none',
          background: 'var(--b0-container, #ffffff)',
          border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          borderRadius: 8,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}
      >
        <CdnIcon name="check-f2" size={20} color="var(--main-m3, #2a9b7d)" />
        <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
          Updated successfully
        </span>
      </div>

      <div
        className="flex flex-col w-full max-w-[720px] max-h-[840px] flex-1 rounded-[12px]"
        style={{ background: 'var(--b0-container, #ffffff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', padding: 28, gap: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Title */}
        <div className="flex items-center justify-between shrink-0" style={{ gap: 12 }}>
          <p className={`${FONT} text-[18px] leading-[28px] tracking-[0.18px] text-[var(--text-n9)] font-medium`}>
            Agent Settings
          </p>
          <div className="shrink-0 cursor-pointer transition-opacity hover:opacity-60" onClick={onClose}>
            <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col" style={{ gap: 20 }}>
          {/* Connected app */}
          <div className="flex flex-col" style={{ gap: 12 }}>
            <div className="flex flex-col" style={{ gap: 4 }}>
              <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                Connected App
              </p>
              <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                Choose the messaging app for your Alva Agent (single platform).
              </p>
            </div>
            <div
              className="flex items-center justify-between rounded-[8px] p-[16px]"
              style={{ background: 'var(--b-r02, rgba(0,0,0,0.02))' }}
            >
              <div className="flex items-center gap-[8px]">
                <TelegramIcon size={24} />
                <span className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                  Telegram
                </span>
              </div>
              <span
                className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] cursor-pointer transition-colors hover:text-[var(--text-n9)]`}
                onClick={onDisconnect}
              >
                Disconnect
              </span>
            </div>
          </div>

          {/* Customize persona */}
          <div className="flex flex-col flex-1 min-h-0" style={{ gap: 12 }}>
            <div className="flex flex-col" style={{ gap: 4 }}>
              <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                Customize Your Assistant
              </p>
              <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                Define the personality, tone, and response style.
              </p>
            </div>
            <div className="relative flex-1 min-h-0">
              <textarea
                className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full h-full rounded-[8px] p-[16px] pb-[56px] outline-none resize-none`}
                style={{ background: 'var(--b0-container, #ffffff)', border: `0.5px solid ${textareaFocused ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--line-l2, rgba(0,0,0,0.2))'}`, minHeight: 160, transition: 'border-color 0.15s ease' }}
                onFocus={() => setTextareaFocused(true)}
                onBlur={() => setTextareaFocused(false)}
                placeholder="Define your assistant's identity: name, tone, and response style"
                value={persona}
                onChange={e => { setPersona(e.target.value); dirtyRef.current = true; }}
              />
              <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
                <button
                  className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] font-medium`}
                  style={{
                    height: 40,
                    padding: '9px 20px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: persona.trim() ? 'pointer' : 'not-allowed',
                    background: persona.trim() ? '#49A3A6' : 'rgba(0,0,0,0.05)',
                    color: persona.trim() ? '#fff' : 'rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => {
                    if (dirtyRef.current) {
                      dirtyRef.current = false;
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 2000);
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Connected chat UI ── */
function AgentChat({ onNavigate, onDisconnect }: { onNavigate: (page: Page) => void; onDisconnect: () => void }) {
  const [messages, setMessages] = useState([INITIAL_AGENT_MESSAGE]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'agent', text: `I'll look into "${text}" right away. I've also logged this as a new thread in your history for reference.` },
      ]);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 50);
    }, 1200);

    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Topbar — matches Thread */}
      <div className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0">
        <div className="flex-1 min-w-0">
          <ThreadSwitcherDropdown
            activeId="__agent__"
            onSelect={(id) => onNavigate(`thread/${id}` as Page)}
            trigger={
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
            }
          />
        </div>
        <div className="flex items-center gap-[16px] shrink-0">
          <button
            className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setSettingsOpen(true)}
          >
            <CdnIcon name="settings-l" size={16} />
          </button>
        </div>
      </div>

      {/* Content — matches Thread layout */}
      <div className="flex-1 flex flex-col items-center min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 w-full" style={{ maxWidth: 840 }}>
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[64px]">
            <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full pt-[16px]">
              {messages.map((msg, i) =>
                msg.role === 'user' ? (
                  <div key={i} className="flex flex-col items-end w-full">
                    <div className="max-w-[560px] px-[16px] py-[12px]" style={{ background: 'rgba(73,163,166,0.1)', borderRadius: 8 }}>
                      <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col gap-[16px] items-start w-full">
                    <img src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`} alt="Alva" style={{ height: 14, width: 'auto' }} />
                    <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full`}>
                      {msg.text}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Input — uses ChatInput same as Thread */}
          <div className="px-[28px] pb-[24px] shrink-0">
            <ChatInput shadow onSend={handleSend} placeholder="Message your Alva Agent..." />
          </div>
        </div>
      </div>
      {settingsOpen && <AgentSettingsModal onClose={() => setSettingsOpen(false)} onDisconnect={onDisconnect} />}
    </div>
  );
}

const AGENT_CONNECTED_KEY = 'agentConnected';

/* ── Main Agent page ── */
export default function Agent({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [state, setState] = useState<AgentState>(() =>
    localStorage.getItem(AGENT_CONNECTED_KEY) === '1' ? 'connected' : 'empty',
  );

  const handleConnect = useCallback(() => {
    setState('connecting');
    setTimeout(() => {
      localStorage.setItem(AGENT_CONNECTED_KEY, '1');
      setState('connected');
    }, 2000);
  }, []);

  const handleDisconnect = useCallback(() => {
    localStorage.removeItem(AGENT_CONNECTED_KEY);
    setState('empty');
  }, []);

  return (
    <AppShell activePage="agent" onNavigate={onNavigate}>
      <div className="h-screen flex flex-col bg-white">
        {state === 'empty' && <EmptyState onConnect={handleConnect} />}
        {state === 'connecting' && <ConnectingState />}
        {state === 'connected' && <AgentChat onNavigate={onNavigate} onDisconnect={handleDisconnect} />}
      </div>
    </AppShell>
  );
}
