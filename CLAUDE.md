# Alva Junior — 项目地图

> Figma Make 生成的 React 金融数据看板 SPA，支持拖拽布局、ECharts 可视化、Widget 模块化组合。

---

## Tech Stack

| 层级 | 技术 |
|:-----|:-----|
| 框架 | React 18.3 + TypeScript (strict) |
| 构建 | Vite 6.3 + @tailwindcss/vite |
| 样式 | Tailwind CSS 4 (主) / 内联 style (动态) |
| UI 组件 | shadcn/ui — button, dropdown-menu |
| 图表 | ECharts (echarts-for-react) |
| 布局 | react-grid-layout (拖拽网格) |
| 动画 | motion (Framer Motion) |
| 部署 | GitHub Pages (Actions 自动构建) |

---

## 目录结构

```
src/
├── main.tsx                          # 入口：挂载 <App /> 到 #root
├── app/
│   ├── App.tsx                       # 路由中枢：React.lazy + Suspense 按需加载
│   └── components/
│       ├── SearchModal.tsx           # 搜索弹窗
│       ├── Search.tsx                # 搜索内容组件
│       ├── UserInfo.tsx              # 用户信息悬浮卡片
│       ├── alva-ui-kit.tsx           # WidgetContainer 等 UI 基础组件
│       ├── figma/
│       │   └── ImageWithFallback.tsx  # Figma 图片加载容错
│       ├── shell/
│       │   ├── AppShell.tsx          # 统一页面外壳：Sidebar + DisplayZone
│       │   ├── Sidebar.tsx           # 共享侧边栏（数据驱动，1 份代替原 6 份）
│       │   ├── Topbar.tsx            # Dashboard 顶栏（参数化 title）
│       │   └── BottomToolbar.tsx     # Dashboard 底部浮动工具栏
│       └── ui/
│           ├── button.tsx
│           ├── dropdown-menu.tsx
│           └── utils.ts              # cn() 工具函数
├── pages/
│   ├── Home.tsx                      # 首页（Chat + Featured Playbooks）
│   ├── Explore.tsx                   # 发现页（TabBar + Playbook 卡片）
│   ├── Library.tsx                   # 组件库页（DataFeed 卡片列表）
│   ├── Dashboard.tsx                 # 主看板（Figma 静态 + NVDA 实时图表）
│   ├── DashboardWorkspace.tsx        # 工作区看板（4 Widget 2×2 布局）
│   └── DashboardTest.tsx             # 可拖拽网格布局测试看板
├── widgets/
│   ├── index.ts                      # Widget 注册表（WIDGET_REGISTRY）
│   ├── AIStorageRelativePerfWidget.tsx
│   ├── AIStorageKeyWordTrendsWidget.tsx
│   ├── AIStorageEarningsWidget.tsx
│   ├── DRAMPriceTrendWidget.tsx
│   ├── NVDAGoogleTrendWidget.tsx
│   ├── NVDAPriceVsSPYWidget.tsx
│   ├── NVDATechAnalysisWidget.tsx
│   ├── MarkdownWidget.tsx
│   ├── EarningsDetailWidget.tsx
│   ├── FigmaWatchlistWidget.tsx      # 从 Dashboard.tsx 提取的 Figma 静态内容
│   ├── FigmaEarningsTableWidget.tsx
│   └── FigmaPostsWidget.tsx
├── data/
│   ├── dramPriceData.ts              # DRAM 价格数据
│   ├── svg-nheoeek59y.ts             # Dashboard 系列 SVG 路径
│   ├── svg-qs8zi2fru8.ts             # Home SVG 路径
│   ├── svg-k6m80u38oo.ts             # Explore/Library SVG 路径
│   ├── svg-guyqw4in5w.ts             # UserInfo SVG 路径
│   └── svg-ovvfrhab5t.ts             # Search SVG 路径
├── lib/
│   └── chart-theme.ts                # 共享 ECharts 配置（颜色/tooltip/轴/网格）
├── assets/                           # Figma 导出 PNG 图片
└── styles/
    ├── index.css                     # 入口：导入 tailwind + theme
    ├── tailwind.css
    ├── theme.css
    └── dashboard-grid.css            # 网格布局专用样式
```

---

## 架构

### 页面路由

`App.tsx` 用 `useState<Page>` + `React.lazy` 管理页面切换，按需加载：

```
App.tsx (page: "home" | "explore" | "library" | "dashboard" | "workspace" | "test")
 ├── Home               → pages/Home.tsx
 ├── Explore            → pages/Explore.tsx
 ├── Library            → pages/Library.tsx
 ├── Dashboard          → pages/Dashboard.tsx
 ├── DashboardWorkspace → pages/DashboardWorkspace.tsx
 └── DashboardTest      → pages/DashboardTest.tsx
```

页面间通信：`onNavigate: (page: Page) => void` 回调 + `onOpenSearch` 触发搜索弹窗。

### Shell 架构

所有页面共享统一外壳 `AppShell`：

```
AppShell
 ├── Sidebar（固定左侧 228px，数据驱动导航）
 └── DisplayZone（右侧内容区，bg-white，圆角）
      └── {children}  ← 页面特有内容
```

Dashboard 系列额外包含：`Topbar`（顶部标题栏）+ `BottomToolbar`（浮动/粘性底部栏）。

### Widget 系统

Widget 通过 `WIDGET_REGISTRY`（`src/widgets/index.ts`）注册：

| Widget ID | 组件 | 数据域 |
|:-----------|:-----|:-------|
| `relative-perf` | AIStorageRelativePerfWidget | AI 存储相对表现 |
| `keyword-trends` | AIStorageKeyWordTrendsWidget | 关键词趋势 |
| `earnings-feed` | AIStorageEarningsWidget | AI 存储营收 |
| `earnings-detail` | EarningsDetailWidget | 财报明细 |
| `nvda-google-trend` | NVDAGoogleTrendWidget | NVDA 谷歌趋势 |
| `nvda-price-vs-spy` | NVDAPriceVsSPYWidget | NVDA vs SPY |
| `nvda-tech-analysis` | NVDATechAnalysisWidget | 技术分析 |
| `markdown` | MarkdownWidget | Markdown 渲染 |
| `dram-price-trend` | DRAMPriceTrendWidget | DRAM 价格走势 |

DashboardTest 通过注册表动态渲染 Widget，支持拖拽布局和 localStorage 持久化。

Figma 静态 Widget（`Figma*Widget.tsx`）从原 8700 行 Dashboard.tsx 提取，保留原始样式，日后逐步替换为交互式版本。

### 共享图表主题

`src/lib/chart-theme.ts` 提供统一的 ECharts 配置：
- `CHART_COLORS` / `CHART_COLOR_PALETTE` — 调色板
- `tooltipConfig()` / `tooltipFormatter()` — tooltip 样式
- `timeXAxisConfig()` / `valueYAxisConfig()` — 轴配置
- `lineSeriesConfig()` — 折线系列默认配置
- `GRID_DEFAULT` / `ZERO_MARK_LINE` — 网格和标记线

### Figma 资源机制

- **图片**: `import img from "figma:asset/<hash>.png"` → Vite 插件解析为 SVG 占位符
- **SVG**: 存储为 TS 常量文件 (`svg-*.ts`)，运行时渲染为 `<svg>` 元素
- **容错**: `ImageWithFallback` 处理图片加载失败

---

## 开发命令

```bash
npm run dev    # 启动 Vite 开发服务器
npm run build  # 构建到 dist/
```

路径别名：`@` → `./src`
Base path：`/alva-freshman/`

---

## 部署

Push 到 `main` → GitHub Actions → `npm ci && npm run build` → 发布 `dist/` 到 `gh-pages` 分支。
Node 版本：20。CI 配置：`.github/workflows/deploy.yml`。

---

## 代码约定

### 命名

- 组件：PascalCase (`AIStorageEarningsWidget`)
- Props：camelCase (`onNavigate`, `onOpenSearch`)
- Widget ID：kebab-case (`nvda-google-trend`)
- SVG 数据文件：`svg-<hash>.ts`

### 导入顺序

```typescript
// 1. React
import { useState, useEffect } from "react";
// 2. 项目内组件 (@ 别名)
import { AppShell } from "@/app/components/shell/AppShell";
import { WIDGET_REGISTRY } from "@/widgets";
// 3. 类型
import type { Page } from "@/app/App";
// 4. 数据
import svgPaths from "@/data/svg-nheoeek59y";
// 5. Figma 资源
import imgImage from "figma:asset/<hash>.png";
// 6. 第三方库
import ReactECharts from "echarts-for-react";
```

### 组件模式

- 全部函数组件 + Hooks
- 子组件定义在同文件内部（`function Logo() { ... }`）
- 页面通过 `AppShell` 包裹，传入 `activePage` + `onNavigate`

### 添加新 Widget

1. 在 `src/widgets/` 创建 `MyWidget.tsx`，导出 `{ MyWidget }`
2. 在 `src/widgets/index.ts` 的 `WIDGET_REGISTRY` 中注册
3. 在目标页面中引用组件或通过注册表 ID 引用

### 设计规范

**生成新前端页面时，必须先调用 `alva-design` skill**，确保设计风格与 Alva 设计系统一致。这包括新建页面、新建 Widget、新建弹窗等任何用户可见的 UI 组件。

---

## 关键文件索引

| 角色 | 文件 |
|:-----|:-----|
| HTML 入口 | `index.html` |
| TS 入口 | `src/main.tsx` |
| 路由中枢 | `src/app/App.tsx` |
| 统一外壳 | `src/app/components/shell/AppShell.tsx` |
| 共享侧边栏 | `src/app/components/shell/Sidebar.tsx` |
| Widget 注册表 | `src/widgets/index.ts` |
| 图表主题 | `src/lib/chart-theme.ts` |
| 构建配置 | `vite.config.ts` |
| CI/CD | `.github/workflows/deploy.yml` |
| TS 配置 | `tsconfig.json` |

---

## 已知技术债

| 问题 | 说明 |
|:-----|:-----|
| 无自动化测试 | 无 Jest/Vitest，DashboardTest 是手动演示页 |
| Figma 占位符 | `figma:asset/*` 运行时为灰色 SVG 占位符，非真实图片 |
| Figma 静态 Widget | FigmaWatchlistWidget/FigmaEarningsTableWidget/FigmaPostsWidget 仍为 Figma 生成的静态代码 |
