/**
 * [INPUT]: PlanCardData
 * [OUTPUT]: 计划卡片 — 纯展示，action 在底部 InputBar
 * [POS]: alva-chat — Agent 计划展示
 */

import type { PlanCardData } from '@/data/alva-chat-mock';

interface PlanCardProps {
  data: PlanCardData;
}

export function PlanCard({ data }: PlanCardProps) {
  return (
    <div style={{
      margin: '8px 0', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.06)',
      borderLeft: '3px solid #49A3A6',
      background: '#fff',
    }}>
      <div style={{ padding: '16px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v7h7v9H6z" fill="var(--text-n5)" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
            Plan
          </span>
          {data.accepted && (
            <span style={{
              marginLeft: 'auto', fontSize: 11, fontWeight: 500, color: '#49A3A6',
              fontFamily: "'Delight', sans-serif",
            }}>
              Accepted
            </span>
          )}
        </div>

        <p style={{
          margin: '0 0 12px', fontSize: 15, fontWeight: 600,
          color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
        }}>
          {data.title}
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{
                fontSize: 12, color: 'var(--text-n5)', fontFamily: "'JetBrains Mono', monospace",
                width: 20, flexShrink: 0, textAlign: 'right',
              }}>
                {i + 1}.
              </span>
              <span style={{
                fontSize: 13, lineHeight: '20px', color: 'var(--text-n9)',
                fontFamily: "'Delight', sans-serif",
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
