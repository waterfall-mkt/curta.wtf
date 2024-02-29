'use client';

import { Fragment, useMemo, useState } from 'react';

import type { CourseLeaderboardValue } from './types';
import type { SortingState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { getChainInfo } from '@/lib/utils';

import AddressDisplayClient from '@/components/templates/address-display-client';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseLeaderboardDataTableProps = {
  data: CourseLeaderboardValue[];
};

type CourseLeaderboardDataTableInternalProps = Omit<TableProps<CourseLeaderboardValue>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseLeaderboardDataTable: React.FC<CourseLeaderboardDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <CourseLeaderboardDataTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <CourseLeaderboardDataTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const CourseLeaderboardDataTableDesktop: React.FC<CourseLeaderboardDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<CourseLeaderboardValue>[] = useMemo(
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
            address={row.original.solverAddress as `0x${string}`}
            label={row.original.solver.info?.displayName ?? undefined}
          />
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'gasUsed',
        header: () => 'Gas used',
        cell: ({ row }) => row.original.gasUsed,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'submitTimestamp',
        header: () => 'Submission timestamp',
        cell: ({ row }) => {
          const date = new Date(1000 * row.original.submitTimestamp);

          return (
            <div className="flex flex-col gap-0.5">
              <div>
                {date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="text-xs text-gray-200">
                {date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'target',
        header: () => 'Submission',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                  row.original.target
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                      row.original.target
                    }`,
                    '_blank',
                  );
                }}
                aria-label={`View ${row.original.solver.address}'s submission of puzzle ${row.original.courseId} on chain ${row.original.chainId}.`}
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
    [],
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

const CourseLeaderboardDataTableMobile: React.FC<CourseLeaderboardDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<CourseLeaderboardValue>[] = useMemo(
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
        accessorKey: 'gasUsed',
        header: () => <div className="ml-auto">Gas used</div>,
        cell: ({ row }) => <div className="flex justify-end">{row.original.gasUsed}</div>,
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'target',
        header: () => 'Submission',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <IconButton
                variant="outline"
                intent="neutral"
                title={`https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                  row.original.target
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://${getChainInfo(row.original.chainId).blockExplorer}/address/${
                      row.original.target
                    }`,
                    '_blank',
                  );
                }}
                aria-label={`View ${row.original.solver.address}'s solution of puzzle ${row.original.courseId} on chain ${row.original.chainId}.`}
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
    [],
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

export default CourseLeaderboardDataTable;
