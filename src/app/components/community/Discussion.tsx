/**
 * [INPUT]: Comment[] mock 数据
 * [OUTPUT]: 评论区列表 + 输入占位
 * [POS]: 社区组件 — User + Agent 混合评论
 */

import { AVATAR_COLOR_PALETTE } from '@/lib/chart-theme';
import type { Comment } from '@/data/community-mock';

/* ========== 头像 ========== */

function CommentAvatar({ name, isAgent, size = 28 }: { name: string; isAgent: boolean; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = AVATAR_COLOR_PALETTE[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % AVATAR_COLOR_PALETTE.length];
  return (
    <div className="relative" style={{ width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
      </div>
      {isAgent && (
        <span className="absolute" style={{
          top: -2, right: -2, width: 12, height: 12, borderRadius: '50%',
          background: 'rgba(73,163,166,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, lineHeight: 1,
        }}>🤖</span>
      )}
    </div>
  );
}

/* ========== 主组件 ========== */

export function Discussion({ comments }: { comments: Comment[] }) {
  return (
    <div className="flex flex-col gap-[16px]">
      {/* 标题 */}
      <div className="flex items-center justify-between h-[22px]">
        <p className="text-[14px]" style={{ color: 'var(--text-n9)' }}>Discussion</p>
        <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{comments.length} comments</span>
      </div>

      {/* 评论列表 */}
      <div style={{ background: 'var(--grey-g01)', borderRadius: 4, padding: 20 }}>
        <div className="flex flex-col">
          {comments.map((c, i) => (
            <div key={c.id}>
              <div
                className="flex gap-[12px]"
                style={{
                  padding: '12px 0',
                  background: c.isAgent ? 'rgba(73,163,166,0.05)' : 'transparent',
                  borderRadius: c.isAgent ? 4 : 0,
                  paddingLeft: c.isAgent ? 8 : 0,
                  paddingRight: c.isAgent ? 8 : 0,
                }}
              >
                <CommentAvatar name={c.author} isAgent={c.isAgent} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[14px]" style={{ color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>{c.author}</span>
                    <span className="text-[12px]" style={{ color: 'var(--text-n5)' }}>{c.timestamp}</span>
                  </div>
                  <p className="text-[14px] leading-[22px] mt-[4px]" style={{ color: 'var(--text-n7)' }}>{c.text}</p>
                </div>
              </div>
              {i < comments.length - 1 && (
                <div style={{ borderTop: '1px solid var(--line-l05, rgba(0,0,0,0.05))', marginLeft: 36, marginRight: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* 输入占位 */}
        <div
          className="mt-[16px] flex items-center"
          style={{
            background: 'var(--grey-g02, #f5f5f5)',
            borderRadius: 6,
            height: 40,
            paddingLeft: 12,
          }}
        >
          <span className="text-[13px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Add a comment...</span>
        </div>
      </div>
    </div>
  );
}
