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
    title: 'Attribution Analysis Strategy for Price Trends',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'subscribed',
  },
  {
    page: 'template-thesis',
    title: 'NVDA Price Fetcher',
    owner: 'Mira Chen',
    ownerSeed: 'Mira Chen',
    source: 'subscribed',
  },
  {
    page: 'screener',
    title: 'James Wynn Tweet Tracker',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'owned',
  },
  {
    page: 'template-whatif',
    title: 'Google / X Trends Tracker',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'owned',
  },
  {
    page: 'template-notification',
    title: 'Short-Squeeze Risk Map',
    owner: 'Vega Zhou',
    ownerSeed: 'Vega Zhou',
    source: 'subscribed',
  },
];

export const PLAYBOOK_TITLES: Record<string, string> = Object.fromEntries(
  PLAYBOOK_NAV_ITEMS.map((item) => [item.page, item.title]),
);
