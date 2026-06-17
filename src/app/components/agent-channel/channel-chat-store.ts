/**
 * [INPUT]: chat-routes 的 routeReply、tasks.ts 的 TASKS/taskAck、channel-meta 的 IM_LINKS/IM_REC_SHOWN/IMS
 * [OUTPUT]: 频道聊天的全局单例 store — extra/tasks/taskThreads + 全部聊天 actions
 * [POS]: agent-channel — 频道页与右侧 Ask 面板共享的同一份会话内容（useSyncExternalStore）
 *
 * 模块级状态：跨页面切换存活（持久频道语义），刷新即重置（与 demo 一致）。
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useSyncExternalStore } from 'react';
import { AUTOMATIONS } from '@/data/agent-channel/artifacts';
import { IMS, IM_LINKS, IM_REC_SHOWN } from '@/data/agent-channel/channel-meta';
import { routeReply } from '@/data/agent-channel/chat-routes';
import { TASKS, taskAck } from '@/data/agent-channel/tasks';
import type { AutomationDraft } from '@/app/components/agent-channel/modals/AutomationModal';
import type { Automation, ExtraMsg, ImId, PortfolioAuto, PortfolioHolding, Reply, Skill, SubpushItem, Task, TaskThreadMsg } from '@/data/agent-channel/types';

export type TaskReply = Extract<Reply, { kind: 'task' }>;

/* ========== 状态与订阅 ========== */

export interface ChannelChatState {
  extra: ExtraMsg[];
  tasks: Task[];
  taskThreads: Record<string, TaskThreadMsg[]>;
  autos: Automation[];
}

let state: ChannelChatState = { extra: [], tasks: TASKS, taskThreads: {}, autos: AUTOMATIONS };
let nextId = 0;
const listeners = new Set<() => void>();

function setState(patch: Partial<ChannelChatState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useChannelChatStore(): ChannelChatState {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => { listeners.delete(l); }; },
    () => state,
  );
}

/* ========== 聊天 actions（源自 demo planc 3758-3817/3845-3853 行） ========== */

export function respond(userText: string, reply: Reply, onActivity?: () => void) {
  onActivity?.();
  const uid = ++nextId;
  setState({ extra: [...state.extra, { id: uid, role: 'user', text: userText }, { id: uid + 0.5, role: 'typing' }] });
  setTimeout(() => {
    setState({ extra: state.extra.filter((m) => m.id !== uid + 0.5).concat({ id: uid + 0.6, role: 'agent', reply }) });
    // 每个后台任务都会到达终态；同一组定时器驱动聊天卡与 Tasks 列表
    if (reply.kind === 'task') {
      const taskId = `chat-${uid}`;
      setState({
        tasks: [{
          id: taskId,
          type: reply.taskType,
          tone: reply.tone,
          title: reply.title,
          status: 'running',
          meta: 'started just now',
          steps: reply.steps?.map((t, i) => ({ t, done: false, now: i === 0 })),
        }, ...state.tasks],
      });
      setTimeout(() => {
        setState({
          extra: state.extra.map((m) => (m.id === uid + 0.6 && m.reply?.kind === 'task' ? { ...m, reply: { ...m.reply, status: 'done' as const } } : m)),
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: 'done' as const, meta: 'completed just now', steps: undefined } : t)),
        });
        // 频道刚做了实事但没有 IM 连接 — 每会话推荐一次
        if (Object.keys(IM_LINKS).length === 0 && !IM_REC_SHOWN.current) {
          setTimeout(() => {
            if (Object.keys(IM_LINKS).length > 0 || IM_REC_SHOWN.current) return;
            IM_REC_SHOWN.current = true;
            setState({ extra: [...state.extra, { id: ++nextId, role: 'agent', reply: { kind: 'imrec' } }] });
          }, 1400);
        }
      }, 4500);
    }
  }, 1000);
}

export function onPrompt(text: string, onActivity?: () => void) {
  respond(text, routeReply(text), onActivity);
}

// 点击技能（或其建议 prompt / CTA）按 skill.kind 派生任务
export function onStartTask(skill: Skill, textOverride?: string, onActivity?: () => void) {
  const KIND = {
    automation: { type: 'Automation', tone: 'amber', title: `Automation: ${skill.label}`, sub: 'Wiring the alert rule and schedule. Once live, I’ll watch in the background and push here on a trigger.', steps: ['Define the alert rule', 'Set the schedule and delivery', 'Activate the watch'] },
    playbook: { type: 'Playbook', tone: 'teal', title: `Build: ${skill.label}`, sub: 'Building your playbook — pulling data, drafting the layout, and wiring its refresh. You can tweak it once it’s ready.', steps: ['Define scope and inputs', 'Pull data and build the view', 'Wire the refresh schedule'] },
  } as const;
  const k = KIND[skill.kind];
  respond(textOverride || skill.prompt, { kind: 'task', taskType: k.type, tone: k.tone, title: k.title, sub: k.sub, steps: [...k.steps] }, onActivity);
}

// 从 follow onboarding 启动 digest 自动化 — 像任何后台任务一样完成
export function onDigestAutomation(count: number, onActivity?: () => void) {
  respond(`Follow ${count} ${count === 1 ? 'voice' : 'voices'} and send me a daily AI digest`, {
    kind: 'task', taskType: 'Automation', tone: 'amber', title: 'Automation: KOL AI Digest',
    doneNote: `Live — following ${count} ${count === 1 ? 'voice' : 'voices'}, daily roundup 07:30 ET, pushed here + Telegram.`,
  }, onActivity);
}

// 一键订阅后，Alva 推送首条 run/alert 让对话继续向前
export function onSubscribed(skill: Skill, item: SubpushItem, onActivity?: () => void) {
  onActivity?.();
  const uid = ++nextId;
  setState({ extra: [...state.extra, { id: uid + 0.5, role: 'typing' }] });
  setTimeout(() => {
    setState({ extra: state.extra.filter((m) => m.id !== uid + 0.5).concat({ id: uid + 0.6, role: 'agent', reply: { kind: 'subpush', item, skillKind: skill.kind } }) });
  }, 700);
}

export function connectIm(imId: ImId) {
  IM_LINKS[imId] = true;
  const im = IMS.find((i) => i.id === imId);
  if (!im) { setState({}); return; }
  setState({ extra: [...state.extra, { id: ++nextId, role: 'agent', push: true, reply: { kind: 'answer', paras: [
    `Connected to ${im.label} — pushes from this channel now mirror to ${im.handle}. Reply there or here, it's the same conversation.`,
  ] } }] });
}

export function disconnectIm(imId: ImId) {
  delete IM_LINKS[imId];
  setState({}); // 空 patch 也广播 — IM_LINKS 是模块级，订阅者重渲染后读到新值
}

export function clearExtra() {
  setState({ extra: [] });
}

/* ========== Alerts（automation 列表，与 Alerts tab 共享） ========== */

export function saveAuto(existing: Automation | null, draft: AutomationDraft) {
  if (existing) {
    setState({ autos: state.autos.map((a) => (a.id === existing.id ? { ...a, ...draft } : a)) });
    return;
  }
  let id = 'ua-' + draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  while (state.autos.some((x) => x.id === id)) id += '-2';
  setState({ autos: [{ id, status: 'active', lastRun: '—', runs: 0, usedBy: [], ...draft }, ...state.autos] });
}

export function toggleAuto(a: Automation) {
  setState({ autos: state.autos.map((x) => (x.id === a.id ? { ...x, status: x.status === 'active' ? 'paused' : 'active' } : x)) });
}

/* ========== Portfolio Watch — 一次创建一组平行 alert ========== */

export function onPortfolioSetup(tickers: string[], autos: PortfolioAuto[], hasBroker: boolean, holdings: PortfolioHolding[], onActivity?: () => void) {
  onActivity?.();
  const uid = ++nextId;
  const nT = tickers.length;
  const label = `Set up my Portfolio Watch — ${nT} ${nT === 1 ? 'ticker' : 'tickers'} · ${autos.length} ${autos.length === 1 ? 'alert' : 'alerts'}`;
  const names = autos.map((a) => a.name).join(', ');
  const para = hasBroker
    ? `Done — your Portfolio Watch is live on ${nT} ${nT === 1 ? 'holding' : 'holdings'}. ${names} now running and pushing to this channel; I’ll weight every read by your position size. Here’s today’s brief:`
    : `Done — watching ${nT} ${nT === 1 ? 'ticker' : 'tickers'}. ${names} now running and pushing to this channel. Connect a brokerage any time to make it position-aware. Here’s today’s brief:`;

  // 首条产物：真正的晨间简报（连 broker 则 holdings 态带权重/盈亏）
  const briefReply: Reply = {
    kind: 'portfolio-brief',
    title: 'Your Morning Portfolio Brief',
    meta: `${holdings.length} ${hasBroker ? 'holdings' : 'names'} · pre-market · 07:30`,
    summary: hasBroker
      ? 'Book is steady pre-market. Largest positions in focus; the swing factors and catalysts for today are flagged per name below.'
      : 'Pre-market read across your watchlist — sentiment, catalysts, and what changes the thesis on each name today.',
    rows: holdings.slice(0, 6),
    holdings: hasBroker,
    badge: hasBroker ? 'Live portfolio' : 'Live · watchlist',
  };

  // 每个 automation：一条聊天 task 卡 + 一条 Alerts 条目
  const taskMsgs: ExtraMsg[] = autos.map((a, i) => ({
    id: uid + 0.61 + i * 0.01, role: 'agent',
    reply: { kind: 'task', taskType: 'Automation', tone: 'amber', title: a.name, sub: a.desc },
  }));
  const newAlerts: Automation[] = autos.map((a) => ({
    id: `pf-${uid}-${a.id}`, name: a.name, status: 'active', lastRun: '—', runEvery: a.cadence, runs: 0, usedBy: [],
  }));
  const newTasks: Task[] = autos.map((a) => ({
    id: `pf-${uid}-${a.id}`, type: 'Automation', tone: 'amber', title: a.name, status: 'running', meta: 'started just now',
    steps: [{ t: 'Wire the rule and watchlist', now: true }, { t: 'Backfill current state', done: false }, { t: 'Activate the push', done: false }],
  }));

  setState({ extra: [...state.extra, { id: uid, role: 'user', text: label }, { id: uid + 0.5, role: 'typing' }] });
  setTimeout(() => {
    setState({
      extra: state.extra.filter((m) => m.id !== uid + 0.5).concat(
        { id: uid + 0.6, role: 'agent', reply: { kind: 'answer', paras: [para] } },
        { id: uid + 0.605, role: 'agent', reply: briefReply },
        ...taskMsgs,
      ),
      tasks: [...newTasks, ...state.tasks],
      autos: [...newAlerts, ...state.autos],
    });
    // 4.5s 后整组转 Live
    setTimeout(() => {
      const ids = new Set(newTasks.map((t) => t.id));
      const msgIds = new Set(taskMsgs.map((m) => m.id));
      setState({
        extra: state.extra.map((m) => (msgIds.has(m.id) && m.reply?.kind === 'task' ? { ...m, reply: { ...m.reply, status: 'done' as const } } : m)),
        tasks: state.tasks.map((t) => (ids.has(t.id) ? { ...t, status: 'done' as const, meta: 'live just now', steps: undefined } : t)),
      });
    }, 4500);
  }, 1000);
}

/* ========== 任务内 mini thread ========== */

export function sendToTask(t: Task, text: string) {
  setState({ taskThreads: { ...state.taskThreads, [t.id]: [...(state.taskThreads[t.id] || []), { role: 'user', text }] } });
  setTimeout(() => {
    setState({ taskThreads: { ...state.taskThreads, [t.id]: [...(state.taskThreads[t.id] || []), { role: 'agent', text: taskAck(t) }] } });
  }, 900);
}
