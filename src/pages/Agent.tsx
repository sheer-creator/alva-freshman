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
import { DiscordConnectFlow } from '@/app/components/shared/DiscordConnectFlow';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';

type AgentState = 'empty' | 'connecting' | 'connected';

const FONT = "font-['Delight',sans-serif]";

/* ── Feature cards for empty state ── */
const FEATURES = [
  { icon: 'bot-l', title: 'Messenger-native', desc: 'Telegram and Discord become your market feed inbox.' },
  { icon: 'memory-l', title: 'Context memory', desc: 'Your agent remembers portfolios, themes, and preferences.' },
  { icon: 'clock-l', title: 'Proactive push', desc: 'Playbooks reach you when signals move, not when you check.' },
  { icon: 'update-l', title: 'Always-on runtime', desc: 'Feeds keep running in Alva while you are away.' },
];

type FeedPreviewStatus = 'pushed' | 'skipped';

interface FeedPreviewItem {
  id: string;
  time: string;
  mode: string;
  status: FeedPreviewStatus;
  headline: string;
  digest: string;
  tags: string[];
}

interface FeedPreviewPlaybook {
  id: string;
  title: string;
  author: string;
  cadence: string;
  description: string;
  accent: string;
  items: FeedPreviewItem[];
}

const PLAYBOOK_FEED_PREVIEWS: FeedPreviewPlaybook[] = [
  {
    id: 'ai-chip-supply-chain',
    title: 'AI Chip Supply Chain',
    author: 'ivan',
    cadence: 'Daily digest',
    description: 'TSMC capacity, HBM supply, foundry commentary, and AI infrastructure bottlenecks.',
    accent: '#49A3A6',
    items: [
      {
        id: 'ai-chip-1',
        time: '5m ago',
        mode: 'Market close digest',
        status: 'pushed',
        headline: 'HBM scarcity is becoming the near-term limiter for GPU shipments.',
        digest: 'SK hynix and supplier commentary both point to memory allocation pressure. Watch NVDA, AMD, TSM, MU into the next earnings cycle.',
        tags: ['NVDA', 'TSM', 'AMD', 'X + filings'],
      },
      {
        id: 'ai-chip-2',
        time: '42m ago',
        mode: 'Social read-through',
        status: 'pushed',
        headline: 'TSMC capacity discussion is clustering around 2027 expansion, not 2026 relief.',
        digest: 'Alva grouped 9 related posts and kept 3 after dedupe. The final push links the theme back to AI accelerator supply assurance.',
        tags: ['TSM', 'SOXX', '9 sources'],
      },
      {
        id: 'ai-chip-3',
        time: '2h ago',
        mode: 'Relevance filter',
        status: 'skipped',
        headline: 'Gaming GPU channel checks were skipped for low AI infrastructure relevance.',
        digest: 'The event was written to the feed history, but not pushed because it did not change the core AI chip supply-chain thesis.',
        tags: ['Skipped', 'low relevance'],
      },
    ],
  },
  {
    id: 'fed-macro-pulse',
    title: 'Fed & Macro Pulse',
    author: 'steven',
    cadence: 'On release',
    description: 'CPI, payrolls, FOMC language, Treasury moves, and USD liquidity pressure.',
    accent: '#6B7FD7',
    items: [
      {
        id: 'macro-1',
        time: '11m ago',
        mode: 'Release reaction',
        status: 'pushed',
        headline: 'Core services inflation cooled, but shelter keeps the first-cut window unchanged.',
        digest: 'Alva flagged a knee-jerk equity bid and a smaller move in 2Y yields. The push included SPY, TLT, DXY context.',
        tags: ['SPY', 'TLT', 'DXY', 'CPI'],
      },
      {
        id: 'macro-2',
        time: '1h ago',
        mode: 'Fed speaker watch',
        status: 'pushed',
        headline: 'Two Fed speakers repeated data-dependent language without adding a new policy signal.',
        digest: 'The feed pushed a short note because positioning was stretched into the remarks and rates volatility stayed elevated.',
        tags: ['Fed', 'Rates', 'VIX'],
      },
      {
        id: 'macro-3',
        time: '3h ago',
        mode: 'Noise guard',
        status: 'skipped',
        headline: 'Regional manufacturing survey was logged but not pushed.',
        digest: 'The change was below the playbook threshold and did not affect the weekly macro risk score.',
        tags: ['Skipped', 'threshold'],
      },
    ],
  },
  {
    id: 'whale-wallet-tracker',
    title: 'Whale Wallet Tracker',
    author: 'deepstonks',
    cadence: 'Live',
    description: 'Large wallet moves, exchange inflows, stablecoin rotations, and on-chain risk shifts.',
    accent: '#D98B3A',
    items: [
      {
        id: 'whale-1',
        time: '2m ago',
        mode: 'Exchange flow',
        status: 'pushed',
        headline: 'A BTC whale moved 3.2k BTC toward Binance after 11 months dormant.',
        digest: 'The feed grouped the wallet move with rising spot volume and sent a caution push for BTC and ETH beta exposure.',
        tags: ['BTC', 'Binance', 'Live'],
      },
      {
        id: 'whale-2',
        time: '18m ago',
        mode: 'Stablecoin rotation',
        status: 'pushed',
        headline: 'USDC mint flow picked up while SOL perp funding stayed positive.',
        digest: 'Alva pushed the cross-signal because liquidity improved without a matching spot breakout yet.',
        tags: ['USDC', 'SOL', 'Funding'],
      },
      {
        id: 'whale-3',
        time: '54m ago',
        mode: 'Duplicate guard',
        status: 'skipped',
        headline: 'Repeated ETH exchange inflow alert was deduped.',
        digest: 'The move shared the same source wallet and transaction path as the earlier push, so followers were not pinged twice.',
        tags: ['Skipped', 'dedupe'],
      },
    ],
  },
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
  const [activeFeedId, setActiveFeedId] = useState(PLAYBOOK_FEED_PREVIEWS[0].id);
  const activeFeed =
    PLAYBOOK_FEED_PREVIEWS.find(feed => feed.id === activeFeedId) ?? PLAYBOOK_FEED_PREVIEWS[0];

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
       <div className="min-h-full flex items-start justify-center">
        <div className="flex flex-col items-center gap-[22px] w-full max-w-[1180px] px-[20px] py-[36px] lg:px-[28px]">
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

        {/* Connect buttons — Telegram primary, Discord secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px] w-full">
          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium text-white cursor-pointer transition-opacity hover:opacity-90 w-full sm:w-[280px]`}
            style={{ height: 48, padding: '11px 20px', borderRadius: 6, background: '#24A1DE', border: 'none' }}
            onClick={onTelegramConnect}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.8693 2.23048C17.8693 2.23048 19.6246 1.54575 19.4783 3.20864C19.4295 3.89337 18.9907 6.28986 18.6494 8.88202L17.4793 16.5606C17.4793 16.5606 17.3818 17.6855 16.5042 17.8812C15.6266 18.0768 14.3102 17.1964 14.0664 17.0008C13.8713 16.8541 10.4097 14.6532 9.19079 13.5772C8.84948 13.2838 8.45944 12.6968 9.23954 12.0121L14.3589 7.12132C14.944 6.53442 15.5291 5.16499 13.0913 6.82788L6.26545 11.4742C6.26545 11.4742 5.48535 11.9632 4.02269 11.5231L0.85355 10.5449C0.85355 10.5449 -0.316596 9.81129 1.68238 9.07762C6.558 6.77892 12.5549 4.43132 17.8693 2.23048Z" fill="#ffffff"/>
            </svg>
            Connect Telegram
          </button>

          <button
            className={`${FONT} flex items-center justify-center gap-[8px] text-[16px] leading-[26px] tracking-[0.16px] font-medium cursor-pointer transition-colors w-full sm:w-[280px]`}
            style={{
              height: 48,
              padding: '11px 20px',
              borderRadius: 6,
              background: discordFlowOpen ? 'var(--b-r03, rgba(0,0,0,0.03))' : 'transparent',
              color: 'var(--text-n9)',
              border: `0.5px solid ${discordFlowOpen ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--line-l3, rgba(0,0,0,0.3))'}`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--b-r03, rgba(0,0,0,0.03))'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = discordFlowOpen ? 'var(--b-r03, rgba(0,0,0,0.03))' : 'transparent'; }}
            onClick={() => setDiscordFlowOpen(v => !v)}
          >
            <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" style={{ width: 20, height: 20 }} />
            Connect Discord
          </button>
        </div>

        {discordFlowOpen && (
          <DiscordConnectFlow tone="empty" onPaired={onDiscordPaired} />
        )}

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[10px] w-full">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="flex items-start gap-[10px] p-[12px] rounded-[8px]"
              style={{ background: 'rgba(255,255,255,0.72)', border: '0.5px solid rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center justify-center size-[28px] shrink-0 rounded-[6px]" style={{ background: 'rgba(73,163,166,0.1)' }}>
                <CdnIcon name={f.icon} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
              </div>
              <div className="flex flex-col gap-[2px] min-w-0">
                <p className={`${FONT} text-[13px] leading-[20px] tracking-[0.13px] text-[var(--text-n9)]`}>
                  {f.title}
                </p>
                <p className={`${FONT} text-[12px] leading-[18px] tracking-[0.12px] text-[var(--text-n5)]`}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <PlaybookFeedPreview
          activeFeed={activeFeed}
          activeFeedId={activeFeedId}
          onSelect={setActiveFeedId}
          onNavigate={onNavigate}
        />

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
