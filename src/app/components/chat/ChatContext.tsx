import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Page } from '@/app/App';
import {
  HOME_CHAT_CONTEXT,
  PAGE_CONTEXT_MAP,
  PAGE_DEFAULT_THREAD,
  PAGE_TITLES,
  type ChatTriggerMode,
  type ContextTagData,
  type ThreadsEntryMode,
} from '@/lib/chat-config';
import type { StreamingState, StreamStep } from './StreamingMessages';

/* ── Mock streaming scenario ── */
const MOCK_STEPS: StreamStep[] = [
  {
    type: 'bash',
    label: 'Run Alva skill version check',
    meta: '$ awk \'NR>=3263 && NR<=3400\' "/Users/sheer/Downloads/Test Template/Template-Thesis-standalone.html"',
    duration: '2.3s',
  },
  { type: 'read', label: 'Read .alva.json', duration: '2.3s' },
  { type: 'read', label: 'Get user info', duration: '2.3s' },
  { type: 'read', label: 'Get SDK docs for TSLA feed modules', duration: '2.3s' },
  {
    type: 'thinking',
    label: 'Thinking',
    lines: [
      'The feed is working. Now let me:\n1. Grant public read access to the feed path\n2. Deploy as a cronjob\n3. Release the feed\n4. Build the HTML dashboard\n5. Draft and release the playbook',
      'Let me write the feed script. Note: RSI, MACD, Bollinger use milliseconds for start_time/end_time. OHLCV uses seconds.',
    ],
    duration: '2.3s',
  },
  { type: 'bash', label: 'Upload feed script via JSON body', duration: '2.3s' },
  { type: 'search', label: 'Search web: Elon Musk latest tweets 2026 DOGE Tesla SpaceX xAI', duration: '2.3s' },
];

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

/* ── Element inspector quote ── */
export interface ElementQuote {
  index: number;
  selector: string;
  tagName: string;
  newText: string | null;
  originalText: string | null;
  instruction: string | null;
}

export type AgentActivityBadgeKind = 'done' | 'needs-you' | 'proactive';
export type AgentActivityStatus = 'idle' | 'working' | 'done' | 'needs-you' | 'proactive';

export interface AgentActivityBadge {
  kind: AgentActivityBadgeKind;
  count?: number;
  label: string;
}

export interface AgentActivitySummary {
  status: AgentActivityStatus;
  isWorking: boolean;
  label: string;
  tooltipLabel?: string;
  ariaLabel: string;
  badge: AgentActivityBadge | null;
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

    // Phase 3: Answer question (blocking - waits for user) — thinking keeps spinning
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
export interface PrefillPrompt {
  text: string;
  nonce: number;
}

interface ChatContextValue {
  chatOpen: boolean;
  hasInitialInput: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: (withInput?: boolean) => void;
  openChatWithPrefill: (text: string) => void;
  reopenChat: () => void;
  contextTag: ContextTagData | null;
  activePage: Page;
  activeConversationId: string;
  setActiveConversation: (id: string) => void;
  streamingState: StreamingState | null;
  pendingPrompt: string | null;
  sendPrompt: (text: string) => void;
  stopStreaming: () => void;
  overlay: OverlayData | null;
  dismissOverlay: () => void;
  agentActivity: AgentActivitySummary;
  openAgentActivity: () => void;
  prefillPrompt: PrefillPrompt | null;
  clearPrefill: () => void;
  /* inspector */
  inspectorActive: boolean;
  toggleInspector: () => void;
  elementQuotes: ElementQuote[];
  addElementQuote: (q: ElementQuote) => void;
  removeElementQuote: (index: number) => void;
  clearElementQuotes: () => void;
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
}: {
  activePage: Page;
  children: React.ReactNode;
  threadsEntryMode?: ThreadsEntryMode;
  /** 方案 1 仅在 FAB（方案 C）下为 Home 注入上下文 */
  chatTriggerMode?: ChatTriggerMode;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasInitialInput, setHasInitialInput] = useState(false);
  // 全局 Ask 面板默认定位到 Alva Agent（频道在面板里的化身）；点 New chat 可随时切回空态
  const [activeConversationId, setActiveConversationId] = useState('__agent__');
  const [streamingState, setStreamingState] = useState<StreamingState | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<OverlayData | null>(null);
  const [doneUnreadCount, setDoneUnreadCount] = useState(0);
  const [proactiveUnreadCount, setProactiveUnreadCount] = useState(0);
  const [prefillPrompt, setPrefillPrompt] = useState<PrefillPrompt | null>(null);
  const [inspectorActive, setInspectorActive] = useState(false);
  const [elementQuotes, setElementQuotes] = useState<ElementQuote[]>([]);
  const simRef = useRef<{ cancel: () => void; continueStream: () => void } | null>(null);
  const chatOpenRef = useRef(chatOpen);

  useEffect(() => {
    chatOpenRef.current = chatOpen;
    if (chatOpen) setDoneUnreadCount(0);
  }, [chatOpen]);

  useEffect(() => {
    const threadId = sessionStorage.getItem('openChatWithThread');
    if (threadId) {
      sessionStorage.removeItem('openChatWithThread');
      setActiveConversationId(threadId);
      setHasInitialInput(true);
      setChatOpen(true);
    }

    const autoOpen = sessionStorage.getItem('autoOpenChatPanel');
    if (autoOpen && activePage === 'new-chat') {
      sessionStorage.removeItem('autoOpenChatPanel');
      setActiveConversationId('new');
      setHasInitialInput(false);
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

  const openChatWithPrefill = useCallback((text: string) => {
    simRef.current?.cancel();
    simRef.current = null;
    setStreamingState(null);
    setOverlay(null);
    setActiveConversationId('new');
    setHasInitialInput(false);
    setPrefillPrompt({ text, nonce: Date.now() });
    setChatOpen(true);
  }, []);

  const clearPrefill = useCallback(() => setPrefillPrompt(null), []);

  const toggleInspector = useCallback(() => {
    setInspectorActive(v => !v);
  }, []);

  const addElementQuote = useCallback((q: ElementQuote) => {
    setElementQuotes(prev => [...prev, q]);
    setChatOpen(true);
  }, []);

  const removeElementQuote = useCallback((index: number) => {
    setElementQuotes(prev => prev.filter(q => q.index !== index));
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage({ type: 'alva:inspector-remove-badge', index }, '*'); } catch (_) {}
    });
  }, []);

  const clearElementQuotes = useCallback(() => {
    setElementQuotes([]);
    document.querySelectorAll('iframe').forEach((f) => {
      try { f.contentWindow?.postMessage({ type: 'alva:inspector-clear-badges' }, '*'); } catch (_) {}
    });
  }, []);

  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setHasInitialInput(id === 'demo');
  }, []);

  const sendPrompt = useCallback((text: string) => {
    simRef.current?.cancel();
    setOverlay(null);
    setDoneUnreadCount(0);
    setPendingPrompt(text);
    setHasInitialInput(true);
    setActiveConversationId('streaming');
    setChatOpen(true);
    setStreamingState({ ...INITIAL_STREAMING });
    simRef.current = createStreamSimulation(
      (fn) => setStreamingState(prev => prev ? fn(prev) : prev),
      (data) => setOverlay(data),
      () => {
        simRef.current = null;
        if (!chatOpenRef.current) setDoneUnreadCount(count => Math.max(1, count + 1));
      },
    );
  }, []);

  const stopStreaming = useCallback(() => {
    simRef.current?.cancel();
    simRef.current = null;
    setOverlay(null);
    setStreamingState(prev => prev ? {
      ...prev,
      isStreaming: false,
      thinking: false,
      statusText: 'Done',
    } : prev);
  }, []);

  const dismissOverlay = useCallback(() => {
    setOverlay(null);
    simRef.current?.continueStream();
  }, []);

  const isWaitingForUser = overlay?.type === 'plan' || overlay?.type === 'answer';
  const agentActivity = useMemo<AgentActivitySummary>(() => {
    const isWorking = !!streamingState?.isStreaming;

    if (isWaitingForUser) {
      const answerQuestion = overlay?.type === 'answer' ? overlay.answer?.question : undefined;
      const label = overlay?.type === 'plan'
        ? 'Review Alva\'s plan'
        : 'Answer question';
      const tooltipLabel = answerQuestion || streamingState?.statusText || label;
      const waitReason = streamingState?.statusText || tooltipLabel;
      return {
        status: 'needs-you',
        isWorking,
        label,
        tooltipLabel,
        ariaLabel: `${waitReason}. Alva Agent is waiting for you.`,
        badge: { kind: 'needs-you', label },
      };
    }

    if (proactiveUnreadCount > 0) {
      const label = proactiveUnreadCount === 1 ? '1 new alert' : `${proactiveUnreadCount} new alerts`;
      return {
        status: 'proactive',
        isWorking,
        label,
        ariaLabel: `${proactiveUnreadCount === 1 ? '1 new alert' : `${proactiveUnreadCount} new alerts`} from Alva Agent.`,
        badge: { kind: 'proactive', count: proactiveUnreadCount, label },
      };
    }

    if (doneUnreadCount > 0) {
      const label = 'Done';
      return {
        status: 'done',
        isWorking,
        label,
        ariaLabel: `${doneUnreadCount === 1 ? 'Answer ready' : `${doneUnreadCount} answers ready`}. Open Alva Agent.`,
        badge: { kind: 'done', count: doneUnreadCount, label },
      };
    }

    if (isWorking) {
      const label = streamingState?.statusText || 'Thinking...';
      const ariaStatus = streamingState?.statusText || label;
      return {
        status: 'working',
        isWorking,
        label,
        ariaLabel: `${ariaStatus}. Open active Alva Agent thread.`,
        badge: null,
      };
    }

    return {
      status: 'idle',
      isWorking: false,
      label: 'Alva Agent',
      ariaLabel: 'Open Alva Agent',
      badge: null,
    };
  }, [doneUnreadCount, isWaitingForUser, overlay?.type, proactiveUnreadCount, streamingState]);

  const openAgentActivity = useCallback(() => {
    if (isWaitingForUser || streamingState) {
      setActiveConversationId('streaming');
      setHasInitialInput(true);
      setDoneUnreadCount(0);
      setChatOpen(true);
      return;
    }

    if (proactiveUnreadCount > 0) {
      setActiveConversationId('__agent__');
      setHasInitialInput(true);
      setProactiveUnreadCount(0);
      setChatOpen(true);
      return;
    }

    openChat(false);
  }, [isWaitingForUser, openChat, proactiveUnreadCount, streamingState]);

  useEffect(() => () => { simRef.current?.cancel(); }, []);

  const contextTag = useMemo((): ContextTagData | null => {
    // agent 和 thread 页面不显示 Chat FAB
    if (activePage in PAGE_CONTEXT_MAP) return PAGE_CONTEXT_MAP[activePage];
    if (activePage.startsWith('thread/')) return null;
    // Playbook/template 详情页：chip label 用 playbook 名称
    const pageTitle = PAGE_TITLES[activePage];
    if (pageTitle) return { label: pageTitle, icon: 'sidebar-discover-normal' };
    // 其余页面都显示 Chat FAB
    return HOME_CHAT_CONTEXT;
  }, [activePage]);

  const value = useMemo(
    () => ({
      chatOpen, hasInitialInput, toggleChat, closeChat, openChat, openChatWithPrefill, reopenChat,
      contextTag, activePage, activeConversationId, setActiveConversation,
      streamingState, pendingPrompt, sendPrompt, stopStreaming,
      overlay, dismissOverlay,
      agentActivity, openAgentActivity,
      prefillPrompt, clearPrefill,
      inspectorActive, toggleInspector, elementQuotes, addElementQuote, removeElementQuote, clearElementQuotes,
    }),
    [chatOpen, hasInitialInput, toggleChat, closeChat, openChat, openChatWithPrefill, reopenChat,
     contextTag, activePage, activeConversationId, setActiveConversation,
     streamingState, pendingPrompt, sendPrompt, stopStreaming,
     overlay, dismissOverlay,
     agentActivity, openAgentActivity,
     prefillPrompt, clearPrefill,
     inspectorActive, toggleInspector, elementQuotes, addElementQuote, removeElementQuote, clearElementQuotes],
  );

  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatContext must be inside ChatProvider');
  return ctx;
}
