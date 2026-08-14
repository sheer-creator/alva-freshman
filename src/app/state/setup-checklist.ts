/**
 * [INPUT]: setup checklist task launches and successful product interactions
 * [OUTPUT]: session-only onboarding progress for the primary sidebar experience
 * [POS]: app state — survives SPA navigation, but intentionally resets on browser refresh for demo testing
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

const EMPTY_COMPLETION: Record<SetupTaskId, boolean> = {
  profile: false,
  'chat-app': false,
  automation: false,
  playbook: false,
  memory: false,
};

let state: SetupChecklistState = {
  activeTask: null,
  completed: { ...EMPTY_COMPLETION },
  connectedImId: null,
  automationId: null,
  followedPlaybookId: null,
  profile: null,
  userMemory: null,
  launchVersion: 0,
  nudgePlayed: false,
  panelOpen: false,
  hidden: false,
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
  setState({ hidden: true, nudgePlayed: true, panelOpen: false });
}

export function resetSetupChecklistPreview() {
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
  const nextParams = new URLSearchParams();
  const proTrialPreview = currentParams.get('proTrial');
  if (proTrialPreview) nextParams.set('proTrial', proTrialPreview);
  const nextQuery = nextParams.toString();
  window.history.replaceState(null, '', `#${page}${nextQuery ? `?${nextQuery}` : ''}`);
}
