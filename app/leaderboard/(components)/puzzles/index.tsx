import type { FC } from 'react';

import LeaderboardPuzzlesContent from './content';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

import { Card } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesProps = {
  puzzles: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzles: FC<LeaderboardPuzzlesProps> = async ({ puzzles }) => {
  const maxSeason = Math.ceil(puzzles / 5);
  const minPuzzleIndex = (maxSeason - 1) * 5 + 1;
  const maxPuzzleIndex = Math.min(puzzles, maxSeason * 5);
  // Fetch the data of the latest season (i.e. data that is displayed by
  // default).
  const { data } = await fetchLeaderboardPuzzles({ minPuzzleIndex, maxPuzzleIndex });

  return (
    <Card>
      <Card.Header>Puzzles</Card.Header>
      <Card.Body noPadding>
        <LeaderboardPuzzlesContent maxSeason={maxSeason} puzzles={puzzles} defaultData={data} />
      </Card.Body>
    </Card>
  );
};

export default LeaderboardPuzzles;
