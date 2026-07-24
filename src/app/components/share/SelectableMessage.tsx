/**
 * [INPUT]: Figma Page/Agent/Chat 9246:36240(hover copy/share) + 9269:39941(分享选择态)
 * [OUTPUT]: 消息级分享交互三件套 — SelectableMessage(选择块/悬浮行容器)、SelectCheckbox(16px 方形勾选)、MsgHeaderActions(Alva header 内联 copy+share)
 * [POS]: AgentNewSession extra 流与 ChannelSeedThread 的每条可分享消息外层
 */
import type { ReactNode, SyntheticEvent } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

/* hover 显示(触屏常显)；focus 进入也显示 — 沿用 group/message 约定 */
const HOVER_REVEAL = '[@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/message:pointer-events-auto [@media(hover:hover)]:group-hover/message:opacity-100 group-focus-within/message:pointer-events-auto group-focus-within/message:opacity-100 transition-opacity';

function QuickIconButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-[16px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-m1,#49A3A6)]"
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </button>
  );
}

/* Alva header 行内 copy+share（Figma 9246:36248 copy+share:pl4 gap8,16px n9）— 通过 AgentMsg/SeedAgentMsg 的 actions slot 渲染 */
export function MsgHeaderActions({ onCopy, onShare }: { onCopy: () => void; onShare: () => void }) {
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-[8px] pl-[4px] ${HOVER_REVEAL}`}>
      <QuickIconButton icon="copy-l" label="Copy message" onClick={onCopy} />
      <QuickIconButton icon="share-l" label="Share message" onClick={onShare} />
    </div>
  );
}

/* 16px 方形勾选框（Figma CheckBox 资产真值:未选 #DEDEDE 实心 r2,选中 m1 实心 + 白勾）;外层 22×22 对齐头像位 */
export function SelectCheckbox({ checked }: { checked: boolean }) {
  return (
    <span aria-hidden className="flex h-[22px] w-[22px] shrink-0 items-center">
      {checked ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 0.700195H14C14.718 0.700195 15.2998 1.28203 15.2998 2V14C15.2998 14.718 14.718 15.2998 14 15.2998H2C1.28203 15.2998 0.700195 14.718 0.700195 14V2C0.700195 1.28203 1.28203 0.700195 2 0.700195Z" fill="var(--main-m1, #49A3A6)" stroke="var(--main-m1, #49A3A6)" strokeWidth="1.4" />
          <path d="M10.708 5.5228C10.951 5.27985 11.3452 5.27995 11.5882 5.5228C11.8312 5.76579 11.8312 6.16001 11.5882 6.40301L7.51446 10.4768C7.27146 10.7198 6.87724 10.7198 6.63425 10.4768L4.41203 8.25457L4.33217 8.15735C4.17267 7.91583 4.1994 7.58699 4.41203 7.37436C4.62462 7.1619 4.95269 7.13601 5.19414 7.29537L5.29223 7.37436L7.07435 9.15648L10.708 5.5228Z" fill="white" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M0 2C0 0.895431 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2Z" fill="#DEDEDE" />
        </svg>
      )}
    </span>
  );
}

interface SelectableMessageProps {
  active: boolean;
  selected: boolean;
  label: string;
  onToggle: () => void;
  /* user:行首自带 checkbox(9269:39948);agent:纯块容器,checkbox 由消息组件 portrait 位渲染(9281:37663) */
  variant?: 'agent' | 'user';
  /* user 消息气泡下方悬浮行（Figma 9246:36247 Hover:absolute bottom-[-28px] 右对齐 time + copy） */
  hoverTime?: string;
  onQuickCopy?: () => void;
  children: ReactNode;
}

export function SelectableMessage({
  active,
  selected,
  label,
  onToggle,
  variant = 'agent',
  hoverTime,
  onQuickCopy,
  children,
}: SelectableMessageProps) {
  if (!active) {
    return (
      <div className="group/message relative flex w-full flex-col">
        {children}
        {variant === 'user' && onQuickCopy && (
          <div className={`absolute inset-x-0 bottom-[-28px] flex items-center justify-end gap-[8px] ${HOVER_REVEAL}`}>
            {hoverTime && (
              <p className="whitespace-nowrap text-right text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                {hoverTime}
              </p>
            )}
            <QuickIconButton icon="copy-l" label="Copy message" onClick={onQuickCopy} />
          </div>
        )}
      </div>
    );
  }

  const toggle = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      tabIndex={0}
      onClickCapture={toggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') toggle(event);
      }}
      className={`w-full cursor-pointer rounded-[8px] p-[16px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--main-m1,#49A3A6)] ${variant === 'user' ? 'flex items-start gap-[8px]' : 'flex flex-col'}`}
      style={{ background: selected ? 'var(--main-m1-08, rgba(73,163,166,0.08))' : 'var(--content-br02, rgba(0,0,0,0.02))' }}
    >
      {variant === 'user' ? (
        <>
          <SelectCheckbox checked={selected} />
          <div className="min-w-0 flex-1">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
