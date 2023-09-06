'use server';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

export default async function action(
  {
    minPuzzleId = 0,
    maxPuzzleId = Number.MAX_SAFE_INTEGER,
  }: {
    minPuzzleId?: number;
    maxPuzzleId?: number;
  } = { minPuzzleId: 0, maxPuzzleId: Number.MAX_SAFE_INTEGER },
) {
  const puzzles = await fetchLeaderboardPuzzles({ minPuzzleId, maxPuzzleId });

  return puzzles;
}
