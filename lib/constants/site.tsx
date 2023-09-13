import { Github, Twitter } from 'lucide-react';

import type { ExternalLink, Page } from '@/lib/types/site';

/**
 * Guides pages displayed on [**curta.wtf/guides**](https://curta.wtf/guides)'s
 * navigation bar.
 */
export const GUIDES_PAGES: { name: string; groups: ({ name: string; pages: Page[] } | Page)[] }[] =
  [
    {
      name: 'Player',
      groups: [
        { name: 'Getting Started', slug: '/guides/player/getting-started' },
        { name: 'Submitting Solutions', slug: '/guides/player/submitting-solutions' },
        { name: 'NFT Rewards', slug: '/guides/player/nft-rewards' },
      ],
    },
    {
      name: 'Author',
      groups: [
        { name: 'Becoming an Author', slug: '/guides/author/becoming-an-author' },
        { name: 'Creating a Puzzle', slug: '/guides/author/creating-a-puzzle' },
        { name: 'Customizing Art', slug: '/guides/author/customizing-art' },
        { name: 'Becoming Fermat', slug: '/guides/author/becoming-fermat' },
      ],
    },
  ];

/**
 * Docs pages displayed on [**curta.wtf/docs**](https://curta.wtf/docs)'s
 * navigation bar.
 */
export const DOCS_PAGES: {
  name: string;
  groups: ({ name: string; pages: Page[] } | Page)[];
}[] = [
  {
    name: 'Credentials',
    groups: [
      {
        name: 'CTF',
        pages: [
          { name: 'Overview', slug: '/docs' },
          { name: 'Phases', slug: '/docs/phases' },
          { name: 'Puzzles', slug: '/docs/puzzles' },
          { name: 'Authorship Token', slug: '/docs/authorship-token' },
          { name: 'Flag Token', slug: '/docs/flag-token' },
        ],
      },
      { name: 'Leaderboard', slug: '/docs/leaderboard' },
    ],
  },
  {
    name: 'Resources',
    groups: [
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
