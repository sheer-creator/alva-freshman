import { AVATAR_COLOR_PALETTE, CREATOR_AVATARS } from '@/lib/chart-theme';

export function Avatar({ name, size }: { name: string; size: number }) {
  const src = CREATOR_AVATARS[name];
  if (src) {
    return (
      <img
        className="rounded-full flex-shrink-0 object-cover bg-[#f0f0f0]"
        src={src}
        width={size}
        height={size}
        alt={name}
      />
    );
  }
  const initial = name.trim().charAt(0).toUpperCase();
  const sum = [...name].reduce((s, c) => s + c.charCodeAt(0), 0);
  const color = AVATAR_COLOR_PALETTE[sum % AVATAR_COLOR_PALETTE.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.44, color: '#fff', lineHeight: 1, fontFamily: "'Delight', sans-serif" }}>{initial}</span>
    </div>
  );
}
