/**
 * [INPUT]: CompletionData
 * [OUTPUT]: 完成态条 — 时长 + token + action 按钮
 * [POS]: alva-chat — Agent 完成状态渲染
 */

import type { CompletionData } from '@/data/alva-chat-mock';

interface CompletionBarProps {
  data: CompletionData;
}

export function CompletionBar({ data }: CompletionBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', marginTop: 8,
      borderTop: '1px solid rgba(0,0,0,0.06)',
    }}>
      {/* Check mark */}
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--main-m1)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stats */}
      <span style={{
        fontSize: 13, color: 'var(--text-n5)',
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      }}>
        Complete &middot; {data.durationSec.toFixed(1)}s &middot; {data.tokenCount.toLocaleString()} tok
      </span>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Action buttons */}
      {data.actions?.map((action, i) => (
        <button
          key={i}
          style={{
            padding: '5px 12px', borderRadius: 6, border: '1px solid var(--line-l2)',
            background: i === 0 ? 'var(--main-m1)' : 'transparent',
            color: i === 0 ? '#fff' : 'var(--text-n9)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Delight', sans-serif",
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
