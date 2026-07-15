/**
 * [INPUT]: Figma Modal/Connect 7908:69704 / 7908:69797
 * [OUTPUT]: ConnectAppList(行列表) + ConnectAppsModal(弹窗) — 绑定/解绑与"谁接收消息"单选合一
 * [POS]: shared; AlvaAgentSettings(inline) / AgentNewSession / AgentChannelNewUserDemo
 */

import { useState } from 'react';
import { CdnIcon } from './CdnIcon';

const FONT = "'Delight', sans-serif";

export type ConnectAppRowData = {
  id: string;
  name: string;
  sub: string;
  handle: string;
  logo: string;
};

/** 链接式渠道行(如 iMessage)——不走连接/单选,点击跳转到独立流程,尾部箭头 */
export type ConnectLinkRow = {
  id: string;
  name: string;
  sub: string;
  logo: string;
};

export function ConnectAppList({
  rows,
  connectedIds,
  activeId,
  onConnect,
  onDisconnect,
  onSetActive,
  interceptConnect,
  linkRows,
  onLinkRow,
}: {
  rows: ConnectAppRowData[];
  connectedIds: string[];
  activeId: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onSetActive: (id: string) => void;
  /** 返回 true 表示由调用方接管连接流程(如 Discord 配对弹窗) */
  interceptConnect?: (id: string) => boolean;
  /** 链接式渠道(如 iMessage)——固定排在列表末尾,尾部箭头,点击走 onLinkRow */
  linkRows?: ConnectLinkRow[];
  onLinkRow?: (id: string) => void;
}) {
  const [pending, setPending] = useState<string | null>(null);
  const start = (id: string) => {
    if (interceptConnect?.(id)) return;
    setPending(id);
    setTimeout(() => {
      setPending(null);
      onConnect(id);
    }, 900);
  };
  const ordered = [...rows].sort(
    (a, b) => Number(connectedIds.includes(b.id)) - Number(connectedIds.includes(a.id)),
  );
  return (
    <div className="flex w-full flex-col gap-[16px]">
      {ordered.map((row) => {
        const connected = connectedIds.includes(row.id);
        const isActive = connected && activeId === row.id;
        const switchable = connected && !isActive;
        const busy = pending === row.id;
        return (
          <div
            key={row.id}
            className={`group flex w-full items-center gap-[12px] rounded-[var(--radius-ct-l,8px)] px-[16px] py-[12px]${switchable ? ' cursor-pointer' : ''}`}
            onClick={switchable ? () => onSetActive(row.id) : undefined}
            title={switchable ? `Receive messages on ${row.name}` : undefined}
            style={{
              background: isActive
                ? 'var(--main-m1-10, rgba(73,163,166,0.1))'
                : connected
                  ? 'var(--grey-g01, #fafafa)'
                  : '#fff',
              border: connected ? '0.5px solid transparent' : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
            }}
          >
            <img src={row.logo} alt="" className="size-[36px] shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                {row.name}
              </p>
              <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                {connected ? row.handle : row.sub}
              </p>
            </div>
            {connected ? (
              <>
                <button
                  type="button"
                  className="shrink-0 cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-[12px] leading-[20px] tracking-[0.12px] transition-opacity hover:opacity-70"
                  style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDisconnect(row.id);
                  }}
                >
                  Disconnect
                </button>
                {isActive ? (
                  <span className="shrink-0" title={`Receiving messages on ${row.name}`}>
                    <CdnIcon name="check-f2" size={20} color="var(--main-m1, #49A3A6)" />
                  </span>
                ) : (
                  <span className="shrink-0">
                    <span className="block group-hover:hidden">
                      <CdnIcon name="check-f2" size={20} color="var(--text-n1, rgba(0,0,0,0.1))" />
                    </span>
                    <span className="hidden group-hover:block">
                      <CdnIcon name="check-f2" size={20} color="var(--main-m1-40, rgba(73,163,166,0.4))" />
                    </span>
                  </span>
                )}
              </>
            ) : (
              <button
                type="button"
                className="flex h-[32px] w-[84px] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-btn-s,4px)] bg-transparent px-[16px] py-[6px] transition-colors hover:bg-[var(--b-r02)]"
                style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
                onClick={() => !busy && start(row.id)}
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  {busy ? 'Connecting…' : 'Connect'}
                </span>
              </button>
            )}
          </div>
        );
      })}
      {linkRows?.map((row) => (
        <button
          key={row.id}
          type="button"
          className="flex w-full cursor-pointer items-center gap-[12px] rounded-[var(--radius-ct-l,8px)] bg-white px-[16px] py-[12px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
          style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
          onClick={() => onLinkRow?.(row.id)}
        >
          <img src={row.logo} alt="" className="size-[36px] shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-[16px] leading-[26px] tracking-[0.16px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {row.name}
            </p>
            <p className="truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              {row.sub}
            </p>
          </div>
          <span className="shrink-0">
            <CdnIcon name="arrow-right-f2" size={14} color="var(--text-n2, rgba(0,0,0,0.2))" />
          </span>
        </button>
      ))}
    </div>
  );
}

export function ConnectAppsModal({
  overlay = 'fixed',
  onClose,
  ...listProps
}: {
  overlay?: 'fixed' | 'absolute';
  onClose: () => void;
} & Parameters<typeof ConnectAppList>[0]) {
  return (
    <div
      className={`${overlay === 'fixed' ? 'fixed z-50' : 'absolute z-30'} inset-0 flex items-center justify-center px-[16px] py-[48px]`}
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[480px] flex-col gap-[12px] rounded-[var(--radius-pop-dialog,8px)] bg-white p-[28px]"
        style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-start gap-[12px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <p className="text-[18px] font-medium leading-[28px] tracking-[0.18px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Connect
            </p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>
              Choose the messaging app for your Alva.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60"
            onClick={onClose}
            aria-label="Close"
          >
            <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>
        <ConnectAppList {...listProps} />
      </div>
    </div>
  );
}
