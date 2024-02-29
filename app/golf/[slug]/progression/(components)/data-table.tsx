'use client';

import { Fragment, useMemo, useState } from 'react';

import type { CourseProgressionValue } from './types';
import type { SortingState } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ExternalLink } from 'lucide-react';

import { getChainInfo } from '@/lib/utils';

import AddressDisplayClient from '@/components/templates/address-display-client';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseProgressionDataTableProps = {
  data: CourseProgressionValue[];
};

type CourseProgressionDataTableInternalProps = Omit<TableProps<CourseProgressionValue>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseProgressionDataTable: React.FC<CourseProgressionDataTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <CourseProgressionDataTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <CourseProgressionDataTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const CourseProgressionDataTableDesktop: React.FC<CourseProgressionDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<CourseProgressionValue>[] = useMemo(
    () => [
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
        header: () => 'Gas used',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <div>{row.original.gasUsed}</div>
            {row.original.gasDiff ? (
              <div className="flex items-center gap-0.5 text-xs text-gray-200">
                {Math.abs(row.original.gasDiff)}
                <ArrowDown className="h-3 w-3" />
              </div>
            ) : null}
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'submitTimestamp',
        header: () => 'Date',
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

const CourseProgressionDataTableMobile: React.FC<CourseProgressionDataTableInternalProps> = ({
  data,
  sorting,
  setSorting,
}) => {
  const columns: ColumnDef<CourseProgressionValue>[] = useMemo(
    () => [
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
        cell: ({ row }) => (
          <div className="flex flex-col items-end gap-0.5">
            <div>{row.original.gasUsed}</div>
            {row.original.gasDiff ? (
              <div className="flex items-center gap-0.5 text-xs text-gray-200">
                <ArrowDown className="h-3 w-3" />
                {Math.abs(row.original.gasDiff)}
              </div>
            ) : null}
          </div>
        ),
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
      className="md:hidden"
      columns={columns}
      data={data}
      sorting={sorting}
      setSorting={setSorting}
    />
  );
};

export default CourseProgressionDataTable;
