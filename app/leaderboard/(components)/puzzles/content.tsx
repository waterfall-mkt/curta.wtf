'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FC, Fragment, useCallback, useState } from 'react';

import fetchLeaderboardData from './server-action';
import LeaderboardPuzzlesTable from './table';
import { ChevronRightCircle, ExternalLink } from 'lucide-react';

import type { LeaderboardPuzzlesResponse } from '@/lib/utils/fetchLeaderboardPuzzles';

import PhaseTagPing from '@/components/templates/phase-tag/ping';
import { Button, Select } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesContentProps = {
  maxSeason: number;
  puzzles: number;
  defaultData: LeaderboardPuzzlesResponse['data'];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesContent: FC<LeaderboardPuzzlesContentProps> = ({
  maxSeason,
  puzzles,
  defaultData,
}) => {
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
  const [data, setData] = useState<LeaderboardPuzzlesResponse['data']>();
  const router = useRouter();
  const pathname = usePathname();
  const minPuzzleId = season === 0 ? 1 : (season - 1) * 5 + 1;
  const isSeasonOver = season * 5 <= puzzles;

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
    <Fragment>
      <div className="flex w-full flex-col gap-2 border-b border-stroke px-3 py-3 md:px-6">
        <div className="flex items-center justify-between">
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
                setData(
                  (
                    await fetchLeaderboardData({
                      minPuzzleId: newMinPuzzleId,
                      maxPuzzleId: newMaxPuzzleId,
                    })
                  ).data,
                );
              }}
              aria-label="Select a puzzles season leaderboard to view."
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
                {
                  children: (
                    <Fragment>
                      {season > 0 ? (
                        <PhaseTagPing
                          phase={isSeasonOver ? 3 : 0}
                          isPinging={!isSeasonOver}
                          title={
                            isSeasonOver
                              ? 'All puzzles for this season have been added.'
                              : 'There are still puzzles to be added for this season.'
                          }
                        />
                      ) : null}
                      <span>
                        Puzzles {minPuzzleId}-{season > 0 ? season * 5 : puzzles}
                      </span>
                    </Fragment>
                  ),
                },
                { children: `${data?.solvers ?? defaultData.solvers} solvers` },
                { children: `${data?.solves ?? defaultData.solves} solves` },
              ].map((item, index) => (
                <div
                  key={index}
                  className="line-clamp-1 flex h-6 min-w-fit items-center gap-1.5 rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100"
                >
                  {item.children}
                </div>
              ))}
            </div>
          </div>
          <Button
            className="ml-2"
            variant="outline"
            intent="neutral"
            rightIcon={<ExternalLink />}
            href="/docs/leaderboard"
            newTab
          >
            Learn more
          </Button>
        </div>
      </div>
      <LeaderboardPuzzlesTable data={data ? data.data : defaultData.data} />
    </Fragment>
  );
};

export default LeaderboardPuzzlesContent;
