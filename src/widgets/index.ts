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
import { MarkdownWidget } from './MarkdownWidget';
import { DRAMPriceTrendWidget } from './DRAMPriceTrendWidget';
import { KPISnapshotWidget } from './KPISnapshotWidget';
import { PeerComparisonWidget } from './PeerComparisonWidget';

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
  'kpi-snapshot': {
    id: 'kpi-snapshot',
    title: 'Key Metrics',
    component: KPISnapshotWidget,
    defaultSize: { w: 12, h: 3 },
  },
  'peer-comparison': {
    id: 'peer-comparison',
    title: 'Peer Comparison',
    component: PeerComparisonWidget,
    defaultSize: { w: 12, h: 5 },
  },
};
