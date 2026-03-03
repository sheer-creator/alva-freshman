import type { Components } from 'react-markdown';

/** 标准 Widget Markdown 渲染组件映射（14px 正文尺寸） */
export const MARKDOWN_COMPONENTS: Components = {
  h1: ({ node, ...props }) => <h1 className="text-lg font-medium mb-4 text-[var(--text-n10)]" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-base font-medium mt-5 mb-2 text-[var(--text-n9)]" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-sm font-medium mt-4 mb-2 text-[var(--text-n9)]" {...props} />,
  h4: ({ node, ...props }) => <h4 className="text-sm font-medium mt-3 mb-2 text-[var(--text-n9)]" {...props} />,
  h5: ({ node, ...props }) => <h5 className="text-sm font-medium mt-3 mb-1 text-[var(--text-n9)]" {...props} />,
  p: ({ node, ...props }) => <p className="text-sm leading-[22px] mb-2 text-[var(--text-n7)]" {...props} />,
  ul: ({ node, ...props }) => <ul className="ml-5 mb-2 list-disc" {...props} />,
  ol: ({ node, ...props }) => <ol className="ml-5 mb-2 list-decimal" {...props} />,
  li: ({ node, ...props }) => <li className="text-sm leading-[22px] mb-1 text-[var(--text-n7)]" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-medium text-[var(--text-n10)]" {...props} />,
  a: ({ node, ...props }) => <a className="text-[var(--main-m2)] no-underline hover:underline" {...props} />,
};
