/**
 * [INPUT]: Dashboard SVG paths
 * [OUTPUT]: 底部浮动工具栏（Edit Chart / Add）
 * [POS]: Shell 层 — Dashboard 系列页面的底部操作栏
 */

import svgPaths from '@/data/svg-nheoeek59y';

/* ========== 图标 ========== */

function PointerIcon() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip_pointer)">
          <path d={svgPaths.p2362500} fill="black" fillOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip_pointer"><rect fill="white" height="18" width="18" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AddIcon() {
  return (
    <div className="relative shrink-0 size-[18px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <path d={svgPaths.p1980c0c0} fill="black" fillOpacity="0.9" />
      </svg>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[4px] shrink-0">
      {icon}
      <p className="font-['Delight:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[0.12px]">{label}</p>
    </div>
  );
}

/* ========== 主组件 ========== */

interface BottomToolbarProps {
  variant?: 'floating' | 'sticky';
  addLabel?: string;
}

export function BottomToolbar({ variant = 'floating', addLabel = 'Add New' }: BottomToolbarProps) {
  const border = (
    <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]" />
  );

  if (variant === 'sticky') {
    return (
      <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center px-[28px] py-[14px] sticky bottom-0 shrink-0 w-full z-10">
        <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" />
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
          <ToolbarButton icon={<PointerIcon />} label="Edit Chart" />
          <ToolbarButton icon={<AddIcon />} label={addLabel} />
        </div>
        {border}
      </div>
    );
  }

  return (
    <div className="-translate-x-1/2 bg-white bottom-[16px] fixed left-1/2 ml-[114px] rounded-[8px] z-10">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[4px] relative rounded-[inherit]">
        <ToolbarButton icon={<PointerIcon />} label="Edit Chart" />
        <ToolbarButton icon={<AddIcon />} label={addLabel} />
      </div>
      {border}
    </div>
  );
}
