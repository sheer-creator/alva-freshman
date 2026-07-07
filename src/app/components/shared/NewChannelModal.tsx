/**
 * [INPUT]: Figma Modal/New Topic Channel 9502:493865（含错误态 9740:448938）
 * [OUTPUT]: New Channel 弹窗 —— Name(必填,红星,错误态) + Description(选填,0/500) + Create
 * [POS]: Sidebar「Channels +」点击后弹出;创建走 onCreate(name, description)
 */

import { useState } from 'react';
import { CdnIcon } from './CdnIcon';

const FONT = "'Delight', sans-serif";
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N7 = 'var(--text-n7, rgba(0,0,0,0.7))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
const N3 = 'var(--text-n3, rgba(0,0,0,0.3))';
const N2 = 'var(--text-n2, rgba(0,0,0,0.2))';
const L2 = 'var(--line-l2, rgba(0,0,0,0.2))';
const L3 = 'var(--line-l3, rgba(0,0,0,0.3))';
const M4 = 'var(--main-m4, #e05357)';

const DESC_MAX = 500;

const SCOPED_CSS = `
.nc-field::placeholder { color: ${N3}; }
`;

export function NewChannelModal({
  onClose,
  onCreate,
  nameExists,
}: {
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
  nameExists?: (name: string) => boolean;
}) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = name.trim();
  const duplicate = trimmed.length > 0 && !!nameExists?.(trimmed);
  const error = duplicate ? 'A channel with this name already exists.' : '';
  const canCreate = trimmed.length > 0 && !duplicate;
  const showError = touched && !!error;

  const submit = () => {
    setTouched(true);
    if (!canCreate) return;
    onCreate(trimmed, desc);
  };

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
            <p className="text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ fontFamily: FONT, color: N9 }}>New Channel</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: N7 }}>
              A personal channel — chat, tasks, memory, and artifacts stay scoped to one topic.
            </p>
          </div>
          <button type="button" className="shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60" onClick={onClose} aria-label="Close">
            <CdnIcon name="close-l1" size={18} color={N9} />
          </button>
        </div>

        {/* Name（必填） */}
        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: N7 }}>Name</span>
            <span className="text-[16px] leading-[26px]" style={{ fontFamily: FONT, color: M4 }}>*</span>
          </div>
          <div className="flex w-full flex-col gap-[4px]">
            <div className="flex h-[48px] w-full items-center rounded-[var(--radius-btn-m,6px)] bg-white px-[16px] py-[11px]" style={{ border: `0.5px solid ${showError ? M4 : L3}` }}>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                placeholder="E.g. ai-Infrastructure-watchlist"
                className="nc-field w-full min-w-0 flex-1 border-none bg-transparent p-0 text-[16px] leading-[26px] tracking-[0.16px] outline-none"
                style={{ fontFamily: FONT, color: N9 }}
              />
            </div>
            {showError && (
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: M4 }}>{error}</p>
            )}
          </div>
        </div>

        {/* Description（选填，0/500） */}
        <div className="flex w-full flex-col gap-[12px]">
          <span className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: N7 }}>Description</span>
          <div className="relative w-full rounded-[var(--radius-btn-m,6px)] bg-white p-[16px]" style={{ border: `0.5px solid ${L3}` }}>
            <textarea
              value={desc}
              maxLength={DESC_MAX}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="E.g. Track silicon, networking, and hyperscaler names with news, catalysts, and position-relevant alerts."
              className="nc-field h-[136px] w-full resize-none border-none bg-transparent p-0 pr-[8px] text-[16px] leading-[26px] tracking-[0.16px] outline-none"
              style={{ fontFamily: FONT, color: N9 }}
            />
            <span className="absolute bottom-[15.5px] right-[15.5px] text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: N5 }}>
              {desc.length}/{DESC_MAX}
            </span>
          </div>
        </div>

        {/* Create（全宽，未填/重名禁用）；与上方 Description 额外拉开 8px */}
        <div className="mt-[8px] flex w-full items-center justify-end gap-[12px]">
          <button
            type="button"
            disabled={!canCreate}
            onClick={submit}
            className="flex min-w-0 flex-1 items-center justify-center gap-[8px] rounded-[var(--radius-btn-m,6px)] px-[20px] py-[11px] transition-[filter,background] hover:enabled:brightness-95"
            style={{
              background: canCreate ? 'var(--main-m1, #49A3A6)' : 'white',
              border: canCreate ? 'none' : `0.5px solid ${L3}`,
              cursor: canCreate ? 'pointer' : 'default',
            }}
          >
            <span className="truncate text-[16px] font-medium leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: canCreate ? '#fff' : N2 }}>Create</span>
          </button>
        </div>
      </div>
    </div>
  );
}
