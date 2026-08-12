/**
 * [INPUT]: setup checklist task launches and successful product interactions
 * [OUTPUT]: cross-route onboarding progress for the isolated #...?checklist=setup demo
 * [POS]: app state — keeps the sidebar checklist truthful while pages unmount/remount
 */

import { useSyncExternalStore } from 'react';

export type SetupTaskId = 'profile' | 'chat-app' | 'automation' | 'playbook' | 'memory';

export interface SetupProfile {
  displayName: string;
  username: string;
  avatar: string;
}

interface SetupChecklistState {
  activeTask: SetupTaskId | null;
  completed: Record<SetupTaskId, boolean>;
  connectedImId: string | null;
  automationId: string | null;
  followedPlaybookId: string | null;
  profile: SetupProfile | null;
  userMemory: string | null;
  launchVersion: number;
  nudgePlayed: boolean;
  panelOpen: boolean;
  hidden: boolean;
}

type StoredSetupChecklistState = Pick<SetupChecklistState, 'completed' | 'hidden'>;

const SETUP_STORAGE_KEY = 'alva-freshman.setup-checklist.v1';

const EMPTY_COMPLETION: Record<SetupTaskId, boolean> = {
  profile: false,
  'chat-app': false,
  automation: false,
  playbook: false,
  memory: false,
};

function readStoredSetupState(): StoredSetupChecklistState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SETUP_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSetupChecklistState>;
    const completed = parsed.completed;
    if (!completed) return null;

    return {
      completed: {
        profile: Boolean(completed.profile),
        'chat-app': Boolean(completed['chat-app']),
        automation: Boolean(completed.automation),
        playbook: Boolean(completed.playbook),
        memory: Boolean(completed.memory),
      },
      hidden: Boolean(parsed.hidden),
    };
  } catch {
    return null;
  }
}

function persistSetupState(completed: Record<SetupTaskId, boolean>, hidden: boolean) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify({ completed, hidden }));
  } catch {
    // The in-memory demo still works when browser storage is unavailable.
  }
}

function taskFromHash(): SetupTaskId | null {
  if (typeof window === 'undefined') return null;
  const query = window.location.hash.split('?')[1];
  if (!query) return null;
  const task = new URLSearchParams(query).get('setupTask');
  return task === 'profile' || task === 'chat-app' || task === 'automation' || task === 'playbook' || task === 'memory'
    ? task
    : null;
}

const storedSetupState = readStoredSetupState();

let state: SetupChecklistState = {
  activeTask: taskFromHash(),
  completed: storedSetupState?.completed ?? { ...EMPTY_COMPLETION },
  connectedImId: null,
  automationId: null,
  followedPlaybookId: null,
  profile: null,
  userMemory: null,
  launchVersion: 0,
  nudgePlayed: false,
  panelOpen: false,
  hidden: storedSetupState?.hidden ?? false,
};

const listeners = new Set<() => void>();

function setState(patch: Partial<SetupChecklistState>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

export function useSetupChecklistState(): SetupChecklistState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
  );
}

export function getSetupChecklistState(): SetupChecklistState {
  return state;
}

export function setSetupPanelOpen(panelOpen: boolean) {
  setState({ panelOpen, nudgePlayed: state.nudgePlayed || panelOpen });
}

export function markSetupNudgePlayed() {
  if (state.nudgePlayed) return;
  setState({ nudgePlayed: true });
}

export function hideSetupChecklist() {
  persistSetupState(state.completed, true);
  setState({ hidden: true, nudgePlayed: true, panelOpen: false });
}

export function resetSetupChecklistPreview() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(SETUP_STORAGE_KEY);
    } catch {
      // The in-memory reset below remains sufficient for the current tab.
    }
  }
  setState({
    activeTask: null,
    completed: { ...EMPTY_COMPLETION },
    connectedImId: null,
    automationId: null,
    followedPlaybookId: null,
    profile: null,
    userMemory: null,
    launchVersion: state.launchVersion + 1,
    nudgePlayed: false,
    panelOpen: false,
    hidden: false,
  });
}

export function startSetupTask(task: SetupTaskId) {
  setState({
    activeTask: task,
    launchVersion: state.launchVersion + 1,
    nudgePlayed: true,
    panelOpen: false,
  });
}

export function completeSetupTask(
  task: SetupTaskId,
  details: Partial<Pick<SetupChecklistState, 'connectedImId' | 'automationId' | 'followedPlaybookId' | 'profile' | 'userMemory'>> = {},
) {
  const completed = { ...state.completed, [task]: true };
  const allComplete = Object.values(completed).every(Boolean);
  persistSetupState(completed, state.hidden);
  setState({
    ...details,
    activeTask: state.activeTask === task ? null : state.activeTask,
    completed,
    panelOpen: allComplete ? true : state.panelOpen,
  });

  if (typeof window === 'undefined') return;
  const [page] = window.location.hash.slice(1).split('?');
  if (!page) return;
  const currentQuery = window.location.hash.split('?')[1];
  const currentParams = new URLSearchParams(currentQuery ?? '');
  const nextParams = new URLSearchParams({ checklist: 'setup' });
  const proTrialPreview = currentParams.get('proTrial');
  if (proTrialPreview) nextParams.set('proTrial', proTrialPreview);
  window.history.replaceState(null, '', `#${page}?${nextParams.toString()}`);
}

export function isSetupChecklistEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const query = window.location.hash.split('?')[1];
  return new URLSearchParams(query ?? '').get('checklist') === 'setup';
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== SETUP_STORAGE_KEY) return;
    const stored = readStoredSetupState();
    setState({
      completed: stored?.completed ?? { ...EMPTY_COMPLETION },
      hidden: stored?.hidden ?? false,
      panelOpen: false,
    });
  });
}
