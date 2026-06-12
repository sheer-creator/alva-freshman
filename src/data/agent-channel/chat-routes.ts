/**
 * [INPUT]: types.ts 的 Reply/TaskType/Tone
 * [OUTPUT]: routeReply() — 把用户输入路由为自然回复（简单问题直接回答，复杂请求派生后台任务）
 * [POS]: agent-channel 数据层 — 会话模拟的应答路由（源自 demo planc 2660-2720 行）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Reply, TaskType, Tone } from './types';

export const short = (t: string) => (t.length > 44 ? t.slice(0, 41).trimEnd() + '…' : t);

/* ========== 直接回答路由 ========== */

const ANSWER_ROUTES: { m: RegExp; paras: string[] }[] = [
  { m: /why did .* trigger|why did these trigger/i, paras: [
      'The rule fired on top-decile capex revisions plus a positive AI-infra read-through.',
      '$ANET — hyperscaler networking orders pulled forward; the +18% guide is the cleanest signal of the three. $VRT — backlog +31% YoY with a raised FY guide. $CRDO — two new AEC design wins ramping in H2.',
      '$ANET and $VRT touch your basket already. $CRDO is adjacent — say the word and I’ll put it on the watchlist.',
    ] },
  { m: /add .+ to my watchlist/i, paras: [
      'Done — $CRDO is on the watchlist. I’ll fold it into the next AI-Capex-Monitor run and flag it if it earns a basket slot.',
    ] },
  { m: /what changed in the latest/i, paras: [
      'Three things since last week: $NVDA reclaimed the top sentiment slot, $TSM slipped on a soft monthly sales print, and the power names ($VRT, $GEV) took over momentum leadership.',
      'Net: basket +18.4% YTD with breadth improving — 9 of 14 names are above their 20-day. The full table is in Files.',
    ] },
  { m: /trim vrt|hold through thursday/i, paras: [
      'Split it. Into Thursday you’re holding a +31% backlog story that’s now priced for a guide-raise — the asymmetry is worse than it was in January.',
      'I’d trim a third here (locks today’s +5.1%), hold the rest through the print, and put a stop at $104 on what’s left. Want me to wire that stop?',
    ] },
  { m: /log it in my book/i, paras: [
      'Logged — trimmed a third of $VRT, stop at $104 on the remainder. Power & grid drops to 6.8% of your book.',
    ] },
  { m: /nvda earnings game plan/i, paras: [
      'Wednesday after the close. Consensus has DC revenue at $39.2B; the whisper is closer to $41B. Your exposure: 4.1% direct, plus roughly 3% through $AVGO and $TSM.',
      'Plan: hold the core, no adds before the print. Above $43B on the guide, the whole basket re-rates. DC growth below +50% YoY is the bear case — about a −3% drag on your book. I’ll push the numbers the second they hit.',
    ] },
  { m: /walk me through (the|my) backtest/i, paras: [
      'Equal-weight MAG7, monthly rebalance, ten years: +24.1% CAGR vs +18.9% for SPX, Sharpe 1.32 vs 0.81.',
      'The edge is rebalancing discipline — monthly resets harvested the dispersion between names. Worst stretch was 2022: −21.4% drawdown, 14 months back to highs. The full report is in Files, and it can go live as a playbook whenever you want.',
    ] },
];

/* ========== 派生任务路由 ========== */

interface TaskSpec { taskType: TaskType; tone: Tone; title: string; sub: string; steps: string[] }

const TASK_ROUTES: { m: RegExp; t: (mm: RegExpExecArray, text: string) => TaskSpec }[] = [
  { m: /yes — run the deep dive/i, t: () => ({ taskType: 'Research', tone: 'blue', title: 'Research: full deep dive', sub: 'Going deeper on your question — sources, data, and a written brief, saved to Files.', steps: ['Scope the question', 'Pull sources and data', 'Draft the brief'] }) },
  { m: /run (.+?) once now/i, t: (mm) => ({ taskType: 'Automation', tone: 'amber', title: `Run once: ${mm[1]}`, sub: 'A one-off pass outside the schedule — the result will push here when it lands.', steps: ['Pull fresh data', 'Apply the rule set', 'Push the result'] }) },
  { m: /tune .*(rule|monitor)|stricter/i, t: () => ({ taskType: 'Automation', tone: 'amber', title: 'Tune: AI-Capex-Monitor', sub: 'Tightening the rule — I’ll backtest the stricter threshold over the last 90 days before redeploying.', steps: ['Raise the revision threshold to top-5%', 'Backtest the stricter rule over 90 days', 'Redeploy the watch'] }) },
  { m: /^tune /i, t: (_mm, text) => ({ taskType: 'Playbook', tone: 'teal', title: `Update: ${short(text.replace(/^tune /i, ''))}`, sub: 'Applying your changes and re-running the basket before the next scheduled refresh.', steps: ['Apply the changes', 'Re-run the basket', 'Update the live view'] }) },
  { m: /stop alert|price alert|alert me|wire .*stop/i, t: () => ({ taskType: 'Automation', tone: 'amber', title: 'Alert: VRT stop at $104', sub: 'Wiring the trigger — once live I’ll watch in the background and push the moment it fires.', steps: ['Set the trigger at $104', 'Wire delivery here + Telegram', 'Activate the watch'] }) },
  { m: /^screen |screener/i, t: (_mm, text) => ({ taskType: 'Automation', tone: 'amber', title: `Screen: ${short(text.replace(/^screen /i, ''))}`, sub: 'Building the screen and wiring the daily refresh — new entrants will push here on every run.', steps: ['Define the factor rules', 'Backfill current matches', 'Schedule the daily scan'] }) },
  { m: /^backtest /i, t: (_mm, text) => ({ taskType: 'Playbook', tone: 'teal', title: `Backtest: ${short(text.replace(/^backtest (a |an |the )?/i, ''))}`, sub: 'Running the strategy over the full window — equity curve, attribution, and drawdowns land in Files.', steps: ['Assemble the universe and rules', 'Run the simulation', 'Write up the results'] }) },
  { m: /turn this into a live playbook/i, t: () => ({ taskType: 'Playbook', tone: 'teal', title: 'Build: MAG7 momentum playbook', sub: 'Promoting the backtest into a live playbook — monthly rebalance wired, results pushed here.', steps: ['Port the rules from the backtest', 'Wire the monthly rebalance', 'Go live'] }) },
  { m: /tracker|^track |^follow /i, t: (_mm, text) => ({ taskType: 'Playbook', tone: 'teal', title: `Build: ${short(text.replace(/^(build|set up|make|create) (a |an |the )?/i, ''))}`, sub: 'Building the tracker — pulling data, drafting the layout, and wiring its refresh.', steps: ['Define scope and inputs', 'Pull data and build the view', 'Wire the refresh schedule'] }) },
  { m: /deep-dive|deep dive|^value |sotp|reverse-dcf|relative multiple/i, t: (_mm, text) => ({ taskType: 'Research', tone: 'blue', title: `Research: ${short(text)}`, sub: 'Gathering filings, peers, and supply-chain data — the brief posts here and saves to Files.', steps: ['Scope the question', 'Pull sources and data', 'Draft the brief'] }) },
  { m: /^what if /i, t: (_mm, text) => ({ taskType: 'Research', tone: 'blue', title: `Scenario: ${short(text.replace(/^what if /i, ''))}`, sub: 'Repricing your book under the scenario — direct exposure, correlated names, and the total drag.', steps: ['Set the shock parameters', 'Reprice the book', 'Post the breakdown'] }) },
];

/* ========== 路由入口 ========== */

export function routeReply(text: string): Reply {
  for (const a of ANSWER_ROUTES) if (a.m.test(text)) return { kind: 'answer', paras: a.paras };
  for (const r of TASK_ROUTES) {
    const mm = r.m.exec(text);
    if (mm) return { kind: 'task', ...r.t(mm, text) };
  }
  if (text.length > 80 || /^(build|create|make|set up|screen|backtest|track|deep-dive|run|scan|turn|tune|find)\b/i.test(text.trim())) {
    return { kind: 'task', taskType: 'Research', tone: 'blue', title: `Research: ${short(text)}`, sub: 'Pulling sources and data — the brief will post here and save to Files.', steps: ['Scope the question', 'Pull sources and data', 'Draft the brief'] };
  }
  return { kind: 'answer', paras: [
    'Quick take: nothing here changes your positioning yet — real signal, but second-order for your basket.',
    'Want the full picture? Say the word and I’ll run a proper deep dive and post the brief here.',
  ] };
}
