/**
 * [INPUT]: Figma Draft 11184:42100（Portfolio 已连接 topbar 弹窗）+ 11184:45791（账户切换 Dropdown）
 *          portfolio/ConnectAccountModal 的 BrokerLogo/brokerDisplayInfo
 * [OUTPUT]: PortfolioPopover — 账户缩略信息浮层：账户头(可下拉切换账户) + 总值 + 持仓表 + 行动卡（Trade/Watch 按权限分支）+ View in Portfolio
 * [POS]: AgentNewSession topbar Portfolio 已连接按钮下方锚定；点击底链才跳 Portfolio 页
 *        容器走浮层规范（对齐 AlertsPopover）：radius 8 / shadow-s / p20 / offset 6 / X 16
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { BrokerLogo, brokerDisplayInfo } from '@/app/components/portfolio/ConnectAccountModal';

const FONT = "'Delight', sans-serif";

export interface ConnectedBrokerInfo {
  id: string;
  name: string;
  /** access level = trading 时展示 Trade 行动卡 */
  live: boolean;
  accountType: 'paper' | 'live';
}

interface AccountEntry extends ConnectedBrokerInfo {
  account: string;
}

/* mock 账号尾号（原型演示；风格与 PortfolioBuilder brokerage 网格一致） */
const MOCK_ACCOUNTS: Record<string, string> = {
  binance: '177***8896',
  okx: 'OK5***2043',
  hyperliquid: '0x9***a4F1',
  robinhood: 'RH2***4021',
  alpaca: 'PA3***6PEJ',
};

/* 账户切换下拉里的其他 mock 账户（Figma 11184:45791：同券商多账户 + 跨券商） */
const EXTRA_ACCOUNTS: AccountEntry[] = [
  { id: 'alpaca', name: 'Alpaca', live: false, accountType: 'paper', account: 'RE6***8BVC' },
  { id: 'binance', name: 'Binance', live: true, accountType: 'paper', account: '209***4415' },
];

/* mock 持仓（布局与 Figma 11184:42100 一致；数值调成与总值自洽） */
const TOTAL = { value: '$8,223.06', change: '+$1,234', pct: '+1.25%' };
const HOLDINGS = [
  { symbol: 'BTCUSDT', weight: '42.1%', value: '$3,461.91', pnl: '+$612.4', up: true },
  { symbol: 'ETHUSDT', weight: '24.6%', value: '$2,022.87', pnl: '+$214.8', up: true },
  { symbol: 'SOLUSDT', weight: '14.8%', value: '$1,217.01', pnl: '-$47.3', up: false },
  { symbol: 'DOGEUSDT', weight: '10.3%', value: '$846.97', pnl: '+$88.2', up: true },
  { symbol: 'BNBUSDT', weight: '8.2%', value: '$674.30', pnl: '+$31.5', up: true },
];

const accountLabel = (a: AccountEntry) => `${a.name} · ${a.account} · ${a.accountType === 'live' ? 'Live' : 'Paper'}`;

/* 行动卡行（Onboard Card 同款：p16 gap8，标题 14 Medium + desc 12 n5 + arrow 14 n5） */
function ActionRow({ emoji, title, desc, divider, onClick }: {
  emoji: string; title: string; desc: string; divider?: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-[8px] bg-transparent p-[16px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
      style={{ border: 'none', borderBottom: divider ? '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' : 'none', fontFamily: FONT }}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="w-full truncate text-[14px] font-medium leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {emoji}  {title}
        </span>
        <span className="w-full text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{desc}</span>
      </span>
      <CdnIcon name="arrow-right-l1" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
    </button>
  );
}

export function PortfolioPopover({ broker, onClose, onViewPortfolio, onTrade, onWatch, onConnectAnother }: {
  broker: ConnectedBrokerInfo;
  onClose: () => void;
  onViewPortfolio: () => void;
  onTrade: () => void;
  onWatch: () => void;
  /** 下拉里的 Connect Portfolio —— 关弹层并打开连接弹窗 */
  onConnectAnother: () => void;
}) {
  /* 当前查看的账户（弹层局部态，每次打开重置为真实连接的账户）；下拉切换只换查看对象 */
  const [active, setActive] = useState<AccountEntry>({ ...broker, account: MOCK_ACCOUNTS[broker.id] ?? 'PA3***6PEJ' });
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const accounts: AccountEntry[] = [
    { ...broker, account: MOCK_ACCOUNTS[broker.id] ?? 'PA3***6PEJ' },
    ...EXTRA_ACCOUNTS.filter((a) => !(a.id === broker.id && a.accountType === broker.accountType)),
  ];
  const display = brokerDisplayInfo(active.id);
  return (
    <>
      {/* 点外关闭的透明遮罩 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 z-50 flex w-[480px] flex-col items-center gap-[16px] p-[20px]"
        style={{
          top: 'calc(100% + 6px)',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          background: '#fff',
          border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          borderRadius: 'var(--radius-pop-popover, 8px)',
          boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))',
          fontFamily: FONT,
        }}
        role="dialog"
        aria-label="Portfolio summary"
      >
        {/* 账户头：logo 20 + 名 · 账号 · 类型 + 切换箭头(n2) + X 16 — Figma 11184:42180；点击账户区开切换下拉 */}
        <div className="flex w-full items-center gap-[8px]">
          <div className="relative flex min-w-0 items-center">
            <button
              type="button"
              onClick={() => setSwitcherOpen((o) => !o)}
              aria-expanded={switcherOpen}
              className="flex min-w-0 cursor-pointer items-center gap-[8px] border-none bg-transparent p-0 text-left"
            >
              {display && <BrokerLogo broker={display} size={20} />}
              <p className="whitespace-nowrap text-[14px] leading-[22px] tracking-[0.14px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                {accountLabel(active)}
              </p>
              <CdnIcon name="arrow-down-f2" size={14} color="var(--text-n2, rgba(0,0,0,0.2))" />
            </button>
            {/* 账户切换下拉 — Figma 11184:45791：320 宽 p4 radius 6 shadow-s；选中 m1 文字 + m1 8% 底 */}
            {switcherOpen && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setSwitcherOpen(false)} />
                <div
                  className="absolute left-0 z-[70] flex w-[320px] flex-col p-[4px]"
                  style={{
                    top: 'calc(100% + 4px)',
                    background: '#fff', /* module/b-dropdown */
                    border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
                    borderRadius: 'var(--radius-pop-dropdown, 6px)',
                    boxShadow: 'var(--shadow-s, 0 6px 20px 0 rgba(0,0,0,0.04))',
                  }}
                  role="listbox"
                  aria-label="Switch account"
                >
                  {accounts.map((a) => {
                    const selected = a.id === active.id && a.accountType === active.accountType && a.account === active.account;
                    return (
                      <button
                        key={`${a.id}-${a.account}`}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => { setActive(a); setSwitcherOpen(false); }}
                        className={`flex w-full cursor-pointer items-center gap-[8px] rounded-[4px] border-none px-[12px] py-[6px] text-left transition-colors ${selected ? '' : 'bg-transparent hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]'}`}
                        style={selected ? { background: 'rgba(73, 163, 166, 0.08)' } : undefined}
                      >
                        <span
                          className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]"
                          style={{ fontFamily: FONT, color: selected ? 'var(--main-m1, #49A3A6)' : 'var(--text-n9, rgba(0,0,0,0.9))' }}
                        >
                          {accountLabel(a)}
                        </span>
                      </button>
                    );
                  })}
                  {/* 分隔线 l12（行内 px12 py4） */}
                  <div className="flex w-full items-center px-[12px] py-[4px]">
                    <div className="h-[0.5px] w-full" style={{ background: 'var(--line-l12, rgba(0,0,0,0.12))' }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSwitcherOpen(false); onConnectAnother(); }}
                    className="flex w-full cursor-pointer items-center gap-[8px] rounded-[4px] border-none bg-transparent px-[12px] py-[6px] text-left transition-colors hover:bg-[var(--b-r02,rgba(0,0,0,0.02))]"
                  >
                    <CdnIcon name="add-l2" size={16} color="var(--text-n5, rgba(0,0,0,0.5))" />
                    <span className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                      Connect Portfolio
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
          <span className="min-w-0 flex-1" />
          <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 cursor-pointer border-none bg-transparent p-0 transition-opacity hover:opacity-60">
            <CdnIcon name="close-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
        </div>

        {/* 总值 + 持仓表 — Figma 11184:42101 浮层版（pt0 pb12 gap12；表格 gap4，列 88/64/flex/flex gap8） */}
        <div className="flex w-full flex-col gap-[12px] pb-[12px]">
          <div className="flex w-full items-center gap-[8px]">
            <p className="text-[20px] leading-[30px] tracking-[0.2px]" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{TOTAL.value}</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--main-m3, #2a9b7d)' }}>{TOTAL.change}</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--main-m3, #2a9b7d)' }}>{TOTAL.pct}</p>
          </div>
          <div className="flex w-full flex-col gap-[4px] text-[12px] leading-[20px] tracking-[0.12px]">
            <div className="flex w-full items-center gap-[8px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
              <span className="w-[88px] shrink-0">Symbol</span>
              <span className="w-[64px] shrink-0 text-right">Weight</span>
              <span className="min-w-0 flex-1 text-right">Value</span>
              <span className="min-w-0 flex-1 text-right">P&L</span>
            </div>
            {HOLDINGS.map((h) => (
              <div key={h.symbol} className="flex w-full items-center gap-[8px]">
                <span className="w-[88px] shrink-0 font-medium" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{h.symbol}</span>
                <span className="w-[64px] shrink-0 text-right" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{h.weight}</span>
                <span className="min-w-0 flex-1 text-right" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{h.value}</span>
                <span className="min-w-0 flex-1 text-right" style={{ color: h.up ? 'var(--main-m3, #2a9b7d)' : 'var(--main-m4, #e05357)' }}>{h.pnl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 行动卡：Trading 权限 = Trade + Watch 两行；Read-only 仅 Watch（与成功弹窗同规则，随所查看账户切换） */}
        <div className="flex w-full flex-col overflow-hidden rounded-[8px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
          {active.live && (
            <ActionRow
              emoji="📋"
              title="Trade with Alva in any channel"
              desc="Just tell me what to buy or sell — you approve each order, or bind a playbook to trade automatically."
              divider
              onClick={onTrade}
            />
          )}
          <ActionRow
            emoji="💼"
            title="Watch your portfolio 24/7"
            desc="I'll check it every hour and message you only when a move, risk, catalyst, or breaking story is worth your attention."
            onClick={onWatch}
          />
        </div>

        {/* 底链：View in Portfolio → 才真正跳页 */}
        <button
          type="button"
          onClick={onViewPortfolio}
          className="group flex cursor-pointer items-center justify-center gap-[4px] border-none bg-transparent p-0"
        >
          <span className="text-[12px] leading-[20px] tracking-[0.12px] transition-colors group-hover:text-[var(--text-n9,rgba(0,0,0,0.9))]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
            View in Portfolio
          </span>
          <CdnIcon name="arrow-right-l1" size={14} color="var(--text-n5, rgba(0,0,0,0.5))" />
        </button>
      </div>
    </>
  );
}
