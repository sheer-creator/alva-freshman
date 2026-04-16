/**
 * [INPUT]: feed name / meta / description / stats / run history
 * [OUTPUT]: Feed 详情 Modal (Figma 6080:113219)
 * [POS]: 社区组件 — PlaybookInfoPopup 点击 feed 行弹出
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

/* ========== Status dot (14px) ========== */

function StatusDot({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center shrink-0" style={{ width: size, height: size }}>
      <div className="flex-1 h-full min-h-px min-w-px overflow-clip relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 14 14">
            <circle cx="7" cy="7" fill="#DBEDED" r="7" />
          </svg>
        </div>
        <div className="absolute bottom-[28.6%] left-1/2 top-[28.6%] -translate-x-1/2">
          <svg className="block size-full" fill="none" viewBox="0 0 5.99 5.99">
            <circle cx="2.996" cy="2.996" fill="#49A3A6" r="2.996" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ========== 类型 ========== */

export interface FeedRunHistoryItem {
  id: string;            // 例: "#142"
  duration: string;      // 例: "3.2s"
  timestamp: string;     // 例: "04/01/2026 14:00"
  status?: 'success' | 'failed';  // 末尾状态图标,默认 success
  log?: string;          // 展开后的执行日志 (mono 字体)
}

export interface FeedDetailStats {
  totalLabel: string;
  totalValue: string;
  successCount: number;
  failedCount: number;
}

export interface FeedDetailModalProps {
  open: boolean;
  onClose: () => void;
  feedName: string;
  lastRun?: string;        // "15m"
  runEvery?: string;       // "Every 5 minutes"
  totalRuns?: number;      // 142
  description: string;
  stats?: FeedDetailStats;
  history?: FeedRunHistoryItem[];
  /** 点击 "Manage feed" — 传入时显示入口(跳转到 Settings Automations) */
  onManage?: () => void;
}

/* ========== 默认数据(Figma 原型) ========== */

const DEFAULT_STATS: FeedDetailStats = {
  totalLabel: 'Total Runs',
  totalValue: '142',
  successCount: 140,
  failedCount: 2,
};

const DEFAULT_LOG_142 = `[14:00:01.102Z] Starting feed execution...
[14:00:01.205Z] Fetching OEM capacity data from 4 sources...
[14:00:02.418Z] GE Vernova:        OK (38.2 GW)
[14:00:02.892Z] Siemens Energy:    OK (31.1 GW)
[14:00:03.105Z] MHPS:              OK (22.4 GW)
[14:00:03.401Z] Shanghai Electric: OK (12.8 GW)
[14:00:03.520Z] Computing delta: total=104.5 GW, YoY=+8.3%
[14:00:03.890Z] Signal written to ~/feeds/.../signal.json
[14:00:04.302Z] Completed successfully. 3.2s, 0.5 credits.`;

const DEFAULT_HISTORY: FeedRunHistoryItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `#${142 - i}`,
  duration: '3.2s',
  timestamp: '04/01/2026 14:00',
  status: i === 3 ? 'failed' : 'success',  // #139 失败
  log: i === 0 ? DEFAULT_LOG_142 : undefined,
}));

/* ========== Stat 卡片 ========== */

function StatCard({ label, value, valueColor }: { label: string; value: string | number; valueColor?: string }) {
  return (
    <div
      className="flex flex-1 min-w-0 flex-col gap-[2px] justify-center items-start px-[16px] py-[12px] rounded-[8px]"
      style={{ background: '#fafafa' }}
    >
      <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
        {label}
      </p>
      <p
        className="font-['Delight',sans-serif] leading-[30px] text-[20px] tracking-[0.2px] w-full"
        style={{ color: valueColor ?? 'rgba(0,0,0,0.9)' }}
      >
        {value}
      </p>
    </div>
  );
}

/* ========== 组件 ========== */

export function FeedDetailModal({
  open,
  onClose,
  feedName,
  lastRun = '15m',
  runEvery = 'Every 5 minutes',
  totalRuns = 142,
  description,
  stats = DEFAULT_STATS,
  history = DEFAULT_HISTORY,
  onManage,
}: FeedDetailModalProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [descOverflows, setDescOverflows] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Modal 关闭时重置展开状态
  useEffect(() => { if (!open) { setExpandedId(null); setDescExpanded(false); } }, [open]);

  // 检测描述块是否溢出 280px
  useEffect(() => {
    if (!open || !descRef.current) return;
    setDescOverflows(descRef.current.scrollHeight > 280);
  }, [open, description]);

  if (!open) return null;

  // 用 Portal 渲染到 body,避免被祖先的 transform 困住 (fixed 会相对 transformed 祖先定位)
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[28px]"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="relative flex w-[600px] max-w-[720px] max-h-full flex-col rounded-[12px]"
        style={{
          background: '#fff',
          border: '0.5px solid rgba(0,0,0,0.2)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close — 贴在 dialog 右上角,不随内容滚动 */}
        <button
          type="button"
          className="absolute right-[27.5px] top-[27.5px] z-[1] size-[18px] flex items-center justify-center cursor-pointer bg-transparent border-none outline-none hover:opacity-70 transition-opacity p-0"
          aria-label="Close"
          onClick={onClose}
        >
          <CdnIcon name="close-l1" size={18} />
        </button>

        {/* 可滚动主体 — 内容超出 dialog 高度时整体滚动 */}
        <div className="flex flex-col gap-[16px] items-start p-[28px] overflow-y-auto min-h-0">
        {/* Header */}
        <div className="shrink-0 flex flex-col gap-[4px] items-start w-full">
          <div className="flex items-center gap-[8px] w-full">
            <StatusDot size={14} />
            <p className="font-['Delight',sans-serif] leading-[30px] text-[20px] text-[rgba(0,0,0,0.9)] tracking-[0.2px] whitespace-nowrap">
              {feedName}
            </p>
          </div>
          <div className="flex gap-[8px] items-center w-full whitespace-nowrap">
            <div className="flex gap-[8px] items-start font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
              <p>Last Run: {lastRun}</p>
              <p style={{ color: 'var(--text-n2)' }}>|</p>
              <p>{runEvery}</p>
              <p style={{ color: 'var(--text-n2)' }}>|</p>
              <p>{totalRuns} Runs</p>
            </div>
            {onManage && (
              <>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={onManage}
                  className="flex items-center gap-[2px] cursor-pointer bg-transparent border-none outline-none p-0 hover:opacity-70 transition-opacity"
                >
                  <span className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                    Manage feed
                  </span>
                  <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Description — grey block, collapsed 280px / expanded full height with animation */}
        <div
          ref={descRef}
          className={`shrink-0 relative flex flex-col gap-[8px] items-start w-full rounded-[8px] px-[16px] py-[12px] overflow-hidden ${descOverflows ? 'pb-[31px]' : ''}`}
          style={{
            background: '#fafafa',
            maxHeight: descExpanded ? (descRef.current?.scrollHeight ?? 9999) : 280,
            transition: 'max-height 0.3s ease-out',
          }}
        >
          <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] w-full">
            What This Feed Does
          </p>
          {/* Markdown/M — split paragraphs on blank lines, render **bold** as headings */}
          {description.split('\n\n').map((block, i) => {
            const boldMatch = block.match(/^\*\*(.+?)\*\*\n?([\s\S]*)$/);
            if (boldMatch) {
              return (
                <div key={i} className="flex flex-col gap-[4px] w-full">
                  <p className="font-['Delight',sans-serif] font-medium leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] w-full">
                    {boldMatch[1]}
                  </p>
                  {boldMatch[2] && (
                    <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] w-full">
                      {boldMatch[2]}
                    </p>
                  )}
                </div>
              );
            }
            return (
              <p key={i} className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px] w-full">
                {block}
              </p>
            );
          })}
          {/* Expand / Collapse — 渐变遮罩 + 箭头按钮 */}
          {descOverflows && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-stretch">
              {!descExpanded && (
                <div className="h-[32px] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(250,250,250,0), #fafafa)' }} />
              )}
              <button
                type="button"
                onClick={() => setDescExpanded(prev => !prev)}
                className="w-full flex items-start justify-center h-[19px] cursor-pointer border-none outline-none p-0"
                style={{ background: '#fafafa' }}
              >
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: descExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Stats (3 cards) */}
        <div className="shrink-0 flex gap-[16px] items-center w-full">
          <StatCard label={stats.totalLabel} value={stats.totalValue} />
          <StatCard label="Success" value={stats.successCount} valueColor="#2a9b7d" />
          <StatCard label="Failed" value={stats.failedCount} valueColor="#e6a91a" />
        </div>

        {/* Run History */}
        <div className="shrink-0 flex flex-col items-start w-full">
          {/* 表头 */}
          <div
            className="flex gap-[8px] items-center pb-[10px] w-full"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
          >
            <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
              Recent 10 Runs
            </p>
            <div className="size-[12px] opacity-0 shrink-0" />
          </div>
          {/* 行 */}
          <div className="flex flex-col w-full">
            {history.map((run) => {
              const expandable = !!run.log;
              const expanded = expandable && expandedId === run.id;
              const toggle = () => {
                if (!expandable) return;
                setExpandedId(prev => prev === run.id ? null : run.id);
              };
              return (
                <div
                  key={run.id}
                  className="flex flex-col w-full"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={expanded}
                    onClick={toggle}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
                    className="flex gap-[12px] items-center py-[10px] w-full cursor-pointer"
                  >
                    <div
                      className="size-[12px] shrink-0 flex items-center justify-center transition-transform duration-200 ease-out"
                      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    >
                      <CdnIcon name="arrow-right-l2" size={12} color="rgba(0,0,0,0.5)" />
                    </div>
                    <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
                      {run.id}
                    </p>
                    <p className="w-[120px] font-['Delight',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
                      {run.duration}
                    </p>
                    <p className="w-[120px] font-['Delight',sans-serif] leading-[20px] text-[12px] text-[rgba(0,0,0,0.5)] tracking-[0.12px]">
                      {run.timestamp}
                    </p>
                    {/* 状态图标 — check-f2 成功 / alert-f2 失败 */}
                    <div className="size-[16px] shrink-0 flex items-center justify-center">
                      {run.status === 'failed' ? (
                        <CdnIcon name="alert-f2" size={16} color="#e6a91a" />
                      ) : (
                        <CdnIcon name="check-f2" size={16} color="#2a9b7d" />
                      )}
                    </div>
                  </div>
                  {/* 展开面板 — 用 grid-rows 做高度动画 */}
                  {expandable && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr] pb-[10px]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div
                          className="rounded-[8px] p-[16px] w-full"
                          style={{ background: 'rgba(0,0,0,0.02)' }}
                        >
                          <pre
                            className="font-mono text-[12px] leading-[20px] text-[rgba(0,0,0,0.5)] tracking-[0.12px] whitespace-pre-wrap m-0"
                            style={{ fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" }}
                          >
                            {run.log}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
