import { useState } from 'react';
import { CdnIcon } from '../shared/CdnIcon';
import { AlvaLoading } from '../shared/AlvaLoading';
import { useChatContext } from './ChatContext';
import { TodoListCard, ReviewPlanCard, AnswerQuestionCard } from './StreamingMessages';

const ANIM_CSS = `
@keyframes slideBottom {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
`;

export function FloatingChatBar() {
  const { openChat, reopenChat, contextTag, sendPrompt, streamingState, chatOpen, overlay, dismissOverlay } = useChatContext();
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  if (!contextTag) return null;

  const statusText = streamingState?.statusText;
  const hasActiveStream = streamingState !== null && !!statusText;
  const showCollapsedStatus = !chatOpen && hasActiveStream;

  const handleSend = () => {
    const text = input.trim();
    if (text) {
      sendPrompt(text);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // When chat is closed and AI is streaming, show mini status bar
  if (showCollapsedStatus) {
    // Plan replaces the entire status bar
    if (overlay && overlay.type === 'plan' && overlay.plan) {
      return (
        <div
          className="fixed z-30"
          style={{
            bottom: 24,
            left: '50%',
            marginLeft: 114,
            transform: 'translateX(-50%)',
            width: 560,
            maxWidth: 'calc(100vw - 228px - 48px)',
          }}
        >
          <ReviewPlanCard data={overlay.plan} onApprove={dismissOverlay} />
        </div>
      );
    }

    return (
      <div
        className="fixed z-30 flex flex-col gap-[8px]"
        style={{
          bottom: 24,
          left: '50%',
          marginLeft: 114,
          transform: 'translateX(-50%)',
          width: 560,
          maxWidth: 'calc(100vw - 228px - 48px)',
        }}
      >
        <style>{ANIM_CSS}</style>

        {/* Todo list / Answer float above status bar */}
        {overlay && overlay.type === 'todos' && overlay.todos && (
          <div className="w-full" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <TodoListCard data={overlay.todos} />
          </div>
        )}
        {overlay && overlay.type === 'answer' && overlay.answer && (
          <div className="w-full" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <AnswerQuestionCard
              data={overlay.answer}
              onSelect={() => dismissOverlay()}
              onSkip={dismissOverlay}
            />
          </div>
        )}

        <div
          className="relative flex gap-[12px] items-center p-[16px] w-full rounded-[12px] overflow-hidden cursor-pointer transition-all hover:shadow-lg"
          style={{
            background: 'white',
            border: '0.5px solid rgba(73,163,166,0.3)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
          onClick={reopenChat}
        >
          {/* Bottom sliding light - teal when streaming */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
            <div
              className="h-full w-[40%]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(73,163,166,0.4) 30%, #49A3A6 100%)',
                animation: 'slideBottom 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Alva lottie logo */}
          <AlvaLoading size={12} />

          {/* Status text */}
          <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[var(--text-n7)] flex-1 truncate">
            {statusText}
          </span>

          {/* Expand to open */}
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={(e) => { e.stopPropagation(); reopenChat(); }}>
            <CdnIcon name="unfoldd-l" size={16} color="var(--text-n5)" />
          </button>
        </div>
      </div>
    );
  }

  // When chat is open, hide the bar completely
  if (chatOpen) return null;

  return (
    <div
      className="fixed z-30"
      style={{
        bottom: 24,
        left: '50%',
        marginLeft: 114,
        transform: 'translateX(-50%)',
        width: 560,
        maxWidth: 'calc(100vw - 228px - 48px)',
      }}
    >
      <style>{ANIM_CSS}</style>
      <div
        className="relative flex gap-[12px] items-end p-[16px] w-full rounded-[12px] overflow-hidden"
        style={{
          background: 'white',
          border: '0.5px solid ' + (focused ? 'var(--text-n9)' : 'var(--line-l2)'),
          boxShadow: focused
            ? 'inset 0 0 0 0.5px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Bottom sliding light */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-[40%]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(73,163,166,0.2) 30%, #49A3A6 100%)',
              animation: 'slideBottom 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Expand icon + input */}
        <div className="flex flex-1 gap-[8px] items-center overflow-clip py-[3px] min-w-0">
          <button
            className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => openChat(false)}
          >
            <CdnIcon name="unfoldd-l" size={16} color="var(--text-n5)" />
          </button>
          <input
            className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] placeholder:text-[var(--text-n3)] flex-1 min-w-0 outline-none bg-transparent"
            placeholder="Ask anything about investing"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Photo button */}
        <div className="flex items-center justify-center overflow-clip py-[6px] shrink-0">
          <button className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
            <CdnIcon name="photo-l" size={16} />
          </button>
        </div>

        {/* Send button */}
        <button
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: input.trim() ? 'var(--main-m1)' : 'var(--b-r05)',
          }}
          onClick={handleSend}
        >
          <CdnIcon
            name="arrow-up-l1"
            size={14}
            color={input.trim() ? '#ffffff' : 'var(--text-n3)'}
          />
        </button>
      </div>
    </div>
  );
}
