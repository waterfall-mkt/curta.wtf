import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PuzzleHeader from './(components)/header';
import PuzzleInfo from './(components)/info';
import PuzzleProblemDisplay from './(components)/problem-display';
import PuzzleSolvesTable from './(components)/solves-table';

import { fetchPuzzleById, fetchPuzzleSolvesById, getBaseMetadata } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

const description = 'A CTF protocol, where players create and solve EVM puzzles to earn NFTs.';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: puzzle } = await fetchPuzzleById(Number(params.id));
  if (!puzzle) return {};

  return getBaseMetadata({ title: `Puzzle #${puzzle.id}`, description });
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  // Return 404 if `id` is not a number.
  if (isNaN(id)) return notFound();

  const [{ data: puzzle, error }, { data: solves }] = await Promise.all([
    fetchPuzzleById(id),
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
