/**
 * [INPUT]: QuestionCardData
 * [OUTPUT]: AskUserQuestion 交互选择卡片
 * [POS]: alva-chat — Agent 向用户提问渲染
 */

import { useState } from 'react';
import type { QuestionCardData } from '@/data/alva-chat-mock';

interface QuestionCardProps {
  data: QuestionCardData;
  onAnswer?: (selectedIndices: number[]) => void;
}

export function QuestionCard({ data, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<number[]>(
    data.selectedIndex != null ? [data.selectedIndex] : []
  );
  const [submitted, setSubmitted] = useState(data.selectedIndex != null);

  const toggle = (idx: number) => {
    if (submitted) return;
    if (data.multiSelect) {
      setSelected(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
    } else {
      setSelected([idx]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    onAnswer?.(selected);
  };

  return (
    <div style={{
      margin: '8px 0', padding: '16px', borderRadius: 8,
      border: '1px solid rgba(0,0,0,0.08)', background: 'var(--grey-g01)',
    }}>
      {/* Header chip */}
      <span style={{
        display: 'inline-block', padding: '2px 8px', borderRadius: 4,
        background: 'rgba(73,163,166,0.1)', color: 'var(--main-m1)',
        fontSize: 11, fontWeight: 600, fontFamily: "'Delight', sans-serif",
        marginBottom: 8,
      }}>
        {data.header}
      </span>

      {/* Question */}
      <p style={{
        margin: '0 0 12px', fontSize: 14, lineHeight: '22px',
        color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif",
      }}>
        {data.question}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.options.map((opt, idx) => {
          const isSelected = selected.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => toggle(idx)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 12px', borderRadius: 6, cursor: submitted ? 'default' : 'pointer',
                border: `1px solid ${isSelected ? 'var(--main-m1)' : 'rgba(0,0,0,0.08)'}`,
                background: isSelected ? 'rgba(73,163,166,0.06)' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {/* Radio / Checkbox indicator */}
              <div style={{
                width: 16, height: 16, borderRadius: data.multiSelect ? 3 : '50%',
                border: `1.5px solid ${isSelected ? 'var(--main-m1)' : 'rgba(0,0,0,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 2,
                background: isSelected ? 'var(--main-m1)' : 'transparent',
                transition: 'all 0.15s',
              }}>
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-n9)', fontFamily: "'Delight', sans-serif" }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-n5)', fontFamily: "'Delight', sans-serif", marginTop: 2 }}>
                  {opt.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          style={{
            marginTop: 12, padding: '6px 16px', borderRadius: 6,
            border: 'none', cursor: selected.length > 0 ? 'pointer' : 'default',
            background: selected.length > 0 ? 'var(--main-m1)' : 'rgba(0,0,0,0.08)',
            color: selected.length > 0 ? '#fff' : 'var(--text-n5)',
            fontSize: 13, fontWeight: 500, fontFamily: "'Delight', sans-serif",
            transition: 'all 0.15s',
          }}
        >
          Submit
        </button>
      ) : (
        <div style={{
          marginTop: 10, fontSize: 12, color: 'var(--text-n5)',
          fontFamily: "'Delight', sans-serif",
        }}>
          Submitted
        </div>
      )}
    </div>
  );
}
