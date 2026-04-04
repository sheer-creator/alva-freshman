import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import { CHART_COLORS } from '@/lib/chart-theme';
import DotMatrixWave from '@/app/components/shared/DotMatrixWave';

const C = CHART_COLORS;

/* ══════ DATA ══════ */
const PLAYBOOKS = [
  {
    id: 'btc-ultimate',
    title: 'BTC Ultimate AI Trader',
    creator: 'Alva Intern',
    desc: 'Dual-engine analysis: RSI oversold alerts + Bollinger Band breakouts. Automatically trimming position extremities to capture core BTC price movements.',
    tickers: ['BTC', 'ETH', 'SOL'],
    color: C.primary,
    stars: 142,
    remixes: 23,
  },
  {
    id: 'mag7-rebalance',
    title: 'MAG7 Equal-Weight',
    creator: 'Harry Zzz',
    desc: 'Maintains a fully invested equal-weight portfolio of the Magnificent 7 stocks and rebalances monthly to capture sector rotation alpha.',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'],
    color: C.blue,
    stars: 89,
    remixes: 14,
  },
  {
    id: 'nvda-tsm',
    title: 'NVDA +3% Triggered TSM',
    creator: 'Smart Jing',
    desc: 'Buys TSM at the close when NVDA gains >3% close-to-close, then exits on +10% take-profit or -5% stop-loss.',
    tickers: ['NVDA', 'TSM'],
    color: C.red,
    stars: 48,
    remixes: 7,
  },
  {
    id: 'attribution',
    title: 'Attribution Analysis',
    creator: 'Sheer YLL YGG',
    desc: 'Monitor selected tokens to detect abnormal changes in Open Interest and trading volume, generating real-time alerts for unusual market activity.',
    tickers: ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX'],
    color: C.orange,
    stars: 72,
    remixes: 11,
  },
  {
    id: 'btc-macd',
    title: 'BTC MACD 1h Crossover',
    creator: 'Macro Scope X',
    desc: 'Trade BTC using MACD(12,26,9) line crossing its signal on 1-hour candles; enter long on bullish cross, exit on bearish cross.',
    tickers: ['BTC'],
    color: C.deepBlue,
    stars: 34,
    remixes: 5,
  },
];

/* ══════ MAIN COMPONENT ══════ */
export default function Home({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  return (
    <AppShell activePage="home" onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <div className="h-screen overflow-y-auto bg-[#fafafa]">
        {/* ══════ HERO ══════ */}
        <section
          style={{
            width: '100%',
            height: 532,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Dot matrix wave background */}
          <DotMatrixWave
            enableHover={false}
            bgColor="#fafafa"
            dotColor="#d1e0e0"
            waveSpeed={0.6}
            className="absolute inset-0 z-0 pointer-events-none w-full h-full"
          />

          <h1
            style={{
              fontSize: 45,
              lineHeight: 1.2,
              fontWeight: 400,
              color: 'rgba(0,0,0,0.9)',
              textAlign: 'center',
              maxWidth: 616,
              letterSpacing: 0.45,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Turn Ideas into Live Investing Playbooks in Minutes
          </h1>

          {/* Chat input */}
          <div style={{ width: '100%', maxWidth: 780, position: 'relative', zIndex: 1 }}>
            <ChatInput shadow />
          </div>
        </section>

        {/* ══════ WHAT YOU CAN BUILD ══════ */}
        <section
          style={{
            width: '100%',
            padding: '0 50px',
            borderTop: '0.5px solid rgba(0,0,0,0.15)',
            borderBottom: '0.5px solid rgba(0,0,0,0.15)',
          }}
        >
          <div
            style={{
              maxWidth: 1600,
              margin: '0 auto',
              padding: '28px 24px',
              borderLeft: '0.5px solid rgba(0,0,0,0.15)',
              borderRight: '0.5px solid rgba(0,0,0,0.15)',
            }}
          >
          <div
            style={{
              display: 'flex',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            {/* Left */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, padding: '10px 0' }}>
              <h2
                style={{
                  fontSize: 24,
                  lineHeight: '34px',
                  fontWeight: 400,
                  color: 'rgba(0,0,0,0.9)',
                  letterSpacing: 0.24,
                }}
              >
                What You Can Build
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { label: 'EV Supply Chain Intelligence', active: true },
                  { label: 'Unusual Volume Scanner', active: false },
                  { label: 'Earnings Whisper Board', active: false },
                  { label: 'Thesis Debate Room', active: false },
                  { label: 'Macro Regime Adaptive Trading', active: false },
                ].map((tag) => (
                  <button
                    key={tag.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 16px',
                      borderRadius: 6,
                      border: '0.5px solid rgba(0,0,0,0.3)',
                      background: tag.active ? '#e5eeee' : 'white',
                      fontFamily: "'Delight', sans-serif",
                      fontSize: 14,
                      lineHeight: '22px',
                      fontWeight: 400,
                      color: 'rgba(0,0,0,0.9)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      letterSpacing: 0.14,
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 0',
                    fontSize: 14,
                    lineHeight: '22px',
                    color: 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    letterSpacing: 0.14,
                  }}
                >
                  Explore More
                </span>
              </div>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: 8,
                  background: C.primary,
                  border: 'none',
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                <CdnIcon name="remix-l" size={18} color="white" />
                <span
                  style={{
                    fontFamily: "'Delight', sans-serif",
                    fontSize: 14,
                    lineHeight: '22px',
                    fontWeight: 500,
                    color: 'white',
                    letterSpacing: 0.14,
                  }}
                >
                  Remix This
                </span>
              </button>
            </div>

            {/* Right (preview card) */}
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                overflow: 'hidden',
                border: '0.5px solid rgba(0,0,0,0.3)',
                background: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                position: 'relative',
                aspectRatio: '1 / 1',
              }}
            >
              <div style={{ position: 'absolute', inset: 8, bottom: 160 }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
                    backgroundSize: '3px 3px',
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '56px 16px 16px',
                  background: 'linear-gradient(180deg, transparent 0%, white 60%)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingTop: 16,
                    borderTop: '1px solid rgba(0,0,0,0.07)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Avatar name="Alva Intern" size={22} />
                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: '22px',
                        color: 'rgba(0,0,0,0.9)',
                        letterSpacing: 0.14,
                      }}
                    >
                      alva
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 16,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CdnIcon name="star-l" size={16} color="rgba(0,0,0,0.9)" />
                      <span style={{ fontSize: 14, lineHeight: '22px', color: 'rgba(0,0,0,0.9)', letterSpacing: 0.14 }}>
                        12.8K
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CdnIcon name="remix-l" size={16} color="rgba(0,0,0,0.9)" />
                      <span style={{ fontSize: 14, lineHeight: '22px', color: 'rgba(0,0,0,0.9)', letterSpacing: 0.14 }}>
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>{/* end inner bordered container */}
        </section>

        {/* ══════ FEATURED PLAYBOOKS ══════ */}
        <section style={{ width: '100%', padding: '0 50px' }}>
          <div style={{ maxWidth: 1600, margin: '0 auto', padding: '28px 24px', borderLeft: '0.5px solid rgba(0,0,0,0.15)', borderRight: '0.5px solid rgba(0,0,0,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 24,
                lineHeight: '34px',
                fontWeight: 400,
                color: 'rgba(0,0,0,0.9)',
                flex: 1,
                letterSpacing: 0.24,
              }}
            >
              Featured Playbooks
            </h2>
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'rgba(0,0,0,0.5)',
                cursor: 'pointer',
                letterSpacing: 0.14,
              }}
            >
              View All
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PLAYBOOKS.map((p) => {
              return (
                <div
                  key={p.id}
                  className="cursor-pointer transition-shadow hover:shadow-l"
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'var(--b0-page, #fff)',
                    border: '0.5px solid rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Cover placeholder (matches Explore) */}
                  <div
                    style={{
                      margin: '4px 4px 0 4px',
                      width: 'calc(100% - 8px)',
                      aspectRatio: '472 / 265.5',
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
                      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
                      backgroundSize: '3px 3px',
                    }}
                  />

                  {/* Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 12px' }}>
                    {/* Title + description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p
                        style={{
                          fontSize: 16,
                          lineHeight: '26px',
                          fontWeight: 400,
                          color: 'var(--text-n9, rgba(0,0,0,0.9))',
                          letterSpacing: 0.16,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {p.title}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          lineHeight: '20px',
                          color: 'var(--text-n5, rgba(0,0,0,0.5))',
                          letterSpacing: 0.12,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>

                    {/* Creator + stats */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* Creator */}
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
                        <Avatar name={p.creator} size={22} />
                        <span
                          style={{
                            fontSize: 14,
                            lineHeight: '22px',
                            color: 'var(--text-n9, rgba(0,0,0,0.9))',
                            letterSpacing: 0.14,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.creator}
                        </span>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
                          <CdnIcon name="star-l" size={16} />
                          {p.stars}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
                          <CdnIcon name="remix-l" size={16} />
                          {p.remixes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>{/* end inner bordered container */}
        </section>
      </div>
    </AppShell>
  );
}
