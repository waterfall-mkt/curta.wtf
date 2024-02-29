'use client';

import revalidateData from './server-action';
import { RefreshCw } from 'lucide-react';
import TimeAgo from 'react-timeago';

import { useToast } from '@/components/ui';
import { Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardRevalidateProps = {
  lastUpdated: Date;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const LeaderboardRevalidate: React.FC<LeaderboardRevalidateProps> = ({ lastUpdated }) => {
  const { toast } = useToast();

  return (
    <div className="mt-2 flex items-center gap-2">
      <Button
        variant="outline"
        intent="neutral"
        leftIcon={<RefreshCw />}
        onClick={() => {
          if (lastUpdated.getTime() > Date.now() - 60_000) {
            toast({
              intent: 'fail',
              title: 'Refresh failed',
              description: 'Leaderboard may only be updated every minute.',
            });
          } else {
            toast({
              intent: 'success',
              title: 'Leaderboard refreshed',
              description: 'Data will be updated momentarily!',
            });
          }
          revalidateData(lastUpdated);
        }}
      >
        Refresh
      </Button>
      <div className="text-sm text-gray-200" title={lastUpdated.toString()}>
        <span>Last updated </span>
        <span>
          <TimeAgo date={lastUpdated} />
        </span>
      </div>
    </div>
  );
};

export default LeaderboardRevalidate;
