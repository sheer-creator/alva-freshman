/**
 * [INPUT]: SettingsLayout
 * [OUTPUT]: Alerts 设置页 — 订阅消费侧管理
 *           列出我订阅的所有 playbook 推送，渠道由 Alva Agent 管理
 *           与 Automations 形成"产 / 收"对称双页
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { SETTINGS_FONT, SettingsSection } from '@/app/components/shell/settings-ui';

/* ========== Status Dot（同 Automations） ========== */

function StatusDot() {
  return (
    <span className="relative size-[14px] shrink-0">
      <span className="absolute inset-0 rounded-full" style={{ background: '#DBEDED' }} />
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'var(--main-m1, #49A3A6)' }} />
    </span>
  );
}

/* ========== From Chip（同 Automations PlaybookChip） ========== */

interface FromPlaybook { author: string; name: string; target: Page; }

function FromChip({ playbook, onClick }: { playbook: FromPlaybook; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="h-[22px] flex items-center gap-[4px] px-[6px] py-px rounded-[4px] border-none cursor-pointer shrink-0"
      style={{ background: 'var(--b-r03, rgba(0,0,0,0.03))' }}
    >
      <Avatar name={playbook.author} size={14} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT, maxWidth: 120 }}>
        @{playbook.author}/{playbook.name}
      </span>
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
      className="shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 text-[12px] leading-[20px] tracking-[0.12px] transition-opacity hover:opacity-60"
      style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}
    >
      Cancel
    </button>
  );
}

/* ========== Subscription Card（同 Automations FeedCard 卡片规则） ========== */

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
    <button
      type="button"
      onClick={onOpen}
      className="w-full p-[20px] rounded-[8px] flex flex-col gap-[16px] text-left cursor-pointer"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)', fontFamily: SETTINGS_FONT }}
    >
      {/* Row 1: dot + name + Cancel */}
      <div className="w-full flex items-center gap-[24px]">
        <div className="flex-1 min-w-0 flex items-center gap-[8px]">
          <StatusDot />
          <p className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px] truncate" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {sub.name}
          </p>
        </div>
        <CancelButton onClick={onCancel} />
      </div>

      {/* Row 2: meta + From */}
      <div className="w-full flex flex-wrap items-center gap-[8px]">
        <div className="flex items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap shrink-0" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
          <span>Last push: {sub.lastPushAgo}</span>
          <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
          <span>{sub.weekCount} this week</span>
          {hasFrom && (
            <>
              <span style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}>|</span>
              <span>From</span>
            </>
          )}
        </div>
        {hasFrom && sub.from!.map((p, i) => (
          <FromChip key={i} playbook={p} onClick={() => onNavigate(p.target)} />
        ))}
      </div>
    </button>
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
      <SettingsSection
        title="Alerts"
        subtitle={
          <>
            Alerts are delivered through your Alva Agent.{' '}
            <button
              type="button"
              onClick={() => onNavigate('alva-agent')}
              className="inline-flex items-center gap-[2px] cursor-pointer bg-transparent border-none outline-none p-0 align-baseline hover:opacity-80"
              style={{ color: 'var(--main-m2, #2196F3)', fontFamily: SETTINGS_FONT, fontWeight: 400 }}
            >
              Manage messaging app
              <CdnIcon name="arrow-right-l2" size={12} color="var(--main-m2, #2196F3)" />
            </button>
          </>
        }
      >
        <div className="w-full flex flex-col gap-[16px]">
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
              className="py-[40px] text-center text-[14px] leading-[22px] tracking-[0.14px]"
              style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}
            >
              No alerts yet. Visit a playbook and enable Get Alerts.
            </p>
          )}
        </div>
      </SettingsSection>

      {/* Unsubscribe confirmation */}
      {confirmUnsub && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-[16px]"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setConfirmUnsub(null)}
        >
          <div
            className="w-[400px] max-w-full p-[24px] rounded-[12px] flex flex-col gap-[16px]"
            style={{ background: 'var(--b0-container, #fff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: 'var(--shadow-l)' }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: SETTINGS_FONT }}>
              Cancel &ldquo;{confirmUnsub.name}&rdquo;?
            </p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: SETTINGS_FONT }}>
              You will stop receiving alerts from this subscription. You can re-subscribe anytime.
            </p>
            <div className="flex justify-end gap-[8px]">
              <button
                type="button"
                onClick={() => setConfirmUnsub(null)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer bg-transparent border-none outline-none hover:bg-[rgba(0,0,0,0.05)]"
                style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: SETTINGS_FONT }}
              >
                Keep
              </button>
              <button
                type="button"
                onClick={() => unsubscribe(confirmUnsub.id)}
                className="px-[14px] py-[6px] rounded-[6px] text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer border-none outline-none hover:brightness-110"
                style={{ color: '#fff', background: 'var(--destructive, #e05357)', fontFamily: SETTINGS_FONT }}
              >
                Cancel Alerts
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
