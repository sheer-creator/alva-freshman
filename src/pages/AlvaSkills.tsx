/**
 * [INPUT]: AppShell
 * [OUTPUT]: Alva Skills 介绍落地页 — 安装指南 + 能力展示
 * [POS]: 页面层 — Skills 生态入口
 */

import { useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';

/* ========== 数据 ========== */

const INSTALL_CMD = 'npx skills add https://github.com/alva-ai/skills';

const CAPABILITIES = [
  { label: 'Data', detail: '250+ financial SDKs' },
  { label: 'Compute', detail: 'Cloud JS runtime' },
  { label: 'Backtest', detail: 'Altra engine' },
  { label: 'Deploy', detail: 'Playbook apps' },
];

const EXAMPLES = [
  'Track AAPL with price charts, analyst targets, and insider trades',
  'BTC/ETH dashboard with funding rates and on-chain metrics',
  'RSI mean-reversion backtest on BTC with 1h candles',
  'Find stocks with PE < 15, ROE > 20%, and positive insider buying',
];

/* ========== 复制按钮 ========== */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-[4px] px-[10px] py-[5px] rounded-[6px] border-none cursor-pointer transition-all shrink-0"
      style={{ background: copied ? 'rgba(73,163,166,0.15)' : 'rgba(255,255,255,0.08)' }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5l3 3 7-7" stroke="#49a3a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        </svg>
      )}
      <span
        className="text-[11px] leading-[16px] font-['JetBrains_Mono',monospace] tracking-[0.3px]"
        style={{ color: copied ? '#49a3a6' : 'rgba(255,255,255,0.4)' }}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}

/* ========== 主页面 ========== */

interface AlvaSkillsProps {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

export default function AlvaSkills({ onNavigate, onOpenSearch }: AlvaSkillsProps) {
  return (
    <AppShell activePage={'alva-skills' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div className="min-h-screen overflow-y-auto" style={{ background: '#fafafa' }}>

        {/* ========== Hero — 标题 + 安装框 + 辅助链接 ========== */}
        <section className="w-full flex justify-center pt-[80px] pb-[64px] px-[24px]">
          <div className="w-full max-w-[600px] flex flex-col items-center">

            <h1 className="font-['Delight',sans-serif] text-[26px] leading-[34px] font-normal text-[rgba(0,0,0,0.85)] text-center mb-[10px]">
              Alva Skills
            </h1>
            <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] text-[rgba(0,0,0,0.38)] text-center mb-[36px]">
              Give your AI agent access to 250+ financial data sources,<br />
              cloud compute, backtesting, and playbook deployment.
            </p>

            {/* 终端安装框 — 页面核心 */}
            <div
              className="w-full rounded-[10px] overflow-hidden mb-[20px]"
              style={{ background: '#1a1a2e', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}
            >
              {/* 窗口控制点 */}
              <div className="flex items-center gap-[6px] px-[14px] pt-[10px] pb-[2px]">
                <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57] opacity-80" />
                <div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E] opacity-80" />
                <div className="w-[9px] h-[9px] rounded-full bg-[#28C840] opacity-80" />
              </div>
              {/* 命令行 */}
              <div className="flex items-center justify-between px-[14px] py-[12px] gap-[12px]">
                <div className="flex items-center gap-[8px] min-w-0">
                  <span className="text-[#49a3a6] text-[13px] font-['JetBrains_Mono',monospace] shrink-0 opacity-60">$</span>
                  <code className="text-[13px] leading-[20px] font-['JetBrains_Mono',monospace] text-[rgba(255,255,255,0.82)] truncate">
                    {INSTALL_CMD}
                  </code>
                </div>
                <CopyButton text={INSTALL_CMD} />
              </div>
            </div>

            {/* 辅助链接 */}
            <div className="flex items-center gap-[20px]">
              <button
                onClick={() => window.open('https://github.com/alva-ai/skills', '_blank')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="rgba(0,0,0,0.35)" className="group-hover:fill-[rgba(0,0,0,0.7)] transition-colors">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.35)] group-hover:text-[rgba(0,0,0,0.7)] transition-colors">
                  GitHub
                </span>
              </button>

              <span className="w-[1px] h-[12px] bg-[rgba(0,0,0,0.10)]" />

              <button
                onClick={() => onNavigate('api-keys')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[rgba(0,0,0,0.35)] group-hover:text-[rgba(0,0,0,0.7)] transition-colors">
                  <path d="M10 1.5a3 3 0 00-2.83 4.01L3 9.68V13h3.32l.35-.35A3 3 0 1010 1.5zM10 5a1 1 0 110-2 1 1 0 010 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.35)] group-hover:text-[rgba(0,0,0,0.7)] transition-colors">
                  Get API Key
                </span>
              </button>

              <span className="w-[1px] h-[12px] bg-[rgba(0,0,0,0.10)]" />

              <button
                onClick={() => onNavigate('skills')}
                className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer group p-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[rgba(0,0,0,0.35)] group-hover:text-[rgba(0,0,0,0.7)] transition-colors">
                  <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.35)] group-hover:text-[rgba(0,0,0,0.7)] transition-colors">
                  Browse Skills
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ========== Setup 提示条 ========== */}
        <section className="w-full flex justify-center pb-[56px] px-[24px]">
          <div className="w-full max-w-[600px]">
            <div className="flex gap-[12px]">
              {/* Configure */}
              <div className="flex-1 rounded-[8px] p-[14px]" style={{ background: '#1a1a2e' }}>
                <span className="text-[10px] tracking-[0.8px] uppercase font-['JetBrains_Mono',monospace] text-[rgba(255,255,255,0.25)] block mb-[6px]">
                  ~/.claude/settings.json
                </span>
                <pre className="text-[11px] leading-[17px] font-['JetBrains_Mono',monospace] text-[rgba(255,255,255,0.65)] m-0 whitespace-pre">{`{ "env": { "ALVA_API_KEY": "sk-..." } }`}</pre>
              </div>
              {/* Prompt */}
              <div className="flex-1 rounded-[8px] p-[14px] border border-[rgba(0,0,0,0.06)] bg-white">
                <span className="text-[10px] tracking-[0.8px] uppercase font-['JetBrains_Mono',monospace] text-[rgba(0,0,0,0.20)] block mb-[6px]">
                  Then ask your agent
                </span>
                <p className="text-[12px] leading-[18px] font-['Delight',sans-serif] text-[rgba(0,0,0,0.50)] m-0 italic">
                  "Build me a BTC dashboard with RSI oversold alerts"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 能力条 ========== */}
        <section className="w-full flex justify-center pb-[56px] px-[24px]">
          <div className="w-full max-w-[600px]">
            <div className="grid grid-cols-4 gap-[1px] rounded-[10px] overflow-hidden" style={{ background: 'rgba(0,0,0,0.05)' }}>
              {CAPABILITIES.map(cap => (
                <div key={cap.label} className="bg-white py-[18px] flex flex-col items-center gap-[4px]">
                  <span className="font-['Delight',sans-serif] text-[14px] leading-[20px] text-[rgba(0,0,0,0.75)]">
                    {cap.label}
                  </span>
                  <span className="font-['Delight',sans-serif] text-[11px] leading-[16px] text-[rgba(0,0,0,0.30)]">
                    {cap.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 示例 prompts ========== */}
        <section className="w-full flex justify-center pb-[80px] px-[24px]">
          <div className="w-full max-w-[600px]">
            <p className="font-['Delight',sans-serif] text-[12px] leading-[18px] text-[rgba(0,0,0,0.25)] mb-[12px] tracking-[0.5px] uppercase">
              Example prompts
            </p>
            <div className="flex flex-col gap-[6px]">
              {EXAMPLES.map((ex, i) => (
                <div key={i} className="flex items-start gap-[10px] py-[6px]">
                  <span className="font-['Delight',sans-serif] text-[12px] leading-[20px] text-[rgba(0,0,0,0.15)] shrink-0 w-[16px] text-right">{i + 1}</span>
                  <span className="font-['Delight',sans-serif] text-[13px] leading-[20px] text-[rgba(0,0,0,0.45)] italic">
                    "{ex}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </AppShell>
  );
}
