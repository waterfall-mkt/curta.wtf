import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import PuzzleHeader from './(components)/header';
import PuzzleTabs from './(components)/tabs-nav';

import { fetchPuzzleById, getChainIdAndId, getChainInfo } from '@/lib/utils';

import ContainerLayout from '@/components/layouts/container';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ids = getChainIdAndId(params.slug);
  // Return empty object if `slug` is an invalid format.
  if (!ids) return {};

  const puzzle = await fetchPuzzleById(ids.id, ids.chainId);
  if (!puzzle) return {};

  const title = `Puzzle #${puzzle.id}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Curta`,
      description,
      siteName: 'curta.wtf',
      url: 'https://curta.wtf',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Curta`,
      description,
      site: '@curta_ctf',
      siteId: '1604186457165406210',
      creator: '@waterfall_mkt',
      creatorId: '1466508083929223176',
    },
  };
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function PuzzleLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const puzzle = await fetchPuzzleById(id, chainId);

  // Return 404 if `puzzle` is `null`.
  if (!puzzle) return notFound();

  // Fetch write-up's MDX.
  const response = await cache(async () =>
    fetch(
      `https://raw.githubusercontent.com/waterfall-mkt/curta-write-ups/main/puzzles/${
        getChainInfo(chainId).network
      }/${id}.mdx`,
    ),
  )();

  return (
    <ContainerLayout className="max-w-none px-0 pt-4 lg:px-0 lg:pt-6">
      <PuzzleHeader puzzle={puzzle} />
      <PuzzleTabs slug={params.slug} hasWriteup={response.ok}>
        {children}
      </PuzzleTabs>
    </ContainerLayout>
  );
}
