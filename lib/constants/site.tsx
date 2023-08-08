import { Github, Twitter } from 'lucide-react';

import type { ExternalLink, Page } from '@/lib/types/site';

/**
 * Docs pages displayed on [**curta.wtf/docs**](https://curta.wtf/docs)'s
 * navigation bar.
 */
export const DOCS_PAGES: { name: string; pages: Page[] }[] = [
  {
    name: 'Overview',
    pages: [
      { name: 'Introduction', slug: '/docs' },
      { name: 'Phases', slug: '/docs/phases' },
      { name: 'Puzzles', slug: '/docs/puzzles' },
      { name: 'Authorship Token', slug: '/docs/authorship-token' },
      { name: 'Flag Token', slug: '/docs/flag-token' },
      { name: 'Leaderboard', slug: '/docs/leaderboard' },
    ],
  },
  {
    name: 'Resources',
    pages: [
      { name: 'Glossary', slug: '/docs/resources/glossary' },
      { name: 'Contracts', slug: '/docs/resources/contracts' },
      { name: 'External Links', slug: '/docs/resources/external-links' },
    ],
  },
];

/**
 * Pages displayed on [**curta.wtf**](https://curta.wtf)'s footer.
 */
export const FOOTER_PAGES: Page[] = [
  { name: 'Home', slug: '/' },
  { name: 'Careers', slug: 'https://jobs.waterfall.market' },
  { name: 'Terms of Service', slug: '/legal/tos' },
  { name: 'Waterfall', slug: 'https://waterfall.market' },
  { name: 'Discord', slug: 'https://discord.gg/zxerRE2Dn7' },
];

/**
 * Pages displayed on [**curta.wtf**](https://curta.wtf)'s navigation bar.
 */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Puzzles', slug: '/' },
  { name: 'Leaderboard', slug: '/leaderboard' },
  { name: 'Playground', slug: '/playground' },
  { name: 'Docs', slug: '/docs' },
  { name: 'Guides', slug: '/guides' },
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
