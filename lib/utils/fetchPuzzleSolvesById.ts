'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Returns the solves for a Puzzle from the database with the given ID and chain
 * ID.
 * @param id The ID of the puzzle.
 * @param chainId The ID of the chain the puzzle is on.
 */
const fetchPuzzleSolvesById = async (id: number, chainId: number) => {
  return await unstable_cache(
    async () =>
      await db.puzzleSolve.findMany({
        where: { puzzleId: id, chainId },
        include: { solver: { include: { info: true } } },
      }),
    [`puzzle-solves-${chainId}-${id}`],
    {
      tags: ['puzzles', 'puzzles-solves', `puzzles-${chainId}`, `puzzles-${chainId}-${id}`],
      revalidate: 300,
    },
  )();
};

export default fetchPuzzleSolvesById;
