# Alva Mobile — Personal Market Context (Concept Demo)

纯前端概念 demo，对应 `alva_mobile_feed_product_plan.md` v0.3 的移动端产品形态。
无构建步骤、无后端依赖：任何静态服务器指向 `public/` 即可运行，路径 `/demo/alva-mobile-feed/`。

## 概念模型（与产品方案一致）

```
Source → Automation → Feed → Feed Item → Context Card → Action
```

- **一切卡片都从 `js/data.js` 的 Feed Item 渲染**，没有手写的一次性卡片 HTML。
- Feed Item 保存共享内容（headline / summary / what_changed / entity_refs /
  evidence / confidence / access / media_refs / archetype_hint）。
- **Context Projection**（`PROJECTIONS`）保存 per-viewer 的 why-you-see-this 与
  watch 影响，不写回共享 item。
- Archetype 是软呈现提示（what_changed / market_view / signal / private_digest /
  premium_insight / brief / multi_source / important_event），未知类型回退通用卡。

## 文件

| 文件 | 职责 |
| --- | --- |
| `js/data.js` | Entities / Sources / Creators / Feeds / Feed Items / Projections |
| `js/state.js` | localStorage store、icons、sheet、toast |
| `js/app.js` | hash router（push/pop 转场）、tab 切换、rerender |
| `js/cards.js` | Context Card 渲染：stream 卡、翻转卡背、immersive slide、sparkline |
| `js/screens.js` | 全部页面（onboarding / For You / detail / discover / entity / feed / source / creator / ask / you） |
| `js/actions.js` | 全部交互（data-act 派发）：follow / track / unlock / mute / sheets |
| `css/app.css` | tokens（深色石墨 + Alva teal）、组件原语 |
| `css/screens.css` | 页面与卡片样式 |
| `img/hero-*.jpg` | codex image_gen 生成的深色 editorial hero 图 |
| `fonts/Delight-*` | Alva 品牌字体 |

## 覆盖的主路径（v0.3 §20.1）

- **Path A** Entity cold start：Welcome → Pick entities → Watch statement →
  Feed preview → For You → 翻转 Behind this → Context Detail → Track / Ask
- **Path B** Bring your sources：Connect X（Catalog match / Custom Source）、
  Telegram Chat Picker（显式选择 + Private 提示）
- **Path C** Direct Feed discovery：Discover → Feed Detail → Follow →
  Creator Profile（unclaimed + 质量雷达）
- **Path D** Returning user：Since you were away → Change 卡 →
  Supports / Challenges watch → Track

## Demo 状态

- 右上角 `Personal` / You 页 `Reset demo` 可清空 localStorage 重走 onboarding。
- For You 顶部 Immersive / Stream 两种消费模式。
- Premium unlock、Track 通知频率、source mute 均为本地 mock 状态。
