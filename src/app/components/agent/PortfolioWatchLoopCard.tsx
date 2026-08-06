/**
 * [INPUT]: 方案画布 public/demo/preset-setup/index.html · 1b「Plan B · Watching Loop」
 *          + 视觉动效评审修订版 ~/Downloads/watching-loop-review.html(18 条)
 * [OUTPUT]: onboard「Watch your portfolio 24/7」的第一步 —— 6s 回放昨天的巡检(播一次,停在 Watching):
 *           rail 随巡检生长,3 条安静行与 2 条 ping(RKLB / NVDA)交错入场,末行 Watching 光标持续闪
 * [POS]: AgentNewSession portfoliobuilder 响应。卡壳 / footer 沿用 ScreenerSetupCard(底图不复用,纯白)。
 *        评审 11/12/13/17 条属下半区选择区,不在这一步:选标的由第二步 PortfolioBuilder 承接
 */

import { useState } from 'react';
import { TickerLogo } from '@/app/components/shared/TickerLogo';
import { PortfolioBuilder } from '@/app/components/agent/PortfolioBuilder';

/* 评审第 5 条:字号收敛到 DS ramp 三档 —— micro 10/16、caption 12/20、body 14/22(仅 ticker 名)。
   第 3 条:m1 收窄为一条主线(rail 节点 / Watching 光标 / CTA),内容色只留涨跌 m3/m4;ping 时间戳走 n9 加粗。
   第 1 条:ping 卡靠形态而非颜色表达"这是一次 ping" —— .5px l2 边 + shadow-xs,青光晕去掉。
   时间列走项目既定的等宽字体 JetBrains Mono(index.html 已加载 400/500,chat 侧十余处在用):
   Baby 的 --font-mono 被定义成 Delight(非等宽),直接 var() 会丢掉时间戳的等宽特征。 */
const SCOPED_CSS = `
/* 回放区底 —— 稿 12607:56038:左侧 112.5 白块 + 右侧网格纹理(稿 12707:33146 导出 818×464,
   竖线 32 条间距 31.5 / 横线 15 条间距 30,均 0.5 宽,叠 m1 渐变)。
   112.5 = padding 32 + 时间列 64 + gap 12 + rail 半宽 4.5 —— 分界线就是 rail 本身,
   所以白块不再描右边线,否则与 rail 重合成两条 */
/* 稿 12707:31776:pad [20,32,44,32] —— 底部 44 是给浮在网格上的主按钮留的空间 */
.pwl-stage{position:relative;padding:20px 32px 44px;background:#fff}
.pwl-bg-left{position:absolute;left:0;top:0;bottom:0;width:112.5px;background:#fff}
.pwl-bg-grid{position:absolute;left:112px;top:0;right:0;bottom:0;
  background:url('${import.meta.env.BASE_URL}watch-loop-grid.png') left top / cover no-repeat}
/* rail —— 贯穿整个回放区(不再只连首末节点),同时充当白块与网格区的分界线(评审 15/16 条)。
   两层:track 常驻占位(线未扫到的地方也得有轨道,否则起始帧那一列是空的、读着发虚),
   line 是 l2 进度线,按 scaleY 从顶部往下生长——"线扫到哪"就是"巡检到哪" */
.pwl-rail-track{position:absolute;left:112.5px;top:0;bottom:0;width:0.5px;
  transform:translateX(-50%);
  background:var(--line-l05, rgba(0,0,0,0.05))}
.pwl-rail-line{position:absolute;left:112.5px;top:0;bottom:0;width:0.5px;
  transform-origin:top;transform:translateX(-50%) scaleY(0);
  background:var(--line-l2, rgba(0,0,0,0.2))}
.pwl-tl{position:relative;display:flex;flex-direction:column}
.pwl-row{display:flex;align-items:center;gap:12px;padding:5px 0}
/* 时间戳贴轴右对齐(稿 12707:31776/12736:33430 全部 alignH RIGHT):12/14 两档字宽不同,
   右对齐让所有时间的尾端都落在 rail 旁,左边参差 */
.pwl-time{width:64px;flex:none;white-space:nowrap;text-align:right;
  font:400 12px/20px 'JetBrains Mono','SF Mono','Fira Code',monospace;
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
  border:0.5px solid var(--line-l12, rgba(0,0,0,0.12));border-radius:var(--radius-ct-l, 8px);
  box-shadow:var(--shadow-xs, 0 4px 15px 0 rgba(0,0,0,0.05))}
.pwl-ahead{display:flex;align-items:center;gap:7px;margin-bottom:3px}
.pwl-tk{font:500 14px/22px var(--font-sans, 'Delight', sans-serif);letter-spacing:.14px;
  color:var(--text-n9, rgba(0,0,0,0.9))}
.pwl-pct{flex:none;padding:0 6px;border-radius:var(--radius-ct-s, 4px);
  font:500 10px/18px var(--font-sans, 'Delight', sans-serif);
  background:var(--main-m4-10, rgba(224,83,87,0.1));color:var(--main-m4, #e05357)}
.pwl-pct.up{background:var(--main-m3-10, rgba(42,155,125,0.1));color:var(--main-m3, #2a9b7d)}
/* 持仓权重靠右 —— 这是 Alva 独有的个性化证据("这跟你有多大关系"),
   用中性 micro 档,不与左侧的涨跌幅争视线 */
.pwl-hold{flex:1;min-width:0;text-align:right;
  font:400 10px/16px var(--font-sans, 'Delight', sans-serif);
  color:var(--text-n5, rgba(0,0,0,0.5))}
/* 正文一段到底 —— 稿 12707:31776 把"接下来看什么"合并回正文:
   "Next," 这个词本身就是转折标记,再加分隔线是同一件事说两遍 */
/* 稿:body 固定 3 行(60 = 3×20)+ ENDING 截断,超长省略 */
.pwl-abody{font:400 12px/20px var(--font-sans, 'Delight', sans-serif);letter-spacing:.12px;
  color:var(--text-n7, rgba(0,0,0,0.7));
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}

.pwl-lrow .pwl-dot{background:var(--main-m1, #49a3a6)}
.pwl-watching{display:inline-flex;align-items:center;
  font:400 12px/20px var(--font-sans, 'Delight', sans-serif);color:var(--text-n5, rgba(0,0,0,0.5))}
.pwl-caret{width:6px;height:12px;margin-left:4px;flex:none;background:var(--main-m1, #49a3a6)}
/* 时段省略 —— 9 点到 1 点之间跨了几小时,竖排三点放在时间列里,替缺席的 10/11/12 点时间戳站位。
   垂直取 9:00 与 1:00 两个时间戳的正中:9:00 label 中心=ping 行顶+28(行 pt5+列 pt12+22/2),
   1:00 label 中心=行顶+134(119+pt5+20/2),中点 81 → 距两行分界 -38。
   零占位高,不挤开任何行 —— Timeline 总高 358 与稿保持一致(稿里没有这一行,是应约新加的示意)。
   3px + n5,与安静行时间戳同权重;入场后逐点波浪闪两轮(窗口盖住 1:00 PM 的 54–60% 入场,
   "点在闪=时间在走"),结束后停在常亮 */
.pwl-gap{position:relative;height:0}
.pwl-gap-dots{position:absolute;left:32px;top:-38px;transform:translate(-50%,-50%);
  display:flex;flex-direction:column;align-items:center;gap:3px}
/* 基础 opacity .5 = 闪完的驻留态(比安静行时间戳再弱一档),reduced-motion 下直接以此显示 */
.pwl-gap-dots i{width:3px;height:3px;border-radius:50%;background:var(--text-n5, rgba(0,0,0,0.5));opacity:.5}

/* 行容器只管 opacity。transform 一旦挂在行上,rail 节点作为子元素会跟着整行位移——
   ping 行的 scale(.985) 以行中心为原点,dot 距中心横向 ~270px,缩放后横向偏 ~4px,
   在一条竖直 rail 上格外刺眼,读作"点从旁边滑到轴上"。
   时间刻度与轴上节点是结构,原地淡入;位移只给内容(文案 / ping 卡) */
/* 6s 一次性入场 —— 六行依次出现后停在 Watching 终态,不循环:
   Watching 就是"正在监视"这个状态本身,回到开头重播等于否认它已经在看了。
   行间隔 0.48–1.02s,刻意收窄差距(否则"蹦一下→干等→再蹦一下"会读成卡顿);
   只有光标继续闪 —— 那是持续状态,不是入场动效 */
@keyframes pwl-b1{
  0%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  6%,100%{opacity:.5}}
@keyframes pwl-b2{
  0%,15%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  21%,100%{opacity:.62}}
@keyframes pwl-b3{
  0%,29%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  37%,100%{opacity:1}}
/* 省略三点(9:00→1:00) —— 与 9:00 ping 同步入场(29%),逐点错峰(120ms)波浪闪到 1:00 PM(54–60%)
   入场结束,收在 .5 驻留 */
@keyframes pwl-gd1{0%,29%{opacity:0}32%{opacity:1}36%{opacity:.35}40%{opacity:1}44%{opacity:.35}48%{opacity:1}52%{opacity:.35}56%{opacity:1}60%{opacity:.35}64%{opacity:1}68%,100%{opacity:.5}}
@keyframes pwl-gd2{0%,31%{opacity:0}34%{opacity:1}38%{opacity:.35}42%{opacity:1}46%{opacity:.35}50%{opacity:1}54%{opacity:.35}58%{opacity:1}62%{opacity:.35}66%{opacity:1}70%,100%{opacity:.5}}
@keyframes pwl-gd3{0%,33%{opacity:0}36%{opacity:1}40%{opacity:.35}44%{opacity:1}48%{opacity:.35}52%{opacity:1}56%{opacity:.35}60%{opacity:1}64%{opacity:.35}68%{opacity:1}72%,100%{opacity:.5}}
/* 省略三点(2:00→5:00) —— 与 2:00 ping 同步入场(71%),闪到 5:00 Watching(94–100%)入场,收在 .5 */
@keyframes pwl-gh1{0%,71%{opacity:0}74%{opacity:1}78%{opacity:.35}82%{opacity:1}86%{opacity:.35}90%{opacity:1}94%{opacity:.35}97%{opacity:1}100%{opacity:.5}}
@keyframes pwl-gh2{0%,73%{opacity:0}76%{opacity:1}80%{opacity:.35}84%{opacity:1}88%{opacity:.35}92%{opacity:1}95%{opacity:.35}98%{opacity:1}100%{opacity:.5}}
@keyframes pwl-gh3{0%,75%{opacity:0}78%{opacity:1}82%{opacity:.35}86%{opacity:1}90%{opacity:.35}93%{opacity:1}96%{opacity:.35}99%{opacity:1}100%{opacity:.5}}
@keyframes pwl-b4{
  0%,54%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  60%,100%{opacity:.75}}
@keyframes pwl-b5{
  0%,71%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  79%,100%{opacity:1}}
@keyframes pwl-b6{
  0%,94%{opacity:0;animation-timing-function:cubic-bezier(.22,1,.36,1)}
  100%{opacity:1}}
/* 内容位移 —— 与各行 opacity 同窗口;安静行文案上移 6px,ping 卡带一点 scale 弹入 */
@keyframes pwl-in1{
  0%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  6%,100%{transform:none}}
@keyframes pwl-in2{
  0%,15%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  21%,100%{transform:none}}
@keyframes pwl-in3{
  0%,29%{transform:translateY(10px) scale(.985);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  37%,100%{transform:none}}
@keyframes pwl-in4{
  0%,54%{transform:translateY(6px);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  60%,100%{transform:none}}
@keyframes pwl-in5{
  0%,71%{transform:translateY(10px) scale(.985);animation-timing-function:cubic-bezier(.22,1,.36,1)}
  79%,100%{transform:none}}
/* ping 的 rail 节点比卡片先到满不透明——卡是从节点长出来的 */
@keyframes pwl-dot3{0%,29%{opacity:0}33%,100%{opacity:1}}
@keyframes pwl-dot5{0%,71%{opacity:0}75%,100%{opacity:1}}
@keyframes pwl-rail{
  0%{transform:translateX(-50%) scaleY(0)}
  100%{transform:translateX(-50%) scaleY(1)}}
@keyframes pwl-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
.pwl-rail-line{animation:pwl-rail 6s linear forwards}
/* 基础 opacity 同时写进 CSS:动态下由 keyframes 接管,reduced-motion 下仍保留"越早越淡"的纵深 */
.pwl-b1{opacity:.5;animation:pwl-b1 6s linear forwards}
.pwl-b1 .pwl-text{animation:pwl-in1 6s linear forwards}
.pwl-b2{opacity:.62;animation:pwl-b2 6s linear forwards}
.pwl-b2 .pwl-text{animation:pwl-in2 6s linear forwards}
.pwl-b3{animation:pwl-b3 6s linear forwards}
.pwl-b3 .pwl-alert{animation:pwl-in3 6s linear forwards}
.pwl-b3 .pwl-dot{animation:pwl-dot3 6s linear forwards}
.pwl-gap-dots i:nth-child(1){animation:pwl-gd1 6s linear forwards}
.pwl-gap-dots i:nth-child(2){animation:pwl-gd2 6s linear forwards}
.pwl-gap-dots i:nth-child(3){animation:pwl-gd3 6s linear forwards}
.pwl-gap2 .pwl-gap-dots i:nth-child(1){animation:pwl-gh1 6s linear forwards}
.pwl-gap2 .pwl-gap-dots i:nth-child(2){animation:pwl-gh2 6s linear forwards}
.pwl-gap2 .pwl-gap-dots i:nth-child(3){animation:pwl-gh3 6s linear forwards}
.pwl-b4{opacity:.75;animation:pwl-b4 6s linear forwards}
.pwl-b4 .pwl-text{animation:pwl-in4 6s linear forwards}
.pwl-b5{animation:pwl-b5 6s linear forwards}
.pwl-b5 .pwl-alert{animation:pwl-in5 6s linear forwards}
.pwl-b5 .pwl-dot{animation:pwl-dot5 6s linear forwards}
.pwl-b6{animation:pwl-b6 6s linear forwards}
.pwl-caret{animation:pwl-blink 1s step-end infinite}
/* 主按钮 —— 稿 12727:33204:150×40,ABSOLUTE 贴回放区右下(距右 32 / 距底 20),
   Button/Primary Size=M 40 规格:pad 9/20、radius 6、Medium 14/22 白字 */
.pwl-start{position:absolute;right:32px;bottom:20px;
  display:flex;align-items:center;justify-content:center;
  height:40px;padding:9px 20px;border:none;border-radius:6px;cursor:pointer;
  font:500 14px/22px var(--font-sans, 'Delight', sans-serif);letter-spacing:.14px;
  color:#fff;background:var(--main-m1, #49a3a6);
  white-space:nowrap;transition:filter .12s ease}
.pwl-start:hover{filter:brightness(0.95)}

/* mweb(<sm=640) —— 按稿 12736:33430(361 宽):stage pad [16,16,52,16]、时间列 60、
   白块/rail 几何随之重算(16+60+12+4.5=92.5)、三点中心 30、按钮距右/底各 16。
   安静行不截断 —— 稿里首条安静行换行到 3 行(h70);行高变化只影响 gap 之前的行,
   gap 三点是零高 flow 元素跟着内容走,-38 中点计算(基于 ping 行 119 + 下行 30)仍成立 */
@media(max-width:639px){
  .pwl-stage{padding:16px 16px 52px}
  .pwl-time{width:60px}
  .pwl-bg-left{width:92.5px}
  .pwl-bg-grid{left:92px}
  .pwl-rail-track,.pwl-rail-line{left:92.5px}
  .pwl-gap-dots{left:30px}
  .pwl-hold{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .pwl-start{right:16px;bottom:16px}
}

/* 等价的静态设计而非退化版:rail 强制终态,三条安静行的 .5/.62/.75 已写进 CSS */
@media(prefers-reduced-motion:reduce){
  .pwl-card *{animation:none!important;transition:none!important}
  .pwl-rail-line{transform:translateX(-50%) scaleY(1)!important}
}
`;

/* 安静行 —— 句长递减配合 opacity 递增,只有首条带"Checked"全称(评审第 14 条) */
const QUIET_ROWS: Record<string, { time: string; text: string }> = {
  'pwl-b1': { time: '7:00 AM', text: 'Checked 33 headlines, 5 earnings, 15 analyst revisions, 232 X posts — nothing worth pinging' },
  'pwl-b2': { time: '8:00 AM', text: '198 headlines, options flow normal — quiet' },
  'pwl-b4': { time: '1:00 PM', text: '176 headlines, 9 analyst revisions — quiet' },
};

/* 两条 ping —— 正文即实际推送原文,一段到底(含末句的"接下来看什么",不再拆行)。
   不标信源:原始推送文本里没有任何署名,Alva 的推送也不走媒体署名(AutomationCard 的 source 是
   产生推送的 automation 名,多信源的既定表达是 evidence 数组) */
interface Ping {
  cls: string;
  time: string;
  ticker: string;
  pct: string;
  up?: boolean;
  /** 持仓权重 —— 取自推送正文里的"your X% holding",不是外部估算 */
  holding: string;
  body: string;
}

const PINGS: Ping[] = [
  {
    cls: 'pwl-b3',
    time: '9:00 AM',
    ticker: 'RKLB',
    pct: '+7%',
    up: true,
    holding: '8.2% holding',
    body: 'Rocket Lab is up about 7% on reports of a $266M U.S. Air Force launch contract, outperforming the peer median by 5.6 percentage points. The award strengthens the defense thesis for your 8.2% holding. Next, watch for task-order awards, contract economics, and the Aug. 10 earnings update.',
  },
  {
    cls: 'pwl-b5',
    time: '2:00 PM',
    ticker: 'NVDA',
    pct: '+1.46%',
    up: true,
    holding: '2.5% holding',
    body: 'Musk says SpaceX will use Nvidia GPUs exclusively and scale compute from over 2GW this year to near 10GW next year, roughly matching OpenAI’s 10GW Nvidia deployment and exceeding its 6GW AMD deal. NVDA is up 1.46% after hours to $215.04 and 9.15% over five sessions, clearing its $214.39 20-day high. This strengthens the thesis for your 2.5% holding; watch $214 support, $232 resistance, and actual GPU allocations.',
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
          <span className="pwl-hold">{ping.holding}</span>
        </div>
        <p className="pwl-abody">{ping.body}</p>
      </div>
    </div>
  );
}

/* 两步同卡:replay(回放)→ 点 Setup the Watch 就地换成 config(分步建仓配置),Back 可退回。
   不追加新消息 —— 同一张卡换内容,与 screener 卡换 preset 同理;真正建 automation 在 config 的 Start Watching */
export function PortfolioWatchLoopCard({ onStart, initialBrokerId }: {
  onStart?: (picks: { symbol: string; qty: string }[]) => void;
  initialBrokerId?: string | null;
}) {
  const [step, setStep] = useState<'replay' | 'config'>('replay');

  if (step === 'config') {
    return <PortfolioBuilder initialBrokerId={initialBrokerId} onStart={onStart} onBack={() => setStep('replay')} />;
  }

  return (
    <div className="pwl-card w-full overflow-hidden rounded-[8px] bg-white" style={{ border: '0.5px solid var(--line-l2, rgba(0,0,0,0.2))' }}>
      <style>{SCOPED_CSS}</style>
      <div className="overflow-x-auto">
        {/* sm 以下流式(mweb 不横向滚),sm 起保持 760 底宽 */}
        <div className="sm:min-w-[760px]">
          {/* 回放区 —— 稿的标题行与 8S LOOP 角标已去掉;底走稿 12607:56038 的左白块 + 右网格渐变 */}
          <div className="pwl-stage">
            <div aria-hidden="true" className="pwl-bg-left" />
            <div aria-hidden="true" className="pwl-bg-grid" />
            <div aria-hidden="true" className="pwl-rail-track" />
            <div aria-hidden="true" className="pwl-rail-line" />
            <div className="pwl-tl">
              <QuietRow cls="pwl-b1" />
              <QuietRow cls="pwl-b2" />
              <PingRow ping={PINGS[0]} />

              {/* 9:00 → 1:00 之间跨了几小时,时间列里竖排三点示意这段被略过 */}
              <div aria-hidden="true" className="pwl-gap">
                <span className="pwl-gap-dots"><i /><i /><i /></span>
              </div>

              <QuietRow cls="pwl-b4" />
              <PingRow ping={PINGS[1]} />

              {/* 2:00 → 5:00 之间同理:时间列里竖排三点示意被略过的 3/4 点 */}
              <div aria-hidden="true" className="pwl-gap pwl-gap2">
                <span className="pwl-gap-dots"><i /><i /><i /></span>
              </div>

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

            {/* 主按钮 —— 稿把它挪进回放区内,浮在网格右下角(距右 32 / 距底 20);
                点击就地换成第二步配置,不直接建 automation */}
            <button
              type="button"
              onClick={() => setStep('config')}
              className="pwl-start"
            >
              Setup the Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
