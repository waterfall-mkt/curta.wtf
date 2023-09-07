'use client';

import { type FC, useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import InfoTooltip from '@/components/templates/info-tooltip';
import { Table } from '@/components/ui';

const LeaderboardPuzzlesTableSkeletonMobile: FC = () => {
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
        size: 500,
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
        size: 55,
      },
      {
        accessorKey: 'accordion',
        header: () => 'Expand',
        cell: ({ row }) => <Table.AccordionButton row={row} />,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  return (
    <Table
      className="md:hidden"
      columns={columns}
      data={Array(10).fill(null)}
      topRounded={false}
      noBorder
    />
  );
};

export default LeaderboardPuzzlesTableSkeletonMobile;
