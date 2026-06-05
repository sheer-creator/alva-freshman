import { useState } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { TimelineConnectorLine, TimelineDot } from './TimelineMarkerParts';

const FONT = "font-['Delight',sans-serif]";
const MONO = "font-['JetBrains_Mono',monospace]";

export interface ActivityTraceStep {
  type?: 'bash' | 'read' | 'thinking' | 'search';
  label: string;
  meta?: string;
  lines?: string[];
  duration?: string;
  collapsed?: boolean;
}

const DEFAULT_TRACE_STEPS: ActivityTraceStep[] = [
  {
    type: 'bash',
    label: 'Run Alva skill version check',
    meta: '$ awk \'NR>=3263 && NR<=3400\' "/Users/sheer/Downloads/Test Template/Template-Thesis-standalone.html"',
    duration: '2.3s',
  },
  { type: 'read', label: 'Read .alva.json', duration: '2.3s' },
  { type: 'read', label: 'Get user info', duration: '2.3s' },
  { type: 'read', label: 'Get SDK docs for TSLA feed modules', duration: '2.3s' },
  {
    type: 'thinking',
    label: 'Thinking',
    lines: [
      'The feed is working. Now let me:\n1. Grant public read access to the feed path\n2. Deploy as a cronjob\n3. Release the feed\n4. Build the HTML dashboard\n5. Draft and release the playbook',
      'Let me write the feed script. Note: RSI, MACD, Bollinger use milliseconds for start_time/end_time. OHLCV uses seconds.',
    ],
    duration: '2.3s',
  },
  { type: 'bash', label: 'Upload feed script via JSON body', duration: '2.3s' },
  { type: 'search', label: 'Search web: Elon Musk latest tweets 2026 DOGE Tesla SpaceX xAI', duration: '2.3s' },
];

function TraceMarker({ showLine }: { showLine: boolean }) {
  return (
    <div className="relative h-full w-[14px] shrink-0">
      {showLine && <TimelineConnectorLine />}
      <TimelineDot />
    </div>
  );
}

function TraceDuration({ value }: { value?: string }) {
  return (
    <span className={`${MONO} ml-auto min-w-[44px] shrink-0 text-right text-[10px] leading-[16px] tracking-[-0.2px] text-[var(--text-n5)]`}>
      {value || '2.3s'}
    </span>
  );
}

function TraceBlock({ step }: { step: ActivityTraceStep }) {
  if (step.type === 'bash') {
    const command = step.meta || step.lines?.[0] || '';
    return (
      <div
        className={`${FONT} flex w-full flex-col items-start justify-center gap-[2px] rounded-[4px] px-[12px] py-[8px] text-[12px] leading-[20px] tracking-[0.12px]`}
        style={{ background: 'var(--b-r03)' }}
      >
        <p className="text-[var(--text-n9)]">Bash</p>
        {command && <p className="w-full break-words text-[var(--text-n5)]">{command}</p>}
      </div>
    );
  }

  if (!step.lines?.length) return null;

  return (
    <div className={`${FONT} flex w-full flex-col gap-[8px] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
      {step.lines.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap break-words">{line}</p>
      ))}
    </div>
  );
}

function TraceStep({ step, showLine }: { step: ActivityTraceStep; showLine: boolean }) {
  const showContent = (step.lines && step.lines.length > 0) || (step.type === 'bash' && !!step.meta);
  const [expanded, setExpanded] = useState(!step.collapsed);

  return (
    <div className="flex w-full items-center gap-[8px]">
      <div className="flex flex-row items-center self-stretch">
        <TraceMarker showLine={showLine} />
      </div>
      {showContent ? (
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px]">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-[4px] border-0 bg-transparent p-0 text-left"
            onClick={() => setExpanded(value => !value)}
            aria-expanded={expanded}
          >
            <span className={`${FONT} min-w-0 shrink truncate text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
              {step.label}
            </span>
            <CdnIcon name={expanded ? 'arrow-down-l2' : 'arrow-right-l2'} size={12} color="var(--text-n5)" />
            <TraceDuration value={step.duration} />
          </button>
          <div
            className="w-full"
            style={{
              display: 'grid',
              gridTemplateRows: expanded ? '1fr' : '0fr',
              opacity: expanded ? 1 : 0,
              transform: expanded ? 'translateY(0)' : 'translateY(-2px)',
              transition: 'grid-template-rows 220ms cubic-bezier(0.32,0.72,0,1), opacity 180ms ease, transform 220ms cubic-bezier(0.32,0.72,0,1)',
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <TraceBlock step={step} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-[8px]">
          <span className={`${FONT} min-w-0 shrink truncate text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
            {step.label}
          </span>
          <TraceDuration value={step.duration} />
        </div>
      )}
    </div>
  );
}

export function ActivityTrace({
  summary,
  steps = DEFAULT_TRACE_STEPS,
  defaultExpanded = false,
}: {
  summary?: string;
  steps?: ActivityTraceStep[];
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const resolvedSummary = summary || `Ran ${Math.max(steps.length, 1)} commands, searched code, read a file`;

  return (
    <div className="flex w-full flex-col items-start gap-[12px]">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-[4px] border-0 bg-transparent p-0 text-left"
        onClick={() => setExpanded(value => !value)}
        aria-expanded={expanded}
      >
        <span className={`${FONT} shrink-0 text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
          {resolvedSummary}
        </span>
        <CdnIcon name={expanded ? 'arrow-down-l2' : 'arrow-right-l2'} size={12} color="var(--text-n5)" />
      </button>

      <div
        className="w-full"
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          opacity: expanded ? 1 : 0,
          transform: expanded ? 'translateY(0)' : 'translateY(-2px)',
          transition: 'grid-template-rows 240ms cubic-bezier(0.32,0.72,0,1), opacity 180ms ease, transform 240ms cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex w-full flex-col items-start gap-[12px]">
            {steps.map((step, index) => (
              <TraceStep
                key={`${step.label}-${index}`}
                step={step}
                showLine={index < steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
