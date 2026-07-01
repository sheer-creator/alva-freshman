/**
 * [INPUT]: Figma Chat Zone/Alva Agent(9462:19971)— 未连接 + 非 Playbook 抽屉空态
 * [OUTPUT]: ConceptA — Answer(portrait 22 +「Alva」Medium14)+ Content(pl-30 gap-12):
 *           「Tell Alva what to watch」+ Onboard Card/Default 3 条引导;卡片点击进入全屏 agent 页 onboard 流程
 * [POS]: agent-channel — ChatPanel 抽屉 body 空态
 *
 * 重要:本组件挂在 .agent-channel 作用域下,该作用域有 `button{padding:0;border:none}` 与 `p{font-weight:400}`
 * 两条高特异性规则会盖掉 Tailwind 的 p-16 / font-medium。故 padding、fontWeight、border 一律用 inline style(最高优先级)。
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { CdnIcon } from '../shared/CdnIcon';

const FONT = "'Delight', sans-serif";
const N9 = 'var(--text-n9, rgba(0,0,0,0.9))';
const N5 = 'var(--text-n5, rgba(0,0,0,0.5))';
/* .agent-channel 把 --line-l2 重映射成 0.12,这里硬编码 Figma 的 l2=0.2 */
const L2 = 'rgba(0,0,0,0.2)';

/* Onboard Card/Default — Figma 9462:19971;3 行引导,行间分隔线,尾部箭头 */
const CARDS: { emoji: string; title: string; desc: string }[] = [
  { emoji: '💼', title: 'Set up your daily portfolio digest', desc: 'Add your holdings so Alva can brief you on the moves, risks, and catalysts that matter to your positions.' },
  { emoji: '👀', title: 'Build a market watchlist', desc: 'Track the tickers you care about and get updates when price moves, news, or catalysts are worth attention.' },
  { emoji: '📣', title: 'Set up a daily FinTwit digest', desc: 'Follow key market voices and get a daily summary of the posts, tickers, and themes moving the conversation.' },
];

/* 内联字体样式(fontWeight 走 inline,避免被作用域 p{font-weight:400} 覆盖) */
const tMedium14: React.CSSProperties = { fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', fontWeight: 500, color: N9 };
const tRegular14: React.CSSProperties = { fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: '0.14px', fontWeight: 400, color: N9 };
const tDesc12: React.CSSProperties = { fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: '0.12px', fontWeight: 400, color: N5 };

interface ConceptAProps {
  /** 卡片点击 → 进入全屏 agent 页对应 onboard 流程(Figma 标注:不在小窗口里进行) */
  onOpenFull: () => void;
}

export function ConceptA({ onOpenFull }: ConceptAProps) {
  const base = import.meta.env.BASE_URL;
  return (
    /* Answer — Figma:flex-col gap-8 */
    <div className="flex w-full flex-col gap-[8px]">
      {/* AgentAlvaAgent — portrait 22(rounded 4)+「Alva」Medium 14 */}
      <div className="flex items-center gap-[8px]">
        <img src={`${base}logo-portrait.svg`} alt="Alva" className="shrink-0" style={{ width: 22, height: 22, borderRadius: 4 }} />
        <p style={tMedium14}>Alva</p>
      </div>

      {/* Content — pl-30(portrait 22 + gap 8)· gap 12 */}
      <div className="flex w-full flex-col gap-[12px]" style={{ paddingLeft: 30 }}>
        <div>
          <p style={tMedium14}>Tell Alva what to watch</p>
          <p style={tRegular14}>Start with your holdings, tickers, or FinTwit voices. Alva will send a daily brief on what moved and why.</p>
        </div>

        {/* Onboard Card/Default — 单容器 · rounded 8 · 每行 p-16 · 行间 0.5px l2 分割线 */}
        <div className="flex w-full flex-col overflow-hidden" style={{ borderRadius: 8, border: `0.5px solid ${L2}` }}>
          {CARDS.map((c, i, arr) => (
            <button
              key={c.title}
              type="button"
              onClick={onOpenFull}
              className="flex w-full cursor-pointer items-center gap-[8px] text-left transition-colors"
              style={{ padding: 16, background: 'transparent', border: 'none', borderBottom: i < arr.length - 1 ? `0.5px solid ${L2}` : 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--b-r02, rgba(0,0,0,0.02))'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 2 }}>
                <p style={tMedium14}><span style={{ marginRight: 8 }}>{c.emoji}</span>{c.title}</p>
                <p style={tDesc12}>{c.desc}</p>
              </div>
              <CdnIcon name="arrow-right-l1" size={14} color={N5} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
