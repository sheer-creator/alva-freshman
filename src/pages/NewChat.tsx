/**
 * [INPUT]: Page type, AppShell, ChatInput (bottomChip), new-chat-mock, Dropdown
 * [OUTPUT]: New Chat 入口页 — skill 驱动的起手页面
 * [POS]: 与 Home 并列的入口页面（Sidebar 最顶）
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { PRIMARY_TEMPLATES, OTHERS_TEMPLATES, type NewChatTemplate, type NewChatPlaybook } from '@/data/new-chat-mock';
import { generateTypedSuggestions } from '@/data/typed-suggestions';
import { PlaybookCover } from '@/lib/playbook-cover/PlaybookCover';
import type { CoverInput, Template as CoverTemplateName, DomainKey } from '@/lib/playbook-cover/types';

const CHIP_ICON = 'researcher-l1';

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
        if (ref.current) {
          ref.current.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
          ref.current.style.transform = 'translateY(-2px)';
          if (onHover) onHover(ref.current.getBoundingClientRect());
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.boxShadow = 'none';
          ref.current.style.transform = 'translateY(0)';
        }
        onLeave?.();
      }}
      style={{ ...chipBaseStyle, background: active ? '#e5eeee' : 'white' }}
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

function relativeTimeForSkill(skillId: string): string {
  // 用 skill id 派生稳定的「最近更新」相对时间 — 0 ~ 7200 分钟（~5 天）
  const h = (() => {
    let x = 0x811c9dc5;
    for (let i = 0; i < skillId.length; i++) {
      x ^= skillId.charCodeAt(i);
      x = Math.imul(x, 0x01000193);
    }
    return x >>> 0;
  })();
  const minutes = h % 7200;
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (24 * 60))}d ago`;
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

const SOCIAL_DEFS: Record<string, SocialDef> = {
  discord: { key: 'discord', label: 'Discord', href: 'https://discord.com', render: renderImg('logo-social-discord.svg') },
  telegram: { key: 'telegram', label: 'Telegram', href: 'https://telegram.org', render: renderImg('logo-telegram.svg') },
  x: { key: 'x', label: 'X', href: 'https://x.com', render: renderXLogo() },
  line: { key: 'line', label: 'LINE', href: 'https://line.me', render: renderImg('logo-social-line.svg') },
  whatsapp: { key: 'whatsapp', label: 'WhatsApp', href: 'https://whatsapp.com', render: renderImg('logo-social-whatsapp.svg') },
};

const ALVA_SOCIALS = ['discord', 'telegram', 'x'] as const;
const NON_ALVA_POOL = ['discord', 'telegram', 'x', 'line', 'whatsapp'] as const;

function socialsForCreator(creator: string): SocialDef[] {
  if (creator === 'Alva') return ALVA_SOCIALS.map((k) => SOCIAL_DEFS[k]);
  // 用 creator 名稳定派生 3 个 socials
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
  const sorted = [...NON_ALVA_POOL].sort((a, b) => seedScore(a) - seedScore(b));
  return sorted.slice(0, 3).map((k) => SOCIAL_DEFS[k]);
}

function SkillInfoCard({
  template,
  anchor,
  placeAbove,
  onMouseEnter,
  onMouseLeave,
}: {
  template: NewChatTemplate;
  anchor: DOMRect;
  placeAbove: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const cardWidth = 300;
  const cardHeight = 175;
  const gap = 10;
  let left = anchor.left + anchor.width / 2 - cardWidth / 2;
  if (typeof window !== 'undefined') {
    left = Math.max(12, Math.min(left, window.innerWidth - cardWidth - 12));
  }
  const top = placeAbove ? anchor.top - cardHeight - gap : anchor.bottom + gap;

  const capsLabelStyle: React.CSSProperties = {
    fontFamily: "'Delight', sans-serif",
    fontSize: 11,
    lineHeight: '14px',
    color: 'rgba(0,0,0,0.4)',
    letterSpacing: 0.11,
    fontWeight: 500,
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top,
        left,
        width: cardWidth,
        zIndex: 50,
        background: '#ffffff',
        borderRadius: 12,
        border: '0.5px solid rgba(0,0,0,0.1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        padding: '14px 14px 14px',
        pointerEvents: 'auto',
        animation: 'newchat-fadeup 160ms ease-out',
      }}
    >
      {/* 顶部信息区：左右两列
       *   左：上 caps "Created by"，下 头像+名字
       *   右：上 "Last updated 1d ago"（单行小字），下 3 个社交媒体按钮
       */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={capsLabelStyle}>Created by</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name={template.creator} size={22} />
            <span
              style={{
                fontFamily: "'Delight', sans-serif",
                fontSize: 14,
                lineHeight: '22px',
                color: 'rgba(0,0,0,0.9)',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {template.creator}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <span style={{ ...capsLabelStyle, whiteSpace: 'nowrap' }}>
            Last updated {relativeTimeForSkill(template.id)}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {socialsForCreator(template.creator).map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                style={{
                  width: 22,
                  height: 22,
                  minWidth: 22,
                  minHeight: 22,
                  borderRadius: '9999px',
                  background: 'rgba(0,0,0,0.05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 120ms ease, transform 120ms ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
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
      <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '12px 0 11px' }} />
      <p
        style={{
          fontFamily: "'Delight', sans-serif",
          fontSize: 13,
          lineHeight: '20px',
          color: 'rgba(0,0,0,0.7)',
          letterSpacing: 0.13,
          margin: 0,
        }}
      >
        {template.description}
      </p>
    </div>
  );
}

/* ========== Suggested Prompt 行 ========== */

function InlineSuggestionRow({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        background: 'transparent',
        border: 'none',
        borderRadius: 8,
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.15s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span
        style={{
          flex: 1,
          fontFamily: "'Delight', sans-serif",
          fontSize: 14,
          lineHeight: '22px',
          color: 'rgba(0,0,0,0.9)',
          letterSpacing: 0.14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
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
        e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
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

/* ══════ MAIN COMPONENT ══════ */

const HERO_WIDTH = 960;

export default function NewChat({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [injectSignal, setInjectSignal] = useState<{ text: string; seq: number } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [debouncedTypedText, setDebouncedTypedText] = useState('');
  const [hover, setHover] = useState<{ id: string; rect: DOMRect; placeAbove: boolean } | null>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
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

  const computeHover = (id: string, rect: DOMRect) => {
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
    setHover({ id, rect, placeAbove });
  };
  // 加载阶段：选中后由 0 → 1 → 2，分别表示骨架展示 / 真实数据已就绪
  // promptsReady ~ 360ms, cardsReady ~ 580ms 后置位
  const [promptsReady, setPromptsReady] = useState(false);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTypedText(typedText), 700);
    return () => clearTimeout(t);
  }, [typedText]);

  // 选中变化时重置加载阶段，并按节奏让真实内容入场
  useEffect(() => {
    if (!selectedId) {
      setPromptsReady(false);
      setCardsReady(false);
      return;
    }
    setPromptsReady(false);
    setCardsReady(false);
    const t1 = setTimeout(() => setPromptsReady(true), 360);
    const t2 = setTimeout(() => setCardsReady(true), 620);
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
      null
    );
  }, [selectedId]);

  const inlineExtra = OTHERS_TEMPLATES.slice(0, 4);
  const inlinePills = [...PRIMARY_TEMPLATES, ...inlineExtra];

  const handlePillClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setHover(null);
  };
  const handleRemoveChip = () => setSelectedId(null);
  const handlePromptClick = (text: string) => setInjectSignal({ text, seq: Date.now() });
  const handleThreadSelect = (id: string) => {
    if (id === '__agent__') onNavigate('agent');
    else onNavigate(`thread/${id}` as Page);
  };

  const hoveredTemplate = hover ? PRIMARY_TEMPLATES.find((t) => t.id === hover.id) || OTHERS_TEMPLATES.find((t) => t.id === hover.id) : null;

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
      `}</style>
      <div className="h-screen overflow-y-auto relative" style={{ backgroundColor: '#fafafa' }}>
        {/* ══════ Topbar ══════ */}
        <div
          className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0"
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
          {/* 标题 + 创建者气泡 */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <h1
              key={selected?.id ?? 'default'}
              style={{
                fontSize: 45,
                lineHeight: 1.2,
                fontWeight: 400,
                color: 'rgba(0,0,0,0.9)',
                textAlign: 'center',
                letterSpacing: 0.45,
                margin: 0,
                animation: 'newchat-fadeup 240ms ease-out',
                whiteSpace: 'nowrap',
              }}
            >
              {selected ? `Build your ${selected.label}` : 'Pick a skill and start building'}
            </h1>
            {selected?.kol && (
              <div
                key={`bubble-${selected.id}`}
                style={{
                  position: 'absolute',
                  top: -14,
                  left: 'calc(100% + 8px)',
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

          {/* skill pills — 未选中时展示 */}
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
                maxWidth: 900,
              }}
            >
              {inlinePills.map((t) => (
                <SkillPill
                  key={t.id}
                  template={t}
                  active={selectedId === t.id}
                  onClick={() => handlePillClick(t.id)}
                  onHover={(rect) => computeHover(t.id, rect)}
                  onLeave={scheduleHoverHide}
                />
              ))}
              <div
                style={{ ...chipBaseStyle, cursor: 'pointer', background: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore more skills
                <CdnIcon name="arrow-right-l2" size={14} color="rgba(0,0,0,0.5)" />
              </div>
            </div>
          )}

          {/* 选中后输入框下方的 prompts —— 先骨架，再淡入真实 */}
          {selected && (
            <div
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
          onMouseEnter={cancelHoverHide}
          onMouseLeave={scheduleHoverHide}
        />
      )}
    </AppShell>
  );
}
