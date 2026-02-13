/**
 * Alva UI Kit 使用示例
 * 展示如何使用各种UI组件
 */

import React from 'react';
import {
  // 基础组件
  Button,
  Card,
  Input,
  Badge,
  
  // Widget组件
  WidgetContainer,
  WidgetTitle,
  
  // 图表组件
  HeatmapWidget,
  LineChartWidget,
  BarChartWidget,
  
  // 数据展示组件
  StatCard,
  Table,
  
  // 工具函数
  generateHeatmapSampleData,
  generateLineChartSampleData,
  formatCurrency,
  formatPercentage
} from './alva-ui-kit';

/**
 * 基础组件示例
 */
export function BasicComponentsExample() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-[Delight,sans-serif]">基础组件示例</h2>
      
      {/* 按钮示例 */}
      <Card>
        <h3 className="mb-4 font-[Delight,sans-serif]">按钮</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="destructive">Destructive Button</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Card>

      {/* 输入框示例 */}
      <Card>
        <h3 className="mb-4 font-[Delight,sans-serif]">输入框</h3>
        <div className="grid gap-4 max-w-md">
          <Input label="用户名" placeholder="请输入用户名" />
          <Input label="邮箱" type="email" placeholder="example@email.com" />
          <Input label="密码" type="password" error="密码长度至少8位" />
        </div>
      </Card>

      {/* 徽章示例 */}
      <Card>
        <h3 className="mb-4 font-[Delight,sans-serif]">徽章</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Card>
    </div>
  );
}

/**
 * 图表组件示例
 */
export function ChartComponentsExample() {
  // 生成示例数据
  const heatmapData = generateHeatmapSampleData(
    ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
     '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'],
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  );

  const lineChartData = generateLineChartSampleData(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    3,
    ['收入', '支出', '利润']
  );

  const barChartData = {
    xData: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA'],
    series: [
      {
        name: '市值',
        data: [2800, 2500, 1800, 1600, 2200, 800]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-[Delight,sans-serif]">图表组件示例</h2>

      {/* 热力图 */}
      <HeatmapWidget
        title="Trading Activity Heatmap"
        timestamp="Live"
        data={heatmapData}
        height={400}
      />

      {/* 折线图 */}
      <LineChartWidget
        title="Revenue Trends"
        timestamp="2h ago"
        data={lineChartData}
        height={400}
      />

      {/* 柱状图 */}
      <BarChartWidget
        title="Market Cap Comparison"
        timestamp="1d ago"
        data={barChartData}
        height={400}
      />
    </div>
  );
}

/**
 * 数据展示组件示例
 */
export function DataDisplayExample() {
  const tableData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: formatCurrency(175.50), change: '+2.5%', volume: '52.3M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: formatCurrency(380.20), change: '+1.8%', volume: '28.1M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: formatCurrency(140.75), change: '-0.3%', volume: '31.5M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: formatCurrency(175.00), change: '+3.2%', volume: '45.2M' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: formatCurrency(495.30), change: '+5.1%', volume: '68.9M' }
  ];

  const tableColumns = [
    { key: 'symbol', header: 'Symbol', width: '80px' },
    { key: 'name', header: 'Name', width: '200px' },
    { key: 'price', header: 'Price', width: '100px', align: 'right' as const },
    { key: 'change', header: 'Change', width: '100px', align: 'right' as const },
    { key: 'volume', header: 'Volume', width: '100px', align: 'right' as const }
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="font-[Delight,sans-serif]">数据展示组件示例</h2>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="总收入"
          value={formatCurrency(1250000)}
          change={{ value: 12.5, trend: 'up' }}
        />
        <StatCard
          label="活跃用户"
          value="8,542"
          change={{ value: 8.2, trend: 'up' }}
        />
        <StatCard
          label="转化率"
          value={formatPercentage(0.0325)}
          change={{ value: 2.1, trend: 'down' }}
        />
        <StatCard
          label="平均订单"
          value={formatCurrency(145.50)}
          change={{ value: 0, trend: 'neutral' }}
        />
      </div>

      {/* 表格 */}
      <Card padding="none">
        <Table columns={tableColumns} data={tableData} />
      </Card>
    </div>
  );
}

/**
 * Dashboard示例 - 综合展示
 */
export function DashboardExample() {
  const heatmapData = generateHeatmapSampleData(
    ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  );

  const performanceData = generateLineChartSampleData(
    ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    2,
    ['Portfolio Value', 'Benchmark']
  );

  return (
    <div className="flex flex-col gap-6 p-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="font-[Delight,sans-serif]">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="primary" size="sm">New Strategy</Button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Portfolio Value"
          value={formatCurrency(2580000)}
          change={{ value: 15.3, trend: 'up' }}
        />
        <StatCard
          label="Today's P&L"
          value={formatCurrency(35420)}
          change={{ value: 2.8, trend: 'up' }}
        />
        <StatCard
          label="Win Rate"
          value={formatPercentage(0.672)}
          change={{ value: 1.2, trend: 'up' }}
        />
        <StatCard
          label="Sharpe Ratio"
          value="2.34"
          change={{ value: 0.5, trend: 'down' }}
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeatmapWidget
          title="Trading Activity"
          timestamp="Live"
          data={heatmapData}
          height={370}
        />
        <LineChartWidget
          title="Performance Comparison"
          timestamp="1h ago"
          data={performanceData}
          height={370}
        />
      </div>

      {/* 持仓表格 */}
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[Delight,sans-serif]">Current Positions</h3>
          <Badge variant="primary">5 positions</Badge>
        </div>
        <Table
          columns={[
            { key: 'symbol', header: 'Symbol', width: '100px' },
            { key: 'quantity', header: 'Quantity', width: '100px', align: 'right' },
            { key: 'avgPrice', header: 'Avg Price', width: '120px', align: 'right' },
            { key: 'currentPrice', header: 'Current', width: '120px', align: 'right' },
            { key: 'pnl', header: 'P&L', width: '120px', align: 'right' },
            { key: 'pnlPercent', header: 'P&L %', width: '100px', align: 'right' }
          ]}
          data={[
            { 
              symbol: 'AAPL', 
              quantity: '100', 
              avgPrice: formatCurrency(165.50), 
              currentPrice: formatCurrency(175.50), 
              pnl: formatCurrency(1000), 
              pnlPercent: '+6.04%' 
            },
            { 
              symbol: 'MSFT', 
              quantity: '50', 
              avgPrice: formatCurrency(370.00), 
              currentPrice: formatCurrency(380.20), 
              pnl: formatCurrency(510), 
              pnlPercent: '+2.76%' 
            },
            { 
              symbol: 'GOOGL', 
              quantity: '75', 
              avgPrice: formatCurrency(142.00), 
              currentPrice: formatCurrency(140.75), 
              pnl: formatCurrency(-93.75), 
              pnlPercent: '-0.88%' 
            },
            { 
              symbol: 'NVDA', 
              quantity: '30', 
              avgPrice: formatCurrency(450.00), 
              currentPrice: formatCurrency(495.30), 
              pnl: formatCurrency(1359), 
              pnlPercent: '+10.07%' 
            },
            { 
              symbol: 'TSLA', 
              quantity: '40', 
              avgPrice: formatCurrency(240.00), 
              currentPrice: formatCurrency(235.50), 
              pnl: formatCurrency(-180), 
              pnlPercent: '-1.88%' 
            }
          ]}
        />
      </Card>
    </div>
  );
}

/**
 * 完整示例页面
 */
export default function AlvaUIKitShowcase() {
  const [activeTab, setActiveTab] = React.useState<'basic' | 'charts' | 'data' | 'dashboard'>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="font-[Delight,sans-serif]">Alva UI Kit Showcase</h1>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'dashboard' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'basic' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('basic')}
              >
                Basic
              </Button>
              <Button
                variant={activeTab === 'charts' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('charts')}
              >
                Charts
              </Button>
              <Button
                variant={activeTab === 'data' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('data')}
              >
                Data Display
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto">
        {activeTab === 'basic' && <BasicComponentsExample />}
        {activeTab === 'charts' && <ChartComponentsExample />}
        {activeTab === 'data' && <DataDisplayExample />}
        {activeTab === 'dashboard' && <DashboardExample />}
      </div>
    </div>
  );
}
