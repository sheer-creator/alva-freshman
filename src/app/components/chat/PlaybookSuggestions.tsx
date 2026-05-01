/**
 * [INPUT]: page (activePage), onPromptClick 回调
 * [OUTPUT]: ChatPanel 在支持的上下文页面空态下渲染 3 条自然语言建议 + 问候
 * [POS]: ChatPanel 空态层 — 支持 workspace / explore-2 / portfolio 等页面
 */

import { CdnIcon } from '../shared/CdnIcon';

interface ContextSuggestion {
  icon: string;
  text: string;
}

interface ContextConfig {
  greeting: string;
  suggestions: ContextSuggestion[];
}

/* ========== 每个页面的上下文建议 ========== */

const CONTEXT_CONFIG: Record<string, ContextConfig> = {
  'explore-2': {
    greeting: "Hey YGGYLL, what's next?",
    suggestions: [
      {
        icon: 'star-l',
        text: 'Find the three playbooks with the highest 30-day return',
      },
      {
        icon: 'researcher-l1',
        text: 'Surface playbooks tied to the AI infrastructure theme',
      },
      {
        icon: 'chat-l1',
        text: 'Summarize which playbooks are trending in discussions this week',
      },
    ],
  },
  portfolio: {
    greeting: "Hey YGGYLL, what's next?",
    suggestions: [
      {
        icon: 'remix-l',
        text: 'Find high-performing playbooks I could mirror with my portfolio',
      },
      {
        icon: 'history-l',
        text: 'Review my recent trades and summarize my trading style',
      },
      {
        icon: 'alert-f2',
        text: 'Flag the positions most at risk if BTC drops 10% next week',
      },
    ],
  },
};

/** 判断当前页面是否有上下文建议（ChatPanel 据此决定是否替换默认空态） */
export function hasContextSuggestions(page: string): boolean {
  return page in CONTEXT_CONFIG;
}

/* ========== Suggestion 行 ========== */

function SuggestionRow({
  icon,
  text,
  isLast,
  onClick,
}: {
  icon: string;
  text: string;
  isLast?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        background: 'transparent',
        border: 'none',
        borderBottom: isLast ? 'none' : '0.5px solid rgba(0,0,0,0.08)',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(73,163,166,0.04)';
        const label = e.currentTarget.querySelector('span.nc-suggestion-label') as HTMLSpanElement | null;
        if (label) label.style.color = '#49A3A6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        const label = e.currentTarget.querySelector('span.nc-suggestion-label') as HTMLSpanElement | null;
        if (label) label.style.color = 'rgba(0,0,0,0.85)';
      }}
    >
      <CdnIcon name={icon} size={14} color="rgba(0,0,0,0.6)" />
      <span
        className="nc-suggestion-label"
        style={{
          flex: 1,
          fontFamily: "'Delight', sans-serif",
          fontSize: 13,
          lineHeight: '20px',
          color: 'rgba(0,0,0,0.85)',
          letterSpacing: 0.13,
          transition: 'color 0.15s',
        }}
      >
        {text}
      </span>
      <CdnIcon name="enter-l" size={12} color="rgba(0,0,0,0.3)" />
    </button>
  );
}

/* ========== 主组件 ========== */

export function PlaybookSuggestions({ page, onPromptClick }: { page: string; onPromptClick: (text: string) => void }) {
  const config = CONTEXT_CONFIG[page];
  if (!config) return null;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: '0 12px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(73,163,166,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo-portrait.svg`}
            alt="Alva"
            style={{ width: 36, height: 36 }}
          />
        </div>
        <p
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 18,
            lineHeight: '26px',
            fontWeight: 500,
            color: 'rgba(0,0,0,0.9)',
            letterSpacing: 0.18,
          }}
        >
          {config.greeting}
        </p>
      </div>

      {/* Suggestions */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {config.suggestions.map((s, i) => (
          <SuggestionRow
            key={i}
            icon={s.icon}
            text={s.text}
            isLast={i === config.suggestions.length - 1}
            onClick={() => onPromptClick(s.text)}
          />
        ))}
      </div>
    </div>
  );
}
