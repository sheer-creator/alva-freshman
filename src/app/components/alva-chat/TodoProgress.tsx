/**
 * [INPUT]: TodoItem[], visible flag
 * [OUTPUT]: Sticky 进度浮层 — 右上角固定定位
 * [POS]: alva-chat — 实时进度追踪（不在消息流内）
 */

import { useState } from 'react';
import type { TodoItem } from '@/data/alva-chat-mock';

interface TodoProgressProps {
  items: TodoItem[];
  visible: boolean;
}

export function TodoProgress({ items, visible }: TodoProgressProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (!visible || items.length === 0) return null;

  const done = items.filter(i => i.status === 'completed').length;
  const total = items.length;
  const inProgress = items.find(i => i.status === 'in_progress');
  const allDone = done === total;

  /* 最小化态 */
  if (collapsed) {
    return (
      <div
        onClick={() => setCollapsed(false)}
        style={{
          position: 'absolute', top: 12, right: 16, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 8,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer', userSelect: 'none',
        }}
      >
        {/* Mini progress bar */}
        <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{
            width: `${(done / total) * 100}%`, height: '100%', borderRadius: 2,
            background: allDone ? '#49A3A6' : 'linear-gradient(90deg, #49A3A6, #3EE4D4)',
            transition: 'width 0.4s ease-out',
          }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace" }}>
          {done}/{total}
        </span>
        {inProgress && (
          <span style={{ fontSize: 11, color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
            {inProgress.activeForm ?? inProgress.content}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute', top: 12, right: 16, zIndex: 10,
      width: 280, borderRadius: 10,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease-out',
    }}>
      {/* Header */}
      <div
        onClick={() => setCollapsed(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px 6px', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>
          Progress
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace" }}>
          {done}/{total}
        </span>
      </div>

      {/* Items */}
      <div style={{ padding: '0 14px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
            {/* Status icon */}
            {item.status === 'completed' ? (
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="6" fill="#49A3A6" />
                <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : item.status === 'in_progress' ? (
              <div style={{
                width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                border: '2px solid #49A3A6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#49A3A6',
                  animation: 'alvaPulse 1.4s ease-in-out infinite',
                }} />
              </div>
            ) : (
              <div style={{
                width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                border: '1.5px solid rgba(0,0,0,0.15)',
              }} />
            )}

            {/* Label */}
            <span style={{
              fontSize: 12, lineHeight: '18px',
              fontFamily: "'Delight', sans-serif",
              color: item.status === 'completed' ? 'var(--text-n5)' : 'var(--text-n9)',
              textDecoration: item.status === 'completed' ? 'line-through' : 'none',
            }}>
              {item.status === 'in_progress' ? (item.activeForm ?? item.content) : item.content}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ padding: '4px 14px 10px' }}>
        <div style={{ height: 3, borderRadius: 2, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{
            width: `${(done / total) * 100}%`, height: '100%', borderRadius: 2,
            background: allDone ? '#49A3A6' : 'linear-gradient(90deg, #49A3A6, #3EE4D4)',
            transition: 'width 0.4s ease-out',
          }} />
        </div>
      </div>

      <style>{`@keyframes alvaPulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  );
}
