/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alerts 设置页 — 对齐 Figma Setting/Alerts（DJ9Acp.../7764:3793）
 *           统一列表：我创建的 automation（edit·pause·delete）+ 我订阅的 alert（Unsubscribe）
 *           pill tab（All/Active/Paused）+ Created 开关筛「仅我创建」+ New Alerts
 * [POS]: 页面层（#notifications，settings 侧栏标签 "Alerts"）
 */

import { useMemo, useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { SETTINGS_FONT, IconButton, ToggleSwitch, OutlineButton } from '@/app/components/shell/settings-ui';

const FONT = SETTINGS_FONT;
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const BR03 = 'var(--b-r03, rgba(0,0,0,0.03))';

type TabKey = 'all' | 'active' | 'paused';
type AlertStatus = 'active' | 'paused';
type Owner = 'created' | 'subscribed';

interface AlertRef { label: string; target: Page; avatar: string }
interface AlertItem {
  id: string;
  name: string;
  owner: Owner;
  status: AlertStatus;
  pushNotify?: boolean;
  creator: string;
  lastRun: string;
  runEvery: string;
  totalRuns: string;
  usedBy?: AlertRef[];   // created 侧：被哪些 playbook 使用
  from?: AlertRef[];     // subscribed 侧：来自哪个 playbook
}

const ALERTS: AlertItem[] = [
  { id: '1', name: 'space-rs-rotation', owner: 'created', status: 'active', pushNotify: true, creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: '73', usedBy: [{ label: 'BTC Ultimate AI Trader', target: 'screener', avatar: 'Caleb Frost' }, { label: 'ETH Swing Setup', target: 'screener', avatar: 'Asha Bello' }] },
  { id: '2', name: 'Capacity-Monitor', owner: 'created', status: 'active', creator: 'YGGYLL', lastRun: '15m', runEvery: 'Every 5 minutes', totalRuns: '142' },
  { id: '3', name: 'Funding-Rate-Watcher', owner: 'created', status: 'paused', creator: 'YGGYLL', lastRun: '42m', runEvery: 'Every hour', totalRuns: '3,210' },
  { id: '4', name: 'ai-infra-digest', owner: 'subscribed', status: 'active', pushNotify: true, creator: 'Mira Chen', lastRun: '1h', runEvery: 'Every 5 minutes', totalRuns: '73', from: [{ label: 'BTC Ultimate AI Trader', target: 'screener', avatar: 'Caleb Frost' }] },
  { id: '5', name: 'whale-flow-tracker', owner: 'subscribed', status: 'active', creator: 'Vega Zhou', lastRun: '30m', runEvery: 'Every 30 minutes', totalRuns: '1,287' },
  { id: '6', name: 'macro-pulse', owner: 'subscribed', status: 'active', creator: 'Alva', lastRun: '4h', runEvery: 'Every day', totalRuns: '48' },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
];

/* ── pill tab（active = br7 实心 / inactive = br03） ── */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-none"
      style={{
        fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px',
        padding: '6px 12px', borderRadius: 960,
        background: active ? 'rgba(0,0,0,0.7)' : BR03,
        color: active ? 'rgba(255,255,255,0.9)' : N7,
      }}
    >
      {label}
    </button>
  );
}

/* ── status dot（同 Automations） ── */
function StatusDot({ status }: { status: AlertStatus }) {
  const active = status === 'active';
  return (
    <span className="relative size-[14px] shrink-0">
      <span className="absolute inset-0 rounded-full" style={{ background: active ? '#DBEDED' : 'var(--b-r07, rgba(0,0,0,0.07))' }} />
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: active ? 'var(--main-m1, #49A3A6)' : 'rgba(0,0,0,0.3)' }} />
    </span>
  );
}

/* ── Push-Notify 标签 ── */
function PushTag() {
  return (
    <span className="flex shrink-0 items-center justify-center" style={{ border: `0.5px solid ${L12}`, borderRadius: 2, padding: '1px 4px' }}>
      <span style={{ fontFamily: FONT, fontSize: 10, lineHeight: '16px', letterSpacing: '0.1px', color: N5 }}>Push-Notify</span>
    </span>
  );
}

/* ── Used By / From 引用 chip ── */
function RefChip({ refItem, onClick }: { refItem: AlertRef; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center gap-[4px] border-none"
      style={{ background: BR03, borderRadius: 4, padding: '1px 4px' }}
    >
      <Avatar name={refItem.avatar} size={14} />
      <span className="whitespace-nowrap" style={{ fontFamily: FONT, fontSize: 11, lineHeight: '18px', letterSpacing: '0.11px', color: N5 }}>{refItem.label}</span>
    </button>
  );
}

const META = { fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px' } as const;

function AlertCard({ item, onToggleStatus, onDelete, onUnsub, onNavigate }: {
  item: AlertItem;
  onToggleStatus: () => void;
  onDelete: () => void;
  onUnsub: () => void;
  onNavigate: (page: Page) => void;
}) {
  const created = item.owner === 'created';
  const refs = created ? item.usedBy : item.from;
  const refLabel = created ? 'Used By' : 'From';
  return (
    <div className="flex w-full flex-col rounded-[8px] px-[20px]" style={{ border: `0.5px solid ${L2}`, background: 'var(--b0-container, #fff)', fontFamily: FONT }}>
      {/* Main */}
      <div className="flex w-full items-start gap-[8px] py-[20px]">
        <div className="flex h-[26px] shrink-0 items-center"><StatusDot status={item.status} /></div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[2px]" style={{ minHeight: 48 }}>
          <div className="flex items-center gap-[8px]">
            <p className="truncate" style={{ ...META, fontSize: 16, lineHeight: '26px', letterSpacing: '0.16px', color: N9 }}>{item.name}</p>
            {item.pushNotify && <PushTag />}
          </div>
          <div className="flex flex-wrap items-center gap-[8px]" style={{ ...META, color: N3 }}>
            <span className="flex items-center gap-[4px]">
              <Avatar name={item.creator} size={16} />
              <span className="whitespace-nowrap">{item.creator}</span>
            </span>
            <span style={{ color: N2 }}>|</span>
            <span className="whitespace-nowrap">Last Run: {item.lastRun}</span>
            <span style={{ color: N2 }}>|</span>
            <span className="whitespace-nowrap">{item.runEvery}</span>
            <span style={{ color: N2 }}>|</span>
            <span className="whitespace-nowrap">{item.totalRuns} Runs</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-[8px]" style={{ minHeight: 48 }}>
          {created && (
            <>
              <IconButton icon="edit-l1" label="Edit" onClick={() => onNavigate('agent')} />
              <IconButton icon={item.status === 'active' ? 'pause-l2' : 'play-f'} label={item.status === 'active' ? 'Pause' : 'Resume'} onClick={onToggleStatus} />
              <IconButton icon="delete-l" label="Delete" onClick={onDelete} />
            </>
          )}
          <button
            type="button"
            onClick={onUnsub}
            className="ml-[4px] shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 transition-opacity hover:opacity-60"
            style={{ fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px', fontWeight: 500, color: N9 }}
          >
            Unsubscribe
          </button>
        </div>
      </div>

      {/* Used By / From */}
      {refs && refs.length > 0 && (
        <div className="flex w-full items-start py-[12px]" style={{ borderTop: `0.5px solid ${L12}` }}>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[8px]">
            <span className="whitespace-nowrap" style={{ ...META, color: N3 }}>{refLabel}</span>
            {refs.map((r, i) => <RefChip key={i} refItem={r} onClick={() => onNavigate(r.target)} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Notifications({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [createdOnly, setCreatedOnly] = useState(false);
  const [items, setItems] = useState<AlertItem[]>(ALERTS);
  const [confirm, setConfirm] = useState<{ item: AlertItem; kind: 'delete' | 'unsub' } | null>(null);

  const visible = useMemo(
    () => items.filter((it) => (tab === 'all' || it.status === tab) && (!createdOnly || it.owner === 'created')),
    [items, tab, createdOnly],
  );

  const toggleStatus = (id: string) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status: it.status === 'active' ? 'paused' : 'active' } : it)));
  const remove = (id: string) => { setItems((prev) => prev.filter((it) => it.id !== id)); setConfirm(null); };

  return (
    <SettingsLayout active="notifications" onNavigate={onNavigate}>
      <div className="flex w-full max-w-[944px] flex-col gap-[16px]">
        {/* Header — tabs + Created 开关 + New Alerts */}
        <div className="flex w-full items-center gap-[20px]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[12px]">
            {TABS.map((t) => <Pill key={t.key} label={t.label} active={tab === t.key} onClick={() => setTab(t.key)} />)}
          </div>
          <div className="flex shrink-0 items-center gap-[6px]">
            <ToggleSwitch on={createdOnly} onClick={() => setCreatedOnly((v) => !v)} />
            <span className="whitespace-nowrap" style={{ ...META, color: N9 }}>Created</span>
          </div>
          <OutlineButton onClick={() => onNavigate('agent')}>
            <CdnIcon name="add-l2" size={14} color={N9} />
            New Alerts
          </OutlineButton>
        </div>

        {/* List */}
        {visible.map((it) => (
          <AlertCard
            key={it.id}
            item={it}
            onToggleStatus={() => toggleStatus(it.id)}
            onDelete={() => setConfirm({ item: it, kind: 'delete' })}
            onUnsub={() => setConfirm({ item: it, kind: 'unsub' })}
            onNavigate={onNavigate}
          />
        ))}
        {visible.length === 0 && (
          <p className="py-[40px] text-center" style={{ ...META, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: N5 }}>
            No alerts here. Build one from Alva Agent or subscribe from a playbook.
          </p>
        )}
      </div>

      {/* Confirm */}
      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-[16px]" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setConfirm(null)}>
          <div
            className="flex w-[400px] max-w-full flex-col gap-[16px] rounded-[12px] p-[24px]"
            style={{ background: 'var(--b0-container, #fff)', border: `0.5px solid ${L2}`, boxShadow: 'var(--shadow-l)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ fontFamily: FONT, fontSize: 16, lineHeight: '26px', letterSpacing: '0.16px', color: N9 }}>
              {confirm.kind === 'delete' ? `Delete “${confirm.item.name}”?` : `Unsubscribe from “${confirm.item.name}”?`}
            </p>
            <p style={{ ...META, color: N5 }}>
              {confirm.kind === 'delete'
                ? 'This automation will be permanently removed.'
                : "You'll stop receiving alerts from this. You can re-subscribe anytime."}
            </p>
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="cursor-pointer rounded-[6px] border-none bg-transparent px-[14px] py-[6px] hover:bg-[rgba(0,0,0,0.05)]"
                style={{ fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: N7 }}
              >
                Keep
              </button>
              <button
                type="button"
                onClick={() => remove(confirm.item.id)}
                className="cursor-pointer rounded-[6px] border-none px-[14px] py-[6px] hover:brightness-110"
                style={{ fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: '#fff', background: 'var(--destructive, #e05357)' }}
              >
                {confirm.kind === 'delete' ? 'Delete' : 'Unsubscribe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
