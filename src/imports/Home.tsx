import svgPaths from "./svg-qs8zi2fru8";
import imgImage from "figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png";
import type { Page } from "@/app/App";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import UserInfo from "./UserInfo";

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

function NavBarMenu1() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative text-[#49a3a6] text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap">Home</p>
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

function NavBarMenu3({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Library</p>
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

function Tabs({ onNavigateToExplore, onNavigateToLibrary, onOpenSearch }: { onNavigateToExplore?: () => void; onNavigateToLibrary?: () => void; onOpenSearch?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]" data-name="Tabs">
      <NavBarMenu1 />
      <NavBarMenu2 onClick={onNavigateToExplore} />
      <NavBarMenu3 onClick={onNavigateToLibrary} />
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
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">Playbooks</p>
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

function NavBarMenu18({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Dashboard Workspace</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu19({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Dashboard Test</p>
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

function Tabs1({ onNavigateToDashboard, onNavigateToWorkspace, onNavigateToTest }: { onNavigateToDashboard?: () => void; onNavigateToWorkspace?: () => void; onNavigateToTest?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]" data-name="Tabs">
      <NavBarMenu6 />
      <NavBarMenu7 onClick={onNavigateToDashboard} />
      <NavBarMenu18 onClick={onNavigateToWorkspace} />
      <NavBarMenu19 onClick={onNavigateToTest} />
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
  return null;
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
      className="relative rounded-[4px] shrink-0 w-full z-[1] hover:bg-[rgba(255,255,255,0.05)] transition-colors" 
      data-name="Nav Bar/Menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <div className="relative rounded-[100px] shrink-0 size-[24px]" data-name="Image">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage} />
          </div>
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[13px] text-white tracking-[0.13px] whitespace-pre-wrap">YGGYLL</p>
        </div>
      </div>
    </div>
  );
}

function BarNavBarTier({ onNavigateToExplore, onNavigateToLibrary, onNavigateToDashboard, onNavigateToWorkspace, onNavigateToTest, onOpenSearch, isUserInfoOpen, onUserMouseEnter, onUserMouseLeave }: {
  onNavigateToExplore?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToWorkspace?: () => void;
  onNavigateToTest?: () => void;
  onOpenSearch?: () => void;
  isUserInfoOpen?: boolean;
  onUserMouseEnter?: () => void;
  onUserMouseLeave?: () => void;
}) {
  return (
    <div className="bg-sidebar flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" data-name="Bar/Nav Bar Tier1">
      <Logo />
      <Btn />
      <Tabs onNavigateToExplore={onNavigateToExplore} onNavigateToLibrary={onNavigateToLibrary} onOpenSearch={onOpenSearch} />
      <Tabs1 onNavigateToDashboard={onNavigateToDashboard} onNavigateToWorkspace={onNavigateToWorkspace} onNavigateToTest={onNavigateToTest} />
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

function Slogan() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[960px] relative shrink-0 w-full" data-name="Slogan">
      <p className="font-['Delight:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[28px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.28px] w-full whitespace-pre-wrap">
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
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.7)] tracking-[0.12px]">Ask</p>
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
      <p className="font-['Delight:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[0.12px]">Build</p>
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
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.12px]">Trading Strategy</p>
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
            className="font-['Delight:Regular',sans-serif] leading-[22px] max-h-[480px] min-h-[48px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px] w-full whitespace-pre-wrap resize-none border-none outline-none bg-transparent placeholder:text-[rgba(0,0,0,0.3)]"
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
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">🪙 Tom Lee’s Ethereum Price Prediction</p>
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
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">💻 NVIDIA Q2 FY2025 Data Center Revenue vs Total Revenue (%)</p>
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
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">💱 Coinbase Trading Volume – Retail vs Institutional</p>
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
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.7)] text-ellipsis tracking-[0.14px] whitespace-pre-wrap">📝 Stock Tickers Mentioned by @JamesWynnReal</p>
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
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.5)] tracking-[0.14px]">View All</p>
    </div>
  );
}

function HomeSecionTitle() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Home/Secion Title">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Featured Playbooks</p>
      <ViewAll />
    </div>
  );
}

function TabItem2() {
  return (
    <div className="bg-[rgba(73,163,166,0.2)] content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center tracking-[0.14px]">Smart Screener</p>
    </div>
  );
}

function TabItem3() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Asset Tracker</p>
    </div>
  );
}

function TabItem4() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Portfolio Lens</p>
    </div>
  );
}

function TabItem5() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Quant Signals</p>
    </div>
  );
}

function TabItem6() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Risk Monitors</p>
    </div>
  );
}

function TabItem7() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] content-stretch flex items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0" data-name="Tab Item">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Macro Pulse</p>
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

function Frame() {
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

function Frame1() {
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

function Frame2() {
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

function Frame3() {
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

function Frame4() {
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

function Frame5() {
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

function Body() {
  return (
    <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px] z-[1]" data-name="Body">
      <div className="flex flex-col items-center min-h-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center px-[28px] py-[64px] relative w-full">
          <Chat />
          <FeaturedPlaybooks />
        </div>
      </div>
    </div>
  );
}

export default function Home({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const handleNavigateToExplore = () => {
    onNavigate?.("explore");
  };

  const handleNavigateToLibrary = () => {
    onNavigate?.("library");
  };

  const handleNavigateToDashboard = () => {
    onNavigate?.("dashboard");
  };

  const handleNavigateToWorkspace = () => {
    onNavigate?.("workspace");
  };

  const handleNavigateToTest = () => {
    onNavigate?.("test");
  };

  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <div className="bg-sidebar flex h-screen overflow-hidden relative w-full" data-name="Home">
      <BarNavBarTier
        onNavigateToExplore={handleNavigateToExplore}
        onNavigateToLibrary={handleNavigateToLibrary}
        onNavigateToDashboard={handleNavigateToDashboard}
        onNavigateToWorkspace={handleNavigateToWorkspace}
        onNavigateToTest={handleNavigateToTest}
        onOpenSearch={onOpenSearch}
        isUserInfoOpen={isUserInfoOpen}
        onUserMouseEnter={() => setIsUserInfoOpen(true)}
        onUserMouseLeave={() => setIsUserInfoOpen(false)}
      />
      <Body />
      
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