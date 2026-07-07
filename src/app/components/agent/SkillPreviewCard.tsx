/**
 * [INPUT]: Figma TestPushCard 组件集(7788:77185)+ Page/Agent/New session 卡片行(7887:111982)
 * [OUTPUT]: SkillPreviewCard — 选中 skill 后的预览卡:playbook 变体本组件渲染,推送类(普通/交易/KOL)委托 shared/AutomationCard
 * [POS]: AgentNewSession 卡片行使用;行内 3:3:1,推送类固定高 360.563
 */

import { Avatar } from '@/app/components/shared/Avatar';
import { AutomationCard, type PushCardData } from '@/app/components/shared/AutomationCard';

const FONT = "'Delight', sans-serif";

/* ========== 数据类型 ========== */

export interface TradeSignal { side: 'Buy' | 'Sell'; ticker: string; note: string; up: boolean }

export type SkillPreviewCardData =
  | { type: 'playbook'; title: string; cover: string; creator: string; creatorAvatar?: string; remixes: string; subs: string }
  | { type: 'push'; time: string; source: string; feed: string; title: string; bullets: string[] }
  | { type: 'trade'; time: string; source: string; feed: string; signals: TradeSignal[]; rebalance: string }
  | { type: 'kol'; time: string; source: string; feed: string; kolAvatar: string; quote: string; ticker: string; side: 'LONG' | 'SHORT'; analysis: string };

/* 订阅状态的稳定 key */
export function previewCardKey(c: SkillPreviewCardData): string {
  if (c.type === 'playbook') return c.title;
  if (c.type === 'push') return `${c.feed}|${c.title}`;
  if (c.type === 'trade') return `${c.feed}|${c.source}|trade`;
  return `${c.feed}|${c.source}|kol`;
}

/* 推送类卡 → shared/AutomationCard、FeedDetailModal 的 PushCardData(playbook 卡走页面跳转,返回 null) */
export function toPushCardData(c: SkillPreviewCardData): PushCardData | null {
  if (c.type === 'playbook') return null;
  const id = previewCardKey(c);
  if (c.type === 'push') {
    return { id, kind: 'normal', timestamp: c.time, source: c.source, feedName: c.feed, title: c.title, bullets: c.bullets };
  }
  if (c.type === 'trade') {
    return {
      id, kind: 'trade', timestamp: c.time, source: c.source, feedName: c.feed,
      rows: c.signals.map((s) => ({ ticker: s.ticker, action: s.side, detail: s.note, dir: s.up ? 'up' : 'down' as const })),
      note: c.rebalance,
    };
  }
  /* kol:引文形如 `$AMZN …`,首个 $token 作 headlineTicker */
  const m = c.quote.match(/^(\$\S+)\s+([\s\S]*)$/);
  return {
    id, kind: 'kol', timestamp: c.time, source: c.source, feedName: c.feed,
    kolName: c.source,
    kolAvatar: c.kolAvatar,
    headlineTicker: m ? m[1] : `$${c.ticker}`,
    headlineText: m ? m[2] : c.quote,
    quoteTicker: `$${c.ticker}`,
    quoteSide: c.side,
    analysis: c.analysis,
  };
}

/* ========== 布局常量 ========== */

const SHELL_STYLE: React.CSSProperties = {
  border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
  borderRadius: 'var(--radius-ct-l, 8px)',
};

/* 行内 3:3:1 — 卡等宽,第三张露出自身 1/3 提示横滚:c×(2+1/3)+gap×2 = 100% → c = (100%-32px)×3/7;窄容器下卡片不小于 320 */
const CARD_W = 'w-[calc((100%-32px)*3/7)] min-w-[320px]';

/* ========== 主组件 ========== */

export function SkillPreviewCard({ card, subscribed, onSubscribe, onRemix, onOpen }: {
  card: SkillPreviewCardData;
  subscribed: boolean;
  onSubscribe: () => void;
  onRemix?: () => void;
  /** 点卡片本体:playbook 去 playbook 页,推送类弹 FeedDetailModal */
  onOpen?: () => void;
}) {
  const base = import.meta.env.BASE_URL;

  if (card.type === 'playbook') {
    return (
      <div className={`flex h-[360.563px] ${CARD_W} shrink-0 cursor-pointer flex-col items-start overflow-hidden bg-white p-[4px] transition-shadow hover:shadow-l`} style={SHELL_STYLE} onClick={onOpen}>
        <div className="relative min-h-0 w-full flex-1 overflow-hidden" style={{ borderRadius: 'var(--radius-ct-s, 4px)' }}>
          {/* Figma Cover:取长图顶部段(对应导出里内层 h 352%) */}
          <img src={`${base}${card.cover}`} alt="" className="absolute inset-0 size-full" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </div>
        <div className="flex w-full shrink-0 flex-col gap-[12px] px-[12px] pb-[12px] pt-[16px]">
          <p className="h-[28px] w-full truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{card.title}</p>
          <div className="flex w-full items-center gap-[12px]">
            <div className="flex h-[20px] min-w-0 flex-1 items-center gap-[4px]">
              {card.creatorAvatar
                ? <img src={`${base}${card.creatorAvatar}`} alt="" className="size-[18px] shrink-0 rounded-full" />
                : <Avatar name={card.creator} size={18} />}
              <span className="min-w-0 truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{card.creator}</span>
            </div>
            <div className="flex shrink-0 items-center gap-[8px]">
              <button
                className="flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-[var(--radius-btn-s,4px)] bg-transparent px-[10px] py-[6px] transition-colors hover:bg-[var(--b-r02)]"
                style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
                onClick={(e) => { e.stopPropagation(); onRemix?.(); }}
              >
                <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Remix</span>
                <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(0,0,0,0.5)' }}>{card.remixes}</span>
              </button>
              {subscribed ? (
                <span className="flex h-[32px] items-center rounded-[var(--radius-btn-s,4px)] px-[10px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
                  <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)' }}>Subscribed</span>
                </span>
              ) : (
                <button
                  className="flex h-[32px] cursor-pointer items-center justify-center gap-[4px] rounded-[var(--radius-btn-s,4px)] border-none px-[10px] py-[6px] transition-opacity hover:opacity-90"
                  style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}
                  onClick={(e) => { e.stopPropagation(); onSubscribe(); }}
                >
                  <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white">Subscribe</span>
                  <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.subs}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* 推送类 — 渲染委托 shared/AutomationCard(NewChat 推荐区同款),外层只管 3:3:1 宽高与点击 */
  const push = toPushCardData(card);
  if (!push) return null;
  return (
    <div className={`h-[360.563px] ${CARD_W} shrink-0`} onClick={onOpen}>
      <AutomationCard a={push} on={subscribed} onToggleOn={() => { if (!subscribed) onSubscribe(); }} />
    </div>
  );
}
