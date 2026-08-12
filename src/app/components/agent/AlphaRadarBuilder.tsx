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

type AlphaPhase = 'preview' | 'setup' | 'generating' | 'complete';
export type AlphaRadarConversionOffer = 'pro-pass' | 'intro-price' | 'credits';
type DigestLanguage = 'English' | 'Chinese' | 'Japanese';
export type AlphaSourceId = 'people' | 'news' | 'podcasts' | 'earnings';

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
    id: 'people',
    emoji: '👥',
    title: 'People',
    description: 'Follow selected FinTwit accounts and key figures whose posts and actions can move markets.',
  },
  {
    id: 'news',
    emoji: '📰',
    title: 'News',
    description: 'Track breaking and market-moving news, mapped to the companies it may affect.',
  },
  {
    id: 'podcasts',
    emoji: '🎙️',
    title: 'Podcasts',
    description: 'Follow market and industry podcasts for emerging themes, expert views, and company insights.',
  },
  {
    id: 'earnings',
    emoji: '📊',
    title: 'Earnings Calls',
    description: 'Track earnings calls and company updates for guidance changes, risks, and inflection points.',
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

const PREVIEW_SOURCES: AlphaSource[] = SOURCES;

const PREVIEW_PRESETS: AlphaPreset[] = PRESETS.map((preset) =>
  preset.id === 'top50-leaderboard'
    ? {
        ...preset,
        displayName: 'Official FinTwit accounts',
        description: 'Curated accounts from the FinTwit Alpha League leaderboard.',
        handleCount: 100,
      }
    : preset,
);

const PREVIEW_ALERT_TIMES = ['20:00 GMT+8', ...ALERT_TIMES];

const SAMPLE_DIGEST_EVIDENCE = [
  {
    id: 'news',
    emoji: '📰',
    source: 'News',
    stance: 'Support',
    text: 'Bloomberg: Micron breaks ground on a $9B Japan fab expansion, reinforcing the AI memory-cycle thesis.',
  },
  {
    id: 'people',
    emoji: '👥',
    source: 'People',
    stance: 'Support',
    text: '@tradexwhisperer: long-term DRAM undersupply should keep memory pricing rising for roughly two more years.',
  },
  {
    id: 'earnings',
    emoji: '📊',
    source: 'Earnings',
    stance: 'Support',
    text: 'Management kept near-term supply additions disciplined while raising the long-term AI memory outlook.',
  },
] as const;

const HISTORICAL_RADAR_SIGNALS = [
  {
    ticker: '$DAL',
    logo: 'DL',
    sentiment: 'Bearish',
    published: 'May 14, 2026',
    priceChange: '$60.40 → $51.20',
    profitRate: '+15.2%',
    source: 'Top Traders Unplugged',
    sourceMeta: 'Market podcast',
    quote: 'Refined-product tightness is reaching airline margins before crude becomes the clean expression.',
    title: 'Energy stress surfaced first in diesel and natural gas',
    summary: 'Fuel-cost pressure made airlines the cleaner short while natural-gas producers gained positive beta.',
  },
  {
    ticker: '$NEAR',
    logo: 'N',
    sentiment: 'Bullish',
    published: 'Jun 2, 2026',
    priceChange: '$2.25 → $2.98',
    profitRate: '+32.4%',
    source: 'Bankless',
    sourceMeta: 'Crypto podcast',
    quote: 'Tokenized equities are competing for the underlying rails of brokerage trading.',
    title: 'Always-on brokerage rails became a tradeable theme',
    summary: 'Key figures and cross-chain infrastructure pointed to the same adoption path for tokenized securities.',
  },
  {
    ticker: '$IDN',
    logo: 'ID',
    sentiment: 'Bullish',
    published: 'Jun 21, 2026',
    priceChange: '$3.42 → $4.08',
    profitRate: '+19.3%',
    source: 'Federal budget briefing',
    sourceMeta: 'Government update',
    quote: 'Election protection is moving into funded county-level compliance workflows.',
    title: 'Election security moved from narrative to execution',
    summary: 'Verification at scale raised demand for identity systems and local-government workflow software.',
  },
] as const;

export const ALPHA_RADAR_STYLES = `
.alpha-radar-row { transition: background .12s ease; }
.alpha-radar-row:hover { background: rgba(0,0,0,0.03); }
.alpha-radar-source { transition: background .12s ease; }
.alpha-radar-source:hover { background: rgba(0,0,0,0.03); }
.alpha-radar-source[data-selected="true"] { background: rgba(73,163,166,0.1); }
.alpha-radar-primary { transition: filter .14s ease; }
.alpha-radar-primary:not(:disabled):hover { filter: brightness(0.95); }
.alpha-radar-loader { animation: alphaRadarPulse 1s ease-in-out infinite; }
.alpha-radar-fomo {
  position: relative;
  height: 480px;
  overflow: hidden;
  border: .5px solid rgba(0,0,0,.14);
  border-radius: 8px;
  background: #fff;
}
.alpha-radar-fomo__signal {
  padding: 10px 16px 16px;
  border-bottom: .5px solid rgba(0,0,0,.1);
}
.alpha-radar-fomo__signal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}
.alpha-radar-fomo__signal-title { min-width: 0; }
.alpha-radar-fomo__ticker-line { display: flex; align-items: center; gap: 6px; padding-top: 6px; }
.alpha-radar-fomo__ticker-logo { display: grid; width: 20px; height: 20px; place-items: center; border-radius: 50%; color: rgba(0,0,0,.66); background: rgba(0,0,0,.06); font-size: 8px; font-weight: 600; }
.alpha-radar-fomo__ticker-line strong { color: rgba(0,0,0,.9); font-size: 16px; line-height: 26px; font-weight: 500; }
.alpha-radar-fomo__direction { padding: 1px 6px; border-radius: 4px; color: #8e4e4e; background: rgba(169,83,83,.1); font-size: 9px; line-height: 16px; letter-spacing: .2px; }
.alpha-radar-fomo__direction.is-long { color: #36766e; background: rgba(73,163,166,.12); }
.alpha-radar-fomo__signal-title time { display: block; margin-top: 1px; color: rgba(0,0,0,.46); font-size: 10px; line-height: 18px; }
.alpha-radar-fomo__performance { flex: 0 0 auto; align-self: stretch; display: flex; flex-direction: column; justify-content: flex-end; text-align: right; }
.alpha-radar-fomo__performance > span { color: rgba(0,0,0,.46); font-size: 10px; line-height: 17px; }
.alpha-radar-fomo__performance p { margin: 0; display: flex; align-items: baseline; justify-content: flex-end; gap: 8px; }
.alpha-radar-fomo__performance p span { color: rgba(0,0,0,.66); font-size: 10px; line-height: 18px; }
.alpha-radar-fomo__performance p strong { color: #36766e; font-size: 18px; line-height: 25px; font-weight: 500; }
.alpha-radar-fomo__signal-body { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.35fr); gap: 16px; margin-top: 8px; }
.alpha-radar-fomo__evidence { min-width: 0; padding: 8px 10px; border-radius: 6px; background: rgba(0,0,0,.035); display: flex; gap: 8px; }
.alpha-radar-fomo__evidence::before { content: ''; width: 2px; flex: 0 0 auto; border-radius: 2px; background: #49a3a6; }
.alpha-radar-fomo__evidence p { min-width: 0; margin: 0; color: rgba(0,0,0,.84); font-size: 10px; line-height: 16px; }
.alpha-radar-fomo__evidence span { display: block; overflow: hidden; color: rgba(0,0,0,.45); text-overflow: ellipsis; white-space: nowrap; }
.alpha-radar-fomo__evidence q { display: -webkit-box; margin-top: 2px; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-size: 10px; line-height: 16px; font-weight: 500; }
.alpha-radar-fomo__thesis { min-width: 0; padding-top: 2px; }
.alpha-radar-fomo__thesis h3 { overflow: hidden; margin: 0; color: rgba(0,0,0,.88); font-size: 12px; line-height: 19px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.alpha-radar-fomo__thesis p { display: -webkit-box; margin: 2px 0 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: rgba(0,0,0,.72); font-size: 10px; line-height: 17px; }
.alpha-radar-fomo__lock {
  position: absolute;
  z-index: 2;
  inset: auto 0 0;
  height: 240px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px 16px 24px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.72) 44%, #fff 74%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.alpha-radar-fomo__unlock {
  width: min(540px, calc(100% - 32px));
  padding: 18px 16px;
  pointer-events: auto;
  border: .5px solid rgba(0,0,0,.16);
  border-radius: 8px;
  background: #fff;
  text-align: center;
}
.alpha-radar-fomo__sources { display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 7px; }
.alpha-radar-fomo__sources span { display: grid; width: 24px; height: 24px; place-items: center; border: .5px solid rgba(0,0,0,.08); border-radius: 50%; background: #fff; font-size: 12px; }
.alpha-radar-fomo__unlock strong { display: block; color: rgba(0,0,0,.88); font-size: 14px; line-height: 21px; font-weight: 500; }
.alpha-radar-fomo__unlock p { margin: 2px auto 10px; max-width: 430px; color: rgba(0,0,0,.48); font-size: 11px; line-height: 17px; }
.alpha-radar-fomo__unlock button { display: inline-flex; min-height: 36px; align-items: center; justify-content: center; gap: 7px; padding: 0 15px; border: 0; border-radius: 6px; color: #fff; background: #49a3a6; cursor: pointer; font-size: 12px; line-height: 20px; font-weight: 500; }
.alpha-radar-fomo__unlock button:hover { filter: brightness(.95); }
.alpha-radar-fomo__unlock button:focus-visible { outline: 2px solid rgba(73,163,166,.5); outline-offset: 2px; }
.alpha-pro-setup-footer {
  min-height: 58px;
  padding: 10px 13px;
  border-top: .5px solid rgba(73,163,166,.2);
  background:
    radial-gradient(circle at 7% 50%, rgba(255,255,255,.86) 0 22px, transparent 23px),
    linear-gradient(90deg, rgba(73,163,166,.13), rgba(73,163,166,.05) 58%, rgba(255,255,255,.92));
  display: grid;
  grid-template-columns: minmax(0,1fr) auto;
  align-items: center;
  gap: 14px;
}
.alpha-pro-setup-footer__access { min-width: 0; display: grid; grid-template-columns: 30px minmax(0,1fr); align-items: center; column-gap: 10px; }
.alpha-pro-setup-footer__icon { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; color: #fff; background: #49a3a6; box-shadow: 0 0 0 4px rgba(73,163,166,.1); }
.alpha-pro-setup-footer__copy { min-width: 0; display: flex; flex-direction: column; }
.alpha-pro-setup-footer__copy strong { overflow: hidden; color: rgba(0,0,0,.84); font-size: 13px; line-height: 20px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.alpha-pro-setup-footer__actions { display: flex; align-items: center; gap: 12px; }
.alpha-pro-setup-footer__meter { width: 54px; flex: 0 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }
.alpha-pro-setup-footer__meter span { height: 4px; border-radius: 99px; background: #49a3a6; }
.alpha-pro-setup-footer__meter span:nth-child(2) { opacity: .68; }
.alpha-pro-setup-footer__meter span:nth-child(3) { opacity: .36; }
.alpha-pro-setup-footer__cta { width: auto; display: inline-flex; align-items: center; justify-content: center; gap: 7px; }
.alpha-pro-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.alpha-access-row {
  min-height: 66px;
  padding: 11px 14px;
  border-top: .5px solid rgba(0,0,0,.1);
  background: rgba(73,163,166,.045);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.alpha-access-row__status {
  min-width: 0;
  display: grid;
  gap: 1px;
}
.alpha-access-row__status strong { color: rgba(0,0,0,.82); font-size: 12px; line-height: 18px; font-weight: 500; }
.alpha-access-row__status small { color: rgba(0,0,0,.46); font-size: 10px; line-height: 16px; }
.alpha-access-meter { width: 76px; flex: 0 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; }
.alpha-access-meter span { height: 4px; border-radius: 99px; background: rgba(0,0,0,.1); }
.alpha-access-meter span.is-active { background: #49a3a6; }
.alpha-pro-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(16,18,24,.46);
  backdrop-filter: blur(2px);
}
.alpha-pro-modal {
  width: min(460px, 100%);
  max-height: min(720px, calc(100vh - 40px));
  overflow-y: auto;
  border: .5px solid rgba(0,0,0,.16);
  border-radius: 12px;
  color: rgba(0,0,0,.9);
  background: #fff;
  box-shadow: 0 24px 80px rgba(16,18,24,.2);
}
.alpha-pro-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 20px 14px;
}
.alpha-pro-modal__header h2 { margin: 0; font-size: 18px; line-height: 26px; font-weight: 500; }
.alpha-pro-modal__header p { margin: 4px 0 0; color: rgba(0,0,0,.5); font-size: 12px; line-height: 19px; }
.alpha-pro-modal__close {
  display: grid;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  place-items: center;
  padding: 0;
  border: .5px solid rgba(0,0,0,.16);
  border-radius: 6px;
  color: rgba(0,0,0,.5);
  background: #fff;
  cursor: pointer;
}
.alpha-pro-continuity {
  display: grid;
  grid-template-columns: minmax(0,1fr) 74px minmax(0,1fr);
  align-items: center;
  margin: 0 20px 16px;
  padding: 12px;
  border: .5px solid rgba(73,163,166,.22);
  border-radius: 8px;
  background: rgba(73,163,166,.06);
}
.alpha-pro-continuity__stop { display: flex; min-width: 0; flex-direction: column; gap: 1px; }
.alpha-pro-continuity__stop:last-child { text-align: right; }
.alpha-pro-continuity__stop span { color: rgba(0,0,0,.4); font-size: 10px; line-height: 16px; text-transform: uppercase; letter-spacing: .4px; }
.alpha-pro-continuity__stop strong { overflow: hidden; color: rgba(0,0,0,.82); font-size: 12px; line-height: 19px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.alpha-pro-continuity__line { position: relative; height: 1px; background: rgba(73,163,166,.35); }
.alpha-pro-continuity__line::before,
.alpha-pro-continuity__line::after { content: ''; position: absolute; top: 50%; width: 6px; height: 6px; border-radius: 50%; background: #49a3a6; transform: translateY(-50%); }
.alpha-pro-continuity__line::before { left: 0; }
.alpha-pro-continuity__line::after { right: 0; background: #20212a; }
.alpha-pro-modal__body { padding: 0 20px 20px; }
.alpha-pro-plan-list { display: grid; gap: 8px; }
.alpha-pro-plan {
  display: grid;
  grid-template-columns: 18px minmax(0,1fr) auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 62px;
  padding: 10px 12px;
  border: .5px solid rgba(0,0,0,.16);
  border-radius: 8px;
  color: rgba(0,0,0,.9);
  background: #fff;
  cursor: pointer;
  text-align: left;
}
.alpha-pro-plan[data-selected="true"] { border-color: rgba(73,163,166,.62); background: rgba(73,163,166,.055); }
.alpha-pro-plan__radio { display: grid; width: 16px; height: 16px; place-items: center; border: 1px solid rgba(0,0,0,.28); border-radius: 50%; }
.alpha-pro-plan[data-selected="true"] .alpha-pro-plan__radio { border-color: #49a3a6; }
.alpha-pro-plan[data-selected="true"] .alpha-pro-plan__radio::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #49a3a6; }
.alpha-pro-plan__name { display: flex; min-width: 0; flex-direction: column; gap: 1px; }
.alpha-pro-plan__name strong { font-size: 13px; line-height: 20px; font-weight: 500; }
.alpha-pro-plan__name span { color: rgba(0,0,0,.46); font-size: 11px; line-height: 17px; }
.alpha-pro-plan__price { text-align: right; }
.alpha-pro-plan__price strong { display: block; font-size: 15px; line-height: 22px; font-weight: 500; }
.alpha-pro-plan__price span { color: rgba(0,0,0,.42); font-size: 10px; line-height: 16px; }
.alpha-pro-plan__save { margin-left: 4px; padding: 1px 5px; border-radius: 4px; color: #2f7f82; background: rgba(73,163,166,.1); font-size: 9px; line-height: 14px; }
.alpha-pro-modal__note { margin: 12px 0 0; color: rgba(0,0,0,.46); font-size: 11px; line-height: 18px; text-align: center; }
.alpha-pro-modal__actions { display: grid; grid-template-columns: auto minmax(0,1fr); gap: 8px; margin-top: 16px; }
.alpha-pro-modal__actions button { min-height: 38px; padding: 0 14px; border-radius: 6px; cursor: pointer; font-size: 13px; line-height: 20px; }
.alpha-pro-modal__secondary { border: .5px solid rgba(0,0,0,.2); color: rgba(0,0,0,.72); background: #fff; }
.alpha-pro-modal__primary { border: 0; color: #fff; background: #20212a; }
.alpha-pro-modal__primary:disabled { cursor: wait; opacity: .64; }
.alpha-pro-modal button:focus-visible { outline: 2px solid rgba(73,163,166,.5); outline-offset: 2px; }
.alpha-pro-modal-success { display: flex; flex-direction: column; align-items: center; padding: 30px 24px 24px; text-align: center; }
.alpha-pro-modal-success__mark { display: grid; width: 50px; height: 50px; place-items: center; margin-bottom: 14px; border-radius: 50%; color: #2f7f82; background: rgba(73,163,166,.12); }
.alpha-pro-modal-success h2 { margin: 0; font-size: 19px; line-height: 27px; font-weight: 500; }
.alpha-pro-modal-success p { max-width: 330px; margin: 6px 0 0; color: rgba(0,0,0,.52); font-size: 12px; line-height: 19px; }
.alpha-pro-modal-success__detail { width: 100%; margin: 18px 0; padding: 11px 12px; border-radius: 8px; color: rgba(0,0,0,.72); background: rgba(0,0,0,.035); font-size: 12px; line-height: 19px; }
.alpha-pro-modal-success button { width: 100%; min-height: 38px; border: 0; border-radius: 6px; color: #fff; background: #20212a; cursor: pointer; font-size: 13px; }
@keyframes alphaRadarPulse {
  0%, 100% { transform: scale(1); opacity: .92; }
  50% { transform: scale(.94); opacity: 1; }
}
@media (max-width: 640px) {
  .alpha-radar-fomo { height: 500px; }
  .alpha-radar-fomo__signal { padding-inline: 12px; }
  .alpha-radar-fomo__signal-body { grid-template-columns: 1fr; }
  .alpha-radar-fomo__thesis { display: none; }
  .alpha-radar-fomo__performance p span { display: none; }
  .alpha-radar-fomo__lock { height: 250px; padding-inline: 0; }
  .alpha-pro-setup-footer { grid-template-columns: 1fr; align-items: stretch; gap: 10px; }
  .alpha-pro-setup-footer__copy strong { overflow: visible; white-space: normal; }
  .alpha-pro-setup-footer__actions { justify-content: space-between; }
  .alpha-pro-setup-footer__meter { width: 68px; }
  .alpha-pro-setup-footer__cta { width: auto; }
  .alpha-access-row { align-items: flex-start; flex-direction: column; gap: 8px; }
  .alpha-pro-modal-backdrop { align-items: end; padding: 0; }
  .alpha-pro-modal { width: 100%; max-height: min(760px, 92vh); border-radius: 14px 14px 0 0; }
  .alpha-pro-continuity { grid-template-columns: minmax(0,1fr) 44px minmax(0,1fr); }
  .alpha-pro-modal__actions { grid-template-columns: 1fr; }
  .alpha-pro-modal__secondary { order: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .alpha-radar-loader { animation: none; }
}
`;

function AlphaRadarFomoPreview({
  onUnlock,
  offer,
}: {
  onUnlock: () => void;
  offer: AlphaRadarConversionOffer;
}) {
  return (
    <article className="alpha-radar-fomo" aria-label="Recent Alpha Radar highlights">
        {HISTORICAL_RADAR_SIGNALS.map((signal, index) => (
          <section key={signal.ticker} className="alpha-radar-fomo__signal" aria-hidden={index > 1}>
            <div className="alpha-radar-fomo__signal-head">
              <div className="alpha-radar-fomo__signal-title">
                <div className="alpha-radar-fomo__ticker-line">
                  <span className="alpha-radar-fomo__ticker-logo" aria-hidden="true">{signal.logo}</span>
                  <strong>{signal.ticker}</strong>
                  <span className={`alpha-radar-fomo__direction${signal.sentiment === 'Bullish' ? ' is-long' : ''}`}>{signal.sentiment}</span>
                </div>
                <time>Published <span>{signal.published}</span></time>
              </div>
              <div className="alpha-radar-fomo__performance" aria-label={`Maximum return ${signal.profitRate}`}>
                <span>Max return</span>
                <p><span>{signal.priceChange}</span><strong>{signal.profitRate}</strong></p>
              </div>
            </div>
            <div className="alpha-radar-fomo__signal-body">
              <div className="alpha-radar-fomo__evidence">
                <p><span>{signal.source} · {signal.sourceMeta}</span><q>{signal.quote}</q></p>
              </div>
              <div className="alpha-radar-fomo__thesis">
                <h3>{signal.title}</h3>
                <p>{signal.summary}</p>
              </div>
            </div>
          </section>
        ))}
        <div className="alpha-radar-fomo__lock">
          <div className="alpha-radar-fomo__unlock">
            <div className="alpha-radar-fomo__sources" aria-hidden="true"><span>𝕏</span><span>📰</span><span>🎙</span><span>📊</span></div>
            <strong>Build your Alpha Radar around what you follow</strong>
            <p>Choose the voices, podcasts, and market sources you want Alva to monitor every day.</p>
            <button type="button" onClick={onUnlock}>
              {offer === 'pro-pass' && <CdnIcon name="gift-l" size={14} color="currentColor" />}
              <span>{offer === 'pro-pass' ? 'Unlock with my 3-day Pro pass' : offer === 'intro-price' ? 'Unlock Alpha Radar · $1.99 first month' : 'Build my Alpha Radar'}</span>
            </button>
          </div>
        </div>
      </article>
  );
}

function tx(size: number, lineHeight: number, color: string, weight: 400 | 500 = 400): React.CSSProperties {
  return { fontFamily: FONT, fontSize: size, lineHeight: `${lineHeight}px`, letterSpacing: 0, color, fontWeight: weight };
}

function getFintwitSelection(
  presets: AlphaPreset[],
  selectedPresetIds: Set<string>,
  selectedKolsById: Map<string, AlphaKol>,
) {
  const selectedPresets = presets.filter((preset) => selectedPresetIds.has(preset.id));
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

function SourceToggleRow({
  source,
  selected,
  onToggle,
  compact = false,
}: {
  source: AlphaSource;
  selected: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      data-selected={selected}
      className={`alpha-radar-source flex w-full min-w-0 cursor-pointer border-none px-[16px] text-left${compact ? ' min-h-[62px] flex-row items-center gap-[10px] py-[12px]' : ' min-h-[92px] flex-col items-start gap-[8px] py-[14px]'}`}
    >
      <div className={`flex items-center justify-between gap-[8px]${compact ? '' : ' w-full'}`}>
        <span className="text-[18px] leading-none">{source.emoji}</span>
        {!compact && (selected ? <CheckBadge /> : <CdnIcon name="check-l1" size={16} color={N3} />)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p className="truncate" style={tx(14, 22, N9)}>
          {source.title}
        </p>
        {!compact && <p style={tx(12, 20, N5)}>{source.description}</p>}
      </div>
      {compact && (selected ? <CheckBadge /> : <CdnIcon name="check-l1" size={16} color={N3} />)}
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
  presets,
  selectedPresetIds,
  selectedKolsById,
  onClose,
  onCheckPreset,
  onSelectKol,
  onRemoveKol,
}: {
  open: boolean;
  presets: AlphaPreset[];
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

  const { selectedPresets, selectedKols, presetCoveredNames, count } = getFintwitSelection(
    presets,
    selectedPresetIds,
    selectedKolsById,
  );
  const query = searchQuery.trim().toLowerCase();
  const matchesQuery = (...fields: string[]) => query === '' || fields.some((field) => field.toLowerCase().includes(query));
  const availablePresets = presets.filter((preset) => !selectedPresetIds.has(preset.id) && matchesQuery(preset.displayName, preset.description));
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
            Choose people to follow
          </h2>
          <button
            type="button"
            aria-label="Close choose people"
            onClick={onClose}
            className="flex size-[32px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none bg-transparent hover:bg-[rgba(0,0,0,0.04)]"
          >
            <CdnIcon name="close-l1" size={16} color={N5} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] overflow-y-auto pb-[20px]">
          <p style={tx(14, 22, N7)}>
            Chosen · {count} account{count === 1 ? '' : 's'}
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
  preview,
  proTrial,
  conversionOffer,
}: {
  onGenerate: (summary: AlphaRadarSummary) => void;
  initialSummary: AlphaRadarSummary | null;
  preview: boolean;
  proTrial: boolean;
  conversionOffer?: AlphaRadarConversionOffer;
}) {
  const sources = preview ? PREVIEW_SOURCES : SOURCES;
  const presets = preview ? PREVIEW_PRESETS : PRESETS;
  const alertTimes = preview ? PREVIEW_ALERT_TIMES : ALERT_TIMES;
  const [selectedSources, setSelectedSources] = useState<Set<AlphaSourceId>>(
    () => new Set(initialSummary?.sources ?? ['people', 'news', 'podcasts', 'earnings']),
  );
  const [selectedPresetIds, setSelectedPresetIds] = useState<Set<string>>(
    () => new Set(initialSummary?.presets.map((preset) => preset.id) ?? (preview ? ['top50-leaderboard'] : [])),
  );
  const [selectedKolsById, setSelectedKolsById] = useState<Map<string, AlphaKol>>(
    () => new Map((initialSummary?.kols ?? []).map((kol) => [kol.id, kol])),
  );
  const [digestTime, setDigestTime] = useState(initialSummary?.digestTime ?? (preview ? '20:00 GMT+8' : '8:00 AM ET'));
  const [language, setLanguage] = useState<DigestLanguage>(initialSummary?.language ?? 'English');
  const [fintwitModalOpen, setFintwitModalOpen] = useState(false);

  const { selectedPresets, selectedKols, count: fintwitCount } = useMemo(
    () => getFintwitSelection(presets, selectedPresetIds, selectedKolsById),
    [presets, selectedPresetIds, selectedKolsById],
  );

  const isPeopleSelected = selectedSources.has('people');
  const canGenerate = selectedSources.size > 0 && (!isPeopleSelected || fintwitCount > 0);

  const toggleSource = (id: AlphaSourceId) => {
    const turningOn = !selectedSources.has(id);
    setSelectedSources((current) => {
      const next = new Set(current);
      if (turningOn) next.add(id);
      else next.delete(id);
      return next;
    });
    if (id === 'people' && turningOn && fintwitCount === 0) setFintwitModalOpen(true);
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

  const handleStart = () => {
    onGenerate({
      sources: [...selectedSources],
      presets: selectedPresets,
      kols: selectedKols,
      digestTime,
      language,
    });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-[8px] bg-white" style={{ border: `0.5px solid ${L2}` }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {sources.map((source, index) => (
            <div
              key={source.id}
              className={`flex min-w-0 flex-col border-b-[0.5px] border-[color:var(--line-l12,rgba(0,0,0,0.12))]${index % 2 === 0 ? ' md:border-r-[0.5px]' : ''}`}
            >
              <SourceToggleRow source={source} selected={selectedSources.has(source.id)} onToggle={() => toggleSource(source.id)} />
              {source.id === 'people' && isPeopleSelected && (
                <button
                  type="button"
                  onClick={() => setFintwitModalOpen(true)}
                  className="alpha-radar-row flex min-h-[44px] w-full min-w-0 cursor-pointer items-center justify-between gap-[8px] border-x-0 border-b-0 bg-transparent px-[16px] py-[10px] text-left"
                  style={{ borderTop: `0.5px solid ${L12}` }}
                >
                  {preview ? (
                    <span className="flex min-w-0 items-center gap-[8px]">
                      {selectedPresets[0] && <PresetAvatarStack preset={selectedPresets[0]} compact />}
                      <span className="min-w-0 truncate" style={tx(12, 20, N7)}>
                        {fintwitCount > 0 ? `Chosen ${fintwitCount} accounts` : 'Choose accounts'}
                      </span>
                    </span>
                  ) : (
                    <span className="min-w-0 truncate" style={tx(12, 20, N7)}>
                      {fintwitCount > 0 ? `${fintwitCount} accounts selected` : 'Choose accounts'}
                    </span>
                  )}
                  <CdnIcon name="arrow-right-l1" size={14} color={N3} />
                </button>
              )}
              {source.id === 'podcasts' && selectedSources.has('podcasts') && (
                <div className="alpha-radar-row flex min-h-[44px] w-full min-w-0 items-center justify-between gap-[8px] border-x-0 border-b-0 bg-transparent px-[16px] py-[10px] text-left" style={{ borderTop: `0.5px solid ${L12}` }}>
                  <span className="min-w-0 truncate" style={tx(12, 20, N7)}>Chosen 24 podcasts</span>
                  <CdnIcon name="arrow-right-l1" size={14} color={N3} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[12px] p-[16px]">
          <div className="flex flex-col gap-[12px] md:flex-row md:items-center md:gap-[20px]">
            <div className="grid min-w-0 grid-cols-2 gap-[12px] md:flex md:flex-1 md:flex-wrap md:items-center md:gap-[20px]">
              <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
                <span className="shrink-0 whitespace-nowrap" style={tx(12, 20, N7)}>Daily alert time</span>
                <MiniSelect label="Daily alert time" value={digestTime} options={alertTimes} onSelect={setDigestTime} />
              </div>
              <div className="flex min-w-0 shrink-0 flex-col items-start gap-[8px] md:flex-row md:items-center">
                <span className="shrink-0 whitespace-nowrap" style={tx(12, 20, N7)}>Language</span>
                <MiniSelect label="Digest language" value={language} options={LANGUAGES} onSelect={setLanguage} />
              </div>
            </div>
            {(!proTrial || conversionOffer === 'credits') && (
              <button
                type="button"
                disabled={!canGenerate}
                onClick={handleStart}
                className="alpha-radar-primary h-[36px] w-full shrink-0 cursor-pointer whitespace-nowrap rounded-[6px] border-none px-[20px] md:w-auto"
                style={{ ...tx(14, 22, canGenerate ? '#fff' : N2, 500), background: canGenerate ? TEAL : '#fff', border: canGenerate ? 'none' : `0.5px solid ${L3}` }}
              >
                Start my Alpha Radar
              </button>
            )}
          </div>
          {!canGenerate && (
            <p style={tx(12, 20, '#b4652e')}>
              {selectedSources.size === 0
                ? 'Select at least one source to continue.'
                : 'Choose at least one person to follow, or turn People off.'}
            </p>
          )}
        </div>
        {proTrial && conversionOffer !== 'credits' && (
          <div className="alpha-pro-setup-footer">
            <div className="alpha-pro-setup-footer__access" role="note">
              <span className="alpha-pro-setup-footer__icon">
                {conversionOffer === 'intro-price' ? '$' : <CdnIcon name="gift-l" size={14} color="currentColor" />}
              </span>
              <span className="alpha-pro-setup-footer__copy">
                <strong>{conversionOffer === 'intro-price' ? '$1.99 today · then $19.90/month from Sep 13' : 'Your Pro pass starts when Alpha Radar goes live'}</strong>
              </span>
            </div>
            <div className="alpha-pro-setup-footer__actions">
              {conversionOffer === 'pro-pass' && (
                <span className="alpha-pro-setup-footer__meter" role="img" aria-label="Three days of Pro pass access">
                  <span /><span /><span />
                </span>
              )}
              <button
                type="button"
                disabled={!canGenerate}
                onClick={handleStart}
                className="alpha-pro-setup-footer__cta alpha-radar-primary h-[36px] w-full shrink-0 cursor-pointer whitespace-nowrap rounded-[6px] border-none px-[18px] md:w-auto"
                style={{ ...tx(14, 22, canGenerate ? '#fff' : N2, 500), background: canGenerate ? TEAL : '#fff', border: canGenerate ? 'none' : `0.5px solid ${L3}` }}
              >
                <span>{conversionOffer === 'intro-price' ? 'Pay $1.99 & start' : 'Start Alpha Radar'}</span>
                <CdnIcon name="arrow-right-l1" size={14} color="currentColor" />
              </button>
            </div>
          </div>
        )}
      </div>

      <FintwitAccountsModal
        open={fintwitModalOpen}
        presets={presets}
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

function GeneratingView({ conversionOffer }: { conversionOffer?: AlphaRadarConversionOffer }) {
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
        {conversionOffer === 'intro-price' ? 'Confirming payment and starting Alpha Radar...' : 'Setting up your Alpha Radar...'}
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
            News, people, podcasts, and the latest earnings call all lean bullish - the strongest setup in this run.
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
            Signals are research inputs, not a return promise. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompleteView({
  summary,
  onEdit,
  preview,
  proTrial,
  conversionOffer,
}: {
  summary: AlphaRadarSummary;
  onEdit: () => void;
  preview: boolean;
  proTrial: boolean;
  conversionOffer?: AlphaRadarConversionOffer;
}) {
  const hasFintwit = summary.sources.includes('people');
  const fintwitCount = summary.presets.reduce((total, preset) => total + preset.handleCount, 0) + summary.kols.length;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-col gap-[2px]">
        <p style={tx(14, 22, N9)}>Your Alpha Radar is live.</p>
        <p style={tx(14, 22, N5)}>First report arrives tomorrow at {summary.digestTime}. You can adjust sources anytime.</p>
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
              <p style={tx(12, 20, N5)}>People · {fintwitCount} account{fintwitCount === 1 ? '' : 's'}</p>
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
          <div className="alpha-pro-actions">
            <button
              type="button"
              onClick={onEdit}
              className="h-[32px] w-fit cursor-pointer rounded-[6px] bg-white px-[12px]"
              style={{ ...tx(12, 20, N9), border: `0.5px solid ${L3}` }}
            >
              Edit setup
            </button>
          </div>
        </div>
        {proTrial && (
          <div className="alpha-access-row">
            <div className="alpha-access-row__status">
              <strong>{conversionOffer === 'intro-price' ? 'Alpha Radar active · $1.99 paid' : conversionOffer === 'credits' ? 'Pro trial active · 3,000 Daily Credits' : 'Pro pass active · 3 days left'}</strong>
              <small>{conversionOffer === 'intro-price' ? 'Renews Sep 13 at $19.90/month · Cancel anytime' : conversionOffer === 'credits' ? 'Build used 184 · 2,816 left today · Drops to 500/day after your trial' : 'Ends Aug 16 at 8:00 PM · Alpha Radar pauses after your final report'}</small>
            </div>
            {conversionOffer === 'pro-pass' && (
              <span className="alpha-access-meter" role="img" aria-label="All three days of Pro pass access remaining"><span className="is-active" /><span className="is-active" /><span className="is-active" /></span>
            )}
          </div>
        )}
      </div>
      {!preview && <SampleDigestPreview />}
    </div>
  );
}

export function AlphaRadarBuilder({
  onLive,
  preview = false,
  proTrial = false,
  conversionOffer,
}: {
  onLive?: (summary: AlphaRadarSummary) => void;
  preview?: boolean;
  proTrial?: boolean;
  conversionOffer?: AlphaRadarConversionOffer;
}) {
  const activeOffer = conversionOffer ?? (proTrial ? 'pro-pass' : undefined);
  const hasConversionOffer = Boolean(activeOffer);
  const [phase, setPhase] = useState<AlphaPhase>(() => hasConversionOffer ? 'preview' : 'setup');
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
      <style>{ALPHA_RADAR_STYLES}</style>
      {phase === 'preview' && activeOffer && <AlphaRadarFomoPreview offer={activeOffer} onUnlock={() => setPhase('setup')} />}
      {phase === 'setup' && (
        <div className="flex flex-col gap-[12px]">
          <div style={tx(14, 22, N9)}>
            {hasConversionOffer ? (
              <>
                <p>Set up your Alpha Radar.</p>
                <p style={{ color: N5 }}>Choose the people and sources you want Alva to monitor each day.</p>
              </>
            ) : preview ? (
              <>
                <p>Build your Alpha Radar.</p>
                <p>Pick the people, news, podcasts, and earnings calls you want Alva to watch.</p>
              </>
            ) : (
              <>
                <p>Build your personal Alpha Radar.</p>
                <p>Pick the people, news, podcasts, and earnings calls you want Alva to track. Alva watches them and sends you a daily digest automatically.</p>
              </>
            )}
          </div>
          {!preview && (
            <div style={tx(14, 22, N9)}>
              <p>Choose the sources you want Alva to watch.</p>
              <p style={{ color: N5 }}>Pick one or more. You can change sources anytime.</p>
            </div>
          )}
          <AlphaRadarPanel
            onGenerate={handleGenerate}
            initialSummary={summary}
            preview={preview}
            proTrial={hasConversionOffer}
            conversionOffer={activeOffer}
          />
        </div>
      )}
      {phase === 'generating' && <GeneratingView conversionOffer={activeOffer} />}
      {phase === 'complete' && summary && (
        <CompleteView
          summary={summary}
          onEdit={() => setPhase('setup')}
          preview={preview}
          proTrial={hasConversionOffer}
          conversionOffer={activeOffer}
        />
      )}
    </>
  );
}
