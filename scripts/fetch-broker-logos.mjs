/**
 * 抓取 Connect 弹窗的 broker logo 到 public/logo-broker-fav-*.png
 * 用法：node scripts/fetch-broker-logos.mjs
 * 源：Google favicon 服务（64px）；CommSec/TIAA 用 Wikipedia 官方 logo。
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const fav = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const SOURCES = {
  etoro: fav('etoro.com'),
  kraken: fav('kraken.com'),
  ajbell: fav('ajbell.co.uk'),
  bux: fav('getbux.com'),
  chase: fav('chase.com'),
  commsec: 'https://upload.wikimedia.org/wikipedia/en/2/2e/CommSecLogo.png',
  degiro: fav('degiro.nl'),
  etrade: fav('etrade.com'),
  empower: fav('empower.com'),
  fidelity: fav('fidelity.com'),
  moomoo: fav('moomoo.com'),
  pnc: fav('pnc.com'),
  public: fav('public.com'),
  questrade: fav('questrade.com'),
  schwab: fav('schwab.com'),
  stake: fav('hellostake.com'),
  tastytrade: fav('tastytrade.com'),
  td: fav('td.com'),
  tiaa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/TIAA_logo_%282016%29.svg/250px-TIAA_logo_%282016%29.svg.png',
  trading212: fav('trading212.com'),
  transamerica: fav('transamerica.com'),
  usbank: fav('usbank.com'),
  upstox: fav('upstox.com'),
  vanguard: fav('vanguard.com'),
  wealthsimple: fav('wealthsimple.com'),
  webull: fav('webull.com'),
  wellsfargo: fav('wellsfargo.com'),
  zerodha: fav('zerodha.com'),
};

await mkdir(PUB, { recursive: true });
let ok = 0, fail = 0;
for (const [id, url] of Object.entries(SOURCES)) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (logo-fetch script)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // PNG/ICO magic 校验
    const isPng = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (!isPng || buf.length < 100) throw new Error(`not a valid PNG (${buf.length}B)`);
    await writeFile(join(PUB, `logo-broker-fav-${id}.png`), buf);
    console.log(`✓ ${id} (${buf.length}B)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${id}: ${e.message}`);
    fail++;
  }
}
console.log(`\n${ok} ok, ${fail} failed`);
