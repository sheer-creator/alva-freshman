/**
 * [INPUT]: AppShell, SVG paths, Figma 资源
 * [OUTPUT]: 首页（Chat + Featured Playbooks）
 * [POS]: 页面层 — Home
 */

import svgPaths from '@/data/svg-qs8zi2fru8';
import type { Page } from '@/app/App';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';

function Slogan() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[960px] relative shrink-0 w-full" data-name="Slogan">
      <p className="font-['Delight',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[28px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.28px] w-full whitespace-pre-wrap">
        <span className="leading-[38px]">{`Ideas in. `}</span>
        <span className="leading-[38px] text-[#49a3a6]">Alpha</span>
        <span className="leading-[38px]">{` out.`}</span>
      </p>
    </div>
  );
}

function ChatL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chat-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chat-l2">
          <path d={svgPaths.p2665880} fill="var(--fill-0, black)" fillOpacity="0.7" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TabItem() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <ChatL />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.7)] tracking-[0.12px]">Ask</p>
    </div>
  );
}

function StrategyL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="strategy-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="strategy-l">
          <path d={svgPaths.p8353f80} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TabItem1() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex gap-[4px] h-[28px] items-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <StrategyL />
      <p className="font-['Delight',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[0.12px]">Build</p>
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-start relative rounded-[4px] shrink-0" data-name="Tab">
      <TabItem />
      <TabItem1 />
    </div>
  );
}

function ArrowDownF() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="arrow-down-f2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="arrow-down-f2">
          <path d={svgPaths.p4b42980} fill="var(--fill-0, black)" fillOpacity="0.2" id="Rectangle" />
        </g>
      </svg>
    </div>
  );
}

function DataEntryInfo() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Data Entry/Info">
      <ArrowDownF />
    </div>
  );
}

function Select() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Select">
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.12px]">Trading Strategy</p>
      <DataEntryInfo />
    </div>
  );
}

function LeftInfo() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Left Info">
      <Tab />
      <Select />
    </div>
  );
}

function ToolboxL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="toolbox-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_4784)" id="toolbox-l">
          <path d={svgPaths.p11beaf80} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_1_4784">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PhotoL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="photo-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="photo-l">
          <path d={svgPaths.p3a5f6af0} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ArrowUpL({ isActive }: { isActive?: boolean }) {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-up-l1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-up-l1">
          <path d={svgPaths.p764a8f0} fill={isActive ? "var(--fill-0, white)" : "var(--fill-0, black)"} fillOpacity={isActive ? "1" : "0.2"} id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ChatSend({ hasInput }: { hasInput?: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Chat/Send">
      <Button 
        disabled={!hasInput}
        className={`h-[28px] w-[28px] p-0 rounded-[4px] ${hasInput ? 'bg-[#49a3a6] hover:bg-[#3d8a8d]' : 'bg-[rgba(0,0,0,0.05)]'}`}
      >
        <ArrowUpL isActive={hasInput} />
      </Button>
    </div>
  );
}

function ChatToolbar({ hasInput }: { hasInput?: boolean }) {
  return (
    <div className="content-stretch flex gap-[16px] h-[28px] items-center justify-end relative shrink-0 w-full" data-name="Chat/Toolbar">
      <LeftInfo />
      <ToolboxL />
      <PhotoL />
      <ChatSend hasInput={hasInput} />
    </div>
  );
}

function ChatBoxHome() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="ChatBox/Home">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Build an investing playbook from your ideas"
            className="font-['Delight',sans-serif] leading-[22px] max-h-[480px] min-h-[48px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px] w-full whitespace-pre-wrap resize-none border-none outline-none bg-transparent placeholder:text-[rgba(0,0,0,0.3)]"
          />
          <ChatToolbar hasInput={inputValue.trim().length > 0} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ChatPromptCardBuild() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] flex-[1_0_0] min-h-px min-w-[160px] relative rounded-[6px]" data-name="Chat/Prompt Card/Build">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Delight',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">🪙 Tom Lee’s Ethereum Price Prediction</p>
        </div>
      </div>
    </div>
  );
}

function ChatPromptCardBuild1() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] flex-[1_0_0] min-h-px min-w-[160px] relative rounded-[6px]" data-name="Chat/Prompt Card/Build">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Delight',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">💻 NVIDIA Q2 FY2025 Data Center Revenue vs Total Revenue (%)</p>
        </div>
      </div>
    </div>
  );
}

function ChatPromptCardBuild2() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] flex-[1_0_0] min-h-px min-w-[160px] relative rounded-[6px]" data-name="Chat/Prompt Card/Build">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Delight',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">💱 Coinbase Trading Volume – Retail vs Institutional</p>
        </div>
      </div>
    </div>
  );
}

function ChatPromptCardBuild3() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] flex-[1_0_0] min-h-px min-w-[160px] relative rounded-[6px]" data-name="Chat/Prompt Card/Build">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Delight',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">📝 Stock Tickers Mentioned by @JamesWynnReal</p>
        </div>
      </div>
    </div>
  );
}

function ChatReminder() {
  return (
    <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-name="Chat/Reminder">
      <ChatPromptCardBuild />
      <ChatPromptCardBuild1 />
      <ChatPromptCardBuild2 />
      <ChatPromptCardBuild3 />
    </div>
  );
}

function HomeChatBar() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full" data-name="Home/Chat Bar">
      <ChatBoxHome />
      <ChatReminder />
    </div>
  );
}

function Chat() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[960px] relative shrink-0 w-full" data-name="Chat">
      <Slogan />
      <HomeChatBar />
    </div>
  );
}

function ViewAll() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="View All">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">View All</p>
    </div>
  );
}

function HomeSecionTitle() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Home/Secion Title">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Featured Playbooks</p>
      <ViewAll />
    </div>
  );
}

function TabItem2() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.14px]">Smart Screener</p>
    </div>
  );
}

function TabItem3() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Asset Tracker</p>
    </div>
  );
}

function TabItem4() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Portfolio Lens</p>
    </div>
  );
}

function TabItem5() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Quant Signals</p>
    </div>
  );
}

function TabItem6() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Risk Monitors</p>
    </div>
  );
}

function TabItem7() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Macro Pulse</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full" data-name="Tab">
      <TabItem2 />
      <TabItem3 />
      <TabItem4 />
      <TabItem5 />
      <TabItem6 />
      <TabItem7 />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Alva Intern</p>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC Ultimate AI Trader</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`This strategy intelligently pinpoints BTC's optimal trading sweet spots through dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core price movements, it strategically accumulates during bumpy markets.`}</p>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Harry Zzz</p>
    </div>
  );
}

function Name1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">MAG7 Equal-Weight Monthly Rebalance</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name1 />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly</p>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame1 />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Leo Leo</p>
    </div>
  );
}

function Name2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">PEPE Long vs BTC Short Monthly Rebalance</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name2 />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">The OI Abnormal Movement Monitoring Strategy tracks selected crypto tokens on a 4-hour timeframe to detect unusually large changes in Open Interest (OI) and trading volume.</p>
    </div>
  );
}

function Left2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame2 />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Sheer YLL YGG</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">Attribution Analysis Strategy for Price Trends</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name3 />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Monitor selected tokens on a 4-hour timeframe to detect abnormal changes in Open Interest (OI) and trading volume in order to capture unusual market activity and generate alerts.</p>
    </div>
  );
}

function Left3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame3 />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Macro Scope X</p>
    </div>
  );
}

function Name4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">BTC MACD 1h Simple Crossover</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name4 />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.</p>
    </div>
  );
}

function Left4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame4 />
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">Smart Jing</p>
    </div>
  );
}

function Name5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">NVDA +3% Triggered TSM TP/SL</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Frame">
      <Name5 />
      <p className="font-['Delight',sans-serif] h-[44px] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[13px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.13px] w-full whitespace-pre-wrap">{`Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.`}</p>
    </div>
  );
}

function Left5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Delight',sans-serif] items-start min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Left">
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
          <Frame5 />
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
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Playbook/Card List">
      <Component />
      <Component1 />
    </div>
  );
}

function FeaturedPlaybooks() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[1200px] relative shrink-0 w-full" data-name="Featured Playbooks">
      <HomeSecionTitle />
      <Tab1 />
      <PlaybookCardList />
    </div>
  );
}

/* ========== 页面 ========== */

export default function Home({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="home"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex flex-col items-center min-h-full">
          <div className="content-stretch flex flex-col gap-[48px] items-center px-[28px] py-[64px] relative w-full">
            <Chat />
            <FeaturedPlaybooks />
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
