/**
 * [INPUT]: isOpen boolean, onClose callback
 * [OUTPUT]: Two-panel Skills modal — list on left, detail on right
 * [POS]: 组件层 — 首页 Chat Toolbar Toolbox 图标触发的 Skill 弹窗
 */

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillApp {
  id: string;
  name: string;
  description: string;
  type: 'file' | 'folder';
  children?: SkillApp[];
  content?: string;
}

interface Platform {
  name: string;
  count: string;
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

// Returns all leaf files with their display path (e.g. "references / components.md")
function flattenApps(apps: SkillApp[], prefix?: string): Array<{ app: SkillApp; displayName: string }> {
  const result: Array<{ app: SkillApp; displayName: string }> = [];
  for (const app of apps) {
    const displayName = prefix ? `${prefix} / ${app.name}` : app.name;
    if (app.type === 'file') {
      result.push({ app, displayName });
    } else if (app.type === 'folder' && app.children) {
      result.push(...flattenApps(app.children, displayName));
    }
  }
  return result;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SKILL_MD_CONTENT = `# Alva Design System

## Design Tokens

### Colors 颜色规范

\`\`\`css
/* Text */
--text-n10: rgb(0,0,0);   /* 强调文本 */
--text-n9: rgba(0,0,0,0.9);   /* 主文本 */
--text-n7: rgba(0,0,0,0.7);   /* 次级 */
--text-n5: rgba(0,0,0,0.5);   /* 辅助 */
--text-n3: rgba(0,0,0,0.3);   /* 占位提示 */
--text-n2: rgba(0,0,0,0.2);   /* 按钮禁用文本 */

/* Semantic */
--main-m1: #49A3A6;           /* Alva全局主题色 青 */
--main-m1-10: #49A3A6;        /* 带透明度背景 青 */
--main-m2: #2196F3;           /* 文字链 蓝 */
--main-m2-10: rgba(33,150,243,0.1); /* 带透明度背景 蓝 */
--main-m3: #2a9b7d;           /* 正向/上涨 绿 */
--main-m3-10: rgba(42,155,125,0.1); /* 带透明度背景 绿 */
--main-m4: #e05357;           /* 负向/下跌 红 */
--main-m4-10: rgba(224,83,87,0.1); /* 带透明度背景 红 */
--main-m5: #E6A91A;           /* 警示 黄 */
--main-m5-10: rgba(230,169,26,0.1); /* 带透明度背景 黄 */
--main-m6: #ff9800;           /* 强调 橙 */
--main-m6-10: rgba(255,152,0,0.1); /* 带透明度背景 橙 */
--main-m7: rgba(0,0,0,0.5);    /* 弹窗背景遮罩 */

/* Background */
--b0-page: #ffffff;           /* 页面默认背景 */
--b0-container: #ffffff;      /* 大模块背景 */
--b0-sidebar: #2A2A38;       /* 侧边栏背景 */
--b0-sidebar-select: rgba(255,255,255,.03);
--grey-g01: #fafafa;          /* Dashboard卡片背景 */

/* Line & Divider & Border */
--line-l07: rgba(0,0,0,0.07); /* 默认分割线或边框 */
--line-l05: rgba(0,0,0,0.05); /* 弱化分割线或边框 */
--line-l12: rgba(0,0,0,0.12); /* 加强分割线或边框 */
--line-l2: rgba(0,0,0,0.2);  /* 下拉框/悬浮组件 边框 */
--line-l3: rgba(0,0,0,0.3);  /* 按钮/输入框/选择框 边框 */
\`\`\`

### Spacing & Radius 间距和圆角规范

\`\`\`css
--spacing-xxxs: 2px;  --spacing-xxs: 4px;  --spacing-xs: 8px;   --spacing-s: 12px;
--spacing-m: 16px;   --spacing-l: 20px;   --spacing-xl: 24px;   --spacing-xxl: 28px;
--spacing-xxxl: 32px;   --spacing-xxxxl: 40px;

--radius-ct-xs: 2px;  /* 标签 */
--radius-ct-s: 4px;  /* 小卡片 */
--radius-ct-m: 6px;  /* 大卡片/内容区 */
--radius-ct-l: 8px;  /* 页面级 */
\`\`\`

## General Design Guideline

### Background 背景规范

**页面级别的背景颜色，必须使用--b0-page**

### Typography & Font 字体规范

#### 字体通用规范

1. **默认使用Delight，代码使用JetBrains Mono**；
2. 备选字体为: -apple-system, BlinkMacSystemFont, sans-serif；

#### 字重规范

Alva 字重仅允许 Regular(400) 和 Medium(500)，不得使用 Semibold(600) 或 Bold(700)。

| font-size | 允许字重 |
|---|---|
| < 24px | Regular(400) 或 Medium(500) |
| **≥ 24px** | **仅 Regular(400)** |

## 使用方式

1. **设计 Page / Dashboard / Playbook / Module** → 遵循 Design Tokens
2. **生成 Widget & Chart** → 参考本文档 + references/widgets.md
3. **调用 Components** → 参考本文档 + references/components.md`;

const SKILLS: SkillItem[] = [
  {
    id: 'web-search',
    name: 'web-search',
    description: 'Search the web and extract content via inference.sh CLI.',
    category: 'alva',
    author: 'Arrays',
    version: '2.3.1',
    lastUpdated: '03/01/2026',
    provider: 'inference-sh-9/skills',
    installCommand: 'npx skills add https://github.com/inference-sh-9/skills --skill web-search',
    apps: [
      {
        id: 'tavily',
        name: 'tavily',
        type: 'folder',
        description: 'Tavily search and extract tools.',
        children: [
          { id: 'tavily-search', name: 'search-assistant', type: 'file', description: 'AI-powered search with answers and cited sources.' },
          { id: 'tavily-extract', name: 'extract', type: 'file', description: 'Retrieves and parses page content from any URL.' },
        ],
      },
      {
        id: 'exa',
        name: 'exa',
        type: 'folder',
        description: 'Exa search and answer tools.',
        children: [
          { id: 'exa-search', name: 'search', type: 'file', description: 'Intelligent web search with AI-ranked results.' },
          { id: 'exa-answer', name: 'answer', type: 'file', description: 'Delivers direct factual answers from the live web.' },
          { id: 'exa-extract', name: 'extract', type: 'file', description: 'Extracts and analyzes web page content in depth.' },
        ],
      },
    ],
    weeklyInstalls: '10.0K',
    stars: 67,
    firstSeen: '5 days ago',
    platforms: [
      { name: 'claude-code', count: '7.8K' },
      { name: 'codex', count: '7.2K' },
      { name: 'gemini-cli', count: '7.1K' },
    ],
    useCases: [
      'Research tasks and information gathering',
      'Retrieval-augmented generation (RAG)',
      'Fact-checking with cited sources',
      'Content aggregation across multiple sources',
      'Building research-capable AI agents',
    ],
  },
  {
    id: 'alva-design',
    name: 'alva-design',
    description: 'Alva design system for building dashboards, widgets, playbooks, and components with unified design tokens.',
    category: 'alva',
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
    id: 'market-data',
    name: 'market-data',
    description: 'Access real-time and historical market data for equities, crypto, and indices.',
    category: 'alva',
    author: 'Alva',
    version: '3.1.0',
    lastUpdated: '02/28/2026',
    provider: 'alva-platform/skills',
    installCommand: 'npx skills add https://skills.alva.co --skill market-data',
    apps: [
      {
        id: 'quotes',
        name: 'quotes',
        type: 'folder',
        description: 'Quote data tools.',
        children: [
          { id: 'quotes-realtime', name: 'real-time', type: 'file', description: 'Live price quotes and bid-ask spreads for any ticker.' },
          { id: 'quotes-historical', name: 'historical', type: 'file', description: 'OHLCV candle data with adjustable intervals from 1m to 1M.' },
        ],
      },
      {
        id: 'fundamentals',
        name: 'fundamentals',
        type: 'folder',
        description: 'Fundamental data tools.',
        children: [
          { id: 'fundamentals-financials', name: 'financials', type: 'file', description: 'Balance sheet, income statement, and key valuation ratios.' },
        ],
      },
    ],
    weeklyInstalls: '8.2K',
    stars: 124,
    firstSeen: '3 months ago',
    useCases: [
      'Live portfolio monitoring and price alerts',
      'Backtesting strategies with historical price series',
      'Fundamental screening and DCF valuation analysis',
    ],
  },
  {
    id: 'news-aggregator',
    name: 'news-aggregator',
    description: 'Aggregate and summarize financial news from premium sources in real time.',
    category: 'alva',
    author: 'Alva',
    version: '1.5.2',
    lastUpdated: '02/20/2026',
    provider: 'alva-platform/skills',
    installCommand: 'npx skills add https://skills.alva.co --skill news-aggregator',
    apps: [
      {
        id: 'bloomberg',
        name: 'bloomberg',
        type: 'folder',
        description: 'Bloomberg news.',
        children: [
          { id: 'bloomberg-feed', name: 'feed', type: 'file', description: 'Bloomberg terminal headlines and article summaries.' },
        ],
      },
      {
        id: 'reuters',
        name: 'reuters',
        type: 'folder',
        description: 'Reuters news.',
        children: [
          { id: 'reuters-feed', name: 'feed', type: 'file', description: 'Reuters financial wire with real-time market alerts.' },
        ],
      },
    ],
    weeklyInstalls: '4.7K',
    stars: 51,
    firstSeen: '2 months ago',
    useCases: [
      'Market-moving event detection',
      'Sentiment analysis pipelines',
      'Earnings call transcript summarization',
    ],
  },
  {
    id: 'portfolio-tracker',
    name: 'portfolio-tracker',
    description: 'Track positions, PnL, and risk metrics across your connected brokerage accounts.',
    category: 'alva',
    author: 'Alva',
    version: '2.0.1',
    lastUpdated: '02/15/2026',
    provider: 'alva-platform/skills',
    apps: [
      {
        id: 'portfolio',
        name: 'portfolio',
        type: 'folder',
        description: 'Portfolio data and analytics.',
        children: [
          { id: 'portfolio-positions', name: 'positions', type: 'file', description: 'Current holdings with live market value and weight.' },
          { id: 'portfolio-pnl', name: 'pnl', type: 'file', description: 'Realized and unrealized PnL breakdown by asset.' },
          { id: 'portfolio-risk', name: 'risk', type: 'file', description: 'VaR, beta, and portfolio correlation metrics.' },
          { id: 'portfolio-allocation', name: 'allocation', type: 'file', description: 'Asset class and sector allocation heatmap.' },
        ],
      },
    ],
    weeklyInstalls: '6.3K',
    stars: 89,
    firstSeen: '4 months ago',
    useCases: [
      'Portfolio rebalancing automation',
      'Real-time risk exposure monitoring',
      'Performance attribution analysis',
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

function DisclaimerIcon({ isSelected }: { isSelected: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.7993 1.5C16.7382 1.5 17.4995 2.26131 17.4995 3.2002V16.7998C17.4993 17.7385 16.7381 18.5 15.7993 18.5H4.19971C3.26109 18.4998 2.49971 17.7384 2.49951 16.7998V6.19434L2.64502 6.04785L7.02002 1.64746L7.1665 1.5H15.7993ZM7.87451 6.90039H3.49951V16.7998C3.49971 17.1861 3.81338 17.4998 4.19971 17.5H15.7993C16.1858 17.5 16.4993 17.1862 16.4995 16.7998V3.2002C16.4995 2.8136 16.1859 2.5 15.7993 2.5H7.87451V6.90039ZM13.4243 13.666C13.7003 13.666 13.9241 13.89 13.9243 14.166C13.9243 14.4422 13.7005 14.666 13.4243 14.666H6.57471C6.29866 14.6659 6.07471 14.4421 6.07471 14.166C6.0749 13.8901 6.29878 13.6661 6.57471 13.666H13.4243ZM13.4243 11.166C13.7003 11.166 13.9241 11.39 13.9243 11.666C13.9243 11.9422 13.7005 12.166 13.4243 12.166H6.57471C6.29866 12.1659 6.07471 11.9421 6.07471 11.666C6.0749 11.3901 6.29878 11.1661 6.57471 11.166H13.4243ZM13.4243 8.66602C13.7003 8.66602 13.9241 8.89004 13.9243 9.16602C13.9243 9.44216 13.7005 9.66602 13.4243 9.66602H6.57471C6.29866 9.66591 6.07471 9.44209 6.07471 9.16602C6.0749 8.89011 6.29878 8.66613 6.57471 8.66602H13.4243ZM4.20166 5.90039H6.87451V3.21191L4.20166 5.90039Z"
        fill={isSelected ? '#49a3a6' : 'black'}
        fillOpacity={isSelected ? 0.85 : 0.7}
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
        fill="rgba(0,0,0,0.7)"
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

// 左侧栏「是否启用」小开关：启用 = 主题色轨道，禁用 = 灰色轨道
function SkillEnableToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <div
      role="switch"
      aria-checked={enabled}
      className="shrink-0 cursor-pointer rounded-full transition-colors duration-150"
      style={{
        width: 20,
        height: 12,
        background: enabled ? 'var(--main-m1, #49a3a6)' : 'var(--line-l07, rgba(0,0,0,0.07))',
      }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <div
        className="rounded-full bg-white shadow-sm transition-transform duration-150"
        style={{
          width: 10,
          height: 10,
          marginTop: 1,
          marginLeft: enabled ? 9 : 1,
          border: '0.5px solid rgba(0,0,0,0.08)',
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
      return <strong key={i} style={{ fontWeight: 500 }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// 正文标准字号 14px；列表使用语义化 ol/ul + li，保证序号/符号与文字都可见
const BODY_FONT_SIZE = 14;
const BODY_STYLE: React.CSSProperties = {
  fontSize: BODY_FONT_SIZE,
  lineHeight: '22px',
  color: 'var(--text-n9, rgba(0,0,0,0.9))',
  fontFamily: 'Delight, sans-serif',
};

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = k++;

    if (/^#{1,4} /.test(line)) {
      const level = (line.match(/^(#+) /) ?? ['', ''])[1].length;
      const text = line.replace(/^#{1,4} /, '');
      const size = level === 1 ? 18 : level === 2 ? 16 : 15;
      const mt = level === 1 ? 0 : level === 2 ? 20 : 14;
      elements.push(
        <p key={key} style={{ fontSize: size, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: 'Delight, sans-serif', marginTop: elements.length === 0 ? 0 : mt, lineHeight: '22px' }}>
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
        <pre key={key} style={{ background: 'rgba(0,0,0,0.03)', border: '0.5px solid rgba(0,0,0,0.07)', borderRadius: 4, padding: '10px 12px', fontSize: 12, lineHeight: '18px', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontFamily: "'JetBrains Mono', monospace", overflowX: 'auto', margin: '6px 0', whiteSpace: 'pre' }}>
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
        <div key={key} style={{ border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden', margin: '6px 0' }}>
          {dataRows.map((row, ri) => {
            const cells = row.split('|').filter(c => c.trim() !== '').map(c => c.trim());
            return (
              <div key={ri} style={{ display: 'flex', borderBottom: ri < dataRows.length - 1 ? '0.5px solid rgba(0,0,0,0.07)' : 'none', background: ri === 0 ? 'rgba(0,0,0,0.02)' : 'transparent' }}>
                {cells.map((cell, ci) => (
                  <div key={ci} style={{ flex: 1, padding: '6px 10px', fontSize: 12, fontFamily: 'Delight, sans-serif', color: 'var(--text-n9, rgba(0,0,0,0.9))', fontWeight: ri === 0 ? 500 : 400 }}>
                    {renderInline(cell)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );
    } else if (/^\d+\. /.test(line)) {
      // 有序列表：按 Markdown 规范用 <ol> + <li>，list-style 显示序号，文字在 li 内
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
            margin: '4px 0',
            paddingLeft: 24,
            listStyleType: 'decimal',
            listStylePosition: 'outside',
          }}
        >
          {olItems.map((itemText, idx) => (
            <li key={idx} style={{ marginBottom: 2 }}>
              {renderInline(itemText)}
            </li>
          ))}
        </ol>
      );
    } else if (line.startsWith('- ')) {
      // 无序列表：用 <ul> + <li>，list-style 显示符号，文字在 li 内
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
            margin: '4px 0',
            paddingLeft: 24,
            listStyleType: 'disc',
            listStylePosition: 'outside',
          }}
        >
          {ulItems.map((itemText, idx) => (
            <li key={idx} style={{ marginBottom: 2 }}>
              {renderInline(itemText)}
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === '') {
      i++;
    } else {
      elements.push(
        <p key={key} style={{ ...BODY_STYLE, margin: '1px 0' }}>
          {renderInline(line)}
        </p>
      );
      i++;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: BODY_FONT_SIZE }}>
      {elements}
    </div>
  );
}

// ─── Left Panel Components ────────────────────────────────────────────────────

function SectionHeader({ label, action }: { label: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-[8px] py-[5px]">
      <span
        className="font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.55px] uppercase select-none font-medium"
        style={{ color: 'rgba(0,0,0,0.35)' }}
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
  onToggleExpand,
  onToggleEnabled,
}: {
  skill: SkillItem;
  isSelected: boolean; // visual highlight — false when a child file is selected
  isActive: boolean;   // this skill is the current context (controls chevron visibility)
  isExpanded: boolean;
  enabled: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onToggleEnabled: () => void;
}) {
  const hasChildren = !!skill.apps?.length;

  return (
    <div
      className={`flex items-center gap-[4px] h-[32px] px-[8px] rounded-[4px] cursor-pointer transition-colors ${
        isSelected ? 'bg-[rgba(73,163,166,0.08)]' : 'hover:bg-[rgba(0,0,0,0.03)]'
      } ${!enabled ? 'opacity-60' : ''}`}
      onClick={onSelect}
    >
      {hasChildren ? (
        <div
          className="shrink-0 flex items-center justify-center w-[16px] h-[16px]"
          style={{ color: 'var(--text-n2, rgba(0,0,0,0.2))' }}
          onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
        >
          {isExpanded ? <ArrowDownIcon /> : <ArrowRightIcon />}
        </div>
      ) : (
        <div className="shrink-0 w-[16px] h-[16px]" aria-hidden />
      )}
      <div className="shrink-0 flex items-center justify-center w-[16px] h-[16px]">
        <DisclaimerIcon isSelected={isSelected} />
      </div>
      <span
        className="flex-1 min-w-0 font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] truncate"
        style={{ color: isSelected ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.65)', fontWeight: isSelected ? 500 : 400 }}
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
          style={{ left: lineLeft, top: 0, width: '0.5px', height: isLast ? '50%' : '100%', background: 'rgba(0,0,0,0.1)' }}
        />
        {/* Horizontal connector */}
        <div
          className="absolute"
          style={{ left: lineLeft, top: '50%', width: 8, height: '0.5px', background: 'rgba(0,0,0,0.1)' }}
        />
        <div
          className={`flex items-center flex-1 min-w-0 h-full px-[8px] rounded-[4px] transition-colors cursor-pointer ${
            isFolder ? 'gap-[4px]' : ''
          } ${isFileSelected ? 'bg-[rgba(73,163,166,0.08)]' : 'hover:bg-[rgba(0,0,0,0.03)]'}`}
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
            className="flex-1 min-w-0 font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
            style={{ color: isFileSelected ? 'rgba(0,0,0,0.9)' : isFolder ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.55)', fontWeight: isFileSelected ? 500 : 400 }}
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
  return <div className="shrink-0 w-full" style={{ height: '0.5px', background: 'rgba(0,0,0,0.07)' }} />;
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
      : { background: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.45)' };
  return (
    <span
      className="font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.11px] px-[6px] py-[1px] rounded-[3px] font-medium shrink-0"
      style={style}
    >
      {author}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'rgba(0,0,0,0.9)' }}>
      {children}
    </p>
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
            className="font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px] font-medium"
            style={{ color: 'rgba(0,0,0,0.9)' }}
          >
            {skill.name}
          </h2>
          {skill.author && <AuthorTag author={skill.author} />}
          <div className="flex-1" />
          <SkillEnableToggle enabled={enabled} onToggle={onToggleEnabled} />
        </div>
        {(skill.version || skill.lastUpdated) && (
          <div className="flex items-center gap-[16px]">
            {skill.version && (
              <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
                Version: {skill.version}
              </span>
            )}
            {skill.lastUpdated && (
              <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
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
            padding: 16,
            height: 600,
            overflowY: 'auto',
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
          className="font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px] font-medium"
          style={{ color: 'rgba(0,0,0,0.9)' }}
        >
          {app.name}
        </h2>
        <p className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px]" style={{ color: 'rgba(0,0,0,0.45)' }}>
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
        style={{ color: 'rgba(0,0,0,0.28)' }}
      >
        Select a skill to view details
      </p>
    </div>
  );
}

// ─── Modal Content ────────────────────────────────────────────────────────────

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
  return {};
}

function saveEnabledMap(map: Record<string, boolean>) {
  try {
    localStorage.setItem(SKILL_ENABLED_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

function SkillModalContent({ onClose }: { onClose: () => void }) {
  // Default: alva-design selected with all folder levels expanded
  const [selectedSkillId, setSelectedSkillId] = useState<string>('alva-design');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['alva-design']));
  const [expandedSubIds, setExpandedSubIds] = useState<Set<string>>(() => {
    const alvaDesign = SKILLS.find((s) => s.id === 'alva-design');
    return new Set(alvaDesign?.apps ? collectFolderIds(alvaDesign.apps) : []);
  });
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  // 左侧栏「是否启用」：未存过则默认 true，持久化到 localStorage
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(loadEnabledMap);

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
    if (selectedSkillId === skillId) return;
    setSelectedSkillId(skillId);
    setSelectedAppId(null);
    const skill = SKILLS.find((s) => s.id === skillId);
    setExpandedIds(new Set(skill?.apps?.length ? [skillId] : []));
    // Auto-expand all folder levels
    setExpandedSubIds(new Set(skill?.apps ? collectFolderIds(skill.apps) : []));
  }

  function handleToggleExpand(skillId: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(skillId) ? next.delete(skillId) : next.add(skillId);
      return next;
    });
  }

  function handleToggleSubExpand(appId: string) {
    setExpandedSubIds((prev) => {
      const next = new Set(prev);
      next.has(appId) ? next.delete(appId) : next.add(appId);
      return next;
    });
  }

  function handleSelectApp(appId: string) {
    setSelectedAppId(appId);
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
            onToggleExpand={() => handleToggleExpand(skill.id)}
            onToggleEnabled={() => handleToggleEnabled(skill.id)}
          />
          {isActive && isExpanded && skill.apps && (
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
                  onSelectApp={handleSelectApp}
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
      className="bg-white relative rounded-[8px] flex flex-col"
      style={{ width: 'min(calc(100vw - 56px), 1280px)', height: 720 }}
    >
      {/* Border + shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[8px]"
        style={{ border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)' }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-[12px] shrink-0"
        style={{ padding: '20px 24px 18px', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}
      >
        <p
          className="flex-1 font-['Delight',sans-serif] text-[18px] leading-[28px] tracking-[0.18px] font-medium"
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
          style={{ width: 280, borderRight: '0.5px solid rgba(0,0,0,0.07)', padding: '12px 16px 16px' }}
        >
          {/* My Skills (top) */}
          <SectionHeader
            label="My Skills"
            action={
              <button
                className="flex items-center gap-[3px] font-['Delight',sans-serif] text-[12px] leading-[18px] tracking-[0.12px] hover:opacity-70 transition-opacity"
                style={{ color: '#49a3a6', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <UploadIcon />
                Upload
              </button>
            }
          />
          <div className="flex flex-col mt-[4px]">
            {renderSkillList(customSkills)}
          </div>

          {/* Divider */}
          <div style={{ margin: '12px 0', height: '0.5px', background: 'rgba(0,0,0,0.07)' }} />

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
      <SkillModalContent onClose={onClose} />
    </div>
  );
}
