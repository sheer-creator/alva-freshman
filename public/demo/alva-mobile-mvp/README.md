# Alva Mobile MVP — Alpha & Following

纯前端拟真 demo（vanilla ES modules，无构建、无后端），是 `alva-mobile-feed` 概念版的 MVP 收敛，两者互不影响。

## MVP 范围

- 底部四 tab 保留，聚焦打磨 **For You**（列表流，无 Recap、无 immersive、无推荐卡）
- 两个内置 automation feed 混排进 For You，卡片带来源标签：
  - **Alpha** — 精选 podcast 的原始片段 + ticker tag + Why it's alpha（源：仅 podcasts）
  - **Following** — 关注标的的 impactful events + 异动归因（源：仅 X + 新闻）
- Onboarding 单屏选 ticker，可 skip（Alpha 零设置可用）
- 卡片唯一动作 = Ask Alva；卡背 = 溯源 + why
- Discover 只有 Market（Trending / Following）；Chat 三 tab 结构保留；You 无 Portfolio

## 本地预览

```
npx http-server public -p 8901 -c-1
# → http://localhost:8901/demo/alva-mobile-mvp/
```

## 文件

- `js/data.js` — 数据层：ENTITIES / SOURCES / FEEDS(alpha, following) / ITEMS(alpha, event, anomaly)
- `js/cards.js` — 三种卡型渲染 + 卡背溯源
- `js/screens.js` — 页面：onboarding / home / detail / discover / feed(automation) / source / ask / you
- `js/actions.js` — data-act 交互派发
- `js/state.js` — localStorage store（key: `alva_mvp_demo_v1`）
- `css/` — 沿用概念版视觉体系，MVP 专属样式在 screens.css 末尾
