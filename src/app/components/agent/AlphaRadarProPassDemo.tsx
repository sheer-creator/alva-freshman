/**
 * [INPUT]: Official Automation, conversion plan, and lifecycle stage
 * [OUTPUT]: Gifted-Pro access demo for Alpha Radar and Portfolio Watch, plus retained pricing experiments
 * [POS]: Isolated entitlement and paid-conversion demo; separate from the generic onboarding comparison
 */

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChannelIcon } from '@/app/components/agent-channel/ChannelIcon';
import { ALPHA_RADAR_STYLES, AlphaRadarBuilder } from '@/app/components/agent/AlphaRadarBuilder';
import { PRESETS, SetupGui } from '@/app/components/agent/OnboardingPreviewDemo';
import './onboarding-preview-demo.css';

const FONT = "'Delight', sans-serif";

export type ProPassStage = 'onboarding' | 'day-1' | 'ending-soon' | 'final' | 'paused';
type ConversionPlan = 'pass' | 'intro' | 'credits' | 'im';
type OfficialAutomation = 'alpha-radar' | 'portfolio-watch';
type ProBillingCycle = 'annual' | 'monthly';
type ProCheckoutStep = 'choose' | 'processing' | 'scheduled';
type ProActivationTiming = 'after-trial' | 'immediate';

const OFFICIAL_AUTOMATIONS: Record<OfficialAutomation, {
  name: string;
  icon: 'pulse' | 'portfolio';
  sources: string;
  schedule: string;
}> = {
  'alpha-radar': {
    name: 'Alpha Radar',
    icon: 'pulse',
    sources: 'People · News · Podcasts · Earnings',
    schedule: 'Daily · 20:00 GMT+8',
  },
  'portfolio-watch': {
    name: 'Portfolio Watch',
    icon: 'portfolio',
    sources: 'Price · News · Filings · Analyst changes',
    schedule: 'Hourly · only when something matters',
  },
};

export const PRO_PASS_STAGES: { id: ProPassStage; label: string; shortLabel: string }[] = [
  { id: 'onboarding', label: 'Setup flow', shortLabel: 'Setup' },
  { id: 'day-1', label: 'Active result', shortLabel: 'Active' },
  { id: 'ending-soon', label: '24h remaining', shortLabel: '24h' },
  { id: 'final', label: 'Final gifted result', shortLabel: 'Final' },
  { id: 'paused', label: 'Access ended', shortLabel: 'Paused' },
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
  const lifecycleLabel = plan === 'intro' ? 'Paid lifecycle' : plan === 'credits' ? 'Credits to Pro' : 'Access lifecycle';
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
    time: 'Aug 19 · 2:30 PM',
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
    time: 'Aug 19 · 8:00 PM',
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

const PORTFOLIO_WATCH_PUSHES: typeof PRO_PASS_PUSHES = {
  'day-1': {
    time: 'Today · 1:42 PM',
    eyebrow: 'Portfolio alert · Thesis check complete',
    title: 'NVDA moved 4.2% — and this one matters',
    summary: 'The move is backed by a fresh hyperscaler order read-through, not just broad semiconductor beta.',
    direction: 'WATCH',
    ticker: '$NVDA',
    sources: [
      { label: 'PRICE', text: 'NVDA rose 4.2% on 1.8× normal volume while the SOX gained 1.1%.' },
      { label: 'CATALYST', text: 'A hyperscaler capex update lifted the 2027 demand floor.' },
      { label: 'THESIS', text: 'The AI infrastructure thesis strengthened; no thesis break was detected.' },
    ],
  },
  'ending-soon': {
    time: 'Aug 19 · 2:30 PM',
    eyebrow: 'Portfolio alert · Guidance changed',
    title: 'TSM guidance raised the floor for your AI basket',
    summary: 'The company lifted its AI revenue outlook while keeping gross-margin pressure contained.',
    direction: 'WATCH',
    ticker: '$TSM · $NVDA',
    sources: [
      { label: 'GUIDANCE', text: 'AI accelerator revenue is now expected to more than double.' },
      { label: 'IMPACT', text: 'The update is a positive read-through for NVDA and MU demand.' },
      { label: 'RISK', text: 'Near-term gross-margin pressure remains contained within the prior range.' },
    ],
  },
  final: {
    time: 'Aug 20 · 11:05 AM',
    eyebrow: 'Portfolio alert · Final gifted-Pro check',
    title: 'MU slipped 3.1% — your thesis is still intact',
    summary: 'The decline followed broad memory profit-taking rather than a change in supply discipline.',
    direction: 'WATCH',
    ticker: '$MU',
    sources: [
      { label: 'PRICE', text: 'MU fell 3.1%; memory peers declined by a similar amount.' },
      { label: 'THESIS', text: 'No demand, pricing, or supply-discipline assumption was invalidated.' },
      { label: 'NEXT', text: 'Watch the next pricing update before changing the position thesis.' },
    ],
  },
};

function ProPassPush({
  stage,
  scheduled,
  onKeep,
  plan,
  automation,
}: {
  stage: Exclude<ProPassStage, 'onboarding' | 'paused'>;
  scheduled: boolean;
  onKeep: () => void;
  plan: ConversionPlan;
  automation: OfficialAutomation;
}) {
  const automationConfig = OFFICIAL_AUTOMATIONS[automation];
  const push = automation === 'portfolio-watch' ? PORTFOLIO_WATCH_PUSHES[stage] : PRO_PASS_PUSHES[stage];
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
      ? { title: `Pro scheduled · ${automationConfig.name} stays on`, detail: 'Paid Pro starts Aug 20 at 14:30 GMT+8', segments: 3, urgent: false }
      : stage === 'day-1'
        ? { title: 'Gifted Pro active · 2 days left', detail: 'Ends Aug 20 at 14:30 GMT+8', segments: 2, urgent: false }
        : stage === 'ending-soon'
          ? { title: 'Gifted Pro ends tomorrow at 14:30', detail: `${automationConfig.name} pauses then · Settings stay saved`, segments: 1, urgent: true }
          : { title: 'Last result before gifted Pro ends', detail: `Ends Aug 20 at 14:30 · ${automationConfig.name} pauses then`, segments: 0, urgent: true };
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
            <span className="opd-trial-push__radar"><ChannelIcon name={automationConfig.icon} size={15} /></span>
            <div><strong>{automationConfig.name}</strong><span>{push.eyebrow}</span></div>
          </div>
          <span className="opd-trial-push__time">{automation === 'portfolio-watch' ? 'Event-driven' : '20:00 GMT+8'}</span>
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
              <span className="opd-trial-push__scheduled"><CdnIcon name="check-l1" size={12} color="currentColor" /> Starts Aug 20</span>
            ) : stage !== 'day-1' ? (
              <button type="button" onClick={onKeep}>{plan === 'intro' ? 'Review billing' : plan === 'credits' ? (stage === 'ending-soon' ? 'Keep 3,000/day with Pro' : 'Upgrade to Pro') : 'Upgrade to Pro'}</button>
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
  automation,
}: {
  scheduled: boolean;
  onKeep: () => void;
  plan: ConversionPlan;
  automation: OfficialAutomation;
}) {
  const introPrice = plan === 'intro';
  const creditsPlan = plan === 'credits';
  const automationConfig = OFFICIAL_AUTOMATIONS[automation];
  const nextRun = automation === 'portfolio-watch' ? 'Within the next hour' : 'Tomorrow · 8:00 PM';
  return (
    <ProPassMessage push label={creditsPlan ? 'Aug 18 · 8:00 PM' : introPrice ? 'Sep 13 · 12:01 AM' : 'Aug 20 · 2:30 PM'}>
      <article className="opd-trial-paused">
        <div className="opd-trial-paused__copy">
          <span className="opd-trial-paused__lock"><CdnIcon name={introPrice || scheduled ? 'check-l1' : 'locked-l'} size={16} color="currentColor" /></span>
          <div>
            <span className="opd-trial-paused__eyebrow">
              {creditsPlan ? (scheduled ? 'Pro active · 3,000 Daily Credits' : 'Balance −57 Credits') : introPrice ? 'Monthly plan renewed · $19.90 paid' : scheduled ? 'Pro active · resumed automatically' : 'Gifted Pro ended · Aug 20 at 14:30 GMT+8'}
            </span>
            <h2>{creditsPlan ? (scheduled ? 'Next run is scheduled' : 'Next run is paused') : introPrice || scheduled ? `${automationConfig.name} keeps running` : `${automationConfig.name} is paused`}</h2>
            <p>{creditsPlan ? (scheduled ? 'Pro restored 3,000 Daily Credits and kept your setup on schedule.' : 'Your last report completed in full. Upgrade to Pro to restore 3,000 Daily Credits and resume automatically.') : introPrice ? 'Your introductory month converted to the standard monthly price.' : scheduled ? `${automationConfig.name} resumed with the same schedule, settings, and delivery channel.` : 'Upgrade to Pro to resume automatically. Your settings and history are saved.'}</p>
          </div>
        </div>
        <div className="opd-trial-paused__details">
          <div><span>Sources</span><strong>{automationConfig.sources}</strong></div>
          <div><span>Schedule</span><strong>{automationConfig.schedule}</strong></div>
          <div><span>{introPrice ? 'Next billing' : 'Next report'}</span><strong>{creditsPlan ? (scheduled ? 'Tomorrow · 8:00 PM' : 'Paused until Pro') : introPrice ? 'Oct 13 · $19.90' : scheduled ? nextRun : 'Paused until Pro'}</strong></div>
        </div>
        {creditsPlan && !scheduled ? (
          <button type="button" className="opd-trial-paused__cta" onClick={onKeep}>Upgrade to Pro</button>
        ) : !creditsPlan && !introPrice && !scheduled ? (
          <button type="button" className="opd-trial-paused__cta" onClick={onKeep}>Upgrade & resume</button>
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
  plan = 'pass',
  automationName = 'Alpha Radar',
}: {
  open: boolean;
  onClose: () => void;
  onScheduled: (cycle: ProBillingCycle) => void;
  activation?: ProActivationTiming;
  plan?: ConversionPlan;
  automationName?: string;
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
  const creditsPlan = plan === 'credits';
  const pluralSubject = automationName === '2 automations';
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
              <h2 id="alpha-pro-modal-title">{startsImmediately ? `${automationName} ${pluralSubject ? 'are' : 'is'} running again` : `${automationName} will keep running`}</h2>
              <p>{creditsPlan ? 'Pro restored your 3,000 Daily Credits.' : startsImmediately ? 'Pro is active. Your saved setup resumed automatically.' : 'Paid Pro starts when gifted Pro ends.'}</p>
              <div className="alpha-pro-modal-success__detail">
                {billingCycle === 'annual' ? 'Annual Pro' : 'Monthly Pro'} · {selectedPrice}<br />
                {startsImmediately ? 'Active now · Settings and history preserved' : 'Starts Aug 20 at 14:30 GMT+8'}
              </div>
              <button type="button" onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <header className="alpha-pro-modal__header">
                <div>
                  <h2 id="alpha-pro-modal-title">{startsImmediately ? (creditsPlan ? 'Upgrade to Pro' : `Resume ${automationName}`) : `Keep ${automationName} running`}</h2>
                  <p>{creditsPlan ? 'Restore 3,000 Daily Credits and resume Alpha Radar automatically.' : startsImmediately ? `Upgrade to Pro to resume ${automationName} with the same settings.` : 'Choose a Pro plan now. Billing begins only after gifted Pro ends.'}</p>
                </div>
                <button type="button" className="alpha-pro-modal__close" onClick={closeIfReady} aria-label="Close Pro plan dialog">
                  <CdnIcon name="close-l1" size={14} color="currentColor" />
                </button>
              </header>
              <div className="alpha-pro-continuity" aria-label={creditsPlan ? 'Free Credits to Pro timeline' : 'Gifted Pro to paid Pro timeline'}>
                <div className="alpha-pro-continuity__stop"><span>Now</span><strong>{creditsPlan && startsImmediately ? '500 Daily Credits' : startsImmediately ? 'Paused' : 'Gifted Pro'}</strong></div>
                <span className="alpha-pro-continuity__line" aria-hidden="true" />
                <div className="alpha-pro-continuity__stop"><span>{startsImmediately ? 'With Pro' : 'Aug 20 · 14:30'}</span><strong>{creditsPlan && startsImmediately ? '3,000 / day' : startsImmediately ? 'Running again' : 'Paid Pro starts'}</strong></div>
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
  automation = 'alpha-radar',
}: {
  stage: ProPassStage;
  plan?: ConversionPlan;
  automation?: OfficialAutomation;
}) {
  const [proModalOpen, setProModalOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const separator = plan === 'credits'
    ? stage === 'onboarding' ? 'New-user setup' : stage === 'day-1' ? 'Aug 14' : stage === 'ending-soon' ? 'Aug 15' : stage === 'final' ? 'Aug 17' : 'Aug 18'
    : plan === 'intro'
    ? stage === 'onboarding' ? 'New-user offer' : stage === 'day-1' ? 'Aug 14' : stage === 'ending-soon' ? 'Sep 10' : stage === 'final' ? 'Sep 12' : 'Sep 13'
    : stage === 'onboarding' ? 'New-user access' : stage === 'day-1' ? 'Aug 18' : stage === 'ending-soon' ? 'Aug 19' : stage === 'final' && automation === 'alpha-radar' ? 'Aug 19' : 'Aug 20';
  const automationConfig = OFFICIAL_AUTOMATIONS[automation];
  const portfolioPreset = PRESETS.find((preset) => preset.id === 'portfolio-watch');

  return (
    <div className="opd-conversation-stage is-pro-trial">
      <div className="opd-day-separator"><span>{separator}</span></div>
      {stage === 'onboarding' ? (
        <ProPassMessage>
          {plan === 'pass' && automation === 'portfolio-watch' && portfolioPreset ? (
            <SetupGui preset={portfolioPreset} compact />
          ) : (
            <AlphaRadarBuilder preview proTrial conversionOffer={plan === 'intro' ? 'intro-price' : plan === 'credits' ? 'credits' : 'pro-pass'} />
          )}
        </ProPassMessage>
      ) : stage === 'paused' ? (
        <ProPassPaused plan={plan} automation={automation} scheduled={scheduled} onKeep={() => setProModalOpen(true)} />
      ) : (
        <ProPassPush plan={plan} automation={automation} stage={stage} scheduled={scheduled} onKeep={() => setProModalOpen(true)} />
      )}
      {stage !== 'onboarding' && (
        plan === 'intro' ? (
          <IntroPriceBillingModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
        ) : (
          <ProContinuationModal
            open={proModalOpen}
            onClose={() => setProModalOpen(false)}
            onScheduled={() => setScheduled(true)}
            activation={plan === 'credits' ? (stage !== 'ending-soon' ? 'immediate' : 'after-trial') : stage === 'paused' ? 'immediate' : 'after-trial'}
            plan={plan}
            automationName={automationConfig.name}
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
          <div><strong>Alva</strong><span>2 automations · access update</span></div>
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
                <strong>Your gifted Pro ends tomorrow at 14:30 GMT+8.</strong> Alpha Radar and Portfolio Watch will pause.<br />
                <a className="alpha-tg-text-cta" href="#upgrade-pro" onClick={(event) => { event.preventDefault(); openUpgrade(); }}>Upgrade before access ends</a>
              </p>
            </footer>
            <time>20:00</time>
          </article>

          <div className="alpha-tg-message-stack">
            <article className="alpha-tg-message alpha-tg-message--status">
              <p className="alpha-tg-message__eyebrow">Official Automations · Access status</p>
              <h3>{scheduled ? '2 automations are running' : '2 automations are paused'}</h3>
              <p>{scheduled ? 'Pro is active. Alpha Radar and Portfolio Watch resumed automatically.' : 'Gifted Pro ended. Settings, schedules, and history are saved.'}</p>
              {!scheduled && (
                <footer className="alpha-tg-message__footer">
                  <p>Upgrade to Pro to resume both automatically.</p>
                </footer>
              )}
              <time>20:01</time>
            </article>
            {!scheduled && <button className="alpha-tg-inline-button" type="button" onClick={openUpgrade}>Upgrade & resume</button>}
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
                    <strong>Your gifted Pro ends tomorrow at 14:30 GMT+8.</strong> Alpha Radar and Portfolio Watch will pause.<br />
                    <a className="alpha-dc-text-cta" href="#upgrade-pro" onClick={(event) => { event.preventDefault(); openUpgrade(); }}>Upgrade before access ends</a>
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
                <p className="alpha-dc-embed__eyebrow">OFFICIAL AUTOMATIONS · ACCESS STATUS</p>
                <h3>{scheduled ? '✅ 2 automations are running' : '⏸ 2 automations are paused'}</h3>
                <p>{scheduled ? 'Pro is active. Alpha Radar and Portfolio Watch resumed automatically.' : 'Gifted Pro ended. Settings, schedules, and history are saved.'}</p>
                {!scheduled && <footer><p>Upgrade to Pro to resume both automatically.</p></footer>}
              </div>
              {!scheduled && <button className="alpha-dc-inline-button" type="button" onClick={openUpgrade}>Upgrade & resume</button>}
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
        automationName="2 automations"
      />
    </main>
  );
}

function readExperimentState(): { stage: ProPassStage; plan: ConversionPlan; automation: OfficialAutomation } {
  const query = window.location.hash.split('?')[1] ?? '';
  const params = new URLSearchParams(query);
  const rawStage = params.get('stage');
  const stage = PRO_PASS_STAGES.some((item) => item.id === rawStage)
    ? (rawStage as ProPassStage)
    : 'onboarding';
  const rawPlan = params.get('plan');
  const plan: ConversionPlan = rawPlan === 'intro' || rawPlan === 'credits' || rawPlan === 'im' ? rawPlan : 'pass';
  const automation: OfficialAutomation = params.get('automation') === 'portfolio-watch' ? 'portfolio-watch' : 'alpha-radar';
  return { stage, plan, automation };
}

function setExperimentDeepLink(stage: ProPassStage, plan: ConversionPlan, automation: OfficialAutomation) {
  window.location.hash = `agent?preview=alpha-radar-pro-pass&plan=${plan}&automation=${automation}&stage=${stage}`;
}

export default function AlphaRadarProPassStandaloneDemo() {
  const initial = readExperimentState();
  const [stage, setStage] = useState<ProPassStage>(initial.stage);
  const [plan, setPlan] = useState<ConversionPlan>(initial.plan);
  const [automation, setAutomation] = useState<OfficialAutomation>(initial.automation);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = readExperimentState();
      setStage(next.stage);
      setPlan(next.plan);
      setAutomation(next.automation);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const changeStage = (next: ProPassStage) => {
    setStage(next);
    setExperimentDeepLink(next, plan, automation);
  };

  const changePlan = (next: ConversionPlan) => {
    setPlan(next);
    if (next === 'intro' || next === 'credits') setAutomation('alpha-radar');
    setStage('onboarding');
    setExperimentDeepLink('onboarding', next, next === 'intro' || next === 'credits' ? 'alpha-radar' : automation);
  };

  const changeAutomation = (next: OfficialAutomation) => {
    setAutomation(next);
    setPlan('pass');
    setStage('onboarding');
    setExperimentDeepLink('onboarding', 'pass', next);
  };

  return (
    <div className="onboarding-preview-demo" style={{ fontFamily: FONT }}>
      <div className="opd-demo-nav">
        <div className="opd-demo-nav__label"><span className="opd-demo-dot" />Official Automations · Access demo</div>
        <div className="opd-demo-nav__variants" role="tablist" aria-label="Conversion plans">
          <button type="button" role="tab" aria-selected={plan === 'pass' && automation === 'alpha-radar'} className={plan === 'pass' && automation === 'alpha-radar' ? 'is-active' : ''} onClick={() => changeAutomation('alpha-radar')}>
            <span>AR</span>Alpha Radar
          </button>
          <button type="button" role="tab" aria-selected={plan === 'pass' && automation === 'portfolio-watch'} className={plan === 'pass' && automation === 'portfolio-watch' ? 'is-active' : ''} onClick={() => changeAutomation('portfolio-watch')}>
            <span>PW</span>Portfolio Watch
          </button>
          <button type="button" role="tab" aria-selected={plan === 'intro'} className={plan === 'intro' ? 'is-active' : ''} onClick={() => changePlan('intro')}>
            <span>B</span>$1.99 experiment
          </button>
          <button type="button" role="tab" aria-selected={plan === 'credits'} className={plan === 'credits' ? 'is-active' : ''} onClick={() => changePlan('credits')}>
            <span>C</span>Credits experiment
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
              setExperimentDeepLink(stage, plan, automation);
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
          <AlphaRadarProPassDemo key={`${plan}-${automation}-${stage === 'onboarding' ? 'setup' : 'lifecycle'}`} plan={plan} automation={automation} stage={stage} />
        </>
      )}
    </div>
  );
}
