'use client';

import { useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import InfoTooltip from '@/components/templates/info-tooltip';
import { Table } from '@/components/ui';

const LeaderboardPuzzlesTableSkeletonDesktop: React.FC = () => {
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
        size: 182,
      },
      {
        accessorKey: 'count.phase0',
        header: () => 'Breakdown',
        cell: () => <div className="h-5 w-[3.375rem] animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'speedScore',
        header: () => (
          <div className="flex items-center space-x-1">
            <div>Speed score</div>
            <InfoTooltip term="SPEED_SCORE" />
          </div>
        ),
        cell: () => (
          <div className="flex flex-col gap-1">
            <div className="h-5 w-9 animate-pulse rounded-md bg-gray-350" />
            <div className="h-2 w-40 animate-pulse rounded-full bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 160,
      },
      {
        accessorKey: 'count.total',
        header: () => 'Puzzles solved',
        cell: () => <div className="h-5 w-4 animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'points',
        header: () => (
          <div className="ml-auto flex items-center gap-1">
            <div>Points</div>
            <InfoTooltip term="POINTS" />
          </div>
        ),
        cell: () => <div className="ml-auto h-5 w-4 animate-pulse rounded-md bg-gray-350" />,
        footer: (props) => props.column.id,
        size: 65,
      },
      {
        accessorKey: 'accordion',
        header: () => 'Expand',
        cell: ({ row }) => <Table.AccordionButton row={row} />,
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return (
    <Table
      className="hidden md:block"
      columns={columns}
      data={Array(11).fill(null)}
      topRounded={false}
      noBorder
    />
  );
};

export default LeaderboardPuzzlesTableSkeletonDesktop;
