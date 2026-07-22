import type { ConversationShareMessage } from './conversation-share';

const FONT = "'Delight', sans-serif";

function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-[12px] py-[4px]">
      <span className="h-px flex-1" style={{ background: 'var(--line-l07, rgba(0,0,0,0.07))' }} />
      <span className="whitespace-nowrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{date}</span>
      <span className="h-px flex-1" style={{ background: 'var(--line-l07, rgba(0,0,0,0.07))' }} />
    </div>
  );
}

function SharedMessage({ message }: { message: ConversationShareMessage }) {
  const base = import.meta.env.BASE_URL;
  if (message.role === 'user') {
    return (
      <div className="flex w-full flex-col items-end gap-[5px]">
        <div className="flex items-center gap-[6px] whitespace-nowrap pr-[2px]">
          <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>You</span>
          <span className="whitespace-nowrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{message.time}</span>
        </div>
        <div className="max-w-[82%] rounded-[8px] px-[14px] py-[10px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
          <p className="whitespace-pre-wrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start gap-[8px]">
      <img src={`${base}logo-portrait.svg`} alt="Alva" className="size-[22px] shrink-0 rounded-[4px]" />
      <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
        <div className="flex flex-wrap items-center gap-[7px]">
          <span className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Alva</span>
          {message.role === 'notification' && (
            <span className="rounded-[4px] px-[5px] text-[10px] leading-[16px] tracking-[0.2px]" style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>alert</span>
          )}
          <span className="whitespace-nowrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ fontFamily: FONT, color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{message.time}</span>
        </div>
        <p className="whitespace-pre-wrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{message.text}</p>
      </div>
    </div>
  );
}

export function ShareContent({ messages, variant = 'page' }: { messages: ConversationShareMessage[]; variant?: 'page' | 'image' }) {
  return (
    <article
      className={variant === 'image' ? '' : 'p-[20px] sm:p-[32px]'}
      style={{ width: '100%', padding: variant === 'image' ? 32 : undefined, background: 'var(--b0-container, #fff)', fontFamily: FONT }}
    >
      <header className="flex items-start justify-between gap-[24px] border-b pb-[20px]" style={{ borderColor: 'var(--line-l07, rgba(0,0,0,0.07))' }}>
        <div className="flex flex-col gap-[8px]">
          <img src={`${import.meta.env.BASE_URL}logo-alva-beta-green-black.svg`} alt="Alva" className="h-[14px] w-auto self-start" />
          <p className="whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Shared from Alva</p>
        </div>
        <p className="shrink-0 whitespace-nowrap text-right text-[11px] leading-[18px] tracking-[0.11px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>{messages.length} {messages.length === 1 ? 'message' : 'messages'}</p>
      </header>

      <div className="flex flex-col gap-[24px] py-[28px]">
        {messages.map((message, index) => (
          <div key={message.id} className="flex flex-col gap-[24px]">
            {(index === 0 || messages[index - 1].date !== message.date) && <DateSeparator date={message.date} />}
            <SharedMessage message={message} />
          </div>
        ))}
      </div>

      <footer className="flex items-center justify-between gap-[20px] border-t pt-[18px]" style={{ borderColor: 'var(--line-l07, rgba(0,0,0,0.07))' }}>
        <span className="whitespace-nowrap text-[11px] leading-[18px] tracking-[0.11px]" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>Local prototype excerpt</span>
        <span className="shrink-0 whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>alva.ai</span>
      </footer>
    </article>
  );
}
