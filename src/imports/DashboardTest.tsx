import React, { useState, useRef, useEffect } from 'react';
import svgPaths from "./svg-nheoeek59y";
import imgImage from "figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png";
import { AIStorageRelativePerfWidget } from './AIStorageRelativePerfWidget';
import { AIStorageKeyWordTrendsWidget } from './AIStorageKeyWordTrendsWidget';
import { AIStorageEarningsWidget } from './AIStorageEarningsWidget';
import { EarningsDetailWidget } from './EarningsDetailWidget';
import img from "figma:asset/ba369a5f36e32294357bf2bdcf96a687f1a7a87c.png";
import { ResponsiveGridLayout, type Layout, type ResponsiveLayouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import '../styles/dashboard-grid.css';

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
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-white/5 transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
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
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-white/5 transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
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
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-white/5 transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
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
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-white/5 transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Search</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu5({ onClick }: { onClick?: () => void }) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-white/5 transition-colors" data-name="Nav Bar/Menu" onClick={onClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">About</p>
        </div>
      </div>
    </div>
  );
}

function Tabs({
  onHomeClick,
  onExploreClick,
  onLibraryClick,
  onSearchClick,
  onAboutClick
}: {
  onHomeClick?: () => void;
  onExploreClick?: () => void;
  onLibraryClick?: () => void;
  onSearchClick?: () => void;
  onAboutClick?: () => void;
}) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[5]" data-name="Tabs">
      <NavBarMenu1 onClick={onHomeClick} />
      <NavBarMenu2 onClick={onExploreClick} />
      <NavBarMenu3 onClick={onLibraryClick} />
      <NavBarMenu4 onClick={onSearchClick} />
      <NavBarMenu5 onClick={onAboutClick} />
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

function NavBarMenu7(props: {
  onDashboardClick?: () => void;
}) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={props.onDashboardClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Dashboard Playbook</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu18(props: {
  onWorkspaceClick?: () => void;
}) {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition-colors" data-name="Nav Bar/Menu" onClick={props.onWorkspaceClick}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[13px] text-ellipsis text-white tracking-[0.13px] whitespace-nowrap">Dashboard Workspace</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu19() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#49a3a6] text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap">Dashboard Test</p>
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

function Tabs1(props: {
  onDashboardClick?: () => void;
  onWorkspaceClick?: () => void;
}) {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]" data-name="Tabs">
      <NavBarMenu6 />
      <NavBarMenu7 onDashboardClick={props.onDashboardClick} />
      <NavBarMenu18 onWorkspaceClick={props.onWorkspaceClick} />
      <NavBarMenu19 />
      <NavBarMenu8 />
      <NavBarMenu9 />
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

function NavBarMenu17() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full z-[1]" data-name="Nav Bar/Menu">
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

function BarNavBarTier({
  onHomeClick,
  onExploreClick,
  onLibraryClick,
  onSearchClick,
  onAboutClick,
  onDashboardClick,
  onWorkspaceClick
}: {
  onHomeClick?: () => void;
  onExploreClick?: () => void;
  onLibraryClick?: () => void;
  onSearchClick?: () => void;
  onAboutClick?: () => void;
  onDashboardClick?: () => void;
  onWorkspaceClick?: () => void;
}) {
  return (
    <div className="bg-[#2a2a38] flex flex-col h-screen fixed left-0 top-0 isolate items-start p-[8px] shrink-0 w-[228px] z-[2] overflow-y-auto" data-name="Bar/Nav Bar Tier1">
      <Logo />
      <Btn />
      <Tabs
        onHomeClick={onHomeClick}
        onExploreClick={onExploreClick}
        onLibraryClick={onLibraryClick}
        onSearchClick={onSearchClick}
        onAboutClick={onAboutClick}
      />
      <Tabs1 onDashboardClick={onDashboardClick} onWorkspaceClick={onWorkspaceClick} />
      <Tabs3 />
      <NavBarMenu17 />
    </div>
  );
}

function SidebarDashboardNormal() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="sidebar-dashboard-normal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="sidebar-dashboard-normal">
          <path d={svgPaths.p10e63780} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function DotGreen() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="dot-green">
      <div className="-translate-y-1/2 absolute aspect-[20/20] left-0 right-0 top-1/2" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="var(--fill-0, #DBEDED)" id="Ellipse" r="6" />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute aspect-[8.5600004196167/8.5600004196167] bottom-[28.6%] left-1/2 top-[28.6%]" data-name="Ellipse">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.136 5.136">
          <circle cx="2.568" cy="2.568" fill="var(--fill-0, #49A3A6)" id="Ellipse" r="2.568" />
        </svg>
      </div>
    </div>
  );
}

function TagPlaybookStatus() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 size-[12px]" data-name="Tag/Playbook/Status">
      <DotGreen />
    </div>
  );
}

function Max() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Max 520">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] max-w-[136px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">Alva Intern</p>
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px] w-[6px]">
        <p className="leading-[20px] whitespace-pre-wrap">•</p>
      </div>
      <SidebarDashboardNormal />
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">Dashboard Test</p>
      <TagPlaybookStatus />
    </div>
  );
}

function TotalInfo() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="Total Info">
      <div className="relative shrink-0 size-[20px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="20" src={img} width="20" />
      </div>
      <Max />
    </div>
  );
}

function V() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0" data-name="V">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[0.12px]">V1</p>
    </div>
  );
}

function StarL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="star-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star-l">
          <path d={svgPaths.p2b2d8380} fill="var(--fill-0, black)" fillOpacity="0.9" id="Star (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ShareL() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="share-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="share-l">
          <path d={svgPaths.p272ac1f0} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ChatAiL() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="chat-ai-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="chat-ai-l">
          <path d={svgPaths.p143c1e00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ButtonInfo() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Button/Info">
      <ChatAiL />
    </div>
  );
}

function Chat1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Chat">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative size-full">
          <ButtonInfo />
          <p className="font-['Delight:Medium',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">Chat</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Chat() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[6px] shrink-0" data-name="Chat">
      <Chat1 />
    </div>
  );
}

function Right() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0" data-name="Right">
      <V />
      <StarL />
      <ShareL />
      <Chat />
    </div>
  );
}

function TopbarPlaybookVistor() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-white" data-name="Topbar/Playbook/Vistor">
      <TotalInfo />
      <Right />
    </div>
  );
}

function PlaybookTabGroupDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // 测量容器宽度
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 默认布局配置 - 为所有断点定义布局，确保响应式自适应
  // 断点基于内容区域宽度（浏览器宽度 - 侧边栏228px - 左右padding 56px）
  const defaultLayouts: ResponsiveLayouts = {
    lg: [
      { i: 'relative-perf', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'keyword-trends', x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-feed', x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-detail', x: 6, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
    ],
    md: [
      { i: 'relative-perf', x: 0, y: 0, w: 5, h: 5, minW: 4, minH: 4 },
      { i: 'keyword-trends', x: 5, y: 0, w: 5, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-feed', x: 0, y: 5, w: 5, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-detail', x: 5, y: 5, w: 5, h: 5, minW: 4, minH: 4 },
    ],
    sm: [
      { i: 'relative-perf', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'keyword-trends', x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-feed', x: 0, y: 10, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-detail', x: 0, y: 15, w: 6, h: 5, minW: 4, minH: 4 },
    ],
    xs: [
      { i: 'relative-perf', x: 0, y: 0, w: 4, h: 5, minW: 4, minH: 4 },
      { i: 'keyword-trends', x: 0, y: 5, w: 4, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-feed', x: 0, y: 10, w: 4, h: 5, minW: 4, minH: 4 },
      { i: 'earnings-detail', x: 0, y: 15, w: 4, h: 5, minW: 4, minH: 4 },
    ],
    xxs: [
      { i: 'relative-perf', x: 0, y: 0, w: 2, h: 5, minW: 2, minH: 4 },
      { i: 'keyword-trends', x: 0, y: 5, w: 2, h: 5, minW: 2, minH: 4 },
      { i: 'earnings-feed', x: 0, y: 10, w: 2, h: 5, minW: 2, minH: 4 },
      { i: 'earnings-detail', x: 0, y: 15, w: 2, h: 5, minW: 2, minH: 4 },
    ],
  };

  // 从 localStorage 读取布局，如果没有则使用默认布局
  const getInitialLayouts = (): ResponsiveLayouts => {
    try {
      const savedLayouts = localStorage.getItem('dashboardTestLayouts');
      if (savedLayouts) {
        const parsed = JSON.parse(savedLayouts);
        // 验证数据格式
        if (parsed && parsed.lg && Array.isArray(parsed.lg)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved layout, using default');
      localStorage.removeItem('dashboardTestLayouts');
    }
    return defaultLayouts;
  };

  const [layouts, setLayouts] = useState<ResponsiveLayouts>(getInitialLayouts);

  // 布局改变时保存到 localStorage
  const handleLayoutChange = (currentLayout: Layout, allLayouts: ResponsiveLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboardTestLayouts', JSON.stringify(allLayouts));
  };

  return (
    <div ref={containerRef} className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full" data-name="Playbook/Tab Group/Dashboard">
      <ResponsiveGridLayout
        className="layout w-full"
        layouts={layouts}
        width={containerWidth}
        breakpoints={{ lg: 750, md: 600, sm: 450, xs: 300, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        onLayoutChange={handleLayoutChange}
        margin={[24, 24]}
        containerPadding={[0, 0]}
        resizeConfig={{ handles: ['se', 'sw', 'ne', 'nw'] }}
      >
        <div key="relative-perf" className="widget-item">
          <AIStorageRelativePerfWidget />
        </div>
        <div key="keyword-trends" className="widget-item">
          <AIStorageKeyWordTrendsWidget />
        </div>
        <div key="earnings-feed" className="widget-item">
          <AIStorageEarningsWidget />
        </div>
        <div key="earnings-detail" className="widget-item">
          <EarningsDetailWidget />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

function PointerL() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="pointer-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_23_26082)" id="pointer-l">
          <path d={svgPaths.p2362500} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26082">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <PointerL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">Edit Chart</p>
    </div>
  );
}

function AddL() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="add-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="add-l2">
          <path d={svgPaths.p2c0bd380} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <AddL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">Add Widget</p>
    </div>
  );
}

function Right1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Right">
      <Button />
      <Button1 />
    </div>
  );
}

function PlaybookEditToolbarBottom() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center px-[28px] py-[14px] sticky bottom-0 shrink-0 w-full z-10" data-name="Playbook/Edit/Toolbar-Bottom">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Left" />
      <Right1 />
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function DisplayZone() {
  return (
    <div className="bg-white flex-[1_0_0] h-screen ml-[228px] overflow-y-auto relative rounded-bl-[8px] rounded-tl-[8px]" data-name="Display Zone">
      <div className="flex flex-col items-center min-h-full pb-[80px] rounded-[inherit]">
        <div className="content-stretch flex flex-col items-center px-[28px] relative w-full">
          <TopbarPlaybookVistor />
          <PlaybookTabGroupDashboard />
        </div>
      </div>
    </div>
  );
}

export function DashboardTest({
  onNavigate
}: {
  onNavigate: (page: any) => void;
}) {
  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full" data-name="DashboardTest">
      <BarNavBarTier
        onHomeClick={() => onNavigate("home")}
        onExploreClick={() => onNavigate("explore")}
        onLibraryClick={() => onNavigate("library")}
        onSearchClick={() => {}}
        onAboutClick={() => {}}
        onDashboardClick={() => onNavigate("dashboard")}
        onWorkspaceClick={() => onNavigate("workspace")}
      />
      <DisplayZone />
    </div>
  );
}
