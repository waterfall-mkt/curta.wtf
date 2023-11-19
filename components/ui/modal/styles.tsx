import { cva } from 'class-variance-authority';

export const modalCloseStyles = 'absolute right-4 top-0 bottom-0 my-auto mx-0';

export const modalContentVariants = cva(
  [
    'z-popover',
    'fixed',
    'bottom-0',
    'left-0',
    'h-fit',
    'max-h-[90vh]',
    'w-full',
    'min-[384px]:border',
    'min-[384px]:border-b-0',
    'left-1/2',
    '-translate-x-1/2',
    'max-w-[24rem]',
    'rounded-none',
    'scrollbar-hide',
    'overflow-y-scroll',
    'rounded-t-[1.25rem]',
    'animate-modal-up',
    'border-b-0',
    'border-x-0',
  ],
  {
    variants: {
      breakpoint: {
        sm: [
          'sm:border',
          'sm:top-1/2',
          'sm:-translate-y-2/4',
          'sm:animate-fade-in',
          'sm:rounded-[1.25rem]',
        ],
        md: [
          'md:border',
          'md:top-1/2',
          'md:-translate-y-2/4',
          'md:animate-fade-in',
          'md:rounded-[1.25rem]',
        ],
        lg: [
          'lg:border',
          'lg:top-1/2',
          'lg:-translate-y-2/4',
          'lg:animate-fade-in',
          'lg:rounded-[1.25rem]',
        ],
      },
    },
  },
);

export const modalHeaderVariants = cva(
  ['relative', 'flex', 'items-center', 'p-4', 'sticky', 'top-0', 'bg-gray-600', 'z-popover'],
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
