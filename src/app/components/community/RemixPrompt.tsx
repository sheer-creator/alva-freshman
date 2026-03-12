/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: Remix 提示面板 — 描述 + 可复制 prompt 代码块
 * [POS]: 社区组件 — PlaybookTopbar 弹层内容
 */

import { useState, useCallback } from 'react';

const DESCRIPTION = 'Copy the prompt below and send it to your agent (e.g. OpenClaw, Claude Code) to remix this Playbook.';

const PROMPT = `Create a customized version based on this Playbook template:

1. Keep the core strategy logic
2. Adjust parameters to my investment preferences
3. Add stop-loss / take-profit rules matching my risk appetite

Playbook ID: {{playbook_id}}`;

/* ========== 组件 ========== */

export function RemixPrompt() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  return (
    <div style={{ width: 360 }}>
      {/* 描述 */}
      <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: '20px', margin: '0 0 12px', fontFamily: "'Delight', sans-serif" }}>
        {DESCRIPTION}
      </p>

      {/* 代码块 */}
      <div style={{ position: 'relative', background: 'rgba(0,0,0,0.03)', borderRadius: 8, padding: '12px 14px' }}>
        <pre style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: 'rgba(0,0,0,0.8)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'Delight', monospace", paddingRight: 50 }}>
          {PROMPT}
        </pre>
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute', top: 8, right: 8, padding: '4px 10px',
            borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer',
            fontSize: 12, fontFamily: "'Delight', sans-serif",
            background: '#fff', color: 'rgba(0,0,0,0.7)',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
