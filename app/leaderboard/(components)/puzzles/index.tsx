import LeaderboardPuzzlesContent from './content';

import { fetchEvents, fetchLeaderboardPuzzles } from '@/lib/utils';
import type { LeaderboardPuzzlesResponse } from '@/lib/utils/fetchLeaderboardPuzzles';

import { Card } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesProps = {
  puzzles: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzles: React.FC<LeaderboardPuzzlesProps> = async ({ puzzles }) => {
  const maxSeason = Math.ceil(puzzles / 5);

  // Fetch all events.
  const { data: events } = await fetchEvents();
  let defaultData: LeaderboardPuzzlesResponse['data'];
  let defaultFilter = `season_${maxSeason}`;
  if (events.length > 0 && events[events.length - 1].endDate > Date.now() / 1000) {
    // If the latest event is still ongoing, make the default season the event.
    const { data } = await fetchLeaderboardPuzzles({
      minPuzzleIndex: 0,
      maxPuzzleIndex: Number.MAX_SAFE_INTEGER - 1,
      filter: `event_${events[events.length - 1].slug}`,
      eventSlug: events[events.length - 1].slug,
    });
    defaultData = data;
    defaultFilter = `event_${events[events.length - 1].slug}`;
  } else {
    const minPuzzleIndex = (maxSeason - 1) * 5;
    const maxPuzzleIndex = Math.min(puzzles, maxSeason * 5) - 1;

    // Otherwise, default to the latest season.
    const { data } = await fetchLeaderboardPuzzles({
      minPuzzleIndex,
      maxPuzzleIndex,
      filter: `season_${maxSeason}`,
    });
    defaultData = data;
  }

  return (
    <Card>
      <Card.Header>Puzzles</Card.Header>
      <Card.Body noPadding>
        <LeaderboardPuzzlesContent
          maxSeason={maxSeason}
          puzzles={puzzles}
          events={events}
          defaultData={defaultData}
          defaultFilter={defaultFilter}
        />
      </Card.Body>
    </Card>
  );
};

export default LeaderboardPuzzles;
