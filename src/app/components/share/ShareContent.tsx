import { getConversationShareTitle, type ConversationShareMessage } from './conversation-share';

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
      <div aria-label="You" className="flex w-full flex-col items-end">
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
        </div>
        <p className="whitespace-pre-wrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{message.text}</p>
      </div>
    </div>
  );
}

export function ShareContent({ messages, variant = 'page' }: { messages: ConversationShareMessage[]; variant?: 'page' | 'image' }) {
  const base = import.meta.env.BASE_URL;
  const title = getConversationShareTitle(messages);

  return (
    <article
      className={variant === 'image' ? '' : 'p-[20px] sm:p-[32px]'}
      style={{ width: '100%', padding: variant === 'image' ? 32 : undefined, background: 'var(--b0-container, #fff)', fontFamily: FONT }}
    >
      <header>
        <h1 className="text-[18px] font-medium leading-[26px] tracking-[0.18px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{title}</h1>
      </header>

      <div className="flex flex-col gap-[24px] pb-[28px] pt-[24px]">
        {messages.map((message, index) => (
          <div key={message.id} className="flex flex-col gap-[24px]">
            {(index === 0 || messages[index - 1].date !== message.date) && <DateSeparator date={message.date} />}
            <SharedMessage message={message} />
          </div>
        ))}
      </div>

      <footer className="flex items-center justify-between gap-[24px] border-t pt-[20px]" style={{ borderColor: 'var(--line-l07, rgba(0,0,0,0.07))' }}>
        <div className="flex min-w-0 flex-col items-start gap-[3px]">
          <img src={`${base}logo-alva-beta-green-black.svg`} alt="Alva" className="h-[14px] w-auto" />
          <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Your AI Investing Agent</p>
          <a href="https://alva.ai" target="_blank" rel="noreferrer" className="text-[11px] font-medium leading-[18px] tracking-[0.11px] no-underline" style={{ color: 'var(--text-n3, rgba(0,0,0,0.3))' }}>alva.ai</a>
        </div>
        <a href="https://alva.ai" target="_blank" rel="noreferrer" aria-label="Open alva.ai" className="shrink-0">
          <img src={`${base}alva-ai-qr.svg`} alt="QR code for alva.ai" className="size-[64px]" />
        </a>
      </footer>
    </article>
  );
}
