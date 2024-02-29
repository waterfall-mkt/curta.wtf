'use client';

import { Fragment, useMemo, useState } from 'react';

import { PuzzleSolveValue } from './types';
import type { SortingState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import type { Phase } from '@/lib/types/protocol';
import { getChainInfo, getTimeLeftString } from '@/lib/utils';

import AddressDisplayClient from '@/components/templates/address-display-client';
import PhaseTag from '@/components/templates/phase-tag';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleSolvesDataTableProps = {
  data: PuzzleSolveValue[];
  puzzleAddedTimestamp: number;
};

type PuzzleSolvesDataTableInternalProps = Omit<TableProps<PuzzleSolveValue>, 'columns'> & {
  puzzleAddedTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleSolvesDataTable: React.FC<PuzzleSolvesDataTableProps> = ({
  data,
  puzzleAddedTimestamp,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <PuzzleSolvesDataTableDesktop
        data={data}
        puzzleAddedTimestamp={puzzleAddedTimestamp}
        sorting={sorting}
        setSorting={setSorting}
      />
      <PuzzleSolvesDataTableMobile
        data={data}
        puzzleAddedTimestamp={puzzleAddedTimestamp}
        sorting={sorting}
        setSorting={setSorting}
      />
    </Fragment>
  );
};

const PuzzleSolvesDataTableDesktop: React.FC<PuzzleSolvesDataTableInternalProps> = ({
  data,
  puzzleAddedTimestamp,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<PuzzleSolveValue>[] = useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: ({ row }) => row.original.rank,
        footer: (props) => props.column.id,
        size: 55,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: ({ row }) => (
          <AddressDisplayClient
            address={row.original.solver.address as `0x${string}`}
            label={row.original.solver.info?.displayName ?? undefined}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => 'Time taken',
        cell: ({ row }) => (
          <div
            title={
              row.original.solveTimestamp
                ? new Date(1000 * row.original.solveTimestamp).toString()
                : undefined
            }
          >
            {row.original.solveTimestamp
              ? getTimeLeftString(row.original.solveTimestamp - puzzleAddedTimestamp)
              : '–'}
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'phase',
        header: () => 'Phase',
        cell: ({ row }) => {
          const phase = (row.original.phase ?? 0) as Phase;

          return <PhaseTag phase={phase} isPinging={phase < 3} />;
        },
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'solveTx',
        header: () => 'Solution',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${getChainInfo(row.original.chainId).blockExplorer}/tx/${
                  row.original.solveTx
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${getChainInfo(row.original.chainId).blockExplorer}/tx/${
                      row.original.solveTx
                    }`,
                    '_blank',
                  );
                }}
                aria-label={`View ${row.original.solver}'s solution of puzzle ${row.original.puzzleId} on chain ${row.original.chainId}.`}
              >
                <ExternalLink />
              </IconButton>
            </div>
          );
        },
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [puzzleAddedTimestamp],
  );

  return (
    <Table
      className="hidden md:block"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
};

const PuzzleSolvesDataTableMobile: React.FC<PuzzleSolvesDataTableInternalProps> = ({
  data,
  puzzleAddedTimestamp,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<PuzzleSolveValue>[] = useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: () => 'Rank',
        cell: ({ row }) => row.original.rank,
        footer: (props) => props.column.id,
        size: 70,
      },
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: ({ row }) => (
          <AddressDisplayClient
            address={row.original.solver.address as `0x${string}`}
            label={row.original.solver.info?.displayName ?? undefined}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => <div className="ml-auto">Time taken</div>,
        cell: ({ row }) => (
          <div
            className="flex flex-col"
            title={
              row.original.solveTimestamp
                ? new Date(1000 * row.original.solveTimestamp).toString()
                : undefined
            }
          >
            <div>
              {row.original.solveTimestamp
                ? getTimeLeftString(row.original.solveTimestamp - puzzleAddedTimestamp)
                : '–'}
            </div>
            <div className="text-xs text-gray-200">Phase {row.original.phase}</div>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
    ],
    [puzzleAddedTimestamp],
  );

  return (
    <Table
      className="md:hidden"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
};

export default PuzzleSolvesDataTable;
