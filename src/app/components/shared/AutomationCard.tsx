/**
 * [INPUT]: PushCardData(union: normal/trade/kol), CdnIcon, Avatar
 * [OUTPUT]: 推送类卡片 —— 普通 / 交易信号 / KOL 三变体，复用同一外壳，可与 PlaybookCard 混排
 * [POS]: 首页 skill 推荐区 / Demo 卡片预览
 *
 * 对齐 Figma「Build」7788:77211(Normal) / 77212(Trade) / 77324(KOL)。
 * 共享结构：body(时间戳 + 变体内容 + 底部 48px 渐隐 mask) + footer(StatusDot + feed 名 + Get Alerts)。
 */

import { useState } from 'react';
import { Avatar } from './Avatar';
import { CdnIcon } from './CdnIcon';
import { TickerLogo } from './TickerLogo';

const FONT = "'Delight', sans-serif";

interface PushBase {
  id: string;
  /** "May 8, 9:00 AM" */
  timestamp: string;
  /** 时间戳后 · 的来源名，如 "ai-diaspora-tracker" */
  source: string;
  /** footer 里的 feed 名，如 "nvda-social-feed" */
  feedName: string;
}

interface NormalPush extends PushBase {
  kind: 'normal';
  title: string;
  bullets: string[];
}

interface TradePush extends PushBase {
  kind: 'trade';
  rows: { ticker: string; action: 'Buy' | 'Sell'; detail: string; dir: 'up' | 'down' }[];
  note: string;
}

interface KolPush extends PushBase {
  kind: 'kol';
  kolName: string;
  headlineTicker: string;
  headlineText: string;
  quoteTicker: string;
  quoteSide: string;
  analysis: string;
}

export type PushCardData = NormalPush | TradePush | KolPush;
/** @deprecated 旧名，保留兼容 */
export type AutomationCardData = PushCardData;

function StatusDot() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: 999,
        background: '#DBEDED',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: '#49A3A6' }} />
    </span>
  );
}

function TrendArrow({ dir }: { dir: 'up' | 'down' }) {
  const up = dir === 'up';
  return (
    <CdnIcon
      name={up ? 'bullish-l' : 'bearish-l'}
      size={20}
      color={up ? 'var(--main-m1)' : '#E5484D'}
    />
  );
}

function NormalBody({ d }: { d: NormalPush }) {
  return (
    <>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '22px',
          letterSpacing: 0.14,
          color: 'var(--text-n9, rgba(0,0,0,0.9))',
        }}
      >
        {d.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {d.bullets.map((b, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 14,
              lineHeight: '22px',
              letterSpacing: 0.14,
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
            }}
          >
            {b}
          </p>
        ))}
      </div>
    </>
  );
}

function TradeBody({ d }: { d: TradePush }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {d.rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
          <TickerLogo ticker={r.ticker} size={20} />
          <span style={{ fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {r.action}
          </span>
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--main-m1, #49a3a6)' }}>
            {r.ticker}
          </span>
          <span style={{ fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {r.detail}
          </span>
          <TrendArrow dir={r.dir} />
        </div>
      ))}
      <p style={{ margin: 0, fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
        {d.note}
      </p>
    </div>
  );
}

function KolBody({ d }: { d: KolPush }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      {/* 原帖：头像 + X 角标 + 文本 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ position: 'relative', flexShrink: 0, width: 22, height: 22 }}>
          <Avatar name={d.kolName} size={22} />
          <span
            style={{
              position: 'absolute',
              right: -2,
              bottom: 0,
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#000',
              border: '1px solid var(--b0-container, #fff)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT,
              fontSize: 7,
              lineHeight: 1,
              color: '#fff',
            }}
          >
            𝕏
          </span>
        </span>
        <p style={{ margin: 0, flex: 1, minWidth: 0, fontFamily: FONT, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
          <span style={{ fontWeight: 500 }}>{d.headlineTicker}</span> {d.headlineText}
        </p>
      </div>

      {/* Alva 引用块 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 12,
          borderRadius: 4,
          background: 'var(--b-r02, rgba(0,0,0,0.02))',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Avatar name={d.quoteTicker} size={20} />
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, lineHeight: '22px', letterSpacing: 0.14, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {d.quoteTicker}
          </span>
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 2,
              background: 'var(--main-m3, #2a9b7d)',
              fontFamily: FONT,
              fontSize: 11,
              lineHeight: '18px',
              letterSpacing: 0.11,
              color: '#fff',
            }}
          >
            {d.quoteSide}
          </span>
        </div>
        <div style={{ height: 1, background: 'var(--line-l07, rgba(0,0,0,0.07))', width: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 500, lineHeight: '20px', letterSpacing: 0.12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
              Alva
            </span>
            <span style={{ fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: 0.12, color: 'var(--main-m1, #49a3a6)' }}>
              Analysis
            </span>
          </div>
          <p style={{ margin: 0, fontFamily: FONT, fontSize: 12, lineHeight: '20px', letterSpacing: 0.12, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            {d.analysis}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AutomationCard({ a, defaultOn = false }: { a: PushCardData; defaultOn?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [on, setOn] = useState(defaultOn);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l3, rgba(0,0,0,0.3))',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: hovered ? 'var(--shadow-l, 0 10px 20px 0 rgba(0,0,0,0.08))' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 130ms cubic-bezier(0.2, 0, 0, 1), transform 180ms cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      {/* body —— 内容绝对定位，不撑高卡片：行高由同行的 playbook 卡决定，内容超出由渐隐 mask 裁切 */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 16,
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 12,
              lineHeight: '20px',
              letterSpacing: 0.12,
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
            }}
          >
            {a.timestamp} · {a.source}
          </p>

          {a.kind === 'normal' && <NormalBody d={a} />}
          {a.kind === 'trade' && <TradeBody d={a} />}
          {a.kind === 'kol' && <KolBody d={a} />}

          {/* 底部渐隐 mask */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0), var(--b0-container, #fff))',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '12px 16px',
          borderTop: '0.5px solid var(--line-l12, rgba(0,0,0,0.12))',
        }}
      >
        <StatusDot />
        <p
          style={{
            flex: 1,
            minWidth: 0,
            margin: 0,
            fontFamily: FONT,
            fontSize: 16,
            lineHeight: '26px',
            letterSpacing: 0.16,
            color: 'var(--text-n9, rgba(0,0,0,0.9))',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {a.feedName}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOn((v) => !v);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: '4px 12px',
            borderRadius: 4,
            flexShrink: 0,
            cursor: 'pointer',
            border: on ? '0.5px solid var(--main-m1, #49a3a6)' : '0.5px solid transparent',
            background: on ? 'var(--main-m1-10, rgba(73,163,166,0.1))' : 'var(--main-m1, #49a3a6)',
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: 0.12,
            color: on ? 'var(--main-m1, #49a3a6)' : '#fff',
            transition: 'background 120ms ease, color 120ms ease',
          }}
        >
          <CdnIcon name={on ? 'check-l1' : 'project-telegram-l'} size={14} color={on ? 'var(--main-m1)' : '#fff'} />
          {on ? 'Alerts On' : 'Get Alerts'}
        </button>
      </div>
    </div>
  );
}
