'use client';

import type { FC } from 'react';

import revalidateData from './server-action';
import { RefreshCw } from 'lucide-react';

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

export const LeaderboardRevalidate: FC<LeaderboardRevalidateProps> = ({ lastUpdated }) => {
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
            revalidateData();
            toast({
              intent: 'success',
              title: 'Leaderboard refreshed',
              description: 'Data will be updated momentarily!',
            });
          }
        }}
      >
        Refresh
      </Button>
      <div className="text-sm text-gray-200" title={lastUpdated.toString()}>
        {`Last updated ${lastUpdated.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        })} ${lastUpdated.toLocaleTimeString('en-US', { timeStyle: 'short' })}`}
      </div>
    </div>
  );
};

export default LeaderboardRevalidate;
