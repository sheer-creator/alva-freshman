# Alva Junior 代码结构优化计划

## Context

Alva Junior 是一个 Figma Make 生成的 React 金融数据看板 SPA，要作为 Alva 的产品 demo 展示项目。当前核心问题：

1. **两个 8700 行巨型文件**（Dashboard.tsx / DashboardWorkspace.tsx）97% 重复，无法维护
2. **所有 6 个页面**都各自复制了一套完整的 Sidebar（~365 行/份），总计 ~2200 行重复代码
3. **48/50 个 shadcn/ui 组件未使用**，264KB 死代码
4. **三图表库并存**（ECharts + Chart.js + Recharts），ECharts 配置在 5 个 Widget 中重复 60+ 行/份
5. **15+ 个 npm 包未使用**
6. **构建失败**（react-grid-layout 导入问题）
7. **无 tsconfig.json**，无类型安全保障

目标：简洁优雅、易于维护和扩展，方便快速实验新 UI/UX idea。

---

## Phase 1: 清理 → Phase 2: 统一图表 → Phase 3: 拆解巨型文件 → Phase 4: 架构优化

详见主计划文件。

## 预期效果

| 指标 | 重构前 | 重构后 |
|------|-------|-------|
| 最大文件行数 | 8722 | ~940 |
| 总源代码行数 | ~33000 | ~8000 |
| Sidebar 重复份数 | 6 份 | 1 份 |
| 图表库 | 3 个 | 1 个（ECharts） |
| npm 依赖数 | ~50 | ~25 |
