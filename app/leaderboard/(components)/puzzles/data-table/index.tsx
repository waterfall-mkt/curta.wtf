'use client';

import { Fragment, useState } from 'react';

import LeaderboardPuzzlesDataTableDesktop from './desktop';
import LeaderboardPuzzlesDataTableMobile from './mobile';
import type { Row, SortingState } from '@tanstack/react-table';

import type { PuzzleSolve, PuzzleSolver } from '@/lib/types/protocol';

import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesDataTableProps = {
  data: PuzzleSolver[];
};

export type LeaderboardPuzzlesDataTableInternalProps = Omit<TableProps<PuzzleSolver>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesDataTable: React.FC<LeaderboardPuzzlesDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <LeaderboardPuzzlesDataTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <LeaderboardPuzzlesDataTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

export const getPuzzleRowRoute = ({ row }: { row: Row<PuzzleSolve> }): `/${string}` => {
  return `/puzzle/${row.original.chainId}:${row.original.puzzleId}`;
};

export default LeaderboardPuzzlesDataTable;
