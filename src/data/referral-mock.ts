export const REFERRAL_DATA = {
  referralCode: 'YGGYLL-AX7K',
  referralLink: 'https://alva.ai/invite/YGGYLL-AX7K',
  creditsPerReferral: 3000,
  stats: {
    totalInvited: 7,
    totalActivated: 4,
    totalCreditsEarned: 12000,
  },
  referrals: [
    { name: 'Alice W.',  date: '03/28/2026', status: 'activated' as const, credits: 3000 },
    { name: 'Bob K.',    date: '03/25/2026', status: 'activated' as const, credits: 3000 },
    { name: 'Carol M.',  date: '03/20/2026', status: 'activated' as const, credits: 3000 },
    { name: 'Dave L.',   date: '03/18/2026', status: 'activated' as const, credits: 3000 },
    { name: 'Eve R.',    date: '03/15/2026', status: 'pending'   as const, credits: 0 },
    { name: 'Frank J.',  date: '03/10/2026', status: 'pending'   as const, credits: 0 },
    { name: 'Grace T.',  date: '03/05/2026', status: 'pending'   as const, credits: 0 },
  ],
  referrer: { name: 'YGGYLL' },
};
