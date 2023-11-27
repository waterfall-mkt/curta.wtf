'use client';

import { type FC, Fragment, useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { IconButton, Table } from '@/components/ui';

const PuzzleSolvesTableSkeleton: FC = () => {
  return (
    <Fragment>
      <PuzzleSolvesTableDesktopSkeleton />
      <PuzzleSolvesTableMobileSkeleton />
    </Fragment>
  );
};

const PuzzleSolvesTableDesktopSkeleton: FC = () => {
  const columns: ColumnDef<null>[] = useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: () => <div className="h-5 w-3 animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 55,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: () => (
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => 'Time taken',
        cell: () => <div className="h-5 w-[3.375rem] animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'phase',
        header: () => 'Phase',
        cell: () => <div className="h-7 w-[5.5rem] animate-pulse rounded-lg bg-gray-350"></div>,
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'solveTx',
        header: () => 'Solution',
        cell: () => {
          return (
            <div className="flex justify-end">
              <IconButton variant="outline" intent="neutral" disabled>
                <ExternalLink />
              </IconButton>
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return <Table className="hidden md:block" columns={columns} data={Array(11).fill(null)} />;
};

const PuzzleSolvesTableMobileSkeleton: FC = () => {
  const columns: ColumnDef<null>[] = useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: () => <div className="h-5 w-3 animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 70,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: () => (
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => <div className="ml-auto">Time taken</div>,
        cell: () => (
          <div>
            <div className="h-5 w-[3.375rem] animate-pulse rounded-md bg-gray-350" />
            <div className="h-4 w-[2.875rem] animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
    ],
    [],
  );

  return <Table className="md:hidden" columns={columns} data={Array(11).fill(null)} />;
};

export default PuzzleSolvesTableSkeleton;
