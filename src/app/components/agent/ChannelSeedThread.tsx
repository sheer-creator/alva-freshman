/**
 * [INPUT]: Figma Page/Agent/Chat(10998:50677)— alva-to-the-moon 频道的预置对话（digest 推送 + playbook 构建任务卡）
 * [OUTPUT]: 演示频道聊天区的静态历史消息流；用户继续发消息由 AgentNewSession 的 extra 流接在其后
 * [POS]: AgentNewSession chat tab 在 channel.id === SEED_CHANNEL_ID 时渲染（替代 onboard 空态）
 */

import type { ReactNode } from 'react';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* User Bubble — Figma 10998:50684:m1-10 底,max-w 560,px16 py12,radius 8 */
function SeedUserMsg({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="max-w-[560px] rounded-[8px] px-[16px] py-[12px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
      </div>
    </div>
  );
}

/* Answer — Figma 10998:50685:头行(22px 头像 + Alva + 时间,gap 8) + 内容 pl-30 gap-12,与头行 gap 8 */
function SeedAgentMsg({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="flex h-[22px] w-full items-center gap-[8px]">
        <img src={`${BASE}logo-portrait.svg`} alt="Alva" className="size-[22px] shrink-0 rounded-[4px]" />
        <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva</p>
        <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{time}</p>
      </div>
      <div className="flex w-full flex-col items-start gap-[12px] pl-[30px]">{children}</div>
    </div>
  );
}

/* 列表项 — Figma Markdown Item:20×22 圆点位(4px n9 dot) + 富文本(handle Medium + 正文 Regular) */
function SeedBullet({ handle, text }: { handle: string; text: string }) {
  return (
    <div className="flex w-full items-start">
      <span className="flex h-[22px] w-[20px] shrink-0 items-center justify-center">
        <span className="size-[4px] rounded-full" style={{ background: 'var(--text-n9, rgba(0,0,0,0.9))' }} />
      </span>
      <p className="min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        <span className="font-medium">{handle}</span>
        {text}
      </p>
    </div>
  );
}

export function ChannelSeedThread({ onOpenTasks }: { onOpenTasks?: () => void }) {
  return (
    <div className="flex w-full flex-col gap-[28px]">
      <SeedUserMsg text="Any updates today? Any updates today? Any updates today?" />

      <SeedAgentMsg time="Jun 29, 6:09 PM">
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          Hey, I'm Alva, your AI investing agent.
          <br aria-hidden />
          Ask me for market research, or set up live automations to watch your portfolio, tickers, and market voices. Pick what you want me to help with first.
        </p>
        <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          📬 AI Chip Supply Chain — Daily Digest · 2026-06-12
        </p>
        <div className="flex w-full flex-col gap-[4px]">
          <SeedBullet
            handle="@CosmicInglewood"
            text=" — Foundry-side bottlenecks are spreading: HBM is displacing DRAM production at roughly a 3:1 ratio, pushing Micron and others to abandon consumer DDR5 modules while TSMC scales back consumer SoC/CPU/GPU lines. Compute supply is tilting hard toward AI, and consumer electronics is getting squeezed out."
          />
          <SeedBullet
            handle="@babywhitemonkey"
            text=" — An overlooked upstream choke point: Kanto Denka Kogyo has notified Samsung / SK Hynix / TSMC that inventories run out in June and lines shut for good from July 1. The material is essential for ultra-thin tungsten layers in semiconductors (3D NAND, DRAM, logic chips). If accurate, this is a hard materials-side constraint signal."
          />
        </div>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          <span className="font-medium">What to watch next: </span>
          TSMC monthly sales cadence and any new SMIC capacity disclosures.
        </p>
      </SeedAgentMsg>

      <SeedUserMsg text="Build a trading playbook, NVDA, AAPL, TSLA" />

      <SeedAgentMsg time="10:28 PM">
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          I'll build this as a backtested trading strategy on NVDA / AAPL / TSLA using Altra, then wrap it in a live playbook. One thing I need from you before I build, since “trading playbook” can mean very different engines:Quick build decisions before I spin up the backtest:
        </p>
        {/* Agent/Card/Chat — Figma 10998:50697:白底 l2 描边 radius 8,px16 py12 gap8;step-f 24(n2) + 标题/副文 + Running tag;点击跳 Tasks tab */}
        <button
          type="button"
          onClick={onOpenTasks}
          className="flex w-full max-w-[560px] cursor-pointer items-start gap-[8px] overflow-hidden rounded-[8px] px-[16px] py-[12px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
          style={{ background: 'var(--b0-container, #ffffff)', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
        >
          <img src={`${BASE}icon-task-step.svg`} alt="" className="size-[24px] shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="w-full truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Market Reactions: SPY, XLE, WTI to Iranian Deal Headlines and Oil Drop
            </p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              Background task — I'll post here when it's done.
            </p>
          </div>
          <span
            className="shrink-0 rounded-[4px] px-[6px] py-[1px] text-center text-[12px] leading-[20px] tracking-[0.12px]"
            style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}
          >
            Running
          </span>
        </button>
      </SeedAgentMsg>
    </div>
  );
}
