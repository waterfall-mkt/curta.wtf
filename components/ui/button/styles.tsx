import { cva } from 'class-variance-authority';

export const buttonSizeVariants = cva(['px-4', 'rounded-xl'], {
  variants: {
    size: {
      lg: ['py-3', 'text-lg'],
      md: ['py-2', 'text-md'],
      sm: ['py-2', 'text-sm'],
      xs: ['py-2', 'text-xs'],
    },
  },
});

export const buttonVariants = cva(
  [
    'font-medium',
    'transition-colors',
    'flex',
    'justify-center',
    'items-center',
    'outline-none',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-250',
  ],
  {
    variants: {
      variant: {
        primary: ['text-gray-50'],
        secondary: [],
        tertiary: ['border'],
        text: ['bg-none'],
      },
      intent: {
        neutral: [
          /* primary */
          'data-primary:bg-gray-250',
          'data-primary:hover:bg-gray-200',
          /* secondary */
          'data-secondary:text-gray-150',
          'data-secondary:bg-gray-400',
          'data-secondary:hover:bg-gray-500',
          'data-secondary:data-disabled:text-gray-350',
          'data-secondary:data-disabled:bg-gray-600',
          /* tertiary */
          'data-tertiary:text-gray-100',
          'data-tertiary:border-gray-300',
          'data-tertiary:hover:border-gray-250',
          /* text */
          'data-variant-text:text-gray-200',
          'data-variant-text:hover:text-gray-100',
          'data-variant-text:hover:bg-gray-450',
        ],
        primary: [
          /* primary */
          'data-primary:bg-blue-250',
          'data-primary:hover:bg-blue-200',
          /* secondary */
          'data-secondary:text-blue-200',
          'data-secondary:bg-blue-800',
          'data-secondary:hover:bg-blue-900',
          'data-secondary:data-disabled:text-blue-700',
          'data-secondary:data-disabled:bg-blue-900',
          /* tertiary */
          'data-tertiary:text-blue-150',
          'data-tertiary:border-blue-300',
          'data-tertiary:hover:border-blue-200',
          /* text */
          'data-variant-text:text-blue-150',
          'data-variant-text:hover:text-blue-100',
          'data-variant-text:hover:bg-blue-900',
        ],
        success: [
          /* primary */
          'data-primary:bg-green-250',
          'data-primary:hover:bg-green-200',
          /* secondary */
          'data-secondary:text-green-200',
          'data-secondary:bg-green-800',
          'data-secondary:hover:bg-green-900',
          'data-secondary:data-disabled:text-green-700',
          'data-secondary:data-disabled:bg-green-900',
          /* tertiary */
          'data-tertiary:text-green-150',
          'data-tertiary:border-green-300',
          'data-tertiary:hover:border-green-200',
          /* text */
          'data-variant-text:text-green-150',
          'data-variant-text:hover:text-green-100',
          'data-variant-text:hover:bg-green-900',
        ],
        fail: [
          /* primary */
          'data-primary:bg-red-250',
          'data-primary:hover:bg-red-200',
          /* secondary */
          'data-secondary:text-red-200',
          'data-secondary:bg-red-800',
          'data-secondary:hover:bg-red-900',
          'data-secondary:data-disabled:text-red-700',
          'data-secondary:data-disabled:bg-red-900',
          /* tertiary */
          'data-tertiary:text-red-150',
          'data-tertiary:border-red-300',
          'data-tertiary:hover:border-red-200',
          /* text */
          'data-variant-text:text-red-150',
          'data-variant-text:hover:text-red-100',
          'data-variant-text:hover:bg-red-900',
        ],
        warning: [
          /* primary */
          'data-primary:bg-yellow-250',
          'data-primary:hover:bg-yellow-200',
          /* secondary */
          'data-secondary:text-yellow-200',
          'data-secondary:bg-yellow-800',
          'data-secondary:hover:bg-yellow-900',
          'data-secondary:data-disabled:text-yellow-700',
          'data-secondary:data-disabled:bg-yellow-900',
          /* tertiary */
          'data-tertiary:text-yellow-150',
          'data-tertiary:border-yellow-300',
          'data-tertiary:hover:border-yellow-200',
          /* text */
          'data-variant-text:text-yellow-150',
          'data-variant-text:hover:text-yellow-100',
          'data-variant-text:hover:bg-yellow-900',
        ],
        orange: [
          /* primary */
          'data-primary:bg-orange-250',
          'data-primary:hover:bg-orange-200',
          /* secondary */
          'data-secondary:text-orange-200',
          'data-secondary:bg-orange-800',
          'data-secondary:hover:bg-orange-900',
          'data-secondary:data-disabled:text-orange-700',
          'data-secondary:data-disabled:bg-orange-900',
          /* tertiary */
          'data-tertiary:text-orange-150',
          'data-tertiary:border-orange-300',
          'data-tertiary:hover:border-orange-200',
          /* text */
          'data-variant-text:text-orange-150',
          'data-variant-text:hover:text-orange-100',
          'data-variant-text:hover:bg-orange-900',
        ],
      },
      disabled: {
        true: 'aria-disabled pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'primary', disabled: true, className: 'bg-gray-300 text-gray-200' },
      { variant: 'tertiary', disabled: true, className: 'border-gray-400 text-gray-250' },
      { variant: 'text', disabled: true, className: 'bg-none text-gray-300' },
    ],
  },
);

export const iconButtonSizeVariants = cva(['px-2'], {
  variants: {
    size: {
      lg: ['px-2', 'py-2', 'rounded-xl', 'w-10', 'h-10'],
      md: ['px-2', 'py-2', 'rounded-lg', 'w-8', 'h-8'],
      sm: ['px-2', 'py-2', 'rounded-lg', 'w-7', 'h-7'],
      xs: ['px-1', 'py-1', 'rounded-md', 'w-5', 'h-5'],
    },
  },
});
