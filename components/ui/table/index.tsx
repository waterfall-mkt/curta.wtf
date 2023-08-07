'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect } from 'react';

import TableAccordionButton from './accordion-button';
import TableButton from './button';
import {
  tableBodyCellStyles,
  tableBodyRowVariants,
  tableBodySubComponentStyles,
  tableEmptyStateStyles,
  tableHeaderCellStyles,
  tableHeaderRowVariants,
  tableHeaderSortIconStyles,
  tableHeaderSortVariants,
  tablePaginationButtonVariants,
  tablePaginationNumberButtonVariants,
  tablePaginationSeparatorStyles,
  tablePaginationStyles,
  tableWrapperVariants,
} from './styles';
import type { TableProps } from './types';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Table = <T,>({
  className,
  emptyStateString,
  pageIndex,
  data,
  columns,
  sorting,
  highlightAccessor,
  highlightValues,
  pageParam,
  topRounded = true,
  isSubTable = false,
  noBorder = false,
  setSorting,
  renderSubComponent,
  getRowRoute,
}: TableProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // Instantiate a Tanstack table that is:
  //     * Expandable
  //     * Sortable
  //     * Filterable
  //     * Paginated
  const table = useReactTable<T>({
    data,
    columns,
    initialState: { pagination: { pageIndex: pageIndex !== undefined ? pageIndex : 0 } },
    state: { sorting },
    getRowCanExpand: () => !!renderSubComponent,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Here, we read `pageParam` from URL search params to determine if there is
  // a page number in the URL. If there is, we set the page index of the table
  // to that page number. If there is not or the queried page index is out of
  // range, we don't set the page index at all (which defaults to 0).
  useEffect(() => {
    if (pageParam) {
      const page = searchParams.get(pageParam);
      const index =
        page &&
        typeof page === 'string' &&
        !isNaN(parseInt(page)) &&
        parseInt(page) >= 1 &&
        ((parseInt(page) - 1) * 10 < data.length ? parseInt(page) - 1 : 0);
      if (typeof index === 'number') table.setPageIndex(index);
    }
  }, [data.length, pageParam, searchParams, table]);
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  // Anytime the table's page index changes or the highlighted values change, we
  // want to update the page that's displayed in the table. Note that
  // `highlightValues` is a dependency here because we also want to force a
  // re-render of the table when the highlighted values change to update
  // relevant rows.
  useEffect(() => {
    if (pageIndex) table.setPageIndex(pageIndex);
  }, [pageIndex, table, highlightValues]);

  // A helper function to update the URL search params when a user navigates to
  // a new page in the table via the UI to keep URL<>component states synced.
  const updateSearchParams = useCallback(
    (pageIndex: number) => {
      // If `pageParam` is `undefined`, we don't want to update the URL search
      // params at all.
      if (pageParam === undefined) return;

      // Instantiate a new `URLSearchParams` object from the current search and
      // replace the `pageParam` with the new page index.
      const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
      newSearchParams.set(pageParam, pageIndex.toString());

      // If the new page index is 1, we want to remove the `pageParam` from the
      // search params entirely because the table renders the first page by
      // default.
      if (pageIndex === 1) newSearchParams.delete(pageParam);

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [pageParam, searchParams, router, pathname],
  );

  // A helper function to navigate to different pages within the table whilst
  // keeping the URL<>component states synced.
  const handleNavigatePage = useCallback(
    (pageIndex: number) => () => {
      table.setPageIndex(pageIndex);
      updateSearchParams(pageIndex + 1);
    },
    [table, updateSearchParams],
  );

  return (
    <div
      className={twMerge(
        clsx(tableWrapperVariants({ topRounded, isSubTable, noBorder }), className),
      )}
    >
      <table className="w-full">
        {/* Columns */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={tableHeaderRowVariants({ topRounded })}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={tableHeaderCellStyles}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={tableHeaderSortVariants({
                          clickable: header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowUp className={tableHeaderSortIconStyles} />,
                          desc: <ArrowDown className={tableHeaderSortIconStyles} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* Rows */}
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const highlighted =
              !highlightAccessor || !highlightValues || highlightValues.length == 0
                ? false
                : highlightValues.some((value) => row.original[highlightAccessor] === value);

            return (
              <Fragment key={row.id}>
                <tr
                  className={tableBodyRowVariants({
                    isSubTable,
                    clickable: !!getRowRoute,
                    highlighted,
                  })}
                  title={getRowRoute ? 'Click to view details' : undefined}
                  onClick={async () => {
                    if (getRowRoute) {
                      const route = await getRowRoute({ row });
                      router.push(route);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={tableBodyCellStyles}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && renderSubComponent && (
                  <tr className={tableBodySubComponentStyles}>
                    <td className="p-0" colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {table.getRowModel().rows.length == 0 ? (
        <div className={tableEmptyStateStyles}>{emptyStateString ?? 'No results found'}</div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className={tablePaginationStyles}>
          {/* Previous Button */}
          <button
            className={tablePaginationButtonVariants({ disabled: !table.getCanPreviousPage() })}
            onClick={handleNavigatePage(currentPage - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Previous
          </button>

          {/* Page Buttons */}
          <div className="flex flex-1 justify-center">
            <div className="flex space-x-2">
              <button
                className={tablePaginationNumberButtonVariants({ selected: currentPage === 0 })}
                onClick={handleNavigatePage(0)}
                disabled={currentPage === 0}
              >
                1
              </button>
              {currentPage > 1 && <div className={tablePaginationSeparatorStyles}>…</div>}
              {totalPages > 2 && currentPage !== totalPages - 1 && currentPage !== 0 && (
                <button
                  className={tablePaginationNumberButtonVariants({ selected: true })}
                  onClick={handleNavigatePage(currentPage - 1)}
                  disabled={true}
                >
                  {currentPage + 1}
                </button>
              )}
              {totalPages - 2 > currentPage && (
                <div className={tablePaginationSeparatorStyles}>…</div>
              )}
              <button
                className={tablePaginationNumberButtonVariants({
                  selected: currentPage === totalPages - 1,
                })}
                onClick={handleNavigatePage(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
              >
                {totalPages}
              </button>
            </div>
          </div>

          {/* Next Button */}
          <button
            className={tablePaginationButtonVariants({ disabled: !table.getCanNextPage() })}
            onClick={handleNavigatePage(currentPage + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

Table.AccordionButton = TableAccordionButton;
Table.Button = TableButton;

Table.displayName = 'Table';

export default Table;
