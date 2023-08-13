import { cva } from 'class-variance-authority';

export const inputErrorStyles = 'text-xs font-book text-red-200';

export const inputLabelVariants = cva(['text-xs', 'font-book'], {
  variants: {
    invalid: {
      true: ['text-red-200'],
      false: ['text-gray-200'],
    },
  },
});

export const inputVariants = cva(
  [
    'w-full',
    'group',
    'peer',
    'bg-transparent',
    'rounded-lg',
    'text-gray-100',
    'border',
    'border-gray-300',
    'hover:border-gray-250',
    'placeholder:text-gray-200',
    'invalid:text-red-100',
    'invalid:border-red-350',
    'invalid:hover:border-red-350',
    'focus-visible:outline-none',
    'focus-visible:ring',
    'focus-visible:ring-blue-250',
    'transition-colors',
  ],
  {
    variants: {
      size: {
        lg: ['py-2', 'pl-4', 'font-medium', 'text-lg', 'h-[3.25rem]'],
        md: ['py-2', 'pl-4', 'font-book', 'text-md', 'h-[3rem]'],
        sm: ['py-1.5', 'pl-3', 'font-book', 'text-sm', 'h-[2.25rem]'],
      },
      isCurrency: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      { size: 'lg', isCurrency: true, className: 'pr-[4rem]' },
      { size: 'lg', isCurrency: false, className: 'pr-4' },
      { size: 'md', isCurrency: true, className: 'pr-[3.75rem]' },
      { size: 'md', isCurrency: false, className: 'pr-4' },
      { size: 'sm', isCurrency: true, className: 'pr-[3.25rem]' },
      { size: 'sm', isCurrency: false, className: 'pr-3' },
    ],
  },
);
