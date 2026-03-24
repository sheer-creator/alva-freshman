/**
 * [INPUT]: TodoItem[] + label
 * [OUTPUT]: 吸底轻量进度条 — 语义标题 + 竖排 items
 * [POS]: alva-chat — InputBar 上方全局唯一
 */

import type { TodoItem } from '@/data/alva-chat-mock';

interface TodoBarProps {
  label: string;
  items: TodoItem[];
}

export function TodoBar({ label, items }: TodoBarProps) {
  const done = items.filter(i => i.status === 'completed').length;
  const total = items.length;
  if (total === 0) return null;

  return (
    <div style={{
      padding: '10px 24px', borderTop: '1px solid rgba(0,0,0,0.06)',
      flexShrink: 0,
    }}>
      {/* Title + count */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
          {label}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace", marginLeft: 'auto' }}>
          {done}/{total}
        </span>
      </div>

      {/* Items — 竖排 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {item.status === 'completed' ? (
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#49A3A6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : item.status === 'in_progress' ? (
              <div style={{
                width: 12, height: 12, flexShrink: 0,
                borderRadius: '50%', border: '1.5px solid #49A3A6',
                borderTopColor: 'transparent',
                animation: 'todoSpin .8s linear infinite',
              }} />
            ) : (
              <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
            )}
            <span style={{
              fontSize: 12, fontFamily: "'Delight', sans-serif",
              color: item.status === 'completed' ? 'var(--text-n5)' : 'var(--text-n9)',
              textDecoration: item.status === 'completed' ? 'line-through' : 'none',
            }}>
              {item.status === 'in_progress' ? (item.activeForm ?? item.content) : item.content}
            </span>
          </div>
        ))}
      </div>
      <style>{`@keyframes todoSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
