/**
 * [INPUT]: Figma Paid Card · G Scoreboard(4723:723, Sheer's Draft)
 * [OUTPUT]: Space Investor 付费 playbook 记分卡 — 战绩头(头像 + 7 of 8) + 逐 call 对比行(dumbbell 图) + 锁定遮罩 + 订阅 CTA
 * [POS]: AgentNewSession 在 channel.id === SPACE_CHANNEL_ID 时的 onboard 开场消息内渲染
 */

import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* ========== 稿定几何(4735:734) ==========
 * 列:meta 72 + quote 296 + chart 320 + result 余量(稿 150),gap 16,卡 px 24
 * chart 列 x 原点 = 24+72+16+296+16 = 424;0% 竖线在列内 x=25,比例 ≈5.02px/1%
 */
const CHART_X0 = 25;
const PX_PER_PCT = 5.02;
const ZERO_LINE_LEFT = 424 + CHART_X0;
const ARKX_PCT = 8.3; // ARKX 同窗收益 — 每行 dumbbell 的空心锚点

interface ScoreCall {
  symbol: string;
  date: string;
  quote: string;
  /** null = 进行中,不画 dumbbell(稿 KRMN 行 chart 位留空) */
  hisPct: number | null;
  ret: string;
  pt: string;
  /** 小号 pt 标注(稿 4767:3033 该行独用 10/16) */
  smallPt?: boolean;
}

const CALLS: ScoreCall[] = [
  {
    symbol: 'VOYG',
    date: 'Jul 20',
    quote: '“Voyager Technologies was awarded a new mission management contract with Sandia National Laboratories to fly their Big Boy demonstration.”',
    hisPct: 53.5,
    ret: '+53.5%',
    pt: '+45.2 pt',
  },
  {
    symbol: 'RDW',
    date: 'Jul 20',
    quote: '“Today, Redwire celebrates the grand opening of their Space Research and Manufacturing Facility in Georgetown, Indiana.”',
    hisPct: 37.6,
    ret: '+37.6%',
    pt: '+29.3 pt',
  },
  {
    symbol: 'KRMN',
    date: '5h ago',
    quote: '“Karman delivered a clean beat-and-raise print. Bookings hit nearly $500M, roughly 2.7× quarterly revenue.”',
    hisPct: null,
    ret: '+37.6%',
    pt: '+29.3 pt',
    smallPt: true,
  },
];

/* dumbbell — 稿 chart svg(320×22):l3 连线 + ARKX 空心锚(白底知孔 r5.5 + r5 l3 描边) + his 实心 m3 r6.5 */
function CallBar({ hisPct }: { hisPct: number }) {
  const x = (p: number) => CHART_X0 + p * PX_PER_PCT;
  const xa = x(ARKX_PCT);
  const xh = x(hisPct);
  return (
    <svg width={320} height={22} viewBox="0 0 320 22" fill="none" className="shrink-0" aria-hidden>
      <line x1={Math.min(xa, xh)} y1="10.5" x2={Math.max(xa, xh)} y2="10.5" stroke="var(--line-l3, rgba(0,0,0,0.3))" />
      <circle cx={xa} cy="11" r="5.5" fill="var(--b0-container, #ffffff)" />
      <circle cx={xa} cy="11" r="5" stroke="var(--line-l3, rgba(0,0,0,0.3))" />
      <circle cx={xh} cy="11" r="6.5" fill="var(--main-m3, #2a9b7d)" />
    </svg>
  );
}

export function SpaceInvestorScoreboardCard() {
  const n5 = 'var(--text-n5, rgba(0,0,0,0.5))';
  const n7 = 'var(--text-n7, rgba(0,0,0,0.7))';
  const n9 = 'var(--text-n9, rgba(0,0,0,0.9))';
  const rowBorder = { borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' } as const;
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[8px]"
      style={{ fontFamily: FONT, background: 'var(--b0-container, #ffffff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      {/* Header — 头像 48×49 + 名片行 + 右侧战绩(4723:724) */}
      <div className="flex w-full items-center gap-[14px] px-[24px] py-[16px]">
        <img src={`${BASE}avatar-space-investor.png`} alt="Space Investor" width={48} height={49} className="shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <p className="text-[20px] leading-[30px] tracking-[0.2px]" style={{ color: n9 }}>Space Investor</p>
          <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: n5 }}>@SpaceInvestor_D · 48.2K followers · every post decoded</p>
        </div>
        <div className="flex shrink-0 flex-col items-end whitespace-nowrap">
          <p className="text-[20px] leading-[30px] tracking-[0.2px]" style={{ color: 'var(--main-m3, #2a9b7d)' }}>7 of 8</p>
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: n5 }}>beat ARKX</p>
        </div>
      </div>

      {/* Scoreboard — 轴行 + call 行;0% 竖线与锁定遮罩绝对定位在本容器内(4723:732) */}
      <div className="relative flex w-full flex-col" style={rowBorder}>
        {/* Axis — 图例对齐 quote 列,刻度对齐 chart 列(4735:734) */}
        <div className="flex w-full items-start gap-[16px] px-[24px] py-[8px]">
          <div className="w-[72px] shrink-0" />
          <div className="flex w-[296px] shrink-0 items-center gap-[6px]">
            <span className="size-[10px] shrink-0 rounded-full" style={{ background: 'var(--main-m3, #2a9b7d)' }} />
            <span className="text-[10px] leading-[16px] tracking-[0.1px]" style={{ color: n5 }}>his call</span>
            <span className="w-[12px] shrink-0" />
            <span className="box-border size-[10px] shrink-0 rounded-full" style={{ background: 'var(--b0-container, #ffffff)', border: '1px solid var(--line-l3, rgba(0,0,0,0.3))' }} />
            <span className="text-[10px] leading-[16px] tracking-[0.1px]" style={{ color: n5 }}>ARKX, same window</span>
          </div>
          <div className="relative h-[16px] w-[320px] shrink-0 text-[10px] leading-[16px] tracking-[0.1px]" style={{ color: n5 }}>
            <span className="absolute left-[21.9px] top-0">0</span>
            <span className="absolute left-[112.98px] top-0">+20%</span>
            <span className="absolute left-[214.57px] top-0">+40%</span>
          </div>
        </div>

        {CALLS.map((c) => (
          <div key={c.symbol} className="flex w-full items-center gap-[16px] px-[24px] py-[16px]" style={rowBorder}>
            <div className="flex w-[72px] shrink-0 flex-col">
              <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: n9 }}>{c.symbol}</p>
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: n5 }}>{c.date}</p>
            </div>
            <p className="w-[296px] shrink-0 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: n7 }}>{c.quote}</p>
            {c.hisPct !== null ? <CallBar hisPct={c.hisPct} /> : <div className="h-[22px] w-[320px] shrink-0" />}
            <div className="flex min-w-0 flex-1 flex-col text-right">
              <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--main-m3, #2a9b7d)' }}>{c.ret}</p>
              <p className={c.smallPt ? 'text-[10px] leading-[16px] tracking-[0.1px]' : 'text-[12px] leading-[20px] tracking-[0.12px]'} style={{ color: n5 }}>{c.pt}</p>
            </div>
          </div>
        ))}

        {/* 0% 竖线 — 稿 zero baseline(4735:800),纯 CSS 竖线,从轴行 31.5 通到底 */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 w-0" style={{ left: ZERO_LINE_LEFT, top: 31.5, borderLeft: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }} />

        {/* 锁定遮罩 — 盖末行 quote 起(meta 可见),毛玻璃 + 白圆锁(4767:3022,同 ScreenerSetupCard 锁样式) */}
        <div className="absolute bottom-[1px] left-[112px] right-0 flex h-[90px] items-center justify-end gap-[8px] bg-[rgba(255,255,255,0.85)] px-[20px] backdrop-blur-[3px]">
          <span className="whitespace-nowrap text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: n5 }}>5 more — see how it lands ↓</span>
          <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-white" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
            <CdnIcon name="locked-l" size={18} color={n9} />
          </span>
        </div>
      </div>

      {/* Footer — 解锁文案 + Subscribe CTA(4724:782) */}
      <div className="flex w-full items-center gap-[16px] px-[24px] py-[16px]" style={rowBorder}>
        <p className="min-w-0 flex-1 text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: n7 }}>
          Unlock every call and the reasoning behind it — 18 days in one sector proves nothing about the next.
        </p>
        <button type="button" className="btn btn-primary btn-medium shrink-0">Subscribe for $50/mo</button>
      </div>
    </div>
  );
}
