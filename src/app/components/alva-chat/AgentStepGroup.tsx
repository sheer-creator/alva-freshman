/**
 * [INPUT]: AgentStepData
 * [OUTPUT]: 可折叠子代理步骤组 — 外层自然语言 + 展开树线详情
 * [POS]: alva-chat — Agent subagent 步骤渲染
 */

import { useState } from 'react';
import type { AgentStepData, MessageBlock } from '@/data/alva-chat-mock';
import { TextBlock } from './TextBlock';
import { ToolCallBlock } from './ToolCallBlock';
import { Collapse } from './Collapse';

function renderNestedBlock(block: MessageBlock, idx: number) {
  switch (block.type) {
    case 'text':
      return <TextBlock key={idx} content={block.content} />;
    case 'tool_call':
      return <ToolCallBlock key={block.data.id} data={block.data} nested />;
    default:
      return null;
  }
}

interface AgentStepGroupProps {
  data: AgentStepData;
}

export function AgentStepGroup({ data }: AgentStepGroupProps) {
  const [expanded, setExpanded] = useState(data.subagentType === 'Plan');

  return (
    <div style={{ margin: '2px 0' }}>
      {/* 外层：自然语言摘要 */}
      <div
        onClick={() => setExpanded(!expanded)}
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
          fontSize: 12, color: 'var(--text-n9)',
          fontFamily: "'Delight', sans-serif",
        }}>
          {data.description}
        </span>
      </div>

      {/* 展开：树线 + 嵌套 blocks */}
      <Collapse open={expanded}>
        <div style={{ marginLeft: 5, paddingLeft: 11, borderLeft: '1.5px solid rgba(0,0,0,0.08)' }}>
          {data.blocks.map((block, idx) => renderNestedBlock(block, idx))}
        </div>
      </Collapse>
    </div>
  );
}
