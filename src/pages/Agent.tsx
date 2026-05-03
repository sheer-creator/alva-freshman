import { useState, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { ChatMessages } from '@/app/components/chat/ChatMessages';
import { AlvaLoading } from '@/app/components/shared/AlvaLoading';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { Dropdown } from '@/app/components/shared/Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';
import DotMatrixWave from '@/app/components/shared/DotMatrixWave';
import { Tooltip } from '@/app/components/shared/Tooltip';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';

type AgentState = 'empty' | 'connecting' | 'connected';

const FONT = "font-['Delight',sans-serif]";

/* ── Feature cards for empty state ── */
const FEATURES = [
  { icon: 'bot-l', title: 'Full Alva in your messenger', desc: 'Run analysis, build Playbooks, tweak strategies — right inside Telegram or Discord.' },
  { icon: 'memory-l', title: 'Memory that compounds', desc: 'Your positions, your thesis, your preferences — every conversation builds on the last.' },
  { icon: 'clock-l', title: 'Reaches you first', desc: 'Schedule any alert or report — your agent also knows when to reach out on its own.' },
  { icon: 'update-l', title: 'Runs while you don\u2019t', desc: 'Live 24/7 in a secure cloud sandbox. Never drops, never sleeps.' },
];

/* \u2500\u2500 Push-ready Notification playbooks \u2500\u2500 */
const PUSH_PLAYBOOKS: ExplorePlaybook[] = [
  {
    id: 'ai-chip-supply-chain',
    creator: 'ivan',
    title: 'AI Chip Supply Chain',
    description: 'TSMC capacity, HBM supply, and foundry signals \u2014 distilled into a daily push digest.',
    tickers: ['NVDA', 'TSM', 'AMD'],
    pulse: 'active',
    stars: 4200,
    remixes: 12,
    cover: {
      template: 'general',
      title: 'AI Chip Supply Chain',
      author: 'ivan',
      tickers: ['NVDA', 'TSM', 'AMD'],
      domain: 'alerts',
      kind: 'NOTIFICATIONS \u00b7 DAILY',
      anchor: '7 today',
      series: 'NEWS \u00b7 SOCIAL \u00b7 PODCAST',
    },
  },
  {
    id: 'fed-macro-pulse',
    creator: 'steven',
    title: 'Fed & Macro Pulse',
    description: 'FOMC, CPI, NFP \u2014 every key release with Alva\u2019s read pushed the moment it lands.',
    tickers: ['SPY', 'TLT', 'DXY'],
    pulse: 'active',
    stars: 3700,
    remixes: 8,
    cover: {
      template: 'general',
      title: 'Fed & Macro Pulse',
      author: 'steven',
      tickers: ['SPY', 'TLT', 'DXY'],
      domain: 'macro',
      kind: 'NOTIFICATIONS \u00b7 ON RELEASE',
      anchor: 'Next: CPI',
      series: '12 RELEASES TRACKED',
    },
  },
  {
    id: 'whale-wallet-tracker',
    creator: 'deepstonks',
    title: 'Whale Wallet Tracker',
    description: 'Large wallet moves and exchange-flow shifts, alerted in real time.',
    tickers: ['BTC', 'ETH', 'SOL'],
    pulse: 'active',
    stars: 6100,
    remixes: 21,
    cover: {
      template: 'general',
      title: 'Whale Wallet Tracker',
      author: 'deepstonks',
      tickers: ['BTC', 'ETH', 'SOL'],
      domain: 'alerts',
      kind: 'NOTIFICATIONS \u00b7 LIVE',
      anchor: '24 today',
      series: '120+ WALLETS \u00b7 60S',
    },
  },
];

/* ── Mock agent messages ── */
export const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

/* ── Empty state ── */
export function AgentEmptyState({ onConnect, onNavigate }: { onConnect: (platform: AgentPlatform) => void; onNavigate?: (page: Page) => void }) {
  return (
    <div className="flex flex-1 flex-col min-h-0 relative" style={{ background: '#F6F6F6' }}>
      <DotMatrixWave
        enableHover={false}
        bgColor="#F6F6F6"
        dotColor="#d1e0e0"
        waveSpeed={0.6}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto">
       <div className="min-h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-[24px] w-full max-w-[1280px] px-[24px] py-[48px]">
        {/* Hero illustration */}
        <div className="flex flex-col items-center">
          <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 48, height: 48, marginBottom: 20 }} />
          <h1 className={`${FONT} text-[28px] leading-[38px] tracking-[0.28px] text-center text-[var(--text-n9)] font-normal`} style={{ marginBottom: 8 }}>
            Your Alva Agent is ready
          </h1>
          <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-center text-[var(--text-n5)] whitespace-nowrap`}>
            Connect Telegram or Discord and let your agent work for you around the clock.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-4 gap-[12px] w-full">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="flex flex-col gap-[8px] p-[14px] rounded-[var(--radius-ct-l,8px)]"
              style={{ background: 'var(--b0-container, #ffffff)' }}
            >
              <CdnIcon name={f.icon} size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
              <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                {f.title}
              </p>
              <p className={`${FONT} text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]`}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Connect buttons — Telegram primary, Discord secondary */}
        <div className="flex flex-row items-center justify-center gap-[12px] w-full">
          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium text-white cursor-pointer transition-opacity hover:opacity-90`}
            style={{ height: 48, width: 280, padding: '11px 20px', borderRadius: 6, background: '#24A1DE', border: 'none' }}
            onClick={() => onConnect('telegram')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
            </svg>
            Connect Telegram
          </button>

          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium cursor-pointer transition-colors`}
            style={{ height: 48, width: 280, padding: '11px 20px', borderRadius: 6, background: 'transparent', color: 'var(--text-n9)', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--b-r03, rgba(0,0,0,0.03))'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            onClick={() => onConnect('discord')}
          >
            <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" style={{ width: 20, height: 20 }} />
            Connect Discord
          </button>
        </div>

        {/* More channels — Slack/WhatsApp/Line coming soon */}
        <div className="flex flex-col items-center gap-[12px]">
          <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
            Same agent, more channels
          </span>
          <div className="flex items-center gap-[8px]">
            {[
              { name: 'Slack', file: 'logo-social-slack.svg' },
              { name: 'WhatsApp', file: 'logo-social-whatsapp.svg' },
              { name: 'Line', file: 'logo-social-line.svg' },
            ].map(p => (
              <Tooltip key={p.name} text="Coming Soon">
                <span
                  aria-disabled="true"
                  className="flex items-center gap-[6px] rounded-full border-none cursor-not-allowed"
                  style={{
                    background: 'var(--b-r05)',
                    padding: '4px 12px 4px 6px',
                    opacity: 0.7,
                  }}
                >
                  <img src={`${import.meta.env.BASE_URL}${p.file}`} alt={p.name} style={{ width: 18, height: 18 }} />
                  <span
                    className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px]`}
                    style={{ color: 'var(--text-n5)' }}
                  >
                    {p.name}
                  </span>
                </span>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Push-ready Notification playbooks */}
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex items-end justify-between gap-[12px]">
            <div className="flex flex-col gap-[2px]">
              <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                Subscribe to push-ready Playbooks
              </p>
              <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                Hand-picked Playbooks that deliver as updates land — straight to your messenger.
              </p>
            </div>
            <span
              className={`${FONT} flex items-center gap-[4px] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] cursor-pointer hover:text-[var(--text-n9)] transition-colors shrink-0`}
              onClick={() => onNavigate?.('explore-2')}
            >
              Browse all
              <CdnIcon name="arrow-right-l1" size={12} color="currentColor" />
            </span>
          </div>
          <div className="grid grid-cols-3 gap-[16px] w-full">
            {PUSH_PLAYBOOKS.map(p => (
              <PlaybookCard key={p.id} p={p} simple />
            ))}
          </div>
        </div>
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

/* ── Connected chat UI (supports agent view + inline thread view) ── */
function AgentChat({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeView, setActiveView] = useState<'__agent__' | string>('__agent__');
  const [messages, setMessages] = useState([INITIAL_AGENT_MESSAGE]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAgent = activeView === '__agent__';
  const threadTitle = !isAgent ? (CONVERSATIONS.find(c => c.id === activeView)?.label ?? 'New Chat') : '';
  const hasThreadContent = !isAgent && activeView !== 'new' && CONVERSATIONS.some(c => c.id === activeView);

  const handleSwitcherSelect = useCallback((id: string) => {
    setActiveView(id);
  }, []);

  const handleSend = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'agent', text: `I'll look into "${text}" right away. I've also logged this as a new chat in your history for reference.` },
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
                    {threadTitle}
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                </div>
              )
            }
          />
        </div>
        <div className="flex items-center gap-[16px] shrink-0">
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => onNavigate('thread/new' as Page)}>
            <CdnIcon name="chat-new-l" size={16} />
          </button>
          {isAgent ? (
            <button
              className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => onNavigate('alva-agent')}
            >
              <CdnIcon name="settings-l" size={16} />
            </button>
          ) : (
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
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0 w-full" style={{ maxWidth: 896 }}>
          {isAgent ? (
            <>
              <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[64px]">
                <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full pt-[16px]">
                  {messages.map((msg, i) =>
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
                <ChatInput shadow onSend={handleSend} placeholder="Message your Alva Agent..." />
              </div>
            </>
          ) : hasThreadContent ? (
            <>
              <div className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[64px]">
                <ChatMessages conversationId={activeView} />
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
  );
}

/* ── Main Agent page ── */
export default function Agent({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { platforms, toggle } = useAgentPlatforms();
  const [connecting, setConnecting] = useState(false);
  const connected = platforms.length > 0;
  const state: AgentState = connecting ? 'connecting' : connected ? 'connected' : 'empty';

  const handleConnect = useCallback((next: AgentPlatform) => {
    setConnecting(true);
    setTimeout(() => {
      toggle(next);
      setConnecting(false);
    }, 2000);
  }, [toggle]);

  return (
    <AppShell activePage="agent" onNavigate={onNavigate}>
      <div className="h-screen flex flex-col bg-white">
        {state === 'empty' && <AgentEmptyState onConnect={handleConnect} onNavigate={onNavigate} />}
        {state === 'connecting' && <ConnectingState />}
        {state === 'connected' && <AgentChat onNavigate={onNavigate} />}
      </div>
    </AppShell>
  );
}
