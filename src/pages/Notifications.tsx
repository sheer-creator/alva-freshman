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

/* ========== 类型 ========== */

type SubscriptionType = 'alerts' | 'trade-bound';

interface Subscription {
  id: string;
  author: string;
  playbookName: string;          // url-safe slug
  displayName: string;           // human readable
  type: SubscriptionType;
  lastPushAgo: string;           // "5m" / "1h" / "—"
  weekCount: number;             // pushes received this week
  target: Page;                  // 点击跳转
}

/* ========== Mock ========== */

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    author: 'leo',
    playbookName: 'btc-momentum-1h',
    displayName: 'BTC Momentum 1h',
    type: 'trade-bound',
    lastPushAgo: '5m',
    weekCount: 24,
    target: 'screener' as Page,
  },
  {
    id: '2',
    author: 'maya',
    playbookName: 'ai-infra-digest',
    displayName: 'AI Infra Daily Digest',
    type: 'alerts',
    lastPushAgo: '1h',
    weekCount: 6,
    target: 'screener' as Page,
  },
  {
    id: '3',
    author: 'satoshi',
    playbookName: 'whale-flow-tracker',
    displayName: 'Whale Flow Tracker',
    type: 'alerts',
    lastPushAgo: '30m',
    weekCount: 18,
    target: 'screener' as Page,
  },
  {
    id: '4',
    author: 'alva',
    playbookName: 'macro-pulse',
    displayName: 'Macro Pulse',
    type: 'alerts',
    lastPushAgo: '4h',
    weekCount: 3,
    target: 'screener' as Page,
  },
  {
    id: '5',
    author: 'quantus',
    playbookName: 'defi-yield-scanner',
    displayName: 'DeFi Yield Scanner',
    type: 'alerts',
    lastPushAgo: '2d',
    weekCount: 0,
    target: 'screener' as Page,
  },
];

/* ========== Type Badge ========== */

function TypeBadge({ type }: { type: SubscriptionType }) {
  const isTrade = type === 'trade-bound';
  return (
    <span
      className="inline-flex items-center px-[6px] py-[1px] rounded-[2px] text-[11px] leading-[18px] tracking-[0.11px] shrink-0"
      style={{
        background: isTrade ? 'var(--main-m3-10)' : 'var(--main-m1-10)',
        color: isTrade ? 'var(--main-m3)' : 'var(--main-m1)',
        fontFamily: FONT,
        fontWeight: 500,
      }}
    >
      {isTrade ? 'Trade-bound' : 'Alerts'}
    </span>
  );
}

/* ========== Row Action（与 Automations 同款 16px 图标） ========== */

function RowAction({
  icon,
  label,
  onClick,
  color = 'var(--text-n9)',
}: {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="flex items-center justify-center size-[16px] shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 transition-opacity hover:opacity-60"
    >
      <CdnIcon name={icon} size={16} color={color} />
    </button>
  );
}

/* ========== Subscription Card ========== */

function SubscriptionCard({
  sub,
  onOpenPlaybook,
  onUnsubscribe,
  onManageInPortfolio,
}: {
  sub: Subscription;
  onOpenPlaybook: () => void;
  onUnsubscribe: () => void;
  onManageInPortfolio: () => void;
}) {
  const isTrade = sub.type === 'trade-bound';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpenPlaybook}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenPlaybook(); } }}
      className="flex flex-col gap-[8px] items-center justify-center p-[20px] rounded-[8px] w-full cursor-pointer transition-colors hover:brightness-[0.98]"
      style={{ background: 'var(--grey-g01)' }}
    >
      {/* Row 1: avatar + name + type badge ··· action */}
      <div className="flex gap-[12px] items-center w-full">
        <div className="flex flex-1 min-w-0 gap-[8px] items-center">
          <div className="shrink-0 size-[20px] rounded-full overflow-hidden">
            <Avatar name={sub.author} size={20} />
          </div>
          <p
            className="min-w-0 leading-[26px] text-[16px] tracking-[0.16px] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'var(--text-n9)', fontFamily: FONT }}
          >
            <span style={{ color: 'var(--text-n7)' }}>@{sub.author}/</span>
            <span>{sub.playbookName}</span>
          </p>
          <TypeBadge type={sub.type} />
        </div>

        {isTrade ? (
          <RowAction
            icon="settings-l"
            label="Manage in Portfolio"
            onClick={onManageInPortfolio}
          />
        ) : (
          <RowAction
            icon="delete-l"
            label="Unsubscribe"
            onClick={onUnsubscribe}
          />
        )}
      </div>

      {/* Row 2: meta */}
      <div className="flex flex-wrap gap-[8px] items-center w-full pl-[28px]">
        <div
          className="flex gap-[8px] items-center leading-[20px] text-[12px] tracking-[0.12px] whitespace-nowrap shrink-0"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          <p>Last push: {sub.lastPushAgo}</p>
          <p style={{ color: 'var(--text-n2)' }}>|</p>
          <p>{sub.weekCount} this week</p>
          <p style={{ color: 'var(--text-n2)' }}>|</p>
          <p>{sub.displayName}</p>
        </div>
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
          Notifications
        </p>

        {/* Hint: receiver lives in Alva Agent */}
        <p
          className="leading-[20px] text-[12px] tracking-[0.12px]"
          style={{ color: 'var(--text-n5)', fontFamily: FONT }}
        >
          Push notifications are delivered through your Alva Agent.{' '}
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
            onOpenPlaybook={() => onNavigate(s.target)}
            onUnsubscribe={() => setConfirmUnsub(s)}
            onManageInPortfolio={() => onNavigate('portfolio')}
          />
        ))}
        {subs.length === 0 && (
          <p
            className="py-[40px] text-[14px] leading-[22px] tracking-[0.14px]"
            style={{ color: 'var(--text-n5)', fontFamily: FONT }}
          >
            No subscriptions yet. Visit a playbook and enable Get Alerts.
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
              Unsubscribe from “@{confirmUnsub.author}/{confirmUnsub.playbookName}”?
            </p>
            <p className="leading-[20px] text-[12px] tracking-[0.12px]" style={{ color: 'var(--text-n5)', fontFamily: FONT }}>
              You will stop receiving pushes from this playbook. You can re-subscribe from the playbook page anytime.
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
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
