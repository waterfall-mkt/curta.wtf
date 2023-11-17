'use server';

import type { LeaderboardPuzzlesFilterAndValue } from './content';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

export default async function action(filter: LeaderboardPuzzlesFilterAndValue, puzzles: number) {
  if (filter.type === 'all') {
    return await fetchLeaderboardPuzzles({
      minPuzzleIndex: 1,
      maxPuzzleIndex: Number.MAX_SAFE_INTEGER,
      filter: 'all',
      excludeEvents: true,
    });
  } else if (filter.type === 'season') {
    const minPuzzleIndex = (filter.value - 1) * 5 + 1;
    const maxPuzzleIndex = Math.min(puzzles, filter.value * 5);

    return await fetchLeaderboardPuzzles({
      minPuzzleIndex,
      maxPuzzleIndex,
      filter: `season_${filter.value}`,
    });
  }

  return await fetchLeaderboardPuzzles({
    minPuzzleIndex: 1,
    maxPuzzleIndex: Number.MAX_SAFE_INTEGER,
    filter: `event_${filter.value}`,
    eventSlug: filter.value,
  });
}
