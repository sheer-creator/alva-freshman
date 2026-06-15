/**
 * [INPUT]: feed name / meta / instruction / stats / run history / alerts
 * [OUTPUT]: Feed 详情 Modal — 三 tab(Alerts / Overview / Runs)(Figma 7974:128991 / 129215 / 129284)
 * [POS]: 社区组件 — 全局 Automations 详情弹窗(alerts 点击 / playbook header / 卡片点击共用)
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { PushContent, type PushCardData } from '@/app/components/shared/AutomationCard';

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
  /** Overview tab 的指令文本(只读)。不传时回退到 description */
  instruction?: string;
  description: string;
  stats?: FeedDetailStats;
  history?: FeedRunHistoryItem[];
  /** Alerts tab — 来源的推送完整内容(复用 push 卡的渲染) */
  alerts?: PushCardData[];
  /** 点击设置图标 — 传入时跳转到 Settings Automations */
  onManage?: () => void;
}

type TabKey = 'alerts' | 'overview' | 'runs';

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

/* ========== Tab 内容: Alerts ========== */

function AlertsPanel({ alerts }: { alerts?: PushCardData[] }) {
  if (!alerts || alerts.length === 0) {
    return (
      <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n5)] tracking-[0.14px] py-[8px]">
        No alerts pushed yet.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      {alerts.map((a) => (
        <div
          key={a.id}
          className="flex flex-col gap-[8px] items-start w-full rounded-[8px] px-[16px] py-[16px]"
          style={{ background: 'var(--grey-g01, #fafafa)' }}
        >
          <PushContent a={a} />
        </div>
      ))}
    </div>
  );
}

/* ========== Tab 内容: Overview (Instruction) ========== */

function OverviewPanel({ instruction }: { instruction: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(instruction).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="flex flex-col gap-[16px] items-start w-full">
      <div className="flex items-center gap-[12px] w-full">
        <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n7)] tracking-[0.14px]">
          Instruction
        </p>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy instruction"
          className="shrink-0 flex items-center justify-center size-[16px] cursor-pointer bg-transparent border-none outline-none p-0 hover:opacity-70 transition-opacity"
        >
          <CdnIcon name={copied ? 'check-f2' : 'copy-l'} size={16} color="var(--text-n7, rgba(0,0,0,0.7))" />
        </button>
      </div>
      <div
        className="w-full min-h-[200px] rounded-[6px] px-[12px] py-[12px]"
        style={{
          background: 'var(--module-b-data-entry, #fff)',
          border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
        }}
      >
        <p className="font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n9)] tracking-[0.14px] whitespace-pre-wrap m-0">
          {instruction}
        </p>
      </div>
    </div>
  );
}

/* ========== Tab 内容: Runs (Stats + History) ========== */

function StatColumns({ stats }: { stats: FeedDetailStats }) {
  const cols = [
    { label: stats.totalLabel, value: stats.totalValue, color: 'var(--text-n9, rgba(0,0,0,0.9))' },
    { label: 'Success', value: stats.successCount, color: 'var(--main-m3, #2a9b7d)' },
    { label: 'Failed', value: stats.failedCount, color: 'var(--main-m5, #e6a91a)' },
  ];
  return (
    <div className="shrink-0 flex gap-[16px] items-center w-full">
      {cols.map((c, i) => (
        <div key={c.label} className="flex flex-1 min-w-0 items-center gap-[16px]">
          <div className="flex flex-1 min-w-0 flex-col gap-[2px] justify-center items-start">
            <p className="font-['Delight',sans-serif] leading-[20px] text-[12px] text-[var(--text-n5)] tracking-[0.12px] w-full">
              {c.label}
            </p>
            <p
              className="font-['Delight',sans-serif] leading-[30px] text-[20px] tracking-[0.2px] w-full"
              style={{ color: c.color }}
            >
              {c.value}
            </p>
          </div>
          {i < cols.length - 1 && (
            <div className="self-stretch w-[0.5px] shrink-0" style={{ background: 'var(--line-l12, rgba(0,0,0,0.12))' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function RunsPanel({ stats, history }: { stats: FeedDetailStats; history: FeedRunHistoryItem[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-[16px] items-start w-full">
      <StatColumns stats={stats} />

      <div className="shrink-0 flex flex-col items-start w-full">
        {/* 表头 */}
        <div
          className="flex gap-[8px] items-center pb-[10px] w-full"
          style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
        >
          <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[20px] text-[12px] text-[var(--text-n5)] tracking-[0.12px]">
            Recent {history.length} Runs
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
              setExpandedId((prev) => (prev === run.id ? null : run.id));
            };
            return (
              <div
                key={run.id}
                className="flex flex-col w-full"
                style={{ borderBottom: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
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
                    <CdnIcon name="arrow-right-l2" size={12} color="var(--text-n5, rgba(0,0,0,0.5))" />
                  </div>
                  <p className="flex-1 min-w-0 font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n9)] tracking-[0.14px]">
                    {run.id}
                  </p>
                  <p className="w-[120px] font-['Delight',sans-serif] leading-[22px] text-[14px] text-[var(--text-n9)] tracking-[0.14px]">
                    {run.duration}
                  </p>
                  <p className="w-[120px] font-['Delight',sans-serif] leading-[20px] text-[12px] text-[var(--text-n5)] tracking-[0.12px]">
                    {run.timestamp}
                  </p>
                  {/* 状态图标 — check-f2 成功 / alert-f2 失败 */}
                  <div className="size-[16px] shrink-0 flex items-center justify-center">
                    {run.status === 'failed' ? (
                      <CdnIcon name="alert-f2" size={16} color="var(--main-m5, #e6a91a)" />
                    ) : (
                      <CdnIcon name="check-f2" size={16} color="var(--main-m3, #2a9b7d)" />
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
                        style={{ background: 'var(--b-r02, rgba(0,0,0,0.02))' }}
                      >
                        <pre
                          className="font-mono text-[12px] leading-[20px] text-[var(--text-n5)] tracking-[0.12px] whitespace-pre-wrap m-0"
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
  );
}

/* ========== 组件 ========== */

export function FeedDetailModal({
  open,
  onClose,
  feedName,
  lastRun = '15m',
  runEvery = 'Every 5 minutes',
  totalRuns,
  instruction,
  description,
  stats = DEFAULT_STATS,
  history = DEFAULT_HISTORY,
  alerts,
  onManage,
}: FeedDetailModalProps) {
  const [tab, setTab] = useState<TabKey>('alerts');
  const [paused, setPaused] = useState(false);

  void totalRuns; // 旧 prop 兼容 — Runs 数已并入 stats

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // 每次打开都定位第一个 tab(Alerts)
  useEffect(() => {
    if (open) { setTab('alerts'); setPaused(false); }
  }, [open]);

  if (!open) return null;

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'alerts', label: 'Alerts' },
    { key: 'overview', label: 'Overview' },
    { key: 'runs', label: 'Runs' },
  ];

  // 用 Portal 渲染到 body,避免被祖先的 transform 困住 (fixed 会相对 transformed 祖先定位)
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[28px]"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="relative flex w-[600px] max-w-[720px] max-h-full flex-col gap-[16px] p-[28px] rounded-[12px]"
        style={{
          background: 'var(--b0-container, #fff)',
          border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
          boxShadow: 'var(--shadow-l, 0 10px 20px rgba(0,0,0,0.08))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close — 贴在 dialog 右上角 */}
        <button
          type="button"
          className="absolute right-[27.5px] top-[27.5px] z-[1] size-[18px] flex items-center justify-center cursor-pointer bg-transparent border-none outline-none hover:opacity-70 transition-opacity p-0"
          aria-label="Close"
          onClick={onClose}
        >
          <CdnIcon name="close-l1" size={18} />
        </button>

        {/* Header */}
        <div className="shrink-0 flex flex-col gap-[4px] items-start w-full">
          <div className="flex items-center gap-[12px] w-full">
            <div className="flex items-center gap-[8px]">
              <StatusDot size={14} />
              <p className="font-['Delight',sans-serif] leading-[30px] text-[20px] text-[var(--text-n9)] tracking-[0.2px] whitespace-nowrap">
                {feedName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume' : 'Pause'}
              className="shrink-0 flex items-center justify-center size-[18px] cursor-pointer bg-transparent border-none outline-none p-0 hover:opacity-70 transition-opacity"
            >
              <CdnIcon name={paused ? 'play-f' : 'pause-l2'} size={18} color="var(--text-n7, rgba(0,0,0,0.7))" />
            </button>
            {onManage && (
              <button
                type="button"
                onClick={onManage}
                aria-label="Settings"
                className="shrink-0 flex items-center justify-center size-[18px] cursor-pointer bg-transparent border-none outline-none p-0 hover:opacity-70 transition-opacity"
              >
                <CdnIcon name="settings-l" size={18} color="var(--text-n7, rgba(0,0,0,0.7))" />
              </button>
            )}
          </div>
          <div className="flex gap-[8px] items-center w-full whitespace-nowrap font-['Delight',sans-serif] leading-[20px] text-[12px] text-[var(--text-n5)] tracking-[0.12px]">
            <p>Last Run: {lastRun}</p>
            <p style={{ color: 'var(--text-n2)' }}>|</p>
            <p>{runEvery}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="shrink-0 flex gap-[16px] items-start w-full"
          style={{ borderBottom: '1px solid var(--line-l07, rgba(0,0,0,0.07))' }}
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="flex items-center gap-[4px] pb-[6px] bg-transparent border-none outline-none cursor-pointer p-0"
                style={{
                  borderBottom: active ? '2px solid var(--main-m1, #49a3a6)' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                <span
                  className="font-['Delight',sans-serif] leading-[22px] text-[14px] tracking-[0.14px] whitespace-nowrap"
                  style={{
                    fontWeight: active ? 500 : 400,
                    color: active ? 'var(--text-n9, rgba(0,0,0,0.9))' : 'var(--text-n7, rgba(0,0,0,0.7))',
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab panel — 内容超出时滚动 */}
        <div className="flex-1 min-h-0 overflow-y-auto w-full">
          {tab === 'alerts' && <AlertsPanel alerts={alerts} />}
          {tab === 'overview' && <OverviewPanel instruction={instruction ?? description} />}
          {tab === 'runs' && <RunsPanel stats={stats} history={history} />}
        </div>
      </div>
    </div>,
    document.body,
  );
}
