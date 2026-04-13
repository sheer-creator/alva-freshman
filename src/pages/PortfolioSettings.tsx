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
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{title}</p>
          {subtitle && <p className="text-[12px] leading-[20px] tracking-[0.12px] mt-[2px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ========== Toggle ========== */

function Toggle({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange?.(!on)}
      className="cursor-pointer shrink-0"
      style={{
        width: 40, height: 22, borderRadius: 11, border: 'none',
        background: on ? '#49a3a6' : 'rgba(0,0,0,0.15)',
        position: 'relative', transition: 'background 0.2s', padding: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2, left: on ? 20 : 2,
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </button>
  );
}

/* ========== Broker Row ========== */

const BROKER_LOGOS: Record<string, { bg: string; color: string; label: string }> = {
  'Interactive Brokers': { bg: '#1A1A1A',  color: '#D92323', label: 'IB' },
  'Binance':             { bg: '#F3BA2F',  color: '#000',    label: 'B'  },
  'Alpaca':              { bg: '#FFD200',  color: '#000',    label: 'A'  },
};

type Broker = typeof MOCK_PORTFOLIO.brokers[number];

function BrokerRow({ broker }: { broker: Broker }) {
  const [connected, setConnected] = useState(broker.status === 'connected');
  const logo = BROKER_LOGOS[broker.name] ?? { bg: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.6)', label: broker.name.charAt(0) };
  const isLive = broker.name === 'Interactive Brokers' || broker.name === 'Alpaca';

  return (
    <div className="flex items-center gap-[16px] px-[20px] py-[16px] rounded-[8px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
      <div className="w-[40px] h-[40px] rounded-[6px] flex items-center justify-center shrink-0" style={{ background: logo.bg }}>
        <span className="text-[16px] font-medium" style={{ color: logo.color, fontFamily: FONT }}>{logo.label}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[8px]">
          <span className="text-[14px] leading-[22px] font-medium" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{broker.name}</span>
        </div>
        <div className="flex items-center gap-[8px] mt-[2px]">
          <span className="text-[12px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.5)', fontFamily: FONT }}>U***6789</span>
          <span className="text-[11px] leading-[18px] tracking-[0.11px] px-[6px] rounded-full" style={{ color: isLive ? '#49a3a6' : '#e6a91a', background: isLive ? 'rgba(73,163,166,0.1)' : 'rgba(230,169,26,0.1)', fontFamily: FONT }}>
            {isLive ? 'Live' : 'Spot'}
          </span>
        </div>
      </div>
      <button
        onClick={() => setConnected(v => !v)}
        className="text-[13px] leading-[22px] cursor-pointer"
        style={{ color: connected ? 'rgba(0,0,0,0.5)' : '#49a3a6', background: 'none', border: 'none', fontFamily: FONT }}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

/* ========== Risk Row ========== */

function RiskRow({ label, value, editable = true }: { label: string; value: string; editable?: boolean }) {
  const [on, setOn] = useState(editable);
  return (
    <div className="flex items-center gap-[16px] px-[20px] py-[14px] rounded-[8px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
      <span className="flex-1 text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{label}</span>
      {on && (
        <div className="flex items-center gap-[6px]">
          <span className="text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
          <CdnIcon name="edit-l1" size={14} color="rgba(0,0,0,0.5)" />
        </div>
      )}
      <Toggle on={on} onChange={setOn} />
    </div>
  );
}

/* ========== Notification Row ========== */

function NotifRow({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-[16px] px-[20px] py-[14px] rounded-[8px]" style={{ background: 'rgba(0,0,0,0.02)' }}>
      <span className="flex-1 text-[14px] leading-[22px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT }}>{label}</span>
      <Toggle on={on} onChange={setOn} />
    </div>
  );
}

/* ========== Page ========== */

export default function PortfolioSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const P = MOCK_PORTFOLIO;

  return (
    <SettingsLayout active="portfolio-settings" onNavigate={onNavigate}>

      <h1 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'rgba(0,0,0,0.9)', fontFamily: FONT, fontWeight: 400 }}>Portfolio</h1>

      {/* Broker Connections */}
      <Section
        title="Broker Connections"
        subtitle="Connect your brokerage accounts to enable trading."
        right={
          <button className="flex items-center gap-[4px] h-[28px] px-[12px] rounded-[6px] text-[12px] font-medium cursor-pointer" style={{ color: 'rgba(0,0,0,0.9)', border: '0.5px solid rgba(0,0,0,0.3)', background: 'transparent', fontFamily: FONT }}>
            <span className="text-[14px] leading-none">+</span>
            Add
          </button>
        }
      >
        <div className="flex flex-col gap-[8px]">
          {P.brokers.map(b => <BrokerRow key={b.id} broker={b} />)}
        </div>
      </Section>

      {/* Global Risk Rules */}
      <Section title="Global Risk Rules" subtitle="Applies to all strategy bindings.">
        <div className="flex flex-col gap-[8px]">
          <RiskRow label="Max Single Order"  value={`$${P.risk.maxOrderSize.toLocaleString()}`} />
          <RiskRow label="Max Daily Turnover" value={`$${P.risk.maxDailyTurnover.toLocaleString()}`} editable={false} />
          <RiskRow label="Max Daily Orders"   value={P.risk.maxDailyOrders.toString()} />
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" subtitle="Configure alerts and daily reports.">
        <div className="flex flex-col gap-[8px]">
          <NotifRow label="Order filled" />
          <NotifRow label="Rebalance triggered" />
          <NotifRow label="Risk alert" />
          <NotifRow label="Daily P&L summary" defaultOn={false} />
        </div>
      </Section>
    </SettingsLayout>
  );
}
