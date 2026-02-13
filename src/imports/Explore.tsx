import svgPaths from "./svg-k6m80u38oo";
import imgImage from "figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png";
import type { Page } from "@/app/App";
import { useState } from "react";
import UserInfo from "@/imports/UserInfo";

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

function NavBarMenu2() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#49a3a6] text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap">Explore</p>
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

function Tabs({ onNavigateToHome, onNavigateToLibrary, onOpenSearch }: { onNavigateToHome?: () => void; onNavigateToLibrary?: () => void; onOpenSearch?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]" data-name="Tabs">
      <NavBarMenu1 onClick={onNavigateToHome} />
      <NavBarMenu2 />
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
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage} />
          </div>
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[13px] text-white tracking-[0.13px] whitespace-pre-wrap">YGGYLL</p>
        </div>
      </div>
    </div>
  );
}

function BarNavBarTier({ onNavigateToHome, onNavigateToLibrary, onNavigateToDashboard, onOpenSearch, isUserInfoOpen, onUserMouseEnter, onUserMouseLeave }: { 
  onNavigateToHome?: () => void; 
  onNavigateToLibrary?: () => void;
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
      <Tabs onNavigateToHome={onNavigateToHome} onNavigateToLibrary={onNavigateToLibrary} onOpenSearch={onOpenSearch} />
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

function Frame() {
  return (
    <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px] z-[1]" data-name="Frame">
      <div className="flex flex-col items-center min-h-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center pb-[40px] pt-[28px] px-[28px] relative w-full">
          <TabBar />
          <PlaybookCardList />
          <Component2 />
          <Component3 />
        </div>
      </div>
    </div>
  );
}

export default function Explore({ onNavigate, onOpenSearch }: { onNavigate?: (page: Page) => void; onOpenSearch?: () => void }) {
  const handleNavigateToHome = () => {
    onNavigate?.("home");
  };

  const handleNavigateToLibrary = () => {
    onNavigate?.("library");
  };

  const handleNavigateToDashboard = () => {
    onNavigate?.("dashboard");
  };

  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  return (
    <div className="bg-sidebar flex h-screen overflow-hidden relative w-full" data-name="Explore">
      <BarNavBarTier 
        onNavigateToHome={handleNavigateToHome} 
        onNavigateToLibrary={handleNavigateToLibrary}
        onNavigateToDashboard={handleNavigateToDashboard}
        onOpenSearch={onOpenSearch} 
        isUserInfoOpen={isUserInfoOpen} 
        onUserMouseEnter={() => setIsUserInfoOpen(true)} 
        onUserMouseLeave={() => setIsUserInfoOpen(false)} 
      />
      <Frame />
      
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