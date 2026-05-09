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
  'theme-tracker': { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  'smart-screener': { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  backtest: { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  'crypto-pulse': { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  'yield-hunter': { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  'dividend-diary': { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' },
  // m2 blue
  'what-if': { bg: 'rgba(33,150,243,0.1)', fg: '#2196f3' },
  'deep-dive': { bg: 'rgba(33,150,243,0.1)', fg: '#2196f3' },
  // m5 yellow
  valuation: { bg: 'rgba(230,169,26,0.1)', fg: '#e6a91a' },
  'daily-macro-brief': { bg: 'rgba(230,169,26,0.1)', fg: '#e6a91a' },
  'earnings-edge': { bg: 'rgba(230,169,26,0.1)', fg: '#e6a91a' },
};
const skillColor = (id: string): SkillColor => SKILL_COLOR_MAP[id] ?? { bg: 'rgba(73,163,166,0.1)', fg: '#49a3a6' };

/* ========== Skill pill ========== */

const chipBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  padding: '0 16px',
  borderRadius: 999,
  border: '0.5px solid rgba(0,0,0,0.12)',
  fontFamily: "'Delight', sans-serif",
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 500,
  color: 'rgba(0,0,0,0.7)',
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
        template.icon && <CdnIcon name={template.icon} size={16} color="rgba(0,0,0,0.7)" />
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
        borderRadius: 14,
        border: '0.5px solid rgba(0,0,0,0.1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
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
            fontWeight: 600,
            color: 'rgba(0,0,0,0.9)',
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
          color: 'rgba(0,0,0,0.7)',
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
              background: 'rgba(0,0,0,0.05)',
              color: 'rgba(0,0,0,0.58)',
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
      <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '20px 0' }} />
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
                fontWeight: 500,
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
                color: 'rgba(0,0,0,0.9)',
                letterSpacing: 0.14,
                fontWeight: 500,
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
                background: 'rgba(0,0,0,0.05)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 120ms ease, transform 120ms ease',
              }}
              onMouseEnter={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (!supportsHover()) return;
                e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
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
        e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
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
          background: 'rgba(0,0,0,0.06)',
          borderRadius: 4,
          maxWidth: `${widthPct}%`,
        }}
      />
      <div style={{ width: 20, height: 20, background: 'rgba(0,0,0,0.04)', borderRadius: 4 }} />
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
        border: '0.5px solid rgba(0,0,0,0.3)',
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
                background: 'rgba(0,0,0,0.05)',
                color: 'rgba(0,0,0,0.7)',
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
              color: 'rgba(0,0,0,0.9)',
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
              color: 'rgba(0,0,0,0.5)',
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
        border: '0.5px solid rgba(0,0,0,0.12)',
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
          background: 'rgba(0,0,0,0.04)',
        }}
      />
      <div style={{ padding: '16px 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 70, height: 20, background: 'rgba(0,0,0,0.06)', borderRadius: 4 }} />
          <div style={{ width: 40, height: 20, background: 'rgba(0,0,0,0.05)', borderRadius: 4 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 18, background: 'rgba(0,0,0,0.06)', borderRadius: 4, maxWidth: '60%' }} />
          <div style={{ height: 12, background: 'rgba(0,0,0,0.04)', borderRadius: 4 }} />
          <div style={{ height: 12, background: 'rgba(0,0,0,0.04)', borderRadius: 4, maxWidth: '80%' }} />
        </div>
      </div>
    </div>
  );
}

/* ========== More skills dropdown（替代旧 CommunitySkillsPopover） ========== */

function MoreSkillsDropdown({
  skills,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  onRowHover,
  onRowLeave,
  onBackdrop,
}: {
  skills: NewChatTemplate[];
  onSelect: (id: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onRowHover?: (id: string, rect: DOMRect) => void;
  onRowLeave?: () => void;
  onBackdrop?: () => void;
}) {
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 640;
  const content = (
    <>
      {/* mobile-only 半透明遮罩，桌面下被 CSS display:none 隐藏 */}
      <div className="more-skills-backdrop" onClick={onBackdrop} />
      <div
        className="more-skills-dropdown"
        role="menu"
        onMouseEnter={isMobileViewport ? undefined : onMouseEnter}
        onMouseLeave={isMobileViewport ? undefined : onMouseLeave}
      >
        {/* 移动端标题行：More skills + 关闭按钮，桌面下 CSS 隐藏 */}
        <div className="more-skills-header">
          <span className="more-skills-title">More skills</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onBackdrop}
            className="more-skills-close"
          >
            <CdnIcon name="close-l1" size={16} color="rgba(0,0,0,0.7)" />
          </button>
        </div>
        <div className="more-skills-dropdown-scroll">
          {skills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              role="menuitem"
              className="more-skill-row"
              onClick={() => onSelect(skill.id)}
              onMouseEnter={isMobileViewport ? undefined : (e) => onRowHover?.(skill.id, e.currentTarget.getBoundingClientRect())}
              onMouseLeave={isMobileViewport ? undefined : () => onRowLeave?.()}
            >
              {skill.kol ? (
                <Avatar name={skill.creator} size={32} />
              ) : (
                skill.icon ? (
                  <span className="more-skill-icon-wrap">
                    <CdnIcon name={skill.icon} size={20} color="rgba(0,0,0,0.7)" />
                  </span>
                ) : (
                  <Avatar name={skill.creator} size={32} />
                )
              )}
              <span className="more-skill-text">
                <span className="more-skill-name">{skill.label}</span>
                <span className="more-skill-author">{skill.creator}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
  // 移动端用 portal 渲染到 body，避免 stacking context 把遮罩压在顶部栏下面
  if (isMobileViewport && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  return content;
}

/* ========== Title hero — 标题 + 创建者气泡，允许折行，纵向居中，固定高度 ========== */

const TITLE_DESKTOP_FONT = 45;
const TITLE_MOBILE_FONT = 28;
const TITLE_LH = 1.2;
const MOBILE_THRESHOLD_PX = 640;

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
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [bubblePos, setBubblePos] = useState<{ top: number; left: number } | null>(null);

  const text = selected ? `Build your ${selected.label}` : 'Pick a skill and start building';
  const showBubble = !!selected?.kol;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const compute = () => {
      const containerW = container.clientWidth;
      const bubble = bubbleRef.current;
      const bubbleW = showBubble && bubble ? bubble.scrollWidth : 0;
      const isMobile = window.innerWidth < MOBILE_THRESHOLD_PX;
      // 移动端：气泡放在标题上方独立一行，标题占用容器全宽，避免被挤成 3 行。
      // 桌面：气泡贴第一行右上角，与标题共享一行宽度。
      const titleMaxW = !isMobile && showBubble && bubble
        ? Math.max(220, containerW - bubbleW)
        : containerW;
      title.style.maxWidth = `${titleMaxW}px`;

      const naturalH = title.scrollHeight;
      const nextScale = naturalH > TITLE_BOX_HEIGHT ? TITLE_BOX_HEIGHT / naturalH : 1;
      setScale(nextScale);

      if (showBubble && bubble) {
        const bubbleH = bubble.offsetHeight || 32;
        if (isMobile) {
          // 移动端：气泡置于容器右上方，整体位于标题上方（容器有 paddingTop 留出空间）
          setBubblePos({ top: -bubbleH - 6, left: Math.max(0, containerW - bubbleW) });
        } else {
          // 桌面：气泡贴标题第一行右上角；溢出时改右对齐
          const range = document.createRange();
          range.selectNodeContents(title);
          const lineRects = range.getClientRects();
          range.detach?.();
          const containerRect = container.getBoundingClientRect();
          const firstLine = lineRects.length > 0 ? lineRects[0] : null;
          const firstLineTop = firstLine ? firstLine.top - containerRect.top : 0;
          const firstLineRight = firstLine ? firstLine.right - containerRect.left : 0;
          const gap = 8;
          const desiredLeft = firstLineRight + gap;
          const wouldOverflow = desiredLeft + bubbleW > containerW;
          const finalLeft = wouldOverflow ? Math.max(0, containerW - bubbleW) : desiredLeft;
          const top = firstLineTop + 4 - bubbleH;
          setBubblePos({ top, left: finalLeft });
        }
      } else {
        setBubblePos(null);
      }
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    if (bubbleRef.current) ro.observe(bubbleRef.current);
    return () => ro.disconnect();
  }, [text, showBubble]);

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
      <h1
        ref={titleRef}
        key={selected?.id ?? 'default'}
        style={{
          fontSize: TITLE_BASE_FONT,
          lineHeight: TITLE_LH,
          fontWeight: 400,
          color: 'rgba(0,0,0,0.9)',
          textAlign: 'center',
          letterSpacing: 0.45,
          margin: 0,
          animation: 'newchat-fadeup 240ms ease-out',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        {text}
      </h1>
      {showBubble && selected && (
        <div
          ref={bubbleRef}
          key={`bubble-${selected.id}`}
          style={{
            position: 'absolute',
            top: bubblePos ? bubblePos.top : 0,
            left: bubblePos ? bubblePos.left : 0,
            visibility: bubblePos ? 'visible' : 'hidden',
            transformOrigin: 'left center',
            animation: 'newchat-bubble-pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1) 700ms backwards',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            height: 32,
            padding: '0 12px 0 4px',
            background: 'white',
            borderRadius: 999,
            border: '0.5px solid rgba(0,0,0,0.1)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            whiteSpace: 'nowrap',
          }}
        >
          <Avatar name={selected.creator} size={24} />
          <span
            style={{
              fontFamily: "'Delight', sans-serif",
              fontSize: 14,
              lineHeight: '22px',
              fontWeight: 500,
              color: 'rgba(0,0,0,0.9)',
              letterSpacing: 0.14,
            }}
          >
            {selected.creator}
          </span>
        </div>
      )}
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
              color: 'rgba(0,0,0,0.9)',
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
            color: 'rgba(0,0,0,0.7)',
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
                background: 'rgba(0,0,0,0.05)',
                color: 'rgba(0,0,0,0.58)',
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
        <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '20px 0 12px' }} />
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
                  color: 'rgba(0,0,0,0.4)',
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
                  color: 'rgba(0,0,0,0.9)',
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
                  background: 'rgba(0,0,0,0.05)',
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
        <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '12px 0 20px' }} />
        <button
          type="button"
          onClick={onSelect}
          style={{
            width: '100%',
            height: 44,
            border: 'none',
            borderRadius: 10,
            background: '#49A3A6',
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

export default function NewChat({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
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
  const moreHideTimerRef = useRef<number | null>(null);
  const cancelMoreHide = () => {
    if (moreHideTimerRef.current !== null) {
      window.clearTimeout(moreHideTimerRef.current);
      moreHideTimerRef.current = null;
    }
  };
  const scheduleMoreHide = () => {
    cancelMoreHide();
    moreHideTimerRef.current = window.setTimeout(() => setCommunityOpen(false), 180);
  };
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

    const handlePointerDown = (event: MouseEvent) => {
      const t = event.target as Node;
      if (communityRef.current?.contains(t)) return;
      // 弹层是 portal 到 body 的，需要单独豁免内部点击
      const el = t as Element | null;
      if (el?.closest?.('.more-skills-dropdown')) return;
      // 背景遮罩点击有自己的 onBackdrop handler 处理关闭逻辑，不要重复
      if (el?.closest?.('.more-skills-backdrop')) return;
      setCommunityOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCommunityOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
      // 移动端允许 3 行，桌面 2 行
      const maxRows = window.innerWidth < 640 ? 4 : 2;
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
    if (isMobile) {
      // 移动端：从抽屉里点击 → 仅展开详情弹窗，保持抽屉打开方便用户再选
      setMobileDetailId(id);
      setHover(null);
      return;
    }
    setSelectedId(id);
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
    <AppShell activePage={'new-chat' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
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
          color:rgba(0,0,0,0.9);
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
            border-bottom:0.5px solid rgba(0,0,0,0.08);
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
          .nc-creator-link:hover{background:rgba(0,0,0,0.05)}
          .nc-creator-link:hover .nc-creator-link-name{color:#49A3A6;text-decoration:underline;text-underline-offset:2px}
        }
        .more-skills-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          right:0;
          width:320px;
          background:#fff;
          border:0.5px solid rgba(0,0,0,0.1);
          border-radius:12px;
          box-shadow:0 12px 32px rgba(0,0,0,0.10),0 2px 6px rgba(0,0,0,0.04);
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
            background:rgba(0,0,0,0.04);
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
            color:rgba(0,0,0,0.9);
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
            background:rgba(0,0,0,0.04) !important;
            border-radius:12px !important;
            gap:14px !important;
          }
          .more-skill-row:active{
            background:rgba(0,0,0,0.08) !important;
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
          font-weight:500;
          color:rgba(0,0,0,0.9);
          letter-spacing:0.14px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .more-skill-author{
          font-family:'Delight',sans-serif;
          font-size:12px;
          line-height:16px;
          color:rgba(0,0,0,0.45);
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
          background:rgba(0,0,0,0.05);
          border:1px solid rgba(0,0,0,0.12);
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
          box-shadow:inset 0 0 0 1px rgba(0,0,0,0.12);
          border-radius:9999px;
        }
      `}</style>
      <div className="h-screen overflow-y-auto relative" style={{ backgroundColor: '#fafafa' }}>
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
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate">
                    New Chat
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
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
              bottomChip={
                selected
                  ? {
                      label: selected.label,
                      icon: selected.kol ? undefined : selected.icon ?? CHIP_ICON,
                      avatar: selected.kol ? selected.creator : undefined,
                      onRemove: handleRemoveChip,
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
            布局测量时直接 mutate display:none 把溢出的 pill 隐藏（state 仅供 More 下拉用） */}
          {!selected && !showTypedSuggestions && (
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
              {allSkills.map((t) => (
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
                    background: selectedId === t.id ? '#f3f8f8' : 'white',
                  }}
                >
                  {t.kol ? (
                    <Avatar name={t.creator} size={22} />
                  ) : (
                    t.icon && <CdnIcon name={t.icon} size={16} color="rgba(0,0,0,0.7)" />
                  )}
                  {t.label}
                </button>
              ))}
              <div ref={communityRef} data-more-wrap style={{ position: 'relative' }}>
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
                    if (isMobile) return;
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    cancelMoreHide();
                    if (moreSkills.length > 0) setCommunityOpen(true);
                    setHover(null);
                  }}
                  onMouseLeave={(e) => {
                    if (!supportsHover()) return;
                    if (isMobile) return;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    scheduleMoreHide();
                  }}
                  onClick={() => {
                    if (!isMobile) return;
                    if (moreSkills.length > 0) setCommunityOpen((v) => !v);
                  }}
                >
                  More
                  <CdnIcon name="arrow-down-l2" size={14} color="rgba(0,0,0,0.5)" />
                </button>
                {communityOpen && moreSkills.length > 0 && (
                  <MoreSkillsDropdown
                    skills={moreSkills}
                    onSelect={handleCommunitySelect}
                    onMouseEnter={cancelMoreHide}
                    onMouseLeave={scheduleMoreHide}
                    onRowHover={(id, rect) => computeHover(id, rect, 'left')}
                    onRowLeave={scheduleHoverHide}
                    onBackdrop={() => setCommunityOpen(false)}
                  />
                )}
              </div>
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
