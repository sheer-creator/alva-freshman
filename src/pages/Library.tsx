/**
 * [INPUT]: AppShell, DropdownMenu
 * [OUTPUT]: 组件库页（TabBar + DataFeed 卡片列表）
 * [POS]: 页面层 — Library
 */

import type { Page } from '@/app/App';
import { useState } from 'react';
import UserInfo from '@/app/components/UserInfo';
import { AppShell } from '@/app/components/shell/AppShell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

/* ========== Tab 组件 ========== */

function TabItem({ label, isActive, onClick }: { label: string; isActive?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors ${
        isActive ? 'bg-[rgba(73,163,166,0.2)]' : 'bg-[rgba(0,0,0,0.03)] hover:bg-[rgba(0,0,0,0.06)]'
      }`}
      data-name="Tab Item"
      onClick={onClick}
    >
      <p className={`font-['Delight:${isActive ? 'Medium' : 'Regular'}',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] ${
        isActive ? 'text-[rgba(0,0,0,0.9)]' : 'text-[rgba(0,0,0,0.7)]'
      } tracking-[0.14px]`}>
        {label}
      </p>
    </div>
  );
}

function TabBar({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1200px] relative shrink-0 w-full" data-name="Tab Bar">
      <div className="content-start flex flex-wrap gap-[12px] h-[34px] items-start justify-center max-w-[1200px] relative shrink-0 w-full" data-name="Tab">
        <TabItem label="Universe" isActive={activeTab === "universe"} onClick={() => onTabChange("universe")} />
        <TabItem label="Data Feeds" isActive={activeTab === "dataFeeds"} onClick={() => onTabChange("dataFeeds")} />
        <TabItem label="File" isActive={activeTab === "file"} onClick={() => onTabChange("file")} />
      </div>
    </div>
  );
}

/* ========== DataFeed 卡片 ========== */

function DataFeedCreatorInfo({ name }: { name: string }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="DataFeed/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">{name}</p>
    </div>
  );
}

function DataFeedTitle({ title }: { title: string }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Title">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">{title}</p>
    </div>
  );
}

function DataFeedVisualization() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center relative shrink-0 w-full h-[160px] rounded-[4px]" data-name="Visualization">
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic text-[12px] text-[rgba(0,0,0,0.3)] tracking-[0.12px]">Chart Preview</p>
    </div>
  );
}

function MoreIcon() {
  return (
    <svg className="block size-[16px]" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="3" r="1.5" fill="rgba(0,0,0,0.5)" />
      <circle cx="8" cy="8" r="1.5" fill="rgba(0,0,0,0.5)" />
      <circle cx="8" cy="13" r="1.5" fill="rgba(0,0,0,0.5)" />
    </svg>
  );
}

function DataFeedCardActions({ createdAt }: { createdAt: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full" data-name="DataFeed/Card Info">
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">{createdAt}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] p-[4px] transition-colors outline-none focus:bg-[rgba(0,0,0,0.08)]"
            aria-label="更多操作"
          >
            <MoreIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={4}
          className="w-52 min-w-[8rem] rounded-md border border-[rgba(0,0,0,0.12)] bg-white py-2 shadow-lg font-['Delight',sans-serif] text-sm text-[rgba(0,0,0,0.9)]"
          style={{ boxShadow: "0px 6px 20px 0px rgba(0,0,0,0.04)" }}
        >
          <DropdownMenuItem
            className="cursor-pointer rounded-sm px-4 py-1.5 focus:bg-[#fafafa] focus:text-[rgba(0,0,0,0.9)]"
            onSelect={() => {}}
          >
            Build With
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer rounded-sm px-4 py-1.5 text-[#e05357] focus:bg-[rgba(224,83,87,0.1)] focus:text-[#e05357]"
            onSelect={() => {}}
          >
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function DataFeedCard({ creator, title, createdAt }: { creator: string; title: string; createdAt: string }) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[calc(33.333%-8px)] max-w-[calc(33.333%-8px)] relative rounded-[6px]" data-name="DataFeed/Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <DataFeedCreatorInfo name={creator} />
          <DataFeedTitle title={title} />
          <DataFeedVisualization />
          <DataFeedCardActions createdAt={createdAt} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function DataFeedCardList() {
  const dataFeeds = [
    { creator: "Alex Chen", title: "S&P 500 Historical Data", createdAt: "2 days ago" },
    { creator: "Sarah Johnson", title: "Bitcoin Price Feed", createdAt: "5 days ago" },
    { creator: "Mike Zhang", title: "US Treasury Yields", createdAt: "1 week ago" },
    { creator: "Emma Wilson", title: "Gold Spot Prices", createdAt: "1 week ago" },
    { creator: "David Lee", title: "Crude Oil Futures", createdAt: "2 weeks ago" },
    { creator: "Lisa Brown", title: "EUR/USD Exchange Rate", createdAt: "2 weeks ago" },
    { creator: "Tom Anderson", title: "NASDAQ Composite", createdAt: "3 weeks ago" },
    { creator: "Anna Martinez", title: "VIX Volatility Index", createdAt: "3 weeks ago" },
    { creator: "Chris Wang", title: "Ethereum Price Data", createdAt: "1 month ago" },
  ];

  return (
    <div className="content-stretch flex flex-wrap gap-[12px] items-start relative shrink-0 w-full" data-name="DataFeed/Card List">
      {dataFeeds.map((feed, index) => (
        <DataFeedCard key={index} creator={feed.creator} title={feed.title} createdAt={feed.createdAt} />
      ))}
    </div>
  );
}

/* ========== 页面内容 ========== */

function LibraryContent({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[1200px] relative shrink-0 w-full" data-name="Library Content">
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "dataFeeds" && <DataFeedCardList />}
      {activeTab === "universe" && (
        <div className="content-stretch flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">Universe content coming soon</p>
        </div>
      )}
      {activeTab === "file" && (
        <div className="content-stretch flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">File content coming soon</p>
        </div>
      )}
    </div>
  );
}

/* ========== 主组件 ========== */

export default function Library({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState("dataFeeds");
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <>
      <AppShell
        activePage="library"
        onNavigate={onNavigate!}
        onOpenSearch={onOpenSearch}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      >
        <div className="flex flex-col items-center min-h-full">
          <div className="content-stretch flex flex-col gap-[20px] items-center pb-[40px] pt-[28px] px-[28px] relative w-full">
            <LibraryContent activeTab={activeTab} onTabChange={setActiveTab} />
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
