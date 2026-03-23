/**
 * [INPUT]: AppShell, chart-theme
 * [OUTPUT]: Alva Skills 介绍落地页 — 动画终端演示 + Playbook 可视化
 * [POS]: 页面层 — Skills 生态入口
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { CHART_COLORS } from '@/lib/chart-theme';

/* ========== 终端动画脚本 ========== */

const INSTALL_CMD = 'npx skills add https://github.com/alva-ai/skills';
const C = CHART_COLORS;

type LineType = 'cmd' | 'success' | 'skill' | 'dim' | 'blank' | 'prompt' | 'agent';
interface TermLine { text: string; type: LineType; delay: number }

const SCRIPT: TermLine[] = [
  /* Phase 1 — Install skill */
  { text: '$ npx skills add https://github.com/alva-ai/skills', type: 'cmd', delay: 400 },
  { text: '', type: 'blank', delay: 120 },
  { text: '  Fetching skill from github.com/alva-ai/skills...', type: 'dim', delay: 280 },
  { text: '  Installing alva skill...', type: 'dim', delay: 300 },
  { text: '  ✓ Alva skill installed (v1.2.0)', type: 'success', delay: 60 },
  { text: '    250+ financial data skills ready', type: 'dim', delay: 400 },
  { text: '', type: 'blank', delay: 300 },

  /* Phase 2 — Configure API key */
  { text: '$ cat ~/.claude/settings.json', type: 'cmd', delay: 300 },
  { text: '  { "env": { "ALVA_API_KEY": "sk-alva-..." } }', type: 'dim', delay: 400 },
  { text: '', type: 'blank', delay: 300 },

  /* Phase 3 — Enter Claude Code and build */
  { text: '$ claude', type: 'cmd', delay: 250 },
  { text: '', type: 'blank', delay: 200 },
  { text: '  ● Claude Code v1.0.33', type: 'agent', delay: 100 },
  { text: '  ● Alva skill loaded (250+ data skills)', type: 'agent', delay: 250 },
  { text: '', type: 'blank', delay: 200 },
  { text: '> Build me an NVDA dashboard with insider trading data', type: 'prompt', delay: 300 },
  { text: '', type: 'blank', delay: 150 },
  { text: '  ↳ equity_fundamentals       NVDA financials', type: 'skill', delay: 180 },
  { text: '  ↳ equity_ownership          insider trades', type: 'skill', delay: 160 },
  { text: '  ↳ stock_technical_metrics    price & indicators', type: 'skill', delay: 160 },
  { text: '  ↳ equity_estimates          analyst targets', type: 'skill', delay: 160 },
  { text: '', type: 'blank', delay: 180 },
  { text: '  Building playbook...', type: 'dim', delay: 350 },
  { text: '  ✓ Playbook deployed', type: 'success', delay: 60 },
  { text: '    https://alva.ai/u/demo/playbooks/nvda-dashboard', type: 'dim', delay: 250 },
];

const CARD_HOLD_MS = 10000;

/* ========== Phase 指示器 ========== */

const PHASES = [
  { label: 'Install Skill', startIdx: 0 },
  { label: 'Config API Key', startIdx: 7 },
  { label: 'Build Playbook', startIdx: 10 },
];

function PhaseIndicator({ visibleCount, showCard }: { visibleCount: number; showCard: boolean }) {
  const currentPhase = showCard ? 3 : visibleCount === 0 ? -1
    : visibleCount >= PHASES[2].startIdx ? 2
    : visibleCount >= PHASES[1].startIdx ? 1 : 0;

  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[4px]">
      {PHASES.map((p, i) => {
        const completed = showCard || currentPhase > i;
        const active = currentPhase === i;
        const upcoming = !completed && !active;

        return (
          <div key={p.label} className="flex items-center gap-[4px]">
            {i > 0 && (
              <div
                className="w-[14px] h-[1.5px] rounded-full transition-all duration-300"
                style={{ background: completed || active ? 'rgba(73,163,166,0.4)' : 'rgba(255,255,255,0.08)' }}
              />
            )}
            <div className="flex items-center gap-[4px] transition-all duration-300">
              <div
                className="w-[14px] h-[14px] rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: completed ? '#49a3a6' : active ? '#49a3a6' : 'rgba(255,255,255,0.06)',
                  boxShadow: active ? '0 0 8px rgba(73,163,166,0.35)' : 'none',
                }}
              >
                {completed ? (
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span
                    className="text-[8px] font-['JetBrains_Mono',monospace] leading-[1]"
                    style={{ color: active ? '#fff' : 'rgba(255,255,255,0.20)' }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] font-['Delight',sans-serif] leading-[1] transition-all duration-300"
                style={{
                  color: (completed || active) ? 'rgba(255,255,255,0.85)' : upcoming ? 'rgba(255,255,255,0.18)' : undefined,
                }}
              >
                {p.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========== SVG 绘图工具 ========== */

function smoothLine(data: number[], x0: number, y0: number, w: number, h: number): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: x0 + (i / (data.length - 1)) * w,
    y: y0 + h - ((v - min) / range) * h * 0.85 - h * 0.06,
  }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    const cy = (pts[i - 1].y + pts[i].y) / 2;
    d += ` Q ${pts[i - 1].x},${pts[i - 1].y} ${cx},${cy}`;
  }
  return d;
}

function areaFromLine(p: string, x0: number, y0: number, w: number, h: number): string {
  return `${p} L ${x0 + w},${y0 + h} L ${x0},${y0 + h} Z`;
}

/* ========== Playbook 内联预览卡（终端原生风格） ========== */

function InlinePlaybookCard() {
  const priceData = [100, 108, 103, 118, 112, 128, 135, 140, 132, 150, 158, 165, 160, 175, 185, 200, 215, 230, 245];
  const rsiData = [42, 48, 45, 58, 55, 68, 62, 70, 65, 52, 45, 40, 48, 55, 62, 58, 52, 46, 50];
  const volData = [30, 45, 35, 55, 40, 65, 50, 72, 38, 58, 42, 48, 60, 44, 52, 68, 46, 55, 40];
  const macdData = [2, 5, 8, 6, 10, 7, 3, -1, -4, -2, 1, 5, 9, 12, 8, 5, 2, -1, 3];
  const sigData = [1, 3, 5, 6, 8, 8, 6, 3, 0, -2, -1, 2, 5, 8, 9, 7, 4, 1, 2];
  const priceLine = smoothLine(priceData, 0, 0, 300, 50);
  const priceArea = areaFromLine(priceLine, 0, 0, 300, 50);
  const rsiLine = smoothLine(rsiData, 0, 0, 100, 28);
  const macdLine = smoothLine(macdData, 0, 0, 100, 28);
  const sigLine = smoothLine(sigData, 0, 0, 100, 28);

  return (
    <div
      className="mt-[6px] mx-[24px] rounded-[6px] overflow-hidden"
      style={{
        background: '#ffffff',
        boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
        animation: 'termCardIn 0.4s ease-out',
      }}
    >
      {/* 卡片头部 */}
      <div className="flex items-center gap-[6px] px-[10px] pt-[8px] pb-[6px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <span className="font-['Delight',sans-serif] text-[12px] leading-[16px] text-[rgba(0,0,0,0.80)]">
          NVDA Dashboard
        </span>
        <span
          className="px-[4px] py-[1px] rounded-[2px] text-[8px] leading-[11px] font-['JetBrains_Mono',monospace]"
          style={{ background: 'rgba(64,165,68,0.10)', color: C.green }}
        >
          LIVE
        </span>
        <span className="ml-auto font-['Delight',sans-serif] text-[9px] text-[rgba(0,0,0,0.22)]">
          6 widgets · 4 data sources
        </span>
      </div>

      {/* Dashboard 预览 */}
      <div className="p-[8px] flex flex-col gap-[1px]" style={{ background: 'rgba(0,0,0,0.04)' }}>
        {/* Row 1: 全宽价格图表 */}
        <div className="p-[8px] bg-white rounded-t-[4px]">
          <div className="flex items-center justify-between mb-[4px]">
            <span className="font-['Delight',sans-serif] text-[9px] text-[rgba(0,0,0,0.30)]">NVDA Price</span>
            <span className="font-['JetBrains_Mono',monospace] text-[9px]" style={{ color: C.green }}>+12.4%</span>
          </div>
          <svg viewBox="0 0 300 50" className="w-full" style={{ height: 50 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="as-il-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.primary} stopOpacity="0.18" />
                <stop offset="100%" stopColor={C.primary} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={priceArea} fill="url(#as-il-g)" />
            <path d={priceLine} fill="none" stroke={C.primary} strokeWidth="1.2" />
          </svg>
        </div>

        {/* Row 2: KPI 横条 */}
        <div className="grid grid-cols-4 gap-[1px]">
          {[
            { label: 'Market Cap', value: '$3.2T', color: C.primary },
            { label: 'P/E Ratio', value: '58.3', color: C.blue },
            { label: 'Insider Net', value: '-$4.2M', color: C.red },
            { label: 'Analyst Target', value: '$178', color: C.green },
          ].map(kpi => (
            <div key={kpi.label} className="p-[6px] bg-white text-center">
              <div className="font-['Delight',sans-serif] text-[7px] text-[rgba(0,0,0,0.25)] mb-[1px]">{kpi.label}</div>
              <div className="font-['JetBrains_Mono',monospace] text-[10px] leading-[14px]" style={{ color: kpi.color }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* Row 3: 三等宽小图表 */}
        <div className="grid grid-cols-3 gap-[1px]">
          {/* RSI */}
          <div className="p-[8px] bg-white rounded-bl-[4px]">
            <div className="flex items-center justify-between mb-[3px]">
              <span className="font-['Delight',sans-serif] text-[8px] text-[rgba(0,0,0,0.25)]">RSI (14)</span>
              <span className="font-['JetBrains_Mono',monospace] text-[8px] text-[rgba(0,0,0,0.30)]">50.2</span>
            </div>
            <svg viewBox="0 0 100 28" className="w-full" style={{ height: 28 }} preserveAspectRatio="none">
              <line x1="0" y1="9" x2="100" y2="9" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="0" y1="19" x2="100" y2="19" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
              <path d={rsiLine} fill="none" stroke={C.orange} strokeWidth="1" />
            </svg>
          </div>
          {/* MACD */}
          <div className="p-[8px] bg-white">
            <div className="flex items-center justify-between mb-[3px]">
              <span className="font-['Delight',sans-serif] text-[8px] text-[rgba(0,0,0,0.25)]">MACD</span>
              <span className="font-['JetBrains_Mono',monospace] text-[8px]" style={{ color: C.green }}>Bullish</span>
            </div>
            <svg viewBox="0 0 100 28" className="w-full" style={{ height: 28 }} preserveAspectRatio="none">
              <line x1="0" y1="14" x2="100" y2="14" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              <path d={macdLine} fill="none" stroke={C.blue} strokeWidth="1" />
              <path d={sigLine} fill="none" stroke={C.red} strokeWidth="0.8" opacity="0.5" />
            </svg>
          </div>
          {/* Insider Volume */}
          <div className="p-[8px] bg-white rounded-br-[4px]">
            <div className="font-['Delight',sans-serif] text-[8px] text-[rgba(0,0,0,0.25)] mb-[3px]">Insider Vol.</div>
            <svg viewBox="0 0 100 28" className="w-full" style={{ height: 28 }} preserveAspectRatio="none">
              {volData.map((v, i) => {
                const max = Math.max(...volData);
                const bw = 100 / volData.length * 0.6;
                const gap = 100 / volData.length;
                const bh = (v / max) * 26;
                return (
                  <rect key={i} x={i * gap + gap * 0.2} y={28 - bh} width={bw} height={bh} rx={0.8}
                    fill={v > 55 ? C.red : C.green} opacity={0.35} />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* URL 底栏 */}
      <div className="px-[10px] py-[6px]">
        <span className="font-['JetBrains_Mono',monospace] text-[9px] text-[rgba(0,0,0,0.22)]">
          → alva.ai/u/demo/playbooks/nvda-dashboard
        </span>
      </div>
    </div>
  );
}

/* ========== 终端动画组件 ========== */

function AnimatedTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scheduleNext = useCallback((idx: number) => {
    if (idx >= SCRIPT.length) {
      timeoutRef.current = setTimeout(() => {
        setShowCard(true);
        timeoutRef.current = setTimeout(() => {
          setShowCard(false);
          setVisibleCount(0);
        }, CARD_HOLD_MS);
      }, 150);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      setVisibleCount(idx + 1);
      scheduleNext(idx + 1);
    }, SCRIPT[idx].delay);
  }, []);

  useEffect(() => {
    if (visibleCount === 0) {
      setShowCard(false);
      const id = setTimeout(() => scheduleNext(0), 600);
      return () => clearTimeout(id);
    }
  }, [visibleCount, scheduleNext]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [visibleCount, showCard]);

  const lineColor = (t: LineType): string => {
    switch (t) {
      case 'cmd': return 'rgba(255,255,255,0.88)';
      case 'prompt': return 'rgba(255,255,255,0.78)';
      case 'agent': return 'rgba(255,255,255,0.45)';
      case 'success': return '#4ade80';
      case 'skill': return '#49a3a6';
      case 'dim': return 'rgba(255,255,255,0.32)';
      default: return 'transparent';
    }
  };

  return (
    <div
      className="w-full rounded-[12px] overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #131320 0%, #0e0e1a 100%)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.06) inset',
      }}
    >
      {/* 窗口标题栏 */}
      <div
        className="flex items-center gap-[7px] px-[16px] h-[36px] shrink-0 relative"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#FF5F57', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.15)' }} />
        <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#FEBC2E', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.15)' }} />
        <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#28C840', boxShadow: 'inset 0 -0.5px 0.5px rgba(0,0,0,0.15)' }} />
        <PhaseIndicator visibleCount={visibleCount} showCard={showCard} />
      </div>

      {/* 终端内容 */}
      <div
        ref={containerRef}
        className="px-[16px] py-[14px] overflow-y-auto"
        style={{ height: 'clamp(360px, calc(100vh - 440px), 560px)', scrollBehavior: 'smooth' }}
      >
        {SCRIPT.slice(0, visibleCount).map((line, i) => (
          <div
            key={`${visibleCount === 0 ? 'r' : ''}${i}`}
            className="leading-[21px] font-['JetBrains_Mono',monospace] text-[12px] whitespace-pre"
            style={{ color: lineColor(line.type), animation: 'termFadeIn 0.18s ease-out' }}
          >
            {line.text || '\u200b'}
          </div>
        ))}

        {/* Playbook 内联卡片 — 终端流式输出的最后一环 */}
        {showCard && <InlinePlaybookCard />}

        {/* 光标 */}
        {!showCard && (
          <div className="leading-[21px] font-['JetBrains_Mono',monospace] text-[12px]">
            <span
              className="inline-block w-[7px] h-[14px] relative top-[2px]"
              style={{ background: cursorVisible ? 'rgba(255,255,255,0.50)' : 'transparent', transition: 'background 0.08s' }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes termFadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes termCardIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ========== Agent 图标（复用 Home 的 PLATFORM_ICONS） ========== */

function IconLangChain({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g clipPath="url(#as-lc)">
        <path fill="#FF4D4D" d="M10 2.435c-5 0-7.5 4.167-7.5 7.5s2.5 6.667 5 7.5v1.667h1.667v-1.667s.833.334 1.666 0v1.667H12.5v-1.667c2.5-.833 5-4.166 5-7.5s-2.5-7.5-7.5-7.5" />
        <path fill="#FF4D4D" d="M3.333 8.268c-2.5-.833-3.333.833-2.5 2.5s2.5.833 3.334-.833c.5-1.167 0-1.667-.833-1.667Zm13.334 0c2.5-.833 3.333.833 2.5 2.5s-2.5.833-3.334-.833c-.5-1.167 0-1.667.834-1.667" />
        <path stroke="#FF4D4D" strokeLinecap="round" strokeWidth={2} d="M7.5 3.268Q5.834 1.602 5 2.101m7.5 1.167q1.666-1.666 2.5-1.167" />
        <path fill="#000" d="M7.5 7.601a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        <path fill="#00E5CC" d="M7.667 6.768a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667m5 0a.333.333 0 1 0 0-.667.333.333 0 0 0 0 .667" />
      </g>
      <defs><clipPath id="as-lc"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs>
    </svg>
  );
}

function IconCrewAi({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <path fill="#000" d="M17.97 5.016 10.393.642a.79.79 0 0 0-.787 0L2.03 5.016a.66.66 0 0 0-.331.573v8.822c0 .236.126.455.33.573l7.578 4.374c.243.14.543.14.786 0l7.577-4.374a.66.66 0 0 0 .331-.573V5.589a.66.66 0 0 0-.33-.573zm-.476.927L10.18 18.612c-.05.085-.18.05-.18-.049v-8.295a.47.47 0 0 0-.233-.402L2.584 5.718c-.086-.05-.05-.18.048-.18h14.629a.27.27 0 0 1 .233.405" />
    </svg>
  );
}

function IconAsterisk({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g fill="#D97757" clipPath="url(#as-ast)">
        <path d="m19.11 7.92.693.397v.297l-.198.693-8.416 1.98-.791-1.966 8.712-1.4Z" />
        <path d="m15.962 2.097.969.203.257.317.245.76-.101.484-5.648 7.723-1.881-1.881 5.208-6.835z" />
        <path d="m11.09.891.594-.396.495.198.495.693-1.356 8.151-.921-.626-.396-1.09.693-6.138z" />
        <path d="m4.739 1.022.61-.78.398-.09.79.115.39.305 2.84 6.298 1.028 2.992-1.202.668L5.01 2.216l-.27-1.194Z" />
        <path d="m1.783 5.347-.198-.793.594-.693.693.1h.198L7.23 7.03l1.287.99 1.782 1.386-.99 1.683-.891-.693-.594-.594-5.743-4.06z" />
        <path d="M.595 10.495.147 10v-.44l.448-.154 5.05.297 4.95.396-.16.986-9.444-.49z" />
        <path d="M3.565 15.648h-.99l-.393-.453v-.542l1.68-1.188 6.834-4.35.691 1.182z" />
        <path d="m5.447 18.416-.396.099-.594-.297.099-.495L10.397 10l.792 1.09-4.356 5.742z" />
        <path d="m10.397 19.406-.297.396-.594.198-.495-.396-.297-.594 1.485-8.02.891.1z" />
        <path d="M15.447 17.228v.792l-.1.297-.395.198-.693-.092-4.76-7.083 1.889-1.44 1.584 2.872.15 1.04 2.326 3.415Z" />
        <path d="m17.724 16.039.099.495-.297.396-.297-.099-1.683-1.188-2.575-2.277-1.98-1.386.594-1.881.99.594.594 1.089z" />
        <path d="m16.437 10.99 2.475.198.594.396.396.594v.428l-1.089.463-5.544-1.386-2.278-.099.594-2.08 1.584 1.189z" />
      </g>
      <defs><clipPath id="as-ast"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs>
    </svg>
  );
}

function IconHuggingFace({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <g fill="#000" clipPath="url(#as-hf)">
        <path d="M13.643 11.55a.727.727 0 0 1 0 1.454h-2.732a.727.727 0 0 1 0-1.454zM6.438 7.1a.727.727 0 0 1 .997.25L8.8 9.625a.73.73 0 0 1 0 .749l-1.366 2.277a.728.728 0 0 1-1.247-.749L7.33 10 6.188 8.097a.727.727 0 0 1 .25-.997" />
        <path fillRule="evenodd" d="M8.91.982a4.93 4.93 0 0 1 3.193 1.172 4.933 4.933 0 0 1 5.656 3.6c.186.699.215 1.43.086 2.142a4.946 4.946 0 0 1-2.1 7.848 4.94 4.94 0 0 1-7.848 2.101 5 5 0 0 1-.88.081 4.944 4.944 0 0 1-4.862-5.823A4.92 4.92 0 0 1 .99 9.163l-.008-.255a4.95 4.95 0 0 1 3.273-4.654A4.95 4.95 0 0 1 8.909.982Zm0 1.451a3.5 3.5 0 0 0-3.375 2.588.73.73 0 0 1-.514.514 3.495 3.495 0 0 0-1.563 5.843.73.73 0 0 1 .186.7 3.492 3.492 0 0 0 4.28 4.279l.094-.02a.72.72 0 0 1 .604.206 3.495 3.495 0 0 0 5.844-1.565l.03-.09a.72.72 0 0 1 .483-.423 3.5 3.5 0 0 0 2.589-3.373c0-.964-.392-1.838-1.024-2.47a.72.72 0 0 1-.186-.7 3.496 3.496 0 0 0-4.281-4.278.72.72 0 0 1-.7-.187 3.5 3.5 0 0 0-2.287-1.02z" clipRule="evenodd" />
      </g>
      <defs><clipPath id="as-hf"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs>
    </svg>
  );
}

function IconVercelLike({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <mask id="as-vl" width={20} height={18} x={0} y={1} maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
        <path fill="#000" d="M17.415 18.023c1.02.765 2.548.255 1.147-1.146-4.204-4.076-3.312-15.284-8.534-15.284s-4.33 11.208-8.534 15.284c-1.528 1.529.127 1.91 1.146 1.146 3.949-2.674 3.694-7.387 7.388-7.387s3.439 4.713 7.387 7.387" />
      </mask>
      <g mask="url(#as-vl)">
        <g filter="url(#as-vl-b)"><path fill="#FFE432" d="M.101-2.202c-.31 2.73 2.043 5.24 5.256 5.604 3.212.365 6.068-1.553 6.378-4.283s-2.043-5.24-5.256-5.604C3.267-6.85.411-4.932.101-2.202" /></g>
        <g filter="url(#as-vl-c)"><path fill="#FC413D" d="M12.486 6.724c.805 3.465 4.328 5.607 7.87 4.785s5.76-4.299 4.955-7.764-4.328-5.607-7.87-4.785-5.76 4.299-4.955 7.764" /></g>
        <g filter="url(#as-vl-d)"><path fill="#00B95C" d="M-8.588 9.048c1.017 3.576 5.597 5.407 10.23 4.09S9.207 7.852 8.19 4.276 2.592-1.131-2.04.187s-7.565 5.284-6.548 8.86Z" /></g>
        <g filter="url(#as-vl-f)"><path fill="#00B95C" d="M-4.911 12.013c2.55 2.604 6.94 2.44 9.807-.367s3.124-7.193.574-9.797-6.94-2.44-9.807.367-3.124 7.193-.574 9.797" /></g>
        <g filter="url(#as-vl-g)"><path fill="#3186FF" d="M8.427 21.834c.791 3.408 4.094 5.553 7.376 4.791s5.302-4.143 4.51-7.552-4.094-5.554-7.377-4.791-5.301 4.143-4.51 7.552Z" /></g>
        <g filter="url(#as-vl-h)"><path fill="#FBBC04" d="M2.83-5.391c-1.657 3.693.157 8.104 4.052 9.852s8.396.173 10.054-3.52-.156-8.104-4.051-9.852-8.397-.173-10.055 3.52" /></g>
        <g filter="url(#as-vl-i)"><path fill="#3186FF" d="M-1.61 30.25c-4.013-1.575 2.845-14.537 4.55-18.881 1.706-4.345 6.342-6.59 10.355-5.014s8.77 10.253 7.065 14.597C18.654 25.297 2.403 31.826-1.61 30.25" /></g>
        <g filter="url(#as-vl-k)"><path fill="#FC413D" d="M14.686 7.736c4.42 2.989 9.508 3.185 11.366.438S25.834.777 21.415-2.212c-4.419-2.99-9.507-3.186-11.366-.439s.218 7.397 4.637 10.387" /></g>
      </g>
      <defs>
        <filter id="as-vl-b" width={14.58} height={12.868} x={-1.372} y={-7.976} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={0.723} /></filter>
        <filter id="as-vl-c" width={27.135} height={26.881} x={5.331} y={-8.206} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={3.495} /></filter>
        <filter id="as-vl-d" width={29.065} height={25.69} x={-14.732} y={-6.183} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={2.971} /></filter>
        <filter id="as-vl-f" width={25.778} height={25.75} x={-12.61} y={-5.944} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={2.971} /></filter>
        <filter id="as-vl-g" width={23.524} height={23.945} x={2.608} y={8.481} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={2.824} /></filter>
        <filter id="as-vl-h" width={25.569} height={25.035} x={-2.901} y={-14.743} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={2.559} /></filter>
        <filter id="as-vl-i" width={32.708} height={33.779} x={-7.421} y={1.281} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={2.285} /></filter>
        <filter id="as-vl-k" width={24.273} height={21.61} x={5.914} y={-8.043} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity={0} result="a" /><feBlend in="SourceGraphic" in2="a" result="b" /><feGaussianBlur result="c" stdDeviation={1.727} /></filter>
      </defs>
    </svg>
  );
}

function IconOpenAi({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" className={className || ''}>
      <mask id="as-oai" width={16} height={20} x={2} y={0} maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' as const }}>
        <path fill="#fff" d="M18 0H2v20h16z" />
      </mask>
      <g mask="url(#as-oai)">
        <path fill="#4B4646" d="M14 16H6V8h8z" />
        <path fill="#F1ECEC" d="M14 4H6v12h8zm4 16H2V0h16z" />
      </g>
    </svg>
  );
}

const AGENT_ICONS = [IconLangChain, IconCrewAi, IconAsterisk, IconHuggingFace, IconVercelLike, IconOpenAi] as const;

/* ========== 复制按钮 ========== */

function CopyInstallBtn() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex items-center gap-[12px] px-[20px] py-[10px] rounded-[8px] border border-[rgba(0,0,0,0.10)]"
      style={{ background: copied ? 'rgba(73,163,166,0.04)' : 'rgba(255,255,255,0.6)', borderColor: copied ? 'rgba(73,163,166,0.20)' : undefined }}
    >
      <code className="text-[13px] leading-[20px] font-['JetBrains_Mono',monospace] text-[rgba(0,0,0,0.50)]">
        {INSTALL_CMD}
      </code>
      <button
        onClick={handleCopy}
        className="flex items-center gap-[5px] px-[14px] py-[5px] rounded-[6px] border-none cursor-pointer transition-all shrink-0"
        style={{ background: copied ? '#3d8e91' : '#49a3a6' }}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5l3 3 7-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          </svg>
        )}
        <span className="text-[13px] leading-[18px] font-['Delight',sans-serif] text-white">
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>
    </div>
  );
}

/* ========== 数据 ========== */

const FEATURES = [
  {
    label: 'Market Data',
    desc: 'Crypto, equities, macro, on-chain & sentiment',
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path d="M2 16l4-5 3 2.5 4-6 5 3.5" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Backtesting',
    desc: 'Historical data, paper trading & analytics',
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke={C.orange} strokeWidth="1.5" />
        <path d="M10 5v5l3.5 2" stroke={C.orange} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Live Signals',
    desc: 'Scheduled pipelines that push alerts 24/7',
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke={C.green} strokeWidth="1.5" />
        <circle cx="10" cy="10" r="1.2" fill={C.green} />
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Visual Playbooks',
    desc: 'Interactive dashboards with charts & KPIs',
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" stroke={C.blue} strokeWidth="1.5" />
        <path d="M5 16.5h10" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Share & Remix',
    desc: 'Publish and let others fork your strategies',
    icon: (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path d="M6 6v5.5c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5.67 1.5 1.5V17" stroke={C.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6L4 8M6 6l2 2M14 17l-2-2M14 17l2-2" stroke={C.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ========== 主页面 ========== */

interface AlvaSkillsProps {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

export default function AlvaSkills({ onNavigate, onOpenSearch }: AlvaSkillsProps) {
  return (
    <AppShell activePage={'alva-skills' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div
        className="min-h-screen overflow-y-auto"
        style={{
          background: '#fafafa',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 0.5px, transparent 0.5px)',
          backgroundSize: '4px 4px',
        }}
      >

        <section className="w-full flex justify-center pt-[32px] pb-[16px] px-[24px]">
          <div className="w-full max-w-[960px] flex flex-col items-center">
            <h1 className="font-['Delight',sans-serif] text-[26px] leading-[34px] font-normal text-[rgba(0,0,0,0.85)] text-center mb-[8px]">
              Alva Skills
            </h1>
            <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.38)] text-center mb-[20px] max-w-[620px]">
              Turn your AI agent into a finance powerhouse — access 250+ financial skills, build cloud-side analytics, backtest strategies, and ship live investing playbooks.
            </p>

            <div className="mb-[12px]">
              <CopyInstallBtn />
            </div>

            {/* 辅助链接 */}
            <div className="flex items-center justify-center gap-[16px] mb-[16px]">
              <button
                onClick={() => window.open('https://github.com/alva-ai/skills', '_blank')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="rgba(0,0,0,0.45)" className="group-hover:fill-[rgba(0,0,0,0.75)] transition-colors">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.45)] group-hover:text-[rgba(0,0,0,0.75)] transition-colors">GitHub</span>
              </button>
              <span className="w-[1px] h-[12px] bg-[rgba(0,0,0,0.08)]" />
              <button
                onClick={() => onNavigate('api-keys')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <div className="w-[5px] h-[5px] rounded-full bg-[#49a3a6] shrink-0" />
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[rgba(0,0,0,0.65)] group-hover:text-[rgba(0,0,0,0.85)] transition-colors">
                  <path d="M10 1.5a3 3 0 00-2.83 4.01L3 9.68V13h3.32l.35-.35A3 3 0 1010 1.5zM10 5a1 1 0 110-2 1 1 0 010 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.65)] group-hover:text-[rgba(0,0,0,0.85)] transition-colors">Get API Key</span>
              </button>
              <span className="w-[1px] h-[12px] bg-[rgba(0,0,0,0.08)]" />
              <button
                onClick={() => onNavigate('skills')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[rgba(0,0,0,0.45)] group-hover:text-[rgba(0,0,0,0.75)] transition-colors">
                  <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.45)] group-hover:text-[rgba(0,0,0,0.75)] transition-colors">Browse Skills</span>
              </button>
            </div>

            {/* Feature 横条 */}
            <div className="w-full grid grid-cols-5 mb-[16px]">
              {FEATURES.map(f => (
                <div key={f.label} className="flex flex-col items-center gap-[6px] py-[12px] px-[8px]">
                  <div className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    {f.icon}
                  </div>
                  <span className="font-['Delight',sans-serif] text-[12px] leading-[16px] text-[rgba(0,0,0,0.60)] text-center">{f.label}</span>
                  <span className="font-['Delight',sans-serif] text-[10px] leading-[14px] text-[rgba(0,0,0,0.28)] text-center">{f.desc}</span>
                </div>
              ))}
            </div>

            <AnimatedTerminal />
          </div>
        </section>

        {/* ========== Supported Agents (same icons as Home hero) ========== */}
        <section className="w-full flex justify-center pt-[16px] pb-[32px] px-[24px]">
          <div className="flex items-center justify-center gap-[20px]">
            {AGENT_ICONS.map((Icon, i) => (
              <span key={i} className="flex w-[20px] h-[20px] items-center justify-center">
                <Icon className="w-[20px] h-[20px]" />
              </span>
            ))}
          </div>
        </section>

      </div>
    </AppShell>
  );
}
