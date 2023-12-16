'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import type { SortingState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import type { GolfCourseSolver } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import AddressDisplayClient from '@/components/templates/address-display-client';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseLeaderboardTableProps = {
  data: GolfCourseSolver[];
};

type CourseLeaderboardTableInternalProps = Omit<TableProps<GolfCourseSolver>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseLeaderboardTable: FC<CourseLeaderboardTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <CourseLeaderboardTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <CourseLeaderboardTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const CourseLeaderboardTableDesktop: FC<CourseLeaderboardTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<GolfCourseSolver>[] = useMemo(
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
            address={row.original.solver.address}
            label={row.original.solver.displayName}
            prefetchedEnsName={row.original.solver.ensName}
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
        header: () => 'Solution',
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
      className="hidden md:block"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
};

const CourseLeaderboardTableMobile: FC<CourseLeaderboardTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<GolfCourseSolver>[] = useMemo(
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
            address={row.original.solver.address}
            label={row.original.solver.displayName}
            prefetchedEnsName={row.original.solver.ensName}
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
        header: () => 'Solution',
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

export default CourseLeaderboardTable;
