/**
 * [INPUT]: ticker symbol + size
 * [OUTPUT]: 真实标的 logo —— 股票走 financialmodelingprep，加密走 coincap，
 *           失败回落到字母 Avatar（与卡片其它位置一致）
 * [POS]: Component — push 卡 trade 行 / 任何需要标的 logo 的位置
 */

import { useState } from 'react';
import { Avatar } from './Avatar';

const CRYPTO_TICKERS = new Set([
  'BTC', 'ETH', 'SOL', 'PEPE', 'ARB', 'OP', 'AVAX', 'BNB', 'USDT', 'USDC', 'XRP', 'DOGE',
]);
// 已知是 ETF / index 等无公司 logo 的标的，直接走字母回落不发请求
const SKIP_LOGO = new Set([
  'SPX', 'SPY', 'QQQ', 'R2K', 'IWM', 'AGG', 'TLT', 'VIX', 'EFA', 'EEM',
  'DXY', 'CL', 'HYG', 'LQD', 'GLD', 'GDX', 'NOBL', 'FXI', 'KWEB', '2330.TW',
]);

export function TickerLogo({ ticker, size = 20 }: { ticker: string; size?: number }) {
  const [errored, setErrored] = useState(false);
  let src: string | null = null;
  if (!errored && !SKIP_LOGO.has(ticker)) {
    if (CRYPTO_TICKERS.has(ticker)) {
      src = `https://assets.coincap.io/assets/icons/${ticker.toLowerCase()}@2x.png`;
    } else {
      src = `https://financialmodelingprep.com/image-stock/${ticker}.png`;
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
