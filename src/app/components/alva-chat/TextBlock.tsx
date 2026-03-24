/**
 * [INPUT]: content string (markdown), optional streaming props
 * [OUTPUT]: 流式 Markdown 文本块
 * [POS]: alva-chat — Agent 文本输出渲染
 */

import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MD_FONT = "'Delight', 'Helvetica Neue', Arial, sans-serif";
const MD_MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";

/* ========== Copy Button ========== */

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute', top: 6, right: 6,
        width: 26, height: 26, borderRadius: 5, border: 'none',
        background: copied ? 'rgba(73,163,166,0.15)' : 'rgba(0,0,0,0.04)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
        opacity: copied ? 1 : 0.6,
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.opacity = '0.6'; }}
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#49A3A6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M8 1H3c-.55 0-1 .45-1 1v7h1V2h5V1zm2 2H5c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm0 8H5V4h5v7z" fill="rgba(0,0,0,0.4)" /></svg>
      )}
    </button>
  );
}

/* ========== Code Block with copy ========== */

function CodeBlock(props: Record<string, unknown>) {
  const extractText = () => {
    const el = document.createElement('div');
    el.innerHTML = String((props as { children?: React.ReactNode }).children ?? '');
    return el.textContent ?? '';
  };
  return (
    <div style={{ position: 'relative', margin: '8px 0' }}>
      <pre style={{
        background: 'var(--grey-g01)', color: 'var(--text-n9)', padding: '14px 16px',
        borderRadius: 8, overflow: 'auto',
        fontFamily: MD_MONO, fontSize: 12, lineHeight: '19px',
        border: '1px solid rgba(0,0,0,0.06)', margin: 0,
      }}>
        {(props as { children?: React.ReactNode }).children}
      </pre>
      <CopyButton getText={extractText} />
    </div>
  );
}

/* ========== Table with copy ========== */

function TableBlock(props: Record<string, unknown>) {
  const extractText = () => {
    const table = document.querySelector('[data-md-table]');
    if (!table) return '';
    const rows = table.querySelectorAll('tr');
    return Array.from(rows).map(r =>
      Array.from(r.querySelectorAll('th,td')).map(c => c.textContent).join('\t')
    ).join('\n');
  };
  return (
    <div style={{ position: 'relative', overflowX: 'auto', margin: '8px 0' }}>
      <table
        {...(props as React.TableHTMLAttributes<HTMLTableElement>)}
        data-md-table
        style={{
          borderCollapse: 'collapse', fontSize: 13, fontFamily: MD_FONT, width: '100%',
        }}
      />
      <CopyButton getText={extractText} />
    </div>
  );
}

/* ========== MD Components ========== */

const MD_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  p: (props) => <p {...props} style={{ margin: '0 0 8px', fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: 'var(--text-n9)', fontFamily: MD_FONT, whiteSpace: 'pre-wrap' as const }} />,
  strong: (props) => <strong {...props} style={{ fontWeight: 600, color: 'var(--text-n9)' }} />,
  em: (props) => <span {...props} />,
  h2: (props) => <h2 {...props} style={{ margin: '16px 0 8px', fontSize: 16, lineHeight: '24px', fontWeight: 600, color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  h3: (props) => <h3 {...props} style={{ margin: '12px 0 6px', fontSize: 15, lineHeight: '22px', fontWeight: 500, color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  code: (props) => {
    const hasLang = typeof props.className === 'string' && props.className.includes('language-');
    /* code block 内的 <code>（有 language- class 或无 class 但由 <pre> 包裹）不加 inline 样式 */
    if (hasLang || !props.className) {
      /* react-markdown: block code = <pre><code>; inline code = <code> without <pre> parent.
         无 className 时可能是 block code 或 inline code，通过 node 属性区分。
         但最简单：block code 的 children 通常是多行字符串 */
      const text = String((props as { children?: React.ReactNode }).children ?? '');
      if (hasLang || text.includes('\n')) return <code {...props} />;
    }
    return (
      <code {...props} style={{
        background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4,
        fontFamily: MD_MONO, fontSize: 12, color: 'rgba(0,0,0,0.7)',
      }} />
    );
  },
  pre: CodeBlock,
  ul: (props) => <ul {...props} style={{ margin: '6px 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4, listStyleType: 'disc' }} />,
  ol: (props) => <ol {...props} style={{ margin: '6px 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4, listStyleType: 'decimal' }} />,
  li: (props) => <li {...props} style={{ fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  a: (props) => <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} style={{ color: '#49A3A6', textDecoration: 'underline', textUnderlineOffset: 3 }} target="_blank" rel="noopener noreferrer" />,
  blockquote: (props) => <div {...(props as React.HTMLAttributes<HTMLDivElement>)} style={{ margin: '8px 0', fontSize: 14, lineHeight: '22px', color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  table: TableBlock,
  th: (props) => <th {...(props as React.ThHTMLAttributes<HTMLTableCellElement>)} style={{ textAlign: 'left', padding: '6px 12px', borderBottom: '1px solid rgba(0,0,0,0.1)', fontWeight: 600, fontSize: 12, color: 'var(--text-n5)' }} />,
  td: (props) => <td {...(props as React.TdHTMLAttributes<HTMLTableCellElement>)} style={{ padding: '6px 12px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 13 }} />,
};

/* ========== TextBlock ========== */

interface TextBlockProps {
  content: string;
  streamedLength?: number;
}

export function TextBlock({ content, streamedLength }: TextBlockProps) {
  const visible = streamedLength != null ? content.slice(0, streamedLength) : content;
  return (
    <div style={{ padding: '4px 0' }}>
      <Markdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>{visible}</Markdown>
    </div>
  );
}
