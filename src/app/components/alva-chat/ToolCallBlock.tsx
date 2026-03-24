/**
 * [INPUT]: ToolCallData + active flag
 * [OUTPUT]: Tool 调用卡片 — 流式时展开，后续自动收起
 * [POS]: alva-chat — Agent tool 调用渲染
 */

import { useState, useEffect } from 'react';
import type { ToolCallData, ToolName } from '@/data/alva-chat-mock';

const MD_MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";

/* ========== 颜色规则 ========== */

function toolAccentColor(tool: ToolName): string {
  if (tool.startsWith('alva_') || tool.startsWith('mcp__')) return '#49A3A6';
  if (tool === 'Skill') return '#7474D8';
  return '#6B7280';
}

function toolInputSummary(tool: ToolName, input: string): string {
  if (tool === 'Bash') return input.slice(0, 80) + (input.length > 80 ? '...' : '');
  if (['Read', 'Write', 'Grep', 'Glob'].includes(tool)) return input.split('\n')[0];
  return input.slice(0, 60) + (input.length > 60 ? '...' : '');
}

/* ========== 组件 ========== */

interface ToolCallBlockProps {
  data: ToolCallData;
  isActive?: boolean;
}

export function ToolCallBlock({ data, isActive }: ToolCallBlockProps) {
  const [manualToggle, setManualToggle] = useState<boolean | null>(null);
  const accent = toolAccentColor(data.tool);

  /* 流式时 active tool 自动展开，离开 active 自动收起 */
  useEffect(() => {
    if (isActive === true) setManualToggle(null);
  }, [isActive]);

  const expanded = manualToggle ?? (isActive === true);

  return (
    <div style={{ margin: '2px 0' }}>
      {/* Tool call row */}
      <div
        onClick={() => setManualToggle(prev => !(prev ?? expanded))}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        {/* Chevron */}
        <svg width="10" height="10" viewBox="0 0 10 10" style={{
          flexShrink: 0, transition: 'transform 0.15s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>
          <path d="M3 1.5L7 5L3 8.5" stroke="var(--text-n5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>

        {/* Tool name pill */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 5,
          background: '#3a3a48', color: '#fff',
          fontSize: 12, fontWeight: 500, fontFamily: MD_MONO,
          flexShrink: 0,
        }}>
          {data.tool.startsWith('alva_') && (
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#49A3A6', flexShrink: 0 }} />
          )}
          {data.tool}
        </span>

        {/* Summary */}
        <span style={{
          flex: 1, fontSize: 13, color: 'var(--text-n5)',
          fontFamily: "'Delight', sans-serif",
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {toolInputSummary(data.tool, data.input)}
        </span>

        {/* Status */}
        {data.status === 'running' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: accent,
              animation: 'alvaPulse 1.4s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 11, color: accent, fontFamily: MD_MONO }}>running...</span>
          </span>
        ) : data.durationMs ? (
          <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: MD_MONO, flexShrink: 0 }}>
            {(data.durationMs / 1000).toFixed(1)}s
          </span>
        ) : null}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{
          margin: '2px 0 4px 18px', padding: '10px 14px', borderRadius: 8,
          background: '#F7F7F8',
        }}>
          <div style={{
            fontFamily: MD_MONO, fontSize: 12, lineHeight: '18px',
            color: 'var(--text-n9)', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            maxHeight: 180, overflowY: 'auto',
          }}>
            {data.input}
          </div>
          {data.result && (
            <>
              <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
              <div style={{
                fontFamily: MD_MONO, fontSize: 12, lineHeight: '18px',
                color: 'rgba(0,0,0,0.55)', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                maxHeight: 160, overflowY: 'auto',
              }}>
                {data.result}
              </div>
            </>
          )}
        </div>
      )}

      <style>{`@keyframes alvaPulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
    </div>
  );
}
