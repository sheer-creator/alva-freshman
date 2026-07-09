import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Bell,
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  Folder,
  ListChecks,
  MessageCircle,
  Plus,
  Search,
  Settings,
  X,
} from 'lucide-react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';

interface Props {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

type AgentView = 'watch' | 'digest' | 'generating' | 'complete';
type DigestLanguage = 'English' | 'Chinese' | 'Japanese';

type Preset = {
  id: string;
  displayName: string;
  description: string;
  handleCount: number;
  kols: { name: string; avatar: string }[];
};

type Kol = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  allTimeWinRate: number;
};

type SourceId = 'news' | 'fintwit' | 'technical';

type SourceDefinition = {
  id: SourceId;
  emoji: string;
  title: string;
  description: string;
};

type DigestSummary = {
  sources: SourceId[];
  presets: Preset[];
  kols: Kol[];
  digestTime: string;
  language: DigestLanguage;
};

const SOURCES: SourceDefinition[] = [
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

const WATCH_ONBOARDING_ITEMS = [
  {
    id: 'alpha-radar',
    title: '📡  Build your Alpha Radar',
    description:
      "I'll track FinTwit voices, breaking news, and technical signals, then send you a daily digest on what actually matters.",
  },
  {
    id: 'screener',
    title: '🔍  Screen the market on your rules',
    description:
      "Set your criteria once - momentum, insider buying, deep value, anything. I'll watch the market and message you only when new names qualify.",
  },
  {
    id: 'automation',
    title: '⚙️  Build your own automations',
    description:
      "Tell me what you want Alva to monitor and when it should run. I'll help shape it into a reliable automation.",
  },
] as const;

const PRESETS: Preset[] = [
  {
    id: 'top50 leaderboard',
    displayName: 'Top50 Leaderboard',
    description: 'Curated top KOLs from the leaderboard.',
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
    description: 'Single KOL preset.',
    handleCount: 1,
    kols: [
      { name: 'Ethan Brooks', avatar: 'EB' },
    ],
  },
];

const KOLS: Kol[] = [
  { id: 'dampedspring', name: 'Andy Constan', handle: '@dampedspring', avatar: 'AC', allTimeWinRate: 68.2 },
  { id: 'cryptokaleo', name: 'K A L E O', handle: '@cryptokaleo', avatar: 'KA', allTimeWinRate: 62.5 },
  { id: 'elliottchart', name: 'Elliott Chart', handle: '@elliottchart', avatar: 'EC', allTimeWinRate: 57.89 },
  { id: 'saxena_puru', name: 'Puru Saxena', handle: '@saxena_puru', avatar: 'PS', allTimeWinRate: 57.4 },
  { id: 'mikealfred', name: 'Mike Alfred', handle: '@mikealfred', avatar: 'MA', allTimeWinRate: 33 },
  { id: 'davehcontrarian', name: 'Dave H Contrarian', handle: '@davehcontrarian', avatar: 'DH', allTimeWinRate: 52.2 },
  { id: 'gainzy222', name: 'Gainzy', handle: '@gainzy222', avatar: 'GA', allTimeWinRate: 63 },
  { id: 'mingchikuo', name: 'Ming-Chi Kuo', handle: '@mingchikuo', avatar: 'MK', allTimeWinRate: 46 },
  { id: 'ethanbrooks', name: 'Ethan Brooks', handle: '@ethanbrooks', avatar: 'EB', allTimeWinRate: 58 },
  { id: 'mayachen', name: 'Maya Chen', handle: '@mayachen', avatar: 'MC', allTimeWinRate: 54 },
];

// Presets already cover a handful of named KOLs, so a KOL selected both via a preset
// and individually must only count once (matches the real digest builder's
// getSelectedDigestKols dedup, which keeps preset membership authoritative).
function getFintwitSelection(selectedPresetIds: Set<string>, selectedKolsById: Map<string, Kol>) {
  const selectedPresets = PRESETS.filter(preset => selectedPresetIds.has(preset.id));
  const presetCoveredNames = new Set(selectedPresets.flatMap(preset => preset.kols.map(kol => kol.name)));
  const selectedKols = [...selectedKolsById.values()].filter(kol => !presetCoveredNames.has(kol.name));
  const count = selectedPresets.reduce((total, preset) => total + preset.handleCount, 0) + selectedKols.length;
  return { selectedPresets, selectedKols, presetCoveredNames, count };
}

const TABS = [
  { value: 'chat', label: 'Chat', icon: MessageCircle },
  { value: 'tasks', label: 'Tasks', icon: ListChecks },
  { value: 'alerts', label: 'Alerts', icon: Bell },
  { value: 'memory', label: 'Memory', icon: Brain },
  { value: 'files', label: 'Files', icon: Folder },
] as const;

function AlvaMark({ size = 22 }: { size?: number }) {
  const block = Math.max(5, Math.round(size * 0.36));
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-[4px]"
      style={{ width: size, height: size, gap: Math.max(1, Math.round(size * 0.08)) }}
    >
      <span className="rounded-[2px] bg-[#49A3A6]" style={{ width: block, height: block }} />
      <span className="rounded-[2px] bg-white" style={{ width: block, height: block }} />
      <span className="rounded-[2px] bg-white" style={{ width: block, height: block }} />
      <span className="rounded-[2px] bg-[#49A3A6]" style={{ width: block, height: block }} />
    </span>
  );
}

function AgentAvatar() {
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[#2A2A38]">
      <AlvaMark size={18} />
    </span>
  );
}

function KolAvatar({ label, size = 32 }: { label: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-[rgba(73,163,166,0.10)] text-[#35888b]"
      style={{ width: size, height: size }}
    >
      <span className="font-['Delight',sans-serif] text-[10px] leading-none tracking-[0.1px]">
        {label.slice(0, 2).toUpperCase()}
      </span>
    </span>
  );
}

function AgentHeader({ title, hideControls }: { title: string; hideControls?: boolean }) {
  return (
    <header className="flex h-[74px] min-h-[74px] items-center gap-[12px] overflow-hidden bg-white px-[28px] py-[16px] max-md:h-[56px] max-md:min-h-[56px] max-md:px-[16px]">
      <div className="hidden shrink-0 md:block">
        <AgentAvatar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h1 className="truncate font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] max-md:text-[16px] max-md:font-normal max-md:leading-[26px]">
          {title}
        </h1>
        <p className="hidden truncate font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)] md:block">
          Your AI investing agent. Ask me to research markets, build live Playbooks, or set up automations that watch the market for you.
        </p>
      </div>
      {!hideControls && (
        <div className="flex shrink-0 items-center gap-[8px]">
          <button
            type="button"
            className="hidden h-[32px] items-center rounded-[6px] bg-[#49a3a6] px-[12px] font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-white md:flex"
          >
            Connect
          </button>
          <button
            type="button"
            aria-label="Agent settings"
            className="flex size-[32px] items-center justify-center rounded-[6px] border border-[rgba(0,0,0,0.30)] text-[rgba(0,0,0,0.9)] transition-colors hover:bg-[rgba(0,0,0,0.03)]"
          >
            <Settings size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

function AgentTabs() {
  return (
    <div className="no-scrollbar flex min-h-[37px] items-end overflow-x-auto border-b border-[rgba(0,0,0,0.12)] px-[28px] max-md:px-[16px]">
      <div className="flex min-w-max flex-1 items-end gap-[16px]">
        {TABS.map(({ value, label, icon: Icon }) => {
          const active = value === 'chat';
          return (
            <button
              key={value}
              type="button"
              className="group relative flex h-[37px] items-start gap-[6px] pb-[6px] pt-0 font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] transition-colors"
              style={{ color: active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)' }}
            >
              <Icon size={14} className="mt-[3px] hidden md:block" />
              <span>{label}</span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#49a3a6]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AgentMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[8px] md:flex-row md:items-start">
      <div className="flex items-center gap-[8px] md:contents">
        <AgentAvatar />
        <p className="min-w-0 truncate font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] md:hidden">
          Alva
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <p className="hidden truncate font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] md:block">
          Alva
        </p>
        {children}
      </div>
    </div>
  );
}

function WatchOnboardingItem({
  item,
  index,
  hasDivider,
  onClick,
}: {
  item: (typeof WATCH_ONBOARDING_ITEMS)[number];
  index: number;
  hasDivider: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full min-w-0 cursor-pointer items-center gap-[12px] px-[16px] py-[16px] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#49a3a6]/20"
    >
      {hasDivider && (
        <span className="absolute bottom-0 left-px right-px h-px bg-[rgba(0,0,0,0.12)]" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <div className="font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          {item.title}
        </div>
        <div className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
          {item.description}
        </div>
      </div>
      <ArrowRight size={14} className="shrink-0 text-[rgba(0,0,0,0.5)] transition-colors group-hover:text-[rgba(0,0,0,0.9)]" />
      <span className="sr-only">Option {index + 1}</span>
    </button>
  );
}

function WatchOnboarding({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-w-0 flex-col gap-[8px]">
      <div className="flex h-[22px] min-w-0 items-center">
        <AgentAvatar />
        <div className="ml-[8px] font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          Alva
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-[12px] pl-[30px] max-md:pl-0">
        <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          <span>Hey, I&apos;m Alva, your AI investing agent.</span>
          <br />
          Ask me for market research, or set up live automations to watch your portfolio, tickers, and market voices. Pick what you want me to help with first.
        </p>
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.20)] bg-white">
          {WATCH_ONBOARDING_ITEMS.map((item, index) => (
            <WatchOnboardingItem
              key={item.id}
              item={item}
              index={index}
              hasDivider={index < WATCH_ONBOARDING_ITEMS.length - 1}
              onClick={index === 0 ? onStart : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FakeComposer() {
  return (
    <div className="mx-auto w-full max-w-[960px] px-0">
      <div className="rounded-[12px] bg-[rgb(245,245,245)] p-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
        <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.35)]">
          Ask Alva anything. @ for context, / for skills
        </p>
      </div>
    </div>
  );
}

function PresetAvatarStack({ preset }: { preset: Preset }) {
  return (
    <div className="grid h-[32px] w-[32px] shrink-0 grid-cols-[18px_18px] grid-rows-[18px_18px] content-center">
      {preset.kols.slice(0, 4).map((kol, index) => (
        <span
          key={`${preset.id}-${kol.avatar}`}
          className="relative flex size-[18px] items-center justify-center rounded-full bg-[rgba(73,163,166,0.12)] text-[#35888b] ring-1 ring-white"
          style={{
            zIndex: [30, 0, 20, 10][index],
            marginLeft: index === 1 || index === 3 ? -4 : 0,
            marginTop: index === 2 || index === 3 ? -4 : 0,
          }}
        >
          <span className="font-['Delight',sans-serif] text-[7px] leading-none">
            {kol.avatar}
          </span>
        </span>
      ))}
    </div>
  );
}

function PresetChipAvatarStack({ preset }: { preset: Preset }) {
  return (
    <span className="flex w-[48px] shrink-0 items-center">
      {preset.kols.slice(0, 4).map((kol, index) => (
        <span
          key={`${preset.id}-chip-${kol.avatar}`}
          className="flex size-[18px] items-center justify-center rounded-full bg-[rgba(73,163,166,0.12)] text-[#35888b] ring-1 ring-white"
          style={{ marginLeft: index > 0 ? -8 : 0 }}
        >
          <span className="font-['Delight',sans-serif] text-[7px] leading-none">
            {kol.avatar}
          </span>
        </span>
      ))}
    </span>
  );
}

function KolRow({ kol, onSelect }: { kol: Kol; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={false}
      onClick={onSelect}
      className="grid min-h-[66px] w-full min-w-0 grid-cols-[32px_minmax(0,1fr)_auto_16px] items-center gap-[12px] px-[16px] py-[12px] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#49a3a6]/20"
    >
      <KolAvatar label={kol.avatar} />
      <div className="min-w-0">
        <p className="truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          {kol.name}
        </p>
        <p className="truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
          {kol.handle}
        </p>
      </div>
      <div className="text-right">
        <p className="font-['Delight',sans-serif] text-[16px] font-normal leading-[22px] tracking-[0.16px] text-[rgba(0,0,0,0.9)]">
          {kol.allTimeWinRate.toFixed(1)}%
        </p>
        <p className="whitespace-nowrap font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.3)]">
          All-time win rate
        </p>
      </div>
      <Plus size={16} className="shrink-0 text-[rgba(0,0,0,0.5)]" />
    </button>
  );
}

function SelectedChip({
  children,
  label,
  onRemove,
}: {
  children: ReactNode;
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Remove ${label}`}
      onClick={onRemove}
      className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px] text-left transition-colors hover:bg-[rgba(0,0,0,0.07)] focus:outline-none focus:ring-2 focus:ring-[#49a3a6]/20"
    >
      {children}
      <span className="flex size-[12px] shrink-0 items-center justify-center text-[rgba(0,0,0,0.5)]">
        <X size={12} />
      </span>
    </button>
  );
}

function SelectedPresetChip({ preset, onRemove }: { preset: Preset; onRemove: () => void }) {
  return (
    <SelectedChip label={preset.displayName} onRemove={onRemove}>
      <PresetChipAvatarStack preset={preset} />
      <span className="min-w-0 max-w-[160px] truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
        {preset.displayName}
      </span>
    </SelectedChip>
  );
}

function SelectedKolChip({ kol, onRemove }: { kol: Kol; onRemove: () => void }) {
  return (
    <SelectedChip label={kol.name} onRemove={onRemove}>
      <KolAvatar label={kol.avatar} size={18} />
      <span className="min-w-0 max-w-[160px] truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
        {kol.name}
      </span>
    </SelectedChip>
  );
}

function DigestSelectButton({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-[28px] w-full shrink-0 items-center justify-between gap-[8px] rounded-[6px] border border-[rgba(0,0,0,0.30)] px-[8px] py-[2px] font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)] transition-colors hover:bg-[rgba(0,0,0,0.03)] md:w-[116px]"
    >
      <span className="min-w-0 truncate">{children ?? label}</span>
      <ChevronDown size={12} className="shrink-0 text-[rgba(0,0,0,0.2)]" />
    </button>
  );
}

function DigestSettings({
  digestTime,
  setDigestTime,
  language,
  setLanguage,
}: {
  digestTime: string;
  setDigestTime: (time: string) => void;
  language: DigestLanguage;
  setLanguage: (language: DigestLanguage) => void;
}) {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-[12px] md:flex md:flex-1 md:flex-wrap md:items-center md:gap-[20px]">
      <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
        <span className="shrink-0 whitespace-nowrap font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.7)]">
          Daily alert time
        </span>
        <span className="relative block w-full md:w-auto" title="America/New_York">
          <DigestSelectButton label="Digest time">{digestTime}</DigestSelectButton>
          <select
            aria-label="Digest time"
            value={digestTime}
            onChange={event => setDigestTime(event.currentTarget.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            <option>8:00 AM ET</option>
            <option>8:30 AM ET</option>
            <option>4:30 PM ET</option>
          </select>
        </span>
      </div>
      <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
        <span className="shrink-0 whitespace-nowrap font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.7)]">
          Language
        </span>
        <label className="relative flex h-[28px] w-full shrink-0 items-center justify-between gap-[8px] overflow-hidden rounded-[6px] border border-[rgba(0,0,0,0.30)] px-[8px] py-[2px] font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)] transition-colors hover:bg-[rgba(0,0,0,0.03)] md:w-[116px]">
          <span className="min-w-0 truncate">{language}</span>
          <ChevronDown size={12} className="shrink-0 text-[rgba(0,0,0,0.2)]" />
          <select
            aria-label="Digest language"
            value={language}
            onChange={event => setLanguage(event.currentTarget.value as DigestLanguage)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            <option>English</option>
            <option>Chinese</option>
          </select>
        </label>
      </div>
    </div>
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
  selectedKolsById: Map<string, Kol>;
  onClose: () => void;
  onCheckPreset: (id: string, checked: boolean) => void;
  onSelectKol: (kol: Kol) => void;
  onRemoveKol: (kol: Kol) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (open) setSearchQuery('');
  }, [open]);

  if (!open) return null;

  const { selectedPresets, selectedKols, presetCoveredNames, count } = getFintwitSelection(
    selectedPresetIds,
    selectedKolsById,
  );

  const query = searchQuery.trim().toLowerCase();
  const matchesQuery = (...fields: string[]) =>
    query === '' || fields.some(field => field.toLowerCase().includes(query));

  const availablePresets = PRESETS.filter(
    preset => !selectedPresetIds.has(preset.id) && matchesQuery(preset.displayName, preset.description),
  );
  const availableKols = KOLS.filter(
    kol =>
      !selectedKolsById.has(kol.id) && !presetCoveredNames.has(kol.name) && matchesQuery(kol.name, kol.handle),
  ).sort((a, b) => b.allTimeWinRate - a.allTimeWinRate);
  const hasResults = availablePresets.length > 0 || availableKols.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-[16px] py-[24px]">
      <div className="flex h-[min(85vh,960px)] w-[min(480px,calc(100vw-32px))] flex-col overflow-hidden rounded-[12px] bg-white p-[20px] pb-0 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-[28px] md:pb-0">
        <div className="flex shrink-0 items-start gap-[12px] pb-[20px]">
          <h2 className="min-w-0 flex-1 truncate font-['Delight',sans-serif] text-[16px] font-normal leading-[26px] tracking-[0.16px] text-[rgba(0,0,0,0.9)]">
            Choose FinTwit Accounts
          </h2>
          <button
            type="button"
            aria-label="Close choose FinTwit accounts"
            onClick={onClose}
            className="flex size-[32px] items-center justify-center rounded-[6px] text-[rgba(0,0,0,0.55)] hover:bg-[rgba(0,0,0,0.04)]"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] overflow-y-auto pb-[20px]">
          <p className="font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.7)]">
            Chosen · {count} FinTwit account{count === 1 ? '' : 's'}
          </p>
          {count > 0 && (
            <div className="flex flex-wrap items-center gap-[6px]">
              {selectedPresets.map(preset => (
                <SelectedPresetChip
                  key={preset.id}
                  preset={preset}
                  onRemove={() => onCheckPreset(preset.id, false)}
                />
              ))}
              {selectedKols.map(kol => (
                <SelectedKolChip key={kol.id} kol={kol} onRemove={() => onRemoveKol(kol)} />
              ))}
            </div>
          )}
          <label className="relative flex h-[40px] items-center gap-[10px] rounded-[8px] border border-[rgba(0,0,0,0.18)] px-[12px]">
            <Search size={15} className="text-[rgba(0,0,0,0.35)]" />
            <input
              aria-label="Search KOLs"
              placeholder="Search by handle, name, or focus"
              value={searchQuery}
              onChange={event => setSearchQuery(event.currentTarget.value)}
              className="min-w-0 flex-1 border-none bg-transparent font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] outline-none placeholder:text-[rgba(0,0,0,0.35)]"
            />
            {searchQuery !== '' && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
                className="flex shrink-0 items-center justify-center text-[rgba(0,0,0,0.3)] transition-colors hover:text-[rgba(0,0,0,0.55)]"
              >
                <X size={14} />
              </button>
            )}
          </label>
          {!hasResults && (
            <p className="px-[4px] font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.5)]">
              No matches for &ldquo;{searchQuery}&rdquo;.
            </p>
          )}
          <div className="flex w-full flex-col overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.20)] empty:hidden">
            {availablePresets.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onCheckPreset(preset.id, true)}
                className="flex min-h-[58px] w-full items-center gap-[12px] border-b border-[rgba(0,0,0,0.12)] px-[16px] py-[12px] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)]"
              >
                <PresetAvatarStack preset={preset} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
                    {preset.displayName}
                  </p>
                  <p className="truncate font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
                    {preset.description}
                  </p>
                </div>
                <Plus size={16} className="text-[rgba(0,0,0,0.5)]" />
              </button>
            ))}
            {availableKols.map(kol => (
              <div key={kol.id} className="border-b border-[rgba(0,0,0,0.12)] last:border-b-0">
                <KolRow kol={kol} onSelect={() => onSelectKol(kol)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceToggleRow({
  source,
  selected,
  onToggle,
}: {
  source: SourceDefinition;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className="flex min-h-[92px] w-full min-w-0 flex-col items-start gap-[8px] px-[16px] py-[14px] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[#49a3a6]/20"
      style={{ background: selected ? 'rgba(73,163,166,0.10)' : '#fff' }}
    >
      <div className="flex w-full items-center justify-between gap-[8px]">
        <span className="text-[18px] leading-none">{source.emoji}</span>
        {selected ? (
          <Check size={16} className="shrink-0 text-[#49a3a6]" />
        ) : (
          <Check size={16} className="shrink-0 text-[rgba(0,0,0,0.25)]" />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-[2px]">
        <p className="truncate font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          {source.title}
        </p>
        <p className="font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
          {source.description}
        </p>
      </div>
    </button>
  );
}

function AlphaRadarPanel({
  onGenerate,
  initialSummary,
}: {
  onGenerate: (summary: DigestSummary) => void;
  initialSummary: DigestSummary | null;
}) {
  // New setups start with all three sources on: cross-source validation is
  // the product's core value, so the default shows it; users trim from there.
  const [selectedSources, setSelectedSources] = useState<Set<SourceId>>(
    () => new Set(initialSummary?.sources ?? ['fintwit', 'news', 'technical']),
  );
  const [selectedPresetIds, setSelectedPresetIds] = useState<Set<string>>(
    () => new Set(initialSummary?.presets.map(preset => preset.id) ?? []),
  );
  const [selectedKolsById, setSelectedKolsById] = useState<Map<string, Kol>>(
    () => new Map((initialSummary?.kols ?? []).map(kol => [kol.id, kol])),
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

  const toggleSource = (id: SourceId) => {
    const turningOn = !selectedSources.has(id);
    setSelectedSources(current => {
      const next = new Set(current);
      if (turningOn) next.add(id);
      else next.delete(id);
      return next;
    });

    if (id === 'fintwit' && turningOn) setFintwitModalOpen(true);
  };

  const handleCheckPreset = (presetId: string, checked: boolean) => {
    setSelectedPresetIds(current => {
      const next = new Set(current);
      if (checked) next.add(presetId);
      else next.delete(presetId);
      return next;
    });
  };

  const handleSelectKol = (kol: Kol) => {
    setSelectedKolsById(current => {
      const next = new Map(current);
      next.set(kol.id, kol);
      return next;
    });
  };

  const handleRemoveKol = (kol: Kol) => {
    setSelectedKolsById(current => {
      const next = new Map(current);
      next.delete(kol.id);
      return next;
    });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.20)] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {SOURCES.map((source, index) => (
            <div
              key={source.id}
              className={`flex min-w-0 flex-col border-b border-[rgba(0,0,0,0.12)]${
                index < SOURCES.length - 1 ? ' md:border-r md:border-[rgba(0,0,0,0.12)]' : ''
              }`}
            >
              <SourceToggleRow
                source={source}
                selected={selectedSources.has(source.id)}
                onToggle={() => toggleSource(source.id)}
              />
              {source.id === 'fintwit' && isFintwitSelected && (
                <button
                  type="button"
                  onClick={() => setFintwitModalOpen(true)}
                  className="flex min-h-[44px] w-full min-w-0 items-center justify-between gap-[8px] border-t border-[rgba(0,0,0,0.12)] px-[16px] py-[10px] text-left transition-colors hover:bg-[rgba(0,0,0,0.03)]"
                >
                  <span className="min-w-0 truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.7)]">
                    {fintwitCount > 0
                      ? `${fintwitCount} account${fintwitCount === 1 ? '' : 's'} selected`
                      : 'Choose accounts to follow'}
                  </span>
                  <ChevronRight size={14} className="shrink-0 text-[rgba(0,0,0,0.35)]" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[12px] p-[16px]">
          <div className="flex flex-col gap-[12px] md:flex-row md:items-center md:gap-[20px]">
            <DigestSettings
              digestTime={digestTime}
              setDigestTime={setDigestTime}
              language={language}
              setLanguage={setLanguage}
            />
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
              className="h-[36px] w-full shrink-0 whitespace-nowrap rounded-[6px] bg-[#49a3a6] px-[20px] font-['Delight',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.14px] text-white transition-colors hover:bg-[#3e8f92] disabled:cursor-not-allowed disabled:bg-[rgba(0,0,0,0.12)] md:w-auto"
            >
              Start my Alpha Radar
            </button>
          </div>
          {!canGenerate && (
            <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[#b4652e]">
              {selectedSources.size === 0
                ? 'Select at least one source to continue.'
                : 'Select at least one FinTwit account to continue — or turn the FinTwit source off.'}
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

function AlphaRadarBuilder({
  onGenerate,
  initialSummary,
}: {
  onGenerate: (summary: DigestSummary) => void;
  initialSummary: DigestSummary | null;
}) {
  return (
    <>
      <AgentMessage>
        <div className="font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          <p>Build your personal Alpha Radar.</p>
          <p>Pick the signal sources you want Alva to track — FinTwit voices, breaking news, technical setups. Alva watches them and sends you a daily digest automatically.</p>
        </div>
      </AgentMessage>

      <AgentMessage>
        <div className="flex flex-col gap-[12px]">
          <div className="font-['Delight',sans-serif] text-[14px] font-normal leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
            <p>Choose the sources you want Alva to watch.</p>
            <p>Pick one or more. FinTwit lets you follow specific voices — you can add or remove accounts anytime.</p>
          </div>
          <AlphaRadarPanel onGenerate={onGenerate} initialSummary={initialSummary} />
        </div>
      </AgentMessage>
    </>
  );
}

function GeneratingView() {
  return (
    <AgentMessage>
      <div className="flex w-full items-center gap-[8px]">
        <span className="agent-demo-loader flex size-[22px] shrink-0 items-center justify-center rounded-[6px] bg-[#2A2A38]">
          <AlvaMark size={16} />
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <span className="block min-w-0 truncate font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
            Setting up your Alpha Radar…
          </span>
        </div>
      </div>
    </AgentMessage>
  );
}

function SummaryPresetChip({ preset }: { preset: Preset }) {
  return (
    <span className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]">
      <PresetChipAvatarStack preset={preset} />
      <span className="min-w-0 max-w-[160px] truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
        {preset.displayName}
      </span>
    </span>
  );
}

function SummaryKolChip({ kol }: { kol: Kol }) {
  return (
    <span className="flex h-[28px] max-w-full shrink-0 items-center gap-[8px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px]">
      <KolAvatar label={kol.avatar} size={18} />
      <span className="min-w-0 max-w-[160px] truncate font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
        {kol.name}
      </span>
    </span>
  );
}

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
    text: 'Golden cross (historically one of the more reliable signals) · RSI 52.2 · volume 1.3× the 20-day average.',
  },
] as const;

function SampleDigestPreview() {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
        Here&rsquo;s what tomorrow&rsquo;s digest will look like · sample
      </p>
      <div className="w-full overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.20)] bg-white">
        <div className="flex flex-col gap-[10px] p-[16px]">
          <div className="flex flex-wrap items-baseline gap-[8px]">
            <span className="font-['Delight',sans-serif] text-[16px] font-medium leading-[24px] tracking-[0.16px] text-[rgba(0,0,0,0.9)]">
              $MU
            </span>
            <span className="rounded-[4px] bg-[rgba(73,163,166,0.12)] px-[6px] py-[1px] font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[#2f7f82]">
              Bullish
            </span>
            <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] tracking-[0.13px] text-[rgba(0,0,0,0.55)]">
              $935.57 (-4.99%)
            </span>
          </div>
          <p className="font-['Delight',sans-serif] text-[13px] leading-[21px] tracking-[0.13px] text-[rgba(0,0,0,0.7)]">
            News, FinTwit, and Tech all lean bullish — the most complete setup in this run.
          </p>
          <div className="flex flex-col gap-[8px] border-t border-[rgba(0,0,0,0.10)] pt-[10px]">
            {SAMPLE_DIGEST_EVIDENCE.map(item => (
              <div key={item.id} className="flex items-start gap-[8px]">
                <span className="text-[14px] leading-[21px]">{item.emoji}</span>
                <p className="min-w-0 font-['Delight',sans-serif] text-[13px] leading-[21px] tracking-[0.13px] text-[rgba(0,0,0,0.8)]">
                  <span className="font-medium text-[rgba(0,0,0,0.9)]">
                    {item.source} ({item.stance})
                  </span>{' '}
                  — {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="border-t border-[rgba(0,0,0,0.10)] pt-[10px] font-['Delight',sans-serif] text-[11px] leading-[18px] tracking-[0.11px] text-[rgba(0,0,0,0.45)]">
            Technical-signal reliability is calibrated on a 3-year backtest and drives ranking — not a
            return promise. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompleteView({ onRestart, summary }: { onRestart: () => void; summary: DigestSummary | null }) {
  const sources = summary?.sources ?? [];
  const hasFintwit = sources.includes('fintwit');
  const fintwitCount =
    (summary?.presets.reduce((total, preset) => total + preset.handleCount, 0) ?? 0) + (summary?.kols.length ?? 0);

  return (
    <>
      <AgentMessage>
        <div className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)]">
          <p>Your Alpha Radar is live.</p>
          <p className="text-[rgba(0,0,0,0.55)]">
            First digest arrives tomorrow at {summary?.digestTime ?? '8:00 AM ET'} — you can adjust sources anytime.
          </p>
        </div>
      </AgentMessage>
      <AgentMessage>
        <div className="w-full overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.20)] bg-white">
          <div className="flex flex-col gap-[12px] p-[16px]">
            <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
              Watching · {sources.length} source{sources.length === 1 ? '' : 's'}
            </p>
            <div className="flex flex-wrap items-center gap-[6px]">
              {SOURCES.filter(source => sources.includes(source.id)).map(source => (
                <span
                  key={source.id}
                  className="flex h-[28px] max-w-full shrink-0 items-center gap-[6px] overflow-hidden rounded-[6px] bg-[rgba(0,0,0,0.04)] px-[8px] py-[4px] font-['Delight',sans-serif] text-[12px] font-normal leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]"
                >
                  <span>{source.emoji}</span>
                  <span>{source.title}</span>
                </span>
              ))}
            </div>
            {hasFintwit && fintwitCount > 0 && (
              <div className="flex flex-col gap-[6px] border-t border-[rgba(0,0,0,0.12)] pt-[12px]">
                <p className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
                  FinTwit · {fintwitCount} account{fintwitCount === 1 ? '' : 's'}
                </p>
                <div className="flex flex-wrap items-center gap-[6px]">
                  {summary?.presets.map(preset => (
                    <SummaryPresetChip key={preset.id} preset={preset} />
                  ))}
                  {summary?.kols.map(kol => (
                    <SummaryKolChip key={kol.id} kol={kol} />
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-[20px] border-t border-[rgba(0,0,0,0.12)] pt-[12px]">
              <div className="flex items-center gap-[8px]">
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
                  Daily alert time
                </span>
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
                  {summary?.digestTime ?? '8:00 AM ET'}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.5)]">
                  Language
                </span>
                <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)]">
                  {summary?.language ?? 'English'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="h-[32px] w-fit rounded-[6px] border border-[rgba(0,0,0,0.30)] px-[12px] font-['Delight',sans-serif] text-[12px] leading-[20px] tracking-[0.12px] text-[rgba(0,0,0,0.9)] transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            >
              Edit Alpha Radar setup
            </button>
          </div>
        </div>
      </AgentMessage>
      <AgentMessage>
        <SampleDigestPreview />
      </AgentMessage>
    </>
  );
}

function WatchRoute({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col px-[28px] pb-[28px] max-md:px-[16px] max-md:pb-[16px]">
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[8px] py-[28px]">
          <WatchOnboarding onStart={onStart} />
        </div>
      </div>
      <FakeComposer />
    </div>
  );
}

function InitRoute({
  view,
  digestSummary,
  onGenerate,
  onRestart,
}: {
  view: AgentView;
  digestSummary: DigestSummary | null;
  onGenerate: (summary: DigestSummary) => void;
  onRestart: () => void;
}) {
  return (
    <div className="h-full overflow-auto px-[16px] py-[28px] md:px-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-[28px]">
        {view === 'digest' && <AlphaRadarBuilder onGenerate={onGenerate} initialSummary={digestSummary} />}
        {view === 'generating' && <GeneratingView />}
        {view === 'complete' && <CompleteView onRestart={onRestart} summary={digestSummary} />}
      </div>
    </div>
  );
}

export default function Agent({ onNavigate, onOpenSearch }: Props) {
  const [view, setView] = useState<AgentView>('watch');
  const [digestSummary, setDigestSummary] = useState<DigestSummary | null>(null);

  useEffect(() => {
    if (view !== 'generating') return undefined;

    const timer = window.setTimeout(() => setView('complete'), 1800);
    return () => window.clearTimeout(timer);
  }, [view]);

  const title = view === 'watch' || view === 'complete' ? 'Alva' : 'Alpha Radar';

  return (
    <AppShell activePage="agent" onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div className="agent-demo-root flex h-full min-h-0 w-full flex-col bg-white">
        <AgentHeader title={title} hideControls={view !== 'watch' && view !== 'complete'} />
        <AgentTabs />
        <main className="min-h-0 flex-1 overflow-hidden">
          {view === 'watch' ? (
            <WatchRoute onStart={() => setView('digest')} />
          ) : (
            <InitRoute
              view={view}
              digestSummary={digestSummary}
              onGenerate={summary => {
                setDigestSummary(summary);
                setView('generating');
              }}
              onRestart={() => setView('digest')}
            />
          )}
        </main>
        <style>{`
          .agent-demo-root .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .agent-demo-loader {
            animation: agentDemoPulse 1s ease-in-out infinite;
          }

          @keyframes agentDemoPulse {
            0%, 100% { transform: scale(1); opacity: 0.92; }
            50% { transform: scale(0.94); opacity: 1; }
          }

          @media (max-width: 760px) {
            .agent-demo-root {
              position: fixed;
              inset: 0;
              z-index: 20;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .agent-demo-root *,
            .agent-demo-root *::before,
            .agent-demo-root *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </AppShell>
  );
}
