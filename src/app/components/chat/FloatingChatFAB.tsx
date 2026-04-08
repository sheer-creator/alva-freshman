import { useChatContext } from './ChatContext';
import symbolLogo from './symbol-green-white.svg';

const ANIM_CSS = `
@keyframes fabBreathe {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(73,163,166,0.5), 0 4px 16px rgba(0,0,0,0.15);
  }
  50% {
    box-shadow: 0 0 12px 4px rgba(73,163,166,0.35), 0 4px 16px rgba(0,0,0,0.15);
  }
}
`;

export function FloatingChatFAB() {
  const { chatOpen, openChat } = useChatContext();

  if (chatOpen) return null;

  return (
    <>
      <style>{ANIM_CSS}</style>
      <button
        className="fixed z-30 flex items-center gap-[8px] cursor-pointer"
        style={{
          bottom: 28,
          right: 28,
          height: 40,
          padding: '0 12px 0 6px',
          borderRadius: 8,
          background: '#49A3A6',
          border: '0.5px solid rgba(0,0,0,0.7)',
          animation: 'fabBreathe 3s ease-in-out infinite',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.05)),#49A3A6'}
        onMouseLeave={e => e.currentTarget.style.background = '#49A3A6'}
        onClick={() => openChat(false)}
      >
        <div
          className="shrink-0 flex items-center justify-center size-[28px] rounded-[6px]"
          style={{ background: '#2a2a38' }}
        >
          <img src={symbolLogo} width={14} height={14} alt="Alva" />
        </div>
        <span className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] font-medium text-white whitespace-nowrap">
          Alva Agent
        </span>
      </button>
    </>
  );
}
