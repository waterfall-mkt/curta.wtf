import { notFound } from 'next/navigation';

import PuzzleInfo from './(components)/info';
import PuzzleProblemDisplay from './(components)/problem-display';

import { fetchPuzzleById, getChainIdAndId } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { slug: string } }) {
  const ids = getChainIdAndId(params.slug);

  // Return 404 if `slug` is an invalid format.
  if (!ids) return notFound();

  const { chainId, id } = ids;

  const { data: puzzle, error } = await fetchPuzzleById(id, chainId);

  // Return 404 if `puzzle` is `null` or there was an `error` in fetching the
  // data.
  if (!puzzle || error) return notFound();

  const languages = ['Bytecode']
    .concat(puzzle.solidity ? ['Solidity'] : [])
    .concat(puzzle.huff ? ['Huff'] : []);

  return (
    <div className="mx-auto mt-4 flex max-w-[90rem] flex-col gap-4 px-4 md:flex-row md:gap-6 lg:px-20">
      <PuzzleProblemDisplay puzzle={puzzle} languages={languages} />
      <PuzzleInfo puzzle={puzzle} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 300;
