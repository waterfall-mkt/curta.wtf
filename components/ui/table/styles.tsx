import { cva } from 'class-variance-authority';

export const tableBodyCellStyles =
  'first:pl-3 lg:first:pl-6 last:pr-3 lg:last:pr-6 pl-2 last:text-right text-left text-sm text-gray-100 font-book';

export const tableBodyRowVariants = cva(['h-16', 'border-t', 'border-stroke'], {
  variants: {
    highlighted: {
      true: [],
      false: [],
    },
    isSubTable: {
      true: [],
      false: [],
    },
    clickable: {
      true: ['transition-colors', 'hover:bg-gray-400', 'cursor-pointer'],
      false: [],
    },
  },
  compoundVariants: [
    { highlighted: true, isSubTable: true, className: 'bg-gray-300' },
    { highlighted: true, isSubTable: false, className: 'bg-gray-300' },
    { highlighted: false, isSubTable: true, className: 'bg-gray-450' },
    { highlighted: false, isSubTable: false, className: 'bg-gray-700 even:bg-gray-600' },
  ],
});

export const tableBodySubComponentStyles = 'bg-gray-450';

export const tableButtonVariants = cva(
  [
    'px-3',
    'py-2',
    'font-book',
    'text-xs',
    'outline-none',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-250',
    'transition-colors',
    'border',
    'rounded-full',
  ],
  {
    variants: {
      disabled: {
        true: [
          'aria-disabled',
          'pointer-events-none',
          'bg-gray-500',
          'border-gray-400',
          'text-gray-300',
        ],
        false: ['text-gray-100', 'border-gray-300', 'hover:border-gray-250'],
      },
    },
  },
);

export const tableEmptyStateStyles =
  'flex min-h-[10rem] items-center justify-center text-gray-200 text-sm font-book';

export const tableHeaderCellStyles =
  'first:pl-3 lg:first:pl-6 last:pr-3 pl-2 lg:last:pr-6 text-xs font-book group';

export const tableHeaderRowVariants = cva(['h-10'], {
  variants: {
    topRounded: {
      true: ['rounded-t-[1.25rem]'],
    },
  },
});

export const tableHeaderSortIconStyles = 'ml-1 w-3 h-3';

export const tableHeaderSortVariants = cva(
  [
    'flex',
    'items-center',
    'transition-colors',
    'text-gray-200',
    'justify-start',
    'group-last:justify-end',
  ],
  {
    variants: {
      clickable: {
        true: ['cursor-pointer select-none', 'hover:text-gray-100'],
        false: [''],
      },
    },
  },
);

export const tablePaginationButtonVariants = cva(
  [
    'flex',
    'items-center',
    'text-gray-200',
    'font-medium',
    'text-xs',
    'transition-colors',
    'rounded-sm',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-250',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      disabled: {
        true: ['text-gray-300', 'pointer-events-none', 'aria-disabled'],
        false: ['hover:text-gray-100', 'text-gray-200'],
      },
    },
  },
);

export const tablePaginationNumberButtonVariants = cva(
  [
    'rounded-lg',
    'h-8',
    'w-8',
    'transition-colors',
    'focus-visible:ring-2',
    'focus-visible:outline-none',
    'focus-visible:ring-blue-250',
  ],
  {
    variants: {
      selected: {
        true: ['text-gray-100', 'bg-gray-350', 'aria-disabled'],
        false: ['text-gray-200', 'hover:bg-gray-350', 'hover:text-gray-100'],
      },
    },
  },
);

export const tablePaginationSeparatorStyles =
  'flex h-8 w-8 items-center justify-center text-gray-200';

export const tablePaginationStyles = 'px-6 flex items-center h-10 border-t border-stroke';

export const tableWrapperVariants = cva(['overflow-hidden'], {
  variants: {
    topRounded: {
      true: ['rounded-[1.25rem]'],
      false: ['rounded-b-[1.25rem]'],
    },
    isSubTable: {
      true: ['bg-gray-450'],
      false: ['bg-gray-600'],
    },
    noBorder: {
      true: [],
      false: ['border', 'border-stroke'],
    },
  },
});
