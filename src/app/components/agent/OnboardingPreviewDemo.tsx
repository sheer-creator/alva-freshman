/**
 * [INPUT]: #agent?preview=<variant>&preset=<preset> deep links
 * [OUTPUT]: Five comparable onboarding-preview demos grounded in the current Agent shell
 * [POS]: Design-only branch of AgentDesign; does not mutate the production onboarding flow
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { CdnIcon } from '@/app/components/shared/CdnIcon';
import { ChannelIcon } from '@/app/components/agent-channel/ChannelIcon';
import { TextBlock } from '@/app/components/alva-chat/TextBlock';
import { FeedAlertCard, FeedDetailModal } from '@/app/components/community/FeedDetailModal';
import type { PushCardData } from '@/app/components/shared/AutomationCard';
import { AutomationSourceChip } from '@/app/components/agent/AutomationSourceChip';
import { AlphaRadarBuilder } from '@/app/components/agent/AlphaRadarBuilder';
import { UserMessage } from '@/app/components/alva-chat/UserMessage';
import './onboarding-preview-demo.css';

const FONT = "'Delight', sans-serif";

export type OnboardingPreviewVariant = 'inline' | 'value-card' | 'conversation' | 'channel' | 'stream';
type PresetId = 'portfolio-watch' | 'alpha-radar' | 'smart-screener';

interface Preset {
  id: PresetId;
  name: string;
  shortName: string;
  description: string;
  icon: 'portfolio' | 'pulse' | 'screener';
  tone: 'teal' | 'amber' | 'blue';
  sampleTitle: string;
  sampleSummary: string;
  sampleTime: string;
  evidence: { icon: 'chat' | 'search' | 'trend' | 'alert'; source: string; text: string }[];
  focusLabel: string;
  focusValues: string[];
  sourceValues: string[];
  cadence: string;
}

interface PreviewExample {
  time: string;
  title: string;
  summary: string;
  evidence: { source: string; text: string }[];
}

const PRESETS: Preset[] = [
  {
    id: 'portfolio-watch',
    name: 'Watch your portfolio 24/7',
    shortName: 'Portfolio Watch',
    description: 'Catch the moves, risks, and catalysts that actually change the story across your holdings.',
    icon: 'portfolio',
    tone: 'teal',
    sampleTitle: 'NVDA moved 4.2% — and this one matters',
    sampleSummary: 'The move is backed by a fresh hyperscaler order read-through, not just broad semiconductor beta.',
    sampleTime: 'Today · 1:42 PM ET',
    evidence: [
      { icon: 'trend', source: 'Price', text: 'NVDA +4.2% on 1.8× normal volume; SOX +1.1%.' },
      { icon: 'search', source: 'Catalyst', text: 'A new hyperscaler capex guide lifted the 2027 demand floor.' },
      { icon: 'alert', source: 'Your thesis', text: 'Supports the AI infrastructure leg; no thesis break detected.' },
    ],
    focusLabel: 'Holdings to watch',
    focusValues: ['NVDA', 'MU', 'TSM'],
    sourceValues: ['Price & volume', 'News & filings', 'Analyst changes'],
    cadence: 'Check hourly',
  },
  {
    id: 'alpha-radar',
    name: 'Track X, news & technicals for alpha',
    shortName: 'Alpha Radar',
    description: 'See where market voices, fresh news, and chart evidence line up before the story gets crowded.',
    icon: 'pulse',
    tone: 'amber',
    sampleTitle: 'AI memory setup just moved from thesis to trade',
    sampleSummary: 'Three independent signals now point the same way on MU: supply tightness, rising conviction, and a clean technical trigger.',
    sampleTime: 'Today · 8:00 AM ET',
    evidence: [
      { icon: 'search', source: 'News', text: 'Micron broke ground on a $9B Japan fab expansion.' },
      { icon: 'chat', source: 'X voices', text: '4 of 7 tracked investors raised conviction in the memory cycle.' },
      { icon: 'trend', source: 'Technical', text: 'Golden cross confirmed; volume reached 1.3× the 20-day average.' },
    ],
    focusLabel: 'Themes to track',
    focusValues: ['AI memory', 'Semiconductors', 'Data centers'],
    sourceValues: ['X voices', 'Market news', 'Technical setups'],
    cadence: 'Daily at 8:00 AM ET',
  },
  {
    id: 'smart-screener',
    name: 'Screen the market on your rules',
    shortName: 'Smart Screener',
    description: 'Turn an investing thesis into a recurring market scan and hear only when a new name qualifies.',
    icon: 'screener',
    tone: 'blue',
    sampleTitle: '2 new names entered your quality-momentum screen',
    sampleSummary: 'VRT and ANET passed every rule today; both are new versus yesterday’s run.',
    sampleTime: 'Today · 4:15 PM ET',
    evidence: [
      { icon: 'search', source: 'Fundamental', text: 'Revenue growth >25% and positive EPS revisions.' },
      { icon: 'trend', source: 'Price action', text: 'Above the 50-day with relative strength improving.' },
      { icon: 'alert', source: 'What changed', text: 'VRT and ANET are new entrants; 8 prior matches held.' },
    ],
    focusLabel: 'Screen rules',
    focusValues: ['Revenue >25%', 'EPS revisions ↑', 'Above 50D'],
    sourceValues: ['Fundamentals', 'Price action', 'Estimate revisions'],
    cadence: 'Weekdays at 4:15 PM ET',
  },
];

const PREVIEW_EXTRA_EXAMPLES: Record<PresetId, PreviewExample[]> = {
  'portfolio-watch': [
    {
      time: 'Yesterday · 10:06 AM ET',
      title: 'TSM guidance raised the floor for your AI basket',
      summary: 'The company lifted its AI revenue outlook while keeping gross-margin pressure contained.',
      evidence: [
        { source: 'Guidance', text: 'AI accelerator revenue is now expected to more than double.' },
        { source: 'Portfolio impact', text: 'Positive read-through for NVDA and MU demand.' },
      ],
    },
    {
      time: 'Monday · 3:36 PM ET',
      title: 'MU slipped 3.1% — your thesis is still intact',
      summary: 'The decline followed broad memory profit-taking rather than a change in supply discipline.',
      evidence: [
        { source: 'Price', text: 'MU -3.1%; memory peers fell by a similar amount.' },
        { source: 'Thesis check', text: 'No demand or pricing assumption was invalidated.' },
      ],
    },
  ],
  'alpha-radar': [
    {
      time: 'Yesterday · 2:18 PM ET',
      title: 'NVDA demand strengthened before price reacted',
      summary: 'Supply-chain commentary and tracked investors moved together while the stock held its range.',
      evidence: [
        { source: 'X voices', text: '5 tracked investors increased AI infrastructure exposure.' },
        { source: 'Technical', text: 'Price held the 20-day average on declining sell volume.' },
      ],
    },
    {
      time: 'Monday · 9:10 AM ET',
      title: 'Crypto infrastructure is confirming the BTC breakout',
      summary: 'Flows, market voices, and relative strength aligned across the infrastructure basket.',
      evidence: [
        { source: 'Flows', text: 'Spot ETF inflows accelerated for a third session.' },
        { source: 'Relative strength', text: 'COIN and HOOD both cleared their prior swing highs.' },
      ],
    },
  ],
  'smart-screener': [
    {
      time: 'Yesterday · 4:15 PM ET',
      title: 'One name left the screen; eight still qualify',
      summary: 'APP fell below the trend rule after a sharp reversal, while the remaining matches held.',
      evidence: [
        { source: 'Exit', text: 'APP closed below its 50-day moving average.' },
        { source: 'Still qualifying', text: 'Eight names retained positive estimate revisions.' },
      ],
    },
    {
      time: 'Monday · 4:15 PM ET',
      title: 'CEG entered your quality-growth screen',
      summary: 'The stock cleared every rule after consensus estimates moved higher.',
      evidence: [
        { source: 'Fundamental', text: 'Forward EPS revisions turned positive.' },
        { source: 'Price action', text: 'Relative strength reached a new 60-day high.' },
      ],
    },
  ],
};

const VARIANTS: { id: OnboardingPreviewVariant; number: string; label: string }[] = [
  { id: 'inline', number: '1', label: 'Inline preview' },
  { id: 'value-card', number: '2', label: 'Value card' },
  { id: 'conversation', number: '3', label: 'Native message' },
  { id: 'channel', number: '4', label: 'New channel' },
  { id: 'stream', number: '5', label: 'Streamed flow' },
];

function readHashState(): { variant: OnboardingPreviewVariant; presetId: PresetId } {
  const query = window.location.hash.split('?')[1] ?? '';
  const params = new URLSearchParams(query);
  const rawVariant = params.get('preview');
  const rawPreset = params.get('preset');
  const variant = VARIANTS.some((item) => item.id === rawVariant)
    ? (rawVariant as OnboardingPreviewVariant)
    : 'inline';
  const presetId = PRESETS.some((item) => item.id === rawPreset)
    ? (rawPreset as PresetId)
    : 'alpha-radar';
  return { variant, presetId };
}

function setDeepLink(variant: OnboardingPreviewVariant, presetId: PresetId) {
  window.location.hash = `agent?preview=${variant}&preset=${presetId}`;
}

function AlvaAvatar({ size = 28 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-portrait.svg`}
      alt="Alva"
      className="opd-avatar"
      style={{ width: size, height: size }}
    />
  );
}

function DemoNavigator({
  variant,
  presetId,
  onVariant,
}: {
  variant: OnboardingPreviewVariant;
  presetId: PresetId;
  onVariant: (variant: OnboardingPreviewVariant) => void;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="opd-demo-nav">
      <div className="opd-demo-nav__label">
        <span className="opd-demo-dot" />
        Onboarding preview demos
      </div>
      <div className="opd-demo-nav__variants" role="tablist" aria-label="Preview demo variants">
        {VARIANTS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={variant === item.id}
            className={variant === item.id ? 'is-active' : ''}
            onClick={() => onVariant(item.id)}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
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
            setDeepLink(variant, presetId);
          }
        }}
      >
        <CdnIcon name={copied ? 'check-l1' : 'link-l'} size={13} color="currentColor" />
        {copied ? 'Copied' : 'Copy deeplink'}
      </button>
    </div>
  );
}

function AgentHeader({ channel, preset }: { channel?: boolean; preset: Preset }) {
  return (
    <>
      <div className={`opd-agent-header${channel ? ' is-channel' : ''}`}>
        <div className="opd-agent-identity">
          {channel ? (
            <span className={`opd-channel-mark tone-${preset.tone}`}>
              <ChannelIcon name="hash" size={17} />
            </span>
          ) : (
            <AlvaAvatar size={32} />
          )}
          <div>
            <div className="opd-agent-title">
              <strong>{channel ? preset.id : 'Alva'}</strong>
              {channel && <span>Preset channel</span>}
            </div>
            <p>
              {channel
                ? `${preset.shortName} keeps its setup, messages, and future alerts in one focused channel.`
                : 'Your AI investing agent. Research markets, build Playbooks, or set up automations that watch the market for you.'}
            </p>
          </div>
        </div>
        <div className="opd-agent-actions">
          {!channel && <button type="button">Connect Portfolio</button>}
          <button type="button" className={channel ? '' : 'is-primary'}>
            {channel ? <ChannelIcon name="portfolio" size={14} /> : null}
            {channel ? '1 member' : 'Connect IM'}
          </button>
          <button type="button" aria-label="Settings">
            <CdnIcon name="settings-l" size={15} color="currentColor" />
          </button>
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

function PresetIcon({ preset, size = 32 }: { preset: Preset; size?: number }) {
  return (
    <span className={`opd-preset-icon tone-${preset.tone}`} style={{ width: size, height: size }}>
      <ChannelIcon name={preset.icon} size={Math.round(size * 0.5)} />
    </span>
  );
}

function EvidenceList({ preset, compact = false }: { preset: Preset; compact?: boolean }) {
  return (
    <div className={`opd-evidence-list${compact ? ' is-compact' : ''}`}>
      {preset.evidence.map((item) => (
        <div className="opd-evidence-row" key={item.source}>
          <span className="opd-evidence-icon">
            <ChannelIcon name={item.icon} size={14} />
          </span>
          <span className="opd-evidence-source">{item.source}</span>
          <span className="opd-evidence-text">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function SampleContent({ preset, compact = false }: { preset: Preset; compact?: boolean }) {
  return (
    <div className={`opd-sample-content${compact ? ' is-compact' : ''}`}>
      <div className="opd-sample-kicker">
        <span>Sample</span>
        <span>{preset.sampleTime}</span>
        <span>{preset.shortName}</span>
      </div>
      <h3>{preset.sampleTitle}</h3>
      <p>{preset.sampleSummary}</p>
      <EvidenceList preset={preset} compact={compact} />
      <div className="opd-sample-footer">
        <span>
          <ChannelIcon name="alert" size={13} />
          Why you got this
        </span>
        <span>3 signals aligned · high confidence</span>
      </div>
    </div>
  );
}

function buildSampleMarkdown(
  preset: Preset,
  evidenceCount = preset.evidence.length,
  complete = true,
) {
  const sections = [
    `### ${preset.sampleTitle}`,
    preset.sampleSummary,
  ];

  if (evidenceCount > 0) {
    sections.push(
      [
        '**What changed**',
        ...preset.evidence
          .slice(0, evidenceCount)
          .map((item) => `- **${item.source}:** ${item.text}`),
      ].join('\n'),
    );
  }

  if (complete) {
    sections.push('> **Why you got this:** 3 independent signals aligned with high confidence.');
  }

  return sections.join('\n\n');
}

function MarkdownSampleContent({ preset }: { preset: Preset }) {
  return (
    <div className="opd-native-markdown">
      <TextBlock content={buildSampleMarkdown(preset)} />
    </div>
  );
}

function NativeMessage({
  preset,
  children,
  push = false,
  label,
}: {
  preset: Preset;
  children?: React.ReactNode;
  push?: boolean;
  label?: string;
}) {
  return (
    <article className={`opd-native-message${push ? ' is-push' : ''}`}>
      <AlvaAvatar size={34} />
      <div className="opd-native-message__body">
        <div className="opd-native-message__meta">
          <strong>Alva</strong>
          {push && <span className="opd-pushed">Pushed</span>}
          <span>{label ?? 'now'}</span>
        </div>
        {children ?? (
          <MarkdownSampleContent preset={preset} />
        )}
      </div>
    </article>
  );
}

function SetupGui({
  preset,
  channel,
  compact = false,
  minimal = false,
}: {
  preset: Preset;
  channel?: boolean;
  compact?: boolean;
  minimal?: boolean;
}) {
  const [focus, setFocus] = useState(preset.focusValues);
  const [sources, setSources] = useState(() => new Set(preset.sourceValues));
  const [cadence, setCadence] = useState(preset.cadence);
  const [delivery, setDelivery] = useState(channel ? 'This channel' : 'Alva + Telegram');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    setFocus(preset.focusValues);
    setSources(new Set(preset.sourceValues));
    setCadence(preset.cadence);
    setCreated(false);
  }, [preset]);

  const toggleSource = (source: string) => {
    setSources((current) => {
      const next = new Set(current);
      if (next.has(source)) next.delete(source);
      else next.add(source);
      return next;
    });
    setCreated(false);
  };

  return (
    <form
      className={`opd-setup-gui${compact ? ' is-compact' : ''}${minimal ? ' is-minimal' : ''}${created ? ' is-created' : ''}`}
      onSubmit={(event) => {
        event.preventDefault();
        setCreated(true);
      }}
    >
      <div className="opd-setup-heading">
        {minimal ? (
          <h3>{preset.shortName}</h3>
        ) : (
          <>
            <div>
              <span>{channel ? 'Finish setup in this channel' : 'Make this preset yours'}</span>
              <h3>{preset.shortName}</h3>
            </div>
            <span className="opd-setup-progress">4 fields · about 30 sec</span>
          </>
        )}
      </div>

      <div className="opd-setup-row">
        <label>{preset.focusLabel}</label>
        <div className="opd-token-field">
          {focus.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFocus((current) => current.filter((item) => item !== value));
                setCreated(false);
              }}
            >
              {value}
              <CdnIcon name="close-l1" size={10} color="currentColor" />
            </button>
          ))}
          <button
            type="button"
            className="is-add"
            onClick={() => {
              setFocus((current) => (current.includes('Add another') ? current : [...current, 'Add another']));
              setCreated(false);
            }}
          >
            <CdnIcon name="add-l1" size={12} color="currentColor" />
            Add
          </button>
        </div>
      </div>

      <div className="opd-setup-row">
        <label>Evidence sources</label>
        <div className="opd-toggle-grid">
          {preset.sourceValues.map((source) => (
            <button
              type="button"
              aria-pressed={sources.has(source)}
              className={sources.has(source) ? 'is-active' : ''}
              key={source}
              onClick={() => toggleSource(source)}
            >
              <span className="opd-checkbox">
                {sources.has(source) && <CdnIcon name="check-l1" size={10} color="#fff" />}
              </span>
              {source}
            </button>
          ))}
        </div>
      </div>

      <div className="opd-setup-row is-split">
        <label>
          Run
          <select
            aria-label="Run cadence"
            value={cadence}
            onChange={(event) => {
              setCadence(event.target.value);
              setCreated(false);
            }}
          >
            <option>{preset.cadence}</option>
            <option>Real-time when signals align</option>
            <option>Weekdays at 4:15 PM ET</option>
          </select>
        </label>
        <label>
          Deliver to
          <select
            aria-label="Delivery destination"
            value={delivery}
            onChange={(event) => {
              setDelivery(event.target.value);
              setCreated(false);
            }}
          >
            {channel && <option>This channel</option>}
            <option>Alva + Telegram</option>
            <option>Alva only</option>
            <option>Discord</option>
          </select>
        </label>
      </div>

      <div className="opd-setup-actions">
        {!minimal && (
          <div>
            <ChannelIcon name="alert" size={14} />
            <span>Quiet by default. Alva sends only when the evidence clears your threshold.</span>
          </div>
        )}
        <button type="submit" className="opd-primary-action">
          {created ? (
            <>
              <CdnIcon name="check-l1" size={13} color="#fff" />
              {channel ? 'Live in this channel' : `${preset.shortName} created`}
            </>
          ) : (
            channel ? 'Activate in this channel' : `Create ${preset.shortName}`
          )}
        </button>
      </div>
    </form>
  );
}

function IntroCopy() {
  return (
    <div className="opd-intro-copy">
      <p>Hey, I’m Alva, your AI investing agent.</p>
      <p>
        Start with a preset. Preview the exact kind of result first, then decide if it is worth setting up.
      </p>
    </div>
  );
}

function InlineVariant({
  preset,
  onPreset,
  onContinue,
}: {
  preset: Preset;
  onPreset: (presetId: PresetId) => void;
  onContinue: () => void;
}) {
  return (
    <div className="opd-conversation-stage is-inline">
      <NativeMessage preset={preset} label="">
        <IntroCopy />
        <div className="opd-preset-list">
          {PRESETS.map((item) => {
            const active = item.id === preset.id;
            return (
              <div className={`opd-inline-preset${active ? ' is-open' : ''}`} key={item.id}>
                <button
                  type="button"
                  className="opd-preset-row"
                  aria-expanded={active}
                  onClick={() => onPreset(item.id)}
                >
                  <PresetIcon preset={item} />
                  <span className="opd-preset-copy">
                    <strong>{item.name}</strong>
                    <span>{item.description}</span>
                  </span>
                  <span className="opd-preview-hint">{active ? 'Preview open' : 'Preview result'}</span>
                  <CdnIcon
                    name={active ? 'arrow-up-f2' : 'arrow-down-f2'}
                    size={13}
                    color="var(--text-n5)"
                  />
                </button>
                {active && (
                  <div className="opd-inline-preview">
                    <div className="opd-inline-preview__label">
                      <span>What you’ll receive</span>
                      <span>Real output shape · demo data</span>
                    </div>
                    <SampleContent preset={item} compact />
                    <div className="opd-inline-preview__action">
                      <span>Looks useful? Setup takes about 30 seconds.</span>
                      <button type="button" onClick={onContinue}>
                        Set up this preset
                        <CdnIcon name="arrow-right-l1" size={13} color="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </NativeMessage>
    </div>
  );
}

function ValueCardVariant({ preset }: { preset: Preset }) {
  return (
    <div className="opd-next-page">
      <div className="opd-backline">
        <CdnIcon name="arrow-left-l1" size={13} color="currentColor" />
        Back to presets
        <span>Deep link · {preset.id}</span>
      </div>
      <section className={`opd-value-card tone-${preset.tone}`}>
        <header className="opd-value-card__header">
          <div className="opd-value-card__identity">
            <PresetIcon preset={preset} size={40} />
            <div>
              <span>{preset.shortName}</span>
              <h2>Know what earns your attention — before you switch it on.</h2>
            </div>
          </div>
          <span className="opd-demo-data">Sample output · demo data</span>
        </header>

        <div className="opd-value-proof">
          <div className="opd-proof-rail">
            <div>
              <span className="opd-proof-label">What earns a push</span>
              <strong>Independent evidence aligns</strong>
              <p>Alva waits for multiple signals to support the same market story.</p>
            </div>
            <div>
              <span className="opd-proof-label">What stays quiet</span>
              <strong>Noise, repeats, weak conviction</strong>
              <p>Routine moves and duplicate stories do not create another alert.</p>
            </div>
          </div>
          <div className="opd-proof-output">
            <div className="opd-proof-output__top">
              <span>Example result</span>
              <span>3 signals aligned</span>
            </div>
            <h3>{preset.sampleTitle}</h3>
            <p>{preset.sampleSummary}</p>
            <EvidenceList preset={preset} />
            <div className="opd-proof-payoff">
              <ChannelIcon name="spark" size={16} />
              <div>
                <strong>Why this is useful</strong>
                <span>You see the conclusion, evidence, and what to watch next in one scan.</span>
              </div>
            </div>
          </div>
        </div>
        <SetupGui preset={preset} />
      </section>
    </div>
  );
}

function ConversationVariant({ preset }: { preset: Preset }) {
  return (
    <div className="opd-conversation-stage">
      <div className="opd-backline">
        <CdnIcon name="arrow-left-l1" size={13} color="currentColor" />
        Back to presets
        <span>Deep link · {preset.id}</span>
      </div>
      <div className="opd-day-separator"><span>Preview before setup</span></div>
      <NativeMessage preset={preset} push label={preset.sampleTime} />
      <NativeMessage preset={preset}>
        <p className="opd-bridge-copy">
          That is the exact message shape I’ll use. If the value feels right, tailor the inputs below and I’ll keep the same format when it goes live.
        </p>
      </NativeMessage>
      <NativeMessage preset={preset}>
        <SetupGui preset={preset} compact />
      </NativeMessage>
    </div>
  );
}

function ChannelVariant({ preset }: { preset: Preset }) {
  return (
    <div className="opd-conversation-stage is-channel">
      <div className="opd-channel-origin">
        <span className={`opd-channel-origin__icon tone-${preset.tone}`}>
          <ChannelIcon name="link" size={14} />
        </span>
        <div>
          <strong>Opened from a preset deeplink</strong>
          <span>This focused channel keeps setup, future alerts, and follow-up questions together.</span>
        </div>
        <span className="opd-channel-status">Draft channel</span>
      </div>
      <div className="opd-day-separator"><span>Today</span></div>
      <NativeMessage preset={preset}>
        <div className="opd-channel-welcome">
          <strong>{preset.shortName} is ready in this channel.</strong>
          <p>
            Here is a real example of what will land here. Review the result first; the setup stays directly beneath it.
          </p>
        </div>
      </NativeMessage>
      <NativeMessage preset={preset} push label={preset.sampleTime} />
      <NativeMessage preset={preset}>
        <SetupGui preset={preset} channel compact />
      </NativeMessage>
      <div className="opd-channel-composer">
        <span>Ask about this preset or change a setting…</span>
        <CdnIcon name="at-l" size={15} color="var(--text-n3)" />
        <button type="button" aria-label="Send">
          <CdnIcon name="arrow-up-l1" size={15} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function TypingMessage({ preset }: { preset: Preset }) {
  return (
    <NativeMessage preset={preset}>
      <div className="opd-typing-message" aria-label="Alva is preparing a preview">
        <span />
        <span />
        <span />
        <small>Preparing the preview</small>
      </div>
    </NativeMessage>
  );
}

function StreamUserMessage({ preset }: { preset: Preset }) {
  return (
    <UserMessage
      turn={{
        id: `preset-${preset.id}`,
        role: 'user',
        text: `Set up ${preset.shortName} for me.`,
        timestamp: 'now',
      }}
    />
  );
}

function getPreviewExamples(preset: Preset): PreviewExample[] {
  return [
    {
      time: preset.sampleTime,
      title: preset.sampleTitle,
      summary: preset.sampleSummary,
      evidence: preset.evidence.slice(0, 2).map(({ source, text }) => ({ source, text })),
    },
    ...PREVIEW_EXTRA_EXAMPLES[preset.id],
  ];
}

function buildPreviewAlerts(preset: Preset): PushCardData[] {
  return getPreviewExamples(preset).map((example, index) => ({
    id: `${preset.id}-preview-${index + 1}`,
    kind: 'normal',
    timestamp: example.time,
    source: preset.id,
    feedName: preset.id,
    title: example.title,
    bullets: [
      example.summary,
      ...example.evidence.map((item) => `${item.source}: ${item.text}`),
    ],
  }));
}

function PreviewExamplesComponent({
  preset,
  visibleCount,
}: {
  preset: Preset;
  visibleCount: number;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const alerts = buildPreviewAlerts(preset).slice(0, visibleCount);

  return (
    <>
      <section className="opd-preview-component" aria-live="polite">
        <p className="opd-preview-component__intro">
          Here’s what {preset.shortName} actually sends — real alerts from the official automation:
        </p>
        <div className="opd-preview-component__scroll">
          {alerts.map((alert) => (
            <FeedAlertCard
              key={alert.id}
              alert={alert}
              sourceNode={(
                <AutomationSourceChip
                  label={preset.id}
                  onClick={() => setDetailOpen(true)}
                />
              )}
            />
          ))}
        </div>
      </section>
      <FeedDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        feedName={preset.id}
        lastRun="Preview"
        runEvery={preset.cadence}
        description={preset.description}
        instruction={preset.description}
        alerts={buildPreviewAlerts(preset)}
      />
    </>
  );
}

function StreamVariant({
  preset,
  onPreset,
}: {
  preset: Preset;
  onPreset: (presetId: PresetId) => void;
}) {
  const [runPresetId, setRunPresetId] = useState<PresetId>(preset.id);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const streamEndRef = useRef<HTMLDivElement | null>(null);
  const runPreset = PRESETS.find((item) => item.id === runPresetId) ?? preset;

  const play = (nextPreset: Preset) => {
    setRunPresetId(nextPreset.id);
    setPhase(2);
    setPlaying(true);
    onPreset(nextPreset.id);
  };

  useEffect(() => {
    if (!playing) return;
    if (phase >= 7) {
      setPlaying(false);
      return;
    }

    const delays = [0, 0, 420, 650, 480, 480, 620];
    const timer = window.setTimeout(() => {
      setPhase((current) => current + 1);
    }, delays[phase] ?? 480);

    return () => window.clearTimeout(timer);
  }, [phase, playing]);

  useEffect(() => {
    if (phase < 2) return;
    const frame = window.requestAnimationFrame(() => {
      streamEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  return (
    <div className="opd-conversation-stage is-stream">
      <NativeMessage preset={preset} label="">
        <div className="opd-intro-copy">
          <p>Choose a preset. I’ll show you recent alerts, then help you set it up right here.</p>
        </div>
        <div className="opd-stream-prompt">
          <span>
            <span className="opd-stream-prompt__dot" />
            Click a preset to continue the conversation
          </span>
        </div>
        <div className="opd-preset-list">
          {PRESETS.map((item) => {
            const active = phase > 0 && item.id === runPreset.id;
            return (
              <button
                type="button"
                aria-pressed={active}
                className={`opd-preset-row opd-stream-preset-row${active ? ' is-active' : ''}`}
                key={item.id}
                onClick={() => play(item)}
              >
                <PresetIcon preset={item} />
                <span className="opd-preset-copy">
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </span>
                <span className="opd-preview-hint">
                  {active ? (playing ? 'Streaming…' : 'Preview again') : 'Preview result'}
                </span>
                <CdnIcon
                  name={active ? 'check-l1' : 'arrow-right-l1'}
                  size={13}
                  color={active ? 'var(--main-m1)' : 'var(--text-n5)'}
                />
              </button>
            );
          })}
        </div>
      </NativeMessage>

      {phase >= 2 && <StreamUserMessage preset={runPreset} />}

      {phase === 3 && <TypingMessage preset={runPreset} />}

      {phase >= 4 && (
        <NativeMessage preset={runPreset}>
          <PreviewExamplesComponent
            preset={runPreset}
            visibleCount={Math.min(3, phase - 3)}
          />
        </NativeMessage>
      )}

      {phase >= 7 && (
        <NativeMessage preset={runPreset}>
          {runPreset.id === 'alpha-radar' ? (
            <AlphaRadarBuilder />
          ) : (
            <SetupGui preset={runPreset} compact minimal />
          )}
        </NativeMessage>
      )}
      <div ref={streamEndRef} className="opd-stream-end" aria-hidden="true" />
    </div>
  );
}

export default function OnboardingPreviewDemo() {
  const initial = useMemo(readHashState, []);
  const [variant, setVariant] = useState<OnboardingPreviewVariant>(initial.variant);
  const [presetId, setPresetId] = useState<PresetId>(initial.presetId);

  useEffect(() => {
    const sync = () => {
      const next = readHashState();
      setVariant(next.variant);
      setPresetId(next.presetId);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[1];
  const changeVariant = (next: OnboardingPreviewVariant) => {
    setVariant(next);
    setDeepLink(next, presetId);
  };
  const changePreset = (next: PresetId) => {
    setPresetId(next);
    setDeepLink(variant, next);
  };

  return (
    <div className="onboarding-preview-demo" style={{ fontFamily: FONT }}>
      <DemoNavigator
        variant={variant}
        presetId={presetId}
        onVariant={changeVariant}
      />
      <AgentHeader channel={variant === 'channel'} preset={preset} />
      {variant === 'inline' && (
        <InlineVariant
          preset={preset}
          onPreset={changePreset}
          onContinue={() => changeVariant('value-card')}
        />
      )}
      {variant === 'value-card' && <ValueCardVariant preset={preset} />}
      {variant === 'conversation' && <ConversationVariant preset={preset} />}
      {variant === 'channel' && <ChannelVariant preset={preset} />}
      {variant === 'stream' && <StreamVariant preset={preset} onPreset={changePreset} />}
    </div>
  );
}
