/**
 * [INPUT]: Page type, AppShell, ChatInput (bottomChip), new-chat-mock, Dropdown
 * [OUTPUT]: New Chat 入口页 — skill 驱动的起手页面
 * [POS]: 与 Home 并列的入口页面（Sidebar 最顶）
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { BURST_ICON_PATHS } from '@/app/components/shared/burst-icon-paths';
import { COMMUNITY_TEMPLATES, PRIMARY_TEMPLATES, OTHERS_TEMPLATES, type CommunitySkillTemplate, type NewChatTemplate, type NewChatPlaybook } from '@/data/new-chat-mock';
import { generateTypedSuggestions } from '@/data/typed-suggestions';
import { PlaybookCover } from '@/lib/playbook-cover/PlaybookCover';
import type { CoverInput, Template as CoverTemplateName, DomainKey } from '@/lib/playbook-cover/types';

const CHIP_ICON = 'researcher-l1';

/** 返回 true 仅当设备支持 hover（即非触屏） */
function supportsHover(): boolean {
  if (typeof window === 'undefined') return true;
  if (typeof window.matchMedia !== 'function') return true;
  return window.matchMedia('(hover: hover)').matches;
}

/* ========== Skill 标签颜色 — 对应 Figma 的 m1/m2/m5 ========== */

interface SkillColor {
  bg: string;
  fg: string;
}
const SKILL_COLOR_MAP: Record<string, SkillColor> = {
  // m1 teal
  'theme-tracker': { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  'smart-screener': { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  backtest: { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  'crypto-pulse': { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  'yield-hunter': { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  'dividend-diary': { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' },
  // m2 blue
  'what-if': { bg: 'var(--main-m2-10)', fg: 'var(--main-m2)' },
  'deep-dive': { bg: 'var(--main-m2-10)', fg: 'var(--main-m2)' },
  // m5 yellow
  valuation: { bg: 'var(--main-m5-10)', fg: 'var(--main-m5)' },
  'daily-macro-brief': { bg: 'var(--main-m5-10)', fg: 'var(--main-m5)' },
  'earnings-edge': { bg: 'var(--main-m5-10)', fg: 'var(--main-m5)' },
};
const skillColor = (id: string): SkillColor => SKILL_COLOR_MAP[id] ?? { bg: 'var(--main-m1-10)', fg: 'var(--main-m1)' };

/* ========== Skill pill ========== */

const chipBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  padding: '0 16px',
  borderRadius: 999,
  border: '0.5px solid var(--line-l12)',
  fontFamily: "'Delight', sans-serif",
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 500,
  color: 'var(--text-n7)',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  letterSpacing: 0.14,
  userSelect: 'none',
  background: 'white',
  transition: 'box-shadow 160ms ease, transform 160ms ease',
};

function SkillPill({
  template,
  active,
  onClick,
  onHover,
  onLeave,
}: {
  template: NewChatTemplate;
  active?: boolean;
  onClick?: () => void;
  onHover?: (rect: DOMRect) => void;
  onLeave?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!supportsHover()) return;
        if (ref.current) {
          ref.current.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
          ref.current.style.transform = 'translateY(-2px)';
          if (onHover) onHover(ref.current.getBoundingClientRect());
        }
      }}
      onMouseLeave={() => {
        if (!supportsHover()) return;
        if (ref.current) {
          ref.current.style.boxShadow = 'none';
          ref.current.style.transform = 'translateY(0)';
        }
        onLeave?.();
      }}
      style={{ ...chipBaseStyle, background: active ? '#f3f8f8' : 'white' }}
    >
      {template.kol ? (
        <Avatar name={template.creator} size={22} />
      ) : (
        template.icon && <CdnIcon name={template.icon} size={16} color="var(--text-n7)" />
      )}
      {template.label}
    </button>
  );
}

/* ========== Skill hover info card ========== */

function fnv1aSkill(seed: string): number {
  let x = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    x ^= seed.charCodeAt(i);
    x = Math.imul(x, 0x01000193);
  }
  return x >>> 0;
}

function relativeTimeForSkill(skillId: string): string {
  const h = fnv1aSkill(skillId);
  const minutes = h % 7200;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (24 * 60))}d ago`;
}

/* 派生 skill 信息卡的 tags（CommunitySkill 直接用自带字段，其它走哈希派生） */
const TAG_POOL = [
  'Filings', 'Insider Cluster', 'Event Drift', 'Earnings Drift', 'Whisper Numbers',
  'Macro Flow', 'FX Cross', 'Rates Curve', 'Credit Spread', 'Sentiment',
  'Theme Tracker', 'Catalyst', 'Risk Off', 'Backtest', 'Yield Curve',
  'Dividend', 'On-Chain', 'ETF Flow', 'MAG7', 'AI Capex',
  'Hyperscaler', 'Volatility', 'Carry', 'Drawdown', 'Sharpe',
  'Quintile', 'Read-Across', 'Sector Rotation', 'Pair Trade', 'Theme',
];

function tagsForSkill(skillId: string): string[] {
  const h = fnv1aSkill(skillId);
  const count = ((h >>> 12) % 2) + 2; // 2 或 3 个
  const used = new Set<number>();
  const picks: string[] = [];
  for (let i = 0; picks.length < count && i < 32; i++) {
    const stretch = fnv1aSkill(`${skillId}|tag|${i}`);
    const idx = stretch % TAG_POOL.length;
    if (used.has(idx)) continue;
    used.add(idx);
    picks.push(TAG_POOL[idx]);
  }
  return picks;
}

/* ========== Social media icons ========== */

interface SocialDef {
  key: string;
  label: string;
  href: string;
  render: () => React.ReactNode;
}

const renderImg = (src: string) => () =>
  (
    <img
      src={`${import.meta.env.BASE_URL}${src}`}
      alt=""
      width={14}
      height={14}
      style={{ width: 14, height: 14, display: 'block' }}
    />
  );

const renderXLogo = () => () =>
  (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" aria-hidden style={{ display: 'block' }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

const renderInstagramLogo = () => () =>
  (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" aria-hidden style={{ display: 'block' }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );

const SOCIAL_DEFS: Record<string, SocialDef> = {
  discord: { key: 'discord', label: 'Discord', href: 'https://discord.com', render: renderImg('logo-social-discord.svg') },
  telegram: { key: 'telegram', label: 'Telegram', href: 'https://telegram.org', render: renderImg('logo-telegram.svg') },
  x: { key: 'x', label: 'X', href: 'https://x.com', render: renderXLogo() },
  instagram: { key: 'instagram', label: 'Instagram', href: 'https://instagram.com', render: renderInstagramLogo() },
};

const ALVA_SOCIALS = ['discord', 'telegram', 'x'] as const;
const NON_ALVA_POOL = ['x', 'telegram', 'discord', 'instagram'] as const;

function socialsForCreator(creator: string): SocialDef[] {
  if (creator === 'Alva') return ALVA_SOCIALS.map((k) => SOCIAL_DEFS[k]);
  // 用 creator 名稳定派生 1-2 个 socials（仅 X / Telegram / Discord / Instagram）
  let h = 0x811c9dc5;
  for (let i = 0; i < creator.length; i++) {
    h ^= creator.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  const seedScore = (k: string) => {
    let s = h;
    for (let i = 0; i < k.length; i++) {
      s ^= k.charCodeAt(i);
      s = Math.imul(s, 0x01000193) >>> 0;
    }
    return s;
  };
  const count = (h % 2) + 1; // 1 或 2
  const sorted = [...NON_ALVA_POOL].sort((a, b) => seedScore(a) - seedScore(b));
  return sorted.slice(0, count).map((k) => SOCIAL_DEFS[k]);
}

function SkillInfoCard({
  template,
  anchor,
  placeAbove,
  side = 'auto',
  onMouseEnter,
  onMouseLeave,
}: {
  template: NewChatTemplate;
  anchor: DOMRect;
  placeAbove: boolean;
  /** 'auto' = 默认上下放（pill）；'left' = 锚点左侧（dropdown row） */
  side?: 'auto' | 'left';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  // 卡片复用移动端 SkillDetailModal 的内容结构（标题→副标题→描述→tags→分隔线→creator 行），
  // 但桌面 hover 卡不展示底部按钮和按钮上方的分隔线。
  const cardWidth = 360;
  const gap = 10;
  const cardRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState<number>(220);

  useLayoutEffect(() => {
    if (cardRef.current) {
      setMeasuredHeight(cardRef.current.offsetHeight);
    }
  }, [template.id]);

  const tags = (template as CommunitySkillTemplate).tags ?? tagsForSkill(template.id);

  let left: number;
  let top: number;
  if (side === 'left') {
    left = anchor.left - cardWidth - gap;
    if (typeof window !== 'undefined') {
      left = Math.max(12, left);
    }
    top = anchor.top + anchor.height / 2 - measuredHeight / 2;
    if (typeof window !== 'undefined') {
      top = Math.max(12, Math.min(top, window.innerHeight - measuredHeight - 12));
    }
  } else {
    left = anchor.left + anchor.width / 2 - cardWidth / 2;
    if (typeof window !== 'undefined') {
      left = Math.max(12, Math.min(left, window.innerWidth - cardWidth - 12));
    }
    top = placeAbove ? anchor.top - measuredHeight - gap : anchor.bottom + gap;
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top,
        left,
        width: cardWidth,
        zIndex: 50,
        background: '#ffffff',
        borderRadius: 8,
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
        padding: 20,
        pointerEvents: 'auto',
        animation: 'newchat-fadeup 160ms ease-out',
      }}
    >
      {/* 顶部：skill 名 + 副标题 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 18,
            lineHeight: '24px',
            fontWeight: 400,
            color: 'var(--text-n9)',
            letterSpacing: 0.18,
            margin: 0,
          }}
        >
          {template.label}
        </h2>
        <span
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 11,
            lineHeight: '16px',
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: 0.11,
            fontWeight: 400,
          }}
        >
          {relativeTimeForSkill(template.id)}
        </span>
      </div>
      {/* 描述 */}
      <p
        style={{
          fontFamily: "'Delight', sans-serif",
          fontSize: 13,
          lineHeight: '20px',
          color: 'var(--text-n7)',
          letterSpacing: 0.13,
          margin: '10px 0 0',
        }}
      >
        {template.description}
      </p>
      {/* tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              height: 20,
              padding: '0 6px',
              borderRadius: 5,
              background: 'var(--b-r05)',
              color: 'var(--text-n5)',
              fontFamily: "'Delight', sans-serif",
              fontSize: 11,
              lineHeight: '20px',
              letterSpacing: 0.11,
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {/* 分割线（上下间距对称，给创作者行更舒展的呼吸） */}
      <div style={{ height: 1, background: 'var(--line-l07)', margin: '20px 0' }} />
      {/* 创建者信息行 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          className="nc-creator-link"
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 6px',
            margin: '-4px -6px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: 6,
            transition: 'background 140ms ease',
            textAlign: 'left',
          }}
        >
          <Avatar name={template.creator} size={36} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Delight', sans-serif",
                fontSize: 11,
                lineHeight: '14px',
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: 0.11,
                fontWeight: 400,
              }}
            >
              Created by
            </div>
            <div
              className="nc-creator-link-name"
              style={{
                fontFamily: "'Delight', sans-serif",
                fontSize: 14,
                lineHeight: '20px',
                color: 'var(--text-n9)',
                letterSpacing: 0.14,
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 140ms ease',
              }}
            >
              {template.creator}
            </div>
          </div>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {socialsForCreator(template.creator).map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              style={{
                width: 24,
                height: 24,
                borderRadius: '9999px',
                background: 'var(--b-r05)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 120ms ease, transform 120ms ease',
              }}
              onMouseEnter={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'var(--b-r1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'var(--b-r05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {s.render()}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========== Suggested Prompt 行 ========== */

function InlineSuggestionRow({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      className="nc-prompt-row"
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.background = 'var(--b-r03)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span className="nc-prompt-text">{text}</span>
      <CdnIcon name="enter-l" size={20} color="rgba(0,0,0,0.4)" />
    </button>
  );
}

function PromptRowSkeleton({ widthPct }: { widthPct: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 14,
          background: 'var(--b-r07)',
          borderRadius: 4,
          maxWidth: `${widthPct}%`,
        }}
      />
      <div style={{ width: 20, height: 20, background: 'var(--b-r05)', borderRadius: 4 }} />
    </div>
  );
}

/* ========== Ticker logo ========== */

const CRYPTO_TICKERS = new Set(['BTC', 'ETH', 'SOL', 'PEPE', 'ARB', 'OP', 'AVAX', 'BNB', 'USDT', 'USDC', 'XRP', 'DOGE']);
// 已知是 ETF / index 等无 logo 的标的，直接走颜色 fallback 不发请求
const SKIP_LOGO = new Set([
  'SPX', 'SPY', 'QQQ', 'R2K', 'IWM', 'AGG', 'TLT', 'VIX', 'EFA', 'EEM',
  'DXY', 'CL', 'HYG', 'LQD', 'GLD', 'GDX', 'NOBL', 'FXI', 'KWEB', '2330.TW',
]);
const TICKER_FALLBACK_COLOR: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#14F195',
  PEPE: '#3FAA3D',
  SPX: '#94A3B8',
  SPY: '#94A3B8',
  QQQ: '#94A3B8',
  GLD: '#E6A91A',
  GDX: '#E6A91A',
  TLT: '#627EEA',
  VIX: '#EF4444',
  AGG: '#94A3B8',
  IWM: '#94A3B8',
};

function TickerLogo({ ticker }: { ticker: string }) {
  const [errored, setErrored] = useState(false);
  let src: string | null = null;
  if (!errored && !SKIP_LOGO.has(ticker)) {
    if (CRYPTO_TICKERS.has(ticker)) src = `https://assets.coincap.io/assets/icons/${ticker.toLowerCase()}@2x.png`;
    else src = `https://financialmodelingprep.com/image-stock/${ticker}.png`;
  }
  if (src) {
    return (
      <img
        src={src}
        alt={ticker}
        width={12}
        height={12}
        style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0, background: '#fff' }}
        onError={() => setErrored(true)}
      />
    );
  }
  const fallback = TICKER_FALLBACK_COLOR[ticker] || '#94A3B8';
  return (
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: fallback,
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  );
}

/* ========== Cover input 映射（复用 @/lib/playbook-cover） ========== */

const SKILL_TEMPLATE: Record<string, CoverTemplateName> = {
  'theme-tracker': 'thesis',
  'smart-screener': 'screener',
  'deep-dive': 'thesis',
  'daily-macro-brief': 'general',
  'earnings-edge': 'thesis',
  'crypto-pulse': 'general',
  'what-if': 'what-if',
  'yield-hunter': 'screener',
  'dividend-diary': 'screener',
  backtest: 'what-if',
  valuation: 'thesis',
};

// Skill → cover domain（用于决定 watermark icon 与色域）
const SKILL_DOMAIN: Record<string, DomainKey> = {
  'theme-tracker': 'trend_up',
  'smart-screener': 'momentum',
  'deep-dive': 'ai',
  'daily-macro-brief': 'macro',
  'earnings-edge': 'earnings',
  'crypto-pulse': 'crypto',
  'what-if': 'event_study',
  'yield-hunter': 'dividend',
  'dividend-diary': 'dividend',
  backtest: 'event_study',
  valuation: 'value',
};

/* ========== Cover 假数据生成器 ==========
 * 复用 @/lib/playbook-cover/cover-gen — 这里只构造 CoverInput。
 */

const UNIVERSES = ['S&P LARGE CAP', 'RUSSELL 2000', 'NASDAQ 100', 'MSCI EMG', 'STOXX 600', 'TOPIX 500'];
const WINDOWS = ['1H', '6H', '1D', '1W'];
const THESIS_BODIES = [
  'Late long-term debt cycle · risk-off bias',
  'AI capex peak forming into Q3',
  'Basket −2.1% vs SMH +0.6% YTD',
  'Hyperscaler PPA flows feed power demand',
  'Dollar regime shift, EM tailwind',
  'Curve re-steepening as growth softens',
];
const VERBS = ['Historically Drops', 'Historically Rises', 'Range-Bound', 'Outperforms Peers', 'Trails Benchmark'];
const KINDS_GENERAL = [
  'CONTEXT FEED · daily',
  'WATCHLIST · 2026',
  'BRIEF · daily',
  'PULSE · live',
  'ALERTS · LIVE · 30S',
];
const PULSES = ['2h ago', '38 holdings', '1.2M views', 'live', '12 alerts', '07:30 ET'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const CATEGORIES: Array<'RISK' | 'CATALYST' | 'AMBIGUOUS'> = ['RISK', 'CATALYST', 'AMBIGUOUS'];

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function buildCoverInput(p: NewChatPlaybook, skillId: string): CoverInput {
  const template = SKILL_TEMPLATE[skillId] ?? 'general';
  const domain = SKILL_DOMAIN[skillId];
  const h = fnv1a(`${p.id}|${p.title}`);
  const pick = <T,>(arr: T[], shift: number): T => arr[(h >>> shift) % arr.length];
  const tickers = p.tickers ?? [];

  const base: CoverInput = { template, title: p.title, author: p.creator, tickers, domain };

  if (template === 'screener') {
    return { ...base, series: `SCORED · ${pick(UNIVERSES, 0)} · ${pick(WINDOWS, 6)}` };
  }
  if (template === 'thesis') {
    const month = pick(MONTHS, 0);
    const day = ((h >>> 4) % 28) + 1;
    return {
      ...base,
      anchor: `${month} ${day}`,
      category: pick(CATEGORIES, 8),
      kind: pick(THESIS_BODIES, 12),
    };
  }
  if (template === 'what-if') {
    const isPos = ((h >>> 0) & 1) === 1;
    const mag = (((h >>> 2) % 45) + 5) / 10;
    const xMult = ((h >>> 8) % 9) + 2;
    const bars = Array.from({ length: 5 }).map((_, i) => {
      const raw = (((h >>> (i * 3)) & 0xff) / 255) * 2 - 1;
      return Math.round((raw * (isPos ? 1 : -1) * 4 + (isPos ? 0.6 : -0.6)) * 10) / 10;
    });
    return {
      ...base,
      series: `30D AFTER · ${xMult}×`,
      kind: pick(VERBS, 16),
      anchor: `${isPos ? '+' : '−'}${mag.toFixed(1)}%`,
      whatIfBars: bars,
    };
  }
  // general
  const pieces = ((h >>> 0) % 70) + 10;
  const views = (((h >>> 4) % 200) + 50) / 10;
  return {
    ...base,
    kind: pick(KINDS_GENERAL, 0),
    anchor: pick(PULSES, 8),
    series: `${pieces} PIECES · ${views.toFixed(1)}K VIEWS`,
  };
}


/* ========== Playbook 卡片（按 Figma 4571:74212 spec 严格实现） ========== */

function PlaybookCard({
  p,
  skillLabel,
  skillIcon,
  skillKol,
  skillCreator,
  skillId,
  onClick,
}: {
  p: NewChatPlaybook;
  skillLabel: string;
  skillIcon?: string;
  skillKol?: boolean;
  skillCreator?: string;
  skillId: string;
  onClick?: () => void;
}) {
  const tickers = (p.tickers ?? []).slice(0, 2);
  const sc = skillColor(skillId);
  // KOL skill 在卡片里展示灰底黑字（不再用 m1/m5 主题色）
  const skillChipBg = skillKol ? 'rgba(0,0,0,0.05)' : sc.bg;
  const skillChipFg = skillKol ? 'rgba(0,0,0,0.9)' : sc.fg;
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      style={{
        background: '#ffffff',
        border: '0.5px solid var(--line-l3)',
        borderRadius: 12,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        transition: 'box-shadow 180ms ease, transform 180ms ease',
      }}
      onMouseEnter={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        if (!supportsHover()) return;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Cover — 复用 @/lib/playbook-cover */}
      <div
        style={{
          width: '100%',
          aspectRatio: '320 / 140',
          borderRadius: 4,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <PlaybookCover input={buildCoverInput(p, skillId)} />
      </div>
      {/* Body */}
      <div
        style={{
          padding: '16px 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* TagRow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              height: 20,
              padding: '2px 6px',
              borderRadius: 4,
              background: skillChipBg,
              color: skillChipFg,
              fontFamily: "'Delight', sans-serif",
              fontSize: 12,
              lineHeight: '20px',
              letterSpacing: 0.12,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {skillKol && skillCreator ? (
              <Avatar name={skillCreator} size={12} />
            ) : (
              skillIcon && <CdnIcon name={skillIcon} size={12} color={skillChipFg} />
            )}
            {skillLabel}
          </span>
          {tickers.map((t) => (
            <span
              key={t}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                height: 20,
                padding: '2px 8px',
                borderRadius: 4,
                background: 'var(--b-r05)',
                color: 'var(--text-n7)',
                fontFamily: "'Delight', sans-serif",
                fontSize: 12,
                lineHeight: '20px',
                letterSpacing: 0.12,
                fontWeight: 400,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <TickerLogo ticker={t} />
              {t}
            </span>
          ))}
        </div>
        {/* TextBlock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: '26px',
              fontWeight: 400,
              color: 'var(--text-n9)',
              letterSpacing: 0.16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              height: 28,
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: '20px',
              color: 'var(--text-n5)',
              letterSpacing: 0.12,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              margin: 0,
              height: 44,
            }}
          >
            {p.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlaybookCardSkeleton() {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '0.5px solid var(--line-l12)',
        borderRadius: 8,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '472 / 265.5',
          borderRadius: 4,
          background: 'var(--b-r05)',
        }}
      />
      <div style={{ padding: '16px 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 70, height: 20, background: 'var(--b-r07)', borderRadius: 4 }} />
          <div style={{ width: 40, height: 20, background: 'var(--b-r05)', borderRadius: 4 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 18, background: 'var(--b-r07)', borderRadius: 4, maxWidth: '60%' }} />
          <div style={{ height: 12, background: 'var(--b-r05)', borderRadius: 4 }} />
          <div style={{ height: 12, background: 'var(--b-r05)', borderRadius: 4, maxWidth: '80%' }} />
        </div>
      </div>
    </div>
  );
}

/* ========== Skills 浮层（由下到上的全量 skill grid 面板） ========== */

function SkillsLibraryPanel({
  skills,
  selectedId,
  onSelect,
  onClose,
}: {
  skills: NewChatTemplate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  // 弹窗最大宽度 1200，按视口宽度选 1/2/3 列
  const pickCols = (w: number) => (w < 640 ? 1 : w < 960 ? 2 : 3);
  const [colCount, setColCount] = useState<number>(() =>
    typeof window === 'undefined' ? 3 : pickCols(window.innerWidth),
  );
  useEffect(() => {
    const h = () => setColCount(pickCols(window.innerWidth));
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  if (typeof document === 'undefined') return null;
  // Round-robin 分列：高优 skill 落在每一列的顶部，列内独立堆叠
  const columns: NewChatTemplate[][] = Array.from({ length: colCount }, () => []);
  skills.forEach((s, i) => columns[i % colCount].push(s));
  return createPortal(
    <>
      <div className="skills-panel-backdrop" onClick={onClose} />
      <div className="skills-panel" role="dialog" aria-label="Skills">
        <div className="skills-panel-header">
          <span className="skills-panel-title">Skills</span>
          <button
            type="button"
            aria-label="Close"
            className="skills-panel-close"
            onClick={onClose}
          >
            <CdnIcon name="close-l1" size={16} color="var(--text-n7)" />
          </button>
        </div>
        <div className="skills-panel-scroll">
          <div className="skills-panel-grid">
            {columns.map((col, ci) => (
            <div className="skills-panel-col" key={ci}>
            {col.map((s) => {
              const tags = (s as CommunitySkillTemplate).tags ?? tagsForSkill(s.id);
              const isSelected = selectedId === s.id;
              const socials = socialsForCreator(s.creator);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`skills-panel-card${isSelected ? ' is-selected' : ''}`}
                  onClick={() => onSelect(s.id)}
                >
                  <div className="skills-panel-card-content">
                    <div className="skills-panel-card-header">
                      {s.creator === 'Alva' && s.icon ? (
                        <span className="skills-panel-card-icon-wrap">
                          <CdnIcon name={s.icon} size={20} color="var(--text-n7)" />
                        </span>
                      ) : (
                        <span className="skills-panel-card-creator-thumb">
                          <Avatar name={s.creator} size={36} />
                        </span>
                      )}
                      <div className="skills-panel-card-titleblock">
                        <span className="skills-panel-card-name">{s.label}</span>
                        <span className="skills-panel-card-author">{s.creator}</span>
                      </div>
                    </div>
                    <p className="skills-panel-card-desc">{s.description}</p>
                    {tags.length > 0 && (
                      <div className="skills-panel-card-tags">
                        {tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="skills-panel-card-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="skills-panel-card-hoverblock">
                    <div className="skills-panel-card-hoverblock-inner">
                      <div className="skills-panel-card-divider" />
                      <div className="skills-panel-card-creator-row">
                        <Avatar name={s.creator} size={36} />
                        <div className="skills-panel-card-creator-text">
                          <span className="skills-panel-card-creator-caps">Created by</span>
                          <button
                            type="button"
                            className="skills-panel-card-creator-name"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="skills-panel-card-creator-name-text">{s.creator}</span>
                          </button>
                        </div>
                        <div className="skills-panel-card-socials">
                          {socials.map((soc) => (
                            <a
                              key={soc.key}
                              href={soc.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={soc.label}
                              onClick={(e) => e.stopPropagation()}
                              className="skills-panel-card-social"
                            >
                              {soc.render()}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

/* ========== Title hero — 标题 + 创建者气泡，允许折行，纵向居中，固定高度 ========== */
/* Title transition: dot-burst ellipse port of text-reveal-v4 reference. */

const TITLE_DESKTOP_FONT = 45;
const TITLE_MOBILE_FONT = 28;
const TITLE_LH = 1.2;
const MOBILE_THRESHOLD_PX = 640;

/* ── Dot-burst tunables (text-reveal-v4) ── */
const TR_CELL = 18;
const TR_TOTAL_MS = 400;
const TR_ESCAPE_BAND = 1.06;
const TR_ESCAPE_PROB = 0.12;
const TR_SUPERELLIPSE_N = 1.7;

function trEaseInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function trEaseInOutInverse(y: number): number {
  if (y <= 0) return 0;
  if (y >= 1) return 1;
  let lo = 0, hi = 1;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (trEaseInOut(mid) < y) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
function trWrapChars(host: HTMLElement): HTMLSpanElement[] {
  const out: HTMLSpanElement[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === 3) {
      const text = node.textContent ?? '';
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.display = 'inline-block';
        frag.appendChild(s);
        out.push(s);
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === 1) {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(host.childNodes).forEach(walk);
  return out;
}
/* Reference uses 5 hand-drawn squircle icons (BURST_ICON_PATHS). Each path
   already includes its own footprint within a 20×20 viewBox, so we don't
   need to size or pad — we just stamp the chosen path and dial opacity.
   Per-burst we shuffle the kind→weight mapping so every text transition
   shows a visibly different mix of shapes (花色每次随机). */
function trDotSvg(kind: number, opacity: number): string {
  const path = BURST_ICON_PATHS[kind] ?? BURST_ICON_PATHS[0];
  return `<svg width="100%" height="100%" viewBox="0 0 20 20" style="display:block;opacity:${opacity}"><path d="${path}" fill="#000"/></svg>`;
}
/* Build a fresh weighted icon pool for one burst: shuffle which kinds are
   "primary" (full opacity) vs. ghosted, and randomise the dominant kind so
   each transition has a distinct visual signature. */
function trBuildBurstPalette(): { kind: number; opacity: number }[] {
  const N = BURST_ICON_PATHS.length;
  const order = Array.from({ length: N }, (_, i) => i)
    .sort(() => Math.random() - 0.5);
  // 2-3 dominant kinds + 1-2 ghost kinds, weights ≈ 60% / 25% / 10% / 5%
  const weights = [0.45, 0.25, 0.15, 0.1, 0.05].slice(0, N);
  const opacities = [1, 1, 1, 0.45, 0.2].slice(0, N).sort(() => Math.random() - 0.5);
  const pool: { kind: number; opacity: number }[] = [];
  order.forEach((kind, i) => {
    const count = Math.max(1, Math.round(weights[i] * 100));
    for (let j = 0; j < count; j++) pool.push({ kind, opacity: opacities[i] });
  });
  return pool;
}
function trPickFromPalette(palette: { kind: number; opacity: number }[]): { kind: number; opacity: number } {
  return palette[Math.floor(Math.random() * palette.length)];
}

function TitleHero({ selected, maxWidth }: { selected: NewChatTemplate | null; maxWidth: number }) {
  const [isMobileTitle, setIsMobileTitle] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_THRESHOLD_PX : false,
  );
  useEffect(() => {
    const h = () => setIsMobileTitle(window.innerWidth < MOBILE_THRESHOLD_PX);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const TITLE_BASE_FONT = isMobileTitle ? TITLE_MOBILE_FONT : TITLE_DESKTOP_FONT;
  const TITLE_LINE = Math.ceil(TITLE_BASE_FONT * TITLE_LH);
  const TITLE_BOX_HEIGHT = TITLE_LINE * 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const outgoingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<string>('');
  const animatingRef = useRef(false);
  const [scale, setScale] = useState(1);

  const text = selected ? `Build your ${selected.label}` : 'Pick a skill and start building';

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const compute = () => {
      title.style.maxWidth = `${container.clientWidth}px`;
      const naturalH = title.scrollHeight;
      setScale(naturalH > TITLE_BOX_HEIGHT ? TITLE_BOX_HEIGHT / naturalH : 1);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text, TITLE_BOX_HEIGHT]);

  // Trigger dot-burst transition whenever `text` changes
  useEffect(() => {
    const prev = prevTextRef.current;
    if (prev === text) {
      prevTextRef.current = text;
      return;
    }
    prevTextRef.current = text;
    const stage = containerRef.current;
    const live = titleRef.current;
    const outgoing = outgoingRef.current;
    const overlay = overlayRef.current;
    if (!stage || !live || !outgoing || !overlay) return;

    // On very first paint (prev was empty), no burst — just show
    if (!prev) return;

    animatingRef.current = true;

    // Outgoing layer = prev text, live layer = next text (incoming)
    outgoing.textContent = prev;
    outgoing.style.opacity = '1';

    const firstSpans = trWrapChars(outgoing);
    const secondSpans = trWrapChars(live);
    firstSpans.forEach((s) => { s.style.opacity = '1'; });
    secondSpans.forEach((s) => { s.style.opacity = '0'; });

    const runBody = () => {
      const sr = stage.getBoundingClientRect();
      if (!secondSpans.length) {
        overlay.innerHTML = '';
        outgoing.textContent = '';
        animatingRef.current = false;
        return;
      }

      const rects = secondSpans.map((s) => s.getBoundingClientRect());
      const tTop = Math.min(...rects.map((r) => r.top));
      const tBottom = Math.max(...rects.map((r) => r.bottom));
      const tLeft = Math.min(...rects.map((r) => r.left));
      const tRight = Math.max(...rects.map((r) => r.right));
      const cx = (tLeft + tRight) / 2 - sr.left;
      const cy = (tTop + tBottom) / 2 - sr.top;
      const rx = ((tRight - tLeft) / 2) * 1.35;
      const ry = ((tBottom - tTop) / 2) * 1.7;

      const ed = (gx: number, gy: number) =>
        Math.pow(
          Math.pow(Math.abs(gx / rx), TR_SUPERELLIPSE_N) +
            Math.pow(Math.abs(gy / ry), TR_SUPERELLIPSE_N),
          1 / TR_SUPERELLIPSE_N,
        );
      const dotDelay = (d: number) => Math.round(trEaseInOutInverse(d) * TR_TOTAL_MS);

      // Fresh palette per burst so consecutive transitions look different
      const palette = trBuildBurstPalette();
      const frag = document.createDocumentFragment();
      const gxMin = -Math.ceil((rx * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gxMax = Math.ceil((rx * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gyMin = -Math.ceil((ry * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;
      const gyMax = Math.ceil((ry * TR_ESCAPE_BAND) / TR_CELL) * TR_CELL;

      for (let gy = gyMin; gy <= gyMax; gy += TR_CELL) {
        for (let gx = gxMin; gx <= gxMax; gx += TR_CELL) {
          const d = ed(gx, gy);
          let delay: number, anim: string;
          if (d <= 1) {
            delay = dotDelay(d);
            anim = `tr-dot-flash 200ms ease-out ${delay}ms forwards`;
          } else if (d <= TR_ESCAPE_BAND) {
            if (Math.random() > TR_ESCAPE_PROB) continue;
            const jitter = Math.round(((d - 1) / (TR_ESCAPE_BAND - 1)) * 60 + Math.random() * 30);
            delay = dotDelay(1) + jitter;
            anim = `tr-dot-flash 160ms ease-out ${delay}ms forwards`;
          } else continue;
          const el = document.createElement('div');
          el.className = 'tr-cell';
          el.style.cssText = `left:${cx + gx - TR_CELL / 2}px;top:${cy + gy - TR_CELL / 2}px`;
          el.style.animation = anim;
          const pick = trPickFromPalette(palette);
          el.innerHTML = trDotSvg(pick.kind, pick.opacity);
          frag.appendChild(el);
        }
      }
      overlay.appendChild(frag);

      const spanDelay = (s: HTMLElement) => {
        const r = s.getBoundingClientRect();
        const gx = r.left + r.width / 2 - sr.left - cx;
        const gy = r.top + r.height / 2 - sr.top - cy;
        return dotDelay(Math.min(ed(gx, gy), 1));
      };
      firstSpans.forEach((s) => {
        const d = spanDelay(s);
        s.style.animation = `tr-char-erase 120ms ease-out ${d}ms forwards`;
      });
      secondSpans.forEach((s) => {
        const d = spanDelay(s);
        s.style.animation = `tr-char-appear 120ms ease-out ${d}ms forwards`;
      });

      window.setTimeout(() => {
        overlay.innerHTML = '';
        outgoing.textContent = '';
        if (live) live.textContent = text;
        animatingRef.current = false;
      }, TR_TOTAL_MS + 260);
    };
    // requestAnimationFrame works in active tabs; fall back to setTimeout if
    // rAF doesn't fire within ~50ms (e.g., headless preview environments).
    let started = false;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (started) return;
      started = true;
      runBody();
    }));
    window.setTimeout(() => {
      if (started) return;
      started = true;
      runBody();
    }, 50);
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        height: TITLE_BOX_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // overflow visible 允许气泡 y 轴超出标题区域
        overflow: 'visible',
      }}
    >
      <style>{`
        @keyframes tr-dot-flash { 0%{opacity:0} 15%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-erase { 0%{opacity:1} 100%{opacity:0} }
        @keyframes tr-char-appear { 0%{opacity:0} 100%{opacity:1} }
        .tr-cell{ position:absolute; width:${TR_CELL}px; height:${TR_CELL}px; opacity:0; pointer-events:none; }
      `}</style>
      {/* Outgoing text — only filled during a transition */}
      <h1
        ref={outgoingRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: 0, right: 0, top: '50%',
          transform: `translateY(-50%) scale(${scale})`,
          transformOrigin: 'center',
          fontSize: TITLE_BASE_FONT,
          lineHeight: TITLE_LH,
          fontWeight: 400,
          color: 'var(--text-n9)',
          textAlign: 'center',
          letterSpacing: 0.45,
          margin: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <h1
        ref={titleRef}
        style={{
          fontSize: TITLE_BASE_FONT,
          lineHeight: TITLE_LH,
          fontWeight: 400,
          color: 'var(--text-n9)',
          textAlign: 'center',
          letterSpacing: 0.45,
          margin: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {text}
      </h1>
      {/* Dot-burst overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'visible',
        }}
      />
    </div>
  );
}

/* ========== Mobile skill detail modal ========== */

function SkillDetailModal({
  template,
  onClose,
  onSelect,
}: {
  template: NewChatTemplate;
  onClose: () => void;
  onSelect: () => void;
}) {
  const tags = (template as CommunitySkillTemplate).tags ?? tagsForSkill(template.id);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'newchat-fade 160ms ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 360,
          background: '#ffffff',
          borderRadius: 14,
          padding: 20,
          boxShadow: '0 20px 48px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.08)',
          animation: 'newchat-fadeup 220ms ease-out',
        }}
      >
        {/* 顶部：skill 名 + 副标题（小字直接放在大字下方，避免长标题挤压） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <h2
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 18,
              lineHeight: '24px',
              fontWeight: 600,
              color: 'var(--text-n9)',
              letterSpacing: 0.18,
              margin: 0,
            }}
          >
            {template.label}
          </h2>
          <span
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 11,
              lineHeight: '16px',
              color: 'rgba(0,0,0,0.4)',
              letterSpacing: 0.11,
              fontWeight: 500,
            }}
          >
            {relativeTimeForSkill(template.id)}
          </span>
        </div>
        {/* 描述 */}
        <p
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 13,
            lineHeight: '20px',
            color: 'var(--text-n7)',
            letterSpacing: 0.13,
            margin: '10px 0 0',
          }}
        >
          {template.description}
        </p>
        {/* tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                height: 20,
                padding: '0 6px',
                borderRadius: 5,
                background: 'var(--b-r05)',
                color: 'var(--text-n5)',
                fontFamily: "'Delight', sans-serif",
                fontSize: 11,
                lineHeight: '20px',
                letterSpacing: 0.11,
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 分割线（创作者行紧贴上下两条分隔线） */}
        <div style={{ height: 1, background: 'var(--line-l07)', margin: '20px 0 12px' }} />
        {/* 创建者信息行：左 avatar + 名字 / 右 socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={template.creator} size={36} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 11,
                  lineHeight: '14px',
                  color: 'var(--text-n5)',
                  letterSpacing: 0.11,
                  fontWeight: 500,
                }}
              >
                Created by
              </div>
              <div
                style={{
                  fontFamily: "'Delight', sans-serif",
                  fontSize: 14,
                  lineHeight: '20px',
                  color: 'var(--text-n9)',
                  letterSpacing: 0.14,
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {template.creator}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {socialsForCreator(template.creator).map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '9999px',
                  background: 'var(--b-r05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {s.render()}
              </a>
            ))}
          </div>
        </div>
        {/* Pick 按钮 */}
        {/* 分割线（按钮之上） */}
        <div style={{ height: 1, background: 'var(--line-l07)', margin: '12px 0 20px' }} />
        <button
          type="button"
          onClick={onSelect}
          style={{
            width: '100%',
            height: 44,
            border: 'none',
            borderRadius: 10,
            background: 'var(--main-m1)',
            color: '#fff',
            fontFamily: "'Delight', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0.14,
            cursor: 'pointer',
          }}
        >
          Pick this skill
        </button>
      </div>
    </div>,
    document.body,
  );
}

/* ══════ MAIN COMPONENT ══════ */

const HERO_WIDTH = 960;

export default function NewChat({ onNavigate, onOpenSearch, variant = 'default' }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void; variant?: 'default' | 'opt2' }) {
  const isOpt2 = variant === 'opt2';
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [injectSignal, setInjectSignal] = useState<{ text: string; seq: number } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [debouncedTypedText, setDebouncedTypedText] = useState('');
  const [hover, setHover] = useState<{ id: string; rect: DOMRect; placeAbove: boolean; side: 'auto' | 'left' } | null>(null);
  const [communityOpen, setCommunityOpen] = useState(false);
  // 移动端：点击药丸 / 列表项展示详情弹窗
  const [mobileDetailId, setMobileDetailId] = useState<string | null>(null);
  // 当移动端弹窗 / 抽屉打开时，给 body 加 class 用 CSS 把顶部栏让路
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const overlayOpen = !!mobileDetailId || communityOpen;
    document.body.classList.toggle('nc-overlay-open', overlayOpen);
    return () => {
      document.body.classList.remove('nc-overlay-open');
    };
  }, [mobileDetailId, communityOpen]);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  // Opt2 瀑布流的列数：<640 → 1, <1024 → 2, 否则 3。
  const [opt2ColCount, setOpt2ColCount] = useState<number>(() =>
    typeof window === 'undefined' ? 3 : window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3,
  );
  useEffect(() => {
    const h = () => {
      const w = window.innerWidth;
      setOpt2ColCount(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const hoverHideTimerRef = useRef<number | null>(null);

  const cancelHoverHide = () => {
    if (hoverHideTimerRef.current !== null) {
      window.clearTimeout(hoverHideTimerRef.current);
      hoverHideTimerRef.current = null;
    }
  };
  const scheduleHoverHide = () => {
    cancelHoverHide();
    hoverHideTimerRef.current = window.setTimeout(() => setHover(null), 160);
  };

  const computeHover = (id: string, rect: DOMRect, side: 'auto' | 'left' = 'auto') => {
    if (side === 'left') {
      cancelHoverHide();
      setHover({ id, rect, placeAbove: false, side: 'left' });
      return;
    }
    // 决定信息卡放在 pill 上方还是下方：若同容器内还有 pill 在它下方（更靠近视口底），就放上方避开
    let placeAbove = false;
    if (pillsContainerRef.current) {
      const siblingButtons = pillsContainerRef.current.querySelectorAll('button, [role="button"]');
      siblingButtons.forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        if (r.top > rect.bottom - 1) placeAbove = true;
      });
    }
    cancelHoverHide();
    setHover({ id, rect, placeAbove, side: 'auto' });
  };
  // 加载阶段：选中后由 0 → 1 → 2，分别表示骨架展示 / 真实数据已就绪
  // promptsReady ~ 900ms, cardsReady ~ 1500ms 后置位（骨架展示更久，给真实内容入场更明显的对比）
  const [promptsReady, setPromptsReady] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTypedText(typedText), 700);
    return () => clearTimeout(t);
  }, [typedText]);

  useEffect(() => {
    if (!communityOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCommunityOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [communityOpen]);

  // 选中变化时重置加载阶段，并按节奏让真实内容入场
  useEffect(() => {
    if (!selectedId) {
      setPromptsReady(false);
      setCardsReady(false);
      return;
    }
    setPromptsReady(false);
    setCardsReady(false);
    const t1 = setTimeout(() => setPromptsReady(true), 900);
    const t2 = setTimeout(() => setCardsReady(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedId]);

  const typedSuggestions = useMemo(() => generateTypedSuggestions(debouncedTypedText), [debouncedTypedText]);
  const showTypedSuggestions = !selectedId && typedSuggestions.length > 0;

  const selected: NewChatTemplate | null = useMemo(() => {
    if (!selectedId) return null;
    return (
      PRIMARY_TEMPLATES.find((t) => t.id === selectedId) ||
      OTHERS_TEMPLATES.find((t) => t.id === selectedId) ||
      COMMUNITY_TEMPLATES.find((t) => t.id === selectedId) ||
      null
    );
  }, [selectedId]);

  // 所有 skills 合并到一个池子；2 行内能放下的进 inline，其他塞进 More 下拉
  const allSkills: NewChatTemplate[] = useMemo(
    () => [...PRIMARY_TEMPLATES, ...OTHERS_TEMPLATES, ...COMMUNITY_TEMPLATES],
    [],
  );
  const morePillRef = useRef<HTMLButtonElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // 直接对真实 pill 容器测量：先把所有 pill 设回可见，从尾部迭代隐藏直到 More 在第 1 或第 2 行。
  // 隐藏通过 DOM 直接 mutation；hiddenIds state 仅供 More 下拉读取。
  useLayoutEffect(() => {
    const recompute = () => {
      const container = pillsContainerRef.current;
      if (!container) return;
      const allItems = Array.from(container.querySelectorAll<HTMLElement>('button[data-skill-id]'));
      const moreWrap = container.querySelector<HTMLElement>('[data-more-wrap]');
      if (!moreWrap) return;
      // 重置
      allItems.forEach((el) => {
        el.style.display = '';
      });
      moreWrap.style.display = '';
      const hidden: string[] = [];
      // 未选中态最多 4 行，选中后收紧为最多 2 行
      const maxRows = selectedId ? 2 : 4;
      const fitsRows = () => {
        const tops = [
          ...new Set([
            ...allItems.filter((el) => el.style.display !== 'none').map((el) => el.offsetTop),
            moreWrap.offsetTop,
          ]),
        ].sort((a, b) => a - b);
        const moreRowIndex = tops.indexOf(moreWrap.offsetTop);
        return moreRowIndex >= 0 && moreRowIndex <= maxRows - 1;
      };
      let safety = allItems.length;
      while (safety-- > 0 && !fitsRows()) {
        const visible = allItems.filter((el) => el.style.display !== 'none');
        if (visible.length === 0) break;
        const last = visible[visible.length - 1];
        const id = last.dataset.skillId;
        if (id) hidden.push(id);
        last.style.display = 'none';
        void container.offsetWidth;
      }
      // 全部能放下 + More 也没必要时，把 More 隐藏
      if (hidden.length === 0) {
        moreWrap.style.display = 'none';
      }
      const next = new Set(hidden);
      const same = next.size === hiddenIds.size && [...next].every((id) => hiddenIds.has(id));
      if (!same) setHiddenIds(next);
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    if (pillsContainerRef.current) ro.observe(pillsContainerRef.current);
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
    // 注意：把 selectedId 加入依赖，确保从「选中态」回到「pill 行可见」时重新测量
  }, [allSkills, hiddenIds, selectedId]);

  const moreSkills: NewChatTemplate[] = useMemo(
    () => allSkills.filter((s) => hiddenIds.has(s.id)),
    [allSkills, hiddenIds],
  );
  const showMorePill = moreSkills.length > 0;

  const handlePillClick = (id: string) => {
    if (isMobile) {
      setMobileDetailId(id);
      setCommunityOpen(false);
      setHover(null);
      return;
    }
    setSelectedId((prev) => (prev === id ? null : id));
    setHover(null);
    setCommunityOpen(false);
  };
  const handleCommunitySelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setHover(null);
    setCommunityOpen(false);
  };
  const handleConfirmMobileSelect = () => {
    if (mobileDetailId) {
      setSelectedId(mobileDetailId);
      setMobileDetailId(null);
      setCommunityOpen(false);
    }
  };
  const handleRemoveChip = () => setSelectedId(null);
  const handlePromptClick = (text: string) => setInjectSignal({ text, seq: Date.now() });
  const handleThreadSelect = (id: string) => {
    if (id === '__agent__') onNavigate('agent');
    else onNavigate(`thread/${id}` as Page);
  };

  const hoveredTemplate = hover ? PRIMARY_TEMPLATES.find((t) => t.id === hover.id) || OTHERS_TEMPLATES.find((t) => t.id === hover.id) || COMMUNITY_TEMPLATES.find((t) => t.id === hover.id) : null;

  return (
    <AppShell activePage={(isOpt2 ? 'new-chat-opt2' : 'new-chat') as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <style>{`
        @keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes newchat-fade{from{opacity:0}to{opacity:1}}
        @keyframes newchat-bubble-pop{
          0%{opacity:0;transform:scale(0.55)}
          55%{opacity:1;transform:scale(1.08)}
          100%{opacity:1;transform:scale(1)}
        }
        @keyframes newchat-skeleton{
          0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}
        }
        .nc-skeleton-anim{animation:newchat-skeleton 1.4s ease-in-out infinite}
        button.nc-pill{display:flex}
        .nc-prompt-row{
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px;
          background:transparent;
          border:none;
          border-radius:8px;
          text-align:left;
          cursor:pointer;
          width:100%;
          transition:background 0.15s, transform 0.15s;
        }
        .nc-prompt-text{
          flex:1;
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:22px;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .newchat-page-topbar{display:none}
          /* mobile pill：尺寸更小，单行能放更多 */
          .nc-pill{
            height:40px !important;
            padding:0 14px !important;
            font-size:14px !important;
            line-height:22px !important;
            gap:8px !important;
            letter-spacing:0.14px !important;
          }
          .nc-pill > img,
          .nc-pill > div[class*="rounded-full"]{
            width:22px !important;
            height:22px !important;
            min-width:22px !important;
            min-height:22px !important;
          }
          .nc-pill > div[role="img"],
          .nc-pill .block{
            width:16px !important;
            height:16px !important;
          }
          .nc-hero-section{
            padding:56px 16px 12px !important;
            gap:24px !important;
          }
          /* 移动端输入框内边距收紧 */
          .chat-input-wrapper{
            padding:12px !important;
            gap:8px !important;
          }
          .nc-prompts-container{
            margin-top:0 !important;
            max-width:none !important;
          }
          .nc-prompt-row{
            padding:12px 4px;
            background:transparent;
            border-radius:0;
            margin-bottom:0;
          }
          /* 每个 prompt 被包了一层 div 用于动画，所以 :last-child 总是匹配。
             改为给非最后一个的"包装层"加底边（向下挂分割线）。 */
          .nc-prompts-container > div > div:not(:last-child){
            border-bottom:0.5px solid var(--line-l07);
          }
          .nc-prompt-text{
            font-size:13px;
            line-height:20px;
            white-space:normal;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
          }
          .nc-cards-section{
            padding:12px 16px 80px !important;
          }
        }
        @media (hover: hover){
          .nc-creator-link:hover{background:var(--b-r05)}
          .nc-creator-link:hover .nc-creator-link-name{color:var(--main-m1);text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid var(--line-l2);
          border-radius:8px;
          box-shadow:var(--shadow-s);
          z-index:20;
          animation:newchat-fadeup 160ms ease-out;
          overflow:hidden;
        }
        .more-skills-dropdown-scroll{
          max-height:360px;
          overflow-y:auto;
          padding:6px;
        }
        .more-skill-row{
          display:flex;
          align-items:center;
          gap:10px;
          width:100%;
          padding:8px 12px;
          border:none;
          background:transparent;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover{
            background:var(--b-r05);
          }
        }
        .more-skills-backdrop{display:none}
        .more-skills-header{display:none}
        @media (max-width: 639px){
          .more-skills-backdrop{
            display:block;
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.45);
            z-index:9998;
            animation:newchat-fade 200ms ease-out;
          }
          .more-skills-dropdown{
            position:fixed !important;
            z-index:9999 !important;
            top:auto !important;
            right:0 !important;
            left:0 !important;
            bottom:0 !important;
            width:100% !important;
            border-radius:14px 14px 0 0 !important;
            animation:newchat-sheet-up 220ms cubic-bezier(0.2,0.8,0.2,1);
          }
          .more-skills-dropdown::before{
            content:"";
            display:block;
            width:36px;
            height:4px;
            border-radius:2px;
            background:rgba(0,0,0,0.18);
            margin:8px auto 4px;
          }
          .more-skills-header{
            display:flex !important;
            align-items:center;
            justify-content:space-between;
            padding:14px 16px 8px;
          }
          .more-skills-title{
            font-family:'Delight',sans-serif;
            font-size:16px;
            line-height:22px;
            font-weight:600;
            color:var(--text-n9);
            letter-spacing:0.16px;
          }
          .more-skills-close{
            width:24px;
            height:24px;
            border:none;
            background:transparent;
            padding:0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          }
          .more-skills-dropdown-scroll{
            max-height:60vh !important;
            padding:4px 12px 32px !important;
            display:flex !important;
            flex-direction:column;
            gap:8px;
          }
          .more-skill-row{
            padding:18px 16px !important;
            background:var(--b-r05) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:var(--b-r07) !important;
          }
          .more-skill-name{
            font-size:15px !important;
            line-height:20px !important;
          }
          .more-skill-author{
            font-size:13px !important;
            line-height:18px !important;
          }
          /* 移动端 sheet 行底色已是灰，icon tile 用白色避免叠灰 */
          .more-skill-icon-wrap{
            background:#fff !important;
          }
        }
        @keyframes newchat-sheet-up{
          from{transform:translateY(100%)}
          to{transform:translateY(0)}
        }
        .more-skill-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .more-skill-name{
          font-family:'Delight',sans-serif;
          font-size:14px;
          line-height:20px;
          font-weight:400;
          color:var(--text-n9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-icon-wrap{
          width:32px;
          height:32px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          /* 桌面默认灰底，hover 时变白让 icon 浮起 */
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .more-skill-row:hover .more-skill-icon-wrap{
            background:#fff;
          }
        }
        /* 圆头像加弱边框，避免在灰底上融掉 */
        .more-skill-row > div[class*="rounded-full"],
        .more-skill-row > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }

        /* ══════ Skills library panel (bottom-up, full grid) ══════ */
        .skills-panel-backdrop{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.45);
          z-index:9998;
          animation:newchat-fade 200ms ease-out;
        }
        @keyframes skills-panel-modal-in{
          from{ opacity:0; transform:translate(-50%, -50%) scale(0.96); }
          to{ opacity:1; transform:translate(-50%, -50%) scale(1); }
        }
        .skills-panel{
          position:fixed;
          left:50%;
          top:50%;
          transform:translate(-50%, -50%);
          width:calc(100% - 48px);
          max-width:1200px;
          max-height:min(800px, calc(100vh - 64px));
          background:#fff;
          border-radius:14px;
          box-shadow:0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08);
          z-index:9999;
          display:flex;
          flex-direction:column;
          animation:skills-panel-modal-in 220ms cubic-bezier(0.2,0.8,0.2,1);
          overflow:hidden;
        }
        .skills-panel-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:20px 24px 12px;
          flex-shrink:0;
        }
        .skills-panel-title{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:600;
          color:var(--text-n9);
          letter-spacing:0.18px;
        }
        .skills-panel-close{
          width:28px;
          height:28px;
          border:none;
          background:transparent;
          border-radius:6px;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 140ms ease;
        }
        @media (hover: hover){
          .skills-panel-close:hover{ background:var(--b-r05); }
        }
        .skills-panel-scroll{
          flex:1;
          overflow-y:auto;
          padding:4px 24px 24px;
        }
        /* 手动分列瀑布流：JS 把卡片 round-robin 分到 N 个独立列容器（flex column）
           每列独立堆叠 → 第一行顶部对齐；某列内 hover 撑高，只影响同列下方卡片，
           其它列不会跟着重排。 */
        .skills-panel-grid{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .skills-panel-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        @media (max-width: 639px){
          .skills-panel{
            max-height:85vh;
          }
          .skills-panel-scroll{ padding:4px 16px 24px; }
          .skills-panel-header{ padding:16px 16px 8px; }
        }
        .skills-panel-card{
          position:relative;
          display:flex;
          flex-direction:column;
          gap:16px;
          padding:20px;
          text-align:left;
          background:var(--b-r02);
          border:1px solid var(--line-l07);
          border-radius:8px;
          cursor:pointer;
          /* Same easing + duration for hover-in and hover-out across every prop */
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     border-color 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     box-shadow 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     padding-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--line-l12);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
            /* 用户行下方边距 = 用户行到分割线的距离（16px）*/
            padding-bottom:16px;
          }
        }
        .skills-panel-card.is-selected{
          background:var(--b-r02);
          border-color:var(--main-m1);
        }
        @media (hover: hover){
          .skills-panel-card.is-selected:hover{
            background:rgba(255,255,255,0.9);
            border-color:var(--main-m1);
            box-shadow:0 6px 20px rgba(0,0,0,0.04);
          }
        }
        /* Hover 展开底部 creator + socials 行。
           所有过渡使用统一的 240ms cubic-bezier(0.4,0,0.2,1)，确保
           hover-in 和 hover-out 节奏一致。 */
        .skills-panel-card-hoverblock{
          display:grid;
          grid-template-rows:0fr;
          opacity:0;
          /* margin-top:-16 抵消 card-level gap:16，使收起态不留间距；
             展开时 grid-template-rows 撑开，gap:16 通过 row-gap 自然出现。 */
          margin-top:-16px;
          transition:grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     opacity 240ms cubic-bezier(0.4, 0, 0.2, 1),
                     margin-top 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skills-panel-card-hoverblock-inner{
          overflow:hidden;
          min-height:0;
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        @media (hover: none){
          .skills-panel-card-hoverblock{
            grid-template-rows:1fr;
            opacity:1;
            margin-top:0;
          }
        }
        /* KOL 卡片（顶部用 Avatar）：hover 时头像隐藏，标题块滑到左侧。
           Alva 卡片（顶部用 icon-wrap）不参与此动画 —— 图标保留。 */
        .skills-panel-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
        }
        .skills-panel-card-titleblock{
          transition:transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-creator-thumb{
            visibility:hidden;
          }
          .skills-panel-card:hover .skills-panel-card-creator-thumb + .skills-panel-card-titleblock{
            transform:translateX(-48px);
          }
        }
        .skills-panel-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:0 0 16px;
        }
        .skills-panel-card-creator-row{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .skills-panel-card-creator-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
        }
        .skills-panel-card-creator-name{
          align-self:flex-start;
          max-width:100%;
          padding:0;
          margin:0;
          background:transparent;
          border:none;
          cursor:pointer;
          text-align:left;
          color:var(--text-n9);
          font:inherit;
        }
        .skills-panel-card-creator-name-text{
          display:inline-block;
          max-width:100%;
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.13px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          text-decoration:underline dashed transparent;
          text-decoration-thickness:1px;
          text-underline-offset:3px;
          transition:text-decoration-color 160ms ease;
        }
        @media (hover: hover){
          .skills-panel-card-creator-name:hover .skills-panel-card-creator-name-text{
            text-decoration-color:var(--text-n9);
          }
        }
        .skills-panel-card-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
        }
        .skills-panel-card-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background 120ms ease;
        }
        .skills-panel-card-social:hover{ background:rgba(0,0,0,0.1); }
        .skills-panel-card-content{
          display:flex;
          flex-direction:column;
          gap:4px;
        }
        .skills-panel-card-header{
          display:flex;
          align-items:center;
          gap:12px;
          padding-bottom:4px;
        }
        .skills-panel-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:#fff;
          border:1px solid var(--line-l05);
          transition:background 240ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          .skills-panel-card:hover .skills-panel-card-icon-wrap{
            background:var(--b-r02);
          }
        }
        .skills-panel-card-titleblock{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
        }
        .skills-panel-card-name{
          font-family:'Delight',sans-serif;
          font-size:18px;
          line-height:28px;
          font-weight:500;
          color:var(--text-n9);
          letter-spacing:0.18px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-author{
          font-family:'Delight',sans-serif;
          font-size:10px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.1px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .skills-panel-card-desc{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          margin:0;
        }
        .skills-panel-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:4px;
          padding-top:4px;
        }
        .skills-panel-card-tag{
          height:22px;
          padding:0 6px;
          border-radius:4px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:20px;
          letter-spacing:0.12px;
          white-space:nowrap;
          display:inline-flex;
          align-items:center;
        }

        /* ══════ Opt2 page skill cards (manual columns / hover-reveal) ══════
           列数由 JS 根据视口算好；每列是独立 flex column，列之间不会互相影响。
           Round-robin 分布让高优 skill 落在每一列的顶部。 */
        .nc-skill-masonry{
          display:flex;
          gap:12px;
          align-items:flex-start;
        }
        .nc-skill-col{
          flex:1 1 0;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:12px;
        }
        .nc-skill-card{
          display:block;
          width:100%;
          background:#fff;
          border:0.5px solid var(--line-l07);
          border-radius:12px;
          padding:16px;
          font-family:inherit;
          cursor:pointer;
          text-align:left;
          transition:box-shadow 160ms ease, border-color 160ms ease;
        }
        .nc-skill-card:focus-visible{
          outline:2px solid rgba(73,163,166,0.6);
          outline-offset:2px;
        }
        @media (hover: hover){
          .nc-skill-card:hover{
            box-shadow:0 6px 18px rgba(0,0,0,0.06);
            border-color:rgba(0,0,0,0.14);
          }
        }
        .nc-skill-card-header{
          display:flex;
          align-items:center;
          /* gap 改为 thumb / icon 自带 margin-right，方便 hover 时一起平滑收起 */
        }
        .nc-skill-card-creator-thumb{
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          margin-right:12px;
          /* hover 时 visibility:hidden 让头像瞬间消失但仍占位，让旁边的文字
             用 transform 平滑滑到左侧（headline + meta 一起平移）。 */
        }
        .nc-skill-card-creator-thumb > div[class*="rounded-full"],
        .nc-skill-card-creator-thumb > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
        }
        .nc-skill-card-icon-wrap{
          width:36px;
          height:36px;
          flex-shrink:0;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:9999px;
          background:var(--b-r05);
          border:1px solid var(--line-l12);
          margin-right:12px;
        }
        .nc-skill-card-text{
          flex:1;
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .nc-skill-card-name{
          font-family:'Delight',sans-serif;
          font-size:15px;
          line-height:20px;
          font-weight:600;
          color:var(--text-n9);
          letter-spacing:0.15px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:var(--text-n5);
          letter-spacing:0.12px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .nc-skill-card-text{
          transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (hover: hover){
          /* 顶部头像直接 invisible（瞬间消失但保留占位），name+subtitle 用 transform
             平滑左移 48px（头像 36 + margin-right 12）滑到左侧。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb{
            visibility:hidden;
          }
          /* 用相邻兄弟选择器：只对头像类卡片的 text 平移；icon 类卡片（图标不消失）不动。 */
          .nc-skill-card:hover .nc-skill-card-creator-thumb + .nc-skill-card-text{
            transform:translateX(-48px);
          }
        }
        .nc-skill-card-desc{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:20px;
          color:var(--text-n7);
          letter-spacing:0.13px;
          margin:12px 0 0;
        }
        /* hover 之前隐藏，hover 时挤出。
           - 默认（鼠标移走时生效）：起手就收，曲线偏 ease-in，让卡片立刻往回缩。
           - hover（展开时生效）：Material 标准曲线，整段均匀流速能看到在涨高。 */
        /* 用 grid-template-rows 0fr → 1fr 的技巧把高度直接动画到 content 真实高度，
           避免 max-height 从 360px 先无效地缩回到 content 实际高度的"前置无视觉空走"。 */
        .nc-skill-card-extra-wrap{
          display:grid;
          grid-template-rows:0fr;
          /* 默认（收回）：起手即最快，鼠标一离开就开始缩 */
          transition:grid-template-rows 200ms ease-out;
        }
        .nc-skill-card-extra{
          overflow:hidden;
          opacity:0;
          transition:opacity 160ms ease-out;
        }
        @media (hover: hover){
          .nc-skill-card:hover .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
            transition:grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nc-skill-card:hover .nc-skill-card-extra{
            opacity:1;
          }
        }
        @media (hover: none){
          .nc-skill-card-extra-wrap{
            grid-template-rows:1fr;
          }
          .nc-skill-card-extra{
            opacity:1;
          }
        }
        /* 触屏：始终显示 */
        @media (hover: none){
          .nc-skill-card-extra{
            max-height:none;
            opacity:1;
          }
        }
        .nc-skill-card-tags{
          display:flex;
          flex-wrap:wrap;
          gap:5px;
          margin-top:12px;
        }
        .nc-skill-card-tag{
          height:20px;
          padding:0 6px;
          border-radius:5px;
          background:var(--b-r05);
          color:var(--text-n5);
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:20px;
          letter-spacing:0.11px;
          white-space:nowrap;
        }
        .nc-skill-card-divider{
          height:1px;
          background:var(--line-l07);
          margin:12px 0;
        }
        .nc-skill-card-creator{
          display:flex;
          align-items:center;
          gap:10px;
        }
        .nc-skill-card-creator > div[class*="rounded-full"],
        .nc-skill-card-creator > img{
          box-shadow:inset 0 0 0 1px var(--line-l12);
          border-radius:9999px;
          flex-shrink:0;
        }
        .nc-skill-card-creator-text{
          display:flex;
          flex-direction:column;
          flex:1 1 auto;
          min-width:0;
        }
        .nc-skill-card-creator-socials{
          display:flex;
          align-items:center;
          gap:6px;
          flex-shrink:0;
          margin-left:auto;
        }
        .nc-skill-card-creator-social{
          width:24px;
          height:24px;
          border-radius:9999px;
          background:var(--b-r05);
          display:inline-flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          transition:background 120ms ease;
        }
        .nc-skill-card-creator-social:hover{ background:rgba(0,0,0,0.1); }
        .nc-skill-card-creator-caps{
          font-family:'Delight',sans-serif;
          font-size:11px;
          line-height:14px;
          color:rgba(0,0,0,0.4);
          letter-spacing:0.11px;
          font-weight:400;
        }
        .nc-skill-card-creator-name{
          font-family:'Delight',sans-serif;
          font-size:13px;
          line-height:18px;
          color:var(--text-n9);
          letter-spacing:0.13px;
          font-weight:500;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media (max-width: 639px){
          .nc-skill-card{ padding:14px; }
        }
      `}</style>
      <div className="h-screen overflow-y-auto relative" style={{ backgroundColor: 'var(--grey-g01)' }}>
        {/* ══════ Topbar — 在移动端由 AppShell 的 mobile topbar 接管，这里隐藏 ══════ */}
        <div
          className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0 newchat-page-topbar"
          style={{ position: 'sticky', top: 0, zIndex: 5, background: 'transparent' }}
        >
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId="new"
              onSelect={handleThreadSelect}
              trigger={
                <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] truncate">
                    New Chat
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2)" />
                </div>
              }
            />
          </div>
        </div>

        {/* ══════ HERO ══════ */}
        <section
          className="nc-hero-section"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 40,
            padding: '56px 24px 32px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <TitleHero selected={selected} maxWidth={HERO_WIDTH} />

          {/* 输入框 */}
          <div style={{ width: '100%', maxWidth: HERO_WIDTH, position: 'relative', zIndex: 1 }}>
            <ChatInput
              shadow
              hideSkill
              hideInspector
              bottomChip={
                selected
                  ? {
                      label: selected.label,
                      icon: selected.kol ? undefined : selected.icon ?? CHIP_ICON,
                      avatar: selected.kol ? selected.creator : undefined,
                      creator: selected.creator,
                      onRemove: handleRemoveChip,
                      onHover: (rect) => computeHover(selected.id, rect),
                      onLeave: scheduleHoverHide,
                    }
                  : null
              }
              injectText={injectSignal}
              onInputChange={setTypedText}
            />
          </div>

          {/* 输入触发的 typed suggestions */}
          {showTypedSuggestions && (
            <div
              key={debouncedTypedText}
              className="nc-prompts-container"
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH,
                position: 'relative',
                zIndex: 1,
                marginTop: -16,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {typedSuggestions.map((p, i) => (
                <div
                  key={i}
                  style={{
                    animation: 'newchat-fadeup 320ms ease-out both',
                    animationDelay: `${i * 110}ms`,
                  }}
                >
                  <InlineSuggestionRow text={p} onClick={() => handlePromptClick(p)} />
                </div>
              ))}
            </div>
          )}

          {/* skill pills — 未选中时展示。所有 pill + More 始终渲染在同一个容器；
            布局测量时直接 mutate display:none 把溢出的 pill 隐藏（state 仅供 More 下拉用）。
            Opt2 用瀑布流卡片代替药丸 → 这一行只在默认变体下渲染。 */}
          {!isOpt2 && !showTypedSuggestions && (
            <div
              ref={pillsContainerRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: 900,
              }}
            >
              {allSkills.map((t) => {
                const isActive = selectedId === t.id;
                return (
                <button
                  key={t.id}
                  data-skill-id={t.id}
                  className="nc-pill"
                  onClick={() => handlePillClick(t.id)}
                  onMouseEnter={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    computeHover(t.id, e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseLeave={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    scheduleHoverHide();
                  }}
                  style={{
                    ...chipBaseStyle,
                    background: isActive ? 'var(--main-m1)' : 'white',
                    color: isActive ? '#fff' : chipBaseStyle.color,
                    borderColor: isActive ? 'var(--main-m1)' : (chipBaseStyle.border as string)?.replace('0.5px solid ', '') ?? undefined,
                  }}
                >
                  {t.kol ? (
                    <Avatar name={t.creator} size={22} />
                  ) : (
                    t.icon && <CdnIcon name={t.icon} size={16} color={isActive ? '#fff' : 'var(--text-n7)'} />
                  )}
                  {t.label}
                </button>
                );
              })}
              {!isOpt2 && <div ref={communityRef} data-more-wrap style={{ position: 'relative' }}>
                <button
                  ref={morePillRef}
                  type="button"
                  className="nc-pill"
                  aria-expanded={communityOpen}
                  aria-label="More skills"
                  style={{
                    ...chipBaseStyle,
                    cursor: 'pointer',
                    background: communityOpen ? '#f3f8f8' : 'white',
                    border: communityOpen ? '0.5px solid rgba(73,163,166,0.45)' : chipBaseStyle.border,
                  }}
                  onMouseEnter={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!supportsHover()) return;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => {
                    setCommunityOpen((v) => !v);
                    setHover(null);
                  }}
                >
                  More
                  <CdnIcon name="arrow-right-l2" size={14} color="var(--text-n5)" />
                </button>
              </div>}
            </div>
          )}

          {/* 选中后输入框下方的 prompts —— 先骨架，再淡入真实 */}
          {selected && (
            <div
              className="nc-prompts-container"
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH,
                position: 'relative',
                zIndex: 1,
                marginTop: -16,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {!promptsReady ? (
                <div className="nc-skeleton-anim" style={{ animation: 'newchat-fade 200ms ease-out' }}>
                  <PromptRowSkeleton widthPct={92} />
                  <PromptRowSkeleton widthPct={70} />
                  <PromptRowSkeleton widthPct={82} />
                </div>
              ) : (
                <div style={{ animation: 'newchat-fade 280ms ease-out' }}>
                  {selected.prompts.slice(0, 3).map((p, i) => (
                    <div
                      key={i}
                      style={{
                        animation: 'newchat-fadeup 320ms ease-out both',
                        animationDelay: `${i * 70}ms`,
                      }}
                    >
                      <InlineSuggestionRow text={p} onClick={() => handlePromptClick(p)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ══════ Opt2 默认态：手动分列的瀑布流，hover 时本列下方卡片下推、其它列不动 ══════ */}
        {isOpt2 && !selected && (() => {
          // 列数响应式：JS 根据视口决定列数，把 skills round-robin 分到独立列容器里。
          // 每列是独立的 flex column —— 一列里某张卡片 hover 撑高，只会把同列的下方卡片往下推，
          // 不会把卡片"挤"到别的列，从根上避免闪烁。
          const cols = Math.max(1, opt2ColCount);
          const columns: NewChatTemplate[][] = Array.from({ length: cols }, () => []);
          allSkills.forEach((s, i) => columns[i % cols].push(s));
          return (
            <section
              className="nc-skills-grid-section"
              style={{
                width: '100%',
                maxWidth: HERO_WIDTH + 48,
                margin: '0 auto',
                padding: '0 24px 80px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div className="nc-skill-masonry">
                {columns.map((col, ci) => (
                  <div className="nc-skill-col" key={ci}>
                    {col.map((s, i) => {
                      const tags = (s as CommunitySkillTemplate).tags ?? tagsForSkill(s.id);
                      return (
                        <article
                          key={s.id}
                          role="button"
                          tabIndex={0}
                          className="nc-skill-card"
                          onClick={() => {
                            setSelectedId(s.id);
                            setHover(null);
                            setCommunityOpen(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedId(s.id);
                              setHover(null);
                              setCommunityOpen(false);
                            }
                          }}
                          style={{
                            animation: 'newchat-fadeup 360ms ease-out both',
                            animationDelay: `${Math.min(ci + i * cols, 12) * 30}ms`,
                          }}
                        >
                          <header className="nc-skill-card-header">
                            {s.kol ? (
                              <span className="nc-skill-card-creator-thumb">
                                <Avatar name={s.creator} size={36} />
                              </span>
                            ) : s.icon ? (
                              <span className="nc-skill-card-icon-wrap">
                                <CdnIcon name={s.icon} size={20} color="var(--text-n7)" />
                              </span>
                            ) : (
                              <span className="nc-skill-card-creator-thumb">
                                <Avatar name={s.creator} size={36} />
                              </span>
                            )}
                            <span className="nc-skill-card-text">
                              <span className="nc-skill-card-name">{s.label}</span>
                              <span className="nc-skill-card-author">by {s.creator} · {relativeTimeForSkill(s.id)}</span>
                            </span>
                          </header>
                          <p className="nc-skill-card-desc">{s.description}</p>
                          <div className="nc-skill-card-tags">
                            {tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="nc-skill-card-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="nc-skill-card-extra-wrap">
                          <div className="nc-skill-card-extra">
                            <div className="nc-skill-card-divider" />
                            <div className="nc-skill-card-creator">
                              <Avatar name={s.creator} size={28} />
                              <div className="nc-skill-card-creator-text">
                                <span className="nc-skill-card-creator-caps">Created by</span>
                                <span className="nc-skill-card-creator-name">{s.creator}</span>
                              </div>
                              <div className="nc-skill-card-creator-socials">
                                {socialsForCreator(s.creator).map((soc) => (
                                  <a
                                    key={soc.key}
                                    href={soc.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={soc.label}
                                    onClick={(e) => e.stopPropagation()}
                                    className="nc-skill-card-creator-social"
                                  >
                                    {soc.render()}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ══════ 选中态：6 张 playbook（3×2）—— 先骨架，再淡入真实 ══════ */}
        {selected && (
          <section
            key={selected.id}
            className="nc-cards-section"
            style={{
              width: '100%',
              maxWidth: HERO_WIDTH + 48,
              margin: '0 auto',
              padding: '0 24px 80px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {!cardsReady ? (
              <div className="nc-skeleton-anim" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, animation: 'newchat-fade 200ms ease-out' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <PlaybookCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, animation: 'newchat-fade 320ms ease-out' }}>
                {selected.playbooks.slice(0, 6).map((p, i) => (
                  <div
                    key={p.id}
                    style={{
                      animation: 'newchat-fadeup 360ms ease-out both',
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    <PlaybookCard
                      p={p}
                      skillId={selected.id}
                      skillLabel={selected.label}
                      skillIcon={selected.icon}
                      skillKol={selected.kol}
                      skillCreator={selected.creator}
                      onClick={() => {
                        sessionStorage.setItem('autoOpenChatPanel', '1');
                        onNavigate('new-chat');
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {hover && hoveredTemplate && (
        <SkillInfoCard
          template={hoveredTemplate}
          anchor={hover.rect}
          placeAbove={hover.placeAbove}
          side={hover.side}
          onMouseEnter={cancelHoverHide}
          onMouseLeave={scheduleHoverHide}
        />
      )}
      {communityOpen && !isOpt2 && (
        <SkillsLibraryPanel
          skills={allSkills}
          selectedId={selectedId}
          onSelect={handleCommunitySelect}
          onClose={() => setCommunityOpen(false)}
        />
      )}
      {mobileDetailId && (() => {
        const tmpl = allSkills.find((s) => s.id === mobileDetailId);
        if (!tmpl) return null;
        return (
          <SkillDetailModal
            template={tmpl}
            onClose={() => setMobileDetailId(null)}
            onSelect={handleConfirmMobileSelect}
          />
        );
      })()}
    </AppShell>
  );
}
