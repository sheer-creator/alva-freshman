/**
 * [INPUT]: react-markdown
 * [OUTPUT]: NVDA 投资逻辑分析 Markdown 卡片
 * [POS]: Widget 层 — NVDA 全景看板投资观点
 */

import ReactMarkdown from 'react-markdown';

const content = `## Investment Thesis

### Bull Case

**AI Infrastructure Monopoly** — NVDA controls ~85% of the data center AI accelerator market. The H200/B100/B200 product cycle is driving unprecedented demand from hyperscalers (MSFT, GOOG, META, AMZN), with order backlogs extending into FY2027.

**Revenue Inflection** — Data Center revenue grew 78% YoY to $130B+ TTM. The transition to Blackwell architecture (B100/B200) supports continued 30%+ growth through FY2027.

**Margin Expansion** — Gross margins stabilized at 75%+ as supply constraints ease and the product mix shifts toward higher-ASP Blackwell GPUs.

### Bear Case

**Valuation Stretch** — At 42x forward P/E, the stock prices in near-flawless execution. Any demand deceleration could trigger multiple compression.

**Customer Concentration** — Top 4 hyperscalers represent ~50% of Data Center revenue. Capex cycle slowdown or shift to custom ASICs (Google TPU, Amazon Trainium) poses risk.

**China Export Controls** — U.S. export restrictions limit NVDA's access to the Chinese market (~$8-10B annual revenue at risk).

### Catalysts Ahead

- **Q4 FY2026 Earnings** (Feb 26) — Blackwell ramp update
- **GTC 2026** (Mar) — Next-gen architecture reveal
- **B300 Sampling** (Q2 2026) — 3nm node product cycle
`;

/* ========== Markdown 渲染器 ========== */

const components = {
  h2: ({ node, ...props }: any) => <h2 className="text-[15px] font-medium mb-[12px] text-[var(--text-n10)]" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-[13px] font-medium mt-[16px] mb-[8px] text-[var(--text-n9)]" {...props} />,
  p:  ({ node, ...props }: any) => <p className="text-[12px] leading-[20px] mb-[8px] text-[var(--text-n7)]" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="ml-4 mb-[8px] list-disc" {...props} />,
  li: ({ node, ...props }: any) => <li className="text-[12px] leading-[20px] mb-[4px] text-[var(--text-n7)]" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-medium text-[var(--text-n9)]" {...props} />,
};

export function NVDAInvestmentThesisWidget() {
  return (
    <div className="flex flex-col gap-[16px] h-[420px] w-full relative rounded-[4px]">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          NVDA Investment Thesis
        </p>
        <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px] ml-auto">
          Alva Research
        </p>
      </div>

      {/* Body - g01 background */}
      <div
        className="flex-1 min-h-0 relative rounded-[6px] w-full overflow-auto p-[20px]"
        style={{ backgroundColor: 'var(--grey-g01)' }}
      >
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
        <div className="absolute bottom-[16px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-medium text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
