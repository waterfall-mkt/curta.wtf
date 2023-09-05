import LeaderboardRevalidate from './(components)/revalidate';
import LeaderboardTable from './(components)/table';

import { fetchLeaderboard } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page() {
  const { data } = await fetchLeaderboard();
  const lastUpdated = new Date(data.lastUpdated);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl font-medium text-gray-50 md:mb-4 md:text-display-md">
        Leaderboard
      </h1>
      <LeaderboardTable data={data.data} />
      <LeaderboardRevalidate lastUpdated={lastUpdated} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Next.js config
// -----------------------------------------------------------------------------

export const revalidate = 3600;
