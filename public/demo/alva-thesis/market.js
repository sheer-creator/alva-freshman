// Historical provider OHLCV only. No generated prices or inferred missing bars.
export function validBars(bars) {
  return Array.isArray(bars) && bars.length > 1 && bars.every((bar, i) =>
    /^\d{4}-\d{2}-\d{2}$/.test(bar.time) && (!i || bars[i - 1].time < bar.time) &&
    ['open', 'high', 'low', 'close', 'volume'].every(key => Number.isFinite(bar[key])) &&
    bar.low > 0 && bar.volume >= 0 && bar.low <= Math.min(bar.open, bar.close) && bar.high >= Math.max(bar.open, bar.close));
}
export function windowBars(bars, months) {
  const end = new Date(bars.at(-1).time + 'T00:00:00Z');
  end.setUTCMonth(end.getUTCMonth() - months);
  return bars.filter(bar => bar.time >= end.toISOString().slice(0, 10));
}
let snapshotPromise;
const loadSnapshot = () => snapshotPromise ||= fetch(new URL('./market-snapshot.json', import.meta.url)).then(response => {
  if (!response.ok) throw new Error('Snapshot unavailable');
  return response.json();
}).catch(error => { snapshotPromise = null; throw error; });
const ranges = new Map();
const price = value => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function mountMarket(root, ticker) {
  let disposed = false, chart, observer;
  const host = root.querySelector('.market-canvas');
  const status = root.querySelector('.market-status');
  loadSnapshot().then(snapshot => {
    if (disposed) return;
    const series = snapshot.series[ticker];
    if (!series || !validBars(series.bars)) throw new Error('Invalid OHLCV');
    const bars = series.bars, last = bars.at(-1), previous = bars.at(-2);
    const change = last.close - previous.close;
    root.querySelector('.market-price').textContent = '$' + price(last.close);
    const changeNode = root.querySelector('.market-change');
    changeNode.textContent = `${change >= 0 ? '+' : ''}${price(change)} (${(change / previous.close * 100).toFixed(2)}%)`;
    changeNode.classList.add(change >= 0 ? 'up' : 'down');
    root.querySelector('.market-date').textContent = new Date(last.time + 'T00:00:00Z').toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}) + ' close';
    status.hidden = true;
    root.querySelector('.market-date').title = series.rejected.length ? `${series.rejected.length} invalid daily bar omitted from the historical series` : '';
    const table = root.querySelector('tbody');
    table.innerHTML = bars.slice(-5).reverse().map(bar => `<tr><td>${bar.time}</td><td>${price(bar.open)}</td><td>${price(bar.high)}</td><td>${price(bar.low)}</td><td>${price(bar.close)}</td></tr>`).join('');
    const readout = root.querySelector('.market-ohlc');
    const showBar = bar => { readout.textContent = `${bar.time}   O ${price(bar.open)}   H ${price(bar.high)}   L ${price(bar.low)}   C ${price(bar.close)}   Vol ${(bar.volume / 1e6).toFixed(1)}M`; };
    showBar(last);
    const library = window.LightweightCharts;
    if (!library) { host.textContent = 'Chart unavailable. Closing price is shown above.'; return; }
    const css = getComputedStyle(root), color = name => css.getPropertyValue(name).trim();
    chart = library.createChart(host, {
      width: host.clientWidth, height: host.clientHeight,
      layout: { background: { type: 'solid', color: color('--bg0') }, textColor: color('--t3'), fontSize: 10, fontFamily: 'Delight, sans-serif' },
      grid: { vertLines: { visible: false }, horzLines: { color: color('--line') } },
      rightPriceScale: { borderVisible: false, scaleMargins: { top: .08, bottom: .25 } },
      timeScale: { borderVisible: false, timeVisible: false },
      handleScroll: { mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
      handleScale: { mouseWheel: false, pinch: true, axisPressedMouseMove: true },
    });
    const candles = chart.addSeries(library.CandlestickSeries, { upColor: '#48A8A2', downColor: '#D46770', borderVisible: false, wickUpColor: '#48A8A2', wickDownColor: '#D46770', priceLineVisible: false });
    const volume = chart.addSeries(library.HistogramSeries, { priceScaleId: '', priceFormat: { type: 'volume' }, priceLineVisible: false, lastValueVisible: false });
    volume.priceScale().applyOptions({ scaleMargins: { top: .83, bottom: 0 } });
    const selectRange = months => {
      ranges.set(ticker, months);
      const visible = windowBars(bars, months);
      candles.setData(visible);
      volume.setData(visible.map(bar => ({ time: bar.time, value: bar.volume, color: bar.close >= bar.open ? '#48A8A244' : '#D4677044' })));
      chart.timeScale().fitContent();
      root.querySelectorAll('[data-months]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.months) === months)));
      showBar(last);
    };
    root.querySelectorAll('[data-months]').forEach(button => { button.onclick = () => selectRange(Number(button.dataset.months)); });
    chart.subscribeCrosshairMove(event => showBar(bars.find(bar => bar.time === event.time) || last));
    selectRange(ranges.get(ticker) || 3);
    observer = new ResizeObserver(() => { if (!disposed && host.clientWidth) chart.resize(host.clientWidth, host.clientHeight); });
    observer.observe(host);
  }).catch(() => {
    if (disposed) return;
    chart?.remove(); chart = null;
    host.textContent = 'Price history is unavailable.';
    status.hidden = false;
    status.textContent = 'Unable to load the historical snapshot. Reopen this ticker to retry.';
  });
  return () => { disposed = true; observer?.disconnect(); chart?.remove(); };
}
