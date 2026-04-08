import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Page } from '@/app/App';
import {
  HOME_CHAT_CONTEXT,
  PAGE_CONTEXT_MAP,
  PAGE_DEFAULT_THREAD,
  type ChatTriggerMode,
  type ContextTagData,
  type ThreadsEntryMode,
} from '@/lib/chat-config';
import type { StreamingState, StreamStep } from './StreamingMessages';

/* ── Mock streaming scenario ── */
const MOCK_STEPS: StreamStep[] = [
  { type: 'plan', label: 'Plan', meta: 'NVDA Earnings Dashboard', lines: [
    '1. Thoroughly explore the codebase to understand existing patterns',
    '2. Identify similar features and architectural approaches',
    '3. Consider multiple approaches and their trade-offs',
    '4. Use AskUserQuestion if you need to clarify the approach',
    '5. Design a concrete implementation strategy',
  ], collapsed: true },
  { type: 'read', label: 'Read', meta: '/src/app/components/shell/AppShell.tsx', lines: ['Read 112 lines'] },
  { type: 'bash', label: 'Bash', meta: 'ls /Users/sheer/Downloads/Test/.claude/launch.json 2>/dev/null', lines: [
    '7:<<<<<<< Updated upstream',
    '9:=======',
    '11:>>>>>>> Stashed changes',
    '29:<<<<<<< Updated upstream',
    '35:=======',
    '40:>>>>>>> Stashed changes',
  ], collapsed: true },
  { type: 'read', label: 'Read', meta: '/src/styles/theme.css', lines: ['Read 48 lines'] },
];

const MOCK_TODOS: NonNullable<StreamingState['todos']> = {
  title: 'Building NVDA Earnings Dashboard',
  progress: '2/5',
  items: [
    { text: 'Clarify the objective: use daily technical indicators to determine.', status: 'done' },
    { text: 'Retrieve SDK documentation to understand what market data are available for US equities like COIN.', status: 'done' },
    { text: 'Use data_fetching to pull recent daily OHLCV data for COIN and then compute technical indicators.', status: 'loading' },
    { text: 'Synthesize indicator outputs into a clear overbought/oversold judgment.', status: 'pending' },
    { text: 'Summary table for metrics.', status: 'pending' },
  ],
};

const MOCK_ANSWER = {
  question: 'Which dashboard layout do you prefer for the earnings overview?',
  currentStep: '1/2',
  options: [
    { title: 'Single-page grid layout', description: 'Revenue bar chart + Gross Margin line + P/E horizontal bar — compact, scannable' },
    { title: 'Tabbed multi-view layout', description: 'Separate tabs for Revenue, Margins, and Valuation — more room per chart' },
    { title: 'Scrollable vertical layout', description: 'Full-width charts stacked vertically — easy to read on any screen size' },
  ],
};

const MOCK_PLAN = {
  title: 'NVDA Earnings Dashboard',
  steps: [
    'Fetch NVDA quarterly financials (revenue, gross margin, forward P/E)',
    'Fetch AMD and INTC forward P/E for peer comparison',
    'Choose dashboard layout and chart types',
    'Build interactive dashboard with ECharts',
  ],
};

const MOCK_FINAL_TEXT = `Based on your selections, I'll build the NVDA Earnings Dashboard with a single-page grid layout.\n\nThe dashboard will include:\n- Revenue trend bar chart with quarterly data\n- Gross margin line chart with 73% current highlight\n- Forward P/E comparison (NVDA vs AMD vs INTC)`;

/* ── Blocking overlay types ── */
export type OverlayType = 'todos' | 'plan' | 'answer';
export interface OverlayData {
  type: OverlayType;
  todos?: StreamingState['todos'];
  plan?: StreamingState['plan'];
  answer?: StreamingState['answer'];
}

/* ── Streaming simulation ── */
function createStreamSimulation(
  setState: (fn: (prev: StreamingState) => StreamingState) => void,
  setOverlay: (data: OverlayData | null) => void,
  onDone: () => void,
) {
  const timers: ReturnType<typeof setTimeout>[] = [];
  let cancelled = false;
  let resolveBlock: (() => void) | null = null;

  const delay = (ms: number) => new Promise<void>(resolve => {
    const t = setTimeout(() => { if (!cancelled) resolve(); }, ms);
    timers.push(t);
  });

  const waitForUser = () => new Promise<void>(resolve => {
    resolveBlock = resolve;
  });

  const continueStream = () => {
    if (resolveBlock) {
      const r = resolveBlock;
      resolveBlock = null;
      r();
    }
  };

  (async () => {
    // ── Phase 1: Thinking (lottie) → overlays for user decisions ──
    setState(prev => ({ ...prev, thinking: true, statusText: 'Thinking...' }));
    await delay(1500);

    // Phase 2: Review Plan (blocking - waits for user) — thinking keeps spinning
    if (cancelled) return;
    setState(prev => ({ ...prev, statusText: 'Waiting for your review...' }));
    setOverlay({ type: 'plan', plan: MOCK_PLAN });
    await waitForUser();
    if (cancelled) return;
    setOverlay(null);

    // Phase 3: Checklist / Todo list (blocking overlay) — thinking keeps spinning
    if (cancelled) return;
    const todosData = { ...MOCK_TODOS };
    setState(prev => ({ ...prev, statusText: 'Building NVDA Earnings Dashboard · 2/5' }));
    setOverlay({ type: 'todos', todos: todosData });
    await delay(1500);

    // Progress todos
    if (cancelled) return;
    const updatedTodos = {
      ...todosData,
      progress: '3/5',
      items: todosData.items.map((item, i) =>
        i === 2 ? { ...item, status: 'done' as const } :
        i === 3 ? { ...item, status: 'loading' as const } : item
      ),
    };
    setState(prev => ({ ...prev, statusText: 'Building NVDA Earnings Dashboard · 3/5' }));
    setOverlay({ type: 'todos', todos: updatedTodos });
    await delay(1200);
    if (cancelled) return;
    setOverlay(null);

    // Phase 4: Answer question (blocking - waits for user) — thinking keeps spinning
    if (cancelled) return;
    setState(prev => ({ ...prev, statusText: 'Waiting for your answer...' }));
    setOverlay({ type: 'answer', answer: MOCK_ANSWER });
    await waitForUser();
    if (cancelled) return;
    setOverlay(null);

    // ── Phase 5: Stop thinking, start execution steps ──
    if (cancelled) return;
    setState(prev => ({ ...prev, thinking: false }));
    for (let i = 0; i < MOCK_STEPS.length; i++) {
      if (cancelled) return;
      setState(prev => ({
        ...prev,
        steps: [...prev.steps, MOCK_STEPS[i]],
        statusText: `${MOCK_STEPS[i].label}${MOCK_STEPS[i].meta ? ' · ' + MOCK_STEPS[i].meta : ''}`,
      }));
      await delay(800 + Math.random() * 400);
    }

    // Mark steps complete → collapse into divider
    if (cancelled) return;
    setState(prev => ({ ...prev, stepsCompleted: true }));
    await delay(300);

    // Phase 6: Streaming text response
    if (cancelled) return;
    setState(prev => ({ ...prev, statusText: 'Writing response...' }));
    const chars = MOCK_FINAL_TEXT.split('');
    for (let i = 0; i < chars.length; i++) {
      if (cancelled) return;
      const partial = chars.slice(0, i + 1).join('');
      setState(prev => ({ ...prev, textContent: partial }));
      await delay(15 + Math.random() * 15);
    }

    // Done
    if (cancelled) return;
    setState(prev => ({ ...prev, isStreaming: false, statusText: 'Done' }));
    await delay(2000);
    setState(prev => ({ ...prev, statusText: undefined }));
    onDone();
  })();

  return {
    cancel: () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      if (resolveBlock) resolveBlock();
    },
    continueStream,
  };
}

/* ── Context ── */
interface ChatContextValue {
  chatOpen: boolean;
  hasInitialInput: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: (withInput?: boolean) => void;
  reopenChat: () => void;
  contextTag: ContextTagData | null;
  activePage: Page;
  activeConversationId: string;
  setActiveConversation: (id: string) => void;
  streamingState: StreamingState | null;
  pendingPrompt: string | null;
  sendPrompt: (text: string) => void;
  overlay: OverlayData | null;
  dismissOverlay: () => void;
}

const INITIAL_STREAMING: StreamingState = {
  steps: [],
  isStreaming: true,
  thinking: true,
  statusText: 'Thinking...',
};

const ChatCtx = createContext<ChatContextValue | null>(null);

export function ChatProvider({
  activePage,
  children,
  threadsEntryMode = '1',
  chatTriggerMode = 'fab',
}: {
  activePage: Page;
  children: React.ReactNode;
  threadsEntryMode?: ThreadsEntryMode;
  /** 方案 1 仅在 FAB（方案 C）下为 Home 注入上下文 */
  chatTriggerMode?: ChatTriggerMode;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasInitialInput, setHasInitialInput] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState('new');
  const [streamingState, setStreamingState] = useState<StreamingState | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<OverlayData | null>(null);
  const simRef = useRef<{ cancel: () => void; continueStream: () => void } | null>(null);

  useEffect(() => {
    const threadId = sessionStorage.getItem('openChatWithThread');
    if (threadId) {
      sessionStorage.removeItem('openChatWithThread');
      setActiveConversationId(threadId);
      setHasInitialInput(true);
      setChatOpen(true);
    }
  }, [activePage]);

  const toggleChat = useCallback(() => setChatOpen(v => !v), []);
  const closeChat = useCallback(() => { setChatOpen(false); }, []);
  const reopenChat = useCallback(() => { setChatOpen(true); }, []);

  const openChat = useCallback((withInput = false) => {
    if (streamingState) { setChatOpen(true); return; }
    const defaultThread = PAGE_DEFAULT_THREAD[activePage];
    if (defaultThread) {
      setActiveConversationId(defaultThread);
      setHasInitialInput(true);
    } else {
      setHasInitialInput(withInput);
      if (withInput) setActiveConversationId('demo');
    }
    setChatOpen(true);
  }, [activePage, streamingState]);

  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setHasInitialInput(id === 'demo');
  }, []);

  const sendPrompt = useCallback((text: string) => {
    simRef.current?.cancel();
    setOverlay(null);
    setPendingPrompt(text);
    setHasInitialInput(true);
    setActiveConversationId('streaming');
    setChatOpen(true);
    setStreamingState({ ...INITIAL_STREAMING });
    simRef.current = createStreamSimulation(
      (fn) => setStreamingState(prev => prev ? fn(prev) : prev),
      (data) => setOverlay(data),
      () => { simRef.current = null; },
    );
  }, []);

  const dismissOverlay = useCallback(() => {
    setOverlay(null);
    simRef.current?.continueStream();
  }, []);

  useEffect(() => () => { simRef.current?.cancel(); }, []);

  const contextTag = useMemo((): ContextTagData | null => {
    // agent 和 thread 页面不显示 Chat FAB
    if (activePage in PAGE_CONTEXT_MAP) return PAGE_CONTEXT_MAP[activePage];
    if (activePage.startsWith('thread/')) return null;
    // 其余页面都显示 Chat FAB
    return HOME_CHAT_CONTEXT;
  }, [activePage]);

  const value = useMemo(
    () => ({
      chatOpen, hasInitialInput, toggleChat, closeChat, openChat, reopenChat,
      contextTag, activePage, activeConversationId, setActiveConversation,
      streamingState, pendingPrompt, sendPrompt,
      overlay, dismissOverlay,
    }),
    [chatOpen, hasInitialInput, toggleChat, closeChat, openChat, reopenChat,
     contextTag, activePage, activeConversationId, setActiveConversation,
     streamingState, pendingPrompt, sendPrompt,
     overlay, dismissOverlay],
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatContext must be inside ChatProvider');
  return ctx;
}
