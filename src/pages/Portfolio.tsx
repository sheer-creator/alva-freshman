/**
 * [INPUT]: AppShell, trading-mock, chart-theme, CdnIcon, Avatar, PulseIndicator
 * [OUTPUT]: Portfolio 主页面 — 按 Broker Account 切换的完整组合视图（Figma Overview 布局）
 * [POS]: 页面层 — 展示用户交易组合全貌
 */

import { useState, useEffect, useRef } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { AlvaWatermark } from '@/app/components/alva-ui-kit';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import ReactECharts from 'echarts-for-react';
import {
  CHART_DOT_BG, FONT,
  timeXAxisConfig,
  lineSeriesConfig,
} from '@/lib/chart-theme';
import { BROKER_PORTFOLIOS } from '@/data/trading-mock';
import type { BrokerPortfolio, StrategyBinding, Position, JournalEntry } from '@/data/trading-mock';
import { ConnectAccountModal } from '@/app/components/portfolio/ConnectAccountModal';
import type { ConnectAccountModalProps } from '@/app/components/portfolio/ConnectAccountModal';

/* ========== 通用样式常量 ========== */

const FONT_FAMILY = "'Delight', sans-serif";
const CARD_BG: React.CSSProperties = { background: 'var(--grey-g01, #fafafa)', borderRadius: 8 };
const MONO: React.CSSProperties = { fontFamily: FONT_FAMILY, fontVariantNumeric: 'tabular-nums' };
const POS_COLOR = 'var(--main-m3, #2a9b7d)';
const NEG_COLOR = 'var(--main-m4, #e05357)';
const COLOR_POS = '#2a9b7d';  // echarts(canvas) 用纯色值，不解析 CSS 变量
const COLOR_NEG = '#e05357';

/* Equity Curve 图例配色（取自 Figma chart token） */
const COLOR_PORTFOLIO = '#7474d8';   // chart/purple2-main
const COLOR_SPY = '#ff9800';         // chart/orange1-main
const COLOR_COST = '#acacac';        // grey/g3

/* ========== 工具：派生字段 ========== */

/** broker → 账户类型（数据无此字段，按 broker 映射推导） */
function accountType(brokerId: string): 'Live' | 'Spot' {
  return brokerId.startsWith('binance') ? 'Spot' : 'Live';
}

/** equityCurve 相邻差分 → 每日 P&L 序列 */
function dailyPnlSeries(curve: [string, number][]): [string, number][] {
  return curve.slice(1).map(([date, val], i) => [date, val - curve[i][1]]);
}

/* ========== Header 右上按钮组 ========== */

function HeaderButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-[6px] h-[32px] px-[12px] py-[6px] rounded-[4px] transition-colors hover:bg-[rgba(0,0,0,0.03)] cursor-pointer"
      style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', background: 'transparent' }}
    >
      <CdnIcon name={icon} size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 500 }}>{label}</span>
    </button>
  );
}

/* ========== 账户 Tabs ========== */

interface AccountTab {
  brokerId: string;
  brokerLabel: string;
  accountId: string;
  type: 'Live' | 'Spot';
  enabled: boolean;
}

function AccountTabs({ tabs, active, onChange }: { tabs: AccountTab[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-[12px]">
      {tabs.map(t => {
        const isActive = t.brokerId === active;
        return (
          <button
            key={t.brokerId}
            disabled={!t.enabled}
            onClick={() => t.enabled && onChange(t.brokerId)}
            className={`flex items-center justify-center px-[12px] py-[6px] rounded-full transition-colors ${
              t.enabled ? 'cursor-pointer' : 'cursor-default'
            }`}
            style={{ background: isActive ? 'rgba(0,0,0,0.7)' : 'var(--b-r03, rgba(0,0,0,0.03))' }}
          >
            <span className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY }}>
              <span style={{ fontWeight: 500 }}>{t.brokerLabel}</span>
              {` ${t.accountId} · ${t.type}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ========== 摘要卡 Overview Card ========== */

function OverviewCard({ broker }: { broker: BrokerPortfolio }) {
  const invested = broker.positions.reduce((s, p) => s + p.marketValue, 0);
  const unrealized = broker.positions.reduce((s, p) => s + p.pnl, 0);
  const pnlSign = broker.todayPnl >= 0 ? '+' : '';
  const unrealSign = unrealized >= 0 ? '+' : '';
  const type = accountType(broker.brokerId);

  const metrics: { label: string; value: string; accent?: boolean; width: number }[] = [
    { label: 'Invested', value: `$${invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, width: 96 },
    { label: 'Unrealized P&L', value: `${unrealSign}$${Math.abs(unrealized).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, accent: true, width: 83 },
    { label: 'Positions', value: broker.positions.length.toString(), width: 50 },
  ];

  return (
    <div
      className="flex items-end justify-center gap-[28px] p-[20px] rounded-[8px]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      {/* Balance */}
      <div className="flex flex-col flex-1 min-w-0 gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <div className="shrink-0 flex items-center justify-center" style={{ width: 20, height: 20, borderRadius: 2.5, background: '#1c1c1c' }}>
            <span style={{ fontSize: 11, lineHeight: 1, color: '#fff', fontFamily: FONT_FAMILY, fontWeight: 500 }}>{broker.brokerLabel.charAt(0)}</span>
          </div>
          <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>
            {broker.brokerName} · {broker.accountId}
          </p>
          <div className="flex items-center justify-center px-[6px] py-px rounded-[4px] shrink-0" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
            <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--main-m1, #49a3a6)', fontFamily: FONT_FAMILY }}>{type}</span>
          </div>
        </div>
        <div className="flex items-end gap-[8px] whitespace-nowrap">
          <span className="text-[32px] leading-[42px] tracking-[0.32px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 400, ...MONO }}>
            ${broker.totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div className="flex items-center gap-[8px] py-[5px]">
            <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: broker.todayPnl >= 0 ? POS_COLOR : NEG_COLOR, fontFamily: FONT_FAMILY, ...MONO }}>
              {pnlSign}${Math.abs(broker.todayPnl).toLocaleString()}
            </span>
            <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY }}>1D</span>
          </div>
        </div>
      </div>

      {/* Data Card */}
      <div className="flex items-center justify-end gap-[28px] shrink-0">
        {metrics.map(m => (
          <div key={m.label} className="flex flex-col gap-[4px] justify-center items-center shrink-0" style={{ width: m.width }}>
            <p className="text-[12px] leading-[20px] tracking-[0.12px] w-full whitespace-nowrap" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY }}>{m.label}</p>
            <p className="text-[20px] leading-[30px] tracking-[0.2px] w-full whitespace-nowrap" style={{ color: m.accent ? POS_COLOR : 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 400, ...MONO }}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== Overview / Activity Tab Bar ========== */

type PortfolioTab = 'overview' | 'activity';

function PageTabs({ tab, onChange }: { tab: PortfolioTab; onChange: (t: PortfolioTab) => void }) {
  const items: { key: PortfolioTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'activity', label: 'Activity' },
  ];
  return (
    <div className="flex items-start gap-[20px]" style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
      {items.map(it => {
        const active = tab === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className="flex flex-col items-start gap-[10px] pt-[12px] cursor-pointer"
            style={{ paddingBottom: active ? 0 : 12 }}
          >
            <span className="text-[18px] leading-[28px] tracking-[0.18px] whitespace-nowrap" style={{ color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY, fontWeight: active ? 500 : 400 }}>{it.label}</span>
            {active && <div style={{ height: 2, width: '100%', background: 'var(--main-m1, #49a3a6)' }} />}
          </button>
        );
      })}
    </div>
  );
}

/* ========== Positions 表 ========== */

const POSITION_COLS = ['Symbol', 'Weight', 'Qty', 'Avg Cost', 'Current', 'Value', 'Unrealized P&L'];

function PositionsTable({ positions }: { positions: Position[] }) {
  const cell = 'flex flex-col justify-center min-w-0 px-[0px] py-[12px] flex-1';
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>Positions</p>
      <div className="relative" style={{ background: 'var(--content-b10, #fff)', borderRadius: 8, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', overflow: 'hidden', padding: '4px 20px' }}>
        {/* Header */}
        <div className="flex items-center">
          {POSITION_COLS.map(c => (
            <div key={c} className={cell}>
              <span className="text-[14px] leading-[22px] tracking-[0.14px] truncate" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY }}>{c}</span>
            </div>
          ))}
        </div>
        {/* Rows */}
        {positions.map((pos) => {
          const pnlColor = pos.pnl >= 0 ? POS_COLOR : NEG_COLOR;
          const sign = pos.pnl >= 0 ? '+' : '';
          return (
            <div key={pos.symbol} className="flex items-center" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>{pos.symbol}</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY, ...MONO }}>{pos.weight}%</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY, ...MONO }}>{pos.qty}</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY, ...MONO }}>${pos.avgCost.toLocaleString()}</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: FONT_FAMILY, ...MONO }}>${pos.currentPrice.toLocaleString()}</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, ...MONO }}>${pos.marketValue.toLocaleString()}</span>
              </div>
              <div className={cell}>
                <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: pnlColor, fontFamily: FONT_FAMILY, ...MONO }}>
                  {sign}${Math.abs(pos.pnl).toLocaleString()} ({sign}{pos.pnlPercent}%)
                </span>
              </div>
            </div>
          );
        })}
        {positions.length === 0 && (
          <div className="py-[32px] text-center">
            <span className="text-[14px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>No positions</span>
          </div>
        )}
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Trading Strategy ========== */

function TradingStrategy({ strategy, onNavigate }: { strategy: StrategyBinding; onNavigate: (page: Page) => void }) {
  const playbookHandle = `@${strategy.author}/${strategy.playbookName}`;
  return (
    <div className="flex flex-col gap-[16px]">
      {/* Title row + dropdown */}
      <div className="flex items-center gap-[12px]">
        <p className="flex-1 min-w-0 text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>Trading Strategy</p>
        <button className="flex items-center justify-center gap-[4px] shrink-0 cursor-pointer">
          <span className="text-[12px] leading-[20px] tracking-[0.12px] truncate max-w-[280px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY }}>{playbookHandle}</span>
          <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
        </button>
      </div>

      {/* Playbook card */}
      <div className="flex items-center gap-[12px] p-[20px] rounded-[8px]" style={{ ...CARD_BG, minHeight: 92 }}>
        <Avatar name={strategy.author} size={44} />
        <div className="flex flex-col flex-1 min-w-0 gap-[4px] justify-center">
          <div className="flex items-center gap-[8px]">
            <span
              className="text-[16px] leading-[26px] tracking-[0.16px] truncate cursor-pointer hover:underline"
              style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}
              onClick={() => onNavigate('screener')}
            >{playbookHandle}</span>
            <PulseIndicator status="active" />
            <div className="flex items-center justify-center px-[6px] py-px rounded-[4px] shrink-0" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--main-m1, #49a3a6)', fontFamily: FONT_FAMILY }}>Bound</span>
            </div>
          </div>
          <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY }}>02/02/2026 - Now</p>
        </div>
        <button
          onClick={() => onNavigate('screener')}
          className="flex items-center justify-center h-[32px] px-[12px] py-[6px] rounded-[4px] shrink-0 transition-colors hover:bg-[rgba(0,0,0,0.03)] cursor-pointer"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', background: 'var(--content-b10, #fff)' }}
        >
          <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 500 }}>View Playbook</span>
        </button>
        <button
          className="flex items-center justify-center h-[32px] px-[12px] py-[6px] rounded-[4px] shrink-0 transition-colors hover:bg-[rgba(0,0,0,0.03)] cursor-pointer"
          style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', background: 'var(--content-b10, #fff)' }}
        >
          <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 500 }}>Unbind</span>
        </button>
      </div>
    </div>
  );
}

/* ========== 居中分割线 ========== */

function PlaybookDivider() {
  return (
    <div className="flex items-center gap-[16px]">
      <div className="flex-1" style={{ height: 1, background: 'var(--line-l07, rgba(0,0,0,0.07))' }} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontFamily: FONT_FAMILY }}>The following data belong to the selected playbook</span>
      <div className="flex-1" style={{ height: 1, background: 'var(--line-l07, rgba(0,0,0,0.07))' }} />
    </div>
  );
}

/* ========== Equity Curve ========== */

function EquityCurveChart({ equityCurve, costBasis, benchmark }: {
  equityCurve: [string, number][];
  costBasis: [string, number][];
  benchmark: [string, number][];
}) {
  const allValues = [...equityCurve, ...costBasis, ...benchmark].map(([, v]) => v);
  const yMin = Math.floor(Math.min(...allValues) / 5000) * 5000;

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: { type: 'line' as const, lineStyle: { color: 'rgba(0,0,0,0.12)', width: 1 } },
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      extraCssText: 'border-radius:6px;box-shadow:none;',
      textStyle: { fontSize: 12, color: 'rgba(0,0,0,0.7)', fontFamily: FONT },
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) => {
        if (!params.length) return '';
        const date = params[0].data[0];
        const rows = params.map(p => `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>${p.seriesName}: $${p.data[1].toLocaleString()}`);
        return `<div style="font-size:12px;line-height:20px;font-family:${FONT}"><div style="color:rgba(0,0,0,0.5);margin-bottom:4px">${date}</div>${rows.join('<br/>')}</div>`;
      },
    },
    legend: {
      top: 0, right: 0, itemWidth: 12, itemHeight: 2, itemGap: 12,
      textStyle: { fontSize: 10, color: 'rgba(0,0,0,0.5)', fontFamily: FONT },
      data: [
        { name: 'Cost Basis', icon: 'rect' },
        { name: 'Portfolio', icon: 'rect' },
        { name: 'SPY', icon: 'rect' },
      ],
    },
    grid: { top: 44, bottom: 24, left: 44, right: 8 },
    xAxis: { ...timeXAxisConfig({ axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10 } }) },
    yAxis: {
      type: 'value' as const,
      min: yMin,
      scale: true,
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, formatter: (v: number) => (v / 1000).toFixed(0) },
    },
    series: [
      lineSeriesConfig('Cost Basis', COLOR_COST, {
        data: costBasis, lineStyle: { type: 'dashed', width: 1.2, color: COLOR_COST }, symbol: 'none',
      }),
      lineSeriesConfig('Portfolio', COLOR_PORTFOLIO, {
        data: equityCurve,
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(116,116,216,0.18)' },
            { offset: 1, color: 'rgba(116,116,216,0)' },
          ]},
        },
      }),
      lineSeriesConfig('SPY', COLOR_SPY, {
        data: benchmark, lineStyle: { width: 1.2, color: COLOR_SPY }, symbol: 'none',
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
            { offset: 0, color: 'rgba(255,152,0,0.12)' },
            { offset: 1, color: 'rgba(255,152,0,0)' },
          ]},
        },
      }),
    ],
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>Equity Curve</p>
      <div className="relative" style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 12, height: 280 }}>
        <ReactECharts option={option} style={{ height: 256 }} notMerge />
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Daily P&L ========== */

function DailyPnlChart({ equityCurve }: { equityCurve: [string, number][] }) {
  const data = dailyPnlSeries(equityCurve);
  const maxAbs = Math.max(...data.map(([, v]) => Math.abs(v)), 1);

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: { type: 'line' as const, lineStyle: { color: 'rgba(0,0,0,0.12)', width: 1 } },
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      extraCssText: 'border-radius:6px;box-shadow:none;',
      textStyle: { fontSize: 12, color: 'rgba(0,0,0,0.7)', fontFamily: FONT },
      formatter: (params: { color: string; data: [string, number] }[]) => {
        if (!params.length) return '';
        const p = params[0];
        const v = p.data[1];
        const sign = v >= 0 ? '+' : '';
        return `<div style="font-size:12px;line-height:20px;font-family:${FONT}"><div style="color:rgba(0,0,0,0.5);margin-bottom:4px">${p.data[0]}</div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>Daily P&L: ${sign}$${v.toLocaleString()}</div>`;
      },
    },
    grid: { top: 16, bottom: 24, left: 44, right: 8 },
    xAxis: { ...timeXAxisConfig({ axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10 } }) },
    yAxis: {
      type: 'value' as const,
      min: -maxAbs, max: maxAbs,
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10,
        formatter: (v: number) => v === 0 ? '0' : (v < 0 ? '-' : '') + (Math.abs(v) / 1000).toFixed(0) + 'K',
      },
    },
    series: [
      {
        name: 'Daily P&L', type: 'bar',
        data,
        itemStyle: { color: (p: { data: [string, number] }) => (p.data[1] >= 0 ? COLOR_POS : COLOR_NEG) },
        barMaxWidth: 6,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY }}>Daily P&L</p>
      <div className="relative" style={{ ...CHART_DOT_BG, borderRadius: 6, padding: 12, height: 224 }}>
        <ReactECharts option={option} style={{ height: 200 }} notMerge />
        <AlvaWatermark />
      </div>
    </div>
  );
}

/* ========== Activity Tab ========== */

/* Activity 行模型：journal trade 派生 + 每行一个时间（数据无 per-trade time，按组内行序确定性生成） */
interface ActivityRow {
  time: string;
  side: 'buy' | 'sell';
  symbol: string;
  qty: number;
  price: number;
  status: 'filled' | 'skipped' | 'failed';
  source: 'manual' | string;
}

interface ActivityGroup {
  date: string;       // 卡片上方日期标题，如 "03/20/2026"
  rows: ActivityRow[];
}

/** "Mar 20, 2026" → "03/20/2026"（卡片标题格式）；解析失败回退原串 */
function formatActivityDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
}

/** 组内行序 → 递减时间串（18:03、17:48 …），确定性、无随机，满足 Figma 的时间列 */
function rowTime(index: number): string {
  const base = 18 * 60 + 3;          // 18:03 起
  const total = base - index * 23;   // 每行回退 23 分钟
  const h = ((Math.floor(total / 60) % 24) + 24) % 24;
  const m = ((total % 60) + 60) % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** journal → 按日期分组的 Activity 数据 */
function buildActivityGroups(journal: JournalEntry[]): ActivityGroup[] {
  return journal.map(entry => ({
    date: formatActivityDate(entry.date),
    rows: entry.trades.map((t, i) => ({
      time: rowTime(i),
      side: t.side,
      symbol: t.symbol,
      qty: t.qty,
      price: t.price,
      status: t.status,
      source: t.source,
    })),
  }));
}

/* 列样式：除时间列外，每列 flex-1 + 最小宽度（与 Figma 一致） */
const ACT_COL = 'flex-1 flex flex-col items-start min-w-0';
const ACT_TEXT_N9: React.CSSProperties = { color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 400 };

/** 实心 side badge（白字）：BUY=m3 / SELL=m4 */
function SideBadge({ side }: { side: 'buy' | 'sell' }) {
  const bg = side === 'buy' ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m4, #e05357)';
  return (
    <span
      className="inline-flex items-center justify-center px-[6px] py-px rounded-[4px]"
      style={{ background: bg }}
    >
      <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: FONT_FAMILY, fontWeight: 400 }}>
        {side === 'buy' ? 'BUY' : 'SELL'}
      </span>
    </span>
  );
}

/** 淡底+同色字 badge（Status / Source 用） */
function SoftBadge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span className="inline-flex items-center justify-center px-[6px] py-px rounded-[4px]" style={{ background: bg }}>
      <span className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap" style={{ color, fontFamily: FONT_FAMILY, fontWeight: 400 }}>{label}</span>
    </span>
  );
}

function StatusBadge({ status }: { status: 'filled' | 'skipped' | 'failed' }) {
  if (status === 'filled') return <SoftBadge label="Filled" bg="var(--main-m3-10, rgba(42,155,125,0.1))" color="var(--main-m3, #2a9b7d)" />;
  if (status === 'skipped') return <SoftBadge label="Skipped" bg="var(--main-m5-10, rgba(230,169,26,0.1))" color="var(--main-m5, #e6a91a)" />;
  return <SoftBadge label="Failed" bg="var(--main-m4-10, rgba(224,83,87,0.1))" color="var(--main-m4, #e05357)" />;
}

function SourceBadge({ source }: { source: 'manual' | string }) {
  if (source === 'manual') return <SoftBadge label="Manual" bg="var(--b-r05, rgba(0,0,0,0.05))" color="var(--text-n5, rgba(0,0,0,0.5))" />;
  return <SoftBadge label={source} bg="var(--main-m1-10, rgba(73,163,166,0.1))" color="var(--main-m1, #49a3a6)" />;
}

function ActivityTab({ journal }: { journal: JournalEntry[] }) {
  const groups = buildActivityGroups(journal);

  if (groups.length === 0) {
    return (
      <div className="py-[32px] text-center">
        <span className="text-[14px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))', fontFamily: FONT_FAMILY }}>No activity</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      {groups.map(group => (
        <div key={group.date} className="flex flex-col gap-[12px]">
          {/* 日期标题 */}
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY, fontWeight: 400 }}>{group.date}</p>

          {/* Table 卡片 */}
          <div className="relative" style={{ background: 'var(--content-b10, #fff)', borderRadius: 8, border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', overflow: 'hidden', padding: '4px 20px' }}>
            {group.rows.map((r, i) => (
              <div
                key={`${group.date}-${i}`}
                className="flex items-center gap-[16px] py-[12px]"
                style={i > 0 ? { borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' } : undefined}
              >
                {/* 1 时间 */}
                <div className="flex-1 min-w-0">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))', fontFamily: FONT_FAMILY, fontWeight: 400, ...MONO }}>{r.time}</span>
                </div>
                {/* 2 side */}
                <div className="flex-1 min-w-[80px] flex items-center">
                  <SideBadge side={r.side} />
                </div>
                {/* 3 Symbol */}
                <div className="flex-1 min-w-[80px]">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={ACT_TEXT_N9}>{r.symbol}</span>
                </div>
                {/* 4 Qty */}
                <div className="flex-1 min-w-[80px]">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ ...ACT_TEXT_N9, ...MONO }}>x{r.qty}</span>
                </div>
                {/* 5 Price */}
                <div className="flex-1 min-w-[80px]">
                  <span className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ ...ACT_TEXT_N9, ...MONO }}>${r.price.toLocaleString()}</span>
                </div>
                {/* 6 Status */}
                <div className={`${ACT_COL} min-w-[80px]`}>
                  <StatusBadge status={r.status} />
                </div>
                {/* 7 Source */}
                <div className={`${ACT_COL} min-w-[160px]`}>
                  <SourceBadge source={r.source} />
                </div>
              </div>
            ))}
            <AlvaWatermark />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== 页面 ========== */

/* 账户 tabs：数据只有 IBKR + Binance 两个 portfolio，Figma 还展示了一个 Alpaca（无数据，置灰不可点） */
const ACCOUNT_TABS: AccountTab[] = [
  ...BROKER_PORTFOLIOS.map(b => ({
    brokerId: b.brokerId,
    brokerLabel: b.brokerLabel,
    accountId: b.accountId,
    type: accountType(b.brokerId),
    enabled: true,
  })),
  { brokerId: 'alpaca-1', brokerLabel: 'Alpaca', accountId: 'PA****1234', type: 'Live', enabled: false },
];

export default function Portfolio({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeBrokerId, setActiveBrokerId] = useState(BROKER_PORTFOLIOS[0].brokerId);
  const [tab, setTab] = useState<PortfolioTab>('overview');
  const [toast, setToast] = useState(false);
  /* 评审深链：?connect-step=… 时自动展开 Connect 弹窗 */
  const connectParams = new URLSearchParams(window.location.search);
  const [connectOpen, setConnectOpen] = useState(connectParams.has('connect-step'));
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (sessionStorage.getItem('trade-executed')) {
      sessionStorage.removeItem('trade-executed');
      setTab('activity');
      setToast(true);
      toastTimer.current = setTimeout(() => setToast(false), 4000);
    }
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);

  const broker = BROKER_PORTFOLIOS.find(b => b.brokerId === activeBrokerId)!;

  return (
    <AppShell activePage="portfolio" onNavigate={onNavigate}>
      {/* Trade executed toast */}
      <style>{`@keyframes toast-in { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } } @keyframes toast-out { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-8px); } }`}</style>
      {toast && (
        <div
          className="fixed top-[16px] left-1/2 -translate-x-1/2 flex items-center gap-[10px] px-[20px] py-[12px] rounded-[8px] z-50"
          style={{
            background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            animation: 'toast-in 0.25s ease-out',
          }}
        >
          <div className="flex items-center justify-center rounded-full" style={{ width: 20, height: 20, background: 'rgba(73,163,166,0.25)', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path d="M4 9.5L7.5 13L14 5.5" stroke="#49a3a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontFamily: FONT_FAMILY, lineHeight: '20px' }}>
            Trade orders submitted successfully. Check activity below.
          </span>
          <button
            onClick={() => setToast(false)}
            className="shrink-0 transition-opacity hover:opacity-70"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1 }}
          >✕</button>
        </div>
      )}
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col gap-[24px] px-[28px] pt-[56px] relative w-full">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: FONT_FAMILY, fontWeight: 400 }}>Portfolio</h2>
            <div className="flex items-center gap-[12px]">
              <HeaderButton icon="add-l2" label="Add" onClick={() => setConnectOpen(true)} />
              <HeaderButton icon="settings-l" label="Settings" onClick={() => onNavigate('portfolio-settings')} />
            </div>
          </div>

          {/* Account tabs */}
          <AccountTabs tabs={ACCOUNT_TABS} active={activeBrokerId} onChange={setActiveBrokerId} />

          {/* Overview card */}
          <OverviewCard broker={broker} />

          {/* Overview / Activity tab bar */}
          <PageTabs tab={tab} onChange={setTab} />

          {/* Tab content */}
          {tab === 'overview' && (
            <div className="flex flex-col gap-[24px]">
              <PositionsTable positions={broker.positions} />
              <TradingStrategy strategy={broker.strategy} onNavigate={onNavigate} />
              <PlaybookDivider />
              <EquityCurveChart equityCurve={broker.equityCurve} costBasis={broker.costBasis} benchmark={broker.benchmark} />
              <DailyPnlChart equityCurve={broker.equityCurve} />
            </div>
          )}
          {tab === 'activity' && <ActivityTab journal={broker.journal} />}

        </div>
      </div>

      {/* Connect Account 弹窗（设计稿 Modal/Connect 7437:70052）。
          评审直达：?connect-step=credentials&connect-broker=binance 等 query 参数可深链任一状态 */}
      <ConnectAccountModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        initialStep={(connectParams.get('connect-step') ?? undefined) as ConnectAccountModalProps['initialStep']}
        initialBrokerId={connectParams.get('connect-broker') ?? undefined}
        initialAccountType={(connectParams.get('connect-account') ?? undefined) as ConnectAccountModalProps['initialAccountType']}
      />
    </AppShell>
  );
}
