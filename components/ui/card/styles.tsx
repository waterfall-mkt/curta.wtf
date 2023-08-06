import { cva } from 'class-variance-authority';

export const cardBodyVariants = cva([], {
  variants: {
    noPadding: {
      true: ['p-0'],
      false: ['p-4'],
    },
  },
});

export const cardFooterStyles =
  'rounded-bl-[1.25rem] rounded-br-[1.25rem] border-t border-stroke p-4';

export const cardHeaderVariants = cva(
  [
    'rounded-tl-[1.25rem]',
    'rounded-tr-[1.25rem]',
    'border-b',
    'border-stroke',
    'text-md',
    'font-medium',
    'text-gray-50',
  ],
  {
    variants: {
      noPadding: {
        true: ['p-0'],
        false: ['p-4'],
      },
    },
  },
);

export const cardStyles =
  'border border-stroke rounded-[1.25rem] bg-gray-600 relative text-gray-100';
