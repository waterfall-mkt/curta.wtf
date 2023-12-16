'use client';

import { type FC, Fragment, useMemo } from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ExternalLink } from 'lucide-react';

import { IconButton, Table } from '@/components/ui';

const CourseProgressionTableSkeleton: FC = () => {
  return (
    <Fragment>
      <CourseProgressionTableDesktopSkeleton />
      <CourseProgressionTableMobileSkeleton />
    </Fragment>
  );
};

const CourseProgressionTableDesktopSkeleton: FC = () => {
  const columns: ColumnDef<null>[] = useMemo(
    () => [
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: () => (
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'gasUsed',
        header: () => 'Gas used',
        cell: () => (
          <div className="flex flex-col gap-0.5">
            <div className="h-5 w-12 animate-pulse rounded-md bg-gray-350" />
            <div className="flex items-center gap-0.5 text-xs text-gray-200">
              <div className="h-4 w-10 animate-pulse rounded-md bg-gray-350" />
              <ArrowDown className="h-3 w-3" />
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'submitTimestamp',
        header: () => 'Date',
        cell: () => (
          <div className="flex flex-col gap-0.5">
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-350" />
            <div className="h-4 w-10 animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'target',
        header: () => 'Solution',
        cell: () => (
          <div className="flex justify-end">
            <IconButton variant="outline" intent="neutral" disabled>
              <ExternalLink />
            </IconButton>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return <Table className="hidden md:block" columns={columns} data={Array(11).fill(null)} />;
};

const CourseProgressionTableMobileSkeleton: FC = () => {
  const columns: ColumnDef<null>[] = useMemo(
    () => [
      {
        accessorKey: 'solver',
        header: () => 'Player',
        cell: () => (
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-350" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-gray-350" />
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'gasUsed',
        header: () => <div className="ml-auto">Gas used</div>,
        cell: () => (
          <div className="flex flex-col items-end gap-0.5">
            <div className="h-5 w-12 animate-pulse rounded-md bg-gray-350" />
            <div className="flex items-center gap-0.5 text-xs text-gray-200">
              <ArrowDown className="h-3 w-3" />
              <div className="h-4 w-10 animate-pulse rounded-md bg-gray-350" />
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 90,
      },
      {
        accessorKey: 'target',
        header: () => 'Submission',
        cell: () => (
          <div className="flex justify-end">
            <IconButton variant="outline" intent="neutral" disabled>
              <ExternalLink />
            </IconButton>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 75,
      },
    ],
    [],
  );

  return <Table className="md:hidden" columns={columns} data={Array(11).fill(null)} />;
};

export default CourseProgressionTableSkeleton;
