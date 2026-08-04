/**
 * [INPUT]: Figma Draft-Lite Chat/Block-Answer (4605:13564)
 * [OUTPUT]: Outcome-first screener chooser rendered inside the Alva chat flow
 * [POS]: AgentNewSession screener response
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Dropdown } from '@/app/components/shared/Dropdown';
import { TickerLogo } from '@/app/components/shared/TickerLogo';

const FONT = "'Delight', sans-serif";
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const L12 = 'var(--line-l12, rgba(0,0,0,0.12))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';
const M1 = 'var(--main-m1, #49a3a6)';
const M3 = 'var(--main-m3, #2a9b7d)';

export type ScreenKey = 'congress' | 'options' | 'shorted' | 'breakouts' | 'divergence';

interface ScreenOption {
  key: ScreenKey;
  prompt: string;
  columns: [string, string, string, string, string];
}

interface PreviewRow {
  name: string;
  detail: string;
  portrait: string;
  partyColor?: string;
  ticker: string;
  signal: string;
  value: string;
  rangeDots: number;
  updated: string;
}

const SCREEN_OPTIONS: ScreenOption[] = [
  {
    key: 'congress',
    prompt: 'Track what members of Congress just bought — weekdays 9:00 AM ET',
    columns: ['Member', 'Ticker', 'Type', 'Amount', 'Filed after'],
  },
  {
    key: 'options',
    prompt: "See today's biggest unusual options bets — weekdays at 5:15 PM ET",
    columns: ['Contract', 'Ticker', 'Type', 'Premium', 'Detected'],
  },
  {
    key: 'shorted',
    prompt: "Track the market's most heavily shorted stocks — when new short data lands",
    columns: ['Company', 'Ticker', 'Signal', 'Short float', 'Updated'],
  },
  {
    key: 'breakouts',
    prompt: 'Find breakouts to one-month highs on double the usual volume — weekdays 4:30 PM ET',
    columns: ['Company', 'Ticker', 'Signal', 'Volume', 'Triggered'],
  },
  {
    key: 'divergence',
    prompt: 'Spot stocks where price and momentum are starting to disagree — every weekday at 4:40 PM ET',
    columns: ['Company', 'Ticker', 'Signal', 'Momentum', 'Detected'],
  },
];

const PREVIEW_ROWS: Record<ScreenKey, [PreviewRow, PreviewRow, PreviewRow, PreviewRow]> = {
  congress: [
    { name: 'Sheldon Whitehouse', detail: 'D · Senate · RI', portrait: 'screener-sheldon-whitehouse.jpg', partyColor: '#c25450', ticker: 'NVDA', signal: 'BUY', value: '$1K–15K', rangeDots: 1, updated: '4 days' },
    { name: 'Pete Sessions', detail: 'R · House · TX-17', portrait: 'screener-pete-sessions.jpg', partyColor: '#c25450', ticker: 'ORCL', signal: 'BUY', value: '$1K–15K', rangeDots: 1, updated: '4 days' },
    { name: 'Young Kim', detail: 'R · House · CA-40', portrait: 'screener-blurred-member-1.jpg', partyColor: '#c25450', ticker: 'AVGO', signal: 'BUY', value: '$15K–50K', rangeDots: 2, updated: '2 days' },
    { name: 'Adrian Smith', detail: 'R · House · NE-3', portrait: 'screener-blurred-member-2.jpg', partyColor: '#c25450', ticker: 'RKLB', signal: 'BUY', value: '$15K–50K', rangeDots: 2, updated: '1 day' },
  ],
  options: [
    { name: 'NVDA $190 Call', detail: 'Aug 15 expiry', portrait: 'screener-sheldon-whitehouse.jpg', ticker: 'NVDA', signal: 'CALL', value: '$4.2M', rangeDots: 4, updated: '12 min' },
    { name: 'TSLA $300 Put', detail: 'Sep 19 expiry', portrait: 'screener-pete-sessions.jpg', ticker: 'TSLA', signal: 'PUT', value: '$2.8M', rangeDots: 3, updated: '26 min' },
    { name: 'AAPL $250 Call', detail: 'Aug 8 expiry', portrait: 'screener-blurred-member-1.jpg', ticker: 'AAPL', signal: 'CALL', value: '$1.9M', rangeDots: 2, updated: '31 min' },
    { name: 'PLTR $45 Call', detail: 'Aug 15 expiry', portrait: 'screener-blurred-member-2.jpg', ticker: 'PLTR', signal: 'CALL', value: '$1.4M', rangeDots: 2, updated: '44 min' },
  ],
  shorted: [
    { name: 'Carvana', detail: 'Consumer cyclical', portrait: 'screener-sheldon-whitehouse.jpg', ticker: 'CVNA', signal: 'HIGH', value: '34.2%', rangeDots: 4, updated: 'today' },
    { name: 'Beyond Meat', detail: 'Consumer defensive', portrait: 'screener-pete-sessions.jpg', ticker: 'BYND', signal: 'HIGH', value: '41.8%', rangeDots: 4, updated: 'today' },
    { name: 'Sirius XM', detail: 'Communication', portrait: 'screener-blurred-member-1.jpg', ticker: 'SIRI', signal: 'HIGH', value: '28.6%', rangeDots: 3, updated: 'today' },
    { name: 'Plug Power', detail: 'Industrials', portrait: 'screener-blurred-member-2.jpg', ticker: 'PLUG', signal: 'HIGH', value: '26.9%', rangeDots: 3, updated: 'today' },
  ],
  breakouts: [
    { name: 'Rocket Lab', detail: 'Aerospace & defense', portrait: 'screener-sheldon-whitehouse.jpg', ticker: 'RKLB', signal: 'HIGH', value: '2.8×', rangeDots: 4, updated: '18 min' },
    { name: 'Palantir', detail: 'Software', portrait: 'screener-pete-sessions.jpg', ticker: 'PLTR', signal: 'HIGH', value: '2.3×', rangeDots: 3, updated: '31 min' },
    { name: 'AppLovin', detail: 'Software', portrait: 'screener-blurred-member-1.jpg', ticker: 'APP', signal: 'HIGH', value: '2.2×', rangeDots: 3, updated: '43 min' },
    { name: 'Robinhood', detail: 'Financial services', portrait: 'screener-blurred-member-2.jpg', ticker: 'HOOD', signal: 'HIGH', value: '2.1×', rangeDots: 3, updated: '52 min' },
  ],
  divergence: [
    { name: 'Tesla', detail: 'Consumer cyclical', portrait: 'screener-sheldon-whitehouse.jpg', ticker: 'TSLA', signal: 'BEAR', value: 'RSI 61', rangeDots: 3, updated: '9 min' },
    { name: 'NVIDIA', detail: 'Semiconductors', portrait: 'screener-pete-sessions.jpg', ticker: 'NVDA', signal: 'BEAR', value: 'RSI 67', rangeDots: 3, updated: '22 min' },
    { name: 'Coinbase', detail: 'Financial services', portrait: 'screener-blurred-member-1.jpg', ticker: 'COIN', signal: 'BULL', value: 'RSI 39', rangeDots: 2, updated: '36 min' },
    { name: 'Advanced Micro Devices', detail: 'Semiconductors', portrait: 'screener-blurred-member-2.jpg', ticker: 'AMD', signal: 'BULL', value: 'RSI 42', rangeDots: 2, updated: '47 min' },
  ],
};

function textStyle(size: number, lineHeight: number, color: string, weight = 400) {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lineHeight}px`, letterSpacing: `${size / 100}px`, color, fontWeight: weight } as const;
}

function ResultRow({ row }: { row: PreviewRow }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="grid min-h-[52px] grid-cols-[280px_minmax(112px,1fr)_100px_minmax(120px,1fr)_minmax(110px,1fr)] items-center px-[16px] py-[8px]" style={{ borderTop: `0.5px solid ${L12}` }}>
      <div className="flex min-w-0 items-center gap-[8px] overflow-hidden">
        <img
          src={`${base}${row.portrait}`}
          alt=""
          className="size-[30px] shrink-0 rounded-full object-cover"
          style={{ border: `1.5px solid ${row.partyColor ?? L12}` }}
        />
        <div className="min-w-0">
          <p className="truncate" style={textStyle(14, 22, N9, 500)}>{row.name}</p>
          <p className="truncate" style={textStyle(10, 16, N5)}>{row.detail}</p>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-[6px] overflow-hidden">
        <TickerLogo ticker={row.ticker} size={22} />
        <span className="truncate" style={textStyle(14, 22, N9)}>{row.ticker}</span>
      </div>
      <div>
        <span className="inline-flex rounded-[4px] px-[6px] py-px text-white" style={{ ...textStyle(12, 20, '#fff'), background: M3 }}>{row.signal}</span>
      </div>
      <div className="flex items-center justify-end gap-[6px]">
        <span className="whitespace-nowrap" style={textStyle(14, 22, N9)}>{row.value}</span>
        <span className="flex w-[30px] items-center gap-[2px]">
          {[0, 1, 2, 3].map((index) => <span key={index} className="size-[6px] rounded-full" style={{ background: index < row.rangeDots ? M1 : L12 }} />)}
        </span>
      </div>
      <span className="text-right" style={textStyle(14, 22, N9)}>{row.updated}</span>
    </div>
  );
}

export function ScreenerSetupCard({ onRun }: { onRun: (key: ScreenKey) => void }) {
  const [selected, setSelected] = useState<ScreenKey>('congress');
  const [language, setLanguage] = useState('en');
  const screen = SCREEN_OPTIONS.find((option) => option.key === selected) ?? SCREEN_OPTIONS[0];
  const rows = PREVIEW_ROWS[selected];
  const languageLabel = language === 'zh' ? '简体中文' : 'English';

  return (
    <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="relative overflow-hidden px-[32px] pt-[32px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--main-m1,#49a3a6)] opacity-40">
              <img
                src={`${import.meta.env.BASE_URL}screener-ascii-pattern.png`}
                alt=""
                className="absolute left-1/2 top-1/2 h-auto w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-lighten"
              />
            </div>

            <div className="relative overflow-hidden rounded-t-[8px] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.12)]" style={{ borderTop: `0.5px solid ${L2}`, borderLeft: `0.5px solid ${L2}`, borderRight: `0.5px solid ${L2}` }}>
              <div className="grid grid-cols-[280px_minmax(112px,1fr)_100px_minmax(120px,1fr)_minmax(110px,1fr)] px-[16px] py-[8px]">
                {screen.columns.map((column, index) => (
                  <span key={column} className={index >= 3 ? 'text-right' : ''} style={textStyle(12, 20, N7)}>{column}</span>
                ))}
              </div>

              {rows.slice(0, 2).map((row) => <ResultRow key={`${selected}-${row.name}`} row={row} />)}

              <div className="relative h-[104px] overflow-hidden" style={{ borderTop: `0.5px solid ${L12}` }}>
                <div aria-hidden="true">
                  {rows.slice(2).map((row) => <ResultRow key={`${selected}-${row.name}`} row={row} />)}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4px] bg-[rgba(255,255,255,0.85)] backdrop-blur-[3px]">
                  <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--b0-sidebar,#2a2a38)]">
                    <CdnIcon name="locked-l" size={18} color="#fff" />
                  </span>
                  <span style={textStyle(12, 20, N5)}>8 more — Run to reveal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-white px-[16px] py-[12px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            <p style={textStyle(14, 22, N9, 500)}>Pick a screen — the list above follows your pick</p>
          </div>

          {SCREEN_OPTIONS.map((option) => {
            const active = selected === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelected(option.key)}
                className="flex w-full cursor-pointer items-center gap-[12px] px-[16px] py-[12px] text-left transition-colors"
                style={{ background: active ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : '#fff', border: 'none', borderTop: `0.5px solid ${L12}` }}
              >
                <span className="min-w-0 flex-1 truncate" style={textStyle(14, 22, N9)}>{option.prompt}</span>
                <span
                  aria-hidden="true"
                  className="size-[16px] shrink-0 rounded-full"
                  style={active ? { border: `5px solid ${M1}`, background: '#fff' } : { background: 'var(--grey-g1, #dedede)' }}
                />
              </button>
            );
          })}

          <div className="flex items-center gap-[20px] px-[16px] py-[16px]" style={{ borderTop: `0.5px solid ${L12}` }}>
            <div className="flex min-w-0 flex-1 items-center gap-[8px]">
              <span className="shrink-0" style={textStyle(12, 20, N7)}>Language</span>
              <Dropdown
                items={[
                  { id: 'en', label: 'English' },
                  { id: 'zh', label: '简体中文' },
                ]}
                activeId={language}
                onSelect={setLanguage}
                width={116}
                openUp
                trigger={(
                  <button
                    type="button"
                    aria-label="Screener language"
                    aria-haspopup="listbox"
                    className="flex h-[28px] w-[116px] items-center gap-[4px] rounded-[4px] bg-white px-[8px] py-[4px] text-left"
                    style={{ border: `0.5px solid ${L3}` }}
                  >
                    <span className="min-w-0 flex-1 truncate" style={textStyle(12, 20, N9)}>{languageLabel}</span>
                    <CdnIcon name="arrow-down-f2" size={12} color={N3} />
                  </button>
                )}
              />
            </div>
            <button
              type="button"
              onClick={() => onRun(selected)}
              className="flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none px-[20px] py-[9px] text-white transition-opacity hover:opacity-90"
              style={{ ...textStyle(14, 22, '#fff', 500), background: M1 }}
            >
              Run to reveal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
