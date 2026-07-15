/**
 * [INPUT]: Figma Alva-Library Modal/Portfolio Info（31584:10618）
 *          内容序列复用 portfolio/ConnectAccountModal 的 PortfolioInfoContent（成功流在连接弹窗内 FLIP 展开同一内容，遮罩不断）
 * [OUTPUT]: PortfolioInfoModal — 账户数据弹窗壳：遮罩 m7 + 480/p28/gap24/radius12 sheet
 * [POS]: AgentNewSession topbar Portfolio 已连接按钮打开；与 Connect IM / channel 设置同为居中弹窗
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { PortfolioInfoContent, type ConnectedBrokerInfo } from '@/app/components/portfolio/ConnectAccountModal';

export type { ConnectedBrokerInfo };

export function PortfolioInfoModal(props: {
  broker: ConnectedBrokerInfo;
  onClose: () => void;
  onViewPortfolio: () => void;
  onTrade: () => void;
  onWatch: () => void;
  onConnectAnother: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[48px]"
      style={{ background: 'var(--main-m7, rgba(0,0,0,0.6))', animation: 'portfolio-info-overlay-in 0.2s ease' }}
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio summary"
    >
      <style>{`
        @keyframes portfolio-info-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes portfolio-info-sheet-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
      `}</style>
      <div
        className="flex w-full max-w-[480px] flex-col items-center gap-[24px] rounded-[8px] p-[28px]"
        style={{
          background: '#fff',
          border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          animation: 'portfolio-info-sheet-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <PortfolioInfoContent {...props} />
      </div>
    </div>
  );
}
