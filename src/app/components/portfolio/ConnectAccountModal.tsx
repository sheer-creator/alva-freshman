/**
 * [INPUT]: Figma Draft DJ9Acp13FruTilsTdrE0id node 7437:70052 (Modal/Connect)
 * [OUTPUT]: Portfolio Connect Account 弹窗 — 选券商 → 账户配置 → 凭证 → 结果态
 * [POS]: Portfolio 页 "Add" 按钮触发
 *
 * 流程（与设计稿一一对应）：
 *  select      选券商网格（Crypto / US Stock 两组）
 *  configure   Account type (Paper/Live) + Access level (Trading/Read-only，Read-only 不可选)
 *  credentials US Stock → SnapTrade 跳转式；Crypto → API Key 表单式
 *  connecting / success / cancelled / failed / timeout  结果态
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { AlvaLoading } from '@/app/components/shared/AlvaLoading';

const FONT = "'Delight', sans-serif";
const BASE = import.meta.env.BASE_URL;

/* ---- design tokens（theme.css 缺 20% 档与 br 系列时用字面量，注释标注 Figma token） ---- */
const M2_20 = 'rgba(33, 150, 243, 0.2)';   /* main/m2-20 */
const M3_20 = 'rgba(42, 155, 125, 0.2)';   /* main/m3-20 */
const BR03 = 'rgba(0, 0, 0, 0.03)';        /* content/br03 */
const BR7 = 'rgba(0, 0, 0, 0.7)';          /* content/br7 */
const NR9 = 'rgba(255, 255, 255, 0.9)';    /* text/nr9 */

/* ---- broker 数据（清单与 https://alva.ai/portfolio Add 弹窗一致，2026-06-11 核对） ---- */
type Category = 'Crypto' | 'US Stock';
type AuthKind = 'apikey' | 'snaptrade';

interface BrokerDef {
  id: string;
  name: string;
  category: Category;
  auth: AuthKind;
  logo: string;
  /** favicon 类方形 logo：白底圆形容器内缩放呈现；圆形品牌 svg 则直接铺满 */
  plain?: boolean;
  /** plain 容器底色（如 IBKR 深底） */
  bg?: string;
}

const fav = (id: string) => `${BASE}logo-broker-fav-${id}.png`;
const round = (id: string) => `${BASE}logo-broker-round-${id}.svg`;

const BROKERS: BrokerDef[] = [
  /* Crypto —— 生产顺序 */
  { id: 'binance', name: 'Binance', category: 'Crypto', auth: 'apikey', logo: round('binance') },
  { id: 'hyperliquid', name: 'Hyperliquid', category: 'Crypto', auth: 'apikey', logo: round('hyperliquid') },
  { id: 'okx', name: 'OKX', category: 'Crypto', auth: 'apikey', logo: round('okx') },
  { id: 'coinbase', name: 'Coinbase', category: 'Crypto', auth: 'apikey', logo: round('coinbase') },
  { id: 'etoro', name: 'eToro', category: 'Crypto', auth: 'apikey', logo: fav('etoro'), plain: true },
  { id: 'kraken', name: 'Kraken', category: 'Crypto', auth: 'apikey', logo: fav('kraken'), plain: true },
  /* US Stock —— 生产顺序：Alpaca、Robinhood 在前，其余按字母序 */
  { id: 'alpaca', name: 'Alpaca', category: 'US Stock', auth: 'snaptrade', logo: round('alpaca') },
  { id: 'robinhood', name: 'Robinhood', category: 'US Stock', auth: 'snaptrade', logo: round('robinhood') },
  { id: 'ajbell', name: 'AJ Bell', category: 'US Stock', auth: 'snaptrade', logo: fav('ajbell'), plain: true },
  { id: 'bux', name: 'Bux', category: 'US Stock', auth: 'snaptrade', logo: fav('bux'), plain: true },
  { id: 'chase', name: 'Chase', category: 'US Stock', auth: 'snaptrade', logo: fav('chase'), plain: true },
  { id: 'commsec', name: 'CommSec', category: 'US Stock', auth: 'snaptrade', logo: fav('commsec'), plain: true },
  { id: 'degiro', name: 'DEGIRO', category: 'US Stock', auth: 'snaptrade', logo: fav('degiro'), plain: true },
  { id: 'etrade', name: 'E*Trade', category: 'US Stock', auth: 'snaptrade', logo: fav('etrade'), plain: true },
  { id: 'empower', name: 'Empower', category: 'US Stock', auth: 'snaptrade', logo: fav('empower'), plain: true },
  { id: 'fidelity', name: 'Fidelity', category: 'US Stock', auth: 'snaptrade', logo: fav('fidelity'), plain: true },
  { id: 'ibkr', name: 'Interactive Brokers', category: 'US Stock', auth: 'snaptrade', logo: `${BASE}logo-broker-ibkr.svg`, plain: true, bg: '#1c1c1c' },
  { id: 'moomoo', name: 'Moomoo', category: 'US Stock', auth: 'snaptrade', logo: fav('moomoo'), plain: true },
  { id: 'pnc', name: 'PNC', category: 'US Stock', auth: 'snaptrade', logo: fav('pnc'), plain: true },
  { id: 'public', name: 'Public', category: 'US Stock', auth: 'snaptrade', logo: fav('public'), plain: true },
  { id: 'questrade', name: 'Questrade', category: 'US Stock', auth: 'snaptrade', logo: fav('questrade'), plain: true },
  { id: 'schwab', name: 'Schwab', category: 'US Stock', auth: 'snaptrade', logo: fav('schwab'), plain: true },
  { id: 'stake', name: 'Stake Australia', category: 'US Stock', auth: 'snaptrade', logo: fav('stake'), plain: true },
  { id: 'tastytrade', name: 'tastytrade', category: 'US Stock', auth: 'snaptrade', logo: fav('tastytrade'), plain: true },
  { id: 'td', name: 'TD Direct Investing', category: 'US Stock', auth: 'snaptrade', logo: fav('td'), plain: true },
  { id: 'tiaa', name: 'TIAA', category: 'US Stock', auth: 'snaptrade', logo: fav('tiaa'), plain: true },
  { id: 'trading212', name: 'Trading212', category: 'US Stock', auth: 'snaptrade', logo: fav('trading212'), plain: true },
  { id: 'trading212-practice', name: 'Trading212 Practice', category: 'US Stock', auth: 'snaptrade', logo: fav('trading212'), plain: true },
  { id: 'transamerica', name: 'Transamerica', category: 'US Stock', auth: 'snaptrade', logo: fav('transamerica'), plain: true },
  { id: 'usbank', name: 'U.S. Bank', category: 'US Stock', auth: 'snaptrade', logo: fav('usbank'), plain: true },
  { id: 'upstox', name: 'Upstox', category: 'US Stock', auth: 'snaptrade', logo: fav('upstox'), plain: true },
  { id: 'vanguard', name: 'Vanguard US', category: 'US Stock', auth: 'snaptrade', logo: fav('vanguard'), plain: true },
  { id: 'wealthsimple', name: 'Wealthsimple', category: 'US Stock', auth: 'snaptrade', logo: fav('wealthsimple'), plain: true },
  { id: 'webull-ca', name: 'Webull Canada', category: 'US Stock', auth: 'snaptrade', logo: fav('webull'), plain: true },
  { id: 'webull-us', name: 'Webull US', category: 'US Stock', auth: 'snaptrade', logo: fav('webull'), plain: true },
  { id: 'wellsfargo', name: 'Wells Fargo', category: 'US Stock', auth: 'snaptrade', logo: fav('wellsfargo'), plain: true },
  { id: 'zerodha', name: 'Zerodha', category: 'US Stock', auth: 'snaptrade', logo: fav('zerodha'), plain: true },
];

/** 圆形 broker logo：品牌 svg 直接铺满；favicon 白底圆容器内缩 72% */
function BrokerLogo({ broker, size = 24 }: { broker: BrokerDef; size?: number }) {
  if (broker.plain) {
    return (
      <span
        className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
        style={{ width: size, height: size, background: broker.bg ?? '#fff', border: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
      >
        <img src={broker.logo} alt={broker.name} style={{ width: Math.round(size * 0.72), height: Math.round(size * 0.72), objectFit: 'contain' }} />
      </span>
    );
  }
  return <img src={broker.logo} alt={broker.name} className="rounded-full shrink-0" style={{ width: size, height: size }} />;
}

/* ---- 文案（来源：设计稿 Info 卡 7439:130517 / 7452:131092） ---- */
const SNAPTRADE_STEPS = [
  'Alva opens the SnapTrade Connection Portal in a new window',
  'Search or select your broker — Fidelity, IBKR, Schwab, Robinhood, Coinbase, 800+ more',
  'Sign in on the broker side; Alva never sees your password',
  'Return to Alva and choose which accounts to display',
];
const apiKeySteps = (name: string) => [
  `Go to ${name} → API Management → create key, enable Spot/Futures trading`,
  'Choose market (Spot/Futures) and mode (Demo/Live) — Live coming soon',
  'For Live: enable trading permissions (Spot/Futures) & whitelist Alva IPs (recommended)',
  'Paste keys in Alva and connect',
];

type Step = 'select' | 'configure' | 'credentials' | 'connecting' | 'success' | 'cancelled' | 'failed' | 'timeout';
type AccountType = 'paper' | 'live';
type TradingType = 'Spot' | 'Future';

export interface ConnectAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConnected?: (brokerId: string) => void;
  /** 仅供原型/预览直达某一步 */
  initialStep?: Step;
  initialBrokerId?: string;
  initialAccountType?: AccountType;
}

/* ========== 原子件 ========== */

function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={`shrink-0 border-none bg-transparent p-0 cursor-pointer hover:opacity-60 transition-opacity ${className ?? ''}`}
    >
      <CdnIcon name="close-l1" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
    </button>
  );
}

/** configure / credentials 共用的弹窗头（返回箭头 + logo + 名称/分类） */
function BrokerHeader({ broker, onBack, onClose }: { broker: BrokerDef; onBack: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col items-start pt-[28px] pb-[12px] w-full shrink-0 max-sm:pt-[32px]">
      <div className="flex gap-[12px] h-[28px] items-start px-[28px] w-full max-sm:px-[16px]">
        <div className="flex flex-1 min-w-0 gap-[8px] h-[28px] items-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="shrink-0 border-none bg-transparent p-0 cursor-pointer hover:opacity-60 transition-opacity"
          >
            <CdnIcon name="arrow-left-l2" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
          </button>
          <BrokerLogo broker={broker} size={28} />
          <div className="flex flex-1 min-w-0 flex-col items-start overflow-hidden whitespace-nowrap" style={{ fontFamily: FONT }}>
            <p className="text-[14px] leading-[22px] tracking-[0.14px] mb-[-4px]" style={{ color: 'var(--text-n10, #000)' }}>{broker.name}</p>
            <p className="text-[12px] leading-[20px] tracking-[0.12px]" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{broker.category}</p>
          </div>
        </div>
        <CloseButton onClick={onClose} className="max-sm:hidden" />
      </div>
    </div>
  );
}

/** configure 选项卡片（Account type / Access level） */
function OptionCard({
  icon, label, desc, state, onClick,
}: {
  icon: string; label: string; desc: string;
  state: 'selected' | 'unselected' | 'disabled';
  onClick?: () => void;
}) {
  const disabled = state === 'disabled';
  const selected = state === 'selected';
  const interactive = !disabled && !!onClick;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full flex flex-col items-start gap-[4px] p-[12px] rounded-[6px] bg-transparent text-left transition-colors ${interactive ? 'hover:bg-[rgba(0,0,0,0.02)]' : ''}`}
      style={{
        border: selected ? '1px solid var(--main-m3, #2a9b7d)' : '0.5px solid var(--line-l2, rgba(0,0,0,0.2))',
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      <div className="flex gap-[6px] items-center w-full">
        <CdnIcon name={icon} size={18} color={disabled ? 'var(--text-n5, rgba(0,0,0,0.5))' : 'var(--text-n9, rgba(0,0,0,0.9))'} />
        <p className="flex-1 min-w-0 text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: disabled ? 'var(--text-n5, rgba(0,0,0,0.5))' : 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {label}
        </p>
        {disabled
          ? <CdnIcon name="minus-l1" size={16} color="var(--text-n3, rgba(0,0,0,0.3))" />
          : selected
            ? <CdnIcon name="check-f2" size={16} color="var(--main-m3, #2a9b7d)" />
            : <CdnIcon name="check-l2" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />}
      </div>
      <p className="text-[12px] leading-[20px] tracking-[0.12px] w-full" style={{ fontFamily: FONT, color: disabled ? 'var(--text-n3, rgba(0,0,0,0.3))' : 'var(--text-n5, rgba(0,0,0,0.5))' }}>
        {desc}
      </p>
    </button>
  );
}

/** credentials 页顶部的已选配置 chip */
function ConfigChip({ icon, label, tone }: { icon: string; label: string; tone: 'm2' | 'm3' | 'muted' }) {
  const bg = tone === 'm2' ? M2_20 : tone === 'm3' ? M3_20 : BR03;
  const fg = tone === 'm2' ? 'var(--main-m2, #2196F3)' : tone === 'm3' ? 'var(--main-m3, #2a9b7d)' : 'var(--text-n5, rgba(0,0,0,0.5))';
  return (
    <div className="flex gap-[4px] items-center justify-center px-[8px] py-[2px] rounded-[4px] shrink-0" style={{ background: bg }}>
      <CdnIcon name={icon} size={14} color={fg} />
      <span className="text-[12px] leading-[20px] tracking-[0.12px] text-center whitespace-nowrap" style={{ fontFamily: FONT, color: fg }}>{label}</span>
    </div>
  );
}

/** 高度折叠容器 — grid rows 1fr↔0fr 过渡，三段对向折叠时弹窗总高直接滑向目标值。
 *  closed 时负 margin 抵消父级 flex gap，避免留出双倍间距。
 *  内容透明度编排：消失先快速淡出、出现延迟渐显——否则矮元素（如 tag 行）
 *  同时长揭示的像素速度远快于大块内容位移，节奏显得抢拍。 */
const COLLAPSE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
function Collapse({ open, gap = 20, children }: { open: boolean; gap?: number; children: React.ReactNode }) {
  return (
    <div
      className="w-full shrink-0"
      aria-hidden={!open}
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        marginTop: open ? 0 : -gap,
        visibility: open ? 'visible' : 'hidden',
        transition: `grid-template-rows 0.32s ${COLLAPSE_EASE}, margin-top 0.32s ${COLLAPSE_EASE}, visibility 0.32s`,
      }}
    >
      <div
        className="min-h-0 overflow-hidden w-full"
        style={{
          opacity: open ? 1 : 0,
          transition: open ? 'opacity 0.2s ease 0.12s' : 'opacity 0.15s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** 步骤说明卡（ol + 文档链接） */
function InfoCard({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col gap-[12px] items-center px-[16px] py-[12px] rounded-[8px] w-full" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
      <ol className="list-decimal w-full m-0 p-0" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
        {steps.map((s) => (
          <li key={s} className="ms-[18px] text-[12px] leading-[20px] tracking-[0.12px]">{s}</li>
        ))}
      </ol>
      <div className="h-[0.5px] w-full" style={{ background: 'var(--line-l2, rgba(0,0,0,0.2))' }} />
      <a
        className="text-[12px] leading-[20px] tracking-[0.12px] whitespace-nowrap cursor-pointer hover:opacity-70 transition-opacity"
        style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', textDecoration: 'none' }}
        href="https://docs.alva.xyz"
        target="_blank"
        rel="noreferrer"
      >
        Go to official documentation for more details →
      </a>
    </div>
  );
}

/** 表单输入（label + input） */
function LabeledInput({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="flex flex-col gap-[8px] items-start justify-center w-full">
      <p className="text-[14px] leading-[22px] tracking-[0.14px] w-full truncate" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter"
        className="connect-input w-full h-[40px] px-[12px] rounded-[6px] bg-white text-[14px] leading-[22px] tracking-[0.14px] outline-none"
        style={{ fontFamily: FONT, border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))', color: 'var(--text-n9, rgba(0,0,0,0.9))' }}
      />
    </div>
  );
}

function PrimaryButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[48px] flex items-center justify-center gap-[8px] px-[20px] rounded-[6px] border-none cursor-pointer hover:opacity-90 transition-opacity"
      style={{ background: 'var(--main-m1, #49A3A6)' }}
    >
      <span className="text-[16px] leading-[26px] tracking-[0.16px] truncate" style={{ fontFamily: FONT, fontWeight: 500, color: '#fff' }}>{label}</span>
    </button>
  );
}

/** 结果态外壳（成功 / 取消 / 失败 / 超时 / 加载） */
function ResultShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col gap-[28px] items-center justify-center w-[436px] max-w-[calc(100vw-32px)] min-h-[436px] px-[28px] pt-[56px] pb-[28px] rounded-[12px] max-sm:w-full max-sm:max-w-full max-sm:rounded-b-none max-sm:min-h-[70dvh] max-sm:px-[16px]"
      style={{ background: '#fff', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
    >
      {/* 移动端拖拽条 */}
      <div className="sm:hidden absolute top-0 left-0 right-0 h-[12px] flex items-end justify-center pointer-events-none">
        <div className="w-[36px] h-[4px] rounded-[4px]" style={{ background: 'rgba(0, 0, 0, 0.07)' }} />
      </div>
      <CloseButton onClick={onClose} className="absolute top-[27px] right-[28px] max-sm:hidden" />
      {children}
    </div>
  );
}

function ResultBody({ circle, icon, iconColor, title, lines, iconAnim = 'fade', action }: {
  circle: 'success' | 'warning'; icon: string; iconColor: string; title: string; lines: string[];
  /** 成功态弹出（带回弹），警示态渐显 */
  iconAnim?: 'pop' | 'fade';
  /** 文字操作链接（如 failed 态的 Try again） */
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center w-full">
      <div
        className="relative flex items-center justify-center size-[80px]"
        style={{
          animation: iconAnim === 'pop'
            ? 'connect-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both'
            : 'connect-fade-in 0.28s ease both',
        }}
      >
        <img src={`${BASE}element-circle-${circle}.svg`} alt="" className="absolute inset-0 size-full" />
        <CdnIcon name={icon} size={40} color={iconColor} />
      </div>
      <div className="flex flex-col gap-[4px] items-center justify-center w-full text-center" style={{ fontFamily: FONT }}>
        <p className="text-[20px] leading-[30px] tracking-[0.2px] w-full" style={{ color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-[14px] leading-[22px] tracking-[0.14px] w-full" style={{ color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>{l}</p>
        ))}
        {action}
      </div>
    </div>
  );
}

/* ========== 主组件 ========== */

export function ConnectAccountModal({
  open, onClose, onConnected,
  initialStep = 'select', initialBrokerId, initialAccountType = 'paper',
}: ConnectAccountModalProps) {
  const [step, setStep] = useState<Step>(initialStep);
  /* 第二屏的展开/收起子状态，与 step 解耦：回到列表时第二屏保持原布局（屏外隐藏），
     避免 FLIP 高度动画量到折叠后的空壳高度 */
  const [setupView, setSetupView] = useState<'configure' | 'credentials'>(initialStep === 'credentials' ? 'credentials' : 'configure');
  const [broker, setBroker] = useState<BrokerDef | null>(BROKERS.find((b) => b.id === initialBrokerId) ?? null);
  const [accountType, setAccountType] = useState<AccountType>(initialAccountType);
  const [accessLevel, setAccessLevel] = useState<'trading' | 'readonly'>('trading');
  const [tradingType, setTradingType] = useState<TradingType>('Spot');
  const [address, setAddress] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [closing, setClosing] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* 跳屏高度动画（FLIP）：切屏前记录容器高度，渲染后从旧高度平滑过渡到新高度，
     避免列表↔详情切换时弹窗高度瞬跳 */
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const pendingHRef = useRef<number | null>(null);
  const goStep = (next: Step) => {
    if (sheetRef.current) pendingHRef.current = sheetRef.current.offsetHeight;
    setStep(next);
  };
  useLayoutEffect(() => {
    const el = sheetRef.current;
    const oldH = pendingHRef.current;
    pendingHRef.current = null;
    if (!el || oldH == null) return;
    const newH = el.offsetHeight;
    if (Math.abs(newH - oldH) < 1) return;
    el.style.height = `${oldH}px`;
    el.style.transition = 'height 0.3s ease';
    void el.offsetHeight; /* force reflow */
    el.style.height = `${newH}px`;
    const t = setTimeout(() => { el.style.height = ''; el.style.transition = ''; }, 320);
    return () => clearTimeout(t);
  }, [step]);

  /* 出场：先播 0.18s 退场动效，再真正卸载 */
  const requestClose = () => {
    setClosing(true);
    timers.current.push(setTimeout(() => { setClosing(false); onClose(); }, 180));
  };
  const requestCloseRef = useRef(requestClose);
  requestCloseRef.current = requestClose;

  /* 打开时重置到入口步骤；锁滚动 + ESC 关闭 */
  useEffect(() => {
    if (!open) return;
    setStep(initialStep);
    setSetupView(initialStep === 'credentials' ? 'credentials' : 'configure');
    setBroker(BROKERS.find((b) => b.id === initialBrokerId) ?? null);
    setAccountType(initialAccountType);
    setAccessLevel('trading');
    setTradingType('Spot');
    setAddress(''); setApiKey(''); setSecret('');
    setClosing(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') requestCloseRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [open, initialStep, initialBrokerId, initialAccountType, onClose]);

  /* 结果态：5s 倒计时后自动消失（成功额外回调 onConnected）；failed 例外——驻留并提供 Try again */
  useEffect(() => {
    if (step !== 'success' && step !== 'timeout' && step !== 'cancelled') return;
    setCountdown(5);
    const iv = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    const done = setTimeout(() => {
      if (step === 'success') onConnected?.(broker?.id ?? '');
      requestCloseRef.current();
    }, 5000);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const pickBroker = (b: BrokerDef) => { setBroker(b); setSetupView('configure'); goStep('configure'); };
  const goSetupView = (v: 'configure' | 'credentials') => { setSetupView(v); setStep(v); };
  const startConnect = () => {
    setStep('connecting');
    /* demo 剧本：Robinhood 分支演示失败链路，其余券商成功 */
    const willFail = broker?.id === 'robinhood';
    timers.current.push(setTimeout(() => setStep(willFail ? 'failed' : 'success'), 1600));
  };

  const grid = (category: Category) => (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <p className="text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>{category}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[8px] w-full">
        {BROKERS.filter((b) => b.category === category).map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => pickBroker(b)}
            className="flex flex-col items-start justify-center gap-[8px] px-[12px] pt-[12px] pb-[10px] rounded-[6px] bg-transparent cursor-pointer text-left transition-colors hover:bg-[rgba(0,0,0,0.03)]"
            style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
          >
            <BrokerLogo broker={b} size={24} />
            <p className="w-full truncate text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n10, #000)' }}>{b.name}</p>
          </button>
        ))}
      </div>
    </div>
  );

  /* 第二屏内容券商：未选择时兜底第一家（隐藏在屏外，不可见） */
  const screenBroker = broker ?? BROKERS[0];
  const inSetup = step === 'configure' || step === 'credentials';
  const isSnapTrade = screenBroker.auth === 'snaptrade';
  /* Robinhood 分支：Access level 两项均可选；其余券商 Read-only 灰置 */
  const accessSelectable = screenBroker.id === 'robinhood';
  const accountChip = accountType === 'live'
    ? <ConfigChip icon={`${BASE}icon-live-l.svg`} label="Live" tone="m3" />
    : <ConfigChip icon={`${BASE}icon-flask-l.svg`} label="Paper" tone="m2" />;
  const accessChip = accessLevel === 'readonly'
    ? <ConfigChip icon={`${BASE}icon-swap-off-l.svg`} label="Read-only" tone="muted" />
    : <ConfigChip icon="swap-l" label="Trading" tone="m3" />;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] max-sm:items-end max-sm:px-0"
      style={{
        background: 'var(--main-m7, rgba(0,0,0,0.5))',
        animation: 'connect-overlay-in 0.2s ease',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.18s ease',
      }}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label="Connect Account"
    >
      <style>{`
        .connect-input::placeholder { color: var(--text-n3, rgba(0,0,0,0.3)); }
        @keyframes connect-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes connect-sheet-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes connect-pop { from { opacity: 0; transform: scale(0.3); } to { opacity: 1; transform: scale(1); } }
        @keyframes connect-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .connect-sheet-wrap { animation: connect-sheet-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
        /* 移动端（设计稿 Mobile section 7509:18061）：底部抽屉，从下方滑入 */
        @media (max-width: 639px) {
          @keyframes connect-sheet-in-m { from { opacity: 0; transform: translateY(56px); } to { opacity: 1; transform: none; } }
          .connect-sheet-wrap { animation: connect-sheet-in-m 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        className="connect-sheet-wrap max-sm:w-full flex justify-center"
        style={{
          opacity: closing ? 0 : 1,
          transform: closing ? 'translateY(8px) scale(0.98)' : 'none',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >

        {/* ---- Step 1–3 · 同一弹窗，内部 push 跳屏：第二屏从右侧滑入，卡片列表后退 ---- */}
        {(step === 'select' || inSetup) && (
          <div ref={sheetRef} className="relative w-[436px] max-w-[calc(100vw-32px)] rounded-[8px] overflow-hidden max-h-[min(640px,calc(100vh-64px))] max-sm:w-full max-sm:max-w-full max-sm:rounded-[12px] max-sm:rounded-b-none max-sm:max-h-[calc(100dvh-56px)]" style={{ background: '#fff', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))', boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.08)' }}>

            {/* 移动端拖拽条（设计稿 Bottom Sheet Items 36×4 br07） */}
            <div className="sm:hidden absolute top-0 left-0 right-0 h-[12px] z-10 flex items-end justify-center pointer-events-none">
              <div className="w-[36px] h-[4px] rounded-[4px]" style={{ background: 'rgba(0, 0, 0, 0.07)' }} />
            </div>

            {/* 第一屏 · 选券商（push 时后退变暗） */}
            <div
              className={`flex flex-col items-start w-full ${inSetup ? 'absolute inset-0 pointer-events-none' : ''}`}
              aria-hidden={inSetup}
              style={{
                maxHeight: 'inherit', background: '#fff',
                transform: inSetup ? 'translateX(-24%) scale(0.97)' : 'none',
                opacity: inSetup ? 0 : 1,
                visibility: inSetup ? 'hidden' : 'visible',
                transition: 'transform 0.3s ease, opacity 0.3s ease, visibility 0.3s',
              }}
            >
            <div className="flex gap-[12px] items-start pt-[28px] pb-[20px] px-[28px] w-full shrink-0 max-sm:pt-[32px] max-sm:px-[16px]">
              <p className="flex-1 min-w-0 text-[18px] leading-[28px] tracking-[0.18px]" style={{ fontFamily: FONT, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                Connect Account
              </p>
              <CloseButton onClick={requestClose} className="max-sm:hidden" />
            </div>
            <div className="flex flex-col gap-[20px] items-start pb-[28px] px-[28px] w-full min-h-0 overflow-y-auto [&>*]:shrink-0 max-sm:px-[16px]">
              {grid('Crypto')}
              {grid('US Stock')}
            </div>
            </div>

            {/* 第二屏 · 账户配置（展开）/凭证（收起）。
                设计稿注释：点击 Next 整体内容向上缩至顶部 tag 行，展示其余内容 */}
            <div
              className={`flex flex-col items-start w-full ${inSetup ? '' : 'absolute inset-0 pointer-events-none'}`}
              aria-hidden={!inSetup}
              style={{
                maxHeight: 'inherit', background: '#fff',
                transform: inSetup ? 'none' : 'translateX(110%)',
                opacity: inSetup ? 1 : 0,
                visibility: inSetup ? 'visible' : 'hidden',
                transition: 'transform 0.3s ease, opacity 0.3s ease, visibility 0.3s',
              }}
            >
            {/* 返回箭头任何子状态都直接回列表；重展开配置走 tag 行的铅笔 */}
            <BrokerHeader broker={screenBroker} onBack={() => goStep('select')} onClose={requestClose} />
            {/* 设计稿注释：表单需完整填写，按钮不置底，自然滚动到按钮 */}
            <div className={`flex flex-col gap-[20px] items-start ${setupView === 'configure' ? 'pt-[8px]' : 'pt-[12px]'} pb-[28px] px-[28px] w-full min-h-0 overflow-y-auto [&>*]:shrink-0 max-sm:px-[16px]`}>

              {/* 收起后顶部 tag 行（设计稿 7452:130959）。三段内容常驻、对向折叠：
                  展开/收起时弹窗总高从当前值直接过渡到目标值，不会先缩小再撑大 */}
              <Collapse open={setupView === 'credentials'}>
                <div className="flex gap-[8px] items-center w-full">
                  <div className="flex flex-1 min-w-0 gap-[8px] items-center">
                    {accountChip}
                    {accessChip}
                  </div>
                  <button
                    type="button"
                    onClick={() => goSetupView('configure')}
                    aria-label="Edit configuration"
                    className="flex items-center justify-center size-[22px] rounded-[4px] border-none bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
                  >
                    <CdnIcon name="edit-l1" size={14} color="var(--text-n9, rgba(0,0,0,0.9))" />
                  </button>
                </div>
              </Collapse>

              {/* 账户配置区 — 收起时高度动画收到 0 */}
              <Collapse open={setupView === 'configure'}>
                  <div className="flex flex-col gap-[20px] items-start w-full">
                    <div className="flex flex-col gap-[8px] items-start w-full">
                      <p className="text-[14px] leading-[22px] tracking-[0.14px] w-full" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Account type</p>
                      <div className="flex flex-col gap-[8px] w-full">
                        <OptionCard
                          icon={`${BASE}icon-flask-l.svg`} label="Paper"
                          desc="Simulated funds. Test strategies without risking real money."
                          state={accountType === 'paper' ? 'selected' : 'unselected'}
                          onClick={() => setAccountType('paper')}
                        />
                        <OptionCard
                          icon={`${BASE}icon-live-l.svg`} label="Live"
                          desc="Real money. Orders affect your actual brokerage account."
                          state={accountType === 'live' ? 'selected' : 'unselected'}
                          onClick={() => setAccountType('live')}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start w-full">
                      <p className="text-[14px] leading-[22px] tracking-[0.14px] w-full" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Access level</p>
                      <div className="flex flex-col gap-[8px] w-full">
                        <OptionCard
                          icon="swap-l" label="Trading"
                          desc="Alva can place orders on this account automatically, driven by the playbooks you bind."
                          state={!accessSelectable || accessLevel === 'trading' ? 'selected' : 'unselected'}
                          onClick={accessSelectable ? () => setAccessLevel('trading') : undefined}
                        />
                        <OptionCard
                          icon={`${BASE}icon-swap-off-l.svg`} label="Read-only"
                          desc="Alva can view balances, positions, and history. It can never place orders."
                          state={accessSelectable ? (accessLevel === 'readonly' ? 'selected' : 'unselected') : 'disabled'}
                          onClick={accessSelectable ? () => setAccessLevel('readonly') : undefined}
                        />
                      </div>
                    </div>
                    <PrimaryButton label="Next" onClick={() => goSetupView('credentials')} />
                  </div>
              </Collapse>

              {/* 凭证区 — 展开态折叠隐藏 */}
              <Collapse open={setupView === 'credentials'}>
              <div className="flex flex-col gap-[20px] items-start w-full [&>*]:shrink-0">

              <InfoCard steps={isSnapTrade ? SNAPTRADE_STEPS : apiKeySteps(screenBroker.name)} />

              {isSnapTrade ? (
                <>
                  <button
                    type="button"
                    onClick={startConnect}
                    className="w-full h-[40px] flex items-center justify-center gap-[8px] px-[20px] rounded-[6px] bg-transparent cursor-pointer hover:bg-[rgba(0,0,0,0.03)] transition-colors"
                    style={{ border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))' }}
                  >
                    <span className="text-[14px] leading-[22px] tracking-[0.14px] truncate" style={{ fontFamily: FONT, fontWeight: 500, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                      Open {screenBroker.name}
                    </span>
                    <CdnIcon name="popout-l" size={18} color="var(--text-n9, rgba(0,0,0,0.9))" />
                  </button>
                  <LabeledInput label={`${screenBroker.name} Address`} value={address} onChange={setAddress} />
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-[8px] items-start w-full">
                    <p className="text-[14px] leading-[22px] tracking-[0.14px] whitespace-nowrap" style={{ fontFamily: FONT, color: 'var(--text-n7, rgba(0,0,0,0.7))' }}>Trading Type</p>
                    <div className="flex flex-wrap gap-[12px] items-start">
                      {(['Spot', 'Future'] as TradingType[]).map((t) => {
                        const active = tradingType === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTradingType(t)}
                            className={`flex items-center justify-center gap-[4px] px-[10px] py-[4px] rounded-[960px] border-none cursor-pointer transition-colors ${active ? '' : 'bg-[rgba(0,0,0,0.03)] hover:bg-[rgba(0,0,0,0.06)]'}`}
                            style={active ? { background: BR7 } : undefined}
                          >
                            <span className="text-[12px] leading-[20px] tracking-[0.12px] text-center whitespace-nowrap" style={{ fontFamily: FONT, color: active ? NR9 : 'var(--text-n7, rgba(0,0,0,0.7))' }}>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <LabeledInput label="API Key" value={apiKey} onChange={setApiKey} />
                  <LabeledInput label="Secret" value={secret} onChange={setSecret} type="password" />
                </>
              )}

              <PrimaryButton label="Continue to broker" onClick={startConnect} />

              </div>
              </Collapse>
            </div>
            </div>

          </div>
        )}

        {/* ---- 结果态 ---- */}
        {step === 'connecting' && (
          <ResultShell onClose={requestClose}>
            <div className="flex flex-col gap-[12px] items-center justify-center">
              <AlvaLoading size={56} />
              <p className="text-[16px] leading-[26px] tracking-[0.16px] text-center whitespace-nowrap" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>Loading...</p>
            </div>
          </ResultShell>
        )}

        {step === 'success' && (
          <ResultShell onClose={() => { onConnected?.(broker?.id ?? ''); requestClose(); }}>
            <ResultBody circle="success" icon="check-f2" iconColor="var(--main-m3, #2a9b7d)" title="Account Connected" lines={[`Closing in ${countdown}s`]} iconAnim="pop" />
          </ResultShell>
        )}

        {step === 'cancelled' && (
          <ResultShell onClose={requestClose}>
            <ResultBody
              circle="warning" icon="warning-f" iconColor="var(--main-m5, #E6A91A)"
              title="Connection cancelled"
              lines={['You closed the SnapTrade window before authorizing.', 'No account was added.', `Closing in ${countdown}s`]}
            />
          </ResultShell>
        )}

        {step === 'failed' && (
          <ResultShell onClose={requestClose}>
            <ResultBody
              circle="warning" icon="warning-f" iconColor="var(--main-m5, #E6A91A)"
              title="Connection failed"
              lines={['SnapTrade couldn’t reach your broker.', 'This is usually temporary.']}
              action={
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="border-none bg-transparent p-0 cursor-pointer text-[14px] leading-[22px] tracking-[0.14px] underline hover:opacity-70 transition-opacity"
                  style={{ fontFamily: FONT, color: 'var(--main-m1, #49A3A6)', textDecorationSkipInk: 'none', textUnderlinePosition: 'from-font' }}
                >
                  Try again
                </button>
              }
            />
          </ResultShell>
        )}

        {step === 'timeout' && (
          <ResultShell onClose={requestClose}>
            <ResultBody
              circle="warning" icon="warning-f" iconColor="var(--main-m5, #E6A91A)"
              title="Connection timed out"
              lines={[`Closing in ${countdown}s`]}
            />
          </ResultShell>
        )}

      </div>
    </div>
  );
}
