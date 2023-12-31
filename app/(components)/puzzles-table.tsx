'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import PuzzleTableCountdown from './countdown';
import PuzzleTableInfo from './puzzle-table-info';
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { ExternalLink, FileCheck } from 'lucide-react';

import type { Puzzle } from '@/lib/types/protocol';
import { getChainInfo, getPuzzleTimeLeft } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import IdWithChainLogo from '@/components/templates/id-with-chain-logo';
import Stat from '@/components/templates/stat';
import UserHoverCard from '@/components/templates/user-hover-card';
import { Button, IconButton, Table } from '@/components/ui';
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
        accessorKey: 'addedTimestamp',
        header: () => 'ID',
        cell: ({ row }) => <IdWithChainLogo id={row.original.id} chainId={row.original.chainId} />,
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
        cell: ({ row }) => (
          <PuzzleTableCountdown firstSolveTimestamp={row.original.firstSolveTimestamp} />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolver',
        header: () => 'First solver',
        cell: ({ row }) =>
          row.original.firstSolver ? (
            <UserHoverCard
              address={row.original.firstSolver}
              trigger={
                <AddressLinkClient
                  className="text-gray-100"
                  address={row.original.firstSolver}
                  prefetchedEnsName={row.original.firstSolverEnsName}
                />
              }
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
                  aria-label={`View chain ${row.original.chainId} puzzle #${row.original.id}'s solution.`}
                >
                  <FileCheck />
                </IconButton>
              ) : null}
              {
                <IconButton
                  variant="outline"
                  intent="neutral"
                  title={`https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                    row.original.address
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                        row.original.address
                      }`,
                      '_blank',
                    );
                  }}
                  aria-label={`View chain ${row.original.chainId} puzzle #${row.original.id}'s contract.`}
                >
                  <ExternalLink />
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
      topRounded={false}
      noBorder
    />
  );
};

const PuzzleTableMobile: FC<PuzzleTableInternalProps> = ({ data, sorting, setSorting }) => {
  const columns = useMemo<ColumnDef<Puzzle>[]>(
    () => [
      {
        accessorKey: 'addedTimestamp',
        header: () => 'ID',
        cell: ({ row }) => <IdWithChainLogo id={row.original.id} chainId={row.original.chainId} />,
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
      topRounded={false}
      noBorder
    />
  );
};

const PuzzleTableMobileSubComponent: FC<{ data: Puzzle }> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      <Stat
        name="Time till next phase"
        value={<PuzzleTableCountdown firstSolveTimestamp={data.firstSolveTimestamp} />}
      />
      <Stat
        name="First solver"
        value={
          data.firstSolver ? (
            <UserHoverCard
              address={data.firstSolver}
              trigger={
                <AddressLinkClient
                  className="text-gray-100"
                  address={data.firstSolver}
                  prefetchedEnsName={data.firstSolverEnsName}
                />
              }
            />
          ) : (
            '—'
          )
        }
      />
      <div className="col-span-2 flex gap-1">
        {data.solution ? (
          <Button
            className="w-full"
            size="sm"
            variant="outline"
            intent="neutral"
            rightIcon={<ExternalLink />}
            href={data.solution}
            newTab
          >
            Solution
          </Button>
        ) : null}
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          intent="neutral"
          rightIcon={<ExternalLink />}
          href={`https://${getChainInfo(data.chainId).blockExplorer}/address/${data.address}`}
          newTab
        >
          Contract
        </Button>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

export const getRowRoute = ({ row }: { row: Row<Puzzle> }): `/${string}` => {
  return `/puzzle/${row.original.chainId}:${row.original.id}`;
};

export default PuzzleTable;
