'use client';

import { Fragment, useMemo, useState } from 'react';

import type { PuzzleValue } from '../types';
import PuzzleDataTableCountdown from './countdown';
import PuzzleDataTableInfo from './info';
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { ExternalLink, FileCheck } from 'lucide-react';

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

type PuzzleDataTableProps = {
  data: PuzzleValue[];
};

type PuzzleDataTableInternalProps = Omit<TableProps<PuzzleValue>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PuzzleDataTable: React.FC<PuzzleDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <PuzzleDataTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <PuzzleDataTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const PuzzleDataTableDesktop: React.FC<PuzzleDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<PuzzleValue>[] = useMemo(
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
          <PuzzleDataTableInfo
            phase={
              row.original.firstSolveTimestamp
                ? getPuzzleTimeLeft(row.original.firstSolveTimestamp).phase
                : 0
            }
            id={row.original.id}
            name={row.original.name}
            user={row.original.author.info ?? undefined}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'timeLeft',
        header: () => 'Time till next phase',
        cell: ({ row }) => (
          <PuzzleDataTableCountdown firstSolveTimestamp={row.original.firstSolveTimestamp} />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstSolver',
        header: () => 'First solver',
        cell: ({ row }) =>
          row.original.firstSolver ? (
            <UserHoverCard
              address={row.original.firstSolverAddress as `0x${string}`}
              trigger={
                <AddressLinkClient
                  className="text-gray-100"
                  address={row.original.firstSolverAddress as `0x${string}`}
                />
              }
            />
          ) : (
            '—'
          ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: '_count.solves',
        header: () => 'Solvers',
        cell: ({ row }) => row.original._count.solves,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'links',
        header: () => 'Links',
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-1">
              {row.original.solutionLink ? (
                <IconButton
                  variant="outline"
                  intent="neutral"
                  title={row.original.solutionLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(row.original.solutionLink ?? '', '_blank');
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

const PuzzleDataTableMobile: React.FC<PuzzleDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns = useMemo<ColumnDef<PuzzleValue>[]>(
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
          <PuzzleDataTableInfo
            phase={
              row.original.firstSolveTimestamp
                ? getPuzzleTimeLeft(row.original.firstSolveTimestamp).phase
                : 0
            }
            id={row.original.id}
            name={row.original.name}
            user={row.original.author?.info ?? undefined}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'numberSolved',
        header: () => <div className="ml-auto">Solvers</div>,
        cell: ({ row }) => <div className="flex justify-end">{row.original._count.solves}</div>,
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
      renderSubComponent={({ row }) => <PuzzleDataTableMobileSubComponent data={row.original} />}
      getRowRoute={getRowRoute}
      topRounded={false}
      noBorder
    />
  );
};

const PuzzleDataTableMobileSubComponent: React.FC<{ data: PuzzleValue }> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      <Stat
        name="Time till next phase"
        value={<PuzzleDataTableCountdown firstSolveTimestamp={data.firstSolveTimestamp} />}
      />
      <Stat
        name="First solver"
        value={
          data.firstSolverAddress ? (
            <UserHoverCard
              address={data.firstSolverAddress as `0x${string}`}
              trigger={
                <AddressLinkClient
                  className="text-gray-100"
                  address={data.firstSolverAddress as `0x${string}`}
                />
              }
            />
          ) : (
            '—'
          )
        }
      />
      <div className="col-span-2 flex gap-1">
        {data.solutionLink ? (
          <Button
            className="w-full"
            size="sm"
            variant="outline"
            intent="neutral"
            rightIcon={<ExternalLink />}
            href={data.solutionLink}
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

export const getRowRoute = ({ row }: { row: Row<PuzzleValue> }): `/${string}` => {
  return `/puzzle/${row.original.chainId}:${row.original.id}`;
};

export default PuzzleDataTable;
