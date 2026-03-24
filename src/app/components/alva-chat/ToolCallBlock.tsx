/**
 * [INPUT]: ToolCallData + active flag + nested flag
 * [OUTPUT]: Tool 调用行 — 外层自然语言 or 嵌套子项
 * [POS]: alva-chat — Agent tool 调用渲染
 */

import { useState, useEffect } from 'react';
import type { ToolCallData, ToolName } from '@/data/alva-chat-mock';
import { Collapse } from './Collapse';

const MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
const PREVIEW_LINES = 3;

/* 提取操作对象 */
function toolObject(tool: ToolName, input: string): string {
  const first = input.split('\n')[0];
  if (['Read', 'Write', 'Edit', 'Grep', 'Glob'].includes(tool)) return first;
  if (tool === 'Bash') return first.slice(0, 80) + (first.length > 80 ? '...' : '');
  return first.slice(0, 60) + (first.length > 60 ? '...' : '');
}

/* 自动生成自然语言摘要 */
function generateSummary(tool: ToolName, input: string): string {
  const first = input.split('\n')[0];
  if (tool === 'Bash') return `Ran ${first.slice(0, 70)}${first.length > 70 ? '...' : ''}`;
  if (tool === 'Write') return `Wrote ${first}`;
  if (tool === 'Edit') return `Edited ${first}`;
  if (tool === 'Read') return `Read ${first}`;
  if (tool === 'Grep') return `Searched for ${first}`;
  if (tool === 'Glob') return `Found files matching ${first}`;
  if (tool.startsWith('alva_')) return `Called ${tool.replace('alva_', '')} — ${first.slice(0, 50)}${first.length > 50 ? '...' : ''}`;
  if (tool.startsWith('mcp__')) return `Called ${tool.split('__').pop()} — ${first.slice(0, 50)}${first.length > 50 ? '...' : ''}`;
  return `Used ${tool} — ${first.slice(0, 50)}${first.length > 50 ? '...' : ''}`;
}

/* 截取前 N 行 */
function previewLines(text: string, n: number): { text: string; hasMore: boolean } {
  const lines = text.split('\n');
  if (lines.length <= n) return { text, hasMore: false };
  return { text: lines.slice(0, n).join('\n'), hasMore: true };
}

/* ========== 展开详情：tool name 加粗 + 对象 pill + result 直出 ========== */

export function ToolCallDetail({ data }: { data: ToolCallData }) {
  const [showAll, setShowAll] = useState(false);
  const resultText = data.result ?? '';
  const { text: preview, hasMore } = previewLines(resultText, PREVIEW_LINES);

  return (
    <div style={{ padding: '6px 0' }}>
      {/* Tool name 加粗 + 操作对象 pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: resultText ? 4 : 0 }}>
        <span style={{
          fontSize: 13, fontWeight: 600, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif", flexShrink: 0,
        }}>
          {data.tool}
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '2px 8px', borderRadius: 4,
          background: 'rgba(0,0,0,0.06)',
          fontSize: 11, fontFamily: MONO, color: 'var(--text-n7, rgba(0,0,0,0.7))',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          maxWidth: '70%',
        }}>
          {toolObject(data.tool, data.input)}
        </span>
        {data.durationMs ? (
          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontFamily: MONO, flexShrink: 0, marginLeft: 'auto' }}>
            {(data.durationMs / 1000).toFixed(1)}s
          </span>
        ) : data.status === 'running' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, marginLeft: 'auto' }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              border: '1.5px solid var(--main-m1)', borderTopColor: 'transparent',
              animation: 'toolSpin .8s linear infinite',
            }} />
            <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: MONO }}>running</span>
          </span>
        ) : null}
      </div>

      {resultText && (
        <div style={{
          fontFamily: MONO, fontSize: 11, lineHeight: '17px',
          color: 'rgba(0,0,0,0.4)', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
        }}>
          {showAll ? resultText : preview}
        </div>
      )}

      {hasMore && (
        <div
          onClick={() => setShowAll(v => !v)}
          style={{
            fontSize: 11, color: 'var(--text-n5)', cursor: 'pointer',
            fontFamily: "'Delight', sans-serif", marginTop: 2, userSelect: 'none',
          }}
        >
          {showAll ? 'Show less' : 'Show more'}
        </div>
      )}
    </div>
  );
}

/* ========== 主组件 ========== */

interface ToolCallBlockProps {
  data: ToolCallData;
  isActive?: boolean;
  nested?: boolean;
}

export function ToolCallBlock({ data, isActive, nested }: ToolCallBlockProps) {
  const [manualToggle, setManualToggle] = useState<boolean | null>(null);

  useEffect(() => {
    if (isActive === true) setManualToggle(null);
  }, [isActive]);

  const expanded = manualToggle ?? (isActive === true);
  const summary = data.summary ?? generateSummary(data.tool, data.input);

  /* 嵌套在 group 内：直接渲染详情，无 chevron */
  if (nested) return <ToolCallDetail data={data} />;

  /* 顶层：chevron + 自然语言 → 展开树线 + 详情 */
  return (
    <div style={{ margin: '2px 0' }}>
      <div
        onClick={() => setManualToggle(prev => !(prev ?? expanded))}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" style={{
          flexShrink: 0, transition: 'transform 0.15s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0)',
        }}>
          <path d="M3 1.5L7 5L3 8.5" stroke="var(--text-n5)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
        <span style={{
          flex: 1, fontSize: 12, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif",
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {summary}
        </span>
        {data.status === 'running' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
              border: '1.5px solid var(--main-m1)', borderTopColor: 'transparent',
              animation: 'toolSpin .8s linear infinite',
            }} />
            <span style={{ fontSize: 11, color: 'var(--text-n5)', fontFamily: MONO }}>running</span>
          </span>
        ) : data.durationMs ? (
          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontFamily: MONO }}>
            {(data.durationMs / 1000).toFixed(1)}s
          </span>
        ) : null}
      </div>

      <Collapse open={expanded}>
        <div style={{ marginLeft: 5, paddingLeft: 11, borderLeft: '1.5px solid rgba(0,0,0,0.08)' }}>
          <ToolCallDetail data={data} />
        </div>
      </Collapse>

      <style>{`@keyframes toolSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
