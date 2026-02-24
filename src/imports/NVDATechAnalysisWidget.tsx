import ReactMarkdown from "react-markdown";
import { WidgetContainer } from "../app/components/alva-ui-kit";

export function NVDATechAnalysisWidget() {
  const content = `# NVDA Technical Analysis (Feb 13, 2026)

## Price Action

### Current Levels
- **Current Price**: $1,247.50 (+2.3% today)
- **52-Week High**: $1,285.00 (Jan 2026)
- **52-Week Low**: $892.50 (Mar 2025)
- **All-Time High**: $1,285.00

### Support & Resistance
- **Key Resistance**: $1,280 - $1,300
- **Key Support**: $1,180 - $1,200
- **Secondary Support**: $1,120 - $1,140

## Technical Indicators

### Momentum
- **RSI (14)**: 68.2 (approaching overbought)
- **MACD**: Bullish crossover (Feb 10)
- **Stochastic**: 75.3 (overbought territory)

### Moving Averages
- **20-Day MA**: $1,215 (bullish crossover)
- **50-Day MA**: $1,180 (strong support)
- **200-Day MA**: $1,085 (long-term uptrend intact)

## Volume Analysis
- **Today's Volume**: 42.5M (above 50-day average)
- **Accumulation/Distribution**: Positive trend
- **On-Balance Volume**: Steadily increasing

## Outlook
**Short-term**: Bullish momentum with potential consolidation near $1,250
**Medium-term**: Target $1,320 if breaks above $1,285 resistance
**Risk**: Watch for reversal signals if RSI stays above 70
`;

  return (
    <WidgetContainer
      title="NVDA Tech Analysis Summary"
      timestamp="02/13/2026 09:30"
      height={400}
    >
      <div className="markdown-widget p-4 overflow-auto h-full">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-lg font-medium mb-4 text-[var(--text-n10)]" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-base font-medium mt-5 mb-2 text-[var(--text-n9)]" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-sm font-medium mt-4 mb-2 text-[var(--text-n9)]" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-sm font-medium mt-3 mb-2 text-[var(--text-n9)]" {...props} />
            ),
            h5: ({ node, ...props }) => (
              <h5 className="text-sm font-medium mt-3 mb-1 text-[var(--text-n9)]" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-sm leading-[22px] mb-2 text-[var(--text-n7)]" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="ml-5 mb-2 list-disc" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="ml-5 mb-2 list-decimal" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-sm leading-[22px] mb-1 text-[var(--text-n7)]" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-medium text-[var(--text-n10)]" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-[var(--main-m2)] no-underline hover:underline" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </WidgetContainer>
  );
}
