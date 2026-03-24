/**
 * [INPUT]: content string (markdown), optional streaming props
 * [OUTPUT]: 流式 Markdown 文本块
 * [POS]: alva-chat — Agent 文本输出渲染
 */

import Markdown from 'react-markdown';

const MD_FONT = "'Delight', 'Helvetica Neue', Arial, sans-serif";
const MD_MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";

const MD_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  p: (props) => <p {...props} style={{ margin: '0 0 8px', fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: 'var(--text-n9)', fontFamily: MD_FONT, whiteSpace: 'pre-wrap' as const }} />,
  strong: (props) => <strong {...props} style={{ fontWeight: 600, color: 'var(--text-n9)' }} />,
  em: (props) => <em {...props} />,
  h2: (props) => <h2 {...props} style={{ margin: '16px 0 8px', fontSize: 16, lineHeight: '24px', fontWeight: 600, color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  h3: (props) => <h3 {...props} style={{ margin: '12px 0 6px', fontSize: 15, lineHeight: '22px', fontWeight: 500, color: 'var(--text-n9)', fontFamily: MD_FONT }} />,
  code: (props) => (
    <code {...props} style={{ background: 'rgba(0,0,0,0.05)', padding: '1px 8px', borderRadius: 3, fontFamily: MD_MONO, fontSize: 13 }} />
  ),
  pre: (props) => (
    <pre {...props} style={{ background: 'rgba(0,0,0,0.03)', padding: '12px 16px', borderRadius: 6, overflow: 'auto', margin: '8px 0', fontFamily: MD_MONO, fontSize: 13, lineHeight: '20px' }} />
  ),
  ul: (props) => <ul {...props} style={{ margin: '4px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }} />,
  ol: (props) => <ol {...props} style={{ margin: '4px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, counterReset: 'ol-counter' }} />,
  li: (props) => <li {...props} style={{ fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', color: 'var(--text-n9)', fontFamily: MD_FONT, position: 'relative' as const, paddingLeft: 24 }} />,
  a: (props) => <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} style={{ color: 'var(--main-m1)', textDecoration: 'underline', textUnderlineOffset: 3 }} target="_blank" rel="noopener noreferrer" />,
  blockquote: (props) => <blockquote {...props} style={{ margin: '8px 0', paddingLeft: 16, borderLeft: '3px solid var(--main-m1)', color: 'var(--text-n5)' }} />,
  table: (props) => (
    <div style={{ overflowX: 'auto', margin: '8px 0' }}>
      <table {...(props as React.TableHTMLAttributes<HTMLTableElement>)} style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: MD_FONT, width: '100%' }} />
    </div>
  ),
  th: (props) => <th {...(props as React.ThHTMLAttributes<HTMLTableCellElement>)} style={{ textAlign: 'left', padding: '6px 12px', borderBottom: '1px solid var(--line-l2)', fontWeight: 600, fontSize: 13, color: 'var(--text-n5)' }} />,
  td: (props) => <td {...(props as React.TdHTMLAttributes<HTMLTableCellElement>)} style={{ padding: '6px 12px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 13 }} />,
};

interface TextBlockProps {
  content: string;
  streamedLength?: number;
}

export function TextBlock({ content, streamedLength }: TextBlockProps) {
  const visible = streamedLength != null ? content.slice(0, streamedLength) : content;
  return (
    <div style={{ padding: '4px 0' }}>
      <Markdown components={MD_COMPONENTS}>{visible}</Markdown>
    </div>
  );
}
