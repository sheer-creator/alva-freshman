/**
 * [INPUT]: memory.ts 的 MEMORY/MEMORY_FILES/USER_MD、react-markdown + remark-gfm（复用既有依赖）、ChannelIcon
 * [OUTPUT]: MemoryPanel — 文件树 + User.md 渲染/编辑 + 记忆卡片列表
 * [POS]: agent-channel/tabs — Memory tab（源自 demo planc 2429-2489 行；markdown 渲染换用 react-markdown）
 *
 * 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MEMORY, MEMORY_FILES, USER_MD } from '@/data/agent-channel/memory';
import { ChannelIcon } from '../ChannelIcon';

export function MemoryPanel() {
  const [sel, setSel] = useState('root');
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(USER_MD);
  const isRoot = sel === 'root';
  const current = MEMORY_FILES.files.find((f) => f.name === sel);
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>What Alva remembers</h2>
        <p>Long-term context I keep for you as files — not raw chat history. <strong style={{ color: 'var(--text-n7)' }}>User.md</strong> is your profile; everything reads from it. Edit it anytime.</p>
      </div>
      <div className="mem-split">
        <div className="mem-tree">
          <button className={`tree-item${isRoot ? ' active' : ''}`} onClick={() => { setSel('root'); setEditing(false); }}>
            <span className="tfi"><ChannelIcon name="file" size={16} /></span>
            <span className="tn">{MEMORY_FILES.root.name}</span>
            <span className="tmeta">{MEMORY_FILES.root.meta}</span>
          </button>
          <div className="tree-folder"><ChannelIcon name="folder" size={13} /> {MEMORY_FILES.folder}/</div>
          {MEMORY_FILES.files.map((f) => (
            <button key={f.name} className={`tree-item${sel === f.name ? ' active' : ''}`} onClick={() => { setSel(f.name); setEditing(false); }}>
              <span className="tfi"><ChannelIcon name="file" size={16} /></span>
              <span className="tn">{f.name}</span>
              <span className="tmeta">{f.meta}</span>
            </button>
          ))}
        </div>

        <div className="mem-doc">
          <div className="doc-bar">
            <span className="dn"><ChannelIcon name="file" size={15} /> {isRoot ? MEMORY_FILES.root.name : current?.name}</span>
            <span style={{ flex: 1 }}></span>
            {isRoot && !editing && <button className="ghost-btn" onClick={() => setEditing(true)}><ChannelIcon name="edit" size={15} /> Edit</button>}
            {isRoot && editing && <button className="ghost-btn" style={{ borderColor: 'rgba(73,163,166,0.4)', color: 'var(--main-m1)' }} onClick={() => setEditing(false)}><ChannelIcon name="check" size={15} /> Save</button>}
          </div>
          <div className="doc-body">
            {isRoot ? (
              editing
                ? <textarea className="doc-edit" value={text} onChange={(e) => setText(e.target.value)} />
                : <div className="md"><ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown></div>
            ) : (
              <div className="mem-list">
                {MEMORY.map((m) => (
                  <div className="mem" key={m.t}>
                    <div>
                      <div className="mt">{m.t}</div>
                      <div className="mb">{m.b}</div>
                      <div className="mem-chips">{m.chips.map((c) => <span className="memchip" key={c}>{c}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
