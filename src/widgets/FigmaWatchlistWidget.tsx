/**
 * [INPUT]: SVG paths, ECharts, DRAMPriceTrendWidget, dramPriceData
 * [OUTPUT]: Figma 生成的 AI Storage Watchlist + Valuation 组合
 * [POS]: Widget 层 — 从 Dashboard.tsx 提取的 Figma 静态内容
 */

import svgPaths from '@/data/svg-nheoeek59y';
import ReactECharts from 'echarts-for-react';
import { DRAMPriceTrendWidget } from './DRAMPriceTrendWidget';
import { ddr4Data, ddr5Data } from '@/data/dramPriceData';
import img1 from 'figma:asset/11f742b6bf227629e0bd445a4655f9faedb0d5cf.png';
import img2 from 'figma:asset/245a7d0f66b2a4c07c6f65541bd8759f79b07f71.png';
import img11 from 'figma:asset/82e4e2abde2f2ae67d295ccb417c5bf345acddbc.png';

function SymbolTextBGH2() {
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

function SymbolTextBGH() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH2 />
    </div>
  );
}

function LogoAlva() {
  return (
    <div className="text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20" data-name="Logo/Alva">
      Alva
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">{`Brief & Notes`}</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">AI Storage Theme Brief</p>
    </div>
  );
}

function MarkdownLGap1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[0] min-h-px min-w-px not-italic relative text-[0px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">
        <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[14px] tracking-[0.14px]">Date:</span>
        <span className="leading-[26px] text-[16px]">
          {` January 22, 2026`}
          <br aria-hidden="true" />
        </span>
        <span className="font-['Delight',sans-serif] font-medium leading-[22px] text-[14px] tracking-[0.14px]">Theme:</span>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">1. AI Storage Segments</p>
    </div>
  );
}

function MarkdownLGap3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Enterprise AI Storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">High-performance NVMe/SSD arrays for training clusters</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Object storage for model checkpoints and datasets</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Pure Storage, NetApp, Dell EMC</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Hyperscale Cloud Storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Distributed file systems (e.g., HDFS, Ceph)</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Tiered storage (hot/warm/cold) for cost optimization</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: AWS S3, Azure Blob, Google Cloud Storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Edge AI Storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Local inference caching and model storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Low-latency edge compute storage</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Western Digital, Seagate, Micron</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Memory/Storage Convergence</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">CXL-enabled memory pooling</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Persistent memory (PMem) for AI workloads</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Key players: Samsung, SK Hynix, Intel</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">2. Demand Drivers</p>
    </div>
  );
}

function MarkdownLGap12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Primary Drivers</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Model Size Expansion: GPT-4+ scale models require 100TB+ storage per training run</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Training Data Growth: Multimodal datasets (text, image, video) expanding 3-5x annually</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Inference Scale: Real-time serving requires low-latency storage at edge and cloud</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative self-stretch text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Regulatory Compliance: Data sovereignty laws driving localized storage buildouts</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Secondary Drivers</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Model Versioning: Multiple checkpoint storage for A/B testing and rollback</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Synthetic Data: AI-generated training data creating storage feedback loop</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Fine-tuning Proliferation: Enterprise custom models multiplying storage needs</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[30px] min-h-px min-w-px not-italic relative text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-pre-wrap">{`3. Supply & Price Signals`}</p>
    </div>
  );
}

function MarkdownLGap17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Markdown/L (Gap16)">
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Supply Indicators</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">{`NAND Flash Utilization: Monitor >85% = tight supply, <70% = oversupply`}</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">HDD Shipment Volumes: Hyperscale HDD orders (leading indicator, 2-3 month lag)</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Fab Capacity Additions: Samsung/Micron capex announcements (6-12 month lead time)</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Price Signals</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">NAND Contract Prices: Track quarterly enterprise SSD pricing (DRAMeXchange)</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Cloud Storage Pricing: AWS S3/Azure price cuts = margin pressure signal</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">{`Spot Market Premiums: Gray market SSD premiums >10% = shortage forming`}</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] font-medium leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Current Status (as of Jan 2026)</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">NAND prices: Stabilizing after 2025 correction</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">HDD demand: Steady for nearline hyperscale</p>
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
      <p className="flex-[1_0_0] font-['Delight',sans-serif] leading-[26px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[0.16px] whitespace-pre-wrap">Enterprise SSD: Tight supply for high-capacity (30TB+) drives</p>
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">AI Memory Storage Index</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">6h</p>
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


function SymbolTextBGH5() {
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

function SymbolTextBGH3() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH5 />
    </div>
  );
}

function LogoAlva1() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
    <div className="content-stretch flex font-['Delight',sans-serif] gap-[8px] items-center leading-[0] not-italic py-[4px] relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] w-full z-[3]" data-name="Info">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[30px]">
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
      <div className="content-stretch flex font-['Delight',sans-serif] items-start justify-between leading-[0] not-italic pl-[38px] relative size-full text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px]">
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
      <a className="block font-['Delight',sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] whitespace-nowrap" href="https://stg.alva.xyz/dashboard?id=2014552503732015104">
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">02/12/2026 12:30</p>
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">DDR5 16Gb</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">DDR4 16Gb</p>
        </div>
      </div>
    </div>
  );
}

function Info1() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full z-[4]" data-name="Info">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">400</p>
      </div>
    </div>
  );
}

function YItem6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[7]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">350</p>
      </div>
    </div>
  );
}

function YItem7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">300</p>
      </div>
    </div>
  );
}

function YItem8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">250</p>
      </div>
    </div>
  );
}

function YItem9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[4]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
        <div className="flex flex-[1_0_0] flex-col font-['Delight',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Oct</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Nov</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight',sans-serif] justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">Dec</p>
        </div>
        <div className="flex flex-[1_0_0] flex-col font-['Delight',sans-serif] font-medium justify-center min-h-px min-w-px relative">
          <p className="leading-[16px] whitespace-pre-wrap">2026</p>
        </div>
      </div>
    </div>
  );
}


function SymbolTextBGH8() {
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

function SymbolTextBGH6() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH8 />
    </div>
  );
}

function LogoAlva2() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
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
  return <DRAMPriceTrendWidget />;
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Trading Activity Heatmap</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">Live</p>
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
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
        <div className="absolute inset-[0_0_2.06%_70.69%]" data-name="SymbolText-b-g-h">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3909 13.7123">
            <g id="Symbol-b-g">
              <path d={svgPaths.p37fd200} fill="rgba(73, 163, 166, 0.2)" id="Union" />
              <path d={svgPaths.p5230800} fill="rgba(0, 0, 0, 0.2)" id="Element" />
              <path d={svgPaths.p3cac2600} fill="rgba(0, 0, 0, 0.2)" id="Element_2" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-0" data-name="SymbolText-b-g-h">
          <svg className="block h-full" fill="none" preserveAspectRatio="xMinYMin meet" viewBox="0 0 39.4104 14">
            <g id="SymbolText-b-g-h">
              <path d={svgPaths.p2bd5e700} fill="rgba(0, 0, 0, 0.2)" id="AlvaText" />
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
      <p className="font-['Delight',sans-serif] leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">Forward Valuation Comparison</p>
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
      <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px]">02/12/2026 12:30</p>
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">180</p>
      </div>
    </div>
  );
}

function YItem14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[6]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">150</p>
      </div>
    </div>
  );
}

function YItem15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full z-[5]" data-name="Y Item">
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.7)] text-right tracking-[0.1px] w-[24px]">
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
      <div className="content-stretch flex font-['Delight',sans-serif] items-start leading-[0] not-italic pl-[32px] relative text-[10px] text-[rgba(0,0,0,0.7)] text-center tracking-[0.1px] w-full">
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


function SymbolTextBGH11() {
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

function SymbolTextBGH9() {
  return (
    <div className="absolute contents inset-0" data-name="SymbolText-b-g-h">
      
      <SymbolTextBGH11 />
    </div>
  );
}

function LogoAlva3() {
  return (
    <div className="h-[14px] relative shrink-0 w-[56px]" data-name="Logo/Alva">
      <SymbolTextBGH9 />
    </div>
  );
}

function ValuationLegend() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end overflow-clip relative shrink-0 w-full z-[5]" data-name="图例">
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#49A3A6] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">MU</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#FF9800] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">SNDK</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#40A544] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
          <p className="leading-[16px]">WDC</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="bg-[#5F75C9] rounded-[100px] shrink-0 size-[8px]" />
        <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-[rgba(0,0,0,0.5)] tracking-[0.1px] whitespace-nowrap">
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
      left: 36,
      right: 0,
      top: 30,
      bottom: 20,
      containLabel: false
    },
    xAxis: {
      type: 'category' as const,
      data: ['Forward P/E', 'Forward P/S', 'Forward EV/EBITDA'],
      axisLine: { show: false },
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
        padding: [0, 0, 8, -24]
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
        padding: [0, 8, 0, 0],
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
        label: barLabelStyle,
        markLine: {
          silent: true,
          symbol: 'none',
          data: [{ yAxis: 0 }],
          lineStyle: {
            color: 'rgba(0,0,0,0.12)',
            type: [3, 2] as any,
            width: 1
          },
          label: { show: false }
        }
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
        backgroundSize: '3px 3px',
        padding: '16px'
      }}
    >
      <ValuationLegend />
      <div style={{ width: '100%', height: 'calc(100% - 20px)', position: 'relative' }}>
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
      <div className="absolute bottom-[16px] left-[16px] font-['Delight',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
        Alva
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

export { Group1 as FigmaWatchlistWidget };
