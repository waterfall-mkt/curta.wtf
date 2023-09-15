import { cva } from 'class-variance-authority';

export const calloutVariants = cva(
  'not-prose border relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl p-3',
  {
    variants: {
      intent: {
        neutral: ['bg-gray-450', 'text-gray-100', 'border-gray-350'],
        primary: ['bg-blue-900', 'text-blue-100', 'border-blue-700'],
        success: ['bg-green-900', 'text-green-100', 'border-green-700'],
        fail: ['bg-red-900', 'text-red-100', 'border-red-700'],
        warning: ['bg-yellow-900', 'text-yellow-100', 'border-yellow-700'],
        orange: ['bg-orange-900', 'text-orange-100', 'border-orange-700'],
      },
    },
  },
);
