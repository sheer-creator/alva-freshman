/**
 * [INPUT]: channel-meta 的 IMS/IM_TINT/IM_LINKS/CHANNEL、ChannelIcon
 * [OUTPUT]: ImConnectModal（IM 连接列表 + 连接中态）+ TgGuide（Telegram Threaded Mode 引导，外链视频带 mock 兜底）
 * [POS]: agent-channel/modals — 顶栏 Connect 与 imrec chips 的目标（源自 demo planc 3489-3562 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useEffect, useRef, useState } from 'react';
import { CHANNEL, IMS, IM_LINKS, IM_TINT } from '@/data/agent-channel/channel-meta';
import type { ImId } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';

/* ========== 连上 Telegram 后 — 官方 Threaded Mode 演示，离线时 mock 兜底 ========== */

function TgGuide({ onDone }: { onDone: () => void }) {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <div className="tg-guide">
      {videoOk ? (
        <video
          className="tgg-video"
          autoPlay loop muted playsInline
          poster="https://core.telegram.org/file/400780400227/2/btvhtJcqT_A.76194.jpg/b56e1d38cc2e92e2aa"
          src="https://core.telegram.org/file/400780400658/2/zyAsgGtzdvg.5107918.mp4/413b3825ef972abc2a"
          onError={() => setVideoOk(false)}
        />
      ) : (
        <div className="tgg-phone">
          <div className="tgg-head">
            <span className="tgg-ava"><img src={`${import.meta.env.BASE_URL}logo-portrait.svg`} alt="" /></span>
            <div><div className="tgg-name">Alva</div><div className="tgg-sub">bot · one DM for all your channels</div></div>
          </div>
          <div className="tgg-row" style={{ animationDelay: '120ms' }}><span className="tgg-i"><ChannelIcon name="agent" size={12} /></span>General<span className="tgg-n">Alva</span></div>
        </div>
      )}
      <div className="tgg-created"><span className="tgg-i">#</span>{CHANNEL.label}<span className="tgg-n">just created as a topic in your Alva bot DM</span></div>
      <div className="tgg-cap">One bot DM, a topic per channel — Telegram Threaded Mode. Reply inside a topic and it lands back in that channel; plain messages go to Alva. <a href="https://core.telegram.org/bots#natively-integrate-ai-chatbots" target="_blank" rel="noreferrer">Official demo ↗</a></div>
      <button className="post-go" style={{ width: '100%', marginTop: 12 }} onClick={onDone}>Continue connecting</button>
    </div>
  );
}

/* ========== IM 连接列表 ========== */

interface ImConnectModalProps {
  /** 从 "Connect Telegram" 入口打开时直接跑该 IM 的连接流程 */
  autoConnect?: ImId | null;
  onClose: () => void;
  onConnect: (imId: ImId) => void;
  onDisconnect: (imId: ImId) => void;
}

export function ImConnectModal({ autoConnect, onClose, onConnect, onDisconnect }: ImConnectModalProps) {
  const [pending, setPending] = useState<ImId | null>(null);
  const [guide, setGuide] = useState(false);
  // 触发重渲染（IM_LINKS 是模块级 store）
  const [, bump] = useState(0);
  const startRef = useRef((id: ImId) => {
    setPending(id);
    setTimeout(() => {
      setPending(null);
      onConnect(id);
      bump((n) => n + 1);
      if (id === 'telegram') setGuide(true);
    }, 900);
  });
  useEffect(() => {
    if (autoConnect && !IM_LINKS[autoConnect]) startRef.current(autoConnect);
  }, [autoConnect]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-h">
          <div>
            <div className="modal-t">Connect this channel</div>
            <div className="modal-s">Mirror {CHANNEL.label} to your IM — pushes land there, replies sync back.</div>
          </div>
          <button className="modal-x" onClick={onClose} aria-label="Close"><ChannelIcon name="plus" size={16} /></button>
        </div>
        <div className="modal-body">
          {guide ? <TgGuide onDone={() => setGuide(false)} /> : (
            <>
              {IMS.map((im) => {
                const on = !!IM_LINKS[im.id];
                const busy = pending === im.id;
                return (
                  <div className="im-row" key={im.id}>
                    <span className="im-ico" style={{ color: IM_TINT[im.id], background: `${IM_TINT[im.id]}1f` }}><ChannelIcon name={im.icon} size={16} /></span>
                    <div style={{ minWidth: 0 }}>
                      <div className="im-name">{im.label}</div>
                      <div className={`im-sub${on ? ' on' : ''}`}>{on ? `Connected · ${im.handle}` : im.sub}</div>
                    </div>
                    {on
                      ? <button className="im-off" onClick={() => { onDisconnect(im.id); bump((n) => n + 1); }}>Disconnect</button>
                      : <button className={`im-go${busy ? ' busy' : ''}`} onClick={() => !busy && startRef.current(im.id)}>{busy ? 'Connecting…' : 'Connect'}</button>}
                  </div>
                );
              })}
              <div className="im-note">Connections are per channel — each channel mirrors on its own.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
