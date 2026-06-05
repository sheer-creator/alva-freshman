import { useState, useEffect, useRef } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { AlvaLoading } from '../shared/AlvaLoading';
import alvaLogo from './logo-green-black.svg';
import { TimelineConnectorLine, TimelineDot } from './TimelineMarkerParts';

/* ━━ Types ━━ */
export type StepType = 'plan' | 'bash' | 'read' | 'answer' | 'thinking' | 'search';
export type TodoStatus = 'done' | 'loading' | 'pending';

export interface StreamStep {
  type: StepType;
  label: string;
  meta?: string;
  lines?: string[];
  collapsed?: boolean;
  duration?: string;
}

export interface TodoItem {
  text: string;
  status: TodoStatus;
}

export interface AnswerOption {
  title: string;
  description: string;
}

export interface AnswerQuestion {
  question: string;
  currentStep: string;
  options: AnswerOption[];
  selectedIndex?: number;
  customInput?: string;
}

export interface ReviewPlan {
  title: string;
  steps: string[];
}

export interface StreamingState {
  steps: StreamStep[];
  todos?: { title: string; progress: string; items: TodoItem[] };
  answer?: AnswerQuestion;
  plan?: ReviewPlan;
  textContent?: string;
  isStreaming: boolean;
  statusText?: string;
  stepsCompleted?: boolean;
  thinking?: boolean;
}

/* ━━ Shared styles ━━ */
const FONT = "font-['Delight',sans-serif]";
const MONO = "font-['JetBrains_Mono',monospace]";

const STREAM_TIMELINE_CSS = `
@keyframes stream-loading-text {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.82; }
}
`;

function AgentBubbleLogo() {
  return (
    <div className="flex shrink-0 self-start items-center">
      <img
        src={alvaLogo}
        alt="Alva"
        style={{ height: 12, width: 47 }}
      />
    </div>
  );
}

/* ━━ Thinking indicator with Alva lottie 14×14 ━━ */
function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-[8px] w-full">
      <style>{STREAM_TIMELINE_CSS}</style>
      <AlvaLoading size={14} />
      <span
        className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}
        style={{ animation: 'stream-loading-text 1.4s ease-in-out infinite' }}
      >
        Thinking...
      </span>
    </div>
  );
}

function StepDuration({ value }: { value?: string }) {
  return (
    <span className={`${MONO} ml-auto min-w-[44px] shrink-0 text-right text-[10px] leading-[16px] tracking-[-0.2px] text-[var(--text-n5)]`}>
      {value || '2.3s'}
    </span>
  );
}

function TimelineMarker({ active, showLine }: { active: boolean; showLine: boolean }) {
  if (active) {
    return (
      <div className="relative h-full w-[14px] shrink-0">
        {showLine && <TimelineConnectorLine />}
        <AlvaLoading size={14} className="absolute left-0 top-[3px] z-[1]" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-[14px] shrink-0">
      {showLine && <TimelineConnectorLine />}
      <TimelineDot />
    </div>
  );
}

function StepBlock({ step }: { step: StreamStep }) {
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
      {step.lines.map((line, i) => (
        <p key={i} className="whitespace-pre-wrap break-words">{line}</p>
      ))}
    </div>
  );
}

/* ━━ Timeline Step ━━ */
function TimelineStep({ step, active, showLine }: { step: StreamStep; active: boolean; showLine: boolean }) {
  const showContent = (step.lines && step.lines.length > 0) || (step.type === 'bash' && !!step.meta);
  const [expanded, setExpanded] = useState(!step.collapsed);

  return (
    <div className="flex w-full items-center gap-[8px]">
      <div className="flex flex-row items-center self-stretch">
        <TimelineMarker active={active} showLine={showLine} />
      </div>
      {showContent ? (
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px]">
          <button
            type="button"
            className="flex w-full items-center gap-[4px] cursor-pointer bg-transparent border-0 p-0 text-left"
            onClick={() => setExpanded(value => !value)}
            aria-expanded={expanded}
          >
            <span
              className={`${FONT} min-w-0 shrink truncate text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}
              style={active ? { animation: 'stream-loading-text 1.4s ease-in-out infinite' } : undefined}
            >
              {step.label}
            </span>
            <CdnIcon name={expanded ? 'arrow-down-l2' : 'arrow-right-l2'} size={12} color="var(--text-n5)" />
            <StepDuration value={step.duration} />
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
              <StepBlock step={step} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-[8px]">
          <span
            className={`${FONT} min-w-0 shrink truncate text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}
            style={active ? { animation: 'stream-loading-text 1.4s ease-in-out infinite' } : undefined}
          >
            {step.label}
          </span>
          <StepDuration value={step.duration} />
        </div>
      )}
    </div>
  );
}

function GeneratedTimeline({ steps, activeIndex }: { steps: StreamStep[]; activeIndex: number }) {
  const [expanded, setExpanded] = useState(true);

  if (steps.length === 0) return null;
  const commandCount = Math.max(steps.length, 1);

  return (
    <div className="flex w-full flex-col items-start gap-[12px]">
      <style>{STREAM_TIMELINE_CSS}</style>
      <button
        type="button"
        className="flex w-full items-center gap-[4px] cursor-pointer bg-transparent border-0 p-0 text-left"
        onClick={() => setExpanded(value => !value)}
        aria-expanded={expanded}
      >
        <span className={`${FONT} shrink-0 text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
          Ran {commandCount} commands, searched code, read a file
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
            {steps.map((step, i) => (
              <TimelineStep
                key={`${step.label}-${i}`}
                step={step}
                active={i === activeIndex}
                showLine={i < steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━ Spinning loader icon ━━ */
const SPIN_CSS = `@keyframes spin-step { to { transform: rotate(360deg) } }`;

function SpinIcon() {
  return (
    <>
      <style>{SPIN_CSS}</style>
      <div className="shrink-0 size-[16px] flex items-center justify-center">
        <div className="size-[13px] rounded-full"
          style={{
            border: '1.5px solid var(--line-l12)',
            borderTopColor: 'rgba(0,0,0,0.5)',
            animation: 'spin-step 0.8s linear infinite',
          }} />
      </div>
    </>
  );
}

/* ━━ Todo List Card ━━ */
function TodoListCard({ data }: { data: StreamingState['todos'] }) {
  if (!data) return null;
  return (
    <div className="w-full rounded-[12px] overflow-clip flex flex-col gap-[8px] items-start justify-center p-[20px]"
      style={{ background: 'white', border: '0.5px solid var(--line-l2)', boxShadow: 'var(--shadow-xs)' }}>
      <div className="flex gap-[12px] items-center w-full">
        <span className={`${FONT} font-medium text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1 truncate`}>
          {data.title}
        </span>
        <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] shrink-0`}>
          {data.progress}
        </span>
      </div>
      <div className="flex flex-col gap-[4px] w-full overflow-clip rounded-[4px]" style={{ maxHeight: 480 }}>
        {data.items.map((item, i) => (
          <div key={i} className="flex items-start w-full">
            <div className="flex h-[22px] items-center pr-[8px] shrink-0">
              {item.status === 'done' && <CdnIcon name="check-f2" size={16} color="var(--main-m1)" />}
              {item.status === 'loading' && <SpinIcon />}
              {item.status === 'pending' && <div className="size-[16px] rounded-full" style={{ border: '1.5px solid var(--line-l12)' }} />}
            </div>
            <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] flex-1 min-w-0 ${
              item.status === 'done' ? 'line-through text-[var(--text-n5)]' : 'text-[var(--text-n7)]'
            }`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━ Review Plan Card ━━ */
function ReviewPlanCard({ data, onApprove }: { data: ReviewPlan; onApprove?: () => void }) {
  return (
    <div className="w-full flex flex-col items-start gap-[4px]">
      <div className="flex w-full flex-col gap-[8px]">
        <div className="rounded-[8px] overflow-clip flex flex-col"
          style={{ background: 'white', border: '0.5px solid var(--line-l2)', boxShadow: 'var(--shadow-xs)' }}>
          <div className="flex items-center px-[20px] py-[12px]"
            style={{ background: 'var(--b-r02)' }}>
            <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
              Review Alva's plan
            </span>
          </div>
          <div className="flex flex-col gap-[8px] p-[20px]">
            <p className={`${FONT} font-medium text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
              {data.title}
            </p>
            <div className="flex flex-col gap-[4px]">
              {data.steps.map((s, i) => (
                <div key={i} className="flex items-start">
                  <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] w-[20px] shrink-0 text-center`}>
                    {i + 1}.
                  </span>
                  <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[8px] overflow-clip flex flex-col p-[8px]"
          style={{ background: 'white', border: '0.5px solid var(--line-l2)', boxShadow: 'var(--shadow-xs)' }}>
          <button
            className="flex gap-[8px] items-center p-[12px] rounded-[6px] w-full cursor-pointer transition-opacity hover:opacity-80"
            style={{ background: 'var(--main-m1-10)' }}
            onClick={onApprove}
          >
            <CdnIcon name="check-f2" size={18} color="var(--main-m1)" />
            <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1 text-left`}>
              Approve Alva's plan and start coding
            </span>
            <CdnIcon name="enter-l" size={18} color="var(--text-n5)" />
          </button>
          <div className="flex gap-[8px] items-center p-[12px]">
            <CdnIcon name="edit-l1" size={18} color="var(--text-n5)" />
            <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]`}>
              Tell Alva what to do instead
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━ Answer Question Card ━━ */
function AnswerQuestionCard({
  data,
  onSelect,
  onSkip,
}: {
  data: AnswerQuestion;
  onSelect?: (index: number) => void;
  onSkip?: () => void;
}) {
  const [selected, setSelected] = useState(data.selectedIndex ?? -1);

  const handleSelect = (i: number) => {
    setSelected(i);
    onSelect?.(i);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[4px]">
      <div className="w-full rounded-[8px] overflow-clip flex flex-col gap-[16px] items-end justify-center p-[20px]"
        style={{ background: 'white', border: '0.5px solid var(--line-l2)', boxShadow: 'var(--shadow-xs)' }}>
        <div className="flex gap-[12px] items-center w-full">
          <span className={`${FONT} font-medium text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1`}>
            {data.question}
          </span>
          <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] shrink-0`}>
            {data.currentStep}
          </span>
        </div>
        <div className="w-full rounded-[8px] flex flex-col px-[20px]" style={{ background: 'var(--b-r02)' }}>
          {data.options.map((opt, i) => (
            <div
              key={i}
              className={`flex gap-[2px] items-center py-[12px] relative cursor-pointer transition-colors ${i > 0 ? 'border-t' : ''}`}
              style={{ borderColor: 'var(--line-l12)' }}
              onClick={() => handleSelect(i)}
            >
              <div className="flex flex-col gap-[2px] flex-1 min-w-0 relative">
                <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                  {opt.title}
                </span>
                <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] truncate`}>
                  {opt.description}
                </span>
              </div>
              <div className="flex items-center justify-center rounded-[4px] shrink-0 w-[28px] h-[28px] relative"
                style={{ background: selected === i ? 'var(--main-m2)' : 'var(--b-r07)' }}>
                <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] ${selected === i ? 'text-white' : 'text-[var(--text-n5)]'}`}>
                  {i + 1}
                </span>
              </div>
            </div>
          ))}
          <div className="flex gap-[8px] items-center py-[16px] border-t" style={{ borderColor: 'var(--line-l12)' }}>
            <CdnIcon name="edit-l1" size={18} color="var(--text-n5)" />
            <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1`}>
              Tell Alva what to do instead...
            </span>
            <div className="flex items-center justify-center rounded-[4px] shrink-0 w-[28px] h-[28px]"
              style={{ background: 'var(--b-r07)' }}>
              <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
                {data.options.length + 1}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-[8px] items-center justify-end">
          <button
            className="flex items-center justify-center px-[16px] py-[6px] rounded-[4px] w-[80px] cursor-pointer transition-opacity hover:opacity-70"
            style={{ background: 'white', border: '0.5px solid var(--line-l3)' }}
            onClick={onSkip}
          >
            <span className={`${FONT} font-medium text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)]`}>
              Skip
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ━━ Streaming text with cursor blink ━━ */
const BLINK_CSS = `@keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }`;

function StreamingText({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  return (
    <div className="w-full">
      <style>{BLINK_CSS}</style>
      <p className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] whitespace-pre-wrap`}>
        {text}
        {isStreaming && (
          <span className="inline-block w-[2px] h-[14px] ml-[1px] align-middle"
            style={{ background: 'var(--main-m1)', animation: 'blink-cursor 1s step-end infinite' }} />
        )}
      </p>
    </div>
  );
}

/* ━━ Main: StreamingMessages ━━ */
interface StreamingMessagesProps {
  state: StreamingState;
}

export function StreamingMessages({ state }: StreamingMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.steps.length, state.textContent, state.stepsCompleted, state.thinking]);

  const activeIndex = state.stepsCompleted || state.steps.length === 0 ? -1 : state.steps.length - 1;
  const showAgentLogo = state.thinking || state.steps.length > 0 || !!state.textContent;

  return (
    <div className="flex flex-col gap-[16px] items-start w-full">
      {showAgentLogo && <AgentBubbleLogo />}

      {/* Thinking indicator — visible during overlay phases, before steps */}
      {state.thinking && <ThinkingIndicator />}

      {/* Steps follow the Figma Generated format: summary row + vertical timeline. */}
      {state.steps.length > 0 && <GeneratedTimeline steps={state.steps} activeIndex={activeIndex} />}

      {/* Streaming text */}
      {state.textContent && <StreamingText text={state.textContent} isStreaming={state.isStreaming} />}

      <div ref={bottomRef} />
    </div>
  );
}

/* ━━ Exported overlay components ━━ */
export { TodoListCard, ReviewPlanCard, AnswerQuestionCard };
