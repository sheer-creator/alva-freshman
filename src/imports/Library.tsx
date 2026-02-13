import svgPaths from "./svg-k6m80u38oo";
import type { Page } from "@/app/App";
import { useState } from "react";
import UserInfo from "@/imports/UserInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

const br1 = "";
const br1Fallback = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNEOUQ5RDkiLz48L3N2Zz4=";

function SymbolTextWGH1() {
  return (
    <div className="col-1 h-[14px] ml-0 mt-0 relative row-1 w-[39.411px]" data-name="SymbolText-w-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4111 14">
        <g id="SymbolText-w-g-h">
          <path d={svgPaths.p3579200} fill="var(--fill-0, white)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextWGH() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0" data-name="SymbolText-w-g-h">
      <SymbolTextWGH1 />
    </div>
  );
}

function SidebarOnoff() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="sidebar-onoff">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="sidebar-onoff">
          <path d={svgPaths.p286113b2} fill="var(--fill-0, #404050)" id="Vector 8" />
          <path d={svgPaths.p3c7c6d00} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[48px] relative shrink-0 w-full z-[7]" data-name="Logo">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] py-[16px] relative size-full">
          <SymbolTextWGH />
          <SidebarOnoff />
        </div>
      </div>
    </div>
  );
}

function NavBarMenu() {
  return (
    <div className="bg-[#49a3a6] h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">New Playbook</p>
        </div>
      </div>
    </div>
  );
}

function Btn() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Btn">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <NavBarMenu />
      </div>
    </div>
  );
}

function NavBarMenu1({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Home</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu2({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Explore</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu3() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#49a3a6] text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap">Library</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu4({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Search</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu5() {
  const handleClick = () => {
    window.open('https://alva.ai/landing', '_blank');
  };

  return (
    <div 
      className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors" 
      data-name="Nav Bar/Menu"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">About</p>
        </div>
      </div>
    </div>
  );
}

function Tabs({ onNavigateToHome, onNavigateToExplore, onOpenSearch }: { onNavigateToHome?: () => void; onNavigateToExplore?: () => void; onOpenSearch?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]" data-name="Tabs">
      <NavBarMenu1 onClick={onNavigateToHome} />
      <NavBarMenu2 onClick={onNavigateToExplore} />
      <NavBarMenu3 />
      <NavBarMenu4 onClick={onOpenSearch} />
      <NavBarMenu5 />
    </div>
  );
}

function NavBarMenu6() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">Starred</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu7({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Dashboard Playbook</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu8() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Trading Strategy Playbook</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu9() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Google / X Trends Tracker</p>
        </div>
      </div>
    </div>
  );
}

function Tabs1({ onNavigateToDashboard }: { onNavigateToDashboard?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]" data-name="Tabs">
      <NavBarMenu6 />
      <NavBarMenu7 onClick={onNavigateToDashboard} />
      <NavBarMenu8 />
      <NavBarMenu9 />
    </div>
  );
}

function NavBarMenu10() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">Playbooks</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu11() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">NVDA Price Fetcher</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu12() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Short-Squeeze Risk Map</p>
        </div>
      </div>
    </div>
  );
}

function Tabs2() {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[3]" data-name="Tabs">
      <NavBarMenu10 />
      <NavBarMenu11 />
      <NavBarMenu12 />
    </div>
  );
}

function NavBarMenu13() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">Threads</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu14() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">TSLA Financial Trends and Charts Analysis</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu15() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">US Treasury Yield and Bitcoin Correlation Analysis</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu16() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Impact of Strong US Payrolls on Markets</p>
        </div>
      </div>
    </div>
  );
}

function Tabs3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[4px] relative w-full z-[2]" data-name="Tabs">
      <NavBarMenu13 />
      <NavBarMenu14 />
      <NavBarMenu15 />
      <NavBarMenu16 />
    </div>
  );
}

function NavBarMenu17({ isOpen, onMouseEnter, onMouseLeave }: { isOpen?: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div 
      className="relative rounded-[4px] shrink-0 w-full z-[1] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors" 
      data-name="Nav Bar/Menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <div className="relative rounded-[100px] shrink-0 size-[24px]" data-name="Image">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={br1 || br1Fallback} />
          </div>
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[13px] text-white tracking-[0.13px] whitespace-pre-wrap">YGGYLL</p>
        </div>
      </div>
    </div>
  );
}

function BarNavBarTier({ onNavigateToHome, onNavigateToExplore, onNavigateToDashboard, onOpenSearch, isUserInfoOpen, onUserMouseEnter, onUserMouseLeave }: { 
  onNavigateToHome?: () => void; 
  onNavigateToExplore?: () => void;
  onNavigateToDashboard?: () => void;
  onOpenSearch?: () => void;
  isUserInfoOpen?: boolean;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
}) {
  return (
    <div className="bg-sidebar flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" data-name="Bar/Nav Bar Tier1">
      <Logo />
      <Btn />
      <Tabs onNavigateToHome={onNavigateToHome} onNavigateToExplore={onNavigateToExplore} onOpenSearch={onOpenSearch} />
      <Tabs1 onNavigateToDashboard={onNavigateToDashboard} />
      <Tabs2 />
      <Tabs3 />
      <NavBarMenu17 
        isOpen={isUserInfoOpen} 
        onMouseEnter={onUserMouseEnter}
        onMouseLeave={onUserMouseLeave}
      />
    </div>
  );
}

// Tab Components
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

// Data Feed Card Components
function DataFeedCreatorInfo({ name }: { name: string }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="DataFeed/Creator Info">
      <div className="relative shrink-0 size-[22px]" data-name="image">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <circle cx="11" cy="11" fill="var(--fill-0, #D9D9D9)" id="image" r="11" />
        </svg>
      </div>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">{name}</p>
    </div>
  );
}

function DataFeedTitle({ title }: { title: string }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0 w-full" data-name="Title">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[28px] min-h-px min-w-px not-italic overflow-hidden relative text-[18px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.18px] whitespace-nowrap">{title}</p>
    </div>
  );
}

function DataFeedVisualization() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center relative shrink-0 w-full h-[160px] rounded-[4px]" data-name="Visualization">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic text-[12px] text-[rgba(0,0,0,0.3)] tracking-[0.12px]">Chart Preview</p>
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

/** 使用 component 里的 Dropdown 组件 (dropdown-menu) */
function DataFeedCardActions({ createdAt }: { createdAt: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-between relative shrink-0 w-full" data-name="DataFeed/Card Info">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">{createdAt}</p>
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
          className="w-52 min-w-[8rem] rounded-md border border-[rgba(0,0,0,0.12)] bg-white py-2 shadow-lg font-['Delight:Regular',sans-serif] text-sm text-[rgba(0,0,0,0.9)]"
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

function LibraryContent({ activeTab }: { activeTab: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[1200px] relative shrink-0 w-full" data-name="Library Content">
      <TabBar activeTab={activeTab} onTabChange={() => {}} />
      {activeTab === "dataFeeds" && <DataFeedCardList />}
      {activeTab === "universe" && (
        <div className="content-stretch flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">Universe content coming soon</p>
        </div>
      )}
      {activeTab === "file" && (
        <div className="content-stretch flex items-center justify-center w-full h-[400px]">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">File content coming soon</p>
        </div>
      )}
    </div>
  );
}

function Frame({ activeTab }: { activeTab: string }) {
  return (
    <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px] z-[1]" data-name="Body">
      <div className="flex flex-col items-center min-h-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center pb-[40px] pt-[28px] px-[28px] relative w-full">
          <LibraryContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default function Library({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const [activeTab, setActiveTab] = useState("dataFeeds");
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const handleNavigateToHome = () => {
    onNavigate?.("home");
  };

  const handleNavigateToExplore = () => {
    onNavigate?.("explore");
  };

  const handleNavigateToDashboard = () => {
    onNavigate?.("dashboard");
  };

  return (
    <div className="bg-sidebar flex h-screen overflow-hidden relative w-full" data-name="Library">
      <BarNavBarTier 
        onNavigateToHome={handleNavigateToHome} 
        onNavigateToExplore={handleNavigateToExplore}
        onNavigateToDashboard={handleNavigateToDashboard}
        onOpenSearch={onOpenSearch} 
        isUserInfoOpen={isUserInfoOpen} 
        onUserMouseEnter={() => setIsUserInfoOpen(true)} 
        onUserMouseLeave={() => setIsUserInfoOpen(false)} 
      />
      <Frame activeTab={activeTab} />
      
      {/* User Info Popover - Outside sidebar to avoid z-index conflicts */}
      {isUserInfoOpen && (
        <div 
          className="fixed bottom-[56px] left-[8px] w-[320px] z-[9999]"
          onMouseEnter={() => setIsUserInfoOpen(true)}
          onMouseLeave={() => setIsUserInfoOpen(false)}
        >
          <UserInfo />
        </div>
      )}
    </div>
  );
}