import type { ReactNode } from 'react';

/**
 * Type for an external link.
 * @param name Name describing the link.
 * @param href URL of the link.
 * @param icon Optional icon to describe/represent the link.
 */
export type ExternalLink = {
  name: string;
  href: string;
  icon?: ReactNode;
};

/**
 * Type for a page slug on [**curta.wtf**](https://curta.wtf).
 */
export type PageSlug =
  | '/'
  | '/legal/tos'
  | '/leaderboard'
  | '/playground'
  | '/guides'
  // Docs
  | '/docs'
  | '/docs/phases'
  | '/docs/puzzles'
  | '/docs/authorship-token'
  | '/docs/flag-token'
  | '/docs/leaderboard'
  | '/docs/resources/glossary'
  | '/docs/resources/contracts'
  | '/docs/resources/external-links'
  // Guides
  | '/guides/player/getting-started'
  | '/guides/player/submitting-solutions'
  | '/guides/player/nft-rewards'
  | '/guides/author/becoming-an-author'
  | '/guides/author/creating-a-puzzle'
  | '/guides/author/customizing-art'
  | '/guides/author/becoming-fermat';

/**
 * Type for an external page linked on [**curta.wtf**](https://curta.wtf),
 * intended to be part of configuration files (e.g. for the navigation bar
 * component).
 */
export type PageExternalLink =
  | 'https://jobs.waterfall.market'
  | 'https://waterfall.market'
  | 'https://discord.gg/zxerRE2Dn7';

/**
 * Type for a page on [**curta.wtf**](https://curta.wtf), intended to be part of
 * configuration files (e.g. for the navigation bar component).
 * @param name Name describing the page.
 * @param slug Slug/URL of the page.
 * @param icon Optional icon to describe/represent the page.
 */
export type Page = {
  name: string;
  slug: PageSlug | PageExternalLink;
  icon?: ReactNode;
};
