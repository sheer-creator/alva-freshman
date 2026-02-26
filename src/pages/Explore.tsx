/**
 * [INPUT]: AppShell, SVG paths
 * [OUTPUT]: 发现页（TabBar + Playbook 卡片列表）
 * [POS]: 页面层 — Explore
 */

import svgPaths from '@/data/svg-k6m80u38oo';
import type { Page } from '@/app/App';
import { useState } from 'react';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';


function TabItem() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex gap-[4px] h-[34px] items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.14px]">Trending</p>
    </div>
  );
}

function TabItem1() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex gap-[4px] h-[34px] items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Featured</p>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] h-[34px] items-start justify-center max-w-[1200px] relative shrink-0 w-full" data-name="Tab">
      <TabItem />
      <TabItem1 />
    </div>
  );
}

function TabBar() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1200px] relative shrink-0 w-full" data-name="Tab Bar">
      <Tab />
    </div>
  );
}

function PlaybookCreatorInfo() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Alva Intern</p>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC Ultimate AI Trader</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.`}</p>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">338.23%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left />
    </div>
  );
}

function PlaybookCard() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo />
          <Frame1 />
          <FeedCardInfo />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Harry Zzz</p>
    </div>
  );
}

function Name1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">MAG7 Equal-Weight Monthly Rebalance</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name1 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly</p>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">142.8%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[58px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left1 />
    </div>
  );
}

function PlaybookCard1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo1 />
          <Frame2 />
          <FeedCardInfo1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Leo Leo</p>
    </div>
  );
}

function Name2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">PEPE Long vs BTC Short Monthly Rebalance</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name2 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.</p>
    </div>
  );
}

function Left2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">65.36%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo2() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left2 />
    </div>
  );
}

function PlaybookCard2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo2 />
          <Frame3 />
          <FeedCardInfo2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="1">
      <PlaybookCard />
      <PlaybookCard1 />
      <PlaybookCard2 />
    </div>
  );
}

function PlaybookCreatorInfo3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Sheer YLL YGG</p>
    </div>
  );
}

function SidebarStrategyNormal() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="sidebar-strategy-normal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="sidebar-strategy-normal">
          <path d={svgPaths.p3c400500} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Name3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <SidebarStrategyNormal />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">Attribution Analysis Strategy for Price Trends</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name3 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.</p>
    </div>
  );
}

function Left3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">120.9%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[58px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left3 />
    </div>
  );
}

function PlaybookCard3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo3 />
          <Frame4 />
          <FeedCardInfo3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Macro Scope X</p>
    </div>
  );
}

function Name4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC MACD 1h Simple Crossover</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name4 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.</p>
    </div>
  );
}

function Left4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">12.8%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo4() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left4 />
    </div>
  );
}

function PlaybookCard4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo4 />
          <Frame5 />
          <FeedCardInfo4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Smart Jing</p>
    </div>
  );
}

function Name5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">NVDA +3% Triggered TSM TP/SL</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name5 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.`}</p>
    </div>
  );
}

function Left5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">27.73%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo5() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left5 />
    </div>
  );
}

function PlaybookCard5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo5 />
          <Frame6 />
          <FeedCardInfo5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="2">
      <PlaybookCard3 />
      <PlaybookCard4 />
      <PlaybookCard5 />
    </div>
  );
}

function PlaybookCardList() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center max-w-[1200px] relative shrink-0 w-full" data-name="Playbook/Card List">
      <Component />
      <Component1 />
    </div>
  );
}

function PlaybookCreatorInfo6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Alva Intern</p>
    </div>
  );
}

function Name6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC Ultimate AI Trader</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name6 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.`}</p>
    </div>
  );
}

function Left6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">338.23%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo6() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left6 />
    </div>
  );
}

function PlaybookCard6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo6 />
          <Frame7 />
          <FeedCardInfo6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Harry Zzz</p>
    </div>
  );
}

function Name7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">MAG7 Equal-Weight Monthly Rebalance</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name7 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly</p>
    </div>
  );
}

function Left7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">142.8%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[58px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left7 />
    </div>
  );
}

function PlaybookCard7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo7 />
          <Frame8 />
          <FeedCardInfo7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo8() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Leo Leo</p>
    </div>
  );
}

function Name8() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">PEPE Long vs BTC Short Monthly Rebalance</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name8 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.</p>
    </div>
  );
}

function Left8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">65.36%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo8() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left8 />
    </div>
  );
}

function PlaybookCard8() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo8 />
          <Frame9 />
          <FeedCardInfo8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center max-w-[1200px] relative shrink-0 w-full" data-name="1">
      <PlaybookCard6 />
      <PlaybookCard7 />
      <PlaybookCard8 />
    </div>
  );
}

function PlaybookCreatorInfo9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Sheer YLL YGG</p>
    </div>
  );
}

function SidebarStrategyNormal1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="sidebar-strategy-normal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="sidebar-strategy-normal">
          <path d={svgPaths.p3c400500} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Name9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <SidebarStrategyNormal1 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">Attribution Analysis Strategy for Price Trends</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name9 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.</p>
    </div>
  );
}

function Left9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">120.9%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[58px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left9 />
    </div>
  );
}

function PlaybookCard9() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo9 />
          <Frame10 />
          <FeedCardInfo9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo10() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Macro Scope X</p>
    </div>
  );
}

function Name10() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC MACD 1h Simple Crossover</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name10 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.</p>
    </div>
  );
}

function Left10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">12.8%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo10() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left10 />
    </div>
  );
}

function PlaybookCard10() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo10 />
          <Frame11 />
          <FeedCardInfo10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function PlaybookCreatorInfo11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Playbook/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Smart Jing</p>
    </div>
  );
}

function Name11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">NVDA +3% Triggered TSM TP/SL</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name11 />
      <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.`}</p>
    </div>
  );
}

function Left11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
      <p className="leading-[38px] relative shrink-0 text-[#49a3a6] text-[28px] tracking-[0.28px] w-full">27.73%</p>
      <p className="leading-[20px] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">Annualized Return</p>
    </div>
  );
}

function FeedCardInfo11() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Feed/Card Info">
      <Left11 />
    </div>
  );
}

function PlaybookCard11() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Playbook/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[16px] relative w-full">
          <PlaybookCreatorInfo11 />
          <Frame12 />
          <FeedCardInfo11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center max-w-[1200px] relative shrink-0 w-full" data-name="2">
      <PlaybookCard9 />
      <PlaybookCard10 />
      <PlaybookCard11 />
    </div>
  );
}


/* ========== 页面 ========== */

export default function Explore({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="explore"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex flex-col items-center min-h-full">
          <div className="content-stretch flex flex-col gap-[20px] items-center pb-[40px] pt-[28px] px-[28px] relative w-full">
            <TabBar />
            <PlaybookCardList />
            <Component2 />
            <Component3 />
          </div>
        </div>
      </AppShell>
      {isUserInfoOpen && (
        <div
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </>
  );
}
