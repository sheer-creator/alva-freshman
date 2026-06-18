/**
 * [INPUT]: Figma Page/Agent/Chat(8111:9397 / 8160:82896 / 8166:84016) — Build your watchlist 渐进流
 * [OUTPUT]: Agent 页 empty 态 — Header + 5 tab + daily-digest watchlist builder 开场 + composer
 *           Generate digest → 跑 automation 任务流并推首条 digest;聊天与 IM 解耦
 * [POS]: pages/AgentDesign.tsx 统一渲染本组件
 */

import { useCallback, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AgentMemory } from '@/app/components/agent/AgentMemory';
import { AgentTasksPanel, AGENT_TASKS } from '@/app/components/agent/AgentTasksPanel';
import { AgentArtifactsPanel, AGENT_ARTIFACTS } from '@/app/components/agent/AgentArtifactsPanel';
import { AgentAlertsPanel, AGENT_ALERTS } from '@/app/components/agent/AgentAlertsPanel';
import { ConnectAppsModal } from '@/app/components/shared/ConnectAppsModal';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { WatchlistBuilder, type DigestPayload } from '@/app/components/agent/WatchlistBuilder';

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
  const [extra, setExtra] = useState<ExtraMsg[]>([]);
  const [imLinks, setImLinks] = useState<Record<string, boolean>>({ telegram: true });
  /* 谁接收 IM 推送 — 单 active channel,绑定/解绑随动(spec: 解绑 active 回退最早绑定) */
  const [imActive, setImActive] = useState<string | null>('telegram');
  const [imModalOpen, setImModalOpen] = useState(false);
  /* digest builder 是否已提交（提交后卡片折叠为确认条） */
  const [digestSubmitted, setDigestSubmitted] = useState(false);
  const idRef = useRef(0);
  const imRecShownRef = useRef(false);
  const imLinksRef = useRef(imLinks);
  imLinksRef.current = imLinks;
  const stageRef = useRef<HTMLDivElement>(null);

  const activeIm = imActive ? IMS.find((i) => i.id === imActive) ?? null : null;

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

  /* Generate digest → 跑 automation 任务流，跑完推首条 daily digest（复用 task / subpush 机制）*/
  const onGenerateDigest = useCallback((p: DigestPayload) => {
    setTab('chat');
    setDigestSubmitted(true);
    const typingId = ++idRef.current;
    setExtra((prev) => [...prev, { id: typingId, role: 'typing' }]);
    scrollToEnd();
    setTimeout(() => {
      const taskId = ++idRef.current;
      setExtra((prev) => prev.filter((m) => m.id !== typingId).concat({ id: taskId, role: 'task', title: `Daily Digest · ${p.count} tickers`, kind: 'automation', state: 'running' }));
      scrollToEnd();
      setTimeout(() => {
        setExtra((prev) => prev.map((m) => (m.id === taskId && m.role === 'task' ? { ...m, state: 'done' } : m)));
        const lead = p.tickers.slice(0, 3).join(', ') || 'your watchlist';
        const more = p.tickers.length > 3 ? ` +${p.tickers.length - 3} more` : '';
        pushSubscribe(
          'Daily Digest',
          `Tomorrow ${p.alertTime}: first brief on ${lead}${more} — overnight catalysts, biggest movers, and what changed.`,
          `Daily Digest · ${p.alertTime}`,
        );
        if (!Object.values(imLinksRef.current).some(Boolean) && !imRecShownRef.current) {
          imRecShownRef.current = true;
          setTimeout(() => {
            setExtra((prev) => [...prev, { id: ++idRef.current, role: 'imrec' }]);
            scrollToEnd();
          }, 1600);
        }
      }, 4200);
    }, 900);
  }, [scrollToEnd, pushSubscribe]);

  const onEditDigest = useCallback(() => setDigestSubmitted(false), []);

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
          className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-transparent transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
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
                  <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Set up your daily digest</p>
                  <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                    Tell me what to watch — connect a portfolio to auto-fill from your holdings, tap a starter basket, or pick tickers by hand. Every morning I'll push the catalysts that move them, right here.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Build your watchlist</p>
                  <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                    Pick what Alva tracks — by asset, region, or name. Connect a portfolio to auto-fill from your holdings.
                  </p>
                </div>
                <WatchlistBuilder submitted={digestSubmitted} onGenerate={onGenerateDigest} onEdit={onEditDigest} />
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

          {/* Onboard 态（digest 未生成）无底部输入框，对齐 Figma；生成后进入会话才出现 composer */}
          {digestSubmitted && (
            <div className="shrink-0 px-[28px] pb-[28px]">
              <div className="mx-auto w-full max-w-[960px]">
                <ChatInput shadow allowReferences={false} hideInspector placeholder="Ask Alva anything. @ for context, / for skills" onSend={onPrompt} />
              </div>
            </div>
          )}
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
    </div>
  );
}
