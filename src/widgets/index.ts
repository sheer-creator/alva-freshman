/**
 * [INPUT]: 所有 Widget 组件
 * [OUTPUT]: Widget 注册表 + 类型定义
 * [POS]: Widget 层 — 统一注册入口
 */

import type { ComponentType } from 'react';
import { AIStorageRelativePerfWidget } from './AIStorageRelativePerfWidget';
import { AIStorageKeyWordTrendsWidget } from './AIStorageKeyWordTrendsWidget';
import { AIStorageEarningsWidget } from './AIStorageEarningsWidget';
import { EarningsDetailWidget } from './EarningsDetailWidget';
import { NVDAGoogleTrendWidget } from './NVDAGoogleTrendWidget';
import { NVDAPriceVsSPYWidget } from './NVDAPriceVsSPYWidget';
import { NVDATechAnalysisWidget } from './NVDATechAnalysisWidget';
import { MarkdownWidget } from './MarkdownWidget';
import { DRAMPriceTrendWidget } from './DRAMPriceTrendWidget';
import { NVDAStockPriceWidget } from './NVDAStockPriceWidget';
import { NVDAKeyMetricsWidget } from './NVDAKeyMetricsWidget';
import { NVDASupplyChainWidget } from './NVDASupplyChainWidget';
import { NVDARevenueSegmentWidget } from './NVDARevenueSegmentWidget';
import { NVDAPeerValuationWidget } from './NVDAPeerValuationWidget';
import { NVDAInvestmentThesisWidget } from './NVDAInvestmentThesisWidget';

/* ========== 类型 ========== */

export interface WidgetDefinition {
  id: string;
  title: string;
  component: ComponentType;
  defaultSize: { w: number; h: number };
}

/* ========== 注册表 ========== */

export const WIDGET_REGISTRY: Record<string, WidgetDefinition> = {
  'relative-perf': {
    id: 'relative-perf',
    title: 'AI Storage Relative Perf',
    component: AIStorageRelativePerfWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'keyword-trends': {
    id: 'keyword-trends',
    title: 'AI Storage Keyword Trends',
    component: AIStorageKeyWordTrendsWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'earnings-feed': {
    id: 'earnings-feed',
    title: 'AI Storage Earnings',
    component: AIStorageEarningsWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'earnings-detail': {
    id: 'earnings-detail',
    title: 'Earnings Detail',
    component: EarningsDetailWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-google-trend': {
    id: 'nvda-google-trend',
    title: 'NVDA Google Trend',
    component: NVDAGoogleTrendWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-price-vs-spy': {
    id: 'nvda-price-vs-spy',
    title: 'NVDA Price vs SPY',
    component: NVDAPriceVsSPYWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-tech-analysis': {
    id: 'nvda-tech-analysis',
    title: 'NVDA Tech Analysis',
    component: NVDATechAnalysisWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'markdown': {
    id: 'markdown',
    title: 'Markdown',
    component: MarkdownWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'dram-price-trend': {
    id: 'dram-price-trend',
    title: 'DRAM Price Trend',
    component: DRAMPriceTrendWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-stock-price': {
    id: 'nvda-stock-price',
    title: 'NVDA Stock Price (1Y)',
    component: NVDAStockPriceWidget,
    defaultSize: { w: 8, h: 6 },
  },
  'nvda-key-metrics': {
    id: 'nvda-key-metrics',
    title: 'NVDA Key Metrics',
    component: NVDAKeyMetricsWidget,
    defaultSize: { w: 12, h: 3 },
  },
  'nvda-supply-chain': {
    id: 'nvda-supply-chain',
    title: 'AI Supply Chain Performance',
    component: NVDASupplyChainWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-revenue-segment': {
    id: 'nvda-revenue-segment',
    title: 'NVDA Revenue by Segment',
    component: NVDARevenueSegmentWidget,
    defaultSize: { w: 6, h: 5 },
  },
  'nvda-peer-valuation': {
    id: 'nvda-peer-valuation',
    title: 'Peer Valuation Comparison',
    component: NVDAPeerValuationWidget,
    defaultSize: { w: 12, h: 4 },
  },
  'nvda-investment-thesis': {
    id: 'nvda-investment-thesis',
    title: 'NVDA Investment Thesis',
    component: NVDAInvestmentThesisWidget,
    defaultSize: { w: 4, h: 6 },
  },
};
