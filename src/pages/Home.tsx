/**
 * [INPUT]: AppShell, SVG paths, Figma 资源
 * [OUTPUT]: 首页（Chat + Featured Playbooks）
 * [POS]: 页面层 — Home
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AlphaSlogan } from '@/app/components/AlphaSlogan';
import UserInfo from '@/app/components/UserInfo';
import { FeaturedPlaybooks } from '@/app/components/FeaturedPlaybooks';
import { AppShell } from '@/app/components/shell/AppShell';
import { Button } from '@/app/components/ui/button';
import svgPaths from '@/data/svg-qs8zi2fru8';

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

function TabItemActive() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex gap-[4px] h-[28px] items-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <StrategyL />
      <p className="font-['Delight',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[0.12px]">Build</p>
    </div>
  );
}

function ChatModeTabs() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-start relative rounded-[4px] shrink-0" data-name="Tab">
      <TabItem />
      <TabItemActive />
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
      <ChatModeTabs />
      <Select />
    </div>
  );
}

function ToolboxL({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-60 transition-opacity"
      data-name="toolbox-l"
      onClick={onClick}
    >
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
          <path d={svgPaths.p764a8f0} fill={isActive ? 'var(--fill-0, white)' : 'var(--fill-0, black)'} fillOpacity={isActive ? '1' : '0.2'} id="Union" />
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

function ChatToolbar({ hasInput, onOpenSkills }: { hasInput?: boolean; onOpenSkills?: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] h-[28px] items-center justify-end relative shrink-0 w-full" data-name="Chat/Toolbar">
      <LeftInfo />
      <ToolboxL onClick={onOpenSkills} />
      <PhotoL />
      <ChatSend hasInput={hasInput} />
    </div>
  );
}

function ChatBoxHome({ onOpenSkills }: { onOpenSkills?: () => void }) {
  const [inputValue, setInputValue] = useState('');

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
          <ChatToolbar hasInput={inputValue.trim().length > 0} onOpenSkills={onOpenSkills} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ChatPromptCard({ text }: { text: string }) {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] flex-[1_0_0] min-h-px min-w-[160px] relative rounded-[6px]" data-name="Chat/Prompt Card/Build">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[16px] py-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Delight',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatReminder() {
  return (
    <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-name="Chat/Reminder">
      <ChatPromptCard text="🪙 Tom Lee’s Ethereum Price Prediction" />
      <ChatPromptCard text="💻 NVIDIA Q2 FY2025 Data Center Revenue vs Total Revenue (%)" />
      <ChatPromptCard text="💱 Coinbase Trading Volume – Retail vs Institutional" />
      <ChatPromptCard text="📝 Stock Tickers Mentioned by @JamesWynnReal" />
    </div>
  );
}

function HomeChatBar({ onOpenSkills }: { onOpenSkills?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full" data-name="Home/Chat Bar">
      <ChatBoxHome onOpenSkills={onOpenSkills} />
      <ChatReminder />
    </div>
  );
}

function Chat({ onOpenSkills }: { onOpenSkills?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[960px] relative shrink-0 w-full" data-name="Chat">
      <AlphaSlogan />
      <HomeChatBar onOpenSkills={onOpenSkills} />
    </div>
  );
}

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
            <Chat onOpenSkills={() => onNavigate?.('skills')} />
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
