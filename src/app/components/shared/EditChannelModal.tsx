/**
 * [INPUT]: Figma Modal/Edit Channel 9732:448009（Action sheet）
 * [OUTPUT]: Edit Channel 弹窗 —— 仅 Description(0/160) + Save(未改动/无变化时禁用)
 * [POS]: AgentNewSession 频道态点右上角 settings 弹出;保存走 onSave(description)
 */

import { useState } from 'react';
import { CdnIcon } from './CdnIcon';

const FONT = "'Delight', sans-serif";
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';

const DESC_MAX = 160;

const SCOPED_CSS = `
.ec-field::placeholder { color: var(--text-n3, rgba(0,0,0,0.3)); }
`;

export function EditChannelModal({
  description,
  onClose,
  onSave,
}: {
  description: string;
  onClose: () => void;
  onSave: (description: string) => void;
}) {
  const [desc, setDesc] = useState(description);
  const dirty = desc.trim() !== description.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[16px] py-[28px]"
      style={{ background: 'var(--main-m7, rgba(0,0,0,0.6))' }}
      onClick={onClose}
    >
      <style>{SCOPED_CSS}</style>
      <div
        className="flex w-full max-w-[480px] flex-col gap-[16px] overflow-hidden rounded-[var(--radius-pop-dialog,8px)] bg-white p-[28px]"
        style={{ border: `0.5px solid ${L2}`, boxShadow: '0 10px 20px 0 rgba(0,0,0,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="flex w-full items-start gap-[12px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <p className="text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ fontFamily: FONT, color: N9 }}>Edit Channel</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: N7 }}>
              A personal channel — chat, tasks, memory, and artifacts stay scoped to one topic.
            </p>
          </div>
          <button type="button" className="shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60" onClick={onClose} aria-label="Close">
            <CdnIcon name="close-l1" size={18} color={N9} />
          </button>
        </div>

        {/* Description（0/160）— Figma 9732:448012:区块总高 208(label 26 + gap 12 + 输入框 170) */}
        <div className="flex h-[208px] w-full flex-col gap-[12px]">
          <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: N7 }}>Description</span>
          <div className="relative min-h-0 w-full flex-1 rounded-[var(--radius-btn-m,6px)] bg-white p-[16px]" style={{ border: `0.5px solid ${L3}` }}>
            <textarea
              autoFocus
              value={desc}
              maxLength={DESC_MAX}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="E.g. Track silicon, networking, and hyperscaler names with news, catalysts, and position-relevant alerts."
              className="ec-field h-full w-full resize-none border-none bg-transparent p-0 pr-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none"
              style={{ fontFamily: FONT, color: N9 }}
            />
            <span className="absolute bottom-[15.5px] right-[15.5px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: N5 }}>
              {desc.length}/{DESC_MAX}
            </span>
          </div>
        </div>

        {/* Save（全宽,未改动禁用）— Figma 9732:448013:pt-8,py-11,radius 6 */}
        <div className="flex w-full items-center justify-end gap-[12px] pt-[8px]">
          <button
            type="button"
            disabled={!dirty}
            onClick={() => onSave(desc.trim())}
            className="flex min-w-0 flex-1 items-center justify-center gap-[8px] rounded-[var(--radius-btn-m,6px)] px-[20px] py-[11px] transition-[filter,background] hover:enabled:brightness-95"
            style={{
              background: dirty ? 'var(--main-m1, #49A3A6)' : 'white',
              border: dirty ? 'none' : `0.5px solid ${L3}`,
              cursor: dirty ? 'pointer' : 'default',
            }}
          >
            <span className="truncate text-[16px] font-medium leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: dirty ? '#fff' : N2 }}>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
