import type { ReactNode } from 'react';
import { CdnIcon } from './CdnIcon';
import { Dropdown } from './Dropdown';

export interface TrendingSortOption<TSort extends string = string> {
  id: TSort;
  label: string;
}

export const POPULAR_RECENT_SORT_OPTIONS = [
  { id: 'Popular', label: 'Popular' },
  { id: 'Recent', label: 'Recent' },
] as const;

export type PopularRecentSort = typeof POPULAR_RECENT_SORT_OPTIONS[number]['id'];

export const TRENDING_FILTER_CHIPS = [
  'Smart Screener', 'Theme Tracker', 'Backtest', 'AI Digest', 'Asset Deepdive',
  'Crypto', 'BTC', 'Thesis', 'Tech', 'Equity', 'What-if', 'NVDA', 'Macro',
  'Healthcare', 'ETH', 'Energy', 'FX', 'MAG7', 'Financials', 'Commodities',
] as const;

export type TrendingFilterChip = typeof TRENDING_FILTER_CHIPS[number];

interface TrendingFilterBarProps<TChip extends string, TSort extends string = string> {
  sort: TSort;
  sortOptions: readonly TrendingSortOption<TSort>[];
  chips: readonly TChip[];
  selectedChips: Set<TChip>;
  onSortChange: (value: TSort) => void;
  onChipToggle: (chip: TChip) => void;
  trailing?: ReactNode;
}

const FONT = "'Delight', sans-serif";

export function TrendingFilterBar<TChip extends string, TSort extends string = string>({
  sort,
  sortOptions,
  chips,
  selectedChips,
  onSortChange,
  onChipToggle,
  trailing,
}: TrendingFilterBarProps<TChip, TSort>) {
  const sortLabel = sortOptions.find((option) => option.id === sort)?.label ?? sort;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        overflow: 'visible',
      }}
    >
      <Dropdown
        items={sortOptions.map((option) => ({ id: option.id, label: option.label }))}
        activeId={sort}
        onSelect={(id) => onSortChange(id as TSort)}
        width={160}
        trigger={
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              width: 100,
              height: 28,
              padding: '4px 8px',
              borderRadius: 4,
              border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
              background: '#fff',
              cursor: 'pointer',
              fontFamily: FONT,
              fontSize: 12,
              lineHeight: '20px',
              letterSpacing: 0.12,
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
            }}
          >
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textAlign: 'left', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sortLabel}
            </span>
            <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n3)" />
          </button>
        }
      />
      <span
        aria-hidden
        style={{
          width: 1,
          height: 16,
          flexShrink: 0,
          background: 'var(--line-l07, rgba(0,0,0,0.07))',
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minWidth: 0,
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {chips.map((chip) => {
          const isActive = selectedChips.has(chip);
          return (
            <button
              key={chip}
              type="button"
              onClick={() => onChipToggle(chip)}
              style={{
                flexShrink: 0,
                height: 28,
                padding: '4px 10px',
                borderRadius: 16,
                border: 'none',
                background: isActive ? 'rgba(0,0,0,0.7)' : 'var(--content-br03, rgba(0,0,0,0.03))',
                color: isActive ? 'rgba(255,255,255,0.9)' : 'var(--text-n7, rgba(0,0,0,0.7))',
                cursor: 'pointer',
                fontFamily: FONT,
                fontSize: 12,
                lineHeight: '20px',
                letterSpacing: 0.12,
                whiteSpace: 'nowrap',
                transition: 'background-color 160ms ease, color 160ms ease',
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>
      {trailing && (
        <>
          <span
            aria-hidden
            style={{
              width: 1,
              height: 16,
              flexShrink: 0,
              background: 'var(--line-l07, rgba(0,0,0,0.07))',
            }}
          />
          {trailing}
        </>
      )}
    </div>
  );
}
