'use client';

import { Fragment, useState } from 'react';

import LeaderboardPuzzlesTableDesktop from './desktop';
import LeaderboardPuzzlesTableMobile from './mobile';
import type { Row, SortingState } from '@tanstack/react-table';

import type { PuzzleSolve, PuzzleSolver } from '@/lib/types/protocol';

import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LeaderboardPuzzlesTableProps = {
  data: PuzzleSolver[];
};

export type LeaderboardPuzzlesTableInternalProps = Omit<TableProps<PuzzleSolver>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LeaderboardPuzzlesTable: React.FC<LeaderboardPuzzlesTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <LeaderboardPuzzlesTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <LeaderboardPuzzlesTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

export const getPuzzleRowRoute = ({ row }: { row: Row<PuzzleSolve> }): `/${string}` => {
  return `/puzzle/${row.original.chainId}:${row.original.puzzleId}`;
};

export default LeaderboardPuzzlesTable;
