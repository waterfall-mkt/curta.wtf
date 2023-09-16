import { Github, Twitter } from 'lucide-react';

import type { ExternalLink, Page } from '@/lib/types/site';

/**
 * Docs pages displayed on [**curta.wtf/docs**](https://curta.wtf/docs)'s
 * navigation bar.
 */
export const DOCS_PAGES: {
  name: string;
  groups: ({ name: string; pages: Page[] } | Page)[];
}[] = [
  {
    name: '',
    groups: [{ name: 'Overview', slug: '/docs' }],
  },
  {
    name: 'Credentials',
    groups: [
      {
        name: 'Puzzles',
        pages: [
          { name: 'Puzzles Overview', slug: '/docs/puzzles/overview' },
          { name: 'Submitting Solutions', slug: '/docs/puzzles/submitting-solutions' },
          { name: 'Becoming an Author', slug: '/docs/puzzles/becoming-an-author' },
          { name: 'Writing Puzzles', slug: '/docs/puzzles/writing-puzzles' },
        ],
      },
      { name: 'Leaderboard', slug: '/docs/leaderboard' },
    ],
  },
  {
    name: 'Resources',
    groups: [{ name: 'Contracts', slug: '/docs/contracts' }],
  },
];

/**
 * Pages displayed on [**curta.wtf**](https://curta.wtf)'s footer.
 */
export const FOOTER_PAGES: Page[] = [
  { name: 'Home', slug: '/' },
  { name: 'Terms of Service', slug: '/legal/tos' },
  { name: 'Careers', slug: 'https://jobs.waterfall.market' },
  { name: 'Waterfall', slug: 'https://waterfall.market' },
  { name: 'Discord', slug: 'https://discord.gg/zxerRE2Dn7' },
];

/**
 * Pages displayed on [**curta.wtf**](https://curta.wtf)'s navigation bar.
 */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Puzzles', slug: '/' },
  { name: 'Leaderboard', slug: '/leaderboard' },
  { name: 'Docs', slug: '/docs' },
];

/**
 * Social links relevant to [**Curta**](https://twitter.com/curta_ctf) and
 * [**Waterfall**](https://twitter.com/waterfall-mkt).
 */
export const SOCIAL_LINKS: ExternalLink[] = [
  { name: 'Curta Twitter', href: 'https://twitter.com/curta_ctf', icon: <Twitter /> },
  { name: 'Waterfall Twitter', href: 'https://twitter.com/waterfall_mkt', icon: <Twitter /> },
  { name: 'GitHub', href: 'https://github.com/waterfall-mkt', icon: <Github /> },
];
