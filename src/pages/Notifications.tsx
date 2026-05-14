/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Notifications 设置页 — 订阅消费侧管理
 *           列出我订阅的所有 playbook 推送，渠道由 Alva Agent 管理
 *           与 Automations 形成"产 / 收"对称双页
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

/* ========== Status Dot ========== */

function StatusDot({ status = 'green', size = 12 }: { status?: 'green' | 'grey'; size?: number }) {
  const ringColor = status === 'green' ? '#DBEDED' : 'rgba(0,0,0,0.06)';
  const dotColor = status === 'green' ? '#49A3A6' : 'rgba(0,0,0,0.3)';
  return (
    <div className="flex items-center shrink-0" style={{ width: size, height: size }}>
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" fill={ringColor} r="6" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.136 5.136">
            <circle cx="2.568" cy="2.568" fill={dotColor} r="2.568" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========== From Chip ========== */

interface FromPlaybook { author: string; name: string; target: Page; }

function FromChip({ playbook, onClick }: { playbook: FromPlaybook; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="flex items-center gap-[2px] justify-center px-[4px] py-px rounded-[2px] shrink-0 cursor-pointer border-none outline-none transition-colors hover:brightness-95"
      style={{ background: 'var(--b-r03)' }}
    >
      <div className="shrink-0 size-[14px] rounded-[2px] overflow-hidden">
        <Avatar name={playbook.author} size={14} />
      </div>
      <p
        className="leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ color: 'var(--text-n5)', fontFamily: FONT, maxWidth: 120 }}
      >
        @{playbook.author}/{playbook.name}
      </p>
    </button>
  );
}

/* ========== 类型 ========== */

interface Subscription {
  id: string;
  name: string;                  // feed / automation name (一级)
  author: string;                // 来源作者
  lastPushAgo: string;           // "5m" / "1h" / "—"
  weekCount: number;             // pushes received this week
  target: Page;                  // 点击跳转
  from?: FromPlaybook[];         // 来源 playbook
}

/* ========== Mock ========== */

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: '2',
    name: 'ai-infra-digest',
    author: 'maya',
    lastPushAgo: '1h',
    weekCount: 6,
    target: 'screener' as Page,
    from: [{ author: 'maya', name: 'ai-infra-screener', target: 'screener' as Page }],
  },
  {
    id: '3',
    name: 'whale-flow-tracker',
    author: 'satoshi',
    lastPushAgo: '30m',
    weekCount: 18,
    target: 'screener' as Page,
    from: [{ author: 'satoshi', name: 'whale-alert-monitor', target: 'screener' as Page }],
  },
  {
    id: '4',
    name: 'macro-pulse',
    author: 'alva',
    lastPushAgo: '4h',
    weekCount: 3,
    target: 'screener' as Page,
    from: [{ author: 'alva', name: 'macro-dashboard', target: 'screener' as Page }],
  },
  {
    id: '5',
    name: 'defi-yield-scanner',
    author: 'quantus',
    lastPushAgo: '2d',
    weekCount: 0,
    target: 'screener' as Page,
  },
];

/* ========== Cancel 文字按钮 ========== */

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 transition-opacity hover:opacity-60"
      style={{
        fontFamily: FONT,
        fontSize: 12,
        lineHeight: '20px',
        letterSpacing: '0.12px',
        color: 'var(--text-n5)',
      }}
    >
      Cancel
    </button>
  );
}

/* ========== Subscription Card (Automations 风格) ========== */

function SubscriptionCard({
  sub,
  onOpen,
  onCancel,
  onNavigate,
}: {
  sub: Subscription;
  onOpen: () => void;
  onCancel: () => void;
  onNavigate: (page: Page) => void;
}) {
  const hasFrom = !!sub.from?.length;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className="flex flex-col gap-[8px] items-center justify-center p-[20px] rounded-[8px] w-full cursor-pointer transition-colors hover:brightness-[0.98]"
      style={{ background: 'var(--grey-g01)' }}
    >
      {/* Row 1: dot + name + Cancel */}
      <div className="flex gap-[12px] items-center w-full">
        <div className="flex flex-1 min-w-0 gap-[8px] items-center">
          <StatusDot status="green" size={14} />
          <p
            className="flex-1 min-w-0 leading-[26px] text-[16px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'var(--text-n9)', fontFamily: FONT }}
          >
            {sub.name}
          </p>
        </div>
        <CancelButton onClick={onCancel} />
      </div>

      {/* Row 2: meta + From */}
      <div className="flex flex-wrap gap-[8px] items-center w-full">
        <div
          className="flex gap-[8px] items-center leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap shrink-0"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          <p>Last push: {sub.lastPushAgo}</p>
          <p style={{ color: 'var(--text-n2)' }}>|</p>
          <p>{sub.weekCount} this week</p>
          {hasFrom && (
            <>
              <p style={{ color: 'var(--text-n2)' }}>|</p>
              <p>From</p>
            </>
          )}
        </div>
        {hasFrom && sub.from!.map((p, i) => (
          <FromChip key={i} playbook={p} onClick={() => onNavigate(p.target)} />
        ))}
      </div>
    </div>
  );
}

/* ========== 页面 ========== */

export default function Notifications({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [subs, setSubs] = useState<Subscription[]>(SUBSCRIPTIONS);
  const [confirmUnsub, setConfirmUnsub] = useState<Subscription | null>(null);

  const unsubscribe = (id: string) => {
    setSubs(prev => prev.filter(s => s.id !== id));
    setConfirmUnsub(null);
  };

  return (
    <SettingsLayout active="notifications" onNavigate={onNavigate}>
      {/* Title + hint (8px gap between them) */}
      <div className="flex flex-col gap-[var(--spacing-xs)] w-full">
        <p
          className="leading-[38px] text-[28px] tracking-[0.28px] w-full"
          style={{ color: 'var(--text-n9)', fontFamily: FONT }}
        >
          Alerts
        </p>

        {/* Hint: receiver lives in Alva Agent */}
        <p
          className="leading-[20px] text-[12px] tracking-[0.12px]"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          Alerts are delivered through your Alva Agent.{' '}
          <button
            type="button"
            onClick={() => onNavigate('alva-agent')}
            className="inline-flex items-center gap-[2px] cursor-pointer bg-transparent border-none outline-none p-0 align-baseline hover:opacity-80"
            style={{ color: 'var(--main-m2)', fontFamily: FONT, fontWeight: 400 }}
          >
            Manage messaging app
            <CdnIcon name="arrow-right-l2" size={12} color="var(--main-m2)" />
          </button>
        </p>
      </div>

      {/* Subscription list */}
      <div className="flex flex-col gap-[16px] items-center w-full max-w-[960px]">
        {subs.map(s => (
          <SubscriptionCard
            key={s.id}
            sub={s}
            onOpen={() => onNavigate(s.target)}
            onCancel={() => setConfirmUnsub(s)}
            onNavigate={onNavigate}
          />
        ))}
        {subs.length === 0 && (
          <p
            className="py-[40px] text-[14px] leading-[22px] tracking-[0.14px]"
            style={{ color: 'var(--text-n5)', fontFamily: FONT }}
          >
            No alerts yet. Visit a playbook and enable Get Alerts.
          </p>
        )}
      </div>

      {/* Unsubscribe confirmation */}
      {confirmUnsub && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[28px]"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setConfirmUnsub(null)}
        >
          <div
            className="flex flex-col gap-[16px] w-[400px] max-w-full p-[24px] rounded-[12px]"
            style={{ background: 'var(--b0-container)', border: '0.5px solid var(--line-l2)', boxShadow: 'var(--shadow-l)' }}
            onClick={e => e.stopPropagation()}
          >
            <p className="leading-[26px] text-[16px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT }}>
              Cancel &ldquo;{confirmUnsub.name}&rdquo;?
            </p>
            <p className="leading-[20px] text-[12px] tracking-[0.12px]" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>
              You will stop receiving alerts from this subscription. You can re-subscribe anytime.
            </p>
            <div className="flex gap-[8px] justify-end">
              <button
                type="button"
                onClick={() => setConfirmUnsub(null)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer bg-transparent border-none outline-none hover:bg-[rgba(0,0,0,0.05)]"
                style={{ color: 'var(--text-n7)', fontFamily: FONT }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => unsubscribe(confirmUnsub.id)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer border-none outline-none hover:brightness-110"
                style={{ color: '#fff', background: 'var(--destructive)', fontFamily: FONT }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
