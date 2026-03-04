/**
 * [INPUT]: isOpen boolean, onClose callback
 * [OUTPUT]: Two-panel Skills modal — list on left, detail on right
 * [POS]: 组件层 — 首页 Chat Toolbar Toolbox 图标触发的 Skill 弹窗
 */

import { useState, useRef } from 'react';

const SCROLL_STYLE = `
.skill-modal-scroll ::-webkit-scrollbar { width: 4px; height: 4px; }
.skill-modal-scroll ::-webkit-scrollbar-track { background: transparent; }
.skill-modal-scroll ::-webkit-scrollbar-thumb { background: transparent; border-radius: 2px; }
.skill-modal-scroll *:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); }
.skill-modal-scroll *::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
.skill-modal-scroll { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
.skill-modal-scroll * { font-weight: 400 !important; }
.skill-modal-scroll [data-fw500] { font-weight: 500 !important; }
`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillApp {
  id: string;
  name: string;
  description: string;
  type: 'file' | 'folder';
  children?: SkillApp[];
  content?: string;
}

interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: 'alva' | 'custom';
  author?: 'Arrays' | 'Alva' | 'My Skill';
  version?: string;
  lastUpdated?: string;
  provider?: string;
  installCommand?: string;
  apps?: SkillApp[];
  weeklyInstalls?: string;
  stars?: number;
  firstSeen?: string;
  platforms?: Platform[];
  useCases?: string[];
}

// 左侧栏「启用」状态持久化 key（可选）
const SKILL_ENABLED_STORAGE_KEY = 'alva-skills-enabled';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function collectFolderIds(apps: SkillApp[]): string[] {
  const ids: string[] = [];
  for (const app of apps) {
    if (app.type === 'folder') {
      ids.push(app.id);
      if (app.children) ids.push(...collectFolderIds(app.children));
    }
  }
  return ids;
}

function findApp(apps: SkillApp[], id: string): SkillApp | null {
  for (const app of apps) {
    if (app.id === id) return app;
    if (app.children) {
      const found = findApp(app.children, id);
      if (found) return found;
    }
  }
  return null;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SKILL_MD_CONTENT = `# Alva Design System

## Design Tokens

### Color Tokens

\`\`\`css
/* Text */
--text-n9: rgba(0,0,0,0.9);         /* Primary */
--text-n7: rgba(0,0,0,0.7);         /* Secondary */
--text-n5: rgba(0,0,0,0.5);         /* Supporting Text */
--text-n3: rgba(0,0,0,0.3);         /* Hint */
--text-n2: rgba(0,0,0,0.2);         /* Disabled */

/* Semantic */
--main-m1: #49A3A6;                 /* Alva Theme */
--main-m1-10: #49A3A6;              /* Alva Theme with transparency */
--main-m2: #2196F3;                 /* Link */
--main-m2-10: rgba(33,150,243,0.1); /* Link with transparency */
--main-m3: #2a9b7d;                 /* Bullish */
--main-m3-10: rgba(42,155,125,0.1); /* Bullish with transparency */
--main-m4: #e05357;                 /* Bearish */
--main-m4-10: rgba(224,83,87,0.1);  /* Bearish with transparency */
--main-m5: #E6A91A;                 /* Alert */
--main-m5-10: rgba(230,169,26,0.1); /* Alert with transparency */
--main-m6: #ff9800;                 /* Emphasize */
--main-m6-10: rgba(255,152,0,0.1);  /* Emphasize with transparency */
--main-m7: rgba(0,0,0,0.5);         /* Modal Mask */

/* Chart & Widget */
--chart-orange1-main: #FF9800;
--chart-orange1-1: #FFBB1C;
--chart-orange1-2: #F8CB86;
--chart-green1-main: #40A544;
--chart-green1-1: #007949;
--chart-green1-2: #78C26D;
--chart-green2-main: #8FC13A;
--chart-green2-1: #5B8513;
--chart-green2-2: #C0D40F;
--chart-cyan1-1: #117A7D;
--chart-cyan1-2: #77C9C2;
--chart-cyan2-main: #7CAFAD;
--chart-cyan2-1: #4C807E;
--chart-cyan2-2: #A5C7C6;
--chart-blue1-main: #3D8BD1;
--chart-blue1-1: #005DAF;
--chart-blue1-2: #88B7E0;
--chart-blue2-main: #0D7498;
--chart-blue2-1: #54A5C2;
--chart-blue2-2: #91D1DB;
--chart-purple1-main: #5F75C9;
--chart-purple1-1: #3A52BE;
--chart-purple1-2: #9AB1D7;
--chart-purple2-main: #7474D8;
--chart-purple2-1: #4646AE;
--chart-purple2-2: #AFBBF7;
--chart-violet1-main: #A878DC;
--chart-violet1-1: #7F4EB4;
--chart-violet1-2: #D4B2E1;
--chart-pink1-main: #DC7AA5;
--chart-pink1-1: #BA5883;
--chart-pink1-2: #ECB0CA;
--chart-red1-main: #C76466;
--chart-red1-1: #A94749;
--chart-red1-2: #F2A0A1;
--chart-grey-main: #838383;
--chart-grey-1: #555555;
--chart-grey-2: #B7B7B7;

/* Background */
--b0-page: #ffffff;
--b0-container: #ffffff;
--b0-sidebar: #2A2A38;
--b0-sidebar-select: rgba(255,255,255,.03);
--grey-g01: #fafafa;          /* Dashboard Card */
--b-r02: rgba(0,0,0,.02);     /* Content Block */
--b-r03: rgba(0,0,0,.03);     /* Darker Block */

/* Line & Divider & Border */
--line-l07: rgba(0,0,0,0.07); /* Default */
--line-l05: rgba(0,0,0,0.05); /* Weaker */
--line-l12: rgba(0,0,0,0.12); /* Card Border */
--line-l2: rgba(0,0,0,0.2);   /* Popup/Dropdown Border */
--line-l3: rgba(0,0,0,0.3);   /* Button/Input/Select Border */
\`\`\`

### Spacing & Radius Tokens

\`\`\`css
--spacing-xxxs: 2px;  --spacing-xxs: 4px;  --spacing-xs: 8px;   --spacing-s: 12px;
--spacing-m: 16px;   --spacing-l: 20px;   --spacing-xl: 24px;   --spacing-xxl: 28px;
--spacing-xxxl: 32px;   --spacing-xxxxl: 40px;   --spacing-xxxxxl: 48px;   --spacing-xxxxxxl: 56px;

--radius-ct-xs: 2px;  /* Tag */
--radius-ct-s: 4px;   /* Small Card */
--radius-ct-m: 6px;   /* Medium Card */
--radius-ct-l: 8px;   /* Large Card/Page */
\`\`\`

### Shadow Tokens

\`\`\`css
--shadow-xs: 0 4px 15px 0 rgba(0, 0, 0, 0.05);  /* Toolbar/Sidebar */
--shadow-s: 0 6px 20px 0 rgba(0, 0, 0, 0.04);   /* Popup/Dropdown */
--shadow-l: 0 10px 20px 0 rgba(0, 0, 0, 0.08);  /* Card Hover */
\`\`\`

## General Design Guideline

### Background

**The page background color must use '--b0-page'**

### Typography & Font

#### General Rules

1. **The default font for Alva must be Delight, and the code uses JetBrains Mono**；
2. Backup fonts: -apple-system, BlinkMacSystemFont, sans-serif；

#### Font Weight

The font weight for Alva is limited to Regular (400) and Medium (500), and the use of Semibold (600) or Bold (700) is prohibited.

| Font Size | Font Weight |
|---|---|
| < 24px | Regular(400) or Medium(500) |
| **≥ 24px** | **Regular(400) only** |

#### Anti-aliasing Standards

Text anti-aliasing is enabled by default. The following declarations must be included when generating or modifying styles:

\`\`\`css
/* Text anti-aliasing: global or text containers requiring sharp rendering */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
\`\`\`

## Usage

1. **Design Page / Dashboard / Playbook / Module** → Follow Design Tokens
2. **Generate Widgets & Charts** → Refer to this document + references/widgets.md
3. **Use Components** → Refer to this document + references/components.md
4. **Generate Data-driven Dashboard (Dynamic Data)** → Refer to this document + references/data-driven-dashboard.md`;

const SKILLS: SkillItem[] = [
  {
    id: 'company-crypto-holdings',
    name: 'company_crypto_holdings',
    description: 'Track publicly listed companies\' cryptocurrency holdings and treasury allocations.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'company-crypto-holdings-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — company crypto holdings data and configuration.' },
    ],
  },
  {
    id: 'crypto-exchange-flow',
    name: 'crypto_exchange_flow',
    description: 'Monitor cryptocurrency exchange inflow/outflow and net flow metrics.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'crypto-exchange-flow-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — exchange flow tracking configuration.' },
    ],
  },
  {
    id: 'crypto-fundamentals',
    name: 'crypto_fundamentals',
    description: 'Access on-chain fundamentals including TVL, active addresses, and protocol revenue.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'crypto-fundamentals-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — crypto fundamental metrics and data sources.' },
    ],
  },
  {
    id: 'crypto-futures-data',
    name: 'crypto_futures_data',
    description: 'Retrieve crypto futures open interest, funding rates, and liquidation data.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'crypto-futures-data-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — futures data providers and configuration.' },
    ],
  },
  {
    id: 'crypto-screener',
    name: 'crypto_screener',
    description: 'Screen and filter cryptocurrencies by market cap, volume, momentum, and on-chain metrics.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'crypto-screener-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — crypto screening filters and criteria.' },
    ],
  },
  {
    id: 'crypto-technical-metrics',
    name: 'crypto_technical_metrics',
    description: 'Compute technical indicators (RSI, MACD, Bollinger Bands) for crypto assets.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'crypto-technical-metrics-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — crypto technical indicator configuration.' },
    ],
  },
  {
    id: 'equity-estimates-and-targets',
    name: 'equity_estimates_and_targets',
    description: 'Access analyst consensus estimates, price targets, and recommendation changes.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'equity-estimates-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — analyst estimates and price target data.' },
    ],
  },
  {
    id: 'equity-events-calendar',
    name: 'equity_events_calendar',
    description: 'Track earnings dates, ex-dividend dates, splits, and other corporate events.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'equity-events-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — equity events calendar configuration.' },
    ],
  },
  {
    id: 'equity-fundamentals',
    name: 'equity_fundamentals',
    description: 'Retrieve financial statements, valuation ratios, and key equity metrics.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'equity-fundamentals-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — equity fundamental data and financials.' },
    ],
  },
  {
    id: 'equity-ownership-and-flow',
    name: 'equity_ownership_and_flow',
    description: 'Monitor institutional ownership changes, insider trades, and fund flow data.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'equity-ownership-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — ownership and fund flow tracking.' },
    ],
  },
  {
    id: 'etf-fundamentals',
    name: 'etf_fundamentals',
    description: 'Access ETF holdings, expense ratios, AUM, and sector/country breakdowns.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'etf-fundamentals-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — ETF fundamental data and holdings.' },
    ],
  },
  {
    id: 'feed-widgets',
    name: 'feed_widgets',
    description: 'Pre-built feed widgets for news, social sentiment, and market commentary.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'feed-widgets-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — feed widget types and configuration.' },
    ],
  },
  {
    id: 'macro-and-economics-data',
    name: 'macro_and_economics_data',
    description: 'Access macroeconomic indicators: GDP, CPI, employment, rates, and yield curves.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'macro-economics-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — macro data sources and indicator configuration.' },
    ],
  },
  {
    id: 'spot-market-price-and-volume',
    name: 'spot_market_price_and_volume',
    description: 'Real-time and historical spot price and volume data for equities and crypto.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'spot-market-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — spot market data providers and intervals.' },
    ],
  },
  {
    id: 'stock-screener',
    name: 'stock_screener',
    description: 'Screen stocks by fundamentals, technicals, sector, market cap, and custom criteria.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'stock-screener-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — stock screening filters and criteria.' },
    ],
  },
  {
    id: 'stock-technical-metrics',
    name: 'stock_technical_metrics',
    description: 'Compute technical indicators (SMA, EMA, RSI, MACD) for equities.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'stock-technical-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — stock technical indicator configuration.' },
    ],
  },
  {
    id: 'technical-indicator-calculation-helpers',
    name: 'technical_indicator_calculation_helpers',
    description: 'Utility functions for computing moving averages, oscillators, and volatility metrics.',
    category: 'alva',
    author: 'Alva',
    version: '1.0.0',
    lastUpdated: '03/01/2026',
    provider: 'alva-platform/skills',
    apps: [
      { id: 'tech-indicator-helpers-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — calculation helper functions and usage.' },
    ],
  },
  {
    id: 'alva-design',
    name: 'alva-design',
    description: 'Alva design system for building dashboards, widgets, playbooks, and components with unified design tokens.',
    category: 'custom',
    author: 'Alva',
    version: '1.2.0',
    lastUpdated: '03/02/2026',
    provider: 'alva-platform/skills',
    apps: [
      {
        id: 'skill-md',
        name: 'SKILL.md',
        type: 'file',
        description: 'Skill entry point — design tokens, typography rules, and color system overview.',
        content: SKILL_MD_CONTENT,
      },
      {
        id: 'references',
        name: 'references',
        type: 'folder',
        description: 'Reference files for components, widgets, and chart implementations.',
        children: [
          { id: 'components-md', name: 'components.md', type: 'file', description: 'Component library with usage guidelines and prop specs.' },
          { id: 'widgets-md', name: 'widgets.md', type: 'file', description: 'Widget types, data bindings, and chart specifications.' },
          { id: 'ref-bar-chart', name: 'reference-bar-chart.html', type: 'file', description: 'Bar chart reference implementation with Alva theme.' },
          { id: 'ref-line-chart', name: 'reference-line-chart.html', type: 'file', description: 'Line chart reference implementation with Alva theme.' },
          { id: 'data-driven-dashboard-md', name: 'data-driven-dashboard.md', type: 'file', description: 'Data-driven dashboard spec — dynamic data binding, widget schema, and layout rules.' },
        ],
      },
    ],
    weeklyInstalls: '2.1K',
    stars: 38,
    firstSeen: '6 months ago',
    useCases: [
      'Building Alva dashboard widgets with correct design tokens',
      'Generating chart components with Alva color system',
      'Designing Playbook and module layouts',
    ],
  },
  {
    id: 'my-crypto-alerts',
    name: 'my-crypto-alerts',
    description: 'Custom price alert system for BTC, ETH, and selected altcoins with on-chain signals.',
    category: 'custom',
    author: 'My Skill',
    version: '0.3.0',
    lastUpdated: '01/10/2026',
    provider: 'local',
    apps: [
      { id: 'my-crypto-alerts-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — alert thresholds and on-chain signal configuration.' },
    ],
    useCases: [
      'Trigger alerts on configurable price thresholds',
      'Monitor on-chain volume and funding rate spikes',
    ],
  },
  {
    id: 'dram-price-monitor',
    name: 'dram-price-monitor',
    description: 'Track DRAM spot prices and supply chain signals for semiconductor sector analysis.',
    category: 'custom',
    author: 'My Skill',
    version: '0.1.2',
    lastUpdated: '12/28/2025',
    provider: 'local',
    apps: [
      { id: 'dram-price-monitor-skill-md', name: 'SKILL.md', type: 'file', description: 'Skill entry point — DRAM price tracking and supply chain signal setup.' },
      {
        id: 'dram',
        name: 'dram',
        type: 'folder',
        description: 'DRAM price and supply tools.',
        children: [
          { id: 'dram-spot', name: 'spot-price', type: 'file', description: 'Real-time DRAM spot price sourced from DRAMeXchange.' },
          { id: 'dram-supply', name: 'supply-signals', type: 'file', description: 'Inventory and lead time signals from key memory suppliers.' },
        ],
      },
    ],
    useCases: [
      'Memory sector investment signal generation',
      'Supply chain stress indicator monitoring',
    ],
  },
];

// ─── Icon Components ──────────────────────────────────────────────────────────

// arrow-down-f2：展开时；arrow-up-f2：收起时；颜色 text-n2
const ARROW_FILL = 'var(--text-n2, rgba(0,0,0,0.2))';

function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
      <path
        d="M16.7765 7.55569C17.3062 6.92874 16.8348 6 15.9867 6H4.01328C3.16523 6 2.69375 6.92873 3.22352 7.55569L9.21025 14.6406C9.61513 15.1198 10.3849 15.1198 10.7898 14.6406L16.7765 7.55569Z"
        fill={ARROW_FILL}
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.55569 3.22352C6.92874 2.69375 6 3.16523 6 4.01328V15.9867C6 16.8348 6.92873 17.3062 7.55569 16.7765L14.6406 10.7898C15.1198 10.3849 15.1198 9.61513 14.6406 9.21025L7.55569 3.22352Z"
        fill={ARROW_FILL}
      />
    </svg>
  );
}

function NotebookLIcon({ isSelected }: { isSelected: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M16.7998 1.5C17.4625 1.5 18 2.03745 18 2.7002V17.2998C18 17.9625 17.4625 18.5 16.7998 18.5H3.2002L3.07715 18.4941C2.4721 18.4326 2 17.9211 2 17.2998V2.7002C2 2.07892 2.4721 1.56737 3.07715 1.50586L3.2002 1.5H16.7998ZM6 17.5H16.7998C16.9103 17.5 17 17.4103 17 17.2998V2.7002C17 2.58974 16.9103 2.5 16.7998 2.5H6V17.5ZM3.2002 2.5C3.08974 2.5 3 2.58974 3 2.7002V17.2998C3 17.4103 3.08974 17.5 3.2002 17.5H5V2.5H3.2002ZM14.3662 11.5C14.6424 11.5 14.8662 11.7239 14.8662 12C14.8662 12.2761 14.6424 12.5 14.3662 12.5H8.54492C8.26878 12.5 8.04492 12.2761 8.04492 12C8.04492 11.7239 8.26878 11.5 8.54492 11.5H14.3662ZM14.3662 7.5C14.6424 7.5 14.8662 7.72386 14.8662 8C14.8662 8.27614 14.6424 8.5 14.3662 8.5H8.54492C8.26878 8.5 8.04492 8.27614 8.04492 8C8.04492 7.72386 8.26878 7.5 8.54492 7.5H14.3662Z"
        fill={isSelected ? 'var(--main-m1, #49a3a6)' : 'rgba(0,0,0,0.9)'}
        fillOpacity={isSelected ? 0.85 : 1}
      />
    </svg>
  );
}

// folder-l.svg asset, colored n7
function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M6.31934 2.5C6.55303 2.50008 6.7794 2.5819 6.95898 2.73145L9.68066 5H16.5C17.6046 5 18.5 5.89543 18.5 7V15.5C18.5 16.6046 17.6046 17.5 16.5 17.5H3.5C2.39543 17.5 1.5 16.6046 1.5 15.5V4.5C1.5 3.39543 2.39543 2.5 3.5 2.5H6.31934ZM2.5 9.5V15.5C2.5 16.0523 2.94772 16.5 3.5 16.5H16.5C17.0523 16.5 17.5 16.0523 17.5 15.5V9.5H2.5ZM3.5 3.5C2.94772 3.5 2.5 3.94772 2.5 4.5V8.5H17.5V7C17.5 6.44772 17.0523 6 16.5 6H9.68066C9.44697 5.99992 9.22059 5.9181 9.04102 5.76855L6.31934 3.5H3.5Z"
        fill="rgba(0,0,0,0.9)"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 9V4M6.5 4L4.5 6M6.5 4L8.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 10H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-60 transition-opacity" onClick={onClick}>
      <svg className="block size-full" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="rgba(0,0,0,0.9)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 开关组件：sm = 左侧栏，md = 右侧详情
function SkillEnableToggle({ enabled, onToggle, size = 'sm' }: { enabled: boolean; onToggle: () => void; size?: 'sm' | 'md' }) {
  const cfg = size === 'md'
    ? { w: 32, h: 16, thumb: 10.67, gap: 2.67 }
    : { w: 24, h: 12, thumb: 8, gap: 2 };
  const travel = cfg.w - cfg.thumb - cfg.gap * 2;
  return (
    <div
      role="switch"
      aria-checked={enabled}
      className="shrink-0 cursor-pointer relative transition-colors duration-150"
      style={{
        width: cfg.w,
        height: cfg.h,
        borderRadius: 1000,
        background: enabled ? '#49a3a6' : 'rgba(0,0,0,0.1)',
      }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <div
        className="absolute rounded-full bg-white transition-transform duration-150"
        style={{
          width: cfg.thumb,
          height: cfg.thumb,
          top: '50%',
          left: cfg.gap,
          transform: `translateY(-50%) translateX(${enabled ? travel : 0}px)`,
        }}
      />
    </div>
  );
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode[] {
  // Strip [text](url) links → keep text; handle **bold**
  const cleaned = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ── Medium 尺寸规范 (Alva Design System markdown-container--m) ──────────────
// H1: 18px/28px  H2: 16px/26px  H3–H6: 14px/22px
// Paragraph/List: 14px/22px  Code: 12px/20px  Table: 12px/20px pad:8px
// List gap: 4px  Code block padding: 8px
const BODY_FONT_SIZE = 14;
const BODY_LINE_HEIGHT = '22px';
const BODY_LETTER_SPACING = '0.14px';
const BODY_STYLE: React.CSSProperties = {
  fontSize: BODY_FONT_SIZE,
  lineHeight: BODY_LINE_HEIGHT,
  letterSpacing: BODY_LETTER_SPACING,
  color: 'var(--text-n9, rgba(0,0,0,0.9))',
  fontFamily: 'Delight, sans-serif',
};

// Returns per-level heading props for Medium size
// padding-top per Alva spec (Medium): H1=2px, H2=2px, H3–H6=0
// margin is 0 — section spacing comes from container gap (8px)
function headingStyle(level: number): React.CSSProperties {
  const configs: Record<number, { size: number; lh: string; ls: string; pt: number }> = {
    1: { size: 18, lh: '28px', ls: '0.18px', pt: 2 },
    2: { size: 16, lh: '26px', ls: '0.16px', pt: 2 },
    3: { size: 14, lh: '22px', ls: '0.14px', pt: 0 },
    4: { size: 14, lh: '22px', ls: '0.14px', pt: 0 },
  };
  const cfg = configs[Math.min(level, 4)];
  return {
    fontSize: cfg.size,
    lineHeight: cfg.lh,
    letterSpacing: cfg.ls,
    color: 'var(--text-n9, rgba(0,0,0,0.9))',
    fontFamily: 'Delight, sans-serif',
    paddingTop: cfg.pt,
    margin: 0,
  };
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = k++;

    if (/^#{1,6} /.test(line)) {
      const level = (line.match(/^(#+) /) ?? ['', ''])[1].length;
      const text = line.replace(/^#{1,6} /, '');
      elements.push(
        <p key={key} data-fw500 style={headingStyle(level)}>
          {text}
        </p>
      );
      i++;
    } else if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <pre key={key} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 2, padding: '8px', fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px', color: 'var(--text-n7, rgba(0,0,0,0.7))', fontFamily: "'JetBrains Mono', monospace", overflowX: 'auto', margin: 0, whiteSpace: 'pre' }}>
          {codeLines.join('\n')}
        </pre>
      );
    } else if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const dataRows = tableLines.filter(l => !/^\|[\s\-|:]+\|/.test(l));
      elements.push(
        <div key={key} style={{ border: '1px solid rgba(0,0,0,0.07)', borderRadius: 4, overflow: 'hidden' }}>
          {dataRows.map((row, ri) => {
            const cells = row.split('|').filter(c => c.trim() !== '').map(c => c.trim());
            return (
              <div key={ri} style={{ display: 'flex', borderBottom: ri < dataRows.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none', background: ri === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                {cells.map((cell, ci) => (
                  <div key={ci} style={{ flex: 1, padding: '8px', fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px', fontFamily: 'Delight, sans-serif', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontWeight: ri === 0 ? 500 : 400 }}>
                    {renderInline(cell)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );
    } else if (/^\d+\. /.test(line)) {
      // 有序列表：按 Markdown 规范用 <ol> + <li>，list-style 显示序号
      const olItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        olItems.push(lines[i].replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol
          key={key}
          style={{
            ...BODY_STYLE,
            margin: 0,
            paddingLeft: 24,
            listStyleType: 'decimal',
            listStylePosition: 'outside',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {olItems.map((itemText, idx) => (
            <li key={idx}>
              {renderInline(itemText)}
            </li>
          ))}
        </ol>
      );
    } else if (line.startsWith('- ')) {
      // 无序列表：用 <ul> + <li>，list-style 显示符号
      const ulItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        ulItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul
          key={key}
          style={{
            ...BODY_STYLE,
            margin: 0,
            paddingLeft: 24,
            listStyleType: 'disc',
            listStylePosition: 'outside',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {ulItems.map((itemText, idx) => (
            <li key={idx}>
              {renderInline(itemText)}
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === '') {
      i++;
    } else {
      elements.push(
        <p key={key} style={{ ...BODY_STYLE, margin: 0 }}>
          {renderInline(line)}
        </p>
      );
      i++;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: BODY_FONT_SIZE }}>
      {elements}
    </div>
  );
}

// ─── Left Panel Components ────────────────────────────────────────────────────

function SectionHeader({ label, action }: { label: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-[8px] py-[5px]">
      <span
        className="font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.55px] uppercase select-none"
        style={{ color: 'rgba(0,0,0,0.5)' }}
      >
        {label}
      </span>
      {action}
    </div>
  );
}

function SkillListItem({
  skill,
  isSelected,
  isActive,
  isExpanded,
  enabled,
  onSelect,
  onToggleEnabled,
}: {
  skill: SkillItem;
  isSelected: boolean; // visual highlight — false when a child file is selected
  isActive: boolean;   // this skill is the current context (controls chevron visibility)
  isExpanded: boolean;
  enabled: boolean;
  onSelect: () => void;
  onToggleEnabled: () => void;
}) {
  const hasChildren = !!skill.apps?.length;

  return (
    <div
      className={`flex items-center gap-[4px] h-[32px] px-[8px] rounded-[4px] cursor-pointer transition-colors ${
        isSelected ? 'bg-[var(--main-m1-10,rgba(73,163,166,0.1))]' : 'hover:bg-[rgba(0,0,0,0.03)]'
      } ${!enabled ? 'opacity-60' : ''}`}
      onClick={onSelect}
    >
      <div
        className="shrink-0 flex items-center justify-center w-[16px] h-[16px]"
        style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}
      >
        {hasChildren ? (isExpanded ? <ArrowDownIcon /> : <ArrowRightIcon />) : <ArrowRightIcon />}
      </div>
      <div className="shrink-0 flex items-center justify-center w-[16px] h-[16px]">
        <NotebookLIcon isSelected={isSelected} />
      </div>
      <span
        className="flex-1 min-w-0 font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] truncate"
        data-fw500={isSelected || undefined}
        style={{ color: 'rgba(0,0,0,0.9)' }}
      >
        {skill.name}
      </span>
      <SkillEnableToggle enabled={enabled} onToggle={onToggleEnabled} />
    </div>
  );
}

// Recursive tree item: folders show FolderIcon + chevron; files have no icon but are selectable
function TreeItem({
  app,
  depth,
  isLast,
  expandedSubIds,
  selectedAppId,
  onToggleSubExpand,
  onSelectApp,
}: {
  app: SkillApp;
  depth: number;
  isLast: boolean;
  expandedSubIds: Set<string>;
  selectedAppId: string | null;
  onToggleSubExpand: (id: string) => void;
  onSelectApp: (id: string) => void;
}) {
  const isFolder = app.type === 'folder';
  const hasChildren = isFolder && !!app.children?.length;
  const isExpanded = expandedSubIds.has(app.id);
  const isFileSelected = !isFolder && selectedAppId === app.id;

  // Indent 16px per extra depth level; line anchors at parent icon center (18px from content edge)
  const paddingLeft = 28 + (depth - 1) * 16;
  const lineLeft = 18 + (depth - 1) * 16;

  function handleClick() {
    if (isFolder) {
      if (hasChildren) onToggleSubExpand(app.id);
    } else {
      onSelectApp(app.id);
    }
  }

  return (
    <>
      <div className="relative flex items-center h-[28px]" style={{ paddingLeft }}>
        {/* Vertical tree line */}
        <div
          className="absolute"
          style={{ left: lineLeft, top: 0, width: '1px', height: isLast ? '50%' : '100%', background: 'rgba(0,0,0,0.1)' }}
        />
        {/* Horizontal connector */}
        <div
          className="absolute"
          style={{ left: lineLeft, top: '50%', width: 8, height: '1px', background: 'rgba(0,0,0,0.1)' }}
        />
        <div
          className={`flex items-center flex-1 min-w-0 h-full px-[8px] rounded-[4px] transition-colors cursor-pointer ${
            isFolder ? 'gap-[4px]' : ''
          } ${isFileSelected ? 'bg-[var(--main-m1-10,rgba(73,163,166,0.1))]' : 'hover:bg-[rgba(0,0,0,0.03)]'}`}
          onClick={handleClick}
        >
          {isFolder ? (
            <>
              {hasChildren ? (
                <div
                  className="shrink-0 flex items-center justify-center w-[16px] h-[16px]"
                  style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}
                  onClick={(e) => { e.stopPropagation(); onToggleSubExpand(app.id); }}
                >
                  {isExpanded ? <ArrowDownIcon /> : <ArrowRightIcon />}
                </div>
              ) : (
                <div className="shrink-0 w-[16px] h-[16px]" aria-hidden />
              )}
              <div className="shrink-0 flex items-center">
                <FolderIcon />
              </div>
            </>
          ) : null}
          <span
            className="flex-1 min-w-0 font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] truncate"
            data-fw500={isFileSelected || undefined}
            style={{ color: 'rgba(0,0,0,0.9)' }}
          >
            {app.name}
          </span>
        </div>
      </div>
      {isExpanded && app.children && (
        <div>
          {app.children.map((child, idx) => (
            <TreeItem
              key={child.id}
              app={child}
              depth={depth + 1}
              isLast={idx === app.children!.length - 1}
              expandedSubIds={expandedSubIds}
              selectedAppId={selectedAppId}
              onToggleSubExpand={onToggleSubExpand}
              onSelectApp={onSelectApp}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ─── Right Panel Components ───────────────────────────────────────────────────

function Divider() {
  return <div className="shrink-0 w-full" style={{ height: '1px', background: 'rgba(0,0,0,0.07)' }} />;
}

function findFirstContent(apps: SkillApp[]): string | null {
  for (const app of apps) {
    if (app.type === 'file' && app.content) return app.content;
    if (app.children) {
      const found = findFirstContent(app.children);
      if (found) return found;
    }
  }
  return null;
}

function AuthorTag({ author }: { author: 'Arrays' | 'Alva' | 'My Skill' }) {
  const style =
    author === 'Arrays'
      ? { background: 'rgba(33,150,243,0.1)', color: '#2196F3' }
      : author === 'Alva'
      ? { background: 'rgba(73,163,166,0.12)', color: '#49a3a6' }
      : { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.5)' };
  return (
    <span
      className="font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.11px] px-[6px] py-[1px] rounded-[3px] shrink-0"
      style={style}
    >
      {author}
    </span>
  );
}

function SkillDetail({ skill, enabled, onToggleEnabled }: { skill: SkillItem; enabled: boolean; onToggleEnabled: () => void }) {
  const skillContent = skill.apps ? findFirstContent(skill.apps) : null;
  return (
    <div className="flex flex-col gap-[16px] p-[28px]">
      {/* Header */}
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center gap-[10px]">
          <h2
            className="font-['Delight',sans-serif] text-[20px] leading-[30px] tracking-[0.2px]"
            style={{ color: 'rgba(0,0,0,0.9)' }}
          >
            {skill.name}
          </h2>
          {skill.author && <AuthorTag author={skill.author} />}
          <div className="flex-1" />
          <SkillEnableToggle enabled={enabled} onToggle={onToggleEnabled} size="md" />
        </div>
        {(skill.version || skill.lastUpdated) && (
          <div className="flex items-center gap-[16px]">
            {skill.version && (
              <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Version: {skill.version}
              </span>
            )}
            {skill.lastUpdated && (
              <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Last Updated: {skill.lastUpdated}
              </span>
            )}
          </div>
        )}
        <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.7)' }}>
          {skill.description}
        </p>
      </div>

      {/* SKILL.md content */}
      {skillContent && (
        <div
          style={{
            background: 'rgba(0,0,0,0.02)',
            borderRadius: 6,
            padding: 20,
          }}
        >
          <SimpleMarkdown content={skillContent} />
        </div>
      )}
    </div>
  );
}

// Right panel when a specific file is selected
function FileContentView({ app }: { app: SkillApp }) {
  return (
    <div className="flex flex-col gap-[20px] p-[28px]">
      <div className="flex flex-col gap-[6px]">
        <h2
          className="font-['Delight',sans-serif] text-[20px] leading-[30px] tracking-[0.2px]"
          style={{ color: 'rgba(0,0,0,0.9)' }}
        >
          {app.name}
        </h2>
        <p className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
          {app.description}
        </p>
      </div>
      <Divider />
      {app.content ? (
        <SimpleMarkdown content={app.content} />
      ) : (
        <p className="font-['Delight',sans-serif] text-[13px] leading-[20px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
          No preview available.
        </p>
      )}
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[10px]">
      <div
        className="w-[40px] h-[40px] rounded-[8px] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.04)' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="7" width="16" height="11" rx="1.5" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
          <path d="M7 7V5.5C7 3.567 8.567 2 10.5 2V2C12.433 2 14 3.567 14 5.5V7" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 13h5M10.5 11v4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <p
        className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px]"
        style={{ color: 'rgba(0,0,0,0.3)' }}
      >
        Select a skill to view details
      </p>
    </div>
  );
}

// ─── Modal Content ────────────────────────────────────────────────────────────

const DEFAULT_DISABLED_SKILLS = new Set([
  'dram-price-monitor',
  'crypto-screener',
  'crypto-technical-metrics',
  'macro-and-economics-data',
  'spot-market-price-and-volume',
  'stock-screener',
  'stock-technical-metrics',
  'technical-indicator-calculation-helpers',
]);

function loadEnabledMap(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(SKILL_ENABLED_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    /* ignore */
  }
  const defaults: Record<string, boolean> = {};
  for (const id of DEFAULT_DISABLED_SKILLS) defaults[id] = false;
  return defaults;
}

function saveEnabledMap(map: Record<string, boolean>) {
  try {
    localStorage.setItem(SKILL_ENABLED_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function SkillModalContent({ onClose }: { onClose: () => void }) {
  // Default: alva-design selected, all skills collapsed
  const [selectedSkillId, setSelectedSkillId] = useState<string>('alva-design');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [expandedSubIds, setExpandedSubIds] = useState<Set<string>>(new Set());
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(loadEnabledMap);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const alvaSkills = SKILLS.filter((s) => s.category === 'alva');
  const customSkills = SKILLS.filter((s) => s.category === 'custom');
  const selectedSkill = SKILLS.find((s) => s.id === selectedSkillId) ?? null;
  const selectedApp = selectedSkill?.apps ? findApp(selectedSkill.apps, selectedAppId ?? '') : null;

  function getEnabled(skillId: string): boolean {
    return enabledMap[skillId] !== false;
  }

  function handleToggleEnabled(skillId: string) {
    setEnabledMap((prev) => {
      const next = { ...prev, [skillId]: !getEnabled(skillId) };
      saveEnabledMap(next);
      return next;
    });
  }

  function handleSelectSkill(skillId: string) {
    setSelectedSkillId(skillId);
    setSelectedAppId(null);
    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill?.apps?.length) return;
    // Toggle expand; auto-expand sub-folders only when first opening
    const isExpanded = expandedIds.has(skillId);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      isExpanded ? next.delete(skillId) : next.add(skillId);
      return next;
    });
    if (!isExpanded) {
      setExpandedSubIds((prev) => {
        const next = new Set(prev);
        for (const id of collectFolderIds(skill.apps!)) next.add(id);
        return next;
      });
    }
  }

  function handleToggleSubExpand(appId: string) {
    setExpandedSubIds((prev) => {
      const next = new Set(prev);
      next.has(appId) ? next.delete(appId) : next.add(appId);
      return next;
    });
  }

  function renderSkillList(skills: SkillItem[]) {
    return skills.map((skill) => {
      const isActive = selectedSkillId === skill.id;
      // Visual highlight only when this skill is active AND no child file is selected
      const isSelected = isActive && selectedAppId === null;
      const isExpanded = expandedIds.has(skill.id);
      return (
        <div key={skill.id}>
          <SkillListItem
            skill={skill}
            isSelected={isSelected}
            isActive={isActive}
            isExpanded={isExpanded}
            enabled={getEnabled(skill.id)}
            onSelect={() => handleSelectSkill(skill.id)}
            onToggleEnabled={() => handleToggleEnabled(skill.id)}
          />
          {isExpanded && skill.apps && (
            <div className="flex flex-col mb-[2px]">
              {skill.apps.map((app, idx) => (
                <TreeItem
                  key={app.id}
                  app={app}
                  depth={1}
                  isLast={idx === skill.apps!.length - 1}
                  expandedSubIds={expandedSubIds}
                  selectedAppId={selectedAppId}
                  onToggleSubExpand={handleToggleSubExpand}
                  onSelectApp={(appId) => {
                    setSelectedSkillId(skill.id);
                    setSelectedAppId(appId);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <div
      className="bg-white relative rounded-[8px] flex flex-col skill-modal-scroll"
      style={{ width: 'min(calc(100vw - 56px), 1280px)', height: 'min(calc(100vh - 96px), 1280px)' }}
    >
      {/* Border + shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[8px]"
        style={{ border: '1px solid rgba(0,0,0,0.2)', boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)' }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-[12px] shrink-0"
        style={{ padding: '20px 24px 18px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <p
          className="flex-1 font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px]"
          data-fw500
          style={{ color: 'rgba(0,0,0,0.9)' }}
        >
          Skills
        </p>
        <CloseIcon onClick={onClose} />
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden rounded-b-[8px]">

        {/* Left Panel — 16px horizontal padding aligns with header "Skills" at 24px */}
        <div
          className="shrink-0 flex flex-col overflow-y-auto"
          style={{ width: 280, borderRight: '1px solid rgba(0,0,0,0.07)', padding: '12px 16px 16px' }}
        >
          {/* My Skills (top) */}
          <SectionHeader
            label="My Skills"
            action={
              <button
                className="flex items-center gap-[3px] font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] hover:opacity-70 transition-opacity"
                style={{ color: '#49a3a6', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon />
                Upload
              </button>
            }
          />
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log('Uploaded skill file:', file.name, file);
              }
              e.target.value = '';
            }}
          />
          <div className="flex flex-col mt-[4px]">
            {renderSkillList(customSkills)}
          </div>

          {/* Divider */}
          <div style={{ margin: '12px 0', borderTop: '1px solid rgba(0,0,0,0.07)' }} />

          {/* Alva Built-in (bottom) */}
          <SectionHeader label="Alva Built-in" />
          <div className="flex flex-col mt-[4px]">
            {renderSkillList(alvaSkills)}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {selectedApp
            ? <FileContentView app={selectedApp} />
            : selectedSkill
              ? <SkillDetail skill={selectedSkill} enabled={getEnabled(selectedSkill.id)} onToggleEnabled={() => handleToggleEnabled(selectedSkill.id)} />
              : <EmptyDetail />
          }
        </div>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillModal({ isOpen, onClose }: SkillModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <style>{SCROLL_STYLE}</style>
      <SkillModalContent onClose={onClose} />
    </div>
  );
}
