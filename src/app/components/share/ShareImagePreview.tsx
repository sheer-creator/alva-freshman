import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toPng } from 'html-to-image';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ShareContent } from './ShareContent';
import type { ConversationShareMessage } from './conversation-share';

const FONT = "'Delight', sans-serif";
type ImageAction = 'copy' | 'download' | null;

export function ShareImagePreview({ open, messages, onClose }: { open: boolean; messages: ConversationShareMessage[]; onClose: () => void }) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [activeAction, setActiveAction] = useState<ImageAction>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setActiveAction(null);
    setCopied(false);
    setError(null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const renderPng = () => {
    if (!exportRef.current) throw new Error('Image preview is not ready.');
    return toPng(exportRef.current, {
      backgroundColor: '#ffffff',
      cacheBust: true,
      pixelRatio: 2,
      skipFonts: true,
      width: 540,
      style: {
        position: 'static',
        left: 'auto',
        top: 'auto',
        zIndex: 'auto',
      },
    });
  };

  const copy = async () => {
    if (activeAction) return;
    setActiveAction('copy');
    setCopied(false);
    setError(null);
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('Image clipboard is not supported.');
      }
      const pngBlob = renderPng().then(async (dataUrl) => {
        const response = await fetch(dataUrl);
        return response.blob();
      });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
      setCopied(true);
    } catch {
      setError('Image copy is not supported here. Download it instead.');
    } finally {
      setActiveAction(null);
    }
  };

  const download = async () => {
    if (activeAction) return;
    setActiveAction('download');
    setCopied(false);
    setError(null);
    try {
      const dataUrl = await renderPng();
      const link = document.createElement('a');
      link.download = `alva-shared-conversation-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setError('Image generation failed. Try again.');
    } finally {
      setActiveAction(null);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-[16px] py-[24px]" style={{ background: 'rgba(0,0,0,0.52)' }} onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="share-image-title" className="flex max-h-full w-full max-w-[680px] flex-col overflow-hidden rounded-[12px] bg-white" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }} onClick={(event) => event.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between gap-[16px] border-b px-[20px] py-[16px]" style={{ borderColor: 'var(--line-l07, rgba(0,0,0,0.07))' }}>
          <p id="share-image-title" className="text-[16px] font-medium leading-[24px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Share image</p>
          <button type="button" aria-label="Close image preview" onClick={onClose} className="flex size-[32px] cursor-pointer items-center justify-center rounded-[4px] border-none bg-transparent hover:bg-[var(--b-r03,rgba(0,0,0,0.03))]">
            <CdnIcon name="close-l1" size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-[20px] sm:p-[28px]" style={{ background: 'var(--content-br03, rgba(0,0,0,0.03))' }}>
          <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-[8px] bg-white" style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}>
            <ShareContent messages={messages} variant="image" />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-[10px] border-t px-[20px] py-[16px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--line-l07, rgba(0,0,0,0.07))' }}>
          <p aria-live="polite" className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: error ? 'var(--main-m4, #e05357)' : 'var(--text-n5, rgba(0,0,0,0.5))' }}>{error ?? (copied ? 'Image copied to clipboard.' : 'Your selection stays active after closing this preview.')}</p>
          <div className="flex shrink-0 gap-[8px]">
            <button type="button" onClick={copy} disabled={activeAction !== null} className="flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[4px] bg-white px-[16px] text-[12px] font-medium leading-[20px] tracking-[0.12px] disabled:cursor-wait disabled:opacity-60" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))', border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}>
              <CdnIcon name="copy-l" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
              {activeAction === 'copy' ? 'Copying…' : copied ? 'Copied' : 'Copy'}
            </button>
            <button type="button" onClick={download} disabled={activeAction !== null} className="flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[4px] border-none px-[16px] text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white disabled:cursor-wait disabled:opacity-60" style={{ fontFamily: FONT, background: 'var(--main-m3, #2a9b7d)' }}>
              <CdnIcon name="download-l" size={14} color="#fff" />
              {activeAction === 'download' ? 'Generating…' : 'Download image'}
            </button>
          </div>
        </div>

        <div ref={exportRef} aria-hidden className="pointer-events-none fixed left-[-10000px] top-0 w-[540px] bg-white">
          <ShareContent messages={messages} variant="image" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
