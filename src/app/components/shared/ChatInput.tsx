import { useRef, useState, useCallback, useEffect } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from './CdnIcon';
import { Avatar } from './Avatar';
import { Tooltip } from './Tooltip';
import type { ContextTagData } from '@/lib/chat-config';
import { useChatContext } from '../chat/ChatContext';

export interface BottomChipData {
  label: string;
  icon?: string;
  /** Creator name — when set, render an Avatar instead of CdnIcon */
  avatar?: string;
  onRemove?: () => void;
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
}

type PickerKind = 'mention' | 'skill';
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

type PickerPreviewData =
  | {
      kind: 'portfolio';
      value: string;
      gain: string;
      percent: string;
      range: string;
      account: string;
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
}

const PREVIEW_WIDTH = 480;
const PICKER_GAP = 8;
const PREVIEW_GAP = 8;

const MENTION_PICKER_ITEMS: ChatPickerItem[] = [
  {
    id: 'ibkr-live',
    type: 'portfolio',
    icon: 'wallet-l',
    label: 'IBKR · U***6789 · Live',
    insertText: 'IBKR · U***6789 · Live',
    preview: {
      kind: 'portfolio',
      value: '$8,223.06',
      gain: '+$1,234',
      percent: '+1.25%',
      range: '1D',
      account: 'U***6789 · Live',
    },
  },
  {
    id: 'attribution-analysis',
    type: 'playbook',
    icon: 'sidebar-dashboard-normal',
    label: '@Sheer-X/Attribution Analysis Strategy for Price Trends',
    insertText: '@Sheer-X/Attribution Analysis Strategy for Price Trends',
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
    preview: {
      kind: 'portfolio',
      value: '$12,048.90',
      gain: '+$420',
      percent: '+0.72%',
      range: '1D',
      account: 'U***6789 · Spot',
    },
  },
  {
    id: 'tsla-financial',
    type: 'session',
    icon: 'sidebar-thread-normal',
    label: 'TSLA Financial Trends and Charts Analysis',
    insertText: 'TSLA Financial Trends and Charts Analysis',
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
  if (item.preview.kind === 'portfolio') return 116;
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

function ChatPickerDropdown({
  pickerRef,
  kind,
  items,
  position,
  onSelect,
  onItemHover,
  onLeave,
}: {
  pickerRef: RefObject<HTMLDivElement>;
  kind: PickerKind;
  items: ChatPickerItem[];
  position: PickerPosition;
  onSelect: (item: ChatPickerItem) => void;
  onItemHover: (item: ChatPickerItem, rowRect: DOMRect) => void;
  onLeave: () => void;
}) {
  return (
    <div
      ref={pickerRef}
      className="fixed z-[5000] overflow-visible rounded-[8px]"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        height: kind === 'mention' ? 340 : 232,
        padding: '8px 0',
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        boxShadow: 'var(--shadow-s)',
      }}
      onMouseLeave={onLeave}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="group flex w-full cursor-pointer items-center gap-[8px] overflow-hidden bg-transparent px-[16px] py-[7px] text-left transition-colors hover:bg-[var(--b-r05)]"
          style={{ height: 36, border: 'none', cursor: 'pointer' }}
          onMouseEnter={(event) => onItemHover(item, event.currentTarget.getBoundingClientRect())}
          onFocus={(event) => onItemHover(item, event.currentTarget.getBoundingClientRect())}
          onClick={() => onSelect(item)}
        >
          <PickerRowIcon item={item} />
          <span
            className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px]"
            style={{ color: 'var(--text-n9)' }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function ChatPickerPreview({ item, position, previewRef }: { item: ChatPickerItem; position: PreviewPosition; previewRef: RefObject<HTMLDivElement> }) {
  const preview = item.preview;

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
        cursor: 'pointer',
      }}
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

export function ChatInput({ placeholder = 'Build an investing playbook from your ideas', contextTag, shadow, onSend, bottomChip, injectText, onInputChange }: ChatInputProps) {
  const { inspectorActive, toggleInspector, elementQuotes, removeElementQuote, clearElementQuotes } = useChatContext();
  const [hasText, setHasText] = useState(false);
  const [quoteHover, setQuoteHover] = useState(false);
  const [popoverBottom, setPopoverBottom] = useState(0);
  const [chipPulse, setChipPulse] = useState(false);
  const [tagDismissed, setTagDismissed] = useState(false);
  const [activePicker, setActivePicker] = useState<PickerKind | null>(null);
  const [pickerPosition, setPickerPosition] = useState<PickerPosition | null>(null);
  const [hoveredPickerItem, setHoveredPickerItem] = useState<ChatPickerItem | null>(null);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition | null>(null);
  const [selectedMentionItems, setSelectedMentionItems] = useState<ChatPickerItem[]>([]);
  const [selectedSkillItem, setSelectedSkillItem] = useState<ChatPickerItem | null>(null);
  const prevQuoteCount = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mentionButtonRef = useRef<HTMLButtonElement>(null);
  const skillButtonRef = useRef<HTMLButtonElement>(null);
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

  const handleInput = useCallback(() => {
    const text = getTextContent();
    setHasText(!!text);
    onInputChange?.(text);
  }, [getTextContent, onInputChange]);

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

  const updatePickerPosition = useCallback((kind: PickerKind = activePicker || 'mention') => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const triggerRect = (kind === 'mention' ? mentionButtonRef.current : skillButtonRef.current)?.getBoundingClientRect();
    const width = Math.min(wrapperRect.width, window.innerWidth - 16);
    let left = wrapperRect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));

    const height = kind === 'mention' ? 340 : 232;
    let top = (triggerRect?.top ?? wrapperRect.top) - height - PICKER_GAP;
    if (top < 8) top = Math.min((triggerRect?.bottom ?? wrapperRect.bottom) + PICKER_GAP, window.innerHeight - height - 8);
    top = Math.max(8, Math.min(top, window.innerHeight - height - 8));

    setPickerPosition({ left, top, width });
  }, [activePicker]);

  const closePicker = useCallback(() => {
    setActivePicker(null);
    setHoveredPickerItem(null);
    setPreviewPosition(null);
  }, []);

  const togglePicker = useCallback((kind: PickerKind) => {
    setActivePicker((current) => {
      const next = current === kind ? null : kind;
      if (next) requestAnimationFrame(() => updatePickerPosition(next));
      return next;
    });
    setHoveredPickerItem(null);
    setPreviewPosition(null);
  }, [updatePickerPosition]);

  const selectPickerItem = useCallback((item: ChatPickerItem) => {
    if (activePicker === 'mention') {
      setSelectedMentionItems((items) => [...items, item]);
      closePicker();
      editorRef.current?.focus();
      requestAnimationFrame(() => placeCursorAtEnd());
      return;
    }

    setSelectedSkillItem(item);
    closePicker();
    editorRef.current?.focus();
    requestAnimationFrame(() => placeCursorAtEnd());
  }, [activePicker, closePicker, placeCursorAtEnd]);

  const handlePickerItemHover = useCallback((item: ChatPickerItem, rowRect: DOMRect) => {
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
  }, [pickerPosition]);

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

  const handleSendClick = useCallback(() => {
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
  }, [getTextContent, onSend, onInputChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  }, [handleSendClick]);

  const showContextTag = !!contextTag && !tagDismissed;
  const showPlaceholder = !hasText;
  const pickerItems = activePicker === 'mention' ? MENTION_PICKER_ITEMS : activePicker === 'skill' ? SKILL_PICKER_ITEMS : [];
  const selectedQuoteItems = selectedSkillItem ? [...selectedMentionItems, selectedSkillItem] : selectedMentionItems;

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative w-full shrink-0 flex flex-col gap-[12px] p-[16px] chat-input-wrapper"
        style={{ background: 'var(--b0-container, #fff)', border: '0.5px solid var(--line-l2)', borderRadius: 12, boxShadow: shadow ? 'var(--shadow-s)' : undefined }}
      >
      {/* ── Annotation hover popover ── */}
      {quoteHover && elementQuotes.length > 0 && (
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
          {elementQuotes.map((q, i) => {
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
      {(selectedQuoteItems.length > 0 || showContextTag || elementQuotes.length > 0) && (
        <div className="flex flex-wrap gap-[8px] items-start w-full">
          {selectedMentionItems.map((item, index) => (
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
                    {item.label}
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
          ))}
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
          {elementQuotes.length > 0 && (
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
                {elementQuotes.length} annotation
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
        </div>
      )}
      <div className="relative min-h-[44px]" style={{ maxHeight: 240, overflowY: 'auto' }}>
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
      <div className="flex items-center gap-[12px] h-[28px]">
        <button
          ref={mentionButtonRef}
          type="button"
          aria-label="Mention context"
          aria-pressed={activePicker === 'mention'}
          className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={() => togglePicker('mention')}
        >
          <CdnIcon name="at-l" size={16} color={activePicker === 'mention' ? 'var(--main-m1)' : 'var(--text-n9)'} />
        </button>
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
        <button type="button" className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
          <CdnIcon name="photo-l" size={16} color="var(--text-n9)" />
        </button>
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
        {bottomChip && (
          <div
            className="flex min-w-0 flex-1 items-center gap-[6px] h-[24px] pl-[8px] pr-[6px] rounded-[999px]"
            style={{ background: 'var(--b-r05)', maxWidth: 'fit-content' }}
          >
            {bottomChip.avatar ? (
              <Avatar name={bottomChip.avatar} size={16} />
            ) : (
              bottomChip.icon && <CdnIcon name={bottomChip.icon} size={14} color="var(--text-n9)" />
            )}
            <span
              className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] truncate"
              style={{ color: 'var(--text-n9)', minWidth: 0 }}
            >
              {bottomChip.label}
            </span>
            <button
              type="button"
              className="shrink-0 flex items-center justify-center size-[16px] rounded-full cursor-pointer hover:bg-black/10 transition-colors"
              onClick={(e) => { e.stopPropagation(); bottomChip.onRemove?.(); }}
              aria-label="Remove chip"
            >
              <CdnIcon name="close-l1" size={12} color="var(--text-n7)" />
            </button>
          </div>
        )}
        <div className="flex shrink-0 items-center justify-end gap-[4px] ml-auto">
          <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[var(--text-n5)] whitespace-nowrap">
            Sonnet 4.6
          </span>
          <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
        </div>
        <button
          type="button"
          className="flex items-center justify-center shrink-0 size-[28px] rounded-[6px] cursor-pointer transition-colors"
          style={{
            background: hasText ? 'var(--main-m1)' : 'var(--b-r05)',
          }}
          onClick={handleSendClick}
        >
          <CdnIcon
            name="arrow-up-l1"
            size={14}
            color={hasText ? '#ffffff' : 'var(--text-n3)'}
          />
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
            onSelect={selectPickerItem}
            onItemHover={handlePickerItemHover}
            onLeave={() => {
              setHoveredPickerItem(null);
              setPreviewPosition(null);
            }}
          />
          {hoveredPickerItem && previewPosition && (
            <ChatPickerPreview item={hoveredPickerItem} position={previewPosition} previewRef={previewRef} />
          )}
        </>,
        document.body,
      )}
    </>
  );
}
