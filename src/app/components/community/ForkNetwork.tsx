/**
 * [INPUT]: LineageNode 树形数据
 * [OUTPUT]: Fork 关系可视化（纯 CSS 树）
 * [POS]: 社区组件 — Playbook 派生关系图
 */

import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import type { LineageNode } from '@/data/community-mock';

/* ========== 头像 ========== */

function MiniAvatar({ name, size = 18 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}

/* ========== 节点 ========== */

function TreeNode({ node }: { node: LineageNode }) {
  return (
    <div className="flex flex-col items-start">
      {/* 当前节点 */}
      <div className="flex items-center gap-[6px]" style={{
        padding: '8px 12px',
        borderRadius: 6,
        background: '#fff',
        border: node.isCurrent ? '2px solid var(--main-m1)' : '1px solid var(--line-l12)',
      }}>
        <MiniAvatar name={node.author} />
        <div>
          <p className="text-[13px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
            @{node.author}/{node.name}
          </p>
        </div>
      </div>

      {/* 子节点 */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col gap-[8px]" style={{ marginLeft: 20, marginTop: 8, paddingLeft: 16, borderLeft: '2px solid var(--line-l07)' }}>
          {node.children.map(child => (
            <div key={child.id} className="relative">
              {/* 连线标签 */}
              <span className="text-[10px] mb-[4px] block" style={{ color: 'var(--text-n5)' }}>
                {child.relation === 'subscribe' ? '── subscribe' : '┄┄ snapshot'}
              </span>
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========== 主组件 ========== */

function countNodes(node: LineageNode): number {
  return (node.children?.reduce((sum, c) => sum + countNodes(c), 0) ?? 0) + (node.children?.length ?? 0);
}

export function ForkNetwork({ lineage }: { lineage: LineageNode }) {
  const total = countNodes(lineage);
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center justify-between h-[22px]">
        <p className="text-[14px]" style={{ color: 'var(--text-n9)' }}>Fork Network</p>
        <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{total} forks</span>
      </div>
      <div style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
        <TreeNode node={lineage} />
      </div>
    </div>
  );
}
