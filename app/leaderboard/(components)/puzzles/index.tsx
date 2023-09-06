import type { FC } from 'react';

import LeaderboardPuzzlesFilters from './filters';
import LeaderboardPuzzlesTable from './table';
import { ExternalLink } from 'lucide-react';

import { fetchLeaderboardPuzzles } from '@/lib/utils';

import { Button, Card } from '@/components/ui';

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
  const minPuzzleId = (maxSeason - 1) * 5 + 1;
  const maxPuzzleId = Math.min(puzzles, maxSeason * 5);
  // Fetch the data of the latest season (i.e. data that is displayed by
  // default).
  const { data } = await fetchLeaderboardPuzzles({ minPuzzleId, maxPuzzleId });

  return (
    <Card>
      <Card.Header>Puzzles</Card.Header>
      <Card.Body noPadding>
        <div className="flex w-full flex-col gap-2 border-b border-stroke px-3 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <LeaderboardPuzzlesFilters maxSeason={maxSeason} puzzles={puzzles} />
            <Button
              className="ml-2"
              variant="outline"
              intent="neutral"
              rightIcon={<ExternalLink />}
            >
              Learn more
            </Button>
          </div>
        </div>
        <LeaderboardPuzzlesTable data={data.data} />
      </Card.Body>
    </Card>
  );
};

export default LeaderboardPuzzles;
