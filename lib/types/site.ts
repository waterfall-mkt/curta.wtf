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
  // Docs
  | '/docs'
  | '/docs/ctf/overview'
  | '/docs/ctf/phases'
  | '/docs/ctf/puzzles'
  | '/docs/ctf/authorship-token'
  | '/docs/ctf/flag-token'
  | '/docs/leaderboard'
  | '/docs/glossary'
  | '/docs/contracts'
  | '/docs/external-links';

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
