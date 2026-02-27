/**
 * [INPUT]: Dashboard SVG paths
 * [OUTPUT]: Dashboard 顶栏（标题 + 操作按钮）
 * [POS]: Shell 层 — Dashboard 系列页面的顶部标题栏
 */

import svgPaths from '@/data/svg-nheoeek59y';
import { CHART_COLOR_PALETTE } from '@/lib/chart-theme';

interface TopbarProps {
  title: string;
}

/** 名称首字母圆形头像，底色从 chart token 色盘中按名称哈希取色 */
function UserAvatar({ name, size = 20 }: { name: string; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const color = CHART_COLOR_PALETTE[name.charCodeAt(0) % CHART_COLOR_PALETTE.length];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: color, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, letterSpacing: 0, fontFamily: "'Delight', sans-serif" }}>
        {initial}
      </span>
    </div>
  );
}

export function Topbar({ title }: TopbarProps) {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-center py-[10px] sticky top-0 shrink-0 w-full z-10 bg-white">
      {/* Left: 头像 + 标题 + 状态 */}
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
        <div className="relative shrink-0 size-[20px]">
          <UserAvatar name="Alva Intern" size={20} />
        </div>
        <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
          <p className="font-['Delight',sans-serif] leading-[22px] max-w-[136px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">Alva Intern</p>
          <div className="flex flex-col font-['Delight',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-center tracking-[0.12px] w-[6px]">
            <p className="leading-[20px] whitespace-pre-wrap">•</p>
          </div>
          {/* Dashboard 图标 */}
          <div className="relative shrink-0 size-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p10e63780} fill="black" fillOpacity="0.9" />
            </svg>
          </div>
          <p className="font-['Delight',sans-serif] leading-[22px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.14px]">{title}</p>
          {/* 状态指示灯 */}
          <div className="content-stretch flex items-center relative shrink-0 size-[12px]">
            <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative">
              <div className="-translate-y-1/2 absolute aspect-[20/20] left-0 right-0 top-1/2">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" fill="#DBEDED" r="6" />
                </svg>
              </div>
              <div className="-translate-x-1/2 absolute aspect-[8.5600004196167/8.5600004196167] bottom-[28.6%] left-1/2 top-[28.6%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.136 5.136">
                  <circle cx="2.568" cy="2.568" fill="#49A3A6" r="2.568" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: 版本 + 操作按钮 */}
      <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0">
        <div className="content-stretch flex gap-[2px] items-center overflow-clip relative shrink-0">
          <p className="font-['Delight',sans-serif] leading-[20px] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[0.12px]">V1</p>
        </div>
        {/* 收藏 */}
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2b2d8380} fill="black" fillOpacity="0.9" />
          </svg>
        </div>
        {/* 分享 */}
        <div className="relative shrink-0 size-[16px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p272ac1f0} fill="black" fillOpacity="0.9" />
          </svg>
        </div>
        {/* Chat */}
        <div className="content-stretch flex flex-col items-start relative rounded-[6px] shrink-0">
          <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative size-full">
                <div className="relative shrink-0 size-[18px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <path d={svgPaths.p143c1e00} fill="black" fillOpacity="0.9" />
                  </svg>
                </div>
                <p className="font-['Delight',sans-serif] font-medium leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">Chat</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.3)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
