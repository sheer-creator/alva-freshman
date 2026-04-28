# alva-freshman — 本地开发工作流

> 本文档描述本地 `alva-freshman` 仓库的 git 模型、每日同步、冲突处理、本地预览地址和编码规范参照路径。

## 分支模型

```
origin/main   ────────●──────────●────────●──── (GitHub 主分支，团队推送)
                       \          \        \
                        ↓ daily-sync @ 10:30 (自动 merge)
local         ────●────●──────────●────────●──── (本地开发分支)
```

- `main`：镜像 GitHub 主分支，**本地不直接在它上面开发**
- `local`：本地实际开发的分支；每次 push 前先 merge `origin/main`
- scheduled task 每天早上 10:30 自动把 `origin/main` 合入 `local`

## 日常命令

| 操作 | 命令 |
|---|---|
| 启动本地预览 | `bash scripts/dev.sh` |
| 查看地址 | http://localhost:5173 |
| 手动同步 main | `bash scripts/daily-sync.sh` |
| 安全推送到 local | `bash scripts/safe-push.sh` |
| 推送到 main | `bash scripts/safe-push.sh --to-main` |
| 更新编码规范 | `bash scripts/update-skills-ref.sh` |

## 每日同步（scheduled task）

每天 10:30 自动执行 `scripts/daily-sync.sh`：

1. 保护未提交改动 — 有的话先 `git stash`，结束后恢复
2. `git fetch origin main`
3. 用一次性 worktree 预检 merge，**不污染 working tree**
4. 无冲突 → 在 `local` 上执行 merge；已有的 `CONFLICTS.md` 删除
5. 有冲突 → 写 `CONFLICTS.md` + 退出，`local` 保持不变

### 出现冲突时怎么处理

打开仓库根的 `CONFLICTS.md` 查看：

- 冲突文件列表
- origin/main 新增的提交
- 每个文件的 3-way diff 片段
- 推荐处理命令

处理步骤：

```bash
cd alva-freshman
git fetch origin main
git merge origin/main              # 看到冲突标记
# 在编辑器里逐个解决 <<<<<<< ======= >>>>>>> 区段
git add <files>
git commit
bash scripts/safe-push.sh          # 会再次预检后推送
```

## 推送前的安全检查（safe-push）

`safe-push.sh` 的流程：

1. 确认当前在 `local` 分支
2. 确认 working tree 干净（有未提交改动就拒绝）
3. 调用 `daily-sync.sh` — 先把 origin/main merge 进来
4. merge 成功 → 推送；merge 冲突 → 中止

加 `--to-main` 可直接推到远程 main（权限允许时）。

## 编码规范参考

`.skills-ref/alva-skills/` 是 [alva-ai/skills](https://github.com/alva-ai/skills) 的浅克隆，**被 gitignore，不进仓库**。

写代码时参照：

- `.skills-ref/alva-skills/skills/alva/references/design-system.md` — 设计系统约定
- `.skills-ref/alva-skills/skills/alva/references/design-tokens.css` — 设计 token
- `.skills-ref/alva-skills/skills/alva/references/design-components.md` — 组件约定
- `.skills-ref/alva-skills/skills/alva/references/design-widgets.md` — 部件约定
- `.skills-ref/alva-skills/skills/alva/SKILL.md` — Alva 平台能力总览

更新：`bash scripts/update-skills-ref.sh`（建议每周一次或遇到规范变更时）

## 目录结构

```
alva-freshman/
├── scripts/
│   ├── daily-sync.sh          每日同步（scheduled task 调用）
│   ├── safe-push.sh           推送前检查
│   ├── dev.sh                 启动 vite dev server
│   └── update-skills-ref.sh   拉取 alva-ai/skills 最新版
├── .skills-ref/               编码规范（gitignored）
├── .sync-log/                 同步日志（gitignored）
├── CONFLICTS.md               有冲突时自动生成（gitignored）
├── LOCAL-SETUP.md             本文
└── [项目源码 ...]
```

## 故障排查

| 症状 | 处理 |
|---|---|
| `daily-sync.sh` 报 "not a git repo" | `cd alva-freshman` 先确认你在仓库根 |
| `CONFLICTS.md` 一直存在，冲突已处理 | 手动删除即可；下次 sync 会自动清 |
| stash pop 失败 | `git stash list` 看栈，手动 `git stash pop --index` 或解决冲突 |
| 端口 5173 被占用 | `PORT=5174 bash scripts/dev.sh` |
| scheduled task 没跑 | `ls ~/Documents/Claude/Scheduled/` 确认任务存在，或让 Claude 重新注册 |
