/**
 * [INPUT]: Figma Page/Agent/Alerts(10845:71200)— Get Started 5 卡网格 + 过滤 pills + Created by me + 扁平 Alert 卡(带 From playbook 底条)
 * [OUTPUT]: Agent 页 Alerts tab — All/Active/Paused 过滤 + Created by me 勾选;created=可 pause/resume + Unsubscribe,subscribed=仅 Unsubscribe;底部固定 Manage all created automations
 * [POS]: AgentNewSession tab==='alerts' 渲染;alert 总数驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import type { PushCardData } from '@/app/components/shared/AutomationCard';

const FONT = "'Delight', sans-serif";

export type AgentAlertStatus = 'active' | 'paused';
/** created = 我创建的(可 pause/resume);subscribed = 订阅别人的(仅 Unsubscribe) */
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
  /** 该 alert 来自哪个 playbook;有值则卡片带「From {playbook}」底条 */
  playbookId?: string;
}

interface AlertFromPlaybook {
  id: string;
  playbook: string;
  /** From tag 头像 — 传 Avatar name */
  avatar: string;
}

/* 「From」底条指向的 playbook 元数据 */
const ALERT_FROM_PLAYBOOKS: AlertFromPlaybook[] = [
  { id: 'pb-btc-ultimate', playbook: 'BTC Ultimate AI Trader', avatar: 'BTC Ultimate AI Trader' },
  { id: 'pb-eth-swing', playbook: 'ETH Swing Setup', avatar: 'ETH Swing Setup' },
];

export const AGENT_ALERTS: AgentAlert[] = [
  { id: 'a1', name: 'space-rs-rotation-1', creator: 'YGGYLL', lastRun: '15m', runEvery: 'At 2 minutes past the hour', runs: 48, status: 'active', source: 'created', playbookId: 'pb-btc-ultimate' },
  { id: 'a2', name: 'space-rs-rotation-2', creator: 'YGGYLL', lastRun: '15m', runEvery: 'At 2 minutes past the hour', runs: 48, status: 'paused', source: 'created', playbookId: 'pb-btc-ultimate' },
  { id: 'a3', name: 'daily-onchain-recap', creator: 'Robert', lastRun: '15m', runEvery: 'At 2 minutes past the hour', runs: 48, status: 'active', source: 'subscribed', playbookId: 'pb-eth-swing' },
  { id: 'a4', name: 'glp-1-trial-watch', creator: 'Rosy', lastRun: '15m', runEvery: 'At 08:00 AM, only on Monday', runs: 48, status: 'active', source: 'subscribed' },
  { id: 'a5', name: 'ai-earnings-radar', creator: 'Alvatothemoon', lastRun: '15m', runEvery: 'At 08:00 AM, only on Monday', runs: 48, status: 'paused', source: 'created' },
];

/* 状态点 — Figma Tag/Status Dot:14px 浅底环 + 6px 实心点;active 绿(#DBEDED/#49A3A6) / paused 灰(#F0F0F0/#ACACAC) */
function StatusDot({ status }: { status: AgentAlertStatus }) {
  const paused = status === 'paused';
  return (
    <span
      className="flex size-[14px] shrink-0 items-center justify-center rounded-full"
      style={{ background: paused ? '#F0F0F0' : '#DBEDED' }}
    >
      <span className="size-[6px] rounded-full" style={{ background: paused ? '#ACACAC' : 'var(--main-m1, #49A3A6)' }} />
    </span>
  );
}

/* meta 行 — 创建者头像 + 名(n3) | Last Run | 调度 | Runs;分隔符 n2 */
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

/* 顶部「Get Started」卡组(Figma 10845:71203 For Alert 变体):6 列网格,前 3 张各占 2 列、后 2 张各占 3 列 */
export interface AlertGetStartedCard { id: string; emoji: string; title: string; desc: string; onClick?: () => void }

export function AgentAlertsPanel({ alerts = AGENT_ALERTS, getStarted }: { alerts?: AgentAlert[]; getStarted?: AlertGetStartedCard[] } = {}) {
  const [filter, setFilter] = useState<AlertFilter>('all');
  const [createdOnly, setCreatedOnly] = useState(false);
  const [activeAlert, setActiveAlert] = useState<AgentAlert | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, AgentAlertStatus>>(() =>
    Object.fromEntries(alerts.map((a) => [a.id, a.status])),
  );

  const statusOf = (a: AgentAlert) => statusMap[a.id] ?? a.status;
  const toggleStatus = (id: string) =>
    setStatusMap((prev) => ({ ...prev, [id]: (prev[id] ?? 'active') === 'active' ? 'paused' : 'active' }));

  const fromOf = (a: AgentAlert) => (a.playbookId ? ALERT_FROM_PLAYBOOKS.find((p) => p.id === a.playbookId) : undefined);

  const visibleAlerts = alerts.filter((a) => {
    if (filter !== 'all' && statusOf(a) !== filter) return false;
    if (createdOnly && a.source !== 'created') return false;
    return true;
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-[28px] pb-0">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[40px]">
        {/* Get Started — 标题(Regular16) + gap16 + 6 列网格卡组(3+2,内部 0.5px 分隔线) */}
        {getStarted && getStarted.length > 0 && (
          <div className="flex w-full flex-col gap-[16px]">
            <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Get Started</p>
            <div className="grid w-full grid-cols-[repeat(6,minmax(0,1fr))] overflow-hidden rounded-[8px] bg-white" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
              {getStarted.map((c, i, arr) => {
                const firstRow = i < 3;
                const rowEnd = i === 2 || i === arr.length - 1;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={c.onClick}
                    className={`flex min-w-0 cursor-pointer items-center gap-[8px] border-none bg-transparent p-[16px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))] ${firstRow ? 'col-span-2' : 'col-span-3'}`}
                    style={{
                      borderRight: rowEnd ? undefined : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
                      borderBottom: firstRow ? '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' : undefined,
                    }}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      <p className="w-full truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                        <span className="mr-[8px]">{c.emoji}</span>{c.title}
                      </p>
                      <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{c.desc}</p>
                    </div>
                    <CdnIcon name="arrow-right-l1" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col gap-[16px]">
          {/* 过滤行 — All/Active/Paused pills + Created by me 勾选 */}
          <div className="flex w-full items-center gap-[20px]">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[12px]">
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
            <button
              type="button"
              onClick={() => setCreatedOnly((v) => !v)}
              className="flex shrink-0 cursor-pointer items-center gap-[6px] border-none bg-transparent p-0"
            >
              <span
                className="flex size-[16px] shrink-0 items-center justify-center rounded-[2px] transition-colors"
                style={{ background: createdOnly ? 'var(--main-m1, #49A3A6)' : '#DEDEDE' }}
              >
                {createdOnly && <CdnIcon name="check-l1" size={12} color="#ffffff" />}
              </span>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                Created by me
              </span>
            </button>
          </div>

          {/* 列表 — 扁平单卡;playbook 来源的卡带「From」底条 */}
          {visibleAlerts.map((a) => {
            const st = statusOf(a);
            const from = fromOf(a);
            const canToggle = a.source === 'created';
            return (
              <div key={a.id} className="flex w-full flex-col rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
                <div className="flex w-full items-start gap-[8px] p-[16px]">
                  <span className="flex h-[26px] shrink-0 items-center">
                    <StatusDot status={st} />
                  </span>
                  <button
                    onClick={() => setActiveAlert(a)}
                    className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-[2px] border-none bg-transparent p-0 text-left"
                  >
                    <span className="max-w-full truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      {a.name}
                    </span>
                    <AlertMeta alert={a} />
                  </button>
                  <div className="flex shrink-0 items-center gap-[16px] self-center pl-[8px]">
                    {canToggle && (
                      <button
                        aria-label={st === 'paused' ? 'Resume' : 'Pause'}
                        onClick={(e) => { e.stopPropagation(); toggleStatus(a.id); }}
                        className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70"
                      >
                        <CdnIcon name={st === 'paused' ? 'play-f' : 'pause-l2'} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
                      </button>
                    )}
                    <UnsubscribeBtn />
                  </div>
                </div>
                {from && (
                  <div
                    className="flex w-full flex-wrap items-start gap-[8px] px-[20px] py-[8px]"
                    style={{ borderTop: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}
                  >
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>
                        From
                      </span>
                      <span className="flex items-center gap-[4px] rounded-[4px] px-[4px] py-[1px]" style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}>
                        <Avatar name={from.avatar} size={14} />
                        <span className="whitespace-nowrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                          {from.playbook}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部固定 — Manage all created automations(Figma 10845:71216:白底,pt-12 pb-16,居中) */}
      <div className="sticky bottom-0 z-[1] mt-auto flex w-full shrink-0 items-end justify-center pb-[16px] pt-[12px]" style={{ background: 'var(--b0-container, #ffffff)' }}>
        <button
          className="cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-center text-[12px] leading-[20px] tracking-[0.12px] transition-colors hover:text-[color:var(--text-n7,rgba(0,0,0,0.7))]"
          style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
        >
          Manage all created automations →
        </button>
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
