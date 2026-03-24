/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: Alva Chat mock 类型 + 数据
 * [POS]: data 层 — 对话 UI 的类型系统与 mock 对话
 */

/* ========== 基础类型 ========== */

export type ToolName =
  | 'Bash' | 'Read' | 'Write' | 'Edit' | 'Grep' | 'Glob'
  | 'WebSearch' | 'WebFetch'
  | `alva_${string}` | `mcp__${string}` | 'Skill' | 'Agent';

export interface ToolCallData {
  id: string;
  tool: ToolName;
  input: string;
  result?: string;
  status: 'running' | 'done' | 'error';
  durationMs?: number;
  groupLabel?: string;
}

export interface AgentStepData {
  id: string;
  description: string;
  subagentType: 'Explore' | 'Plan' | string;
  blocks: MessageBlock[];
}

export interface QuestionCardData {
  id: string;
  header: string;
  question: string;
  options: { label: string; description: string }[];
  multiSelect: boolean;
  selectedIndex?: number;
}

export interface CompletionData {
  durationSec: number;
  tokenCount: number;
  actions?: { label: string }[];
}

export interface PlanCardData {
  id: string;
  title: string;
  steps: string[];
  accepted: boolean;
}

export interface ArtifactData {
  id: string;
  artifactType: 'html' | 'chart' | 'image';
  title: string;
  description: string;
}

export interface TodoItem {
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  activeForm?: string;
}

export interface TodoUpdateData {
  label: string;
  items: TodoItem[];
}

export type MessageBlock =
  | { type: 'text'; content: string }
  | { type: 'tool_call'; data: ToolCallData }
  | { type: 'agent_step'; data: AgentStepData }
  | { type: 'question'; data: QuestionCardData }
  | { type: 'completion'; data: CompletionData }
  | { type: 'plan'; data: PlanCardData }
  | { type: 'artifact'; data: ArtifactData }
  | { type: 'todo_update'; data: TodoUpdateData };

/* ========== Turn / Message ========== */

export interface UserTurn {
  id: string;
  role: 'user';
  text: string;
  attachments?: { name: string; type: 'file' | 'image' }[];
  timestamp: string;
}

export interface AgentTurnData {
  id: string;
  role: 'agent';
  blocks: MessageBlock[];
  timestamp: string;
}

export type ConversationTurn = UserTurn | AgentTurnData;

/* ========== Conversation ========== */

export interface Conversation {
  id: string;
  title: string;
  summary: string;
  tickers: string[];
  createdAt: string;
  updatedAt: string;
  turns: ConversationTurn[];
  status: 'active' | 'completed';
}

/* ========== Mock 对话 #1: NVDA Earnings Dashboard ========== */

const NVDA_CONVERSATION: Conversation = {
  id: 'conv-nvda-earnings',
  title: 'Build NVDA Earnings Dashboard',
  summary: 'Fetch NVDA fundamentals, build an interactive earnings dashboard with revenue trends and margin analysis.',
  tickers: ['NVDA'],
  createdAt: '2026-03-24T10:30:00Z',
  updatedAt: '2026-03-24T10:35:00Z',
  status: 'completed',
  turns: [
    {
      id: 'u1',
      role: 'user',
      text: 'Build me an NVDA earnings dashboard — I want to see quarterly revenue, gross margin trends, and a forward P/E comparison with AMD and INTC.',
      timestamp: '10:30 AM',
    },
    {
      id: 'a1',
      role: 'agent',
      blocks: [
        /* 1. Plan — 流式时暂停等用户 Accept */
        {
          type: 'plan',
          data: {
            id: 'plan-nvda',
            title: 'NVDA Earnings Dashboard',
            steps: [
              'Fetch NVDA quarterly financials (revenue, gross margin, forward P/E)',
              'Fetch AMD and INTC forward P/E for peer comparison',
              'Choose dashboard layout and chart types',
              'Build interactive dashboard with ECharts',
            ],
            accepted: true,
          },
        },
        /* 2. Todo init */
        {
          type: 'todo_update',
          data: {
            label: 'Building NVDA Earnings Dashboard',
            items: [
              { content: 'Fetch NVDA fundamentals', status: 'in_progress', activeForm: 'Pulling NVDA quarterly data...' },
              { content: 'Fetch peer P/E data', status: 'pending' },
              { content: 'Choose layout', status: 'pending' },
              { content: 'Build dashboard', status: 'pending' },
            ],
          },
        },
        /* 3. Fetch data (grouped) */
        {
          type: 'tool_call',
          data: {
            id: 'tc1',
            tool: 'alva_equity_fundamentals',
            input: '{\n  "ticker": "NVDA",\n  "metrics": ["revenue", "gross_margin", "forward_pe"],\n  "period": "quarterly",\n  "limit": 12\n}',
            result: '{\n  "ticker": "NVDA",\n  "periods": 12,\n  "latest_revenue": "$35.1B",\n  "latest_gross_margin": "73.0%",\n  "forward_pe": 32.4,\n  "data_points": 48\n}',
            status: 'done',
            durationMs: 2340,
            groupLabel: 'Fetched NVDA fundamentals and peer forward P/E for comparison',
          },
        },
        {
          type: 'tool_call',
          data: {
            id: 'tc2',
            tool: 'Bash',
            input: 'python fetch_peer_pe.py --tickers AMD,INTC --metric forward_pe',
            result: 'AMD forward P/E: 28.1\nINTC forward P/E: 18.7\nSaved to /workspace/output/peer_pe.json',
            status: 'done',
            durationMs: 1850,
          },
        },
        /* 4. Todo update: steps 1-2 done */
        {
          type: 'todo_update',
          data: {
            label: 'Building NVDA Earnings Dashboard',
            items: [
              { content: 'Fetch NVDA fundamentals', status: 'completed' },
              { content: 'Fetch peer P/E data', status: 'completed' },
              { content: 'Choose layout', status: 'in_progress', activeForm: 'Preparing layout options...' },
              { content: 'Build dashboard', status: 'pending' },
            ],
          },
        },
        /* 5. Question — 流式时暂停等用户选择 */
        {
          type: 'question',
          data: {
            id: 'q-layout',
            header: 'Layout',
            question: 'Which dashboard layout do you prefer for the earnings overview?',
            options: [
              { label: '3-Widget Grid (Recommended)', description: 'Revenue bar chart + Gross Margin line + P/E horizontal bar — compact, scannable' },
              { label: '2-Column Split', description: 'Left: large revenue + margin combo chart. Right: P/E comparison + KPI cards' },
            ],
            multiSelect: false,
            selectedIndex: 0,
          },
        },
        /* 6. Continue after user choice */
        {
          type: 'text',
          content: "Building the **3-Widget Grid** layout:\n- **Revenue Trend** — bar chart, quarterly\n- **Gross Margin** — line chart with 73% current highlight\n- **Forward P/E Comparison** — horizontal bar (NVDA vs AMD vs INTC)",
        },
        /* 7. Todo update: step 3 done */
        {
          type: 'todo_update',
          data: {
            label: 'Building NVDA Earnings Dashboard',
            items: [
              { content: 'Fetch NVDA fundamentals', status: 'completed' },
              { content: 'Fetch peer P/E data', status: 'completed' },
              { content: 'Choose layout', status: 'completed' },
              { content: 'Build dashboard', status: 'in_progress', activeForm: 'Assembling dashboard widgets...' },
            ],
          },
        },
        /* 8. Write dashboard */
        {
          type: 'tool_call',
          data: {
            id: 'tc3',
            tool: 'Write',
            input: '/workspace/playground/nvda-earnings/index.html\n<!-- Dashboard with ECharts: 3 widget grid layout -->',
            result: 'Wrote 287 lines to /workspace/playground/nvda-earnings/index.html',
            status: 'done',
            durationMs: 980,
          },
        },
        /* 9. Artifact preview */
        {
          type: 'artifact',
          data: {
            id: 'art-nvda',
            artifactType: 'html',
            title: 'NVDA Earnings Dashboard',
            description: 'Interactive 3-widget grid with quarterly revenue, gross margin trend, and peer P/E comparison',
          },
        },
        /* 10. Todo all done */
        {
          type: 'todo_update',
          data: {
            label: 'Building NVDA Earnings Dashboard',
            items: [
              { content: 'Fetch NVDA fundamentals', status: 'completed' },
              { content: 'Fetch peer P/E data', status: 'completed' },
              { content: 'Choose layout', status: 'completed' },
              { content: 'Build dashboard', status: 'completed' },
            ],
          },
        },
        /* 11. Summary */
        {
          type: 'text',
          content: "Dashboard is ready. Here's a summary:\n\n- **NVDA Q4 Revenue**: $35.1B (+265% YoY)\n- **Gross Margin**: 73.0%, up from 64.6% a year ago\n- **Forward P/E**: NVDA 32.4x vs AMD 28.1x vs INTC 18.7x\n\nThe dashboard has been deployed to your playground.",
        },
        /* 12. Completion */
        {
          type: 'completion',
          data: {
            durationSec: 42.3,
            tokenCount: 18472,
            actions: [{ label: 'Deploy as Draft' }, { label: 'Add to Playbook' }],
          },
        },
      ],
      timestamp: '10:35 AM',
    },
  ],
};

/* ========== Mock 对话 #2: ETH/BTC Correlation ========== */

const ETH_BTC_CONVERSATION: Conversation = {
  id: 'conv-eth-btc',
  title: 'Analyze ETH/BTC Correlation',
  summary: 'Deep-dive into ETH/BTC correlation regime with rolling window analysis and regime detection.',
  tickers: ['ETH', 'BTC'],
  createdAt: '2026-03-23T14:00:00Z',
  updatedAt: '2026-03-23T14:05:30Z',
  status: 'completed',
  turns: [
    {
      id: 'u2',
      role: 'user',
      text: 'Analyze the ETH/BTC correlation — I want to understand when they decouple and what drives the regime shifts.',
      timestamp: '2:00 PM',
    },
    {
      id: 'a2',
      role: 'agent',
      blocks: [
        {
          type: 'text',
          content: "Interesting question. Let me first explore what data sources we have available, then we'll decide on the analysis timeframe.",
        },
        {
          type: 'agent_step',
          data: {
            id: 'as1',
            description: 'Explore available crypto data feeds',
            subagentType: 'Explore',
            blocks: [
              {
                type: 'tool_call',
                data: {
                  id: 'tc4',
                  tool: 'Grep',
                  input: 'crypto.*ohlcv|btc.*price',
                  result: 'src/feeds/crypto_ohlcv.py\nsrc/feeds/btc_dominance.py\nsrc/feeds/eth_gas.py',
                  status: 'done',
                  durationMs: 320,
                },
              },
              {
                type: 'text',
                content: 'Found 3 relevant feeds: crypto OHLCV (daily/hourly), BTC dominance index, and ETH gas tracker. The OHLCV feed supports rolling correlation windows.',
              },
            ],
          },
        },
        {
          type: 'question',
          data: {
            id: 'q1',
            header: 'Time range',
            question: 'What time range should we analyze for the ETH/BTC correlation study?',
            options: [
              { label: '1 Year', description: 'Recent dynamics, captures the latest bull run' },
              { label: '2 Years (Recommended)', description: 'Covers both bear and bull regimes — best for regime shift detection' },
              { label: '4 Years', description: 'Full cycle including 2022 crash, but older data may be less relevant' },
            ],
            multiSelect: false,
            selectedIndex: 1,
          },
        },
        {
          type: 'text',
          content: "Good choice — 2 years gives us both the 2024 bear-to-bull transition and the recent AI-narrative driven divergence.\n\nLet me fetch the data and run the analysis.",
        },
        {
          type: 'tool_call',
          data: {
            id: 'tc5',
            tool: 'alva_crypto_ohlcv',
            input: '{\n  "tickers": ["ETH", "BTC"],\n  "interval": "1d",\n  "start": "2024-03-24",\n  "end": "2026-03-24"\n}',
            result: 'Fetched 730 daily candles for ETH\nFetched 730 daily candles for BTC\nCorrelation (full period): 0.87\nCorrelation (30d rolling, current): 0.62',
            status: 'done',
            durationMs: 3120,
            groupLabel: 'Pulled 2-year price data and ran HMM regime detection on ETH/BTC pair',
          },
        },
        {
          type: 'tool_call',
          data: {
            id: 'tc6',
            tool: 'Bash',
            input: 'python regime_detect.py --pair ETH/BTC --method hmm --states 3',
            result: 'Regime Detection Results (HMM, 3 states):\n  State 0 (High Corr): 412 days, avg corr 0.91\n  State 1 (Decoupling): 198 days, avg corr 0.54\n  State 2 (Divergence): 120 days, avg corr 0.23\n\nKey transitions:\n  2024-11 → Decoupling (ETH underperformance vs BTC ETF flows)\n  2025-03 → High Corr (both rallied on rate cut)\n  2025-09 → Divergence (AI narrative favored SOL over ETH)',
            status: 'done',
            durationMs: 5670,
          },
        },
        {
          type: 'text',
          content: "## Key Findings\n\nThe ETH/BTC pair cycles through **3 distinct correlation regimes**:\n\n1. **High Correlation** (56% of time) — Both move together, typically during macro-driven rallies/selloffs\n2. **Decoupling** (27%) — ETH lags BTC, driven by BTC-specific catalysts (ETF inflows, halving)\n3. **Divergence** (17%) — Correlation drops below 0.3, driven by narrative shifts (AI/SOL rotation in 2025)\n\n**Current state**: Decoupling (30d rolling corr = 0.62), transitioning from high correlation.\n\n**Actionable insight**: When correlation drops below 0.7 for >14 days, historically ETH outperforms BTC by 12% in the following 60 days as the ratio mean-reverts.",
        },
        {
          type: 'completion',
          data: {
            durationSec: 67.8,
            tokenCount: 24310,
            actions: [{ label: 'Save to Library' }, { label: 'Add to Playbook' }],
          },
        },
      ],
      timestamp: '2:05 PM',
    },
  ],
};

/* ========== Mock 对话 #3: Portfolio Rebalance ========== */

const REBALANCE_CONVERSATION: Conversation = {
  id: 'conv-rebalance',
  title: 'Portfolio Rebalance Signals',
  summary: 'Quick portfolio rebalance check — drift analysis and trade suggestions for a 60/40 equity/bond allocation.',
  tickers: ['SPY', 'AGG'],
  createdAt: '2026-03-24T09:15:00Z',
  updatedAt: '2026-03-24T09:16:20Z',
  status: 'active',
  turns: [
    {
      id: 'u3',
      role: 'user',
      text: 'Check if my 60/40 portfolio needs rebalancing. Current holdings: 68% SPY, 32% AGG.',
      timestamp: '9:15 AM',
    },
    {
      id: 'a3',
      role: 'agent',
      blocks: [
        {
          type: 'text',
          content: "Your portfolio has drifted from the 60/40 target. Let me analyze the drift and generate rebalance trades.",
        },
        {
          type: 'tool_call',
          data: {
            id: 'tc7',
            tool: 'alva_portfolio_analysis',
            input: '{\n  "holdings": [\n    {"ticker": "SPY", "weight": 0.68},\n    {"ticker": "AGG", "weight": 0.32}\n  ],\n  "target": {"SPY": 0.60, "AGG": 0.40}\n}',
            result: 'Drift Analysis:\n  SPY: 68% → 60% (overweight +8%)\n  AGG: 32% → 40% (underweight -8%)\n\nRebalance threshold (5%) exceeded.\n\nSuggested trades (for $100k portfolio):\n  SELL 15 shares SPY @ $542.30 = $8,134.50\n  BUY  79 shares AGG @ $102.85 = $8,125.15',
            status: 'done',
            durationMs: 1450,
          },
        },
        {
          type: 'text',
          content: "## Rebalance Summary\n\nYour portfolio is **8% overweight equities** — past the standard 5% rebalance threshold.\n\n| Action | Ticker | Shares | Amount |\n|--------|--------|--------|--------|\n| SELL | SPY | 15 | $8,134 |\n| BUY | AGG | 79 | $8,125 |\n\nThis brings you back to 60/40. The equity trim also locks in recent gains (SPY +14% YTD).\n\n> **Note**: Consider tax-loss harvesting on AGG lots from 2025 Q4 that are still underwater.",
        },
        {
          type: 'completion',
          data: {
            durationSec: 18.5,
            tokenCount: 6840,
            actions: [{ label: 'Execute Trades' }, { label: 'Save Analysis' }],
          },
        },
      ],
      timestamp: '9:16 AM',
    },
  ],
};

/* ========== 导出 ========== */

export const MOCK_CONVERSATIONS: Conversation[] = [
  NVDA_CONVERSATION,
  ETH_BTC_CONVERSATION,
  REBALANCE_CONVERSATION,
];

let _activeConversationId: string | null = null;
let _shouldStream = false;
const _listeners: Set<(id: string) => void> = new Set();

export function setActiveConversation(id: string) {
  _activeConversationId = id;
  _listeners.forEach(fn => fn(id));
}

export function getActiveConversation(): Conversation | undefined {
  return MOCK_CONVERSATIONS.find(c => c.id === _activeConversationId);
}

export function setShouldStream(v: boolean) { _shouldStream = v; }
export function getShouldStream() { return _shouldStream; }

let _chatPanelOpen = false;
export function setChatPanelOpen(v: boolean) { _chatPanelOpen = v; }
export function getChatPanelOpen() { const v = _chatPanelOpen; _chatPanelOpen = false; return v; }

export function onConversationChange(fn: (id: string) => void): () => void {
  _listeners.add(fn);
  return () => { _listeners.delete(fn); };
}
