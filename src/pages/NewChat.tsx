/**
 * [INPUT]: Page type, AppShell, ChatInput (bottomChip), DotMatrixWave, new-chat-mock, Dropdown
 * [OUTPUT]: New Chat 入口页 — template 驱动的起手页面
 * [POS]: 与 Home 并列的入口页面（Sidebar 最顶）
 */

import { useEffect, useMemo, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { ChatInput } from '@/app/components/shared/ChatInput';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { Avatar } from '@/app/components/shared/Avatar';
import DotMatrixWave from '@/app/components/shared/DotMatrixWave';
import { Dropdown } from '@/app/components/shared/Dropdown';
import { ThreadSwitcherDropdown } from '@/app/components/shared/ThreadSwitcherDropdown';
import { PRIMARY_TEMPLATES, OTHERS_TEMPLATES, TRENDING_PLAYBOOKS, type NewChatTemplate, type NewChatPlaybook } from '@/data/new-chat-mock';
import { generateTypedSuggestions } from '@/data/typed-suggestions';

const CHIP_ICON = 'researcher-l1';

/* ========== Template 标签 chip 样式 ========== */

const chipBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  borderRadius: 6,
  border: '0.5px solid rgba(0,0,0,0.3)',
  fontFamily: "'Delight', sans-serif",
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 400,
  color: 'rgba(0,0,0,0.9)',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  letterSpacing: 0.14,
  userSelect: 'none',
};

function TemplateChip({ label, icon, active, onClick }: { label: string; icon?: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ ...chipBaseStyle, background: active ? '#e5eeee' : 'white' }}
    >
      {icon && <CdnIcon name={icon} size={14} color="rgba(0,0,0,0.8)" />}
      {label}
    </button>
  );
}

/* ========== Suggested Prompt 卡片 ========== */

function InlineSuggestionRow({ text, onClick, isLast }: { text: string; onClick?: () => void; isLast?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        background: 'transparent',
        border: 'none',
        borderBottom: isLast ? 'none' : '0.5px solid rgba(0,0,0,0.08)',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(73,163,166,0.04)';
        const span = e.currentTarget.querySelector('span') as HTMLSpanElement | null;
        if (span) span.style.color = '#49A3A6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        const span = e.currentTarget.querySelector('span') as HTMLSpanElement | null;
        if (span) span.style.color = 'rgba(0,0,0,0.85)';
      }}
    >
      <span
        style={{
          flex: 1,
          fontFamily: "'Delight', sans-serif",
          fontSize: 14,
          lineHeight: '22px',
          color: 'rgba(0,0,0,0.85)',
          letterSpacing: 0.14,
          transition: 'color 0.15s',
        }}
      >
        {text}
      </span>
      <CdnIcon name="enter-l" size={14} color="rgba(0,0,0,0.3)" />
    </button>
  );
}

/* ========== Playbook 卡片（复用 HomeV3 样式） ========== */

function PlaybookCard({ p, onClick }: { p: NewChatPlaybook; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-shadow hover:shadow-l"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--b0-page, #fff)',
        border: '0.5px solid rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          margin: '4px 4px 0 4px',
          width: 'calc(100% - 8px)',
          aspectRatio: '472 / 265.5',
          borderRadius: 8,
          background: `linear-gradient(135deg, ${p.color}14 0%, ${p.color}08 100%)`,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: '26px',
              fontWeight: 400,
              color: 'var(--text-n9, rgba(0,0,0,0.9))',
              letterSpacing: 0.16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {p.title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: '20px',
              color: 'var(--text-n5, rgba(0,0,0,0.5))',
              letterSpacing: 0.12,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {p.desc}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
            <Avatar name={p.creator} size={22} />
            <span
              style={{
                fontSize: 14,
                lineHeight: '22px',
                color: 'var(--text-n9, rgba(0,0,0,0.9))',
                letterSpacing: 0.14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {p.creator}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, color: 'var(--text-n9, rgba(0,0,0,0.9))' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="star-l" size={16} />
              {p.stars}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, lineHeight: '22px', letterSpacing: 0.14 }}>
              <CdnIcon name="remix-l" size={16} />
              {p.remixes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════ MAIN COMPONENT ══════ */

export default function NewChat({ onNavigate, onOpenSearch }: { onNavigate: (page: Page) => void; onOpenSearch?: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [injectSignal, setInjectSignal] = useState<{ text: string; seq: number } | null>(null);
  const [typedText, setTypedText] = useState('');
  const [debouncedTypedText, setDebouncedTypedText] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTypedText(typedText), 700);
    return () => clearTimeout(t);
  }, [typedText]);

  const typedSuggestions = useMemo(() => generateTypedSuggestions(debouncedTypedText), [debouncedTypedText]);
  const showTypedSuggestions = !selectedId && typedSuggestions.length > 0;

  const selected: NewChatTemplate | null = useMemo(() => {
    if (!selectedId) return null;
    return (
      PRIMARY_TEMPLATES.find((t) => t.id === selectedId) ||
      OTHERS_TEMPLATES.find((t) => t.id === selectedId) ||
      null
    );
  }, [selectedId]);

  const othersActive = !!selectedId && OTHERS_TEMPLATES.some((t) => t.id === selectedId);
  const othersLabel = othersActive ? selected!.label : 'Others';

  const handlePrimaryClick = (id: string) => setSelectedId((prev) => (prev === id ? null : id));
  const handleOthersSelect = (id: string) => setSelectedId(id);
  const handleRemoveChip = () => setSelectedId(null);
  const handlePromptClick = (text: string) => setInjectSignal({ text, seq: Date.now() });
  const handleThreadSelect = (id: string) => {
    if (id === '__agent__') onNavigate('agent');
    else onNavigate(`thread/${id}` as Page);
  };

  return (
    <AppShell activePage={'new-chat' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <style>{`@keyframes newchat-fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="h-screen overflow-y-auto bg-[#fafafa]">
        {/* ══════ Topbar — thread switcher ══════ */}
        <div
          className="flex items-center gap-[16px] h-[56px] px-[28px] shrink-0"
          style={{ position: 'sticky', top: 0, zIndex: 5, background: '#fafafa' }}
        >
          <div className="flex-1 min-w-0">
            <ThreadSwitcherDropdown
              activeId="new"
              onSelect={handleThreadSelect}
              trigger={
                <div className="flex gap-[4px] items-center min-w-0 cursor-pointer">
                  <p className="font-['Delight',sans-serif] text-[14px] leading-[22px] tracking-[0.14px] text-[rgba(0,0,0,0.9)] truncate">
                    New Chat
                  </p>
                  <CdnIcon name="arrow-down-f2" size={14} color="rgba(0,0,0,0.2)" />
                </div>
              }
            />
          </div>
        </div>

        {/* ══════ HERO — 固定"居中偏上"布局，选中前后不跳变 ══════ */}
        <section
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 28,
            padding: 'clamp(104px, 22vh, 220px) 24px 48px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <DotMatrixWave
              enableHover={false}
              bgColor="#fafafa"
              dotColor="#d1e0e0"
              waveSpeed={0.6}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <h1
            key={selected?.id ?? 'default'}
            style={{
              fontSize: 45,
              lineHeight: 1.2,
              fontWeight: 400,
              color: 'rgba(0,0,0,0.9)',
              textAlign: 'center',
              maxWidth: 720,
              letterSpacing: 0.45,
              position: 'relative',
              zIndex: 1,
              animation: 'newchat-fadeup 240ms ease-out',
            }}
          >
            {selected?.slogan ?? 'Pick a template and start building'}
          </h1>

          <div style={{ width: '100%', maxWidth: 780, position: 'relative', zIndex: 1 }}>
            <ChatInput
              shadow
              bottomChip={selected ? { label: selected.label, icon: selected.icon ?? CHIP_ICON, onRemove: handleRemoveChip } : null}
              injectText={injectSignal}
              onInputChange={setTypedText}
            />
          </div>

          {/* 未选 template + 用户输入触发预测 → 替换标签行为 3 条建议 */}
          {showTypedSuggestions && (
            <div
              key={debouncedTypedText}
              style={{
                width: '100%',
                maxWidth: 780,
                position: 'relative',
                zIndex: 1,
                marginTop: -12,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {typedSuggestions.map((p, i, arr) => (
                <div
                  key={i}
                  style={{
                    animation: 'newchat-fadeup 320ms ease-out both',
                    animationDelay: `${i * 110}ms`,
                  }}
                >
                  <InlineSuggestionRow
                    text={p}
                    isLast={i === arr.length - 1}
                    onClick={() => handlePromptClick(p)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 标签行 — 未选中且没有输入时展示 */}
          {!selected && !showTypedSuggestions && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', position: 'relative', zIndex: 1, maxWidth: 900 }}>
              {PRIMARY_TEMPLATES.map((t) => (
                <TemplateChip
                  key={t.id}
                  label={t.label}
                  icon={t.icon}
                  active={selectedId === t.id}
                  onClick={() => handlePrimaryClick(t.id)}
                />
              ))}
              <Dropdown
                items={OTHERS_TEMPLATES.map((t) => ({ id: t.id, label: t.label, icon: t.icon }))}
                activeId={othersActive ? (selectedId ?? undefined) : undefined}
                onSelect={handleOthersSelect}
                width={220}
                trigger={
                  <div style={{ ...chipBaseStyle, background: othersActive ? '#e5eeee' : 'white' }}>
                    <CdnIcon name="more-l1" size={14} color="rgba(0,0,0,0.8)" />
                    {othersLabel}
                    <CdnIcon name="arrow-down-l2" size={12} color="rgba(0,0,0,0.5)" />
                  </div>
                }
              />
            </div>
          )}

          {/* Suggested Prompts — 选中后紧接输入框下方，纵向最多 3 条 */}
          {selected && (
            <div
              style={{
                width: '100%',
                maxWidth: 780,
                position: 'relative',
                zIndex: 1,
                marginTop: -12,
                display: 'flex',
                flexDirection: 'column',
                animation: 'newchat-fadeup 240ms ease-out',
              }}
            >
              {selected.prompts.slice(0, 3).map((p, i, arr) => (
                <InlineSuggestionRow
                  key={i}
                  text={p}
                  isLast={i === arr.length - 1}
                  onClick={() => handlePromptClick(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ══════ 选中态内容 — Related Playbooks，位于 Trending 之上 ══════ */}
        {selected && (
          <section
            key={selected.id}
            style={{
              width: '100%',
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 24px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              animation: 'newchat-fadeup 260ms ease-out',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(0,0,0,0.5)',
                letterSpacing: 0.3,
                textTransform: 'uppercase',
              }}
            >
              Related Playbooks
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {selected.playbooks.map((p) => (
                <PlaybookCard
                  key={p.id}
                  p={p}
                  onClick={() => {
                    sessionStorage.setItem('autoOpenChatPanel', '1');
                    onNavigate('new-chat');
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* ══════ Trending Playbooks — 常驻，选中时被 related 顶到下方 ══════ */}
        <section
          style={{
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 24px 80px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(0,0,0,0.5)',
              letterSpacing: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Trending Playbooks
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {TRENDING_PLAYBOOKS.map((p) => (
              <PlaybookCard
                key={p.id}
                p={p}
                onClick={() => {
                  sessionStorage.setItem('autoOpenChatPanel', '1');
                  onNavigate('new-chat');
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
