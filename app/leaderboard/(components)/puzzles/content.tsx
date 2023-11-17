'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  type ChangeEvent,
  type FC,
  Fragment,
  type UIEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import fetchLeaderboardData from './server-action';
import LeaderboardPuzzlesTable from './table';
import LeaderboardPuzzlesTableSkeleton from './table-skeleton';
import clsx from 'clsx';
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
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const minPuzzleIndex = season === 0 ? 1 : (season - 1) * 5 + 1;
  const maxPuzzleIndex = season === 0 ? puzzles : Math.min(puzzles, season * 5);
  const isSeasonOver = season * 5 <= puzzles;

  // Fetch the data for the default season on component mount if it's not the
  // default season.
  useEffect(() => {
    const fetchData = async () => {
      // Only fetch new data if the new season is not the latest season because
      // we already have the latest season's data via `defaultData`.
      if (season !== maxSeason) {
        setData((await fetchLeaderboardData({ minPuzzleIndex, maxPuzzleIndex })).data);
      }
    };

    fetchData();
  }, [maxPuzzleIndex, maxSeason, minPuzzleIndex, puzzles, season]);

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

  // Function to keep everything synced when a new season is selected:
  //     * Component state
  //     * URL search params
  //     * Displayed data
  const onSeasonChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newSeason = Number(e.target.value);

    setSeason(newSeason);
    updateSearchParams(newSeason);
    // Only fetch new data if the new season is not the latest season because we
    // already have the latest season's data via `defaultData`.
    if (newSeason !== maxSeason) {
      const newMinPuzzleIndex = newSeason === 0 ? 1 : (newSeason - 1) * 5 + 1;
      const newMaxPuzzleIndex = newSeason === 0 ? puzzles : Math.min(puzzles, newSeason * 5);
      setData(
        (
          await fetchLeaderboardData({
            minPuzzleIndex: newMinPuzzleIndex,
            maxPuzzleIndex: newMaxPuzzleIndex,
          })
        ).data,
      );
    } else if (newSeason === maxSeason) {
      setData(defaultData);
    }
  };

  // Function for setting scroll values to conditionally render gradient
  // overflows.
  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

  // `loading` is true if `data` is inconsistent with the selected season. The
  // `season !== maxSeason` condition is present because we already have the
  // latest season's data via `defaultData`.
  const loading =
    (minPuzzleIndex !== data?.minPuzzleIndex || maxPuzzleIndex !== data?.maxPuzzleIndex) &&
    season !== maxSeason;

  return (
    <Fragment>
      <div className="flex w-full items-center justify-between gap-2 border-b border-stroke px-3 py-3 lg:px-6">
        <div className="hide-scrollbar relative -m-1 flex grow items-center gap-2 overflow-x-scroll p-1">
          <Select
            variant="secondary"
            value={season}
            onChange={onSeasonChange}
            aria-label="Select a Puzzles season leaderboard to view."
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
          <div className="hide-scrollbar relative grow overflow-x-scroll">
            <div className="hide-scrollbar relative grow overflow-x-scroll" onScroll={onScroll}>
              <div className="flex w-fit items-center gap-2">
                {!loading
                  ? [
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
                            <span className="w-fit whitespace-nowrap">
                              {season > 0
                                ? '5 puzzles'
                                : `${maxPuzzleIndex - minPuzzleIndex + 1} puzzles`}
                            </span>
                          </Fragment>
                        ),
                      },
                      { children: `${data?.solvers ?? defaultData.solvers} solvers` },
                      { children: `${data?.solves ?? defaultData.solves} solves` },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="relative flex h-6 min-w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-stroke bg-gray-450 px-2 text-xs font-normal text-gray-100"
                      >
                        {item.children}
                      </div>
                    ))
                  : [108, 76, 72].map((width, i) => (
                      <div
                        key={i}
                        className="h-6 animate-pulse rounded-full bg-gray-350"
                        style={{ width }}
                      />
                    ))}
              </div>
            </div>
            <div
              className={clsx(
                'pointer-events-none absolute left-0 top-0 h-6 w-4 bg-gradient-to-r from-gray-600 transition-opacity',
                scrollIsAtLeft ? 'opacity-0' : 'opacity-100',
              )}
            />
            <div
              className={clsx(
                'pointer-events-none absolute right-0 top-0 h-6 w-4 bg-gradient-to-l from-gray-600 transition-opacity',
                scrollIsAtRight ? 'opacity-0' : 'opacity-100',
              )}
            />
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

      {!loading ? (
        <LeaderboardPuzzlesTable data={data ? data.data : defaultData.data} />
      ) : (
        <LeaderboardPuzzlesTableSkeleton />
      )}
    </Fragment>
  );
};

export default LeaderboardPuzzlesContent;
