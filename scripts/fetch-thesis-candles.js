// Read-only Alva runtime query. Run: alva run --local-file scripts/fetch-thesis-candles.js
(async () => {
  const http = require("net/http");
  const jwt = require("secret-manager").loadPlaintext("ARRAYS_JWT");
  if (!jwt) throw new Error("Missing Arrays access");
  const start = "2026-03-01T00:00:00Z", end = "2026-09-07T00:00:00Z";
  const symbols = ["NVDA","MU","TSLA","AAPL","MSFT","AMZN","GOOGL","META","AMD"];
  const series = {};
  for (const symbol of symbols) {
    const url = "https://data-tools.prd.arrays.org/api/v1/stocks/kline?symbol=" + symbol + "&interval=1d&start_time=" + Date.parse(start)/1000 + "&end_time=" + Date.parse(end)/1000 + "&limit=180";
    const response = await http.fetch(url, {headers:{Authorization:"Bearer " + jwt}});
    if (!response.ok) throw new Error(symbol + " HTTP " + response.status);
    const body = await response.json();
    if (!body.success || !Array.isArray(body.data) || !body.data.length) throw new Error("Missing bars: " + symbol);
    const rejected = [];
    const bars = body.data.map(bar => ({
      time: bar.time_period_start.slice(0,10),
      open: bar.price_open, high: bar.price_high, low: bar.price_low, close: bar.price_close,
      volume: bar.volume_traded
    })).filter(bar => bar.time >= start.slice(0,10) && bar.time < end.slice(0,10)).filter(bar => {
      const valid = [bar.open,bar.high,bar.low,bar.close,bar.volume].every(Number.isFinite) &&
        bar.low>0 && bar.volume>=0 && bar.low<=Math.min(bar.open,bar.close) && bar.high>=Math.max(bar.open,bar.close);
      if (!valid) rejected.push(bar);
      return valid;
    }).sort((a,b) => a.time.localeCompare(b.time));
    if (!bars.length || rejected.length / body.data.length > .2) throw new Error("Insufficient valid bars: " + symbol);
    for (let i=0;i<bars.length;i++) {
      const bar=bars[i];
      if (![bar.open,bar.high,bar.low,bar.close,bar.volume].every(Number.isFinite) ||
          bar.low<=0 || bar.volume<0 || bar.low>Math.min(bar.open,bar.close) ||
          bar.high<Math.max(bar.open,bar.close) || (i && bar.time<=bars[i-1].time)) throw new Error("Invalid OHLCV: " + symbol);
    }
    series[symbol] = {requestId:body.request_id,rejected,bars};
  }
  return {source:"Alva Arrays", endpoint:"/api/v1/stocks/kline", interval:"1d",
    currency:"USD", session:"Regular trading hours", timezone:"America/New_York",
    adjustment:"Provider OHLC; adjustment convention not specified by endpoint",
    fetchedAt:new Date().toISOString(), requestedStart:start, requestedEnd:end, series};
})();
