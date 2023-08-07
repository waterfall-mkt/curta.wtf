'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import PuzzleTableCountdown from './countdown';
import type { ColumnDef } from '@tanstack/react-table';
import type { Row, SortingState } from '@tanstack/react-table';
import { File, Github } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getPuzzleTimeLeft } from '@/lib/utils';

import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleTableProps = {
  data: Puzzle[];
};

type PuzzleTableInternalProps = Omit<TableProps<Puzzle>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleTable: FC<PuzzleTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <PuzzleTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const PuzzleTableDesktop: FC<PuzzleTableInternalProps> = ({ data, sorting, setSorting }) => {
  const columns: ColumnDef<Puzzle>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => 'ID',
        cell: ({ row }) => row.original.id,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'timeLeft',
        header: () => 'Time till next phase',
        cell: ({ row }) => {
          const { phase, timeLeft } = getPuzzleTimeLeft(row.original.firstSolveTimestamp);

          return <PuzzleTableCountdown phase={phase} timeLeft={timeLeft} />;
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolver',
        header: () => 'First solver',
        cell: ({ row }) => (row.original.firstSolver ? 'wip' : '—'),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'numberSolved',
        header: () => 'Solvers',
        cell: ({ row }) => row.original.numberSolved,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'links',
        header: () => 'Links',
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-1">
              {row.original.solution ? (
                <IconButton
                  variant="tertiary"
                  intent="neutral"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(row.original.solution, '_blank');
                  }}
                  aria-label={`View puzzle #${row.original.id}'s solution.`}
                >
                  <File />
                </IconButton>
              ) : null}
              {row.original.github ? (
                <IconButton
                  variant="tertiary"
                  intent="neutral"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://github.com/${row.original.github}`, '_blank');
                  }}
                  aria-label={`View puzzle #${row.original.id}'s GitHub.`}
                >
                  <Github />
                </IconButton>
              ) : null}
              {
                <IconButton
                  variant="tertiary"
                  intent="neutral"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${row.original.address}`,
                      '_blank',
                    );
                  }}
                  aria-label={`View puzzle #${row.original.id}'s contract.`}
                >
                  <Github />
                </IconButton>
              }
            </div>
          );
        },
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  return (
    <Table
      className="hidden md:block"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
      getRowRoute={getRowRoute}
    />
  );
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

export const getRowRoute = ({ row }: { row: Row<Puzzle> }): `/${string}` => {
  return `/puzzle/${row.original.id}`;
};

export default PuzzleTable;
