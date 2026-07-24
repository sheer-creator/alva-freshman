/**
 * [INPUT]: Figma Modal/Share as Image 9260:2586 — 840 弹窗:标题行 + br05 预览区(banner/消息/footer 成图) + 双操作按钮
 * [OUTPUT]: Create image 弹窗;预览与导出共用 ShareImageDoc,html-to-image 出 784 宽 2x PNG
 * [POS]: AgentNewSession 分享选择态点 Create image 打开
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toPng } from 'html-to-image';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import type { ConversationShareMessage } from './conversation-share';

const FONT = "'Delight', sans-serif";
const EXPORT_WIDTH = 784; // 稿内成图宽:840 卡片 - 28×2 预览区 padding
type ImageAction = 'copy' | 'download' | null;

function SharedImageMessage({ message }: { message: ConversationShareMessage }) {
  const base = import.meta.env.BASE_URL;
  const n9 = { fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' } as const;

  if (message.role === 'user') {
    /* User Bubble + 下方右对齐时间行（Figma 9265:39369:Hover 行在图里常显,absolute bottom-[-28px]） */
    return (
      <div className="relative flex w-full flex-col items-end">
        <div className="max-w-[560px] rounded-[8px] px-[16px] py-[12px]" style={{ background: 'var(--main-m1-10, rgba(73,163,166,0.1))' }}>
          <p className="whitespace-pre-wrap text-[14px] leading-[22px] tracking-[0.14px]" style={n9}>{message.text}</p>
        </div>
        <div className="absolute inset-x-0 bottom-[-28px] flex items-center justify-end">
          <p className="whitespace-nowrap text-right text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{message.time}</p>
        </div>
      </div>
    );
  }

  /* Alva Header + 内容 pl-30（Figma Chat/Block-Answer 9281:4190） */
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="flex h-[22px] items-center gap-[8px]">
        <img src={`${base}logo-portrait.svg`} alt="Alva" className="size-[22px] shrink-0 rounded-[4px]" />
        <span className="text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={n9}>Alva</span>
        <span className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'rgba(0,0,0,0.5)' }}>{message.time}</span>
      </div>
      <div className="pl-[30px]">
        <p className="whitespace-pre-wrap text-[14px] leading-[22px] tracking-[0.14px]" style={n9}>{message.text}</p>
      </div>
    </div>
  );
}

/* 成图主体:banner(132,ascii 纹理 + 居中 logo) + 消息流(p28 gap28) + divider + 品牌 footer(logo/标语 + QR 80) */
function ShareImageDoc({ messages }: { messages: ConversationShareMessage[] }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="flex w-full flex-col bg-white">
      {/* Banner — Figma 9286:43159:784×132 成品图(ascii 纹理 + 居中黑 logo 已烤入),整图直用不叠层 */}
      <img src={`${base}share-banner.jpg`} alt="Alva" className="block h-[132px] w-full shrink-0 object-cover" />
      <div className="flex w-full flex-col gap-[28px] bg-white p-[28px]">
        {messages.map((message) => (
          <SharedImageMessage key={message.id} message={message} />
        ))}
        <div className="w-full" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }} />
        <div className="flex w-full items-center gap-[16px]">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[12px]">
            {/* SymbolText-b-g-h:绿点 + 黑字横版 */}
            <img src={`${base}logo-alva-green-black.svg`} alt="Alva" className="h-[16px] w-auto" />
            <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>Your AI Investing Agent</p>
          </div>
          <img src={`${base}alva-ai-qr.svg`} alt="QR code for alva.ai" className="size-[80px] shrink-0" style={{ border: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }} />
        </div>
      </div>
    </div>
  );
}

export function ShareImagePreview({ open, messages, onClose }: { open: boolean; messages: ConversationShareMessage[]; onClose: () => void }) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [activeAction, setActiveAction] = useState<ImageAction>(null);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);
  const [downloadLabel, setDownloadLabel] = useState<string | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    setActiveAction(null);
    setCopyLabel(null);
    setDownloadLabel(null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const flashLabel = (set: (value: string | null) => void, value: string) => {
    set(value);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => set(null), 2400);
  };

  const renderPng = () => {
    if (!exportRef.current) throw new Error('Image preview is not ready.');
    return toPng(exportRef.current, {
      backgroundColor: '#ffffff',
      cacheBust: true,
      pixelRatio: 2,
      skipFonts: true,
      width: EXPORT_WIDTH,
    });
  };

  const copy = async () => {
    if (activeAction) return;
    setActiveAction('copy');
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('Image clipboard is not supported.');
      }
      const pngBlob = renderPng().then(async (dataUrl) => {
        const response = await fetch(dataUrl);
        return response.blob();
      });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
      flashLabel(setCopyLabel, 'Copied');
    } catch {
      flashLabel(setCopyLabel, 'Copy failed');
    } finally {
      setActiveAction(null);
    }
  };

  const download = async () => {
    if (activeAction) return;
    setActiveAction('download');
    try {
      const dataUrl = await renderPng();
      const link = document.createElement('a');
      link.download = `alva-shared-conversation-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      flashLabel(setDownloadLabel, 'Download failed');
    } finally {
      setActiveAction(null);
    }
  };

  /* 底部按钮 — Figma 9260:2786/2822:双白底描边 h48 radius 6 px20 gap8,icon 20 + Medium 16/26 n9 */
  const actionButtonClass = 'flex h-[48px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-[8px] rounded-[6px] bg-white px-[20px] py-[11px] text-[16px] font-medium leading-[26px] tracking-[0.16px] disabled:cursor-wait disabled:opacity-60';
  const actionButtonStyle = { fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' } as const;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center px-[16px] py-[48px]"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-image-title"
        className="flex h-full w-full max-w-[840px] flex-col overflow-hidden rounded-[8px] bg-white"
        style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start gap-[8px] px-[28px] pb-[20px] pt-[28px]">
          <p id="share-image-title" className="min-w-0 flex-1 text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            Share as image
          </p>
          <button
            type="button"
            aria-label="Close image preview"
            onClick={onClose}
            className="flex size-[18px] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0"
          >
            <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-[28px]" style={{ background: 'var(--content-br05, rgba(0,0,0,0.05))' }}>
          <div style={{ filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.04))' }}>
            <ShareImageDoc messages={messages} />
          </div>
        </div>

        <div className="flex shrink-0 gap-[12px] px-[28px] pb-[28px] pt-[20px]" style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}>
          <button type="button" onClick={copy} disabled={activeAction !== null} className={actionButtonClass} style={actionButtonStyle}>
            <CdnIcon name="copy-l" size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
            {activeAction === 'copy' ? 'Copying…' : copyLabel ?? 'Copy image'}
          </button>
          <button type="button" onClick={download} disabled={activeAction !== null} className={actionButtonClass} style={actionButtonStyle}>
            <CdnIcon name="download-l" size={20} color="var(--text-n9, rgba(0,0,0,0.9))" />
            {activeAction === 'download' ? 'Generating…' : downloadLabel ?? 'Download image'}
          </button>
        </div>

        {/* 离屏导出副本:固定 784 宽,无预览容器阴影 */}
        <div ref={exportRef} aria-hidden className="pointer-events-none fixed left-[-10000px] top-0 w-[784px] bg-white">
          <ShareImageDoc messages={messages} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
