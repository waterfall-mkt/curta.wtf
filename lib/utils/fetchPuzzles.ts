'use server';

import { unstable_cache } from 'next/cache';

import { db } from '@/lib/db';

/**
 * Fetches and returns all Puzzles from all chains from the database.
 */
const fetchPuzzles = async () => {
  const isTestnet = Boolean(process.env.NEXT_PUBLIC_IS_TESTNET);

  return await unstable_cache(
    async () =>
      await db.puzzle.findMany({
        include: {
          author: { include: { info: true } },
          firstSolver: { include: { info: true } },
          _count: { select: { solves: true } },
        },
        where: { chain: { isTestnet }, disabled: false },
        orderBy: { addedTimestamp: 'desc' },
      }),
    [`puzzles-${isTestnet}`],
    { tags: ['puzzles'], revalidate: 3600 },
  )();
};

export default fetchPuzzles;
