import LeaderboardPuzzlesTableSkeleton from './(components)/puzzles/table-skeleton';
import { ChevronDown, ChevronRightCircle, ExternalLink, RefreshCw } from 'lucide-react';

import { Button, Card } from '@/components/ui';

export default function LoadingPage() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-xl font-medium text-gray-50 md:mb-4 md:text-display-md">
        Leaderboard
      </h1>
      <Card>
        <Card.Header>Puzzles</Card.Header>
        <Card.Body noPadding>
          <div className="flex w-full items-center justify-between gap-2 border-b border-stroke px-3 py-3 lg:px-6">
            <div className="hide-scrollbar relative flex grow items-center gap-2 overflow-x-scroll">
              {/* Season select skeleton */}
              <div className="relative flex h-8 animate-pulse items-center rounded-lg bg-gray-350 pl-3 pr-9">
                <div className="h-5 w-[4.75rem] animate-pulse rounded-md bg-gray-200" />
                <div className="absolute right-3 top-0 flex h-8 w-4 items-center">
                  <ChevronDown />
                </div>
              </div>
              {/* Separator */}
              <div className="relative flex h-8 w-3 items-center" role="separator">
                <hr className="absolute left-1.5 top-0 z-0 mx-auto h-8 border-l border-stroke" />
                <ChevronRightCircle className="z-10 h-3 w-3 bg-gray-600 text-gray-200 ring-1 ring-gray-600" />
              </div>
              {/* Table stats skeleton */}
              <div className="hide-scrollbar relative grow overflow-x-scroll">
                <div className="flex w-fit items-center gap-2">
                  {[108, 76, 72].map((width, i) => (
                    <div
                      key={i}
                      className="h-6 animate-pulse rounded-full bg-gray-350"
                      style={{ width }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button
              className="whitespace-nowrap"
              variant="outline"
              intent="neutral"
              rightIcon={<ExternalLink />}
              href="/docs/leaderboard"
              newTab
            >
              Docs
            </Button>
          </div>
          <LeaderboardPuzzlesTableSkeleton />
        </Card.Body>
      </Card>
      <div className="mt-2 flex items-center gap-2">
        <Button variant="outline" intent="neutral" leftIcon={<RefreshCw />} disabled>
          Refresh
        </Button>
        <div className="h-5 w-40 animate-pulse rounded-md bg-gray-350" />
      </div>
    </div>
  );
}
