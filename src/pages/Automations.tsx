/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Automations settings page aligned with Figma Settings/Automations
 * [POS]: Page layer (#automations)
 */

import { useMemo, useState } from 'react';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { SETTINGS_FONT } from '@/app/components/shell/settings-ui';
import type { Page } from '@/app/App';

const FONT = SETTINGS_FONT;
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L07 = 'var(--line-l07, rgba(0,0,0,0.07))';
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const BR03 = 'var(--b-r03, rgba(0,0,0,0.03))';

type Filter = 'all' | 'active' | 'paused';
type AutomationStatus = Exclude<Filter, 'all'>;

interface PlaybookRef {
  label: string;
  target: Page;
}

interface AutomationItem {
  id: string;
  name: string;
  status: AutomationStatus;
  pushNotify?: boolean;
  lastRun: string;
  schedule: string;
  from?: PlaybookRef;
  usedBy?: PlaybookRef[];
}

const BTC_PLAYBOOK: PlaybookRef = { label: 'BTC Ultimate AI Trader', target: 'screener' };
const ETH_PLAYBOOK: PlaybookRef = { label: 'ETH Swing Setup', target: 'screener' };

const INITIAL_AUTOMATIONS: AutomationItem[] = [
  {
    id: 'btc-breakout-alert-4h',
    name: 'btc-breakout-alert-4h',
    status: 'active',
    pushNotify: true,
    lastRun: '15m',
    schedule: 'At 01:00 PM, Monday through Friday',
    from: BTC_PLAYBOOK,
    usedBy: [BTC_PLAYBOOK, ETH_PLAYBOOK],
  },
  {
    id: 'whale-flow-tracker',
    name: 'whale-flow-tracker',
    status: 'active',
    pushNotify: true,
    lastRun: '15m',
    schedule: 'At 2 minutes past the hour',
    from: BTC_PLAYBOOK,
  },
  {
    id: 'daily-onchain-recap',
    name: 'daily-onchain-recap',
    status: 'paused',
    lastRun: '15m',
    schedule: 'At 10:25 PM, Monday through Friday',
    from: BTC_PLAYBOOK,
  },
  {
    id: 'glp-1-trial-watch',
    name: 'glp-1-trial-watch',
    status: 'paused',
    lastRun: '15m',
    schedule: 'Every 5 minutes',
  },
  {
    id: 'ai-earnings-radar',
    name: 'ai-earnings-radar',
    status: 'active',
    pushNotify: true,
    lastRun: '15m',
    schedule: 'Every 5 minutes',
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
];

const META_TEXT = {
  fontFamily: FONT,
  fontSize: 12,
  lineHeight: '20px',
  letterSpacing: '0.12px',
} as const;

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border-none"
      style={{
        minWidth: 40,
        padding: '6px 12px',
        borderRadius: 960,
        background: active ? 'rgba(0,0,0,0.7)' : BR03,
        color: active ? 'rgba(255,255,255,0.9)' : N7,
        fontFamily: FONT,
        fontSize: 14,
        lineHeight: '22px',
        letterSpacing: '0.14px',
      }}
    >
      {label}
    </button>
  );
}

function StatusDot({ status }: { status: AutomationStatus }) {
  const active = status === 'active';
  return (
    <span className="relative size-[14px] shrink-0" aria-hidden="true">
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: active ? '#dbeded' : 'var(--b-r07, rgba(0,0,0,0.07))' }}
      />
      <span
        className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: active ? 'var(--main-m1, #49a3a6)' : N3 }}
      />
    </span>
  );
}

function PushNotifyTag() {
  return (
    <span
      className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] px-[6px] py-px"
      style={{ border: `0.5px solid ${L12}`, color: N5, fontFamily: FONT, fontSize: 11, lineHeight: '18px', letterSpacing: '0.11px' }}
    >
      Push-Notify
    </span>
  );
}

function PlaybookChip({ item, onNavigate }: { item: PlaybookRef; onNavigate: (page: Page) => void }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.target)}
      className="flex shrink-0 cursor-pointer items-center gap-[4px] border-none px-[4px] py-px"
      style={{ background: BR03, borderRadius: 4 }}
    >
      <Avatar name={item.label} size={14} />
      <span className="whitespace-nowrap" style={{ color: N5, fontFamily: FONT, fontSize: 11, lineHeight: '18px', letterSpacing: '0.11px' }}>
        {item.label}
      </span>
    </button>
  );
}

function ActionButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-[16px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-opacity hover:opacity-50"
    >
      <CdnIcon name={icon} size={16} color={N9} />
    </button>
  );
}

function AutomationCard({ item, onEdit, onToggleStatus, onDelete, onNavigate }: {
  item: AutomationItem;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onNavigate: (page: Page) => void;
}) {
  const hasRelations = Boolean(item.from || item.usedBy?.length);

  return (
    <article
      className="flex w-full max-w-[944px] flex-col overflow-hidden rounded-[8px]"
      style={{ border: `0.5px solid ${L2}`, background: 'var(--b0-container, #fff)', fontFamily: FONT }}
    >
      <div className="flex w-full items-start gap-[8px] px-[20px] py-[16px]">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[4px]">
          <div className="flex min-w-0 items-center gap-[8px]">
            <div className="flex h-[26px] shrink-0 items-center">
              <StatusDot status={item.status} />
            </div>
            <p className="truncate" style={{ color: N9, fontFamily: FONT, fontSize: 16, fontWeight: 400, lineHeight: '26px', letterSpacing: '0.16px' }}>
              {item.name}
            </p>
            {item.pushNotify && <PushNotifyTag />}
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-[8px]" style={{ ...META_TEXT, color: N3 }}>
            <span className="whitespace-nowrap">Last Run: {item.lastRun}</span>
            <span aria-hidden="true" style={{ color: N2 }}>|</span>
            <span className="whitespace-nowrap">{item.schedule}</span>
          </div>
        </div>
        <div className="flex h-[50px] shrink-0 items-center gap-[16px]">
          <ActionButton icon="edit-l1" label={`Edit ${item.name}`} onClick={onEdit} />
          <ActionButton
            icon={item.status === 'active' ? 'pause-l2' : 'play-f'}
            label={`${item.status === 'active' ? 'Pause' : 'Resume'} ${item.name}`}
            onClick={onToggleStatus}
          />
          <ActionButton icon="delete-l" label={`Delete ${item.name}`} onClick={onDelete} />
        </div>
      </div>

      {hasRelations && (
        <div className="flex min-h-[36px] w-full flex-wrap items-center gap-[8px] px-[20px] py-[8px]" style={{ borderTop: `0.5px solid ${L07}` }}>
          {item.from && (
            <>
              <span className="whitespace-nowrap" style={{ ...META_TEXT, color: N3 }}>From</span>
              <PlaybookChip item={item.from} onNavigate={onNavigate} />
            </>
          )}
          {item.from && item.usedBy?.length ? <span aria-hidden="true" style={{ ...META_TEXT, color: N2 }}>|</span> : null}
          {item.usedBy?.length ? (
            <>
              <span className="whitespace-nowrap" style={{ ...META_TEXT, color: N3 }}>Used By</span>
              {item.usedBy.map((ref) => <PlaybookChip key={ref.label} item={ref} onNavigate={onNavigate} />)}
            </>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default function Automations({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [items, setItems] = useState<AutomationItem[]>(INITIAL_AUTOMATIONS);
  const [pendingDelete, setPendingDelete] = useState<AutomationItem | null>(null);

  const visibleItems = useMemo(
    () => items.filter((item) => filter === 'all' || item.status === filter),
    [filter, items],
  );

  const toggleStatus = (id: string) => {
    setItems((current) => current.map((item) => (
      item.id === id
        ? { ...item, status: item.status === 'active' ? 'paused' : 'active' }
        : item
    )));
  };

  const removeItem = () => {
    if (!pendingDelete) return;
    setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <SettingsLayout active="automations" onNavigate={onNavigate}>
      <div className="flex w-full max-w-[944px] flex-col gap-[16px]">
        <div className="flex min-h-[34px] flex-wrap items-center gap-[12px]">
          {FILTERS.map((item) => (
            <FilterPill
              key={item.key}
              label={item.label}
              active={filter === item.key}
              onClick={() => setFilter(item.key)}
            />
          ))}
        </div>

        {visibleItems.map((item) => (
          <AutomationCard
            key={item.id}
            item={item}
            onEdit={() => onNavigate('agent')}
            onToggleStatus={() => toggleStatus(item.id)}
            onDelete={() => setPendingDelete(item)}
            onNavigate={onNavigate}
          />
        ))}

        {visibleItems.length === 0 && (
          <p className="py-[40px] text-center" style={{ ...META_TEXT, color: N5, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px' }}>
            No automations here.
          </p>
        )}
      </div>

      {pendingDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-[16px]"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setPendingDelete(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-automation-title"
            className="flex w-[400px] max-w-full flex-col gap-[16px] rounded-[8px] p-[24px]"
            style={{ background: 'var(--b0-container, #fff)', border: `0.5px solid ${L2}`, boxShadow: 'var(--shadow-l)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <p id="delete-automation-title" style={{ color: N9, fontFamily: FONT, fontSize: 16, lineHeight: '26px', letterSpacing: '0.16px' }}>
              Delete "{pendingDelete.name}"?
            </p>
            <p style={{ ...META_TEXT, color: N5 }}>This automation will be permanently removed.</p>
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="cursor-pointer rounded-[4px] border-none bg-transparent px-[12px] py-[6px] hover:bg-[rgba(0,0,0,0.05)]"
                style={{ color: N7, fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={removeItem}
                className="cursor-pointer rounded-[4px] border-none px-[12px] py-[6px] hover:brightness-110"
                style={{ background: 'var(--destructive, #e05357)', color: '#fff', fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
