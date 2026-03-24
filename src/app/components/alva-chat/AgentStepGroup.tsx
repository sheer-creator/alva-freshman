/**
 * [INPUT]: AgentStepData
 * [OUTPUT]: 可折叠子代理步骤组（树线 + 嵌套 blocks）
 * [POS]: alva-chat — Agent subagent 步骤渲染
 */

import { useState } from 'react';
import type { AgentStepData, MessageBlock } from '@/data/alva-chat-mock';
import { TextBlock } from './TextBlock';
import { ToolCallBlock } from './ToolCallBlock';

function renderNestedBlock(block: MessageBlock, idx: number) {
  switch (block.type) {
    case 'text':
      return <TextBlock key={idx} content={block.content} />;
    case 'tool_call':
      return <ToolCallBlock key={block.data.id} data={block.data} />;
    default:
      return null;
  }
}

const SUBAGENT_COLORS: Record<string, string> = {
  Explore: 'rgba(0,0,0,0.15)',
  Plan: '#2196F3',
};

interface AgentStepGroupProps {
  data: AgentStepData;
}

export function AgentStepGroup({ data }: AgentStepGroupProps) {
  const [expanded, setExpanded] = useState(data.subagentType === 'Plan');
  const color = SUBAGENT_COLORS[data.subagentType] ?? 'rgba(0,0,0,0.15)';

  return (
    <div style={{ margin: '6px 0' }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 0', cursor: 'pointer', userSelect: 'none',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, transform: expanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s' }}>
          <path d="M4 2L8 6L4 10" stroke="var(--text-n5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        <span style={{
          fontSize: 12, fontWeight: 600, color: 'var(--text-n5)',
          fontFamily: "'Delight', sans-serif",
        }}>
          Agent
        </span>
        <span style={{
          fontSize: 12, color: 'var(--text-n7, rgba(0,0,0,0.7))',
          fontFamily: "'Delight', sans-serif",
        }}>
          {data.description}
        </span>
      </div>

      {/* Expanded body with tree line */}
      {expanded && (
        <div style={{
          marginLeft: 6, paddingLeft: 16,
          borderLeft: `2px solid ${color}`,
        }}>
          {data.blocks.map((block, idx) => renderNestedBlock(block, idx))}
        </div>
      )}
    </div>
  );
}
