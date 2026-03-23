/**
 * [INPUT]: AppShell, PulseIndicator, chart-theme
 * [OUTPUT]: Home V3 — 左侧 Playbook 列表 + 右侧拟物化详情窗口 + Remix 引导
 * [POS]: 页面层 — 左右分栏 Playbook 浏览原型
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { PulseIndicator } from '@/app/components/community/PulseIndicator';
import { AVATAR_COLOR_PALETTE, CHART_COLORS } from '@/lib/chart-theme';

/* ========== 类型 ========== */

interface HomeV3Props {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

/* (ChatMode pills removed — replaced by attachment button) */

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

/* ========== Playbook 数据 ========== */

interface PlaybookItem {
  id: string;
  title: string;
  creator: string;
  pulse: 'active' | 'idle';
  description: string;
  tickers: string[];
  annualizedReturn: string;
  themeColor: string;
  stars: number;
  remixes: number;
}

const PLAYBOOKS: PlaybookItem[] = [
  {
    id: 'btc-ultimate',
    title: 'BTC Ultimate AI Trader',
    creator: 'Alva Intern',
    pulse: 'active',
    description: 'Dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core BTC price movements.',
    tickers: ['BTC', 'ETH', 'SOL'],
    annualizedReturn: '+338.23%',
    themeColor: C.primary,
    stars: 142,
    remixes: 23,
  },
  {
    id: 'mag7-rebalance',
    title: 'MAG7 Equal-Weight',
    creator: 'Harry Zzz',
    pulse: 'active',
    description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly to capture sector rotation alpha.',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
    annualizedReturn: '+142.8%',
    themeColor: C.blue,
    stars: 89,
    remixes: 14,
  },
  {
    id: 'nvda-tsm',
    title: 'NVDA +3% Triggered TSM',
    creator: 'Smart Jing',
    pulse: 'active',
    description: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss. A classic pair-trade signal.',
    tickers: ['NVDA', 'TSM'],
    annualizedReturn: '+27.73%',
    themeColor: C.red,
    stars: 48,
    remixes: 7,
  },
  {
    id: 'attribution-analysis',
    title: 'Attribution Analysis',
    creator: 'Sheer YLL YGG',
    pulse: 'active',
    description: 'Monitor selected tokens to detect abnormal changes in Open Interest and trading volume, generating real-time alerts for unusual market activity.',
    tickers: ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX'],
    annualizedReturn: '+85.6%',
    themeColor: C.orange,
    stars: 72,
    remixes: 11,
  },
  {
    id: 'btc-macd',
    title: 'BTC MACD 1h Crossover',
    creator: 'Macro Scope X',
    pulse: 'idle',
    description: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    annualizedReturn: '+12.8%',
    themeColor: C.deepBlue,
    stars: 34,
    remixes: 5,
  },
];

/* ========== 缩略图 320×180 ========== */

const TW = 320;
const TH = 180;

function ThumbPlaybookDetail() {
  const lineData = [100, 108, 103, 115, 112, 128, 135, 140, 132, 148, 155, 162, 158, 172, 180, 195, 210, 225, 238];
  const rsiData = [45, 52, 48, 62, 58, 70, 65, 72, 68, 55, 48, 42, 50, 58, 65, 60, 55, 48, 52];
  const line = smoothLine(lineData, 8, 8, 304, 72);
  const area = areaFromLine(line, 8, 8, 304, 72);
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hv3-t1-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="78" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={area} fill="url(#hv3-t1-g)" />
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
    <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hv3-t2-g" x1="0" y1="0" x2="0" y2="1">
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
      <path d={areaFromLine(priceLine, 8, 40, 304, 68)} fill="url(#hv3-t2-g)" />
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

function ThumbNarrativeStock() {
  const priceData = [100, 104, 108, 106, 112, 110, 116, 114, 120, 118, 124, 122, 128, 125, 130];
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hv3-t3-g" x1="0" y1="0" x2="0" y2="1">
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
          </g>
        );
      })}
      <rect x="6" y="68" width="196" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="74" width="60" height="3" rx={1} fill={C.primary} opacity={0.4} />
      {textLines(12, 82, 180, 3, 6)}
      <rect x="12" y="104" width="50" height="3" rx={1} fill={C.green} opacity={0.3} />
      {textLines(12, 112, 180, 3, 6)}
      <rect x="206" y="68" width="108" height="106" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="212" y="72" width="36" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      {(() => { const l = smoothLine(priceData, 210, 80, 98, 60); return <><path d={areaFromLine(l, 210, 80, 98, 60)} fill="url(#hv3-t3-g)" /><path d={l} fill="none" stroke={C.red} strokeWidth="0.9" /></>; })()}
      {kpiCell(212, 148, 44, 20, C.primary)}
      {kpiCell(260, 148, 44, 20, C.orange)}
    </svg>
  );
}

function ThumbWidgetGrid() {
  const lineA = [40, 45, 42, 55, 52, 60, 58, 65, 70, 68, 75, 72, 80];
  const lineB = [20, 25, 22, 30, 28, 35, 32, 38, 42, 40, 48, 45, 52];
  const volData = [50, 70, 40, 80, 60, 90, 55, 75, 65, 85];
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hv3-t4-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orange} stopOpacity="0.2" />
          <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 4-cell KPI */}
      {[0, 1, 2, 3].map(i => {
        const cx = 6 + i * 78;
        const colors = [C.primary, C.orange, C.green, C.blue];
        return (
          <g key={i}>
            <rect x={cx} y="6" width="74" height="28" rx="2" fill="#fafafa" />
            <rect x={cx + 4} y="10" width="24" height="2" rx={1} fill="rgba(0,0,0,0.10)" />
            <rect x={cx + 4} y="15" width="36" height="3.5" rx={1} fill={colors[i]} opacity={0.6} />
            <rect x={cx + 4} y="22" width="18" height="2" rx={1} fill="rgba(0,0,0,0.06)" />
          </g>
        );
      })}
      {/* Main dual-line chart */}
      <rect x="6" y="38" width="204" height="136" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={smoothLine(lineA, 12, 44, 192, 60)} fill="none" stroke={C.orange} strokeWidth="1" />
      <path d={smoothLine(lineB, 12, 44, 192, 60)} fill="none" stroke={C.primary} strokeWidth="1" opacity={0.6} />
      {bars(volData, 12, 120, 192, 48, C.orange, 0.2)}
      {/* Right side cards */}
      <rect x="214" y="38" width="100" height="66" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      {textLines(220, 46, 88, 4, 7)}
      <rect x="220" y="80" width="60" height="3" rx={1} fill={C.green} opacity={0.4} />
      {textLines(220, 88, 88, 1, 6)}
      <rect x="214" y="108" width="100" height="66" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={smoothLine([10, 15, 12, 20, 18, 25], 220, 114, 88, 28)} fill="none" stroke={C.deepBlue} strokeWidth="0.8" />
      {kpiCell(220, 148, 40, 18, C.primary)}
      {kpiCell(266, 148, 40, 18, C.red)}
    </svg>
  );
}

function ThumbMACDSimple() {
  const priceData = [100, 102, 98, 105, 103, 108, 106, 110, 107, 112, 109, 114, 111, 116, 113, 118];
  const macdData = [0, 2, -1, 4, 2, 6, 3, 7, 4, 8, 5, 9, 6, 10, 7, 11];
  const line = smoothLine(priceData, 8, 8, 304, 80);
  return (
    <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hv3-t5-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.deepBlue} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C.deepBlue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="308" height="90" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d={areaFromLine(line, 8, 8, 304, 80)} fill="url(#hv3-t5-g)" />
      <path d={line} fill="none" stroke={C.deepBlue} strokeWidth="1.2" />
      <rect x="6" y="100" width="308" height="74" rx="3" fill="white" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <rect x="12" y="104" width="32" height="2.5" rx={1} fill="rgba(0,0,0,0.10)" />
      <line x1="8" y1="136" x2="312" y2="136" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3" strokeDasharray="2 2" />
      {bars(macdData.map(Math.abs), 12, 112, 296, 56, C.deepBlue, 0.2)}
      <path d={smoothLine(macdData, 12, 112, 296, 56)} fill="none" stroke={C.red} strokeWidth="0.8" />
    </svg>
  );
}

const THUMB_MAP: Record<string, () => React.ReactNode> = {
  'btc-ultimate': ThumbPlaybookDetail,
  'mag7-rebalance': ThumbStockDashboard,
  'nvda-tsm': ThumbNarrativeStock,
  'attribution-analysis': ThumbWidgetGrid,
  'btc-macd': ThumbMACDSimple,
};

/* ========== 拟真头像 ========== */

const CREATOR_AVATARS: Record<string, string> = {
  'Alva Intern': 'https://api.dicebear.com/9.x/notionists/svg?seed=AlvaIntern&backgroundColor=e8f5e9',
  'Harry Zzz': 'https://api.dicebear.com/9.x/notionists/svg?seed=HarryZzz&backgroundColor=e3f2fd',
  'Smart Jing': 'https://api.dicebear.com/9.x/notionists/svg?seed=SmartJing&backgroundColor=fce4ec',
  'Sheer YLL YGG': 'https://api.dicebear.com/9.x/notionists/svg?seed=SheerYLL&backgroundColor=fff3e0',
  'Macro Scope X': 'https://api.dicebear.com/9.x/notionists/svg?seed=MacroScopeX&backgroundColor=ede7f6',
  'Leo Leo': 'https://api.dicebear.com/9.x/notionists/svg?seed=LeoLeo&backgroundColor=e0f7fa',
};

function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const src = CREATOR_AVATARS[name];
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, objectFit: 'cover', background: '#f0f0f0' }}
      />
    );
  }
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== 左侧列表项 ========== */

function PlaybookListItem({ item, active, onClick }: { item: PlaybookItem; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative pl-[20px] py-[20px] pr-[16px] cursor-pointer transition-all ${
        active ? 'bg-white/60' : 'hover:bg-white/30'
      }`}
    >
      {/* 左侧活跃指示条 */}
      <div
        className="absolute left-0 top-[16px] bottom-[16px] w-[3px] rounded-r-full transition-all"
        style={{
          background: active ? item.themeColor : 'transparent',
          boxShadow: active ? `0 0 8px ${item.themeColor}40` : 'none',
        }}
      />

      <h3
        className={`font-['Delight',sans-serif] text-[15px] leading-[22px] font-normal mb-[6px] transition-colors ${
          active ? 'text-[rgba(0,0,0,0.88)]' : 'text-[rgba(0,0,0,0.40)]'
        }`}
      >
        {item.title}
      </h3>

      <p
        className={`font-['Delight',sans-serif] text-[13px] leading-[20px] mb-[10px] transition-colors line-clamp-2 ${
          active ? 'text-[rgba(0,0,0,0.55)]' : 'text-[rgba(0,0,0,0.25)]'
        }`}
      >
        {item.description}
      </p>

      {/* Creator */}
      <div className="flex items-center gap-[6px] mb-[8px]">
        <Avatar name={item.creator} size={18} />
        <span className={`font-['Delight',sans-serif] text-[12px] leading-[16px] transition-colors ${active ? 'text-[rgba(0,0,0,0.55)]' : 'text-[rgba(0,0,0,0.30)]'}`}>
          {item.creator}
        </span>
      </div>

      {/* Tickers */}
      <div className="flex items-center gap-[6px] flex-wrap">
        <span className="text-[11px] leading-[16px] font-['Delight',sans-serif] text-[rgba(0,0,0,0.3)]">+</span>
        {item.tickers.slice(0, 3).map(t => (
          <span
            key={t}
            className="px-[8px] py-[1px] rounded-[4px] text-[11px] leading-[16px] font-['Delight',sans-serif] font-normal bg-[rgba(0,0,0,0.04)] text-[rgba(0,0,0,0.45)]"
          >
            {t}
          </span>
        ))}
        {item.tickers.length > 3 && (
          <span className="text-[11px] leading-[16px] font-['Delight',sans-serif] text-[rgba(0,0,0,0.25)]">
            +{item.tickers.length - 3}
          </span>
        )}
      </div>

      {/* 分隔线（非最后一项） */}
      <div className="absolute bottom-0 left-[20px] right-[16px] h-px bg-[rgba(0,0,0,0.05)]" />
    </div>
  );
}

/* ========== 社区讨论 mock ========== */

const DISCUSSIONS: Record<string, { user: string; text: string; time: string }[]> = {
  'btc-ultimate': [
    { user: 'Macro Scope X', text: 'RSI threshold at 30 works better in sideways markets', time: '2h' },
    { user: 'Leo Leo', text: 'Remixed with SOL — Bollinger bands need wider σ for alts', time: '5h' },
    { user: 'Harry Zzz', text: 'Backtested Jan–Mar, drawdown stays under 12%', time: '1d' },
  ],
  'mag7-rebalance': [
    { user: 'Alva Intern', text: 'Consider adding equal-weight S&P500 as benchmark', time: '3h' },
    { user: 'Smart Jing', text: 'Monthly vs weekly rebalance — any data on the diff?', time: '8h' },
  ],
  'nvda-tsm': [
    { user: 'Harry Zzz', text: 'The 3% threshold is interesting — tested 2% and 5% too?', time: '1h' },
    { user: 'Leo Leo', text: 'Added ASML as a third leg, results look promising', time: '4h' },
  ],
  'attribution-analysis': [
    { user: 'Macro Scope X', text: 'OI divergence signal on SOL was spot-on last week', time: '6h' },
    { user: 'Alva Intern', text: 'Would love to see funding rate integrated', time: '1d' },
  ],
  'btc-macd': [
    { user: 'Sheer YLL YGG', text: 'Simple and clean. Works best in trending regimes', time: '2d' },
  ],
};

/* ========== 右侧拟物化详情窗口 ========== */

function PlaybookDetailWindow({ item }: { item: PlaybookItem }) {
  const Thumb = THUMB_MAP[item.id];
  const discussions = DISCUSSIONS[item.id] ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* 拟物化窗口容器 */}
      <div
        className="flex-1 rounded-[12px] overflow-hidden flex flex-col"
        style={{
          background: '#fff',
          boxShadow: '0 1px 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.06)',
        }}
      >
        {/* 窗口标题栏 — macOS 风格 + Remix 按钮 */}
        <div className="flex items-center justify-between px-[16px] h-[40px] shrink-0" style={{ background: 'linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-[7px]">
            <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#FF5F57', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.12)' }} />
            <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#FEBC2E', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.12)' }} />
            <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#28C840', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.12)' }} />
          </div>
          <span className="font-['Delight',sans-serif] text-[11px] text-[rgba(0,0,0,0.35)] tracking-[0.2px]">
            {item.title} — Alva Playbook
          </span>
          {/* Remix 按钮 */}
          <button
            className="flex items-center gap-[5px] px-[12px] py-[4px] rounded-[7px] border-none cursor-pointer transition-all hover:brightness-105 active:brightness-95"
            style={{
              background: `linear-gradient(180deg, ${item.themeColor} 0%, ${item.themeColor}dd 100%)`,
              boxShadow: `0 1px 3px ${item.themeColor}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-['Delight',sans-serif] text-[11px] leading-[16px] font-normal text-white">
              Remix
            </span>
          </button>
        </div>

        {/* Dashboard 缩略图区域 — flex-1 撑满 */}
        <div className="relative overflow-hidden flex-1 min-h-[200px]">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 80%, ${item.themeColor}08 0%, transparent 60%), radial-gradient(circle, rgba(0,0,0,0.04) 0.6px, transparent 0.6px)`,
              backgroundSize: '100% 100%, 3px 3px',
            }}
          />
          <div className="relative z-[1] h-full flex items-center justify-center p-[12px]">
            {Thumb && <Thumb />}
          </div>
        </div>

        {/* 社区讨论（紧凑） */}
        <div className="shrink-0 px-[16px] py-[10px]" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-[6px] mb-[8px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 3a1 1 0 011-1h8a1 1 0 011 1v5a1 1 0 01-1 1H5l-2 2V9H2a1 1 0 01-1-1V3z" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
            </svg>
            <span className="font-['Delight',sans-serif] text-[11px] leading-[16px] text-[rgba(0,0,0,0.30)]">
              Discussion · {discussions.length} comments
            </span>
            <span
              className="ml-auto font-['Delight',sans-serif] text-[11px] leading-[16px] text-[rgba(0,0,0,0.20)]"
            >
              {item.stars} stars · {item.remixes} remixes
            </span>
          </div>
          {discussions.slice(0, 2).map((d, i) => (
            <div key={i} className="flex items-start gap-[8px] mb-[6px] last:mb-0">
              <Avatar name={d.user} size={16} />
              <p className="font-['Delight',sans-serif] text-[11px] leading-[16px] text-[rgba(0,0,0,0.45)] flex-1 line-clamp-1">
                <span className="text-[rgba(0,0,0,0.60)]">{d.user.split(' ')[0]}</span>
                {' '}{d.text}
              </p>
              <span className="font-['Delight',sans-serif] text-[10px] leading-[16px] text-[rgba(0,0,0,0.20)] shrink-0">{d.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== AI Chat Hero ========== */

function ChatHero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <section className="w-full flex justify-center pt-[40px] pb-[40px] px-[24px]">
      <div className="w-full max-w-[720px]">
        {/* Skills pill banner */}
        <div className="flex justify-center mb-[16px]">
          <button
            onClick={() => onNavigate('skills')}
            className="inline-flex items-center gap-[8px] px-[6px] py-[5px] pr-[16px] rounded-full bg-white/80 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all cursor-pointer group"
          >
            <span className="px-[10px] py-[2px] rounded-full bg-[#49a3a6] text-white text-[12px] leading-[18px] font-['Delight',sans-serif] font-normal">
              New
            </span>
            <span className="text-[13px] leading-[20px] font-['Delight',sans-serif] font-normal text-[rgba(0,0,0,0.7)] group-hover:text-[rgba(0,0,0,0.9)] transition-colors">
              Try Alva Skills — build with your Local Agent
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover:opacity-70 transition-opacity">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <h1 className="font-['Delight',sans-serif] text-[22px] leading-[30px] font-normal text-[rgba(0,0,0,0.88)] text-center mb-[16px]">
          Ideas in, alpha out.
        </h1>

        {/* Chat input */}
        <div className="rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <textarea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Describe a trading strategy and I'll build a Playbook for you..."
            rows={2}
            className="w-full resize-none border-none outline-none px-[20px] pt-[14px] pb-[6px] text-[14px] leading-[22px] font-['Delight',sans-serif] text-[rgba(0,0,0,0.85)] placeholder:text-[rgba(0,0,0,0.25)]"
            style={{ background: 'transparent' }}
          />
          <div className="flex items-center justify-between px-[16px] pb-[10px]">
            {/* Attachment button */}
            <button
              className="w-[32px] h-[32px] rounded-full border border-[rgba(0,0,0,0.12)] bg-transparent hover:bg-[rgba(0,0,0,0.04)] transition-colors flex items-center justify-center cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button className="w-[32px] h-[32px] rounded-full bg-[#49a3a6] hover:bg-[#3d8e91] transition-colors flex items-center justify-center border-none cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== Playbook 浏览区（填满剩余高度，滚动切换） ========== */

function PlaybookBrowser({ selectedIdx, onSelect }: { selectedIdx: number; onSelect: (idx: number) => void }) {
  const selected = PLAYBOOKS[selectedIdx];
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const prevIdxRef = useRef(selectedIdx);
  const panelRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  /* 动画方向检测 */
  useEffect(() => {
    if (prevIdxRef.current !== selectedIdx) {
      setDirection(selectedIdx > prevIdxRef.current ? 'down' : 'up');
      setAnimating(true);
      prevIdxRef.current = selectedIdx;
      const t = setTimeout(() => setAnimating(false), 400);
      return () => clearTimeout(t);
    }
  }, [selectedIdx]);

  /* wheel + touchmove 驱动切换 */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    let touchStartY = 0;
    let accumulated = 0;
    const THRESHOLD = 60;

    const step = (dir: 1 | -1) => {
      if (cooldownRef.current) return;
      onSelect(Math.max(0, Math.min(PLAYBOOKS.length - 1,
        (dir === 1 ? prevIdxRef.current + 1 : prevIdxRef.current - 1)
      )));
      cooldownRef.current = true;
      accumulated = 0;
      setTimeout(() => { cooldownRef.current = false; }, 450);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cooldownRef.current) return;
      accumulated += e.deltaY;
      if (accumulated > THRESHOLD) step(1);
      else if (accumulated < -THRESHOLD) step(-1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      accumulated = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      if (cooldownRef.current) return;
      accumulated = dy;
      if (accumulated > THRESHOLD) { step(1); touchStartY = e.touches[0].clientY; }
      else if (accumulated < -THRESHOLD) { step(-1); touchStartY = e.touches[0].clientY; }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [onSelect]);

  const detailStyle: React.CSSProperties = animating
    ? { animation: `hv3-slide-${direction} 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards` }
    : {};

  return (
    <div ref={panelRef} className="flex-1 flex flex-col min-h-0 px-[24px] pb-[20px]">
      <div className="flex-1 flex flex-col min-h-0 w-full max-w-[1120px] mx-auto">
        {/* Section 标题 */}
        <div className="mb-[12px] flex items-center gap-[12px] shrink-0">
          <h2 className="font-['Delight',sans-serif] text-[17px] leading-[24px] font-normal text-[rgba(0,0,0,0.80)]">
            This Week's Alpha
          </h2>
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.30)]">
            Top strategies the community is remixing right now
          </span>
        </div>

        {/* 左右分栏 — flex-1 吃满剩余高度 */}
        <div
          className="flex rounded-[16px] overflow-hidden flex-1 min-h-0"
          style={{
            border: '1px solid rgba(0,0,0,0.06)',
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          {/* 左侧列表 */}
          <div className="w-[340px] shrink-0 border-r border-[rgba(0,0,0,0.05)] overflow-y-auto">
            {PLAYBOOKS.map((pb, i) => (
              <PlaybookListItem
                key={pb.id}
                item={pb}
                active={i === selectedIdx}
                onClick={() => onSelect(i)}
              />
            ))}
          </div>

          {/* 右侧详情 */}
          <div className="flex-1 px-[20px] py-[12px] flex items-stretch justify-center overflow-hidden">
            <div className="w-full max-w-[520px] flex flex-col" style={detailStyle} key={selected.id}>
              <PlaybookDetailWindow item={selected} />
            </div>
          </div>
        </div>

        {/* 位置指示器 */}
        <div className="flex justify-center gap-[6px] mt-[12px] shrink-0">
          {PLAYBOOKS.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="border-none cursor-pointer p-0"
              style={{
                width: i === selectedIdx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === selectedIdx ? PLAYBOOKS[i].themeColor : 'rgba(0,0,0,0.10)',
                transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== 主页面 ========== */

export default function HomeV3({ onNavigate, onOpenSearch }: HomeV3Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <AppShell activePage={'home-v3' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <style>{`
        @keyframes hv3-slide-down {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hv3-slide-up {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* 全屏 flex 列布局：ChatHero 自然高度 + PlaybookBrowser 占满剩余 */}
      <div className="h-screen flex flex-col bg-[#fafafa] overflow-hidden">
        <div className="shrink-0 overflow-y-auto" style={{ maxHeight: '45vh' }}>
          <ChatHero onNavigate={onNavigate} />
        </div>
        <PlaybookBrowser selectedIdx={selectedIdx} onSelect={setSelectedIdx} />
      </div>
    </AppShell>
  );
}
