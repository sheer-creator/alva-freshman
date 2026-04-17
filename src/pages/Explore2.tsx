/**
 * [INPUT]: AppShell, PulseIndicator, chart-theme, CdnIcon, Avatar
 * [OUTPUT]: Explore V2 — Hero Spotlight + Homepage-style Playbook card grid
 * [POS]: Page — Explore
 */

import { useState, useEffect, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import { AVATAR_COLOR_PALETTE, CHART_COLORS } from '@/lib/chart-theme';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import UserInfo from '@/app/components/UserInfo';

/* ========== 数据结构 ========== */

interface ExplorePlaybook {
  id: string;
  creator: string;
  title: string;
  description: string;
  tickers: string[];
  pulse: 'active' | 'idle';
  stars: number;
  remixes: number;
  annualizedReturn?: string;
}

const PLAYBOOKS: ExplorePlaybook[] = [
  {
    id: 'btc-ultimate',
    creator: 'Alva Intern',
    title: 'BTC Ultimate AI Trader',
    description: "Dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements.",
    tickers: ['BTC', 'ETH', 'SOL'],
    pulse: 'active', stars: 142, remixes: 23,
    annualizedReturn: '+338.23%',
  },
  {
    id: 'mag7-rebalance',
    creator: 'Harry Zzz',
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly.',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
    pulse: 'active', stars: 89, remixes: 14,
    annualizedReturn: '+142.8%',
  },
  {
    id: 'pepe-btc',
    creator: 'Leo Leo',
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    description: 'Tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.',
    tickers: ['PEPE', 'BTC'],
    pulse: 'idle', stars: 56, remixes: 8,
    annualizedReturn: '+65.36%',
  },
  {
    id: 'attribution-analysis',
    creator: 'Sheer YLL YGG',
    title: 'Attribution Analysis Strategy for Price Trends',
    description: 'Monitor selected tokens to detect abnormal changes in OI and trading volume to capture unusual market activity and generate alerts.',
    tickers: ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX'],
    pulse: 'active', stars: 72, remixes: 11,
  },
  {
    id: 'btc-macd',
    creator: 'Macro Scope X',
    title: 'BTC MACD 1h Simple Crossover',
    description: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    pulse: 'idle', stars: 34, remixes: 5,
    annualizedReturn: '+12.8%',
  },
  {
    id: 'nvda-tsm',
    creator: 'Smart Jing',
    title: 'NVDA +3% Triggered TSM TP/SL',
    description: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    tickers: ['NVDA', 'TSM'],
    pulse: 'active', stars: 48, remixes: 7,
    annualizedReturn: '+27.73%',
  },
];

const CATEGORIES = ['Featured', 'Trending', 'Recent'];

/* ========== SVG 绘图工具 ========== */

const C = CHART_COLORS;

function smoothLine(data: number[], x0: number, y0: number, w: number, h: number): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: x0 + (i / (data.length - 1)) * w,
    y: y0 + h - ((v - min) / range) * h * 0.85 - h * 0.06,
  }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    const cy = (pts[i - 1].y + pts[i].y) / 2;
    d += ` Q ${pts[i - 1].x},${pts[i - 1].y} ${cx},${cy}`;
  }
  return d;
}

function areaFromLine(linePath: string, x0: number, y0: number, w: number, h: number): string {
  return `${linePath} L ${x0 + w},${y0 + h} L ${x0},${y0 + h} Z`;
}

function bars(data: number[], x0: number, y0: number, w: number, h: number, color: string, opacity = 0.25) {
  const max = Math.max(...data);
  const barW = w / data.length * 0.6;
  const gap = w / data.length;
  return data.map((v, i) => {
    const bh = (v / max) * h * 0.85;
    return <rect key={i} x={x0 + i * gap + gap * 0.2} y={y0 + h - bh} width={barW} height={bh} rx={0.5} fill={color} opacity={opacity} />;
  });
}

function textLines(x: number, y: number, w: number, count: number, gap = 6) {
  return Array.from({ length: count }, (_, i) => (
    <rect key={i} x={x} y={y + i * gap} width={w * (i === count - 1 ? 0.6 : 0.85 + Math.random() * 0.15)} height={3} rx={1} fill="rgba(0,0,0,0.08)" />
  ));
}

function kpiCell(x: number, y: number, w: number, h: number, valueColor: string) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1} fill="#fafafa" />
      <rect x={x + 4} y={y + 4} width={w * 0.4} height={2.5} rx={1} fill="rgba(0,0,0,0.10)" />
      <rect x={x + 4} y={y + 10} width={w * 0.55} height={4} rx={1} fill={valueColor} opacity={0.7} />
      <rect x={x + 4} y={y + 17} width={w * 0.3} height={2} rx={1} fill="rgba(0,0,0,0.06)" />
    </g>
  );
}

/* ========== 6 种缩略图 ========== */

const W = 320;
const H = 180;

function ThumbPlaybookDetail() {
  const lineData = [100, 108, 103, 115, 112, 128, 135, 140, 132, 148, 155, 162, 158, 172, 180, 195, 210, 225, 238];
  const rsiData = [45, 52, 48, 62, 58, 70, 65, 72, 68, 55, 48, 42, 50, 58, 65, 60, 55, 48, 52];
  const line = smoothLine(lineData, 8, 8, 304, 72);
  const area = areaFromLine(line, 8, 8, 304, 72);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t1-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="78" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={area} fill="url(#t1-g)" />
      <path d={line} fill="none" stroke={C.primary} strokeWidth="1.2" />
      {kpiCell(6, 88, 74, 24, C.primary)}
      {kpiCell(82, 88, 74, 24, '#2a9b7d')}
      {kpiCell(6, 114, 74, 24, C.red)}
      {kpiCell(82, 114, 74, 24, C.blue)}
      <rect x="160" y="88" width="152" height="24" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={smoothLine(rsiData, 162, 89, 148, 22)} fill="none" stroke={C.orange} strokeWidth="0.8" />
      <line x1="162" y1="97" x2="308" y2="97" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3" strokeDasharray="2 2" />
      <rect x="160" y="114" width="152" height="24" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {textLines(166, 119, 140, 3, 5)}
      <rect x="6" y="142" width="152" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {textLines(12, 148, 140, 4, 5)}
      <rect x="160" y="142" width="152" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d="M 200,170 A 28,28 0 0,1 256,170" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />
      <path d="M 200,170 A 28,28 0 0,1 238,150" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" />
      <circle cx="238" cy="150" r="2" fill={C.green} />
      {textLines(270, 152, 36, 3, 5)}
    </svg>
  );
}

function ThumbStockDashboard() {
  const priceData = [100, 105, 110, 108, 116, 122, 118, 125, 132, 128, 138, 145, 142, 150, 158, 162, 168, 175, 180, 190];
  const revData = [40, 45, 42, 50, 55, 52, 60, 65, 58, 62];
  const supplyData = [30, 35, 32, 38, 42, 40, 45, 48, 44, 50];
  const priceLine = smoothLine(priceData, 8, 40, 304, 68);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t2-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.blue} stopOpacity="0.2" />
          <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const cx = 6 + i * 52;
        const colors = [C.primary, C.blue, C.green, C.orange, C.red, C.deepBlue];
        return (
          <g key={i}>
            <rect x={cx} y="6" width="50" height="28" rx="2" fill="#fafafa" />
            <rect x={cx + 4} y="10" width="20" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y="15" width="30" height="3.5" rx={1} fill={colors[i]} opacity={0.6} />
            <rect x={cx + 4} y="22" width="16" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x="6" y="38" width="308" height="74" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={areaFromLine(priceLine, 8, 40, 304, 68)} fill="url(#t2-g)" />
      <path d={priceLine} fill="none" stroke={C.blue} strokeWidth="1.2" />
      <rect x="6" y="116" width="152" height="58" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="120" width="40" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(revData, 12, 128, 140, 42, C.primary, 0.3)}
      <rect x="160" y="116" width="152" height="58" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="166" y="120" width="40" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={smoothLine(supplyData, 166, 128, 140, 42)} fill="none" stroke={C.green} strokeWidth="0.9" />
      <path d={smoothLine(revData, 166, 128, 140, 42)} fill="none" stroke={C.orange} strokeWidth="0.9" opacity={0.6} />
    </svg>
  );
}

function ThumbPriceVolumeOverview() {
  const priceData = [100, 112, 95, 118, 105, 130, 110, 125, 140, 120, 135, 150, 128, 145, 160, 142, 155, 148, 162, 158];
  const volumeData = [30, 55, 80, 45, 65, 90, 50, 60, 75, 85, 40, 70, 95, 55, 45, 60, 80, 50, 65, 70];
  const priceLine = smoothLine(priceData, 8, 12, 196, 100);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t3-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orange} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="204" height="168" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="10" width="50" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(volumeData, 8, 70, 196, 48, C.orange, 0.15)}
      <path d={areaFromLine(priceLine, 8, 12, 196, 100)} fill="url(#t3-g)" />
      <path d={priceLine} fill="none" stroke={C.orange} strokeWidth="1.2" />
      <circle cx="160" cy="11" r="2" fill={C.orange} />
      <rect x="164" y="9.5" width="16" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <circle cx="185" cy="11" r="2" fill={C.orange} opacity={0.3} />
      <rect x="189" y="9.5" width="14" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={20 + i * 40} y="164" width="14" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
      ))}
      <rect x="214" y="6" width="100" height="168" rx="3" fill="#fafafa" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {[0, 1, 2, 3, 4, 5].map(i => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cx = 218 + col * 48;
        const cy = 12 + row * 54;
        const colors = [C.primary, C.green, C.orange, C.red, C.blue, C.deepBlue];
        return (
          <g key={i}>
            <rect x={cx} y={cy} width="44" height="48" rx="2" fill="white" />
            <rect x={cx + 4} y={cy + 6} width="22" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y={cy + 14} width="28" height="4" rx={1} fill={colors[i]} opacity={0.55} />
            <rect x={cx + 4} y={cy + 22} width="18" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
            <path d={`M ${cx + 4},${cy + 38} l 5,-4 5,6 5,-3 5,2 5,-5 5,3 3,-2`} fill="none" stroke={colors[i]} strokeWidth="0.6" opacity={0.4} />
          </g>
        );
      })}
    </svg>
  );
}

function ThumbWidgetGrid() {
  const d1 = [40, 45, 42, 50, 55, 52, 60, 65, 58, 70, 68, 75, 72, 80];
  const d2 = [30, 35, 32, 38, 42, 40, 45, 48, 44, 50, 52, 55, 54, 58];
  const d3 = [50, 48, 52, 55, 53, 58, 56, 60, 58, 62, 64, 63, 66, 70];
  const d4 = [20, 25, 30, 28, 35, 32, 38, 40, 36, 42, 45, 43, 48, 52];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t4-g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.green} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.green} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="t4-g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="10" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(d1, 10, 18, 144, 64); return <><path d={areaFromLine(l, 10, 18, 144, 64)} fill="url(#t4-g1)" /><path d={l} fill="none" stroke={C.green} strokeWidth="0.9" /></>; })()}
      <rect x="162" y="6" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="168" y="10" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {bars(d2, 168, 20, 140, 62, C.blue, 0.35)}
      <rect x="6" y="92" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="96" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {textLines(12, 104, 140, 8, 7)}
      <rect x="162" y="92" width="152" height="82" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="168" y="96" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(d3, 166, 104, 144, 64); return <><path d={areaFromLine(l, 166, 104, 144, 64)} fill="url(#t4-g2)" /><path d={l} fill="none" stroke={C.primary} strokeWidth="0.9" /></>; })()}
      <path d={smoothLine(d4, 166, 104, 144, 64)} fill="none" stroke={C.deepBlue} strokeWidth="0.8" opacity={0.6} />
    </svg>
  );
}

function ThumbBriefAndTrend() {
  const trendData = [40, 38, 45, 42, 50, 55, 48, 52, 58, 62, 55, 60, 65, 58, 62, 68, 72, 65, 70, 75];
  const trendLine = smoothLine(trendData, 8, 100, 304, 68);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t5-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.deepBlue} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.deepBlue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="84" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="12" width="48" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <rect x="12" y="20" width="100" height="4" rx={1} fill="rgba(0,0,0,0.12)" />
      {textLines(12, 30, 280, 4, 7)}
      <rect x="12" y="62" width="70" height="3" rx={1} fill="rgba(0,0,0,0.10)" />
      {textLines(12, 70, 280, 2, 6)}
      <rect x="6" y="94" width="308" height="80" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="98" width="44" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <path d={areaFromLine(trendLine, 8, 100, 304, 68)} fill="url(#t5-g)" />
      <path d={trendLine} fill="none" stroke={C.deepBlue} strokeWidth="1.1" />
      <text x="14" y="168" fill="rgba(0,0,0,0.06)" fontSize="6" fontFamily="'Delight', sans-serif">Alva</text>
    </svg>
  );
}

function ThumbNarrativeStock() {
  const priceData = [100, 104, 108, 106, 112, 110, 116, 114, 120, 118, 124, 122, 128, 125, 130];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="t6-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.red} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.red} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="32" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="11" width="22" height="22" rx="4" fill={C.red} opacity={0.15} />
      <text x="18" y="26" fill={C.red} fontSize="10" fontWeight="600" fontFamily="'Delight', sans-serif">N</text>
      <rect x="38" y="14" width="40" height="3.5" rx={1} fill="rgba(0,0,0,0.14)" />
      <rect x="38" y="21" width="24" height="2.5" rx={1} fill="rgba(0,0,0,0.07)" />
      <rect x="240" y="13" width="36" height="5" rx={1} fill={C.green} opacity={0.5} />
      <rect x="280" y="14" width="24" height="3" rx={1} fill={C.green} opacity={0.3} />
      {[0, 1, 2, 3, 4].map(i => {
        const cx = 6 + i * 62;
        return (
          <g key={i}>
            <rect x={cx} y="42" width="58" height="22" rx="2" fill="#fafafa" />
            <rect x={cx + 4} y="46" width="16" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y="52" width="28" height="3" rx={1} fill={i < 3 ? C.green : C.red} opacity={0.5} />
            <rect x={cx + 34} y="52" width="18" height="2.5" rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      <rect x="6" y="68" width="196" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="74" width="60" height="3" rx={1} fill={C.primary} opacity={0.4} />
      {textLines(12, 82, 180, 3, 6)}
      <rect x="12" y="104" width="50" height="3" rx={1} fill={C.green} opacity={0.3} />
      {textLines(12, 112, 180, 3, 6)}
      <rect x="12" y="134" width="40" height="3" rx={1} fill={C.red} opacity={0.3} />
      {textLines(12, 142, 180, 3, 6)}
      <rect x="206" y="68" width="108" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="212" y="72" width="36" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(priceData, 210, 80, 98, 60); return <><path d={areaFromLine(l, 210, 80, 98, 60)} fill="url(#t6-g)" /><path d={l} fill="none" stroke={C.red} strokeWidth="0.9" /></>; })()}
      {kpiCell(212, 148, 44, 20, C.primary)}
      {kpiCell(260, 148, 44, 20, C.orange)}
    </svg>
  );
}

const THUMBNAIL_MAP: Record<string, () => React.ReactNode> = {
  'btc-ultimate': ThumbPlaybookDetail,
  'mag7-rebalance': ThumbStockDashboard,
  'pepe-btc': ThumbPriceVolumeOverview,
  'attribution-analysis': ThumbWidgetGrid,
  'btc-macd': ThumbBriefAndTrend,
  'nvda-tsm': ThumbNarrativeStock,
};

/* ========== Hero Spotlight ========== */

interface HeroSlide {
  thumbId: string;
  creator: string;
  title: string;
  description: string;
  tickers: string[];
  stars: number;
  remixes: number;
  annualizedReturn: string;
  pulse: 'active' | 'idle';
  comments: { author: string; text: string }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    thumbId: 'nvda-tsm',
    creator: 'Alice Chen',
    title: 'NVDA Supply Chain Intelligence',
    description: 'Tracks TSMC, Samsung, SK Hynix production data + Google Trends demand signals. AI-powered supply/demand mismatch detection for semiconductor alpha generation across the entire chip stack.',
    tickers: ['NVDA', 'TSM', 'MU', 'AVGO'],
    stars: 312, remixes: 47, annualizedReturn: '+212.4%', pulse: 'active',
    comments: [
      { author: 'Marcus L.', text: 'This caught the NVDA dip 3 days before earnings. Insane signal quality.' },
      { author: 'Yuki T.', text: 'Forked and added AMD — works just as well on the whole semi stack.' },
      { author: 'Chip Whisperer', text: 'The TSMC fab utilization data alone is worth the subscription.' },
      { author: 'Semi Anon', text: 'Running this alongside my manual analysis. It spots things I miss every week.' },
      { author: 'Bay Area VC', text: 'Shared this with our portfolio companies. Supply chain alpha is real.' },
    ],
  },
  {
    thumbId: 'attribution-analysis',
    creator: 'DeFi Sage',
    title: 'GPT-4 Earnings Whisper',
    description: 'Real-time earnings call transcript analysis. Detects sentiment shifts, guidance tone, and forward-looking language patterns to trade pre-market gaps with institutional-grade NLP.',
    tickers: ['SPY', 'QQQ', 'AAPL', 'MSFT'],
    stars: 256, remixes: 38, annualizedReturn: '+89.2%', pulse: 'active',
    comments: [
      { author: 'Macro Scope X', text: 'It flagged MSFT guidance weakness 40 min before the selloff. Speechless.' },
      { author: 'Anon Quant', text: 'Best use of LLM in a playbook. The sentiment scoring is next-level.' },
      { author: 'Earnings Bot', text: 'Backtested on 200+ earnings calls. Win rate holds above 68%.' },
      { author: 'Lisa Park', text: 'The tone analysis on CFO answers is surprisingly predictive.' },
      { author: 'Vol Trader', text: 'Using this for pre-earnings straddle sizing. Game changer for vol desks.' },
    ],
  },
  {
    thumbId: 'btc-ultimate',
    creator: 'Regime Capital',
    title: 'Macro Regime Alpha',
    description: 'Classifies Fed/macro environment into 4 regimes using yield curve, VIX, and credit spreads. Auto-rotates between equities, bonds, commodities, and cash for all-weather returns.',
    tickers: ['SPY', 'TLT', 'GLD', 'BTC'],
    stars: 198, remixes: 29, annualizedReturn: '+156.7%', pulse: 'active',
    comments: [
      { author: 'Alice Chen', text: 'Survived the March correction with only -2% drawdown. Perfectly timed.' },
      { author: 'Macro Degen', text: 'Finally someone who gets that the game is regime detection, not prediction.' },
      { author: 'Bond King Jr', text: 'The yield curve signal is cleaner than anything I built in 10 years.' },
      { author: 'CTA Fund', text: 'We allocate 15% of our book to this strategy now. Consistent alpha.' },
      { author: 'Risk Parity Fan', text: 'This is basically Bridgewater All Weather for retail. Love it.' },
    ],
  },
];

const FLOATING_DATA = [
  { text: 'NVDA', x: '12%', y: '15%', opacity: 0.07, size: 11, delay: 0 },
  { text: '+2.4%', x: '8%', y: '65%', opacity: 0.05, size: 10, delay: 1.2 },
  { text: 'BTC', x: '88%', y: '25%', opacity: 0.06, size: 11, delay: 0.6 },
  { text: '$142.8', x: '82%', y: '72%', opacity: 0.05, size: 10, delay: 2.4 },
  { text: 'SPY', x: '45%', y: '8%', opacity: 0.04, size: 10, delay: 1.8 },
  { text: 'TSM', x: '72%', y: '88%', opacity: 0.06, size: 10, delay: 0.3 },
  { text: '\u03b1', x: '20%', y: '85%', opacity: 0.05, size: 13, delay: 3.0 },
  { text: '\u03a3', x: '92%', y: '50%', opacity: 0.04, size: 12, delay: 1.5 },
  { text: '+338%', x: '55%', y: '90%', opacity: 0.04, size: 10, delay: 2.1 },
  { text: 'GLD', x: '35%', y: '5%', opacity: 0.05, size: 10, delay: 0.9 },
];

function HeroAvatar({ name, size = 18 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

function HeroSpotlight({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx(i => (i + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = HERO_SLIDES[idx];
  const Thumb = THUMBNAIL_MAP[slide.thumbId];

  return (
    <div className="w-full max-w-[1600px] flex flex-col gap-[0px]">
    <div
      className="relative rounded-[12px] overflow-hidden cursor-pointer group/hero"
      style={{ height: 340, border: '0.5px solid rgba(0,0,0,0.3)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0" style={{ background: '#0c0c14' }} />
      <div className="absolute" style={{ width: '55%', height: '120%', top: '-10%', left: '20%', background: 'radial-gradient(ellipse, rgba(73,163,166,0.13) 0%, rgba(73,163,166,0.04) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute" style={{ width: '35%', height: '60%', top: '-5%', right: '5%', background: 'radial-gradient(ellipse, rgba(220,180,80,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      <div className="absolute" style={{ width: '30%', height: '50%', bottom: '0%', left: '5%', background: 'radial-gradient(ellipse, rgba(60,100,200,0.06) 0%, transparent 65%)', filter: 'blur(45px)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', backgroundSize: '4px 4px' }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {FLOATING_DATA.map((d, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            left: d.x, top: d.y, opacity: d.opacity, fontSize: d.size,
            color: 'rgba(255,255,255,0.9)',
            fontFamily: "'Delight', monospace",
            animation: `heroFloat 8s ease-in-out ${d.delay}s infinite alternate`,
          }}
        >
          {d.text}
        </span>
      ))}

      <div className="relative z-[1] flex items-stretch h-full">
        <div className="flex-[4] min-w-0 flex flex-col justify-center pl-[40px] pr-[20px] py-[32px]" style={{ fontFamily: "'Delight', sans-serif" }}>
          <div className="flex items-center gap-[8px] mb-[14px]">
            <span className="text-[11px] px-[8px] py-[3px] rounded-full font-medium" style={{ background: 'rgba(73,163,166,0.15)', color: '#49a3a6', border: '1px solid rgba(73,163,166,0.2)' }}>Featured</span>
            <span className="text-[11px] tracking-[0.05em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Playbook of the Week</span>
          </div>

          <h3 className="text-[26px] leading-[34px] tracking-[-0.01em] font-medium truncate" style={{ color: 'rgba(255,255,255,0.95)' }}>
            {slide.title}
          </h3>

          <div className="flex items-center gap-[8px] mt-[10px]">
            <HeroAvatar name={slide.creator} size={20} />
            <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{slide.creator}</span>
            <PulseIndicator status={slide.pulse} />
            <span className="ml-[4px] text-[12px] px-[8px] py-[2px] rounded-[4px] font-medium" style={{ background: 'rgba(73,163,166,0.12)', color: '#49a3a6' }}>{slide.annualizedReturn}</span>
          </div>

          <p className="text-[13px] leading-[21px] tracking-[0.01em] mt-[12px] overflow-hidden" style={{ color: 'rgba(255,255,255,0.4)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {slide.description}
          </p>

          <div className="relative mt-[14px] pt-[12px] overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', height: 48 }}>
            <div className="flex flex-col" style={{ animation: `heroScrollUp ${slide.comments.length * 4}s linear infinite`, animationPlayState: paused ? 'paused' : 'running' }}>
              {[...slide.comments, ...slide.comments].map((c, i) => (
                <div key={i} className="flex items-start gap-[6px] shrink-0" style={{ height: 48 }}>
                  <HeroAvatar name={c.author} size={15} />
                  <p className="text-[11px] leading-[17px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>{c.author}</span>{' '}&ldquo;{c.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[5px] mt-[16px]">
            {slide.tickers.map(t => (
              <span key={t} className="text-[10px] px-[7px] py-[2px] rounded-[4px] font-medium tracking-[0.03em]" style={{ background: 'rgba(73,163,166,0.12)', color: 'rgba(73,163,166,0.75)', border: '1px solid rgba(73,163,166,0.1)' }}>{t}</span>
            ))}
            <div className="ml-auto flex items-center gap-[12px]">
              <span className="flex items-center gap-[3px] text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 2z" /></svg>
                {slide.stars}
              </span>
              <span className="flex items-center gap-[3px] text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3l2 2-2 2" /><path d="M3 7V6a2 2 0 012-2h6" /><path d="M5 13l-2-2 2-2" /><path d="M13 9v1a2 2 0 01-2 2H5" /></svg>
                {slide.remixes}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-[7] min-w-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-white">
            <div className="w-full h-full transition-transform duration-700 ease-out group-hover/hero:scale-[1.015] origin-center [&>svg]:w-full [&>svg]:h-full">
              {Thumb && <Thumb />}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); }}
          className="absolute left-[12px] top-1/2 -translate-y-1/2 z-[3] size-[32px] rounded-full flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5" /></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % HERO_SLIDES.length); }}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 z-[3] size-[32px] rounded-full flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
        </button>
      </div>
    </div>
      <div className="flex justify-center gap-[6px] mt-[10px]">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width: i === idx ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: i === idx ? 'rgba(73,163,166,0.5)' : 'rgba(0,0,0,0.10)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ========== Category Tabs ========== */

function CategoryTabs({ active, onChange }: { active: string; onChange: (cat: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 1600 }}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          data-text={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: '6px 16px',
            borderRadius: 4,
            border: 'none',
            background: cat === active ? 'rgba(73,163,166,0.2)' : 'var(--b-r03, rgba(0,0,0,0.03))',
            fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 14,
            lineHeight: '22px',
            letterSpacing: 0.14,
            fontWeight: cat === active ? 500 : 400,
            color: cat === active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

/* ========== PlaybookCard (Homepage style) ========== */

function PlaybookCard({ p }: { p: ExplorePlaybook }) {
  return (
    <div
      className="cursor-pointer transition-shadow hover:shadow-l"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--b0-page, #fff)',
        border: '0.5px solid rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cover placeholder */}
      <div
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          aspectRatio: '472 / 265.5',
          borderRadius: 8,
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: '26px',
              fontWeight: 400,
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
              letterSpacing: 0.16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: '20px',
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              letterSpacing: 0.12,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {p.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
            <Avatar name={p.creator} size={22} />
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'var(--text-n9, rgba(0,0,0,0.9))',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {p.creator}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="star-l" size={16} />
              {p.stars}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="remix-l" size={16} />
              {p.remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 页面 ========== */

export default function Explore2({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState('Featured');
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @keyframes heroScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <AppShell
        activePage="explore-2"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex flex-col items-center min-h-full">
          <div className="flex flex-col gap-[24px] items-center pb-[60px] pt-[32px] px-[28px] w-full">
            <div className="w-full max-w-[1600px]">
              <h2 className="text-[22px] tracking-[0.22px] text-[rgba(0,0,0,0.9)]" style={{ fontFamily: "'Delight', sans-serif", fontWeight: 500 }}>Explore</h2>
            </div>
            <HeroSpotlight onNavigate={onNavigate!} />
            <CategoryTabs active={activeTab} onChange={setActiveTab} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 24,
                width: '100%',
                maxWidth: 1600,
              }}
            >
              {PLAYBOOKS.map((pb, i) => (
                <div key={pb.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-[fadeInUp_0.4s_ease-out_both]">
                  <PlaybookCard p={pb} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]" onMouseEnter={() => setIsUserInfoOpen(true)} onMouseLeave={() => setIsUserInfoOpen(false)}>
          <UserInfo />
        </div>
      )}
    </>
  );
}
