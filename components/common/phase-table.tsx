'use client';

import { type FC, useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { Phase } from '@/lib/types/protocol';

import PhaseTag from '@/components/templates/phase-tag';
import { Table } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type PhaseTableProps = {
  className?: string;
};

type PhaseTableRowType = { phase: Phase; meaning: string; length: string };

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const PhaseTable: FC<PhaseTableProps> = ({ className }) => {
  const columns = useMemo<ColumnDef<PhaseTableRowType>[]>(
    () => [
      {
        accessorKey: 'phase',
        header: () => 'Phase',
        cell: ({ row }) => (
          <PhaseTag phase={row.original.phase} isPinging={row.original.phase < 3} />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'meaning',
        header: () => 'Meaning',
        cell: ({ row }) => row.original.meaning,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'length',
        header: () => 'Length',
        cell: ({ row }) => row.original.length,
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const data: PhaseTableRowType[] = [
    { phase: 0, meaning: 'No one solved puzzle', length: '∞' },
    { phase: 1, meaning: '1 person solved', length: '2 days' },
    { phase: 2, meaning: 'Solution revealed', length: '3 days' },
    { phase: 3, meaning: 'Submissions closed', length: '∞' },
  ];

  return (
    <Table
      className={twMerge(
        clsx('not-prose mx-auto w-full sm:min-w-[24rem] sm:max-w-[32rem]', className),
      )}
      columns={columns}
      data={data}
    />
  );
};

PhaseTable.displayName = 'PhaseTable';

export default PhaseTable;
