/**
 * [INPUT]: UserTurn data
 * [OUTPUT]: 用户消息 — 右对齐深色气泡（匹配 Figma 设计）
 * [POS]: alva-chat — 用户侧消息渲染
 */

import type { UserTurn } from '@/data/alva-chat-mock';

interface UserMessageProps {
  turn: UserTurn;
}

export function UserMessage({ turn }: UserMessageProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 12px' }}>
      <div style={{
        maxWidth: '75%', padding: '12px 18px', borderRadius: 14,
        background: '#3a3a48', color: '#fff',
        fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px',
        fontFamily: "'Delight', sans-serif", whiteSpace: 'pre-wrap',
      }}>
        {turn.text}
        {turn.attachments && turn.attachments.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {turn.attachments.map((a, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 4,
                background: 'rgba(255,255,255,0.12)', fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
              }}>
                {a.type === 'image' ? '\uD83D\uDDBC' : '\uD83D\uDCCE'} {a.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
