'use client';

import { Fragment, useState } from 'react';

import LeaderboardPuzzlesDataTableDesktop from './desktop';
import LeaderboardPuzzlesDataTableMobile from './mobile';
import type { Row, SortingState } from '@tanstack/react-table';

import type { LeaderboardPuzzleSolver } from '@/lib/utils/fetchLeaderboardPuzzles';

import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesDataTableProps = {
  data: LeaderboardPuzzleSolver[];
};

export type LeaderboardPuzzlesDataTableInternalProps = Omit<
  TableProps<LeaderboardPuzzleSolver>,
  'columns'
>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesDataTable: React.FC<LeaderboardPuzzlesDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  console.log(data);

  return (
    <Fragment>
      <LeaderboardPuzzlesDataTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <LeaderboardPuzzlesDataTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

export const getPuzzleRowRoute = ({
  row,
}: {
  row: Row<LeaderboardPuzzleSolver['solves'][0]>;
}): `/${string}` => {
  return `/puzzle/${row.original.chainId}:${row.original.puzzleId}`;
};

export default LeaderboardPuzzlesDataTable;
