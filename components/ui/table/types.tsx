import type { FC, ReactElement } from 'react';

import { tableWrapperVariants } from './styles';
import type { ColumnDef, OnChangeFn, Row, SortingState } from '@tanstack/react-table';
import type { VariantProps } from 'class-variance-authority';

// ---------------------------------------–-------------------------------------
// Variant props
// ---------------------------------------–-------------------------------------

export type TableVariantProps = VariantProps<typeof tableWrapperVariants>;

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type TableAccordionButtonProps<T> = {
  row: Row<T>;
};

export type TableButtonProps = JSX.IntrinsicElements['button'];

export type TableProps<T> = TableVariantProps & {
  className?: string;
  emptyStateString?: string;
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: SortingState;
  pageParam?: string;
  pageIndex?: number;
  highlightAccessor?: keyof T;
  highlightValues?: string[];
  setSorting?: OnChangeFn<SortingState>;
  renderSubComponent?: (props: { row: Row<T> }) => ReactElement;
  getRowRoute?: (props: { row: Row<T> }) => Promise<`/${string}` | string> | `/${string}` | string;
};

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type TableComposition<T> = {
  AccordionButton: FC<TableAccordionButtonProps<T>>;
  Button: FC<TableButtonProps>;
};
