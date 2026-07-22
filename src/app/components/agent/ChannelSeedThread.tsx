/**
 * [INPUT]: Figma Page/Agent/Chat(8341:125803)— alva-to-the-moon 频道预置对话:playbook 构建任务卡 + 自动化 digest 推送(带 source chip + 连接渠道卡)
 * [OUTPUT]: 演示频道聊天区的静态历史消息流；用户继续发消息由 AgentNewSession 的 extra 流接在其后
 * [POS]: AgentNewSession chat tab 在 channel.id === SEED_CHANNEL_ID 时渲染（替代 onboard 空态）
 */

import type { ReactNode } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* User Bubble — Figma 8341:125813:m1-10 底,max-w 560,px16 py12,radius 8 */
function SeedUserMsg({ text }: { text: string }) {
  return (
    <div className="flex w-full flex-col items-end">
      <div className="max-w-[560px] rounded-[8px] px-[16px] py-[12px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
        <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
      </div>
    </div>
  );
}

/* Answer — Figma Chat/Block-Answer:头行(22px 头像 + Alva + 时间,gap 8) + 内容 pl-30 gap-12,与头行 gap 8 */
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

/* 段标题 / 富文本行 — Markdown/M:Medium 14 或 Regular 14,n9 */
function SeedLine({ medium, children }: { medium?: boolean; children: ReactNode }) {
  return (
    <p className={`text-[14px] leading-[22px] tracking-[0.14px] ${medium ? 'font-medium' : ''}`} style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
      {children}
    </p>
  );
}

/* 列表项 — Figma Markdown Item:20×22 圆点位(4px n9 dot) + 正文(Regular 14 n9) */
function SeedBullet({ text }: { text: string }) {
  return (
    <div className="flex w-full items-start">
      <span className="flex h-[22px] w-[20px] shrink-0 items-center justify-center">
        <span className="size-[4px] rounded-full" style={{ background: 'var(--text-n9, rgba(0,0,0,0.9))' }} />
      </span>
      <p className="min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{text}</p>
    </div>
  );
}

/* 归因 chip — Figma Chat/Element/Card(Automation 变体 11404:128447):pill,l2 描边 + br02 底,
   pl5 pr8 py2 gap4;live 点(m1 实心 + m1 半透光晕) + 名称(Regular 12 n9) + arrow-right-l2 12(n9) */
function SeedSourceChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-[4px] rounded-full py-[2px] pl-[5px] pr-[8px]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <span className="relative flex size-[14px] shrink-0 items-center justify-center">
        <span className="absolute size-[14px] rounded-full" style={{ background: 'var(--main-m1, #49A3A6)', opacity: 0.2 }} />
        <span className="size-[6px] rounded-full" style={{ background: 'var(--main-m1, #49A3A6)' }} />
      </span>
      <span className="whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{label}</span>
      <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </span>
  );
}

/* 「Where should I send you alerts?」渠道卡(Figma Chat/Element/Card Connect 变体 11404:128449):
   br03 底 + l2 描边,p16 gap8;按钮紧凑态 h32 px12 py6 gap6 radius4,14px 白 logo + Medium 12 白字 */
const SEED_ALERT_CHANNELS: { id: string; label: string; logo: string; bg: string }[] = [
  { id: 'telegram', label: 'Telegram', logo: 'logo-im-telegram.svg', bg: '#229ed9' },
  { id: 'discord', label: 'Discord', logo: 'logo-im-discord.svg', bg: '#5865f2' },
  { id: 'imessage', label: 'iMessage', logo: 'logo-im-imessage.svg', bg: '#0cbd2a' },
];

function SeedAlertCard({ onConnect }: { onConnect?: (id: string) => void }) {
  return (
    <div
      className="flex w-full flex-col gap-[8px] rounded-[8px] p-[16px]"
      style={{ background: 'var(--content-br03, rgba(0,0,0,0.03))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      <p className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        Where should I send you alerts?
      </p>
      <div className="flex flex-wrap gap-[8px]">
        {SEED_ALERT_CHANNELS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onConnect?.(ch.id)}
            className="flex h-[32px] shrink-0 cursor-pointer items-center justify-center gap-[6px] rounded-[4px] border-none px-[12px] py-[6px] transition-opacity hover:opacity-90"
            style={{ background: ch.bg }}
          >
            <img src={`${BASE}${ch.logo}`} alt="" className="size-[14px] shrink-0" />
            <span className="whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white" style={{ fontFamily: FONT }}>{ch.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChannelSeedThread({ onOpenTasks, onConnectAlert }: { onOpenTasks?: () => void; onConnectAlert?: (id: string) => void }) {
  return (
    <div className="flex w-full flex-col gap-[28px]">
      <SeedUserMsg text="Build a trading playbook, NVDA, AAPL, TSLA" />

      <SeedAgentMsg time="10:28 PM">
        <SeedLine>
          I'll build this as a backtested trading strategy on NVDA / AAPL / TSLA using Altra, then wrap it in a live playbook.
        </SeedLine>
        {/* Agent/Card/Chat — Figma 8341:125818:白底 l2 描边 radius 8,px16 py12 gap8;step 24 + 标题/副文 + Running tag;点击跳 Tasks tab */}
        <button
          type="button"
          onClick={onOpenTasks}
          className="flex w-full cursor-pointer items-start gap-[8px] overflow-hidden rounded-[8px] p-[16px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
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

      <SeedAgentMsg time="10:28 PM">
        <SeedSourceChip label="nvda-macd-hft-notify" />
        <SeedLine medium>📬 AI Chip Supply Chain — Daily Digest · 2026-06-12</SeedLine>
        <SeedLine medium>What moved today:</SeedLine>
        <div className="flex w-full flex-col gap-[4px]">
          <SeedBullet text="TSMC’s Winbond DRAM Deal Isn’t Domination, It’s Insurance. Here’s What It Actually Means for Chip ETFs [1]" />
          <SeedBullet text="TSMC Q2 Earnings July 16: Three CoWoS Signals That Test AI’s Spending Ceiling [2]" />
          <SeedBullet text="Memory Market Expert: “SK Hynix Is Bigger, Cheaper and Closer to NVIDIA.” Inside Its $26.5 Billion Nasdaq Debut [3]" />
        </div>
        <SeedLine medium>What to watch next:</SeedLine>
        <div className="flex w-full flex-col gap-[4px]">
          <SeedBullet text="TSMC monthly sales cadence and any new SMIC capacity disclosures." />
          <SeedBullet text="TSMC Q2 Earnings July 16: Three CoWoS Signals That Test AI’s Spending Ceiling [2]" />
        </div>
        <SeedAlertCard onConnect={onConnectAlert} />
      </SeedAgentMsg>
    </div>
  );
}
