/**
 * [INPUT]: SVG paths, Figma 图片资源
 * [OUTPUT]: Figma 生成的社交 Feed 列表
 * [POS]: Widget 层 — 从 Dashboard.tsx 提取的 Figma 静态内容
 */

import svgPaths from '@/data/svg-nheoeek59y';
import img3 from 'figma:asset/de76204612629f7b9912fe82236eed8d97bdf3fe.png';
import imgImage5 from 'figma:asset/6b633e6a9fb45d16be89e19133551e383be7e5a8.png';
import img4 from 'figma:asset/f411fd1a36a6c51dfe5dd9825547789a69950867.png';
import imgImage6 from 'figma:asset/98e8ba807c686009e1e8cb5018fdfb8380f2d298.png';
import img5 from 'figma:asset/2a17d51f451f6ca36bd335e0bc38326048598bf8.png';
import imgImage7 from 'figma:asset/65de76467a5c98a12d435c27aedf25c737f74bc4.png';
import img6 from 'figma:asset/ca7532afc40c29427a03dacc93cef24bdba8112e.png';
import imgImage8 from 'figma:asset/b279d6cbe129543dd8a8ff8d8541284ee8e4f397.png';
import img7 from 'figma:asset/2459b70488a6039e6afe2ba7d73d3553c5d6a6ec.png';
import imgImage9 from 'figma:asset/4696696644416e84361c842891afcbf2335fd3c0.png';
import img8 from 'figma:asset/20b0de3d5ed31ac9b394dc7ff2a96da33fa3e0bc.png';
import imgImage10 from 'figma:asset/66960b6397c704631cbf4d1abb15c3de7c7134b1.png';
import imgImage35 from 'figma:asset/f0f388a7a866c74f11eef9df00d6787b8775d4ab.png';
import imgImage11 from 'figma:asset/e7fb618ebcafc29c76dce1dca3bcc2e1f31b5789.png';
import imgImage36 from 'figma:asset/8b35331f1de90be79a0433516249393776d61365.png';
import imgImage12 from 'figma:asset/743295b0cd6f676802d0de1df353b9d8b275338f.png';
import imgImage37 from 'figma:asset/96f0b49b53cc6b6abed34db509d2cf8dc1cfe45c.png';
import imgImage13 from 'figma:asset/2e4ef1f2b0c1564ca0ad2da6c4fa6fa445af6b42.png';
import imgImage38 from 'figma:asset/5308456831c506d750c1c7521fb9901ca1101b74.png';
import imgImage14 from 'figma:asset/8840fd187ac279d4878e32dcf4910cdbe573cd82.png';
import imgImage15 from 'figma:asset/0e79b9f9852aa2e5765c0d327d9eadca0e3627b0.png';
import imgLogoStock from 'figma:asset/9a4f7fefba6a97d111af6c74b8275123566b4673.png';
import imgLogoStock1 from 'figma:asset/45bf0f25a4213e3fa8e153822162b70ca856a52a.png';
import imgLogoStock2 from 'figma:asset/f3a1622dbd5b37cb6b9d2753065e254c97a3a13e.png';
import imgLogoStock3 from 'figma:asset/4b611e74e7d34eaccd71918596d9ceb19bcb226f.png';
import imgLogoStock4 from 'figma:asset/40f3be28754f1e4479da9d07dac064a18ba9f4f1.png';

function SymbolTextBGH17() {
  return (
    <div className="absolute inset-0" data-name="SymbolText-b-g-h">
      <svg className="block h-full" fill="none" preserveAspectRatio="xMinYMin meet" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="rgba(0, 0, 0, 0.2)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH15() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH17 />
    </div>
  );
}

function LogoAlva5() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trending Threads</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Marty Chargin</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@MartyChargin</p>
    </div>
  );
}

function Basic() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info3 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 24</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">8</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">33</p>
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
          <p className="font-['Delight',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[#49a3a6]">$SNDK</span>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">FLUX</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@FluxAlgo_TA</p>
    </div>
  );
}

function Basic1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info4 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 21</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">0</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">3</p>
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
          <p className="font-['Delight',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[#49a3a6]">$NVDA</span>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Justin Banks</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@RealJGBanks</p>
    </div>
  );
}

function Basic2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info5 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 12</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">30</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">261</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">1.1K</p>
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
          <p className="font-['Delight',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="leading-[22px]">
              AI’S NEXT BOTTLENECK: MEMORY (2026)
              <br aria-hidden="true" />
              {`If you missed `}
            </span>
            <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[#49a3a6]">$MU</span>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Shay Boloor</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@StockSavvyShay</p>
    </div>
  );
}

function Basic3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info6 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 11</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">91</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">465</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">2.1K</p>
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
          <p className="font-['Delight',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[#49a3a6]">$MU</span>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Lin</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@Speculator_io</p>
    </div>
  );
}

function Basic4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info7 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 7</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">29</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">251</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">1.2K</p>
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
          <div className="font-['Delight',sans-serif] h-[44px] leading-[0] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[0px] text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
            <p className="leading-[22px] mb-0">{`We're in an AI memory supercycle:`}</p>
            <p>
              <span className="leading-[22px]">{`HBM: `}</span>
              <span className="font-['Delight',sans-serif] font-medium leading-[22px] not-italic text-[#49a3a6] tracking-[0.14px]">$MU</span>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Shantaram</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">@shantaram83</p>
    </div>
  );
}

function Basic5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Basic">
      <Info8 />
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan7</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">28K</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">118K</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">4.3K</p>
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
          <div className="font-['Delight',sans-serif] h-[44px] leading-[22px] max-h-[44px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-pre-wrap">
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


function SymbolTextBGH20() {
  return (
    <div className="absolute inset-0" data-name="SymbolText-b-g-h">
      <svg className="block h-full" fill="none" preserveAspectRatio="xMinYMin meet" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="rgba(0, 0, 0, 0.2)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH18() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH20 />
    </div>
  );
}

function LogoAlva6() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trending Posts</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Morningstar</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 25</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Tori Brovet</p>
    </div>
  );
}

function Main6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">The Best AI Stocks to Buy Now</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">These stock picks stand to benefit most from developing artificial intelligence technologies in 2026.</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Seeking Alpha</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 24</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Chris Ciaccia</p>
    </div>
  );
}

function Main7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Memory is the hottest part of the market. Can the rally continue?</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">Spurred by insatiable demand from data centers and all things related to artificial intelligence, memory, and storage makers have become the hottest part of the stock market.</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Yahoo Finance</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 22</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Rich Duprey</p>
    </div>
  );
}

function Main8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">SanDisk Stock Keeps Surging. Did You Miss Your Chance to Buy?</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">SanDisk (SNDK) was spun off from Western Digital (WDC) last February, marking a strategic separation to unlock value in its flash memory business. Since then, the company has delivered a master class in market dominance, capitalizing on surging demand for NAND flash driven by artificial intelligence (AI) and data centers.</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">{`Podcast `}</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 21</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By mcgrof</p>
    </div>
  );
}

function Main9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Storage-next: Do We Need New Hardware for AI Storage, or Just Better Layouts?</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">{`We review the "Storage-Next" paper, published in November 2025, which argues that a fundamental hardware architectural shift is required to elevate NAND flash from a passive storage tier to an active memory tier capable of "seconds-scale" caching. The authors contend that standard SSDs impose a "channel-side ceiling" on IOPS because they are optimized for 4KB blocks, creating massive bandwidth waste when AI applications demand fine-grained access to small items, such as 128-byte embedding vectors. To solve this, they propose specialized "Storage-Next" drives capable of scalable IOPS for small block sizes (e.g., 50M IOPS at 512B), arguing this hardware is necessary to simplify software stacks and enable high-throughput random access without the read amplification penalties inherent in current technology.`}</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Yahoo Finance</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 8</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Joey Frenette</p>
    </div>
  );
}

function Main10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">Memory Chip Stocks are Red-Hot. Is it Too Late to Buy?</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">{`The memory chip stocks have been really heating up to start the year, thanks in part to the AI-driven RAM shortage, which could last well into the year's end and perhaps beyond. Undoubtedly, AI demand is showing no signs of slowing down, and as the high-performance memory needs continue to blast off, questions linger as to how the top memory players can step up to meet the needs of this unprecedented boom.`}</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">Youtube</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Jan 6</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">•</p>
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] whitespace-nowrap">By Extrinsic Trades</p>
    </div>
  );
}

function Main11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Main">
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] w-full whitespace-nowrap">MU, STX, SNDK, WDC, CRDO Stock Analysis 2026</p>
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-ellipsis tracking-[0.12px] w-full whitespace-nowrap">
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


function SymbolTextBGH23() {
  return (
    <div className="absolute inset-0" data-name="SymbolText-b-g-h">
      <svg className="block h-full" fill="none" preserveAspectRatio="xMinYMin meet" viewBox="0 0 39.4104 14">
        <g id="SymbolText-b-g-h">
          <path d={svgPaths.p2bd5e700} fill="rgba(0, 0, 0, 0.2)" id="AlvaText" />
        </g>
      </svg>
    </div>
  );
}

function SymbolTextBGH21() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH23 />
    </div>
  );
}

function LogoAlva7() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Earnings Calls</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">01/26/2026 16:20</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">in 1d</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">STX 2026 Q2 Earnings Call</p>
      <Tag />
    </div>
  );
}

function Frame80() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+17.9%</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock1 />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">MU 2026 Q1 Earnings Call</p>
      <Tag1 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+5.88%</p>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock2 />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">SNDK 2026 Q1 Earnings Call</p>
      <Tag2 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#2a9b7d] text-[12px] text-center tracking-[0.12px]">+3.14%</p>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock3 />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">WDC 2026 Q1 Earnings Call</p>
      <Tag3 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#e05357] text-[12px] text-center tracking-[0.12px]">-7.14%</p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock4 />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">SMCI 2026 Q1 Earnings Call</p>
      <Tag4 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full whitespace-pre-wrap">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">0.00%</p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <LogoStock5 />
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px] whitespace-nowrap">MU 2025 Q4 Earnings Call</p>
      <Tag5 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['Delight',sans-serif] gap-[4px] items-center justify-center leading-[20px] not-italic pl-[28px] relative text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
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

export { Posts as FigmaPostsWidget };
