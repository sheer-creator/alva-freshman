/**
 * [INPUT]: AppShell, trading-mock, chart-theme, PulseIndicator
 * [OUTPUT]: Portfolio 主页面 — Overview / Strategies / Activity 三个 Tab
 * [POS]: 页面层 — 展示用户交易组合全貌
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { AlvaWatermark } from '@/app/components/alva-ui-kit';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import ReactECharts from 'echarts-for-react';
import {
  CHART_DOT_BG, CHART_COLORS, FONT,
  tooltipConfig, tooltipFormatter, timeXAxisConfig, valueYAxisConfig,
  lineSeriesConfig, GRID_DEFAULT,
} from '@/lib/chart-theme';
import { MOCK_PORTFOLIO } from '@/data/trading-mock';
import type { StrategyBinding, WeightBar } from '@/data/trading-mock';

const P = MOCK_PORTFOLIO;

/* ========== 通用样式常量 ========== */

const FONT_FAMILY = "'Delight', sans-serif";
const CARD_BG: React.CSSProperties = { background: 'var(--grey-g01)', borderRadius: 4 };
const DIVIDER: React.CSSProperties = { background: 'var(--line-l05)', height: 1 };
const LABEL: React.CSSProperties = { fontSize: 12, color: 'var(--text-n5)', fontFamily: FONT_FAMILY, lineHeight: '18px' };
const MONO: React.CSSProperties = { fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums' };

/* ========== StatItem ========== */

function StatItem({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex-1 min-w-0" style={{ ...CARD_BG, padding: '16px 20px' }}>
      <p className="text-[20px] leading-[28px]" style={{ color: accent ? '#49a3a6' : 'var(--text-n9)', ...MONO, fontWeight: 400 }}>{value}</p>
      <p className="text-[12px] mt-[2px]" style={LABEL}>{label}</p>
    </div>
  );
}

/* ========== Portfolio Header ========== */

function PortfolioHeader({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const pnlColor = P.todayPnl >= 0 ? 'var(--main-m3, #40A544)' : 'var(--main-m4, #E05357)';
  const pnlSign = P.todayPnl >= 0 ? '+' : '';
  const connectedBrokers = P.brokers.filter(b => b.status === 'connected').length;
  const noBrokers = connectedBrokers === 0;

  return (
    <div style={{ ...CARD_BG, padding: '20px 24px' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-[16px]">
          <span className="text-[32px] leading-[40px]" style={{ color: '#49a3a6', fontFamily: FONT_FAMILY, fontWeight: 500, letterSpacing: '-0.02em' }}>
            ${P.totalEquity.toLocaleString()}
          </span>
          <span className="text-[14px]" style={{ color: pnlColor, fontFamily: FONT_FAMILY, ...MONO }}>
            {pnlSign}${P.todayPnl.toLocaleString()} ({pnlSign}{P.todayPnlPercent}%)
          </span>
          <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>today</span>
        </div>
        <button
          onClick={() => onNavigate('portfolio-settings')}
          className="flex items-center gap-[6px] shrink-0 hover:border-[rgba(0,0,0,0.4)] transition-colors"
          style={{ padding: '6px 14px', borderRadius: 6, border: '0.5px solid var(--line-l3)', background: 'transparent', cursor: 'pointer', fontFamily: FONT_FAMILY, fontSize: 12, color: 'var(--text-n5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 2L5.65 1.3C5.72 1 5.98 0.8 6.28 0.8H7.72C8.02 0.8 8.28 1 8.35 1.3L8.5 2L9.2 2.4L9.9 2.17C10.2 2.07 10.52 2.15 10.72 2.4L11.44 3.4C11.6 3.65 11.58 3.97 11.38 4.2L10.9 4.75L11.05 5.55L11.8 5.8C12.1 5.88 12.3 6.15 12.3 6.45V7.55C12.3 7.85 12.1 8.12 11.8 8.2L11.05 8.45L10.9 9.25L11.38 9.8C11.58 10.03 11.6 10.35 11.44 10.6L10.72 11.6C10.52 11.85 10.2 11.93 9.9 11.83L9.2 11.6L8.5 12L8.35 12.7C8.28 13 8.02 13.2 7.72 13.2H6.28C5.98 13.2 5.72 13 5.65 12.7L5.5 12L4.8 11.6L4.1 11.83C3.8 11.93 3.48 11.85 3.28 11.6L2.56 10.6C2.4 10.35 2.42 10.03 2.62 9.8L3.1 9.25L2.95 8.45L2.2 8.2C1.9 8.12 1.7 7.85 1.7 7.55V6.45C1.7 6.15 1.9 5.88 2.2 5.8L2.95 5.55L3.1 4.75L2.62 4.2C2.42 3.97 2.4 3.65 2.56 3.4L3.28 2.4C3.48 2.15 3.8 2.07 4.1 2.17L4.8 2.4L5.5 2Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
            <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="0.9" fill="none" />
          </svg>
          Settings
        </button>
      </div>
      {/* Onboarding hint when no brokers connected */}
      {noBrokers && (
        <div className="flex items-center gap-[8px] mt-[14px] py-[10px] px-[14px] rounded-[6px]" style={{ background: 'rgba(73,163,166,0.05)', border: '0.5px dashed rgba(73,163,166,0.25)' }}>
          <span className="text-[12px]" style={{ color: 'var(--text-n5)', lineHeight: '18px' }}>
            Connect a broker in <span className="cursor-pointer underline" style={{ color: '#49a3a6' }} onClick={() => onNavigate('portfolio-settings')}>Settings</span> to start trading with your strategies.
          </span>
        </div>
      )}
    </div>
  );
}

/* ========== Equity Curve (Overview 主图) ========== */

function EquityCurveChart() {
  const values = P.equityCurve.map(([, v]) => v);
  const yMin = Math.floor(Math.min(...values) / 5000) * 5000;

  const option = {
    tooltip: tooltipConfig({
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '$', v => v.toLocaleString()),
    }),
    grid: { ...GRID_DEFAULT, top: 24, bottom: 24, left: 48 },
    xAxis: timeXAxisConfig(),
    yAxis: valueYAxisConfig('', {
      min: yMin,
      axisLabel: {
        color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontSize: 10,
        formatter: (v: number) => '$' + (v / 1000).toFixed(0) + 'K',
      },
    }),
    series: [
      lineSeriesConfig('Portfolio Value', CHART_COLORS.primary, {
        data: P.equityCurve,
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(73,163,166,0.12)' },
            { offset: 1, color: 'rgba(73,163,166,0)' },
          ]},
        },
      }),
    ],
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center justify-between" style={{ height: 22 }}>
        <p className="text-[14px]" style={{ color: 'var(--text-n9)', letterSpacing: 0.14 }}>Equity Curve</p>
        <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>6 months</span>
      </div>
      <div className="relative" style={{ ...CHART_DOT_BG, borderRadius: 4, padding: 16, minHeight: 220 }}>
        <ReactECharts option={option} style={{ height: 220 }} notMerge />
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Positions Table ========== */

/* 列宽: symbol 宽一点不换行, weight 新增, strategy 允许多个 */
const TH: React.CSSProperties = { ...LABEL, fontWeight: 500 };

function PositionsTable() {
  const [brokerFilter, setBrokerFilter] = useState<string | null>(null);
  const connectedBrokers = P.brokers.filter(b => b.status === 'connected');
  const brokerLabel = (name: string) => name === 'Interactive Brokers' ? 'IBKR' : name;

  const filtered = brokerFilter
    ? P.positions.filter(pos => pos.account === brokerFilter)
    : P.positions;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[10px]">
        <p className="text-[14px]" style={{ color: 'var(--text-n9)', letterSpacing: 0.14 }}>Positions</p>
        {/* Broker filter pills */}
        <div className="flex items-center gap-[4px]">
          <button
            onClick={() => setBrokerFilter(null)}
            className="flex items-center gap-[4px] text-[11px] px-[8px] py-[3px] rounded-full cursor-pointer transition-colors"
            style={{
              background: !brokerFilter ? 'rgba(73,163,166,0.1)' : 'transparent',
              color: !brokerFilter ? '#49a3a6' : 'var(--text-n3)',
              border: 'none', fontFamily: FONT_FAMILY,
            }}
          >All</button>
          {connectedBrokers.map(b => {
            const label = brokerLabel(b.name);
            const active = brokerFilter === label;
            return (
              <button
                key={b.id}
                onClick={() => setBrokerFilter(active ? null : label)}
                className="flex items-center gap-[4px] text-[11px] px-[8px] py-[3px] rounded-full cursor-pointer transition-colors"
                style={{
                  background: active ? 'rgba(73,163,166,0.1)' : 'transparent',
                  color: active ? '#49a3a6' : 'var(--text-n3)',
                  border: 'none', fontFamily: FONT_FAMILY,
                }}
              >
                <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--main-m3, #40A544)' }} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ ...CARD_BG, overflow: 'hidden' }}>
        {/* Header */}
        <div className="grid items-center px-[20px] py-[10px]" style={{ gridTemplateColumns: '180px 56px 56px 88px 88px 88px 130px 72px 1fr', gap: 8, borderBottom: '1px solid var(--line-l05)' }}>
          <span style={TH}>Symbol</span>
          <span style={{ ...TH, textAlign: 'right' }}>Weight</span>
          <span style={{ ...TH, textAlign: 'right' }}>Qty</span>
          <span style={{ ...TH, textAlign: 'right' }}>Avg Cost</span>
          <span style={{ ...TH, textAlign: 'right' }}>Current</span>
          <span style={{ ...TH, textAlign: 'right' }}>Value</span>
          <span style={{ ...TH, textAlign: 'right' }}>P&L</span>
          <span style={{ ...TH, textAlign: 'right' }}>Broker</span>
          <span style={{ ...TH, textAlign: 'right' }}>Strategy</span>
        </div>
        {/* Rows */}
        {filtered.map((pos, i) => {
          const pnlColor = pos.pnl >= 0 ? 'var(--main-m3)' : 'var(--main-m4)';
          const sign = pos.pnl >= 0 ? '+' : '';
          return (
            <div key={pos.symbol} className="grid items-center px-[20px] py-[11px] relative hover:bg-[rgba(0,0,0,0.015)] transition-colors" style={{ gridTemplateColumns: '180px 56px 56px 88px 88px 88px 130px 72px 1fr', gap: 8 }}>
              <div className="flex items-baseline gap-[6px] min-w-0 whitespace-nowrap">
                <span className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{pos.symbol}</span>
                <span className="text-[11px] truncate" style={{ color: 'var(--text-n3)' }}>{pos.name}</span>
              </div>
              <span className="text-[12px] text-right" style={{ color: 'var(--text-n7)', ...MONO }}>{pos.weight}%</span>
              <span className="text-[12px] text-right" style={{ color: 'var(--text-n7)', ...MONO }}>{pos.qty}</span>
              <span className="text-[12px] text-right" style={{ color: 'var(--text-n5)', ...MONO }}>${pos.avgCost.toLocaleString()}</span>
              <span className="text-[12px] text-right" style={{ color: 'var(--text-n7)', ...MONO }}>${pos.currentPrice.toLocaleString()}</span>
              <span className="text-[12px] text-right" style={{ color: 'var(--text-n9)', ...MONO }}>${pos.marketValue.toLocaleString()}</span>
              <span className="text-[12px] text-right" style={{ color: pnlColor, ...MONO }}>
                {sign}${pos.pnl.toLocaleString()} <span style={{ opacity: 0.6 }}>({sign}{pos.pnlPercent}%)</span>
              </span>
              <span className="text-[11px] text-right" style={{ color: 'var(--text-n5)' }}>{pos.account}</span>
              <div className="flex flex-col items-end gap-[2px]">
                {pos.sourceStrategies.map(s => (
                  <span key={s} className="flex items-center gap-[4px] text-[10px] whitespace-nowrap">
                    <span className="px-[6px] py-[1px] rounded-[3px]" style={{ background: 'rgba(73,163,166,0.08)', color: '#49a3a6' }}>{s}</span>
                    {pos.sourceStrategies.length > 1 && pos.allocations[s] != null && (
                      <span style={{ color: 'var(--text-n3)', ...MONO, fontSize: 10 }}>${(pos.allocations[s] / 1000).toFixed(1)}K</span>
                    )}
                  </span>
                ))}
              </div>
              {i < filtered.length - 1 && (
                <div className="absolute bottom-0 left-[20px] right-[20px]" style={{ ...DIVIDER, gridColumn: '1 / -1' }} />
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-[32px] text-center">
            <span className="text-[13px]" style={{ color: 'var(--text-n3)' }}>No positions for this broker</span>
          </div>
        )}
        <AlvaWatermark />
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-[24px]">
      <EquityCurveChart />
      <PositionsTable />
    </div>
  );
}

/* ========== Strategies Tab ========== */

function WeightBarRow({ w }: { w: WeightBar }) {
  const maxWeight = Math.max(w.currentWeight, w.targetWeight, 0.01);
  const barScale = 1 / (maxWeight * 1.3);
  const aligned = Math.abs(w.drift) < 0.005;
  const driftSign = w.drift >= 0 ? '+' : '';

  return (
    <div className="flex items-center gap-[10px] py-[5px]">
      <span className="text-[11px] w-[36px] shrink-0" style={{ color: 'var(--text-n9)', fontWeight: 500, fontFamily: FONT_FAMILY }}>{w.symbol}</span>
      <div className="flex-1 h-[12px] relative" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 6 }}>
        {/* Target: subtle dashed outline */}
        <div className="absolute top-0 bottom-0 left-0 rounded-[6px]" style={{
          width: `${w.targetWeight * barScale * 100}%`,
          border: '1px dashed rgba(73,163,166,0.3)',
        }} />
        {/* Current fill */}
        <div className="absolute top-0 bottom-0 left-0 rounded-[6px]" style={{
          width: `${w.currentWeight * barScale * 100}%`,
          background: aligned
            ? 'linear-gradient(90deg, rgba(73,163,166,0.35), rgba(73,163,166,0.5))'
            : 'linear-gradient(90deg, rgba(73,163,166,0.7), #49a3a6)',
        }} />
      </div>
      <span className="text-[11px] w-[72px] shrink-0 text-right" style={{ color: 'var(--text-n5)', ...MONO }}>
        {(w.currentWeight * 100).toFixed(0)}% → {(w.targetWeight * 100).toFixed(0)}%
      </span>
      <span className="text-[11px] w-[44px] shrink-0 text-right" style={{ color: aligned ? 'var(--main-m3)' : 'var(--text-n7)', ...MONO }}>
        {aligned ? '✓' : `${driftSign}${(w.drift * 100).toFixed(1)}%`}
      </span>
    </div>
  );
}

function StrategyCard({ s, onNavigate }: { s: StrategyBinding; onNavigate: (page: Page) => void }) {
  const pnlColor = s.pnl >= 0 ? 'var(--main-m3)' : 'var(--main-m4)';
  const pnlSign = s.pnl >= 0 ? '+' : '';

  return (
    <div style={{ ...CARD_BG, padding: '20px 24px' }}>
      {/* Title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <span
            className="text-[15px] cursor-pointer hover:underline"
            style={{ color: 'var(--text-n9)', fontWeight: 500 }}
            onClick={() => onNavigate('btc-playbook')}
          >{s.playbookName}</span>
          <span className="text-[12px]" style={{ color: 'var(--text-n3)' }}>by @{s.author}</span>
          <PulseIndicator status={s.status === 'paused' ? 'idle' : 'active'} />
        </div>
        <span className="text-[11px] px-[8px] py-[2px] rounded-full" style={{
          background: s.mode === 'auto' ? 'rgba(64,165,68,0.08)' : 'rgba(73,163,166,0.08)',
          color: s.mode === 'auto' ? 'var(--main-m3)' : '#49a3a6',
        }}>{s.mode === 'auto' ? 'Auto' : 'Approval'}</span>
      </div>

      {/* Data grid */}
      {(() => {
        const virtualNav = s.allocationValue + s.pnl;
        return (
          <div className="grid grid-cols-5 gap-[16px] mt-[16px] mb-[16px] py-[14px] px-[16px] rounded-[4px]" style={{ background: 'rgba(0,0,0,0.015)' }}>
            <div>
              <p className="text-[11px] mb-[2px]" style={LABEL}>Allocated</p>
              <p className="text-[14px] leading-[20px]" style={{ color: 'var(--text-n9)', ...MONO }}>
                ${s.allocationValue.toLocaleString()}<span className="text-[11px] ml-[4px]" style={{ opacity: 0.6 }}>{s.allocation}%</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] mb-[2px]" style={LABEL}>Virtual NAV</p>
              <p className="text-[14px] leading-[20px]" style={{ color: '#49a3a6', ...MONO }}>
                ${virtualNav.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[11px] mb-[2px]" style={LABEL}>P&L</p>
              <p className="text-[14px] leading-[20px]" style={{ color: pnlColor, ...MONO }}>
                {pnlSign}${s.pnl.toLocaleString()}<span className="text-[11px] ml-[4px]" style={{ opacity: 0.6 }}>{pnlSign}{s.pnlPercent}%</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] mb-[2px]" style={LABEL}>Broker</p>
              <p className="text-[14px] leading-[20px]" style={{ color: 'var(--text-n9)', ...MONO }}>{s.broker}</p>
            </div>
            <div>
              <p className="text-[11px] mb-[2px]" style={LABEL}>Last Rebalance</p>
              <p className="text-[14px] leading-[20px]" style={{ color: 'var(--text-n7)', ...MONO }}>{s.lastRebalance}</p>
            </div>
          </div>
        );
      })()}

      {/* Weight bars */}
      <div className="mb-[16px]">
        {s.weights.map(w => <WeightBarRow key={w.symbol} w={w} />)}
      </div>

      {/* Divider */}
      <div style={DIVIDER} />

      {/* Actions — 主操作左, 次操作右, pending 提示居中 */}
      <div className="flex items-center justify-between mt-[14px]">
        <div className="flex items-center gap-[6px]">
          <button
            className="transition-colors hover:opacity-90"
            style={{ padding: '6px 16px', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontFamily: FONT_FAMILY, fontWeight: 500, background: '#49a3a6', color: '#fff', border: 'none' }}
          >Rebalance Now</button>
          {s.pendingOrders > 0 && (
            <span className="text-[11px] px-[8px] py-[3px] rounded-full" style={{ background: 'rgba(230,169,26,0.1)', color: '#E6A91A' }}>
              {s.pendingOrders} awaiting approval
            </span>
          )}
        </div>
        <div className="flex items-center gap-[4px]">
          <button className="transition-colors hover:text-[var(--text-n7)]" style={{ padding: '6px 12px', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontFamily: FONT_FAMILY, background: 'none', color: 'var(--text-n3)', border: 'none' }}>Pause</button>
          <span style={{ color: 'var(--line-l3)', fontSize: 10 }}>|</span>
          <button className="transition-colors hover:text-[var(--text-n7)]" style={{ padding: '6px 12px', borderRadius: 4, fontSize: 12, cursor: 'pointer', fontFamily: FONT_FAMILY, background: 'none', color: 'var(--text-n3)', border: 'none' }}>Unbind</button>
        </div>
      </div>
    </div>
  );
}

function StrategiesTab({ onNavigate }: { onNavigate: (page: Page) => void }) {
  /* 双列布局 */
  const rows: StrategyBinding[][] = [];
  for (let i = 0; i < P.strategies.length; i += 2) rows.push(P.strategies.slice(i, i + 2));

  return (
    <div className="flex flex-col gap-[12px]">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-[12px]">
          {row.map(s => (
            <div key={s.id} className="flex-1 min-w-0">
              <StrategyCard s={s} onNavigate={onNavigate} />
            </div>
          ))}
          {row.length < 2 && <div className="flex-1 min-w-0" />}
        </div>
      ))}
    </div>
  );
}

/* ========== Activity Tab (merged Orders + Journal) ========== */

function ActivityTab() {
  const pendingOrders = P.orders.filter(o => o.status === 'pending');

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Pending approval section — only if there are pending orders */}
      {pendingOrders.length > 0 && (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#E6A91A' }} />
            <p className="text-[13px]" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>Pending Approval</p>
            <span className="text-[11px] px-[6px] py-[1px] rounded-full" style={{ background: 'rgba(230,169,26,0.1)', color: '#E6A91A' }}>{pendingOrders.length}</span>
          </div>
          <div style={{ ...CARD_BG, overflow: 'hidden', border: '1px solid rgba(230,169,26,0.15)' }}>
            {pendingOrders.map((o, i) => (
              <div key={o.id} className="px-[20px] py-[12px] relative">
                <div className="flex items-center gap-[12px]">
                  <span className="text-[10px] uppercase w-[28px] shrink-0 text-center py-[2px] rounded-[3px] font-medium" style={{ color: '#fff', background: o.side === 'buy' ? 'var(--main-m3)' : 'var(--main-m4)', letterSpacing: '0.04em' }}>{o.side}</span>
                  <span className="text-[13px] w-[48px] shrink-0" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{o.symbol}</span>
                  <span className="text-[12px]" style={{ color: 'var(--text-n7)', ...MONO }}>
                    {o.qty} x ${o.price.toLocaleString()} <span style={{ color: 'var(--text-n3)' }}>{o.type}</span>
                  </span>
                  <span className="text-[11px] px-[6px] py-[2px] rounded-[3px]" style={{ background: 'rgba(73,163,166,0.08)', color: '#49a3a6' }}>{o.sourceStrategy}</span>
                  <div className="flex items-center gap-[4px] ml-auto">
                    <button className="transition-colors hover:opacity-90" style={{ background: '#49a3a6', color: '#fff', border: 'none', padding: '4px 14px', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontFamily: FONT_FAMILY, fontWeight: 500 }}>Approve</button>
                    <button className="transition-colors" style={{ background: 'transparent', color: 'var(--main-m4)', border: '0.5px solid rgba(224,83,87,0.25)', padding: '4px 14px', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontFamily: FONT_FAMILY }}>Reject</button>
                  </div>
                </div>
                {o.reason && (
                  <p className="text-[11px] mt-[4px] ml-[40px]" style={{ color: 'var(--text-n3)' }}>{o.reason}</p>
                )}
                {i < pendingOrders.length - 1 && <div className="absolute bottom-0 left-[20px] right-[20px]" style={DIVIDER} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade history by date */}
      {P.journal.map(entry => (
        <div key={entry.date}>
          <p className="text-[12px] mb-[8px] uppercase tracking-[0.05em]" style={{ color: 'var(--text-n3)', fontWeight: 500 }}>{entry.date}</p>
          <div style={{ ...CARD_BG, overflow: 'hidden' }}>
            {entry.trades.map((t, i) => {
              const sideColor = t.side === 'buy' ? 'var(--main-m3)' : 'var(--main-m4)';
              const pnlColor = t.pnl && t.pnl >= 0 ? 'var(--main-m3)' : 'var(--main-m4)';
              const pnlSign = t.pnl && t.pnl >= 0 ? '+' : '';
              return (
                <div key={`${t.symbol}-${i}`} className="flex items-center px-[20px] py-[11px] gap-[12px] relative hover:bg-[rgba(0,0,0,0.015)] transition-colors">
                  <span className="text-[10px] w-[28px] shrink-0 text-center py-[2px] rounded-[3px] uppercase font-medium" style={{ color: '#fff', background: sideColor, letterSpacing: '0.04em' }}>{t.side}</span>
                  <span className="text-[13px] w-[48px] shrink-0" style={{ color: 'var(--text-n9)', fontWeight: 500 }}>{t.symbol}</span>
                  <span className="text-[12px] w-[48px] shrink-0" style={{ color: 'var(--text-n7)', ...MONO }}>x{t.qty}</span>
                  <span className="text-[12px] w-[88px] shrink-0" style={{ color: 'var(--text-n5)', ...MONO }}>${t.price.toLocaleString()}</span>
                  {t.pnl != null ? (
                    <span className="text-[12px] w-[80px] shrink-0" style={{ color: pnlColor, ...MONO }}>{pnlSign}${t.pnl.toLocaleString()}</span>
                  ) : (
                    <span className="text-[12px] w-[80px] shrink-0" style={{ color: 'var(--text-n3)' }}>—</span>
                  )}
                  <span className="text-[11px] px-[6px] py-[2px] rounded-[3px]" style={{ background: 'rgba(73,163,166,0.08)', color: '#49a3a6' }}>{t.sourceStrategy}</span>
                  {t.note && <span className="text-[11px] ml-auto truncate max-w-[200px]" style={{ color: 'var(--text-n3)' }}>{t.note}</span>}
                  {i < entry.trades.length - 1 && (
                    <div className="absolute bottom-0 left-[20px] right-[20px]" style={DIVIDER} />
                  )}
                </div>
              );
            })}
            <AlvaWatermark />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== Tab 类型 ========== */

type PortfolioTab = 'overview' | 'strategies' | 'activity';

/* ========== 页面 ========== */

export default function Portfolio({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [tab, setTab] = useState<PortfolioTab>('overview');

  const pendingCount = P.orders.filter(o => o.status === 'pending').length;
  const tabMeta: Record<PortfolioTab, { label: string; badge?: string }> = {
    overview:   { label: 'Overview' },
    strategies: { label: `Strategies (${P.strategies.length})` },
    activity:   { label: 'Activity', badge: pendingCount > 0 ? `${pendingCount} pending` : undefined },
  };

  return (
    <AppShell activePage="portfolio" onNavigate={onNavigate}>
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col gap-[20px] px-[28px] pt-[24px] relative w-full">

          <PortfolioHeader onNavigate={onNavigate} />

          {/* Stats */}
          <div className="flex gap-[8px]">
            <StatItem value={`$${P.positions.reduce((s, p) => s + p.marketValue, 0).toLocaleString()}`} label="Invested" />
            <StatItem value={`${P.todayPnl >= 0 ? '+' : ''}$${P.todayPnl.toLocaleString()}`} label="Today P&L" accent />
            <StatItem value={P.positions.length.toString()} label="Positions" />
            <StatItem value={pendingCount.toString()} label="Pending Orders" />
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-[6px]">
            {(Object.keys(tabMeta) as PortfolioTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-[4px] px-[14px] py-[6px] font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] transition-colors cursor-pointer ${
                  tab === t
                    ? 'bg-[rgba(73,163,166,0.12)] text-[rgba(0,0,0,0.9)] font-medium'
                    : 'bg-transparent text-[rgba(0,0,0,0.35)] hover:text-[rgba(0,0,0,0.6)]'
                }`}
              >
                {tabMeta[t].label}
                {tabMeta[t].badge && (
                  <span className="ml-[6px] text-[10px] px-[6px] py-[1px] rounded-full" style={{ background: 'rgba(230,169,26,0.12)', color: '#E6A91A' }}>{tabMeta[t].badge}</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'overview' && <OverviewTab />}
          {tab === 'strategies' && <StrategiesTab onNavigate={onNavigate} />}
          {tab === 'activity' && <ActivityTab />}

        </div>
      </div>
    </AppShell>
  );
}
