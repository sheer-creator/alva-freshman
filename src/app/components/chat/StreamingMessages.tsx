import { useState, useEffect, useRef } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { AlvaLoading } from '../shared/AlvaLoading';

/* ━━ Types ━━ */
export type StepType = 'plan' | 'bash' | 'read' | 'answer';
export type TodoStatus = 'done' | 'loading' | 'pending';

export interface StreamStep {
  type: StepType;
  label: string;
  meta?: string;
  lines?: string[];
  collapsed?: boolean;
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

/* ━━ Thinking indicator with Alva lottie 14×14 ━━ */
function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-[8px] w-full">
      <AlvaLoading size={12} />
      <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]`}>
        Thinking...
      </span>
    </div>
  );
}

/* ━━ Timeline Step ━━ */
function TimelineStep({ step }: { step: StreamStep }) {
  const showContent = step.lines && step.lines.length > 0;
  return (
    <div className="flex gap-[8px] items-start w-full">
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
        {showContent && (
          <div className="relative w-full overflow-clip" style={{ maxHeight: step.collapsed ? 64 : undefined }}>
            <div className={`${MONO} text-[10px] leading-[16px] text-[var(--text-n5)] flex-1 min-w-0`}>
              {step.lines!.map((line, i) => (
                <p key={i} className="leading-[16px] mb-0">{line}</p>
              ))}
            </div>
            {step.collapsed && (
              <div className="absolute bottom-0 left-0 right-0 h-[32px]"
                style={{ background: 'linear-gradient(transparent, white)' }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━ Collapsible Steps Divider — title ABOVE expanded content ━━ */
function StepsDivider({ count, children }: { count: number; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {/* Divider row — always visible, clickable */}
      <div
        className="flex items-center gap-[8px] w-full cursor-pointer group"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex-1 h-0" style={{ borderTop: '0.5px solid rgba(0,0,0,0.05)' }} />
        <div className="flex items-center gap-[4px] shrink-0">
          <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
            {count} Steps
          </span>
          <CdnIcon
            name={expanded ? 'arrow-up-l2' : 'arrow-down-l2'}
            size={12}
            color="rgba(0,0,0,0.5)"
          />
        </div>
        <div className="flex-1 h-0" style={{ borderTop: '0.5px solid rgba(0,0,0,0.05)' }} />
      </div>
      {/* Expanded content — BELOW the divider title */}
      {expanded && (
        <div className="flex flex-col gap-[16px] w-full mt-[16px]">
          {children}
        </div>
      )}
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
            border: '1.5px solid rgba(0,0,0,0.12)',
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
      style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
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
              {item.status === 'done' && <CdnIcon name="check-f2" size={16} color="#49A3A6" />}
              {item.status === 'loading' && <SpinIcon />}
              {item.status === 'pending' && <div className="size-[16px] rounded-full" style={{ border: '1.5px solid rgba(0,0,0,0.12)' }} />}
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
    <div className="w-full flex flex-col gap-[8px]">
      <div className="rounded-[12px] overflow-clip flex flex-col"
        style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center px-[20px] py-[12px]"
          style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '0.5px solid rgba(0,0,0,0.12)' }}>
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
      <div className="rounded-[12px] overflow-clip flex flex-col p-[8px]"
        style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <button
          className="flex gap-[8px] items-center p-[12px] rounded-[6px] w-full cursor-pointer transition-opacity hover:opacity-80"
          style={{ background: 'rgba(73,163,166,0.1)' }}
          onClick={onApprove}
        >
          <CdnIcon name="check-f2" size={18} color="#49A3A6" />
          <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1 text-left`}>
            Approve Alva's plan and start coding
          </span>
          <CdnIcon name="enter-l" size={18} color="rgba(0,0,0,0.5)" />
        </button>
        <div className="flex gap-[8px] items-center p-[12px]">
          <CdnIcon name="edit-l1" size={18} color="rgba(0,0,0,0.5)" />
          <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n5)]`}>
            Tell Alva what to do instead
          </span>
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
    <div className="w-full rounded-[12px] overflow-clip flex flex-col gap-[16px] items-end justify-center p-[20px]"
      style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <div className="flex gap-[12px] items-center w-full">
        <span className={`${FONT} font-medium text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1`}>
          {data.question}
        </span>
        <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] shrink-0`}>
          {data.currentStep}
        </span>
      </div>
      <div className="w-full rounded-[8px] flex flex-col" style={{ background: 'rgba(0,0,0,0.02)' }}>
        {data.options.map((opt, i) => (
          <div
            key={i}
            className={`flex gap-[2px] items-center py-[12px] px-[20px] relative cursor-pointer transition-colors ${i > 0 ? 'border-t' : ''}`}
            style={{ borderColor: 'rgba(0,0,0,0.12)' }}
            onClick={() => handleSelect(i)}
          >
            {selected === i && (
              <div className="absolute inset-[-0.5px_-20px_0_-20px]" style={{ background: 'rgba(73,163,166,0.1)' }} />
            )}
            <div className="flex flex-col gap-[2px] flex-1 min-w-0 relative">
              <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)]`}>
                {opt.title}
              </span>
              <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] truncate`}>
                {opt.description}
              </span>
            </div>
            <div className="flex items-center justify-center px-[12px] py-[4px] rounded-[6px] shrink-0 w-[28px] relative"
              style={{ background: selected === i ? '#49A3A6' : 'rgba(0,0,0,0.07)' }}>
              <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] ${selected === i ? 'text-white' : 'text-[var(--text-n5)]'}`}>
                {i + 1}
              </span>
            </div>
          </div>
        ))}
        <div className="flex gap-[8px] items-center py-[16px] px-[20px] border-t" style={{ borderColor: 'rgba(0,0,0,0.12)' }}>
          <CdnIcon name="edit-l1" size={18} color="rgba(0,0,0,0.5)" />
          <span className={`${FONT} text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] flex-1`}>
            Tell Alva what to do instead...
          </span>
          <div className="flex items-center justify-center px-[12px] py-[4px] rounded-[6px] shrink-0 w-[28px]"
            style={{ background: 'rgba(0,0,0,0.07)' }}>
            <span className={`${FONT} text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)]`}>
              {data.options.length + 1}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-[8px] items-center justify-end">
        <button
          className="flex items-center justify-center px-[16px] py-[6px] rounded-[6px] w-[80px] cursor-pointer transition-opacity hover:opacity-70"
          style={{ background: 'white', border: '0.5px solid rgba(0,0,0,0.3)' }}
          onClick={onSkip}
        >
          <span className={`${FONT} font-medium text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n9)]`}>
            Skip
          </span>
        </button>
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
            style={{ background: '#49A3A6', animation: 'blink-cursor 1s step-end infinite' }} />
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

  const stepsContent = state.steps.map((step, i) => (
    <TimelineStep key={i} step={step} />
  ));

  return (
    <div className="flex flex-col gap-[16px] items-start w-full">
      {/* Thinking indicator — visible during overlay phases, before steps */}
      {state.thinking && <ThinkingIndicator />}

      {/* Steps: appear after user decisions, inline while streaming, collapsed when done */}
      {state.stepsCompleted ? (
        <StepsDivider count={state.steps.length}>
          {stepsContent}
        </StepsDivider>
      ) : (
        state.steps.length > 0 && stepsContent
      )}

      {/* Alva badge — formal content header, shown when steps done and text starts */}
      {state.stepsCompleted && !state.thinking && (state.textContent || !state.isStreaming) && (
        <div className="flex items-center gap-[4px] shrink-0">
          <img src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg" alt="Alva" style={{ height: 14 }} />
          <span className={`${FONT} text-[10px] leading-[14px] px-[4px] py-[1px]`}
            style={{ background: 'rgba(73,163,166,0.1)', color: 'var(--main-m1)', borderRadius: 3 }}>
            Beta
          </span>
        </div>
      )}

      {/* Streaming text */}
      {state.textContent && (
        <StreamingText text={state.textContent} isStreaming={state.isStreaming} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}

/* ━━ Exported overlay components ━━ */
export { TodoListCard, ReviewPlanCard, AnswerQuestionCard };
