/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 交易相关所有 mock 数据 + TypeScript 类型
 * [POS]: 数据层 — Portfolio / Strategy / Order / Journal 演示数据
 */

/* ========== 类型定义 ========== */

export interface BrokerConnection {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  accountId: string;
  lastSync: string;
}

export interface Position {
  symbol: string;
  name: string;
  qty: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  weight: number;
  pnl: number;
  pnlPercent: number;
  account: string;
}

export interface WeightBar {
  symbol: string;
  currentWeight: number;
  targetWeight: number;
  drift: number;
}

export interface StrategyBinding {
  id: string;
  playbookName: string;
  author: string;
  broker: string;
  mode: 'approval' | 'auto';
  status: 'active';
  lastRebalance: string;
  pendingOrders: number;
  weights: WeightBar[];
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  qty: number;
  price: number;
  status: 'pending' | 'filled' | 'rejected';
  sourceStrategy: string;
  timestamp: string;
  reason?: string;
}

export interface JournalTrade {
  side: 'buy' | 'sell';
  symbol: string;
  qty: number;
  price: number;
  pnl?: number;
  status: 'filled' | 'skipped' | 'failed';
  statusReason?: string;
  /** 'manual' = 用户自行下单；其他值 = playbook signal 触发 */
  source: 'manual' | string;
  note?: string;
}

export interface JournalEntry {
  date: string;
  trades: JournalTrade[];
}

export interface RiskConfig {
  maxOrderSize: number;
  maxDailyTurnover: number;
  maxDailyOrders: number;
  killSwitch: boolean;
}

export interface PortfolioSummary {
  totalEquity: number;
  todayPnl: number;
  todayPnlPercent: number;
  equityCurve: [string, number][];
  positions: Position[];
  strategies: StrategyBinding[];
  orders: Order[];
  journal: JournalEntry[];
  brokers: BrokerConnection[];
  risk: RiskConfig;
}

export interface BrokerPortfolio {
  brokerId: string;
  brokerName: string;
  brokerLabel: string;
  accountId: string;
  totalEquity: number;
  todayPnl: number;
  todayPnlPercent: number;
  equityCurve: [string, number][];
  costBasis: [string, number][];
  benchmark: [string, number][];
  positions: Position[];
  strategy: StrategyBinding;
  orders: Order[];
  journal: JournalEntry[];
}

/* ========== Mock 数据 ========== */

const BROKERS: BrokerConnection[] = [
  { id: 'ibkr-1', name: 'Interactive Brokers', status: 'connected', accountId: 'U****6789', lastSync: '2 min ago' },
  { id: 'binance-1', name: 'Binance', status: 'connected', accountId: 'spot-****42', lastSync: '5 min ago' },
  { id: 'alpaca-1', name: 'Alpaca', status: 'connected', accountId: 'PA****1234', lastSync: '3 days ago' },
];

const POSITIONS: Position[] = [
  { symbol: 'BTC', name: 'Bitcoin', qty: 0.35, avgCost: 62400, currentPrice: 67250, marketValue: 23537.50, weight: 23.5, pnl: 1697.50, pnlPercent: 7.77, account: 'Binance' },
  { symbol: 'ETH', name: 'Ethereum', qty: 4.2, avgCost: 3150, currentPrice: 3420, marketValue: 14364, weight: 14.4, pnl: 1134, pnlPercent: 8.57, account: 'Binance' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', qty: 15, avgCost: 875, currentPrice: 920.40, marketValue: 13806, weight: 13.8, pnl: 681, pnlPercent: 5.19, account: 'IBKR' },
  { symbol: 'MSFT', name: 'Microsoft', qty: 30, avgCost: 405.20, currentPrice: 418.75, marketValue: 12562.50, weight: 12.6, pnl: 406.50, pnlPercent: 3.34, account: 'IBKR' },
  { symbol: 'AAPL', name: 'Apple Inc.', qty: 45, avgCost: 178.50, currentPrice: 192.30, marketValue: 8653.50, weight: 8.7, pnl: 621, pnlPercent: 7.73, account: 'IBKR' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', qty: 40, avgCost: 188, currentPrice: 195.60, marketValue: 7824, weight: 7.8, pnl: 304, pnlPercent: 4.04, account: 'IBKR' },
  { symbol: 'TLT', name: 'iShares 20+ Yr Treasury', qty: 80, avgCost: 92.50, currentPrice: 89.20, marketValue: 7136, weight: 7.1, pnl: -264, pnlPercent: -3.57, account: 'IBKR' },
  { symbol: 'AMZN', name: 'Amazon.com', qty: 20, avgCost: 178.30, currentPrice: 186.50, marketValue: 3730, weight: 3.7, pnl: 164, pnlPercent: 4.60, account: 'IBKR' },
];

const STRATEGY_WEIGHTS_BTC: WeightBar[] = [
  { symbol: 'BTC', currentWeight: 0.58, targetWeight: 0.55, drift: 0.03 },
  { symbol: 'ETH', currentWeight: 0.35, targetWeight: 0.35, drift: 0.00 },
  { symbol: 'SOL', currentWeight: 0.07, targetWeight: 0.10, drift: -0.03 },
];

const STRATEGY_WEIGHTS_TECH: WeightBar[] = [
  { symbol: 'AAPL', currentWeight: 0.12, targetWeight: 0.15, drift: -0.03 },
  { symbol: 'MSFT', currentWeight: 0.18, targetWeight: 0.18, drift: 0.00 },
  { symbol: 'NVDA', currentWeight: 0.20, targetWeight: 0.17, drift: 0.03 },
  { symbol: 'AMZN', currentWeight: 0.05, targetWeight: 0.08, drift: -0.03 },
  { symbol: 'CASH', currentWeight: 0.45, targetWeight: 0.42, drift: 0.03 },
];

const STRATEGY_WEIGHTS_MACRO: WeightBar[] = [
  { symbol: 'TLT', currentWeight: 0.48, targetWeight: 0.50, drift: -0.02 },
  { symbol: 'GLD', currentWeight: 0.52, targetWeight: 0.50, drift: 0.02 },
];

const STRATEGIES: StrategyBinding[] = [
  {
    id: 'bind-1', playbookName: 'BTC Momentum v2', author: 'alice_crypto', broker: 'Binance',
    mode: 'auto', status: 'active', lastRebalance: '6 hours ago', pendingOrders: 0,
    weights: STRATEGY_WEIGHTS_BTC,
  },
  {
    id: 'bind-2', playbookName: 'US Tech Value', author: 'leoz', broker: 'IBKR',
    mode: 'approval', status: 'active', lastRebalance: '3 days ago', pendingOrders: 2,
    weights: STRATEGY_WEIGHTS_TECH,
  },
  {
    id: 'bind-3', playbookName: 'Macro Hedge', author: 'macro_master', broker: 'IBKR',
    mode: 'auto', status: 'active', lastRebalance: '1 day ago', pendingOrders: 0,
    weights: STRATEGY_WEIGHTS_MACRO,
  },
];

const ORDERS: Order[] = [
  // Pending
  { id: 'ord-01', symbol: 'AAPL', side: 'buy', type: 'market', qty: 10, price: 192.30, status: 'pending', sourceStrategy: 'US Tech Value', timestamp: 'Just now', reason: 'Rebalance: AAPL underweight by 3%' },
  { id: 'ord-02', symbol: 'NVDA', side: 'sell', type: 'limit', qty: 5, price: 925.00, status: 'pending', sourceStrategy: 'US Tech Value', timestamp: '5 min ago', reason: 'Rebalance: NVDA overweight by 3%' },
  // Today filled
  { id: 'ord-03', symbol: 'BTC', side: 'buy', type: 'market', qty: 0.02, price: 67100.00, status: 'filled', sourceStrategy: 'BTC Momentum', timestamp: '1h ago' },
  { id: 'ord-04', symbol: 'ETH', side: 'sell', type: 'market', qty: 0.5, price: 3415.00, status: 'filled', sourceStrategy: 'BTC Momentum', timestamp: '2h ago' },
  { id: 'ord-05', symbol: 'GLD', side: 'buy', type: 'market', qty: 5, price: 195.20, status: 'filled', sourceStrategy: 'Macro Hedge', timestamp: '3h ago' },
  { id: 'ord-06', symbol: 'TLT', side: 'sell', type: 'market', qty: 10, price: 89.50, status: 'filled', sourceStrategy: 'Macro Hedge', timestamp: '3h ago' },
  { id: 'ord-07', symbol: 'AMZN', side: 'buy', type: 'limit', qty: 5, price: 185.00, status: 'filled', sourceStrategy: 'US Tech Value', timestamp: '5h ago' },
  // This week
  { id: 'ord-08', symbol: 'MSFT', side: 'buy', type: 'market', qty: 8, price: 412.50, status: 'filled', sourceStrategy: 'US Tech Value', timestamp: 'Yesterday' },
  { id: 'ord-09', symbol: 'AAPL', side: 'buy', type: 'market', qty: 5, price: 189.80, status: 'filled', sourceStrategy: 'US Tech Value', timestamp: 'Yesterday' },
  { id: 'ord-10', symbol: 'BTC', side: 'buy', type: 'market', qty: 0.05, price: 65800.00, status: 'filled', sourceStrategy: 'BTC Momentum', timestamp: '2 days ago' },
  { id: 'ord-11', symbol: 'ETH', side: 'buy', type: 'market', qty: 1.0, price: 3280.00, status: 'filled', sourceStrategy: 'BTC Momentum', timestamp: '2 days ago' },
  { id: 'ord-12', symbol: 'NVDA', side: 'sell', type: 'limit', qty: 3, price: 910.00, status: 'filled', sourceStrategy: 'US Tech Value', timestamp: '3 days ago' },
  { id: 'ord-13', symbol: 'GLD', side: 'buy', type: 'market', qty: 10, price: 192.80, status: 'filled', sourceStrategy: 'Macro Hedge', timestamp: '3 days ago' },
  { id: 'ord-14', symbol: 'TLT', side: 'buy', type: 'market', qty: 15, price: 91.00, status: 'filled', sourceStrategy: 'Macro Hedge', timestamp: '4 days ago' },
  { id: 'ord-15', symbol: 'SOL', side: 'buy', type: 'market', qty: 12, price: 142.50, status: 'rejected', sourceStrategy: 'BTC Momentum', timestamp: '4 days ago', reason: 'Insufficient balance' },
  { id: 'ord-16', symbol: 'AAPL', side: 'sell', type: 'limit', qty: 10, price: 191.00, status: 'filled', sourceStrategy: 'US Tech Value', timestamp: '5 days ago' },
  { id: 'ord-17', symbol: 'BTC', side: 'sell', type: 'market', qty: 0.03, price: 64200.00, status: 'filled', sourceStrategy: 'BTC Momentum', timestamp: '5 days ago' },
];

const JOURNAL: JournalEntry[] = [
  {
    date: 'Mar 20, 2026',
    trades: [
      { side: 'buy', symbol: 'BTC', qty: 0.02, price: 67100.00, status: 'filled', source: 'BTC Momentum' },
      { side: 'sell', symbol: 'ETH', qty: 0.5, price: 3415.00, pnl: 82.50, status: 'filled', source: 'BTC Momentum' },
      { side: 'buy', symbol: 'GLD', qty: 5, price: 195.20, status: 'filled', source: 'Macro Hedge' },
      { side: 'sell', symbol: 'TLT', qty: 10, price: 89.50, pnl: -30.00, status: 'filled', source: 'Macro Hedge' },
      { side: 'buy', symbol: 'AMZN', qty: 5, price: 185.00, status: 'filled', source: 'US Tech Value' },
      { side: 'buy', symbol: 'NVDA', qty: 8, price: 920.40, status: 'skipped', statusReason: 'Max daily turnover exceeded ($50K limit)', source: 'US Tech Value' },
      { side: 'buy', symbol: 'TSLA', qty: 10, price: 248.50, status: 'filled', source: 'manual', note: 'Earnings play — expecting beat' },
    ],
  },
  {
    date: 'Mar 19, 2026',
    trades: [
      { side: 'buy', symbol: 'MSFT', qty: 8, price: 412.50, status: 'filled', source: 'US Tech Value' },
      { side: 'buy', symbol: 'AAPL', qty: 5, price: 189.80, status: 'filled', source: 'US Tech Value' },
      { side: 'sell', symbol: 'SOL', qty: 12, price: 142.50, status: 'failed', statusReason: 'Insufficient balance', source: 'BTC Momentum' },
      { side: 'sell', symbol: 'TSLA', qty: 5, price: 245.00, pnl: -40.00, status: 'filled', source: 'manual', note: 'Cut half position — weak guidance' },
    ],
  },
  {
    date: 'Mar 18, 2026',
    trades: [
      { side: 'buy', symbol: 'BTC', qty: 0.05, price: 65800.00, status: 'filled', source: 'BTC Momentum' },
      { side: 'buy', symbol: 'ETH', qty: 1.0, price: 3280.00, status: 'filled', source: 'BTC Momentum' },
      { side: 'buy', symbol: 'AAPL', qty: 20, price: 191.50, status: 'skipped', statusReason: 'Max order size exceeded ($5K limit)', source: 'US Tech Value' },
    ],
  },
  {
    date: 'Mar 17, 2026',
    trades: [
      { side: 'sell', symbol: 'NVDA', qty: 3, price: 910.00, pnl: 105.00, status: 'filled', source: 'US Tech Value' },
      { side: 'buy', symbol: 'GLD', qty: 10, price: 192.80, status: 'filled', source: 'Macro Hedge' },
      { side: 'buy', symbol: 'DOGE', qty: 5000, price: 0.182, status: 'filled', source: 'manual' },
    ],
  },
  {
    date: 'Mar 16, 2026',
    trades: [
      { side: 'buy', symbol: 'TLT', qty: 15, price: 91.00, status: 'filled', source: 'Macro Hedge' },
      { side: 'sell', symbol: 'AAPL', qty: 10, price: 191.00, pnl: 125.00, status: 'filled', source: 'US Tech Value', note: 'Trimmed position after earnings beat' },
      { side: 'sell', symbol: 'BTC', qty: 0.03, price: 64200.00, pnl: -180.00, status: 'filled', source: 'BTC Momentum' },
    ],
  },
];

/* 6 个月 equity curve */
function generateEquityCurve(): [string, number][] {
  const points: [string, number][] = [];
  let value = 85000;
  const startDate = new Date('2025-09-20');
  for (let i = 0; i <= 180; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    value += (Math.random() - 0.42) * 600;
    value = Math.max(75000, Math.min(110000, value));
    points.push([dateStr, Math.round(value)]);
  }
  points[points.length - 1][1] = 100000;
  return points;
}

const RISK: RiskConfig = {
  maxOrderSize: 5000,
  maxDailyTurnover: 50000,
  maxDailyOrders: 50,
  killSwitch: false,
};

export const MOCK_PORTFOLIO: PortfolioSummary = {
  totalEquity: 100000,
  todayPnl: 1234,
  todayPnlPercent: 1.25,
  equityCurve: generateEquityCurve(),
  positions: POSITIONS,
  strategies: STRATEGIES,
  orders: ORDERS,
  journal: JOURNAL,
  brokers: BROKERS,
  risk: RISK,
};

/* ========== Per-Broker Portfolios (MVP: 1 account = 1 strategy) ========== */

const IBKR_STRATEGY_WEIGHTS: WeightBar[] = [
  { symbol: 'NVDA', currentWeight: 0.25, targetWeight: 0.22, drift: 0.03 },
  { symbol: 'MSFT', currentWeight: 0.23, targetWeight: 0.23, drift: 0.00 },
  { symbol: 'AAPL', currentWeight: 0.16, targetWeight: 0.18, drift: -0.02 },
  { symbol: 'GLD', currentWeight: 0.15, targetWeight: 0.14, drift: 0.01 },
  { symbol: 'TLT', currentWeight: 0.13, targetWeight: 0.14, drift: -0.01 },
  { symbol: 'AMZN', currentWeight: 0.07, targetWeight: 0.09, drift: -0.02 },
];

const IBKR_POSITIONS: Position[] = POSITIONS.filter(p => p.account === 'IBKR');

const BINANCE_POSITIONS: Position[] = POSITIONS.filter(p => p.account === 'Binance');

const IBKR_STRATEGY: StrategyBinding = {
  id: 'bind-ibkr', playbookName: 'US Tech Value', author: 'leoz', broker: 'IBKR',
  mode: 'approval', status: 'active', lastRebalance: '3 days ago', pendingOrders: 2,
  weights: IBKR_STRATEGY_WEIGHTS,
};

const BINANCE_STRATEGY: StrategyBinding = { ...STRATEGIES[0] };

function filterOrders(strategies: string[]): Order[] {
  return ORDERS.filter(o => strategies.includes(o.sourceStrategy));
}

function filterJournal(strategies: string[]): JournalEntry[] {
  return JOURNAL
    .map(e => ({ ...e, trades: e.trades.filter(t => t.source === 'manual' || strategies.includes(t.source)) }))
    .filter(e => e.trades.length > 0);
}

function generateCurve(startValue: number, endValue: number, volatility = 0.008): [string, number][] {
  const points: [string, number][] = [];
  let value = startValue;
  const startDate = new Date('2025-09-20');
  const days = 180;
  const bias = (endValue - startValue) / days;
  for (let i = 0; i <= days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    value += bias + (Math.random() - 0.5) * startValue * volatility;
    value = Math.max(startValue * 0.85, Math.min(startValue * 1.3, value));
    points.push([d.toISOString().split('T')[0], Math.round(value)]);
  }
  points[points.length - 1][1] = endValue;
  return points;
}

function generateCostBasis(value: number): [string, number][] {
  const points: [string, number][] = [];
  const startDate = new Date('2025-09-20');
  for (let i = 0; i <= 180; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    points.push([d.toISOString().split('T')[0], value]);
  }
  return points;
}

export const BROKER_PORTFOLIOS: BrokerPortfolio[] = [
  {
    brokerId: 'ibkr-1', brokerName: 'Interactive Brokers', brokerLabel: 'IBKR',
    accountId: 'U****6789', totalEquity: 62000, todayPnl: 856, todayPnlPercent: 1.40,
    equityCurve: generateCurve(50000, 62000),
    costBasis: generateCostBasis(50000),
    benchmark: generateCurve(50000, 58000, 0.006),
    positions: IBKR_POSITIONS, strategy: IBKR_STRATEGY,
    orders: filterOrders(['US Tech Value', 'Macro Hedge']),
    journal: filterJournal(['US Tech Value', 'Macro Hedge']),
  },
  {
    brokerId: 'binance-1', brokerName: 'Binance', brokerLabel: 'Binance',
    accountId: 'spot-****42', totalEquity: 38000, todayPnl: 378, todayPnlPercent: 1.00,
    equityCurve: generateCurve(35000, 38000),
    costBasis: generateCostBasis(35000),
    benchmark: generateCurve(35000, 36500, 0.01),
    positions: BINANCE_POSITIONS, strategy: BINANCE_STRATEGY,
    orders: filterOrders(['BTC Momentum']),
    journal: filterJournal(['BTC Momentum']),
  },
];
