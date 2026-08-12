/**
 * [INPUT]: Alpha Radar conversion plan and lifecycle stage
 * [OUTPUT]: Standalone Plan A/B/C conversion demos plus a native IM push treatment
 * [POS]: Isolated paid-conversion experiment; separate from the generic onboarding comparison
 */

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChannelIcon } from '@/app/components/agent-channel/ChannelIcon';
import { ALPHA_RADAR_STYLES, AlphaRadarBuilder } from '@/app/components/agent/AlphaRadarBuilder';
import './onboarding-preview-demo.css';

const FONT = "'Delight', sans-serif";

export type ProPassStage = 'onboarding' | 'day-1' | 'ending-soon' | 'final' | 'paused';
type ConversionPlan = 'pass' | 'intro' | 'credits' | 'im';
type ProBillingCycle = 'annual' | 'monthly';
type ProCheckoutStep = 'choose' | 'processing' | 'scheduled';
type ProActivationTiming = 'after-trial' | 'immediate';

export const PRO_PASS_STAGES: { id: ProPassStage; label: string; shortLabel: string }[] = [
  { id: 'onboarding', label: 'Setup flow', shortLabel: 'Setup' },
  { id: 'day-1', label: 'Day 1 push', shortLabel: 'Day 1' },
  { id: 'ending-soon', label: '24h remaining', shortLabel: '24h' },
  { id: 'final', label: 'Final pass report', shortLabel: 'Final' },
  { id: 'paused', label: 'Pass ended', shortLabel: 'Paused' },
];

const INTRO_PRICE_STAGES: typeof PRO_PASS_STAGES = [
  { id: 'onboarding', label: 'Setup & payment', shortLabel: 'Setup' },
  { id: 'day-1', label: 'Day 1 report', shortLabel: 'Day 1' },
  { id: 'ending-soon', label: 'Before renewal', shortLabel: 'Renewal' },
  { id: 'final', label: 'Renewal reminder', shortLabel: 'Reminder' },
  { id: 'paused', label: 'Month 2 active', shortLabel: 'Month 2' },
];

const CREDITS_STAGES: typeof PRO_PASS_STAGES = [
  { id: 'onboarding', label: 'Setup flow', shortLabel: 'Setup' },
  { id: 'day-1', label: 'Trial run', shortLabel: 'Run 1' },
  { id: 'ending-soon', label: 'Trial ending', shortLabel: 'Ending' },
  { id: 'final', label: '500-Credit run', shortLabel: '500/day' },
  { id: 'paused', label: 'Next run', shortLabel: 'Next run' },
];

export function AlphaRadarProPassStageNavigator({
  stage,
  onStage,
  plan = 'pass',
}: {
  stage: ProPassStage;
  onStage: (stage: ProPassStage) => void;
  plan?: ConversionPlan;
}) {
  const stages = plan === 'intro' ? INTRO_PRICE_STAGES : plan === 'credits' ? CREDITS_STAGES : PRO_PASS_STAGES;
  const lifecycleLabel = plan === 'intro' ? 'Paid lifecycle' : plan === 'credits' ? 'Credits to Pro' : 'Pass lifecycle';
  return (
    <nav className="opd-trial-stage-nav" aria-label={`${plan} lifecycle preview`}>
      <span className="opd-trial-stage-nav__label">{lifecycleLabel}</span>
      <div role="tablist" aria-label="Conversion stages">
        {stages.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={stage === item.id}
            className={stage === item.id ? 'is-active' : ''}
            onClick={() => onStage(item.id)}
          >
            <span>{index + 1}</span>
            <span className="opd-trial-stage-nav__full">{item.label}</span>
            <span className="opd-trial-stage-nav__short">{item.shortLabel}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function AlvaAvatar({ size = 34 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-portrait.svg`}
      alt="Alva"
      className="opd-avatar"
      style={{ width: size, height: size }}
    />
  );
}

function ProPassMessage({
  children,
  push = false,
  label = 'now',
}: {
  children: ReactNode;
  push?: boolean;
  label?: string;
}) {
  return (
    <article className={`opd-native-message${push ? ' is-push' : ''}`}>
      <AlvaAvatar />
      <div className="opd-native-message__body">
        <div className="opd-native-message__meta">
          <strong>Alva</strong>
          {push && <span className="opd-pushed">Pushed</span>}
          <span>{label}</span>
        </div>
        {children}
      </div>
    </article>
  );
}

const PRO_PASS_PUSHES: Record<Exclude<ProPassStage, 'onboarding' | 'paused'>, {
  time: string;
  eyebrow: string;
  title: string;
  summary: string;
  direction: 'LONG' | 'WATCH';
  ticker: string;
  sources: { label: string; text: string }[];
}> = {
  'day-1': {
    time: 'Today · 8:00 PM',
    eyebrow: 'Daily report · 3 signals aligned',
    title: 'AI memory moved from a long-term thesis into a tradeable setup',
    summary: 'MU now has independent confirmation from supply discipline, investor positioning, and management guidance.',
    direction: 'LONG',
    ticker: '$MU',
    sources: [
      { label: 'NEWS', text: 'Micron broke ground on a $9B Japan fab while keeping near-term supply additions disciplined.' },
      { label: 'X', text: 'Four tracked investors increased conviction in memory pricing over the next four quarters.' },
      { label: 'EARNINGS', text: 'Management kept supply additions disciplined while raising the long-term AI memory outlook.' },
    ],
  },
  'ending-soon': {
    time: 'Aug 15 · 8:00 PM',
    eyebrow: 'Daily report · 4 signals aligned',
    title: 'NVDA demand strengthened before price broke out of its range',
    summary: 'Supply-chain commentary, tracked investors, and industry podcasts moved together before the range broke.',
    direction: 'LONG',
    ticker: '$NVDA',
    sources: [
      { label: 'X', text: 'Five tracked investors raised AI infrastructure exposure without chasing the latest move.' },
      { label: 'NEWS', text: 'A hyperscaler capex update raised the 2027 demand floor for accelerated compute.' },
      { label: 'PODCAST', text: 'Supply-chain guests raised the 2027 demand floor for accelerated compute.' },
    ],
  },
  final: {
    time: 'Aug 16 · 8:00 PM',
    eyebrow: 'Daily report · 3 signals aligned',
    title: 'Crypto infrastructure is confirming the BTC breakout',
    summary: 'Flows, market voices, and market-structure podcasts aligned across the infrastructure basket before the close.',
    direction: 'WATCH',
    ticker: '$COIN · $HOOD',
    sources: [
      { label: 'FLOWS', text: 'Spot ETF inflows accelerated for a third session and broadened beyond the largest vehicle.' },
      { label: 'X', text: 'Tracked crypto investors shifted from BTC-only exposure toward brokerage infrastructure.' },
      { label: 'PODCAST', text: 'Market-structure guests connected rising volumes to brokerage infrastructure demand.' },
    ],
  },
};

function ProPassPush({
  stage,
  scheduled,
  onKeep,
  plan,
}: {
  stage: Exclude<ProPassStage, 'onboarding' | 'paused'>;
  scheduled: boolean;
  onKeep: () => void;
  plan: ConversionPlan;
}) {
  const push = PRO_PASS_PUSHES[stage];
  const access = plan === 'credits'
    ? scheduled
      ? { title: 'Pro active · 3,000 Daily Credits', detail: 'Alpha Radar stays on its current schedule', segments: 0, urgent: false }
      : stage === 'day-1'
        ? { title: 'Pro trial · 3,000 Daily Credits', detail: '126 used · 2,874 left today', segments: 0, urgent: false }
        : stage === 'ending-soon'
          ? { title: 'Your Pro trial ends tomorrow', detail: 'Daily Credits drop from 3,000 to 500', segments: 0, urgent: true }
          : { title: 'Run complete · 557 Credits used', detail: 'Balance −57 · We finished this run before pausing', segments: 0, urgent: true }
    : plan === 'intro'
    ? stage === 'day-1'
      ? { title: 'First month active · $1.99 paid', detail: 'Renews Sep 13 at $19.90/month', segments: 3, urgent: false }
      : stage === 'ending-soon'
        ? { title: 'Renews in 3 days · $19.90', detail: 'Alpha Radar keeps running automatically · Cancel anytime', segments: 2, urgent: true }
        : { title: 'Renews tomorrow · $19.90', detail: 'No action needed to keep Alpha Radar running', segments: 1, urgent: true }
    : scheduled
      ? { title: 'Pro scheduled · Alpha Radar stays on', detail: 'Paid Pro starts Aug 16 at 8:00 PM', segments: 3, urgent: false }
      : stage === 'day-1'
        ? { title: 'Pro pass active · 2 days left', detail: 'Ends Aug 16 at 8:00 PM', segments: 2, urgent: false }
        : stage === 'ending-soon'
          ? { title: 'Pro pass ends tomorrow at 8:00 PM', detail: 'One report left · Then Alpha Radar pauses', segments: 1, urgent: true }
          : { title: 'Final report on your Pro pass', detail: 'Pass ends now · Alpha Radar pauses and saves your setup', segments: 0, urgent: true };
  const messageTime = plan === 'credits'
    ? stage === 'day-1' ? 'Aug 14 · 8:00 PM' : stage === 'ending-soon' ? 'Aug 15 · 8:00 PM' : 'Aug 17 · 8:00 PM'
    : plan === 'intro'
    ? stage === 'day-1' ? 'Aug 14 · 8:00 PM' : stage === 'ending-soon' ? 'Sep 10 · 8:00 PM' : 'Sep 12 · 8:00 PM'
    : push.time;
  return (
    <ProPassMessage push label={messageTime}>
      <article className={`opd-trial-push is-${stage}`}>
        <header className="opd-trial-push__header">
          <div>
            <span className="opd-trial-push__radar"><ChannelIcon name="pulse" size={15} /></span>
            <div><strong>Alpha Radar</strong><span>{push.eyebrow}</span></div>
          </div>
          <span className="opd-trial-push__time">20:00 GMT+8</span>
        </header>
        <div className="opd-trial-push__body">
          <div className="opd-trial-push__ticker">
            <span>{push.direction}</span>
            <strong>{push.ticker}</strong>
          </div>
          <h2>{push.title}</h2>
          <p>{push.summary}</p>
          <div className="opd-trial-push__sources">
            {push.sources.map((source) => (
              <div key={source.label}>
                <span>{source.label}</span>
                <p>{source.text}</p>
              </div>
            ))}
          </div>
        </div>
        <footer className={`opd-trial-push__trial${access.urgent ? ' is-urgent' : ''}`}>
          <div className="opd-trial-push__access">
            <p><strong>{access.title}</strong><span>{access.detail}</span></p>
          </div>
          <div className="opd-trial-push__actions">
            {plan === 'pass' && (
              <span className="opd-trial-push__meter" role="img" aria-label={`${access.title}. ${access.detail}`}>
                {[0, 1, 2].map((segment) => <span key={segment} className={segment < access.segments ? 'is-active' : ''} />)}
              </span>
            )}
            {plan === 'credits' && scheduled ? (
              <span className="opd-trial-push__scheduled"><CdnIcon name="check-l1" size={12} color="currentColor" /> Pro active</span>
            ) : plan === 'pass' && scheduled ? (
              <span className="opd-trial-push__scheduled"><CdnIcon name="check-l1" size={12} color="currentColor" /> Starts Aug 16</span>
            ) : stage !== 'day-1' ? (
              <button type="button" onClick={onKeep}>{plan === 'intro' ? 'Review billing' : plan === 'credits' ? (stage === 'ending-soon' ? 'Keep 3,000/day with Pro' : 'Upgrade to Pro') : 'Continue with Pro'}</button>
            ) : null}
          </div>
        </footer>
      </article>
    </ProPassMessage>
  );
}

function ProPassPaused({
  scheduled,
  onKeep,
  plan,
}: {
  scheduled: boolean;
  onKeep: () => void;
  plan: ConversionPlan;
}) {
  const introPrice = plan === 'intro';
  const creditsPlan = plan === 'credits';
  return (
    <ProPassMessage push label={creditsPlan ? 'Aug 18 · 8:00 PM' : introPrice ? 'Sep 13 · 12:01 AM' : 'Today · 8:00 PM'}>
      <article className="opd-trial-paused">
        <div className="opd-trial-paused__copy">
          <span className="opd-trial-paused__lock"><CdnIcon name={introPrice || scheduled ? 'check-l1' : 'locked-l'} size={16} color="currentColor" /></span>
          <div>
            <span className="opd-trial-paused__eyebrow">
              {creditsPlan ? (scheduled ? 'Pro active · 3,000 Daily Credits' : 'Balance −57 Credits') : introPrice ? 'Monthly plan renewed · $19.90 paid' : scheduled ? 'Pro scheduled' : 'Pro pass ended · Aug 16 at 8:00 PM'}
            </span>
            <h2>{creditsPlan ? (scheduled ? 'Next run is scheduled' : 'Next run is paused') : introPrice || scheduled ? 'Alpha Radar keeps running' : 'Alpha Radar is paused'}</h2>
            <p>{creditsPlan ? (scheduled ? 'Pro restored 3,000 Daily Credits and kept your setup on schedule.' : 'Your last report completed in full. Upgrade to Pro to restore 3,000 Daily Credits and resume automatically.') : introPrice ? 'Your introductory month converted to the standard monthly price.' : scheduled ? 'Your next daily report arrives tomorrow at 8:00 PM.' : 'Continue with Pro to receive your next report. Your setup is saved.'}</p>
          </div>
        </div>
        <div className="opd-trial-paused__details">
          <div><span>Sources</span><strong>People · News · Podcasts · Earnings</strong></div>
          <div><span>Schedule</span><strong>Daily · 20:00 GMT+8</strong></div>
          <div><span>{introPrice ? 'Next billing' : 'Next report'}</span><strong>{creditsPlan ? (scheduled ? 'Tomorrow · 8:00 PM' : 'Paused until Pro') : introPrice ? 'Oct 13 · $19.90' : scheduled ? 'Tomorrow · 8:00 PM' : 'Paused until Pro'}</strong></div>
        </div>
        {creditsPlan && !scheduled ? (
          <button type="button" className="opd-trial-paused__cta" onClick={onKeep}>Upgrade to Pro</button>
        ) : !creditsPlan && !introPrice && !scheduled ? (
          <button type="button" className="opd-trial-paused__cta" onClick={onKeep}>Continue with Pro</button>
        ) : null}
      </article>
    </ProPassMessage>
  );
}

function ProContinuationModal({
  open,
  onClose,
  onScheduled,
  activation = 'after-trial',
}: {
  open: boolean;
  onClose: () => void;
  onScheduled: (cycle: ProBillingCycle) => void;
  activation?: ProActivationTiming;
}) {
  const [billingCycle, setBillingCycle] = useState<ProBillingCycle>('annual');
  const [step, setStep] = useState<ProCheckoutStep>('choose');

  useEffect(() => {
    if (!open) return;
    setBillingCycle('annual');
    setStep('choose');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && step !== 'processing') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open, step]);

  useEffect(() => {
    if (step !== 'processing') return;
    const timer = window.setTimeout(() => {
      onScheduled(billingCycle);
      setStep('scheduled');
    }, 700);
    return () => window.clearTimeout(timer);
  }, [billingCycle, onScheduled, step]);

  if (!open) return null;

  const selectedPrice = billingCycle === 'annual' ? '$24.9/mo' : '$29.9/mo';
  const startsImmediately = activation === 'immediate';
  const closeIfReady = () => {
    if (step !== 'processing') onClose();
  };

  return createPortal(
    <>
      <style>{ALPHA_RADAR_STYLES}</style>
      <div className="alpha-pro-modal-backdrop" onMouseDown={closeIfReady}>
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="alpha-pro-modal-title"
          className="alpha-pro-modal"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {step === 'scheduled' ? (
            <div className="alpha-pro-modal-success">
              <span className="alpha-pro-modal-success__mark"><CdnIcon name="check-l1" size={22} color="currentColor" /></span>
              <h2 id="alpha-pro-modal-title">Alpha Radar will keep running</h2>
              <p>{startsImmediately ? 'Pro restored your 3,000 Daily Credits.' : 'Your Pro plan starts when your pass ends.'}</p>
              <div className="alpha-pro-modal-success__detail">
                {billingCycle === 'annual' ? 'Annual Pro' : 'Monthly Pro'} · {selectedPrice}<br />
                {startsImmediately ? 'Active now · Next run stays scheduled' : 'Starts Aug 16 at 8:00 PM'}
              </div>
              <button type="button" onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <header className="alpha-pro-modal__header">
                <div>
                  <h2 id="alpha-pro-modal-title">{startsImmediately ? 'Upgrade to Pro' : 'Keep Alpha Radar running'}</h2>
                  <p>{startsImmediately ? 'Restore 3,000 Daily Credits and resume Alpha Radar automatically.' : 'Choose a Pro plan to keep your daily reports coming after your pass ends.'}</p>
                </div>
                <button type="button" className="alpha-pro-modal__close" onClick={closeIfReady} aria-label="Close Pro plan dialog">
                  <CdnIcon name="close-l1" size={14} color="currentColor" />
                </button>
              </header>
              <div className="alpha-pro-continuity" aria-label={startsImmediately ? 'Free Credits to Pro timeline' : 'Pro pass to paid Pro timeline'}>
                <div className="alpha-pro-continuity__stop"><span>Now</span><strong>{startsImmediately ? '500 Daily Credits' : '3-day Pro pass'}</strong></div>
                <span className="alpha-pro-continuity__line" aria-hidden="true" />
                <div className="alpha-pro-continuity__stop"><span>{startsImmediately ? 'With Pro' : 'Aug 16 · 8 PM'}</span><strong>{startsImmediately ? '3,000 / day' : 'Paid Pro starts'}</strong></div>
              </div>
              <div className="alpha-pro-modal__body">
                <div className="alpha-pro-plan-list" role="group" aria-label="Choose billing cycle">
                  <button type="button" className="alpha-pro-plan" data-selected={billingCycle === 'annual'} aria-pressed={billingCycle === 'annual'} onClick={() => setBillingCycle('annual')}>
                    <span className="alpha-pro-plan__radio" aria-hidden="true" />
                    <span className="alpha-pro-plan__name"><strong>Annual Pro <span className="alpha-pro-plan__save">Save 17%</span></strong><span>Billed annually</span></span>
                    <span className="alpha-pro-plan__price"><strong>$24.9</strong><span>/ month</span></span>
                  </button>
                  <button type="button" className="alpha-pro-plan" data-selected={billingCycle === 'monthly'} aria-pressed={billingCycle === 'monthly'} onClick={() => setBillingCycle('monthly')}>
                    <span className="alpha-pro-plan__radio" aria-hidden="true" />
                    <span className="alpha-pro-plan__name"><strong>Monthly Pro</strong><span>Billed monthly</span></span>
                    <span className="alpha-pro-plan__price"><strong>$29.9</strong><span>/ month</span></span>
                  </button>
                </div>
                <p className="alpha-pro-modal__note">{startsImmediately ? 'Billing starts today. Cancel anytime.' : 'No charge today. Billing starts when your Pro pass ends.'}</p>
                <div className="alpha-pro-modal__actions">
                  <button type="button" className="alpha-pro-modal__secondary" onClick={closeIfReady}>Not now</button>
                  <button type="button" className="alpha-pro-modal__primary" disabled={step === 'processing'} onClick={() => setStep('processing')}>
                    {step === 'processing' ? (startsImmediately ? 'Upgrading…' : 'Scheduling Pro…') : `${startsImmediately ? 'Upgrade to Pro' : 'Schedule Pro'} · ${selectedPrice}`}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>,
    document.body,
  );
}

function IntroPriceBillingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <>
      <style>{ALPHA_RADAR_STYLES}</style>
      <div className="alpha-pro-modal-backdrop" onMouseDown={onClose}>
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="alpha-intro-price-modal-title"
          className="alpha-pro-modal"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <header className="alpha-pro-modal__header">
            <div>
              <h2 id="alpha-intro-price-modal-title">Alpha Radar billing</h2>
              <p>Your first-month offer automatically continues at the standard monthly price.</p>
            </div>
            <button type="button" className="alpha-pro-modal__close" onClick={onClose} aria-label="Close billing dialog">
              <CdnIcon name="close-l1" size={14} color="currentColor" />
            </button>
          </header>
          <div className="alpha-pro-continuity" aria-label="Introductory price to standard price timeline">
            <div className="alpha-pro-continuity__stop"><span>Aug 13</span><strong>$1.99 paid</strong></div>
            <span className="alpha-pro-continuity__line" aria-hidden="true" />
            <div className="alpha-pro-continuity__stop"><span>Sep 13</span><strong>$19.90 / month</strong></div>
          </div>
          <div className="alpha-pro-modal__body">
            <p className="alpha-pro-modal__note">Cancel before Sep 13 to avoid the next charge. Your reports continue until then.</p>
            <div className="alpha-pro-modal__actions">
              <button type="button" className="alpha-pro-modal__secondary" onClick={onClose}>Cancel renewal</button>
              <button type="button" className="alpha-pro-modal__primary" onClick={onClose}>Keep Alpha Radar</button>
            </div>
          </div>
        </section>
      </div>
    </>,
    document.body,
  );
}

export function AlphaRadarProPassDemo({
  stage,
  plan = 'pass',
}: {
  stage: ProPassStage;
  plan?: ConversionPlan;
}) {
  const [proModalOpen, setProModalOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const separator = plan === 'credits'
    ? stage === 'onboarding' ? 'New-user setup' : stage === 'day-1' ? 'Aug 14' : stage === 'ending-soon' ? 'Aug 15' : stage === 'final' ? 'Aug 17' : 'Aug 18'
    : plan === 'intro'
    ? stage === 'onboarding' ? 'New-user offer' : stage === 'day-1' ? 'Aug 14' : stage === 'ending-soon' ? 'Sep 10' : stage === 'final' ? 'Sep 12' : 'Sep 13'
    : stage === 'onboarding' ? 'New-user access' : stage === 'day-1' ? 'Aug 14' : stage === 'ending-soon' ? 'Aug 15' : stage === 'final' ? 'Aug 16' : 'Aug 17';

  return (
    <div className="opd-conversation-stage is-pro-trial">
      <div className="opd-day-separator"><span>{separator}</span></div>
      {stage === 'onboarding' ? (
        <ProPassMessage>
          <AlphaRadarBuilder preview proTrial conversionOffer={plan === 'intro' ? 'intro-price' : plan === 'credits' ? 'credits' : 'pro-pass'} />
        </ProPassMessage>
      ) : stage === 'paused' ? (
        <ProPassPaused plan={plan} scheduled={scheduled} onKeep={() => setProModalOpen(true)} />
      ) : (
        <ProPassPush plan={plan} stage={stage} scheduled={scheduled} onKeep={() => setProModalOpen(true)} />
      )}
      {stage !== 'onboarding' && (
        plan === 'intro' ? (
          <IntroPriceBillingModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
        ) : (
          <ProContinuationModal
            open={proModalOpen}
            onClose={() => setProModalOpen(false)}
            onScheduled={() => setScheduled(true)}
            activation={plan === 'credits' && stage !== 'ending-soon' ? 'immediate' : 'after-trial'}
          />
        )
      )}
    </div>
  );
}

function ProPassAgentHeader() {
  return (
    <>
      <div className="opd-agent-header">
        <div className="opd-agent-identity">
          <AlvaAvatar size={32} />
          <div>
            <div className="opd-agent-title"><strong>Alva</strong></div>
            <p>Your AI investing agent. Research markets, build Playbooks, or set up automations that watch the market for you.</p>
          </div>
        </div>
        <div className="opd-agent-actions">
          <button type="button">Connect Portfolio</button>
          <button type="button" className="is-primary">Connect IM</button>
          <button type="button" aria-label="Settings"><CdnIcon name="settings-l" size={15} color="currentColor" /></button>
        </div>
      </div>
      <div className="opd-agent-tabs">
        {[
          ['chat-l1', 'Chat'],
          ['step-l', 'Tasks'],
          ['notification-l', 'Alerts'],
          ['brain-l', 'Memory'],
          ['folder-l', 'Files'],
        ].map(([icon, label], index) => (
          <button key={label} className={index === 0 ? 'is-active' : ''} type="button">
            <CdnIcon name={icon} size={15} color="currentColor" />
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

function AlphaRadarImNativeDemo() {
  const [proModalOpen, setProModalOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [channel, setChannel] = useState<'telegram' | 'discord'>('telegram');

  const openUpgrade = () => setProModalOpen(true);

  const telegramPreview = (
    <section className="alpha-im-window alpha-im-window--telegram" aria-label="Telegram native message preview">
      <aside className="alpha-tg-sidebar" aria-label="Telegram chats">
        <div className="alpha-tg-sidebar__toolbar">
          <button type="button" aria-label="Telegram menu">☰</button>
          <strong>Telegram</strong>
          <button type="button" aria-label="Search chats">⌕</button>
        </div>
        <div className="alpha-tg-search">Search</div>
        <div className="alpha-tg-chat is-active">
          <AlvaAvatar size={44} />
          <div><strong>Alva</strong><span>Alpha Radar · next run paused</span></div>
          <time>20:00</time>
        </div>
        <div className="alpha-tg-chat">
          <span className="alpha-tg-chat__avatar">M</span>
          <div><strong>Market Signals</strong><span>3 unread messages</span></div>
          <time>19:42</time>
        </div>
      </aside>

      <section className="alpha-tg-conversation">
        <header className="alpha-tg-header">
          <AlvaAvatar size={38} />
          <div><strong>Alva</strong><span>bot</span></div>
          <div className="alpha-tg-header__actions" aria-hidden="true"><span>⌕</span><span>⋮</span></div>
        </header>
        <div className="alpha-tg-thread">
          <div className="alpha-tg-date">Today</div>
          <article className="alpha-tg-message">
            <p className="alpha-tg-message__eyebrow">Alpha Radar · 3 signals aligned</p>
            <h2>LONG · $NVDA</h2>
            <h3>AI infrastructure demand strengthened before the breakout</h3>
            <p>Tracked investors, news, and industry podcasts moved together before price left its range.</p>
            <p className="alpha-tg-message__signal"><strong>News</strong> Hyperscaler capex raised the demand floor for accelerated compute.</p>
            <p className="alpha-tg-message__signal"><strong>People</strong> Five tracked investors increased AI infrastructure exposure.</p>
            <footer className="alpha-tg-message__footer">
              <p>
                <strong>Your Pro trial ends tomorrow.</strong> Daily Credits drop from 3,000 to 500.<br />
                <a className="alpha-tg-text-cta" href="#upgrade-pro" onClick={(event) => { event.preventDefault(); openUpgrade(); }}>Keep 3,000/day with Pro</a>
              </p>
            </footer>
            <time>20:00</time>
          </article>

          <div className="alpha-tg-message-stack">
            <article className="alpha-tg-message alpha-tg-message--status">
              <p className="alpha-tg-message__eyebrow">Alpha Radar · Run status</p>
              <h3>{scheduled ? 'Next run is scheduled' : 'Next run is paused'}</h3>
              <p>{scheduled ? 'Pro restored 3,000 Daily Credits. Alpha Radar continues tomorrow at 8:00 PM.' : 'Your last report completed in full. Balance −57 Credits.'}</p>
              {!scheduled && (
                <footer className="alpha-tg-message__footer">
                  <p>Restore 3,000 Daily Credits and resume automatically.</p>
                </footer>
              )}
              <time>20:01</time>
            </article>
            {!scheduled && <button className="alpha-tg-inline-button" type="button" onClick={openUpgrade}>Upgrade to Pro</button>}
          </div>
        </div>
        <div className="alpha-tg-composer"><span>＋</span><p>Message</p><span>☺</span><span>🎙</span></div>
      </section>
    </section>
  );

  const discordPreview = (
    <section className="alpha-im-window alpha-im-window--discord" aria-label="Discord native message preview">
      <aside className="alpha-dc-servers" aria-label="Discord servers">
        <div className="alpha-dc-server alpha-dc-server--home">◉</div>
        <span />
        <div className="alpha-dc-server is-active">A</div>
        <div className="alpha-dc-server">M</div>
        <div className="alpha-dc-server alpha-dc-server--add">＋</div>
      </aside>
      <aside className="alpha-dc-sidebar" aria-label="Discord channels">
        <header>ALVA SIGNALS <span>⌄</span></header>
        <div className="alpha-dc-category">TEXT CHANNELS <span>＋</span></div>
        <div className="alpha-dc-channel is-active"><span>#</span>alpha-radar</div>
        <div className="alpha-dc-channel"><span>#</span>market-chat</div>
        <div className="alpha-dc-channel"><span>#</span>watchlists</div>
        <div className="alpha-dc-profile"><AlvaAvatar size={30} /><div><strong>Leo</strong><span>Online</span></div><b>⚙</b></div>
      </aside>

      <section className="alpha-dc-conversation">
        <header className="alpha-dc-header"><span>#</span><strong>alpha-radar</strong><i />Automated market signals</header>
        <div className="alpha-dc-thread">
          <div className="alpha-dc-date"><span>August 13, 2026</span></div>
          <article className="alpha-dc-message">
            <AlvaAvatar size={40} />
            <div className="alpha-dc-message__content">
              <header><strong>Alva</strong><span className="alpha-dc-app">APP</span><time>Today at 8:00 PM</time></header>
              <div className="alpha-dc-embed">
                <p className="alpha-dc-embed__eyebrow">ALPHA RADAR · 3 SIGNALS ALIGNED</p>
                <h2>🟢 LONG · $NVDA</h2>
                <h3>AI infrastructure demand strengthened before the breakout</h3>
                <p>Tracked investors, news, and industry podcasts moved together before price left its range.</p>
                <div className="alpha-dc-fields"><p><strong>NEWS</strong>Hyperscaler capex raised the demand floor for accelerated compute.</p><p><strong>PEOPLE</strong>Five tracked investors increased AI infrastructure exposure.</p></div>
                <footer>
                  <p>
                    <strong>Your Pro trial ends tomorrow.</strong> Daily Credits drop from 3,000 to 500.<br />
                    <a className="alpha-dc-text-cta" href="#upgrade-pro" onClick={(event) => { event.preventDefault(); openUpgrade(); }}>Keep 3,000/day with Pro</a>
                  </p>
                </footer>
              </div>
            </div>
          </article>

          <article className="alpha-dc-message">
            <AlvaAvatar size={40} />
            <div className="alpha-dc-message__content">
              <header><strong>Alva</strong><span className="alpha-dc-app">APP</span><time>Today at 8:01 PM</time></header>
              <div className="alpha-dc-embed alpha-dc-embed--status">
                <p className="alpha-dc-embed__eyebrow">ALPHA RADAR · RUN STATUS</p>
                <h3>{scheduled ? '✅ Next run is scheduled' : '⏸ Next run is paused'}</h3>
                <p>{scheduled ? 'Pro restored 3,000 Daily Credits. Alpha Radar continues tomorrow at 8:00 PM.' : 'Your last report completed in full. Balance −57 Credits.'}</p>
                {!scheduled && <footer><p>Restore 3,000 Daily Credits and resume automatically.</p></footer>}
              </div>
              {!scheduled && <button className="alpha-dc-inline-button" type="button" onClick={openUpgrade}>Upgrade to Pro</button>}
            </div>
          </article>
        </div>
        <div className="alpha-dc-composer"><span>＋</span><p>Message #alpha-radar</p><span>GIF</span><span>☺</span></div>
      </section>
    </section>
  );

  return (
    <main className="alpha-im-preview" aria-label="Native IM Alpha Radar conversion preview">
      <div className="alpha-im-channel-switcher" role="tablist" aria-label="Native IM channels">
        <button type="button" role="tab" aria-selected={channel === 'telegram'} className={channel === 'telegram' ? 'is-active' : ''} onClick={() => setChannel('telegram')}>
          <span className="alpha-im-channel-switcher__telegram">➤</span>Telegram
        </button>
        <button type="button" role="tab" aria-selected={channel === 'discord'} className={channel === 'discord' ? 'is-active' : ''} onClick={() => setChannel('discord')}>
          <span className="alpha-im-channel-switcher__discord">⌁</span>Discord
        </button>
      </div>

      {channel === 'telegram' ? telegramPreview : discordPreview}

      <div className="alpha-im-legend" aria-label="IM CTA treatment notes">
        <div><span>01</span><p><strong>Text CTA</strong> for an early reminder that should stay secondary to the report.</p></div>
        <div><span>02</span><p><strong>Inline Button</strong> when the next run is blocked and one clear action is required.</p></div>
      </div>

      <ProContinuationModal
        open={proModalOpen}
        onClose={() => setProModalOpen(false)}
        onScheduled={() => setScheduled(true)}
        activation="immediate"
      />
    </main>
  );
}

function readExperimentState(): { stage: ProPassStage; plan: ConversionPlan } {
  const query = window.location.hash.split('?')[1] ?? '';
  const params = new URLSearchParams(query);
  const rawStage = params.get('stage');
  const stage = PRO_PASS_STAGES.some((item) => item.id === rawStage)
    ? (rawStage as ProPassStage)
    : 'onboarding';
  const rawPlan = params.get('plan');
  const plan: ConversionPlan = rawPlan === 'intro' || rawPlan === 'credits' || rawPlan === 'im' ? rawPlan : 'pass';
  return { stage, plan };
}

function setExperimentDeepLink(stage: ProPassStage, plan: ConversionPlan) {
  window.location.hash = `agent?preview=alpha-radar-pro-pass&plan=${plan}&stage=${stage}`;
}

export default function AlphaRadarProPassStandaloneDemo() {
  const initial = readExperimentState();
  const [stage, setStage] = useState<ProPassStage>(initial.stage);
  const [plan, setPlan] = useState<ConversionPlan>(initial.plan);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = readExperimentState();
      setStage(next.stage);
      setPlan(next.plan);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const changeStage = (next: ProPassStage) => {
    setStage(next);
    setExperimentDeepLink(next, plan);
  };

  const changePlan = (next: ConversionPlan) => {
    setPlan(next);
    setStage('onboarding');
    setExperimentDeepLink('onboarding', next);
  };

  return (
    <div className="onboarding-preview-demo" style={{ fontFamily: FONT }}>
      <div className="opd-demo-nav">
        <div className="opd-demo-nav__label"><span className="opd-demo-dot" />Alpha Radar · Conversion demo</div>
        <div className="opd-demo-nav__variants" role="tablist" aria-label="Conversion plans">
          <button type="button" role="tab" aria-selected={plan === 'pass'} className={plan === 'pass' ? 'is-active' : ''} onClick={() => changePlan('pass')}>
            <span>A</span>3-day Pro pass
          </button>
          <button type="button" role="tab" aria-selected={plan === 'intro'} className={plan === 'intro' ? 'is-active' : ''} onClick={() => changePlan('intro')}>
            <span>B</span>$1.99 first month
          </button>
          <button type="button" role="tab" aria-selected={plan === 'credits'} className={plan === 'credits' ? 'is-active' : ''} onClick={() => changePlan('credits')}>
            <span>C</span>Credits → Pro
          </button>
          <button type="button" role="tab" aria-selected={plan === 'im'} className={plan === 'im' ? 'is-active' : ''} onClick={() => changePlan('im')}>
            <span>IM</span>Native message
          </button>
        </div>
        <button
          type="button"
          className="opd-copy-link"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            } catch {
              setExperimentDeepLink(stage, plan);
            }
          }}
        >
          <CdnIcon name={copied ? 'check-l1' : 'link-l'} size={13} color="currentColor" />
          {copied ? 'Copied' : 'Copy deeplink'}
        </button>
      </div>
      {plan === 'im' ? (
        <AlphaRadarImNativeDemo />
      ) : (
        <>
          <AlphaRadarProPassStageNavigator plan={plan} stage={stage} onStage={changeStage} />
          <ProPassAgentHeader />
          <AlphaRadarProPassDemo key={`${plan}-${stage === 'onboarding' ? 'setup' : 'lifecycle'}`} plan={plan} stage={stage} />
        </>
      )}
    </div>
  );
}
