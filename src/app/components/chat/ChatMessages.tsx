import { useState } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import DotMatrixWave from '../shared/DotMatrixWave';
import { useChatContext } from './ChatContext';
import { StreamingMessages } from './StreamingMessages';

/* ── Mock conversation data ── */
const MOCK_USER_MSG = `Build me an NVDA earnings dashboard — I want to see quarterly revenue, gross margin trends, and a forward P/E comparison with AMD and INTC.`;

const MOCK_BULLETS = [
  { bold: 'Revenue Trend', text: ' — bar chart, quarterly data, color-coded by segment' },
  { bold: 'Gross Margin', text: ' — line chart with 73% current highlight and historical band' },
  { bold: 'Forward P/E Comparison', text: ' — horizontal bar (NVDA vs AMD vs INTC)' },
];

const MOCK_TABLE = {
  headers: ['KPI', 'Value', 'Context'],
  rows: [
    ['Q4 Revenue', '$35.1B', '+265% YoY, driven by data center'],
    ['Gross Margin', '73.0%', 'Up from 64.6% a year ago'],
    ['Forward P/E', '32.4x', 'vs AMD 28.1x, INTC 18.7x'],
  ],
};

const MOCK_REASON_STEPS: { label: string; meta?: string; lines?: string[] }[] = [
  {
    label: 'Plan',
    meta: 'NVDA Earnings Dashboard',
    lines: [
      '1. Thoroughly explore the codebase to understand existing architecture',
      '2. Identify similar features and architectural approaches',
      '3. Consider multiple approaches and their trade-offs',
      '4. Use AskUserQuestion if you need to clarify the approach',
    ],
  },
  { label: 'Read', meta: '/src/app/components/shell/AppShell.tsx', lines: ['Read 112 lines'] },
  {
    label: 'Bash',
    meta: 'ls /Users/sheer/Downloads/Test/.claude/launch.json',
    lines: [
      '7:<<<<<<< Updated upstream',
      '9:========',
      '11:>>>>>>> Stashed changes',
      '29:<<<<<<< Updated upstream',
    ],
  },
  { label: 'Read', meta: '/src/styles/theme.css', lines: ['Read 48 lines'] },
  { label: 'Read', meta: '/src/lib/chart-config.ts', lines: ['Read 76 lines'] },
  { label: 'Bash', meta: 'npm run build', lines: ['Build completed in 3.2s'] },
  { label: 'Read', meta: '/src/app/components/widgets/KpiCard.tsx', lines: ['Read 94 lines'] },
  { label: 'Answer', meta: 'Generating NVDA earnings dashboard layout' },
];

const MONO = "font-['JetBrains_Mono',monospace]";

const DASHBOARD_COVER_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 472 266" fill="none">
<rect width="472" height="266" fill="#fafafa"/>
<defs><pattern id="d" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".5" fill="rgba(0,0,0,.12)"/></pattern></defs>
<rect x="12" y="28" width="218" height="140" rx="4" fill="white"/><rect x="12" y="28" width="218" height="140" rx="4" fill="url(#d)"/>
<text x="16" y="24" font-size="7" fill="rgba(0,0,0,.9)" font-family="sans-serif">NVDA Google Trend</text>
<polyline points="30,148 55,140 80,132 105,125 130,118 155,112 180,106 195,103 210,94" stroke="#49A3A6" stroke-width="1" fill="none"/>
<path d="M30,148 55,140 80,132 105,125 130,118 155,112 180,106 195,103 210,94 210,160 30,160Z" fill="rgba(73,163,166,.1)"/>
<rect x="242" y="28" width="218" height="140" rx="4" fill="white"/><rect x="242" y="28" width="218" height="140" rx="4" fill="url(#d)"/>
<text x="246" y="24" font-size="7" fill="rgba(0,0,0,.9)" font-family="sans-serif">AI Storage Key Word Trends</text>
<rect x="290" y="36" width="142" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="52" width="132" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="68" width="123" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="84" width="112" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="100" width="102" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="116" width="93" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="132" width="82" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="290" y="148" width="72" height="10" rx="1" fill="#49A3A6" opacity=".85"/>
<rect x="12" y="186" width="448" height="72" rx="4" fill="white"/><rect x="12" y="186" width="448" height="72" rx="4" fill="url(#d)"/>
<text x="16" y="182" font-size="7" fill="rgba(0,0,0,.9)" font-family="sans-serif">DRAM Price Trend</text>
<polyline points="30,248 80,247 130,246 180,245 230,244 280,242 330,238 380,228 430,210" stroke="#49A3A6" stroke-width="1" fill="none"/>
<polyline points="30,250 80,250 130,249 180,249 230,249 280,248 330,247 380,246 430,244" stroke="#FF9800" stroke-width="1" fill="none"/>
<text x="16" y="162" font-size="6" fill="rgba(0,0,0,.15)" font-family="sans-serif" font-weight="500">Alva</text>
<text x="246" y="162" font-size="6" fill="rgba(0,0,0,.15)" font-family="sans-serif" font-weight="500">Alva</text>
<text x="16" y="252" font-size="6" fill="rgba(0,0,0,.15)" font-family="sans-serif" font-weight="500">Alva</text>
</svg>`)}`;

function PlaybookCard({ sourceThreadId }: { sourceThreadId?: string }) {
  const handleClick = () => {
    if (sourceThreadId) {
      sessionStorage.setItem('openChatWithThread', sourceThreadId);
    }
    window.location.hash = 'trends';
  };
  return (
    <div
      className="flex flex-col items-start overflow-clip w-[360px] shrink-0 cursor-pointer hover:shadow-l transition-shadow"
      style={{ border: '0.5px solid rgba(0,0,0,0.3)', borderRadius: 12, padding: 4, background: 'white' }}
      onClick={handleClick}
    >
      <div className="relative shrink-0 w-full" style={{ aspectRatio: '472 / 265.5' }}>
        <div className="absolute inset-0 rounded-[8px] overflow-hidden">
          <img src={DASHBOARD_COVER_SVG} alt="Dashboard preview" className="absolute top-0 left-0 w-full h-full block" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <div className="flex flex-col gap-[12px] pt-[16px] pb-[12px] px-[16px] w-full">
        <div className="flex flex-col gap-[4px] w-full">
          <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] overflow-hidden whitespace-nowrap text-ellipsis h-[28px]">
            Google / X Trends Tracker
          </p>
          <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] overflow-hidden h-[44px]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
            Track NVDA Google trends, AI storage keyword popularity, and DRAM pricing across DDR4/DDR5 with real-time data from multiple sources.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReasonedStepsDivider() {
  const [expanded, setExpanded] = useState(false);
  const FONT = "font-['Delight',sans-serif]";

  return (
    <div className="w-full flex flex-col">
      <div
        className="flex items-center gap-[8px] w-full cursor-pointer"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex-1 h-0" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }} />
        <div className="flex items-center gap-[4px]">
          <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
            Reasoned · {MOCK_REASON_STEPS.length} steps
          </span>
          <CdnIcon
            name={expanded ? 'arrow-down-l2' : 'arrow-right-l2'}
            size={12}
            color="rgba(0,0,0,0.5)"
          />
        </div>
        <div className="flex-1 h-0" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }} />
      </div>
      {expanded && (
        <div className="flex flex-col gap-[16px] w-full mt-[12px]">
          {MOCK_REASON_STEPS.map((step, i) => (
            <div key={i} className="flex gap-[8px] items-start w-full">
              <div className="relative shrink-0 w-[12px] self-stretch">
                <div className="absolute left-1/2 top-[2px] bottom-[2px] w-0 -translate-x-1/2"
                  style={{ borderLeft: '1px dashed rgba(0,0,0,0.12)' }} />
              </div>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <div className="flex items-center gap-[8px] w-full">
                  <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)] shrink-0`}>
                    {step.label}
                  </span>
                  {step.meta && (
                    <div className="flex items-center justify-center max-w-[640px] px-[6px] py-[1px] rounded-[2px] min-w-0"
                      style={{ background: 'rgba(0,0,0,0.03)' }}>
                      <span className={`${MONO} text-[10px] leading-[16px] text-[var(--text-n5)] truncate`}>
                        {step.meta}
                      </span>
                    </div>
                  )}
                </div>
                {step.lines && step.lines.length > 0 && (
                  <div className={`${MONO} text-[10px] leading-[16px] text-[var(--text-n5)] flex-1 min-w-0`}>
                    {step.lines.map((line, li) => (
                      <p key={li} className="leading-[16px] mb-0">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MockConversation({ sourceThreadId }: { sourceThreadId?: string }) {
  return (
    <>
      <div className="flex flex-col items-end w-full">
        <div className="w-full max-w-[560px] px-[16px] py-[12px]" style={{ background: 'rgba(73,163,166,0.1)', borderRadius: 8 }}>
          <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">{MOCK_USER_MSG}</p>
        </div>
      </div>
      <ReasonedStepsDivider />
      <div className="flex items-center gap-[4px] shrink-0">
        <img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva" style={{ height: 14 }} />
        <span className="font-['Delight',sans-serif] text-[10px] leading-[14px] px-[4px] py-[1px]" style={{ background: 'rgba(73,163,166,0.1)', color: 'var(--main-m1)', borderRadius: 3 }}>Beta</span>
      </div>
      <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full">
        Building the <span className="font-medium text-[14px] leading-[22px] tracking-[0.14px]">3-Widget Grid</span> layout:
      </p>
      <div className="flex flex-col gap-[8px] w-full">
        {MOCK_BULLETS.map((b) => (
          <div key={b.bold} className="flex items-start w-full">
            <div className="w-[24px] h-[26px] flex items-center justify-center shrink-0">
              <div className="size-[5px] rounded-full bg-[var(--text-n9)]" />
            </div>
            <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] flex-1">
              <span className="font-medium">{b.bold}</span>{b.text}
            </p>
          </div>
        ))}
      </div>
      <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)] w-full">Dashboard is ready. Here's a summary:</p>
      <div className="flex w-full overflow-x-auto">
        {MOCK_TABLE.headers.map((header, ci) => (
          <div key={header} className="flex flex-col flex-1 min-w-[108px]">
            <div className="py-[12px] pr-[12px]">
              <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n7)] truncate">{header}</p>
            </div>
            {MOCK_TABLE.rows.map((row) => (
              <div key={row[0]} className="py-[12px] pr-[12px]" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">{row[ci]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-[4px]">
        <span className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">Source:</span>
        <span className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n7)] underline decoration-dotted cursor-pointer" onClick={() => { if (sourceThreadId) sessionStorage.setItem('openChatWithThread', sourceThreadId); window.location.hash = 'trends'; }}>BTC Ultimate AI Trader</span>
        <CdnIcon name="go-l" size={16} />
      </div>
      <PlaybookCard sourceThreadId={sourceThreadId} />
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-0 w-full relative overflow-hidden">
      <DotMatrixWave
        enableHover={false}
        bgColor="#ffffff"
        dotColor="#d1e0e0"
        waveSpeed={0.6}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, white 70%)' }} />
      <p className="font-['Delight',sans-serif] text-[22px] leading-[32px] tracking-[0.22px] text-[var(--text-n9)] text-center relative z-10 px-[40px]">
        Turn Ideas into Live<br />Investing Playbooks in Minutes
      </p>
    </div>
  );
}

interface ChatMessagesProps {
  conversationId: string;
  hasContent?: boolean;
}

export function ChatMessages({ conversationId, hasContent }: ChatMessagesProps) {
  const { streamingState, pendingPrompt } = useChatContext();
  const showContent = hasContent ?? (conversationId !== 'new');

  if (!showContent) return <EmptyState />;

  // Show streaming conversation
  if (conversationId === 'streaming' && streamingState) {
    return (
      <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full">
        {/* User prompt bubble */}
        {pendingPrompt && (
          <div className="flex flex-col items-end w-full">
            <div className="w-full max-w-[560px] px-[16px] py-[12px]" style={{ background: 'rgba(73,163,166,0.1)', borderRadius: 8 }}>
              <p className="font-['Delight',sans-serif] text-[16px] leading-[26px] tracking-[0.16px] text-[var(--text-n9)]">{pendingPrompt}</p>
            </div>
          </div>
        )}
        <StreamingMessages state={streamingState} />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-[16px] items-start min-h-0 w-full">
      <MockConversation sourceThreadId={conversationId} />
    </div>
  );
}
