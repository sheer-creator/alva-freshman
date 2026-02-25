/**
 * [INPUT]: 无
 * [OUTPUT]: NVDA 同业估值对比表格
 * [POS]: Widget 层 — NVDA 全景看板估值视角
 */

/* ========== 真实数据 ========== */

interface PeerRow {
  ticker: string;
  price: string;
  mktCap: string;
  peFwd: string;
  revGrowth: string;
  grossMargin: string;
  highlight?: boolean;
}

const peers: PeerRow[] = [
  { ticker: 'NVDA', price: '$1,262', mktCap: '$3.08T', peFwd: '42.6x', revGrowth: '+78%', grossMargin: '75.2%', highlight: true },
  { ticker: 'AVGO', price: '$215',   mktCap: '$1.00T', peFwd: '32.1x', revGrowth: '+25%', grossMargin: '74.0%' },
  { ticker: 'TSM',  price: '$198',   mktCap: '$1.03T', peFwd: '22.4x', revGrowth: '+33%', grossMargin: '57.2%' },
  { ticker: 'AMD',  price: '$165',   mktCap: '$268B',  peFwd: '28.3x', revGrowth: '+12%', grossMargin: '52.1%' },
  { ticker: 'ARM',  price: '$178',   mktCap: '$186B',  peFwd: '85.2x', revGrowth: '+22%', grossMargin: '96.4%' },
  { ticker: 'MRVL', price: '$98',    mktCap: '$85B',   peFwd: '35.6x', revGrowth: '+18%', grossMargin: '63.5%' },
  { ticker: 'INTC', price: '$24',    mktCap: '$103B',  peFwd: 'NM',    revGrowth: '-8%',  grossMargin: '41.3%' },
];

const columns = [
  { key: 'ticker',      label: 'Ticker',       align: 'left' as const },
  { key: 'price',       label: 'Price',        align: 'right' as const },
  { key: 'mktCap',      label: 'Mkt Cap',      align: 'right' as const },
  { key: 'peFwd',       label: 'P/E (FWD)',    align: 'right' as const },
  { key: 'revGrowth',   label: 'Rev Growth',   align: 'right' as const },
  { key: 'grossMargin', label: 'Gross Margin', align: 'right' as const },
];

/* ========== 组件 ========== */

export function NVDAPeerValuationWidget() {
  return (
    <div className="flex flex-col gap-[16px] w-full relative rounded-[4px]">
      {/* Widget Title */}
      <div className="flex gap-[12px] h-[22px] items-center w-full">
        <p className="font-['Delight:Regular',sans-serif] leading-[22px] text-[14px] text-[rgba(0,0,0,0.9)] tracking-[0.14px]">
          Peer Valuation Comparison
        </p>
        <p className="font-['Delight:Regular',sans-serif] text-[12px] text-[rgba(0,0,0,0.5)] leading-[20px] tracking-[0.12px] ml-auto">
          02/20/2026
        </p>
      </div>

      {/* Table Body - g01 background */}
      <div
        className="relative rounded-[6px] w-full overflow-hidden"
        style={{ backgroundColor: 'var(--grey-g01)' }}
      >
        <table className="w-full border-collapse font-['Delight:Regular',sans-serif]">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-[10px] px-[16px] text-[11px] font-normal text-[rgba(0,0,0,0.5)] tracking-[0.11px] border-b border-[rgba(0,0,0,0.05)]"
                  style={{ textAlign: col.align }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {peers.map((row) => (
              <tr
                key={row.ticker}
                className={row.highlight ? 'bg-[rgba(73,163,166,0.06)]' : 'hover:bg-[rgba(0,0,0,0.02)]'}
              >
                {columns.map((col) => {
                  const val = row[col.key as keyof PeerRow];
                  const isGrowth = col.key === 'revGrowth';
                  const growthColor = isGrowth
                    ? (typeof val === 'string' && val.startsWith('-'))
                      ? 'var(--main-m4)'
                      : 'var(--main-m3)'
                    : undefined;

                  return (
                    <td
                      key={col.key}
                      className={`py-[10px] px-[16px] text-[12px] leading-[18px] border-b border-[rgba(0,0,0,0.05)] ${
                        col.key === 'ticker' && row.highlight ? 'font-medium text-[var(--main-m1)]' : 'text-[rgba(0,0,0,0.9)]'
                      }`}
                      style={{ textAlign: col.align, color: growthColor }}
                    >
                      {val as string}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute bottom-[12px] left-[16px] font-['Delight:Regular',sans-serif] text-[16px] font-semibold text-[rgba(0,0,0,1)] opacity-20 z-[1]">
          Alva
        </div>
      </div>
    </div>
  );
}
