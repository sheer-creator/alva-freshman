import type { CSSProperties, ReactNode } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

export const SETTINGS_FONT = "'Delight', sans-serif";

export function SettingsSection({
  title,
  subtitle,
  right,
  children,
  gap = 16,
  style,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children?: ReactNode;
  gap?: number;
  style?: CSSProperties;
}) {
  return (
    <section className="w-full max-w-[944px] flex flex-col" style={{ gap, ...style }}>
      {(title || subtitle || right) && (
        <div className="flex items-center gap-[16px] w-full" style={{ minHeight: subtitle || right ? 50 : 28 }}>
          <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
            {title && (
              <p className="text-[18px] leading-[28px] tracking-[0.18px]" style={{ color: 'var(--text-n9)', fontFamily: SETTINGS_FONT, fontWeight: 400 }}>
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5)', fontFamily: SETTINGS_FONT, fontWeight: 400 }}>
                {subtitle}
              </p>
            )}
          </div>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

export function RowCard({
  children,
  className = '',
  style,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      className={`w-full flex items-center gap-[16px] p-[20px] rounded-[8px] overflow-hidden ${onClick ? 'text-left cursor-pointer transition-[filter] hover:brightness-[0.98]' : ''} ${className}`}
      style={{
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        fontFamily: SETTINGS_FONT,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export function DividedRows({ children }: { children: ReactNode[] }) {
  return (
    <div
      className="w-full flex flex-col rounded-[8px] overflow-hidden px-[20px] py-[4px]"
      style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', background: 'var(--b0-container, #fff)' }}
    >
      {children.map((child, index) => (
        <div key={index} className="w-full">
          {index > 0 && <div className="w-full h-0" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }} />}
          <div className="py-[16px]">{child}</div>
        </div>
      ))}
    </div>
  );
}

export function ToggleSwitch({ on, size = 16, onClick }: { on: boolean; size?: 16 | 20; onClick?: () => void }) {
  const width = size === 20 ? 40 : 32;
  const thumb = size === 20 ? 13.333 : 10.667;
  const inset = size === 20 ? 3.333 : 2.667;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className="relative shrink-0 overflow-hidden rounded-[1000px] border-none p-0 cursor-pointer"
      style={{
        width,
        height: size,
        background: on ? 'var(--main-m1, #49A3A6)' : 'var(--grey-g1, #dedede)',
      }}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: thumb,
          height: thumb,
          left: on ? width - thumb - inset : inset,
          background: '#fff',
          transition: 'left 0.12s ease',
        }}
      />
    </button>
  );
}

export function IconButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="size-[24px] flex items-center justify-center rounded-[4px] border-none cursor-pointer"
      style={{ background: 'var(--button-b-btn-primary-reverse, #fff)' }}
    >
      <CdnIcon name={icon} size={16} color="var(--text-n9)" />
    </button>
  );
}

export function PrimaryButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[32px] px-[12px] flex items-center justify-center gap-[6px] rounded-[4px] border-none cursor-pointer text-[12px] leading-[20px] tracking-[0.12px] font-medium ${className}`}
      style={{ background: 'var(--main-m1, #49A3A6)', color: '#fff', fontFamily: SETTINGS_FONT }}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[32px] px-[12px] flex items-center justify-center gap-[6px] rounded-[4px] cursor-pointer text-[12px] leading-[20px] tracking-[0.12px] font-medium ${className}`}
      style={{ background: '#fff', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9)', fontFamily: SETTINGS_FONT }}
    >
      {children}
    </button>
  );
}

export function FieldShell({
  label,
  children,
  height,
}: {
  label: string;
  children: ReactNode;
  height?: number;
}) {
  return (
    <div className="w-full flex flex-col gap-[12px]" style={height ? { height } : undefined}>
      <p className="text-[16px] leading-[26px] tracking-[0.16px]" style={{ color: 'var(--text-n9)', fontFamily: SETTINGS_FONT, fontWeight: 400 }}>
        {label}
      </p>
      {children}
    </div>
  );
}
