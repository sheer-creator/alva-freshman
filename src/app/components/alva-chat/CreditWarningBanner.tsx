/**
 * [INPUT]: onNavigate callback
 * [OUTPUT]: Credits 即将耗尽 tip — 轻量内联提醒
 * [POS]: alva-chat — 系统级提醒组件
 */

import { useState, useEffect } from 'react';

/* ========== Mock ========== */

const REMAINING = 180;

/* ========== 组件 ========== */

interface CreditWarningBannerProps {
  onNavigate: (page: 'pricing' | 'billing') => void;
}

export function CreditWarningBanner({ onNavigate }: CreditWarningBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      margin: '4px 0', padding: '8px 12px', borderRadius: 8,
      background: 'rgba(230, 169, 26, 0.06)',
      borderLeft: '2px solid #E6A91A',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
    }}>
      <span style={{
        fontSize: 12, color: 'var(--text-n5)',
        fontFamily: "'Delight', sans-serif",
      }}>
        {REMAINING} credits remaining &middot;{' '}
        <button
          onClick={() => onNavigate('pricing')}
          style={{
            padding: 0, border: 'none', background: 'none',
            fontSize: 12, fontWeight: 500, color: 'var(--main-m1)',
            fontFamily: "'Delight', sans-serif",
            cursor: 'pointer', transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Upgrade
        </button>
        {' '}or{' '}
        <button
          onClick={() => onNavigate('billing')}
          style={{
            padding: 0, border: 'none', background: 'none',
            fontSize: 12, fontWeight: 500, color: 'var(--main-m1)',
            fontFamily: "'Delight', sans-serif",
            cursor: 'pointer', transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          add credits
        </button>
      </span>
    </div>
  );
}
