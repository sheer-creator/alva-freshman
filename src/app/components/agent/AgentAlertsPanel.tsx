/**
 * [INPUT]: Figma Page/Agent/Alerts(7913:138060)— Body + Playbook 分组卡 + 单条 Alert 卡(created / subscribed)
 * [OUTPUT]: Agent 页 Alerts tab — All/Active/Paused 过滤 + Created 开关 + New Alerts;订阅整个 playbook 收成分组卡(组头 Unsubscribe + 行内 toggle),单条 alert 自成一卡(创建=edit/pause/delete + Unsubscribe;订阅=仅 Unsubscribe)
 * [POS]: AgentNewSession tab==='alerts' 渲染;alert 总数驱动页级 tab 计数
 */

import { useMemo, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ToggleSwitch } from '@/app/components/shell/settings-ui';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import type { PushCardData } from '@/app/components/shared/AutomationCard';

const FONT = "'Delight', sans-serif";

export type AgentAlertStatus = 'active' | 'paused';
/** created = 我创建的(可 edit/pause/delete);subscribed = 订阅别人的(仅 Unsubscribe) */
export type AgentAlertSource = 'created' | 'subscribed';

export interface AgentAlert {
  id: string;
  name: string;
  /** 创建者 — meta 行头像 + 名字 */
  creator: string;
  lastRun: string;
  runEvery: string;
  runs: number;
  status: AgentAlertStatus;
  source: AgentAlertSource;
  /** 该 alert 订阅自哪个 playbook;有值则收进对应分组卡 */
  playbookId?: string;
}

export interface AlertPlaybookGroup {
  id: string;
  playbook: string;
  /** 组头头像 — 传 Avatar name */
  avatar: string;
}

/* 订阅自整个 playbook → 渲染成分组卡(组头带 Unsubscribe,行内带 toggle) */
export const AGENT_ALERT_GROUPS: AlertPlaybookGroup[] = [
  { id: 'pb-attribution', playbook: 'Attribution Analysis Strategy', avatar: 'Sheer' },
  { id: 'pb-bulls-bears', playbook: 'FinTwit Bulls & Bears', avatar: 'Caleb Frost' },
];

export const AGENT_ALERTS: AgentAlert[] = [
  { id: 'a1', name: 'space-rs-rotation-1', creator: 'Sheer', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'created', playbookId: 'pb-attribution' },
  { id: 'a2', name: 'space-rs-rotation-2', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'paused', source: 'created', playbookId: 'pb-attribution' },
  { id: 'a3', name: 'space-rs-rotation-3', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'subscribed', playbookId: 'pb-attribution' },
  { id: 'a4', name: 'space-rs-rotation-4', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'paused', source: 'subscribed', playbookId: 'pb-attribution' },
  { id: 'a5', name: 'nvda-macd-hft-notify', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'subscribed' },
  { id: 'a6', name: 'manual-push-ping', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'created' },
  { id: 'a7', name: 'us-macro-pulse', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'created' },
  { id: 'a8', name: 'semi-catalyst-weekly-narrative', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'created' },
  { id: 'a9', name: 'bull-bear-sentiment', creator: 'Caleb Frost', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'active', source: 'created', playbookId: 'pb-bulls-bears' },
  { id: 'a10', name: 'whale-flow-alert', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', runs: 73, status: 'paused', source: 'subscribed', playbookId: 'pb-bulls-bears' },
];

/* 状态点 — 14px 浅底环 + 6px 实心点;active 绿 / paused 灰 */
function StatusDot({ status }: { status: AgentAlertStatus }) {
  const paused = status === 'paused';
  return (
    <span
      className="flex size-[14px] shrink-0 items-center justify-center rounded-full"
      style={{ background: paused ? 'var(--b-r05, rgba(0,0,0,0.05))' : '#DBEDED' }}
    >
      <span className="size-[6px] rounded-full" style={{ background: paused ? 'var(--text-n3, rgba(0,0,0,0.3))' : 'var(--main-m1, #49A3A6)' }} />
    </span>
  );
}

/* meta 行 — 创建者头像 + 名(n3) | Last Run | Every | Runs;分隔符 n2 */
function AlertMeta({ alert }: { alert: AgentAlert }) {
  const sep = <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>;
  return (
    <div className="flex flex-wrap items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
      <span className="flex items-center gap-[4px]">
        <Avatar name={alert.creator} size={16} />
        {alert.creator}
      </span>
      {sep}
      <span className="whitespace-nowrap">Last Run: {alert.lastRun}</span>
      {sep}
      <span className="whitespace-nowrap">{alert.runEvery}</span>
      {sep}
      <span className="whitespace-nowrap">{alert.runs} Runs</span>
    </div>
  );
}

/* 操作图标 — CDN 同名 icon;颜色取 Figma fill(n9) */
function RowActions({ status, onToggleStatus }: { status: AgentAlertStatus; onToggleStatus: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-[12px]">
      <button aria-label="Edit" onClick={(e) => e.stopPropagation()} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name="edit-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
      <button aria-label={status === 'paused' ? 'Resume' : 'Pause'} onClick={(e) => { e.stopPropagation(); onToggleStatus(); }} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name={status === 'paused' ? 'play-f' : 'pause-l2'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
      <button aria-label="Delete" onClick={(e) => e.stopPropagation()} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
        <CdnIcon name="delete-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
      </button>
    </div>
  );
}

/* 折叠箭头 — CDN arrow-down-f2(实心三角);Figma fill = rgba(0,0,0,0.2)=n2;原生指下,展开 none,收起转右 */
function GroupArrow({ open }: { open: boolean }) {
  return (
    <span className="flex size-[14px] shrink-0 items-center justify-center" style={{ transform: open ? 'none' : 'rotate(-90deg)', transition: 'transform 0.12s ease' }}>
      <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2, rgba(0,0,0,0.2))" />
    </span>
  );
}

function UnsubscribeBtn() {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className="shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-right text-[12px] font-medium leading-[20px] tracking-[0.12px] text-[color:var(--text-n9,rgba(0,0,0,0.9))] transition-colors hover:text-[color:var(--main-m4,#E5484D)]"
      style={{ fontFamily: FONT }}
    >
      Unsubscribe
    </button>
  );
}

/* 单 alert 主体 — dot + (name + meta) + 右侧控件;controls 由调用方传入(toggle / unsubscribe) */
function AlertBody({ alert, status, onOpen, controls }: { alert: AgentAlert; status: AgentAlertStatus; onOpen: () => void; controls: React.ReactNode }) {
  return (
    <>
      <span className="flex h-[26px] shrink-0 items-center">
        <StatusDot status={status} />
      </span>
      <button
        onClick={onOpen}
        className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-[2px] border-none bg-transparent p-0 text-left"
      >
        <span className="max-w-full truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {alert.name}
        </span>
        <AlertMeta alert={alert} />
      </button>
      <div className="flex shrink-0 items-center gap-[12px] self-center">{controls}</div>
    </>
  );
}

type AlertFilter = 'all' | 'active' | 'paused';

const FILTERS: { id: AlertFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'paused', label: 'Paused' },
];

/* 点击 alert → 详情弹窗的最近推送 */
function buildAlertPushes(alert: AgentAlert): PushCardData[] {
  const bullets = [
    'Top of basket: ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property & Casualty continues.',
    'New entries: BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.',
    'Dropouts: TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.',
  ];
  const title = 'AMD to Entrust 2nm Production to Samsung Foundry — Samsung Electronics has entered into substantive discussions with AMD';
  return [
    { id: `${alert.id}-p1`, kind: 'normal', timestamp: 'May 8, 12:00 PM', source: alert.name, feedName: alert.name, title, bullets },
    { id: `${alert.id}-p2`, kind: 'normal', timestamp: 'May 7, 12:00 PM', source: alert.name, feedName: alert.name, title, bullets },
  ];
}

const ALERT_INSTRUCTION =
  'I want to set up a Project monitor automation. Briefly explain how automations work in Alva, then ask me what project to watch, what changes matter, and when it should check in.';

export function AgentAlertsPanel() {
  const [filter, setFilter] = useState<AlertFilter>('all');
  const [createdOnly, setCreatedOnly] = useState(false);
  const [activeAlert, setActiveAlert] = useState<AgentAlert | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, AgentAlertStatus>>(() =>
    Object.fromEntries(AGENT_ALERTS.map((a) => [a.id, a.status])),
  );
  /* playbook 组默认收起;记录被展开的 id */
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const statusOf = (a: AgentAlert) => statusMap[a.id] ?? a.status;
  const toggleStatus = (id: string) =>
    setStatusMap((prev) => ({ ...prev, [id]: (prev[id] ?? 'active') === 'active' ? 'paused' : 'active' }));

  const visible = (a: AgentAlert) => {
    if (filter !== 'all' && statusOf(a) !== filter) return false;
    if (createdOnly && a.source !== 'created') return false;
    return true;
  };

  const groups = useMemo(
    () =>
      AGENT_ALERT_GROUPS.map((g) => ({
        group: g,
        total: AGENT_ALERTS.filter((a) => a.playbookId === g.id).length,
        alerts: AGENT_ALERTS.filter((a) => a.playbookId === g.id && visible(a)),
      })).filter((g) => g.alerts.length > 0),
    [filter, createdOnly, statusMap],
  );
  const standalone = useMemo(() => AGENT_ALERTS.filter((a) => !a.playbookId && visible(a)), [filter, createdOnly, statusMap]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[16px]">
        {/* 顶部行 — 过滤 pills + Created 开关 + New Alerts */}
        <div className="flex w-full items-center gap-[20px]">
          <div className="flex flex-1 flex-wrap items-center gap-[12px]">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  className="h-[34px] shrink-0 cursor-pointer whitespace-nowrap rounded-full border-none px-[12px] py-[6px] text-[14px] leading-[22px] tracking-[0.14px] transition-colors"
                  style={{
                    fontFamily: FONT,
                    background: active ? 'rgba(0,0,0,0.7)' : 'var(--b-r03, rgba(0,0,0,0.03))',
                    color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  }}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center gap-[8px]">
            <ToggleSwitch on={createdOnly} onClick={() => setCreatedOnly((v) => !v)} />
            <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Created
            </span>
          </div>
          <button
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] px-[12px] py-[6px] text-[12px] font-medium leading-[20px] tracking-[0.12px] transition-colors hover:bg-[var(--b-r02)]"
            style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
          >
            <CdnIcon name="add-l2" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
            New Alerts
          </button>
        </div>

        {/* 分组卡 — 订阅自整个 playbook;可折叠 */}
        {groups.map(({ group, alerts, total }) => {
          const open = !!expanded[group.id];
          return (
          <div key={group.id} className="w-full overflow-hidden rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
            {/* 组头 — 三角 + 头像 + (名 / meta) + Unsubscribe;点击展开收起 */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setExpanded((p) => ({ ...p, [group.id]: !open }))}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded((p) => ({ ...p, [group.id]: !open })); } }}
              className="flex w-full cursor-pointer items-center gap-[8px] p-[20px]"
              style={{ background: 'var(--b-r02, rgba(0,0,0,0.02))' }}
            >
              <GroupArrow open={open} />
              <Avatar name={group.avatar} size={30} />
              <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <span className="min-w-0 truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  {group.playbook}
                </span>
                <span className="flex items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
                  <span className="whitespace-nowrap">{total} Automations</span>
                  <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
                  <span className="whitespace-nowrap">Last Run: {alerts[0]?.lastRun ?? '15m'}</span>
                </span>
              </div>
              <UnsubscribeBtn />
            </div>
            {/* 行列表 — px-20,行间分隔线 l12 */}
            {open && (
            <div className="flex w-full flex-col px-[20px]">
              {alerts.map((a, i) => {
                const st = statusOf(a);
                return (
                  <div
                    key={a.id}
                    className="group flex w-full items-start gap-[8px] py-[12px]"
                    style={{ borderTop: i > 0 ? '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' : 'none' }}
                  >
                    <AlertBody
                      alert={a}
                      status={st}
                      onOpen={() => setActiveAlert(a)}
                      controls={
                        a.source === 'created' ? (
                          <>
                            <RowActions status={st} onToggleStatus={() => toggleStatus(a.id)} />
                            <ToggleSwitch on={st === 'active'} onClick={() => toggleStatus(a.id)} />
                          </>
                        ) : (
                          <ToggleSwitch on={st === 'active'} onClick={() => toggleStatus(a.id)} />
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
            )}
          </div>
          );
        })}

        {/* 单条卡 */}
        {standalone.map((a) => {
          const st = statusOf(a);
          const created = a.source === 'created';
          return (
            <div
              key={a.id}
              className="group flex w-full items-start gap-[8px] rounded-[8px] p-[20px]"
              style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
            >
              <AlertBody
                alert={a}
                status={st}
                onOpen={() => setActiveAlert(a)}
                controls={
                  created ? (
                    <>
                      <RowActions status={st} onToggleStatus={() => toggleStatus(a.id)} />
                      <UnsubscribeBtn />
                    </>
                  ) : (
                    <UnsubscribeBtn />
                  )
                }
              />
            </div>
          );
        })}
      </div>

      <FeedDetailModal
        open={!!activeAlert}
        onClose={() => setActiveAlert(null)}
        feedName={activeAlert?.name ?? ''}
        lastRun={activeAlert?.lastRun ?? '15m'}
        runEvery={activeAlert?.runEvery ?? 'Every 5 minutes'}
        alerts={activeAlert ? buildAlertPushes(activeAlert) : undefined}
        instruction={ALERT_INSTRUCTION}
        description={ALERT_INSTRUCTION}
        owner={activeAlert?.source === 'created'}
      />
    </div>
  );
}
