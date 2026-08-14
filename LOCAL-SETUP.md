# Alva Freshman 本地开发

Freshman 既可以独立 clone，也可以作为 MonoMeta 的 submodule 开发。团队协作以 MonoMeta checkout 为主。

## 在 MonoMeta 中启动

```bash
git submodule update --init code/frontend/alva-freshman
cd code/frontend/alva-freshman
npm ci
npm run dev
```

默认地址是 <http://localhost:5173>，静态 Demo 索引是 <http://localhost:5173/demo/>。如需更换端口：

```bash
PORT=5174 bash scripts/dev.sh
```

## 提交修改

MonoMeta 固定的是 Freshman 的具体 commit，因此进入子模块后通常会看到 detached HEAD。这是正常状态。开始开发时从 Freshman 的远程主分支创建功能分支：

```bash
git fetch origin main
git switch -c <username>/<short-topic> origin/main
```

完成后在 Freshman 子仓库提交并创建 PR：

```bash
npm run typecheck
npm run build
git add <changed-files>
git commit -m "docs: refresh project guidance"
git push -u origin <username>/<short-topic>
gh pr create
```

子仓库 PR 合并后，MonoMeta 的 submodule 同步流程会推进 `code/frontend/alva-freshman` 的 gitlink。除非任务明确要求，不要在同一个修改里手动提交 MonoMeta 的 submodule pointer。

## 文档与共享上下文

- 当前产品定义：MonoMeta `../../../docs/product/index.zh-CN.md`
- 当前 Alva Channel 定义：MonoMeta `../../../docs/product/topic-channel.zh-CN.md`
- 共享 skills：MonoMeta `../../public/skills`
- Freshman 协作规则：`AGENTS.md`
- 静态 Demo 规则：`public/demo/README.md`

Freshman 不再维护 `local` 分支、每日自动 merge、独立 skills clone 或子仓库专用的安全推送脚本。Git 同步和 submodule 管理由 MonoMeta 统一负责。
