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
    page: 'template-whatif',
    title: 'Optical AI Infrastructure Thesis',
    owner: 'YGGYLL',
    ownerSeed: 'YGGYLL',
    source: 'owned',
  },
  {
    page: 'space-investor',
    title: 'Space Investor Master Playbook',
    owner: 'Space Investor',
    ownerSeed: 'Space Investor',
    source: 'subscribed',
  },
];

export const PLAYBOOK_TITLES: Record<string, string> = Object.fromEntries(
  PLAYBOOK_NAV_ITEMS.map((item) => [item.page, item.title]),
);
