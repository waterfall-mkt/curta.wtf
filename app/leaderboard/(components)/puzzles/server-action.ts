'use server';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

export default async function action(
  {
    minPuzzleIndex = 0,
    maxPuzzleIndex = Number.MAX_SAFE_INTEGER,
  }: {
    minPuzzleIndex?: number;
    maxPuzzleIndex?: number;
  } = { minPuzzleIndex: 0, maxPuzzleIndex: Number.MAX_SAFE_INTEGER },
) {
  const puzzles = await fetchLeaderboardPuzzles({ minPuzzleIndex, maxPuzzleIndex });

  return puzzles;
}
