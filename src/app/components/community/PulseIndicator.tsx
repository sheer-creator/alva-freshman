/**
 * [INPUT]: pulse 状态
 * [OUTPUT]: 活跃度指示点（绿色动画圆点）
 * [POS]: 社区组件 — PlaybookHeader 中的用户在线状态
 */

export function PulseIndicator({ status = 'active' }: { status?: 'active' | 'idle' }) {
  const color = status === 'active' ? '#49A3A6' : '#838383';
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: 12, height: 12 }}>
      <span
        className="absolute inline-flex rounded-full opacity-30"
        style={{ width: 12, height: 12, background: color, animation: status === 'active' ? 'pulse 2s ease-in-out infinite' : 'none' }}
      />
      <span className="relative inline-flex rounded-full" style={{ width: 5, height: 5, background: color }} />
      {status === 'active' && (
        <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.1; transform: scale(1.3); } }`}</style>
      )}
    </span>
  );
}
