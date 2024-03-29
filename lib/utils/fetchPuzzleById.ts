'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Returns a Puzzle from the database with the given ID and chain ID.
 * @param id The ID of the puzzle.
 * @param chainId The ID of the chain the puzzle is on.
 */
const fetchPuzzleById = async (id: number, chainId: number) => {
  return await unstable_cache(
    async () =>
      await db.puzzle.findUnique({
        where: {
          id_chainId: { id, chainId },
        },
        include: {
          author: { include: { info: true } },
          event: true,
          firstSolver: { include: { info: true } },
          _count: { select: { solves: true } },
        },
      }),
    [`puzzle-${chainId}-${id}`],
    { tags: ['puzzles', `puzzles-${chainId}`, `puzzle-${chainId}-${id}`], revalidate: 300 },
  )();
};

export default fetchPuzzleById;
