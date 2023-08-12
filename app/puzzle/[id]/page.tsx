import { notFound } from 'next/navigation';

import PuzzleHeader from './(components)/header';
import PuzzleInfo from './(components)/info';
import PuzzleProblemDisplay from './(components)/problem-display';

import { fetchPuzzleById } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  // Return 404 if `id` is not a number.
  if (isNaN(id)) return notFound();

  const { data: puzzle, error } = await fetchPuzzleById(id);

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
    </div>
  );
}
