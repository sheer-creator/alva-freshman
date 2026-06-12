/**
 * [INPUT]: AppShell、agent-channel 组件群、channel-meta 数据
 * [OUTPUT]: AgentChannel 页面 — Plan C 单频道工作台（默认首页，hash 路由 #agent）
 * [POS]: pages 层 — Alva Agent Channel 的状态根（concept/tab ↔ hash 参数）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChannelComposer } from '@/app/components/agent-channel/ChannelComposer';
import { ChannelTabBar } from '@/app/components/agent-channel/ChannelTabBar';
import { ChannelTopbar } from '@/app/components/agent-channel/ChannelTopbar';
import { ConceptA } from '@/app/components/agent-channel/ConceptA';
import { CONCEPT_R_QUICK_REPLIES, ConceptR } from '@/app/components/agent-channel/ConceptR';
import { ExtraThread } from '@/app/components/agent-channel/ExtraThread';
import { KolDigestView } from '@/app/components/agent-channel/kol/KolDigestView';
import { ImConnectModal } from '@/app/components/agent-channel/modals/ImConnectModal';
import { MembersModal } from '@/app/components/agent-channel/modals/MembersModal';
import { AlertsPanel } from '@/app/components/agent-channel/tabs/AlertsPanel';
import { FilesPanel } from '@/app/components/agent-channel/tabs/FilesPanel';
import { MemoryPanel } from '@/app/components/agent-channel/tabs/MemoryPanel';
import { TasksPanel } from '@/app/components/agent-channel/tabs/TasksPanel';
import { useChannelChat } from '@/app/components/agent-channel/useChannelChat';
import type { AutomationDraft } from '@/app/components/agent-channel/modals/AutomationModal';
import { ARTIFACTS, AUTOMATIONS } from '@/data/agent-channel/artifacts';
import { CONCEPTS } from '@/data/agent-channel/channel-meta';
import type { Automation, ConceptId, ImId, TabId } from '@/data/agent-channel/types';
import '@/styles/agent-channel.css';

/* ========== hash 参数（#agent?concept=K&tab=alerts） ========== */

const CONCEPT_IDS = CONCEPTS.map((c) => c.id);
const TAB_IDS: TabId[] = ['chat', 'tasks', 'memory', 'alerts', 'files'];

interface ChannelParams {
  concept: ConceptId;
  tab: TabId;
}

function oneOf<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** 仅当 hash 仍停留在 agent 页时返回参数，否则 null（页面即将卸载，不要回写状态） */
function readHashParams(): ChannelParams | null {
  const [base, qs] = window.location.hash.slice(1).split('?');
  if (base !== 'agent') return null;
  const q = new URLSearchParams(qs ?? '');
  return {
    concept: oneOf(q.get('concept'), CONCEPT_IDS, 'A'),
    tab: oneOf(q.get('tab'), TAB_IDS, 'chat'),
  };
}

function writeHashParams({ concept, tab }: ChannelParams) {
  const q = new URLSearchParams();
  if (concept !== 'A') q.set('concept', concept);
  if (tab !== 'chat') q.set('tab', tab);
  const qs = q.toString();
  // replaceState 不触发 hashchange，避免惊动 App 的路由监听与浏览历史
  history.replaceState(null, '', `#agent${qs ? `?${qs}` : ''}`);
}

/* ========== 页面 ========== */

interface AgentChannelProps {
  onNavigate: (page: Page) => void;
}

export default function AgentChannel({ onNavigate }: AgentChannelProps) {
  const init = useRef(readHashParams()).current;
  const [concept, setConcept] = useState<ConceptId>(init?.concept ?? 'A');
  const [tab, setTab] = useState<TabId>(init?.tab ?? 'chat');
  const stageRef = useRef<HTMLDivElement>(null);

  // Alerts 在页面层 — 新建/暂停即时反映到 badge（不突变模块数组）
  const [autos, setAutos] = useState<Automation[]>(AUTOMATIONS);
  const saveAuto = useCallback((existing: Automation | null, draft: AutomationDraft) => {
    if (existing) {
      setAutos((prev) => prev.map((a) => (a.id === existing.id ? { ...a, ...draft } : a)));
      return;
    }
    setAutos((prev) => {
      let id = 'ua-' + draft.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      while (prev.some((x) => x.id === id)) id += '-2';
      return [{ id, status: 'active', lastRun: '—', runs: 0, usedBy: [], ...draft }, ...prev];
    });
  }, []);
  const toggleAuto = useCallback((a: Automation) => {
    setAutos((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: x.status === 'active' ? 'paused' : 'active' } : x)));
  }, []);

  // 顶栏弹层：members / IM 连接（true = 列表，ImId = 直连该 IM）
  const [membersOpen, setMembersOpen] = useState(false);
  const [imOpen, setImOpen] = useState<boolean | ImId>(false);

  // 聊天内容在全局 store — 与右侧 Ask 面板共享同一份会话
  const chat = useChannelChat({ onActivity: useCallback(() => setTab('chat'), []) });
  const { extra, tasks, taskThreads, sendToTask, clearExtra } = chat;

  const goAlerts = useCallback(() => setTab('alerts'), []);
  const goFiles = useCallback(() => setTab('files'), []);
  const goTasks = useCallback(() => setTab('tasks'), []);

  // 切 concept 重置线程回到该入口的初始态（demo planc 3821 行）
  const switchConcept = useCallback((id: ConceptId) => {
    setConcept(id);
    setTab('chat');
    clearExtra();
  }, [clearExtra]);

  // 状态 → hash（深链可复制分享）
  useEffect(() => {
    writeHashParams({ concept, tab });
  }, [concept, tab]);

  // hash → 状态（浏览器前进/后退、外部深链）；读后比较，防 re-entrant 循环
  useEffect(() => {
    const onHashChange = () => {
      const p = readHashParams();
      if (!p) return;
      setConcept((v) => (v === p.concept ? v : p.concept));
      setTab((v) => (v === p.tab ? v : p.tab));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // 滚动行为：切 concept/tab 回顶部，新交互滚到底（demo planc 3750-3756 行）
  useEffect(() => {
    if (stageRef.current) stageRef.current.scrollTop = 0;
  }, [concept, tab]);
  useEffect(() => {
    if (extra.length && stageRef.current) {
      const el = stageRef.current;
      requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    }
  }, [extra]);

  const cfg = CONCEPTS.find((c) => c.id === concept) ?? CONCEPTS[0];
  const onChat = tab === 'chat';

  return (
    <AppShell activePage="agent" onNavigate={onNavigate}>
      <div className="agent-channel channel-page">
        <ChannelTopbar
          concept={concept}
          onConcept={switchConcept}
          onImConnect={() => setImOpen(true)}
          onMembers={() => setMembersOpen(true)}
        />
        <ChannelTabBar
          tab={tab}
          onTab={setTab}
          counts={{ tasks: tasks.length, alerts: autos.length, files: ARTIFACTS.length }}
        />
        <div className="stage" ref={stageRef}>
          {onChat && (concept === 'K' ? (
            <KolDigestView
              onDigest={chat.onDigestAutomation}
              extra={extra}
              onGoTasks={goTasks}
              onGoAlerts={goAlerts}
              onGoFiles={goFiles}
              onConnectIm={(im) => setImOpen(im ?? true)}
            />
          ) : (
            <div className="stage-inner" style={{ maxWidth: cfg.width }}>
              {concept === 'A' && <ConceptA onPrompt={chat.onPrompt} onStartTask={chat.onStartTask} onSubscribed={chat.onSubscribed} />}
              {concept === 'R' && <ConceptR onGoAlerts={goAlerts} />}
              <ExtraThread
                extra={extra}
                subtle={concept === 'A'}
                onGoTasks={goTasks}
                onGoAlerts={goAlerts}
                onGoFiles={goFiles}
                onConnectIm={(im) => setImOpen(im ?? true)}
              />
            </div>
          ))}
          {tab === 'tasks' && <TasksPanel tasks={tasks} threads={taskThreads} onSendToTask={sendToTask} />}
          {tab === 'memory' && <MemoryPanel />}
          {tab === 'alerts' && <AlertsPanel autos={autos} onSaveAuto={saveAuto} onToggleAuto={toggleAuto} />}
          {tab === 'files' && <FilesPanel />}
        </div>
        {onChat && (
          <ChannelComposer
            onSend={chat.onPrompt}
            placeholder={concept === 'K' ? 'Ask about any call, add a KOL, or tune this digest' : null}
            quickReplies={concept === 'R' ? CONCEPT_R_QUICK_REPLIES : null}
          />
        )}
        {membersOpen && <MembersModal onClose={() => setMembersOpen(false)} />}
        {imOpen && (
          <ImConnectModal
            autoConnect={typeof imOpen === 'string' ? imOpen : null}
            onClose={() => setImOpen(false)}
            onConnect={chat.connectIm}
            onDisconnect={chat.disconnectIm}
          />
        )}
      </div>
    </AppShell>
  );
}
