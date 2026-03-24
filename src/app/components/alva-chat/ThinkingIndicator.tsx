/**
 * [INPUT]: optional activeText
 * [OUTPUT]: 等待态 — SVG loading + 金融域随机词 + shimmer 炫光 + 累计时间/tokens
 * [POS]: alva-chat — inline 在消息流末尾
 */

import { useState, useEffect, useRef } from 'react';

const THINKING_WORDS = [
  'Scanning the order book',
  'Reading the tape',
  'Crossing the spread',
  'Checking market depth',
  'Monitoring the flow',
  'Computing the Sharpe',
  'Ranking the signals',
  'Decomposing the PnL',
  'Optimizing the weights',
  'Fetching the candles',
  'Parsing the filings',
  'Decoding the flows',
  'Aggregating the feeds',
  'Rolling the Greeks',
  'Hedging the delta',
  'Building the surface',
  'Measuring the VaR',
  'Calibrating the model',
  'Running the Monte Carlo',
  'Measuring the drawdown',
  'Replaying the tape',
  'Scanning for alpha',
  'Paging the quants',
  'Warming up the engine',
  'Crunching the numbers',
];

/* 模拟 token 累计：每 100ms 增加 8-15 tokens */
function useTokenCounter() {
  const [tokens, setTokens] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setTokens(prev => prev + Math.floor(Math.random() * 8) + 8);
    }, 100);
    return () => clearInterval(t);
  }, []);
  return tokens;
}

interface ThinkingIndicatorProps {
  activeText?: string | null;
}

export function ThinkingIndicator({ activeText }: ThinkingIndicatorProps) {
  const [wordIdx, setWordIdx] = useState(() => Math.floor(Math.random() * THINKING_WORDS.length));
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const tokens = useTokenCounter();

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(prev => {
        let next = Math.floor(Math.random() * THINKING_WORDS.length);
        while (next === prev) next = Math.floor(Math.random() * THINKING_WORDS.length);
        return next;
      });
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setElapsed((Date.now() - startRef.current) / 1000), 100);
    return () => clearInterval(tick);
  }, []);

  const displayText = activeText || THINKING_WORDS[wordIdx];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 0',
    }}>
      {/* SVG spinner — same 14px circle as Finished checkmark */}
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.2" />
        <path
          d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5"
          fill="none" stroke="var(--main-m1)" strokeWidth="1.2" strokeLinecap="round"
          style={{ animation: 'thinkSpin 0.9s linear infinite', transformOrigin: '7px 7px' }}
        />
      </svg>

      {/* Text with shimmer */}
      <span
        key={displayText}
        style={{
          fontSize: 12, fontFamily: "'Delight', sans-serif",
          background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(73,163,166,0.8) 50%, rgba(0,0,0,0.35) 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'thinkFade 0.3s ease-out, thinkShimmer 2s ease-in-out infinite',
          display: 'inline-block',
        }}
      >
        {displayText}...
      </span>

      {/* Elapsed + tokens — inline after text */}
      <span style={{
        fontSize: 11, color: 'rgba(0,0,0,0.2)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {elapsed.toFixed(1)}s &middot; {tokens.toLocaleString()} tokens
      </span>

      <style>{`
        @keyframes thinkSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes thinkFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes thinkShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
