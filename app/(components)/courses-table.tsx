'use client';

import { type FC, Fragment, useMemo, useState } from 'react';

import type { ColumnDef, Row, SortingState } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import type { GolfCourse } from '@/lib/types/protocol';
import { getChainInfo } from '@/lib/utils';

import AddressLinkClient from '@/components/templates/address-link-client';
import IdWithChainLogo from '@/components/templates/id-with-chain-logo';
import UserHoverCard from '@/components/templates/user-hover-card';
import { IconButton, Table } from '@/components/ui';
import type { TableProps } from '@/components/ui/table/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CourseTableProps = {
  data: GolfCourse[];
};

type CourseTableInternalProps = Omit<TableProps<GolfCourse>, 'columns'>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CourseTable: FC<CourseTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <Fragment>
      <CourseTableDesktop data={data} sorting={sorting} setSorting={setSorting} />
      <CourseTableMobile data={data} sorting={sorting} setSorting={setSorting} />
    </Fragment>
  );
};

const CourseTableDesktop: FC<CourseTableInternalProps> = ({ data, sorting, setSorting }) => {
  const columns: ColumnDef<GolfCourse>[] = useMemo(
    () => [
      {
        accessorKey: 'addedTimestamp',
        header: () => 'ID',
        cell: ({ row }) => <IdWithChainLogo id={row.original.id} chainId={row.original.chainId} />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'name',
        header: () => 'Course',
        cell: ({ row }) => (
          <div className="line-clamp-1 overflow-hidden text-ellipsis">{row.original.name}</div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'leader.address',
        header: () => 'King',
        cell: ({ row }) =>
          row.original.leader && row.original.leader.address ? (
            <div>
              <UserHoverCard
                address={row.original.leader.address}
                trigger={
                  <AddressLinkClient
                    className="text-gray-100"
                    address={row.original.leader.address}
                    prefetchedEnsName={row.original.leader.ensName}
                  />
                }
              />
              <div className="mt-0.5 text-xs text-gray-200">
                {`${row.original.leaderGas} gas` ?? '-'}
              </div>
            </div>
          ) : (
            <div className="italic text-gray-200">None</div>
          ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'numSolved',
        header: () => <div className="ml-auto">Optimizers</div>,
        cell: ({ row }) => <div className="flex justify-end">{row.original.numSolved}</div>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'address',
        header: () => 'Contract',
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end">
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
                  aria-label={`View chain ${row.original.chainId} course #${row.original.id}'s contract.`}
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

const CourseTableMobile: FC<CourseTableInternalProps> = ({ data, sorting, setSorting }) => {
  const columns: ColumnDef<GolfCourse>[] = useMemo(
    () => [
      {
        accessorKey: 'addedTimestamp',
        header: () => 'ID',
        cell: ({ row }) => <IdWithChainLogo id={row.original.id} chainId={row.original.chainId} />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'name',
        header: () => 'Course',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <div className="line-clamp-1 overflow-hidden text-ellipsis">{row.original.name}</div>
            <div className="text-xs text-gray-200">{row.original.numSolved} solves</div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'leader.address',
        header: () => <div className="ml-auto">King</div>,
        cell: ({ row }) =>
          row.original.leader && row.original.leader.address ? (
            <div className="mt-0.5 flex flex-col items-end">
              <UserHoverCard
                address={row.original.leader.address}
                trigger={
                  <AddressLinkClient
                    className="text-gray-100"
                    address={row.original.leader.address}
                    prefetchedEnsName={row.original.leader.ensName}
                  />
                }
              />
              <div className="text-xs text-gray-200">{`${row.original.leaderGas} gas` ?? '-'}</div>
            </div>
          ) : (
            <div className="flex justify-end italic text-gray-200">None</div>
          ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'address',
        cell: ({ row }) => (
          <div className="flex items-center justify-end">
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
              aria-label={`View chain ${row.original.chainId} course #${row.original.id}'s contract.`}
            >
              <ExternalLink />
            </IconButton>
          </div>
        ),
        header: () => 'Contract',
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
      getRowRoute={getRowRoute}
      topRounded={false}
      noBorder
    />
  );
};

// -----------------------------------------------------------------------------
// Helper functions
// -----------------------------------------------------------------------------

export const getRowRoute = ({ row }: { row: Row<GolfCourse> }): `/${string}` => {
  return `/golf/${row.original.chainId}:${row.original.id}`;
};

export default CourseTable;
