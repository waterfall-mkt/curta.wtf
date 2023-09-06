'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FC, useCallback, useState } from 'react';

import fetchLeaderboardData from './server-action';
import { ChevronRightCircle } from 'lucide-react';

import { Select } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesFiltersProps = {
  maxSeason: number;
  puzzles: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesFilters: FC<LeaderboardPuzzlesFiltersProps> = ({ maxSeason, puzzles }) => {
  const searchParams = useSearchParams();
  // Query the `puzzles-season` search param and set the default season to the
  // value of the search param if it is a valid season number, otherwise set the
  // default season to the latest season. Additionally, if the search param is
  // the special keyword `all`, set the default season to 0.
  const seasonSearchParam = searchParams.get('puzzles-season') ?? maxSeason.toString();
  const defaultSeason =
    seasonSearchParam.toLowerCase() === 'all'
      ? 0
      : // Check if the search param is not 'all' or a valid season number.
      Number.isNaN(Number(seasonSearchParam)) ||
        Number(seasonSearchParam) < 0 ||
        Number(seasonSearchParam) > maxSeason
      ? maxSeason
      : Number(seasonSearchParam);
  const [season, setSeason] = useState<number>(defaultSeason);
  const router = useRouter();
  const pathname = usePathname();
  const minPuzzleId = season === 0 ? 1 : (season - 1) * 5 + 1;
  const maxPuzzleId = season === 0 ? puzzles : Math.min(puzzles, season * 5);

  // A helper function to update the URL search params when a user filters to a
  // new season in the table via the UI to keep URL<>component states synced.
  const updateSearchParams = useCallback(
    (newSeason: number) => {
      // Instantiate a new `URLSearchParams` object from the current search and
      // replace the `puzzles-season` with the new page index.
      const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
      newSearchParams.set('puzzles-season', newSeason === 0 ? 'all' : newSeason.toString());

      // If the new season is `maxSeason`, we want to remove `puzzles-season`
      // from the search params entirely because the latest season is rendered
      // by default.
      if (newSeason === maxSeason) newSearchParams.delete('puzzles-season');

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, maxSeason, router, pathname],
  );

  return (
    <div className="flex items-center gap-2">
      <Select
        variant="secondary"
        defaultValue={defaultSeason}
        value={season}
        onChange={async (e) => {
          const newSeason = Number(e.target.value);

          setSeason(newSeason);
          updateSearchParams(newSeason);
          const newMinPuzzleId = newSeason === 0 ? 1 : (newSeason - 1) * 5 + 1;
          const newMaxPuzzleId = newSeason === 0 ? puzzles : Math.min(puzzles, newSeason * 5);
          console.log(
            await fetchLeaderboardData({
              minPuzzleId: newMinPuzzleId,
              maxPuzzleId: newMaxPuzzleId,
            }),
          );
        }}
      >
        <Select.Item value={0}>All seasons</Select.Item>
        {Array(maxSeason)
          .fill(null)
          .map((_, i) => (
            <Select.Item key={i} value={maxSeason - i}>
              Season {maxSeason - i}
            </Select.Item>
          ))}
      </Select>
      <div className="relative flex h-8 w-3 items-center" role="separator">
        <hr className="absolute left-1.5 top-0 z-0 mx-auto h-8 border-l border-stroke" />
        <ChevronRightCircle className="z-10 h-3 w-3 bg-gray-600 text-gray-200 ring-1 ring-gray-600" />
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll">
        {[
          { value: `Puzzles ${minPuzzleId}-${maxPuzzleId}`, hidden: minPuzzleId === maxPuzzleId },
          { value: '{data.solvers} solvers' },
          { value: '{data.solves} solves' },
        ].map((item, index) =>
          item.hidden ? null : (
            <div
              key={index}
              className="line-clamp-1 flex h-6 min-w-fit items-center rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100"
            >
              {item.value}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default LeaderboardPuzzlesFilters;
