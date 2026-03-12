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
    <div style={{ width: 480, padding: 20 }}>
      {/* 描述 */}
      <p style={{
        fontSize: 13, color: 'var(--text-n7, rgba(0,0,0,0.7))', lineHeight: '20px',
        margin: '0 0 12px', fontFamily: "'Delight', sans-serif",
      }}>
        {DESCRIPTION}
      </p>

      {/* Prompt 内容块 + Copy 按钮 */}
      <div style={{
        background: 'var(--main-m1-10, rgba(73,163,166,0.1))',
        borderRadius: 8,
        padding: '16px 20px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <pre style={{
          margin: 0, fontSize: 16, lineHeight: '26px',
          color: 'var(--text-n9, rgba(0,0,0,0.9))',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          fontFamily: "'Delight', sans-serif",
        }}>
          {PROMPT}
        </pre>

        {/* Copy 按钮 — Alva Design btn-secondary btn-medium */}
        <button
          onClick={handleCopy}
          style={{
            width: '100%',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 40, padding: '9px 20px', gap: 8,
            borderRadius: 6,
            border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
            background: 'transparent',
            color: 'var(--text-n9, rgba(0,0,0,0.9))',
            fontSize: 14, fontWeight: 500, lineHeight: '22px', letterSpacing: '0.14px',
            fontFamily: "'Delight', sans-serif",
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text-n9, rgba(0,0,0,0.9))')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line-l3, rgba(0,0,0,0.3))')}
        >
          <img src={copied ? 'https://alva-ai-static.b-cdn.net/icons/check-l1.svg' : 'https://alva-ai-static.b-cdn.net/icons/copy-l.svg'} width={18} height={18} alt={copied ? 'copied' : 'copy'} />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
