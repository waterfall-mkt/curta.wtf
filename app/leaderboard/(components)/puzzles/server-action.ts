'use server';

import type { LeaderboardPuzzlesFilterAndValue } from './content';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

export default async function action(
  filter: LeaderboardPuzzlesFilterAndValue,
  puzzles: number,
  maxSeason: number,
) {
  if (filter.type === 'all') {
    return await fetchLeaderboardPuzzles();
  } else if (filter.type === 'season' && filter.value !== maxSeason) {
    const minPuzzleIndex = (filter.value - 1) * 5 + 1;
    const maxPuzzleIndex = Math.min(puzzles, filter.value * 5);
    return await fetchLeaderboardPuzzles({ minPuzzleIndex, maxPuzzleIndex });
  }

  return await fetchLeaderboardPuzzles();
}
