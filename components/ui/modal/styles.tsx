import { cva } from 'class-variance-authority';

export const modalCloseStyles = 'absolute right-3 lg:right-6 top-0 bottom-0 my-auto mx-0';

export const modalContentStyles = [
  'z-popover',
  'fixed',
  'bottom-0',
  'left-0',
  'h-fit',
  'max-h-[90vh]',
  'w-full',
  'rounded-none',
  'scrollbar-hide',
  'overflow-y-scroll',
  'rounded-tl-[1.25rem]',
  'rounded-tr-[1.25rem]',
  'animate-slide-up',
  'border-b-0',
  'border-x-0',
  'lg:border',
  'lg:left-1/2',
  'lg:top-1/2',
  'lg:max-w-[24rem]',
  'lg:-translate-x-1/2',
  'lg:-translate-y-2/4',
  'lg:animate-fade-in',
  'lg:rounded-[1.25rem]',
];

export const modalHeaderVariants = cva(
  [
    'relative',
    'flex',
    'items-center',
    'p-3',
    'lg:p-6',
    'sticky',
    'top-0',
    'bg-gray-600',
    'z-popover',
  ],
  {
    variants: {
      align: {
        left: 'justify-start',
        center: 'justify-center',
      },
    },
  },
);

export const modalOverlayStyles =
  'backdrop-brightness-50 fixed inset-0 z-popover outline-none focus:outline-none animate-fade-in';

export const modalPreviousStyles = 'absolute left-3 lg:left-6 top-0 bottom-0 my-auto mx-0';
