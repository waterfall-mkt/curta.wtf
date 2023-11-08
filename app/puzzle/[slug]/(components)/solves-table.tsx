'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import type { SortingState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import type { Solve } from '@/lib/types/protocol';
import { getBlockExplorerDomain, getTimeLeftString } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import ENSAvatarClient from '@/components/templates/ens-avatar-client';
import PhaseTag from '@/components/templates/phase-tag';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PuzzleSolvesTableProps = {
  data: Solve[];
  puzzleAddedTimestamp: number;
};

type PuzzleSolvesTableInternalProps = Omit<TableProps<Solve>, 'columns'> & {
  puzzleAddedTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleSolvesTable: FC<PuzzleSolvesTableProps> = ({ data, puzzleAddedTimestamp }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <PuzzleSolvesTableDesktop
        data={data}
        puzzleAddedTimestamp={puzzleAddedTimestamp}
        sorting={sorting}
        setSorting={setSorting}
      />
      <PuzzleSolvesTableMobile
        data={data}
        puzzleAddedTimestamp={puzzleAddedTimestamp}
        sorting={sorting}
        setSorting={setSorting}
      />
    </Fragment>
  );
};

const PuzzleSolvesTableDesktop: FC<PuzzleSolvesTableInternalProps> = ({
  data,
  puzzleAddedTimestamp,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<Solve>[] = useMemo(
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
          <div className="flex items-center gap-3.5">
            <div className="overflow-hidden rounded-full">
              <ENSAvatarClient
                nameOrAddress={row.original.solverEnsName ?? row.original.solver}
                size={40}
                prefetchedEnsAvatar={row.original.solverEnsAvatar}
              />
            </div>
            <AddressLinkClient
              className="text-gray-100"
              address={row.original.solver}
              prefetchedEnsName={row.original.solverEnsName}
            />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => 'Time taken',
        cell: ({ row }) => (
          <div title={new Date(1000 * row.original.solveTimestamp).toString()}>
            {getTimeLeftString(row.original.solveTimestamp - puzzleAddedTimestamp)}
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'phase',
        header: () => 'Phase',
        cell: ({ row }) => (
          <PhaseTag phase={row.original.phase} isPinging={row.original.phase < 3} />
        ),
        footer: (props) => props.column.id,
        size: 105,
      },
      {
        accessorKey: 'tx',
        header: () => 'Solution',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${getBlockExplorerDomain(row.original.chainId)}/tx/${
                  row.original.tx
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${getBlockExplorerDomain(row.original.chainId)}/tx/${row.original.tx}`,
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

const PuzzleSolvesTableMobile: FC<PuzzleSolvesTableInternalProps> = ({
  data,
  puzzleAddedTimestamp,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<Solve>[] = useMemo(
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
          <div className="flex items-center gap-3.5">
            <div className="overflow-hidden rounded-full">
              <ENSAvatarClient
                nameOrAddress={row.original.solverEnsName ?? row.original.solver}
                size={40}
                prefetchedEnsAvatar={row.original.solverEnsAvatar}
              />
            </div>
            <AddressLinkClient
              className="text-gray-100"
              address={row.original.solver}
              prefetchedEnsName={row.original.solverEnsName}
            />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolveTime',
        header: () => <div className="ml-auto">Time taken</div>,
        cell: ({ row }) => (
          <div
            className="flex flex-col"
            title={new Date(1000 * row.original.solveTimestamp).toString()}
          >
            <div>{getTimeLeftString(row.original.solveTimestamp - puzzleAddedTimestamp)}</div>
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

export default PuzzleSolvesTable;
