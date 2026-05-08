import { useEffect } from 'react';
import { DiscordConnectFlow } from './DiscordConnectFlow';

interface DiscordConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaired: () => void;
}

export function DiscordConnectModal({ isOpen, onClose, onPaired }: DiscordConnectModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'var(--main-m7, rgba(0,0,0,0.5))',
        paddingLeft: 'var(--spacing-m, 16px)',
        paddingRight: 'var(--spacing-m, 16px)',
        paddingTop: 'var(--spacing-xxxxxl, 48px)',
        paddingBottom: 'var(--spacing-xxxxxl, 48px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div onClick={e => e.stopPropagation()}>
        <DiscordConnectFlow onClose={onClose} onPaired={onPaired} />
      </div>
    </div>
  );
}
