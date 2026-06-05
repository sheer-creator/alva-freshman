import { useState, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { ChatMessages } from '@/app/components/chat/ChatMessages';
import { AlvaLoading } from '@/app/components/shared/AlvaLoading';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { Dropdown } from '@/app/components/shared/Dropdown';
import { CONVERSATIONS } from '@/lib/chat-config';
import { DiscordConnectModal } from '@/app/components/shared/DiscordConnectModal';
import { AlertsPopover } from '@/app/components/shared/AlertsPopover';
import { useAgentPlatforms, type AgentPlatform } from '@/lib/agent-connected';
import alvaLogo from '@/app/components/chat/logo-green-black.svg';

type AgentState = 'empty' | 'connecting' | 'connected';

const FONT = "font-['Delight',sans-serif]";

/* ── Feature cards for empty state ── */
const FEATURES = [
  { icon: 'clock-l', title: 'Proactive push', desc: 'Playbooks reach you when signals move, not when you check.' },
  { icon: 'clock-l', title: 'Messenger-native', desc: 'Telegram and Discord become your market feed inbox.' },
  { icon: 'clock-l', title: 'Context memory', desc: 'Your agent remembers portfolios, themes, and preferences.' },
  { icon: 'clock-l', title: 'Always-on runtime', desc: 'Feeds keep running in Alva while you are away.' },
];

/* \u2500\u2500 Push-ready playbooks shown in the empty-state preview \u2500\u2500 */
interface PushPlaybook {
  id: string;
}

const PUSH_PLAYBOOKS: PushPlaybook[] = [
  { id: 'ai-diaspora-tracker-1' },
  { id: 'ai-diaspora-tracker-2' },
  { id: 'ai-diaspora-tracker-3' },
];

const PREVIEW_CARD_TITLE = 'AI Diaspora Tracker';
const PREVIEW_CARD_CREATOR = 'Alva Intern';
const PREVIEW_CARD_DESC = 'Playbooks reach you when signals move, not when you check.';
const PREVIEW_CARD_VIEWS = '12.8K';
const PREVIEW_CARD_REMIXES = 3;
const PREVIEW_ALERT_TITLE = '【Recursive Superintelligence】· DeepMind + OpenAI + Salesforce alliance, exits Stealth mid-May';
const PREVIEW_ALERT_BULLETS = [
  '🧑 Founders: Tim Rocktäschel (fmr DeepMind Principal Scientist / UCL), Richard Socher (fmr Salesforce Chief Scientist), Josh Tobin & Jeff Clune (both fmr OpenAI)',
  '🏢 New company: Recursive Superintelligence (Automate the full frontier AI R&D pipeline: eval / data / training / post-training)',
  '💰 Round: $500M / $4B pre-money; round expected to close above $1B',
  '🤝 Lead: Sequoia, Lightspeed | Follow: Nvidia, Google, DST Global, Index, UK Sovereign AI Fund',
  '📅 Date: 2026-04-27',
];
const PREVIEW_ALERT_JUDGMENT =
  'Judgment: Silver is the most credible name in RL. Pure RL self-supervised approach directly challenges the human-data moat of OpenAI/Anthropic. Nvidia and Google co-investing implies custom compute partnerships and acquisition optionality. Valuation at $5.1B but still Seed — no secondary entry window, only path is chasing Series A pro-rata. Risk: no-human-data approach has no public OOD generalization validation yet; deployment window may be longer than peers. Conclusion: top-tier founder, aggressively chase A round.';

/* ── Mock agent messages ── */
export const INITIAL_AGENT_MESSAGE: { role: 'agent' | 'user'; text: string } = {
  role: 'agent',
  text: 'Hey! I\'m your Alva Agent, connected via Telegram. I\'m always-on and ready to help with market analysis, portfolio tracking, and playbook execution. What would you like to work on?',
};

/* ── Playbook feed preview (mock data; component wired but not yet mounted) ── */
type FeedPreviewStatus = 'pushed' | 'skipped';

interface FeedPreviewItem {
  id: string;
  mode: string;
  time: string;
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
  accent: string;
  description: string;
  items: FeedPreviewItem[];
}

const PLAYBOOK_FEED_PREVIEWS: FeedPreviewPlaybook[] = [
  {
    id: 'ai-infra',
    title: 'AI Infrastructure Tracker',
    author: 'Alva Intern',
    cadence: 'Real-time',
    accent: '#49A3A6',
    description: 'Pushes when silicon, networking, or hyperscaler names break key levels.',
    items: [
      { id: 'a1', mode: 'Signal', time: '2m ago', status: 'pushed', headline: 'NVDA reclaimed its 20D MA on volume', digest: 'Momentum flipped positive; relative strength vs SOX improving.', tags: ['NVDA', 'momentum'] },
      { id: 'a2', mode: 'Digest', time: '1h ago', status: 'skipped', headline: 'Weekly hyperscaler capex recap', digest: 'No threshold breach \u2014 held back to avoid noise.', tags: ['capex', 'weekly'] },
    ],
  },
  {
    id: 'btc-macro',
    title: 'BTC Macro Pulse',
    author: 'Harry Zzz',
    cadence: 'Daily',
    accent: '#E8833A',
    description: 'Daily read on BTC trend, funding, and macro cross-currents.',
    items: [
      { id: 'b1', mode: 'Signal', time: '12m ago', status: 'pushed', headline: 'Funding reset to neutral after the flush', digest: 'OI down 8%, basis normalizing \u2014 squeeze risk easing.', tags: ['BTC', 'funding'] },
    ],
  },
];

function StatusPill({ status }: { status: FeedPreviewStatus }) {
  const pushed = status === 'pushed';
  return (
    <span
      className={`${FONT} inline-flex items-center gap-[5px] rounded-full px-[8px] py-[2px] text-[11px] leading-[18px] tracking-[0.11px]`}
      style={{
        color: pushed ? 'var(--main-m1, #49A3A6)' : 'var(--text-n5, rgba(0,0,0,0.5))',
        background: pushed ? 'var(--main-m1-10)' : 'var(--b-r05)',
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

export function PlaybookFeedPreview({
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
                  border: `0.5px solid ${active ? feed.accent : 'var(--line-l07)'}`,
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
              border: '0.5px solid var(--line-l07)',
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
                  border: '0.5px solid var(--line-l07)',
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
                          background: 'var(--b-r05)',
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

function AgentPreviewCard({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[130px] w-full flex-col items-start gap-[4px] bg-white p-[16px] text-left transition-colors hover:bg-[var(--b-r02)]"
      style={{
        border: 'none',
        borderBottom: '0.5px solid var(--line-l12)',
        background: active ? 'rgba(73, 163, 166, 0.08)' : undefined,
      }}
    >
      <p className={`${FONT} m-0 w-full text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
        {PREVIEW_CARD_TITLE}
      </p>
      <p className={`${FONT} m-0 line-clamp-2 w-full text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
        {PREVIEW_CARD_DESC}
      </p>
      <div className="mt-[4px] flex h-[28px] w-full items-end gap-[12px] pt-[8px]">
        <div className="flex h-[20px] min-w-0 flex-1 items-center gap-[4px]">
          <Avatar name={PREVIEW_CARD_CREATOR} size={18} />
          <span className={`${FONT} min-w-0 flex-1 truncate text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)]`}>
            {PREVIEW_CARD_CREATOR}
          </span>
        </div>
        <span className={`${FONT} flex shrink-0 items-center gap-[4px] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)]`}>
          <CdnIcon name="show-l" size={14} color="var(--text-n9)" />
          {PREVIEW_CARD_VIEWS}
        </span>
        <span className={`${FONT} flex shrink-0 items-center gap-[4px] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)]`}>
          <CdnIcon name="remix-l" size={14} color="var(--text-n9)" />
          {PREVIEW_CARD_REMIXES}
        </span>
      </div>
    </button>
  );
}

function AgentPreviewAlertSection() {
  return (
    <section
      className="flex min-h-[336px] flex-col gap-[8px] border-t-[0.5px] border-solid border-[var(--line-l12)] py-[20px]"
    >
      <p className={`${FONT} m-0 text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
        {PREVIEW_ALERT_TITLE}
      </p>
      <ul className="alva-md-bullets">
        {PREVIEW_ALERT_BULLETS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className={`${FONT} m-0 text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
        {PREVIEW_ALERT_JUDGMENT}
      </p>
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
  const [alertsPopoverOpen, setAlertsPopoverOpen] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[1080px] w-[1920px] -translate-x-1/2 opacity-30">
        <img src={`${import.meta.env.BASE_URL}agent-bg-pattern.png`} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto min-h-full w-full max-w-[1212px] px-[28px] pb-[56px] pt-[56px]">
          <section className="mx-auto flex w-full max-w-[408px] flex-col items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo-portrait.svg`}
              alt="Alva Agent"
              className="h-[48px] w-[48px] rounded-full"
            />
            <div className="mt-[20px] flex w-full flex-col items-center gap-[8px]">
              <h1 className={`${FONT} m-0 text-center text-[28px] font-normal leading-[38px] tracking-[0.28px] text-[var(--text-n9)]`}>
                Your Alva Agent is ready
              </h1>
              <p className={`${FONT} m-0 text-center text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                Connect a messaging app and let your agent work for you around the clock.
              </p>
            </div>
          </section>

          <section className="mt-[24px] grid min-h-[90px] w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="flex min-h-[66px] flex-col gap-[4px] px-[16px] pt-[12px]"
                style={{ borderLeft: index === 0 ? 'none' : '0.5px solid var(--line-l2)' }}
              >
                <div className="flex h-[22px] items-center gap-[8px]">
                  <CdnIcon name={feature.icon} size={20} color="var(--text-n9)" />
                  <p className={`${FONT} m-0 min-w-0 flex-1 truncate text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                    {feature.title}
                  </p>
                </div>
                <p className={`${FONT} m-0 text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-[24px] flex flex-col items-center justify-center gap-[16px] lg:flex-row lg:items-start">
            <div
              className="flex w-full max-w-[280px] flex-col overflow-hidden"
              style={{ background: 'var(--main-m1-10)', borderRadius: 8 }}
            >
              <button
                className={`${FONT} flex h-[48px] w-full cursor-pointer items-center justify-center gap-[8px] px-[20px] py-[11px] text-[16px] font-medium leading-[26px] tracking-[0.16px] text-white transition-opacity hover:opacity-90`}
                style={{ background: '#24a1de', border: 'none', borderRadius: 6 }}
                onClick={onTelegramConnect}
              >
                <CdnIcon name="project-telegram-l" size={20} color="#fff" />
                Connect Telegram
              </button>
              <div className={`${FONT} flex h-[28px] w-full items-center justify-center gap-[4px] px-[8px] text-[12px] leading-[20px] tracking-[0.12px]`}>
                <span aria-hidden>🎁</span>
                <span style={{ color: 'var(--main-m1)' }}>+3,000</span>
                <span style={{ color: 'rgba(0, 0, 0, 0.9)' }}>bonus credits</span>
              </div>
            </div>

            <button
              className={`${FONT} flex h-[48px] w-full max-w-[280px] cursor-pointer items-center justify-center gap-[8px] px-[20px] py-[11px] text-[16px] font-medium leading-[26px] tracking-[0.16px] transition-colors hover:bg-[var(--b-r03)]`}
              style={{
                background: 'transparent',
                border: '0.5px solid var(--line-l3)',
                borderRadius: 6,
                color: 'var(--text-n9)',
              }}
              onClick={() => setDiscordFlowOpen(true)}
            >
              <img src={`${import.meta.env.BASE_URL}logo-social-discord.svg`} alt="" className="h-[20px] w-[20px]" />
              Connect Discord
            </button>
          </section>

          <section className="mt-[24px] h-[74px] pt-[24px]">
            <p className={`${FONT} m-0 text-[16px] font-normal leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
              Preview Playbook alerts
            </p>
            <p className={`${FONT} mt-[4px] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
              Connect once. Get alerts like these in Telegram or Discord.
            </p>
          </section>

          <section className="mt-[24px] grid w-full grid-cols-1 items-start gap-[16px] lg:grid-cols-[277px_minmax(0,1fr)]">
            <div
              className="flex w-full flex-col overflow-hidden rounded-[8px] bg-white"
              style={{ border: '0.5px solid var(--line-l2)' }}
            >
              {PUSH_PLAYBOOKS.slice(0, 3).map((playbook) => (
                <AgentPreviewCard
                  key={playbook.id}
                  active={activePlaybook === playbook.id}
                  onClick={() => setActivePlaybook(playbook.id)}
                />
              ))}
            </div>

            <div
              className="flex min-h-[736px] min-w-0 flex-col overflow-hidden rounded-[8px] bg-white px-[24px]"
              style={{ border: '0.5px solid var(--line-l2)' }}
            >
              <div className="flex h-[64px] w-full shrink-0 items-center gap-[16px]">
                <p className={`${FONT} m-0 min-w-0 flex-1 truncate text-[16px] font-normal leading-[26px] tracking-[0.16px] text-[var(--text-n9)]`}>
                  {PREVIEW_CARD_TITLE}
                </p>
                <div className="relative flex shrink-0 items-center gap-[12px]">
                  <button
                    className={`${FONT} flex h-[32px] cursor-pointer items-center justify-center gap-[6px] rounded-[4px] bg-transparent px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-[var(--text-n9)] transition-colors hover:bg-[var(--b-r03)]`}
                    style={{ border: '0.5px solid var(--line-l3)' }}
                    onClick={() => onNavigate?.('template-notification')}
                  >
                    View Playbook
                  </button>
                  <div className="relative">
                    <button
                      className={`${FONT} flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-[4px] border-none bg-[var(--main-m1)] px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white transition-opacity hover:opacity-90`}
                      onClick={() => setAlertsPopoverOpen(o => !o)}
                    >
                      <CdnIcon name="project-telegram-l" size={16} color="#fff" />
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
                      onManage={() => onNavigate?.('alva-agent')}
                    />
                  </div>
                </div>
              </div>
              <AgentPreviewAlertSection />
              <AgentPreviewAlertSection />
            </div>
          </section>
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
                    <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
                  </div>
                </div>
              ) : (
                <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                  <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate`}>
                    {threadTitle}
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
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
              <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[120px]">
                <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full pt-[16px]">
                  {messages.map((msg, i) =>
                    msg.role === 'user' ? (
                      <div key={i} className="flex flex-col items-end w-full">
                        <div className="max-w-[560px] px-[16px] py-[12px]" style={{ background: 'var(--main-m1-10)', borderRadius: 8 }}>
                          <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col gap-[16px] items-start w-full">
                        <img src={alvaLogo} alt="Alva" style={{ height: 12, width: 47 }} />
                        <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] w-full`}>
                          {msg.text}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="px-[28px] pb-[24px] shrink-0">
                <ChatInput shadow allowReferences={false} onSend={handleSend} placeholder="Message your Alva Agent..." />
              </div>
            </>
          ) : hasThreadContent ? (
            <>
              <div className="flex-1 min-h-0 overflow-y-auto px-[28px] pb-[120px]">
                <ChatMessages conversationId={activeView} />
              </div>
              <div className="px-[28px] pb-[24px] shrink-0">
                <ChatInput shadow allowReferences={false} />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 flex min-h-0">
                <ChatMessages conversationId="new" />
              </div>
              <div className="px-[28px] pb-[24px] shrink-0">
                <ChatInput shadow allowReferences={false} />
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
