import { useEffect, useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { PlaybookCard, type ExplorePlaybook } from '@/app/components/shared/PlaybookCard';
import { POPULAR_RECENT_SORT_OPTIONS, TRENDING_FILTER_CHIPS, TrendingFilterBar, type PopularRecentSort, type TrendingFilterChip } from '@/app/components/shared/TrendingFilterBar';
import { PlaybookTags, buildTags } from '@/lib/playbook-cover/PlaybookTags';

const asset = (name: string) => `${import.meta.env.BASE_URL}figma/explore/${name}`;

type CategoryChip = TrendingFilterChip;
type SortOption = PopularRecentSort;

const FIGMA_ACTIVE_CHIPS = new Set<CategoryChip>(['Smart Screener', 'Theme Tracker', 'AI Digest']);
const HOME_PLAYBOOK_LIMIT = 9;

const FEATURED = {
  creator: 'Macro Scope X',
  title: 'Inflection Point Screener',
  description: 'Screens 948 mid-caps daily for margin acceleration, revenue inflection, and profitability crossover. Top decile with 90-day holding period',
  tickers: ['BTC', 'ETH'],
  stars: '12.8K',
  remixes: 3,
};

const PLAYBOOKS: ExplorePlaybook[] = [
  {
    id: 'btc-ultimate-ai-trader',
    creator: 'Alva Intern',
    title: 'BTC Ultimate AI Trader',
    description: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.",
    tickers: ['BTC'],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'screener',
      title: 'BTC Ultimate AI Trader',
      author: 'Alva Intern',
      tickers: ['BTC'],
      coverImageUrl: asset('card-btc-ultimate.png'),
    },
  },
  {
    id: 'mag7-equal-weight-monthly-rebalance',
    creator: 'Alva Intern',
    title: 'MAG7 Equal-Weight Monthly Rebalance',
    description: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly',
    tickers: [],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    price: '$50',
    cover: {
      template: 'what-if',
      title: 'MAG7 Equal-Weight Monthly Rebalance',
      author: 'Alva Intern',
      tickers: [],
      coverImageUrl: asset('card-mag7-rebalance.png'),
    },
  },
  {
    id: 'pepe-long-vs-btc-short',
    creator: 'Alva Intern',
    title: 'PEPE Long vs BTC Short Monthly Rebalance',
    description: 'The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.',
    tickers: ['PEPE', 'BTC'],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'what-if',
      title: 'PEPE Long vs BTC Short Monthly Rebalance',
      author: 'Alva Intern',
      tickers: ['PEPE', 'BTC'],
      coverImageUrl: asset('card-pepe-btc.png'),
    },
  },
  {
    id: 'attribution-analysis-price-trends',
    creator: 'Alva Intern',
    title: 'Attribution Analysis Strategy for Price Trends',
    description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
    tickers: ['BTC', 'ETH'],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'thesis',
      title: 'Attribution Analysis Strategy for Price Trends',
      author: 'Alva Intern',
      tickers: ['BTC', 'ETH'],
      coverImageUrl: asset('card-attribution.png'),
    },
  },
  {
    id: 'btc-macd-1h-simple-crossover',
    creator: 'Alva Intern',
    title: 'BTC MACD 1h Simple Crossover',
    description: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'screener',
      title: 'BTC MACD 1h Simple Crossover',
      author: 'Alva Intern',
      tickers: ['BTC'],
      coverImageUrl: asset('card-btc-macd.png'),
    },
  },
  {
    id: 'nvda-triggered-tsm',
    creator: 'Alva Intern',
    title: 'NVDA +3% Triggered TSM TP/SL',
    description: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    tickers: ['NVDA', 'TSM'],
    pulse: 'active',
    stars: 12800,
    remixes: 3,
    price: '$50',
    cover: {
      template: 'what-if',
      title: 'NVDA +3% Triggered TSM TP/SL',
      author: 'Alva Intern',
      tickers: ['NVDA', 'TSM'],
      coverImageUrl: asset('card-nvda-tsm.png'),
    },
  },
  {
    id: 'eth-daily-price-change',
    creator: 'Alva Intern',
    title: 'ETH Daily Price & Change Tracker',
    description: 'Tracks daily prices and daily percentage changes for ETH in a single table for quick monitoring.',
    tickers: ['ETH'],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    price: '$50',
    cover: {
      template: 'screener',
      title: 'ETH Daily Price & Change Tracker',
      author: 'Alva Intern',
      tickers: ['ETH'],
      coverImageUrl: asset('card-eth-daily.png'),
    },
  },
  {
    id: 'short-squeeze-risk-map',
    creator: 'Alva Intern',
    title: 'Short-Squeeze Risk Map',
    description: "This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts.",
    tickers: [],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'thesis',
      title: 'Short-Squeeze Risk Map',
      author: 'Alva Intern',
      tickers: [],
      coverImageUrl: asset('card-short-squeeze.png'),
    },
  },
  {
    id: 'nvda-trading-research-dashboard',
    creator: 'Alva Intern',
    title: 'NVDA Trading Strategy Research Dashboard',
    description: 'Multi-timeframe NVDA price/volume context, trend & momentum, relative strength vs market/sector, flow/derivatives proxies, earnings/event stats.',
    tickers: ['NVDA'],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'thesis',
      title: 'NVDA Trading Strategy Research Dashboard',
      author: 'Alva Intern',
      tickers: ['NVDA'],
      coverImageUrl: asset('card-nvda-research.png'),
    },
  },
  {
    id: 'us-crypto-dat-monitor',
    creator: 'Alva Intern',
    title: 'US Crypto DAT Companies Monitor',
    description: 'Feed incorporates both real anomaly signals and reference cases for interpretation. Update frequencies adjusted as new PTR, Form 4, and 10b5-1 filings are parsed.',
    tickers: [],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    price: '$50',
    cover: {
      template: 'screener',
      title: 'US Crypto DAT Companies Monitor',
      author: 'Alva Intern',
      tickers: [],
      coverImageUrl: asset('card-crypto-dat.png'),
    },
  },
  {
    id: 'google-x-trends-tracker',
    creator: 'Alva Intern',
    title: 'Google / X Trends Tracker',
    description: 'Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.',
    tickers: ['GOOGL'],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    cover: {
      template: 'screener',
      title: 'Google / X Trends Tracker',
      author: 'Alva Intern',
      tickers: ['GOOGL'],
      coverImageUrl: asset('card-google-trends.png'),
    },
  },
  {
    id: 'qqq-triggers-nvda-take-profit',
    creator: 'Alva Intern',
    title: 'QQQ +2% Day Triggers NVDA Take-Profit',
    description: 'Aggregates real-time data across multiple DEX platforms to identify high-potential Golden Dog meme tokens. Alerts are triggered on sudden volume spikes, KOL mentions, or on-chain activity.',
    tickers: ['QQQ', 'SOL'],
    pulse: 'idle',
    stars: 12800,
    remixes: 3,
    price: '$50',
    cover: {
      template: 'what-if',
      title: 'QQQ +2% Day Triggers NVDA Take-Profit',
      author: 'Alva Intern',
      tickers: ['QQQ', 'SOL'],
      coverImageUrl: asset('card-qqq-nvda.png'),
    },
  },
];

function chipMatchesPlaybook(chip: CategoryChip, p: ExplorePlaybook): boolean {
  const haystack = `${p.title} ${p.description} ${p.tickers.join(' ')} ${p.cover.template}`.toLowerCase();
  const term = chip.toLowerCase();
  if (chip === 'Smart Screener' && p.cover.template === 'screener') return true;
  if (chip === 'Theme Tracker' && p.cover.template === 'thesis') return true;
  if (chip === 'What-if' && p.cover.template === 'what-if') return true;
  if (chip === 'Thesis' && p.cover.template === 'thesis') return true;
  if (p.tickers.some((ticker) => ticker.toLowerCase() === term)) return true;
  return haystack.includes(term);
}

function FeaturedCard() {
  const tags = buildTags({ template: 'screener', tickers: FEATURED.tickers });

  return (
    <section className="explore-featured" aria-label={FEATURED.title}>
      <div className="explore-featured-copy">
        <div className="explore-featured-creator">
          <Avatar name={FEATURED.creator} size={24} />
          <span>{FEATURED.creator}</span>
        </div>
        <div className="explore-featured-text">
          <h2>{FEATURED.title}</h2>
          <p>{FEATURED.description}</p>
        </div>
        <div className="explore-featured-tags">
          <PlaybookTags tags={tags} />
        </div>
        <div className="explore-featured-meta">
          <span>
            <CdnIcon name="show-l" size={16} />
            {FEATURED.stars}
          </span>
          <span>
            <CdnIcon name="remix-l" size={16} />
            {FEATURED.remixes}
          </span>
        </div>
      </div>
      <div className="explore-featured-preview">
        <img src={asset('featured-preview.png')} alt="" />
      </div>
    </section>
  );
}

function ExploreFilters({
  sort,
  onSortChange,
  selectedChips,
  onChipToggle,
  searchQuery,
  onSearchChange,
}: {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedChips: Set<CategoryChip>;
  onChipToggle: (chip: CategoryChip) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchActive) return;
    const frame = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [searchActive]);

  return (
    <div className="explore-filters">
      <TrendingFilterBar
        sort={sort}
        sortOptions={POPULAR_RECENT_SORT_OPTIONS}
        chips={TRENDING_FILTER_CHIPS}
        selectedChips={selectedChips}
        onSortChange={onSortChange}
        onChipToggle={onChipToggle}
        trailing={
          searchActive ? (
            <div className="input input-sm explore-search-input">
              <div className="input-border" />
              <CdnIcon name="search-l" size={14} color="var(--text-n3, rgba(0,0,0,0.3))" />
              <input
                ref={searchInputRef}
                type="text"
                className="input-field"
                placeholder="Search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onBlur={() => {
                  if (!searchQuery.trim()) setSearchActive(false);
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'Escape') return;
                  onSearchChange('');
                  setSearchActive(false);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              className="input input-sm explore-search-trigger"
              onClick={() => setSearchActive(true)}
              aria-label="Search"
            >
              <div className="input-border" />
              <CdnIcon name="search-l" size={14} color="var(--text-n3, rgba(0,0,0,0.3))" />
              <span className="input-field explore-search-placeholder">Search</span>
            </button>
          )
        }
      />
    </div>
  );
}

export default function Explore({
  onNavigate,
}: {
  onNavigate: (page: Page) => void;
}) {
  const [sort, setSort] = useState<SortOption>('Popular');
  const [selectedChips, setSelectedChips] = useState<Set<CategoryChip>>(() => new Set(FIGMA_ACTIVE_CHIPS));
  const [filterTouched, setFilterTouched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaybooks = useMemo(() => {
    const sorted = sort === 'Recent' ? [...PLAYBOOKS].reverse() : PLAYBOOKS;
    let next = sorted;

    if (filterTouched && selectedChips.size > 0) {
      next = next.filter((playbook) => {
        for (const chip of selectedChips) {
          if (chipMatchesPlaybook(chip, playbook)) return true;
        }
        return false;
      });
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      next = next.filter((playbook) => {
        const haystack = `${playbook.title} ${playbook.description} ${playbook.creator} ${playbook.tickers.join(' ')} ${playbook.cover.template}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    return next;
  }, [filterTouched, searchQuery, selectedChips, sort]);
  const displayedPlaybooks = useMemo(() => {
    return filterTouched || searchQuery.trim() ? filteredPlaybooks : filteredPlaybooks.slice(0, HOME_PLAYBOOK_LIMIT);
  }, [filterTouched, filteredPlaybooks, searchQuery]);

  const toggleChip = (chip: CategoryChip) => {
    setFilterTouched(true);
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  return (
    <AppShell activePage="explore" onNavigate={onNavigate}>
      <style>{`
        .explore-page {
          min-height: 100%;
          background: #fff;
          padding: 56px 28px 48px;
          font-family: 'Delight', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .explore-inner {
          width: 100%;
          max-width: 2048px;
          margin: 0 auto;
          container: explore-content / inline-size;
        }
        .explore-title {
          margin: 0;
          font-size: 28px;
          line-height: 38px;
          font-weight: 400;
          letter-spacing: 0.28px;
          color: var(--text-n9, rgba(0,0,0,0.9));
        }
        .explore-featured {
          margin-top: 24px;
          height: 204px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 368px;
          border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
          border-radius: var(--radius-ct-l, 8px);
          overflow: hidden;
          background: #fff2e1;
        }
        .explore-featured-copy {
          min-width: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          overflow: hidden;
        }
        .explore-featured-creator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-n7, rgba(0,0,0,0.7));
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
          white-space: nowrap;
        }
        .explore-featured-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          min-width: 0;
          margin-top: 12px;
        }
        .explore-featured-text h2 {
          margin: 0;
          color: var(--text-n9, rgba(0,0,0,0.9));
          font-size: 20px;
          line-height: 30px;
          font-weight: 400;
          letter-spacing: 0.2px;
        }
        .explore-featured-text p {
          margin: 0;
          color: var(--text-n5, rgba(0,0,0,0.5));
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .explore-featured-tags {
          width: 100%;
          padding-top: 12px;
        }
        .explore-featured-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
        }
        .explore-featured-meta span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-n9, rgba(0,0,0,0.9));
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.14px;
        }
        .explore-featured-preview {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 24px 24px 0;
          overflow: hidden;
        }
        .explore-featured-preview img {
          width: 320px;
          height: 180px;
          display: block;
          object-fit: cover;
          object-position: center top;
          border: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
          border-bottom: 0;
          border-radius: 8px 8px 0 0;
          box-shadow: var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05));
        }
        .explore-filters {
          margin-top: 48px;
          width: 100%;
          height: 28px;
          display: flex;
          align-items: center;
        }
        .explore-search-trigger,
        .explore-search-input {
          flex: 0 0 160px;
          width: 160px;
          gap: 4px;
        }
        .explore-search-trigger {
          appearance: none;
          margin: 0;
          border: 0;
          justify-content: flex-start;
          font-family: inherit;
          color: var(--text-n3, rgba(0,0,0,0.3));
          text-align: left;
          cursor: pointer;
        }
        .explore-search-input {
          z-index: 1;
        }
        .explore-search-input .input-border {
          border: 1px solid var(--line-l9, rgba(0,0,0,0.9));
        }
        .explore-search-trigger .input-border {
          border: 0.5px solid var(--line-l3, rgba(0,0,0,0.3));
        }
        .explore-search-input .input-field {
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.12px;
        }
        .explore-search-placeholder {
          color: var(--text-n3, rgba(0,0,0,0.3));
          text-align: left;
          pointer-events: none;
        }
        .explore-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 324px), 1fr));
          gap: 16px;
        }
        @media (max-width: 960px) {
          .explore-page {
            padding: 32px 16px 40px;
          }
          .explore-featured {
            height: auto;
            grid-template-columns: 1fr;
          }
          .explore-featured-preview {
            padding: 0 20px 0;
            justify-content: flex-start;
          }
          .explore-featured-preview img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            border-bottom: 0.5px solid var(--line-l2, rgba(0,0,0,0.2));
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .explore-featured-text p {
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        @media (max-width: 720px) {
          .explore-filters {
            height: auto;
            margin-top: 28px;
          }
          .explore-search-trigger,
          .explore-search-input {
            flex: 1 1 160px;
            width: auto;
          }
        }
      `}</style>
      <main className="explore-page">
        <div className="explore-inner">
          <h1 className="explore-title">Explore</h1>
          <FeaturedCard />
          <ExploreFilters
            sort={sort}
            onSortChange={setSort}
            selectedChips={selectedChips}
            onChipToggle={toggleChip}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <section className="explore-grid">
            {displayedPlaybooks.map((playbook) => (
              <PlaybookCard key={playbook.id} p={playbook} />
            ))}
          </section>
        </div>
      </main>
    </AppShell>
  );
}
