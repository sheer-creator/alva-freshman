import { useRef, useState, useCallback, useEffect } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from './CdnIcon';
import { Avatar } from './Avatar';
import { Tooltip } from './Tooltip';
import type { ContextTagData } from '@/lib/chat-config';
import { AVATAR_COLOR_PALETTE, CREATOR_AVATARS } from '@/lib/chart-theme';
import { useChatContext } from '../chat/ChatContext';

export interface BottomChipData {
  label: string;
  icon?: string;
  /** Creator name — when set, render an Avatar instead of CdnIcon */
  avatar?: string;
  /** Optional creator prefix — when set, chip text becomes "{creator}/{label}" */
  creator?: string;
  onRemove?: () => void;
  /** Hover preview wiring — parent renders the skill info card */
  onHover?: (rect: DOMRect) => void;
  onLeave?: () => void;
}

export interface InjectTextSignal {
  text: string;
  seq: number;
}

interface ChatInputProps {
  placeholder?: string;
  contextTag?: ContextTagData | null;
  shadow?: boolean;
  onSend?: (text: string) => void;
  bottomChip?: BottomChipData | null;
  injectText?: InjectTextSignal | null;
  onInputChange?: (text: string) => void;
  hideSkill?: boolean;
  hideInspector?: boolean;
  allowReferences?: boolean;
  autoFocus?: boolean;
  /** 描边降级为 L2(默认深框 n7) — task 详情页底部 composer 用 */
  subtleBorder?: boolean;
}

type PickerKind = 'mention' | 'skill';
type PickerAnchorMode = 'toolbar' | 'caret';
type PickerItemType = 'portfolio' | 'playbook' | 'session' | 'skill';

interface PickerPosition {
  left: number;
  top: number;
  width: number;
}

interface PreviewPosition {
  left: number;
  top: number;
  width: number;
}

interface PortfolioHolding {
  symbol: string;
  weight: string;
  value: string;
  pnl: string;
  pnlPct: string;
  pnlPositive: boolean;
}

type PickerPreviewData =
  | {
      kind: 'portfolio';
      value: string;
      gain: string;
      percent: string;
      range: string;
      account: string;
      holdings: PortfolioHolding[];
    }
  | {
      kind: 'session';
      title: string;
      description: string;
    }
  | {
      kind: 'playbook';
      title: string;
      description: string;
      builtOn: string;
      creator: string;
    }
  | {
      kind: 'skill';
      title: string;
      age: string;
      description: string;
      tags: string[];
      creator: string;
    };

interface ChatPickerItem {
  id: string;
  type: PickerItemType;
  label: string;
  insertText: string;
  icon?: string;
  avatar?: string;
  preview: PickerPreviewData;
  targetHash?: string;
}

const PREVIEW_WIDTH = 480;
const PICKER_GAP = 8;
const PREVIEW_GAP = 8;
const ICON_CDN = 'https://alva-ai-static.b-cdn.net/icons';
const DROPDOWN_ACTIVE_BACKGROUND = 'rgba(73,163,166,0.08)';
const DROPDOWN_HOVER_BACKGROUND = 'var(--b-r03)';
const PICKER_HEIGHT: Record<PickerKind, number> = {
  mention: 350,
  skill: 272,
};
const MODEL_OPTIONS = ['Sonnet 4.6', 'Opus 4.7'];

const MENTION_PICKER_ITEMS: ChatPickerItem[] = [
  {
    id: 'ibkr-live',
    type: 'portfolio',
    icon: 'wallet-l',
    label: 'IBKR · U***6789 · Live',
    insertText: 'IBKR · U***6789 · Live',
    targetHash: 'portfolio',
    preview: {
      kind: 'portfolio',
      value: '$8,223.06',
      gain: '+$1,234',
      percent: '+1.25%',
      range: '1D',
      account: 'U***6789 · Live',
      holdings: [
        { symbol: 'AAPL', weight: '10.2%', value: '$10,301.83', pnl: '+$1,140.21', pnlPct: '+12.45%', pnlPositive: true },
        { symbol: 'NVDA', weight: '9.4%', value: '$9,520.40', pnl: '+$2,032.55', pnlPct: '+27.13%', pnlPositive: true },
        { symbol: 'MSFT', weight: '7.8%', value: '$7,896.10', pnl: '+$486.32', pnlPct: '+6.56%', pnlPositive: true },
        { symbol: 'TSLA', weight: '6.5%', value: '$6,553.20', pnl: '-$312.84', pnlPct: '-4.55%', pnlPositive: false },
        { symbol: 'AMZN', weight: '5.1%', value: '$5,144.05', pnl: '+$201.78', pnlPct: '+4.08%', pnlPositive: true },
      ],
    },
  },
  {
    id: 'attribution-analysis',
    type: 'playbook',
    icon: 'sidebar-dashboard-normal',
    label: '@Sheer-X/Attribution Analysis Strategy for Price Trends',
    insertText: '@Sheer-X/Attribution Analysis Strategy for Price Trends',
    targetHash: 'template-thesis',
    preview: {
      kind: 'playbook',
      title: 'CRCL Earnings Radar — FY26 Q1',
      description: 'Tweet signals from @shanghaojin across three holding strategies, with AI Trader Profile. Spec-compliant remix.',
      builtOn: '@leo/BTC Ultimate AI Trader',
      creator: 'Sheer-X',
    },
  },
  {
    id: 'btc-dip',
    type: 'playbook',
    icon: 'sidebar-dashboard-normal',
    label: '@Long-US/BTC Dip Mean-Reversion RSI Bollinger v2',
    insertText: '@Long-US/BTC Dip Mean-Reversion RSI Bollinger v2',
    targetHash: 'template-whatif',
    preview: {
      kind: 'playbook',
      title: 'BTC Dip Mean-Reversion RSI Bollinger v2',
      description: 'Mean-reversion framework for BTC dips using RSI compression, Bollinger reclaim, and liquidity regime filters.',
      builtOn: '@leo/BTC Ultimate AI Trader',
      creator: 'Long-US',
    },
  },
  {
    id: 'binance-spot',
    type: 'portfolio',
    icon: 'wallet-l',
    label: 'Binance · U***6789 · Spot',
    insertText: 'Binance · U***6789 · Spot',
    targetHash: 'portfolio',
    preview: {
      kind: 'portfolio',
      value: '$12,048.90',
      gain: '+$420',
      percent: '+0.72%',
      range: '1D',
      account: 'U***6789 · Spot',
      holdings: [
        { symbol: 'BTC', weight: '38.6%', value: '$4,650.82', pnl: '+$612.40', pnlPct: '+15.16%', pnlPositive: true },
        { symbol: 'ETH', weight: '22.4%', value: '$2,696.95', pnl: '+$184.21', pnlPct: '+7.33%', pnlPositive: true },
        { symbol: 'SOL', weight: '11.8%', value: '$1,421.77', pnl: '+$203.55', pnlPct: '+16.71%', pnlPositive: true },
        { symbol: 'LINK', weight: '6.2%', value: '$747.03', pnl: '-$42.18', pnlPct: '-5.34%', pnlPositive: false },
        { symbol: 'USDT', weight: '4.0%', value: '$481.96', pnl: '+$0.02', pnlPct: '+0.00%', pnlPositive: true },
      ],
    },
  },
  {
    id: 'tsla-financial',
    type: 'session',
    icon: 'sidebar-thread-normal',
    label: 'TSLA Financial Trends and Charts Analysis',
    insertText: 'TSLA Financial Trends and Charts Analysis',
    targetHash: 'thread/tsla-financial',
    preview: {
      kind: 'session',
      title: 'TSLA Financial Trends and Charts Analysis',
      description: 'Tweet signals from @shanghaojin across three holding strategies, with AI Trader Profile. Spec-compliant remix.',
    },
  },
  {
    id: 'nvda-price-fetcher',
    type: 'playbook',
    icon: 'sidebar-dashboard-normal',
    label: '@Sheer-X/NVDA Price Fetcher',
    insertText: '@Sheer-X/NVDA Price Fetcher',
    targetHash: 'template-screener',
    preview: {
      kind: 'playbook',
      title: 'NVDA Price Fetcher',
      description: 'Daily NVDA price and relative-strength fetcher with AI infrastructure watchlist context.',
      builtOn: '@leo/BTC Ultimate AI Trader',
      creator: 'Sheer-X',
    },
  },
  {
    id: 'treasury-btc-1',
    type: 'session',
    icon: 'sidebar-thread-normal',
    label: 'US Treasury Yield and Bitcoin Correlation Analysis',
    insertText: 'US Treasury Yield and Bitcoin Correlation Analysis',
    targetHash: 'thread/treasury-btc-1',
    preview: {
      kind: 'session',
      title: 'US Treasury Yield and Bitcoin Correlation Analysis',
      description: 'Correlation notes across real yields, liquidity expectations, and BTC risk appetite.',
    },
  },
  {
    id: 'treasury-btc-2',
    type: 'session',
    icon: 'sidebar-thread-normal',
    label: 'US Treasury Yield and Bitcoin Correlation Analysis',
    insertText: 'US Treasury Yield and Bitcoin Correlation Analysis',
    targetHash: 'thread/treasury-btc-2',
    preview: {
      kind: 'session',
      title: 'US Treasury Yield and Bitcoin Correlation Analysis',
      description: 'Correlation notes across real yields, liquidity expectations, and BTC risk appetite.',
    },
  },
  {
    id: 'treasury-btc-3',
    type: 'session',
    icon: 'sidebar-thread-normal',
    label: 'US Treasury Yield and Bitcoin Correlation Analysis',
    insertText: 'US Treasury Yield and Bitcoin Correlation Analysis',
    targetHash: 'thread/treasury-btc-3',
    preview: {
      kind: 'session',
      title: 'US Treasury Yield and Bitcoin Correlation Analysis',
      description: 'Correlation notes across real yields, liquidity expectations, and BTC risk appetite.',
    },
  },
];

const SKILL_PICKER_ITEMS: ChatPickerItem[] = [
  {
    id: 'theme-tracker',
    type: 'skill',
    label: 'Theme Tracker',
    insertText: 'Theme Tracker',
    icon: 'buld-l',
    avatar: 'Alva',
    preview: {
      kind: 'skill',
      title: 'Theme Tracker',
      age: '2d ago',
      description: 'Build a live tracker for any market theme — surfaces sentiment, earnings, and policy catalysts across the basket weekly.',
      tags: ['Catalyst', 'Risk Off'],
      creator: 'Alva',
    },
  },
  {
    id: 'smart-screener',
    type: 'skill',
    label: 'Smart Screener',
    insertText: 'Smart Screener',
    icon: 'target-l2',
    avatar: 'Alva',
    preview: {
      kind: 'skill',
      title: 'Smart Screener',
      age: '2d ago',
      description: 'Rank stocks by any factor combo, daily.',
      tags: ['Screener', 'Factor'],
      creator: 'Alva',
    },
  },
  {
    id: 'deep-dive',
    type: 'skill',
    label: 'Deep Dive',
    insertText: 'Deep Dive',
    icon: 'search-l',
    avatar: 'Alva',
    preview: {
      kind: 'skill',
      title: 'Deep Dive',
      age: '2d ago',
      description: 'A complete research package on any ticker, including revenue segmentation, peers, supply chain, and bull/bear thesis.',
      tags: ['Research', 'Thesis'],
      creator: 'Alva',
    },
  },
  {
    id: 'daily-macro-brief',
    type: 'skill',
    label: 'Daily Macro Brief',
    insertText: 'Daily Macro Brief',
    avatar: 'Macro Scope X',
    preview: {
      kind: 'skill',
      title: 'Daily Macro Brief',
      age: '2d ago',
      description: 'A daily breakdown of macro flows — rates, FX, and cross-asset signals — distilled into a 5-minute brief.',
      tags: ['Macro', 'Rates'],
      creator: 'Macro Scope X',
    },
  },
  {
    id: 'earnings-edge',
    type: 'skill',
    label: 'Earnings Edge',
    insertText: 'Earnings Edge',
    avatar: 'Smart Jing',
    preview: {
      kind: 'skill',
      title: 'Earnings Edge',
      age: '2d ago',
      description: 'Whisper numbers, earnings read-through, and post-print drift tracking, updated weekly.',
      tags: ['Earnings', 'Drift'],
      creator: 'Smart Jing',
    },
  },
  {
    id: 'crypto-pulse',
    type: 'skill',
    label: 'Crypto Pulse',
    insertText: 'Crypto Pulse',
    avatar: 'Harry Zzz',
    preview: {
      kind: 'skill',
      title: 'Crypto Pulse',
      age: '2d ago',
      description: 'Aggregates news flow, on-chain activity, ETF flows, exchange balances, and stablecoin issuance into a single pulse.',
      tags: ['Crypto', 'On-Chain'],
      creator: 'Harry Zzz',
    },
  },
];

function previewHeightForItem(item: ChatPickerItem) {
  if (item.preview.kind === 'portfolio') {
    const rows = item.preview.holdings.length;
    return 168 + 28 + rows * 28;
  }
  if (item.preview.kind === 'session') return 120;
  if (item.preview.kind === 'playbook') return 204;
  return 246;
}

function PickerRowIcon({ item }: { item: ChatPickerItem }) {
  if (item.type === 'skill') {
    if (item.avatar) return <Avatar name={item.avatar} size={20} />;
    if (item.icon) {
      return (
        <span className="flex size-[20px] shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--b-r05)' }}>
          <CdnIcon name={item.icon} size={14} color="var(--text-n9)" />
        </span>
      );
    }
    return (
      <span className="flex size-[20px] shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--b-r05)' }}>
        <CdnIcon name="skill-l" size={14} color="var(--text-n5)" />
      </span>
    );
  }

  return <CdnIcon name={item.icon || 'sidebar-thread-normal'} size={20} color="var(--text-n9)" />;
}

function PortfolioMark() {
  return (
    <span className="relative size-[22px] shrink-0 overflow-hidden rounded-full" style={{ background: '#1c1c1c' }}>
      <span className="absolute left-[5px] top-[5px] size-[12px] rounded-full" style={{ background: '#e05357' }} />
      <span className="absolute bottom-[3px] left-[8px] h-[10px] w-[5px] rounded-full" style={{ background: '#49A3A6' }} />
    </span>
  );
}

function SocialDot({ type }: { type: 'discord' | 'telegram' | 'x' }) {
  const src =
    type === 'discord'
      ? `${import.meta.env.BASE_URL}logo-social-discord.svg`
      : type === 'telegram'
        ? `${import.meta.env.BASE_URL}logo-social-telegram.svg`
        : null;

  return (
    <span className="flex size-[24px] shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--b-r05)' }}>
      {src ? (
        <img src={src} alt="" width={14} height={14} />
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(0,0,0,0.85)" style={{ display: 'block' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
    </span>
  );
}

function parseAuthoredLabel(label: string): { title: string; author?: string } {
  const match = label.match(/^@([^/]+)\/(.+)$/);
  if (!match) return { title: label };
  return { title: match[2], author: match[1] };
}

function getPickerRowMeta(item: ChatPickerItem): { title: string; author?: string } {
  const parsed = parseAuthoredLabel(item.label);
  if (parsed.author) return parsed;
  if (item.preview.kind === 'skill') return { title: item.label, author: item.preview.creator };
  if (item.preview.kind === 'playbook') return { title: item.label, author: item.preview.creator };
  return { title: item.label };
}

function getInlineMentionIcon(item: ChatPickerItem): string {
  if (item.type === 'playbook') return item.icon || 'sidebar-dashboard-normal';
  if (item.type === 'session') return item.icon || 'sidebar-thread-normal';
  if (item.type === 'portfolio') return item.icon || 'wallet-l';
  return item.icon || 'skill-l';
}

function createInlineAvatarNode(name: string, size = 18): HTMLElement {
  const src = CREATOR_AVATARS[name];
  if (src) {
    const image = document.createElement('img');
    image.src = src;
    image.alt = name;
    Object.assign(image.style, {
      display: 'block',
      width: `${size}px`,
      height: `${size}px`,
      minWidth: `${size}px`,
      minHeight: `${size}px`,
      borderRadius: '50%',
      objectFit: 'cover',
      flexShrink: '0',
      background: '#f0f0f0',
    });
    return image;
  }

  const avatar = document.createElement('span');
  const initial = name.trim().charAt(0).toUpperCase();
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  const color = AVATAR_COLOR_PALETTE[sum % AVATAR_COLOR_PALETTE.length];
  Object.assign(avatar.style, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    borderRadius: '50%',
    flexShrink: '0',
    background: color,
    color: '#fff',
    fontFamily: "'Delight', sans-serif",
    fontSize: `${size * 0.44}px`,
    lineHeight: '1',
  });
  avatar.textContent = initial;
  return avatar;
}

function createInlineMentionNode(item: ChatPickerItem): HTMLElement {
  const meta = getPickerRowMeta(item);
  const token = document.createElement('span');
  token.contentEditable = 'false';
  token.dataset.chatInlineToken = 'true';
  token.dataset.itemId = item.id;
  token.dataset.itemType = item.type;
  token.dataset.label = item.label;
  token.setAttribute('role', 'button');
  token.setAttribute('aria-label', meta.title);
  Object.assign(token.style, {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    maxWidth: '216px',
    padding: '1px 6px 1px 2px',
    borderRadius: 'var(--radius-ct-min, 2px)',
    background: 'rgba(73,163,166,0.05)',
    verticalAlign: '-4px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  const leadingVisual = item.type === 'skill' && item.avatar
    ? createInlineAvatarNode(item.avatar, 18)
    : document.createElement('span');

  if (!(item.type === 'skill' && item.avatar)) {
    Object.assign(leadingVisual.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '18px',
      height: '18px',
      flexShrink: '0',
      borderRadius: '2px',
      background: 'var(--main-m1, #49a3a6)',
    });

    const icon = document.createElement('span');
    const iconUrl = `${ICON_CDN}/${getInlineMentionIcon(item)}.svg`;
    Object.assign(icon.style, {
      display: 'block',
      width: '14px',
      height: '14px',
      backgroundColor: '#fff',
      WebkitMaskImage: `url(${iconUrl})`,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskImage: `url(${iconUrl})`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
    });
    leadingVisual.appendChild(icon);
  }

  const label = document.createElement('span');
  label.textContent = meta.title;
  Object.assign(label.style, {
    display: 'inline-block',
    maxWidth: item.type === 'session' ? '184px' : '184px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'var(--main-m1, #49a3a6)',
    fontFamily: "'Delight', sans-serif",
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '20px',
    letterSpacing: '0.12px',
    whiteSpace: 'nowrap',
  });

  token.appendChild(leadingVisual);
  token.appendChild(label);
  return token;
}

function ChatPickerDropdown({
  pickerRef,
  kind,
  items,
  position,
  selectedId,
  onSelect,
  onItemHover,
  onLeave,
}: {
  pickerRef: RefObject<HTMLDivElement>;
  kind: PickerKind;
  items: ChatPickerItem[];
  position: PickerPosition;
  selectedId: string | null;
  onSelect: (item: ChatPickerItem) => void;
  onItemHover: (item: ChatPickerItem, rowRect: DOMRect) => void;
  onLeave: () => void;
}) {
  return (
    <div
      ref={pickerRef}
      className="fixed z-[5000] overflow-y-auto overflow-x-hidden rounded-[8px]"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        height: PICKER_HEIGHT[kind],
        padding: '8px 0',
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
      }}
      onMouseLeave={onLeave}
    >
      {kind === 'skill' && (
        <div
          className="px-[16px] pb-[4px] pt-[8px] font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px]"
          style={{ color: 'var(--text-n5)' }}
        >
          Skill Hub
        </div>
      )}
      {items.map((item) => {
        const isSelected = kind === 'skill' && selectedId === item.id;
        const rowMeta = getPickerRowMeta(item);
        return (
          <button
            key={item.id}
            type="button"
            className="group flex w-full items-center gap-[8px] overflow-hidden rounded-[4px] px-[12px] py-[8px] text-left transition-colors"
            style={{
              height: 38,
              border: 'none',
              background: isSelected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent',
            }}
            onMouseEnter={(event) => {
              if (!isSelected) (event.currentTarget as HTMLElement).style.background = DROPDOWN_HOVER_BACKGROUND;
              onItemHover(item, event.currentTarget.getBoundingClientRect());
            }}
            onMouseLeave={(event) => {
              (event.currentTarget as HTMLElement).style.background = isSelected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent';
            }}
            onFocus={(event) => onItemHover(item, event.currentTarget.getBoundingClientRect())}
            onClick={() => onSelect(item)}
          >
            <PickerRowIcon item={item} />
            <span
              className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px]"
              style={{ color: isSelected ? 'var(--main-m1)' : 'var(--text-n9)' }}
            >
              {rowMeta.title}
            </span>
            {rowMeta.author && (
              <span
                className="ml-auto max-w-[112px] shrink-0 truncate text-right font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px]"
                style={{ color: 'var(--text-n5)' }}
              >
                {rowMeta.author}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ChatPickerPreview({
  item,
  position,
  previewRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  item: ChatPickerItem;
  position: PreviewPosition;
  previewRef: RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const preview = item.preview;
  const clickable = !!item.targetHash;

  return (
    <div
      ref={previewRef}
      className="fixed z-[5001] rounded-[8px]"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        padding: 20,
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
        fontFamily: "'Delight', sans-serif",
        color: 'var(--text-n9)',
        cursor: clickable ? 'pointer' : 'default',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={clickable ? onClick : undefined}
    >
      {preview.kind === 'portfolio' && (
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-end gap-[8px]">
            <p className="m-0 text-[28px] leading-[38px] tracking-[0.28px]" style={{ color: 'var(--text-n9)' }}>
              {preview.value}
            </p>
            <div className="flex items-end gap-[8px] py-[4px] text-[14px] leading-[22px] tracking-[0.14px]">
              <span style={{ color: 'var(--main-m3)' }}>{preview.gain}</span>
              <span style={{ color: 'var(--main-m3)' }}>{preview.percent}</span>
              <span style={{ color: 'var(--text-n5)' }}>{preview.range}</span>
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div
              className="flex items-center gap-[8px] text-[12px] leading-[20px] tracking-[0.12px]"
              style={{ color: 'var(--text-n5)' }}
            >
              <span className="w-[72px] shrink-0">Symbol</span>
              <span className="w-[64px] shrink-0 text-right">Weight</span>
              <span className="min-w-0 flex-1 text-right">Value</span>
              <span className="min-w-0 flex-1 text-right">P&amp;L</span>
            </div>
            {preview.holdings.map((h) => (
              <div
                key={h.symbol}
                className="flex items-center gap-[8px] text-[14px] leading-[22px] tracking-[0.14px]"
                style={{ color: 'var(--text-n9)', fontVariantNumeric: 'tabular-nums' }}
              >
                <span className="w-[72px] shrink-0 truncate font-medium">{h.symbol}</span>
                <span className="w-[64px] shrink-0 text-right">{h.weight}</span>
                <span className="min-w-0 flex-1 text-right">{h.value}</span>
                <span
                  className="min-w-0 flex-1 truncate whitespace-nowrap text-right"
                  style={{ color: h.pnlPositive ? 'var(--main-m3)' : 'var(--main-m4, #d04a52)' }}
                >
                  {h.pnl}
                </span>
              </div>
            ))}
          </div>
          <div style={{ height: 0, borderTop: '0.5px solid var(--line-l07)' }} />
          <div className="flex h-[22px] items-center gap-[6px]">
            <PortfolioMark />
            <p className="m-0 min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]">{preview.account}</p>
          </div>
        </div>
      )}

      {preview.kind === 'session' && (
        <div className="flex flex-col gap-[8px]">
          <p className="m-0 truncate text-[18px] leading-[28px] tracking-[0.18px]">{preview.title}</p>
          <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]">{preview.description}</p>
        </div>
      )}

      {preview.kind === 'playbook' && (
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <p className="m-0 truncate text-[18px] leading-[28px] tracking-[0.18px]">{preview.title}</p>
            <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]">{preview.description}</p>
            <div className="flex flex-wrap items-center gap-[8px]">
              <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n7)' }}>
                Built on:
              </span>
              <span
                className="inline-flex max-w-[180px] items-center gap-[2px] rounded-[2px] px-[4px] py-px text-[12px] leading-[20px] tracking-[0.12px]"
                style={{ background: 'var(--b-r05)', color: 'var(--text-n5)' }}
              >
                <Avatar name="leo" size={14} />
                <span className="truncate">{preview.builtOn}</span>
              </span>
            </div>
          </div>
          <div style={{ height: 0, borderTop: '0.5px solid var(--line-l07)' }} />
          <div className="flex items-center gap-[6px]">
            <Avatar name={preview.creator} size={22} />
            <p className="m-0 min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]">{preview.creator}</p>
          </div>
        </div>
      )}

      {preview.kind === 'skill' && (
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[4px]">
              <p className="m-0 text-[18px] leading-[28px] tracking-[0.18px]">{preview.title}</p>
              <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>
                {preview.age}
              </p>
            </div>
            <p className="m-0 text-[14px] leading-[22px] tracking-[0.14px]">{preview.description}</p>
            <div className="flex items-center gap-[8px]">
              {preview.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[2px] px-[4px] py-px text-[11px] leading-[18px] tracking-[0.11px]"
                  style={{ background: 'var(--b-r05)', color: 'var(--text-n5)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 0, borderTop: '0.5px solid var(--line-l07)' }} />
          <div className="flex items-center gap-[8px]">
            <Avatar name={preview.creator} size={36} />
            <div className="min-w-0 flex-1">
              <p className="m-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)' }}>Created by</p>
              <p className="m-0 truncate text-[14px] leading-[22px] tracking-[0.14px]">{preview.creator}</p>
            </div>
            <div className="flex shrink-0 items-center gap-[4px]">
              <SocialDot type="discord" />
              <SocialDot type="telegram" />
              <SocialDot type="x" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatInput({ placeholder = 'Ask Alva anything. @ for context, / for skills', contextTag, shadow, onSend, bottomChip, injectText, onInputChange, hideSkill, hideInspector, allowReferences = true, autoFocus = false, subtleBorder = false }: ChatInputProps) {
  const { inspectorActive, toggleInspector, elementQuotes, removeElementQuote, clearElementQuotes, streamingState, stopStreaming } = useChatContext();
  const [hasText, setHasText] = useState(false);
  const [quoteHover, setQuoteHover] = useState(false);
  const [popoverBottom, setPopoverBottom] = useState(0);
  const [chipPulse, setChipPulse] = useState(false);
  const [tagDismissed, setTagDismissed] = useState(false);
  const [activePicker, setActivePicker] = useState<PickerKind | null>(null);
  const [pickerAnchorMode, setPickerAnchorMode] = useState<PickerAnchorMode>('toolbar');
  const [pickerPosition, setPickerPosition] = useState<PickerPosition | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [hoveredPickerItem, setHoveredPickerItem] = useState<ChatPickerItem | null>(null);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition | null>(null);
  const [selectedMentionItems, setSelectedMentionItems] = useState<ChatPickerItem[]>([]);
  const [selectedSkillItem, setSelectedSkillItem] = useState<ChatPickerItem | null>(null);
  const prevQuoteCount = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mentionButtonRef = useRef<HTMLButtonElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLButtonElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementQuotes.length > prevQuoteCount.current) {
      setChipPulse(true);
      const t = setTimeout(() => setChipPulse(false), 500);
      return () => clearTimeout(t);
    }
    prevQuoteCount.current = elementQuotes.length;
  }, [elementQuotes.length]);

  const keepHover = useCallback(() => {
    if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
  }, []);

  const scheduleHide = useCallback(() => {
    keepHover();
    hoverTimer.current = setTimeout(() => setQuoteHover(false), 150);
  }, [keepHover]);

  const handleChipEnter = useCallback(() => {
    keepHover();
    setQuoteHover(true);
    const chip = chipRef.current;
    const wrapper = wrapperRef.current;
    if (chip && wrapper) {
      const wr = wrapper.getBoundingClientRect();
      const cr = chip.getBoundingClientRect();
      setPopoverBottom(wr.bottom - cr.top + 8);
    }
  }, [keepHover]);

  const getTextContent = useCallback(() => {
    if (!editorRef.current) return '';
    return editorRef.current.textContent?.replace(/\u200B/g, '').trim() || '';
  }, []);

  const placeCursorAtEnd = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }, []);

  useEffect(() => {
    if (!autoFocus) return;
    const frame = requestAnimationFrame(() => {
      editorRef.current?.focus();
      placeCursorAtEnd();
    });
    return () => cancelAnimationFrame(frame);
  }, [autoFocus, placeCursorAtEnd]);

  const getCaretRect = useCallback((): DOMRect | null => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return null;

    const collapsed = range.cloneRange();
    collapsed.collapse(false);
    const rect = collapsed.getClientRects()[0] ?? collapsed.getBoundingClientRect();
    if (rect && (rect.width || rect.height)) return rect;
    return editor.getBoundingClientRect();
  }, []);

  const getTextBeforeCaret = useCallback(() => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    if (!editor || !selection || selection.rangeCount === 0) return '';
    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return '';

    const before = range.cloneRange();
    before.selectNodeContents(editor);
    before.setEnd(range.endContainer, range.endOffset);
    return before.toString().replace(/\u200B/g, '');
  }, []);

  const createRangeFromTextOffsets = useCallback((start: number, end: number) => {
    const editor = editorRef.current;
    if (!editor) return null;

    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let current = 0;
    let startSet = false;
    let endSet = false;
    let node = walker.nextNode() as Text | null;

    while (node) {
      const next = current + node.data.length;
      if (!startSet && start <= next) {
        range.setStart(node, Math.max(0, start - current));
        startSet = true;
      }
      if (!endSet && end <= next) {
        range.setEnd(node, Math.max(0, end - current));
        endSet = true;
        break;
      }
      current = next;
      node = walker.nextNode() as Text | null;
    }

    if (!startSet || !endSet) return null;
    return range;
  }, []);

  const findActiveTriggerRange = useCallback((kind: PickerKind) => {
    const beforeCaret = getTextBeforeCaret();
    const pattern = kind === 'mention' ? /(^|\s)@[^@\s/]*$/ : /(^|\s)\/[^@\s/]*$/;
    const match = beforeCaret.match(pattern);
    if (!match || match.index === undefined) return null;
    const start = match.index + match[1].length;
    const end = beforeCaret.length;
    return createRangeFromTextOffsets(start, end);
  }, [createRangeFromTextOffsets, getTextBeforeCaret]);

  const insertInlineTokenFromCaret = useCallback((kind: PickerKind, item: ChatPickerItem) => {
    const range = findActiveTriggerRange(kind);
    const editor = editorRef.current;
    if (!range || !editor) return false;

    range.deleteContents();
    const token = createInlineMentionNode(item);
    const trailingSpace = document.createTextNode(' ');
    range.insertNode(trailingSpace);
    range.insertNode(token);

    const afterToken = document.createRange();
    afterToken.setStartAfter(trailingSpace);
    afterToken.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(afterToken);

    const text = getTextContent();
    setHasText(!!text);
    onInputChange?.(text);
    return true;
  }, [findActiveTriggerRange, getTextContent, onInputChange]);

  const updatePickerPosition = useCallback((kind: PickerKind = activePicker || 'mention', anchorMode: PickerAnchorMode = pickerAnchorMode) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const triggerRect = (kind === 'mention' ? mentionButtonRef.current : skillButtonRef.current)?.getBoundingClientRect();
    const caretRect = anchorMode === 'caret' ? getCaretRect() : null;
    const width = Math.min(wrapperRect.width, window.innerWidth - 16);
    let left = caretRect ? caretRect.left : wrapperRect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));

    const height = PICKER_HEIGHT[kind];
    const anchorTop = caretRect?.top ?? triggerRect?.top ?? wrapperRect.top;
    const anchorBottom = caretRect?.bottom ?? triggerRect?.bottom ?? wrapperRect.bottom;
    let top = anchorTop - height - PICKER_GAP;
    if (top < 8) top = Math.min(anchorBottom + PICKER_GAP, window.innerHeight - height - 8);
    top = Math.max(8, Math.min(top, window.innerHeight - height - 8));

    setPickerPosition({ left, top, width });
  }, [activePicker, getCaretRect, pickerAnchorMode]);

  const openPickerFromCaret = useCallback((kind: PickerKind) => {
    setPickerAnchorMode('caret');
    setActivePicker(kind);
    setHoveredPickerItem(null);
    setPreviewPosition(null);
    requestAnimationFrame(() => updatePickerPosition(kind, 'caret'));
  }, [updatePickerPosition]);

  const handleInput = useCallback(() => {
    const text = getTextContent();
    setHasText(!!text);
    onInputChange?.(text);

    const beforeCaret = getTextBeforeCaret();
    const triggerMatch = beforeCaret.match(/(?:^|\s)([@/])[^@\s/]*$/);
    if (triggerMatch?.[1] === '@') {
      openPickerFromCaret('mention');
      return;
    }
    if (triggerMatch?.[1] === '/' && !hideSkill) {
      openPickerFromCaret('skill');
      return;
    }
    if (pickerAnchorMode === 'caret') {
      setActivePicker(null);
      setHoveredPickerItem(null);
      setPreviewPosition(null);
    }
  }, [getTextBeforeCaret, getTextContent, hideSkill, onInputChange, openPickerFromCaret, pickerAnchorMode]);

  const cancelPreviewHide = useCallback(() => {
    if (previewHideTimer.current) {
      clearTimeout(previewHideTimer.current);
      previewHideTimer.current = null;
    }
  }, []);

  const schedulePreviewHide = useCallback(() => {
    cancelPreviewHide();
    previewHideTimer.current = setTimeout(() => {
      setHoveredPickerItem(null);
      setPreviewPosition(null);
    }, 180);
  }, [cancelPreviewHide]);

  const closePicker = useCallback(() => {
    cancelPreviewHide();
    setActivePicker(null);
    setHoveredPickerItem(null);
    setPreviewPosition(null);
  }, [cancelPreviewHide]);

  const togglePicker = useCallback((kind: PickerKind) => {
    cancelPreviewHide();
    setAddMenuOpen(false);
    setModelMenuOpen(false);
    setPickerAnchorMode('toolbar');
    setActivePicker((current) => {
      const next = current === kind ? null : kind;
      if (next) requestAnimationFrame(() => updatePickerPosition(next, 'toolbar'));
      return next;
    });
    setHoveredPickerItem(null);
    setPreviewPosition(null);
  }, [updatePickerPosition, cancelPreviewHide]);

  const toggleAddMenu = useCallback(() => {
    cancelPreviewHide();
    closePicker();
    setModelMenuOpen(false);
    setAddMenuOpen((open) => !open);
  }, [cancelPreviewHide, closePicker]);

  const toggleModelMenu = useCallback(() => {
    cancelPreviewHide();
    closePicker();
    setAddMenuOpen(false);
    setModelMenuOpen((open) => !open);
  }, [cancelPreviewHide, closePicker]);

  const selectModel = useCallback((model: string) => {
    setSelectedModel(model);
    setModelMenuOpen(false);
  }, []);

  const openFileDialog = useCallback(() => {
    setAddMenuOpen(false);
    fileInputRef.current?.click();
  }, []);

  const openMentionFromAddMenu = useCallback(() => {
    setAddMenuOpen(false);
    togglePicker('mention');
  }, [togglePicker]);

  const navigateToTarget = useCallback((item: ChatPickerItem) => {
    if (!item.targetHash) return;
    closePicker();
    window.location.hash = item.targetHash;
  }, [closePicker]);

  const selectPickerItem = useCallback((item: ChatPickerItem) => {
    if (activePicker === 'mention') {
      if (pickerAnchorMode === 'caret') {
        insertInlineTokenFromCaret('mention', item);
        closePicker();
        editorRef.current?.focus();
        return;
      }
      setSelectedMentionItems((items) => [...items, item]);
      closePicker();
      editorRef.current?.focus();
      requestAnimationFrame(() => placeCursorAtEnd());
      return;
    }

    if (pickerAnchorMode === 'caret') {
      insertInlineTokenFromCaret('skill', item);
      closePicker();
      editorRef.current?.focus();
      return;
    }
    setSelectedSkillItem((current) => (current?.id === item.id ? null : item));
    closePicker();
    editorRef.current?.focus();
    requestAnimationFrame(() => placeCursorAtEnd());
  }, [activePicker, closePicker, insertInlineTokenFromCaret, pickerAnchorMode, placeCursorAtEnd]);

  const handlePickerItemHover = useCallback((item: ChatPickerItem, rowRect: DOMRect) => {
    cancelPreviewHide();
    if (!pickerPosition) return;

    const width = Math.min(PREVIEW_WIDTH, Math.max(280, window.innerWidth - 16));
    const height = previewHeightForItem(item);
    let left = pickerPosition.left + pickerPosition.width + PREVIEW_GAP;
    if (left + width > window.innerWidth - 8) {
      left = pickerPosition.left - width - PREVIEW_GAP;
    }
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));

    let top = rowRect.top + rowRect.height / 2 - height / 2;
    top = Math.max(8, Math.min(top, window.innerHeight - height - 8));

    setHoveredPickerItem(item);
    setPreviewPosition({ left, top, width });
  }, [pickerPosition, cancelPreviewHide]);

  useEffect(() => {
    if (!activePicker) return;

    updatePickerPosition(activePicker);
    const handlePositionChange = () => updatePickerPosition(activePicker);
    window.addEventListener('resize', handlePositionChange);
    window.addEventListener('scroll', handlePositionChange, true);
    return () => {
      window.removeEventListener('resize', handlePositionChange);
      window.removeEventListener('scroll', handlePositionChange, true);
    };
  }, [activePicker, updatePickerPosition]);

  useEffect(() => {
    if (!activePicker) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target)) return;
      if (pickerRef.current?.contains(target)) return;
      if (previewRef.current?.contains(target)) return;
      closePicker();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePicker();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activePicker, closePicker]);

  useEffect(() => {
    if (!addMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mentionButtonRef.current?.contains(target)) return;
      if (addMenuRef.current?.contains(target)) return;
      setAddMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAddMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [addMenuOpen]);

  useEffect(() => {
    if (!modelMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (modelButtonRef.current?.contains(target)) return;
      if (modelMenuRef.current?.contains(target)) return;
      setModelMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModelMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modelMenuOpen]);

  // Reset dismissal & clear editor when contextTag changes
  useEffect(() => {
    const el = editorRef.current;
    if (el) el.textContent = '';
    setHasText(false);
    setTagDismissed(false);
    setSelectedMentionItems([]);
    setSelectedSkillItem(null);
    closePicker();
  }, [contextTag, closePicker]);

  // Inject text programmatically (e.g. from a clicked Suggested Prompt)
  useEffect(() => {
    if (!injectText) return;
    const el = editorRef.current;
    if (!el) return;
    el.textContent = injectText.text;
    setHasText(injectText.text.trim().length > 0);
    onInputChange?.(injectText.text);
    el.focus();
    requestAnimationFrame(() => placeCursorAtEnd());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [injectText?.seq]);

  const handleFocus = useCallback(() => {
    requestAnimationFrame(() => placeCursorAtEnd());
  }, [placeCursorAtEnd]);

  const isStreamingOutput = !!streamingState?.isStreaming;
  const sendButtonActive = hasText || isStreamingOutput;

  const handleSendClick = useCallback(() => {
    if (isStreamingOutput) {
      stopStreaming();
      return;
    }

    const text = getTextContent();
    if (text && onSend) {
      onSend(text);
      const el = editorRef.current;
      if (el) el.textContent = '';
      setHasText(false);
      setSelectedMentionItems([]);
      setSelectedSkillItem(null);
      onInputChange?.('');
    }
  }, [getTextContent, isStreamingOutput, onSend, onInputChange, stopStreaming]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  }, [handleSendClick]);

  const visibleElementQuotes = allowReferences ? elementQuotes : [];
  const showContextTag = allowReferences && !!contextTag && !tagDismissed;
  const showPlaceholder = !hasText;
  const pickerItems = activePicker === 'mention' ? MENTION_PICKER_ITEMS : activePicker === 'skill' ? SKILL_PICKER_ITEMS : [];
  const selectedQuoteItems = selectedSkillItem ? [...selectedMentionItems, selectedSkillItem] : selectedMentionItems;

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative w-full shrink-0 flex flex-col gap-[12px] p-[16px] chat-input-wrapper"
        style={{ background: 'var(--b0-container, #fff)', border: `0.5px solid ${subtleBorder ? 'var(--line-l2, rgba(0,0,0,0.2))' : 'rgba(0,0,0,0.7)'}`, borderRadius: 8, boxShadow: shadow ? 'var(--shadow-s)' : undefined }}
      >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => { event.currentTarget.value = ''; }}
      />
      {/* ── Annotation hover popover ── */}
      {quoteHover && visibleElementQuotes.length > 0 && (
        <div
          className="absolute z-[100]"
          style={{
            bottom: popoverBottom || '100%',
            left: 0,
            right: 0,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--b0-container, #fff)',
            border: '0.5px solid var(--line-l2)',
            borderRadius: 'var(--radius-ct-m)',
            boxShadow: 'var(--shadow-xs)',
          }}
          onMouseEnter={keepHover}
          onMouseLeave={scheduleHide}
        >
          {visibleElementQuotes.map((q, i) => {
            const content = q.originalText || q.selector;
            return (
              <div key={i}>
                {i > 0 && <div style={{ height: 0, borderTop: '0.5px solid var(--line-l07)', margin: '0 16px' }} />}
                <div className="flex items-start gap-[10px] p-[16px]">
                  <span
                    className="flex items-center justify-center shrink-0 rounded-full size-[20px] font-['Delight',sans-serif] text-[11px] font-semibold leading-[20px]"
                    style={{ background: 'var(--main-m1)', border: '0.5px solid var(--line-l2)', color: '#fff' }}
                  >
                    {q.index}
                  </span>
                  <div className="flex flex-col gap-[2px] min-w-0 flex-1">
                    <span
                      className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px]"
                      style={{ color: 'var(--text-n5)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {content}
                    </span>
                    {q.newText && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        {q.originalText ? `${q.originalText} → ${q.newText}` : q.newText}
                      </span>
                    )}
                    {q.instruction && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        {q.instruction}
                      </span>
                    )}
                    {!q.newText && !q.instruction && (
                      <span
                        className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
                        style={{ color: 'var(--text-n9)' }}
                      >
                        Edit element
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove annotation"
                    className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity mt-[2px]"
                    onClick={() => removeElementQuote(q.index)}
                  >
                    <CdnIcon name="delete-l" size={14} color="var(--text-n9)" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Chip row — animates height open/close via grid-template-rows.
          marginBottom -12 collapses the wrapper's gap:12 when the row is
          empty so the editor doesn't get pushed down by a phantom slot. */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: (selectedQuoteItems.length > 0 || showContextTag || visibleElementQuotes.length > 0 || !!bottomChip) ? '1fr' : '0fr',
          marginBottom: (selectedQuoteItems.length > 0 || showContextTag || visibleElementQuotes.length > 0 || !!bottomChip) ? 0 : -12,
          transition: 'grid-template-rows 240ms cubic-bezier(0.4, 0, 0.2, 1), margin-bottom 240ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div className="flex flex-wrap gap-[8px] items-start w-full">
          {bottomChip && (
            <div
              className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
              style={{ border: '0.5px solid var(--line-l2)' }}
              onMouseEnter={(e) => bottomChip.onHover?.(e.currentTarget.getBoundingClientRect())}
              onMouseLeave={() => bottomChip.onLeave?.()}
            >
              {bottomChip.avatar ? (
                <Avatar name={bottomChip.avatar} size={20} />
              ) : (
                <span
                  className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                  style={{ background: 'var(--main-m1)' }}
                >
                  <CdnIcon name={bottomChip.icon || 'sidebar-discover-normal'} size={16} color="#fff" />
                </span>
              )}
              <span
                className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
                style={{ color: 'var(--text-n9)', maxWidth: 240 }}
              >
                {bottomChip.creator ? `${bottomChip.creator}/${bottomChip.label}` : bottomChip.label}
              </span>
              <button
                type="button"
                aria-label="Remove chip"
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); bottomChip.onRemove?.(); }}
              >
                <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
              </button>
            </div>
          )}
          {showContextTag && (
            <div
              className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
              style={{ border: '0.5px solid var(--line-l2)' }}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                style={{ background: 'var(--main-m1)' }}
              >
                <CdnIcon name={contextTag!.icon || 'sidebar-discover-normal'} size={16} color="#fff" />
              </span>
              <span
                className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
                style={{ color: 'var(--text-n9)', maxWidth: 184 }}
              >
                {contextTag!.label}
              </span>
              <button
                type="button"
                aria-label="Remove context tag"
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); setTagDismissed(true); }}
              >
                <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
              </button>
            </div>
          )}
          {visibleElementQuotes.length > 0 && (
            <div
              ref={chipRef}
              className="inline-flex items-center gap-[6px] p-[6px] rounded-[4px] shrink-0 cursor-pointer"
              style={{
                border: '0.5px solid var(--line-l2)',
                transition: 'box-shadow 0.3s, transform 0.3s',
                ...(chipPulse ? { boxShadow: '0 0 0 3px rgba(73,163,166,0.25)', transform: 'scale(1.04)' } : {}),
              }}
              onMouseEnter={handleChipEnter}
              onMouseLeave={scheduleHide}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                style={{ background: 'var(--main-m1)' }}
              >
                <CdnIcon name="pointer-l" size={16} color="#fff" />
              </span>
              <span
                className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px]"
                style={{ color: 'var(--text-n9)' }}
              >
                {visibleElementQuotes.length} annotation
              </span>
              <button
                type="button"
                aria-label="Remove annotations"
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={(e) => { e.stopPropagation(); clearElementQuotes(); }}
              >
                <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
              </button>
            </div>
          )}
          {selectedMentionItems.map((item, index) => {
            const rowMeta = getPickerRowMeta(item);
            return (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex max-w-full items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
                style={{ border: '0.5px solid var(--line-l2)' }}
              >
                <span
                  className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                  style={{ background: 'var(--main-m1)' }}
                >
                  <CdnIcon
                    name={item.icon || 'sidebar-thread-normal'}
                    size={16}
                    color="#fff"
                  />
                </span>
                <span className="flex min-w-0 items-center gap-[4px]">
                  <span
                    className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
                    style={{ color: 'var(--text-n9)', maxWidth: 280 }}
                  >
                    {rowMeta.title}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label="Remove selected mention"
                  className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMentionItems((items) => items.filter((_, itemIndex) => itemIndex !== index));
                  }}
                >
                  <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
                </button>
              </div>
            );
          })}
          {selectedSkillItem && (
              <div
                className="inline-flex max-w-full items-center gap-[6px] p-[6px] rounded-[4px] shrink-0"
                style={{ border: '0.5px solid var(--line-l2)' }}
              >
                {selectedSkillItem.avatar ? (
                  <Avatar name={selectedSkillItem.avatar} size={20} />
                ) : (
                  <span
                    className="flex items-center justify-center shrink-0 rounded-[2px] size-[20px]"
                    style={{ background: 'var(--main-m1)' }}
                  >
                    <CdnIcon name={selectedSkillItem.icon || 'skill-l'} size={16} color="#fff" />
                  </span>
                )}
                <span className="flex min-w-0 items-center gap-[4px]">
                  <span
                    className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] truncate"
                    style={{ color: 'var(--text-n9)', maxWidth: 280 }}
                  >
                    {selectedSkillItem.label}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label="Remove selected skill"
                  className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); setSelectedSkillItem(null); }}
                >
                  <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
                </button>
              </div>
          )}
          </div>
        </div>
      </div>
      <div className="relative min-h-[44px] chat-input-editor-shell" style={{ maxHeight: 240, overflowY: 'auto' }}>
        {showPlaceholder && (
          <div className="absolute inset-0 pointer-events-none font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n3)]">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[var(--text-n9)] outline-none min-h-[22px] w-full"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex items-center gap-[12px] h-[28px] relative">
        {addMenuOpen && (
          <div
            ref={addMenuRef}
            className="absolute left-[-16px] bottom-[30px] z-[120] flex w-[320px] flex-col overflow-hidden rounded-[8px] p-[4px]"
            style={{
              background: 'var(--b0-container, #fff)',
              border: '0.5px solid var(--line-l2)',
              boxShadow: 'var(--shadow-s)',
            }}
          >
            <button
              type="button"
              className="flex h-[38px] w-full items-center gap-[8px] rounded-[4px] px-[12px] py-[8px] text-left transition-colors hover:bg-[var(--b-r03)]"
              onClick={openFileDialog}
            >
              <CdnIcon name="clip-l" size={20} color="var(--text-n9)" />
              <span className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]">
                Add files or photos
              </span>
            </button>
            <button
              type="button"
              className="flex h-[38px] w-full items-center gap-[8px] rounded-[4px] px-[12px] py-[8px] text-left transition-colors hover:bg-[var(--b-r03)]"
              onClick={openMentionFromAddMenu}
            >
              <CdnIcon name="at-l" size={20} color="var(--text-n9)" />
              <span className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[var(--text-n9)]">
                Mentioned playbooks/portfolio/threads
              </span>
            </button>
          </div>
        )}
        <button
          ref={mentionButtonRef}
          type="button"
          aria-label="Add files or context"
          aria-pressed={addMenuOpen}
          className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={toggleAddMenu}
        >
          <CdnIcon name="add-l2" size={16} color={addMenuOpen ? 'var(--main-m1)' : 'var(--text-n9)'} />
        </button>
        {!hideSkill && (
          <button
            ref={skillButtonRef}
            type="button"
            aria-label="Add skill"
            aria-pressed={activePicker === 'skill'}
            className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => togglePicker('skill')}
          >
            <CdnIcon name="skill-l" size={16} color={activePicker === 'skill' ? 'var(--main-m1)' : 'var(--text-n9)'} />
          </button>
        )}
        {!hideInspector && (
          <Tooltip text="Click elements on the left to annotate changes" placement="top">
            <button
              type="button"
              className="shrink-0 cursor-pointer transition-opacity"
              style={{ opacity: inspectorActive ? 1 : undefined }}
              onClick={toggleInspector}
            >
              <CdnIcon
                name={inspectorActive ? 'pointer-f' : 'pointer-l'}
                size={16}
                color={inspectorActive ? 'var(--main-m1)' : 'var(--text-n9)'}
              />
            </button>
          </Tooltip>
        )}
        <div className="relative ml-auto flex h-[28px] shrink-0 items-center justify-end">
          {modelMenuOpen && (
            <div
              ref={modelMenuRef}
              className="absolute right-0 bottom-[30px] z-[120] flex w-[144px] flex-col overflow-hidden rounded-[8px] p-[4px]"
              style={{
                background: 'var(--b0-container, #fff)',
                border: '0.5px solid var(--line-l2)',
                boxShadow: 'var(--shadow-s)',
              }}
            >
              {MODEL_OPTIONS.map((model) => {
                const selected = model === selectedModel;
                return (
                  <button
                    key={model}
                    type="button"
                    className="flex h-[38px] w-full items-center rounded-[4px] px-[12px] py-[8px] text-left transition-colors"
                    style={{
                      background: selected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent',
                    }}
                    onMouseEnter={(event) => {
                      if (!selected) event.currentTarget.style.background = DROPDOWN_HOVER_BACKGROUND;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = selected ? DROPDOWN_ACTIVE_BACKGROUND : 'transparent';
                    }}
                    onClick={() => selectModel(model)}
                  >
                    <span
                      className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px]"
                      style={{ color: selected ? 'var(--main-m1)' : 'var(--text-n9)' }}
                    >
                      {model}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          <button
            ref={modelButtonRef}
            type="button"
            aria-label="Select model"
            aria-expanded={modelMenuOpen}
            className="flex shrink-0 items-center justify-end gap-[4px] transition-opacity hover:opacity-70"
            onClick={toggleModelMenu}
          >
            <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] whitespace-nowrap">
              {selectedModel}
            </span>
            <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
          </button>
        </div>
        <button
          type="button"
          aria-label={isStreamingOutput ? 'Stop streaming' : 'Send message'}
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: isStreamingOutput ? 'transparent' : sendButtonActive ? 'var(--main-m1)' : 'var(--b-r05)',
          }}
          onClick={handleSendClick}
        >
          {isStreamingOutput ? (
            <CdnIcon name="stop-f" size={28} />
          ) : (
            <CdnIcon
              name="arrow-up-l1"
              size={14}
              color={sendButtonActive ? '#ffffff' : 'var(--text-n3)'}
            />
          )}
        </button>
      </div>
      </div>
      {activePicker && pickerPosition && typeof document !== 'undefined' && createPortal(
        <>
          <ChatPickerDropdown
            pickerRef={pickerRef}
            kind={activePicker}
            items={pickerItems}
            position={pickerPosition}
            selectedId={activePicker === 'skill' ? selectedSkillItem?.id ?? null : null}
            onSelect={selectPickerItem}
            onItemHover={handlePickerItemHover}
            onLeave={schedulePreviewHide}
          />
          {hoveredPickerItem && previewPosition && (
            <ChatPickerPreview
              item={hoveredPickerItem}
              position={previewPosition}
              previewRef={previewRef}
              onMouseEnter={cancelPreviewHide}
              onMouseLeave={schedulePreviewHide}
              onClick={() => navigateToTarget(hoveredPickerItem)}
            />
          )}
        </>,
        document.body,
      )}
    </>
  );
}
