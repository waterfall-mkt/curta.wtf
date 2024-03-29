'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';

import LeaderboardPuzzlesDataTable from './data-table';
import fetchLeaderboardData from './server-action';
import LeaderboardPuzzlesTableSkeleton from './table-skeleton';
import type { Event } from '@prisma/client';
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
  events: Event[];
  defaultData: LeaderboardPuzzlesResponse;
  defaultFilter: string;
};

export type LeaderboardPuzzlesFilterAndValue =
  | { type: 'all'; value?: undefined }
  | { type: 'season'; value: number }
  | { type: 'event'; value: string };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesContent: React.FC<LeaderboardPuzzlesContentProps> = ({
  maxSeason,
  puzzles,
  events,
  defaultData,
  defaultFilter,
}) => {
  const searchParams = useSearchParams();

  // ---------------------------------------------------------------------------
  // URL search param parsing
  // ---------------------------------------------------------------------------

  // Query the `filter` search param and set the default filter types:
  //     * `all`: Include all puzzles except `isEvent: true` puzzles.
  //     * `season`: Include all puzzles from the parsed season number. In the
  //                 form of `season_${seasonNumber}`. If the parsed season
  //                 number is not a valid season number, set the default season
  //                 to the latest season.
  //     * `event`: Include all puzzles from the parsed event number. In the
  //                form of `event_${eventSlug}`. If the parsed event slug is
  //                not a valid event slug, set the default event to the latest
  //                event.
  const filterSearchParam = searchParams.get('filter')?.toLowerCase() ?? defaultFilter;
  const filterTypeAndValue = getFilterTypeAndValue(filterSearchParam, maxSeason, events);
  const defaultSeason = filterTypeAndValue.type === 'season' ? filterTypeAndValue.value : maxSeason; // Default to max season.
  const defaultEventSlug =
    filterTypeAndValue.type === 'event'
      ? filterTypeAndValue.value
      : events.length > 0
      ? events[events.length - 1].slug // Default to latest event slug by default.
      : '';

  // ---------------------------------------------------------------------------
  // Filtered data state
  // ---------------------------------------------------------------------------

  const [filter, setFilter] = useState<string>(getFilter(filterTypeAndValue));
  const [season, setSeason] = useState<number>(defaultSeason);
  const [eventSlug, setEventSlug] = useState<string>(defaultEventSlug);
  const [data, setData] = useState<LeaderboardPuzzlesResponse>();
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSeasonOver = season * 5 <= puzzles;
  // `1_000_000_000_000` is some nonsensical timestamp in the future: ~Sep. 26,
  // 33568.
  const isEventOver =
    new Date(events.find((event) => event.slug === eventSlug)?.endDate ?? 1_000_000_000_000) <
    new Date();

  const fetchAndSetData = useCallback(
    async (filter: LeaderboardPuzzlesFilterAndValue) => {
      setData(await fetchLeaderboardData(filter, puzzles));
    },
    [puzzles],
  );

  // Fetch the data for the default filters on component mount if it's not the
  // default filter.
  useEffect(() => {
    if (filter !== defaultFilter) {
      fetchAndSetData(getFilterTypeAndValue(filter, maxSeason, events));
    }
  }, [defaultFilter, events, fetchAndSetData, filter, maxSeason]);

  // A helper function to update the URL search params when a user filters to a
  // new season in the table via the UI to keep URL<>component states synced.
  const updateSearchParams = useCallback(
    (value: string) => {
      // Instantiate a new `URLSearchParams` object from the current search and
      // replace the `filter` with the new page index.
      const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
      newSearchParams.set('filter', value === 'all' ? 'all' : value);
      // If the new season is `sdefaultFilter`, we want to remove `filter` from
      // the search params entirely because the latest season is rendered by
      // by default.
      if (value === defaultFilter) newSearchParams.delete('filter');

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, defaultFilter, router, pathname],
  );

  // Function to keep everything synced when a new season is selected:
  //     * Component state
  //     * URL search params
  //     * Displayed data
  const onFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    updateSearchParams(value);

    const { type: newFilterType, value: newValue } = getFilterTypeAndValue(
      value,
      maxSeason,
      events,
    );
    // Only fetch new data if the new filter is not the default filter because
    // we already have fallback/default data via `defaultData`.
    if (value !== defaultFilter) {
      if (newFilterType === 'all') {
        await fetchAndSetData({ type: newFilterType });
      } else if (newFilterType === 'season') {
        setSeason(newValue);
        await fetchAndSetData({ type: newFilterType, value: newValue });
      } else if (newFilterType === 'event') {
        setEventSlug(newValue);
        await fetchAndSetData({ type: newFilterType, value: newValue });
      }
    } else {
      setData(defaultData);
    }
  };

  // Function for setting scroll values to conditionally render gradient
  // overflows.
  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

  // `loading` is true if `data` is inconsistent with the selected filter. The
  // `filter !== defaultFilter` condition is present because we already have the
  // default data via `defaultData`.
  const loading = filter !== data?.filter && filter !== defaultFilter;

  return (
    <Fragment>
      <div className="flex w-full items-center justify-between gap-2 border-b border-stroke px-3 py-3 lg:px-6">
        <div className="hide-scrollbar relative -m-1 flex grow items-center gap-2 overflow-x-scroll p-1">
          <Select
            variant="secondary"
            value={filter}
            onChange={onFilterChange}
            aria-label="Select a filtered Puzzles leaderboard to view."
          >
            <Select.Item value="all">All seasons</Select.Item>
            {Array(maxSeason)
              .fill(null)
              .map((_, i) => (
                <Select.Item key={`s${i}`} value={`season_${maxSeason - i}`}>
                  Season {maxSeason - i}
                </Select.Item>
              ))}
            {events.map((event, i) => (
              <Select.Item key={`e${i}`} value={`event_${event.slug}`}>
                {event.name}
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
                            {filter !== 'all' ? (
                              filter.startsWith('season_') ? (
                                <PhaseTagPing
                                  phase={isSeasonOver ? 3 : 0}
                                  isPinging={!isSeasonOver}
                                  title={
                                    isSeasonOver
                                      ? 'All puzzles for this season have been added.'
                                      : 'There are still puzzles to be added for this season.'
                                  }
                                />
                              ) : (
                                <PhaseTagPing
                                  phase={isEventOver ? 3 : 0}
                                  isPinging={!isEventOver}
                                  title={
                                    isEventOver
                                      ? 'The event is over.'
                                      : 'The event is still ongoing.'
                                  }
                                />
                              )
                            ) : null}
                            <span className="w-fit whitespace-nowrap">
                              {`${data?.puzzles ?? defaultData.puzzles} puzzles`}
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
                  : [78, 76, 72].map((width, i) => (
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
        <LeaderboardPuzzlesDataTable data={data ? data.data : defaultData.data} />
      ) : (
        <LeaderboardPuzzlesTableSkeleton />
      )}
    </Fragment>
  );
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

const getFilter = (filterTypeAndValue: LeaderboardPuzzlesFilterAndValue): string => {
  if (filterTypeAndValue.type === 'all') {
    return 'all';
  } else if (filterTypeAndValue.type === 'season') {
    return `season_${filterTypeAndValue.value}`;
  }

  return `event_${filterTypeAndValue.value}`;
};

const getFilterTypeAndValue = (
  filter: string,
  maxSeason: number,
  events: Event[],
): LeaderboardPuzzlesFilterAndValue => {
  if (filter === 'all') {
    return { type: filter, value: undefined };
  } else if (filter.startsWith('season_')) {
    const parsedValue = Number(filter.split('_')[1]);
    const season =
      Number.isNaN(parsedValue) || parsedValue < 1 || parsedValue > maxSeason
        ? maxSeason
        : parsedValue;

    return { type: 'season', value: season };
  } else if (filter.startsWith('event_')) {
    const parsedValue = filter.split('_')[1];
    const defaultValue =
      events.find((event) => event.slug === parsedValue) !== undefined
        ? parsedValue
        : events.length > 0
        ? events[events.length - 1].slug
        : '';

    return { type: 'event', value: defaultValue };
  }

  // Fallback to latest season.
  return { type: 'season', value: maxSeason };
};

export default LeaderboardPuzzlesContent;
