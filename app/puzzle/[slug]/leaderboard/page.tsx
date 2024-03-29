import { notFound } from 'next/navigation';

import PuzzleSolvesDataTable from './(components)/data-table';

import { fetchPuzzleById, fetchPuzzleSolvesById, getChainIdAndId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const [puzzle, solves] = await Promise.all([
    fetchPuzzleById(id, chainId),
    fetchPuzzleSolvesById(id, chainId),
  ]);

  // Return 404 if `puzzle` is `null`.
  if (!puzzle) return notFound();

  const normalizedSlug = decodeURIComponent(params.slug.toLowerCase());

  return (
    <div
      id={`content-/puzzle/${normalizedSlug}/leaderboard`}
      className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:gap-6 lg:px-20"
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${normalizedSlug}/leaderboard`}
    >
      <PuzzleSolvesDataTable data={solves} puzzleAddedTimestamp={puzzle.addedTimestamp} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;
