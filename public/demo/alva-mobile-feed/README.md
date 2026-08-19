# Alva Mobile — Personal Market Context (Concept Demo)

纯前端概念 demo，对应 `alva_mobile_feed_product_plan.md` v0.7 的移动端产品形态。
无构建步骤、无后端依赖：任何静态服务器指向 `public/` 即可运行，路径 `/demo/alva-mobile-feed/`。

## 概念模型（与产品方案一致）

```
Source → Automation → Feed → Feed Item → Context Card → Action
```

- **Automation 只有一种**：source(s) × 处理逻辑（脚本或 agentic loop），run 时持续产出。
  Goal / channel / watch 不是子类型，只是 source 不同（goal 的 source = 用户 Portfolio）。
- **一切卡片都从 `js/data.js` 的 Feed Item 渲染**，没有手写的一次性卡片 HTML。
- **Context Projection**（`PROJECTIONS`）保存 per-viewer 的 why-you-see-this 与
  watch 影响，不写回共享 item。
- Archetype 是软呈现提示，未知类型回退通用卡。

## 委托层（方案 §10）

- **回访模块两态**（For You 顶部，immersive 首屏同款）：无 goal = Recap 态，
  点进 daily TLDR 文章（内嵌可跳转的 Context Card 引用）；有 goal = Report 态，
  点进 Tinder 式审批 deck（右滑批准 / 左滑驳回 / 中键再想想）。
- **Goal 在对话里长出来**：Chat 回答尾部的升级提议 → textarea（markdown instructions）；
  goal 管理页 = Automation 管理页形态（Instruction 可编辑 + Run history = 决策历史）。
- **决策留痕**：Approve/Reject 写入 `store.decisions`，Memory tab 与 run history 共用。

## 页面

- **For You**：Stream / Immersive 双形态；回访模块；Context Card（正面 =
  头图/标题/摘要/事实/溯源行/操作，卡背 = Sources + Why + Manage 入口）
- **Discover**：统一搜索分组（Markets/Channels/Creators/Sources）、BYOS 入口、
  connected accounts 推荐；私有 feed 不入公共目录
- **Chat**：永续对话（开场消息与 recap 同源）、Tasks（子任务 + Automations 统一列表，
  行尾 next run）、Memory（user.md 可视化：Identity/Interests/Watching/Thesis/Goal/Decisions）、
  可关闭的补课清单
- **You**：Portfolio hero + Manage 行组（Automations 直达 Chat Tasks，同一数据）
- **Onboarding**：4 步——实体多选（全池搜索 + Select all + watch chips 并入）→
  持仓（连券商/手动，可跳过）→ 连接 sources → preview

## 文件

| 文件 | 职责 |
| --- | --- |
| `js/data.js` | Entities / Sources / Creators / Feeds / Feed Items / Projections / Approvals / Tasks / Recap 文章 |
| `js/state.js` | localStorage store、icons、sheet、goalTitle |
| `js/app.js` | hash router（push/pop 转场）、tab 切换、rerender |
| `js/cards.js` | Context Card 渲染：stream 卡、翻转卡背、immersive slide、sparkline |
| `js/screens.js` | 全部页面 + recap 文章 / 审批 deck / goal 管理页 / Chat 三 tab |
| `js/actions.js` | 全部交互（data-act 派发） |
| `css/app.css` | tokens（深色石墨 + Alva teal + Delight 字体 + iPhone 外壳） |
| `css/screens.css` | 页面与卡片样式 |
| `img/` | codex image_gen hero 图、FMP ticker logos、维基人物照 |

## Demo 状态

- You 页 `Reset demo` 清空 localStorage 重走 onboarding。
- 手机框外的 stage 条切换 Immersive / Stream。
- Premium unlock、Track、broker 连接、审批执行均为本地 mock（paper only 文案如实标注）。
