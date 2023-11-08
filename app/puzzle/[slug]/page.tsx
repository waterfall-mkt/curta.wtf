import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PuzzleHeader from './(components)/header';
import PuzzleInfo from './(components)/info';
import PuzzleProblemDisplay from './(components)/problem-display';
import PuzzleSolvesTable from './(components)/solves-table';

import { fetchPuzzleById, fetchPuzzleSolvesById, getChainIdAndId } from '@/lib/utils';

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

  const { data: puzzle } = await fetchPuzzleById(ids.chainId, ids.id);
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

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const [{ data: puzzle, error }, { data: solves }] = await Promise.all([
    fetchPuzzleById(id, chainId),
    fetchPuzzleSolvesById(id),
  ]);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!puzzle || error) return notFound();

  const languages = ['Bytecode']
    .concat(puzzle.solidity ? ['Solidity'] : [])
    .concat(puzzle.huff ? ['Huff'] : []);

  return (
    <div className="flex flex-col">
      <PuzzleHeader puzzle={puzzle} />
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:gap-6">
        <PuzzleProblemDisplay puzzle={puzzle} languages={languages} />
        <PuzzleInfo puzzle={puzzle} />
      </div>
      <div className="mt-4 grow md:mt-10">
        <h2 className="mb-4 text-xl font-medium text-gray-50 lg:text-display-sm">Solves</h2>
        <PuzzleSolvesTable data={solves} puzzleAddedTimestamp={puzzle.addedTimestamp} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;
