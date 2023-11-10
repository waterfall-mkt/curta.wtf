import { cva } from 'class-variance-authority';

export const buttonGroupStyles = 'button--group group flex -space-x-[1px]';

export const buttonIconVariants = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    size: {
      lg: ['w-5', 'h-5'],
      md: ['w-4', 'h-4'],
      sm: ['w-3.5', 'h-3.5'],
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
    'hover:z-10',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-250',
  ],
  {
    variants: {
      size: {
        lg: [
          'group-[.button--group]:rounded-none',
          'group-[.button--group]:first:rounded-l-xl',
          'group-[.button--group]:last:rounded-r-xl',
          'rounded-xl',
          'px-4',
          'h-10',
          'space-x-2',
          'text-base',
        ],
        md: [
          'group-[.button--group]:rounded-none',
          'group-[.button--group]:first:rounded-l-lg',
          'group-[.button--group]:last:rounded-r-lg',
          'rounded-lg',
          'px-3',
          'h-8',
          'space-x-1.5',
          'text-sm',
        ],
        sm: [
          'group-[.button--group]:rounded-none',
          'group-[.button--group]:first:rounded-l-lg',
          'group-[.button--group]:last:rounded-r-lg',
          'rounded-lg',
          'px-2.5',
          'h-7',
          'space-x-1.5',
          'text-xs',
        ],
      },
      variant: {
        primary: ['text-gray-50'],
        secondary: [],
        outline: ['border'],
        text: ['bg-none'],
      },
      intent: {
        neutral: [
          // Primary
          'data-primary:bg-gray-250',
          'data-primary:hover:bg-gray-200',
          // Secondary
          'data-secondary:text-gray-150',
          'data-secondary:bg-gray-400',
          'data-secondary:hover:bg-gray-500',
          'data-secondary:data-disabled:text-gray-350',
          'data-secondary:data-disabled:bg-gray-600',
          // Tertiary
          'data-outline:text-gray-100',
          'data-outline:border-gray-300',
          'data-outline:hover:border-gray-250',
          // Text
          'data-variant-text:text-gray-200',
          'data-variant-text:hover:text-gray-100',
          'data-variant-text:hover:bg-gray-450',
        ],
        primary: [
          // Primary
          'data-primary:bg-blue-250',
          'data-primary:hover:bg-blue-200',
          // Secondary
          'data-secondary:text-blue-200',
          'data-secondary:bg-blue-800',
          'data-secondary:hover:bg-blue-900',
          'data-secondary:data-disabled:text-blue-700',
          'data-secondary:data-disabled:bg-blue-900',
          // Tertiary
          'data-outline:text-blue-150',
          'data-outline:border-blue-300',
          'data-outline:hover:border-blue-200',
          // Text
          'data-variant-text:text-blue-150',
          'data-variant-text:hover:text-blue-100',
          'data-variant-text:hover:bg-blue-900',
        ],
        success: [
          // Primary
          'data-primary:bg-green-350',
          'data-primary:hover:bg-green-200',
          // Secondary
          'data-secondary:text-green-200',
          'data-secondary:bg-green-800',
          'data-secondary:hover:bg-green-900',
          'data-secondary:data-disabled:text-green-700',
          'data-secondary:data-disabled:bg-green-900',
          // Tertiary
          'data-outline:text-green-150',
          'data-outline:border-green-300',
          'data-outline:hover:border-green-200',
          // Text
          'data-variant-text:text-green-150',
          'data-variant-text:hover:text-green-100',
          'data-variant-text:hover:bg-green-900',
        ],
        fail: [
          // Primary
          'data-primary:bg-red-250',
          'data-primary:hover:bg-red-200',
          // Secondary
          'data-secondary:text-red-200',
          'data-secondary:bg-red-800',
          'data-secondary:hover:bg-red-900',
          'data-secondary:data-disabled:text-red-700',
          'data-secondary:data-disabled:bg-red-900',
          // Tertiary
          'data-outline:text-red-150',
          'data-outline:border-red-300',
          'data-outline:hover:border-red-200',
          // Text
          'data-variant-text:text-red-150',
          'data-variant-text:hover:text-red-100',
          'data-variant-text:hover:bg-red-900',
        ],
        warning: [
          // Primary
          'data-primary:bg-yellow-250',
          'data-primary:hover:bg-yellow-200',
          // Secondary
          'data-secondary:text-yellow-200',
          'data-secondary:bg-yellow-800',
          'data-secondary:hover:bg-yellow-900',
          'data-secondary:data-disabled:text-yellow-700',
          'data-secondary:data-disabled:bg-yellow-900',
          // Tertiary
          'data-outline:text-yellow-150',
          'data-outline:border-yellow-300',
          'data-outline:hover:border-yellow-200',
          // Text
          'data-variant-text:text-yellow-150',
          'data-variant-text:hover:text-yellow-100',
          'data-variant-text:hover:bg-yellow-900',
        ],
        orange: [
          // Primary
          'data-primary:bg-orange-250',
          'data-primary:hover:bg-orange-200',
          // Secondary
          'data-secondary:text-orange-200',
          'data-secondary:bg-orange-800',
          'data-secondary:hover:bg-orange-900',
          'data-secondary:data-disabled:text-orange-700',
          'data-secondary:data-disabled:bg-orange-900',
          // Tertiary
          'data-outline:text-orange-150',
          'data-outline:border-orange-300',
          'data-outline:hover:border-orange-200',
          // Text
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
      { variant: 'outline', disabled: true, className: 'border-gray-400 text-gray-250' },
      { variant: 'text', disabled: true, className: 'bg-none text-gray-300' },
    ],
  },
);
