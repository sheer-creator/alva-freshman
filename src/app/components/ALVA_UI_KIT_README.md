# Alva UI Kit 使用文档

一套基于 Alva 金融交易平台设计系统的可复用 React 组件库。

## 特性

- ✅ **完全类型安全** - 使用 TypeScript 编写
- 🎨 **设计系统驱动** - 所有组件使用 CSS 变量，支持主题定制
- 🌓 **支持深色模式** - 自动适配浅色/深色主题
- 📊 **丰富的图表组件** - 基于 ECharts 的专业图表组件
- 🔧 **易于定制** - 通过修改 CSS 变量即可更新整体样式
- 📱 **响应式设计** - 所有组件都支持响应式布局

## 安装依赖

组件库依赖以下包：

```bash
npm install echarts echarts-for-react
# 或
pnpm add echarts echarts-for-react
```

## 快速开始

### 1. 导入组件

```tsx
import { 
  Button, 
  Card, 
  HeatmapWidget,
  StatCard 
} from './components/alva-ui-kit';
```

### 2. 使用组件

```tsx
function MyApp() {
  return (
    <div>
      <Button variant="primary">点击我</Button>
      <Card>
        <h3>这是一个卡片</h3>
        <p>卡片内容...</p>
      </Card>
    </div>
  );
}
```

## 组件文档

### 基础组件

#### Button - 按钮

```tsx
<Button variant="primary" size="md">
  Primary Button
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
- `size`: 'sm' | 'md' | 'lg'
- `className`: 额外的 CSS 类名
- 其他所有原生 button 属性

#### Card - 卡片

```tsx
<Card padding="md">
  <h3>标题</h3>
  <p>内容</p>
</Card>
```

**Props:**
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `className`: 额外的 CSS 类名

#### Input - 输入框

```tsx
<Input 
  label="用户名"
  placeholder="请输入用户名"
  error="错误提示信息"
/>
```

**Props:**
- `label`: 输入框标签
- `error`: 错误提示文本
- `className`: 额外的 CSS 类名
- 其他所有原生 input 属性

#### Badge - 徽章

```tsx
<Badge variant="primary">标签</Badge>
```

**Props:**
- `variant`: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline'
- `className`: 额外的 CSS 类名

### Widget 组件

#### WidgetTitle - Widget 标题

```tsx
<WidgetTitle 
  title="Trading Activity"
  timestamp="Live"
  href="/details"
/>
```

**Props:**
- `title`: 标题文本
- `timestamp`: 时间戳文本（可选）
- `href`: 链接地址（可选）

#### WidgetContainer - Widget 容器

```tsx
<WidgetContainer 
  title="My Widget"
  timestamp="2h ago"
  height={370}
>
  {/* Widget 内容 */}
</WidgetContainer>
```

**Props:**
- `title`: Widget 标题
- `timestamp`: 时间戳（可选）
- `href`: 标题链接（可选）
- `height`: 高度（像素或字符串）
- `className`: 额外的 CSS 类名

### 图表组件

#### HeatmapWidget - 热力图

```tsx
const heatmapData = {
  xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  yLabels: ['Morning', 'Afternoon', 'Evening'],
  data: [
    [0, 0, 75], // [x索引, y索引, 值]
    [1, 0, 80],
    // ... 更多数据
  ]
};

<HeatmapWidget
  title="Activity Heatmap"
  timestamp="Live"
  data={heatmapData}
  height={400}
/>
```

**Props:**
- `title`: 图表标题
- `timestamp`: 时间戳（可选）
- `href`: 标题链接（可选）
- `data`: 热力图数据
- `colorRange`: 颜色范围数组（可选）
- `valueRange`: 数值范围 [最小值, 最大值]（可选）
- `height`: 高度（可选，默认 370）

#### LineChartWidget - 折线图

```tsx
const lineData = {
  xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  series: [
    { name: '收入', data: [120, 132, 101, 134, 190] },
    { name: '支出', data: [80, 90, 85, 95, 110] }
  ]
};

<LineChartWidget
  title="Revenue Trends"
  timestamp="1h ago"
  data={lineData}
  showLegend={true}
/>
```

**Props:**
- `title`: 图表标题
- `timestamp`: 时间戳（可选）
- `href`: 标题链接（可选）
- `data`: 折线图数据
- `height`: 高度（可选，默认 370）
- `showLegend`: 是否显示图例（可选，默认 true）

#### BarChartWidget - 柱状图

```tsx
const barData = {
  xData: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'],
  series: [
    { name: '市值', data: [2800, 2500, 1800, 1600] }
  ]
};

<BarChartWidget
  title="Market Cap"
  data={barData}
  horizontal={false}
/>
```

**Props:**
- `title`: 图表标题
- `timestamp`: 时间戳（可选）
- `href`: 标题链接（可选）
- `data`: 柱状图数据
- `height`: 高度（可选，默认 370）
- `showLegend`: 是否显示图例（可选，默认 true）
- `horizontal`: 是否水平显示（可选，默认 false）

### 数据展示组件

#### StatCard - 统计卡片

```tsx
<StatCard
  label="总收入"
  value="$1,250,000"
  change={{ value: 12.5, trend: 'up' }}
  icon={<Icon />}
/>
```

**Props:**
- `label`: 指标标签
- `value`: 指标值（字符串或数字）
- `change`: 变化信息（可选）
  - `value`: 变化百分比
  - `trend`: 'up' | 'down' | 'neutral'
- `icon`: 图标元素（可选）
- `className`: 额外的 CSS 类名

#### Table - 表格

```tsx
const columns = [
  { key: 'name', header: '姓名', width: '200px' },
  { key: 'email', header: '邮箱', align: 'left' },
  { key: 'status', header: '状态', align: 'center' }
];

const data = [
  { name: 'Alice', email: 'alice@example.com', status: 'Active' },
  { name: 'Bob', email: 'bob@example.com', status: 'Inactive' }
];

<Table columns={columns} data={data} />
```

**Props:**
- `columns`: 列定义数组
  - `key`: 数据字段名
  - `header`: 列标题
  - `width`: 列宽度（可选）
  - `align`: 对齐方式（可选）
- `data`: 数据数组
- `className`: 额外的 CSS 类名

## 工具函数

### generateHeatmapSampleData

生成热力图示例数据

```tsx
import { generateHeatmapSampleData } from './components/alva-ui-kit';

const data = generateHeatmapSampleData(
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  ['Morning', 'Afternoon', 'Evening'],
  0,  // 最小值
  100 // 最大值
);
```

### generateLineChartSampleData

生成折线图示例数据

```tsx
import { generateLineChartSampleData } from './components/alva-ui-kit';

const data = generateLineChartSampleData(
  ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  2,  // 系列数量
  ['收入', '支出']  // 系列名称（可选）
);
```

### 格式化函数

```tsx
import { 
  formatNumber, 
  formatPercentage, 
  formatCurrency 
} from './components/alva-ui-kit';

formatNumber(1234.567, 2);        // "1234.57"
formatPercentage(0.1234, 2);      // "12.34%"
formatCurrency(1234.56, '$');     // "$1,234.56"
```

## 自定义主题

所有组件都使用 CSS 变量，您可以通过修改 `/src/styles/theme.css` 文件来自定义主题：

```css
:root {
  --primary: rgba(73, 163, 166, 1);
  --background: rgba(246, 246, 246, 1);
  --foreground: rgba(0, 0, 0, 0.9);
  --radius: 6px;
  /* ... 更多变量 */
}

.dark {
  --background: rgba(42, 42, 56, 1);
  --foreground: rgba(255, 255, 255, 0.9);
  /* ... 深色主题变量 */
}
```

### 主要 CSS 变量

**颜色变量：**
- `--primary`: 主色调
- `--background`: 背景色
- `--foreground`: 前景色（文本）
- `--card`: 卡片背景色
- `--border`: 边框颜色
- `--muted`: 次要色
- `--accent`: 强调色
- `--destructive`: 危险操作色

**尺寸变量：**
- `--radius`: 默认圆角
- `--radius-button`: 按钮圆角
- `--radius-card`: 卡片圆角

**字体变量：**
- `--text-2xl`: 28px
- `--text-xl`: 20px
- `--text-lg`: 18px
- `--text-base`: 16px
- `--text-sm`: 14px
- `--text-xs`: 12px

## 完整示例

查看 `alva-ui-kit-examples.tsx` 文件获取完整的使用示例，包括：

1. **BasicComponentsExample** - 基础组件使用示例
2. **ChartComponentsExample** - 图表组件使用示例
3. **DataDisplayExample** - 数据展示组件使用示例
4. **DashboardExample** - 完整的 Dashboard 页面示例

## 最佳实践

### 1. 使用语义化的变体

```tsx
// ✅ 好的做法
<Button variant="primary">提交</Button>
<Button variant="destructive">删除</Button>

// ❌ 避免
<Button className="bg-blue-500">提交</Button>
```

### 2. 利用 CSS 变量而不是硬编码颜色

```tsx
// ✅ 好的做法
<div className="bg-primary text-primary-foreground">内容</div>

// ❌ 避免
<div className="bg-[#49A3A6] text-white">内容</div>
```

### 3. 保持一致的间距

```tsx
// ✅ 使用设计系统定义的间距
<div className="flex flex-col gap-6">
  <Card padding="md">...</Card>
  <Card padding="md">...</Card>
</div>
```

### 4. 复用 Widget 组件

```tsx
// ✅ 使用 WidgetContainer 保持一致的样式
<WidgetContainer title="My Chart" timestamp="Live" height={370}>
  <div className="p-4">
    {/* 自定义内容 */}
  </div>
</WidgetContainer>
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

该组件库为内部使用，遵循 Alva 项目许可证。

## 更新日志

### v1.0.0 (2026-02-09)
- 初始版本发布
- 包含基础组件、Widget 组件和图表组件
- 支持浅色/深色主题
- 完整的 TypeScript 类型支持
