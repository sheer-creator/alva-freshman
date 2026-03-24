/**
 * [INPUT]: ArtifactData
 * [OUTPUT]: Playbook 产物卡片 — Explore 风格 + Release / Open Preview
 * [POS]: alva-chat — Agent 生成产物预览
 */

import type { ArtifactData } from '@/data/alva-chat-mock';

interface ArtifactPreviewProps {
  data: ArtifactData;
  onRelease?: () => void;
}

export function ArtifactPreview({ data, onRelease }: ArtifactPreviewProps) {
  return (
    <div
      className="group"
      style={{
        margin: '10px 0', borderRadius: 8, overflow: 'hidden',
        background: '#fff', position: 'relative',
        maxWidth: 380, width: '100%',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 缩略图区 */}
      <div style={{
        height: 140, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #2a2a38 0%, #3d6b6d 50%, #49A3A6 100%)',
      }}>
        {/* Mock chart lines */}
        <svg width="100%" height="100%" viewBox="0 0 600 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          <polyline points="0,110 60,95 120,100 180,55 240,70 300,40 360,60 420,25 480,45 540,15 600,30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <polyline points="0,120 60,115 120,118 180,85 240,100 300,65 360,90 420,55 480,75 540,45 600,60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="6,4" />
          <polyline points="0,130 60,125 120,128 180,105 240,115 300,90 360,105 420,80 480,95 540,70 600,85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
        {/* Type badge */}
        <span style={{
          position: 'absolute', bottom: 10, left: 12,
          padding: '3px 8px', borderRadius: 4,
          background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
          fontSize: 11, color: 'rgba(255,255,255,0.8)',
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
        }}>
          {data.artifactType.toUpperCase()}
        </span>
      </div>

      {/* 信息区 */}
      <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{
          margin: 0, fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'rgba(0,0,0,0.9)', fontFamily: "'Delight', sans-serif",
          letterSpacing: '0.16px',
        }}>
          {data.title}
        </p>
        <p style={{
          margin: 0, fontSize: 12, lineHeight: '18px',
          color: 'rgba(0,0,0,0.4)', fontFamily: "'Delight', sans-serif",
          letterSpacing: '0.12px',
        }}>
          {data.description}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <button
            onClick={onRelease}
            style={{
              padding: '6px 16px', borderRadius: 6, border: 'none',
              background: '#49A3A6', color: '#fff',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'Delight', sans-serif",
            }}
          >
            Release
          </button>
          <button style={{
            padding: '6px 16px', borderRadius: 6,
            background: 'transparent', border: '1px solid rgba(0,0,0,0.1)',
            color: 'var(--text-n9)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Delight', sans-serif",
          }}>
            Open Preview
          </button>
        </div>
      </div>

      {/* Hover 边框辉光 */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 8, pointerEvents: 'none',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
        ref={el => {
          if (!el) return;
          const parent = el.parentElement;
          if (!parent) return;
          parent.addEventListener('mouseenter', () => {
            el.style.borderColor = 'rgba(73,163,166,0.3)';
            el.style.boxShadow = 'inset 0 0 0 1px rgba(73,163,166,0.08)';
          });
          parent.addEventListener('mouseleave', () => {
            el.style.borderColor = 'rgba(0,0,0,0.06)';
            el.style.boxShadow = 'none';
          });
        }}
      />
    </div>
  );
}
