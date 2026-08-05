/**
 * [INPUT]: 方案画布 public/demo/preset-setup/index.html · 1b「Plan B · Watching Loop」
 *          + 视觉动效评审修订版 ~/Downloads/watching-loop-review.html(18 条)
 * [OUTPUT]: onboard「Watch your portfolio 24/7」的第一步 —— 14s 循环回放昨天的巡检:
 *           rail 随巡检生长,3 条安静行与 2 条 ping(RKLB / NVDA)交错入场,末行 Watching 光标呼吸
 * [POS]: AgentNewSession portfoliobuilder 响应。卡壳 / footer 沿用 ScreenerSetupCard(底图不复用,纯白)。
 *        评审 11/12/13/17 条属下半区选择区,不在这一步:选标的由第二步 PortfolioBuilder 承接
 */

import { TickerLogo } from '@/app/components/shared/TickerLogo';

/* 评审第 5 条:字号收敛到 DS ramp 三档 —— micro 10/16、caption 12/20、body 14/22(仅 ticker 名)。
   第 3 条:m1 收窄为一条主线(rail 节点 / Watching 光标 / CTA),内容色只留涨跌 m3/m4;ping 时间戳走 n9 加粗。
   第 1 条:ping 卡靠形态而非颜色表达"这是一次 ping" —— .5px l2 边 + shadow-xs,青光晕去掉。
   时间列刻意用真 mono 栈:Baby 的 --font-mono 被定义成 Delight(非等宽),直接 var() 会丢掉时间戳的等宽特征。 */
const SCOPED_CSS = `
.pwl-tl{position:relative;display:flex;flex-direction:column}
/* rail 画在容器上(不随行淡出),按 scaleY 从上往下生长——"线扫到哪"就是"巡检到哪",
   线还没到的地方本来就该没有内容,空白期因此既不空也不留悬空的线(评审 15/16 条)。
   left = 时间列 64 + gap 12 + rail 宽 9 的一半 */
.pwl-tl::before{content:'';position:absolute;left:80.5px;top:15px;bottom:15px;width:1px;
  transform-origin:top;transform:translateX(-50%) scaleY(0);
  background:var(--line-l07, rgba(0,0,0,0.07))}
.pwl-row{display:flex;align-items:center;gap:12px;padding:5px 0}
.pwl-time{width:64px;flex:none;white-space:nowrap;
  font:400 12px/20px ui-monospace,SFMono-Regular,'SF Mono',Menlo,monospace;
  color:var(--text-n5, rgba(0,0,0,0.5))}
.pwl-rail{position:relative;width:9px;flex:none;align-self:stretch}
.pwl-dot{position:absolute;left:50%;top:50%;width:5px;height:5px;border-radius:50%;
  transform:translate(-50%,-50%);background:var(--line-l2, rgba(0,0,0,0.2))}
.pwl-text{font:400 12px/20px var(--font-sans, 'Delight', sans-serif);letter-spacing:.12px;
  color:var(--text-n7, rgba(0,0,0,0.7))}

/* ping 行 —— 时间戳与卡内 ticker 行对齐:12px 卡内 padding + 22px 行高的一半 = 23px。
   时间戳本身升到 body 档 14/22 + n9 + 500:安静行的 12px n5 是流水,这一刻是"有事发生"。
   不用 font: 简写覆盖,否则会把 .pwl-time 的 mono 栈重置掉;
   14px mono 下 64px 列宽可容 7 字符("9:47 AM"),换 8 字符的时间要同步放宽列与 rail 的 left */
.pwl-arow{align-items:stretch}
.pwl-arow .pwl-time{padding-top:12px;font-size:14px;line-height:22px;font-weight:500;
  color:var(--text-n9, rgba(0,0,0,0.9))}
.pwl-arow .pwl-dot{top:23px;width:9px;height:9px;background:var(--main-m1, #49a3a6);
  box-shadow:0 0 0 2.5px #fff,0 0 0 3.5px rgba(73,163,166,.28)}
.pwl-alert{flex:1;min-width:0;padding:12px 14px;background:#fff;
  border:0.5px solid var(--line-l2, rgba(0,0,0,0.2));border-radius:var(--radius-ct-l, 8px);
  box-shadow:var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05))}
.pwl-ahead{display:flex;align-items:center;gap:7px;margin-bottom:3px}
.pwl-tk{font:500 14px/22px var(--font-sans, 'Delight', sans-serif);letter-spacing:.14px;
  color:var(--text-n9, rgba(0,0,0,0.9))}
.pwl-pct{flex:none;padding:0 6px;border-radius:var(--radius-ct-s, 4px);
  font:500 10px/18px var(--font-sans, 'Delight', sans-serif);
  background:var(--main-m4-10, rgba(224,83,87,0.1));color:var(--main-m4, #e05357)}
.pwl-pct.up{background:var(--main-m3-10, rgba(42,155,125,0.1));color:var(--main-m3, #2a9b7d)}
.pwl-abody{font:400 12px/20px var(--font-sans, 'Delight', sans-serif);letter-spacing:.12px;
  color:var(--text-n7, rgba(0,0,0,0.7))}
/* "接下来看什么"单独成行 —— 长正文里最后一句本来就是行动指引,拆出来靠分隔线分区。
   引导词保留原文的"Next,":箭头图标不如这个词好读,且不额外引入品牌色(评审第 3 条) */
.pwl-next{margin-top:8px;padding-top:7px;
  border-top:0.5px solid var(--line-l07, rgba(0,0,0,0.07));
  font:400 12px/20px var(--font-sans, 'Delight', sans-serif);letter-spacing:.12px;
  color:var(--text-n7, rgba(0,0,0,0.7))}

.pwl-lrow .pwl-dot{background:var(--main-m1, #49a3a6)}
.pwl-watching{display:inline-flex;align-items:center;
  font:400 12px/20px var(--font-sans, 'Delight', sans-serif);color:var(--text-n5, rgba(0,0,0,0.5))}
.pwl-caret{width:6px;height:12px;margin-left:4px;flex:none;background:var(--main-m1, #49a3a6)}

/* 14s 主时间轴 —— 分三段:0–48% 六行依次入场(间隔 0.64–1.28s,刻意收窄差距,
   否则"蹦一下→干等 4s→再蹦一下"会读成卡顿)、48–85% 全内容静止供阅读、85–100% 反序卷起。
   阅读时间集中在内容出齐之后而不是插在每条 ping 后面:碎片化的空档只会让画面看着停滞,
   出齐后再停留才是能从头读的完整一屏(评审 6/8 条的同一原则) */
/* 行容器只管 opacity。transform 一旦挂在行上,rail 节点作为子元素会跟着整行位移——
   ping 行的 scale(.985) 以行中心为原点,dot 距中心横向 ~270px,缩放后横向偏 ~4px,
   在一条竖直 rail 上格外刺眼,读作"点从旁边滑到轴上"。
   时间刻度与轴上节点是结构,原地淡入;位移只给内容(文案 / ping 卡) */
@keyframes pwl-b1{
  0%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  3%,97.5%{opacity:.5;animation-timing-function:cubic-bezier(.4,0,1,1)}
  100%{opacity:0}}
@keyframes pwl-b2{
  0%,7%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  10%,95%{opacity:.62;animation-timing-function:cubic-bezier(.4,0,1,1)}
  97.5%,100%{opacity:0}}
@keyframes pwl-b3{
  0%,14%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  18%,92.5%{opacity:1;animation-timing-function:cubic-bezier(.4,0,1,1)}
  95%,100%{opacity:0}}
@keyframes pwl-b4{
  0%,26%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  29%,90%{opacity:.75;animation-timing-function:cubic-bezier(.4,0,1,1)}
  92.5%,100%{opacity:0}}
@keyframes pwl-b5{
  0%,34%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  38%,87.5%{opacity:1;animation-timing-function:cubic-bezier(.4,0,1,1)}
  90%,100%{opacity:0}}
@keyframes pwl-b6{
  0%,45%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  48%,85%{opacity:1;animation-timing-function:cubic-bezier(.4,0,1,1)}
  87.5%,100%{opacity:0}}
/* 内容位移 —— 与各行 opacity 同窗口;安静行文案上移 6px,ping 卡带一点 scale 弹入 */
@keyframes pwl-in1{
  0%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  3%,100%{transform:none}}
@keyframes pwl-in2{
  0%,7%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  10%,100%{transform:none}}
@keyframes pwl-in3{
  0%,14%{transform:translateY(10px) scale(.985);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  18%,100%{transform:none}}
@keyframes pwl-in4{
  0%,26%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  29%,100%{transform:none}}
@keyframes pwl-in5{
  0%,34%{transform:translateY(10px) scale(.985);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  38%,100%{transform:none}}
/* ping 的 rail 节点比卡片先到满不透明——卡是从节点长出来的 */
@keyframes pwl-dot3{0%,14%{opacity:0}16%,92.5%{opacity:1}95%,100%{opacity:0}}
@keyframes pwl-dot5{0%,34%{opacity:0}36%,87.5%{opacity:1}90%,100%{opacity:0}}
@keyframes pwl-rail{
  0%{transform:translateX(-50%) scaleY(0);opacity:1}
  48%,85%{transform:translateX(-50%) scaleY(1);opacity:1}
  92%,100%{transform:translateX(-50%) scaleY(1);opacity:0}}
@keyframes pwl-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
.pwl-tl::before{animation:pwl-rail 14s linear infinite}
/* 基础 opacity 同时写进 CSS:动态下由 keyframes 接管,reduced-motion 下仍保留"越早越淡"的纵深 */
.pwl-b1{opacity:.5;animation:pwl-b1 14s linear infinite}
.pwl-b1 .pwl-text{animation:pwl-in1 14s linear infinite}
.pwl-b2{opacity:.62;animation:pwl-b2 14s linear infinite}
.pwl-b2 .pwl-text{animation:pwl-in2 14s linear infinite}
.pwl-b3{animation:pwl-b3 14s linear infinite}
.pwl-b3 .pwl-alert{animation:pwl-in3 14s linear infinite}
.pwl-b3 .pwl-dot{animation:pwl-dot3 14s linear infinite}
.pwl-b4{opacity:.75;animation:pwl-b4 14s linear infinite}
.pwl-b4 .pwl-text{animation:pwl-in4 14s linear infinite}
.pwl-b5{animation:pwl-b5 14s linear infinite}
.pwl-b5 .pwl-alert{animation:pwl-in5 14s linear infinite}
.pwl-b5 .pwl-dot{animation:pwl-dot5 14s linear infinite}
.pwl-b6{animation:pwl-b6 14s linear infinite}
.pwl-caret{animation:pwl-blink 1s step-end infinite}
.pwl-start{transition:filter .14s ease}
.pwl-start:hover{filter:brightness(0.95)}

/* 等价的静态设计而非退化版:rail 强制终态,三条安静行的 .5/.62/.75 已写进 CSS */
@media(prefers-reduced-motion:reduce){
  .pwl-card *{animation:none!important;transition:none!important}
  .pwl-tl::before{animation:none!important;transform:translateX(-50%) scaleY(1)!important}
}
`;

/* 安静行 —— 句长递减配合 opacity 递增,只有首条带"Checked"全称(评审第 14 条) */
const QUIET_ROWS: Record<string, { time: string; text: string }> = {
  'pwl-b1': { time: '8:00 AM', text: 'Checked 33 headlines, 5 earnings, 15 analyst revisions, 232 X posts — nothing worth pinging' },
  'pwl-b2': { time: '9:00 AM', text: '198 headlines, options flow normal — quiet' },
  'pwl-b4': { time: '1:00 PM', text: '176 headlines, 9 analyst revisions — quiet' },
};

/* 两条 ping —— 正文为实际推送内容,末句的"接下来看什么"拆到 next 行(不改词,只分行)。
   不标信源:原始推送文本里没有任何署名,Alva 的推送也不走媒体署名(AutomationCard 的 source 是
   产生推送的 automation 名,多信源的既定表达是 evidence 数组) */
interface Ping {
  cls: string;
  time: string;
  ticker: string;
  pct: string;
  up?: boolean;
  body: string;
  next: string;
}

const PINGS: Ping[] = [
  {
    cls: 'pwl-b3',
    time: '9:47 AM',
    ticker: 'RKLB',
    pct: '+7%',
    up: true,
    body: 'Rocket Lab is up about 7% on reports of a $266M U.S. Air Force launch contract, outperforming the peer median by 5.6 percentage points. The award strengthens the defense thesis for your 8.2% holding.',
    next: 'Next, watch for task-order awards, contract economics, and the Aug. 10 earnings update.',
  },
  {
    cls: 'pwl-b5',
    time: '4:38 PM',
    ticker: 'NVDA',
    pct: '+1.46%',
    up: true,
    body: 'Musk says SpaceX will use Nvidia GPUs exclusively and scale compute from over 2GW this year to near 10GW next year, roughly matching OpenAI’s 10GW Nvidia deployment and exceeding its 6GW AMD deal. NVDA is up 1.46% after hours to $215.04 and 9.15% over five sessions, clearing its $214.39 20-day high. This strengthens the thesis for your 2.5% holding.',
    next: 'Next, watch $214 support, $232 resistance, and actual GPU allocations.',
  },
];

/* 安静行 —— 时间列 + rail 节点 + 单行文案 */
function QuietRow({ cls }: { cls: string }) {
  const row = QUIET_ROWS[cls];
  return (
    <div className={`pwl-row ${cls}`}>
      <span className="pwl-time">{row.time}</span>
      <span className="pwl-rail"><i className="pwl-dot" /></span>
      <span className="pwl-text">{row.text}</span>
    </div>
  );
}

/* ping 行 —— header(logo + ticker + 涨跌 + 来源) + 正文 + "接下来看什么" */
function PingRow({ ping }: { ping: Ping }) {
  return (
    <div className={`pwl-row pwl-arow ${ping.cls}`}>
      <span className="pwl-time">{ping.time}</span>
      <span className="pwl-rail"><i className="pwl-dot" /></span>
      <div className="pwl-alert">
        <div className="pwl-ahead">
          <TickerLogo ticker={ping.ticker} size={18} />
          <span className="pwl-tk">{ping.ticker}</span>
          <span className={`pwl-pct${ping.up ? ' up' : ''}`}>{ping.pct}</span>
        </div>
        <p className="pwl-abody">{ping.body}</p>
        <p className="pwl-next">{ping.next}</p>
      </div>
    </div>
  );
}

export function PortfolioWatchLoopCard({ onSetup }: { onSetup?: () => void }) {
  return (
    <div className="pwl-card w-full overflow-hidden rounded-[8px] bg-white" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
      <style>{SCOPED_CSS}</style>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          {/* 回放区 —— 稿的标题行与 8S LOOP 角标已去掉;底图不复用,"观测面板"的质感交给 rail */}
          <div className="px-[32px] pt-[28px] pb-[20px]">
            <div className="pwl-tl">
              <QuietRow cls="pwl-b1" />
              <QuietRow cls="pwl-b2" />
              <PingRow ping={PINGS[0]} />
              <QuietRow cls="pwl-b4" />
              <PingRow ping={PINGS[1]} />

              {/* 当前状态行 —— 光标独立呼吸(1s),不跟主时间轴同步 */}
              <div className="pwl-row pwl-lrow pwl-b6">
                <span className="pwl-time">5:00 PM</span>
                <span className="pwl-rail"><i className="pwl-dot" /></span>
                <span className="pwl-watching">
                  Watching
                  <i aria-hidden="true" className="pwl-caret" />
                </span>
              </div>
            </div>
          </div>

          {/* footer —— screener 规格:p16 + 上边线 + 右对齐主按钮。按钮进入第二步配置,不直接建 automation */}
          <div
            className="flex items-center justify-end gap-[20px] bg-white p-[16px]"
            style={{ borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))' }}
          >
            <button
              type="button"
              onClick={() => onSetup?.()}
              className="pwl-start flex h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-none px-[20px] py-[9px]"
              style={{
                font: "500 14px/22px var(--font-sans, 'Delight', sans-serif)",
                letterSpacing: '0.14px',
                color: '#fff',
                background: 'var(--main-m1, #49a3a6)',
              }}
            >
              Setup the Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
