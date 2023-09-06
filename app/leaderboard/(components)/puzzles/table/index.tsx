'use client';

import { type FC, Fragment, useState } from 'react';

import LeaderboardPuzzlesTableDesktop from './desktop';
import LeaderboardPuzzlesTableMobile from './mobile';
import type { Row, SortingState } from '@tanstack/react-table';

import type { Solve, Solver } from '@/lib/types/protocol';

import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesTableProps = {
  data: Solver[];
};

export type LeaderboardPuzzlesTableInternalProps = Omit<TableProps<Solver>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesTable: FC<LeaderboardPuzzlesTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <LeaderboardPuzzlesTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <LeaderboardPuzzlesTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

export const getPuzzleRowRoute = ({ row }: { row: Row<Solve> }): `/${string}` => {
  return `/puzzle/${row.original.puzzleId}`;
};

export default LeaderboardPuzzlesTable;
