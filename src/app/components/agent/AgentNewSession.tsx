/**
 * [INPUT]: Figma Page/Agent/Chat(8111:9397 / 8160:82896 / 8166:84016) — Build your watchlist 渐进流
 *          Figma Topbar/Alva Agent(30785:4970) — Portfolio(broker) + IM 双连接入口
 *          Figma Page/Agent/Onboard/Screener(10673:50480) — 第三条引导:带 Smart Screener 引用的用户消息 + 示例 prompt 推荐卡回复
 * [OUTPUT]: Agent 页 empty 态 — Header + 5 tab + onboard 引导卡开场（不随连接切换）+ 常显 composer
 *           聊天与 IM 解耦；连接 IM 仅点亮 Tasks/Files + 推 Connected 消息
 *           右上角 Portfolio 入口复用 portfolio/ConnectAccountModal，broker 态与 IM 同为用户级（跨频道不重置）
 * [POS]: pages/AgentDesign.tsx 统一渲染本组件
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AgentMemory } from '@/app/components/agent/AgentMemory';
import { AgentTasksPanel, AGENT_TASKS } from '@/app/components/agent/AgentTasksPanel';
import { AgentArtifactsPanel, AGENT_ARTIFACTS } from '@/app/components/agent/AgentArtifactsPanel';
import { AgentAlertsPanel, AGENT_ALERTS, type AgentAlert } from '@/app/components/agent/AgentAlertsPanel';
import { ConnectAppsModal } from '@/app/components/shared/ConnectAppsModal';
import { ConnectAccountModal, brokerDisplayInfo } from '@/app/components/portfolio/ConnectAccountModal';
import { PortfolioInfoModal, type ConnectedBrokerInfo } from '@/app/components/agent/PortfolioInfoModal';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { PortfolioBuilder } from '@/app/components/agent/PortfolioBuilder';
import { AlphaRadarBuilder, type AlphaRadarSummary } from '@/app/components/agent/AlphaRadarBuilder';
import { setPortfolioWatchEnabled } from '@/lib/portfolio-watch';
import { ChannelSeedThread } from '@/app/components/agent/ChannelSeedThread';
import { EMPTY_PROMPTS, EmptyPromptPill } from '@/app/components/chat/PlaybookSuggestions';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import { SEED_CHANNEL_ID, channelsStore } from '@/app/state/channels';
import { EditChannelModal } from '@/app/components/shared/EditChannelModal';
import { MsgHeaderActions, SelectCheckbox, SelectableMessage } from '@/app/components/share/SelectableMessage';
import { ShareImagePreview } from '@/app/components/share/ShareImagePreview';
import { CHANNEL_SEED_SHARE_MESSAGES } from '@/app/components/share/channel-seed-share-messages';
import {
  buildConversationShareUrl,
  createConversationShareId,
  saveConversationShare,
  type ConversationShareMessage,
} from '@/app/components/share/conversation-share';

const FONT = "'Delight', sans-serif";

/* ========== 内联线性图标(CDN 无对应名的图形)========== */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {children}
    </svg>
  );
}

const P = {
  automation: <path d="M13 3 5 13.5h5L9 21l8-10.5h-5z" />,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10.5 19a1.5 1.5 0 0 0 3 0" /></>,
};

/* Onboard Card/Default — Figma 11486:135467 四条引导:两条 automation builder + ticker read(即时问答) + custom 兜底 */
interface OnboardCard { id: string; emoji: string; title: string; desc: string; prompt: string; taskTitle: string }

const ONBOARD_CARDS: OnboardCard[] = [
  {
    id: 'portfolio-digest',
    emoji: '💼',
    title: 'Watch your portfolio 24/7',
    desc: "I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.",
    prompt: "Watch my portfolio 24/7 — tell me what you hold and I'll flag the moves, risks, and catalysts worth your attention",
    taskTitle: 'Automation: Portfolio Watch',
  },
  {
    id: 'fintwit-digest',
    emoji: '📣',
    title: 'Track X, news & technicals for alpha',
    desc: "I'll scan the X voices you pick, market news, and chart setups, then send you a fresh digest of signals where the evidence lines up.",
    prompt: 'Track X, news & technicals for alpha — scan the voices I pick and send me a digest of signals where the evidence lines up',
    taskTitle: 'Automation: Alpha Radar',
  },
  {
    id: 'ticker-read',
    emoji: '📊',
    title: 'Get a quick read on any ticker',
    desc: "Name a stock or coin — I'll read the tape: current setup, key levels, what breaks it, and near-term catalysts. Short, sourced, no buy/sell calls.",
    prompt: "Give me a quick tape read on a ticker — current setup, key levels, what breaks it, and what's coming up.",
    taskTitle: 'Skill: Ticker Read',
  },
  {
    id: 'custom-automation',
    emoji: '⚙️',
    title: 'Build you own automations',
    desc: "Tell me what you want Alva to monitor and when it should run. I'll help shape it into a reliable automation.",
    prompt: 'Help me build my own automation — I want to describe a rule and have you run it on a schedule',
    taskTitle: 'Automation: Custom',
  },
];

/* Screener 引导已从 onboard 移除(Figma 11486:135467 精简为 4 条);交互链路(startScreener/screenerrec)保留,
   composer 发 screener 类 prompt 仍走 Automation: Smart Screener 任务流 */

/* Alerts tab「Get Started」5 卡 — Figma 10845:71203(For Alert 变体);portfolio/fintwit 两张接现有 flow,其余回 Chat */
const ALERT_GET_STARTED_CARDS: { id: string; emoji: string; title: string; desc: string }[] = [
  {
    id: 'gs-portfolio',
    emoji: '💼',
    title: 'Watch your portfolio 24/7',
    desc: "I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.",
  },
  {
    id: 'gs-fintwit',
    emoji: '📣',
    title: 'Track FinTwit for alpha signals',
    desc: "I'll scan X posts, filter out the noise, and send you a daily digest on alpha signals, conviction shifts, and debates that matter.",
  },
  {
    id: 'gs-tickers',
    emoji: '👀',
    title: 'Follow tickers you care about',
    desc: "Give me tickers you're curious about. I'll scan for meaningful moves, catalysts, and news so you don't have to keep checking.",
  },
  {
    id: 'gs-screen',
    emoji: '🔍',
    title: 'Screen the market on your rules',
    desc: "Set your criteria once — momentum, insider buying, deep value, anything. I'll watch the market and message you only when new names qualify.",
  },
  {
    id: 'gs-automations',
    emoji: '⚙️',
    title: 'Build you own automations',
    desc: "Tell me what you want Alva to monitor and when it should run. I'll help shape it into a reliable automation.",
  },
];

interface ImEntry { id: string; label: string; logo: string; handle: string; user: string; sub: string }

const IMS: ImEntry[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-social-telegram.svg', handle: '@yggyll_tg', user: 'SheerRuan', sub: 'Bot DM — instant pushes' },
  { id: 'discord', label: 'Discord', logo: 'logo-social-discord.svg', handle: 'yggyll#0882', user: 'SheerRuan', sub: 'Bot DM — switch channels with /channel' },
  { id: 'whatsapp', label: "WhatsApp", logo: 'logo-social-whatsapp.svg', handle: '+1 ··· 4821', user: '+1 ··· 4821', sub: 'Business account DM' },
  { id: 'slack', label: 'Slack', logo: 'logo-social-slack.svg', handle: '@yggyll · alva-hq', user: 'SheerRuan', sub: 'Alva app in your workspace' },
];

/* Topbar Portfolio 已连接态叠压的 broker（Figma 30785:4970 顺序：Robinhood > Binance > OKX） */
const TOPBAR_BROKERS = ['robinhood', 'binance', 'okx'];

/* IMS 之外的渠道（如 alerts 卡里的 iMessage）连接时的兜底元数据，供连接消息复用 */
const IM_FALLBACK: Record<string, { label: string; handle: string }> = {
  imessage: { label: 'iMessage', handle: '+1 ··· 4821' },
};

/* Start Watching 建立的 portfolio watch automation → 一条自建 alert(driving Alerts tab 计数 + 面板内容) */
const PORTFOLIO_WATCH_ALERT: AgentAlert = {
  id: 'portfolio-watch-24-7', name: 'portfolio-watch-24-7', creator: 'YGGYLL',
  lastRun: 'now', runEvery: 'Every hour', runs: 0, status: 'active', source: 'created',
};

const ALPHA_RADAR_ALERT: AgentAlert = {
  id: 'fintwit-alpha-radar', name: 'fintwit-alpha-radar', creator: 'YGGYLL',
  lastRun: 'now', runEvery: 'Every day at 8:00 AM ET', runs: 0, status: 'active', source: 'created',
};

/* 「Where should I send you alerts?」快捷渠道(Figma 10038:117496-8):品牌底色 + 白字 logo */
const ALERT_CHANNELS: { id: string; label: string; logo: string; bg: string }[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-im-telegram.svg', bg: '#229ed9' },
  { id: 'discord', label: 'Discord', logo: 'logo-im-discord.svg', bg: '#5865f2' },
  { id: 'imessage', label: 'iMessage', logo: 'logo-im-imessage.svg', bg: '#0cbd2a' },
];

/* Tab — Figma 7911:134921:5 tab,计数为 n3 后缀(count 由会话产出驱动，0 时不显示) */
const TABS: { id: string; label: string; icon: string }[] = [
  { id: 'chat', label: 'Chat', icon: 'chat-l1' },
  { id: 'tasks', label: 'Tasks', icon: 'step-l' },
  { id: 'alerts', label: 'Alerts', icon: 'notification-l' },
  { id: 'memory', label: 'Memory', icon: 'brain-l' },
  { id: 'artifacts', label: 'Files', icon: 'folder-l' },
];

/* 各 tab 空态占位（全新会话 agent 尚未产出任何 task/alert/file） */
const EMPTY_COPY: Record<string, { icon: string; title: string; desc: string }> = {
  tasks: { icon: 'step-l', title: 'No tasks yet', desc: 'Tasks Alva runs for you will show up here.' },
  alerts: { icon: 'notification-l', title: 'No alerts yet', desc: 'Alerts from your automations will land here.' },
  artifacts: { icon: 'folder-l', title: 'No files yet', desc: 'Playbooks and reports Alva builds will be saved here.' },
};

function EmptyPanel({ tabId }: { tabId: string }) {
  const c = EMPTY_COPY[tabId];
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[6px]">
      <CdnIcon name={c.icon} size={28} color="var(--text-n2, rgba(0,0,0,0.2))" />
      <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{c.title}</p>
      <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{c.desc}</p>
    </div>
  );
}

/* ========== 原子组件 ========== */

/* 任务状态 tag（Figma Agent/Tag/Task 变体 Running m1 / Done m3）：h22 px6 py1 radius4 12px，无点 */
function TaskTag({ state }: { state: 'running' | 'done' }) {
  const running = state === 'running';
  return (
    <span
      className="shrink-0 rounded-[4px] px-[6px] py-[1px] text-[12px] leading-[20px] tracking-[0.12px]"
      style={{
        fontFamily: FONT,
        color: running ? 'var(--main-m1, #49A3A6)' : 'var(--main-m3, #2a9b7d)',
        background: running ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'var(--main-m3-10, rgba(42,155,125,0.1))',
      }}
    >
      {running ? 'Running' : 'Done'}
    </span>
  );
}

/* 「Where should I send you alerts?」渠道卡（Figma AgentCardChat 9600:211514）—— watchreply 与 imrec 复用 */
function AlertChannelsCard({ onConnect }: { onConnect: (id: string) => void }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div
      className="flex w-full flex-col gap-[8px] rounded-[8px] py-[12px] pl-[16px] pr-[12px]"
      style={{ background: 'var(--content-br03, rgba(0,0,0,0.03))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        Where should I send you alerts?
      </p>
      <div className="flex flex-wrap gap-[8px]">
        {ALERT_CHANNELS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onConnect(ch.id)}
            className="flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border-none px-[20px] py-[9px] transition-opacity hover:opacity-90"
            style={{ background: ch.bg }}
          >
            <img src={`${base}${ch.logo}`} alt="" className="size-[18px] shrink-0" />
            <span className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-[0.14px] text-white" style={{ fontFamily: FONT }}>{ch.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Onboard Card/Screener(Figma 10431:105520)— 3 条示例 screener prompt,行尾 enter-l(n5),点击即作为消息发出 */
const SCREENER_PROMPTS = [
  'Screen rate-sensitive small caps with 4 quarters of margin expansion and price strength into the FOMC meeting',
  'Screen AI semiconductor stocks with revenue growth > 25% YoY and positive EPS revisions into Computex',
  'Screen AI infrastructure stocks with FCF growth > 30% YoY and net cash on balance sheet',
];

function ScreenerPromptsCard({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[8px]" style={{ background: '#fff', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
      {SCREENER_PROMPTS.map((text, i, arr) => (
        <button
          key={text}
          type="button"
          className="flex w-full cursor-pointer items-center gap-[8px] bg-transparent px-[16px] py-[12px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
          style={{ border: 'none', borderBottom: i < arr.length - 1 ? '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' : 'none' }}
          onClick={() => onPick(text)}
        >
          <p className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
          <CdnIcon name="enter-l" size={16} color="var(--text-n5, rgba(0,0,0,0.5))" />
        </button>
      ))}
    </div>
  );
}

/* Ticker Read skill — mock 读数(照 Telegram /ticker_read 输出结构:判断句 + TAPE + BREAKS IF + SOURCES);
   选项卡 17 个标的(Figma 11486:139136)全覆盖,BTC/ETH 不在 chips 但 composer 输入可读 */
const TICKER_READS: Record<string, { summary: string; tape: string; breaksIf?: string; sources: string }> = {
  AAPL: {
    summary: 'AAPL is basing quietly at $233 after the June run — holding the breakout shelf at $228–230 while the tape digests.',
    tape: '$233.15 · Jul 16 +0.4% · 20-day realized swing ~1.9%, tightest in the megacap set',
    breaksIf: 'a close under $228 puts the June breakout in doubt; over $238 resumes the trend.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  GOOGL: {
    summary: 'Trend intact but extended — $192 is pressing the upper end of the 3-month channel.',
    tape: '$192.34 · Jul 16 +0.9% · 8 of the last 10 sessions closed green',
    breaksIf: 'a rejection here and a close under $185 flips it back to mid-range chop; $178 is the channel floor.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  AMZN: {
    summary: 'AMZN is coiling under $230 — third tag of that ceiling in a month while higher lows keep stacking from $218.',
    tape: '$228.42 · Jul 16 -0.2% · range compressing: 20-day swing down to ~2.3% from 4%',
    breaksIf: 'a close over $230 resolves the coil higher; losing $218 negates the pattern.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  MSFT: {
    summary: "Steady grind at $512, sitting just above the 20-day; pullbacks keep getting bought before they reach $500.",
    tape: "$512.64 · Jul 16 +0.1% · hasn't closed below the 20-day in 6 weeks",
    breaksIf: 'a daily close under $500 — round number plus the 50-day sits right there.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  META: {
    summary: 'META is consolidating the earnings gap at $715; the $690 gap-fill level is the line dip buyers keep defending.',
    tape: '$714.85 · Jul 16 -0.7%, after hours flat · 20-day swing ~3.4%',
    breaksIf: "a close under $690 opens the gap toward $655; over $735 it's back at highs.",
    sources: 'US equities daily / after-hours 15-min bars — as of Jul 16, 8:00 PM ET',
  },
  NFLX: {
    summary: 'First real dip since the spring run — $1,287, down from $1,340, testing the 50-day for the first time in 4 months.',
    tape: '$1,287.32 · Jul 16 -1.6% · 3 straight red sessions, volume above average on each',
    breaksIf: 'it loses the 50-day at $1,270 with follow-through — next shelf is $1,180.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  AMD: {
    summary: 'AMD woke up — $162 after clearing the $155 base it sat in for two months, and the move came on real volume.',
    tape: '$161.94 · Jul 16 +2.8% · breakout volume 1.7x the 20-day average',
    breaksIf: 'a close back under $155 makes it a failed breakout; $148 is the base floor.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  HOOD: {
    summary: 'HOOD is the strongest chart on this list — $98, up 5 weeks straight, but now stretched ~18% above the 20-day.',
    tape: '$97.64 · Jul 16 +3.1% · RSI-14 at 78, hottest since February',
    breaksIf: 'nothing structural until $84; this is extension risk, not trend risk.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  COIN: {
    summary: 'COIN trades with BTC and BTC is heavy — $355, back to the middle of its 3-month range while crypto volumes thin out.',
    tape: '$354.72 · Jul 16 -2.1% · correlation to BTC running ~0.8 over the last month',
    breaksIf: 'BTC losing $62,700 likely drags COIN to the $330 range floor; reclaiming $380 needs a crypto bounce.',
    sources: 'US equities daily bars, Binance BTC/USDT — as of Jul 16 close',
  },
  UBER: {
    summary: 'Quiet strength — $94, new highs on no news, which is usually the good kind.',
    tape: '$94.21 · Jul 16 +0.8% · 4th all-time-high close in 2 weeks, swing still a tame ~2.6%',
    breaksIf: 'a close under $88 — the breakout shelf and where the last two dips reversed.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  NVDA: {
    summary: 'A pullback of normal depth — after hours at $206; $203–205 is the only support band worth watching right now.',
    tape: '$206 · Jul 16 regular session -2.4%, after hours -3.1% vs prior close · near its 20-day normal swing ~3.1%',
    sources: 'US equities daily / after-hours 15-min bars — as of Jul 16, 8:00 PM ET',
  },
  AVGO: {
    summary: 'Pulling back with semis — $298, off 6% from the high but still above the June breakout at $285.',
    tape: '$298.15 · Jul 16 -1.9% · semis (SOX) -2.3% the same day, so this is sector, not stock',
    breaksIf: "a close under $285 turns the breakout into resistance; $305 back on top says the dip's done.",
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  ORCL: {
    summary: 'ORCL is still digesting the post-earnings spike — $245, drifting sideways in the upper half of the gap-day range.',
    tape: '$244.84 · Jul 16 -0.5% · 11 sessions inside $238–252, volume fading each week',
    breaksIf: 'a close under $238 starts filling the gap toward $224; over $252 resumes.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  IBM: {
    summary: 'Grinding higher on its own schedule — $292, riding the 20-day with the steadiest tape in large-cap tech.',
    tape: "$291.75 · Jul 16 +0.3% · 20-day realized swing ~1.7%, half the QQQ's",
    breaksIf: 'a close under $283 — first lower low since April, and the 50-day sits there.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  SPY: {
    summary: 'SPY is drifting sideways just under the highs at $628; buyers keep stepping in at $620–622 and the trend is intact.',
    tape: '$627.58 · Jul 16 -0.3% · 12 of the last 15 sessions closed inside a ±0.6% band',
    breaksIf: 'a daily close under $620 — the shelf from the June breakout and the 20-day floor.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  QQQ: {
    summary: 'QQQ is stalling just under the high at $565 — three tests of $568 in two weeks, each on lighter volume.',
    tape: '$564.92 · Jul 16 -0.6% · breadth soft: 4 of 10 sessions had more decliners than advancers inside the index',
    breaksIf: 'a close over $568 on volume unlocks the trend; under $552 the pullback has legs toward $540.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  TSLA: {
    summary: 'TSLA is chopping mid-range at $318; neither the $295 floor nor the $340 ceiling is in play yet.',
    tape: '$318.42 · Jul 16 +1.1%, after hours -0.4% · 20-day realized swing ~4.2%',
    breaksIf: 'a close over $340 opens the March gap toward $360; losing $295 breaks the range.',
    sources: 'US equities daily / after-hours 15-min bars — as of Jul 16, 8:00 PM ET',
  },
  BTC: {
    summary: 'BTC is stress-testing $62,700–63,000; the whole move off the $65,600 high has been given back and no bounce has formed yet.',
    tape: '$62,876.89 · 24h -2.9% · 24h low $62,710',
    breaksIf: 'it reclaims $64,000; if the lower edge gives way, the last confirmed low is $61,825.',
    sources: 'Binance BTC/USDT 15-min / daily — as of 06:45 UTC',
  },
  ETH: {
    summary: 'ETH is holding up better than BTC — $3,341 and still above the reclaimed $3,280 shelf, but it goes where BTC goes if $62,700 fails.',
    tape: '$3,341.26 · 24h -1.8% · 24h low $3,306',
    breaksIf: "a clean loss of $3,280 — below that there's little traded volume until $3,150.",
    sources: 'Binance ETH/USDT 15-min / daily — as of 06:45 UTC',
  },
  SOL: {
    summary: 'SOL is riding the L1 rotation — $168, holding the breakout from $150 even while BTC chops.',
    tape: '$168.35 · 24h +1.2% · 24h low $164.82',
    breaksIf: 'a close back under $150 unwinds the breakout; $178 is the March supply shelf.',
    sources: 'Binance SOL/USDT 15-min / daily — as of 06:45 UTC',
  },
  MU: {
    summary: 'Memory-cycle momentum intact — $142, consolidating above the earnings gap at $135.',
    tape: '$141.87 · Jul 16 -0.8% · has held 100% of the post-earnings gap',
    breaksIf: 'a close under $135 fills the gap and stalls the cycle trade; $150 is the next supply.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  TSM: {
    summary: 'TSM is quietly making new highs — $248, pulled up by the AI capex chain with no distribution day in 3 weeks.',
    tape: '$247.92 · Jul 16 +0.6% · 20-day realized swing ~2.4%',
    breaksIf: 'a close under $232 — the last breakout shelf and the 50-day.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  PLTR: {
    summary: 'Crowded and extended — $155, still trending but ~25% above the 50-day with sentiment running hot.',
    tape: '$154.66 · Jul 16 +1.9% · 20-day realized swing ~5.1%, highest on this list',
    breaksIf: "nothing structural until $132; below that it's an air pocket to $118.",
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  INTC: {
    summary: 'INTC is a show-me story — $34, basing for two months between $31 and $36 while the turnaround narrative rebuilds.',
    tape: '$33.85 · Jul 16 -0.3% · volume drying up inside the base',
    breaksIf: 'a close over $36 starts the repair trade; under $31 the base fails.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
  GLD: {
    summary: 'GLD is grinding at highs — $312, the real-rate tailwind intact and every dip to the 20-day getting bought.',
    tape: '$311.94 · Jul 16 +0.4% · 6 of the last 7 weekly closes were higher',
    breaksIf: 'a weekly close under $298 — the breakout retest level.',
    sources: 'US equities daily bars — as of Jul 16 close',
  },
};

/* 从输入中提取命中 mock 库的 symbol(支持 "$NVDA"、混合文本如 "NVDA BTC focus on levels"):命中 ≥1 即走 ticker read */
function parseTickers(text: string): string[] | null {
  const tokens = text.trim().split(/[\s,，、/]+/).filter(Boolean).map((t) => t.replace(/^\$/, '').toUpperCase());
  const hits = [...new Set(tokens.filter((t) => t in TICKER_READS))];
  return hits.length ? hits : null;
}

/* 选项卡展示的 17 个热门标的(Figma 11486:139136 顺序) */
const TICKER_CHIPS = ['AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT', 'META', 'NFLX', 'AMD', 'HOOD', 'COIN', 'UBER', 'NVDA', 'AVGO', 'ORCL', 'IBM', 'SPY', 'QQQ'];

/* Ticker Read 热门标的选项卡(Figma 11486:139136):白底 p16 卡,pill chip = br03 底 + 16px TickerLogo + 14 n7。
   单选交互:点 chip 即把 symbol 作为消息发出;composer 直接输入任意 symbol 同路 */
function TickerPickCard({ onPick }: { onPick: (symbol: string) => void }) {
  return (
    <div
      className="flex w-full flex-col gap-[12px] rounded-[8px] p-[16px]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        Which ticker do you want to read?
      </p>
      <div className="flex flex-wrap gap-[12px]">
        {TICKER_CHIPS.map((symbol) => (
          <button
            key={symbol}
            type="button"
            onClick={() => onPick(symbol)}
            className="flex shrink-0 cursor-pointer items-center gap-[4px] rounded-full border-none px-[12px] py-[6px] transition-colors hover:bg-[rgba(0,0,0,0.06)]"
            style={{ background: 'var(--content-br03, rgba(0,0,0,0.03))' }}
          >
            <TickerLogo ticker={symbol} size={16} />
            <span className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{symbol}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* push 归因:这条推送出自哪个 automation */
function SourceTag({ automation }: { automation: string }) {
  return (
    <span
      className="inline-flex h-[24px] items-center gap-[6px] rounded-[6px] px-[8px]"
      style={{ border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))', background: 'var(--b-r02, rgba(0,0,0,0.02))' }}
    >
      <span style={{ color: 'var(--main-m5, #E6A91A)' }}><Ic size={12}>{P.automation}</Ic></span>
      <span className="text-[11px] leading-[16px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>
        {automation}
        <span style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}> · standalone automation</span>
      </span>
    </span>
  );
}

/* ========== 消息壳(Figma Alva Answer:32px 头像 + Name 行)========== */

function AlvaPortrait({ size = 32 }: { size?: number }) {
  const base = import.meta.env.BASE_URL;
  return (
    <img
      src={`${base}logo-portrait.svg`}
      alt="Alva"
      className="shrink-0 rounded-[4px]"
      style={{ width: size, height: size }}
    />
  );
}

/* 频道头像：与 Alva 同款深色圆角方块，内嵌白色 channel 图标 */
function ChannelPortrait({ size = 32 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[4px]"
      style={{ width: size, height: size, background: 'var(--b0-sidebar, #2a2a38)' }}
    >
      <CdnIcon name="sidebar-channel-normal" size={Math.round(size * 0.6)} color="#ffffff" />
    </span>
  );
}

function AgentMsg({ pushed, time = 'Thursday 7:22 PM', portrait, name = 'Alva', headerActions, children }: { pushed?: boolean; time?: string; portrait?: React.ReactNode; name?: string; headerActions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start gap-[8px]">
      {portrait ?? <AlvaPortrait size={22} />}
      {/* name 行与内容整体 gap 8;内容 div 内部(Markdown / widget 块之间)gap 12 */}
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{name}</p>
          {pushed && (
            <span
              className="rounded-[4px] px-[5px] text-[10px] leading-[16px] tracking-[0.3px]"
              style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
            >
              pushed
            </span>
          )}
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{time}</p>
          {/* header 行内 copy+share（Figma 9246:36248:pl4 gap8,hover 出现）*/}
          {headerActions}
        </div>
        <div className="flex min-w-0 w-full flex-col gap-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* 用户气泡引用 chip(Figma Quote/Chat-bar 26531:19027):20px 图 + 12px 文 + close-l1 */
interface MsgQuote { label: string; img: string }

/* 用户气泡（Figma Chat/Block-User Bubble 26531:19024）:px16 py12,可选 Quote 引用 chip(20px 图 + 12px 文 + close-l1) */
function UserMsg({ text, quote }: { text: string; quote?: MsgQuote }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="flex w-full flex-col items-end">
      <div className="flex max-w-[560px] flex-col rounded-[8px] px-[16px] py-[12px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
        {quote && (
          <div className="flex w-full flex-wrap items-start gap-[8px] pb-[8px]">
            <span className="flex shrink-0 items-center gap-[6px] rounded-[4px] p-[6px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
              <img src={`${base}${quote.img}`} alt="" className="size-[20px] shrink-0 object-cover" />
              <span className="max-w-[184px] truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{quote.label}</span>
              <CdnIcon name="close-l1" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
            </span>
          </div>
        )}
        <p className="w-full text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex h-[22px] items-center gap-[4px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-[5px] animate-bounce rounded-full" style={{ background: 'var(--text-n3, rgba(0,0,0,0.3))', animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
}

/* ━━ 消息逐条发出的进场动效 ━━ */
const MSG_IN_CSS = `@keyframes agent-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`;

function MsgIn({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <div style={{ animation: 'agent-msg-in 0.35s ease-out both', animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* 分流程(Portfolio Digest / Alpha Radar)左上角返回 — Figma 8563:238319 内 Back(11558:49156):arrow-left-l2 12 + Back(Regular 12/20 tracking0.12),全 n5;
   gap4、pb16(spacing-m)接下方 Alva header;点击回 onboard 空态(等同浏览器后退) */
function FlowBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center gap-[4px] self-start border-none bg-transparent px-0 pb-[16px] pt-0 transition-opacity hover:opacity-70"
    >
      <CdnIcon name="arrow-left-l2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Back</span>
    </button>
  );
}

/* ========== 互动消息流(respond 模拟)========== */

type ExtraMsg =
  | { id: number; role: 'user'; text: string; quote?: MsgQuote }
  | { id: number; role: 'typing' }
  | { id: number; role: 'task'; title: string; kind: 'playbook' | 'automation'; state: 'running' | 'done' }
  | { id: number; role: 'imrec' }
  /* Onboard 第三条(screener)的推荐回复:两行文案 + 示例 prompt 卡(Figma 10673:50492) */
  | { id: number; role: 'screenerrec' }
  /* Ticker Read skill:介绍 + 热门标的选项卡 / 按标的 mock 读数回复 */
  | { id: number; role: 'tickerask' }
  | { id: number; role: 'tickerread'; symbols: string[] }
  | { id: number; role: 'subpush'; title: string; push?: string; automation: string }
  | { id: number; role: 'answer'; text: string }
  /* Start Watching 的 Alva 确认回复:正文 + (未连接时)内嵌「选择推送渠道」卡片(Figma 8341:126245) */
  | { id: number; role: 'watchreply'; text: string };

const TICKER_ASK_TEXT = 'This skill gives any stock or coin a quick tape read: current state, key levels, what invalidates the setup, and near-term catalysts — short, sourced, no buy or sell advice. Pick a ticker below, or type any symbol.';
const SCREENER_REC_TEXT = "Screen the market on your rules\nSet your criteria once — momentum, insider buying, deep value, anything. I'll watch the market and message you only when new names qualify.";
const IM_REC_TEXT = "One more thing — this agent only lives on the Web right now. Connect Telegram or Discord and every push lands in your DM the moment it fires.";

function shareDateForToday(): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
}

function extraToShareMessage(message: ExtraMsg): ConversationShareMessage | null {
  const common = { id: `extra-${message.id}`, time: 'now', date: shareDateForToday() };

  if (message.role === 'user') return { ...common, role: 'user', text: message.text };
  if (message.role === 'answer' || message.role === 'watchreply') {
    return { ...common, role: 'agent', text: message.text };
  }
  if (message.role === 'tickerask') return { ...common, role: 'agent', text: TICKER_ASK_TEXT };
  if (message.role === 'screenerrec') return { ...common, role: 'agent', text: SCREENER_REC_TEXT };
  if (message.role === 'imrec') return { ...common, role: 'agent', text: IM_REC_TEXT };
  if (message.role === 'tickerread') {
    const text = message.symbols.map((symbol) => {
      const read = TICKER_READS[symbol];
      if (!read) return null;
      return [
        `$${symbol}`,
        read.summary,
        `TAPE: ${read.tape}`,
        ...(read.breaksIf ? [`BREAKS IF: ${read.breaksIf}`] : []),
        `SOURCES: ${read.sources}`,
      ].join('\n');
    }).filter(Boolean).join('\n\n');
    return text ? { ...common, role: 'agent', text } : null;
  }
  if (message.role === 'subpush') {
    const status = message.push
      ? `${message.title} is live in your workspace. Here's the latest run — new ones will land right here.`
      : `${message.title} is live in your workspace. The first run lands with the next cycle — pushes will land right here.`;
    return {
      ...common,
      role: 'notification',
      text: [status, message.push, `Source: ${message.automation}`].filter(Boolean).join('\n\n'),
    };
  }
  return null;
}

async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy failed');
}

/* Onboard 两个独立 flow 的 URL 后缀：#agent?flow=portfolio / #agent?flow=fintwit，
   支持刷新 / 深链直达；沿用本仓 #agent?tab= 的 query 后缀约定（App 路由只认 ? 之前的 agent） */
type AgentFlow = 'portfolio' | 'fintwit';
function getAgentFlow(): AgentFlow | null {
  const query = window.location.hash.slice(1).split('?')[1];
  if (!query) return null;
  const flow = new URLSearchParams(query).get('flow');
  return flow === 'portfolio' || flow === 'fintwit' ? flow : null;
}

/* ========== 主组件 ========== */

export function AgentNewSession({ onNavigate, channel }: { onNavigate: (page: Page) => void; channel?: { id: string; name: string; description?: string } | null }) {
  const base = import.meta.env.BASE_URL;
  const [tab, setTab] = useState('chat');
  const [extra, setExtra] = useState<ExtraMsg[]>([]);
  const [imLinks, setImLinks] = useState<Record<string, boolean>>({});
  /* 谁接收 IM 推送 — 单 active channel,绑定/解绑随动(spec: 解绑 active 回退最早绑定) */
  const [imActive, setImActive] = useState<string | null>(null);
  const [imModalOpen, setImModalOpen] = useState(false);
  /* Broker 绑定 — 用户级全局(与 IM 同理,跨频道不重置);未连接走 Connect Portfolio → 复用 Portfolio 绑定流程 */
  const [connectedBroker, setConnectedBroker] = useState<ConnectedBrokerInfo | null>(null);
  const [brokerModalOpen, setBrokerModalOpen] = useState(false);
  /* topbar Portfolio 已连接按钮 / 绑定成功徽章后 → 账户数据弹窗（Modal/Portfolio Info 31584:10618，与 Connect IM 同为居中弹窗）；View in Portfolio 才跳页 */
  const [portfolioInfoOpen, setPortfolioInfoOpen] = useState(false);
  /* 频道态右上角 settings → Edit Channel 弹窗(Figma 9732:448009);仅默认 Alva 跳设置页 */
  const [editChannelOpen, setEditChannelOpen] = useState(false);
  const [shareMode, setShareMode] = useState(false);
  const [selectedShareIds, setSelectedShareIds] = useState<Set<string>>(() => new Set());
  const [shareImageOpen, setShareImageOpen] = useState(false);
  const [shareNotice, setShareNotice] = useState<{ type: 'success' | 'warning' | 'error'; title: string } | null>(null);
  const shareNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* 会话是否已开始（Start Watching / 发过 prompt）：true 则收起 onboard 空态，进入真实对话 */
  const [started, setStarted] = useState(false);
  /* 会话产出的 alert（Start Watching 建一条 portfolio watch）→ 驱动 Alerts tab 计数 + 面板 */
  const [sessionAlerts, setSessionAlerts] = useState<AgentAlert[]>([]);
  /* Onboard「Watch your portfolio 24/7」→ 进入 portfolio builder 视图（无 composer）；初值由 URL 后缀决定，支持深链直达 */
  const [portfolioOpen, setPortfolioOpen] = useState(() => getAgentFlow() === 'portfolio');
  /* Onboard「Track FinTwit for alpha signals」→ 进入 Alpha Radar builder 视图（无 composer）；初值由 URL 后缀决定 */
  const [alphaRadarOpen, setAlphaRadarOpen] = useState(() => getAgentFlow() === 'fintwit');
  /* flow 开关以 URL hash 后缀为准：open/close 同步改 hash + 本地 state（避免异步 hashchange 造成闪烁），
     浏览器返回 / 前进即回到 onboard；hashchange 监听覆盖深链刷新与前进后退 */
  const openFlow = useCallback((flow: AgentFlow) => {
    window.location.hash = `agent?flow=${flow}`;
    setPortfolioOpen(flow === 'portfolio');
    setAlphaRadarOpen(flow === 'fintwit');
  }, []);
  const closeFlow = useCallback(() => {
    if (getAgentFlow()) window.location.hash = 'agent';
    setPortfolioOpen(false);
    setAlphaRadarOpen(false);
  }, []);
  useEffect(() => {
    const sync = () => {
      const flow = getAgentFlow();
      setPortfolioOpen(flow === 'portfolio');
      setAlphaRadarOpen(flow === 'fintwit');
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const idRef = useRef(0);
  const didMountRef = useRef(false);
  const imRecShownRef = useRef(false);
  const imLinksRef = useRef(imLinks);
  imLinksRef.current = imLinks;
  const stageRef = useRef<HTMLDivElement>(null);
  /* 会话代际:重置(点 Chat tab / 切频道)时 +1,悬挂中的 setTimeout 回复按代际作废,不会在新会话里凭空冒出 */
  const sessionEpochRef = useRef(0);

  const activeIm = imActive ? IMS.find((i) => i.id === imActive) ?? null : null;
  /* 是否连过 IM（驱动 imrec 软推荐是否出现 + Tasks/Files 是否点亮）；不再影响开场 onboard 视图 */
  const connected = Object.values(imLinks).some(Boolean);
  /* 预置演示频道（alva-to-the-moon）：聊天区显示预置对话（Figma 10998:50677），tabs 直接用连接后的产出 */
  const seeded = channel?.id === SEED_CHANNEL_ID;
  const shareableMessages = [
    ...(seeded ? CHANNEL_SEED_SHARE_MESSAGES : []),
    ...extra.map(extraToShareMessage).filter((message): message is ConversationShareMessage => message !== null),
  ];
  const selectedShareMessages = shareableMessages.filter((message) => selectedShareIds.has(message.id));

  /* Toast — 组件库规范(@repo/ui-base toast):顶部居中,默认时长 3000ms;type 决定左侧图标 */
  const showShareNotice = useCallback((title: string, type: 'success' | 'warning' | 'error' = 'success') => {
    if (shareNoticeTimerRef.current) clearTimeout(shareNoticeTimerRef.current);
    setShareNotice({ type, title });
    shareNoticeTimerRef.current = setTimeout(() => setShareNotice(null), 3000);
  }, []);

  const exitShareMode = useCallback(() => {
    setShareMode(false);
    setSelectedShareIds(new Set());
    setShareImageOpen(false);
  }, []);

  const copyMessage = useCallback(async (message: ConversationShareMessage) => {
    try {
      await copyTextToClipboard(message.text);
      showShareNotice('Copied');
    } catch {
      showShareNotice('Could not copy this message.', 'error');
    }
  }, [showShareNotice]);

  const shareSingleMessage = useCallback((id: string) => {
    setTab('chat');
    setSelectedShareIds(new Set([id]));
    setShareImageOpen(false);
    setShareMode(true);
  }, []);

  const toggleShareMessage = useCallback((id: string) => {
    if (!selectedShareIds.has(id) && selectedShareIds.size >= 10) {
      showShareNotice('You can select up to 10 messages.', 'warning');
      return;
    }
    setSelectedShareIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [selectedShareIds, showShareNotice]);

  const copySelectedShare = useCallback(async () => {
    if (selectedShareMessages.length === 0) return;
    const id = createConversationShareId();
    try {
      saveConversationShare({
        version: 1,
        id,
        createdAt: new Date().toISOString(),
        messages: selectedShareMessages,
        revoked: false,
      });
      await copyTextToClipboard(buildConversationShareUrl(id));
      exitShareMode();
      showShareNotice('Link copied');
    } catch {
      showShareNotice('Could not copy the link. Your selection is still active.', 'error');
    }
  }, [exitShareMode, selectedShareMessages, showShareNotice]);

  useEffect(() => () => {
    if (shareNoticeTimerRef.current) clearTimeout(shareNoticeTimerRef.current);
  }, []);

  /* 会话重置回初始 onboard 空态：清空消息与会话产出（连接状态 imLinks/imActive 刻意不重置——用户级全局） */
  const resetSession = useCallback(() => {
    sessionEpochRef.current += 1;
    setExtra([]);
    setSessionAlerts([]);
    setStarted(false);
    setShareMode(false);
    setSelectedShareIds(new Set());
    setShareImageOpen(false);
    imRecShownRef.current = false;
  }, []);

  /* 切换频道（含默认 Alva Agent）时，视图与会话产出回到该频道的空态 onboard；
     连接状态(imLinks/imActive)刻意不重置——右上角连接态在所有频道间与 Alva Agent 同步 */
  useEffect(() => {
    // 首次挂载不重置：尊重 URL 里的 flow 深链（#agent?flow=...）；真正切换频道才回到该频道空态
    if (!didMountRef.current) { didMountRef.current = true; return; }
    setTab('chat');
    exitShareMode();
    closeFlow();
    resetSession();
  }, [channel?.id, closeFlow, exitShareMode, resetSession]);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      stageRef.current?.scrollTo({ top: stageRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  /* 任务流:user → typing → task running → done;完成后若未连 IM,一次性软推荐 */
  const respond = useCallback((userText: string, kind: 'playbook' | 'automation', title: string) => {
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const userId = ++idRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: userId, role: 'user', text: userText }, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      const taskId = ++idRef.current;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: taskId, role: 'task', title, kind, state: 'running' }));
      scrollToEnd();
      setTimeout(() => {
        if (sessionEpochRef.current !== epoch) return;
        setExtra((prev) => prev.map((m) => (m.id === taskId && m.role === 'task' ? { ...m, state: 'done' } : m)));
        if (!Object.values(imLinksRef.current).some(Boolean) && !imRecShownRef.current) {
          imRecShownRef.current = true;
          setTimeout(() => {
            if (sessionEpochRef.current !== epoch) return;
            setExtra((prev) => [...prev, { id: ++idRef.current, role: 'imrec' }]);
            scrollToEnd();
          }, 1400);
        }
      }, 4500);
    }, 1000);
  }, [scrollToEnd]);

  /* 纯 ticker 输入(点选项卡 chip / composer 直接打 symbol)→ Ticker Read mock 读数;user 气泡 → typing → 按标的回复 */
  const respondTicker = useCallback((userText: string, symbols: string[]) => {
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const userId = ++idRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: userId, role: 'user', text: userText }, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: ++idRef.current, role: 'tickerread', symbols }));
      scrollToEnd();
    }, 1000);
  }, [scrollToEnd]);

  const onPrompt = useCallback((text: string) => {
    setStarted(true);
    const tickers = parseTickers(text);
    if (tickers) { respondTicker(text, tickers); return; }
    const kind: 'playbook' | 'automation' = /screen|alert|monitor|watch|what if/i.test(text) ? 'automation' : 'playbook';
    respond(text, kind, kind === 'automation' ? 'Automation: Smart Screener' : `Build: ${text.slice(0, 42)}…`);
  }, [respond, respondTicker]);

  /* Onboard「Get a quick read on any ticker」→ 发出带 Ticker Read 引用的消息,回复 skill 介绍 + 热门标的选项卡 */
  const startTickerRead = useCallback((userText: string) => {
    setStarted(true);
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const userId = ++idRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, {
      id: userId, role: 'user', text: userText, quote: { img: 'avatar-ticker-read.png', label: 'Ticker Read' },
    }, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: ++idRef.current, role: 'tickerask' }));
      scrollToEnd();
    }, 1000);
  }, [scrollToEnd]);

  /* Onboard「Screen the market on your rules」→ 发出带 Smart Screener 引用的用户消息,回复示例 prompt 推荐卡(Figma 10673:50480) */
  const startScreener = useCallback((userText: string) => {
    setStarted(true);
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const userId = ++idRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, {
      id: userId, role: 'user', text: userText, quote: { img: 'avatar-smart-screener.png', label: 'Smart Screener' },
    }, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: ++idRef.current, role: 'screenerrec' }));
      scrollToEnd();
    }, 1000);
  }, [scrollToEnd]);

  /* 订阅:即时生效,Alva 立刻推首条 run(价值先行,不要求连接)*/
  const pushSubscribe = useCallback((title: string, push: string | undefined, automation: string) => {
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      const pushId = ++idRef.current;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: pushId, role: 'subpush', title, push, automation }));
      scrollToEnd();
    }, 700);
  }, [scrollToEnd]);


  /* Start Watching → 收起 builder + onboard 空态 → 一条 Alva 确认回复(内嵌「选择推送渠道」卡片,未连接才显示),无用户气泡 */
  const onStartWatching = useCallback((_picks: { symbol: string; qty: string }[]) => {
    setPortfolioWatchEnabled(true);
    closeFlow();
    setStarted(true);
    /* mock 成 populated 列表:整套 AGENT_ALERTS + 末尾追加本次新建的 portfolio watch */
    setSessionAlerts((prev) => (prev.length ? prev : [...AGENT_ALERTS, PORTFOLIO_WATCH_ALERT]));
    setTab('chat');
    const epoch = sessionEpochRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      if (sessionEpochRef.current !== epoch) return;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({
        id: ++idRef.current,
        role: 'watchreply',
        text: "All set. I'm on watch now. I'll check for breaking news, macro/rate shifts, analyst changes, unusual price or volume moves, and important technical setups across your holdings. I'll only message when something looks worth your attention — share your thesis, key risks, or levels you care about and I'll watch the portfolio through that lens.",
      }));
      scrollToEnd();
    }, 900);
  }, [scrollToEnd, closeFlow]);

  const onAlphaRadarLive = useCallback((summary: AlphaRadarSummary) => {
    setStarted(true);
    setSessionAlerts((prev) => {
      if (prev.some((alert) => alert.id === ALPHA_RADAR_ALERT.id)) return prev;
      return [...prev, { ...ALPHA_RADAR_ALERT, runEvery: `Every day at ${summary.digestTime}` }];
    });
  }, []);

  const connectIm = useCallback((imId: string) => {
    setImLinks((prev) => ({ ...prev, [imId]: true }));
    setImActive((prev) => prev ?? imId);
    // iMessage 只出现在 alerts 快捷渠道、不在 IMS 列表 → 兜底一条元数据保证连接消息一致
    const im = IMS.find((i) => i.id === imId) ?? IM_FALLBACK[imId];
    if (!im) return;
    setExtra((prev) => [...prev, {
      id: ++idRef.current,
      role: 'answer',
      text: `Connected to ${im.label} — pushes from this agent now mirror to ${im.handle}. Reply there or here, it's the same conversation.`,
    }]);
    scrollToEnd();
  }, [scrollToEnd]);

  const disconnectIm = useCallback((imId: string) => {
    const next = { ...imLinksRef.current, [imId]: false };
    setImLinks(next);
    setImActive((prev) => (prev === imId ? IMS.find((i) => next[i.id])?.id ?? null : prev));
  }, []);

  /* 全新 onboarding 会话：agent 还没产出任何 task/alert/file → 计数为 0(不显示数字)、面板显示空态。
     连接任一 social 后，Tasks / Files 变非空（mock 产出）；Alerts 仍只由 sessionAlerts 驱动。
     预置演示频道恒为已产出态：直接复用连接后的 Tasks/Alerts/Files 内容。 */
  const populated = seeded;
  const tabCounts: Record<string, number> = {
    tasks: seeded || connected ? AGENT_TASKS.length : 0,
    alerts: sessionAlerts.length || (populated ? AGENT_ALERTS.length : 0),
    artifacts: seeded || connected ? AGENT_ARTIFACTS.length : 0,
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      {/* Agent Header — Figma 7885:108604 / Topbar 30785:4970(gap-8)；频道态：# 头像 + 频道名 + (有描述才显示描述行)；
          分享选择态(9269:39944)：Tab 行隐藏,topbar 自带 border-b l12 */}
      <div className="flex shrink-0 items-center gap-[8px] px-[28px] py-[16px]" style={shareMode ? { borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' } : undefined}>
        {channel ? <ChannelPortrait /> : <AlvaPortrait />}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {/* 默认 Alva Agent：Watch your portfolio 独立流程(flow=portfolio)顶部标题改 Portfolio Digest；副标题不变 */}
            {channel ? channel.name : portfolioOpen ? 'Portfolio Digest' : 'Alva'}
          </p>
          {channel ? (
            channel.description && (
              <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                {channel.description}
              </p>
            )
          ) : (
            <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              Your AI investing agent. Ask me to research markets, build live Playbooks, or set up automations that watch the market for you.
            </p>
          )}
        </div>
        {shareMode ? (
          /* Cancel — Figma 9269:39944 Button:h32 px12 py6 gap6 border 0.5 l3 radius 4,close-l1 14 + Medium 12 n9 */
          <button
            type="button"
            onClick={exitShareMode}
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] bg-transparent px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
            style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
          >
            <CdnIcon name="close-l1" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            Cancel
          </button>
        ) : (
          <>
        {/* Portfolio — Figma 30785:4970:未连接 outline "Connect Portfolio";已连接点击开账户数据弹窗(31584:10618),View in Portfolio 才跳页 */}
        {connectedBroker ? (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
            onClick={() => setPortfolioInfoOpen(true)}
          >
            <span className="flex shrink-0 items-center">
              {TOPBAR_BROKERS.map((b, i) => (
                <img
                  key={b}
                  src={`${base}logo-broker-round-${b}.svg`}
                  alt=""
                  className={`relative size-[16px] rounded-full border-[0.5px] border-white ${i > 0 ? '-ml-[8px]' : ''}`}
                  style={{ zIndex: TOPBAR_BROKERS.length - i }}
                />
              ))}
            </span>
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Portfolio
            </span>
            <CdnIcon name="link-l" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        ) : (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
            onClick={() => setBrokerModalOpen(true)}
          >
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Connect Portfolio
            </span>
          </button>
        )}
        {/* IM Select — Figma 7887:111979 / 30785:4976:已连接显示账号名 + 6px m3 状态点;未连接态(30785:4983)为主色实心 Connect IM;点击都打开连接 modal */}
        {activeIm ? (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
            onClick={() => setImModalOpen(true)}
          >
            <img src={`${base}${activeIm.logo}`} alt="" className="size-[16px] shrink-0 rounded-full" />
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {activeIm.user}
            </span>
            <span className="size-[6px] shrink-0 rounded-full" style={{ background: 'var(--main-m3, #2a9b7d)' }} />
          </button>
        ) : (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-none px-[12px] py-[6px] transition-opacity hover:opacity-90"
            style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}
            onClick={() => setImModalOpen(true)}
          >
            {/* stacked IM logos 前置 — Figma 11138:207263:16px 圆形,白描边,-8px 叠压,telegram 在前,文字在后 */}
            <span className="flex shrink-0 items-center">
              <img src={`${base}logo-social-telegram.svg`} alt="" className="relative z-[3] size-[16px] rounded-full border-[0.5px] border-white" />
              <img src={`${base}logo-social-discord.svg`} alt="" className="relative z-[2] -ml-[8px] size-[16px] rounded-full border-[0.5px] border-white" />
              <img src={`${base}logo-social-slack.svg`} alt="" className="relative z-[1] -ml-[8px] size-[16px] rounded-full border-[0.5px] border-white bg-white" />
            </span>
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white">
              Connect IM
            </span>
          </button>
        )}
        <button
          className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
          aria-label="Agent settings"
          onClick={() => (channel ? setEditChannelOpen(true) : onNavigate('alva-agent'))}
        >
          <CdnIcon name="settings-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
          </>
        )}
      </div>

      {/* Tab — Figma 7885:108611:icon 16 + 14px,active Medium + b-2 m1;分享选择态整行隐藏(9269:39941) */}
      {!shareMode && (
      <div className="flex shrink-0 items-start gap-[16px] px-[28px]" style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              className="mb-[-1px] flex cursor-pointer items-center gap-[4px] bg-transparent px-0 pb-[6px]"
              style={{ border: 'none', borderBottom: active ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent' }}
              onClick={() => {
                if (shareMode && t.id !== 'chat') exitShareMode();
                setTab(t.id);
                // 点 Chat 一律回到初始 onboard 空态：退出独立 flow + 清空会话消息与产出（预置演示频道除外）
                if (t.id === 'chat') {
                  if (portfolioOpen || alphaRadarOpen) closeFlow();
                  if (!seeded) resetSession();
                }
              }}
            >
              <CdnIcon name={t.icon} size={16} color={active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))'} />
              <span
                className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]"
                style={{ fontFamily: FONT, color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))', fontWeight: active ? 500 : 400 }}
              >
                {t.label}
                {tabCounts[t.id] > 0 && <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontWeight: 400 }}> ({tabCounts[t.id]})</span>}
              </span>
            </button>
          );
        })}
      </div>
      )}

      {tab === 'chat' ? (
        portfolioOpen ? (
          /* Watch your portfolio 24/7 — 建仓向导视图（无 composer，可返回上一步） */
          <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className="mx-auto flex w-full max-w-[960px] flex-col pb-[60px] pt-[28px]">
              <FlowBack onClick={closeFlow} />
              <MsgIn>
                <AgentMsg time="" portrait={channel ? <ChannelPortrait size={22} /> : undefined} name={channel ? channel.name : undefined}>
                  <div>
                    <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Watch your portfolio 24/7</p>
                    <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.
                    </p>
                  </div>
                  <PortfolioBuilder initialBrokerId={connectedBroker?.id} onStart={onStartWatching} />
                </AgentMsg>
              </MsgIn>
            </div>
          </div>
        ) : alphaRadarOpen ? (
          /* Track FinTwit for alpha signals — Alpha Radar setup 视图（无 composer，可返回上一步） */
          <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className="mx-auto flex w-full max-w-[960px] flex-col pb-[60px] pt-[28px]">
              <FlowBack onClick={closeFlow} />
              <MsgIn>
                <AgentMsg time="" portrait={channel ? <ChannelPortrait size={22} /> : undefined} name={channel ? channel.name : undefined}>
                  <AlphaRadarBuilder onLive={onAlphaRadarLive} />
                </AgentMsg>
              </MsgIn>
            </div>
          </div>
        ) : (
        <>
          <div ref={stageRef} className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className={`mx-auto flex w-full max-w-[960px] flex-col pb-[60px] pt-[28px] ${shareMode ? 'gap-[12px]' : 'gap-[28px]'}`}>
              {/* 预置演示频道：聊天区为预置对话历史（恒显，Figma 10998:50677）；其余频道走 onboard 空态 */}
              {seeded && (
                <MsgIn>
                  <ChannelSeedThread
                    onOpenTasks={() => setTab('tasks')}
                    selectionMode={shareMode}
                    selectedIds={selectedShareIds}
                    onToggleShare={toggleShareMessage}
                    onCopyMessage={copyMessage}
                    onShareMessage={shareSingleMessage}
                  />
                </MsgIn>
              )}
              {/* 会话未开始才显示 onboard 空态;Start Watching / 发消息后收起,进入真实对话 */}
              {/* 开场恒为 onboard 引导（不随连接切换），只要未创建过（!started）就一直显示 */}
              {!seeded && !started && (
              <MsgIn>
              <AgentMsg time="" portrait={channel ? <ChannelPortrait size={22} /> : undefined} name={channel ? channel.name : undefined}>
                <div>
                  <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Hey, I'm Alva, your AI investing agent.</p>
                  <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                    Ask me for market research, or set up live automations to watch your portfolio, tickers, and market voices. Pick what you want me to help with first.
                  </p>
                </div>
                {/* Onboard Card/Default — Figma 9428:49614:3 行引导,行间分隔线,尾部箭头 */}
                <div className="flex w-full flex-col overflow-hidden rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                  {ONBOARD_CARDS.map((c, i, arr) => (
                    <button
                      key={c.id}
                      className="flex w-full cursor-pointer items-center gap-[8px] bg-transparent p-[16px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
                      style={{ border: 'none', borderBottom: i < arr.length - 1 ? '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' : 'none' }}
                      onClick={() => {
                        if (c.id === 'ticker-read') startTickerRead(c.prompt);
                        if (c.id === 'portfolio-digest') openFlow('portfolio');
                        if (c.id === 'fintwit-digest') openFlow('fintwit');
                        if (c.id === 'screener') startScreener(c.prompt);
                      }}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                        <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                          <span className="mr-[8px]">{c.emoji}</span>{c.title}
                        </p>
                        <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{c.desc}</p>
                      </div>
                      <CdnIcon name="arrow-right-l1" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
                    </button>
                  ))}
                </div>
              </AgentMsg>
              </MsgIn>
              )}

              {extra.map((m) => {
                const shareMessage = extraToShareMessage(m);
                const msgSelected = selectedShareIds.has(`extra-${m.id}`);
                /* Alva 消息分享 props:选择态 checkbox 顶替头像位(9281:37663),平时 header 行内 copy+share(9246:36248) */
                const agentShareProps = shareMessage ? {
                  portrait: shareMode ? <SelectCheckbox checked={msgSelected} /> : undefined,
                  headerActions: !shareMode ? <MsgHeaderActions onCopy={() => copyMessage(shareMessage)} onShare={() => shareSingleMessage(shareMessage.id)} /> : undefined,
                } : {};
                if (m.role === 'user') return (
                  <SelectableMessage
                    key={m.id}
                    active={shareMode}
                    selected={msgSelected}
                    label="Select user message for sharing"
                    onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    variant="user"
                    hoverTime={shareMessage?.time}
                    onQuickCopy={shareMessage ? () => copyMessage(shareMessage) : undefined}
                  >
                    <MsgIn><UserMsg text={m.text} quote={m.quote} /></MsgIn>
                  </SelectableMessage>
                );
                if (m.role === 'typing') return <MsgIn key={m.id}><AgentMsg time="now"><TypingDots /></AgentMsg></MsgIn>;
                /* tickerask — Ticker Read skill 介绍 + 热门标的选项卡(点 chip 即发送 symbol,composer 输入任意 symbol 同路) */
                if (m.role === 'tickerask') {
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select Alva answer for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                      <MsgIn>
                        <AgentMsg time="now" {...agentShareProps}>
                          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                            {TICKER_ASK_TEXT}
                          </p>
                          <TickerPickCard onPick={onPrompt} />
                        </AgentMsg>
                      </MsgIn>
                    </SelectableMessage>
                  );
                }
                /* tickerread — Markdown 排版(Library 31624:20421 模式):$SYMBOL 标题(Medium 16/26) + 判断句正文 + 标签行(Medium 14) + 内容行,全 n9 */
                if (m.role === 'tickerread') {
                  const N9 = { fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' } as const;
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select Alva answer for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                    <MsgIn><AgentMsg time="now" {...agentShareProps}>
                      {m.symbols.map((symbol) => {
                        const read = TICKER_READS[symbol];
                        if (!read) return null;
                        const sections = [['TAPE:', read.tape], ...(read.breaksIf ? [['BREAKS IF:', read.breaksIf]] : []), ['SOURCES:', read.sources]] as [string, string][];
                        return (
                          <div key={symbol} className="flex w-full flex-col gap-[12px]">
                            {/* 标题段 — Library "$MU" 同款:Medium 16/26 + pt2 */}
                            <p className="pt-[2px] text-[16px] font-medium leading-[26px] tracking-[0.16px]" style={N9}>${symbol}</p>
                            <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={N9}>{read.summary}</p>
                            {/* 行内标签(Medium) + 同行正文,三行紧排一组 */}
                            <div className="flex w-full flex-col">
                              {sections.map(([label, value]) => (
                                <p key={label} className="text-[14px] leading-[22px] tracking-[0.14px]" style={N9}>
                                  <span style={{ fontWeight: 500 }}>{label}</span> {value}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </AgentMsg></MsgIn>
                    </SelectableMessage>
                  );
                }
                /* screenerrec — 第三条引导的推荐回复:标题 + 说明两行,下接示例 prompt 卡,点行即发送 */
                if (m.role === 'screenerrec') {
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select Alva answer for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                      <MsgIn>
                        <AgentMsg time="now" {...agentShareProps}>
                          <p className="whitespace-pre-line text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{SCREENER_REC_TEXT}</p>
                          <ScreenerPromptsCard onPick={onPrompt} />
                        </AgentMsg>
                      </MsgIn>
                    </SelectableMessage>
                  );
                }
                if (m.role === 'answer') {
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select Alva answer for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                    <MsgIn><AgentMsg time="now" {...agentShareProps}>
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.text}</p>
                    </AgentMsg></MsgIn>
                    </SelectableMessage>
                  );
                }
                /* watchreply — Start Watching 的确认回复:正文 + 未连接时内嵌「选择推送渠道」卡片(连接后反应式隐藏) */
                if (m.role === 'watchreply') {
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select Alva answer for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                    <MsgIn><AgentMsg time="now" {...agentShareProps}>
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.text}</p>
                      {!connected && <AlertChannelsCard onConnect={connectIm} />}
                    </AgentMsg></MsgIn>
                    </SelectableMessage>
                  );
                }
                if (m.role === 'subpush') {
                  return (
                    <SelectableMessage
                      key={m.id}
                      active={shareMode}
                      selected={msgSelected}
                      label="Select notification for sharing"
                      onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                    >
                    <MsgIn><AgentMsg pushed time="now" {...agentShareProps}>
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                        <span style={{ fontWeight: 500 }}>{m.title}</span> is live in your workspace. {m.push ? "Here's the latest run — new ones will land right here." : 'The first run lands with the next cycle — pushes will land right here.'}
                      </p>
                      {m.push && (
                        <div className="flex items-center gap-[7px] self-start rounded-[6px] px-[9px] py-[6px]" style={{ background: 'var(--main-m5-10, rgba(230,169,26,0.1))' }}>
                          <span style={{ color: 'var(--main-m5, #E6A91A)' }}><Ic size={13}>{P.bell}</Ic></span>
                          <span className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{m.push}</span>
                        </div>
                      )}
                      <div><SourceTag automation={m.automation} /></div>
                    </AgentMsg></MsgIn>
                    </SelectableMessage>
                  );
                }
                if (m.role === 'task') {
                  const done = m.state === 'done';
                  const isAuto = m.kind === 'automation';
                  return (
                    <MsgIn key={m.id}>
                    <AgentMsg time="now">
                      {/* 任务卡（Figma Agent/Card/Chat 8341:125818）：560 宽白底卡 — step-f 24(n2) + 标题 14 + 副行 12 n5 + 状态 tag */}
                      <div className="flex w-full max-w-[560px] items-start gap-[8px] rounded-[8px] px-[16px] py-[12px]" style={{ background: '#fff', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                        <CdnIcon name={`${base}icon-step-f.svg`} size={24} color="var(--text-n2, rgba(0,0,0,0.2))" />
                        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
                          <p className="w-full truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.title}</p>
                          <p className="w-full truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                            {done
                              ? (isAuto ? 'Live — pushes will land here.' : 'Built and live — saved to Artifacts.')
                              : "Background task — I'll post here when it's done."}
                          </p>
                        </div>
                        <TaskTag state={m.state} />
                      </div>
                    </AgentMsg>
                    </MsgIn>
                  );
                }
                /* imrec — 任务跑完后的一次性连接软推荐(解耦的核心交互)*/
                return (
                  <SelectableMessage
                    key={m.id}
                    active={shareMode}
                    selected={msgSelected}
                    label="Select Alva answer for sharing"
                    onToggle={() => toggleShareMessage(`extra-${m.id}`)}
                  >
                    <MsgIn>
                      <AgentMsg time="now" {...agentShareProps}>
                        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                          {IM_REC_TEXT}
                        </p>
                        <AlertChannelsCard onConnect={connectIm} />
                      </AgentMsg>
                    </MsgIn>
                  </SelectableMessage>
                );
              })}
            </div>
          </div>

          {shareMode ? (
            /* Selection Bar — Figma Chat/Block-Select Message 9282:37953(变体 9252:2160):
               px20 py16 gap12,border 0.5 l2,radius 8,Shadow XS;「N/10 selected」动态计数(满 10 数字 m1),
               0 选中两按钮退白底灰字(n2) */
            <div className="shrink-0 px-[16px] pb-[16px] sm:px-[28px] sm:pb-[28px]">
              <div
                className="mx-auto flex w-full max-w-[960px] items-center gap-[12px] rounded-[8px] bg-white px-[20px] py-[16px]"
                style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
              >
                <p className="min-w-0 flex-1 truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT }}>
                  <span style={{ color: selectedShareMessages.length >= 10 ? 'var(--main-m1, #49A3A6)' : 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                    {selectedShareMessages.length}/10{' '}
                  </span>
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>selected</span>
                </p>
                <div className="flex shrink-0 items-center gap-[8px]">
                  <button
                    type="button"
                    disabled={selectedShareMessages.length === 0}
                    onClick={copySelectedShare}
                    className="flex h-[32px] cursor-pointer items-center justify-center gap-[6px] rounded-[4px] bg-white px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] disabled:cursor-not-allowed"
                    style={{ fontFamily: FONT, color: selectedShareMessages.length === 0 ? 'var(--text-n2, rgba(0,0,0,0.2))' : 'var(--text-n9, rgba(0,0,0,0.9))', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
                  >
                    <CdnIcon name="link-l" size={14} color={selectedShareMessages.length === 0 ? 'var(--text-n2, rgba(0,0,0,0.2))' : 'var(--text-n9, rgba(0,0,0,0.9))'} />
                    Copy link
                  </button>
                  <button
                    type="button"
                    disabled={selectedShareMessages.length === 0}
                    onClick={() => setShareImageOpen(true)}
                    className="flex h-[32px] cursor-pointer items-center justify-center gap-[6px] rounded-[4px] px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] disabled:cursor-not-allowed"
                    style={selectedShareMessages.length === 0
                      ? { fontFamily: FONT, background: '#fff', color: 'var(--text-n2, rgba(0,0,0,0.2))', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }
                      : { fontFamily: FONT, background: 'var(--main-m1, #49A3A6)', color: '#fff', border: 'none' }}
                  >
                    <CdnIcon name="photo-l" size={14} color={selectedShareMessages.length === 0 ? 'var(--text-n2, rgba(0,0,0,0.2))' : '#fff'} />
                    Create image
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* composer 常显：onboard / 已开始对话都可继续聊天 */
            <div className="shrink-0 px-[28px] pb-[28px]">
              <div className="mx-auto w-full max-w-[960px]">
                {/* 预置演示频道：composer 上方常驻 3 条 prompt chips — Figma 10998:50699:p-16 gap-8 */}
                {seeded && (
                  <div className="flex w-full flex-wrap items-center gap-[8px] p-[16px]">
                    {EMPTY_PROMPTS.map((prompt) => (
                      <EmptyPromptPill key={prompt.text} icon={prompt.icon} text={prompt.text} onClick={() => onPrompt(prompt.text)} />
                    ))}
                  </div>
                )}
                <ChatInput shadow shadowSize="xs" subtleBorder allowReferences={false} hideInspector voiceInput placeholder="Ask Alva anything. @ for context, / for skills" onSend={onPrompt} />
              </div>
            </div>
          )}
        </>
        )
      ) : tab === 'tasks' ? (
        tabCounts.tasks > 0 ? <AgentTasksPanel /> : <EmptyPanel tabId="tasks" />
      ) : tab === 'memory' ? (
        <AgentMemory />
      ) : tab === 'alerts' ? (
        tabCounts.alerts > 0 ? (
          <AgentAlertsPanel
            alerts={sessionAlerts.length ? sessionAlerts : undefined}
            getStarted={ALERT_GET_STARTED_CARDS.map((c) => ({
              ...c,
              onClick: () => {
                setTab('chat');
                if (c.id === 'gs-portfolio') openFlow('portfolio');
                if (c.id === 'gs-fintwit') openFlow('fintwit');
              },
            }))}
          />
        ) : <EmptyPanel tabId="alerts" />
      ) : tab === 'artifacts' ? (
        tabCounts.artifacts > 0 ? <AgentArtifactsPanel /> : <EmptyPanel tabId="artifacts" />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[10px]">
          <CdnIcon name={TABS.find((t) => t.id === tab)?.icon ?? 'folder-l'} size={28} color="var(--text-n2, rgba(0,0,0,0.2))" />
          <p className="text-[13px] leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            The {TABS.find((t) => t.id === tab)?.label.replace(/\s*\(\d+\)$/, '')} panel isn't wired in this prototype yet.
          </p>
          <button
            className="cursor-pointer border-none bg-transparent p-0 text-[13px] underline"
            style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}
            onClick={() => setTab('chat')}
          >
            Back to Chat
          </button>
        </div>
      )}

      <ShareImagePreview
        open={shareImageOpen}
        messages={selectedShareMessages}
        onClose={() => setShareImageOpen(false)}
      />

      {/* Toast — 组件库规范(@repo/ui-base):顶部居中 top-28,白底 + 0.5 l2 描边 + radius-pop-toast 4 + Shadow S,
          px16 py12 gap8,icon 20(success=check-f2 原色/warning=alert-f m6/error=alert-f m4) + Regular 14 n9,顶部滑入 */}
      {shareNotice && (
        <>
          <style>{'@keyframes alva-toast-in { from { opacity: 0; transform: translate(-50%, -100%); } to { opacity: 1; transform: translate(-50%, 0); } }'}</style>
          <div
            role="status"
            className="fixed left-1/2 top-[28px] z-[140] flex max-w-[90vw] items-center gap-[8px] rounded-[4px] bg-white px-[16px] py-[12px]"
            style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: '0 6px 20px rgba(0,0,0,0.04)', animation: 'alva-toast-in 0.25s ease-out both' }}
          >
            {shareNotice.type === 'success'
              ? <CdnIcon name="check-f2" size={20} />
              : <CdnIcon name="alert-f" size={20} color={shareNotice.type === 'warning' ? 'var(--main-m6, #ff9800)' : 'var(--main-m4, #e05357)'} />}
            <span className="min-w-0 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {shareNotice.title}
            </span>
          </div>
        </>
      )}

      {editChannelOpen && channel && (
        <EditChannelModal
          description={channel.description ?? ''}
          onClose={() => setEditChannelOpen(false)}
          onSave={(desc) => {
            channelsStore.updateDescription(channel.id, desc);
            setEditChannelOpen(false);
          }}
        />
      )}

      <ConnectAccountModal
        open={brokerModalOpen}
        onClose={() => setBrokerModalOpen(false)}
        onConnected={(id, access, accountType) => {
          /* 成功即触发（徽章相同步）：只更新连接态让 topbar 即时切换；弹窗关闭由 onClose 链路负责 */
          setConnectedBroker({ id, name: brokerDisplayInfo(id)?.name ?? id, live: access === 'trading', accountType });
        }}
        /* 成功徽章后在连接弹窗内 FLIP 展开账户数据 + 引导（遮罩不断不闪）；行动卡回调关弹窗后执行 */
        successInfo={{
          onViewPortfolio: () => onNavigate('portfolio'),
          onTrade: () => onPrompt("Help me place a trade — draft the order and I'll approve it"),
          onWatch: () => openFlow('portfolio'),
        }}
      />

      {/* 账户数据弹窗（Modal/Portfolio Info）— topbar Portfolio 按钮 / 绑定成功徽章后打开；与 Connect IM 同为居中弹窗 */}
      {portfolioInfoOpen && connectedBroker && (
        <PortfolioInfoModal
          broker={connectedBroker}
          onClose={() => setPortfolioInfoOpen(false)}
          onViewPortfolio={() => { setPortfolioInfoOpen(false); onNavigate('portfolio'); }}
          onTrade={() => { setPortfolioInfoOpen(false); onPrompt("Help me place a trade — draft the order and I'll approve it"); }}
          onWatch={() => { setPortfolioInfoOpen(false); openFlow('portfolio'); }}
          onConnectAnother={() => { setPortfolioInfoOpen(false); setBrokerModalOpen(true); }}
        />
      )}

      {imModalOpen && (
        <ConnectAppsModal
          rows={IMS.map((im) => ({ id: im.id, name: im.label, sub: im.sub, handle: im.handle, logo: `${base}${im.logo}` }))}
          connectedIds={IMS.filter((im) => imLinks[im.id]).map((im) => im.id)}
          activeId={imActive}
          onClose={() => setImModalOpen(false)}
          onConnect={connectIm}
          onDisconnect={disconnectIm}
          onSetActive={setImActive}
          linkRows={[{ id: 'imessage', name: 'iMessage', sub: 'Connect Messages to send and receive alerts.', logo: `${base}logo-social-imessage.svg` }]}
        />
      )}
    </div>
  );
}
