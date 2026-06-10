import type { Page } from '@/app/App';

export type PlaybookSource = 'subscribed' | 'owned';

export type PlaybookNavItem = {
  page: Page;
  title: string;
  owner: string;
  ownerSeed: string;
  source: PlaybookSource;
};

export const PLAYBOOK_NAV_ITEMS: PlaybookNavItem[] = [
  {
    page: 'template-screener',
    title: 'Attribution Analysis Strategy',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'owned',
  },
  {
    page: 'screener',
    title: 'James Wynn Tweet Tracker',
    owner: 'Caleb Frost',
    ownerSeed: 'Caleb Frost',
    source: 'subscribed',
  },
  {
    page: 'template-whatif',
    title: 'Optical AI Infrastructure Thesis',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'owned',
  },
  {
    page: 'template-thesis',
    title: 'NVDA Price Fetcher',
    owner: 'Asha Bello',
    ownerSeed: 'Asha Bello',
    source: 'subscribed',
  },
  {
    page: 'template-notification',
    title: 'FinTwit Bulls & Bears',
    owner: 'Nina Reyes',
    ownerSeed: 'Nina Reyes',
    source: 'subscribed',
  },
];

export const PLAYBOOK_TITLES: Record<string, string> = Object.fromEntries(
  PLAYBOOK_NAV_ITEMS.map((item) => [item.page, item.title]),
);
