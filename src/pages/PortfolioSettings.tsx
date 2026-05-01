/**
 * [INPUT]: SettingsLayout, trading-mock
 * [OUTPUT]: Portfolio 设置页 — Broker Connections / Risk Rules / Notifications
 * [POS]: 页面层
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { SettingsLayout } from '@/app/components/shell/SettingsLayout';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { MOCK_PORTFOLIO } from '@/data/trading-mock';

const FONT = "'Delight', sans-serif";

/* ========== Section ========== */

function Section({ title, subtitle, right, children }: { title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-m)] max-w-[960px] w-full">
      <div className="flex items-start justify-between gap-[var(--spacing-m)]">
        <div className="flex flex-col gap-[2px]">
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>{title}</p>
          {subtitle && <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)', fontFamily: FONT, fontWeight: 400 }}>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ========== Switch (Alva Design System — Medium default 32×16) ========== */

function Switch({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div
      className={`switch ${on ? 'on' : ''}`}
      role="switch"
      aria-checked={on}
      onClick={() => onChange?.(!on)}
    >
      <div className="switch-thumb" />
    </div>
  );
}

/* ========== Broker Row ========== */

const BROKER_LOGOS: Record<string, { bg: string; color: string; label: string }> = {
  'Interactive Brokers': { bg: '#1c1c1c', color: '#D92323', label: 'IB' },
  'Binance':             { bg: '#f0b90b', color: '#000',    label: 'B'  },
  'Alpaca':              { bg: '#FFD200', color: '#000',    label: 'A'  },
};

type Broker = typeof MOCK_PORTFOLIO.brokers[number];

function BrokerRow({ broker }: { broker: Broker }) {
  const [connected, setConnected] = useState(broker.status === 'connected');
  const logo = BROKER_LOGOS[broker.name] ?? { bg: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.6)', label: broker.name.charAt(0) };
  const isLive = broker.name === 'Interactive Brokers' || broker.name === 'Alpaca';

  return (
    <div className="flex items-center gap-[var(--spacing-m)] p-[var(--spacing-l)] rounded-[var(--radius-ct-l)]" style={{ background: 'var(--grey-g01)' }}>
      <div className="w-[52px] h-[52px] rounded-[var(--radius-ct-m)] flex items-center justify-center shrink-0 overflow-hidden" style={{ background: logo.bg }}>
        <span className="text-[18px] font-medium" style={{ color: logo.color, fontFamily: FONT }}>{logo.label}</span>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-xxs)]">
        <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>{broker.name}</p>
        <div className="flex items-center gap-[var(--spacing-xs)]">
          <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5)', fontFamily: FONT, fontWeight: 400 }}>U***6789</span>
          <span className="text-[12px] leading-[20px] tracking-[0.12px] px-[6px] py-px rounded-[var(--radius-ct-s)]" style={{ color: isLive ? 'var(--main-m1)' : 'var(--main-m1)', background: 'var(--main-m1-10)', fontFamily: FONT }}>
            {isLive ? 'Live' : 'Spot'}
          </span>
        </div>
      </div>
      <button
        onClick={() => setConnected(v => !v)}
        className="text-[14px] leading-[22px] tracking-[0.14px] cursor-pointer shrink-0"
        style={{ color: connected ? 'var(--text-n5)' : 'var(--main-m1)', background: 'none', border: 'none', fontFamily: FONT, fontWeight: 400 }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

/* ========== Divider ========== */

function Divider() {
  return <div className="w-full" style={{ height: 0, borderTop: '0.5px solid var(--line-l07)' }} />;
}

/* ========== Card with rows separated by dividers ========== */

function CardGroup({ children }: { children: React.ReactNode[] }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-m)] p-[var(--spacing-l)] rounded-[var(--radius-ct-l)]" style={{ background: 'var(--grey-g01)' }}>
      {children.map((child, i) => (
        <div key={i}>
          {i > 0 && <Divider />}
          <div className={i > 0 ? 'pt-[var(--spacing-m)]' : ''}>{child}</div>
        </div>
      ))}
    </div>
  );
}

/* ========== Risk Row ========== */

function RiskRow({ label, value, editable = true }: { label: string; value: string; editable?: boolean }) {
  const [on, setOn] = useState(editable);
  return (
    <div className="flex items-center gap-[var(--spacing-l)]">
      <span className="flex-1 text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>{label}</span>
      {on && (
        <div className="flex items-center gap-[var(--spacing-xxs)]">
          <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
          <CdnIcon name="edit-l1" size={18} color="rgba(0,0,0,0.5)" />
        </div>
      )}
      <Switch on={on} onChange={setOn} />
    </div>
  );
}

/* ========== Page ========== */

export default function PortfolioSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const P = MOCK_PORTFOLIO;

  return (
    <SettingsLayout active="portfolio-settings" onNavigate={onNavigate}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'var(--text-n9)', fontFamily: FONT, fontWeight: 400 }}>Portfolio</h1>

      {/* Broker Connections */}
      <Section
        title="Broker Connections"
        subtitle="Connect your brokerage accounts to enable trading."
        right={
          <button className="btn btn-secondary btn-medium" style={{ paddingLeft: 'var(--spacing-m)', paddingRight: 'var(--spacing-m)', gap: 'var(--spacing-xxs)' }}>
            <CdnIcon name="add-l2" size={18} color="rgba(0,0,0,0.9)" />
            <span style={{ fontFamily: FONT }}>Add</span>
          </button>
        }
      >
        <div className="flex flex-col gap-[var(--spacing-m)]">
          {P.brokers.map(b => <BrokerRow key={b.id} broker={b} />)}
        </div>
      </Section>

      {/* Global Risk Rules */}
      <Section title="Global Risk Rules" subtitle="Applies to all strategy bindings">
        <CardGroup>
          {[
            <RiskRow key="1" label="Max Single Order" value={`$${P.risk.maxOrderSize.toLocaleString()}`} />,
            <RiskRow key="2" label="Max Daily Turnover" value={`$${P.risk.maxDailyTurnover.toLocaleString()}`} editable={false} />,
            <RiskRow key="3" label="Max Daily Orders" value={P.risk.maxDailyOrders.toString()} />,
          ]}
        </CardGroup>
      </Section>

    </SettingsLayout>
  );
}
