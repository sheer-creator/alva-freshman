import ReactMarkdown from "react-markdown";
import { WidgetContainer } from "../app/components/alva-ui-kit";
import { MARKDOWN_COMPONENTS } from "@/lib/markdown-components";

export function MarkdownWidget() {
  const content = `# NVDA Weekly News Summary (Feb 6-12, 2026)

## Key Headlines

### Earnings Beat Expectations
- **Q4 2025 Results**: Revenue $38.7B (+15% YoY), EPS $6.85 (vs $6.20 expected)
- **Data Center Revenue**: $32.1B, representing 83% of total revenue
- **Guidance**: Q1 2026 revenue expected at $41-43B

### AI Chip Developments
- Announced **Blackwell Ultra** architecture for late 2026 release
- Partnership expansion with major cloud providers (AWS, Azure, GCP)
- New AI accelerator for edge computing devices

### Stock Performance
- Week high: $1,247.50 (+8.2% from previous Friday)
- Analyst upgrades from Morgan Stanley, Goldman Sachs
- Market cap briefly exceeded $3.1T

## Industry Impact
- Competitors (AMD, Intel) responding with new GPU roadmaps
- Supply chain concerns addressed with TSMC capacity expansion
- Regulatory scrutiny in EU regarding AI chip market dominance

## Upcoming Events
- GTC 2026 keynote scheduled for March 18-21
- Expected announcements: Next-gen gaming GPUs, automotive AI solutions
`;

  return (
    <WidgetContainer
      title="NVDA Weekly News Summary"
      timestamp="02/13/2026 09:00"
      height={400}
    >
      <div className="markdown-widget p-4 overflow-auto h-full">
        <ReactMarkdown components={MARKDOWN_COMPONENTS}>{content}</ReactMarkdown>
      </div>
    </WidgetContainer>
  );
}
