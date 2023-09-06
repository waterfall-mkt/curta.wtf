'use client';

import { type FC, useState } from 'react';

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
  const [season, setSeason] = useState<number>(maxSeason);
  const minPuzzleId = season === 0 ? 1 : (season - 1) * 5 + 1;
  const maxPuzzleId = season === 0 ? puzzles : Math.min(puzzles, season * 5);

  return (
    <div className="flex items-center gap-2">
      <Select
        variant="secondary"
        defaultValue={maxSeason}
        value={season}
        onChange={(e) => setSeason(Number(e.target.value))}
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
