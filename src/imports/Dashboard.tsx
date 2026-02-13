import svgPaths from "./svg-nheoeek59y";
import imgImage from "figma:asset/b6ec6224880e49a1fd078b50b5b248ac0bdaff74.png";
import ReactECharts from 'echarts-for-react';
import { ddr4Data, ddr5Data } from './dramPriceData';
import img from "figma:asset/ba369a5f36e32294357bf2bdcf96a687f1a7a87c.png";
import img1 from "figma:asset/11f742b6bf227629e0bd445a4655f9faedb0d5cf.png";
import img2 from "figma:asset/245a7d0f66b2a4c07c6f65541bd8759f79b07f71.png";
import img11 from "figma:asset/82e4e2abde2f2ae67d295ccb417c5bf345acddbc.png";
import img3 from "figma:asset/de76204612629f7b9912fe82236eed8d97bdf3fe.png";
import imgImage5 from "figma:asset/6b633e6a9fb45d16be89e19133551e383be7e5a8.png";
import img4 from "figma:asset/f411fd1a36a6c51dfe5dd9825547789a69950867.png";
import imgImage6 from "figma:asset/98e8ba807c686009e1e8cb5018fdfb8380f2d298.png";
import img5 from "figma:asset/2a17d51f451f6ca36bd335e0bc38326048598bf8.png";
import imgImage7 from "figma:asset/65de76467a5c98a12d435c27aedf25c737f74bc4.png";
import img6 from "figma:asset/ca7532afc40c29427a03dacc93cef24bdba8112e.png";
import imgImage8 from "figma:asset/b279d6cbe129543dd8a8ff8d8541284ee8e4f397.png";
import img7 from "figma:asset/2459b70488a6039e6afe2ba7d73d3553c5d6a6ec.png";
import imgImage9 from "figma:asset/4696696644416e84361c842891afcbf2335fd3c0.png";
import img8 from "figma:asset/20b0de3d5ed31ac9b394dc7ff2a96da33fa3e0bc.png";
import imgImage10 from "figma:asset/66960b6397c704631cbf4d1abb15c3de7c7134b1.png";
import imgImage35 from "figma:asset/f0f388a7a866c74f11eef9df00d6787b8775d4ab.png";
import imgImage11 from "figma:asset/e7fb618ebcafc29c76dce1dca3bcc2e1f31b5789.png";
import imgImage36 from "figma:asset/8b35331f1de90be79a0433516249393776d61365.png";
import imgImage12 from "figma:asset/743295b0cd6f676802d0de1df353b9d8b275338f.png";
import imgImage37 from "figma:asset/96f0b49b53cc6b6abed34db509d2cf8dc1cfe45c.png";
import imgImage13 from "figma:asset/2e4ef1f2b0c1564ca0ad2da6c4fa6fa445af6b42.png";
import imgImage38 from "figma:asset/5308456831c506d750c1c7521fb9901ca1101b74.png";
import imgImage14 from "figma:asset/8840fd187ac279d4878e32dcf4910cdbe573cd82.png";
import imgImage15 from "figma:asset/0e79b9f9852aa2e5765c0d327d9eadca0e3627b0.png";
import imgLogoStock from "figma:asset/9a4f7fefba6a97d111af6c74b8275123566b4673.png";
import imgLogoStock1 from "figma:asset/45bf0f25a4213e3fa8e153822162b70ca856a52a.png";
import imgLogoStock2 from "figma:asset/f3a1622dbd5b37cb6b9d2753065e254c97a3a13e.png";
import imgLogoStock3 from "figma:asset/4b611e74e7d34eaccd71918596d9ceb19bcb226f.png";
import imgLogoStock4 from "figma:asset/40f3be28754f1e4479da9d07dac064a18ba9f4f1.png";

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
          <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic opacity-50 overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white tracking-[0.12px]">Starred</p>
        </div>
      </div>
    </div>
  );
}

function NavBarMenu7() {
  return (
    <div className="h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Nav Bar/Menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[#49a3a6] text-[13px] text-ellipsis tracking-[0.13px] whitespace-nowrap">Dashboard Playbook</p>
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

function Tabs1() {
  return (
    <div className="content-stretch flex flex-col items-start py-[4px] relative shrink-0 w-full z-[4]" data-name="Tabs">
      <NavBarMenu6 />
      <NavBarMenu7 />
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
  onAboutClick 
}: { 
  onHomeClick?: () => void;
  onExploreClick?: () => void;
  onLibraryClick?: () => void;
  onSearchClick?: () => void;
  onAboutClick?: () => void;
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
      <Tabs1 />
      <Tabs2 />
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
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">AI Storage Theme Dashboard</p>
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

function SymbolTextBGH1() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH2() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH1 />
      <SymbolTextBGH2 />
    </div>
  );
}

function LogoAlva() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH />
    </div>
  );
}

function ChartWatermark() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[4]" data-name="Chart/Watermark">
      <LogoAlva />
    </div>
  );
}

function ArrowRightL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">{`Brief & Notes`}</p>
      <ArrowRightL />
    </div>
  );
}

function ClockL() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
    </div>
  );
}

function WidgetTitle() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title />
      <Timestamp />
    </div>
  );
}

function MarkdownLGap() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">AI Storage Theme Brief</p>
    </div>
  );
}

function MarkdownLGap1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[0] min-h-px min-w-px not-italic relative text-[0px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">
        <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[14px] tracking-[0.14px]">Date:</span>
        <span className="leading-[26px] text-[16px]">
          {` January 22, 2026`}
          <br aria-hidden="true" />
        </span>
        <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[14px] tracking-[0.14px]">Theme:</span>
        <span className="leading-[26px] text-[16px]">{` AI Infrastructure Storage Demand`}</span>
      </p>
    </div>
  );
}

function Line() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 526 16">
        <g id="Line">
          <path d="M0 8H526" id="Line_2" stroke="var(--stroke-0, black)" strokeOpacity="0.07" />
        </g>
      </svg>
    </div>
  );
}

function MarkdownLGap2() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">1. AI Storage Segments</p>
    </div>
  );
}

function MarkdownLGap3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Enterprise AI Storage</p>
    </div>
  );
}

function Component() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">High-performance NVMe/SSD arrays for training clusters</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component1 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Object storage for model checkpoints and datasets</p>
    </div>
  );
}

function Component2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component2 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Pure Storage, NetApp, Dell EMC</p>
    </div>
  );
}

function MarkdownLGap4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function MarkdownLGap5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Hyperscale Cloud Storage</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component3 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Distributed file systems (e.g., HDFS, Ceph)</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component4 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Tiered storage (hot/warm/cold) for cost optimization</p>
    </div>
  );
}

function Component5() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component5 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: AWS S3, Azure Blob, Google Cloud Storage</p>
    </div>
  );
}

function MarkdownLGap6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function MarkdownLGap7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Edge AI Storage</p>
    </div>
  );
}

function Component6() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component6 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Local inference caching and model storage</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component7 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Low-latency edge compute storage</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component8 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Western Digital, Seagate, Micron</p>
    </div>
  );
}

function MarkdownLGap8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item6 />
      <Item7 />
      <Item8 />
    </div>
  );
}

function MarkdownLGap9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Memory/Storage Convergence</p>
    </div>
  );
}

function Component9() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component9 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">CXL-enabled memory pooling</p>
    </div>
  );
}

function Component10() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component10 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Persistent memory (PMem) for AI workloads</p>
    </div>
  );
}

function Component11() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component11 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Samsung, SK Hynix, Intel</p>
    </div>
  );
}

function MarkdownLGap10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item9 />
      <Item10 />
      <Item11 />
    </div>
  );
}

function Line1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 526 16">
        <g id="Line">
          <path d="M0 8H526" id="Line_2" stroke="var(--stroke-0, black)" strokeOpacity="0.07" />
        </g>
      </svg>
    </div>
  );
}

function MarkdownLGap11() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">2. Demand Drivers</p>
    </div>
  );
}

function MarkdownLGap12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Primary Drivers</p>
    </div>
  );
}

function Component12() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component12 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Model Size Expansion: GPT-4+ scale models require 100TB+ storage per training run</p>
    </div>
  );
}

function Component13() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component13 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Training Data Growth: Multimodal datasets (text, image, video) expanding 3-5x annually</p>
    </div>
  );
}

function Component14() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component14 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Inference Scale: Real-time serving requires low-latency storage at edge and cloud</p>
    </div>
  );
}

function Component15() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Code() {
  return <div className="content-stretch flex flex-col items-start pl-[8px] py-px shrink-0" data-name="Code" />;
}

function Item15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component15 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative self-stretch text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Regulatory Compliance: Data sovereignty laws driving localized storage buildouts</p>
      <Code />
    </div>
  );
}

function MarkdownLGap13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item12 />
      <Item13 />
      <Item14 />
      <Item15 />
    </div>
  );
}

function MarkdownLGap14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Secondary Drivers</p>
    </div>
  );
}

function Component16() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component16 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Model Versioning: Multiple checkpoint storage for A/B testing and rollback</p>
    </div>
  );
}

function Component17() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component17 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Synthetic Data: AI-generated training data creating storage feedback loop</p>
    </div>
  );
}

function Component18() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component18 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Fine-tuning Proliferation: Enterprise custom models multiplying storage needs</p>
    </div>
  );
}

function MarkdownLGap15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item16 />
      <Item17 />
      <Item18 />
    </div>
  );
}

function Line2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 526 16">
        <g id="Line">
          <path d="M0 8H526" id="Line_2" stroke="var(--stroke-0, black)" strokeOpacity="0.07" />
        </g>
      </svg>
    </div>
  );
}

function MarkdownLGap16() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[4px] pt-[12px] relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">{`3. Supply & Price Signals`}</p>
    </div>
  );
}

function MarkdownLGap17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Supply Indicators</p>
    </div>
  );
}

function Component19() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component19 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">{`NAND Flash Utilization: Monitor >85% = tight supply, <70% = oversupply`}</p>
    </div>
  );
}

function Component20() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component20 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">HDD Shipment Volumes: Hyperscale HDD orders (leading indicator, 2-3 month lag)</p>
    </div>
  );
}

function Component21() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component21 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Fab Capacity Additions: Samsung/Micron capex announcements (6-12 month lead time)</p>
    </div>
  );
}

function MarkdownLGap18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item19 />
      <Item20 />
      <Item21 />
    </div>
  );
}

function MarkdownLGap19() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Price Signals</p>
    </div>
  );
}

function Component22() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component22 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">NAND Contract Prices: Track quarterly enterprise SSD pricing (DRAMeXchange)</p>
    </div>
  );
}

function Component23() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component23 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Cloud Storage Pricing: AWS S3/Azure price cuts = margin pressure signal</p>
    </div>
  );
}

function Component24() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item24() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component24 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">{`Spot Market Premiums: Gray market SSD premiums >10% = shortage forming`}</p>
    </div>
  );
}

function MarkdownLGap20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item22 />
      <Item23 />
      <Item24 />
    </div>
  );
}

function MarkdownLGap21() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Current Status (as of Jan 2026)</p>
    </div>
  );
}

function Component25() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item25() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component25 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">NAND prices: Stabilizing after 2025 correction</p>
    </div>
  );
}

function Component26() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component26 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">HDD demand: Steady for nearline hyperscale</p>
    </div>
  );
}

function Component27() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name=".">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
        <g id=".">
          <circle cx="12" cy="13" fill="var(--fill-0, black)" fillOpacity="0.9" id="Ellipse 1" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Item27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Item">
      <Component27 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Enterprise SSD: Tight supply for high-capacity (30TB+) drives</p>
    </div>
  );
}

function MarkdownLGap22() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <Item25 />
      <Item26 />
      <Item27 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[rgba(0,0,0,0.02)] flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full z-[1]" data-name="Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[20px] relative size-full">
          <MarkdownLGap />
          <MarkdownLGap1 />
          <Line />
          <MarkdownLGap2 />
          <MarkdownLGap3 />
          <MarkdownLGap4 />
          <MarkdownLGap5 />
          <MarkdownLGap6 />
          <MarkdownLGap7 />
          <MarkdownLGap8 />
          <MarkdownLGap9 />
          <MarkdownLGap10 />
          <Line1 />
          <MarkdownLGap11 />
          <MarkdownLGap12 />
          <MarkdownLGap13 />
          <MarkdownLGap14 />
          <MarkdownLGap15 />
          <Line2 />
          <MarkdownLGap16 />
          <MarkdownLGap17 />
          <MarkdownLGap18 />
          <MarkdownLGap19 />
          <MarkdownLGap20 />
          <MarkdownLGap21 />
          <MarkdownLGap22 />
        </div>
      </div>
    </div>
  );
}

function WidgetGeneral() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] isolate items-center min-h-px min-w-px relative rounded-[4px]" data-name="Widget/General">
      <ChartWatermark />
      <WidgetTitle />
      <Frame />
    </div>
  );
}

function ArrowRightL1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Memory Storage Index</p>
      <ArrowRightL1 />
    </div>
  );
}

function ClockL1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL1 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
    </div>
  );
}

function WidgetTitle1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title1 />
      <Timestamp1 />
    </div>
  );
}

function SymbolTextBGH4() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH5() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH3() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH4 />
      <SymbolTextBGH5 />
    </div>
  );
}

function LogoAlva1() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH3 />
    </div>
  );
}

function ChartWatermark1() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[5]" data-name="Chart/Watermark">
      <LogoAlva1 />
    </div>
  );
}

function Frame1() {
  return <div className="bg-[#7777d9] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="1">
      <Frame1 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">AI Memory Storage Index</p>
      </div>
    </div>
  );
}

function Frame2() {
  return <div className="bg-[#ff9800] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component30() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="4">
      <Frame2 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">{`S&P`}</p>
      </div>
    </div>
  );
}

function Component28() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end relative shrink-0 w-full z-[4]" data-name="图例">
      <Component29 />
      <Component30 />
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center leading-[0] not-italic py-[4px] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] w-full z-[3]" data-name="Info">
      <div className="flex flex-col justify-center relative shrink-0 whitespace-nowrap">
        <p className="leading-[16px]">Price (USD)</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px opacity-0 relative text-right">
        <p className="leading-[16px] whitespace-pre-wrap">Growth (%)</p>
      </div>
    </div>
  );
}

function Component31() {
  return (
    <div className="absolute inset-[0_0_0_38px] overflow-clip z-[6]" data-name="图表">
      <div className="absolute bottom-[-7px] flex items-center justify-center left-[-28px] top-[101px] w-[1218px]">
        <div className="-scale-y-100 flex-none h-[158px] rotate-180 w-[1218px]">
          <div className="relative size-full" data-name="对比">
            <div className="absolute inset-[1.81%_-0.08%_-0.63%_-0.08%]">
              <img alt="" className="block max-w-none size-full" height="156.136" src={img1} width="1219.989" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-3px] left-[-28px] top-[16px] w-[1218px]" data-name="This">
        <div className="absolute inset-[1.71%_-0.04%_-0.21%_0.03%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1218.15 235.405">
            <g id="This">
              <path d={svgPaths.p1cbdc780} fill="url(#paint0_linear_23_26041)" />
              <path d={svgPaths.p38ec2300} stroke="var(--stroke-0, #7777D9)" strokeLinejoin="round" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_26041" x1="551.369" x2="551.369" y1="25.4958" y2="234.905">
                <stop stopColor="#7777D9" stopOpacity="0.2" />
                <stop offset="1" stopColor="#7777D9" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function YItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
        <p className="leading-[16px] whitespace-pre-wrap">6940</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
        <p className="leading-[16px] whitespace-pre-wrap">6930</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
        <p className="leading-[16px] whitespace-pre-wrap">6920</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px opacity-0 relative" data-name="起始资金线">
        <img alt="" className="block max-w-none size-full" height="0" src={img2} width="504" />
      </div>
    </div>
  );
}

function YItem3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
        <p className="leading-[16px] whitespace-pre-wrap">6910</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
        <p className="leading-[16px] whitespace-pre-wrap">6900</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px overflow-clip relative w-full z-[2]" data-name="Y">
      <Component31 />
      <YItem />
      <YItem1 />
      <YItem2 />
      <YItem3 />
      <YItem4 />
    </div>
  );
}

function X() {
  return (
    <div className="h-[16px] relative shrink-0 w-full z-[1]" data-name="X">
      <div className="content-stretch flex font-['Delight:Regular',sans-serif] items-start justify-between leading-[0] not-italic pl-[38px] relative size-full text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px]">
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/01</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/05</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/09</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/13</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/17</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/21</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/25</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">11/29</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">12/03</p>
        </div>
      </div>
    </div>
  );
}

function XY() {
  const xData = ['11/01', '11/05', '11/09', '11/13', '11/17', '11/21', '11/25', '11/29', '12/03'];
  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderWidth: 0.5,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 11
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: 48,
      right: 16,
      top: 52,
      bottom: 28,
      containLabel: false
    },
    xAxis: {
      type: 'category' as const,
      data: xData,
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.05)' } },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value' as const,
      name: 'Price (USD)',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 4, -36]
      },
      nameLocation: 'end' as const,
      min: 6900,
      max: 6940,
      interval: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10
      }
    },
    series: [
      {
        name: 'AI Memory Storage Index',
        type: 'line' as const,
        data: [6908, 6912, 6918, 6915, 6922, 6928, 6925, 6932, 6935],
        symbol: 'none',
        smooth: 0.1,
        lineStyle: { width: 1.2, color: '#7474D8' },
        itemStyle: { color: '#7474D8' },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(116, 116, 216, 0.2)' },
              { offset: 1, color: 'rgba(116, 116, 216, 0)' }
            ]
          }
        }
      },
      {
        name: 'S&P',
        type: 'line' as const,
        data: [6910, 6908, 6912, 6916, 6914, 6920, 6918, 6924, 6922],
        symbol: 'none',
        smooth: 0.1,
        lineStyle: { width: 1.2, color: '#FF9800' },
        itemStyle: { color: '#FF9800' }
      }
    ]
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full z-[1]" data-name="X+Y"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
        backgroundSize: '3px 3px'
      }}
    >
      <div className="overflow-clip rounded-[inherit] size-full relative">
        <div className="content-stretch flex flex-col items-start pt-[12px] px-[12px] relative size-full">
          <Component28 />
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', flex: 1, minHeight: 0 }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        <ChartWatermark1 />
      </div>
    </div>
  );
}

function WidgetChart() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] isolate items-center min-h-px min-w-px relative rounded-[4px]" data-name="Widget/Chart">
      <WidgetTitle1 />
      <XY />
    </div>
  );
}

function Group() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Group">
      <WidgetGeneral />
      <WidgetChart />
    </div>
  );
}

function ArrowRightL2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <a className="block font-['Delight:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-nowrap" href="https://stg.alva.xyz/dashboard?id=2014552503732015104">
        <p className="cursor-pointer leading-[22px]">DRAM Price Trend</p>
      </a>
      <ArrowRightL2 />
    </div>
  );
}

function ClockL2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL2 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">02/12/2026 12:30</p>
    </div>
  );
}

function WidgetTitle2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full" data-name="Widget/Title">
      <Title2 />
      <Timestamp2 />
    </div>
  );
}

function Frame3() {
  return <div className="bg-[#7777d9] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component33() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="4">
      <Frame3 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">NVDA</p>
      </div>
    </div>
  );
}

function Frame4() {
  return <div className="bg-[#4caf50] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component34() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="3">
      <Frame4 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">AMD</p>
      </div>
    </div>
  );
}

function Frame5() {
  return <div className="bg-[#ff9800] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component35() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="2">
      <Frame5 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">AVGO</p>
      </div>
    </div>
  );
}

function Frame6() {
  return <div className="bg-[#5499d6] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="1">
      <Frame6 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">MU</p>
      </div>
    </div>
  );
}

function Frame7() {
  return <div className="bg-[#df7da8] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component37() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="5">
      <Frame7 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">WDC</p>
      </div>
    </div>
  );
}

function Frame8() {
  return <div className="bg-[#99c13a] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component38() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="6">
      <Frame8 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">STX</p>
      </div>
    </div>
  );
}

function Frame9() {
  return <div className="bg-[#a878dc] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component39() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="7">
      <Frame9 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">KLAC</p>
      </div>
    </div>
  );
}

function Frame10() {
  return <div className="bg-[#e87678] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component40() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="8">
      <Frame10 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">LRCX</p>
      </div>
    </div>
  );
}

function Frame11() {
  return <div className="bg-[#00bcd4] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="9">
      <Frame11 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">AMAT</p>
      </div>
    </div>
  );
}

function Frame12() {
  return <div className="bg-[#9c27b0] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component42() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="10">
      <Frame12 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">ANET</p>
      </div>
    </div>
  );
}

function Frame13() {
  return <div className="bg-[#ff5722] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component43() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="11">
      <Frame13 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">SMH</p>
      </div>
    </div>
  );
}

function Frame14() {
  return <div className="bg-[#607d8b] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="12">
      <Frame14 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">SOXX</p>
      </div>
    </div>
  );
}

function Component32() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5]" data-name="图例">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#49A3A6] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">DDR5 16Gb</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">DDR4 16Gb</p>
        </div>
      </div>
    </div>
  );
}

function Info1() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Normalized Performance</p>
      </div>
    </div>
  );
}

function Component45() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full z-[1]" data-name="有效区">
      <div className="absolute bottom-[4px] h-[263px] right-0 w-[949px]" data-name="下载 (1) 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
    </div>
  );
}

function ChartArea() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 isolate items-start pl-[32px] py-[8px] z-[9]" data-name="Chart Area">
      <Component45 />
    </div>
  );
}

function YItem5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[8]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">400</p>
      </div>
    </div>
  );
}

function YItem6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[7]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">350</p>
      </div>
    </div>
  );
}

function YItem7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">300</p>
      </div>
    </div>
  );
}

function YItem8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">250</p>
      </div>
    </div>
  );
}

function YItem9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">200</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">150</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">100</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">50</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px relative w-full z-[3]" data-name="Y">
      <ChartArea />
      <YItem5 />
      <YItem6 />
      <YItem7 />
      <YItem8 />
      <YItem9 />
      <YItem10 />
      <YItem11 />
      <YItem12 />
    </div>
  );
}

function X1() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="X">
      <div className="content-stretch flex items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
        <div className="flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Oct</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Nov</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight:Regular',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Dec</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight:Medium',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">2026</p>
        </div>
      </div>
    </div>
  );
}

function SymbolTextBGH7() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH8() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH6() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH7 />
      <SymbolTextBGH8 />
    </div>
  );
}

function LogoAlva2() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH6 />
    </div>
  );
}

function ChartWatermark2() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[1]" data-name="Chart/Watermark">
      <LogoAlva2 />
    </div>
  );
}

function XY1() {
  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      padding: [12, 12, 12, 12],
      extraCssText: 'border-radius:6px;box-shadow:none;',
      textStyle: {
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 12,
        fontWeight: 400
      },
      axisPointer: {
        type: 'line' as const,
        lineStyle: { color: 'rgba(0,0,0,0.12)', type: 'solid' as const, width: 1 }
      },
      formatter: function(params: { color: string; seriesName: string; data: [string, number] }[]) {
        if (!params.length) return '';
        const d = new Date(params[0].data[0]);
        const title = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        let html = `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
        params.forEach((p) => {
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background-color:${p.color};vertical-align:middle"></span>`;
          html += `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: $${p.data[1].toFixed(2)}</div>`;
        });
        return html;
      }
    },
    legend: { show: false },
    grid: {
      left: 48,
      right: 16,
      top: 52,
      bottom: 28,
      containLabel: false
    },
    xAxis: {
      type: 'time' as const,
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.05)' } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        formatter: function(value: number) {
          const d = new Date(value);
          const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          const yr = String(d.getFullYear()).slice(2);
          return months[d.getMonth()] + ' ' + yr;
        }
      },
      min: '2025-02-10',
      max: '2026-02-10',
    },
    yAxis: {
      type: 'value' as const,
      name: 'Price (USD)',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 8, -36]
      },
      nameLocation: 'end' as const,
      min: 0,
      max: 80,
      interval: 20,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        formatter: '${value}'
      }
    },
    series: [
      {
        name: 'DDR5 16Gb',
        type: 'line' as const,
        data: ddr5Data.map(d => [d[0], d[1]]),
        symbol: 'none',
        smooth: 0.1,
        lineStyle: { width: 1, color: '#49A3A6' },
        itemStyle: { color: '#49A3A6' },
        emphasis: {
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1,
            color: '#49A3A6',
          }
        }
      },
      {
        name: 'DDR4 16Gb',
        type: 'line' as const,
        data: ddr4Data.map(d => [d[0], d[1]]),
        symbol: 'none',
        smooth: 0.1,
        lineStyle: { width: 1, color: '#FF9800' },
        itemStyle: { color: '#FF9800' },
        emphasis: {
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 1,
            color: '#FF9800',
          }
        }
      }
    ]
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="X+Y"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
        backgroundSize: '3px 3px'
      }}
    >
      <div className="overflow-clip rounded-[inherit] size-full relative">
        <div className="content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
          <Component32 />
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', flex: 1, minHeight: 0 }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        <ChartWatermark2 />
      </div>
    </div>
  );
}

function AiStorageWatchlistPerf() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] items-center min-h-px min-w-px relative rounded-[4px]" data-name="DRAM Price Trend">
      <WidgetTitle2 />
      <XY1 />
    </div>
  );
}

function ArrowRightLHeatmap() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function TitleHeatmap() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trading Activity Heatmap</p>
      <ArrowRightLHeatmap />
    </div>
  );
}

function ClockLHeatmap() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261_heatmap)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261_heatmap">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TimestampHeatmap() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockLHeatmap />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Live</p>
    </div>
  );
}

function WidgetTitleHeatmap() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full" data-name="Widget/Title">
      <TitleHeatmap />
      <TimestampHeatmap />
    </div>
  );
}

function LogoAlvaHeatmap() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
        <div className="absolute inset-[0_0_2.06%_70.69%]" data-name="SymbolText-b-g-h">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3909 13.7123">
            <g id="Symbol-b-g">
              <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
              <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
              <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
            <g id="SymbolText-b-g-h">
              <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChartWatermarkHeatmap() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[1]" data-name="Chart/Watermark">
      <LogoAlvaHeatmap />
    </div>
  );
}

function TradingActivityHeatmap() {
  const generateHeatmapData = () => {
    const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
                   '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const data: [number, number, number][] = [];
    days.forEach((day, i) => {
      hours.forEach((hour, j) => {
        const value = Math.floor(Math.random() * 100);
        data.push([j, i, value]);
      });
    });
    
    return { hours, days, data };
  };

  const { hours, days, data } = generateHeatmapData();

  const option = {
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 11
      },
      formatter: (params: any) => {
        return `${days[params.data[1]]}, ${hours[params.data[0]]}<br/><strong>${params.data[2]}%</strong>`;
      }
    },
    grid: {
      left: 50,
      top: 20,
      right: 20,
      bottom: 50,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 9
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 10
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 5,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Delight, sans-serif',
        fontSize: 9
      },
      inRange: {
        color: [
          'rgba(73, 163, 166, 0.1)',
          'rgba(73, 163, 166, 0.3)',
          'rgba(73, 163, 166, 0.5)',
          'rgba(73, 163, 166, 0.7)',
          'rgba(73, 163, 166, 1)'
        ]
      }
    },
    series: [
      {
        name: 'Trading Activity',
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(73, 163, 166, 0.4)',
            borderColor: 'rgba(73, 163, 166, 1)',
            borderWidth: 1
          }
        }
      }
    ]
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[370px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Trading Activity Heatmap">
      <WidgetTitleHeatmap />
      <div className="bg-[rgba(0,0,0,0.02)] flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="X+Y">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col isolate items-start relative size-full p-[16px]">
            <ReactECharts 
              option={option} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
            <ChartWatermarkHeatmap />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightL3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Forward Valuation Comparison</p>
      <ArrowRightL3 />
    </div>
  );
}

function ClockL3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">02/12/2026 12:30</p>
    </div>
  );
}

function WidgetTitle3() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full" data-name="Widget/Title">
      <Title3 />
      <Timestamp3 />
    </div>
  );
}

function Frame15() {
  return <div className="bg-[#7777d9] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component47() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="4">
      <Frame15 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">TTM P/E</p>
      </div>
    </div>
  );
}

function Frame16() {
  return <div className="bg-[#4caf50] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component48() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="3">
      <Frame16 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Forward P/E</p>
      </div>
    </div>
  );
}

function Frame17() {
  return <div className="bg-[#ff9800] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component49() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="2">
      <Frame17 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">EV/EBITDA (TTM)</p>
      </div>
    </div>
  );
}

function Frame18() {
  return <div className="bg-[#5499d6] rounded-[100px] shrink-0 size-[8px]" data-name="Frame" />;
}

function Component50() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="1">
      <Frame18 />
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Price/Sales (TTM)</p>
      </div>
    </div>
  );
}

function Component46() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end relative shrink-0 w-full z-[5]" data-name="图例">
      <Component47 />
      <Component48 />
      <Component49 />
      <Component50 />
    </div>
  );
}

function Info2() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Valuation Multiple</p>
      </div>
    </div>
  );
}

function Frame19() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[63px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[140px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar1() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[54px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar2() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[33px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar3() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function BarItem() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[10]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar />
          <Bar1 />
          <Bar2 />
          <Bar3 />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[159px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar4() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[153px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar5() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[88px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar6() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[19px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar7() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function BarItem1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[9]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar4 />
          <Bar5 />
          <Bar6 />
          <Bar7 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[83px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar8() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[119px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar9() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[57px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar10() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[31px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar11() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function BarItem2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[8]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar8 />
          <Bar9 />
          <Bar10 />
          <Bar11 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[47px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar12() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[46px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar13() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[30px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar14() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame33 />
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[16px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar15() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function BarItem3() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[7]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar12 />
          <Bar13 />
          <Bar14 />
          <Bar15 />
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[43px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar16() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame35 />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[120px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar17() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[37px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar18() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[13px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar19() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function BarItem4() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[6]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar16 />
          <Bar17 />
          <Bar18 />
          <Bar19 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[55px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar20() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame39 />
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[112px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar21() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame40 />
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[42px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar22() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame41 />
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[13px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar23() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame42 />
        </div>
      </div>
    </div>
  );
}

function BarItem5() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[5]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar20 />
          <Bar21 />
          <Bar22 />
          <Bar23 />
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[60px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar24() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame43 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[175px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar25() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[47px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar26() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame45 />
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[22px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar27() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame46 />
        </div>
      </div>
    </div>
  );
}

function BarItem6() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[4]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar24 />
          <Bar25 />
          <Bar26 />
          <Bar27 />
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[60px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar28() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[191px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar29() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame48 />
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[47px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar30() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame49 />
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[19px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar31() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame50 />
        </div>
      </div>
    </div>
  );
}

function BarItem7() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[3]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar28 />
          <Bar29 />
          <Bar30 />
          <Bar31 />
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[48px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar32() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame51 />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[134px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar33() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[34px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar34() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame53 />
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[15px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar35() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function BarItem8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[2]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar32 />
          <Bar33 />
          <Bar34 />
          <Bar35 />
        </div>
      </div>
    </div>
  );
}

function Frame55() {
  return <div className="bg-[#7777d9] flex-[1_0_0] h-[65px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar36() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame55 />
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return <div className="bg-[#4caf50] flex-[1_0_0] h-[178px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar37() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame56 />
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return <div className="bg-[#ff9800] flex-[1_0_0] h-[54px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar38() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame57 />
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return <div className="bg-[#5499d6] flex-[1_0_0] h-[28px] min-h-px min-w-px rounded-[1px]" data-name="Frame" />;
}

function Bar39() {
  return (
    <div className="flex-[1_0_0] h-full max-w-[20px] min-h-px min-w-px relative" data-name="Bar">
      <div className="flex flex-row items-end max-w-[inherit] size-full">
        <div className="content-stretch flex items-end max-w-[inherit] pt-[240px] relative size-full">
          <Frame58 />
        </div>
      </div>
    </div>
  );
}

function BarItem9() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative z-[1]" data-name="barItem">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-end justify-center px-[8px] relative size-full">
          <Bar36 />
          <Bar37 />
          <Bar38 />
          <Bar39 />
        </div>
      </div>
    </div>
  );
}

function Component52() {
  return (
    <div className="absolute bottom-0 content-stretch flex h-[224px] isolate items-end left-0 overflow-clip w-[642px]" data-name="有效区">
      <BarItem />
      <BarItem1 />
      <BarItem2 />
      <BarItem3 />
      <BarItem4 />
      <BarItem5 />
      <BarItem6 />
      <BarItem7 />
      <BarItem8 />
      <BarItem9 />
    </div>
  );
}

function Component51() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full z-[1]" data-name="有效区">
      <Component52 />
    </div>
  );
}

function ChartArea1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 isolate items-start pl-[32px] py-[8px] z-[8]" data-name="Chart Area">
      <Component51 />
    </div>
  );
}

function YItem13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[7]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">180</p>
      </div>
    </div>
  );
}

function YItem14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">150</p>
      </div>
    </div>
  );
}

function YItem15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">120</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">90</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">60</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">30</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function YItem19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">0</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px relative w-full z-[3]" data-name="Y">
      <ChartArea1 />
      <YItem13 />
      <YItem14 />
      <YItem15 />
      <YItem16 />
      <YItem17 />
      <YItem18 />
      <YItem19 />
    </div>
  );
}

function X2() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="X">
      <div className="content-stretch flex font-['Delight:Regular',sans-serif] items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">NVDA</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">AMD</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">AVGO</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">MU</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">WDC</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">STX</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">KLAC</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">LRCX</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">AMAT</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">ANET</p>
        </div>
      </div>
    </div>
  );
}

function SymbolTextBGH10() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH11() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH9() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH10 />
      <SymbolTextBGH11 />
    </div>
  );
}

function LogoAlva3() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH9 />
    </div>
  );
}

function ValuationLegend() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5]" data-name="图例">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#49A3A6] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">MU</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">SNDK</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#40A544] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">WDC</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#5F75C9] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">STX</p>
        </div>
      </div>
    </div>
  );
}

function ChartWatermark3() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[1]" data-name="Chart/Watermark">
      <LogoAlva3 />
    </div>
  );
}

function XY2() {
  const barLabelStyle = {
    show: true,
    position: 'top' as const,
    fontSize: 9,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
    distance: 4,
    formatter: (p: { value: number }) => p.value.toFixed(1) + 'x'
  };
  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(0,0,0,0.08)',
      borderWidth: 1,
      padding: [12, 12, 12, 12],
      extraCssText: 'border-radius:6px;box-shadow:none;',
      textStyle: {
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 12,
        fontWeight: 400
      },
      axisPointer: {
        type: 'shadow' as const,
        shadowStyle: { color: 'rgba(0, 0, 0, 0.03)' }
      },
      formatter: function(params: { color: string; seriesName: string; value: number; axisValueLabel: string }[]) {
        if (!params.length) return '';
        const title = params[0].axisValueLabel;
        let html = `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.7);margin-bottom:6px">${title}</div>`;
        params.forEach(p => {
          const dot = `<span style="display:inline-block;margin-right:4px;border-radius:50%;width:8px;height:8px;background-color:${p.color};vertical-align:middle"></span>`;
          html += `<div style="font-family:'Delight',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:400;color:rgba(0,0,0,0.9);line-height:20px">${dot}${p.seriesName}: ${p.value.toFixed(2)}x</div>`;
        });
        return html;
      }
    },
    legend: { show: false },
    grid: {
      left: 48,
      right: 16,
      top: 52,
      bottom: 28,
      containLabel: false
    },
    xAxis: {
      type: 'category' as const,
      data: ['Forward P/E', 'Forward P/S', 'Forward EV/EBITDA'],
      axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.05)' } },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value' as const,
      name: 'Valuation',
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 8, -36]
      },
      nameLocation: 'end' as const,
      min: 0,
      max: 35,
      interval: 5,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: "'Delight', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: 10,
        formatter: '{value}x'
      }
    },
    series: [
      {
        name: 'MU',
        type: 'bar' as const,
        data: [11.45, 2.52, 5.54],
        itemStyle: { color: '#49A3A6', borderRadius: [2, 2, 0, 0] },
        barMaxWidth: 16,
        barCategoryGap: '56%',
        barGap: '50%',
        label: barLabelStyle
      },
      {
        name: 'SNDK',
        type: 'bar' as const,
        data: [25.10, 6.01, 20.0],
        itemStyle: { color: '#FF9800', borderRadius: [2, 2, 0, 0] },
        barMaxWidth: 16,
        label: barLabelStyle
      },
      {
        name: 'WDC',
        type: 'bar' as const,
        data: [11.36, 1.50, 11.25],
        itemStyle: { color: '#40A544', borderRadius: [2, 2, 0, 0] },
        barMaxWidth: 16,
        label: barLabelStyle
      },
      {
        name: 'STX',
        type: 'bar' as const,
        data: [22.04, 6.16, 30.10],
        itemStyle: { color: '#5F75C9', borderRadius: [2, 2, 0, 0] },
        barMaxWidth: 16,
        label: barLabelStyle
      }
    ]
  };

  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="X+Y"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.18) 0.6px, transparent 0.6px)',
        backgroundSize: '3px 3px'
      }}
    >
      <div className="overflow-clip rounded-[inherit] size-full relative">
        <div className="content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
          <ValuationLegend />
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', flex: 1, minHeight: 0 }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        <ChartWatermark3 />
      </div>
    </div>
  );
}

function AiStorageValuationComps() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[370px] items-center min-h-px min-w-px relative rounded-[4px]" data-name="Forward Valuation Comparison">
      <WidgetTitle3 />
      <XY2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="Group">
      <AiStorageWatchlistPerf />
      <AiStorageValuationComps />
    </div>
  );
}

function SymbolTextBGH13() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH14() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH12() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH13 />
      <SymbolTextBGH14 />
    </div>
  );
}

function LogoAlva4() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH12 />
    </div>
  );
}

function ChartWatermark4() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[3]" data-name="Chart/Watermark">
      <LogoAlva4 />
    </div>
  );
}

function ArrowRightL4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Storage Watchlist</p>
      <ArrowRightL4 />
    </div>
  );
}

function ClockL4() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
    </div>
  );
}

function WidgetTitle4() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title4 />
      <Timestamp4 />
    </div>
  );
}

function SortF() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Ticker</p>
          <SortF />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid1() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">MU</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid2() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">WDC</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid3() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">STX</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid4() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">TSM</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid5() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">VRT</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid6() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">SMCI</p>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid />
      <TableItemGrid1 />
      <TableItemGrid2 />
      <TableItemGrid3 />
      <TableItemGrid4 />
      <TableItemGrid5 />
      <TableItemGrid6 />
    </div>
  );
}

function SortF1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid7() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Last Price</p>
          <SortF1 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid8() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">399.65</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid9() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">236.39</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid10() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">346.10</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid11() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">334.88</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid12() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">182.49</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid13() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">31.70</p>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid7 />
      <TableItemGrid8 />
      <TableItemGrid9 />
      <TableItemGrid10 />
      <TableItemGrid11 />
      <TableItemGrid12 />
      <TableItemGrid13 />
    </div>
  );
}

function SortF2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid14() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1D %</p>
          <SortF2 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid15() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">0.52%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid16() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-2.84%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid17() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-0.12%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid18() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.29%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid19() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">0.76%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid20() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-2.31%</p>
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid14 />
      <TableItemGrid15 />
      <TableItemGrid16 />
      <TableItemGrid17 />
      <TableItemGrid18 />
      <TableItemGrid19 />
      <TableItemGrid20 />
    </div>
  );
}

function SortF3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid21() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1W %</p>
          <SortF3 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid22() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">18.72%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid23() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6.43%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid24() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">8.05%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid25() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-1.98%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid26() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">5.77%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid27() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">7.75%</p>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid21 />
      <TableItemGrid22 />
      <TableItemGrid23 />
      <TableItemGrid24 />
      <TableItemGrid25 />
      <TableItemGrid26 />
      <TableItemGrid27 />
    </div>
  );
}

function SortF4() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid28() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1M %</p>
          <SortF4 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid29() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">44.49%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid30() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">33.74%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid31() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">22.36%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid32() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">14.18%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid33() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">9.77%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid34() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.03%</p>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid28 />
      <TableItemGrid29 />
      <TableItemGrid30 />
      <TableItemGrid31 />
      <TableItemGrid32 />
      <TableItemGrid33 />
      <TableItemGrid34 />
    </div>
  );
}

function SortF5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid35() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">3M %</p>
          <SortF5 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid36() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">101.37%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid37() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">96.22%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid38() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">60.94%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid39() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">15.92%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid40() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6.35%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid41() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-39.62%</p>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid35 />
      <TableItemGrid36 />
      <TableItemGrid37 />
      <TableItemGrid38 />
      <TableItemGrid39 />
      <TableItemGrid40 />
      <TableItemGrid41 />
    </div>
  );
}

function SortF6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid42() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">YTD %</p>
          <SortF6 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid43() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">26.70%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid44() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">25.94%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid45() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">20.37%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid46() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">4.77%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid47() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">3.92%</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid48() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.39%</p>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid42 />
      <TableItemGrid43 />
      <TableItemGrid44 />
      <TableItemGrid45 />
      <TableItemGrid46 />
      <TableItemGrid47 />
      <TableItemGrid48 />
    </div>
  );
}

function SortF7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid49() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">52W High</p>
          <SortF7 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid50() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">412.43</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid51() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">247.94</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid52() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">350.05</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid53() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">351.33</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid54() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">202.45</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid55() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">66.44</p>
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid49 />
      <TableItemGrid50 />
      <TableItemGrid51 />
      <TableItemGrid52 />
      <TableItemGrid53 />
      <TableItemGrid54 />
      <TableItemGrid55 />
    </div>
  );
}

function SortF8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid56() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">52W Low</p>
          <SortF8 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid57() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">61.54</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid58() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">28.83</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid59() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">63.19</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid60() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">134.25</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid61() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">53.60</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid62() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">25.71</p>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid56 />
      <TableItemGrid57 />
      <TableItemGrid58 />
      <TableItemGrid59 />
      <TableItemGrid60 />
      <TableItemGrid61 />
      <TableItemGrid62 />
    </div>
  );
}

function SortF9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid63() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Avg Vol 30D</p>
          <SortF9 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid64() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">26,909,216</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid65() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6,472,615</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid66() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2,795,527</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid67() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">11,633,277</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid68() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">5,176,158</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid69() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">24,359,645</p>
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid63 />
      <TableItemGrid64 />
      <TableItemGrid65 />
      <TableItemGrid66 />
      <TableItemGrid67 />
      <TableItemGrid68 />
      <TableItemGrid69 />
    </div>
  );
}

function SortF10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="sort-f">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="sort-f">
          <path d={svgPaths.p2a699a40} fill="var(--fill-0, black)" fillOpacity="0.2" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TableItemGrid70() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Market Cap</p>
          <SortF10 />
        </div>
      </div>
    </div>
  );
}

function TableItemGrid71() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$449.81B</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid72() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$81.03B</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid73() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$73.91B</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid74() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$1.74T</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid75() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$69.77B</p>
        </div>
      </div>
    </div>
  );
}

function TableItemGrid76() {
  return (
    <div className="bg-[#fafafa] h-[46px] relative shrink-0 w-full" data-name="Table Item/Grid">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[12px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$18.92B</p>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[88px] relative">
      <TableItemGrid70 />
      <TableItemGrid71 />
      <TableItemGrid72 />
      <TableItemGrid73 />
      <TableItemGrid74 />
      <TableItemGrid75 />
      <TableItemGrid76 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex items-start max-h-[332px] overflow-clip relative rounded-[6px] shrink-0 w-full z-[1]" data-name="Table">
      <Frame59 />
      <Frame60 />
      <Frame61 />
      <Frame62 />
      <Frame63 />
      <Frame64 />
      <Frame65 />
      <Frame66 />
      <Frame67 />
      <Frame68 />
      <Frame69 />
    </div>
  );
}

function WidgetTable() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] isolate items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Widget/Table">
      <ChartWatermark4 />
      <WidgetTitle4 />
      <Table />
    </div>
  );
}

function SymbolTextBGH16() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH17() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH15() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH16 />
      <SymbolTextBGH17 />
    </div>
  );
}

function LogoAlva5() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH15 />
    </div>
  );
}

function ChartWatermark5() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[3]" data-name="Chart/Watermark">
      <LogoAlva5 />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p1a857180} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRightL5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <LeftIcon />
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trending Threads</p>
      <ArrowRightL5 />
    </div>
  );
}

function ClockL5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle5() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title5 />
      <Timestamp5 />
    </div>
  );
}

function Info3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img3} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Marty Chargin</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@MartyChargin</p>
    </div>
  );
}

function Basic() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 24</p>
    </div>
  );
}

function XReplyL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">8</p>
    </div>
  );
}

function XRepostL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2</p>
    </div>
  );
}

function XLikeL() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">33</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[#49a3a6]">$SNDK</span>
            <span className="leading-[22px]">{` ... This stock is not only kissing its 5 day line... it is on second base and ready for a triple.... maybe they need to get a room now?`}</span>
          </p>
          <Frame71 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic />
      <Content />
    </div>
  );
}

function Component53() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage5} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main />
        <Component53 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Info4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img4} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">FLUX</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@FluxAlgo_TA</p>
    </div>
  );
}

function Basic1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 21</p>
    </div>
  );
}

function XReplyL1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL1 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">0</p>
    </div>
  );
}

function XRepostL1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL1 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2</p>
    </div>
  );
}

function XLikeL1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL1 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">3</p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group5 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[#49a3a6]">$NVDA</span>
            <span className="leading-[22px]">{` Blue line crosses below the zero level – short-term bearish signal confirmed, more downside likely.`}</span>
          </p>
          <Frame72 />
        </div>
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic1 />
      <Content1 />
    </div>
  );
}

function Component54() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage6} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main1 />
        <Component54 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Info5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img5} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Justin Banks</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@RealJGBanks</p>
    </div>
  );
}

function Basic2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 12</p>
    </div>
  );
}

function XReplyL2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL2 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">30</p>
    </div>
  );
}

function XRepostL2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL2 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">261</p>
    </div>
  );
}

function XLikeL2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL2 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">1.1K</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group8 />
      <Group9 />
      <Group10 />
    </div>
  );
}

function Content2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="leading-[22px]">
              AI’S NEXT BOTTLENECK: MEMORY (2026)
              <br aria-hidden="true" />
              {`If you missed `}
            </span>
            <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[#49a3a6]">$MU</span>
            <span className="leading-[22px]">
              <br aria-hidden="true" />
              <br aria-hidden="true" />
              Do not miss the rest of the memory run:
            </span>
          </p>
          <Frame73 />
        </div>
      </div>
    </div>
  );
}

function Main2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic2 />
      <Content2 />
    </div>
  );
}

function Component55() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage7} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main2 />
        <Component55 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Info6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img6} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Shay Boloor</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@StockSavvyShay</p>
    </div>
  );
}

function Basic3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info6 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 11</p>
    </div>
  );
}

function XReplyL3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">91</p>
    </div>
  );
}

function XRepostL3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">465</p>
    </div>
  );
}

function XLikeL3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2.1K</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group11 />
      <Group12 />
      <Group13 />
    </div>
  );
}

function Content3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <p className="font-['Delight:Regular',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight:Medium',sans-serif] leading-[22px] text-[#49a3a6]">$MU</span>
            <span className="leading-[22px]">{` just announced the largest semiconductor manufacturing facility in U.S. history with a $100B advanced memory megafab in New York.`}</span>
          </p>
          <Frame74 />
        </div>
      </div>
    </div>
  );
}

function Main3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic3 />
      <Content3 />
    </div>
  );
}

function Component56() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage8} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main3 />
        <Component56 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Info7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img7} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Lin</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@Speculator_io</p>
    </div>
  );
}

function Basic4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info7 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 7</p>
    </div>
  );
}

function XReplyL4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">29</p>
    </div>
  );
}

function XRepostL4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">251</p>
    </div>
  );
}

function XLikeL4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">1.2K</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group14 />
      <Group15 />
      <Group16 />
    </div>
  );
}

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <div className="font-['Delight:Regular',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[0px] text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <p className="leading-[22px] mb-0">{`We're in an AI memory supercycle:`}</p>
            <p>
              <span className="leading-[22px]">{`HBM: `}</span>
              <span className="font-['Delight:Medium',sans-serif] leading-[22px] not-italic text-[#49a3a6] tracking-[0.14px]">$MU</span>
              <span className="leading-[22px]">{` SK hynix Samsung`}</span>
            </p>
          </div>
          <Frame75 />
        </div>
      </div>
    </div>
  );
}

function Main4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic4 />
      <Content4 />
    </div>
  );
}

function Component57() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage9} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main4 />
        <Component57 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Info8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative" data-name="Info">
      <div className="relative shrink-0 size-[22px]" data-name="头像">
        <img alt="" className="block max-w-none size-full" height="22" src={img8} width="22" />
      </div>
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Shantaram</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@shantaram83</p>
    </div>
  );
}

function Basic5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info8 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan7</p>
    </div>
  );
}

function XReplyL5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-reply-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-reply-l">
          <path d={svgPaths.p106b9dc0} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XReplyL5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">28K</p>
    </div>
  );
}

function XRepostL5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-repost-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-repost-l">
          <path d={svgPaths.p1e022100} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XRepostL5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">118K</p>
    </div>
  );
}

function XLikeL5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="x-like-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="x-like-l">
          <path d={svgPaths.p33811000} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Group19() {
  return (
    <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
      <XLikeL5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">4.3K</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Group17 />
      <Group18 />
      <Group19 />
    </div>
  );
}

function Content5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center pl-[26px] relative w-full">
          <div className="font-['Delight:Regular',sans-serif] h-[44px] leading-[22px] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <p className="mb-0">Picked up a little memory</p>
            <p>$MU $SNDK $WDC $STX</p>
          </div>
          <Frame76 />
        </div>
      </div>
    </div>
  );
}

function Main5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Basic5 />
      <Content5 />
    </div>
  );
}

function Component58() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图频">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage10} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main5 />
        <Component58 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip py-[4px] relative rounded-[6px] w-full z-[1]" data-name="Frame">
      <WidgetsItemList />
      <WidgetsItemList1 />
      <WidgetsItemList2 />
      <WidgetsItemList3 />
      <WidgetsItemList4 />
      <WidgetsItemList5 />
    </div>
  );
}

function WidgetList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[640px] isolate items-center min-h-px min-w-px relative rounded-[4px]" data-name="Widget/List">
      <ChartWatermark5 />
      <WidgetTitle5 />
      <Frame70 />
    </div>
  );
}

function SymbolTextBGH19() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH20() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH18() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH19 />
      <SymbolTextBGH20 />
    </div>
  );
}

function LogoAlva6() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH18 />
    </div>
  );
}

function ChartWatermark6() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[3]" data-name="Chart/Watermark">
      <LogoAlva6 />
    </div>
  );
}

function ArrowRightL6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trending Posts</p>
      <ArrowRightL6 />
    </div>
  );
}

function ClockL6() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL6 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title6 />
      <Timestamp6 />
    </div>
  );
}

function LogoSocial() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo/Social">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute aspect-[960/960] bottom-0 left-1/2 rounded-[100px] top-0" data-name="image 35">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage35} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Info9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Morningstar</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 25</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Tori Brovet</p>
    </div>
  );
}

function Main6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">The Best AI Stocks to Buy Now</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">These stock picks stand to benefit most from developing artificial intelligence technologies in 2026.</p>
      <Info9 />
    </div>
  );
}

function Component59() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage11} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList6() {
  return (
    <div className="relative shrink-0 w-full z-[6]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main6 />
        <Component59 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function LogoSocial1() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo/Social">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute aspect-[960/960] bottom-0 left-1/2 rounded-[100px] top-0" data-name="image 35">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage36} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Info10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial1 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Seeking Alpha</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 24</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Chris Ciaccia</p>
    </div>
  );
}

function Main7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Memory is the hottest part of the market. Can the rally continue?</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">Spurred by insatiable demand from data centers and all things related to artificial intelligence, memory, and storage makers have become the hottest part of the stock market.</p>
      <Info10 />
    </div>
  );
}

function Component60() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage12} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList7() {
  return (
    <div className="relative shrink-0 w-full z-[5]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main7 />
        <Component60 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function LogoSocial2() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo/Social">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute aspect-[960/960] bottom-0 left-1/2 rounded-[100px] top-0" data-name="image 35">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage37} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Info11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial2 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Yahoo Finance</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 22</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Rich Duprey</p>
    </div>
  );
}

function Main8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">SanDisk Stock Keeps Surging. Did You Miss Your Chance to Buy?</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">SanDisk (SNDK) was spun off from Western Digital (WDC) last February, marking a strategic separation to unlock value in its flash memory business. Since then, the company has delivered a master class in market dominance, capitalizing on surging demand for NAND flash driven by artificial intelligence (AI) and data centers.</p>
      <Info11 />
    </div>
  );
}

function Component61() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage13} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList8() {
  return (
    <div className="relative shrink-0 w-full z-[4]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main8 />
        <Component61 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function LogoSocial3() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo/Social">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute aspect-[960/960] bottom-0 left-1/2 rounded-[100px] top-0" data-name="image 35">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage38} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Info12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial3 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">{`Podcast `}</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 21</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By mcgrof</p>
    </div>
  );
}

function Main9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Storage-next: Do We Need New Hardware for AI Storage, or Just Better Layouts?</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">{`We review the "Storage-Next" paper, published in November 2025, which argues that a fundamental hardware architectural shift is required to elevate NAND flash from a passive storage tier to an active memory tier capable of "seconds-scale" caching. The authors contend that standard SSDs impose a "channel-side ceiling" on IOPS because they are optimized for 4KB blocks, creating massive bandwidth waste when AI applications demand fine-grained access to small items, such as 128-byte embedding vectors. To solve this, they propose specialized "Storage-Next" drives capable of scalable IOPS for small block sizes (e.g., 50M IOPS at 512B), arguing this hardware is necessary to simplify software stacks and enable high-throughput random access without the read amplification penalties inherent in current technology.`}</p>
      <Info12 />
    </div>
  );
}

function Play() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[28px] top-1/2" data-name="play">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="play">
          <circle cx="14" cy="14" fill="var(--fill-0, black)" id="Ellipse" r="12.1" stroke="var(--stroke-0, white)" />
          <path d={svgPaths.p200cc020} fill="var(--fill-0, white)" id="Polygon" />
        </g>
      </svg>
    </div>
  );
}

function Component62() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage14} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
      <Play />
    </div>
  );
}

function WidgetsItemList9() {
  return (
    <div className="relative shrink-0 w-full z-[3]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main9 />
        <Component62 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function LogoSocial4() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[16px]" data-name="Logo/Social">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 absolute aspect-[960/960] bottom-0 left-1/2 rounded-[100px] top-0" data-name="image 35">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgImage37} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Info13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial4 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Yahoo Finance</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 8</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Joey Frenette</p>
    </div>
  );
}

function Main10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Memory Chip Stocks are Red-Hot. Is it Too Late to Buy?</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">{`The memory chip stocks have been really heating up to start the year, thanks in part to the AI-driven RAM shortage, which could last well into the year's end and perhaps beyond. Undoubtedly, AI demand is showing no signs of slowing down, and as the high-performance memory needs continue to blast off, questions linger as to how the top memory players can step up to meet the needs of this unprecedented boom.`}</p>
      <Info13 />
    </div>
  );
}

function Component63() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage13} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList10() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main10 />
        <Component63 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute inset-[15.52%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11.0345">
        <g id="Group">
          <path d={svgPaths.p392f8080} fill="var(--fill-0, #FF0033)" id="Vector" />
          <path d={svgPaths.p24b27780} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function LogoSocial5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Logo/Social">
      <Group20 />
    </div>
  );
}

function Info14() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Info">
      <LogoSocial5 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Youtube</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 6</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Extrinsic Trades</p>
    </div>
  );
}

function Main11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">MU, STX, SNDK, WDC, CRDO Stock Analysis 2026</p>
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">
        {`📈 Stock Technical Analysis | MU, STX, SNDK, WDC & CRDO`}
        <br aria-hidden="true" />
        Micron Technology (MU), Seagate Technology (STX), SanDisk (SNDK), Western Digital (WDC), and Credo Technology (CRDO).
      </p>
      <Info14 />
    </div>
  );
}

function Component64() {
  return (
    <div className="h-[70px] relative shrink-0 w-[88px]" data-name="图文">
      <div className="absolute inset-0 pointer-events-none rounded-[4px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={imgImage15} />
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.07)] border-solid inset-0 rounded-[4px]" />
      </div>
    </div>
  );
}

function WidgetsItemList11() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Widgets/Item/List">
      <div className="content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
        <Main11 />
        <Component64 />
        <div className="absolute bg-[rgba(0,0,0,0.05)] bottom-0 h-px left-[16px] right-[16.33px]" data-name="D" />
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px min-w-px overflow-clip py-[4px] relative rounded-[6px] w-full z-[1]" data-name="Frame">
      <WidgetsItemList6 />
      <WidgetsItemList7 />
      <WidgetsItemList8 />
      <WidgetsItemList9 />
      <WidgetsItemList10 />
      <WidgetsItemList11 />
    </div>
  );
}

function WidgetList1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[640px] isolate items-center min-h-px min-w-px relative rounded-[4px]" data-name="Widget/List">
      <ChartWatermark6 />
      <WidgetTitle6 />
      <Frame77 />
    </div>
  );
}

function SymbolTextBGH22() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH23() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH21() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH22 />
      <SymbolTextBGH23 />
    </div>
  );
}

function LogoAlva7() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH21 />
    </div>
  );
}

function ChartWatermark7() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[3]" data-name="Chart/Watermark">
      <LogoAlva7 />
    </div>
  );
}

function ArrowRightL7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Earnings Calls</p>
      <ArrowRightL7 />
    </div>
  );
}

function ClockL7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL7 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle7() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title7 />
      <Timestamp7 />
    </div>
  );
}

function LogoStock() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock} />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">in 1d</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">STX 2026 Q2 Earnings Call</p>
      <Tag />
    </div>
  );
}

function Frame80() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
          <p className="max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">Event upcoming</p>
          <p className="relative shrink-0 w-full whitespace-pre-wrap">01/28/2026 06:00</p>
        </div>
      </div>
    </div>
  );
}

function Main12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame79 />
      <Frame80 />
    </div>
  );
}

function WidgetsNewsItem() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main12 />
      </div>
    </div>
  );
}

function LogoStock1() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock1} />
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[rgba(42,155,125,0.1)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+17.9%</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock1 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">MU 2026 Q1 Earnings Call</p>
      <Tag1 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
          <p className="h-[20px] max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">Record financial performance with supply constraints: Micron achieved record gross margins of ~68% in Q1 fiscal 2026 and generated near 30% free cash flow margin, while being unable to meet substantial customer demand across DRAM, HBM, and NAND segments due to industrywide supply constraints that are expected to persist for the foreseeable future.</p>
          <p className="relative shrink-0 w-full whitespace-pre-wrap">12/18/2025 07:00</p>
        </div>
      </div>
    </div>
  );
}

function Main13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame81 />
      <Frame82 />
    </div>
  );
}

function WidgetsNewsItem1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main13 />
      </div>
    </div>
  );
}

function LogoStock2() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock2} />
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[rgba(42,155,125,0.1)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+5.88%</p>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock2 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">SNDK 2026 Q1 Earnings Call</p>
      <Tag2 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
          <p className="h-[20px] max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">SanDisk delivered strong Q1 FY26 results with revenue of $2.38 billion (up 21% QoQ, 23% YoY), non-GAAP EPS of $1.22, and $448 million in adjusted free cash flow; net cash position achieved six months ahead of target.</p>
          <p className="relative shrink-0 w-full whitespace-pre-wrap">11/08/2026 05:30</p>
        </div>
      </div>
    </div>
  );
}

function Main14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame83 />
      <Frame84 />
    </div>
  );
}

function WidgetsNewsItem2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main14 />
      </div>
    </div>
  );
}

function LogoStock3() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock3} />
    </div>
  );
}

function Tag3() {
  return (
    <div className="bg-[rgba(42,155,125,0.1)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+3.14%</p>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock3 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">WDC 2026 Q1 Earnings Call</p>
      <Tag3 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
          <p className="h-[20px] max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">Western Digital reported Q1 FY26 revenue of $2.8 billion (up 27% YoY), non-GAAP gross margin of 43.9%, non-GAAP EPS of $1.78, and free cash flow of $599 million; cloud represented 89% of total revenue.</p>
          <p className="relative shrink-0 w-full whitespace-pre-wrap">10/31/2025 04:30</p>
        </div>
      </div>
    </div>
  );
}

function Main15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame85 />
      <Frame86 />
    </div>
  );
}

function WidgetsNewsItem3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main15 />
      </div>
    </div>
  );
}

function LogoStock4() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock4} />
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[rgba(224,83,87,0.1)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#e05357] text-[12px] text-center tracking-[0.12px]">-7.14%</p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock4 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">SMCI 2026 Q1 Earnings Call</p>
      <Tag4 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full whitespace-pre-wrap">
          <p className="h-[40px] max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full">Seagate reported strong fiscal Q1 2026 results: revenue grew 21% year-over-year to $2.63B, non-GAAP gross margin reached a record 40.1%, and non-GAAP operating margin climbed to 29%; non-GAAP EPS was $2.61, exceeding guidance.</p>
          <p className="relative shrink-0 w-full">10/29/2025 05:00</p>
        </div>
      </div>
    </div>
  );
}

function Main16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame87 />
      <Frame88 />
    </div>
  );
}

function WidgetsNewsItem4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main16 />
      </div>
    </div>
  );
}

function LogoStock5() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[22px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock1} />
    </div>
  );
}

function Tag5() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex items-center justify-center px-[8px] py-px relative rounded-[4px] shrink-0" data-name="Tag">
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">0.00%</p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock5 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">MU 2025 Q4 Earnings Call</p>
      <Tag5 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight:Regular',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
          <p className="h-[20px] max-h-[44px] overflow-hidden relative shrink-0 text-ellipsis w-full whitespace-nowrap">Micron expects significant improvement in the NAND industry in calendar 2026, driven by increased demand from hyperscalers for AI server deployments, while DRAM market conditions are already tight and expected to tighten further.</p>
          <p className="relative shrink-0 w-full whitespace-pre-wrap">12/18/2025 07:00</p>
        </div>
      </div>
    </div>
  );
}

function Main17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <Frame89 />
      <Frame90 />
    </div>
  );
}

function WidgetsNewsItem5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Widgets/News/Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Main17 />
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip py-[4px] relative rounded-[6px] w-full z-[1]" data-name="Frame">
      <WidgetsNewsItem />
      <WidgetsNewsItem1 />
      <WidgetsNewsItem2 />
      <WidgetsNewsItem3 />
      <WidgetsNewsItem4 />
      <WidgetsNewsItem5 />
    </div>
  );
}

function WidgetList2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] h-[640px] isolate items-center min-h-px min-w-px relative rounded-[4px]" data-name="Widget/List">
      <ChartWatermark7 />
      <WidgetTitle7 />
      <Frame78 />
    </div>
  );
}

function Posts() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Posts">
      <WidgetList />
      <WidgetList1 />
      <WidgetList2 />
    </div>
  );
}

function ArrowRightL8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Google Trend - AI Storage</p>
      <ArrowRightL8 />
    </div>
  );
}

function ClockL8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL8 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title8 />
      <Timestamp8 />
    </div>
  );
}

function Info15() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Interest Over TIme</p>
      </div>
    </div>
  );
}

function Component65() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="有效区">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 305 216">
        <g clipPath="url(#clip0_23_25667)" id="ææåº">
          <path d={svgPaths.p3b8f8380} fill="url(#paint0_linear_23_25667)" id="Vector 1" stroke="var(--stroke-0, #7777D9)" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_25667" x1="138.044" x2="138.044" y1="10.1868" y2="217.612">
            <stop stopColor="#7777D9" stopOpacity="0.15" />
            <stop offset="1" stopColor="#7777D9" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_23_25667">
            <rect fill="white" height="216" width="305" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ChartArea2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.33px_0_0] items-start pl-[32px] py-[8px] z-[7]" data-name="Chart Area">
      <Component65 />
    </div>
  );
}

function YItem20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">100</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">80</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">60</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">40</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">20</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">0</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px relative w-full z-[3]" data-name="Y">
      <ChartArea2 />
      <YItem20 />
      <YItem21 />
      <YItem22 />
      <YItem23 />
      <YItem24 />
      <YItem25 />
    </div>
  );
}

function SymbolTextBGH25() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH26() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH24() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH25 />
      <SymbolTextBGH26 />
    </div>
  );
}

function LogoAlva8() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH24 />
    </div>
  );
}

function ChartWatermark8() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[2]" data-name="Chart/Watermark">
      <LogoAlva8 />
    </div>
  );
}

function X3() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="X">
      <div className="content-stretch flex font-['Delight:Regular',sans-serif] items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Dec 28</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 04</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 11</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 18</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 25</p>
        </div>
      </div>
    </div>
  );
}

function XY3() {
  return (
    <div className="bg-[rgba(0,0,0,0.02)] h-[308px] relative rounded-[6px] shrink-0 w-full z-[1]" data-name="X+Y">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col isolate items-start pb-[20px] pt-[16px] px-[16px] relative size-full">
          <Info15 />
          <Y3 />
          <ChartWatermark8 />
          <X3 />
        </div>
      </div>
    </div>
  );
}

function GoogleTrendAiStorage() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] isolate items-center min-h-px min-w-px relative rounded-[4px] z-[3]" data-name="Google Trend - AI Storage">
      <WidgetTitle8 />
      <XY3 />
    </div>
  );
}

function ArrowRightL9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Google Trend - Object storage</p>
      <ArrowRightL9 />
    </div>
  );
}

function ClockL9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL9 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title9 />
      <Timestamp9 />
    </div>
  );
}

function Info16() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Interest Over TIme</p>
      </div>
    </div>
  );
}

function Component66() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="有效区">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 305 216">
        <g clipPath="url(#clip0_23_25649)" id="ææåº">
          <path d={svgPaths.p2b419500} fill="url(#paint0_linear_23_25649)" id="Vector 2" stroke="var(--stroke-0, #2A9B7D)" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_25649" x1="152.278" x2="152.278" y1="0" y2="217.612">
            <stop stopColor="#2ABD71" stopOpacity="0.12" />
            <stop offset="1" stopColor="#2ABD71" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_23_25649">
            <rect fill="white" height="216" width="305" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ChartArea3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.33px_0_0] items-start pl-[32px] py-[8px] z-[7]" data-name="Chart Area">
      <Component66 />
    </div>
  );
}

function YItem26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">100</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">80</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">60</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">40</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">20</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem31() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">0</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px relative w-full z-[3]" data-name="Y">
      <ChartArea3 />
      <YItem26 />
      <YItem27 />
      <YItem28 />
      <YItem29 />
      <YItem30 />
      <YItem31 />
    </div>
  );
}

function X4() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="X">
      <div className="content-stretch flex font-['Delight:Regular',sans-serif] items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Dec 28</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 04</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 11</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 18</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 25</p>
        </div>
      </div>
    </div>
  );
}

function SymbolTextBGH28() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH29() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH27() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH28 />
      <SymbolTextBGH29 />
    </div>
  );
}

function LogoAlva9() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH27 />
    </div>
  );
}

function ChartWatermark9() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[1]" data-name="Chart/Watermark">
      <LogoAlva9 />
    </div>
  );
}

function XY4() {
  return (
    <div className="bg-[rgba(0,0,0,0.02)] h-[308px] relative rounded-[6px] shrink-0 w-full z-[1]" data-name="X+Y">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col isolate items-start pb-[20px] pt-[16px] px-[16px] relative size-full">
          <Info16 />
          <Y4 />
          <X4 />
          <ChartWatermark9 />
        </div>
      </div>
    </div>
  );
}

function GoogleTrendAiStorage1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] isolate items-center min-h-px min-w-px relative rounded-[4px] self-stretch z-[2]" data-name="Google Trend - AI Storage">
      <WidgetTitle9 />
      <XY4 />
    </div>
  );
}

function ArrowRightL10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right-l2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="arrow-right-l2">
          <path d={svgPaths.p16e77d00} fill="var(--fill-0, black)" fillOpacity="0.9" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Title10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[2px] items-center min-h-px min-w-px relative" data-name="Title">
      <p className="font-['Delight:Regular',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Google Trend - Data lake</p>
      <ArrowRightL10 />
    </div>
  );
}

function ClockL10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="clock-l">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_23_26261)" id="clock-l">
          <path d={svgPaths.p26a73c80} fill="var(--fill-0, black)" fillOpacity="0.5" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_23_26261">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Timestamp10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Timestamp">
      <ClockL10 />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
    </div>
  );
}

function WidgetTitle10() {
  return (
    <div className="content-stretch flex gap-[12px] h-[22px] items-center relative shrink-0 w-full z-[2]" data-name="Widget/Title">
      <Title10 />
      <Timestamp10 />
    </div>
  );
}

function Info17() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
        <p className="leading-[16px]">Interest Over TIme</p>
      </div>
    </div>
  );
}

function Component67() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="有效区">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 305 216">
        <g clipPath="url(#clip0_23_25640)" id="ææåº">
          <path d={svgPaths.p37894e00} fill="url(#paint0_linear_23_25640)" id="Vector 3" stroke="var(--stroke-0, #5499D6)" strokeLinejoin="round" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_23_25640" x1="192.044" x2="192.044" y1="-13.2182" y2="218.1">
            <stop stopColor="#5499D6" stopOpacity="0.15" />
            <stop offset="1" stopColor="#5499D6" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_23_25640">
            <rect fill="white" height="216" width="305" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ChartArea4() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.33px_0_0] items-start pl-[32px] py-[8px] z-[7]" data-name="Chart Area">
      <Component67 />
    </div>
  );
}

function YItem32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">100</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">80</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">60</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem35() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[3]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">40</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[2]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">20</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="bg-[rgba(0,0,0,0.07)] h-px opacity-0 w-full" data-name="Line" />
        </div>
      </div>
    </div>
  );
}

function YItem37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[1]" data-name="Y Item">
      <div className="flex flex-col font-['Delight:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">0</p>
      </div>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="-scale-y-100 flex-none w-full">
          <div className="h-px opacity-0 relative w-full" data-name="Line">
            <div aria-hidden="true" className="absolute border border-[#acacac] border-dashed inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Y5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start justify-between min-h-px min-w-px relative w-full z-[3]" data-name="Y">
      <ChartArea4 />
      <YItem32 />
      <YItem33 />
      <YItem34 />
      <YItem35 />
      <YItem36 />
      <YItem37 />
    </div>
  );
}

function SymbolTextBGH31() {
  return (
    <div className="absolute inset-[0_75.31%_2.06%_0]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8236 13.7123">
        <g id="Symbol-b-g">
          <path d={svgPaths.p37fd200} fill="var(--fill-0, #49A3A6)" id="Union" />
          <path d={svgPaths.p5230800} fill="var(--fill-0, black)" id="Element" />
          <path d={svgPaths.p3cac2600} fill="var(--fill-0, black)" id="Element_2" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH32() {
  return (
    <div className="absolute inset-[0_0_0_29.62%]" data-name="SymbolText-b-g-h">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="var(--fill-0, black)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH30() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH31 />
      <SymbolTextBGH32 />
    </div>
  );
}

function LogoAlva10() {
  return (
    <div className="h-[14px] opacity-20 relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH30 />
    </div>
  );
}

function ChartWatermark10() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pl-[16px] z-[2]" data-name="Chart/Watermark">
      <LogoAlva10 />
    </div>
  );
}

function X5() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="X">
      <div className="content-stretch flex font-['Delight:Regular',sans-serif] items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Dec 28</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 04</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 11</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 18</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 25</p>
        </div>
      </div>
    </div>
  );
}

function XY5() {
  return (
    <div className="bg-[rgba(0,0,0,0.02)] h-[308px] relative rounded-[6px] shrink-0 w-full z-[1]" data-name="X+Y">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col isolate items-start pb-[20px] pt-[16px] px-[16px] relative size-full">
          <Info17 />
          <Y5 />
          <ChartWatermark10 />
          <X5 />
        </div>
      </div>
    </div>
  );
}

function GoogleTrendAiStorage2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] isolate items-center min-h-px min-w-px relative rounded-[4px] self-stretch z-[1]" data-name="Google Trend - AI Storage">
      <WidgetTitle10 />
      <XY5 />
    </div>
  );
}

function Group21() {
  return (
    <div className="content-stretch flex gap-[24px] isolate items-start justify-center relative rounded-[4px] shrink-0 w-full" data-name="Group">
      <GoogleTrendAiStorage />
      <GoogleTrendAiStorage1 />
      <GoogleTrendAiStorage2 />
    </div>
  );
}

function PlaybookTabGroupDashboard() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[56px] relative shrink-0 w-full" data-name="Playbook/Tab Group/Dashboard">
      <Group1 />
      <WidgetTable />
      <Posts />
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
          <path d={svgPaths.p1980c0c0} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <AddL />
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">Add New</p>
    </div>
  );
}

function PlaybookEditToolbarBottom() {
  return (
    <div className="-translate-x-1/2 bg-white bottom-[16px] fixed left-1/2 ml-[114px] rounded-[8px] z-10" data-name="Playbook/Edit/Toolbar/Bottom">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[4px] relative rounded-[inherit]">
        <Button />
        <Button1 />
      </div>
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
      <PlaybookEditToolbarBottom />
    </div>
  );
}

export default function Dashboard({ 
  onNavigateToHome, 
  onNavigateToExplore, 
  onNavigateToLibrary, 
  onSearchClick, 
  onAboutClick 
}: { 
  onNavigateToHome?: () => void;
  onNavigateToExplore?: () => void;
  onNavigateToLibrary?: () => void;
  onSearchClick?: () => void;
  onAboutClick?: () => void;
}) {
  return (
    <div className="bg-[#2a2a38] flex h-screen overflow-hidden relative w-full" data-name="Dashboard">
      <BarNavBarTier 
        onHomeClick={onNavigateToHome}
        onExploreClick={onNavigateToExplore}
        onLibraryClick={onNavigateToLibrary}
        onSearchClick={onSearchClick}
        onAboutClick={onAboutClick}
      />
      <DisplayZone />
    </div>
  );
}