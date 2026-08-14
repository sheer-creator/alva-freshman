# Alva Freshman

Alva Freshman 是一个纯前端产品 Demo，用来快速验证 Alva 的页面、交互和视觉方案。项目包含两类互相独立的入口：

- `src/`：React + TypeScript SPA，使用手写 hash 路由；
- `public/demo/`：可直接打开和部署的静态 HTML Demo。

它不是生产前端，也不负责维护 Alva 的完整产品定义。当前产品规则统一以 MonoMeta 的 [Product Spec 索引](https://github.com/alva-ai/mono-meta/blob/main/docs/product/index.zh-CN.md) 为准；在 MonoMeta checkout 中对应 `../../../docs/product/index.zh-CN.md`。

## 开始开发

需要 Node.js 20。

```bash
npm ci
npm run dev
```

默认地址：<http://localhost:5173>。静态 Demo 索引位于 <http://localhost:5173/demo/>。

## 验证

```bash
npm run typecheck
npm run build
```

`dev` 和 `build` 执行前会运行 `npm run demo:index`，重新生成：

- `public/demo/index.html`
- `public/demo/_switcher.js`

新增 Demo、修改标题或调整 Demo 状态后，应提交这些生成结果。

## 目录导航

```text
src/app/App.tsx             SPA 路由入口
src/app/components/        Shell、Agent、Chat 和共享组件
src/pages/                 SPA 页面与 Playbook iframe 页面
src/data/                  Mock 数据
src/styles/                全局与组件样式
public/demo/               独立静态 Demo
scripts/generate-demo-index.mjs
                            Demo 索引生成器
```

协作约定见 [`AGENTS.md`](./AGENTS.md)，MonoMeta submodule 开发流程见 [`LOCAL-SETUP.md`](./LOCAL-SETUP.md)。
