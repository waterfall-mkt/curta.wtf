import { cva } from 'class-variance-authority';

export const inputCurrencyLabelVariants = cva(
  [
    'w-fit',
    'h-fit',
    'font-medium',
    'rounded-lg',
    'text-gray-200',
    'bg-gray-350',
    'peer-invalid:text-red-300',
    'peer-invalid:bg-red-800',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs', 'p-1'],
        md: ['text-sm', 'p-1.5'],
        lg: ['text-base', 'p-1.5'],
      },
    },
  },
);
