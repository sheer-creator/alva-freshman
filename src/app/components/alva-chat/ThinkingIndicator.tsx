/**
 * [INPUT]: optional activeText
 * [OUTPUT]: Thinking 等待态指示器 — 匹配 Figma 简洁风格
 * [POS]: alva-chat — Agent 思考/等待态渲染
 */

import { useState, useEffect, useRef } from 'react';

const THINKING_WORDS = [
  'Scanning the order book',
  'Reading the tape',
  'Computing the Sharpe',
  'Ranking the signals',
  'Fetching the candles',
  'Parsing the filings',
  'Rolling the Greeks',
  'Calibrating the model',
  'Running the Monte Carlo',
  'Scanning for alpha',
  'Crunching the numbers',
  'Checking the correlations',
];

interface ThinkingIndicatorProps {
  activeText?: string | null;
}

export function ThinkingIndicator({ activeText }: ThinkingIndicatorProps) {
  const [wordIdx, setWordIdx] = useState(() => Math.floor(Math.random() * THINKING_WORDS.length));
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

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
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 24px',
    }}>
      {/* Spinner */}
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, animation: 'alvaSpin 1s linear infinite' }}>
        <circle cx="8" cy="8" r="6" stroke="var(--main-m1)" strokeWidth="2" fill="none" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
      </svg>

      {/* Status text */}
      <span
        key={displayText}
        style={{
          fontSize: 13, color: 'var(--text-n5)',
          fontFamily: "'Delight', sans-serif",
          animation: 'alvaFadeIn 0.3s ease-out',
        }}
      >
        {displayText}...
      </span>

      <div style={{ flex: 1 }} />

      {/* Elapsed */}
      <span style={{
        fontSize: 11, color: 'var(--text-n5)',
        fontFamily: "'JetBrains Mono', monospace",
        flexShrink: 0,
      }}>
        {elapsed.toFixed(1)}s
      </span>

      <style>{`
        @keyframes alvaSpin{to{transform:rotate(360deg)}}
        @keyframes alvaFadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
