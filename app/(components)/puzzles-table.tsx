'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import PuzzleTableCountdown from './countdown';
import PuzzleTableInfo from './puzzle-table-info';
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { File, Github } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getPuzzleTimeLeft } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import Stat from '@/components/templates/stat';
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
      <PuzzleTableMobile data={data} sorting={sorting} setSorting={setSorting} />
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
        accessorKey: 'name',
        header: () => 'Puzzle',
        cell: ({ row }) => (
          <PuzzleTableInfo
            phase={getPuzzleTimeLeft(row.original.firstSolveTimestamp).phase}
            id={row.original.id}
            name={row.original.name}
            author={row.original.author}
          />
        ),
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
        cell: ({ row }) =>
          row.original.firstSolver ? (
            <AddressLinkClient
              className="text-gray-100"
              address={row.original.firstSolver}
              prefetchedEnsName={row.original.firstSolverEnsName}
            />
          ) : (
            '—'
          ),
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
                  variant="outline"
                  intent="neutral"
                  title={row.original.solution}
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
                  variant="outline"
                  intent="neutral"
                  title={`https://github.com/${row.original.github}`}
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
                  variant="outline"
                  intent="neutral"
                  title={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${row.original.address}`}
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

const PuzzleTableMobile: FC<PuzzleTableInternalProps> = ({ data, sorting, setSorting }) => {
  const columns = useMemo<ColumnDef<Puzzle>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => 'ID',
        cell: ({ row }) => row.original.id,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'name',
        header: () => 'Puzzle',
        cell: ({ row }) => (
          <PuzzleTableInfo
            phase={getPuzzleTimeLeft(row.original.firstSolveTimestamp).phase}
            id={row.original.id}
            name={row.original.name}
            author={row.original.author}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'numberSolved',
        header: () => <div className="ml-auto">Solvers</div>,
        cell: ({ row }) => <div className="flex justify-end">{row.original.numberSolved}</div>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'accordion',
        cell: ({ row }) => <Table.AccordionButton row={row} />,
        header: () => 'Expand',
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  return (
    <Table
      className="md:hidden"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
      renderSubComponent={({ row }) => <PuzzleTableMobileSubComponent data={row.original} />}
      getRowRoute={getRowRoute}
    />
  );
};

const PuzzleTableMobileSubComponent: FC<{ data: Puzzle }> = ({ data }) => {
  const { phase, timeLeft } = getPuzzleTimeLeft(data.firstSolveTimestamp);

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      <Stat
        name="Time till next phase"
        value={<PuzzleTableCountdown phase={phase} timeLeft={timeLeft} />}
      />
      <Stat
        name="First solver"
        value={
          data.firstSolver ? (
            <AddressLinkClient
              className="text-gray-100"
              address={data.firstSolver}
              prefetchedEnsName={data.firstSolverEnsName}
            />
          ) : (
            '—'
          )
        }
      />
      <Stat
        name="Links"
        value={
          <div className="mt-1 flex items-center justify-end gap-1">
            {data.solution ? (
              <IconButton
                variant="outline"
                intent="neutral"
                title={data.solution}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(data.solution, '_blank');
                }}
                aria-label={`View puzzle #${data.id}'s solution.`}
              >
                <File />
              </IconButton>
            ) : null}
            {data.github ? (
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://github.com/${data.github}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://github.com/${data.github}`, '_blank');
                }}
                aria-label={`View puzzle #${data.id}'s GitHub.`}
              >
                <Github />
              </IconButton>
            ) : null}
            {
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${data.address}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${data.address}`,
                    '_blank',
                  );
                }}
                aria-label={`View puzzle #${data.id}'s contract.`}
              >
                <Github />
              </IconButton>
            }
          </div>
        }
      />
    </div>
  );
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

export const getRowRoute = ({ row }: { row: Row<Puzzle> }): `/${string}` => {
  return `/puzzle/${row.original.id}`;
};

export default PuzzleTable;
