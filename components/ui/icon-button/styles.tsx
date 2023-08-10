import { cva } from 'class-variance-authority';

export const iconButtonIconVariants = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    size: {
      lg: ['w-5', 'h-5'],
      md: ['w-5', 'h-5'],
      sm: ['w-4', 'h-4'],
      xs: ['w-3', 'h-3'],
    },
  },
});

export const iconButtonVariants = cva(
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
      size: {
        lg: ['rounded-xl', 'w-10', 'h-10'],
        md: ['rounded-lg', 'w-8', 'h-8'],
        sm: ['rounded-lg', 'w-7', 'h-7'],
        xs: ['rounded-md', 'w-5', 'h-5'],
      },
      variant: {
        primary: ['text-gray-50'],
        secondary: [],
        tertiary: ['border'],
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
          'data-tertiary:text-gray-100',
          'data-tertiary:border-gray-300',
          'data-tertiary:hover:border-gray-250',
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
          'data-tertiary:text-blue-150',
          'data-tertiary:border-blue-300',
          'data-tertiary:hover:border-blue-200',
          // Text
          'data-variant-text:text-blue-150',
          'data-variant-text:hover:text-blue-100',
          'data-variant-text:hover:bg-blue-900',
        ],
        success: [
          // Primary
          'data-primary:bg-green-250',
          'data-primary:hover:bg-green-200',
          // Secondary
          'data-secondary:text-green-200',
          'data-secondary:bg-green-800',
          'data-secondary:hover:bg-green-900',
          'data-secondary:data-disabled:text-green-700',
          'data-secondary:data-disabled:bg-green-900',
          // Tertiary
          'data-tertiary:text-green-150',
          'data-tertiary:border-green-300',
          'data-tertiary:hover:border-green-200',
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
          'data-tertiary:text-red-150',
          'data-tertiary:border-red-300',
          'data-tertiary:hover:border-red-200',
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
          'data-tertiary:text-yellow-150',
          'data-tertiary:border-yellow-300',
          'data-tertiary:hover:border-yellow-200',
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
          'data-tertiary:text-orange-150',
          'data-tertiary:border-orange-300',
          'data-tertiary:hover:border-orange-200',
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
      { variant: 'tertiary', disabled: true, className: 'border-gray-400 text-gray-250' },
      { variant: 'text', disabled: true, className: 'bg-none text-gray-300' },
    ],
  },
);
