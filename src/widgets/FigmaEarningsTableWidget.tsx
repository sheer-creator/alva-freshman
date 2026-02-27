/**
 * [INPUT]: SVG paths
 * [OUTPUT]: Figma 生成的收益表格
 * [POS]: Widget 层 — 从 Dashboard.tsx 提取的 Figma 静态内容
 */

import svgPaths from '@/data/svg-nheoeek59y';

function SymbolTextBGH14() {
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

function SymbolTextBGH12() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      <SymbolTextBGH14 />
    </div>
  );
}

function LogoAlva4() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Storage Watchlist</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Ticker</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">MU</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">WDC</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">STX</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">TSM</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">VRT</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">SMCI</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Last Price</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">399.65</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">236.39</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">346.10</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">334.88</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">182.49</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">31.70</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1D %</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">0.52%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-2.84%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-0.12%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.29%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">0.76%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-2.31%</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1W %</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">18.72%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6.43%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">8.05%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-1.98%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">5.77%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">7.75%</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">1M %</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">44.49%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">33.74%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">22.36%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">14.18%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">9.77%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.03%</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">3M %</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">101.37%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">96.22%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">60.94%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">15.92%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6.35%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">-39.62%</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">YTD %</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">26.70%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">25.94%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">20.37%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">4.77%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">3.92%</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2.39%</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">52W High</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">412.43</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">247.94</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">350.05</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">351.33</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">202.45</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">66.44</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">52W Low</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">61.54</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">28.83</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">63.19</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">134.25</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">53.60</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">25.71</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Avg Vol 30D</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">26,909,216</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">6,472,615</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">2,795,527</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">11,633,277</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">5,176,158</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">24,359,645</p>
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
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[0.14px]">Market Cap</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$449.81B</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$81.03B</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$73.91B</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$1.74T</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$69.77B</p>
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
          <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[22px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-pre-wrap">$18.92B</p>
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

export { WidgetTable as FigmaEarningsTableWidget };
