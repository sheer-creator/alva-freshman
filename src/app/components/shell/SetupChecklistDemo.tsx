/**
 * [INPUT]: #agent?checklist=setup preview flag
 * [OUTPUT]: Sidebar setup sticker + anchored onboarding checklist demo
 * [POS]: Shell layer — isolated onboarding preview, mounted in place of the upgrade card
 */

import { useEffect, useRef, useState } from 'react';
import type { Page } from '@/app/App';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { channelsStore } from '@/app/state/channels';
import {
  hideSetupChecklist,
  markSetupNudgePlayed,
  resetSetupChecklistPreview,
  setSetupPanelOpen,
  startSetupTask,
  useSetupChecklistState,
  type SetupTaskId,
} from '@/app/state/setup-checklist';
import './setup-checklist-demo.css';

type SetupTask = {
  id: SetupTaskId;
  title: string;
  description: string;
  page: Page;
  reward?: string;
};

type ProTrialPreview = {
  phase: 'active' | 'ending' | 'expired';
  label: string;
  compactLabel: string;
};

const SETUP_TASKS: SetupTask[] = [
  {
    id: 'profile',
    title: 'Complete your profile',
    description: 'Update any profile detail',
    page: 'account',
  },
  {
    id: 'chat-app',
    title: 'Connect a chat app',
    description: 'Use Alva from Telegram, Discord, or Slack',
    page: 'agent',
    reward: '+3,000 Credits',
  },
  {
    id: 'automation',
    title: 'Set up an automation',
    description: 'Start with a preset workflow',
    page: 'agent',
  },
  {
    id: 'playbook',
    title: 'Subscribe to a Playbook',
    description: 'Pick one from Explore',
    page: 'explore',
  },
  {
    id: 'memory',
    title: 'Tell Alva about you',
    description: 'Share your investing style or interests',
    page: 'agent',
  },
];

function getProTrialPreview(): ProTrialPreview {
  if (typeof window === 'undefined') {
    return { phase: 'active', label: '3 days left', compactLabel: 'PRO · 3D LEFT' };
  }

  const query = window.location.hash.split('?')[1];
  const preview = new URLSearchParams(query ?? '').get('proTrial');

  if (preview === 'expired') {
    return { phase: 'expired', label: 'Upgrade', compactLabel: 'PRO ENDED' };
  }
  if (preview === 'today') {
    return { phase: 'ending', label: 'Ends today', compactLabel: 'PRO · ENDS TODAY' };
  }

  const days = preview?.match(/^(\d+)d$/)?.[1];
  if (days) {
    const dayCount = Number(days);
    return {
      phase: dayCount <= 1 ? 'ending' : 'active',
      label: `${dayCount} ${dayCount === 1 ? 'day' : 'days'} left`,
      compactLabel: `PRO · ${dayCount}D LEFT`,
    };
  }

  return { phase: 'active', label: '3 days left', compactLabel: 'PRO · 3D LEFT' };
}

function keepProTrialPreview(params: URLSearchParams) {
  if (typeof window === 'undefined') return;
  const query = window.location.hash.split('?')[1];
  const preview = new URLSearchParams(query ?? '').get('proTrial');
  if (preview) params.set('proTrial', preview);
}

function ProgressBar({ completed, compact = false }: { completed: number; compact?: boolean }) {
  return (
    <span className={`setup-checklist-progress${compact ? ' is-compact' : ''}`} aria-hidden>
      <span className="setup-checklist-progress-fill" style={{ width: `${(completed / SETUP_TASKS.length) * 100}%` }} />
    </span>
  );
}

function CompletionControl({ complete }: { complete: boolean }) {
  return (
    <span className={`setup-checklist-state${complete ? ' is-complete' : ''}`} aria-hidden>
      {complete && (
        <span className="setup-checklist-state-check">
          <CdnIcon name="check-l1" size={15} color="#ffffff" />
        </span>
      )}
    </span>
  );
}

function TaskRow({ task, complete, active, onOpen }: {
  task: SetupTask;
  complete: boolean;
  active?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`setup-checklist-row${complete ? ' is-complete' : ''}${active ? ' is-active' : ''}`}
      aria-label={`${task.title}. ${task.description}${task.reward ? `. Reward: ${task.reward}` : ''}${complete ? '. Complete' : '. Open setup flow'}`}
      onClick={onOpen}
    >
      <CompletionControl complete={complete} />
      <span className="setup-checklist-row-copy">
        <span className="setup-checklist-row-title-line">
          <span className="setup-checklist-row-title">{task.title}</span>
          {task.reward && <span className="setup-checklist-reward">{task.reward}</span>}
        </span>
        <span className="setup-checklist-row-description">{task.description}</span>
      </span>
      <CdnIcon name="arrow-right-l1" size={14} color="rgba(24,35,34,0.38)" />
    </button>
  );
}

function ProTrialInline({ trial, onUpgrade }: { trial: ProTrialPreview; onUpgrade: () => void }) {
  const expired = trial.phase === 'expired';

  return (
    <span className={`setup-checklist-trial-inline${expired ? ' is-expired' : ''}`}>
      <strong>{expired ? 'Pro ended' : 'Gifted Pro'}</strong>
      <span aria-hidden>·</span>
      {expired ? (
        <button type="button" onClick={onUpgrade}>Upgrade</button>
      ) : (
        <span className="setup-checklist-trial-countdown" aria-label={`Gifted Pro ${trial.label}`}>
          {trial.label}
        </span>
      )}
    </span>
  );
}

function ProTrialStatusSticker({ trial, onNavigate }: {
  trial: ProTrialPreview;
  onNavigate: (page: Page) => void;
}) {
  const expired = trial.phase === 'expired';

  return (
    <div className="setup-checklist-slot">
      <button
        type="button"
        className={`setup-pro-status-sticker${expired ? ' is-expired' : ''}`}
        aria-label={expired ? 'Upgrade to Pro. Your gifted Pro preview ended.' : `Gifted Pro is active. ${trial.label}. View billing.`}
        onClick={() => onNavigate(expired ? 'pricing' : 'billing')}
      >
        <span className="setup-pro-status-heading">
          <span>{expired ? 'Upgrade to Pro' : 'Gifted Pro is active'}</span>
          <CdnIcon name="arrow-right-l1" size={14} color="rgba(255,255,255,0.84)" />
        </span>
        <span className="setup-pro-status-meta">
          <span>{expired ? 'Keep your Pro benefits' : 'More credits + private Playbooks'}</span>
          {!expired && <strong>{trial.label}</strong>}
        </span>
      </button>
    </div>
  );
}

export function SetupChecklistDemo({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const setup = useSetupChecklistState();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isNudging, setIsNudging] = useState(false);
  const nudgeEligibleOnMountRef = useRef(!setup.nudgePlayed);

  const completedCount = SETUP_TASKS.filter((task) => setup.completed[task.id]).length;
  const remainingCount = SETUP_TASKS.length - completedCount;
  const allComplete = completedCount === SETUP_TASKS.length;
  const proTrial = getProTrialPreview();

  useEffect(() => {
    const resetFromHash = () => {
      const [page, query = ''] = window.location.hash.slice(1).split('?');
      const params = new URLSearchParams(query);
      if (params.get('resetSetup') !== '1') return;

      resetSetupChecklistPreview();
      params.delete('resetSetup');
      const nextQuery = params.toString();
      window.history.replaceState(null, '', `#${page}${nextQuery ? `?${nextQuery}` : ''}`);
    };

    resetFromHash();
    window.addEventListener('hashchange', resetFromHash);
    return () => window.removeEventListener('hashchange', resetFromHash);
  }, []);

  useEffect(() => {
    if (setup.hidden || allComplete) return;
    if (setup.panelOpen) {
      nudgeEligibleOnMountRef.current = false;
      return;
    }
    if (!nudgeEligibleOnMountRef.current) return;

    let finishTimer: ReturnType<typeof setTimeout> | null = null;
    const nudgeTimer = setTimeout(() => {
      nudgeEligibleOnMountRef.current = false;
      markSetupNudgePlayed();
      setIsNudging(true);
      finishTimer = setTimeout(() => setIsNudging(false), 820);
    }, 2000);

    return () => {
      clearTimeout(nudgeTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [allComplete, setup.hidden, setup.panelOpen]);

  useEffect(() => {
    if (!setup.panelOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setSetupPanelOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setSetupPanelOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [setup.panelOpen]);

  if (setup.hidden || (allComplete && !setup.panelOpen)) {
    return <ProTrialStatusSticker trial={proTrial} onNavigate={onNavigate} />;
  }

  if (allComplete) {
    return (
      <>
        <ProTrialStatusSticker trial={proTrial} onNavigate={onNavigate} />
        <div
          ref={panelRef}
          id="setup-checklist-popover"
          className="setup-checklist-popover"
          role="dialog"
          aria-modal="false"
          aria-labelledby="setup-checklist-title"
        >
          <header className="setup-checklist-header is-complete">
            <h2 id="setup-checklist-title">
              <span className="setup-checklist-title-emoji" aria-hidden>✓</span>
              You’re all set
            </h2>
            <button
              type="button"
              className="setup-checklist-close"
              aria-label="Close setup checklist"
              onClick={() => setSetupPanelOpen(false)}
            >
              <CdnIcon name="close-l1" size={16} color="rgba(24,35,34,0.58)" />
            </button>
            <p className="setup-checklist-complete-copy">
              Alva now knows your preferences and can reach you, run workflows, and keep your Playbooks close.
            </p>
            <div className="setup-checklist-header-utility">
              <ProTrialInline trial={proTrial} onUpgrade={() => onNavigate('pricing')} />
              <span aria-live="polite">{completedCount}/{SETUP_TASKS.length} complete</span>
            </div>
            <ProgressBar completed={completedCount} />
          </header>

          <div className="setup-checklist-complete-actions">
            <button type="button" className="setup-checklist-done" onClick={hideSetupChecklist}>
              Start using Alva
            </button>
            <span>This checklist won’t appear again.</span>
          </div>
        </div>
      </>
    );
  }

  const launchTask = (task: SetupTask) => {
    if (task.page === 'agent') channelsStore.setCurrent(null);
    startSetupTask(task.id);
    onNavigate(task.page);
    const params = new URLSearchParams({ checklist: 'setup', setupTask: task.id });
    keepProTrialPreview(params);
    window.history.replaceState(null, '', `#${task.page}?${params.toString()}`);
  };

  return (
    <div className="setup-checklist-slot">
      <button
        ref={triggerRef}
        type="button"
        className={`setup-checklist-sticker${setup.panelOpen ? ' is-open' : ''}${isNudging ? ' is-nudging' : ''}`}
        aria-expanded={setup.panelOpen}
        aria-controls="setup-checklist-popover"
        onClick={() => setSetupPanelOpen(!setup.panelOpen)}
      >
        <span className="setup-checklist-sticker-main">
          <span className="setup-checklist-sticker-mark" aria-hidden>
            <CdnIcon name="check-l1" size={14} color="#ffffff" />
          </span>
          <span className="setup-checklist-sticker-copy">
            <span className="setup-checklist-sticker-title">Make Alva yours</span>
            <span className="setup-checklist-sticker-meta" aria-live="polite">
              {remainingCount} {remainingCount === 1 ? 'thing' : 'things'} left
            </span>
          </span>
          <CdnIcon name="arrow-right-l1" size={14} color="rgba(255,255,255,0.92)" />
        </span>
        <span className="setup-checklist-sticker-footer">
          <ProgressBar completed={completedCount} compact />
        </span>
      </button>

      {setup.panelOpen && (
        <div
          ref={panelRef}
          id="setup-checklist-popover"
          className="setup-checklist-popover"
          role="dialog"
          aria-modal="false"
          aria-labelledby="setup-checklist-title"
        >
          <header className="setup-checklist-header">
            <h2 id="setup-checklist-title">
              <span className="setup-checklist-title-emoji" aria-hidden>👋</span>
              Let’s make Alva yours
            </h2>
            <button
              type="button"
              className="setup-checklist-close"
              aria-label="Close setup checklist"
              onClick={() => {
                setSetupPanelOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <CdnIcon name="close-l1" size={16} color="rgba(24,35,34,0.58)" />
            </button>
            <div className="setup-checklist-header-utility">
              <ProTrialInline trial={proTrial} onUpgrade={() => onNavigate('pricing')} />
              <span aria-live="polite">{completedCount}/{SETUP_TASKS.length} complete</span>
            </div>
            <ProgressBar completed={completedCount} />
          </header>

          <div className="setup-checklist-body">
            {SETUP_TASKS.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                complete={setup.completed[task.id]}
                active={setup.activeTask === task.id}
                onOpen={() => launchTask(task)}
              />
            ))}
          </div>

          <footer className="setup-checklist-footer">
            <button type="button" onClick={hideSetupChecklist}>Don’t show this again</button>
          </footer>
        </div>
      )}
    </div>
  );
}
