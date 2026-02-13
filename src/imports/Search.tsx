import svgPaths from "./svg-ovvfrhab5t";
import imgLogoStock from "figma:asset/45d1ffa0248164dd51a208584d6b02d723885110.png";
import imgLogoStock1 from "figma:asset/0d16fede032ae245f20638a9f979ca1619c89353.png";
import imgLogoStock2 from "figma:asset/85c51486f1f8aec4453eef318eb213c4f5086222.png";
import imgLogoStock3 from "figma:asset/9e44f88231be2d7314b876b030fc642a37d06628.png";
import imgLogoStock4 from "figma:asset/69aba08686ae0b4a26da153e57aa58a9696386d1.png";
import imgLogoStock5 from "figma:asset/945317c88637e9c78038380ec7878ac5743c8c29.png";

function CloseL({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative shrink-0 size-[16px] cursor-pointer hover:opacity-70 transition-opacity" data-name="close-l1" onClick={onClick}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="close-l1">
          <path d={svgPaths.p2d9dd100} fill="var(--fill-0, black)" fillOpacity="0.9" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ModalTitle({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Modal Title">
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[18px] text-[rgba(0,0,0,0.9)] tracking-[0.18px] whitespace-pre-wrap">Search</p>
      <CloseL onClick={onClose} />
    </div>
  );
}

function Search1() {
  return (
    <div className="bg-white h-[48px] relative rounded-[6px] shrink-0 w-full" data-name="Search">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.9)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[11px] relative size-full">
          <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[16px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.16px] whitespace-nowrap">
            <span className="leading-[26px]">|</span>
            <span className="leading-[26px] text-[rgba(0,0,0,0.3)]">Try symbol, e.g. AAPL</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoStock() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_782)" id="Tesla">
          <path d="M0 0H24V24H0V0Z" fill="var(--fill-0, #E82127)" id="Vector" />
          <path d={svgPaths.p2031c980} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.paa1b980} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_5_782">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">TSLA</p>
    </div>
  );
}

function StockInfo() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function RecentVisited() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Recent Visited">
      <Container />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Tesla Inc.</p>
      <StockInfo />
    </div>
  );
}

function LogoStock1() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_787)" id="Walmart Inc.">
          <path d="M0 0H24V24H0V0Z" fill="var(--fill-0, #0058F0)" id="Vector" />
          <path d={svgPaths.p3980ab00} fill="var(--fill-0, #FFBB00)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_5_787">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock1 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">WMT</p>
    </div>
  );
}

function StockInfo1() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function RecentVisited1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Recent Visited">
      <Container1 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Walmart Inc.</p>
      <StockInfo1 />
    </div>
  );
}

function LogoStock2() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoStock} />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock2 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">A</p>
    </div>
  );
}

function StockInfo2() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="1">
      <Container2 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Agilent Technologies, Inc.</p>
      <StockInfo2 />
    </div>
  );
}

function LogoStock3() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_801)" id="Advanced Micro Devices Inc">
          <path d="M0 0H24V24H0V0Z" fill="url(#paint0_linear_5_801)" id="Vector" />
          <path d={svgPaths.p381a7e80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5_801" x1="4.46486" x2="29.2059" y1="4.16229" y2="32.5787">
            <stop stopColor="#1A1E21" />
            <stop offset="1" stopColor="#06060A" />
          </linearGradient>
          <clipPath id="clip0_5_801">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock3 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AMD</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Container">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="2">
      <Container3 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Advanced Micro Devices, Inc.</p>
      <Container4 />
    </div>
  );
}

function LogoStock4() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_791)" id="Apple Inc">
          <path d="M0 0H24V24H0V0Z" fill="url(#paint0_linear_5_791)" id="Vector" />
          <path d={svgPaths.p21fb3700} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5_791" x1="4.46486" x2="29.2059" y1="4.16229" y2="32.5787">
            <stop stopColor="#1A1E21" />
            <stop offset="1" stopColor="#06060A" />
          </linearGradient>
          <clipPath id="clip0_5_791">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock4 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AAPL</p>
    </div>
  );
}

function StockInfo3() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function Component2() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full"
      data-name="3"
    >
      <Container5 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Apple Inc.</p>
      <StockInfo3 />
    </div>
  );
}

function LogoStock5() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgLogoStock1} />
    </div>
  );
}

function LogoAndText() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock5 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">APP</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Container">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="4">
      <LogoAndText />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Applovin Corporation</p>
      <Container6 />
    </div>
  );
}

function LogoStock6() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[100px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[100px] size-full" src={imgLogoStock2} />
        <img alt="" className="absolute max-w-none object-cover rounded-[100px] size-full" src={imgLogoStock3} />
      </div>
    </div>
  );
}

function LogoAndText1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock6 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">ARM</p>
    </div>
  );
}

function StockInfo4() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="5">
      <LogoAndText1 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Arm Holdings plc</p>
      <StockInfo4 />
    </div>
  );
}

function LogoStock7() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_771)" id="Amazon.com">
          <path d="M0 0H24V24H0V0Z" fill="var(--fill-0, #FE5300)" id="Vector" />
          <path d={svgPaths.p352df200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_5_771">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock7 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AMZN</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Container">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="6">
      <Container7 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Amazon.com, Inc.</p>
      <Container8 />
    </div>
  );
}

function LogoStock8() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgLogoStock4} />
    </div>
  );
}

function LogoAndText2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock8 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">ACGO</p>
    </div>
  );
}

function StockInfo5() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="7">
      <LogoAndText2 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Broadcom Inc.</p>
      <StockInfo5 />
    </div>
  );
}

function LogoStock9() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgLogoStock5} />
    </div>
  );
}

function LogoAndText3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock9 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AG</p>
    </div>
  );
}

function StockInfo6() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="8">
      <LogoAndText3 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">First Majestic Silver Corp.</p>
      <StockInfo6 />
    </div>
  );
}

function LogoStock10() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[100px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[100px] size-full" src={imgLogoStock2} />
        <img alt="" className="absolute max-w-none object-cover rounded-[100px] size-full" src={imgLogoStock3} />
      </div>
    </div>
  );
}

function LogoAndText4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock10 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">ARM</p>
    </div>
  );
}

function StockInfo7() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NASDAQ</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="9">
      <LogoAndText4 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Arm Holdings plc</p>
      <StockInfo7 />
    </div>
  );
}

function LogoStock11() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_5_771)" id="Amazon.com">
          <path d="M0 0H24V24H0V0Z" fill="var(--fill-0, #FE5300)" id="Vector" />
          <path d={svgPaths.p352df200} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_5_771">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Container">
      <LogoStock11 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AMZN</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Container">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="10">
      <Container9 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Amazon.com, Inc.</p>
      <Container10 />
    </div>
  );
}

function LogoStock12() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgLogoStock4} />
    </div>
  );
}

function LogoAndText5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock12 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">ACGO</p>
    </div>
  );
}

function StockInfo8() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="11">
      <LogoAndText5 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">Broadcom Inc.</p>
      <StockInfo8 />
    </div>
  );
}

function LogoStock13() {
  return (
    <div className="overflow-clip relative rounded-[100px] shrink-0 size-[24px]" data-name="Logo/Stock">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgLogoStock5} />
    </div>
  );
}

function LogoAndText6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[100px]" data-name="Logo and Text">
      <LogoStock13 />
      <p className="flex-[1_0_0] font-['Delight:Medium',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">AG</p>
    </div>
  );
}

function StockInfo9() {
  return (
    <div className="content-stretch flex font-['Delight:Regular',sans-serif] gap-[8px] items-center not-italic relative shrink-0 text-ellipsis" data-name="Stock Info">
      <p className="leading-[20px] overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Stock</p>
      <p className="leading-[22px] overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">NYSE</p>
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="12">
      <LogoAndText6 />
      <p className="flex-[1_0_0] font-['Delight:Regular',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">First Majestic Silver Corp.</p>
      <StockInfo9 />
    </div>
  );
}

function ActionSheet({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-white h-[600px] max-h-[600px] max-w-[800px] relative rounded-[8px] shrink-0 w-[800px]" data-name="Action sheet">
      <div className="content-stretch flex flex-col gap-[20px] items-start max-h-[inherit] max-w-[inherit] overflow-clip p-[28px] relative rounded-[inherit] size-full">
        <ModalTitle onClose={onClose} />
        <Search1 />
        <RecentVisited />
        <RecentVisited1 />
        <Component />
        <Component1 />
        <Component2 />
        <Component3 />
        <Component4 />
        <Component5 />
        <Component6 />
        <Component7 />
        <Component8 />
        <Component9 />
        <Component10 />
        <Component11 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

export default function Search({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full" data-name="Search">
      <ActionSheet onClose={onClose} />
    </div>
  );
}