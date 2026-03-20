/**
 * [INPUT]: AppShell, trading-mock
 * [OUTPUT]: Portfolio 设置页 — Broker / Risk / Kill Switch / Notifications
 * [POS]: 页面层 — Portfolio 配置管理
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { MOCK_PORTFOLIO } from '@/data/trading-mock';

const P = MOCK_PORTFOLIO;
const FONT_FAMILY = "'Delight', sans-serif";
const CARD_BG: React.CSSProperties = { background: 'var(--grey-g01)', borderRadius: 4 };
const DIVIDER: React.CSSProperties = { background: 'var(--line-l05)', height: 1 };

/* ========== Section ========== */

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div>
        <p className="text-[15px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{title}</p>
        {subtitle && <p className="text-[12px] mt-[2px]" style={{ color: 'var(--text-n3)' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/* ========== Broker Card ========== */

function BrokerCard({ broker }: { broker: typeof P.brokers[0] }) {
  const [connected, setConnected] = useState(broker.status === 'connected');
  return (
    <div className="flex items-center justify-between" style={{ ...CARD_BG, padding: '16px 20px' }}>
      <div className="flex items-center gap-[14px]">
        <div className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center shrink-0" style={{
          background: connected ? 'rgba(73,163,166,0.08)' : 'rgba(0,0,0,0.03)',
          border: connected ? '1px solid rgba(73,163,166,0.15)' : '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.2s',
        }}>
          <span className="text-[15px] font-medium" style={{ color: connected ? '#49a3a6' : 'var(--text-n3)', fontFamily: FONT_FAMILY }}>{broker.name.charAt(0)}</span>
        </div>
        <div>
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{broker.name}</span>
            <span className="text-[10px] px-[6px] py-[2px] rounded-full uppercase tracking-[0.04em] transition-colors" style={{
              background: connected ? 'rgba(64,165,68,0.08)' : 'rgba(224,83,87,0.08)',
              color: connected ? 'var(--main-m3)' : 'var(--main-m4)',
            }}>{connected ? 'connected' : 'disconnected'}</span>
          </div>
          <div className="flex items-center gap-[6px] mt-[3px]">
            <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{broker.accountId}</span>
            <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>&middot;</span>
            <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>Synced {broker.lastSync}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setConnected(v => !v)}
        className="transition-colors hover:opacity-80"
        style={{
          background: 'transparent', border: '0.5px solid var(--line-l3)',
          padding: '5px 14px', borderRadius: 4, fontSize: 12,
          color: connected ? 'var(--text-n5)' : '#49a3a6',
          cursor: 'pointer', fontFamily: FONT_FAMILY,
        }}
      >{connected ? 'Disconnect' : 'Connect'}</button>
    </div>
  );
}

/* ========== Risk Rule ========== */

function RiskRule({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between py-[14px]">
        <span className="text-[13px]" style={{ color: 'var(--text-n7)' }}>{label}</span>
        <span className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      </div>
      {!last && <div style={DIVIDER} />}
    </>
  );
}

/* ========== Toggle ========== */

function Toggle({ label, defaultOn = true, last }: { label: string; defaultOn?: boolean; last?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <>
      <div className="flex items-center justify-between py-[12px]">
        <span className="text-[13px]" style={{ color: 'var(--text-n7)' }}>{label}</span>
        <button
          onClick={() => setOn(v => !v)}
          style={{
            width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
            background: on ? '#49a3a6' : 'rgba(0,0,0,0.1)',
            position: 'relative', transition: 'background 0.2s',
          }}
        >
          <div style={{
            width: 16, height: 16, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 2,
            left: on ? 18 : 2,
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }} />
        </button>
      </div>
      {!last && <div style={DIVIDER} />}
    </>
  );
}

/* ========== 页面 ========== */

export default function PortfolioSettings({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [killSwitch, setKillSwitch] = useState(P.risk.killSwitch);

  return (
    <AppShell activePage="portfolio-settings" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col gap-[36px] px-[28px] pt-[24px] relative w-full max-w-[640px]">

          {/* Header — 返回键左对齐 */}
          <div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-[12px] cursor-pointer mb-[8px] block hover:opacity-70 transition-opacity text-left"
              style={{ background: 'none', border: 'none', color: '#49a3a6', fontFamily: FONT_FAMILY, padding: 0 }}
            >← Back to Portfolio</button>
            <p className="text-[24px] leading-[32px]" style={{ color: 'var(--text-n9)', fontWeight: 400, fontFamily: FONT_FAMILY, letterSpacing: '-0.01em' }}>Settings</p>
          </div>

          {/* Broker Connections */}
          <Section title="Broker Connections" subtitle="Connect your brokerage accounts to enable trading">
            <div className="flex flex-col gap-[6px]">
              {P.brokers.map(b => <BrokerCard key={b.id} broker={b} />)}
            </div>
            <button
              className="transition-colors hover:border-[#49a3a6]"
              style={{
                width: '100%', padding: '11px 0', borderRadius: 4,
                border: '1px dashed var(--line-l3)', background: 'transparent',
                color: '#49a3a6', fontSize: 13, cursor: 'pointer',
                fontFamily: FONT_FAMILY,
              }}
            >+ Connect Broker</button>
          </Section>

          {/* Global Risk Rules */}
          <Section title="Global Risk Rules" subtitle="Applies to all strategy bindings">
            <div style={{ ...CARD_BG, padding: '2px 20px' }}>
              <RiskRule label="Max Single Order" value={`$${P.risk.maxOrderSize.toLocaleString()}`} />
              <RiskRule label="Max Daily Turnover" value={`$${P.risk.maxDailyTurnover.toLocaleString()}`} />
              <RiskRule label="Max Daily Orders" value={P.risk.maxDailyOrders.toString()} last />
            </div>
          </Section>

          {/* Kill Switch */}
          <Section title="Kill Switch" subtitle="Emergency stop for all automated trading">
            <div style={{
              ...CARD_BG, padding: 20,
              background: killSwitch ? 'rgba(224,83,87,0.04)' : 'var(--grey-g01)',
              border: killSwitch ? '1px solid rgba(224,83,87,0.2)' : '1px solid transparent',
              transition: 'all 0.3s',
            }}>
              <div className="flex items-center justify-between mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full" style={{ background: killSwitch ? 'var(--main-m4)' : 'var(--main-m3)' }} />
                  <span className="text-[13px]" style={{ color: killSwitch ? 'var(--main-m4)' : 'var(--main-m3)', fontWeight: 500 }}>
                    {killSwitch ? 'Trading Paused' : 'Trading Active'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setKillSwitch(v => !v)}
                className="transition-all"
                style={{
                  width: '100%', padding: '12px 0', borderRadius: 6,
                  border: 'none', cursor: 'pointer',
                  background: killSwitch ? 'var(--main-m3)' : 'var(--main-m4)',
                  color: '#fff', fontSize: 13, fontWeight: 500,
                  fontFamily: FONT_FAMILY, letterSpacing: '0.02em',
                }}
              >{killSwitch ? 'Resume Trading' : 'Stop All Trading'}</button>
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" subtitle="Configure alerts and daily reports">
            <div style={{ ...CARD_BG, padding: '2px 20px' }}>
              <Toggle label="Order filled" />
              <Toggle label="Rebalance triggered" />
              <Toggle label="Risk alert" />
              <Toggle label="Daily P&L summary" defaultOn={false} last />
            </div>
          </Section>

        </div>
      </div>
    </AppShell>
  );
}
