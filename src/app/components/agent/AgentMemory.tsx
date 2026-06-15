/**
 * [INPUT]: Figma Page/Agent/Memory(7911:134917)Body 区 + Markdown/M 组件(H1 18 / H2 16 / H3 14 Medium / 正文 14 / bullet)
 * [OUTPUT]: Agent 页 Memory tab — 左侧 memory 文件列表(200px)+ 右侧 md 阅读视图;edit 切纯文本编辑态(check-l2 + Save)
 * [POS]: AgentNewSession tab==='memory' 时渲染;spec(alva-agent)口径 memory 为用户可见可编辑文件
 */

import { useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';

const FONT = "'Delight', sans-serif";

/* ========== mock:内容即纯文本 markdown,编辑态直接改源文本 ========== */

interface MemoryFile {
  id: string;
  name: string;
  lastUpdated: string;
  content: string;
}

const MEMORY_FILES: MemoryFile[] = [
  {
    id: 'user',
    name: 'User.md',
    lastUpdated: '03/02/2026',
    content: `## Who you are

Growth-oriented investor with a US large-cap core and a tactical crypto sleeve. Comfortable reading charts and funding data; prefers theses backed by numbers over narratives. Checks in most weekday mornings before the US open, usually 8:00–9:00 AM ET.

### Investing preferences

- Core focus: AI infrastructure (NVDA, AVGO, TSM) and the power-grid buildout around it.
- Prefers basket trackers with explicit weights over single-name calls.
- Backtests before subscribing — always asks for max drawdown alongside CAGR.
- Time horizon: 1–3 years for the core, weeks for the tactical sleeve.

### Communication style

- Lead with the conclusion, then the data; no long preambles.
- Numbers formatted with explicit direction (+/-, bp) and a timeframe.
- English for analysis; tickers always in $TICKER form.
- Charts only when a number alone can't carry the point.

### Constraints

- No leverage and no options strategies in recommendations.
- Crypto exposure capped at 15% of the total book.
- Quiet hours 11 PM – 7 AM — batch non-urgent pushes to the morning brief.
- Tax-sensitive: flag any suggestion that would realize short-term gains.

### Open questions

- Whether to add a dividend sleeve once the 10Y settles below 4%.
- Sizing for the power & grid theme — currently undecided between 15% and 25%.`,
  },
  {
    id: 'core-basket',
    name: 'core-basket.md',
    lastUpdated: '02/27/2026',
    content: `## Core basket

The long-term sleeve Alva tracks for rebalance signals and drawdown alerts. Weights are targets, not live positions — actual fills come from the connected portfolio.

### Current targets

- NVDA 30% — AI compute anchor; review after each earnings print (next: May 22).
- AVGO 20% — networking + custom-ASIC leg; watch the VMware integration margin story.
- TSM 20% — foundry leg; CoWoS capacity doubling through 2025 is the gate.
- VRT 15% — power and cooling; added 01/2026 after the capex revision sweep.
- GEV 15% — grid equipment backlog at 3.2x book-to-bill; added 01/2026.

### Rebalance rules

- Rebalance when any weight drifts more than 5pp from target.
- New entrants require a verified thesis entry first (see verified-theses.md).
- Trims route through risk-rules.md drawdown checks before posting.

### History

- 01/15/2026 — added VRT and GEV at 15% each, funded by trimming NVDA from 38%.
- 11/03/2025 — exited MU after the HBM thesis was absorbed into consensus.
- 09/12/2025 — initial basket: NVDA / AVGO / TSM at 40/30/30.`,
  },
  {
    id: 'risk-rules',
    name: 'risk-rules.md',
    lastUpdated: '02/14/2026',
    content: `## Risk rules

Standing rules Alva applies before surfacing any trade idea or rebalance suggestion. These override individual playbook signals.

### Position limits

- Single name max 30% of the book; single theme max 60%.
- Crypto sleeve capped at 15%; stablecoins excluded from the cap.
- No adding to a position within 48h of its earnings print.
- New positions start at half target weight; scale in over two entries.

### Drawdown responses

- Book -8% from high-water mark: flag exposure, propose trims only.
- Book -15%: stop surfacing new buy ideas until reviewed together.
- Single name -20% from cost: force a thesis re-check against verified-theses.md.

### Signal hygiene

- Two conflicting playbook signals on the same ticker: surface both, act on neither.
- Signals older than 24h are stale — re-run the source automation before citing.`,
  },
  {
    id: 'verified-theses',
    name: 'verified-theses.md',
    lastUpdated: '01/30/2026',
    content: `## Verified theses

Theses the user has explicitly confirmed after reviewing the evidence. Alva can cite these as established context, but re-validates the data behind them each time they drive a decision.

### Active

- AI compute is supply-constrained, not demand-constrained — confirmed 01/2026 after the CoWoS capacity review.
- Power availability is the next bottleneck for data-center buildout; grid names lag the narrative by 1–2 quarters.
- BTC regime tracking beats buy-and-hold on a risk-adjusted basis in the 2022–2025 backtest window (Sharpe 1.4 vs 0.9).
- Hyperscaler capex revisions lead semis revenue prints by roughly one quarter.

### Watching

- GLP-1 supply chain as a multi-year volume story — needs one more quarter of LLY/NVO capacity data.
- Implied moves into mega-cap ERs are systematically rich — premium-selling edge unverified on our own data.

### Retired

- ETH/BTC mean reversion — invalidated 12/2025 after three failed reversion windows.
- Small-cap rate-cut rotation — retired 10/2025; breadth never confirmed.`,
  },
  {
    id: 'alert-style',
    name: 'alert-style.md',
    lastUpdated: '01/12/2026',
    content: `## Alert style

How pushes should read across Web and Telegram. The goal: a 5-second scan tells the user whether to open the full card.

### Format

- Headline: 【tag】+ one-line conclusion with the key number.
- Body: max 4 bullets, each with its own data point — no filler lines.
- Always end with the next catalyst and its date when one exists.
- Emojis as bullet markers only (📊 💰 ⚠️ 🗓️), never inline in the text.

### Priority

- Threshold breaches and signal flips push immediately.
- Recaps and digests batch into the 7:30 AM morning brief.
- Anything during quiet hours (11 PM – 7 AM) holds unless it's a -15% book event.

### Channel notes

- Telegram: keep under 12 lines — long analysis links back to the Web thread.
- Web: full cards with charts welcome; group same-source pushes into one message.`,
  },
];

/* ========== 纯文本 markdown → 块(# / ## / ### / - / 段落,空行分块) ========== */

type MemoryBlock =
  | { type: 'h1' | 'h2' | 'h3' | 'p'; text: string }
  | { type: 'bullets'; items: string[] };

function parseMarkdown(src: string): MemoryBlock[] {
  const blocks: MemoryBlock[] = [];
  let bullets: string[] | null = null;
  const flush = () => {
    if (bullets) {
      blocks.push({ type: 'bullets', items: bullets });
      bullets = null;
    }
  };
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith('- ')) { (bullets ??= []).push(line.slice(2)); continue; }
    flush();
    if (line.startsWith('### ')) blocks.push({ type: 'h3', text: line.slice(4) });
    else if (line.startsWith('## ')) blocks.push({ type: 'h2', text: line.slice(3) });
    else if (line.startsWith('# ')) blocks.push({ type: 'h1', text: line.slice(2) });
    else blocks.push({ type: 'p', text: line });
  }
  flush();
  return blocks;
}

/* ========== md 块渲染(Figma Markdown/M:H1 18/28 H2 16/26 H3 14/22 Medium / 正文 14/22 / bullet 20px 位宽) ========== */

function MdBlock({ block }: { block: MemoryBlock }) {
  if (block.type !== 'bullets') {
    if (block.type === 'p') {
      return (
        <p className="w-full text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          {block.text}
        </p>
      );
    }
    const size = block.type === 'h1' ? 'pt-[2px] text-[18px] leading-[28px] tracking-[0.18px]' : block.type === 'h2' ? 'pt-[2px] text-[16px] leading-[26px] tracking-[0.16px]' : 'text-[14px] leading-[22px] tracking-[0.14px]';
    return (
      <p className={`w-full font-medium ${size}`} style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        {block.text}
      </p>
    );
  }
  return (
    <div className="flex w-full flex-col gap-[4px]">
      {block.items.map((item, i) => (
        <div key={i} className="flex w-full items-start">
          <span className="flex h-[22px] w-[20px] shrink-0 items-center justify-center text-[14px] leading-[22px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            •
          </span>
          <p className="min-w-0 flex-1 text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ========== 主组件 ========== */

export function AgentMemory() {
  const [activeId, setActiveId] = useState(MEMORY_FILES[0].id);
  /* 本 session 内的内容覆盖(保存后生效) */
  const [contents, setContents] = useState<Record<string, string>>({});
  /* 编辑草稿;null = 阅读态 */
  const [draft, setDraft] = useState<string | null>(null);

  const active = MEMORY_FILES.find((f) => f.id === activeId) ?? MEMORY_FILES[0];
  const activeContent = contents[active.id] ?? active.content;
  const editing = draft !== null;

  const selectFile = (id: string) => {
    setActiveId(id);
    setDraft(null);
  };

  const save = () => {
    if (draft === null) return;
    setContents((prev) => ({ ...prev, [active.id]: draft }));
    setDraft(null);
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-[28px]">
      <div className="mx-auto flex w-full max-w-[960px] items-start gap-[28px] py-[28px]">
        {/* 文件列表 — Figma list group:200px,选中 br05 */}
        <div className="flex w-[200px] shrink-0 flex-col">
          {MEMORY_FILES.map((f) => {
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                className="flex w-full cursor-pointer items-center gap-[4px] rounded-[4px] bg-transparent px-[12px] py-[9px] text-left transition-colors"
                style={{ border: 'none', background: isActive ? 'var(--b-r03, rgba(0,0,0,0.03))' : 'transparent' }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--b-r02, rgba(0,0,0,0.02))'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                onClick={() => selectFile(f.id)}
              >
                <CdnIcon name="disclaimer-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
                <span className="min-w-0 flex-1 truncate text-[14px] leading-[22px] tracking-[0.14px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 阅读 / 编辑视图 — 标题行 + md content 卡 */}
        <div className="flex min-w-0 flex-1 flex-col gap-[20px]">
          <div className="flex w-full items-center gap-[12px]">
            <p className="min-w-0 flex-1 text-[20px] leading-[30px] tracking-[0.2px]" style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              {active.name}
            </p>
            {editing ? (
              /* 编辑态:仅保留实心 Save 按钮,隐藏 Last Updated 与删除(Figma 7930:185393)*/
              <button
                className="flex shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[4px] border-none px-[12px] py-[4px]"
                style={{ background: 'var(--main-m1, #49A3A6)' }}
                onClick={save}
              >
                <CdnIcon name="check-f2" size={12} color="#fff" />
                <span className="text-[12px] font-medium leading-[20px] tracking-[0.12px] text-white" style={{ fontFamily: FONT }}>
                  Save
                </span>
              </button>
            ) : (
              <>
                <p className="whitespace-nowrap text-[12px] leading-[20px] tracking-[0.12px]" style={{ fontFamily: FONT, color: 'var(--text-n5, rgba(0,0,0,0.5))' }}>
                  Last Updated: {active.lastUpdated}
                </p>
                <button
                  className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0"
                  aria-label="Edit memory"
                  onClick={() => setDraft(activeContent)}
                >
                  <CdnIcon name="edit-l1" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
                </button>
                <button className="flex size-[16px] cursor-pointer items-center justify-center border-none bg-transparent p-0" aria-label="Delete memory">
                  <CdnIcon name="delete-l" size={16} color="var(--text-n9, rgba(0,0,0,0.9))" />
                </button>
              </>
            )}
          </div>

          {editing ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              rows={draft.split('\n').length + 2}
              spellCheck={false}
              className="w-full resize-none rounded-[8px] bg-transparent p-[24px] text-[14px] leading-[22px] tracking-[0.14px] outline-none"
              style={{ fontFamily: FONT, color: 'var(--text-n9, rgba(0,0,0,0.9))', border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}
            />
          ) : (
            <div className="flex w-full flex-col gap-[12px] rounded-[8px] p-[24px]" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
              {parseMarkdown(activeContent).map((block, i) => (
                <MdBlock key={i} block={block} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
