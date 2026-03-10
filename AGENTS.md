# Alva Junior — 项目地图

> Figma Make 生成并持续手工演化的 React 金融看板 SPA。核心特征：手写 hash 路由、Figma 静态稿混合真实图表、局部 widget 注册表、Tailwind 4 + 大量内联样式共存。

---

## Tech Stack

| 层级 | 技术 |
|:-----|:-----|
| 框架 | React 18.3 + TypeScript (`strict`) |
| 构建 | Vite 6.3 + `@vitejs/plugin-react` |
| 样式 | Tailwind CSS 4 + `@tailwindcss/vite` + 内联 style |
| UI 组件 | shadcn/ui（当前主要用 `button`、`dropdown-menu`） |
| 图表 | ECharts + `echarts-for-react` |
| 布局 | `react-grid-layout`（仅 `DashboardTest` 用于拖拽布局） |
| 文本渲染 | `react-markdown` + 自定义 markdown 组件 |
| 部署 | GitHub Actions + `peaceiris/actions-gh-pages` |

---

## 目录结构

```text
src/
├── main.tsx                              # 挂载 <App />，只引入 styles/index.css
├── app/
│   ├── App.tsx                           # 路由中枢：React.lazy + hash 路由同步
│   └── components/
│       ├── Search.tsx
│       ├── SearchModal.tsx               # 搜索弹窗
│       ├── SkillModal.tsx                # 技能页/弹窗复用内容，含 localStorage 状态
│       ├── UserInfo.tsx
│       ├── alva-ui-kit.tsx
│       ├── figma/
│       │   └── ImageWithFallback.tsx
│       ├── shell/
│       │   ├── AppShell.tsx              # Sidebar + 内容区 + 内置 SearchModal
│       │   ├── Sidebar.tsx               # 主导航 + Playbooks 导航
│       │   ├── Topbar.tsx
│       │   └── BottomToolbar.tsx
│       └── ui/
│           ├── button.tsx
│           ├── dropdown-menu.tsx
│           └── utils.ts
├── pages/
│   ├── Home.tsx
│   ├── Explore.tsx
│   ├── Library.tsx
│   ├── Dashboard.tsx
│   ├── DashboardWorkspace.tsx
│   ├── DashboardTest.tsx
│   ├── NVDADashboard.tsx
│   ├── DashboardPopularStock.tsx
│   ├── DashboardTSLAOverview.tsx
│   ├── DashboardTSLATracking.tsx
│   └── Skills.tsx
├── widgets/
│   ├── index.ts                          # WIDGET_REGISTRY
│   ├── AIStorageRelativePerfWidget.tsx
│   ├── AIStorageKeyWordTrendsWidget.tsx
│   ├── AIStorageEarningsWidget.tsx
│   ├── EarningsDetailWidget.tsx
│   ├── DRAMPriceTrendWidget.tsx
│   ├── NVDAGoogleTrendWidget.tsx
│   ├── NVDAPriceVsSPYWidget.tsx
│   ├── NVDATechAnalysisWidget.tsx
│   ├── NVDAStockPriceWidget.tsx
│   ├── NVDAKeyMetricsWidget.tsx
│   ├── NVDASupplyChainWidget.tsx
│   ├── NVDARevenueSegmentWidget.tsx
│   ├── NVDAPeerValuationWidget.tsx
│   ├── NVDAInvestmentThesisWidget.tsx
│   ├── NVDAEarningsWidget.tsx
│   ├── NVDAEarningsDetailWidget.tsx
│   ├── MarkdownWidget.tsx
│   └── FigmaWatchlistWidget.tsx
├── lib/
│   ├── chart-theme.ts
│   ├── markdown-components.tsx
│   └── ticker-config.ts
├── data/
│   ├── dramPriceData.ts
│   └── svg-*.ts                          # 页面/壳层 SVG 路径常量
├── assets/                               # 真实 png 资源
└── styles/
    ├── index.css                         # 只转引 tailwind.css + theme.css
    ├── tailwind.css                      # Tailwind 4 CSS-first 入口
    ├── theme.css                         # 设计 token + @theme inline + 基础排版
    └── dashboard-grid.css                # 仅 DashboardTest 引入
```

---

## 架构

### 页面路由

`src/app/App.tsx` 不是 `react-router`，而是手写 hash 路由：

```text
Page =
  "home" | "explore" | "library" | "dashboard" | "workspace" |
  "test" | "nvda" | "popular-stock" | "tsla-overview" |
  "tsla-tracking" | "skills"
```

- 初始页来自 `window.location.hash`
- 通过 `VALID_PAGES` 做白名单校验
- 监听 `hashchange`，支持浏览器前进/后退
- 页面本体仍通过 `React.lazy` + `Suspense` 按需加载

新增页面时通常要同时修改：
1. `Page` 联合类型
2. `VALID_PAGES`
3. lazy import
4. 条件渲染分支
5. `Sidebar` 导航项

### Shell 架构

大部分页面共享 `AppShell`：

```text
AppShell
├── Sidebar（固定左侧 228px）
├── SearchModal（壳内局部实例）
└── 右侧内容区（白底、圆角、独立滚动）
```

- `Sidebar` 负责主导航和 Playbooks 导航
- `AppShell` 还透传 `onUserMouseEnter/onUserMouseLeave` 给底部用户区域
- `Topbar` 常见于 dashboard 页面
- `BottomToolbar` 不是所有 dashboard 通用，目前不要假设全站统一挂载

### 搜索与技能弹窗

- `App.tsx` 顶层还挂了一份全局 `SearchModal`
- `AppShell` 内部也维护一份 `SearchModal`
- 当前搜索入口有双实例现状，改搜索逻辑时要先确认改的是哪一层
- `SkillModal.tsx` 同时提供 modal 版本和 `SkillModalContent` 页面内版本
- 技能启用状态落在 `localStorage`：`alva-skills-enabled`

### Widget 系统

`src/widgets/index.ts` 维护 `WIDGET_REGISTRY`，当前已注册 15 个 widget：

- `relative-perf`
- `keyword-trends`
- `earnings-feed`
- `earnings-detail`
- `nvda-google-trend`
- `nvda-price-vs-spy`
- `nvda-tech-analysis`
- `markdown`
- `dram-price-trend`
- `nvda-stock-price`
- `nvda-key-metrics`
- `nvda-supply-chain`
- `nvda-revenue-segment`
- `nvda-peer-valuation`
- `nvda-investment-thesis`

重要：注册表驱动目前主要服务 `DashboardTest`，不是全项目统一 widget 渲染总线。很多页面仍然直接 import widget 组件拼页面。

`DashboardWorkspace.tsx` 也已不是“4 个 widget 2x2 布局”，而是固定 4 行混合布局：
1. `NVDAEarningsWidget` + `NVDAEarningsDetailWidget`
2. `FigmaWatchlistWidget`
3. `MarkdownWidget` + `NVDATechAnalysisWidget`
4. `NVDAGoogleTrendWidget` + `NVDAPriceVsSPYWidget`

### 数据与图表层

- `src/lib/chart-theme.ts` 是共享 ECharts 主题中心，封装颜色、tooltip、轴、grid、零线、字体等
- `src/data` 很薄，主要是 `svg-*.ts` 和 `dramPriceData.ts`
- 大多数页面和 widget 的展示数据仍内嵌在组件文件里
- 当前未形成统一的数据访问层，也未见 `fetch` / `axios` / `react-query` / `swr`

### Figma 资源机制

- `figma:asset/*` 不是运行时请求资源，而是被 `vite.config.ts` 里的 `figmaAssetPlugin()` 替换成同一个 base64 SVG placeholder
- `svg-*.ts` 是大量页面图标/装饰路径的真实来源，不只服务 Dashboard
- 仓库同时存在 `figma:asset/*` 协议导入和 `src/assets/*.png` 实体资源
- `ImageWithFallback` 负责图片加载失败兜底，但 Figma placeholder 的核心行为发生在构建期，不是运行时 fallback

### 样式层

- `src/main.tsx` 只引入 `src/styles/index.css`
- `index.css` 只转引 `tailwind.css` 和 `theme.css`
- `tailwind.css` 采用 Tailwind 4 CSS-first 写法：
  - `@import 'tailwindcss' source(none);`
  - `@source '../**/*.{js,ts,jsx,tsx}'`
- 当前没有 `tailwind.config.*`
- `theme.css` 是设计 token 源，包含浅/深色变量、`@theme inline` 映射、全局字体和基础排版
- `dashboard-grid.css` 仅 `DashboardTest.tsx` 按需引入，不是全局布局样式

---

## 开发命令

```bash
npm run dev
npm run build
```

说明：
- `dev` 实际执行 `vite`
- `build` 只执行 `vite build`
- 当前没有独立 `lint`、`typecheck`、`test`、`preview` 脚本

---

## 构建与部署

- 路径别名：`@ -> ./src`
- `tsconfig.json` 为单文件配置，没有 `tsconfig.app.json` / `tsconfig.node.json`
- TypeScript 关键选项：
  - `strict: true`
  - `moduleResolution: "bundler"`
  - `allowImportingTsExtensions: true`
  - `noEmit: true`
- `postcss.config.mjs` 当前是空配置占位，只有新增额外 PostCSS 插件时才需要改
- GitHub Actions 工作流：`.github/workflows/deploy.yml`
- 部署链路：push `main` -> `npm ci` -> `npm run build` -> `peaceiris/actions-gh-pages@v4` 发布 `./dist`
- Node 版本：20

注意：
- 当前 `vite.config.ts` 没有配置 `base`
- 如果这个仓库继续以 GitHub Pages project site 方式部署，静态资源路径可能出问题
- 现有 `AGENTS.md` 里旧的 `Base path: /alva-freshman/` 说法不成立，除非后续显式补回 `vite.base`

---

## 代码约定

### 命名

- 组件：PascalCase
- props / 变量：camelCase
- Widget ID：kebab-case
- SVG 数据文件：`svg-<hash>.ts`

### 导入顺序

```ts
// 1. React / hooks
// 2. 项目内模块（@ 别名）
// 3. 类型
// 4. 数据 / 配置
// 5. figma:asset 资源
// 6. 第三方库
```

### 组件模式

- 函数组件 + Hooks
- 同文件内嵌子组件很常见
- 大量 Figma 导出代码保留了高密度内联样式，这是当前仓库常态，不要贸然“统一重构”
- 页面组件通常接收 `onNavigate`

### 添加新页面

1. 先调用 `alva-design` skill
2. 新建 `src/pages/*.tsx`
3. 在 `src/app/App.tsx` 中补齐 `Page`、`VALID_PAGES`、lazy import、渲染分支
4. 在 `src/app/components/shell/Sidebar.tsx` 加入口
5. 如果页面有共用外壳，优先复用 `AppShell`

### 添加新 Widget

1. 先调用 `alva-design` skill
2. 在 `src/widgets/` 新建组件
3. 若需要出现在 `DashboardTest` 可拖拽面板中，再注册到 `WIDGET_REGISTRY`
4. 若只是页面专用组件，可以直接被页面 import，不必强行入注册表

---

## 关键文件索引

| 角色 | 文件 |
|:-----|:-----|
| HTML 入口 | `index.html` |
| 挂载入口 | `src/main.tsx` |
| 路由中枢 | `src/app/App.tsx` |
| 页面外壳 | `src/app/components/shell/AppShell.tsx` |
| 共享侧边栏 | `src/app/components/shell/Sidebar.tsx` |
| 搜索弹窗 | `src/app/components/SearchModal.tsx` |
| 技能弹窗/页面内容 | `src/app/components/SkillModal.tsx` |
| Widget 注册表 | `src/widgets/index.ts` |
| 图表主题 | `src/lib/chart-theme.ts` |
| Markdown 渲染 | `src/lib/markdown-components.tsx` |
| 样式入口 | `src/styles/index.css` |
| 主题 token | `src/styles/theme.css` |
| 构建配置 | `vite.config.ts` |
| TS 配置 | `tsconfig.json` |
| 部署工作流 | `.github/workflows/deploy.yml` |

---

## 非显而易见的坑

- `DashboardTest` 是手动演示/布局沙盒，不是自动化测试
- 搜索弹窗现在有全局和壳内两份实例，改交互前先定位
- `WIDGET_REGISTRY` != 全部 widget 文件；不要据此推断页面结构
- `react` / `react-dom` 当前在 `peerDependencies`，不是普通 `dependencies`
- Vite 里把 `build.chunkSizeWarningLimit` 提到 `1000`，说明大文件告警被放宽过

---

## 已知技术债

| 问题 | 说明 |
|:-----|:-----|
| 无自动化测试 | 没有 Jest/Vitest/Playwright，CI 只做构建发布 |
| hash 路由手写维护 | 新增页面需要手动同步多处，容易漏改 |
| Figma placeholder 资源 | `figma:asset/*` 当前统一变成占位 SVG，不是真图 |
| 静态稿与真实组件混搭 | 页面中既有 Figma 生成块，也有真实图表 widget，抽象层次不一致 |
| 搜索弹窗双实例 | `App.tsx` 和 `AppShell.tsx` 各维护一份 `SearchModal` |
| 数据层分散 | 大量 mock / 展示数据散落在 page/widget 文件内 |
