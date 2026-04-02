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
import { MOCK_CONVERSATIONS, setActiveConversation, setShouldStream } from '@/data/alva-chat-mock';
import type { MentionItem } from '@/app/components/mention/mention-data';
import { MentionPopover, MentionChip } from '@/app/components/mention/MentionPopover';

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

/* ========== Remix Prompt 模板 ========== */

const REMIX_PROMPTS: Record<string, string> = {
  'btc-ultimate': 'Remix this BTC strategy — switch RSI threshold to 25 and add an ETH correlation filter',
  'mag7-rebalance': 'Remix this portfolio — replace TSLA with AVGO and switch to weekly rebalance',
  'nvda-tsm': 'Remix this pair trade — test with AMD as trigger instead of NVDA, keep the same TP/SL',
  'attribution-analysis': 'Remix this monitor — add funding rate alerts and narrow to top 3 tokens by volume',
  'btc-macd': 'Remix this MACD strategy — try EMA(9,21) on 4h candles instead of 1h',
};

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

function PlaybookDetailWindow({ item, onRemix }: { item: PlaybookItem; onRemix: (item: PlaybookItem) => void }) {
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
            onClick={e => { e.stopPropagation(); onRemix(item); }}
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

interface ChatHeroProps {
  onNavigate: (page: Page) => void;
  inputValue: string;
  onInputChange: (v: string) => void;
  remixTarget: PlaybookItem | null;
  onClearRemix: () => void;
}

function ChatHero({ onNavigate, inputValue, onInputChange, remixTarget, onClearRemix }: ChatHeroProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mentions, setMentions] = useState<MentionItem[]>([]);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionAnchor, setMentionAnchor] = useState(-1);

  const handleSend = () => {
    setShouldStream(true);
    setActiveConversation(MOCK_CONVERSATIONS[0].id);
    onNavigate('alva-chat-detail');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionOpen) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onInputChange(value);
    const cursor = e.target.selectionStart ?? value.length;
    const before = value.slice(0, cursor);
    const atMatch = before.match(/(^|[\s])@([\w\s]*)$/);
    if (atMatch) {
      setMentionOpen(true);
      setMentionQuery(atMatch[2]);
      setMentionAnchor(cursor - atMatch[2].length - 1);
    } else if (mentionAnchor >= 0) {
      setMentionOpen(false);
      setMentionAnchor(-1);
    }
  };

  const handleAtClick = useCallback(() => {
    setMentionOpen(o => !o);
    setMentionQuery('');
    setMentionAnchor(-1);
  }, []);

  const handleMentionSelect = useCallback((item: MentionItem) => {
    if (mentionAnchor >= 0) {
      const before = inputValue.slice(0, mentionAnchor);
      const afterAtQuery = inputValue.slice(mentionAnchor).replace(/@[\w\s]*/, '');
      onInputChange(before + afterAtQuery);
    }
    setMentions(prev => prev.some(m => m.id === item.id) ? prev : [...prev, item]);
    setMentionOpen(false);
    setMentionAnchor(-1);
    textareaRef.current?.focus();
  }, [inputValue, mentionAnchor, onInputChange]);

  const handleMentionClose = useCallback(() => { setMentionOpen(false); setMentionAnchor(-1); }, []);

  /* Remix 触发后自动聚焦输入框 */
  useEffect(() => {
    if (remixTarget && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [remixTarget]);

  const hasChips = remixTarget || mentions.length > 0;

  return (
    <div className="w-full">
        {/* Chat input */}
        <div
          className="rounded-[16px] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all relative"
          style={{
            border: `0.5px solid ${remixTarget ? remixTarget.themeColor + '40' : 'rgba(0,0,0,0.2)'}`,
            overflow: 'visible',
          }}
        >
          {/* @ Mention Popover — 向下展开 */}
          {mentionOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 16, marginTop: 6, zIndex: 9999 }}>
              <MentionPopover
                query={mentionQuery}
                onSelect={handleMentionSelect}
                onClose={handleMentionClose}
                selectedIds={new Set(mentions.map(m => m.id))}
              />
            </div>
          )}

          {/* Chips: Remix target + @ mentions */}
          {hasChips && (
            <div className="px-[16px] pt-[12px] flex flex-wrap gap-[6px]">
              {remixTarget && (
                <MentionChip
                  item={{ id: 'remix-target', type: 'playbook', title: remixTarget.title, subtitle: remixTarget.creator, themeColor: remixTarget.themeColor }}
                  onRemove={onClearRemix}
                />
              )}
              {mentions.map(m => (
                <MentionChip key={m.id} item={m} onRemove={() => setMentions(prev => prev.filter(x => x.id !== m.id))} />
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={remixTarget ? 'Describe how you want to remix this strategy...' : 'Build an investing playbook from your ideas'}
            rows={2}
            className="w-full resize-none border-none outline-none px-[16px] pt-[16px] pb-[0px] text-[14px] leading-[22px] font-['Delight',sans-serif] text-[rgba(0,0,0,0.85)] placeholder:text-[rgba(0,0,0,0.3)]"
            style={{ background: 'transparent', minHeight: 48, maxHeight: 480, letterSpacing: '0.14px' }}
          />
          <div className="flex items-center gap-[12px] px-[16px] pb-[16px] pt-[12px] h-[28px]" style={{ boxSizing: 'content-box' }}>
            {/* @ button */}
            <button
              onClick={handleAtClick}
              className="cursor-pointer transition-colors shrink-0 flex items-center justify-center"
              style={{ background: 'none', border: 'none', padding: 0, width: 16, height: 16 }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke={mentionOpen ? '#49a3a6' : 'rgba(0,0,0,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 10v1.25a2.25 2.25 0 0 0 4.5 0V10a8 8 0 1 0-3.12 6.35" stroke={mentionOpen ? '#49a3a6' : 'rgba(0,0,0,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Image upload button */}
            <button
              className="cursor-pointer transition-colors shrink-0 flex items-center justify-center"
              style={{ background: 'none', border: 'none', padding: 0, width: 16, height: 16 }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="3" width="16" height="14" rx="2" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="8" r="1.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5"/>
                <path d="M18 13l-4.293-4.293a1 1 0 0 0-1.414 0L5 16" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Spacer + Model selector */}
            <div className="flex-1 flex items-center justify-end gap-[4px] min-w-0">
              <button
                className="flex items-center gap-[4px] cursor-pointer transition-colors"
                style={{ background: 'none', border: 'none', padding: '4px 0', fontFamily: "'Delight', sans-serif", fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px', color: 'rgba(0,0,0,0.5)' }}
              >
                <span>Sonnet 4.6</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            {/* Send button */}
            <button
              onClick={handleSend}
              className="w-[28px] h-[28px] rounded-[6px] bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.1)] transition-colors flex items-center justify-center border-none cursor-pointer shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M7 3L3.5 6.5M7 3l3.5 3.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
    </div>
  );
}

/* ========== What You Can Build 标签数据 ========== */

const BUILD_TAGS = [
  { label: 'EV Supply Chain Intelligence', active: true },
  { label: 'Unusual Volume Scanner', active: false },
  { label: 'Earnings Whisper Board', active: false },
  { label: 'Thesis Debate Room', active: false },
  { label: 'Macro Regime Adaptive Trading', active: false },
];

/* ========== What You Can Build 区块 ========== */

function WhatYouCanBuild({ onRemix }: { onRemix: (item: PlaybookItem) => void }) {
  const featured = PLAYBOOKS[0];
  const Thumb = THUMB_MAP[featured.id];

  return (
    <section
      className="w-full"
      style={{ background: '#f6f6f6', borderTop: '0.5px solid rgba(0,0,0,0.15)', borderBottom: '0.5px solid rgba(0,0,0,0.15)' }}
    >
      <div className="max-w-[1272px] mx-auto px-[50px] py-[20px]">
        <div className="flex gap-[28px] items-stretch">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-[24px] py-[10px]">
            <h2 className="font-['Delight',sans-serif] text-[24px] leading-[1.2] font-normal text-[rgba(0,0,0,0.9)]" style={{ letterSpacing: '0.24px' }}>
              What You Can Build
            </h2>
            <div className="flex flex-wrap gap-[10px]">
              {BUILD_TAGS.map(tag => (
                <button
                  key={tag.label}
                  className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-[6px] border-none cursor-pointer font-['Delight',sans-serif] text-[14px] leading-[22px] font-normal text-[rgba(0,0,0,0.9)] whitespace-nowrap"
                  style={{
                    background: tag.active ? '#e5eeee' : 'white',
                    border: '0.5px solid rgba(0,0,0,0.3)',
                    letterSpacing: '0.14px',
                  }}
                >
                  {tag.label}
                </button>
              ))}
              <span className="flex items-center py-[8px] font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.5)] cursor-pointer" style={{ letterSpacing: '0.14px' }}>
                Explore More
              </span>
            </div>
            <button
              onClick={() => onRemix(featured)}
              className="flex items-center gap-[8px] px-[16px] py-[9px] rounded-[8px] bg-[#49a3a6] border-none cursor-pointer w-fit hover:brightness-105 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] font-medium text-white" style={{ letterSpacing: '0.14px' }}>
                Remix This
              </span>
            </button>
          </div>

          {/* Right — Preview Card */}
          <div
            className="flex-1 rounded-[12px] overflow-hidden relative"
            style={{
              border: '0.5px solid rgba(0,0,0,0.3)',
              background: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              aspectRatio: '522/666',
            }}
          >
            {/* Thumbnail */}
            <div className="absolute inset-[8px] bottom-[160px]">
              <div className="w-full h-full rounded-[4px] overflow-hidden bg-[#fafafa]">
                {Thumb && <Thumb />}
              </div>
            </div>
            {/* Creator footer with gradient */}
            <div
              className="absolute bottom-0 left-0 right-0 flex flex-col justify-end px-[16px] pb-[16px] pt-[56px]"
              style={{ background: 'linear-gradient(180deg, transparent 0%, white 60%)' }}
            >
              <div className="flex items-center gap-[16px] pt-[16px]" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="flex items-center gap-[4px]">
                  <Avatar name={featured.creator} size={22} />
                  <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.9)]" style={{ letterSpacing: '0.14px' }}>
                    {featured.creator.split(' ')[0].toLowerCase()}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-end gap-[16px]">
                  <div className="flex items-center gap-[4px]">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2l2.09 6.26H18.18l-4.93 3.58L15.34 18 10 14.27 4.66 18l2.09-6.16L1.82 8.26h6.09L10 2z" stroke="rgba(0,0,0,0.9)" strokeWidth="1.2" fill="none" />
                    </svg>
                    <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.9)]" style={{ letterSpacing: '0.14px' }}>
                      12.8K
                    </span>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2" stroke="rgba(0,0,0,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.9)]" style={{ letterSpacing: '0.14px' }}>
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========== Featured Playbooks 卡片 ========== */

function FeaturedCard({ item }: { item: PlaybookItem }) {
  const Thumb = THUMB_MAP[item.id];
  return (
    <div
      className="flex-1 min-w-0 rounded-[12px] overflow-hidden bg-white cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow"
      style={{ border: '0.5px solid rgba(0,0,0,0.12)' }}
    >
      {/* Thumbnail */}
      <div className="w-full aspect-[16/9] bg-[#fafafa] overflow-hidden">
        {Thumb && <Thumb />}
      </div>
      {/* Info */}
      <div className="p-[16px] flex flex-col gap-[8px]">
        <h3 className="font-['Delight',sans-serif] text-[15px] leading-[22px] font-normal text-[rgba(0,0,0,0.9)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ letterSpacing: '0.15px' }}>
          {item.title}
        </h3>
        <p className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.5)] line-clamp-2 h-[40px]" style={{ letterSpacing: '0.13px' }}>
          {item.description}
        </p>
        <div className="flex items-center gap-[8px] mt-[4px]">
          <Avatar name={item.creator} size={20} />
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.7)] flex-1 min-w-0 truncate" style={{ letterSpacing: '0.13px' }}>
            {item.creator}
          </span>
          <div className="flex items-center gap-[4px] shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l2.09 6.26H18.18l-4.93 3.58L15.34 18 10 14.27 4.66 18l2.09-6.16L1.82 8.26h6.09L10 2z" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
            </svg>
            <span className="font-['Delight',sans-serif] text-[12px] leading-[18px] text-[rgba(0,0,0,0.4)]">12.8K</span>
          </div>
          <div className="flex items-center gap-[4px] shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M5 3v4.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5V13M5 3L3 5M5 3l2 2M11 13l-2-2M11 13l2-2" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-['Delight',sans-serif] text-[12px] leading-[18px] text-[rgba(0,0,0,0.4)]">3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedPlaybooksSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1272px] mx-auto px-[50px] py-[28px]">
        {/* Section title */}
        <div className="flex items-center mb-[24px]">
          <h2 className="font-['Delight',sans-serif] text-[16px] leading-[26px] font-normal text-[rgba(0,0,0,0.9)] flex-1" style={{ letterSpacing: '0.16px' }}>
            Featured Playbooks
          </h2>
          <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.5)] cursor-pointer" style={{ letterSpacing: '0.14px' }}>
            View All
          </span>
        </div>
        {/* 3-column grid */}
        <div className="grid grid-cols-3 gap-[16px]">
          {PLAYBOOKS.map(item => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
        {/* Load More */}
        <div className="flex justify-center mt-[24px]">
          <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.5)] cursor-pointer" style={{ letterSpacing: '0.14px' }}>
            Load More
          </span>
        </div>
      </div>
    </section>
  );
}

/* ========== 主页面 ========== */

export default function HomeV3({ onNavigate, onOpenSearch }: HomeV3Props) {
  const [inputValue, setInputValue] = useState('');
  const [remixTarget, setRemixTarget] = useState<PlaybookItem | null>(null);

  const handleRemix = useCallback((item: PlaybookItem) => {
    setRemixTarget(item);
    setInputValue(REMIX_PROMPTS[item.id] ?? `Remix "${item.title}" — describe your changes...`);
  }, []);

  const handleClearRemix = useCallback(() => {
    setRemixTarget(null);
    setInputValue('');
  }, []);

  return (
    <AppShell activePage={'home' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div className="h-screen overflow-y-auto bg-[#fafafa]">
        {/* Hero section */}
        <section className="w-full flex flex-col items-center px-[50px] pt-[80px] pb-[40px] gap-[40px] relative">
          {/* Dot background */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(ellipse 60% 80% at 50% 40%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 40%, black 20%, transparent 70%)',
          }} />
          <h1
            className="font-['Delight',sans-serif] text-[45px] leading-[1.2] font-normal text-[rgba(0,0,0,0.9)] text-center max-w-[616px] relative z-[1]"
            style={{ letterSpacing: '0.45px' }}
          >
            Turn Ideas into Live Investing Playbooks in Minutes
          </h1>
          <div className="w-full max-w-[780px] relative z-[1]">
            <ChatHero
              onNavigate={onNavigate}
              inputValue={inputValue}
              onInputChange={setInputValue}
              remixTarget={remixTarget}
              onClearRemix={handleClearRemix}
            />
          </div>
        </section>

        {/* What You Can Build */}
        <WhatYouCanBuild onRemix={handleRemix} />

        {/* Featured Playbooks */}
        <FeaturedPlaybooksSection />
      </div>
    </AppShell>
  );
}
