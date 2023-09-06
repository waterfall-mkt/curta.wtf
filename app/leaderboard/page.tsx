import LeaderboardPuzzles from './(components)/puzzles';
import LeaderboardRevalidate from './(components)/revalidate';

import { fetchPuzzlesCount, getBaseMetadata } from '@/lib/utils';

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
  const { data } = await fetchPuzzlesCount();
  const lastUpdated = new Date(data.lastUpdated);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl font-medium text-gray-50 md:mb-4 md:text-display-md">
        Leaderboard
      </h1>
      <LeaderboardPuzzles puzzles={data.count} />
      <LeaderboardRevalidate lastUpdated={lastUpdated} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 3600;
