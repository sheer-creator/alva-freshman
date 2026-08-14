# Alva Freshman — Agent Guide

Alva Freshman 是一个纯前端产品 Demo，用来快速验证 Alva 的页面、交互和视觉方案。它不是生产前端，也不是产品业务规则的最终真值。

## 真值边界

- 当前产品定义以 MonoMeta 的 [`docs/product`](../../../docs/product/index.zh-CN.md) 为准；在独立仓库中可访问 [GitHub 上的 Product Spec 索引](https://github.com/alva-ai/mono-meta/blob/main/docs/product/index.zh-CN.md)。
- Freshman 只保存实现 Demo 所需的 mock 数据、交互状态和视觉方案。不要把 Product Spec 全文复制进来。
- 如果 Demo 文案与 MonoMeta Product Spec 冲突，先按 Product Spec 判断，再决定更新 Demo 还是将其标为历史探索。
- `public/demo` 中的页面可能是当前方案、探索稿或历史快照；不要仅凭文件存在就把它描述成已上线能力。

## 项目结构

```text
src/
├── main.tsx                 # React 入口
├── app/App.tsx              # 手写 hash 路由与 lazy page 装载
├── app/components/          # Shell、Agent、Chat、共享交互组件
├── app/state/               # Demo 状态
├── pages/                   # SPA 页面及 Playbook iframe 页面
├── data/                    # Mock 数据
├── lib/                     # 共用逻辑
├── assets/                  # 由 Vite 打包的页面资源
└── styles/                  # Tailwind 入口、主题与组件样式

public/demo/                 # 独立静态 HTML Demo；不进入 SPA 路由
scripts/generate-demo-index.mjs
                             # 生成 Demo Index 和页面切换器
```

关键入口：

- SPA 路由与页面清单：`src/app/App.tsx`
- 共用页面外壳：`src/app/components/shell/AppShell.tsx`
- 侧边栏：`src/app/components/shell/Sidebar.tsx`
- Demo 页面说明：`public/demo/README.md`
- 构建配置：`vite.config.ts`

## 工作约定

- 优先做最小、可验证的修改；不要为了统一风格批量重写 Figma 生成的大组件。
- 新增或删除 SPA 页面时，以 `src/app/App.tsx` 的实际路由为准，并同步必要导航入口。
- `public/demo` 页面应独立运行，只使用浏览器可执行的 HTML、CSS 和 JavaScript。
- 历史 Demo 使用 `<meta name="demo-status" content="archived">`；探索稿使用 `exploration`；未声明时按普通活跃 Demo 展示。
- 历史页面应在首屏说明其快照日期，并链接到当前真值，不要继续维护复制的 Product Spec 正文。
- 修改 Demo 标题或状态后运行 `npm run demo:index`，提交同步生成的 `public/demo/index.html` 与 `public/demo/_switcher.js`。
- Mock、`localStorage`、静态 iframe 和模拟延迟在本项目中是允许的，但相关文案不能暗示它们是生产实现。

## 开发与验证

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

- `predev` / `prebuild` 会重新生成 Demo Index。
- CI 使用 Node 20，依次执行 `npm ci`、typecheck 和 build。
- 当前没有自动化测试套件；涉及交互或视觉的修改需要补充浏览器 smoke check。

## Git 与 MonoMeta

Freshman 在 MonoMeta 中位于 `code/frontend/alva-freshman`，以 Git submodule 固定到具体提交。开发时在 Freshman 子仓库创建分支并提交 PR；子仓库合并后，再由 MonoMeta 的 submodule 同步流程更新 gitlink。

不要在 Freshman 内维护另一套 `local` 分支、每日 merge 或独立 skills clone。MonoMeta 内的共享 skills 位于 `../../public/skills`，完整流程见 [`LOCAL-SETUP.md`](./LOCAL-SETUP.md)。
