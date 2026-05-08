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
import { DiscordConnectModal } from '@/app/components/shared/DiscordConnectModal';
import { AlertsPopover } from '@/app/components/shared/AlertsPopover';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';

type AgentState = 'empty' | 'connecting' | 'connected';

const FONT = "font-['Delight',sans-serif]";

/* ── Feature cards for empty state ── */
const FEATURES = [
  { icon: 'clock-l', title: 'Proactive push', desc: 'Playbooks reach you when signals move, not when you check.' },
  { icon: 'bot-l', title: 'Messenger-native', desc: 'Telegram and Discord become your market feed inbox.' },
  { icon: 'memory-l', title: 'Context memory', desc: 'Your agent remembers portfolios, themes, and preferences.' },
  { icon: 'update-l', title: 'Always-on runtime', desc: 'Feeds keep running in Alva while you are away.' },
];

/* \u2500\u2500 Push-ready playbooks with feed items \u2500\u2500 */
interface FeedItem {
  time: string;
  title: string;
  bullets?: string[];
}

interface PushPlaybook extends ExplorePlaybook {
  feeds: FeedItem[];
}

const PUSH_PLAYBOOKS: PushPlaybook[] = [
  {
    id: 'ai-chip-supply-chain',
    title: 'AI Chip Supply Chain',
    creator: 'ivan',
    description: 'TSMC capacity, HBM supply, and foundry signals — distilled into a daily push digest.',
    tickers: ['NVDA', 'TSM', 'AMD'],
    pulse: 'active',
    stars: 4200,
    remixes: 12,
    cover: { template: 'general', title: 'AI Chip Supply Chain', author: 'ivan', tickers: ['NVDA', 'TSM', 'AMD'], domain: 'alerts', kind: 'NOTIFICATIONS · DAILY', anchor: '7 today', series: 'NEWS · SOCIAL · PODCAST' },
    feeds: [
      {
        time: 'May 8, 12:00 PM',
        title: 'AMD to Entrust 2nm Production to Samsung Foundry',
        bullets: [
          'Samsung Electronics has entered into substantive discussions with AMD to secure 2nm chip production orders.',
          'TSMC remains the dominant foundry partner for NVDA and Apple, but capacity constraints at N3E are pushing second-tier clients to explore alternatives.',
        ],
      },
      {
        time: 'May 7, 12:00 PM',
        title: 'HBM3E Supply Tightens as NVDA Ramps B200',
        bullets: [
          'SK Hynix HBM3E allocation for Q3 is 95% spoken for; Samsung HBM3E yield reportedly improved to 60%.',
          'NVDA B200 board-level assembly now pulling 40% more HBM per unit vs H100.',
        ],
      },
      {
        time: 'May 6, 12:00 PM',
        title: 'Intel Foundry Secures MSFT Custom Chip Deal',
        bullets: [
          "Intel 18A process locked in for Microsoft's next-gen custom AI accelerator, slated for 2026 volume.",
          "Deal reportedly worth $3B+ over 3 years; Intel Foundry's first major external win at 18A node.",
        ],
      },
    ],
  },
  {
    id: 'fed-macro-pulse',
    title: 'Fed & Macro Pulse',
    creator: 'steven',
    description: 'FOMC, CPI, NFP — every key release with Alva’s read pushed the moment it lands.',
    tickers: ['SPY', 'TLT', 'DXY'],
    pulse: 'active',
    stars: 3700,
    remixes: 8,
    cover: { template: 'general', title: 'Fed & Macro Pulse', author: 'steven', tickers: ['SPY', 'TLT', 'DXY'], domain: 'macro', kind: 'NOTIFICATIONS · ON RELEASE', anchor: 'Next: CPI', series: '12 RELEASES TRACKED' },
    feeds: [
      {
        time: 'May 7, 8:30 AM',
        title: 'April NFP: +177K vs +138K est.',
        bullets: [
          'Payrolls beat consensus by 39K; prior month revised down from +228K to +185K.',
          'Unemployment rate held at 4.2%. Average hourly earnings +0.2% MoM, cooling from +0.3%.',
          'Market reaction: 2Y yield -4bps, SPY +0.6% in first 30 min. Rate cut odds for Sep rose to 62%.',
        ],
      },
      {
        time: 'May 2, 2:00 PM',
        title: 'FOMC Holds at 4.25\u20134.50%',
        bullets: [
          'Fed kept rates unchanged as expected. Statement language largely unchanged.',
          'Powell press conference: "We need to see more data before adjusting policy." No explicit timeline for cuts.',
        ],
      },
      {
        time: 'Apr 30, 8:30 AM',
        title: 'Q1 GDP Misses: +1.1% vs +2.0% est.',
        bullets: [
          'First-quarter GDP growth slowed sharply; consumer spending decelerated to +2.0% from +3.4%.',
          'Core PCE within the report ran hot at +3.7% annualized, complicating the rate-cut narrative.',
        ],
      },
    ],
  },
  {
    id: 'whale-wallet-tracker',
    title: 'Whale Wallet Tracker',
    creator: 'deepstonks',
    description: 'Large wallet moves and exchange-flow shifts, alerted in real time.',
    tickers: ['BTC', 'ETH', 'SOL'],
    pulse: 'active',
    stars: 6100,
    remixes: 21,
    cover: { template: 'general', title: 'Whale Wallet Tracker', author: 'deepstonks', tickers: ['BTC', 'ETH', 'SOL'], domain: 'alerts', kind: 'NOTIFICATIONS · LIVE', anchor: '24 today', series: '120+ WALLETS · 60S' },
    feeds: [
      {
        time: 'May 8, 11:42 AM',
        title: '2,400 BTC moved from unknown wallet to Coinbase',
        bullets: [
          'Wallet 1A1zP1... transferred 2,400 BTC ($234M) to Coinbase Prime in a single transaction.',
          'This wallet has been dormant for 14 months. Last activity was a 1,800 BTC withdrawal from Binance.',
        ],
      },
      {
        time: 'May 8, 9:15 AM',
        title: 'Ethereum Foundation sells 15,000 ETH',
        bullets: [
          'EF multi-sig executed a 15,000 ETH ($38.7M) transfer to Kraken over two transactions.',
          'Follows a pattern of quarterly treasury management; similar sale occurred Feb 12.',
        ],
      },
      {
        time: 'May 7, 6:03 PM',
        title: 'Jump Trading moves 50M USDC to Binance',
        bullets: [
          'Jump-linked wallet deposited 50M USDC to Binance in a single transfer; on-chain labels confirmed.',
          'Coincides with elevated SOL perp open interest — possible positioning ahead of the Solana upgrade.',
        ],
      },
    ],
  },
];

/* ── Mock agent messages ── */
export const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

function StatusPill({ status }: { status: FeedPreviewStatus }) {
  const pushed = status === 'pushed';
  return (
    <span
      className={`${FONT} inline-flex items-center gap-[5px] rounded-full px-[8px] py-[2px] text-[11px] leading-[18px] tracking-[0.11px]`}
      style={{
        color: pushed ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5, rgba(0,0,0,0.5))',
        background: pushed ? 'rgba(73,163,166,0.1)' : 'rgba(0,0,0,0.04)',
      }}
    >
      <span
        className="size-[5px] rounded-full"
        style={{ background: pushed ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.28)' }}
      />
      {pushed ? 'pushed' : 'skipped'}
    </span>
  );
}

function PlaybookFeedPreview({
  activeFeed,
  activeFeedId,
  onSelect,
  onNavigate,
}: {
  activeFeed: FeedPreviewPlaybook;
  activeFeedId: string;
  onSelect: (id: string) => void;
  onNavigate?: (page: Page) => void;
}) {
  return (
    <section className="flex flex-col gap-[14px] w-full">
      <div className="flex flex-col gap-[4px] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-[2px] min-w-0">
          <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
            Live feeds from Playbooks
          </p>
          <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
            Preview only. Connect Alva Agent to receive these pushes in Telegram or Discord.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.('template-notification')}
          className={`${FONT} flex items-center gap-[4px] self-start sm:self-auto text-[12px] leading-[20px] tracking-[0.12px] cursor-pointer border-none bg-transparent p-0 transition-colors hover:text-[var(--text-n9)]`}
          style={{ color: 'var(--text-n5)' }}
        >
          Open playbook feed
          <CdnIcon name="arrow-right-l1" size={12} color="currentColor" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[286px_minmax(0,1fr)] gap-[16px] w-full items-start">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-[8px] w-full">
          {PLAYBOOK_FEED_PREVIEWS.map(feed => {
            const active = activeFeedId === feed.id;
            return (
              <button
                key={feed.id}
                type="button"
                onClick={() => onSelect(feed.id)}
                className="flex flex-col gap-[5px] text-left cursor-pointer rounded-[8px] p-[12px] transition-colors"
                style={{
                  background: active ? 'var(--b0-container, #fff)' : 'rgba(255,255,255,0.58)',
                  border: `0.5px solid ${active ? feed.accent : 'rgba(0,0,0,0.1)'}`,
                  boxShadow: active ? '0 10px 24px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <div className="flex items-center gap-[8px] w-full">
                  <span className="size-[8px] rounded-full shrink-0" style={{ background: feed.accent }} />
                  <span className={`${FONT} min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                    {feed.title}
                  </span>
                </div>
                <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] truncate`}>
                  @{feed.author} · {feed.cadence}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-[10px] min-w-0">
          <div
            className="flex flex-col gap-[4px] rounded-[8px] px-[14px] py-[12px]"
            style={{
              background: 'rgba(255,255,255,0.72)',
              border: '0.5px solid rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex flex-wrap items-center gap-[8px]">
              <span className="size-[8px] rounded-full" style={{ background: activeFeed.accent }} />
              <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                {activeFeed.title}
              </p>
              <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                {activeFeed.cadence}
              </span>
            </div>
            <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
              {activeFeed.description}
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            {activeFeed.items.map(item => (
              <article
                key={item.id}
                className="grid grid-cols-[28px_minmax(0,1fr)] gap-[10px] rounded-[8px] px-[12px] py-[12px]"
                style={{
                  background: 'var(--b0-container, #fff)',
                  border: '0.5px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.045)',
                }}
              >
                <div
                  className="flex items-center justify-center size-[28px] rounded-full shrink-0"
                  style={{ background: `${activeFeed.accent}18` }}
                >
                  <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px]`} style={{ color: activeFeed.accent }}>
                    A
                  </span>
                </div>
                <div className="flex flex-col gap-[8px] min-w-0">
                  <div className="flex flex-wrap items-center gap-[6px] min-w-0">
                    <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n7)]`}>
                      {item.mode}
                    </span>
                    <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n3)]`}>
                      {item.time}
                    </span>
                    <StatusPill status={item.status} />
                  </div>
                  <div className="flex flex-col gap-[4px] min-w-0">
                    <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                      {item.headline}
                    </p>
                    <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                      {item.digest}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-[6px]">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className={`${FONT} rounded-full px-[7px] py-[1px] text-[11px] leading-[18px] tracking-[0.11px]`}
                        style={{
                          color: 'var(--text-n7)',
                          background: 'rgba(0,0,0,0.04)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Empty state ── */
export function AgentEmptyState({
  onTelegramConnect,
  onDiscordPaired,
  onNavigate,
}: {
  onTelegramConnect: () => void;
  onDiscordPaired: () => void;
  onNavigate?: (page: Page) => void;
}) {
  const [discordFlowOpen, setDiscordFlowOpen] = useState(false);
  const [activePlaybook, setActivePlaybook] = useState(PUSH_PLAYBOOKS[0].id);
  const [feedHovered, setFeedHovered] = useState(false);
  const [alertsPopoverOpen, setAlertsPopoverOpen] = useState(false);

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
        <div className="flex flex-col items-center gap-[24px] w-full max-w-[1336px] px-[28px] py-[48px]">
        {/* Hero illustration */}
        <div className="flex flex-col items-center max-w-[720px]">
          <img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="Alva Agent" className="rounded-full" style={{ width: 48, height: 48, marginBottom: 20 }} />
          <h1 className={`${FONT} text-[28px] leading-[38px] tracking-[0.28px] text-center text-[var(--text-n9)] font-normal`} style={{ marginBottom: 8 }}>
            Connect Alva Agent to receive live Playbook feeds
          </h1>
          <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-center text-[var(--text-n5)]`}>
            Link Telegram or Discord once. Every subscribed Playbook can push real-time signals, digests, and skipped-event context straight to your messenger.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-m,16px)] w-full">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="flex flex-col gap-[var(--spacing-xxs,4px)] p-[var(--spacing-s,12px)] rounded-[var(--radius-ct-l,8px)]"
              style={{ background: 'var(--b0-container, #ffffff)' }}
            >
              <div className="flex items-center gap-[6px]">
                <CdnIcon name={f.icon} size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
                <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                  {f.title}
                </p>
              </div>
              <p className={`${FONT} text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]`}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Connect buttons — Telegram primary, Discord secondary */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[var(--spacing-m,16px)] w-full">
          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium text-white cursor-pointer transition-opacity hover:opacity-90 w-full lg:w-[280px]`}
            style={{ height: 48, padding: '11px 20px', borderRadius: 6, background: '#24A1DE', border: 'none' }}
            onClick={onTelegramConnect}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
            </svg>
            Connect Telegram
          </button>

          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium cursor-pointer transition-colors w-full lg:w-[280px]`}
            style={{
              height: 48,
              padding: '11px 20px',
              borderRadius: 6,
              background: 'transparent',
              color: 'var(--text-n9)',
              border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--b-r03, rgba(0,0,0,0.03))'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            onClick={() => setDiscordFlowOpen(true)}
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
                    background: 'var(--b-r03, rgba(0,0,0,0.03))',
                    padding: '4px 12px 4px 6px',
                  }}
                >
                  <img src={`${import.meta.env.BASE_URL}${p.file}`} alt={p.name} style={{ width: 18, height: 18 }} />
                  <span
                    className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px]`}
                    style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}
                  >
                    {p.name}
                  </span>
                </span>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Live feeds from Playbooks */}
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex items-end justify-between gap-[12px]">
            <div className="flex flex-col gap-[2px]">
              <p className={`${FONT} text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                Live feeds from Playbooks
              </p>
              <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                Preview only. Connect Alva Agent to receive these pushes in Telegram or Discord.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-[var(--spacing-m,16px)] w-full">
            {/* Left: Playbook cards — horizontal scroll on mobile, 1/4 col on desktop */}
            <div className="flex lg:flex-col gap-[var(--spacing-m,16px)] overflow-x-auto lg:overflow-x-visible lg:w-1/4 shrink-0">
              {PUSH_PLAYBOOKS.map(p => (
                <div
                  key={p.id}
                  className="min-w-[220px] lg:min-w-0"
                  onClick={() => setActivePlaybook(p.id)}
                >
                  <PlaybookCard p={p} noCover selected={p.id === activePlaybook} />
                </div>
              ))}
            </div>

            {/* Right: Feed items */}
            <div
              className="flex flex-col flex-1 min-w-0 rounded-[var(--radius-ct-l,8px)] relative"
              style={{ background: 'var(--b0-container, #fff)' }}
              onMouseEnter={() => setFeedHovered(true)}
              onMouseLeave={() => setFeedHovered(false)}
            >
              {(feedHovered || alertsPopoverOpen) && (
                <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-primary-reverse btn-small"
                    style={{ boxShadow: 'var(--shadow-s)' }}
                    onClick={() => onNavigate?.('template-notification')}
                  >
                    View Playbook
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button
                      className="btn btn-primary btn-small"
                      style={{ boxShadow: 'var(--shadow-s)' }}
                      onClick={() => setAlertsPopoverOpen(o => !o)}
                    >
                      Get Alerts
                    </button>
                    <AlertsPopover
                      open={alertsPopoverOpen}
                      onClose={() => setAlertsPopoverOpen(false)}
                      onTelegram={() => {
                        setAlertsPopoverOpen(false);
                        onTelegramConnect();
                      }}
                      onDiscord={() => {
                        setAlertsPopoverOpen(false);
                        setDiscordFlowOpen(true);
                      }}
                    />
                  </div>
                </div>
              )}
              {PUSH_PLAYBOOKS.find(p => p.id === activePlaybook)?.feeds.map((feed, i, arr) => (
                <div key={i}>
                  <div className="flex flex-col gap-[var(--spacing-xs,8px)] p-[var(--spacing-m,16px)]">
                    <p className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                      {feed.time} <span className="text-[var(--text-n3)]">·</span> {PUSH_PLAYBOOKS.find(p => p.id === activePlaybook)?.id}
                    </p>
                    <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] font-medium`}>
                      {feed.title}
                    </p>
                    {feed.bullets && (
                      <ul className="alva-md-bullets">
                        {feed.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mx-[var(--spacing-m,16px)]" style={{ height: '0.5px', background: 'var(--line-l1, rgba(0,0,0,0.1))' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
       </div>
      </div>

      <DiscordConnectModal
        isOpen={discordFlowOpen}
        onClose={() => setDiscordFlowOpen(false)}
        onPaired={() => {
          setDiscordFlowOpen(false);
          onDiscordPaired();
        }}
      />
    </div>
  );
}

/* ── Connecting state ── */
function ConnectingState({ platform }: { platform: AgentPlatform }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-0 gap-[20px]">
      <AlvaLoading size={36} />
      <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]`}>
        Connecting to {platform === 'discord' ? 'Discord' : 'Telegram'}...
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
  const { platforms, connect } = useAgentPlatforms();
  const [connecting, setConnecting] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<AgentPlatform>('telegram');
  const connected = platforms.length > 0;
  const state: AgentState = connecting ? 'connecting' : connected ? 'connected' : 'empty';

  const handleConnect = useCallback((next: AgentPlatform) => {
    setConnectingPlatform(next);
    setConnecting(true);
    setTimeout(() => {
      connect(next);
      setConnecting(false);
    }, 2000);
  }, [connect]);

  return (
    <AppShell activePage="agent" onNavigate={onNavigate}>
      <div className="h-screen flex flex-col bg-white">
        {state === 'empty' && (
          <AgentEmptyState
            onTelegramConnect={() => handleConnect('telegram')}
            onDiscordPaired={() => handleConnect('discord')}
            onNavigate={onNavigate}
          />
        )}
        {state === 'connecting' && <ConnectingState platform={connectingPlatform} />}
        {state === 'connected' && <AgentChat onNavigate={onNavigate} />}
      </div>
    </AppShell>
  );
}
