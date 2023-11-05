import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  ['rounded-full', 'justify-center', 'items-center', 'font-medium', 'flex', 'w-fit'],
  {
    variants: {
      size: {
        sm: ['min-w-[1.25rem]', 'h-5', 'text-xs'],
        md: ['min-w-[1.5rem]', 'h-6', 'text-sm'],
        lg: ['min-w-[1.75rem]', 'h-7', 'text-base'],
      },
      variant: {
        primary: [],
        secondary: [],
      },
      intent: {
        neutral: [
          // Primary
          'data-primary:bg-gray-250',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-gray-400',
          'data-secondary:text-gray-150',
        ],
        primary: [
          // Primary
          'data-primary:bg-blue-250',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-blue-800',
          'data-secondary:text-blue-200',
        ],
        success: [
          // Primary
          'data-primary:bg-green-350',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-green-800',
          'data-secondary:text-green-200',
        ],
        fail: [
          // Primary
          'data-primary:bg-red-250',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-red-800',
          'data-secondary:text-red-200',
        ],
        warning: [
          // Primary
          'data-primary:bg-yellow-250',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-yellow-800',
          'data-secondary:text-yellow-200',
        ],
        orange: [
          // Primary
          'data-primary:bg-orange-250',
          'data-primary:text-gray-50',
          // Secondary
          'data-secondary:bg-orange-800',
          'data-secondary:text-orange-200',
        ],
      },
      type: {
        number: ['data-[size=sm]:px-1.5', 'data-[size=md]:px-2', 'data-[size=lg]:px-2.5'],
        text: ['data-[size=sm]:px-2', 'data-[size=md]:px-2.5', 'data-[size=lg]:px-3'],
      },
    },
  },
);
