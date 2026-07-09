/**
 * [INPUT]: Figma Page/Agent/Chat(8111:9397 / 8160:82896 / 8166:84016) — Build your watchlist 渐进流
 * [OUTPUT]: Agent 页 empty 态 — Header + 5 tab + onboard 引导卡开场（不随连接切换）+ 常显 composer
 *           聊天与 IM 解耦；连接 IM 仅点亮 Tasks/Files + 推 Connected 消息
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
import { ChatInput } from '@/app/components/shared/ChatInput';
import { PortfolioBuilder } from '@/app/components/agent/PortfolioBuilder';
import { AlphaRadarBuilder, type AlphaRadarSummary } from '@/app/components/agent/AlphaRadarBuilder';

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
};

/* Onboard Card/Default — Figma 9428:49614:未连接态 3 条引导,点击直接发起对应 automation 流 */
interface OnboardCard { id: string; emoji: string; title: string; desc: string; prompt: string; taskTitle: string }

const ONBOARD_CARDS: OnboardCard[] = [
  {
    id: 'portfolio-digest',
    emoji: '💼',
    title: 'Watch your portfolio 24/7',
    desc: "Tell me what you hold. I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.",
    prompt: "Watch my portfolio 24/7 — tell me what you hold and I'll flag the moves, risks, and catalysts worth your attention",
    taskTitle: 'Automation: Portfolio Watch',
  },
  {
    id: 'fintwit-digest',
    emoji: '📣',
    title: 'Track FinTwit for alpha signals',
    desc: "I'll scan X posts, filter out the noise, and send you a daily digest on alpha signals, conviction shifts, and debates that matter.",
    prompt: 'Track FinTwit for alpha signals — scan X, filter the noise, and send me a daily digest',
    taskTitle: 'Automation: FinTwit Digest',
  },
  {
    id: 'custom-automation',
    emoji: '⚙️',
    title: 'Build your own automations',
    desc: "Describe any rule in plain English — a price trigger, a screener, a scheduled digest — and I'll run it for you and push every result here.",
    prompt: 'Help me build my own automation — I want to describe a rule and have you run it on a schedule',
    taskTitle: 'Automation: Custom',
  },
];

interface ImEntry { id: string; label: string; logo: string; handle: string; sub: string }

const IMS: ImEntry[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-social-telegram.svg', handle: '@yggyll_tg', sub: 'Bot DM — instant pushes' },
  { id: 'discord', label: 'Discord', logo: 'logo-social-discord.svg', handle: 'yggyll#0882', sub: 'Bot DM — switch channels with /channel' },
  { id: 'whatsapp', label: "WhatsApp", logo: 'logo-social-whatsapp.svg', handle: '+1 ··· 4821', sub: 'Business account DM' },
  { id: 'slack', label: 'Slack', logo: 'logo-social-slack.svg', handle: '@yggyll · alva-hq', sub: 'Alva app in your workspace' },
];

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

function AgentMsg({ pushed, time = 'Thursday 7:22 PM', portrait, name = 'Alva', children }: { pushed?: boolean; time?: string; portrait?: React.ReactNode; name?: string; children: React.ReactNode }) {
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

/* ========== 互动消息流(respond 模拟)========== */

type ExtraMsg =
  | { id: number; role: 'user'; text: string }
  | { id: number; role: 'typing' }
  | { id: number; role: 'task'; title: string; kind: 'playbook' | 'automation'; state: 'running' | 'done' }
  | { id: number; role: 'imrec' }
  | { id: number; role: 'subpush'; title: string; push?: string; automation: string }
  | { id: number; role: 'answer'; text: string }
  /* Start Watching 的 Alva 确认回复:正文 + (未连接时)内嵌「选择推送渠道」卡片(Figma 8341:126245) */
  | { id: number; role: 'watchreply'; text: string };

/* ========== 主组件 ========== */

export function AgentNewSession({ onNavigate, channel }: { onNavigate: (page: Page) => void; channel?: { id: string; name: string; description?: string } | null }) {
  const base = import.meta.env.BASE_URL;
  const [tab, setTab] = useState('chat');
  const [extra, setExtra] = useState<ExtraMsg[]>([]);
  const [imLinks, setImLinks] = useState<Record<string, boolean>>({});
  /* 谁接收 IM 推送 — 单 active channel,绑定/解绑随动(spec: 解绑 active 回退最早绑定) */
  const [imActive, setImActive] = useState<string | null>(null);
  const [imModalOpen, setImModalOpen] = useState(false);
  /* 会话是否已开始（Start Watching / 发过 prompt）：true 则收起 onboard 空态，进入真实对话 */
  const [started, setStarted] = useState(false);
  /* 会话产出的 alert（Start Watching 建一条 portfolio watch）→ 驱动 Alerts tab 计数 + 面板 */
  const [sessionAlerts, setSessionAlerts] = useState<AgentAlert[]>([]);
  /* Onboard「Watch your portfolio 24/7」→ 进入 portfolio builder 视图（无 composer） */
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  /* Onboard「Track FinTwit for alpha signals」→ 进入 Alpha Radar builder 视图（无 composer） */
  const [alphaRadarOpen, setAlphaRadarOpen] = useState(false);
  /* 打开独立 builder 时压一条 history，浏览器返回即收起视图回到 onboard（不改 hash，不切页） */
  useEffect(() => {
    if (!portfolioOpen) return;
    window.history.pushState({ portfolioOpen: true }, '');
    const onPop = () => setPortfolioOpen(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [portfolioOpen]);
  useEffect(() => {
    if (!alphaRadarOpen) return;
    window.history.pushState({ alphaRadarOpen: true }, '');
    const onPop = () => setAlphaRadarOpen(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [alphaRadarOpen]);
  const idRef = useRef(0);
  const imRecShownRef = useRef(false);
  const imLinksRef = useRef(imLinks);
  imLinksRef.current = imLinks;
  const stageRef = useRef<HTMLDivElement>(null);

  const activeIm = imActive ? IMS.find((i) => i.id === imActive) ?? null : null;
  /* 是否连过 IM（驱动 imrec 软推荐是否出现 + Tasks/Files 是否点亮）；不再影响开场 onboard 视图 */
  const connected = Object.values(imLinks).some(Boolean);

  /* 切换频道（含默认 Alva Agent）时，视图与会话产出回到该频道的空态 onboard；
     连接状态(imLinks/imActive)刻意不重置——右上角连接态在所有频道间与 Alva Agent 同步 */
  useEffect(() => {
    setTab('chat');
    setPortfolioOpen(false);
    setAlphaRadarOpen(false);
    setExtra([]);
    setSessionAlerts([]);
    setStarted(false);
    imRecShownRef.current = false;
  }, [channel?.id]);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      stageRef.current?.scrollTo({ top: stageRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  /* 任务流:user → typing → task running → done;完成后若未连 IM,一次性软推荐 */
  const respond = useCallback((userText: string, kind: 'playbook' | 'automation', title: string) => {
    setTab('chat');
    const userId = ++idRef.current;
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: userId, role: 'user', text: userText }, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      const taskId = ++idRef.current;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: taskId, role: 'task', title, kind, state: 'running' }));
      scrollToEnd();
      setTimeout(() => {
        setExtra((prev) => prev.map((m) => (m.id === taskId && m.role === 'task' ? { ...m, state: 'done' } : m)));
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
    setStarted(true);
    const kind: 'playbook' | 'automation' = /screen|alert|monitor|watch|what if/i.test(text) ? 'automation' : 'playbook';
    respond(text, kind, kind === 'automation' ? 'Automation: Smart Screener' : `Build: ${text.slice(0, 42)}…`);
  }, [respond]);

  /* 订阅:即时生效,Alva 立刻推首条 run(价值先行,不要求连接)*/
  const pushSubscribe = useCallback((title: string, push: string | undefined, automation: string) => {
    setTab('chat');
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      const pushId = ++idRef.current;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: pushId, role: 'subpush', title, push, automation }));
      scrollToEnd();
    }, 700);
  }, [scrollToEnd]);


  /* Start Watching → 收起 builder + onboard 空态 → 一条 Alva 确认回复(内嵌「选择推送渠道」卡片,未连接才显示),无用户气泡 */
  const onStartWatching = useCallback((_picks: { symbol: string; qty: string }[]) => {
    window.history.back();
    setStarted(true);
    /* mock 成 Figma 8341:126009 的 populated 列表:整套 AGENT_ALERTS(首项即 playbook 分组)+ 末尾追加本次新建的 portfolio watch */
    setSessionAlerts((prev) => (prev.length ? prev : [...AGENT_ALERTS, PORTFOLIO_WATCH_ALERT]));
    setTab('chat');
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({
        id: ++idRef.current,
        role: 'watchreply',
        text: "All set. I'm on watch now. I'll check for breaking news, macro/rate shifts, analyst changes, unusual price or volume moves, and important technical setups across your holdings. I'll only message when something looks worth your attention — share your thesis, key risks, or levels you care about and I'll watch the portfolio through that lens.",
      }));
      scrollToEnd();
    }, 900);
  }, [scrollToEnd]);

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
     连接任一 social 后，Tasks / Files 变非空（mock 产出）；Alerts 仍只由 sessionAlerts 驱动。 */
  const populated = false;
  const tabCounts: Record<string, number> = {
    tasks: connected ? AGENT_TASKS.length : 0,
    alerts: sessionAlerts.length || (populated ? AGENT_ALERTS.length : 0),
    artifacts: connected ? AGENT_ARTIFACTS.length : 0,
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
      {/* Agent Header — Figma 7885:108604；频道态：# 头像 + 频道名 + (有描述才显示描述行) */}
      <div className="flex shrink-0 items-center gap-[12px] px-[28px] py-[16px]">
        {channel ? <ChannelPortrait /> : <AlvaPortrait />}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {channel ? channel.name : 'Alva'}
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
        {/* IM Select — Figma 7887:111979:hug 宽 gap-4 px-12 py-6,尾部 6px 状态点;未连接态(7904:195614)为主色实心 Connect;点击都打开连接 modal */}
        {activeIm ? (
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[6px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
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
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-none px-[12px] py-[6px] transition-opacity hover:opacity-90"
            style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}
            onClick={() => setImModalOpen(true)}
          >
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white">
              Connect Your IM
            </span>
            {/* stacked IM logos — Figma 31041:15488/89/90:16px 圆形,白描边,-8px 叠压,telegram 在前 */}
            <span className="flex shrink-0 items-center">
              <img src={`${base}logo-social-telegram.svg`} alt="" className="relative z-[3] size-[16px] rounded-full border-[0.5px] border-white" />
              <img src={`${base}logo-social-discord.svg`} alt="" className="relative z-[2] -ml-[8px] size-[16px] rounded-full border-[0.5px] border-white" />
              <img src={`${base}logo-social-slack.svg`} alt="" className="relative z-[1] -ml-[8px] size-[16px] rounded-full border-[0.5px] border-white bg-white" />
            </span>
          </button>
        )}
        <button
          className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
          aria-label="Agent settings"
          onClick={() => onNavigate('alva-agent')}
        >
          <CdnIcon name="settings-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      </div>

      {/* Tab — Figma 7885:108611:icon 16 + 14px,active Medium + b-2 m1 */}
      <div className="flex shrink-0 items-start gap-[16px] px-[28px]" style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              className="mb-[-1px] flex cursor-pointer items-center gap-[4px] bg-transparent px-0 pb-[6px]"
              style={{ border: 'none', borderBottom: active ? '2px solid var(--main-m1, #49A3A6)' : '2px solid transparent' }}
              onClick={() => {
                setTab(t.id);
                // 点 Chat 从 portfolio 独立流程回到默认引导（走 history.back 消费掉进入时压的记录，保持浏览器返回语义）
                if (t.id === 'chat' && portfolioOpen) window.history.back();
                if (t.id === 'chat' && alphaRadarOpen) window.history.back();
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

      {tab === 'chat' ? (
        portfolioOpen ? (
          /* Watch your portfolio 24/7 — 建仓向导视图（无 composer，可返回上一步） */
          <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[28px] pb-[60px] pt-[28px]">
              <MsgIn>
                <AgentMsg time="" portrait={channel ? <ChannelPortrait size={22} /> : undefined} name={channel ? channel.name : undefined}>
                  <div>
                    <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Hey, tell me what you hold and I'll help watch your portfolio 24/7.</p>
                    <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.
                    </p>
                  </div>
                  <PortfolioBuilder onStart={onStartWatching} />
                </AgentMsg>
              </MsgIn>
            </div>
          </div>
        ) : alphaRadarOpen ? (
          /* Track FinTwit for alpha signals — Alpha Radar setup 视图（无 composer，可返回上一步） */
          <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
            <style>{MSG_IN_CSS}</style>
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[28px] pb-[60px] pt-[28px]">
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
            <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[28px] pb-[60px] pt-[28px]">
              {/* 会话未开始才显示 onboard 空态;Start Watching / 发消息后收起,进入真实对话 */}
              {/* 开场恒为 onboard 引导（不随连接切换），只要未创建过（!started）就一直显示 */}
              {!started && (
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
                        if (c.id === 'portfolio-digest') setPortfolioOpen(true);
                        if (c.id === 'fintwit-digest') setAlphaRadarOpen(true);
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
                /* watchreply — Start Watching 的确认回复:正文 + 未连接时内嵌「选择推送渠道」卡片(连接后反应式隐藏) */
                if (m.role === 'watchreply') {
                  return (
                    <MsgIn key={m.id}>
                    <AgentMsg time="now">
                      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{m.text}</p>
                      {!connected && (
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
                                onClick={() => connectIm(ch.id)}
                                className="flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[6px] border-none px-[20px] py-[9px] transition-opacity hover:opacity-90"
                                style={{ background: ch.bg }}
                              >
                                <img src={`${base}${ch.logo}`} alt="" className="size-[18px] shrink-0" />
                                <span className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-[0.14px] text-white" style={{ fontFamily: FONT }}>{ch.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
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
                        className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
                        style={{ fontFamily: FONT, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
                        onClick={() => setImModalOpen(true)}
                      >
                        <img src={`${base}logo-social-telegram.svg`} alt="" className="size-[15px] rounded-full" />
                        Connect Telegram
                      </button>
                      <button
                        className="flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full bg-white px-[12px] text-[13px] leading-[20px] tracking-[0.13px] transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
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

          {/* composer 常显：onboard / 已开始对话都可继续聊天 */}
          <div className="shrink-0 px-[28px] pb-[28px]">
            <div className="mx-auto w-full max-w-[960px]">
              <ChatInput shadow shadowSize="xs" subtleBorder allowReferences={false} hideInspector placeholder="Ask Alva anything. @ for context, / for skills" onSend={onPrompt} />
            </div>
          </div>
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
            getStarted={[
              { id: 'gs-portfolio', emoji: '💼', title: 'Watch your portfolio 24/7', desc: "Tell me what you hold. I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention.", onClick: () => { setTab('chat'); setPortfolioOpen(true); } },
              { id: 'gs-automations', emoji: '⚙️', title: 'Build your own automations', desc: 'Track the tickers you care about and get updates when price moves, news, or catalysts are worth attention.', onClick: () => setTab('chat') },
            ]}
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
