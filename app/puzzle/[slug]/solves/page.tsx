import { notFound } from 'next/navigation';

import PuzzleSolvesTable from './(components)/solves-table';

import { fetchPuzzleById, fetchPuzzleSolvesById, getChainIdAndId } from '@/lib/utils';

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
    fetchPuzzleSolvesById(id, chainId),
  ]);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!puzzle || error) return notFound();

  return (
    <div
      id={`content-/puzzle/${params.slug}/solves`}
      className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:gap-6 lg:px-20"
      role="tabpanel"
      aria-labelledby={`trigger-/puzzle/${params.slug}/solves`}
    >
      <PuzzleSolvesTable data={solves} puzzleAddedTimestamp={puzzle.addedTimestamp} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;
