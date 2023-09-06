import LeaderboardRevalidate from './(components)/revalidate';
import LeaderboardTable from './(components)/table';
import { ChevronRightCircle, ExternalLink } from 'lucide-react';

import { fetchLeaderboard, getBaseMetadata } from '@/lib/utils';

import { Button, Card, Select } from '@/components/ui';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata = getBaseMetadata({
  title: 'Leaderboard',
  description: 'Top performing developers on Curta.',
});

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page() {
  const { data } = await fetchLeaderboard();
  const lastUpdated = new Date(data.lastUpdated);

  const season = Math.ceil(data.puzzles / 5);
  const minPuzzleId = (season - 1) * 5 + 1;
  const maxPuzzleId = Math.min(data.puzzles, season * 5);
  const { data: defaultData } = await fetchLeaderboard({ minPuzzleId, maxPuzzleId });

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl font-medium text-gray-50 md:mb-4 md:text-display-md">
        Leaderboard
      </h1>
      <Card>
        <Card.Header>Puzzles</Card.Header>
        <Card.Body noPadding>
          <div className="flex w-full flex-col gap-2 border-b border-stroke px-3 py-3 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select variant="secondary" defaultValue={season}>
                  <Select.Item value={0}>All seasons</Select.Item>
                  <Select.Item value={4}>Season 4</Select.Item>
                  <Select.Item value={3}>Season 3</Select.Item>
                  <Select.Item value={2}>Season 2</Select.Item>
                  <Select.Item value={1}>Season 1</Select.Item>
                </Select>
                <div className="relative flex h-8 w-3 items-center">
                  <hr
                    className="absolute left-1.5 top-0 z-0 mx-auto h-8 border-l border-stroke"
                    role="separator"
                  />
                  <ChevronRightCircle className="z-10 h-3 w-3 bg-gray-600 text-gray-200 ring-1 ring-gray-600" />
                </div>
                <div className="flex h-6 items-center rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100">
                  Puzzles {minPuzzleId}-{maxPuzzleId}
                </div>
                <div className="flex h-6 items-center rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100">
                  {defaultData.solvers} solvers
                </div>
                <div className="flex h-6 items-center rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100">
                  {defaultData.solves} solves
                </div>
              </div>
              <Button variant="outline" intent="neutral" rightIcon={<ExternalLink />}>
                Learn more
              </Button>
            </div>
          </div>
          <LeaderboardTable data={defaultData.data} />
        </Card.Body>
      </Card>
      <LeaderboardRevalidate lastUpdated={lastUpdated} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 3600;
