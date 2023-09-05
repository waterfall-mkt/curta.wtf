'use client';

import { type FC, Fragment, useState } from 'react';

import LeaderboardTableDesktop from './desktop';
import LeaderboardTableMobile from './mobile';
import type { Row, SortingState } from '@tanstack/react-table';

import type { Solve, Solver } from '@/lib/types/protocol';

import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardTableProps = {
  data: Solver[];
};

export type LeaderboardTableInternalProps = Omit<TableProps<Solver>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardTable: FC<LeaderboardTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <LeaderboardTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <LeaderboardTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

export const getPuzzleRowRoute = ({ row }: { row: Row<Solve> }): `/${string}` => {
  return `/puzzle/${row.original.puzzleId}`;
};

export default LeaderboardTable;
