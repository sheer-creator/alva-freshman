/**
 * [INPUT]: ticker symbol + size
 * [OUTPUT]: 真实标的 logo —— 优先用 Alva CDN 的设计同款 logo（icons/logo-stock-{t}.svg），
 *           其次股票走 financialmodelingprep、加密走 coincap，最后回落字母 Avatar
 * [POS]: Component — push 卡 trade 行 / watchlist builder / 任何需要标的 logo 的位置
 */

import { useState } from 'react';
import { Avatar } from './Avatar';

const CRYPTO_TICKERS = new Set([
  'BTC', 'ETH', 'SOL', 'PEPE', 'ARB', 'OP', 'AVAX', 'BNB', 'USDT', 'USDC', 'XRP', 'DOGE',
]);
// 已知是 ETF / index 等无公司 logo 的标的，直接走字母回落不发请求
const SKIP_LOGO = new Set([
  'SPX', 'R2K', 'AGG', 'VIX', 'EFA', 'EEM',
  'DXY', 'CL', 'HYG', 'LQD', 'GDX', 'NOBL', 'FXI', 'KWEB', '2330.TW',
]);
// Alva CDN 上的设计同款 logo（icons/logo-stock-{lower}.svg）—— 与 Figma 像素一致，优先使用
const CDN_LOGO_BASE = 'https://alva-ai-static.b-cdn.net/icons/logo-stock';
const CDN_LOGOS = new Set([
  'A', 'AAPL', 'ABT', 'AI', 'AMD', 'AMZN', 'COIN', 'GOOGL', 'HOOD', 'IBM', 'IWM', 'MA',
  'META', 'MU', 'NFLX', 'NTAP', 'NVDA', 'OPEN', 'PSTG', 'QQQ', 'RKLB', 'SNDK', 'SPY',
  'STX', 'TMUS', 'TSLA', 'TSM', 'UBER', 'UNH', 'WDC', 'WMT',
]);

export function TickerLogo({ ticker, size = 20 }: { ticker: string; size?: number }) {
  const [errored, setErrored] = useState(false);
  const key = ticker.toUpperCase();
  let src: string | null = null;
  if (!errored) {
    if (CDN_LOGOS.has(key)) {
      src = `${CDN_LOGO_BASE}-${key.toLowerCase()}.svg`;
    } else if (CRYPTO_TICKERS.has(key)) {
      src = `https://assets.coincap.io/assets/icons/${key.toLowerCase()}@2x.png`;
    } else if (!SKIP_LOGO.has(key)) {
      src = `https://financialmodelingprep.com/image-stock/${key}.png`;
    }
  }
  if (src) {
    return (
      <img
        src={src}
        alt={ticker}
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, background: '#fff' }}
        onError={() => setErrored(true)}
      />
    );
  }
  // 回落：字母 Avatar（保持与原 trade 行一致的视觉）
  return <Avatar name={ticker} size={size} />;
}
