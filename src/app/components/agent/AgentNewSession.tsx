/**
 * [INPUT]: Figma Page/Agent/New(7885:108600)+ demo/AgentChannelNewUserDemo(目标形态参照)
 * [OUTPUT]: Agent 页 empty 态 — Agent Header(Telegram Select / Settings)+ 4 tab + skill chips + prompt 容器 + composer;聊天与 IM 解耦
 * [POS]: pages/Agent.tsx 统一渲染本组件,连接态不再切换到独立 AgentChat 页面
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AgentMemory } from '@/app/components/agent/AgentMemory';
import { AgentTasksPanel, AGENT_TASKS } from '@/app/components/agent/AgentTasksPanel';
import { AgentArtifactsPanel, AGENT_ARTIFACTS } from '@/app/components/agent/AgentArtifactsPanel';
import { AgentAlertsPanel, AGENT_ALERTS } from '@/app/components/agent/AgentAlertsPanel';
import { ConnectAppsModal } from '@/app/components/shared/ConnectAppsModal';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { SkillChip } from '@/app/components/shared/SkillChip';
import { SkillsLibraryPanel } from '@/app/components/shared/SkillsLibraryPanel';
import { SkillPreviewCard, previewCardKey, toPushCardData, type SkillPreviewCardData } from '@/app/components/agent/SkillPreviewCard';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import type { PushCardData } from '@/app/components/shared/AutomationCard';
import { COMMUNITY_TEMPLATES, OTHERS_TEMPLATES, PRIMARY_TEMPLATES, type NewChatTemplate } from '@/data/new-chat-mock';

const FONT = "'Delight', sans-serif";

/* ========== tone 色板(Alva token + fallback)========== */

type Tone = 'teal' | 'blue' | 'amber' | 'green' | 'orange';

const TONE_FG: Record<Tone, string> = {
  teal: 'var(--main-m1, #49A3A6)',
  blue: 'var(--main-m2, #2196f3)',
  amber: 'var(--main-m5, #E6A91A)',
  green: 'var(--main-m3, #2a9b7d)',
  orange: 'var(--main-m6, #ff9800)',
};
const TONE_BG: Record<Tone, string> = {
  teal: 'var(--main-m1-10, rgba(73,163,166,0.1))',
  blue: 'var(--main-m2-10, rgba(33,150,243,0.1))',
  amber: 'var(--main-m5-10, rgba(230,169,26,0.1))',
  green: 'var(--main-m3-10, rgba(42,155,125,0.1))',
  orange: 'var(--main-m6-10, rgba(255,152,0,0.1))',
};

/* ========== 内联线性图标(CDN 无对应名的图形)========== */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      {children}
    </svg>
  );
}

const P = {
  link: <><path d="M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.7-5.7l-1.6 1.6" /><path d="M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.7 5.7l1.6-1.6" /></>,
  automation: <path d="M13 3 5 13.5h5L9 21l8-10.5h-5z" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10.5 19a1.5 1.5 0 0 0 3 0" /></>,
  x: <path d="M7 7l10 10M17 7 7 17" />,
};

/* ========== 数据(同 demo,语义不变)========== */

interface SkillData {
  id: string;
  label: string;
  /** CDN icon 名 — 与 NewChat 首页同名 skill chips 一致 */
  icon: string;
  kind: 'playbook' | 'automation';
  prompts: string[];
  /** 选中后展示的预览卡(Figma 7788:77185 四类型) */
  cards: SkillPreviewCardData[];
}

const SKILLS: SkillData[] = [
  {
    id: 'theme-tracker', label: 'Theme Tracker', icon: 'bulb-l', kind: 'playbook',
    prompts: [
      'Build a theme tracker for AI infrastructure — NVDA, AVGO, TSM, and power-grid names',
      'Track the GLP-1 / obesity theme — LLY, NVO, and the supply chain around them',
      'Set up a tracker for the power & grid buildout — VRT, GEV, ETN',
    ],
    cards: [
      { type: 'playbook', title: 'Hyperscaler Capex Tracker', cover: 'playbook-cover-mag7.png', creator: 'Macro Scope X', remixes: '32', subs: '489' },
      {
        type: 'trade', time: 'May 8, 12:00 PM', source: 'ai-infra-basket', feed: 'ai-infra-rebalance',
        signals: [
          { side: 'Buy', ticker: 'NVDA', note: 'weight 38.2%', up: true },
          { side: 'Buy', ticker: 'AAPL', note: 'weight 31.4%', up: true },
          { side: 'Sell', ticker: 'TSLA', note: 'exit position', up: false },
        ],
        rebalance: 'Rebalance: Top 3 by capex revisions: NVDA(38.2%), AAPL(31.4%), RKLB(30.4%)',
      },
      {
        type: 'kol', time: 'May 8, 10:40 AM', source: 'ai-infra-basket', feed: 'ai-infra-rebalance', kolAvatar: 'avatar-kol-x.png',
        quote: '$NVDA Jensen Huang: "Demand for Blackwell is insane — everybody wants to have the most, and they want to be first."',
        ticker: 'NVDA', side: 'LONG',
        analysis: 'Supply, not demand, remains the binding constraint. Capex read-through stays positive for the AI-infra basket.',
      },
    ],
  },
  {
    id: 'smart-screener', label: 'Smart Screener', icon: 'target-l2', kind: 'automation',
    prompts: [
      'Screen US large-caps with rising earnings estimates and positive 20-day momentum, alert me on new entrants',
      'Find quality names down 20%+ from highs with ROE above 20% and net cash',
      'Screen for stocks where 3+ insiders bought within the last two weeks',
    ],
    cards: [
      { type: 'playbook', title: 'MAG7 Equal-Weight Monthly Rebalance', cover: 'playbook-cover-mag7.png', creator: 'Alva_FinTwit_Tracker', creatorAvatar: 'avatar-fintwit-tracker.png', remixes: '56', subs: '1.2K' },
      {
        type: 'push', time: 'May 8, 9:00 AM', source: 'ai-diaspora-tracker', feed: 'nvda-social-feed',
        title: '【Recursive Superintelligence】· DeepMind + OpenAI + Salesforce alliance, exits Stealth mid-May',
        bullets: [
          '🧑 Founders: Tim Rocktäschel (fmr DeepMind Principal Scientist / UCL), Richard Socher (fmr Salesforce Chief Scientist), Josh Tobin & Jeff Clune (both fmr OpenAI)',
          '🏢 New company: Recursive Superintelligence (Automate the full frontier AI R&D pipeline: eval / data / training / post-training)',
          '💰 Round: $500M / $4B pre-money; round expected to close above $1B',
          '📊 Technical Analysis: GLD has been weakening continuously',
        ],
      },
      {
        type: 'trade', time: 'May 8, 12:00 PM', source: 'space-rotation', feed: 'nvda-social-feed',
        signals: [
          { side: 'Buy', ticker: 'AAPL', note: 'weight 33.3%', up: true },
          { side: 'Buy', ticker: 'RKLB', note: 'weight 33.3%', up: true },
          { side: 'Buy', ticker: 'NVDA', note: 'weight 33.3%', up: true },
          { side: 'Sell', ticker: 'TSLA', note: 'exit position', up: false },
        ],
        rebalance: 'Rebalance: Top 3 by 63d momentum: AAPL(78.2%), RKLB(35.1%), NVDA(34.0%)',
      },
      {
        type: 'kol', time: 'May 8, 12:00 PM', source: 'space-rotation', feed: 'nvda-social-feed', kolAvatar: 'avatar-kol-x.png',
        quote: '$AMZN AWS CEO: "Compute demand is so excessive that we have never retired old A100s."',
        ticker: 'NVDA', side: 'LONG',
        analysis: 'The bet is that excessive compute demand keeps old GPUs in service and supports AI-infra capacity providers. No risk view is stated.',
      },
    ],
  },
  {
    id: 'deep-dive', label: 'Deep Dive', icon: 'search-l', kind: 'playbook',
    prompts: [
      'Deep-dive NVDA: revenue segmentation, peer valuation, supply chain, bull/bear thesis',
      'Deep-dive TSM: node roadmap, pricing power, and the CoWoS bottleneck',
      'Deep-dive AVGO: networking growth, VMware integration, custom-ASIC pipeline',
    ],
    cards: [
      { type: 'playbook', title: 'NVDA Living Deep Dive', cover: 'playbook-cover-mag7.png', creator: 'Alva', remixes: '41', subs: '824' },
      {
        type: 'push', time: 'May 8, 8:30 AM', source: 'nvda-deep-dive', feed: 'nvda-deep-dive',
        title: '【NVDA ER Preview】· May 22 — implied move ±7.8% vs 8-quarter average ±5.1%',
        bullets: [
          '📊 Data-center now 78% of revenue — +154% YoY, hyperscaler capex still accelerating',
          '🏭 CoWoS remains the supply gate: TSM doubling capacity through 2025',
          '💰 NTM P/E 34× vs AMD 28× — premium narrows on every guide-up',
          '⚠️ Key risk: export controls and supply, not demand',
        ],
      },
      {
        type: 'kol', time: 'May 8, 11:20 AM', source: 'chip-insider-watch', feed: 'nvda-deep-dive', kolAvatar: 'avatar-kol-x.png',
        quote: '$NVDA "Every node ramp in history was demand-constrained. This one is supply-constrained — that\'s the whole thesis."',
        ticker: 'NVDA', side: 'LONG',
        analysis: 'Supply-gated growth supports pricing power through 2025. Watch CoWoS capacity adds and the May 22 ER as the next catalysts.',
      },
    ],
  },
  {
    id: 'what-if', label: 'What If', icon: 'remix-l', kind: 'automation',
    prompts: [
      'What if NVDA falls 15% on an earnings miss — how does my book reprice?',
      'What if the Fed cuts 50bp next meeting — which of my names benefit most?',
      'What if the dollar spikes 5% — where is my book most exposed?',
    ],
    cards: [
      {
        type: 'push', time: 'May 8, 10:05 AM', source: 'book-shock-monitor', feed: 'book-shock-monitor',
        title: '【Scenario fired】· NVDA −15% on an earnings miss — your book reprices −3.4%',
        bullets: [
          '📉 Direct NVDA exposure −1.9%; AVGO / TSM correlation drift adds −1.5%',
          '💵 USD +5% scenario: EM sleeve −9%, exporters −3% — book −1.7% total',
          '🏦 Fed −50bp scenario: duration +6%, banks −2% — book +2.1%',
          '⚠️ CPI lands 8:30 tomorrow — consensus 3.3%, a 2σ print re-triggers this alert',
        ],
      },
      {
        type: 'trade', time: 'May 8, 12:00 PM', source: 'book-shock-monitor', feed: 'book-shock-monitor',
        signals: [
          { side: 'Sell', ticker: 'NVDA', note: 'trim to 12% weight', up: false },
          { side: 'Buy', ticker: 'AAPL', note: 'weight 18.0%', up: true },
          { side: 'Sell', ticker: 'TSLA', note: 'exit position', up: false },
        ],
        rebalance: 'Hedge: shift 6% from AI-infra into quality duration ahead of CPI',
      },
    ],
  },
];

/* ready-made KOL skills(Figma chips 第 4-6、8 位)— 与平台 skill 同为单选展开 preview,订阅走卡片按钮 */
interface KolSkill { id: string; label: string; /** public/avatars/ 下文件名,Figma 7887:112461 切图 */ avatarSrc: string; kind: SkillData['kind']; cards: SkillPreviewCardData[] }

const KOL_SKILLS: KolSkill[] = [
  {
    id: 'daily-macro-brief', label: 'Daily Macro Brief', avatarSrc: 'skill-daily-macro-brief.png', kind: 'automation',
    cards: [
      {
        type: 'push', time: 'May 8, 7:30 AM', source: 'daily-macro-brief', feed: 'daily-macro-brief',
        title: "【Today's Brief】· CPI at 8:30, dollar bid overnight, 10Y backing up",
        bullets: [
          '📅 CPI 8:30 — consensus 3.3%; a hot print pressures duration names',
          '💵 DXY +0.6% overnight — exporters and EM sleeve exposed',
          '📈 10Y 4.42% (+6bp) — rate-sensitives soft pre-open',
          '🗓️ Also today: 3 Fed speakers, 10Y auction at 1:00 PM',
        ],
      },
      {
        type: 'kol', time: 'May 8, 7:45 AM', source: 'macro-scope-x', feed: 'daily-macro-brief', kolAvatar: 'avatar-kol-x.png',
        quote: '$TSLA "Rates above 4.4% are a tax on every long-duration growth story — autos with negative FCF most of all."',
        ticker: 'TSLA', side: 'SHORT',
        analysis: 'The short thesis is rate-driven multiple compression, not demand. Invalidate if the 10Y breaks back below 4.2%.',
      },
    ],
  },
  {
    id: 'earnings-edge', label: 'Earnings Edge', avatarSrc: 'skill-earnings-edge.png', kind: 'automation',
    cards: [
      {
        type: 'push', time: 'May 8, 11:00 AM', source: 'earnings-edge', feed: 'earnings-edge',
        title: '【ER Setup】· NVDA reports May 22 — options imply ±7.8% vs 8-quarter average ±5.1%',
        bullets: [
          '📊 Implied move ±7.8% — richest premium into an NVDA print since FY24 Q2',
          '📈 COST beat + raise — gapping +3% pre-market',
          '⚖️ ADBE in-line guide — implied move looks overpriced, premium-selling setup',
          '🗓️ Next on the calendar: AVGO Jun 4, ORCL Jun 11',
        ],
      },
      {
        type: 'trade', time: 'May 8, 1:00 PM', source: 'earnings-edge', feed: 'earnings-edge',
        signals: [
          { side: 'Buy', ticker: 'NVDA', note: 'pre-ER weight 20.0%', up: true },
          { side: 'Buy', ticker: 'AAPL', note: 'weight 15.0%', up: true },
          { side: 'Sell', ticker: 'TSLA', note: 'exit before ER', up: false },
        ],
        rebalance: 'ER book: long beats with cheap implied moves, flat into rich premiums',
      },
    ],
  },
  {
    id: 'crypto-pulse', label: 'Crypto Pulse', avatarSrc: 'skill-crypto-pulse.png', kind: 'playbook',
    cards: [
      { type: 'playbook', title: 'Crypto Pulse — BTC Regime Tracker', cover: 'playbook-cover-mag7.png', creator: 'Crypto Pulse', remixes: '24', subs: '976' },
      {
        type: 'push', time: 'May 8, 6:00 AM', source: 'crypto-pulse', feed: 'crypto-pulse',
        title: '【Regime: Risk-on】· BTC +2.4% to $104,200 — funding neutral, breadth improving',
        bullets: [
          '🟢 BTC $104,200 (+2.4%) — 30d trend +9.6%, regime stays risk-on',
          '🔷 ETH $3,890 (+3.1%) — ETH/BTC ratio stabilizing after 3-week slide',
          '🟣 SOL $216 (−1.2%) — lagging majors, watch the $210 shelf',
          '🗓️ Next catalyst: FOMC minutes — funding flips fast on rate surprises',
        ],
      },
    ],
  },
  {
    id: 'yield-hunter', label: 'Yield Hunter', avatarSrc: 'skill-yield-hunter.png', kind: 'playbook',
    cards: [
      { type: 'playbook', title: 'Yield Hunter — 6.8% Blended Income', cover: 'playbook-cover-mag7.png', creator: 'Sheer YLL', remixes: '18', subs: '318' },
      {
        type: 'trade', time: 'May 8, 9:30 AM', source: 'yield-hunter', feed: 'yield-hunter',
        signals: [
          { side: 'Buy', ticker: 'AAPL', note: 'weight 12.0%', up: true },
          { side: 'Buy', ticker: 'NVDA', note: 'weight 8.0%', up: true },
          { side: 'Sell', ticker: 'TSLA', note: 'no yield — exit', up: false },
        ],
        rebalance: 'Income sleeve: rotate 4% from zero-yield growth into dividend growers',
      },
    ],
  },
  {
    id: 'dividend-diary', label: 'Dividend Diary', avatarSrc: 'skill-dividend-diary.png', kind: 'playbook',
    cards: [
      { type: 'playbook', title: 'Dividend Diary — Income Compounder', cover: 'playbook-cover-mag7.png', creator: 'Dividend Diary', remixes: '21', subs: '512' },
      {
        type: 'push', time: 'May 8, 8:00 AM', source: 'dividend-diary', feed: 'dividend-diary',
        title: '【Income Diary】· $3,184 collected YTD — yield on cost 4.9% across 18 holdings',
        bullets: [
          '🟢 SCHD 3.4% — core sleeve, raised the dividend 11% YoY',
          '🏢 O 5.6% — monthly REIT, next ex-div Jun 25',
          '⚠️ VZ 6.4% — payout 62%, watch FCF coverage after capex guide',
          '🗓️ Ex-div this week: SCHD Jun 25, O Jun 28',
        ],
      },
    ],
  },
];

/* chips 渲染顺序按 Figma:平台 skill 与 KOL 混排 */
const CHIP_ORDER: { type: 'skill' | 'kol'; id: string }[] = [
  { type: 'skill', id: 'theme-tracker' },
  { type: 'skill', id: 'smart-screener' },
  { type: 'skill', id: 'deep-dive' },
  { type: 'kol', id: 'daily-macro-brief' },
  { type: 'kol', id: 'earnings-edge' },
  { type: 'kol', id: 'crypto-pulse' },
  { type: 'skill', id: 'what-if' },
  { type: 'kol', id: 'yield-hunter' },
  { type: 'kol', id: 'dividend-diary' },
];

/* More 浮层的全量 skills 池 — 与 NewChat 首页同源 */
const ALL_LIBRARY_SKILLS: NewChatTemplate[] = [...PRIMARY_TEMPLATES, ...OTHERS_TEMPLATES, ...COMMUNITY_TEMPLATES];

const DEFAULT_PROMPTS = [
  'Build a theme tracker for AI infrastructure covering NVDA, AVGO, TSM, and power grid names',
  'Track the obesity drug theme (LLY, NVO, AMGN) and surface weekly sentiment shifts',
  'Watch nuclear-renaissance equities and flag any catalyst from the DOE / regulators',
];

interface ImEntry { id: string; label: string; logo: string; handle: string; sub: string }

const IMS: ImEntry[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-social-telegram.svg', handle: '@yggyll_tg', sub: 'Bot DM — instant pushes' },
  { id: 'discord', label: 'Discord', logo: 'logo-social-discord.svg', handle: 'yggyll#0882', sub: 'Bot DM — switch channels with /channel' },
  { id: 'whatsapp', label: "WhatsApp", logo: 'logo-social-whatsapp.svg', handle: '+1 ··· 4821', sub: 'Business account DM' },
  { id: 'slack', label: 'Slack', logo: 'logo-social-slack.svg', handle: '@yggyll · alva-hq', sub: 'Alva app in your workspace' },
];

/* Tab — Figma 7911:134921:5 tab,计数为 n3 后缀 */
const TABS: { id: string; label: string; icon: string; count?: number }[] = [
  { id: 'chat', label: 'Chat', icon: 'chat-l1' },
  { id: 'tasks', label: 'Tasks', icon: 'step-l', count: AGENT_TASKS.length },
  { id: 'memory', label: 'Memory', icon: 'brain-l' },
  { id: 'alerts', label: 'Alerts', icon: 'notification-l', count: AGENT_ALERTS.length },
  { id: 'artifacts', label: 'Files', icon: 'folder-l', count: AGENT_ARTIFACTS.length },
];

/* ========== 原子组件 ========== */

function StatusPill({ state }: { state: 'running' | 'done' }) {
  const running = state === 'running';
  return (
    <span
      className="flex h-[22px] shrink-0 items-center gap-[5px] rounded-full px-[8px] text-[11px] leading-[18px] tracking-[0.11px]"
      style={{
        fontFamily: FONT,
        color: running ? 'var(--main-m1, #49A3A6)' : 'var(--main-m3, #2a9b7d)',
        background: running ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'var(--main-m3-10, rgba(42,155,125,0.1))',
      }}
    >
      <span className="size-[5px] rounded-full" style={{ background: 'currentcolor' }} />
      {running ? 'Running' : 'Live'}
    </span>
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

function AgentMsg({ pushed, time = 'Thursday 7:22 PM', children }: { pushed?: boolean; time?: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start gap-[8px]">
      <AlvaPortrait size={22} />
      {/* name 行与内容整体 gap 8;内容 div 内部(Markdown / widget 块之间)gap 12 */}
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva Agent</p>
          {pushed && (
            <span
              className="rounded-[4px] px-[5px] text-[10px] leading-[16px] tracking-[0.3px]"
              style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
            >
              pushed
            </span>
          )}
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{time}</p>
        </div>
        <div className="flex min-w-0 w-full flex-col gap-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="max-w-[560px] rounded-[8px] px-[14px] py-[10px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
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

/* ========== 卡片行:横滚 + 两缘 80px 渐隐(左:在最左时隐藏;右:滚到最右/不可滚时隐藏)========== */

function CardRowFade({ children }: { children: React.ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const update = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);
  useEffect(() => {
    update();
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);
  return (
    <div className="relative w-full">
      {/* pb 给足 shadow-l 的垂直外延(0 10px 20px ≈ 30px),再负 mb 抵掉,避免 overflow 裁切阴影 */}
      <div ref={rowRef} className="-mb-[30px] flex w-full gap-[16px] overflow-x-auto pb-[34px] pt-[12px]" style={{ scrollbarWidth: 'none' }}>
        {children}
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-[80px] transition-opacity duration-200"
        style={{ background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))', opacity: atStart ? 0 : 1 }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 w-[80px] transition-opacity duration-200"
        style={{ background: 'linear-gradient(to left, #fff, rgba(255,255,255,0))', opacity: atEnd ? 0 : 1 }}
      />
    </div>
  );
}

/* ========== 互动消息流(respond 模拟)========== */

type ExtraMsg =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'typing' }
  | { id: number; role: 'task'; title: string; kind: 'playbook' | 'automation'; state: 'running' | 'done' }
  | { id: number; role: 'imrec' }
  | { id: number; role: 'subpush'; title: string; push?: string; automation: string }
  | { id: number; role: 'answer'; text: string };

/* ========== 主组件 ========== */

export function AgentNewSession({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const base = import.meta.env.BASE_URL;
  const [tab, setTab] = useState('chat');
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [extra, setExtra] = useState<ExtraMsg[]>([]);
  const [imLinks, setImLinks] = useState<Record<string, boolean>>({ telegram: true });
  /* 谁接收 IM 推送 — 单 active channel,绑定/解绑随动(spec: 解绑 active 回退最早绑定) */
  const [imActive, setImActive] = useState<string | null>('telegram');
  /* 推送类卡片点击 → feed 详情弹窗(复用 NewChat / Automations 的 FeedDetailModal) */
  const [activeFeed, setActiveFeed] = useState<PushCardData | null>(null);
  const [imModalOpen, setImModalOpen] = useState(false);
  const [skillsLibOpen, setSkillsLibOpen] = useState(false);
  const idRef = useRef(0);
  const imRecShownRef = useRef(false);
  const imLinksRef = useRef(imLinks);
  imLinksRef.current = imLinks;
  const stageRef = useRef<HTMLDivElement>(null);

  const sel = openSkill ? SKILLS.find((s) => s.id === openSkill) : null;
  const selKol = openSkill && !sel ? KOL_SKILLS.find((k) => k.id === openSkill) : null;
  const opened = sel ?? selKol;
  /* More 浮层选中的池内 skill(含 KOL chips 同 id 项):prompts 从池里取 */
  const selPool = openSkill && !sel ? ALL_LIBRARY_SKILLS.find((t) => t.id === openSkill) ?? null : null;
  const openedLabel = sel?.label ?? selKol?.label ?? selPool?.label ?? null;
  const promptList = sel ? sel.prompts : selPool ? selPool.prompts.slice(0, 3) : DEFAULT_PROMPTS;
  /* 选中的 skill 不在外露 chips 里(来自 More 浮层)→ More chip 走选中态 */
  const moreActive = !sel && !selKol && !!selPool;
  const activeIm = imActive ? IMS.find((i) => i.id === imActive) ?? null : null;

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      stageRef.current?.scrollTo({ top: stageRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  /* 任务流:user → typing → task running → done;完成后若未连 IM,一次性软推荐 */
  const respond = useCallback((userText: string, kind: 'playbook' | 'automation', title: string) => {
    setTab('chat');
    setOpenSkill(null);
    const uid = ++idRef.current;
    setExtra((prev) => [...prev, { id: uid, role: 'user', text: userText }, { id: uid + 1, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      setExtra((prev) => prev.filter((m) => m.id !== uid + 1).concat({ id: uid + 2, role: 'task', title, kind, state: 'running' }));
      scrollToEnd();
      setTimeout(() => {
        setExtra((prev) => prev.map((m) => (m.id === uid + 2 && m.role === 'task' ? { ...m, state: 'done' } : m)));
        if (!Object.values(imLinksRef.current).some(Boolean) && !imRecShownRef.current) {
          imRecShownRef.current = true;
          setTimeout(() => {
            setExtra((prev) => [...prev, { id: ++idRef.current, role: 'imrec' }]);
            scrollToEnd();
          }, 1400);
        }
      }, 4500);
    }, 1000);
  }, [scrollToEnd]);

  const onPrompt = useCallback((text: string) => {
    const kind: 'playbook' | 'automation' = /screen|alert|monitor|watch|what if/i.test(text) ? 'automation' : 'playbook';
    respond(text, kind, kind === 'automation' ? 'Automation: Smart Screener' : `Build: ${text.slice(0, 42)}…`);
  }, [respond]);

  /* 订阅:即时生效,Alva 立刻推首条 run(价值先行,不要求连接)*/
  const pushSubscribe = useCallback((title: string, push: string | undefined, automation: string) => {
    setTab('chat');
    const uid = ++idRef.current;
    setExtra((prev) => [...prev, { id: uid, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      setExtra((prev) => prev.filter((m) => m.id !== uid).concat({ id: uid + 1, role: 'subpush', title, push, automation }));
      scrollToEnd();
    }, 700);
  }, [scrollToEnd]);

  const onSubscribeCard = useCallback((c: SkillPreviewCardData) => {
    setSubscribed((prev) => ({ ...prev, [previewCardKey(c)]: true }));
    if (c.type === 'playbook') pushSubscribe(c.title, undefined, `${c.title} · run`);
    else if (c.type === 'push') pushSubscribe(c.feed, c.title, c.source);
    else if (c.type === 'trade') pushSubscribe(c.feed, c.rebalance, c.source);
    else pushSubscribe(c.feed, `${c.ticker} ${c.side} — ${c.quote.slice(0, 72)}…`, c.source);
  }, [pushSubscribe]);

  const connectIm = useCallback((imId: string) => {
    setImLinks((prev) => ({ ...prev, [imId]: true }));
    setImActive((prev) => prev ?? imId);
    const im = IMS.find((i) => i.id === imId);
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

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      {/* Agent Header — Figma 7885:108604 */}
      <div className="flex shrink-0 items-center gap-[12px] px-[28px] py-[16px]">
        <AlvaPortrait />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva Agent</p>
          <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            Your always-on investing co-pilot — turn any idea into a live playbook.
          </p>
        </div>
        {/* IM Select — Figma 7887:111979:hug 宽 gap-4 px-12 py-6,尾部 6px 状态点;未连接态(7904:195614)为主色实心 Connect;点击都打开连接 modal */}
        {activeIm ? (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02)]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
            onClick={() => setImModalOpen(true)}
          >
            <img src={`${base}${activeIm.logo}`} alt="" className="size-[16px] shrink-0 rounded-full" />
            <span className="whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {activeIm.label}
            </span>
            <span className="size-[6px] shrink-0 rounded-full" style={{ background: 'var(--main-m3, #2a9b7d)' }} />
          </button>
        ) : (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-none px-[12px] py-[6px] transition-opacity hover:opacity-90"
            style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}
            onClick={() => setImModalOpen(true)}
          >
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white">
              Connect
            </span>
          </button>
        )}
        <button
          className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02)]"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
          aria-label="Agent settings"
          onClick={() => onNavigate('alva-agent')}
        >
          <CdnIcon name="settings-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>

      {/* Tab — Figma 7885:108611:icon 16 + 14px,active Medium + b-2 m1 */}
      <div className="flex shrink-0 items-start gap-[16px] px-[28px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              className="mb-[-1px] flex cursor-pointer items-center gap-[4px] bg-transparent px-0 pb-[6px]"
              style={{ border: 'none', borderBottom: active ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent' }}
              onClick={() => setTab(t.id)}
            >
              <CdnIcon name={t.icon} size={16} color={active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))'} />
              <span
                className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]"
                style={{ fontFamily: FONT, color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))', fontWeight: active ? 500 : 400 }}
              >
                {t.label}
                {t.count != null && <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontWeight: 400 }}> ({t.count})</span>}
              </span>
            </button>
          );
        })}
      </div>

      {tab === 'chat' ? (
        <>
          <div ref={stageRef} className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[28px] pb-[60px] pt-[28px]">
              <MsgIn>
              <AgentMsg>
                <div>
                  <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Hi. I am Alva</p>
                  <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                    Describe an investing idea in plain English and I'll turn it into a live playbook — a screener, a thesis, a backtest, or a tracker that keeps working after you close the tab.
                  </p>
                </div>
              </AgentMsg>
              </MsgIn>

              <MsgIn delay={600}>
              <AgentMsg>
                <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  Pick a skill — build your own, or subscribe to a ready-made one:
                </p>
                <div className="flex flex-wrap gap-[12px]">
                  {CHIP_ORDER.map((c) => {
                    if (c.type === 'skill') {
                      const s = SKILLS.find((x) => x.id === c.id);
                      if (!s) return null;
                      return (
                        <SkillChip
                          key={s.id}
                          icon={s.icon}
                          label={s.label}
                          active={openSkill === s.id}
                          onClick={() => setOpenSkill(openSkill === s.id ? null : s.id)}
                        />
                      );
                    }
                    const k = KOL_SKILLS.find((x) => x.id === c.id);
                    if (!k) return null;
                    return (
                      <SkillChip
                        key={k.id}
                        avatar={<img src={`${import.meta.env.BASE_URL}avatars/${k.avatarSrc}`} alt="" className="size-[22px] shrink-0 rounded-full object-cover" />}
                        label={k.label}
                        active={openSkill === k.id}
                        onClick={() => setOpenSkill(openSkill === k.id ? null : k.id)}
                      />
                    );
                  })}
                  {/* More — 与 NewChat 一致:打开全量 skills 浮层(open 态浅 teal,同 NewChat More pill) */}
                  <SkillChip
                    label="More"
                    active={moreActive}
                    trailing={<CdnIcon name="arrow-right-l2" size={14} color={moreActive ? '#fff' : 'var(--text-n9, rgba(0,0,0,0.9))'} />}
                    style={skillsLibOpen && !moreActive ? { background: '#f3f8f8', border: '0.5px solid rgba(73,163,166,0.45)' } : undefined}
                    onClick={() => setSkillsLibOpen(true)}
                  />
                </div>
                {opened && (
                  /* Playbook/Card List — Figma 7901:112730:gap 16 / pt 12;卡宽随容器 3:3:1(见 SkillPreviewCard.CARD_W) */
                  <CardRowFade key={opened.id}>
                    {opened.cards.map((c) => (
                      <SkillPreviewCard
                        key={previewCardKey(c)}
                        card={c}
                        subscribed={!!subscribed[previewCardKey(c)]}
                        onSubscribe={() => onSubscribeCard(c)}
                        onRemix={c.type === 'playbook'
                          ? () => respond(`Build my own version of ${c.title} — keep the idea, let me tweak the basket and rules`, opened.kind, `Build: ${c.title} (remix)`)
                          : undefined}
                        onOpen={c.type === 'playbook' ? () => onNavigate('screener') : () => setActiveFeed(toPushCardData(c))}
                      />
                    ))}
                  </CardRowFade>
                )}
              </AgentMsg>
              </MsgIn>

              <MsgIn delay={1200}>
              <AgentMsg>
                <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  {openedLabel ? <>Or build your own <span style={{ fontWeight: 500 }}>{openedLabel}</span> — try one of these:</> : 'Or try one of these:'}
                </p>
                {/* Prompt Suggestions — Figma 7885:111793:单容器,行间分隔线 */}
                <div className="flex w-full flex-col overflow-hidden rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                  {promptList.map((t, i, arr) => (
                    <button
                      key={t}
                      className="flex w-full cursor-pointer items-center gap-[8px] bg-transparent px-[16px] py-[13px] text-left transition-colors hover:bg-[var(--b-r02)]"
                      style={{ border: 'none', borderBottom: i < arr.length - 1 ? '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' : 'none' }}
                      onClick={() => {
                        if (sel) respond(t, sel.kind, `${sel.kind === 'automation' ? 'Automation' : 'Build'}: ${sel.label}`);
                        else if (selKol) respond(t, selKol.kind, `${selKol.kind === 'automation' ? 'Automation' : 'Build'}: ${selKol.label}`);
                        else onPrompt(t);
                      }}
                    >
                      <span className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{t}</span>
                      <CdnIcon name="enter-l" size={16} color="var(--text-n5, rgba(0,0,0,0.5))" />
                    </button>
                  ))}
                </div>
              </AgentMsg>
              </MsgIn>

              {extra.map((m) => {
                if (m.role === 'user') return <MsgIn key={m.id}><UserMsg text={m.text} /></MsgIn>;
                if (m.role === 'typing') return <MsgIn key={m.id}><AgentMsg time="now"><TypingDots /></AgentMsg></MsgIn>;
                if (m.role === 'answer') {
                  return (
                    <MsgIn key={m.id}>
                    <AgentMsg time="now">
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.text}</p>
                    </AgentMsg>
                    </MsgIn>
                  );
                }
                if (m.role === 'subpush') {
                  return (
                    <MsgIn key={m.id}>
                    <AgentMsg pushed time="now">
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
                    </AgentMsg>
                    </MsgIn>
                  );
                }
                if (m.role === 'task') {
                  const done = m.state === 'done';
                  const isAuto = m.kind === 'automation';
                  return (
                    <MsgIn key={m.id}>
                    <AgentMsg time="now">
                      <div className="flex w-full flex-col gap-[6px] rounded-[8px] px-[12px] py-[10px]" style={{ border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
                        <div className="flex items-center gap-[8px]">
                          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px]" style={{ background: isAuto ? TONE_BG.amber : TONE_BG.teal, color: isAuto ? TONE_FG.amber : TONE_FG.teal }}>
                            <Ic size={12}>{isAuto ? P.automation : P.target}</Ic>
                          </span>
                          <p className="min-w-0 flex-1 truncate text-[13px] font-medium leading-[20px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.title}</p>
                          <StatusPill state={m.state} />
                        </div>
                        <p className="text-[12px] leading-[18px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                          {done
                            ? (isAuto ? 'Live — pushes will land here. ' : 'Built and live — saved to Artifacts. ')
                            : "Background task — I'll post here when it's done. "}
                          <button className="cursor-pointer border-none bg-transparent p-0 text-[12px] underline" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }} onClick={() => setTab(done ? 'artifacts' : 'tasks')}>
                            {done ? 'View in Artifacts' : 'Track it in Tasks'}
                          </button>
                        </p>
                      </div>
                    </AgentMsg>
                    </MsgIn>
                  );
                }
                /* imrec — 任务跑完后的一次性连接软推荐(解耦的核心交互)*/
                return (
                  <MsgIn key={m.id}>
                  <AgentMsg time="now">
                    <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      One more thing — this agent only lives on the Web right now. Connect Telegram or Discord and every push lands in your DM the moment it fires.
                    </p>
                    <div className="flex flex-wrap gap-[8px]">
                      <button
                        className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]"
                        style={{ fontFamily: FONT, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                        onClick={() => setImModalOpen(true)}
                      >
                        <img src={`${base}logo-social-telegram.svg`} alt="" className="size-[15px] rounded-full" />
                        Connect Telegram
                      </button>
                      <button
                        className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02)]"
                        style={{ fontFamily: FONT, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                        onClick={() => setImModalOpen(true)}
                      >
                        <Ic size={14}>{P.link}</Ic>
                        See all IMs
                      </button>
                    </div>
                  </AgentMsg>
                  </MsgIn>
                );
              })}
            </div>
          </div>

          <div className="shrink-0 px-[28px] pb-[28px]">
            <div className="mx-auto w-full max-w-[960px]">
              <ChatInput shadow allowReferences={false} hideInspector placeholder="Ask Alva anything. @ for context, / for skills" onSend={onPrompt} />
            </div>
          </div>
        </>
      ) : tab === 'tasks' ? (
        <AgentTasksPanel />
      ) : tab === 'memory' ? (
        <AgentMemory />
      ) : tab === 'alerts' ? (
        <AgentAlertsPanel />
      ) : tab === 'artifacts' ? (
        <AgentArtifactsPanel />
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

      {imModalOpen && (
        <ConnectAppsModal
          rows={IMS.map((im) => ({ id: im.id, name: im.label, sub: im.sub, handle: im.handle, logo: `${base}${im.logo}` }))}
          connectedIds={IMS.filter((im) => imLinks[im.id]).map((im) => im.id)}
          activeId={imActive}
          onClose={() => setImModalOpen(false)}
          onConnect={connectIm}
          onDisconnect={disconnectIm}
          onSetActive={setImActive}
        />
      )}

      {skillsLibOpen && (
        <SkillsLibraryPanel
          skills={ALL_LIBRARY_SKILLS}
          selectedId={openSkill}
          onSelect={(id) => {
            setOpenSkill(openSkill === id ? null : id);
            setSkillsLibOpen(false);
          }}
          onClose={() => setSkillsLibOpen(false)}
        />
      )}

      {/* 推送类预览卡点击 → feed 详情(同 NewChat 推荐区口径) */}
      <FeedDetailModal
        open={!!activeFeed}
        onClose={() => setActiveFeed(null)}
        feedName={activeFeed?.feedName ?? ''}
        alerts={activeFeed ? [activeFeed] : undefined}
        description="This automation runs on a fixed schedule and publishes new results to its subscribers. Each run pulls the latest data, applies the feed's logic, and writes a signal that powers the cards and alerts above. Open Settings → Automations to view full run logs and manage it."
      />
    </div>
  );
}
