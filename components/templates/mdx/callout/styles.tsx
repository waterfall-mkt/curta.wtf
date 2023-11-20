import { cva } from 'class-variance-authority';

export const calloutIconContainerVariants = cva([], {
  variants: {
    size: {
      sm: [],
      md: ['pt-1'],
    },
  },
});

export const calloutIconVariants = cva([], {
  variants: {
    size: {
      sm: ['h-4', 'w-4'],
      md: ['h-5', 'w-5'],
    },
    intent: {
      neutral: ['text-gray-200'],
      primary: ['text-blue-250'],
      success: ['text-green-300'],
      fail: ['text-red-300'],
      warning: ['text-yellow-250'],
      orange: ['text-orange-300'],
    },
  },
});

export const calloutVariants = cva(
  ['my-4', 'not-prose', 'border', 'relative', 'flex', 'w-full', 'overflow-hidden', 'p-3'],
  {
    variants: {
      size: {
        sm: ['text-xs', 'gap-2', 'rounded-lg', 'leading-4'],
        md: ['text-base', 'gap-3', 'rounded-xl', 'leading-7'],
      },
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
