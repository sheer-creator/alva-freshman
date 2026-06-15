/**
 * [INPUT]: Figma Page/Agent/Alerts(7913:138060)— Body + Agent List Item(owned / subscribed 两型)
 * [OUTPUT]: Agent 页 Alerts tab — All/Active/Paused 过滤 + Created 开关 + New Alerts;卡片分「我创建的」与「订阅别人的」
 * [POS]: AgentNewSession tab==='alerts' 渲染;数量驱动页级 tab 计数
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ToggleSwitch } from '@/app/components/shell/settings-ui';
import { FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import type { PushCardData } from '@/app/components/shared/AutomationCard';

const FONT = "'Delight', sans-serif";

export type AgentAlertStatus = 'active' | 'paused';
/** owned = 我创建的(可 edit/pause/delete,展示订阅者);subscribed = 订阅别人的(可 Unsubscribe,展示来源) */
export type AgentAlertKind = 'owned' | 'subscribed';

export interface AgentAlert {
  id: string;
  title: string;
  lastRun: string;
  status: AgentAlertStatus;
  kind: AgentAlertKind;
  /** owned:订阅了我这条 alert 的人 */
  usedBy?: string[];
  /** subscribed:这条 alert 来自谁(可选) */
  from?: string;
}

export const AGENT_ALERTS: AgentAlert[] = [
  { id: 'a1', title: 'capacity-monitor', lastRun: '15m', status: 'active', kind: 'owned', usedBy: ['@leo/BTC Ultimate AI Trader', '@sarah/ETH Swing Setup'] },
  { id: 'a2', title: 'shanghaojin-tweet-trader-v2', lastRun: '15m', status: 'active', kind: 'subscribed' },
  { id: 'a3', title: 'ai-chip-supply-chain', lastRun: '15m', status: 'active', kind: 'subscribed', from: '@leo/BTC Ultimate AI Trader' },
  { id: 'a4', title: 'earnings-surprise-radar', lastRun: '15m', status: 'active', kind: 'subscribed' },
  { id: 'a5', title: 'alessiotmad-tweet-tracker', lastRun: '15m', status: 'active', kind: 'owned', usedBy: ['@leo/BTC Ultimate AI Trader', '@sarah/ETH Swing Setup', '@yggyll/SOL DeFi Hunter', '@alex/Stablecoin Yield Farm', '@mike/Altcoin Momentum'] },
  { id: 'a6', title: 'funding-rate-watcher', lastRun: '15m', status: 'paused', kind: 'owned', usedBy: ['@leo/BTC Ultimate AI Trader'] },
  { id: 'a7', title: 'funding-rate-watcher', lastRun: '15m', status: 'active', kind: 'subscribed' },
];

/* 状态点 — 14px 浅底环 + 6px 实心点;active 绿(dot-green)/ paused 灰(dot-grey) */
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

/* Tag/Default — Figma 7930:184185:br03 圆角 4,px-6 py-px,gap-4,14px 头像 + 名称 */
function AuthorTag({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[4px] rounded-[4px] px-[6px] py-px" style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}>
      <Avatar name={name} size={14} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
        {name}
      </span>
    </div>
  );
}

/* owned 卡的操作图标 — edit / pause(暂停态显示 play-f)/ delete */
function OwnedActions({ status }: { status: AgentAlertStatus }) {
  const icons = ['edit-l1', status === 'paused' ? 'play-f' : 'pause-l2', 'delete-l'];
  return (
    <div className="flex shrink-0 items-center gap-[12px]">
      {icons.map((ic) => (
        <button key={ic} aria-label={ic} onClick={(e) => e.stopPropagation()} className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-70">
          <CdnIcon name={ic} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
        </button>
      ))}
    </div>
  );
}

/* 订阅卡片 — Figma 7930:184577:border 0.5 l2 / 圆角 8 / p-20 / gap-12 */
function AlertCard({ alert, onOpen }: { alert: AgentAlert; onOpen: () => void }) {
  const owned = alert.kind === 'owned';
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className="flex w-full cursor-pointer flex-col gap-[12px] rounded-[8px] p-[20px] transition-shadow hover:shadow-xs"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <div className="flex w-full items-center gap-[24px]">
        <div className="flex min-w-0 flex-1 items-center gap-[8px]">
          <StatusDot status={alert.status} />
          <p className="min-w-0 flex-1 truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {alert.title}
          </p>
        </div>
        {/* meta — Last Run | Every 5 minutes | 142 Runs */}
        <div className="flex shrink-0 items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT }}>
          <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Last Run: {alert.lastRun}</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Every 5 minutes</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <span style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>142 Runs</span>
        </div>
        {/* 右侧操作 — owned 三图标 / subscribed 取消订阅 */}
        {owned ? (
          <OwnedActions status={alert.status} />
        ) : (
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-[72px] shrink-0 cursor-pointer border-none bg-transparent p-0 text-right text-[12px] leading-[20px] tracking-[0.12px] text-[color:var(--text-n9,rgba(0,0,0,0.9))] transition-colors hover:text-[color:var(--main-m4,#E5484D)]"
            style={{ fontFamily: FONT }}
          >
            Unsubscribe
          </button>
        )}
      </div>

      {/* 第二行 — owned: Used By + 订阅者们;subscribed: From + 来源(可选) */}
      {owned && alert.usedBy && alert.usedBy.length > 0 && (
        <div className="flex w-full flex-wrap items-center gap-[8px]">
          <span className="shrink-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            Used By
          </span>
          {alert.usedBy.map((u) => (
            <AuthorTag key={u} name={u} />
          ))}
        </div>
      )}
      {!owned && alert.from && (
        <div className="flex w-full flex-wrap items-center gap-[8px]">
          <span className="shrink-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            From
          </span>
          <AuthorTag name={alert.from} />
        </div>
      )}
    </div>
  );
}

type AlertFilter = 'all' | 'active' | 'paused';

const FILTERS: { id: AlertFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'paused', label: 'Paused' },
];

/* 点击 alert → 详情弹窗的 Alerts tab 内容(按该 alert 构造的最近推送) */
function buildAlertPushes(alert: AgentAlert): PushCardData[] {
  const bullets = [
    'Top of basket: ALL (Allstate) holds #1 at Score 95 — ROE 39.5%, P/E 5.64; leadership in Insurance — Property & Casualty continues.',
    'New entries: BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.',
    'Dropouts: TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.',
  ];
  const title = 'AMD to Entrust 2nm Production to Samsung Foundry — Samsung Electronics has entered into substantive discussions with AMD';
  return [
    { id: `${alert.id}-p1`, kind: 'normal', timestamp: 'May 8, 12:00 PM', source: alert.title, feedName: alert.title, title, bullets },
    { id: `${alert.id}-p2`, kind: 'normal', timestamp: 'May 7, 12:00 PM', source: alert.title, feedName: alert.title, title, bullets },
  ];
}

const ALERT_INSTRUCTION =
  'I want to set up a Project monitor automation. Briefly explain how automations work in Alva, then ask me what project to watch, what changes matter, and when it should check in.';

export function AgentAlertsPanel() {
  const [filter, setFilter] = useState<AlertFilter>('all');
  const [createdOnly, setCreatedOnly] = useState(false);
  const [activeAlert, setActiveAlert] = useState<AgentAlert | null>(null);
  const alerts = AGENT_ALERTS.filter((a) => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (createdOnly && a.kind !== 'owned') return false;
    return true;
  });

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[16px]">
        {/* 顶部行 — 左侧过滤 pills(medium)+ 右侧 Created 开关 + New Alerts */}
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
          {/* Created 开关 — 滑块在左,文字在右 */}
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

        {alerts.map((a) => (
          <AlertCard key={a.id} alert={a} onOpen={() => setActiveAlert(a)} />
        ))}
      </div>

      <FeedDetailModal
        open={!!activeAlert}
        onClose={() => setActiveAlert(null)}
        feedName={activeAlert?.title ?? ''}
        lastRun={activeAlert?.lastRun ?? '15m'}
        runEvery="Every 5 minutes"
        alerts={activeAlert ? buildAlertPushes(activeAlert) : undefined}
        instruction={ALERT_INSTRUCTION}
        description={ALERT_INSTRUCTION}
      />
    </div>
  );
}
