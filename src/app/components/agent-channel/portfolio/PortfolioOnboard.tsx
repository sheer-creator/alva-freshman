/**
 * [INPUT]: portfolio 数据、kol/EntityPicker（复用）、portfolio/ConnectAccountModal（复用，Broker 路径）、ChannelIcon
 * [OUTPUT]: PortfolioOnboard — 双路径 onboarding widget（手选优先 + Broker 折叠次级 + 多 automation 勾选）
 * [POS]: agent-channel/portfolio — Concept P 的接入器
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import { ConnectAccountModal } from '@/app/components/portfolio/ConnectAccountModal';
import {
  PORTFOLIO_AUTOMATIONS, PORTFOLIO_DELIVER, PORTFOLIO_TICKERS, PORTFOLIO_UNIVERSES, brokerHoldings, makeHolding,
} from '@/data/agent-channel/portfolio';
import type { EntityPack } from '@/data/agent-channel/artifacts';
import type { PortfolioAuto, PortfolioHolding } from '@/data/agent-channel/types';
import { ChannelIcon } from '../ChannelIcon';
import { EntityPicker, applyPack } from '../kol/EntityPicker';
import type { PickableEntity, PickedMap } from '../kol/EntityPicker';

interface PortfolioOnboardProps {
  onSetup: (tickers: string[], autos: PortfolioAuto[], hasBroker: boolean, holdings: PortfolioHolding[]) => void;
}

export function PortfolioOnboard({ onSetup }: PortfolioOnboardProps) {
  const [recs, setRecs] = useState<PickableEntity[]>(PORTFOLIO_TICKERS);
  const [picked, setPicked] = useState<PickedMap>({});
  const [autosOn, setAutosOn] = useState<Record<string, boolean>>(() => Object.fromEntries(PORTFOLIO_AUTOMATIONS.map((a) => [a.id, a.defaultOn])));
  const [connectOpen, setConnectOpen] = useState(false);
  const [connectedBroker, setConnectedBroker] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const tickers = Object.keys(picked).filter((h) => picked[h]);
  const selectedAutos = PORTFOLIO_AUTOMATIONS.filter((a) => autosOn[a.id]);

  const toggle = (h: string) => setPicked((p) => ({ ...p, [h]: !p[h] }));
  const addCustom = (v: string) => {
    setRecs((r) => (r.some((k) => k.handle === v) ? r : [...r, { name: v, handle: v, focus: 'Added by you' }]));
    setPicked((p) => ({ ...p, [v]: true }));
  };
  const onPack = (pk: EntityPack) => applyPack(pk, picked, setRecs, setPicked);

  const onConnected = (brokerId: string) => {
    const h = brokerHoldings(brokerId);
    setConnectedBroker(brokerId);
    // 导入持仓置顶并选中，与已有手选去重
    setRecs((r) => [
      ...h.map((x) => ({ name: x.name ?? x.symbol, handle: x.symbol, focus: `${x.weight}% · imported` })),
      ...r.filter((k) => !h.some((x) => x.symbol === k.handle)),
    ]);
    setPicked((p) => { const n = { ...p }; h.forEach((x) => { n[x.symbol] = true; }); return n; });
    setConnectOpen(false);
  };

  if (done) {
    return (
      <div className="kol-onboard">
        <div className="ko-h">
          <div>
            <div className="ko-t">Portfolio Watch is live</div>
            <div className="ko-s">{selectedAutos.map((a) => a.name).join(', ')} — running on {tickers.length} {tickers.length === 1 ? 'ticker' : 'tickers'}. Manage them under Alerts any time.</div>
          </div>
          <span className="ko-count">{tickers.length} tickers</span>
        </div>
        <button className="ko-cta done"><ChannelIcon name="check" size={15} />Live — {tickers.length} tickers · {selectedAutos.length} alerts</button>
      </div>
    );
  }

  return (
    <div className="kol-onboard">
      <div className="ko-h">
        <div>
          <div className="ko-t">Build your Portfolio Watch</div>
          <div className="ko-s">Pick what Alva should watch — start from a universe, add tickers, or import your real holdings.</div>
        </div>
        <span className="ko-count">{tickers.length} tickers</span>
      </div>

      {/* 手选优先：universe 批量 + 个股 + 自定义 */}
      <EntityPicker
        recs={recs}
        picked={picked}
        onToggle={toggle}
        onAdd={addCustom}
        packs={PORTFOLIO_UNIVERSES}
        onPack={onPack}
        placeholder="Add any ticker — e.g. PLTR, COIN, 7203.T"
        onLabel="Watching"
        offLabel="Watch"
      />

      {/* Broker 折叠次级路径 */}
      <button className={`pf-broker${connectedBroker ? ' on' : ''}`} onClick={() => setConnectOpen(true)}>
        <span className="pf-broker-ico"><ChannelIcon name="portfolio" size={16} /></span>
        <span className="pf-broker-tx">
          <b>{connectedBroker ? 'Brokerage connected' : 'Connect your brokerage'}</b>
          <span>{connectedBroker ? 'Holdings imported with weights & live P&L' : 'Import real holdings — weights, cost basis & live P&L'}</span>
        </span>
        {connectedBroker ? <span className="pf-broker-badge"><ChannelIcon name="check" size={13} />Connected</span> : <ChannelIcon name="chevdown" size={16} />}
      </button>

      {/* 多 automation 并行：勾选组 */}
      <div className="pf-label">What Alva will run</div>
      <div className="pf-autos">
        {PORTFOLIO_AUTOMATIONS.map((a) => (
          <button key={a.id} role="switch" aria-checked={autosOn[a.id]} className={`pf-auto${autosOn[a.id] ? ' on' : ''}`} onClick={() => setAutosOn((s) => ({ ...s, [a.id]: !s[a.id] }))}>
            <span className="pf-auto-ico"><ChannelIcon name={a.icon} size={15} /></span>
            <span className="pf-auto-tx">
              <span className="pf-auto-n">{a.name}</span>
              <span className="pf-auto-d">{a.desc}</span>
            </span>
            <span className="pf-auto-cad">{a.cadence}</span>
            <span className="pf-switch"><span className="pf-knob" /></span>
          </button>
        ))}
      </div>

      <div className="am-base">
        <label className="am-sel">
          <span className="am-sel-k">Deliver to</span>
          <select defaultValue={PORTFOLIO_DELIVER[0]}>
            {PORTFOLIO_DELIVER.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <button
        className="ko-cta"
        disabled={!tickers.length || !selectedAutos.length}
        onClick={() => {
          // 连了 broker → 用导入持仓（带权重/盈亏）；否则手选标的合成无权重行
          const holdings = connectedBroker ? brokerHoldings(connectedBroker) : tickers.map((t) => makeHolding(t));
          onSetup(tickers, selectedAutos, !!connectedBroker, holdings);
          setDone(true);
        }}
      >
        Set up my Portfolio Watch — {tickers.length} {tickers.length === 1 ? 'ticker' : 'tickers'} · {selectedAutos.length} {selectedAutos.length === 1 ? 'alert' : 'alerts'}
        <ChannelIcon name="arrowup" size={15} />
      </button>

      <ConnectAccountModal open={connectOpen} onClose={() => setConnectOpen(false)} onConnected={onConnected} />
    </div>
  );
}
