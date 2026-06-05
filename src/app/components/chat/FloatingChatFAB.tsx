import type { CSSProperties } from 'react';
import { AlvaLoading } from '../shared/AlvaLoading';
import { useChatContext } from './ChatContext';
import symbolLogo from './symbol-green-white.svg';

const ANIM_CSS = `
@keyframes fabBreathe {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(73,163,166,0.45), 0 4px 16px rgba(0,0,0,0.15);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(73,163,166,0.16), 0 4px 16px rgba(0,0,0,0.15);
  }
}
@keyframes fabBadgePop {
  0% { transform: translate(50%, -50%) scale(0.72); opacity: 0; }
  100% { transform: translate(50%, -50%) scale(1); opacity: 1; }
}
.alva-agent-fab {
  width: 40px;
  overflow: visible;
  flex-direction: row;
}
.alva-agent-fab--idle {
  width: 126px;
  flex-direction: row;
  padding: 0 12px 0 6px !important;
}
.alva-agent-fab:hover,
.alva-agent-fab:focus-visible {
  width: fit-content;
  max-width: var(--fab-expanded-max-width, 262px);
  padding: 0 12px 0 6px !important;
}
.alva-agent-fab--idle:hover,
.alva-agent-fab--idle:focus-visible {
  width: 126px;
}
.alva-agent-fab:focus-visible {
  outline: 2px solid rgba(73, 163, 166, 0.35);
  outline-offset: 3px;
}
.alva-agent-fab__label {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateX(4px);
  transition: max-width 180ms ease, opacity 160ms ease, transform 180ms ease;
  text-align: left;
}
.alva-agent-fab:hover .alva-agent-fab__label,
.alva-agent-fab:focus-visible .alva-agent-fab__label {
  max-width: var(--fab-label-max-width, 128px);
  opacity: 1;
  transform: translateX(0);
}
.alva-agent-fab--idle .alva-agent-fab__label {
  max-width: 72px;
  opacity: 1;
  transform: translateX(0);
  text-align: left;
}
.alva-agent-fab--working {
  animation: fabBreathe 2.4s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .alva-agent-fab,
  .alva-agent-fab *,
  .alva-agent-fab--working {
    animation: none !important;
    transition: none !important;
  }
}
`;

export function FloatingChatFAB() {
  const { chatOpen, agentActivity, openAgentActivity } = useChatContext();

  if (chatOpen) return null;

  const badge = agentActivity.badge;
  const badgeLabel = badge?.kind === 'needs-you'
    ? '!'
    : badge?.kind === 'proactive' && badge.count
      ? badge.count > 9 ? '9+' : String(badge.count)
      : badge?.count && badge.count > 1
      ? badge.count > 9 ? '9+' : String(badge.count)
      : '';
  const showBadgeDot = badge?.kind === 'done' && (!badge.count || badge.count <= 1);
  const badgeStyle = badge?.kind === 'needs-you'
    ? { background: 'var(--main-m2)', color: 'white' }
    : badge?.kind === 'proactive'
      ? { background: 'var(--main-m2)', color: 'white' }
      : { background: 'var(--main-m1)', color: 'white' };
  const isIdle = agentActivity.status === 'idle';
  const showWorkingLogo = agentActivity.isWorking;
  const tooltipLabel = agentActivity.tooltipLabel || agentActivity.label;
  const labelMaxWidth = isIdle ? 72 : 208;
  const expandedMaxWidth = isIdle ? 126 : labelMaxWidth + 54;
  const fabStyle = {
    bottom: 28,
    right: 28,
    height: 40,
    maxWidth: expandedMaxWidth,
    padding: '0 6px',
    borderRadius: 'var(--radius-btn-m, 6px)',
    background: 'var(--main-m1)',
    border: '0.5px solid rgba(0,0,0,0.7)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transition: 'width 180ms ease, background 160ms ease, box-shadow 180ms ease',
    '--fab-expanded-max-width': `${expandedMaxWidth}px`,
    '--fab-label-max-width': `${labelMaxWidth}px`,
  } as CSSProperties;

  return (
    <>
      <style>{ANIM_CSS}</style>
      <button
        type="button"
        aria-label={agentActivity.ariaLabel}
        title={tooltipLabel}
        className={[
          'alva-agent-fab fixed z-30 flex items-center gap-[8px] cursor-pointer',
          isIdle ? 'alva-agent-fab--idle' : '',
          agentActivity.isWorking ? 'alva-agent-fab--working' : '',
        ].filter(Boolean).join(' ')}
        style={fabStyle}
        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.05)),var(--main-m1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--main-m1)'}
        onClick={openAgentActivity}
      >
        <div
          className="relative shrink-0 flex items-center justify-center size-[28px] rounded-[4px]"
          style={{ background: '#2a2a38' }}
        >
          {showWorkingLogo ? (
            <AlvaLoading size={14} tone="dark" />
          ) : (
            <img src={symbolLogo} width={14} height={14} alt="Alva" />
          )}
        </div>
        <span className="alva-agent-fab__label min-w-0 truncate font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] font-medium text-white whitespace-nowrap">
          {agentActivity.label}
        </span>
        {badge && (
          <span
            aria-hidden="true"
            className="absolute flex items-center justify-center font-['Delight',sans-serif] font-medium"
            style={{
              top: 0,
              right: 0,
              width: showBadgeDot ? 9 : undefined,
              minWidth: showBadgeDot ? 9 : 16,
              height: showBadgeDot ? 9 : 16,
              padding: showBadgeDot ? 0 : '0 4px',
              borderRadius: 999,
              border: '1.5px solid white',
              fontSize: 10,
              lineHeight: '14px',
              letterSpacing: 0,
              animation: 'fabBadgePop 140ms ease-out both',
              ...badgeStyle,
            }}
          >
            {showBadgeDot ? null : badgeLabel}
          </span>
        )}
      </button>
    </>
  );
}
