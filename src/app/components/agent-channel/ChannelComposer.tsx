/**
 * [INPUT]: alva-chat/InputBar（复用：textarea + @mention + 发送）、ChannelIcon
 * [OUTPUT]: ChannelComposer — quick replies 行 + 输入框 + 免责 footnote
 * [POS]: agent-channel — Chat tab 底部输入区（源自 demo planc 2261-2307 行，输入框换用产品 InputBar）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { InputBar } from '@/app/components/alva-chat/InputBar';
import { ChannelIcon } from './ChannelIcon';

export interface QuickReply { icon?: string; text: string }

interface ChannelComposerProps {
  quickReplies?: QuickReply[] | null;
  placeholder?: string | null;
  onSend: (text: string) => void;
}

export function ChannelComposer({ quickReplies, placeholder, onSend }: ChannelComposerProps) {
  return (
    <div className="composer-wrap">
      {quickReplies && quickReplies.length > 0 && (
        <div className="composer-inner" style={{ maxWidth: 720 }}>
          <div className="quickreplies">
            {quickReplies.map((q) => (
              <button className="qr" key={q.text} onClick={() => onSend(q.text)}>
                {q.icon ? <span className="qr-ico"><ChannelIcon name={q.icon} size={14} /></span> : <span className="lead">/</span>}
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}
      <InputBar onSend={onSend} placeholder={placeholder || 'Ask Alva anything.  @ for context,  / for skills'} />
      <div className="footnote">Alva can make mistakes. Verify important information before trading.</div>
    </div>
  );
}
