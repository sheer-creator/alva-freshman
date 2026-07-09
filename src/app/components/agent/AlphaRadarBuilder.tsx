import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Dropdown } from '@/app/components/shared/Dropdown';

const FONT = "'Delight', sans-serif";

const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const TEAL = 'var(--main-m1, #49A3A6)';
const TEAL10 = 'var(--main-m1-10, rgba(73,163,166,0.1))';

type AlphaPhase = 'setup' | 'generating' | 'complete';
type DigestLanguage = 'English' | 'Chinese' | 'Japanese';
export type AlphaSourceId = 'fintwit' | 'news' | 'technical';

interface AlphaPreset {
  id: string;
  displayName: string;
  description: string;
  handleCount: number;
  kols: { name: string; avatar: string }[];
}

interface AlphaKol {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  allTimeWinRate: number;
}

interface AlphaSource {
  id: AlphaSourceId;
  emoji: string;
  title: string;
  description: string;
}

export interface AlphaRadarSummary {
  sources: AlphaSourceId[];
  presets: AlphaPreset[];
  kols: AlphaKol[];
  digestTime: string;
  language: DigestLanguage;
}

const SOURCES: AlphaSource[] = [
  {
    id: 'fintwit',
    emoji: '📣',
    title: 'FinTwit',
    description: 'Curated voices from X. Pick specific accounts or start from a preset.',
  },
  {
    id: 'news',
    emoji: '📰',
    title: 'News',
    description: 'Breaking headlines and market-moving stories, mapped to the tickers they move.',
  },
  {
    id: 'technical',
    emoji: '📊',
    title: 'Technical',
    description: 'Backtested breakout, reversal, and momentum signals from a daily market-wide scan.',
  },
];

const PRESETS: AlphaPreset[] = [
  {
    id: 'top50-leaderboard',
    displayName: 'Top50 Leaderboard',
    description: 'Curated top KOLs from the FinTwit Alpha League leaderboard.',
    handleCount: 7,
    kols: [
      { name: 'Andy Constan', avatar: 'AC' },
      { name: 'K A L E O', avatar: 'KA' },
      { name: 'Elliott Chart', avatar: 'EC' },
      { name: 'Puru Saxena', avatar: 'PS' },
    ],
  },
  {
    id: 'top1',
    displayName: 'Top1',
    description: 'Single highest-ranked account for a tight signal stream.',
    handleCount: 1,
    kols: [{ name: 'Ethan Brooks', avatar: 'EB' }],
  },
];

const KOLS: AlphaKol[] = [
  { id: 'dampedspring', name: 'Andy Constan', handle: '@dampedspring', avatar: 'AC', allTimeWinRate: 68.2 },
  { id: 'cryptokaleo', name: 'K A L E O', handle: '@cryptokaleo', avatar: 'KA', allTimeWinRate: 62.5 },
  { id: 'elliottchart', name: 'Elliott Chart', handle: '@elliottchart', avatar: 'EC', allTimeWinRate: 57.9 },
  { id: 'saxena-puru', name: 'Puru Saxena', handle: '@saxena_puru', avatar: 'PS', allTimeWinRate: 57.4 },
  { id: 'mikealfred', name: 'Mike Alfred', handle: '@mikealfred', avatar: 'MA', allTimeWinRate: 33.0 },
  { id: 'davehcontrarian', name: 'Dave H Contrarian', handle: '@davehcontrarian', avatar: 'DH', allTimeWinRate: 52.2 },
  { id: 'gainzy222', name: 'Gainzy', handle: '@gainzy222', avatar: 'GA', allTimeWinRate: 63.0 },
  { id: 'mingchikuo', name: 'Ming-Chi Kuo', handle: '@mingchikuo', avatar: 'MK', allTimeWinRate: 46.0 },
  { id: 'ethanbrooks', name: 'Ethan Brooks', handle: '@ethanbrooks', avatar: 'EB', allTimeWinRate: 58.0 },
  { id: 'mayachen', name: 'Maya Chen', handle: '@mayachen', avatar: 'MC', allTimeWinRate: 54.0 },
];

const ALERT_TIMES = ['8:00 AM ET', '8:30 AM ET', '4:30 PM ET'];
const LANGUAGES: DigestLanguage[] = ['English', 'Chinese', 'Japanese'];

const SAMPLE_DIGEST_EVIDENCE = [
  {
    id: 'news',
    emoji: '📰',
    source: 'News',
    stance: 'Support',
    text: 'Bloomberg: Micron breaks ground on a $9B Japan fab expansion, reinforcing the AI memory-cycle thesis.',
  },
  {
    id: 'fintwit',
    emoji: '📣',
    source: 'FinTwit',
    stance: 'Support',
    text: '@tradexwhisperer: long-term DRAM undersupply should keep memory pricing rising for roughly two more years.',
  },
  {
    id: 'technical',
    emoji: '📊',
    source: 'Tech',
    stance: 'Support',
    text: 'Golden cross, RSI 52.2, and volume 1.3x the 20-day average.',
  },
] as const;

const SCOPED_CSS = `
.alpha-radar-row { transition: background .12s ease; }
.alpha-radar-row:hover { background: rgba(0,0,0,0.03); }
.alpha-radar-source { transition: background .12s ease; }
.alpha-radar-source:hover { background: rgba(0,0,0,0.03); }
.alpha-radar-source[data-selected="true"] { background: rgba(73,163,166,0.1); }
.alpha-radar-primary { transition: filter .14s ease; }
.alpha-radar-primary:not(:disabled):hover { filter: brightness(0.95); }
.alpha-radar-loader { animation: alphaRadarPulse 1s ease-in-out infinite; }
@keyframes alphaRadarPulse {
  0%, 100% { transform: scale(1); opacity: .92; }
  50% { transform: scale(.94); opacity: 1; }
}
`;

function tx(size: number, lineHeight: number, color: string, weight: 400 | 500 = 400): React.CSSProperties {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lineHeight}px`, letterSpacing: 0, color, fontWeight: weight };
}

function getFintwitSelection(selectedPresetIds: Set<string>, selectedKolsById: Map<string, AlphaKol>) {
  const selectedPresets = PRESETS.filter((preset) => selectedPresetIds.has(preset.id));
  const presetCoveredNames = new Set(selectedPresets.flatMap((preset) => preset.kols.map((kol) => kol.name)));
  const selectedKols = [...selectedKolsById.values()].filter((kol) => !presetCoveredNames.has(kol.name));
  const count = selectedPresets.reduce((total, preset) => total + preset.handleCount, 0) + selectedKols.length;
  return { selectedPresets, selectedKols, presetCoveredNames, count };
}

function KolAvatar({ label, size = 32 }: { label: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: TEAL10, color: '#35888b' }}
    >
      <span style={tx(Math.max(7, Math.round(size * 0.31)), size, 'currentColor', 500)}>
        {label.slice(0, 2).toUpperCase()}
      </span>
    </span>
  );
}

function CheckBadge({ size = 16 }: { size?: number }) {
  return <CdnIcon name="check-f2" size={size} />;
}

function PresetAvatarStack({ preset, compact = false }: { preset: AlphaPreset; compact?: boolean }) {
  if (compact) {
    return (
      <span className="flex w-[48px] shrink-0 items-center">
        {preset.kols.slice(0, 4).map((kol, index) => (
          <span
            key={`${preset.id}-compact-${kol.avatar}`}
            className="flex size-[18px] items-center justify-center rounded-full ring-1 ring-white"
            style={{ marginLeft: index > 0 ? -8 : 0, background: TEAL10, color: '#35888b' }}
          >
            <span style={tx(7, 18, 'currentColor', 500)}>{kol.avatar}</span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="grid h-[32px] w-[32px] shrink-0 grid-cols-[18px_18px] grid-rows-[18px_18px] content-center">
      {preset.kols.slice(0, 4).map((kol, index) => (
        <span
          key={`${preset.id}-${kol.avatar}`}
          className="relative flex size-[18px] items-center justify-center rounded-full ring-1 ring-white"
          style={{
            zIndex: [30, 0, 20, 10][index],
            marginLeft: index === 1 || index === 3 ? -4 : 0,
            marginTop: index === 2 || index === 3 ? -4 : 0,
            background: TEAL10,
            color: '#35888b',
          }}
        >
          <span style={tx(7, 18, 'currentColor', 500)}>{kol.avatar}</span>
        </span>
      ))}
    </span>
  );
}

function SelectedChip({ label, children, onRemove }: { label: string; children: ReactNode; onRemove: () => void }) {
  return (
    <span className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]">
      {children}
      <button
        type="button"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="flex size-[12px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 opacity-60 transition-opacity hover:opacity-100"
      >
        <CdnIcon name="close-l1" size={12} color={N7} />
      </button>
    </span>
  );
}

function SelectedPresetChip({ preset, onRemove }: { preset: AlphaPreset; onRemove: () => void }) {
  return (
    <SelectedChip label={preset.displayName} onRemove={onRemove}>
      <PresetAvatarStack preset={preset} compact />
      <span className="min-w-0 max-w-[160px] truncate" style={tx(12, 20, N9)}>
        {preset.displayName}
      </span>
    </SelectedChip>
  );
}

function SelectedKolChip({ kol, onRemove }: { kol: AlphaKol; onRemove: () => void }) {
  return (
    <SelectedChip label={kol.name} onRemove={onRemove}>
      <KolAvatar label={kol.avatar} size={18} />
      <span className="min-w-0 max-w-[160px] truncate" style={tx(12, 20, N9)}>
        {kol.name}
      </span>
    </SelectedChip>
  );
}

function SummaryPresetChip({ preset }: { preset: AlphaPreset }) {
  return (
    <span className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]">
      <PresetAvatarStack preset={preset} compact />
      <span className="min-w-0 max-w-[160px] truncate" style={tx(12, 20, N9)}>
        {preset.displayName}
      </span>
    </span>
  );
}

function SummaryKolChip({ kol }: { kol: AlphaKol }) {
  return (
    <span className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]">
      <KolAvatar label={kol.avatar} size={18} />
      <span className="min-w-0 max-w-[160px] truncate" style={tx(12, 20, N9)}>
        {kol.name}
      </span>
    </span>
  );
}

function MiniSelect<T extends string>({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onSelect: (value: T) => void;
}) {
  return (
    <Dropdown
      width={132}
      align="right"
      activeId={value}
      onSelect={(id) => onSelect(id as T)}
      items={options.map((option) => ({ id: option, label: option }))}
      trigger={
        <span
          aria-label={label}
          className="inline-flex h-[28px] min-w-[116px] items-center justify-between gap-[8px] rounded-[6px] px-[8px]"
          style={{ border: `0.5px solid ${L3}`, background: '#fff' }}
        >
          <span className="min-w-0 truncate" style={tx(12, 20, N9)}>
            {value}
          </span>
          <CdnIcon name="arrow-down-f2" size={12} color={N2} />
        </span>
      }
    />
  );
}

function SourceToggleRow({ source, selected, onToggle }: { source: AlphaSource; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      data-selected={selected}
      className="alpha-radar-source flex min-h-[92px] w-full min-w-0 cursor-pointer flex-col items-start gap-[8px] border-none px-[16px] py-[14px] text-left"
    >
      <div className="flex w-full items-center justify-between gap-[8px]">
        <span className="text-[18px] leading-none">{source.emoji}</span>
        {selected ? <CheckBadge /> : <CdnIcon name="check-l1" size={16} color={N3} />}
      </div>
      <div className="flex min-w-0 flex-col gap-[2px]">
        <p className="truncate" style={tx(14, 22, N9)}>
          {source.title}
        </p>
        <p style={tx(12, 20, N5)}>{source.description}</p>
      </div>
    </button>
  );
}

function KolRow({ kol, onSelect }: { kol: AlphaKol; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="alpha-radar-row grid min-h-[66px] w-full min-w-0 cursor-pointer grid-cols-[32px_minmax(0,1fr)_auto_16px] items-center gap-[12px] border-none bg-transparent px-[16px] py-[12px] text-left"
    >
      <KolAvatar label={kol.avatar} />
      <div className="min-w-0">
        <p className="truncate" style={tx(14, 22, N9)}>{kol.name}</p>
        <p className="truncate" style={tx(12, 20, N5)}>{kol.handle}</p>
      </div>
      <div className="text-right">
        <p style={tx(16, 22, N9)}>{kol.allTimeWinRate.toFixed(1)}%</p>
        <p className="whitespace-nowrap" style={tx(12, 20, N3)}>All-time win rate</p>
      </div>
      <CdnIcon name="add-l1" size={16} color={N5} />
    </button>
  );
}

function FintwitAccountsModal({
  open,
  selectedPresetIds,
  selectedKolsById,
  onClose,
  onCheckPreset,
  onSelectKol,
  onRemoveKol,
}: {
  open: boolean;
  selectedPresetIds: Set<string>;
  selectedKolsById: Map<string, AlphaKol>;
  onClose: () => void;
  onCheckPreset: (id: string, checked: boolean) => void;
  onSelectKol: (kol: AlphaKol) => void;
  onRemoveKol: (kol: AlphaKol) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (open) setSearchQuery('');
  }, [open]);

  const { selectedPresets, selectedKols, presetCoveredNames, count } = getFintwitSelection(selectedPresetIds, selectedKolsById);
  const query = searchQuery.trim().toLowerCase();
  const matchesQuery = (...fields: string[]) => query === '' || fields.some((field) => field.toLowerCase().includes(query));
  const availablePresets = PRESETS.filter((preset) => !selectedPresetIds.has(preset.id) && matchesQuery(preset.displayName, preset.description));
  const availableKols = KOLS.filter(
    (kol) => !selectedKolsById.has(kol.id) && !presetCoveredNames.has(kol.name) && matchesQuery(kol.name, kol.handle),
  ).sort((a, b) => b.allTimeWinRate - a.allTimeWinRate);
  const hasResults = availablePresets.length > 0 || availableKols.length > 0;

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-[16px] py-[24px]" role="dialog" aria-modal="true">
      <div className="flex h-[min(85vh,960px)] w-[min(480px,calc(100vw-32px))] flex-col overflow-hidden rounded-[12px] bg-white p-[20px] pb-0 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-[28px] md:pb-0">
        <div className="flex shrink-0 items-start gap-[12px] pb-[20px]">
          <h2 className="min-w-0 flex-1 truncate" style={tx(16, 26, N9)}>
            Choose FinTwit Accounts
          </h2>
          <button
            type="button"
            aria-label="Close choose FinTwit accounts"
            onClick={onClose}
            className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none bg-transparent hover:bg-[rgba(0,0,0,0.04)]"
          >
            <CdnIcon name="close-l1" size={16} color={N5} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] overflow-y-auto pb-[20px]">
          <p style={tx(14, 22, N7)}>
            Chosen · {count} FinTwit account{count === 1 ? '' : 's'}
          </p>
          {count > 0 && (
            <div className="flex flex-wrap items-center gap-[6px]">
              {selectedPresets.map((preset) => (
                <SelectedPresetChip key={preset.id} preset={preset} onRemove={() => onCheckPreset(preset.id, false)} />
              ))}
              {selectedKols.map((kol) => (
                <SelectedKolChip key={kol.id} kol={kol} onRemove={() => onRemoveKol(kol)} />
              ))}
            </div>
          )}
          <label className="relative flex h-[40px] items-center gap-[10px] rounded-[8px] px-[12px]" style={{ border: `0.5px solid ${L2}` }}>
            <CdnIcon name="search-l" size={15} color={N3} />
            <input
              aria-label="Search KOLs"
              placeholder="Search by handle, name, or focus"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              className="min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-[rgba(0,0,0,0.35)]"
              style={tx(13, 20, N9)}
            />
            {searchQuery !== '' && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
                className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0"
              >
                <CdnIcon name="close-l1" size={14} color={N3} />
              </button>
            )}
          </label>
          {!hasResults && (
            <p className="px-[4px]" style={tx(13, 20, N5)}>
              No matches for "{searchQuery}".
            </p>
          )}
          <div className="flex w-full flex-col overflow-hidden rounded-[8px] empty:hidden" style={{ border: `0.5px solid ${L2}` }}>
            {availablePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onCheckPreset(preset.id, true)}
                className="alpha-radar-row flex min-h-[58px] w-full cursor-pointer items-center gap-[12px] border-x-0 border-t-0 bg-transparent px-[16px] py-[12px] text-left"
                style={{ borderBottom: `0.5px solid ${L12}` }}
              >
                <PresetAvatarStack preset={preset} />
                <div className="min-w-0 flex-1">
                  <p className="truncate" style={tx(14, 22, N9)}>{preset.displayName}</p>
                  <p className="truncate" style={tx(12, 20, N5)}>{preset.description}</p>
                </div>
                <CdnIcon name="add-l1" size={16} color={N5} />
              </button>
            ))}
            {availableKols.map((kol) => (
              <div key={kol.id} style={{ borderBottom: `0.5px solid ${L12}` }}>
                <KolRow kol={kol} onSelect={() => onSelectKol(kol)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function AlphaRadarPanel({
  onGenerate,
  initialSummary,
}: {
  onGenerate: (summary: AlphaRadarSummary) => void;
  initialSummary: AlphaRadarSummary | null;
}) {
  const [selectedSources, setSelectedSources] = useState<Set<AlphaSourceId>>(
    () => new Set(initialSummary?.sources ?? ['fintwit', 'news', 'technical']),
  );
  const [selectedPresetIds, setSelectedPresetIds] = useState<Set<string>>(
    () => new Set(initialSummary?.presets.map((preset) => preset.id) ?? []),
  );
  const [selectedKolsById, setSelectedKolsById] = useState<Map<string, AlphaKol>>(
    () => new Map((initialSummary?.kols ?? []).map((kol) => [kol.id, kol])),
  );
  const [digestTime, setDigestTime] = useState(initialSummary?.digestTime ?? '8:00 AM ET');
  const [language, setLanguage] = useState<DigestLanguage>(initialSummary?.language ?? 'English');
  const [fintwitModalOpen, setFintwitModalOpen] = useState(false);

  const { selectedPresets, selectedKols, count: fintwitCount } = useMemo(
    () => getFintwitSelection(selectedPresetIds, selectedKolsById),
    [selectedPresetIds, selectedKolsById],
  );

  const isFintwitSelected = selectedSources.has('fintwit');
  const canGenerate = selectedSources.size > 0 && (!isFintwitSelected || fintwitCount > 0);

  const toggleSource = (id: AlphaSourceId) => {
    const turningOn = !selectedSources.has(id);
    setSelectedSources((current) => {
      const next = new Set(current);
      if (turningOn) next.add(id);
      else next.delete(id);
      return next;
    });
    if (id === 'fintwit' && turningOn) setFintwitModalOpen(true);
  };

  const handleCheckPreset = (presetId: string, checked: boolean) => {
    setSelectedPresetIds((current) => {
      const next = new Set(current);
      if (checked) next.add(presetId);
      else next.delete(presetId);
      return next;
    });
  };

  const handleSelectKol = (kol: AlphaKol) => {
    setSelectedKolsById((current) => {
      const next = new Map(current);
      next.set(kol.id, kol);
      return next;
    });
  };

  const handleRemoveKol = (kol: AlphaKol) => {
    setSelectedKolsById((current) => {
      const next = new Map(current);
      next.delete(kol.id);
      return next;
    });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {SOURCES.map((source, index) => (
            <div
              key={source.id}
              className={`flex min-w-0 flex-col border-b border-[rgba(0,0,0,0.12)]${index < SOURCES.length - 1 ? ' md:border-r' : ''}`}
            >
              <SourceToggleRow source={source} selected={selectedSources.has(source.id)} onToggle={() => toggleSource(source.id)} />
              {source.id === 'fintwit' && isFintwitSelected && (
                <button
                  type="button"
                  onClick={() => setFintwitModalOpen(true)}
                  className="alpha-radar-row flex min-h-[44px] w-full min-w-0 cursor-pointer items-center justify-between gap-[8px] border-x-0 border-b-0 bg-transparent px-[16px] py-[10px] text-left"
                  style={{ borderTop: `0.5px solid ${L12}` }}
                >
                  <span className="min-w-0 truncate" style={tx(12, 20, N7)}>
                    {fintwitCount > 0 ? `${fintwitCount} account${fintwitCount === 1 ? '' : 's'} selected` : 'Choose accounts to follow'}
                  </span>
                  <CdnIcon name="arrow-right-l1" size={14} color={N3} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[12px] p-[16px]">
          <div className="flex flex-col gap-[12px] md:flex-row md:items-center md:gap-[20px]">
            <div className="grid min-w-0 grid-cols-2 gap-[12px] md:flex md:flex-1 md:flex-wrap md:items-center md:gap-[20px]">
              <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
                <span className="shrink-0 whitespace-nowrap" style={tx(12, 20, N7)}>Daily alert time</span>
                <MiniSelect label="Daily alert time" value={digestTime} options={ALERT_TIMES} onSelect={setDigestTime} />
              </div>
              <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
                <span className="shrink-0 whitespace-nowrap" style={tx(12, 20, N7)}>Language</span>
                <MiniSelect label="Digest language" value={language} options={LANGUAGES} onSelect={setLanguage} />
              </div>
            </div>
            <button
              type="button"
              disabled={!canGenerate}
              onClick={() =>
                onGenerate({
                  sources: [...selectedSources],
                  presets: selectedPresets,
                  kols: selectedKols,
                  digestTime,
                  language,
                })
              }
              className="alpha-radar-primary h-[36px] w-full shrink-0 cursor-pointer whitespace-nowrap rounded-[6px] border-none px-[20px] md:w-auto"
              style={{ ...tx(14, 22, canGenerate ? '#fff' : N2, 500), background: canGenerate ? TEAL : '#fff', border: canGenerate ? 'none' : `0.5px solid ${L3}` }}
            >
              Start my Alpha Radar
            </button>
          </div>
          {!canGenerate && (
            <p style={tx(12, 20, '#b4652e')}>
              {selectedSources.size === 0
                ? 'Select at least one source to continue.'
                : 'Select at least one FinTwit account to continue, or turn the FinTwit source off.'}
            </p>
          )}
        </div>
      </div>

      <FintwitAccountsModal
        open={fintwitModalOpen}
        selectedPresetIds={selectedPresetIds}
        selectedKolsById={selectedKolsById}
        onClose={() => setFintwitModalOpen(false)}
        onCheckPreset={handleCheckPreset}
        onSelectKol={handleSelectKol}
        onRemoveKol={handleRemoveKol}
      />
    </>
  );
}

function GeneratingView() {
  return (
    <div className="flex w-full items-center gap-[8px] rounded-[8px] px-[12px] py-[10px]" style={{ border: `0.5px solid ${L12}` }}>
      <span className="alpha-radar-loader flex size-[22px] shrink-0 items-center justify-center rounded-[6px]" style={{ background: '#2A2A38' }}>
        <span className="grid size-[14px] grid-cols-2 grid-rows-2 gap-[1px] overflow-hidden rounded-[3px]">
          <span className="rounded-[1px]" style={{ background: TEAL }} />
          <span className="rounded-[1px] bg-white" />
          <span className="rounded-[1px] bg-white" />
          <span className="rounded-[1px]" style={{ background: TEAL }} />
        </span>
      </span>
      <span className="block min-w-0 truncate" style={tx(12, 20, N5)}>
        Setting up your Alpha Radar...
      </span>
    </div>
  );
}

function SampleDigestPreview() {
  return (
    <div className="flex flex-col gap-[8px]">
      <p style={tx(12, 20, N5)}>Here's what tomorrow's digest will look like · sample</p>
      <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex flex-wrap items-baseline gap-[8px]">
            <span style={tx(16, 24, N9, 500)}>$MU</span>
            <span className="rounded-[4px] px-[6px] py-[1px]" style={{ ...tx(12, 20, '#2f7f82'), background: 'rgba(73,163,166,0.12)' }}>
              Bullish
            </span>
            <span style={tx(13, 20, 'rgba(0,0,0,0.55)')}>$935.57 (-4.99%)</span>
          </div>
          <p style={tx(13, 21, N7)}>
            News, FinTwit, and Tech all lean bullish - the most complete setup in this run.
          </p>
          <div className="flex flex-col gap-[8px] pt-[10px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            {SAMPLE_DIGEST_EVIDENCE.map((item) => (
              <div key={item.id} className="flex items-start gap-[8px]">
                <span className="text-[14px] leading-[21px]">{item.emoji}</span>
                <p className="min-w-0" style={tx(13, 21, 'rgba(0,0,0,0.8)')}>
                  <span style={{ fontWeight: 500, color: N9 }}>{item.source} ({item.stance})</span> - {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="pt-[10px]" style={{ ...tx(11, 18, 'rgba(0,0,0,0.45)'), borderTop: `0.5px solid ${L12}` }}>
            Technical-signal reliability is calibrated on a 3-year backtest and drives ranking - not a return promise. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompleteView({ summary, onEdit }: { summary: AlphaRadarSummary; onEdit: () => void }) {
  const hasFintwit = summary.sources.includes('fintwit');
  const fintwitCount = summary.presets.reduce((total, preset) => total + preset.handleCount, 0) + summary.kols.length;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[2px]">
        <p style={tx(14, 22, N9)}>Your Alpha Radar is live.</p>
        <p style={tx(14, 22, N5)}>First digest arrives tomorrow at {summary.digestTime} - you can adjust sources anytime.</p>
      </div>
      <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
        <div className="flex flex-col gap-[12px] p-[16px]">
          <p style={tx(12, 20, N5)}>Watching · {summary.sources.length} source{summary.sources.length === 1 ? '' : 's'}</p>
          <div className="flex flex-wrap items-center gap-[6px]">
            {SOURCES.filter((source) => summary.sources.includes(source.id)).map((source) => (
              <span
                key={source.id}
                className="flex h-[28px] max-w-full shrink-0 items-center gap-[6px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]"
                style={tx(12, 20, N9)}
              >
                <span>{source.emoji}</span>
                <span>{source.title}</span>
              </span>
            ))}
          </div>
          {hasFintwit && fintwitCount > 0 && (
            <div className="flex flex-col gap-[6px] pt-[12px]" style={{ borderTop: `0.5px solid ${L12}` }}>
              <p style={tx(12, 20, N5)}>FinTwit · {fintwitCount} account{fintwitCount === 1 ? '' : 's'}</p>
              <div className="flex flex-wrap items-center gap-[6px]">
                {summary.presets.map((preset) => <SummaryPresetChip key={preset.id} preset={preset} />)}
                {summary.kols.map((kol) => <SummaryKolChip key={kol.id} kol={kol} />)}
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-[20px] pt-[12px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            <div className="flex items-center gap-[8px]">
              <span style={tx(12, 20, N5)}>Daily alert time</span>
              <span style={tx(12, 20, N9)}>{summary.digestTime}</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <span style={tx(12, 20, N5)}>Language</span>
              <span style={tx(12, 20, N9)}>{summary.language}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onEdit}
            className="h-[32px] w-fit cursor-pointer rounded-[6px] bg-white px-[12px]"
            style={{ ...tx(12, 20, N9), border: `0.5px solid ${L3}` }}
          >
            Edit Alpha Radar setup
          </button>
        </div>
      </div>
      <SampleDigestPreview />
    </div>
  );
}

export function AlphaRadarBuilder({ onLive }: { onLive?: (summary: AlphaRadarSummary) => void }) {
  const [phase, setPhase] = useState<AlphaPhase>('setup');
  const [summary, setSummary] = useState<AlphaRadarSummary | null>(null);

  const handleGenerate = (nextSummary: AlphaRadarSummary) => {
    setSummary(nextSummary);
    setPhase('generating');
    window.setTimeout(() => {
      setPhase('complete');
      onLive?.(nextSummary);
    }, 1300);
  };

  return (
    <>
      <style>{SCOPED_CSS}</style>
      {phase === 'setup' && (
        <div className="flex flex-col gap-[12px]">
          <div style={tx(14, 22, N9)}>
            <p>Build your personal Alpha Radar.</p>
            <p>Pick the signal sources you want Alva to track - FinTwit voices, breaking news, and technical setups. Alva watches them and sends you a daily digest automatically.</p>
          </div>
          <div style={tx(14, 22, N9)}>
            <p>Choose the sources you want Alva to watch.</p>
            <p style={{ color: N5 }}>Pick one or more. FinTwit lets you follow specific voices - you can add or remove accounts anytime.</p>
          </div>
          <AlphaRadarPanel onGenerate={handleGenerate} initialSummary={summary} />
        </div>
      )}
      {phase === 'generating' && <GeneratingView />}
      {phase === 'complete' && summary && <CompleteView summary={summary} onEdit={() => setPhase('setup')} />}
    </>
  );
}
