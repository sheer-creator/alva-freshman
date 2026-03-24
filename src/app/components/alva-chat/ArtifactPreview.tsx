/**
 * [INPUT]: ArtifactData
 * [OUTPUT]: Playbook 产物卡片 — Explore 风格 + Release / Open Preview
 * [POS]: alva-chat — Agent 生成产物预览
 */

import { useState } from 'react';
import type { ArtifactData } from '@/data/alva-chat-mock';

interface ArtifactPreviewProps {
  data: ArtifactData;
  onRelease?: () => void;
}

export function ArtifactPreview({ data, onRelease }: ArtifactPreviewProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        margin: '10px 0', borderRadius: 8, overflow: 'hidden',
        background: '#fff', position: 'relative',
        maxWidth: 380, width: '100%',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.08)' : 'none',
        transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
      }}
    >
      {/* 缩略图区 */}
      <div style={{
        height: 140, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #2a2a38 0%, #3d6b6d 50%, var(--main-m1) 100%)',
      }}>
        {/* Mock chart lines */}
        <svg width="100%" height="100%" viewBox="0 0 600 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          <polyline points="0,110 60,95 120,100 180,55 240,70 300,40 360,60 420,25 480,45 540,15 600,30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <polyline points="0,120 60,115 120,118 180,85 240,100 300,65 360,90 420,55 480,75 540,45 600,60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="6,4" />
          <polyline points="0,130 60,125 120,128 180,105 240,115 300,90 360,105 420,80 480,95 540,70 600,85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3,3" />
        </svg>
      </div>

      {/* 信息区 */}
      <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{
          margin: 0, fontSize: 16, fontWeight: 500, lineHeight: '24px',
          color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
          letterSpacing: '0.16px',
        }}>
          {data.title}
        </p>
        {/* Creator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', background: 'var(--main-m1)', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 9, color: '#fff', fontFamily: "'Delight', sans-serif", fontWeight: 600 }}>Y</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif" }}>YGGYLL</span>
        </div>
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
              background: 'var(--main-m1)', color: '#fff',
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
        border: hovered ? '1px solid rgba(73,163,166,0.3)' : '1px solid var(--line-l07)',
        boxShadow: hovered ? 'inset 0 0 0 1px rgba(73,163,166,0.08)' : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }} />
    </div>
  );
}
