/**
 * [INPUT]: Page type, AppShell, SkillPickerPopover, SKILL_LIBRARY
 * [OUTPUT]: 三个对话框 + Skill 选择方案对比 demo 页
 * [POS]: 产品/交互探索沙盒 — 入口在 Sidebar
 */

import { useMemo, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { AppShell } from '@/app/components/shell/AppShell';
import { Avatar } from '@/app/components/shared/Avatar';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { SkillPickerPopover } from '@/app/components/shared/SkillPickerPopover';
import { SKILL_LIBRARY, type SkillEntry } from '@/data/skill-library';

/* ====================================================================== */
/* 共用：已选 skill chip                                                    */
/* ====================================================================== */

function SkillChip({ skill, onRemove }: { skill: SkillEntry; onRemove: () => void }) {
  return (
    <div
      className="skill-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: 6,
        borderRadius: 4,
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        flexShrink: 0,
        transition: 'border-color 120ms',
      }}
    >
      {skill.kol ? (
        <Avatar name={skill.creator} size={20} />
      ) : (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: 2,
            background: 'var(--main-m1)',
            flexShrink: 0,
          }}
        >
          <CdnIcon name={skill.icon ?? 'researcher-l1'} size={16} color="#fff" />
        </span>
      )}
      <span
        style={{
          fontFamily: "'Delight', sans-serif",
          fontSize: 12,
          lineHeight: '20px',
          letterSpacing: 0.12,
          color: 'var(--text-n9)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 184,
        }}
      >
        {skill.name}
      </span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        aria-label="Remove skill"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
      </button>
    </div>
  );
}

/* ====================================================================== */
/* 共用：Playbook 引用 chip（contextTag 同款样式）                            */
/* ====================================================================== */

interface PlaybookQuote {
  label: string;
  icon: string;
}

function PlaybookQuoteChip({
  quote,
  onRemove,
}: {
  quote: PlaybookQuote;
  onRemove: () => void;
}) {
  return (
    <div
      className="skill-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: 6,
        borderRadius: 4,
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        flexShrink: 0,
        transition: 'border-color 120ms',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          borderRadius: 2,
          background: 'var(--main-m1)',
          flexShrink: 0,
        }}
      >
        <CdnIcon name={quote.icon} size={16} color="#fff" />
      </span>
      <span
        style={{
          fontFamily: "'Delight', sans-serif",
          fontSize: 12,
          lineHeight: '20px',
          letterSpacing: 0.12,
          color: 'var(--text-n9)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 184,
        }}
      >
        {quote.label}
      </span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        aria-label="Remove playbook quote"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <CdnIcon name="close-l1" size={12} color="var(--text-n5)" />
      </button>
    </div>
  );
}

const MOCK_PLAYBOOK_QUOTE: PlaybookQuote = {
  label: 'Template-Notification',
  icon: 'sidebar-discover-normal',
};

/* ====================================================================== */
/* 共用：编辑框 + 底部 toolbar 骨架                                          */
/* ====================================================================== */

interface InputShellProps {
  chipRow?: React.ReactNode;
  toolbarLeft?: React.ReactNode;
}

function InputShell({ chipRow, toolbarLeft }: InputShellProps) {
  const [text, setText] = useState('');
  return (
    <div
      style={{
        width: '100%',
        background: 'var(--b0-container, #fff)',
        border: '0.5px solid var(--line-l2)',
        borderRadius: 'var(--radius-ct-m)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      }}
    >
      {chipRow}
      <div style={{ position: 'relative', minHeight: 44 }}>
        {!text && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              fontFamily: "'Delight', sans-serif",
              fontSize: 14,
              lineHeight: '22px',
              color: 'var(--text-n3)',
            }}
          >
            Build an investing playbook from your ideas
          </div>
        )}
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setText((e.currentTarget.textContent || '').trim())}
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 14,
            lineHeight: '22px',
            color: 'var(--text-n9)',
            outline: 'none',
            minHeight: 22,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 28 }}>
        <button style={btnIcon}><CdnIcon name="at-l" size={16} /></button>
        <button style={btnIcon}><CdnIcon name="photo-l" size={16} /></button>
        <button style={btnIcon}><CdnIcon name="pointer-l" size={16} /></button>
        {toolbarLeft}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: "'Delight', sans-serif", fontSize: 12, color: 'var(--text-n5)' }}>
            Sonnet 4.6
          </span>
          <CdnIcon name="arrow-down-f2" size={12} color="var(--text-n2)" />
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: 'none',
            background: text ? 'var(--main-m1)' : 'var(--b-r05)',
            cursor: text ? 'pointer' : 'default',
          }}
        >
          <CdnIcon name="arrow-up-l1" size={14} color={text ? '#fff' : 'var(--text-n3)'} />
        </button>
      </div>
    </div>
  );
}

const btnIcon: React.CSSProperties = {
  flexShrink: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
};

/* ====================================================================== */
/* Variant A — Toolbar 图标触发                                             */
/* ====================================================================== */

function VariantA() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [playbookQuote, setPlaybookQuote] = useState<PlaybookQuote | null>(MOCK_PLAYBOOK_QUOTE);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const selectedSkills = useMemo(
    () => SKILL_LIBRARY.filter((s) => selected.has(s.id)),
    [selected]
  );

  function openPicker() {
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(true);
  }

  const hasChips = !!playbookQuote || selectedSkills.length > 0;
  const chipRow = hasChips ? (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {playbookQuote && (
        <PlaybookQuoteChip quote={playbookQuote} onRemove={() => setPlaybookQuote(null)} />
      )}
      {selectedSkills.map((s) => (
        <SkillChip key={s.id} skill={s} onRemove={() => toggle(s.id)} />
      ))}
    </div>
  ) : null;

  const toolbarLeft = (
    <button
      ref={btnRef}
      type="button"
      onClick={openPicker}
      style={{ ...btnIcon, gap: 2 }}
      aria-label="Add skill"
    >
      <CdnIcon
        name="researcher-l1"
        size={16}
        color={selected.size > 0 ? 'var(--main-m1)' : undefined}
      />
      {selected.size > 0 && (
        <span
          style={{
            fontFamily: "'Delight', sans-serif",
            fontSize: 12,
            lineHeight: '16px',
            color: 'var(--main-m1)',
          }}
        >
          {selected.size}
        </span>
      )}
    </button>
  );

  return (
    <>
      <InputShell chipRow={chipRow} toolbarLeft={toolbarLeft} />
      <SkillPickerPopover
        open={open}
        anchorRect={rect}
        placement="top"
        selected={selected}
        onToggle={toggle}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/* ====================================================================== */
/* Variant B — chip 行常驻 + Skill 按钮                                     */
/* ====================================================================== */

function VariantB() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [playbookQuote, setPlaybookQuote] = useState<PlaybookQuote | null>(MOCK_PLAYBOOK_QUOTE);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const selectedSkills = useMemo(
    () => SKILL_LIBRARY.filter((s) => selected.has(s.id)),
    [selected]
  );

  function openPicker() {
    if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
    setOpen(true);
  }

  const chipRow = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <button
        ref={btnRef}
        type="button"
        onClick={openPicker}
        className="skill-trigger-b"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: 6,
          paddingRight: 10,
          borderRadius: 4,
          background: 'transparent',
          border: '0.5px dashed var(--line-l3)',
          cursor: 'pointer',
          color: 'var(--text-n7)',
          fontFamily: "'Delight', sans-serif",
          fontSize: 12,
          lineHeight: '20px',
          letterSpacing: 0.12,
          flexShrink: 0,
          transition: 'border-color 120ms',
        }}
      >
        <CdnIcon name="add-l2" size={12} color="var(--text-n7)" />
        Skill
      </button>
      {playbookQuote && (
        <PlaybookQuoteChip quote={playbookQuote} onRemove={() => setPlaybookQuote(null)} />
      )}
      {selectedSkills.map((s) => (
        <SkillChip key={s.id} skill={s} onRemove={() => toggle(s.id)} />
      ))}
    </div>
  );

  return (
    <>
      <InputShell chipRow={chipRow} />
      <SkillPickerPopover
        open={open}
        anchorRect={rect}
        placement="top"
        selected={selected}
        onToggle={toggle}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/* ====================================================================== */
/* Demo Page                                                              */
/* ====================================================================== */

interface ChatSkillDemoProps {
  onNavigate: (page: Page) => void;
  onOpenSearch?: () => void;
}

function Section({
  tag,
  title,
  desc,
  children,
}: {
  tag: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            lineHeight: '16px',
            padding: '2px 6px',
            borderRadius: 3,
            background: 'var(--main-m1)',
            color: '#fff',
            letterSpacing: 0.55,
          }}
        >
          {tag}
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Delight', sans-serif",
            fontSize: 16,
            lineHeight: '24px',
            color: 'var(--text-n9)',
            fontWeight: 500,
          }}
        >
          {title}
        </h2>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "'Delight', sans-serif",
          fontSize: 13,
          lineHeight: '20px',
          color: 'var(--text-n5)',
        }}
      >
        {desc}
      </p>
      {children}
    </section>
  );
}

const HOVER_STYLES = `
.skill-trigger-a:hover { border-color: var(--line-l5) !important; }
.skill-trigger-b:hover { border-color: var(--line-l5) !important; }
.skill-chip:hover { border-color: var(--line-l5) !important; }
`;

export default function ChatSkillDemo({ onNavigate, onOpenSearch }: ChatSkillDemoProps) {
  return (
    <AppShell activePage={'chat-skill-demo' as Page} onNavigate={onNavigate} onOpenSearch={onOpenSearch}>
      <style>{HOVER_STYLES}</style>
      <div
        style={{
          minHeight: '100%',
          background: 'var(--grey-g01)',
          padding: '32px 40px 64px',
          overflowY: 'auto',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Delight', sans-serif",
                fontSize: 22,
                lineHeight: '30px',
                color: 'var(--text-n9)',
                fontWeight: 400,
              }}
            >
              Chat + Skill — 两方案对比
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: "'Delight', sans-serif",
                fontSize: 13,
                lineHeight: '20px',
                color: 'var(--text-n5)',
              }}
            >
              共享 mock skill 库（{SKILL_LIBRARY.length} 个 skill，分 My / Alva / KOL 三组）。每方案独立 state，可分别试用多选。
            </p>
          </header>

          <Section
            tag="A"
            title="Toolbar 图标 + Popover"
            desc="底部 toolbar 加 skill 图标（与 @ / photo 同级，克制收纳）。点击弹 popover 多选。选中后顶部出现 chip。已选数量在图标右侧显示。"
          >
            <VariantA />
          </Section>

          <Section
            tag="B"
            title="输入框上方常驻 + Skill 按钮"
            desc="输入框顶部一行虚线 ghost button「+ Skill」永远可见。点击弹同款 popover。已选 chip 与按钮同行展开。"
          >
            <VariantB />
          </Section>
        </div>
      </div>
    </AppShell>
  );
}
