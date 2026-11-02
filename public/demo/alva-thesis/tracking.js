import { SOURCES } from './data.js?v=20260908-tracking';

// Scripted historical replays, not live monitoring or new reporting.
// Each case has two evidence checks and a later, explicitly simulated audit.
const cases = [
  {
    thesisId: 'memory', date: '2026-07-31', verdict: 'Demand supported · margins unresolved',
    events: [
      ['micron', 'Earnings', 'Demand has reached the income statement.', 'Micron reported that data-center revenue tripled year over year. That moves this thesis beyond a bandwidth diagram: customers are spending. But data-center revenue is broader than HBM; this disclosure does not isolate HBM profitability.', 'Look for HBM mix and gross margin together. Revenue alone cannot identify who keeps the scarcity premium.'],
      ['jukanHbmSupply', 'Supply watch', 'The bottleneck is attracting its own competition.', 'Jukan’s translation of Samsung’s earnings Q&A describes better yields and added HBM4 capacity. This is a supply plan, not qualified output already shipping. Still, it changes what I would monitor: demand can stay strong while pricing power weakens.', 'Track customer qualification and delivered capacity, not just announced capacity.'],
    ],
    title: 'Keep the demand thesis. Reopen the profit assumption.',
    post: 'I would keep the structural HBM demand argument, but I would not carry the same conviction into supplier margins. Micron’s revenue evidence and Samsung’s expansion plans can both be true. The risk is paying for today’s scarcity after the supply response has begun.',
    gap: 'The cited material does not establish HBM-specific margins or the timing of Samsung’s qualified shipments.',
    next: 'At the next memory earnings update, compare HBM revenue mix, gross margin and qualified capacity. Rising shipments with falling margins would weaken the profit case even if the demand case survives.',
  },
  {
    thesisId: 'autonomy', date: '2026-09-07', verdict: 'Commercial proof still missing',
    events: [
      ['garyAutonomy', 'Counterpoint', 'Technology confidence is not an earnings forecast.', 'Gary Black separates confidence in autonomous technology from confidence in the investment outcome. His questions—profit timing, competition and safety at scale—target the assumptions that make the robotaxi valuation work.', 'Watch paid utilization and operating costs. A larger announced fleet does not settle either question.'],
      ['garyDistribution', 'Demand watch', 'Customer acquisition belongs in the model.', 'Black argues that Tesla needs to explain autonomy’s benefits beyond its existing customers. This is an opinion about distribution, not new ride-booking evidence. It exposes a missing link between vehicles being available and riders choosing them repeatedly.', 'Look for repeat paid rides and the cost of winning those customers.'],
    ],
    title: 'The upside is still a scenario, not an observed business.',
    post: 'ARK’s model gives robotaxis a dominant role in Tesla’s projected value. These two updates do not invalidate autonomy, but they make the commercial bridge harder to skip: demand, unit economics and safe expansion must work together. I would leave the scenario open and withhold an upgrade.',
    gap: 'No fleet-wide paid utilization, fully loaded cost per mile or repeat-rider cohort is established by these posts.',
    next: 'Upgrade only when paid operating data supports both repeat demand and viable economics. Expansion that needs persistent subsidy would challenge the modeled upside.',
    extra: ['ark'],
  },
  {
    thesisId: 'inference', date: '2026-03-24', verdict: 'Compute mechanism stronger',
    events: [
      ['microsoft', 'Earnings', 'There is a paying AI market to serve.', 'Microsoft disclosed an AI annual revenue run rate above $13 billion, growing 175% year over year. That supports commercial demand. It is a run rate, not a full year of booked revenue—and it does not tell us how much becomes NVIDIA revenue.', 'Separate customer spending, cloud returns and accelerator sales before treating this as one continuous growth rate.'],
      ['jensenPodcast', 'Interview', 'One request can now mean many rounds of work.', 'Huang describes reasoning and teams of agents as additional drivers of inference compute. His memory-supply account also connects the software story to physical constraints. This strengthens the mechanism, but remains a supplier’s explanation of demand.', 'Measure useful completed tasks and paid usage, not just the number of internal model calls.'],
    ],
    title: 'More work per task is plausible. More profit is another test.',
    post: 'The compute argument has gained a clearer mechanism and some downstream revenue evidence. I would strengthen the demand side without assuming every extra reasoning step is worth paying for. Efficiency and task quality still decide how much of that activity becomes durable spending.',
    gap: 'These sources do not reconcile agent usage, inference unit prices and customers’ total bills.',
    next: 'Check whether paid inference consumption expands faster than effective prices fall, then check whether that reaches infrastructure revenue.',
  },
  {
    thesisId: 'efficiency', date: '2025-01-28', verdict: 'Accessibility up · spending unproven',
    events: [
      ['swyxPricing', 'Price watch', 'The price-performance frontier is moving.', 'swyx’s comparison puts cheaper reasoning alternatives next to existing models. Lower prices make experimentation easier. They also reduce supplier revenue per unit, so increased usage alone cannot prove that the whole market is spending more.', 'Compare total paid consumption with the effective price, not token growth in isolation.'],
      ['tinyZero', 'Research', 'A cheap experiment is a narrow kind of evidence.', 'TinyZero reproduced R1-Zero-style behavior on the Countdown task with a 3B model and a reported experiment cost below $30. That is useful evidence of accessible experimentation, not the cost of training a frontier model or operating a production service.', 'Watch whether the technique generalizes to useful tasks with repeatable quality.'],
    ],
    title: 'Do not turn “cheaper to try” into “larger revenues” yet.',
    post: 'Both updates strengthen the accessibility argument. Neither measures aggregate spending elasticity. My read is that application builders have more room to experiment, while infrastructure investors still need a separate proof: enough additional paid work to offset the price decline.',
    gap: 'No comparable before-and-after customer spending cohort is supplied.',
    next: 'Look for retained paid workloads, total bills and task success rates after a price cut. Free experimentation would not close this gap.',
  },
  {
    thesisId: 'msft-angle', date: '2025-02-20', verdict: 'Revenue proven · returns open',
    events: [
      ['microsoft', 'Earnings', 'AI revenue is now a disclosed business signal.', 'The $13 billion AI revenue run rate and 175% growth are concrete monetization evidence. They should carry more weight than product availability or a list of enterprise pilots. But revenue is not the same as the return on the infrastructure needed to deliver it.', 'Keep capital intensity and operating returns beside revenue growth.'],
      ['satyaPodcast', 'Interview', 'The customer’s outcome is the economic limit.', 'Nadella’s discussion emphasizes useful economic output as intelligence becomes cheaper. This shifts the checkpoint from access to AI toward work customers will keep paying for. The interview provides a framework, not new profitability disclosure.', 'Watch renewals and paid expansion after pilots, alongside the cost to serve.'],
    ],
    title: 'Paid demand has evidence. Attractive returns need their own evidence.',
    post: 'I would retire the question of whether anyone pays for Microsoft AI at all. The more useful audit is now whether growth remains attractive after infrastructure and serving costs. A rising revenue run rate can coexist with a long payback period.',
    gap: 'AI-specific capital returns and sustained customer cohort economics are not isolated here.',
    next: 'Compare subsequent AI revenue growth with capacity investment and cloud profitability. Avoid inferring an AI margin from the whole company’s margin.',
  },
  {
    thesisId: 'amzn-angle', date: '2026-08-16', verdict: 'Demand case gains a concentration risk',
    events: [
      ['amazon', 'Company letter', 'Lower inference cost is an explicit growth bet.', 'Jassy argues that cheaper inference can unlock more applications, with Trainium part of the cost strategy. The thesis now has a clear management rationale. A shareholder letter still describes the intended mechanism rather than demonstrating its eventual return.', 'Watch production workloads and customer bills after cost reductions.'],
      ['ophirConcentration', 'Risk watch', 'Several infrastructure bets may share the same buyers.', 'Gottlieb revisits his confidence in AI infrastructure demand, describing greater dependence on OpenAI and Anthropic than he had assumed. This is an investor’s revised view, not an AWS customer concentration disclosure.', 'Check direct customer disclosures before assigning AWS a concentration percentage.'],
    ],
    title: 'Cost elasticity and customer breadth are now separate tests.',
    post: 'I would keep the cheaper-inference mechanism, but add a resilience test. Growth from a narrow set of model companies can look like broad AI adoption while depending on a few budgets. The new concern changes what to investigate, not what we can claim AWS has disclosed.',
    gap: 'The cited sources do not quantify AWS’s incremental AI revenue by customer.',
    next: 'Seek evidence of independent production demand across customers, plus retained spending after price reductions. A single large contract would not prove broad elasticity.',
  },
  {
    thesisId: 'aapl-angle', date: '2025-01-31', verdict: 'Capability supported · upgrade effect open',
    events: [
      ['deepseek', 'Industry analysis', 'Model efficiency could shift value toward distribution.', 'The DeepSeek discussion raises the possibility that cheaper intelligence benefits products with existing users and hardware reach. For Apple, that is a distribution hypothesis; it does not yet establish which features must run locally or require a new device.', 'Distinguish on-device capability from a reason to replace working hardware.'],
      ['apple', 'Earnings', 'Apple links its silicon to the AI product story.', 'Cook’s earnings statement explicitly connects Apple silicon and Apple Intelligence. That supports product intent and integration. It does not isolate AI-driven upgrades, retention or services spending.', 'Look for usage and upgrade attribution rather than assuming every compatible device becomes incremental demand.'],
    ],
    title: 'Useful device AI can succeed without a replacement supercycle.',
    post: 'The product thesis and the upgrade thesis should not share a verdict. Apple’s hardware and distribution are credible routes to everyday AI, but useful features could first benefit people who already own compatible devices. I would keep the capability case and leave incremental hardware demand unproven.',
    gap: 'No AI-attributed replacement cohort is disclosed in this evidence set.',
    next: 'Look for repeat feature usage and a measurable change in replacement behavior. Availability across an installed base is not the same as new device sales.',
  },
  {
    thesisId: 'googl-angle', date: '2025-05-21', verdict: 'Usage supported · monetization unresolved',
    events: [
      ['deepseek', 'Competitive watch', 'Cheaper answers also lower the barrier for substitutes.', 'More accessible models could allow assistants outside Google to answer queries. This is a competitive mechanism, not evidence of a measured loss in Google search share. It gives the thesis a counter-test: where does the user start the next query?', 'Track durable changes in search entry points, not launch attention.'],
      ['google', 'Product event', 'AI answers have distribution and a usage signal.', 'At I/O, Google reported 1.5 billion AI Overviews users and more searches for queries that show them. This supports engagement with the format. It does not supply revenue per AI query or fully loaded serving costs.', 'Keep query growth, ad monetization and inference costs separate.'],
    ],
    title: 'More searches is progress, but not the whole economic result.',
    post: 'Google’s usage disclosure pushes back against the simple claim that AI answers must reduce search activity. I would strengthen the engagement case. The investment question remains whether those extra interactions preserve commercial intent and attractive economics.',
    gap: 'The evidence does not quantify incremental profit per AI-assisted query.',
    next: 'Compare search monetization and serving efficiency with continued usage growth. Lower-value queries could raise activity while contributing little profit.',
  },
  {
    thesisId: 'meta-personal', date: '2026-08-25', verdict: 'Product ambition · habit not proven',
    events: [
      ['meta', 'Company letter', 'Personal superintelligence becomes an explicit ambition.', 'Zuckerberg’s letter sets out a personal AI vision. That clarifies the direction of investment; it does not establish product retention. Existing app reach is an advantage in distribution, but it cannot be counted as active assistant usage.', 'Look for repeat assistant use beyond one-time trial through an existing app.'],
      ['rihardConsumer', 'Consumer watch', 'Owning the relationship may matter more than a model benchmark.', 'Jarc’s interview commentary focuses attention on the consumer relationship around AI. It is an outside perspective, not a Meta roadmap announcement. The useful question is whether people develop a recurring reason to return to the assistant itself.', 'Separate access through Meta’s apps from a new, durable assistant habit.'],
    ],
    title: 'Distribution buys a trial. It does not guarantee a habit.',
    post: 'The personal AI thesis has strategic intent and a plausible route to users. I would not upgrade it on reach alone. A new platform needs repeated utility and a relationship users choose to maintain; otherwise AI may remain a feature inside the existing apps.',
    gap: 'Standalone assistant retention and incremental monetization are not established here.',
    next: 'Watch repeat usage cohorts and recurring tasks. Large launch exposure with weak return usage would leave the platform claim unsupported.',
  },
  {
    thesisId: 'amd-angle', date: '2025-06-13', verdict: 'Roadmap advances · deployment is the test',
    events: [
      ['rocm', 'Software review', 'The software friction is part of the cost.', 'SemiAnalysis’s ROCm work frames reliability and migration effort as central to accelerator adoption. A hardware specification cannot capture the engineering time required to move and maintain a workload.', 'Compare delivered workload cost, including porting and operations.'],
      ['amd', 'Product event', 'AMD’s response spans the whole system.', 'Advancing AI 2025 connects silicon, ROCm and rack-scale systems in an open platform. That addresses the right scope of the problem. A roadmap and partner ecosystem still need to become dependable customer deployments.', 'Look for named production workloads and repeatable software performance.'],
    ],
    title: 'The right roadmap earns a checkpoint, not a victory lap.',
    post: 'AMD’s system-level approach makes the response more credible than a chip-only comparison. I would keep software readiness as the deciding test. The important upgrade would be customers operating real workloads reliably, with lower total costs after migration—not another peak benchmark.',
    gap: 'The announcement does not establish fleet-wide reliability or customer migration costs.',
    next: 'Compare independent production deployment evidence with the earlier software concerns. Stable operations across updates would be more persuasive than a one-off demo.',
  },
];

const dateLabel = date => new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const ALVA_TRACKING = cases.flatMap(item => {
  const base = { thesisId: item.thesisId, speaker: 'Alva', initials: 'a', kind: 'agent', simulated: true, channel: 'Alva tracking · Demo replay' };
  const events = item.events.map(([sourceId, category, title, post, next], index) => ({
    ...base, id: `tracking-${item.thesisId}-${index}`, trackingType: 'event', category, title, post, next,
    evidenceIds: [sourceId], date: SOURCES[sourceId].date, time: dateLabel(SOURCES[sourceId].date), order: Date.parse(SOURCES[sourceId].date), impact: next,
  }));
  return [...events, { ...base, id: `tracking-${item.thesisId}-audit`, trackingType: 'audit', category: 'Thesis audit',
    title: item.title, post: item.post, verdict: item.verdict, gap: item.gap, next: item.next, impact: item.post + ' ' + item.next,
    evidenceIds: [...new Set([...events.flatMap(event => event.evidenceIds), ...(item.extra || [])])],
    date: item.date, time: dateLabel(item.date), order: Date.parse(item.date),
  }];
});
