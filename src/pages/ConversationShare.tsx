import { useEffect, useState } from 'react';
import type { Page } from '@/app/App';
import { ShareContent } from '@/app/components/share/ShareContent';
import { readConversationShare, revokeConversationShare, type ConversationShareSnapshot } from '@/app/components/share/conversation-share';

const FONT = "'Delight', sans-serif";

function UnavailableShare({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-[20px] py-[48px]" style={{ background: 'var(--content-br03, #f7f7f7)' }}>
      <div className="flex w-full max-w-[480px] flex-col items-center gap-[18px] rounded-[12px] bg-white px-[28px] py-[40px] text-center" style={{ border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
        <img src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`} alt="Alva" className="h-[16px] w-auto" />
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[20px] font-medium leading-[30px] tracking-[0.2px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>This shared conversation is unavailable</h1>
          <p className="text-[13px] leading-[21px] tracking-[0.13px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>The creator may have stopped sharing it, or the link is invalid.</p>
        </div>
        <button type="button" onClick={() => onNavigate('agent')} className="h-[36px] cursor-pointer rounded-[4px] border-none px-[16px] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white" style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}>Continue with Alva</button>
      </div>
    </main>
  );
}

export default function ConversationShare({ shareId, onNavigate }: { shareId: string; onNavigate: (page: Page) => void }) {
  const [snapshot, setSnapshot] = useState<ConversationShareSnapshot | null>(() => readConversationShare(shareId));

  useEffect(() => {
    document.title = 'Shared from Alva';
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const meta = existing ?? document.createElement('meta');
    const previous = existing?.content;
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    if (!existing) document.head.appendChild(meta);
    return () => {
      document.title = 'Alva Baby';
      if (!existing) meta.remove();
      else meta.content = previous ?? '';
    };
  }, []);

  if (!snapshot || snapshot.revoked) return <UnavailableShare onNavigate={onNavigate} />;

  const stopSharing = () => {
    const revoked = revokeConversationShare(snapshot.id);
    if (revoked) setSnapshot(revoked);
  };

  return (
    <main className="min-h-screen px-[16px] py-[24px] sm:px-[24px] sm:py-[48px]" style={{ background: 'var(--content-br03, #f7f7f7)' }}>
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-[16px]">
        <div className="overflow-hidden rounded-[12px] bg-white" style={{ border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
          <ShareContent messages={snapshot.messages} />
        </div>
        <div className="flex flex-col items-center justify-between gap-[12px] rounded-[8px] bg-white px-[16px] py-[14px] sm:flex-row" style={{ border: '0.5px solid var(--line-l07, rgba(0,0,0,0.07))' }}>
          <p className="text-center text-[12px] leading-[20px] tracking-[0.12px] sm:text-left" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Continue the research, build a Playbook, or put Alva on watch.</p>
          <button type="button" onClick={() => onNavigate('agent')} className="h-[36px] shrink-0 cursor-pointer rounded-[4px] border-none px-[16px] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white" style={{ fontFamily: FONT, background: 'var(--main-m1, #49A3A6)' }}>Continue with Alva</button>
        </div>
        <button type="button" onClick={stopSharing} className="self-center border-none bg-transparent px-[8px] py-[4px] text-[11px] leading-[18px] tracking-[0.11px] underline decoration-dotted underline-offset-4" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Stop sharing this excerpt</button>
      </div>
    </main>
  );
}
